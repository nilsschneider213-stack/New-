/* ============================================================
   GreenTree Homes – Seitenlogik
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
  function typeLabel(t) { return t === "monteur" ? "Monteurwohnung" : "Ferienwohnung & Serviced"; }
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

  var LOGO = '<img class="brand__logo" src="assets/img/logo-baum.png" alt="" width="50" height="47">';

  /* ---------- Bilder mit Platzhalter ---------- */
  function placeholder(city, label) {
    return '<div class="ph" data-city="' + esc(city) + '">' + ICONS.image + "<span>" + esc(label || "Foto folgt") + "</span></div>";
  }
  function img(src, alt, city, eager) {
    if (!src) return placeholder(city);
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
      ["wohnungen.html", "Wohnungen", "wohnungen"],
      ["monteurwohnungen.html", "Monteurwohnungen", "monteur"],
      ["partner.html", "Eigentümer & Investoren", "partner"],
      ["ueber-uns.html", "Über uns", "ueber"],
      ["kontakt.html", "Kontakt", "kontakt"]
    ];
    var header = $("#site-header");
    if (header) {
      // Symmetrischer Kopf: links Buchen, Mitte Logo, rechts Menü
      header.className = "site-header site-header--center";
      header.innerHTML =
        '<div class="container header-bar">' +
        '<div class="header-bar__left"><a class="btn btn--primary header-book" href="buchen.html"><span class="hide-xs">Jetzt buchen</span><span class="show-xs">Buchen</span></a></div>' +
        '<a class="brand brand--center" href="index.html" aria-label="GreenTree Homes – Startseite">' + LOGO +
        '<span><span class="brand__name">GreenTree</span><span class="brand__sub">Homes</span></span></a>' +
        '<div class="header-bar__right"><button class="menu-btn" aria-label="Menü öffnen" aria-expanded="false" aria-controls="main-nav">' +
        '<span class="menu-btn__label">Menü</span><span class="menu-btn__icon"><span></span><span></span><span></span></span></button></div>' +
        "</div>" +
        '<nav class="menu" id="main-nav" aria-label="Hauptnavigation"><div class="container">' +
        [["index.html", "Start", "home"]].concat(nav).map(function (n) {
          return '<a href="' + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
        }).join("") +
        "</div></nav>";
      var toggle = $(".menu-btn", header);
      var navEl = $(".menu", header);
      function setMenu(open) {
        navEl.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      }
      toggle.addEventListener("click", function () { setMenu(!navEl.classList.contains("is-open")); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
      document.addEventListener("click", function (e) { if (!header.contains(e.target)) setMenu(false); });
    }

    var footer = $("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML =
        '<div class="container"><div class="footer-grid">' +
        '<div><a class="brand" href="index.html">' + LOGO +
        '<span><span class="brand__name">GreenTree</span><span class="brand__sub">Homes</span></span></a>' +
        "<p>Serviced Apartments, Ferienwohnungen und Monteurwohnungen in Bayern – moderne Unterkünfte in Coburg, Bamberg und Regensburg, direkt beim Gastgeber buchbar.</p></div>" +
        "<div><h4>Unsere Städte</h4><ul>" +
        CITIES.map(function (ci) { return '<li><a href="wohnungen.html?stadt=' + ci.id + '">Apartments ' + esc(ci.name) + "</a></li>"; }).join("") +
        "</ul></div>" +
        '<div><h4>Service</h4><ul><li><a href="buchen.html">Online buchen</a></li><li><a href="kontakt.html">Kontakt & Anfrage</a></li>' +
        '<li><a href="ueber-uns.html">Über uns</a></li><li><a href="partner.html">Für Eigentümer</a></li><li><a href="partner.html#investoren">Für Investoren</a></li></ul></div>' +
        "<div><h4>Kontakt</h4><ul>" +
        "<li>" + esc(c.legalName || c.owner) + "</li><li>" + esc(c.street) + "</li><li>" + esc(c.zipCity) + "</li>" +
        '<li><a href="tel:' + esc(String(c.phone || "").replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a></li>" +
        '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li></ul></div>" +
        "</div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " GreenTree Homes. Alle Rechte vorbehalten.</span>" +
        '<nav aria-label="Rechtliches"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="agb.html">AGB</a><a href="agb.html#storno">Stornierung</a>' +
        '<a href="#" id="consent-reset">Einwilligungen widerrufen</a></nav></div></div>';
      var reset = $("#consent-reset", footer);
      reset.addEventListener("click", function (e) {
        e.preventDefault();
        try { localStorage.removeItem("gth_consent_smoobu"); localStorage.removeItem("gth_consent_reviews"); } catch (err) { /* ignore */ }
        alert("Ihre Einwilligungen zum Laden externer Inhalte (Smoobu, Bewertungen) wurden widerrufen.");
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
    $all("form.search, form.quick").forEach(function (form) {
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
  // Eigene Seite je Wohnung (z. B. ferienwohnung-bamberg-penthouse-weide.html), sonst wohnung.html?id=…
  function aptUrl(a, query) {
    query = String(query || "").replace(/^&/, "");
    if (a.slug) return a.slug + ".html" + (query ? "?" + query : "");
    return "wohnung.html?id=" + encodeURIComponent(a.id) + (query ? "&" + query : "");
  }

  function aptCard(a) {
    var city = cityById(a.city) || {};
    var href = aptUrl(a, dateQuery());
    return '<article class="card fade-in">' +
      '<div class="card__media">' + img(aptImg(a, 0), a.name, a.city) +
      '<div class="card__tags">' + a.type.map(function (t, i) {
        return '<span class="tag' + (t === "monteur" ? " tag--gold" : "") + '">' + typeLabel(t) + "</span>";
      }).join("") + "</div></div>" +
      '<div class="card__body"><div class="card__city">' + esc(city.name) + "</div>" +
      '<h3 class="card__title"><a href="' + href + '">' + esc(a.name) + "</a></h3>" +
      '<ul class="facts">' + (a.guests ? "<li>" + ICONS.guests + "bis " + a.guests + " Gäste</li>" : "") +
      (a.bedrooms ? "<li>" + ICONS.bed + a.bedrooms + (a.bedrooms === 1 ? " Schlafzimmer" : " Schlafzimmer") + "</li>" : "") +
      (a.size ? "<li>" + ICONS.size + a.size + " m²</li>" : "") + "</ul>" +
      (a.priceFrom || a.video ? '<div class="card__foot">' + (a.priceFrom ? '<span class="price">ab <strong>' + a.priceFrom + " €</strong> / Nacht</span>" : "") +
        (a.video ? '<span class="tag tag--video">▶ Roomtour</span>' : "") + "</div>" : "") +
      '<div class="card__actions"><a class="btn btn--outline" href="' + href + '">Details & Fotos</a>' +
      '<a class="btn btn--primary" href="' + aptUrl(a, dateQuery() + "&buchen=1") + '#kalender">Jetzt buchen</a></div></div></article>';
  }

  function initHome() {
    var cityGrid = $("#city-grid");
    if (cityGrid) {
      cityGrid.innerHTML = CITIES.map(function (c) {
        var hasMonteur = APTS.some(function (a) { return a.city === c.id && a.type.indexOf("monteur") > -1; });
        return '<a class="city-card fade-in" href="wohnungen.html?stadt=' + c.id + '">' + img(c.image, "Apartments und Ferienwohnungen in " + c.name, c.id) +
          '<div class="city-card__body"><span class="count">' + (hasMonteur ? "Ferien- &amp; Monteurwohnungen" : "Ferienwohnungen &amp; Apartments") + "</span>" +
          "<h3>" + esc(c.name) + "</h3></div></a>";
      }).join("");
    }
    var featured = $("#featured");
    if (featured) featured.innerHTML = APTS.map(aptCard).join("");
  }

  /* ---------- Schnellauswahl Stadt + Wohnungsart (Startseite) ---------- */
  function initQuick() {
    var form = $("form.quick");
    if (!form) return;
    function count(city, typ) {
      return APTS.filter(function (a) {
        return (!city || a.city === city) && (!typ || a.type.indexOf(typ) > -1);
      }).length;
    }
    function val(name) { var el = form.elements[name]; return el ? el.value : ""; }
    function plural(n, typ) {
      if (typ === "monteur") return n === 1 ? "1 Monteurwohnung" : n + " Monteurwohnungen";
      return n === 1 ? "1 Wohnung" : n + " Wohnungen";
    }
    function update() {
      var city = val("stadt"), typ = val("typ");
      $all("[data-count-city]", form).forEach(function (el) {
        var n = count(el.getAttribute("data-count-city"), typ);
        el.textContent = plural(n, typ);
      });
      $all("[data-count-type]", form).forEach(function (el) {
        var t = el.getAttribute("data-count-type"), n = count(city, t);
        el.textContent = n ? plural(n, t) + (city ? " in " + cityById(city).name : "") : "In dieser Stadt nicht verfügbar";
      });
      var n = count(city, typ);
      var btn = $("#quick-submit"), hint = $("#quick-hint");
      var cityName = city ? cityById(city).name : "";
      if (n === 0) {
        btn.textContent = "Anfrage stellen";
        hint.innerHTML = "In " + esc(cityName) + " haben wir aktuell keine " + (typ === "monteur" ? "Monteurwohnung" : "passende Wohnung") +
          " – fragen Sie uns gerne an oder wählen Sie eine andere Stadt.";
      } else {
        btn.textContent = "Suchen";
        hint.textContent = city || typ ? plural(n, typ) + (cityName ? " in " + cityName : "") + " verfügbar" : "";
      }
    }
    form.addEventListener("change", update);
    form.addEventListener("submit", function (e) {
      var city = val("stadt"), typ = val("typ");
      var list = APTS.filter(function (a) { return (!city || a.city === city) && (!typ || a.type.indexOf(typ) > -1); });
      var dates = ["anreise", "abreise", "gaeste"].map(function (k) {
        var v = form.elements[k] && form.elements[k].value; return v ? "&" + k + "=" + encodeURIComponent(v) : "";
      }).join("");
      if (e.defaultPrevented) return;
      e.preventDefault();
      if (list.length === 0) location.href = "kontakt.html?anliegen=" + (typ === "monteur" ? "firmenanfrage" : "buchungsanfrage") + dates;
      else if (list.length === 1) location.href = aptUrl(list[0], dates);
      else location.href = "wohnungen.html?stadt=" + city + "&typ=" + typ + dates;
    });
    update();
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
          (!state.gaeste || !a.guests || a.guests >= state.gaeste);
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
  var SMOOBU_BASE = (CFG.smoobu && CFG.smoobu.baseUrl) || "https://login.smoobu.com";

  // Links zu Buchungstool und Belegungskalender aus config.js / apartments.js
  function smoobuLinks(apt) {
    var cid = CFG.smoobu && String(CFG.smoobu.customerId || "").replace(/\D/g, "");
    var id = apt && String(apt.smoobuId || "").replace(/\D/g, "");
    var hash = apt && String(apt.calendarHash || "").replace(/[^a-f0-9]/gi, "");
    var url = CFG.smoobu && String(CFG.smoobu.bookingUrl || "");
    if (!/^https:\/\/booking\.smoobu\.com\//.test(url)) url = "";
    return {
      // Direkt-Link des Buchungstools (bevorzugt) oder über die Kundennummer
      booking: url ? url + (id ? (url.indexOf("?") > -1 ? "&" : "?") + "apartmentId=" + id : "")
        : cid ? SMOOBU_BASE + "/de/booking-tool/iframe/" + cid + (id ? "/" + id : "") : "",
      calendar: id && hash ? SMOOBU_BASE + "/de/cockpit/widget/show-calendar-iframe/" + id + "/" + hash : ""
    };
  }

  // Buchungstool direkt als iframe; die Höhe passt iframe-resizer (wie bei Smoobu) automatisch an
  var resizerLoading = null;
  function bookingFrame(target, url) {
    var id = "smoobu-frame-" + Math.random().toString(36).slice(2, 9);
    var newTab = '<a class="btn btn--primary" href="' + esc(url) + '" target="_blank" rel="noopener">Buchung in neuem Fenster öffnen</a>';
    target.innerHTML =
      '<div class="booking-fallback" hidden>' + ICONS.calendar +
        "<h3>Jetzt direkt buchen</h3><p>Der Buchungskalender kann hier gerade nicht angezeigt werden. Öffnen Sie ihn einfach in einem neuen Fenster – dort wählen Sie Ihre Daten und buchen direkt.</p>" + newTab + "</div>" +
      '<iframe id="' + id + '" class="smoobu-booking" src="' + esc(url) + '" title="Buchung" allowtransparency="true" allowfullscreen></iframe>' +
      '<p class="embed-hint booking-newtab">Buchungsfenster wird nicht richtig angezeigt? <a href="' + esc(url) + '" target="_blank" rel="noopener">Hier in neuem Fenster buchen →</a></p>';
    var frame = $("#" + id), start = Date.now(), ready = false;
    var fallback = $(".booking-fallback", target);
    // Meldet sich das Buchungsfenster nicht (z. B. weil der Browser oder eine Vorschau
    // fremde Fenster blockiert), wird statt eines leeren Feldes ein Buchungs-Button gezeigt.
    function showFallback() {
      if (ready) return;
      fallback.hidden = false;
      frame.classList.add("is-collapsed");
      $(".booking-newtab", target).hidden = true;
    }
    function markReady() {
      if (ready) return;
      ready = true;
      fallback.hidden = true;
      frame.classList.remove("is-collapsed");
      $(".booking-newtab", target).hidden = false;
    }
    var timer = setTimeout(showFallback, 9000);
    if (!resizerLoading) {
      resizerLoading = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.16/iframeResizer.min.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    resizerLoading.then(function () {
      if (typeof window.iFrameResize !== "function") return;
      window.iFrameResize({
        heightCalculationMethod: "lowestElement",
        tolerance: 34,
        checkOrigin: false,
        initCallback: function () { clearTimeout(timer); markReady(); },
        resizedCallback: markReady,
        // Beim Laden darf das Buchungsfenster die Seite nicht nach unten ziehen
        scrollCallback: function () { return Date.now() - start > 4000; }
      }, frame);
    }).catch(function () { /* ohne Größenanpassung: Ersatz-Button nach Zeitablauf */ });
  }

  function smoobuEmbed(container, links, opts) {
    opts = opts || {};
    if (!container) return;
    var inquiryBox = '<div class="consent-box">' + ICONS.calendar +
      "<h3>" + (links.booking || links.calendar ? "Buchungskalender gerade nicht erreichbar" : "Online-Buchung in Kürze verfügbar") + "</h3>" +
      "<p>Senden Sie uns gerne direkt eine unverbindliche Anfrage – wir melden uns schnellstmöglich mit Verfügbarkeit und Preis.</p>" +
      '<a class="btn btn--primary" href="' + esc(opts.inquiryHref || "kontakt.html") + '">Unverbindlich anfragen</a></div>';

    if (!links.booking && !links.calendar) {
      container.innerHTML = inquiryBox;
      if (window.console) console.info("[GreenTree Homes] Keine Smoobu-Daten hinterlegt – bitte in assets/js/config.js bzw. apartments.js eintragen.");
      return;
    }

    var loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      var html = "";
      if (links.calendar) {
        html += '<h3 class="embed-title">Belegungskalender</h3><p class="embed-hint">Freie Tage sind im Kalender markiert.</p>' +
          '<iframe class="smoobu-calendar" src="' + esc(links.calendar) + '" title="Belegungskalender" loading="lazy"></iframe>';
      }
      if (links.booking) {
        var targetId = "smoobu-" + Math.random().toString(36).slice(2, 9);
        html += (links.calendar ? '<h3 class="embed-title" style="margin-top:28px">Jetzt buchen</h3>' : "") + '<div id="' + targetId + '"></div>';
      }
      container.innerHTML = html;
      if (!links.booking) return;

      var target = $("#" + targetId);
      if (/^https:\/\/booking\.smoobu\.com\//.test(links.booking)) {
        bookingFrame(target, links.booking);
        return;
      }
      // Fallback: Einbindung über das Smoobu-Skript (nur Kundennummer bekannt)
      function fail() { if (!$("iframe", target)) target.innerHTML = inquiryBox; }
      var s = document.createElement("script");
      s.src = SMOOBU_BASE + "/js/Settings/BookingToolIframe.js";
      s.onload = function () {
        if (window.BookingToolIframe && typeof window.BookingToolIframe.initialize === "function") {
          window.BookingToolIframe.initialize({ url: links.booking, baseUrl: SMOOBU_BASE, target: "#" + targetId });
        } else fail();
      };
      s.onerror = fail;
      setTimeout(fail, 12000);
      document.body.appendChild(s);
    }

    // Andere „Jetzt buchen“-Buttons der Seite können den Kalender direkt öffnen
    container.gthLoad = load;
    if (storage("gth_consent_smoobu") === "1") { load(); return; }

    container.innerHTML = '<div class="consent-box">' + ICONS.calendar +
      "<h3>Verfügbarkeit prüfen & direkt buchen</h3>" +
      "<p>Für die Online-Buchung binden wir den Kalender unseres Buchungspartners <strong>Smoobu GmbH</strong> ein. Beim Laden werden Daten (z. B. Ihre IP-Adresse) an Smoobu übertragen. Mehr dazu in unserer <a href=\"datenschutz.html#smoobu\">Datenschutzerklärung</a>.</p>" +
      '<button type="button" class="btn btn--primary">Jetzt buchen – Kalender öffnen</button><br>' +
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
    var a = aptById(params.get("id") || document.body.getAttribute("data-apt"));
    if (!a) {
      root.innerHTML = '<div class="empty"><h2>Wohnung nicht gefunden</h2><p><a class="btn btn--primary" href="wohnungen.html">Alle Wohnungen ansehen</a></p></div>';
      return;
    }
    var city = cityById(a.city) || {};
    var kind = a.type.indexOf("monteur") > -1 ? "Monteurwohnung" : "Ferienwohnung & Serviced Apartment";
    document.title = a.name + " – " + kind + " in " + city.name + " (Bayern) | GreenTree Homes";
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", a.name + ": " + kind + " in " + city.name + ", Bayern. " + a.tagline + ". Fotos, Ausstattung und direkte Online-Buchung bei GreenTree Homes.");
    // Strukturierte Daten für Google (Unterkunft)
    var ld = document.querySelector("script[data-apt-ld]") || document.createElement("script");
    ld.type = "application/ld+json";
    ld.setAttribute("data-apt-ld", "");
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Accommodation",
      name: a.name, description: a.description.join(" "),
      image: (a.images || []).map(function (f) { return new URL(aptImg(a, a.images.indexOf(f)), location.href).href; }),
      occupancy: a.guests ? { "@type": "QuantitativeValue", maxValue: a.guests } : undefined,
      numberOfBedrooms: a.bedrooms || undefined,
      address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: "Bayern", addressCountry: "DE" },
      amenityFeature: a.amenities.map(function (m) { return { "@type": "LocationFeatureSpecification", name: m, value: true }; })
    });
    if (!ld.parentNode) document.head.appendChild(ld);

    var hero = $("#detail-hero");
    if (hero) {
      hero.innerHTML = '<div class="breadcrumb"><a href="index.html">Start</a> / <a href="wohnungen.html?stadt=' + a.city + '">' + esc(city.name) + "</a> / " + esc(a.name) + "</div>" +
        "<h1>" + esc(a.name) + '</h1><p class="lead">' + esc(a.tagline) + " · " + esc(city.name) + "</p>";
    }

    var photos = a.images && a.images.length ? a.images : [""];
    var video = parseVideo(a.video);
    var arr = isDate(params.get("anreise")) ? params.get("anreise") : "";
    var dep = isDate(params.get("abreise")) ? params.get("abreise") : "";
    var g = /^\d+$/.test(params.get("gaeste") || "") ? params.get("gaeste") : "";
    var inquiry = "kontakt.html?wohnung=" + encodeURIComponent(a.id) + (arr ? "&anreise=" + arr : "") + (dep ? "&abreise=" + dep : "") + (g ? "&gaeste=" + g : "");

    root.innerHTML = mediaHtml(a, photos, video) +
      '<div class="detail"><div>' +
      '<div class="card__tags" style="position:static;margin-bottom:12px">' + a.type.map(function (t) {
        return '<span class="tag' + (t === "monteur" ? " tag--gold" : "") + '" style="background:' + (t === "monteur" ? "" : "var(--green-100)") + '">' + typeLabel(t) + "</span>";
      }).join("") + "</div>" +
      "<h2>Über diese Wohnung</h2>" + a.description.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<div class="detail__facts">' +
      (a.guests ? '<div class="fact"><span>Gäste</span><strong>bis ' + a.guests + "</strong></div>" : "") +
      (a.bedrooms ? '<div class="fact"><span>Schlafzimmer</span><strong>' + a.bedrooms + "</strong></div>" : "") +
      (a.size ? '<div class="fact"><span>Größe</span><strong>' + a.size + " m²</strong></div>" : "") +
      (a.beds ? '<div class="fact"><span>Betten</span><strong style="font-size:.95rem">' + esc(a.beds) + "</strong></div>" : "") +
      '<div class="fact"><span>Stadt</span><strong>' + esc(city.name) + "</strong></div></div>" +
      "<h3>Ausstattung</h3><ul class=\"amenities\">" + a.amenities.map(function (m) { return "<li>" + ICONS.check + esc(m) + "</li>"; }).join("") + "</ul>" +
      "<h3>Gut zu wissen</h3><ul class=\"check-list\"><li>Check-in ab 15:00 Uhr, Check-out bis 10:00 Uhr – früherer Check-in bzw. späterer Check-out bei der Buchung gegen Aufpreis wählbar</li>" +
      "<li>Kontaktloser Self-Check-in – Sie erhalten alle Infos vor der Anreise</li><li>Bettwäsche, Handtücher, Energiekosten und Endreinigung inklusive</li>" +
      "<li><a href=\"agb.html#storno\">Kostenlose Stornierung</a> bis 5 Tage vor Anreise</li><li>Nichtraucherwohnung, Haustiere sind leider nicht gestattet</li>" +
      "<li>Rund um die Uhr persönlich für Sie erreichbar</li><li>Rechnung mit ausgewiesener MwSt. für Geschäftsreisende</li></ul>" +
      '<div class="book-cta"><div><strong>Gefällt Ihnen ' + esc(a.name) + '?</strong><span>Freie Termine prüfen und direkt beim Gastgeber buchen – ohne Portalgebühren.</span></div>' +
      '<button type="button" class="btn btn--primary" data-book>Jetzt buchen</button></div>' +
      '<h2 id="kalender" style="margin-top:40px">Verfügbarkeit & Buchung</h2>' +
      (arr && dep ? '<div class="notice">Ihr gewünschter Zeitraum: <strong>' + fmtDate(arr) + " – " + fmtDate(dep) + "</strong>. Bitte wählen Sie die Daten im Kalender aus.</div>" : "") +
      '<div class="embed-wrap" id="detail-embed"></div>' +
      "</div>" +
      '<aside class="booking-box"><h3>' + esc(a.name) + "</h3>" +
      '<span class="price">' + (a.priceFrom ? "ab <strong>" + a.priceFrom + " €</strong> / Nacht" : "Preise & Verfügbarkeit im Kalender") + "</span>" +
      '<form id="box-form"><div class="row"><div class="field"><label for="b-arr">Anreise</label><input type="date" id="b-arr" value="' + arr + '"></div>' +
      '<div class="field"><label for="b-dep">Abreise</label><input type="date" id="b-dep" value="' + dep + '"></div></div>' +
      '<div class="field" style="margin-bottom:16px"><label for="b-g">Gäste</label><select id="b-g">' +
      Array.apply(null, Array(a.guests || 6)).map(function (_, i) { var v = i + 1; return '<option value="' + v + '"' + (String(v) === g ? " selected" : "") + ">" + v + (v === 1 ? " Gast" : " Gäste") + "</option>"; }).join("") +
      "</select></div>" +
      '<button type="button" class="btn btn--primary btn--block" data-book>Jetzt buchen</button>' +
      '<a class="btn btn--outline btn--block" style="margin-top:10px" id="box-inquiry" href="' + inquiry + '">Unverbindlich anfragen</a>' +
      "<small>Direkt beim Gastgeber buchen – ohne Portalgebühren. Beim Buchen wird der Kalender unseres Partners Smoobu geladen (<a href=\"datenschutz.html#smoobu\">Datenschutz</a>).</small></form></aside></div>" +
      '<div class="book-bar"><div><strong>' + esc(a.name) + "</strong><span>" + esc(city.name) + (a.guests ? " · bis " + a.guests + " Gäste" : "") + "</span></div>" +
      '<button type="button" class="btn btn--primary" data-book>Jetzt buchen</button></div>';
    document.body.classList.add("has-book-bar");

    linkDates($("#b-arr"), $("#b-dep"));
    function updInquiry() {
      var q = "kontakt.html?wohnung=" + encodeURIComponent(a.id);
      if ($("#b-arr").value) q += "&anreise=" + $("#b-arr").value;
      if ($("#b-dep").value) q += "&abreise=" + $("#b-dep").value;
      q += "&gaeste=" + $("#b-g").value;
      $("#box-inquiry").href = q;
    }
    ["#b-arr", "#b-dep", "#b-g"].forEach(function (s) { $(s).addEventListener("change", updInquiry); });

    var embed = $("#detail-embed");
    smoobuEmbed(embed, smoobuLinks(a), { inquiryHref: inquiry });
    // Alle „Jetzt buchen“-Buttons: zum Kalender springen und ihn öffnen
    $all("[data-book]").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        $("#kalender").scrollIntoView({ behavior: "smooth", block: "start" });
        if (embed.gthLoad) embed.gthLoad();
      });
    });
    if (params.get("buchen") === "1") {
      var toCal = function () { $("#kalender").scrollIntoView({ block: "start" }); };
      setTimeout(toCal, 50);
      window.addEventListener("load", toCal); // nach dem Laden der Bilder erneut ausrichten
    }
    initMedia(a, photos, video);

    var more = $("#more-apts");
    if (more) {
      more.innerHTML = APTS.filter(function (x) { return x.id !== a.id; })
        .sort(function (x, y) { return (y.city === a.city) - (x.city === a.city); })
        .slice(0, 3).map(aptCard).join("");
    }
  }

  /* ---------- Fotos & Roomtour-Video ---------- */
  // Unterstützt YouTube- und Vimeo-Links sowie eigene Videodateien (.mp4/.webm/.mov)
  function parseVideo(v) {
    v = String(v || "").trim();
    if (!v) return null;
    var m = v.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (m) return { kind: "youtube", name: "YouTube", src: "https://www.youtube-nocookie.com/embed/" + m[1] + "?autoplay=1&rel=0&playsinline=1&modestbranding=1" };
    m = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return { kind: "vimeo", name: "Vimeo", src: "https://player.vimeo.com/video/" + m[1] + "?autoplay=1&dnt=1" };
    if (/\.(mp4|webm|mov)(\?.*)?$/i.test(v)) return { kind: "file", src: v };
    return null;
  }

  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="rgba(0,0,0,.55)"/><path d="M9.5 7.5v9l7-4.5z" fill="#fff"/></svg>';

  function mediaHtml(a, photos, video) {
    var slides = photos.map(function (f, i) {
      return '<div class="media__slide"><button type="button" class="media__photo" data-photo="' + i + '" aria-label="Foto ' + (i + 1) + ' vergrößern">' +
        img(aptImg(a, i), a.name + " – Foto " + (i + 1), a.city, i === 0) + "</button></div>";
    });
    if (video) {
      var poster = aptImg(a, 0);
      var tour = '<div class="media__slide media__slide--video" data-video>' +
        (video.kind === "file"
          ? '<video controls playsinline preload="metadata"' + (poster ? ' poster="' + esc(poster) + '"' : "") + ' src="' + esc(video.src) + '"></video>'
          : '<button type="button" class="media__play" data-play>' + (poster ? img(poster, "", a.city) : "") +
            '<span class="media__play-inner">' + PLAY + "<strong>Roomtour ansehen</strong><small>Beim Abspielen wird das Video von " + video.name + " geladen.</small></span></button>") +
        "</div>";
      slides.splice(Math.min(1, slides.length), 0, tour); // Video als 2. Element nach dem Titelbild
    }
    var n = slides.length;
    var thumbs = n > 1 ? '<div class="media__thumbs" role="tablist">' + slides.map(function (sl, i) {
      var isVideo = sl.indexOf("data-video") > -1;
      var photoIdx = video && i > 1 ? i - 1 : (video && i === 1 ? 0 : i);
      return '<button type="button" class="media__thumb' + (isVideo ? " media__thumb--video" : "") + '" data-go="' + i + '" aria-label="' + (isVideo ? "Roomtour-Video" : "Foto " + (photoIdx + 1)) + '">' +
        img(aptImg(a, photoIdx), "", a.city) + (isVideo ? '<span>' + PLAY + "</span>" : "") + "</button>";
    }).join("") + "</div>" : "";
    return '<div class="media" id="media">' +
      '<div class="media__track" tabindex="0" aria-label="Fotos' + (video ? " und Roomtour-Video" : "") + ' – zum Blättern wischen">' + slides.join("") + "</div>" +
      (n > 1 ? '<button type="button" class="media__nav media__prev" aria-label="Zurück">‹</button><button type="button" class="media__nav media__next" aria-label="Weiter">›</button>' +
        '<div class="media__count"><span id="media-pos">1</span> / ' + n + "</div>" : "") +
      '<div class="media__actions">' + (video ? '<button type="button" class="btn btn--light media__tour" data-go="1">▶ Roomtour</button>' : "") +
      '<button type="button" class="btn btn--primary" data-book>Jetzt buchen</button></div>' +
      "</div>" + thumbs;
  }

  function initMedia(a, photos, video) {
    var track = $(".media__track");
    if (!track) return;
    var slides = $all(".media__slide", track), pos = 0;
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    }
    function onPos() {
      var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i === pos) return;
      pos = i;
      var el = $("#media-pos"); if (el) el.textContent = i + 1;
      $all(".media__thumb").forEach(function (t, k) { t.classList.toggle("is-active", k === i); });
      $all("video", track).forEach(function (v) { v.pause(); }); // Video pausieren beim Weiterblättern
      // Auf dem Video-Slide Buttons aus dem Weg räumen, damit die Videosteuerung frei bleibt
      track.parentNode.classList.toggle("on-video", !!(slides[i] && slides[i].hasAttribute("data-video")));
    }
    track.addEventListener("scroll", function () { window.requestAnimationFrame(onPos); }, { passive: true });
    $all(".media__thumb")[0] && $all(".media__thumb")[0].classList.add("is-active");
    var prev = $(".media__prev"), next = $(".media__next");
    if (prev) prev.addEventListener("click", function () { go(pos - 1); });
    if (next) next.addEventListener("click", function () { go(pos + 1); });
    $all("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(+b.getAttribute("data-go")); }); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(pos - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(pos + 1); }
    });
    var play = $("[data-play]", track);
    if (play && video) play.addEventListener("click", function () {
      play.parentNode.innerHTML = '<iframe src="' + esc(video.src) + '" title="Roomtour ' + esc(a.name) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    });
    initLightbox(a, photos);
  }

  function initLightbox(a, photos) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Bildergalerie");
    lb.innerHTML = '<button class="lb-close" aria-label="Schließen">×</button><button class="lb-prev" aria-label="Vorheriges Bild">‹</button><div class="lb-stage"></div><button class="lb-next" aria-label="Nächstes Bild">›</button><div class="lb-count"></div>';
    document.body.appendChild(lb);
    var idx = 0;
    function show(i) {
      idx = (i + photos.length) % photos.length;
      $(".lb-stage", lb).innerHTML = img(aptImg(a, idx), a.name + " – Foto " + (idx + 1), a.city, true);
      $(".lb-count", lb).textContent = (idx + 1) + " / " + photos.length;
    }
    function close() { lb.classList.remove("is-open"); }
    $all("[data-photo]").forEach(function (b) {
      b.addEventListener("click", function () { show(+b.getAttribute("data-photo")); lb.classList.add("is-open"); $(".lb-close", lb).focus(); });
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) close(); });
    // Wischen auf Handy/Tablet
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    });
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
    smoobuEmbed(box, smoobuLinks(aptById(params.get("wohnung")) || null), { inquiryHref: "kontakt.html" + location.search });
  }

  /* ---------- Bewertungen (Elfsight-Widgets, Zwei-Klick-Lösung) ---------- */
  function initReviews() {
    var box = $("#reviews");
    var list = (CFG.reviews || []).filter(function (r) { return /^[a-f0-9-]{36}$/i.test(r.id || ""); });
    if (!box) return;
    if (!list.length) { box.closest("section").hidden = true; return; }

    function load() {
      box.innerHTML = (list.length > 1 ? '<div class="reviews__tabs" role="tablist">' + list.map(function (r, i) {
          return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" data-tab="' + i + '">' + esc(r.label) + "</button>";
        }).join("") + "</div>" : "") +
        list.map(function (r, i) {
          return '<div class="reviews__pane" data-pane="' + i + '"' + (i ? " hidden" : "") + '><div class="elfsight-app-' + esc(r.id) + '"></div></div>';
        }).join("");
      $all("[data-tab]", box).forEach(function (t) {
        t.addEventListener("click", function () {
          var i = t.getAttribute("data-tab");
          $all("[data-tab]", box).forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
          $all("[data-pane]", box).forEach(function (pn) { pn.hidden = pn.getAttribute("data-pane") !== i; });
          window.dispatchEvent(new Event("resize")); // Widget passt sich der Breite an
        });
      });
      if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
        var sc = document.createElement("script");
        sc.src = "https://elfsightcdn.com/platform.js";
        sc.async = true;
        document.body.appendChild(sc);
      }
    }

    if (storage("gth_consent_reviews") === "1") { load(); return; }
    box.innerHTML = '<div class="consent-box reviews__consent">' +
      '<div class="reviews__stars" aria-hidden="true">★★★★★</div>' +
      "<h3>Das sagen unsere Gäste</h3>" +
      "<p>Echte Bewertungen von " + list.map(function (r) { return esc(r.label); }).join(" und ") +
      ". Beim Anzeigen werden Inhalte unseres Partners Elfsight geladen (<a href=\"datenschutz.html#bewertungen\">Datenschutz</a>).</p>" +
      '<button type="button" class="btn btn--primary">Bewertungen anzeigen</button><br>' +
      '<label><input type="checkbox"> Bewertungen künftig immer anzeigen</label></div>';
    $("button", box).addEventListener("click", function () {
      if ($("input", box).checked) storage("gth_consent_reviews", "1");
      load();
    });
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
        var subject = form.getAttribute("data-gth-form") + " – GreenTree Homes";
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

  // Neue Seite immer oben beginnen – auch wenn die Website in einem Rahmen
  // (z. B. Vorschau) angezeigt wird, der seine Scroll-Position behält.
  if (!location.hash) {
    window.scrollTo(0, 0);
    try { document.documentElement.scrollIntoView({ block: "start" }); } catch (e) { /* ältere Browser */ }
  }

  renderChrome();
  fillCompany();
  initSearch();
  initHome();
  initQuick();
  initReviews();
  initList();
  initDetail();
  initBooking();
  initForms();
  observe();
})();
