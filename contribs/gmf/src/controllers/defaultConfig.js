goog.provide('gmf.controllers.defaultConfig');

gmf.controllers.defaultConfig = angular.module('gmfDefaultConfig', [
  'gettext',
  'tmh.dynamicLocale',
]);

gmf.controllers.defaultConfig.config(['tmhDynamicLocaleProvider', 'angularLocaleScript',
  /**
   * @param {tmhDynamicLocaleProvider} tmhDynamicLocaleProvider angular-dynamic-locale provider.
   * @param {string} angularLocaleScript the script.
   */
  function(tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  }
]);
