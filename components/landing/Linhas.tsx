import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CATEGORIAS, CATEGORIA_SLUGS, getTecidosByCategoria } from "@/lib/data/products";
import { getTecidos } from "@/lib/tiny/catalog";
import { cn } from "@/lib/utils";
import type { CategoriaSlug } from "@/types/product";

const MAX_SWATCHES = 6;

// Logos da Peripan e Santanense são brancas (só legíveis em fundo escuro);
// a da Cataguases é azul-marinho e vira branca via filtro.
const FORNECEDORES: Record<
  CategoriaSlug,
  { logo: string; nome: string; invert?: boolean }
> = {
  peripan: { logo: "/logos/logo-peripan.png", nome: "Peripan" },
  santanense: { logo: "/logos/logo-santanense.svg", nome: "Santanense" },
  "tricoline-estampada": {
    logo: "/logos/logo-cataguases.png",
    nome: "Cataguases",
    invert: true,
  },
};

export async function Linhas() {
  const todos = await getTecidos();
  const cards = CATEGORIA_SLUGS.map((slug) => {
    const categoria = CATEGORIAS[slug];
    const tecidos = getTecidosByCategoria(todos, slug);
    return {
      slug,
      titulo: categoria.titulo,
      eyebrow: categoria.eyebrow,
      intro: categoria.intro,
      fornecedor: FORNECEDORES[slug],
      swatches: tecidos.slice(0, MAX_SWATCHES),
      total: tecidos.length,
    };
  });

  return (
    <section id="linhas" className="bg-leaf-900">
      <div className="container py-20">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-300">
            Nossas linhas
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Três linhas, um só padrão de qualidade.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-leaf-100/75">
            Trabalhamos direto com as tecelagens Peripan, Santanense e
            Cataguases — do liso premium às tricolines estampadas, tudo com
            corte mínimo de 3 metros.
          </p>
        </div>

        <div className="grid divide-y divide-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {cards.map((c) => (
            <Link
              key={c.slug}
              href={`/tecidos?categoria=${c.slug}`}
              className="group flex flex-col gap-4 py-10 first:pt-0 last:pb-0 lg:px-10 lg:py-2 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="relative mb-2 h-8 w-full">
                <Image
                  src={c.fornecedor.logo}
                  alt={`Logotipo da tecelagem ${c.fornecedor.nome}`}
                  fill
                  unoptimized
                  sizes="200px"
                  className={cn(
                    "object-contain object-left",
                    c.fornecedor.invert && "brightness-0 invert",
                  )}
                />
              </div>

              <div>
                <p className="mb-2 font-semibold text-[10px] uppercase tracking-[0.08em] text-leaf-300">
                  {c.eyebrow}
                </p>
                <h3 className="text-lg font-medium text-white">{c.titulo}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {c.swatches.map((t) => (
                    <span
                      key={t.slug}
                      title={t.nome}
                      className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-leaf-900"
                    >
                      <Image
                        src={t.imagem}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <span className="font-semibold text-[11px] uppercase tracking-[0.08em] text-leaf-100/60">
                  {c.total > 0
                    ? `${c.total} ${c.total === 1 ? "tecido" : "tecidos"}`
                    : "Em breve no site"}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-leaf-100/70">
                {c.intro}
              </p>

              <span className="mt-auto inline-flex items-center gap-1 pt-2 font-semibold text-xs uppercase tracking-wider text-leaf-300 transition-all group-hover:gap-2 group-hover:text-leaf-200">
                Ver tecidos
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
