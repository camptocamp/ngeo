/**
 * @module ngeo.proj.lcc
 */
import proj4 from 'proj4/lib/core.js';
import lcc from 'proj4/lib/projections/lcc.js';


proj4.Proj.projections.add(lcc);
const exports = 'lcc';


export default exports;
