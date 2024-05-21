(function() {
    'use strict';
  
    function isMobileOrTablet() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  
    if (!isMobileOrTablet()) {
      var VanillaTilt = (function () {
        'use strict';
  
        // (The rest of your VanillaTilt code here)
        // ...
  
        if (typeof document !== "undefined") {
          window.VanillaTilt = VanillaTilt;
  
          VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
        }
  
        return VanillaTilt;
      }());
    }
  
  })();
  