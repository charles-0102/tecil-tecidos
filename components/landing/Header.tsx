import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { TecilLogo } from "@/components/brand/TecilLogo";
import { COMPANY, whatsappHref } from "@/lib/company";

const navItems = [
  { href: "/tecidos", label: "Tecidos" },
  { href: "/#linhas", label: "Linhas" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-warm-150/80 bg-warm-50/85 backdrop-blur">
      <div className="container flex flex-col items-center gap-3 py-4 sm:h-16 sm:flex-row sm:justify-between sm:gap-8 sm:py-0">
        <Link href="/" aria-label="Tecil Tecidos — página inicial" className="flex items-baseline gap-3">
          <TecilLogo className="text-[26px]" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-warm-500 md:inline">
            tecidos
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-warm-600 transition-colors hover:text-leaf-700"
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
            className="inline-flex h-9 items-center gap-2 rounded-md bg-leaf-600 px-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-leaf-700"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {COMPANY.whatsapp.display}
          </a>
        </div>
      </div>
    </header>
  );
}
