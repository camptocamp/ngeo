/**
 */

import './importfeatures.css';
import angular from 'angular';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscFilereaderComponent from 'ngeo/misc/filereaderComponent.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import * as olExtent from 'ol/extent.js';
import olFormatKML from 'ol/format/KML.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';


/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoMapModule.name,
  ngeoMiscFilereaderComponent.name,
]);


/**
 * @constructor
 * @param {angular.IScope} $scope Scope.
 * @export
 * @ngInject
 */
function MainController($scope) {

  /**
   * @private
   * @type {import("ol/format/KML.js").default}
   */
  this.kmlFormat_ = new olFormatKML({
    extractStyles: false
  });

  /**
   * @private
   * @type {import("ol/source/Vector.js").default}
   */
  this.vectorSource_ = new olSourceVector();

  /**
   * @type {import("ol/Map.js").default}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      }),
      new olLayerVector({
        source: this.vectorSource_
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 2
    })
  });


  /**
   * @type {boolean|undefined}
   * @export
   */
  this.fileReaderSupported = undefined;

  /**
   * @type {string}
   * @export
   */
  this.fileContent = '';

  $scope.$watch(() => this.fileContent, this.importKml_.bind(this));

};


/**
 * @param {string} kml KML document.
 * @private
 */
exports.MainController.prototype.importKml_ = function(kml) {
  const map = this.map;
  const vectorSource = this.vectorSource_;
  const features = this.kmlFormat_.readFeatures(kml, {
    featureProjection: 'EPSG:3857'
  });
  vectorSource.clear(true);
  vectorSource.addFeatures(features);
  const extent = vectorSource.getExtent();
  const mapSize = map.getSize();
  if (mapSize && !olExtent.isEmpty(extent)) {
    map.getView().fit(extent, mapSize);
  }
};


module.controller('MainController', exports.MainController);


export default module;
