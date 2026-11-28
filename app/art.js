// Original inline-SVG product art, one flat icon per category. No photos,
// no external images: the whole first load stays tiny, and every tile is
// drawn from the category, never a stock photo that could mislead.

const ICONS = {
  Audio: '<path d="M4 13a8 8 0 0 1 16 0"/><rect x="2.5" y="12.5" width="4.5" height="7" rx="2"/><rect x="17" y="12.5" width="4.5" height="7" rx="2"/>',
  Computers: '<rect x="4" y="4.5" width="16" height="11" rx="1.5"/><path d="M2 18.5h20"/>',
  TVs: '<rect x="2.5" y="4.5" width="19" height="12" rx="2"/><path d="M9 20.5h6"/>',
  Wearables: '<rect x="7.5" y="7" width="9" height="10" rx="2.5"/><path d="M10 7V3.5h4V7M10 17v3.5h4V17"/><path d="M12 10.5v2l1.5 1"/>',
  Gaming: '<path d="M7.5 7h9a5 5 0 0 1 5 5v1.2a2.8 2.8 0 0 1-5 1.7L15 13.5H9l-1.5 1.4a2.8 2.8 0 0 1-5-1.7V12a5 5 0 0 1 5-5Z"/><path d="M8 10.5v3M6.5 12h3"/><circle cx="15.8" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="17.8" cy="13" r=".9" fill="currentColor" stroke="none"/>',
  Kitchen: '<rect x="4" y="9.5" width="16" height="9" rx="2"/><path d="M2 9.5h20M9 6.5h6"/>',
  Home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10v9h11v-9"/>',
  "Toys & Fashion": '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M12 9v11M4 13.5h16M12 9c-4.5 0-5.5-2-4-3.5C9.5 4 12 5.5 12 9Zm0 0c4.5 0 5.5-2 4-3.5C14.5 4 12 5.5 12 9Z"/>',
  Phones: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
};

const COLORS = {
  Audio: ["#fee4e2", "#b42318"],
  Computers: ["#e0eaff", "#175cd3"],
  TVs: ["#d1fadf", "#067647"],
  Wearables: ["#fef0c7", "#b54708"],
  Gaming: ["#ebe9fe", "#5925dc"],
  Kitchen: ["#ffead5", "#c4320a"],
  Home: ["#ccfbf1", "#0e7490"],
  "Toys & Fashion": ["#fce7f3", "#c01048"],
  Phones: ["#e0e7ff", "#3538cd"],
};

export function artTile(cat, big = false) {
  const [bg, fg] = COLORS[cat] || ["#f2f4f7", "#475467"];
  const svg = ICONS[cat] || ICONS["Home"];
  return `<span class="art${big ? " big" : ""}" style="--art-bg:${bg};--art-fg:${fg}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svg}</svg></span>`;
}
