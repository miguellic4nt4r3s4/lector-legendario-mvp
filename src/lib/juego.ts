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

export const NIVEL_MAXIMO = 20;

/** Títulos por nivel — escala de 20 niveles. */
export const RANGOS: Record<number, string> = {
  1: "Aprendiz",
  2: "Rastreador de Indicios",
  3: "Descifrador",
  4: "Explorador de Páginas",
  5: "Guardián de Enigmas",
  6: "Cazador de Inferencias",
  7: "Intérprete de Sombras",
  8: "Custodio del Archivo",
  9: "Analista de Argumentos",
  10: "Maestro de Perspectivas",
  11: "Sabio de las Palabras",
  12: "Cronista Errante",
  13: "Vigía del Sentido",
  14: "Arquitecto de Ideas",
  15: "Oráculo del Texto",
  16: "Heraldo del Pensamiento",
  17: "Juez de Voces",
  18: "Gran Descifrador",
  19: "Leyenda Viva",
  20: "Lector Legendario",
};

export function rangoDeNivel(nivel: number): string {
  return RANGOS[Math.min(Math.max(1, nivel), NIVEL_MAXIMO)] ?? "Lector Legendario";
}

/* ---------- Insignias: rareza ---------- */

export type Rareza = "Común" | "Rara" | "Épica" | "Legendaria" | "Mítica";

export const RAREZA_POR_CODIGO: Record<string, Rareza> = {
  ojo_del_archivo: "Épica",
  lector_legendario: "Legendaria",
};

export const MUNDO_POR_CODIGO: Record<string, number> = {
  ojo_del_archivo: 1,
  lector_legendario: 1,
};

export const CONDICION_POR_CODIGO: Record<string, string> = {
  ojo_del_archivo: "Completa una misión del Bosque de las Palabras con al menos 3 aciertos.",
  lector_legendario: "Resuelve una misión completa sin ningún error.",
};

export function rarezaDe(codigo: string): Rareza {
  return RAREZA_POR_CODIGO[codigo] ?? "Común";
}

/* ---------- Mapa del Reino ---------- */

export type Mundo = {
  numero: number;
  nombre: string;
  competencia: string;
  descripcion: string;
  nivelRequerido: number;
  /** Índice de la aventura asociada (orden en la tabla aventuras), si existe. */
  aventuraOrden?: number;
};

export const MUNDOS: Mundo[] = [
  {
    numero: 1,
    nombre: "Bosque de las Palabras",
    competencia: "Localización de información",
    descripcion: "Un bosque de pistas donde cada detalle relevante abre un nuevo sendero.",
    nivelRequerido: 1,
    aventuraOrden: 1,
  },
  {
    numero: 2,
    nombre: "Desierto de las Inferencias",
    competencia: "Inferencia",
    descripcion: "Bajo la arena se esconde lo que el texto no dice en voz alta.",
    nivelRequerido: 2,
  },
  {
    numero: 3,
    nombre: "Fortaleza de los Argumentos",
    competencia: "Estructura y argumentación",
    descripcion: "Murallas de premisas y torres de conclusiones.",
    nivelRequerido: 4,
  },
  {
    numero: 4,
    nombre: "Ciudad de las Perspectivas",
    competencia: "Puntos de vista",
    descripcion: "Mil ventanas, mil miradas sobre el mismo relato.",
    nivelRequerido: 6,
  },
  {
    numero: 5,
    nombre: "Archivo Secreto del Autor",
    competencia: "Intención del autor",
    descripcion: "Los propósitos ocultos tras cada línea escrita.",
    nivelRequerido: 8,
  },
  {
    numero: 6,
    nombre: "Reino del Pensamiento Crítico",
    competencia: "Lectura crítica",
    descripcion: "El trono final: juzgar, valorar y decidir con criterio propio.",
    nivelRequerido: 10,
  },
];

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
