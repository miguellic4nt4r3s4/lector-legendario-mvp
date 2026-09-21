import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Backpack, BookLock, Compass, LogOut, Map, Medal, ScrollText, Shield, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function Encabezado({ rol, modoAventura = false }: { rol?: string | undefined; modoAventura?: boolean | undefined }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function salir() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className={modoAventura ? "sticky top-0 z-40 w-full border-b border-primary/20 bg-background/92 backdrop-blur-xl" : "sticky top-0 z-40 w-full max-w-[100vw] overflow-x-hidden border-b border-border/70 bg-background/88 backdrop-blur-xl"}>
      <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/aventura" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10"><BookLock className="h-4 w-4 text-primary" aria-hidden /></span>
          <span className="font-display text-lg font-bold text-primary">
            Lector Legendario
          </span>
        </Link>
        <nav className="order-3 flex w-full min-w-0 max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain border-t border-border/50 pt-2 text-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-none md:ml-auto md:w-auto md:border-0 md:pt-0" aria-label="Navegación principal">
          {rol === "docente" ? (
            <Link
              to="/docente"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              <ScrollText className="h-4 w-4" /> Progreso
            </Link>
          ) : (
            <><Link to="/aventura" className="game-nav-link" activeProps={{ className: "game-nav-link is-active" }}><Compass className="h-5 w-5" /><span>{modoAventura ? "Aventura" : "Mi aventura"}</span></Link><Link to="/aventura" hash="mi-heroe" className="game-nav-link"><Shield className="h-5 w-5" /><span>{modoAventura ? "Héroe" : "Mi héroe"}</span></Link><Link to="/personalizar" search={{ categoria: "top" }} className="game-nav-link"><Backpack className="h-5 w-5" /><span>{modoAventura ? "Mochila" : "Vestuario"}</span></Link><Link to="/aventura" hash="insignias" className="game-nav-link"><Medal className="h-5 w-5" /><span>Insignias</span></Link><Link to="/aventura" hash="mapa" className="game-nav-link"><Map className="h-5 w-5" /><span>Mapa</span></Link>{!modoAventura && <span className="inline-flex shrink-0 items-center gap-1.5 px-3 py-2 text-muted-foreground/50" title="Próximamente"><Sparkles className="h-4 w-4" /> Poderes</span>}</>
          )}
          <Button
            onClick={salir}
            variant="ghost"
            size="sm"
            className="ml-auto shrink-0 text-muted-foreground"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className={modoAventura ? "sr-only" : undefined}>Salir</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
