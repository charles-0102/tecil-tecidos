import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-leaf-700">
          Erro 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-warm-900">
          Essa página desfiou.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-warm-600">
          O endereço que você procurou não existe — mas o catálogo inteiro está
          a um clique.
        </p>
        <Link
          href="/tecidos"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-leaf-600 px-6 text-sm font-medium text-white transition hover:bg-leaf-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao catálogo
        </Link>
      </main>
      <Footer />
    </>
  );
}
