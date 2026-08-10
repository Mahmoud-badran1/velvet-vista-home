import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { residences } from "../data/residences";
import { images } from "../components/images";
import { Reveal } from "../components/Reveal";
import { HeroFilm } from "../components/HeroFilm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lange Gasse Collection — Residences in Vienna Josefstadt" },
      {
        name: "description",
        content:
          "Four exceptional residences in a Jugendstil house on Lange Gasse, 1080 Vienna — penthouses, maisonettes and terraces above the rooftops.",
      },
      { property: "og:title", content: "Lange Gasse Collection — Vienna Josefstadt" },
      {
        property: "og:description",
        content: "Four residences between 62.5 and 285 m² above the rooftops of Josefstadt.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Lange Gasse Collection",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Lange Gasse",
            postalCode: "1080",
            addressLocality: "Vienna",
            addressCountry: "AT",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, t } = useI18n();

  return (
    <div>
      {/* Hero film */}
      <HeroFilm />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow text-accent">{t.home.introEyebrow}</p>
          </div>
          <div>
            <h2 className="max-w-2xl text-3xl leading-snug md:text-5xl">{t.home.introTitle}</h2>
            <p className="mt-8 max-w-xl text-sm leading-[1.9] text-muted-foreground">
              {t.home.introText}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Residences */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-accent">{t.home.residencesEyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-5xl">{t.home.residencesTitle}</h2>

          <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {residences.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link to="/residences/$slug" params={{ slug: r.slug }} className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={images[r.image]}
                      alt={r.name[lang]}
                      loading="lazy"
                      width={1600}
                      height={1072}
                      className="h-[300px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 lg:h-[400px]"
                    />
                  </div>
                  <p className="eyebrow mt-6 text-accent">
                    {String(r.order).padStart(2, "0")} — {r.status[lang]}
                  </p>
                  <h3 className="mt-3 text-2xl">{r.name[lang]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.kicker[lang]}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Building */}
      <section className="grid lg:grid-cols-2">
        <img
          src={images.salon}
          alt=""
          loading="lazy"
          width={1600}
          height={1072}
          className="h-full min-h-[340px] w-full object-cover"
        />
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
          <p className="eyebrow text-accent">{t.home.buildingEyebrow}</p>
          <h2 className="mt-4 max-w-md text-3xl md:text-4xl">{t.home.buildingTitle}</h2>
          <p className="mt-6 max-w-md text-sm leading-[1.9] text-muted-foreground">
            {t.home.buildingText}
          </p>
          <Link to="/building" className="eyebrow link-underline mt-8 self-start text-accent">
            {t.home.buildingCta}
          </Link>
        </div>
      </section>

      {/* Location */}
      <section className="grid bg-teal text-ivory lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-20 lg:order-1 lg:px-16">
          <p className="eyebrow text-gold">{t.home.locationEyebrow}</p>
          <h2 className="mt-4 max-w-md text-3xl md:text-4xl">{t.home.locationTitle}</h2>
          <p className="mt-6 max-w-md text-sm leading-[1.9] text-ivory/80">
            {t.home.locationText}
          </p>
          <Link to="/neighborhood" className="eyebrow link-underline mt-8 self-start text-gold">
            {t.home.locationCta}
          </Link>
        </div>
        <img
          src={images.josefstadt}
          alt=""
          loading="lazy"
          width={1600}
          height={1072}
          className="order-1 h-full min-h-[340px] w-full object-cover lg:order-2"
        />
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <p className="eyebrow text-accent">{t.home.contactEyebrow}</p>
        <h2 className="mt-4 text-3xl md:text-5xl">{t.home.contactTitle}</h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-[1.9] text-muted-foreground">
          {t.home.contactText}
        </p>
        <a
          href="mailto:office@langegasse-collection.at"
          className="eyebrow mt-10 inline-block bg-charcoal px-10 py-4 text-ivory transition-colors hover:bg-teal"
        >
          {t.contact.write}
        </a>
      </section>
    </div>
  );
}
