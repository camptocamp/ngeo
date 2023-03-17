import angular from 'angular';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoGetBrowserLanguage', []);

/**
 * Provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 * @typedef {function(Array.<string>):string} miscGetBrowserLanguage
 */

/**
 * Provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 *
 * @param {angular.IWindowService} $window Angular $window service.
 * @return {miscGetBrowserLanguage} The "GetBrowserLanguage" function.
 *
 * @ngdoc service
 * @ngname ngeoGetBrowserLanguage
 * @ngInject
 * @private
 * @hidden
 */
function factory($window) {
  return (
    /**
     * @param {Array.<string>} availableLanguages Available languages.
     * @return {string} The "best" language code.
     */
    function (availableLanguages) {
      const nav = $window.navigator;
      let browserLanguages = nav.languages || [nav.language];
      browserLanguages = browserLanguages.map((item) => item.substring(0, 2));
      // remove duplicated language codes
      browserLanguages = browserLanguages.filter((item, index, arr) => arr.indexOf(item) == index);
      const supportedLanguages = browserLanguages.filter((item) => availableLanguages.indexOf(item) != -1);
      return supportedLanguages[0];
    }
  );
}

module.factory('ngeoGetBrowserLanguage', factory);

export default module;
