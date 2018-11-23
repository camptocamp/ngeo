import {getOverlayDefs} from './Themes.js';
import {appendParams as olUriAppendParams} from 'ol/uri.js';
import olFormatGML2 from 'ol/format/GML2.js';
import olFormatWFS from 'ol/format/WFS.js';

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
 * @return {!Promise} Promise.
 */
export function getFeaturesFromLayer(layer, ids) {
  return new Promise((resolve, reject) => {
    getOverlayDefs().then((overlayDefs) => {

      let features = [];
      const overlayDef = overlayDefs.get(layer);

      if (!overlayDef) {
        reject(`Layer "${layer}" was not found in themes.`);
        return;
      }

      if (
        !overlayDef.ogcServer ||
        !overlayDef.ogcServer.wfsSupport ||
        !overlayDef.ogcServer.urlWfs ||
        overlayDef.config.type !== 'WMS'
      ) {
        reject(`Layer "${layer}" does not support WFS.`);
        return;
      }

      const featureIds = ids.map(id => `${layer}.${id}`);

      const params = {
        'FEATUREID': featureIds.join(','),
        'MAXFEATURES': ids.length,
        'REQUEST': 'GetFeature',
        'SERVICE': 'WFS',
        'TYPENAME': layer,
        'VERSION': '1.0.0'
      };
      const url = olUriAppendParams(overlayDef.ogcServer.urlWfs, params);

      fetch(url)
        .then(response => response.text().then((responseText) => {
          const wfsFormat = new olFormatWFS({
            featureNS: overlayDef.ogcServer.namespace,
            gmlFormat: new olFormatGML2()
          });
          features = wfsFormat.readFeatures(responseText);
        }))
        .catch((response) => {
          console.error(`WFS GetFeature request failed, response: ${response}`);
        })
        .then(() => {
          resolve(features);
        });
    });
  });
}
