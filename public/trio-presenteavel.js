(() => {
  const form = document.getElementById("trio-form");
  if (!form) return;
  const button = document.getElementById("trio-submit");
  const message = document.getElementById("trio-message");
  const phone = document.getElementById("trio-phone");
  const originalLabel = button.innerHTML;
  const sticky = document.querySelector(".mobile-cta");
  const params = new URLSearchParams(location.search);
  const attribution = {};
  for (const field of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    if (params.has(field)) attribution[field] = params.get(field).slice(0, 100);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => { if (sticky) sticky.hidden = entry.isIntersecting; }, { threshold: 0.08 }).observe(document.getElementById("lista"));
  }
  phone.addEventListener("input", () => phone.setCustomValidity(""));
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let digits = phone.value.replace(/\D/g, "");
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) digits = digits.slice(2);
    if (!/^[1-9]{2}\d{8,9}$/.test(digits) || /^(\d)\1+$/.test(digits)) {
      phone.setCustomValidity("Confira seu WhatsApp e inclua o DDD.");
    }
    if (!form.reportValidity()) return;
    button.disabled = true;
    button.textContent = "Registrando seu interesse…";
    message.dataset.state = "loading";
    message.textContent = "Só um instante.";
    const data = new FormData(form);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/trio-interest", {
        method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, signal: controller.signal,
        body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), company: data.get("company"),
          notifyConsent: data.get("notifyConsent") === "on", acceptPrivacy: data.get("acceptPrivacy") === "on", ...attribution }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Não foi possível concluir o cadastro. Tente novamente.");
      form.reset();
      message.dataset.state = "success";
      message.textContent = "Seu interesse foi registrado. Em 7 de novembro, você receberá pelo WhatsApp o link de compra antes da divulgação pública. O primeiro lote terá 20 kits. A inscrição não reserva uma unidade.";
      window.dispatchEvent(new CustomEvent("amevuri:trio-interest", { detail: { campaign: "trio-2026-11" } }));
    } catch (error) {
      message.dataset.state = "error";
      message.textContent = error.name === "AbortError" ? "A conexão demorou um pouco. Tente novamente; seu cadastro não será duplicado." : error.message || "Não foi possível concluir o cadastro. Tente novamente.";
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.innerHTML = originalLabel;
      message.focus({ preventScroll: true });
    }
  });
})();
