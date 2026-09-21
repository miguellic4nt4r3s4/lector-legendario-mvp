import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Lock, MapPin } from "lucide-react";
import { Encabezado } from "@/components/juego/Encabezado";
import { AdventureStage } from "@/components/juego/AdventureStage";
import { MapaReino } from "@/components/juego/MapaReino";
import {
  aventurasQuery,
  inventarioAvatarQuery,
  heroeQuery,
  insigniasCatalogoQuery,
  insigniasHeroeQuery,
  perfilQuery,
  progresoQuery,
} from "@/lib/consultas";
import type { ConfiguracionAvatar } from "@/components/juego/AvatarModular";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/aventura")({
  head: () => ({
    meta: [
      { title: "Mi aventura — Lector Legendario" },
      {
        name: "description",
        content: "Mapa de misiones, experiencia acumulada e insignias de tu héroe investigador.",
      },
      { property: "og:title", content: "Mi aventura — Lector Legendario" },
      { property: "og:description", content: "Continúa tus misiones de comprensión lectora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Aventura,
});

function Aventura() {
  const navigate = useNavigate();
  const { data: perfil } = useQuery(perfilQuery());
  const { data: heroe, isLoading: cargandoHeroe } = useQuery(heroeQuery());
  const { data: aventuras } = useQuery(aventurasQuery());
  const { data: progreso } = useQuery(progresoQuery(heroe?.id));
  const { data: insignias } = useQuery(insigniasHeroeQuery(heroe?.id));
  const { data: catalogo } = useQuery(insigniasCatalogoQuery());
  const { data: inventarioAvatar } = useQuery(inventarioAvatarQuery(heroe?.id));

  useEffect(() => {
    if (!cargandoHeroe && heroe === null && perfil?.rol === "estudiante") {
      navigate({ to: "/heroe" });
    }
    if (perfil?.rol === "docente") {
      navigate({ to: "/docente" });
    }
  }, [cargandoHeroe, heroe, perfil, navigate]);

  if (!heroe) {
    return (
      <div className="min-h-screen">
        <Encabezado rol={perfil?.rol} />
        <main className="mx-auto max-w-5xl px-4 py-12 text-muted-foreground">
          Preparando tu expediente…
        </main>
      </div>
    );
  }

  const progresoPorMision = new Map((progreso ?? []).map((p) => [p.mision_id, p]));
  const insigniasObtenidas = new Set((insignias ?? []).map((i) => (i.insignias as unknown as { id: string }).id));
  const aventurasCompletadas = (aventuras ?? [])
    .filter((a) => {
      const ms = (a.misiones as unknown as { id: string }[]) ?? [];
      return ms.some((m) => progresoPorMision.get(m.id)?.completada);
    })
    .map((a) => a.orden);
  const configuracionAvatar = Object.fromEntries(
    (inventarioAvatar ?? []).filter((fila) => fila.equipped).map((fila) => [fila.category, fila.avatar_items.asset]),
  ) as ConfiguracionAvatar;
  const equipados = (inventarioAvatar ?? []).filter((fila) => fila.equipped).map((fila) => fila.avatar_items);
  const primeraAventura = aventuras?.[0];
  const misionesPrimeraAventura = ((primeraAventura?.misiones as unknown as {
    id: string; titulo: string; sinopsis: string; xp_base: number; orden: number; disponible: boolean;
  }[]) ?? []).sort((a, b) => a.orden - b.orden);
  const misionActual = misionesPrimeraAventura.find((mision) => mision.disponible && !progresoPorMision.get(mision.id)?.completada)
    ?? misionesPrimeraAventura.find((mision) => mision.disponible);
  const progresoMisionActual = misionActual ? progresoPorMision.get(misionActual.id) : undefined;

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="pb-10 lg:mx-auto lg:max-w-[1440px] lg:px-4 lg:py-5">
        <AdventureStage
          nombre={heroe.nombre}
          clase={heroe.clase}
          xp={heroe.xp}
          configuracion={configuracionAvatar}
          equipados={equipados}
          insignias={(catalogo ?? []).map((insignia) => ({ nombre: insignia.nombre, icono: insignia.icono, desbloqueada: insigniasObtenidas.has(insignia.id) }))}
          mision={misionActual ? { ...misionActual, completada: progresoMisionActual?.completada ?? false, iniciada: !!progresoMisionActual } : undefined}
        />

        <div className="mx-auto mt-8 grid max-w-6xl gap-7 px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:px-0">
          <div id="mapa"><MapaReino xp={heroe.xp} aventurasCompletadas={aventurasCompletadas} /></div>
          <section className="space-y-6">
            {(aventuras ?? []).map((aventura) => {
              const misiones = ((aventura.misiones as unknown as {
                id: string;
                titulo: string;
                sinopsis: string;
                xp_base: number;
                orden: number;
                disponible: boolean;
              }[]) ?? []).sort((a, b) => a.orden - b.orden);

              return (
                <article key={aventura.id} className="quest-journal rounded-lg p-5 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent">Mundo 1</p>
                  <h2 className="mt-1 font-display text-2xl font-bold uppercase text-primary">Bosque de las Palabras</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-accent">Localización de información</p>
                  <p className="mt-3 font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Aventura {aventura.orden}
                  </p>
                  <h1 className="mt-1 font-display text-2xl uppercase tracking-wide text-primary sm:text-3xl">
                    {aventura.titulo}
                  </h1>
                  <p className="mt-2 text-muted-foreground">{aventura.descripcion}</p>
                  {aventura.ambientacion && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {aventura.ambientacion}
                    </p>
                  )}

                  <ol className="mt-6 space-y-3">
                    {misiones.map((m) => {
                      const p = progresoPorMision.get(m.id);
                      return (
                        <li
                          key={m.id}
                          className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-background/40 p-4"
                        >
                          <div className="min-w-[200px] flex-1">
                            <p className="font-semibold text-foreground">{m.titulo}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{m.sinopsis}</p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {p
                                ? `${p.aciertos}/${p.total} aciertos · ${p.xp_ganado} XP ganados${
                                    p.completada ? " · completada" : " · en curso"
                                  }`
                                : `Sin iniciar · hasta ${m.xp_base} XP`}
                            </p>
                          </div>
                          {m.disponible ? (
                            <Button asChild><Link to="/mision/$misionId" params={{ misionId: m.id }}>{p?.completada ? "Repetir misión" : p ? "Continuar" : "Iniciar misión"}</Link></Button>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">
                              <Lock className="h-4 w-4" aria-hidden /> Bloqueada
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </article>
              );
            })}

            <p className="text-center text-xs text-muted-foreground">
              Próximas misiones y aventuras se irán abriendo en esta misma ruta.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
