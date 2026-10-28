import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { CATALOG } from '../src/lib/catalog.js';
const pub = new URL('../public/', import.meta.url);
const notes = ['Cumaru, Musk, Madeira de Cashmere', 'Sândalo, Baunilha', 'Madeira Seca, Cedro'];
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(new URL('collections-data.js',pub),'utf8'),context);
assert.equal(JSON.stringify(context.window.AMEVURI_COLLECTIONS[0].notes),JSON.stringify(notes));
for(const file of fs.readdirSync(pub).filter(f=>f.includes('cumaru')&&f.endsWith('.html'))){
 const html=fs.readFileSync(new URL(file,pub),'utf8');
 assert(!/bergamota|pimenta rosa|cardamomo|íris|jasmim|violeta|fava tonka|âmbar/i.test(html),file);
 if(html.includes('Notas de saída:')||html.includes('collection-note-grid')) for(const note of notes)assert(html.includes(note),file+' '+note);
 assert(!html.includes('/assets/aromas/cumaru-sandalo/'),file);
}
for(const [id,route] of [['cumaru','cumaru-sandalo'],['sakura','sakura-musk']]){
 const sku=`vela-${id}-100`;
 const target=`vela-aromatica-100g-${route}`;
 const page=fs.readFileSync(new URL(target+'.html',pub),'utf8');
 for(const source of [route,'produto-'+id]) assert(fs.readFileSync(new URL(source+'.html',pub),'utf8').includes(`href="/${target}"`),source);
 assert(page.includes(`data-sku="${sku}"`));
 const data=JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(Number(data[0].offers.price),CATALOG[sku].price);
 assert(fs.readFileSync(new URL('sitemap.xml',pub),'utf8').includes('/'+target));
}
console.log('PASS: approved Cumaru notes, collection discovery and 100 g SEO/catalog prices.');
