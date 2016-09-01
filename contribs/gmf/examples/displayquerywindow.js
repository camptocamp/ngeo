goog.provide('gmf-displayquerywindow');

goog.require('gmf.QueryManager');
goog.require('gmf.Themes');
goog.require('gmf.displayquerywindowDirective');
goog.require('gmf.layertreeDirective');
goog.require('gmf.mapDirective');
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo');
goog.require('ngeo.Query');
goog.require('ngeo.btnDirective');
goog.require('ngeo.mapQueryDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.proj');
goog.require('ol.source.OSM');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('ngeoQueryOptions', {
  'limit': 20
});


app.module.value(
    'gmfTreeUrl',
    'https://geomapfish-demo.camptocamp.net/2.1/wsgi/themes?' +
        'version=2&background=background');


/**
 * Demo, NOT USED.
 * A sample directive to display the result.
 *
 * @return {angular.Directive} The directive specs.
 */
app.queryresultDirective = function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'AppQueryresultController',
    controllerAs: 'qrCtrl',
    bindToController: true,
    templateUrl: 'partials/queryresult.html'
  };
};

app.module.directive('appQueryresult', app.queryresultDirective);


/**
 * Demo, NOT USED.
 * @param {ngeox.QueryResult} ngeoQueryResult Query service.
 * @constructor
 * @ngInject
 */
app.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


app.module.controller('AppQueryresultController', app.QueryresultController);


/**
 * @constructor
 * @param {gmf.Themes} gmfThemes The gme themes service.
 * @param {gmf.QueryManager} gmfQueryManager The gmf query manager service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *   overlay manager service.
 */
app.MainController = function(gmfThemes, gmfQueryManager,
    ngeoFeatureOverlayMgr) {

  gmfThemes.loadThemes();

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  var fill = new ol.style.Fill({color: [255, 170, 0, 0.6]});
  var stroke = new ol.style.Stroke({color: [255, 170, 0, 1], width: 2});

  /**
   * FeatureStyle used by the displayquerywindow directive
   * @type {ol.style.Style}
   * @export
   */
  this.featureStyle = new ol.style.Style({
    fill: fill,
    image: new ol.style.Circle({fill: fill, radius: 5, stroke: stroke}),
    stroke: stroke
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
      zoom: 3
    })
  });

  /**
   * @type {Array.<Object>|undefined}
   * export
   */
  this.themes = undefined;

  /**
   * @type {Object|undefined}
   * @export
   */
  this.treeSource = undefined;

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  gmfThemes.getThemesObject().then(function(themes) {
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  }.bind(this));

  ngeoFeatureOverlayMgr.init(this.map);
};

app.module.controller('MainController', app.MainController);
