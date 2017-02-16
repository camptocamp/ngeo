/**
 * This file contains the typedefs of the options of the methods.
 * It can be included as extern if you want to prevent renaming.
 * @externs
 */

/**
 * @private
 * @type {Object}
 */
let ngeox;


/**
 * A feature attribute definition.
 * @typedef {{
 *     choices: (Array.<string>|undefined),
 *     geomType: (string|undefined),
 *     name: (string),
 *     required: (boolean|undefined),
 *     type: (string)
 * }}
 */
ngeox.Attribute;


/**
 * The list of possible values for the attribute.
 * @type {Array.<string>|undefined}
 */
ngeox.Attribute.prototype.choices;


/**
 * Set only if the attribute is a geometry type. Determines the type of
 * geometry.
 * @type {string|undefined}
 */
ngeox.Attribute.prototype.geomType;


/**
 * The attribute name.
 * @type {string}
 */
ngeox.Attribute.prototype.name;


/**
 * Whether the attribute required to have a value set or not. Defaults to
 * `false`.
 * @type {boolean|undefined}
 */
ngeox.Attribute.prototype.required;


/**
 * The attribute type, which determines how to render it.
 * @type {string}
 */
ngeox.Attribute.prototype.type;


/**
 * The definition of a single layer (WMS) and/or featureType (WFS).
 * @record
 * @struct
 */
ngeox.DataSourceLayer = function() {};


/**
 * The maximum resolution the layer should be rendered (when visible).
 * @type {number|undefined}
 */
ngeox.DataSourceLayer.prototype.maxResolution;


/**
 * The minimum resolution the layer should be rendered (when visible).
 * @type {number|undefined}
 */
ngeox.DataSourceLayer.prototype.minResolution;


/**
 * The layer name (WMS) and/or feature type name (WFS)
 * @type {string}
 */
ngeox.DataSourceLayer.prototype.name;


/**
 * Whether the the layer is queryable or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.DataSourceLayer.prototype.queryable;


/**
 * The options to create a `ngeo.DataSource` with.
 * @record
 * @struct
 */
ngeox.DataSourceOptions = function() {};


/**
 * The dimensions that are currently active on the data source.
 * @type {Object.<string, string>|undefined}
 */
ngeox.DataSourceOptions.prototype.activeDimensions;


/**
 * The attributes of the data source.
 * @type {Array.<ngeox.Attribute>|undefined}
 */
ngeox.DataSourceOptions.prototype.attributes;


/**
 * Whether the geometry from this data source can be copied to other data
 * sources or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.copyable;


/**
 * The dimensions this data source supports.
 * @type {Object.<string, string>|undefined}
 */
ngeox.DataSourceOptions.prototype.dimensions;


/**
 * The name of the geometry attribute.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.geometryName;


/**
 * (Required) The data source id.
 * @type {number}
 */
ngeox.DataSourceOptions.prototype.id;


/**
 * The name of an attribute among the attributes of the data source.
 * The value of that attribute, in records, can be used to identify
 * each record individually.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.identifierAtttribute;


/**
 * A data source is considered 'in range' when it is synchronized to
 * a map view and the resolution of that view is within the range of
 * the `maxResolution` and `minResolution`. These 2 properties are
 * required for the `inRange` property to be dynamic, otherwise its
 * value is always `true` by default.
 *
 * The synchronization is made in the `ngeo.syncDataSourcesMap` service.
 *
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.inRange;


/**
 * Maximum resolution where the data source can be displayed or queried.
 * @type {number|undefined}
 */
ngeox.DataSourceOptions.prototype.maxResolution;


/**
 * Minimum resolution where the data source can be displayed or queried.
 * @type {number|undefined}
 */
ngeox.DataSourceOptions.prototype.minResolution;


/**
 * (Required) A human-readable name for the data source.
 * @type {string}
 */
ngeox.DataSourceOptions.prototype.name;


/**
 * The type of images to fetch by queries by the (WMS) or (WMTS) .
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.ogcImageType;


/**
 * A list of layer definitions that are used by (WMS) and (WFS) queries.
 * These are **not** used by the (WMTS) queries (the wmtsLayers is used
 * by WMTS queries).
 * @type {Array.<ngeox.DataSourceLayer>|undefined}
 */
ngeox.DataSourceOptions.prototype.ogcLayers;


/**
 * The type of OGC server.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.ogcServerType;


/**
 * The type data source. Can be: 'WMS' or 'WMTS'.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.ogcType;


/**
 * Whether the geometry from this data source can be used to snap the geometry
 * of features from other data sources that are being edited. Defaults to
 * `false`.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.snappable;


/**
 * Determines whether external features can be snapped to the edges of
 * features from this data source or not. Defaults to `true`. Requires
 * `snappable` to be set.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.snappingToEdges;


/**
 * Determines whether external features can be snapped to the vertice of
 * features from this data source or not. Defaults to `true`. Requires
 * `snappable` to be set.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.snappingToVertice;


/**
 * The tolerance in pixels the snapping should occur. Defaults to `10`.
 * @type {number|undefined}
 */
ngeox.DataSourceOptions.prototype.snappingTolerance;


/**
 * Whether the data source is visible or not, i.e. whether its is ON or OFF.
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.visible;


/**
 * The feature namespace to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wfsFeatureNS;


/**
 * The feature prefix to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wfsFeaturePrefix;


/**
 * The OutputFormat to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wfsOutputFormat;


/**
 * The url to use for (WFS) requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wfsUrl;


/**
 * The InfoFormat to use with WMS requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wmsInfoFormat;


/**
 * Whether the (WMS) images returned by this data source should be single tiles
 * or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.DataSourceOptions.prototype.wmsIsSingleTile;


/**
 * The url to use for (WMS) requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wmsUrl;


/**
 * The layer name to use for the (WMTS) requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wmtsLayer;


/**
 * The url to use for (WMTS) requests.
 * @type {string|undefined}
 */
ngeox.DataSourceOptions.prototype.wmtsUrl;


/**
 * The options to use when sending GetFeature/GetFeatureInfo requests using
 * the querent or map query service.
 * @typedef {{
 *     coordinate: (ol.Coordinate|undefined),
 *     dataSources: (Array.<ngeo.DataSource>|undefined),
 *     extent: (ol.Extent|undefined),
 *     limit: (number|undefined),
 *     map: (ol.Map),
 *     queryableDataSources: (ngeox.QueryableDataSources|undefined),
 *     tolerancePx: (number|undefined),
 *     wfsCount: (boolean|undefined)
 * }}
 */
ngeox.IssueGetFeaturesOptions;


/**
 * The coordinate to issue the requests with, which can end up with either
 * WMS or WFS requests.
 * @type {ol.Coordinate|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.coordinate;


/**
 * List of data sources to query. Only those that meet the requirements will
 * actually be queried. The querent service requires either the `dataSources`
 * or `queryableDataSources` property to be set.
 * @type {Array.<ngeo.DataSource>|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.dataSources;


/**
 * The extent to issue the requests with, which can end up with WFS requests
 * only.
 * @type {ol.Extent|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.extent;


/**
 * The maximum number of features to get per request.
 * @type {number|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.limit;


/**
 * The ol3 map object. Used to fill some parameters of the queries, such as
 * 'srs' and filter the queryable layers within the data sources.
 * @type {ol.Map}
 */
ngeox.IssueGetFeaturesOptions.prototype.map;


/**
 * A hash of queryable data sources, which must meet all requirements. The
 * querent service requires either the `dataSources` or `queryableDataSources`
 * property to be set.
 * @type {ngeox.QueryableDataSources|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.queryableDataSources;


/**
 * A tolerance value in pixels used to create an extent from a coordinate
 * to issue WFS requests.
 * @type {number|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.tolerancePx;


/**
 * When set, before making WFS GetFeature requests to fetch features,
 * WFS GetFeature requests with `resultType = 'hits'` are made first. If
 * the number of records for the request would exceed the limit, then
 * no features are returned.
 * @type {boolean|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.wfsCount;


/**
 * A hash that contains 2 lists of queryable data sources: `wfs` and `wms`.
 * The same data source can only be in one of the two lists. The `wfs` list
 * has priority, i.e. if the data source supports WFS, it's put in the
 * `wfs` list.
 *
 * @typedef {{
 *     wfs: (!Array.<!ngeo.DataSource>),
 *     wms: (!Array.<!ngeo.DataSource>)
 * }}
 */
ngeox.QueryableDataSources;


/**
 * List of queryable data sources that support WFS.
 * @type {Array.<ngeo.DataSource>}
 */
ngeox.QueryableDataSources.prototype.wfs;


/**
 * List of queryable data sources that support WMS.
 * @type {Array.<ngeo.DataSource>}
 */
ngeox.QueryableDataSources.prototype.wms;


/**
 * Hash of features by data source ids.
 * @typedef {!Object.<number, !Array.<!ol.Feature>>}
 */
ngeox.QuerentResult;


/**
 * The definition of a result item returned by the querent service.
 *
 * @typedef {{
 *     features: (Array.<ol.Feature>),
 *     tooManyFeatures: (boolean|undefined),
 *     totalFeatureCount: (number|undefined)
 * }}
 */
ngeox.QuerentResultItem;


/**
 * The list of features that were returned by the query.
 * @type {Array.<ol.Feature>}
 */
ngeox.QuerentResultItem.prototype.features;


/**
 * Set if the query would have returned to many features. When set, no features
 * are returned.
 * @type {boolean|undefined}
 */
ngeox.QuerentResultItem.prototype.tooManyFeatures;


/**
 * The total number of features that would have been returned by the query.
 * @type {number|undefined}
 */
ngeox.QuerentResultItem.prototype.totalFeatureCount;


/**
 * @interface
 */
ngeox.MenuEvent = function() {};


/**
 * @type {string}
 */
ngeox.MenuEvent.prototype.action;


/**
 * The options for the contextual menu overlay.
 * @typedef {{
 *     actions: (Array.<ngeox.MenuActionOptions>),
 *     autoClose: (boolean|undefined)
 * }}
 */
ngeox.MenuOptions;


/**
 * A list of menu actions.
 * @type {Array.<ngeox.MenuActionOptions>}
 */
ngeox.MenuOptions.prototype.actions;


/**
 * Whether to automatically close the contextual menu when an action is
 * clicked or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
ngeox.MenuOptions.prototype.autoClose;


/**
 * A title to display as header of the contextual menu.
 * @type {string|undefined}
 */
ngeox.MenuOptions.prototype.title;


/**
 * The options for an action item for the contextual menu overlay.
 * @typedef {{
 *     cls: (string|undefined),
 *     label: (string|undefined),
 *     name: (string)
 * }}
 */
ngeox.MenuActionOptions;


/**
 * CSS class name(s) to use for the icon of the action item.
 * @type {string|undefined}
 */
ngeox.MenuActionOptions.prototype.cls;


/**
 * The label to display for the action item. If not defined, the name is used.
 * @type {string|undefined}
 */
ngeox.MenuActionOptions.prototype.label;


/**
 * A unique name for the menu action, which is used in the event fired when
 * the action is clicked.
 * @type {string}
 */
ngeox.MenuActionOptions.prototype.name;


/**
 * A message to display by the ngeo notification service.
 * @typedef {{
 *     delay: (number|undefined),
 *     popup: (boolean|undefined),
 *     msg: (string),
 *     target: (angular.JQLite|Element|string|undefined),
 *     type: (string|undefined)
 * }}
 */
ngeox.Message;


/**
 * The delay in milliseconds the message is shown. Defaults to `7000`.
 * @type {number|undefined}
 */
ngeox.Message.prototype.delay;


/**
 * Whether the message should be displayed inside a popup window or not.
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.Message.prototype.popup;


/**
 * The message text to display
 * @type {string}
 */
ngeox.Message.prototype.msg;


/**
 * The target element (or selector to get the element) in which to display the
 * message. If not defined, then the default target of the notification service
 * is used.
 * @type {angular.JQLite|Element|string|undefined}
 */
ngeox.Message.prototype.target;


/**
 * The type of message. Defaults to `info`.
 * @type {string|undefined}
 */
ngeox.Message.prototype.type;


/**
 * The options for a popup created by the popup factory.
 * @typedef {{
 *     autoDestroy: (boolean|undefined),
 *     cls: (string|undefined),
 *     content: (*|undefined),
 *     height: (string|undefined),
 *     title: (string|undefined),
 *     url: (string|undefined),
 *     width: (string|undefined)
 * }}
 */
ngeox.PopupOptions;


/**
 * Whether the popup should be automatically destroyed when hidden or not.
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.PopupOptions.prototype.autoDestroy;


/**
 * Extra class name to add to the popup.
 * @type {string|undefined}
 */
ngeox.PopupOptions.prototype.cls;


/**
 * The content of the popup. Either the content or URL must be set.
 * @type {*|undefined}
 */
ngeox.PopupOptions.prototype.content;


/**
 * The height of the popup.
 * @type {string|undefined}
 */
ngeox.PopupOptions.prototype.height;


/**
 * The title of the popup.
 * @type {string|undefined}
 */
ngeox.PopupOptions.prototype.title;


/**
 * The URL to use for the iframe to include as content for the popup.
 * @type {string|undefined}
 */
ngeox.PopupOptions.prototype.url;


/**
 * The width of the popup.
 * @type {string|undefined}
 */
ngeox.PopupOptions.prototype.width;


/**
 * Results of the query source.
 * @typedef {{
 *     sources: (!Array.<ngeox.QueryResultSource>),
 *     total: (number),
 *     pending: (boolean)
 * }}
 */
ngeox.QueryResult;


/**
 * Results for each query source.
 * @type {!Array.<ngeox.QueryResultSource>}
 */
ngeox.QueryResult.prototype.sources;


/**
 * The number of results for all sources.
 * @type {number}
 */
ngeox.QueryResult.prototype.total;


/**
 * If at least one source is pending.
 * @type {boolean}
 */
ngeox.QueryResult.prototype.pending;


/**
 * Results for a query source.
 * @typedef {{
 *     features: (Array.<ol.Feature>),
 *     id: (number|string),
 *     label: (string),
 *     pending: (boolean),
 *     queried: (boolean),
 *     tooManyResults: (boolean),
 *     totalFeatureCount: (number|undefined)
 * }}
 */
ngeox.QueryResultSource;


/**
 * The matching features for this source.
 * @type {Array.<ol.Feature>}
 */
ngeox.QueryResultSource.prototype.features;


/**
 * Identifier.
 * @type {number|string}
 */
ngeox.QueryResultSource.prototype.id;


/**
 * Label.
 * @type {string}
 */
ngeox.QueryResultSource.prototype.label;


/**
 * Is the request for this source still ongoing?
 * @type {boolean}
 */
ngeox.QueryResultSource.prototype.pending;


/**
 * Has this source been queried for the last query request?
 * @type {boolean}
 */
ngeox.QueryResultSource.prototype.queried;


/**
 * If the last query for this source would return more features than the
 * configured limit.
 * @type {boolean}
 */
ngeox.QueryResultSource.prototype.tooManyResults;


/**
 * If `tooManyResults` is `true`, this contains the total number of features.
 * @type {number|undefined}
 */
ngeox.QueryResultSource.prototype.totalFeatureCount;


/**
 * The options for the query service.
 * @typedef {{
 *     limit: (number|undefined),
 *     queryCountFirst: (boolean|undefined),
 *     sourceIdsProperty: (string|undefined),
 *     tolerance: (number|undefined),
 *     featureNS: (string|undefined),
 *     featurePrefix: (string|undefined),
 *     geometryName: (string|undefined)
 * }}
 */
ngeox.QueryOptions;


/**
 * The maximum number of records per request the query service should ask.
 * Defaults to `50`. Note that sources sharing the same URL are combined
 * together in a single request. This limit will still apply to those.
 * @type {number|undefined}
 */
ngeox.QueryOptions.prototype.limit;


/**
 * For WFS sources, should the number of features first be requested with
 * `resultType=hits` before requesting the actual features in an seconds request?
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.QueryOptions.prototype.queryCountFirst;


/**
 * Defines the name of the layer property that holds the ids of the sources.
 * Use this if you have more than one source bound to a layer.  Defaults to
 * `querySourceIds`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.sourceIdsProperty;


/**
 * When issuing an identify feature request at a click position, either a WMS GetFeatureInfo
 * or a WFS GetFeature request will be used. For GetFeature requests a bbox is built
 * around the position. This `tolerance` in pixel determines the size of the bbox.
 * The default is `3` pixel.
 * @type {number|undefined}
 */
ngeox.QueryOptions.prototype.tolerance;


/**
 * The feature namespace for WFS GetFeature requests. The default is
 * `http://mapserver.gis.umn.edu/mapserver`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.featureNS;


/**
 * The feature prefix for WFS GetFeature requests. The default is `feature`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.featurePrefix;


/**
 * The name of the geometry property for WFS GetFeature requests. The default is `the_geom`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.geometryName;


/**
 * The configuration of a source for the Query service.
 * @typedef {{
 *     format: (ol.format.Feature|undefined),
 *     id: (number|string),
 *     identifierAttributeField: (string|undefined),
 *     infoFormat: (string|undefined),
 *     label: (string|undefined),
 *     layer: (ol.layer.Base|undefined),
 *     layers: (string|undefined),
 *     params: (Object.<string, *>|undefined),
 *     serverType: (string|undefined),
 *     url: (string|undefined),
 *     validateLayerParams: (boolean|undefined),
 *     wmsSource: (ol.source.ImageWMS|ol.source.TileWMS|undefined),
 *     wfsQuery: (boolean|undefined)
 * }}
 */
ngeox.QuerySource;


/**
 * The used to read the returned features from query requests for this source.
 * @type {ol.format.Feature|undefined}
 */
ngeox.QuerySource.prototype.format;


/**
 * The unique identifier of the source.
 * @type {number|string}
 */
ngeox.QuerySource.prototype.id;


/**
 * The key that identify the title attribute in features.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.identifierAttributeField;


/**
 * The info format to request and read the returned features. Optional.
 * Default value is `geojson`. Possible values are: `geojson`, `gml`.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.infoFormat;


/**
 * The human-readable name of the source. If not set, the `name` property
 * is used instead.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.label;


/**
 * A reference to the ol3 layer object. If not defined, will be automatically
 * fetched using the source `name` and the according layer property that has
 * the same value.
 * @type {ol.layer.Base|undefined}
 */
ngeox.QuerySource.prototype.layer;


/**
 * A reference to the ol3 layers names. Multiple layers names can be separated
 * by a comma.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.layers;


/**
 * Additionnal params to use when querying this source.
 * @type {Object.<string, *>|undefined}
 */
ngeox.QuerySource.prototype.params;


/**
 * Server type of the source. Can be `mapserver` or `geoserver`.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.serverType;


/**
 * URL to use for the request. Required if the layer object doesn't support
 * WMS GetFeatureInfo requests.
 * @type {string|undefined}
 */
ngeox.QuerySource.prototype.url;


/**
 * Whether to validate the LAYERS params of the layer currently being
 * queried. Useful if the source configuration was not given a direct
 * reference to the ol3 WMS source object, i.e. it was given an `url` and
 * `params` properties instead, which resulted in the creation of an
 * inner `ol.source.ImageWMS` object. If that source configuration is attached
 * to a layer that also has an ol3 WMS source object, then the latter may
 * contain more than one layer name within the LAYERS param. In that case,
 * this `validateLayerParams` property, when enabled, will make the query
 * service check if the layer name(s) within its LAYERS params is currently
 * inside the layer source LAYERS params. If it's not there, then the source
 * should not be queried.
 *
 * When setting this option, you must not set the wmsSource or layer if
 * it has an inner ol3 wms source object.
 * @type {boolean|undefined}
 */
ngeox.QuerySource.prototype.validateLayerParams;


/**
 * The ol3 WMS source object used to build the query string. If not defined,
 * the layer source object will be used (if it's WMS), otherwise one will
 * be created by the query service using the `url` and `params` properties of
 * this source.
 * @type {ol.source.ImageWMS|ol.source.TileWMS|undefined}
 */
ngeox.QuerySource.prototype.wmsSource;


/**
 * If this source supports WFS requests.
 * @type {boolean|undefined}
 */
ngeox.QuerySource.prototype.wfsQuery;


/**
 * A WFS type. To be used with {@link ngeox.WfsPermalinkOptions}.
 * @typedef {{
 *     featureType: (string),
 *     label: (string|undefined),
 *     featureNS: (string|undefined),
 *     featurePrefix: (string|undefined)
 * }}
 */
ngeox.WfsType;


/**
 * The feature type name. Required.
 * @type {string}
 */
ngeox.WfsType.prototype.featureType;


/**
 * The field of a feature used as label.
 * @type {string|undefined}
 */
ngeox.WfsType.prototype.label;


/**
 * The namespace URI used for features. If not given, the default namespace set
 * in {@link ngeox.WfsPermalinkOptions} will be used.
 * @type {string|undefined}
 */
ngeox.WfsType.prototype.featureNS;


/**
 * The prefix for the feature namespace. If not given, the default prefix set
 * in {@link ngeox.WfsPermalinkOptions} will be used.
 * @type {string|undefined}
 */
ngeox.WfsType.prototype.featurePrefix;


/**
 * The options for the WFS query service (permalink).
 * @typedef {{
 *     url: (string),
 *     wfsTypes: (!Array.<ngeox.WfsType>),
 *     pointRecenterZoom: (number|undefined),
 *     defaultFeatureNS: (string),
 *     defaultFeaturePrefix: (string),
 *     maxFeatures: (number|undefined)
 * }}
 */
ngeox.WfsPermalinkOptions;


/**
 * URL to the WFS server.
 * @type {string}
 */
ngeox.WfsPermalinkOptions.prototype.url;


/**
 * The queryable WFS types.
 * @type {!Array.<ngeox.WfsType>}
 */
ngeox.WfsPermalinkOptions.prototype.wfsTypes;


/**
 * Zoom level to use when result is a single point feature. If not set the map
 * is not zoomed to a specific zoom level.
 * @type {number|undefined}
 */
ngeox.WfsPermalinkOptions.prototype.pointRecenterZoom;


/**
 * The default namespace URI used for features. This will be used if no custom
 * namespace is given for a WFS type.
 * @type {string}
 */
ngeox.WfsType.prototype.defaultFeatureNS;


/**
 * The default prefix for the feature namespace. This will be used if no custom
 * prefix is given for a WFS type.
 * @type {string}
 */
ngeox.WfsType.prototype.defaultFeaturePrefix;


/**
 * The maximum number of records per request the query service should ask.
 * Defaults to `50`.
 * @type {number|undefined}
 */
ngeox.WfsPermalinkOptions.prototype.maxFeatures;


/**
 * DrawRegularPolygonFromClick Interaction.
 * @typedef {{
 *     angle: (number|undefined),
 *     radius: (number),
 *     sides: (number|undefined)
 * }}
 */
ngeox.interaction.DrawRegularPolygonFromClickOptions;


/**
 * Angle in radians. A value of 0 will have one of the shape's point facing up.
 * Default value is 0.
 * @type {number|undefined}
 * @api
 */
ngeox.interaction.DrawRegularPolygonFromClickOptions.prototype.angle;


/**
 * Radius size in map units.
 * @type {number|undefined}
 * @api
 */
ngeox.interaction.DrawRegularPolygonFromClickOptions.prototype.radius;


/**
 * The number of sides for the regular polygon.
 * Default value is 3.
 * @type {number|undefined}
 * @api
 */
ngeox.interaction.DrawRegularPolygonFromClickOptions.prototype.sides;


/**
 * MobileDraw Interaction.
 * @typedef {{
 *     minPoints: (number|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *     type: ol.geom.GeometryType,
 *     wrapX: (boolean|undefined)
 * }}
 */
ngeox.interaction.MobileDrawOptions;


/**
 * The number of points that must be drawn before a polygon ring or line string
 * can be finished. Default is `3` for polygon rings and `2` for line strings.
 * @type {number|undefined}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.minPoints;


/**
 * Style for sketch features.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.interaction.MobileDrawOptions.prototype.style;


/**
 * Drawing type ('Point' or 'LineString'.
 * @type {ol.geom.GeometryType}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.type;


/**
 * Wrap the world horizontally on the sketch overlay. Default is `false`.
 * @type {boolean|undefined}
 * @api
 */
ngeox.interaction.MobileDrawOptions.prototype.wrapX;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.format;


/**
 * @typedef {{
 *    accuracy: (number|undefined),
 *    encodeStyles: (boolean|undefined),
 *    properties: (function(ol.Feature): Object.<string, (string|undefined)>|undefined),
 *    setStyle: (boolean|undefined)
 * }}
 */
ngeox.format.FeatureHashOptions;


/**
 * The encoding and decoding accuracy. Optional. Default value is 1.
 * @type {number|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.accuracy;


/**
 * Encode styles. Optional. Default is `true`.
 * @type {boolean|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.encodeStyles;


/**
 * A function that returns serializable properties for a feature. Optional. By
 * default the feature properties (as returned by `feature.getProperties()`)
 * are used. To be serializable the returned properties should be numbers or
 * strings.
 * @type {(function(ol.Feature): Object.<string, (string|undefined)>|undefined)}
 */
ngeox.format.FeatureHashOptions.prototype.properties;


/**
 * Determines whether the style defined for each feature is read and converted
 * into:
 *   A) an `ol.style.Style` object set in the feature, or
 *   B) an object with key:values that defines the style properties set in
 *      the feature and for the `ngeo.FeatureHelper` to use to style the
 *      feature with.
 * Default is `true`, i.e. A).
 * @type {boolean|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.setStyle;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.interaction;

/**
 * Interactions for measure tools.
 * @typedef {{
 *    startMsg: (Element|undefined),
 *    continueMsg: (Element|undefined),
 *    decimals: (number|undefined),
 *    style: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    sketchStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined)
 * }}
 */
ngeox.interaction.MeasureOptions;


/**
 * Element including the message to display in the help tooltip when the user
 * just activated the interaction.
 * @type {Element|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.startMsg;


/**
 * Element including the message to display in the help tooltip when the user
 * already added the first point.
 * @type {Element|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.continueMsg;


/**
 * Defines the number of decimals to keep in the measurement. If not defined,
 * then the default behaviour occurs depending on the measure type.
 * @type {number|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.decimals;


/**
 * The style to be used when drawing is finished.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.style;


/**
 * The style to be used while drawing.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.sketchStyle;


/**
 * @typedef {{
 *     features: (ol.Collection.<ol.Feature>|undefined),
 *     style: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined)
 * }}
 */
ngeox.interaction.TranslateOptions;


/**
 * Only features contained in this collection will be able to be translated. If
 * not specified, all features on the map will be able to be translated.
 * @type {ol.Collection.<ol.Feature>|undefined}
 */
ngeox.interaction.TranslateOptions.prototype.features;


/**
 * Style for the center features added by the translate interaction to
 * to show that features can be moved.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.interaction.TranslateOptions.prototype.style;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.profile;


/**
 * Options for the profile.
 * @typedef {{
 *   styleDefs: (string|undefined),
 *   poiLabelAngle: (number|undefined),
 *   formatter: (ngeox.profile.ProfileFormatter|undefined),
 *   distanceExtractor: function(Object): number,
 *   linesConfiguration: !Object.<string, ngeox.profile.LineConfiguration>,
 *   poiExtractor: (ngeox.profile.PoiExtractor|undefined),
 *   light: (boolean|undefined),
 *   lightXAxis: (boolean|undefined),
 *   scaleModifier: (function(function(), function(), number, number)|undefined),
 *   hoverCallback: (function(Object)|undefined),
 *   outCallback: (function()|undefined),
 *   i18n: (ngeox.profile.I18n|undefined)
 * }} ngeox.profile.ProfileOptions
 */
ngeox.profile.ProfileOptions;


/**
 * Inline CSS style definition to inject in the SVG.
 * @type {string|undefined}
 */
ngeox.profile.ProfileOptions.prototype.styleDefs;


/**
 * Inline CSS style definition to inject in the SVG.
 * @type {number|undefined}
 */
ngeox.profile.ProfileOptions.prototype.poiLabelAngle;


/**
 * Formatter giving full control on how numbers are formatted.
 * @type {ngeox.profile.ProfileFormatter|undefined}
 */
ngeox.profile.ProfileOptions.prototype.formatter;


/**
 * Extract the distance from origin of a point (an item of the elevation data
 * array).
 * @type {function(Object): number}
 */
ngeox.profile.ProfileOptions.prototype.distanceExtractor;


/**
 * Configuration object for the profile's lines. The key string of each object
 * is used as class for its respective svg line.
 * @type {!Object.<string, ngeox.profile.LineConfiguration>}
 */
ngeox.profile.ProfileOptions.prototype.linesConfiguration;


/**
 * Extractor for parsing POI data.
 * @type {ngeox.profile.PoiExtractor|undefined}
 */
ngeox.profile.ProfileOptions.prototype.poiExtractor;


/**
 * Show a simplified profile when true.
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.light;


/**
 * Show a simplified x axis with only both end ticks.
 * @type {boolean|undefined}
 */
ngeox.profile.ProfileOptions.prototype.lightXAxis;


/**
 * Allows to modify the raw x and y scales.
 * Notably, it is possible to modify the y domain according to XY ratio rules,
 * add padding or enforce y lower bound.
 * @type {function(function(), function(), number, number)|undefined}
 */
ngeox.profile.ProfileOptions.prototype.scaleModifier;


/**
 * A callback called from the profile when the mouse moves over a point.
 * The point, an item of the elevation data array, is passed as the first
 * argument of the function.
 * @type {function(Object)|undefined}
 */
ngeox.profile.ProfileOptions.prototype.hoverCallback;


/**
 * A callback called from the profile when the mouse leaves the profile.
 * @type {function()|undefined}
 */
ngeox.profile.ProfileOptions.prototype.outCallback;


/**
 * Configuration object for one profile's line.
 * @typedef {{
 *   color: (string|undefined),
 *   zExtractor: !function(Object): number
 * }}
 */
ngeox.profile.LineConfiguration;


/**
 * Color of the line (hex color string).
 * @type {string|undefined}
 */
ngeox.profile.LineConfiguration.prototype.color;


/**
 * Extract the elevation of a point (an item of the elevation data array).
 * @type {function(Object): number}
 */
ngeox.profile.LineConfiguration.prototype.zExtractor;


/**
 * The POI data extractor is used to extract data from a POI.
 * The POI is an item of the POI data array.
 * @typedef {{
 *   id: function(Object): string,
 *   dist: function(Object): number,
 *   z: function(Object, number=): number,
 *   sort: function(Object): number,
 *   title: function(Object): string
 * }} ngeox.profile.PoiExtractor
 */
ngeox.profile.PoiExtractor;


/**
 * Extract the id of a POI.
 * @type {function(Object): string}
 */
ngeox.profile.PoiExtractor.prototype.id;


/**
 * Extract the distance from origin of a POI.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.dist;


/**
 * Extract the elevation of a POI.
 * @type {function(Object, number=): number}
 */
ngeox.profile.PoiExtractor.prototype.z;


/**
 * Extract the sequence number of a POI.
 * @type {function(Object): number}
 */
ngeox.profile.PoiExtractor.prototype.sort;


/**
 * Extract the title of a POI.
 * @type {function(Object): string}
 */
ngeox.profile.PoiExtractor.prototype.title;


/**
 * @typedef {{
 *   xhover: function(number, string): string,
 *   yhover: function(number, string): string,
 *   xtick: function(number, string): (string|number),
 *   ytick: function(number, string): (string|number)
 * }}
 */
ngeox.profile.ProfileFormatter;


/**
 * Format the xhover distance.
 * @type {function(number, string): string}
 */
ngeox.profile.ProfileFormatter.prototype.xhover;


/**
 * Format the yhover elevation.
 * @type {function(number, string): string}
 */
ngeox.profile.ProfileFormatter.prototype.yhover;


/**
 * Format the xtick, for graduating the x axis.
 * @type {function(number, string): (string|number)}
 */
ngeox.profile.ProfileFormatter.prototype.xtick;


/**
 * Format the ytick, for graduating the y axis.
 * @type {function(number, string): (string|number)}
 */
ngeox.profile.ProfileFormatter.prototype.ytick;


/**
 * @typedef {{
 *   xAxis: (string|undefined),
 *   yAxis: (string|undefined)
 * }}
 */
ngeox.profile.I18n;


/**
 * Text for the x axis. Will be completed by ` km` or ' m' (for kilometers or
 * meters).
 * @type {string|undefined}
 */
ngeox.profile.I18n.prototype.xAxis;


/**
 * Text for the y axis. Will be completed by ' m' (for meters).
 * @type {string|undefined}
 */
ngeox.profile.I18n.prototype.yAxis;


/**
 * @interface
 */
ngeox.MeasureEvent = function() {};


/**
 * @type {ol.Feature}
 */
ngeox.MeasureEvent.prototype.feature;


/**
 * @interface
 */
ngeox.RotateEvent = function() {};


/**
 * @type {ol.Feature}
 */
ngeox.RotateEvent.prototype.feature;


/**
 * Options for the mobile geolocations directive.
 * @typedef {{
 *    accuracyFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    positionFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    zoom: (number|undefined)
 * }}
 */
ngeox.MobileGeolocationDirectiveOptions;


/**
 * The style to use to sketch the accuracy feature, which is a regular polygon.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.accuracyFeatureStyle;


/**
 * The style to use to sketch the position feature, which is a point.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.positionFeatureStyle;


/**
 * If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position.
 * @type {number|undefined}
 */
ngeox.MobileGeolocationDirectiveOptions.prototype.zoom;


/**
 * Options for the mobile geolocations directive.
 * @typedef {{
 *    accuracyFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    positionFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    zoom: (number|undefined)
 * }}
 */
ngeox.DesktopGeolocationDirectiveOptions;


/**
 * The style to use to sketch the accuracy feature, which is a regular polygon.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.accuracyFeatureStyle;


/**
 * The style to use to sketch the position feature, which is a point.
 * @type {ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.positionFeatureStyle;


/**
 * If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position.
 * @type {number|undefined}
 */
ngeox.DesktopGeolocationDirectiveOptions.prototype.zoom;


/**
 * @typedef {{
 *   open: (function()|undefined),
 *   close: (function()|undefined),
 *   cursorchange: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   select: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined),
 *   autocomplete: (function(jQuery.Event, Object,
 *       TypeaheadDataset)|undefined)
 * }}
 */
ngeox.SearchDirectiveListeners;


/**
 * @type {function()|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.open;


/**
 * @type {function()|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.close;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.cursorchange;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.select;


/**
 * @type {function(jQuery.Event, Object, TypeaheadDataset)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.autocomplete;

/**
 * Enum for the time property widget
 * Type of the widget to use
 * @enum {string}
 */
ngeox.TimePropertyWidgetEnum = {
  SLIDER : 'slider',
  DATEPICKER : 'datepicker'
};

/**
 * Mode of the widget
 * @enum {string}
 */
ngeox.TimePropertyModeEnum = {
  RANGE : 'range',
  VALUE : 'value',
  DISABLED : 'disabled'
};

/**
 * resolution of the widget
 * @enum {string}
 */
ngeox.TimePropertyResolutionEnum = {
  DAY : 'day',
  MONTH : 'month',
  YEAR : 'year',
  SECOND : 'second'
};


/**
 * Time object
 * @typedef {{
 *  widget : ngeox.TimePropertyWidgetEnum,
 *  maxValue: string,
 *  minValue: string,
 *  maxDefValue: (string|null),
 *  minDefValue: (string|null),
 *  mode: ngeox.TimePropertyModeEnum,
 *  resolution: (ngeox.TimePropertyResolutionEnum|undefined),
 *  values: (Array<string>|undefined),
 *  interval : Array<number>
 * }}
 */
ngeox.TimeProperty;


/**
 * @interface
 */
ngeox.BackgroundEvent = function() {};


/**
 * @type {ol.layer.Base}
 */
ngeox.BackgroundEvent.prototype.previous;

/**
 * Format a number with a precision.
 *
 * Arguments:
 * - opt_precision: The used precision, default is 3.
 *
 * @typedef {function(number, number=): string}
 */
ngeox.number;

/**
 * Format a number with the prefix and unit.
 *
 * Arguments:
 * - opt_unit: The unit to used, default is ''.
 * - opt_type: (unit|square|binary) the type of units, default is 'unit'.
 * - opt_precision: The used precision, default is 3.
 *
 * @typedef {function(number, string=, string=, number=): string}
 */
ngeox.unitPrefix;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.style;


/**
 * The options for creating a text style.
 * @typedef {{
 *     text: (string),
 *     size: (number|undefined),
 *     angle: (number|undefined),
 *     color: (ol.Color|undefined),
 *     width: (number|undefined),
 *     offsetX: (number|undefined),
 *     offsetY: (number|undefined)
 * }}
 */
ngeox.style.TextOptions;


/**
 * Definition for grid columns.
 * @typedef {{name: (string)}}
 */
ngeox.GridColumnDef;


/**
 * Name of a column.
 * @type {String}
 */
ngeox.GridColumnDef.prototype.name;


/**
 * @typedef {{layer: string}}
 */
ngeox.source.AsitVDOptions;


/**
 * Layer name. Possible values are `asitvd.fond_couleur`, `asitvd.fond_gris`
 * and `asitvd.fond_pourortho`.
 * @type {string}
 */
ngeox.source.AsitVDOptions.prototype.layer;


/**
 * @typedef {{
 *    layer: string,
 *    projection: string,
 *    format: (string|undefined),
 *    timestamp: string
 * }}
 */
ngeox.source.SwisstopoOptions;


/**
 * Layer name.
 * @type {string}
 */
ngeox.source.SwisstopoOptions.prototype.layer;


/**
 * Projection code. Possible values are `EPSG:21781` and `EPSG:2056`.
 * @type {string}
 */
ngeox.source.SwisstopoOptions.prototype.projection;


/**
 * Image format. Default is `image/png`.
 * @type {string}
 */
ngeox.source.SwisstopoOptions.prototype.format;


/**
 * The `Time` dimension of the source.
 * @type {string}
 */
ngeox.source.SwisstopoOptions.prototype.timestamp;


/**
 * Namespace.
 * @type {Object}
 */
ngeox.search;


/**
 * @typedef {{
 *    limit: (number|undefined),
 *    origins: (string|undefined),
 *    targetProjection: (!ol.proj.Projection|undefined),
 *    options: (!BloodhoundOptions|undefined),
 *    remoteOptions: (!BloodhoundRemoteOptions|undefined),
 *    prepare: (undefined|function(string, jQueryAjaxSettings):jQueryAjaxSettings)
 * }}
 */
ngeox.search.LocationSearchOptions;


/**
 * The maximum number of results to retrieve per request (max. and default limit=50).
 * @type {number|undefined}
 */
ngeox.search.LocationSearchOptions.prototype.limit;


/**
 * A comma separated list of origins.
 * Possible origins are: zipcode,gg25,district,kantone,gazetteer,address,parcel
 * Per default all origins are used.
 * @type {string|undefined}
 */
ngeox.search.LocationSearchOptions.prototype.origins;


/**
 * Target projection.
 * @type {!ol.proj.Projection|undefined}
 */
ngeox.search.LocationSearchOptions.prototype.targetProjection;


/**
 * Optional Bloodhound options. If `undefined`, the default Bloodhound config will be used.
 * @type {!BloodhoundOptions|undefined}
 */
ngeox.search.LocationSearchOptions.prototype.options;


/**
 * Optional Bloodhound remote options. Only used if `remote` is not defined in `options`.
 * @type {!BloodhoundRemoteOptions|undefined}
 */
ngeox.search.LocationSearchOptions.prototype.remoteOptions;


/**
 * Optional function to prepare the request.
 * @type {undefined|function(string, jQueryAjaxSettings):jQueryAjaxSettings}
 */
ngeox.search.LocationSearchOptions.prototype.prepare;

/**
 * @typedef {{
 *   handleFileContent: function(string, File),
 *   isValidUrl: function(string): boolean
 * }}
 */
ngeox.ImportDndOptions;


/**
 * @typedef {{
 *   handleFileContent: function(string, File)
 * }}
 */
ngeox.ImportLocalOptions;


/**
 * @typedef {{
 *   handleFileContent: function(string, File),
 *   transformUrl: function(string): string,
 *   urls: Array<string>,
 *   isValidUrl: function(string): boolean
 * }}
 */
ngeox.ImportOnlineOptions;

/**
 * @typedef {{
 * layerHovered: Function,
 * addPreviewLayer: Function,
 * removePreviewLayer: function(ol.Map),
 * layerSelected: {Name: string, Abstract: String, isInvalid: boolean, Layer: Object},
 * transformExtent: function(ol.Extent): ol.Extent
 * }}
 */
ngeox.ImportWmsGetCapItemOptions;
