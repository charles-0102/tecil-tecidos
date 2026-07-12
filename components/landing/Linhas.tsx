import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CATEGORIAS, CATEGORIA_SLUGS, getTecidosByCategoria } from "@/lib/data/products";

const cards = CATEGORIA_SLUGS.map((slug) => {
  const categoria = CATEGORIAS[slug];
  const tecidos = getTecidosByCategoria(slug);
  return {
    slug,
    titulo: categoria.titulo,
    eyebrow: categoria.eyebrow,
    intro: categoria.intro,
    capa: tecidos.find((t) => t.destaque)?.imagem ?? tecidos[0]?.imagem,
    total: tecidos.length,
  };
});

export function Linhas() {
  return (
    <section id="linhas" className="border-b border-warm-150 bg-warm-50">
      <div className="container py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-leaf-700">
            Nossas linhas
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
            Três linhas, um só padrão de qualidade.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-warm-600">
            Do liso premium da Peripan e da Santanense às tricolines estampadas
            que dão personalidade a qualquer projeto — tudo com corte mínimo de
            3 metros.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.slug}
              href={`/tecidos?categoria=${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-warm-150 bg-warm-0 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
                {c.capa && (
                  <Image
                    src={c.capa}
                    alt={c.titulo}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-warm-900/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  {c.total} {c.total === 1 ? "tecido" : "tecidos"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-leaf-700">
                  {c.eyebrow}
                </p>
                <h3 className="text-lg font-medium text-warm-900">{c.titulo}</h3>
                <p className="text-sm leading-relaxed text-warm-600">{c.intro}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 font-mono text-xs uppercase tracking-wider text-leaf-700 transition group-hover:gap-2">
                  Ver tecidos
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
