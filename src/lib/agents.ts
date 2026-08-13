import { supabase } from "../integrations/supabase/client";

export type Agent = {
  id: string;
  name: string;
  email: string | null;
  photoUrl: string | null;
};

export async function loadAgents(): Promise<Agent[]> {
  const { data } = await supabase
    .from("agents")
    .select("*")
    .order("display_order", { ascending: true });
  return (data ?? []).map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    photoUrl: a.photo_url,
  }));
}
