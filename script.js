// Année du pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// En-tête opaque après défilement
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  navLinks.classList.toggle("open", open);
}

navToggle.addEventListener("click", () => setMenu(navToggle.getAttribute("aria-expanded") !== "true"));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// Horaires (0 = dimanche … 6 = samedi), en minutes depuis minuit
const HOURS = {
  0: [[690, 840], [1020, 1320]],
  1: [],
  2: [[660, 840], [1020, 1320]],
  3: [[660, 840], [1020, 1320]],
  4: [[660, 840], [1020, 1320]],
  5: [[660, 840], [1020, 1320]],
  6: [[690, 840], [1020, 1320]],
};
const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}h${String(m % 60).padStart(2, "0")}`;

// Heure actuelle à Sarlat, quel que soit le fuseau du visiteur
function nowInParis() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function computeStatus() {
  const { day, minutes } = nowInParis();

  const current = HOURS[day].find(([open, close]) => minutes >= open && minutes < close);
  if (current) {
    return { open: true, day, html: `<strong>Ouvert</strong> · ferme à ${fmt(current[1])}` };
  }

  const laterToday = HOURS[day].find(([open]) => open > minutes);
  if (laterToday) {
    return { open: false, day, html: `<strong>Fermé</strong> · ouvre à ${fmt(laterToday[0])}` };
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (HOURS[d].length) {
      const when = i === 1 ? "demain" : DAYS[d];
      return { open: false, day, html: `<strong>Fermé</strong> · ouvre ${when} à ${fmt(HOURS[d][0][0])}` };
    }
  }
  return { open: false, day, html: "<strong>Fermé</strong>" };
}

function renderStatus() {
  const status = computeStatus();
  document.querySelectorAll("[data-status]").forEach((el) => {
    el.classList.toggle("open", status.open);
    el.classList.toggle("closed", !status.open);
    el.querySelector(".status-text").innerHTML = status.html;
  });
  document.querySelectorAll(".hours tr").forEach((row) => {
    row.classList.toggle("today", Number(row.dataset.day) === status.day);
  });
}

renderStatus();
setInterval(renderStatus, 60 * 1000);

// Onglets de la carte : surligne la catégorie visible
const tabs = [...document.querySelectorAll(".menu-tabs a")];
const tabTargets = tabs.map((tab) => document.querySelector(tab.getAttribute("href")));

function setActiveTab(id) {
  tabs.forEach((tab) => {
    const active = tab.getAttribute("href") === `#${id}`;
    tab.classList.toggle("active", active);
    if (active) {
      const bar = tab.parentElement;
      bar.scrollTo({ left: tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }
  });
}

if ("IntersectionObserver" in window) {
  const tabObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) setActiveTab(entry.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  tabTargets.forEach((el) => el && tabObserver.observe(el));

  // Apparition des éléments au défilement
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-head, .menu-card, .cta-band, .hours, .rating-card, .perks li, .access > *")
    .forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
}
