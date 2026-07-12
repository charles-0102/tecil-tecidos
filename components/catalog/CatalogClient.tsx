"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Search, X } from "lucide-react";

import { TecidoGrid } from "@/components/catalog/TecidoGrid";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/select";
import { whatsappHref } from "@/lib/company";
import {
  CATEGORIAS,
  CATEGORIA_SLUGS,
  DISPONIBILIDADE_LABEL,
  TECIDOS,
  getCores,
  isCategoriaSlug,
} from "@/lib/data/products";
import { cn } from "@/lib/utils";
import type { Disponibilidade, Tecido } from "@/types/product";

type Ordenacao = "relevancia" | "menor-preco" | "maior-preco" | "nome";

const DISPONIBILIDADES = Object.keys(DISPONIBILIDADE_LABEL) as Disponibilidade[];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(tecido: Tecido, query: string): boolean {
  const q = normalize(query);
  return [tecido.nome, tecido.linha, tecido.cor, tecido.estampa ?? "", tecido.composicao]
    .some((field) => normalize(field).includes(q));
}

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriaParam = searchParams.get("categoria") ?? "";
  const categoria = isCategoriaSlug(categoriaParam) ? categoriaParam : "todas";

  const [q, setQ] = React.useState("");
  const [cor, setCor] = React.useState("todas");
  const [disponibilidade, setDisponibilidade] = React.useState("todas");
  const [ordenar, setOrdenar] = React.useState<Ordenacao>("relevancia");

  const setCategoria = React.useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === "todas") params.delete("categoria");
      else params.set("categoria", slug);
      const qs = params.toString();
      router.replace(qs ? `/tecidos?${qs}` : "/tecidos", { scroll: false });
    },
    [router, searchParams],
  );

  const cores = React.useMemo(() => getCores(), []);

  const filtrados = React.useMemo(() => {
    let result = TECIDOS.filter((t) => {
      if (categoria !== "todas" && t.categoria !== categoria) return false;
      if (cor !== "todas" && t.cor !== cor) return false;
      if (disponibilidade !== "todas" && t.disponibilidade !== disponibilidade)
        return false;
      if (q.trim() && !matchesQuery(t, q.trim())) return false;
      return true;
    });

    if (ordenar === "menor-preco") {
      result = [...result].sort((a, b) => a.precoMetro - b.precoMetro);
    } else if (ordenar === "maior-preco") {
      result = [...result].sort((a, b) => b.precoMetro - a.precoMetro);
    } else if (ordenar === "nome") {
      result = [...result].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    }
    return result;
  }, [categoria, cor, disponibilidade, q, ordenar]);

  const hasFilters =
    categoria !== "todas" || cor !== "todas" || disponibilidade !== "todas" || q.trim() !== "";

  const clearFilters = () => {
    setQ("");
    setCor("todas");
    setDisponibilidade("todas");
    setOrdenar("relevancia");
    setCategoria("todas");
  };

  return (
    <div>
      {/* Pills de categoria */}
      <div className="flex flex-wrap gap-2">
        <CategoriaPill
          active={categoria === "todas"}
          onClick={() => setCategoria("todas")}
        >
          Todas as linhas
        </CategoriaPill>
        {CATEGORIA_SLUGS.map((slug) => (
          <CategoriaPill
            key={slug}
            active={categoria === slug}
            onClick={() => setCategoria(slug)}
          >
            {CATEGORIAS[slug].titulo}
          </CategoriaPill>
        ))}
      </div>

      {/* Busca + filtros */}
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_200px_190px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, cor ou estampa…"
            aria-label="Buscar tecido"
            className="pl-9"
          />
        </div>

        <NativeSelect
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          aria-label="Filtrar por cor"
        >
          <option value="todas">Todas as cores</option>
          {cores.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </NativeSelect>

        <NativeSelect
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          aria-label="Filtrar por disponibilidade"
        >
          <option value="todas">Qualquer estoque</option>
          {DISPONIBILIDADES.map((d) => (
            <option key={d} value={d}>
              {DISPONIBILIDADE_LABEL[d]}
            </option>
          ))}
        </NativeSelect>

        <NativeSelect
          value={ordenar}
          onChange={(e) => setOrdenar(e.target.value as Ordenacao)}
          aria-label="Ordenar"
        >
          <option value="relevancia">Mais relevantes</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="nome">Nome (A–Z)</option>
        </NativeSelect>
      </div>

      {/* Contagem + limpar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500">
          {filtrados.length} {filtrados.length === 1 ? "tecido" : "tecidos"}
          {categoria !== "todas" && ` · ${CATEGORIAS[categoria].titulo}`}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-[0.05em] text-warm-500 transition hover:text-leaf-700"
          >
            <X className="h-3.5 w-3.5" />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid */}
      {filtrados.length > 0 ? (
        <TecidoGrid tecidos={filtrados} className="mt-6" />
      ) : (
        <EmptyState onClear={clearFilters} />
      )}
    </div>
  );
}

function CategoriaPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-4 text-[11px] font-medium uppercase tracking-[0.05em] transition",
        active
          ? "border-leaf-600 bg-leaf-600 text-white"
          : "border-warm-200 bg-warm-0 text-warm-600 hover:border-leaf-400 hover:text-leaf-700",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-warm-200 bg-warm-0 px-6 py-16 text-center">
      <p className="font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500">
        Nenhum resultado
      </p>
      <h3 className="mt-3 text-xl font-medium text-warm-900">
        Não encontramos esse tecido por aqui.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-warm-600">
        Tente ajustar os filtros — ou fale com a gente: às vezes o tecido está
        chegando na próxima remessa.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-warm-300 px-5 text-sm font-medium text-warm-800 transition hover:border-leaf-600 hover:text-leaf-700"
        >
          <X className="h-4 w-4" />
          Limpar filtros
        </button>
        <a
          href={whatsappHref("Olá! Procurei um tecido no site da Tecil e não encontrei. Podem me ajudar?")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-leaf-600 px-5 text-sm font-medium text-white transition hover:bg-leaf-700"
        >
          <MessageCircle className="h-4 w-4" />
          Perguntar no WhatsApp
        </a>
      </div>
    </div>
  );
}
