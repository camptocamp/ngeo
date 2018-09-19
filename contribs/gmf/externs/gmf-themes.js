/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */


/**
 * @type {Object}
 */
let gmfThemes;

/**
 * @constructor
 * @struct
 */
gmfThemes.GmfThemesResponse = function() {};

/**
 * @type !Array.<!gmfThemes.GmfLayer>
 */
gmfThemes.GmfThemesResponse.prototype.background_layers;

/**
 * @type !Array.<string>
 */
gmfThemes.GmfThemesResponse.prototype.errors;

/**
 * @type !gmfThemes.GmfOgcServers
 */
gmfThemes.GmfThemesResponse.prototype.ogcServers;

/**
 * @type !Array.<!gmfThemes.GmfTheme>
 */
gmfThemes.GmfThemesResponse.prototype.themes;


/**
 * @constructor
 * @struct
 */
gmfThemes.GmfRootNode = function() {};


/**
 * @type {!Array.<!gmfThemes.GmfGroup>}
 */
gmfThemes.GmfRootNode.prototype.children;

/**
 * Contains the common element of all the elements of the GeoMapFish layer tree.
 * @constructor
 * @struct
 */
gmfThemes.GmfBaseNode = function() {};


/**
 * @type {number}
 */
gmfThemes.GmfBaseNode.prototype.id;


/**
 * The related metadata.
 * @type {!gmfThemes.GmfMetaData}
 */
gmfThemes.GmfBaseNode.prototype.metadata;


/**
 * @type {string}
 */
gmfThemes.GmfBaseNode.prototype.name;


/**
 * The element we can select in the theme selector.
 * @constructor
 * @struct
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfTheme = function() {};


/**
 * The first level layer groups.
 * @type {!Array.<!gmfThemes.GmfGroup>}
 */
gmfThemes.GmfTheme.prototype.children;


/**
 * The Functionalities related to the theme.
 * @type {!gmfThemes.GmfFunctionalities}
 */
gmfThemes.GmfTheme.prototype.functionalities;


/**
 * A GeoMapFish group
 * not an OpenLayers group
 * neither a WMS group.
 * This represent « first level group » (Block in the layer tree),
 * or all sub nodes that's not al leaf.
 * @constructor
 * @struct
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfGroup = function() {};


/**
 * @type {!Array.<!gmfThemes.GmfGroup|!gmfThemes.GmfLayer>}
 */
gmfThemes.GmfGroup.prototype.children;


/**
 * The dimensions managed by the OpenLayers layer, if the value is null we will take the dimension from the application.
 * This is present only on non mixed first level group.
 * @type {!ngeox.Dimensions}
 */
gmfThemes.GmfGroup.prototype.dimensions;


/**
 * A mixed group is a group on which one the layers comes from different sources,
 * then all the sub GeoMapFish layers (leaf) will be an OpenLayers layer.
 * By opposition a non mixed first level group contains only GeoMapFish layers WMS
 * from the same server, then we have only one OpenLayers layer for all the first level group.
 * All the group child will have the same value of his parent,
 * In other word, all the group of a first level group will have the same value.
 * @type {boolean}
 */
gmfThemes.GmfGroup.prototype.mixed;


/**
 * On non mixed first level group it is the ogc server to use.
 * @type {string|undefined}
 */
gmfThemes.GmfGroup.prototype.ogcServer;


/**
 * On non mixed first level group with more then one time layer, it is the time informations.
 * @type {ngeox.TimeProperty|undefined}
 */
gmfThemes.GmfGroup.prototype.time;


/**
 * A GeoMapFish layer
 * not an OpenLayers layer
 * neither a WMS layer.
 * This is also the leaf of the tree.
 * @constructor
 * @struct
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfLayer = function() {};


/**
 * The dimensions managed by the layer, if the value is null we will take the dimension from the application.
 * Present only on layer in a mixed group.
 * @type {!ngeox.Dimensions}
 */
gmfThemes.GmfLayer.prototype.dimensions;


/**
 * The dimensions applied by filters on the layer configuration, if the value
 * is null we will take the dimension from the application.
 * @type {!ngeox.DimensionsFiltersConfig}
 */
gmfThemes.GmfLayer.prototype.dimensions_filters;


/**
 * @type {boolean|undefined}
 */
gmfThemes.GmfLayer.prototype.editable;


/**
 * @type {string|undefined}
 */
gmfThemes.GmfLayer.prototype.style;


/**
 * WMS or WMTS.
 * @type {string}
 */
gmfThemes.GmfLayer.prototype.type;


/**
 * @constructor
 * @struct
 * @extends gmfThemes.GmfLayer
 */
gmfThemes.GmfLayerWMS = function() {};


/**
 * @type {!Array.<!gmfThemes.GmfLayerChildLayer>}
 */
gmfThemes.GmfLayerWMS.prototype.childLayers;

/**
 * The comma separated list of WMS layers or groups.
 * @type {string}
 */
gmfThemes.GmfLayerWMS.prototype.layers;


/**
 * The max resolution where the layer is visible.
 * @type {number}
 */
gmfThemes.GmfLayerWMS.prototype.maxResolutionHint;


/**
 * The min resolution where the layer is visible.
 * @type {number}
 */
gmfThemes.GmfLayerWMS.prototype.minResolutionHint;


/**
 * @type {string|undefined}
 */
gmfThemes.GmfLayerWMS.prototype.ogcServer;


/**
 * The time informations if the layer directly manage it, see
 * also {gmfThemes.GmfGroup.time}.
 * @type {ngeox.TimeProperty|undefined}
 */
gmfThemes.GmfLayerWMS.prototype.time;


/**
 * @constructor
 * @struct
 * @extends gmfThemes.GmfLayer
 */
gmfThemes.GmfLayerWMTS = function() {};


/**
 * 'image/png' or 'image/jpeg'.
 * @type {string}
 */
gmfThemes.GmfLayerWMTS.prototype.imageType;


/**
 * @type {string}
 */
gmfThemes.GmfLayerWMTS.prototype.layer;


/**
 * @type {string}
 */
gmfThemes.GmfLayerWMTS.prototype.matrixSet;


/**
 * @type {string}
 */
gmfThemes.GmfLayerWMTS.prototype.url;


/**
 * Additional attributes related on a WMS layers (or WFS features type).
 * @constructor
 * @struct
 */
gmfThemes.GmfLayerChildLayer = function() {};


/**
 * The min resolution where the layer is visible.
 * @type {number}
 */
gmfThemes.GmfLayerChildLayer.prototype.maxResolutionHint;


/**
 * The max resolution where the layer is visible.
 * @type {number}
 */
gmfThemes.GmfLayerChildLayer.prototype.minResolutionHint;


/**
 * @type {string}
 */
gmfThemes.GmfLayerChildLayer.prototype.name;


/**
 * @type {boolean}
 */
gmfThemes.GmfLayerChildLayer.prototype.queryable;


/**
 * @typedef {!Object<string, !gmfThemes.GmfOgcServer>}
 */
gmfThemes.GmfOgcServers;


/**
 * @constructor
 * @struct
 */
gmfThemes.GmfOgcServer = function() {};


/**
 * @type {boolean}
 */
gmfThemes.GmfOgcServer.prototype.credential;

/**
 * 'image/png' or 'image/jpeg'.
 * @type {string}
 */
gmfThemes.GmfOgcServer.prototype.imageType;


/**
 * @type {boolean}
 */
gmfThemes.GmfOgcServer.prototype.isSingleTile;


/**
 * 'mapserver', 'qgisserver', 'geoserver' or 'other'.
 * @type {string}
 */
gmfThemes.GmfOgcServer.prototype.type;


/**
 * @type {string}
 */
gmfThemes.GmfOgcServer.prototype.url;


/**
 * The WFS URL.
 * @type {string}
 */
gmfThemes.GmfOgcServer.prototype.urlWfs;


/**
 * @type {boolean}
 */
gmfThemes.GmfOgcServer.prototype.wfsSupport;

/**
 * @constructor
 * @struct
 */
gmfThemes.GmfFunctionalities = function() {};


/**
 * The default base map.
 * @type {!Array.<!string>}
 */
gmfThemes.GmfFunctionalities.prototype.default_basemap;


/**
 * When set, contains the name of the panel to open upon loading an application.
 * Note: altough this is a list, only one can be defined.
 * @type {Array.<!string>|undefined}
 */
gmfThemes.GmfFunctionalities.prototype.open_panel;


/**
 * Name of the layer (data source) that should be toggled in the filter tool
 * upon loading an application.
 * Note: altough this is a list, only one can be defined.
 * @type {Array.<!string>|undefined}
 */
gmfThemes.GmfFunctionalities.prototype.preset_layer_filter;


/**
 * @constructor
 * @struct
 */
gmfThemes.GmfMetaData = function() {};


/**
 * Names of layers on which the geometry can be copied to (in the edition mode).
 * For WMS layers and only for CGXP ! (Use "copyable" in NGEO.)
 * @type {Array.<string>|undefined}
 */
gmfThemes.GmfMetaData.prototype.copy_to;


/**
 * Whether the geometry from this data source can be copied to other data
 * sources or not. Defaults to false.
 * Default to false.
 * For WMS layers.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.copyable;


/**
 * List of attribute names which should have rules already ready when using
 * the filter tools.
 * For WMS layers.
 * @type {Array.<string>|undefined}
 */
gmfThemes.GmfMetaData.prototype.directedFilterAttributes;


/**
 * The disclaimer text for this element.
 * For WMS and WMTS layers, layer groups and themes.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.disclaimer;


/**
 * List of attribute names which have enumerated attribute values (for filters
 * purpose).
 * For WMS layers.
 * @type {Array.<string>|undefined}
 */
gmfThemes.GmfMetaData.prototype.enumeratedAttributes;


/**
 * Whether geometries must be validated by PostgreSQL on edition.
 * Default to false.
 * For WMS layers.
 * Also working in CGXP.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.geometry_validation;


/**
 * The URL of the icon to display in the layer tree.
 * For WMS and WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.iconUrl;


/**
 * The field used in the 'display query window' as feature title.
 * For WMS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.identifierAttributeField;


/**
 * Is the layer checked by default.
 * Default to false.
 * For WMS and WMTS layers.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isChecked;


/**
 * Whether the layer group is expanded by default.
 * Default to false.
 * For layer groups (only).
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isExpanded;

/**
 * Whether the print should rotate the symbols.
 * Default to true.
 * For layer groups (only).
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.printNativeAngle;


/**
 * Whether the legend is expanded by default.
 * Default to false.
 * For WMS and WMTS layers.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isLegendExpanded;


/**
 * 'Date' column that will be automatically updated after editing an element.
 * For WMS layers.
 * Also working in CGXP.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.lastUpdateDateColumn;


/**
 * 'User' column that will be automatically updated after editing an element.
 * For WMS layers.
 * Also working in CGXP.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.lastUpdateUserColumn;



/**
 * Display the legend of this layers.
 * Default to false.
 * For WMS and WMTS layers.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.legend;


/**
 * The URL to the image used as a legend in the layer tree.
 * For WMS and WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.legendImage;


/**
 * The WMS 'RULE' parameter used to display the icon in the layer tree.
 * "Short version" of the 'iconURL' metadata for WMS layers.
 * For WMS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.legendRule;


/**
 * The max resolution where the layer is visible.
 * For WMS layers.
 * On WMTS layers it will have effect on the node in the layertree but not on
 * the layertree directly.
 * @type {number|undefined}
 */
gmfThemes.GmfMetaData.prototype.maxResolution;


/**
 * The URL to the informations on this layer.
 * For WMS and WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.metadataUrl;


/**
 * The min resolution where the layer is visible.
 * For WMS layers.
 * On WMTS layers it will have effect on the node in the layertree but not on
 * the layer directly.
 * @type {number|undefined}
 */
gmfThemes.GmfMetaData.prototype.minResolution;


/**
 * The corresponding OGC server for a WMTS layer.
 * For WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.ogcServer;


/**
 * Layer opacity.
 * Default to 1.0 (fuly visible, 0 means invisible)
 * For WMS and WMTS layers.
 * @type {number|undefined}
 */
gmfThemes.GmfMetaData.prototype.opacity;


/**
 * A WMS layer that will be used instead of the WMTS layers in the print. Used
 * to increase quality of printed WMTS layers.
 * For WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.printLayers;


/**
 * The WMS layers used as references to query the WMTS layers.
 * For WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.queryLayers;


/**
 * The icon visible in the background selector.
 * For WMS and WMTS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.thumbnail;


/**
 * The name of the time attribute.
 * For WMS(-T) layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.timeAttribute;


/**
 * The snapping configuration for the leaf. If set, the leaf's layer is
 * considered to be "snappable", even if the config itself is empty.
 * Example of value: {'tolerance': 50, 'edge': false}
 * For WMS layers.
 * @type {gmfThemes.GmfSnappingConfig|undefined}
 */
gmfThemes.GmfMetaData.prototype.snappingConfig;


/**
 * A corresponding WMS layer for a WMTS layers. Used to query the WMTS layers
 * and to print it. (See also printLayers and queryLayers metadata for more
 * granularity).
 * For WMTS Layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.wmsLayers;


/**
 * @constructor
 * @struct
 */
gmfThemes.GmfSnappingConfig = function() {};


/**
 * Determines whethers the edges of features from the node layer can be snapped
 * or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
gmfThemes.GmfSnappingConfig.prototype.edge;


/**
 * The tolerance in pixels the snapping should occur for the node layer.
 * Defaults to `10`.
 * @type {number|undefined}
 */
gmfThemes.GmfSnappingConfig.prototype.tolerance;


/**
 * Determines whethers the vertices of features from the node layer can be
 * snapped or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
gmfThemes.GmfSnappingConfig.prototype.vertex;


/**
 * @record
 * @struct
 */
gmfThemes.GmfLayerAttributeValuesResponse = function() {};


/**
 * @type {Array.<gmfThemes.GmfLayerAttributeValue>}
 */
gmfThemes.GmfLayerAttributeValuesResponse.prototype.items;


/**
 * @record
 * @struct
 */
gmfThemes.GmfLayerAttributeValue = function() {};


/**
 * @type {string}
 */
gmfThemes.GmfLayerAttributeValue.prototype.label;


/**
 * @type {string}
 */
gmfThemes.GmfLayerAttributeValue.prototype.value;
