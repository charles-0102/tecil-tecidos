import { cn } from "@/lib/utils";

/**
 * Selo circular da marca — carimbo "HÁ MAIS DE 20 ANOS · CARUARU – PE"
 * ao redor do wordmark. Ativo reutilizável (Sobre, rodapé, materiais).
 */
export function TecilSelo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="Selo Tecil Tecidos — há mais de 20 anos em Caruaru – PE"
      className={cn("block", className)}
    >
      <defs>
        <path
          id="tecil-selo-arc"
          d="M64,64 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
          fill="none"
        />
      </defs>
      <circle cx="64" cy="64" r="62" className="fill-leaf-600" />
      <circle
        cx="64"
        cy="64"
        r="62"
        fill="none"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="1.5"
        strokeDasharray="1 4"
        strokeLinecap="round"
      />
      <circle cx="64" cy="64" r="38" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1" />
      <text className="fill-white font-sans" fontSize="10" fontWeight="700" letterSpacing="2.1">
        <textPath href="#tecil-selo-arc">HÁ MAIS DE 20 ANOS · CARUARU – PE</textPath>
      </text>
      <text
        x="64"
        y="63"
        textAnchor="middle"
        className="fill-white font-display"
        fontSize="26"
        fontWeight="600"
      >
        Tecil
      </text>
      <text
        x="64"
        y="80"
        textAnchor="middle"
        className="fill-white font-sans"
        fillOpacity=".85"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="2.2"
      >
        TECIDOS
      </text>
    </svg>
  );
}
