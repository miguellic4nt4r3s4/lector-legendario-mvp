import { useId } from "react";
import { cn } from "@/lib/utils";

export const CATEGORIAS_AVATAR = [
  "face",
  "hair",
  "eyes",
  "top",
  "bottom",
  "shoes",
  "accessory",
  "effect",
] as const;

export type CategoriaAvatar = (typeof CATEGORIAS_AVATAR)[number];
export type ConfiguracionAvatar = Partial<Record<CategoriaAvatar, string>>;

type Props = {
  configuracion?: ConfiguracionAvatar | undefined;
  className?: string;
  nombre?: string;
};

type Gradientes = {
  piel: string;
  cabello: string;
  tela: string;
  telaRara: string;
  cuero: string;
  metal: string;
};

const PREDETERMINADO: ConfiguracionAvatar = {
  face: "face_01",
  hair: "hair_01",
  eyes: "eyes_01",
  top: "top_01",
  bottom: "bottom_01",
  shoes: "shoes_01",
  accessory: "accessory_00",
  effect: "effect_00",
};

const trazo = "stroke-avatar-outline [stroke-linecap:round] [stroke-linejoin:round]";
const detalle = "fill-none stroke-avatar-detail [stroke-linecap:round] [stroke-linejoin:round]";

function Capa({ codigo, gradientes }: { codigo: string; gradientes: Gradientes }) {
  switch (codigo) {
    case "effect_01":
      return (
        <g className="fill-avatar-glow stroke-primary" strokeWidth="1.4">
          <path d="M55 310C25 260 31 177 69 123M267 308c27-48 22-124-13-174" fill="none" strokeDasharray="3 11" opacity=".56" />
          <path d="M55 133l4 8 9 2-8 5-1 9-7-6-9 2 4-9-5-7zM269 178l4 7 8 2-7 4-1 8-6-6-8 1 5-7-3-7z" />
          <path d="M62 240q12-9 21 3-12-2-17 9zM251 258q-12-10-21 2 12-1 17 10z" opacity=".8" />
          <circle cx="62" cy="199" r="3.5" /><circle cx="255" cy="221" r="3" />
        </g>
      );
    case "accessory_backpack_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M79 155c-24 7-37 28-38 62l-1 76c0 17 12 28 29 29l47-1 6-153c-13-13-27-17-43-13z" fill={`url(#${gradientes.cuero})`} />
          <path d="M60 191c1-25 13-43 35-50 16 3 26 13 30 31" fill="none" className="stroke-avatar-leather-light" strokeWidth="9" />
          <path d="M44 222l68-5-1 80-52 3c-10 0-16-7-16-17z" className="fill-avatar-leather" />
          <path d="M44 222q33 18 68-5v25q-33 17-68 4z" className="fill-avatar-leather-light" />
          <path d="M64 249v47M91 246v50M70 263h15v14H70z" className="stroke-avatar-detail fill-avatar-leather-shadow" strokeWidth="2.2" />
          <path d="M45 207l20 6M44 286l17-7" fill="none" className="stroke-primary/75" strokeWidth="2.4" />
          <circle cx="77" cy="226" r="3.8" fill={`url(#${gradientes.metal})`} />
        </g>
      );
    case "accessory_01":
      return (
        <g className={trazo} strokeWidth="2.6">
          <path d="M198 168c20 14 31 35 34 62" fill="none" className="stroke-primary" strokeWidth="5" />
          <circle cx="233" cy="242" r="14" fill={`url(#${gradientes.metal})`} />
          <path d="M233 233v18M224 242h18" className={detalle} strokeWidth="2" />
        </g>
      );
    case "bottom_02":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M111 280l50-2 4 44-13 84-53-1 10-87z" fill={`url(#${gradientes.telaRara})`} />
          <path d="M160 278l47 7 18 36 1 82-54 3-11-87z" fill={`url(#${gradientes.telaRara})`} />
          <path d="M106 309q27 9 54 4M166 315q25 1 47-9M104 354h50M170 356h53" className={detalle} strokeWidth="2.2" />
          <path d="M112 329l15 1-2 22-17-1zM197 331l17-1 4 21-18 2z" className="fill-avatar-leather stroke-avatar-detail" strokeWidth="2" />
        </g>
      );
    case "bottom_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M109 278l51-1 5 45-13 84-54-1 11-87z" className="fill-avatar-trouser" />
          <path d="M160 277l48 7 17 37 1 82-54 3-11-87z" className="fill-avatar-trouser" />
          <path d="M108 303q26 10 52 4M166 309q24 2 44-7M103 356l50 1M170 358l52-1" className={detalle} strokeWidth="2.1" />
          <path d="M156 287l5 34M112 325l15 2M199 327l15-2" className="stroke-accent/75" fill="none" strokeWidth="2.4" />
          <path d="M104 381l49 2M172 383l50-2" fill="none" className="stroke-avatar-trouser-light" strokeWidth="4" />
        </g>
      );
    case "shoes_02":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M96 380l57 2 2 25-17 17H67c-1-18 10-32 29-44z" fill={`url(#${gradientes.telaRara})`} />
          <path d="M173 382l51-3c22 11 31 25 28 43l-72 2-12-16z" fill={`url(#${gradientes.telaRara})`} />
          <path d="M76 411h75M179 411h66M102 391l42 4M179 395l37-6" className={detalle} strokeWidth="3" />
          <path d="M94 385l8 30M220 384l-5 30" fill="none" className="stroke-primary" strokeWidth="3" />
        </g>
      );
    case "shoes_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M98 379l55 3 2 25-17 17H68c-2-18 9-32 30-45z" fill={`url(#${gradientes.cuero})`} />
          <path d="M173 382l51-3c22 10 31 25 28 43l-72 2-12-16z" fill={`url(#${gradientes.cuero})`} />
          <path d="M77 410h74M180 410h65" fill="none" className="stroke-avatar-sole" strokeWidth="7" />
          <path d="M99 390l43 5M181 395l36-7M103 383l-8 31M219 383l5 30" className={detalle} strokeWidth="2.5" />
          <path d="M105 391l8 8m1-6 8 8m72-9-8 9m18-11-8 9" fill="none" className="stroke-primary/75" strokeWidth="2" />
        </g>
      );
    case "top_02":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M120 162l28-17 39 2 31 21 9 105c-35 19-79 16-112-5z" fill={`url(#${gradientes.telaRara})`} />
          <path d="M122 166c-22 8-34 28-41 55l-9 42c-3 14 5 27 18 29 12 1 21-7 24-20l11-50" fill={`url(#${gradientes.telaRara})`} />
          <path d="M215 168c21 9 31 27 36 50l12 43c4 13-3 26-16 29-12 2-23-6-26-19l-13-49" fill={`url(#${gradientes.telaRara})`} />
          <path d="M73 262c-8 5-10 16-5 24 6 9 18 11 27 4l13-15-22-17zM261 259c9 4 13 14 9 23-5 10-17 14-27 7l-12-13 21-20z" fill={`url(#${gradientes.piel})`} />
          <path d="M145 145l20 30 23-28 18 14-17 41-25-19-23 17-17-39z" className="fill-card" />
          <path d="M165 178v98M120 232h35v30h-35zM176 218h37v36h-37z" className={detalle} strokeWidth="2.5" />
          <path d="M111 267q55 24 116 5l3 20q-60 25-122-3z" fill={`url(#${gradientes.cuero})`} />
          <path d="M158 275h19v20h-19z" fill={`url(#${gradientes.metal})`} />
          <path d="M130 173l34 33 38-34M128 196l-14 68M205 194l18 67" fill="none" className="stroke-primary/75" strokeWidth="2.4" />
        </g>
      );
    case "top_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M119 160l29-16 39 2 31 21 8 105c-35 18-78 16-112-5z" fill={`url(#${gradientes.tela})`} />
          <path d="M121 165c-22 8-34 29-41 56l-9 42c-3 14 5 27 18 29 12 1 22-7 25-20l11-50" fill={`url(#${gradientes.tela})`} />
          <path d="M215 168c21 9 31 27 37 50l11 43c4 14-3 26-16 29-12 2-23-6-26-19l-13-49" fill={`url(#${gradientes.tela})`} />
          <path d="M72 262c-8 5-10 16-5 24 6 9 18 11 27 4l13-15-22-17zM262 259c9 4 13 14 9 23-5 10-17 14-27 7l-12-13 21-20z" fill={`url(#${gradientes.piel})`} />
          <path d="M144 144l21 31 23-29 17 15-16 38-25-18-23 17-17-37z" className="fill-avatar-shirt" />
          <path d="M165 178v96M119 226h35v31h-35z" className={detalle} strokeWidth="2.5" />
          <path d="M111 267q55 24 115 5l4 20q-60 25-122-3z" fill={`url(#${gradientes.cuero})`} />
          <path d="M158 275h19v20h-19z" fill={`url(#${gradientes.metal})`} />
          <path d="M190 230h21v27h-21z" className="fill-avatar-cloth-light stroke-avatar-detail" strokeWidth="2" />
          <path d="M194 235l7 6 7-6" fill="none" className="stroke-primary" strokeWidth="2.2" />
          <path d="M126 173l38 33 38-34M121 203l-9 61M210 201l13 60" fill="none" className="stroke-avatar-cloth-light" strokeWidth="2.5" />
          <path d="M88 215l29 12M249 214l-34 13" fill="none" className="stroke-avatar-seam" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      );
    case "face_02":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M132 56c16-13 42-14 59-3 17 11 25 33 21 59l-5 28c-4 24-21 43-46 47-24-4-42-22-47-46l-6-29c-5-25 4-44 24-56z" fill={`url(#${gradientes.piel})`} />
          <path d="M145 181h31l1 20q-15 13-33 0z" className="fill-avatar-skin-shadow" />
          <path d="M116 117c-9-4-14 2-11 14 2 10 8 17 16 17M207 116c9-4 14 2 11 14-2 10-8 17-16 17" fill={`url(#${gradientes.piel})`} />
          <path d="M126 151q35 26 69-1c-7 22-20 35-35 37-16-3-28-15-34-36z" className="fill-avatar-skin-shadow/20 stroke-none" />
          <path d="M145 164q15 8 31-1" className={detalle} strokeWidth="2.4" />
        </g>
      );
    case "face_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M130 55c17-13 44-14 62-2 17 12 24 34 20 59l-5 28c-5 25-22 43-47 47-25-4-43-22-47-47l-5-28c-5-25 4-45 22-57z" fill={`url(#${gradientes.piel})`} />
          <path d="M144 181h32l1 20q-16 13-34 0z" className="fill-avatar-skin-shadow" />
          <path d="M116 117c-9-4-14 2-11 14 2 10 8 17 16 17M207 116c9-4 14 2 11 14-2 10-8 17-16 17" fill={`url(#${gradientes.piel})`} />
          <path d="M124 148q36 29 73-2c-7 23-21 38-37 41-17-3-30-17-36-39z" className="fill-avatar-skin-shadow/20 stroke-none" />
          <path d="M144 164q16 10 33 0" className={detalle} strokeWidth="2.4" />
        </g>
      );
    case "eyes_02":
      return (
        <g className={trazo} strokeWidth="2.3">
          <path d="M124 117q15-14 31 0-15 14-31 0zM166 117q15-14 31 0-15 14-31 0z" className="fill-avatar-eye" />
          <ellipse cx="141" cy="117" rx="7" ry="8.5" className="fill-primary stroke-none" /><ellipse cx="181" cy="117" rx="7" ry="8.5" className="fill-primary stroke-none" />
          <ellipse cx="141" cy="118" rx="3" ry="5" className="fill-avatar-pupil stroke-none" /><ellipse cx="181" cy="118" rx="3" ry="5" className="fill-avatar-pupil stroke-none" />
          <circle cx="143" cy="114" r="2" className="fill-foreground stroke-none" /><circle cx="183" cy="114" r="2" className="fill-foreground stroke-none" />
          <path d="M125 101q14-9 29-1M168 100q14-8 28 2M156 133l-4 10 8 3" className={detalle} strokeWidth="2.7" />
        </g>
      );
    case "eyes_01":
      return (
        <g className={trazo} strokeWidth="2.3">
          <path d="M123 116q16-14 32 0-16 14-32 0zM166 116q16-14 32 0-16 14-32 0z" className="fill-avatar-eye" />
          <ellipse cx="141" cy="116" rx="7" ry="8.5" className="fill-accent stroke-none" /><ellipse cx="181" cy="116" rx="7" ry="8.5" className="fill-accent stroke-none" />
          <ellipse cx="141" cy="117" rx="3" ry="5" className="fill-avatar-pupil stroke-none" /><ellipse cx="181" cy="117" rx="3" ry="5" className="fill-avatar-pupil stroke-none" />
          <circle cx="143" cy="113" r="2" className="fill-foreground stroke-none" /><circle cx="183" cy="113" r="2" className="fill-foreground stroke-none" />
          <path d="M124 100q15-9 30 0M168 100q14-8 28 1M156 132l-4 11 8 3" className={detalle} strokeWidth="2.7" />
        </g>
      );
    case "hair_02":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M108 115c-8-37 2-69 31-84 29-16 67-7 82 22 10 20 7 47-5 67l-7-35-15 14-9-29-19 23-14-20-21 29-11-20z" className="fill-secondary" />
          <path d="M125 78c19-31 56-43 86-20M133 56c24-8 48-1 64 18M207 85l-14 14M121 87l11 15" fill="none" className="stroke-accent" strokeWidth="5" />
          <path d="M187 38q27 7 31 30-18-12-38-8z" className="fill-secondary" />
        </g>
      );
    case "hair_01":
      return (
        <g className={trazo} strokeWidth="3.2">
          <path d="M107 116c-8-38 3-70 32-85 27-14 64-9 80 19 12 21 9 48-4 70l-7-36-15 15-9-29-20 24-13-21-22 29-10-20z" fill={`url(#${gradientes.cabello})`} />
          <path d="M120 80c19-31 57-45 88-22M130 59c23-12 50-5 66 16M205 86l-13 14M120 88l11 15" fill="none" className="stroke-avatar-hair-light" strokeWidth="5" />
          <path d="M139 39q23-13 43 2-22 2-35 18z" className="fill-avatar-hair-light" />
        </g>
      );
    default:
      return null;
  }
}

export function AvatarModular({ configuracion, className, nombre = "Avatar del héroe" }: Props) {
  const piezas = { ...PREDETERMINADO, ...configuracion };
  const uid = useId().replace(/:/g, "");
  const gradientes: Gradientes = {
    piel: `${uid}-piel`, cabello: `${uid}-cabello`, tela: `${uid}-tela`, telaRara: `${uid}-tela-rara`, cuero: `${uid}-cuero`, metal: `${uid}-metal`,
  };
  const orden: CategoriaAvatar[] = ["effect", "accessory", "bottom", "shoes", "top", "face", "eyes", "hair"];

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-md border border-primary/50 bg-secondary/20", className)} role="img" aria-label={nombre}>
      <div className="absolute inset-x-[14%] bottom-[1%] h-[10%] rounded-full bg-background/75 blur-md" />
      <div className="absolute left-1/2 top-[14%] h-[60%] w-[54%] -translate-x-1/2 rounded-full bg-accent/10 blur-2xl" />
      <svg viewBox="0 0 320 440" className="relative h-full w-full overflow-visible drop-shadow-[0_16px_16px_var(--color-avatar-shadow)]" aria-hidden="true">
        <defs>
          <linearGradient id={gradientes.piel} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--avatar-skin-light)" /><stop offset=".56" stopColor="var(--avatar-skin)" /><stop offset="1" stopColor="var(--avatar-skin-shadow)" /></linearGradient>
          <linearGradient id={gradientes.cabello} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="var(--avatar-hair-light)" /><stop offset=".42" stopColor="var(--avatar-hair)" /><stop offset="1" stopColor="var(--avatar-hair-shadow)" /></linearGradient>
          <linearGradient id={gradientes.tela} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--avatar-cloth-light)" /><stop offset=".48" stopColor="var(--avatar-cloth)" /><stop offset="1" stopColor="var(--avatar-cloth-shadow)" /></linearGradient>
          <linearGradient id={gradientes.telaRara} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--avatar-rare-light)" /><stop offset=".52" stopColor="var(--avatar-rare)" /><stop offset="1" stopColor="var(--avatar-rare-shadow)" /></linearGradient>
          <linearGradient id={gradientes.cuero} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--avatar-leather-light)" /><stop offset=".5" stopColor="var(--avatar-leather)" /><stop offset="1" stopColor="var(--avatar-leather-shadow)" /></linearGradient>
          <linearGradient id={gradientes.metal} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--avatar-gold-light)" /><stop offset=".52" stopColor="var(--primary)" /><stop offset="1" stopColor="var(--avatar-gold-shadow)" /></linearGradient>
        </defs>
        <path d="M52 423Q160 446 270 420" fill="none" className="stroke-primary/40" strokeWidth="3" />
        {orden.map((categoria) => <Capa key={categoria} codigo={piezas[categoria] ?? ""} gradientes={gradientes} />)}
      </svg>
    </div>
  );
}