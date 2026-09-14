import { MUNDOS, nivelDesdeXp } from "@/lib/juego";
import { WorldCard } from "./WorldCard";

export function WorldMap({ xp, aventurasCompletadas = [] }: { xp: number; aventurasCompletadas?: number[] }) {
  const nivel = nivelDesdeXp(xp);
  return <section className="relative overflow-hidden rounded-lg border border-border bg-card/55 p-5 sm:p-7" aria-labelledby="titulo-mapa-reino">
    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,var(--color-accent)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />
    <div className="relative"><p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Ruta de la leyenda</p><h2 id="titulo-mapa-reino" className="mt-1 font-display text-3xl font-bold text-primary">Mapa del Reino</h2><p className="mt-2 max-w-xl text-sm text-muted-foreground">Seis territorios de lectura. Cada sendero se revela con tu experiencia.</p></div>
    <ol className="relative mt-8 flex flex-col gap-5">
      <div className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-accent/70 to-border" aria-hidden />
      {MUNDOS.map((mundo, index) => <WorldCard key={mundo.numero} mundo={mundo} xp={xp} nivel={nivel} completado={mundo.aventuraOrden !== undefined && aventurasCompletadas.includes(mundo.aventuraOrden)} posicion={index} />)}
    </ol>
  </section>;
}