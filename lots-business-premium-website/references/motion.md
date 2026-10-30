# Motion

Motion is part of the brand's voice, so it comes from the concept like type and colour do. Decide what motion **means** for this business before you add any. "None" is often the right answer, and is always better than motion that says nothing.

## Decide the meaning

Write one sentence: "Motion here says ___." Examples of the reasoning (not a menu):

- A tea house: "take your time". One slow fade as things come into view; nothing that bounces or slides fast.
- A law firm: "orderly, nothing hidden". Section numbers settle into place; no parallax, no decoration.
- An emergency repair service: "help is fast". The fastest site is the message: no entrance motion on the first screen at all.
- A children's play centre: "lively and safe". Playful but soft: a gentle stagger on activity cards, rounded easing, never flashing.
- A fitness studio: "energy with control". Quick, crisp transitions on interaction (hover, menu), still content.

Then pick the **two or three moments** that move (an entrance, a reveal of a list, a number that matters, a state change on interaction) and leave everything else still.

## Craft

- **Duration:** 150 to 300 ms for interface feedback (hover, menu, button); 400 to 900 ms for entrances. Longer only when slowness is the message.
- **Easing:** ease-out for things arriving, ease-in for things leaving, never linear for movement. Pick one easing curve for the whole site and reuse it.
- **Distance:** small. A fade-up of 12 to 24 px reads as calm; 80 px reads as a slide show.
- **Move only `transform` and `opacity`.** Animating layout properties (width, top, margin) causes jank on phones.
- **Once.** Reveal-on-scroll runs once per element; never re-hide content when it leaves the screen.
- **No autoplaying carousels** for important content; if a slider exists, it has buttons, keyboard access, and autoplay off (`data-lb-interval="0"`) unless the concept truly needs it.
- **Counting numbers** only for real numbers the owner gave, and only one or two on a page.
- **Parallax** only on decorative layers, small speed, never on text.

## Respect the visitor

- **Reduced motion:** visitors who set "reduce motion" see everything in its final state, with no movement. The engine's presets do this for you. Your own script must check `matchMedia('(prefers-reduced-motion: reduce)')` and your CSS must put movement inside `@media (prefers-reduced-motion: no-preference)`.
- **No content hidden without script:** never write CSS that hides content (`opacity: 0`) unless it only applies when your script has run (a class your script adds to `<html>` or the section) and the motion is allowed. If the script fails, everything must be visible.
- **Nothing flashes** more than three times a second. No motion that moves the page under a reading eye (no scroll-jacking, no auto-scrolling).
- **Motion without script:** CSS scroll-driven animations (`animation-timeline: scroll()` or `view()`) inside `@supports (animation-timeline: scroll())` and `@media (prefers-reduced-motion: no-preference)` move things with the scroll and need no JavaScript; browsers without support simply show the still state.
- **Performance:** one small script for all motion; prefer the presets (`data-lb-animate`, see [technical-contract.md](technical-contract.md)) which load only on pages that use them. Use `IntersectionObserver`, never scroll listeners that run on every frame.

## Your own motion, safely

```js
// section js: `section` is this section's element
if (matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
  section.classList.add('m-ready');                      // CSS hides only under .m-ready
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('m-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px' });
  section.querySelectorAll('[data-m]').forEach((el) => io.observe(el));
}
```

```css
@media (prefers-reduced-motion: no-preference) {
  .m-ready [data-m] { opacity: 0; transform: translateY(16px); transition: opacity .6s var(--ease), transform .6s var(--ease); }
  .m-ready [data-m].m-in { opacity: 1; transform: none; }
}
```

## Check it

In the critique round, take `screenshot_site` with `full_page: true` (it scrolls the page first, so reveals have run) and look for anything still invisible. Ask yourself for each moving thing: what does this say, and would the site be worse without it? If the answer is "no", remove it.
