import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Encabezado } from "@/components/juego/Encabezado";
import { Insignia } from "@/components/juego/Insignia";
import { BarraXp } from "@/components/juego/BarraXp";
import { heroeQuery, misionQuery, perfilQuery, retosQuery, type Reto } from "@/lib/consultas";
import { ETIQUETA_COMPETENCIA, MUNDO_POR_CODIGO, nivelDesdeXp, rarezaDe } from "@/lib/juego";

export const Route = createFileRoute("/_authenticated/mision/$misionId")({
  head: () => ({
    meta: [
      { title: "Misión en curso — Lector Legendario" },
      {
        name: "description",
        content:
          "Lee el texto de la misión y resuelve los cinco retos de comprensión para ganar experiencia.",
      },
      { property: "og:title", content: "Misión en curso — Lector Legendario" },
      { property: "og:description", content: "Lectura, retos y retroalimentación inmediata." },
    ],
  }),
  component: PaginaMision,
});

type Respuesta = { retoId: string; opcion: number; correcto: boolean; competencia: string };

function PaginaMision() {
  const { misionId } = useParams({ from: "/_authenticated/mision/$misionId" });
  const queryClient = useQueryClient();
  const { data: perfil } = useQuery(perfilQuery());
  const { data: heroe } = useQuery(heroeQuery());
  const { data: mision } = useQuery(misionQuery(misionId));
  const { data: retos } = useQuery(retosQuery(misionId));

  const [fase, setFase] = useState<"lectura" | "retos" | "resultado">("lectura");
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [revelado, setRevelado] = useState(false);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [resultado, setResultado] = useState<{
    aciertos: number;
    xpGanado: number;
    insigniasNuevas: { codigo: string; nombre: string; descripcion: string; icono: string }[];
    xpTotal: number;
  } | null>(null);
  const [guardando, setGuardando] = useState(false);

  const listaRetos: Reto[] = useMemo(() => retos ?? [], [retos]);
  const retoActual = listaRetos[indice];

  if (!mision || !heroe || listaRetos.length === 0) {
    return (
      <div className="min-h-screen">
        <Encabezado rol={perfil?.rol} />
        <main className="mx-auto max-w-3xl px-4 py-12 text-muted-foreground">
          Abriendo el expediente de la misión…
        </main>
      </div>
    );
  }

  async function responder() {
    if (seleccion === null || !retoActual || !heroe) return;
    const correcto = seleccion === retoActual.respuesta_correcta;
    setRevelado(true);
    setRespuestas((prev) => [
      ...prev,
      {
        retoId: retoActual.id,
        opcion: seleccion,
        correcto,
        competencia: retoActual.competencia,
      },
    ]);
    await supabase.from("intentos").insert({
      hero_id: heroe.id,
      reto_id: retoActual.id,
      opcion_elegida: seleccion,
      correcto,
    });
  }

  async function siguiente() {
    if (indice < listaRetos.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
      setRevelado(false);
      return;
    }
    await finalizar();
  }

  async function finalizar() {
    if (!heroe) return;
    setGuardando(true);
    try {
      const aciertos = respuestas.filter((r) => r.correcto).length;
      const total = listaRetos.length;
      const xpRetos = respuestas.reduce((acc, r) => {
        const reto = listaRetos.find((x) => x.id === r.retoId);
        return acc + (r.correcto && reto ? reto.xp : 0);
      }, 0);
      const bonus = aciertos === total ? 20 : 0;

      const { data: progresoPrevio } = await supabase
        .from("progreso_misiones")
        .select("id, xp_ganado, aciertos")
        .eq("hero_id", heroe.id)
        .eq("mision_id", misionId)
        .maybeSingle();

      const xpEsteIntento = xpRetos + bonus;
      const xpPrevio = progresoPrevio?.xp_ganado ?? 0;
      const xpNuevo = Math.max(0, xpEsteIntento - xpPrevio);

      if (progresoPrevio) {
        await supabase
          .from("progreso_misiones")
          .update({
            aciertos: Math.max(aciertos, progresoPrevio.aciertos),
            total,
            xp_ganado: Math.max(xpEsteIntento, xpPrevio),
            completada: true,
            actualizado_at: new Date().toISOString(),
          })
          .eq("id", progresoPrevio.id);
      } else {
        await supabase.from("progreso_misiones").insert({
          hero_id: heroe.id,
          mision_id: misionId,
          aciertos,
          total,
          xp_ganado: xpEsteIntento,
          completada: true,
        });
      }

      const xpTotal = heroe.xp + xpNuevo;
      if (xpNuevo > 0) {
        await supabase
          .from("heroes")
          .update({ xp: xpTotal, nivel: nivelDesdeXp(xpTotal) })
          .eq("id", heroe.id);
      }

      const codigos: string[] = [];
      if (aciertos >= 3) codigos.push("ojo_del_archivo");
      if (aciertos === total) codigos.push("lector_legendario");

      const insigniasNuevas: { codigo: string; nombre: string; descripcion: string; icono: string }[] = [];
      if (codigos.length > 0) {
        const { data: catalogo } = await supabase
          .from("insignias")
          .select("id, codigo, nombre, descripcion, icono")
          .in("codigo", codigos);
        const { data: yaTiene } = await supabase
          .from("hero_insignias")
          .select("insignia_id")
          .eq("hero_id", heroe.id);
        const poseidas = new Set((yaTiene ?? []).map((x) => x.insignia_id));
        for (const ins of catalogo ?? []) {
          if (poseidas.has(ins.id)) continue;
          const { error } = await supabase
            .from("hero_insignias")
            .insert({ hero_id: heroe.id, insignia_id: ins.id });
          if (!error) {
            insigniasNuevas.push({
              codigo: ins.codigo,
              nombre: ins.nombre,
              descripcion: ins.descripcion,
              icono: ins.icono,
            });
          }
        }
      }

      setResultado({ aciertos, xpGanado: xpNuevo, insigniasNuevas, xpTotal });
      setFase("resultado");
      await queryClient.invalidateQueries();
    } finally {
      setGuardando(false);
    }
  }

  const aventura = mision.aventuras as unknown as {
    titulo: string;
    ambientacion: string | null;
    orden?: number;
  };

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="border-l-2 border-primary/60 pl-4">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
            Aventura {aventura?.orden ?? 1}
          </p>
          <p className="mt-1 font-display text-lg uppercase tracking-[0.15em] text-primary sm:text-xl">
            {aventura?.titulo}
          </p>
          <h1 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">{mision.titulo}</h1>
          {aventura?.ambientacion && (
            <p className="mt-1 text-xs italic text-muted-foreground">{aventura.ambientacion}</p>
          )}
        </header>

        {fase === "lectura" && (
          <section className="mt-6 space-y-6">
            <p className="text-muted-foreground">{mision.sinopsis}</p>
            <article className="panel space-y-4 p-6 text-[1.05rem] leading-relaxed">
              {mision.texto_lectura.split("\n\n").map((parrafo: string, i: number) => (
                <p key={i}>{parrafo}</p>
              ))}
            </article>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setFase("retos")}
                className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Estoy listo: ir a los retos
              </button>
              <p className="text-sm text-muted-foreground">
                {listaRetos.length} retos · hasta {mision.xp_base} XP
              </p>
            </div>
          </section>
        )}

        {fase === "retos" && retoActual && (
          <section className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Reto {indice + 1} de {listaRetos.length}
              </span>
              <span className="rounded-full border border-accent/50 px-3 py-1 text-xs uppercase tracking-wider text-accent">
                {ETIQUETA_COMPETENCIA[retoActual.competencia] ?? retoActual.competencia}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${((indice + (revelado ? 1 : 0)) / listaRetos.length) * 100}%` }}
              />
            </div>

            <div className="panel mt-5 p-6">
              <h2 className="text-lg leading-snug text-foreground">{retoActual.enunciado}</h2>

              <div className="mt-5 space-y-3">
                {retoActual.opciones.map((opcion, i) => {
                  const esCorrecta = i === retoActual.respuesta_correcta;
                  const elegida = seleccion === i;
                  let clases = "border-border hover:bg-secondary";
                  if (revelado && esCorrecta) clases = "border-success bg-success/15";
                  else if (revelado && elegida) clases = "border-destructive bg-destructive/15";
                  else if (elegida) clases = "border-primary bg-primary/10";
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={revelado}
                      onClick={() => setSeleccion(i)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors ${clases}`}
                    >
                      <span className="font-display text-sm text-primary">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opcion}</span>
                      {revelado && esCorrecta && (
                        <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />
                      )}
                      {revelado && elegida && !esCorrecta && (
                        <XCircle className="h-5 w-5 text-destructive" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>

              {!revelado && retoActual.pista && (
                <details className="mt-4 text-sm text-muted-foreground">
                  <summary className="cursor-pointer text-accent">Pedir una pista</summary>
                  <p className="mt-2">{retoActual.pista}</p>
                </details>
              )}

              {revelado && (
                <div
                  className={`mt-5 rounded-lg border p-4 ${
                    seleccion === retoActual.respuesta_correcta
                      ? "border-success/60 bg-success/10"
                      : "border-destructive/60 bg-destructive/10"
                  }`}
                >
                  <p className="font-semibold">
                    {seleccion === retoActual.respuesta_correcta
                      ? "Pista descifrada"
                      : "Todavía no es la respuesta"}
                  </p>
                  <p className="mt-1 text-sm">
                    {seleccion === retoActual.respuesta_correcta
                      ? retoActual.retroalimentacion_correcta
                      : retoActual.retroalimentacion_incorrecta}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                {!revelado ? (
                  <button
                    onClick={responder}
                    disabled={seleccion === null}
                    className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    Responder
                  </button>
                ) : (
                  <button
                    onClick={siguiente}
                    disabled={guardando}
                    className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {indice < listaRetos.length - 1 ? "Siguiente reto" : "Ver resultado"}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {fase === "resultado" && resultado && (
          <section className="mt-6 space-y-6">
            <div className="panel p-6 text-center">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                Misión completada
              </p>
              <p className="mt-3 font-display text-5xl text-primary">
                {resultado.aciertos}/{listaRetos.length}
              </p>
              <p className="mt-2 text-muted-foreground">
                {resultado.aciertos === listaRetos.length
                  ? "Lectura impecable: descifraste el enigma completo."
                  : resultado.aciertos >= 3
                    ? "Buen trabajo de investigación. Aún quedan detalles por afinar."
                    : "El archivo guarda sus secretos. Relee el texto y vuelve a intentarlo."}
              </p>
              <p className="mt-4 text-lg">
                <span className="text-primary">+{resultado.xpGanado} XP</span> en este intento
              </p>
              <div className="mx-auto mt-4 max-w-sm text-left">
                <BarraXp xp={resultado.xpTotal} conNivel />
              </div>
            </div>

            {resultado.insigniasNuevas.length > 0 && (
              <div className="panel p-6">
                <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
                  Recompensa desbloqueada
                </p>
                <h2 className="mt-1 text-lg">Nueva insignia</h2>
                <div className="mt-3 space-y-3">
                  {resultado.insigniasNuevas.map((i) => (
                    <Insignia
                      key={i.codigo}
                      nombre={i.nombre}
                      descripcion={i.descripcion}
                      icono={i.icono}
                      rareza={rarezaDe(i.codigo)}
                      mundo={MUNDO_POR_CODIGO[i.codigo]}
                      fecha={new Date().toISOString()}
                      desbloqueada
                      destacada
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="panel p-6">
              <h2 className="text-base">Retroalimentación por competencia</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {respuestas.map((r, i) => (
                  <li key={r.retoId} className="flex items-center gap-2">
                    {r.correcto ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0 text-destructive" aria-hidden />
                    )}
                    <span className="text-muted-foreground">
                      Reto {i + 1} ·{" "}
                      {ETIQUETA_COMPETENCIA[r.competencia] ?? r.competencia}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/aventura"
                className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
              >
                Volver al mapa de aventura
              </Link>
              <button
                onClick={() => {
                  setFase("lectura");
                  setIndice(0);
                  setSeleccion(null);
                  setRevelado(false);
                  setRespuestas([]);
                  setResultado(null);
                }}
                className="rounded-md border border-border px-5 py-2.5 font-semibold transition-colors hover:bg-secondary"
              >
                Repetir la misión
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
