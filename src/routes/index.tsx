import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "../i18n";
import { images, type ImageKey } from "../components/images";
import { Reveal } from "../components/Reveal";
import { homeCopy } from "../content/home";
import { loadResolvedResidences, type ResolvedResidence } from "../lib/residence-content";
import { useSiteSettings } from "../lib/site-settings";

export const Route = createFileRoute("/")({
  loader: () => loadResolvedResidences(),
  head: () => ({
    meta: [
      { title: "Zianat — Private Residences, Vienna Josefstadt" },
      {
        name: "description",
        content:
          "Between the city and the horizon: four private residences in an 1890 house in Vienna's 8th district — terraces, panoramic windows and a private lift.",
      },
      { property: "og:title", content: "Between the City and the Horizon — Zianat" },
      {
        property: "og:description",
        content: "Four private residences above the rooftops of Vienna's eighth district.",
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
          name: "Zianat",
          address: {
            "@type": "PostalAddress",
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
  const residences = Route.useLoaderData() as ResolvedResidence[];
  const { lang } = useI18n();
  const c = homeCopy;
  const { contactEmail } = useSiteSettings();
  const mailto = `mailto:${contactEmail}?subject=Private%20Viewing`;

  const [cityIndex, setCityIndex] = useState(0);
  const landmarks = c.city.landmarks;
  const current = landmarks[cityIndex] ?? landmarks[0];
  const nextCity = () => setCityIndex((i) => (i + 1) % landmarks.length);
  const prevCity = () => setCityIndex((i) => (i - 1 + landmarks.length) % landmarks.length);

  return (
    <div>
      {/* 01 — HERO */}
      <section className="relative -mt-16 lg:-mt-[72px] flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <img
          src={images.heroResidence}
          alt="Zianat facade in evening light"
          width={1920}
          height={1280}
          className="kenburns absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-40 pb-20 lg:px-10 lg:pb-28">
          <h1 className="max-w-5xl text-5xl leading-[0.95] whitespace-pre-line text-white md:text-7xl lg:text-8xl xl:text-9xl">
            {c.hero.title[lang]}
          </h1>
          <h3 className="mt-8 max-w-2xl font-[family-name:var(--font-display)] text-lg leading-snug text-white/90 md:text-2xl">
            {c.hero.subtitle[lang]}
          </h3>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a
              href="/#residences"
              className="eyebrow border border-white/40 px-8 py-4 text-white transition-colors hover:bg-white hover:text-charcoal"
            >
              {c.hero.ctaPrimary[lang]}
            </a>
            <Link to="/film" className="eyebrow link-underline text-white">
              {c.hero.ctaFilm[lang]} →
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl items-center gap-4 px-6 pb-10 lg:px-10">
          <span className="eyebrow text-[0.6rem] text-white/60">{c.hero.scroll[lang]}</span>
          <span className="h-px w-24 origin-left animate-pulse bg-white/40" />
        </div>
      </section>

      {/* 02 — THE ADDRESS */}
      <section id="address" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <p className="eyebrow text-accent">{c.address.eyebrow[lang]}</p>
          <div>
            <h2 className="max-w-2xl text-3xl leading-snug md:text-5xl">{c.address.title[lang]}</h2>
            <p className="mt-8 max-w-xl text-sm leading-[1.9] text-muted-foreground">
              {c.address.body[lang]}
            </p>
            <dl className="mt-14 grid gap-8 sm:grid-cols-3">
              {c.address.stats.map((s) => (
                <div key={s.label.en} className="border-t border-border pt-4">
                  <dt className="eyebrow text-muted-foreground">{s.label[lang]}</dt>
                  <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                    {s.value[lang]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* 03 — THE CITY */}
      <section id="location" className="overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <p className="eyebrow text-accent">{c.city.eyebrow[lang]}</p>
            <h2 className="mt-4 text-3xl text-foreground md:text-5xl">{c.city.title[lang]}</h2>
            <p className="mt-6 max-w-xl text-sm leading-[1.9] text-muted-foreground">
              {c.city.body[lang]}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="flex items-baseline gap-5">
                <span className="font-[family-name:var(--font-display)] text-8xl leading-none text-accent md:text-9xl">
                  {current.minutes}
                </span>
                <span className="eyebrow text-foreground/70">{c.city.walkLabel[lang]}</span>
              </div>
              <div className="my-10 h-px w-24 bg-accent" />
              <p className="eyebrow text-lg text-foreground md:text-xl">{current.phrase[lang]}</p>
              <p className="mt-3 text-sm text-muted-foreground">{current.name[lang]}</p>
            </div>

            <figure className="order-1 overflow-hidden lg:order-2">
              <img
                src={images[current.key as ImageKey]}
                alt={current.name[lang]}
                width={1400}
                height={1800}
                className="h-[36vh] w-full object-cover"
              />
            </figure>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <span className="eyebrow text-muted-foreground">
              {String(cityIndex + 1).padStart(2, "0")} / {String(landmarks.length).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevCity}
                aria-label="Previous landmark"
                className="flex size-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:bg-foreground hover:text-background"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={nextCity}
                aria-label="Next landmark"
                className="flex size-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:bg-foreground hover:text-background"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — TWO CINEMAS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="max-w-3xl text-3xl leading-snug whitespace-pre-line md:text-5xl">
            {c.cinemas.title[lang]}
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {[
            { copy: c.cinemas.left, img: images.cityRooftops, fit: "aspect-[16/9]" },
            { copy: c.cinemas.right, img: images.horizonHills, fit: "aspect-[16/9]" },
          ].map((col, i) => (
            <Reveal key={col.copy.title.en} delay={i * 120}>
              <figure className="overflow-hidden">
                <img
                  src={col.img}
                  alt={col.copy.title[lang]}
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className={`w-full object-cover ${col.fit}`}
                />
              </figure>
              <p className="eyebrow mt-6 text-accent">{col.copy.title[lang]}</p>
              <p className="mt-3 max-w-md text-sm leading-[1.9] text-muted-foreground">
                {col.copy.body[lang]}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 — THE VIEW */}
      <section className="noir relative">
        <img
          src={images.terrace}
          alt="View from the terrace"
          loading="lazy"
          width={1800}
          height={1200}
          className="h-[70vh] w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/50 px-6">
          <blockquote className="mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-2xl leading-[1.5] text-ivory md:text-4xl">
            {c.view.quote[lang]}
          </blockquote>
        </div>
      </section>

      {/* 06 — ARCHITECTURE */}
      <section id="architecture" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <Reveal className="grid items-center gap-14 lg:grid-cols-2">
          <figure className="overflow-hidden">
            <img
              src={images.light}
              alt={c.architecture.title[lang]}
              loading="lazy"
              width={1600}
              height={1100}
              className="h-[60vh] w-full object-cover"
            />
          </figure>
          <div>
            <p className="eyebrow text-accent">{c.architecture.eyebrow[lang]}</p>
            <h2 className="mt-4 text-3xl md:text-5xl">{c.architecture.title[lang]}</h2>
            <p className="mt-8 max-w-lg text-sm leading-[1.9] text-muted-foreground">
              {c.architecture.body[lang]}
            </p>
            <ul className="mt-10 flex flex-col">
              {c.architecture.points.map((p) => (
                <li key={p.en} className="border-b border-border py-4 text-sm">
                  {p[lang]}
                </li>
              ))}
            </ul>
            <Link to="/building" className="eyebrow link-underline mt-8 inline-block text-accent">
              {lang === "de" ? "Mehr über das Haus" : "More about the building"} →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 07 — INTERIORS */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="eyebrow text-accent">{c.interiors.eyebrow[lang]}</p>
            <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">{c.interiors.title[lang]}</h2>
            <p className="mt-6 max-w-xl text-sm leading-[1.9] text-muted-foreground">
              {c.interiors.body[lang]}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <figure className="overflow-hidden md:col-span-2 md:row-span-2">
              <img
                src={images.salon}
                alt="Salon"
                loading="lazy"
                width={1800}
                height={1200}
                className="h-full min-h-[46vh] w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden">
              <img
                src={images.bedroom}
                alt="Bedroom"
                loading="lazy"
                width={1800}
                height={1200}
                className="h-[30vh] w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden">
              <img
                src={images.dining}
                alt="Dining"
                loading="lazy"
                width={1800}
                height={1200}
                className="h-[30vh] w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 08 — DETAILS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="eyebrow text-accent">{c.details.eyebrow[lang]}</p>
          <h2 className="mt-4 text-3xl md:text-5xl">{c.details.title[lang]}</h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {c.details.items.map((d, i) => (
            <Reveal key={d.key} delay={i * 100}>
              <figure className="overflow-hidden">
                <img
                  src={images[d.key as ImageKey]}
                  alt={d.label[lang]}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-square w-full object-cover"
                />
              </figure>
              <p className="eyebrow mt-4 text-muted-foreground">{d.label[lang]}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 09 — LIFE HERE */}
      <section id="lifestyle" className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <Reveal>
            <figure className="overflow-hidden">
              <img
                src={images.cafe}
                alt={c.life.title[lang]}
                loading="lazy"
                width={1600}
                height={1200}
                className="h-[60vh] w-full object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-accent">{c.life.eyebrow[lang]}</p>
            <h2 className="mt-4 text-3xl md:text-5xl">{c.life.title[lang]}</h2>
            <ol className="mt-12 flex flex-col">
              {c.life.moments.map((m) => (
                <li
                  key={m.time.en}
                  className="grid grid-cols-[auto_1fr] gap-8 border-b border-border py-5"
                >
                  <span className="eyebrow text-accent">{m.time[lang]}</span>
                  <span className="text-sm leading-relaxed">{m.text[lang]}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 10 — RESIDENCES */}
      <section id="residences" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <p className="eyebrow text-accent">{c.residences.eyebrow[lang]}</p>
          <h2 className="mt-4 text-3xl md:text-5xl">{c.residences.title[lang]}</h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {residences.map((r, i) => (
            <Reveal key={r.slug} delay={i * 80}>
              <Link to="/residences/$slug" params={{ slug: r.slug }} className="group block">
                <figure className="overflow-hidden">
                  <img
                    src={r.resolvedGallery[0]}
                    alt={r.name[lang]}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-[42vh] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </figure>
                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <p className="font-[family-name:var(--font-display)] text-2xl">{r.name[lang]}</p>
                  <p className="eyebrow text-muted-foreground">{r.area}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.kicker[lang]}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <a href="#residences" className="eyebrow link-underline mt-16 inline-block text-accent">
          {c.residences.cta[lang]} →
        </a>
      </section>

      {/* 11 — THE FILM */}
      <section className="noir">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div>
            <p className="eyebrow text-gold">{c.film.eyebrow[lang]}</p>
            <h2 className="mt-4 text-3xl leading-snug whitespace-pre-line text-ivory md:text-5xl">
              {c.film.title[lang]}
            </h2>
            <p className="mt-8 max-w-md text-sm leading-[1.9] text-ivory/65">{c.film.body[lang]}</p>
            <Link
              to="/film"
              className="eyebrow mt-12 inline-block border border-ivory/40 px-8 py-4 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
            >
              {c.film.cta[lang]}
            </Link>
          </div>
          <Link to="/film" className="group block overflow-hidden">
            <img
              src={images.filmStill}
              alt={c.film.cta[lang]}
              loading="lazy"
              width={1920}
              height={1080}
              className="h-[46vh] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
          </Link>
        </div>
      </section>

      {/* 12 — CLOSING */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center lg:py-36">
        <Reveal>
          <p className="eyebrow text-accent">{c.closing.eyebrow[lang]}</p>
          <h2 className="mt-6 text-3xl leading-snug md:text-5xl">{c.closing.title[lang]}</h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-[1.9] text-muted-foreground">
            {c.closing.body[lang]}
          </p>
          <a
            href={mailto}
            className="eyebrow mt-12 inline-block bg-accent px-10 py-4 text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {c.closing.cta[lang]}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
