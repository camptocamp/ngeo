/**
 * Application entry point.
 *
 * This file includes `import`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import './sass/vars_mobile.scss';
import 'gmf/controllers/mobile.scss';
import './sass/mobile.scss';

import angular from 'angular';
import gmfControllersAbstractMobileController, {
  AbstractMobileController,
} from 'gmf/controllers/AbstractMobileController.js';
import appBase from '../appmodule.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import Raven from 'raven-js/src/raven.js';
import RavenPluginsAngular from 'raven-js/plugins/angular.js';

if (!window.requestAnimationFrame) {
  alert(
    'Your browser is not supported, please update it or use another one. You will be redirected.\n\n' +
      "Votre navigateur n'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. " +
      'Vous allez être redirigé.\n\n' +
      'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. ' +
      'Sie werden weitergeleitet.'
  );
  window.location.href = 'https://geomapfish.org/';
}

/**
 * @private
 */
class Controller extends AbstractMobileController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @ngInject
   */
  constructor($scope, $injector) {
    super(
      {
        autorotate: false,
        srid: 21781,
        mapViewConfig: {
          center: [632464, 185457],
          zoom: 3,
          resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05],
        },
      },
      $scope,
      $injector
    );

    /**
     * @type {Array<import('gmf/mobile/measure/pointComponent.js').LayerConfig>}
     */
    this.elevationLayersConfig = [
      {name: 'aster', unit: 'm'},
      {name: 'srtm', unit: 'm'},
    ];

    /**
     * @type {Array<string>}
     */
    this.searchCoordinatesProjections = [EPSG21781, EPSG2056, 'EPSG:4326'];

    if ($injector.has('sentryUrl')) {
      const options = $injector.has('sentryOptions') ? $injector.get('sentryOptions') : undefined;
      const raven = new Raven();
      raven.config($injector.get('sentryUrl'), options).addPlugin(RavenPluginsAngular).install();
    }
  }
}

/**
 * @hidden
 */
const module = angular.module('Appmobile', [appBase.name, gmfControllersAbstractMobileController.name]);

module.controller('MobileController', Controller);

export default module;
