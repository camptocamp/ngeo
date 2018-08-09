/**
 * @module ngeo.proj.EPSG2056
 */
import * as olProj from 'ol/proj.js';

/** @suppress {extraRequire} */
import * as olProjProj4 from 'ol/proj/proj4.js';

import somerc from 'ngeo/proj/somerc.js';
import proj4 from 'proj4';

const epsg2056def = [
  `+proj=${somerc}`,
  '+lat_0=46.95240555555556',
  '+lon_0=7.439583333333333',
  '+k_0=1',
  '+x_0=2600000',
  '+y_0=1200000',
  '+ellps=bessel',
  '+towgs84=674.374,15.056,405.346,0,0,0,0',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg2056extent = [2420000, 1030000, 2900000, 1350000];

proj4.defs('EPSG:2056', epsg2056def);
olProjProj4.register(proj4);
olProj.get('EPSG:2056').setExtent(epsg2056extent);

const exports = 'EPSG:2056';


export default exports;
