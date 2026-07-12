// Dados da Tecil Tecidos (fonte: www.teciltecidos.com).
// Centralizado para manutencao em um lugar so.
// NOTA: e-mail e Instagram sao placeholders mockados — confirmar com a loja.

export const COMPANY = {
  name: "Tecil Tecidos",
  shortName: "Tecil",
  tagline: "Tecidos de algodão premium, do liso à estampa.",
  segment: "Loja de tecidos",

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
    weekdays: "Seg. a sex. — 8h às 18h",
    saturday: "Sáb. — 9h às 13h",
  },

  policies: {
    freteGratis: "Enviamos grátis para todo o Brasil",
    parcelamento: "Parcele no cartão de crédito",
    pix: "5% de desconto no PIX",
    corteMinimo: "Corte mínimo de 3 metros por tecido",
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
