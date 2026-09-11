REVOKE UPDATE ON public.hero_inventory FROM authenticated;
GRANT UPDATE (equipped) ON public.hero_inventory TO authenticated;