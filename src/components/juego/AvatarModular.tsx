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

const contorno = "stroke-avatar-outline [stroke-linecap:round] [stroke-linejoin:round]";

function Capa({ codigo }: { codigo: string }) {
  switch (codigo) {
    case "effect_01":
      return (
        <g className="fill-accent/45 stroke-primary" strokeWidth="1.8">
          <path d="M45 280C20 234 28 154 61 105M274 278c27-45 20-119-15-169" fill="none" strokeDasharray="4 12" opacity=".7" />
          <path d="M48 126l5 9 10 3-9 5-2 10-7-8-10 1 6-8-3-10zM270 157l4 7 8 2-7 4-1 8-6-6-8 1 5-7-3-7z" />
          <circle cx="57" cy="203" r="4" /><circle cx="258" cy="223" r="3" />
        </g>
      );
    case "accessory_backpack_01":
      return (
        <g className={contorno} strokeWidth="4">
          <path d="M74 151c-19 5-29 21-30 46l-2 75c0 13 9 23 22 25l40 3 3-139z" className="fill-avatar-leather" />
          <path d="M57 171c3-21 14-34 35-38 13 5 18 15 19 31" fill="none" className="stroke-avatar-leather-light" strokeWidth="8" />
          <path d="M47 216h58v64H58c-8 0-12-6-12-15z" className="fill-avatar-leather-light" />
          <path d="M48 230h56M70 217v62M58 249h13" fill="none" className="stroke-primary" strokeWidth="3" />
          <path d="M45 194l17 6M46 267l15-5" fill="none" className="stroke-primary/70" strokeWidth="3" />
        </g>
      );
    case "bottom_01":
      return (
        <g className={contorno} strokeWidth="4">
          <path d="M104 259l50-2 3 70-8 66H98l8-68z" className="fill-secondary" />
          <path d="M154 257l51 6 14 63-1 67h-50l-13-69z" className="fill-secondary" />
          <path d="M110 278c13 6 28 8 43 5M169 284c13 0 25-3 36-9" fill="none" className="stroke-accent/70" strokeWidth="3" />
          <path d="M150 267l5 58M104 325l45 1M164 326l51-1" fill="none" className="stroke-avatar-outline/60" strokeWidth="3" />
          <path d="M101 365l50 1M168 365l50 1" fill="none" className="stroke-primary/50" strokeWidth="3" />
        </g>
      );
    case "shoes_01":
      return (
        <g className={contorno} strokeWidth="4">
          <path d="M98 374h52l3 24-12 11H72c-4-16 4-27 26-35z" className="fill-avatar-leather" />
          <path d="M169 374h49c22 7 31 18 28 35h-70l-10-11z" className="fill-avatar-leather" />
          <path d="M82 396h66M173 396h65M105 382l38 2M176 384l37-2" fill="none" className="stroke-avatar-leather-light" strokeWidth="4" />
          <path d="M76 408h73M175 408h68" fill="none" className="stroke-primary" strokeWidth="3" />
        </g>
      );
    case "top_01":
      return (
        <g className={contorno} strokeWidth="4">
          <path d="M111 144l25-14h42l30 14 18 46-21 15-11-28 9 86c-27 18-72 17-103-3l11-82-16 45-22-10z" className="fill-avatar-cloth" />
          <path d="M112 145c-20 5-29 22-35 43l-13 51c-3 11 3 21 14 24 10 3 20-2 24-12l18-48" className="fill-avatar-cloth" />
          <path d="M205 145c19 5 27 19 34 39l17 49c4 11-1 21-11 25-10 4-21-1-25-11l-22-48" className="fill-avatar-cloth" />
          <path d="M71 238c-8 5-11 14-7 22 4 9 15 12 24 7l9-8-19-17zM251 232c9 4 13 13 10 22-4 10-15 14-24 9l-9-7 17-20z" className="fill-avatar-skin" />
          <path d="M132 132l24 29 23-30 12 9-12 39-23-17-24 17-13-38z" className="fill-card" />
          <path d="M156 163v96M119 202h31v28h-31z" fill="none" className="stroke-primary" strokeWidth="3" />
          <path d="M106 254c31 14 66 15 96 2l4 21c-33 16-71 15-104-2z" className="fill-avatar-leather" />
          <path d="M151 259h18v20h-18z" className="fill-primary" />
          <path d="M218 190l-13 9M89 197l17 8" fill="none" className="stroke-avatar-cloth-light" strokeWidth="5" />
          <path d="M190 150c9 8 14 19 16 32M122 151c-8 7-12 18-14 29" fill="none" className="stroke-avatar-cloth-light" strokeWidth="3" />
        </g>
      );
    case "top_02":
      return (
        <g className={contorno} strokeWidth="4">
          <path d="M111 143l27-13h39l31 14 19 47-22 14-12-29 10 87c-30 17-70 16-103-3l11-82-16 45-22-10z" className="fill-card" />
          <path d="M111 146c-19 5-29 22-35 43l-12 49c-4 12 2 22 13 26 10 3 21-3 25-13l18-49M205 145c18 5 27 19 34 39l17 49c4 11-1 21-11 25-10 4-21-1-25-11l-22-48" className="fill-card" />
          <path d="M71 238c-8 5-11 14-7 22 4 9 15 12 24 7l9-8-19-17zM251 232c9 4 13 13 10 22-4 10-15 14-24 9l-9-7 17-20z" className="fill-avatar-skin" />
          <path d="M132 132l24 31 23-32 17 13-20 41-20-19-21 19-21-42z" className="fill-secondary" />
          <path d="M156 164v96M112 221h88M106 254c31 14 66 15 96 2" fill="none" className="stroke-primary" strokeWidth="3" />
          <path d="M121 194l13 8-13 8M191 194l-13 8 13 8" fill="none" className="stroke-accent" strokeWidth="3" />
        </g>
      );
    case "face_02":
      return <g className={contorno} strokeWidth="4"><path d="M137 58c13-9 37-8 50 1 14 10 20 29 17 51l-4 24c-3 21-20 39-43 42-24-3-41-20-45-42l-4-24c-3-23 8-42 29-52z" className="fill-avatar-skin" /><path d="M145 174h24l3 19c-9 8-21 8-31 0z" className="fill-avatar-skin-shadow" /><path d="M120 115c-8-4-13 1-10 12 2 9 7 15 14 15M198 115c8-4 13 1 10 12-2 9-7 15-14 15" className="fill-avatar-skin" /></g>;
    case "face_01":
      return <g className={contorno} strokeWidth="4"><path d="M132 58c15-11 40-10 55 0 15 10 21 29 18 52l-4 24c-4 22-20 39-44 43-25-4-42-21-45-43l-4-24c-4-23 5-41 24-52z" className="fill-avatar-skin" /><path d="M144 174h25l3 20c-9 8-22 8-31 0z" className="fill-avatar-skin-shadow" /><path d="M119 114c-8-3-13 2-10 13 2 9 8 15 15 15M199 114c8-3 13 2 10 13-2 9-8 15-15 15" className="fill-avatar-skin" /><path d="M120 91c5-18 19-29 38-31 19 0 34 10 42 28" fill="none" className="stroke-avatar-skin-shadow/60" strokeWidth="3" /></g>;
    case "eyes_02":
      return <g className={contorno} strokeWidth="3"><path d="M126 111q12-11 25 0-12 12-25 0zM166 111q12-11 25 0-12 12-25 0z" className="fill-accent" /><circle cx="140" cy="111" r="4" className="fill-background stroke-none" /><circle cx="180" cy="111" r="4" className="fill-background stroke-none" /><path d="M128 98q12-7 24 0M166 98q12-7 24 0M145 149q14 7 29-1" fill="none" /></g>;
    case "eyes_01":
      return <g className={contorno} strokeWidth="3"><path d="M125 111q13-12 27 0-13 12-27 0zM165 111q13-12 27 0-13 12-27 0z" className="fill-foreground" /><ellipse cx="140" cy="111" rx="5" ry="7" className="fill-accent stroke-none" /><ellipse cx="178" cy="111" rx="5" ry="7" className="fill-accent stroke-none" /><circle cx="142" cy="109" r="1.8" className="fill-foreground stroke-none" /><circle cx="180" cy="109" r="1.8" className="fill-foreground stroke-none" /><path d="M127 98q12-7 24 0M166 98q12-7 24 0M152 127l-3 9 7 2M145 151q14 8 29 0" fill="none" /></g>;
    case "hair_02":
      return <g className={contorno} strokeWidth="4"><path d="M108 105c-4-35 8-62 35-71 29-10 60 5 67 38 3 14 0 29-7 42l-7-29-12 10-8-24-16 19-12-18-19 24-10-16z" className="fill-secondary" /><path d="M121 79c14-31 47-43 75-18M131 61c17 5 29 14 36 28" fill="none" className="stroke-accent" strokeWidth="4" /></g>;
    case "hair_01":
      return <g className={contorno} strokeWidth="4"><path d="M107 110c-6-34 4-62 31-74 25-12 57-5 70 21 9 18 7 39-2 57l-8-29-13 11-7-25-17 19-12-18-19 25-10-17z" className="fill-avatar-hair" /><path d="M119 76c17-25 47-37 76-20M126 60c20-7 44-2 57 15M198 84l-12 12M120 84l10 13" fill="none" className="stroke-avatar-hair-light" strokeWidth="5" /></g>;
    default:
      return null;
  }
}

export function AvatarModular({ configuracion, className, nombre = "Avatar del héroe" }: Props) {
  const piezas = { ...PREDETERMINADO, ...configuracion };
  const orden: CategoriaAvatar[] = ["effect", "accessory", "bottom", "shoes", "top", "face", "eyes", "hair"];
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-md border border-primary/50 bg-secondary/35", className)} role="img" aria-label={nombre}>
      <div className="absolute inset-x-[12%] bottom-[1%] h-[11%] rounded-full bg-background/70 blur-md" />
      <div className="absolute left-1/2 top-[16%] h-[58%] w-[56%] -translate-x-1/2 rounded-full bg-accent/15 blur-2xl" />
      <svg viewBox="0 0 320 420" className="relative h-full w-full overflow-visible drop-shadow-[0_12px_14px_var(--color-background)]" aria-hidden="true">
        <path d="M48 404Q160 431 274 402" fill="none" className="stroke-primary/45" strokeWidth="3" />
        {orden.map((categoria) => <Capa key={categoria} codigo={piezas[categoria] ?? ""} />)}
      </svg>
    </div>
  );
}