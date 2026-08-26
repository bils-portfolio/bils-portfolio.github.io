/* BILS Consolidated Visual + Interaction Update 27
   Includes all approved Update 25 visuals plus Update 26 interactions.
   Load after app.js and experience-patch.js. */
(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];

  // TYPOGRAPHY AND APPROVED VISUAL BASE
  q('.hero h1')?.classList.add('hero-title-v27');
  [q('.about-intro h2'),q('#work .emotional-heading h2'),q('.tools-panel .lower-emotional-heading h2'),q('.approach-merged .lower-emotional-heading h2')].filter(Boolean).forEach(el=>el.classList.add('section-title-v27'));
  qa('.exp16-left h2,.exp-left h2').forEach(el=>el.classList.add('section-title-v27'));
  [q('.about-intro .about-en'),q('#work .emotional-heading p'),q('.tools-panel .lower-emotional-heading p'),q('.approach-merged .lower-emotional-heading p')].filter(Boolean).forEach(el=>el.classList.add('section-subtitle-v27'));
  qa('.exp16-left>p,.exp-left>p').forEach(el=>el.classList.add('section-subtitle-v27'));

  const aboutTitle=q('.about-intro h2');if(aboutTitle)aboutTitle.innerHTML='Trasformo idee, progetti e spazi<br><span>in esperienze che lasciano il segno.</span>';
  const workTitle=q('#work .emotional-heading h2');if(workTitle)workTitle.innerHTML='<span>Progetti che trasformano idee</span><br>in esperienze da ricordare.';
  const titleMap={'Real Estate Marketing':'Real Estate<br>Marketing','Showroom & Sales Spaces':'Showroom &<br>Sales Spaces','Video & Teaser':'Video &<br>Teaser','Web & Landing Pages':'Web & Landing<br>Pages','Digital Tools':'Digital<br>Tools'};
  qa('.project-title-top').forEach(t=>{const raw=t.textContent.trim();if(titleMap[raw])t.innerHTML=titleMap[raw];});

  // MOBILE SWIPE CONTROLS
  const work=q('#work'),grid=q('.project-grid',work||document);
  if(work&&grid&&!q('.mobile-project-nav',work)){
    const controls=document.createElement('div');controls.className='mobile-project-nav';controls.innerHTML='<button type="button" class="mobile-project-prev" aria-label="Progetto precedente">←</button><span>SWIPE</span><button type="button" class="mobile-project-next" aria-label="Progetto successivo">→</button>';q('.emotional-heading',work)?.after(controls);
    const move=d=>{const card=q('.project',grid);if(card)grid.scrollBy({left:d*(card.getBoundingClientRect().width+14),behavior:'smooth'});};q('.mobile-project-prev',controls).onclick=()=>move(-1);q('.mobile-project-next',controls).onclick=()=>move(1);
  }

  // PLANETS: DIFFERENT ORBITS, APPROVED DISTRIBUTION
  const orbit=q('.orbit-wrap'),points=qa('.orbit-point'),lines=qa('.connector-lines line');
  if(orbit&&points.length===5){const rd=[212,282,242,302,228],rm=[170,224,192,238,182];let phase=-90,prev=performance.now();const loop=now=>{const mobile=matchMedia('(max-width:760px)').matches;if(!mobile)phase+=Math.min(now-prev,40)*.0035;prev=now;const radii=mobile?rm:rd,scale=760/Math.max(1,orbit.clientWidth);points.forEach((point,i)=>{const a=(phase+i*72)*Math.PI/180,x=Math.cos(a)*radii[i],y=Math.sin(a)*radii[i];point.style.setProperty('left',`calc(50% + ${x}px)`,'important');point.style.setProperty('top',`calc(50% + ${y}px)`,'important');if(lines[i]){lines[i].setAttribute('x2',380+x*scale);lines[i].setAttribute('y2',380+y*scale);}});requestAnimationFrame(loop);};requestAnimationFrame(loop);}

  // HERO CONTACTS AND SCROLL
  const contacts=q('.contacts');if(contacts){const links=qa('a',contacts);if(links[2]){links[2].textContent='Wa';links[2].classList.add('social-text-v27');}if(links[3]){links[3].textContent='In';links[3].classList.add('social-text-v27');}}
  const scroll=q('.hero .scroll');if(scroll){scroll.textContent='↓';scroll.classList.add('scroll-arrow-v27');}

  // PROJECT HOVER + MOBILE COVER ONLY (KEEP TITLES)
  qa('.gallery-plus').forEach(p=>p.classList.add('gallery-plus-v27'));
  if(matchMedia('(max-width:760px)').matches){qa('.project').forEach(card=>{card.setAttribute('data-mobile-cover-only','true');card.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();return false;};card.onkeydown=null;card.removeAttribute('tabindex');});}

  // EXPERIENCE SHORT TITLE
  qa('.exp16-left h2,.exp-left h2').forEach(t=>t.innerHTML='<span>Un percorso costruito</span><br>tra creatività e innovazione.');

  // TOOLS SECOND FIXED DOT
  const selector=q('.tools-selector');if(selector&&!q('.tools-fixed-dot-right',selector)){const dot=document.createElement('span');dot.className='tools-fixed-dot tools-fixed-dot-right';selector.appendChild(dot);}

  // FOOTER
  const heading=q('.contact-heading');if(heading){q('h2',heading)?.classList.add('outline-title-v27');const it=q('p',heading),en=q('i',heading);if(it)it.textContent='Se il mio percorso e i miei progetti parlano alla tua realtà, possiamo iniziare una conversazione.';if(en)en.textContent='If my experience and selected work resonate with your vision, let’s start a conversation.';}
  q('.form-note')?.remove();const submit=q('.portfolio-form button span');if(submit)submit.textContent='SUBMIT';const signature=q('.contact-footer small');if(signature)signature.textContent=`© ${new Date().getFullYear()} Portfolio – Design by Billy Joel Dolor – All rights reserved.`;
  q('.floating-cv')?.classList.add('floating-cv-v27');

  const style=document.createElement('style');style.textContent=`
  :root{--section-title-size:clamp(3rem,4.5vw,4.7rem);--section-subtitle-size:1rem;--uniform-dark:linear-gradient(145deg,#07101d 0%,#0a1424 48%,#10203a 100%);--uniform-dark-center:radial-gradient(circle at 50% 60%,#050b14 0%,#07101d 38%,#0c192d 72%,#10203a 100%)}
  body{background:linear-gradient(180deg,#091225 0%,#0f172a 44%,#091225 100%)!important;background-attachment:fixed!important}
  .hero-title-v27{gap:clamp(24px,2.15vw,36px)!important}.section-title-v27{font-family:Inter,sans-serif!important;font-size:var(--section-title-size)!important;line-height:.98!important;letter-spacing:-.058em!important;font-weight:800!important}.section-subtitle-v27{font:italic var(--section-subtitle-size)/1.48 Inter,sans-serif!important;color:var(--muted)!important}.about-intro{max-width:1180px!important}.about-intro .section-title-v27,#work .section-title-v27{white-space:nowrap!important}
  .about-orbit{background:var(--uniform-dark-center)!important}.orbit-wrap{background:transparent!important;box-shadow:none!important}.orbit-glow{display:none!important}.orbit-circle{border-color:rgba(252,255,131,.18)!important}.work{background:var(--uniform-dark)!important}.project-wow{background:linear-gradient(180deg,#07101d,#0b1729)!important}.project-title-top{min-height:2.28em!important;font-size:1.18rem!important;line-height:1.12!important;font-weight:700!important;display:block!important}.approach-contact-inner{background:var(--uniform-dark)!important}.approach-merged,.contact-closing{background:transparent!important}.contact-divider{background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent)!important}
  .contacts .social-text-v27{font-size:1rem!important;font-weight:700!important;color:var(--text)!important}.contacts a{transition:.22s ease!important}.contacts a:hover{border-color:var(--yellow)!important;background:rgba(252,255,131,.08)!important;box-shadow:0 0 22px rgba(252,255,131,.1)!important;color:var(--yellow)!important;transform:translateY(-3px)!important}.contacts a:hover svg{stroke:var(--yellow)!important}.scroll-arrow-v27{font-size:1.75rem!important;letter-spacing:0!important;animation:scrollV27 1.45s ease-in-out infinite!important}@keyframes scrollV27{0%,100%{transform:translate(-50%,0);opacity:.3}50%{transform:translate(-50%,12px);opacity:1}}
  .project-wow:hover{transform:translateY(-9px)!important}.project-wow:hover .gallery-plus-v27{transform:rotate(-180deg) scale(1.08)!important;background:var(--olive)!important}.gallery-plus-v27{transition:transform .38s cubic-bezier(.2,.8,.2,1)!important}
  .tools-selector{justify-self:end!important;width:min(100%,500px)!important;grid-template-columns:18px minmax(280px,1fr)!important;gap:22px!important}.tool-slot{justify-content:flex-start!important;text-align:left!important;font-size:1.22rem!important}.tools-fixed-dot{width:12px!important;height:12px!important}.tools-fixed-dot-right{display:none!important}
  .outline-title-v27{color:transparent!important;-webkit-text-fill-color:transparent!important;-webkit-text-stroke:1.6px rgba(248,250,252,.95)!important;text-shadow:none!important}.outline-title-v27 span{color:transparent!important;-webkit-text-fill-color:transparent!important;-webkit-text-stroke:1.6px var(--yellow)!important;text-shadow:none!important}
  .floating-cv-v27{width:58px!important;min-width:58px!important;height:58px!important;min-height:58px!important;padding:10px!important;border-radius:50%!important;overflow:visible!important;justify-content:flex-start!important;transition:width .32s ease,border-radius .32s ease!important}.floating-cv-v27 .download-icon{flex:0 0 38px!important}.floating-cv-v27 .download-copy{width:0!important;opacity:0!important;overflow:hidden!important;white-space:nowrap!important;transition:width .3s ease,opacity .2s ease!important}.floating-cv-v27:hover{width:148px!important;border-radius:29px 0 0 29px!important}.floating-cv-v27:hover .download-copy{width:72px!important;opacity:1!important}
  .mobile-project-nav{display:none}
  @media(max-width:760px){:root{--section-title-size:clamp(2rem,9vw,2.65rem);--section-subtitle-size:.8rem}.nav{display:none!important}.hero{margin-top:10px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;text-align:center!important;padding-inline:22px!important}.hero-copy,.portrait{width:100%!important}.hero h1{width:100%!important;text-align:center!important;overflow:visible!important}.hero-there{white-space:nowrap!important;padding-right:.08em!important}.hero .tags{display:grid!important;grid-template-columns:1fr 1fr!important;width:min(100%,320px)!important;margin:20px auto 0!important;gap:8px 14px!important}.hero .tags b{font-size:.84rem!important;white-space:normal!important}.hero .scroll{display:none!important}.section-title-v27{line-height:1.02!important;letter-spacing:-.05em!important}.about-intro .section-title-v27,#work .section-title-v27{white-space:normal!important}.project-title-top{font-size:1.14rem!important;min-height:2.25em!important}.mobile-project-nav{display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:-12px 0 22px!important}.mobile-project-nav button{border:0!important;background:none!important;color:var(--yellow)!important;font-size:1.55rem!important}.mobile-project-nav span{color:var(--muted)!important;font-size:.58rem!important;letter-spacing:.18em!important}.project[data-mobile-cover-only="true"] .gallery-plus{display:none!important}.project[data-mobile-cover-only="true"] .copy{display:block!important;padding-bottom:18px!important}.project[data-mobile-cover-only="true"]{cursor:default!important}.exp16-copy,.exp-right{display:none!important}.experience-story{height:380vh!important}.exp16-stage{min-height:600px!important;height:calc(100vh - 30px)!important;top:10px!important}.exp16-scene{height:330px!important;min-height:330px!important}.tools-selector{justify-self:center!important;width:min(100%,330px)!important;grid-template-columns:16px 1fr 16px!important;gap:12px!important}.tools-fixed-dot-right{display:block!important;grid-column:3!important;grid-row:1!important}.tools-window{grid-column:2!important;grid-row:1!important;text-align:center!important}.tool-slot{justify-content:center!important;text-align:center!important;font-size:1.04rem!important}.outline-title-v27{-webkit-text-stroke-width:1.1px!important}.outline-title-v27 span{-webkit-text-stroke-width:1.1px!important}.floating-cv-v27,.floating-cv-v27:hover{width:54px!important;min-width:54px!important;height:54px!important;min-height:54px!important;border-radius:50%!important;padding:8px!important}.floating-cv-v27 .download-copy,.floating-cv-v27:hover .download-copy{display:none!important}.contact-footer small{font-size:.64rem!important;line-height:1.45!important}}
  `;document.head.appendChild(style);
})();
