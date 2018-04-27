/**
 * @module app.desktop_alt.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import '../../../../../utils/watchwatchers.js';
import '../less/main.less';
import appBase from '../../appmodule.js';
import gmfImportModule from 'gmf/import/module.js';
import ngeoGooglestreetviewModule from 'ngeo/googlestreetview/module.js';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';
import ngeoRoutingModule from 'ngeo/routing/module.js';
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
 * @param {ngeo.misc.File} ngeoFile The file service.
 * @param {gettext} gettext The gettext service
 * @param {angular.$q} $q Angular $q.
 * @constructor
 * @extends {gmf.controllers.AbstractDesktopController}
 * @ngInject
 * @export
 */
const exports = function($scope, $injector, ngeoFile, gettext, $q) {
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
   * @type {number}
   * @export
   */
  this.searchDelay = 500;

  /**
   * @type {boolean}
   * @export
   */
  this.showInfobar = true;

  /**
   * @type {!Array.<number>}
   * @export
   */
  this.scaleSelectorValues = [250000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 250, 100, 50];

  /**
   * @type {Array.<string>}
   * @export
   */
  this.elevationLayers = ['srtm'];

  /**
   * @type {Object.<string, gmfx.ProfileLineConfiguration>}
   * @export
   */
  this.profileLinesconfiguration = {
    'srtm': {}
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

  /**
   * @type {gmfx.GridMergeTabs}
   * @export
   */
  this.gridMergeTabs = {
    'OSM_time_merged': ['osm_time', 'osm_time2'],
    'transport (merged)': ['fuel', 'parking'],
    'Learning [merged]': ['information', 'bus_stop']
  };

  // Allow angular-gettext-tools to collect the strings to translate
  /** @type {angularGettext.Catalog} */
  const gettextCatalog = $injector.get('gettextCatalog');
  gettextCatalog.getString('OSM_time_merged');
  gettextCatalog.getString('OSM_time (merged)');
  gettextCatalog.getString('Learning [merged]');
  gettextCatalog.getString('Add a theme');
  gettextCatalog.getString('Add a sub theme');
  gettextCatalog.getString('Add a layer');

  /**
   * @type {string}
   * @export
   */
  this.bgOpacityOptions = 'Test aus Olten';
};

olBase.inherits(exports, gmfControllersAbstractDesktopController);


/**
 * @param {jQuery.Event} event keydown event.
 * @export
 */
exports.prototype.onKeydown = function(event) {
  if (event.ctrlKey && event.key === 'p') {
    this.printPanelActive = true;
    event.preventDefault();
  }
};


exports.module = angular.module('AppDesktopAlt', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
  gmfImportModule.name,
  ngeoRoutingModule.name,
  ngeoGooglestreetviewModule.name,
  ngeoStatemanagerWfsPermalink.module.name,
]);

exports.module.controller('AlternativeDesktopController', exports);

exports.module.value('ngeoQueryOptions', {
  'limit': 20,
  'queryCountFirst': true,
  'cursorHover': true
});

exports.module.value('gmfExternalOGCServers', [{
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

exports.module.value('gmfPrintOptions', {
  'scaleInput': true
});

exports.module.value('ngeoMeasurePrecision', 6);
exports.module.value('ngeoMeasureDecimals', 2);

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

  const module = angular.module('AppDesktopAlt');
  module.constant('defaultTheme', 'Demo');
  module.constant('defaultLang', 'en');
  module.constant('langUrls', langUrls);
  module.constant('cacheVersion', cacheVersion);
  module.constant('authenticationBaseUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi');
  module.constant('fulltextsearchUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/fulltextsearch?limit=30&partitionlimit=5&interface=desktop&ranksystem=ts_rank_cd');
  module.constant('gmfRasterUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/raster');
  module.constant('gmfPrintUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/printproxy');
  module.constant('gmfProfileJsonUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/profile.json');
  module.constant('gmfTreeUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?version=2&background=background&interface=desktop');
  module.constant('gmfLayersUrl', 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/layers/');
  module.constant('gmfShortenerCreateUrl', '');
  module.constant('ngeoRoutingOptions', {
    'backendUrl': 'https://routing.osm.ch/',
    'profiles': [
      {label: 'Car', profile: 'routed-car'},
      {label: 'Bike (City)', profile: 'routed-bike'},
      {label: 'Bike (Touring)', profile: 'routed-bike-touring'},
      {label: 'Foot', profile: 'routed-foot'},
      {label: 'Hiking', profile: 'routed-hiking'}
    ]
  });
  module.constant('ngeoNominatimSearchDefaultParams', {
    'countrycodes': 'CH'
  });
  module.constant('gmfSearchGroups', ['osm', 'district']);
  // Requires that the gmfSearchGroups is specified
  module.constant('gmfSearchActions', [
    {action: 'add_theme', title: 'Add a theme'},
    {action: 'add_group', title: 'Add a sub theme'},
    {action: 'add_layer', title: 'Add a layer'}
  ]);
  module.constant('gmfTreeManagerModeFlush', false);
  module.value('gmfPermalinkOptions', {projectionCodes: ['EPSG:21781', 'EPSG:2056', 'EPSG:4326'], useLocalStorage: false});
  module.value('ngeoWfsPermalinkOptions',
    /** @type {ngeox.WfsPermalinkOptions} */ ({
      url: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      wfsTypes: [
        {featureType: 'fuel', label: 'display_name'},
        {featureType: 'osm_scale', label: 'display_name'}
      ],
      defaultFeatureNS: 'http://mapserver.gis.umn.edu/mapserver',
      defaultFeaturePrefix: 'feature'
    }));
  module.constant('ngeoTilesPreloadingLimit', 0);
  module.constant('ngeoQueryOptions', {
    limit: 50
  });
})();

export default exports;
