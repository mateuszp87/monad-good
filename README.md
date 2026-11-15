# Fairway Flow

The current front page is **Bandon Dunes**, using a CoursePreview-style split hole map / scroll flyover, six tee sets, pointer yardages, hole selection, scorecard, handicap chart, map and course tabs. Open `/?hole=3` to start at the requested reference hole. Fairway Flow product tools and MetaMask rewards are at `/dashboard.html?view=rewards`. The earlier Pinehurst work is retained in source/history.

A golf course traffic and pace-of-play prototype for Monad Good.

## Run

No installation or build is required. Serve `dist/` with any static HTTP server, for example:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Use `npm test` for ETA tests and `npm run check` for JavaScript syntax checks.

## What works

- Full-screen scroll-driven Pinehurst flight with group-specific arrival and clear-hole ETAs, hole targets and traffic.
- Native video scrubbing, integrated pace overlays, illustrative group markers and reduced-motion support. Completed holes are marked played; historical arrivals are not invented.

- Course operations dashboard, schematic map, per-hole occupancy, group search and pace filters.
- Group detail views with current-hole targets, upcoming hole arrival estimates, and round finish ETAs.
- Five-minute simulation steps, local marshal check-in notes, player group selection and manual demo hole check-out.
- Browser-local persistence and reset. No data is shared between devices yet.
- Monad rewards integration preview, clearly marked as not connected.

Pinehurst No. 2 course facts and hole previews are sourced in SOURCES.md. Weather, staff profiles, groups, positions, and tee times are sample data. Simulation starts at 11:30; it is not a live clock. The map is schematic, not GPS.

## ETA model

18 configurable-in-code hole targets total 255 minutes. The model uses elapsed time over completed holes to estimate a pace factor, bounded to 0.85–1.4. It subtracts current hole progress and uses a conservative 8-minute gap behind projected preceding groups. This is a prototype heuristic; real tee intervals, paths, starts, overtakes and staff interventions need calibration. It does not predict actual physical positions.

## Next implementation milestones

1. Course setup and staff authentication with roles.
2. A shared backend for tee sheets, groups, hole check-ins and staff audit events.
3. Consented GPS tracking or QR check-ins, retention controls and offline handling.
4. ETA calibration against real course rounds and bottleneck measurements.
5. Monad testnet: course attestation service and a reviewed badge contract (MetaMask connection is implemented). Keep location and personal data off-chain. Prevent replay and duplicate claims; do not reward unverified phone check-ins.

The current app sends no messages, requests no GPS permissions and performs no blockchain transactions. Never commit private keys or service credentials.

## Pinehurst No. 2 immersive flight

The opening view is now a full-screen scroll-controlled flight with the pace UI over the course footage. Scrolling down advances the camera; scrolling up reverses it; stopping holds the frame. Normal page scrolling is retained. The dashboard is available from the top-right button.

All 18 native video segments are packaged locally, each eight seconds long with keyframes every three frames for fast seeks. Two paused video elements swap between the current and next hole. The original YouTube player is no longer loaded. First-frame posters provide a fallback while a segment loads.

Hole details, arrival/clear-hole ETAs and clickable simulated group markers update on the same hole timeline. The markers move using an illustrative perspective projection; they are not georeferenced to the footage or live GPS. Select another group, use Find my group, jump between holes, or advance the demo by five minutes. Still mode and OS reduced-motion preferences turn off camera movement within holes.

See SOURCES.md and the flight manifest for source attribution and edit timing. To recreate the segments from a local source video with FFmpeg installed:

```sh
python3 scripts/prepare-flight.py --source /path/to/source.mp4
```

Local tests verify scroll mapping, forward/reverse navigation calculations, ETA state and media coverage. Packaged videos were checked with FFprobe for duration, codec, frame count, no audio and keyframe spacing. Browser rendering and device scrubbing performance remain unverified in this environment.

## Brand

The approved Fairway Flow logo is the three-golfer fairway-F design. Both the dashboard and immersive flight use `dist/assets/brand/fairway-flow-logo.png`. See BRAND.md for future updates.

## How it works

Use the How it works navigation link from the flight or sidebar, or continue below the course walkthrough for an introduction. The separate guide explains the product’s purpose, the golfer and course-team experience, a four-step interactive walkthrough, and the distinction between the current simulation and planned shared tracking/Monad features. Each step links to the matching app view.

## MetaMask / Monad Testnet

Open `/?view=rewards` and click **Connect MetaMask + Monad Testnet** in a browser with MetaMask installed, or use MetaMask’s mobile browser. Approve the account connection and network addition/switch in the wallet. The app uses injected EIP-1193 providers and EIP-6963 discovery, verifies chain ID 10143 (`0x279f`), and reads the public account and MON balance. It handles account/network changes, rejected or pending requests, balance refresh and disconnect/revocation.

Only account access, network management and read operations are used. No signing, asset approvals, transfers, contract deployment or badge minting is implemented. Wallet addresses are kept in session memory, not stored in browser persistence. Wallet connection is not a verified login. Badges still need a contract and course attestation backend.

Official configuration: https://docs.monad.xyz/developer-essentials/testnet and https://docs.monad.xyz/guides/add-monad-to-wallet/testnet . RPC: https://testnet-rpc.monad.xyz ; explorer: https://testnet.monadvision.com ; faucet: https://faucet.monad.xyz . Public endpoints may be rate limited. Provider tests use mocks; actual MetaMask approval and end-to-end network access must be completed in the user’s browser.

## Yardage and ball-flight preview

In the course view, open **Yardage & ball flight**. Choose U.S. Open, Blue or White tees to update the official scorecard yardage and par. Select an illustrative carry, replay the shot, or toggle yardage markers and the ball-flight line. The ball follows the hole’s scroll progress; replay animates independently while the camera is held. Reduced-motion mode shows the landing frame.

The carry/remaining arithmetic uses the selected tee’s hole length. Yardage marker placement and shot geometry over the footage are illustrative screen projections, not measured terrain, real shot tracking, hazard carries or advice for choosing a club. Source: Pinehurst’s official scorecard at https://www.pinehurst.com/golf/courses/no-2/ . UX reference: https://coursepreview.golf/bandondunes/?hole=3 ; no reference source code, graphics or footage were reused.

Direct links support `?view=journey&hole=3`, plus overview, groups, player, rewards and about views. In-app navigation works with browser Back. Unit and control-handler tests cover tee changes, carry updates, layer toggles and replay; actual browser click-through remains unverified because the managed desktop JavaScript tool is unavailable.

## Current traffic demo

The shared interface uses `dist/course-registry.js` and `dist/data/{bandon,pinehurst,pebble,sawgrass}.json`. Search one of the four supported courses to change its 18 hole routes, terrain and media availability. The map is rendered from community OpenStreetMap data, with local per-course JSON and in-place group updates. This is a visual traffic simulation, not deployed shared GPS tracking. Flyover labels are approximate projections. Course geometry and device behavior require field validation before operational use. Geographic data is ODbL; see SOURCES.md.

## Shared Pinehurst / Bandon preview

Open `/course-preview.html?course=pinehurst&hole=1` for Pinehurst No. 2 or `/course-preview.html?course=bandon&hole=1` for Bandon. The same UI provides hole selection, scroll scrubbing, SD/HD, full view, tee markers, yardage estimates, scorecard, handicap chart and geographic overview. Use the Courses tab to switch without changing the layout. The main course traffic map’s Flyover link preserves the selected course and hole.

Pinehurst has eighteen independent maps and flyovers and seven official tee sets. The generated maps use existing OpenStreetMap geometry; tee placement and map pointer distances are approximate. Browser visual comparison remains unverified in this environment.

## Pebble Beach

Pebble Beach Golf Links now has its own 18 hole flyovers in HD/SD, poster frames, geographic hole maps, and five scorecard tee sets in the shared preview. Open `/course-preview.html?course=pebble&hole=1`, choose it in the preview’s Courses menu, or select it in the main course search and open Flyover. See SOURCES.md and the Pebble media manifest for the supplied video, source intervals, scorecard and map provenance. No live GPS or real ball tracking is inferred from the footage.

TPC Sawgrass now supports all 18 HD/SD flyovers in the shared walkthrough at `course-preview.html?course=sawgrass&hole=1`, with six official Stadium Course tee sets, course-specific maps, and the existing pace overlay.
