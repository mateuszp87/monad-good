import {aboutMarkup,handleAboutStep} from './about.js';
const root=document.querySelector('#about-root');root.innerHTML=aboutMarkup();root.addEventListener('click',event=>{const button=event.target.closest('[data-about-step]');if(button)handleAboutStep(button,root);});
