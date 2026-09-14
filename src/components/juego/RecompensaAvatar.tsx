import type { AvatarItem } from "@/lib/consultas";
import { RewardModal } from "./RewardModal";

type Props = { item: AvatarItem | null; abierta: boolean; equipando: boolean; onEquipar: () => void; onContinuar: () => void };

export function RecompensaAvatar({ item, abierta, equipando, onEquipar, onContinuar }: Props) {
  return <RewardModal item={item} abierta={abierta} equipando={equipando} onEquipar={onEquipar} onContinuar={onContinuar} />;
}