// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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

import './elevationProfile.css';
import angular from 'angular';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';

import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceVector from 'ol/source/Vector.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoProfileElevationComponent from 'ngeo/profile/elevationComponent.js';

/** @type {angular.IModule} **/
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoProfileElevationComponent.name]);

/**
 * @constructor
 * @param {angular.IHttpService} $http The $http angular service.
 * @param {angular.IScope} $scope The $scope angular service.
 * @ngInject
 */
function MainController($http, $scope) {
  /**
   * @type {angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  const source = new olSourceVector();
  const source2 = new olSourceImageWMS({
    projection: undefined, // should be removed in next OL version
    url: 'https://wms.geo.admin.ch/',
    crossOrigin: 'anonymous',
    attributions:
      '&copy; ' +
      '<a href="https://www.geo.admin.ch/internet/geoportal/' +
      'en/home.html">Pixelmap 1:500000 / geo.admin.ch</a>',
    params: {
      'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
      'FORMAT': 'image/jpeg',
    },
    serverType: /** @type {import("ol/source/WMSServerType.js").default} */ ('mapserver'),
  });

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerImage({
        source: source2,
      }),
      new olLayerVector({
        source,
      }),
    ],
    view: new olView({
      projection: EPSG2056,
      extent: [420000, 30000, 900000, 350000],
      zoom: 0,
      center: [0, 0],
    }),
  });

  const map = this.map;

  const vectorLayer = new olLayerVector({
    source: new olSourceVector(),
  });

  this.snappedPoint_ = new olFeature();
  /** @type {olSourceVector<import("ol/geom/Geometry.js").default>} */ (vectorLayer.getSource()).addFeature(
    this.snappedPoint_
  );

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {Object[]}
   */
  this.profilePoisData = [
    {sort: 1, dist: 1000, title: 'First POI', id: 12345},
    {sort: 2, dist: 3000, title: 'Second POI', id: 12346},
  ];

  /**
   * @type {Object|undefined}
   */
  this.profileData = undefined;

  $http.get('data/profile.json').then((resp) => {
    const data = resp.data.profile;
    this.profileData = data;

    let i;
    const len = data.length;
    const lineString = new olGeomLineString(
      [],
      /** @type {import("ol/geom/GeometryLayout.js").default} */ ('XYM')
    );
    for (i = 0; i < len; i++) {
      const p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new olFeature(lineString));

    const size = this.map.getSize();
    if (size === undefined) {
      throw new Error('Missing size');
    }
    map.getView().fit(source.getExtent(), {size});
  });

  map.on('pointermove', (evt) => {
    if (evt.dragging) {
      return;
    }
    const coordinate = map.getEventCoordinate(evt.originalEvent);
    const geometry = source.getFeatures()[0].getGeometry();
    if (!geometry) {
      throw new Error('Missing geometry');
    }
    this.snapToGeometry(coordinate, geometry);
  });

  /**
   * Factory for creating simple getter functions for extractors.
   * If the value is in a child property, the opt_childKey must be defined.
   * The type parameter is used by closure to type the returned function.
   * @param {any} type An object of the expected result type.
   * @param {string} key Key used for retrieving the value.
   * @param {string=} opt_childKey Key of a child object.
   * @return {function(Object): any} Getter function.
   */
  const typedFunctionsFactory = function (type, key, opt_childKey) {
    return (
      /**
       * @param {Object} item
       * @return {any}
       */
      function (item) {
        if (opt_childKey !== undefined) {
          item = item[opt_childKey];
        }
        return item[key];
      }
    );
  };

  const types = {
    number: 1,
    string: '',
  };

  const distanceExtractor = typedFunctionsFactory(types.number, 'dist');

  const linesConfiguration = {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values'),
    },
  };

  /** @type {function(Object<string, number>): number} */
  const sort = typedFunctionsFactory(types.number, 'sort');
  /** @type {function(Object<string, string>): string} */
  const id = typedFunctionsFactory(types.string, 'id');
  /** @type {function(Object<string, number>): number} */
  const dist = typedFunctionsFactory(types.number, 'dist');
  /** @type {function(Object<string, string>): string} */
  const title = typedFunctionsFactory(types.string, 'title');

  /**
   * @type {import('ngeo/profile/elevationComponent.js').PoiExtractor}
   */
  const poiExtractor = {
    sort,
    id,
    dist,
    title,
    /**
     * @param {Object} item POI.
     * @param {number=} opt_z Z value.
     * @return {number} Z value.
     */
    z: (item, opt_z) => {
      if (opt_z !== undefined) {
        item.z = opt_z;
      }
      return item.z;
    },
  };

  /**
   * @param {Object} point Point.
   */
  const hoverCallback = (point) => {
    // An item in the list of points given to the profile.
    this.point = point;
    this.snappedPoint_.setGeometry(new olGeomPoint([point.x, point.y]));
  };

  const outCallback = () => {
    this.point = null;
    this.snappedPoint_.setGeometry(undefined);
  };

  /**
   * @type {Object}
   */
  this.profileOptions = {
    distanceExtractor,
    linesConfiguration,
    poiExtractor,
    hoverCallback,
    outCallback,
  };

  /**
   * @type {Object}
   */
  this.point = null;

  /**
   * @type {number|undefined}
   */
  this.profileHighlight = undefined;
}

/**
 * @param {import("ol/coordinate.js").Coordinate} coordinate The current pointer coordinate.
 * @param {import("ol/geom/Geometry.js").default} geometry The geometry to snap to.
 */
MainController.prototype.snapToGeometry = function (coordinate, geometry) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const closestPoint = geometry.getClosestPoint(coordinate);
  // compute distance to line in pixels
  const dx = closestPoint[0] - coordinate[0];
  const dy = closestPoint[1] - coordinate[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const resolution = this.map.getView().getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const pixelDist = dist / resolution;

  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }
  this.scope_.$apply();
};

module.controller('MainController', MainController);

export default module;
