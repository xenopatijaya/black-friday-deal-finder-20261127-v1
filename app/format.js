// Small formatting helpers, one job each. No deal logic lives here.

export const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const usd = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export const pctOff = (d) => Math.round((1 - d.price / d.was) * 100);

export const saved = (d) => Math.round((d.was - d.price) * 100) / 100;

// "2026-11-27T07:45:00Z" -> "27 Nov 2026, 07:45 UTC"
export const checkedLabel = (iso) => {
  const dt = new Date(iso);
  const day = String(dt.getUTCDate()).padStart(2, "0");
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dt.getUTCMonth()];
  const hh = String(dt.getUTCHours()).padStart(2, "0");
  const mm = String(dt.getUTCMinutes()).padStart(2, "0");
  return `${day} ${mon} ${dt.getUTCFullYear()}, ${hh}:${mm} UTC`;
};

export const storeSearchUrl = (store, query) => {
  const q = encodeURIComponent(query);
  if (store === "Amazon") return `https://www.amazon.com/s?k=${q}`;
  if (store === "Walmart") return `https://www.walmart.com/search?q=${q}`;
  if (store === "Best Buy") return `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`;
  if (store === "Target") return `https://www.target.com/s?searchTerm=${q}`;
  if (store === "Dyson") return `https://www.dyson.com/search?q=${q}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(store + " " + query)}`;
};
