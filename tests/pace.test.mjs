import test from 'node:test';
import assert from 'node:assert/strict';
import {forecast,advance,holes,totalTarget,seed,clock} from '../dist/pace.js';
test('course totals and clock formatting',()=>{assert.equal(holes.length,18);assert.equal(totalTarget,255);assert.equal(clock(690),'11:30');});
test('an on-target solo round finishes at target time',()=>{const g={tee:480,hole:2,elapsed:19,inHole:5};const f=forecast(g,[g]);assert.equal(f.finish,735);assert.equal(f.delay,0);assert.equal(f.arrivals[1].at,506);});
test('traffic ahead delays the following group',()=>{const a={tee:480,hole:2,elapsed:55,inHole:5};const b={tee:490,hole:2,elapsed:45,inHole:5};assert.ok(forecast(b,[a,b]).finish>forecast(b,[b]).finish);});
test('advance crosses holes and preserves source data',()=>{const g={tee:480,hole:1,inHole:12,elapsed:12};const [updated]=advance([g]);assert.equal(updated.hole,2);assert.equal(updated.inHole,3);assert.equal(g.hole,1);});
test('completed rounds remain completed',()=>{const g={tee:480,hole:19,elapsed:255,inHole:0};assert.deepEqual(advance([g])[0],g);assert.equal(forecast(g,[g]).remaining,0);assert.equal(forecast(g,[g]).finish,735);});
test('all seeded projections are finite, ordered, and in the future',()=>{for(const g of seed){const f=forecast(g,seed);assert.ok(f.finish>=g.tee+g.elapsed);assert.ok(Number.isFinite(f.finish));for(let i=1;i<f.arrivals.length;i++)assert.ok(f.arrivals[i].at>=f.arrivals[i-1].at);}});
