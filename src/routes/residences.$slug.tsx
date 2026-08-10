import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { getResidence, residences, type Residence } from "../data/residences";
import { images, type ImageKey } from "../components/images";
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
  const next =
    residences[(residences.findIndex((r) => r.slug === residence.slug) + 1) % residences.length]!;

  return (
    <article>
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={images[residence.image]}
          alt={residence.name[lang]}
          width={1600}
          height={1072}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-12 lg:px-10">
          <p className="eyebrow text-gold">{residence.status[lang]}</p>
          <h1 className="mt-4 max-w-3xl text-4xl text-ivory md:text-6xl">
            {residence.name[lang]}
          </h1>
          <p className="mt-3 text-sm text-ivory/80">{residence.kicker[lang]}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[2fr_1fr] lg:px-10 lg:py-28">
        <div>
          <p className="eyebrow text-accent">{t.residences.description}</p>
          <div className="mt-6 flex flex-col gap-5">
            {residence.description[lang].map((p) => (
              <p key={p} className="max-w-2xl text-[0.95rem] leading-[1.9]">
                {p}
              </p>
            ))}
          </div>

          <p className="eyebrow mt-16 text-accent">{t.residences.features}</p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {residence.features[lang].map((f) => (
              <li key={f} className="border-b border-border py-3 text-sm">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit bg-card p-8 lg:sticky lg:top-28">
          <dl className="flex flex-col gap-6">
            {[
              [t.residences.area, residence.area],
              [t.residences.outdoor, residence.outdoor],
              [t.residences.rooms, residence.rooms],
              [t.residences.status, residence.status[lang]],
              [t.residences.price, residence.price[lang]],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-border pb-4">
                <dt className="eyebrow text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-xl">{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={`mailto:office@langegasse-collection.at?subject=${encodeURIComponent(residence.name[lang])}`}
            className="eyebrow mt-8 inline-block w-full bg-charcoal px-6 py-4 text-center text-ivory transition-colors hover:bg-teal"
          >
            {t.residences.inquire}
          </a>
        </aside>
      </div>

      <Reveal className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-10">
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
      </Reveal>
    </article>
  );
}