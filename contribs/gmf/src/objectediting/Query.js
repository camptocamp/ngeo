/**
 * @module gmf.objectediting.Query
 */
import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';
import olFormatWMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';

/**
 * A service that collects all queryable layer nodes from all themes, stores
 * them and use them to make WMS GetFeatureInfo queries. Queries can be made
 * regardless of the associated layer visibility. The layer nodes are also
 * loaded only once.
 *
 * @param {angular.$http} $http Angular $http service.
 * @param {angular.$q} $q Angular $q service.
 * @param {gmf.theme.Themes} gmfThemes The gmf themes service.
 * @constructor
 * @struct
 * @ngInject
 */
const exports = function($http, $q, gmfThemes) {

  /**
   * @type {angular.$http}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {angular.$q}
   * @private
   */
  this.q_ = $q;

  /**
   * @type {gmf.theme.Themes}
   * @private
   */
  this.gmfThemes_ = gmfThemes;

  /**
   * @type {?angular.$q.Deferred}
   * @private
   */
  this.getQueryableLayerNodesDefered_ = null;

};


/**
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.getQueryableLayersInfo = function() {

  if (!this.getQueryableLayerNodesDefered_) {
    this.getQueryableLayerNodesDefered_ = this.q_.defer();
    this.gmfThemes_.getOgcServersObject().then((ogcServers) => {
      this.gmfThemes_.getThemesObject().then((themes) => {
        if (!themes) {
          return;
        }

        // Get all queryable nodes
        const allQueryableLayersInfo =
            exports.getQueryableLayersInfoFromThemes(
              themes,
              ogcServers
            );

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
 * @param {Array.<gmfThemes.GmfTheme>} themes List of theme nodes.
 * @param {gmfThemes.GmfOgcServers} ogcServers List of ogc servers
 * @return {Array.<gmfx.ObjectEditingQueryableLayerInfo>} List of
 *     queryable layers information.
 * @export
 */
exports.getQueryableLayersInfoFromThemes = function(
  themes, ogcServers
) {
  const queryableLayersInfo = [];
  let theme;
  let group;
  let nodes;
  let node;

  for (let i = 0, ii = themes.length; i < ii; i++) {
    theme = /** @type {gmfThemes.GmfTheme} */ (themes[i]);
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      group = /** @type {gmfThemes.GmfGroup} */ (theme.children[j]);

      // Skip groups that don't have an ogcServer set
      if (!group.ogcServer) {
        continue;
      }

      nodes = [];
      gmfThemeThemes.getFlatNodes(group, nodes);

      for (let k = 0, kk = nodes.length; k < kk; k++) {
        node = /** @type {gmfThemes.GmfGroup|gmfThemes.GmfLayerWMS} */ (
          nodes[k]);

        // Skip groups within groups
        if (node.children && node.children.length) {
          continue;
        }

        if (node.childLayers &&
          node.childLayers[0] &&
          node.childLayers[0].queryable
        ) {
          queryableLayersInfo.push({
            layerNode: node,
            ogcServer: ogcServers[group.ogcServer]
          });
        }
      }
    }
  }

  return queryableLayersInfo;
};


/**
 * From a queryable layer (WMS layer node), use its associated OGC server
 * to issue a single WMS GetFeatureInfo request at a specific location on a
 * specific map to fetch a single feature. If no feature is found, a `null`
 * value is returned.
 *
 * @param {gmfx.ObjectEditingQueryableLayerInfo} layerInfo Queryable layer
 *     information.
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {ol.Map} map Map.
 * @return {angular.$q.Promise} Promise.
 * @export
 */
exports.prototype.getFeatureInfo = function(layerInfo, coordinate, map) {
  const view = map.getView();
  const projCode = view.getProjection().getCode();
  const resolution = /** @type {number} */(view.getResolution());
  const infoFormat = ngeoDatasourceOGC.WMSInfoFormat.GML;
  const layerNode = layerInfo.layerNode;
  const layersParam = layerNode.layers.split(',');
  const ogcServer = layerInfo.ogcServer;

  const format = new olFormatWMSGetFeatureInfo({
    layers: layersParam
  });

  const wmsSource = new olSourceImageWMS({
    url: ogcServer.url,
    params: {
      layers: layersParam
    }
  });

  const url = /** @type {string} */ (
    wmsSource.getGetFeatureInfoUrl(coordinate, resolution, projCode, {
      'INFO_FORMAT': infoFormat,
      'FEATURE_COUNT': 1,
      'QUERY_LAYERS': layersParam
    })
  );

  return this.http_.get(url).then(
    (response) => {
      const features = format.readFeatures(response.data);
      return (features && features[0]) ? features[0] : null;
    }
  );
};


/**
 * @type {!angular.Module}
 */
exports.module = angular.module('gmfObjectEditingQuery', [
  gmfThemeThemes.module.name,
]);
exports.module.service('gmfObjectEditingQuery', exports);


export default exports;
