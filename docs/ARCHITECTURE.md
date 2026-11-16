# Architecture

## Current deployment

A static HTML/CSS/ES-module site is served from `dist/`, with a retained Sites identity in `.openai/hosting.json`. No app server, shared database or private service credentials are deployed. This GitHub repository is a source mirror/review location; pushing here does not automatically publish the Sites deployment.

- `play.js` / `play.html` / `phone.css`: primary golfer controller and responsive map interface. `index.html` and `round-demo.html` share the entry markup.
- `course-registry.js` and `data/*.json`: four cached geographic course datasets, community routes and terrain.
- `play-model.js` / `traffic-model.js` / `group-context.js`: chronological tee-time groups, per-hole targets, scripted delay timing, context and straight-line distance.
- `operations.js` / `operations.html`: independent course staff simulation. It uses the same model but not the same live session.
- `course-map.js`: optional device geolocation overlay, accuracy circle and status; no upload path.
- `wallet.js`: injected wallet discovery, account connection, Monad Testnet network setup and balance reads. No signer or reward contract path.
- `preview.*`, `course-preview.html`, media and older dashboard modules: separate course previews and retained product experiments. They are not the live location service.

### Map behavior

Leaflet is vendored. Historical USGS imagery is usable at native zoom 16; close zoom transitions to local vector terrain. Map level 20 permits inspection of existing geometry, not creation of missing details. The app requires network access to external tiles; local JSON routes and vector features remain packaged. Geometry and source dates are not survey guarantees.

Group dots retain larger hit areas. A selected group is distinct from the player's reference group. Approximate yardage uses geographic straight-line distance, only within the same hole and in a player round; it is suppressed for uncertain positions and spectators. It is not a safety or hitting-distance guarantee.

### Timing and alerts

The 08:20 demonstration group begins 10 minutes before the player's 08:30 tee time. Its time on hole 5 is extended by sixteen minutes; an alert begins when its target is exceeded by three minutes. This is a deterministic simulation. A user taps to inspect the affected hole; unsolicited alerts do not take over the camera. A recovery-shot note is authored scenario content, not inferred activity. Hole target edits restart the local simulation.

### Storage and privacy

Hole targets, quiet mode and staff observations may be browser-local. Groups and locations are simulated. Optional real device coordinates remain in browser memory; no shared history, server retention process or remote push is implemented. Production authorization must not rely on local storage, a public code or wallet connection.

## Proposed production services

- Course and staff identity, course-scoped roles and audit records.
- Round, tee time, anonymous group membership and per-member consent/revocation.
- Location observations with timestamp/accuracy, stale detection, safe rate limiting and retention deletion.
- Calibrated map matching and per-hole target versions; uncertain classification when evidence is weak.
- Pace events, finish estimate uncertainty, golfer-first notifications and verified staff interventions.
- Optional reward eligibility/attestation service, course funding and reviewed Monad claim contract. Keep precise locations and personal data off-chain.

Those are requirements for a live pilot, not deployed features. See PRODUCT_REQUIREMENTS.md for acceptance criteria.

## Queue propagation refinement
The schedule model gives each hole an entry and exit time for every group. The illustrative 08:20 hold delays the 08:30 group by 10 minutes and the 08:40 group by 4 minutes. A four-minute green-clearance headway is a demo capacity parameter, not a universal course target, safety distance or instruction to hit. Followers approach, wait, and release in playing order; their lost time carries into later holes and finish estimates. Completed groups leave the map. Catch-up guidance requires a sustained five-minute gap, sufficient open space in the model, and no blocked or uncertain observation. Physical safety and the course's rules always govern actual shots.
