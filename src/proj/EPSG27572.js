/**
 * @module ngeo.proj.EPSG27572
 */
import * as olProj from 'ol/proj.js';

/** @suppress {extraRequire} */
import * as olProjProj4 from 'ol/proj/proj4.js';

import lcc from 'ngeo/proj/lcc.js';
import proj4 from 'proj4';

const epsg27572def = [
  `+proj=${lcc}`,
  '+lat_0=46.8',
  '+lon_0=0',
  '+lat_1=46.8',
  '+k_0=0.99987742',
  '+x_0=600000',
  '+y_0=2200000',
  '+ellps=GRS80',
  '+a=6378249.2',
  '+b=6356515',
  '+towgs84=-168,-60,320,0,0,0,0',
  '+pm=paris',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg27572extent = [5168.43, 1730142.53, 1013247.20, 2698564.20];

proj4.defs('EPSG:27572', epsg27572def);
olProjProj4.register(proj4);
olProj.get('EPSG:27572').setExtent(epsg27572extent);

const exports = 'EPSG:27572';


export default exports;
