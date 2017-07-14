/**
 * @const
 * @suppress {const|duplicate}
 * @externs
 */
let jsts = {};


/** @const */
jsts.geom = {};


/**
 * @constructor
 */
jsts.geom.Geometry = function() {};


/**
 * @param {number} buffer Buffer in meters.
 * @return {jsts.geom.Geometry} A JSTS geometry object.
 */
jsts.geom.Geometry.prototype.buffer = function(buffer) {};


/**
 * @param {jsts.geom.Geometry} jstsGeom A JSTS geometry object.
 * @return {jsts.geom.Geometry} A JSTS geometry object.
 */
jsts.geom.Geometry.prototype.difference = function(jstsGeom) {};


/**
 * @param {jsts.geom.Geometry} jstsGeom A JSTS geometry object.
 * @return {boolean} Whether the geometries intersect with one an other.
 */
jsts.geom.Geometry.prototype.intersects = function(jstsGeom) {};


/**
 * @param {jsts.geom.Geometry} jstsGeom A JSTS geometry object.
 * @return {jsts.geom.Geometry} A JSTS geometry object.
 */
jsts.geom.Geometry.prototype.union = function(jstsGeom) {};


/** @const */
jsts.io = {};


/**
 * @constructor
 */
jsts.io.OL3Parser = function() {};


/**
 * @param {ol.geom.Geometry} ol3Geom A OL3 geometry object.
 * @return {jsts.geom.Geometry} A JSTS geometry object.
 */
jsts.io.OL3Parser.prototype.read = function(ol3Geom) {};


/**
 * @param {jsts.geom.Geometry} jstsGeom A JSTS geometry object.
 * @return {ol.geom.Geometry} A OL3 geometry object.
 */
jsts.io.OL3Parser.prototype.write = function(jstsGeom) {};
