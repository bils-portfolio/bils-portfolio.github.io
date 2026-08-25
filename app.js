const skills = [
  ['✦','Creative Direction',"Definisco l'identita visiva e la direzione creativa dei progetti, mantenendo coerenza e riconoscibilita in ogni punto di contatto.",'Building visual identities and creative systems that give every project a recognizable voice.'],
  ['▷','Visual Storytelling','Trasformo idee e iniziative immobiliari in racconti visivi attraverso video, teaser e contenuti emozionali.','Turning projects into visual stories through emotional videos, teaser campaigns and branded content.'],
  ['▣','Digital Experiences','Progetto siti web e landing page capaci di informare, coinvolgere e supportare gli obiettivi commerciali.','Designing websites and landing pages that inform, engage and support business goals.'],
  ['▧','Visual Post-Production','Valorizzo fotografie, render e contenuti visivi tramite editing, correzione colore e ottimizzazione professionale.','Enhancing photos, renders and visual assets through advanced editing and post-production.'],
  ['⚙','Workflow Automation',"Creo strumenti digitali che semplificano i processi, riducono le attivita ripetitive e migliorano l'efficienza dei team.",'Developing digital solutions that simplify workflows and improve productivity.']
];
const projects = [
  ['real-estate','01','Real Estate Marketing','Dalla fase di lancio alla comunicazione continuativa, sviluppo strumenti e contenuti pensati per valorizzare iniziative immobiliari e supportare la vendita.','From project launch to ongoing communication, creating tools and content designed to support residential developments and sales activities.'],
  ['showroom','02','Showroom & Sales Spaces','Progettazione di dresswall, vetrofanie, pannelli e supporti visivi per showroom e uffici vendita, in collaborazione con marketing e ufficio tecnico.','Designing visual environments for sales offices and showrooms through dress walls, window graphics and branded communication systems.'],
  ['video-teaser','03','Video & Teaser','Video emozionali e contenuti promozionali pensati per raccontare il progetto e generare interesse prima e dopo il lancio.','Emotional videos and promotional content designed to generate awareness before and after launch.'],
  ['web','04','Web & Landing Pages','Esperienze digitali progettate per raccontare il valore del progetto e creare un punto di contatto efficace con il pubblico.','Digital experiences designed to showcase projects and create meaningful interactions with audiences.'],
  ['digital-tools','05','Digital Tools','Sviluppo di strumenti interni che migliorano i processi del team marketing e semplificano le attivita operative quotidiane.','Internal tools developed to streamline marketing workflows and improve day-to-day operations.']
];

document.querySelector('.skills').innerHTML = skills.map(s => `<div class="skill"><div class="ico">${s[0]}</div><div><h3>${s[1]}</h3><p>${s[2]}</p><i>${s[3]}</i></div></div>`).join('');

document.querySelector('.project-grid').innerHTML = projects.map(p => `
  <article class="project project-wow" tabindex="0" role="button" aria-label="Apri la galleria ${p[2]}" data-id="${p[0]}">
    <div class="project-topline"><span>${p[1]} / 05</span><i>SELECTED WORK</i></div>
    <div class="cover"><img src="assets/images/projects/${p[0]}/01-cover.jpg" alt="${p[2]}"><span class="project-view">APRI GALLERIA</span></div>
    <div class="copy"><h3>${p[2]}</h3><p>${p[3]}</p><i>${p[4]}</i><button type="button">APRI GALLERIA</button></div>
  </article>`).join('');

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('.lightbox');
const lbImage = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('figcaption');
const dots = lightbox.querySelector('.dots');
let activeProject = '', activeIndex = 0;
function galleryFiles(id) { return ['01-cover.jpg','02-gallery.jpg','03-gallery.jpg','04-gallery.jpg','05-gallery.jpg'].map((file,index) => [`assets/images/projects/${id}/${file}`, index === 0 ? 'Copertina' : `Immagine ${index}`]); }
function renderLightbox() { const gallery = galleryFiles(activeProject); lbImage.src = gallery[activeIndex][0]; lbCaption.textContent = `${projects.find(p => p[0] === activeProject)[2]} · ${gallery[activeIndex][1]}`; dots.innerHTML = gallery.map((_,index) => `<i class="${index === activeIndex ? 'on' : ''}"></i>`).join(''); }
function openLightbox(id) { activeProject=id; activeIndex=0; renderLightbox(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow=''; }
function moveLightbox(direction) { activeIndex=(activeIndex+direction+5)%5; renderLightbox(); }
document.querySelectorAll('.project').forEach(card => { card.onclick=()=>openLightbox(card.dataset.id); card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(card.dataset.id)}}; });
lightbox.querySelector('.close').onclick=closeLightbox;
lightbox.querySelector('.prev').onclick=()=>moveLightbox(-1);
lightbox.querySelector('.next').onclick=()=>moveLightbox(1);
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')moveLightbox(-1);if(e.key==='ArrowRight')moveLightbox(1)});

const icons = {
  email:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>',
  phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3l3 5-2 2c1.6 3.1 3 4.5 6 6l2-2 5 3-1 4c-9 1-17-7-17-17z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9 8c.4 3 2 4.6 5 5"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5v.1M9 19v-6c0-5 7-5 7 0v6M9 9v10"/></svg>',
  download:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>'
};

document.querySelector('.hero h1').innerHTML = '<span class="hero-line">Hey,</span><span class="hero-line">hello there<span class="hero-dot">.</span></span>';
document.querySelector('.contacts').innerHTML = `
<a class="contact-icon-box email" href="mailto:dolor.billyjoel@yahoo.com" aria-label="Invia una e-mail" title="E-mail">${icons.email}</a>
<a class="contact-icon-box phone" href="tel:+393271350193" aria-label="Chiama +39 327 135 0193" title="Telefono">${icons.phone}</a>
<a class="contact-icon-box whatsapp" href="https://wa.me/393271350193" target="_blank" rel="noopener noreferrer" aria-label="Apri WhatsApp" title="WhatsApp">${icons.whatsapp}</a>
<a class="contact-icon-box linkedin" href="https://www.linkedin.com/in/bilouts/" target="_blank" rel="noopener noreferrer" aria-label="Apri LinkedIn" title="LinkedIn">${icons.linkedin}</a>`;

const nav = document.querySelector('.nav');
const brand = nav.querySelector('.brand');
if (brand) brand.remove();
const navLinks = nav.querySelector('nav');
navLinks.querySelectorAll('a').forEach(link => link.textContent = link.textContent.toUpperCase());
const cvButton = nav.querySelector('.cv');
cvButton.classList.add('floating-cv');
cvButton.innerHTML = `<span class="download-icon">${icons.download}</span><span class="download-copy"><small>DOWNLOAD</small><strong>CV</strong></span>`;
document.body.appendChild(cvButton);
const menu = nav.querySelector('.menu');
menu.onclick = () => navLinks.classList.toggle('show');
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click',()=>navLinks.classList.remove('show')));

const heroSkills = [...document.querySelectorAll('.tags b')];
let activeSkill = -1;
function switchHeroSkill(){ heroSkills.forEach(item=>item.classList.remove('hero-skill-active')); activeSkill=(activeSkill+1)%heroSkills.length; heroSkills[activeSkill].classList.add('hero-skill-active'); }
switchHeroSkill(); setInterval(switchHeroSkill,1400);

const patchStyles=document.createElement('style');
patchStyles.textContent=`
.nav{justify-content:center!important;padding-inline:72px!important;background:rgba(11,18,32,.56)!important;-webkit-backdrop-filter:blur(20px) saturate(135%);backdrop-filter:blur(20px) saturate(135%);box-shadow:0 12px 40px rgba(0,0,0,.16)}.nav nav{margin:0 auto!important;justify-content:center!important;gap:clamp(24px,3.3vw,55px)!important}.nav nav a{font-size:.74rem!important;font-weight:700!important;letter-spacing:.11em!important;color:var(--muted)!important;text-transform:uppercase}.nav nav a:hover{color:var(--yellow)!important}
.hero h1{display:flex!important;flex-direction:column!important;gap:clamp(10px,1.2vw,19px)!important;line-height:.75!important;margin-bottom:.36em!important}.hero-line{display:block;color:var(--text)}.hero-dot{color:var(--yellow)}
.contacts{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;margin-top:14px!important}.contacts .contact-icon-box{grid-column:auto!important;width:100%!important;aspect-ratio:1/1!important;min-width:0!important;min-height:0!important;padding:0!important;display:grid!important;place-items:center!important;border:1px solid var(--line)!important;border-radius:16px!important;background:rgba(255,255,255,.045)!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}.contacts .contact-icon-box:hover{transform:translateY(-4px)!important;border-color:var(--yellow)!important;background:rgba(252,255,131,.08)!important}.contact-icon-box svg{width:27px;height:27px;fill:none;stroke:var(--text);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.contact-icon-box.whatsapp svg{stroke:#25d366}.contact-icon-box.linkedin svg{stroke:#0a66c2}.contact-icon-box.email:hover svg,.contact-icon-box.phone:hover svg{stroke:var(--yellow)}
.floating-cv{position:fixed!important;z-index:88!important;right:0!important;bottom:clamp(78px,10vh,135px)!important;width:148px!important;min-height:64px!important;padding:10px 18px 10px 12px!important;border-radius:18px 0 0 18px!important;background:var(--yellow)!important;color:var(--deep)!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:11px!important;box-shadow:0 15px 45px rgba(0,0,0,.28)!important;transition:width .2s ease,background .2s ease!important}.floating-cv:hover{width:158px!important;background:var(--olive)!important}.download-icon{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(11,18,32,.28);border-radius:50%}.download-icon svg{width:20px;height:20px;fill:none;stroke:var(--deep);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.download-copy{display:flex;flex-direction:column;align-items:flex-start}.download-copy small{font-size:.57rem;letter-spacing:.14em}.download-copy strong{font-size:1rem;line-height:1}
.tags{min-height:22px!important;align-items:center!important;gap:8px 18px!important}.tags b{opacity:1!important;color:var(--muted)!important;transition:none!important;transform:none!important;animation:none!important;white-space:nowrap}.tags b.hero-skill-active{color:var(--yellow)!important}
.work{position:relative!important;overflow:hidden!important;background:linear-gradient(145deg,rgba(26,38,59,.95),rgba(12,21,37,.98))!important}.work:before{content:"";position:absolute;right:-120px;top:-150px;width:360px;height:360px;border-radius:50%;background:rgba(252,255,131,.055);filter:blur(20px);pointer-events:none}.project-grid{position:relative;z-index:1;gap:16px!important;align-items:stretch}.project.project-wow{position:relative!important;display:flex!important;flex-direction:column!important;padding:10px!important;overflow:hidden!important;border:1px solid rgba(252,255,131,.35)!important;border-radius:22px!important;background:linear-gradient(180deg,#0a111e 0%,#111c30 100%)!important;box-shadow:0 18px 50px rgba(0,0,0,.22)!important;isolation:isolate;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease!important}.project.project-wow:before{content:"";position:absolute;inset:-1px;border-radius:22px;background:linear-gradient(135deg,rgba(252,255,131,.18),transparent 24%,transparent 74%,rgba(252,255,131,.08));z-index:-1;opacity:.55}.project.project-wow:hover{transform:translateY(-9px)!important;border-color:var(--yellow)!important;box-shadow:0 24px 70px rgba(0,0,0,.38),0 0 30px rgba(252,255,131,.08)!important}.project-topline{height:34px;display:flex;align-items:center;justify-content:space-between;padding:0 6px;color:var(--yellow);font-size:.62rem;font-weight:800;letter-spacing:.08em}.project-topline i{color:var(--muted);font-size:.5rem;font-style:normal;letter-spacing:.12em}.project.project-wow .cover{position:relative!important;height:290px!important;border-radius:15px!important;overflow:hidden!important;background:#060b13!important}.project.project-wow .cover img{width:100%!important;height:100%!important;object-fit:cover!important;transition:transform .45s ease,filter .45s ease!important}.project.project-wow:hover .cover img{transform:scale(1.045)!important;filter:saturate(1.08) contrast(1.03)}.project-view{position:absolute;inset:auto 12px 12px 12px;display:flex;align-items:center;justify-content:center;min-height:34px;padding:8px;border:1px solid rgba(252,255,131,.55);border-radius:10px;background:rgba(7,12,21,.72);backdrop-filter:blur(10px);color:var(--yellow);font-size:.58rem;font-weight:800;letter-spacing:.11em;opacity:0;transform:translateY(7px);transition:.25s ease}.project.project-wow:hover .project-view{opacity:1;transform:none}.project.project-wow .copy{display:flex!important;flex:1!important;flex-direction:column!important;padding:17px 8px 8px!important}.project.project-wow .copy h3{min-height:2.35em;margin:0 0 10px!important;font-size:1rem!important;line-height:1.15!important}.project.project-wow .copy p{font-size:.7rem!important;line-height:1.52!important}.project.project-wow .copy i{margin-top:10px!important;font-size:.65rem!important;line-height:1.5!important}.project.project-wow .copy button{margin-top:auto!important;padding-top:18px!important;color:var(--yellow)!important;font-size:.65rem!important;font-weight:800!important;letter-spacing:.09em!important;text-align:left!important}.project.project-wow .copy button:after{content:"";display:inline-block;width:28px;height:1px;margin-left:8px;vertical-align:middle;background:var(--yellow);transition:width .2s ease}.project.project-wow:hover .copy button:after{width:46px}
@media(max-width:1000px){.nav{justify-content:flex-end!important;padding-inline:14px!important}.nav nav{position:absolute!important;top:69px!important;left:0!important;right:0!important;display:none!important;flex-direction:column!important;align-items:center!important;gap:0!important;padding:13px!important;border:1px solid var(--line)!important;border-radius:15px!important;background:rgba(11,18,32,.9)!important;backdrop-filter:blur(20px)!important}.nav nav.show{display:flex!important}.nav nav a{width:100%!important;padding:13px!important;text-align:center!important}.menu{display:block!important;margin-left:auto!important}.project.project-wow .cover{height:360px!important}}
@media(max-width:680px){.hero h1{gap:8px!important;line-height:.78!important}.contacts{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}.contacts .contact-icon-box{grid-column:auto!important;border-radius:13px!important}.contact-icon-box svg{width:22px;height:22px}.floating-cv{right:0!important;bottom:22px!important;width:132px!important;min-height:56px!important}.tags{display:flex!important;min-height:22px!important;overflow-x:auto!important;flex-wrap:nowrap!important}.project-grid{padding:4px 1px 12px!important}.project.project-wow{flex:0 0 84%!important}.project.project-wow .cover{height:430px!important}.project-view{opacity:1!important;transform:none!important}}
`;
document.head.appendChild(patchStyles);
