/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */


/**
 * @typedef {{
 *     background_layers: Array.<GmfThemesBackground>,
 *     errors: Array.<string>,
 *     ogcServers: GmfOgcServers,
 *     themes: Array.<GmfThemesTheme>
 * }}
 */
var GmfThemesResponse;


/**
 * @constructor
 */
var GmfThemesBackground = function() {};


/**
 * @type {Object.<string, string>}
 */
GmfThemesBackground.prototype.dimensions;


/**
 * @type {number}
 */
GmfThemesBackground.prototype.id;


/**
 * @type {string|undefined}
 */
GmfThemesBackground.prototype.imageType;


/**
 * @type {string|null|undefined}
 */
GmfThemesBackground.prototype.layer;


/**
 * @type {Object.<string, *>}
 */
GmfThemesBackground.prototype.metadata;


/**
 * @type {string|undefined}
 */
GmfThemesBackground.prototype.name;


/**
 * @type {string|undefined}
 */
GmfThemesBackground.prototype.type;


/**
 * @type {string|undefined}
 */
GmfThemesBackground.prototype.url;


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
var GmfThemesTheme = function() {};


/**
 * @type {Array.<GmfThemesGroup>}
 */
GmfThemesTheme.prototype.children;


/**
 * @type {Object.<string, Array.<string|number>>}
 */
GmfThemesTheme.prototype.functionalities;


/**
 * @type {string|undefined}
 */
GmfThemesTheme.prototype.icon;


/**
 * @type {number}
 */
GmfThemesTheme.prototype.id;


/**
 * @type {Object.<string, *>}
 */
GmfThemesTheme.prototype.metadata;


/**
 * @type {string|undefined}
 */
GmfThemesTheme.prototype.name;


/**
 * @constructor
 */
var GmfThemesGroup = function() {};


/**
 * @type {Array.<GmfThemesGroup|GmfThemesLeaf>|undefined}
 */
GmfThemesGroup.prototype.children;


/**
 * @type {number}
 */
GmfThemesGroup.prototype.id;


/**
 * @type {Object.<string, *>}
 */
GmfThemesGroup.prototype.metadata;


/**
 * @type {boolean|undefined}
 */
GmfThemesGroup.prototype.mixed;


/**
 * @type {string|undefined}
 */
GmfThemesGroup.prototype.name;


/**
 * @type {string|undefined}
 */
GmfThemesGroup.prototype.ogcServer;


/**
 * @type {ngeox.TimeProperty|undefined}
 */
GmfThemesGroup.prototype.time;


/**
 * @constructor
 */
var GmfThemesLeaf = function() {};


/**
 * @type {Array.<GmfThemesChildLayer>|undefined}
 */
GmfThemesLeaf.prototype.childLayers;


/**
 * @type {Object.<string, string>}
 */
GmfThemesLeaf.prototype.dimensions;


/**
 * @type {boolean|undefined}
 */
GmfThemesLeaf.prototype.editable;


/**
 * @type {number}
 */
GmfThemesLeaf.prototype.id;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.imageType;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.layer;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.layers;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.matrixSet;


/**
 * @type {number}
 */
GmfThemesLeaf.prototype.maxResolutionHint;


/**
 * @type {GmfThemesLeafMetaData}
 */
GmfThemesLeaf.prototype.metadata;


/**
 * @type {number}
 */
GmfThemesLeaf.prototype.minResolutionHint;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.name;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.ogcServer;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.style;


/**
 * @type {ngeox.TimeProperty|undefined}
 */
GmfThemesLeaf.prototype.time;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.type;


/**
 * @constructor
 */
var GmfThemesChildLayer = function() {};


/**
 * @type {number}
 */
GmfThemesChildLayer.prototype.maxResolutionHint;


/**
 * @type {number}
 */
GmfThemesChildLayer.prototype.minResolutionHint;


/**
 * @type {string}
 */
GmfThemesChildLayer.prototype.name;


/**
 * @type {boolean}
 */
GmfThemesChildLayer.prototype.queryable;


/**
 * @constructor
 */
var GmfThemesLeafMetaData = function() {};


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.disclaimer;


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.identifierAttributeField;


/**
 * @type {boolean|undefined}
 */
GmfThemesLeafMetaData.prototype.isChecked;


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.legend;


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.legendRule;


/**
 * @type {number|undefined}
 */
GmfThemesLeafMetaData.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
GmfThemesLeafMetaData.prototype.maxResolutionHint;


/**
 * @type {number|undefined}
 */
GmfThemesLeafMetaData.prototype.minResolution;


/**
 * @type {number|undefined}
 */
GmfThemesLeafMetaData.prototype.minResolutionHint;


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.wmsLayers;


/**
 * @type {string|undefined}
 */
GmfThemesLeafMetaData.prototype.wmsUrl;
