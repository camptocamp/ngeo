/**
 * @module ngeo.misc.getBrowserLanguage
 */
/**
 * @type {!angular.Module}
 */
const exports = angular.module('ngeoGetBrowserLanguage', []);


/**
 * Provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 *
 * @param {angular.$window} $window Angular $window service.
 * @return {ngeox.miscGetBrowserLanguage} The "GetBrowserLanguage" function.
 *
 * @ngdoc service
 * @ngname ngeoGetBrowserLanguage
 * @ngInject
 */
exports.factory_ = function($window) {
  return (
    /**
     * @param {Array.<string>} availableLanguages Available languages.
     * @return {string} The "best" language code.
     */
    function(availableLanguages) {
      const nav = $window.navigator;
      let browserLanguages = nav.languages || nav.language ||
            nav.browserLanguage || nav.systemLanguage || nav.userLanguage;
      if (!Array.isArray(browserLanguages)) {
        browserLanguages = [browserLanguages];
      }
      browserLanguages = browserLanguages.map(item => item.substring(0, 2));
      // remove duplicated language codes
      browserLanguages = browserLanguages.filter((item, index, arr) => arr.indexOf(item) == index);
      const supportedLanguages = browserLanguages.filter(item => availableLanguages.indexOf(item) != -1);
      return supportedLanguages[0];
    });
};

exports.factory('ngeoGetBrowserLanguage', exports.factory_);


export default exports;
