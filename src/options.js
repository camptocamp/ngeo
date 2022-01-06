// The MIT License (MIT)
//
// Copyright (c) 2020-2022 Camptocamp SA
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

import olStyleCircle from 'ol/style/Circle';
import olStyleRegularShape from 'ol/style/RegularShape';
import olStyleFill from 'ol/style/Fill';
import olStyleStroke from 'ol/style/Stroke';
import olStyle from 'ol/style/Style';
import {createDefaultStyle} from 'ol/style/Style';
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
 *
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
 *
 * @typedef {Object} Style
 * @property {Fill} [fill] The fill color.
 * @property {Stroke} [stroke] The stoke config.
 * @property {Circle} [circle] The circle config.
 * @property {RegularShape} [regularShape] The regular shape config.
 * @property {number} [zIndex] The z index.
 */

/**
 * @param {StyleLike} styleDescriptor The description of the style
 * @returns {import('ol/style/Style').StyleLike}
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
    /** @type {import('ol/style/Style').Options} */
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
      const circleStyle = /** @type {import('ol/style/Circle').Options} */ ({});
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
      const regularShapeStyle = /** @type {import('ol/style/RegularShape').Options} */ ({});
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
 * @typedef {import('ol/style/Style').StyleLike|Style[]|Style} StyleLike
 */

/**
 * URL of the test page to detect online/offline.
 *
 * @typedef {string} ngeoOfflineTestUrl
 */

/**
 * URL to the WFS server.
 *
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
 *
 * @typedef {StringToHtmlReplacement[]} ngeoStringToHtmlReplacements
 */

/**
 * Load tiles up to preload levels.
 * By default preload is Infinity,
 * which means load all tiles on the top of the visible level. See also preload value
 * in documentation for ol.Layer.Tile.
 *
 * @typedef {number} ngeoTilesPreloadingLimit
 */

/**
 * Regexp used to identify the used keys.
 *
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
 *
 * @typedef {string} ngeoCsvEncoding
 */

/**
 * File extension of the CSV file.
 *
 * @typedef {string} ngeoCsvExtension
 */

/**
 * Whether to include the header in the exported file or not.
 *
 * @typedef {boolean} ngeoCsvIncludeHeader
 */

/**
 * Quote character.
 *
 * @typedef {string} ngeoCsvQuote
 */

/**
 * Separator character.
 *
 * @typedef {string} ngeoCsvSeparator
 */

/**
 * The scale selector options
 *
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

/**
 * URL to the theme web service.
 *
 * @typedef {string} gmfTreeUrl
 */

/**
 * URL to the Vector Tiles web service.
 * It will be completed by /{layername}/{z}/{x}/{y}.pbf
 *
 * @typedef {string} gmfVectorTilesUrl
 */

/**
 * URL to the authentication web service.
 *
 * @typedef {string} authenticationBaseUrl
 */

/**
 * URL to the full-text search web service.
 *
 * @typedef {string} fulltextsearchUrl
 */

/**
 * URL to the shortener web service.
 *
 * @typedef {string} gmfShortenerCreateUrl
 */

/**
 * URL to the raster web service.
 *
 * @typedef {string} gmfRasterUrl
 */

/**
 * URL to the profile web service.
 *
 * @typedef {string} gmfProfileJsonUrl
 */

/**
 * URL to the layers web service.
 *
 * @typedef {string} gmfLayersUrl
 */

/**
 * URL to MapFishPrint.
 *
 * @typedef {string} gmfPrintUrl
 */

/**
 * Default language
 *
 * @typedef {string} defaultLang
 */

/**
 * Languages URL
 *
 * @typedef {Object<string, string>} langUrls
 */

/**
 * The view definition.
 *
 * @typedef {Object} View
 * @property {string} projection The main projection.
 * @property {number[]} [center] The initial center for
 * the view. If a user projection is not set, the coordinate system for the center is
 * specified with the `projection` option. Layer sources will not be fetched if this
 * is not set, but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {number[]} [extent] The extent that constrains the
 * view, in other words, nothing outside of this extent can be visible on the map.
 * @property {boolean} [constrainOnlyCenter=false] If true, the extent
 * constraint will only apply to the view center and not the whole extent.
 * @property {boolean} [smoothExtentConstraint=true] If true, the extent
 * constraint will be applied smoothly, i.e. allow the view to go slightly outside
 * of the given `extent`.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {boolean} [multiWorld=false] If `false` the view is constrained so
 * only one world is visible, and you cannot pan off the edge.  If `true` the map
 * may show multiple worlds at low zoom levels.  Only used if the `projection` is
 * global.  Note that if `extent` is also provided it is given precedence.
 * @property {boolean} [constrainResolution=false] If true, the view will always
 * animate to the closest zoom level after an interaction; false means
 * intermediary zoom levels are allowed.
 * @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
 * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
 * the given resolution or zoom bounds.
 * @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
 * show the full configured extent. By default, when a view is configured with an
 * extent, users will not be able to zoom out so the viewport exceeds the extent in
 * either dimension. This means the full extent may not be visible if the viewport
 * is taller or wider than the aspect ratio of the configured extent. If
 * showFullExtent is true, the user will be able to zoom out so that the viewport
 * exceeds the height or width of the configured extent, but not both, allowing the
 * full extent to be shown.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {number[]} [resolutions] Resolutions to determine the
 * resolution constraint. If set the `maxResolution`, `minResolution`,
 * `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view.
 * @property {number} [zoomFactor=2] The zoom factor used to compute the
 * corresponding resolution.
 */

/**
 * The map definition.
 *
 * @typedef {Object} Map
 * @property {string} projection The main projection.
 * @property {number} [pixelRatio] The ratio between physical pixels and device-independent pixels (dips)
 * on the device.
 * @property {number} [maxTilesLoading=16] Maximum number tiles to load simultaneously.
 * @property {number} [moveTolerance=1] The minimum distance in pixels the cursor must move to be detected
 * as a map move event instead of a click. Increasing this value can make it easier to click on the map.
 */

/**
 * The application wide options.
 *
 * @typedef {Object} gmfOptions
 * @property {boolean} [showInfobar=false] Show the information bar.
 * @property {boolean} [geolocalisation=false] Show the geolocalisation button.
 * @property {View} view The view definition.
 * @property {Map} map The map definition.
 * @property {number} zoom The default zoom.
 * @property {import('ol/control/Control').default[]} [mapControls] The map control.
 * @property {import('ol/interaction/Interaction').default[]} [mapInteractions] The map interactions.
 * @property {import('ol/interaction').DefaultsOptions} [interationDefaults] The map interactions.
 * @property {import('ol/control/Zoom').Options} controlZoom The zoom control options
 * @property {Object<string, string>} cssVars The css variables, in particular brand-primary and
 *    brand-secondary that will set all the branding.
 */

/**
 * The available projections definitions.
 *
 * @typedef {Object<string, import('api/options').Projection>} gmfProjectionsOptions
 */

/**
 * Flush mode active?
 *
 * @typedef {boolean} gmfTreeManagerModeFlush
 */

/**
 * @typedef {Object} gmfContextualDataOptions
 * @property {Object<string, string>} rasterParams The raster service parameters
 * @property {string[]} projections
 */

/**
 * Additional configuration options for the object editing tools directive.
 *
 * @typedef {Object} gmfObjectEditingToolsOptions
 * @property {number} [regularPolygonRadius=100] The radius of the shapes created by the regular polygon
 * radius creation tool. The value is in map units.
 */

/**
 * Configuration options for the permalink service.
 *
 * @typedef {Object} gmfPermalinkOptions
 * @property {import('ngeo/options').StyleLike} [crosshairStyle] An alternate style for the crosshair feature added by the
 *    permalink service.
 * @property {boolean} [crosshairEnabledByDefault] Display the crosshair, gets overridden by the
 *    `map_crosshair` parameter. Default is `false`.
 * @property {string[]} [projectionCodes] EPSG codes (e.g. 'EPSG:3857' or '3857').
 *    The permalink service will accept coordinates in these projections and try to detect which projection
 *    the given coordinates are in.
 * @property {boolean} [useLocalStorage] Store the values in the local storage. Default is `false`.
 * @property {number} [pointRecenterZoom] Zoom level to use when result is a single point feature.
 *    If not set the map is not zoomed to a specific zoom level.
 */

/**
 * @typedef {Object} OptionsLegendType
 * @property {boolean} [useBbox] Use or not the bbox. Default to true. For QGIS server only.
 * @property {Object<string, boolean>} label The key is the server type (`mapserver`, `qgis`, ...), if the
 *    value is `false` the name of the layer will be not displayed. This is used to avoid duplicated title,
 *    as text and in the legend image.
 * @property {Object<string, Object<string, string>>} params The key is the server type (`mapserver`,
 *    `qgis`, ...) or `image` for an URL from a metadata. The value is some additional parameters set in the
 *    query string.
 * @property {boolean} [showGroupsTitle] Display or not groups title in the legend. default is
 *    true. Switching to false is useful to obtains a "flat" legend.
 */

/**
 * @typedef {Object} gmfPrintOptions
 * @property {boolean} [scaleInput]
 * @property {OptionsLegendType} [legend] Options used to build the legend.
 * @property {number} [goodnessOfFit]
 * @property {string} [defaultLayout]
 * @property {boolean} [rotateMask] True to apply rotation on the mask instead of the map. By default,
 *    the map rotates.
 * @property {Object<string, string|number|boolean>} [fieldValues] optional. Key, value object to define
 *    default value in each of your print panel field. The key refers to the property's name of the field.
 *    Example: {'comments': 'demo', 'legend': false}. Doesn't work for the DPI and the scale. Server's
 *    values are used in priority.
 * @property {string[]} [hiddenAttributes] The list of attributes that should be hidden.
 */

/**
 * Configuration options for the themes service.
 *
 * @typedef {Object} gmfThemesOptions
 * @property {boolean} [addBlankBackgroundLayer] Whether to add a blank background layer to the list of
 *    available backgrounds.
 */

/**
 * Tile grid options.
 *
 * @typedef {Object} olTileGridOptions
 * @property {import("ol/extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("ol/coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("ol/coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("ol/size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("ol/size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("ol/size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */

/**
 * Configuration options for the VectorTiles layers.
 *
 * @typedef {Object} gmfVectorTilesOptions
 * @property {string} projection Projection of the tile grid.
 * @property {olTileGridOptions} tiles grid options.
 */

/**
 * Floor dimension values and labels.
 *
 * @typedef {Array<Object<string, string>>} gmfFloors
 */

/**
 * The Authentication configuration.
 *
 * @typedef {Object} gmfAuthenticationConfig
 * @property {boolean} allowPasswordReset Whether to show the password forgotten link. Default to true.
 * @property {boolean} allowPasswordChange Whether to show the change password button. Default to true.
 *    You can also specify a `PasswordValidator` object to add constraint on user's new password.
 */

/**
 * The definition of an external OGC server
 *
 * @typedef {Object} ExternalOGCServer
 * @property {string} name
 * @property {string} type
 * @property {string} url
 * @private
 */

/**
 * @typedef {ExternalOGCServer[]} gmfExternalOGCServers
 */

/**
 * @typedef {string[]} gmfSearchGroups
 */

/**
 * Don't request a new user object from the back-end after
 * logging out if the logged-in user's role has this role.
 *
 * @typedef {?string} gmfAuthenticationNoReloadRole
 */

/**
 * The CSV file name.
 *
 * @typedef {string} gmfCsvFilename
 */

/**
 * The background layer selector options
 *
 * @typedef {Object} gmfBackgroundLayerSelectorOptions
 * @property {string} [opacityLayer] The background layer with an opacity slider.
 */

/**
 * The disclaimers options
 *
 * @typedef {Object} gmfDisclaimerOptions
 * @property {boolean} [popup] Whether to show the disclaimer messages in popups or not.
 * Defaults to `false`.
 * @property {boolean} [layerVisibility] Only display the disclaimer if the layer is visible.
 * Defaults to `true`.
 * @property {boolean} [external] Whether to use disclaimer messages elsewhere or not. Default to `false`.
 * If true, you should use the externalMessage and the externalVisibility too.
 */

/**
 * Configuration option for {@link import('gmf/query/gridComponent').default} to merge
 * grid tabs.
 *
 * E.g. `'two_wheels_park': ['velo_park', 'moto_park']}` merges the sources
 * with label `velo_park` and `moto_park` into a new source `two_wheels_park`.
 *
 * @typedef {Object<string, string[]>} GridMergeTabs
 */

/**
 * Use the query grid instead the query window to display the query result.
 *
 * @typedef {boolean} gmfQueryGrid
 */

/**
 * The display querry grid component options.
 *
 * @typedef {Object} gmfDisplayQueryGridOptions
 * @property {import('ngeo/options').StyleLike} featuresStyle A style object for all features from the result of the query.
 * @property {import('ngeo/options').StyleLike} selectedFeatureStyle A style object for the currently selected features.
 * @property {boolean} [removeEmptyColumns] Should empty columns be hidden? Default: `false`.
 * @property {number} [maxRecenterZoom] Maximum zoom-level to use when zooming to selected features.
 * @property {GridMergeTabs} [mergeTabs] Configuration to merge grids with the same attributes into
 * a single grid.
 */

/**
 * The display querry grid component options.
 *
 * @typedef {Object} gmfDisplayQueryWindowOptions
 * @property {import('ngeo/options').StyleLike} featuresStyle A style object for all features from the result of the query.
 * @property {import('ngeo/options').StyleLike} selectedFeatureStyle A style object for the currently selected features.
 * @property {boolean} [collapsed] If the query result window is collapsed.
 */

/**
 * @typedef {Object} LayerConfig
 * @property {string} [filter]
 * @property {string[]} [args]
 * @property {string} [postfix]
 * @property {string} [separator]
 */

/**
 * The elevation (raster) options.
 *
 * @typedef {Object} gmfElevationOptions
 * @property {string[]} layers Elevation layers to use.
 * @property {Object<string, LayerConfig>} layersConfig Elevation layers configurations.
 */

/**
 * The elevation (raster) options.
 *
 * @typedef {Object} gmfProfileOptions
 * @property {number} [numberOfPoints=100] Maximum limit of points to request.
 * @property {import('ngeo/options').StyleLike} hoverPointStyle The hover point style.
 */

/**
 * @typedef {Object} SearchAction
 * @property {string} action The action
 * @property {string} title The title
 */

/**
 * Datasource configuration options for the search directive.
 *
 * @typedef {Object} SearchComponentDatasource
 * @property {Bloodhound.BloodhoundOptions<GeoJSON.FeatureCollection>} [bloodhoundOptions] The optional Bloodhound configuration for this
 * data set. See: https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
 * @property {string} labelKey The name of a corresponding GeoJSON property key in the current dataset.
 * The bound value of this property key will be used as label.
 * @property {string[]} [groupValues] Possible values for the 'layer_name' key.
 * Used to define groups of dataset.
 * @property {SearchAction[]} [groupActions] List of allowed actions. The list may contain a
 * combination of `add_theme`, `add_group` or `add_layer`
 * @property {string} [projection] The geometry's projection for this set of data.
 * @property {Twitter.Typeahead.Dataset<import('ol/Feature').default<import('ol/geom/Geometry').default>>} [typeaheadDatasetOptions] The optional Twitter.Typeahead.
 *    configuration for this dataset. See: https://github.com/twitter/typeahead.js/blob/master/
 * @property {string} [url] URL of the search service. Must contain a '%QUERY' term that will be
 * replaced by the input string.
 * @property {string} [datasetTitle]
 */

/**
 * @typedef {Object} gmfSearchOptions
 * @property {Object<string, import('ngeo/options').StyleLike>} styles A map of styles to apply on searched features. Keys must be the
 *    'layer_name' property of features except for coordinates where the key ifor its style is the value of
 *    the constant 'gmf.COORDINATES_LAYER_NAME'. The 'default' key is used to apply the default style.
 * @property {string[]} coordinatesProjections codes of supported projections for coordinates search
 *    (projections must be defined in ol3). If not provided, only the map's view projection format will be
 *    supported.
 * @property {boolean} [clearButton=true] Clear button in the input search.
 * @property {number} [delay=50] bloodhound request delay in ms.
 * @property {boolean} [colorChooser=false] Whether to let the user change the style of the feature on the map.
 * @property {number} [maxZoom=16] maximum zoom we will zoom on result.
 * @property {string} [placeholder="Search…"] The placeholder.
 * @property {SearchComponentDatasource[]} datasources The used datasources.
 */

/**
 * Projection object for the MousePositionDirective. Define a label and a filter
 * to use to display coordinates for a projection.
 *
 * @typedef {Object} MousePositionProjection
 * @property {string} code The epsg name of a projection.
 * @property {string} label The label to display with this projection.
 * @property {string} filter The filter function to use to format this projection. Arguments can be passed
 * with colon as separator (example: MyFilter:args1:args2:...)
 */

/**
 * @typedef {Object} gmfMousePositionOptions
 * @property {MousePositionProjection[]} projections The list of the projections.
 */

/**
 * @typedef {Object} gmfMobileMeasureAreaOptions
 * @property {number} [precision=2] The number of significant digits to display.
 * @property {import('ngeo/options').StyleLike} sketchStyle A style for the measure area.
 */

/**
 * @typedef {Object} gmfMobileMeasureLengthOptions
 * @property {number} [precision=2] The number of significant digits to display.
 * @property {import('ngeo/options').StyleLike} sketchStyle A style for the measure length.
 */

/**
 * @typedef {Object} MeasureRasterLayer
 * @property {string} name
 * @property {number} [decimals]
 * @property {string} [unit]
 */

/**
 * @typedef {Object} gmfMobileMeasurePointOptions
 * @property {number} decimals The number of significant digits to display.
 * @property {string} format The used formatter
 * @property {MeasureRasterLayer[]} rasterLayers Raster elevation layers to get
 *     information under the point and its configuration.
 * @property {import('ngeo/options').StyleLike} sketchStyle A style for the measure point.
 */

/**
 * @typedef {Object} gmfLayerTreeOptions
 * @property {boolean} openlinksinnewwindow if true, open
 *    metadataURLs in a new window. Otherwise open them in a popup.
 * @property {boolean} isExpanded [Experimental] Whether all the layer group is expanded by default.
 */

/**
 * @typedef {Object} gmfShareOptions
 * @property {boolean} [enableEmail=true] Enhable email.
 */

/**
 * @typedef {Object} gmfEditFeatureOptions
 * @property {import('ngeo/options').StyleLike} highlightStyle A style object for highlighting of feature.
 * @property {number} tolerance The buffer in pixels to use when making queries to get the features.
 * @property {boolean} closeAfterSave If true,
 * immediately return to the main edit panel after save. Default is false.
 */

/**
 * Use to inject custom javascript from an URL.
 *
 * @typedef {string} gmfCustomJavascriptUrl
 */

/**
 * Use to inject custom stylesheet from an URL.
 *
 * @typedef {string} gmfCustomStylesheetUrl
 */

export default null;
