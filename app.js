const skills = [["✦","Creative Direction","Definisco l'identita visiva e la direzione creativa dei progetti, mantenendo coerenza e riconoscibilita in ogni punto di contatto.","Building visual identities and creative systems that give every project a recognizable voice."],["▷","Visual Storytelling","Trasformo idee e iniziative immobiliari in racconti visivi attraverso video, teaser e contenuti emozionali.","Turning projects into visual stories through emotional videos, teaser campaigns and branded content."],["▣","Digital Experiences","Progetto siti web e landing page capaci di informare, coinvolgere e supportare gli obiettivi commerciali.","Designing websites and landing pages that inform, engage and support business goals."],["▧","Visual Post-Production","Valorizzo fotografie, render e contenuti visivi tramite editing, correzione colore e ottimizzazione professionale.","Enhancing photos, renders and visual assets through advanced editing and post-production."],["⚙","Workflow Automation","Creo strumenti digitali che semplificano i processi, riducono le attivita ripetitive e migliorano l'efficienza dei team.","Developing digital solutions that simplify workflows and improve productivity."]];
const projects = [["real-estate","01","Real Estate Marketing","Dalla fase di lancio alla comunicazione continuativa, sviluppo strumenti e contenuti pensati per valorizzare iniziative immobiliari e supportare la vendita.","From project launch to ongoing communication, creating tools and content designed to support residential developments and sales activities."],["showroom","02","Showroom & Sales Spaces","Progettazione di dresswall, vetrofanie, pannelli e supporti visivi per showroom e uffici vendita, in collaborazione con marketing e ufficio tecnico.","Designing visual environments for sales offices and showrooms through dress walls, window graphics and branded communication systems."],["video-teaser","03","Video & Teaser","Video emozionali e contenuti promozionali pensati per raccontare il progetto e generare interesse prima e dopo il lancio.","Emotional videos and promotional content designed to generate awareness before and after launch."],["web","04","Web & Landing Pages","Esperienze digitali progettate per raccontare il valore del progetto e creare un punto di contatto efficace con il pubblico.","Digital experiences designed to showcase projects and create meaningful interactions with audiences."],["digital-tools","05","Digital Tools","Sviluppo di strumenti interni che migliorano i processi del team marketing e semplificano le attivita operative quotidiane.","Internal tools developed to streamline marketing workflows and improve day-to-day operations."]];

document.querySelector('.skills').innerHTML = skills.map(s => `<div class="skill"><div class="ico">${s[0]}</div><div><h3>${s[1]}</h3><p>${s[2]}</p><i>${s[3]}</i></div></div>`).join('');
document.querySelector('.project-grid').innerHTML = projects.map(p => `<article class="project" tabindex="0" data-id="${p[0]}"><div class="cover"><img src="assets/images/projects/${p[0]}/01-cover.jpg" alt="${p[2]}"><span class="num">${p[1]}</span></div><div class="copy"><h3>${p[2]}</h3><p>${p[3]}</p><i>${p[4]}</i><button>Scopri il progetto ↗</button></div></article>`).join('');

const io = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(element => io.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const dots = lightbox.querySelector('.dots');
let activeProject = '';
let activeIndex = 0;
function files(id) { return ['01-cover.jpg','02-gallery.jpg','03-gallery.jpg','04-gallery.jpg','05-gallery.jpg'].map((file,index) => [`assets/images/projects/${id}/${file}`, index === 0 ? 'Copertina' : `Immagine ${index}`]); }
function renderLightbox() { const gallery = files(activeProject); lightboxImage.src = gallery[activeIndex][0]; lightboxCaption.textContent = `${projects.find(project => project[0] === activeProject)[2]} · ${gallery[activeIndex][1]}`; dots.innerHTML = gallery.map((_,index) => `<i class="${index === activeIndex ? 'on' : ''}"></i>`).join(''); }
function openLightbox(id) { activeProject = id; activeIndex = 0; renderLightbox(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
function moveLightbox(direction) { activeIndex = (activeIndex + direction + 5) % 5; renderLightbox(); }
document.querySelectorAll('.project').forEach(card => { card.onclick = () => openLightbox(card.dataset.id); card.onkeydown = event => { if (event.key === 'Enter') openLightbox(card.dataset.id); }; });
lightbox.querySelector('.close').onclick = closeLightbox;
lightbox.querySelector('.prev').onclick = () => moveLightbox(-1);
lightbox.querySelector('.next').onclick = () => moveLightbox(1);
document.onkeydown = event => { if (!lightbox.classList.contains('open')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') moveLightbox(-1); if (event.key === 'ArrowRight') moveLightbox(1); };

// HERO UPDATE 01
const icons = {
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3l3 5-2 2c1.6 3.1 3 4.5 6 6l2-2 5 3-1 4c-9 1-17-7-17-17z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9 8c.4 3 2 4.6 5 5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5v.1M9 19v-6c0-5 7-5 7 0v6M9 9v10"/></svg>'
};

// More breathing room between the two hero lines.
const heroTitle = document.querySelector('.hero h1');
heroTitle.innerHTML = '<span class="hero-line">Hey,</span><span class="hero-line">hello there<span class="hero-dot">.</span></span>';

// Replace text contacts with four square icon buttons.
const contacts = document.querySelector('.contacts');
contacts.innerHTML = `
  <a class="contact-icon-box email" href="mailto:dolor.billyjoel@yahoo.com" aria-label="Invia una e-mail" title="E-mail">${icons.email}</a>
  <a class="contact-icon-box phone" href="tel:+393271350193" aria-label="Chiama +39 327 135 0193" title="Telefono">${icons.phone}</a>
  <a class="contact-icon-box whatsapp" href="https://wa.me/393271350193" target="_blank" rel="noopener noreferrer" aria-label="Apri WhatsApp" title="WhatsApp">${icons.whatsapp}</a>
  <a class="contact-icon-box linkedin" href="https://www.linkedin.com/in/bilouts/" target="_blank" rel="noopener noreferrer" aria-label="Apri LinkedIn" title="LinkedIn">${icons.linkedin}</a>`;

// Remove BILS from the bar, center uppercase navigation, move CV to a fixed side label.
const nav = document.querySelector('.nav');
const brand = nav.querySelector('.brand');
if (brand) brand.remove();
const desktopNav = nav.querySelector('nav');
desktopNav.querySelectorAll('a').forEach(link => link.textContent = link.textContent.toUpperCase());
const cvButton = nav.querySelector('.cv');
cvButton.classList.add('floating-cv');
cvButton.innerHTML = '<span>SCARICA</span><strong>IL TUO CV</strong>';
document.body.appendChild(cvButton);

// Mobile menu remains available.
const menu = nav.querySelector('.menu');
menu.onclick = () => desktopNav.classList.toggle('show');
desktopNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => desktopNav.classList.remove('show')));

// Sequential loop: the active specialty fades in yellow, then settles back to muted.
const heroSkills = [...document.querySelectorAll('.tags b')];
heroSkills.forEach((item,index) => { item.style.setProperty('--i', index); item.classList.remove('hero-skill-active'); });
let activeSkill = -1;
function animateHeroSkills() {
  heroSkills.forEach(item => item.classList.remove('hero-skill-active'));
  activeSkill = (activeSkill + 1) % heroSkills.length;
  heroSkills[activeSkill].classList.add('hero-skill-active');
}
animateHeroSkills();
setInterval(animateHeroSkills, 1250);

// CSS overrides kept inside app.js so this update replaces only one GitHub file.
const updateStyles = document.createElement('style');
updateStyles.textContent = `
  .nav{justify-content:center;padding-inline:72px;background:rgba(11,18,32,.56)!important;-webkit-backdrop-filter:blur(20px) saturate(135%);backdrop-filter:blur(20px) saturate(135%);box-shadow:0 12px 40px rgba(0,0,0,.16)}
  .nav nav{margin:0 auto;justify-content:center;gap:clamp(24px,3.3vw,55px)}
  .nav nav a{font-size:.74rem;font-weight:700;letter-spacing:.11em;color:var(--muted);text-transform:uppercase}
  .nav nav a:hover{color:var(--yellow)}
  .hero h1{display:flex;flex-direction:column;gap:clamp(10px,1.2vw,19px);line-height:.75;margin-bottom:.36em}
  .hero-line{display:block;color:var(--text)}
  .hero-dot{color:var(--yellow)}
  .contacts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:14px}
  .contacts .contact-icon-box{aspect-ratio:1;min-height:0;padding:0;display:grid;place-items:center;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.045);transition:transform .25s ease,border-color .25s ease,background .25s ease}
  .contacts .contact-icon-box:hover{transform:translateY(-5px);border-color:var(--yellow);background:rgba(252,255,131,.08)}
  .contact-icon-box svg{width:27px;height:27px;fill:none;stroke:var(--text);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .contact-icon-box.whatsapp svg{stroke:#25d366}.contact-icon-box.linkedin svg{stroke:#0a66c2}.contact-icon-box.email:hover svg,.contact-icon-box.phone:hover svg{stroke:var(--yellow)}
  .floating-cv{position:fixed;z-index:88;right:0;bottom:clamp(78px,10vh,135px);width:142px;min-height:62px;padding:13px 21px;border-radius:16px 0 0 16px;background:var(--yellow)!important;color:var(--deep)!important;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;box-shadow:0 15px 45px rgba(0,0,0,.28);transition:width .25s ease,background .25s ease}
  .floating-cv:hover{width:154px;background:var(--olive)!important}
  .floating-cv span{font-size:.64rem;letter-spacing:.15em}.floating-cv strong{font-size:.82rem;line-height:1.05}
  .tags{min-height:22px;align-items:center;gap:8px 18px}
  .tags b{opacity:.28;color:var(--muted);transition:opacity .55s ease,color .55s ease,transform .55s ease;text-wrap:nowrap}
  .tags b.hero-skill-active{opacity:1;color:var(--yellow);transform:translateY(-2px);animation:heroSkillPulse 1.2s ease both}
  @keyframes heroSkillPulse{0%{opacity:0;filter:blur(5px);transform:translateY(7px)}35%{opacity:1;filter:blur(0);color:var(--yellow);transform:translateY(-2px)}100%{opacity:.8;color:var(--muted);transform:none}}
  @media(max-width:1000px){.nav{justify-content:flex-end;padding-inline:14px}.nav nav{position:absolute;top:69px;left:0;right:0;display:none!important;flex-direction:column;align-items:center;gap:0;padding:13px;border:1px solid var(--line);border-radius:15px;background:rgba(11,18,32,.9);backdrop-filter:blur(20px)}.nav nav.show{display:flex!important}.nav nav a{width:100%;padding:13px;text-align:center}.menu{display:block!important;margin-left:auto}.floating-cv{width:124px;min-height:56px}.floating-cv:hover{width:132px}}
  @media(max-width:680px){.hero h1{gap:8px;line-height:.78}.contacts{grid-template-columns:repeat(4,1fr)}.contacts .contact-icon-box{border-radius:13px}.contact-icon-box svg{width:23px;height:23px}.floating-cv{right:0;bottom:22px;width:112px;min-height:52px;padding:10px 16px}.floating-cv span{font-size:.56rem}.floating-cv strong{font-size:.72rem}.tags{display:flex!important;flex-direction:column;align-items:flex-start;gap:3px;min-height:78px}.tags b{position:absolute;opacity:0}.tags b.hero-skill-active{position:relative;opacity:1}}
  @media(prefers-reduced-motion:reduce){.tags b{transition:none}.tags b.hero-skill-active{animation:none}}
`;
document.head.appendChild(updateStyles);
