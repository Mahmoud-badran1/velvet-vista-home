type L = { de: string; en: string };

export const homeCopy = {
  hero: {
    eyebrow: { de: "Private Residenz · Wien Josefstadt", en: "Private Residence · Vienna Josefstadt" },
    title: { de: "DIE KUNST DES LEBENS IN WIEN", en: "THE ART OF LIVING IN VIENNA" },
    subtitle: { de: "Der Ort, an dem Leben Kunst wird.", en: "The place where life becomes art." },
    sub: {
      de: "Vier private Residenzen in der Lange Gasse, über den Dächern des achten Bezirks — zwischen der Stadt und dem Horizont.",
      en: "Four private residences on Lange Gasse, above the rooftops of the eighth district — between the city and the horizon.",
    },
    ctaPrimary: { de: "Die Residenzen", en: "The Residences" },
    ctaFilm: { de: "Den Film ansehen", en: "Watch the Film" },
    scroll: { de: "Nach unten", en: "Scroll to discover" },
  },
  address: {
    eyebrow: { de: "01 — Der Standort", en: "01 — The Location" },
    title: {
      de: "Wo die Stadt Kultur begegnet.\nWo Geschichte auf Morgen trifft.\nWo die Stadt zu Hause wird.",
      en: "Where the city meets culture.\nWhere history meets tomorrow.\nWhere the city meets home.",
    },
    body: {
      de: "Die Josefstadt ist Wiens stillster Bezirk innerhalb des Gürtels — ein Ort, an dem Theater, Buchhandlungen und Kaffeehäuser auf engen Gassen leben. Hier ist Kultur keine Destination, sondern der Alltag. Eine Adresse, die Geschichte und Gegenwart auf einer Straße vereint.",
      en: "Josefstadt is Vienna's quietest district inside the belt — a place where theatres, bookshops and coffee houses live on narrow lanes. Here culture is not a destination, but daily life. An address where history and the present meet on a single street.",
    },
    stats: [
      { label: { de: "Bezirk", en: "District" }, value: { de: "Josefstadt", en: "Josefstadt" } },
      { label: { de: "Residenzen", en: "Residences" }, value: { de: "Vier", en: "Four" } },
    ],
  },
  city: {
    eyebrow: { de: "02 — Die Stadt", en: "02 — The City" },
    title: { de: "Wien, in Gehweite", en: "Vienna, within walking distance" },
    body: {
      de: "Fünf Wahrzeichen, alle in wenigen Minuten erreichbar. Die Stadt ist hier kein Ausblick, sondern Nachbarschaft.",
      en: "Five landmarks, each only minutes away. Here the city is not a view — it is the neighbourhood.",
    },
    walkLabel: { de: "MINUTEN ZU FUß", en: "MINUTES WALK" },
    landmarks: [
      { key: "rathaus", name: { de: "Rathaus", en: "City Hall" }, minutes: 6, phrase: { de: "ZUM RATHAUS", en: "TO THE CITY HALL" } },
      { key: "parliament", name: { de: "Parlament", en: "Parliament" }, minutes: 10, phrase: { de: "ZUM PARLAMENT", en: "TO THE PARLIAMENT" } },
      { key: "university", name: { de: "Universität Wien", en: "University of Vienna" }, minutes: 8, phrase: { de: "ZUR UNIVERSITÄT", en: "TO THE UNIVERSITY" } },
      { key: "opera", name: { de: "Staatsoper", en: "State Opera" }, minutes: 15, phrase: { de: "ZUR OPER", en: "TO THE OPERA" } },
      { key: "stephansdom", name: { de: "Stephansdom", en: "St. Stephen's Cathedral" }, minutes: 18, phrase: { de: "ZUM STEPHANSDOM", en: "TO THE CATHEDRAL" } },
    ],
  },
  cinemas: {
    eyebrow: { de: "03 — Zwei Bilder", en: "03 — Two Cinemas" },
    title: { de: "Auf der einen Seite die Dächer.\nAuf der anderen der Horizont.", en: "On one side the rooftops.\nOn the other the horizon." },
    left: {
      title: { de: "Die Stadt", en: "The City" },
      body: {
        de: "Nach Süden öffnet sich das Ziegelmeer der Innenbezirke: Kupfergrün, Schiefergrau, Türme im Abendlicht.",
        en: "To the south, the tiled sea of the inner districts: copper green, slate grey, spires in the evening light.",
      },
    },
    right: {
      title: { de: "Der Horizont", en: "The Horizon" },
      body: {
        de: "Nach Westen der Wienerwald — eine weiche, blaue Linie, die den Tag beendet, lange bevor die Stadt es tut.",
        en: "To the west, the Vienna Woods — a soft blue line that ends the day long before the city does.",
      },
    },
  },
  view: {
    eyebrow: { de: "04 — Der Ausblick", en: "04 — The View" },
    quote: {
      de: "„Man wohnt hier nicht über der Stadt. Man wohnt mit ihr auf Augenhöhe.“",
      en: "\u201cYou do not live above the city here. You live at eye level with it.\u201d",
    },
  },
  architecture: {
    eyebrow: { de: "05 — Architektur", en: "05 — Architecture" },
    title: { de: "Vom Licht geformt", en: "Shaped by light" },
    body: {
      de: "Die neuen Dachgeschoße folgen keiner Mode. Klare Geometrien, raumhohe Fenster ohne Dachschrägen, ruhige Materialien: heller Stein, geölte Eiche, gebürstetes Messing. Alles, was nicht notwendig war, wurde weggelassen.",
      en: "The new upper floors follow no fashion. Clear geometry, full-height windows without sloping ceilings, quiet materials: pale stone, oiled oak, brushed brass. Everything unnecessary has been left out.",
    },
    points: [
      { de: "Barrierefrei, ohne Dachschrägen", en: "Step-free, no sloping ceilings" },
      { de: "Privater Direktlift in die oberen Ebenen", en: "Private direct lift to the upper levels" },
      { de: "Eigener Hauseingang und Garage", en: "Separate entrance and garage" },
    ],
  },
  interiors: {
    eyebrow: { de: "06 — Interieurs", en: "06 — Interiors" },
    title: { de: "Räume, die leiser werden", en: "Rooms that grow quieter" },
    body: {
      de: "Großzügige Wohnräume, zurückhaltende Küchen, Bäder aus einem einzigen Stein. Die Einrichtung tritt zurück, damit Licht und Ausblick den Ton angeben.",
      en: "Generous living rooms, restrained kitchens, bathrooms cut from a single stone. The interiors step back so light and view can set the tone.",
    },
  },
  details: {
    eyebrow: { de: "07 — Details", en: "07 — Details" },
    title: { de: "Aus der Nähe betrachtet", en: "Seen up close" },
    items: [
      { key: "detailStone", label: { de: "Naturstein", en: "Natural stone" } },
      { key: "detailJoinery", label: { de: "Tageslicht", en: "DAYLIGHT" } },
      { key: "detailLight", label: { de: "Beleuchtung", en: "LIGHTING" } },
    ],
  },
  life: {
    eyebrow: { de: "08 — Das Leben", en: "08 — Life Here" },
    title: { de: "Ein Tag in der Josefstadt", en: "A day in Josefstadt" },
    moments: [
      { time: { de: "07:30", en: "07:30" }, text: { de: "Kaffee auf der Terrasse, bevor die Stadt wach wird.", en: "Coffee on the terrace before the city wakes." } },
      { time: { de: "12:00", en: "12:00" }, text: { de: "Mittag im Kaffeehaus zwei Gassen weiter.", en: "Lunch at the coffee house two lanes away." } },
      { time: { de: "19:00", en: "19:00" }, text: { de: "Vorstellung im Theater in der Josefstadt.", en: "A performance at Theater in der Josefstadt." } },
      { time: { de: "23:00", en: "23:00" }, text: { de: "Stille — und der Horizont in Blau.", en: "Silence — and the horizon in blue." } },
    ],
  },
  residences: {
    eyebrow: { de: "09 — Die Residenzen", en: "09 — The Residences" },
    title: { de: "Vier Charaktere, ein Haus", en: "Four characters, one house" },
    cta: { de: "Alle Residenzen ansehen", en: "View all residences" },
  },
  film: {
    eyebrow: { de: "10 — Der Film", en: "10 — The Film" },
    title: { de: "Manches lässt sich\nnicht fotografieren.", en: "Some things cannot\nbe photographed." },
    body: {
      de: "Ein eigener, ruhiger Film über dieses Haus — Licht, Stille, Stadt. Als eigene Erfahrung gedacht, nicht als Hintergrund.",
      en: "A separate, quiet film about this house — light, silence, city. Made as its own experience, not as a backdrop.",
    },
    cta: { de: "Den Film ansehen", en: "Watch the Film" },
  },
  closing: {
    eyebrow: { de: "11 — Besichtigung", en: "11 — Private Viewing" },
    title: { de: "Diskret. Nach Vereinbarung.", en: "Discreet. By appointment." },
    body: {
      de: "Wir zeigen die Residenzen persönlich und in Ruhe. Schreiben Sie uns.",
      en: "We show the residences personally and without haste. Write to us.",
    },
    cta: { de: "Besichtigung anfragen", en: "Request a viewing" },
  },
} as const;

export type Loc = L;
