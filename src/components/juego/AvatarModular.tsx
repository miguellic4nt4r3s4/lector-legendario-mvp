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

function Capa({ codigo }: { codigo: string }) {
  switch (codigo) {
    case "effect_01":
      return (
        <g className="fill-accent/25 stroke-accent" strokeWidth="2">
          <path d="M40 146c-16-26-12-68 13-91M160 146c16-26 12-68-13-91" fill="none" strokeDasharray="5 8" />
          <circle cx="43" cy="78" r="5" /><circle cx="157" cy="102" r="4" /><circle cx="151" cy="62" r="3" />
        </g>
      );
    case "accessory_backpack_01":
      return (
        <g className="stroke-primary" strokeWidth="3" strokeLinejoin="round">
          <path d="M48 99c-12 1-19 11-19 25v35c0 8 6 13 14 13h25v-70z" className="fill-accent" />
          <path d="M35 121h27M42 107c0-12 15-17 23-8" fill="none" />
          <path d="M35 139h23v23H35z" className="fill-secondary" />
        </g>
      );
    case "bottom_01":
      return (
        <g className="fill-secondary stroke-border" strokeWidth="2">
          <path d="M67 137h31v51H58l7-47z" /><path d="M102 137h31l2 4 7 47h-40z" />
          <path d="M98 142h4v46h-4z" className="fill-background" />
        </g>
      );
    case "shoes_01":
      return (
        <g className="fill-card stroke-primary" strokeWidth="2">
          <path d="M56 181h42v16H47c0-9 4-14 9-16z" /><path d="M102 181h42c5 2 9 7 9 16h-51z" />
          <path d="M56 188h34M110 188h34" className="stroke-accent" />
        </g>
      );
    case "top_01":
      return (
        <g className="stroke-border" strokeWidth="2" strokeLinejoin="round">
          <path d="M63 95l24-8h26l24 8 10 50-21 4-5-31v29H79v-29l-5 31-21-4z" className="fill-accent" />
          <path d="M87 87l13 18 13-18M100 105v42" fill="none" className="stroke-primary" />
          <path d="M91 119h18v13H91z" className="fill-secondary" />
        </g>
      );
    case "top_02":
      return (
        <g className="stroke-primary" strokeWidth="2" strokeLinejoin="round">
          <path d="M62 95l25-9h26l25 9 8 56-24 3-2-37v40H80v-40l-2 37-24-3z" className="fill-card" />
          <path d="M87 87l13 25 13-25M100 112v45M74 139h52" fill="none" className="stroke-accent" />
        </g>
      );
    case "face_02":
      return <path d="M72 43q28-25 56 0v29q0 25-28 30-28-5-28-30z" className="fill-primary/80 stroke-accent" strokeWidth="2" />;
    case "face_01":
      return <path d="M70 43q30-24 60 0v29q0 25-30 31-30-6-30-31z" className="fill-primary/70 stroke-accent" strokeWidth="2" />;
    case "eyes_02":
      return <g className="fill-accent stroke-background" strokeWidth="2"><path d="M78 64q10-10 20 0-10 10-20 0z" /><path d="M102 64q10-10 20 0-10 10-20 0z" /></g>;
    case "eyes_01":
      return <g className="fill-background"><circle cx="88" cy="65" r="4" /><circle cx="112" cy="65" r="4" /><path d="M90 84q10 7 20 0" fill="none" className="stroke-background" strokeWidth="2" /></g>;
    case "hair_02":
      return <path d="M67 50q2-34 33-34 31 0 34 34l-13-14-8 12-12-14-14 14-9-12z" className="fill-secondary stroke-primary" strokeWidth="2" />;
    case "hair_01":
      return <path d="M68 53q-1-37 32-37 35 0 33 38l-9-16-9 9-13-12-13 12-11-10z" className="fill-card stroke-primary" strokeWidth="2" />;
    default:
      return null;
  }
}

export function AvatarModular({ configuracion, className, nombre = "Avatar del héroe" }: Props) {
  const piezas = { ...PREDETERMINADO, ...configuracion };
  const orden: CategoriaAvatar[] = ["effect", "accessory", "bottom", "shoes", "top", "face", "eyes", "hair"];
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-md border border-primary/50 bg-secondary/35", className)} role="img" aria-label={nombre}>
      <div className="absolute inset-x-[14%] bottom-[4%] h-[12%] rounded-full bg-background/60 blur-md" />
      <svg viewBox="0 0 200 210" className="relative h-full w-full" aria-hidden="true">
        <path d="M25 177Q100 203 175 177" fill="none" className="stroke-accent/25" strokeWidth="2" />
        {orden.map((categoria) => <Capa key={categoria} codigo={piezas[categoria] ?? ""} />)}
      </svg>
    </div>
  );
}