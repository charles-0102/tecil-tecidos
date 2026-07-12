// Dados da Tecil Tecidos (fonte: www.teciltecidos.com).
// Centralizado para manutencao em um lugar so.
// NOTA: e-mail e Instagram sao placeholders mockados — confirmar com a loja.

export const COMPANY = {
  name: "Tecil Tecidos",
  shortName: "Tecil",
  tagline: "Tecidos de algodão premium, do liso à estampa.",
  segment: "Loja de tecidos",

  location: {
    city: "Caruaru",
    uf: "PE",
    display: "Caruaru – PE",
  },

  // Tempo de mercado. Confirmar ano de fundação com a loja p/ virar "Desde 20XX".
  heritage: "Há mais de 20 anos",

  whatsapp: {
    raw: "+5581998185225",
    display: "(81) 99818-5225",
    href: "https://wa.me/5581998185225",
  },

  email: {
    address: "contato@teciltecidos.com",
    href: "mailto:contato@teciltecidos.com",
  },

  social: {
    instagram: "https://instagram.com/teciltecidos",
    instagramHandle: "@teciltecidos",
    site: "https://www.teciltecidos.com",
  },

  hours: {
    weekdays: "Seg. a qui. — 8h às 18h (2h de intervalo)",
    friday: "Sex. — 8h às 17h, sem intervalo",
  },

  policies: {
    freteGratis: "Frete grátis para o Nordeste a partir de R$ 400",
    parcelamento: "Parcele no cartão de crédito",
    pix: "5% de desconto no PIX",
    corteMinimo: "Corte mínimo de 3 metros por tecido",
  },

  // Política de frete (valores mocados de referência — trocar pela tabela
  // real das transportadoras quando fechada). Detalhes na página /frete.
  shipping: {
    regiao: "Nordeste",
    freteGratisMinimo: 400,
    freteGratisPesoMaxKg: 20,
    estados: [
      "Alagoas",
      "Bahia",
      "Ceará",
      "Maranhão",
      "Paraíba",
      "Pernambuco",
      "Piauí",
      "Rio Grande do Norte",
      "Sergipe",
    ],
    // Faixas p/ pedidos abaixo do mínimo (~200 g por metro de tricoline).
    faixas: [
      { peso: "Até 2 kg", metros: "até ~10 m de tecido", valor: 24.9 },
      { peso: "2 a 5 kg", metros: "até ~25 m de tecido", valor: 34.9 },
      { peso: "5 a 10 kg", metros: "até ~50 m de tecido", valor: 49.9 },
      { peso: "10 a 20 kg", metros: "até ~100 m de tecido", valor: 69.9 },
    ],
  },
} as const;

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida.
 */
export function whatsappHref(message?: string): string {
  if (!message) return COMPANY.whatsapp.href;
  const url = new URL(COMPANY.whatsapp.href);
  url.searchParams.set("text", message);
  return url.toString();
}
