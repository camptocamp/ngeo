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
*/
if (iOS && webkit && platform && !chromeiOS) {
  const iosVersion = iosChecker()[0];
  console.log('iOS version: ', iosVersion);
  if (iosVersion >= 10) {
    const interval = setInterval(() => {
      console.log('interval');
      if ($('div.ol-zoom').get(0)) {
        console.log('stop interval');
        clearInterval(interval);
        $('body').addClass('ios-margin');
      }
    }, 100);
  }
}
