# Product requirements

The primary job is to help golfers keep reasonable pace, understand traffic ahead and anticipate finishing time. Staff use a separate operations interface. This matrix distinguishes working demonstration behavior from production requirements.

| ID | Requirement / acceptance criterion | Current status |
|---|---|---|
| MAP-01 | Four searchable courses; the same interface uses each course's own 18-hole routes and terrain | Demo implemented |
| MAP-02 | Pan, pinch/scroll, explicit zoom controls, hole jumping and whole-course overview | Demo implemented; physical-device QA pending |
| MAP-03 | Close zoom uses vector course geometry through level 20; imagery is not represented as having detail it lacks | Demo implemented; high-resolution aerial source still needed |
| MAP-04 | Group markers are dots with 44px touch targets; hover/focus reveals identity; tap opens details | Demo implemented |
| MAP-05 | Selected group shows anonymous tee time, hole, approximate phase, pace and playing order | Demo implemented; phase is simulated, not GPS zone detection |
| MAP-06 | Yardages appear only in a player round for fresh groups on the same hole; explain straight-line approximation | Demo implemented; never a clearance-to-hit tool |
| PACE-01 | Course can set a target per hole; validate 18 whole-number values from 5–30 minutes | Local demo implemented; authenticated shared configuration needed |
| PACE-02 | Separate over-target play, an available gap, a traffic queue, and uncertain tracking | Demo implemented; field calibration required |
| PACE-03 | Scripted 08:20 group holds on hole 5; over-target alert follows a 3-minute grace period | Demo implemented; targets/grace require course validation |
| PACE-04 | Tapping a delay opens affected hole and shows target, elapsed time, overrun, evidence and attributed reason | Demo implemented; live reasons require golfer/staff confirmation |
| PACE-05 | Alerts do not move a browsing user's camera without an explicit action | Demo implemented |
| PACE-06 | Waiting behind traffic does not create a catch-up warning or reward penalty | Demo implemented; production eligibility engine not built |
| PACE-08 | A hold queues following groups, releases in order, carries elapsed delay forward and ends the round at modeled completion | Demo implemented; capacity assumptions require course validation |
| PACE-09 | Catch-up nudges require a sustained gap and must be suppressed for waiting or uncertain positions | Demo implemented; not a safe-to-hit signal |
| PACE-07 | Finish estimate reflects modeled delay rather than adding every upstream delay indiscriminately | Demo heuristic; not a validated prediction |
| ROUND-01 | Watch without joining; start/check-in; return to own group; stop GPS/end round | Demo implemented; code FLOW0830 is not real check-in |
| OPS-01 | Course-wide map, tee-time list, attention filters and observations | Local independent demo; no staff dispatch or cross-device synchronization |
| LOC-01 | Consent-based phone locations, timestamps, accuracy, stale/unknown states, group membership and revocation | Browser-local GPS only; shared service pending |
| LOC-02 | Background collection and reliable remote push on supported mobile devices | Not implemented; native platform work and field testing required |
| PRIV-01 | Anonymous group display by default; staff access scoped to course and active round | Demo anonymous labels; production identity/authorization pending |
| PRIV-02 | Retain raw location history no longer than the agreed one-week policy; retain aggregated pace data separately | Proposed policy; no shared location history currently collected |
| CHAIN-01 | Optional MetaMask connection to Monad Testnet and public balance read | Implemented, mocked tests; actual user wallet verification needed |
| CHAIN-02 | Owner approval and one-time claim of non-cash demo points on testnet | Contract/client implemented and local-bytecode tested; actual Monad deployment and user wallet confirmations pending |
| CHAIN-03 | Independently verified pace eligibility and funded real course benefits | Not implemented; requires staff identity, reviewed attestation and redemption/funding |

## Production release gates

1. A course validates route/geofence data, hole targets, target grace and actual operational response.
2. Build authenticated course/group/round storage and a consented shared-location ingestion service. Test role boundaries and revoke access when a round ends.
3. Calibrate pace/finish estimates with measured rounds and report uncertainty. Treat poor GPS or missing members as unknown, not slow.
4. Measure background reliability and battery use on actual iOS/Android devices over full rounds. Battery consumption goals are unverified, not guarantees.
5. Test the main phone tasks outdoors, one-handed, with novice users, reduced motion, keyboard/screen-reader access, weak connectivity and denied GPS.
6. Verify map/media licensing, attribution, provider limits and imagery coverage. Vector zoom cannot invent photographic resolution or survey accuracy.
7. Review reward economics, course funding, attestation security, privacy and contract behavior before any live claims.

## Product pushback

- Keep playing order ahead of distance. Adjacent holes can be close in space and far apart in round progress.
- Over a target is a signal to investigate, not proof of blame. Ball searches, medical issues, course maintenance, weather and upstream waiting require context.
- Keep alerts quiet and actionable. Prefer a gentle golfer-first nudge, then a verified staff workflow for persistent issues.
- Keep wallets out of the core golfer round. Course traffic must remain useful without one.
