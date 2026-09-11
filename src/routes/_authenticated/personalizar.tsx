import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { AvatarModular, CATEGORIAS_AVATAR, type CategoriaAvatar, type ConfiguracionAvatar } from "@/components/juego/AvatarModular";
import { Encabezado } from "@/components/juego/Encabezado";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { catalogoAvatarQuery, heroeQuery, inventarioAvatarQuery, perfilQuery, type AvatarItem } from "@/lib/consultas";
import { cn } from "@/lib/utils";

const etiquetas: Record<CategoriaAvatar, string> = {
  face: "Rostro", hair: "Cabello", eyes: "Ojos", top: "Ropa", bottom: "Pantalón", shoes: "Zapatos", accessory: "Accesorios", effect: "Efectos",
};
const rarezas: Record<AvatarItem["rarity"], string> = { comun: "Común", rara: "Rara", epica: "Épica", legendaria: "Legendaria", mitica: "Mítica" };
const searchSchema = z.object({ categoria: z.enum(CATEGORIAS_AVATAR).catch("face") });

export const Route = createFileRoute("/_authenticated/personalizar")({
  validateSearch: searchSchema,
  head: () => ({ meta: [
    { title: "Personalizar avatar — Lector Legendario" },
    { name: "description", content: "Combina las piezas desbloqueadas del avatar de tu héroe lector." },
    { property: "og:title", content: "Personalizar avatar — Lector Legendario" },
    { property: "og:description", content: "Vestuario e inventario del héroe lector." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Personalizar,
});

function Personalizar() {
  const { categoria: inicial } = Route.useSearch();
  const [categoria, setCategoria] = useState<CategoriaAvatar>(inicial);
  const queryClient = useQueryClient();
  const { data: perfil } = useQuery(perfilQuery());
  const { data: heroe } = useQuery(heroeQuery());
  const { data: catalogo = [] } = useQuery(catalogoAvatarQuery());
  const { data: inventario = [] } = useQuery(inventarioAvatarQuery(heroe?.id));

  const inventarioPorItem = useMemo(() => new Map(inventario.map((fila) => [fila.item_id, fila])), [inventario]);
  const configuracion = useMemo(() => Object.fromEntries(inventario.filter((fila) => fila.equipped).map((fila) => [fila.category, fila.avatar_items.asset])) as ConfiguracionAvatar, [inventario]);
  const piezas = catalogo.filter((item) => item.category === categoria);

  const equipar = useMutation({
    mutationFn: async (item: AvatarItem) => {
      const fila = inventarioPorItem.get(item.id);
      if (!fila) throw new Error("Esta pieza todavía está bloqueada");
      const { error } = await supabase.from("hero_inventory").update({ equipped: true }).eq("id", fila.id);
      if (error) throw error;
    },
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: ["inventario-avatar", heroe?.id] }),
  });

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Mi héroe</p><h1 className="mt-1 font-display text-3xl text-primary">Personalizar avatar</h1><p className="mt-1 text-muted-foreground">Combina piezas desbloqueadas. Los cambios se guardan al equipar.</p></div>
          <Button asChild variant="outline"><Link to="/aventura">Volver a mi aventura</Link></Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <AvatarModular configuracion={configuracion} nombre={`Avatar de ${heroe?.nombre ?? "tu héroe"}`} className="mx-auto w-full max-w-[340px]" />
            <div className="mt-4 text-center"><h2 className="font-display text-2xl text-primary">{heroe?.nombre}</h2><p className="text-sm text-muted-foreground">{heroe?.clase}</p></div>
          </aside>

          <section>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Categorías del avatar">
              {CATEGORIAS_AVATAR.map((clave) => <Button key={clave} variant={categoria === clave ? "default" : "outline"} onClick={() => setCategoria(clave)}>{etiquetas[clave]}</Button>)}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {piezas.map((item) => {
                const fila = inventarioPorItem.get(item.id);
                const desbloqueada = !!fila;
                const equipada = fila?.equipped ?? false;
                return (
                  <article key={item.id} className={cn("relative rounded-md border bg-card p-4", equipada ? "border-primary" : "border-border", !desbloqueada && "opacity-70")}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-background"><AvatarModular configuracion={{ [item.category]: item.asset }} className="h-11 w-9 border-0" /></div>
                      <div className="min-w-0 flex-1"><h3 className="font-semibold text-foreground">{item.name}</h3><p className="text-xs font-semibold uppercase text-accent">{rarezas[item.rarity]}</p></div>
                      {equipada ? <Check className="text-success" aria-label="Equipado" /> : desbloqueada ? <ShieldCheck className="text-accent" aria-label="Desbloqueado" /> : <Lock className="text-muted-foreground" aria-label="Bloqueado" />}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{desbloqueada ? (equipada ? "⭐ EQUIPADO" : "🟢 DESBLOQUEADO") : `🔒 BLOQUEADO · ${item.unlock_condition}`}</p>
                    <Button className="mt-4 w-full" variant={equipada ? "secondary" : "default"} disabled={!desbloqueada || equipada || equipar.isPending} onClick={() => equipar.mutate(item)}>{equipada ? "Equipado" : desbloqueada ? "Equipar" : "Bloqueado"}</Button>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}