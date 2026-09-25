import { Shield, Sparkles } from "lucide-react";
import { BarraXp } from "./BarraXp";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { retratoHeroe } from "./retratoHeroe";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import { cn } from "@/lib/utils";

type Props = { nombre: string; clase: string; xp: number; insignias?: number; className?: string; compacto?: boolean; configuracion?: ConfiguracionAvatar | undefined };

export function CharacterCard({ nombre, clase, xp, insignias = 0, className, compacto = false, configuracion }: Props) {
  const nivel = nivelDesdeXp(xp);
  const retrato = retratoHeroe(configuracion);
  return (
    <section className={cn("game-surface ornate-frame rounded-lg p-5", className)} aria-label={`Ficha de ${nombre}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-primary/60 bg-secondary">
            <img src={retrato.src} width={retrato.width} height={retrato.height} alt={`Retrato de ${nombre}`} className="h-auto w-full translate-y-[-2%] scale-[2.2] origin-top object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Héroe lector</p>
            <h2 className="mt-1 truncate font-display text-3xl font-bold text-foreground">{nombre}</h2>
            <p className="text-sm text-muted-foreground">{clase}</p>
          </div>
        </div>
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border border-primary bg-primary/10 text-primary reward-glow">
          <span className="text-[9px] font-bold uppercase">Nivel</span><span className="font-display text-2xl font-bold leading-none">{nivel}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 border-y border-border/70 py-3">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        <span className="font-display text-lg font-semibold text-primary">{rangoDeNivel(nivel)}</span>
        {!compacto && <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground"><Shield className="h-3.5 w-3.5" /> {insignias} insignias</span>}
      </div>
      <div className="mt-4"><BarraXp xp={xp} /></div>
    </section>
  );
}
