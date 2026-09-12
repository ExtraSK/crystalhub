(function () {
  "use strict";

  var IP_ADDRESS = "crystalhub.org";
  var DISCORD_URL = "https://discord.crystalhub.org";

  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function copyIp() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(IP_ADDRESS).then(function () {
        showToast("Crystalhub.org Copied");
      }).catch(function () {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    var textarea = document.createElement("textarea");
    textarea.value = IP_ADDRESS;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("Crystalhub.org Copied");
    } catch (err) {
      showToast("Failed to copy IP, please copy manually");
    }
    document.body.removeChild(textarea);
  }

  var copyIpBanner = document.getElementById("copyIpBanner");
  var copyIpBannerText = document.getElementById("copyIpBannerText");
  var copyIpHero = document.getElementById("copyIpHero");

  if (copyIpBanner) copyIpBanner.addEventListener("click", copyIp);
  if (copyIpBannerText) copyIpBannerText.addEventListener("click", copyIp);
  if (copyIpHero) copyIpHero.addEventListener("click", copyIp);

  var playNowNav = document.getElementById("playNowNav");
  var playNowHero = document.getElementById("playNowHero");

      function handlePlayNow() {
        navigator.clipboard.writeText("crystalhub.org");
        showToast("Crystalhub.org Copied");
      }

  if (playNowNav) playNowNav.addEventListener("click", handlePlayNow);
  if (playNowHero) playNowHero.addEventListener("click", handlePlayNow);

  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.classList.remove("open");
        var otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  function updateActiveLink() {
    var sections = document.querySelectorAll("section[id], header[id]");
    var navLinksAll = document.querySelectorAll(".nav-link");
    var scrollY = window.scrollY + 120;

    var currentId = "home";
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        currentId = section.getAttribute("id");
      }
    });

    navLinksAll.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("load", updateActiveLink);

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offsetTop = targetEl.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  var fadeElements = document.querySelectorAll(".section, .hero, .banner, .discord-cta-box, .server-status-card, .feature-card, .step-card, .why-card, .faq-item");
  fadeElements.forEach(function (el) { el.classList.add("fade-in"); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll(".fade-in").forEach(function (el) { observer.observe(el); });

})();
