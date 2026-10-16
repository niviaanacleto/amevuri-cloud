import assert from "node:assert/strict";
import {
  FREE_SHIPPING_MINIMUM,
  isFreeShippingNeighborhood,
  checkFreeShippingDestination,
  applyRegionalFreeShipping
} from "../src/lib/regional-free-shipping.js";

const address = (bairro, localidade = "Niterói", uf = "RJ") =>
  ({ cep: "24220000", bairro, localidade, uf });
assert.equal(FREE_SHIPPING_MINIMUM, 70);
assert.equal(isFreeShippingNeighborhood(address("Icaraí")), true);
assert.equal(isFreeShippingNeighborhood(address("Piratininga")), true);
assert.equal(isFreeShippingNeighborhood(address("Centro")), true);
assert.equal(isFreeShippingNeighborhood(address("Centro", "Rio de Janeiro")), false);
assert.equal(isFreeShippingNeighborhood(address("Copacabana", "Rio de Janeiro")), true);
assert.equal(isFreeShippingNeighborhood(address("Botafogo", "Rio de Janeiro")), true);
assert.equal(isFreeShippingNeighborhood(address("Copacabana", "Niterói")), false);
assert.equal(isFreeShippingNeighborhood(address("Icaraí", "Rio de Janeiro")), false);
assert.equal(isFreeShippingNeighborhood(address("Icaraí", "São Gonçalo")), false);
assert.equal(isFreeShippingNeighborhood(address("")), false);
const oceanica = ["Cafubá", "Camboinhas", "Engenho do Mato", "Itacoatiara", "Itaipu", "Jacaré", "Jardim Imbuí", "Maravista", "Piratininga", "Santo Antônio", "Serra Grande"];
const zonaSul = ["Botafogo", "Catete", "Copacabana", "Cosme Velho", "Flamengo", "Gávea", "Glória", "Humaitá", "Ipanema", "Jardim Botânico", "Lagoa", "Laranjeiras", "Leblon", "Leme", "São Conrado", "Urca", "Vidigal", "Rocinha"];
for (const bairro of oceanica)
  assert.equal(isFreeShippingNeighborhood(address(bairro)), true, "Niterói: " + bairro);
for (const bairro of zonaSul)
  assert.equal(isFreeShippingNeighborhood(address(bairro, "Rio de Janeiro")), true, "Rio: " + bairro);
for (const bairro of ["Tijuca", "Barra da Tijuca", "Recreio dos Bandeirantes", "Centro", "Méier"])
  assert.equal(isFreeShippingNeighborhood(address(bairro, "Rio de Janeiro")), false, "Fora da Zona Sul: " + bairro);

assert.equal(isFreeShippingNeighborhood(address("Icaraí", "Niterói", "SP")), false);

let calls = 0;
const fetchMock = async (url) => {
  calls++;
  assert.equal(url, "https://viacep.com.br/ws/24220000/json/");
  return { ok: true, json: async () => ({ ...address("Icaraí"), cep: "24220-000" }) };
};
assert.deepEqual(await checkFreeShippingDestination("24220-000", fetchMock), { eligible: true, verified: true });
assert.equal(calls, 1);
assert.equal((await checkFreeShippingDestination("24220000", async () => { throw new Error("network"); })).eligible, false);
const mismatched = await checkFreeShippingDestination("24220000", async () => ({ok:true,json:async()=>({cep:"99999999",bairro:"Icaraí",localidade:"Niterói",uf:"RJ"})}));
assert.equal(mismatched.eligible,false);
const missingBairro = await checkFreeShippingDestination("24220000", async () => ({ok:true,json:async()=>({cep:"24220000",bairro:"",localidade:"Niterói",uf:"RJ"})}));
assert.equal(missingBairro.eligible,false);
assert.equal((await checkFreeShippingDestination("abc", fetchMock)).eligible, false);

const quotes = [
  {id:"1",price:12.5,service:"PAC"},
  {id:"2",price:22,service:"SEDEX"}
];
const eligible = async () => ({ eligible: true, verified: true });
const denied = async () => ({ eligible: false, verified: true });
const make = (subtotal, lookup, list = quotes) =>
  applyRegionalFreeShipping({postalCode:"24220000",subtotal,quotes:list,lookup});
const free = await make(70,eligible);
assert.equal(free.freeShippingEligible,true);
assert.equal(free.quotes[0].price,0);
assert.equal(free.quotes[0].originalPrice,12.5);
assert.equal(free.quotes[0].freeShippingPromotion,true);
assert.equal(free.quotes[1].price,22);
assert.equal(quotes[0].price,12.5,"Do not mutate provider quote");
assert.equal((await make(69.99,eligible)).freeShippingEligible,false);
assert.equal((await make(70,denied)).freeShippingEligible,false);
assert.equal((await make(70,eligible,[])).freeShippingEligible,false);
const unsorted=await make(79,eligible,[quotes[1],quotes[0]]);
assert.equal(unsorted.quotes[0].price,22);
assert.equal(unsorted.quotes[1].price,0);
console.log("Regional shipping: eligible bairros, minimum, fail-closed CEP and quote integrity verified.");
