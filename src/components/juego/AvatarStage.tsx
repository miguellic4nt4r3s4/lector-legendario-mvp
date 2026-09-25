import type { ConfiguracionAvatar } from "./AvatarModular";
import { AvatarModular } from "./AvatarModular";
import { retratoHeroe } from "./retratoHeroe";
import { MapPin, ScrollText } from "lucide-react";
import bosquePalabras from "@/assets/bosque-palabras-stage.jpg";
import { cn } from "@/lib/utils";

export type MundoEscenario = "bosque" | "desierto" | "fortaleza" | "ciudad" | "archivo" | "reino";

const mundos: Record<MundoEscenario, string> = {
  bosque: "Bosque de las Palabras", desierto: "Desierto de las Inferencias", fortaleza: "Fortaleza de los Argumentos",
  ciudad: "Ciudad de las Perspectivas", archivo: "Archivo Secreto del Autor", reino: "Reino del Pensamiento Crítico",
};

type Props = { configuracion?: ConfiguracionAvatar | undefined; nombre: string; mundo?: MundoEscenario | undefined; className?: string | undefined; compacto?: boolean | undefined; integrado?: boolean | undefined };

export function AvatarStage({ configuracion, nombre, mundo = "bosque", className, compacto = false, integrado = false }: Props) {
  if (integrado) {
    return (
      <div className={cn("absolute inset-0", className)} aria-label={`Escenario de ${nombre} en ${mundos[mundo]}`}>
        {mundo === "bosque" ? <img src={bosquePalabras} alt="Bosque nocturno con libros y un archivo oculto" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-[55%_center] lg:object-center" /> : <div className="absolute inset-0 bg-secondary" />}
        <div className="adventure-cinematic absolute inset-0" aria-hidden />
        <div className="adventure-vignette absolute inset-0" aria-hidden />
        <div className="adventure-mist absolute inset-x-0 bottom-0 h-[38%]" aria-hidden />
        <div className="adventure-light-shaft absolute inset-0" aria-hidden />
        <div className="forest-fireflies absolute inset-0" aria-hidden>
          {[["12%","38%",0],["24%","62%",2.5],["63%","30%",1.2],["78%","58%",4],["52%","70%",6],["88%","24%",3.3],["35%","22%",7]].map(([l,t,d],i)=>(
            <i key={i} style={{ left: l as string, top: t as string, animationDelay: `${d}s` }} />
          ))}
        </div>
        <div className="hero-character">
          <div className="avatar-contact-shadow absolute -bottom-1 left-1/2 h-7 w-3/4 -translate-x-1/2" aria-hidden />
          {(() => { const r = retratoHeroe(configuracion); return <img src={r.src} width={r.width} height={r.height} alt={`${nombre}${r.conMochila ? " con su mochila" : ""}`} className="adventure-avatar absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain" />; })()}
        </div>
      </div>
    );
  }

  return (
    <section className={cn("group relative isolate min-h-[420px] overflow-hidden rounded-lg border border-primary/40 bg-secondary ornate-frame", compacto ? "min-h-[360px]" : "sm:min-h-[560px]", className)} aria-label={`Escenario de ${nombre} en ${mundos[mundo]}`}>
      {mundo === "bosque" ? <img src={bosquePalabras} alt="Bosque nocturno con libros y un archivo oculto" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-secondary to-background" />}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/15" />
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-md border border-primary/30 bg-background/75 px-3 py-2 text-xs text-foreground backdrop-blur-md">
        <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> {mundos[mundo]}
      </div>
      <div className="absolute right-5 top-5 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_5px_var(--color-primary)]" aria-hidden />
      <div className="absolute -bottom-[1%] left-1/2 z-10 w-[86%] max-w-[460px] -translate-x-1/2 sm:w-[80%]">
        <AvatarModular configuracion={configuracion} nombre={`Avatar modular de ${nombre}`} className="border-0 bg-transparent" />
      </div>
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-xs text-muted-foreground">
        <ScrollText className="h-3.5 w-3.5 text-accent" aria-hidden /> Expedición actual
      </div>
    </section>
  );
}