const stage=document.querySelector('.stage');
const image=document.querySelector('.scene-image');
const grid=document.querySelector('.scene-grid');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let current=Number(document.body.dataset.selected)||0;
let timer, playing=false, startTime=0, remaining=12000, loadId=0;
SCENES.forEach((scene,i)=>{
 const card=document.createElement('article'); card.dataset.group=scene.group;
 card.innerHTML=`<button class="scene-choice" type="button" data-index="${i}" aria-pressed="false"><div class="thumb"><img src="assets/thumbs/${scene.id}.webp" alt="${scene.description}" loading="lazy" width="768" height="512" style="object-position:${scene.position}"><span>${String(i+1).padStart(2,'0')}</span><b aria-hidden="true">▶</b></div><div class="card-copy"><h3>${scene.title}</h3><p>${scene.motion}</p></div></button><a class="standalone" href="${String(i+1).padStart(2,'0')}-${scene.id}.html">Open this scene ↗</a>`;
 card.querySelector('button').addEventListener('click',()=>{select(i);document.querySelector('.player').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});});
 grid.append(card);
});
function finish(){playing=false;remaining=0;document.querySelector('#pause').textContent='Finished';document.querySelector('#pause').disabled=true;document.querySelector('.motion-message').textContent='Opening complete. Replay to watch again.';}
function play(){
 clearTimeout(timer);stage.classList.remove('playing','paused');void stage.offsetWidth;
 if(reduced.matches){document.querySelector('.motion-message').textContent='Still preview shown because reduced motion is enabled on your device.';document.querySelector('#pause').disabled=true;document.querySelector('#pause').textContent='Still preview';return;}
 stage.classList.add('playing');playing=true;remaining=12000;startTime=performance.now();
 document.querySelector('#pause').disabled=false;document.querySelector('#pause').textContent='Pause';document.querySelector('.motion-message').textContent='';timer=setTimeout(finish,remaining);
}
async function select(i){
 const version=++loadId;current=i;clearTimeout(timer);stage.classList.remove('playing','paused');
 const s=SCENES[i];stage.dataset.scene=s.id;stage.dataset.group=s.group;stage.dataset.camera=s.camera||'';image.style.objectPosition=s.position;image.alt=s.description;
 document.querySelector('#scene-title').textContent=s.title;document.querySelector('#description').textContent=s.description;document.querySelector('#motion').textContent=s.motion+' · 12 seconds';
 document.querySelector('.scene-counter').textContent=String(i+1).padStart(2,'0')+' / '+SCENES.length;
 document.querySelectorAll('.scene-choice').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));
 document.querySelector('.motion-message').textContent='Loading scene…';image.src=`assets/${s.id}.webp`;
 try{await image.decode();if(version===loadId)play();}catch{if(version===loadId)document.querySelector('.motion-message').textContent='This scene image could not be loaded. Please reload the page.';}
}
document.querySelector('#replay').addEventListener('click',play);
document.querySelector('#pause').addEventListener('click',()=>{
 if(playing){remaining-=performance.now()-startTime;clearTimeout(timer);stage.classList.add('paused');playing=false;document.querySelector('#pause').textContent='Resume';}
 else{stage.classList.remove('paused');playing=true;startTime=performance.now();document.querySelector('#pause').textContent='Pause';timer=setTimeout(finish,remaining);}
});
document.querySelector('#text-toggle').addEventListener('click',e=>{const show=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(show));e.currentTarget.textContent=show?'Names on':'Names off';stage.classList.toggle('no-names',!show);});
document.querySelector('#size-toggle').addEventListener('click',e=>{const phone=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',String(phone));e.currentTarget.textContent=phone?'Wide view':'Phone view';stage.classList.toggle('phone',phone);});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)document.querySelector('#pause').click();});
reduced.addEventListener('change',()=>select(current));
select(current);

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.scene-grid article').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.group!==button.dataset.filter;});}));
