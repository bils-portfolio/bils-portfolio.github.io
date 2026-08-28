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

/* BILS Experience Mobile Position Fix 29
   Mobile only. Desktop remains untouched. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Keep the approved title/date block exactly at the top. */
      .experience-story{
        height:330vh!important;
      }

      .exp16-stage{
        top:8px!important;
        height:calc(100vh - 16px)!important;
        min-height:555px!important;
        max-height:700px!important;
        grid-template-rows:auto 245px!important;
        align-content:start!important;
        padding:20px!important;
        padding-bottom:10px!important;
        overflow:hidden!important;
      }

      /* Move the complete circle/node scene downward, not the heading/date area. */
      .exp16-scene{
        position:relative!important;
        height:245px!important;
        min-height:245px!important;
        margin-top:38px!important;
        overflow:hidden!important;
      }

      .exp16-ring,
      .exp16-nodes{
        left:50%!important;
        top:88%!important;
      }

      .exp16-ring{
        width:420px!important;
        height:420px!important;
      }

      /* Keep the three animated nodes above the ring and fully visible. */
      .exp16-nodes{
        z-index:6!important;
      }

      .exp16-node{
        z-index:7!important;
      }

      /* Descriptions stay hidden on mobile. */
      .exp16-copy,
      .exp-right{
        display:none!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* BILS Experience Mobile Bottom Alignment Fix 30
   Mobile only. Desktop remains unchanged.
   This final override supersedes the v28/v29 Experience mobile values above. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Reduce the section from the bottom, keeping heading and dates untouched. */
      .experience-story{
        height:315vh!important;
      }

      .exp16-stage{
        top:8px!important;
        height:560px!important;
        min-height:560px!important;
        max-height:560px!important;
        grid-template-rows:auto 260px!important;
        align-content:start!important;
        padding:20px!important;
        padding-bottom:8px!important;
        overflow:hidden!important;
      }

      /* The complete orbit block starts lower, underneath the date divider. */
      .exp16-scene{
        position:relative!important;
        height:260px!important;
        min-height:260px!important;
        margin-top:44px!important;
        overflow:hidden!important;
      }

      /* JS uses a 255px mobile radius, so the visible ring must be 510px too.
         Ring and nodes now share exactly the same center and radius. */
      .exp16-ring,
      .exp16-nodes{
        left:50%!important;
        top:calc(100% + 110px)!important;
      }

      .exp16-ring{
        width:510px!important;
        height:510px!important;
      }

      /* Keep the active and neighbour circles above the ring stroke. */
      .exp16-ring{z-index:1!important}
      .exp16-nodes{z-index:4!important}
      .exp16-node{z-index:5!important}

      .exp16-copy,
      .exp-right{
        display:none!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* BILS Experience Mobile Gap Fix 31
   Mobile only. Desktop remains unchanged.
   Removes the long empty scroll tail after the last experience. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Shorter scroll runway: all five steps remain, but the next section
         reaches the Experience card immediately after the final step. */
      .experience-story{
        height:225vh!important;
        margin-bottom:0!important;
      }

      .post-experience{
        margin-top:10px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* BILS Experience Mobile Flow Fix 33
   Mobile only. Desktop remains unchanged.
   Removes overlap and keeps the following section naturally attached. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Keep enough runway for the five experience states. */
      .experience-story{
        height:300vh!important;
        margin-bottom:0!important;
        padding-bottom:0!important;
      }

      /* The sticky card fills the mobile viewport, so no page background
         appears beneath it while the Experience sequence is running. */
      .exp16-stage{
        top:8px!important;
        height:calc(100svh - 16px)!important;
        min-height:560px!important;
        max-height:none!important;
        grid-template-rows:auto 260px!important;
        align-content:start!important;
        padding:20px!important;
        padding-bottom:12px!important;
        overflow:hidden!important;
      }

      /* Keep the already-approved date and orbit layout. */
      .exp16-scene{
        position:relative!important;
        height:260px!important;
        min-height:260px!important;
        margin-top:44px!important;
        overflow:hidden!important;
      }

      .exp16-ring,
      .exp16-nodes{
        left:50%!important;
        top:calc(100% + 110px)!important;
      }

      .exp16-ring{
        width:510px!important;
        height:510px!important;
        z-index:1!important;
      }

      .exp16-nodes{z-index:4!important}
      .exp16-node{z-index:5!important}
      .exp16-copy,.exp-right{display:none!important}

      /* Critical fix: the next section returns to normal document flow.
         No negative margin, no overlap, no absolute pull-up. */
      .post-experience{
        position:static!important;
        z-index:auto!important;
        transform:none!important;
        margin-top:10px!important;
        margin-bottom:0!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* BILS Experience Mobile Natural Flow Fix 36
   Mobile only. Desktop remains unchanged.
   Experience and Tools stay as two separate adjacent cards with no overlap. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Keep the five-step scroll sequence, then release the sticky card
         naturally before the Tools section begins. */
      .experience-story{
        position:relative!important;
        height:250vh!important;
        margin-bottom:0!important;
        padding-bottom:0!important;
        overflow:visible!important;
      }

      /* Compact Experience card based on the approved reference. */
      .exp16-stage{
        position:sticky!important;
        top:8px!important;
        height:520px!important;
        min-height:520px!important;
        max-height:520px!important;
        display:grid!important;
        grid-template-columns:1fr!important;
        grid-template-rows:auto 205px auto auto!important;
        align-content:start!important;
        padding:18px!important;
        padding-bottom:12px!important;
        overflow:hidden!important;
      }

      .exp16-left{
        display:contents!important;
      }

      .exp16-left h2{
        grid-column:1!important;
        grid-row:1!important;
        margin:0!important;
        font-size:clamp(1.72rem,7.8vw,2.05rem)!important;
        line-height:1.01!important;
      }

      .exp16-left > p{
        grid-column:1!important;
        grid-row:1!important;
        align-self:end!important;
        margin:108px 0 0!important;
        font-size:.7rem!important;
        line-height:1.28!important;
      }

      .exp16-scene{
        grid-column:1!important;
        grid-row:2!important;
        position:relative!important;
        height:205px!important;
        min-height:205px!important;
        margin-top:12px!important;
        overflow:hidden!important;
      }

      .exp16-ring,
      .exp16-nodes{
        left:50%!important;
        top:calc(100% + 105px)!important;
      }

      .exp16-ring{
        width:510px!important;
        height:510px!important;
        z-index:1!important;
      }

      .exp16-nodes{z-index:4!important}
      .exp16-node{z-index:5!important}

      .exp16-dates{
        grid-column:1!important;
        grid-row:3!important;
        width:100%!important;
        margin-top:12px!important;
      }

      .exp16-date-box{
        height:42px!important;
      }

      .exp16-progress{
        grid-column:1!important;
        grid-row:4!important;
        width:100%!important;
        margin-top:8px!important;
      }

      .exp16-copy,
      .exp-right{
        display:none!important;
      }

      /* Tools always remains in normal document flow.
         No transform, negative margin or pull-up at any scroll position. */
      .post-experience{
        position:relative!important;
        z-index:auto!important;
        transform:none!important;
        translate:none!important;
        margin-top:10px!important;
        margin-bottom:0!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* BILS Experience Mobile Final Compact Flow 37
   Mobile only. Desktop remains unchanged.
   Experience and Tools are separate cards in natural flow, never overlapping. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    @media(max-width:760px){
      /* Parent supplies the five-step scroll runway. When the sticky sequence
         ends, the Experience card exits naturally and Tools follows below. */
      .experience-story{
        position:relative!important;
        height:245vh!important;
        margin:0 auto!important;
        padding:0!important;
        overflow:visible!important;
      }

      .exp16-stage{
        position:sticky!important;
        top:8px!important;
        height:520px!important;
        min-height:520px!important;
        max-height:520px!important;
        display:grid!important;
        grid-template-columns:1fr!important;
        grid-template-rows:auto 205px auto auto!important;
        align-content:start!important;
        padding:18px!important;
        padding-bottom:12px!important;
        overflow:hidden!important;
        transform:none!important;
      }

      .exp16-left{display:contents!important}

      .exp16-left h2{
        grid-column:1!important;
        grid-row:1!important;
        margin:0!important;
        font-size:clamp(1.72rem,7.8vw,2.05rem)!important;
        line-height:1.01!important;
      }

      .exp16-left > p{
        grid-column:1!important;
        grid-row:1!important;
        align-self:end!important;
        margin:108px 0 0!important;
        font-size:.7rem!important;
        line-height:1.28!important;
      }

      .exp16-scene{
        grid-column:1!important;
        grid-row:2!important;
        position:relative!important;
        height:205px!important;
        min-height:205px!important;
        margin-top:12px!important;
        overflow:hidden!important;
      }

      .exp16-ring,.exp16-nodes{
        left:50%!important;
        top:calc(100% + 105px)!important;
      }

      .exp16-ring{
        width:510px!important;
        height:510px!important;
        z-index:1!important;
      }

      .exp16-nodes{z-index:4!important}
      .exp16-node{z-index:5!important}

      .exp16-dates{
        grid-column:1!important;
        grid-row:3!important;
        width:100%!important;
        margin-top:12px!important;
      }

      .exp16-date-box{height:42px!important}

      .exp16-progress{
        grid-column:1!important;
        grid-row:4!important;
        width:100%!important;
        margin-top:8px!important;
      }

      .exp16-copy,.exp-right{display:none!important}

      /* Tools is always below Experience in ordinary document flow. */
      .post-experience{
        position:relative!important;
        inset:auto!important;
        z-index:auto!important;
        transform:none!important;
        translate:none!important;
        margin:10px auto 0!important;
        padding:0!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
