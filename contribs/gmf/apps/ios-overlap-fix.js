      // Hack for ios Safari browser (UI overlapping on iOS 10)
      var userAgent = window.navigator.userAgent;
      var regEx = /iP(hone|od|ad)/;
      var iOS = regEx.test(userAgent);
      var webkit = /WebKit/i.test(userAgent);
      var criOS = /CriOS/i.test(userAgent);
      var platform = regEx.test(window.navigator.platform);

      if(iOS && webkit && platform && !criOS && !window.MSStream) {
        function iosChecker() {
          var v = (window.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v  [2], 10), parseInt(v[3] || 0, 10)];
        }

        var iosVersion = iosChecker()[0];
        if (iosVersion >= 10) {
          var interval = setInterval(function () {
            if($('div.ol-zoom').get(0)) {
              clearInterval(interval);
              $('button.gmf-mobile-nav-left-trigger').addClass('ios-margin-top');
              $('button.gmf-mobile-nav-right-trigger').addClass('ios-margin-top');
              $('gmf-search').addClass('ios-margin-top');
              $('div.ol-zoom').addClass('ios-zoom-btn');
              $('div.ol-rotate').addClass('ios-rotate-btn');
              $('button[ngeo-mobile-geolocation]').addClass('ios-geolocation-btn');
            }
          }, 100);
        }
      }