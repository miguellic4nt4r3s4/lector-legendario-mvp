import { Backpack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { AvatarItem } from "@/lib/consultas";

type Props = { item: AvatarItem | null; abierta: boolean; equipando: boolean; onEquipar: () => void; onContinuar: () => void };

export function RecompensaAvatar({ item, abierta, equipando, onEquipar, onContinuar }: Props) {
  if (!item) return null;
  return (
    <Dialog open={abierta} onOpenChange={(open) => !open && onContinuar()}>
      <DialogContent className="max-w-md border-primary/50 bg-card text-center" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full border border-primary bg-primary/10">
            <Backpack className="h-10 w-10 text-primary" aria-hidden />
          </div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">¡Nueva recompensa!</p>
          <DialogTitle className="font-display text-2xl text-primary">{item.name}</DialogTitle>
          <p className="text-xs font-semibold uppercase text-accent">Rareza {item.rarity === "rara" ? "Rara" : item.rarity}</p>
          <DialogDescription className="pt-2 text-base leading-relaxed">{item.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 grid grid-cols-2 gap-3 sm:space-x-0">
          <Button variant="outline" onClick={onContinuar}>Continuar</Button>
          <Button onClick={onEquipar} disabled={equipando}>{equipando ? "Equipando…" : "Equipar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}