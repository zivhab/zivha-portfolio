document.addEventListener("DOMContentLoaded", function () {
  // -----------------------
  // Theme Toggle
  // -----------------------
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;
  const leftLabel = document.querySelector(".toggle-label.left");
  const rightLabel = document.querySelector(".toggle-label.right");

  const toggleTheme = (isPersonal) => {
    body.classList.toggle("personal", isPersonal);
  };

  themeSwitch.addEventListener("click", () =>
    body.classList.toggle("personal")
  );

  leftLabel.addEventListener("click", () => toggleTheme(false));
  rightLabel.addEventListener("click", () => toggleTheme(true));

  // -----------------------
  // Navbar Links for Mode Switching
  // -----------------------
  const navPersonal = document.getElementById("nav-personal");
  const navProfessional = document.getElementById("nav-professional");

  if (navPersonal) {
    navPersonal.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.add("personal");
    });
  }

  if (navProfessional) {
    navProfessional.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.remove("personal");
    });
  }

  // -----------------------
  // Scroll-triggered Fade-in Animations
  // -----------------------
  const fadeEls = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.05
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach((el) => {
    el.style.transitionDelay = "0s";
    fadeInObserver.observe(el);
  });

  // -----------------------
  // TagCanvas Skills Sphere
  // -----------------------
  window.addEventListener("load", () => {
    const canvas = document.getElementById("skills-canvas");
    if (canvas && window.TagCanvas) {
      try {
        TagCanvas.Start("skills-canvas", "skills-list", {
          textColour: "#76d2e0ff",
          outlineColour: "#5a5a5aff",
          outlineMethod: "colour",
          reverse: true,
          depth: 0.5,
          maxSpeed: 0.05,
          initial: [0.05, -0.02],
          decel: 0.95,
          freezeActive: true,
          weight: true,
          tooltip: "div",
          tooltipContainer: "skills-tooltip"
        });
      } catch (e) {
        console.error("TagCanvas error:", e);
        canvas.closest(".skills-container")?.style.setProperty("display", "none");
      }
    }
  });
});
