export const holes = [14,12,16,14,15,12,16,13,14,14,12,16,14,15,12,16,13,17];
export const totalTarget = holes.reduce((a,b)=>a+b,0);
export function forecast(group, all, targets=holes) {
  const total=targets.reduce((a,b)=>a+b,0);
  if(group.hole>targets.length) return {delay:group.elapsed-total, finish:group.tee+group.elapsed, remaining:0, arrivals:[], complete:true};
  const before=targets.slice(0,group.hole-1).reduce((a,b)=>a+b,0);
  const delay=group.elapsed-before-group.inHole;
  const factor=Math.max(.85, Math.min(1.4, group.hole>1 ? (group.elapsed-group.inHole)/Math.max(before,1) : 1));
  let cursor=group.tee+group.elapsed;
  const arrivals=[];
  for(let h=group.hole;h<=targets.length;h++) {
    arrivals.push({hole:h,at:cursor,current:h===group.hole});
    cursor+=Math.max(0,targets[h-1]*factor-(h===group.hole?group.inHole:0));
    const ahead=all.filter(g=>g.tee<group.tee&&g.hole<=targets.length);
    // A group cannot finish a hole before a preceding group has cleared it.
    for(const g of ahead) {
      const projected=g.tee+g.elapsed+Math.max(0,targets.slice(g.hole-1,h).reduce((a,b)=>a+b,0)-g.inHole);
      if(g.hole<=h) cursor=Math.max(cursor,projected+8);
    }
  }
  return {delay:Math.round(delay+Math.max(0,group.inHole-targets[group.hole-1])),finish:Math.round(cursor),remaining:Math.max(0,Math.round(cursor-group.tee-group.elapsed)),arrivals,complete:false};
}
export const clock = min => `${String(Math.floor(min/60)%24).padStart(2,'0')}:${String(Math.floor(min%60)).padStart(2,'0')}`;
export function advance(groups, minutes=5) { return groups.map(g=>{
 if(g.hole>18)return {...g};
 let hole=g.hole, inHole=g.inHole+minutes;
 while(hole<=18&&inHole>=holes[hole-1]+(g.slow||0)){inHole-=holes[hole-1]+(g.slow||0);hole++;}
 return {...g,hole,inHole,elapsed:g.elapsed+minutes};
});}
export const seed = [
 {id:1,name:'The Early Birds',players:4,tee:480,hole:15,elapsed:210,inHole:7,slow:0},
 {id:2,name:'Sunday Social',players:4,tee:490,hole:13,elapsed:200,inHole:12,slow:2},
 {id:3,name:'The Green Jackets',players:3,tee:500,hole:13,elapsed:190,inHole:6,slow:1},
 {id:4,name:'Fairway Friends',players:4,tee:510,hole:12,elapsed:180,inHole:11,slow:0},
 {id:5,name:'Birdie Club',players:2,tee:520,hole:12,elapsed:170,inHole:5,slow:0},
 {id:6,name:'Weekend Warriors',players:4,tee:530,hole:10,elapsed:160,inHole:15,slow:3},
 {id:7,name:'The Back Nine',players:4,tee:540,hole:10,elapsed:150,inHole:8,slow:0},
 {id:8,name:'Pin Seekers',players:3,tee:550,hole:9,elapsed:140,inHole:9,slow:0},
 {id:9,name:'Good Walk',players:2,tee:630,hole:5,elapsed:60,inHole:4,slow:0},
 {id:10,name:'Clubhouse Crew',players:4,tee:658,hole:3,elapsed:32,inHole:6,slow:0},
 {id:11,name:'Par Partners',players:4,tee:686,hole:1,elapsed:4,inHole:4,slow:0},
 {id:12,name:'Fresh Cut',players:2,tee:590,hole:7,elapsed:100,inHole:7,slow:0}
];
