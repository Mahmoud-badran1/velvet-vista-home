import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { images } from "../components/images";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/neighborhood")({
  head: () => ({
    meta: [
      { title: "Josefstadt — Lange Gasse Collection" },
      {
        name: "description",
        content:
          "Living in Vienna's Josefstadt: theatre, coffee houses, schools and the city centre within walking distance.",
      },
      { property: "og:title", content: "Josefstadt — Lange Gasse Collection" },
      {
        property: "og:description",
        content: "Vienna's smallest district, and one of its most sought after.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/neighborhood" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/neighborhood" }],
  }),
  component: NeighborhoodPage,
});

function NeighborhoodPage() {
  const { t } = useI18n();

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-24 lg:px-16 lg:py-32">
          <p className="eyebrow text-accent">{t.neighborhood.eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">{t.neighborhood.title}</h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.neighborhood.lead}
          </p>
        </div>
        <img
          src={images.josefstadt}
          alt="Josefstadt"
          loading="lazy"
          width={1600}
          height={1072}
          className="h-full min-h-[320px] w-full object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-14 px-6 py-24 md:grid-cols-2 lg:px-10">
        {t.neighborhood.sections.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="rule-gold" />
            <h2 className="mt-6 text-2xl">{s.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-[1.9] text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}