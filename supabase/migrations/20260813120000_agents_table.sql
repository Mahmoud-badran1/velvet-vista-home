CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  photo_url text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.agents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agents TO authenticated;
GRANT ALL ON public.agents TO service_role;

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents are publicly readable" ON public.agents FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can insert agents" ON public.agents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update agents" ON public.agents FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete agents" ON public.agents FOR DELETE TO authenticated USING (true);

INSERT INTO public.agents (name, email, photo_url, display_order)
SELECT agent_name, agent_email, agent_photo_url, 0
FROM public.site_settings
WHERE id = 1 AND agent_name IS NOT NULL;

ALTER TABLE public.site_settings
  DROP COLUMN IF EXISTS agent_name,
  DROP COLUMN IF EXISTS agent_email,
  DROP COLUMN IF EXISTS agent_photo_url;
