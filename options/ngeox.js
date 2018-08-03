/**
 * This file contains the typedefs of the options of the methods.
 * It can be included as extern if you want to prevent renaming.
 * @externs
 */

/**
 * @private
 * @const
 */
let ngeox = {};


/**
 * @record
 * @struct
 */
ngeox.AttributeBase = function() {};


/**
 * Set only if the attribute is a geometry type. Determines the type of
 * geometry.
 * @type {string|undefined}
 */
ngeox.AttributeBase.prototype.geomType;


/**
 * Set only if the attribute is a number type. Determines the type of number.
 * @type {string|undefined}
 */
ngeox.AttributeBase.prototype.numType;


/**
 * The attribute type, which determines how to render it.
 * @type {string|undefined}
 */
ngeox.AttributeBase.prototype.type;


/**
 * A feature attribute definition.
 * @record
 * @struct
 * @extends ngeox.AttributeBase
 */
ngeox.Attribute = function() {};


/**
 * The list of possible values for the attribute.
 * @type {Array.<string>|undefined}
 */
ngeox.Attribute.prototype.choices;


/**
 * Specifies the maximum number of character for the attribute value.
 * @type {number|undefined}
 */
ngeox.Attribute.prototype.maxLength;


/**
 * The attribute name.
 * @type {string}
 */
ngeox.Attribute.prototype.name;


/**
 * The attribute alias.
 * @type {string|null}
 */
ngeox.Attribute.prototype.alias;


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
 * The format used in the date, time and datetime type.
 * @type {string|undefined}
 */
ngeox.Attribute.prototype.format;


/**
 * The mask used in the date, time and datetime type.
 * @type {string|undefined}
 */
ngeox.Attribute.prototype.mask;


/**
 * The options to use when creating a filter using the `ngeo.RuleHelper`
 * service.
 *
 * @typedef {{
 *     dataSource: (ngeox.datasource.DataSource),
 *     incTime: (boolean|undefined),
 *     filter: (ol.format.filter.Filter|undefined),
 *     filterRules: (!Array.<ngeox.rule.Rule>|undefined),
 *     srsName: (string|undefined)
 * }}
 */
ngeox.CreateFilterOptions;


/**
 * The data source from which to get the filterRules that will be used to
 * create the OL filter object.
 * @type {ngeox.datasource.DataSource}
 */
ngeox.CreateFilterOptions.prototype.dataSource;


/**
 * Whether to include the data source's time values in the filter created. The
 * property that contains those values is `timeRangeValue`. Defaults to `false`.
 * When building a filter for WMS, it should not be included as it is given as
 * the TIME parameter of the query instead. When used for a WFS request, it
 * should be included in the filter.
 * @type {boolean|undefined}
 */
ngeox.CreateFilterOptions.prototype.incTime;


/**
 * A filter that is directly given the the method instead of creating one.
 * Useful to automatically combine the time values.
 * @type {ol.format.filter.Filter|undefined}
 */
ngeox.CreateFilterOptions.prototype.filter;


/**
 * An alternative list of filter rules to use instead of those that are defined
 * within the data source. Useful when one wants to get the data of a given
 * filter without applying it to the data source.
 * @type {Array.<!ngeox.rule.Rule>|undefined}
 */
ngeox.CreateFilterOptions.prototype.filterRules;


/**
 * The SRS name used with the spatial filters created by the method.
 * @type {string|undefined}
 */
ngeox.CreateFilterOptions.prototype.srsName;


/**
 * Dimensions definition.
 * @typedef {Object.<string, ?string>}
 */
ngeox.Dimensions;


/**
 * Active dimensions definition, where the value can't be null.
 * @typedef {Object.<string, string>}
 */
ngeox.DimensionsActive;


/**
 * @typedef {function(string, string, string=)}
 */
ngeox.Download;


/**
 * The options to use when sending GetFeature/GetFeatureInfo requests using
 * the querent or map query service.
 * @typedef {{
 *     coordinate: (ol.Coordinate|undefined),
 *     dataSources: (Array.<ngeox.datasource.DataSource>|undefined),
 *     extent: (ol.Extent|undefined),
 *     filter: (ol.format.filter.Filter|undefined),
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
 * @type {Array.<ngeox.datasource.DataSource>|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.dataSources;


/**
 * The extent to issue the requests with, which can end up with WFS requests
 * only.
 * @type {ol.Extent|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.extent;


/**
 * A filter to additionally use with the query. Only used by WFS requests.
 * If a filter is defined, then it is used instead of the data source's
 * filter rules.
 * @type {ol.format.filter.Filter|undefined}
 */
ngeox.IssueGetFeaturesOptions.prototype.filter;


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
 * @typedef {{
 *  styleFunction: ol.StyleFunction,
 *  features: Object.<string, ol.Feature>
 * }}
 */
ngeox.MapFeatureOverlayGroup;


/**
 * Provides a debounce function used to debounce calls to a user-provided
 * function.
 * @typedef {function(function(?), number, boolean):function()}
 */
ngeox.miscDebounce;


/**
 * Provides a function that returns the most appropriate 2-letter
 * language code depending on the list of available languages and the browser
 * languages settings.
 * @typedef {function(Array.<string>):string}
 */
ngeox.miscGetBrowserLanguage;


/**
 * @typedef {{
 *     handleClassName: (string|undefined),
 *     draggerClassName: (string|undefined),
 *     placeholderClassName: (string|undefined)
 * }}
 */
ngeox.miscSortableOptions;


/**
 * An entry for a tool in a `ngeo.misc.ToolActivateMgr` group.
 * @typedef {{
 *    tool: (ngeo.misc.ToolActivate),
 *    defaultTool: boolean,
 *    unlisten: (function(): void)}}
 */
ngeox.miscToolActivateMgrEntry;


/**
 * A hash that contains 2 lists of queryable data sources: `wfs` and `wms`.
 * The same data source can only be in one of the two lists. The `wfs` list
 * has priority, i.e. if the data source supports WFS, it's put in the
 * `wfs` list.
 *
 * @typedef {{
 *     wfs: (!Array.<!ngeox.datasource.OGC>),
 *     wms: (!Array.<!ngeox.datasource.OGC>)
 * }}
 */
ngeox.QueryableDataSources;


/**
 * List of queryable data sources that support WFS.
 * @type {Array.<ngeox.datasource.OGC>}
 */
ngeox.QueryableDataSources.prototype.wfs;


/**
 * List of queryable data sources that support WMS.
 * @type {Array.<ngeox.datasource.OGC>}
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
 * The maximum number of features to get with the query.
 * @type {number}
 */
ngeox.QuerentResultItem.prototype.limit;


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
 * @typedef {function():!ngeo.message.Popup}
 */
ngeox.PopupFactory;


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
 *     limit: (number),
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
 * Identifier (can be not unique).
 * @type {number|string}
 */
ngeox.QueryResultSource.prototype.id;


/**
 * Label.
 * @type {string}
 */
ngeox.QueryResultSource.prototype.label;


/**
 * The maximum number of features that can be returned for a query with this
 * source.
 * @type {number}
 */
ngeox.QueryResultSource.prototype.limit;


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
 * The name of the geometry property for WFS GetFeature requests. The default is `geom`.
 * @type {string|undefined}
 */
ngeox.QueryOptions.prototype.geometryName;


/**
 * Options to configure the scale selector
 * @typedef {{
 *     dropup: (boolean|undefined)
 * }}
 */
ngeox.ScaleselectorOptions;


/**
 * True to get a drop menu that opens imself to the top, instead of the bottom.
 * @type {boolean|undefined}
 */
ngeox.ScaleselectorOptions.prototype.dropup;


/**
 * @typedef {{
 *     handleClassName: (string|undefined),
 *     draggerClassName: (string|undefined)
 * }}
 */
ngeox.SortableOptions;


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
 * Namespace.
 * @type {Object}
 */
ngeox.datasource;


/**
 * @typedef {!ol.Collection.<!ngeo.datasource.DataSource>}
 */
ngeox.datasource.DataSources;


/**
 * The options required to create a `ngeox.datasource.DataSource`.
 * @record
 * @struct
 */
ngeox.datasource.DataSourceOptions = function() {};


/**
 * The attributes of the data source.
 * @type {Array.<ngeox.Attribute>|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.attributes;


/**
 * (Required) The data source id.
 * @type {number}
 */
ngeox.datasource.DataSourceOptions.prototype.id;


/**
 * The name of an attribute among the attributes of the data source.
 * The value of that attribute, in records, can be used to identify
 * each record individually.
 * @type {string|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.identifierAttribute;


/**
 * A data source is considered 'in range' when it is synchronized to
 * a map view and the resolution of that view is within the range of
 * the `maxResolution` and `minResolution`. These 2 properties are
 * required for the `inRange` property to be dynamic, otherwise its
 * value is always `true` by default.
 *
 * The synchronization is made in the `ngeo.datasource.syncDataSourcesMap`
 * service.
 *
 * @type {boolean|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.inRange;


/**
 * Maximum resolution where the data source can be displayed or queried.
 * @type {number|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.maxResolution;


/**
 * Minimum resolution where the data source can be displayed or queried.
 * @type {number|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.minResolution;


/**
 * (Required) A human-readable name for the data source.
 * @type {string}
 */
ngeox.datasource.DataSourceOptions.prototype.name;


/**
 * Whether the data source is visible or not, i.e. whether its is ON or OFF.
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.datasource.DataSourceOptions.prototype.visible;


/**
 * The options required to create a `ngeox.datasource.File`.
 * @record
 * @struct
 * @extends ngeox.datasource.DataSourceOptions
 */
ngeox.datasource.FileOptions = function() {};


/**
 * Collection of `ol.Feature` objects.
 * @type {ol.Collection.<!ol.Feature>|undefined}
 */
ngeox.datasource.FileOptions.prototype.features;


/**
 * The options required to create a `ngeox.datasource.OGC`.
 * @record
 * @struct
 * @extends ngeox.datasource.DataSourceOptions
 */
ngeox.datasource.OGCOptions = function() {};


/**
 * The dimensions that are currently active on the data source.
 * @type {ngeox.Dimensions|undefined}
 */
ngeox.datasource.OGCOptions.prototype.activeDimensions;


/**
 * Whether the geometry from this data source can be copied to other data
 * sources or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.copyable;


/**
 * A reference to the dimensions.
 * @type {ngeox.Dimensions|undefined}
 */
ngeox.datasource.OGCOptions.prototype.dimensions;


/**
 * The dimensions configuration, which determines those supported by this data
 * source and whether they should use a static value or the one defined in the
 * dimensions.
 * @type {ngeox.Dimensions|undefined}
 */
ngeox.datasource.OGCOptions.prototype.dimensionsConfig;


/**
 * The filter condition to apply to the filter rules (if any). Defaults to
 * `ngeo.filter.Condition.AND`.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.filterCondition;


/**
 * A list of filter rules to apply to this data source using the filter
 * condition.
 * @type {!Array.<!ngeox.rule.Rule>|undefined}
 */
ngeox.datasource.OGCOptions.prototype.filterRules;


/**
 * Whether the data source is filtrable or not.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.filtrable;


/**
 * The name of the geometry attribute.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.geometryName;


/**
 * The type of images to fetch by queries by the (WMS) or (WMTS) .
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.ogcImageType;


/**
 * A list of layer definitions that are used by (WMS) and (WFS) queries.
 * These are **not** used by the (WMTS) queries (the wmtsLayers is used
 * by WMTS queries).
 * @type {Array.<!ngeox.datasource.OGCLayer>|undefined}
 */
ngeox.datasource.OGCOptions.prototype.ogcLayers;


/**
 * The type of OGC server.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.ogcServerType;


/**
 * The type data source. Can be: 'WMS' or 'WMTS'.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.ogcType;


/**
 * Whether the geometry from this data source can be used to snap the geometry
 * of features from other data sources that are being edited. Defaults to
 * `false`.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.snappable;


/**
 * Determines whether external features can be snapped to the edges of
 * features from this data source or not. Defaults to `true`. Requires
 * `snappable` to be set.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.snappingToEdges;


/**
 * Determines whether external features can be snapped to the vertice of
 * features from this data source or not. Defaults to `true`. Requires
 * `snappable` to be set.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.snappingToVertice;


/**
 * The tolerance in pixels the snapping should occur. Defaults to `10`.
 * @type {number|undefined}
 */
ngeox.datasource.OGCOptions.prototype.snappingTolerance;


/**
 * The name of the time attribute.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.timeAttributeName;


/**
 * The time lower value, which can be combined with the time upper value
 * to determine a range.
 * @type {number|undefined}
 */
ngeox.datasource.OGCOptions.prototype.timeLowerValue;


/**
 * The time property for the data source. Used to apply time filters.
 * @type {ngeox.TimeProperty|undefined}
 */
ngeox.datasource.OGCOptions.prototype.timeProperty;


/**
 * The time upper value, which can be combined with the time lower value
 * to determine a range.
 * @type {number|undefined}
 */
ngeox.datasource.OGCOptions.prototype.timeUpperValue;


/**
 * The feature namespace to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wfsFeatureNS;


/**
 * The feature prefix to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wfsFeaturePrefix;


/**
 * The OutputFormat to use with WFS requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wfsOutputFormat;


/**
 * The url to use for (WFS) requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wfsUrl;


/**
 * The InfoFormat to use with WMS requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wmsInfoFormat;


/**
 * Whether the (WMS) images returned by this data source should be single tiles
 * or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wmsIsSingleTile;


/**
 * The url to use for (WMS) requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wmsUrl;


/**
 * The layer name to use for the (WMTS) requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wmtsLayer;


/**
 * The url to use for (WMTS) requests.
 * @type {string|undefined}
 */
ngeox.datasource.OGCOptions.prototype.wmtsUrl;


/**
 * The options required to create a `ngeox.datasource.Group`.
 * @record
 * @struct
 */
ngeox.datasource.GroupOptions = function() {};


/**
 * List of data source combined in the group. At least one must be defined
 * upon the cration of the group.
 * @type {!Array.<!ngeo.datasource.DataSource>}
 */
ngeox.datasource.GroupOptions.prototype.dataSources;


/**
 * A human-readable title for the group. Usually, the WMS Server title is
 * used for this property.
 * @type {string}
 */
ngeox.datasource.GroupOptions.prototype.title;


/**
 * The options required to create a `ngeox.datasource.FileGroup`.
 * @record
 * @struct
 * @extends ngeox.datasource.GroupOptions
 */
ngeox.datasource.FileGroupOptions = function() {};


/**
 * Angular main injector.
 * @type {!angular.$injector}
 */
ngeox.datasource.FileGroupOptions.prototype.injector;


/**
 * The options required to create a `ngeox.datasource.OGCGroup`.
 * @record
 * @struct
 * @extends ngeox.datasource.GroupOptions
 */
ngeox.datasource.OGCGroupOptions = function() {};


/**
 * The OGC service url. Used as a unique identifier for the group object itself.
 * @type {string}
 */
ngeox.datasource.OGCGroupOptions.prototype.url;


/**
 * The options required to create a `ngeox.datasource.WMSGroup`.
 * @record
 * @struct
 * @extends ngeox.datasource.OGCGroupOptions
 */
ngeox.datasource.WMSGroupOptions = function() {};


/**
 * Angular main injector.
 * @type {!angular.$injector}
 */
ngeox.datasource.WMSGroupOptions.prototype.injector;


/**
 * @interface
 * @struct
 */
ngeox.datasource.DataSource = function() {};

/**
 * @type {boolean}
 */
ngeox.datasource.DataSource.prototype.queryable;

/**
 * @interface
 * @struct
 * @extends ngeox.datasource.DataSource
 */
ngeox.datasource.OGC = function() {};

/**
 * @type {!ngeox.DimensionsActive}
 */
ngeox.datasource.OGC.prototype.activeDimensions;

/**
 * @type {boolean}
 */
ngeox.datasource.OGC.prototype.combinableForWMS;

/**
 * @type {boolean}
 */
ngeox.datasource.OGC.prototype.combinableForWFS;

/**
 * @type {boolean}
 */
ngeox.datasource.OGC.prototype.supportsWFS;

/**
 * @type {boolean}
 */
ngeox.datasource.OGC.prototype.supportsWMS;

/**
 * @type {string|undefined}
 */
ngeox.datasource.OGC.prototype.wmsUrl;

/**
 * @type {string|undefined}
 */
ngeox.datasource.OGC.prototype.wfsUrl;

/**
 * @type {string}
 */
ngeox.datasource.OGC.prototype.filterCondition;

/**
 * @type {?Array.<!ngeox.rule.Rule>}
 */
ngeox.datasource.OGC.prototype.filterRules;

/**
 * @param {ngeox.datasource.OGC} dataSource Data source.
 * @return {boolean} Whether this data source can be combined to the given
 *     other data source to fetch features in a single WFS request.
 */
ngeox.datasource.OGC.prototype.combinableWithDataSourceForWFS = function(dataSource) {};


/**
 * @param {ngeox.datasource.OGC} dataSource Data source.
 * @return {boolean} Whether this data source can be combined to the given
 *     other data source to fetch features in a single WMS request.
 */
ngeox.datasource.OGC.prototype.combinableWithDataSourceForWMS = function(dataSource) {};


/**
 * @param {!ngeox.datasource.OGC} dataSource Remote data source to compare with
 *     this one.
 * @return {boolean}  Whether the two data sources have the same active
 *     dimensions. If both have no dimensions, they are considered to be
 *     sharing the same dimensions.
 */
ngeox.datasource.OGC.prototype.haveTheSameActiveDimensions = function(dataSource) {};


/**
 * The definition of a single layer (WMS) and/or featureType (WFS).
 * @record
 * @struct
 */
ngeox.datasource.OGCLayer = function() {};


/**
 * The maximum resolution the layer should be rendered (when visible).
 * @type {number|undefined}
 */
ngeox.datasource.OGCLayer.prototype.maxResolution;


/**
 * The minimum resolution the layer should be rendered (when visible).
 * @type {number|undefined}
 */
ngeox.datasource.OGCLayer.prototype.minResolution;


/**
 * The layer name (WMS) and/or feature type name (WFS)
 * @type {string}
 */
ngeox.datasource.OGCLayer.prototype.name;


/**
 * Whether the the layer is queryable or not. Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.datasource.OGCLayer.prototype.queryable;


/**
 * Namespace.
 * @const
 */
ngeox.interaction = {};


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
 * @const
 */
ngeox.format = {};


/**
 * @typedef {{
 *    accuracy: (number|undefined),
 *    defaultValues: (Object.<string, function(ol.Feature)>|undefined),
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
 * @type {Object.<string, function(ol.Feature)>|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.defaultValues;


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
 *      the feature and for the `ngeo.misc.FeatureHelper` to use to style the
 *      feature with.
 * Default is `true`, i.e. A).
 * @type {boolean|undefined}
 */
ngeox.format.FeatureHashOptions.prototype.setStyle;


/**
 * Interactions for measure tools.
 * @typedef {{
 *    startMsg: (Element|undefined),
 *    continueMsg: (Element|undefined),
 *    precision: (number|undefined),
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


/** TODO
 * Defines the number of decimals to keep in the measurement. If not defined,
 * then the default behaviour occurs depending on the measure type.
 * @type {number|undefined}
 */
ngeox.interaction.MeasureOptions.prototype.precision;


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
 * @const
 */
ngeox.profile = {};


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
 * Options for the mobile geolocations directive.
 * @typedef {{
 *    accuracyFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    positionFeatureStyle: (ol.style.Style|Array.<ol.style.Style>|ol.StyleFunction|undefined),
 *    zoom: (number|undefined),
 *    autorotate: (boolean|undefined)
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
 *       TypeaheadDataset)|undefined),
 *   datasetsempty: (function(jQuery.Event, string, boolean)|undefined)
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
 * @type {function(jQuery.Event, string, boolean)|undefined}
 */
ngeox.SearchDirectiveListeners.prototype.datasetsempty;


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
 * @typedef {{
 *     end: (number|undefined),
 *     start: number
 * }}
 */
ngeox.TimeRange;


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
 * Format a couple of numbers as number coordinates.
 *
 * Arguments:
 * - coordinates Array of two numbers.
 * - opt_fractionDigits Optional number of digit. Default to 0.
 * - opt_template Optional template. Default to '{x} {y}'.
 *     Where "{x}" will be replaced by the easting coordinate and "{y}" by the northing one. Note:
 *     Use a html entity to use the semicolon symbol into a template.
 * @typedef {function(ol.Coordinate, (number|string)=, string=, (boolean|string)=): string}
 */
ngeox.numberCoordinates;

/**
 * Format a coordinates as DMS coordinates.
 * Arguments:
 * - coordinates Array of two numbers.
 * - opt_fractionDigits Optional number of digit. Default to 0.
 * - opt_template Optional template. Default to '{x} {y}'.
 *     Where "{x}" will be replaced by the easting coordinate, {y} by the northing one. Note: Use a html
 *     entity to use the semicolon symbol into a template.
 * @typedef {function(ol.Coordinate, (number|string)=, string=): string}
 */
ngeox.dmsCoordinates;

/**
 * Namespace.
 * @const
 */
ngeox.rule = {};


/**
 * @record
 * @struct
 */
ngeox.rule.RuleOptions = function() {};


/**
 * Whether the rule is active or not. Used by the `ngeo-rule` component.
 * Defaults to `false`.
 * @type {boolean|undefined}
 */
ngeox.rule.RuleOptions.prototype.active;


/**
 * The expression of the rule. The expression and boundaries are mutually
 * exclusives.
 * @type {number|string|undefined}
 */
ngeox.rule.RuleOptions.prototype.expression;


/**
 * Whether the rule is a custom one or not. Defaults to `true`.
 * @type {boolean|undefined}
 */
ngeox.rule.RuleOptions.prototype.isCustom;


/**
 * The lower boundary of the rule. The expression and boundaries are
 * mutually exclusives.
 * @type {number|undefined}
 */
ngeox.rule.RuleOptions.prototype.lowerBoundary;


/**
 * The human-readable name of the rule.
 * @type {string}
 */
ngeox.rule.RuleOptions.prototype.name;


/**
 * The rule operator.
 * @type {string|undefined}
 */
ngeox.rule.RuleOptions.prototype.operator;


/**
 * The rule operators.
 * @type {Array.<string>|undefined}
 */
ngeox.rule.RuleOptions.prototype.operators;


/**
 * The property name (a.k.a. the attribute name).
 * @type {string}
 */
ngeox.rule.RuleOptions.prototype.propertyName;


/**
 * The type of rule.
 * @type {string|undefined}
 */
ngeox.rule.RuleOptions.prototype.type;


/**
 * The upper boundary of the rule. The expression and boundaries are
 * mutually exclusives.
 * @type {number|undefined}
 */
ngeox.rule.RuleOptions.prototype.upperBoundary;


/**
 * @interface
 * @struct
 */
ngeox.rule.Rule = function() {};


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleOptions
 */
ngeox.rule.DateOptions = function() {};


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleOptions
 */
ngeox.rule.GeometryOptions = function() {};


/**
 * Properties for the feature.
 * @type {Object.<string, *>|undefined}
 */
ngeox.rule.GeometryOptions.prototype.featureProperties;


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleOptions
 */
ngeox.rule.SelectOptions = function() {};


/**
 * List of choices available for selection.
 * @type {Array.<string>}
 */
ngeox.rule.SelectOptions.prototype.choices;


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleOptions
 */
ngeox.rule.TextOptions = function() {};


/**
 * @typedef {!ngeox.rule.RuleOptions|!ngeox.rule.GeometryOptions|!ngeox.rule.SelectOptions|!ngeox.rule.TextOptions}
 */
ngeox.rule.AnyOptions;



/**
 * @record
 * @struct
 */
ngeox.rule.RuleBaseValue = function() {};


/**
 * The operator of the rule value.
 * @type {string}
 */
ngeox.rule.RuleBaseValue.prototype.operator;


/**
 * The property name of the rule value.
 * @type {string}
 */
ngeox.rule.RuleBaseValue.prototype.propertyName;


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleBaseValue
 */
ngeox.rule.RuleSimpleValue = function() {};


/**
 * The expression of the rule value.
 * @type {number|string}
 */
ngeox.rule.RuleSimpleValue.prototype.expression;


/**
 * @record
 * @struct
 * @extends ngeox.rule.RuleBaseValue
 */
ngeox.rule.RuleRangeValue = function() {};


/**
 * The lower boundary of the rule value.
 * @type {number}
 */
ngeox.rule.RuleRangeValue.prototype.lowerBoundary;


/**
 * The upper boundary of the rule value.
 * @type {number}
 */
ngeox.rule.RuleRangeValue.prototype.upperBoundary;


/**
 * Namespace.
 * @const
 */
ngeox.style = {};


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
 * @const
 */
ngeox.source = {}


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
 * @const
 */
ngeox.search = {};


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
 *   transformUrl: function(string): Promise,
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
 *   transformUrl: function(string): Promise,
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

/**
 * @typedef {{
 * layerHovered: Function,
 * addPreviewLayer: Function,
 * removePreviewLayer: function(ol.Map),
 * layerSelected: {Name: string, Abstract: String, isInvalid: boolean, Layer: Object}
 * }}
 */
ngeox.ImportWmtsGetCapItemOptions;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   action: string
 * }>}
 */
ngeox.MenuEvent;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   current: ol.layer.Base,
 *   previous: ol.layer.Base
 * }>}
 */
ngeox.BackgroundEvent;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   feature: ol.Feature
 * }>}
 */
ngeox.DrawEvent;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   features: ol.Feature
 * }>}
 */
ngeox.ModifyEvent;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   feature: ol.Feature
 * }>}
 */
ngeox.MeasureEvent;

/**
 * @typedef {ngeo.CustomEvent.<{
 *   feature: ol.Feature
 * }>}
 */
ngeox.RotateEvent;

/**
 * @typedef {{
 *     property: (string),
 *     condition: (string|Array.<string>)
 * }}
 */
ngeox.WfsPermalinkFilter;

/**
 * @typedef {{
 *     filters: (Array.<ngeox.WfsPermalinkFilter>)
 * }}
 */
ngeox.WfsPermalinkFilterGroup;

/**
 * @typedef {{
 *     wfsType: (string),
 *     filterGroups: (Array.<ngeox.WfsPermalinkFilterGroup>),
 *     showFeatures: (boolean)
 * }}
 */
ngeox.WfsPermalinkData;


/**
 * @typedef {function(string):!ngeo.print.Service}
 */
ngeox.CreatePrint;

/**
 * @typedef {{
 *     text: (string),
 *     value: (string)
 * }}
 */
ngeox.FilterCondition;


/**
 * Format a duration in seconds to a more readable form.
 * Arguments:
 * - duration The duration in seconds.
 * @typedef {function(number): string}
 */
ngeox.duration;



/**
 * @typedef {{
 *     name: (string),
 *     coordinate: (ol.Coordinate)
 * }}
 */
ngeox.NominatimSearchResult;

/**
 * @typedef {{
 *     display_name: (string),
 *     lon: (number),
 *     lat: (number)
 * }}
 */
ngeox.NominatimSearchResponseResult;

/**
 * @typedef {{
 *     feature: (?ol.Feature),
 *     onSelect: (function(ngeox.NominatimSearchResult))
 * }}
 */
ngeox.RoutingVia;

/**
 * @typedef {{
 *     label: (string),
 *     profile: (string)
 * }}
 */
ngeox.RoutingProfile;

/**
 * @typedef {{
 *     backendUrl: (string|undefined),
 *     profiles: (Array.<ngeox.RoutingProfile>|undefined)
 * }}
 */
ngeox.RoutingOptions;
