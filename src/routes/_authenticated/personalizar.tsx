import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AvatarModular, CATEGORIAS_AVATAR, type CategoriaAvatar, type ConfiguracionAvatar } from "@/components/juego/AvatarModular";
import { AvatarStage } from "@/components/juego/AvatarStage";
import { CharacterCard } from "@/components/juego/CharacterCard";
import { CategoryTabs } from "@/components/juego/CategoryTabs";
import { InventoryGrid } from "@/components/juego/InventoryGrid";
import { Encabezado } from "@/components/juego/Encabezado";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { catalogoAvatarQuery, heroeQuery, inventarioAvatarQuery, perfilQuery, type AvatarItem } from "@/lib/consultas";
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
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Armería del explorador</p><h1 className="mt-1 font-display text-4xl font-bold text-primary">Vestuario del héroe</h1><p className="mt-1 text-muted-foreground">Combina las piezas conquistadas en tus expediciones.</p></div>
          <Button asChild variant="outline"><Link to="/aventura">Volver a mi aventura</Link></Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(380px,0.9fr)_minmax(0,1.1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <AvatarStage configuracion={configuracion} nombre={heroe?.nombre ?? "tu héroe"} />
            {heroe && <CharacterCard nombre={heroe.nombre} clase={heroe.clase} xp={heroe.xp} compacto />}
          </aside>

          <section className="game-surface rounded-lg border border-border p-4 sm:p-6">
            <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Colección de aventura</p><h2 className="mt-1 font-display text-2xl font-bold text-foreground">Elige una pieza</h2></div>
            <CategoryTabs activa={categoria} onChange={setCategoria} />
            <div className="mt-5"><InventoryGrid items={piezas} inventario={inventarioPorItem} cargando={equipar.isPending} onEquipar={(item) => equipar.mutate(item)} /></div>
          </section>
        </div>
      </main>
    </div>
  );
}