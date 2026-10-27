/*
 * ============================================================
 *  GREEN TREE HOMES – ZENTRALE EINSTELLUNGEN
 *  Hier trägst du deine Firmendaten und die Smoobu-Links ein.
 * ============================================================
 */
window.GTH_CONFIG = {
  company: {
    name: "Green Tree Homes",
    owner: "[Vorname Nachname]",
    street: "[Straße Hausnummer]",
    zipCity: "[PLZ Ort]",
    phone: "[+49 000 000000]",
    email: "info@greentreehomes.de", // [PLATZHALTER] – deine echte E-Mail-Adresse eintragen
    whatsapp: "" // optional, z. B. "4915112345678" (ohne + und Leerzeichen)
  },

  /*
   * SMOOBU-INTEGRATION
   * In Smoobu: Einstellungen → Buchungstool (bzw. "Website") → Integration/Einbetten.
   * Dort findest du einen Link der Form
   *   https://login.smoobu.com/de/booking-tool/iframe/123456
   * Diesen hier als "bookingToolUrl" eintragen. Für einzelne Wohnungen kannst du
   * zusätzlich in assets/js/apartments.js bei jeder Wohnung "smoobuUrl" setzen
   * (Link des Buchungstools, gefiltert auf diese eine Wohnung).
   */
  smoobu: {
    bookingToolUrl: "", // z. B. "https://login.smoobu.com/de/booking-tool/iframe/123456"
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
