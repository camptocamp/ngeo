/**
 * Externs for the GeoMapFish "themes" web service.
 *
 * @externs
 */


/**
 * @type {Object}
 */
var gmfThemes;

/**
 * @typedef {{
 *     background_layers: Array.<gmfThemes.GmfLayer>,
 *     errors: Array.<string>,
 *     ogcServers: gmfThemes.GmfOgcServers,
 *     themes: Array.<gmfThemes.GmfTheme>
 * }}
 */
gmfThemes.GmfThemesResponse;


/**
 * @typedef {{
 *   children: Array.<gmfThemes.GmfGroup>
 * }}
 */
gmfThemes.GmfRootNode;


/**
 * @type {Array.<gmfThemes.GmfGroup>}
 */
gmfThemes.GmfRootNode.prototype.children;

/**
 * Contains the common element of all the elements of the GeoMapFisf layer tree.
 * @typedef {{
 *   id: number,
 *   metadata: gmfThemes.GmfMetaData,
 *   name: string
 * }}
 */
gmfThemes.GmfBaseNode;


/**
 * @type {number}
 */
gmfThemes.GmfBaseNode.prototype.id;


/**
 * The related metadata.
 * @type {gmfThemes.GmfMetaData}
 */
gmfThemes.GmfBaseNode.prototype.metadata;


/**
 * @type {string}
 */
gmfThemes.GmfBaseNode.prototype.name;


/**
 * The element we can select in the theme selector.
 * @typedef {{
 *   children: Array.<gmfThemes.GmfGroup>,
 *   functionalities: Object.<string, Array.<string|number>>
 * }}
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfTheme;


/**
 * The first level layer groups.
 * @type {Array.<gmfThemes.GmfGroup>}
 */
gmfThemes.GmfTheme.prototype.children;


/**
 * The Functionalities related to the theme.
 * @type {Object.<string, Array.<string|number>>}
 */
gmfThemes.GmfTheme.prototype.functionalities;


/**
 * A GeoMapFish group
 * not an OpenLayers group
 * neither a WMS group.
 * This represent « first level group » (Block in the layer tree),
 * or all sub nodes that's not al leaf.
 * @typedef {{
 *   children: Array.<gmfThemes.GmfGroup|gmfThemes.GmfLayer>,
 *   dimensions: Object.<string, string>,
 *   mixed: boolean,
 *   ogcServer: (string|undefined),
 *   time: (ngeox.TimeProperty|undefined)
 * }}
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfGroup;


/**
 * @type {Array.<gmfThemes.GmfGroup|gmfThemes.GmfLayer>}
 */
gmfThemes.GmfGroup.prototype.children;


/**
 * The dimensions managed by the OpenLayers layer, if the value is null we will take the dimension from the application.
 * This is present only on non mixed first level group.
 * @type {Object.<string, string>}
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
 * @typedef {{
 *   dimensions: Object.<string, string>,
 *   editable: (boolean|undefined),
 *   style: (string|undefined),
 *   type: string
 * }}
 * @extends gmfThemes.GmfBaseNode
 */
gmfThemes.GmfLayer;


/**
 * The dimensions managed by the layer, if the value is null we will take the dimension from the application.
 * Present only on layer in a mixed group.
 * @type {Object.<string, string>}
 */
gmfThemes.GmfLayer.prototype.dimensions;


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
 * @typedef {{
 *   childLayers: Array.<gmfThemes.GmfLayerChildLayer>,
 *   layers: string,
 *   maxResolutionHint: number,
 *   minResolutionHint: number,
 *   ogcServer: (string|undefined),
 *   time: (ngeox.TimeProperty|undefined)
 * }}
 * @extends gmfThemes.GmfLayer
 */
gmfThemes.GmfLayerWMS;


/**
 * @type {Array.<gmfThemes.GmfLayerChildLayer>}
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
 * @typedef {{
 *   imageType: string,
 *   layer: string,
 *   matrixSet: string,
 *   url: string
 * }}
 * @extends gmfThemes.GmfLayer
 */
gmfThemes.GmfLayerWMTS;


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
 * @typedef {{
 *   maxResolutionHint: number,
 *   minResolutionHint: number,
 *   name: string,
 *   queryable: boolean
 * }}
 */
gmfThemes.GmfLayerChildLayer;


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
 * @typedef {Object<string, gmfThemes.GmfOgcServer>}
 */
gmfThemes.GmfOgcServers;


/**
 * @typedef {{
 *   imageType: string,
 *   isSingleTile: boolean,
 *   type: string,
 *   url: string,
 *   urlWfs: string,
 *   wfsSupport: boolean
 * }}
 */
gmfThemes.GmfOgcServer;


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
 * @typedef {{
 *   disclaimer: (string|undefined),
 *   iconUrl: (string|undefined),
 *   identifierAttributeField: (string|undefined),
 *   isChecked: (boolean|undefined),
 *   isExpanded: (boolean|undefined),
 *   isLegendExpanded: (boolean|undefined),
 *   legend: (boolean|undefined),
 *   legendImage: (string|undefined),
 *   legendRule: (string|undefined),
 *   maxResolution: (number|undefined),
 *   metadataUrl: (string|undefined),
 *   minResolution: (number|undefined),
 *   ogcServer: (string|undefined),
 *   printLayers: (string|undefined),
 *   snappingConfig: (gmfThemes.GmfSnappingConfig|undefined)
 *   thumbnail: (string|undefined),
 *   wmsLayers: (string|undefined),
 * }}
 */
gmfThemes.GmfMetaData;


/**
 * The disclaimer.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.disclaimer;


/**
 * The icon URL visible in the layer tree.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.iconUrl;


/**
 * The field used in the display query window as feature title.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.identifierAttributeField;


/**
 * Is the layer checked by default.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isChecked;


/**
 * Group expanded by default.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isExpanded;


/**
 * Legend expanded by default.
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.isLegendExpanded;


/**
 * Display the legend (default true).
 * @type {boolean|undefined}
 */
gmfThemes.GmfMetaData.prototype.legend;


/**
 * The URL to the image used as a legend in the layer tree.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.legendImage;


/**
 * The WMS rule used to get the icon visible in the layer tree.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.legendRule;


/**
 * The max resolution where the layer is visible.
 * @type {number|undefined}
 */
gmfThemes.GmfMetaData.prototype.maxResolution;


/**
 * The Metadata URL.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.metadataUrl;


/**
 * The min resolution where the layer is visible.
 * @type {number|undefined}
 */
gmfThemes.GmfMetaData.prototype.minResolution;


/**
 * The corresponding OGC server for GeoMapFish layer WMTS.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.ogcServer;


/**
 * On GeoMapFish layer WMTS the WMS layers used in the print.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.printLayers;


/**
 * On GeoMapFish layer WMTS the WMS layers used to query.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.queryLayers;


/**
 * The icon visible in the theme selector.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.thumbnail;


/**
 * The snapping configuration for the leaf. If set, the leaf's layer is
 * considered to be "snappable", even if the config itself is empty.
 *
 * @type {gmfThemes.GmfSnappingConfig|undefined}
 */
gmfThemes.GmfMetaData.prototype.snappingConfig;


/**
 * On GeoMapFish layer WMTS the corresponding WMS layers.
 * @type {string|undefined}
 */
gmfThemes.GmfMetaData.prototype.wmsLayers;


/**
 * @typedef {{
 *   edge: (boolean|undefined),
 *   tolerance: (number|undefined),
 *   vertex: (boolean|undefined)
 * }}
 */
gmfThemes.GmfSnappingConfig;


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
