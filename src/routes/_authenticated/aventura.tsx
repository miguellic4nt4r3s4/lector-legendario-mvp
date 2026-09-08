import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Lock, MapPin } from "lucide-react";
import { Encabezado } from "@/components/juego/Encabezado";
import { TarjetaHeroe } from "@/components/juego/TarjetaHeroe";
import { Insignia } from "@/components/juego/Insignia";
import { MapaReino } from "@/components/juego/MapaReino";
import {
  aventurasQuery,
  heroeQuery,
  insigniasCatalogoQuery,
  insigniasHeroeQuery,
  perfilQuery,
  progresoQuery,
} from "@/lib/consultas";
import { CONDICION_POR_CODIGO, MUNDO_POR_CODIGO, rarezaDe } from "@/lib/juego";

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
  const obtenidaPorId = new Map(
    (insignias ?? []).map((i) => {
      const ins = i.insignias as unknown as { id: string };
      return [ins.id, i.obtenida_at as string];
    }),
  );
  const aventurasCompletadas = (aventuras ?? [])
    .filter((a) => {
      const ms = (a.misiones as unknown as { id: string }[]) ?? [];
      return ms.some((m) => progresoPorMision.get(m.id)?.completada);
    })
    .map((a) => a.orden);

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-6">
            <TarjetaHeroe
              nombre={heroe.nombre}
              clase={heroe.clase}
              avatar={heroe.avatar}
              xp={heroe.xp}
              insignias={insignias?.length ?? 0}
            />
            <section className="panel p-5" aria-labelledby="titulo-insignias">
              <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
                Recompensas
              </p>
              <h2 id="titulo-insignias" className="mt-1 text-lg">
                Insignias
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {insignias?.length ?? 0} de {catalogo?.length ?? 0} desbloqueadas
              </p>
              <div className="mt-4 space-y-3">
                {(catalogo ?? []).map((ins) => {
                  const fecha = obtenidaPorId.get(ins.id) ?? null;
                  return (
                    <Insignia
                      key={ins.id}
                      nombre={ins.nombre}
                      descripcion={ins.descripcion}
                      icono={ins.icono}
                      rareza={rarezaDe(ins.codigo)}
                      desbloqueada={!!fecha}
                      fecha={fecha}
                      mundo={MUNDO_POR_CODIGO[ins.codigo]}
                      condicion={CONDICION_POR_CODIGO[ins.codigo]}
                      destacada={!!fecha}
                    />
                  );
                })}
              </div>
            </section>
          </aside>

          <section className="space-y-6">
            <MapaReino xp={heroe.xp} aventurasCompletadas={aventurasCompletadas} />
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
                <article key={aventura.id} className="panel p-6">
                  <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
                    Mundo 1 · Bosque de las Palabras
                  </p>
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
                            <Link
                              to="/mision/$misionId"
                              params={{ misionId: m.id }}
                              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                            >
                              {p?.completada ? "Repetir misión" : p ? "Continuar" : "Iniciar misión"}
                            </Link>
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
