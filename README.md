# GreenTree Homes – Website

Buchungswebsite für die Ferienwohnungen, Monteurwohnungen und Serviced Apartments von GreenTree Homes in **Coburg, Bamberg und Regensburg**.

Die Seite ist eine statische Website (HTML/CSS/JavaScript) ohne Build-Schritt. Sie läuft bei jedem Webhoster (z. B. IONOS, Strato, All-Inkl, Netlify, GitHub Pages): einfach alle Dateien hochladen.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit Schnellauswahl (1. Stadt, 2. Ferienwohnung/Serviced Apartment oder Monteurwohnung, Reisedaten), Städten, allen Wohnungen |
| `wohnungen.html` | Alle Wohnungen mit Filtern nach Stadt, Wohnungsart und Gästezahl |
| `wohnung.html?id=…` | Detailseite je Wohnung: Galerie, Beschreibung, Ausstattung, Smoobu-Belegungskalender und Buchungstool |
| `ueber-uns.html` | Über GreenTree Homes |
| `buchen.html` | Smoobu-Buchungstool für alle Wohnungen |
| `monteurwohnungen.html` | Angebot für Handwerker, Monteure und Firmen |
| `partner.html` | Für Eigentümer leerer Gewerbeflächen und für Investoren (Langzeitmieter) |
| `kontakt.html` | Kontakt- und Anfrageformular |
| `impressum.html`, `datenschutz.html`, `agb.html` | Rechtliche Seiten (Vorlagen) |

## Was du anpassen musst

### 1. Firmendaten – `assets/js/config.js`
Name, Anschrift, Telefon und E-Mail eintragen. Header, Footer und Kontaktseite übernehmen sie automatisch.

### 2. Smoobu verbinden (Buchungstool + Belegungskalender)
Die Website zeigt pro Wohnung zwei Dinge von Smoobu an: den **Belegungskalender** (freie/belegte Tage) und das **Buchungstool** (Gäste wählen Daten, sehen den Preis und buchen direkt). Auf `buchen.html` erscheint das Buchungstool für alle Wohnungen.

Dafür werden nur drei Angaben gebraucht:

| Angabe | Wo in Smoobu | Wohin |
|---|---|---|
| **Direkt-Link des Buchungstools** | Öffnet man das Buchungstool von Smoobu, steht in der Adresszeile z. B. `https://booking.smoobu.com/9A1066393`. | `assets/js/config.js` → `bookingUrl` |
| **Kundennummer** (Alternative) | Einbettungscode des Buchungstools (Menü „Website“ bzw. „Buchungstool“ → Einbinden). Im Code steht `.../booking-tool/iframe/123456` – die Zahl ist die Kundennummer. | `assets/js/config.js` → `customerId` |
| **Wohnungs-ID** je Wohnung | Im Code des Kalender-Widgets bzw. in der Adresszeile, wenn man die Wohnung in Smoobu bearbeitet. | `assets/js/apartments.js` → `smoobuId` |
| **Kalender-Code** je Wohnung | Einbettungscode des Verfügbarkeitskalenders / Kalender-Widgets: der lange Code nach `data-verification="..."` bzw. am Ende von `.../show-calendar-iframe/ID/CODE`. | `assets/js/apartments.js` → `calendarHash` |

Am einfachsten: Die Einbettungscodes aus Smoobu kopieren und an Claude schicken – die Werte werden dann eingetragen.

Fehlen die Angaben, sehen Gäste stattdessen „Unverbindlich anfragen“. Der Smoobu-Inhalt wird erst nach Klick auf „Kalender anzeigen“ geladen (Zwei-Klick-Lösung, DSGVO-konform). Darum braucht die Seite keinen Cookie-Banner: Sie setzt selbst keine Cookies, nutzt kein Tracking und lädt keine Google Fonts.

### 3. Wohnungen – `assets/js/apartments.js`
Die 6 Wohnungen sind angelegt und mit Smoobu verknüpft (Kundennummer 1066393): Coburg: Herzstück Coburg (Monteurwohnung), Studio mit Balkon & Vesteblick · Bamberg: Penthouse Weide, Penthouse Eiche · Regensburg: Penthouse Orange, Die Stadtvilla. Felder mit `null` (Größe, Betten, teils Gästezahl) werden ausgeblendet, bis sie eingetragen sind. Beschreibungen bitte prüfen und ergänzen.

### 4. Fotos
```
images/hero.jpg                          ← großes Titelbild der Startseite
images/staedte/coburg.jpg                ← Bilder der Städte-Kacheln
images/staedte/bamberg.jpg
images/staedte/regensburg.jpg
images/wohnungen/herzstueck-coburg/1.jpg   ← 1.jpg ist das Titelbild der Wohnung
images/wohnungen/herzstueck-coburg/2.jpg
…
```
Ordnernamen: `herzstueck-coburg`, `studio-vesteblick`, `penthouse-weide`, `penthouse-eiche`, `penthouse-orange`, `stadtvilla` (entsprechen der `id` in `apartments.js`). Fehlt ein Foto, erscheint automatisch ein Platzhalter. Empfehlung: Querformat, ca. 1600 px breit, als JPG komprimiert (unter 400 KB).

### 4a. Roomtour-Videos
Pro Wohnung kann in `assets/js/apartments.js` bei `video` ein Video eingetragen werden. Es erscheint auf der Wohnungsseite als zweites Element in der Galerie (nach dem Titelbild) und über den Button „▶ Roomtour“.

- **YouTube** (empfohlen, z. B. als „nicht gelistetes“ Video): `video: "https://youtu.be/abc123XYZ00"`
- **Vimeo**: `video: "https://vimeo.com/123456789"`
- **Eigene Datei**: `video: "images/wohnungen/stadtvilla/roomtour.mp4"` (MP4, möglichst unter 50 MB, Querformat)

YouTube-/Vimeo-Videos werden erst nach Klick auf „Roomtour ansehen“ geladen (datenschutzfreundlich).

### 5. Kontaktformulare
Ohne Server öffnen die Formulare das E-Mail-Programm des Besuchers. Damit die Formulare Nachrichten direkt verschicken, bei einem Dienst wie [Formspree](https://formspree.io) oder [Web3Forms](https://web3forms.com) ein Formular anlegen und die Endpoint-URL in `config.js` bei `formEndpoint` eintragen. Den Dienst anschließend in der Datenschutzerklärung ergänzen.

### 6. Rechtstexte
In `impressum.html`, `datenschutz.html` und `agb.html` sind alle Stellen zum Ausfüllen **gelb markiert**. Die Texte sind Vorlagen und ersetzen keine Rechtsberatung. Bitte vor dem Livegang prüfen lassen (z. B. über einen Rechtstext-Dienst oder einen Anwalt) und danach den gelben Hinweiskasten oben auf den Seiten entfernen.

## Lokal ansehen
```bash
python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```
