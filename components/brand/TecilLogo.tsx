import * as React from "react";

import { cn } from "@/lib/utils";

const LETTERS = ["T", "E", "C", "I", "L"] as const;

interface TecilLogoProps {
  className?: string;
  /** brand = verde sobre fundo claro · white = branco sobre verde/escuro. */
  variant?: "brand" | "white";
}

/**
 * Wordmark T|E|C|I|L® em serifa, fiel ao logo da loja
 * (letras separadas por filetes verticais).
 */
export function TecilLogo({ className, variant = "brand" }: TecilLogoProps) {
  return (
    <span
      aria-label="Tecil Tecidos"
      className={cn(
        "inline-flex items-start font-display font-semibold leading-none",
        variant === "brand" ? "text-leaf-600" : "text-white",
        className,
      )}
    >
      <span className="inline-flex items-center gap-[0.16em]">
        {LETTERS.map((letter, i) => (
          <React.Fragment key={letter}>
            {i > 0 && (
              <span
                aria-hidden
                className="h-[0.62em] w-[0.045em] self-center bg-current opacity-60"
              />
            )}
            <span>{letter}</span>
          </React.Fragment>
        ))}
      </span>
      <span aria-hidden className="ml-[0.14em] mt-[0.06em] text-[0.42em] opacity-80">
        ®
      </span>
    </span>
  );
}
