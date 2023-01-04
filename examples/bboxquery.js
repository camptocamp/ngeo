import angular from 'angular';
import {MAPSERVER_PROXY, MAPSERVER_WFS_FEATURE_NS} from './url.js';
import './bboxquery.css';
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoQueryModule from 'ngeo/query/module.js';
import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {!angular.IModule} */
const module = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.name,
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoQueryModule.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/queryresult', require('./partials/queryresult.html'));
  }
);

module.value('ngeoQueryOptions', {
  'limit': 20,
});

/**
 * A sample component to display the result.
 *
 * @type {!angular.IComponentOptions}
 */
const queryresultComponent = {
  controller: 'AppQueryresultController',
  templateUrl: 'partials/queryresult',
};

module.component('appQueryresult', queryresultComponent);

/**
 * @param {import('ngeo/query/MapQuerent.js').QueryResult} ngeoQueryResult The ngeo query service.
 * @constructor
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent.js').QueryResult}
   */
  this.result = ngeoQueryResult;
}

module.controller('AppQueryresultController', QueryresultController);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo collection of
 *     data sources objects.
 * @constructor
 * @ngInject
 */
function MainController($scope, ngeoDataSources) {
  /**
   * @type {boolean}
   */
  this.queryActive = true;

  const informationLayer = new olLayerImage({
    source: new olSourceImageWMS({
      projection: undefined, // should be removed in next OL version
      url: MAPSERVER_PROXY,
      params: {'LAYERS': 'information'},
    }),
  });

  const busStopLayer = new olLayerImage({
    source: new olSourceImageWMS({
      projection: undefined, // should be removed in next OL version
      url: MAPSERVER_PROXY,
      params: {'LAYERS': 'bus_stop'},
    }),
  });

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new olMap({
    layers: [
      new olLayerTile({
        source: new olSourceOSM(),
      }),
      informationLayer,
      busStopLayer,
    ],
    view: new olView({
      projection: EPSG21781,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 0,
    }),
  });

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(
    new ngeoDatasourceOGC({
      id: 1,
      name: 'bus_stop',
      visible: true,
      wfsFeatureNS: MAPSERVER_WFS_FEATURE_NS,
      wfsUrl: MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
      wfsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
    })
  );

  ngeoDataSources.collection.push(
    new ngeoDatasourceOGC({
      id: 2,
      name: 'information',
      visible: true,
      wfsFeatureNS: MAPSERVER_WFS_FEATURE_NS,
      wfsUrl: MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
      wfsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
    })
  );
}

module.controller('MainController', MainController);

export default module;
