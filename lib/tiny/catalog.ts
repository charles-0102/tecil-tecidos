// Catálogo vivo da Tecil: lê os produtos do Tiny ERP (API v2) e mapeia para
// o tipo Tecido da vitrine. O ERP é a fonte da verdade de nome, preço,
// categoria, descrição, foto e estoque; se a API falhar, o catálogo mockado
// de lib/data/products entra como fallback para o site nunca quebrar.
//
// As respostas ficam no data cache do Next por REVALIDATE_SECONDS (ISR):
// visitantes nunca disparam chamadas ao Tiny, só a revalidação periódica.

import { cache } from "react";

import { TECIDOS_MOCK } from "@/lib/data/products";
import type { CategoriaSlug, Disponibilidade, Tecido } from "@/types/product";

const TINY_V2 = "https://api.tiny.com.br/api2";
const REVALIDATE_SECONDS = 3600;
/** Limite de chamadas simultâneas — a API v2 tem cota por minuto. */
const CONCURRENCY = 3;
/** Abaixo deste saldo (em metros) o tecido vira "últimos metros". */
const LIMIAR_ULTIMOS_METROS = 15;
const PLACEHOLDER_IMAGEM = "/fabrics/placeholder.svg";

interface V2ProdutoResumo {
  id: string;
  nome: string;
  codigo: string;
  preco: number;
  preco_promocional: number;
  situacao: string;
}

interface V2ProdutoDetalhe extends V2ProdutoResumo {
  categoria: string;
  marca: string;
  descricao_complementar: string;
  anexos: Array<{ anexo: string }> | "";
}

async function tinyV2<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const token = process.env.OLIST_API_KEY;
  if (!token) throw new Error("OLIST_API_KEY não configurada");

  const search = new URLSearchParams({ token, formato: "json", ...params });
  const res = await fetch(`${TINY_V2}/${endpoint}?${search}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`Tiny ${endpoint}: HTTP ${res.status}`);

  const retorno = (await res.json())?.retorno;
  if (retorno?.status !== "OK") {
    throw new Error(
      `Tiny ${endpoint}: ${JSON.stringify(retorno?.erros ?? retorno)}`,
    );
  }
  return retorno as T;
}

async function listarProdutos(): Promise<V2ProdutoResumo[]> {
  interface Pesquisa {
    numero_paginas: number;
    produtos?: Array<{ produto: V2ProdutoResumo }>;
  }

  const resumos: V2ProdutoResumo[] = [];
  let pagina = 1;
  let totalPaginas = 1;
  do {
    const ret = await tinyV2<Pesquisa>("produtos.pesquisa.php", {
      pesquisa: "",
      situacao: "A",
      pagina: String(pagina),
    });
    totalPaginas = Number(ret.numero_paginas) || 1;
    resumos.push(...(ret.produtos ?? []).map((p) => p.produto));
    pagina += 1;
  } while (pagina <= totalPaginas);

  return resumos.filter((p) => p.situacao === "A");
}

/**
 * Executa `fn` sobre os itens em lotes de `tamanho`, preservando a ordem,
 * com pausa entre lotes para respeitar a cota por minuto da API v2.
 * Nota: são 2 chamadas por produto; se o catálogo passar de ~25 itens,
 * mover o estoque para consulta em lote ou migrar a leitura para a v3.
 */
async function emLotes<T, R>(
  itens: T[],
  tamanho: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < itens.length; i += tamanho) {
    if (i > 0) await new Promise((r) => setTimeout(r, 400));
    out.push(...(await Promise.all(itens.slice(i, i + tamanho).map(fn))));
  }
  return out;
}

// ————— Mapeamento Tiny → Tecido —————

function normalizar(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value: string): string {
  return normalizar(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapCategoria(categoria: string, marca: string): CategoriaSlug | null {
  const cat = normalizar(categoria);
  if (cat.includes("tricoline")) return "tricoline-estampada";
  if (cat.includes("peripan")) return "peripan";
  if (cat.includes("santanense")) return "santanense";
  const m = normalizar(marca);
  if (m.includes("peripan")) return "peripan";
  if (m.includes("santanense")) return "santanense";
  return null;
}

function mapLinha(marca: string, categoria: CategoriaSlug): string {
  const m = normalizar(marca);
  if (m.includes("peripan")) return "Peripan";
  if (m.includes("santanense")) return "Santanense";
  if (m.includes("cataguases")) return "Cataguases";
  return categoria === "tricoline-estampada" ? "Tricoline" : "Tecil";
}

/** Cores reconhecidas no nome do produto (ordem importa: marinho antes de azul). */
const CORES: Array<{ nome: string; hex: string; match: RegExp }> = [
  { nome: "Azul Marinho", hex: "#1e2a4a", match: /\b(?:azul\s+)?marinho\b/ },
  { nome: "Branco", hex: "#f4f2ea", match: /\bbranc[oa]\b/ },
  { nome: "Preto", hex: "#26262a", match: /\bpret[oa]\b/ },
  { nome: "Marrom", hex: "#8a6844", match: /\bmarrom\b/ },
  { nome: "Azul", hex: "#3c5a88", match: /\bazul\b/ },
  { nome: "Vermelho", hex: "#b02a30", match: /\bvermelh[oa]\b/ },
  { nome: "Verde", hex: "#5d8a58", match: /\bverde\b/ },
  { nome: "Rosa", hex: "#d98ba3", match: /\brosa\b/ },
  { nome: "Bege", hex: "#cbb487", match: /\bbege\b/ },
  { nome: "Cinza", hex: "#8a8d91", match: /\bcinza\b/ },
  { nome: "Grafite", hex: "#4a4c52", match: /\bgrafite\b/ },
  { nome: "Amarelo", hex: "#e0b64b", match: /\bamarel[oa]\b/ },
  { nome: "Laranja", hex: "#d97a3a", match: /\blaranja\b/ },
  { nome: "Roxo", hex: "#7a4d8f", match: /\brox[oa]\b/ },
  { nome: "Lilás", hex: "#b08bc9", match: /\blil[aá]s\b/ },
  { nome: "Cru", hex: "#e9e2d0", match: /\bcru\b/ },
];

function extrairCor(nome: string): { cor: string; corHex: string; match: RegExp | null } {
  const alvo = normalizar(nome);
  const achada = CORES.find((c) => c.match.test(alvo));
  if (!achada) return { cor: "Colorido", corHex: "#cbb487", match: null };
  return { cor: achada.nome, corHex: achada.hex, match: achada.match };
}

function extrairEstampa(
  nome: string,
  categoria: CategoriaSlug,
  corMatch: RegExp | null,
): string | null {
  if (categoria !== "tricoline-estampada") return null;
  let resto = nome.replace(/^tricoline\s+/i, "");
  if (corMatch) {
    resto = resto.replace(new RegExp(corMatch.source, "i"), "");
  }
  resto = resto.replace(/\s{2,}/g, " ").trim();
  return resto || null;
}

/** Extrai composição, largura e gramatura da descrição livre do ERP. */
function extrairFicha(descricao: string) {
  const composicao = descricao
    .match(/\d+%\s*[\p{L}]+(?:\s+\d+%\s*[\p{L}]+)*/u)?.[0]
    ?.trim();
  const largura = descricao.match(/largura\s*(?:de\s*)?([\d.,]+)\s*m/i)?.[1];
  const gramatura = descricao.match(/gramatura\s*(?:de\s*)?([\d.,]+)\s*g/i)?.[1];
  return {
    composicao: composicao ?? "100% algodão",
    largura: largura ? `${largura} m` : "sob consulta",
    gramatura: gramatura ? `${gramatura} g/m²` : "sob consulta",
  };
}

function mapDisponibilidade(saldo: number): {
  disponibilidade: Disponibilidade;
  estoqueMetros: number | null;
} {
  if (saldo <= 0) return { disponibilidade: "sob_consulta", estoqueMetros: null };
  if (saldo < LIMIAR_ULTIMOS_METROS) {
    return { disponibilidade: "ultimos_metros", estoqueMetros: saldo };
  }
  return { disponibilidade: "em_estoque", estoqueMetros: saldo };
}

async function montarTecido(resumo: V2ProdutoResumo): Promise<Tecido | null> {
  try {
    const { produto } = await tinyV2<{ produto: V2ProdutoDetalhe }>(
      "produto.obter.php",
      { id: resumo.id },
    );

    const categoria = mapCategoria(produto.categoria ?? "", produto.marca ?? "");
    if (!categoria) {
      console.warn(
        `[tiny] ${produto.codigo} "${produto.nome}": categoria "${produto.categoria}" sem linha correspondente na vitrine — ignorado`,
      );
      return null;
    }

    // Unidade no ERP é tratada como metro (venda por metro, corte mínimo 3 m).
    let saldo = 0;
    try {
      const estoque = await tinyV2<{ produto: { saldo: number } }>(
        "produto.obter.estoque.php",
        { id: resumo.id },
      );
      saldo = Math.max(0, Math.floor(Number(estoque.produto.saldo) || 0));
    } catch {
      saldo = 0; // estoque indisponível → sob consulta
    }

    const { cor, corHex, match } = extrairCor(produto.nome);
    const descricao = produto.descricao_complementar?.trim() || "";
    const ficha = extrairFicha(descricao);
    const anexos = Array.isArray(produto.anexos) ? produto.anexos : [];
    const imagem =
      anexos.map((a) => a.anexo).find((url) => url?.startsWith("https://")) ??
      PLACEHOLDER_IMAGEM;
    const preco = Number(produto.preco_promocional) || Number(produto.preco) || 0;

    return {
      id: String(produto.id),
      slug: slugify(produto.nome),
      nome: produto.nome,
      linha: mapLinha(produto.marca ?? "", categoria),
      categoria,
      cor,
      corHex,
      estampa: extrairEstampa(produto.nome, categoria, match),
      ...ficha,
      precoMetro: preco,
      corteMinimo: 3,
      ...mapDisponibilidade(saldo),
      descricao:
        descricao ||
        `${produto.nome} — fale com a gente no WhatsApp para mais detalhes.`,
      imagem,
    };
  } catch (error) {
    console.warn(`[tiny] falha ao carregar produto ${resumo.codigo}:`, error);
    return null;
  }
}

/**
 * Catálogo completo vindo do ERP, na ordem da API (alfabética).
 * `cache` do React deduplica chamadas dentro de uma mesma renderização
 * (landing e catálogo pedem os mesmos dados).
 */
export const getTecidos = cache(async (): Promise<Tecido[]> => {
  try {
    const resumos = await listarProdutos();
    const tecidos = (await emLotes(resumos, CONCURRENCY, montarTecido)).filter(
      (t): t is Tecido => t !== null,
    );
    // Falha pontual (categoria não mapeada) é tolerada; se boa parte do
    // catálogo não montou (ex.: API bloqueada no meio), descarta a
    // atualização parcial em vez de publicar o site pela metade.
    if (resumos.length > 0 && tecidos.length < resumos.length * 0.7) {
      throw new Error(
        `apenas ${tecidos.length}/${resumos.length} produtos montados`,
      );
    }
    return tecidos;
  } catch (error) {
    console.warn("[tiny] catálogo do ERP indisponível — usando mock:", error);
    return TECIDOS_MOCK;
  }
});

export async function getTecidoBySlug(slug: string): Promise<Tecido | undefined> {
  return (await getTecidos()).find((t) => t.slug === slug);
}
