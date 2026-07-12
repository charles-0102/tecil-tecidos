import Link from "next/link";
import { BadgePercent, CreditCard, MessageCircle, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: { href: string; label: string };
}[] = [
  {
    icon: Truck,
    title: "Frete grátis no Nordeste",
    description: "Grátis em pedidos a partir de R$ 400 (até 20 kg).",
    link: { href: "/frete", label: "Ver política de frete" },
  },
  {
    icon: CreditCard,
    title: "Parcele no cartão",
    description: "Pague em até 3x sem juros no cartão de crédito.",
  },
  {
    icon: BadgePercent,
    title: "Desconto no PIX",
    description: "5% de desconto pagando à vista pelo PIX.",
  },
  {
    icon: MessageCircle,
    title: "Pedido pelo WhatsApp",
    description: "Atendimento humano — escolha o tecido e feche direto conosco.",
  },
];

export function Diferenciais() {
  return (
    <section className="border-b border-sand-200 bg-sand-100">
      <div className="container py-10 md:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-warm-0 text-leaf-600 shadow-xs">
                <item.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-warm-800">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-warm-600">
                  {item.description}
                </p>
                {item.link && (
                  <Link
                    href={item.link.href}
                    className="mt-1 inline-block text-[13px] font-medium text-leaf-700 underline decoration-leaf-300 underline-offset-2 transition-colors hover:text-leaf-600"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
