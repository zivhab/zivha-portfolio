document.addEventListener("DOMContentLoaded", function () {

  // ─── Refs ────────────────────────────────────────────────────
  const themeSwitch     = document.getElementById("theme-switch");
  const body            = document.body;
  const leftLabel       = document.querySelector(".toggle-label.left");
  const rightLabel      = document.querySelector(".toggle-label.right");
  const navPersonal     = document.getElementById("nav-personal");
  const navProfessional = document.getElementById("nav-professional");
  const toggleHint      = document.getElementById("toggle-hint-text");
  const hamburger       = document.getElementById("nav-hamburger");
  const navMenu         = document.getElementById("nav-menu");

  const heroPro   = document.getElementById("hero-professional");
  const heroPers  = document.getElementById("hero-personal");
  const aboutPro  = document.getElementById("about-professional");
  const aboutPers = document.getElementById("about-personal");
  const mainPro   = document.getElementById("main-professional");
  const mainPers  = document.getElementById("main-personal");

  // ─── Hamburger ────────────────────────────────────────────────
  hamburger?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  navMenu?.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger?.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (navMenu?.classList.contains("open") && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove("open");
      hamburger?.classList.remove("open");
    }
  });

  // ─── Theme Toggle ────────────────────────────────────────────
  const show = (el) => {
    if (!el) return;
    el.style.display = "block";
    el.style.opacity = 0;
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.4s ease";
      el.style.opacity = 1;
    });
  };
  const hide = (el) => { if (el) el.style.display = "none"; };

  const toggleTheme = (isPersonal) => {
    body.classList.toggle("personal", isPersonal);
    themeSwitch?.setAttribute("aria-pressed", isPersonal);

    if (isPersonal) {
      hide(heroPro);  show(heroPers);
      hide(aboutPro); show(aboutPers);
      hide(mainPro);  show(mainPers);
      if (toggleHint) toggleHint.textContent = "Viewing: The fun stuff 🌸";
    } else {
      show(heroPro);  hide(heroPers);
      show(aboutPro); hide(aboutPers);
      show(mainPro);  hide(mainPers);
      if (toggleHint) toggleHint.textContent = "Viewing: The serious stuff";
    }

    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  themeSwitch?.addEventListener("click", () => toggleTheme(!body.classList.contains("personal")));
  leftLabel?.addEventListener("click",   () => toggleTheme(false));
  rightLabel?.addEventListener("click",  () => toggleTheme(true));
  navPersonal?.addEventListener("click",     (e) => { e.preventDefault(); toggleTheme(true); });
  navProfessional?.addEventListener("click", (e) => { e.preventDefault(); toggleTheme(false); });


  // ─── Typewriter ──────────────────────────────────────────────
  document.querySelectorAll(".typewriter").forEach(el => {
    let words;
    try { words = JSON.parse(el.dataset.words || "[]"); } catch { words = []; }
    if (!words.length) return;

    let wi = 0, ci = 0, deleting = false, paused = false;

    const type = () => {
      if (paused) return;
      const word = words[wi];
      if (deleting) {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          setTimeout(type, 380);
          return;
        }
        setTimeout(type, 55);
      } else {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) {
          paused = true;
          setTimeout(() => { paused = false; deleting = true; type(); }, 1800);
          return;
        }
        setTimeout(type, 88);
      }
    };
    setTimeout(type, 900);
  });


  // ─── Fade-in on scroll ───────────────────────────────────────
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));


  // ─── Active nav highlight ────────────────────────────────────
  const navLinks = document.querySelectorAll(".nav-links .nav-link");
  const sections = document.querySelectorAll("section[id]");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));


  // ─── TagCanvas Skills Sphere ─────────────────────────────────
  window.addEventListener("load", () => {
    const canvas = document.getElementById("skills-canvas");
    if (canvas && window.TagCanvas) {
      try {
        TagCanvas.Start("skills-canvas", "skills-list", {
          textColour: "#0CC0DF",
          outlineColour: "#FFBD59",
          outlineMethod: "colour",
          reverse: true,
          depth: 0.5,
          maxSpeed: 0.04,
          initial: [0.04, -0.02],
          decel: 0.95,
          freezeActive: false,
          weight: true,
          weightMode: "size",
          tooltip: "div",
          tooltipContainer: "skills-tooltip",
          autoRotate: 0.5,
          noSelect: true
        });
      } catch (e) {
        const c = canvas.closest(".skills-container");
        if (c) c.style.display = "none";
      }
    }
  });

});