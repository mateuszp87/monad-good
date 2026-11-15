export function videoTime(progress,duration,fps=24){if(!Number.isFinite(duration)||duration<=0)return 0;return Math.max(0,Math.min(1,progress))*Math.max(0,duration-1/fps);}
// Always keep the latest scroll position. Native seeking can coalesce requests;
// seeked re-applies the newest target instead of losing a fast final scroll.
export function createVideoScrubber(video,onFrame=()=>{}){let progress=0;
 function pump(){if(video.readyState<1||!Number.isFinite(video.duration)||video.seeking)return;const target=videoTime(progress,video.duration);if(Math.abs(video.currentTime-target)<=1/30){if(video.readyState>=2)onFrame();return;}try{video.currentTime=target;}catch{/* A source swap can invalidate a pending seek. Retry on metadata. */}}
 function arrived(){if(video.readyState>=2)onFrame();pump();}
 const events={loadedmetadata:pump,durationchange:pump,loadeddata:arrived,seeked:arrived,canplay:arrived};for(const [name,fn] of Object.entries(events))video.addEventListener(name,fn);
 return {setProgress(p){progress=Math.max(0,Math.min(1,p));pump();},reset(){progress=0;},destroy(){for(const [name,fn] of Object.entries(events))video.removeEventListener(name,fn);}};
}
