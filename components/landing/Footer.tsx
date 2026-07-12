import Link from "next/link";
import { Instagram } from "lucide-react";

import { TecilLogo } from "@/components/brand/TecilLogo";
import { CATEGORIAS, CATEGORIA_SLUGS } from "@/lib/data/products";
import { COMPANY } from "@/lib/company";

export function Footer() {
  return (
    <footer className="border-t border-warm-150 bg-warm-100">
      {/* Mobile */}
      <div className="container flex flex-col items-center gap-4 py-8 md:hidden">
        <TecilLogo className="text-[24px] opacity-90" />
        <a
          href={COMPANY.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-warm-500 transition-colors hover:text-leaf-700"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <span className="font-semibold text-[10px] uppercase tracking-[0.08em] text-warm-400">
          © {new Date().getFullYear()} {COMPANY.name}
        </span>
      </div>

      {/* Desktop */}
      <div className="container hidden py-12 md:block">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-baseline gap-3">
              <TecilLogo className="text-[26px]" />
              <span className="font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500">
                tecidos
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-600">
              {COMPANY.tagline} {COMPANY.policies.freteGratis}.
            </p>
          </div>

          <div>
            <div className="mb-3 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
              Tecidos
            </div>
            <ul className="space-y-2 text-sm text-warm-700">
              <li>
                <Link href="/tecidos" className="hover:text-leaf-700">
                  Todos os tecidos
                </Link>
              </li>
              {CATEGORIA_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/tecidos?categoria=${slug}`} className="hover:text-leaf-700">
                    {CATEGORIAS[slug].titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
              Atendimento
            </div>
            <ul className="space-y-2 text-sm text-warm-700">
              <li>{COMPANY.hours.weekdays}</li>
              <li>{COMPANY.hours.saturday}</li>
              <li>{COMPANY.whatsapp.display}</li>
              <li>{COMPANY.email.address}</li>
            </ul>
          </div>

          <div>
            <div className="mb-3 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
              Como comprar
            </div>
            <ul className="space-y-2 text-sm text-warm-700">
              <li>{COMPANY.policies.corteMinimo}</li>
              <li>{COMPANY.policies.parcelamento}</li>
              <li>{COMPANY.policies.pix}</li>
              <li>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-leaf-700"
                >
                  <Instagram className="h-4 w-4" />
                  {COMPANY.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-warm-200 pt-6 font-semibold text-[11px] uppercase tracking-wider text-warm-500 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
          </span>
          <span>{COMPANY.policies.freteGratis}</span>
        </div>
      </div>
    </footer>
  );
}
