(() => {
  const SCENTS = [
    {id:"agulhas-pinho-menta",sprite:0,name:"Agulhas de Pinho & Menta",family:"Fougère amadeirado",groups:["frescos","amadeirados"],desc:"Fresco, verde e energizante. Uma atmosfera limpa e revigorante, com sensação de respiração aberta.",notes:"Agulhas de pinho · menta · limão · cedro"},
    {id:"artemisia-cedro",sprite:1,name:"Artemísia & Cedro",family:"Cítrico aromático",groups:["frescos","amadeirados"],desc:"Herbal, aromático e seco. Uma composição botânica serena, com elegância natural e fundo de madeira.",notes:"Artemísia · chá verde · lima · cedro"},
    {id:"bambu-jacinto",sprite:2,name:"Bambu Chinês & Jacinto",family:"Floral musk",groups:["frescos","florais"],desc:"Leve, verde e delicado. Um floral arejado, limpo e acolhedor, com transparência contemporânea.",notes:"Bambu verde · jacinto · jasmim · musk"},
    {id:"baunilha-lavanda",sprite:3,name:"Baunilha & Lavanda",family:"Oriental amadeirado",groups:["florais","envolventes"],desc:"Cremoso e reconfortante. A serenidade da lavanda encontra a maciez da baunilha em uma leitura sofisticada.",notes:"Lavanda · baunilha · sândalo · fava tonka"},
    {id:"baunilha-cha-preto",sprite:4,name:"Baunilha & Chá Preto",family:"Oriental cítrico",groups:["envolventes"],desc:"Profundo, quente e memorável. A doçura confortável da baunilha ganha contraste com a elegância seca do chá.",notes:"Chá preto · baunilha · especiarias · âmbar"},
    {id:"cereja-ambar",sprite:5,name:"Cereja & Âmbar",family:"Floral frutal",groups:["florais","envolventes"],desc:"Frutado, sensual e envolvente. Cereja luminosa sobre uma base quente e sofisticada de âmbar.",notes:"Cereja · framboesa · orquídea · âmbar"},
    {id:"coco-tonka-madeiras",sprite:6,name:"Coco, Tonka & Madeiras",family:"Oriental aromático",groups:["amadeirados","envolventes"],desc:"Cremoso, dourado e aconchegante. Uma composição indulgente equilibrada por madeiras secas e elegantes.",notes:"Coco · fava tonka · sândalo · âmbar"},
    {id:"figo-folhas",sprite:7,name:"Figo & Folhas",family:"Floral frutal",groups:["frescos","florais"],desc:"Verde, frutado e elegante. O frescor das folhas encontra a textura cremosa do figo em uma assinatura contemporânea.",notes:"Figo · folhas verdes · gardênia · cedro"},
    {id:"gengibre-patchouli",sprite:8,name:"Gengibre & Patchouli",family:"Madeira cítrico",groups:["frescos","amadeirados"],desc:"Vibrante, terroso e moderno. Energia cítrica e especiada na abertura, profundidade amadeirada no fundo.",notes:"Gengibre · bergamota · patchouli · vetiver"},
    {id:"green-tea",sprite:9,name:"Green Tea",family:"Floral cítrico",groups:["frescos","florais"],desc:"Limpo, leve e harmonioso. Chá verde e cítricos criam uma sensação luminosa de frescor contínuo.",notes:"Chá verde · bergamota · flor de laranjeira · madeiras"},
    {id:"limao-siciliano-hortela",sprite:10,name:"Limão Siciliano & Hortelã",family:"Cítrico aromático",groups:["frescos"],desc:"Cítrico, refrescante e luminoso. Um encontro vivo entre limão e hortelã para ambientes que pedem leveza.",notes:"Limão siciliano · bergamota · hortelã · cedro"},
    {id:"neroli-cedro",sprite:11,name:"Neroli & Cedro",family:"Cítrico aromático",groups:["frescos","florais","amadeirados"],desc:"Fresco, refinado e confortável. Flores brancas iluminadas por cítricos repousam sobre uma base suave de madeira.",notes:"Neroli · bergamota · flor de laranjeira · cedro"},
    {id:"orange-blossom",sprite:12,name:"Orange Blossom",family:"Floral",groups:["florais"],desc:"Solar, floral e elegante. Flor de laranjeira com brilho frutado e uma assinatura delicada, mas presente.",notes:"Flor de laranjeira · mandarina · jasmim · madeiras"},
    {id:"salvia-sandalo",sprite:13,name:"Sálvia & Sândalo",family:"Fougère aromático",groups:["frescos","amadeirados"],desc:"Aromático, equilibrado e sereno. Notas verdes e herbais encontram a cremosidade discreta do sândalo.",notes:"Sálvia · lavanda · menta · sândalo"},
    {id:"verbena-capim-santo",sprite:14,name:"Verbena & Capim Santo",family:"Cítrico aromático",groups:["frescos"],desc:"Fresco, cítrico e relaxante. Uma composição clara e vibrante, criada para trazer sensação de renovação.",notes:"Verbena · capim-santo · grapefruit · cedro"},
    {id:"iris-cedro",sprite:15,name:"Íris & Cedro",family:"Floral fougère",groups:["florais","amadeirados"],desc:"Sofisticado, aveludado e envolvente. Um floral nobre ganha estrutura seca de madeira e profundidade elegante.",notes:"Íris · cereja preta · mirra · cedro"},
    {id:"lavanda-sandalo",sprite:16,name:"Lavanda & Sândalo",family:"Floral oriental",groups:["florais","amadeirados","envolventes"],desc:"Confortável, elegante e atemporal. Relaxamento aromático com uma base cremosa de sândalo.",notes:"Lavanda · jasmim · sândalo · baunilha"}
  ];

  const grid = document.getElementById("aroma-grid");
  if (!grid) return;
  const selected = new Set();
  const count = document.getElementById("aroma-selection-count");
  const names = document.getElementById("aroma-selection-names");
  const submit = document.getElementById("aroma-submit");
  const detailDialog = document.getElementById("aroma-dialog");
  const detailContent = document.getElementById("aroma-dialog-content");
  const voteDialog = document.getElementById("aroma-vote-dialog");
  let currentFilter = "todos";

  function shuffle(items) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = crypto?.getRandomValues
        ? crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1)
        : Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const displayOrder = shuffle(SCENTS);


  function cardTemplate(scent) {
    const checked = selected.has(scent.id);
    return `
      <article class="aroma-preview-card ${checked ? "is-selected" : ""}" data-groups="${scent.groups.join(" ")}" data-id="${scent.id}">
        <button class="aroma-preview-map" type="button" data-explore="${scent.id}" aria-label="Ampliar mapa olfativo de ${scent.name}">
          <span class="aroma-smellmap" style="--smellmap-y:${(scent.sprite / 16) * 100}%;" aria-hidden="true"></span>
          <span class="aroma-map-expand">Ampliar mapa olfativo ↗</span>
        </button>
        <div class="aroma-preview-card-copy">
          <p>${scent.family}</p>
          <h3>${scent.name}</h3>
          <div>${scent.desc}</div>
          <span class="aroma-card-notes">${scent.notes}</span>
          <div class="aroma-preview-card-actions">
            <button class="text-link" type="button" data-explore="${scent.id}">Explorar aroma →</button>
            <button class="aroma-select" type="button" data-select="${scent.id}" aria-pressed="${checked}">
              ${checked ? "Selecionado ✓" : "Selecionar"}
            </button>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const shown = displayOrder.filter((s) =>
      currentFilter === "todos" || s.groups.includes(currentFilter)
    );
    grid.innerHTML = shown.map(cardTemplate).join("");
    updateSelection();
  }

  function updateSelection() {
    const list = SCENTS.filter((s) => selected.has(s.id));
    count.textContent = `${selected.size} de 3 selecionados`;
    names.textContent = list.length ? list.map((s) => s.name).join(" · ") : "Escolha seus favoritos.";
    submit.disabled = selected.size === 0;
    document.body.classList.toggle("has-aroma-selection", selected.size > 0);
  }

  function toggle(id) {
    if (selected.has(id)) selected.delete(id);
    else if (selected.size < 3) selected.add(id);
    else {
      count.textContent = "Você já escolheu 3. Desmarque um para trocar.";
      return;
    }
    submit.textContent = "Enviar minhas escolhas";
    render();
  }

  document.querySelectorAll("[data-aroma-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.aromaFilter;
      document.querySelectorAll("[data-aroma-filter]").forEach((b) =>
        b.classList.toggle("is-active", b === button)
      );
      render();
    });
  });

  grid.addEventListener("click", (event) => {
    const selectButton = event.target.closest("[data-select]");
    if (selectButton) return toggle(selectButton.dataset.select);
    const explore = event.target.closest("[data-explore]");
    if (!explore) return;
    const scent = SCENTS.find((s) => s.id === explore.dataset.explore);
    if (!scent) return;
    detailContent.innerHTML = `
      <div class="aroma-dialog-map">
        <div class="aroma-smellmap aroma-smellmap--large" style="--smellmap-y:${(scent.sprite / 16) * 100}%;" role="img" aria-label="Mapa olfativo de ${scent.name}"></div>
      </div>
      <div class="aroma-dialog-copy">
        <p class="eyebrow">Aroma em estudo · ${scent.family}</p>
        <h2>${scent.name}</h2>
        <p>${scent.desc}</p>
        <p class="aroma-dialog-notes"><span>Matérias em destaque</span>${scent.notes}</p>
        <button class="btn btn-primary" type="button" data-dialog-select="${scent.id}">
          ${selected.has(scent.id) ? "Remover da seleção" : "Escolher este aroma"}
        </button>
      </div>`;
    detailDialog.showModal();
  });

  detailDialog.addEventListener("click", (event) => {
    const choose = event.target.closest("[data-dialog-select]");
    if (choose) {
      toggle(choose.dataset.dialogSelect);
      detailDialog.close();
    }
    if (event.target.closest("[data-close-aroma]")) detailDialog.close();
    if (event.target === detailDialog) detailDialog.close();
  });

  submit.addEventListener("click", async () => {
    if (!selected.size || selected.size > 3) return;
    submit.disabled = true;
    const old = submit.textContent;
    submit.textContent = "Registrando…";
    try {
      const response = await fetch("/api/aroma-vote", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({choices:[...selected],company:""})
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Não foi possível registrar.");
      voteDialog.showModal();
      submit.textContent = "Escolhas registradas ✓";
    } catch (error) {
      submit.textContent = error.message || "Tente novamente";
      setTimeout(() => { submit.textContent = old; submit.disabled = false; }, 3500);
    }
  });

  document.querySelectorAll("[data-close-vote]").forEach((button) =>
    button.addEventListener("click", () => voteDialog.close())
  );
  voteDialog.addEventListener("click", (event) => {
    if (event.target === voteDialog) voteDialog.close();
  });

  const notifyForm = document.getElementById("aroma-notify-form");
  const message = document.getElementById("aroma-form-message");
  notifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(notifyForm);
    const button = notifyForm.querySelector('button[type="submit"]');
    button.disabled = true;
    message.textContent = "Registrando seu pedido de aviso…";
    try {
      const response = await fetch("/api/aroma-notify", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
          name:String(form.get("name") || ""),
          email:String(form.get("email") || ""),
          marketingConsent:form.get("marketingConsent") === "on",
          acceptPrivacy:form.get("acceptPrivacy") === "on",
          company:String(form.get("company") || "")
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Não foi possível registrar.");
      notifyForm.innerHTML = '<div class="aroma-notify-success"><span>✓</span><h3>Você está na lista.</h3><p>Se esses aromas avançarem, a AMEVURI poderá avisar você pelo e-mail informado.</p><button class="btn btn-ghost" type="button" data-success-close>Concluir</button></div>';
      notifyForm.querySelector("[data-success-close]").addEventListener("click", () => voteDialog.close());
    } catch (error) {
      message.textContent = error.message || "Tente novamente em instantes.";
      button.disabled = false;
    }
  });

  render();
})();