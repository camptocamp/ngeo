import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import TileWMS from 'ol/source/TileWMS.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import TileLayer from 'ol/layer/Tile.js';

import constants from './constants.js';

/**
 * @type {Promise<import('gmf/themes.js').GmfThemesResponse>}
 * @hidden
 */
const themesPromise = fetch(constants.themesUrl).then(response => response.json());

/**
 * @type {Promise<Map<string, overlayDefinition>>|undefined}
 * @hidden
 */
let overlayDefPromise;

/**
 * @hidden
 * @returns {Promise<Array<TileLayer>>} Promise
 */
export function getBackgroundLayers() {
  return themesPromise.then((themes) => {
    const promises = [];
    for (const config of themes.background_layers) {
      if (config.type === 'WMTS') {
        const layerWMTS = /** @type {import('gmf/themes.js').GmfLayerWMTS} */(config);
        promises.push(
          createWMTSLayer(layerWMTS).then((layer) => {
            layer.set('config.layer', layerWMTS.layer);
            layer.set('config.name', layerWMTS.name);
            return layer;
          })
        );
      } else if (config.type === 'WMS') {
        const layerWMS = /** @type {import('gmf/themes.js').GmfLayerWMS} */(config);
        const ogcServer = themes.ogcServers[config.ogcServer];
        promises.push(
          createWMSLayer(layerWMS, ogcServer).then((layer) => {
            layer.set('config.layer', layerWMS.layers);
            layer.set('config.name', layerWMS.name);
            return layer;
          })
        );
      }
    }
    return Promise.all(promises);
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
      themesPromise.then((themes) => {
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
  const group = /** @type {import('gmf/themes.js').GmfGroup} */(config);
  const ogcServer = opt_ogcServer ? opt_ogcServer :
    group.ogcServer ? ogcServers[group.ogcServer] : undefined;
  if (group.children) {
    for (const childConfig of group.children) {
      writeOverlayDefs(childConfig, ogcServers, ogcServer);
    }
  } else {
    const layer = /** @type {import('gmf/themes.js').GmfLayer} */(config);
    overlayDefs.set(
      layer.name,
      {
        layer,
        ogcServer
      }
    );
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
        const wmtsLayer = /** @type {import('gmf/themes.js').GmfLayerWMTS} */(overlayDef.layer);
        promises.push(createWMTSLayer(wmtsLayer));
      } else if (overlayDef.layer.type === 'WMS' && ogcServer) {
        const wmsLayer = /** @type {import('gmf/themes.js').GmfLayerWMS} */(overlayDef.layer);
        promises.push(createWMSLayer(wmsLayer, ogcServer));
      }
    }
    return Promise.all(promises);
  });
}

/**
 * @param {import('gmf/themes.js').GmfLayerWMS} config Layer config (i.e. gmf layer node)
 * @param {import('gmf/themes.js').GmfOgcServer} ogcServer OGC server configuration used to create the layer.
 * @return {Promise<TileLayer>} Promise.
 * @hidden
 */
export function createWMSLayer(config, ogcServer) {
  const layer = new TileLayer({
    source: new TileWMS({
      url: ogcServer.url,
      projection: undefined, // should be removed in next OL version
      params: {
        'LAYERS': config.layers
      },
      serverType: ogcServer.type
    })
  });
  layer.set('title', config.name);
  return Promise.resolve(layer);
}

/**
 * @param {import('gmf/themes.js').GmfLayerWMTS} config Layer config (i.e. gmf layer node)
 * @return {Promise<TileLayer>} Promise.
 * @hidden
 */
export function createWMTSLayer(config) {
  return getWMTSCapability(config.url).then((capability) => {
    const options = optionsFromCapabilities(capability, {
      crossOrigin: 'anonymous',
      layer: config.layer,
      matrixSet: config.matrixSet
    });
    const source = new WMTS(options);
    source.updateDimensions(config.dimensions);
    const layer = new TileLayer({
      preload: Infinity,
      source: source
    });
    layer.set('title', config.name);
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
  if (!(url in capabilities)) {
    const request = fetch(url)
      .then(response => response.text())
      .then((capability) => {
        const parser = new WMTSCapabilities();
        return parser.read(capability);
      });
    capabilities.set(url, request);
  }
  return capabilities.get(url);
}
