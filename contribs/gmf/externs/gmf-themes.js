/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */

/**
 * @constructor
 */
var GmfRootNode = function() {};


/**
 * @type {Array.<GmfGroup>}
 */
GmfRootNode.prototype.children;

/**
 * @typedef {{
 *     background_layers: Array.<GmfLayer>,
 *     errors: Array.<string>,
 *     ogcServers: GmfOgcServers,
 *     themes: Array.<GmfTheme>
 * }}
 */
var GmfThemesResponse;


/**
 * @constructor
 */
var GmfLayer = function() {};


/**
 * @type {Object.<string, string>}
 */
GmfLayer.prototype.dimensions;


/**
 * @type {number}
 */
GmfLayer.prototype.id;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.imageType;


/**
 * @type {string|null|undefined}
 */
GmfLayer.prototype.layer;


/**
 * @type {Object.<string, *>}
 */
GmfLayer.prototype.metadata;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.name;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.type;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.url;


/**
 * @typedef {Object<string, GmfOgcServer>}
 */
var GmfOgcServers;


/**
 * @constructor
 */
var GmfOgcServer = function() {};


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.auth;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.imageType;


/**
 * @type {boolean|undefined}
 */
GmfOgcServer.prototype.isSingleTile;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.type;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.url;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.urlWfs;


/**
 * @type {boolean|undefined}
 */
GmfOgcServer.prototype.wfsSupport;


/**
 * @constructor
 */
var GmfTheme = function() {};


/**
 * @type {Array.<GmfGroup>}
 */
GmfTheme.prototype.children;


/**
 * @type {Object.<string, Array.<string|number>>}
 */
GmfTheme.prototype.functionalities;


/**
 * @type {string|undefined}
 */
GmfTheme.prototype.icon;


/**
 * @type {number}
 */
GmfTheme.prototype.id;


/**
 * @type {Object.<string, *>}
 */
GmfTheme.prototype.metadata;


/**
 * @type {string}
 */
GmfTheme.prototype.name;


/**
 * @constructor
 */
var GmfGroup = function() {};


/**
 * @type {Array.<GmfGroup|GmfLayer>|undefined}
 */
GmfGroup.prototype.children;


/**
 * @type {number}
 */
GmfGroup.prototype.id;


/**
 * @type {Object.<string, *>}
 */
GmfGroup.prototype.metadata;


/**
 * @type {boolean|undefined}
 */
GmfGroup.prototype.mixed;


/**
 * @type {string|undefined}
 */
GmfGroup.prototype.name;


/**
 * @type {string|undefined}
 */
GmfGroup.prototype.ogcServer;


/**
 * @type {ngeox.TimeProperty|undefined}
 */
GmfGroup.prototype.time;


/**
 * @constructor
 */
var GmfLayer = function() {};


/**
 * @type {Array.<GmfLayerChildLayer>|undefined}
 */
GmfLayer.prototype.childLayers;


/**
 * @type {Object.<string, string>}
 */
GmfLayer.prototype.dimensions;


/**
 * @type {boolean|undefined}
 */
GmfLayer.prototype.editable;


/**
 * @type {number}
 */
GmfLayer.prototype.id;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.imageType;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.layer;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.layers;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.matrixSet;


/**
 * @type {number}
 */
GmfLayer.prototype.maxResolutionHint;


/**
 * @type {GmfMetaData}
 */
GmfLayer.prototype.metadata;


/**
 * @type {number}
 */
GmfLayer.prototype.minResolutionHint;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.name;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.ogcServer;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.style;


/**
 * @type {ngeox.TimeProperty|undefined}
 */
GmfLayer.prototype.time;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.type;


/**
 * @constructor
 */
var GmfLayerChildLayer = function() {};


/**
 * @type {number}
 */
GmfLayerChildLayer.prototype.maxResolutionHint;


/**
 * @type {number}
 */
GmfLayerChildLayer.prototype.minResolutionHint;


/**
 * @type {string}
 */
GmfLayerChildLayer.prototype.name;


/**
 * @type {boolean}
 */
GmfLayerChildLayer.prototype.queryable;


/**
 * @constructor
 */
var GmfMetaData = function() {};


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.disclaimer;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.identifierAttributeField;


/**
 * @type {boolean|undefined}
 */
GmfMetaData.prototype.isChecked;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.legend;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.legendRule;


/**
 * @type {number|undefined}
 */
GmfMetaData.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
GmfMetaData.prototype.maxResolutionHint;


/**
 * @type {number|undefined}
 */
GmfMetaData.prototype.minResolution;


/**
 * @type {number|undefined}
 */
GmfMetaData.prototype.minResolutionHint;


/**
 * The snapping configuration for the leaf. If set, the leaf's layer is
 * considered to be "snappable", even if the config itself is empty.
 *
 * @type {GmfSnappingConfig|undefined}
 */
GmfMetaData.prototype.snappingConfig;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.wmsLayers;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.queryLayers;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.wmsUrl;


/**
 * @constructor
 */
var GmfSnappingConfig = function() {};


/**
 * Determines whethers the edges of features from the node layer can be snapped
 * or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
GmfSnappingConfig.prototype.edge;


/**
 * The tolerance in pixels the snapping should occur for the node layer.
 * Defaults to `10`.
 * @type {number|undefined}
 */
GmfSnappingConfig.prototype.tolerance;


/**
 * Determines whethers the vertices of features from the node layer can be
 * snapped or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
GmfSnappingConfig.prototype.vertex;
