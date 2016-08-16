/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */


/**
 * @typedef {Object<string, GmfOgcServer>}
 */
var GmfOgcServers;


/**
 * @typedef {{
 *     themes: Array.<GmfThemesNode>,
 *     background_layers: Array.<GmfThemesNode>,
 *     ogcServers: GmfOgcServers
 * }}
 */
var GmfThemesResponse;


/**
 * @constructor
 */
var GmfThemesNode = function() {};


/**
 * @type {number}
 */
GmfThemesNode.prototype.id;


/**
 * @type {Array.<GmfThemesNode>}
 */
GmfThemesNode.prototype.children;


/**
 * @type {Array.<GmfChildLayerNode>}
 */
GmfThemesNode.prototype.childLayers;


/**
 * Flag that is turned on when the node is currently being edited.
 * @type {boolean|undefined}
 */
GmfThemesNode.prototype.editing;


/**
 * @type {boolean|undefined}
 */
GmfThemesNode.prototype.editable;


/**
 * @type {string}
 */
GmfThemesNode.prototype.layers;


/**
 * @type {number}
 */
GmfThemesNode.prototype.maxResolutionHint;


/**
 * @type {GmfMetaData}
 */
GmfThemesNode.prototype.metadata;


/**
 * @type {number}
 */
GmfThemesNode.prototype.minResolutionHint;


/**
 * @type {boolean}
 */
GmfThemesNode.prototype.mixed;


/**
 * @type {string}
 */
GmfThemesNode.prototype.name;


/**
 * @type {string}
 */
GmfThemesNode.prototype.type;


/**
 * @type {string|undefined}
 */
GmfThemesNode.prototype.url;


/**
 * @type {ngeox.TimeProperty|undefined}
 */
GmfThemesNode.prototype.time;

/**
 * @type {string|undefined}
 */
GmfThemesNode.prototype.wmsUrl;


/**
 * @type {number|undefined}
 */
GmfThemesNode.prototype.queryable;


/**
 * @type {boolean|undefined}
 */
GmfThemesNode.prototype.wfsSupport;


/**
 * @type {string|undefined}
 */
GmfThemesNode.prototype.urlWfs;


/**
 * @type {string|undefined}
 */
GmfThemesNode.prototype.ogcServer;


/**
 * @constructor
 */
var GmfThemesNodeCustom = function() {};


/**
 * @type {Array.<string>}
 */
GmfThemesNodeCustom.prototype.layers;


/**
 * @type {GmfThemesNode}
 */
GmfThemesNodeCustom.prototype.node;


/**
 * @constructor
 */
var GmfChildLayerNode = function() {};


/**
 * @type {string}
 */
GmfChildLayerNode.prototype.name;


/**
 * @type {number|boolean|undefined}
 */
GmfChildLayerNode.prototype.queryable;


/**
 * @constructor
 */
var GmfMetaData = function() {};


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.identifierAttributeField;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.queryLayers;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.wmsLayers;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.wmsUrl;


/**
 * @type {string|undefined}
 */
GmfMetaData.prototype.ogcServer;


/**
 * @constructor
 */
var GmfOgcServer = function() {};


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.url;


/**
 * @type {boolean|undefined}
 */
GmfOgcServer.prototype.isSingleTile;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.auth;


/**
 * @type {boolean|undefined}
 */
GmfOgcServer.prototype.wfsSupport;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.urlWfs;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.type;


/**
 * @type {string|undefined}
 */
GmfOgcServer.prototype.imageType;
