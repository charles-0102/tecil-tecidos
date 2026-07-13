import type { Metadata } from "next";
import { MapPin, MessageCircle, Truck } from "lucide-react";

import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { COMPANY, whatsappHref } from "@/lib/company";
import { formatBRLInteiro } from "@/lib/format";

export const metadata: Metadata = {
  title: "Política de frete",
  description:
    "Frete grátis para todo o Nordeste: sem pedido mínimo na região de Caruaru e a partir de um valor por localidade no restante. Veja valores e prazos de entrega.",
};

const regras = [
  {
    icon: Truck,
    title: "Na nossa região",
    description:
      "Caruaru, Santa Cruz do Capibaribe e Toritama têm frete grátis para qualquer pedido, sem valor mínimo.",
  },
  {
    icon: MapPin,
    title: "No restante do Nordeste",
    description:
      "Frete grátis a partir de um pedido mínimo que varia com a distância — quanto mais perto de Caruaru, menor o mínimo.",
  },
  {
    icon: MessageCircle,
    title: "Abaixo do mínimo",
    description:
      "Sem problema: a gente cota o frete com nossas transportadoras no WhatsApp e você aprova o valor antes de fechar.",
  },
];

const passos = [
  "Escolha os tecidos no site — corte mínimo de 3 metros por tecido.",
  "Chame a gente no WhatsApp com a sua lista e a sua cidade.",
  "Confirmamos frete e prazo, você aprova e o pedido sai da loja.",
];

export default function Page() {
  const { shipping } = COMPANY;

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-warm-150 bg-gradient-to-b from-warm-50 to-leaf-50/40">
          <div className="container py-12 md:py-16">
            <p className="mb-3 font-semibold text-xs uppercase tracking-[0.08em] text-leaf-700">
              Política de frete
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-warm-900 md:text-5xl">
              Frete grátis para todo o Nordeste.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-600">
              Enviamos da nossa loja em {COMPANY.location.display} — e quanto
              mais perto da gente, menor o pedido mínimo: na nossa região o
              frete é grátis para qualquer compra. Veja os valores e prazos
              abaixo; o frete é sempre confirmado no WhatsApp antes de você
              fechar.
            </p>
          </div>
        </section>

        <section className="border-b border-warm-150 bg-warm-50">
          <div className="container grid gap-6 py-12 md:grid-cols-3 md:py-14">
            {regras.map((regra) => (
              <div key={regra.title} className="rounded-lg border border-warm-150 bg-warm-0 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-leaf-50 text-leaf-600">
                  <regra.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h2 className="mt-4 text-base font-semibold text-warm-800">{regra.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-warm-600">
                  {regra.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-warm-150 bg-warm-0">
          <div className="container py-12 md:py-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-warm-900 md:text-3xl">
              Frete grátis e prazo por localidade
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-warm-600">
              O valor da tabela é o pedido mínimo para ganhar frete grátis no
              destino. Abaixo dele, cotamos o frete no WhatsApp.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-warm-200">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-warm-200 bg-warm-100 text-left">
                    <th className="px-5 py-3 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
                      Destino
                    </th>
                    <th className="px-5 py-3 font-semibold text-[11px] uppercase tracking-wider text-warm-500">
                      Frete grátis a partir de
                    </th>
                    <th className="px-5 py-3 text-right font-semibold text-[11px] uppercase tracking-wider text-warm-500">
                      Prazo estimado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipping.faixas.map((faixa, i) => (
                    <tr
                      key={faixa.destino}
                      className={
                        faixa.minimo === 0
                          ? "border-b border-warm-150 bg-leaf-50/60"
                          : i < shipping.faixas.length - 1
                            ? "border-b border-warm-150"
                            : ""
                      }
                    >
                      <td className="px-5 py-3.5 font-medium text-warm-900">{faixa.destino}</td>
                      <td className="px-5 py-3.5">
                        {faixa.minimo === 0 ? (
                          <span className="font-semibold text-leaf-700">
                            Qualquer pedido
                          </span>
                        ) : (
                          <span className="font-semibold tabular-nums text-warm-900">
                            {formatBRLInteiro(faixa.minimo)}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right text-warm-600">{faixa.prazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-warm-500">
              Valores e prazos de referência, contados a partir da confirmação
              do pagamento. O frete e o prazo exatos do seu pedido são
              confirmados no WhatsApp antes de fechar.
            </p>
          </div>
        </section>

        <section className="border-b border-warm-150 bg-warm-50">
          <div className="container grid gap-12 py-12 md:grid-cols-2 md:py-16">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-warm-900 md:text-3xl">
                Para onde enviamos
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-warm-600">
                Hoje atendemos os 9 estados do Nordeste:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {shipping.estados.map((estado) => (
                  <span
                    key={estado}
                    className="rounded-full border border-warm-200 bg-warm-0 px-3.5 py-1.5 text-[13px] font-medium text-warm-700"
                  >
                    {estado}
                  </span>
                ))}
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-warm-600">
                É de fora do Nordeste?{" "}
                <a
                  href={whatsappHref(
                    "Olá! Sou de fora do Nordeste — vocês conseguem enviar para a minha cidade?",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-leaf-700 underline decoration-leaf-300 underline-offset-2 hover:text-leaf-600"
                >
                  Consulta a gente no WhatsApp
                </a>{" "}
                — dependendo do destino, conseguimos cotar um envio.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-warm-900 md:text-3xl">
                Como funciona
              </h2>
              <ol className="mt-4 space-y-4">
                {passos.map((passo, i) => (
                  <li key={passo} className="flex items-start gap-3 text-sm leading-relaxed text-warm-600">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-warm-0">
          <div className="container py-12 md:py-16">
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-leaf-600/20 bg-leaf-50 p-8 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-warm-900">
                  Quer saber o frete do seu pedido?
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-warm-600">
                  Manda a lista de tecidos e a sua cidade — a gente responde
                  com o valor e o prazo certinhos.
                </p>
              </div>
              <a
                href={whatsappHref("Olá! Quero saber o frete para o meu pedido.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-leaf-600 px-7 text-sm font-medium text-white transition hover:bg-leaf-700"
              >
                <MessageCircle className="h-4 w-4" />
                Calcular no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
