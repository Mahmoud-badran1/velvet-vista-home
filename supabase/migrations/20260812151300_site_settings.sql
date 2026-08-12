CREATE TABLE IF NOT EXISTS public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  contact_email text,
  contact_phone text,
  film_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are publicly readable" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can insert site settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (id, contact_email, contact_phone, film_url)
VALUES (1, 'office@langegasse-collection.at', '+43 1 555 0000', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read of site media files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');
CREATE POLICY "Authenticated upload of site media files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media');
CREATE POLICY "Authenticated update of site media files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-media') WITH CHECK (bucket_id = 'site-media');
CREATE POLICY "Authenticated delete of site media files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media');
