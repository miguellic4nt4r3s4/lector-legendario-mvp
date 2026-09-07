
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _curso uuid;
  _rol public.rol_usuario;
BEGIN
  _rol := COALESCE((NEW.raw_user_meta_data->>'rol')::public.rol_usuario, 'estudiante');
  SELECT id INTO _curso FROM public.cursos WHERE codigo = COALESCE(NEW.raw_user_meta_data->>'curso_codigo','6A') LIMIT 1;

  INSERT INTO public.profiles (id, nombre, rol, curso_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email,'@',1)),
    _rol,
    CASE WHEN _rol = 'estudiante' THEN _curso ELSE NULL END
  )
  ON CONFLICT (id) DO NOTHING;

  IF _rol = 'docente' AND _curso IS NOT NULL THEN
    UPDATE public.cursos SET docente_id = NEW.id WHERE id = _curso;
  END IF;

  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
