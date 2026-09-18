(() => {
 const body = document.body;
 const gate = document.querySelector('.invitation-gate');
 const open = document.querySelector('.gate-open');
 const content = [...body.children].filter(el => el !== gate && !['SCRIPT','LINK'].includes(el.tagName));
 body.dataset.invitationOpen = 'false';
 body.classList.add('mist-ready');
 content.forEach(el => el.inert = true);
 open.focus({preventScroll:true});
 function reveal() {
   body.dataset.invitationOpen = 'true';
   body.classList.add('invitation-open');
   content.forEach(el => el.inert = false);
   gate.inert = true;
   document.querySelector('.mist-hero').focus({preventScroll:true});
   window.scrollTo({top:0,behavior:'instant'});
 }
 open.addEventListener('click', reveal);
 document.addEventListener('visibilitychange', () => body.classList.toggle('motion-paused', document.hidden));
 const form = document.querySelector('.reverie-rsvp');
 const guests = form.querySelector('[name="guests"]');
 const guestGroup = form.querySelector('.guest-count-group');
 const minus = form.querySelector('[data-step="-1"]');
 form.querySelectorAll('[name="attendance"]').forEach(choice => choice.addEventListener('change', () => {
   const accepts = form.querySelector('[name="attendance"]:checked')?.value === 'yes';
   guestGroup.hidden = !accepts;
   guests.disabled = !accepts;
   guests.required = accepts;
   document.querySelector('.rsvp-preview-status').textContent = '';
 }));
 function updateStepper(){minus.disabled = !Number.isFinite(guests.valueAsNumber) || guests.valueAsNumber <= 1; form.querySelector('[data-step="1"]').disabled = guests.valueAsNumber >= 10;}
 form.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
   guests.value = String(Math.min(10, Math.max(1, (Number.isFinite(guests.valueAsNumber) ? Math.floor(guests.valueAsNumber) : 1) + Number(button.dataset.step))));
   guests.dispatchEvent(new Event('input', {bubbles:true}));
   updateStepper();
 }));
 guests.addEventListener('input',updateStepper);
 const album = document.querySelector('.gallery');
 const photos = [...album.querySelectorAll('.gallery-item')];
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 // Repeated runs provide identical neighbours across the wrap in either direction.
 const count=photos.length, middle=count*2;
 const slots=[];
 for(let run=0;run<5;run++) photos.forEach((original,i)=>{
   const photo=run===2?original:original.cloneNode(true);
   const slot=document.createElement('div');slot.className='reverie-slot';
   slot.style.setProperty('--tilt',`${[-6,3,-4][i%3]}deg`);
   slot.style.setProperty('--lift',`${[12,-6,16][i%3]}px`);
   photo.querySelector('img').draggable=false;
   if(run!==2){
     photo.tabIndex=-1;photo.setAttribute('aria-hidden','true');
     photo.addEventListener('click',()=>original.click());
   }
   slot.append(photo);slots.push(slot);
 });
 album.replaceChildren(...slots);
 album.classList.add('reverie-album');
 album.setAttribute('aria-label','Photo album. Swipe or drag to browse; select a photo to enlarge.');
 const controls=document.createElement('div');controls.className='reverie-album-controls';
 controls.innerHTML='<button type="button" aria-label="Previous photo">←</button><p>Little moments, held close <span>Swipe or drag · Tap to enlarge</span></p><button type="button" aria-label="Next photo">→</button>';
 album.after(controls);
 const [previous,next]=controls.querySelectorAll('button');
 let active=middle,frame,width=0,settleTimer;
 let drag=null,dragged=false,touching=false;
 function sync(){
   const center=album.scrollLeft+album.clientWidth/2;
   let closest=Infinity;
   slots.forEach((slot,i)=>{
     const distance=Math.abs(slot.offsetLeft+slot.offsetWidth/2-center);
     const focus=Math.max(0,1-distance/(slot.offsetWidth*1.25));
     slot.style.setProperty('--scale',reduced.matches?1:(.72+.42*focus).toFixed(3));
     slot.style.zIndex=String(Math.round(focus*10));
     if(distance<closest){closest=distance;active=i;}
   });
   slots.forEach((slot,i)=>slot.classList.toggle('is-selected',i===active));

 }
 function center(i,smooth=true){
   i=Math.max(0,Math.min(slots.length-1,i));
   const slot=slots[i];
   album.scrollTo({left:slot.offsetLeft+slot.offsetWidth/2-album.clientWidth/2,behavior:smooth&&!reduced.matches?'smooth':'instant'});
 }
 previous.addEventListener('click',()=>center(active-1));
 next.addEventListener('click',()=>center(active+1));
 function normalize(){
   if(drag||touching)return;
   sync();
   const target=middle+(active%count);
   if(target===active)return;
   // Equivalent cards have identical geometry: reposition without visible travel.
   const delta=slots[target].offsetLeft-slots[active].offsetLeft;
   album.classList.add('is-rebasing');
   album.scrollTo({left:album.scrollLeft+delta,behavior:'instant'});
   active=target;sync();
   requestAnimationFrame(()=>album.classList.remove('is-rebasing'));
 }
 album.addEventListener('scroll',()=>{
   cancelAnimationFrame(frame);frame=requestAnimationFrame(sync);
   clearTimeout(settleTimer);settleTimer=setTimeout(normalize,180);
 },{passive:true});
 album.addEventListener('scrollend',normalize);
 album.addEventListener('touchstart',()=>{touching=true;},{passive:true});
 const releaseTouch=()=>{touching=false;clearTimeout(settleTimer);settleTimer=setTimeout(normalize,180);};
 album.addEventListener('touchend',releaseTouch,{passive:true});
 album.addEventListener('touchcancel',releaseTouch,{passive:true});
 album.addEventListener('keydown',event=>{
   if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();center(active+(event.key==='ArrowRight'?1:-1));}
 });
 photos.forEach((photo,i)=>photo.addEventListener('focus',()=>{
   const nearest=slots.reduce((best,slot,j)=>j%count===i&&Math.abs(j-active)<Math.abs(best-active)?j:best,middle+i);
   center(nearest);
 }));
 album.addEventListener('pointerdown',event=>{
   if(event.pointerType!=='mouse'||event.button!==0)return;
   dragged=false;drag={x:event.clientX,left:album.scrollLeft};
 });
 window.addEventListener('pointermove',event=>{
   if(!drag)return;
   if(Math.abs(event.clientX-drag.x)>6){dragged=true;album.classList.add('is-dragging');event.preventDefault();album.scrollLeft=drag.left-(event.clientX-drag.x);}
 });
 function endDrag(){if(!drag)return;drag=null;album.classList.remove('is-dragging');if(dragged){sync();center(active);}}
 window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
 album.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopImmediatePropagation();dragged=false;}},true);
 new ResizeObserver(()=>{if(width===album.clientWidth)return;width=album.clientWidth;center(active,false);sync();}).observe(album);
 reduced.addEventListener('change',sync);
 center(active,false);sync();
 if ('IntersectionObserver' in window) {
   const observer = new IntersectionObserver(entries => entries.forEach(entry => {
     if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
   }),{threshold:.12});
   document.querySelectorAll('.story-layout,.details-layout,.timeline li,.rsvp-heading,.reverie-quote p').forEach(el=>{
     el.classList.add('reverie-reveal');observer.observe(el);
   });
 }
})();
