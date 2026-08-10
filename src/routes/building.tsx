import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { images } from "../components/images";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/building")({
  head: () => ({
    meta: [
      { title: "Das Haus · The Building — Lange Gasse Collection" },
      {
        name: "description",
        content:
          "An 1890 Jugendstil house on Lange Gasse, 1080 Vienna, with newly created rooftop levels, direct lift and house garage.",
      },
      { property: "og:title", content: "The Building — Lange Gasse Collection" },
      {
        property: "og:description",
        content: "Jugendstil from 1890, carefully continued with new rooftop residences.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/building" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/building" }],
  }),
  component: BuildingPage,
});

function BuildingPage() {
  const { t } = useI18n();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-accent">{t.building.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">{t.building.title}</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t.building.lead}
        </p>
      </div>

      <img
        src={images.hero}
        alt=""
        loading="lazy"
        width={1920}
        height={1088}
        className="h-[50vh] min-h-[320px] w-full object-cover"
      />

      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-14 px-6 py-24 md:grid-cols-2 lg:px-10">
        {t.building.sections.map((s, i) => (
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