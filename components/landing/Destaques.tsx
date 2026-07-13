import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TecidoGrid } from "@/components/catalog/TecidoGrid";
import { getDestaques } from "@/lib/data/products";
import { getTecidos } from "@/lib/tiny/catalog";

export async function Destaques() {
  const destaques = getDestaques(await getTecidos()).slice(0, 8);

  return (
    <section id="destaques" className="border-b border-warm-150 bg-warm-0">
      <div className="container py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
              Destaques
            </p>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
              Os tecidos mais pedidos da loja.
            </h2>
          </div>
          <Link
            href="/tecidos"
            className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-leaf-700 transition hover:gap-3"
          >
            Ver catálogo completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <TecidoGrid tecidos={destaques} variant="strip" />
      </div>
    </section>
  );
}
