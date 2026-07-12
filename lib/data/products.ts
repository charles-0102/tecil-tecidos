// Catálogo mockado da Tecil Tecidos — sem banco de dados por enquanto.
// Produtos baseados nas linhas reais da loja (Peripan, Santanense,
// Tricoline Estampada); estoque e medidas são fictícios.

import type { Categoria, CategoriaSlug, Disponibilidade, Tecido } from "@/types/product";

export const CATEGORIAS: Record<CategoriaSlug, Categoria> = {
  peripan: {
    slug: "peripan",
    titulo: "Peripan · Liso",
    eyebrow: "Algodão premium",
    intro:
      "Algodão 100% premium da Peripan — toque macio, cores sólidas e caimento perfeito para vestuário, patchwork e enxoval.",
  },
  santanense: {
    slug: "santanense",
    titulo: "Santanense · Liso",
    eyebrow: "Tradição mineira",
    intro:
      "A tradição da Santanense em tecidos lisos de algodão — firmeza, durabilidade e acabamento impecável para peças que duram.",
  },
  "tricoline-estampada": {
    slug: "tricoline-estampada",
    titulo: "Tricoline Estampada",
    eyebrow: "Estampas exclusivas",
    intro:
      "Tricolines 100% algodão com estampas cheias de personalidade — do poá clássico aos florais e xadrezes que dão vida a qualquer projeto.",
  },
};

export const CATEGORIA_SLUGS = Object.keys(CATEGORIAS) as CategoriaSlug[];

export function isCategoriaSlug(value: string): value is CategoriaSlug {
  return (CATEGORIA_SLUGS as string[]).includes(value);
}

export const DISPONIBILIDADE_LABEL: Record<Disponibilidade, string> = {
  em_estoque: "Em estoque",
  ultimos_metros: "Últimos metros",
  sob_consulta: "Sob consulta",
};

const PERIPAN_BASE = {
  linha: "Peripan",
  categoria: "peripan" as const,
  estampa: null,
  composicao: "100% algodão",
  largura: "1,60 m",
  gramatura: "130 g/m²",
  precoMetro: 19.9,
  corteMinimo: 3,
};

const SANTANENSE_BASE = {
  linha: "Santanense",
  categoria: "santanense" as const,
  estampa: null,
  composicao: "100% algodão",
  largura: "1,60 m",
  gramatura: "140 g/m²",
  precoMetro: 21.9,
  corteMinimo: 3,
};

const MISTO_BASE = {
  linha: "Peripan",
  categoria: "peripan" as const,
  estampa: null,
  composicao: "60% algodão · 40% poliéster",
  largura: "1,60 m",
  gramatura: "115 g/m²",
  precoMetro: 14.9,
  corteMinimo: 3,
};

const TRICOLINE_BASE = {
  linha: "Tricoline",
  categoria: "tricoline-estampada" as const,
  composicao: "100% algodão",
  largura: "1,50 m",
  gramatura: "125 g/m²",
  precoMetro: 25.9,
  corteMinimo: 3,
};

export const TECIDOS: Tecido[] = [
  // ————— Peripan · Algodão Premium (liso) —————
  {
    id: "per-001",
    slug: "algodao-premium-branco",
    nome: "Algodão Premium Branco",
    cor: "Branco",
    corHex: "#f4f2ea",
    disponibilidade: "em_estoque",
    estoqueMetros: 240,
    descricao:
      "O clássico indispensável: algodão premium branco de trama fechada e toque sedoso. Base perfeita para camisaria, forros, enxoval de bebê e tingimentos artesanais.",
    imagem: "/fabrics/algodao-premium-branco.svg",
    destaque: true,
    ...PERIPAN_BASE,
  },
  {
    id: "per-002",
    slug: "algodao-premium-azul-royal",
    nome: "Algodão Premium Azul Royal",
    cor: "Azul Royal",
    corHex: "#2b4c9b",
    disponibilidade: "em_estoque",
    estoqueMetros: 180,
    descricao:
      "Azul royal vibrante com cor sólida e uniforme. Ótimo para uniformes escolares, camisaria e projetos de decoração que pedem presença.",
    imagem: "/fabrics/algodao-premium-azul-royal.svg",
    destaque: true,
    ...PERIPAN_BASE,
  },
  {
    id: "per-003",
    slug: "algodao-premium-cinza",
    nome: "Algodão Premium Cinza",
    cor: "Cinza",
    corHex: "#8a8d91",
    disponibilidade: "ultimos_metros",
    estoqueMetros: 12,
    descricao:
      "Cinza médio neutro e elegante, fácil de combinar. Vai bem de alfaiataria leve a acessórios e artesanato fino.",
    imagem: "/fabrics/algodao-premium-cinza.svg",
    destaque: true,
    ...PERIPAN_BASE,
  },
  {
    id: "per-004",
    slug: "algodao-premium-preto",
    nome: "Algodão Premium Preto",
    cor: "Preto",
    corHex: "#26262a",
    disponibilidade: "em_estoque",
    estoqueMetros: 150,
    descricao:
      "Preto profundo com tingimento de alta fixação, que resiste a lavagens sem desbotar. Essencial para vestuário e forros.",
    imagem: "/fabrics/algodao-premium-preto.svg",
    ...PERIPAN_BASE,
  },
  {
    id: "per-005",
    slug: "algodao-premium-vermelho",
    nome: "Algodão Premium Vermelho",
    cor: "Vermelho",
    corHex: "#b02a30",
    disponibilidade: "em_estoque",
    estoqueMetros: 96,
    descricao:
      "Vermelho quente e intenso, cor de festa e de destaque. Perfeito para datas comemorativas, decoração e peças statement.",
    imagem: "/fabrics/algodao-premium-vermelho.svg",
    ...PERIPAN_BASE,
  },
  {
    id: "per-006",
    slug: "algodao-premium-verde-bandeira",
    nome: "Algodão Premium Verde Bandeira",
    cor: "Verde Bandeira",
    corHex: "#2e7d4f",
    disponibilidade: "sob_consulta",
    estoqueMetros: null,
    descricao:
      "Verde bandeira vivo, presença garantida em uniformes, bandeiras e decoração temática. Disponibilidade sob consulta — chegam novos rolos toda semana.",
    imagem: "/fabrics/algodao-premium-verde-bandeira.svg",
    ...PERIPAN_BASE,
  },

  // ————— Peripan · Misto Premium (60/40) —————
  {
    id: "mis-001",
    slug: "misto-premium-branco",
    nome: "Misto Premium Branco",
    cor: "Branco",
    corHex: "#f6f4ee",
    disponibilidade: "em_estoque",
    estoqueMetros: 320,
    descricao:
      "Mescla premium de 60% algodão e 40% poliéster: amassa menos, seca rápido e mantém o toque natural do algodão. Excelente custo-benefício para uniformes e enxoval.",
    imagem: "/fabrics/misto-premium-branco.svg",
    destaque: true,
    ...MISTO_BASE,
  },
  {
    id: "mis-002",
    slug: "misto-premium-azul",
    nome: "Misto Premium Azul",
    cor: "Azul",
    corHex: "#39598f",
    disponibilidade: "em_estoque",
    estoqueMetros: 210,
    descricao:
      "Azul sereno em base mista 60/40 — resistente ao uso diário e às lavagens frequentes. O favorito para uniformes profissionais.",
    imagem: "/fabrics/misto-premium-azul.svg",
    ...MISTO_BASE,
  },
  {
    id: "mis-003",
    slug: "misto-premium-cinza",
    nome: "Misto Premium Cinza",
    cor: "Cinza",
    corHex: "#95979b",
    disponibilidade: "ultimos_metros",
    estoqueMetros: 9,
    descricao:
      "Cinza claro versátil em base mista — leve, prático e com ótimo caimento para o dia a dia.",
    imagem: "/fabrics/misto-premium-cinza.svg",
    ...MISTO_BASE,
  },
  {
    id: "mis-004",
    slug: "misto-premium-grafite",
    nome: "Misto Premium Grafite",
    cor: "Grafite",
    corHex: "#4a4c52",
    disponibilidade: "em_estoque",
    estoqueMetros: 140,
    descricao:
      "Grafite sóbrio e moderno, esconde o desgaste do uso intenso. Muito pedido para aventais, uniformes e acessórios.",
    imagem: "/fabrics/misto-premium-grafite.svg",
    ...MISTO_BASE,
  },

  // ————— Santanense · Liso —————
  {
    id: "san-001",
    slug: "santanense-liso-branco",
    nome: "Santanense Liso Branco",
    cor: "Branco",
    corHex: "#f5f3ec",
    disponibilidade: "em_estoque",
    estoqueMetros: 200,
    descricao:
      "O liso branco da Santanense: fibra penteada, trama firme e acabamento superior. Referência em qualidade para camisaria e cama, mesa e banho.",
    imagem: "/fabrics/santanense-liso-branco.svg",
    ...SANTANENSE_BASE,
  },
  {
    id: "san-002",
    slug: "santanense-liso-azul-marinho",
    nome: "Santanense Liso Azul Marinho",
    cor: "Azul Marinho",
    corHex: "#1e2a4a",
    disponibilidade: "em_estoque",
    estoqueMetros: 165,
    descricao:
      "Azul marinho profundo e atemporal — elegância discreta para alfaiataria leve, uniformes e decoração clássica.",
    imagem: "/fabrics/santanense-liso-azul-marinho.svg",
    destaque: true,
    ...SANTANENSE_BASE,
  },
  {
    id: "san-003",
    slug: "santanense-liso-rosa",
    nome: "Santanense Liso Rosa",
    cor: "Rosa",
    corHex: "#d98ba3",
    disponibilidade: "ultimos_metros",
    estoqueMetros: 14,
    descricao:
      "Rosa suave e delicado, queridinho para enxoval de bebê, festas e artesanato. Últimos metros do lote atual.",
    imagem: "/fabrics/santanense-liso-rosa.svg",
    ...SANTANENSE_BASE,
  },
  {
    id: "san-004",
    slug: "santanense-liso-bege",
    nome: "Santanense Liso Bege",
    cor: "Bege",
    corHex: "#cbb487",
    disponibilidade: "em_estoque",
    estoqueMetros: 110,
    descricao:
      "Bege areia sofisticado, o neutro perfeito para decoração natural, cortinas leves e peças de linho-look.",
    imagem: "/fabrics/santanense-liso-bege.svg",
    ...SANTANENSE_BASE,
  },

  // ————— Tricoline Estampada —————
  {
    id: "tri-001",
    slug: "tricoline-borboletas-marrom",
    nome: "Tricoline Borboletas Marrom",
    cor: "Marrom",
    corHex: "#8a6844",
    estampa: "Borboletas",
    disponibilidade: "em_estoque",
    estoqueMetros: 85,
    descricao:
      "Fundo marrom acolhedor com revoada de borboletas em tons de creme — a estampa mais querida da casa. Tricoline 100% algodão com toque acetinado.",
    imagem: "/fabrics/tricoline-borboletas-marrom.svg",
    destaque: true,
    ...TRICOLINE_BASE,
  },
  {
    id: "tri-002",
    slug: "tricoline-poa-preto",
    nome: "Tricoline Poá Preto e Branco",
    cor: "Preto",
    corHex: "#2b2b2f",
    estampa: "Poá",
    disponibilidade: "em_estoque",
    estoqueMetros: 120,
    descricao:
      "O poá que nunca sai de moda: bolinhas brancas sobre fundo preto, em tricoline de primeira. De vestidos a laços e acessórios.",
    imagem: "/fabrics/tricoline-poa-preto.svg",
    destaque: true,
    ...TRICOLINE_BASE,
  },
  {
    id: "tri-003",
    slug: "tricoline-floral-verde",
    nome: "Tricoline Floral Verde",
    cor: "Verde",
    corHex: "#5d8a58",
    estampa: "Floral",
    disponibilidade: "em_estoque",
    estoqueMetros: 95,
    descricao:
      "Jardim em tricoline: florzinhas em creme e rosa sobre fundo verde folha. Encanta em vestidos, necessaires e decoração afetiva.",
    imagem: "/fabrics/tricoline-floral-verde.svg",
    ...TRICOLINE_BASE,
  },
  {
    id: "tri-004",
    slug: "tricoline-xadrez-vichy-vermelho",
    nome: "Tricoline Xadrez Vichy Vermelho",
    cor: "Vermelho",
    corHex: "#c04040",
    estampa: "Xadrez Vichy",
    disponibilidade: "ultimos_metros",
    estoqueMetros: 8,
    descricao:
      "O xadrez vichy clássico em vermelho e branco — piquenique, junino e cozinha afetiva. Últimos metros do rolo.",
    imagem: "/fabrics/tricoline-xadrez-vichy-vermelho.svg",
    ...TRICOLINE_BASE,
  },
  {
    id: "tri-005",
    slug: "tricoline-listras-azul",
    nome: "Tricoline Listras Azul",
    cor: "Azul",
    corHex: "#3c5a88",
    estampa: "Listras",
    disponibilidade: "sob_consulta",
    estoqueMetros: null,
    descricao:
      "Listras finas azul e off-white, frescor náutico para camisas, pijamas e roupa de cama. Reposição a caminho — consulte disponibilidade.",
    imagem: "/fabrics/tricoline-listras-azul.svg",
    ...TRICOLINE_BASE,
  },
];

export function getTecidoBySlug(slug: string): Tecido | undefined {
  return TECIDOS.find((t) => t.slug === slug);
}

export function getTecidosByCategoria(categoria: CategoriaSlug): Tecido[] {
  return TECIDOS.filter((t) => t.categoria === categoria);
}

export function getDestaques(): Tecido[] {
  return TECIDOS.filter((t) => t.destaque);
}

/** Cores únicas do catálogo, para o filtro de cor. */
export function getCores(): string[] {
  return [...new Set(TECIDOS.map((t) => t.cor))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
