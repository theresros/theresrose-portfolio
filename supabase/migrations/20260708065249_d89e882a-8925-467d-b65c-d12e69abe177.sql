GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_activities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_activities TO authenticated;
GRANT ALL ON public.daily_activities TO service_role;