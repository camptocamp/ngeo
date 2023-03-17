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
 * @returns {Promise<import('gmf/themes.js').GmfThemesResponse>} Promise
 */
function getThemesPromise() {
  if (!themesPromise) {
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
 * @returns {Promise<Array<TileLayer|ImageLayer|GroupLayer>>} Promise
 */
export function getBackgroundLayers() {
  return getThemesPromise().then((themes) => {
    const promises = [];
    for (const config of themes.background_layers) {
      if (/** @type {import('gmf/themes.js').GmfLayer} */ (config).type === 'WMTS') {
        const layerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (config);
        promises.push(
          createWMTSLayer(layerWMTS).then((layer) => {
            layer.set('config.name', layerWMTS.name);
            return layer;
          })
        );
      } else if (/** @type {import('gmf/themes.js').GmfLayer} */ (config).type === 'WMS') {
        const layerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (config);
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
        const groupPromise = Promise.all(
          reversed.map((item) => {
            const child = /** @type {import('gmf/themes.js').GmfLayer} */ (item);
            if (child.type === 'WMTS') {
              const layerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (child);
              return createWMTSLayer(layerWMTS);
            } else if (child.type === 'WMS') {
              const layerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (child);
              return createWMSLayer(layerWMS, themes.ogcServers[child.ogcServer]);
            }
          })
        );
        promises.push(
          groupPromise.then((layers) => {
            // create a layer group for the children.
            const group = new GroupLayer({
              layers: layers,
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
 * @returns {Promise<Map<string, overlayDefinition>>} Promise
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
 * @param {Object} config Config
 * @param {import('gmf/themes.js').GmfOgcServers} ogcServers OGC servers
 * @param {import('gmf/themes.js').GmfOgcServer} [opt_ogcServer]  OGC server
 * @returns {void}
 * @hidden
 */
export function writeOverlayDefs(config, ogcServers, opt_ogcServer) {
  const group = /** @type {import('gmf/themes.js').GmfGroup} */ (config);
  const ogcServer = opt_ogcServer ? opt_ogcServer : group.ogcServer ? ogcServers[group.ogcServer] : undefined;
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
 * @param {!Array<string>} layerNames List of layer names
 * @return {!Promise} Promise.
 * @hidden
 */
export function getOverlayLayers(layerNames) {
  return getOverlayDefs().then((overlayDefs) => {
    const promises = [];
    for (const layerName of layerNames) {
      const overlayDef = overlayDefs.get(layerName);

      if (!overlayDef) {
        console.error(`Layer not found in themes: ${layerName}`);
        continue;
      }

      const ogcServer = overlayDef.ogcServer;

      if (overlayDef.layer.type === 'WMTS') {
        const wmtsLayer = /** @type {import('gmf/themes.js').GmfLayerWMTS} */ (overlayDef.layer);
        promises.push(createWMTSLayer(wmtsLayer));
      } else if (overlayDef.layer.type === 'WMS' && ogcServer) {
        const wmsLayer = /** @type {import('gmf/themes.js').GmfLayerWMS} */ (overlayDef.layer);
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
      projection: undefined, // FIXME: should be removed in next OL version
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
 * @return {Promise<TileLayer>} Promise.
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
 * @type {Map<string, Object>}
 * @hidden
 */
const capabilities = new Map();

/**
 * @private
 * @hidden
 * @param {string} url The URL
 * @return {Object} Any
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
  return capabilities.get(url);
}
