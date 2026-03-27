document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const themeSwitch = document.getElementById("theme-switch");
  const body = document.body;
  const leftLabel = document.querySelector(".toggle-label.left");
  const rightLabel = document.querySelector(".toggle-label.right");

  const navPersonal = document.getElementById("nav-personal");
  const navProfessional = document.getElementById("nav-professional");

  // -----------------------
  // Theme Toggle Function
  // -----------------------
  const toggleTheme = (isPersonal) => {
    body.classList.toggle("personal", isPersonal);

    // Scroll to top
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });

    // Update aria-pressed for accessibility
    themeSwitch.setAttribute("aria-pressed", isPersonal);
  };

  // -----------------------
  // Event Listeners
  // -----------------------
  themeSwitch?.addEventListener("click", () => {
    toggleTheme(!body.classList.contains("personal"));
  });

  leftLabel?.addEventListener("click", () => toggleTheme(false));
  rightLabel?.addEventListener("click", () => toggleTheme(true));

  navPersonal?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme(true);
  });

  navProfessional?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme(false);
  });

  // -----------------------
  // Fade-in on scroll
  // -----------------------
  const fadeEls = document.querySelectorAll(".fade-in");
  const observerOptions = { threshold: 0.05 };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => fadeInObserver.observe(el));

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