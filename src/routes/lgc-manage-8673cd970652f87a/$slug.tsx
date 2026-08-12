import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "../../integrations/supabase/client";
import { useAdminSession } from "../../lib/admin-auth";
import type { Tables } from "../../integrations/supabase/types";

type Apartment = Tables<"apartments">;
type ApartmentImage = Tables<"apartment_images">;

export const Route = createFileRoute("/lgc-manage-8673cd970652f87a/$slug")({
  head: () => ({
    meta: [{ title: "Wohnung bearbeiten" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  loader: async ({ params }) => {
    const { data: apartment } = await supabase
      .from("apartments")
      .select("*")
      .eq("slug", params.slug)
      .maybeSingle();
    if (!apartment) throw notFound();
    const { data: images } = await supabase
      .from("apartment_images")
      .select("*")
      .eq("apartment_id", apartment.id)
      .order("display_order", { ascending: true });
    return { apartment, images: images ?? [] };
  },
  component: EditResidence,
});

function EditResidence() {
  const { apartment, images: initialImages } = Route.useLoaderData() as {
    apartment: Apartment;
    images: ApartmentImage[];
  };
  const { status, error: authError } = useAdminSession();

  const [nameDe, setNameDe] = useState(apartment.name_de ?? "");
  const [nameEn, setNameEn] = useState(apartment.name_en ?? "");
  const [descDe, setDescDe] = useState(apartment.description_de ?? "");
  const [descEn, setDescEn] = useState(apartment.description_en ?? "");
  const [images, setImages] = useState<ApartmentImage[]>(initialImages);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const ready = status === "ready";

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const { error } = await supabase
      .from("apartments")
      .update({ name_de: nameDe, name_en: nameEn, description_de: descDe, description_en: descEn })
      .eq("id", apartment.id);
    setSaving(false);
    setMessage(error ? `Fehler: ${error.message}` : "Gespeichert.");
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage(null);
    let nextOrder = images.length ? Math.max(...images.map((i) => i.display_order)) + 1 : 0;
    for (const file of Array.from(files)) {
      const path = `${apartment.slug}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("apartment-images")
        .upload(path, file);
      if (uploadError) {
        setMessage(`Fehler beim Hochladen: ${uploadError.message}`);
        continue;
      }
      const { data: publicUrl } = supabase.storage.from("apartment-images").getPublicUrl(path);
      const { data: inserted, error: insertError } = await supabase
        .from("apartment_images")
        .insert({
          apartment_id: apartment.id,
          image_url: publicUrl.publicUrl,
          storage_path: path,
          display_order: nextOrder,
          is_cover: images.length === 0 && nextOrder === 0,
        })
        .select("*")
        .single();
      if (insertError) {
        setMessage(`Fehler: ${insertError.message}`);
        continue;
      }
      setImages((prev) => [...prev, inserted]);
      nextOrder += 1;
    }
    setUploading(false);
  }

  async function handleDelete(image: ApartmentImage) {
    if (!confirm("Dieses Foto wirklich löschen?")) return;
    const { error } = await supabase.from("apartment_images").delete().eq("id", image.id);
    if (error) {
      setMessage(`Fehler: ${error.message}`);
      return;
    }
    if (image.storage_path) {
      await supabase.storage.from("apartment-images").remove([image.storage_path]);
    }
    setImages((prev) => prev.filter((i) => i.id !== image.id));
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const a = images[index]!;
    const b = images[target]!;
    const [orderA, orderB] = [a.display_order, b.display_order];
    const { error } = await supabase
      .from("apartment_images")
      .upsert([
        { ...a, display_order: orderB },
        { ...b, display_order: orderA },
      ]);
    if (error) {
      setMessage(`Fehler: ${error.message}`);
      return;
    }
    const next = [...images];
    next[index] = { ...b, display_order: orderA };
    next[target] = { ...a, display_order: orderB };
    next.sort((x, y) => x.display_order - y.display_order);
    setImages(next);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/lgc-manage-8673cd970652f87a"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Zurück zur Übersicht
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{apartment.name_de || apartment.slug}</h1>

      {status === "loading" && (
        <p className="mt-4 text-sm text-muted-foreground">Anmeldung läuft…</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">Anmeldefehler: {authError}</p>
      )}

      <div className="mt-8 grid gap-6">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Name (Deutsch)</span>
          <input
            className="rounded border border-border bg-transparent px-3 py-2"
            value={nameDe}
            onChange={(e) => setNameDe(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Name (Englisch)</span>
          <input
            className="rounded border border-border bg-transparent px-3 py-2"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Beschreibung (Deutsch)</span>
          <span className="text-xs text-muted-foreground">
            Absätze durch eine Leerzeile trennen.
          </span>
          <textarea
            className="min-h-[220px] rounded border border-border bg-transparent px-3 py-2"
            value={descDe}
            onChange={(e) => setDescDe(e.target.value)}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Beschreibung (Englisch)</span>
          <span className="text-xs text-muted-foreground">Separate paragraphs with a blank line.</span>
          <textarea
            className="min-h-[220px] rounded border border-border bg-transparent px-3 py-2"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          disabled={!ready || saving}
          className="w-fit rounded bg-foreground px-5 py-2 text-sm text-background disabled:opacity-50"
        >
          {saving ? "Speichert…" : "Speichern"}
        </button>
        {message && <p className="text-sm">{message}</p>}
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-medium">Fotos</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img, i) => (
            <div key={img.id} className="group relative overflow-hidden rounded border border-border">
              <img src={img.image_url} alt="" className="h-32 w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  Titelbild
                </span>
              )}
              <div className="flex items-center justify-between gap-1 bg-background/80 p-1">
                <button
                  type="button"
                  onClick={() => handleMove(i, -1)}
                  disabled={!ready || i === 0}
                  className="rounded px-1.5 py-0.5 text-xs disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(i, 1)}
                  disabled={!ready || i === images.length - 1}
                  className="rounded px-1.5 py-0.5 text-xs disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(img)}
                  disabled={!ready}
                  className="rounded px-1.5 py-0.5 text-xs text-red-600 disabled:opacity-30"
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>

        <label className="mt-6 block w-fit cursor-pointer rounded border border-dashed border-border px-4 py-3 text-sm">
          {uploading ? "Lädt hoch…" : "+ Fotos hinzufügen"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={!ready || uploading}
            onChange={(e) => {
              void handleUpload(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}
