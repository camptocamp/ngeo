// The MIT License (MIT)
//
// Copyright (c) 2020 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module src/options
 */

/**
 * @typedef {Object<string, string>} ngeoNominatimSearchDefaultParams
 */

/**
 * The options for the query service.
 *
 * @typedef {Object} ngeoQueryOptions
 * @property {number} [limit=50] The maximum number of records per request the query service should ask.
 *    Note that sources sharing the same URL are combined together in a single request. This limit will still
 *    apply to those.
 * @property {boolean} [queryCountFirst=false] For WFS sources, should the number of features first be
 *    requested with `resultType=hits` before requesting the actual features in an seconds request?
 * @property {string} [sourceIdsProperty='querySourceIds'] Defines the name of the layer property that holds
 *    the ids of the sources.
 *    Use this if you have more than one source bound to a layer.
 * @property {number} [tolerance=3] When issuing an identify feature request at a click position, either a
 *    WMS GetFeatureInfo or a WFS GetFeature request will be used. For GetFeature requests a bbox is built
 *    around the position. This `tolerance` in pixel determines the size of the bbox.
 * @property {number} [toleranceTouch=10] The tolerance on touch devices.
 * @property {string} [featureNS='http://mapserver.gis.umn.edu/mapserver'] The feature namespace for WFS
 *    GetFeature requests.
 * @property {string} [featurePrefix='feature'] The feature prefix for WFS GetFeature requests.
 * @property {string} [geometryName='geom'] The name of the geometry property for WFS GetFeature requests.
 * @property {boolean} [cursorHover]
 * @property {boolean} [bboxAsGETParam=false] Pass the queried bbox as a parameter of the GET query on WFS
 *    requests.
 */

/**
 * @typedef {Object} RoutingProfile
 * @property {string} label
 * @property {string} profile
 */

/**
 * @typedef {Object} ngeoRoutingOptions
 * @property {string} [backendUrl]
 * @property {RoutingProfile[]} [profiles]
 */

/**
 * @typedef {Object} StringToHtmlReplacement
 * @property {string} expression The regexp expression that must match to do the replacement.
 * @property {string} [flags] The regexp flags.
 * @property {RegExp} [compiled_expression] Internal: the compiled regular expression.
 * @property {string} template The template to use to create a new value as replacement if the regex matches.
 */

/**
 * List of replacements for string to html.
 * @typedef {Array<StringToHtmlReplacement>} ngeoStringToHtmlReplacements
 */

/**
 * Load tiles up to preload levels.
 * By default preload is Infinity,
 * which means load all tiles on the top of the visible level. See also preload value
 * in documentation for ol.Layer.Tile.
 * @typedef {number} ngeoTilesPreloadingLimit
 */

/**
 * URL of the test page to detect online/offline.
 * @typedef {string} ngeoOfflineTestUrl
 */

/**
 * Regexp used to identify the used keys.
 * @typedef {string[]} ngeoUsedKeyRegexp
 */

/**
 * URL to the WFS server.
 * @typedef {string} ngeoPermalinkOgcserverUrl
 */

/**
 * A WFS type. To be used with {@link WfsPermalinkOptions}.
 *
 * @typedef {Object} WfsType
 * @property {string} featureType The feature type name. Required.
 * @property {string} [label] The field of a feature used as label.
 * @property {string} [featureNS] The namespace URI used for features. If not given, the default namespace set
 *    in {@link WfsPermalinkOptions} will be used.
 * @property {string} [featurePrefix] The prefix for the feature namespace. If not given, the default prefix
 *    set in {@link WfsPermalinkOptions} will be used.
 * @property {string} [defaultFeatureNS] The default namespace URI used for features. This will be used if no
 *    custom namespace is given for a WFS type.
 * @property {string} [defaultFeaturePrefix] The default prefix for the feature namespace. This will be used
 *    if no custom prefix is given for a WFS type.
 */

/**
 * The options for the WFS query service (permalink).
 *
 * @typedef {Object} ngeoWfsPermalinkOptions
 * @property {WfsType[]} wfsTypes The queryable WFS types.
 * @property {number} [pointRecenterZoom] Zoom level to use when result is a single point feature. If not set
 *    the map is not zoomed to a specific zoom level.
 * @property {number} [maxFeatures=50] The maximum number of records per request the query service should ask.
 * @property {string} defaultFeatureNS
 * @property {string} defaultFeaturePrefix
 */

export default null;
