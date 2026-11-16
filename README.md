# Fairway Flow

**Golf course traffic, clearer pace, and a more predictable round.**

Fairway Flow is a phone-first golf traffic prototype: golfers watch anonymous tee-time groups, understand delays ahead, and inspect their own pace. A separate course operations view helps staff inspect bottlenecks and hole targets. The current experience is a simulation, not a deployed shared-location service.

- **Demo:** https://fairway-flow-monad.ripethyme64.chatgpt.site/
- **Course operations:** https://fairway-flow-monad.ripethyme64.chatgpt.site/operations.html
- **Project repository:** https://github.com/mateuszp87/monad-good
- **Submission status:** [Checklist and remaining requirements](docs/SUBMISSION_CHECKLIST.md)

## Try the demo

1. Choose Bandon Dunes, Pinehurst No. 2, Pebble Beach, or TPC Sawgrass.
2. Watch traffic without joining, or join the simulated 08:30 group with `FLOW0830`.
3. Pan, pinch/scroll to zoom, jump holes, or open **Whole course**. Dots reveal tee-time identity, position and pace on hover, keyboard focus or tap.
4. In **Round settings**, choose **Show hole 5 delay**. The 08:20 group exceeds its illustrative hole target. Tap **View affected hole** to inspect timing and a scripted course note. Waiting groups are not penalized.
5. Choose **Show the queue behind it** to inspect waiting followers and the gradual recovery. The model retains their elapsed delay instead of snapping markers back onto schedule.
6. While playing, select a fresh group on the same hole to see approximate straight-line yardage. Yardage is omitted across holes, in spectator mode and for uncertain locations. It is not a safe-to-hit signal.

## Run locally

Prerequisites: Node.js 22+ and npm; Python 3 for the example static server. No production build step, Google Maps key, wallet or paid map key is required for this demo.

```sh
npm ci
npm test
npm run check
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Device location requires HTTPS or localhost and explicit browser permission. Optional GPS stays on the device and is not shared with other golfers or staff.

GitHub Actions runs the test and syntax-check commands on pushes and pull requests. Tests cover timing, group order, delay transitions, UI event handlers, course datasets, media manifests, and mocked wallet/GPS behavior; they do not replace real-phone or real-wallet validation.

## What is implemented

- Four community-mapped geographic courses with 18 holes each, terrain overlays and separate pre-round media previews.
- A phone map interface, tee-time group inspection, course/hole browsing, round check-in simulation and summary.
- Closer vector-map zoom up to level 20. Historical USGS aerial imagery has native level-16 resolution; the app switches to course detail beyond 16.75 rather than presenting magnified photos as sharper imagery.
- Par-weighted illustrative hole targets, editable locally, plus a deterministic hole-5 delay and contextual alerts.
- Independent staff demo with tee-time filtering, group inspection, hole targets and local observations.
- Optional local device GPS, accuracy/status reporting and stop controls; foreground browser notifications when enabled.
- MetaMask/EIP-1193/EIP-6963 connection, Monad Testnet network management and public balance reads in the optional [reward flow](https://fairway-flow-monad.ripethyme64.chatgpt.site/rewards.html).

## What is not implemented

No shared GPS backend, real course check-in service, production staff authentication, surveyed course zones, calibrated finish prediction, background tracking/push service, reward contract, token mint, real $5 credit, or on-chain reward claim is deployed. Browser-local storage is not a shared database or access-control system. Demo codes are not authentication. Staff observations are not transmitted. A wallet connection is not verified login.

The recovery-shot explanation is scripted; GPS cannot identify why a group is stopped. Do not present the simulation as real golfers, official course targets, course partnerships, or a completed native iOS/watch app.

## Monad and rewards

The wallet connection reads **Monad Testnet (chain ID 10143)** account and MON balance. The separate `rewards.html` page adds explicit user-confirmed deployment, course approval and claim transactions for the included `DemoPaceRewards` contract. It records 100 non-transferable, non-cash demo points per approved wallet/round and prevents duplicate claims. Mainnet is blocked in both the client and constructor.

The course chooses on pace after waiting adjustment, not eligible, or needs review. Only the contract owner can approve; golfers cannot claim without that on-chain approval. A one-wallet presentation can demonstrate both roles, but does not prove independent course verification.

**No reward contract has been deployed or reward claimed on Monad by the assistant.** A user must connect a funded test wallet and confirm the deployment/approval/claim steps. The local EVM tests exercise actual bytecode. See [testnet reward setup](docs/MONAD_REWARDS.md). Real course credits, production attestation, funding and redemption remain future work. Points are not MON or money.

## Project guide

- [Monad reward setup and limits](docs/MONAD_REWARDS.md)
- [Product requirements and acceptance criteria](docs/PRODUCT_REQUIREMENTS.md)
- [Architecture and production gaps](docs/ARCHITECTURE.md)
- [Judge demonstration script](docs/DEMO_SCRIPT.md)
- [Submission checklist and draft project description](docs/SUBMISSION_CHECKLIST.md)
- [Sources, licensing and media provenance](SOURCES.md)
- [Approved brand](BRAND.md)
- [Older preview implementation notes](docs/LEGACY_PREVIEWS.md) — historical, not the current entry flow

The course imagery, geometry, media and Leaflet library have their own licenses and attribution requirements; see SOURCES.md and vendor license files. Do not assume third-party footage can be relicensed as project-owned assets. No blanket license is granted over those assets by this README.
