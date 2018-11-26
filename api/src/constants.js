
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';

/**
 * @type {string}
 */
export const themesUrl = 'https://geomapfish-demo-dc.camptocamp.com/2.4/themes?version=2&background=background';


/**
 * @type {string}
 */
export const projection = EPSG21781;


/**
 * @type {Array.<number>}
 */
export const resolutions = [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05];


/**
 * @type {Array.<number>}
 */
export const extent = [420000, 30000, 660000, 350000];


/**
 * The name of the layer to use as background. May be a single value
 * (WMTS) or a comma-separated list of layer names (WMS).
 * @type {string}
 */
//export const backgroundLayer = 'default'; // WMS
export const backgroundLayer = 'asitvd.fond_gris_sans_labels'; // WMTS
