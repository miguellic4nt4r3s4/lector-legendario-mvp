import { MUNDOS, nivelDesdeXp } from "@/lib/juego";
import { WorldCard } from "./WorldCard";

export function WorldMap({ xp, aventurasCompletadas = [] }: { xp: number; aventurasCompletadas?: number[] }) {
  const nivel = nivelDesdeXp(xp);
  return <section className="world-map relative isolate min-h-[760px] overflow-hidden px-5 py-12 sm:px-8 lg:min-h-[620px] lg:px-12" aria-labelledby="titulo-mapa-reino">
    <div className="world-map-atmosphere absolute inset-0" aria-hidden />
    <div className="relative z-10 text-center"><p className="text-xs font-bold uppercase text-accent">Ruta de la leyenda</p><h2 id="titulo-mapa-reino" className="mt-1 font-adventure text-4xl text-primary sm:text-5xl">Mapa del Reino</h2><p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Seis territorios. Un sendero que se revela con cada lectura.</p></div>
    <ol className="world-route relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      <div className="world-route-line absolute" aria-hidden />
      {MUNDOS.map((mundo, index) => <WorldCard key={mundo.numero} mundo={mundo} xp={xp} nivel={nivel} completado={mundo.aventuraOrden !== undefined && aventurasCompletadas.includes(mundo.aventuraOrden)} posicion={index} />)}
    </ol>
  </section>;
}