import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Encabezado } from "@/components/juego/Encabezado";
import { AdventureStage } from "@/components/juego/AdventureStage";
import { MapaReino } from "@/components/juego/MapaReino";
import {
  aventurasQuery,
  inventarioAvatarQuery,
  heroeQuery,
  insigniasCatalogoQuery,
  insigniasHeroeQuery,
  perfilQuery,
  progresoQuery,
} from "@/lib/consultas";
import type { ConfiguracionAvatar } from "@/components/juego/AvatarModular";

export const Route = createFileRoute("/_authenticated/aventura")({
  head: () => ({
    meta: [
      { title: "Mi aventura — Lector Legendario" },
      {
        name: "description",
        content: "Mapa de misiones, experiencia acumulada e insignias de tu héroe investigador.",
      },
      { property: "og:title", content: "Mi aventura — Lector Legendario" },
      { property: "og:description", content: "Continúa tus misiones de comprensión lectora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Aventura,
});

function Aventura() {
  const navigate = useNavigate();
  const { data: perfil } = useQuery(perfilQuery());
  const { data: heroe, isLoading: cargandoHeroe } = useQuery(heroeQuery());
  const { data: aventuras } = useQuery(aventurasQuery());
  const { data: progreso } = useQuery(progresoQuery(heroe?.id));
  const { data: insignias } = useQuery(insigniasHeroeQuery(heroe?.id));
  const { data: catalogo } = useQuery(insigniasCatalogoQuery());
  const { data: inventarioAvatar } = useQuery(inventarioAvatarQuery(heroe?.id));

  useEffect(() => {
    if (!cargandoHeroe && heroe === null && perfil?.rol === "estudiante") {
      navigate({ to: "/heroe" });
    }
    if (perfil?.rol === "docente") {
      navigate({ to: "/docente" });
    }
  }, [cargandoHeroe, heroe, perfil, navigate]);

  if (!heroe) {
    return (
      <div className="min-h-screen">
        <Encabezado rol={perfil?.rol} modoAventura />
        <main className="mx-auto max-w-5xl px-4 py-12 text-muted-foreground">
          Preparando tu expediente…
        </main>
      </div>
    );
  }

  const progresoPorMision = new Map((progreso ?? []).map((p) => [p.mision_id, p]));
  const insigniasObtenidas = new Set((insignias ?? []).map((i) => (i.insignias as unknown as { id: string }).id));
  const aventurasCompletadas = (aventuras ?? [])
    .filter((a) => {
      const ms = (a.misiones as unknown as { id: string }[]) ?? [];
      return ms.some((m) => progresoPorMision.get(m.id)?.completada);
    })
    .map((a) => a.orden);
  const configuracionAvatar = Object.fromEntries(
    (inventarioAvatar ?? []).filter((fila) => fila.equipped).map((fila) => [fila.category, fila.avatar_items.asset]),
  ) as ConfiguracionAvatar;
  const equipados = (inventarioAvatar ?? []).filter((fila) => fila.equipped).map((fila) => fila.avatar_items);
  const primeraAventura = aventuras?.[0];
  const misionesPrimeraAventura = ((primeraAventura?.misiones as unknown as {
    id: string; titulo: string; sinopsis: string; xp_base: number; orden: number; disponible: boolean;
  }[]) ?? []).sort((a, b) => a.orden - b.orden);
  const misionActual = misionesPrimeraAventura.find((mision) => mision.disponible && !progresoPorMision.get(mision.id)?.completada)
    ?? misionesPrimeraAventura.find((mision) => mision.disponible);
  const progresoMisionActual = misionActual ? progresoPorMision.get(misionActual.id) : undefined;

  return (
    <div className="min-h-screen">
      <Encabezado rol={perfil?.rol} modoAventura />
      <main className="pb-10">
        <AdventureStage
          nombre={heroe.nombre}
          clase={heroe.clase}
          xp={heroe.xp}
          configuracion={configuracionAvatar}
          equipados={equipados}
          insignias={(catalogo ?? []).map((insignia) => ({ nombre: insignia.nombre, icono: insignia.icono, desbloqueada: insigniasObtenidas.has(insignia.id) }))}
          mision={misionActual ? { ...misionActual, completada: progresoMisionActual?.completada ?? false, iniciada: !!progresoMisionActual } : undefined}
          aventuraTitulo={primeraAventura?.titulo}
        />

        <div id="mapa"><MapaReino xp={heroe.xp} aventurasCompletadas={aventurasCompletadas} /></div>
      </main>
    </div>
  );
}
