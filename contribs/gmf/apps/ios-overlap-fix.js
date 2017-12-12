// Hack for ios Safari browser (UI overlapping on iOS 10)
const userAgent = window.navigator.userAgent;
const regEx = /iP(hone|od|ad)/;
const iOS = regEx.test(userAgent);
const webkit = /WebKit/i.test(userAgent);
const chromeiOS = /(Chrome|CriOS|OPiOS)/i.test(userAgent);
const platform = regEx.test(window.navigator.platform);

const iosChecker = function() {
  const v = (window.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
  return [parseInt(v[1], 10), parseInt(v  [2], 10), parseInt(v[3] || 0, 10)];
};

/**
* iOS is true on iOS or emulators (user-agent)
* webkit is true on Safari/Chrome, etc
* platform is true on iOS, not emulator (platform)
* chromeiOS is true on other browsers (chrome/opera)
* MSStream is true on IE
*/
if (iOS && webkit && platform && !chromeiOS && !window.MSStream) {
  const iosVersion = iosChecker()[0];
  if (iosVersion >= 10) {
    const interval = setInterval(() => {
      if ($('div.ol-zoom').get(0)) {
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
