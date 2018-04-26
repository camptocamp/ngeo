/**
 * @module gmfapp.featurestyle
 */
const exports = {};

import './featurestyle.css';
import gmfDrawingFeatureStyleComponent from 'gmf/drawing/featureStyleComponent.js';

/** @suppress {extraRequire} */
import gmfMapComponent from 'gmf/map/component.js';

import googAsserts from 'goog/asserts.js';
import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import olFeature from 'ol/Feature.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerVector from 'ol/layer/Vector.js';
import olSourceOSM from 'ol/source/OSM.js';
import olSourceVector from 'ol/source/Vector.js';


/** @type {!angular.Module} **/
exports.module = angular.module('gmfapp', [
  'gettext',
  gmfDrawingFeatureStyleComponent.name,
  gmfMapComponent.name,
  ngeoMiscFeatureHelper.module.name,
]);


exports.module.value('ngeoMeasureDecimals', 2);

exports.module.constant('defaultTheme', 'Demo');
exports.module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.misc.FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 * @ngInject
 */
exports.MainController = function($scope, ngeoFeatureHelper) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.misc.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  // create features
  const features = [];

  const pointProperties = {
    geometry: new olGeomPoint([-8458215, 6672646])
  };
  pointProperties[ngeoFormatFeatureProperties.COLOR] = '#009D57';
  pointProperties[ngeoFormatFeatureProperties.NAME] = 'Point1';
  pointProperties[ngeoFormatFeatureProperties.SIZE] = '6';
  features.push(new olFeature(pointProperties));

  const textProperties = {
    geometry: new olGeomPoint([-8007848, 6209744])
  };
  textProperties[ngeoFormatFeatureProperties.ANGLE] = '0';
  textProperties[ngeoFormatFeatureProperties.COLOR] = '#000000';
  textProperties[ngeoFormatFeatureProperties.IS_TEXT] = true;
  textProperties[ngeoFormatFeatureProperties.NAME] = 'Text 1';
  textProperties[ngeoFormatFeatureProperties.SIZE] = '16';
  textProperties[ngeoFormatFeatureProperties.STROKE] = '2';
  features.push(new olFeature(textProperties));

  const lineProperties = {
    geometry: new olGeomLineString([
      [-8321240, 6523441],
      [-8103547, 6726458],
      [-8091318, 6408480],
      [-7973910, 6631065]
    ])
  };
  lineProperties[ngeoFormatFeatureProperties.COLOR] = '#0BA9CC';
  lineProperties[ngeoFormatFeatureProperties.NAME] = 'LineString 1';
  lineProperties[ngeoFormatFeatureProperties.STROKE] = '4';
  features.push(new olFeature(lineProperties));

  const poly1Properties = {
    geometry: new olGeomPolygon([
      [
        [-8512027, 6359560],
        [-8531595, 6080718],
        [-8267428, 6031798],
        [-8238077, 6247045],
        [-8512027, 6359560]
      ]
    ])
  };
  poly1Properties[ngeoFormatFeatureProperties.COLOR] = '#4186F0';
  poly1Properties[ngeoFormatFeatureProperties.NAME] = 'Polygon 1';
  poly1Properties[ngeoFormatFeatureProperties.OPACITY] = '0.5';
  poly1Properties[ngeoFormatFeatureProperties.SHOW_MEASURE] = true;
  poly1Properties[ngeoFormatFeatureProperties.STROKE] = '1';
  features.push(new olFeature(poly1Properties));

  const poly2Properties = {
    geometry: new olGeomPolygon([
      [
        [-7952508, 6096617],
        [-8051570, 5959642],
        [-7848554, 5926621],
        [-7754383, 6025683],
        [-7952508, 6096617]
      ]
    ])
  };
  poly2Properties[ngeoFormatFeatureProperties.COLOR] = '#CCCCCC';
  poly2Properties[ngeoFormatFeatureProperties.NAME] = 'Polygon 2';
  poly2Properties[ngeoFormatFeatureProperties.OPACITY] = '1';
  poly2Properties[ngeoFormatFeatureProperties.STROKE] = '3';
  features.push(new olFeature(poly2Properties));

  const rectProperties = {
    geometry: olGeomPolygon.fromExtent([-7874848, 6496535, -7730535, 6384020])
  };
  rectProperties[ngeoFormatFeatureProperties.COLOR] = '#000000';
  rectProperties[ngeoFormatFeatureProperties.IS_RECTANGLE] = true;
  rectProperties[ngeoFormatFeatureProperties.NAME] = 'Rectangle 1';
  rectProperties[ngeoFormatFeatureProperties.OPACITY] = '0.5';
  rectProperties[ngeoFormatFeatureProperties.STROKE] = '2';
  features.push(new olFeature(rectProperties));

  const circleProperties = {
    geometry: olGeomPolygon.fromCircle(
      new olGeomCircle([-7691093, 6166327], 35000), 64)
  };
  circleProperties[ngeoFormatFeatureProperties.COLOR] = '#000000';
  circleProperties[ngeoFormatFeatureProperties.IS_CIRCLE] = true;
  circleProperties[ngeoFormatFeatureProperties.NAME] = 'Circle 1';
  circleProperties[ngeoFormatFeatureProperties.OPACITY] = '0.5';
  circleProperties[ngeoFormatFeatureProperties.STROKE] = '2';
  features.push(new olFeature(circleProperties));

  const view = new olView({
    center: [-8174482, 6288627],
    zoom: 6
  });

  ngeoFeatureHelper.setProjection(googAsserts.assert(view.getProjection()));

  // set style
  features.forEach((feature) => {
    ngeoFeatureHelper.setStyle(feature);
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM()
      }),
      new olLayerVector({
        source: new olSourceVector({
          wrapX: false,
          features: features
        })
      })
    ],
    view: view
  });

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  this.map.on('singleclick', this.handleMapSingleClick_, this);
};


/**
 * @param {ol.MapBrowserEvent} evt MapBrowser event
 * @private
 */
exports.MainController.prototype.handleMapSingleClick_ = function(evt) {
  const pixel = evt.pixel;

  const feature = this.map.forEachFeatureAtPixel(pixel, feature => feature);

  if (this.selectedFeature) {
    this.featureHelper_.setStyle(this.selectedFeature);
  }

  if (feature) {
    if (this.selectedFeature !== feature) {
      this.selectedFeature = feature;
      this.featureHelper_.setStyle(feature, true);
    }
  } else {
    this.selectedFeature = null;
  }

  this.scope_.$apply();

};


exports.module.controller('MainController', exports.MainController);


export default exports;
