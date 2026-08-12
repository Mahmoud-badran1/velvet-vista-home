import { createContext, useContext } from "react";
import { supabase } from "../integrations/supabase/client";

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string;
  filmUrl: string | null;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contactEmail: "office@langegasse-collection.at",
  contactPhone: "+43 1 555 0000",
  filmUrl: null,
};

export async function loadSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return {
    contactEmail: data?.contact_email || DEFAULT_SITE_SETTINGS.contactEmail,
    contactPhone: data?.contact_phone || DEFAULT_SITE_SETTINGS.contactPhone,
    filmUrl: data?.film_url || null,
  };
}

export const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
