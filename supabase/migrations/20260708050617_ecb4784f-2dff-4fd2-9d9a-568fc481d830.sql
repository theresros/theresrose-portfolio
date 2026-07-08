CREATE POLICY "Anyone can insert activities" ON public.daily_activities FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update activities" ON public.daily_activities FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete activities" ON public.daily_activities FOR DELETE TO anon, authenticated USING (true);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_activities TO anon, authenticated;