CREATE TABLE public.daily_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_date DATE NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  created_by TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX daily_activities_date_idx ON public.daily_activities (activity_date DESC);

GRANT SELECT ON public.daily_activities TO anon, authenticated;
GRANT ALL ON public.daily_activities TO service_role;

ALTER TABLE public.daily_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activities"
  ON public.daily_activities FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_daily_activities_updated_at
  BEFORE UPDATE ON public.daily_activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();