import { BookOpen, Castle, Eye, Landmark, Lock, Map, TentTree } from "lucide-react";
import type { Mundo } from "@/lib/juego";
import { XP_POR_NIVEL } from "@/lib/juego";
import { cn } from "@/lib/utils";

const iconos = [TentTree, Map, Castle, Landmark, Eye, BookOpen];

type Props = { mundo: Mundo; xp: number; nivel: number; completado: boolean; posicion: number };

export function WorldCard({ mundo, xp, nivel, completado, posicion }: Props) {
  const tieneContenido = mundo.aventuraOrden !== undefined;
  const nivelAlcanzado = nivel >= mundo.nivelRequerido;
  const disponible = tieneContenido && nivelAlcanzado;
  const metaXp = Math.max(XP_POR_NIVEL, (mundo.nivelRequerido - 1) * XP_POR_NIVEL);
  const faltan = Math.max(0, metaXp - xp);
  const avance = nivelAlcanzado ? 100 : Math.min(100, Math.round((xp / metaXp) * 100));
  const Icono = iconos[mundo.numero - 1] ?? Map;
  return <li className={cn("world-node relative z-10 text-center", posicion % 2 === 1 && "lg:translate-y-16")}>
    <article className="group flex flex-col items-center" aria-label={`${mundo.nombre}, ${disponible ? "disponible" : "bloqueado"}`}>
      <div className={cn("world-landmark relative flex h-24 w-24 items-center justify-center rounded-full border sm:h-28 sm:w-28", disponible ? "is-open border-primary text-primary" : "border-border text-muted-foreground")}>
        <Icono className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" aria-hidden />
        {!disponible && <span className="absolute -bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background"><Lock className="h-4 w-4" aria-hidden /></span>}
        <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[9px] font-bold uppercase">{String(mundo.numero).padStart(2, "0")}</span>
      </div>
      <h3 className={cn("mt-3 max-w-[170px] font-adventure text-lg leading-tight", disponible ? "text-primary" : "text-foreground")}>{mundo.nombre}</h3>
      <p className="mt-1 max-w-[170px] text-[10px] font-bold uppercase text-accent">{mundo.competencia}</p>
      <p className={cn("mt-2 text-[10px] font-bold uppercase", disponible ? "text-success" : "text-muted-foreground")}>{disponible ? (completado ? "Misión completada" : "Disponible") : nivelAlcanzado ? "En preparación" : `Nivel ${mundo.nivelRequerido} · faltan ${faltan} XP`}</p>
      {!nivelAlcanzado && <div className="mt-2 h-1 w-20 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={avance} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-accent" style={{ width: `${avance}%` }} /></div>}
    </article>
  </li>;
}