import { createFileRoute, Link } from "@tanstack/react-router";
import { BookLock, Compass, ScrollText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lector Legendario — Aventuras de comprensión lectora" },
      {
        name: "description",
        content:
          "Plataforma escolar donde cada estudiante crea un héroe, resuelve misiones de lectura y gana experiencia mientras su docente sigue el progreso.",
      },
      { property: "og:title", content: "Lector Legendario — Aventuras de comprensión lectora" },
      {
        property: "og:description",
        content:
          "Crea tu héroe, descifra enigmas y demuestra tu comprensión lectora misión tras misión.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

const PILARES = [
  {
    icono: Compass,
    titulo: "Aventuras con propósito",
    texto:
      "Cada misión parte de un texto original y plantea retos de comprensión literal, inferencial y crítica.",
  },
  {
    icono: ScrollText,
    titulo: "Retroalimentación inmediata",
    texto:
      "El estudiante sabe al instante por qué acertó o falló, con una explicación pensada para aprender, no para castigar.",
  },
  {
    icono: ShieldCheck,
    titulo: "Progreso visible",
    texto:
      "Experiencia, niveles e insignias quedan guardados; el docente consulta el avance real de su curso.",
  },
];

function Inicio() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex items-center gap-2">
          <BookLock className="h-5 w-5 text-primary" aria-hidden />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            Lector Legendario
          </span>
        </div>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-6xl">
          El archivo está sellado. Solo entra quien sabe leer entre líneas.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Una plataforma de aventuras lectoras para el aula: el estudiante crea su héroe
          investigador, descifra enigmas a partir de textos originales y demuestra su comprensión
          reto tras reto. El docente ve el avance sin adivinar.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/auth"
            className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Comenzar aventura
          </Link>
          <Link
            to="/auth"
            className="rounded-md border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Soy docente
          </Link>
        </div>

        <section className="mt-20 grid gap-4 sm:grid-cols-3">
          {PILARES.map(({ icono: Icono, titulo, texto }) => (
            <article key={titulo} className="panel p-6">
              <Icono className="h-6 w-6 text-accent" aria-hidden />
              <h2 className="mt-4 text-lg text-foreground">{titulo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
            </article>
          ))}
        </section>

        <section className="panel mt-12 p-6">
          <h2 className="text-lg text-foreground">Aventura disponible en esta versión</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong className="text-primary">El Enigma de la Biblioteca Perdida</strong> — Misión 1:
            La sala de los relojes detenidos. Un texto original y cinco retos de selección múltiple
            que evalúan comprensión literal, inferencia, vocabulario en contexto, estructura del
            texto y lectura crítica.
          </p>
        </section>
      </div>
    </main>
  );
}
