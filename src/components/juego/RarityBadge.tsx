import { cn } from "@/lib/utils";
import type { Rareza } from "@/lib/juego";
import type { AvatarItem } from "@/lib/consultas";

export type RarezaVisual = Rareza | AvatarItem["rarity"];

const nombres: Record<RarezaVisual, Rareza> = {
  comun: "Común", rara: "Rara", epica: "Épica", legendaria: "Legendaria", mitica: "Mítica",
  Común: "Común", Rara: "Rara", Épica: "Épica", Legendaria: "Legendaria", Mítica: "Mítica",
};

const estilos: Record<Rareza, string> = {
  Común: "border-[var(--rarity-common)]/45 text-[var(--rarity-common)] bg-[var(--rarity-common)]/8",
  Rara: "border-[var(--rarity-rare)]/55 text-[var(--rarity-rare)] bg-[var(--rarity-rare)]/10",
  Épica: "border-[var(--rarity-epic)]/55 text-[var(--rarity-epic)] bg-[var(--rarity-epic)]/10",
  Legendaria: "border-[var(--rarity-legendary)]/60 text-[var(--rarity-legendary)] bg-[var(--rarity-legendary)]/10",
  Mítica: "border-[var(--rarity-mythic)]/60 text-[var(--rarity-mythic)] bg-[var(--rarity-mythic)]/10",
};

export function nombreRareza(rareza: RarezaVisual) {
  return nombres[rareza];
}

export function RarityBadge({ rareza, className }: { rareza: RarezaVisual; className?: string }) {
  const nombre = nombreRareza(rareza);
  return <span className={cn("inline-flex rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest", estilos[nombre], className)}>{nombre}</span>;
}

export function estiloMarcoRareza(rareza: RarezaVisual) {
  const nombre = nombreRareza(rareza);
  return {
    Común: "border-[var(--rarity-common)]/35",
    Rara: "border-[var(--rarity-rare)]/65 shadow-[0_0_24px_-12px_var(--rarity-rare)]",
    Épica: "border-[var(--rarity-epic)]/65 shadow-[0_0_26px_-12px_var(--rarity-epic)]",
    Legendaria: "border-[var(--rarity-legendary)]/70 reward-glow",
    Mítica: "border-[var(--rarity-mythic)]/70 shadow-[0_0_30px_-12px_var(--rarity-mythic)]",
  }[nombre];
}