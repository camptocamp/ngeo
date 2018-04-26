/**
 * @module ngeo.proj.somerc
 */
import proj4 from 'proj4';
import somerc from 'proj4/projections/somerc.js';


proj4.Proj.projections.add(somerc);
const exports = 'somerc';


export default exports;
