CREATE TABLE public.avatar_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('face','hair','eyes','top','bottom','shoes','accessory','effect')),
  description text NOT NULL,
  asset text NOT NULL,
  rarity text NOT NULL CHECK (rarity IN ('comun','rara','epica','legendaria','mitica')),
  unlock_condition text NOT NULL,
  is_starter boolean NOT NULL DEFAULT false,
  required_badge_code text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, category)
);
GRANT SELECT ON public.avatar_items TO authenticated;
GRANT ALL ON public.avatar_items TO service_role;
ALTER TABLE public.avatar_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "catalogo avatar visible" ON public.avatar_items FOR SELECT TO authenticated USING (true);

CREATE TABLE public.hero_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id uuid NOT NULL REFERENCES public.heroes(id) ON DELETE CASCADE,
  item_id uuid NOT NULL,
  category text NOT NULL CHECK (category IN ('face','hair','eyes','top','bottom','shoes','accessory','effect')),
  equipped boolean NOT NULL DEFAULT false,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (hero_id, item_id),
  CONSTRAINT hero_inventory_item_category_fkey FOREIGN KEY (item_id, category) REFERENCES public.avatar_items(id, category) ON DELETE CASCADE
);
CREATE UNIQUE INDEX hero_inventory_one_equipped_per_category ON public.hero_inventory (hero_id, category) WHERE equipped;
GRANT SELECT, UPDATE ON public.hero_inventory TO authenticated;
GRANT ALL ON public.hero_inventory TO service_role;
ALTER TABLE public.hero_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inventario propio visible" ON public.hero_inventory FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));
CREATE POLICY "docente ve inventario" ON public.hero_inventory FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND public.docente_de_estudiante(auth.uid(), h.profile_id)));
CREATE POLICY "equipar inventario propio" ON public.hero_inventory FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public.heroes h WHERE h.id = hero_id AND h.profile_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.set_hero_inventory_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_hero_inventory_updated_at BEFORE UPDATE ON public.hero_inventory FOR EACH ROW EXECUTE FUNCTION public.set_hero_inventory_updated_at();

CREATE OR REPLACE FUNCTION public.equip_avatar_item()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.equipped AND NOT OLD.equipped THEN
    UPDATE public.hero_inventory
    SET equipped = false
    WHERE hero_id = NEW.hero_id
      AND category = NEW.category
      AND id <> NEW.id
      AND equipped = true;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.equip_avatar_item() FROM PUBLIC;
CREATE TRIGGER equip_one_avatar_item BEFORE UPDATE OF equipped ON public.hero_inventory FOR EACH ROW EXECUTE FUNCTION public.equip_avatar_item();

INSERT INTO public.avatar_items (id, code, name, category, description, asset, rarity, unlock_condition, is_starter, sort_order) VALUES
  ('a1000000-0000-4000-8000-000000000001','face_01','Rostro del Explorador','face','Un rostro sereno para comenzar toda investigación.','face_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000002','hair_01','Cabello del Aprendiz','hair','Un corte práctico para recorrer archivos y senderos.','hair_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000003','eyes_01','Mirada Atenta','eyes','Ojos entrenados para no perder ningún detalle.','eyes_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000004','top_01','Camisa de Campo','top','Una camisa resistente para la primera expedición.','top_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000005','bottom_01','Pantalón de Ruta','bottom','Prenda cómoda para seguir cualquier pista.','bottom_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000006','shoes_01','Botas de Sendero','shoes','Botas firmes para avanzar por lugares olvidados.','shoes_01','comun','Disponible desde el inicio.',true,1),
  ('a1000000-0000-4000-8000-000000000007','accessory_00','Sin accesorio','accessory','Deja visible el atuendo principal del héroe.','accessory_00','comun','Disponible desde el inicio.',true,0),
  ('a1000000-0000-4000-8000-000000000008','effect_00','Sin efecto','effect','Una presencia limpia, sin efecto especial.','effect_00','comun','Disponible desde el inicio.',true,0),
  ('a1000000-0000-4000-8000-000000000009','hair_02','Cabello de Cartógrafo','hair','Un estilo recogido para largas jornadas de exploración.','hair_02','comun','Disponible con el conjunto inicial.',true,2),
  ('a1000000-0000-4000-8000-000000000010','face_02','Rostro del Vigía','face','Expresión firme de quien observa antes de actuar.','face_02','rara','Alcanza el nivel 2.',false,2),
  ('a1000000-0000-4000-8000-000000000011','top_02','Abrigo del Archivista','top','Abrigo ceremonial con costuras doradas.','top_02','epica','Completa tres misiones.',false,2),
  ('a1000000-0000-4000-8000-000000000012','eyes_02','Mirada de Bruma','eyes','Un brillo extraño que atraviesa la niebla.','eyes_02','legendaria','Alcanza el nivel 8.',false,2),
  ('a1000000-0000-4000-8000-000000000013','effect_01','Aura de Tinta','effect','Trazos de tinta viva orbitan alrededor del héroe.','effect_01','mitica','Domina el Reino del Pensamiento Crítico.',false,2),
  ('a1000000-0000-4000-8000-000000000014','accessory_backpack_01','Mochila del Explorador','accessory','Una mochila preparada para los héroes que saben encontrar las pistas escondidas en los textos.','accessory_backpack_01','rara','Obtén la insignia Ojo de Águila al completar la primera misión del Bosque de las Palabras.',false,1);

CREATE OR REPLACE FUNCTION public.grant_starter_avatar_items()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.hero_inventory (hero_id, item_id, category, equipped)
  SELECT NEW.id, ai.id, ai.category,
    CASE
      WHEN ai.code IN ('face_01','hair_01','eyes_01','top_01','bottom_01','shoes_01','accessory_00','effect_00') THEN true
      ELSE false
    END
  FROM public.avatar_items ai
  WHERE ai.is_starter
  ON CONFLICT (hero_id, item_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.grant_starter_avatar_items() FROM PUBLIC;
CREATE TRIGGER grant_starter_avatar_items AFTER INSERT ON public.heroes FOR EACH ROW EXECUTE FUNCTION public.grant_starter_avatar_items();

INSERT INTO public.hero_inventory (hero_id, item_id, category, equipped)
SELECT h.id, ai.id, ai.category,
  CASE
    WHEN ai.code IN ('face_01','hair_01','eyes_01','top_01','bottom_01','shoes_01','accessory_00','effect_00')
      AND NOT EXISTS (SELECT 1 FROM public.hero_inventory existing WHERE existing.hero_id = h.id AND existing.category = ai.category AND existing.equipped)
    THEN true
    ELSE false
  END
FROM public.heroes h
CROSS JOIN public.avatar_items ai
WHERE ai.is_starter
ON CONFLICT (hero_id, item_id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.unlock_badge_avatar_reward()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  badge_code text;
BEGIN
  SELECT codigo INTO badge_code FROM public.insignias WHERE id = NEW.insignia_id;
  INSERT INTO public.hero_inventory (hero_id, item_id, category, equipped)
  SELECT NEW.hero_id, ai.id, ai.category, false
  FROM public.avatar_items ai
  WHERE ai.required_badge_code = badge_code
  ON CONFLICT (hero_id, item_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.unlock_badge_avatar_reward() FROM PUBLIC;
CREATE TRIGGER unlock_badge_avatar_reward AFTER INSERT ON public.hero_insignias FOR EACH ROW EXECUTE FUNCTION public.unlock_badge_avatar_reward();

UPDATE public.avatar_items SET required_badge_code = 'ojo_del_archivo' WHERE code = 'accessory_backpack_01';

INSERT INTO public.hero_inventory (hero_id, item_id, category, equipped)
SELECT hi.hero_id, ai.id, ai.category, false
FROM public.hero_insignias hi
JOIN public.insignias i ON i.id = hi.insignia_id AND i.codigo = 'ojo_del_archivo'
JOIN public.avatar_items ai ON ai.required_badge_code = i.codigo
ON CONFLICT (hero_id, item_id) DO NOTHING;