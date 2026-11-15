import test from 'node:test';
import assert from 'node:assert/strict';
globalThis.window={addEventListener(){}};
const {demoCoordinates}=await import('../dist/round-map.js');
test('demonstration route stays near the chosen course and never emits invalid coordinates',()=>{for(const c of [{lat:35.190,lng:-79.467},{lat:36.568,lng:-121.950},{lat:43.187,lng:-124.391},{lat:30.198,lng:-81.394}])for(const minute of [0,5,70,140,10000])for(let group=4;group<=12;group++){const [lat,lng]=demoCoordinates(c,group,minute);assert.ok(Number.isFinite(lat)&&Number.isFinite(lng));assert.ok(Math.abs(lat-c.lat)<.02&&Math.abs(lng-c.lng)<.02);}});
test('simulation changes a group position as time advances',()=>{const c={lat:35.190,lng:-79.467};assert.notDeepEqual(demoCoordinates(c,8,0),demoCoordinates(c,8,5));});
