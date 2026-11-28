// Real Friday — the hand-in program (Node 22, standard library only).
//
// The site is app/: plain static files a browser opens at app/index.html
// (ES modules, one stylesheet, no build step, nothing fetched from the
// network). Its deals live in app/data.js, checked twice on 28 Nov 2026.
//
// This program copies app/ and screenshots/ from beside this file to the
// output directory and writes /output/dossier.json with the vendored
// make.fun library, exactly as the kit asks. It writes the same bytes on
// every run: it copies files and builds the dossier, nothing more — no
// timestamps, no random values, no environment reads beyond the output dir.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const appDir = join(here, "app");
const shotsDir = join(here, "screenshots");

if (!existsSync(join(appDir, "index.html"))) {
  throw new Error("app/index.html is missing — nothing to hand in");
}

mkdirSync(out, { recursive: true });
cpSync(appDir, join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(out, "screenshots"), { recursive: true });
}

// The scorer's own caps, as the starter documents them: the dossier text is
// capped at 160 KiB, at most 4 screenshots of 256 KiB, app/ at most 993
// files and 16 MiB. buildDossier refuses anything past those limits.
writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
