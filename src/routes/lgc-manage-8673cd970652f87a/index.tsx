import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "../../integrations/supabase/client";
import { useAdminSession } from "../../lib/admin-auth";
import { AdminSection } from "../../components/admin/AdminSection";
import { loadResolvedResidences, type ResolvedResidence } from "../../lib/residence-content";
import { loadSiteSettings, type SiteSettings } from "../../lib/site-settings";

export const Route = createFileRoute("/lgc-manage-8673cd970652f87a/")({
  head: () => ({
    meta: [{ title: "الإدارة" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  loader: async () => {
    const [residences, siteSettings] = await Promise.all([
      loadResolvedResidences(),
      loadSiteSettings(),
    ]);
    return { residences, siteSettings };
  },
  component: AdminIndex,
});

function AdminIndex() {
  const { residences, siteSettings } = Route.useLoaderData() as {
    residences: ResolvedResidence[];
    siteSettings: SiteSettings;
  };
  const { status, error } = useAdminSession();
  const ready = status === "ready";

  const [email, setEmail] = useState(siteSettings.contactEmail);
  const [phone, setPhone] = useState(siteSettings.contactPhone ?? "");
  const [filmUrl, setFilmUrl] = useState(siteSettings.filmUrl ?? "");
  const [agentName, setAgentName] = useState(siteSettings.agentName ?? "");
  const [agentEmail, setAgentEmail] = useState(siteSettings.agentEmail ?? "");
  const [agentPhotoUrl, setAgentPhotoUrl] = useState(siteSettings.agentPhotoUrl ?? "");
  const [architecturePhotoUrl, setArchitecturePhotoUrl] = useState(
    siteSettings.architecturePhotoUrl ?? "",
  );
  const [savingSettings, setSavingSettings] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingArchitecturePhoto, setUploadingArchitecturePhoto] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);

  async function handleSaveSettings() {
    setSavingSettings(true);
    setSettingsMessage(null);
    const { error: saveError } = await supabase.from("site_settings").upsert({
      id: 1,
      contact_email: email,
      contact_phone: phone || null,
      film_url: filmUrl || null,
      agent_name: agentName || null,
      agent_email: agentEmail || null,
      agent_photo_url: agentPhotoUrl || null,
      architecture_photo_url: architecturePhotoUrl || null,
    });
    setSavingSettings(false);
    setSettingsMessage(saveError ? `خطأ: ${saveError.message}` : "تم الحفظ بنجاح.");
  }

  async function handleUploadVideo(file: File | null) {
    if (!file) return;
    setUploadingVideo(true);
    setSettingsMessage(null);
    const path = `film/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file);
    if (uploadError) {
      setSettingsMessage(`خطأ أثناء الرفع: ${uploadError.message}`);
      setUploadingVideo(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("site-media").getPublicUrl(path);
    setFilmUrl(publicUrl.publicUrl);
    setUploadingVideo(false);
  }

  async function handleUploadAgentPhoto(file: File | null) {
    if (!file) return;
    setUploadingPhoto(true);
    setSettingsMessage(null);
    const path = `agent/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file);
    if (uploadError) {
      setSettingsMessage(`خطأ أثناء الرفع: ${uploadError.message}`);
      setUploadingPhoto(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("site-media").getPublicUrl(path);
    setAgentPhotoUrl(publicUrl.publicUrl);
    setUploadingPhoto(false);
  }

  async function handleUploadArchitecturePhoto(file: File | null) {
    if (!file) return;
    setUploadingArchitecturePhoto(true);
    setSettingsMessage(null);
    const path = `homepage/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file);
    if (uploadError) {
      setSettingsMessage(`خطأ أثناء الرفع: ${uploadError.message}`);
      setUploadingArchitecturePhoto(false);
      return;
    }
    const { data: publicUrl } = supabase.storage.from("site-media").getPublicUrl(path);
    setArchitecturePhotoUrl(publicUrl.publicUrl);
    setUploadingArchitecturePhoto(false);
  }

  return (
    <div dir="rtl" className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold">لوحة الإدارة</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        تعديل بيانات العقارات الأربعة، معلومات التواصل، وفيديو الموقع.
      </p>

      {status === "loading" && (
        <p className="mt-6 text-sm text-muted-foreground">جارٍ تسجيل الدخول…</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-red-600">خطأ في تسجيل الدخول: {error}</p>
      )}

      <div className="mt-10 grid gap-6">
        <AdminSection number={1} title="معلومات التواصل والفيديو" hint="تظهر هذه البيانات في كل صفحات الموقع.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">البريد الإلكتروني</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">رقم الهاتف</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-1.5 text-sm">
            <span className="font-medium">رابط فيديو صفحة "Der Film"</span>
            <input
              dir="ltr"
              placeholder="https://…"
              className="rounded border border-border bg-transparent px-3 py-2"
              value={filmUrl}
              onChange={(e) => setFilmUrl(e.target.value)}
            />
            <div className="mt-1 flex items-center gap-3">
              <label className="block w-fit cursor-pointer rounded border border-dashed border-border px-4 py-2 text-xs">
                {uploadingVideo ? "جارٍ الرفع…" : "أو ارفع ملف فيديو"}
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  disabled={!ready || uploadingVideo}
                  onChange={(e) => {
                    void handleUploadVideo(e.target.files?.[0] ?? null);
                    e.target.value = "";
                  }}
                />
              </label>
              {filmUrl && (
                <button
                  type="button"
                  onClick={() => setFilmUrl("")}
                  className="text-xs text-red-600"
                >
                  إزالة الفيديو (رجوع للفيديو الافتراضي)
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={!ready || savingSettings}
            className="mt-5 w-fit rounded bg-foreground px-6 py-2.5 text-sm font-medium text-background disabled:opacity-50"
          >
            {savingSettings ? "جارٍ الحفظ…" : "حفظ"}
          </button>
          {settingsMessage && <p className="mt-2 text-sm">{settingsMessage}</p>}
        </AdminSection>

        <AdminSection
          number={2}
          title="بطاقة التواصل (الوكيل)"
          hint="تظهر أسفل كل صفحة عقار."
        >
          <div className="flex items-start gap-5">
            {agentPhotoUrl ? (
              <img
                src={agentPhotoUrl}
                alt=""
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                بدون صورة
              </div>
            )}
            <label className="block w-fit cursor-pointer self-center rounded border border-dashed border-border px-4 py-2 text-xs">
              {uploadingPhoto ? "جارٍ الرفع…" : "ارفع صورة"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!ready || uploadingPhoto}
                onChange={(e) => {
                  void handleUploadAgentPhoto(e.target.files?.[0] ?? null);
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">الاسم</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium">البريد الإلكتروني</span>
              <input
                dir="ltr"
                className="rounded border border-border bg-transparent px-3 py-2"
                value={agentEmail}
                onChange={(e) => setAgentEmail(e.target.value)}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={!ready || savingSettings}
            className="mt-5 w-fit rounded bg-foreground px-6 py-2.5 text-sm font-medium text-background disabled:opacity-50"
          >
            {savingSettings ? "جارٍ الحفظ…" : "حفظ"}
          </button>
          {settingsMessage && <p className="mt-2 text-sm">{settingsMessage}</p>}
        </AdminSection>

        <AdminSection
          number={3}
          title="صور الصفحة الرئيسية"
          hint='صورة قسم "العمارة" بالصفحة الرئيسية.'
        >
          <div className="flex items-start gap-5">
            {architecturePhotoUrl ? (
              <img
                src={architecturePhotoUrl}
                alt=""
                className="h-24 w-36 shrink-0 rounded object-cover"
              />
            ) : (
              <div className="flex h-24 w-36 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                الصورة الافتراضية
              </div>
            )}
            <div className="flex flex-col items-start gap-2">
              <label className="block w-fit cursor-pointer rounded border border-dashed border-border px-4 py-2 text-xs">
                {uploadingArchitecturePhoto ? "جارٍ الرفع…" : "ارفع صورة"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={!ready || uploadingArchitecturePhoto}
                  onChange={(e) => {
                    void handleUploadArchitecturePhoto(e.target.files?.[0] ?? null);
                    e.target.value = "";
                  }}
                />
              </label>
              {architecturePhotoUrl && (
                <button
                  type="button"
                  onClick={() => setArchitecturePhotoUrl("")}
                  className="text-xs text-red-600"
                >
                  إزالة الصورة (رجوع للصورة الافتراضية)
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={!ready || savingSettings}
            className="mt-5 w-fit rounded bg-foreground px-6 py-2.5 text-sm font-medium text-background disabled:opacity-50"
          >
            {savingSettings ? "جارٍ الحفظ…" : "حفظ"}
          </button>
          {settingsMessage && <p className="mt-2 text-sm">{settingsMessage}</p>}
        </AdminSection>

        <AdminSection number={4} title="العقارات الأربعة" hint="اضغط على أي عقار لتعديل الاسم والوصف والصور.">
          <div className="grid gap-6 sm:grid-cols-2">
            {residences.map((r) => (
              <Link
                key={r.slug}
                to="/lgc-manage-8673cd970652f87a/$slug"
                params={{ slug: r.slug }}
                className="group block overflow-hidden rounded-lg border border-border"
              >
                <img
                  src={r.resolvedGallery[0]}
                  alt={r.name.de}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-medium">{r.name.de}</p>
                  <p className="text-sm text-muted-foreground">{r.name.en}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {r.resolvedGallery.length} صور
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
