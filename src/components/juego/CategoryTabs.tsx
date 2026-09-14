import type { CategoriaAvatar } from "./AvatarModular";
import { CATEGORIAS_AVATAR } from "./AvatarModular";
import { Button } from "@/components/ui/button";

const etiquetas: Record<CategoriaAvatar, string> = { face: "Rostro", hair: "Cabello", eyes: "Ojos", top: "Ropa", bottom: "Pantalón", shoes: "Zapatos", accessory: "Accesorios", effect: "Efectos" };

export function CategoryTabs({ activa, onChange }: { activa: CategoriaAvatar; onChange: (categoria: CategoriaAvatar) => void }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Categorías del vestuario">{CATEGORIAS_AVATAR.map((categoria) => <Button key={categoria} role="tab" aria-selected={activa === categoria} variant={activa === categoria ? "default" : "outline"} onClick={() => onChange(categoria)} className="min-w-0 px-2">{etiquetas[categoria]}</Button>)}</div>;
}