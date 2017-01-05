goog.provide('app.bboxquery');

/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.Query');
/** @suppress {extraRequire} */
goog.require('ngeo.btnDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.mapDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.bboxQueryDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
app.module = angular.module('app', ['ngeo']);


app.module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
 * A sample directive to display the result.
 *
 * @return {angular.Directive} The directive specs.
 * @ngInject
 */
app.queryresultDirective = function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'AppQueryresultController as qrCtrl',
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

  const busStopSourceId = 'bus_stop';
  const busStopLayer = new ol.layer.Image({
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

  const informationSourceId = 'information';
  const informationLayer = new ol.layer.Image({
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
      projection: 'EPSG:21781',
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 0
    })
  });

};

app.module.controller('MainController', app.MainController);
