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
    freteGratis: "Frete grátis para todo o Nordeste",
    parcelamento: "Parcele no cartão de crédito",
    pix: "5% de desconto no PIX",
    corteMinimo: "Corte mínimo de 3 metros por tecido",
  },

  // Política de frete por localidade (valores mocados de referência —
  // ajustar quando a tabela real fechar). Detalhes na página /frete.
  // Regra: pedido >= `minimo` ganha frete grátis; abaixo disso o frete é
  // cotado no WhatsApp. `minimo: 0` = grátis para qualquer pedido.
  shipping: {
    regiao: "Nordeste",
    faixas: [
      {
        destino: "Caruaru, Santa Cruz do Capibaribe e Toritama",
        minimo: 0,
        prazo: "até 3 dias úteis",
      },
      {
        destino: "Recife e região metropolitana",
        minimo: 300,
        prazo: "até 10 dias úteis",
      },
      {
        destino: "Demais cidades de Pernambuco",
        minimo: 600,
        prazo: "até 10 dias úteis",
      },
      {
        destino: "Demais estados do Nordeste",
        minimo: 1000,
        prazo: "até 10 dias úteis",
      },
    ],
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
