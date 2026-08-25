const skills = [
  ['Creative Direction', "Definisco l'identità visiva e la direzione creativa dei progetti, mantenendo coerenza e riconoscibilità in ogni punto di contatto.", 'Building visual identities and creative systems that give every project a recognizable voice.'],
  ['Visual Storytelling', 'Trasformo idee e iniziative immobiliari in racconti visivi attraverso video, teaser e contenuti emozionali.', 'Turning projects into visual stories through emotional videos, teaser campaigns and branded content.'],
  ['Digital Experiences', 'Progetto siti web e landing page capaci di informare, coinvolgere e supportare gli obiettivi commerciali.', 'Designing websites and landing pages that inform, engage and support business goals.'],
  ['Visual Post-Production', 'Valorizzo fotografie, render e contenuti visivi tramite editing, correzione colore e ottimizzazione professionale.', 'Enhancing photos, renders and visual assets through advanced editing and post-production.'],
  ['Workflow Automation', "Creo strumenti digitali che semplificano i processi, riducono le attività ripetitive e migliorano l'efficienza dei team.", 'Developing digital solutions that simplify workflows and improve productivity.']
];

const projects = [
  ['real-estate','Real Estate Marketing','Dalla fase di lancio alla comunicazione continuativa, sviluppo strumenti e contenuti pensati per valorizzare iniziative immobiliari e supportare la vendita.','From project launch to ongoing communication, creating tools and content designed to support residential developments and sales activities.'],
  ['showroom','Showroom & Sales Spaces','Progettazione di dresswall, vetrofanie, pannelli e supporti visivi per showroom e uffici vendita, in collaborazione con marketing e ufficio tecnico.','Designing visual environments for sales offices and showrooms through dress walls, window graphics and branded communication systems.'],
  ['video-teaser','Video & Teaser','Video emozionali e contenuti promozionali pensati per raccontare il progetto e generare interesse prima e dopo il lancio.','Emotional videos and promotional content designed to generate awareness before and after launch.'],
  ['web','Web & Landing Pages','Esperienze digitali progettate per raccontare il valore del progetto e creare un punto di contatto efficace con il pubblico.','Digital experiences designed to showcase projects and create meaningful interactions with audiences.'],
  ['digital-tools','Digital Tools','Sviluppo di strumenti interni che migliorano i processi del team marketing e semplificano le attività operative quotidiane.','Internal tools developed to streamline marketing workflows and improve day-to-day operations.']
];

const icons = {
  email: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M7 3l3 5-2 2c1.6 3.1 3 4.5 6 6l2-2 5 3-1 4c-9 1-17-7-17-17z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9 8c.4 3 2 4.6 5 5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M5 9v10M5 5v.1M9 19v-6c0-5 7-5 7 0v6M9 9v10"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>'
};

// HERO
const heroTitle = document.querySelector('.hero h1');
heroTitle.innerHTML = '<span class="hero-line">Hey,</span><span class="hero-line">hello there<span class="hero-dot">.</span></span>';
document.querySelector('.contacts').innerHTML = `
  <a class="contact-icon-box" href="mailto:dolor.billyjoel@yahoo.com" aria-label="E-mail">${icons.email}</a>
  <a class="contact-icon-box" href="tel:+393271350193" aria-label="Telefono">${icons.phone}</a>
  <a class="contact-icon-box whatsapp" href="https://wa.me/393271350193" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">${icons.whatsapp}</a>
  <a class="contact-icon-box linkedin" href="https://www.linkedin.com/in/bilouts/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>`;

// NAVIGATION
const nav = document.querySelector('.nav');
const brand = nav.querySelector('.brand');
if (brand) brand.remove();
const navLinks = nav.querySelector('nav');
navLinks.querySelectorAll('a').forEach(link => link.textContent = link.textContent.toUpperCase());
const cv = nav.querySelector('.cv');
cv.classList.add('floating-cv');
cv.innerHTML = `<span class="download-icon">${icons.download}</span><span class="download-copy"><small>DOWNLOAD</small><strong>CV</strong></span>`;
document.body.appendChild(cv);
const menu = nav.querySelector('.menu');
menu.onclick = () => navLinks.classList.toggle('show');
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('show')));

// Hero specialties: clean hard switch only.
const heroSkills = [...document.querySelectorAll('.tags b')];
let activeHeroSkill = -1;
function switchHeroSkill() {
  heroSkills.forEach(item => item.classList.remove('hero-skill-active'));
  activeHeroSkill = (activeHeroSkill + 1) % heroSkills.length;
  heroSkills[activeHeroSkill].classList.add('hero-skill-active');
}
switchHeroSkill();
setInterval(switchHeroSkill, 1400);

// 01 + 02 COMBINED SECTION
const split = document.querySelector('.split');
split.innerHTML = `
<section class="about-orbit reveal" id="about">
  <div class="about-intro">
    <h2>Trasformo idee, progetti e spazi<br>in <em>esperienze che lasciano il segno.</em></h2>
    <p class="about-en">I transform ideas, projects and spaces into <em>experiences that leave a mark.</em></p>
    <p class="about-summary">Da oltre dieci anni unisco creatività, tecnologia e comunicazione per costruire identità visive, contenuti ed esperienze digitali capaci di coinvolgere e generare valore.</p>
    <i>For more than ten years, I have combined creativity, technology and communication to build visual identities, content and digital experiences that engage and create value.</i>
  </div>
  <div class="orbit-wrap" id="what">
    <div class="orbit-glow"></div>
    <div class="orbit-circle orbit-outer"></div>
    <div class="orbit-circle orbit-middle"></div>
    <div class="orbit-circle orbit-inner"></div>
    <div class="orbit-center"><small>THE 5 PILLARS OF</small><strong>MY CREATIVE<br>APPROACH</strong><i>Seleziona un punto</i></div>
    <div class="orbit-points"></div>
    <aside class="orbit-detail detail-right" aria-live="polite"></aside>
  </div>
</section>`;

const orbitPoints = document.querySelector('.orbit-points');
orbitPoints.innerHTML = skills.map((skill, index) => `
  <button class="orbit-point ${index === 0 ? 'active' : ''}" type="button" data-skill="${index}" aria-label="Mostra ${skill[0]}">
    <i></i><strong>${skill[0]}</strong>
  </button>`).join('');
const pointElements = [...document.querySelectorAll('.orbit-point')];
const orbitDetail = document.querySelector('.orbit-detail');
let selectedSkill = 0;

function selectSkill(index) {
  selectedSkill = index;
  pointElements.forEach((button, i) => button.classList.toggle('active', i === index));
  const side = index <= 2 ? 'right' : 'left';
  orbitDetail.classList.remove('detail-left', 'detail-right', 'detail-enter-left', 'detail-enter-right');
  orbitDetail.classList.add(`detail-${side}`);
  const skill = skills[index];
  orbitDetail.innerHTML = `<h3>${skill[0]}</h3><p>${skill[1]}</p><i>${skill[2]}</i>`;
  requestAnimationFrame(() => orbitDetail.classList.add(side === 'right' ? 'detail-enter-right' : 'detail-enter-left'));
}
pointElements.forEach(button => button.addEventListener('click', () => selectSkill(Number(button.dataset.skill))));
selectSkill(0);

// Planet-like continuous orbit, labels remain upright.
let orbitAngle = -90;
let lastFrame = performance.now();
let userPauseUntil = 0;
function positionPlanets(time) {
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  if (!mobile && time > userPauseUntil) {
    const delta = Math.min(time - lastFrame, 50);
    orbitAngle += delta * 0.0035;
  }
  lastFrame = time;
  const radius = mobile ? 216 : 270;
  pointElements.forEach((point, index) => {
    const angle = (orbitAngle + index * 72) * Math.PI / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    point.style.left = `calc(50% + ${x}px)`;
    point.style.top = `calc(50% + ${y}px)`;
  });
  requestAnimationFrame(positionPlanets);
}
orbitPoints.addEventListener('pointerdown', () => { userPauseUntil = performance.now() + 5000; });
requestAnimationFrame(positionPlanets);

// FEATURED WORK
const workSection = document.querySelector('.work');
const workHeader = workSection.querySelector('header');
workHeader.outerHTML = `<div class="emotional-heading"><h2>Progetti che trasformano idee<br>in <em>esperienze da ricordare.</em></h2><p>Projects that turn ideas into <em>experiences worth remembering.</em></p></div>`;
const workIntro = workSection.querySelector('.intro');
if (workIntro) workIntro.remove();
document.querySelector('.project-grid').innerHTML = projects.map(project => `
<article class="project project-wow" tabindex="0" role="button" aria-label="Apri la galleria ${project[1]}" data-id="${project[0]}">
  <h3 class="project-title-top">${project[1]}</h3>
  <div class="cover"><img src="assets/images/projects/${project[0]}/01-cover.jpg" alt="${project[1]}"></div>
  <div class="copy"><p>${project[2]}</p><i>${project[3]}</i><span class="gallery-plus" aria-hidden="true">+</span></div>
</article>`).join('');

// EMOTIONAL HEADINGS FOR 04, 05, 06
const lowerPanels = [...document.querySelectorAll('.triple .panel')];
const headings = [
  ['Un percorso costruito tra creatività, editoria e digitale.', 'A journey shaped by creativity, publishing and digital innovation.'],
  ['Gli strumenti cambiano. Il valore nasce da come li utilizzi.', 'Tools evolve. Value comes from how you use them.'],
  ['Ogni progetto parte da un bisogno e diventa una soluzione.', 'Every project starts with a need and becomes a solution.']
];
lowerPanels.forEach((panel, index) => {
  const header = panel.querySelector('header');
  if (!header) return;
  header.outerHTML = `<div class="lower-emotional-heading"><h2>${headings[index][0]}</h2><p>${headings[index][1]}</p></div>`;
});

// LIGHTBOX
const lightbox = document.querySelector('.lightbox');
const lbImage = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('figcaption');
const dots = lightbox.querySelector('.dots');
let activeProject = '', activeIndex = 0;
function galleryFiles(id) { return ['01-cover.jpg','02-gallery.jpg','03-gallery.jpg','04-gallery.jpg','05-gallery.jpg'].map((file, index) => [`assets/images/projects/${id}/${file}`, index === 0 ? 'Copertina' : `Immagine ${index}`]); }
function renderLightbox() { const gallery = galleryFiles(activeProject); lbImage.src = gallery[activeIndex][0]; lbCaption.textContent = `${projects.find(project => project[0] === activeProject)[1]} · ${gallery[activeIndex][1]}`; dots.innerHTML = gallery.map((_, index) => `<i class="${index === activeIndex ? 'on' : ''}"></i>`).join(''); }
function openLightbox(id) { activeProject = id; activeIndex = 0; renderLightbox(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
function moveLightbox(direction) { activeIndex = (activeIndex + direction + 5) % 5; renderLightbox(); }
document.querySelectorAll('.project').forEach(card => { card.onclick = () => openLightbox(card.dataset.id); card.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(card.dataset.id); } }; });
lightbox.querySelector('.close').onclick = closeLightbox;
lightbox.querySelector('.prev').onclick = () => moveLightbox(-1);
lightbox.querySelector('.next').onclick = () => moveLightbox(1);
document.addEventListener('keydown', event => { if (!lightbox.classList.contains('open')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') moveLightbox(-1); if (event.key === 'ArrowRight') moveLightbox(1); });

// REVEAL
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

// CSS PATCH
const style = document.createElement('style');
style.textContent = `
.nav{justify-content:center!important;padding-inline:72px!important;background:rgba(11,18,32,.56)!important;backdrop-filter:blur(20px) saturate(135%)}.nav nav{margin:0 auto!important;gap:clamp(24px,3.3vw,55px)!important}.nav nav a{font-size:.74rem!important;font-weight:700!important;letter-spacing:.11em!important}
.hero h1{display:flex!important;flex-direction:column!important;gap:clamp(10px,1.2vw,19px)!important;line-height:.75!important}.hero-line,.hero-dot{display:block!important;color:var(--text)!important}.contacts{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}.contact-icon-box{grid-column:auto!important;aspect-ratio:1!important;display:grid!important;place-items:center!important;padding:0!important;border:1px solid var(--line)!important;border-radius:16px!important;background:rgba(255,255,255,.045)!important}.contact-icon-box svg{width:27px;height:27px;fill:none;stroke:var(--text);stroke-width:1.7}.contact-icon-box.whatsapp svg{stroke:#25d366}.contact-icon-box.linkedin svg{stroke:#0a66c2}
.floating-cv{position:fixed!important;z-index:88!important;right:0!important;bottom:clamp(78px,10vh,135px)!important;width:148px!important;min-height:64px!important;padding:10px 18px 10px 12px!important;border-radius:18px 0 0 18px!important;background:var(--yellow)!important;color:var(--deep)!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:11px!important}.download-icon{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(11,18,32,.28);border-radius:50%}.download-icon svg{width:20px;height:20px;fill:none;stroke:var(--deep);stroke-width:1.8}.download-copy{display:flex;flex-direction:column}.download-copy small{font-size:.57rem;letter-spacing:.14em}.tags b{color:var(--muted)!important;transition:none!important}.tags b.hero-skill-active{color:var(--yellow)!important}
.split{display:block!important;max-width:none!important}.about-orbit{position:relative;min-height:1080px;padding:88px 30px 25px;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:radial-gradient(circle at 50% 45%,rgba(252,255,131,.08),transparent 36%),linear-gradient(180deg,#080e19,#0b1220);box-shadow:0 24px 70px rgba(0,0,0,.24)}.about-intro{position:relative;z-index:5;max-width:930px;margin:0 auto;text-align:center}.about-intro h2{margin:0;font-size:clamp(2.2rem,4.4vw,4.2rem);line-height:1.03;letter-spacing:-.055em;font-weight:500}.about-intro h2 em{font-family:Georgia,serif;font-weight:400;color:var(--yellow)}.about-en{margin:12px 0 24px!important;color:var(--muted);font-size:clamp(1rem,1.5vw,1.35rem);font-style:italic}.about-en em{font-family:Georgia,serif;color:var(--yellow)}.about-summary{max-width:720px;margin:0 auto!important;font-size:1rem}.about-intro>i{display:block;max-width:720px;margin:8px auto;color:var(--muted);font-size:.86rem}.orbit-wrap{position:relative;width:760px;aspect-ratio:1;margin:-5px auto 0;border-radius:50%;background:#070d17;box-shadow:0 0 95px rgba(200,205,52,.24),0 0 0 1px rgba(252,255,131,.08)}.orbit-glow{position:absolute;inset:-35px;border-radius:50%;background:radial-gradient(circle,transparent 63%,rgba(200,205,52,.2) 69%,transparent 78%);filter:blur(15px)}.orbit-circle{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:1px dashed rgba(252,255,131,.22);border-radius:50%}.orbit-outer{width:72%;height:72%}.orbit-middle{width:52%;height:52%}.orbit-inner{width:31%;height:31%}.orbit-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:190px;text-align:center}.orbit-center small{color:var(--muted);font-size:.58rem;letter-spacing:.16em}.orbit-center strong{display:block;margin:7px 0;color:var(--yellow);font-size:1.05rem;line-height:1.2}.orbit-center i{color:var(--muted);font-size:.65rem}.orbit-point{position:absolute;width:150px;transform:translate(-50%,-50%);padding:0;border:0;background:none;color:var(--muted);cursor:pointer;text-align:center;z-index:4}.orbit-point i{display:block;width:22px;height:22px;margin:5px auto;border:2px solid var(--yellow);border-radius:50%;background:#070d17;transition:.2s}.orbit-point strong{display:block;font-size:.75rem;font-weight:500;text-decoration:underline;text-underline-offset:4px}.orbit-point:hover,.orbit-point.active{color:var(--yellow)}.orbit-point.active i{background:var(--yellow);box-shadow:0 0 25px rgba(252,255,131,.55);transform:scale(1.17)}.orbit-detail{position:absolute;z-index:6;top:44%;width:300px;padding:18px;border:1px solid rgba(252,255,131,.45);border-radius:14px;background:rgba(15,23,42,.9);backdrop-filter:blur(15px);box-shadow:0 18px 50px rgba(0,0,0,.3)}.orbit-detail.detail-right{right:-250px}.orbit-detail.detail-left{left:-250px}.orbit-detail h3{margin:0 0 8px;color:var(--yellow);font-size:1rem}.orbit-detail p{margin:0;font-size:.75rem}.orbit-detail i{display:block;margin-top:8px;color:var(--muted);font-size:.68rem}.detail-enter-right{animation:fromRight .32s ease}.detail-enter-left{animation:fromLeft .32s ease}@keyframes fromRight{from{opacity:0;transform:translateX(22px)}to{opacity:1;transform:none}}@keyframes fromLeft{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:none}}
.emotional-heading{text-align:center;margin:10px auto 38px;max-width:900px}.emotional-heading h2{margin:0;font-size:clamp(2rem,3.5vw,3.6rem);line-height:1.05;letter-spacing:-.05em;font-weight:500}.emotional-heading h2 em{font-family:Georgia,serif;color:var(--yellow);font-weight:400}.emotional-heading p{margin:10px 0 0;color:var(--muted);font-size:1rem;font-style:italic}.emotional-heading p em{font-family:Georgia,serif;color:var(--yellow)}
.lower-emotional-heading{margin-bottom:24px}.lower-emotional-heading h2{margin:0;font-size:clamp(1.25rem,1.8vw,1.75rem);line-height:1.08;letter-spacing:-.035em;color:var(--text)}.lower-emotional-heading p{margin:8px 0 0;color:var(--muted);font-size:.8rem;font-style:italic;line-height:1.35}
.project-grid{gap:16px!important}.project-wow{position:relative!important;display:flex!important;flex-direction:column!important;padding:12px!important;border:1px solid rgba(252,255,131,.35)!important;border-radius:22px!important;background:linear-gradient(180deg,#0a111e,#111c30)!important}.project-title-top{min-height:2.4em!important;margin:2px 4px 12px!important;color:var(--yellow)!important;font-size:.86rem!important}.project-wow .cover{height:300px!important;border-radius:15px!important;overflow:hidden!important}.project-wow .cover img{width:100%!important;height:100%!important;object-fit:cover!important;transition:.4s}.project-wow:hover .cover img{transform:scale(1.04)}.project-wow .copy{position:relative!important;display:flex!important;flex:1!important;flex-direction:column!important;padding:17px 8px 54px!important}.project-wow .copy p{font-size:.7rem!important}.project-wow .copy i{margin-top:10px!important;font-size:.65rem!important}.gallery-plus{position:absolute;right:4px;bottom:4px;width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:var(--yellow);color:var(--deep);font-size:1.45rem;transition:.2s}.project-wow:hover .gallery-plus{transform:rotate(90deg) scale(1.08);background:var(--olive)}
@media(max-width:1180px){.orbit-detail.detail-right{right:18px}.orbit-detail.detail-left{left:18px}.about-orbit{min-height:1040px}}
@media(max-width:760px){.nav{padding-inline:14px!important}.about-orbit{min-height:1050px;padding:58px 14px 20px}.about-intro h2 br{display:none}.orbit-wrap{width:620px;max-width:none;margin-left:50%;transform:translateX(-50%) scale(.78);transform-origin:top center}.orbit-point{width:135px}.orbit-detail,.orbit-detail.detail-right,.orbit-detail.detail-left{left:50%;right:auto;top:auto;bottom:-150px;width:min(88vw,400px);transform:translateX(-50%)}.detail-enter-right,.detail-enter-left{animation:fromBottom .32s ease}@keyframes fromBottom{from{opacity:0;transform:translate(-50%,24px)}to{opacity:1;transform:translate(-50%,0)}}.project-wow{flex:0 0 84%!important}.project-wow .cover{height:440px!important}.floating-cv{bottom:22px!important}}
@media(prefers-reduced-motion:reduce){.orbit-point{transition:none}.orbit-detail{animation:none!important}}
`;
document.head.appendChild(style);
