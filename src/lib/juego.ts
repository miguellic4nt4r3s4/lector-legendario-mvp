export const XP_POR_NIVEL = 150;

export function nivelDesdeXp(xp: number): number {
  return Math.floor(Math.max(0, xp) / XP_POR_NIVEL) + 1;
}

export function xpEnNivel(xp: number): number {
  return Math.max(0, xp) % XP_POR_NIVEL;
}

export function progresoNivel(xp: number): number {
  return Math.round((xpEnNivel(xp) / XP_POR_NIVEL) * 100);
}

export const RANGOS: Record<number, string> = {
  1: "Aprendiz de Archivo",
  2: "Rastreador de Indicios",
  3: "Descifrador",
  4: "Guardián de Enigmas",
  5: "Lector Legendario",
};

export function rangoDeNivel(nivel: number): string {
  return RANGOS[Math.min(nivel, 5)] ?? "Lector Legendario";
}

export const ETIQUETA_COMPETENCIA: Record<string, string> = {
  literal: "Comprensión literal",
  inferencial: "Inferencia",
  critica: "Lectura crítica",
  vocabulario: "Vocabulario en contexto",
  estructura: "Estructura del texto",
};

export const CLASES_HEROE = [
  {
    id: "Detective de Sombras",
    descripcion: "Persigue contradicciones y testimonios frágiles.",
    fuerte: "Lectura crítica",
  },
  {
    id: "Escriba Errante",
    descripcion: "Reconstruye el sentido de las palabras olvidadas.",
    fuerte: "Vocabulario en contexto",
  },
  {
    id: "Cartógrafo de Indicios",
    descripcion: "Ordena los hechos y encuentra el mapa oculto del relato.",
    fuerte: "Estructura del texto",
  },
  {
    id: "Vidente de Sótano",
    descripcion: "Deduce lo que el texto calla entre líneas.",
    fuerte: "Inferencia",
  },
] as const;

export const AVATARES = ["lupa", "pluma", "farol", "llave", "reloj", "cuervo"] as const;

export const AVATAR_EMOJI: Record<string, string> = {
  lupa: "🔍",
  pluma: "🪶",
  farol: "🏮",
  llave: "🗝️",
  reloj: "⏳",
  cuervo: "🐦‍⬛",
};
