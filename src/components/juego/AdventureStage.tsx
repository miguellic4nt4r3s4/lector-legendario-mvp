import { Link } from "@tanstack/react-router";
import { Backpack, ChevronRight, Compass, Medal, ScrollText } from "lucide-react";
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

export function AdventureStage({ nombre, clase, xp, configuracion, insignias, mision, aventuraTitulo }: Props) {
  const nivel = nivelDesdeXp(xp);
  const obtenidas = insignias.filter((insignia) => insignia.desbloqueada);

  return (
    <section className="adventure-stage relative isolate h-[860px] overflow-hidden sm:h-[900px] lg:h-[calc(100svh-61px)] lg:min-h-[690px] lg:max-h-[860px]" aria-labelledby="aventura-mundo-actual">
      <AvatarStage nombre={nombre} configuracion={configuracion} integrado />

      <div className="adventure-zone-label absolute left-4 top-5 z-20 sm:left-7 sm:top-7 lg:left-9">
        <span>Mundo 01</span>
        <h1 id="aventura-mundo-actual">Bosque de las Palabras</h1>
        <p>Localización de información</p>
      </div>

      <aside className="quest-marker absolute z-30" aria-labelledby="mision-actual">
        <div className="quest-marker-line" aria-hidden />
        <section className="quest-ribbon reveal-up">
          <div className="flex items-center gap-2 text-accent"><ScrollText className="h-4 w-4" aria-hidden /><p className="text-[10px] font-bold uppercase">Misión activa</p></div>
          <p className="mt-2 text-[9px] font-bold uppercase text-primary">{aventuraTitulo ?? "El Enigma de la Biblioteca Perdida"}</p>
          <h2 id="mision-actual" className="mt-1 font-adventure text-2xl leading-tight text-foreground">{mision?.titulo ?? "Próxima expedición"}</h2>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{mision?.sinopsis ?? "El archivo prepara una nueva pista para tu héroe."}</p>
          {mision && <div className="mt-2 flex items-center justify-between text-[11px]"><span className="text-muted-foreground">Recompensa</span><strong className="text-primary">{mision.xp_base} XP</strong></div>}
          {mision && <Button asChild size="sm" className="game-cta mt-3 w-full"><Link to="/mision/$misionId" params={{ misionId: mision.id }}>{mision.completada ? "Repetir aventura" : "Continuar aventura"}<ChevronRight aria-hidden /></Link></Button>}
        </section>
      </aside>

      <div id="mi-heroe" className="player-strip absolute z-30" aria-label={`Datos de ${nombre}`}>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h2 className="truncate font-adventure text-xl text-foreground">{nombre}</h2>
            <span className="shrink-0 text-[10px] font-bold uppercase text-primary">Nv. {String(nivel).padStart(2, "0")}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{clase} · {rangoDeNivel(nivel)}</p>
          <div className="mt-2 max-w-[300px]"><XPBar xp={xp} /></div>
        </div>
        <div id="insignias" className="flex shrink-0 items-center gap-2" aria-label={`${obtenidas.length} trofeos obtenidos`}>
          <Button asChild variant="ghost" size="icon" className="hud-action" title="Abrir mochila"><Link to="/personalizar" search={{ categoria: "top" }} aria-label="Abrir mochila"><Backpack aria-hidden /></Link></Button>
          <span className="hud-trophy"><Medal className="h-4 w-4" aria-hidden /><strong>{obtenidas.length}</strong></span>
        </div>
      </div>

      <div className="adventure-path-marker absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase text-primary lg:flex"><Compass className="h-3.5 w-3.5" aria-hidden /> Sendero activo</div>
    </section>
  );
}