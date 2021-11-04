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

import OlStyle, {
  Options as OlStyleStyleOptions,
  StyleLike as OlStyleStyleStyleLike,
  createDefaultStyle,
} from 'ol/style/Style';
import OlStyleCircle, {Options as OlStyleCircleOptions} from 'ol/style/Circle';
import OlStyleRegularShape, {Options as OlStyleRegularShapeOptions} from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import {BehaviorSubject} from 'rxjs';
import OlControlControl from 'ol/control/Control';
import OlInteractionInteraction from 'ol/interaction/Interaction';
import {DefaultsOptions as OlInteractionDefaultsOptions} from 'ol/interaction';
import {Options as OlControlZoomOptions} from 'ol/control/Zoom';
import OlFeature from 'ol/Feature';
import OlGeomGeometry from 'ol/geom/Geometry';
import 'typeahead';

/**
 * A projection definitions.
 */
export type Projection = {
  /**
   * The definition.
   */
  definition: string[];
  /**
   * The extent.
   */
  extent: number[];
};

export type Fill = {
  /**
   * The color.
   */
  color?: number[] | string;
};

export type Stroke = {
  /**
   * The color.
   */
  color?: number[] | string;
  /**
   * Line cap style: `butt`, `round`, or `square`.
   */
  lineCap?: CanvasLineCap;
  /**
   * Line join style: `bevel`, `round`, or `miter`.
   */
  lineJoin?: CanvasLineJoin;
  /**
   * Line dash pattern. Default is `null` (no dash).
   * Please note that Internet Explorer 10 and lower do not support the `setLineDash` method on
   * the `CanvasRenderingContext2D` and therefore this option will have no visual effect in these browsers.
   */
  lineDash?: number[];
  /**
   * Line dash offset.
   */
  lineDashOffset?: number;
  /**
   * Miter limit.
   */
  miterLimit?: number;
  /**
   * Width.
   */
  width?: number;
};

/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * See also: https://openlayers.org/en/latest/examples/regularshape.html
 */
export type RegularShape = {
  /**
   * Fill style.
   */
  fill?: Fill;
  /**
   * Number of points for stars and regular polygons. In case of a polygon, the number of points
   * is the number of sides.
   */
  points: number;
  /**
   * Radius of a regular polygon.
   */
  radius?: number;
  /**
   * Outer radius of a star.
   */
  radius1?: number;
  /**
   * Inner radius of a star.
   */
  radius2?: number;
  /**
   * Shape's angle in radians. A value of 0 will have one of the shape's point facing up.
   */
  angle?: number;
  /**
   * Displacement of the shape
   */
  displacement?: number[];
  /**
   * Stroke style.
   */
  stroke?: Stroke;
  /**
   * Rotation in radians (positive rotation clockwise).
   */
  rotation?: number;
  /**
   * Whether to rotate the shape with the view.
   */
  rotateWithView?: boolean;
};

export type Circle = {
  /**
   * Fill style.
   */
  fill?: Fill;
  /**
   * Circle radius.
   */
  radius: number;
  /**
   * Stroke style.
   */
  stroke?: Stroke;
  /**
   * displacement
   */
  displacement?: number[];
};

/**
 * The style description.
 */
export type Style = {
  /**
   * The fill color.
   */
  fill?: Fill;
  /**
   * The stoke config.
   */
  stroke?: Stroke;
  /**
   * The circle config.
   */
  circle?: Circle;
  /**
   * The regular shape config.
   */
  regularShape?: RegularShape;
  /**
   * The z index.
   */
  zIndex?: number;
};

export type StyleLike = OlStyleStyleStyleLike | Style[] | Style;

/**
 * @param styleDescriptor The description of the style
 * @returns The OpenLayers stale
 */
export function buildStyle(styleDescriptor: StyleLike): OlStyleStyleStyleLike {
  if (styleDescriptor instanceof OlStyle) {
    return styleDescriptor;
  } else if (!styleDescriptor) {
    return createDefaultStyle;
  } else if (Array.isArray(styleDescriptor)) {
    const result: OlStyle[] = [];
    for (const style of styleDescriptor) {
      result.push(buildStyle(style) as OlStyle);
    }
    return result;
  } else {
    const style: OlStyleStyleOptions = {};
    Object.assign(style, styleDescriptor);
    const sd = styleDescriptor as Style;
    if (sd.fill) {
      style.fill = new OlStyleFill(sd.fill);
    }
    if (sd.stroke) {
      style.stroke = new OlStyleStroke(sd.stroke);
    }
    if (sd.circle) {
      const circleStyle = {} as OlStyleCircleOptions;
      Object.assign(circleStyle, sd.circle);

      if (sd.circle.fill) {
        circleStyle.fill = new OlStyleFill(sd.circle.fill);
      }
      if (sd.circle.stroke) {
        circleStyle.stroke = new OlStyleStroke(sd.circle.stroke);
      }
      style.image = new OlStyleCircle(circleStyle);
      // @ts-ignore
      delete style.circle;
    } else if (sd.regularShape) {
      const regularShapeStyle = {} as OlStyleRegularShapeOptions;
      Object.assign(regularShapeStyle, sd.regularShape);

      if (sd.regularShape.fill) {
        regularShapeStyle.fill = new OlStyleFill(sd.regularShape.fill);
      }
      if (sd.regularShape.stroke) {
        regularShapeStyle.stroke = new OlStyleStroke(sd.regularShape.stroke);
      }
      if (sd.regularShape.angle) {
        sd.regularShape.angle = (sd.regularShape.angle / 180) * Math.PI;
      }
      if (sd.regularShape.rotation) {
        sd.regularShape.rotation = (sd.regularShape.angle / 180) * Math.PI;
      }
      style.image = new OlStyleRegularShape(regularShapeStyle);
      // @ts-ignore
      delete style.regularShape;
    }

    return new OlStyle(style);
  }
}

/**
 * URL of the test page to detect online/offline.
 */
export type ngeoOfflineTestUrl = string;

/**
 * URL to the WFS server.
 */
export type ngeoPermalinkOgcserverUrl = string;

export type ngeoNominatimSearchDefaultParams = {
  [x: string]: string;
};

/**
 * The options for the query service.
 */
export type ngeoQueryOptions = {
  /**
   * The maximum number of records per request the query service should ask.
   * Note that sources sharing the same URL are combined together in a single request. This limit will still
   * apply to those.
   */
  limit?: number;
  /**
   * For WFS sources, should the number of features first be
   * requested with `resultType=hits` before requesting the actual features in an seconds request?
   */
  queryCountFirst?: boolean;
  /**
   * Defines the name of the layer property that holds
   * the ids of the sources.
   * Use this if you have more than one source bound to a layer.
   */
  sourceIdsProperty?: string;
  /**
   * When issuing an identify feature request at a click position, either a
   * WMS GetFeatureInfo or a WFS GetFeature request will be used. For GetFeature requests a bbox is built
   * around the position. This `tolerance` in pixel determines the minimal size of the bbox.
   */
  tolerance?: number;
  /**
   * Same as `tolerance` but for touch devices.
   */
  toleranceTouch?: number;
  /**
   * The feature namespace for WFS
   * GetFeature requests.
   */
  featureNS?: string;
  /**
   * The feature prefix for WFS GetFeature requests.
   */
  featurePrefix?: string;
  /**
   * The name of the geometry property for WFS GetFeature requests.
   */
  geometryName?: string;
  cursorHover?: boolean;
  /**
   * Pass the queried bbox as a parameter of the GET query on WFS
   * requests.
   */
  bboxAsGETParam?: boolean;
};

export type RoutingProfile = {
  label: string;
  profile: string;
};

export type ngeoRoutingOptions = {
  backendUrl?: string;
  profiles?: RoutingProfile[];
};

export type StringToHtmlReplacement = {
  /**
   * The regexp expression that must match to do the replacement.
   */
  expression: string;
  /**
   * The regexp flags.
   */
  flags?: string;
  /**
   * Internal: the compiled regular expression.
   */
  compiled_expression?: RegExp;
  /**
   * The template to use to create a new value as replacement if the regex matches.
   */
  template: string;
};

/**
 * List of replacements for string to html.
 */
export type ngeoStringToHtmlReplacements = StringToHtmlReplacement[];

/**
 * Load tiles up to preload levels.
 * By default preload is Infinity,
 * which means load all tiles on the top of the visible level. See also preload value
 * in documentation for ol.Layer.Tile.
 */
export type ngeoTilesPreloadingLimit = number;

/**
 * Regexp used to identify the used keys.
 */
export type ngeoUsedKeyRegexp = string[];

/**
 * A WFS type. To be used with {@link WfsPermalinkOptions }.
 */
export type WfsType = {
  /**
   * The feature type name. Required.
   */
  featureType: string;
  /**
   * The field of a feature used as label.
   */
  label?: string;
  /**
   * The namespace URI used for features. If not given, the default namespace set
   * in {@link WfsPermalinkOptions } will be used.
   */
  featureNS?: string;
  /**
   * The prefix for the feature namespace. If not given, the default prefix
   * set in {@link WfsPermalinkOptions } will be used.
   */
  featurePrefix?: string;
  /**
   * The default namespace URI used for features. This will be used if no
   * custom namespace is given for a WFS type.
   */
  defaultFeatureNS?: string;
  /**
   * The default prefix for the feature namespace. This will be used
   * if no custom prefix is given for a WFS type.
   */
  defaultFeaturePrefix?: string;
};

/**
 * The options for the WFS query service (permalink).
 */
export type ngeoWfsPermalinkOptions = {
  /**
   * The queryable WFS types.
   */
  wfsTypes: WfsType[];
  /**
   * Zoom level to use when result is a single point feature. If not set
   * the map is not zoomed to a specific zoom level.
   */
  pointRecenterZoom?: number;
  /**
   * The maximum number of records per request the query service should ask.
   */
  maxFeatures?: number;
  defaultFeatureNS: string;
  defaultFeaturePrefix: string;
};

export type ngeoMeasurePrecision = number;

export type ngeoMeasureDecimals = number;

export type ngeoMeasureSpherical = boolean;

export type ngeoSnappingTolerance = number;

export type ngeoPointfilter = string;

/**
 * File encoding of the CSV file.
 */
export type ngeoCsvEncoding = string;

/**
 * File extension of the CSV file.
 */
export type ngeoCsvExtension = string;

/**
 * Whether to include the header in the exported file or not.
 */
export type ngeoCsvIncludeHeader = boolean;

/**
 * Quote character.
 */
export type ngeoCsvQuote = string;

/**
 * Separator character.
 */
export type ngeoCsvSeparator = string;

/**
 * The scale selector options
 */
export type ngeoScaleSelectorOptions = {
  /**
   * The available scales
   */
  values: number[];
  /**
   * True to get a drop menu that opens imself to the top, instead of the bottom.
   */
  dropup?: boolean;
};

/**
 * zExtractor function type
 */
type ZExtractorFunction = (point: number[]) => number;

/**
 * Configuration object for one profile's line.
 */
export type LineConfiguration = {
  /**
   * Color of the line (hex color string).
   */
  color?: string;
  /**
   * Extract the elevation of a point (an item of the
   * elevation data array).
   */
  zExtractor: ZExtractorFunction;
};

/**
 * Options for the profile.
 */
export type ngeoProfileOptions = {
  /**
   * Configuration object for the profile's
   */
  linesConfiguration: {
    [x: string]: LineConfiguration;
  };
  /**
   * Inline CSS style definition to inject in the SVG.
   */
  styleDefs?: string;
  /**
   * Inline CSS style definition to inject in the SVG.
   * lines. The key string of each object is used as class for its respective svg line.
   */
  poiLabelAngle?: number;
  /**
   * Show a simplified profile when true.
   */
  light?: boolean;
  /**
   * Show a simplified x axis with only both end ticks.
   */
  lightXAxis?: boolean;
};

/**
 * Options for the geolocation directive.
 */
export type ngeoGeolocationOptions = {
  /**
   * The style to
   * use to sketch the accuracy feature, which is a regular polygon.
   */
  accuracyFeatureStyle?: StyleLike;
  /**
   * The style to
   * use to sketch the position feature, which is a point.
   */
  positionFeatureStyle?: StyleLike;
  /**
   * If set, in addition to recentering the map view at the location, determines
   * the zoom level to set when obtaining a new position
   */
  zoom?: number;
  /**
   * Autorotate.
   */
  autoRotate?: boolean;
  /**
   * Toggle geolocating at loading time if true.
   */
  atLoadingTime?: boolean;
};

/**
 * Configuration object for streetview.
 */
export type ngeoStreetviewOptions = {
  /**
   * The viewer to use (google or mapillary)
   */
  viewer: string;
  /**
   * ClientId for Mapillary
   */
  key: string;
};

/**
 * @module contribs/gmf/src/options
 */

/**
 * URL to the theme web service.
 */
export type gmfTreeUrl = string;

/**
 * URL to the authentication web service.
 */
export type authenticationBaseUrl = string;

/**
 * URL to the full-text search web service.
 */
export type fulltextsearchUrl = string;

/**
 * URL to the shortener web service.
 */
export type gmfShortenerCreateUrl = string;

/**
 * URL to the raster web service.
 */
export type gmfRasterUrl = string;

/**
 * URL to the profile web service.
 */
export type gmfProfileJsonUrl = string;

/**
 * URL to the layers web service.
 */
export type gmfLayersUrl = string;

/**
 * URL to MapFishPrint.
 */
export type gmfPrintUrl = string;

/**
 * Default language
 */
export type defaultLang = string;

/**
 * Languages URL
 */
export type langUrls = {
  [x: string]: string;
};

/**
 * The view definition.
 */
export type View = {
  /**
   * The main projection.
   */
  projection: string;
  /**
   * The initial center for
   * the view. If a user projection is not set, the coordinate system for the center is
   * specified with the `projection` option. Layer sources will not be fetched if this
   * is not set, but the center can be set later with {@link #setCenter}.
   */
  center?: number[];
  /**
   * Rotation constraint.
   * `false` means no constraint. `true` means no constraint, but snap to zero
   * near zero. A number constrains the rotation to that number of values. For
   * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
   */
  constrainRotation?: boolean | number;
  /**
   * Enable rotation.
   * If `false`, a rotation constraint that always sets the rotation to zero is
   * used. The `constrainRotation` option has no effect if `enableRotation` is
   * `false`.
   */
  enableRotation?: boolean;
  /**
   * The extent that constrains the
   * view, in other words, nothing outside of this extent can be visible on the map.
   */
  extent?: number[];
  /**
   * If true, the extent
   * constraint will only apply to the view center and not the whole extent.
   */
  constrainOnlyCenter?: boolean;
  /**
   * If true, the extent
   * constraint will be applied smoothly, i.e. allow the view to go slightly outside
   * of the given `extent`.
   */
  smoothExtentConstraint?: boolean;
  /**
   * The maximum resolution used to determine
   * the resolution constraint. It is used together with `minResolution` (or
   * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
   * that the projection's validity extent fits in a 256x256 px tile. If the
   * projection is Spherical Mercator (the default) then `maxResolution` defaults
   * to `40075016.68557849 / 256 = 156543.03392804097`.
   */
  maxResolution?: number;
  /**
   * The minimum resolution used to determine
   * the resolution constraint.  It is used together with `maxResolution` (or
   * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
   * zoom levels (with a factor of 2). If the projection is Spherical Mercator
   * (the default) then `minResolution` defaults to
   * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
   */
  minResolution?: number;
  /**
   * The maximum zoom level used to determine the
   * resolution constraint. It is used together with `minZoom` (or
   * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
   * provided, it is given precedence over `maxZoom`.
   */
  maxZoom?: number;
  /**
   * The minimum zoom level used to determine the
   * resolution constraint. It is used together with `maxZoom` (or
   * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
   * provided, it is given precedence over `minZoom`.
   */
  minZoom?: number;
  /**
   * If `false` the view is constrained so
   * only one world is visible, and you cannot pan off the edge.  If `true` the map
   * may show multiple worlds at low zoom levels.  Only used if the `projection` is
   * global.  Note that if `extent` is also provided it is given precedence.
   */
  multiWorld?: boolean;
  /**
   * If true, the view will always
   * animate to the closest zoom level after an interaction; false means
   * intermediary zoom levels are allowed.
   */
  constrainResolution?: boolean;
  /**
   * If true, the resolution
   * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
   * the given resolution or zoom bounds.
   */
  smoothResolutionConstraint?: boolean;
  /**
   * Allow the view to be zoomed out to
   * show the full configured extent. By default, when a view is configured with an
   * extent, users will not be able to zoom out so the viewport exceeds the extent in
   * either dimension. This means the full extent may not be visible if the viewport
   * is taller or wider than the aspect ratio of the configured extent. If
   * showFullExtent is true, the user will be able to zoom out so that the viewport
   * exceeds the height or width of the configured extent, but not both, allowing the
   * full extent to be shown.
   */
  showFullExtent?: boolean;
  /**
   * The initial resolution for the view. The
   * units are `projection` units per pixel (e.g. meters per pixel). An
   * alternative to setting this is to set `zoom`. Layer sources will not be
   * fetched if neither this nor `zoom` are defined, but they can be set later
   * with {@link #setZoom} or {@link #setResolution}.
   */
  resolution?: number;
  /**
   * Resolutions to determine the
   * resolution constraint. If set the `maxResolution`, `minResolution`,
   * `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
   */
  resolutions?: number[];
  /**
   * The initial rotation for the view in radians
   * (positive rotation clockwise, 0 means North).
   */
  rotation?: number;
  /**
   * Only used if `resolution` is not defined. Zoom
   * level used to calculate the initial resolution for the view.
   */
  zoom?: number;
  /**
   * The zoom factor used to compute the
   * corresponding resolution.
   */
  zoomFactor?: number;
};

/**
 * The map definition.
 */
export type MapConfig = {
  /**
   * The main projection.
   */
  projection: string;
  /**
   * The ratio between physical pixels and device-independent pixels (dips)
   * on the device.
   */
  pixelRatio?: number;
  /**
   * Maximum number tiles to load simultaneously.
   */
  maxTilesLoading?: number;
  /**
   * The minimum distance in pixels the cursor must move to be detected
   * as a map move event instead of a click. Increasing this value can make it easier to click on the map.
   */
  moveTolerance?: number;
};

/**
 * The application wide options.
 */
export type gmfOptions = {
  /**
   * Show the information bar.
   */
  showInfobar?: boolean;
  /**
   * Show the geolocalisation button.
   */
  geolocalisation?: boolean;
  /**
   * The view definition.
   */
  view: View;
  /**
   * The map definition.
   */
  map: MapConfig;
  /**
   * The default zoom.
   */
  zoom: number;
  /**
   * The map control.
   */
  mapControls?: OlControlControl[];
  /**
   * The map interactions.
   */
  mapInteractions?: OlInteractionInteraction[];
  /**
   * The map interactions.
   */
  interationDefaults?: OlInteractionDefaultsOptions;
  /**
   * The zoom control options
   */
  controlZoom: OlControlZoomOptions;
  /**
   * The css variables, in particular brand-primary and
   * brand-secondary that will set all the branding.
   */
  cssVars: {
    [x: string]: string;
  };
};

/**
 * The available projections definitions.
 */
export type gmfProjectionsOptions = {
  [x: string]: Projection;
};

/**
 * Flush mode active?
 */
export type gmfTreeManagerModeFlush = boolean;

export type gmfContextualDataOptions = {
  /**
   * The raster service parameters
   */
  rasterParams: {
    [x: string]: string;
  };
  projections: string[];
};

/**
 * Additional configuration options for the object editing tools directive.
 */
export type gmfObjectEditingToolsOptions = {
  /**
   * The radius of the shapes created by the regular polygon
   * radius creation tool. The value is in map units.
   */
  regularPolygonRadius?: number;
};

/**
 * Configuration options for the permalink service.
 */
export type gmfPermalinkOptions = {
  /**
   * An alternate style for the crosshair feature added by the
   * permalink service.
   */
  crosshairStyle?: StyleLike;
  /**
   * Display the crosshair, gets overridden by the
   * `map_crosshair` parameter. Default is `false`.
   */
  crosshairEnabledByDefault?: boolean;
  /**
   * EPSG codes (e.g. 'EPSG:3857' or '3857').
   * The permalink service will accept coordinates in these projections and try to detect which projection
   * the given coordinates are in.
   */
  projectionCodes?: string[];
  /**
   * Store the values in the local storage. Default is `false`.
   */
  useLocalStorage?: boolean;
  /**
   * Zoom level to use when result is a single point feature.
   * If not set the map is not zoomed to a specific zoom level.
   */
  pointRecenterZoom?: number;
};

export type OptionsLegendType = {
  /**
   * Use or not the bbox. Default to true. For QGIS server only.
   */
  useBbox?: boolean;
  /**
   * The key is the server type (`mapserver`, `qgis`, ...), if the
   * value is `false` the name of the layer will be not displayed. This is used to avoid duplicated title,
   * as text and in the legend image.
   */
  label: {
    [x: string]: boolean;
  };
  /**
   * The key is the server type (`mapserver`,
   * `qgis`, ...) or `image` for an URL from a metadata. The value is some additional parameters set in the
   * query string.
   */
  params: {
    [x: string]: {
      [x: string]: string;
    };
  };
  /**
   * Display or not groups title in the legend. default to
   * true. Switching to false is useful to obtains a "flat" legend.
   */
  showGroupsTitle?: boolean;
};

export type gmfPrintOptions = {
  scaleInput?: boolean;
  /**
   * Options used to build the legend.
   */
  legend?: OptionsLegendType;
  goodnessOfFit?: number;
  defaultLayout?: string;
  /**
   * True to apply rotation on the mask instead of the map. By default,
   * the map rotates.
   */
  rotateMask?: boolean;
  /**
   * optional. Key, value object to define
   * default value in each of your print panel field. The key refers to the property's name of the field.
   * Example: {'comments': 'demo', 'legend': false}. Doesn't work for the DPI and the scale. Server's
   * values are used in priority.
   */
  fieldValues?: {
    [x: string]: string | number | boolean;
  };
  /**
   * The list of attributes that should be hidden.
   */
  hiddenAttributes?: string[];
};

/**
 * Configuration options for the themes service.
 */
export type gmfThemesOptions = {
  /**
   * Whether to add a blank background layer to the list of
   * available backgrounds.
   */
  addBlankBackgroundLayer?: boolean;
};

/**
 * Floor dimension values and labels.
 */
export type gmfFloors = Array<{
  [x: string]: string;
}>;

/**
 * The Authentication configuration.
 */
export type gmfAuthenticationConfig = {
  /**
   * Whether to show the password forgotten link. Default to true.
   */
  allowPasswordReset: boolean;
  /**
   * Whether to show the change password button. Default to true.
   * You can also specify a `PasswordValidator` object to add constraint on user's new password.
   */
  allowPasswordChange: boolean;
};

/**
 * The definition of an external OGC server
 */
export type ExternalOGCServer = {
  name: string;
  type: string;
  url: string;
};

export type gmfExternalOGCServers = ExternalOGCServer[];

export type gmfSearchGroups = string[];

/**
 * Don't request a new user object from the back-end after
 * logging out if the logged-in user's role has this role.
 */
export type gmfAuthenticationNoReloadRole = string | null;

/**
 * The CSV file name.
 */
export type gmfCsvFilename = string;

/**
 * The background layer selector options
 */
export type gmfBackgroundLayerSelectorOptions = {
  /**
   * The background layer with an opacity slider.
   */
  opacityLayer?: string;
};

/**
 * The disclaimers options
 */
export type gmfDisclaimerOptions = {
  /**
   * Whether to show the disclaimer messages in popups or not.
   * Defaults to `false`.
   */
  popup?: boolean;
  /**
   * Only display the disclaimer if the layer is visible.
   * Defaults to `true`.
   */
  layerVisibility?: boolean;
  /**
   * Whether to use disclaimer messages elsewhere or not. Default to `false`.
   * If true, you should use the externalMessage and the externalVisibility too.
   */
  external?: boolean;
};

/**
 * Configuration option for {@link import('gmf/query/gridComponent').GmfQueryGridComponent} to merge grid tabs.
 *
 * E.g. `'two_wheels_park': ['velo_park', 'moto_park']}` merges the sources
 * with label `velo_park` and `moto_park` into a new source `two_wheels_park`.
 */
export type GridMergeTabs = {
  [x: string]: string[];
};

/**
 * Use the query grid instead the query window to display the query result.
 */
export type gmfQueryGrid = boolean;

/**
 * The display querry grid component options.
 */
export type gmfDisplayQueryGridOptions = {
  /**
   * A style object for all features from the result of the query.
   */
  featuresStyle: StyleLike;
  /**
   * A style object for the currently selected features.
   */
  selectedFeatureStyle: StyleLike;
  /**
   * Should empty columns be hidden? Default: `false`.
   */
  removeEmptyColumns?: boolean;
  /**
   * Maximum zoom-level to use when zooming to selected features.
   */
  maxRecenterZoom?: number;
  /**
   * Configuration to merge grids with the same attributes into
   * a single grid.
   */
  mergeTabs?: GridMergeTabs;
};

/**
 * The display querry grid component options.
 */
export type gmfDisplayQueryWindowOptions = {
  /**
   * A style object for all features from the result of the query.
   */
  featuresStyle: StyleLike;
  /**
   * A style object for the currently selected features.
   */
  selectedFeatureStyle: StyleLike;
  /**
   * If the query result window is collapsed.
   */
  collapsed?: boolean;
};

export type LayerConfig = {
  filter?: string;
  args?: string[];
  postfix?: string;
  separator?: string;
};

/**
 * The elevation (raster) options.
 */
export type gmfElevationOptions = {
  /**
   * Elevation layers to use.
   */
  layers: string[];
  /**
   * Elevation layers configurations.
   */
  layersConfig: {
    [x: string]: LayerConfig;
  };
};

/**
 * The elevation (raster) options.
 */
export type gmfProfileOptions = {
  /**
   * Maximum limit of points to request.
   */
  numberOfPoints?: number;
  /**
   * The hover point style.
   */
  hoverPointStyle: StyleLike;
};

export type SearchAction = {
  /**
   * The action
   */
  action: string;
  /**
   * The title
   */
  title: string;
};

/**
 * Datasource configuration options for the search directive.
 */
export type SearchComponentDatasource = {
  /**
   * The optional Bloodhound configuration for this
   * data set. See: https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
   */
  bloodhoundOptions?: Bloodhound.BloodhoundOptions<GeoJSON.FeatureCollection>;
  /**
   * The name of a corresponding GeoJSON property key in the current dataset.
   * The bound value of this property key will be used as label.
   */
  labelKey: string;
  /**
   * Possible values for the 'layer_name' key.
   * Used to define groups of dataset.
   */
  groupValues?: string[];
  /**
   * List of allowed actions. The list may contain a
   * combination of `add_theme`, `add_group` or `add_layer`
   */
  groupActions?: SearchAction[];
  /**
   * The geometry's projection for this set of data.
   */
  projection?: string;
  /**
   * The optional Twitter.Typeahead.
   * configuration for this dataset. See: https://github.com/twitter/typeahead.js/blob/master/
   */
  typeaheadDatasetOptions?: Twitter.Typeahead.Dataset<OlFeature<OlGeomGeometry>>;
  /**
   * URL of the search service. Must contain a '%QUERY' term that will be
   * replaced by the input string.
   */
  url?: string;
  datasetTitle?: string;
};

export type gmfSearchOptions = {
  /**
   * A map of styles to apply on searched features. Keys must be the
   * 'layer_name' property of features except for coordinates where the key ifor its style is the value of
   * the constant 'gmf.COORDINATES_LAYER_NAME'. The 'default' key is used to apply the default style.
   */
  styles: {
    [x: string]: StyleLike;
  };
  /**
   * codes of supported projections for coordinates search
   * (projections must be defined in ol3). If not provided, only the map's view projection format will be
   * supported.
   */
  coordinatesProjections: string[];
  /**
   * Clear button in the input search.
   */
  clearButton?: boolean;
  /**
   * bloodhound request delay in ms.
   */
  delay?: number;
  /**
   * Whether to let the user change the style of the feature on the map.
   */
  colorChooser?: boolean;
  /**
   * maximum zoom we will zoom on result.
   */
  maxZoom?: number;
  /**
   * The placeholder.
   */
  placeholder?: string;
  /**
   * The used datasources.
   */
  datasources: SearchComponentDatasource[];
};

/**
 * Projection object for the MousePositionDirective. Define a label and a filter
 * to use to display coordinates for a projection.
 */
export type MousePositionProjection = {
  /**
   * The epsg name of a projection.
   */
  code: string;
  /**
   * The label to display with this projection.
   */
  label: string;
  /**
   * The filter function to use to format this projection. Arguments can be passed
   * with colon as separator (example: MyFilter:args1:args2:...)
   */
  filter: string;
};

export type gmfMousePositionOptions = {
  /**
   * The list of the projections.
   */
  projections: MousePositionProjection[];
};

export type gmfMobileMeasureAreaOptions = {
  /**
   * The number of significant digits to display.
   */
  precision?: number;
  /**
   * A style for the measure area.
   */
  sketchStyle: StyleLike;
};

export type gmfMobileMeasureLengthOptions = {
  /**
   * The number of significant digits to display.
   */
  precision?: number;
  /**
   * A style for the measure length.
   */
  sketchStyle: StyleLike;
};

export type MeasureRasterLayer = {
  name: string;
  decimals?: number;
  unit?: string;
};

export type gmfMobileMeasurePointOptions = {
  /**
   * The number of significant digits to display.
   */
  decimals: number;
  /**
   * The used formatter
   */
  format: string;
  /**
   * Raster elevation layers to get
   * information under the point and its configuration.
   */
  rasterLayers: MeasureRasterLayer[];
  /**
   * A style for the measure point.
   */
  sketchStyle: StyleLike;
};

export type gmfLayerTreeOptions = {
  /**
   * if true, open
   * metadataURLs in a new window. Otherwise open them in a popup.
   */
  openlinksinnewwindow: boolean;
  /**
   * [Experimental] Whether all the layer group is expanded by default.
   */
  isExpanded: boolean;
};

export type gmfShareOptions = {
  /**
   * Enhable email.
   */
  enableEmail?: boolean;
};

export type gmfEditFeatureOptions = {
  /**
   * A style object for highlighting of feature.
   */
  highlightStyle: StyleLike;
  /**
   * The buffer in pixels to use when making queries to get the features.
   */
  tolerance: number;
  /**
   * If true,
   * immediately return to the main edit panel after save. Default is false.
   */
  closeAfterSave: boolean;
};

/**
 * Use to inject custom javascript from an URL.
 */
export type gmfCustomJavascriptUrl = string | string[];

/**
 * Use to inject custom stylesheet from an URL.
 */
export type gmfCustomStylesheetUrl = string | string[];

/**
 * Does the application use tow factor authentication
 */
export type gmfTwoFactorAuth = boolean;

/**
 * Additional CSS for the different elements
 */
export type gmfCustomCSS = {
  authentication: string;
  authenticationPanel: string;
  desktopCanvas: string;
};

/**
 * The full configuration
 */
export type Configuration = {
  authenticationBaseUrl: authenticationBaseUrl;
  ngeoOfflineTestUrl: ngeoOfflineTestUrl;
  ngeoPermalinkOgcserverUrl: ngeoPermalinkOgcserverUrl;
  ngeoNominatimSearchDefaultParams: ngeoNominatimSearchDefaultParams;
  ngeoQueryOptions: ngeoQueryOptions;
  ngeoRoutingOptions: ngeoRoutingOptions;
  ngeoStringToHtmlReplacements: ngeoStringToHtmlReplacements;
  ngeoTilesPreloadingLimit: ngeoTilesPreloadingLimit;
  ngeoUsedKeyRegexp: ngeoUsedKeyRegexp;
  ngeoWfsPermalinkOptions: ngeoWfsPermalinkOptions;
  ngeoMeasurePrecision: ngeoMeasurePrecision;
  ngeoMeasureDecimals: ngeoMeasureDecimals;
  ngeoMeasureSpherical: ngeoMeasureSpherical;
  ngeoSnappingTolerance: ngeoSnappingTolerance;
  ngeoPointfilter: ngeoPointfilter;
  ngeoCsvEncoding: ngeoCsvEncoding;
  ngeoCsvExtension: ngeoCsvExtension;
  ngeoCsvIncludeHeader: ngeoCsvIncludeHeader;
  ngeoCsvQuote: ngeoCsvQuote;
  ngeoCsvSeparator: ngeoCsvSeparator;
  ngeoScaleSelectorOptions: ngeoScaleSelectorOptions;
  ngeoProfileOptions: ngeoProfileOptions;
  ngeoGeolocationOptions: ngeoGeolocationOptions;
  ngeoStreetviewOptions: ngeoStreetviewOptions;
  gmfTreeUrl: gmfTreeUrl;
  gmfShortenerCreateUrl: gmfShortenerCreateUrl;
  gmfRasterUrl: gmfRasterUrl;
  gmfProfileJsonUrl: gmfProfileJsonUrl;
  gmfLayersUrl: gmfLayersUrl;
  gmfPrintUrl: gmfPrintUrl;
  gmfOptions: gmfOptions;
  gmfProjectionsOptions: gmfProjectionsOptions;
  gmfTreeManagerModeFlush: gmfTreeManagerModeFlush;
  gmfContextualDataOptions: gmfContextualDataOptions;
  gmfObjectEditingToolsOptions: gmfObjectEditingToolsOptions;
  gmfPermalinkOptions: gmfPermalinkOptions;
  gmfPrintOptions: gmfPrintOptions;
  gmfThemesOptions: gmfThemesOptions;
  gmfFloors: gmfFloors;
  gmfAuthenticationConfig: gmfAuthenticationConfig;
  gmfExternalOGCServers: gmfExternalOGCServers;
  gmfSearchGroups: gmfSearchGroups;
  gmfAuthenticationNoReloadRole: gmfAuthenticationNoReloadRole;
  gmfCsvFilename: gmfCsvFilename;
  gmfBackgroundLayerSelectorOptions: gmfBackgroundLayerSelectorOptions;
  gmfDisclaimerOptions: gmfDisclaimerOptions;
  gmfQueryGrid: gmfQueryGrid;
  gmfDisplayQueryGridOptions: gmfDisplayQueryGridOptions;
  gmfDisplayQueryWindowOptions: gmfDisplayQueryWindowOptions;
  gmfElevationOptions: gmfElevationOptions;
  gmfProfileOptions: gmfProfileOptions;
  gmfSearchOptions: gmfSearchOptions;
  gmfMousePositionOptions: gmfMousePositionOptions;
  gmfMobileMeasureAreaOptions: gmfMobileMeasureAreaOptions;
  gmfMobileMeasureLengthOptions: gmfMobileMeasureLengthOptions;
  gmfMobileMeasurePointOptions: gmfMobileMeasurePointOptions;
  gmfLayerTreeOptions: gmfLayerTreeOptions;
  gmfShareOptions: gmfShareOptions;
  gmfEditFeatureOptions: gmfEditFeatureOptions;
  gmfCustomJavascriptUrl: gmfCustomJavascriptUrl;
  gmfCustomStylesheetUrl: gmfCustomStylesheetUrl;
  gmfTwoFactorAuth: gmfTwoFactorAuth;
  gmfCustomCSS: gmfCustomCSS;
};

export type APIConfig = {
  themesUrl?: string;
  localeUrl?: string;
  searchUrl?: string;
  projection?: string;
  projections?: {
    [x: string]: Projection;
  };
  resolutions?: number[];
  extent?: number[];
  backgroundLayer?: string;
  queryableLayers?: string[];
};

/**
 * Object used to expose all the Configurations we get from the dynamic.json.
 *
 * If you are in an element that extends BaseElement you just need to implement
 * the ``initConfig`` to get the configuration.
 *
 * Example of usage:
 *
 *    gmfapi.store.config.getConfig().subscribe({
 *      next: (configuration: Configuration) => {
 *        if (configuration) {
 *          ...
 *        }
 *      },
 *    })
 */
export class ConfigModel {
  /**
   * The observable config's properties.
   *
   * @private
   */
  configuration_: BehaviorSubject<Configuration> = new BehaviorSubject<Configuration>(null);

  /**
   * @returns the configuration.
   */
  getConfig(): BehaviorSubject<Configuration> {
    return this.configuration_;
  }

  /**
   * Set the configuration.
   *
   * @param config the configuration
   */
  setConfig(config: Configuration): void {
    this.configuration_.next(config);
  }
}

// Export default config instantiated (to use it as a singleton).
const config = new ConfigModel();
export default config;
