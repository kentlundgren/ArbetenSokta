(function () {
  "use strict";

  /* ---------- Accordions (typfall) ---------- */
  var STORE_KEY = "forskn-typfall-collapsed";
  var cases = Array.prototype.slice.call(document.querySelectorAll(".case"));

  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeStore(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }

  var collapsed = readStore();

  cases.forEach(function (el, i) {
    var head = el.querySelector(".case-head");
    // default: open, unless stored as collapsed
    var isCollapsed = collapsed[i] === true;
    apply(el, head, isCollapsed);
    head.addEventListener("click", function () {
      var next = el.getAttribute("data-collapsed") !== "true";
      apply(el, head, next);
      collapsed[i] = next;
      writeStore(collapsed);
    });
  });

  function apply(el, head, isCollapsed) {
    el.setAttribute("data-collapsed", isCollapsed ? "true" : "false");
    head.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
  }

  /* ---------- Quiz reveal ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".q-item"), function (item) {
    var btn = item.querySelector(".q-q");
    btn.addEventListener("click", function () {
      var open = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", open ? "false" : "true");
    });
  });

  /* ---------- "Ligger projektet i fas?" ---------- */
  var tool = document.getElementById("fasTool");
  if (tool) {
    var sAnslag = document.getElementById("s-anslag");
    var sTid = document.getElementById("s-tid");
    var sForbr = document.getElementById("s-forbr");
    var vAnslag = document.getElementById("v-anslag");
    var vTid = document.getElementById("v-tid");
    var vForbr = document.getElementById("v-forbr");
    var fill = document.getElementById("fasFill");
    var tidmark = document.getElementById("fasTidmark");
    var verdict = document.getElementById("fasVerdict");
    var detail = document.getElementById("fasDetail");

    function nf(n, dec) {
      return n.toFixed(dec == null ? 1 : dec).replace(".", ",");
    }

    function recalc() {
      var anslag = parseFloat(sAnslag.value);   // Mkr
      var tid = parseFloat(sTid.value);          // %
      var forbr = parseFloat(sForbr.value);      // %

      vAnslag.textContent = nf(anslag, 1);
      vTid.textContent = String(Math.round(tid));
      vForbr.textContent = String(Math.round(forbr));

      fill.style.width = forbr + "%";
      tidmark.style.left = tid + "%";

      tool.classList.remove("is-ifas", "is-efter", "is-fore");

      var diff = forbr - tid;

      if (tid <= 0) {
        verdict.textContent = "Projektet har inte börjat";
        detail.textContent = "Ingen prognos än – dra i tidsreglaget för att komma igång.";
        return;
      }

      if (Math.abs(diff) <= 5) {
        tool.classList.add("is-ifas");
        verdict.textContent = "I fas";
      } else if (diff < 0) {
        tool.classList.add("is-efter");
        verdict.textContent = "Efter plan – förbrukar långsammare än tiden går";
      } else {
        tool.classList.add("is-fore");
        verdict.textContent = "Före plan – förbrukar snabbare än tiden går";
      }

      var projPct = forbr / tid * 100;          // projicerad förbrukning vid projektslut, %
      var projKr = anslag * projPct / 100;      // Mkr
      var slut = projKr - anslag;               // + överskrider, − blir kvar

      var landning;
      if (Math.abs(slut) < 0.05) {
        landning = "landar ungefär på anslaget.";
      } else if (slut < 0) {
        landning = nf(-slut, 1) + " Mkr blir oförbrukat och återbetalas till bidragsgivaren.";
      } else {
        landning = "projektet överskrider anslaget med " + nf(slut, 1) + " Mkr – det måste täckas på annat sätt.";
      }

      detail.textContent =
        Math.round(tid) + " % av tiden har gått och " + Math.round(forbr) +
        " % av anslaget är förbrukat. Om takten håller: " + landning;
    }

    [sAnslag, sTid, sForbr].forEach(function (s) {
      s.addEventListener("input", recalc);
    });
    recalc();
  }

  /* ---------- Teknik-modal ---------- */
  var modal = document.getElementById("techModal");
  var openBtn = document.getElementById("techBtn");
  var closeBtn = document.getElementById("techClose");
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
    document.addEventListener("keydown", onKey);
  }
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) { if (e.key === "Escape") closeModal(); }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
})();
