import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { residences } from "../data/residences";
import { images, getImage } from "../components/images";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/residences/")({
  head: () => ({
    meta: [
      { title: "Residenzen · Residences — Lange Gasse Collection" },
      {
        name: "description",
        content:
          "Four residences from 62.5 m² to 285 m² with terraces, panoramic windows and a private lift in Vienna Josefstadt.",
      },
      { property: "og:title", content: "Residences — Lange Gasse Collection" },
      {
        property: "og:description",
        content: "Four residences between 62.5 and 285 m² above the rooftops of Josefstadt.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/residences" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/residences" }],
  }),
  component: ResidencesPage,
});

function ResidencesPage() {
  const { lang, t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <p className="eyebrow text-accent">{t.residences.eyebrow}</p>
      <h1 className="mt-4 text-4xl leading-tight md:text-6xl">{t.residences.title}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {t.residences.lead}
      </p>

      <div className="mt-20 flex flex-col gap-24">
        {residences.map((r, i) => (
          <Reveal key={r.slug}>
            <article
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="overflow-hidden">
                <img
                  src={getImage(r.image)}
                  alt={r.name[lang]}
                  loading="lazy"
                  width={1600}
                  height={1072}
                  className="h-[360px] w-full object-cover transition-transform duration-[1200ms] hover:scale-105 lg:h-[520px]"
                />
              </figure>

              <div className="min-w-0">
                <p className="eyebrow text-accent">
                  {String(r.order).padStart(2, "0")} — {r.status[lang]}
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl">{r.name[lang]}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{r.kicker[lang]}</p>
                <p className="mt-6 max-w-md text-sm leading-relaxed">{r.intro[lang]}</p>

                <dl className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                  <div>
                    <dt className="eyebrow text-muted-foreground">{t.residences.area}</dt>
                    <dd className="mt-2 font-[family-name:var(--font-display)] text-xl">{r.area}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted-foreground">{t.residences.outdoor}</dt>
                    <dd className="mt-2 font-[family-name:var(--font-display)] text-xl">
                      {r.outdoor}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted-foreground">{t.residences.rooms}</dt>
                    <dd className="mt-2 font-[family-name:var(--font-display)] text-xl">
                      {r.rooms}
                    </dd>
                  </div>
                </dl>

                <Link
                  to="/residences/$slug"
                  params={{ slug: r.slug }}
                  className="eyebrow link-underline mt-10 inline-block text-accent"
                >
                  {t.residences.view}
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}