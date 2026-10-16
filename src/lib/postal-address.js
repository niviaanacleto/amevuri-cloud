// Confere cidade e UF no servidor antes de criar cobranças ou reservar estoque.
// Para CEPs gerais, o ViaCEP pode não informar bairro ou logradouro; não os
// utilizamos como critérios obrigatórios de aprovação do endereço.
const digits = (value) => String(value ?? "").replace(/\D/g, "");
export const normalizeLocation = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim()
    .replace(/[\s\-]+/g, " ");

function postalError(code, message, status) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  return error;
}

export async function lookupPostalAddress(postalCode, fetchImpl = fetch) {
  const cep = digits(postalCode);
  if (!/^\d{8}$/.test(cep))
    throw postalError("INVALID_POSTAL_CODE", "Informe um CEP válido com 8 números.", 400);
  let response;
  let data;
  try {
    response = await fetchImpl(`https://viacep.com.br/ws/${cep}/json/`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok)
      throw new Error("Falha no serviço de consulta do CEP.");
    data = await response.json();
  } catch {
    throw postalError(
      "POSTAL_LOOKUP_UNAVAILABLE",
      "Não conseguimos confirmar o CEP no momento. Tente novamente ou fale com a AMEVURI pelo WhatsApp.",
      503,
    );
  }
  if (data?.erro)
    throw postalError("POSTAL_NOT_FOUND", "Este CEP não foi encontrado. Confira os oito números.", 422);
  if (
    !data ||
    digits(data.cep) !== cep ||
    !String(data.localidade || "").trim() ||
    !/^[A-Z]{2}$/.test(String(data.uf || "").trim())
  )
    throw postalError(
      "POSTAL_LOOKUP_UNAVAILABLE",
      "Não foi possível confirmar a cidade e o estado deste CEP. Tente novamente.",
      503,
    );
  return {
    postalCode: cep,
    city: String(data.localidade).trim(),
    state: String(data.uf).trim().toUpperCase(),
    neighborhood: String(data.bairro || "").trim(),
    street: String(data.logradouro || "").trim(),
  };
}

export function assertPostalAddressMatches(customer, address) {
  if (
    digits(customer.postalCode) !== address.postalCode ||
    normalizeLocation(customer.city) !== normalizeLocation(address.city) ||
    normalizeLocation(customer.state) !== normalizeLocation(address.state)
  ) {
    throw postalError(
      "POSTAL_ADDRESS_MISMATCH",
      `O CEP informado corresponde a ${address.city}/${address.state}. Corrija cidade e UF e calcule o frete novamente.`,
      422,
    );
  }
  return true;
}
