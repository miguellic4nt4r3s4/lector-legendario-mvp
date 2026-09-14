import type { AvatarItem } from "@/lib/consultas";
import { ItemCard } from "./ItemCard";

type Props = { items: AvatarItem[]; inventario: Map<string, { equipped: boolean }>; cargando?: boolean; onEquipar: (item: AvatarItem) => void };
export function InventoryGrid({ items, inventario, cargando, onEquipar }: Props) {
  if (items.length === 0) return <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Aún no hay objetos en esta categoría.</div>;
  return <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => { const fila = inventario.get(item.id); return <ItemCard key={item.id} item={item} desbloqueada={!!fila} equipada={fila?.equipped ?? false} cargando={cargando} onEquipar={() => onEquipar(item)} />; })}</div>;
}