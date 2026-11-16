import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseHTML} from 'linkedom';
test('staff can inspect traffic, filter tee times, and save course-scoped observations without dispatching messages',async t=>{
 const {window,document}=parseHTML(readFileSync(new URL('../dist/operations.html',import.meta.url),'utf8'));
 const keys=['window','document','fetch','localStorage','setInterval','clearInterval'];const old=Object.fromEntries(keys.map(k=>[k,globalThis[k]]));t.after(()=>Object.assign(globalThis,old));Object.assign(globalThis,{window,document});
 const store=new Map();globalThis.localStorage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};globalThis.fetch=async path=>({ok:true,json:async()=>JSON.parse(readFileSync(new URL('../dist/'+path,import.meta.url),'utf8'))});let tick;globalThis.setInterval=cb=>{tick=cb;return 1;};globalThis.clearInterval=()=>{};
 for(const s of document.querySelectorAll('select'))Object.defineProperty(s,'value',{value:s.id==='ops-filter'?'all':'auto',writable:true});
 const map={attributionControl:{setPrefix(){}},setView(){return this;},fitBounds(){return this;}};function layer(){return {on(){return this;},addTo(){return this;},remove(){}};}window.L={map:()=>map,tileLayer:layer,polyline:layer,polygon:layer,layerGroup:layer,divIcon:o=>o,marker:(p,o)=>{const el=document.createElement('div');el.innerHTML=o.icon.html;return {...layer(),setLatLng(){},getElement:()=>el};}};
 await import('../dist/operations.js?test');await new Promise(setImmediate);
 assert.equal(document.querySelectorAll('#ops-course option').length,4);assert.equal(document.querySelectorAll('#ops-groups tr').length,8);assert.equal(document.querySelector('#ops-active').textContent,'5');
 const filter=document.querySelector('#ops-filter');filter.value='scheduled';filter.onchange();assert.equal(document.querySelectorAll('#ops-groups tr').length,3);
 filter.value='attention';filter.onchange();assert.equal(document.querySelector('#ops-empty').hidden,false);
 const scenario=document.querySelector('#ops-scenario');scenario.value='stale';scenario.onchange({target:scenario});assert.equal(document.querySelector('#ops-finish').textContent,'—');assert.equal(document.querySelectorAll('#ops-groups tr').length,1);assert.match(document.querySelector('#ops-advice').textContent,/No pace warning/);
 document.querySelector('#ops-note').value='<img src=x onerror=alert(1)>';document.querySelector('#ops-save').onclick();assert.equal(document.querySelector('#ops-notes img'),null);assert.match(document.querySelector('#ops-notes').textContent,/<img/);assert.ok(store.has('ff-ops-notes-bandon'));assert.match(document.querySelector('#ops-note-status').textContent,/No message/);
 const course=document.querySelector('#ops-course');course.value='pebble';course.onchange({target:course});await new Promise(setImmediate);assert.equal(document.querySelector('#ops-notes').textContent,'');
 scenario.value='queue';scenario.onchange({target:scenario});assert.equal(document.querySelectorAll('#ops-target-inputs input').length,18);assert.match(document.querySelector('#ops-advice').textContent,/waiting does not count/);tick();assert.match(document.querySelector('#ops-clock').textContent,/demo clock/);
});
