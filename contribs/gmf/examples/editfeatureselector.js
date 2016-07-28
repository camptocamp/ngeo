goog.provide('gmf-editfeatureselector');

goog.require('gmf');
goog.require('gmf.Themes');
goog.require('gmf.authenticationDirective');
goog.require('gmf.editfeatureselectorDirective');
goog.require('gmf.mapDirective');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.Collection');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.layer.Vector');
goog.require('ol.source.OSM');
goog.require('ol.source.Vector');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Image');
goog.require('ol.style.Stroke');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.constant(
    'authenticationBaseUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi');


app.module.constant('gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?version=2&background=background');


app.module.constant('gmfLayersUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/layers/');


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {gmf.Themes} gmfThemes The gmf themes service.
 * @param {gmfx.User} gmfUser User.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ngeo.LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 */
app.MainController = function($scope, gmfThemes, gmfUser, ngeoFeatureHelper,
    ngeoLayerHelper, ngeoToolActivateMgr) {

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {gmfx.User}
   * @export
   */
  this.gmfUser = gmfUser;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  gmfThemes.loadThemes();

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  /**
   * @type {ol.layer.Image}
   * @private
   */
  var wmsLayer = new ol.layer.Image({
    querySourceIds: [111, 112, 113],
    source: new ol.source.ImageWMS({
      url: 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/mapserv_proxy',
      params: {'LAYERS': 'point,line,polygon'}
    })
  });

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      wrapX: false,
      features: new ol.Collection()
    }),
    style: function(feature, resolution) {
      // (1) Style definition depends on geometry type
      var white = [255, 255, 255, 1];
      var blue = [0, 153, 255, 1];
      var width = 3;
      var styles = [];

      var geom = feature.getGeometry();
      console.assert(geom);
      var type = geom.getType();

      if (type === 'Point') {
        styles.push(
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: width * 2,
              fill: new ol.style.Fill({
                color: blue
              }),
              stroke: new ol.style.Stroke({
                color: white,
                width: width / 2
              })
            }),
            zIndex: Infinity
          })
        );
      } else {
        if (type === 'LineString') {
          styles.push(
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: white,
                width: width + 2
              })
            })
          );
          styles.push(
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: blue,
                width: width
              })
            })
          );
        } else {
          styles.push(
            new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: blue,
                width: width / 2
              }),
              fill: new ol.style.Fill({
                color: [255, 255, 255, 0.5]
              })
            })
          );
        }

        // (2) Anything else than 'Point' requires the vertex style as well
        styles.push(ngeoFeatureHelper.getVertexStyle(true));
      }

      return styles;
    }.bind(this)
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2
    })
  });

  // Add the WMS layer to the 'data' group, which is what the layer tree
  // would do
  var dataLayerGroup = ngeoLayerHelper.getGroupFromMap(this.map,
        gmf.DATALAYERGROUP_NAME);
  dataLayerGroup.getLayers().push(wmsLayer);

  // Add layer vector after
  this.map.addLayer(this.vectorLayer);

 /**
   * @type {boolean}
   * @export
   */
  this.editFeatureSelectorActive = true;

  var editFeatureSelectorToolActivate = new ngeo.ToolActivate(
      this, 'editFeatureSelectorActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', editFeatureSelectorToolActivate, true);

 /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  var dummyToolActivate = new ngeo.ToolActivate(
      this, 'dummyActive');
  ngeoToolActivateMgr.registerTool(
      'mapTools', dummyToolActivate, false);

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });

};


app.module.controller('MainController', app.MainController);
