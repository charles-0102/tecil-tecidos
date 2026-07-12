import { cn } from "@/lib/utils";
import { DISPONIBILIDADE_LABEL } from "@/lib/data/products";
import type { Disponibilidade } from "@/types/product";

const styles: Record<Disponibilidade, string> = {
  em_estoque: "border-leaf-200 bg-leaf-50 text-leaf-700",
  ultimos_metros: "border-[hsl(var(--amber-500))]/30 bg-[hsl(var(--amber-50))] text-[hsl(var(--amber-600))]",
  sob_consulta: "border-warm-200 bg-warm-100 text-warm-600",
};

const dot: Record<Disponibilidade, string> = {
  em_estoque: "bg-leaf-500",
  ultimos_metros: "bg-[hsl(var(--amber-500))]",
  sob_consulta: "bg-warm-400",
};

interface Props {
  disponibilidade: Disponibilidade;
  className?: string;
}

export function AvailabilityBadge({ disponibilidade, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold text-[10px] uppercase tracking-[0.05em]",
        styles[disponibilidade],
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dot[disponibilidade])} />
      {DISPONIBILIDADE_LABEL[disponibilidade]}
    </span>
  );
}
