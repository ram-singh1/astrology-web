window.AV = (() => {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onReady = (fn) => {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn, { once: true });
  };

  const rafThrottle = (fn) => {
    let ticking = false;
    return (...args) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { fn(...args); ticking = false; });
    };
  };

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  return { $, $$, prefersReducedMotion, onReady, rafThrottle, clamp };
})();
