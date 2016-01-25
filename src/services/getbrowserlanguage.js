goog.provide('ngeo.GetBrowserLanguage');

goog.require('ngeo');


/**
 * Provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 * If you compile your code with the Closure Compiler, the externs file
 * `ngeo/externs/closure-compiler.js` has to be included.
 *
 * @typedef {function(Array.<string>):string}
 */
ngeo.GetBrowserLanguage;


/**
 * @param {angular.$window} $window Angular $window service.
 * @return {ngeo.GetBrowserLanguage} The "GetBrowserLanguage" function.
 * @ngInject
 * @ngdoc service
 * @ngname ngeoGetBrowserLanguage
 */
ngeo.getBrowserLanguageFactory = function($window) {
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
        browserLanguages = browserLanguages.map(function(item) {
          return item.substring(0, 2);
        });
        // remove duplicated language codes
        browserLanguages = browserLanguages.filter(function(item, index, arr) {
          return arr.indexOf(item) == index;
        });
        var supportedLanguages = browserLanguages.filter(function(item) {
          return availableLanguages.indexOf(item) != -1;
        });
        return supportedLanguages[0];
      });
};


ngeo.module.factory('ngeoGetBrowserLanguage', ngeo.getBrowserLanguageFactory);
