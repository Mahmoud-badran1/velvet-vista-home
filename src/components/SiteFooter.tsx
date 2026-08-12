import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{t.contact.email}</p>
            <a
              href="mailto:office@langegasse-collection.at"
              className="link-underline mt-3 inline-block text-sm opacity-80"
            >
              office@langegasse-collection.at
            </a>
            <p className="eyebrow mt-6 text-gold">{t.contact.phone}</p>
            <a href="tel:+4315550000" className="link-underline mt-3 inline-block text-sm opacity-80">
              +43 1 555 0000
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/imprint" className="eyebrow opacity-70 hover:opacity-100">
              {t.footer.imprint}
            </Link>
            <Link to="/privacy" className="eyebrow opacity-70 hover:opacity-100">
              {t.footer.privacy}
            </Link>
          </div>
        </div>

        <p className="eyebrow mt-12 opacity-50">
          © {new Date().getFullYear()} Lange Gasse Collection. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}