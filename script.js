
//#region Holo script for movement and everything START
// -----------------------------------------------------------------//
// Holo script for movement and everything START                    //
// ---------------------------------------------------------------//


const initialStyles = new WeakMap();

function saveInitialStyles(card) {
  // Initialwerte sichern
  const computedStyle = window.getComputedStyle(card);
  
  initialStyles.set(card, {
    transform: computedStyle.transform || 'rotateX(0deg) rotateY(0deg) scale(1)',
    mx: computedStyle.getPropertyValue('--mx').trim() || '0%',
    my: computedStyle.getPropertyValue('--my').trim() || '0%',
    s: computedStyle.getPropertyValue('--s').trim() || '1',
    o: computedStyle.getPropertyValue('--o').trim() || '1',
    pos: computedStyle.getPropertyValue('--pos').trim() || '0% 0%',
    posx: computedStyle.getPropertyValue('--posx').trim() || '0%',
    posy: computedStyle.getPropertyValue('--posy').trim() || '0%',
    hyp: computedStyle.getPropertyValue('--hyp').trim() || '0',
    galaxybg: computedStyle.getPropertyValue('--galaxybg').trim() || 'initial',
  });
}


function OrientCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mvX = e.clientX - centerX;
  const mvY = e.clientY - centerY;
  const maxTilt = 15;
  const Xdeg = clamp(-mvY / (rect.height / 2) * maxTilt, -maxTilt, maxTilt);
  const Ydeg = clamp(mvX / (rect.width / 2) * maxTilt, -maxTilt, maxTilt);

  gsap.to(card, {
    duration: 0.5,
    transform: `rotateX(${Xdeg}deg) rotateY(${Ydeg}deg) scale(1.05)`,
    "--mx": `${40 - (Ydeg * 2.5)}%`,
    "--my": `${5 + Xdeg / 2}%`,
    "--pos": `${Ydeg * 2.5}% ${Xdeg * 0.5}%`,
    "--posx": `${50 + Ydeg / 2 + Xdeg * 0.5}%`,
    "--posy": `${50 + Xdeg / 2 + Ydeg / 2}%`,
    "--hyp": `${Math.min(Math.max(Math.sqrt((mvX * mvX) + (mvY * mvY)) / 50, 0), 1)}`,
    ease: "power4.out",
    
  });
}

function handleMouseLeave(e) {
  const card = e.currentTarget;
  const initial = initialStyles.get(card);

  if (initial) {
    gsap.to(card, {
      duration: 0.5,
      transform: initial.transform,
      "--mx": initial.mx,
      "--my": initial.my,
      "--pos": initial.pos,
      "--posx": initial.posx,
      "--posy": initial.posy,
      "--hyp": initial.hyp,
      "--scale": initial.s,
      ease: "power4.inOut",
      
    });
  }
}

function clamp(value, min = -20, max = 20) {
  return Math.min(Math.max(value, min), max);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.DeviceOrientationEvent && 'ontouchstart' in window) {

    window.addEventListener('deviceorientation', orientationhandler, false);
    window.addEventListener('MozOrientation', orientationhandler, false);
  }

  document.querySelectorAll(".card").forEach(card => {
    saveInitialStyles(card);
    card.addEventListener('mousemove', e => {
      
      OrientCard(e);
    });
    card.addEventListener('mouseleave', handleMouseLeave);
  });
});

function orientationhandler(event) {
  const alpha = event.alpha; // Rotation um die Z-Achse (0–360 Grad)
  const beta = event.beta;   // Neigung um die X-Achse (-180 bis 180 Grad)
  const gamma = event.gamma; // Neigung um die Y-Achse (-90 bis 90 Grad)

  gsap.to(".card", {
    duration: 0.5,
    transform: `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`,
    ease: "power2.out",
    overwrite: true // Overwrite previous GSAP animations
  });
}




// -----------------------------------------------------------------//
// Holo script for movement and everything ENDE                    //
// ---------------------------------------------------------------//

//#endregion

//
//
//
//
//
//


//#region FILTER JAVASCRIPT START
// -----------------------------------------------------------------//
// FILTER JAVASCRIPT START                                         //
// ---------------------------------------------------------------//

// Filter for PNL_options -> Which Holo do you want?
// Update the Holographic source for all cards based on input value
function adaptCardType(e) {
  var cards = document.getElementsByClassName("card");
  Array.from(cards).forEach(card => {
    card.setAttribute('data-rarity', e.value);
  });
}


// Filter for Sort by
document.addEventListener("DOMContentLoaded", function() {
  const categoryFilter = document.getElementById('category-filter');
  const cardGrid = document.querySelector('.card-grid');

  categoryFilter.addEventListener('change', function() {
    const selectedCategory = categoryFilter.value;
    filterCards(selectedCategory);
  });

  function filterCards(category) {
    const cards = Array.from(cardGrid.querySelectorAll('.holographic__section'));

    cards.forEach(card => {
      const cardCategory = card.querySelector('.card').getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
});

// Filter for Grid-Layout Changer

document.addEventListener("DOMContentLoaded", function() {
  // Get references to the buttons
  const grid1Button = document.querySelector("button img[alt='Grid 1']").parentElement;
  const grid2Button = document.querySelector("button img[alt='Grid 2']").parentElement;
  const barsButton = document.querySelector("button img[alt='Grid 3']").parentElement;

  // Get reference to the card grid
  const cardGrid = document.querySelector(".card-grid");

  // Set initial layout and active button
  changeGridLayout(1); // Set layout-3 as the initial layout

  // Add event listeners to the buttons
  grid1Button.addEventListener("click", () => changeGridLayout(1));
  grid2Button.addEventListener("click", () => changeGridLayout(2));
  barsButton.addEventListener("click", () => changeGridLayout(3));

  // Function to change grid layout
  function changeGridLayout(layout) {
    cardGrid.classList.remove("layout-1", "layout-2", "layout-3");
    grid1Button.classList.remove("active");
    grid2Button.classList.remove("active");
    barsButton.classList.remove("active");

    switch(layout) {
      case 1:
        cardGrid.classList.add("layout-1");
        grid1Button.classList.add("active");
        break;
      case 2:
        cardGrid.classList.add("layout-2");
        grid2Button.classList.add("active");
        break;
      case 3:
        cardGrid.classList.add("layout-3");
        barsButton.classList.add("active");
        break;
    }
  }
});

// -----------------------------------------------------------------//
// Filter ENDE                                                     //
// ---------------------------------------------------------------//
//#endregion



//
//
//
//
//
//


//#region Lightbox Funktion Start Gallery vom Single card portfolio START
// -----------------------------------------------------------------//
// Lightbox Funktion Start Gallery vom Single card portfolio START //
// ---------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', function() {
  Fancybox.bind('[data-fancybox="gallery"]', {
    // Hier kannst du Optionen für Fancybox hinzufügen, wenn gewünscht
  });
});





// ----------------------------------------------------------------//
// Lightbox Funktion Start Gallery vom Single card portfolio ENDE //
// --------------------------------------------------------------//
//#endregion



//
//
//
//
//
//


//#region Landing Page Slider / Carousel  
// -------------------------------------------//
// Landing Page Slider / Carousel            //
// -----------------------------------------//

$(document).ready(function() {
  var autoplayInterval = 10000; // Time in milliseconds between slides
  var autoplayTimer;
  var startX, startY, endX, endY;

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
      
      stopAutoplay();  // Stop autoplay on manual change
      startAutoplay(); // Restart autoplay
  });

  // Swipe event handling
  $('.carousel-wrapper').on('touchstart mousedown', function(e) {
      if(e.type === 'touchstart') {
          startX = e.originalEvent.touches[0].pageX;
          startY = e.originalEvent.touches[0].pageY;
      } else {
          startX = e.pageX;
          startY = e.pageY;
          e.preventDefault();
      }
      stopAutoplay();  // Stop autoplay on swipe start
  });

  $('.carousel-wrapper').on('touchend mouseup', function(e) {
      if(e.type === 'touchend') {
          endX = e.originalEvent.changedTouches[0].pageX;
          endY = e.originalEvent.changedTouches[0].pageY;
      } else {
          endX = e.pageX;
          endY = e.pageY;
      }
      
      var diffX = endX - startX;
      var diffY = endY - startY;

      if(Math.abs(diffX) > Math.abs(diffY)) {
          if(diffX > 50) {
              // Swipe right
              var $current = $('.slide.active');
              var prev = $current.prev('.slide').length ? 
                         $current.prev('.slide').data('slide') : 
                         $('.slide').last().data('slide');
              changeSlide(prev);
          } else if(diffX < -50) {
              // Swipe left
              var $current = $('.slide.active');
              var next = $current.next('.slide').length ? 
                         $current.next('.slide').data('slide') : 
                         $('.slide').first().data('slide');
              changeSlide(next);
          }
      }

      startAutoplay(); // Restart autoplay after swipe end
  });

  // Optional: Start with the first slide active
  changeSlide($('.nav-dot.active').data('slide'));

  // Add 'loading' class to the first dot immediately
  $('.nav-dot.active').addClass('loading');

  // Start autoplay when the document is ready
  startAutoplay();
});

//#endregion




//
//
//
//
//
//


//#region Custom Cursor Dot+ Follower START +

// --------------------------------- //
// Custom Cursor Dot+ Follower START + //
// --------------------------------- //

// 1. Variablen und Initialisierungen
var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

// 2. Cursor-Bewegungsfunktion
function moveCursor() {
  updateCursorPosition();
  requestAnimationFrame(moveCursor);
}

// Aktualisiere die Cursor-Position
function updateCursorPosition() {
  posX += (mouseX - posX) / 9;
  posY += (mouseY - posY) / 9;

  follower.css({
    left: `${posX - 1}px`,
    top: `${posY - 1}px`
  });
  
  cursor.css({
    left: `${mouseX}px`,
    top: `${mouseY}px`
  });
}

// 3. Mausbewegung Event-Listener
function initMouseMoveListener() {
  $(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// 4. Mausklick-Ereignisse
function initMouseClickListeners() {
  $(document).on("mousedown", function() {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(document).on("mouseup", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });
}

// 5. Cursor-Sichtbarkeit
function handleCursorVisibility() {
  if (window.innerWidth <= 991) {
    cursor.hide();
    follower.hide();
  } else {
    cursor.show();
    follower.show();
  }
}

// Event-Listener für Fenstergrößenänderung und Laden der Seite
function initResizeListener() {
  $(window).on("resize", handleCursorVisibility);
  $(window).on("load", handleCursorVisibility);
}

// Initialisierung
function init() {
  requestAnimationFrame(moveCursor);
  initMouseMoveListener();
  initMouseClickListeners();
  initResizeListener();
  handleCursorVisibility();
}

init();

// --------------------------------- //
// Custom Cursor Dot+ Follower ENDE //
// --------------------------------- //
//#endregion

//
//
//
//
//
//

//#region DarkMode Toggle JS Script Start

// -------------------------------- //
// DarkMode Toggle JS Script Start //
// ------------------------------ //

// 1. Initial Setup and Variables
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.querySelector('body');
  const lottieLightContainer = document.getElementById('lottieLight');
  const lottieDarkContainer = document.getElementById('lottieDark');
  const logoLight = document.getElementById('logoLight');
  const logoDark = document.getElementById('logoDark');

  let lottieLight, lottieDark;
  let directionLight = -1;
  let directionDark = -1;

// 2. Load Lottie Animations
function loadLottieAnimations() {
  lottieLight = lottie.loadAnimation({
    container: lottieLightContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/src/assets/Animations/lottiewhite.json'
  });

  lottieDark = lottie.loadAnimation({
    container: lottieDarkContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/src/assets/Animations/lottieblack.json'
  });

  // EventListener nur einmal hinzufügen
  const onDOMLoaded = (animation) => {
    animation.goToAndStop(animation.totalFrames - 1, true);
  };

  lottieLight.addEventListener('DOMLoaded', () => onDOMLoaded(lottieLight));
  lottieDark.addEventListener('DOMLoaded', () => onDOMLoaded(lottieDark));
}


// 3. Toggle Dark Mode Function
function toggleDarkMode() {
  if (body.classList.contains('dark-mode')) {
    // Switch to light mode
    lottieLightContainer.style.display = 'none';
    lottieDarkContainer.style.display = 'block';
    logoLight.style.display = 'block';
    logoDark.style.display = 'none';
    lottieDark.setDirection(directionDark);
    lottieDark.play();
    directionDark = -directionDark; // Reverse the direction for the next click
  } else {
    // Switch to dark mode
    lottieDarkContainer.style.display = 'none';
    lottieLightContainer.style.display = 'block';
    logoLight.style.display = 'none';
    logoDark.style.display = 'block';
    lottieLight.setDirection(directionLight);
    lottieLight.play();
    directionLight = -directionLight; // Reverse the direction for the next click
  }
  body.classList.toggle('dark-mode'); // Toggle the dark-mode class
}

// 4. Event Listeners for Lottie Containers

  // Verwende debounced Funktion für Clicks
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleLottieLightClick = debounce(() => {
    lottieLight.setDirection(directionLight);
    lottieLight.play();
    directionLight = -directionLight;
  }, 200);

  const handleLottieDarkClick = debounce(() => {
    lottieDark.setDirection(directionDark);
    lottieDark.play();
    directionDark = -directionDark;
  }, 200);

  lottieLightContainer.addEventListener('click', handleLottieLightClick);
  lottieDarkContainer.addEventListener('click', handleLottieDarkClick);


// 5. Initial Display State

if (lottieDark) {
  logoLight.style.display = 'block';
  logoDark.style.display = 'none';
} else {
  logoLight.style.display = 'none';
  logoDark.style.display = 'block';
}

// Set up dark mode toggle event listener
darkModeToggle.addEventListener('click', toggleDarkMode);

// Load Lottie animations
loadLottieAnimations();

// Set initial state to dark mode
body.classList.add('dark-mode');
lottieLightContainer.style.display = 'block';
lottieDarkContainer.style.display = 'none';
logoLight.style.display = 'none';
logoDark.style.display = 'block'; // Corrected typo from 'black' to 'block'
});


// 6. Scroll Behavior for Header
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.top_navigation_container');

  const handleScroll = () => {
    if (window.scrollY > 35) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Verwende requestAnimationFrame für bessere Scroll-Performance
  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  });
});



// --------------------------------//
// DarkMode Toggle JS Script ENDE //
// ------------------------------//
//#endregion


//
//
//
//
//
//

//#region Menu Slide effect + Menu Items (Text) JS Script START //
// -----------------------------------//
// Menu Slide effect + Menu Items (Text) JS Script START //
// ---------------------------------//

// Warten, bis der DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
  // Erstellen einer neuen GSAP-Zeitleiste, die zunächst pausiert ist
  var tl = gsap.timeline({ paused: true });

  // Definieren der Animationen auf der Zeitleiste
  tl.to(".menu-left", {
      duration: 0.8, // Dauer der Animation für die Verschiebung
      left: 0, // Endposition des Elements (sichtbar machen)
      ease: "power4.out", // Typ der Ease-Funktion für die Animation
  })
  // Menu Text Animation
  .staggerFrom(
      ".menu__item", // Auswahl der Elemente für die gestaffelte Animation
      0.6, // Dauer der Animation für jedes einzelne Element
      {
          y: 50, // Ausgangsposition der Animation (Bewegung nach unten)
          opacity: 0, // Anfangs-Transparenz des Elements
          ease: "power4.out", // Typ der Ease-Funktion für die Animation
      },
      0.1, // Zeitabstand zwischen den Animationen der einzelnen Elemente
      "-=0.5" // Offset für die Startzeit der gestafferten Animation
  );

  // Setzt die Animation auf den umgekehrten Zustand, so dass sie rückwärts abläuft
  tl.reverse();

  // Hinzufügen eines Click-Event-Listeners auf das Hamburger-Menü
  document.querySelector(".hamburger").addEventListener("click", function() {
      // Umschalten des Reversed-Status der Zeitleiste bei jedem Klick
      tl.reversed(!tl.reversed());
  });
});

// ----------------------------------//
// Menu Slide effect JS Script ENDE //
// --------------------------------//
//#endregion


//
//
//
//
//
//

//#region Hamburger Effect START 
// ------------------------//
// Hamburger Effect START //
// ----------------------//

var btn = $('.btn');

btn.on('click', function() {
  var $this = $(this);
  if ($this.hasClass('active')) {
    $this.removeClass('active').addClass('not-active');
  } else {
    $this.removeClass('not-active').addClass('active');
  }
});


// -----------------------//
// Hamburger Effect ENDE //
// ---------------------//
//#endregion


//
//
//
//
//
//

//#region Loading Animation LOGO + Landing START
// ----------------------------------------//
// Loading Animation LOGO + Landing START //
// ---------------------------------------//

// 1. Funktion zum Deaktivieren des Scrollens
function disableScroll() {
  document.documentElement.style.overflow = 'hidden';
}

// 2. Funktion zum Aktivieren des Scrollens
function enableScroll() {
  document.documentElement.style.overflow = 'auto';
}

// 3. Funktion zur Überprüfung der Startseite
function isHomePage() {
  // Get the current path and the filename of the current URL
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1);

  // Return true if the filename is index.html or if the path is just "/"
  return fileName === 'index.html' || fileName === '';
}

// 4. Funktion zum Starten der Ladeanimation
function startLoadingAnimation() {
  disableScroll(); // Scrollen deaktivieren

  // Ladeanimation starten
  gsap.fromTo(
    ".loading-page",
    { opacity: 1, visibility: 'visible' },
    {
      opacity: 0,
      visibility: 'hidden',
      duration: 1.5,
      delay: 2.5,
      ease: 'power2.out',
      onComplete: enableScroll // Scrollen nach Abschluss der Animation aktivieren
    }
  );

  gsap.fromTo(
    ".logo-name",
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
      ease: 'back.out(1.7)', // Verzögert und verleiht dem Logo eine zusätzliche Bewegung
    }
  );
}

// Hauptlogik zur Überprüfung und Ausführung der Animation
if (isHomePage()) {
  setTimeout(function() {
    document.querySelector(".loading-page").classList.add("hidden");
    startLoadingAnimation();
  }, 0); // Verzögerung vor dem Start der Animation
}


// --------------------------------------//
// Loading Animation LOGO + Landing ENDE //
// -------------------------------------//
//#endregion


//
//
//
//
//
//

//#region Footer gsap  
// -------------------------------------------//
// Footer gsap                               //
// -----------------------------------------//


// hover footer bar fill
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin();

  // Holen Sie sich alle Footer-Link-Elemente
  const footerLinks = document.querySelectorAll(".footer-link");

  footerLinks.forEach(link => {
    const fill = link.querySelector(".hover-line-fill");

    // GSAP-Animation für Hover-Effekte
    link.addEventListener("mouseenter", () => {
      gsap.to(fill, {
        scaleX: 1,
        width: "100%",
        duration: 0.4,
        ease: "power3.out"
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(fill, {
        scaleX: 0,
        width: "0%",
        duration: 0.4,
        ease: "power3.in"
      });
    });
  });
});










// hover footer social popup

gsap.fromTo(".socialicons", 
{ scale: 1 }, 
{ 
    scale: 1.2, 
    duration: 0.2, 
    ease: "power1.out", 
    paused: true 
}
);

document.querySelectorAll('.socialicons').forEach(icon => {
icon.addEventListener('mouseenter', () => {
    gsap.to(icon, { scale: 1.2, duration: 0.1, ease: "power2.out" });
});

icon.addEventListener('mouseleave', () => {
    gsap.to(icon, { scale: 1, duration: 0.1, ease: "power2.in" });
});
});
//
//
//
//
//
//
//#endregion
