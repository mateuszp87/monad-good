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
