---
name: verify
description: Verificar mudanças visuais/de comportamento rodando o site Tecil Tecidos de verdade e capturando screenshots por viewport.
---

# Verificar o site rodando

## Subir

```bash
npm run dev -- -p 3199   # em background; pronto em ~5s (curl até 200)
```

## Dirigir e capturar

Não há Playwright no projeto, mas os browsers do cache global funcionam:

```bash
cd <scratchpad> && npm i playwright-core
```

```js
const { chromium } = require("playwright-core");
const browser = await chromium.launch({
  executablePath: `${os.homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1194/chrome-mac/headless_shell`,
});
// se a pasta -1194 não existir mais: ls ~/Library/Caches/ms-playwright/
```

## Fluxos que valem dirigir

- Home `/` em 390×844 (mobile) e 1440×900 (desktop) — o hero tem art
  direction por breakpoint (`<picture>` + `getImageProps`): confira
  `img.currentSrc` (mobile = loja-racks, desktop = loja-salao).
- Header em modo overlay (só na home): transparente no topo; após
  `window.scrollTo(500)` + ~400ms, `getComputedStyle(header).backgroundColor`
  deve ser `rgb(63, 168, 52)` (leaf-500).
- `/tecidos` deve manter header verde fixo (sem overlay).
- Viewport pequeno (375×667) para checar a dobra do sheet do hero.

## Gotchas

- Botões do hero desktop: o conteúdo do side sheet tem ~440px úteis em
  lg — se mexer em padding/texto dos CTAs, confira se não quebram em
  duas linhas.
- Fim de mudança (convenção do CLAUDE.md): `npx tsc --noEmit` e
  `npx next lint`.
