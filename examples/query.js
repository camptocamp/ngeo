// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import {MAPSERVER_PROXY, MAPSERVER_WFS_FEATURE_NS} from './url.js';
import './base.css';
import './query.css';
import EPSG2056 from '@geoblocks/proj/EPSG_2056.js';

import ngeoDatasourceDataSources from 'ngeo/datasource/DataSources.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import ngeoMapModule from 'ngeo/map/module.js';

import ngeoMiscBtnComponent from 'ngeo/misc/btnComponent.js';

import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoQueryComponent from 'ngeo/query/component.js';
import ngeoQueryPanelComponent from 'ngeo/query/panelComponent.js';
import ngeoQueryModule from 'ngeo/query/module.js';

import olMap from 'ol/Map.js';
import olView from 'ol/View.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olSourceOSM from 'ol/source/OSM.js';

/** @type {angular.IModule} **/
const module = angular.module('app', [
  'gettext',
  ngeoDatasourceDataSources.name,
  ngeoMapModule.name,
  ngeoMiscBtnComponent.name,
  ngeoMiscToolActivateMgr.name,
  ngeoQueryComponent.name,
  ngeoQueryPanelComponent.name,
  ngeoQueryModule.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/queryresult', require('./partials/queryresult.html'));
  }
);

module.value('ngeoQueryOptions', {
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
 * @param {import("ngeo/datasource/DataSources.js").DataSource} ngeoDataSources Ngeo data sources service.
 * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @param {import("ngeo/query/ModeSelector.js").QueryModeSelector} ngeoQueryModeSelector The ngeo QueryModeSelector service

 * @constructor
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
   * @type {import("ngeo/query/ModeSelector.js").QueryModeSelector}
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
      projection: EPSG2056,
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2536660, 1153009],
      zoom: 4,
    }),
  });

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(
    new ngeoDatasourceOGC({
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
    new ngeoDatasourceOGC({
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
 * @return {boolean|undefined} Value.
 */
MainController.prototype.getSetQueryActive = function (val) {
  if (val !== undefined) {
    this.queryActive = val;
  } else {
    return this.queryActive;
  }
};

module.controller('MainController', MainController);
module.constant('ngeoMeasurePrecision', 0);
module.constant('ngeoMeasureDecimals', 0);
module.constant('ngeoMeasureSpherical', false);
module.constant('ngeoPointfilter', null);

export default module;
