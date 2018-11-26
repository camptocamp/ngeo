/**
 * @module app.oeedit.Controller
 */
/**
 * Application entry point.
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page and the controller to provide the configuration.
 */

import gmfControllersAbstractDesktopController from 'gmf/controllers/AbstractDesktopController.js';
import './sass/oeedit.scss';
import appBase from '../appmodule.js';
import gmfObjecteditingModule from 'gmf/objectediting/module.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceVector from 'ol/source/Vector.js';
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
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @constructor
 * @extends {gmf.controllers.AbstractDesktopController}
 * @ngInject
 * @export
 */
const exports = function($scope, $injector, $timeout) {

  /**
   * @type {boolean}
   * @export
   */
  this.oeEditActive = false;

  gmfControllersAbstractDesktopController.call(this, {
    srid: 21781,
    mapViewConfig: {
      center: [632464, 185457],
      zoom: 3,
      resolutions: [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05]
    }
  }, $scope, $injector);

  /**
   * The ngeo ToolActivate manager service.
   * @type {ngeo.misc.ToolActivateMgr}
   */
  const ngeoToolActivateMgr = $injector.get('ngeoToolActivateMgr');

  ngeoToolActivateMgr.unregisterGroup('mapTools');

  const oeEditToolActivate = new ngeoMiscToolActivate(this, 'oeEditActive');
  ngeoToolActivateMgr.registerTool('mapTools', oeEditToolActivate, true);

  const queryToolActivate = new ngeoMiscToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate, false);

  // Set edit tool as default active one
  $timeout(() => {
    this.oeEditActive = true;
  });

  /**
   * @type {ol.source.Vector}
   * @private
   */
  this.vectorSource_ = new olSourceVector({
    wrapX: false
  });

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.vectorLayer_ = new olLayerVector({
    source: this.vectorSource_
  });

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.sketchFeatures = new olCollection();

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.sketchLayer_ = new olLayerVector({
    source: new olSourceVector({
      features: this.sketchFeatures,
      wrapX: false
    })
  });

  /**
   * @type {gmf.theme.Themes} gmfObjectEditingManager The gmf theme service
   */
  const gmfThemes = $injector.get('gmfThemes');

  gmfThemes.getThemesObject().then((themes) => {
    if (themes) {
      // Add layer vector after
      this.map.addLayer(this.vectorLayer_);
      this.map.addLayer(this.sketchLayer_);
    }
  });

  /**
   * @type {gmf.objectediting.Manager} gmfObjectEditingManager The gmf
   *     ObjectEditing manager service.
   */
  const gmfObjectEditingManager = $injector.get('gmfObjectEditingManager');

  /**
   * @type {string|undefined}
   * @export
   */
  this.oeGeomType = gmfObjectEditingManager.getGeomType();

  /**
   * @type {number|undefined}
   * @export
   */
  this.oeLayerNodeId = gmfObjectEditingManager.getLayerNodeId();

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.oeFeature = null;

  gmfObjectEditingManager.getFeature().then((feature) => {
    this.oeFeature = feature;
    if (feature) {
      this.vectorSource_.addFeature(feature);
    }
  });

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
  /** @type {angularGettext.Catalog} */
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

exports.module = angular.module('Appoeedit', [
  appBase.module.name,
  gmfControllersAbstractDesktopController.module.name,
  gmfObjecteditingModule.name,
]);

exports.module.value('gmfContextualdatacontentTemplateUrl', 'gmf/contextualdata');
exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('gmf/contextualdata', require('./contextualdata.html'));
});

exports.module.value('gmfPermalinkOptions', /** @type {gmfx.PermalinkOptions} */ ({
  pointRecenterZoom: 10
}));

exports.module.controller('OEEditController', exports);

export default exports;
