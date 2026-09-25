import { Link } from "@tanstack/react-router";
import { Backpack, ChevronRight, Medal, Sparkles } from "lucide-react";
import type { AvatarItem } from "@/lib/consultas";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarStage } from "./AvatarStage";
import { XPBar } from "./BarraXp";
import { Button } from "@/components/ui/button";

type MisionDestacada = {
  id: string;
  titulo: string;
  sinopsis: string;
  xp_base: number;
  completada: boolean;
  iniciada: boolean;
};

type InsigniaResumen = {
  nombre: string;
  icono: string;
  desbloqueada: boolean;
};

type Props = {
  nombre: string;
  clase: string;
  xp: number;
  configuracion: ConfiguracionAvatar;
  equipados: AvatarItem[];
  insignias: InsigniaResumen[];
  mision?: MisionDestacada | undefined;
  aventuraTitulo?: string | undefined;
};

export function AdventureStage({ nombre, xp, configuracion, insignias, mision }: Props) {
  const nivel = nivelDesdeXp(xp);
  const obtenidas = insignias.filter((insignia) => insignia.desbloqueada).length;

  return (
    <section className="adventure-stage" aria-labelledby="aventura-mundo-actual">
      <div className="adventure-world">
        <AvatarStage nombre={nombre} configuracion={configuracion} integrado />

        <div className="world-location hud-text">
          <span>Mundo 01</span>
          <h1 id="aventura-mundo-actual">Bosque de las Palabras</h1>
        </div>

        <div id="mi-heroe" className="hero-hud hud-text" aria-label={`Progreso de ${nombre}`}>
          <p className="hero-hud-name">{nombre}</p>
          <p className="hero-hud-level">LV. {String(nivel).padStart(2, "0")} <small>{rangoDeNivel(nivel)}</small></p>
          <XPBar xp={xp} compacta />
        </div>

        {mision && (
          <aside className="quest-marker reveal-up" aria-labelledby="mision-actual">
            <p className="quest-marker-kicker hud-text"><Sparkles aria-hidden />Misión activa</p>
            <h2 id="mision-actual" className="hud-text">{mision.titulo}</h2>
            <p className="quest-marker-xp">+{mision.xp_base} XP</p>
            <Button asChild className="game-cta">
              <Link to="/mision/$misionId" params={{ misionId: mision.id }}>
                {mision.completada ? "Repetir" : "Continuar"}<ChevronRight aria-hidden />
              </Link>
            </Button>
          </aside>
        )}

        <nav id="insignias" className="minimal-actions" aria-label="Accesos rápidos">
          <Link to="/personalizar" search={{ categoria: "top" }} aria-label="Abrir mochila" title="Mochila"><Backpack aria-hidden /></Link>
          <a href="#mapa" className="is-trophy" aria-label={`${obtenidas} trofeos obtenidos`} title="Trofeos"><Medal aria-hidden />{obtenidas}</a>
        </nav>
      </div>
    </section>
  );
}
