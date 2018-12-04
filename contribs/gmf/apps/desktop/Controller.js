/**
 * @module app.desktop.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import 'gmf/controllers/desktop.scss';
import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import appBase from '../appmodule.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import {inherits as olUtilInherits} from 'ol/util.js';
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
 * @extends {gmf.controllers.AbstractDesktopController}
 * @ngInject
 * @export
 */
const exports = function($scope, $injector) {
  gmfControllersAbstractDesktopController.call(this, {
    srid: 21781,
    mapViewConfig: {
      center: [632464, 185457],
      zoom: 3,
      resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
    }
  }, $scope, $injector);

  /**
   * @type {Array.<string>}
   * @export
   */
  this.searchCoordinatesProjections = [EPSG21781, EPSG2056, 'EPSG:4326'];

  /**
   * @type {!Array.<number>}
   * @export
   */
  this.scaleSelectorValues = [250000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 250, 100, 50];

  /**
   * @type {Array.<string>}
   * @export
   */
  this.elevationLayers = ['aster', 'srtm', 'srtm-partial'];

  /**
   * @type {Object.<string, gmf.raster.component.LayerConfig>}
   * @export
   */
  this.elevationLayersConfig = {};

  /**
   * @type {string}
   * @export
   */
  this.selectedElevationLayer = this.elevationLayers[0];

  /**
   * @type {Object.<string, gmfx.ProfileLineConfiguration>}
   * @export
   */
  this.profileLinesconfiguration = {
    'aster': {color: '#0000A0'},
    'srtm': {color: '#00A000'},
    'srtm-partial': {color: '#FF66FF'},
  };

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.mousePositionProjections = [{
    code: EPSG2056,
    label: 'CH1903+ / LV95',
    filter: 'ngeoNumberCoordinates::{x}, {y} m'
  }, {
    code: EPSG21781,
    label: 'CH1903 / LV03',
    filter: 'ngeoNumberCoordinates::{x}, {y} m'
  }, {
    code: 'EPSG:4326',
    label: 'WGS84',
    filter: 'ngeoDMSCoordinates:2'
  }];

  // Allow angular-gettext-tools to collect the strings to translate
  /** @type {angular.gettext.gettextCatalog} */
  const gettextCatalog = $injector.get('gettextCatalog');
  gettextCatalog.getString('Add a theme');
  gettextCatalog.getString('Add a sub theme');
  gettextCatalog.getString('Add a layer');

  if ($injector.has('sentryUrl')) {
    const options = $injector.has('sentryOptions') ? $injector.get('sentryOptions') : undefined;
    const raven = new Raven();
    raven.config($injector.get('sentryUrl'), options)
      .addPlugin(RavenPluginsAngular)
      .install();
  }
};

olUtilInherits(exports, gmfControllersAbstractDesktopController);

exports.module = angular.module('Appdesktop', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
]);

exports.module.value('gmfContextualdatacontentTemplateUrl', 'gmf/contextualdata');
exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/contextualdata', require('./contextualdata.html'));
});

exports.module.controller('DesktopController', exports);

export default exports;
