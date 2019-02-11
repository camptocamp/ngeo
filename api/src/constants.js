
import EPSG21781 from '@geoblocks/proj/src/EPSG_21781.js';
import EPSG2056 from '@geoblocks/proj/src/EPSG_2056.js';

/**
 * @type {string}
 * @hidden
 */
export const themesUrl = 'https://geomapfish-demo-dc.camptocamp.com/2.4/themes?version=2&background=background';

/**
 * @type {Array<string>}
 * @hidden
 */
export const supportedProjections = [EPSG21781, EPSG2056];

/**
 * @type {string}
 * @hidden
 */
export const projection = EPSG21781;


/**
 * @type {Array.<number>}
 * @hidden
 */
export const resolutions = [250, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05];


/**
 * @type {Array.<number>}
 * @hidden
 */
export const extent = [420000, 30000, 660000, 350000];


/**
 * The name of the layer to use as background. May be a single value
 * (WMTS) or a comma-separated list of layer names (WMS).
 * @type {string}
 * @hidden
 */
//export const backgroundLayer = 'default'; // WMS
export const backgroundLayer = 'Test aus Olten'; // WMTS
