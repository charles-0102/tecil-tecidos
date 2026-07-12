import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { whatsappHref } from "@/lib/company";
import { getDestaques } from "@/lib/data/products";
import { formatBRL } from "@/lib/format";
import type { Tecido } from "@/types/product";

export function Hero() {
  const destaques = getDestaques().slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-leaf-100/60 bg-gradient-to-b from-warm-50 via-warm-50 to-leaf-50/70">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-8%] h-[480px] w-[480px] rounded-full bg-leaf-100/50 blur-3xl"
      />
      <div className="relative z-10 container grid items-center gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24 lg:py-28">
        <div className="md:col-span-7">
          <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
            Loja de tecidos · Envio grátis para todo o Brasil
          </p>
          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight text-warm-900 md:text-6xl lg:text-7xl">
            Tecidos de algodão premium, do liso à estampa.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-600 md:text-lg">
            Peripan, Santanense e tricolines estampadas selecionadas metro a
            metro. Veja preço e disponibilidade no site e feche seu pedido
            direto pelo WhatsApp.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/tecidos"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-leaf-600 px-7 text-sm font-medium text-white transition hover:bg-leaf-700"
            >
              Ver todos os tecidos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref("Olá! Vi o site da Tecil Tecidos e gostaria de mais informações.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-warm-300 bg-warm-0/60 px-7 text-sm font-medium text-warm-800 transition hover:border-leaf-600 hover:text-leaf-700"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>

          <p className="mt-9 font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500">
            Corte mínimo de 3 metros · Parcele no cartão · 5% off no PIX
          </p>
        </div>

        <div className="md:col-span-5">
          <HeroCollage destaques={destaques} />
        </div>
      </div>
    </section>
  );
}

function HeroCollage({ destaques }: { destaques: Tecido[] }) {
  const [primary, secondary, tertiary] = destaques;
  if (!primary) return null;

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[440px] animate-fade-in-up [animation-delay:160ms] sm:h-[500px]">
      <div className="absolute right-0 top-0 w-[230px] md:animate-float sm:w-[260px]">
        <SwatchCard tecido={primary} priority />
      </div>
      {secondary && (
        <div className="absolute bottom-10 left-0 w-[210px] md:animate-float [animation-delay:1.4s] sm:w-[240px]">
          <SwatchCard tecido={secondary} />
        </div>
      )}
      {tertiary && (
        <div className="absolute bottom-0 right-10 hidden w-[190px] md:animate-float [animation-delay:2.6s] lg:block">
          <SwatchCard tecido={tertiary} />
        </div>
      )}
    </div>
  );
}

function SwatchCard({ tecido, priority }: { tecido: Tecido; priority?: boolean }) {
  return (
    <Link
      href={`/tecidos/${tecido.slug}`}
      className="block overflow-hidden rounded-lg border border-warm-200 bg-warm-0 shadow-[0_24px_48px_-16px_rgba(60,60,30,0.35)] ring-1 ring-warm-0/40 transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-square bg-warm-100">
        <Image
          src={tecido.imagem}
          alt={`Amostra do tecido ${tecido.nome}`}
          fill
          priority={priority}
          sizes="(min-width: 640px) 260px, 230px"
          className="object-cover"
        />
      </div>
      <div className="space-y-1 px-3.5 py-3">
        <p className="truncate font-semibold text-[10px] uppercase tracking-[0.08em] text-leaf-700">
          {tecido.linha} · {tecido.composicao}
        </p>
        <h3 className="truncate font-display text-base leading-tight text-warm-900">
          {tecido.nome}
        </h3>
        <p className="text-[11px] font-medium text-warm-600">
          {formatBRL(tecido.precoMetro)} <span className="text-warm-400">/ metro</span>
        </p>
      </div>
    </Link>
  );
}
