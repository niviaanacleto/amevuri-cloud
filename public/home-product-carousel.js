/* Carrossel AMEVURI: usa o catálogo existente como fonte dos 15 itens e valores. */
(() => {
  const root = document.querySelector('[data-home-product-carousel]');
  const collections = window.AMEVURI_COLLECTIONS;
  if (!root || !Array.isArray(collections)) return;

  const products = collections.flatMap(collection =>
    (collection.products || []).map(product => ({
      ...product,
      fragrance: collection.name,
      family: collection.family,
      href: '/produto-' + collection.id + '?formato=' + encodeURIComponent(product.key)
    }))
  );
  if (!products.length) return;

  const picture = root.querySelector('[data-carousel-photo]');
  const photoLink = root.querySelector('[data-carousel-link-photo]');
  const family = root.querySelector('[data-carousel-family]');
  const title = root.querySelector('[data-carousel-name]');
  const size = root.querySelector('[data-carousel-size]');
  const price = root.querySelector('[data-carousel-price]');
  const link = root.querySelector('[data-carousel-link]');
  const buy = root.querySelector('[data-carousel-buy]');
  const current = root.querySelector('[data-carousel-current]');
  const total = root.querySelector('[data-carousel-total]');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  if ([picture, photoLink, family, title, size, price, link, buy, current, total, prev, next].some(v => !v)) return;

  let index = 0;
  const money = value => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);

  function render() {
    const item = products[index];
    const registered = item.sku && window.AMEVURI_CART?.PRODUCTS?.[item.sku];
    picture.src = item.image;
    picture.alt = item.name + ' ' + item.size + ' ' + item.fragrance + ' AMEVURI';
    family.textContent = item.fragrance;
    title.textContent = item.name;
    size.textContent = item.size + ' · ' + item.family;
    price.textContent = money(registered?.price ?? item.price);
    link.href = item.href;
    photoLink.href = item.href;
    buy.dataset.sku = item.sku || '';
    buy.disabled = !registered;
    buy.hidden = !registered;
    current.textContent = String(index + 1).padStart(2, '0');
    total.textContent = String(products.length).padStart(2, '0');
  }

  function move(offset) {
    index = (index + offset + products.length) % products.length;
    render();
  }

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  buy.addEventListener('click', () => {
    const item = products[index];
    if (item.sku && window.AMEVURI_CART?.PRODUCTS?.[item.sku]) {
      window.AMEVURI_CART.addItem(item.sku);
    }
  });
  render();
})();
