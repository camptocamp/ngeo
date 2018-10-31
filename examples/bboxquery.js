/**
 * @module app.bboxquery
 */
const exports = {};

import appURL from './url.js';
import './bboxquery.css';
import EPSG21781 from 'ngeo/proj/EPSG21781.js';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @suppress {extraRequire} */
import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoQueryModule from 'ngeo/query/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceOSM from 'ol/source/OSM.js';


/** @type {!angular.Module} */
exports.module = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.module.name,
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoQueryModule.name
]);


exports.module.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('partials/queryresult', require('./partials/queryresult.html'));
});


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
  templateUrl: 'partials/queryresult'
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
 * @param {ngeo.datasource.DataSources} ngeoDataSources Ngeo collection of
 *     data sources objects.
 * @constructor
 * @ngInject
 */
exports.MainController = function($scope, ngeoDataSources) {

  /**
   * @type {boolean}
   * @export
   */
  this.queryActive = true;

  const informationLayer = new olLayerImage({
    'source': new olSourceImageWMS({
      'url': appURL.MAPSERVER_PROXY,
      params: {'LAYERS': 'information'}
    })
  });

  const busStopLayer = new olLayerImage({
    'source': new olSourceImageWMS({
      'url': appURL.MAPSERVER_PROXY,
      params: {'LAYERS': 'bus_stop'}
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
    wfsFeatureNS: appURL.MAPSERVER_WFS_FEATURE_NS,
    wfsUrl: appURL.MAPSERVER_PROXY,
    ogcLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));

  ngeoDataSources.collection.push(new ngeoDatasourceOGC({
    id: 2,
    name: 'information',
    visible: true,
    wfsFeatureNS: appURL.MAPSERVER_WFS_FEATURE_NS,
    wfsUrl: appURL.MAPSERVER_PROXY,
    ogcLayers: [{
      name: 'information',
      queryable: true
    }]
  }));
};

exports.module.controller('MainController', exports.MainController);


export default exports;
