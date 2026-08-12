export type Lang = "de" | "en";

export type Fact = { label: Record<Lang, string>; value: string };

export type Residence = {
  slug: string;
  order: number;
  image: string;
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
    image: "swStudyEvening",
    gallery: ["swStudyEvening", "swBath", "swCorridor", "swBath2", "swShower", "swStair", "swHall", "swDining", "swDining2", "swHall2", "swBath3", "swBath4", "swNook", "swStudy", "swReading", "swVanity2"],
    name: { de: "Stadtwohnung 62,5 m²", en: "City Residence 62.5 m²" },
    kicker: { de: "Exklusive Dachgeschoßwohnung in bester Lage", en: "Exclusive rooftop residence in a prime location" },
    area: "62,5 m²",
    outdoor: "14,6 m²",
    rooms: "2",
    status: { de: "Verfügbar", en: "Available" },
    price: { de: "Preis auf Anfrage", en: "Price on request" },
    intro: {
      de: "Exklusive Dachgeschoßwohnung mit 62,5 m² Wohnfläche und zwei Terrassen – 1080 Wien-Josefstadt.",
      en: "Exclusive rooftop residence with 62.5 m² of living space and two terraces – 1080 Vienna-Josefstadt.",
    },
    description: {
      de: [
        "In einer der begehrtesten Wohnlagen des 8. Wiener Gemeindebezirks präsentiert sich diese hochwertige Dachgeschoßwohnung als attraktive Gelegenheit für Eigennutzer, Singles, Paare oder Anleger. Die Wohnung verfügt über rund 62,5 m² Wohnfläche und befindet sich im 1. Dachgeschoß eines stilvollen Jugendstilhauses, in dem kürzlich zusätzlicher Wohnraum geschaffen wurde.",
        "Besonders hervorzuheben sind die beiden privaten Außenbereiche mit insgesamt rund 14,6 m²: eine ca. 13 m² große Terrasse mit Sonneneinstrahlung von etwa 13:00 bis 20:00 Uhr sowie eine zusätzliche Mini-Terrasse mit ca. 1,6 m². Die Wohnung verfügt über keine Dachschrägen und ist barrierefrei zugänglich.",
        "Die durchdachte Raumaufteilung umfasst Garderobe, eine großzügige Wohnküche mit freiem Cityblick, ein Schlafzimmer mit ca. 12 m² und Zugang zur Mini-Terrasse, Badezimmer, separates WC sowie die beiden Terrassen.",
        "Ein besonderes Merkmal ist das private Zugangskonzept: Vom Hauseingang sowie von der bestehenden Hausgarage gelangen die Bewohner über einen Lift, der ausschließlich für die Bewohner dieser ersten Dachgeschoßebene zugänglich ist, direkt zur Wohnung. Eigener Hauseingang, privater Liftzugang und Garage ergänzen dieses besondere Wohnkonzept mit hohem Maß an Sicherheit, Privatsphäre und Diskretion.",
        "Die Wohnräume verfügen über massive, gewachste Teakparkettböden. Die Beheizung erfolgt über eine Gasetagen-Fußbodenheizung; im Badezimmer steht zusätzlich eine elektrische Fußbodenheizung zur Verfügung. Ein Klimagerät sorgt für zusätzlichen Komfort. Der Energieausweis weist einen HWB-Wert von 47,7 kWh/m²a – Klasse B aus.",
        "Die Lage im 8. Bezirk bietet eine vielseitige Infrastruktur mit Ärzten, Bildungseinrichtungen, Nahversorgern, Handwerksbetrieben, Cafés, Restaurants und kulturellen Einrichtungen. Die Nähe zum AKH stellt einen weiteren Standortvorteil dar. Mehrere U-Bahn-Linien (U2, U3, U5) befinden sich in Gehweite, wodurch die Innenstadt in kurzer Zeit erreichbar ist. Die Gasse soll künftig zu einer verkehrsberuhigten Begegnungszone mit zusätzlicher Begrünung umgestaltet werden.",
        "Die derzeitigen Hausbetriebskosten betragen ca. € 250,-/Monat, der Garagenplatz ca. € 270,-/Monat. Eine besondere Option bietet die Verbindung mit der benachbarten Wohnung 34 – ideal für zusätzliche Nutzungsmöglichkeiten wie Büro, Ordination, Gästebereich oder Personalbereich.",
        "Der Vermittler ist als Doppelmakler tätig.",
      ],
      en: [
        "In one of the most sought-after locations of Vienna's 8th district, this high-quality rooftop residence presents an attractive opportunity for owner-occupiers, singles, couples or investors. The apartment offers around 62.5 m² of living space on the first rooftop level of a stylish Jugendstil house, where additional living space has recently been created.",
        "Particularly noteworthy are the two private outdoor areas totalling around 14.6 m²: a terrace of approx. 13 m² with sun exposure from around 1:00 pm to 8:00 pm, plus an additional mini-terrace of approx. 1.6 m². The apartment has no sloped ceilings and is fully accessible.",
        "The well-thought-out layout comprises an entrance wardrobe, a generous living kitchen with open city views, a bedroom of approx. 12 m² with access to the mini-terrace, a bathroom, separate WC and the two terraces.",
        "A special feature is the private access concept: from the main entrance and the existing house garage, residents reach the apartment via a lift exclusively accessible to residents of this first rooftop level. A private entrance, private lift access and garage complement this special living concept with a high degree of security, privacy and discretion.",
        "The living rooms feature solid, waxed teak parquet flooring. Heating is provided by gas underfloor heating; the bathroom additionally has electric underfloor heating. An air-conditioning unit provides extra comfort. The energy certificate shows an HWB value of 47.7 kWh/m²a – class B.",
        "The location in the 8th district offers a diverse infrastructure with doctors, educational facilities, local suppliers, craft businesses, cafés, restaurants and cultural institutions. Proximity to the AKH is a further locational advantage. Several underground lines (U2, U3, U5) are within walking distance, making the city centre quickly accessible. The street is planned to be converted into a traffic-calmed meeting zone with additional greenery.",
        "Current operating costs are approx. € 250 per month, and the garage space approx. € 270 per month. A special option is the connection with the neighbouring apartment 34 – ideal for additional uses such as office, practice, guest area or staff area.",
        "The agent acts as a dual agent.",
      ],
    },
    features: {
      de: ["ca. 62,5 m² Wohnfläche", "2 Zimmer", "1. Dachgeschoß", "Jugendstilhaus", "Keine Dachschrägen", "Barrierefrei", "ca. 13 m² Terrasse", "Mini-Terrasse ca. 1,6 m²", "Wohnküche mit Cityblick", "Schlafzimmer ca. 12 m²", "Garderobe", "Badezimmer & separates WC", "Massive Teakparkettböden", "Fußbodenheizung", "Klimagerät", "HWB 47,7 kWh/m²a – Klasse B", "Privater Liftzugang", "Eigener Hauseingang", "Private Garage"],
      en: ["Approx. 62.5 m² living space", "2 rooms", "First rooftop level", "Jugendstil house", "No sloped ceilings", "Barrier-free", "Terrace approx. 13 m²", "Mini-terrace approx. 1.6 m²", "Living kitchen with city view", "Bedroom approx. 12 m²", "Wardrobe", "Bathroom & separate WC", "Solid teak parquet", "Underfloor heating", "Air-conditioning", "HWB 47.7 kWh/m²a – class B", "Private lift access", "Private entrance", "Private garage"],
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
