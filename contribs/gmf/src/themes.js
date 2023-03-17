/**
 * The GeoMapFish "themes" web service.
 */

/**
 * @typedef {Object} GmfThemes
 */

/**
 * @typedef {Object} GmfThemesResponse
 * @property {!Array.<!GmfLayer|!GmfGroup>} background_layers
 * @property {!Array.<string>} errors
 * @property {!GmfOgcServers} ogcServers
 * @property {!Array.<!GmfTheme>} themes
 */

/**
 * @typedef {Object} GmfRootNode
 * @property {!Array.<!GmfGroup>} children
 */

/**
 * Contains the common element of all the elements of the GeoMapFish layer tree.
 * @typedef {Object} GmfBaseNode
 * @property {number} id
 * @property {!GmfMetaData} metadata The related metadata.
 * @property {string} name
 */

/**
 * The element we can select in the theme selector.
 * extends GmfBaseNode
 * @typedef {Object} GmfTheme
 * @property {number} id (GmfBaseNode)
 * @property {!GmfMetaData} metadata (GmfBaseNode)
 * @property {string} name (GmfBaseNode)
 * @property {!Array.<!GmfGroup>} children The first level layer groups.
 * @property {!GmfFunctionalities} functionalities
 */

/**
 * A GeoMapFish group
 * not an OpenLayers group
 * neither a WMS group.
 * This represent « first level group » (Block in the layer tree),
 * or all sub nodes that's not al leaf.
 * extends GmfBaseNode
 * @typedef {Object} GmfGroup
 * @property {number} id (GmfBaseNode)
 * @property {!GmfMetaData} metadata (GmfBaseNode)
 * @property {string} name (GmfBaseNode)
 * @property {!Array.<!GmfGroup|!GmfLayer>} children
 * @property {!import('ngeo/datasource/OGC.js').Dimensions} dimensions The dimensions managed by the
 *      OpenLayers layer, if the value is null we will take the dimension from the application.
 *      This is present only on non mixed first level group.
 * @property {boolean} mixed A mixed group is a group on which one the layers comes from different sources,
 *      then all the sub GeoMapFish layers (leaf) will be an OpenLayers layer.
 *      By opposition a non mixed first level group contains only GeoMapFish layers WMS
 *      from the same server, then we have only one OpenLayers layer for all the first level group.
 *      All the group child will have the same value of his parent,
 *      In other word, all the group of a first level group will have the same value.
 * @property {string} [ogcServer] On non mixed first level group it is the ogc server to use.
 * @property {import('ngeo/datasource/OGC.js').TimeProperty} [time] On non mixed first level group with more
 *      then one time layer, it is the time information.
 */

/**
 * A GeoMapFish layer
 * not an OpenLayers layer
 * neither a WMS layer.
 * This is also the leaf of the tree.
 * extends GmfBaseNode
 * @typedef {Object} GmfLayer
 * @property {number} id (GmfBaseNode)
 * @property {!GmfMetaData} metadata (GmfBaseNode)
 * @property {string} name (GmfBaseNode)
 * @property {!import('ngeo/datasource/OGC.js').Dimensions} dimensions The dimensions managed by the layer,
 *      if the value is null we will take the dimension from the application.
 *      Present only on layer in a mixed group.
 * @property {!import('ngeo/datasource/OGC.js').DimensionsFiltersConfig} dimensionsFilters The dimensions
 *      applied by filters on the layer configuration, if the value is null we will take the dimension from
 *      the application.
 * @property {boolean} [editable]
 * @property {string} [style]
 * @property {string} type WMS or WMTS.
 * @property {string} [ogcServer]
 */

/**
 * extends GmfLayer
 * @typedef {Object} GmfLayerWMS
 * @property {number} id (GmfBaseNode)
 * @property {!GmfMetaData} metadata (GmfBaseNode)
 * @property {string} name (GmfBaseNode)
 * @property {!import('ngeo/datasource/OGC.js').Dimensions} dimensions (GmfLayer)
 * @property {!import('ngeo/datasource/OGC.js').DimensionsFiltersConfig} dimensionsFilters (GmfLayer)
 * @property {boolean} [editable] (GmfLayer)
 * @property {string} [style] (GmfLayer)
 * @property {string} type (GmfLayer)
 * @property {!Array.<!GmfLayerChildLayer>} childLayers
 * @property {string} layers The comma separated list of WMS layers or groups.
 * @property {number} maxResolutionHint The max resolution where the layer is visible.
 * @property {number} minResolutionHint The min resolution where the layer is visible.
 * @property {string} [ogcServer]
 * @property {import('ngeo/datasource/OGC.js').TimeProperty} [time] The time information if the layer
 *      directly manage it, see also `{GmfGroup.time}`.
 */

/**
 * extends GmfLayer
 * @typedef {Object} GmfLayerWMTS
 * @property {number} id (GmfBaseNode)
 * @property {!GmfMetaData} metadata (GmfBaseNode)
 * @property {string} name (GmfBaseNode)
 * @property {!import('ngeo/datasource/OGC.js').Dimensions} dimensions (GmfLayer)
 * @property {!import('ngeo/datasource/OGC.js').DimensionsFiltersConfig} dimensionsFilters (GmfLayer)
 * @property {boolean} [editable] (GmfLayer)
 * @property {string} [style] (GmfLayer)
 * @property {string} type (GmfLayer)
 * @property {string} imageType 'image/png' or 'image/jpeg'.
 * @property {string} layer
 * @property {string} matrixSet
 * @property {string} url
 */

/**
 * Additional attributes related on a WMS layers (or WFS features type).
 * @typedef {Object} GmfLayerChildLayer
 * @property {number} maxResolutionHint The min resolution where the layer is visible.
 * @property {number} minResolutionHint The max resolution where the layer is visible.
 * @property {string} name
 * @property {boolean} queryable
 */

/**
 * @typedef {!Object<string, !GmfOgcServer>} GmfOgcServers
 */

/**
 * @typedef {Object} GmfOgcServerAttribute
 * @property {string} namespace The attribute namespace.
 * @property {string} type The attribute type (in namspace).
 */

/**
 * @typedef {Object} GmfOgcServer
 * @property {boolean} credential
 * @property {string} imageType 'image/png' or 'image/jpeg'.
 * @property {boolean} isSingleTile
 * @property {string} [namespace] Namespace
 * @property {string} type 'mapserver', 'qgisserver', 'geoserver' or 'other'.
 * @property {string} url
 * @property {string} urlWfs The WFS URL.
 * @property {string} [wfsFeatureNS] WFS feature namespace
 * @property {boolean} wfsSupport
 * @property {string} geometryName The geometry name
 * @property {Object<string, Object<string, GmfOgcServerAttribute>>} attributes
 */

/**
 * @typedef {Object} GmfFunctionalities
 * @property {Array.<!string>} [default_basemap] The default base map.
 * @property {Array.<!string>} [open_panel] When set, contains the name of the panel to open upon loading an
 *      application.
 *      Note: although this is a list, only one can be defined.
 * @property {Array.<!string>} [preset_layer_filter] Name of the layer (data source) that should be toggled
 *      in the filter tool upon loading an application.
 *      Note: although this is a list, only one can be defined.
 */

/**
 * @typedef {Object} GmfMetaData
 * @property {boolean} [copyable=false] Whether the geometry from this data source can be copied to other data
 *      sources or not. For WMS layers.
 * @property {Array.<string>} [directedFilterAttributes] List of attribute names which should have rules
 *      already ready when using the filter tools. For WMS layers.
 * @property {string} [disclaimer] The disclaimer text for this element.
 *      For WMS and WMTS layers, layer groups and themes.
 * @property {Array.<string>} [enumeratedAttributes] List of attribute names which have enumerated attribute
 *      values (for filters purpose). For WMS layers.
 * @property {boolean} [exclusiveGroup=false] Whether the group contains children that have to be mutually
 *      exclusive, meaning that only one child may be ON at any time.
 * @property {string} [iconUrl] The URL of the icon to display in the layer tree. For WMS and WMTS layers.
 * @property {string} [identifierAttributeField] The field used in the 'display query window' as feature
 *      title. For WMS layers.
 * @property {boolean} [isChecked=false] Is the layer checked by default. For WMS and WMTS layers.
 * @property {boolean} [isExpanded=false] Whether the layer group is expanded by default. For layer groups
 *      (only).
 * @property {boolean} [printNativeAngle=true] Whether the print should rotate the symbols. For layer groups
 *      (only).
 * @property {boolean} [isLegendExpanded=false] Whether the legend is expanded by default. For WMS and
 *      WMTS layers.
 * @property {boolean} [legend=false] Display the legend of this layer. For WMS and WMTS layers.
 * @property {string} [legendImage] The URL to the image used as a legend in the layer tree. For WMS and
 *      WMTS layers.
 * @property {Object<string, string>} [hiDPILegendImages] The URLs to the hi DPI images used as a legend
 *      in the layer tree. For WMS and WMTS layers.
 * @property {string} [legendRule] The WMS 'RULE' parameter used to display the icon in the layer tree.
 *      "Short version" of the 'iconURL' metadata for WMS layers. For WMS layers.
 * @property {number} [maxResolution] The max resolution where the layer is visible. For WMS layers.
 *      On WMTS layers it will have an effect on the node in the layertree but not on the layertree directly.
 * @property {string} [metadataUrl] The URL to the information on this layer. For WMS and WMTS layers.
 * @property {number} [minResolution] The min resolution where the layer is visible. For WMS layers.
 *      On WMTS layers it will have an effect on the node in the layertree but not on the layer directly.
 * @property {string} [ogcServer] The corresponding OGC server for a WMTS layer. For WMTS layers.
 * @property {number} [opacity=1.0] Layer opacity. 1.0 means fully visible, 0 means invisible, For WMS and
 *      WMTS layers.
 * @property {string} [printLayers] A WMS layer that will be used instead of the WMTS layers in the print.
 *      Used to increase quality of printed WMTS layers. For WMTS layers.
 * @property {string} [queryLayers] The WMS layers used as references to query the WMTS layers. For WMTS
 *      layers.
 * @property {string} [thumbnail] The icon visible in the background selector. For WMS and WMTS layers.
 * @property {string} [timeAttribute] The name of the time attribute. For WMS(-T) layers.
 * @property {GmfSnappingConfig} [snappingConfig] The snapping configuration for the leaf. If set, the
 *      leaf's layer is considered to be "snappable", even if the config itself is empty.
 *      Example value: {'tolerance': 50, 'edge': false} For WMS layers.
 * @property {string} [wmsLayers] A corresponding WMS layer for WMTS layers. Used to query the WMTS layers
 *      and to print them. (See also printLayers and queryLayers metadata for more
 *      granularity). For WMTS Layers.
 */

/**
 * @typedef {Object} GmfSnappingConfig
 * @property {boolean} [edge=true] Determines whethers the edges of features from the node layer can be
 * snapped or not.
 * @property {number} [tolerance=10] The tolerance in pixels the snapping should occur for the node layer.
 * @property {boolean} [vertex=true] Determines whethers the vertices of features from the node layer can be
 * snapped or not.
 * @property {boolean} [invertXY=false] Switches coordinates while reading a GML getFeature request
 */

/**
 * @typedef {Object} GmfLayerAttributeValuesResponse
 * @property {Array.<GmfLayerAttributeValue>} items
 */

/**
 * @typedef {Object} GmfLayerAttributeValue
 * @property {string} label
 * @property {string} value
 */

export default null;
