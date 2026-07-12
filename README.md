# Tecil Tecidos — Vitrine

Vitrine digital da **Tecil Tecidos** (www.teciltecidos.com): o cliente vê o
tecido, preço por metro e disponibilidade de estoque, e fecha o pedido pelo
WhatsApp. Não é e-commerce — não há carrinho nem checkout.

Derivado da estrutura do projeto **wtext** (Next.js App Router + Tailwind +
shadcn/ui local), sem Supabase, sem API e sem área logada.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

## Estado atual

- **Tudo mockado, sem banco de dados.** O catálogo vive em
  `lib/data/products.ts` (19 tecidos nas linhas Peripan, Santanense e
  Tricoline Estampada).
- As amostras dos tecidos são SVGs procedurais gerados por
  `npm run swatches` (`scripts/generate-swatches.mjs`) em `public/fabrics/`.
- Dados da loja (WhatsApp, políticas, horários) em `lib/company.ts`.
  E-mail e Instagram são placeholders — confirmar com a loja.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing: hero, diferenciais, destaques, linhas, sobre, contato |
| `/tecidos` | Catálogo com busca, filtros (linha, cor, disponibilidade) e ordenação |
| `/tecidos/[slug]` | Detalhe do tecido: preço/metro, estoque, ficha técnica, CTA WhatsApp |

## Scripts

- `npm run dev` / `build` / `start`
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint`
- `npm run swatches` — regenera os SVGs de amostra
