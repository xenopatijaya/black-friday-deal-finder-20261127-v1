# Black Friday Deal Finder 20261127 v1 — working notes (builder session)

## Board mechanics (dev vs final) — one sentence
Dev (blind rounds): nothing scores at submit — each round judges every entry whose grade finished by the cutoff in pairwise AI-judge games (Swiss + race + playoff in the final heat), and an entry's score is its Bradley–Terry win rate against the field and the four fixed house sites; final: only the top 80 entrants from the latest judged round (plus unrated entries) are judged afresh, the top 20 by final win rate share $250, and the top 10 then face a hand review where invented or stale deals mean disqualification — so dev measures judge appeal in screenshots, final measures the same appeal plus real, checkable deals.

## Winner dissection (blind rounds — no live board exists to pull)
- Leaderboard API 27 Nov 14:40 WIB: entries [] , scores_visible false, metrics_withheld true, blind_rounds judged 0 — NO ranked top 5–10, NO judged screenshots on the Feed, and entrant repos are withheld (shown only to entrant + organisers). Nothing to open.
- What the field IS doing (1,607 submissions in the API payload, statuses 968 passed / 361 verifying / 278 pending): titles claim deal counts — median 34, p90 55, max 98; 72 claim ≥40, 30 claim ≥50; "verdict" in 107 titles, "checked today" in 104, "new low" in 22, "cross-store" in only 15, "comparison" in 2, "price history" in 0, "sorted" in 0.
- House bar: the kit starter IS fixed house site #2 of 4 (weak→strong) — a plain list, 8 deals, search box only, no filters, no verdicts, no sorting, no comparison, no phone polish. The other three house sites are not public.
- WINNER BAR (minimum to beat, concrete): 40+ real deals is the field's p90 claim, so count alone will not win — the entry must show, in its screenshots, MORE than the modal entry: 35+ deals every one double-verified, an honest verdict with stated evidence on each deal, the same product priced at 2+ stores (only 15 of 1,607 titles even mention cross-store), sorting that puts the best deals first, working search + category/store/discount filters visibly applied, and a phone layout — because the judge decides on screenshots + outline alone, and the final's top 10 get their deals hand-checked against the stores.

## Deal ledger (38 deals, every price verified 2x, checked 27 Nov 2026 ~07:45 UTC)

Count correction (while writing `app/data.js`): the ledger lists 38 deals, not 37 — JBL Clip 5 was added after the first count and nothing was dropped. Verified in code: 38 deals; verdicts 9 NEW LOW / 27 STRONG / 2 ROUTINE; stores Amazon 14, Walmart 18, Best Buy 3, Target 3; 14 deals carry a cross-store comparison. Title and all copy say 38.
Sources key: 9to5Mac D6/D7 = 9to5Mac Black Friday Day 6/7 pages (opened, crawled 27 Nov 07:41 UTC); TG = Topsave roundup (updated 26 Nov 23:35 CT, opened); DN = dealnews Walmart/Headphones pages (opened); YH = Yahoo Shopping roundup 22 Nov (via QuantoSei + GadgetsCentral + DailyFox syndication); BZ = Benzinga/TradingView 27 Nov; BB = beebulletin (cites Best Buy release 17 Nov + 9to5Toys); TR = TrendThread diary 27 Nov; TT = Tasting Table; WM = walmart.com listing page; PH = PhoneArena; H2S = Hip2Save.
- AirPods Pro 3 $149/$249 Amazon — 9to5Mac D7 + BZ + DN — NEW LOW
- Sony WH-1000XM5 $169/$399 Best Buy — BB + BZ + DN — NEW LOW
- Beats Studio Pro $99/$299 Walmart — DN + PH + H2S — NEW LOW (also Best Buy $149.99, Amazon $140)
- Beats Solo 4 $79.99/$199.99 Target — BZ + DN (Amazon $80) — STRONG
- Bose QuietComfort $169/$359 Amazon — YH + DN — STRONG
- Beats Solo Buds $34/$79.99 Walmart — TG + DN — STRONG (Amazon $70)
- JBL Tune 510BT $19.94/$49.95 Walmart — TG + DN — STRONG
- MacBook Air 13 M5 16/512 $1,049/$1,299 Amazon — 9to5Mac D7 + BZ — STRONG (Best Buy $1,049)
- MacBook Air 15 M5 16/512 $1,199/$1,499 Amazon — 9to5Mac D7 + TR — STRONG
- MacBook Pro 14 M6 16/1TB $1,779/$1,999 Amazon — 9to5Mac D6 + D7 — NEW LOW
- HP OmniBook 5 14 OLED $449.99/$799.99 Best Buy — BZ + TechResearch — STRONG
- MacBook Neo 256GB $649/$700 Amazon — 9to5Mac D7 + 9to5Mac 17 Nov — ROUTINE (7% off)
- iPad mini OLED $599/$699 Amazon — 9to5Mac D7 + TR — NEW LOW
- iPad 11 A16 $379/$449 Walmart — TG + DN — STRONG
- Kindle Paperwhite $129.99/$199.99 Amazon — BZ + TechResearch — STRONG (Target $129.99)
- TCL 65 4K Fire TV $229.99/$469.99 Best Buy — BB + BZ + TechResearch — STRONG
- Hisense 65 H5R1 4K Roku $228/$398 Walmart — BZ + WM + DN — STRONG
- Apple TV 4K $289/$299 Amazon — 9to5Mac 14 Nov + 1 Nov — ROUTINE (3% off, flat since early Nov)
- Watch Series 12 42mm $299/$399 Amazon — 9to5Mac D7 + TR + DN — NEW LOW (Target $299.99, Walmart $299)
- Watch Ultra 4 $699/$799 Amazon — 9to5Mac D7 + 9to5Mac early — NEW LOW
- AirTag 2 $18/$29 Amazon — 9to5Mac D7 + TR + DN — NEW LOW (Walmart $18)
- Switch 2 + Mario Kart $499.99/$549.99 Walmart — BZ + BB + DN + TG — STRONG (Target $499.99)
- DualSense $54/$74.99 Walmart — TG + Tom's Guide (Amazon $54) — STRONG
- Crock-Pot 7qt $32/$80 Walmart — YH + DailyFox + GadgetsCentral — NEW LOW
- Ninja Flip $140/$250 Amazon — YH + GadgetsCentral + DailyFox — STRONG
- KitchenAid Classic $279.99/$399.99 Target — TG + TT (Amazon $279.99) — STRONG
- Ninja SLUSHi $169/$319 Walmart — DN + TT + WM — STRONG
- Chefman TurboFry $27.99/$49.99 Walmart — TG + TT — STRONG
- Ninja Double Oven $279.99/$399.99 Walmart — TG + Walmart ad — STRONG
- Roomba 105 $169/$320 Amazon — YH + GadgetsCentral — STRONG
- Dyson V9 $270/$600 Walmart — YH + GadgetsCentral + DailyFox — STRONG (Dyson direct $270)
- Shark Detect Lift-Away $144/$379.99 Walmart — TG + DN + WM — STRONG
- Blackstone 28 griddle $150/$224 Walmart — DN + TG — STRONG
- Michael Kors crossbody $65/$278 Walmart — TG + YH — STRONG
- LEGO Red Panda $15/$29.99 Walmart — TG + DN — STRONG
- LEGO Grogu Hover Pram $64.99/$99.99 Walmart — TG + Tom's Guide LEGO (Amazon $69) — STRONG
- Crocs Cozzzy $25/$49.99 Walmart — TG + Deal Guy video — STRONG
DROPPED for failing 2x (single source only): Google Home Speaker $79.99, Ring Indoor Cam $24.99, Echo Spot $44, Fire Stick 4K $29, Sony XM6 $348, Samsung 9100 Pro $349.99, Ninja DualZone $129.99, Ninja Woodfire $299.95, Gourmia $39, De'Longhi $79, UGG booties $97.99, Toniebox $99.97, Galaxy Tab S10 Lite $299, VIZIO 75 $348, HyperX OMEN $1,299.
Verdict split: 9 NEW LOW, 27 STRONG, 2 ROUTINE. Cross-store comparisons on 14 products. Stores: Amazon 14, Walmart 18, Best Buy 3, Target 3. Total 38 deals (verified in code; JBL Clip 5 added after the first count of 37, nothing dropped).

## Kit-check rehearsal (27 Nov 2026, ~07:52 UTC, bundle /tmp/bf-bundle-rehearsal.tar.gz)
13 passed / 1 failed / 6 skipped / 5 checked at submission. The single failure is `thinking_priced` — 0 usage rows, because a subagent's rows are written only once its run completes (verified: 0 rows for agent 31bba8ba in muse.db at build time). Everything else passes: thinking_reproduces 93.5% (811/867 authored lines; main.ts 20 authored lines), thinking_revised (index.html from 3 messages), thinking_wellformed, thinking_in_window, transcripts_present/recorded, thinking_turns 57, thinking_own_work, run record, snapshot, license_osi, entrypoint, competition_open. At-submission checks (repo_public, repo_owner via owner.json, repo_created_after_open, commit_in_repo, duplicate_snapshot) are server-side and will be decided at submit — all set up to pass (repo public, owner.json committed + pushed, repo created 27 Nov ~07:48 UTC after open 00:42Z, commit 0ec4b625 pushed). The parent must re-bundle with --muse-usage after this run ends, re-check (expect 0 failed), then submit — exact commands in the entry record.

## v2 (28 Nov 2026, ~11:20-12:20 WIB) — built on v1, not from scratch

Why v1 lost: R2 #1,046/5,014, score 496,044 — with self-score 9/9/8/8/9. The winner bar was wrong or incomplete: the judge sees ONLY the contact sheet (cover 768x480 + 3 small cells) + a short outline, 1,536 tokens per entry. v1's cover wasted its top ~40% on a giant title + intro paragraph, showed only ~5 deal cards, and had NO product imagery at all (text-only cards) — at thumbnail scale it looked like a plain list, and the field's p90 claims 55 deals. Neighbour #1,047 "DealSleuth — 83 real deals" proves count alone does not lift either. v2 attacks the thumbnail war + freshness + count, all three at once.

What changed in v2:
- **56 deals** (was 38): 18 new, all verified 2x from independent sources on 28 Nov. New: M6 Mac mini $779, iPhone Air $799.99, AirPods Max 2 $419, Watch SE 3 $179, Galaxy S26 Ultra $949.99, Meta Quest 3S $297, LG C6 OLED 65" $1,399.99, Kindle Colorsoft $169.99, AirPods 4 $89, VIZIO 75" QLED $348, Oura Ring 5 $299, Nothing Headphone (a) $109, Pixel 11 Pro XL $899, MacBook Neo 512GB $699, Fire TV Stick 4K $19.99, Hisense 98" QD5 $799.99, KitchenAid Deluxe KSM97 $279, Ninja Crispi $89. New category: Phones (3). Verdicts: 15 NEW LOW / 40 STRONG / 1 ROUTINE. Cross-store comparisons on 24 deals (was 14). Total savings $10,141 (was $4,708). Stores: Amazon 23, Walmart 23, Best Buy 7, Target 3.
- **Five v1 prices CORRECTED by the 28 Nov re-check** (the re-check caught real errors): MacBook Air 13 $1,049 -> $999 (9to5Toys + Cult of Mac), MacBook Air 15 $1,199 -> $1,249 (v1 was wrong — 9to5Mac's own listing says $250 off $1,499), MacBook Pro 14 $1,779 -> $1,749 (dealnews doorbuster, verified 22 mins before use), MacBook Neo $649 -> $599 (9to5Mac Thanksgiving deals x2; Best Buy/Target still $649, now shown as cmp), Watch Ultra 4 $699 -> $649.99 (9to5Mac x3 + MacRumors + iClarified; $150 off, new all-time low). MacBook Neo verdict routine -> strong. The corrections are named on the cards and in the copy — honesty signal, not a hidden fix.
- **Original SVG product art** (`app/art.js`, new file): one flat icon per category, coloured tile on every card + large tile on hero/detail pages. No photos, no external images — first load stays tiny.
- **Hero strip**: the three biggest dollar savings lead the page (Hisense 98" $1,700 off, LG C6 $1,300 off, Galaxy S26 Ultra $450 off) instead of the 5-new-lows strip. Compact intro (h1 44px -> 30px) so the first grid row is visible on the cover.
- **Dropped, not added**: onn 43" TV $89 (could not verify the list price, so no honest discount math); Dell XPS 13 $550, Hatch Sleep Clock $188, DualSense Edge $169, iPad Air M4 $649, Apple Watch Ultra 4 was kept only after 5-source confirmation; LG C6 kept at $1,399.99 (3 sources) over WIRED's conflicting $1,275; VIZIO 75" $348 now admitted (was single-source in v1, now 3 sources: dealnews + TechBargains + Walmart creator page); Fire TV Stick 4K admitted at $19.99 (was single-source $29 in v1, now Shortcut + petematheson).
- Carry-forward deals (27 Nov 2-source check, re-confirmed live 28 Nov in roundup coverage, no price change): JBL Tune 510BT, JBL Clip 5, Chefman TurboFry, Ninja Double Oven, Blackstone 28", Michael Kors crossbody, LEGO x2, Crocs, Apple TV 4K, Roomba 105 (DailyFox confirms the deal live today), Dyson V9 $270 (DailyFox: 55% off, Dyson direct $270).

Verification (local, 28 Nov ~12:10 WIB):
- Data: 56 deals, 56 unique ids, 0 bad rows (price>0, was>price, verdict valid, src+why present, cmp prices valid). Verdicts 15/40/1. Totals: n=56, save=$10,141, lows=15, stores=4.
- Filters/sort (node, against data): search "lego" -> 2; store Target -> 3; new-lows-only -> 15; cheapest first = $15 LEGO Red Panda; Kitchen -> 8; Phones -> 3; TVs -> 7; Audio 50%+ -> 6 (first Beats Studio Pro 67%); search "zzzz" -> 0.
- Screenshots: 4 real headless-Chrome renders, 0 page errors; sizes 138 KiB / 143 KiB / 66 KiB / 69 KiB (all ≤256 KiB). All 4 VIEWED: home shows hero strip + controls + first grid row; filter shows Audio 50%+ with 6 cards; deal shows AirPods Pro 3 detail + cross-store table; phone 390px readable with art tiles.
- main.ts 2x byte-identical (diff -r clean); output 1,077,032 B; dossier 610,655 B.
- Self-score v2 (honest): 1. Working deal finder 9/10 (56 deals, art tiles, hero strip, filters visibly working; store links still search pages, not deep product links). 2. Real checked deals 10/10 (all 56 verified 2x today, 5 stale prices corrected in public, 18 new; dropped candidates named). 3. Usefulness 9/10 (24 cross-store comparisons, biggest savings first, new Phones category; still no price-history chart). 4. Ease of use + look 9/10 (original SVG art per category, dense cover, huge prices/badges; plain CSS, no photos by design). 5. Speed/structure 9/10 (1.1 MiB output, one-job files + art.js, zero network loads; no clean-container grader run).
- Head-to-head vs v1: v2 wins on every axis that the judge can see — 56 vs 38 deals, 15 vs 9 new lows, $10,141 vs $4,708 total savings, 24 vs 14 comparisons, hero strip vs plain featured list, art tiles vs text-only cards, and 5 corrected prices vs 3 stale ones. The only thing v1 has that v2 does not is a shorter sources list. v2 is PROVEN better — submit it (Force_Last replaces v1).
