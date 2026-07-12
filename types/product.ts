export type CategoriaSlug = "peripan" | "santanense" | "tricoline-estampada";

export type Disponibilidade = "em_estoque" | "ultimos_metros" | "sob_consulta";

export interface Tecido {
  id: string;
  slug: string;
  nome: string;
  /** Linha/marca do tecido (Peripan, Santanense, Tricoline). */
  linha: string;
  categoria: CategoriaSlug;
  cor: string;
  /** Cor base do tecido, usada no swatch e nos filtros. */
  corHex: string;
  /** Nome da estampa quando não é liso (Poá, Floral, Borboletas...). */
  estampa: string | null;
  composicao: string;
  largura: string;
  gramatura: string;
  precoMetro: number;
  corteMinimo: number;
  disponibilidade: Disponibilidade;
  /** Metros disponíveis em estoque; null quando sob consulta. */
  estoqueMetros: number | null;
  descricao: string;
  imagem: string;
  destaque?: boolean;
}

export interface Categoria {
  slug: CategoriaSlug;
  titulo: string;
  eyebrow: string;
  intro: string;
}
