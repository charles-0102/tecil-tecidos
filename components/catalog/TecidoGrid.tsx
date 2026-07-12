import { TecidoCard } from "@/components/catalog/TecidoCard";
import { cn } from "@/lib/utils";
import type { Tecido } from "@/types/product";

type GridVariant = "catalog" | "strip";

/**
 * Dono único do grid de tecidos. Todas as vitrines começam 2-up no mobile
 * (modelo Mercado Livre); a variante só muda a densidade no desktop:
 *  - `catalog`: catálogo completo (3 → 4 colunas em telas largas)
 *  - `strip`:   faixas curtas de destaques/relacionados (fecham a linha em 4)
 */
export const tecidoGridClass: Record<GridVariant, string> = {
  catalog: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4",
  strip: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
};

interface Props {
  tecidos: Tecido[];
  variant?: GridVariant;
  className?: string;
}

export function TecidoGrid({ tecidos, variant = "catalog", className }: Props) {
  return (
    <div className={cn(tecidoGridClass[variant], className)}>
      {tecidos.map((tecido) => (
        <TecidoCard key={tecido.id} tecido={tecido} />
      ))}
    </div>
  );
}
