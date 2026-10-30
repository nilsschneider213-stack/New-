/*
 * Erzeugt fertige HTML-Inhalte für Suchmaschinen (Google & Co.):
 *  - eine eigene Seite je Wohnung, z. B. ferienwohnung-bamberg-penthouse-weide.html
 *  - Menü, Fußbereich und Wohnungslisten fertig in allen Seiten
 *  - sitemap.xml
 *
 * Aufruf (nach Änderungen an assets/js/apartments.js oder config.js):
 *   node scripts/prerender.js
 *
 * Benötigt Node.js und Playwright (npm i -D playwright && npx playwright install chromium).
 * Im Browser bauen die Skripte die Inhalte weiterhin selbst auf – die fertigen
 * Inhalte sind nur die Startfassung, die Suchmaschinen sofort lesen können.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const vm = require("vm");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://www.greentree-homes.com/";
const PR = /<!--pr-->[\s\S]*?<!--\/pr-->/;

// Daten wie im Browser laden
const win = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "assets/js/config.js"), "utf8"), { window: win });
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "assets/js/apartments.js"), "utf8"), { window: win });
const APTS = win.GTH_APARTMENTS;
const CITIES = win.GTH_CITIES;
const GENERATED = APTS.filter((a) => a.slug).map((a) => a.slug + ".html");

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html");
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// Animations-Klassen entfernen, damit statische Inhalte sofort sichtbar sind
const clean = (html, origin) => html
  .replace(/ ?\bfade-in\b/g, "").replace(/ ?\bis-visible\b/g, "").replace(/ class=""/g, "")
  .split(origin).join(SITE);

// Inhalt eines markierten Bereichs (<!--pr-->…<!--/pr-->) im Element mit dieser id ersetzen
function fill(src, id, html) {
  const re = new RegExp('(id="' + id + '"[^>]*>)<!--pr-->[\\s\\S]*?<!--\\/pr-->');
  if (!re.test(src)) return src;
  return src.replace(re, (m, open) => open + "<!--pr-->" + html + "<!--/pr-->");
}

async function capture(page, url, ids, origin) {
  await page.goto(origin + url, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  const out = await page.evaluate((ids) => {
    const r = {};
    ids.forEach((id) => { const el = document.getElementById(id); if (el) r[id] = el.innerHTML; });
    r.__title = document.title;
    const md = document.querySelector('meta[name="description"]');
    r.__desc = md ? md.getAttribute("content") : "";
    const ld = document.querySelector("script[data-apt-ld]");
    r.__ld = ld ? ld.textContent : "";
    return r;
  }, ids);
  Object.keys(out).forEach((k) => { if (!k.startsWith("__")) out[k] = clean(out[k], origin + "/"); });
  out.__ld = out.__ld.split(origin + "/").join(SITE);
  return out;
}

const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

(async () => {
  const server = await serve();
  const origin = "http://127.0.0.1:" + server.address().port;
  const browser = await chromium.launch();
  const page = await browser.newPage({ locale: "de-DE", viewport: { width: 1280, height: 900 } });
  const REGIONS = ["site-header", "site-footer", "city-grid", "featured", "filter-city", "filter-type", "apt-grid"];

  // 1) Normale Seiten
  const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html") && !GENERATED.includes(f) && !f.startsWith("_"));
  for (const f of pages) {
    let src = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (!PR.test(src)) continue;
    const ids = REGIONS.filter((id) => new RegExp('id="' + id + '"[^>]*><!--pr-->').test(src));
    const got = await capture(page, "/" + f, ids, origin);
    ids.forEach((id) => { src = fill(src, id, got[id] || ""); });
    fs.writeFileSync(path.join(ROOT, f), src);
    console.log("✓", f);
  }

  // 2) Eigene Seite je Wohnung (Vorlage: wohnung.html)
  const tpl = fs.readFileSync(path.join(ROOT, "wohnung.html"), "utf8");
  for (const a of APTS.filter((x) => x.slug)) {
    const file = a.slug + ".html";
    const got = await capture(page, "/wohnung.html?id=" + encodeURIComponent(a.id), ["site-header", "site-footer", "detail-hero", "apt-detail", "more-apts"], origin);
    let html = tpl;
    ["site-header", "site-footer", "detail-hero", "apt-detail", "more-apts"].forEach((id) => { html = fill(html, id, got[id] || ""); });
    const city = CITIES.find((c) => c.id === a.city) || {};
    const img = SITE + "images/wohnungen/" + a.id + "/" + ((a.images && a.images[0]) || "1.jpg");
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, "<title>" + got.__title.replace(/&/g, "&amp;") + "</title>")
      .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + escAttr(got.__desc) + '">')
      .replace(/\s*<meta name="robots"[^>]*>/, "")
      .replace(/\s*<link rel="canonical"[^>]*>/, "")
      .replace(/\s*<meta property="og:[^>]*>/g, "")
      .replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/g, "")
      .replace("  <link rel=\"icon\"",
        '  <meta property="og:title" content="' + escAttr(got.__title) + '">\n' +
        '  <meta property="og:description" content="' + escAttr(got.__desc) + '">\n' +
        '  <meta property="og:type" content="website">\n  <meta property="og:locale" content="de_DE">\n  <meta property="og:site_name" content="GreenTree Homes">\n' +
        '  <meta property="og:url" content="' + SITE + file + '">\n  <meta property="og:image" content="' + img + '">\n' +
        '  <link rel="canonical" href="' + SITE + file + '">\n' +
        '  <script type="application/ld+json" data-apt-ld>' + got.__ld.replace(/</g, "\\u003c") + "</script>\n" +
        "  <link rel=\"icon\"")
      .replace(/<body data-page="([^"]*)"[^>]*>/, '<body data-page="$1" data-apt="' + a.id + '">');
    fs.writeFileSync(path.join(ROOT, file), html);
    console.log("✓", file, "–", a.name, "(" + city.name + ")");
  }

  // 3) Sitemap
  const urls = ["", "wohnungen.html", "monteurwohnungen.html", "buchen.html", "partner.html", "ueber-uns.html", "kontakt.html", "agb.html"]
    .concat(GENERATED)
    .concat(CITIES.map((c) => "wohnungen.html?stadt=" + c.id));
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => "  <url><loc>" + SITE + u.replace(/&/g, "&amp;") + "</loc></url>\n").join("") + "</urlset>\n");
  console.log("✓ sitemap.xml (" + urls.length + " Seiten)");

  await browser.close();
  server.close();
})().catch((e) => { console.error(e); process.exit(1); });
