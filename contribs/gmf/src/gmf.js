/**
 * @module gmf
 */
goog.provide('gmf');

goog.require('ngeo');


/** @type {!angular.Module} */
gmf.module = angular.module('gmf', [ngeo.module.name, 'gettext',
    'ngAnimate', 'ngTouch', 'ngSanitize', 'tmh.dynamicLocale', 'ui.date', 'ui.slider']);

gmf.module.config(['tmhDynamicLocaleProvider', 'angularLocaleScript',
  /**
   * @param {tmhDynamicLocaleProvider} tmhDynamicLocaleProvider
   */
  function(tmhDynamicLocaleProvider, angularLocaleScript) {
    // configure the script URL
    tmhDynamicLocaleProvider.localeLocationPattern(angularLocaleScript);
  }
]);

/**
 * The default template based URL, used as it by the template cache.
 * @type {string}
 */
gmf.baseTemplateUrl = 'gmf';


/**
 * @const
 * @export
 */
gmf.DATALAYERGROUP_NAME = 'data';

/**
 * @const
 * @export
 */
gmf.COORDINATES_LAYER_NAME = 'gmfCoordinatesLayerName';
