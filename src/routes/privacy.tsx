import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "../i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Datenschutz · Privacy — Zianat" },
      { name: "description", content: "How personal data is handled on this website." },
      { property: "og:title", content: "Privacy — Zianat" },
      { property: "og:description", content: "Privacy information for Zianat." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <h1 className="text-4xl md:text-5xl">{t.privacy.title}</h1>
      <div className="mt-10 flex flex-col gap-5">
        {t.privacy.body.map((p) => (
          <p key={p} className="text-sm leading-[1.9] text-muted-foreground">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}