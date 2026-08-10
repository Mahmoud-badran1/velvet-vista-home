import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import logo from "../assets/lange-gasse-logo.jpg.asset.json";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="bg-ivory px-6 py-8">
          <img
            src={logo.url}
            alt="Lange Gasse Collection"
            loading="lazy"
            width={1536}
            height={1024}
            className="mx-auto w-full max-w-lg"
          />
        </div>

        <div className="mt-16 grid gap-12 border-t border-ivory/15 pt-12 md:grid-cols-3">
          <div>
            <p className="eyebrow text-gold">{t.contact.address}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{t.contact.addressValue}</p>
          </div>
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