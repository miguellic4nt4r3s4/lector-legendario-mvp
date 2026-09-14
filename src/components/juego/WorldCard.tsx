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
  return <li className={cn("relative z-10 w-[84%] max-w-md", posicion % 2 === 0 ? "self-end" : "self-start")}>
    <article className={cn("game-surface relative overflow-hidden rounded-lg border p-4 sm:p-5", disponible ? "ornate-frame border-primary/60" : "border-border/70", !nivelAlcanzado && "bg-background/80")} aria-label={`${mundo.nombre}, ${disponible ? "disponible" : "bloqueado"}`}>
      <div className="flex gap-4">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full border", disponible ? "border-primary bg-primary/15 text-primary reward-glow" : "border-border bg-secondary text-muted-foreground")}>
          {disponible ? <Icono className="h-5 w-5" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Mundo {mundo.numero} · {mundo.competencia}</p>
          <h3 className={cn("mt-1 font-display text-xl font-bold", disponible ? "text-primary" : "text-foreground")}>{mundo.nombre}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{mundo.descripcion}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className={cn("rounded-sm border px-2 py-1 font-semibold uppercase", disponible ? "border-success/50 bg-success/10 text-success" : "border-border text-muted-foreground")}>{disponible ? (completado ? "Misión completada" : "Disponible") : nivelAlcanzado ? "En preparación" : `Nivel ${mundo.nivelRequerido}`}</span>
            {!nivelAlcanzado && <span className="text-muted-foreground">Faltan {faltan} XP</span>}
          </div>
          {!nivelAlcanzado && <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={avance} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: `${avance}%` }} /></div>}
        </div>
      </div>
    </article>
  </li>;
}