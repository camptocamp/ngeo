import angular from 'angular';
import appURL from './url.js';
import './editfeature.css';
import 'bootstrap/js/src/tooltip.js';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import gmfAuthenticationModule from 'gmf/authentication/module.js';
import gmfEditingEditFeature from 'gmf/editing/EditFeature.js';

import gmfMapComponent from 'gmf/map/component.js';

import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import * as olExtent from 'ol/extent.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerImage from 'ol/layer/Image.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfapp', [
  'gettext',
  gmfAuthenticationModule.name,
  gmfEditingEditFeature.name,
  gmfMapComponent.name,
]);

module.value('authenticationBaseUrl', appURL.GMF_DEMO);
module.value('gmfLayersUrl', appURL.GMF_LAYERS);

module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {import("gmf/editing/EditFeature.js").EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import('gmf/authentication/Service.js').User} gmfUser User.
 * @constructor
 * @ngInject
 */
function MainController($scope, gmfEditFeature, gmfUser) {
  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {import("gmf/editing/EditFeature.js").EditingEditFeature}
   */
  this.editFeature_ = gmfEditFeature;

  /**
   * @type {import('gmf/authentication/Service.js').User}
   */
  this.gmfUser = gmfUser;

  /**
   * @type {import("ol/source/ImageWMS.js").default}
   * @private
   */
  this.wmsSource_ = new olSourceImageWMS({
    projection: undefined, // should be removed in next OL version
    url: appURL.MAPSERVER_PROXY,
    params: {'LAYERS': 'point'},
  });

  /**
   * @type {import("ol/layer/Image.js").default}
   * @private
   */
  this.wmsLayer_ = new olLayerImage({
    source: this.wmsSource_,
  });

  /**
   * @type {number}
   * @private
   */
  this.pixelBuffer_ = 10;

  /**
   * @type {number}
   * @private
   */
  this.layerId_ = 113;

  /**
   * @type {import("ol/Feature.js").default}
   */
  this.feature = null;

  /**
   * @type {boolean}
   */
  this.pending = false;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      this.wmsLayer_,
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2,
    }),
  });

  this.map.on('singleclick', this.handleMapSingleClick_.bind(this));

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
MainController.prototype.handleMapSingleClick_ = function (evt) {
  // (1) Launch query to fetch new features
  const coordinate = evt.coordinate;
  const map = this.map;
  const view = map.getView();
  const resolution = view.getResolution();
  const buffer = resolution * this.pixelBuffer_;
  const extent = olExtent.buffer([coordinate[0], coordinate[1], coordinate[0], coordinate[1]], buffer);

  this.editFeature_.getFeaturesInExtent([this.layerId_], extent).then(this.handleGetFeatures_.bind(this));

  // (2) Clear any previously selected feature
  this.feature = null;

  // (3) Pending
  this.pending = true;

  this.scope_.$apply();
};

/**
 * @param {Array.<import("ol/Feature.js").default>} features Features.
 * @private
 */
MainController.prototype.handleGetFeatures_ = function (features) {
  this.pending = false;

  if (features.length) {
    this.feature = features[0];
  }
};

/**
 * Insert a new feature at a random location.
 */
MainController.prototype.insertFeature = function () {
  this.pending = true;

  // (1) Create a randomly located feature
  const map = this.map;
  const view = map.getView();
  const resolution = view.getResolution();
  const buffer = resolution * -50; // 50 pixel buffer inside the extent
  const size = /** @type {!Array.<number>} */ (map.getSize());
  const extent = olExtent.buffer(view.calculateExtent(size), buffer);
  const bottomLeft = olExtent.getBottomLeft(extent);
  const topRight = olExtent.getTopRight(extent);
  const left = bottomLeft[0];
  const bottom = bottomLeft[1];
  const right = topRight[0];
  const top = topRight[1];
  const deltaX = right - left;
  const deltaY = top - bottom;
  const coordinate = [left + Math.random() * deltaX, bottom + Math.random() * deltaY];

  const feature = new olFeature({
    'geometry': new olGeomMultiPoint([coordinate]),
    'name': 'New point',
  });

  this.feature = null; // clear selected feature

  // (2) Launch request
  this.editFeature_.insertFeatures(this.layerId_, [feature]).then(this.handleEditFeature_.bind(this));
};

/**
 * Update the currently selected feature with a new name.
 */
MainController.prototype.updateFeature = function () {
  console.assert(this.feature);

  this.pending = true;

  // (1) Update name
  this.feature.set('name', 'Updated name');

  // (2) Launch request
  this.editFeature_.updateFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));
};

/**
 * Delete currently selected feature.
 */
MainController.prototype.deleteFeature = function () {
  console.assert(this.feature);

  // (1) Launch request
  this.editFeature_.deleteFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));

  // (2) Reset selected feature
  this.feature = null;
};

/**
 * Called after an insert, update or delete request.
 * @param {angular.IHttpResponse} resp Ajax response.
 * @private
 */
MainController.prototype.handleEditFeature_ = function (resp) {
  this.pending = false;
  this.refreshWMSLayer_();
};

/**
 * @private
 */
MainController.prototype.refreshWMSLayer_ = function () {
  this.wmsSource_.updateParams({
    'random': Math.random(),
  });
};

module.controller('MainController', MainController);

export default module;
