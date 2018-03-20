/**
 * @module app.desktop.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import 'jquery';
import 'angular';
import 'angular-gettext';
import '../../../../../utils/watchwatchers.js';
import '../less/main.less';
import appBase from '../../appmodule.js';
//import '../../default.js';
import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import ngeoProjEPSG2056 from 'ngeo/proj/EPSG2056.js';
import ngeoProjEPSG21781 from 'ngeo/proj/EPSG21781.js';
import ngeoGooglestreetviewComponent from 'ngeo/googlestreetview/component.js';

import * as olBase from 'ol/index.js';

if (!window.requestAnimationFrame) {
  alert('Your browser is not supported, please update it or use another one. You will be redirected.\n\n'
    + 'Votre navigateur n\'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. Vous allez être redirigé.\n\n'
    + 'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. Sie werden weitergeleitet.');
  window.location = 'http://geomapfish.org/'
}

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
   * @type {number}
   * @export
   */
  this.searchDelay = 50;

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
    code: 'EPSG:2056',
    label: 'CH1903+ / LV95',
    filter: 'ngeoNumberCoordinates::{x}, {y} m'
  }, {
    code: 'EPSG:21781',
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

exports.module = angular.module('AppDesktop', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
]);

(function() {
  var cacheVersion = '0';
  var urlElements = window.location.pathname.split('/');

  var angularLocaleScriptUrlElements = urlElements.slice(0, urlElements.length - 3);
  angularLocaleScriptUrlElements.push('build', 'angular-locale_{{locale}}.js?cache_version=' + cacheVersion);

  var gmfModule = angular.module('GmfAbstractAppControllerModule');
  gmfModule.constant('angularLocaleScript', angularLocaleScriptUrlElements.join('/'));

  var langUrls = {};
  ['en', 'fr', 'de'].forEach(function(lang) {
    var langUrlElements = urlElements.slice(0, urlElements.length - 3);
    langUrlElements.push('build', 'gmf-' + lang + '.json?cache_version=' + cacheVersion)
    langUrls[lang] = langUrlElements.join('/')
  });

  exports.module.constant('defaultTheme', 'Demo');
  exports.module.constant('defaultLang', 'en');
  exports.module.constant('langUrls', langUrls);
  exports.module.constant('cacheVersion', cacheVersion);
  exports.module.constant('authenticationBaseUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi');
  exports.module.constant('fulltextsearchUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch?limit=30&partitionlimit=5&interface=desktop');
  exports.module.constant('gmfRasterUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/raster');
  exports.module.constant('gmfProfileJsonUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/profile.json');
  exports.module.constant('gmfPrintUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/printproxy');
  exports.module.constant('gmfTreeUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background&interface=desktop');
  exports.module.constant('gmfLayersUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');
  exports.module.constant('gmfShortenerCreateUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/short/create');
  exports.module.constant('gmfSearchGroups', ['osm','district']);
  // Requires that the gmfSearchGroups is specified
  exports.module.constant('gmfSearchActions', [
          {action: 'add_theme', title: 'Add a theme'},
          {action: 'add_group', title: 'Add a sub theme'},
          {action: 'add_layer', title: 'Add a layer'}
  ]);
  exports.module.constant('gmfContextualdatacontentTemplateUrl', window.location.pathname + 'contextualdata.html');
  exports.module.value('ngeoWfsPermalinkOptions',
      /** @type {ngeox.WfsPermalinkOptions} */ ({
        url: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
        wfsTypes: [
          {featureType: 'fuel', label: 'display_name'},
          {featureType: 'osm_scale', label: 'display_name'}
        ],
        defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
        defaultFeaturePrefix: 'feature'
      }));
})();

olBase.inherits(exports, gmfControllersAbstractDesktopController);


exports.module.controller('DesktopController', exports);


export default exports;
