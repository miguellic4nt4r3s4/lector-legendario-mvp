import { AVATAR_EMOJI, nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import { BarraXp } from "./BarraXp";

type Props = {
  nombre: string;
  clase: string;
  avatar: string;
  xp: number;
  insignias?: number;
};

/**
 * Zona "MI HÉROE". El marco del avatar es un contenedor fijo (aspect-square)
 * pensado para alojar en el futuro un avatar 2D modular por capas
 * (cuerpo, rostro, atuendo, accesorio); hoy renderiza el emblema elegido.
 */
export function TarjetaHeroe({ nombre, clase, avatar, xp, insignias = 0 }: Props) {
  const nivel = nivelDesdeXp(xp);
  return (
    <section className="panel overflow-hidden" aria-labelledby="titulo-mi-heroe">
      <header className="border-b border-border/70 bg-secondary/40 px-5 py-3">
        <h2
          id="titulo-mi-heroe"
          className="font-display text-xs uppercase tracking-[0.35em] text-accent"
        >
          Mi héroe
        </h2>
      </header>

      <div className="p-5">
        {/* Marco del avatar — preparado para avatar 2D modular */}
        <div className="relative mx-auto aspect-square w-full max-w-[220px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_28%,transparent),transparent_70%)] blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-primary/60 bg-gradient-to-b from-secondary to-background shadow-[inset_0_0_40px_oklch(0_0_0/0.45)]">
            <div className="absolute inset-2 rounded-full border border-accent/30" />
            <span className="text-[5.5rem] leading-none drop-shadow-[0_6px_12px_oklch(0_0_0/0.6)]" aria-hidden>
              {AVATAR_EMOJI[avatar] ?? "🔍"}
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-primary bg-background px-3 py-0.5 font-display text-xs uppercase tracking-widest text-primary">
              Nv. {nivel}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="truncate font-display text-2xl text-primary">{nombre}</h3>
          <p className="text-sm text-muted-foreground">{clase}</p>
          <p className="mt-2 font-display text-base text-foreground">
            Nivel {nivel} — {rangoDeNivel(nivel)}
          </p>
        </div>

        <div className="mt-5">
          <BarraXp xp={xp} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">XP totales</dt>
            <dd className="font-display text-xl text-primary">{xp}</dd>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Insignias</dt>
            <dd className="font-display text-xl text-primary">{insignias}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
