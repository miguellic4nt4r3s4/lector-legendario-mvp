import { Link } from "@tanstack/react-router";
import { Shirt, SlidersHorizontal } from "lucide-react";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarModular } from "./AvatarModular";
import { BarraXp } from "./BarraXp";
import { Button } from "@/components/ui/button";

type Props = {
  nombre: string;
  clase: string;
  configuracion?: ConfiguracionAvatar;
  xp: number;
  insignias?: number;
};

/**
 * Zona "MI HÉROE". El marco del avatar es un contenedor fijo (aspect-square)
 * pensado para alojar en el futuro un avatar 2D modular por capas
 * (cuerpo, rostro, atuendo, accesorio); hoy renderiza el emblema elegido.
 */
export function TarjetaHeroe({ nombre, clase, configuracion, xp, insignias = 0 }: Props) {
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
        <div className="relative mx-auto w-full max-w-[240px]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_28%,transparent),transparent_70%)] blur-xl" />
          <div className="relative">
            <AvatarModular configuracion={configuracion} nombre={`Avatar modular de ${nombre}`} />
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button asChild>
            <Link to="/personalizar" search={{ categoria: "face" }}><SlidersHorizontal aria-hidden /> Personalizar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/personalizar" search={{ categoria: "top" }}><Shirt aria-hidden /> Vestuario</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
