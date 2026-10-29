/*
 * ============================================================
 *  DEINE WOHNUNGEN
 *  Alle Texte sind Beispieltexte – bitte an deine echten Wohnungen anpassen.
 *
 *  Bilder: Lege die Fotos in den Ordner images/wohnungen/<id>/
 *  (z. B. images/wohnungen/coburg-altstadt/1.jpg, 2.jpg, …) und trage die
 *  Dateinamen unten bei "images" ein. Fehlt ein Foto, erscheint automatisch
 *  ein Platzhalter.
 *
 *  type: "ferien" = Ferienwohnung / Serviced Apartment,
 *        "monteur" = Monteurwohnung, beide möglich: ["ferien", "monteur"]
 *
 *  Felder mit null (z. B. size, beds) werden auf der Website einfach
 *  ausgeblendet, bis du sie einträgst.
 *
 *  Smoobu: smoobuId = Wohnungs-ID in Smoobu, calendarHash = Code aus dem
 *  Kalender-Widget (siehe README.md, Abschnitt „Smoobu verbinden“).
 * ============================================================
 */
window.GTH_CITIES = [
  {
    id: "coburg",
    name: "Coburg",
    teaser: "Residenzstadt mit Veste, Hofgarten und fränkischer Gemütlichkeit.",
    image: "images/staedte/coburg.jpg"
  },
  {
    id: "bamberg",
    name: "Bamberg",
    teaser: "UNESCO-Welterbe, Klein-Venedig und die berühmte Bierkultur.",
    image: "images/staedte/bamberg.jpg"
  },
  {
    id: "regensburg",
    name: "Regensburg",
    teaser: "Mittelalterliche Altstadt an der Donau – lebendig und historisch.",
    image: "images/staedte/regensburg.jpg"
  }
];

window.GTH_APARTMENTS = [
  /* ---------------- COBURG ---------------- */
  {
    id: "coburg-monteurwohnung",
    city: "coburg",
    name: "Monteurwohnung Coburg",
    tagline: "Praktisch und komfortabel – ideal für Handwerker und Teams",
    type: ["monteur"],
    guests: null, // [BITTE EINTRAGEN] max. Gäste
    bedrooms: null,
    beds: null, // z. B. "4 Einzelbetten"
    size: null, // m²
    priceFrom: null, // z. B. 79 → zeigt „ab 79 € / Nacht“
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unsere Monteurwohnung in Coburg ist auf die Bedürfnisse von Handwerkern, Monteuren und Projektteams ausgelegt – für Einsätze von wenigen Nächten bis zu mehreren Monaten.",
      "Die Wohnung ist voll ausgestattet und bezugsfertig, sodass Ihr Team nach Feierabend einfach ankommen und sich erholen kann. Rechnung auf Firma selbstverständlich möglich."
    ],
    amenities: ["Voll ausgestattete Küche", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Rechnung für Firmen", "Langzeitmiete möglich", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  },
  {
    id: "coburg-studio",
    city: "coburg",
    name: "Studio-Apartment Coburg",
    tagline: "Kompakt, modern und gemütlich – perfekt für Paare und Geschäftsreisende",
    type: ["ferien"],
    guests: null, // [BITTE EINTRAGEN]
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unser Studio-Apartment in Coburg verbindet Wohnen und Schlafen in einem offen gestalteten, modern eingerichteten Raum – ideal für Städtereisende und Geschäftsreisende.",
      "Ob Veste Coburg, Schloss Ehrenburg oder der historische Marktplatz: Die Residenzstadt lädt zum Entdecken ein. Nach einem langen Tag erwartet Sie ein sauberes, liebevoll eingerichtetes Zuhause auf Zeit."
    ],
    amenities: ["Voll ausgestattet", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  },

  /* ---------------- BAMBERG ---------------- */
  {
    id: "bamberg-penthouse-1",
    city: "bamberg",
    name: "Penthouse Bamberg I",
    tagline: "Großzügiges Penthouse für bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Wohnen über den Dächern von Bamberg: Unser Penthouse bietet viel Platz für Familien, Freundesgruppen und Geschäftsreisende – für bis zu 6 Gäste.",
      "Das UNESCO-Welterbe mit Altem Rathaus, Klein-Venedig und Dom sowie die berühmte Bamberger Bierkultur liegen ganz in Ihrer Nähe. Die Wohnung ist voll ausgestattet und bezugsfertig für Sie."
    ],
    amenities: ["Voll ausgestattete Küche", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Ideal für Gruppen & Familien", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  },
  {
    id: "bamberg-penthouse-2",
    city: "bamberg",
    name: "Penthouse Bamberg II",
    tagline: "Stilvolles Penthouse mit Platz für bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unser zweites Penthouse in Bamberg bietet ebenfalls reichlich Platz für bis zu 6 Gäste – ideal für Familien, Gruppen und längere Aufenthalte.",
      "Modern und liebevoll eingerichtet, sauber und voll ausgestattet: Hier können Sie Bamberg in vollen Zügen genießen und abends entspannt nach Hause kommen."
    ],
    amenities: ["Voll ausgestattete Küche", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Ideal für Gruppen & Familien", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  },

  /* ---------------- REGENSBURG ---------------- */
  {
    id: "regensburg-penthouse",
    city: "regensburg",
    name: "Penthouse Regensburg",
    tagline: "Modernes Penthouse für bis zu 4 Gäste",
    type: ["ferien"],
    guests: 4,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unser Penthouse in Regensburg bietet modernen Wohnkomfort für bis zu 4 Gäste – perfekt für Paare, kleine Familien oder Geschäftsreisende.",
      "Dom St. Peter, die Steinerne Brücke und die lebendige Altstadt an der Donau sind ideale Ausflugsziele. Ihr voll ausgestattetes Apartment erwartet Sie bezugsfertig."
    ],
    amenities: ["Voll ausgestattete Küche", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  },
  {
    id: "regensburg-altstadt",
    city: "regensburg",
    name: "Große Altstadtwohnung Regensburg",
    tagline: "3 Schlafzimmer für bis zu 6 Gäste – mitten im Welterbe",
    type: ["ferien"],
    guests: 6,
    bedrooms: 3,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unsere große Altstadtwohnung in Regensburg bietet mit drei Schlafzimmern viel Platz und Privatsphäre für bis zu 6 Gäste – ideal für Familien, Freundesgruppen und Teams.",
      "Wohnen Sie mitten in der UNESCO-Welterbe-Altstadt: Cafés, Restaurants, der Dom und die Donau sind bequem zu Fuß erreichbar. Die Wohnung ist voll ausgestattet und liebevoll eingerichtet."
    ],
    amenities: ["3 Schlafzimmer", "Voll ausgestattete Küche", "Bettwäsche & Handtücher", "Endreinigung inklusive", "Altstadtlage", "Nichtraucherwohnung"],
    smoobuId: "",
    calendarHash: ""
  }
];
