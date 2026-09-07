import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Perfil = {
  id: string;
  nombre: string;
  rol: "estudiante" | "docente";
  curso_id: string | null;
};

export type Heroe = {
  id: string;
  profile_id: string;
  nombre: string;
  clase: string;
  avatar: string;
  xp: number;
  nivel: number;
};

export type Reto = {
  id: string;
  enunciado: string;
  opciones: string[];
  respuesta_correcta: number;
  competencia: string;
  pista: string | null;
  retroalimentacion_correcta: string;
  retroalimentacion_incorrecta: string;
  xp: number;
  orden: number;
};

async function usuarioActual() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Sesión no encontrada");
  return data.user;
}

export const perfilQuery = () =>
  queryOptions({
    queryKey: ["perfil"],
    queryFn: async (): Promise<Perfil> => {
      const user = await usuarioActual();
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nombre, rol, curso_id")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Perfil no encontrado");
      return data as Perfil;
    },
  });

export const heroeQuery = () =>
  queryOptions({
    queryKey: ["heroe"],
    queryFn: async (): Promise<Heroe | null> => {
      const user = await usuarioActual();
      const { data, error } = await supabase
        .from("heroes")
        .select("id, profile_id, nombre, clase, avatar, xp, nivel")
        .eq("profile_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return (data as Heroe) ?? null;
    },
  });

export const aventurasQuery = () =>
  queryOptions({
    queryKey: ["aventuras"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("aventuras")
        .select("id, titulo, descripcion, ambientacion, orden, misiones(id, titulo, sinopsis, xp_base, orden, disponible)")
        .order("orden");
      if (error) throw error;
      return data ?? [];
    },
  });

export const progresoQuery = (heroId: string | undefined) =>
  queryOptions({
    queryKey: ["progreso", heroId],
    enabled: !!heroId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progreso_misiones")
        .select("mision_id, aciertos, total, xp_ganado, completada")
        .eq("hero_id", heroId!);
      if (error) throw error;
      return data ?? [];
    },
  });

export const insigniasHeroeQuery = (heroId: string | undefined) =>
  queryOptions({
    queryKey: ["insignias-heroe", heroId],
    enabled: !!heroId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_insignias")
        .select("obtenida_at, insignias(id, codigo, nombre, descripcion, icono)")
        .eq("hero_id", heroId!);
      if (error) throw error;
      return data ?? [];
    },
  });

export const misionQuery = (misionId: string) =>
  queryOptions({
    queryKey: ["mision", misionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("misiones")
        .select("id, titulo, sinopsis, texto_lectura, xp_base, aventuras(titulo, ambientacion)")
        .eq("id", misionId)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Misión no encontrada");
      return data;
    },
  });

export const retosQuery = (misionId: string) =>
  queryOptions({
    queryKey: ["retos", misionId],
    queryFn: async (): Promise<Reto[]> => {
      const { data, error } = await supabase
        .from("retos")
        .select(
          "id, enunciado, opciones, respuesta_correcta, competencia, pista, retroalimentacion_correcta, retroalimentacion_incorrecta, xp, orden",
        )
        .eq("mision_id", misionId)
        .order("orden");
      if (error) throw error;
      return (data ?? []) as unknown as Reto[];
    },
  });

export const cursoDocenteQuery = () =>
  queryOptions({
    queryKey: ["curso-docente"],
    queryFn: async () => {
      const user = await usuarioActual();
      const { data: cursos, error } = await supabase
        .from("cursos")
        .select("id, nombre, codigo")
        .eq("docente_id", user.id);
      if (error) throw error;
      const curso = cursos?.[0] ?? null;
      if (!curso) return { curso: null, estudiantes: [] as EstudianteResumen[] };

      const { data: perfiles, error: errorPerfiles } = await supabase
        .from("profiles")
        .select("id, nombre, rol, heroes(id, nombre, clase, xp, nivel)")
        .eq("curso_id", curso.id)
        .eq("rol", "estudiante");
      if (errorPerfiles) throw errorPerfiles;

      const heroeDe = (p: { heroes?: unknown }): Heroe | null => {
        const h = p.heroes;
        if (!h) return null;
        return (Array.isArray(h) ? ((h[0] as Heroe) ?? null) : (h as Heroe)) ?? null;
      };

      const heroIds = (perfiles ?? [])
        .map((p) => heroeDe(p)?.id)
        .filter((id): id is string => !!id);

      let progresos: {
        hero_id: string;
        mision_id: string;
        aciertos: number;
        total: number;
        completada: boolean;
      }[] = [];
      if (heroIds.length > 0) {
        const { data: prog, error: errorProg } = await supabase
          .from("progreso_misiones")
          .select("hero_id, mision_id, aciertos, total, completada")
          .in("hero_id", heroIds);
        if (errorProg) throw errorProg;
        progresos = prog ?? [];
      }

      const estudiantes: EstudianteResumen[] = (perfiles ?? []).map((p) => {
        const heroe = heroeDe(p);
        const suyos = progresos.filter((x) => heroe && x.hero_id === heroe.id);
        const aciertos = suyos.reduce((a, x) => a + x.aciertos, 0);
        const total = suyos.reduce((a, x) => a + x.total, 0);
        return {
          id: p.id,
          nombre: p.nombre,
          heroe: heroe ? { nombre: heroe.nombre, clase: heroe.clase, xp: heroe.xp } : null,
          misionesCompletadas: suyos.filter((x) => x.completada).length,
          misionesIniciadas: suyos.length,
          aciertos,
          total,
        };
      });

      return { curso, estudiantes };
    },
  });

export type EstudianteResumen = {
  id: string;
  nombre: string;
  heroe: { nombre: string; clase: string; xp: number } | null;
  misionesCompletadas: number;
  misionesIniciadas: number;
  aciertos: number;
  total: number;
};
