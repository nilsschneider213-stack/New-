/* ============================================================
   Green Tree Homes – Seitenlogik
   (Header/Footer, Suche, Wohnungslisten, Detailseite,
    Smoobu-Einbindung mit Einwilligung, Formulare)
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.GTH_CONFIG || {};
  var CITIES = window.GTH_CITIES || [];
  var APTS = window.GTH_APARTMENTS || [];
  var page = document.body.getAttribute("data-page") || "";
  var params = new URLSearchParams(location.search);

  /* ---------- Hilfsfunktionen ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function cityById(id) { return CITIES.filter(function (c) { return c.id === id; })[0]; }
  function aptById(id) { return APTS.filter(function (a) { return a.id === id; })[0]; }
  function typeLabel(t) { return t === "monteur" ? "Monteurwohnung" : "Ferienwohnung"; }
  function isDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || ""); }
  function fmtDate(s) {
    if (!isDate(s)) return "";
    var p = s.split("-");
    return p[2] + "." + p[1] + "." + p[0];
  }
  function todayISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  function nights(a, b) {
    if (!isDate(a) || !isDate(b)) return 0;
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }
  function storage(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  var ICONS = {
    guests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>',
    size: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>'
  };

  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" fill="#1a4230"/><path d="M32 11 17 32h7l-9 12h34l-9-12h7z" fill="#5f9c78"/><path d="M32 18 22 32h6l-7 10h22l-7-10h6z" fill="#8cc3a1"/><rect x="29.5" y="44" width="5" height="9" rx="1" fill="#b8955a"/></svg>';

  /* ---------- Bilder mit Platzhalter ---------- */
  function placeholder(city, label) {
    return '<div class="ph" data-city="' + esc(city) + '">' + ICONS.image + "<span>" + esc(label || "Foto folgt") + "</span></div>";
  }
  function img(src, alt, city, eager) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '"' + (eager ? "" : ' loading="lazy"') +
      ' data-city="' + esc(city) + '" onerror="GTH.imgFail(this)">';
  }
  function aptImg(apt, i) {
    var file = apt.images && apt.images[i];
    return file ? "images/wohnungen/" + apt.id + "/" + file : "";
  }
  window.GTH = {
    imgFail: function (el) {
      var tmp = document.createElement("div");
      tmp.innerHTML = placeholder(el.getAttribute("data-city"), el.getAttribute("data-label"));
      el.replaceWith(tmp.firstChild);
    }
  };

  /* ---------- Header & Footer ---------- */
  function renderChrome() {
    var c = CFG.company || {};
    var nav = [
      ["index.html", "Start", "home"],
      ["wohnungen.html", "Wohnungen", "wohnungen"],
      ["monteurwohnungen.html", "Monteurwohnungen", "monteur"],
      ["partner.html", "Eigentümer & Investoren", "partner"],
      ["kontakt.html", "Kontakt", "kontakt"]
    ];
    var header = $("#site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML =
        '<div class="container">' +
        '<a class="brand" href="index.html" aria-label="Green Tree Homes – Startseite">' + LOGO +
        '<span><span class="brand__name">Green Tree Homes</span><span class="brand__sub">Coburg · Bamberg · Regensburg</span></span></a>' +
        '<button class="nav-toggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>' +
        '<nav class="nav" id="main-nav" aria-label="Hauptnavigation">' +
        nav.map(function (n) {
          return '<a href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
        }).join("") +
        '<a class="btn btn--primary" href="buchen.html"' + (page === "buchen" ? ' aria-current="page"' : "") + ">Jetzt buchen</a>" +
        "</nav></div>";
      var toggle = $(".nav-toggle", header);
      var navEl = $(".nav", header);
      toggle.addEventListener("click", function () {
        var open = navEl.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    var footer = $("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="container"><div class="footer-grid">' +
        '<div><a class="brand" href="index.html">' + LOGO +
        '<span><span class="brand__name">Green Tree Homes</span><span class="brand__sub">Serviced Apartments</span></span></a>' +
        "<p>Ferienwohnungen, Monteurwohnungen und Serviced Apartments in Coburg, Bamberg und Regensburg – komfortabel, unkompliziert und direkt buchbar.</p></div>" +
        "<div><h4>Unsere Städte</h4><ul>" +
        CITIES.map(function (ci) { return '<li><a href="wohnungen.html?stadt=' + ci.id + '">' + esc(ci.name) + "</a></li>"; }).join("") +
        '<li><a href="monteurwohnungen.html">Monteurwohnungen</a></li></ul></div>' +
        '<div><h4>Service</h4><ul><li><a href="buchen.html">Online buchen</a></li><li><a href="kontakt.html">Kontakt & Anfrage</a></li>' +
        '<li><a href="partner.html">Für Eigentümer</a></li><li><a href="partner.html#investoren">Für Investoren</a></li></ul></div>' +
        "<div><h4>Kontakt</h4><ul>" +
        "<li>" + esc(c.owner) + "</li><li>" + esc(c.street) + "</li><li>" + esc(c.zipCity) + "</li>" +
        '<li><a href="tel:' + esc(String(c.phone || "").replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a></li>" +
        '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li></ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " Green Tree Homes. Alle Rechte vorbehalten.</span>" +
        '<nav aria-label="Rechtliches"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB & Stornierung</a>' +
        '<a href="#" id="consent-reset">Einwilligungen widerrufen</a></nav></div></div>';
      var reset = $("#consent-reset", footer);
      reset.addEventListener("click", function (e) {
        e.preventDefault();
        try { localStorage.removeItem("gth_consent_smoobu"); } catch (err) { /* ignore */ }
        alert("Ihre Einwilligung zum Laden externer Inhalte (Smoobu) wurde widerrufen.");
        location.reload();
      });
    }
  }

  /* ---------- Suchformular ---------- */
  function fillCitySelect(sel, selected) {
    if (!sel) return;
    sel.innerHTML = '<option value="">Alle Städte</option>' + CITIES.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === selected ? " selected" : "") + ">" + esc(c.name) + "</option>";
    }).join("");
  }
  function linkDates(arr, dep) {
    if (!arr || !dep) return;
    var t = todayISO();
    arr.min = t;
    dep.min = t;
    arr.addEventListener("change", function () {
      if (!arr.value) return;
      var next = new Date(arr.value);
      next.setDate(next.getDate() + 1);
      var n = next.toISOString().slice(0, 10);
      dep.min = n;
      if (!dep.value || dep.value <= arr.value) dep.value = n;
    });
  }
  function initSearch() {
    $all("form.search").forEach(function (form) {
      fillCitySelect($('[name="stadt"]', form), params.get("stadt"));
      var arr = $('[name="anreise"]', form), dep = $('[name="abreise"]', form), g = $('[name="gaeste"]', form);
      if (isDate(params.get("anreise"))) arr.value = params.get("anreise");
      if (isDate(params.get("abreise"))) dep.value = params.get("abreise");
      if (g && params.get("gaeste")) g.value = params.get("gaeste");
      linkDates(arr, dep);
      form.addEventListener("submit", function (e) {
        if (arr.value && dep.value && dep.value <= arr.value) {
          e.preventDefault();
          alert("Das Abreisedatum muss nach dem Anreisedatum liegen.");
        }
      });
    });
  }

  /* ---------- Wohnungskarten ---------- */
  function dateQuery() {
    var q = [];
    ["anreise", "abreise", "gaeste"].forEach(function (k) {
      var v = params.get(k);
      if (v && (k === "gaeste" ? /^\d+$/.test(v) : isDate(v))) q.push(k + "=" + v);
    });
    return q.length ? "&" + q.join("&") : "";
  }
  function aptCard(a) {
    var city = cityById(a.city) || {};
    var href = "wohnung.html?id=" + encodeURIComponent(a.id) + dateQuery();
    return '<article class="card fade-in">' +
      '<div class="card__media">' + img(aptImg(a, 0), a.name, a.city) +
      '<div class="card__tags">' + a.type.map(function (t, i) {
        return '<span class="tag' + (t === "monteur" ? " tag--gold" : "") + '">' + typeLabel(t) + "</span>";
      }).join("") + "</div></div>" +
      '<div class="card__body"><div class="card__city">' + esc(city.name) + "</div>" +
      '<h3 class="card__title"><a href="' + href + '">' + esc(a.name) + "</a></h3>" +
      '<p class="card__text">' + esc(a.tagline) + "</p>" +
      '<ul class="facts"><li>' + ICONS.guests + "bis " + a.guests + " Gäste</li><li>" + ICONS.bed + a.bedrooms + " Schlafzi.</li><li>" + ICONS.size + a.size + " m²</li></ul>" +
      '<div class="card__foot"><span class="price">' + (a.priceFrom ? "ab <strong>" + a.priceFrom + " €</strong> / Nacht" : "Preise im Kalender") + "</span>" +
      '<a class="link-arrow" href="' + href + '">Details →</a></div></div></article>';
  }

  function initHome() {
    var cityGrid = $("#city-grid");
    if (cityGrid) {
      cityGrid.innerHTML = CITIES.map(function (c) {
        var count = APTS.filter(function (a) { return a.city === c.id; }).length;
        return '<a class="city-card fade-in" href="wohnungen.html?stadt=' + c.id + '">' + img(c.image, c.name, c.id) +
          '<div class="city-card__body"><span class="count">' + count + (count === 1 ? " Apartment" : " Apartments") + "</span>" +
          "<h3>" + esc(c.name) + "</h3><p>" + esc(c.teaser) + "</p></div></a>";
      }).join("");
    }
    var featured = $("#featured");
    if (featured) featured.innerHTML = APTS.map(aptCard).join("");
  }

  function initList() {
    var grid = $("#apt-grid");
    if (!grid) return;
    var state = {
      stadt: cityById(params.get("stadt")) ? params.get("stadt") : "",
      typ: params.get("typ") === "monteur" || params.get("typ") === "ferien" ? params.get("typ") : (grid.getAttribute("data-typ") || ""),
      gaeste: parseInt(params.get("gaeste"), 10) || 0
    };

    var bar = $("#filter-city");
    if (bar) {
      bar.innerHTML = [{ id: "", name: "Alle Städte" }].concat(CITIES).map(function (c) {
        return '<button type="button" class="chip" data-city="' + c.id + '">' + esc(c.name) + "</button>";
      }).join("");
    }
    var typeBar = $("#filter-type");
    if (typeBar) {
      typeBar.innerHTML = [["", "Alle Wohnungsarten"], ["ferien", "Ferienwohnungen"], ["monteur", "Monteurwohnungen"]].map(function (t) {
        return '<button type="button" class="chip" data-type="' + t[0] + '">' + t[1] + "</button>";
      }).join("");
    }

    var info = $("#date-info");
    var arr = params.get("anreise"), dep = params.get("abreise");
    if (info && isDate(arr) && isDate(dep)) {
      var n = nights(arr, dep);
      info.hidden = false;
      info.innerHTML = ICONS.calendar.replace("<svg", '<svg style="width:18px;height:18px;vertical-align:-3px;margin-right:6px"') +
        "Ihr Reisezeitraum: <strong>" + fmtDate(arr) + " – " + fmtDate(dep) + "</strong>" + (n > 0 ? " (" + n + (n === 1 ? " Nacht" : " Nächte") + ")" : "") +
        ". Die tagesaktuelle Verfügbarkeit sehen Sie im Buchungskalender der jeweiligen Wohnung.";
    }

    function render() {
      var list = APTS.filter(function (a) {
        return (!state.stadt || a.city === state.stadt) &&
          (!state.typ || a.type.indexOf(state.typ) > -1) &&
          (!state.gaeste || a.guests >= state.gaeste);
      });
      grid.innerHTML = list.length ? list.map(aptCard).join("") :
        '<div class="empty" style="grid-column:1/-1"><h3>Keine passende Wohnung gefunden</h3><p>Bitte passen Sie Ihre Filter an oder <a href="kontakt.html">kontaktieren Sie uns</a> – wir finden eine Lösung.</p></div>';
      var ri = $("#result-info");
      if (ri) ri.textContent = list.length + (list.length === 1 ? " Wohnung" : " Wohnungen") + " gefunden" + (state.gaeste ? " für " + state.gaeste + " Gäste" : "");
      $all("#filter-city .chip").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-city") === state.stadt ? "true" : "false"); });
      $all("#filter-type .chip").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-type") === state.typ ? "true" : "false"); });
      observe();
    }
    if (bar) bar.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.stadt = b.getAttribute("data-city");
      var sel = $('form.search [name="stadt"]'); if (sel) sel.value = state.stadt;
      render();
    });
    if (typeBar) typeBar.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      state.typ = b.getAttribute("data-type");
      render();
    });
    render();
  }

  /* ---------- Smoobu (Zwei-Klick-Lösung) ---------- */
  function smoobuEmbed(container, url, opts) {
    opts = opts || {};
    if (!container) return;
    var base = (CFG.smoobu && CFG.smoobu.baseUrl) || "https://login.smoobu.com";

    if (!url) {
      container.innerHTML = '<div class="consent-box">' + ICONS.calendar +
        "<h3>Online-Buchung in Kürze verfügbar</h3>" +
        "<p>Unser Buchungskalender wird gerade eingerichtet. Senden Sie uns gerne direkt eine unverbindliche Anfrage – wir melden uns schnellstmöglich mit Verfügbarkeit und Preis.</p>" +
        '<a class="btn btn--primary" href="' + esc(opts.inquiryHref || "kontakt.html") + '">Unverbindlich anfragen</a></div>';
      if (window.console) console.info("[Green Tree Homes] Kein Smoobu-Link hinterlegt – bitte in assets/js/config.js bzw. apartments.js eintragen.");
      return;
    }

    function load() {
      var targetId = "smoobu-" + Math.random().toString(36).slice(2, 9);
      container.innerHTML = '<div id="' + targetId + '"></div>';
      var done = false;
      function fallback() {
        if (done) return; done = true;
        $("#" + targetId).innerHTML = '<iframe src="' + esc(url) + '" title="Buchungskalender" loading="lazy"></iframe>';
      }
      var s = document.createElement("script");
      s.src = base + "/js/Settings/BookingToolIframe.js";
      s.onload = function () {
        if (window.BookingToolIframe && typeof window.BookingToolIframe.initialize === "function") {
          done = true;
          window.BookingToolIframe.initialize({ url: url, baseUrl: base, target: "#" + targetId });
        } else fallback();
      };
      s.onerror = fallback;
      setTimeout(function () { if (!$("#" + targetId + " iframe") && !done) fallback(); }, 6000);
      document.body.appendChild(s);
    }

    if (storage("gth_consent_smoobu") === "1") { load(); return; }

    container.innerHTML = '<div class="consent-box">' + ICONS.calendar +
      "<h3>Buchungskalender laden</h3>" +
      "<p>Für die Online-Buchung binden wir den Kalender unseres Buchungspartners <strong>Smoobu GmbH</strong> ein. Beim Laden werden Daten (z. B. Ihre IP-Adresse) an Smoobu übertragen. Mehr dazu in unserer <a href=\"datenschutz.html#smoobu\">Datenschutzerklärung</a>.</p>" +
      '<button type="button" class="btn btn--primary">Kalender anzeigen</button><br>' +
      '<label><input type="checkbox"> Externe Buchungsinhalte künftig immer laden</label></div>';
    $("button", container).addEventListener("click", function () {
      if ($("input", container).checked) storage("gth_consent_smoobu", "1");
      load();
    });
  }

  /* ---------- Detailseite ---------- */
  function initDetail() {
    var root = $("#apt-detail");
    if (!root) return;
    var a = aptById(params.get("id"));
    if (!a) {
      root.innerHTML = '<div class="empty"><h2>Wohnung nicht gefunden</h2><p><a class="btn btn--primary" href="wohnungen.html">Alle Wohnungen ansehen</a></p></div>';
      return;
    }
    var city = cityById(a.city) || {};
    document.title = a.name + " – " + city.name + " | Green Tree Homes";
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", a.name + " in " + city.name + ": " + a.tagline + ". Jetzt direkt bei Green Tree Homes buchen.");

    var hero = $("#detail-hero");
    if (hero) {
      hero.innerHTML = '<div class="breadcrumb"><a href="index.html">Start</a> / <a href="wohnungen.html?stadt=' + a.city + '">' + esc(city.name) + "</a> / " + esc(a.name) + "</div>" +
        "<h1>" + esc(a.name) + '</h1><p class="lead">' + esc(a.tagline) + " · " + esc(city.name) + "</p>";
    }

    var imgs = (a.images && a.images.length ? a.images : ["", "", "", ""]).slice(0, 4);
    while (imgs.length < 4) imgs.push("");
    var arr = isDate(params.get("anreise")) ? params.get("anreise") : "";
    var dep = isDate(params.get("abreise")) ? params.get("abreise") : "";
    var g = /^\d+$/.test(params.get("gaeste") || "") ? params.get("gaeste") : "";
    var inquiry = "kontakt.html?wohnung=" + encodeURIComponent(a.id) + (arr ? "&anreise=" + arr : "") + (dep ? "&abreise=" + dep : "") + (g ? "&gaeste=" + g : "");

    root.innerHTML =
      '<div class="gallery">' + imgs.map(function (f, i) {
        return '<button type="button" data-index="' + i + '" aria-label="Foto ' + (i + 1) + ' vergrößern">' + img(aptImg(a, i), a.name + " – Foto " + (i + 1), a.city, i === 0) + "</button>";
      }).join("") + "</div>" +
      '<div class="detail"><div>' +
      '<div class="card__tags" style="position:static;margin-bottom:12px">' + a.type.map(function (t) {
        return '<span class="tag' + (t === "monteur" ? " tag--gold" : "") + '" style="background:' + (t === "monteur" ? "" : "var(--green-100)") + '">' + typeLabel(t) + "</span>";
      }).join("") + "</div>" +
      "<h2>Über diese Wohnung</h2>" + a.description.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="detail__facts">' +
      '<div class="fact"><span>Gäste</span><strong>bis ' + a.guests + "</strong></div>" +
      '<div class="fact"><span>Schlafzimmer</span><strong>' + a.bedrooms + "</strong></div>" +
      '<div class="fact"><span>Größe</span><strong>' + a.size + " m²</strong></div>" +
      '<div class="fact"><span>Betten</span><strong style="font-size:.95rem">' + esc(a.beds) + "</strong></div></div>" +
      "<h3>Ausstattung</h3><ul class=\"amenities\">" + a.amenities.map(function (m) { return "<li>" + ICONS.check + esc(m) + "</li>"; }).join("") + "</ul>" +
      "<h3>Gut zu wissen</h3><ul class=\"check-list\"><li>Check-in ab 15:00 Uhr, Check-out bis 10:00 Uhr (nach Absprache flexibel)</li>" +
      "<li>Kontaktloser Self-Check-in – Sie erhalten alle Infos vor der Anreise</li><li>Bettwäsche, Handtücher und Endreinigung inklusive</li>" +
      "<li>Rechnung mit ausgewiesener MwSt. für Geschäftsreisende</li></ul>" +
      '<h2 id="kalender" style="margin-top:40px">Verfügbarkeit & Buchung</h2>' +
      (arr && dep ? '<div class="notice">Ihr gewünschter Zeitraum: <strong>' + fmtDate(arr) + " – " + fmtDate(dep) + "</strong>. Bitte wählen Sie die Daten im Kalender aus.</div>" : "") +
      '<div class="embed-wrap" id="detail-embed"></div>' +
      "</div>" +
      '<aside class="booking-box"><h3>' + esc(a.name) + "</h3>" +
      '<span class="price">' + (a.priceFrom ? "ab <strong>" + a.priceFrom + " €</strong> / Nacht" : "Preise & Verfügbarkeit im Kalender") + "</span>" +
      '<form id="box-form"><div class="row"><div class="field"><label for="b-arr">Anreise</label><input type="date" id="b-arr" value="' + arr + '"></div>' +
      '<div class="field"><label for="b-dep">Abreise</label><input type="date" id="b-dep" value="' + dep + '"></div></div>' +
      '<div class="field" style="margin-bottom:16px"><label for="b-g">Gäste</label><select id="b-g">' +
      Array.apply(null, Array(a.guests)).map(function (_, i) { var v = i + 1; return '<option value="' + v + '"' + (String(v) === g ? " selected" : "") + ">" + v + (v === 1 ? " Gast" : " Gäste") + "</option>"; }).join("") +
      "</select></div>" +
      '<a class="btn btn--primary btn--block" href="#kalender">Verfügbarkeit prüfen</a>' +
      '<a class="btn btn--outline btn--block" style="margin-top:10px" id="box-inquiry" href="' + inquiry + '">Unverbindlich anfragen</a>' +
      "<small>Direkt beim Gastgeber buchen – ohne Portalgebühren.</small></form></aside></div>";

    linkDates($("#b-arr"), $("#b-dep"));
    function updInquiry() {
      var q = "kontakt.html?wohnung=" + encodeURIComponent(a.id);
      if ($("#b-arr").value) q += "&anreise=" + $("#b-arr").value;
      if ($("#b-dep").value) q += "&abreise=" + $("#b-dep").value;
      q += "&gaeste=" + $("#b-g").value;
      $("#box-inquiry").href = q;
    }
    ["#b-arr", "#b-dep", "#b-g"].forEach(function (s) { $(s).addEventListener("change", updInquiry); });

    smoobuEmbed($("#detail-embed"), a.smoobuUrl || (CFG.smoobu && CFG.smoobu.bookingToolUrl), { inquiryHref: inquiry });
    initLightbox(a, imgs);

    var more = $("#more-apts");
    if (more) {
      more.innerHTML = APTS.filter(function (x) { return x.id !== a.id; })
        .sort(function (x, y) { return (y.city === a.city) - (x.city === a.city); })
        .slice(0, 3).map(aptCard).join("");
    }
  }

  function initLightbox(a, imgs) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Bildergalerie");
    lb.innerHTML = '<button class="lb-close" aria-label="Schließen">×</button><button class="lb-prev" aria-label="Vorheriges Bild">‹</button><div class="lb-stage"></div><button class="lb-next" aria-label="Nächstes Bild">›</button>';
    document.body.appendChild(lb);
    var idx = 0;
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      $(".lb-stage", lb).innerHTML = img(aptImg(a, idx), a.name + " – Foto " + (idx + 1), a.city, true);
    }
    function close() { lb.classList.remove("is-open"); }
    $all(".gallery > button").forEach(function (b) {
      b.addEventListener("click", function () { show(+b.getAttribute("data-index")); lb.classList.add("is-open"); $(".lb-close", lb).focus(); });
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---------- Buchungsseite ---------- */
  function initBooking() {
    var box = $("#booking-embed");
    if (!box) return;
    var arr = params.get("anreise"), dep = params.get("abreise");
    var info = $("#booking-dates");
    if (info && isDate(arr) && isDate(dep)) {
      info.hidden = false;
      info.innerHTML = "Ihr gewünschter Zeitraum: <strong>" + fmtDate(arr) + " – " + fmtDate(dep) + "</strong>. Bitte wählen Sie die Daten im Kalender aus.";
    }
    smoobuEmbed(box, CFG.smoobu && CFG.smoobu.bookingToolUrl, { inquiryHref: "kontakt.html" + location.search });
  }

  /* ---------- Formulare ---------- */
  function initForms() {
    // Vorbelegung aus URL (z. B. von einer Wohnungsseite)
    var aptSel = $("#f-wohnung");
    if (aptSel) {
      aptSel.innerHTML = '<option value="">Allgemeine Anfrage</option>' + CITIES.map(function (c) {
        return '<optgroup label="' + esc(c.name) + '">' + APTS.filter(function (a) { return a.city === c.id; }).map(function (a) {
          return '<option value="' + a.id + '">' + esc(a.name) + "</option>";
        }).join("") + "</optgroup>";
      }).join("");
      if (aptById(params.get("wohnung"))) aptSel.value = params.get("wohnung");
    }
    var fa = $("#f-anreise"), fd = $("#f-abreise"), fg = $("#f-gaeste");
    if (fa && isDate(params.get("anreise"))) fa.value = params.get("anreise");
    if (fd && isDate(params.get("abreise"))) fd.value = params.get("abreise");
    if (fg && /^\d+$/.test(params.get("gaeste") || "")) fg.value = params.get("gaeste");
    linkDates(fa, fd);
    var anliegen = $("#f-anliegen");
    if (anliegen && params.get("anliegen")) anliegen.value = params.get("anliegen");

    $all("form[data-gth-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = $(".form-status", form);
        if ($(".hp input", form) && $(".hp input", form).value) return; // Spam-Schutz
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var data = new FormData(form);
        data.delete("website");
        var subject = form.getAttribute("data-gth-form") + " – Green Tree Homes";
        data.append("_subject", subject);

        var endpoint = CFG.formEndpoint;
        if (endpoint) {
          var btn = $('button[type="submit"]', form);
          btn.disabled = true;
          status.className = "form-status";
          status.textContent = "Wird gesendet …";
          fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
            .then(function (r) {
              if (!r.ok) throw new Error();
              status.className = "form-status ok";
              status.textContent = "Vielen Dank! Ihre Nachricht ist bei uns eingegangen. Wir melden uns schnellstmöglich.";
              form.reset();
            })
            .catch(function () {
              status.className = "form-status err";
              status.textContent = "Leider ist ein Fehler aufgetreten. Bitte schreiben Sie uns direkt an " + (CFG.company && CFG.company.email) + ".";
            })
            .then(function () { btn.disabled = false; });
        } else {
          // Fallback: E-Mail-Programm öffnen
          var lines = [];
          data.forEach(function (v, k) {
            if (k.charAt(0) === "_" || k === "datenschutz") return;
            var el = form.elements[k];
            var label = el && el.labels && el.labels[0] ? el.labels[0].textContent.replace(/\s*\*$/, "") : k;
            if (el && el.tagName === "SELECT" && el.selectedOptions[0]) v = el.selectedOptions[0].textContent;
            if (v) lines.push(label + ": " + v);
          });
          location.href = "mailto:" + (CFG.company && CFG.company.email) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
          status.className = "form-status ok";
          status.textContent = "Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Nachricht ab.";
        }
      });
    });
  }

  /* ---------- Kontaktdaten in Seiten einsetzen ---------- */
  function fillCompany() {
    var c = CFG.company || {};
    $all("[data-company]").forEach(function (el) {
      var k = el.getAttribute("data-company");
      if (k === "email") { el.textContent = c.email; el.href = "mailto:" + c.email; }
      else if (k === "phone") { el.textContent = c.phone; el.href = "tel:" + String(c.phone || "").replace(/[^\d+]/g, ""); }
      else el.textContent = c[k] || "";
    });
  }

  /* ---------- Animation ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.08 }) : null;
  function observe() {
    $all(".fade-in:not(.is-visible)").forEach(function (el) { io ? io.observe(el) : el.classList.add("is-visible"); });
  }

  renderChrome();
  fillCompany();
  initSearch();
  initHome();
  initList();
  initDetail();
  initBooking();
  initForms();
  observe();
})();
