const numeros = [
  { value: "3", label: "Linhas de tecido" },
  { value: "100%", label: "Algodão premium" },
  { value: "Brasil", label: "Envio grátis" },
  { value: "3 m", label: "Corte mínimo" },
];

export function Sobre() {
  return (
    <section id="sobre" className="border-b border-warm-150 bg-warm-0">
      <div className="container grid gap-16 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-leaf-700">
            Sobre a Tecil
          </p>
          <h2 className="mb-8 text-balance text-3xl font-semibold tracking-tight text-warm-900 md:text-4xl">
            Tecido bom se escolhe pelo toque — e pela confiança.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-warm-600">
            <p>
              A Tecil Tecidos nasceu da paixão por tecido de verdade: algodão
              premium de tramas firmes, cores sólidas que não desbotam e
              estampas escolhidas uma a uma.
            </p>
            <p>
              Trabalhamos com linhas consagradas — Peripan e Santanense nos
              lisos, tricolines estampadas na dose certa de personalidade — e
              enviamos grátis para todo o Brasil, com corte mínimo de apenas 3
              metros.
            </p>
            <p>
              Aqui o atendimento é de loja de bairro: você escolhe no site, tira
              dúvidas pelo WhatsApp e recebe em casa. Simples assim.
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-warm-150 bg-warm-150">
            {numeros.map((n) => (
              <div key={n.label} className="bg-warm-0 p-6">
                <div className="font-mono text-2xl font-medium tracking-tight text-warm-900 md:text-3xl">
                  {n.value}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-warm-500">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
