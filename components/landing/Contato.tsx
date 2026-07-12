import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";

import { COMPANY, whatsappHref } from "@/lib/company";

const canais = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: COMPANY.whatsapp.display,
    description: "Preço, disponibilidade e pedido — resposta rápida",
    href: whatsappHref("Olá! Estava no site da Tecil Tecidos e gostaria de atendimento."),
  },
  {
    icon: Mail,
    label: "E-mail",
    value: COMPANY.email.address,
    description: "Dúvidas, parcerias e compras em volume",
    href: COMPANY.email.href,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: COMPANY.social.instagramHandle,
    description: "Novidades, estampas recém-chegadas e bastidores",
    href: COMPANY.social.instagram,
  },
];

export function Contato() {
  return (
    <section id="contato" className="bg-warm-0">
      <div className="container py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
            Contato
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
            Achou o tecido certo? Fale com a gente.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-warm-600">
            O pedido é fechado pelo WhatsApp: você manda o tecido e a metragem,
            e a gente confirma disponibilidade, frete e pagamento na hora.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {canais.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-6 rounded-lg border border-warm-150 bg-warm-50 p-7 transition hover:-translate-y-0.5 hover:border-leaf-600 hover:bg-warm-0 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <c.icon className="h-6 w-6 text-leaf-600" strokeWidth={1.5} />
                <ArrowUpRight className="h-5 w-5 text-warm-400 transition-colors group-hover:text-leaf-700" />
              </div>
              <div>
                <div className="mb-2 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
                  {c.label}
                </div>
                <div className="text-lg font-medium text-warm-900">{c.value}</div>
                <p className="mt-2 text-sm text-warm-600">{c.description}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 font-semibold text-[11px] uppercase tracking-[0.08em] text-warm-500">
          {COMPANY.hours.weekdays} · {COMPANY.hours.saturday}
        </p>
      </div>
    </section>
  );
}
