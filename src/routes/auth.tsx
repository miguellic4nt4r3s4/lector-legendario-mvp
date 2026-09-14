import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookLock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar al archivo — Lector Legendario" },
      {
        name: "description",
        content:
          "Ingresa o crea tu cuenta para comenzar las aventuras de comprensión lectora de Lector Legendario.",
      },
      { property: "og:title", content: "Entrar al archivo — Lector Legendario" },
      {
        property: "og:description",
        content: "Ingresa o crea tu cuenta de estudiante o docente en Lector Legendario.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaginaAuth,
});

function PaginaAuth() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "registrar">("entrar");
  const [rol, setRol] = useState<"estudiante" | "docente">("estudiante");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      if (modo === "registrar") {
        const { error: errorRegistro } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { nombre: nombre || email.split("@")[0], rol, curso_codigo: "6A" },
          },
        });
        if (errorRegistro) throw errorRegistro;
      } else {
        const { error: errorLogin } = await supabase.auth.signInWithPassword({ email, password });
        if (errorLogin) throw errorLogin;
      }
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Revisa tu correo para confirmar la cuenta antes de entrar.");
        return;
      }
      navigate({ to: rol === "docente" && modo === "registrar" ? "/docente" : "/aventura" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible completar la operación.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <BookLock className="h-5 w-5 text-primary" aria-hidden />
          <span className="font-display text-sm uppercase tracking-[0.25em] text-primary">
            Lector Legendario
          </span>
        </Link>

        <div className="game-surface ornate-frame rounded-lg p-6 sm:p-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-accent">Portal de expedición</p>
          <h1 className="mt-2 text-center font-display text-3xl font-bold text-foreground">
            {modo === "entrar" ? "Abrir el archivo" : "Registrar investigador"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {modo === "entrar"
              ? "Ingresa con tu correo para continuar tu aventura."
              : "Crea tu cuenta para comenzar tu primera misión."}
          </p>

          <form onSubmit={enviar} className="mt-6 space-y-4">
            {modo === "registrar" && (
              <>
                <div>
                  <label htmlFor="nombre" className="mb-1.5 block text-sm text-muted-foreground">
                    Nombre y apellido
                  </label>
                  <input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <fieldset>
                  <legend className="mb-1.5 text-sm text-muted-foreground">Soy</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["estudiante", "docente"] as const).map((r) => (
                      <Button
                        key={r}
                        type="button"
                        onClick={() => setRol(r)}
                        variant={rol === r ? "default" : "outline"}
                        className="w-full capitalize"
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm text-muted-foreground">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            {error && (
              <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={cargando}
              className="w-full"
            >
              {cargando ? "Un momento…" : modo === "entrar" ? "Entrar" : "Crear cuenta"}
            </Button>
          </form>

          <Button
            onClick={() => {
              setModo(modo === "entrar" ? "registrar" : "entrar");
              setError(null);
            }}
            variant="link"
            className="mt-4 w-full text-accent"
          >
            {modo === "entrar"
              ? "No tengo cuenta, quiero registrarme"
              : "Ya tengo cuenta, quiero entrar"}
          </Button>
        </div>
      </div>
    </main>
  );
}
