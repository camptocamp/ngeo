/**
 * @module ngeo.proj.EPSG32631
 */
import * as olProj from 'ol/proj.js';

/** @suppress {extraRequire} */
import * as olProjProj4 from 'ol/proj/proj4.js';

import utm from 'ngeo/proj/utm.js';
import proj4 from 'proj4';

const epsg32631def = [
  `+proj=${utm}`,
  '+zone=31',
  '+ellps=WGS84',
  '+datum=WGS84',
  '+units=m',
  '+no_defs'
].join(' ');
const epsg32631extent = [166021.44, 0.00, 534994.66, 9329005.18];

proj4.defs('EPSG:32631', epsg32631def);
olProjProj4.register(proj4);
olProj.get('EPSG:32631').setExtent(epsg32631extent);

const exports = 'EPSG:32631';


export default exports;
