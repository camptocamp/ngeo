goog.provide('app.mapquery');

// webpack: import './mapquery.css';
const EPSG21781 = goog.require('ngeo.proj.EPSG21781');
goog.require('ngeo.datasource.DataSources');
goog.require('ngeo.datasource.OGC');
goog.require('ngeo.map.module');
/** @suppress {extraRequire} */
goog.require('ngeo.misc.btnComponent');
goog.require('ngeo.misc.ToolActivate');
goog.require('ngeo.misc.ToolActivateMgr');
goog.require('ngeo.query.mapQueryComponent');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Image');
goog.require('ol.layer.Tile');
goog.require('ol.source.ImageWMS');
goog.require('ol.source.OSM');


/** @type {!angular.Module} **/
app.mapquery.module = angular.module('app', [
  'gettext',
  ngeo.datasource.DataSources.module.name,
  ngeo.map.module.name,
  ngeo.misc.btnComponent.name,
  ngeo.misc.ToolActivateMgr.module.name,
  ngeo.query.mapQueryComponent.name,
]);


app.mapquery.module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
app.mapquery.queryresultComponent = {
  controller: 'AppQueryresultController',
  template: require('./partials/queryresult.html')
};

app.mapquery.module.component('appQueryresult', app.mapquery.queryresultComponent);


/**
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query service.
 * @constructor
 * @ngInject
 */
app.mapquery.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


app.mapquery.module.controller('AppQueryresultController', app.mapquery.QueryresultController);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @constructor
 * @ngInject
 */
app.mapquery.MainController = function($scope, ngeoDataSources, ngeoToolActivateMgr) {

  /**
   * @type {boolean}
   * @export
   */
  this.dummyActive = false;

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  const busStopLayer = new ol.layer.Image({
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      params: {'LAYERS': 'bus_stop'}
    })
  });

  const informationLayer = new ol.layer.Image({
    'source': new ol.source.ImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      params: {'LAYERS': 'information'}
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
      projection: EPSG21781,
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
    wmsUrl: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));

  ngeoDataSources.collection.push(new ngeo.datasource.OGC({
    id: 2,
    name: 'information',
    visible: true,
    wmsUrl: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'information',
      queryable: true
    }]
  }));

  const queryToolActivate = new ngeo.misc.ToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate, true);

  const dummyToolActivate = new ngeo.misc.ToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate);

};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
app.mapquery.MainController.prototype.getSetDummyActive = function(val) {
  if (val !== undefined) {
    this.dummyActive = val;
  } else {
    return this.dummyActive;
  }
};


app.mapquery.module.controller('MainController', app.mapquery.MainController);
