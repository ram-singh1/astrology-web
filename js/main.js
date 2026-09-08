(() => {
  "use strict";
  const { $, $$, onReady } = window.AV;

  onReady(() => {
    const panel = document.getElementById("primaryNav");
    if (panel && window.bootstrap) {
      $$(".masthead__nav a").forEach((a) =>
        a.addEventListener("click", () =>
          bootstrap.Offcanvas.getInstance(panel)?.hide()
        )
      );
    }

    const form = $("[data-book]");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const ok = $("[data-book-ok]", form);
        $$("input, button", form).forEach((el) => (el.disabled = true));
        if (ok) ok.hidden = false;
      });
    }

    const yr = $("[data-year]");
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
