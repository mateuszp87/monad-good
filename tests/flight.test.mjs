import test from 'node:test';
import assert from 'node:assert/strict';
import {scrollFlight,flightPosition,journeyMarkup} from '../dist/journey.js';
import {seed} from '../dist/pace.js';
import {readFileSync,existsSync} from 'node:fs';
test('scrolling controls every hole in both directions without advancing time',()=>{
 const top=100,height=29800,viewport=1000,span=1600;
 assert.deepEqual(scrollFlight(0,top,height,viewport),{index:0,progress:0,total:0});
 for(let i=0;i<18;i++){
  const midpoint=top+(i+.5)*span;
  const frame=scrollFlight(midpoint,top,height,viewport);
  assert.equal(frame.index,i);assert.ok(Math.abs(frame.progress-.5)<1e-10);
 }
 const forward=scrollFlight(top+8.8*span,top,height,viewport);
 const backward=scrollFlight(top+8.2*span,top,height,viewport);
 assert.equal(forward.index,backward.index);assert.ok(backward.progress<forward.progress);
 assert.deepEqual(scrollFlight(999999,top,height,viewport),{index:17,progress:1,total:1});
});
test('camera progress moves illustrative group labels, keeping them in view',()=>{
 const a=flightPosition(.6,.1,0),b=flightPosition(.6,.8,0);
 assert.ok(b.y>a.y);assert.notEqual(a.x,flightPosition(.6,.1,1).x);
 for(const p of [0,.5,1])for(const c of [0,.5,1]){
  const xy=flightPosition(p,c,-1);assert.ok(xy.y>=24&&xy.y<=69);assert.ok(xy.x>0&&xy.x<100);
 }
});
test('all 18 native segments and poster frames are packaged and mapped',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../dist/assets/pinehurst/flight-manifest.json',import.meta.url)));
 assert.equal(manifest.length,18);
 for(const row of manifest){
 assert.equal(row.duration,8);assert.ok(row.sourceEnd>row.sourceStart);assert.ok(row.bytes<25*1024*1024);
 const n=String(row.hole).padStart(2,'0');for(const ext of ['mp4','jpg'])assert.ok(existsSync(new URL(`../dist/assets/pinehurst/flight-${n}.${ext}`,import.meta.url)));
 }
});
test('HUD, markers, and motion controls share the pinned flight stage',()=>{
 const html=journeyMarkup(seed[5],seed);
 assert.ok(html.includes('data-flight-panel="10"'));assert.ok(html.includes('data-flight-pins="10"'));assert.ok(html.includes('data-pin-progress='));assert.ok(html.includes('Simulated positions · not live GPS'));assert.ok(html.includes('flight-motion-toggle'));assert.ok(!html.includes('autoplay'));assert.ok(!html.includes('<iframe'));
});
