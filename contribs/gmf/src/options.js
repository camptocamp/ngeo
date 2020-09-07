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
 * @module contribs/gmf/src/options
 */

import olStyleCircle from 'ol/style/Circle.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyle from 'ol/style/Style.js';
import {createDefaultStyle} from 'ol/style/Style.js';

/**
 * Flush mode active?
 * @typedef {boolean} gmfTreeManagerModeFlush
 */

/**
 * @typedef {Object} gmfContextualdataOptions
 * @property {Object<string, string>} rasterParams The raster service parameters
 * @property {string[]} projections
 */

/**
 * Additional configuration options for the object editing tools directive.
 * @typedef {Object} gmfObjectEditingToolsOptions
 * @property {number} [regularPolygonRadius=100] The radius of the shapes created by the regular polygon
 * radius creation tool. The value is in map units.
 */

/**
 * Configuration options for the permalink service.
 * @typedef {Object} gmfPermalinkOptions
 * @property {StyleLike} [crosshairStyle] An alternate style for the crosshair feature added by the
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
 * @property {boolean} [useBbox]
 * @property {Object<string, boolean>} label
 * @property {Object<string, Object<string, string>>} params
 */

/**
 * @typedef {Object} gmfPrintOptions
 * @property {boolean} [scaleInput]
 * @property {OptionsLegendType} [legend]
 * @property {number} [goodnessOfFit]
 * @property {string} [defaultLayout]
 */

/**
 * Configuration options for the themes service.
 * @typedef {Object} gmfThemesOptions
 * @property {boolean} [addBlankBackgroundLayer] Whether to add a blank background layer to the list of
 *    available backgrounds.
 */

/**
 * Floor dimension values and labels.
 * @typedef {Array<Object<string, string>>} gmfFloors
 */

/**
 * The Authentication configuration.
 * @typedef {Object} gmfAuthenticationConfig
 * @property {boolean} allowPasswordReset Whether to show the password forgotten link. Default to true.
 * @property {boolean} allowPasswordChange Whether to show the change password button. Default to true.
 *    You can also specify a `PasswordValidator` object to add constraint on user's new password.
 * @property {boolean} forcePasswordChange Force the user to change its password. Default to false.
 *    If you set it to true, you should also allow the user to change its password. Don't add this option
 *    alone, use it in a dedicated authentication component.
 */

/**
 * The definition of an external OGC server
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
 * @typedef {?string} gmfAuthenticationNoReloadRole
 */

/**
 * The CSV file name.
 * @typedef {string} gmfCsvFilename
 */

/**
 * The background layer selector options
 * @typedef {Object} gmfBackgroundLayerSelectorOptions
 * @property {string} [opacityLayer] The background layer with an opacity slider.
 */

/**
 * The disclaimers options
 * @typedef {Object} gmfDisclaimerOptions
 * @property {boolean} [popup] Whether to show the disclaimer messages in popups or not.
 * Defaults to `false`.
 * @property {boolean} [layerVisibility] Only display the disclaimer if the layer is visible.
 * Defaults to `true`.
 * @property {boolean} [external] Whether to use disclaimer messages elsewhere or not. Default to `false`.
 * If true, you should use the externalMessage and the externalVisibility too.
 */

/**
 * Configuration option for {@link import("gmf/query/gridComponent.js").default} to merge
 * grid tabs.
 *
 * E.g. `'two_wheels_park': ['velo_park', 'moto_park']}` merges the sources
 * with label `velo_park` and `moto_park` into a new source `two_wheels_park`.
 *
 * @typedef {Object<string, string[]>} GridMergeTabs
 */

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
 * @property {Array<number>} [displacement=[0,0]] Displacement of the shape
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
 * @returns {import("ol/style/Style.js").StyleLike}
 */
export function buildStyle(styleDescriptor) {
  if (styleDescriptor instanceof olStyle) {
    return styleDescriptor;
  } else if (!styleDescriptor) {
    return createDefaultStyle;
  } else if (Array.isArray(styleDescriptor)) {
    const result = [];
    for (const style of styleDescriptor) {
      result.push(buildStyle(style));
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
 * The display querry grid component options.
 * @typedef {Object} gmfDisplayQueryGridOptions
 * @property {StyleLike} featuresStyle A style object for all features from the result of the query.
 * @property {StyleLike} selectedFeatureStyle A style object for the currently selected features.
 * @property {boolean} [removeEmptyColumns] Should empty columns be hidden? Default: `false`.
 * @property {number} [maxRecenterZoom] Maximum zoom-level to use when zooming to selected features.
 * @property {GridMergeTabs} [mergeTabs] Configuration to merge grids with the same attributes into
 * a single grid.
 */

/**
 * The display querry grid component options.
 * @typedef {Object} gmfDisplayQueryWindowOptions
 * @property {StyleLike} featuresStyle A style object for all features from the result of the query.
 * @property {StyleLike} selectedFeatureStyle A style object for the currently selected features.
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
 * @typedef {Object} gmfElevationOptions
 * @property {string[]} layers Elevation layers to use.
 * @property {Object<string, LayerConfig>} layersConfig Elevation layers configurations.
 */

/**
 * The elevation (raster) options.
 * @typedef {Object} gmfProfileOptions
 * @property {number} [numberOfPoints=100] Maximum limit of points to request.
 * @property {StyleLike} hoverPointStyle The hover point style.
 */

/**
 * @typedef {Object} gmfSearchOptions
 * @property {Object<string, Style>} styles A map of styles to apply on searched features. Keys must be the
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
 */

/**
 * Projection object for the MousePositionDirective. Define a label and a filter
 * to use to display coordinates for a projection.
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
 * @property {StyleLike} sketchStyle A style for the measure area.
 */

/**
 * @typedef {Object} gmfMobileMeasureLengthOptions
 * @property {number} [precision=2] The number of significant digits to display.
 * @property {StyleLike} sketchStyle A style for the measure length.
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
 *     information under the point and its configuaration.
 * @property {StyleLike} sketchStyle A style for the measure point.
 */

/**
 * @typedef {Object} gmfLayerTreeOptions
 * @property {boolean} openlinksinnewwindow if true, open
 *    metadataURLs in a new window. Otherwise open them in a popup.
 * @property {boolean} isExpanded [Experimental] Whether all the layer group is expanded by default.
 */

export default undefined;
