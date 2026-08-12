import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { getResidence, residences, type Residence } from "../data/residences";
import { images, getImage, type ImageKey } from "../components/images";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/residences/$slug")({
  loader: ({ params }) => {
    const residence = getResidence(params.slug);
    if (!residence) throw notFound();
    return { residence };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.residence;
    const title = `${r.name.de} — Lange Gasse Collection`;
    return {
      meta: [
        { title },
        { name: "description", content: r.intro.en },
        { property: "og:title", content: title },
        { property: "og:description", content: r.intro.en },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/residences/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/residences/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: r.name.en,
            description: r.intro.en,
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
    };
  },
  component: ResidenceDetail,
});

function ResidenceDetail() {
  const { residence } = Route.useLoaderData() as { residence: Residence };
  const { lang, t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const index = residences.findIndex((r) => r.slug === residence.slug);
  const next = residences[(index + 1) % residences.length]!;
  const others = residences.filter((r) => r.slug !== residence.slug).slice(0, 3);

  const galleryKeys: ImageKey[] = (residence.gallery?.length
    ? (residence.gallery as ImageKey[])
    : ([
        residence.image,
        ...(["salon", "terrace", "hero", "josefstadt"] as ImageKey[]).filter(
          (k) => k !== residence.image,
        ),
      ] as ImageKey[])
  ).filter((k) => k in images);
  const [main, ...thumbs] = galleryKeys;

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % galleryKeys.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => ((i ?? 0) - 1 + galleryKeys.length) % galleryKeys.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, galleryKeys.length]);

  const mailto = `mailto:office@langegasse-collection.at?subject=${encodeURIComponent(
    residence.name[lang],
  )}`;

  const paragraphs = residence.description[lang];
  const visible = expanded ? paragraphs : paragraphs.slice(0, 2);

  const details: [string, string][] = [
    [t.residences.propertyType, t.residences.propertyTypeValue],
    [t.residences.area, residence.area],
    [t.residences.outdoor, residence.outdoor],
    [t.residences.rooms, residence.rooms],
    [t.residences.status, residence.status[lang]],
    [t.residences.price, residence.price[lang]],
    [t.residences.building, t.residences.buildingValue],
    [t.residences.district, t.residences.districtValue],
    [t.residences.ref, `LGC-${String(residence.order).padStart(3, "0")}`],
  ];

  return (
    <article className="bg-background text-foreground">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 pt-6 pb-5 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground lg:px-10"
      >
        <Link to="/residences" className="transition-colors hover:text-foreground">
          {lang === "de" ? "Objekte" : "Properties"}
        </Link>
        <span className="opacity-40">/</span>
        <Link to="/residences" className="transition-colors hover:text-foreground">
          {lang === "de" ? "Luxus-Residenzen" : "Luxury Apartments"}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-accent">{residence.name[lang]}</span>
      </nav>

      {/* Gallery */}
      <section className="grid gap-2 md:grid-cols-[2fr_1fr] md:gap-3 lg:h-[68vh] lg:min-h-[520px]">
        <figure className="relative overflow-hidden">
          <img
            src={getImage(main!)}
            alt={residence.name[lang]}
            width={1600}
            height={1072}
            onClick={() => setLightbox(0)}
            className="h-[46vh] w-full cursor-pointer object-cover md:h-full"
          />
        </figure>
        <div className="grid gap-2 md:gap-3">
          {thumbs.slice(0, 2).map((k, i) => (
            <figure key={k} className="group relative overflow-hidden">
              <img
                src={getImage(k)}
                alt={residence.name[lang]}
                loading="lazy"
                width={1200}
                height={800}
                onClick={() => setLightbox(i + 1)}
                className="h-[22vh] w-full cursor-pointer object-cover md:h-full"
              />
              {i === 1 && galleryKeys.length > 3 && (
                <button
                  type="button"
                  onClick={() => setLightbox(0)}
                  className="eyebrow absolute inset-0 flex items-center justify-center bg-black/45 text-white transition-colors hover:bg-black/60"
                >
                  {t.residences.viewPhotos} ({galleryKeys.length})
                </button>
              )}
            </figure>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#050505]/97">
          <div className="flex items-center justify-between px-6 py-5 text-white/80">
            <span className="eyebrow">
              {lightbox + 1} / {galleryKeys.length}
            </span>
            <button type="button" className="eyebrow" onClick={() => setLightbox(null)}>
              {lang === "de" ? "Schließen" : "Close"} ✕
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center px-4 pb-6">
            <img
              src={getImage(galleryKeys[lightbox]!)}
              alt={residence.name[lang]}
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-6 pb-8 text-white">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setLightbox((i) => ((i ?? 0) - 1 + galleryKeys.length) % galleryKeys.length)
              }
              className="h-11 w-11 rounded-full border border-white/40 transition-colors hover:bg-white/10"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setLightbox((i) => ((i ?? 0) + 1) % galleryKeys.length)}
              className="h-11 w-11 rounded-full border border-white/40 transition-colors hover:bg-white/10"
            >
              →
            </button>
          </div>
        </div>
      )}


      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="min-w-0">
          {/* Headline */}
          <p className="eyebrow text-accent">{residence.status[lang]}</p>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{residence.name[lang]}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{residence.kicker[lang]}</p>
          <p className="mt-6 font-[family-name:var(--font-display)] text-2xl">
            {residence.price[lang]}
          </p>

          {/* Overview */}
          <h2 className="eyebrow mt-16 text-accent">{t.residences.overview}</h2>
          <div className="mt-6 flex flex-col gap-5">
            {visible.map((p) => (
              <p key={p} className="max-w-2xl text-[0.95rem] leading-[1.9]">
                {p}
              </p>
            ))}
          </div>
          {paragraphs.length > 2 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="eyebrow link-underline mt-6 text-accent"
            >
              {expanded ? t.residences.readLess : t.residences.readMore}
            </button>
          )}

          {/* Property details */}
          <h2 className="eyebrow mt-16 text-accent">{t.residences.propertyDetails}</h2>
          <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 border-b border-border py-4"
              >
                <dt className="eyebrow text-muted-foreground">{label}</dt>
                <dd className="text-right text-sm">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Amenities */}
          <h2 className="eyebrow mt-16 text-accent">{t.residences.amenities}</h2>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {residence.features[lang].map((f) => (
              <li key={f} className="border-b border-border py-3 text-sm">
                {f}
              </li>
            ))}
          </ul>

          {/* Location */}
          <h2 className="eyebrow mt-16 text-accent">{t.residences.location}</h2>
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.9]">{t.residences.locationText}</p>
          <figure className="mt-8 overflow-hidden">
            <img
              src={images.josefstadt}
              alt={t.residences.districtValue}
              loading="lazy"
              width={1600}
              height={900}
              className="h-[320px] w-full object-cover"
            />
          </figure>
          <Link to="/neighborhood" className="eyebrow link-underline mt-6 inline-block text-accent">
            {t.nav.neighborhood} →
          </Link>
        </div>

      </div>

      {/* Other residences */}
      <Reveal className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="eyebrow text-accent">{t.residences.similar}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {others.map((r) => (
              <Link
                key={r.slug}
                to="/residences/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <figure className="overflow-hidden">
                  <img
                    src={getImage(r.image)}
                    alt={r.name[lang]}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-[240px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </figure>
                <p className="eyebrow mt-5 text-muted-foreground">{r.status[lang]}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl">{r.name[lang]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.kicker[lang]}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
            <Link to="/residences" className="eyebrow link-underline">
              ← {t.residences.back}
            </Link>
            <Link
              to="/residences/$slug"
              params={{ slug: next.slug }}
              className="eyebrow link-underline text-accent"
            >
              {t.residences.next}: {next.name[lang]} →
            </Link>
          </div>
        </div>
      </Reveal>
    </article>
  );
}