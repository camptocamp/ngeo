// The MIT License (MIT)
//
// Copyright (c) 2015-2022 Camptocamp SA
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

import './layerorder.css';
import angular from 'angular';
import gmfMapComponent from 'gmf/map/component';
import options from './options';

import ngeoMiscSortableComponent from 'ngeo/misc/sortableComponent';

import ngeoMiscSyncArrays from 'ngeo/misc/syncArrays';
import ngeoSourceAsitVD from 'ngeo/source/AsitVD';
import EPSG2056 from 'ngeo/proj/EPSG_2056';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerTile from 'ol/layer/Tile';
import olLayerImage from 'ol/layer/Image';
import olSourceWMS from 'ol/source/ImageWMS';
import {MAPSERVER_PROXY} from './url';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', gmfMapComponent.name, ngeoMiscSortableComponent.name]);

/**
 * @param {angular.IScope} $scope Scope.
 * @class
 * @ngInject
 */
function MainController($scope) {
  const asitvd = new olLayerTile({
    source: new ngeoSourceAsitVD({
      layer: 'asitvd.fond_couleur',
    }),
  });
  asitvd.set('name', 'asitvd');

  const boundaries = new olLayerImage({
    source: new olSourceWMS({
      url: MAPSERVER_PROXY,
      params: {
        'ogcserver': 'Main PNG',
        'LAYERS': 'post_office',
      },
      serverType: 'mapserver',
    }),
  });
  boundaries.set('name', 'Boundaries');

  const waterBodies = new olLayerImage({
    source: new olSourceWMS({
      url: MAPSERVER_PROXY,
      params: {
        'ogcserver': 'Main PNG',
        'LAYERS': 'entertainment',
      },
      serverType: 'mapserver',
    }),
  });
  waterBodies.set('name', 'Water bodies');

  const cities = new olLayerImage({
    source: new olSourceWMS({
      url: MAPSERVER_PROXY,
      params: {
        'ogcserver': 'Main PNG',
        'LAYERS': 'sustenance',
      },
      serverType: 'mapserver',
    }),
  });
  cities.set('name', 'Cities');

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [asitvd, boundaries, waterBodies, cities],
    view: new olView({
      projection: EPSG2056,
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2600000, 1200000],
      zoom: 9,
    }),
  });

  const map = this.map;

  this.roads_ = new olLayerImage({
    source: new olSourceWMS({
      url: MAPSERVER_PROXY,
      params: {
        'ogcserver': 'Main PNG',
        'LAYERS': 'osm_scale',
      },
      serverType: 'mapserver',
    }),
  });
  this.roads_.set('name', 'Roads');

  /**
   * @type {import('ol/layer/Base').default[]}
   * @constant
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
   * @param {import('ol/layer/Base').default} layer Layer.
   * @returns {boolean} `false` if the layer shouldn't be part of the selected
   *     layers.
   */
  function layerFilter(layer) {
    return layer !== asitvd;
  }
}

/**
 * Add/remove the "Roads" layer when used as a setter, and return whether
 * the "Roads" layer is in the map when used as a getter.
 *
 * @param {boolean|undefined} val Value.
 * @returns {boolean|undefined} `true` if the "Roads" layer is in the map,
 *     `false` if the "Roads" layer is not in the map, `undefined` if the
 *     function is used as setter.
 */
MainController.prototype.toggleRoadsLayer = function (val) {
  if (val === undefined) {
    return this.map.getLayers().getArray().includes(this.roads_);
  } else {
    if (val) {
      this.map.addLayer(this.roads_);
    } else {
      this.map.removeLayer(this.roads_);
    }
  }
};

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
