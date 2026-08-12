import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "../../integrations/supabase/client";
import { useAdminSession } from "../../lib/admin-auth";
import { AdminSection } from "../../components/admin/AdminSection";
import { compressImage } from "../../lib/image-compression";
import { mapWithConcurrency } from "../../lib/concurrency";
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
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
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
    setMessage(error ? `خطأ: ${error.message}` : "تم الحفظ بنجاح.");
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setUploading(true);
    setMessage(null);
    setUploadProgress({ done: 0, total: fileArray.length });

    const startOrder = images.length ? Math.max(...images.map((i) => i.display_order)) + 1 : 0;
    let doneCount = 0;

    type UploadOk = {
      ok: true;
      apartment_id: string;
      image_url: string;
      storage_path: string;
      display_order: number;
      is_cover: boolean;
    };
    type UploadResult = UploadOk | { ok: false; error: string };

    const results = await mapWithConcurrency<File, UploadResult>(fileArray, 4, async (file, i) => {
      const { blob, contentType } = await compressImage(file);
      const ext = contentType === "image/jpeg" ? "jpg" : (file.name.split(".").pop() ?? "jpg");
      const path = `${apartment.slug}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("apartment-images")
        .upload(path, blob, { contentType });
      doneCount += 1;
      setUploadProgress({ done: doneCount, total: fileArray.length });
      if (uploadError) return { ok: false, error: uploadError.message };
      const { data: publicUrl } = supabase.storage.from("apartment-images").getPublicUrl(path);
      return {
        ok: true,
        apartment_id: apartment.id,
        image_url: publicUrl.publicUrl,
        storage_path: path,
        display_order: startOrder + i,
        is_cover: images.length === 0 && startOrder + i === 0,
      };
    });

    const succeeded = results.filter((r): r is UploadOk => r.ok);
    const failedCount = results.length - succeeded.length;

    if (succeeded.length) {
      const { data: inserted, error: insertError } = await supabase
        .from("apartment_images")
        .insert(succeeded.map(({ ok: _ok, ...row }) => row))
        .select("*");
      if (insertError) {
        setMessage(`خطأ: ${insertError.message}`);
      } else if (inserted) {
        setImages((prev) =>
          [...prev, ...inserted].sort((a, b) => a.display_order - b.display_order),
        );
      }
    }
    if (failedCount > 0) {
      setMessage(`فشل رفع ${failedCount} من ${fileArray.length} صورة.`);
    }

    setUploadProgress(null);
    setUploading(false);
  }

  async function handleDelete(image: ApartmentImage) {
    if (!confirm("هل تريد بالتأكيد حذف هذه الصورة؟")) return;
    const { error } = await supabase.from("apartment_images").delete().eq("id", image.id);
    if (error) {
      setMessage(`خطأ: ${error.message}`);
      return;
    }
    if (image.storage_path) {
      await supabase.storage.from("apartment-images").remove([image.storage_path]);
    }
    setImages((prev) => prev.filter((i) => i.id !== image.id));
  }

  async function persistOrder(reordered: ApartmentImage[]) {
    const withOrder = reordered.map((img, i) => ({ ...img, display_order: i, is_cover: i === 0 }));
    setImages(withOrder);
    const { error } = await supabase.from("apartment_images").upsert(withOrder);
    if (error) setMessage(`خطأ: ${error.message}`);
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved!);
    void persistOrder(next);
  }

  function handleMoveToFront(index: number) {
    if (index === 0) return;
    const next = [...images];
    const [moved] = next.splice(index, 1);
    next.unshift(moved!);
    void persistOrder(next);
  }

  function handleDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      return;
    }
    const next = [...images];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved!);
    setDragIndex(null);
    void persistOrder(next);
  }

  return (
    <div dir="rtl" className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/lgc-manage-8673cd970652f87a"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        → العودة إلى القائمة
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{apartment.name_de || apartment.slug}</h1>

      {status === "loading" && (
        <p className="mt-4 text-sm text-muted-foreground">جارٍ تسجيل الدخول…</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">خطأ في تسجيل الدخول: {authError}</p>
      )}

      <div className="mt-8 grid gap-6">
        <AdminSection number={1} title="الاسم">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الاسم (ألماني)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={nameDe}
                onChange={(e) => setNameDe(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الاسم (إنجليزي)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </label>
          </div>
        </AdminSection>

        <AdminSection number={2} title="الوصف" hint="افصل بين الفقرات بسطر فارغ.">
          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الوصف (ألماني)</span>
              <textarea
                dir="ltr"
                className="min-h-[200px] rounded border border-border bg-transparent px-3 py-2"
                value={descDe}
                onChange={(e) => setDescDe(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الوصف (إنجليزي)</span>
              <textarea
                dir="ltr"
                className="min-h-[200px] rounded border border-border bg-transparent px-3 py-2"
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
              />
            </label>
          </div>
        </AdminSection>

        <button
          type="button"
          onClick={handleSave}
          disabled={!ready || saving}
          className="w-fit rounded bg-foreground px-6 py-2.5 text-sm font-medium text-background disabled:opacity-50"
        >
          {saving ? "جارٍ الحفظ…" : "حفظ الاسم والوصف"}
        </button>
        {message && <p className="text-sm">{message}</p>}

        <AdminSection
          number={3}
          title="الصور"
          hint="اسحب أي صورة وأفلتها في المكان الذي تريده لإعادة الترتيب، أو استخدم الأزرار. الصورة الأولى (الغلاف) هي التي تظهر في الصفحة الرئيسية."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((img, i) => (
              <div
                key={img.id}
                draggable={ready}
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => setDragIndex(null)}
                className={`group relative overflow-hidden rounded border border-border ${
                  ready ? "cursor-grab active:cursor-grabbing" : ""
                } ${dragIndex === i ? "opacity-40" : ""}`}
              >
                <img
                  src={img.image_url}
                  alt=""
                  draggable={false}
                  className="h-32 w-full select-none object-cover"
                />
                {i === 0 && (
                  <span className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                    صورة الغلاف
                  </span>
                )}
                <div className="flex flex-wrap items-center justify-between gap-1 bg-background/80 p-1">
                  <button
                    type="button"
                    onClick={() => handleMove(i, -1)}
                    disabled={!ready || i === 0}
                    className="rounded px-1.5 py-0.5 text-xs disabled:opacity-30"
                    aria-label="نقل للأعلى"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(i, 1)}
                    disabled={!ready || i === images.length - 1}
                    className="rounded px-1.5 py-0.5 text-xs disabled:opacity-30"
                    aria-label="نقل للأسفل"
                  >
                    ↓
                  </button>
                  {i !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveToFront(i)}
                      disabled={!ready}
                      className="rounded px-1.5 py-0.5 text-xs disabled:opacity-30"
                    >
                      اجعلها الأولى
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(img)}
                    disabled={!ready}
                    className="rounded px-1.5 py-0.5 text-xs text-red-600 disabled:opacity-30"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          <label className="mt-6 block w-fit cursor-pointer rounded border border-dashed border-border px-4 py-3 text-sm">
            {uploading
              ? `جارٍ الرفع… (${uploadProgress?.done ?? 0} / ${uploadProgress?.total ?? 0})`
              : "+ إضافة صور"}
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
        </AdminSection>
      </div>
    </div>
  );
}
