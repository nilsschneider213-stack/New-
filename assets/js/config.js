/*
 * ============================================================
 *  GREEN TREE HOMES – ZENTRALE EINSTELLUNGEN
 *  Hier trägst du deine Firmendaten und die Smoobu-Links ein.
 * ============================================================
 */
window.GTH_CONFIG = {
  company: {
    name: "GreenTree Homes",
    owner: "Nils Schneider",
    legalName: "Nils Schneider CN Einzelunternehmen",
    street: "Keplerstraße 20",
    zipCity: "93047 Regensburg",
    phone: "+49 1575 7309729",
    email: "hosting@nilsschneidercn.de",
    whatsapp: "" // optional, z. B. "4915112345678" (ohne + und Leerzeichen)
  },

  /*
   * SMOOBU-INTEGRATION (Buchungstool + Belegungskalender)
   * customerId: deine Smoobu-Kundennummer. Sie steht im Einbettungscode des
   * Buchungstools, z. B. ".../booking-tool/iframe/123456" → "123456".
   * Die Wohnungs-IDs und Kalender-Codes stehen in assets/js/apartments.js.
   * Anleitung: siehe README.md, Abschnitt „Smoobu verbinden“.
   */
  smoobu: {
    customerId: "1066393",
    baseUrl: "https://login.smoobu.com"
  },

  /*
   * KONTAKTFORMULARE
   * Ohne eigenen Server können Formulare über einen Dienst wie Formspree,
   * Web3Forms o. ä. verschickt werden. Trage hier die Endpoint-URL ein
   * (z. B. "https://formspree.io/f/abcdwxyz").
   * Bleibt das Feld leer, öffnet das Formular das E-Mail-Programm des Besuchers.
   * Hinweis: Den genutzten Dienst in der Datenschutzerklärung ergänzen!
   */
  formEndpoint: ""
};
