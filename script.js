

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

// Event listener for click to enlarge the cursor
$(document).on("mousedown", function() {
  cursor.addClass("active");
  follower.addClass("active");
});

$(document).on("mouseup", function() {
  cursor.removeClass("active");
  follower.removeClass("active");
});

// Event listener for hover effects on links
$(".link").on("mouseenter", function() {
  cursor.addClass("hover");
  follower.addClass("hover");
});

$(".link").on("mouseleave", function() {
  cursor.removeClass("hover");
  follower.removeClass("hover");
});


// Starten der Animationsschleife
requestAnimationFrame(moveCursor);

// Event listener for hover effects on links, or specific classes
$(".link, .logo, #darkModeToggle, .hamburger, .close").on("mouseenter", function() {
  cursor.addClass("hover");
  follower.addClass("hover");
  var rect = this.getBoundingClientRect();
  follower.css({
    width: rect.width + 60,
    height: rect.height + 60,
    transition: 'width 0.1s ease, height 0.1s ease'
  });
});

$(".link, .logo, #darkModeToggle, .hamburger").on("mouseleave", function() {
  cursor.removeClass("hover");
  follower.removeClass("hover");
  follower.css({
    width: '50px',
    height: '50px',
    transition: 'width 0.1s ease, height 0.1s ease'
  });

  
    function handleCursorVisibility() {
      const cursor = document.getElementById('cursor');
      if (window.innerWidth <= 991) {
        cursor.style.display = 'none';
      } else {
        cursor.style.display = 'block';
      }
    }
});

// Function to handle cursor visibility based on window width / Everything under 991px destroy cursor
function handleCursorVisibility() {
  if (window.innerWidth <= 991) {
    cursor.hide();
    follower.hide();
  } else {
    cursor.show();
    follower.show();
  }
}

// Event listeners for window resize and load to handle cursor visibility
$(window).on("resize", handleCursorVisibility);
$(window).on("load", handleCursorVisibility);

// Start the animation loop
requestAnimationFrame(moveCursor);

// Initial check for cursor visibility
handleCursorVisibility();


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


document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.querySelector('body');
  const lottieLightContainer = document.getElementById('lottieLight');
  const lottieDarkContainer = document.getElementById('lottieDark');
  const logoLight = document.getElementById('logoLight');
  const logoDark = document.getElementById('logoDark');

  let lottieLight, lottieDark;
  let direction = 1;
  let directionLight = -1;
  let directionDark = -1;
  

  function loadLottieAnimations() {
      lottieLight = lottie.loadAnimation({
          container: lottieLightContainer,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '/src/assets/Animations/lottiewhite.json' // Your JSON file for light mode
      });

      lottieDark = lottie.loadAnimation({
          container: lottieDarkContainer,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '/src/assets/Animations/lottieblack.json' // Your JSON file for dark mode
      });

      // Set the initial frame to the last frame for lottieLight
      lottieLight.addEventListener('DOMLoaded', () => {
          lottieLight.goToAndStop(lottieLight.totalFrames - 1, true);
      });

      // Set the initial frame to the last frame for lottieDark
      lottieDark.addEventListener('DOMLoaded', () => {
          lottieDark.goToAndStop(lottieDark.totalFrames - 1, true);
      });
  }

  function toggleDarkMode() {
    if (body.classList.contains('dark-mode')) {
        lottieLightContainer.style.display = 'none';
        lottieDarkContainer.style.display = 'block';
        logoLight.style.display = 'block';
        logoDark.style.display = 'none';
        lottieDark.setDirection(directionDark);
        lottieDark.play();
        directionDark = -directionDark; // Reverse the direction for the next click
    } else {
        lottieDarkContainer.style.display = 'none';
        lottieLightContainer.style.display = 'block';
        logoLight.style.display = 'none';
        logoDark.style.display = 'block';
        lottieLight.setDirection(directionLight);
        lottieLight.play();
        directionLight = -directionLight; // Reverse the direction for the next click
    }
    body.classList.toggle('dark-mode');
}

lottieLightContainer.addEventListener('click', () => {
    lottieLight.setDirection(directionLight);
    lottieLight.play();
    directionLight = -directionLight; // Reverse the direction for the next click
});

lottieDarkContainer.addEventListener('click', () => {
    lottieDark.setDirection(directionDark);
    lottieDark.play();
    directionDark = -directionDark; // Reverse the direction for the next click
});

if (lottieDark) {
  logoLight.style.display = 'block';
  logoDark.style.display = 'none';
} else {
  logoLight.style.display = 'none';
  logoDark.style.display = 'block';
}


  darkModeToggle.addEventListener('click', toggleDarkMode);

  loadLottieAnimations();

  // Set initial state to dark mode // zu beginn des dark-modes statement
  body.classList.add('dark-mode');
  lottieLightContainer.style.display = 'block';
  lottieDarkContainer.style.display = 'none';
  logoLight.style.display = 'none';
  logoDark.style.display = 'black';
});




  // Scroll Behaviour by Scrolling down with container/header
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.top_navigation_container'); // Assuming your header has the class "header"

  // Scroll event to change header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
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

document.addEventListener("DOMContentLoaded", function() {
  var tl = gsap.timeline({ paused: true });

  tl.to(".menu-left", {
      duration: 0.8,
      left: 0,
      ease: "power4.out",
  })
  .staggerFrom(
      ".menu__item",
      0.6,
      {
          y: 30,
          opacity: 0,
          ease: "power4.out",
      },
      0.1,
      "-=0.5"
  );

  tl.reverse();

  document.querySelector(".hamburger").addEventListener("click", function() {
      tl.reversed(!tl.reversed());
  });
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

// Function to disable scrolling
function disableScroll() {
  document.documentElement.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
  document.documentElement.style.overflow = 'auto';
}

// Check if the current page is the home page
function isHomePage() {
  // Get the current path and the filename of the current URL
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1);

  // Return true if the filename is index.html or if the path is just "/"
  return fileName === 'index.html' || fileName === '';
}

// Run the loading animation if on the home page
if (isHomePage()) {
  disableScroll();

  // Start the loading animation with a delay
  setTimeout(function() {
    gsap.fromTo(
      ".loading-page",
      { opacity: 1 },
      {
        opacity: 0,
        display: "none",
        duration: 1.5,
        delay: 2.5,
        onComplete: enableScroll // Enable scrolling after the animation completes
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
  }, 0); // Delay in milliseconds before starting the animation
}

// --------------------------------------//
// Loading Animation LOGO + Landing ENDE //
// -------------------------------------//



//
//
//
//
//
//





//
//
//
//
//
//


// -------------------------------------------//
// Lokomotiv text scroll in Menu Text effekt //
// -----------------------------------------//
// keine ahnung für was? lösch wenn nichts verdächtiges ist
 /* const scroll = new LocomotiveScroll({
    el: document.querySelector("#js-scroll"),
    smooth: true,
    smoothMobile: true,
    inertia: 0.75,
  });

*/




 