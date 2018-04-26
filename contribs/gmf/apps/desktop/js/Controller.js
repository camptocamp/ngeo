/**
 * @module app.desktop.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import appBase from '../index.js';
import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import gmfImportModule from 'gmf/import/module.js';
import ngeoGooglestreetviewModule from 'ngeo/googlestreetview/module.js';
import ngeoProjEPSG2056 from 'ngeo/proj/EPSG2056.js';
import ngeoProjEPSG21781 from 'ngeo/proj/EPSG21781.js';
import * as olBase from 'ol/index.js';

appBase.desktop.module = angular.module('AppDesktop', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
  ngeoGooglestreetviewModule.name,
  gmfImportModule.name,
]);

appBase.desktop.module.value('gmfExternalOGCServers', [{
  'name': 'Swiss Topo WMS',
  'type': 'WMS',
  'url': 'https://wms.geo.admin.ch/?lang=fr'
}, {
  'name': 'ASIT VD',
  'type': 'WMTS',
  'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml'
}, {
  'name': 'Swiss Topo WMTS',
  'type': 'WMTS',
  'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr'
}]);

/**
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
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
  this.searchCoordinatesProjections = [ngeoProjEPSG21781, ngeoProjEPSG2056, 'EPSG:4326'];

  /**
   * @type {!Array.<number>}
   * @export
   */
  this.scaleSelectorValues = [250000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 250, 100, 50];

  /**
   * @type {Array.<string>}
   * @export
   */
  this.elevationLayers = ['aster', 'srtm'];

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
    'srtm': {color: '#00A000'}
  };

  /**
   * @type {Array.<gmfx.MousePositionProjection>}
   * @export
   */
  this.mousePositionProjections = [{
    code: ngeoProjEPSG2056,
    label: 'CH1903+ / LV95',
    filter: 'ngeoNumberCoordinates::{x}, {y} m'
  }, {
    code: ngeoProjEPSG21781,
    label: 'CH1903 / LV03',
    filter: 'ngeoNumberCoordinates::{x}, {y} m'
  }, {
    code: 'EPSG:4326',
    label: 'WGS84',
    filter: 'ngeoDMSCoordinates:2'
  }];

  // Allow angular-gettext-tools to collect the strings to translate
  /** @type {angularGettext.Catalog} */
  const gettextCatalog = $injector.get('gettextCatalog');
  gettextCatalog.getString('Add a theme');
  gettextCatalog.getString('Add a sub theme');
  gettextCatalog.getString('Add a layer');
};

olBase.inherits(exports, gmfControllersAbstractDesktopController);


appBase.desktop.module.controller('DesktopController', exports);


export default exports;
