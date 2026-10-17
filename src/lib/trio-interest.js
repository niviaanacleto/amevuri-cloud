export const TRIO_CAMPAIGN = "trio-2026-11";
export const TRIO_CONSENT_VERSION = "2026-10-17";
export const TRIO_CONSENT_TEXT = "Quero receber pelo WhatsApp o aviso de abertura das vendas do Trio AMEVURI.";

export function normalizeTrioPhone(value) {
  if (typeof value !== "string" || value.length > 40) return "";
  let phone = value.replace(/\D/g, "");
  if ((phone.length === 12 || phone.length === 13) && phone.startsWith("55")) phone = phone.slice(2);
  if (!/^[1-9]{2}\d{8,9}$/.test(phone) || /^(\d)\1+$/.test(phone)) return "";
  return `55${phone}`;
}

export function validateTrioInterest(body) {
  const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
  const phone = normalizeTrioPhone(body.phone);
  if (name.length < 2 || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name))
    throw Object.assign(new Error("Informe seu nome, com até 120 caracteres."), { status: 400 });
  if (!phone) throw Object.assign(new Error("Informe um WhatsApp válido com DDD."), { status: 400 });
  if (body.notifyConsent !== true || body.acceptPrivacy !== true)
    throw Object.assign(new Error("Confirme o recebimento do aviso e a leitura da Política de Privacidade."), { status: 400 });
  const attribution = {};
  for (const field of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    if (typeof body[field] === "string") attribution[field] = body[field].replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 100);
  }
  return { name, phone, campaign: TRIO_CAMPAIGN, attribution,
    notifyConsent: true, consentText: TRIO_CONSENT_TEXT, consentVersion: TRIO_CONSENT_VERSION };
}
