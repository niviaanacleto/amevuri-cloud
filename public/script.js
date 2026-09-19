const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
let menuOverlay = document.querySelector(".menu-overlay");
if (!menuOverlay && menuBtn && nav) {
  menuOverlay = document.createElement("div");
  menuOverlay.className = "menu-overlay";
  menuOverlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(menuOverlay);
}
if (menuBtn && nav) {
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    if (menuOverlay) menuOverlay.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);
  };
  menuBtn.addEventListener("click", () =>
    setMenu(!nav.classList.contains("open")),
  );
  if (menuOverlay) menuOverlay.addEventListener("click", () => setMenu(false));
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });
}

// Product filtering
document.querySelectorAll(".filter").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".shop-card").forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      card.classList.toggle(
        "hidden",
        filter !== "all" && !tags.includes(filter),
      );
    });
  }),
);

// Curated selection / localStorage
const STORAGE_KEY = "amevuri-selection-v1";
const drawer = document.querySelector(".selection-drawer");
const itemsBox = document.querySelector("[data-selection-items]");
const emptyBox = document.querySelector("[data-selection-empty]");
const sendBtn = document.querySelector("[data-selection-send]");
const countEls = document.querySelectorAll("[data-selection-count]");
const safeSelectionText = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const selection = () => {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(items)
      ? items
          .filter(
            (i) =>
              i &&
              typeof i.product === "string" &&
              typeof i.format === "string",
          )
          .slice(0, 30)
      : [];
  } catch (e) {
    return [];
  }
};
const saveSelection = (items) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

function renderSelection() {
  if (!itemsBox) return;
  const items = selection();
  itemsBox.innerHTML = "";
  emptyBox.style.display = items.length ? "none" : "block";
  countEls.forEach((el) => (el.textContent = items.length));
  items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "selection-item";
    row.innerHTML = `<div><strong>${safeSelectionText(item.product)}</strong><br><span>${safeSelectionText(item.format)}</span></div><button type="button" aria-label="Remover ${safeSelectionText(item.product)}">Remover</button>`;
    row.querySelector("button").addEventListener("click", () => {
      const next = selection();
      next.splice(idx, 1);
      saveSelection(next);
      renderSelection();
    });
    itemsBox.appendChild(row);
  });
  if (sendBtn) {
    const lines = items.map((i) => `• ${i.product}, ${i.format}`).join("\n");
    const msg = items.length
      ? `Olá, vim pelo site da AMEVURI e gostaria de uma curadoria para esta seleção:\n${lines}\n\nMeu ambiente é: `
      : `Olá, vim pelo site da AMEVURI e gostaria de uma curadoria de fragrância.`;
    sendBtn.href = `https://wa.me/5521971133616?text=${encodeURIComponent(msg)}`;
  }
}
function openSelection() {
  if (drawer) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("selection-open");
    renderSelection();
  }
}
function closeSelection() {
  if (drawer) {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("selection-open");
  }
}
document
  .querySelectorAll("[data-selection-open]")
  .forEach((b) => b.addEventListener("click", openSelection));
document
  .querySelectorAll("[data-selection-close]")
  .forEach((b) => b.addEventListener("click", closeSelection));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSelection();
});
document.querySelectorAll(".add-selection").forEach((btn) =>
  btn.addEventListener("click", () => {
    let format = btn.dataset.format || "";
    if (btn.dataset.formatSource) {
      const checked = document.querySelector(
        `input[name="${btn.dataset.formatSource}"]:checked`,
      );
      format = checked ? checked.value : "";
    }
    const item = {
      product: btn.dataset.product,
      format: format || "Criação AMEVURI",
    };
    const items = selection();
    const exists = items.some(
      (i) => i.product === item.product && i.format === item.format,
    );
    if (!exists) {
      items.push(item);
      saveSelection(items);
    }
    openSelection();
  }),
);
renderSelection();

// v3.3 stability guard: content must remain visible even if IntersectionObserver is unavailable.
document
  .querySelectorAll(".reveal")
  .forEach((el) => el.classList.add("visible"));

// AMEVURI v4.1, voltar com contexto; mantém fallback seguro para acesso direto.
document.querySelectorAll("[data-smart-back]").forEach((link) => {
  link.addEventListener("click", (event) => {
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.origin === location.origin && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    } catch (_e) {}
  });
});

// AMEVURI v4.3, nunca exibe o ícone quebrado do navegador.
document.querySelectorAll("img").forEach((img) => {
  const markFailure = () => {
    img.classList.add("img-failed");
    const holder = img.closest("[data-image-fallback]");
    if (holder) holder.classList.add("image-missing");
  };
  if (img.complete && img.naturalWidth === 0) markFailure();
  else img.addEventListener("error", markFailure, { once: true });
});
