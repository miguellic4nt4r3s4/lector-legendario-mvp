import { Link } from "@tanstack/react-router";
import { Backpack, Check, Compass, Lock, Medal, ScrollText, Shield, Sparkles } from "lucide-react";
import bosquePalabras from "@/assets/bosque-palabras-stage.jpg";
import type { AvatarItem } from "@/lib/consultas";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";
import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarModular } from "./AvatarModular";
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
};

export function AdventureStage({ nombre, clase, xp, configuracion, equipados, insignias, mision }: Props) {
  const nivel = nivelDesdeXp(xp);
  const obtenidas = insignias.filter((insignia) => insignia.desbloqueada);

  return (
    <section className="adventure-stage relative isolate min-h-[760px] overflow-hidden border-y border-primary/35 lg:min-h-[720px] lg:rounded-lg lg:border" aria-labelledby="aventura-mundo-actual">
      <img src={bosquePalabras} alt="Bosque de las Palabras iluminado entre libros y ruinas" className="absolute inset-0 h-full w-full object-cover" width={1536} height={1024} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/5 to-background" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_var(--color-background)]" aria-hidden />
      <div className="adventure-mist absolute inset-x-0 bottom-0 h-2/5" aria-hidden />

      <div className="relative z-20 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-4 sm:p-6">
        <div className="min-w-0">
          <p className="font-adventure text-xs font-semibold uppercase text-accent">Mundo 1 · Localización de información</p>
          <h1 id="aventura-mundo-actual" className="mt-1 truncate font-adventure text-2xl text-primary sm:text-4xl">Bosque de las Palabras</h1>
        </div>
        <div className="hud-chip shrink-0 text-right">
          <span className="block text-[10px] font-bold uppercase text-muted-foreground">Nivel</span>
          <span className="font-adventure text-2xl text-primary">{nivel}</span>
        </div>
      </div>

      <div className="relative z-10 grid min-h-[610px] grid-cols-1 px-4 pb-4 sm:px-6 sm:pb-6 lg:grid-cols-[minmax(250px,0.82fr)_minmax(330px,1.25fr)_minmax(280px,0.93fr)] lg:items-stretch lg:gap-5">
        <aside id="mi-heroe" className="order-2 z-20 self-end lg:order-1 lg:pb-5">
          <div className="hud-panel p-4 sm:p-5">
            <p className="text-[10px] font-bold uppercase text-accent">Héroe lector</p>
            <h2 className="mt-1 truncate font-adventure text-2xl text-foreground">{nombre}</h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Shield className="h-4 w-4 text-primary" aria-hidden /> {clase}</div>
            <p className="mt-3 font-adventure text-lg text-primary">{rangoDeNivel(nivel)}</p>
            <div className="mt-3"><XPBar xp={xp} /></div>
            <Button asChild variant="outline" className="mt-4 w-full"><Link to="/personalizar" search={{ categoria: "top" }}><Backpack aria-hidden /> Abrir armería</Link></Button>
          </div>

          <div className="hud-panel mt-3 p-4">
            <div className="flex items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase text-accent">Equipo activo</p><span className="text-xs text-muted-foreground">{equipados.length} piezas</span></div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {equipados.slice(0, 8).map((item) => (
                <div key={item.id} title={`${item.name} · ${item.rarity}`} className="group/equipo relative aspect-square overflow-hidden rounded-md border border-border/80 bg-background/65 transition hover:-translate-y-0.5 hover:border-primary/70">
                  <AvatarModular configuracion={{ [item.category]: item.asset }} nombre={item.name} className="absolute inset-x-[10%] bottom-0 border-0 bg-transparent" />
                  <Check className="absolute right-1 top-1 h-3 w-3 text-success" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="order-1 relative min-h-[440px] lg:order-2 lg:min-h-0">
          <div className="absolute inset-x-[8%] bottom-5 h-20 rounded-full bg-background/75 blur-xl" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center">
            <AvatarModular configuracion={configuracion} nombre={`Héroe ${nombre}`} className="w-full max-w-[440px] border-0 bg-transparent drop-shadow-2xl" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/45 bg-background/80 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-md">
            <Compass className="mr-1.5 inline h-3.5 w-3.5" aria-hidden /> Expedición activa
          </div>
        </div>

        <aside className="order-3 z-20 flex flex-col justify-end gap-3 lg:pb-5">
          <section className="quest-journal p-5" aria-labelledby="mision-actual">
            <div className="flex items-center gap-2 text-accent"><ScrollText className="h-4 w-4" aria-hidden /><p className="text-[10px] font-bold uppercase">Misión actual</p></div>
            <h2 id="mision-actual" className="mt-3 font-adventure text-2xl leading-tight text-foreground">{mision?.titulo ?? "Próxima expedición"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mision?.sinopsis ?? "El archivo prepara una nueva pista para tu héroe."}</p>
            {mision && <div className="mt-4 flex items-center justify-between gap-3 border-y border-border/60 py-3 text-xs"><span className="text-muted-foreground">Recompensa</span><span className="font-bold text-primary">Hasta {mision.xp_base} XP</span></div>}
            {mision && <Button asChild className="mt-4 w-full"><Link to="/mision/$misionId" params={{ misionId: mision.id }}>{mision.completada ? "Repetir misión" : mision.iniciada ? "Continuar" : "Iniciar misión"}</Link></Button>}
          </section>

          <section id="insignias" className="hud-panel p-4" aria-label="Progreso de insignias">
            <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Medal className="h-4 w-4 text-primary" aria-hidden /><p className="text-[10px] font-bold uppercase text-accent">Trofeos</p></div><span className="text-xs text-muted-foreground">{obtenidas.length}/{insignias.length}</span></div>
            <div className="mt-3 flex gap-2">
              {insignias.slice(0, 4).map((insignia) => (
                <div key={insignia.nombre} title={insignia.nombre} className={`relative flex h-12 w-12 items-center justify-center rounded-full border bg-background/70 ${insignia.desbloqueada ? "border-primary/70 reward-glow" : "border-border opacity-45"}`}>
                  {insignia.desbloqueada ? <Sparkles className="h-5 w-5 text-primary" aria-hidden /> : <Lock className="h-4 w-4 text-muted-foreground" aria-hidden />}
                </div>
              ))}
            </div>
            {obtenidas[0] && <div className="mt-3 flex items-center justify-between gap-2"><span className="truncate text-xs text-foreground">{obtenidas[0].nombre}</span><RarityBadge rareza="Épica" /></div>}
          </section>
        </aside>
      </div>
    </section>
  );
}