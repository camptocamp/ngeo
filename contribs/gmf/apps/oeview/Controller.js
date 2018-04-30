/**
 * @module app.oeview.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import './less/main.less';
import appBase from '../appmodule.js';
import ngeoProjEPSG2056 from 'ngeo/proj/EPSG2056.js';
import ngeoProjEPSG21781 from 'ngeo/proj/EPSG21781.js';
import * as olBase from 'ol/index.js';

if (!window.requestAnimationFrame) {
  alert('Your browser is not supported, please update it or use another one. You will be redirected.\n\n'
    + 'Votre navigateur n\'est pas supporté, veuillez le mettre à jour ou en utiliser un autre. Vous allez être redirigé.\n\n'
    + 'Ihr Browser wird nicht unterstützt, bitte aktualisieren Sie ihn oder verwenden Sie einen anderen. Sie werden weitergeleitet.');
  window.location = 'http://geomapfish.org/';
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

exports.module = angular.module('AppOEView', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
]);

exports.module.controller('DesktopController', exports);

(function() {
  const cacheVersion = '0';
  const urlElements = window.location.pathname.split('/');

  const angularLocaleScriptUrlElements = urlElements.slice(0, urlElements.length - 3);
  angularLocaleScriptUrlElements.push('build', `angular-locale_{{locale}}.js?cache_version=${cacheVersion}`);

  const gmfModule = angular.module('GmfAbstractAppControllerModule');
  gmfModule.constant('angularLocaleScript', angularLocaleScriptUrlElements.join('/'));

  const langUrls = {};
  ['en', 'fr', 'de'].forEach((lang) => {
    const langUrlElements = urlElements.slice(0, urlElements.length - 3);
    langUrlElements.push('build', `gmf-${lang}.json?cache_version=${cacheVersion}`);
    langUrls[lang] = langUrlElements.join('/');
  });

  const module = angular.module('AppOEView');
  module.constant('defaultTheme', 'ObjectEditing');
  module.constant('defaultLang', 'en');
  module.constant('langUrls', langUrls);
  module.constant('cacheVersion', cacheVersion);
  module.constant('authenticationBaseUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi');
  module.constant('fulltextsearchUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch?limit=30&partitionlimit=5&interface=desktop');
  module.constant('gmfRasterUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/raster');
  module.constant('gmfProfileJsonUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/profile.json');
  module.constant('gmfPrintUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/printproxy');
  module.constant('gmfTreeUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background&interface=desktop');
  module.constant('gmfLayersUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');
  module.constant('gmfShortenerCreateUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/short/create');
  module.constant('gmfSearchGroups', ['osm', 'district']);
  // Requires that the gmfSearchGroups is specified
  module.constant('gmfSearchActions', [
    {action: 'add_theme', title: 'Add a theme'},
    {action: 'add_group', title: 'Add a sub theme'},
    {action: 'add_layer', title: 'Add a layer'}
  ]);
  module.constant('gmfContextualdatacontentTemplateUrl', `${window.location.pathname}contextualdata.html`);
  module.value('ngeoWfsPermalinkOptions',
    /** @type {ngeox.WfsPermalinkOptions} */ ({
      url: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      wfsTypes: [
        {featureType: 'line', label: 'name'},
        {featureType: 'point', label: 'name'},
        {featureType: 'polygon', label: 'name'}
      ],
      defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
      defaultFeaturePrefix: 'feature'
    }));
})();

export default exports;
