import {bandon} from './bandon-data.js';
import {pinehurstPreview} from './pinehurst-preview-data.js';
import {pebblePreview} from './pebble-preview-data.js';
import {sawgrassPreview} from './sawgrass-preview-data.js';
export const previewCourses=[
 {id:'bandon',name:'Bandon Dunes',defaultTee:4,data:bandon,teeNames:['Navy','Red','Gold','Green','Black','Chrome'],teeColors:['#39496b','#d9523c','#cca353','#3e6237','#181818','#808080'],photoPrefix:'hole',logo:'assets/bandon/bandon-logo.svg',center:[43.187,-124.391],bounds:[-124.408,43.178,-124.376,43.199],source:'CoursePreview',sourceUrl:'https://coursepreview.golf/bandondunes/'},
 {id:'pinehurst',name:'Pinehurst No. 2',defaultTee:1,data:pinehurstPreview,teeNames:['U.S. Open','Blue','Ross','White','Tufts','Green','Red'],teeColors:['#222222','#39496b','#8d754f','#949494','#b69c53','#3e6237','#d9523c'],photoPrefix:'flight',logo:'assets/pinehurst/course-logo.png',center:[35.190,-79.467],bounds:[-79.474,35.181,-79.448,35.203],source:'Golf Digest · OpenStreetMap',sourceUrl:'https://www.pinehurst.com/golf/courses/no-2/'},
 {id:'pebble',name:'Pebble Beach Golf Links',defaultTee:1,data:pebblePreview,teeNames:['Blue','Gold','White','Green','Red'],teeColors:['#39496b','#cca353','#949494','#3e6237','#d9523c'],photoPrefix:'flight',logo:'assets/brand/fairway-flow-logo.png',center:[36.568,-121.950],bounds:[-121.962,36.557,-121.935,36.579],source:'Golf Digest · OpenStreetMap',sourceUrl:'https://www.pebblebeach.com/golf/pebble-beach-golf-links/'},
 {id:'sawgrass',name:'TPC Sawgrass · Stadium Course',defaultTee:1,data:sawgrassPreview,teeNames:['THE PLAYERS','Blue','Blue / White','White','White / Green','Green'],teeColors:['#222222','#39496b','#637b8d','#949494','#869b71','#3e6237'],photoPrefix:'flight',logo:'assets/brand/fairway-flow-logo.png',center:[30.198,-81.394],bounds:[-81.407,30.186,-81.379,30.209],source:'Golf Digest · OpenStreetMap',sourceUrl:'https://tpc.com/sawgrass/the-players-stadium-course/'}
];
export const getPreviewCourse=id=>previewCourses.find(c=>c.id===id)||previewCourses[0];
