// Gera os swatches SVG dos tecidos em public/fabrics/.
// Texturas procedurais (trama + ruído + estampa) — nenhuma imagem externa.
// Mantenha SPECS em sincronia com lib/data/products.ts (campo `imagem`).
// Rodar: npm run swatches

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "fabrics");

const SIZE = 800;

/** Camadas comuns a todo tecido: ruído de fibra + trama + vinheta. */
function clothLayers(seed) {
  return `
  <filter id="fiber-light" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed}" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.35 0.35 0.35 0 0"/>
  </filter>
  <filter id="fiber-dark" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="${seed + 13}" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.25 0.25 0.25 0 0"/>
  </filter>
  <pattern id="weave" width="7" height="7" patternUnits="userSpaceOnUse">
    <path d="M0 3.5h7" stroke="#000000" stroke-opacity="0.055" stroke-width="1.4"/>
    <path d="M3.5 0v7" stroke="#ffffff" stroke-opacity="0.075" stroke-width="1.4"/>
  </pattern>
  <radialGradient id="vignette" cx="50%" cy="42%" r="75%">
    <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.13"/>
  </radialGradient>`;
}

function wrap(defs, body, seed = 7) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<defs>${clothLayers(seed)}${defs}</defs>
${body}
<rect width="${SIZE}" height="${SIZE}" filter="url(#fiber-light)" opacity="0.5"/>
<rect width="${SIZE}" height="${SIZE}" filter="url(#fiber-dark)" opacity="0.5"/>
<rect width="${SIZE}" height="${SIZE}" fill="url(#weave)"/>
<rect width="${SIZE}" height="${SIZE}" fill="url(#vignette)"/>
</svg>
`;
}

const base = (color) => `<rect width="${SIZE}" height="${SIZE}" fill="${color}"/>`;

function solid({ color, seed }) {
  return wrap("", base(color), seed);
}

function poa({ color, dot, seed }) {
  const defs = `
  <pattern id="poa" width="96" height="96" patternUnits="userSpaceOnUse">
    <circle cx="24" cy="24" r="13" fill="${dot}"/>
    <circle cx="72" cy="72" r="13" fill="${dot}"/>
  </pattern>`;
  return wrap(defs, `${base(color)}<rect width="${SIZE}" height="${SIZE}" fill="url(#poa)"/>`, seed);
}

function listras({ color, stripe, seed }) {
  const defs = `
  <pattern id="listras" width="64" height="64" patternUnits="userSpaceOnUse">
    <rect width="64" height="64" fill="${color}"/>
    <rect x="0" width="22" height="64" fill="${stripe}"/>
    <rect x="34" width="6" height="64" fill="${stripe}" opacity="0.75"/>
  </pattern>`;
  return wrap(defs, `<rect width="${SIZE}" height="${SIZE}" fill="url(#listras)"/>`, seed);
}

function vichy({ color, bg, seed }) {
  const defs = `
  <pattern id="vichy" width="104" height="104" patternUnits="userSpaceOnUse">
    <rect width="104" height="104" fill="${bg}"/>
    <rect x="0" width="52" height="104" fill="${color}" opacity="0.55"/>
    <rect y="0" width="104" height="52" fill="${color}" opacity="0.55"/>
  </pattern>`;
  return wrap(defs, `<rect width="${SIZE}" height="${SIZE}" fill="url(#vichy)"/>`, seed);
}

function flor(cx, cy, r, petal, center, rot = 0) {
  const petals = [0, 72, 144, 216, 288]
    .map((a) => {
      const rad = ((a + rot) * Math.PI) / 180;
      return `<circle cx="${(cx + Math.cos(rad) * r).toFixed(1)}" cy="${(cy + Math.sin(rad) * r).toFixed(1)}" r="${(r * 0.72).toFixed(1)}" fill="${petal}"/>`;
    })
    .join("");
  return `${petals}<circle cx="${cx}" cy="${cy}" r="${(r * 0.5).toFixed(1)}" fill="${center}"/>`;
}

function floral({ color, petal, petal2, center, seed }) {
  const defs = `
  <pattern id="floral" width="170" height="170" patternUnits="userSpaceOnUse">
    ${flor(42, 44, 15, petal, center, 10)}
    ${flor(128, 122, 13, petal2, center, 40)}
    <circle cx="120" cy="34" r="4.5" fill="${petal2}"/>
    <circle cx="36" cy="132" r="4.5" fill="${petal}"/>
    <circle cx="86" cy="84" r="3.5" fill="${center}"/>
  </pattern>`;
  return wrap(defs, `${base(color)}<rect width="${SIZE}" height="${SIZE}" fill="url(#floral)"/>`, seed);
}

function borboleta(x, y, scale, rot, wing, body) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})" opacity="0.92">
    <ellipse cx="-9" cy="-6" rx="10" ry="13" transform="rotate(-22 -9 -6)" fill="${wing}"/>
    <ellipse cx="9" cy="-6" rx="10" ry="13" transform="rotate(22 9 -6)" fill="${wing}"/>
    <ellipse cx="-7" cy="9" rx="7" ry="9" transform="rotate(-38 -7 9)" fill="${wing}" opacity="0.85"/>
    <ellipse cx="7" cy="9" rx="7" ry="9" transform="rotate(38 7 9)" fill="${wing}" opacity="0.85"/>
    <rect x="-1.8" y="-12" width="3.6" height="26" rx="1.8" fill="${body}"/>
  </g>`;
}

function borboletas({ color, wing, body, seed }) {
  const defs = `
  <pattern id="borboletas" width="190" height="190" patternUnits="userSpaceOnUse">
    ${borboleta(50, 52, 1.15, -12, wing, body)}
    ${borboleta(142, 140, 0.9, 24, wing, body)}
    <circle cx="140" cy="44" r="3.5" fill="${wing}" opacity="0.7"/>
    <circle cx="46" cy="148" r="3.5" fill="${wing}" opacity="0.7"/>
  </pattern>`;
  return wrap(defs, `${base(color)}<rect width="${SIZE}" height="${SIZE}" fill="url(#borboletas)"/>`, seed);
}

// slug → gerador. Cores base espelham `corHex` em lib/data/products.ts.
const SPECS = {
  "algodao-premium-branco": () => solid({ color: "#f4f2ea", seed: 3 }),
  "algodao-premium-azul-royal": () => solid({ color: "#2b4c9b", seed: 5 }),
  "algodao-premium-cinza": () => solid({ color: "#8a8d91", seed: 8 }),
  "algodao-premium-preto": () => solid({ color: "#26262a", seed: 11 }),
  "algodao-premium-vermelho": () => solid({ color: "#b02a30", seed: 14 }),
  "algodao-premium-verde-bandeira": () => solid({ color: "#2e7d4f", seed: 17 }),
  "misto-premium-branco": () => solid({ color: "#f6f4ee", seed: 21 }),
  "misto-premium-azul": () => solid({ color: "#39598f", seed: 24 }),
  "misto-premium-cinza": () => solid({ color: "#95979b", seed: 27 }),
  "misto-premium-grafite": () => solid({ color: "#4a4c52", seed: 30 }),
  "santanense-liso-branco": () => solid({ color: "#f5f3ec", seed: 33 }),
  "santanense-liso-azul-marinho": () => solid({ color: "#1e2a4a", seed: 36 }),
  "santanense-liso-rosa": () => solid({ color: "#d98ba3", seed: 39 }),
  "santanense-liso-bege": () => solid({ color: "#cbb487", seed: 42 }),
  "tricoline-borboletas-marrom": () =>
    borboletas({ color: "#8a6844", wing: "#f0e4cf", body: "#5a4026", seed: 45 }),
  "tricoline-poa-preto": () => poa({ color: "#2b2b2f", dot: "#f2efe8", seed: 48 }),
  "tricoline-floral-verde": () =>
    floral({ color: "#5d8a58", petal: "#f0e9d8", petal2: "#e8b7c4", center: "#f3d98a", seed: 51 }),
  "tricoline-xadrez-vichy-vermelho": () => vichy({ color: "#c04040", bg: "#f7f5ef", seed: 54 }),
  "tricoline-listras-azul": () => listras({ color: "#3c5a88", stripe: "#f0ede4", seed: 57 }),
};

mkdirSync(OUT, { recursive: true });
for (const [slug, gen] of Object.entries(SPECS)) {
  writeFileSync(join(OUT, `${slug}.svg`), gen());
}
console.log(`✔ ${Object.keys(SPECS).length} swatches gerados em public/fabrics/`);
