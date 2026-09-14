import { nivelDesdeXp, progresoNivel, rangoDeNivel, xpEnNivel, XP_POR_NIVEL } from "@/lib/juego";

type Props = {
  xp: number;
  /** Solo la barra, sin textos. */
  compacta?: boolean;
  /** Muestra también "Nivel N — Título" encima de la barra. */
  conNivel?: boolean;
};

export function BarraXp({ xp, compacta = false, conNivel = false }: Props) {
  const pct = progresoNivel(xp);
  const nivel = nivelDesdeXp(xp);
  return (
    <div className="w-full">
      {conNivel && !compacta && (
        <p className="mb-1.5 font-display text-sm text-primary">
          Nivel {nivel} — {rangoDeNivel(nivel)}
        </p>
      )}
      <div
        className="h-3 w-full overflow-hidden rounded-full border border-primary/25 bg-background/70 shadow-inner"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={XP_POR_NIVEL}
        aria-valuenow={xpEnNivel(xp)}
        aria-label="Progreso hacia el siguiente nivel"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent via-success to-primary transition-all duration-700 reward-glow"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compacta && (
        <div className="mt-1.5 flex items-baseline justify-between gap-3 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">
              {xpEnNivel(xp)} / {XP_POR_NIVEL} XP
            </span>{" "}
            hacia el nivel {nivel + 1}
          </span>
          <span>{xp} XP totales</span>
        </div>
      )}
    </div>
  );
}
