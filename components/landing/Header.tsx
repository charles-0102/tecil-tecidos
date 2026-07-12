"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { TecilLogo } from "@/components/brand/TecilLogo";
import { COMPANY, whatsappHref } from "@/lib/company";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/tecidos", label: "Tecidos" },
  { href: "/#linhas", label: "Linhas" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

interface HeaderProps {
  /**
   * Home: começa transparente sobre a foto do hero e vira verde ao rolar.
   * Demais páginas (sem foto sob o header): verde fixo, comportamento padrão.
   */
  overlay?: boolean;
}

export function Header({ overlay = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;

  return (
    <header
      className={cn(
        "top-0 z-40 border-b transition-colors duration-300",
        overlay ? "fixed inset-x-0" : "sticky",
        solid
          ? "border-leaf-700/30 bg-leaf-500"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container flex flex-col items-center gap-3 py-4 sm:h-16 sm:flex-row sm:justify-between sm:gap-8 sm:py-0">
        <Link href="/" aria-label="Tecil Tecidos — página inicial" className="flex items-baseline gap-3">
          {/* Transparente: no desktop a logo senta sobre o sheet claro (verde);
              no mobile, sobre a foto com o degradê (branca). */}
          <TecilLogo variant="white" className={cn("text-[26px]", !solid && "md:hidden")} />
          {!solid && <TecilLogo variant="brand" className="hidden text-[26px] md:inline-flex" />}
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
          <nav
            className={cn(
              "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7",
              !solid &&
                "sm:gap-x-6 sm:rounded-full sm:bg-warm-0/85 sm:px-5 sm:py-2 sm:shadow-xs sm:backdrop-blur",
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.08em] transition-colors",
                  solid
                    ? "text-white/85 hover:text-white"
                    : "text-white/90 hover:text-white sm:text-warm-600 sm:hover:text-leaf-700",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={whatsappHref(
              "Olá! Estava no site da Tecil Tecidos e gostaria de atendimento.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar no WhatsApp — ${COMPANY.whatsapp.display}`}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-warm-0 px-3 text-[11px] font-medium uppercase tracking-[0.05em] text-leaf-700 shadow-xs transition hover:bg-leaf-50 md:px-4"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{COMPANY.whatsapp.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
