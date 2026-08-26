/* BILS Typography + Shared Gradient Update 24
   Loaded after app.js and experience-patch.js. */
(() => {
  const root = document.documentElement;

  // Hero: preserve scale, add more breathing room between Hey and hello there.
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) heroTitle.classList.add('hero-title-v24');

  // About / What I Do emotional heading.
  const aboutTitle = document.querySelector('.about-intro h2');
  if (aboutTitle) aboutTitle.classList.add('section-title-v24');
  const aboutEnglish = document.querySelector('.about-intro .about-en');
  if (aboutEnglish) aboutEnglish.classList.add('section-subtitle-v24');

  // Work heading + mobile-only swipe controls.
  const work = document.querySelector('#work');
  const workTitle = work?.querySelector('.emotional-heading h2');
  const workEnglish = work?.querySelector('.emotional-heading p');
  const projectGrid = work?.querySelector('.project-grid');
  if (workTitle) workTitle.classList.add('section-title-v24');
  if (workEnglish) workEnglish.classList.add('section-subtitle-v24');
  if (projectGrid && !work.querySelector('.mobile-project-nav')) {
    const controls = document.createElement('div');
    controls.className = 'mobile-project-nav';
    controls.innerHTML = '<button type="button" class="mobile-project-prev" aria-label="Progetto precedente">←</button><span>SWIPE</span><button type="button" class="mobile-project-next" aria-label="Progetto successivo">→</button>';
    work.querySelector('.emotional-heading')?.after(controls);
    const scrollProject = direction => {
      const card = projectGrid.querySelector('.project');
      if (!card) return;
      const gap = 14;
      projectGrid.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
    };
    controls.querySelector('.mobile-project-prev').addEventListener('click', () => scrollProject(-1));
    controls.querySelector('.mobile-project-next').addEventListener('click', () => scrollProject(1));
  }

  // Experience headings are created by experience-patch.js.
  document.querySelectorAll('.exp16-left h2, .exp-left h2').forEach(el => el.classList.add('section-title-v24'));
  document.querySelectorAll('.exp16-left > p, .exp-left > p').forEach(el => el.classList.add('section-subtitle-v24'));

  // Tools and My Approach.
  const toolsTitle = document.querySelector('.tools-panel .lower-emotional-heading h2');
  const toolsEnglish = document.querySelector('.tools-panel .lower-emotional-heading p');
  if (toolsTitle) toolsTitle.classList.add('section-title-v24');
  if (toolsEnglish) toolsEnglish.classList.add('section-subtitle-v24');
  const approachTitle = document.querySelector('.approach-merged .lower-emotional-heading h2');
  const approachEnglish = document.querySelector('.approach-merged .lower-emotional-heading p');
  if (approachTitle) approachTitle.classList.add('section-title-v24');
  if (approachEnglish) approachEnglish.classList.add('section-subtitle-v24');

  // Footer copy revision. Keep the approved main title and form layout.
  const contactHeading = document.querySelector('.contact-heading');
  if (contactHeading) {
    const title = contactHeading.querySelector('h2');
    if (title) title.innerHTML = "Let's create something <span>meaningful.</span>";
    const italian = contactHeading.querySelector('p');
    const english = contactHeading.querySelector('i');
    if (italian) italian.textContent = 'Se il mio percorso e i miei progetti parlano alla tua realtà, possiamo iniziare una conversazione.';
    if (english) english.textContent = 'If my experience and selected work resonate with your vision, let’s start a conversation.';
  }

  // Form button.
  const submitLabel = document.querySelector('.portfolio-form button span');
  if (submitLabel) submitLabel.textContent = 'SUBMIT';

  const style = document.createElement('style');
  style.textContent = `
    :root{
      --section-title-size:clamp(3rem,4.5vw,4.7rem);
      --section-subtitle-size:1rem;
      --panel-gradient:linear-gradient(145deg,#07101d 0%,#0e1a2e 58%,#182b4b 100%);
      --panel-gradient-soft:linear-gradient(145deg,#080f1c 0%,#111b31 62%,#172945 100%);
    }

    body{
      background:
        radial-gradient(circle at 14% 4%,rgba(252,255,131,.055),transparent 30rem),
        radial-gradient(circle at 88% 34%,rgba(50,82,139,.12),transparent 36rem),
        linear-gradient(180deg,#0a1325 0%,#0f172a 42%,#0a1325 100%)!important;
      background-attachment:fixed!important;
    }

    .hero-title-v24{gap:clamp(18px,1.75vw,30px)!important}

    .section-title-v24{
      font-family:Inter,sans-serif!important;
      font-size:var(--section-title-size)!important;
      line-height:.98!important;
      letter-spacing:-.058em!important;
      font-weight:800!important;
      font-style:normal!important;
    }

    .section-subtitle-v24{
      font-family:Inter,sans-serif!important;
      font-size:var(--section-subtitle-size)!important;
      line-height:1.48!important;
      font-style:italic!important;
      color:var(--muted)!important;
    }

    .about-intro .section-subtitle-v24,
    .emotional-heading .section-subtitle-v24,
    .tools-panel .section-subtitle-v24,
    .approach-merged .section-subtitle-v24,
    .exp16-left .section-subtitle-v24,
    .exp-left .section-subtitle-v24{margin-top:12px!important}

    .project-title-top{
      min-height:2.35em!important;
      font-size:1.18rem!important;
      line-height:1.12!important;
      font-weight:700!important;
      display:flex!important;
      align-items:flex-end!important;
    }

    .mobile-project-nav{display:none}

    /* Shared dark-blue gradient language across all main containers. */
    .hero,
    .about-orbit,
    .work,
    .experience-sticky,
    .tools-panel,
    .approach-contact-inner{
      background:var(--panel-gradient)!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.02),0 24px 70px rgba(0,0,0,.18)!important;
    }

    .project-wow,
    .orbit-detail,
    .contact-closing,
    .approach-merged{
      background:var(--panel-gradient-soft)!important;
    }

    .tools-panel{
      background:
        radial-gradient(circle at 96% 16%,rgba(65,93,145,.24),transparent 40%),
        var(--panel-gradient)!important;
    }

    .contact-heading p{max-width:560px!important;line-height:1.55!important}
    .contact-heading i{display:block!important;max-width:560px!important;line-height:1.5!important}

    @media(max-width:760px){
      :root{
        --section-title-size:clamp(2rem,9vw,2.65rem);
        --section-subtitle-size:.8rem;
      }

      .hero-title-v24{gap:14px!important}

      .section-title-v24{
        line-height:1.02!important;
        letter-spacing:-.05em!important;
      }

      .project-title-top{
        min-height:2.25em!important;
        font-size:1.14rem!important;
        line-height:1.12!important;
      }

      .mobile-project-nav{
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        gap:18px!important;
        margin:-12px 0 22px!important;
      }

      .mobile-project-nav button{
        padding:0!important;
        border:0!important;
        background:transparent!important;
        color:var(--yellow)!important;
        font:500 1.55rem Inter!important;
        cursor:pointer!important;
      }

      .mobile-project-nav span{
        color:var(--muted)!important;
        font-size:.58rem!important;
        font-weight:700!important;
        letter-spacing:.18em!important;
      }

      .contact-heading p{font-size:.9rem!important}
      .contact-heading i{font-size:.74rem!important}
    }
  `;
  document.head.appendChild(style);
})();
