/**
 * @module app.mobilegeolocation
 */
const exports = {};

import './mobilegeolocation.css';
import olMap from 'ol/Map.js';

import olView from 'ol/View.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoGeolocationMobile from 'ngeo/geolocation/mobile.js';


/** @type {!angular.Module} **/
const appmodule = angular.module('app', [
  'gettext',
  ngeoGeolocationMobile.name,
  ngeoMapModule.name
]);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.map.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 */
exports.MainController = function($scope, ngeoFeatureOverlayMgr) {

  const positionFeatureStyle = new olStyleStyle({
    image: new olStyleCircle({
      radius: 6,
      fill: new olStyleFill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new olStyleStroke({color: 'rgba(230, 40, 40, 1)', width: 2})
    })
  });

  const accuracyFeatureStyle = new olStyleStyle({
    fill: new olStyleFill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new olStyleStroke({color: 'rgba(40, 40, 230, 1)', width: 2})
  });

  /**
   * @type {ngeox.MobileGeolocationDirectiveOptions}
   * @export
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: 17,
    autorotate: true
  };

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      })
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4
    })
  });

  ngeoFeatureOverlayMgr.init(this.map);
};


appmodule.controller('MainController', exports.MainController);


export default exports;
