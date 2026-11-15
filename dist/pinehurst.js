// Official Pinehurst No. 2 scorecard, U.S. Open tees. See SOURCES.md.
// Video cues follow the narrated hole introductions in Golf Digest's 15:39 flyover.
export const videoId='o-e6617kfbU';
export const courseSource='https://www.pinehurst.com/golf/courses/no-2/';
export const videoSource=`https://www.youtube.com/watch?v=${videoId}`;
const pars=[4,4,4,4,5,3,4,4,3,5,4,4,4,4,3,4,3,4];
const yards=[402,507,387,529,576,242,424,502,191,617,483,484,385,473,202,528,205,451];
const starts=[91.62,136.005,176.59,211.67,251.68,297.2,329.18,374.07,474.42,503.24,548.57,589.06,631.97,675.8,724.28,761.81,798.74,830.94];
const titles=['The opening handshake','The long par four','A change of direction','Down the hill','The uphill par five','The first short hole','A tempting line','The outward journey','Across the valley','The long way home','The par-four stretch','Choose your approach','The shorter test','Along the ridge','The crowned green','The closing stretch','One last short hole','Home to the clubhouse'];
export const pinehurstHoles=pars.map((par,i)=>({hole:i+1,par,yards:yards[i],start:starts[i],end:i===17?871.3:starts[i+1],title:titles[i],image:`assets/pinehurst/hole-${String(i+1).padStart(2,'0')}.jpg`}));
export function videoTimeFor(hole,progress){const h=pinehurstHoles[hole-1];return h.start+Math.max(0,Math.min(1,progress))*(h.end-h.start-1);}
export function positionOnHole(group,target){return Math.max(.04,Math.min(.94,group.inHole/target));}
