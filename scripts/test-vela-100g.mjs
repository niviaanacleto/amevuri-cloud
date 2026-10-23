import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CATALOG,validateItems} from '../src/lib/catalog.js';
import {harness,payload} from './harness.mjs';
for (const id of ['vela-cumaru-100','vela-sakura-100']) {
 const p=CATALOG[id];
 assert.equal(p.initialStock,4);assert.equal(p.price,29.99);assert.equal(p.originalPrice,49.99);
 assert.deepEqual(p.shipping,{weightKg:.25,widthCm:8,heightCm:6.5,lengthCm:8});
 assert.equal(validateItems([{id,quantity:2}]).subtotal,59.98);
 const h=await harness();const request=payload();request.items=[{id,quantity:4}];
 const accepted=await h.api('/api/create-checkout',request);
 assert.equal(accepted.status,200,JSON.stringify(accepted.data));assert.equal(accepted.data.subtotal,119.96);
 const h2=await harness();const overflow=payload();overflow.items=[{id,quantity:5}];
 const rejected=await h2.api('/api/create-checkout',overflow);assert.notEqual(rejected.status,200);
 await h.drain();await h2.drain();
 const route=id.includes('cumaru')?'cumaru-sandalo':'sakura-musk';
 const page=fs.readFileSync(new URL('../public/vela-aromatica-100g-'+route+'.html',import.meta.url),'utf8');
 assert(page.includes('49,99')&&page.includes('29,99')&&page.includes('último trimestre de 2026'));
 assert(page.includes('data-sku="'+id+'"'));assert(!page.includes('130 g'));
}
assert.equal(CATALOG['vela-cumaru-120'].price,69.99);assert.equal(CATALOG['vela-sakura-120'].price,69.99);
console.log('PASS: 100 g prices, shipping, four-unit stock allocation, checkout and overflow protection; 130 g unchanged.');
