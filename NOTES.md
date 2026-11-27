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
Verdict split: 9 NEW LOW, 26 STRONG, 2 ROUTINE. Cross-store comparisons on 10 products. Stores: Amazon 13, Walmart 17, Best Buy 3, Target 3, +1? (count in code).
