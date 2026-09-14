import type { Rareza } from "@/lib/juego";
import { AchievementCard } from "./AchievementCard";

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
  return <AchievementCard nombre={nombre} descripcion={descripcion} icono={icono} rareza={rareza} desbloqueada={desbloqueada} fecha={fecha} mundo={mundo} condicion={condicion} destacada={destacada} />;
}
