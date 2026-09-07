import { progresoNivel, xpEnNivel, XP_POR_NIVEL } from "@/lib/juego";

export function BarraXp({ xp, compacta = false }: { xp: number; compacta?: boolean }) {
  const pct = progresoNivel(xp);
  return (
    <div className="w-full">
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compacta && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {xpEnNivel(xp)} / {XP_POR_NIVEL} XP hacia el siguiente nivel · {xp} XP totales
        </p>
      )}
    </div>
  );
}
