/**
 * @module app.mobile.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import gmfControllersAbstractMobileController from 'gmf/controllers/AbstractMobileController.js';
import 'gmf/controllers/mobile.scss';
import appBase from '../appmodule.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import * as olBase from 'ol/index.js';
import Raven from 'raven-js/src/raven.js';
import RavenPluginsAngular from 'raven-js/plugins/angular.js';

if (!window.requestAnimationFrame) {
  alert('Your browser is not supported, please update it or use another one. You will be redirected.\n\n'
    + 'Votre navigateur n\'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. Vous allez être redirigé.\n\n'
    + 'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. Sie werden weitergeleitet.');
  window.location = 'http://geomapfish.org/';
}

/**
 * @param {angular.IScope} $scope Scope.
 * @param {angular.IInjectorService} $injector Main injector.
 * @constructor
 * @extends {gmf.controllers.AbstractMobileController}
 * @ngInject
 * @export
 */
const exports = function($scope, $injector) {
  gmfControllersAbstractMobileController.call(this, {
    autorotate: false,
    srid: 21781,
    mapViewConfig: {
      center: [632464, 185457],
      zoom: 3,
      resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
    }
  }, $scope, $injector);

  /**
   * @type {Array.<gmf.mobile.measure.pointComponent.LayerConfig>}
   * @export
   */
  this.elevationLayersConfig = [
    {name: 'aster', unit: 'm'},
    {name: 'srtm', unit: 'm'}
  ];

  /**
   * @type {Array.<string>}
   * @export
   */
  this.searchCoordinatesProjections = [EPSG21781, EPSG2056, 'EPSG:4326'];

  if ($injector.has('sentryUrl')) {
    const options = $injector.has('sentryOptions') ? $injector.get('sentryOptions') : undefined;
    const raven = new Raven();
    raven.config($injector.get('sentryUrl'), options)
      .addPlugin(RavenPluginsAngular)
      .install();
  }
};

olBase.inherits(exports, gmfControllersAbstractMobileController);

exports.module = angular.module('Appmobile', [
  appBase.module.name,
  gmfControllersAbstractMobileController.module.name,
]);

exports.module.controller('MobileController', exports);

export default exports;
