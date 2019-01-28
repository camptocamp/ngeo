import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import TileWMS from 'ol/source/TileWMS.js';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS.js';
import TileLayer from 'ol/layer/Tile.js';

import * as constants from './constants.js';

/**
 * @type {Promise}
 */
const themesPromise = fetch(constants.themesUrl).then(response => response.json());

/**
 * @type {Promise|undefined}
 */
let overlayDefPromise;

export function getBackgroundLayers() {
  return themesPromise.then((themes) => {
    const promises = [];
    for (const config of themes.background_layers) {
      if (config.type === 'WMTS') {
        promises.push(
          createWMTSLayer(config).then((layer) => {
            layer.set('config.layer', config.layer);
            layer.set('config.name', config.name);
            return layer;
          })
        );
      } else if (config.type === 'WMS') {
        const ogcServer = themes.ogcServers[config.ogcServer];
        promises.push(
          createWMSLayer(config, ogcServer).then((layer) => {
            layer.set('config.layer', config.layers);
            layer.set('config.name', config.name);
            return layer;
          })
        );
      }
    }
    return Promise.all(promises);
  });
}

const overlayDefs = new Map();

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

export function writeOverlayDefs(config, ogcServers, opt_ogcServer) {
  const ogcServer = opt_ogcServer ?
    opt_ogcServer :
    config.ogcServer ? ogcServers[config.ogcServer] : undefined;
  if (config.children) {
    for (const childConfig of config.children) {
      writeOverlayDefs(childConfig, ogcServers, ogcServer);
    }
  } else {
    overlayDefs.set(
      config.name,
      {
        config,
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

      if (overlayDef.config.type === 'WMTS') {
        promises.push(
          createWMTSLayer(overlayDef.config)
        );
      } else if (overlayDef.config.type === 'WMS' && ogcServer) {
        promises.push(
          createWMSLayer(overlayDef.config, ogcServer)
        );
      }
    }
    return Promise.all(promises);
  });
}

/**
 * @param {Object} config Layer config (i.e. gmf layer node)
 * @param {Object} ogcServer OGC server configuration used to create the layer.
 * @return {Promise} Promise.
 */
export function createWMSLayer(config, ogcServer) {
  return Promise.resolve(
    new TileLayer({
      title: config.name,
      source: new TileWMS({
        url: ogcServer.url,
        params: {
          'LAYERS': config.layers
        },
        serverType: ogcServer.type
      })
    })
  );
}

/**
 * @param {Object} config Layer config (i.e. gmf layer node)
 * @return {Promise} Promise.
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
      title: config.name,
      preload: Infinity,
      source: source
    });
    return layer;
  });
}

const capabilities = new Map();

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
