import { Backpack, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RarityBadge } from "./RarityBadge";
import type { AvatarItem } from "@/lib/consultas";

type Props = { item: AvatarItem | null; abierta: boolean; equipando: boolean; onEquipar: () => void; onContinuar: () => void };
export function RewardModal({ item, abierta, equipando, onEquipar, onContinuar }: Props) {
  if (!item) return null;
  return <Dialog open={abierta} onOpenChange={(open) => !open && onContinuar()}><DialogContent className="max-w-md overflow-hidden border-primary/60 bg-card text-center ornate-frame" onPointerDownOutside={(event) => event.preventDefault()}>
    <div className="shimmer-line absolute inset-x-0 top-0 h-px" />
    <DialogHeader className="items-center text-center reveal-up">
      <div className="relative mb-3 flex h-32 w-32 items-center justify-center rounded-full border border-primary/60 bg-background/70 reward-glow"><Sparkles className="absolute left-3 top-4 h-4 w-4 text-primary" aria-hidden /><Backpack className="h-16 w-16 text-primary" aria-hidden /><Sparkles className="absolute bottom-5 right-3 h-3 w-3 text-accent" aria-hidden /></div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Nueva recompensa</p>
      <DialogTitle className="font-display text-3xl font-bold text-primary">{item.name}</DialogTitle>
      <RarityBadge rareza={item.rarity} />
      <DialogDescription className="pt-3 text-base leading-relaxed text-muted-foreground">{item.description}</DialogDescription>
    </DialogHeader>
    <DialogFooter className="mt-3 grid grid-cols-2 gap-3 sm:space-x-0"><Button variant="outline" onClick={onContinuar}>Continuar</Button><Button onClick={onEquipar} disabled={equipando}>{equipando ? "Equipando…" : "Equipar"}</Button></DialogFooter>
  </DialogContent></Dialog>;
}