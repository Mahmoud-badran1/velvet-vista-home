import type { Lang } from "../data/residences";

export function formatPrice(raw: string, lang: Lang): string {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return raw;

  const amount = Number(trimmed);
  return new Intl.NumberFormat(lang === "de" ? "de-AT" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
