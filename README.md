# Fairway Flow

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
5. Monad testnet: wallet connection, course attestation service, and a reviewed badge contract. Keep location and personal data off-chain. Prevent replay and duplicate claims; do not reward unverified phone check-ins.

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
