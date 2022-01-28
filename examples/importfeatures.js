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

import angular from 'angular';
import gmfMapComponent from 'gmf/map/component';
import options from './options';

import ngeoMiscFilereaderComponent from 'ngeo/misc/filereaderComponent';

import olMap from 'ol/Map';
import olView from 'ol/View';
import * as olExtent from 'ol/extent';
import olFormatKML from 'ol/format/KML';
import olLayerTile from 'ol/layer/Tile';
import olLayerVector from 'ol/layer/Vector';
import olSourceOSM from 'ol/source/OSM';
import olSourceVector from 'ol/source/Vector';

/** @type {angular.IModule} **/
const myModule = angular.module('app', ['gettext', gmfMapComponent.name, ngeoMiscFilereaderComponent.name]);

/**
 * @class
 * @param {angular.IScope} $scope Scope.
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {import('ol/format/KML').default}
   */
  this.kmlFormat_ = new olFormatKML();

  /**
   * @type {import('ol/source/Vector').default<import('ol/geom/Geometry').default>}
   */
  this.vectorSource_ = new olSourceVector();

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      new olLayerVector({
        source: this.vectorSource_,
      }),
    ],
    view: new olView({
      center: [0, 0],
      zoom: 2,
    }),
  });

  /**
   * @type {boolean|undefined}
   */
  this.fileReaderSupported = undefined;

  /**
   * @type {string}
   */
  this.fileContent = '';

  $scope.$watch(() => this.fileContent, this.importKml_.bind(this));
}

/**
 * @param {string} kml KML document.
 */
MainController.prototype.importKml_ = function (kml) {
  const map = this.map;
  const vectorSource = this.vectorSource_;
  const features = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */ (
    this.kmlFormat_.readFeatures(kml, {
      featureProjection: 'EPSG:3857',
    })
  );
  vectorSource.clear(true);
  vectorSource.addFeatures(features);
  const extent = vectorSource.getExtent();
  const mapSize = map.getSize();
  if (mapSize && !olExtent.isEmpty(extent)) {
    map.getView().fit(extent, {size: mapSize});
  }
};

myModule.controller('MainController', MainController);
options(myModule);

export default myModule;
