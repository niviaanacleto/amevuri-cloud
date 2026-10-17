import assert from "node:assert/strict";
import fs from "node:fs";
import { harness } from "./harness.mjs";

const h = await harness();
const admin = { "x-amevuri-setup-key": "test-admin" };
const valid = { name: "Pessoa de Teste", phone: "(21) 99999-1234", notifyConsent: true, acceptPrivacy: true,
  utm_source: "instagram", utm_campaign: "trio_novembro_2026" };
assert.equal((await h.api("/api/trio-interest")).status, 405);
for (const body of [ { ...valid, name: "A" }, { ...valid, phone: "123" }, { ...valid, phone: "11111111111" },
  { ...valid, notifyConsent: false }, { ...valid, acceptPrivacy: false }, { ...valid, notifyConsent: "true" } ])
  assert.equal((await h.api("/api/trio-interest", body)).status, 400);
assert.equal((await h.api("/api/trio-interest", valid, { origin: "https://other.example" })).status, 403);
assert.equal((await h.api("/api/trio-interest", "not json")).status, 400);
const first = await h.api("/api/trio-interest", valid);
assert.equal(first.status, 201);
assert.equal(first.data.registered, true);
assert.equal((await h.api("/api/trio-interest", { ...valid, name: "Outra Pessoa", phone: "+55 21 99999-1234" })).status, 201);
assert.equal((await h.api("/api/trio-interest", { ...valid, company: "spam" })).status, 201);
assert.equal((await h.store.listTrioInterests()).length, 1);
assert.equal((await h.api("/api/admin-trio-interest")).status, 401);
assert.equal((await h.api("/api/admin-trio-interest", undefined, { "x-amevuri-setup-key": "wrong" })).status, 401);
let dashboard = await h.api("/api/admin-trio-interest", undefined, admin);
assert.equal(dashboard.headers["cache-control"], "no-store");
assert.equal(dashboard.data.contacts.length, 1);
assert.equal(dashboard.data.contacts[0].phone, "5521999991234");
assert.equal(dashboard.data.contacts[0].name, valid.name);
assert.equal(dashboard.data.contacts[0].attribution.utm_source, "instagram");
assert.equal(dashboard.data.contacts[0].consentVersion, "2026-10-17");
assert(dashboard.data.contacts[0].consentAt);
assert.equal([...h.memory.keys()].filter(key => key.startsWith("prive-member:")).length, 0);
assert.equal((await h.store.getInventory())["vela-cumaru-120"], 10);
assert.equal(h.state.calls.length, 0, "No external messages, payments, or provider calls");

// Interest is not stock. More than 20 distinct contacts can register.
for (let i = 0; i < 24; i++) {
  const response = await h.api("/api/trio-interest", { ...valid, phone: `2198888${String(i).padStart(4, "0")}` }, { "cf-connecting-ip": `test-ip-${i}` });
  assert.equal(response.status, 201);
}
assert.equal((await h.store.listTrioInterests()).length, 25);
for (let i = 0; i < 8; i++) assert.equal((await h.api("/api/trio-interest", valid, { "cf-connecting-ip": "rate-test" })).status, 201);
assert.equal((await h.api("/api/trio-interest", valid, { "cf-connecting-ip": "rate-test" })).status, 429);
assert.equal((await h.api("/api/admin-trio-interest", { phone: valid.phone }, {}, "DELETE")).status, 401);
assert.equal((await h.api("/api/admin-trio-interest", { phone: valid.phone }, admin, "DELETE")).status, 200);
dashboard = await h.api("/api/admin-trio-interest", undefined, admin);
assert.equal(dashboard.data.contacts.length, 24);
assert(!dashboard.data.contacts.some(contact => contact.phone === "5521999991234"));

const page = fs.readFileSync(new URL("../public/trio-presenteavel.html", import.meta.url), "utf8");
for (const content of ["50 g", "70 ml", "tampa de bambu", "R$ 119,99", "20 kits", "7 de novembro de 2026", "9 de novembro", "não reserva", "Política de Privacidade"]) assert(page.includes(content), content);
assert(!/data-add-cart|application\/ld\+json|130 g|265 ml|156 ml/.test(page));
assert(!/[—–]/.test(page), "No dashes in customer-facing copy");
console.log("PASS: trio validation, consent, deduplication, attribution, persistence, admin auth/deletion, rate limit, >20 leads, no Privé/stock side effects, and exact kit size.");
