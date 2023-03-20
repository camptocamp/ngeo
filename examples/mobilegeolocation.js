/**
 */

import './mobilegeolocation.css';
import angular from 'angular';
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

/** @type {!angular.IModule} **/
const appmodule = angular.module('app', ['gettext', ngeoGeolocationMobile.name, ngeoMapModule.name]);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 */
function MainController($scope, ngeoFeatureOverlayMgr) {
  const positionFeatureStyle = new olStyleStyle({
    image: new olStyleCircle({
      radius: 6,
      fill: new olStyleFill({color: 'rgba(230, 100, 100, 1)'}),
      stroke: new olStyleStroke({color: 'rgba(230, 40, 40, 1)', width: 2}),
    }),
  });

  const accuracyFeatureStyle = new olStyleStyle({
    fill: new olStyleFill({color: 'rgba(100, 100, 230, 0.3)'}),
    stroke: new olStyleStroke({color: 'rgba(40, 40, 230, 1)', width: 2}),
  });

  /**
   * @type {import('ngeo/geolocation/mobile.js').MobileGeolocationDirectiveOptions}
   */
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: 17,
    autorotate: true,
  };

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
    ],
    view: new olView({
      center: [0, 0],
      zoom: 4,
    }),
  });

  ngeoFeatureOverlayMgr.init(this.map);
}

appmodule.controller('MainController', MainController);

export default module;
