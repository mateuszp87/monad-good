import {getPreviewCourse} from './preview-courses.js';
import {bandon} from './bandon-data.js';
export const teeNames=['Navy','Red','Gold','Green','Black','Chrome'];
export const teeColors=['#39496b','#d9523c','#cca353','#3e6237','#181818','#808080'];
export function holeState(hole,tee=4,courseId='bandon'){const course=getPreviewCourse(courseId),data=course.data;if(!Number.isInteger(hole)||hole<1||hole>18)throw new RangeError('Invalid hole');if(!Number.isInteger(tee)||tee<1||tee>course.teeNames.length)throw new RangeError('Invalid tee');return {hole,tee,yards:data.yardages[tee][hole],par:(data.pars?.[tee]||data.holePar)[hole],handicap:(data.handicaps?.[tee]||data.holeHandicap)[hole],teeName:course.teeNames[tee-1],total:data.courseYardage[tee-1]};}
export function mapPoints(hole,tee,courseId='bandon'){const data=getPreviewCourse(courseId).data;if(data.mapPositions)return data.mapPositions[hole][tee];const positions=bandon.teePlacement[hole],x=positions[(tee*2)-1]??5,y=positions[tee*2]??1;return {tee:{x:x*45,y:800*(1-y*.05625)},pin:{x:bandon.pinPos[hole]*45,y:90}};}
export function mapDistance(hole,tee,point,courseId='bandon'){const state=holeState(hole,tee,courseId),p=mapPoints(hole,tee,courseId),span=Math.hypot(p.tee.x-p.pin.x,p.tee.y-p.pin.y);const scale=state.yards/span;return {fromTee:Math.round(Math.hypot(point.x-p.tee.x,point.y-p.tee.y)*scale),toPin:Math.round(Math.hypot(point.x-p.pin.x,point.y-p.pin.y)*scale)};}
export function requestedHole(search){const h=Number(new URLSearchParams(search).get('hole'));return Number.isInteger(h)&&h>=1&&h<=18?h:3;}
export function flightProgress(scroll,height,viewport){return Math.max(0,Math.min(1,scroll/Math.max(1,height-viewport)));}
