(function () {
  // Hack for ios Safari browser (UI overlapping on iOS 10)
  var userAgent = window.navigator.userAgent;
  var regEx = /(iPhone|iPod|iPad)/;
  var iOS = regEx.test(userAgent);
  var webkit = /WebKit/i.test(userAgent);
  var chromeiOS = /(Chrome|CriOS|OPiOS)/i.test(userAgent);
  var platform = regEx.test(window.navigator.platform);

  var iosChecker = function () {
    var v = window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  };

  /**
   * iOS is true on iOS or emulators (user-agent)
   * webkit is true on Safari/Chrome, etc
   * platform is true on iOS, not emulator (platform)
   * chromeiOS is true on other browsers (chrome/opera)
   */
  if (iOS && webkit && platform && !chromeiOS) {
    var iosVersion = iosChecker()[0];
    if (iosVersion >= 10) {
      var interval = setInterval(function () {
        if ($('div.ol-zoom').get(0)) {
          clearInterval(interval);
          $('body').addClass('ios-margin');
        }
      }, 100);
    }
  }
})();
