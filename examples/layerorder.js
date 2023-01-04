/**
 */

import './layerorder.css';
import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscSortableComponent from 'ngeo/misc/sortableComponent.js';

import ngeoMiscSyncArrays from 'ngeo/misc/syncArrays.js';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceTileWMS from 'ol/source/TileWMS.js';

/** @type {!angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoMiscSortableComponent.name]);

/**
 * @param {angular.IScope} $scope Scope.
 * @constructor
 * @ngInject
 */
function MainController($scope) {
  /** @type {import("ol/layer/Tile.js").default} */
  const asitvd = new olLayerTile({
    source: new ngeoSourceAsitVD({
      layer: 'asitvd.fond_couleur',
    }),
  });
  asitvd.set('name', 'asitvd');

  /** @type {import("ol/layer/Tile.js").default} */
  const boundaries = new olLayerTile({
    source: new olSourceTileWMS({
      projection: undefined, // should be removed in next OL version
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill'},
      serverType: 'mapserver',
    }),
  });
  boundaries.set('name', 'Boundaries');

  /** @type {import("ol/layer/Tile.js").default} */
  const waterBodies = new olLayerTile({
    source: new olSourceTileWMS({
      projection: undefined, // should be removed in next OL version
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.geologie-gravimetrischer_atlas'},
      serverType: 'mapserver',
    }),
  });
  waterBodies.set('name', 'Water bodies');

  /** @type {import("ol/layer/Tile.js").default} */
  const cities = new olLayerTile({
    source: new olSourceTileWMS({
      projection: undefined, // should be removed in next OL version
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.swisstopo.dreiecksvermaschung'},
      serverType: 'mapserver',
    }),
  });
  cities.set('name', 'Cities');

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [asitvd, boundaries, waterBodies, cities],
    view: new olView({
      projection: EPSG21781,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [600000, 200000],
      zoom: 1,
    }),
  });

  const map = this.map;

  /**
   * @type {import("ol/layer/Tile.js").default}
   * @private
   */
  this.roads_ = new olLayerTile({
    source: new olSourceTileWMS({
      projection: undefined, // should be removed in next OL version
      url: 'https://wms.geo.admin.ch',
      params: {'LAYERS': 'ch.bafu.laerm-strassenlaerm_tag'},
      serverType: 'mapserver',
    }),
  });
  this.roads_.set('name', 'Roads');

  /**
   * @type {Array.<import("ol/layer/Base.js").default>}
   * @const
   */
  this.selectedLayers = [];

  const selectedLayers = this.selectedLayers;

  ngeoMiscSyncArrays(map.getLayers().getArray(), selectedLayers, true, $scope, layerFilter);

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(
    () => selectedLayers,
    () => {
      map.render();
    }
  );

  /**
   * @param {import("ol/layer/Base.js").default} layer Layer.
   * @return {boolean} `false` if the layer shouldn't be part of the selected
   *     layers.
   */
  function layerFilter(layer) {
    return layer !== asitvd;
  }
}

/**
 * Add/remove the "Roads" layer when used as a setter, and return whether
 * the "Roads" layer is in the map when used as a getter.
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} `true` if the "Roads" layer is in the map,
 *     `false` if the "Roads" layer is not in the map, `undefined` if the
 *     function is used as setter.
 */
MainController.prototype.toggleRoadsLayer = function (val) {
  if (val === undefined) {
    return this.map.getLayers().getArray().indexOf(this.roads_) >= 0;
  } else {
    if (val) {
      this.map.addLayer(this.roads_);
    } else {
      this.map.removeLayer(this.roads_);
    }
  }
};

module.controller('MainController', MainController);

export default module;
