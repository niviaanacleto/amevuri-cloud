// Entrega gratuita regional AMEVURI. Validar pelo CEP e pelo bairro retornado
// por serviço independente, nunca pelo bairro/cidade digitados no checkout.
// A promoção se aplica ao subtotal de produtos antes do crédito Privé.
export const FREE_SHIPPING_MINIMUM = 70;

const NITEROI_BAIRROS = new Set([
  "centro", "icarai", "cafuba", "camboinhas", "camboinha",
  "engenho do mato", "itacoatiara", "itaipu", "jacare",
  "jardim imbui", "maravista", "piratininga", "santo antonio",
  "serra grande"
]);

const RIO_ZONA_SUL_BAIRROS = new Set([
  "botafogo", "catete", "copacabana", "cosme velho",
  "flamengo", "gavea", "gloria", "humaita", "ipanema",
  "jardim botanico", "lagoa", "laranjeiras", "leblon",
  "leme", "sao conrado", "urca", "vidigal", "rocinha"
]);

const normalize = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

export function isFreeShippingNeighborhood(address) {
  if (!address || normalize(address.uf) !== "rj") return false;
  const city = normalize(address.localidade);
  const bairro = normalize(address.bairro);
  if (!bairro) return false;
  if (city === "niteroi") return NITEROI_BAIRROS.has(bairro);
  if (city === "rio de janeiro") return RIO_ZONA_SUL_BAIRROS.has(bairro);
  return false;
}

export async function checkFreeShippingDestination(postalCode, fetchImpl = fetch) {
  const cep = String(postalCode || "").replace(/\D/g, "");
  if (!/^\d{8}$/.test(cep)) return { eligible: false, verified: false };
  try {
    const response = await fetchImpl(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(3500)
    });
    if (!response.ok) return { eligible: false, verified: false };
    const data = await response.json();
    if (data?.erro || String(data?.cep || "").replace(/\D/g, "") !== cep)
      return { eligible: false, verified: false };
    if (!data.bairro || !data.localidade || !data.uf)
      return { eligible: false, verified: false };
    return { eligible: isFreeShippingNeighborhood(data), verified: true };
  } catch {
    return { eligible: false, verified: false };
  }
}

// Apenas a modalidade mais econômica recebe gratuidade.
// A cotação original do Melhor Envio não é modificada nem descartada.
export async function applyRegionalFreeShipping({ postalCode, subtotal, quotes, lookup = checkFreeShippingDestination }) {
  if (!Array.isArray(quotes) || !Number.isFinite(Number(subtotal)) || Number(subtotal) < FREE_SHIPPING_MINIMUM)
    return { quotes, freeShippingEligible: false, promotionVerification: "not_applicable" };
  const check = await lookup(postalCode);
  if (!check.eligible)
    return { quotes, freeShippingEligible: false, promotionVerification: check.verified ? "outside_region" : "unavailable" };
  if (!quotes.length)
    return { quotes, freeShippingEligible: false, promotionVerification: "no_services" };
  const cheapest = quotes.reduce((best, q) =>
    !best || Number(q.price) < Number(best.price) ? q : best, null);
  return {
    quotes: quotes.map(q => q.id === cheapest.id
      ? { ...q, originalPrice: q.price, price: 0, freeShippingPromotion: true }
      : q),
    freeShippingEligible: true,
    promotionVerification: "verified"
  };
}
