import { createFileRoute, Link } from "@tanstack/react-router";
import { BookLock, Compass, ScrollText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import bosquePalabras from "@/assets/bosque-palabras-stage.jpg";

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
      <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden border-b border-border">
        <img src={bosquePalabras} alt="Bosque nocturno de libros y misterios" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:pb-20">
        <div className="flex items-center gap-2">
          <BookLock className="h-5 w-5 text-primary" aria-hidden />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
            Lector Legendario
          </span>
        </div>

        <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[0.95] text-foreground sm:text-7xl">
          Lector Legendario
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground/85">
          El archivo está sellado. Crea tu héroe, sigue las pistas y conquista cada reino leyendo entre líneas.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/auth">Comenzar aventura</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/auth">Soy docente</Link></Button>
        </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <section className="grid gap-4 sm:grid-cols-3">
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
