"use client";

import { useEffect, useState } from "react";

/**
 * Retorna true se o media query bate. Default em SSR/primeiro render: false.
 * Use em conjunto com componentes que renderizam ambas variantes ou
 * com gate de hidratacao para evitar layout shift.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
