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

## Four-course geographic traffic reset

The primary traffic interface now loads per-course records through course-registry.js. The four demo records are Bandon Dunes, Pinehurst No. 2, Pebble Beach Golf Links, and TPC Sawgrass Stadium Course. Each has 18 independently sourced OpenStreetMap hole-route polylines and surrounding mapped terrain. Search changes course data and geography in the same persistent interface. The selected course ID is shareable in the URL. No open-ended global course database is claimed.

Source: OpenStreetMap API map extracts, https://api.openstreetmap.org/api/0.6/map, with per-hole way URLs retained in dist/data/*.json. All derived geographic datasets are made available under ODbL 1.0; attribution to OpenStreetMap contributors is displayed on the map. See https://www.openstreetmap.org/copyright. The downloaded data replaces the atlas grid as the primary map. Community mapping can be incomplete or outdated and has not been surveyed or field-verified by this project.

Course map terrain is rendered locally from mapped polygons; it is not satellite imagery. Simulated groups interpolate along the selected course's mapped hole routes. Positions are synthetic, not actual people or measured GPS. Routes represent hole centerlines, not verified playable-area geofences. The separate street-map view uses OSM tiles and optional browser-only device GPS. Shared golfer locations and staff feeds remain unconnected.

The flyover tab uses the selected course's existing project media only. Bandon and Pinehurst have footage. Pebble Beach and Sawgrass show an explicit no-footage state rather than borrowed visuals. Flyover group labels are approximate demo screen projections; they are not geographically calibrated or tracked within the video. All original media licensing caveats still apply.


Hole 1 update: its complete available 108-frame sequence is now encoded over twelve seconds with a one-second hold on the green (13 seconds total) in both HD and SD. Other Bandon clips remain unchanged. The native scrubber uses each file’s actual duration and applies the latest requested position after a pending seek completes, including a fast scroll to the end.

## Aerial basemap and brand correction

The main course traffic map now uses USGS The National Map Imagery Only tiles, with attribution to USDA / USGS. Service: https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer . Official terms: https://www.usgs.gov/faqs/what-are-terms-uselicensing-map-services-and-data-national-map . USGS states that The National Map services and downloaded data are free and public domain. No Google/Esri account key is used. Requests for a level-16 tile at each of the four course centers returned HTTP 200 image/jpeg during setup. Higher advertised levels did not return cached tiles in these checks, so Leaflet uses maxNativeZoom 16 and scales those tiles at closer zooms.

Imagery is historical photography, not live imagery; dates and resolution vary. It does not establish current course conditions or surveyed accuracy, and hosted tile availability is outside this app's control. Course detail toggles to the local OSM-derived terrain fallback. Simulated group positions continue to interpolate along community-mapped hole routes and are not live golfer feeds. Existing optional device GPS remains browser-only.

The full approved three-golfer logo is restored using assets/brand/fairway-flow-logo.png. The introductory map card is removed; round start, status and settings are integrated into the sidebar (with a compact start button on mobile). Notifications are inline, not popup overlays. Existing flyover changes and video-scrubber fixes from the latest source are preserved.


## Pinehurst in the shared course-preview interface

Pinehurst No. 2 and Bandon Dunes now use the same `course-preview.html`, controller and stylesheet. Pinehurst uses its existing Golf Digest-derived local flyovers, plus SD versions, the course emblem from `https://tours.skyfoxgolf.com/storage/logos/pinehurst_no2_logo.png`, and seven tee sets from the official scorecard: https://www.pinehurst.com/golf/courses/no-2/ . Par and handicap change with the selected tee set where appropriate.

Its eighteen SVG hole maps are generated from the OpenStreetMap hole routes and terrain in `dist/data/pinehurst.json` (OpenStreetMap contributors, https://www.openstreetmap.org/copyright). Geometry is rotated into the same 450×800 map frame used by the Bandon viewer. Course data is community mapping, not a surveyed yardage book. Shorter-tee anchors are indicative points along the route based on relative hole lengths, not measured tee locations. Pointer distances remain illustrative map estimates. All source media rights remain with their owners; no affiliation is claimed.
## Course selection and pre-round preview

The entry page now opens the searchable four-course library. Selecting a course opens its map preview. Start round reveals the demo group markers and begins playback. The active-round view contains no flyover video or flyover tab. The optional preview.html?course=<id> experience is available before starting, with course-specific existing footage for Bandon/Pinehurst and aerial route-map previews for all four courses. Returning with Use this course opens the selected pre-round screen.

The preview uses native video playback and uncropped 16:9 presentation. Existing clips are 960×540; the app does not claim increased source resolution. The main aerial map limits zoom to 16.75 against maxNativeZoom 16 to avoid extreme enlargement. Imagery sharpness and recency remain limited by the actual source. No filters are used to pretend low-resolution media is higher-resolution.

Demo group speed varies slightly and remains constrained to the community-mapped hole routes. Movement is synthetic and not a shared location feed. The pre-round preview contains no group overlays. DOM tests exercise library selection, round controls, return to library, media selection, and map-only preview fallbacks; browser rendering remains unverified in this environment.


## Pebble Beach flyover

User-supplied footage: https://www.youtube.com/watch?v=6YrmRSEqOTo . The source is Golf Digest’s *Every Hole at Pebble Beach Golf Links in Pebble Beach, CA*, narrated by Jim Nantz. The same publisher-hosted video is at https://www.golfdigest.com/video/every-hole-at/every-hole-at-pebble-beach-golf-links-in-pebble-beach--ca . Local hole segments use that publisher’s public video copy. Original on-screen hole titles remain in the footage; documentary yardages can differ from today’s selected resort tee set.

Hole boundaries were checked against the captions, visual scene changes and the video’s numbered hole title graphics. The 16–18 overview montage between holes 15 and 16 is skipped. Each complete hole segment is retimed to 7.5 seconds, followed by a half-second final-frame hold, with native HD/SD seeking and no audio. `dist/assets/pebble/manifest.json` records the source intervals and encoded file metadata. The full source video is not committed.

Five tee sets, pars and men’s handicaps come from Pebble Beach’s linked official scorecard: https://www.pebblebeach.com/content/uploads/PebbleBeach-Scorecard.pdf (2024 document) via https://www.pebblebeach.com/golf/pebble-beach-golf-links/ . These are Blue/Gold/White/Green/Red resort tees, with par 72, not a championship par-71 setup. Hole maps are generated from the existing OpenStreetMap route/terrain data in `dist/data/pebble.json` (OpenStreetMap contributors, https://www.openstreetmap.org/copyright). Shorter-tee locations and pointer measurements are illustrative, as for Pinehurst. The shared viewer uses Fairway Flow’s own approved logo for this course.
