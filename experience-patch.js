/* BILS Experience Orbit Update 11
   Replaces only Experience. Loaded after app.js. */
(() => {
  const now = new Date();
  const currentMonthYear = `${String(now.getMonth() + 1).padStart(2,'0')}/${now.getFullYear()}`;
  const experiences = [
    { date:`09/2017 - ${currentMonthYear}`, company:'Abitare Co.', role:'Senior Graphic & Digital Designer', items:['Identita visiva per iniziative immobiliari, brochure, capitolati e presentazioni commerciali.','Video emozionali, teaser, siti web e landing page per i lanci commerciali.','Post-produzione di fotografie, immagini e render 3D per digitale e stampa.','Tool digitali interni per automatizzare attivita e migliorare i flussi del marketing.','Comunicazione visiva di showroom e uffici vendita: dresswall, pannelli e vetrofanie.'] },
    { date:'06/2017 - 08/2017', company:'Gruppo Mondadori', role:'Graphic Designer Editoriale', items:['Post-produzione fotografica e correzione colore.','Controllo tecnico-editoriale dei contenuti.','Preparazione definitiva dei materiali prima dell invio allo stampatore.'] },
    { date:'04/2014 - 06/2017', company:'Casa.it', role:'Creative Designer', items:['Campagne display e banner statici, dinamici e HTML5.','DEM e contenuti promozionali personalizzati.','Produzione e pubblicazione con Adobe Creative Cloud, Google Web Designer e DoubleClick for Publishers.'] },
    { date:'09/2012 - 03/2014', company:'Link S.p.A.', role:'Consulente Grafico', items:['Impaginazione e aggiornamento del catalogo aziendale.','Post-produzione delle immagini di prodotto.','Creazione di materiali grafici promozionali.'] },
    { date:'06/2012 - 09/2012', company:'RCS MediaGroup', role:'Operatore Grafico', items:['Impaginazione editoriale.','Ritocco fotografico.','Adattamento di copertine per le testate del gruppo.'] }
  ];

  const story = document.querySelector('.experience-story');
  if (!story) return;
  story.innerHTML = `<div class="experience-sticky experience-orbit-stage">
    <div class="exp-left"><h2><span>Un percorso costruito</span><br>tra creativita, editoria e digitale.</h2><p>A journey shaped by creativity, publishing and digital innovation.</p><div class="exp-date" aria-live="polite"></div><div class="exp-progress"><i></i></div></div>
    <div class="exp-scene"><div class="exp-ring"></div><div class="exp-nodes">${experiences.map((item,index)=>`<div class="career-node" data-index="${index}"><div class="career-label"><strong>${item.company}</strong><span>${item.role}</span></div></div>`).join('')}</div><div class="exp-right"><ul></ul></div></div>
  </div>`;

  const nodes=[...story.querySelectorAll('.career-node')];
  const dateEl=story.querySelector('.exp-date');
  const listEl=story.querySelector('.exp-right ul');
  const progressEl=story.querySelector('.exp-progress i');
  let activeIndex=-1;
  let displayedDate='';
  const rollingTimers=[];

  function clearRolling(){ while(rollingTimers.length) clearTimeout(rollingTimers.pop()); }
  function rollingDigit(fromChar,toChar,delay,onUpdate){
    if(fromChar===toChar || !/\d/.test(toChar)){ rollingTimers.push(setTimeout(()=>onUpdate(toChar),delay)); return; }
    const start=/\d/.test(fromChar)?Number(fromChar):0;
    const end=Number(toChar);
    let steps=(start-end+10)%10;
    if(steps===0) steps=10;
    for(let step=1;step<=steps;step++){
      rollingTimers.push(setTimeout(()=>onUpdate(String((start-step+10)%10)),delay+step*42));
    }
  }
  function animateDate(target){
    clearRolling();
    const source=displayedDate.padEnd(target.length,' ');
    const chars=target.split('');
    dateEl.innerHTML=chars.map((char,index)=>`<span class="date-char" data-pos="${index}">${source[index]||' '}</span>`).join('');
    chars.forEach((targetChar,index)=>{
      const span=dateEl.querySelector(`[data-pos="${index}"]`);
      rollingDigit(source[index]||' ',targetChar,index*28,value=>{span.textContent=value;});
    });
    const finishDelay=target.length*28+520;
    rollingTimers.push(setTimeout(()=>{dateEl.textContent=target;displayedDate=target;},finishDelay));
  }
  function updateContent(index){
    if(index===activeIndex)return;
    activeIndex=index;
    const item=experiences[index];
    animateDate(item.date);
    listEl.classList.remove('swap');
    listEl.innerHTML=item.items.map(text=>`<li>${text}</li>`).join('');
    requestAnimationFrame(()=>listEl.classList.add('swap'));
  }

  function renderExperience(){
    const rect=story.getBoundingClientRect();
    const travel=Math.max(1,story.offsetHeight-innerHeight);
    const progress=Math.max(0,Math.min(1,-rect.top/travel));
    const stageFloat=progress*(experiences.length-1);
    const closest=Math.min(experiences.length-1,Math.floor(stageFloat+.5));
    updateContent(closest);
    progressEl.style.width=`${progress*100}%`;
    const mobile=matchMedia('(max-width:760px)').matches;
    const radiusX=mobile?255:510;
    const radiusY=mobile?225:420;

    nodes.forEach((node,nodeIndex)=>{
      const relative=nodeIndex-stageFloat;
      const angle=relative*43*Math.PI/180;
      const x=Math.cos(angle)*radiusX;
      const y=Math.sin(angle)*radiusY;
      const distance=Math.abs(relative);
      const size=mobile ? Math.max(68,126-Math.min(1.15,distance)*50) : Math.max(78,250-Math.min(1.15,distance)*145);
      node.style.setProperty('--node-x',`${x}px`);
      node.style.setProperty('--node-y',`${y}px`);
      node.style.setProperty('--node-size',`${size}px`);
      node.style.opacity='1';
      node.style.zIndex=String(30-Math.round(distance*4));
      const isCenter=distance<.32;
      node.classList.toggle('is-active',nodeIndex===closest);
      node.classList.toggle('show-label',isCenter);
    });
  }

  const styles=document.createElement('style');
  styles.textContent=`
    .experience-story{height:520vh!important;margin-top:18px!important}.experience-orbit-stage{position:sticky!important;top:90px!important;height:calc(100vh - 108px)!important;min-height:680px!important;display:grid!important;grid-template-columns:34% 66%!important;align-items:center!important;gap:0!important;padding:52px!important;overflow:hidden!important;background:#080f1c!important}.exp-left{position:relative!important;z-index:50!important}.exp-left h2{margin:0!important;font-size:clamp(2rem,3.4vw,3.55rem)!important;line-height:1.03!important;letter-spacing:-.05em!important}.exp-left h2 span,.exp-date{color:var(--yellow)!important}.exp-left>p{margin:14px 0 30px!important;color:var(--muted)!important;font-style:italic!important}.exp-date{display:flex!important;flex-wrap:nowrap!important;min-height:1.25em!important;font-size:clamp(1.45rem,2.55vw,2.5rem)!important;font-weight:700!important;font-variant-numeric:tabular-nums!important;white-space:pre!important}.date-char{display:inline-block!important;min-width:.58em!important;text-align:center!important}.exp-progress{height:2px!important;margin-top:18px!important;background:rgba(255,255,255,.1)!important}.exp-progress i{display:block!important;height:100%!important;background:var(--yellow)!important}.exp-scene{position:relative!important;height:100%!important;min-height:620px!important;overflow:visible!important}.exp-ring{position:absolute!important;left:8%!important;top:50%!important;width:1020px!important;height:1020px!important;transform:translate(-50%,-50%)!important;border:2px solid rgba(252,255,131,.34)!important;border-radius:50%!important}.exp-nodes{position:absolute!important;left:8%!important;top:50%!important}.career-node{--node-x:510px;--node-y:0px;--node-size:82px;position:absolute!important;left:0!important;top:0!important;width:var(--node-size)!important;height:var(--node-size)!important;transform:translate(calc(-50% + var(--node-x)),calc(-50% + var(--node-y)))!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:var(--yellow)!important;color:#08101d!important;text-align:center!important;opacity:1!important;will-change:transform,width,height!important;box-shadow:0 12px 36px rgba(0,0,0,.24)!important}.career-label{padding:16px!important;opacity:0!important;visibility:hidden!important;transition:opacity .16s ease!important}.career-node.show-label .career-label{opacity:1!important;visibility:visible!important}.career-node strong{display:block!important;font-size:clamp(.8rem,1.05vw,1.14rem)!important;line-height:1.08!important}.career-node span{display:block!important;margin-top:7px!important;font-size:clamp(.52rem,.67vw,.7rem)!important;line-height:1.22!important}.career-node.is-active{box-shadow:0 24px 74px rgba(252,255,131,.23)!important}.exp-right{position:absolute!important;z-index:20!important;left:48%!important;top:50%!important;width:46%!important;transform:translateY(-50%)!important}.exp-right ul{list-style:none!important;margin:0!important;padding:0!important}.exp-right li{position:relative!important;margin:0 0 18px!important;padding-left:32px!important;font-size:.9rem!important;line-height:1.42!important}.exp-right li:before{content:'✓';position:absolute;left:0;color:var(--yellow);font-weight:800}.exp-right ul.swap{animation:expListSwap .34s ease}@keyframes expListSwap{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}
    @media(max-width:1100px){.experience-orbit-stage{grid-template-columns:38% 62%!important;padding:34px!important}.exp-ring,.exp-nodes{left:-5%!important}.exp-ring{width:820px!important;height:820px!important}.exp-right{left:42%!important;width:54%!important}.exp-right li{margin-bottom:11px!important;font-size:.8rem!important}}
    @media(max-width:760px){.experience-story{height:480vh!important}.experience-orbit-stage{top:72px!important;height:calc(100vh - 84px)!important;min-height:720px!important;grid-template-columns:1fr!important;align-content:start!important;padding:22px!important}.exp-left h2{font-size:1.85rem!important}.exp-left>p{margin:8px 0 10px!important}.exp-date{font-size:1.25rem!important}.exp-scene{height:430px!important;min-height:430px!important;overflow:hidden!important}.exp-ring,.exp-nodes{left:-2%!important;top:53%!important}.exp-ring{width:510px!important;height:510px!important}.exp-right{left:42%!important;top:53%!important;width:54%!important}.exp-right ul{display:grid!important;grid-template-columns:1fr 1fr!important;gap:5px 10px!important}.exp-right li{margin:0!important;padding-left:19px!important;font-size:.61rem!important;line-height:1.3!important}}
  `;
  document.head.appendChild(styles);
  addEventListener('scroll',renderExperience,{passive:true});
  addEventListener('resize',renderExperience);
  renderExperience();
})();
