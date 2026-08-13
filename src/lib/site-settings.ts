import { createContext, useContext } from "react";
import { supabase } from "../integrations/supabase/client";

export type SiteSettings = {
  contactEmail: string;
  contactPhone: string | null;
  filmUrl: string | null;
  agentName: string | null;
  agentEmail: string | null;
  agentPhotoUrl: string | null;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contactEmail: "m.alzayanat@remax-smart.at",
  contactPhone: null,
  filmUrl: null,
  agentName: null,
  agentEmail: null,
  agentPhotoUrl: null,
};

export async function loadSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return {
    contactEmail: data?.contact_email || DEFAULT_SITE_SETTINGS.contactEmail,
    contactPhone: data?.contact_phone || null,
    filmUrl: data?.film_url || null,
    agentName: data?.agent_name || null,
    agentEmail: data?.agent_email || null,
    agentPhotoUrl: data?.agent_photo_url || null,
  };
}

export const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
