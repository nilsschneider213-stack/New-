/*
 * ============================================================
 *  DEINE WOHNUNGEN
 *  Alle Texte sind Beispieltexte – bitte an deine echten Wohnungen anpassen.
 *
 *  Bilder: Lege die Fotos in den Ordner images/wohnungen/<id>/
 *  (Vorschaubilder für die Galerie in images/wohnungen/<id>/thumbs/)
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
    slug: "ferienwohnung-regensburg-penthouse-orange", // eigene Seite: ferienwohnung-regensburg-penthouse-orange.html
    city: "regensburg",
    name: "Penthouse Orange",
    tagline: "Penthouse mit Dachterrasse und Blick bis zum Dom",
    type: ["ferien"],
    guests: 4, // in Smoobu derzeit 5 – bitte prüfen
    bedrooms: 2,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg"],
    // Bildbeschreibungen (gleiche Reihenfolge wie images) – wichtig für Google
    captions: [
      "Dachterrasse mit Lounge, Esstisch und Grill",
      "Sonnenuntergang auf der Dachterrasse mit Blick zum Regensburger Dom",
      "Essbereich mit Sonnenuntergang über Regensburg",
      "Wohnbereich mit Ledersofa und Blick über die Dächer",
      "Gemütliche Sofaecke mit Bogenlampe",
      "Ledersofa mit Bogenlampe – Blick durch den Wandspiegel",
      "Wohnbereich mit Pflanzen und Kunstdrucken",
      "Offener Wohn- und Essbereich",
      "Offener Wohn- und Essbereich am Abend",
      "Esstisch mit Abendrot über den Dächern",
      "Essbereich mit Balkontür zur blauen Stunde",
      "Esstisch für sechs Personen mit Blick auf die Dachterrasse",
      "Essbereich mit Massivholztisch",
      "Essbereich mit Kinderhochstuhl und Zugang zur Terrasse",
      "Küche mit Spülmaschine, Kaffeemaschine, Toaster und Wasserkocher",
      "Küche mit Backofen und Ceranfeld",
      "Schlafzimmer 1 mit Doppelbett",
      "Doppelbett mit Akzentwand",
      "Schlafzimmer 1 mit Kommode",
      "Schlafzimmer 1 mit Smart-TV und Babybett",
      "Smart-TV mit Streaming-Apps und Babybett",
      "Frisch bezogenes Bett",
      "Schlafzimmer 2 mit Doppelbett",
      "Schlafzimmer 2 mit Kommode",
      "Schlafzimmer 2 mit Smart-TV",
      "Schlafzimmer 2 mit Akzentwand",
      "Schlafzimmer 2 – Blick auf das Bett",
      "Doppelbett mit Nachttischlampe",
      "Schlafzimmer 2 mit Spiegel",
      "Kommode im Schlafzimmer 2",
      "Badezimmer mit Badewanne",
      "Badezimmer mit Dusche",
      "Arbeitsplatz mit Schreibtisch und Balkontür",
      "Garderobe im Flur"
    ],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Sonnenuntergang über den Dächern von Regensburg: Das Penthouse Orange bietet eine eigene Dachterrasse mit Blick bis zu den Türmen des Doms – für bis zu 4 Gäste.",
      "Mit kostenlosem Parkplatz, Arbeitsplatz, Spülmaschine und Smart-TV ist es ideal für Paare, kleine Familien und Geschäftsreisende."
    ],
    amenities: ["Große Dachterrasse mit Lounge & Grill", "Kostenloser Parkplatz", "Arbeitsplatz", "2 Schlafzimmer mit Doppelbett", "Voll ausgestattete Küche mit Backofen", "Spülmaschine", "Kaffeemaschine, Toaster & Wasserkocher", "Bad mit Badewanne & Dusche", "Smart-TV & Streaming", "Babybett & Kinderhochstuhl", "Bügeleisen", "Handtücher & Bettwäsche"],
    smoobuId: "3553926",
    calendarHash: ""
  },
  {
    id: "stadtvilla",
    slug: "ferienwohnung-regensburg-stadtvilla", // eigene Seite: ferienwohnung-regensburg-stadtvilla.html
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
    slug: "ferienwohnung-bamberg-penthouse-weide", // eigene Seite: ferienwohnung-bamberg-penthouse-weide.html
    city: "bamberg",
    name: "Penthouse Weide",
    tagline: "Lichtdurchflutetes Penthouse mit Balkon und Blick über Bamberg – bis zu 6 Gäste",
    type: ["ferien"],
    guests: 6,
    bedrooms: null,
    beds: null,
    size: null,
    priceFrom: null,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"],
    captions: [
      "Offener Wohn- und Essbereich mit Holzbalken und Panoramafenster",
      "Balkon mit Sitzgelegenheit und Blick über Bamberg",
      "Wohnzimmer mit Natursteinwand und Smart-TV",
      "Gedeckter Esstisch für sechs Personen mit Kinderhochstuhl",
      "Moderne Küche mit Kochinsel unter dem Dachgebälk",
      "Küchenzeile mit Dachfenster und Spülmaschine",
      "Bartheke mit Barhockern",
      "Kaffeemaschine, Wasserkocher und Toaster",
      "Einbau-Backofen",
      "Schlafzimmer mit Doppelbett und Mooswand",
      "Badezimmer mit Badewanne",
      "Waschtisch im Badezimmer",
      "Blick vom Balkon über die Dächer von Bamberg"
    ],
    video: "", // Roomtour: YouTube-/Vimeo-Link oder Datei, z. B. "images/wohnungen/<id>/roomtour.mp4"
    description: [
      "Wohnen über den Dächern von Bamberg: Das Penthouse Weide begeistert mit offenem Wohn- und Essbereich, sichtbarem Holzgebälk, großen Panoramafenstern und eigenem Balkon mit Blick über die Stadt – Platz für bis zu 6 Gäste.",
      "Die moderne Küche mit Kochinsel und Bartheke, das gemütliche Wohnzimmer mit Natursteinwand und das Schlafzimmer mit grüner Mooswand machen den Aufenthalt besonders. Das UNESCO-Welterbe mit Altem Rathaus, Klein-Venedig und Dom liegt ganz in der Nähe."
    ],
    amenities: ["Bis zu 6 Personen", "Balkon mit Stadtblick", "Küche mit Kochinsel & Bartheke", "Backofen & Spülmaschine", "Kaffeemaschine, Wasserkocher & Toaster", "Smart-TV & Streaming", "Esstisch für 6 Personen", "Kinderhochstuhl", "Bad mit Badewanne", "Handtücher & Bettwäsche", "Endreinigung inklusive"],
    smoobuId: "2842573",
    calendarHash: ""
  },
  {
    id: "penthouse-eiche",
    slug: "ferienwohnung-bamberg-penthouse-eiche", // eigene Seite: ferienwohnung-bamberg-penthouse-eiche.html
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
    slug: "monteurwohnung-coburg-herzstueck", // eigene Seite: monteurwohnung-coburg-herzstueck.html
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
    slug: "ferienwohnung-coburg-studio-vesteblick", // eigene Seite: ferienwohnung-coburg-studio-vesteblick.html
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
