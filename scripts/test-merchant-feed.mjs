import assert from "node:assert/strict";
import fs from "node:fs";
import { CATALOG, catalogArray } from "../src/lib/catalog.js";
import { MERCHANT_PRODUCT_META, renderMerchantFeed, catalogMissingFromMerchant, MERCHANT_ALREADY_LISTED_SKUS } from "../src/lib/merchant-feed.js";

const products = catalogArray();
assert.equal(products.length, 15, "O catálogo deve conter 15 produtos.");
assert.equal(Object.keys(MERCHANT_PRODUCT_META).length, 15, "Metadados dos 15 SKUs.");
const stock = Object.fromEntries(products.map(product => [product.id, 10]));
const xml = renderMerchantFeed(products, stock);
const count = (pattern) => (xml.match(pattern) || []).length;

assert(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
assert.equal(count(/<item>/g), 15);
assert.equal(count(/<g:availability>in_stock<\/g:availability>/g), 15);
assert.equal(count(/<g:price>\d+\.\d{2} BRL<\/g:price>/g), 15);
assert.equal(count(/<g:brand>AMEVURI<\/g:brand>/g), 15);
for (const product of products) {
  const meta = MERCHANT_PRODUCT_META[product.id];
  assert(meta && CATALOG[product.id], product.id);
  assert(fs.existsSync(new URL("../public" + meta.image, import.meta.url)), meta.image);
  const pagePath = new URL("../public" + meta.path + ".html", import.meta.url);
  assert(fs.existsSync(pagePath), meta.path);
  const page = fs.readFileSync(pagePath, "utf8");
  assert(page.includes('data-sku="' + product.id + '"'), meta.path + " SKU");
  assert(xml.includes("<g:id>" + product.id + "</g:id>"));
  assert(xml.includes("<g:link>https://amevuri.com.br" + meta.path + "</g:link>"));
}
const unavailable = renderMerchantFeed(products, {...stock, [products[0].id]: 0});
assert.equal((unavailable.match(/<g:availability>out_of_stock<\/g:availability>/g) || []).length, 1);
assert.throws(() => renderMerchantFeed(products, {}), /Estoque não confirmado/);
assert.throws(() => renderMerchantFeed([{...products[0], price: -2}], stock), /Preço inválido/);
assert.equal(new Set(Object.keys(MERCHANT_PRODUCT_META)).size, products.length);
const missing = catalogMissingFromMerchant(products);
assert.equal(MERCHANT_ALREADY_LISTED_SKUS.length, 6);
assert.equal(missing.length, 9);
assert.equal(new Set(missing.map(p => p.id)).size, 9);
assert(missing.every(p => !MERCHANT_ALREADY_LISTED_SKUS.includes(p.id)));
assert.equal(missing.filter(p => p.fragrance === "Rosa Búlgara & Açafrão").length, 5);
assert.equal(missing.filter(p => p.format === "Miniatura").length, 3);
const missingXml = renderMerchantFeed(missing, stock);
assert.equal((missingXml.match(/<item>/g) || []).length, 9);
assert.equal((missingXml.match(/<g:price>\\d+\\.\\d{2} BRL<\\/g:price>/g) || []).length, 9);
for (const product of missing) assert(missingXml.includes("<g:id>" + product.id + "</g:id>"));
for (const sku of MERCHANT_ALREADY_LISTED_SKUS) assert(!missingXml.includes("<g:id>" + sku + "</g:id>"));
assert.throws(() => catalogMissingFromMerchant([]), /reavaliada/);
console.log("Merchant feed: 15 produtos; 9 ausentes separados sem repetir os 6 já aprovados.");
