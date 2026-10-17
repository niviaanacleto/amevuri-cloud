(() => {
  let key = "", contacts = [];
  const login = document.getElementById("admin-login"), panel = document.getElementById("admin-panel"), message = document.getElementById("admin-message");
  async function load() {
    message.textContent = "Carregando a lista…";
    const response = await fetch("/api/admin-trio-interest", { headers: { "x-amevuri-setup-key": key } });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || "Não foi possível consultar a lista.");
    contacts = result.contacts;
    document.getElementById("admin-count").textContent = contacts.length;
    const container = document.getElementById("admin-contacts");
    container.replaceChildren();
    for (const contact of contacts) {
      const row = document.createElement("article"); row.className = "contact";
      const detail = document.createElement("div");
      const name = document.createElement("strong"); name.textContent = contact.name;
      const phone = document.createElement("a"); phone.href = `https://wa.me/${contact.phone}`; phone.textContent = contact.phone; phone.target = "_blank"; phone.rel = "noopener";
      const source = document.createElement("p"); source.textContent = `Origem: ${contact.attribution?.utm_source || "acesso direto"} · ${contact.attribution?.utm_campaign || "trio"}`;
      const date = document.createElement("p"); date.textContent = `Cadastro: ${new Date(contact.createdAt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`;
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "remove"; remove.textContent = "Remover da lista";
      remove.addEventListener("click", async () => {
        if (!confirm(`Remover ${contact.name} desta lista?`)) return;
        remove.disabled = true;
        try {
          const res = await fetch("/api/admin-trio-interest", { method: "DELETE", headers: { "x-amevuri-setup-key": key, "content-type": "application/json" }, body: JSON.stringify({ phone: contact.phone }) });
          const data = await res.json();
          if (!res.ok || !data.ok) throw new Error(data.error || "Não foi possível remover o contato.");
          await load();
          message.textContent = "Contato removido da lista.";
        } catch (error) { message.textContent = error.message; remove.disabled = false; }
      });
      detail.append(name, phone, source, date); row.append(detail, remove); container.append(row);
    }
    login.hidden = true; panel.hidden = false; message.textContent = contacts.length ? "Lista atualizada." : "A lista ainda não tem cadastros.";
  }
  login.addEventListener("submit", async (event) => {
    event.preventDefault(); key = document.getElementById("admin-key").value;
    document.getElementById("admin-key").value = "";
    try { await load(); } catch (error) { key = ""; message.textContent = error.message; }
  });
  document.getElementById("admin-refresh").addEventListener("click", () => load().catch(error => { message.textContent = error.message; }));
  document.getElementById("admin-logout").addEventListener("click", () => {
    key = ""; contacts = []; document.getElementById("admin-contacts").replaceChildren(); panel.hidden = true; login.hidden = false; message.textContent = "Sessão encerrada.";
  });
  document.getElementById("admin-export").addEventListener("click", () => {
    const rows = [["nome", "whatsapp", "origem", "campanha", "conteudo", "cadastro", "consentimento", "versao_consentimento"], ...contacts.map(c => [c.name, c.phone, c.attribution?.utm_source || "", c.attribution?.utm_campaign || "", c.attribution?.utm_content || "", c.createdAt, c.consentText, c.consentVersion])];
    // Spreadsheet apps must treat user-supplied cells as data, not formulas.
    const cell = value => { let s = String(value || ""); if (/^[=+@\-\t\r\n]/.test(s)) s = "'" + s; return '"' + s.replaceAll('"', '""') + '"'; };
    const csv = rows.map(row => row.map(cell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "amevuri-trio-interesse.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
