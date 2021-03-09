// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

import olStyleCircle from 'ol/style/Circle.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyle from 'ol/style/Style.js';
import {createDefaultStyle} from 'ol/style/Style.js';
/**
 * @typedef {Object} Fill
 * @property {number[]|string} [color] The color.
 */

/**
 * @typedef {Object} Stroke
 * @property {number[]|string} [color] The color.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {number[]} [lineDash] Line dash pattern. Default is `null` (no dash).
 * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
 * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 */

/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * See also: https://openlayers.org/en/latest/examples/regularshape.html
 * @typedef {Object} RegularShape
 * @property {Fill} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] Outer radius of a star.
 * @property {number} [radius2] Inner radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
 * @property {number[]} [displacement=[0,0]] Displacement of the shape
 * @property {Stroke} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 */

/**
 * @typedef {Object} Circle
 * @property {Fill} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {Stroke} [stroke] Stroke style.
 * @property {number[]} [displacement=[0,0]] displacement
 */

/**
 * The style description.
 * @typedef {Object} Style
 * @property {Fill} [fill] The fill color.
 * @property {Stroke} [stroke] The stoke config.
 * @property {Circle} [circle] The circle config.
 * @property {RegularShape} [regularShape] The regular shape config.
 * @property {number} [zIndex] The z index.
 */

/**
 * @param {StyleLike} styleDescriptor The description of the style
 * @return {import("ol/style/Style.js").StyleLike}
 */
export function buildStyle(styleDescriptor) {
  if (styleDescriptor instanceof olStyle) {
    return styleDescriptor;
  } else if (!styleDescriptor) {
    return createDefaultStyle;
  } else if (Array.isArray(styleDescriptor)) {
    /** @type {olStyle[]} */
    const result = [];
    for (const style of styleDescriptor) {
      result.push(/** @type {olStyle} */ (buildStyle(style)));
    }
    return result;
  } else {
    /** @type {import('ol/style/Style.js').Options} */
    const style = {};
    Object.assign(style, styleDescriptor);
    const sd = /** @type {Style} */ (styleDescriptor);
    if (sd.fill) {
      style.fill = new olStyleFill(sd.fill);
    }
    if (sd.stroke) {
      style.stroke = new olStyleStroke(sd.stroke);
    }
    if (sd.circle) {
      const circleStyle = /** @type {import('ol/style/Circle.js').Options} */ ({});
      Object.assign(circleStyle, sd.circle);

      if (sd.circle.fill) {
        circleStyle.fill = new olStyleFill(sd.circle.fill);
      }
      if (sd.circle.stroke) {
        circleStyle.stroke = new olStyleStroke(sd.circle.stroke);
      }
      style.image = new olStyleCircle(circleStyle);
      // @ts-ignore
      delete style.circle;
    } else if (sd.regularShape) {
      const regularShapeStyle = /** @type {import('ol/style/RegularShape.js').Options} */ ({});
      Object.assign(regularShapeStyle, sd.regularShape);

      if (sd.regularShape.fill) {
        regularShapeStyle.fill = new olStyleFill(sd.regularShape.fill);
      }
      if (sd.regularShape.stroke) {
        regularShapeStyle.stroke = new olStyleStroke(sd.regularShape.stroke);
      }
      if (sd.regularShape.angle) {
        sd.regularShape.angle = (sd.regularShape.angle / 180) * Math.PI;
      }
      if (sd.regularShape.rotation) {
        sd.regularShape.rotation = (sd.regularShape.angle / 180) * Math.PI;
      }
      style.image = new olStyleRegularShape(regularShapeStyle);
      // @ts-ignore
      delete style.regularShape;
    }

    return new olStyle(style);
  }
}

/**
 * @typedef {import("ol/style/Style.js").StyleLike|Style[]|Style} StyleLike
 */

/**
 * URL of the test page to detect online/offline.
 * @typedef {string} ngeoOfflineTestUrl
 */

/**
 * URL to the WFS server.
 * @typedef {string} ngeoPermalinkOgcserverUrl
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
 *    around the position. This `tolerance` in pixel determines the minimal size of the bbox.
 * @property {number} [toleranceTouch=10] Same as `tolerance` but for touch devices.
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
 * @typedef {StringToHtmlReplacement[]} ngeoStringToHtmlReplacements
 */

/**
 * Load tiles up to preload levels.
 * By default preload is Infinity,
 * which means load all tiles on the top of the visible level. See also preload value
 * in documentation for ol.Layer.Tile.
 * @typedef {number} ngeoTilesPreloadingLimit
 */

/**
 * Regexp used to identify the used keys.
 * @typedef {string[]} ngeoUsedKeyRegexp
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

/**
 * @typedef {number} ngeoMeasurePrecision
 */

/**
 * @typedef {number} ngeoMeasureDecimals
 */

/**
 * @typedef {boolean} ngeoMeasureSpherical
 */

/**
 * @typedef {number} ngeoSnappingTolerance
 */

/**
 * @typedef {string} ngeoPointfilter
 */

/**
 * File encoding of the CSV file.
 * @typedef {string} ngeoCsvEncoding
 */

/**
 * File extension of the CSV file.
 * @typedef {string} ngeoCsvExtension
 */

/**
 * Whether to include the header in the exported file or not.
 * @typedef {boolean} ngeoCsvIncludeHeader
 */

/**
 * Quote character.
 * @typedef {string} ngeoCsvQuote
 */

/**
 * Separator character.
 * @typedef {string} ngeoCsvSeparator
 */

/**
 * The scale selector options
 * @typedef {Object} ngeoScaleSelectorOptions
 * @property {number[]} values The available scales
 * @property {boolean} [dropup] True to get a drop menu that opens imself to the top, instead of the bottom.
 */

/**
 * Configuration object for one profile's line.
 *
 * @typedef {Object} LineConfiguration
 * @property {string} [color] Color of the line (hex color string).
 * @property {function(number[]): number} zExtractor Extract the elevation of a point (an item of the
 * elevation data array).
 */

/**
 * Options for the profile.
 *
 * @typedef {Object} ngeoProfileOptions
 * @property {Object<string, LineConfiguration>} linesConfiguration Configuration object for the profile's
 * @property {string} [styleDefs] Inline CSS style definition to inject in the SVG.
 * @property {number} [poiLabelAngle] Inline CSS style definition to inject in the SVG.
 * lines. The key string of each object is used as class for its respective svg line.
 * @property {boolean} [light] Show a simplified profile when true.
 * @property {boolean} [lightXAxis] Show a simplified x axis with only both end ticks.
 */

/**
 * Options for the geolocation directive.
 *
 * @typedef {Object} ngeoGeolocationOptions
 * @property {StyleLike} [accuracyFeatureStyle] The style to
 * use to sketch the accuracy feature, which is a regular polygon.
 * @property {StyleLike} [positionFeatureStyle] The style to
 * use to sketch the position feature, which is a point.
 * @property {number} [zoom] If set, in addition to recentering the map view at the location, determines
 * the zoom level to set when obtaining a new position
 * @property {boolean} [autoRotate] Autorotate.
 * @property {boolean} [atLoadingTime=false] Toggle geolocating at loading time if true.
 */

/**
 * Configuration object for streetview.
 *
 * @typedef {Object} ngeoStreetviewOptions
 * @property {string} viewer The viewer to use (google or mapillary)
 * @property {string} key ClientId for Mapillary
 */

export default null;
