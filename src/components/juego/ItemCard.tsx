import { Check, Lock, ShieldCheck } from "lucide-react";
import type { AvatarItem } from "@/lib/consultas";
import { AvatarModular } from "./AvatarModular";
import { RarityBadge, estiloMarcoRareza } from "./RarityBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { item: AvatarItem; desbloqueada: boolean; equipada: boolean; cargando?: boolean | undefined; onEquipar: () => void };

export function ItemCard({ item, desbloqueada, equipada, cargando, onEquipar }: Props) {
  return <article className={cn("group relative overflow-hidden rounded-lg border bg-card/80 p-4 transition-transform duration-200 hover:-translate-y-0.5", estiloMarcoRareza(item.rarity), !desbloqueada && "bg-background/45")}>
    <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-background/55">
      <div className="absolute inset-0 bg-gradient-to-t from-card to-accent/10" />
      <AvatarModular configuracion={{ [item.category]: item.asset }} className="absolute inset-x-[13%] bottom-0 border-0 bg-transparent" nombre={`Vista de ${item.name}`} />
      <span className="absolute right-2 top-2 rounded-full border border-border bg-background/80 p-1.5">{equipada ? <Check className="h-4 w-4 text-success" aria-label="Equipado" /> : desbloqueada ? <ShieldCheck className="h-4 w-4 text-accent" aria-label="Desbloqueado" /> : <Lock className="h-4 w-4 text-muted-foreground" aria-label="Bloqueado" />}</span>
    </div>
    <div className="mt-3 flex items-start justify-between gap-2"><h3 className="font-display text-lg font-bold leading-tight text-foreground">{item.name}</h3><RarityBadge rareza={item.rarity} /></div>
    <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">{item.description}</p>
    <p className={cn("mt-3 flex min-h-8 items-start gap-1.5 text-xs font-semibold uppercase", equipada ? "text-primary" : desbloqueada ? "text-success" : "text-foreground")}>{!desbloqueada && <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />}{equipada ? "Equipado" : desbloqueada ? "Desbloqueado" : `Bloqueado · ${item.unlock_condition}`}</p>
    <Button className="mt-3 w-full" variant={equipada ? "secondary" : "default"} disabled={!desbloqueada || equipada || cargando} onClick={onEquipar}>{equipada ? "Equipado" : desbloqueada ? "Equipar" : "Bloqueado"}</Button>
  </article>;
}