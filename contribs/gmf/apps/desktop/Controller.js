/**
 * Application entry point.
 *
 * This file includes `import`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import './sass/desktop.scss';
import 'gmf/controllers/desktop.scss';
import './sass/vars_desktop.scss';

import angular from 'angular';
import gmfControllersAbstractDesktopController, {
  AbstractDesktopController,
} from 'gmf/controllers/AbstractDesktopController.js';
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
class Controller extends AbstractDesktopController {
  /**
   * @param {angular.IScope} $scope Scope.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   */
  constructor($scope, $injector) {
    super(
      {
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
     * @type {Array<string>}
     */
    this.searchCoordinatesProjections = [EPSG21781, EPSG2056, 'EPSG:4326'];

    /**
     * @type {!Array<number>}
     */
    this.scaleSelectorValues = [250000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 250, 100, 50];

    /**
     * @type {Array<string>}
     */
    this.elevationLayers = ['aster', 'srtm'];

    /**
     * @type {Object<string, import('gmf/mobile/measure/pointComponent.js').LayerConfig>}
     */
    this.elevationLayersConfig = {};

    /**
     * @type {string}
     */
    this.selectedElevationLayer = this.elevationLayers[0];

    /**
     * @type {Object<string, import('gmf/profile/component.js').ProfileLineConfiguration>}
     */
    this.profileLinesconfiguration = {
      'aster': {color: '#0000A0'},
      'srtm': {color: '#00A000'},
    };

    /**
     * @type {Array<import('gmf/map/mousepositionComponent.js').MousePositionProjection>}
     */
    this.mousePositionProjections = [
      {
        code: EPSG2056,
        label: 'CH1903+ / LV95',
        filter: 'ngeoNumberCoordinates::{x}, {y} m',
      },
      {
        code: EPSG21781,
        label: 'CH1903 / LV03',
        filter: 'ngeoNumberCoordinates::{x}, {y} m',
      },
      {
        code: 'EPSG:4326',
        label: 'WGS84',
        filter: 'ngeoDMSCoordinates:2',
      },
    ];

    // Allow angular-gettext-tools to collect the strings to translate
    /** @type {angular.gettext.gettextCatalog} */
    const gettextCatalog = $injector.get('gettextCatalog');
    gettextCatalog.getString('Add a theme');
    gettextCatalog.getString('Add a sub theme');
    gettextCatalog.getString('Add a layer');

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
const module = angular.module('Appdesktop', [appBase.name, gmfControllersAbstractDesktopController.name]);

module.value('gmfContextualdatacontentTemplateUrl', 'gmf/contextualdata');
module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/contextualdata', require('./contextualdata.html'));
  }
);

module.controller('DesktopController', Controller);

export default module;
