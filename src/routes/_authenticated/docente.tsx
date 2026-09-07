import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Users } from "lucide-react";
import { Encabezado } from "@/components/juego/Encabezado";
import { cursoDocenteQuery, perfilQuery } from "@/lib/consultas";
import { nivelDesdeXp, rangoDeNivel } from "@/lib/juego";

export const Route = createFileRoute("/_authenticated/docente")({
  head: () => ({
    meta: [
      { title: "Panel docente — Lector Legendario" },
      {
        name: "description",
        content:
          "Consulta el progreso de comprensión lectora de cada estudiante de tu curso: nivel, experiencia y aciertos.",
      },
      { property: "og:title", content: "Panel docente — Lector Legendario" },
      { property: "og:description", content: "Progreso de lectura por estudiante y por curso." },
    ],
  }),
  component: PanelDocente,
});

function PanelDocente() {
  const { data: perfil } = useQuery(perfilQuery());
  const { data, isLoading } = useQuery(cursoDocenteQuery());

  const estudiantes = data?.estudiantes ?? [];
  const conHeroe = estudiantes.filter((e) => e.heroe).length;
  const completadas = estudiantes.reduce((a, e) => a + e.misionesCompletadas, 0);
  const aciertos = estudiantes.reduce((a, e) => a + e.aciertos, 0);
  const total = estudiantes.reduce((a, e) => a + e.total, 0);

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Panel docente</p>
        <h1 className="mt-2 font-display text-3xl">
          {isLoading ? "Consultando el archivo…" : (data?.curso?.nombre ?? "Sin curso asignado")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isLoading
            ? "Recuperando el progreso de tu curso."
            : data?.curso
              ? "Progreso de lectura de tus estudiantes en las aventuras activas."
              : "Tu cuenta aún no está vinculada como responsable de un curso."}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Resumen icono={Users} etiqueta="Estudiantes" valor={String(estudiantes.length)} />
          <Resumen icono={GraduationCap} etiqueta="Con héroe creado" valor={String(conHeroe)} />
          <Resumen etiqueta="Misiones completadas" valor={String(completadas)} />
          <Resumen
            etiqueta="Aciertos del curso"
            valor={total > 0 ? `${Math.round((aciertos / total) * 100)}%` : "—"}
          />
        </div>

        <section className="panel mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Estudiante</th>
                <th className="px-4 py-3">Héroe</th>
                <th className="px-4 py-3">Nivel</th>
                <th className="px-4 py-3">XP</th>
                <th className="px-4 py-3">Misiones</th>
                <th className="px-4 py-3">Aciertos</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-muted-foreground">
                    Cargando progreso…
                  </td>
                </tr>
              )}
              {!isLoading && estudiantes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-muted-foreground">
                    Todavía no hay estudiantes registrados en este curso.
                  </td>
                </tr>
              )}
              {estudiantes.map((e) => {
                const xp = e.heroe?.xp ?? 0;
                const nivel = nivelDesdeXp(xp);
                return (
                  <tr key={e.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{e.nombre}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {e.heroe ? `${e.heroe.nombre} · ${e.heroe.clase}` : "Sin héroe"}
                    </td>
                    <td className="px-4 py-3">
                      {e.heroe ? `${nivel} · ${rangoDeNivel(nivel)}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-primary">{e.heroe ? xp : "—"}</td>
                    <td className="px-4 py-3">
                      {e.misionesCompletadas} completadas / {e.misionesIniciadas} iniciadas
                    </td>
                    <td className="px-4 py-3">
                      {e.total > 0 ? `${e.aciertos}/${e.total}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function Resumen({
  icono: Icono,
  etiqueta,
  valor,
}: {
  icono?: React.ComponentType<{ className?: string }>;
  etiqueta: string;
  valor: string;
}) {
  return (
    <div className="panel p-4">
      {Icono && <Icono className="mb-2 h-4 w-4 text-accent" />}
      <p className="font-display text-2xl text-primary">{valor}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{etiqueta}</p>
    </div>
  );
}
