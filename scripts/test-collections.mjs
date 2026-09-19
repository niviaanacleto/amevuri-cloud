import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { CATALOG } from '../src/lib/catalog.js';
const pub = new URL('../public/', import.meta.url);
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(new URL('collections-data.js',pub),'utf8'),context);
const collections = context.window.AMEVURI_COLLECTIONS;
assert.equal(collections.length,3);
let photos = 0;
for (const c of collections) {
  assert.equal(c.products.length,5);
  assert.equal(new Set(c.products.map(p=>p.key)).size,5);
  for (const p of c.products) {
    assert(fs.existsSync(new URL('.'+p.image,pub)),p.image);
    assert(fs.statSync(new URL('.'+p.image,pub)).size>0);
    photos++;
    if(p.sku){
      assert(CATALOG[p.sku],p.sku);
      assert.equal(CATALOG[p.sku].price,p.price);
      assert.equal(CATALOG[p.sku].fragrance,c.name);
    }
  }
  for(const route of [c.route,'produto-'+c.id]) {
    const text=fs.readFileSync(new URL(route+'.html',pub),'utf8');
    assert.equal((text.match(/<h1>/g)||[]).length,1);
    assert(text.includes('/collections.css'));
    assert(text.includes('/collections.js'));
    assert(text.includes(`https://amevuri.com.br/${route}`));
    assert(!text.includes('80.781'));
    if(route.startsWith('produto-')){
      assert.equal((text.match(/name="collection-format"/g)||[]).length,5);
      for(const p of c.products)assert(text.includes(`value="${p.key}"`));
    }
  }
}
for(const [old,current] of [['produto-cumaru-sandalo','produto-cumaru'],['produto-sakura-musk','produto-sakura']]){
 const text=fs.readFileSync(new URL(old+'.html',pub),'utf8');
 assert(text.includes(`location.replace("/${current}"+location.search+location.hash)`));
}
console.log(`PASS: seis páginas, ${photos} imagens de formatos, preços cadastrados e rotas antigas.`);

// Every displayed format must be purchasable and have complete shipping data.
import { harness, payload } from './harness.mjs';
const commerceText=fs.readFileSync(new URL('commerce.js',pub),'utf8');
const frontend=vm.runInNewContext('('+commerceText.split('const PRODUCTS = ')[1].split(/;\r?\n/)[0]+')');
assert.equal(Object.keys(CATALOG).length,15);
for(const c of collections)for(const p of c.products){
 assert(p.sku,`${c.id}/${p.key} missing SKU`);
 const registered=CATALOG[p.sku];
 assert.equal(frontend[p.sku].price,registered.price);
 assert.equal(frontend[p.sku].fragrance,registered.fragrance);
 assert.equal(registered.initialStock,10);
 for(const field of ['weightKg','widthCm','heightCm','lengthCm'])assert(registered.shipping[field]>0);
 const h=await harness();
 const request=payload();request.items=[{id:p.sku,quantity:1}];
 const response=await h.api('/api/create-checkout',request);
 assert.equal(response.status,200,JSON.stringify(response.data));
 assert(response.data.checkoutId);
 await h.drain();
}
console.log('PASS: 15 formatos com catálogo, preço, estoque, frete e checkout simulado.');
