


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


app.module.value('gmfWmsUrl',
    'https://geomapfish-demo.camptocamp.net/2.0/wsgi/mapserv_proxy');


/**
 * @constructor
 * @param {angular.$http} $http Angular's $http service.
 */
app.MainController = function($http) {

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

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

  $http.get('data/themes.json').success(function(data) {
    var themes = data['themes'];
    if (themes) {
      this.themes = themes;
      this.treeSource = themes[3];
    }
  }.bind(this));
};

app.module.controller('MainController', app.MainController);
