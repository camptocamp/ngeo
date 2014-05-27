


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);

app.module.constant('ngeoMeasureDecimals', 2);


/**
 * @constructor
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 */
app.MainController = function($scope, ngeoFeatureHelper) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  // create features
  var features = [];

  var pointProperties = {
    geometry: new ol.geom.Point([-8458215, 6672646])
  };
  pointProperties[ngeo.FeatureProperties.COLOR] = '#009D57';
  pointProperties[ngeo.FeatureProperties.NAME] = 'Point1';
  pointProperties[ngeo.FeatureProperties.SIZE] = '6';
  features.push(new ol.Feature(pointProperties));

  var textProperties = {
    geometry: new ol.geom.Point([-8007848, 6209744])
  };
  textProperties[ngeo.FeatureProperties.ANGLE] = '0';
  textProperties[ngeo.FeatureProperties.COLOR] = '#000000';
  textProperties[ngeo.FeatureProperties.IS_TEXT] = true;
  textProperties[ngeo.FeatureProperties.NAME] = 'Text 1';
  textProperties[ngeo.FeatureProperties.SIZE] = '16';
  features.push(new ol.Feature(textProperties));

  var lineProperties = {
    geometry: new ol.geom.LineString([
      [-8321240, 6523441],
      [-8103547, 6726458],
      [-8091318, 6408480],
      [-7973910, 6631065]
    ])
  };
  lineProperties[ngeo.FeatureProperties.COLOR] = '#0BA9CC';
  lineProperties[ngeo.FeatureProperties.NAME] = 'LineString 1';
  lineProperties[ngeo.FeatureProperties.STROKE] = '4';
  features.push(new ol.Feature(lineProperties));

  var poly1Properties = {
    geometry: new ol.geom.Polygon([
      [
        [-8512027, 6359560],
        [-8531595, 6080718],
        [-8267428, 6031798],
        [-8238077, 6247045],
        [-8512027, 6359560]
      ]
    ])
  };
  poly1Properties[ngeo.FeatureProperties.COLOR] = '#4186F0';
  poly1Properties[ngeo.FeatureProperties.NAME] = 'Polygon 1';
  poly1Properties[ngeo.FeatureProperties.OPACITY] = '0.5';
  poly1Properties[ngeo.FeatureProperties.SHOW_MEASURE] = true;
  poly1Properties[ngeo.FeatureProperties.STROKE] = '1';
  features.push(new ol.Feature(poly1Properties));

  var poly2Properties = {
    geometry: new ol.geom.Polygon([
      [
        [-7952508, 6096617],
        [-8051570, 5959642],
        [-7848554, 5926621],
        [-7754383, 6025683],
        [-7952508, 6096617]
      ]
    ])
  };
  poly2Properties[ngeo.FeatureProperties.COLOR] = '#CCCCCC';
  poly2Properties[ngeo.FeatureProperties.NAME] = 'Polygon 2';
  poly2Properties[ngeo.FeatureProperties.OPACITY] = '1';
  poly2Properties[ngeo.FeatureProperties.STROKE] = '3';
  features.push(new ol.Feature(poly2Properties));

  var rectProperties = {
    geometry: ol.geom.Polygon.fromExtent([-7874848, 6496535, -7730535, 6384020])
  };
  rectProperties[ngeo.FeatureProperties.COLOR] = '#000000';
  rectProperties[ngeo.FeatureProperties.IS_RECTANGLE] = true;
  rectProperties[ngeo.FeatureProperties.NAME] = 'Rectangle 1';
  rectProperties[ngeo.FeatureProperties.OPACITY] = '0.5';
  rectProperties[ngeo.FeatureProperties.STROKE] = '2';
  features.push(new ol.Feature(rectProperties));

  var circleProperties = {
    geometry: ol.geom.Polygon.fromCircle(
        new ol.geom.Circle([-7691093, 6166327], 35000), 64)
  };
  circleProperties[ngeo.FeatureProperties.COLOR] = '#000000';
  circleProperties[ngeo.FeatureProperties.IS_CIRCLE] = true;
  circleProperties[ngeo.FeatureProperties.NAME] = 'Circle 1';
  circleProperties[ngeo.FeatureProperties.OPACITY] = '0.5';
  circleProperties[ngeo.FeatureProperties.STROKE] = '2';
  features.push(new ol.Feature(circleProperties));

  var view = new ol.View({
    center: [-8174482, 6288627],
    zoom: 6
  });

  ngeoFeatureHelper.setProjection(view.getProjection());

  // set style
  features.forEach(function(feature) {
    ngeoFeatureHelper.setStyle(feature);
  }, this);

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Vector({
        source: new ol.source.Vector({
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
app.MainController.prototype.handleMapSingleClick_ = function(evt) {
  var pixel = evt.pixel;

  var feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
    return feature;
  });

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


app.module.controller('MainController', app.MainController);
