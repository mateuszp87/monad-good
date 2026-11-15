import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('Bandon controls change holes, tees, menu tabs, quality and full view',async()=>{
 const html=readFileSync(new URL('../dist/course-preview.html',import.meta.url),'utf8'),nodes=new Map(),events={},saved={};
 const keys=['document','window','location','history','matchMedia','requestAnimationFrame'];for(const k of keys)saved[k]=globalThis[k];
 const classes=new Set();
 function node(selector){if(!nodes.has(selector)){if(selector.startsWith('#'))assert.ok(html.includes(`id="${selector.slice(1)}"`),`Missing DOM target ${selector}`);const listeners={};nodes.set(selector,{hidden:['#course-menu','#settings-panel'].includes(selector),dataset:{},style:{},src:selector==='#course-map-frame'?'about:blank':'',textContent:'',innerHTML:'',classList:{add(){},remove(){}},addEventListener(k,fn){listeners[k]=fn;},setAttribute(k,v){this[k]=v;},getAttribute(k){return this[k];},close(){},showModal(){this.open=true;},load(){},pause(){},listeners});}return nodes.get(selector);}
 let currentUrl=new URL('https://example.test/?hole=3');
 const win={scrollY:0,scrollTo(){this.scrollY=0;},addEventListener(){}};
 globalThis.window=win;globalThis.location={get href(){return currentUrl.href;},get search(){return currentUrl.search;},replace(){}};globalThis.history={pushState(_a,_b,url){currentUrl=new URL(url);}};
 globalThis.document={querySelector:node,querySelectorAll(){return [];},addEventListener(k,fn){events[k]=fn;},documentElement:{scrollHeight:5500},body:{classList:{toggle(k){if(classes.has(k)){classes.delete(k);return false;}classes.add(k);return true;},contains(k){return classes.has(k);},remove(k){classes.delete(k);}}}};
 globalThis.matchMedia=()=>({matches:false,addEventListener(){}});globalThis.requestAnimationFrame=()=>1;
 try{await import('../dist/bandon.js');const click=(id,dataset={})=>events.click({target:{closest(){return {id,dataset,setAttribute(){}};}}});
 assert.equal(node('#hole-number').textContent,3);assert.ok(node('#description-meta').textContent.includes('489 YARDS'));
 click('menu-button');assert.equal(node('#course-menu').hidden,false);
 click('',{tab:'map'});assert.equal(node('#map-panel').hidden,false);assert.ok(node('#course-map-frame').src.includes('openstreetmap.org'));
 click('',{tee:'6'});assert.ok(node('#description-meta').textContent.includes('563 YARDS'));
 click('',{hole:'7'});assert.equal(node('#hole-number').textContent,7);assert.equal(node('#course-menu').hidden,true);assert.ok(currentUrl.search.includes('hole=7'));
 click('next-hole');assert.equal(node('#hole-number').textContent,8);click('previous-hole');assert.equal(node('#hole-number').textContent,7);
 click('',{quality:'sd'});assert.ok(node('#flight-video').src.endsWith('flight-07-sd.mp4'));
 click('settings-button');assert.equal(node('#settings-panel').hidden,false);click('full-view');assert.ok(classes.has('full-view'));
 }finally{for(const k of keys){if(saved[k]===undefined)delete globalThis[k];else globalThis[k]=saved[k];}}
});
