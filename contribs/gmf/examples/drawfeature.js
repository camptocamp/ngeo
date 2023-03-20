import angular from 'angular';
import './drawfeature.css';
import 'bootstrap/js/src/tooltip.js';
import gmfMapComponent from 'gmf/map/component.js';

import gmfDrawingModule from 'gmf/drawing/module.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMiscFeatureHelper, {FeatureFormatType} from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfDrawingModule.name,
  gmfMapComponent.name,
  ngeoMapModule.name, // for ngeo.map.FeatureOverlay, perhaps remove me
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

module.value('ngeoExportFeatureFormats', [FeatureFormatType.KML, FeatureFormatType.GPX]);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @param {import("ol/Collection.js").default.<import("ol/Feature.js").default>} ngeoFeatures Collection of
 *    features.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
 *    manager service.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo
 *    FeatureOverlay manager
 * @constructor
 * @ngInject
 */
function MainController($scope, ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr, ngeoFeatureOverlayMgr) {
  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  const view = new olView({
    center: [0, 0],
    zoom: 3,
  });

  ngeoFeatureHelper.setProjection(view.getProjection());

  const featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
  featureOverlay.setFeatures(ngeoFeatures);

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: view,
  });

  /**
   * @type {boolean}
   */
  this.drawFeatureActive = true;

  const drawFeatureToolActivate = new ngeoMiscToolActivate(this, 'drawFeatureActive');
  ngeoToolActivateMgr.registerTool('mapTools', drawFeatureToolActivate, true);

  /**
   * @type {boolean}
   */
  this.pointerMoveActive = false;

  const pointerMoveToolActivate = new ngeoMiscToolActivate(this, 'pointerMoveActive');
  ngeoToolActivateMgr.registerTool('mapTools', pointerMoveToolActivate, false);

  $scope.$watch(
    () => this.pointerMoveActive,
    (newVal) => {
      if (newVal) {
        this.map.on('pointermove', (evt) => {
          this.handleMapPointerMove_(evt);
        });
      } else {
        this.map.un('pointermove', (evt) => {
          this.handleMapPointerMove_(evt);
        });
        $('#pointermove-feature').html('');
      }
    }
  );

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 * @param {import("ol/MapBrowserEvent.js").default} evt MapBrowser event
 * @private
 */
MainController.prototype.handleMapPointerMove_ = function (evt) {
  const pixel = evt.pixel;

  const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => feature);

  $('#pointermove-feature').html(feature ? feature.get(ngeoFormatFeatureProperties.NAME) : 'None');

  this.scope_.$apply();
};

module.controller('MainController', MainController);

export default module;
