import { Link } from "@tanstack/react-router";
import { Shirt, SlidersHorizontal } from "lucide-react";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarStage } from "./AvatarStage";
import { CharacterCard } from "./CharacterCard";
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
    <section className="space-y-4" aria-labelledby="titulo-mi-heroe">
      <header className="flex items-center justify-between border-b border-border/70 pb-3">
        <h2
          id="titulo-mi-heroe"
          className="text-xs font-bold uppercase tracking-[0.35em] text-accent"
        >
          Mi héroe
        </h2>
        <span className="text-xs text-muted-foreground">Expediente del Bosque</span>
      </header>
      <AvatarStage configuracion={configuracion} nombre={nombre} compacto />
      <CharacterCard nombre={nombre} clase={clase} xp={xp} insignias={insignias} />
      <div className="grid grid-cols-2 gap-3">
          <Button asChild>
            <Link to="/personalizar" search={{ categoria: "face" }}><SlidersHorizontal aria-hidden /> Personalizar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/personalizar" search={{ categoria: "top" }}><Shirt aria-hidden /> Vestuario</Link>
          </Button>
      </div>
    </section>
  );
}
