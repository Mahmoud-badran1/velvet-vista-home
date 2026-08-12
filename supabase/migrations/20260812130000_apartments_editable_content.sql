ALTER TABLE public.apartments
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS name_de text,
  ADD COLUMN IF NOT EXISTS name_en text,
  ADD COLUMN IF NOT EXISTS description_de text,
  ADD COLUMN IF NOT EXISTS description_en text,
  ALTER COLUMN title DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS apartments_slug_key ON public.apartments (slug);
