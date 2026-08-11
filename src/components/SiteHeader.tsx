import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X, Search, Heart } from "lucide-react";
import { useI18n } from "../i18n";
import logo from "../assets/logo-nbg.png.asset.json";


export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overFilm = pathname === "/" && !scrolled && !open;

  const links = [
    { to: "/residences", label: t.nav.residences },
    { to: "/building", label: t.nav.building },
    { to: "/neighborhood", label: t.nav.neighborhood },
    { to: "/film", label: lang === "de" ? "Der Film" : "The Film" },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
        overFilm ? "px-0 pt-0" : "px-4 pt-4 lg:px-8 lg:pt-6"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-700 ease-out ${
          overFilm
            ? "max-w-none rounded-none bg-transparent text-charcoal shadow-none ring-0"
            : "max-w-7xl rounded-full bg-ivory text-charcoal shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
        }`}
      >
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:h-[72px] lg:px-10">
          <Link to="/" className="min-w-0" onClick={() => setOpen(false)}>
            <img
              src={logo.url}
              alt="Lange Gasse Collection"
              width={600}
              height={120}
              className="h-8 w-auto max-w-[180px] object-contain transition-all duration-700 sm:h-9 lg:h-10"
            />
          </Link>


          <div className="flex shrink-0 items-center gap-6">
            <nav className="hidden items-center gap-7 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="eyebrow link-underline"
                  activeProps={{
                    className: "eyebrow link-underline text-teal",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="eyebrow flex items-center gap-2 opacity-60">
              <button
                onClick={() => setLang("de")}
                className={lang === "de" ? "opacity-100" : "hover:opacity-100"}
              >
                DE
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setLang("en")}
                className={lang === "en" ? "opacity-100" : "hover:opacity-100"}
              >
                EN
              </button>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <button aria-label="Search" className="opacity-70 transition hover:opacity-100">
                <Search className="size-[1.05rem]" />
              </button>
              <button aria-label="Favorites" className="opacity-70 transition hover:opacity-100">
                <Heart className="size-[1.05rem]" />
              </button>
            </div>

            <button aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-4 border-t border-black/10 px-8 py-6">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="eyebrow" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}