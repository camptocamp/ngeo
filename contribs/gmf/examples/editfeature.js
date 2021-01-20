// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import './editfeature.css';
import 'bootstrap/js/src/tooltip.js';
import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';

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
import options, {MAPSERVER_PROXY} from './options.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfapp', [
  'gettext',
  gmfAuthenticationModule.name,
  gmfEditingEditFeature.name,
  gmfMapComponent.name,
]);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import("gmf/editing/EditFeature.js").EditingEditFeature} gmfEditFeature Gmf edit feature service.
 * @param {import('gmf/authentication/Service.js').User} gmfUser User.
 * @constructor
 * @ngInject
 */
function MainController($scope, gmfEditFeature, gmfUser) {
  /**
   * @type {angular.IScope}
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
   */
  this.wmsSource_ = new olSourceImageWMS({
    url: MAPSERVER_PROXY,
    params: {'LAYERS': 'point'},
  });

  /**
   * @type {import("ol/layer/Image.js").default}
   */
  this.wmsLayer_ = new olLayerImage({
    source: this.wmsSource_,
  });

  /**
   * @type {number}
   */
  this.pixelBuffer_ = 10;

  /**
   * @type {number}
   */
  this.layerId_ = 113;

  /**
   * @type {?olFeature<import("ol/geom/Geometry.js").default>}
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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 2,
    }),
  });

  this.map.on('singleclick', /** @type {function(?): ?} */ (this.handleMapSingleClick_.bind(this)));

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 * @param {import("ol/MapBrowserEvent.js").default<unknown>} evt MapBrowser event
 */
MainController.prototype.handleMapSingleClick_ = function (evt) {
  // (1) Launch query to fetch new features
  const coordinate = evt.coordinate;
  const map = this.map;
  const view = map.getView();
  const resolution = view.getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
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
 * @param {Array<olFeature<import("ol/geom/Geometry.js").default>>} features Features.
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
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const buffer = resolution * -50; // 50 pixel buffer inside the extent
  const size = map.getSize();
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
  if (!this.feature) {
    throw new Error('Missing feature');
  }

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
  if (!this.feature) {
    throw new Error('Missing feature');
  }

  // (1) Launch request
  this.editFeature_.deleteFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));

  // (2) Reset selected feature
  this.feature = null;
};

/**
 * Called after an insert, update or delete request.
 * @param {angular.IHttpResponse<ArrayBuffer|Document|Node|Object|string>} resp Ajax response.
 */
MainController.prototype.handleEditFeature_ = function (resp) {
  this.pending = false;
  this.refreshWMSLayer_();
};

MainController.prototype.refreshWMSLayer_ = function () {
  this.wmsSource_.updateParams({
    'random': Math.random(),
  });
};

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
