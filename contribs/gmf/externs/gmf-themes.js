/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */


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
 * @struct
 */
var GmfRootNode = function() {};


/**
 * @type {Array.<GmfGroup>}
 */
GmfRootNode.prototype.children;

/**
 * Contains the common element of all the elements of the GeoMapFisf layer tree.
 * @constructor
 * @struct
 */
var GmfBaseNode = function() {};


/**
 * @type {number}
 */
GmfBaseNode.prototype.id;


/**
 * @type {string}
 */
GmfBaseNode.prototype.name;


/**
 * The related metadata.
 * @type {GmfMetaData}
 */
GmfBaseNode.prototype.metadata;


/**
 * The element we can select in the theme selector.
 * @constructor
 * @struct
 * @extends GmfBaseNode
 */
var GmfTheme = function() {};


/**
 * The first level layer groups.
 * @type {Array.<GmfGroup>}
 */
GmfTheme.prototype.children;


/**
 * The Functionalities related to the theme.
 * @type {Object.<string, Array.<string|number>>}
 */
GmfTheme.prototype.functionalities;


/**
 * A GeoMapFish group
 * not an OpenLayers group
 * neither a WMS group.
 * This represent « first level group » (Block in the layer tree),
 * or all sub nodes that's not al leaf.
 * @extends GmfBaseNode
 * @constructor
 * @struct
 */
var GmfGroup = function() {};


/**
 * @type {Array.<GmfGroup|GmfLayer>}
 */
GmfGroup.prototype.children;


/**
 * A mixed group is a group on which one the layers comes from different sources,
 * then all the sub GeoMapFish layers (leaf) will be an OpenLayers layer.
 * By opposition a non mixed first level group contains only GeoMapFish layers WMS
 * from the same server, then we have only one OpenLayers layer for all the first level group.
 * All the group child will have the same value of his parent,
 * In other word, all the group of a first level group will have the same value.
 * @type {boolean}
 */
GmfGroup.prototype.mixed;


/**
 * On non mixed first level group it is the ogc server to use.
 * @type {string|undefined}
 */
GmfGroup.prototype.ogcServer;


/**
 * On non mixed first level group with more then one time layer, it is the time informations.
 * @type {ngeox.TimeProperty|undefined}
 */
GmfGroup.prototype.time;


/**
 * A GeoMapFish layer
 * not an OpenLayers layer
 * neither a WMS layer.
 * This is also the leaf of the tree.
 * @constructor
 * @struct
 * @extends GmfBaseNode
 */
var GmfLayer = function() {};


/**
 * WMS or WMTS.
 * @type {string}
 */
GmfLayer.prototype.type;


/**
 * The dimensions managed by the layer, if the value is null we will take the dimension from the application.
 * @type {Object.<string, string>}
 */
GmfLayer.prototype.dimensions;


/**
 * @type {boolean|undefined}
 */
GmfLayer.prototype.editable;


/**
 * @type {string|undefined}
 */
GmfLayer.prototype.style;


/**
 * @constructor
 * @struct
 * @extends GmfLayer
 */
var GmfLayerWMS = function() {};


/**
 * The comma separated list of WMS layers or groups.
 * @type {string}
 */
GmfLayerWMS.prototype.layers;


/**
 * @type {Array.<GmfLayerChildLayer>}
 */
GmfLayerWMS.prototype.childLayers;


/**
 * The min resolution where the layer is visible.
 * @type {number}
 */
GmfLayerWMS.prototype.minResolutionHint;


/**
 * The max resolution where the layer is visible.
 * @type {number}
 */
GmfLayerWMS.prototype.maxResolutionHint;


/**
 * @type {string|undefined}
 */
GmfLayerWMS.prototype.ogcServer;


/**
 * The time informations if the layer directly manage it, see also {GmfGroup.time}.
 * @type {ngeox.TimeProperty|undefined}
 */
GmfLayerWMS.prototype.time;


/**
 * @constructor
 * @extends GmfLayer
 * @struct
 */
var GmfLayerWMTS = function() {};


/**
 * @type {string}
 */
GmfLayerWMTS.prototype.url;


/**
 * @type {string}
 */
GmfLayerWMTS.prototype.layer;


/**
 * 'image/png' or 'image/jpeg'.
 * @type {string}
 */
GmfLayerWMTS.prototype.imageType;


/**
 * @type {string}
 */
GmfLayerWMTS.prototype.matrixSet;


/**
 * Additional attributes related on a WMS layers (or WFS features type).
 * @constructor
 * @struct
 */
var GmfLayerChildLayer = function() {};


/**
 * The min resolution where the layer is visible.
 * @type {number}
 */
GmfLayerChildLayer.prototype.maxResolutionHint;


/**
 * The max resolution where the layer is visible.
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
 * @typedef {Object<string, GmfOgcServer>}
 */
var GmfOgcServers;


/**
 * @constructor
 * @struct
 */
var GmfOgcServer = function() {};


/**
 * 'image/png' or 'image/jpeg'.
 * @type {string}
 */
GmfOgcServer.prototype.imageType;


/**
 * @type {boolean}
 */
GmfOgcServer.prototype.isSingleTile;


/**
 * 'mapserver', 'qgisserver', 'geoserver' or 'other'.
 * @type {string}
 */
GmfOgcServer.prototype.type;


/**
 * @type {string}
 */
GmfOgcServer.prototype.url;


/**
 * The WFS URL.
 * @type {string}
 */
GmfOgcServer.prototype.urlWfs;


/**
 * @type {boolean}
 */
GmfOgcServer.prototype.wfsSupport;


/**
 * @constructor
 * @struct
 */
var GmfMetaData = function() {};


/**
 * Group expanded by default.
 * @type {boolean|undefined}
 */
GmfMetaData.prototype.isExpanded;


/**
 * Display the legend (default true).
 * @type {boolean|undefined}
 */
GmfMetaData.prototype.legend;


/**
 * Legend expanded by default.
 * @type {boolean|undefined}
 */
GmfMetaData.prototype.isLegendExpanded;


/**
 * The WMS rule used to get the icon visible in the layer tree.
 * @type {string|undefined}
 */
GmfMetaData.prototype.legendRule;


/**
 * The URL to the image used as a legend in the layer tree.
 * @type {string|undefined}
 */
GmfMetaData.prototype.legendImage;


/**
 * The icon URL visible in the layer tree.
 * @type {string|undefined}
 */
GmfMetaData.prototype.iconUrl;


/**
 * The Metadata URL.
 * @type {string|undefined}
 */
GmfMetaData.prototype.metadataUrl;


/**
 * The disclaimer.
 * @type {string|undefined}
 */
GmfMetaData.prototype.disclaimer;


/**
 * Is the layer checked by default.
 * @type {boolean|undefined}
 */
GmfMetaData.prototype.isChecked;


/**
 * The min resolution where the layer is visible.
 * @type {number|undefined}
 */
GmfMetaData.prototype.minResolution;


/**
 * The max resolution where the layer is visible.
 * @type {number|undefined}
 */
GmfMetaData.prototype.maxResolution;


/**
 * The icon visible in the theme selector.
 * @type {string|undefined}
 */
GmfMetaData.prototype.thumbnail;


/**
 * The field used in the display query window as feature title.
 * @type {string|undefined}
 */
GmfMetaData.prototype.identifierAttributeField;


/**
 * The corresponding OGC server for GeoMapFish layer WMTS.
 * @type {string|undefined}
 */
GmfMetaData.prototype.ogcServer;


/**
 * On GeoMapFish layer WMTS the corresponding WMS layers.
 * @type {string|undefined}
 */
GmfMetaData.prototype.wmsLayers;


/**
 * On GeoMapFish layer WMTS the WMS layers used to query.
 * @type {string|undefined}
 */
GmfMetaData.prototype.queryLayers;


/**
 * On GeoMapFish layer WMTS the WMS layers used in the print.
 * @type {string|undefined}
 */
GmfMetaData.prototype.printLayers;


/**
 * The snapping configuration for the leaf. If set, the leaf's layer is
 * considered to be "snappable", even if the config itself is empty.
 *
 * @type {GmfSnappingConfig|undefined}
 */
GmfMetaData.prototype.snappingConfig;


/**
 * @constructor
 * @struct
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
