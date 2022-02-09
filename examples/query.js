// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {MAPSERVER_PROXY, MAPSERVER_WFS_FEATURE_NS} from './url';
import './base.css';
import './query.css';
import EPSG2056 from 'ngeo/proj/EPSG_2056';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources';
import gmfDatasourceOGC from 'gmf/datasource/OGC';
import gmfMapComponent from 'gmf/map/component';
import options from './options';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import ngeoQueryComponent from 'ngeo/query/component';
import ngeoQueryPanelComponent from 'ngeo/query/panelComponent';
import ngeoQueryModule from 'ngeo/query/module';

import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerImage from 'ol/layer/Image';
import olLayerTile from 'ol/layer/Tile';
import olSourceImageWMS from 'ol/source/ImageWMS';
import olSourceOSM from 'ol/source/OSM';

/** @type {angular.IModule} **/
const myModule = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.name,
  gmfMapComponent.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
  ngeoQueryComponent.name,
  ngeoQueryPanelComponent.name,
  ngeoQueryModule.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/queryresult', require('./partials/queryresult.html'));
  }
);

myModule.value('ngeoQueryOptions', {
  'cursorHover': true,
  'limit': 20,
});

/**
 * A sample component to display the result.
 *
 * @type {angular.IComponentOptions}
 */
const queryresultComponent = {
  controller: 'AppQueryresultController',
  templateUrl: 'partials/queryresult',
};

myModule.component('appQueryresult', queryresultComponent);

/**
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult The ngeo query service.
 * @class
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.result = ngeoQueryResult;
}

myModule.controller('AppQueryresultController', QueryresultController);

/**
 * @param {import('ngeo/datasource/DataSources').DataSource} ngeoDataSources Ngeo data sources service.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @param {import('ngeo/query/ModeSelector').QueryModeSelector} ngeoQueryModeSelector The ngeo QueryModeSelector service
 * @class
 * @ngInject
 */
function MainController(ngeoDataSources, ngeoToolActivateMgr, ngeoQueryModeSelector) {
  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  /**
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {boolean}
   */
  this.queryAutoClear = true;

  /**
   * @type {import('ngeo/query/ModeSelector').QueryModeSelector}
   */
  this.ngeoQueryModeSelector = ngeoQueryModeSelector;

  const source1 = new olSourceImageWMS({
    url: MAPSERVER_PROXY,
    params: {'LAYERS': 'bus_stop'},
  });
  const busStopLayer = new olLayerImage({
    source: source1,
  });

  const source2 = new olSourceImageWMS({
    url: MAPSERVER_PROXY,
    params: {'LAYERS': 'information'},
  });
  const informationLayer = new olLayerImage({
    source: source2,
  });

  /**
   * @type {import('ol/Map').default}
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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2536660, 1153009],
      zoom: 4,
    }),
  });

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(
    new gmfDatasourceOGC({
      id: 1,
      name: 'bus_stop',
      visible: true,
      wmsUrl: MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
      wfsUrl: MAPSERVER_PROXY,
      wfsFeatureNS: MAPSERVER_WFS_FEATURE_NS,
      wfsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
    })
  );

  ngeoDataSources.collection.push(
    new gmfDatasourceOGC({
      id: 2,
      name: 'information',
      visible: true,
      wmsUrl: MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
      wfsFeatureNS: MAPSERVER_WFS_FEATURE_NS,
      wfsUrl: MAPSERVER_PROXY,
      wfsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
    })
  );

  const queryToolActivate = new ngeoMiscToolActivate(this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate);

  const dummyToolActivate = new ngeoMiscToolActivate(this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

/**
 * @param {boolean|undefined} val Value.
 * @returns {boolean|undefined} Value.
 */
MainController.prototype.getSetQueryActive = function (val) {
  if (val !== undefined) {
    this.queryActive = val;
  } else {
    return this.queryActive;
  }
};

myModule.controller('MainController', MainController);
myModule.constant('ngeoMeasurePrecision', 0);
myModule.constant('ngeoMeasureDecimals', 0);
myModule.constant('ngeoMeasureSpherical', false);
myModule.constant('ngeoPointfilter', null);
options(myModule);

export default myModule;
