/* AMEVURI | Fonte de dados do Merchant Center sincronizada com o catálogo e o estoque. 
   Informações de entrega e devolução são configuradas separadamente na conta Merchant. */
export const MERCHANT_PRODUCT_META = Object.freeze({
"vela-sakura-100": {"image": "/assets/vela-100g/sakura-catalogo.jpg", "path": "/vela-aromatica-100g-sakura-musk", "description": "Vela Aromática 100 g Árvore de Sakura & Musk em pote patê de vidro com tampa de madeira e caixa premium. Versão promocional do último trimestre de 2026. Quantidades limitadas, sujeitas à disponibilidade de estoque.", "category": "Vela Aromática"},
"vela-cumaru-100": {"image": "/assets/vela-100g/cumaru-catalogo.jpg", "path": "/vela-aromatica-100g-cumaru-sandalo", "description": "Vela Aromática 100 g Cumaru & Sândalo em pote patê de vidro com tampa de madeira e caixa premium. Versão promocional do último trimestre de 2026. Quantidades limitadas, sujeitas à disponibilidade de estoque.", "category": "Vela Aromática"},
  "vela-cumaru-120": {"image":"/assets/catalog-v2/cumaru-vela.webp","path":"/vela-aromatica-cumaru-sandalo","description":"Madeiras envolventes, calor macio e cremosidade compõem uma assinatura de presença, acolhimento e profundidade.","category":"Vela Aromática"},
  "home-cumaru-250": {"image":"/assets/catalog-v2/cumaru-home-parfum.png","path":"/home-parfum-cumaru-sandalo","description":"Madeiras envolventes, calor macio e cremosidade compõem uma assinatura de presença, acolhimento e profundidade.","category":"Home Parfum"},
  "wax-cumaru-60": {"image":"/assets/catalog-v2/cumaru-wax-melts.webp","path":"/wax-melts-cumaru-sandalo","description":"Madeiras envolventes, calor macio e cremosidade compõem uma assinatura de presença, acolhimento e profundidade.","category":"Wax Melts"},
  "mini-cumaru-20": {"image":"/assets/miniaturas/cumaru-20g.png","path":"/miniatura-vela-cumaru-sandalo","description":"Madeiras envolventes, calor macio e cremosidade compõem uma assinatura de presença, acolhimento e profundidade.","category":"Miniatura de Vela"},
  "difusor-cumaru-100": {"image":"/assets/catalog-v2/cumaru-difusor.webp?v=20261027-difusores","additionalImages":["/assets/difusores-colecoes/raiz-02-macro.png","/assets/difusores-colecoes/raiz-03-ambiente.png","/assets/difusores-colecoes/raiz-04-caixa.png"],"path":"/difusor-varetas-cumaru-sandalo","description":"Madeiras envolventes, calor macio e cremosidade compõem uma assinatura de presença, acolhimento e profundidade.","category":"Difusor de Varetas"},
  "vela-sakura-120": {"image":"/assets/vela.png","path":"/vela-aromatica-sakura-musk","description":"Frutas luminosas abrem caminho para flores delicadas e um musk macio, criando uma atmosfera íntima e serena.","category":"Vela Aromática"},
  "home-sakura-250": {"image":"/assets/home-parfum.png","path":"/home-parfum-sakura-musk","description":"Frutas luminosas abrem caminho para flores delicadas e um musk macio, criando uma atmosfera íntima e serena.","category":"Home Parfum"},
  "wax-sakura-60": {"image":"/assets/wax-melts.png","path":"/wax-melts-sakura-musk","description":"Frutas luminosas abrem caminho para flores delicadas e um musk macio, criando uma atmosfera íntima e serena.","category":"Wax Melts"},
  "mini-sakura-20": {"image":"/assets/miniatura.png","path":"/miniatura-vela-sakura-musk","description":"Frutas luminosas abrem caminho para flores delicadas e um musk macio, criando uma atmosfera íntima e serena.","category":"Miniatura de Vela"},
  "difusor-sakura-100": {"image":"/assets/difusor.png?v=20261027-difusores","additionalImages":["/assets/difusores-colecoes/flor-02-macro.png","/assets/difusores-colecoes/flor-03-banheiro.png","/assets/difusores-colecoes/flor-04-ambiente.png"],"path":"/difusor-varetas-sakura-musk","description":"Frutas luminosas abrem caminho para flores delicadas e um musk macio, criando uma atmosfera íntima e serena.","category":"Difusor de Varetas"},
  "vela-rosa-130": {"image":"/assets/aromas/rosa-bulgara-acafrao/velaCxRosa.png","path":"/vela-aromatica-rosa-acafrao","description":"Rosa e neroli anunciam uma composição de presença marcante. Oud, açafrão e chocolate preto criam contraste no coração, enquanto patchouli e madeira ambarada sustentam um fundo profundo.","category":"Vela Aromática"},
  "home-rosa-250": {"image":"/assets/aromas/rosa-bulgara-acafrao/homeParfumRosa.png","path":"/home-parfum-rosa-acafrao","description":"Rosa e neroli anunciam uma composição de presença marcante. Oud, açafrão e chocolate preto criam contraste no coração, enquanto patchouli e madeira ambarada sustentam um fundo profundo.","category":"Home Parfum"},
  "wax-rosa-80": {"image":"/assets/aromas/rosa-bulgara-acafrao/waxMeltsRosa.png","path":"/wax-melts-rosa-acafrao","description":"Rosa e neroli anunciam uma composição de presença marcante. Oud, açafrão e chocolate preto criam contraste no coração, enquanto patchouli e madeira ambarada sustentam um fundo profundo.","category":"Wax Melts"},
  "mini-rosa-20": {"image":"/assets/aromas/rosa-bulgara-acafrao/latinha20g.png","path":"/miniatura-vela-rosa-acafrao","description":"Rosa e neroli anunciam uma composição de presença marcante. Oud, açafrão e chocolate preto criam contraste no coração, enquanto patchouli e madeira ambarada sustentam um fundo profundo.","category":"Miniatura de Vela"},
  "difusor-rosa-100": {"image":"/assets/aromas/rosa-bulgara-acafrao/DifusorRosa.png","path":"/difusor-varetas-rosa-acafrao","description":"Rosa e neroli anunciam uma composição de presença marcante. Oud, açafrão e chocolate preto criam contraste no coração, enquanto patchouli e madeira ambarada sustentam um fundo profundo.","category":"Difusor de Varetas"}
});
// Produtos já cadastrados manualmente e aprovados no Merchant Center em 15/10/2026.
// Não publicar esses seis no feed de complementação: os IDs remotos diferem
// dos códigos usados no e-commerce, o que criaria anúncios/listagens duplicados.
// Revisar a relação antes de qualquer migração da fonte manual.
export const MERCHANT_ALREADY_LISTED_SKUS = Object.freeze([
  "vela-cumaru-120",
  "home-cumaru-250",
  "wax-cumaru-60",
  "vela-sakura-120",
  "home-sakura-250",
  "wax-sakura-60"
]);

export function catalogMissingFromMerchant(products) {
  if (!Array.isArray(products)) throw new TypeError("Catálogo indisponível.");
  const existing = new Set(MERCHANT_ALREADY_LISTED_SKUS);
  if (products.some(product => !product || !product.id)) {
    throw new TypeError("Produto do catálogo sem código.");
  }
  if (MERCHANT_ALREADY_LISTED_SKUS.some(id => !products.some(product => product.id === id))) {
    throw new Error("A lista de produtos existentes deve ser reavaliada.");
  }
  return products.filter(product => !existing.has(product.id));
}

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

export function renderMerchantFeed(products, stock) {
  if (!Array.isArray(products)) throw new TypeError("Catálogo indisponível.");
  if (!stock || typeof stock !== "object") throw new TypeError("Estoque indisponível.");
  const site = "https://amevuri.com.br";
  const items = products.map(product => {
    const meta = MERCHANT_PRODUCT_META[product.id];
    if (!meta) throw new Error("Metadados do Merchant ausentes para " + product.id);
    if (!Number.isFinite(product.price) || product.price < 0) {
      throw new Error("Preço inválido para " + product.id);
    }
    const quantity = Number(stock[product.id]);
    if (!Number.isFinite(quantity)) throw new Error("Estoque não confirmado para " + product.id);
    const size = String(product.size).replace(/(\d)(g)\b/gi, "$1 $2").replace(/(\d)(ml)\b/gi, "$1 $2");
    const title = [product.name, size, product.fragrance, "AMEVURI"].join(" ");
    return [
      "<item>",
      "<g:id>" + esc(product.id) + "</g:id>",
      "<g:title>" + esc(title) + "</g:title>",
      "<g:description>" + esc(meta.description) + "</g:description>",
      "<g:link>" + esc(site + meta.path) + "</g:link>",
      "<g:image_link>" + esc(site + meta.image) + "</g:image_link>",
      ...(meta.additionalImages || []).map(image => "<g:additional_image_link>" + esc(site + image) + "</g:additional_image_link>"),
      "<g:availability>" + (quantity > 0 ? "in_stock" : "out_of_stock") + "</g:availability>",
      "<g:price>" + esc(product.price.toFixed(2) + " BRL") + "</g:price>",
      "<g:condition>new</g:condition>",
      "<g:brand>AMEVURI</g:brand>",
      "<g:product_type>" + esc("Casa e decoração > Perfumaria para o lar > " + meta.category) + "</g:product_type>",
      "</item>"
    ].join("");
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "<channel>",
    "<title>AMEVURI | Perfumaria para o lar</title>",
    "<link>" + site + "</link>",
    "<description>Catálogo AMEVURI de velas aromáticas e perfumaria para o lar.</description>",
    ...items,
    "</channel>",
    "</rss>"
  ].join("\n");
}
