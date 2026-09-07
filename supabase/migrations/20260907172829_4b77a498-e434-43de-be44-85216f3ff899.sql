
-- ENUMS
CREATE TYPE public.rol_usuario AS ENUM ('estudiante','docente');
CREATE TYPE public.competencia_lit AS ENUM ('literal','inferencial','critica','vocabulario','estructura');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  nombre text NOT NULL,
  rol public.rol_usuario NOT NULL DEFAULT 'estudiante',
  curso_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.cursos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  codigo text NOT NULL UNIQUE,
  docente_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cursos TO authenticated;
GRANT ALL ON public.cursos TO service_role;
ALTER TABLE public.cursos ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles ADD CONSTRAINT profiles_curso_fk FOREIGN KEY (curso_id) REFERENCES public.cursos(id) ON DELETE SET NULL;

-- FUNCIONES DE SEGURIDAD
CREATE OR REPLACE FUNCTION public.es_docente(_user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user AND rol = 'docente');
$$;

CREATE OR REPLACE FUNCTION public.docente_de_estudiante(_docente uuid, _estudiante uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    JOIN public.cursos c ON c.id = p.curso_id
    WHERE p.id = _estudiante AND c.docente_id = _docente
  );
$$;

CREATE POLICY "perfil propio visible" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "docente ve sus estudiantes" ON public.profiles FOR SELECT TO authenticated USING (public.docente_de_estudiante(auth.uid(), id));
CREATE POLICY "crear perfil propio" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "actualizar perfil propio" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "cursos visibles" ON public.cursos FOR SELECT TO authenticated USING (true);

-- CONTENIDO
CREATE TABLE public.aventuras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text NOT NULL,
  ambientacion text,
  orden int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.aventuras TO authenticated;
GRANT ALL ON public.aventuras TO service_role;
ALTER TABLE public.aventuras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "aventuras visibles" ON public.aventuras FOR SELECT TO authenticated USING (true);

CREATE TABLE public.misiones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  aventura_id uuid NOT NULL REFERENCES public.aventuras(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  sinopsis text NOT NULL,
  texto_lectura text NOT NULL,
  xp_base int NOT NULL DEFAULT 100,
  orden int NOT NULL DEFAULT 1,
  disponible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.misiones TO authenticated;
GRANT ALL ON public.misiones TO service_role;
ALTER TABLE public.misiones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "misiones visibles" ON public.misiones FOR SELECT TO authenticated USING (true);

CREATE TABLE public.retos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mision_id uuid NOT NULL REFERENCES public.misiones(id) ON DELETE CASCADE,
  enunciado text NOT NULL,
  opciones jsonb NOT NULL,
  respuesta_correcta int NOT NULL,
  competencia public.competencia_lit NOT NULL,
  pista text,
  retroalimentacion_correcta text NOT NULL,
  retroalimentacion_incorrecta text NOT NULL,
  xp int NOT NULL DEFAULT 20,
  orden int NOT NULL DEFAULT 1
);
GRANT SELECT ON public.retos TO authenticated;
GRANT ALL ON public.retos TO service_role;
ALTER TABLE public.retos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "retos visibles" ON public.retos FOR SELECT TO authenticated USING (true);

CREATE TABLE public.insignias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text NOT NULL UNIQUE,
  nombre text NOT NULL,
  descripcion text NOT NULL,
  icono text NOT NULL DEFAULT 'shield'
);
GRANT SELECT ON public.insignias TO authenticated;
GRANT ALL ON public.insignias TO service_role;
ALTER TABLE public.insignias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insignias visibles" ON public.insignias FOR SELECT TO authenticated USING (true);

-- HEROES
CREATE TABLE public.heroes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  clase text NOT NULL,
  avatar text NOT NULL DEFAULT 'lupa',
  xp int NOT NULL DEFAULT 0,
  nivel int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.heroes TO authenticated;
GRANT ALL ON public.heroes TO service_role;
ALTER TABLE public.heroes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "heroe propio" ON public.heroes FOR SELECT TO authenticated USING (profile_id = auth.uid());
CREATE POLICY "docente ve heroes" ON public.heroes FOR SELECT TO authenticated USING (public.docente_de_estudiante(auth.uid(), profile_id));
CREATE POLICY "crear heroe propio" ON public.heroes FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "actualizar heroe propio" ON public.heroes FOR UPDATE TO authenticated USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

CREATE TABLE public.intentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id uuid NOT NULL REFERENCES public.heroes(id) ON DELETE CASCADE,
  reto_id uuid NOT NULL REFERENCES public.retos(id) ON DELETE CASCADE,
  opcion_elegida int NOT NULL,
  correcto boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.intentos TO authenticated;
GRANT ALL ON public.intentos TO service_role;
ALTER TABLE public.intentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "intentos propios" ON public.intentos FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));
CREATE POLICY "docente ve intentos" ON public.intentos FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND public.docente_de_estudiante(auth.uid(), h.profile_id)));
CREATE POLICY "registrar intentos propios" ON public.intentos FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));

CREATE TABLE public.progreso_misiones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id uuid NOT NULL REFERENCES public.heroes(id) ON DELETE CASCADE,
  mision_id uuid NOT NULL REFERENCES public.misiones(id) ON DELETE CASCADE,
  aciertos int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  xp_ganado int NOT NULL DEFAULT 0,
  completada boolean NOT NULL DEFAULT false,
  actualizado_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (hero_id, mision_id)
);
GRANT SELECT, INSERT, UPDATE ON public.progreso_misiones TO authenticated;
GRANT ALL ON public.progreso_misiones TO service_role;
ALTER TABLE public.progreso_misiones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progreso propio" ON public.progreso_misiones FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));
CREATE POLICY "docente ve progreso" ON public.progreso_misiones FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND public.docente_de_estudiante(auth.uid(), h.profile_id)));
CREATE POLICY "crear progreso propio" ON public.progreso_misiones FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));
CREATE POLICY "actualizar progreso propio" ON public.progreso_misiones FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));

CREATE TABLE public.hero_insignias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id uuid NOT NULL REFERENCES public.heroes(id) ON DELETE CASCADE,
  insignia_id uuid NOT NULL REFERENCES public.insignias(id) ON DELETE CASCADE,
  obtenida_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (hero_id, insignia_id)
);
GRANT SELECT, INSERT ON public.hero_insignias TO authenticated;
GRANT ALL ON public.hero_insignias TO service_role;
ALTER TABLE public.hero_insignias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insignias propias" ON public.hero_insignias FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));
CREATE POLICY "docente ve insignias" ON public.hero_insignias FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND public.docente_de_estudiante(auth.uid(), h.profile_id)));
CREATE POLICY "ganar insignia propia" ON public.hero_insignias FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));

-- PERFIL AUTOMATICO AL REGISTRARSE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _curso uuid;
BEGIN
  SELECT id INTO _curso FROM public.cursos WHERE codigo = COALESCE(NEW.raw_user_meta_data->>'curso_codigo','6A') LIMIT 1;
  INSERT INTO public.profiles (id, nombre, rol, curso_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email,'@',1)),
    COALESCE((NEW.raw_user_meta_data->>'rol')::public.rol_usuario, 'estudiante'),
    _curso
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- DATOS DEMO
INSERT INTO public.cursos (id, nombre, codigo) VALUES ('11111111-1111-4111-8111-111111111111','Grado 6A','6A');
INSERT INTO public.profiles (id, nombre, rol, curso_id) VALUES
  ('22222222-2222-4222-8222-222222222222','Valentina Ríos (docente demo)','docente',NULL),
  ('33333333-3333-4333-8333-333333333333','Alex Mendoza','estudiante','11111111-1111-4111-8111-111111111111');
UPDATE public.cursos SET docente_id = '22222222-2222-4222-8222-222222222222' WHERE id = '11111111-1111-4111-8111-111111111111';
INSERT INTO public.heroes (id, profile_id, nombre, clase, avatar, xp, nivel) VALUES
  ('44444444-4444-4444-8444-444444444444','33333333-3333-4333-8333-333333333333','Alex el Rastreador','Detective de Sombras','lupa',60,1);

INSERT INTO public.insignias (id, codigo, nombre, descripcion, icono) VALUES
  ('55555555-5555-4555-8555-555555555555','ojo_del_archivo','Ojo del Archivo','Otorgada a quien descifra el Enigma de la Biblioteca Perdida con al menos 3 aciertos.','eye'),
  ('56555555-5555-4555-8555-555555555556','lector_legendario','Lector Legendario','Otorgada por resolver una misión completa sin errores.','crown');

INSERT INTO public.aventuras (id, titulo, descripcion, ambientacion, orden) VALUES
  ('66666666-6666-4666-8666-666666666666','El Enigma de la Biblioteca Perdida','Una biblioteca sellada hace cuarenta años reaparece bajo la ciudad. Alguien dejó pistas escritas para quien sepa leer entre líneas.','Ciudad de Valdegrís, subsuelo, niebla y linternas',1);

INSERT INTO public.misiones (id, aventura_id, titulo, sinopsis, texto_lectura, xp_base, orden) VALUES
  ('77777777-7777-4777-8777-777777777777','66666666-6666-4666-8666-666666666666','Misión 1: La sala de los relojes detenidos','Desciende al primer nivel del archivo y descifra la nota que dejó la última bibliotecaria.','La escalera terminaba en una sala donde catorce relojes marcaban la misma hora: las tres y once. El polvo cubría todo menos una mesa, como si alguien la hubiera limpiado hacía poco. Sobre ella descansaba un cuaderno abierto y una llave de bronce con el número siete grabado.

La nota decía, con letra apretada: "No confíes en el reloj que suena. Los otros trece callan porque dicen la verdad. Quien busque la salida no debe mirar la puerta grande, sino contar las estanterías desde la pared húmeda."

Mara, la última bibliotecaria, había desaparecido un martes de octubre. Nadie recordaba haber oído la alarma esa noche, aunque el vigilante juró que el reloj de pared sonó once veces. En el cuaderno, entre listas de libros, alguien había subrayado tres veces la palabra "custodio" y había escrito al margen: "él vuelve cuando la sala se enfría".

Conté las estanterías desde la pared húmeda: siete. La llave giró sin resistencia. Detrás no había una salida, sino otra sala, más pequeña, con un solo reloj. Estaba en marcha.',120,1);

INSERT INTO public.retos (mision_id, enunciado, opciones, respuesta_correcta, competencia, pista, retroalimentacion_correcta, retroalimentacion_incorrecta, xp, orden) VALUES
('77777777-7777-4777-8777-777777777777','¿Qué objeto encuentra el protagonista sobre la mesa, junto al cuaderno?','["Una linterna apagada","Una llave de bronce con el número siete","Un reloj de bolsillo detenido","Un mapa del subsuelo"]',1,'literal','Vuelve al primer párrafo del texto.','Correcto. El texto lo dice de forma directa: sobre la mesa había un cuaderno abierto y una llave de bronce con el número siete.','Casi. Esa información no aparece en el texto: relee el primer párrafo, donde se describe exactamente qué hay sobre la mesa.',20,1),
('77777777-7777-4777-8777-777777777777','Si la nota afirma que "no confíes en el reloj que suena", ¿qué se puede deducir sobre el reloj de la última sala?','["Que está roto y por eso avanza","Que probablemente sea el reloj que engaña","Que marca la hora correcta de la ciudad","Que perteneció al vigilante"]',1,'inferencial','Une la advertencia de la nota con el detalle final: ese reloj está en marcha.','Excelente deducción. La nota advierte contra el reloj que funciona y suena; el único reloj en marcha aparece justo al final, así que es el sospechoso.','Todavía no. Relaciona dos datos separados: la advertencia de la nota y el hecho de que el último reloj sea el único en marcha.',20,2),
('77777777-7777-4777-8777-777777777777','En la frase "él vuelve cuando la sala se enfría", la palabra "custodio" subrayada en el cuaderno se refiere a alguien que:','["Repara los relojes del archivo","Vigila o guarda algo con celo","Escribe los inventarios de libros","Visita la biblioteca por curiosidad"]',1,'vocabulario','Piensa en palabras de la misma familia: custodia, custodiar.','Bien. Un custodio es quien guarda o vigila algo; el subrayado insiste en que hay alguien protegiendo el archivo.','No exactamente. "Custodio" comparte raíz con "custodiar": tiene que ver con guardar o vigilar, no con reparar ni inventariar.',20,3),
('77777777-7777-4777-8777-777777777777','¿Cómo está organizado el relato?','["Presenta primero la conclusión y luego los hechos","Avanza describiendo el lugar, luego la pista escrita y después la acción del protagonista","Alterna dos historias en tiempos distintos","Es una lista de instrucciones sin narrador"]',1,'estructura','Fíjate en el orden en que aparecen la sala, la nota y la decisión de contar estanterías.','Correcto. El texto describe el escenario, entrega la pista escrita y termina con la acción que esa pista provoca.','Revisa el orden de los párrafos: primero el escenario, luego la nota, después la investigación y la acción final.',20,4),
('77777777-7777-4777-8777-777777777777','El vigilante jura que el reloj sonó once veces esa noche. ¿Qué postura crítica es más razonable frente a ese testimonio?','["Aceptarlo como prueba definitiva porque es un adulto","Descartarlo por completo, ya que nadie más lo oyó","Considerarlo una pista útil pero verificable, porque contradice el resto de los relojes","Ignorarlo porque los relojes no son importantes en el caso"]',2,'critica','Un buen investigador no acepta ni descarta: contrasta.','Muy bien argumentado. El testimonio no se acepta ni se descarta: se contrasta con la evidencia, y aquí choca con los trece relojes callados.','Piénsalo como investigador: un testimonio aislado no es prueba definitiva, pero tampoco basura. Se contrasta con la demás evidencia.',20,5);

-- progreso demo de Alex (misión iniciada, aún sin completar)
INSERT INTO public.progreso_misiones (hero_id, mision_id, aciertos, total, xp_ganado, completada) VALUES
  ('44444444-4444-4444-8444-444444444444','77777777-7777-4777-8777-777777777777',3,5,60,false);
