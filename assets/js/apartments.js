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
 *  Roomtour-Video: bei "video" einen YouTube- oder Vimeo-Link eintragen
 *  (z. B. "https://youtu.be/abc123XYZ00") oder eine eigene Videodatei
 *  (z. B. "images/wohnungen/stadtvilla/roomtour.mp4").
 *
 *  Felder mit null (z. B. size, beds) werden auf der Website einfach
 *  ausgeblendet, bis du sie einträgst.
 *
 *  Smoobu: smoobuId = Wohnungs-ID in Smoobu (Buchungstool für genau diese
 *  Wohnung), calendarHash = optionaler Code aus dem Kalender-Widget
 *  (siehe README.md, Abschnitt „Smoobu verbinden“).
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
  /* ---------------- REGENSBURG ---------------- */
  {
    id: "penthouse-orange",
    city: "regensburg",
    name: "Penthouse Orange",
    tagline: "Penthouse mit Dachterrasse und Blick bis zum Dom",
    type: ["ferien"],
    guests: 4, // in Smoobu derzeit 5 – bitte prüfen
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Sonnenuntergang über den Dächern von Regensburg: Das Penthouse Orange bietet eine eigene Dachterrasse mit Blick bis zu den Türmen des Doms – für bis zu 4 Gäste.",
      "Mit kostenlosem Parkplatz, Arbeitsplatz, Spülmaschine und Smart-TV ist es ideal für Paare, kleine Familien und Geschäftsreisende."
    ],
    amenities: ["Dachterrasse / Balkon", "Kostenloser Parkplatz", "Arbeitsplatz", "Küche mit Grundausstattung", "Spülmaschine", "Kaffeemaschine", "Smart-TV & Streaming", "Kinderhochstuhl", "Bügeleisen", "Handtücher & Bettwäsche"],
    smoobuId: "3553926",
    calendarHash: ""
  },
  {
    id: "stadtvilla",
    city: "regensburg",
    name: "Die Stadtvilla",
    tagline: "Große Altstadtwohnung mit 3 Schlafzimmern für bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6, // in Smoobu derzeit 7 – bitte prüfen
    bedrooms: 3,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Die Stadtvilla ist unsere große Wohnung in Regensburg: drei Schlafzimmer, ein großzügiger Wohnbereich mit Billardtisch und viel Platz für Familien, Freundesgruppen und Teams – bis zu 6 Gäste.",
      "Kostenloser Parkplatz auf dem Grundstück, Arbeitsplatz, Spülmaschine und Soundsystem sorgen für Komfort. Cafés, Restaurants, der Dom und die Donau sind schnell erreicht."
    ],
    amenities: ["3 Schlafzimmer", "Kostenloser Parkplatz", "Billardtisch", "Arbeitsplatz", "Küche mit Grundausstattung", "Spülmaschine", "Smart-TV & Soundsystem", "Rollstuhlgerecht", "Nichtraucherunterkunft", "Handtücher & Bettwäsche"],
    smoobuId: "2485178",
    calendarHash: ""
  },

  /* ---------------- BAMBERG ---------------- */
  {
    id: "penthouse-weide",
    city: "bamberg",
    name: "Penthouse Weide",
    tagline: "Lichtdurchflutetes Penthouse mit Balkon für bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Wohnen über den Dächern von Bamberg: Das Penthouse Weide begeistert mit offenem Wohn- und Essbereich, sichtbarem Holzgebälk und großen Fensterfronten mit Blick über die Stadt – Platz für bis zu 6 Gäste.",
      "Das UNESCO-Welterbe mit Altem Rathaus, Klein-Venedig und Dom sowie die berühmte Bamberger Bierkultur liegen ganz in Ihrer Nähe. Die Wohnung ist voll ausgestattet und bezugsfertig."
    ],
    amenities: ["Bis zu 6 Personen", "Großer Essbereich", "Voll ausgestattete Küche", "Handtücher & Bettwäsche", "Endreinigung inklusive", "Ideal für Familien & Gruppen"],
    smoobuId: "2842573",
    calendarHash: ""
  },
  {
    id: "penthouse-eiche",
    city: "bamberg",
    name: "Penthouse Eiche",
    tagline: "Stilvolles Penthouse mit offener Küche für bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Das Penthouse Eiche verbindet modernes Design mit dem Charme alter Holzbalken: offene Küche, großer Esstisch und viel Licht – Platz für bis zu 6 Gäste.",
      "Ideal für Familien, Freundesgruppen und längere Aufenthalte in Bamberg. Sauber, liebevoll eingerichtet und voll ausgestattet."
    ],
    amenities: ["Bis zu 6 Personen", "Offene Küche", "Großer Esstisch", "Handtücher & Bettwäsche", "Endreinigung inklusive", "Ideal für Familien & Gruppen"],
    smoobuId: "2847177",
    calendarHash: ""
  },

  /* ---------------- COBURG ---------------- */
  {
    id: "herzstueck-coburg",
    city: "coburg",
    name: "Herzstück Coburg",
    tagline: "Unsere Monteurwohnung in Coburg – bis zu 6 Personen",
    type: ["monteur"],
    guests: 6,
    bedrooms: null,
    beds: null, // z. B. "6 Einzelbetten"
    size: null, // m²
    priceFrom: null, // z. B. 79 → zeigt „ab 79 € / Nacht“
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Das Herzstück Coburg ist unsere Monteurwohnung für Handwerker, Monteure und Projektteams – mit Platz für bis zu 6 Personen und für Einsätze von wenigen Nächten bis zu mehreren Monaten.",
      "Die Wohnung ist voll ausgestattet, sauber und bezugsfertig, sodass Ihr Team nach Feierabend einfach ankommen und sich erholen kann. Rechnung auf Firma selbstverständlich möglich."
    ],
    amenities: ["Bis zu 6 Personen", "Voll ausgestattet", "Handtücher & Bettwäsche", "Endreinigung inklusive", "Rechnung für Firmen", "Langzeitmiete möglich"],
    smoobuId: "2636538",
    calendarHash: ""
  },
  {
    id: "studio-vesteblick",
    city: "coburg",
    name: "Studio mit Balkon & Vesteblick",
    tagline: "Gemütliches Studio mit Balkon und Blick auf die Veste Coburg",
    type: ["ferien"],
    guests: 3,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg"],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Unser helles Studio-Apartment unter dem Dach verbindet Wohnen und Schlafen in einem offen gestalteten, modern eingerichteten Raum – mit eigenem Balkon und Blick auf die Veste Coburg.",
      "Mit Küche, Waschmaschine, Trockner und Smart-TV ist es ideal für Städtereisende, Paare und Geschäftsreisende, die Coburg entdecken oder hier arbeiten."
    ],
    amenities: ["Balkon / Terrasse", "WLAN", "Küche mit Grundausstattung", "Kaffeemaschine & Wasserkocher", "Waschmaschine & Trockner", "Smart-TV & Streaming", "Föhn", "Handtücher & Bettwäsche", "Shampoo & Seife"],
    smoobuId: "2428678",
    calendarHash: ""
  }
];
