// Cross-store comparison: the same product priced at more than one store.
// One row per store, cheapest first, so the winner is obvious at a glance.

import { escape, usd } from "./format.js";

export function compareTable(deal) {
  const rows = [{ store: deal.store, price: deal.price, here: true }]
    .concat(deal.cmp.map(([store, price]) => ({ store, price, here: false })))
    .sort((a, b) => a.price - b.price);
  const best = rows[0].price;
  return `<table class="compare">
    <thead><tr><th>Store</th><th>Price</th><th></th></tr></thead>
    <tbody>${rows
      .map(
        (r) => `<tr${r.here ? ' class="here"' : ""}>
          <td>${escape(r.store)}${r.here ? " (this deal)" : ""}</td>
          <td>${usd(r.price)}</td>
          <td>${r.price === best ? '<span class="cheapest">cheapest</span>' : `+${usd(Math.round((r.price - best) * 100) / 100)}`}</td>
        </tr>`,
      )
      .join("")}</tbody>
  </table>`;
}

export function compareLine(deal) {
  if (!deal.cmp.length) return "";
  const parts = deal.cmp.map(([s, p]) => `${escape(s)} ${usd(p)}`).join(" · ");
  return `<p class="cmp-line">Also at ${parts}</p>`;
}
