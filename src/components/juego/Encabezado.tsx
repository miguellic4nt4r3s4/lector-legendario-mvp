import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookLock, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function Encabezado({ rol }: { rol?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function salir() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/aventura" className="flex items-center gap-2">
          <BookLock className="h-5 w-5 text-primary" aria-hidden />
          <span className="font-display text-sm uppercase tracking-[0.2em] text-primary">
            Lector Legendario
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 text-sm">
          {rol === "docente" ? (
            <Link
              to="/docente"
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              Panel docente
            </Link>
          ) : (
            <Link
              to="/aventura"
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              Mi aventura
            </Link>
          )}
          <button
            onClick={salir}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
