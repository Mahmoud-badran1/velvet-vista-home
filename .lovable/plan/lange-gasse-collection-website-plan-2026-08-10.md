# Lange Gasse Collection — Website Plan

A bilingual (DE/EN) showcase site for four residences in Vienna Josefstadt, in the spirit of era.estate: full-bleed imagery, slow reveals, generous whitespace, editorial typography.

## What I need from you

**Photography / footage (most important)**
- Hero image or hero video loop for the homepage (landscape, high-res)
- Per apartment: 6–12 photos (salon, kitchen, bedrooms, bathrooms, terrace, view)
- Building exterior / facade, entrance, stairwell, garage/lift
- Neighborhood shots (Josefstadt streets, Theater in der Josefstadt, cafés)
- Optional: floor plans (PDF/PNG) per apartment, drone or rooftop view
- Upload directly in chat, or as a ZIP; I will host them on the CDN

**Text & data**
- German descriptions I already have from you; I will draft the English translations for your review
- Prices (or "on request"), availability status per unit
- Contact details: agent name, phone, email, address, imprint/Impressum + Datenschutz text (legally required in Austria)
- Energy certificate data (HWB/fGEE) — required by Austrian listing law

**Brand**
- The logo you uploaded (ideally also a transparent PNG/SVG version if you have one)
- Favicon

If some assets are missing I will use tasteful placeholders and swap them in later.

## Design system

Palette from your brief, as semantic tokens:

| Token | Hex | Use |
|---|---|---|
| Ivory | #F1EDE4 | page background, 45% |
| Charcoal | #242321 | dark sections, text, hero, 20% |
| Walnut | #4A382C | warm accents, 15% |
| Sofa Teal | #17444A | signature accent, 12% |
| Antique Gold | #A68A5B | rules, buttons, details, 5% |
| Stone | #D8D0C3 | dividers, secondary surfaces, 3% |

Typography: a high-contrast serif for headlines (matching the logo's classic serif) plus a quiet wide-tracked sans for labels and body. Sharp corners, thin gold hairlines, letter-spaced small caps for eyebrow labels.

## Pages

```text
/                     Home — hero, intro, residence teasers, building, location, contact
/residences           The four residences, editorial list with key facts
/residences/$slug     Detail: gallery, facts table, description, features, inquiry CTA
/building             The Building — Jugendstil ~1890, new rooftop construction, lift/garage
/neighborhood         Josefstadt — culture, cafés, schools, connections
/imprint, /privacy    Impressum & Datenschutz
```

### The four residences
1. **Maisonette 168 m²** — 5 rooms over two levels, salon 70 m², 2 terraces 60 m², 3 bedrooms, 2 en-suite baths
2. **Stadtwohnung 62,5 m²** — 2 rooms, 1st rooftop level, no sloped ceilings, barrier-free, private lift
3. **Penthouse 285 m²** — +100 m² terraces, salon 90 m², 4 bedrooms, 3 baths, 2 kitchens, private lift & garage, completed May 2026
4. **Penthouse Maisonette 235 m²** — 5 rooms, 107 m² terraces, salon 88 m² with glass fireplace, marble baths, pavilion terrace

## Language toggle

DE is the default; EN available via a header toggle. All copy lives in one typed dictionary file (`src/i18n/`), with the choice persisted in localStorage. No backend needed for this.

## Interaction and motion

Restrained: image reveals on scroll, slow ken-burns on the hero, gold underline on hover, a full-screen lightbox gallery on detail pages. Nothing bouncy.

## Technical notes

- TanStack Start routes as listed; each page gets its own `head()` metadata in both languages plus JSON-LD `Residence`/`Offer` structured data on detail pages.
- Residence content lives in a typed data module (`src/data/residences.ts`) with DE/EN fields — easy to edit, no database.
- Images uploaded through chat are pushed to the Lovable CDN and referenced by pointer, keeping the repo light.
- Responsive-first: single-column mobile, editorial two-column at `lg`.

## Out of scope for this first version
- Inquiry form with stored leads (needs Lovable Cloud) — can be added next; for now contact is a mailto/phone CTA
- Gallery/virtual-tour page and 360° tours
