/**
 * @module ngeo.proj.EPSG3947
 */
import * as olProj from 'ol/proj.js';

/** @suppress {extraRequire} */
import * as olProjProj4 from 'ol/proj/proj4.js';

import lcc from 'ngeo/proj/lcc.js';
import proj4 from 'proj4';

const epsg3947def = [
  `+proj=${lcc}`,
  '+lat_1=46.25',
  '+lon_0=3',
  '+lat_0=47',
  '+lat_2=47.75',
  '+x_0=1700000',
  '+y_0=6200000',
  '+ellps=GRS80',
  '+towgs84=0,0,0,0,0,0,0',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg3947extent = [619993.48, 5637784.91, 2212663.72, 6731809.22];

proj4.defs('EPSG:3947', epsg3947def);
olProjProj4.register(proj4);
olProj.get('EPSG:3947').setExtent(epsg3947extent);

const exports = 'EPSG:3947';


export default exports;
