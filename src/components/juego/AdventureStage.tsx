import { Link } from "@tanstack/react-router";
import { Backpack, ChevronRight, Compass, Crown, Gem, LockKeyhole, Medal, ScrollText, Shield } from "lucide-react";
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

export function AdventureStage({ nombre, clase, xp, configuracion, equipados, insignias, mision, aventuraTitulo }: Props) {
  const nivel = nivelDesdeXp(xp);
  const obtenidas = insignias.filter((insignia) => insignia.desbloqueada);
  const ranuras = equipados.slice(0, 6);

  return (
    <section className="adventure-stage" aria-labelledby="aventura-mundo-actual">
      <div className="adventure-artboard">
        <AvatarStage nombre={nombre} configuracion={configuracion} integrado />

        <div className="adventure-zone-label">
          <span>Mundo 01</span>
          <h1 id="aventura-mundo-actual">Bosque de las Palabras</h1>
          <p><Compass aria-hidden /> Localización de información</p>
        </div>

        <div id="mi-heroe" className="hero-identity" aria-label={`Datos de ${nombre}`}>
          <span className="hero-identity-kicker">Héroe lector</span>
          <h2>{nombre}</h2>
          <p>{clase}</p>
          <div className="hero-level"><strong>{String(nivel).padStart(2, "0")}</strong><span>Nivel<br />{rangoDeNivel(nivel)}</span></div>
        </div>

        <aside className="quest-console reveal-up" aria-labelledby="mision-actual">
          <div className="quest-console-heading"><ScrollText aria-hidden /><span>Misión activa</span></div>
          <p className="quest-adventure-name">{aventuraTitulo ?? "El Enigma de la Biblioteca Perdida"}</p>
          <h2 id="mision-actual">{mision?.titulo ?? "Próxima expedición"}</h2>
          <p className="quest-copy">{mision?.sinopsis ?? "El archivo prepara una nueva pista para tu héroe."}</p>
          {mision && <div className="quest-reward"><Gem aria-hidden /><span>Recompensa</span><strong>+{mision.xp_base} XP</strong></div>}
          {mision && <Button asChild className="game-cta"><Link to="/mision/$misionId" params={{ misionId: mision.id }}>{mision.completada ? "Repetir aventura" : "Continuar aventura"}<ChevronRight aria-hidden /></Link></Button>}
        </aside>

        <div className="adventure-bottom-hud">
          <section className="xp-console" aria-label={`Progreso de ${nombre}`}>
            <div className="xp-console-top"><span>Progreso del héroe</span><strong>NV. {String(nivel).padStart(2, "0")}</strong></div>
            <XPBar xp={xp} compacta />
            <p>{xp} XP acumulados</p>
          </section>

          <section className="loadout-console" aria-label="Equipo actual">
            <div className="console-title"><Backpack aria-hidden /><span>Equipo</span></div>
            <div className="loadout-slots">
              {ranuras.map((item) => <span key={item.id} className="loadout-slot" title={item.name}><Shield aria-hidden /><small>{item.name}</small></span>)}
              {Array.from({ length: Math.max(0, 4 - ranuras.length) }).map((_, index) => <span key={`vacia-${index}`} className="loadout-slot is-locked"><LockKeyhole aria-hidden /></span>)}
            </div>
            <Button asChild variant="ghost" size="sm" className="console-link"><Link to="/personalizar" search={{ categoria: "top" }}>Ver mochila<ChevronRight aria-hidden /></Link></Button>
          </section>

          <section id="insignias" className="trophy-console" aria-label={`${obtenidas.length} trofeos obtenidos`}>
            <div className="console-title"><Medal aria-hidden /><span>Trofeos</span></div>
            <div className="trophy-summary"><Crown aria-hidden /><strong>{obtenidas.length}</strong><span>obtenidos</span></div>
          </section>
        </div>
      </div>
    </section>
  );
}