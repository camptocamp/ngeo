import angular from 'angular';
import ngeoMiscFilters from 'ngeo/misc/filters.js';

import ngeoDownloadService from 'ngeo/download/service.js';

import ngeoFormatFeatureProperties from 'ngeo/format/FeatureProperties.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import {getFormattedLength, getFormattedArea, getFormattedPoint} from 'ngeo/interaction/Measure.js';
import {getFormattedAzimutRadius} from 'ngeo/interaction/MeasureAzimut.js';
import {fromString as colorFromString} from 'ol/color.js';
import * as olExtent from 'ol/extent.js';
import olFeature from 'ol/Feature.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomSimpleGeometry from 'ol/geom/SimpleGeometry.js';
import olFormatGPX from 'ol/format/GPX.js';
import olFormatKML from 'ol/format/KML.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleRegularShape from 'ol/style/RegularShape.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';

/**
 * The radius, in pixels, of the regular shape rendered as style for
 * the vertex of a feature while it's being edited.
 * @private
 * @hidden
 */
const VertexStyleRegularShapeRadius = 6;

/**
 * Format types
 * @enum {string}
 * @hidden
 */
export const FeatureFormatType = {
  /**
   * @type {string}
   */
  GPX: 'GPX',
  /**
   * @type {string}
   */
  KML: 'KML',
};

/**
 * Provides methods for features, such as:
 *  - style setting / getting
 *  - measurement
 *  - export
 *
 * @constructor
 * @param {!angular.auto.IInjectorService} $injector Main injector.
 * @param {!angular.IFilterService} $filter Angular filter.
 * @ngdoc service
 * @ngname ngeoFeatureHelper
 * @ngInject
 * @hidden
 */
export function FeatureHelper($injector, $filter) {
  /**
   * @type {!angular.IFilterService}
   * @private
   */
  this.$filter_ = $filter;

  /**
   * @type {number|undefined}
   * @private
   */
  this.decimals_ = undefined;
  if ($injector.has('ngeoMeasureDecimals')) {
    this.decimals_ = $injector.get('ngeoMeasureDecimals');
  }

  /**
   * @type {number|undefined}
   * @private
   */
  this.precision_ = undefined;
  if ($injector.has('ngeoMeasurePrecision')) {
    this.precision_ = $injector.get('ngeoMeasurePrecision');
  }

  /**
   * @type {!import('ngeo/misc/filters.js').formatNumber}
   */
  this.numberFormat_ = /** @type {import('ngeo/misc/filters.js').formatNumber} */ ($filter('number'));

  /**
   * @type {!import('ngeo/misc/filters.js').unitPrefix}
   */
  this.unitPrefixFormat_ = /** @type {import('ngeo/misc/filters.js').unitPrefix} */ (
    $filter('ngeoUnitPrefix')
  );

  /**
   * @type {!import('ngeo/misc/filters.js').numberCoordinates}
   */
  this.ngeoNumberCoordinates_ = /** @type {import('ngeo/misc/filters.js').numberCoordinates} */ (
    $filter('ngeoNumberCoordinates')
  );

  /**
   * Filter function to display point coordinates or null to don't use any filter.
   * @type {angular.IFilterFilter}
   * @private
   */
  this.pointFilterFn_ = null;

  /**
   * Arguments to apply to the point filter function.
   * @type {Array.<*>}
   * @private
   */
  this.pointFilterArgs_ = [];

  if ($injector.has('ngeoPointfilter')) {
    const filterElements = $injector.get('ngeoPointfilter').split(':');
    const filterName = filterElements.shift();
    const filter = this.$filter_(filterName);
    console.assert(typeof filter == 'function');
    this.pointFilterFn_ = filter;
    this.pointFilterArgs_ = filterElements;
  } else {
    this.pointFilterFn_ = null;
  }

  /**
   * @type {!import("ol/proj/Projection.js").default}
   * @private
   */
  this.projection_;

  /**
   * Download service.
   * @type {import('ngeo/download/service.js').Download}
   * @private
   */
  this.download_ = $injector.get('ngeoDownload');
}

/**
 * @param {!import("ol/proj/Projection.js").default} projection Projection.
 */
FeatureHelper.prototype.setProjection = function (projection) {
  this.projection_ = projection;
};

// === STYLE METHODS ===

/**
 * Set the style of a feature using its inner properties and depending on
 * its geometry type.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {boolean=} opt_select Whether the feature should be rendered as
 *     selected, which includes additional vertex and halo styles.
 */
FeatureHelper.prototype.setStyle = function (feature, opt_select) {
  const styles = this.getStyle(feature);
  if (opt_select) {
    if (this.supportsVertex_(feature)) {
      styles.push(this.getVertexStyle());
    }
    styles.unshift(this.getHaloStyle_(feature));
  }
  feature.setStyle(styles);
};

/**
 * Create and return a style object from a given feature using its inner
 * properties and depending on its geometry type.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {!Array.<!import("ol/style/Style.js").default>} The style object.
 */
FeatureHelper.prototype.getStyle = function (feature) {
  const type = this.getType(feature);
  let style;

  switch (type) {
    case ngeoGeometryType.LINE_STRING:
      style = this.getLineStringStyle_(feature);
      break;
    case ngeoGeometryType.POINT:
      style = this.getPointStyle_(feature);
      break;
    case ngeoGeometryType.CIRCLE:
    case ngeoGeometryType.POLYGON:
    case ngeoGeometryType.RECTANGLE:
      style = this.getPolygonStyle_(feature);
      break;
    case ngeoGeometryType.TEXT:
      style = this.getTextStyle_(feature);
      break;
    default:
      break;
  }

  console.assert(style, 'Style should be thruthy');

  /** @type {!Array<!import("ol/style/Style.js").default>} */
  let styles;
  if (style.constructor === Array) {
    styles = /** @type {!Array.<!import("ol/style/Style.js").default>}*/ (style);
  } else {
    styles = [/** @type {!import("ol/style/Style.js").default}*/ (style)];
  }

  return styles;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature with linestring geometry.
 * @return {!Array.<!import("ol/style/Style.js").default>} Style.
 * @private
 */
FeatureHelper.prototype.getLineStringStyle_ = function (feature) {
  const strokeWidth = this.getStrokeProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);
  const color = this.getRGBAColorProperty(feature);

  const styles = [
    new olStyleStyle({
      stroke: new olStyleStroke({
        color: color,
        width: strokeWidth,
      }),
    }),
  ];
  //Label Style
  const textLabelValues = [];
  if (showMeasure) {
    textLabelValues.push(this.getMeasure(feature));
  }
  if (showLabel) {
    textLabelValues.push(this.getNameProperty(feature));
  }
  if (showLabel || showMeasure) {
    // display both label using \n
    const textLabelValue = textLabelValues.join('\n');
    styles.push(
      new olStyleStyle({
        text: this.createTextStyle_({
          propertyName: '',
          name: '',
          text: textLabelValue,
        }),
      })
    );
  }
  return styles;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature with point geometry.
 * @return {!Array.<!import("ol/style/Style.js").default>} Style.
 * @private
 */
FeatureHelper.prototype.getPointStyle_ = function (feature) {
  const size = this.getSizeProperty(feature);
  const color = this.getRGBAColorProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);
  const styles = [
    new olStyleStyle({
      image: new olStyleCircle({
        radius: size,
        fill: new olStyleFill({
          color: color,
        }),
      }),
    }),
  ];
  // Label Style
  const textLabelValues = [];
  if (showMeasure) {
    textLabelValues.push(this.getMeasure(feature));
  }
  if (showLabel) {
    textLabelValues.push(this.getNameProperty(feature));
  }
  if (showLabel || showMeasure) {
    // display both label using \n
    const textLabelValue = textLabelValues.join('\n');
    const font_size = 10;
    // https://reeddesign.co.uk/test/points-pixels.html
    const point_to_px = 1.3;
    styles.push(
      new olStyleStyle({
        text: this.createTextStyle_({
          propertyName: '',
          name: '',
          text: textLabelValue,
          size: font_size,
          offsetY: -(size + (font_size / 2) * textLabelValues.length * point_to_px + 4),
        }),
      })
    );
  }
  return styles;
};

/**
 * Get an optional number feature attribute.
 *
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {string} attrib The attribute name.
 * @return {number|undefined}, The attribute value
 */
FeatureHelper.prototype.optNumber = function (feature, attrib) {
  const value = feature.get(attrib);
  if (value !== undefined) {
    if (typeof value == 'string') {
      return +value;
    } else {
      return value;
    }
  } else {
    return undefined;
  }
};

/**
 * Get a number feature attribute.
 *
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {string} attrib The attribute name.
 * @return {number}, The attribute value
 */
FeatureHelper.prototype.getNumber = function (feature, attrib) {
  const value = feature.get(attrib);
  if (typeof value == 'string') {
    return +value;
  } else {
    return value;
  }
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature with polygon geometry.
 * @return {!Array.<!import("ol/style/Style.js").default>} Style.
 * @private
 */
FeatureHelper.prototype.getPolygonStyle_ = function (feature) {
  const strokeWidth = this.getStrokeProperty(feature);
  const opacity = this.getOpacityProperty(feature);
  const color = this.getRGBAColorProperty(feature);
  const showLabel = this.getShowLabelProperty(feature);
  const showMeasure = this.getShowMeasureProperty(feature);

  // fill color with opacity
  const fillColor = color.slice();
  fillColor[3] = opacity;

  const azimut = this.optNumber(feature, ngeoFormatFeatureProperties.AZIMUT);

  const styles = [
    new olStyleStyle({
      fill: new olStyleFill({
        color: fillColor,
      }),
      stroke: new olStyleStroke({
        color: color,
        width: strokeWidth,
      }),
    }),
  ];
  if (showMeasure || showLabel) {
    if (showMeasure && azimut !== undefined) {
      // Radius style:
      const line = this.getRadiusLine(feature, azimut);
      const length = getFormattedLength(line, this.projection_, this.precision_, this.unitPrefixFormat_);

      styles.push(
        new olStyleStyle({
          geometry: line,
          fill: new olStyleFill({
            color: fillColor,
          }),
          stroke: new olStyleStroke({
            color: color,
            width: strokeWidth,
          }),
          text: this.createTextStyle_({
            propertyName: '',
            name: '',
            text: length,
            angle: (((azimut % 180) + 180) % 180) - 90,
          }),
        })
      );

      // Azimut style
      styles.push(
        new olStyleStyle({
          geometry: new olGeomPoint(line.getLastCoordinate()),
          text: this.createTextStyle_({
            propertyName: '',
            name: '',
            text: `${this.numberFormat_(azimut, this.decimals_)}°`,
            size: 10,
            offsetX: Math.cos(((azimut - 90) * Math.PI) / 180) * 20,
            offsetY: Math.sin(((azimut - 90) * Math.PI) / 180) * 20,
          }),
        })
      );

      //Label Style
      if (showLabel) {
        styles.push(
          new olStyleStyle({
            text: this.createTextStyle_({
              propertyName: '',
              name: '',
              text: this.getNameProperty(feature),
              offsetY: -8,
              exceedLength: true,
            }),
          })
        );
      }
    } else {
      //Label Style
      const textLabelValues = [];
      if (showMeasure) {
        textLabelValues.push(this.getMeasure(feature));
      }
      if (showLabel) {
        textLabelValues.push(this.getNameProperty(feature));
      }
      if (showLabel || showMeasure) {
        // display both label using \n
        const textLabelValue = textLabelValues.join('\n');
        styles.push(
          new olStyleStyle({
            text: this.createTextStyle_({
              propertyName: '',
              name: '',
              text: textLabelValue,
              exceedLength: true,
            }),
          })
        );
      }
    }
  }
  return styles;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature with point geometry, rendered as text.
 * @return {!import("ol/style/Style.js").default} Style.
 * @private
 */
FeatureHelper.prototype.getTextStyle_ = function (feature) {
  return new olStyleStyle({
    text: this.createTextStyle_({
      propertyName: '',
      name: '',
      rotateWithView: true,
      text: this.getNameProperty(feature),
      size: this.getSizeProperty(feature),
      angle: this.getAngleProperty(feature),
      color: this.getRGBAColorProperty(feature),
      width: this.getStrokeProperty(feature),
    }),
  });
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature to create the editing styles with.
 * @return {!Array.<!import("ol/style/Style.js").default>} List of style.
 */
FeatureHelper.prototype.createEditingStyles = function (feature) {
  // (1) Style definition depends on geometry type
  const white = [255, 255, 255, 1];
  const blue = [0, 153, 255, 1];
  const width = 3;
  const styles = [];

  const geom = feature.getGeometry();
  console.assert(geom);
  const type = geom.getType();

  if (type === 'Point') {
    styles.push(
      new olStyleStyle({
        image: new olStyleCircle({
          radius: width * 2,
          fill: new olStyleFill({
            color: blue,
          }),
          stroke: new olStyleStroke({
            color: white,
            width: width / 2,
          }),
        }),
        zIndex: Infinity,
      })
    );
  } else {
    if (type === 'LineString') {
      styles.push(
        new olStyleStyle({
          stroke: new olStyleStroke({
            color: white,
            width: width + 2,
          }),
        })
      );
      styles.push(
        new olStyleStyle({
          stroke: new olStyleStroke({
            color: blue,
            width: width,
          }),
        })
      );
    } else {
      styles.push(
        new olStyleStyle({
          stroke: new olStyleStroke({
            color: blue,
            width: width / 2,
          }),
          fill: new olStyleFill({
            color: [255, 255, 255, 0.5],
          }),
        })
      );
    }

    // (2) Anything else than 'Point' requires the vertex style as well
    styles.push(this.getVertexStyle(true));
  }

  return styles;
};

/**
 * For a given feature, if its geometry supports vertice that can be
 * removed on click, then check if there is a vertex a the given
 * coordinate. The map current map view resolution is used to
 * calculate a buffer of the size of the vertex (using its style).
 *
 * If a vertex hits, then return its information, i.e. its indexes
 * among the coordinates of the geometry of the feature, as an
 * array. For example, if the geometry is a LineString, then the
 * coordinates are an array of ol.Coordinate, so a single index is
 * required. For a polygon, coordinates are an array of array of
 * coordinates, so 2 indexes are required.
 *
 * If removing a vertex would make the geometry invalid, then the
 * vertex info is not returned.
 *
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {!import("ol/coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} resolution Current map view resolution.
 * @return {?Array.<number>} The indexes of the vertex (coordinate) that hits.
 */
FeatureHelper.prototype.getVertexInfoAtCoordinate = function (feature, coordinate, resolution) {
  let info = null;

  if (this.supportsVertexRemoval_(feature)) {
    const buffer = resolution * VertexStyleRegularShapeRadius;
    let coordinates = null;
    let coordinatess = null;
    let coordinatesss = null;
    let minNumCoordinates;

    const geometry = feature.getGeometry();
    if (geometry instanceof olGeomLineString) {
      coordinates = geometry.getCoordinates();
      minNumCoordinates = 2;
    } else if (geometry instanceof olGeomPolygon) {
      coordinatess = geometry.getCoordinates();
      minNumCoordinates = 4;
    } else if (geometry instanceof olGeomMultiLineString) {
      coordinatess = geometry.getCoordinates();
      minNumCoordinates = 2;
    } else if (geometry instanceof olGeomMultiPolygon) {
      coordinatesss = geometry.getCoordinates();
      minNumCoordinates = 4;
    }

    if (coordinates) {
      // Array of ol.Coordinate - 1 index
      const index = this.getCoordinateIndexThatHitsAt_(coordinates, coordinate, minNumCoordinates, buffer);
      if (index !== -1) {
        info = [index];
      }
    } else if (coordinatess) {
      // Array of Array of ol.Coordinate - 2 indexes
      const ii = coordinatess.length;
      for (let i = 0; i < ii; i++) {
        const index = this.getCoordinateIndexThatHitsAt_(
          coordinatess[i],
          coordinate,
          minNumCoordinates,
          buffer
        );
        if (index !== -1) {
          info = [i, index];
          break;
        }
      }
    } else if (coordinatesss) {
      // Array of Array of Array of ol.Coordinate - 3 indexes
      const ii = coordinatesss.length;
      for (let i = 0; i < ii; i++) {
        const coordinatess = coordinatesss[i];
        const jj = coordinatess.length;
        for (let j = 0; j < jj; j++) {
          const index = this.getCoordinateIndexThatHitsAt_(
            coordinatess[j],
            coordinate,
            minNumCoordinates,
            buffer
          );
          if (index !== -1) {
            info = [i, j, index];
            break;
          }
        }
        if (info) {
          break;
        }
      }
    }
  }

  return info;
};

/**
 * Loop in the given coordinates and look one that hits an other given
 * coordinate using a buffer. If one does, return its index.
 *
 * @param {!Array.<!import("ol/coordinate.js").Coordinate>} coordinates Coordinates in which to
 *     loop to find the one that hits the other given coordinate.
 * @param {!import("ol/coordinate.js").Coordinate} coordinate Coordinate that has to hit.
 * @param {number} min Minimum number of coordinates required to look
 *     for the one that hits.
 * @param {number} buffer Buffer, in map view units, to extend the
 *     extent with.
 * @return {number} Index of the coordinate that hits. If none did, -1
 *     is returned.
 * @private
 */
FeatureHelper.prototype.getCoordinateIndexThatHitsAt_ = function (coordinates, coordinate, min, buffer) {
  let index = -1;
  const ii = coordinates.length;

  if (ii > min) {
    for (let i = 0; i < ii; i++) {
      const hits = olExtent.containsCoordinate(
        olExtent.buffer(olExtent.createOrUpdateFromCoordinate(coordinates[i]), buffer),
        coordinate
      );
      if (hits) {
        index = i;
        break;
      }
    }
  }

  return index;
};

/**
 * Create and return a style object to be used for vertex.
 * @param {boolean=} opt_incGeomFunc Whether to include the geometry function
 *     or not. One wants to use the geometry function when you want to draw
 *     the vertex of features that don't have point geometries. One doesn't
 *     want to include the geometry function if you just want to have the
 *     style object itself to be used to draw features that have point
 *     geometries. Defaults to `true`.
 * @return {!import("ol/style/Style.js").default} Style.
 */
FeatureHelper.prototype.getVertexStyle = function (opt_incGeomFunc) {
  const incGeomFunc = opt_incGeomFunc !== undefined ? opt_incGeomFunc : true;

  const options = {
    image: new olStyleRegularShape({
      radius: VertexStyleRegularShapeRadius,
      points: 4,
      angle: Math.PI / 4,
      fill: new olStyleFill({
        color: [255, 255, 255, 0.5],
      }),
      stroke: new olStyleStroke({
        color: [0, 0, 0, 1],
      }),
    }),
  };

  if (incGeomFunc) {
    options.geometry = function (feature) {
      const geom = feature.getGeometry();

      if (!geom || geom.getType() == 'Point') {
        return;
      }

      let innerMultiCoordinates;
      let multiCoordinates = [];
      let coordinates = [];
      let i, ii;
      if (geom instanceof olGeomLineString) {
        coordinates = geom.getCoordinates();
      } else if (geom instanceof olGeomMultiLineString) {
        multiCoordinates = geom.getCoordinates();
      } else if (geom instanceof olGeomPolygon) {
        coordinates = geom.getCoordinates()[0];
      } else if (geom instanceof olGeomMultiPolygon) {
        innerMultiCoordinates = geom.getCoordinates();
      }

      if (innerMultiCoordinates) {
        for (i = 0, ii = innerMultiCoordinates.length; i < ii; i++) {
          multiCoordinates = multiCoordinates.concat(innerMultiCoordinates[i]);
        }
      }
      for (i = 0, ii = multiCoordinates.length; i < ii; i++) {
        coordinates = coordinates.concat(multiCoordinates[i]);
      }

      if (coordinates.length) {
        return new olGeomMultiPoint(coordinates);
      } else {
        return geom;
      }
    };
  }

  return new olStyleStyle(options);
};

/**
 * Remove a vertex from a feature using the given information (indexes).
 *
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {!Array.<number>} vertexInfo The indexes of the vertex
 *     (coordinate) to remove.
 */
FeatureHelper.prototype.removeVertex = function (feature, vertexInfo) {
  let deleted = false;

  const geometry = /** @type {olGeomSimpleGeometry} */ (feature.getGeometry());
  console.assert(geometry instanceof olGeomSimpleGeometry);
  const coordinates = geometry.getCoordinates();

  if (geometry instanceof olGeomLineString) {
    // LineString
    const index = vertexInfo[0];
    if (coordinates.length > 2) {
      coordinates.splice(index, 1);
      deleted = true;
    }
  } else if (geometry instanceof olGeomPolygon) {
    // Polygon
    const indexOne = vertexInfo[0];
    const indexTwo = vertexInfo[1];
    const component = coordinates[indexOne];
    if (component.length > 4) {
      component.splice(indexTwo, 1);
      deleted = true;
      // close the ring again
      if (indexTwo === 0) {
        component.pop();
        component.push(component[0]);
      }
    }
  } else if (geometry instanceof olGeomMultiLineString) {
    // MultiLineString
    const indexOne = vertexInfo[0];
    const indexTwo = vertexInfo[1];
    if (coordinates[indexOne].length > 2) {
      coordinates[indexOne].splice(indexTwo, 1);
      deleted = true;
    }
  } else if (geometry instanceof olGeomMultiPolygon) {
    // MultiPolygon
    const indexOne = vertexInfo[0];
    const indexTwo = vertexInfo[1];
    const indexThree = vertexInfo[2];
    const component = coordinates[indexOne][indexTwo];
    if (component.length > 4) {
      component.splice(indexThree, 1);
      deleted = true;
      // close the ring again
      if (indexThree === 0) {
        component.pop();
        component.push(component[0]);
      }
    }
  }

  if (deleted) {
    geometry.setCoordinates(coordinates);
  }
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {boolean} Whether the feature supports vertex or not.
 * @private
 */
FeatureHelper.prototype.supportsVertex_ = function (feature) {
  const supported = [
    ngeoGeometryType.LINE_STRING,
    ngeoGeometryType.MULTI_LINE_STRING,
    ngeoGeometryType.MULTI_POLYGON,
    ngeoGeometryType.POLYGON,
    ngeoGeometryType.RECTANGLE,
  ];
  const type = this.getType(feature);
  return supported.includes(type);
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {boolean} Whether the feature supports having its vertex
 *     removed or not. Does not validate the number of coordinates.
 * @private
 */
FeatureHelper.prototype.supportsVertexRemoval_ = function (feature) {
  const supported = [
    ngeoGeometryType.LINE_STRING,
    ngeoGeometryType.MULTI_LINE_STRING,
    ngeoGeometryType.MULTI_POLYGON,
    ngeoGeometryType.POLYGON,
  ];
  const type = this.getType(feature);
  return supported.includes(type);
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {!import("ol/style/Style.js").default} Style.
 * @private
 */
FeatureHelper.prototype.getHaloStyle_ = function (feature) {
  const type = this.getType(feature);
  let style;
  const haloSize = 3;

  switch (type) {
    case ngeoGeometryType.POINT:
      const size = this.getSizeProperty(feature);
      style = new olStyleStyle({
        image: new olStyleCircle({
          radius: size + haloSize,
          fill: new olStyleFill({
            color: [255, 255, 255, 1],
          }),
        }),
      });
      break;
    case ngeoGeometryType.LINE_STRING:
    case ngeoGeometryType.CIRCLE:
    case ngeoGeometryType.POLYGON:
    case ngeoGeometryType.RECTANGLE:
      const strokeWidth = this.getStrokeProperty(feature);
      style = new olStyleStyle({
        stroke: new olStyleStroke({
          color: [255, 255, 255, 1],
          width: strokeWidth + haloSize * 2,
        }),
      });
      break;
    case ngeoGeometryType.TEXT:
      style = new olStyleStyle({
        text: this.createTextStyle_({
          propertyName: '',
          name: '',
          text: this.getNameProperty(feature),
          size: this.getSizeProperty(feature),
          angle: this.getAngleProperty(feature),
          width: haloSize * 3,
        }),
      });
      break;
    default:
      break;
  }

  console.assert(style, 'Style should be thruthy');

  return style;
};

// === PROPERTY GETTERS ===

/**
 * Delete the unwanted ol3 properties from the current feature then return the properties.
 * Also delete the 'ngeo_feature_type_' from the ngeo query system.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {!Object.<string, *>} Filtered properties of the current feature.
 * @hidden
 */
export function getFilteredFeatureValues(feature) {
  const properties = feature.getProperties();
  delete properties['boundedBy'];
  delete properties[feature.getGeometryName()];
  delete properties['ngeo_feature_type_'];
  return properties;
}

/**
 * @param {import("ol/Feature.js").default} feature Feature.
 * @return {number} Angle.
 */
FeatureHelper.prototype.getAngleProperty = function (feature) {
  const angle = +(/** @type {string} */ (feature.get(ngeoFormatFeatureProperties.ANGLE)));
  console.assert(typeof angle == 'number');
  return angle;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {string|undefined} Color.
 */
FeatureHelper.prototype.getColorProperty = function (feature) {
  return feature.get(ngeoFormatFeatureProperties.COLOR);
};

/**
 * @param {!import('ol/Feature.js').default} feature Feature.
 * @return {import('ol/color.js').Color} Color.
 */
FeatureHelper.prototype.getRGBAColorProperty = function (feature) {
  const color = this.getColorProperty(feature);
  if (color) {
    return colorFromString(color);
  }
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {string} Name.
 */
FeatureHelper.prototype.getNameProperty = function (feature) {
  const name = feature.get(ngeoFormatFeatureProperties.NAME);
  console.assert(typeof name == 'string');
  return name;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {number} Opacity.
 */
FeatureHelper.prototype.getOpacityProperty = function (feature) {
  return this.getNumber(feature, ngeoFormatFeatureProperties.OPACITY);
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {boolean} Show measure.
 */
FeatureHelper.prototype.getShowMeasureProperty = function (feature) {
  let showMeasure = feature.get(ngeoFormatFeatureProperties.SHOW_MEASURE);
  if (showMeasure === undefined) {
    showMeasure = false;
  } else if (typeof showMeasure === 'string') {
    showMeasure = showMeasure === 'true' ? true : false;
  }
  return showMeasure;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {boolean} Show feature label.
 */
FeatureHelper.prototype.getShowLabelProperty = function (feature) {
  let showLabel = feature.get(ngeoFormatFeatureProperties.SHOW_LABEL);
  if (showLabel === undefined) {
    showLabel = false;
  } else if (typeof showLabel === 'string') {
    showLabel = showLabel === 'true' ? true : false;
  }
  return showLabel;
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {number} Size.
 */
FeatureHelper.prototype.getSizeProperty = function (feature) {
  return this.getNumber(feature, ngeoFormatFeatureProperties.SIZE);
};

/**
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {number} Stroke.
 */
FeatureHelper.prototype.getStrokeProperty = function (feature) {
  return this.getNumber(feature, ngeoFormatFeatureProperties.STROKE);
};

// === EXPORT ===

/**
 * Export features in the given format. The projection of the exported features
 * is: `EPSG:4326`.
 * @param {!Array.<!import("ol/Feature.js").default>} features Array of vector features.
 * @param {string} formatType Format type to export the features.
 */
FeatureHelper.prototype.export = function (features, formatType) {
  switch (formatType) {
    case FeatureFormatType.GPX:
      this.exportGPX(features);
      break;
    case FeatureFormatType.KML:
      this.exportKML(features);
      break;
    default:
      break;
  }
};

/**
 * Export features in GPX and download the result to the browser. The
 * projection of the exported features is: `EPSG:4326`.
 * @param {!Array.<!import("ol/Feature.js").default>} features Array of vector features.
 */
FeatureHelper.prototype.exportGPX = function (features) {
  const format = new olFormatGPX();
  const mimeType = 'application/gpx+xml';
  const fileName = 'export.gpx';
  this.export_(features, format, fileName, mimeType);
};

/**
 * Export features in KML and download the result to the browser. The
 * projection of the exported features is: `EPSG:4326`.
 * @param {!Array.<!import("ol/Feature.js").default>} features Array of vector features.
 */
FeatureHelper.prototype.exportKML = function (features) {
  const format = new olFormatKML();
  const mimeType = 'application/vnd.google-earth.kml+xml';
  const fileName = 'export.kml';
  this.export_(features, format, fileName, mimeType);
};

/**
 * Export features using a given format to a specific filename and download
 * the result to the browser. The projection of the exported features is:
 * `EPSG:4326`.
 * @param {!Array.<!import("ol/Feature.js").default>} features Array of vector features.
 * @param {!import("ol/format/Feature.js").default} format Format
 * @param {string} fileName Name of the file.
 * @param {string=} opt_mimeType Mime type. Defaults to 'text/plain'.
 * @private
 */
FeatureHelper.prototype.export_ = function (features, format, fileName, opt_mimeType) {
  const mimeType = opt_mimeType !== undefined ? opt_mimeType : 'text/plain';

  // clone the features to apply the original style to the clone
  // (the original may have select style active)
  const clones = [];
  let clone;
  features.forEach((feature) => {
    clone = new olFeature(feature.getProperties());
    this.setStyle(clone, false);
    clones.push(clone);
  });

  const writeOptions = this.projection_
    ? {
        dataProjection: 'EPSG:4326',
        featureProjection: this.projection_,
      }
    : {};

  const data = format.writeFeatures(clones, writeOptions);
  this.download_(data, fileName, `${mimeType};charset=utf-8`);
};

// === OTHER UTILITY METHODS ===

/**
 * @param {!import('ngeo/rule/Text.js').TextOptions} options Options.
 * @return {!import('ol/style/Text.js').default} Style.
 * @private
 */
FeatureHelper.prototype.createTextStyle_ = function (options) {
  /** @type {import('ol/style/Text.js').Options} */
  const text_options = options;
  if (options.angle) {
    const angle = options.angle !== undefined ? options.angle : 0;
    const rotation = (angle * Math.PI) / 180;
    text_options.rotation = rotation;
    delete options.angle;
  }

  text_options.font = ['normal', `${options.size || 10}pt`, 'Arial'].join(' ');

  if (options.color) {
    text_options.fill = new olStyleFill({color: options.color || [0, 0, 0, 1]});
    delete options.color;
  }

  text_options.stroke = new olStyleStroke({
    color: [255, 255, 255, 1],
    width: options.width || 3,
  });
  delete options.width;

  return new olStyleText(text_options);
};

/**
 * Get the measure of the given feature as a string. For points, you can format
 * the result by setting a filter to apply on the coordinate with the function
 * {@link import("ngeo/misc/FeatureHelper.js").setPointFilterFn}.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {string} Measure.
 */
FeatureHelper.prototype.getMeasure = function (feature) {
  const geometry = feature.getGeometry();
  console.assert(geometry, 'Geometry should be truthy');

  let measure = '';

  if (geometry instanceof olGeomPolygon) {
    if (this.getType(feature) === ngeoGeometryType.CIRCLE) {
      const azimut = this.optNumber(feature, ngeoFormatFeatureProperties.AZIMUT);
      console.assert(typeof azimut == 'number');
      const line = this.getRadiusLine(feature, azimut);

      measure = getFormattedAzimutRadius(
        line,
        this.projection_,
        this.decimals_,
        this.precision_,
        this.unitPrefixFormat_,
        this.numberFormat_
      );
    } else {
      measure = getFormattedArea(geometry, this.projection_, this.precision_, this.unitPrefixFormat_);
    }
  } else if (geometry instanceof olGeomLineString) {
    measure = getFormattedLength(geometry, this.projection_, this.precision_, this.unitPrefixFormat_);
  } else if (geometry instanceof olGeomPoint) {
    if (this.pointFilterFn_ === null) {
      measure = getFormattedPoint(geometry, this.decimals_, this.ngeoNumberCoordinates_);
    } else {
      const coordinates = geometry.getCoordinates();
      if (this.pointFilterArgs_.length > 1) {
        measure = this.pointFilterFn_(coordinates, this.pointFilterArgs_[0], this.pointFilterArgs_[1]).join(
          ', '
        );
      } else {
        measure = this.pointFilterFn_(coordinates, this.pointFilterArgs_[0]).join(', ');
      }
    }
  }

  return measure;
};

/**
 * Return the type of geometry of a feature using its geometry property and
 * some inner properties.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {string} The type of geometry.
 */
FeatureHelper.prototype.getType = function (feature) {
  const geometry = feature.getGeometry();
  console.assert(geometry, 'Geometry should be thruthy');

  let type;

  if (geometry instanceof olGeomPoint) {
    if (feature.get(ngeoFormatFeatureProperties.IS_TEXT)) {
      type = ngeoGeometryType.TEXT;
    } else {
      type = ngeoGeometryType.POINT;
    }
  } else if (geometry instanceof olGeomMultiPoint) {
    type = ngeoGeometryType.MULTI_POINT;
  } else if (geometry instanceof olGeomPolygon) {
    if (feature.get(ngeoFormatFeatureProperties.IS_CIRCLE)) {
      type = ngeoGeometryType.CIRCLE;
    } else if (feature.get(ngeoFormatFeatureProperties.IS_RECTANGLE)) {
      type = ngeoGeometryType.RECTANGLE;
    } else {
      type = ngeoGeometryType.POLYGON;
    }
  } else if (geometry instanceof olGeomMultiPolygon) {
    type = ngeoGeometryType.MULTI_POLYGON;
  } else if (geometry instanceof olGeomLineString) {
    type = ngeoGeometryType.LINE_STRING;
  } else if (geometry instanceof olGeomMultiLineString) {
    type = ngeoGeometryType.MULTI_LINE_STRING;
  }

  console.assert(type, 'Type should be thruthy');

  return type;
};

/**
 * This methods will try to fit a feature into a map view.
 *
 * If the feature is already visible, then the map will be zoomed out
 * if the feature is too big for the current view.
 *
 * If the feature is not visible but would fit in the map view, the
 * map is panned to the center of the feature.
 *
 * If the feature is not visible and would not fit in the map view,
 * the map is fix to the feature's extent.
 *
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {!import("ol/Map.js").default} map Map.
 * @param {number=} opt_duration Aimation duration. Defaults to `250`.
 */
FeatureHelper.prototype.fitMapToFeature = function (feature, map, opt_duration) {
  const duration = opt_duration !== undefined ? opt_duration : 250;
  const size = map.getSize();
  console.assert(Array.isArray(size));
  const view = map.getView();
  const viewExtent = view.calculateExtent(size);
  const geometry = feature.getGeometry();

  const geomIsVisible = geometry.intersectsExtent(viewExtent);

  const mapCenter = view.getCenter();
  console.assert(Array.isArray(mapCenter));

  const featureExtent = geometry.getExtent();

  if (geomIsVisible) {
    if (!(geometry instanceof olGeomPoint)) {
      // == Action: Zoom out ==
      // if the geometry is visible
      const featureResolution = view.getResolutionForExtent(featureExtent);
      const featureZoom = Math.floor(view.getZoomForResolution(featureResolution));
      const zoom = view.getZoom();
      if (featureZoom < zoom) {
        view.animate(
          {
            center: mapCenter,
            duration: duration,
          },
          {
            center: mapCenter,
            duration: duration,
            zoom: featureZoom,
          }
        );
      }
    }
  } else {
    const featureExtentHeight = olExtent.getHeight(featureExtent);
    const featureExtentWidth = olExtent.getWidth(featureExtent);
    const viewExtentHeight = olExtent.getHeight(viewExtent);
    const viewExtentWidth = olExtent.getWidth(viewExtent);
    const geomFitsInExtent = viewExtentHeight >= featureExtentHeight && viewExtentWidth >= featureExtentWidth;

    if (geomFitsInExtent) {
      // == Action: Pan ==
      // if geometry is not visible but fits in current map extent
      let featureCenter;
      if (geometry instanceof olGeomLineString) {
        featureCenter = geometry.getCoordinateAt(0.5);
      } else if (geometry instanceof olGeomPolygon) {
        featureCenter = geometry.getInteriorPoint().getCoordinates();
      } else if (geometry instanceof olGeomPoint) {
        featureCenter = geometry.getCoordinates();
      } else {
        featureCenter = olExtent.getCenter(geometry.getExtent());
      }

      view.animate(
        {
          center: mapCenter,
          duration: duration,
        },
        {
          center: featureCenter,
          duration: duration,
        }
      );
    } else {
      // == Action: Fit ==
      // if geometry is not visible and doesn't fit in current map extent
      view.fit(featureExtent, {
        duration,
        size,
      });
    }
  }
};

/**
 * This method generates a line string geometry that represents the radius for
 * a given azimut. It expects the input geometry to be a circle.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @param {number} azimut Azimut in degrees.
 * @return {!import("ol/geom/LineString.js").default} The line geometry.
 */
FeatureHelper.prototype.getRadiusLine = function (feature, azimut) {
  const geometry = feature.getGeometry();
  // Determine the radius for the circle
  const extent = geometry.getExtent();
  const radius = (extent[3] - extent[1]) / 2;

  const center = olExtent.getCenter(geometry.getExtent());

  const x = Math.cos(((azimut - 90) * Math.PI) / 180) * radius;
  const y = -Math.sin(((azimut - 90) * Math.PI) / 180) * radius;
  const endPoint = [x + center[0], y + center[1]];
  return new olGeomLineString([center, endPoint]);
};

/**
 * Return the properties of a feature, with the exception of the geometry.
 * @param {!import("ol/Feature.js").default} feature Feature.
 * @return {!Object.<string, *>} Object.
 */
FeatureHelper.prototype.getNonSpatialProperties = function (feature) {
  const geometryName = feature.getGeometryName();
  const nonSpatialProperties = {};
  const properties = feature.getProperties();
  for (const key in properties) {
    if (key !== geometryName) {
      nonSpatialProperties[key] = properties[key];
    }
  }
  return nonSpatialProperties;
};

/**
 * Clear all properties of a feature, with the exception of the geometry.
 * @param {!import("ol/Feature.js").default} feature Feature.
 */
FeatureHelper.prototype.clearNonSpatialProperties = function (feature) {
  const geometryName = feature.getGeometryName();
  const properties = feature.getProperties();
  for (const key in properties) {
    if (key !== geometryName) {
      feature.set(key, undefined);
    }
  }
};

/**
 * @param {!Array.<!import("ol/Feature.js").default>} features Features.
 * @param {string} fid Feature id
 * @return {number} Index of found feature
 */
FeatureHelper.prototype.findFeatureIndexByFid = function (features, fid) {
  let index = -1;
  for (let i = 0, ii = features.length; i < ii; i++) {
    if (features[i].getId() == fid) {
      index = i;
      break;
    }
  }
  return index;
};

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFeatureHelper', [ngeoDownloadService.name, ngeoMiscFilters.name]);
module.service('ngeoFeatureHelper', FeatureHelper);

export default module;
