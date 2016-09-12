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
 * @type {Array.<GmfThemesGroup|GmfThemesLeaf>}
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
 * @type {Array.<GmfThemesChildLayer>|undefined}
 */
GmfThemesLeaf.prototype.childLayers;


/**
 * @type {Object.<string, string>}
 */
GmfThemesLeaf.prototype.dimensions;


/**
 * Flag that is turned on when the leaf is currently being edited.
 * @type {boolean|undefined}
 */
GmfThemesLeaf.prototype.editing;


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
GmfThemesLeaf.aprototype.layers;


/**
 * @type {string|undefined}
 */
GmfThemesLeaf.prototype.matrixSet;


/**
 * @type {number}
 */
GmfThemesLeaf.prototype.maxResolutionHint;


/**
 * @type {GmfThemeLeafMetaData}
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
GmfThemeChildLayer.prototype.maxResolutionHint;


/**
 * @type {number}
 */
GmfThemeChildLayer.prototype.minResolutionHint;


/**
 * @type {string}
 */
GmfThemeChildLayer.prototype.name;


/**
 * @type {boolean}
 */
GmfThemesChildLayer.prototype.queryable;


/**
 * @constructor
 */
var GmfThemeLeafMetaData = function() {};


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.disclaimer;


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.identifierAttributeField;


/**
 * @type {boolean|undefined}
 */
GmfThemeLeafMetaData.prototype.isChecked;


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.legend;


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.legendRule;


/**
 * @type {number|undefined}
 */
GmfThemeLeafMetaData.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
GmfThemeLeafMetaData.prototype.maxResolutionHint;


/**
 * @type {number|undefined}
 */
GmfThemeLeafMetaData.prototype.minResolution;


/**
 * @type {number|undefined}
 */
GmfThemeLeafMetaData.prototype.minResolutionHint;


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.wmsLayers;


/**
 * @type {string|undefined}
 */
GmfThemeLeafMetaData.prototype.wmsUrl;
