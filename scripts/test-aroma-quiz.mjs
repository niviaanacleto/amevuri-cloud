import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const pub=new URL('../public/',import.meta.url);
const context={window:{}};
vm.runInNewContext(fs.readFileSync(new URL('aroma-quiz.js',pub),'utf8'),context);
const resolve=context.window.AMEVURI_QUIZ.resolve;
const options=['refugio','presenca','leveza','aconchego'];
const mapping={refugio:'/produto-sakura',leveza:'/produto-sakura',presenca:'/produto-rosa',aconchego:'/produto-cumaru'};
for(const answer of options)assert.equal(resolve(Array(4).fill(answer)).link,mapping[answer]);
const reached=new Set();
for(const a of options)for(const b of options)for(const c of options)for(const d of options){
 const answers=[a,b,c,d]; const result=resolve(answers);reached.add(result.link);
 const scores={};for(const answer of answers)scores[mapping[answer]]=(scores[mapping[answer]]||0)+1;
 const maximum=Math.max(...Object.values(scores));
 assert.equal(result.link,answers.map(x=>mapping[x]).find(x=>scores[x]===maximum));
 assert(fs.existsSync(new URL('.'+result.link+'.html',pub)));
}
assert.equal(reached.size,3);
assert.throws(()=>resolve([]));
const page=fs.readFileSync(new URL('encontre-seu-aroma.html',pub),'utf8');
assert(page.includes('src="/aroma-quiz.js"'));assert(page.includes('window.AMEVURI_QUIZ.resolve(answers)'));
assert(!page.includes('const configs'));
const home=fs.readFileSync(new URL('index.html',pub),'utf8').split('<section class="collection-preview')[1].split('</section>')[0];
for(const route of ['cumaru-sandalo','sakura-musk','rosa-acafrao'])assert(home.includes('href="/'+route+'"'));
for(const sku of ['vela-cumaru-120','vela-sakura-120','vela-rosa-130'])assert(home.includes('data-sku="'+sku+'"'));
assert.equal((home.match(/<article/g)||[]).length,3);
console.log('PASS: 256 combinações do teste, três resultados, desempates e três coleções na página inicial.');
