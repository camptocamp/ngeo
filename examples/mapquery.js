/**
 * @module app.mapquery
 */
const exports = {};

import './mapquery.css';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @suppress {extraRequire} */
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} **/
exports.module = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.module.name,
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.module.name,
  ngeoQueryMapQueryComponent.name,
]);


exports.module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
 * A sample component to display the result.
 *
 * @type {!angular.Component}
 */
exports.queryresultComponent = {
  controller: 'AppQueryresultController',
  template: require('./partials/queryresult.html')
};

exports.module.component('appQueryresult', exports.queryresultComponent);


/**
 * @param {ngeox.QueryResult} ngeoQueryResult The ngeo query service.
 * @constructor
 * @ngInject
 */
exports.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {ngeox.QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


exports.module.controller('AppQueryresultController', exports.QueryresultController);


/**
 * @param {angular.Scope} $scope Scope.
 * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo data sources service.
 * @param {ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @constructor
 * @ngInject
 */
exports.MainController = function($scope, ngeoDataSources, ngeoToolActivateMgr) {

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

  const busStopLayer = new olLayerImage({
    'source': new olSourceImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      params: {'LAYERS': 'bus_stop'}
    })
  });

  const informationLayer = new olLayerImage({
    'source': new olSourceImageWMS({
      'url': 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
      params: {'LAYERS': 'information'}
    })
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
      informationLayer,
      busStopLayer
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 0
    })
  });

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(new ngeoDatasourceOGC({
    id: 1,
    name: 'bus_stop',
    visible: true,
    wmsUrl: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));

  ngeoDataSources.collection.push(new ngeoDatasourceOGC({
    id: 2,
    name: 'information',
    visible: true,
    wmsUrl: 'https://geomapfish-demo.camptocamp.com/2.3/wsgi/mapserv_proxy',
    ogcLayers: [{
      name: 'information',
      queryable: true
    }]
  }));

  const queryToolActivate = new ngeoMiscToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate, true);

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate);

};


/**
 * @param {boolean|undefined} val Value.
 * @return {boolean|undefined} Value.
 * @export
 */
exports.MainController.prototype.getSetDummyActive = function(val) {
  if (val !== undefined) {
    this.dummyActive = val;
  } else {
    return this.dummyActive;
  }
};


exports.module.controller('MainController', exports.MainController);


export default exports;
