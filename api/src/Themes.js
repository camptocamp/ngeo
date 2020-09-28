// The MIT License (MIT)
//
// Copyright (c) 2018-2020 Camptocamp SA
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

import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import TileLayer from 'ol/layer/Tile.js';
import ImageLayer from 'ol/layer/Image.js';
import GroupLayer from 'ol/layer/Group.js';

import constants from './constants.js';

/**
 * @type {Promise<import('gmf/themes.js').GmfThemesResponse>}
 * @hidden
 */
let themesPromise;

/**
 * @hidden
 * @return {Promise<import('gmf/themes.js').GmfThemesResponse>} Promise
 */
function getThemesPromise() {
  if (!themesPromise) {
    if (!constants.themesUrl) {
      throw new Error('Missing constants.themesUrl');
    }
    themesPromise = fetch(constants.themesUrl).then((response) => response.json());
  }
  return themesPromise;
}

/**
 * @type {Promise<Object<string, string>>} Promise
 * @hidden
 */
let localePromise;

/**
 * @hidden
 * @return {Promise<Object<string, string>>} Promise
 */
export function getLocalePromise() {
  if (!constants.localeUrl) {
    // Fallback to an empty dict
    return Promise.resolve({});
  }
  if (!localePromise) {
    localePromise = fetch(constants.localeUrl)
      .then((response) => response.json())
      .then(
        (data) =>
          // Return the first property as data should looks like { 'fr': { ... } }
          data[Object.keys(data)[0]]
      );
  }
  return localePromise;
}

/**
 * @type {Promise<Map<string, overlayDefinition>>|undefined}
 * @hidden
 */
let overlayDefPromise;

/**
 * @hidden
 * @return {Promise<Array<TileLayer|ImageLayer|GroupLayer>>} Promise
 */
export function getBackgroundLayers() {
  return getThemesPromise().then((themes) => {
    const promises = [];
    for (const config of themes.background_layers) {
      const layerConfig = /** @type {import('gmf/themes.js').GmfLayer} */ (config);
      if (layerConfig.type === 'WMTS') {
        const layerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (/** @type {any} */ (config));
        promises.push(
          createWMTSLayer(layerWMTS).then((layer) => {
            layer.set('config.name', layerWMTS.name);
            return layer;
          })
        );
      } else if (layerConfig.type === 'WMS') {
        const layerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (/** @type {any} */ (config));
        const ogcServer = themes.ogcServers[config.ogcServer];
        promises.push(
          createWMSLayer(layerWMS, ogcServer).then((layer) => {
            layer.set('config.name', layerWMS.name);
            return layer;
          })
        );
      } else if (/** @type {import('gmf/themes.js').GmfGroup} */ (config).children) {
        // reverse children order
        const reversed = /** @type {import('gmf/themes.js').GmfGroup} */ (config).children.slice().reverse();

        // create all the layers for the layer group

        /** @type {Promise<TileLayer|ImageLayer>[]} */
        const groupPromises = reversed.map((item) => {
          const child = /** @type {import('gmf/themes.js').GmfLayer} */ (item);
          if (child.type === 'WMTS') {
            const layerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (
              /** @type {any} */ (child)
            );
            return createWMTSLayer(layerWMTS);
          } else if (child.type === 'WMS') {
            const layerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (/** @type {any} */ (child));
            return createWMSLayer(layerWMS, themes.ogcServers[child.ogcServer]);
          }
          throw new Error('Unknow layer type');
        });
        const groupsPromise = Promise.all(groupPromises);
        promises.push(
          groupsPromise.then((layers) => {
            // create a layer group for the children.
            const group = new GroupLayer({
              layers,
            });
            group.set('config.name', config.name);
            return group;
          })
        );
      }
    }
    return Promise.all(/** @type {Array<Promise<TileLayer|ImageLayer|GroupLayer>>} */ (promises));
  });
}

/**
 * @typedef {Object} overlayDefinition
 * @property {import('gmf/themes.js').GmfLayer} layer
 * @property {import('gmf/themes.js').GmfOgcServer} ogcServer
 */

/**
 * @type {Map<string, overlayDefinition>}
 * @hidden
 */
const overlayDefs = new Map();

/**
 * @hidden
 * @return {Promise<Map<string, overlayDefinition>>} Promise
 */
export function getOverlayDefs() {
  if (!overlayDefPromise) {
    overlayDefPromise = new Promise((resolve, reject) => {
      getThemesPromise().then((themes) => {
        for (const theme of themes.themes) {
          writeOverlayDefs(theme, themes.ogcServers);
        }
        resolve(overlayDefs);
      });
    });
  }
  return overlayDefPromise;
}

/**
 * @param {import('gmf/themes.js').GmfGroup|import('gmf/themes.js').GmfLayer|import('gmf/themes.js').GmfTheme} config Config
 * @param {import('gmf/themes.js').GmfOgcServers} ogcServers OGC servers
 * @param {import('gmf/themes.js').GmfOgcServer} [opt_ogcServer] OGC server
 * @hidden
 */
export function writeOverlayDefs(config, ogcServers, opt_ogcServer) {
  const group = /** @type {import('gmf/themes.js').GmfGroup} */ (config);
  const ogcServer = opt_ogcServer ? opt_ogcServer : ogcServers[group.ogcServer];
  if (group.children) {
    for (const childConfig of group.children) {
      writeOverlayDefs(childConfig, ogcServers, ogcServer);
    }
  } else {
    const layer = /** @type {import('gmf/themes.js').GmfLayer} */ (config);
    overlayDefs.set(layer.name, {
      layer,
      ogcServer,
    });
  }
}

/**
 * Returns a list of OpenLayers layer objects from the given layer names.
 *
 * @param {string[]} layerNames List of layer names
 * @return {Promise<(TileLayer|ImageLayer)[]>} Promise.
 * @hidden
 */
export function getOverlayLayers(layerNames) {
  return getOverlayDefs().then((overlayDefs) => {
    /** @type {Promise<TileLayer|ImageLayer>[]} */
    const promises = [];
    for (const layerName of layerNames) {
      const overlayDef = overlayDefs.get(layerName);

      if (!overlayDef) {
        console.error(`Layer not found in themes: ${layerName}`);
        continue;
      }

      const ogcServer = overlayDef.ogcServer;

      if (overlayDef.layer.type === 'WMTS') {
        const wmtsLayer = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (
          /** @type {any} */ (overlayDef.layer)
        );
        promises.push(createWMTSLayer(wmtsLayer));
      } else if (overlayDef.layer.type === 'WMS' && ogcServer) {
        const wmsLayer = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (
          /** @type {any} */ (overlayDef.layer)
        );
        promises.push(createWMSLayer(wmsLayer, ogcServer));
      }
    }
    return Promise.all(promises);
  });
}

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} config Layer config (i.e. gmf layer node)
 * @param {import('gmf/themes.js').GmfOgcServer} ogcServer OGC server configuration used to create the layer.
 * @return {Promise<ImageLayer>} Promise.
 * @hidden
 */
export function createWMSLayer(config, ogcServer) {
  const layer = new ImageLayer({
    source: new ImageWMS({
      url: ogcServer.url,
      params: {
        'LAYERS': config.layers,
      },
      serverType: ogcServer.type,
    }),
    minResolution: config.minResolutionHint,
    maxResolution: config.maxResolutionHint,
  });
  layer.set('config.name', config.name);
  return getLocalePromise().then((translations) => {
    layer.set('title', translations[config.name] || config.name);
    return layer;
  });
}

/**
 * @param {import('gmf/themes.js').GmfLayerWMTS} config Layer config (i.e. gmf layer node)
 * @return {Promise<?TileLayer>} Promise.
 * @hidden
 */
export function createWMTSLayer(config) {
  return Promise.all([getLocalePromise(), getWMTSCapability(config.url)]).then((result) => {
    const translations = result[0];
    const capability = result[1];
    const options = optionsFromCapabilities(capability, {
      crossOrigin: 'anonymous',
      layer: config.layer,
      matrixSet: config.matrixSet,
    });
    if (!options) {
      console.log(
        `Missing options for WMTS layer '${config.layer}', ` +
          `with name '${config.name}', ` +
          `from URL '${config.url}'.`
      );
      return null;
    }
    const source = new WMTS(options);
    source.updateDimensions(config.dimensions);
    const layer = new TileLayer({
      preload: Infinity,
      source: source,
    });
    layer.set('title', translations[config.name] || config.name);
    layer.set('config.name', config.name);
    return layer;
  });
}

/**
 * @type {Map<string, Promise<void>>}
 * @hidden
 */
const capabilities = new Map();

/**
 * @private
 * @hidden
 * @param {string} url The URL
 * @return {Promise<void>} Any
 */
function getWMTSCapability(url) {
  if (!capabilities.has(url)) {
    const request = fetch(url)
      .then((response) => response.text())
      .then((capability) => {
        const parser = new WMTSCapabilities();
        return parser.read(capability);
      });
    capabilities.set(url, request);
  }
  return /** @type {Promise<void>} */ (capabilities.get(url));
}
