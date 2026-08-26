/* BILS Mobile Layout Fix Update 28
   Loaded after typography-patch.js.
   Desktop is unchanged except the Download CV label is detached slightly from the right edge.
*/
(() => {
  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Both desktop and mobile: detach the floating label slightly from the viewport edge.
  q('.floating-cv')?.classList.add('floating-label-spacing-v28');

  const mobileQuery = matchMedia('(max-width:760px)');

  function applyMobileBehavior() {
    if (!mobileQuery.matches) return;

    // Mobile projects: preserve title, square cover, Italian and English copy.
    // Remove only the plus button and all lightbox interaction.
    qa('#work .project').forEach(card => {
      card.classList.add('project-mobile-static-v28');
      card.removeAttribute('tabindex');
      card.removeAttribute('role');
      card.setAttribute('aria-disabled', 'true');
    });
  }

  // Capture the event before app.js card handlers, but only on mobile.
  document.addEventListener('click', event => {
    if (!mobileQuery.matches) return;
    const card = event.target.closest('#work .project');
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);

  document.addEventListener('keydown', event => {
    if (!mobileQuery.matches) return;
    if (event.target.closest('#work .project')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  applyMobileBehavior();

  const style = document.createElement('style');
  style.textContent = `
    /* Keep the tab detached from the right edge on every viewport. */
    .floating-label-spacing-v28{
      right:12px!important;
    }

    @media(max-width:760px){
      /* HERO: optical centering inside the mobile card. */
      .hero{
        box-sizing:border-box!important;
        width:calc(100% - 20px)!important;
        margin-left:auto!important;
        margin-right:auto!important;
        padding-left:18px!important;
        padding-right:18px!important;
        align-items:center!important;
        text-align:center!important;
      }
      .hero-copy{
        width:100%!important;
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
      }
      .hero h1{
        width:100%!important;
        margin-left:auto!important;
        margin-right:auto!important;
        text-align:center!important;
        transform:none!important;
      }
      .hero h1 .hero-line{
        width:100%!important;
        text-align:center!important;
      }
      .hero h1 .hero-there{
        display:block!important;
        width:100%!important;
        padding-right:0!important;
        white-space:nowrap!important;
      }
      .hero h1 .hero-dot{
        display:inline!important;
        position:static!important;
      }

      /* FEATURED WORK: compact mobile cards with a square asset area. */
      #work .project-grid{
        align-items:stretch!important;
      }
      #work .project-mobile-static-v28{
        flex:0 0 82%!important;
        min-height:0!important;
        cursor:default!important;
        transform:none!important;
        padding:12px!important;
      }
      #work .project-mobile-static-v28:hover{
        transform:none!important;
        border-color:rgba(252,255,131,.35)!important;
      }
      #work .project-mobile-static-v28 .project-title-top{
        display:block!important;
        min-height:2.2em!important;
        margin:3px 4px 12px!important;
        font-size:1.32rem!important;
        line-height:1.08!important;
      }
      #work .project-mobile-static-v28 .cover{
        width:100%!important;
        height:auto!important;
        aspect-ratio:1 / 1!important;
        border-radius:14px!important;
      }
      #work .project-mobile-static-v28 .cover img{
        width:100%!important;
        height:100%!important;
        object-fit:cover!important;
      }
      #work .project-mobile-static-v28 .copy{
        display:block!important;
        padding:16px 7px 12px!important;
      }
      #work .project-mobile-static-v28 .copy p{
        font-size:.82rem!important;
        line-height:1.48!important;
      }
      #work .project-mobile-static-v28 .copy i{
        display:block!important;
        margin-top:9px!important;
        font-size:.71rem!important;
        line-height:1.46!important;
      }
      #work .project-mobile-static-v28 .gallery-plus,
      #work .project-mobile-static-v28 .copy button{
        display:none!important;
      }

      /* EXPERIENCE: descriptions remain hidden, but dates and the horizontal orbit stay visible. */
      .experience-story{
        height:360vh!important;
      }
      .exp16-stage{
        top:8px!important;
        height:calc(100vh - 16px)!important;
        min-height:590px!important;
        padding:20px!important;
        align-content:start!important;
        grid-template-rows:auto 300px!important;
        overflow:hidden!important;
      }
      .exp16-left h2{
        font-size:clamp(1.75rem,8vw,2.15rem)!important;
        line-height:1.02!important;
      }
      .exp16-left > p{
        margin:7px 0 10px!important;
      }
      .exp16-scene{
        height:300px!important;
        min-height:300px!important;
        margin-top:0!important;
        overflow:hidden!important;
      }
      .exp16-ring,
      .exp16-nodes{
        left:50%!important;
        top:76%!important;
      }
      .exp16-ring{
        width:430px!important;
        height:430px!important;
      }
      .exp16-copy,
      .exp-right{
        display:none!important;
      }

      /* FORM: slightly stronger closing title on mobile. */
      .contact-heading h2{
        font-size:clamp(2.75rem,12vw,3.35rem)!important;
        line-height:.94!important;
      }

      /* Compact circular download label, still detached from the edge. */
      .floating-label-spacing-v28{
        right:10px!important;
      }
    }
  `;

  document.head.appendChild(style);
})();
