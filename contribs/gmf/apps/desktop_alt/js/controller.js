/**
 * Application entry point.
 *
 * This file defines the "app_desktop" Closure namespace, which is be used as
 * the Closure entry point (see "closure_entry_point" in the "build.json"
 * file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */
goog.provide('app.AlternativeDesktopController');
goog.provide('app_desktop_alt');

goog.require('app');
goog.require('gmf.AbstractDesktopController');
/** @suppress {extraRequire} */
goog.require('ngeo.googlestreetviewComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG2056');
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');

goog.require('app.GmfImportHelper');


gmf.module.value('ngeoQueryOptions', {
  'limit': 20,
  'queryCountFirst': true,
  'cursorHover': true
});


gmf.module.value('gmfPrintOptions', {
  'scaleInput': true
});

gmf.module.value('ngeoMeasurePrecision', 6);
gmf.module.value('ngeoMeasureDecimals', 2);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {angular.$injector} $injector Main injector.
 * @param {ngeo.File} ngeoFile The file service.
 * @param {gettext} gettext The gettext service
 * @param {angular.$q} $q Angular $q.
 * @constructor
 * @extends {gmf.AbstractDesktopController}
 * @ngInject
 * @export
 */
app.AlternativeDesktopController = function($scope, $injector, ngeoFile, gettext, $q) {
  gmf.AbstractDesktopController.call(this, {
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
  this.searchCoordinatesProjections = ['EPSG:21781', 'EPSG:2056', 'EPSG:4326'];

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
   * @export
   */
  this.importOptions = new app.GmfImportHelper(this.map, $scope, gettext, ngeoFile, $q).createOptions();
};
ol.inherits(app.AlternativeDesktopController, gmf.AbstractDesktopController);


/**
 * @param {jQuery.Event} event keydown event.
 * @export
 */
app.AlternativeDesktopController.prototype.onKeydown = function(event) {
  if (event.ctrlKey && event.key === 'p') {
    this.printPanelActive = true;
    event.preventDefault();
  }
};

app.module.controller('AlternativeDesktopController', app.AlternativeDesktopController);
