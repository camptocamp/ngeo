import {getOverlayDefs} from './Themes.js';
import {appendParams as olUriAppendParams} from 'ol/uri.js';
import olFormatGML2 from 'ol/format/GML2.js';
import olFormatWFS from 'ol/format/WFS.js';
import {buffer, createOrUpdateFromCoordinate} from 'ol/extent.js';

/**
 * Click tolerance in pixel
 * @type {number}
 */
const TOLERANCE = 10;

/**
 * @param {import('./Themes.js').overlayDefinition} def Overlay definition.
 * @return {boolean} Is the overlay queryable.
 */
function querable(def) {
  return def.layer.type === 'WMS' && !!def.ogcServer.wfsSupport && !!def.ogcServer.urlWfs;
}

/**
 * Issues a simple WFS GetFeature request for a single layer to fetch
 * specific features using their ids.
 *
 * Requirements:
 *  - the layer must exist within the loaded themes
 *  - it must be queryable
 *  - it must support WFS
 *  - feature ids must exist
 *
 * @param {!string} layer Name of the layer to query
 * @param {Array.<string>} ids List of ids
 * @return {!Promise<Array<import('ol/Feature.js').default>>} Promise.
 * @hidden
 */
export function getFeaturesFromIds(layer, ids) {
  return new Promise((resolve, reject) => {
    getOverlayDefs().then((overlayDefs) => {
      /** Array<import('ol/Feature.js').default> */
      let features = [];
      const overlayDef = overlayDefs.get(layer);

      if (!overlayDef) {
        reject(`Layer "${layer}" was not found in themes.`);
        return;
      }

      if (!querable(overlayDef)) {
        reject(`Layer "${layer}" does not support WFS.`);
        return;
      }

      const gmfLayer = /** @type import('gmf/themes.js').GmfLayerWMS */ (overlayDef.layer);
      const childLayerNames = [];
      let featureIds = [];
      for (const childLayer of gmfLayer.childLayers) {
        childLayerNames.push(childLayer.name);
        featureIds = featureIds.concat(ids.map((id) => `${childLayer.name}.${id}`));
      }

      const params = {
        'FEATUREID': featureIds.join(','),
        'MAXFEATURES': featureIds.length,
        'REQUEST': 'GetFeature',
        'SERVICE': 'WFS',
        'TYPENAME': childLayerNames.join(','),
        'VERSION': '1.0.0',
      };
      const url = olUriAppendParams(overlayDef.ogcServer.urlWfs, params);

      fetch(url)
        .then((response) =>
          response.text().then((responseText) => {
            const wfsFormat = new olFormatWFS({
              featureNS: overlayDef.ogcServer.namespace,
              gmlFormat: new olFormatGML2(),
            });
            features = wfsFormat.readFeatures(responseText);
          })
        )
        .catch((response) => {
          console.error(`WFS GetFeature request failed, response: ${response}`);
        })
        .then(() => {
          resolve(features);
        });
    });
  });
}

/**
 * @param {!string} layer Name of the layer to query
 * @param {Array.<number>} coordinate Coordinate.
 * @param {number} resolution Resolution
 *
 * @return {!Promise<import('ol/Feature.js').default>} Promise.
 * @hidden
 */
export function getFeaturesFromCoordinates(layer, coordinate, resolution) {
  return new Promise((resolve, reject) => {
    getOverlayDefs().then((overlayDefs) => {
      const overlayDef = overlayDefs.get(layer);

      if (!overlayDef) {
        reject(`Layer "${layer}" was not found in themes.`);
        return;
      }

      if (!querable(overlayDef)) {
        reject(`Layer "${layer}" does not support WFS.`);
        return;
      }

      const bbox = buffer(createOrUpdateFromCoordinate(coordinate), TOLERANCE * resolution);

      const params = {
        'BBOX': bbox.join(','),
        'MAXFEATURES': 1,
        'REQUEST': 'GetFeature',
        'SERVICE': 'WFS',
        'TYPENAME': layer,
        'VERSION': '1.0.0',
      };
      const url = olUriAppendParams(overlayDef.ogcServer.urlWfs, params);

      let feature;
      fetch(url)
        .then((response) =>
          response.text().then((responseText) => {
            const wfsFormat = new olFormatWFS({
              featureNS: overlayDef.ogcServer.namespace,
              gmlFormat: new olFormatGML2(),
            });
            feature = wfsFormat.readFeature(responseText);
          })
        )
        .catch((response) => {
          console.error(`WFS GetFeature request failed, response: ${response}`);
        })
        .then(() => {
          resolve(feature);
        });
    });
  });
}
