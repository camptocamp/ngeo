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
import gmfThemeThemes, {getFlatNodes} from 'gmf/theme/Themes';
import {WMSInfoFormat} from 'ngeo/datasource/OGC';
import olFormatWMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';
import olSourceImageWMS from 'ol/source/ImageWMS';

/**
 * A service that collects all queryable layer nodes from all themes, stores
 * them and use them to make WMS GetFeatureInfo queries. Queries can be made
 * regardless of the associated layer visibility. The layer nodes are also
 * loaded only once.
 *
 * @param {angular.IHttpService} $http Angular $http service.
 * @param {angular.IQService} $q Angular $q service.
 * @param {import('gmf/theme/Themes').ThemesService} gmfThemes The gmf themes service.
 * @class
 * @ngInject
 * @hidden
 */
export function ObjectEditingQuery($http, $q, gmfThemes) {
  /**
   * @type {angular.IHttpService}
   */
  this.http_ = $http;

  /**
   * @type {angular.IQService}
   */
  this.q_ = $q;

  /**
   * @type {import('gmf/theme/Themes').ThemesService}
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {?angular.IDeferred<import('./toolsComponent').ObjectEditingQueryableLayerInfo[]>}
   */
  this.getQueryableLayerNodesDefered_ = null;
}

/**
 * @return {angular.IPromise<import('./toolsComponent').ObjectEditingQueryableLayerInfo[]>} Promise.
 */
ObjectEditingQuery.prototype.getQueryableLayersInfo = function () {
  if (!this.getQueryableLayerNodesDefered_) {
    this.getQueryableLayerNodesDefered_ = this.q_.defer();
    this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
      this.gmfThemes_.getThemesObject().then((themes) => {
        if (!themes) {
          return;
        }
        if (!this.getQueryableLayerNodesDefered_) {
          throw new Error('Missing getQueryableLayerNodesDefered');
        }

        // Get all queryable nodes
        const allQueryableLayersInfo = getQueryableLayersInfoFromThemes(themes, ogcServers);

        // Narrow down to only those that have the 'copyable' metadata set
        const queryableLayersInfo = [];
        for (let i = 0, ii = allQueryableLayersInfo.length; i < ii; i++) {
          if (allQueryableLayersInfo[i].layerNode.metadata.copyable) {
            queryableLayersInfo.push(allQueryableLayersInfo[i]);
          }
        }

        this.getQueryableLayerNodesDefered_.resolve(queryableLayersInfo);
      });
    });
  }

  return this.getQueryableLayerNodesDefered_.promise;
};

/**
 * From a list of theme nodes, collect all WMS layer nodes that are queryable.
 * A list of OGC servers is given in order to bind each queryable layer node
 * to its associated server and be able to build requests.
 *
 * @param {import('gmf/themes').GmfTheme[]} themes List of theme nodes.
 * @param {import('gmf/themes').GmfOgcServers} ogcServers List of ogc servers
 * @return {import('gmf/objectediting/toolsComponent').ObjectEditingQueryableLayerInfo[]} List of
 *     queryable layers information.
 * @private
 * @hidden
 */
function getQueryableLayersInfoFromThemes(themes, ogcServers) {
  const queryableLayersInfo = [];

  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];

      // Skip groups that don't have an ogcServer set
      if (!group.ogcServer) {
        continue;
      }

      /** @type {import('gmf/themes').GmfLayer[]} */
      const nodes = [];
      getFlatNodes(group, nodes);

      for (let k = 0, kk = nodes.length; k < kk; k++) {
        const nodeWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (nodes[k]));

        if (nodeWMS.childLayers && nodeWMS.childLayers[0] && nodeWMS.childLayers[0].queryable) {
          queryableLayersInfo.push({
            layerNode: nodeWMS,
            ogcServer: ogcServers[group.ogcServer],
          });
        }
      }
    }
  }

  return queryableLayersInfo;
}

/**
 * From a queryable layer (WMS layer node), use its associated OGC server
 * to issue a single WMS GetFeatureInfo request at a specific location on a
 * specific map to fetch a single feature. If no feature is found, a `null`
 * value is returned.
 *
 * @param {import('gmf/objectediting/toolsComponent').ObjectEditingQueryableLayerInfo} layerInfo
 *    Queryable layer information.
 * @param {import('ol/coordinate').Coordinate} coordinate Coordinate.
 * @param {import('ol/Map').default} map Map.
 * @return {angular.IPromise<?import('ol/Feature').default<import('ol/geom/Geometry').default>>} Promise.
 */
ObjectEditingQuery.prototype.getFeatureInfo = function (layerInfo, coordinate, map) {
  const view = map.getView();
  const projCode = view.getProjection().getCode();
  const resolution = view.getResolution();
  const infoFormat = WMSInfoFormat.GML;
  const layerNode = layerInfo.layerNode;
  const layersParam = layerNode.layers.split(',');
  const ogcServer = layerInfo.ogcServer;
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }

  const format = new olFormatWMSGetFeatureInfo({
    layers: layersParam,
  });

  const wmsSource = new olSourceImageWMS({
    url: ogcServer.url,
    params: {
      layers: layersParam,
    },
  });

  const url = /** @type {string} */ (
    wmsSource.getFeatureInfoUrl(coordinate, resolution, projCode, {
      'INFO_FORMAT': infoFormat,
      'FEATURE_COUNT': 1,
      'QUERY_LAYERS': layersParam,
    })
  );

  return this.http_.get(url).then((response) => {
    const features = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */ (
      format.readFeatures(response.data)
    );
    return features && features[0] ? features[0] : null;
  });
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfObjectEditingQuery', [gmfThemeThemes.name]);
myModule.service('gmfObjectEditingQuery', ObjectEditingQuery);

export default myModule;
