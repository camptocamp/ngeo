goog.provide('ngeo.GetBrowserLanguage');
goog.provide('ngeo_getbrowserlanguage_service');

goog.require('ngeo');


/**
 * @typedef {function(Array.<string>):string}
 */
ngeo.GetBrowserLanguage;


/**
 * This service provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 */
ngeoModule.factory('ngeoGetBrowserLanguage', ['$window',
  /**
   * @param {angular.$window} $window Angular $window service.
   * @return {ngeo.GetBrowserLanguage} The "GetBrowserLanguage" function.
   */
  function($window) {
    return (
        /**
         * @param {Array.<string>} availableLanguages Available languages.
         * @return {string} The "best" language code.
         */
        function(availableLanguages) {
          var nav = $window.navigator;
          var browserLanguages = nav.languages || nav.language ||
              nav.browserLanguage || nav.systemLanguage || nav.userLanguage;
          if (!goog.isArray(browserLanguages)) {
            browserLanguages = [browserLanguages];
          }
          browserLanguages = goog.array.map(browserLanguages, function(item) {
            return item.substring(0, 2);
          });
          // remove duplicated language codes
          browserLanguages = goog.array.filter(browserLanguages,
              function(item, index, arr) {
                return arr.indexOf(item) == index;
              });
          var supportedLanguages = goog.array.filter(browserLanguages,
              function(item) {
                return availableLanguages.indexOf(item) != -1;
              });
          return supportedLanguages[0];
        });
  }]);
