# Tecil Tecidos — Instruções para Claude Code

Vitrine de loja de tecidos derivada do projeto irmão `../wtext`. **Não é
e-commerce**: o usuário vê tecido, preço e disponibilidade e fecha o pedido
pelo WhatsApp. Sem banco, sem API, sem área logada — tudo estático/mockado.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui local (`components/ui/`).
- Sem Supabase e sem route handlers. Se um dia entrar banco/API, seguir os
  padrões do `../wtext/CLAUDE.md`.

## Onde estão as coisas

- **Catálogo mockado**: `lib/data/products.ts` (tipos em `types/product.ts`).
  Ao adicionar tecido: criar entrada + spec de swatch em
  `scripts/generate-swatches.mjs` + rodar `npm run swatches`.
- **Dados da loja** (WhatsApp real, políticas, horários): `lib/company.ts`.
  E-mail e Instagram são placeholders mockados.
- **Design system**: `app/globals.css` — paleta `leaf` (verde #3ca833 do site
  real) + `warm` (neutros linho) + `sand` (bege #cbb487). Nomes de classe
  seguem o wtext, com `teal→leaf`.
- **Logo**: wordmark em `components/brand/TecilLogo.tsx` (T|E|C|I|L® serifado,
  fiel ao logo real — não usar imagem).

## Convenções

- Todo CTA de conversão abre WhatsApp via `whatsappHref(mensagem)` de
  `lib/company.ts`, com mensagem pré-preenchida citando o tecido.
- Preços sempre via `formatBRL` (`lib/format.ts`); preço é **por metro**,
  corte mínimo 3 m.
- Selects nativos (`NativeSelect`), não Radix. Sheets: `ResponsiveSheet`.
- Fim de mudança: `npx tsc --noEmit` e `npx next lint`.
