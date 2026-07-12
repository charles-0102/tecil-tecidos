import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogClient } from "@/components/catalog/CatalogClient";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { TECIDOS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Catálogo de tecidos",
  description:
    "Todos os tecidos da Tecil: algodão premium Peripan e Santanense, mistos e tricolines estampadas. Preço por metro e disponibilidade em tempo real.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-warm-150 bg-gradient-to-b from-warm-50 to-leaf-50/40">
          <div className="container py-12 md:py-16">
            <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
              Catálogo · {TECIDOS.length} tecidos
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-warm-900 md:text-5xl">
              Todos os nossos tecidos.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-600">
              Preço por metro e disponibilidade sempre atualizados. Escolheu?
              É só chamar no WhatsApp para fechar o pedido — corte mínimo de 3
              metros e envio grátis para todo o Brasil.
            </p>
          </div>
        </section>

        <section className="bg-warm-50">
          <div className="container py-10 md:py-14">
            <Suspense fallback={<CatalogSkeleton />}>
              <CatalogClient />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-36 rounded-full" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
