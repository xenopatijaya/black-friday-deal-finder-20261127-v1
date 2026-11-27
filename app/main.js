// Wires the finder together: hash routes, live search and filters, and the
// ?shot= staging used to take the screenshots. Nothing here fetches from the
// network: the deals live in data.js, the page only reads them.
//
//   #/            the finder, sorted by biggest saving
//   #/deal/<id>   one deal, with its evidence and cross-store table
//   ?shot=home    list, desktop
//   ?shot=filter  list with Audio + 50% off applied, desktop
//   ?shot=deal    the AirPods Pro 3 detail page, desktop
//   ?shot=phone   list, phone width (the screenshot tool sets the viewport)
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { deals } from "./data.js";
import { applyFilters, defaultState, totals } from "./filters.js";
import { listView, dealView, missingView, dealCard } from "./views.js";

const app = document.getElementById("app");
const params = new URLSearchParams(location.search);
const shot = params.get("shot") || "";

function stageForShot(st) {
  if (shot === "filter") {
    st.cat = "Audio";
    st.disc = 50;
    st.sort = "pct";
    document.body.classList.add("shot-filter");
  }
  return st;
}

function renderList() {
  const st = stageForShot(defaultState());
  const total = totals(deals);
  const shown = applyFilters(deals, st);
  app.innerHTML = listView(deals, shown, st, total);
  if (shot === "filter") {
    const count = document.getElementById("count");
    if (count) count.textContent = `Showing ${shown.length} of ${deals.length} deals — Audio, 50% off or more, biggest % off first`;
  }
  bindControls(st);
}

function bindControls(st) {
  const q = document.getElementById("q");
  const cat = document.getElementById("cat");
  const store = document.getElementById("store");
  const disc = document.getElementById("disc");
  const sort = document.getElementById("sort");
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");
  if (!q || !grid) return;
  const rerender = () => {
    st.q = q.value;
    st.cat = cat.value;
    st.store = store.value;
    st.disc = Number(disc.value);
    st.sort = sort.value;
    const shown = applyFilters(deals, st);
    grid.innerHTML = shown.length
      ? shown.map(dealCard).join("")
      : '<p class="empty">No deal matches. Loosen a filter — or try a different word.</p>';
    if (count) count.textContent = `Showing ${shown.length} of ${deals.length} deals`;
  };
  q.addEventListener("input", rerender);
  cat.addEventListener("change", rerender);
  store.addEventListener("change", rerender);
  disc.addEventListener("change", rerender);
  sort.addEventListener("change", rerender);
}

function render() {
  window.__shotReady = false;
  const match = location.hash.match(/^#\/deal\/([^/?]+)/);
  if (match) {
    const found = deals.find((d) => d.id === decodeURIComponent(match[1]));
    document.title = `${found ? found.title : "Not found"} | Real Friday`;
    app.innerHTML = found ? dealView(found) : missingView();
  } else {
    document.title = "Real Friday — Black Friday deals that are actually deals";
    renderList();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", render);
render();
