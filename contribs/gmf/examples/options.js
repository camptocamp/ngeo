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

import './vars.scss';

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
const GMF_DEMO = 'https://geomapfish-demo-2-7.camptocamp.com/';

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
const GMF_LAYERS = `${GMF_DEMO}layers`;

/**
 * Base url for the GeoMapFish demo server.
 * @type {string}
 */
const GMF_THEMES = `${GMF_DEMO}themes?version=2&background=background`;

/**
 * Base url for the GeoMapFish demo vector tiles.
 * @type {string}
 */
const GMF_VECTOR_TILES = `${GMF_DEMO}/vector_tiles`;

/**
 * WFS feature namespace for MapServer
 * @type {string}
 */
const MAPSERVER_WFS_FEATURE_NS = 'http://mapserver.gis.umn.edu/mapserver';

/**
 * MapServer proxy
 * @type {string}
 */
export const MAPSERVER_PROXY = `${GMF_DEMO}mapserv_proxy?ogcserver=Main+PNG`;

/**
 * MapServer proxy
 * @type {string}
 */
const PRINT_PROXY = `${GMF_DEMO}printproxy`;

/**
 * Search service
 * @type {string}
 */
const PROFILE = `${GMF_DEMO}profile.json`;

/**
 * Search service
 * @type {string}
 */
const RASTER = `${GMF_DEMO}raster`;

/**
 * Search service
 * @type {string}
 */
export const SEARCH = `${GMF_DEMO}search`;

/**
 * Search service
 * @type {string}
 */
const SHORT_CREATE = `${GMF_DEMO}short/create`;

/**
 * @param {angular.IModule} module
 */
export default function (module) {
  module.constant('defaultTheme', 'Demo');
  module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
  module.constant('cacheVersion', '0');

  module.constant('gmfTreeUrl', GMF_THEMES);
  module.constant('gmfVectorTilesUrl', GMF_VECTOR_TILES);
  module.constant('authenticationBaseUrl', GMF_DEMO);
  module.constant('gmfLayersUrl', GMF_LAYERS);
  module.constant('gmfPrintUrl', PRINT_PROXY);
  module.constant('fulltextsearchUrl', `${SEARCH}?limit=30&partitionlimit=5&interface=desktop`);
  module.constant('gmfRasterUrl', RASTER);
  module.constant('gmfProfileJsonUrl', PROFILE);
  module.constant('ngeoPermalinkOgcserverUrl', MAPSERVER_PROXY);
  module.constant('gmfShortenerCreateUrl', SHORT_CREATE);

  module.constant('gmfAuthenticationNoReloadRole', null);
  module.constant('gmfTreeManagerModeFlush', true);
  module.constant('gmfTwoFactorAuth', false);
  module.constant('ngeoMeasureDecimals', 2);
  module.constant('ngeoMeasurePrecision', 3);
  module.constant('ngeoMeasureSpherical', false);
  module.constant('ngeoPointfilter', null);
  module.constant('ngeoSnappingTolerance', 0);
  module.constant('ngeoCsvEncoding', 'utf-8');
  module.constant('ngeoCsvExtension', '.csv');
  module.constant('ngeoCsvIncludeHeader', true);
  module.constant('ngeoCsvQuote', '"');
  module.constant('ngeoCsvSeparator', ',');
  module.constant('gmfCsvFilename', 'query-results.csv');
  module.constant('ngeoTilesPreloadingLimit', 0);

  module.constant('gmfVectorTilesOptions', {});
  module.constant('gmfAuthenticationConfig', {});
  module.constant('gmfSnappingConfig', {});
  module.constant('gmfThemesOptions', {});
  module.constant('gmfContextualDataOptions', {});
  module.constant('gmfPrintOptions', {});
  module.constant('gmfBackgroundLayerSelectorOptions', {});
  module.constant('gmfDisclaimerOptions', {});
  module.constant('gmfDisplayQueryWindowOptions', {});
  module.constant('ngeoProfileOptions', {});
  module.constant('gmfProfileOptions', {});
  module.constant('gmfLayerTreeOptions', {});

  module.constant('ngeoQueryOptions', {
    'limit': 20,
  });
  module.constant('gmfObjectEditingToolsOptions', {
    regularPolygonRadius: 150,
  });
  module.constant('gmfPermalinkOptions', {
    crosshairStyle: {
      regularShape: {
        stroke: {
          color: 'rgba(0, 0, 255, 1)',
          width: 2,
        },
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0,
      },
    },
  });
  module.constant('gmfExternalOGCServers', [
    {
      'name': 'Swiss Topo WMS',
      'type': 'WMS',
      'url': 'https://wms.geo.admin.ch/?lang=fr',
    },
    {
      'name': 'ASIT VD',
      'type': 'WMTS',
      'url': 'https://ows.asitvd.ch/wmts/1.0.0/WMTSCapabilities.xml',
    },
    {
      'name': 'Swiss Topo WMTS',
      'type': 'WMTS',
      'url': 'https://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml?lang=fr',
    },
  ]);
  module.constant('ngeoWfsPermalinkOptions', {
    wfsTypes: [
      {featureType: 'fuel', label: 'display_name'},
      {featureType: 'osm_scale', label: 'display_name'},
    ],
    defaultFeatureNS: MAPSERVER_WFS_FEATURE_NS,
    defaultFeaturePrefix: 'feature',
  });
}
