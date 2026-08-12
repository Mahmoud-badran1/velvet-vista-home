import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { useSiteSettings } from "../lib/site-settings";
import film from "../assets/hero-film.mp4.asset.json";

export const Route = createFileRoute("/film")({
  head: () => ({
    meta: [
      { title: "The Film — Lange Gasse Collection, Vienna" },
      {
        name: "description",
        content:
          "A quiet cinematic portrait of the Lange Gasse Collection in Vienna Josefstadt — light, silence and the city at eye level.",
      },
      { property: "og:title", content: "The Film — Lange Gasse Collection" },
      {
        property: "og:description",
        content: "A quiet cinematic portrait of a private residence in Vienna Josefstadt.",
      },
      { property: "og:type", content: "video.other" },
      { property: "og:url", content: "/film" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/film" }],
  }),
  component: FilmPage,
});

function FilmPage() {
  const { lang } = useI18n();
  const { filmUrl } = useSiteSettings();

  return (
    <div className="noir min-h-[100svh]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow text-gold">
          {lang === "de" ? "Der Film" : "The Film"}
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl leading-tight text-ivory md:text-5xl">
          {lang === "de" ? "Zwischen der Stadt und dem Horizont" : "Between the City and the Horizon"}
        </h1>

        <video
          src={filmUrl || film.url}
          controls
          playsInline
          preload="metadata"
          className="mt-12 aspect-video w-full bg-black object-cover"
        />

        <p className="mt-10 max-w-xl text-sm leading-[1.9] text-ivory/65">
          {lang === "de"
            ? "Ein ruhiger Film über dieses Haus — Licht, Stille und eine Stadt, die man auf Augenhöhe bewohnt."
            : "A quiet film about this house — light, silence and a city you live with at eye level."}
        </p>

        <Link to="/" className="eyebrow link-underline mt-12 inline-block text-gold">
          ← {lang === "de" ? "Zurück zur Startseite" : "Back to the homepage"}
        </Link>
      </div>
    </div>
  );
}
