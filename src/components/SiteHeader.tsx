import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, Heart } from "lucide-react";
import { useI18n } from "../i18n";

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/residences", label: t.nav.residences },
    { to: "/building", label: t.nav.building },
    { to: "/neighborhood", label: t.nav.neighborhood },
  ] as const;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-6">
      <div className="mx-auto max-w-7xl rounded-full bg-ivory shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 lg:h-[72px] lg:px-10">
          <Link to="/" className="min-w-0 text-charcoal" onClick={() => setOpen(false)}>
            <span className="block truncate font-[family-name:var(--font-display)] text-lg tracking-[0.14em] uppercase">
              Lange Gasse Collection
            </span>
            <span className="eyebrow hidden text-[0.6rem] opacity-60 sm:block">
              {t.brand.place}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-6 text-charcoal">
            <nav className="hidden items-center gap-7 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="eyebrow link-underline"
                  activeProps={{ className: "eyebrow link-underline text-teal" }}
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
          <nav className="flex flex-col gap-4 border-t border-black/10 px-8 py-6 text-charcoal">
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