# Pinehurst No. 2 demo sources

## Course facts

Official course page and U.S. Open scorecard: https://www.pinehurst.com/golf/courses/no-2/

Par and yardages in `dist/pinehurst.js` are U.S. Open tees (70, 7,588 yards), not resort/White tees. Hole titles are our own display labels, not official names. Pace targets are illustrative app settings, not Pinehurst policies.

## Drone footage

Golf Digest, *Every Hole at Pinehurst No. 2*: https://www.youtube.com/watch?v=o-e6617kfbU

Publisher page: https://www.golfdigest.com/video/every-hole-at/every-hole-at-pinehurst-no--2

Official Pinehurst reference: https://www.pinehurst.com/news/every-hole-at-no-2/

The active experience uses native, silent video segments derived from the publisher’s publicly served copy of the same flyover. Each hole’s segment is retimed to eight seconds and encoded at 960×540, 24 fps, with keyframes every three frames and fast-start metadata. The original source video is not stored in the repository. The source link and Golf Digest credit are displayed in the experience.

`dist/assets/pinehurst/flight-manifest.json` records each segment’s original source time range, output duration and byte size. `scripts/prepare-flight.py --source /path/to/source.mp4` reproduces the files using FFmpeg. The hole 8 segment ends before the long greens-design interlude. Native video stays paused; scroll position sets its time. Forward/reverse scrolling, hole navigation and overlays use the same progress value. This is an edited demonstration, not uninterrupted drone footage between all 18 holes; source camera cuts remain.

Source hole timing cues were identified from the publisher’s captions. The first and last 1.7 seconds of each cue span are omitted. Visual QA of the packaged contact sheet confirms aerial course footage; exact original shot-to-hole matching and browser scrubbing performance still need browser review. All rights in source footage remain with their owners. No ownership of the footage is claimed.

## Hole-specific preview photos

Pinehurst's official course page links to the SkyFox course viewer:
https://tours.skyfoxgolf.com/360/pinehurst-no-2/clubhouse

Each of the 18 small aerial previews is that viewer's corresponding hole thumbnail:
https://tours.skyfoxgolf.com/storage/thumbnails/pinehurst_no2/hole1_thumbnail.jpg
(and hole2 through hole18). These are low-resolution previews, not extracted frames from the video. Source links are displayed in the app. No ownership of these images is claimed. Production media licensing and high-resolution originals must be arranged before a commercial release.

## Simulation

Golfers, group names, current hole assignments, time spent on holes, fairway progress and ETA data are simulated. Group markers use elapsed time as a fraction of the demo hole target and a simple camera-progress screen projection. They do not represent geographic coordinates or computer-vision-tracked points in the footage. No GPS, Pinehurst tee-sheet feed, or course operations feed is connected. Original schematic overview remains illustrative; the hole journey uses course-specific photos and the source video.

This is an independent concept demo, not an official Pinehurst, SkyFox or Golf Digest product.

## Interactive round map

`round-demo.html` adds a Leaflet/OpenStreetMap interactive demo, linked from the existing workspace. Leaflet 1.9.4 loads from unpkg; standard tiles load directly from tile.openstreetmap.org with OpenStreetMap attribution. Community tiles are used for modest interactive demonstration only, without bulk downloads or prefetch. See https://operations.osmfoundation.org/policies/tiles/ before production rollout. This is a standard basemap, not satellite imagery.

All numbered group markers are simulated on synthetic routes near approximate course centers. They are not verified hole locations or live people. Hole shortcuts intentionally open the illustrative diagram until accurate hole geometry is supplied. Optional device geolocation appears as a separate blue marker; permission is requested only after pressing Show my location, and coordinates stay in the browser. No location uploads, cross-device sharing, or background tracking are enabled in this static release. Stop GPS, leaving the page, ending or resetting the round stops its watcher. Four-course timing windows, alerts and $5 credit outcomes remain simulated.

# Bandon Dunes front experience

Reference requested by the user: https://coursepreview.golf/bandondunes/?hole=3

The Bandon entry uses the reference’s public Bandon course facts (all six yardage sets, pars, handicaps and tee/pin map placements), hole-map SVGs, thumbnail photos, Bandon course emblem and sequential aerial frames. The app code and stylesheet are a new implementation of the requested split-map/flyover layout and controls. No CoursePreview analytics, trackers, original scripts, fonts, long hole descriptions or CoursePreview brand marks were copied.

Assets are from `https://coursepreview.golf/bandondunes/holemaps/{hole}k.svg`, `frames/Hole{hole}/HQimage_000025.jpg`, `frames/Hole{hole}/720image_{frame}.jpg`, and `images/logo1.svg`. Frame sequences were encoded into eight-second paused H.264 flyovers at 960px and 480px widths, with keyframes every three frames. Yardage and flight markings already present in the source frames remain part of the footage; they do not dynamically change when the selected tee changes.

Some public sequences have fewer available consecutive frames than the page’s listed frame counts. The build uses the available consecutive range starting at frame zero. `dist/assets/bandon/manifest.json` records available source frame counts and encoded media metadata. The original Pinehurst experience remains in source/history but is no longer the front page.

The UI is an independent Fairway Flow demonstration with source attribution, not an official Bandon Dunes or CoursePreview service. Pointer distances are linear map estimates calibrated from selected tee to pin, not surveyed hazard carries or club recommendations. No GPS or live Bandon tee-sheet data is connected. Browser rendering has not been visually compared because the managed browser tool is unavailable.

## Persistent connected-course experience

The new round-demo screen uses the latest existing Bandon assets and Pinehurst media in separate hole-image and flyover views. It does not add imagery downloaded from the reference. Existing production media-rights limitations remain. Source attribution is visible in the interface.

The whole-course view initializes a single Leaflet map and never attaches synthetic group coordinates to real terrain. It shows approximate course-area centers and optional actual device GPS with accuracy and freshness. No hole polygons are claimed. Demo group progress remains in a separate relative-progress panel, not projected onto uncalibrated images. Other courses have geographic previews but no invented hole media or scorecard facts. No shared GPS backend, actual rewards, or remote notifications are connected in this static release.

Leaflet 1.9.4 JS/CSS are vendored under dist/vendor with their BSD license, avoiding a runtime CDN dependency for the map library. OpenStreetMap tiles and attribution remain external, subject to the community tile usage policy. The map persists through hole changes, simulation ticks, scenario selection, and view switches. Live shared tracking and geographically accurate hole transitions remain a separate field-test milestone.

## Map-first round simulation

The primary index and round-demo routes now use play.js and play.css. The original Bandon scroll flyover is preserved at course-preview.html; the prior round explorer is preserved at round-review.html.

The primary demo is an interactive atlas of existing Bandon hole SVG artwork. Hole panels are arranged in a browsing grid, NOT in their actual geographic relationship. Demo groups move between tee and green positions supplied by the existing bandon-model, using illustrative straight-line interpolation. Their positions are not measured or geographically calibrated. Labels distinguish the illustrated atlas from the separate OpenStreetMap/device-GPS view. Course artwork provenance and production-rights caveats remain unchanged.

Starting a round runs an accelerated simulation. Individual Leaflet markers update in place; the map container and group markers are retained. Users can select groups, follow their own group across holes, browse the atlas, pause, scrub time, change speed, and explore traffic scenarios. Automatic mode introduces and clears a sample queue. Alerts, finish times, and rewards are scenario outputs, not validated predictions or real payments. Actual shared golfer tracking is not deployed.

DOM integration tests exercise start, playback, hole browsing, pause and reset while asserting the map host and marker instances remain stable. These are tests with a mocked map engine, not visual browser verification. Real-device GPS and rendering remain field-test requirements.
