/* BILS Experience Patch v16
   v15 base + only two requested refinements:
   1) exactly one small node above and one below, centered on the ring;
   2) fixed date boxes: start date -> end date, with stable rolling digits.
*/
(() => {
  const now = new Date();
  const currentMonthYear = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const experiences = [
    {start:'09/2017',end:currentMonthYear,company:'Abitare Co.',role:'Senior Graphic & Digital Designer',items:[['Identita visiva per iniziative immobiliari, brochure, capitolati e presentazioni commerciali.','Visual identity for real estate developments, brochures, specifications and sales presentations.'],['Video emozionali, teaser, siti web e landing page per i lanci commerciali.','Emotional videos, teasers, websites and landing pages for commercial launches.'],['Post-produzione di fotografie, immagini e render 3D per digitale e stampa.','Post-production of photography, images and 3D renders for digital and print.'],['Tool digitali interni per automatizzare attivita e migliorare i flussi del marketing.','Internal digital tools to automate tasks and improve marketing workflows.'],['Comunicazione visiva di showroom e uffici vendita: dresswall, pannelli e vetrofanie.','Visual communication for showrooms and sales offices: dress walls, panels and window graphics.']]},
    {start:'06/2017',end:'08/2017',company:'Gruppo Mondadori',role:'Graphic Designer Editoriale',items:[['Post-produzione fotografica e correzione colore.','Photography post-production and color correction.'],['Controllo tecnico-editoriale dei contenuti.','Technical and editorial content review.'],['Preparazione definitiva dei materiali prima dell invio allo stampatore.','Final preparation of materials before delivery to the printer.']]},
    {start:'04/2014',end:'06/2017',company:'Casa.it',role:'Creative Designer',items:[['Campagne display e banner statici, dinamici e HTML5.','Display campaigns and static, dynamic and HTML5 banners.'],['DEM e contenuti promozionali personalizzati.','Email marketing and customized promotional content.'],['Produzione e pubblicazione con Adobe Creative Cloud, Google Web Designer e DoubleClick for Publishers.','Production and publishing with Adobe Creative Cloud, Google Web Designer and DoubleClick for Publishers.']]},
    {start:'09/2012',end:'03/2014',company:'Link S.p.A.',role:'Consulente Grafico',items:[['Impaginazione e aggiornamento del catalogo aziendale.','Layout and updating of the company catalog.'],['Post-produzione delle immagini di prodotto.','Post-production of product imagery.'],['Creazione di materiali grafici promozionali.','Creation of promotional graphic materials.']]},
    {start:'06/2012',end:'09/2012',company:'RCS MediaGroup',role:'Operatore Grafico',items:[['Impaginazione editoriale.','Editorial layout and page design.'],['Ritocco fotografico.','Professional photo retouching.'],['Adattamento di copertine per le testate del gruppo.','Cover adaptations for the group publications.']]}
  ];

  const story = document.querySelector('.experience-story');
  if (!story) return;

  story.innerHTML = `<div class="experience-sticky exp16-stage">
    <div class="exp16-left">
      <h2><span>Un percorso costruito</span><br>tra creativita, editoria e digitale.</h2>
      <p>A journey shaped by creativity, publishing and digital innovation.</p>
      <div class="exp16-dates" aria-live="polite">
        <div class="exp16-date-box exp16-start"></div>
        <div class="exp16-arrow" aria-hidden="true">→</div>
        <div class="exp16-date-box exp16-end"></div>
      </div>
      <div class="exp16-progress"><i></i></div>
    </div>
    <div class="exp16-scene">
      <div class="exp16-ring"></div>
      <div class="exp16-nodes">${experiences.map((item,index)=>`<div class="exp16-node" data-index="${index}"><div class="exp16-label"><strong>${item.company}</strong><span>${item.role}</span></div></div>`).join('')}</div>
      <div class="exp16-copy"><ul></ul></div>
    </div>
  </div>`;

  const nodes=[...story.querySelectorAll('.exp16-node')];
  const startBox=story.querySelector('.exp16-start');
  const endBox=story.querySelector('.exp16-end');
  const list=story.querySelector('.exp16-copy ul');
  const progressBar=story.querySelector('.exp16-progress i');
  let active=-1;
  let previousStart='       ', previousEnd='       ';
  const timers=[];

  function clearTimers(){while(timers.length) clearTimeout(timers.pop());}
  function fixedDigits(container,source,target){
    container.innerHTML=target.split('').map((char,index)=>`<span data-i="${index}">${source[index]||' '}</span>`).join('');
    target.split('').forEach((targetChar,index)=>{
      const span=container.querySelector(`[data-i="${index}"]`);
      if(!/\d/.test(targetChar)){timers.push(setTimeout(()=>span.textContent=targetChar,index*26));return;}
      const from=/\d/.test(source[index])?Number(source[index]):0;
      const to=Number(targetChar);
      let steps=(from-to+10)%10;if(steps===0)steps=10;
      for(let step=1;step<=steps;step++)timers.push(setTimeout(()=>span.textContent=String((from-step+10)%10),index*26+step*38));
    });
  }
  function animateDates(item){
    clearTimers();
    fixedDigits(startBox,previousStart.padEnd(7,' '),item.start);
    fixedDigits(endBox,previousEnd.padEnd(7,' '),item.end);
    timers.push(setTimeout(()=>{startBox.textContent=item.start;endBox.textContent=item.end;previousStart=item.start;previousEnd=item.end;},850));
  }
  function updateContent(index){
    if(index===active)return; active=index; const item=experiences[index];
    animateDates(item);
    list.classList.remove('swap16');
    list.innerHTML=item.items.map(([it,en])=>`<li><span>${it}</span><em>${en}</em></li>`).join('');
    requestAnimationFrame(()=>list.classList.add('swap16'));
  }

  function render(){
    const rect=story.getBoundingClientRect();
    const travel=Math.max(1,story.offsetHeight-innerHeight);
    const progress=Math.max(0,Math.min(1,-rect.top/travel));
    const stage=progress*(experiences.length-1);
    const nearest=Math.min(experiences.length-1,Math.floor(stage+.5));
    updateContent(nearest); progressBar.style.width=`${progress*100}%`;

    const mobile=matchMedia('(max-width:760px)').matches;
    const radius=mobile?255:510; // exact same radius as the visible circumference
    nodes.forEach((node,index)=>{
      const relative=index-stage;
      const distance=Math.abs(relative);
      // Desktop remains untouched: previous above, active center-left, next below.
      // Mobile uses a horizontal journey: previous left, active center, next right.
      const angle = mobile
        ? (-Math.PI / 2 + relative * 55 * Math.PI / 180)
        : (Math.PI - relative * 55 * Math.PI / 180);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const visible=distance<=1.02; // only one above + active + one below
      const centerWeight=Math.max(0,1-distance);
      const size=(mobile?54:64)+(mobile?82:186)*centerWeight;
      node.style.setProperty('--x',`${x}px`);
      node.style.setProperty('--y',`${y}px`);
      node.style.setProperty('--size',`${size}px`);
      node.style.opacity=visible?'1':'0';
      node.style.visibility=visible?'visible':'hidden';
      node.style.zIndex=String(40-Math.round(distance*5));
      node.classList.toggle('active16',distance<.34);
    });
  }

  const css=document.createElement('style');
  css.textContent=`
  .experience-story{height:520vh!important;margin-top:18px!important}.exp16-stage{position:sticky!important;top:90px!important;height:calc(100vh - 108px)!important;min-height:680px!important;display:grid!important;grid-template-columns:35% 65%!important;align-items:center!important;padding:52px!important;overflow:hidden!important;background:#080f1c!important}.exp16-left{position:relative;z-index:50}.exp16-left h2{margin:0;font-size:clamp(2rem,3.4vw,3.55rem);line-height:1.03;letter-spacing:-.05em}.exp16-left h2 span{color:var(--yellow)}.exp16-left>p{margin:14px 0 30px;color:var(--muted);font-style:italic}
  .exp16-dates{display:grid;grid-template-columns:minmax(135px,1fr) 42px minmax(135px,1fr);align-items:center;gap:10px;width:min(100%,430px)}.exp16-date-box{height:62px;display:flex;align-items:center;justify-content:center;padding:0 14px;border:1px solid rgba(252,255,131,.28);border-radius:12px;background:rgba(252,255,131,.035);color:var(--yellow);font-size:clamp(1.2rem,1.9vw,1.8rem);font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden}.exp16-date-box span{display:inline-block;width:.62em;text-align:center}.exp16-arrow{display:grid;place-items:center;color:var(--yellow);font-size:1.7rem}.exp16-progress{width:min(100%,430px);height:2px;margin-top:14px;background:rgba(255,255,255,.1)}.exp16-progress i{display:block;height:100%;background:var(--yellow)}
  .exp16-scene{position:relative;height:100%;min-height:620px;overflow:visible}.exp16-ring{position:absolute;left:96%;top:50%;width:1020px;height:1020px;transform:translate(-50%,-50%);border:2px solid rgba(252,255,131,.34);border-radius:50%}.exp16-nodes{position:absolute;left:96%;top:50%}.exp16-node{--x:-510px;--y:0;--size:64px;position:absolute;width:var(--size);height:var(--size);transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y)));display:grid;place-items:center;border-radius:50%;background:var(--yellow);color:#08101d;text-align:center;box-shadow:0 12px 36px rgba(0,0,0,.24);will-change:transform,width,height,opacity;transition:opacity .08s linear,visibility .08s linear}.exp16-label{padding:14px;opacity:0;visibility:hidden}.exp16-node.active16 .exp16-label{opacity:1;visibility:visible}.exp16-label strong,.exp16-label span{display:block}.exp16-label strong{font-size:1.08rem;line-height:1.1}.exp16-label span{margin-top:7px;font-size:.67rem;line-height:1.2}.exp16-node.active16{box-shadow:0 24px 74px rgba(252,255,131,.23)}
  .exp16-copy{position:absolute;z-index:20;left:58%;top:50%;width:39%;transform:translateY(-50%)}.exp16-copy ul{list-style:none;margin:0;padding:0}.exp16-copy li{position:relative;margin-bottom:18px;padding-left:32px}.exp16-copy li:before{content:'✓';position:absolute;left:0;color:var(--yellow);font-weight:800}.exp16-copy li span{display:block;color:var(--text);font-size:1rem;line-height:1.42}.exp16-copy li em{display:block;margin-top:5px;color:var(--muted);font-size:.74rem;line-height:1.4;font-style:italic}.exp16-copy ul.swap16{animation:swap16 .34s ease}@keyframes swap16{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}
  @media(max-width:1100px){.exp16-stage{grid-template-columns:38% 62%;padding:34px}.exp16-ring,.exp16-nodes{left:102%}.exp16-ring{width:820px;height:820px}.exp16-copy{left:59%;width:38%}.exp16-copy li span{font-size:.82rem}.exp16-copy li em{font-size:.67rem}.exp16-dates{grid-template-columns:minmax(105px,1fr) 32px minmax(105px,1fr)}.exp16-date-box{padding:0 8px}}
  @media(max-width:760px){
    .experience-story{height:480vh!important}
    .exp16-stage{top:72px!important;height:calc(100vh - 84px)!important;min-height:720px!important;grid-template-columns:1fr!important;grid-template-rows:auto 1fr!important;align-content:start!important;padding:22px!important}
    .exp16-left{z-index:40!important}
    .exp16-left h2{font-size:1.85rem!important;line-height:1.02!important}
    .exp16-left>p{margin:8px 0 10px!important;font-size:.78rem!important}
    .exp16-dates{width:100%!important;grid-template-columns:1fr 28px 1fr!important}
    .exp16-date-box{height:46px!important;font-size:1rem!important;padding:0 6px!important}
    .exp16-arrow{font-size:1.25rem!important}
    .exp16-progress{width:100%!important;margin-top:10px!important}

    /* Mobile-only horizontal orbit. The visible upper arc runs left to right. */
    .exp16-scene{position:relative!important;height:470px!important;min-height:470px!important;overflow:hidden!important;margin-top:4px!important}
    .exp16-ring,.exp16-nodes{left:50%!important;top:73%!important}
    .exp16-ring{width:510px!important;height:510px!important}
    .exp16-node{width:var(--size)!important;height:var(--size)!important}
    .exp16-label strong{font-size:.8rem!important}
    .exp16-label span{font-size:.52rem!important}

    /* Description sits below the moving nodes, inside the circumference. */
    .exp16-copy{left:7%!important;top:56%!important;width:86%!important;transform:none!important;padding:14px 16px!important;border:1px solid rgba(252,255,131,.14)!important;border-radius:14px!important;background:rgba(8,15,28,.74)!important;backdrop-filter:blur(8px)!important}
    .exp16-copy ul{display:grid!important;grid-template-columns:1fr!important;gap:7px!important}
    .exp16-copy li{margin:0!important;padding-left:22px!important}
    .exp16-copy li span{font-size:.72rem!important;line-height:1.3!important}
    .exp16-copy li em{font-size:.59rem!important;line-height:1.3!important;margin-top:2px!important}
  }
  `;
  document.head.appendChild(css);
  addEventListener('scroll',render,{passive:true});addEventListener('resize',render);render();
})();
