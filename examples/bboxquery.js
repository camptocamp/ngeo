goog.provide('app.bboxquery');

// webpack: import './bboxquery.css';
// webpack: import './common_dependencies.js';
/** @suppress {extraRequire} */
goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.datasource.DataSources');
goog.require('ngeo.datasource.OGC');
goog.require('ngeo');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.query.module');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.OSM');


/** @type {!angular.Module} */
app.bboxquery.module = angular.module('app', [
  ngeo.module.name,
  ngeo.datasource.DataSources.module.name,
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.query.module.name
]);


app.bboxquery.module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
app.bboxquery.queryresultComponent = {
  controller: 'AppQueryresultController',
  controllerAs: 'qrCtrl',
  templateUrl: 'partials/queryresult.html'
};

app.bboxquery.module.component('appQueryresult', app.bboxquery.queryresultComponent);


/**
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query service.
 * @constructor
 * @ngInject
 */
app.bboxquery.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


app.bboxquery.module.controller('AppQueryresultController', app.bboxquery.QueryresultController);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
 *     data sources objects.
 * @constructor
 * @ngInject
 */
app.bboxquery.MainController = function($scope, ngeoDataSources) {

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  const informationLayer = new ol.layer.Image({
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
      params: {'LAYERS': 'information'}
    })
  });

  const busStopLayer = new ol.layer.Image({
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
      params: {'LAYERS': 'bus_stop'}
    })
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

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(new ngeo.datasource.OGC({
    id: 1,
    name: 'bus_stop',
    visible: true,
    wfsUrl: 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));

  ngeoDataSources.collection.push(new ngeo.datasource.OGC({
    id: 2,
    name: 'information',
    visible: true,
    wfsUrl: 'https://geomapfish-demo.camptocamp.net/2.2/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'information',
      queryable: true
    }]
  }));
};

app.bboxquery.module.controller('MainController', app.bboxquery.MainController);
