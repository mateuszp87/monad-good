import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyRows,journeyMarkup} from '../dist/journey.js';
import {seed,forecast,clock,advance} from '../dist/pace.js';
test('18-hole journey distinguishes past, current, and forecast arrivals',()=>{
 const group=seed[5],rows=journeyRows(group,seed),f=forecast(group,seed);
 assert.equal(rows.length,18);
 assert.equal(rows[0].eta,'Played');assert.equal(rows[0].exit,null);
 assert.equal(rows[9].eta,'Playing now');assert.equal(rows[9].current,true);
 assert.equal(rows[10].eta,clock(f.arrivals.find(a=>a.hole===11).at));
 assert.equal(rows[17].exit,clock(f.finish));
 assert.equal(rows[9].occupancy,2);
});
test('course journey updates from the selected group and simulated progress',()=>{
 const first=journeyRows(seed[0],seed),second=journeyRows(seed[11],seed);
 assert.equal(first[14].current,true);assert.equal(second[6].current,true);
 const next=advance(seed,30),g=next[11],rows=journeyRows(g,next);
 assert.ok(g.hole>seed[11].hole);assert.equal(rows[g.hole-1].current,true);
});
test('completed rounds have no future arrival estimates',()=>{
 const group={...seed[0],hole:19,elapsed:255};
 assert.ok(journeyRows(group,[group]).every(r=>r.passed&&r.eta==='Played'&&r.exit===null));
});
test('every journey chapter has a unique anchor, target, and traffic control',()=>{
 const html=journeyMarkup(seed[5],seed);
 for(let h=1;h<=18;h++){
 assert.equal(html.split(`id="journey-hole-${h}"`).length-1,1);
 assert.ok(html.includes(`data-chapter="${h}"`));assert.ok(html.includes(`data-hole="${h}"`));
 }
 assert.equal((html.match(/class="[^"]*\bchapter-eta\b/g)||[]).length,18);
});
