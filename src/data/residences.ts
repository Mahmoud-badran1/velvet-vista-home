export type Lang = "de" | "en";

export type Fact = { label: Record<Lang, string>; value: string };

export type Residence = {
  slug: string;
  order: number;
  image: "salon" | "terrace" | "hero" | "josefstadt";
  gallery?: string[];
  name: Record<Lang, string>;
  kicker: Record<Lang, string>;
  area: string;
  outdoor: string;
  rooms: string;
  status: Record<Lang, string>;
  price: Record<Lang, string>;
  intro: Record<Lang, string>;
  description: Record<Lang, string[]>;
  features: Record<Lang, string[]>;
};

export const residences: Residence[] = [
  {
    slug: "maisonette-168",
    order: 1,
    image: "salon",
    name: { de: "Maisonette 168 m²", en: "Maisonette 168 m²" },
    kicker: { de: "Fünf Zimmer auf zwei Ebenen", en: "Five rooms across two levels" },
    area: "168 m²",
    outdoor: "60 m²",
    rooms: "5",
    status: { de: "Verfügbar", en: "Available" },
    price: { de: "Preis auf Anfrage", en: "Price on request" },
    intro: {
      de: "Eine Maisonette über zwei Etagen mit 70 m² Salon und zwei Terrassen.",
      en: "A two-storey maisonette with a 70 m² salon and two terraces.",
    },
    description: {
      de: [
        "Die Wohnfläche der 5-Zimmer-Wohnung auf zwei Etagen beträgt 168 m², hinzu kommen zwei Terrassen im Ausmaß von 60 m².",
        "Salon 70 m², Küche, Büro, 3 Schlafzimmer, 2 Bäder en suite sowie 2 separate WCs.",
      ],
      en: [
        "This five-room residence spans two floors with 168 m² of living space, complemented by two terraces totalling 60 m².",
        "Salon of 70 m², kitchen, study, three bedrooms, two en-suite bathrooms and two separate WCs.",
      ],
    },
    features: {
      de: ["Salon 70 m²", "3 Schlafzimmer", "2 Bäder en suite", "2 separate WCs", "Büro", "Zwei Terrassen 60 m²"],
      en: ["70 m² salon", "3 bedrooms", "2 en-suite baths", "2 separate WCs", "Study", "Two terraces, 60 m²"],
    },
  },
  {
    slug: "stadtwohnung-62",
    order: 2,
    image: "hero",
    name: { de: "Stadtwohnung 62,5 m²", en: "City Residence 62.5 m²" },
    kicker: { de: "Luxus-Startwohnung in zentraler Bestlage", en: "A refined pied-à-terre in a prime central location" },
    area: "62,5 m²",
    outdoor: "—",
    rooms: "2",
    status: { de: "Verfügbar", en: "Available" },
    price: { de: "Preis auf Anfrage", en: "Price on request" },
    intro: {
      de: "Zweizimmer-Wohnung im ersten Dachgeschoß eines Jugendstilhauses — ohne Dachschrägen, barrierefrei.",
      en: "A two-room apartment on the first rooftop level of a Jugendstil house — no sloped ceilings, fully accessible.",
    },
    description: {
      de: [
        "LUXUS-STARTWOHNUNG IN ZENTRALER BESTLAGE, 1080 Wien-Josefstadt. Die Wohnfläche der angebotenen Zweizimmer-Wohnung beträgt 62,5 m².",
        "Sie befindet sich im 1. Dachgeschoß eines Jugendstilhauses, in welchem kürzlich neuer Wohnraum geschaffen wurde. In der Wohnung befinden sich keine Dachschrägen, auch Barrierefreiheit ist gegeben.",
        "Vom Hauseingang sowie von der bestehenden Hausgarage gelangen Sie über einen Lift, der nur für Bewohner dieser ersten Dachgeschoss-Ebene betretbar ist, zu Ihrer Wohnung.",
      ],
      en: [
        "A luxurious entry residence in a prime central location, 1080 Vienna-Josefstadt, offering 62.5 m² of living space.",
        "It occupies the first rooftop level of a Jugendstil house where new living space was recently created. There are no sloped ceilings and the apartment is barrier-free throughout.",
        "From the main entrance — and from the building's garage — a lift reserved for residents of this first rooftop level brings you directly to your door.",
      ],
    },
    features: {
      de: ["2 Zimmer", "Erstes Dachgeschoß", "Keine Dachschrägen", "Barrierefrei", "Eigener Lift", "Hausgarage"],
      en: ["2 rooms", "First rooftop level", "No sloped ceilings", "Barrier-free", "Dedicated lift", "House garage"],
    },
  },
  {
    slug: "penthouse-285",
    order: 3,
    image: "terrace",
    name: { de: "Penthouse 285 m²", en: "Penthouse 285 m²" },
    kicker: { de: "Zwei Penthouse-Etagen mit Stadtblick", en: "Two penthouse floors above the city" },
    area: "285 m²",
    outdoor: "100 m²",
    rooms: "8+",
    status: { de: "Fertigstellung Mai 2026", en: "Completed May 2026" },
    price: { de: "Preis auf Anfrage", en: "Price on request" },
    intro: {
      de: "285 m² Wohnfläche, 100 m² Terrassen, Fernblick über die Dächer Wiens.",
      en: "285 m² of living space, 100 m² of terraces and long views across the rooftops of Vienna.",
    },
    description: {
      de: [
        "Wohnfläche 285 m² zuzüglich 100 m² Terrassenflächen auf der Wohnebene mit fantastischem nordöstlich ausgerichtetem Stadtblick sowie Fernblick in südwestlicher Richtung über die Dächer der Stadt Wien. Die Baufertigstellung erfolgte im Mai 2026.",
        "Salon 90 m², zwei Wohnzimmer- bzw. Büroräume, 2 Küchen, 4 Schlafzimmer, 3 Bäder, 4 WCs und jeweils zwei Garderoben- und Lagerräume.",
        "Hauseingang und Garage sind mit einem Direktlift verbunden, der privat nur für das Obergeschoß — zwei Penthouse-Etagen — benützbar ist. Sicherheit und Diskretion sind somit durch eigenen Hauseingang, Lift und Garage gewährleistet. Im Keller steht dem Wohnungseigentümer ein Lagerraum zur Verfügung.",
        "Das Penthouse ist in bester Güte gebaut, barrierefrei und ohne Dachschrägen.",
      ],
      en: [
        "285 m² of living space plus 100 m² of terraces on the living level, with a striking north-easterly city view and long south-westerly views over the rooftops of Vienna. Construction was completed in May 2026.",
        "Salon of 90 m², two living or office rooms, two kitchens, four bedrooms, three bathrooms, four WCs, and two cloakrooms and storage rooms each.",
        "A direct lift connects the entrance and garage exclusively with the upper level — two penthouse floors. Security and discretion are assured through a private entrance, lift and garage. A storage room in the cellar belongs to the residence.",
        "The penthouse is built to the highest standard, barrier-free and without sloped ceilings.",
      ],
    },
    features: {
      de: ["Salon 90 m²", "4 Schlafzimmer", "3 Bäder, 4 WCs", "2 Küchen", "Direktlift & Privatgarage", "Terrassen 100 m²"],
      en: ["90 m² salon", "4 bedrooms", "3 baths, 4 WCs", "2 kitchens", "Direct lift & private garage", "100 m² terraces"],
    },
  },
  {
    slug: "penthouse-maisonette-235",
    order: 4,
    image: "salon",
    gallery: [
      "pmSalon",
      "pmDining",
      "pmDining2",
      "pmLounge",
      "pmFireplace",
      "pmArt2",
      "pmTerrace",
      "pmPavilion",
      "pmPavilion2",
      "pmDeck",
      "pmDeck2",
      "pmSun",
      "pmPergola",
      "pmView",
      "pmSkyline",
      "pmSkyline2",
      "pmStair",
      "pmStair2",
      "pmArt",
    ],
    name: { de: "Penthouse-Maisonette 235 m²", en: "Penthouse Maisonette 235 m²" },
    kicker: { de: "Salon mit offenem Glaskamin", en: "Salon with an open glass fireplace" },
    area: "235 m²",
    outdoor: "107 m²",
    rooms: "5",
    status: { de: "Verfügbar", en: "Available" },
    price: { de: "Preis auf Anfrage", en: "Price on request" },
    intro: {
      de: "Zwei Ebenen, Panoramafenster in beide Richtungen, 107 m² Terrassen mit gedecktem Pavillon.",
      en: "Two levels, panoramic windows in both directions, 107 m² of terraces with a covered pavilion.",
    },
    description: {
      de: [
        "Die Wohnfläche der 5-Zimmer-Wohnung auf zwei Etagen beträgt 235 m². Sie ist nordöstlich-südwestlich ausgerichtet. Es stehen zwei Terrassen mit insgesamt 107 m² zur Verfügung. Durchgehend befinden sich auf beiden Blickrichtungen Panoramafenster.",
        "Salon 88 m² mit offenem Glaskamin, 3 Schlafzimmer, Büro, mehrere Bäder und WCs, Ankleide, Wirtschaftsraum. Die Küche ist für den Einbau vorbereitet.",
        "Die Bäder sind bereits komplett ausgestattet — belegt mit Echt-Marmorbelägen, Hebe-Lichtkuppel für Luft und Licht, zusätzliche elektrische Fußbodenheizung und Handtuchwärmer. Badmöbel aus Teak massiv.",
        "Die Terrasse ist mit gedecktem Pavillon, Lounge-Garnitur, Teak-Schränken für Gartenmöbel, Grill und Geschirr ausgestattet — geschützt vor Wind und Regen, mit Anschlüssen für Sauna und Whirlpool.",
        "Hauseingang und Garage sind mit einem Direktlift verbunden, der privat nur für das Obergeschoß benützbar ist. Im Keller steht ein Lagerraum mit Liftanschluss zur Verfügung.",
      ],
      en: [
        "This five-room residence spans two floors with 235 m² of living space, oriented north-east to south-west. Two terraces of 107 m² in total belong to the apartment, with panoramic windows throughout in both directions.",
        "Salon of 88 m² with an open glass fireplace, three bedrooms, a study, several bathrooms and WCs, a dressing room and a utility room. The kitchen is prepared for installation.",
        "The bathrooms are fully finished in genuine marble, with an opening skylight dome for air and light, additional electric underfloor heating and towel warmers. Bathroom furniture in solid teak.",
        "The terrace comes with a covered pavilion, lounge furniture, teak cabinets for garden furniture, grill and tableware — sheltered from wind and rain, with connections prepared for a sauna and whirlpool.",
        "A direct lift connects the entrance and garage privately with the upper floor. A storage room with lift access is available in the cellar.",
      ],
    },
    features: {
      de: ["Salon 88 m² mit Glaskamin", "3 Schlafzimmer", "Echt-Marmorbäder", "Ankleide & Wirtschaftsraum", "Terrassen 107 m²", "Anschlüsse Sauna & Whirlpool"],
      en: ["88 m² salon with glass fireplace", "3 bedrooms", "Genuine marble baths", "Dressing & utility room", "107 m² terraces", "Sauna & whirlpool connections"],
    },
  },
];

export const getResidence = (slug: string) => residences.find((r) => r.slug === slug);
