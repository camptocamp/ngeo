


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


app.module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
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
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query service.
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
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.Query} ngeoQuery The ngeo query service
 * @constructor
 * @ngInject
 */
app.MainController = function($scope, ngeoQuery) {

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  var projection = ol.proj.get('EPSG:21781');
  projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);

  var busStopSourceId = 'bus_stop';
  var busStopLayer = new ol.layer.Image({
    'querySourceId': busStopSourceId,
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy',
      params: {'LAYERS': 'bus_stop'}
    })
  });
  ngeoQuery.addSource({
    'id': busStopSourceId,
    'layer': busStopLayer,
    'wfsQuery': true
  });

  var informationSourceId = 'information';
  var informationLayer = new ol.layer.Image({
    'querySourceId': informationSourceId,
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.net/1.6/wsgi/mapserv_proxy',
      params: {'LAYERS': 'information'}
    })
  });
  ngeoQuery.addSource({
    'id': informationSourceId,
    'layer': informationLayer,
    'wfsQuery': true
  });

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      informationLayer,
      busStopLayer
    ],
    view: new ol.View({
      projection: projection,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 0
    })
  });

};

app.module.controller('MainController', app.MainController);
