[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/xenopatijaya/black-friday-deal-finder-20261127-v1/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/xenopatijaya/black-friday-deal-finder-20261127-v1/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

# Real Friday — a Black Friday deal finder that only lists real deals

Black Friday is full of “deals” that were never a deal: a list price raised in October, a $10 cut on a $300 item, a price that was lower last week. Real Friday checks every price twice against independent sources and tells you the truth about each one — **NEW LOW**, **STRONG DEAL**, or **ROUTINE SALE** — with the evidence on the card.

## What it is

- **38 deals** across 8 categories (audio, computers, TVs, wearables, gaming, kitchen, home, toys & fashion) at Amazon, Walmart, Best Buy and Target — every one checked twice on Friday 27 November 2026, 07:35–07:50 UTC.
- **Honest verdicts.** 9 new lows, 27 strong deals, 2 routine sales. The routine ones stay on the board on purpose, so you can see what *not* to buy.
- **Cross-store comparison.** 14 deals show the same product at another store, cheapest first, so the winner is obvious.
- **Working finder.** Search by name, filter by category, store and discount (30%+, 50%+, new lows only), sort by biggest saving, biggest % off, lowest price, or new lows first. Every deal opens a detail page with the full evidence, both sources named, and a cross-store price table.
- **Phone layout.** The whole board works at 390 px wide.

## How a deal earns its verdict

| Verdict | Meaning |
|---|---|
| NEW LOW | The lowest price any tracker has recorded for it. |
| STRONG DEAL | A big, genuine cut, confirmed at two independent sources. |
| ROUTINE SALE | A small cut on a list price that barely moved. Listed so you can skip it. |

Every card names the sources that showed its price and the time it was checked. Prices move all day on Black Friday — always check the price at the store before you buy. Deals that failed a second check were left off the board entirely (15 candidates were dropped that way).

## How it is built

A static site with no build step and no network loads. Open `app/index.html`, or serve it:

```sh
node serve.ts            # app/ on http://localhost:8080
node serve.ts --port 8083
```

- `app/data.js` — the 38 deals, with both sources and the verdict evidence for each
- `app/format.js` — prices, percentages and store links
- `app/filters.js` — search, category/store/discount filters, sorting
- `app/compare.js` — the cross-store price table
- `app/views.js` — the deal cards, the finder and the detail pages
- `app/main.js` — routing (`#/` and `#/deal/<id>`) and the live controls
- `main.ts` — the hand-in program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` (deterministic — the same bytes on every run)
- `tools/shoot.mjs` — the screenshot script (headless Chrome over CDP)

## Screenshots

Four real renders from headless Chrome, in `screenshots/`: the home page, the finder with Audio + 50% off applied, one deal detail page, and the home page on a phone.

## Sources

Prices were read on 27 November 2026 from 9to5Mac Black Friday Day 6 & Day 7, Benzinga via TradingView, dealnews, Topsave, Yahoo Shopping, TrendThread, beebulletin, Tasting Table, Walmart.com, Tom's Guide, PhoneArena, Hip2Save, TheTrendMonitor and Target.com listings. The full source list is in `app/data.js`.

## What the screenshots show

The four screenshots in `screenshots/` are real renders from headless Chrome (see `tools/shoot.mjs`):

1. `1-home.jpg` — the home page: 38 deals, 9 new lows, 4 stores, $4,708 total savings; the five lowest prices ever, then the finder with its search, category, store, discount and sort controls.
2. `2-filtered.jpg` — the finder with Audio + 50% off or more applied, sorted by biggest % off: 6 deals, from 67% down to 53%.
3. `3-deal.jpg` — one deal detail page (AirPods Pro 3): the price history behind the verdict, the cross-store table, the sources and the check time.
4. `4-phone.jpg` — the same home page at 390 px wide.

## Verified locally

- Two runs of `main.ts` produce byte-identical output (`diff -r` clean); dossier 563,489 bytes, total output under 1 MiB.
- Search, category, store and discount filters and all four sorts checked against the data: “lego” finds 2 deals, Target lists 3, new-lows-only lists 9, cheapest first is the $15 LEGO set.
- Screenshots render with 0 page errors in headless Chrome.

## License

MIT.
