"use strict";

// =====================
// Theme Toggle
// =====================
const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

toggleBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
});

// =====================
// Typing Animation
// =====================
const roles = [
    "Software Development Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "Defense Systems Engineer",
];

const typingEl = document.getElementById("typing-text");
let roleIndex  = 0;
let charIndex  = 0;
let deleting   = false;

function type() {
    const current = roles[roleIndex];

    if (deleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = deleting ? 35 : 75;

    if (!deleting && charIndex === current.length) {
        delay    = 2200;
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting   = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        delay      = 450;
    }

    setTimeout(type, delay);
}

type();

// =====================
// Scroll Fade-In
// =====================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.07 });

document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

// =====================
// Active Sidebar Nav
// =====================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));
