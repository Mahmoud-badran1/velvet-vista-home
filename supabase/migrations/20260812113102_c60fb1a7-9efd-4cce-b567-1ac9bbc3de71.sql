CREATE TABLE public.apartments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric,
  location text,
  address text,
  bedrooms integer,
  bathrooms integer,
  area numeric,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.apartments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.apartments TO authenticated;
GRANT ALL ON public.apartments TO service_role;

ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apartments are publicly readable" ON public.apartments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can insert apartments" ON public.apartments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update apartments" ON public.apartments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete apartments" ON public.apartments FOR DELETE TO authenticated USING (true);

CREATE TABLE public.apartment_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apartment_id uuid NOT NULL REFERENCES public.apartments(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  storage_path text,
  display_order integer NOT NULL DEFAULT 0,
  is_cover boolean NOT NULL DEFAULT false,
  alt_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX apartment_images_apartment_id_idx ON public.apartment_images (apartment_id, display_order);

GRANT SELECT ON public.apartment_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.apartment_images TO authenticated;
GRANT ALL ON public.apartment_images TO service_role;

ALTER TABLE public.apartment_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apartment images are publicly readable" ON public.apartment_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can insert apartment images" ON public.apartment_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update apartment images" ON public.apartment_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete apartment images" ON public.apartment_images FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_apartments_updated_at
BEFORE UPDATE ON public.apartments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Public read of apartment image files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'apartment-images');
CREATE POLICY "Authenticated upload of apartment image files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'apartment-images');
CREATE POLICY "Authenticated update of apartment image files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'apartment-images') WITH CHECK (bucket_id = 'apartment-images');
CREATE POLICY "Authenticated delete of apartment image files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'apartment-images');