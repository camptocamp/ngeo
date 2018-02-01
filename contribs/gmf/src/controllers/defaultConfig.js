goog.provide('gmf.defaultConfig');

gmf.defaultConfig = angular.module('gmfDefaultConfig', [
]);

gmf.defaultConfig.config(['tmhDynamicLocaleProvider', 'angularLocaleScript',
  /**
   * @param {tmhDynamicLocaleProvider} tmhDynamicLocaleProvider angular-dynamic-locale provider.
   * @param {string} angularLocaleScript the script.
   */
  function(tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  }
]);
