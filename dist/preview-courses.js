import {bandon} from './bandon-data.js';
import {pinehurstPreview} from './pinehurst-preview-data.js';
export const previewCourses=[
 {id:'bandon',name:'Bandon Dunes',defaultTee:4,data:bandon,teeNames:['Navy','Red','Gold','Green','Black','Chrome'],teeColors:['#39496b','#d9523c','#cca353','#3e6237','#181818','#808080'],photoPrefix:'hole',logo:'assets/bandon/bandon-logo.svg',center:[43.187,-124.391],bounds:[-124.408,43.178,-124.376,43.199],source:'CoursePreview'},
 {id:'pinehurst',name:'Pinehurst No. 2',defaultTee:1,data:pinehurstPreview,teeNames:['U.S. Open','Blue','Ross','White','Tufts','Green','Red'],teeColors:['#222222','#39496b','#8d754f','#949494','#b69c53','#3e6237','#d9523c'],photoPrefix:'flight',logo:'assets/pinehurst/course-logo.png',center:[35.190,-79.467],bounds:[-79.474,35.181,-79.448,35.203],source:'Golf Digest · OpenStreetMap'}
];
export const getPreviewCourse=id=>previewCourses.find(c=>c.id===id)||previewCourses[0];
