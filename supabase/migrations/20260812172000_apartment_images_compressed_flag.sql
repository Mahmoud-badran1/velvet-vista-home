ALTER TABLE public.apartment_images ADD COLUMN IF NOT EXISTS is_compressed boolean NOT NULL DEFAULT false;
