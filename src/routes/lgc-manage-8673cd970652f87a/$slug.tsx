import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "../../integrations/supabase/client";
import { useAdminSession } from "../../lib/admin-auth";
import { AdminSection } from "../../components/admin/AdminSection";
import type { Tables } from "../../integrations/supabase/types";

type Apartment = Tables<"apartments">;

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
    const { count } = await supabase
      .from("apartment_images")
      .select("id", { count: "exact", head: true })
      .eq("apartment_id", apartment.id);
    return { apartment, imageCount: count ?? 0 };
  },
  component: EditResidence,
});

function EditResidence() {
  const { apartment, imageCount } = Route.useLoaderData() as {
    apartment: Apartment;
    imageCount: number;
  };
  const { status, error: authError } = useAdminSession();

  const [nameDe, setNameDe] = useState(apartment.name_de ?? "");
  const [nameEn, setNameEn] = useState(apartment.name_en ?? "");
  const [descDe, setDescDe] = useState(apartment.description_de ?? "");
  const [descEn, setDescEn] = useState(apartment.description_en ?? "");
  const [priceDe, setPriceDe] = useState(apartment.price_de ?? "");
  const [priceEn, setPriceEn] = useState(apartment.price_en ?? "");
  const [statusDe, setStatusDe] = useState(apartment.status_de ?? "");
  const [statusEn, setStatusEn] = useState(apartment.status_en ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const ready = status === "ready";

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const { error } = await supabase
      .from("apartments")
      .update({
        name_de: nameDe,
        name_en: nameEn,
        description_de: descDe,
        description_en: descEn,
        price_de: priceDe,
        price_en: priceEn,
        status_de: statusDe,
        status_en: statusEn,
      })
      .eq("id", apartment.id);
    setSaving(false);
    setMessage(error ? `خطأ: ${error.message}` : "تم الحفظ بنجاح.");
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

        <AdminSection number={3} title="السعر والحالة">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">السعر (ألماني)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={priceDe}
                onChange={(e) => setPriceDe(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">السعر (إنجليزي)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={priceEn}
                onChange={(e) => setPriceEn(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الحالة (ألماني)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={statusDe}
                onChange={(e) => setStatusDe(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الحالة (إنجليزي)</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={statusEn}
                onChange={(e) => setStatusEn(e.target.value)}
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
          {saving ? "جارٍ الحفظ…" : "حفظ"}
        </button>
        {message && <p className="text-sm">{message}</p>}

        <AdminSection number={4} title="الصور" hint="إدارة الصور أصبحت في صفحة منفصلة لتخفيف التحميل.">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{imageCount} صورة حاليًا</p>
            <Link
              to="/lgc-manage-8673cd970652f87a/$slug/photos"
              params={{ slug: apartment.slug! }}
              className="rounded bg-foreground px-5 py-2 text-sm font-medium text-background"
            >
              إدارة الصور →
            </Link>
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
