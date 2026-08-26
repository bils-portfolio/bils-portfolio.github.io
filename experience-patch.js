/* BILS Experience Patch v15
   MERGE: v13 movement/date behavior + v14 right-side geometry/bilingual copy.
   Load after app.js. Replaces only Experience. */
(() => {
  const now = new Date();
  const currentMonthYear = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const experiences = [
    {
      date: `09/2017 - ${currentMonthYear}`,
      company: 'Abitare Co.',
      role: 'Senior Graphic & Digital Designer',
      items: [
        ['Identita visiva per iniziative immobiliari, brochure, capitolati e presentazioni commerciali.', 'Visual identity for real estate developments, brochures, specifications and sales presentations.'],
        ['Video emozionali, teaser, siti web e landing page per i lanci commerciali.', 'Emotional videos, teasers, websites and landing pages for commercial launches.'],
        ['Post-produzione di fotografie, immagini e render 3D per digitale e stampa.', 'Post-production of photography, images and 3D renders for digital and print.'],
        ['Tool digitali interni per automatizzare attivita e migliorare i flussi del marketing.', 'Internal digital tools to automate tasks and improve marketing workflows.'],
        ['Comunicazione visiva di showroom e uffici vendita: dresswall, pannelli e vetrofanie.', 'Visual communication for showrooms and sales offices: dress walls, panels and window graphics.']
      ]
    },
    {
      date: '06/2017 - 08/2017',
      company: 'Gruppo Mondadori',
      role: 'Graphic Designer Editoriale',
      items: [
        ['Post-produzione fotografica e correzione colore.', 'Photography post-production and color correction.'],
        ['Controllo tecnico-editoriale dei contenuti.', 'Technical and editorial content review.'],
        ['Preparazione definitiva dei materiali prima dell invio allo stampatore.', 'Final preparation of materials before delivery to the printer.']
      ]
    },
    {
      date: '04/2014 - 06/2017',
      company: 'Casa.it',
      role: 'Creative Designer',
      items: [
        ['Campagne display e banner statici, dinamici e HTML5.', 'Display campaigns and static, dynamic and HTML5 banners.'],
        ['DEM e contenuti promozionali personalizzati.', 'Email marketing and customized promotional content.'],
        ['Produzione e pubblicazione con Adobe Creative Cloud, Google Web Designer e DoubleClick for Publishers.', 'Production and publishing with Adobe Creative Cloud, Google Web Designer and DoubleClick for Publishers.']
      ]
    },
    {
      date: '09/2012 - 03/2014',
      company: 'Link S.p.A.',
      role: 'Consulente Grafico',
      items: [
        ['Impaginazione e aggiornamento del catalogo aziendale.', 'Layout and updating of the company catalog.'],
        ['Post-produzione delle immagini di prodotto.', 'Post-production of product imagery.'],
        ['Creazione di materiali grafici promozionali.', 'Creation of promotional graphic materials.']
      ]
    },
    {
      date: '06/2012 - 09/2012',
      company: 'RCS MediaGroup',
      role: 'Operatore Grafico',
      items: [
        ['Impaginazione editoriale.', 'Editorial layout and page design.'],
        ['Ritocco fotografico.', 'Professional photo retouching.'],
        ['Adattamento di copertine per le testate del gruppo.', 'Cover adaptations for the group publications.']
      ]
    }
  ];

  const story = document.querySelector('.experience-story');
  if (!story) return;

  story.innerHTML = `
    <div class="experience-sticky experience-stage-v15">
      <div class="exp-left-v15">
        <h2><span>Un percorso costruito</span><br>tra creativita, editoria e digitale.</h2>
        <p>A journey shaped by creativity, publishing and digital innovation.</p>
        <div class="exp-date-v15" aria-live="polite"></div>
        <div class="exp-progress-v15"><i></i></div>
      </div>

      <div class="exp-scene-v15">
        <div class="exp-ring-v15"></div>
        <div class="exp-nodes-v15">
          ${experiences.map((item, index) => `
            <div class="career-node-v15" data-index="${index}">
              <div class="career-label-v15">
                <strong>${item.company}</strong>
                <span>${item.role}</span>
              </div>
            </div>`).join('')}
        </div>
        <div class="exp-copy-v15"><ul></ul></div>
      </div>
    </div>`;

  const nodes = [...story.querySelectorAll('.career-node-v15')];
  const dateEl = story.querySelector('.exp-date-v15');
  const listEl = story.querySelector('.exp-copy-v15 ul');
  const progressEl = story.querySelector('.exp-progress-v15 i');

  let activeIndex = -1;
  let displayedDate = '';
  const rollingTimers = [];

  function clearRolling() {
    while (rollingTimers.length) clearTimeout(rollingTimers.pop());
  }

  function rollingDigit(fromChar, toChar, delay, onUpdate) {
    if (fromChar === toChar || !/\d/.test(toChar)) {
      rollingTimers.push(setTimeout(() => onUpdate(toChar), delay));
      return;
    }
    const start = /\d/.test(fromChar) ? Number(fromChar) : 0;
    const end = Number(toChar);
    let steps = (start - end + 10) % 10;
    if (steps === 0) steps = 10;
    for (let step = 1; step <= steps; step += 1) {
      rollingTimers.push(setTimeout(() => onUpdate(String((start - step + 10) % 10)), delay + step * 42));
    }
  }

  function animateDate(target) {
    clearRolling();
    const source = displayedDate.padEnd(target.length, ' ');
    const chars = target.split('');
    dateEl.innerHTML = chars.map((char, index) => `<span class="date-char-v15" data-pos="${index}">${source[index] || ' '}</span>`).join('');
    chars.forEach((targetChar, index) => {
      const span = dateEl.querySelector(`[data-pos="${index}"]`);
      rollingDigit(source[index] || ' ', targetChar, index * 28, value => { span.textContent = value; });
    });
    const finishDelay = target.length * 28 + 520;
    rollingTimers.push(setTimeout(() => {
      dateEl.textContent = target;
      displayedDate = target;
    }, finishDelay));
  }

  function updateContent(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    const item = experiences[index];
    animateDate(item.date);
    listEl.classList.remove('swap-v15');
    listEl.innerHTML = item.items.map(([it, en]) => `
      <li>
        <span class="exp-it-v15">${it}</span>
        <em class="exp-en-v15">${en}</em>
      </li>`).join('');
    requestAnimationFrame(() => listEl.classList.add('swap-v15'));
  }

  function renderExperience() {
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    const stageFloat = progress * (experiences.length - 1);
    const closest = Math.min(experiences.length - 1, Math.floor(stageFloat + 0.5));
    updateContent(closest);
    progressEl.style.width = `${progress * 100}%`;

    const mobile = matchMedia('(max-width:760px)').matches;
    const radiusX = mobile ? 255 : 510;
    const radiusY = mobile ? 225 : 420;

    nodes.forEach((node, nodeIndex) => {
      const relative = nodeIndex - stageFloat;

      // v13 movement/size behavior, mirrored onto v14's right-side circumference.
      const angle = Math.PI - relative * 43 * Math.PI / 180;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;
      const distance = Math.abs(relative);
      const size = mobile
        ? Math.max(68, 126 - Math.min(1.15, distance) * 50)
        : Math.max(78, 250 - Math.min(1.15, distance) * 145);

      node.style.setProperty('--node-x', `${x}px`);
      node.style.setProperty('--node-y', `${y}px`);
      node.style.setProperty('--node-size', `${size}px`);
      node.style.opacity = distance > 1.15 ? '0' : '1';
      node.style.zIndex = String(30 - Math.round(distance * 4));
      node.classList.toggle('is-active-v15', nodeIndex === closest);
      node.classList.toggle('show-label-v15', distance < .32);
    });
  }

  const styles = document.createElement('style');
  styles.textContent = `
    .experience-story{height:520vh!important;margin-top:18px!important}
    .experience-stage-v15{position:sticky!important;top:90px!important;height:calc(100vh - 108px)!important;min-height:680px!important;display:grid!important;grid-template-columns:35% 65%!important;align-items:center!important;padding:52px!important;overflow:hidden!important;background:#080f1c!important}
    .exp-left-v15{position:relative!important;z-index:50!important}
    .exp-left-v15 h2{margin:0!important;font-size:clamp(2rem,3.4vw,3.55rem)!important;line-height:1.03!important;letter-spacing:-.05em!important}
    .exp-left-v15 h2 span,.exp-date-v15{color:var(--yellow)!important}
    .exp-left-v15>p{margin:14px 0 30px!important;color:var(--muted)!important;font-style:italic!important}
    .exp-date-v15{display:flex!important;flex-wrap:nowrap!important;min-height:1.25em!important;font-size:clamp(1.45rem,2.55vw,2.5rem)!important;font-weight:700!important;font-variant-numeric:tabular-nums!important;white-space:pre!important}
    .date-char-v15{display:inline-block!important;min-width:.58em!important;text-align:center!important}
    .exp-progress-v15{height:2px!important;margin-top:18px!important;background:rgba(255,255,255,.1)!important}
    .exp-progress-v15 i{display:block!important;height:100%!important;background:var(--yellow)!important}

    .exp-scene-v15{position:relative!important;height:100%!important;min-height:620px!important;overflow:visible!important}
    .exp-ring-v15{position:absolute!important;left:96%!important;top:50%!important;width:1020px!important;height:1020px!important;transform:translate(-50%,-50%)!important;border:2px solid rgba(252,255,131,.34)!important;border-radius:50%!important}
    .exp-nodes-v15{position:absolute!important;left:96%!important;top:50%!important}

    .career-node-v15{--node-x:-510px;--node-y:0px;--node-size:82px;position:absolute!important;left:0!important;top:0!important;width:var(--node-size)!important;height:var(--node-size)!important;transform:translate(calc(-50% + var(--node-x)),calc(-50% + var(--node-y)))!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:var(--yellow)!important;color:#08101d!important;text-align:center!important;opacity:1!important;will-change:transform,width,height!important;box-shadow:0 12px 36px rgba(0,0,0,.24)!important}
    .career-label-v15{padding:16px!important;opacity:0!important;visibility:hidden!important;transition:opacity .16s ease!important}
    .career-node-v15.show-label-v15 .career-label-v15{opacity:1!important;visibility:visible!important}
    .career-node-v15 strong{display:block!important;font-size:clamp(.8rem,1.05vw,1.14rem)!important;line-height:1.08!important}
    .career-node-v15 span{display:block!important;margin-top:7px!important;font-size:clamp(.52rem,.67vw,.7rem)!important;line-height:1.22!important}
    .career-node-v15.is-active-v15{box-shadow:0 24px 74px rgba(252,255,131,.23)!important}

    .exp-copy-v15{position:absolute!important;z-index:20!important;left:58%!important;top:50%!important;width:39%!important;transform:translateY(-50%)!important}
    .exp-copy-v15 ul{list-style:none!important;margin:0!important;padding:0!important}
    .exp-copy-v15 li{position:relative!important;margin:0 0 18px!important;padding-left:32px!important;line-height:1.42!important}
    .exp-copy-v15 li:before{content:'✓';position:absolute;left:0;color:var(--yellow);font-weight:800}
    .exp-it-v15{display:block!important;color:var(--text)!important;font-size:1rem!important;line-height:1.42!important;font-style:normal!important}
    .exp-en-v15{display:block!important;margin-top:5px!important;color:var(--muted)!important;font-size:.74rem!important;line-height:1.4!important;font-style:italic!important}
    .exp-copy-v15 ul.swap-v15{animation:expListSwapV15 .34s ease}
    @keyframes expListSwapV15{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}

    @media(max-width:1100px){
      .experience-stage-v15{grid-template-columns:38% 62%!important;padding:34px!important}
      .exp-ring-v15,.exp-nodes-v15{left:102%!important}
      .exp-ring-v15{width:820px!important;height:820px!important}
      .exp-copy-v15{left:59%!important;width:38%!important}
      .exp-it-v15{font-size:.82rem!important}.exp-en-v15{font-size:.67rem!important}
    }

    @media(max-width:760px){
      .experience-story{height:480vh!important}
      .experience-stage-v15{top:72px!important;height:calc(100vh - 84px)!important;min-height:720px!important;grid-template-columns:1fr!important;align-content:start!important;padding:22px!important}
      .exp-left-v15 h2{font-size:1.85rem!important}.exp-left-v15>p{margin:8px 0 10px!important}.exp-date-v15{font-size:1.25rem!important}
      .exp-scene-v15{height:440px!important;min-height:440px!important;overflow:hidden!important}
      .exp-ring-v15,.exp-nodes-v15{left:106%!important;top:52%!important}
      .exp-ring-v15{width:510px!important;height:510px!important}
      .exp-copy-v15{left:58%!important;top:52%!important;width:40%!important}
      .exp-copy-v15 li{margin-bottom:8px!important;padding-left:22px!important}
      .exp-it-v15{font-size:.74rem!important}.exp-en-v15{font-size:.61rem!important;margin-top:3px!important}
    }
  `;

  document.head.appendChild(styles);
  addEventListener('scroll', renderExperience, {passive:true});
  addEventListener('resize', renderExperience);
  renderExperience();
})();
