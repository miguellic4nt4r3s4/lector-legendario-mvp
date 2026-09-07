
REVOKE EXECUTE ON FUNCTION public.es_docente(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.docente_de_estudiante(uuid, uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.es_docente(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.docente_de_estudiante(uuid, uuid) TO authenticated;
