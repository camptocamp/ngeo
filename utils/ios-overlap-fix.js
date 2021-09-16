// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
  // Hack for ios Safari browser (UI overlapping on iOS 10)
  let userAgent = window.navigator.userAgent;
  let regEx = /(iPhone|iPod|iPad)/;
  let iOS = regEx.test(userAgent);
  let webkit = /WebKit/i.test(userAgent);
  let chromeiOS = /(Chrome|CriOS|OPiOS)/i.test(userAgent);
  let platform = regEx.test(window.navigator.platform);

  let iosChecker = function () {
    let v = /OS (\d+)_(\d+)_?(\d+)?/.exec(window.navigator.appVersion);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  };

  /**
   * iOS is true on iOS or emulators (user-agent)
   * webkit is true on Safari/Chrome, etc
   * platform is true on iOS, not emulator (platform)
   * chromeiOS is true on other browsers (chrome/opera)
   */
  if (iOS && webkit && platform && !chromeiOS) {
    let iosVersion = iosChecker()[0];
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
