import type { ConfiguracionAvatar } from "./AvatarModular";
import heroeBase from "@/assets/heroe-base.webp";
import heroeConMochila from "@/assets/heroe-con-mochila.webp";

/** Devuelve la ilustración del héroe según si lleva equipada una mochila. */
export function retratoHeroe(configuracion?: ConfiguracionAvatar) {
  const accesorio = (configuracion?.accessory ?? "").toLowerCase();
  const conMochila = accesorio.includes("mochila") || accesorio.includes("backpack");
  return conMochila
    ? { src: heroeConMochila, width: 351, height: 900, conMochila }
    : { src: heroeBase, width: 327, height: 900, conMochila };
}
