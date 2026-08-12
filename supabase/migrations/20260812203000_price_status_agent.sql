ALTER TABLE public.apartments
  ADD COLUMN IF NOT EXISTS price_de text,
  ADD COLUMN IF NOT EXISTS price_en text,
  ADD COLUMN IF NOT EXISTS status_de text,
  ADD COLUMN IF NOT EXISTS status_en text;

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS agent_name text,
  ADD COLUMN IF NOT EXISTS agent_email text,
  ADD COLUMN IF NOT EXISTS agent_photo_url text;
