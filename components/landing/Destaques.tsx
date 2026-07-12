import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TecidoCard } from "@/components/catalog/TecidoCard";
import { getDestaques } from "@/lib/data/products";

export function Destaques() {
  const destaques = getDestaques().slice(0, 8);

  return (
    <section id="destaques" className="border-b border-warm-150 bg-warm-0">
      <div className="container py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-leaf-700">
              Destaques
            </p>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
              Os tecidos mais pedidos da loja.
            </h2>
          </div>
          <Link
            href="/tecidos"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-leaf-700 transition hover:gap-3"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((t) => (
            <TecidoCard key={t.id} tecido={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
