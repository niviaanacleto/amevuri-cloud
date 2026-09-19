(() => {
  const collection = window.AMEVURI_COLLECTIONS?.find(c => c.id === document.body.dataset.fragrance);
  const root = document.querySelector('.collection-product-hero');
  if (!collection || !root) return;
  const inputs = [...root.querySelectorAll('input[name="collection-format"]')];
  const photo = root.querySelector('figure img');
  const price = root.querySelector('[data-collection-price]');
  const caption = root.querySelector('[data-collection-caption]');
  const status = root.querySelector('[data-collection-stock]');
  const actions = root.querySelector('[data-collection-actions]');
  let stock = {};
  const requested = new URLSearchParams(location.search).get('formato');
  const requestedInput = inputs.find(i => i.value === requested);
  if (requestedInput) requestedInput.checked = true;
  function render() {
    const selected = inputs.find(i => i.checked);
    const product = collection.products.find(p => p.key === selected?.value);
    if (!product) return;
    photo.src = product.image;
    photo.alt = `${product.name} ${product.size} ${collection.name} AMEVURI`;
    caption.textContent = `${product.name} · ${product.size}`;
    const registered = product.sku && window.AMEVURI_CART?.PRODUCTS[product.sku];
    const confirmedPrice = registered?.price ?? product.price;
    price.textContent = Number.isFinite(confirmedPrice) ? window.AMEVURI_CART.money(confirmedPrice) : 'Consulte o preço';
    const available = stock[product.sku];
    status.textContent = registered ? (Number.isFinite(available) ? (available > 0 ? 'Disponível' : 'Esgotado') : 'Consulte a disponibilidade') : (Number.isFinite(confirmedPrice) ? 'Consulte a disponibilidade com a AMEVURI.' : 'Consulte preço e disponibilidade com a AMEVURI.');
    actions.replaceChildren();
    if (registered) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-primary';
      button.dataset.collectionBuy = '';
      button.disabled = Number.isFinite(available) && available <= 0;
      button.textContent = button.disabled ? 'Esgotado' : 'Adicionar à sacola';
      button.addEventListener('click', () => window.AMEVURI_CART.addItem(product.sku));
      actions.append(button);
    }
    const inquiry = document.createElement('a');
    inquiry.href = 'https://wa.me/5521971133616?text=' + encodeURIComponent(`Olá, quero comprar ${product.name} ${product.size} ${collection.name} da AMEVURI.`);
    inquiry.target = '_blank';
    inquiry.rel = 'noopener';
    inquiry.className = registered ? 'text-link' : 'btn btn-primary';
    inquiry.textContent = registered ? 'Falar com a AMEVURI' : 'Consultar compra pelo WhatsApp';
    actions.append(inquiry);
  }
  inputs.forEach(input => input.addEventListener('change', render));
  render();
  fetch('/api/inventory', {headers:{accept:'application/json'}})
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data?.ok || !Array.isArray(data.products)) return;
      stock = Object.fromEntries(data.products.map(p => [p.id, p.stock]));
      render();
    }).catch(() => {});
})();
