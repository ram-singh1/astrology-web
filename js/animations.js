(() => {
  "use strict";
  const { $, $$, prefersReducedMotion, onReady, rafThrottle } = window.AV;
  const reduce = prefersReducedMotion();

  onReady(() => {
    const masthead = $("[data-masthead]");
    if (masthead) {
      const dock = rafThrottle(() =>
        masthead.classList.toggle("is-docked", window.scrollY > 32)
      );
      dock();
      window.addEventListener("scroll", dock, { passive: true });
    }

    const reveals = $$(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const format = (val, node) => {
      const f = node.dataset.format;
      if (f === "k") return val >= 1000 ? Math.round(val / 100) / 10 + "k" : String(val);
      if (f === "decimal") return (val / 1000).toFixed(1);   // 4900 -> "4.9"
      return String(val);
    };
    const countUp = (node) => {
      const target = parseFloat(node.dataset.count);
      const suffix = node.dataset.suffix || "";
      if (reduce) { node.textContent = format(target, node) + suffix; return; }
      const dur = 1400;
      let started = null;
      const step = (ts) => {
        if (started === null) started = ts;
        const p = Math.min((ts - started) / dur, 1);
        node.textContent = format(Math.round(target * easeOut(p)), node) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else node.textContent = format(target, node) + suffix;
      };
      requestAnimationFrame(step);
    };
    const counters = $$("[data-count]");
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries, obs) => entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countUp(e.target);
          obs.unobserve(e.target);
        }),
        { threshold: 0.6 }
      );
      counters.forEach((c) => cio.observe(c));
    } else {
      counters.forEach(countUp);
    }

    const layer = $("[data-parallax]");
    if (layer && !reduce && window.matchMedia("(pointer: fine)").matches) {
      const move = rafThrottle(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) layer.style.setProperty("--parallax", `${y * 0.08}px`);
      });
      window.addEventListener("scroll", move, { passive: true });
    }
  });
})();
