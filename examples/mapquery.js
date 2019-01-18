/**
 */

import angular from 'angular';
import appURL from './url.js';
import './mapquery.css';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoQueryMapQueryComponent from 'ngeo/query/mapQueryComponent.js';
import ngeoQueryModule from 'ngeo/query/module.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.name,
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
  ngeoQueryMapQueryComponent.name,
  ngeoQueryModule.name,
]);


module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('partials/queryresult', require('./partials/queryresult.html'));
});


module.value('ngeoQueryOptions', {
  'limit': 20
});


/**
 * A sample component to display the result.
 *
 * @type {!angular.IComponentOptions}
 */
exports.queryresultComponent = {
  controller: 'AppQueryresultController',
  templateUrl: 'partials/queryresult'
};

module.component('appQueryresult', exports.queryresultComponent);


/**
 * @param {QueryResult} ngeoQueryResult The ngeo query service.
 * @constructor
 * @ngInject
 */
exports.QueryresultController = function(ngeoQueryResult) {

  /**
   * @type {QueryResult}
   * @export
   */
  this.result = ngeoQueryResult;

};


module.controller('AppQueryresultController', exports.QueryresultController);


/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/datasource/DataSources.js").default} ngeoDataSources Ngeo data sources service.
 * @param {import("ngeo/misc/ToolActivateMgr.js").default} ngeoToolActivateMgr The ngeo ToolActivate
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
      'url': appURL.MAPSERVER_PROXY,
      params: {'LAYERS': 'bus_stop'}
    })
  });

  const informationLayer = new olLayerImage({
    'source': new olSourceImageWMS({
      'url': appURL.MAPSERVER_PROXY,
      params: {'LAYERS': 'information'}
    })
  });

  /**
   * @type {import("ol/Map.js").default}
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
    wmsUrl: appURL.MAPSERVER_PROXY,
    ogcLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));

  ngeoDataSources.collection.push(new ngeoDatasourceOGC({
    id: 2,
    name: 'information',
    visible: true,
    wmsUrl: appURL.MAPSERVER_PROXY,
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


module.controller('MainController', exports.MainController);


export default module;
