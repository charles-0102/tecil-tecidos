import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { AvailabilityBadge } from "@/components/catalog/AvailabilityBadge";
import { TecidoGrid } from "@/components/catalog/TecidoGrid";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { COMPANY, whatsappHref } from "@/lib/company";
import { CATEGORIAS, getTecidosByCategoria } from "@/lib/data/products";
import { getTecidoBySlug, getTecidos } from "@/lib/tiny/catalog";
import { formatBRL } from "@/lib/format";
import type { Tecido } from "@/types/product";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tecidos = await getTecidos();
  return tecidos.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tecido = await getTecidoBySlug(params.slug);
  if (!tecido) return { title: "Tecido não encontrado" };
  return {
    title: tecido.nome,
    description: `${tecido.nome} — ${tecido.composicao}, ${formatBRL(tecido.precoMetro)}/metro. ${tecido.descricao}`,
  };
}

function buildWhatsappMessage(tecido: Tecido): string {
  return (
    `Olá! Tenho interesse no tecido *${tecido.nome}* ` +
    `(${formatBRL(tecido.precoMetro)}/metro). ` +
    `Pode me confirmar disponibilidade e prazo de entrega?`
  );
}

export default async function Page({ params }: PageProps) {
  const tecido = await getTecidoBySlug(params.slug);
  if (!tecido) notFound();

  const categoria = CATEGORIAS[tecido.categoria];
  const relacionados = getTecidosByCategoria(await getTecidos(), tecido.categoria)
    .filter((t) => t.id !== tecido.id)
    .slice(0, 4);
  const totalCorteMinimo = tecido.precoMetro * tecido.corteMinimo;

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-warm-150 bg-warm-50">
          <div className="container py-10 md:py-16">
            <Link
              href={`/tecidos?categoria=${tecido.categoria}`}
              className="mb-8 inline-flex items-center gap-2 font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500 transition hover:text-leaf-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {categoria.titulo}
            </Link>

            <div className="grid gap-10 md:grid-cols-12 md:gap-14">
              {/* Amostra */}
              <div className="md:col-span-6">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-warm-200 bg-warm-100 shadow-md">
                  <Image
                    src={tecido.imagem}
                    alt={`Amostra do tecido ${tecido.nome}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-400">
                  Amostra ilustrativa · cores podem variar levemente na tela
                </p>
              </div>

              {/* Informações */}
              <div className="md:col-span-6">
                <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
                  {tecido.linha} · {tecido.estampa ?? "Liso"}
                </p>
                <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-warm-900 md:text-5xl">
                  {tecido.nome}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <AvailabilityBadge disponibilidade={tecido.disponibilidade} />
                  {tecido.disponibilidade === "ultimos_metros" &&
                    tecido.estoqueMetros !== null && (
                      <span className="font-semibold text-[11px] uppercase tracking-[0.05em] text-warm-500">
                        ~{tecido.estoqueMetros} m restantes
                      </span>
                    )}
                  {tecido.disponibilidade === "em_estoque" &&
                    tecido.estoqueMetros !== null && (
                      <span className="font-semibold text-[11px] uppercase tracking-[0.05em] text-warm-500">
                        {tecido.estoqueMetros} m em estoque
                      </span>
                    )}
                </div>

                <div className="mt-7 rounded-lg border border-warm-150 bg-warm-0 p-6">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-warm-900">
                      {formatBRL(tecido.precoMetro)}
                    </span>
                    <span className="font-semibold text-xs uppercase tracking-[0.05em] text-warm-500">
                      / metro
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-warm-600">
                    Corte mínimo de {tecido.corteMinimo} metros —{" "}
                    {formatBRL(totalCorteMinimo)}. {COMPANY.policies.pix}.
                  </p>

                  <a
                    href={whatsappHref(buildWhatsappMessage(tecido))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-leaf-600 px-6 text-sm font-medium text-white transition hover:bg-leaf-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Pedir pelo WhatsApp
                  </a>
                  <p className="mt-3 text-center font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-400">
                    Atendimento humano · {COMPANY.policies.freteGratis.toLowerCase()}
                  </p>
                </div>

                {/* Ficha técnica */}
                <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
                  <Field label="Composição" value={tecido.composicao} />
                  <Field label="Largura" value={tecido.largura} />
                  <Field label="Gramatura" value={tecido.gramatura} />
                  <Field label="Cor" value={tecido.cor} />
                  {tecido.estampa && <Field label="Estampa" value={tecido.estampa} />}
                  <Field label="Linha" value={tecido.linha} />
                </dl>

                <div className="mt-8">
                  <p className="mb-2 font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-500">
                    Sobre o tecido
                  </p>
                  <p className="text-sm leading-relaxed text-warm-700">
                    {tecido.descricao}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relacionados.length > 0 && (
          <section className="bg-warm-0">
            <div className="container py-16">
              <div className="mb-8 flex items-end justify-between gap-6">
                <h2 className="text-2xl font-semibold tracking-tight text-warm-900">
                  Mais da linha {categoria.titulo}
                </h2>
                <Link
                  href={`/tecidos?categoria=${tecido.categoria}`}
                  className="font-semibold text-xs uppercase tracking-wider text-leaf-700 hover:underline"
                >
                  Ver todos
                </Link>
              </div>
              <TecidoGrid tecidos={relacionados} variant="strip" />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="self-baseline font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-500">
        {label}
      </dt>
      <dd className="text-sm text-warm-900">{value}</dd>
    </>
  );
}
