// DarkMode Toggle JS Script
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.querySelector('body');
const toggleIcon = document.querySelector('.bi');
const logoLight = document.getElementById('logoLight');
const logoDark = document.getElementById('logoDark');

// Funktion zur Aktualisierung des Logos und Icons basierend auf dem Dark-Mode
function updateLogoAndIcon() {
    if (body.classList.contains('dark-mode')) {
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
        toggleIcon.classList.remove('bi-brightness-high-fill');
        toggleIcon.classList.add('bi-moon');
    } else {
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
        toggleIcon.classList.remove('bi-moon');
        toggleIcon.classList.add('bi-brightness-high-fill');
    }
}

// Dark-Mode-Schalter
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateLogoAndIcon();
});

// Initialisierung des Logos und Icons basierend auf dem aktuellen Modus beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('dark-mode'); // Dark-Mode beim Start aktivieren
    updateLogoAndIcon();
});



// Menu Slide effect JS Script

var tl = gsap.timeline({ paused: true });

tl.to(".menu-left", {
    duration: 0.8, // Slightly reduced duration for a faster slide-in
    left: 0,
    ease: "power4.out", // Using a stronger easing function for a smoother transition
})
.staggerFrom(
    ".menu-links > .menu-link",
    0.6, // Reduced duration for stagger effect
    {
        y: 30, // Slightly reduced y value for more subtle appearance
        opacity: 0,
        ease: "power4.out", // Consistent easing function
    },
    0.1, // Reduced stagger delay
    "-=0.5" // Overlap the stagger animation with the initial slide-in
);

tl.reverse();

document.querySelector(".hamburger").addEventListener("click", function() {
    tl.reversed(!tl.reversed()); // Toggle the reversed state of the timeline
});

// Hamburger Effect---
var btn = $('.btn');

btn.on('click', function() {
  $(this).toggleClass('active not-active');
});


gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 2.5,
    }
  );
  
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.3,
    }
  );
  