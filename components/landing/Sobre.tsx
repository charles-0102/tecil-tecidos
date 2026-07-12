import Image from "next/image";

import { TecilSelo } from "@/components/brand/TecilSelo";

const numeros = [
  { value: "20+", label: "Anos de mercado" },
  { value: "100%", label: "Algodão premium" },
  { value: "R$ 400+", label: "Frete grátis no Nordeste" },
  { value: "3 m", label: "Corte mínimo" },
];

export function Sobre() {
  return (
    <section id="sobre" className="border-b border-warm-150 bg-warm-0">
      <div className="container py-20">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
              Sobre a Tecil
            </p>
            <h2 className="mb-8 text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
              Tecido bom se escolhe pelo toque — e pela confiança.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-warm-600">
              <p>
                Há mais de 20 anos em Caruaru – PE, a Tecil Tecidos nasceu da
                paixão por tecido de verdade: algodão premium de tramas firmes,
                cores sólidas que não desbotam e estampas escolhidas uma a uma.
              </p>
              <p>
                Trabalhamos com linhas consagradas — Peripan e Santanense nos
                lisos, tricolines estampadas na dose certa de personalidade —
                e para todo o Nordeste o frete é grátis a partir de R$ 400,
                com corte mínimo de apenas 3 metros.
              </p>
              <p>
                Aqui o atendimento é de loja de bairro, porque somos uma: você
                escolhe no site, tira dúvidas pelo WhatsApp e recebe em casa.
                Simples assim.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <SobreAlbum />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-warm-150 bg-warm-150 sm:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.label} className="bg-warm-0 p-6">
              <div className="text-2xl font-semibold tracking-tight text-warm-900 md:text-3xl">
                {n.value}
              </div>
              <div className="mt-2 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Álbum da loja: duas fotos em moldura de "foto revelada" + selo circular
 * sobreposto, no espírito de colagem do design system.
 */
function SobreAlbum() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
      <figure className="absolute left-0 top-[4%] w-[62%] -rotate-2 rounded-md border border-warm-200 bg-warm-0 p-2.5 pb-3 shadow-[0_22px_48px_-20px_rgba(40,36,20,0.45)]">
        <Image
          src="/loja/loja-estampas.jpg"
          alt="Racks de tecidos estampados no salão da Tecil"
          width={600}
          height={800}
          sizes="(min-width: 768px) 280px, 60vw"
          className="h-auto w-full rounded-[3px]"
        />
        <figcaption className="px-1 pt-2 text-[11px] font-semibold tracking-[0.02em] text-warm-600">
          O salão de estampas
        </figcaption>
      </figure>

      <figure className="absolute bottom-0 right-0 z-10 w-[48%] rotate-2 rounded-md border border-warm-200 bg-warm-0 p-2.5 pb-3 shadow-[0_22px_48px_-20px_rgba(40,36,20,0.45)]">
        <Image
          src="/loja/loja-racks.jpg"
          alt="Rolos de tricoline colorida na loja"
          width={600}
          height={800}
          sizes="(min-width: 768px) 210px, 46vw"
          className="h-auto w-full rounded-[3px]"
        />
        <figcaption className="px-1 pt-2 text-[11px] font-semibold tracking-[0.02em] text-warm-600">
          Tricolines metro a metro
        </figcaption>
      </figure>

      <TecilSelo className="absolute -top-3 right-[3%] z-20 w-28 rotate-[9deg] drop-shadow-[0_10px_22px_rgba(42,111,36,0.35)] md:w-32" />
    </div>
  );
}
