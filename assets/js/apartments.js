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
 *  type: "ferien" = Ferienwohnung, "monteur" = Monteurwohnung,
 *        beide möglich: ["ferien", "monteur"]
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
  {
    id: "coburg-altstadt",
    city: "coburg",
    name: "Altstadt-Apartment Coburg",
    tagline: "Stilvoll wohnen, wenige Schritte vom Marktplatz",
    type: ["ferien"],
    guests: 2,
    bedrooms: 1,
    beds: "1 Doppelbett",
    size: 45,
    priceFrom: null, // z. B. 79 → zeigt „ab 79 € / Nacht“
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unser Altstadt-Apartment liegt ruhig und doch zentral – Marktplatz, Ehrenburg und Hofgarten erreichen Sie bequem zu Fuß.",
      "Die Wohnung ist hell und modern eingerichtet, mit voll ausgestatteter Küche, gemütlichem Wohnbereich und einem Schlafzimmer mit komfortablem Doppelbett. Ideal für Paare, Städtereisende und Geschäftsreisende."
    ],
    amenities: ["WLAN", "Voll ausgestattete Küche", "Kaffeemaschine", "Smart-TV", "Bettwäsche & Handtücher", "Self-Check-in", "Nichtraucher"],
    smoobuUrl: ""
  },
  {
    id: "coburg-monteur",
    city: "coburg",
    name: "Monteurwohnung Coburg",
    tagline: "Praktisch, ruhig und mit Parkplatz – ideal für Teams",
    type: ["monteur", "ferien"],
    guests: 4,
    bedrooms: 2,
    beds: "4 Einzelbetten",
    size: 68,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Die Wohnung ist perfekt für Handwerker, Monteure und Projektteams: zwei Schlafzimmer mit Einzelbetten, große Küche mit Esstisch und eine Waschmaschine für längere Aufenthalte.",
      "Parkmöglichkeiten direkt am Haus, gute Anbindung an die B4 und A73. Rechnung für Firmen selbstverständlich möglich."
    ],
    amenities: ["WLAN", "Parkplatz", "Waschmaschine", "Voll ausgestattete Küche", "Einzelbetten", "Rechnung für Firmen", "Langzeitmiete möglich"],
    smoobuUrl: ""
  },
  {
    id: "bamberg-welterbe",
    city: "bamberg",
    name: "Welterbe-Suite Bamberg",
    tagline: "Mittendrin im UNESCO-Welterbe",
    type: ["ferien"],
    guests: 3,
    bedrooms: 1,
    beds: "1 Doppelbett, 1 Schlafsofa",
    size: 52,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Erleben Sie Bamberg hautnah: Altes Rathaus, Klein-Venedig und der Dom liegen in unmittelbarer Nähe. Abends locken die traditionsreichen Brauereigaststätten.",
      "Die Suite verbindet historisches Flair mit modernem Komfort – mit hochwertigem Doppelbett, Schlafsofa für eine dritte Person und einer offenen Küche."
    ],
    amenities: ["WLAN", "Küche", "Kaffeemaschine", "Smart-TV", "Bettwäsche & Handtücher", "Self-Check-in", "Altstadtlage"],
    smoobuUrl: ""
  },
  {
    id: "bamberg-regnitz",
    city: "bamberg",
    name: "Apartment an der Regnitz",
    tagline: "Großzügig wohnen für Familien und Arbeitsteams",
    type: ["ferien", "monteur"],
    guests: 4,
    bedrooms: 2,
    beds: "1 Doppelbett, 2 Einzelbetten",
    size: 72,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Viel Platz für Familien, Freunde oder Kollegen: zwei separate Schlafzimmer, ein großer Wohn-Essbereich und ein modernes Bad.",
      "Die Lage nahe der Regnitz verbindet Ruhe mit kurzen Wegen in die Innenstadt und zu den Gewerbegebieten."
    ],
    amenities: ["WLAN", "Parkplatz", "Waschmaschine", "Voll ausgestattete Küche", "Familienfreundlich", "Rechnung für Firmen"],
    smoobuUrl: ""
  },
  {
    id: "regensburg-domblick",
    city: "regensburg",
    name: "Apartment Domblick Regensburg",
    tagline: "Altstadt-Charme mit Blick auf die Domtürme",
    type: ["ferien"],
    guests: 2,
    bedrooms: 1,
    beds: "1 Doppelbett",
    size: 40,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Steinerne Brücke, Dom St. Peter und die Donaupromenade – alles direkt vor der Haustür. Das ideale Zuhause für einen Städtetrip nach Regensburg.",
      "Liebevoll eingerichtet mit Doppelbett, Kochnische und Arbeitsplatz – auch für Geschäftsreisende bestens geeignet."
    ],
    amenities: ["WLAN", "Kochnische", "Arbeitsplatz", "Smart-TV", "Bettwäsche & Handtücher", "Self-Check-in"],
    smoobuUrl: ""
  },
  {
    id: "regensburg-business",
    city: "regensburg",
    name: "Serviced Apartment Regensburg",
    tagline: "Für längere Aufenthalte, Projekte und Montage",
    type: ["monteur", "ferien"],
    guests: 4,
    bedrooms: 2,
    beds: "4 Einzelbetten",
    size: 65,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    description: [
      "Unser Serviced Apartment ist auf längere Aufenthalte ausgelegt: separate Schlafzimmer, schnelles WLAN, Waschmaschine und eine Küche, in der man wirklich kochen kann.",
      "Gute Erreichbarkeit der großen Arbeitgeber und Industriegebiete Regensburgs. Wöchentliche Reinigung auf Wunsch."
    ],
    amenities: ["Schnelles WLAN", "Parkplatz", "Waschmaschine", "Voll ausgestattete Küche", "Reinigungsservice", "Rechnung für Firmen", "Langzeitmiete möglich"],
    smoobuUrl: ""
  }
];
