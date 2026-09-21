import { Link } from "@tanstack/react-router";
import { Backpack, Check, ChevronRight, Compass, Lock, Medal, ScrollText, Shield, Sparkles } from "lucide-react";
import type { AvatarItem } from "@/lib/consultas";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarModular } from "./AvatarModular";
import { AvatarStage } from "./AvatarStage";
import { XPBar } from "./BarraXp";
import { RarityBadge } from "./RarityBadge";
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

  return (
    <section className="adventure-stage relative isolate min-h-[1120px] overflow-hidden sm:min-h-[980px] lg:min-h-[780px]" aria-labelledby="aventura-mundo-actual">
      <AvatarStage nombre={nombre} configuracion={configuracion} integrado />

      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 px-4 pt-5 sm:px-7 sm:pt-7 lg:px-10">
        <div className="min-w-0 drop-shadow-lg">
          <p className="font-adventure-body text-[10px] font-bold uppercase text-accent sm:text-xs">Mundo 1 · Localización de información</p>
          <h1 id="aventura-mundo-actual" className="mt-1 font-adventure text-3xl text-primary sm:text-5xl">Bosque de las Palabras</h1>
        </div>
        <div className="hud-level shrink-0" aria-label={`Nivel ${nivel}`}><span>Nivel</span><strong>{String(nivel).padStart(2, "0")}</strong></div>
      </div>

      <aside id="mi-heroe" className="player-hud absolute left-4 top-[650px] z-30 w-[calc(100%-2rem)] sm:left-7 sm:top-[700px] sm:w-[360px] lg:left-10 lg:top-1/2 lg:w-[290px] lg:-translate-y-1/2" aria-label={`Datos de ${nombre}`}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0"><span className="text-[10px] font-bold uppercase text-accent">Héroe lector</span><h2 className="truncate font-adventure text-2xl text-foreground">{nombre}</h2></div>
          <Shield className="h-6 w-6 shrink-0 text-primary" aria-hidden />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{clase} · {rangoDeNivel(nivel)}</p>
        <div className="mt-3"><XPBar xp={xp} /></div>
      </aside>

      <aside className="absolute inset-x-4 top-[825px] z-30 sm:inset-x-auto sm:bottom-7 sm:right-7 sm:top-auto sm:w-[400px] lg:bottom-auto lg:right-10 lg:top-[150px] lg:w-[360px]">
        <section className="quest-focus reveal-up" aria-labelledby="mision-actual">
          <div className="flex items-center gap-2 text-accent"><ScrollText className="h-4 w-4" aria-hidden /><p className="text-[10px] font-bold uppercase">Misión principal</p></div>
          <p className="mt-3 text-[10px] font-bold uppercase text-primary">{aventuraTitulo ?? "El Enigma de la Biblioteca Perdida"}</p>
          <h2 id="mision-actual" className="mt-1 font-adventure text-2xl leading-tight text-foreground sm:text-3xl">{mision?.titulo ?? "Próxima expedición"}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{mision?.sinopsis ?? "El archivo prepara una nueva pista para tu héroe."}</p>
          {mision && <div className="mt-3 flex items-center justify-between text-xs"><span className="text-muted-foreground">Recompensa disponible</span><span className="font-bold text-primary">{mision.xp_base} XP</span></div>}
          {mision && <Button asChild size="lg" className="game-cta mt-4 w-full"><Link to="/mision/$misionId" params={{ misionId: mision.id }}>{mision.completada ? "Repetir aventura" : "Continuar aventura"}<ChevronRight aria-hidden /></Link></Button>}
        </section>
      </aside>

      <div className="absolute bottom-[175px] left-4 z-30 hidden lg:block">
        <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase text-accent">Equipo</p><Button asChild variant="ghost" size="sm"><Link to="/personalizar" search={{ categoria: "top" }} aria-label="Abrir mochila"><Backpack aria-hidden /></Link></Button></div>
        <div className="mt-2 flex gap-2">
          {equipados.slice(0, 5).map((item) => <div key={item.id} title={`${item.name} · ${item.rarity} · equipado`} className="equipment-slot group/equipo"><AvatarModular configuracion={{ [item.category]: item.asset }} nombre={item.name} className="absolute inset-x-[8%] bottom-0 border-0 bg-transparent transition-transform group-hover/equipo:scale-110" /><Check className="absolute right-1 top-1 h-3 w-3 text-success" aria-hidden /></div>)}
        </div>
      </div>

      <div id="insignias" className="absolute bottom-[66px] left-4 z-30 hidden lg:block" aria-label="Trofeos">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-accent"><Medal className="h-4 w-4 text-primary" aria-hidden /> Trofeos <span className="text-muted-foreground">{obtenidas.length}/{insignias.length}</span></div>
        <div className="mt-2 flex gap-2">{insignias.slice(0, 4).map((insignia) => <div key={insignia.nombre} title={insignia.nombre} className={`trophy-slot ${insignia.desbloqueada ? "is-earned" : "is-locked"}`}>{insignia.desbloqueada ? <Sparkles className="h-5 w-5" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}</div>)}</div>
        {obtenidas[0] && <div className="mt-2 flex items-center gap-2"><span className="max-w-40 truncate text-xs text-foreground">{obtenidas[0].nombre}</span><RarityBadge rareza="Épica" /></div>}
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold text-primary lg:flex"><Compass className="h-4 w-4" aria-hidden /> Expedición activa</div>
    </section>
  );
}