// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
import ngeoMapLayerHelper, {DATASOURCE_ID} from 'ngeo/map/LayerHelper';
import {getUid as olUtilGetUid} from 'ol/util';
import * as olArray from 'ol/array';
import olCollection from 'ol/Collection';
import olEventsEventTarget from 'ol/events/Target';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import olTileGridTileGrid from 'ol/tilegrid/TileGrid.js';

/**
 * The Themes service. This service interacts
 * with c2cgeoportal's "themes" web service and exposes functions that return
 * objects in the tree returned by the "themes" web service.
 *
 * @hidden
 */
export class ThemesService extends olEventsEventTarget {
  /**
   * @param {angular.IHttpService} $http Angular http service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.IQService} $q Angular q service
   * @param {import('ngeo/map/LayerHelper').LayerHelper} ngeoLayerHelper Ngeo Layer Helper.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/options').gmfThemesOptions} gmfThemesOptions Themes options.
   * @param {string} gmfTreeUrl The tree URL.
   * @param {string} gmfVectorTilesUrl The Vector Tiles URL.
   * @param {import('gmf/options').gmfVectorTilesOptions} gmfVectorTilesOptions the VectorTiles options.
   * @ngInject
   */
  constructor(
    $http,
    $injector,
    $q,
    ngeoLayerHelper,
    gettextCatalog,
    gmfThemesOptions,
    gmfTreeUrl,
    gmfVectorTilesUrl,
    gmfVectorTilesOptions
  ) {
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
     * @type {string}
     * @private
     */
    this.treeUrl_ = gmfTreeUrl;

    /**
     * @type {string}
     * @private
     */
    this.gmfVectorTilesUrl_ = gmfVectorTilesUrl;

    /**
     * @type {import('gmf/options').gmfVectorTilesOptions}
     * @private
     */
    this.gmfVectorTilesOptions_ = gmfVectorTilesOptions;

    /**
     * @type {?import('ngeo/statemanager/Location').StatemanagerLocation}
     * @private
     */
    this.ngeoLocation_ = null;
    if ($injector.has('ngeoLocation')) {
      this.ngeoLocation_ = $injector.get('ngeoLocation');
    }

    /**
     * @type {import('ngeo/map/LayerHelper').LayerHelper}
     * @private
     */
    this.layerHelper_ = ngeoLayerHelper;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog = gettextCatalog;

    /**
     * @type {angular.IDeferred<never>}
     * @private
     */
    this.deferred_ = $q.defer();

    /**
     * @type {angular.IPromise<never>}
     * @private
     */
    this.promise_ = this.deferred_.promise;

    /**
     * @type {boolean}
     */
    this.loaded = false;

    /**
     * @type {?angular.IPromise<import('ol/layer/Base').default[]>}
     * @private
     */
    this.bgLayerPromise_ = null;
  }

  /**
   * Get background layers.
   *
   * @returns {angular.IPromise<import('ol/layer/Base').default[]>} Promise.
   */
  getBgLayers() {
    if (this.bgLayerPromise_) {
      return this.bgLayerPromise_;
    }

    this.bgLayerPromise_ = /** @type {angular.IPromise<import('ol/layer/Base').default[]>} */ (
      this.promise_.then(this.bgLayerPromiseSuccessFn_.bind(this)).then((values) => {
        /** @type {import('ol/layer/Base').default[]} */
        const layers = [];

        // (1) add a blank layer
        if (this.addBlankBackgroundLayer_) {
          const blankLayer = this.getBgBlankLayer_();
          layers.push(blankLayer);
        }

        // (2) add layers that were returned
        values.forEach((layer) => {
          if (layer) {
            layers.push(layer);
          }
        });
        return layers;
      })
    );

    return this.bgLayerPromise_;
  }

  /**
   * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} item A group or a leaf.
   * @param {string[]} array Array of ids;
   */
  getLayerGroupIds_(item, array) {
    array.push(olUtilGetUid(item));
    const groupItem = /** @type {import('gmf/themes').GmfGroup} */ (item);
    const children = groupItem.children || [];
    children.forEach((child) => {
      this.getLayerGroupIds_(child, array);
    });
  }

  /**
   * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} item The item.
   * @param {import('ol/layer/Base').default} layer The layer.
   * @returns {import('ol/layer/Base').default} the provided layer.
   */
  setLayerProperties_(item, layer) {
    layer.set('label', item.name);
    layer.set('metadata', item.metadata);
    layer.set('dimensions', item.dimensions);
    /** @type {string[]} */
    const ids = [];
    this.getLayerGroupIds_(item, ids);
    layer.set('querySourceIds', ids);
    layer.set(DATASOURCE_ID, item.id);
    return layer;
  }

  /**
   * @param {import('gmf/themes').GmfOgcServers} ogcServers The ogc servers.
   * @param {import('gmf/themes').GmfLayer} gmfLayer The item.
   * @returns {angular.IPromise<import('ol/layer/Base').default>|import('ol/layer/Base').default}
   *    The created layer.
   */
  layerLayerCreationFn_(ogcServers, gmfLayer) {
    if (gmfLayer.type === 'WMTS') {
      const gmfLayerWMTS = /** @type {import('gmf/themes').GmfLayerWMTS} */ (/** @type {any} */ (gmfLayer));
      return this.layerLayerWMTSCreationFn_(gmfLayerWMTS);
    }
    if (gmfLayer.type === 'WMS') {
      const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (/** @type {any} */ (gmfLayer));
      return this.layerLayerWMSCreationFn_(ogcServers, gmfLayerWMS);
    }
    if (gmfLayer.type === 'VectorTiles') {
      const gmfLayerVectorTiles = /** @type {import('gmf/themes').GmfLayerVectorTiles} */ (
        /** @type {any} */ (gmfLayer)
      );
      return this.layerLayerVectorTilesCreationFn_(gmfLayerVectorTiles);
    }
    throw `Unsupported type: ${gmfLayer.type}`;
  }

  /**
   * @param {import('gmf/themes').GmfLayerWMTS} gmfLayerWMTS
   * @returns {angular.IPromise<import('ol/layer/Base').default>} the new layer.
   */
  layerLayerWMTSCreationFn_(gmfLayerWMTS) {
    if (!gmfLayerWMTS.url) {
      throw 'Layer URL is required';
    }
    const minResolution = getNodeMinResolution(gmfLayerWMTS);
    const maxResolution = getNodeMaxResolution(gmfLayerWMTS);
    const layer = this.layerHelper_
      .createWMTSLayerFromCapabilitites(
        gmfLayerWMTS.url,
        gmfLayerWMTS.layer || '',
        gmfLayerWMTS.matrixSet,
        gmfLayerWMTS.layer.dimensions,
        gmfLayerWMTS.metadata.customOpenLayersOptions,
        minResolution,
        maxResolution,
        gmfLayerWMTS.metadata.opacity
      )
      .then(this.setLayerProperties_.bind(this, gmfLayerWMTS))
      .then(null, (response) => {
        let message =
          `Unable to build layer "${gmfLayerWMTS.layer}" ` + `from WMTSCapabilities: ${gmfLayerWMTS.url}\n`;
        message += `OpenLayers error is "${response.message}`;
        console.error(message);
        // Continue even if some layers have failed loading.
        return this.$q_.resolve(undefined);
      });
    return /** @type {angular.IPromise<import('ol/layer/Base').default>} */ layer;
  }

  /**
   * @param {import('gmf/themes').GmfOgcServers} ogcServers The ogc servers.
   * @param {import('gmf/themes').GmfLayerWMS} gmfLayerWMS
   * @returns {angular.IPromise<import('ol/layer/Base').default>} the new layer.
   */
  layerLayerWMSCreationFn_(ogcServers, gmfLayerWMS) {
    if (!gmfLayerWMS.ogcServer) {
      throw new Error('Missing gmfLayerWMS.ogcServer');
    }
    const server = ogcServers[gmfLayerWMS.ogcServer];
    if (!server) {
      throw new Error('Missing server');
    }
    if (!server.url) {
      throw new Error('Missing server.url');
    }
    if (!server.imageType) {
      throw new Error('Missing server.imageType');
    }

    // Manage WMS styles
    /** @type {Object<string, string>} */
    const opt_params = {STYLES: gmfLayerWMS.style};
    if (gmfLayerWMS.dimensions) {
      for (const [key, value] of Object.entries(gmfLayerWMS.dimensions)) {
        if (value !== null) {
          opt_params[key] = value;
        }
      }
    }

    return this.setLayerProperties_(
      gmfLayerWMS,
      this.layerHelper_.createBasicWMSLayer(
        server.url,
        gmfLayerWMS.layers || '',
        server.imageType,
        server.type,
        undefined, // time
        opt_params,
        server.credential ? 'use-credentials' : 'anonymous',
        gmfLayerWMS.metadata.customOpenLayersOptions
      )
    );
  }

  /**
   * @param {import('gmf/themes').GmfLayerVectorTiles} gmfLayerVectorTiles
   * @returns {angular.IPromise<import('ol/layer/Base').default>} the new VectorTiles layer.
   */
  layerLayerVectorTilesCreationFn_(gmfLayerVectorTiles) {
    const deferred = this.$q_.defer();
    const promise = deferred.promise;
    const layername = gmfLayerVectorTiles.name;
    const minResolution = getNodeMinResolution(gmfLayerVectorTiles);
    const maxResolution = getNodeMaxResolution(gmfLayerVectorTiles);
    const tileGridOptions = this.gmfVectorTilesOptions_.tileGrid;
    if (!tileGridOptions || !tileGridOptions.resolutions) {
      return null;
    }
    this.$http_.get(gmfLayerVectorTiles.style).then(
      (response) => {
        const url = `${this.gmfVectorTilesUrl_}/${layername}/{z}/{x}/{y}.pbf`;
        const tileGrid = new olTileGridTileGrid(this.gmfVectorTilesOptions_.tileGrid);
        const layer = this.layerHelper_.createBasicVectorTilesLayer(
          url,
          response.data,
          layername,
          this.gmfVectorTilesOptions_.projection,
          tileGrid,
          minResolution,
          maxResolution,
          gmfLayerVectorTiles.metadata.opacity
        );
        deferred.resolve(this.setLayerProperties_(gmfLayerVectorTiles, layer));
      },
      (response) => {
        deferred.reject(response);
      }
    );
    return promise;
  }

  /**
   * @param {import('gmf/themes').GmfOgcServers} ogcServers The ogc servers.
   * @param {import('gmf/themes').GmfGroup} item The item.
   * @returns {angular.IPromise<import('ol/layer/Base').default>} the created layer.
   */
  layerGroupCreationFn_(ogcServers, item) {
    // We assume no child is a layer group.
    // The order of insertion in OL3 is the contrary of the theme
    const orderedChildren = item.children.map((x) => x).reverse();
    const promises = orderedChildren.map((item) =>
      this.layerLayerCreationFn_(ogcServers, /** @type {import('gmf/themes').GmfLayer} */ (item))
    );
    return this.$q_.all(promises).then((layers) => {
      let collection;
      if (layers) {
        layers = layers.filter((l) => l);
        collection = new olCollection(layers);
      }
      const group = this.layerHelper_.createBasicGroup(collection);
      this.setLayerProperties_(item, group);
      return group;
    });
  }

  /**
   * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service
   *     response.
   * @returns {angular.IPromise<import('ol/layer/Base').default[]>} Promise.
   */
  bgLayerPromiseSuccessFn_(data) {
    const promises = /** @type {angular.IPromise<unknown>} */ (
      /** @type {*} */ (
        data.background_layers.map((item) => {
          const itemLayer = /** @type {import('gmf/themes').GmfLayer} */ (item);
          const itemGroup = /** @type {import('gmf/themes').GmfGroup} */ (item);
          if (['WMS', 'WMTS', 'VectorTiles'].includes(itemLayer.type)) {
            return this.layerLayerCreationFn_(data.ogcServers, itemLayer);
          } else if (itemGroup.children) {
            // group of layers
            return this.layerGroupCreationFn_(data.ogcServers, itemGroup);
          } else {
            return undefined;
          }
        })
      )
    );
    return /** @type {angular.IPromise<import('ol/layer/Base').default[]>} */ /** @type {*} */ this.$q_.all(
      promises
    );
  }

  /**
   * @returns {import('ol/layer/VectorLayer').default>}} a blank vector layer.
   */
  getBgBlankLayer_() {
    // For i18n string collection
    const gettextCatalog = this.gettextCatalog;
    gettextCatalog.getString('blank');
    const layer = new VectorLayer({
      source: new VectorSource(),
    });
    layer.set('label', 'blank');
    layer.set('metadata', {thumbnail: ''});
    return layer;
  }

  /**
   * Get a theme object by its name.
   *
   * @param {string} themeName Theme name.
   * @returns {angular.IPromise<?import('gmf/themes').GmfTheme>} Promise.
   */
  getThemeObject(themeName) {
    return this.promise_.then(
      /**
       * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service response.
       * @returns {?import('gmf/themes').GmfTheme} The theme object for themeName, or null if not found.
       */
      (data) => findThemeByName(data.themes, themeName)
    );
  }

  /**
   * Get an array of theme objects.
   *
   * @returns {angular.IPromise<import('gmf/themes').GmfTheme[]>} Promise.
   */
  getThemesObject() {
    return this.promise_.then(
      /**
       * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service response.
       * @returns {import('gmf/themes').GmfTheme[]} The themes object.
       */
      (data) => data.themes
    );
  }

  /**
   * Get an array of background layer objects.
   *
   * @returns {angular.IPromise<(import('gmf/themes').GmfLayer | import('gmf/themes').GmfGroup)[]>}
   *   Promise.
   */
  getBackgroundLayersObject() {
    if (this.promise_ === null) {
      throw new Error('Missing promise');
    }
    return this.promise_.then(
      /**
       * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service response.
       * @returns {(import('gmf/themes').GmfLayer | import('gmf/themes').GmfGroup)[]}
       *    The background layers object.
       */
      (data) => data.background_layers
    );
  }

  /**
   * Get the `ogcServers` object.
   *
   * @returns {angular.IPromise<import('gmf/themes').GmfOgcServers>} Promise.
   */
  getOgcServersObject() {
    if (this.promise_ === null) {
      throw new Error('Missing promise');
    }
    return this.promise_.then(
      /**
       * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service response.
       * @returns {import('gmf/themes').GmfOgcServers} The `ogcServers` object.
       */
      (data) => data.ogcServers
    );
  }

  /**
   * Returns a promise to check if one of the layers in the themes is editable.
   *
   * @returns {angular.IPromise<boolean>} Promise.
   */
  hasEditableLayers() {
    if (this.promise_ === null) {
      throw new Error('Missing promise');
    }
    return this.promise_.then(this.hasEditableLayers_.bind(this));
  }

  /**
   * Returns if one of the layers in the themes is editable.
   *
   * @param {import('gmf/themes').GmfThemesResponse} data The "themes" web service response.
   * @returns {boolean} Editable layers?
   */
  hasEditableLayers_(data) {
    return data.themes.some((theme) => {
      const hasEditableLayers = theme.children.some(this.hasNodeEditableLayers_.bind(this));
      return hasEditableLayers;
    });
  }

  /**
   * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node Theme node
   * @returns {boolean} Editable layers?
   */
  hasNodeEditableLayers_(node) {
    const gmfGroup = /** @type {import('gmf/themes').GmfGroup} */ (node);
    const gmfLayer = /** @type {import('gmf/themes').GmfLayer} */ (node);
    if (gmfLayer.editable) {
      return true;
    }

    let hasEditableLayers = false;
    const children = gmfGroup.children;
    if (children && children.length) {
      hasEditableLayers = children.some(this.hasNodeEditableLayers_.bind(this));
    }
    return hasEditableLayers;
  }

  /**
   * @param {string} [opt_roleId] The role id to send in the request.
   * Load themes from the "themes" service.
   */
  loadThemes(opt_roleId) {
    if (!this.treeUrl_) {
      throw 'gmfTreeUrl should be defined.';
    }

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
 * @param {import('gmf/themes').GmfTheme[]} themes Array of "theme" objects.
 * @param {string} name The layer name.
 * @returns {?import('gmf/themes').GmfGroup} The group.
 * @hidden
 */
export function findGroupByLayerNodeName(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      /** @type {import("gmf/themes").GmfLayer[]} */
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
 *
 * @param {import('gmf/themes').GmfTheme[]} themes Array of "theme" objects.
 * @param {string} name The group name.
 * @returns {?import('gmf/themes').GmfGroup} The group.
 * @hidden
 */
export function findGroupByName(themes, name) {
  for (let i = 0, ii = themes.length; i < ii; i++) {
    const theme = themes[i];
    for (let j = 0, jj = theme.children.length; j < jj; j++) {
      const group = theme.children[j];
      /** @type {import("gmf/themes").GmfGroup[]} */
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
 *
 * @param {(import('gmf/themes').GmfTheme|import("gmf/themes").GmfGroup|import("gmf/themes").GmfLayer)[]} objects
 *    Array of objects with a 'name' attribute.
 * @param {string} objectName The object name.
 * @returns {?(import('gmf/themes').GmfTheme|import("gmf/themes").GmfGroup|import("gmf/themes").GmfLayer)}
 *    The object or null.
 * @hidden
 */
export function findObjectByName(objects, objectName) {
  return olArray.find(objects, (object) => object.name === objectName);
}

/**
 * Find a theme object by its name. Return null if not found.
 *
 * @param {import('gmf/themes').GmfTheme[]} themes Array of "theme" objects.
 * @param {string} themeName The theme name.
 * @returns {?import('gmf/themes').GmfTheme} The theme object or null.
 * @hidden
 */
export function findThemeByName(themes, themeName) {
  return /** @type {import('gmf/themes').GmfTheme} */ findObjectByName(themes, themeName);
}

/**
 * Fill the given "nodes" array with all internal nodes (non-leaf nones) in the given node.
 *
 * @param {import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node Layertree node.
 * @param {import('gmf/themes').GmfGroup[]} nodes An array.
 * @private
 * @hidden
 */
function getFlatInternalNodes(node, nodes) {
  const gmfGroup = /** @type {import('gmf/themes').GmfGroup} */ (node);
  const children = gmfGroup.children;
  if (children !== undefined) {
    nodes.push(/** @type {import('gmf/themes').GmfGroup} */ (node));
    for (const child of children) {
      getFlatInternalNodes(child, nodes);
    }
  }
}

/**
 * Fill the given "nodes" array with all leaf nodes in the given node.
 *
 * @param {import('gmf/themes').GmfTheme|import('gmf/themes').GmfGroup|import('gmf/themes').GmfLayer} node Layertree node.
 * @param {import('gmf/themes').GmfLayer[]} nodes An array.
 * @hidden
 */
export function getFlatNodes(node, nodes) {
  const gmfGroup = /** @type {import('gmf/themes').GmfTheme|import('gmf/themes').GmfGroup} */ (node);
  const children = gmfGroup.children;
  if (children !== undefined) {
    for (const child of children) {
      getFlatNodes(child, nodes);
    }
  } else {
    nodes.push(/** @type {import('gmf/themes').GmfLayer} */ (node));
  }
}

/**
 * Get the snapping configuration object from a Layertree controller
 *
 * @param {import('gmf/themes').GmfLayer} node Layer node from the theme.
 * @returns {?import('gmf/themes').GmfSnappingConfig} Snapping configuration, if found.
 * @hidden
 */
export function getSnappingConfig(node) {
  const config =
    node.metadata && node.metadata.snappingConfig !== undefined ? node.metadata.snappingConfig : null;
  // config.activated default to true
  if (config && config.activated === undefined) {
    config.activated = true;
  }
  return config;
}

/**
 * Get the maximal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 *
 * @param {import('gmf/themes').GmfLayerWMS|import('gmf/themes').GmfLayerWMTS|import('gmf/themes').GmfLayerVectorTiles} gmfLayer the GeoMapFish Layer.
 * @returns {number|undefined} the max resolution or undefined if any.
 * @hidden
 */
export function getNodeMaxResolution(gmfLayer) {
  const metadata = gmfLayer.metadata;
  const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (gmfLayer);
  let maxResolution = gmfLayerWMS.maxResolutionHint;
  if (maxResolution === undefined && metadata !== undefined) {
    maxResolution = metadata.maxResolution;
  }
  return maxResolution;
}

/**
 * Get the minimal resolution defined for this layer. Looks in the
 *     layer itself before to look into its metadata.
 *
 * @param {import('gmf/themes').GmfLayerWMS|import('gmf/themes').GmfLayerWMTS|import('gmf/themes').GmfLayerVectorTiles} gmfLayer the GeoMapFish Layer.
 * @returns {number|undefined} the min resolution or undefined if any.
 * @hidden
 */
export function getNodeMinResolution(gmfLayer) {
  const metadata = gmfLayer.metadata;
  const gmfLayerWMS = /** @type {import('gmf/themes').GmfLayerWMS} */ (gmfLayer);
  let minResolution = gmfLayerWMS.minResolutionHint;
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
  VECTOR_TILES: 'VectorTiles',
  WMTS: 'WMTS',
  WMS: 'WMS',
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfThemes', [ngeoMapLayerHelper.name]);

myModule.service('gmfThemes', ThemesService);

export default myModule;
