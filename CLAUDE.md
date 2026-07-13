# Tecil Tecidos — Instruções para Claude Code

Vitrine de loja de tecidos derivada do projeto irmão `../wtext`. **Não é
e-commerce**: o usuário vê tecido, preço e disponibilidade e fecha o pedido
pelo WhatsApp. Sem banco e sem área logada; o catálogo vem do Tiny ERP
(leitura, ISR) e todo o resto é estático.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind, shadcn/ui local (`components/ui/`).
- Sem Supabase e sem route handlers. Se um dia entrar banco/API própria,
  seguir os padrões do `../wtext/CLAUDE.md`.

## Onde estão as coisas

- **Catálogo real**: Tiny ERP via `lib/tiny/catalog.ts` (API v2, token
  `OLIST_API_KEY` no `.env`, revalidação de 1h). Tecido novo se cadastra
  **no ERP**: categoria (Tricoline Estampada/Peripan/Santanense), marca,
  foto anexa e descrição com largura/gramatura/composição. Estoque zerado
  vira "sob consulta" — o produto não some do site.
- **Mock/fallback**: `lib/data/products.ts` (tipos em `types/product.ts`) —
  usado quando a API do Tiny falha; a config das linhas/categorias
  (`CATEGORIAS`) também vive lá. Credenciais OAuth do app v3
  (`TINY_CLIENT_ID`/`TINY_CLIENT_SECRET`) já existem no `.env` para a futura
  fase e-commerce.
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
