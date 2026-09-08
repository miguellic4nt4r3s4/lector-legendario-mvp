import { Crown, Eye, Lock, Shield } from "lucide-react";
import type { Rareza } from "@/lib/juego";

const ICONOS = { crown: Crown, eye: Eye, shield: Shield } as const;

const ESTILO_RAREZA: Record<Rareza, { anillo: string; texto: string; brillo: string }> = {
  Común: { anillo: "border-muted-foreground/50", texto: "text-muted-foreground", brillo: "" },
  Rara: { anillo: "border-accent", texto: "text-accent", brillo: "shadow-[0_0_18px_-4px_var(--color-accent)]" },
  Épica: { anillo: "border-chart-5", texto: "text-chart-5", brillo: "shadow-[0_0_22px_-4px_var(--color-chart-5)]" },
  Legendaria: { anillo: "border-primary", texto: "text-primary", brillo: "shadow-[0_0_26px_-4px_var(--color-primary)]" },
  Mítica: { anillo: "border-destructive", texto: "text-destructive", brillo: "shadow-[0_0_30px_-4px_var(--color-destructive)]" },
};

type Props = {
  nombre: string;
  descripcion: string;
  icono: string;
  rareza?: Rareza;
  desbloqueada?: boolean;
  fecha?: string | null | undefined;
  mundo?: number | undefined;
  condicion?: string | undefined;
  destacada?: boolean;
};

export function Insignia({
  nombre,
  descripcion,
  icono,
  rareza = "Común",
  desbloqueada = true,
  fecha,
  mundo,
  condicion,
  destacada = false,
}: Props) {
  const Icono = ICONOS[icono as keyof typeof ICONOS] ?? Shield;
  const estilo = ESTILO_RAREZA[rareza];
  const fechaTexto = fecha
    ? new Date(fecha).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <article
      className={`relative flex gap-4 rounded-lg border p-4 transition-colors ${
        desbloqueada
          ? destacada
            ? "border-primary bg-primary/10"
            : "border-border bg-card/70"
          : "border-border/60 bg-background/40"
      }`}
      aria-label={`${nombre}, insignia ${rareza}, ${desbloqueada ? "desbloqueada" : "bloqueada"}`}
    >
      <div
        className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-secondary ${
          desbloqueada ? `${estilo.anillo} ${estilo.brillo}` : "border-border grayscale"
        }`}
      >
        <Icono
          className={`h-6 w-6 ${desbloqueada ? estilo.texto : "text-muted-foreground/50"}`}
          aria-hidden
        />
        {!desbloqueada && (
          <span className="absolute -bottom-1 -right-1 rounded-full border border-border bg-background p-1">
            <Lock className="h-3 w-3 text-muted-foreground" aria-hidden />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className={`font-display font-semibold ${desbloqueada ? "text-foreground" : "text-muted-foreground"}`}>
            {nombre}
          </p>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${
              desbloqueada ? `${estilo.anillo} ${estilo.texto}` : "border-border text-muted-foreground"
            }`}
          >
            {rareza}
          </span>
          {mundo && (
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Mundo {mundo}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{descripcion}</p>
        <p className="mt-2 text-xs">
          {desbloqueada ? (
            <span className="text-success">
              Desbloqueada{fechaTexto ? ` · ${fechaTexto}` : ""}
            </span>
          ) : (
            <span className="text-muted-foreground">
              Bloqueada{condicion ? ` · ${condicion}` : ""}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
