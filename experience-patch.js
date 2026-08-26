/* BILS Experience Orbit Update 11
   Loaded after app.js. Replaces only the Experience mechanism. */
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
    <div class="experience-sticky experience-stage-v11">
      <div class="exp-left-v11">
        <h2><span>Un percorso costruito</span><br>tra creativita, editoria e digitale.</h2>
        <p>A journey shaped by creativity, publishing and digital innovation.</p>
        <div class="exp-date-v11" aria-live="polite">${experiences[0].date}</div>
        <div class="exp-progress-v11"><i></i></div>
      </div>

      <div class="exp-scene-v11">
        <div class="exp-ring-v11"></div>
        <div class="exp-nodes-v11">
          ${experiences.map((item, index) => `
            <div class="career-node-v11" data-index="${index}">
              <div class="node-copy-v11"><strong>${item.company}</strong><span>${item.role}</span></div>
            </div>`).join('')}
        </div>
        <div class="exp-description-v11"><ul></ul></div>
      </div>
    </div>`;

  const nodes = [...story.querySelectorAll('.career-node-v11')];
  const dateEl = story.querySelector('.exp-date-v11');
  const listEl = story.querySelector('.exp-description-v11 ul');
  const progressEl = story.querySelector('.exp-progress-v11 i');
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
    listEl.classList.remove('swap-v11');
    listEl.innerHTML = item.items.map(text => `<li>${text}</li>`).join('');
    requestAnimationFrame(() => listEl.classList.add('swap-v11'));
  }

  function render() {
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    const stageFloat = progress * (experiences.length - 1);
    const nearest = Math.min(experiences.length - 1, Math.floor(stageFloat + 0.5));
    updateContent(nearest);
    progressEl.style.width = `${progress * 100}%`;

    const mobile = matchMedia('(max-width:760px)').matches;
    const radiusX = mobile ? 285 : 540;
    const radiusY = mobile ? 260 : 465;

    nodes.forEach((node, nodeIndex) => {
      const relative = nodeIndex - stageFloat;

      /*
        The active node sits at the right-middle of the huge circle.
        The next node is a small yellow dot below the box.
        The previous node is a small yellow dot above the box.
        During scroll every node travels bottom -> center -> top on the ring.
      */
      const angle = Math.PI - relative * 55 * Math.PI / 180;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      const abs = Math.abs(relative);

      // Text appears only while the node is approaching/occupying the central active position.
      const copyVisibility = Math.max(0, Math.min(1, 1.15 - abs * 2.8));
      const scale = Math.max(0.16, 1.68 - Math.min(1, abs) * 1.50);
      const opacity = abs > 1.08 ? 0 : Math.max(0.82, 1 - abs * 0.12);

      node.style.setProperty('--x', `${x}px`);
      node.style.setProperty('--y', `${y}px`);
      node.style.setProperty('--scale', scale.toFixed(3));
      node.style.setProperty('--copy-opacity', copyVisibility.toFixed(3));
      node.style.opacity = opacity.toFixed(3);
      node.style.zIndex = String(50 - Math.round(abs * 10));
      node.classList.toggle('is-active-v11', nodeIndex === nearest);
      node.classList.toggle('is-neighbour-v11', abs >= 0.55 && abs <= 1.12);
    });
  }

  const styles = document.createElement('style');
  styles.textContent = `
    .experience-story{
      height:520vh!important;
      margin-top:18px!important;
    }

    .experience-stage-v11{
      position:sticky!important;
      top:90px!important;
      height:calc(100vh - 108px)!important;
      min-height:690px!important;
      display:grid!important;
      grid-template-columns:35% 65%!important;
      align-items:center!important;
      padding:52px!important;
      overflow:hidden!important;
      background:#080f1c!important;
    }

    .exp-left-v11{
      position:relative!important;
      z-index:70!important;
    }

    .exp-left-v11 h2{
      margin:0!important;
      font-size:clamp(2rem,3.4vw,3.55rem)!important;
      line-height:1.03!important;
      letter-spacing:-.05em!important;
      color:var(--text)!important;
    }

    .exp-left-v11 h2 span,
    .exp-date-v11{
      color:var(--yellow)!important;
    }

    .exp-left-v11>p{
      margin:14px 0 30px!important;
      color:var(--muted)!important;
      font-style:italic!important;
    }

    .exp-date-v11{
      font-size:clamp(1.45rem,2.55vw,2.5rem)!important;
      font-weight:700!important;
      font-variant-numeric:tabular-nums!important;
    }

    .exp-progress-v11{
      width:100%!important;
      height:2px!important;
      margin-top:18px!important;
      background:rgba(255,255,255,.1)!important;
    }

    .exp-progress-v11 i{
      display:block!important;
      width:0;
      height:100%!important;
      background:var(--yellow)!important;
    }

    .exp-scene-v11{
      position:relative!important;
      height:100%!important;
      min-height:620px!important;
      overflow:visible!important;
      isolation:isolate!important;
    }

    /* The whole circumference is shifted to the far right. Only its left arc enters the composition. */
    .exp-ring-v11{
      position:absolute!important;
      left:96%!important;
      top:50%!important;
      width:1080px!important;
      height:1080px!important;
      transform:translate(-50%,-50%)!important;
      border:2px solid rgba(252,255,131,.34)!important;
      border-radius:50%!important;
      box-shadow:0 0 72px rgba(252,255,131,.035)!important;
      pointer-events:none!important;
    }

    .exp-nodes-v11{
      position:absolute!important;
      left:96%!important;
      top:50%!important;
      width:0!important;
      height:0!important;
      overflow:visible!important;
    }

    .career-node-v11{
      --x:540px;
      --y:0px;
      --scale:.2;
      --copy-opacity:0;
      position:absolute!important;
      left:0!important;
      top:0!important;
      width:158px!important;
      height:158px!important;
      transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(var(--scale))!important;
      display:grid!important;
      place-items:center!important;
      padding:16px!important;
      border-radius:50%!important;
      background:var(--yellow)!important;
      color:#08101d!important;
      text-align:center!important;
      transform-origin:center!important;
      will-change:transform,opacity!important;
      box-shadow:0 18px 54px rgba(0,0,0,.28)!important;
    }

    .node-copy-v11{
      opacity:var(--copy-opacity)!important;
      transition:opacity .12s linear!important;
    }

    .node-copy-v11 strong{
      display:block!important;
      font-size:1.05rem!important;
      line-height:1.08!important;
    }

    .node-copy-v11 span{
      display:block!important;
      margin-top:7px!important;
      font-size:.66rem!important;
      line-height:1.22!important;
    }

    .career-node-v11.is-active-v11{
      box-shadow:0 28px 85px rgba(252,255,131,.22)!important;
    }

    /* Description remains inside the outline, to the right of the large active node. */
    .exp-description-v11{
      position:absolute!important;
      z-index:65!important;
      left:58%!important;
      top:50%!important;
      width:39%!important;
      transform:translateY(-50%)!important;
    }

    .exp-description-v11 ul{
      list-style:none!important;
      margin:0!important;
      padding:0!important;
    }

    .exp-description-v11 li{
      position:relative!important;
      margin:0 0 18px!important;
      padding-left:32px!important;
      color:var(--text)!important;
      font-size:.9rem!important;
      line-height:1.42!important;
    }

    .exp-description-v11 li:before{
      content:'✓';
      position:absolute;
      left:0;
      color:var(--yellow);
      font-weight:800;
    }

    .exp-description-v11 ul.swap-v11{
      animation:experienceSwapV11 .34s ease;
    }

    @keyframes experienceSwapV11{
      from{opacity:0;transform:translateY(15px)}
      to{opacity:1;transform:none}
    }

    @media(max-width:1120px){
      .experience-stage-v11{
        grid-template-columns:38% 62%!important;
        padding:34px!important;
      }
      .exp-ring-v11,.exp-nodes-v11{left:102%!important}
      .exp-ring-v11{width:900px!important;height:900px!important}
      .exp-description-v11{left:59%!important;width:38%!important}
      .exp-description-v11 li{margin-bottom:11px!important;font-size:.79rem!important}
    }

    @media(max-width:760px){
      .experience-story{height:480vh!important}
      .experience-stage-v11{
        top:72px!important;
        height:calc(100vh - 84px)!important;
        min-height:720px!important;
        grid-template-columns:1fr!important;
        align-content:start!important;
        padding:22px!important;
      }
      .exp-left-v11 h2{font-size:1.85rem!important}
      .exp-left-v11>p{margin:8px 0 10px!important}
      .exp-date-v11{font-size:1.25rem!important}
      .exp-scene-v11{height:440px!important;min-height:440px!important;overflow:hidden!important}
      .exp-ring-v11,.exp-nodes-v11{left:106%!important;top:52%!important}
      .exp-ring-v11{width:570px!important;height:570px!important}
      .career-node-v11{width:110px!important;height:110px!important}
      .node-copy-v11 strong{font-size:.79rem!important}
      .node-copy-v11 span{font-size:.52rem!important}
      .exp-description-v11{left:58%!important;top:52%!important;width:40%!important}
      .exp-description-v11 li{margin-bottom:6px!important;padding-left:22px!important;font-size:.67rem!important}
    }
  `;

  document.head.appendChild(styles);
  addEventListener('scroll', render, { passive:true });
  addEventListener('resize', render);
  render();
})();
