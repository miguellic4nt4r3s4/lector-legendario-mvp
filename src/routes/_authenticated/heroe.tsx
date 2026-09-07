import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { heroeQuery, perfilQuery } from "@/lib/consultas";
import { AVATARES, AVATAR_EMOJI, CLASES_HEROE } from "@/lib/juego";
import { Encabezado } from "@/components/juego/Encabezado";

export const Route = createFileRoute("/_authenticated/heroe")({
  head: () => ({
    meta: [
      { title: "Crea tu héroe — Lector Legendario" },
      {
        name: "description",
        content: "Elige nombre, clase y emblema para tu investigador antes de entrar al archivo.",
      },
      { property: "og:title", content: "Crea tu héroe — Lector Legendario" },
      { property: "og:description", content: "Diseña tu investigador y comienza la aventura." },
    ],
  }),
  component: CrearHeroe,
});

function CrearHeroe() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: perfil } = useQuery(perfilQuery());
  const { data: heroe } = useQuery(heroeQuery());

  const [nombre, setNombre] = useState("");
  const [clase, setClase] = useState<string>(CLASES_HEROE[0].id);
  const [avatar, setAvatar] = useState<string>(AVATARES[0]);
  const [error, setError] = useState<string | null>(null);

  const crear = useMutation({
    mutationFn: async () => {
      if (!perfil) throw new Error("Perfil no disponible");
      const { error: errorInsert } = await supabase
        .from("heroes")
        .insert({ profile_id: perfil.id, nombre, clase, avatar });
      if (errorInsert) throw errorInsert;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["heroe"] });
      navigate({ to: "/aventura" });
    },
    onError: (e: Error) => setError(e.message),
  });

  if (heroe) {
    return (
      <div className="min-h-screen">
        <Encabezado rol={perfil?.rol} />
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="panel p-6">
            <h1 className="font-display text-2xl">Tu héroe ya está registrado</h1>
            <p className="mt-2 text-muted-foreground">
              {heroe.nombre} — {heroe.clase}
            </p>
            <button
              onClick={() => navigate({ to: "/aventura" })}
              className="mt-6 rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
            >
              Ir a la aventura
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Paso 1 de 2</p>
        <h1 className="mt-2 font-display text-3xl">Crea tu héroe investigador</h1>
        <p className="mt-2 text-muted-foreground">
          Tu nombre, tu especialidad y tu emblema aparecerán en cada misión que resuelvas.
        </p>

        <form
          className="mt-8 space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            crear.mutate();
          }}
        >
          <div className="panel p-5">
            <label htmlFor="nombreHeroe" className="mb-2 block text-sm text-muted-foreground">
              Nombre del héroe
            </label>
            <input
              id="nombreHeroe"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              maxLength={40}
              placeholder="Ej.: Alex el Rastreador"
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </div>

          <fieldset className="panel p-5">
            <legend className="px-1 text-sm text-muted-foreground">Clase</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {CLASES_HEROE.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setClase(c.id)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    clase === c.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <p className="font-semibold text-foreground">{c.id}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.descripcion}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-accent">
                    Afinidad: {c.fuerte}
                  </p>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="panel p-5">
            <legend className="px-1 text-sm text-muted-foreground">Emblema</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {AVATARES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  aria-label={a}
                  className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl transition-colors ${
                    avatar === a ? "border-primary bg-primary/15" : "border-border hover:bg-secondary"
                  }`}
                >
                  <span aria-hidden>{AVATAR_EMOJI[a]}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={crear.isPending}
            className="w-full rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
          >
            {crear.isPending ? "Forjando héroe…" : "Entrar al archivo"}
          </button>
        </form>
      </main>
    </div>
  );
}
