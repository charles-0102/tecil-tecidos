import Image from "next/image";
import Link from "next/link";

import { AvailabilityBadge } from "@/components/catalog/AvailabilityBadge";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Tecido } from "@/types/product";

interface Props {
  tecido: Tecido;
  className?: string;
}

export function TecidoCard({ tecido, className }: Props) {
  return (
    <Link
      href={`/tecidos/${tecido.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-warm-150 bg-warm-0 transition hover:-translate-y-0.5 hover:border-warm-200 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        <Image
          src={tecido.imagem}
          alt={`Amostra do tecido ${tecido.nome}`}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <AvailabilityBadge
          disponibilidade={tecido.disponibilidade}
          className="absolute left-2 top-2 bg-warm-0/90 backdrop-blur-sm sm:left-3 sm:top-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-semibold text-[10px] uppercase tracking-[0.08em] text-leaf-700">
            {tecido.linha}
            {tecido.estampa ? ` · ${tecido.estampa}` : " · Liso"}
          </span>
          <span
            aria-hidden
            title={tecido.cor}
            className="h-3 w-3 shrink-0 rounded-full border border-warm-900/15 sm:h-3.5 sm:w-3.5"
            style={{ backgroundColor: tecido.corHex }}
          />
        </div>

        <h3 className="line-clamp-2 font-display text-sm leading-snug text-warm-900 sm:text-lg">
          {tecido.nome}
        </h3>

        <p className="hidden text-[12px] text-warm-500 sm:block">
          {tecido.composicao} · {tecido.largura} de largura
        </p>

        <div className="mt-auto flex items-baseline gap-1 pt-1.5 sm:gap-1.5 sm:pt-2">
          <span className="text-base font-semibold tracking-tight text-warm-900 sm:text-lg">
            {formatBRL(tecido.precoMetro)}
          </span>
          <span className="font-semibold text-[10px] uppercase tracking-[0.05em] text-warm-400 sm:text-[11px]">
            / metro
          </span>
        </div>
      </div>
    </Link>
  );
}
