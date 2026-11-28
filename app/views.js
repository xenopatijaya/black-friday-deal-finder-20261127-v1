// HTML for every page, built from the deal data. Every value is escaped
// before it goes into the page, and every number shown is computed from the
// two prices, so the card can never disagree with the data.

import { escape, usd, pctOff, saved, checkedLabel, storeSearchUrl } from "./format.js";
import { CHECKED_AT, SOURCES } from "./data.js";
import { compareTable, compareLine } from "./compare.js";
import { artTile } from "./art.js";

const VERDICT = {
  newlow: ["NEW LOW", "Lowest price ever tracked"],
  strong: ["STRONG DEAL", "A genuine big cut"],
  routine: ["ROUTINE SALE", "Small cut — not a bargain"],
};

export function verdictPill(d) {
  const [label, title] = VERDICT[d.verdict];
  return `<span class="verdict v-${d.verdict}" title="${escape(title)}">${label}</span>`;
}

export function dealCard(d) {
  return `<article class="card">
    <div class="card-top">
      <span class="store">${escape(d.store)}</span>
      <span class="cat">${escape(d.cat)}</span>
      ${verdictPill(d)}
    </div>
    <div class="card-main">
      ${artTile(d.cat)}
      <div class="card-body">
        <h3><a href="#/deal/${encodeURIComponent(d.id)}">${escape(d.title)}</a></h3>
        <p class="price-row">
          <span class="price">${usd(d.price)}</span>
          <s class="was">${usd(d.was)}</s>
          <span class="off">${pctOff(d)}% off</span>
        </p>
        <p class="save-line">You save ${usd(saved(d))}</p>
      </div>
    </div>
    <p class="why">${escape(d.why)}</p>
    ${compareLine(d)}
    <p class="meta">Checked ${checkedLabel(CHECKED_AT)} · Source: ${escape(d.src)}</p>
    <p class="cta"><a href="${escape(storeSearchUrl(d.store, d.q))}" target="_blank" rel="noopener">View at ${escape(d.store)} &rarr;</a></p>
  </article>`;
}

export function heroCard(d) {
  return `<article class="card hero">
    <div class="card-top">
      <span class="store">${escape(d.store)}</span>
      <span class="cat">${escape(d.cat)}</span>
      ${verdictPill(d)}
    </div>
    <div class="card-main">
      ${artTile(d.cat, true)}
      <div class="card-body">
        <h3><a href="#/deal/${encodeURIComponent(d.id)}">${escape(d.title)}</a></h3>
        <p class="price-row">
          <span class="price">${usd(d.price)}</span>
          <s class="was">${usd(d.was)}</s>
          <span class="off">${pctOff(d)}% off</span>
        </p>
        <p class="save-line big-save">You save ${usd(saved(d))}</p>
      </div>
    </div>
    <p class="why">${escape(d.why)}</p>
  </article>`;
}

export function featured(deals) {
  const heroes = [...deals].sort((a, b) => saved(b) - saved(a)).slice(0, 3);
  return `<section class="featured" aria-label="Biggest savings right now">
    <h2>Biggest savings on the board</h2>
    <div class="feat-grid">${heroes.map(heroCard).join("")}</div>
  </section>`;
}

export function listView(deals, shown, st, total) {
  const chips = ["All", "Audio", "Computers", "TVs", "Wearables", "Gaming", "Kitchen", "Home", "Toys & Fashion", "Phones"];
  return `<section class="intro">
    <h1>Real Friday</h1>
    <p class="tagline">Black Friday deals that are actually deals. Every price checked twice on Saturday 28 November 2026 — five prices from yesterday corrected, 18 new deals added.</p>
    <p class="stats"><strong>${total.n} deals</strong> · <strong>${total.lows} new lows</strong> · <strong>${total.stores} stores</strong> · <strong>${usd(total.save)} total savings</strong> if you bought one of each</p>
  </section>
  ${featured(deals)}
  <section class="finder" aria-label="Find a deal">
    <div class="controls">
      <label class="search">Search <input id="q" type="search" placeholder="Try “headphones” or “LEGO”" value="${escape(st.q)}"></label>
      <label>Category <select id="cat">${chips.map((c) => `<option${c === st.cat ? " selected" : ""}>${c}</option>`).join("")}</select></label>
      <label>Store <select id="store">${["All", "Amazon", "Walmart", "Best Buy", "Target"].map((s) => `<option${s === st.store ? " selected" : ""}>${s}</option>`).join("")}</select></label>
      <label>Discount <select id="disc">
        <option value="0"${st.disc === 0 ? " selected" : ""}>Any discount</option>
        <option value="30"${st.disc === 30 ? " selected" : ""}>30% off or more</option>
        <option value="50"${st.disc === 50 ? " selected" : ""}>50% off or more</option>
        <option value="-1"${st.disc === -1 ? " selected" : ""}>New lows only</option>
      </select></label>
      <label>Sort <select id="sort">
        <option value="saving"${st.sort === "saving" ? " selected" : ""}>Biggest saving first</option>
        <option value="pct"${st.sort === "pct" ? " selected" : ""}>Biggest % off first</option>
        <option value="price"${st.sort === "price" ? " selected" : ""}>Lowest price first</option>
        <option value="newlow"${st.sort === "newlow" ? " selected" : ""}>New lows first</option>
      </select></label>
    </div>
    <p class="count" id="count">Showing ${shown.length} of ${deals.length} deals</p>
    <div class="grid" id="grid">${shown.length ? shown.map(dealCard).join("") : '<p class="empty">No deal matches. Loosen a filter — or try a different word.</p>'}</div>
  </section>
  <section class="method">
    <h2>How a deal earns its verdict</h2>
    <ul>
      <li><strong>NEW LOW</strong> — the lowest price any tracker has recorded for it.</li>
      <li><strong>STRONG DEAL</strong> — a big, genuine cut, confirmed at two independent sources.</li>
      <li><strong>ROUTINE SALE</strong> — a small cut on a list price that barely moved. We list it so you can see what not to buy.</li>
    </ul>
    <p>Every deal names the sources that showed its price, and the time it was checked. Prices move all day on Black Friday — always check the price at the store before you buy. Deals that failed a second check were left off this board entirely. Five prices from the 27 November board were corrected this morning after they moved overnight.</p>
    <p class="sources"><strong>Sources checked 28 Nov 2026:</strong> ${SOURCES.map(escape).join("; ")}.</p>
  </section>`;
}

export function dealView(d) {
  return `<p class="back"><a href="#/">&larr; All deals</a></p>
  <article class="detail">
    <div class="card-top">
      <span class="store">${escape(d.store)}</span>
      <span class="cat">${escape(d.cat)}</span>
      ${verdictPill(d)}
    </div>
    <div class="detail-head">
      ${artTile(d.cat, true)}
      <h1>${escape(d.title)}</h1>
    </div>
    <p class="price-row big">
      <span class="price">${usd(d.price)}</span>
      <s class="was">${usd(d.was)}</s>
      <span class="off">${pctOff(d)}% off</span>
    </p>
    <p class="save-line">You save ${usd(saved(d))} off the usual price</p>
    <h2>Why this verdict</h2>
    <p>${escape(d.why)}</p>
    <h2>Same product, other stores</h2>
    ${d.cmp.length ? compareTable(d) : "<p>No other store beats this price right now — this is the cheapest we found.</p>"}
    <dl class="facts">
      <dt>Store</dt><dd>${escape(d.store)}</dd>
      <dt>Category</dt><dd>${escape(d.cat)}</dd>
      <dt>Checked</dt><dd>${checkedLabel(CHECKED_AT)}</dd>
      <dt>Read in</dt><dd>${escape(d.src)}</dd>
    </dl>
    <p class="cta"><a href="${escape(storeSearchUrl(d.store, d.q))}" target="_blank" rel="noopener">View it at ${escape(d.store)} &rarr;</a></p>
  </article>`;
}

export function missingView() {
  return `<h1>Not found</h1><p>There is no deal at that address. <a href="#/">See all deals</a>.</p>`;
}
