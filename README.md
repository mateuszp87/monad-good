# Fairway Flow

A golf course traffic and pace-of-play prototype for Monad Good.

## Run

No installation or build is required. Serve `dist/` with any static HTTP server, for example:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Use `npm test` for ETA tests and `npm run check` for JavaScript syntax checks.

## What works

- Scroll-driven 18-hole course journey with an illustrated moving map, group-specific arrival and clear-hole ETAs, hole targets and traffic.
- Responsive sticky course illustration and reduced-motion support. Completed holes are marked played; historical arrivals are not invented.

- Course operations dashboard, schematic map, per-hole occupancy, group search and pace filters.
- Group detail views with current-hole targets, upcoming hole arrival estimates, and round finish ETAs.
- Five-minute simulation steps, local marshal check-in notes, player group selection and manual demo hole check-out.
- Browser-local persistence and reset. No data is shared between devices yet.
- Monad rewards integration preview, clearly marked as not connected.

All course names, weather, staff profiles, groups, positions, and tee times are sample data. Simulation starts at 11:30; it is not a live clock. The map is schematic, not GPS.

## ETA model

18 configurable-in-code hole targets total 255 minutes. The model uses elapsed time over completed holes to estimate a pace factor, bounded to 0.85–1.4. It subtracts current hole progress and uses a conservative 8-minute gap behind projected preceding groups. This is a prototype heuristic; real tee intervals, paths, starts, overtakes and staff interventions need calibration. It does not predict actual physical positions.

## Next implementation milestones

1. Course setup and staff authentication with roles.
2. A shared backend for tee sheets, groups, hole check-ins and staff audit events.
3. Consented GPS tracking or QR check-ins, retention controls and offline handling.
4. ETA calibration against real course rounds and bottleneck measurements.
5. Monad testnet: wallet connection, course attestation service, and a reviewed badge contract. Keep location and personal data off-chain. Prevent replay and duplicate claims; do not reward unverified phone check-ins.

The current app sends no messages, requests no GPS permissions and performs no blockchain transactions. Never commit private keys or service credentials.
