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
4. In **Round settings**, choose **Show hole 5 delay**. The 07:50 group exceeds its illustrative hole target. Tap **View affected hole** to inspect timing and a scripted course note. Waiting groups are not penalized.
5. While playing, select a fresh group on the same hole to see approximate straight-line yardage. Yardage is omitted across holes, in spectator mode and for uncertain locations. It is not a safe-to-hit signal.

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
- MetaMask/EIP-1193/EIP-6963 connection, Monad Testnet network management and public balance reads in the optional [wallet view](https://fairway-flow-monad.ripethyme64.chatgpt.site/dashboard.html?view=rewards).

## What is not implemented

No shared GPS backend, real course check-in service, production staff authentication, surveyed course zones, calibrated finish prediction, background tracking/push service, reward contract, token mint, real $5 credit, or on-chain reward claim is deployed. Browser-local storage is not a shared database or access-control system. Demo codes are not authentication. Staff observations are not transmitted. A wallet connection is not verified login.

The ball-search explanation is scripted; GPS cannot identify why a group is stopped. Do not present the simulation as real golfers, official course targets, course partnerships, or a completed native iOS/watch app.

## Monad and rewards

The implemented integration connects a wallet to **Monad Testnet (chain ID 10143)** and reads its MON balance. It requests no transaction signatures, approvals or transfers. Test tokens have no promised monetary value. Check current network details with [Monad's official docs](https://docs.monad.xyz/).

The proposed next phase is course-approved, traffic-adjusted eligibility, backed by a course-funded benefit and an optional signed on-chain claim. Location and personal data should remain off-chain. A reviewed contract, attestation backend, replay protection and funding are still required. Connecting a wallet does not issue a reward.

## Project guide

- [Product requirements and acceptance criteria](docs/PRODUCT_REQUIREMENTS.md)
- [Architecture and production gaps](docs/ARCHITECTURE.md)
- [Judge demonstration script](docs/DEMO_SCRIPT.md)
- [Submission checklist and draft project description](docs/SUBMISSION_CHECKLIST.md)
- [Sources, licensing and media provenance](SOURCES.md)
- [Approved brand](BRAND.md)
- [Older preview implementation notes](docs/LEGACY_PREVIEWS.md) — historical, not the current entry flow

The course imagery, geometry, media and Leaflet library have their own licenses and attribution requirements; see SOURCES.md and vendor license files. Do not assume third-party footage can be relicensed as project-owned assets. No blanket license is granted over those assets by this README.
