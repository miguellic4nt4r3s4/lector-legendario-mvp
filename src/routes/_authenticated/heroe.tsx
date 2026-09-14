import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { heroeQuery, perfilQuery } from "@/lib/consultas";
import { AVATARES, AVATAR_EMOJI, CLASES_HEROE } from "@/lib/juego";
import { Encabezado } from "@/components/juego/Encabezado";
import { Button } from "@/components/ui/button";
import { Compass, Feather, KeyRound, Lamp, Search, Timer, Bird } from "lucide-react";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
            <Button
              onClick={() => navigate({ to: "/aventura" })}
              className="mt-6"
            >
              Ir a la aventura
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Paso 1 de 2</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-primary">Crea tu héroe investigador</h1>
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
                <Button
                  key={c.id}
                  type="button"
                  onClick={() => setClase(c.id)}
                  variant="outline"
                  className={`h-auto min-h-28 w-full whitespace-normal p-4 text-left ${clase === c.id ? "border-primary bg-primary/10" : ""}`}
                >
                  <p className="font-semibold text-foreground">{c.id}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.descripcion}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-accent">
                    Afinidad: {c.fuerte}
                  </p>
                </Button>
              ))}
            </div>
          </fieldset>

          <fieldset className="panel p-5">
            <legend className="px-1 text-sm text-muted-foreground">Emblema</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {AVATARES.map((a) => (
                <Button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  aria-label={a}
                  variant={avatar === a ? "default" : "outline"}
                  size="icon"
                  className="h-14 w-14 rounded-full"
                >
                  <span aria-hidden>{a === "lupa" ? <Search /> : a === "pluma" ? <Feather /> : a === "farol" ? <Lamp /> : a === "llave" ? <KeyRound /> : a === "reloj" ? <Timer /> : <Bird />}</span>
                </Button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={crear.isPending}
            size="lg"
            className="w-full sm:w-auto"
          >
            {crear.isPending ? "Forjando héroe…" : "Entrar al archivo"}
          </Button>
        </form>
      </main>
    </div>
  );
}
