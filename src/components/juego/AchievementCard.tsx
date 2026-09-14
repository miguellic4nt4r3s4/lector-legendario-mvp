import { Crown, Eye, Lock, Shield } from "lucide-react";
import type { Rareza } from "@/lib/juego";
import { RarityBadge, estiloMarcoRareza } from "./RarityBadge";
import { cn } from "@/lib/utils";

const iconos = { crown: Crown, eye: Eye, shield: Shield } as const;
type Props = { nombre: string; descripcion: string; icono: string; rareza?: Rareza | undefined; desbloqueada?: boolean | undefined; fecha?: string | null | undefined; mundo?: number | undefined; condicion?: string | undefined; destacada?: boolean | undefined };

export function AchievementCard({ nombre, descripcion, icono, rareza = "Común", desbloqueada = true, fecha, mundo, condicion, destacada = false }: Props) {
  const Icono = iconos[icono as keyof typeof iconos] ?? Shield;
  const fechaTexto = fecha ? new Date(fecha).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }) : null;
  return <article className={cn("relative overflow-hidden rounded-lg border bg-card/70 p-4", estiloMarcoRareza(rareza), !desbloqueada && "opacity-60 grayscale", destacada && "reveal-up reward-glow")} aria-label={`${nombre}, insignia ${rareza}, ${desbloqueada ? "desbloqueada" : "bloqueada"}`}>
    {destacada && <div className="shimmer-line absolute inset-x-0 top-0 h-px" />}
    <div className="flex gap-4">
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background/70"><Icono className={cn("h-7 w-7", desbloqueada ? "text-primary" : "text-muted-foreground")} aria-hidden />{!desbloqueada && <span className="absolute -bottom-1 -right-1 rounded-full border border-border bg-background p-1"><Lock className="h-3 w-3" /></span>}</div>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-xl font-bold text-foreground">{nombre}</h3><RarityBadge rareza={rareza} />{mundo && <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mundo {mundo}</span>}</div><p className="mt-1 text-sm text-muted-foreground">{descripcion}</p><p className={cn("mt-2 text-xs font-semibold uppercase", desbloqueada ? "text-success" : "text-muted-foreground")}>{desbloqueada ? `Desbloqueada${fechaTexto ? ` · ${fechaTexto}` : ""}` : `Bloqueada${condicion ? ` · ${condicion}` : ""}`}</p></div>
    </div>
  </article>;
}