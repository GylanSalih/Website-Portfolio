// -------------------------------------------//
// Landing Page Slider / Carousel            //
// -----------------------------------------//

$(document).ready(function() {
  var autoplayInterval = 10000; // Zeit in Millisekunden zwischen den Slides
  var autoplayTimer;

  function changeSlide(next) {
      var $current = $('.slide.active');
      var current = $current.data('slide');
      
      if (current === next) {
          return;
      }
      
      $('.slide').removeClass('active');
      $('.slide[data-slide=' + next + ']').addClass('active');
      
      $('.nav-dot').removeClass('active loading');
      $('.nav-dot[data-slide=' + next + ']').addClass('active loading');
  }

  function startAutoplay() {
      autoplayTimer = setInterval(function() {
          var $current = $('.slide.active');
          var current = $current.data('slide');
          var next = $current.next('.slide').length ? 
                      $current.next('.slide').data('slide') : 
                      $('.slide').first().data('slide');
          
          changeSlide(next);
      }, autoplayInterval);
  }

  function stopAutoplay() {
      clearInterval(autoplayTimer);
  }

  $('.nav-dot').on('click', function(e) {
      e.preventDefault();
      
      var next = $(this).data('slide');
      changeSlide(next);
      
      stopAutoplay();  // Stoppe Autoplay beim manuellen Wechsel
      startAutoplay(); // Starte Autoplay erneut
  });

  // Optional: Starte mit dem ersten Slide aktiv
  changeSlide($('.nav-dot.active').data('slide'));

  // Füge die 'loading' Klasse sofort zum ersten Dot hinzu
  $('.nav-dot.active').addClass('loading');

  // Starte Autoplay, wenn das Dokument bereit ist
  startAutoplay();
});




//
//
//
//
//
//



// --------------------------------- //
// Custom Cursor Dot+ Follower START //
// --------------------------------- //

var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

// Funktion zur Aktualisierung der Cursorposition mit GSAP-Animation
function moveCursor() {
  // Berechnung der neuen Cursor-Position (posX, posY) für sanfte Bewegung
  posX += (mouseX - posX) / 9;
  posY += (mouseY - posY) / 9;
  
  // Setzen der Positionen für Cursor und Cursor-Follower
  follower.css({
    left: posX - 1,
    top: posY - 1
  });
  
  cursor.css({
    left: mouseX,
    top: mouseY
  });

  // Anforderung einer neuen Animationsschleife
  requestAnimationFrame(moveCursor);
}

// Eventlistener für Mausbewegung, um Cursor zu bewegen
$(document).on("mousemove", function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Starten der Animationsschleife
requestAnimationFrame(moveCursor);

// Eventlistener für Hover-Effekte auf Links
$(".link").on("mouseenter", function() {
  cursor.addClass("active");
  follower.addClass("active");
});

$(".link").on("mouseleave", function() {
  cursor.removeClass("active");
  follower.removeClass("active");
});

// --------------------------------- //
// Custom Cursor Dot+ Follower ENDE //
// --------------------------------- //



//
//
//
//
//
//


// -------------------------------- //
// DarkMode Toggle JS Script Start //
// ------------------------------ //

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

// --------------------------------//
// DarkMode Toggle JS Script ENDE //
// ------------------------------//



//
//
//
//
//
//


// -----------------------------------//
// Menu Slide effect JS Script START //
// ---------------------------------//

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

// ----------------------------------//
// Menu Slide effect JS Script ENDE //
// --------------------------------//



//
//
//
//
//
//


// ------------------------//
// Hamburger Effect START //
// ----------------------//

var btn = $('.btn');

btn.on('click', function() {
  $(this).toggleClass('active not-active');
});

// -----------------------//
// Hamburger Effect ENDE //
// ---------------------//



//
//
//
//
//
//


// ----------------------------------------//
// Loading Animation LOGO + Landing START //
// ---------------------------------------//

// Regel, um das Scrollen zu verstecken
document.documentElement.style.overflow = 'hidden';

// Funktion zum Wiederherstellen des Scrollens
function enableScroll() {
  // Regel, um das Scrollen wieder anzuzeigen
  document.documentElement.style.overflow = 'auto';
}

// Animation der Lade-Seite mit einer Verzögerung von 4 Sekunden starten
setTimeout(function() {
  gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 2.5,
      onComplete: enableScroll // Nach Abschluss der Animation das Scrollen aktivieren
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
      delay: 0.5,
    }
  );
}, 0); // Wartezeit in Millisekunden, bevor die Animation gestartet wird

// --------------------------------------//
// Loading Animation LOGO + Landing ENDE //
// -------------------------------------//



//
//
//
//
//
//


// -----------------------------------------------------------------//
// Lightbox Funktion Start Gallery vom Single card portfolio START //
// ---------------------------------------------------------------//

  $(document).ready(function() {
    $('.img-box').click(function() {
      var imgSrc = $(this).find('img').attr('src');
      var imgAlt = $(this).find('img').attr('alt');
      var caption = $(this).find('.caption p:first-child').text();
  
      $('.lightbox img').attr('src', imgSrc);
      $('.lightbox img').attr('alt', imgAlt);
      $('.lightbox .caption').text(caption);
      $('.lightbox').fadeIn();
    });
  
    $('.close, .lightbox').click(function() {
      $('.lightbox').fadeOut(300); // Hier wird eine Verzögerung von 300 Millisekunden hinzugefügt
    });
  });
  
// ----------------------------------------------------------------//
// Lightbox Funktion Start Gallery vom Single card portfolio ENDE //
// --------------------------------------------------------------//



//
//
//
//
//
//


// -------------------------------------------//
// Lokomotiv text scroll in Menu Text effekt //
// -----------------------------------------//

  const scroll = new LocomotiveScroll({
    el: document.querySelector("#js-scroll"),
    smooth: true,
    smoothMobile: true,
    inertia: 0.75,
  });


















