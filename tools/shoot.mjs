// shoot.mjs — renders Real Friday in headless Chrome over CDP and takes the
// entry screenshots. Usage (dev server on http://localhost:8083 first):
//   node tools/shoot.mjs all            — all four screenshots into screenshots/
//   node tools/shoot.mjs shot <name>    — one view (?shot=<name>) to /tmp
//   node tools/shoot.mjs check          — load the home page, report page errors
// CDP on port 9334. Chrome is the Playwright-bundled build.

import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`;
const PORT = 9334;
const BASE = "http://localhost:8083";

const SHOTS = [
  { name: "home", file: "1-home.jpg", path: "/?shot=home", width: 1280, height: 800 },
  { name: "filter", file: "2-filtered.jpg", path: "/?shot=filter", width: 1280, height: 800 },
  { name: "deal", file: "3-deal.jpg", path: "/#/deal/airpods-pro-3?shot=deal", width: 1280, height: 800 },
  { name: "phone", file: "4-phone.jpg", path: "/?shot=phone", width: 390, height: 844 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
  const proc = spawn(CHROME, [
    "--headless=new", "--no-sandbox", "--use-angle=swiftshader", "--disable-gpu-sandbox",
    `--remote-debugging-port=${PORT}`, "--window-size=1280,920", "about:blank",
  ], { stdio: "ignore" });
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      if (res.ok) return proc;
    } catch { /* not up yet */ }
    await sleep(500);
  }
  throw new Error("chrome did not start");
}

async function connect() {
  const targets = await (await fetch(`http://localhost:${PORT}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method) events.push(msg);
  };
  async function send(method, params = {}) {
    const mid = ++id;
    ws.send(JSON.stringify({ id: mid, method, params }));
    return new Promise((res) => pending.set(mid, res));
  }
  return { send, events, ws };
}

async function evalJs(send, expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  return r.result?.result?.value;
}

function pageErrors(events) {
  return events.filter((e) => e.method === "Runtime.exceptionThrown"
    || (e.method === "Log.entryAdded" && e.params?.entry?.level === "error"));
}

async function takeShot(send, events, shot) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.width < 600,
  });
  await send("Page.navigate", { url: `${BASE}${shot.path}` });
  let ready = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    if (await evalJs(send, "window.__shotReady === true")) { ready = true; break; }
  }
  await sleep(500);
  const res = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 });
  const out = `screenshots/${shot.file}`;
  writeFileSync(out, Buffer.from(res.result.data, "base64"));
  const errors = pageErrors(events);
  const cards = await evalJs(send, "document.querySelectorAll('.card').length");
  console.log(`saved ${out} | ready: ${ready} | cards: ${cards} | page errors: ${errors.length}`);
  for (const e of errors.slice(0, 5)) console.log(JSON.stringify(e.params ?? e).slice(0, 300));
}

async function main() {
  const mode = process.argv[2] ?? "all";
  const proc = await launch();
  try {
    const { send, events } = await connect();
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Log.enable");
    if (mode === "check") {
      await send("Page.navigate", { url: `${BASE}/?shot=home` });
      for (let i = 0; i < 40; i++) {
        await sleep(400);
        if (await evalJs(send, "window.__shotReady === true")) break;
      }
      await sleep(400);
      console.log("cards:", await evalJs(send, "document.querySelectorAll('.card').length"));
      console.log("count text:", await evalJs(send, "document.getElementById('count')?.textContent"));
      console.log("page errors:", pageErrors(events).length);
      for (const e of pageErrors(events).slice(0, 5)) console.log(JSON.stringify(e.params ?? e).slice(0, 300));
      return;
    }
    const list = mode === "all" ? SHOTS : SHOTS.filter((s) => s.name === mode);
    if (!list.length) { console.log("unknown shot; use all | home | filter | deal | phone | check"); process.exit(1); }
    for (const s of list) await takeShot(send, events, s);
  } finally { proc.kill(); }
}

await main();
