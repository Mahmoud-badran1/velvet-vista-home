import { Link } from "@tanstack/react-router";
import { useI18n } from "../i18n";
import { useSiteSettings } from "../lib/site-settings";

export function SiteFooter() {
  const { t } = useI18n();
  const { contactEmail, contactPhone } = useSiteSettings();
  const telHref = contactPhone ? `tel:${contactPhone.replace(/[^+\d]/g, "")}` : null;

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">{t.contact.email}</p>
            <a
              href={`mailto:${contactEmail}`}
              className="link-underline mt-3 inline-block text-sm opacity-80"
            >
              {contactEmail}
            </a>
            {telHref && (
              <>
                <p className="eyebrow mt-6 text-gold">{t.contact.phone}</p>
                <a
                  href={telHref}
                  className="link-underline mt-3 inline-block text-sm opacity-80"
                >
                  {contactPhone}
                </a>
              </>
            )}
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
          © {new Date().getFullYear()} Zianat. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}