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
        <g className={trazo} strokeWidth="3">
          <path d="M101 145c-34 4-52 30-55 69l-4 76c-1 18 11 30 29 32l47-3 9-151c-5-14-13-21-26-23z" fill={`url(#${gradientes.cuero})`} />
          <path d="M66 188c4-29 18-46 42-51 15 4 25 14 30 31" fill="none" className="stroke-avatar-leather-light" strokeWidth="10" />
          <path d="M44 216l75-4-5 87-55 3c-12 0-18-8-17-20z" className="fill-avatar-leather" />
          <path d="M45 217q35 19 73-5l-2 27q-36 18-72 4z" className="fill-avatar-leather-light" />
          <path d="M61 247l-1 51M94 244l-2 55M69 262h17v16H69z" className="stroke-avatar-detail fill-avatar-leather-shadow" strokeWidth="2.2" />
          <path d="M48 203l21 7M45 286l18-8" fill="none" className="stroke-primary/75" strokeWidth="2.4" />
          <circle cx="80" cy="226" r="4" fill={`url(#${gradientes.metal})`} />
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
          <path d="M107 276l54-2 4 45-13 88-58-2 13-89z" className="fill-avatar-trouser" />
          <path d="M160 274l51 7 16 39 2 84-59 3-10-89z" className="fill-avatar-trouser" />
          <path d="M105 304q27 10 55 3M167 309q25 3 45-7M100 356l54 2M170 359l55-2" className={detalle} strokeWidth="2.1" />
          <path d="M156 286l5 35M110 324l18 3M198 328l17-3" className="stroke-accent/75" fill="none" strokeWidth="2.4" />
          <path d="M100 381l53 3M172 384l54-3" fill="none" className="stroke-avatar-trouser-light" strokeWidth="4" />
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
          <path d="M96 376l58 4 2 26-18 18H63c-1-19 10-34 33-48z" fill={`url(#${gradientes.cuero})`} />
          <path d="M171 381l55-5c23 11 34 27 31 46l-79 2-12-17z" fill={`url(#${gradientes.cuero})`} />
          <path d="M71 411h80M180 411h69" fill="none" className="stroke-avatar-sole" strokeWidth="8" />
          <path d="M98 389l45 6M181 395l38-8M101 380l-8 35M222 380l6 34" className={detalle} strokeWidth="2.5" />
          <path d="M106 389l9 9m0-6 9 9m72-11-9 10m19-12-9 10" fill="none" className="stroke-primary/75" strokeWidth="2.2" />
          <path d="M72 416q38 7 79 0M181 416q35 5 69-1" fill="none" className="stroke-avatar-leather-light" strokeWidth="2" />
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
          <path d="M125 158q7-27 39-30 34 2 45 33l-21 24h-50z" fill={`url(#${gradientes.tela})`} />
          <path d="M117 158l31-16 39 2 34 20 9 109c-36 20-82 18-119-5z" fill={`url(#${gradientes.tela})`} />
          <path d="M120 164c-23 8-36 30-43 58l-10 43c-3 14 5 28 19 30 13 1 23-8 26-21l14-52" fill={`url(#${gradientes.tela})`} />
          <path d="M218 165c22 9 34 29 40 53l12 44c4 14-4 27-17 30-13 2-24-7-27-20l-15-51" fill={`url(#${gradientes.tela})`} />
          <path d="M68 264c-9 5-11 17-6 26 6 10 19 12 28 4l15-16-23-18zM269 260c10 4 14 15 10 24-5 11-18 15-28 8l-13-14 22-21z" fill={`url(#${gradientes.piel})`} />
          <path d="M143 143l22 33 23-31 18 15-17 41-25-18-24 19-17-41z" className="fill-avatar-shirt" />
          <path d="M165 178v97M118 224h37v34h-37z" className={detalle} strokeWidth="2.5" />
          <path d="M108 267q58 25 123 5l3 21q-64 26-129-3z" fill={`url(#${gradientes.cuero})`} />
          <path d="M157 275h21v21h-21z" fill={`url(#${gradientes.metal})`} />
          <path d="M192 226h22v29h-22z" className="fill-avatar-cloth-light stroke-avatar-detail" strokeWidth="2" />
          <path d="M196 232l7 6 8-6" fill="none" className="stroke-primary" strokeWidth="2.2" />
          <path d="M126 172l38 34 40-35M120 200l-10 65M212 199l15 63" fill="none" className="stroke-avatar-cloth-light" strokeWidth="3" />
          <path d="M84 216l32 12M254 214l-37 14" fill="none" className="stroke-avatar-seam" strokeWidth="2" strokeDasharray="4 4" />
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
          <path d="M126 52c19-16 49-17 69-3 19 13 27 37 22 65l-6 28c-5 27-24 47-51 51-27-4-47-24-52-50l-6-30c-5-27 4-48 24-61z" fill={`url(#${gradientes.piel})`} />
          <path d="M142 186h36l1 21q-18 14-38 0z" className="fill-avatar-skin-shadow" />
          <path d="M110 117c-10-4-16 3-13 16 2 11 9 19 18 18M211 116c10-4 16 3 13 16-2 11-9 19-18 18" fill={`url(#${gradientes.piel})`} />
          <path d="M119 146q41 35 83-2c-8 27-23 45-42 49-19-4-34-21-41-47z" className="fill-avatar-skin-shadow/20 stroke-none" />
          <path d="M142 168q18 13 37 0" className={detalle} strokeWidth="2.3" />
          <path d="M148 175q12 6 24 0" fill="none" className="stroke-avatar-skin-shadow" strokeWidth="1.5" opacity=".7" />
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
          <path d="M117 116q18-17 38 0-19 16-38 0zM166 116q19-17 39 0-20 16-39 0z" className="fill-avatar-eye" />
          <ellipse cx="138" cy="116" rx="8.5" ry="10" className="fill-accent stroke-none" /><ellipse cx="184" cy="116" rx="8.5" ry="10" className="fill-accent stroke-none" />
          <ellipse cx="138" cy="117" rx="4" ry="6" className="fill-avatar-pupil stroke-none" /><ellipse cx="184" cy="117" rx="4" ry="6" className="fill-avatar-pupil stroke-none" />
          <circle cx="141" cy="112" r="2.5" className="fill-foreground stroke-none" /><circle cx="187" cy="112" r="2.5" className="fill-foreground stroke-none" />
          <path d="M118 97q18-11 36 0M168 97q18-10 35 1M157 131l-5 13 9 4" className={detalle} strokeWidth="2.8" />
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
          <path d="M102 119c-10-42 1-77 34-94 31-17 73-10 91 22 13 23 9 53-6 77l-8-40-17 17-10-33-22 27-15-24-25 33-11-24z" fill={`url(#${gradientes.cabello})`} />
          <path d="M111 72l-10-17 25 5q7-28 37-38l-2 22q25-28 52-12l-13 17q26-8 35 12l-25 9M117 80c22-34 64-49 98-24M130 55c27-12 55-4 72 18M211 87l-15 16M115 89l13 17" fill="none" className="stroke-avatar-hair-light" strokeWidth="5" />
          <path d="M128 42q27-21 53-4-27 3-43 23zM188 31q25 1 36 22-21-10-40 1z" className="fill-avatar-hair-light" />
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
      <svg viewBox="0 0 320 440" className="relative h-full w-full overflow-visible drop-shadow-[0_18px_16px_var(--color-avatar-shadow)]" aria-hidden="true">
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