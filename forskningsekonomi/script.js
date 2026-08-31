(function () {
  "use strict";

  var STORE_KEY = "typfall-collapsed";

  /* ---- Accordions (typfall) ---- */
  var cases = Array.prototype.slice.call(document.querySelectorAll(".case"));

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function writeStore(obj) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(obj));
    } catch (e) {
      /* private mode etc. – silently ignore */
    }
  }

  var collapsed = readStore();

  cases.forEach(function (el) {
    var id = el.id;
    var head = el.querySelector(".case-head");
    var isCollapsed = collapsed[id] === true;
    setState(el, head, isCollapsed);

    head.addEventListener("click", function () {
      var next = el.getAttribute("data-collapsed") !== "true";
      setState(el, head, next);
      collapsed[id] = next;
      writeStore(collapsed);
    });
  });

  function setState(el, head, isCollapsed) {
    el.setAttribute("data-collapsed", isCollapsed ? "true" : "false");
    head.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
  }

  /* ---- Quiz reveal ---- */
  Array.prototype.forEach.call(document.querySelectorAll(".q-item"), function (item) {
    var btn = item.querySelector(".q-q");
    btn.addEventListener("click", function () {
      var open = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", open ? "false" : "true");
    });
  });

  /* ---- Teknik modal ---- */
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
  function onKey(e) {
    if (e.key === "Escape") closeModal();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
})();
