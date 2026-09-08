import { Lock, Sparkles, Swords } from "lucide-react";
import { MUNDOS, nivelDesdeXp, XP_POR_NIVEL } from "@/lib/juego";

type Props = {
  xp: number;
  /** Órdenes de aventura que tienen al menos una misión completada. */
  aventurasCompletadas?: number[];
};

/**
 * MAPA DEL REINO — seis mundos. Solo el primero tiene contenido hoy; los demás
 * muestran su condición de desbloqueo y el avance del héroe hacia ella.
 */
export function MapaReino({ xp, aventurasCompletadas = [] }: Props) {
  const nivel = nivelDesdeXp(xp);

  return (
    <section className="panel p-6" aria-labelledby="titulo-mapa-reino">
      <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">Seis mundos</p>
      <h2 id="titulo-mapa-reino" className="mt-1 font-display text-2xl text-primary">
        Mapa del Reino
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Cada mundo entrena una competencia lectora. Se abren a medida que subes de nivel.
      </p>

      <ol className="relative mt-6 space-y-3">
        <span
          className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-primary via-border to-border"
          aria-hidden
        />
        {MUNDOS.map((m) => {
          const tieneContenido = m.aventuraOrden !== undefined;
          const nivelAlcanzado = nivel >= m.nivelRequerido;
          const disponible = tieneContenido && nivelAlcanzado;
          const completado = m.aventuraOrden !== undefined && aventurasCompletadas.includes(m.aventuraOrden);
          const faltan = Math.max(0, (m.nivelRequerido - 1) * XP_POR_NIVEL - xp);
          const avance = nivelAlcanzado
            ? 100
            : Math.round((xp / ((m.nivelRequerido - 1) * XP_POR_NIVEL)) * 100);

          return (
            <li
              key={m.numero}
              className={`relative flex gap-4 rounded-lg border p-4 pl-3 ${
                disponible
                  ? "border-primary/60 bg-primary/5"
                  : "border-border/70 bg-background/40"
              }`}
            >
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-display text-sm ${
                  disponible
                    ? "border-primary bg-primary text-primary-foreground"
                    : nivelAlcanzado
                      ? "border-accent bg-secondary text-accent"
                      : "border-border bg-secondary text-muted-foreground"
                }`}
                aria-hidden
              >
                {disponible ? <Swords className="h-4 w-4" /> : nivelAlcanzado ? <Sparkles className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Mundo {m.numero} · {m.competencia}
                </p>
                <h3
                  className={`mt-0.5 font-display text-base ${
                    disponible ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {m.nombre}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.descripcion}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  {disponible ? (
                    <span className="rounded-full border border-success/60 bg-success/10 px-2 py-0.5 text-success">
                      {completado ? "En curso · misión completada" : "Disponible"}
                    </span>
                  ) : nivelAlcanzado ? (
                    <span className="rounded-full border border-accent/60 px-2 py-0.5 text-accent">
                      Nivel alcanzado · en preparación
                    </span>
                  ) : (
                    <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                      Bloqueado · requiere nivel {m.nivelRequerido}
                    </span>
                  )}
                  {!nivelAlcanzado && (
                    <span className="text-muted-foreground">faltan {faltan} XP</span>
                  )}
                </div>

                {!nivelAlcanzado && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                      style={{ width: `${Math.min(100, avance)}%` }}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
