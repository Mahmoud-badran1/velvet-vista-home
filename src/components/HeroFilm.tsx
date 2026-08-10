import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import heroFilm from "../assets/hero-film.mp4.asset.json";
import { images } from "./images";

export function HeroFilm() {
  const { lang } = useI18n();
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        setP(Math.min(1, window.scrollY / h));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const facts =
    lang === "de"
      ? ["Wien · Österreich", "4 Schlafzimmer", "3 Bäder", "286 m²", "€ 4.850.000"]
      : ["Vienna · Austria", "4 Bedrooms", "3 Bathrooms", "286 m²", "€ 4,850,000"];

  return (
    <>
      <section className="noir relative -mt-16 h-screen w-full overflow-hidden lg:-mt-[72px]">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${1 - p * 0.08}) translateY(${p * -4}vh)`,
            opacity: 1 - p * 0.55,
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          <video
            className="h-full w-full object-cover"
            src={heroFilm.url}
            poster={images.hero}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        {/* cinematic gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.35)_40%,rgba(5,5,5,0.28)_70%,rgba(5,5,5,0.55)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_70%,rgba(5,5,5,0.55)_0%,transparent_60%)]" />

        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10 lg:pb-16">
            <div className="hero-line" style={{ animationDelay: "300ms" }}>
              <p className="eyebrow text-white/70">
                {lang === "de" ? "Private Residenz · Wien" : "Private Residence · Vienna"}
              </p>
            </div>

            <h1 className="mt-7 max-w-4xl text-[3rem] leading-[1.05] tracking-[-0.01em] text-white md:text-[5.5rem]">
              <span className="hero-mask" style={{ animationDelay: "550ms" }}>
                {lang === "de" ? "Ein Ort," : "A place"}
              </span>
              <span className="hero-mask" style={{ animationDelay: "800ms" }}>
                {lang === "de" ? "um zu bleiben." : "to belong."}
              </span>
            </h1>

            <div className="hero-line" style={{ animationDelay: "1150ms" }}>
              <p className="mt-8 max-w-md text-sm leading-[1.9] text-white/65">
                {lang === "de"
                  ? "Eine seltene private Residenz, definiert durch Architektur, Licht und außergewöhnlichen Raum."
                  : "A rare private residence defined by architecture, light and extraordinary space."}
              </p>
            </div>

            <div className="hero-line" style={{ animationDelay: "1350ms" }}>
              <Link
                to="/residences"
                className="eyebrow group mt-10 inline-flex items-center gap-4 border-b border-white/25 pb-3 text-white/85 transition-colors hover:border-white/70 hover:text-white"
              >
                {lang === "de" ? "Die Residenz entdecken" : "Discover the residence"}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="hero-line border-t border-white/10" style={{ animationDelay: "1600ms" }}>
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-6 py-6 lg:px-10">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                {facts.map((f) => (
                  <span key={f} className="eyebrow text-[0.625rem] text-white/50">
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="eyebrow text-[0.625rem] text-white/40">
                  {lang === "de" ? "Scrollen" : "Scroll to discover"}
                </span>
                <span className="scroll-line relative block h-10 w-px overflow-hidden bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture shaped by light */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <h2 className="max-w-3xl text-3xl leading-[1.25] text-foreground md:text-6xl">
            {lang === "de" ? "Architektur, geformt vom Licht." : "Architecture shaped by light."}
          </h2>
        </div>
        <figure className="relative h-[80vh] min-h-[420px] w-full overflow-hidden">
          <img
            src={images.light}
            alt={lang === "de" ? "Innenraum im Nachmittagslicht" : "Interior in afternoon light"}
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            style={{ transform: `scale(${1.06 - Math.min(p, 1) * 0.04})` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.18),transparent_40%,rgba(5,5,5,0.22))]" />
        </figure>
      </section>
    </>
  );
}