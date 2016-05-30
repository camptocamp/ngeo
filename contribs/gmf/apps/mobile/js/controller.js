/**
 * Application entry point.
 *
 * This file defines the "app_mobile" Closure namespace, which is be used as the
 * Closure entry point (see "closure_entry_point" in the "build.json" file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.MobileController');
goog.provide('app_mobile');

goog.require('app');
goog.require('gmf.AbstractMobileController');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG2056');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
/** @suppress {extraRequire} */
goog.require('ngeo.mobileGeolocationDirective');

/* global app */

app.module.constant('ngeoMeasureLabelX', 'E');

app.module.constant('ngeoMeasureLabelY', 'N');

app.module.constant('ngeoQueryOptions', {
  'limit': 20
});


/**
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
 * @constructor
 * @extends {gmf.AbstractMobileController}
 * @ngInject
 * @export
 */
app.MobileController = function($scope, $injector) {
  goog.base(
      this, {
        srid: 21781,
        mapViewConfig: {
          center: [632464, 185457],
          zoom: 3,
          resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
        }
      },
      $scope, $injector);
};
goog.inherits(app.MobileController, gmf.AbstractMobileController);


app.module.controller('MobileController', app.MobileController);
