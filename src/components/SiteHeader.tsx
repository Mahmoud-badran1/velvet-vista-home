import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:px-10">
        <Link to="/" className="min-w-0" onClick={() => setOpen(false)}>
          <span className="block truncate font-[family-name:var(--font-display)] text-lg tracking-[0.14em] uppercase">
            Lange Gasse Collection
          </span>
          <span className="eyebrow block text-muted-foreground">{t.brand.place}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-6">
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="eyebrow link-underline"
                activeProps={{ className: "eyebrow link-underline text-accent" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="eyebrow flex items-center gap-2 text-muted-foreground">
            <button
              onClick={() => setLang("de")}
              className={lang === "de" ? "text-foreground" : "hover:text-foreground"}
            >
              DE
            </button>
            <span className="opacity-40">/</span>
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-foreground" : "hover:text-foreground"}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-border/60 px-6 py-6 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}