/* ============================================================
   GLOBAL — initialize once (client can edit this value later)
   ============================================================ */
var company_name = "Studio Nova";

(function initBrand() {
  document.addEventListener("DOMContentLoaded", function () {
    var name = (window.company_name || company_name || "").trim();
    document.querySelectorAll("[data-brand-name]").forEach(function (el) {
      el.textContent = name;
    });
    document.querySelectorAll("[data-brand-initial]").forEach(function (el) {
      el.textContent = (name.charAt(0) || "S").toUpperCase();
    });
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();

/* ============================================================
   NAV — scroll-aware (transparent over dark hero, glass on scroll)
   ============================================================ */
(function navScroll() {
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var toggle = function () {
      if (window.scrollY > 12) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  });
})();

/* ============================================================
   PORTFOLIO LIGHTBOX — click card to expand, click to close
   ============================================================ */
(function portfolioLightbox() {
  document.addEventListener("DOMContentLoaded", function () {
    var cards = document.querySelectorAll(".card-work");
    var modal = document.querySelector("[data-lightbox]");
    if (!cards.length || !modal) return;

    var stage = modal.querySelector("[data-lightbox-stage]");
    var titleEl = modal.querySelector("[data-lightbox-title]");
    var metaEl = modal.querySelector("[data-lightbox-meta]");
    var tagEl = modal.querySelector("[data-lightbox-tag]");
    var closeBtn = modal.querySelector("[data-lightbox-close]");
    var ctaEl = modal.querySelector("[data-lightbox-cta]");

    function open(card) {
      var visual = card.querySelector(".card-work__visual");
      var title = card.querySelector(".card-work__title");
      var meta = card.querySelector(".card-work__meta");
      var tag = card.querySelector(".card-work__tag");
      if (!visual) return;

      // Clone the visual mock into the stage
      stage.innerHTML = "";
      var clone = visual.cloneNode(true);
      clone.classList.add("lightbox__visual");
      // Remove interactive chrome from the clone
      var arrow = clone.querySelector(".card-work__arrow"); if (arrow) arrow.remove();
      var tagClone = clone.querySelector(".card-work__tag"); if (tagClone) tagClone.remove();
      stage.appendChild(clone);

      if (titleEl) titleEl.textContent = title ? title.textContent : "";
      if (metaEl)  metaEl.textContent  = meta  ? meta.textContent  : "";
      if (tagEl)   tagEl.textContent   = tag   ? tag.textContent   : "";
      if (ctaEl)   ctaEl.setAttribute("href", card.getAttribute("href") || "start.html");

      modal.classList.add("is-open");
      modal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
      stage.innerHTML = "";
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault();
        open(card);
      });
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.hasAttribute("data-lightbox-close") || e.target.closest("[data-lightbox-close]")) {
        close();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  });
})();

/* ============================================================
   TESTIMONIALS — auto-rotating carousel
   ============================================================ */
(function testimonials() {
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector("[data-quotes]");
    if (!root) return;
    var slides = Array.from(root.querySelectorAll(".quote"));
    var dotsWrap = root.querySelector("[data-quotes-dots]");
    if (slides.length < 2) return;

    var dots = slides.map(function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "quote-dot";
      d.setAttribute("aria-label", "מעבר להמלצה " + (i + 1));
      d.addEventListener("click", function () { go(i, true); });
      dotsWrap.appendChild(d);
      return d;
    });

    var i = 0, timer = null;
    function go(next, userInitiated) {
      i = (next + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
      if (userInitiated) restart();
    }
    function tick() { go(i + 1, false); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(tick, 5500);
    }

    // Pause on hover
    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);

    // Respect reduced motion — show active only, no auto-rotate
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      restart();
    }
    go(0, false);
  });
})();

/* ============================================================
   WIZARD — multi-step form controller
   ============================================================ */
(function wizard() {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("[data-wizard]");
    if (!form) return;

    var steps = Array.from(form.querySelectorAll("[data-step]"));
    var progressFill = form.querySelector("[data-progress-fill]");
    var counter = form.querySelector("[data-step-counter]");
    var currentLabel = form.querySelector("[data-step-label]");
    var btnNext = form.querySelector("[data-next]");
    var btnBack = form.querySelector("[data-back]");
    var btnSubmit = form.querySelector("[data-submit]");
    var errorEl = form.querySelector("[data-error]");

    var index = 0;

    function render() {
      steps.forEach(function (s, i) {
        s.classList.toggle("is-active", i === index);
      });
      var pct = ((index + 1) / steps.length) * 100;
      if (progressFill) progressFill.style.width = pct + "%";
      if (counter) counter.innerHTML = "שלב <b>" + (index + 1) + "</b> מתוך " + steps.length;
      if (currentLabel) {
        var label = steps[index].getAttribute("data-title") || "";
        currentLabel.textContent = label;
      }

      if (btnBack) btnBack.style.visibility = index === 0 ? "hidden" : "visible";
      if (btnNext) btnNext.style.display = index === steps.length - 1 ? "none" : "inline-flex";
      if (btnSubmit) btnSubmit.style.display = index === steps.length - 1 ? "inline-flex" : "none";

      clearError();
      // smooth scroll to top of wizard
      var shell = form.closest(".wizard-shell") || form;
      var rect = shell.getBoundingClientRect();
      if (rect.top < -40) {
        window.scrollTo({ top: window.scrollY + rect.top - 20, behavior: "smooth" });
      }

      // focus first input of step for accessibility
      setTimeout(function () {
        var first = steps[index].querySelector("input, textarea, select");
        if (first && typeof first.focus === "function") first.focus({ preventScroll: true });
      }, 120);
    }

    function validateStep() {
      var step = steps[index];
      var required = step.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        var el = required[i];
        if (el.type === "radio") {
          var name = el.name;
          var checked = step.querySelector('input[name="' + name + '"]:checked');
          if (!checked) {
            showError("בחרו אחת מהאפשרויות כדי להמשיך");
            return false;
          }
        } else if (!el.value || !el.value.trim()) {
          showError("אנא מלאו את השדות המסומנים");
          el.focus();
          return false;
        } else if (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value)) {
          showError("כתובת המייל שהוזנה אינה תקינה");
          el.focus();
          return false;
        }
      }
      return true;
    }

    function showError(msg) {
      if (!errorEl) return;
      errorEl.textContent = msg;
      errorEl.classList.add("is-visible");
    }
    function clearError() {
      if (!errorEl) return;
      errorEl.textContent = "";
      errorEl.classList.remove("is-visible");
    }

    if (btnNext) {
      btnNext.addEventListener("click", function () {
        if (!validateStep()) return;
        if (index < steps.length - 1) {
          index++;
          render();
        }
      });
    }
    if (btnBack) {
      btnBack.addEventListener("click", function () {
        if (index > 0) { index--; render(); }
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateStep()) return;
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "שולח…";
      }
      // Simulate submission — replace with real endpoint / mailto later
      setTimeout(function () {
        try {
          var data = new FormData(form);
          var payload = {};
          data.forEach(function (v, k) { payload[k] = v; });
          sessionStorage.setItem("lp_last_brief", JSON.stringify(payload));
        } catch (err) { /* ignore */ }
        window.location.href = "thank-you.html";
      }, 600);
    });

    // Enter-to-advance on input fields (not textarea)
    form.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target && e.target.tagName === "INPUT" && e.target.type !== "submit") {
        e.preventDefault();
        if (index < steps.length - 1) {
          if (validateStep()) { index++; render(); }
        } else {
          form.requestSubmit();
        }
      }
    });

    render();
  });
})();
