# GreenTree Homes – Website

Buchungswebsite für die Ferienwohnungen, Monteurwohnungen und Serviced Apartments von GreenTree Homes in **Coburg, Bamberg und Regensburg**.

Die Seite ist eine statische Website (HTML/CSS/JavaScript) ohne Build-Schritt. Sie läuft bei jedem Webhoster (z. B. IONOS, Strato, All-Inkl, Netlify, GitHub Pages): einfach alle Dateien hochladen.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit Suche (Stadt, Anreise, Abreise, Gäste), Städten, allen Wohnungen |
| `wohnungen.html` | Alle Wohnungen mit Filtern nach Stadt, Wohnungsart und Gästezahl |
| `wohnung.html?id=…` | Detailseite je Wohnung: Galerie, Beschreibung, Ausstattung, Smoobu-Kalender |
| `buchen.html` | Smoobu-Buchungstool für alle Wohnungen |
| `monteurwohnungen.html` | Angebot für Handwerker, Monteure und Firmen |
| `partner.html` | Für Eigentümer leerer Gewerbeflächen und für Investoren (Langzeitmieter) |
| `kontakt.html` | Kontakt- und Anfrageformular |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtliche Seiten (Vorlagen) |

## Was du anpassen musst

### 1. Firmendaten – `assets/js/config.js`
Name, Anschrift, Telefon und E-Mail eintragen. Header, Footer und Kontaktseite übernehmen sie automatisch.

### 2. Smoobu-Buchungskalender – `assets/js/config.js`
1. In Smoobu: **Einstellungen → Buchungstool / Website → Einbinden** öffnen.
2. Den Link der Form `https://login.smoobu.com/de/booking-tool/iframe/123456` kopieren.
3. In `config.js` bei `bookingToolUrl` eintragen.
4. Optional: Für jede Wohnung in `assets/js/apartments.js` bei `smoobuUrl` den Buchungstool-Link für genau diese Wohnung eintragen. Ist er leer, wird auf der Detailseite das allgemeine Buchungstool gezeigt.

Solange kein Link eingetragen ist, sehen Gäste statt des Kalenders den Button „Unverbindlich anfragen“.

Der Kalender wird erst geladen, wenn der Besucher auf „Kalender anzeigen“ klickt (Zwei-Klick-Lösung, DSGVO-konform). Darum braucht die Seite keinen Cookie-Banner: Sie setzt selbst keine Cookies, nutzt kein Tracking und lädt keine Google Fonts.

### 3. Wohnungen – `assets/js/apartments.js`
Alle Texte sind **Beispieltexte**. Bitte Name, Beschreibung, Größe, Betten, Ausstattung und (optional) `priceFrom` an die echten Wohnungen anpassen.

### 4. Fotos
```
images/hero.jpg                          ← großes Titelbild der Startseite (optional)
images/staedte/coburg.jpg                ← Bilder der Städte-Kacheln
images/staedte/bamberg.jpg
images/staedte/regensburg.jpg
images/wohnungen/coburg-altstadt/1.jpg   ← 1.jpg ist das Titelbild der Wohnung
images/wohnungen/coburg-altstadt/2.jpg
…
```
Die Ordnernamen entsprechen der `id` in `apartments.js`. Fehlt ein Foto, erscheint automatisch ein Platzhalter. Empfehlung: Querformat, ca. 1600 px breit, als JPG komprimiert (unter 400 KB).

### 5. Kontaktformulare
Ohne Server öffnen die Formulare das E-Mail-Programm des Besuchers. Damit die Formulare Nachrichten direkt verschicken, bei einem Dienst wie [Formspree](https://formspree.io) oder [Web3Forms](https://web3forms.com) ein Formular anlegen und die Endpoint-URL in `config.js` bei `formEndpoint` eintragen. Den Dienst anschließend in der Datenschutzerklärung ergänzen.

### 6. Rechtstexte
In `impressum.html`, `datenschutz.html` und `agb.html` sind alle Stellen zum Ausfüllen **gelb markiert**. Die Texte sind Vorlagen und ersetzen keine Rechtsberatung. Bitte vor dem Livegang prüfen lassen (z. B. über einen Rechtstext-Dienst oder einen Anwalt) und danach den gelben Hinweiskasten oben auf den Seiten entfernen.

## Lokal ansehen
```bash
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```
