/* BILS Experience Orbit Update 10
   Replaces only the Experience section. Loaded after app.js. */
(() => {
  const experiences = [
    { date:'09/2017 - Oggi', company:'Abitare Co.', role:'Senior Graphic & Digital Designer', items:['Identita visiva per iniziative immobiliari, brochure, capitolati e presentazioni commerciali.','Video emozionali, teaser, siti web e landing page per i lanci commerciali.','Post-produzione di fotografie, immagini e render 3D per digitale e stampa.','Tool digitali interni per automatizzare attivita e migliorare i flussi del marketing.','Comunicazione visiva di showroom e uffici vendita: dresswall, pannelli e vetrofanie.'] },
    { date:'06/2017 - 08/2017', company:'Gruppo Mondadori', role:'Graphic Designer Editoriale', items:['Post-produzione fotografica e correzione colore.','Controllo tecnico-editoriale dei contenuti.','Preparazione definitiva dei materiali prima dell invio allo stampatore.'] },
    { date:'04/2014 - 06/2017', company:'Casa.it', role:'Creative Designer', items:['Campagne display e banner statici, dinamici e HTML5.','DEM e contenuti promozionali personalizzati.','Produzione e pubblicazione con Adobe Creative Cloud, Google Web Designer e DoubleClick for Publishers.'] },
    { date:'09/2012 - 03/2014', company:'Link S.p.A.', role:'Consulente Grafico', items:['Impaginazione e aggiornamento del catalogo aziendale.','Post-produzione delle immagini di prodotto.','Creazione di materiali grafici promozionali.'] },
    { date:'06/2012 - 09/2012', company:'RCS MediaGroup', role:'Operatore Grafico', items:['Impaginazione editoriale.','Ritocco fotografico.','Adattamento di copertine per le testate del gruppo.'] }
  ];

  const story = document.querySelector('.experience-story');
  if (!story) return;

  story.innerHTML = `
    <div class="experience-sticky experience-orbit-stage">
      <div class="exp-left">
        <h2><span>Un percorso costruito</span><br>tra creativita, editoria e digitale.</h2>
        <p>A journey shaped by creativity, publishing and digital innovation.</p>
        <div class="exp-date" aria-live="polite">${experiences[0].date}</div>
        <div class="exp-progress"><i></i></div>
      </div>

      <div class="exp-scene" aria-label="Cronologia professionale interattiva">
        <div class="exp-ring"></div>
        <div class="exp-nodes">
          ${experiences.map((item, index) => `
            <div class="career-node" data-index="${index}">
              <strong>${item.company}</strong>
              <span>${item.role}</span>
            </div>`).join('')}
        </div>
        <div class="exp-right"><ul></ul></div>
      </div>
    </div>`;

  const nodes = [...story.querySelectorAll('.career-node')];
  const dateEl = story.querySelector('.exp-date');
  const listEl = story.querySelector('.exp-right ul');
  const progressEl = story.querySelector('.exp-progress i');
  let activeIndex = -1;

  function scrambleDate(target) {
    const chars = '0123456789/-';
    let frame = 0;
    clearInterval(scrambleDate.timer);
    scrambleDate.timer = setInterval(() => {
      dateEl.textContent = target.split('').map((char, index) => {
        if (char === ' ') return ' ';
        return frame > 7 + index ? char : chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      frame += 1;
      if (frame > 21) {
        clearInterval(scrambleDate.timer);
        dateEl.textContent = target;
      }
    }, 28);
  }

  function updateContent(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    const item = experiences[index];
    scrambleDate(item.date);
    listEl.classList.remove('swap');
    listEl.innerHTML = item.items.map(text => `<li>${text}</li>`).join('');
    requestAnimationFrame(() => listEl.classList.add('swap'));
  }

  function renderExperience() {
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    const stageFloat = progress * (experiences.length - 1);
    const closestIndex = Math.min(experiences.length - 1, Math.floor(stageFloat + 0.5));
    updateContent(closestIndex);
    progressEl.style.width = `${progress * 100}%`;

    const mobile = matchMedia('(max-width: 760px)').matches;
    const radiusX = mobile ? 255 : 510;
    const radiusY = mobile ? 225 : 420;

    nodes.forEach((node, nodeIndex) => {
      const relative = nodeIndex - stageFloat;

      // Active experience sits on the right-most middle point of the huge ring.
      // Future experiences start at the bottom. Past experiences continue upward.
      const angle = relative * 43 * Math.PI / 180;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;

      const distance = Math.abs(relative);
      const scale = Math.max(0.48, 1.62 - Math.min(1.25, distance) * 0.88);
      const opacity = Math.max(0.14, 1 - Math.max(0, distance - 1.15) * 0.52);

      node.style.setProperty('--node-x', `${x}px`);
      node.style.setProperty('--node-y', `${y}px`);
      node.style.setProperty('--node-scale', scale.toFixed(3));
      node.style.opacity = opacity.toFixed(3);
      node.style.zIndex = String(30 - Math.round(distance * 4));
      node.classList.toggle('is-active', nodeIndex === closestIndex);
    });
  }

  const styles = document.createElement('style');
  styles.textContent = `
    .experience-story{
      height:520vh!important;
      margin-top:18px!important;
    }

    .experience-orbit-stage{
      position:sticky!important;
      top:90px!important;
      height:calc(100vh - 108px)!important;
      min-height:680px!important;
      display:grid!important;
      grid-template-columns:34% 66%!important;
      align-items:center!important;
      gap:0!important;
      padding:52px!important;
      overflow:hidden!important;
      background:#080f1c!important;
    }

    .exp-left{
      position:relative!important;
      z-index:50!important;
      align-self:center!important;
    }

    .exp-left h2{
      margin:0!important;
      font-size:clamp(2rem,3.4vw,3.55rem)!important;
      line-height:1.03!important;
      letter-spacing:-.05em!important;
    }

    .exp-left h2 span,
    .exp-date{
      color:var(--yellow)!important;
    }

    .exp-left>p{
      margin:14px 0 30px!important;
      color:var(--muted)!important;
      font-style:italic!important;
    }

    .exp-date{
      font-size:clamp(1.45rem,2.55vw,2.5rem)!important;
      font-weight:700!important;
      font-variant-numeric:tabular-nums!important;
    }

    .exp-progress{
      width:100%!important;
      height:2px!important;
      margin-top:18px!important;
      background:rgba(255,255,255,.1)!important;
    }

    .exp-progress i{
      display:block!important;
      width:0;
      height:100%!important;
      background:var(--yellow)!important;
    }

    .exp-scene{
      position:relative!important;
      height:100%!important;
      min-height:620px!important;
      overflow:visible!important;
    }

    /* Huge ring shifted strongly to the left, matching the supplied sketches. */
    .exp-ring{
      position:absolute!important;
      left:8%!important;
      top:50%!important;
      width:1020px!important;
      height:1020px!important;
      transform:translate(-50%,-50%)!important;
      border:2px solid rgba(252,255,131,.34)!important;
      border-radius:50%!important;
      box-shadow:0 0 70px rgba(252,255,131,.035)!important;
    }

    .exp-nodes{
      position:absolute!important;
      left:8%!important;
      top:50%!important;
      width:0!important;
      height:0!important;
      overflow:visible!important;
    }

    .career-node{
      --node-x:510px;
      --node-y:0px;
      --node-scale:.55;
      position:absolute!important;
      left:0!important;
      top:0!important;
      width:158px!important;
      height:158px!important;
      transform:translate(calc(-50% + var(--node-x)),calc(-50% + var(--node-y))) scale(var(--node-scale))!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      padding:16px!important;
      border-radius:50%!important;
      background:var(--yellow)!important;
      color:#08101d!important;
      text-align:center!important;
      transform-origin:center!important;
      will-change:transform,opacity!important;
      box-shadow:0 16px 48px rgba(0,0,0,.25)!important;
    }

    .career-node strong{
      font-size:1.05rem!important;
      line-height:1.08!important;
    }

    .career-node span{
      margin-top:7px!important;
      font-size:.66rem!important;
      line-height:1.22!important;
    }

    .career-node.is-active{
      box-shadow:0 24px 74px rgba(252,255,131,.23)!important;
    }

    /* Description is inside the huge ring, on its open right-hand area. */
    .exp-right{
      position:absolute!important;
      z-index:20!important;
      left:48%!important;
      top:50%!important;
      width:46%!important;
      transform:translateY(-50%)!important;
    }

    .exp-right ul{
      list-style:none!important;
      margin:0!important;
      padding:0!important;
    }

    .exp-right li{
      position:relative!important;
      margin:0 0 18px!important;
      padding-left:32px!important;
      font-size:.9rem!important;
      line-height:1.42!important;
    }

    .exp-right li:before{
      content:'✓';
      position:absolute;
      left:0;
      color:var(--yellow);
      font-weight:800;
    }

    .exp-right ul.swap{
      animation:expListSwap .34s ease;
    }

    @keyframes expListSwap{
      from{opacity:0;transform:translateY(15px)}
      to{opacity:1;transform:none}
    }

    @media(max-width:1100px){
      .experience-orbit-stage{
        grid-template-columns:38% 62%!important;
        padding:34px!important;
      }
      .exp-ring,.exp-nodes{left:-5%!important}
      .exp-ring{width:820px!important;height:820px!important}
      .exp-right{left:42%!important;width:54%!important}
      .career-node{width:135px!important;height:135px!important}
      .exp-right li{margin-bottom:11px!important;font-size:.8rem!important}
    }

    @media(max-width:760px){
      .experience-story{height:480vh!important}
      .experience-orbit-stage{
        top:72px!important;
        height:calc(100vh - 84px)!important;
        min-height:720px!important;
        grid-template-columns:1fr!important;
        align-content:start!important;
        padding:22px!important;
      }
      .exp-left h2{font-size:1.85rem!important}
      .exp-left>p{margin:8px 0 10px!important}
      .exp-date{font-size:1.25rem!important}
      .exp-scene{height:430px!important;min-height:430px!important;overflow:hidden!important}
      .exp-ring,.exp-nodes{left:-2%!important;top:53%!important}
      .exp-ring{width:510px!important;height:510px!important}
      .career-node{width:108px!important;height:108px!important}
      .career-node strong{font-size:.78rem!important}
      .career-node span{font-size:.52rem!important}
      .exp-right{left:42%!important;top:53%!important;width:54%!important}
      .exp-right li{margin-bottom:6px!important;padding-left:22px!important;font-size:.67rem!important}
    }
  `;

  document.head.appendChild(styles);
  addEventListener('scroll', renderExperience, { passive:true });
  addEventListener('resize', renderExperience);
  renderExperience();
})();
