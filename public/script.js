"use strict";

document.querySelector('.linkedIn-icon')?.addEventListener('click', () => {
    window.location.href = 'https://linkedin.com';
  });

document.querySelector('.github-icon')?.addEventListener('click', () => {
    window.location.href = 'https://github.com';
  });

document.querySelector('.x-icon')?.addEventListener('click', () => {
    window.location.href = 'https://x.com';
  });

document.querySelector('.about_me-icon')?.addEventListener('click', () => {
    window.location.href = './#about';
  });

document.querySelector('.portfolio-icon')?.addEventListener('click', () => {
    window.location.href = './#projects';
  });

document.querySelector('.resume-icon')?.addEventListener('click', () => {
    window.location.href = './public/assets/Resume.pdf';
  });

document.querySelector('.contact-icon')?.addEventListener('click', () => {
    window.location.href = './#contact';
  });

function toggleMenu () {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu?.classList.toggle("open");
    icon.classList.toggle("open");
}

