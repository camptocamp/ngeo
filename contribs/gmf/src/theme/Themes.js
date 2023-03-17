import angular from 'angular';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olArray from 'ol/array.js';
import olCollection from 'ol/Collection.js';
import olEventsEventTarget from 'ol/events/Target.js';
import olLayerTile from 'ol/layer/Tile.js';

/**
 * Configuration options for the themes service.
 * @typedef {Object} ThemesOptions
 * @property {boolean} [addBlankBackgroundLayer] Whether to add a blank background layer to the list of
 *    available backgrounds.
 */

/**
 * The Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 * @hidden
 */
export class ThemesService extends olEventsEventTarget {
  /**
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.IQService} $q Angular q service
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {ThemesOptions} gmfThemesOptions Themes options.
   * @ngInject
   */
  constructor($http, $injector, $q, ngeoLayerHelper, gettextCatalog, gmfThemesOptions) {
    super();

    /**
     * @type {boolean}
     * @private
     */
    this.addBlankBackgroundLayer_ = true;
    if (gmfThemesOptions.addBlankBackgroundLayer !== undefined) {
      this.addBlankBackgroundLayer_ = gmfThemesOptions.addBlankBackgroundLayer;
    }

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {angular.IHttpService}
     * @private
     */
    this.$http_ = $http;

    /**
     * @type {string|undefined}
     * @private
     */
    this.treeUrl_ = undefined;
    if ($injector.has('gmfTreeUrl')) {
      this.treeUrl_ = $injector.get('gmfTreeUrl');
    }

    /**
     * @type {?import("ngeo/statemanager/Location.js").StatemanagerLocation}
     * @private
     */
    this.ngeoLocation_ = null;
    if ($injector.has('ngeoLocation')) {
      this.ngeoLocation_ = $injector.get('ngeoLocation');
    }

    /**
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
     * @private
     */
    this.layerHelper_ = ngeoLayerHelper;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog = gettextCatalog;

    /**
     * @type {angular.IDeferred}
     * @private
     */
    this.deferred_ = $q.defer();

    /**
     * @type {angular.IPromise}
     * @private
     */
    this.promise_ = this.deferred_.promise;

    /**
     * @type {boolean}
     */
    this.loaded = false;

    /**
     * @type {angular.IPromise}
     * @private
     */
    this.bgLayerPromise_ = null;
  }

  /**
   * Get background layers.
   * @return {!angular.IPromise.<!Array.<!import("ol/layer/Base.js").default>>} Promise.
   */
  getBgLayers() {
    const gettextCatalog = this.gettextCatalog;
    if (this.bgLayerPromise_) {
      return this.bgLayerPromise_;
    }
    const $q = this.$q_;
    const layerHelper = this.layerHelper_;

    /**
     * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} item A group or a leaf.
     * @param {Array.<string>} array Array of ids;
     */
    const getIds = function (item, array) {
      array.push(olUtilGetUid(item));
      // @ts-ignore: children only on GmfGroup
      const children = item.children || [];
      children.forEach((child) => {
        getIds(child, array);
      });
    };

    /**
     * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} item The item.
     * @param {import("ol/layer/Base.js").default} layer The layer.
     * @return {import("ol/layer/Base.js").default} the provided layer.
     */
    const callback = function (item, layer) {
      layer.set('label', item.name);
      layer.set('metadata', item.metadata);
      layer.set('dimensions', item.dimensions);
      const ids = [];
      getIds(item, ids);
      layer.set('querySourceIds', ids);
      return layer;
    };

    /**
     * @param {import('gmf/themes.js').GmfOgcServers} ogcServers The ogc servers.
     * @param {import('gmf/themes.js').GmfLayer} gmfLayer The item.
     * @return {angular.IPromise.<import("ol/layer/Base.js").default>|import("ol/layer/Base.js").default}
     *    The created layer.
     */
    const layerLayerCreationFn = function (ogcServers, gmfLayer) {
      if (gmfLayer.type === 'WMTS') {
        const gmfLayerWMTS = /** @type import('gmf/themes.js').GmfLayerWMTS */ (gmfLayer);
        console.assert(gmfLayerWMTS.url, 'Layer URL is required');
        return layerHelper
          .createWMTSLayerFromCapabilitites(
            gmfLayerWMTS.url,
            gmfLayerWMTS.layer || '',
            gmfLayerWMTS.matrixSet,
            gmfLayer.dimensions,
            gmfLayerWMTS.metadata['customOpenLayersOptions']
          )
          .then(callback.bind(null, gmfLayer))
          .then(null, (response) => {
            let message =
              `Unable to build layer "${gmfLayerWMTS.layer}" ` +
              `from WMTSCapabilities: ${gmfLayerWMTS.url}\n`;
            message += `OpenLayers error is "${response['message']}`;
            console.error(message);
            // Continue even if some layers have failed loading.
            return $q.resolve(undefined);
          });
      } else if (gmfLayer.type === 'WMS') {
        const gmfLayerWMS = /** @type import('gmf/themes.js').GmfLayerWMS */ (gmfLayer);
        console.assert(gmfLayerWMS.ogcServer, 'An OGC server is required');
        const server = ogcServers[gmfLayerWMS.ogcServer];
        console.assert(server, 'The OGC server was not found');
        console.assert(server.url, 'The server URL is required');
        console.assert(server.imageType, 'The server image type is required');

        // Manage WMS styles
        const opt_params = {STYLES: gmfLayerWMS.style};
        if (gmfLayer.dimensions) {
          for (const [key, value] of Object.entries(gmfLayer.dimensions)) {
            opt_params[key] = value;
          }
        }

        return callback(
          gmfLayer,
          layerHelper.createBasicWMSLayer(
            server.url,
            gmfLayerWMS.layers || '',
            server.imageType,
            server.type,
            undefined, // time
            opt_params,
            server.credential ? 'use-credentials' : 'anonymous',
            gmfLayerWMS.metadata['customOpenLayersOptions']
          )
        );
      }
      console.assert(false, `Unsupported type: ${gmfLayer.type}`);
    };

    /**
     * @param {import('gmf/themes.js').GmfOgcServers} ogcServers The ogc servers.
     * @param {import('gmf/themes.js').GmfGroup} item The item.
     * @return {angular.IPromise.<import("ol/layer/Group.js").default>} the created layer.
     */
    const layerGroupCreationFn = function (ogcServers, item) {
      // We assume no child is a layer group.
      // The order of insertion in OL3 is the contrary of the theme
      const orderedChildren = item.children.map((x) => x).reverse();
      const promises = orderedChildren.map(layerLayerCreationFn.bind(null, ogcServers));
      return $q.all(promises).then((layers) => {
        let collection;
        if (layers) {
          layers = layers.filter((l) => l);
          collection = new olCollection(layers);
        }
        const group = layerHelper.createBasicGroup(collection);
        callback(item, group);
        return group;
      });
    };

    /**
     * @param {import('gmf/themes.js').GmfThemesResponse} data The "themes" web service
     *     response.
     * @return {angular.IPromise.<Array.<import("ol/layer/Base.js").default>>} Promise.
     */
    const promiseSuccessFn = function (data) {
      const promises = data.background_layers.map((item) => {
        const itemType = item.type;
        if (itemType === 'WMTS' || itemType === 'WMS') {
          return layerLayerCreationFn(data.ogcServers, item);
        } else if (item.children) {
          // group of layers
          return layerGroupCreationFn(data.ogcServers, item);
        } else {
          return undefined;
        }
      }, this);
      return $q.all(promises);
    }.bind(this);

    this.bgLayerPromise_ = this.promise_.then(promiseSuccessFn).then((values) => {
      const layers = [];

      // (1) add a blank layer
      if (this.addBlankBackgroundLayer_) {
        // For i18n string collection
        gettextCatalog.getString('blank');
        const layer = new olLayerTile();
        layer.set('label', 'blank');
        layer.set('metadata', {thumbnail: ''});
        layers.push(layer);
      }

      // (2) add layers that were returned
      values.forEach((layer) => {
        if (layer) {
          layers.push(layer);
        }
      });
      return layers;
    });

    return this.bgLayerPromise_;
  }

  /**
   * Get a theme object by its name.
   * @param {string} themeName Theme name.
   * @return {angular.IPromise.<import('gmf/themes.js').GmfTheme>} Promise.
   */
  getThemeObject(themeName) {
    return this.promise_.then(
      /**
       * @param {import('gmf/themes.js').GmfThemesResponse} data The "themes" web service
       *     response.
       * @return {import('gmf/themes.js').GmfTheme?} The theme object for themeName, or null
       *     if not found.
       */
      (data) => findThemeByName(data.themes, themeName)
    );
  }

  /**
   * Get an array of theme objects.
   * @return {angular.IPromise.<!Array.<!import('gmf/themes.js').GmfTheme>>} Promise.
   */
  getThemesObject() {
    return this.promise_.then(
      /**
       * @param {!import('gmf/themes.js').GmfThemesResponse} data The "themes" web service response.
       * @return {!Array.<!import('gmf/themes.js').GmfTheme>} The themes object.
       */
      (data) => data.themes
    );
  }

  /**
   * Get an array of background layer objects.
   * @return {angular.IPromise.<!Array.<!import('gmf/themes.js').GmfLayer>>} Promise.
   */
  getBackgroundLayersObject() {
    console.assert(this.promise_ !== null);
    return this.promise_.then((data) => data.background_layers);
  }

  /**
   * Get the `ogcServers` object.
   * @return {angular.IPromise.<!import('gmf/themes.js').GmfOgcServers>} Promise.
   */
  getOgcServersObject() {
    console.assert(this.promise_ !== null);
    return this.promise_.then(
      /**
       * @param {import('gmf/themes.js').GmfThemesResponse} data The "themes" web service response.
       * @return {import('gmf/themes.js').GmfOgcServers} The `ogcServers` object.
       */
      (data) => data.ogcServers
    );
  }

  /**
   * Returns a promise to check if one of the layers in the themes is editable.
   * @return {angular.IPromise.<boolean>} Promise.
   */
  hasEditableLayers() {
    console.assert(this.promise_ !== null);
    return this.promise_.then(this.hasEditableLayers_.bind(this));
  }

  /**
   * Returns if one of the layers in the themes is editable.
   * @param {import('gmf/themes.js').GmfThemesResponse} data The "themes" web service response.
   * @return {boolean} Editable layers?
   */
  hasEditableLayers_(data) {
    return data.themes.some((theme) => {
      const hasEditableLayers = theme.children.some(this.hasNodeEditableLayers_.bind(this));
      return hasEditableLayers;
    });
  }

  /**
   * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node Theme node
   * @return {boolean} Editable layers?
   */
  hasNodeEditableLayers_(node) {
    // @ts-ignore: children only on GmfLayer
    if (node.editable) {
      return true;
    }

    let hasEditableLayers = false;
    // @ts-ignore: children only on GmfGroup
    const children = node.children;
    if (children && children.length) {
      hasEditableLayers = children.some(this.hasNodeEditableLayers_.bind(this));
    }
    return hasEditableLayers;
  }

  /**
   * @param {string=} opt_roleId The role id to send in the request.
   * Load themes from the "themes" service.
   */
  loadThemes(opt_roleId) {
    console.assert(this.treeUrl_, 'gmfTreeUrl should be defined.');

    if (this.loaded) {
      // reload the themes
      this.deferred_ = this.$q_.defer();
      this.promise_ = this.deferred_.promise;
      this.bgLayerPromise_ = null;
      this.loaded = false;
    }

    this.$http_
      .get(this.treeUrl_, {
        params:
          opt_roleId !== undefined
            ? {
                'role': opt_roleId,
              }
            : {},
        cache: false,
        withCredentials: true,
      })
      .then(
        (response) => {
          if (response.data.errors.length != 0) {
            const message = `The themes contain some errors:\n${response.data.errors.join('\n')}`;
            console.error(message);
            if (this.ngeoLocation_ !== null && this.ngeoLocation_.hasParam('debug')) {
              window.alert(message);
            }
          }

          // set default values
          Object.values(response.data.ogcServers).forEach((server) => {
            server.geometryName = server.geometryName || 'geometry';
          });

          this.deferred_.resolve(response.data);
          this.dispatchEvent('change');
          this.loaded = true;
        },
        (response) => {
          this.deferred_.reject(response);
        }
      );
  }
}

/**
 * @param {Array.<import('gmf/themes.js').GmfTheme>} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @return {import('gmf/themes.js').GmfGroup} The group.
 * @hidden
 */
export function findGroupByLayerNodeName(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      const childNodes = [];
      getFlatNodes(group, childNodes);
      if (findObjectByName(childNodes, name)) {
        return group;
      }
    }
  }
  return null;
}

/**
 * Find a layer group object by its name. Return null if not found.
 * @param {Array.<import('gmf/themes.js').GmfTheme>} themes Array of "theme" objects.
 * @param {string} name The group name.
 * @return {import('gmf/themes.js').GmfGroup} The group.
 * @hidden
 */
export function findGroupByName(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      const internalNodes = [];
      getFlatInternalNodes(group, internalNodes);
      if (findObjectByName(internalNodes, name)) {
        return group;
      }
    }
  }
  return null;
}

/**
 * Find an object by its name. Return null if not found.
 * @param {Array.<T>} objects Array of objects with a 'name' attribute.
 * @param {string} objectName The object name.
 * @return {T} The object or null.
 * @template T
 * @hidden
 */
export function findObjectByName(objects, objectName) {
  return olArray.find(objects, (object) => object['name'] === objectName);
}

/**
 * Find a theme object by its name. Return null if not found.
 * @param {Array.<import('gmf/themes.js').GmfTheme>} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @return {import('gmf/themes.js').GmfTheme} The theme object or null.
 * @hidden
 */
export function findThemeByName(themes, themeName) {
  return findObjectByName(themes, themeName);
}

/**
 * Fill the given "nodes" array with all internal nodes (non-leaf nones) in the given node.
 *
 * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node Layertree node.
 * @param {Array.<import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} nodes An array.
 * @private
 * @hidden
 */
function getFlatInternalNodes(node, nodes) {
  // @ts-ignore: children only on GmfGroup
  const children = node.children;
  if (children !== undefined) {
    nodes.push(node);
    for (let i = 0; i < children.length; i++) {
      getFlatInternalNodes(children[i], nodes);
    }
  }
}

/**
 * Fill the given "nodes" array with all leaf nodes in the given node.
 *
 * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer} node Layertree node.
 * @param {Array.<import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer>} nodes An array.
 * @hidden
 */
export function getFlatNodes(node, nodes) {
  // @ts-ignore: children only on GmfGroup
  const children = node.children;
  if (children !== undefined) {
    for (let i = 0; i < children.length; i++) {
      getFlatNodes(children[i], nodes);
    }
  } else {
    nodes.push(node);
  }
}

/**
 * Get the snapping configuration object from a Layertree controller
 * @param {import('gmf/themes.js').GmfLayer} node Layer node from the theme.
 * @return {?import('gmf/themes.js').GmfSnappingConfig} Snapping configuration, if found.
 * @hidden
 */
export function getSnappingConfig(node) {
  const config =
    node.metadata && node.metadata.snappingConfig !== undefined ? node.metadata.snappingConfig : null;
  return config;
}

/**
 * Get the maximal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a maxResolutionHint property can exist
 *     on the node).
 * @return {number|undefined} the max resolution or undefined if any.
 * @hidden
 */
export function getNodeMaxResolution(gmfLayer) {
  const metadata = gmfLayer.metadata;
  let maxResolution = gmfLayer.maxResolutionHint;
  if (maxResolution === undefined && metadata !== undefined) {
    maxResolution = metadata.maxResolution;
  }
  return maxResolution;
}

/**
 * Get the minimal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 * @param {import('gmf/themes.js').GmfLayerWMS} gmfLayer the GeoMapFish Layer. WMTS layer is
 *     also allowed (the type is defined as GmfLayerWMS only to avoid some
 *     useless tests to know if a minResolutionHint property can exist
 *     on the node).
 * @return {number|undefined} the min resolution or undefined if any.
 * @hidden
 */
export function getNodeMinResolution(gmfLayer) {
  const metadata = gmfLayer.metadata;
  let minResolution = gmfLayer.minResolutionHint;
  if (minResolution === undefined && metadata !== undefined) {
    minResolution = metadata.minResolution;
  }
  return minResolution;
}

/**
 * @enum {string}
 * @hidden
 */
export const ThemeNodeType = {
  MIXED_GROUP: 'MixedGroup',
  NOT_MIXED_GROUP: 'NotMixedGroup',
  WMTS: 'WMTS',
  WMS: 'WMS',
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('gmfThemes', [ngeoMapLayerHelper.name]);

module.value('gmfThemesOptions', {});
module.service('gmfThemes', ThemesService);

export default module;
