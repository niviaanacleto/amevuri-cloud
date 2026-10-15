/* AMEVURI | Filtros compartilháveis para quem procura um formato específico. */
(() => {
  const root = document.querySelector('[data-shop-grid]');
  const buttons = Array.from(document.querySelectorAll('.filter[data-filter]'));
  const count = document.querySelector('[data-catalog-result-count]');
  if (!root || !buttons.length || !count) return;

  const allowed = new Set(buttons.map(button => button.dataset.filter));
  const getActive = () => buttons.find(button => button.classList.contains('active')) || buttons[0];

  function updateResults() {
    const visible = Array.from(root.querySelectorAll('.shop-card')).filter(card => !card.classList.contains('hidden')).length;
    count.textContent = visible === 1 ? '1 produto encontrado' : visible + ' produtos encontrados';
    const active = getActive();
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button === active));
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      updateResults();
      const params = new URLSearchParams(window.location.search);
      if (button.dataset.filter === 'all') params.delete('categoria');
      else params.set('categoria', button.dataset.filter);
      const query = params.toString();
      window.history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    });
  }

  const requested = new URLSearchParams(window.location.search).get('categoria');
  if (requested && allowed.has(requested)) {
    const matching = buttons.find(button => button.dataset.filter === requested);
    matching?.click();
  } else {
    updateResults();
  }
})();
