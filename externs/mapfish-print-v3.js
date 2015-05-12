/**
 * @fileoverview Externs for MapFish Print v3.
 *
 * @externs
 */



/**
 * @constructor
 */
var MapFishPrintSpec = function() {};


/**
 * @type {MapFishPrintAttributes}
 */
MapFishPrintSpec.prototype.attributes;


/**
 * @type {string}
 */
MapFishPrintSpec.prototype.layout;



/**
 * @constructor
 */
var MapFishPrintAttributes = function() {};


/**
 * @type {MapFishPrintMap}
 */
MapFishPrintAttributes.prototype.map;



/**
 * @constructor
 */
var MapFishPrintMap = function() {};


/**
 * @type {Array.<number>}
 */
MapFishPrintMap.prototype.bbox;


/**
 * @type {Array.<number>}
 */
MapFishPrintMap.prototype.center;


/**
 * @type {number}
 */
MapFishPrintMap.prototype.scale;


/**
 * @type {number}
 */
MapFishPrintMap.prototype.dpi;


/**
 * @type {Array.<MapFishPrintWmsLayer>}
 */
MapFishPrintMap.prototype.layers;


/**
 * @type {string}
 */
MapFishPrintMap.prototype.projection;


/**
 * @type {number}
 */
MapFishPrintMap.prototype.rotation;



/**
 * @constructor
 */
var MapFishPrintLayer = function() {};


/**
 * @type {string}
 */
MapFishPrintLayer.prototype.type;



/**
 * @constructor
 * @extends {MapFishPrintLayer}
 */
var MapFishPrintWmsLayer = function() {};


/**
 * @type {string}
 */
MapFishPrintWmsLayer.prototype.baseURL;


/**
 * @type {Object.<string, string>}
 */
MapFishPrintWmsLayer.prototype.customParams;


/**
 * @type {Array.<string>}
 */
MapFishPrintWmsLayer.prototype.layers;


/**
 * @type {number}
 */
MapFishPrintWmsLayer.prototype.opacity;


/**
 * @type {Array.<string>}
 */
MapFishPrintWmsLayer.prototype.styles;



/**
 * @constructor
 */
var MapFishPrintWmtsMatrix = function() {};


/**
 * @type {string}
 */
MapFishPrintWmtsMatrix.prototype.identifier;


/**
 * @type {number}
 */
MapFishPrintWmtsMatrix.prototype.scaleDenominator;


/**
 * @type {Array.<number>}
 */
MapFishPrintWmtsMatrix.prototype.tileSize;


/**
 * @type {Array.<number>}
 */
MapFishPrintWmtsMatrix.prototype.topLeftCorner;


/**
 * @type {Array.<number>}
 */
MapFishPrintWmtsMatrix.prototype.matrixSize;


/**
 * @constructor
 * @extends {MapFishPrintLayer}
 */
var MapFishPrintWmtsLayer = function() {};


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.baseURL;


/**
 * @type {Object}
 */
MapFishPrintWmtsLayer.prototype.dimensions;


/**
 * @type {Object}
 */
MapFishPrintWmtsLayer.prototype.dimensionParams;


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.imageFormat;


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.layer;


/**
 * @type {Array.<MapFishPrintWmtsMatrix>}
 */
MapFishPrintWmtsLayer.prototype.matrices;


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.matrixSet;


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.style;


/**
 * @type {string}
 */
MapFishPrintWmtsLayer.prototype.version;



/**
 * @constructor
 */
var MapFishPrintReportResponse = function() {};


/**
 * @type {string}
 */
MapFishPrintReportResponse.prototype.ref;


/**
 * @type {string}
 */
MapFishPrintReportResponse.prototype.statusURL;


/**
 * @type {string}
 */
MapFishPrintReportResponse.prototype.downloadURL;



/**
 * @constructor
 */
var MapFishPrintStatusResponse = function() {};


/**
 * @type {boolean}
 */
MapFishPrintStatusResponse.prototype.done;


/**
 * @type {string}
 */
MapFishPrintStatusResponse.prototype.downloadURL;
