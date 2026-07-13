const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const brlInteiro = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatBRL(value: number): string {
  return brl.format(value);
}

/** Valores redondos sem centavos (ex.: "R$ 300", "R$ 1.000"). */
export function formatBRLInteiro(value: number): string {
  return brlInteiro.format(value);
}
