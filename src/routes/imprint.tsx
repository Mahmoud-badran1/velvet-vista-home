import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "../i18n";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Impressum · Imprint — Lange Gasse Collection" },
      {
        name: "description",
        content: "Imprint and disclosure for the Lange Gasse Collection, 1080 Vienna.",
      },
      { property: "og:title", content: "Imprint — Lange Gasse Collection" },
      { property: "og:description", content: "Legal disclosure, Lange Gasse Collection." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/imprint" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/imprint" }],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <h1 className="text-4xl md:text-5xl">{t.imprint.title}</h1>
      <div className="mt-10 flex flex-col gap-5">
        {t.imprint.body.map((p) => (
          <p key={p} className="text-sm leading-[1.9] text-muted-foreground">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}