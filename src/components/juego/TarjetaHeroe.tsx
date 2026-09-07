import { AVATAR_EMOJI, nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import { BarraXp } from "./BarraXp";

type Props = {
  nombre: string;
  clase: string;
  avatar: string;
  xp: number;
  insignias?: number;
};

export function TarjetaHeroe({ nombre, clase, avatar, xp, insignias = 0 }: Props) {
  const nivel = nivelDesdeXp(xp);
  return (
    <div className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-secondary text-2xl">
          <span aria-hidden>{AVATAR_EMOJI[avatar] ?? "🔍"}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-primary">{nombre}</h3>
          <p className="text-sm text-muted-foreground">{clase}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-accent">
            Nivel {nivel} · {rangoDeNivel(nivel)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl text-primary">{xp}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">XP</p>
        </div>
      </div>
      <div className="mt-4">
        <BarraXp xp={xp} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Insignias obtenidas: <span className="text-foreground">{insignias}</span>
      </p>
    </div>
  );
}
