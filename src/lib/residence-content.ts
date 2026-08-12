import { supabase } from "../integrations/supabase/client";
import { residences as staticResidences, type Residence } from "../data/residences";
import { getImage, type ImageKey } from "../components/images";

export type ResolvedResidence = Residence & { resolvedGallery: string[]; dbId: string | null };

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function defaultGallery(r: Residence): string[] {
  const keys: ImageKey[] = r.gallery?.length
    ? (r.gallery as ImageKey[])
    : ([
        r.image,
        ...(["salon", "terrace", "hero", "josefstadt"] as ImageKey[]).filter((k) => k !== r.image),
      ] as ImageKey[]);
  return keys.map((k) => getImage(k));
}

export async function loadResolvedResidences(): Promise<ResolvedResidence[]> {
  const [{ data: apartments }, { data: images }] = await Promise.all([
    supabase
      .from("apartments")
      .select("id, slug, name_de, name_en, description_de, description_en"),
    supabase
      .from("apartment_images")
      .select("apartment_id, image_url, display_order")
      .order("display_order", { ascending: true }),
  ]);

  const bySlug = new Map((apartments ?? []).map((a) => [a.slug, a]));
  const imagesByApartment = new Map<string, string[]>();
  for (const img of images ?? []) {
    const list = imagesByApartment.get(img.apartment_id) ?? [];
    list.push(img.image_url);
    imagesByApartment.set(img.apartment_id, list);
  }

  return staticResidences.map((r) => {
    const dbRow = bySlug.get(r.slug);
    const dbGallery = dbRow ? imagesByApartment.get(dbRow.id) : undefined;
    return {
      ...r,
      name: {
        de: dbRow?.name_de || r.name.de,
        en: dbRow?.name_en || r.name.en,
      },
      description: {
        de: dbRow?.description_de ? splitParagraphs(dbRow.description_de) : r.description.de,
        en: dbRow?.description_en ? splitParagraphs(dbRow.description_en) : r.description.en,
      },
      resolvedGallery: dbGallery && dbGallery.length ? dbGallery : defaultGallery(r),
      dbId: dbRow?.id ?? null,
    };
  });
}

export function getResolvedResidence(list: ResolvedResidence[], slug: string) {
  return list.find((r) => r.slug === slug);
}
