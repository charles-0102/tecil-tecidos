import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";

import { COMPANY, whatsappHref } from "@/lib/company";

/**
 * Hero "sheet": a foto real da loja é o fundo e o conteúdo vive num painel
 * warm-50 ancorado embaixo no mobile (bottom sheet) e à esquerda no desktop
 * (side sheet). O Header em modo overlay flutua transparente sobre a foto.
 * Art direction via <picture>: rack de estampas no mobile, salão no desktop
 * — cada viewport baixa só a sua foto.
 */
export function Hero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: "/loja/loja-salao.jpg",
    alt: "",
    fill: true,
    sizes: "100vw",
  });
  const { props: photoProps } = getImageProps({
    src: "/loja/loja-racks.jpg",
    alt: "Interior da Tecil Tecidos em Caruaru, com racks de tecidos estampados",
    fill: true,
    priority: true,
    sizes: "100vw",
    className:
      "object-cover object-[center_30%] md:object-[72%_62%] md:brightness-105 md:saturate-[1.05]",
  });

  return (
    <section className="relative md:h-[100svh] md:max-h-[820px] md:min-h-[560px] md:border-b md:border-warm-150">
      <div className="relative h-[48svh] min-h-[320px] md:absolute md:inset-0 md:h-auto md:min-h-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          {/* eslint-disable-next-line @next/next/no-img-element -- art direction com getImageProps */}
          <img {...photoProps} alt={photoProps.alt} />
        </picture>
        {/* Faixa escura discreta só atrás do header transparente */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-warm-900/50 to-transparent md:hidden"
        />
        <p className="absolute bottom-5 right-5 hidden items-center gap-2 rounded-lg bg-warm-0/90 px-3.5 py-2 text-xs font-medium text-warm-600 backdrop-blur-sm md:inline-flex">
          <MapPin className="h-3.5 w-3.5 text-leaf-600" />
          Nossa loja em {COMPANY.location.display}
        </p>
      </div>

      <div className="relative z-10 -mt-6 rounded-t-2xl bg-warm-50 px-5 pb-9 pt-6 shadow-[0_-14px_30px_-18px_rgba(20,18,10,0.4)] sm:px-8 md:absolute md:inset-y-0 md:left-0 md:mt-0 md:flex md:w-[clamp(360px,46%,520px)] md:flex-col md:justify-center md:rounded-tl-none md:rounded-r-3xl md:px-8 md:py-24 md:shadow-[28px_0_56px_-28px_rgba(30,26,12,0.45)] lg:px-10">
        <h1 className="text-balance font-display text-[28px] font-semibold leading-[1.06] tracking-tight text-warm-900 sm:text-4xl lg:text-[42px]">
          Tecidos de algodão premium, do liso à estampa.
        </h1>

        <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-warm-600 md:mt-4 md:text-[15px]">
          Peripan, Santanense e tricolines estampadas selecionadas metro a
          metro. Veja preço e disponibilidade no site e feche seu pedido
          direto pelo WhatsApp.
        </p>

        <div className="mt-6 grid gap-2.5 md:mt-7 md:flex md:flex-wrap md:gap-3">
          <Link
            href="/tecidos"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-leaf-600 px-7 text-sm font-medium text-white transition hover:bg-leaf-700"
          >
            Ver todos os tecidos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappHref("Olá! Vi o site da Tecil Tecidos e gostaria de mais informações.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-warm-300 bg-warm-0 px-7 text-sm font-medium text-warm-800 transition hover:border-leaf-600 hover:text-leaf-700"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>

        <p className="mt-6 text-center font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-500 md:mt-8 md:text-left">
          <Link
            href="/frete"
            className="underline decoration-warm-300 underline-offset-2 transition-colors hover:text-leaf-700"
          >
            Frete grátis no Nordeste a partir de R$ 400*
          </Link>{" "}
          · Parcele no cartão · 5% off no PIX
        </p>
      </div>
    </section>
  );
}
