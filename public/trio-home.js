(() => {
  const root = document.querySelector(".home-campaigns");
  if (!root) return;
  const slides = [...root.querySelectorAll("[data-campaign-slide]")];
  const dots = [...root.querySelectorAll("[data-campaign-index]")];
  const status = root.querySelector("[data-campaign-status]");
  const names = ["Entrega gratuita", "Trio Presenteável"];
  let current = location.hash === "#trio-presenteavel" ? 1 : 0;
  function show(index, moveFocus = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === current)));
    status.textContent = `${names[current]} · ${current + 1} de ${slides.length}`;
    if (moveFocus) slides[current].focus({ preventScroll: true });
  }
  root.querySelectorAll("[data-campaign-next]").forEach(button => button.addEventListener("click", () => show(current + 1, Boolean(button.closest("[data-campaign-slide]")))));
  root.querySelector("[data-campaign-prev]").addEventListener("click", () => show(current - 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
  root.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : current + (event.key === "ArrowRight" ? 1 : -1);
    show(next, Boolean(event.target.closest("[data-campaign-slide]")));
  });
  window.addEventListener("hashchange", () => { if (location.hash === "#trio-presenteavel") show(1); });
  root.querySelector("[data-campaign-controls]").hidden = false;
  show(current);
})();
