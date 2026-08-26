/* BILS Final Interaction Refinement Update 26
   Loaded after app.js and experience-patch.js. */
(() => {
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // HERO
  q('.hero h1')?.classList.add('hero-title-v26');
  const contacts = q('.contacts');
  if (contacts) {
    const links = [...contacts.querySelectorAll('a')];
    if (links[2]) { links[2].classList.add('social-text-v26'); links[2].textContent = 'Wa'; links[2].setAttribute('aria-label','WhatsApp'); }
    if (links[3]) { links[3].classList.add('social-text-v26'); links[3].textContent = 'In'; links[3].setAttribute('aria-label','LinkedIn'); }
  }
  const scrollCue = q('.hero .scroll');
  if (scrollCue) { scrollCue.textContent = '↓'; scrollCue.classList.add('scroll-arrow-v26'); }

  // PROJECTS: restore counter-clockwise plus rotation on desktop; mobile cover-only, no lightbox.
  qa('.gallery-plus').forEach(plus => plus.classList.add('gallery-plus-v26'));
  const mobileQuery = matchMedia('(max-width:760px)');
  const deactivateMobileProjects = () => {
    qa('.project').forEach(card => {
      if (mobileQuery.matches) {
        card.setAttribute('data-mobile-cover-only','true');
        card.removeAttribute('tabindex');
        card.removeAttribute('role');
        card.style.cursor = 'default';
        card.onclick = event => { event.preventDefault(); event.stopImmediatePropagation(); return false; };
        card.onkeydown = null;
      }
    });
  };
  deactivateMobileProjects();
  mobileQuery.addEventListener?.('change', () => location.reload());

  // EXPERIENCE shorter heading, maximum three lines.
  qa('.exp16-left h2, .exp-left h2').forEach(title => {
    title.innerHTML = '<span>Un percorso costruito</span><br>tra creatività e innovazione.';
  });

  // TOOLS alignment and fixed dots.
  const toolsSelector = q('.tools-selector');
  if (toolsSelector && !q('.tools-fixed-dot-right', toolsSelector)) {
    const rightDot = document.createElement('span');
    rightDot.className = 'tools-fixed-dot tools-fixed-dot-right';
    rightDot.setAttribute('aria-hidden','true');
    toolsSelector.appendChild(rightDot);
  }

  // FOOTER outlined title, copy, note removal, automatic year.
  const contactHeading = q('.contact-heading');
  if (contactHeading) {
    q('h2', contactHeading)?.classList.add('outline-title-v26');
    const italian = q('p', contactHeading);
    const english = q('i', contactHeading);
    if (italian) italian.textContent = 'Se il mio percorso e i miei progetti parlano alla tua realtà, possiamo iniziare una conversazione.';
    if (english) english.textContent = 'If my experience and selected work resonate with your vision, let’s start a conversation.';
  }
  q('.form-note')?.remove();
  const submit = q('.portfolio-form button span');
  if (submit) submit.textContent = 'SUBMIT';
  const footerSignature = q('.contact-footer small');
  if (footerSignature) footerSignature.textContent = `© ${new Date().getFullYear()} Portfolio – Design by Billy Joel Dolor – All rights reserved.`;

  // Download label: icon-only by default on desktop, expands on hover. Icon-only on mobile.
  const floatingCv = q('.floating-cv');
  if (floatingCv) floatingCv.classList.add('floating-cv-v26');

  const style = document.createElement('style');
  style.textContent = `
    /* Hero */
    .hero-title-v26{gap:clamp(24px,2.15vw,36px)!important}
    .contacts .social-text-v26{font-size:1rem!important;font-weight:700!important;color:var(--text)!important;letter-spacing:.02em!important}
    .contacts a{transition:border-color .22s ease,color .22s ease,background .22s ease,box-shadow .22s ease,transform .22s ease!important}
    .contacts a:hover{border-color:var(--yellow)!important;background:rgba(252,255,131,.08)!important;box-shadow:0 0 22px rgba(252,255,131,.1)!important;color:var(--yellow)!important;transform:translateY(-3px)!important}
    .contacts a:hover svg{stroke:var(--yellow)!important}
    .contacts a:hover.social-text-v26{color:var(--yellow)!important}
    .scroll-arrow-v26{font-size:1.75rem!important;line-height:1!important;letter-spacing:0!important;animation:scrollArrowV26 1.45s ease-in-out infinite!important}
    @keyframes scrollArrowV26{0%,100%{transform:translate(-50%,0);opacity:.3}50%{transform:translate(-50%,12px);opacity:1}}

    /* Project cards */
    .project-wow:hover{transform:translateY(-9px)!important}
    .gallery-plus-v26{transition:transform .38s cubic-bezier(.2,.8,.2,1),background .2s ease!important}
    .project-wow:hover .gallery-plus-v26{transform:rotate(-180deg) scale(1.08)!important;background:var(--olive)!important}

    /* Experience */
    .exp16-left h2,.exp-left h2{max-width:650px!important}

    /* Tools */
    .tools-selector{justify-self:end!important;width:min(100%,500px)!important;grid-template-columns:18px minmax(280px,1fr)!important;gap:22px!important}
    .tools-window{text-align:left!important}
    .tool-slot{justify-content:flex-start!important;text-align:left!important;font-size:1.22rem!important}
    .tools-fixed-dot{width:12px!important;height:12px!important}
    .tools-fixed-dot-right{display:none!important}

    /* Footer outlined title */
    .outline-title-v26{color:transparent!important;-webkit-text-fill-color:transparent!important;-webkit-text-stroke:1.6px var(--text)!important;text-stroke:1.6px var(--text)!important}
    .outline-title-v26 span{color:transparent!important;-webkit-text-fill-color:transparent!important;-webkit-text-stroke:1.6px var(--yellow)!important;text-stroke:1.6px var(--yellow)!important}

    /* Download tab */
    .floating-cv-v26{width:64px!important;min-width:64px!important;padding:10px 12px!important;overflow:hidden!important;justify-content:flex-start!important;transition:width .32s cubic-bezier(.2,.72,.25,1),background .2s ease!important}
    .floating-cv-v26 .download-copy{min-width:72px!important;opacity:0!important;transform:translateX(18px)!important;transition:opacity .2s ease,transform .3s ease!important}
    .floating-cv-v26:hover{width:148px!important}
    .floating-cv-v26:hover .download-copy{opacity:1!important;transform:translateX(0)!important}

    @media(max-width:760px){
      /* Hero mobile centered and simplified */
      .hero{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;text-align:center!important;padding-inline:22px!important}
      .hero-copy,.portrait{width:100%!important}
      .hero h1{width:100%!important;text-align:center!important;overflow:visible!important}
      .hero-there{display:inline-block!important;white-space:nowrap!important;padding-right:.08em!important}
      .hero-dot{display:inline!important}
      .hero .tags{display:grid!important;grid-template-columns:1fr 1fr!important;width:min(100%,320px)!important;margin:20px auto 0!important;gap:8px 14px!important;text-align:center!important}
      .hero .tags b{font-size:.84rem!important;line-height:1.25!important;white-space:normal!important}
      .hero .scroll{display:none!important}
      .contacts .social-text-v26{font-size:.92rem!important}

      /* Mobile projects are cover-only, no plus and no lightbox. */
      .project[data-mobile-cover-only="true"] .copy{display:none!important}
      .project[data-mobile-cover-only="true"] .gallery-plus{display:none!important}
      .project[data-mobile-cover-only="true"]{cursor:default!important;transform:none!important}
      .project[data-mobile-cover-only="true"]:hover{transform:none!important}

      /* Hide Experience descriptions only on mobile. */
      .exp16-copy,.exp-right{display:none!important}

      /* Tools mobile centered, two fixed dots at the edges. */
      .tools-selector{justify-self:center!important;width:min(100%,330px)!important;grid-template-columns:16px 1fr 16px!important;gap:12px!important}
      .tools-fixed-dot-right{display:block!important;grid-column:3!important;grid-row:1!important}
      .tools-window{grid-column:2!important;grid-row:1!important;text-align:center!important}
      .tool-slot{justify-content:center!important;text-align:center!important;font-size:1.04rem!important}
      .tools-fixed-dot{width:10px!important;height:10px!important}

      /* Footer and label mobile. */
      .outline-title-v26{-webkit-text-stroke-width:1.2px!important;text-stroke-width:1.2px!important}
      .outline-title-v26 span{-webkit-text-stroke-width:1.2px!important;text-stroke-width:1.2px!important}
      .floating-cv-v26,.floating-cv-v26:hover{width:58px!important;min-width:58px!important;padding:9px 10px!important}
      .floating-cv-v26 .download-copy,.floating-cv-v26:hover .download-copy{display:none!important}
      .contact-footer small{font-size:.64rem!important;line-height:1.45!important}
    }
  `;
  document.head.appendChild(style);
})();
