import {bandon} from './bandon-data.js';
export const teeNames=['Navy','Red','Gold','Green','Black','Chrome'];
export const teeColors=['#39496b','#d9523c','#cca353','#3e6237','#181818','#808080'];
export function holeState(hole,tee=4){if(!Number.isInteger(hole)||hole<1||hole>18)throw new RangeError('Invalid hole');if(!Number.isInteger(tee)||tee<1||tee>6)throw new RangeError('Invalid tee');return {hole,tee,yards:bandon.yardages[tee][hole],par:bandon.holePar[hole],handicap:bandon.holeHandicap[hole],teeName:teeNames[tee-1],total:bandon.courseYardage[tee-1]};}
export function mapPoints(hole,tee){const positions=bandon.teePlacement[hole],x=positions[(tee*2)-1]??5,y=positions[tee*2]??1;return {tee:{x:x*45,y:800*(1-y*.05625)},pin:{x:bandon.pinPos[hole]*45,y:90}};}
export function mapDistance(hole,tee,point){const state=holeState(hole,tee),p=mapPoints(hole,tee),span=Math.hypot(p.tee.x-p.pin.x,p.tee.y-p.pin.y);const scale=state.yards/span;return {fromTee:Math.round(Math.hypot(point.x-p.tee.x,point.y-p.tee.y)*scale),toPin:Math.round(Math.hypot(point.x-p.pin.x,point.y-p.pin.y)*scale)};}
export function requestedHole(search){const h=Number(new URLSearchParams(search).get('hole'));return Number.isInteger(h)&&h>=1&&h<=18?h:3;}
export function flightProgress(scroll,height,viewport){return Math.max(0,Math.min(1,scroll/Math.max(1,height-viewport)));}
