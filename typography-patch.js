/* BILS Visual Refinement Update 25
   Complete typography patch. Load after app.js and experience-patch.js. */
(() => {
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Hero spacing, size unchanged.
  q('.hero h1')?.classList.add('hero-title-v25');

  // Shared section title system.
  [q('.about-intro h2'), q('#work .emotional-heading h2'), q('.tools-panel .lower-emotional-heading h2'), q('.approach-merged .lower-emotional-heading h2')]
    .filter(Boolean).forEach(el => el.classList.add('section-title-v25'));
  qa('.exp16-left h2, .exp-left h2').forEach(el => el.classList.add('section-title-v25'));

  [q('.about-intro .about-en'), q('#work .emotional-heading p'), q('.tools-panel .lower-emotional-heading p'), q('.approach-merged .lower-emotional-heading p')]
    .filter(Boolean).forEach(el => el.classList.add('section-subtitle-v25'));
  qa('.exp16-left > p, .exp-left > p').forEach(el => el.classList.add('section-subtitle-v25'));

  // Force the two main desktop headings to exactly two visual lines.
  const aboutTitle = q('.about-intro h2');
  if (aboutTitle) aboutTitle.innerHTML = 'Trasformo idee, progetti e spazi<br><span>in esperienze che lasciano il segno.</span>';
  const workTitle = q('#work .emotional-heading h2');
  if (workTitle) workTitle.innerHTML = '<span>Progetti che trasformano idee</span><br>in esperienze da ricordare.';

  // Force all project titles to a consistent two-line rhythm.
  const titleMap = {
    'Real Estate Marketing': 'Real Estate<br>Marketing',
    'Showroom & Sales Spaces': 'Showroom &<br>Sales Spaces',
    'Video & Teaser': 'Video &<br>Teaser',
    'Web & Landing Pages': 'Web & Landing<br>Pages',
    'Digital Tools': 'Digital<br>Tools'
  };
  qa('.project-title-top').forEach(title => {
    const raw = title.textContent.trim();
    if (titleMap[raw]) title.innerHTML = titleMap[raw];
  });

  // Mobile-only swipe controls, retained from the previous approved revision.
  const work = q('#work');
  const projectGrid = q('.project-grid', work || document);
  if (work && projectGrid && !q('.mobile-project-nav', work)) {
    const controls = document.createElement('div');
    controls.className = 'mobile-project-nav';
    controls.innerHTML = '<button type="button" class="mobile-project-prev" aria-label="Progetto precedente">←</button><span>SWIPE</span><button type="button" class="mobile-project-next" aria-label="Progetto successivo">→</button>';
    q('.emotional-heading', work)?.after(controls);
    const move = direction => {
      const card = q('.project', projectGrid);
      if (!card) return;
      projectGrid.scrollBy({ left: direction * (card.getBoundingClientRect().width + 14), behavior: 'smooth' });
    };
    q('.mobile-project-prev', controls).onclick = () => move(-1);
    q('.mobile-project-next', controls).onclick = () => move(1);
  }

  // Footer copy and submit label retained.
  const contactHeading = q('.contact-heading');
  if (contactHeading) {
    const paragraph = q('p', contactHeading);
    const english = q('i', contactHeading);
    if (paragraph) paragraph.textContent = 'Se il mio percorso e i miei progetti parlano alla tua realtà, possiamo iniziare una conversazione.';
    if (english) english.textContent = 'If my experience and selected work resonate with your vision, let’s start a conversation.';
  }
  const submit = q('.portfolio-form button span');
  if (submit) submit.textContent = 'SUBMIT';

  // Planet effect: different orbital radii, while preserving rotation and click behavior.
  const orbit = q('.orbit-wrap');
  const points = qa('.orbit-point');
  const lines = qa('.connector-lines line');
  if (orbit && points.length === 5) {
    const radiiDesktop = [212, 282, 242, 302, 228];
    const radiiMobile = [170, 224, 192, 238, 182];
    let phase = -90;
    let previous = performance.now();
    const animatePlanets = now => {
      const mobile = matchMedia('(max-width:760px)').matches;
      if (!mobile) phase += Math.min(now - previous, 40) * 0.0035;
      previous = now;
      const radii = mobile ? radiiMobile : radiiDesktop;
      const scaleToSvg = 760 / Math.max(1, orbit.clientWidth);
      points.forEach((point, index) => {
        const angle = (phase + index * 72) * Math.PI / 180;
        const x = Math.cos(angle) * radii[index];
        const y = Math.sin(angle) * radii[index];
        point.style.setProperty('left', `calc(50% + ${x}px)`, 'important');
        point.style.setProperty('top', `calc(50% + ${y}px)`, 'important');
        if (lines[index]) {
          lines[index].setAttribute('x2', 380 + x * scaleToSvg);
          lines[index].setAttribute('y2', 380 + y * scaleToSvg);
        }
      });
      requestAnimationFrame(animatePlanets);
    };
    requestAnimationFrame(animatePlanets);
  }

  const style = document.createElement('style');
  style.textContent = `
    :root{
      --section-title-size:clamp(3rem,4.5vw,4.7rem);
      --section-subtitle-size:1rem;
      --uniform-dark:linear-gradient(145deg,#07101d 0%,#0a1424 48%,#10203a 100%);
      --uniform-dark-center:radial-gradient(circle at 50% 60%,#050b14 0%,#07101d 38%,#0c192d 72%,#10203a 100%);
    }

    body{background:linear-gradient(180deg,#091225 0%,#0f172a 44%,#091225 100%)!important;background-attachment:fixed!important}
    .hero-title-v25{gap:clamp(20px,1.9vw,32px)!important}

    .section-title-v25{font-family:Inter,sans-serif!important;font-size:var(--section-title-size)!important;line-height:.98!important;letter-spacing:-.058em!important;font-weight:800!important;font-style:normal!important}
    .section-subtitle-v25{font-family:Inter,sans-serif!important;font-size:var(--section-subtitle-size)!important;line-height:1.48!important;font-style:italic!important;color:var(--muted)!important}

    .about-intro{max-width:1180px!important}
    .about-intro .section-title-v25,#work .section-title-v25{white-space:nowrap!important}

    /* About box: darker unified center, no halo around the planetary field. */
    .about-orbit{background:var(--uniform-dark-center)!important}
    .orbit-wrap{background:transparent!important;box-shadow:none!important}
    .orbit-glow{display:none!important}
    .orbit-circle{border-color:rgba(252,255,131,.18)!important}

    /* Work box follows the same restrained dark-blue language. */
    .work{background:var(--uniform-dark)!important}
    .project-wow{background:linear-gradient(180deg,#07101d,#0b1729)!important}
    .project-title-top{min-height:2.28em!important;font-size:1.18rem!important;line-height:1.12!important;font-weight:700!important;display:block!important;align-content:start!important}

    /* Approach and footer become one uninterrupted gradient field. */
    .approach-contact-inner{background:var(--uniform-dark)!important}
    .approach-merged,.contact-closing{background:transparent!important}
    .contact-divider{background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent)!important}

    .mobile-project-nav{display:none}

    @media(max-width:1180px) and (min-width:761px){
      .about-intro .section-title-v25,#work .section-title-v25{font-size:clamp(2.65rem,4.2vw,4rem)!important}
    }

    @media(max-width:760px){
      :root{--section-title-size:clamp(2rem,9vw,2.65rem);--section-subtitle-size:.8rem}
      .nav{display:none!important}
      .hero{margin-top:10px!important}
      .section-title-v25{line-height:1.02!important;letter-spacing:-.05em!important}
      .about-intro .section-title-v25,#work .section-title-v25{white-space:normal!important}
      .about-intro .section-title-v25 br,#work .section-title-v25 br{display:block!important}
      .project-title-top{font-size:1.14rem!important;line-height:1.12!important;min-height:2.25em!important}
      .mobile-project-nav{display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:-12px 0 22px!important}
      .mobile-project-nav button{padding:0!important;border:0!important;background:transparent!important;color:var(--yellow)!important;font:500 1.55rem Inter!important;cursor:pointer!important}
      .mobile-project-nav span{color:var(--muted)!important;font-size:.58rem!important;font-weight:700!important;letter-spacing:.18em!important}
      .floating-cv{display:flex!important}
    }
  `;
  document.head.appendChild(style);
})();
