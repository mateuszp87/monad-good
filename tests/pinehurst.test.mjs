import test from 'node:test';
import assert from 'node:assert/strict';
import {pinehurstHoles,videoTimeFor,positionOnHole} from '../dist/pinehurst.js';
import {journeyMarkup,holeTraffic} from '../dist/journey.js';
import {seed} from '../dist/pace.js';
import {existsSync} from 'node:fs';
test('Pinehurst official U.S. Open tee data totals par 70 and 7,588 yards',()=>{
 assert.equal(pinehurstHoles.length,18);
 assert.equal(pinehurstHoles.reduce((a,h)=>a+h.par,0),70);
 assert.equal(pinehurstHoles.reduce((a,h)=>a+h.yards,0),7588);
});
test('each hole has a local aerial preview and ordered playable video cue',()=>{
 for(let i=0;i<18;i++){const h=pinehurstHoles[i];assert.ok(existsSync(new URL(`../dist/${h.image}`,import.meta.url)));assert.ok(h.end>h.start);if(i)assert.ok(h.start>=pinehurstHoles[i-1].end);assert.equal(videoTimeFor(i+1,-2),h.start);assert.ok(videoTimeFor(i+1,2)<h.end);}
});
test('golf position simulation is bounded and excludes groups on other holes',()=>{
 assert.equal(positionOnHole({inHole:500},14),.94);assert.equal(positionOnHole({inHole:-3},14),.04);
 const html=holeTraffic(10,seed,6);assert.ok(html.includes('Weekend Warriors'));assert.ok(html.includes('The Back Nine'));assert.ok(!html.includes('Fresh Cut'));assert.ok(html.includes('SIMULATED · NOT GPS'));
});
test('footage is opt-in with a direct source and complete fallback coverage',()=>{
 const html=journeyMarkup(seed[5],seed);assert.ok(html.includes('Enable drone footage'));assert.ok(!html.includes('<iframe'));assert.ok(html.includes('youtube.com/watch?v=o-e6617kfbU'));assert.ok(html.includes('Pinehurst'));
 for(const h of pinehurstHoles)assert.ok(html.includes(`data-chapter="${h.hole}"`));
});
