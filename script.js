// ================= NAVBAR =================
const navInner = document.querySelector(".nav-inner");
const navbar = document.querySelector(".navbar");

let lastScroll = 0;
let isScrolling;

// SCROLL NAVBAR
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // background change
  navInner.style.background =
    currentScroll > 50
      ? "rgba(0,0,0,0.6)"
      : "rgba(255,255,255,0.06)";

  // hide saat scroll turun
  if (currentScroll > lastScroll) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  // muncul lagi saat berhenti
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    navbar.classList.remove("hide");
  }, 200);

  lastScroll = currentScroll;
});

// ================= SMOOTH SCROLL =================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// ================= LIGHT FOLLOW =================
const light = document.getElementById("light");

document.addEventListener("mousemove", (e) => {
  if (!light) return;

  light.style.left = e.clientX + "px";
  light.style.top = e.clientY + "px";
});

// ================= ABOUT ANIMATION =================
const about = document.querySelector(".about");

function revealAbout() {
  const trigger = window.innerHeight - 100;

  if (about.getBoundingClientRect().top < trigger) {
    about.classList.add("show");
  }
}

// ================= SKILL ANIMATION (FIX BUG) =================
const skills = document.querySelectorAll(".skill");
let skillPlayed = false;

function animateSkills() {
  if (skillPlayed) return; // biar gak ulang terus
  skillPlayed = true;

  skills.forEach(skill => {
    const percent = skill.getAttribute("data-percent");
    const bar = skill.querySelector(".bar div");
    const text = skill.querySelector(".percent");

    let count = 0;

    const interval = setInterval(() => {
      if (count >= percent) {
        clearInterval(interval);
      } else {
        count++;
        text.innerText = count + "%";
        bar.style.width = count + "%";
      }
    }, 15);
  });
}

// ================= SCROLL CONTROLLER =================
window.addEventListener("scroll", () => {
  revealAbout();

  const trigger = window.innerHeight - 100;

  if (about.getBoundingClientRect().top < trigger) {
    animateSkills();
  }
});

// ================= PROJECT CARD TILT =================
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

const text = "Muhammad Owal Nifka";
const typingEl = document.getElementById("typing");

let i = 0;

function typingEffect() {
  if (i < text.length) {
    typingEl.innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 80); // kecepatan ngetik
  }
}

typingEffect();


// ================= ACTIVE NAV LINK =================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function activeNav() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activeNav);
window.addEventListener("load", activeNav);