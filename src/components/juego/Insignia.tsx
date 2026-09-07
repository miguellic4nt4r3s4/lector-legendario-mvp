import { Crown, Eye, Shield } from "lucide-react";

const ICONOS = { crown: Crown, eye: Eye, shield: Shield } as const;

export function Insignia({
  nombre,
  descripcion,
  icono,
  destacada = false,
}: {
  nombre: string;
  descripcion: string;
  icono: string;
  destacada?: boolean;
}) {
  const Icono = ICONOS[icono as keyof typeof ICONOS] ?? Shield;
  return (
    <div
      className={`flex gap-3 rounded-lg border p-4 ${
        destacada ? "border-primary bg-primary/10" : "border-border bg-card/60"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-secondary">
        <Icono className="h-5 w-5 text-primary" aria-hidden />
      </div>
      <div>
        <p className="font-semibold text-foreground">{nombre}</p>
        <p className="text-sm text-muted-foreground">{descripcion}</p>
      </div>
    </div>
  );
}
