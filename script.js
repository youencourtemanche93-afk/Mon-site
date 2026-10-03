// Année du pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Thème clair / sombre (mémorisé dans le navigateur)
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

function getStoredTheme() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch { /* stockage indisponible */ }
}

const initialTheme = getStoredTheme()
  || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
root.dataset.theme = initialTheme;

themeToggle.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  navLinks.classList.toggle("open", open);
}

navToggle.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Apparition des éléments au défilement
const revealTargets = document.querySelectorAll(".section h2, .section-intro, .card, .project, .about > *, .contact-form");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Formulaire de contact (validation côté navigateur)
const form = document.querySelector(".contact-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.textContent = "Merci de remplir correctement tous les champs.";
    status.className = "form-status error";
    return;
  }

  // Aucun serveur n'est branché : on simule l'envoi.
  // Pour recevoir les messages, reliez ce formulaire à un service comme Formspree.
  status.textContent = "Merci ! Votre message a bien été envoyé.";
  status.className = "form-status ok";
  form.reset();
});
