import {holeState} from './bandon-model.js';
const $=id=>document.getElementById(id);
for(const button of document.querySelectorAll('[data-hero-hole]'))button.addEventListener('click',()=>{
 const hole=Number(button.dataset.heroHole),state=holeState(hole,1,'sawgrass'),number=String(hole).padStart(2,'0'),eta=state.par===3?9:state.par===5?15:12;
 $('hero-hole-map').src=`assets/sawgrass/hole-${number}.svg`;$('hero-hole-map').alt=`Illustrative Sawgrass hole ${hole} map`;
 for(const id of ['hero-hole-number','watch-hole'])$(id).textContent=number;
 for(const id of ['hero-par','watch-par'])$(id).textContent=`PAR ${state.par}`;
 for(const id of ['hero-yards','watch-yards'])$(id).textContent=state.yards;
 $('hero-eta').replaceChildren(document.createTextNode(eta+' '),Object.assign(document.createElement('span'),{textContent:'min'}));$('watch-eta').textContent=eta+' min';
 document.querySelectorAll('[data-hero-hole]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
});
