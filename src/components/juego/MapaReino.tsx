import { WorldMap } from "./WorldMap";

type Props = {
  xp: number;
  /** Órdenes de aventura que tienen al menos una misión completada. */
  aventurasCompletadas?: number[];
};

/**
 * MAPA DEL REINO — seis mundos. Solo el primero tiene contenido hoy; los demás
 * muestran su condición de desbloqueo y el avance del héroe hacia ella.
 */
export function MapaReino({ xp, aventurasCompletadas = [] }: Props) { return <WorldMap xp={xp} aventurasCompletadas={aventurasCompletadas} />; }
