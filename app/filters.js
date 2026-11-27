// Filtering and sorting state. Pure functions over the deal list, so the
// list view and the counts in the header can never disagree.

import { pctOff, saved } from "./format.js";

export const CATEGORIES = ["All", "Audio", "Computers", "TVs", "Wearables", "Gaming", "Kitchen", "Home", "Toys & Fashion"];
export const STORES = ["All", "Amazon", "Walmart", "Best Buy", "Target"];
export const DISCOUNTS = [
  { label: "Any discount", min: 0 },
  { label: "30% off or more", min: 30 },
  { label: "50% off or more", min: 50 },
  { label: "New lows only", min: -1 },
];
export const SORTS = [
  { id: "saving", label: "Biggest saving first" },
  { id: "pct", label: "Biggest % off first" },
  { id: "price", label: "Lowest price first" },
  { id: "newlow", label: "New lows first" },
];

export function defaultState() {
  return { q: "", cat: "All", store: "All", disc: 0, sort: "saving" };
}

export function applyFilters(deals, st) {
  const q = st.q.trim().toLowerCase();
  let out = deals.filter((d) => {
    if (st.cat !== "All" && d.cat !== st.cat) return false;
    if (st.store !== "All" && d.store !== st.store) return false;
    if (st.disc === -1 && d.verdict !== "newlow") return false;
    if (st.disc > 0 && pctOff(d) < st.disc) return false;
    if (q && !`${d.title} ${d.store} ${d.cat}`.toLowerCase().includes(q)) return false;
    return true;
  });
  const by = {
    saving: (a, b) => saved(b) - saved(a),
    pct: (a, b) => pctOff(b) - pctOff(a),
    price: (a, b) => a.price - b.price,
    newlow: (a, b) => (a.verdict === "newlow" ? 0 : 1) - (b.verdict === "newlow" ? 0 : 1) || saved(b) - saved(a),
  }[st.sort];
  return [...out].sort(by);
}

export function totals(deals) {
  const n = deals.length;
  const save = deals.reduce((s, d) => s + (d.was - d.price), 0);
  const lows = deals.filter((d) => d.verdict === "newlow").length;
  const stores = new Set(deals.map((d) => d.store)).size;
  return { n, save: Math.round(save), lows, stores };
}
