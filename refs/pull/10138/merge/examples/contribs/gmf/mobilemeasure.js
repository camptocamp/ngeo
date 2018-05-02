/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/mobilemeasure.js"
/*!************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mobilemeasure_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobilemeasure.scss */ "./contribs/gmf/examples/mobilemeasure.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/permalink/Permalink */ "./src/permalink/Permalink.js");
/* harmony import */ var gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/mobile/measure/areaComponent */ "./src/mobile/measure/areaComponent.js");
/* harmony import */ var gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/mobile/measure/lengthComponent */ "./src/mobile/measure/lengthComponent.js");
/* harmony import */ var gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/mobile/measure/pointComponent */ "./src/mobile/measure/pointComponent.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('gmfapp', [
  'gettext',
  gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name,
  gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__["default"].name,
  ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__["default"].name,
]);

MainController.$inject = ['gmfPermalink'];

/**
 * @param {import('gmf/permalink/Permalink').PermalinkService} gmfPermalink The gmf permalink service.
 * @class
 */
function MainController(gmfPermalink) {
  const center = gmfPermalink.getMapCenter() || [537635, 152640];
  const zoom = gmfPermalink.getMapZoom() || 3;

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_10__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_13__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_11__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom,
    }),
  });
  this.map.addControl(
    new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__["default"]({
      // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
      dpi: 96,
    }),
  );

  /**
   * @type {boolean}
   */
  this.measureAreaActive = false;

  /**
   * @type {boolean}
   */
  this.measureLengthActive = false;

  /**
   * @type {boolean}
   */
  this.measurePointActive = false;
}
myModule.controller('MainController', MainController);
const sketchStyle = {
  fill: {
    color: 'rgba(255, 255, 255, 0.2)',
  },
  stroke: {
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  },
  regularShape: {
    stroke: {
      color: 'rgba(0, 0, 0, 0.7)',
      width: 2,
    },
    points: 4,
    radius: 8,
    radius2: 0,
    angle: 0,
  },
};
myModule.constant('gmfMobileMeasurePointOptions', {
  sketchStyle: sketchStyle,
  decimals: 2,
  format: '{x}, {y}',
  rasterLayers: [
    {
      name: 'aster',
      unit: 'm',
      decimals: 2,
    },
    {
      name: 'srtm',
      unit: 'm',
    },
  ],
});
myModule.constant('gmfMobileMeasureLengthOptions', {
  sketchStyle: sketchStyle,
});
myModule.constant('gmfMobileMeasureAreaOptions', {
  sketchStyle: sketchStyle,
});
(0,_options__WEBPACK_IMPORTED_MODULE_15__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./contribs/gmf/examples/mobilemeasure.scss"
/*!**************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.scss ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/interaction/MeasureAreaMobile.js"
/*!**********************************************!*\
  !*** ./src/interaction/MeasureAreaMobile.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureArea */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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
 * Interaction dedicated to measure Area on mobile devices.
 *
 * @private
 * @hidden
 */
class MeasureAreaMobile extends ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {import('ngeo/misc/filters').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure').MeasureOptions} [options] Options
   */
  constructor(format, gettextCatalog, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});
    super(format, gettextCatalog, options);
  }

  /**
   * @param {import('ol/style/Style').StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import('ol/source/Vector').default<import('ol/geom/Polygon').default>} source Vector source.
   * @returns {ngeoInteractionMobileDraw} The interaction
   */
  createDrawInteraction(style, source) {
    const interaction = new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Polygon',
      style: style,
    });
    interaction.set('name', 'PolygonMobileDraw');
    return interaction;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MeasureAreaMobile);


/***/ },

/***/ "./src/interaction/MeasureLengthMobile.js"
/*!************************************************!*\
  !*** ./src/interaction/MeasureLengthMobile.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureLength */ "./src/interaction/MeasureLength.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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
 * Interaction dedicated to measure length on mobile devices.
 *
 * @hidden
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {import('ngeo/misc/filters').unitPrefix} format The format function
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('ngeo/interaction/Measure').MeasureOptions} [opt_options] Options
   */
  constructor(format, gettextCatalog, opt_options) {
    const options = opt_options !== undefined ? opt_options : {};

    Object.assign(options, {displayHelpTooltip: false});

    super(format, gettextCatalog, options);
  }

  /**
   * @param {import('ol/style/Style').StyleLike} style
   *     The sketchStyle used for the drawing interaction.
   * @param {import('ol/source/Vector').default<import('ol/geom/LineString').default>} source Vector source.
   * @returns {ngeoInteractionMobileDraw} The interaction
   */
  createDrawInteraction(style, source) {
    const interaction = new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'LineString',
      style: style,
    });
    interaction.set('name', 'LineStringMobileDraw');
    return interaction;
  }
});
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);


/***/ },

/***/ "./src/interaction/MeasurePointMobile.js"
/*!***********************************************!*\
  !*** ./src/interaction/MeasurePointMobile.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/Measure */ "./src/interaction/Measure.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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
 * Interaction dedicated to measure by coordinate (point) on mobile devices.
 *
 * @hidden
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {import('ngeo/misc/filters').numberCoordinates} format the number formatter
   * @param {string} coordFormat the coordinates formatter
   * @param {import('ngeo/interaction/Measure').MeasureOptions} [options] Options
   */
  constructor(format, coordFormat, options = {}) {
    Object.assign(options, {displayHelpTooltip: false});

    super(options);

    /**
     * @type {import('ngeo/misc/filters').numberCoordinates}
     * @private
     */
    this.format_ = format;

    /**
     * @type {string}
     * @private
     */
    this.coordFormat_ = coordFormat;
  }

  /**
   * @param {import('ol/style/Style').StyleLike} style The sketchStyle used for the drawing
   *    interaction.
   * @param {import('ol/source/Vector').default<import('ol/geom/Point').default>} source Vector source.
   * @returns {import('ol/interaction/Draw').default|import('ngeo/interaction/DrawAzimut').default|
   *    import('ngeo/interaction/MobileDraw').default} The interaction
   */
  createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Point',
      style: style,
    });
  }

  /**
   * @param {function(string, ?import('ol/coordinate').Coordinate): void} callback The function
   *     to be called.
   */
  handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    const geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      throw new Error('Missing geometry');
    }
    const dec = this.decimals;
    const output = (0,ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__.getFormattedPoint)(geom, dec, this.format_, this.coordFormat_);
    const coord = geom.getLastCoordinate();
    callback(output, coord);
  }
});
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);


/***/ },

/***/ "./src/interaction/MobileDraw.js"
/*!***************************************!*\
  !*** ./src/interaction/MobileDraw.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/common */ "./src/interaction/common.js");
/* harmony import */ var ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/CustomEvent */ "./src/CustomEvent.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/functions */ "./node_modules/ol/functions.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/SimpleGeometry */ "./node_modules/ol/geom/SimpleGeometry.js");
/* harmony import */ var ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Interaction */ "./node_modules/ol/interaction/Interaction.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
 * MobileDraw Interaction.
 *
 * @typedef {Object} MobileDrawOptions
 * @property {number} [minPoints] The number of points that must be drawn before a polygon ring or line
 * string can be finished. Default is `3` for polygon rings and `2` for line strings.
 * @property {import('ol/style/Style').StyleLike} [style] Style for sketch features.
 * @property {string} type Drawing type ('Point' or 'LineString'.
 * @property {boolean} [wrapX] Wrap the world horizontally on the sketch overlay. Default is `false`.
 */

/**
 * Interaction for drawing feature geometries from a mobile device using the
 * center of the map view as entry for points added.
 *
 * Supports:
 * - point
 * - line string
 * - polygon
 *
 * @hidden
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"] {
  /**
   * @fires DrawEvent
   * @param {MobileDrawOptions} options Options
   */
  constructor(options) {
    super({
      handleEvent: ol_functions__WEBPACK_IMPORTED_MODULE_4__.TRUE,
    });

    /**
     * The key for view center change event.
     *
     * @type {?import('ol/events').EventsKey}
     * @private
     */
    this.changeEventKey_ = null;

    /**
     * Geometry type.
     *
     * @type {string}
     * @private
     */
    this.type_ = options.type;

    /**
     * The number of points that must be drawn before a polygon ring or line
     * string can be finished.  The default is 3 for polygon rings and 2 for
     * line strings.
     *
     * @type {number}
     * @private
     */
    this.minPoints_ = options.minPoints ? options.minPoints : this.type_ === 'Polygon' ? 3 : 2;

    /**
     * Sketch feature.
     *
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.sketchFeature_ = null;

    /**
     * Previous sketch points, saved to be able to display them on the layer.
     *
     * @type {olFeature<import('ol/geom/Geometry').default>[]}
     * @private
     */
    this.sketchPoints_ = [];

    /**
     * Current sketch point.
     *
     * @type {?olFeature<import('ol/geom/Geometry').default>}
     * @private
     */
    this.sketchPoint_ = null;

    /**
     * Draw overlay where our sketch features are drawn.
     *
     * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
     * @private
     */
    this.overlay_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
      className: 'canvas2d',
      source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false,
      }),
      style: options.style || (0,ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__.getDefaultDrawStyleFunction)(),
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    (0,ol_events__WEBPACK_IMPORTED_MODULE_2__.listen)(this, 'change:active', this.updateState_, this);

    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
  }

  /**
   * @param {import('ol/Map').default} map Map.
   */
  setMap(map) {
    const currentMap = this.getMap();
    if (currentMap) {
      if (this.changeEventKey_) {
        (0,ol_events__WEBPACK_IMPORTED_MODULE_2__.unlistenByKey)(this.changeEventKey_);
      }
    }

    ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.setMap.call(this, map);

    if (map) {
      this.changeEventKey_ = (0,ol_events__WEBPACK_IMPORTED_MODULE_2__.listen)(map.getView(), 'change:center', this.handleViewCenterChange_, this);
    }

    this.updateState_();
  }

  // === PUBLIC METHODS - PROPERTY GETTERS ===

  /**
   * Return whether the interaction is currently dirty. It is if the sketch
   * feature has its geometry last coordinate set to the center without the
   * use of the `addToDrawing` method.
   *
   * @returns {boolean} `true` if the interaction is dirty, `false` otherwise.
   * @observable
   */
  getDirty() {
    return /** @type {boolean} */ (this.get('dirty'));
  }

  /**
   * Return whether the interaction is currently drawing.
   *
   * @returns {boolean} `true` if the interaction is drawing, `false` otherwise.
   * @observable
   */
  getDrawing() {
    return /** @type {boolean} */ (this.get('drawing'));
  }

  /**
   * Return whether the interaction as a valid sketch feature, i.e. its geometry
   * is valid.
   *
   * @returns {boolean} `true` if the interaction has a valid sketch feature,
   *     `false` otherwise.
   * @observable
   */
  getValid() {
    return /** @type {boolean} */ (this.get('valid'));
  }

  /**
   * Returns the current sketch feature.
   *
   * @returns {?olFeature<import('ol/geom/Geometry').default>} The sketch feature, or null if none.
   */
  getFeature() {
    return this.sketchFeature_;
  }

  // === PUBLIC METHODS ===

  /**
   * Add current sketch point to sketch feature if the latter exists, else create
   * it.
   */
  addToDrawing() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }

    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    let sketchFeatureGeom;
    const sketchPointGeom = this.getSketchPointGeometry_();
    const coordinate = sketchPointGeom.getCoordinates();
    let coordinates = null;

    // == point ==
    if (this.type_ === 'Point') {
      if (!this.sketchFeature_) {
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"]({geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](coordinate), name: 'mobileDrawPoint'});
        const event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {feature: this.sketchFeature_});
        this.dispatchEvent(event);
      }
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        sketchFeatureGeom.setCoordinates(coordinate);
      }
      return;
    }

    // == line string ==
    if (this.type_ === 'LineString') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"]({
          geometry: new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__["default"](coordinates),
          name: 'mobileDrawLine',
        });
        const event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {feature: this.sketchFeature_});
        this.dispatchEvent(event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
          coordinates = sketchFeatureGeom.getCoordinates();
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates);
        }
      }
    }

    // == polygon ==
    if (this.type_ === 'Polygon') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"]({
          geometry: new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]([coordinates]),
          name: 'DrawMobilePolygon',
        });
        const event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_,
        });
        this.dispatchEvent(event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
          const coordinates2 = sketchFeatureGeom.getCoordinates();
          coordinates = coordinates2[0];
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates2);
        }
      }
    }

    const dirty = this.getDirty();
    if (dirty) {
      this.set('dirty', false);
    }

    if (!coordinates) {
      throw new Error('Missing coordinates');
    }
    // minPoints validation
    const valid = this.getValid();
    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
      if (coordinates.length >= this.minPoints_) {
        if (!valid) {
          this.set('valid', true);
        }
      } else {
        if (valid) {
          this.set('valid', false);
        }
      }
    }

    // reset sketch point
    this.sketchPoint_ = null;

    // update sketch features
    this.updateSketchFeatures_();
  }

  /**
   * Clear the drawing
   */
  clearDrawing() {
    this.setActive(false);
    this.setActive(true);
  }

  /**
   * Finish drawing. If there's a sketch point, it's added first.
   */
  finishDrawing() {
    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    if (this.sketchPoint_) {
      this.addToDrawing();
    }

    this.set('drawing', false);

    const event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawend', {feature: this.sketchFeature_});
    this.dispatchEvent(event);
  }

  // === PRIVATE METHODS ===

  /**
   * Start drawing by adding the sketch point first.
   *
   * @private
   */
  startDrawing_() {
    this.set('drawing', true);
    this.createOrUpdateSketchPoint_();
    this.updateSketchFeatures_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    }
  }

  /**
   * Modify the geometry of the sketch feature to have its last coordinate
   * set to the center of the map.
   *
   * @private
   */
  modifyDrawing_() {
    if (!this.sketchFeature_) {
      return;
    }

    const center = this.getCenter_();

    if (this.type_ === 'LineString') {
      const sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        const coordinates = sketchFeatureGeom.getCoordinates();
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates(coordinates);
      }
    } else if (this.type_ === 'Polygon') {
      const sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        const coordinates2 = sketchFeatureGeom.getCoordinates();
        const coordinates = coordinates2[0];
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates([coordinates]);
      }
    }

    const dirty = this.getDirty();
    if (!dirty) {
      this.set('dirty', true);
    }
  }

  /**
   * Stop drawing without adding the sketch feature to the target layer.
   *
   * @returns {?olFeature<import('ol/geom/Geometry').default>} The sketch feature (or null if none).
   * @private
   */
  abortDrawing_() {
    const sketchFeature = this.sketchFeature_;
    if (sketchFeature || this.sketchPoints_.length > 0) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (this.overlay_.getSource()).clear(
        true,
      );
    }
    this.sketchPoints_ = [];
    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
    return sketchFeature;
  }

  /**
   * @private
   */
  updateState_() {
    const map = this.getMap();
    const active = this.getActive();
    if (!map || !active) {
      this.abortDrawing_();
    } else {
      this.startDrawing_();
    }
    this.overlay_.setMap(active ? map : null);
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleViewCenterChange_(evt) {
    // no need to do anything if interaction is not active, nor drawing
    const active = this.getActive();
    const drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    this.createOrUpdateSketchPoint_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    } else {
      this.modifyDrawing_();
      this.updateSketchFeatures_();
    }
  }

  /**
   * @private
   */
  createOrUpdateSketchPoint_() {
    const center = this.getCenter_();

    if (this.sketchPoint_) {
      const geometry = this.getSketchPointGeometry_();
      geometry.setCoordinates(center);
    } else {
      this.sketchPoint_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"]({geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](center), name: 'mobileDrawPoint'});
    }
  }

  /**
   * Redraw the sketch features.
   *
   * @private
   */
  updateSketchFeatures_() {
    const sketchFeatures = [];
    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }
    const overlaySource = /** @type {olSourceVector<import('ol/geom/Geometry').default>} */ (
      this.overlay_.getSource()
    );
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
    overlaySource.addFeatures(this.sketchPoints_);
  }

  /**
   * Returns the geometry of the sketch point feature.
   *
   * @returns {import('ol/geom/Point').default} Point.
   * @private
   */
  getSketchPointGeometry_() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    const geometry = this.sketchPoint_.getGeometry();
    if (geometry instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      return geometry;
    } else {
      throw new Error('Wrong geometry type');
    }
  }

  /**
   * Returns the center of the map view
   *
   * @returns {import('ol/coordinate').Coordinate} Coordinate.
   * @private
   */
  getCenter_() {
    const center = this.getMap().getView().getCenter();
    if (!Array.isArray(center)) {
      throw new Error('Missing center');
    }
    return center;
  }
});
__webpack_require__.dn(__WEBPACK_DEFAULT_EXPORT__);


/***/ },

/***/ "./src/mobile/measure/areaComponent.js"
/*!*********************************************!*\
  !*** ./src/mobile/measure/areaComponent.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile */ "./src/interaction/MeasureAreaMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
/* harmony import */ var _baseComponent_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html.js");
mobileMeasureAreaComponent.$inject = ['gmfMobileMeasureAreaTemplateUrl'];
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('gmfMobileMeasureArea', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value(
  'gmfMobileMeasureAreaTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @returns {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasureAreaTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/measure/areaComponent';
  },
);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/measure/areaComponent', _baseComponent_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },
  ],
);

/**
 * Provide a directive to do a area measure on the mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurearea
 *        gmf-mobile-measurearea-active="ctrl.measureAreaActive"
 *        gmf-mobile-measurearea-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurearea-active Used to active
 * or deactivate the component.
 * @htmlAttribute {import('ol/Map').default} gmf-mobile-measurearea-map The map.
 * @param {string|function(JQuery=, angular.IAttributes=):string} gmfMobileMeasureAreaTemplateUrl
 *     Template URL for the directive.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfMobileMeasureArea
 */
function mobileMeasureAreaComponent(gmfMobileMeasureAreaTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasureareaActive',
      'map': '=gmfMobileMeasureareaMap',
    },
    controller: 'GmfMobileMeasureAreaController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureAreaTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController} [controller] Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    },
  };
}
myModule.directive('gmfMobileMeasurearea', mobileMeasureAreaComponent);

/**
 * @hidden
 */
class Controller extends gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__.MeasueMobileBaseController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.IFilterService} $filter Angular filter
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/options').gmfMobileMeasureAreaOptions} gmfMobileMeasureAreaOptions The options.
   */
  constructor($scope, $filter, gettextCatalog, gmfMobileMeasureAreaOptions) {
    super($scope, $filter, gettextCatalog);
    /**
     * @type {import('gmf/options').gmfMobileMeasureAreaOptions}
     */
    this.options = gmfMobileMeasureAreaOptions;

    /**
     * @type {?import('ngeo/interaction/MeasureAreaMobile').default}
     */
    this.measure = null;
  }

  /**
   * Initialize the controller.
   */
  init() {
    this.measure = new ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.options.precision || 2,
      sketchStyle: (0,ngeo_options__WEBPACK_IMPORTED_MODULE_4__.buildStyle)(this.options.sketchStyle),
    });
    super.init();
  }

  /**
   * Add current sketch point to line measure
   */
  addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  }

  /**
   * Clear the sketch feature
   */
  clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  }

  /**
   * Finish line measure
   */
  finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  }

  /**
   * Deactivate the directive.
   */
  deactivate() {
    this.active = false;
  }
}
Controller.$inject = ['$scope', '$filter', 'gettextCatalog', 'gmfMobileMeasureAreaOptions'];
myModule.controller('GmfMobileMeasureAreaController', Controller);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/mobile/measure/baseComponent.html.js"
/*!**************************************************!*\
  !*** ./src/mobile/measure/baseComponent.html.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<a class="btn btn-default" ng-if="ctrl.drawing && (!ctrl.valid)" ng-click="ctrl.addPoint()">
  <span class="fa-solid fa-check"></span>
  {{'Set as starting point' | translate}}
</a>
<a class="btn btn-default" ng-if="ctrl.dirty" ng-click="ctrl.addPoint()">
  <span class="fa-solid fa-plus"></span>
  {{'Add new point' | translate}}
</a>
<a class="btn btn-default" ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty" ng-click="ctrl.finish()">
  <span class="fa-solid fa-check"></span>
  {{'Terminate' | translate}}
</a>
<a class="btn btn-default" ng-if="ctrl.valid" ng-click="ctrl.clear()">
  <span class="fa-solid fa-repeat"></span>
  {{'Clear' | translate}}
</a>
<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">
  <span class="fa-solid fa-xmark"></span>
  {{'Close' | translate}}
</a>`);


/***/ },

/***/ "./src/mobile/measure/baseComponent.js"
/*!*********************************************!*\
  !*** ./src/mobile/measure/baseComponent.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeasueMobileBaseController: () => (/* binding */ MeasueMobileBaseController),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
MeasueMobileBaseController.$inject = ['$scope', '$filter', 'gettextCatalog'];
// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('gmfMobileMeasureBase', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

/**
 * Base controller class for Length and Area components.
 *
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @class
 * @ngdoc controller
 * @ngname GmfMobileMeasureBaseController
 * @hidden
 */
function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  /**
   * @type {angular.IScope}
   */
  this.scope = $scope;

  /**
   * @type {angular.IFilterService}
   */
  this.filter = $filter;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog = gettextCatalog;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;
  this.scope.$watch(
    () => this.active,
    (newVal) => {
      if (!this.measure) {
        throw new Error('Missing measure');
      }
      this.measure.setActive(newVal);
    },
  );

  /**
   * @type {?import('ngeo/interaction/Measure').default}
   */
  this.measure = null;

  /**
   * @type {?import('ngeo/interaction/MobileDraw').default}
   */
  this.drawInteraction = null;

  /**
   * @type {boolean}
   */
  this.dirty = false;

  /**
   * @type {boolean}
   */
  this.drawing = false;

  /**
   * @type {boolean}
   */
  this.valid = false;
}

/**
 * Initialize the controller.
 */
MeasueMobileBaseController.prototype.init = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  this.measure.setActive(this.active);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__.interactionDecoration)(this.measure);
  const drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__.interactionDecoration)(drawInteraction);
  Object.defineProperty(this, 'hasPoints', {
    get() {
      return this.drawInteraction.getFeature() !== null;
    },
  });
  (0,ol_events__WEBPACK_IMPORTED_MODULE_3__.listen)(
    drawInteraction,
    'change:dirty',
    /** @type {import('ol/events').ListenerFunction} */
    (evt) => {
      this.dirty = drawInteraction.getDirty();

      // this is where the angular scope is forced to be applied. We
      // only need to do this when dirty, as going to "no being dirty"
      // is made by a click on a button where Angular is within scope
      if (this.dirty) {
        this.scope.$apply();
      }
    },
    this,
  );
  (0,ol_events__WEBPACK_IMPORTED_MODULE_3__.listen)(
    drawInteraction,
    'change:drawing',
    /** @type {import('ol/events').ListenerFunction} */
    (evt) => {
      this.drawing = drawInteraction.getDrawing();
    },
    this,
  );
  (0,ol_events__WEBPACK_IMPORTED_MODULE_3__.listen)(
    drawInteraction,
    'change:valid',
    /** @type {import('ol/events').ListenerFunction} */
    (evt) => {
      this.valid = drawInteraction.getValid();
    },
    this,
  );
  this.map.addInteraction(this.measure);
};
myModule.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/mobile/measure/lengthComponent.js"
/*!***********************************************!*\
  !*** ./src/mobile/measure/lengthComponent.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile */ "./src/interaction/MeasureLengthMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
/* harmony import */ var _baseComponent_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html.js");
mobileMeasureLenthComponent.$inject = ['gmfMobileMeasureLengthTemplateUrl'];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('gmfMobileMeasureLength', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value(
  'gmfMobileMeasureLengthTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @returns {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';
  },
);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/measure/lengthComponent', _baseComponent_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
    },
  ],
);

/**
 * Provide a directive to do a length measure on the mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurelength
 *        gmf-mobile-measurelength-active="ctrl.measureLengthActive"
 *        gmf-mobile-measurelength-map="::ctrl.map">
 *      </div>
 *
 * @htmlAttribute {boolean} gmf-mobile-measurelength-active Used to active
 * or deactivate the component.
 * @htmlAttribute {import('ol/Map').default} gmf-mobile-measurelength-map The map.
 * @param {string|function(JQuery=, angular.IAttributes=):string} gmfMobileMeasureLengthTemplateUrl
 *     Template URL for the directive.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfMobileMeasureLength
 */
function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'map': '=gmfMobileMeasurelengthMap',
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController} [controller] Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    },
  };
}
myModule.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);

/**
 * @hidden
 */
class Controller extends gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__.MeasueMobileBaseController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.IFilterService} $filter Angular filter
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/options').gmfMobileMeasureLengthOptions} gmfMobileMeasureLengthOptions The options.
   */
  constructor($scope, $filter, gettextCatalog, gmfMobileMeasureLengthOptions) {
    super($scope, $filter, gettextCatalog);
    /**
     * @type {import('gmf/options').gmfMobileMeasureLengthOptions}
     */
    this.options = gmfMobileMeasureLengthOptions;

    /**
     * @type {?import('ngeo/interaction/MeasureLengthMobile').default}
     */
    this.measure = null;
  }

  /**
   * Initialize the controller.
   */
  init() {
    this.measure = new ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__["default"](
      this.filter('ngeoUnitPrefix'),
      this.gettextCatalog,
      {
        precision: this.options.precision || 3,
        sketchStyle: (0,ngeo_options__WEBPACK_IMPORTED_MODULE_4__.buildStyle)(this.options.sketchStyle),
      },
    );
    super.init();
  }

  /**
   * Add current sketch point to line measure
   */
  addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  }

  /**
   * Clear the sketch feature
   */
  clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  }

  /**
   * Finish line measure
   */
  finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  }

  /**
   * Deactivate the directive.
   */
  deactivate() {
    this.active = false;
  }
}
Controller.$inject = ['$scope', '$filter', 'gettextCatalog', 'gmfMobileMeasureLengthOptions'];
myModule.controller('GmfMobileMeasureLengthController', Controller);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./src/mobile/measure/pointComponent.html.js"
/*!***************************************************!*\
  !*** ./src/mobile/measure/pointComponent.html.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">
  <span class="fa-solid fa-xmark"></span>
  {{'Close' | translate}}
</a>`);


/***/ },

/***/ "./src/mobile/measure/pointComponent.js"
/*!**********************************************!*\
  !*** ./src/mobile/measure/pointComponent.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MobileMeasurePointController: () => (/* binding */ MobileMeasurePointController),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gmf/raster/RasterService */ "./src/raster/RasterService.js");
/* harmony import */ var ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasurePointMobile */ "./src/interaction/MeasurePointMobile.js");
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
/* harmony import */ var _pointComponent_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pointComponent.html */ "./src/mobile/measure/pointComponent.html.js");
MobileMeasurePointController.$inject = [
  'gettextCatalog',
  '$scope',
  '$filter',
  'gmfRaster',
  'ngeoDebounce',
  'gmfMobileMeasurePointOptions',
];
mobileMeasurePointComponent.$inject = ['gmfMobileMeasurePointTemplateUrl'];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('gmfMobileMeasurePoint', [
  gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__["default"].name,
  ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__["default"].name,
]);
myModule.value(
  'gmfMobileMeasurePointTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @returns {string} The template url.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';
  },
);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('gmf/measure/pointComponent', _pointComponent_html__WEBPACK_IMPORTED_MODULE_8__["default"]);
    },
  ],
);

/**
 * Provide a directive to do a point (coordinate and elevation) measure on the
 * mobile devices.
 *
 * Example:
 *
 *      <div gmf-mobile-measurepoint
 *        gmf-mobile-measurepoint-active="ctrl.measurePointActive"
 *        gmf-mobile-measurepoint-map="::ctrl.map">
 *      </div>
 *
 * Where ctrl.measurePointLayers is an object like this:
 *
 *      this.measurePointLayers = [
 *        {name: 'srtm', unit: 'm', decimals: 2},
 *        {name: 'wind', {unit: 'km/h'},
 *        {name: 'humidity'}
 *      ];
 *
 * @htmlAttribute {boolean} gmf-mobile-measurepoint-active Used to active
 * or deactivate the component.
 * @htmlAttribute {import('ol/Map').default} gmf-mobile-measurepoint-map The map.
 * @param {string|function(JQuery=, angular.IAttributes=): string} gmfMobileMeasurePointTemplateUrl
 *     Template URL for the directive.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfMobileMeasurePoint
 */
function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'map': '=gmfMobileMeasurepointMap',
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController} [controller] Controller.
     */
    link: (scope, element, attrs, controller) => {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    },
  };
}
myModule.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);

/**
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {import('gmf/raster/RasterService').RasterService} gmfRaster gmf Raster service.
 * @param {import('ngeo/misc/debounce').miscDebounce<function(): void>} ngeoDebounce ngeo Debounce factory.
 * @param {import('gmf/options').gmfMobileMeasurePointOptions} gmfMobileMeasurePointOptions The options.
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname GmfMobileMeasurePointController
 */
function MobileMeasurePointController(
  gettextCatalog,
  $scope,
  $filter,
  gmfRaster,
  ngeoDebounce,
  gmfMobileMeasurePointOptions,
) {
  /**
   * @type {import('gmf/options').gmfMobileMeasurePointOptions}
   */
  this.options = gmfMobileMeasurePointOptions;

  /**
   * @type {import('gmf/raster/RasterService').RasterService}
   */
  this.gmfRaster_ = gmfRaster;

  /**
   * @type {import('ngeo/misc/debounce').miscDebounce<function(): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {angular.IFilterService}
   */
  this.$filter_ = $filter;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {boolean}
   */
  this.active = false;
  $scope.$watch(
    () => this.active,
    (newVal) => {
      if (!this.measure) {
        throw new Error('Missing measure');
      }
      this.measure.setActive(newVal);
      this.handleMeasureActiveChange_();
    },
  );

  /**
   * @type {?import('ngeo/interaction/MeasurePointMobile').default}
   */
  this.measure = null;

  /**
   * @type {?import('ngeo/interaction/MobileDraw').default}
   */
  this.drawInteraction = null;

  /**
   * The key for map view 'propertychange' event.
   *
   * @type {?import('ol/events').EventsKey}
   */
  this.mapViewPropertyChangeEventKey_ = null;
}

/**
 * Initialize the controller.
 */
MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__["default"](
    /** @type {import('ngeo/misc/filters').numberCoordinates} */ this.$filter_('ngeoNumberCoordinates'),
    this.options.format,
    {
      decimals: this.options.decimals,
      sketchStyle: (0,ngeo_options__WEBPACK_IMPORTED_MODULE_7__.buildStyle)(this.options.sketchStyle),
    },
  );
  this.measure.setActive(this.active);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__.interactionDecoration)(this.measure);
  const drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__.interactionDecoration)(this.drawInteraction);
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measure);
};

/**
 * Deactivate the directive.
 */
MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};

/**
 * @param {string} str String to translate.
 * @returns {string} The translated text.
 */
MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};

/**
 * Called when the measure becomes active or inactive. Act accordingly:
 * - on activate, listen to the map property changes to call for the elevation
 *   service.
 * - on deactivate, unlisten
 *
 * @hidden
 */
MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  if (this.measure.getActive()) {
    const view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = (0,ol_events__WEBPACK_IMPORTED_MODULE_5__.listen)(
      view,
      'propertychange',
      this.ngeoDebounce_(this.getMeasure_.bind(this), 300, /* invokeApply */ true),
      this,
    );
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    (0,ol_events__WEBPACK_IMPORTED_MODULE_5__.unlistenByKey)(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};

/**
 * Call the elevation service to get information about the measure at
 * the current map center location.
 *
 * @hidden
 */
MobileMeasurePointController.prototype.getMeasure_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const center = this.map.getView().getCenter();
  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }
  if (!this.options.rasterLayers || this.options.rasterLayers.length === 0) {
    return;
  }
  const params = {
    'layers': this.options.rasterLayers.map((config) => config.name).join(','),
  };
  this.gmfRaster_.getRaster(center, params).then((object) => {
    if (!this.measure) {
      throw new Error('Missing measure');
    }
    const el = this.measure.getTooltipElement();
    const ctn = document.createElement('div');
    const className = 'gmf-mobile-measure-point';
    ctn.className = className;
    for (const config of this.options.rasterLayers) {
      const key = config.name;
      if (key in object) {
        /** @type {string|number} */
        let value = object[key];
        const childEl = document.createElement('div');
        childEl.className = `gmf-mobile-measure-point-${key}`;
        const unit = config.unit || '';
        const decimals = config.decimals > 0 ? config.decimals : 0;
        value = this.$filter_('number')(value, decimals);
        childEl.innerHTML = [this.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }
    const previousCtn = el.getElementsByClassName(className);
    if (previousCtn[0]) {
      previousCtn[0].remove();
    }
    el.appendChild(ctn);
  });
};
myModule.controller('GmfMobileMeasurePointController', MobileMeasurePointController);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"mobilemeasure": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/mobilemeasure.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL21vYmlsZW1lYXN1cmUuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhTW9iaWxlLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aE1vYmlsZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2ludGVyYWN0aW9uL01vYmlsZURyYXcuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tb2JpbGUvbWVhc3VyZS9hcmVhQ29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21vYmlsZS9tZWFzdXJlL2xlbmd0aENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50Lmh0bWwuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tb2JpbGUvbWVhc3VyZS9wb2ludENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9tb2JpbGVtZWFzdXJlLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IGdtZlBlcm1hbGlua1Blcm1hbGluayBmcm9tICdnbWYvcGVybWFsaW5rL1Blcm1hbGluayc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2FyZWFDb21wb25lbnQnO1xuaW1wb3J0IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2xlbmd0aENvbXBvbmVudCc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9wb2ludENvbXBvbmVudCc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudCc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZSc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBnbWZQZXJtYWxpbmtQZXJtYWxpbmsubmFtZSxcbiAgZ21mTW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQubmFtZSxcbiAgZ21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbXBvbmVudC5uYW1lLFxuICBnbWZNb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb01hcE1vZHVsZS5uYW1lLFxuXSk7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJ2dtZlBlcm1hbGluayddO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvcGVybWFsaW5rL1Blcm1hbGluaycpLlBlcm1hbGlua1NlcnZpY2V9IGdtZlBlcm1hbGluayBUaGUgZ21mIHBlcm1hbGluayBzZXJ2aWNlLlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlBlcm1hbGluaykge1xuICBjb25zdCBjZW50ZXIgPSBnbWZQZXJtYWxpbmsuZ2V0TWFwQ2VudGVyKCkgfHwgWzUzNzYzNSwgMTUyNjQwXTtcbiAgY29uc3Qgem9vbSA9IGdtZlBlcm1hbGluay5nZXRNYXBab29tKCkgfHwgMztcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgIHpvb206IHpvb20sXG4gICAgfSksXG4gIH0pO1xuICB0aGlzLm1hcC5hZGRDb250cm9sKFxuICAgIG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoe1xuICAgICAgLy8gU2VlOiBodHRwczovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2xlbmd0aC11bml0c1xuICAgICAgZHBpOiA5NixcbiAgICB9KSxcbiAgKTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBcmVhQWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlTGVuZ3RoQWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlUG9pbnRBY3RpdmUgPSBmYWxzZTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuY29uc3Qgc2tldGNoU3R5bGUgPSB7XG4gIGZpbGw6IHtcbiAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScsXG4gIH0sXG4gIHN0cm9rZToge1xuICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICBsaW5lRGFzaDogWzEwLCAxMF0sXG4gICAgd2lkdGg6IDIsXG4gIH0sXG4gIHJlZ3VsYXJTaGFwZToge1xuICAgIHN0cm9rZToge1xuICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICAgICAgd2lkdGg6IDIsXG4gICAgfSxcbiAgICBwb2ludHM6IDQsXG4gICAgcmFkaXVzOiA4LFxuICAgIHJhZGl1czI6IDAsXG4gICAgYW5nbGU6IDAsXG4gIH0sXG59O1xubXlNb2R1bGUuY29uc3RhbnQoJ2dtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnMnLCB7XG4gIHNrZXRjaFN0eWxlOiBza2V0Y2hTdHlsZSxcbiAgZGVjaW1hbHM6IDIsXG4gIGZvcm1hdDogJ3t4fSwge3l9JyxcbiAgcmFzdGVyTGF5ZXJzOiBbXG4gICAge1xuICAgICAgbmFtZTogJ2FzdGVyJyxcbiAgICAgIHVuaXQ6ICdtJyxcbiAgICAgIGRlY2ltYWxzOiAyLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3NydG0nLFxuICAgICAgdW5pdDogJ20nLFxuICAgIH0sXG4gIF0sXG59KTtcbm15TW9kdWxlLmNvbnN0YW50KCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucycsIHtcbiAgc2tldGNoU3R5bGU6IHNrZXRjaFN0eWxlLFxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGUsXG59KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYSc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xuXG4vKipcbiAqIEludGVyYWN0aW9uIGRlZGljYXRlZCB0byBtZWFzdXJlIEFyZWEgb24gbW9iaWxlIGRldmljZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xuY2xhc3MgTWVhc3VyZUFyZWFNb2JpbGUgZXh0ZW5kcyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9taXNjL2ZpbHRlcnMnKS51bml0UHJlZml4fSBmb3JtYXQgVGhlIGZvcm1hdCBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlJykuTWVhc3VyZU9wdGlvbnN9IFtvcHRpb25zXSBPcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRpb25zID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlfSk7XG4gICAgc3VwZXIoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL3N0eWxlL1N0eWxlJykuU3R5bGVMaWtlfSBzdHlsZSBUaGUgc2tldGNoU3R5bGUgdXNlZCBmb3IgdGhlIGRyYXdpbmdcbiAgICogICAgaW50ZXJhY3Rpb24uXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vUG9seWdvbicpLmRlZmF1bHQ+fSBzb3VyY2UgVmVjdG9yIHNvdXJjZS5cbiAgICogQHJldHVybnMge25nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXd9IFRoZSBpbnRlcmFjdGlvblxuICAgKi9cbiAgY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICB9KTtcbiAgICBpbnRlcmFjdGlvbi5zZXQoJ25hbWUnLCAnUG9seWdvbk1vYmlsZURyYXcnKTtcbiAgICByZXR1cm4gaW50ZXJhY3Rpb247XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVhc3VyZUFyZWFNb2JpbGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aCBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGgnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBkZWRpY2F0ZWQgdG8gbWVhc3VyZSBsZW5ndGggb24gbW9iaWxlIGRldmljZXMuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGgge1xuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9maWx0ZXJzJykudW5pdFByZWZpeH0gZm9ybWF0IFRoZSBmb3JtYXQgZnVuY3Rpb25cbiAgICogQHBhcmFtIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9IGdldHRleHRDYXRhbG9nIEdldHRleHQgY2F0YWxvZy5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZScpLk1lYXN1cmVPcHRpb25zfSBbb3B0X29wdGlvbnNdIE9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdF9vcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdF9vcHRpb25zICE9PSB1bmRlZmluZWQgPyBvcHRfb3B0aW9ucyA6IHt9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7ZGlzcGxheUhlbHBUb29sdGlwOiBmYWxzZX0pO1xuXG4gICAgc3VwZXIoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL3N0eWxlL1N0eWxlJykuU3R5bGVMaWtlfSBzdHlsZVxuICAgKiAgICAgVGhlIHNrZXRjaFN0eWxlIHVzZWQgZm9yIHRoZSBkcmF3aW5nIGludGVyYWN0aW9uLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0xpbmVTdHJpbmcnKS5kZWZhdWx0Pn0gc291cmNlIFZlY3RvciBzb3VyY2UuXG4gICAqIEByZXR1cm5zIHtuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3fSBUaGUgaW50ZXJhY3Rpb25cbiAgICovXG4gIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgY29uc3QgaW50ZXJhY3Rpb24gPSBuZXcgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyh7XG4gICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgfSk7XG4gICAgaW50ZXJhY3Rpb24uc2V0KCduYW1lJywgJ0xpbmVTdHJpbmdNb2JpbGVEcmF3Jyk7XG4gICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICB9XG59XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZSwge2dldEZvcm1hdHRlZFBvaW50fSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmUnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcbmltcG9ydCBQb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBkZWRpY2F0ZWQgdG8gbWVhc3VyZSBieSBjb29yZGluYXRlIChwb2ludCkgb24gbW9iaWxlIGRldmljZXMuXG4gKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIG5nZW9JbnRlcmFjdGlvbk1lYXN1cmUge1xuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9maWx0ZXJzJykubnVtYmVyQ29vcmRpbmF0ZXN9IGZvcm1hdCB0aGUgbnVtYmVyIGZvcm1hdHRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29vcmRGb3JtYXQgdGhlIGNvb3JkaW5hdGVzIGZvcm1hdHRlclxuICAgKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlJykuTWVhc3VyZU9wdGlvbnN9IFtvcHRpb25zXSBPcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihmb3JtYXQsIGNvb3JkRm9ybWF0LCBvcHRpb25zID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlfSk7XG5cbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWlzYy9maWx0ZXJzJykubnVtYmVyQ29vcmRpbmF0ZXN9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmZvcm1hdF8gPSBmb3JtYXQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5jb29yZEZvcm1hdF8gPSBjb29yZEZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvc3R5bGUvU3R5bGUnKS5TdHlsZUxpa2V9IHN0eWxlIFRoZSBza2V0Y2hTdHlsZSB1c2VkIGZvciB0aGUgZHJhd2luZ1xuICAgKiAgICBpbnRlcmFjdGlvbi5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9Qb2ludCcpLmRlZmF1bHQ+fSBzb3VyY2UgVmVjdG9yIHNvdXJjZS5cbiAgICogQHJldHVybnMge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR8aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL0RyYXdBemltdXQnKS5kZWZhdWx0fFxuICAgKiAgICBpbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdycpLmRlZmF1bHR9IFRoZSBpbnRlcmFjdGlvblxuICAgKi9cbiAgY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZywgP2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGUpOiB2b2lkfSBjYWxsYmFjayBUaGUgZnVuY3Rpb25cbiAgICogICAgIHRvIGJlIGNhbGxlZC5cbiAgICovXG4gIGhhbmRsZU1lYXN1cmUoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaEZlYXR1cmUnKTtcbiAgICB9XG4gICAgY29uc3QgZ2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuICAgIGlmICghKGdlb20gaW5zdGFuY2VvZiBQb2ludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZW9tZXRyeScpO1xuICAgIH1cbiAgICBjb25zdCBkZWMgPSB0aGlzLmRlY2ltYWxzO1xuICAgIGNvbnN0IG91dHB1dCA9IGdldEZvcm1hdHRlZFBvaW50KGdlb20sIGRlYywgdGhpcy5mb3JtYXRfLCB0aGlzLmNvb3JkRm9ybWF0Xyk7XG4gICAgY29uc3QgY29vcmQgPSBnZW9tLmdldExhc3RDb29yZGluYXRlKCk7XG4gICAgY2FsbGJhY2sob3V0cHV0LCBjb29yZCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Z2V0RGVmYXVsdERyYXdTdHlsZUZ1bmN0aW9ufSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL2NvbW1vbic7XG5pbXBvcnQgbmdlb0N1c3RvbUV2ZW50IGZyb20gJ25nZW8vQ3VzdG9tRXZlbnQnO1xuaW1wb3J0IHtsaXN0ZW4sIHVubGlzdGVuQnlLZXl9IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IHtUUlVFfSBmcm9tICdvbC9mdW5jdGlvbnMnO1xuaW1wb3J0IG9sR2VvbUxpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbEdlb21Qb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XG5pbXBvcnQgb2xHZW9tU2ltcGxlR2VvbWV0cnkgZnJvbSAnb2wvZ2VvbS9TaW1wbGVHZW9tZXRyeSc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkludGVyYWN0aW9uIGZyb20gJ29sL2ludGVyYWN0aW9uL0ludGVyYWN0aW9uJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5cbi8qKlxuICogTW9iaWxlRHJhdyBJbnRlcmFjdGlvbi5cbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2JpbGVEcmF3T3B0aW9uc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IFttaW5Qb2ludHNdIFRoZSBudW1iZXIgb2YgcG9pbnRzIHRoYXQgbXVzdCBiZSBkcmF3biBiZWZvcmUgYSBwb2x5Z29uIHJpbmcgb3IgbGluZVxuICogc3RyaW5nIGNhbiBiZSBmaW5pc2hlZC4gRGVmYXVsdCBpcyBgM2AgZm9yIHBvbHlnb24gcmluZ3MgYW5kIGAyYCBmb3IgbGluZSBzdHJpbmdzLlxuICogQHByb3BlcnR5IHtpbXBvcnQoJ29sL3N0eWxlL1N0eWxlJykuU3R5bGVMaWtlfSBbc3R5bGVdIFN0eWxlIGZvciBza2V0Y2ggZmVhdHVyZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHlwZSBEcmF3aW5nIHR5cGUgKCdQb2ludCcgb3IgJ0xpbmVTdHJpbmcnLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbd3JhcFhdIFdyYXAgdGhlIHdvcmxkIGhvcml6b250YWxseSBvbiB0aGUgc2tldGNoIG92ZXJsYXkuIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAqL1xuXG4vKipcbiAqIEludGVyYWN0aW9uIGZvciBkcmF3aW5nIGZlYXR1cmUgZ2VvbWV0cmllcyBmcm9tIGEgbW9iaWxlIGRldmljZSB1c2luZyB0aGVcbiAqIGNlbnRlciBvZiB0aGUgbWFwIHZpZXcgYXMgZW50cnkgZm9yIHBvaW50cyBhZGRlZC5cbiAqXG4gKiBTdXBwb3J0czpcbiAqIC0gcG9pbnRcbiAqIC0gbGluZSBzdHJpbmdcbiAqIC0gcG9seWdvblxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24ge1xuICAvKipcbiAgICogQGZpcmVzIERyYXdFdmVudFxuICAgKiBAcGFyYW0ge01vYmlsZURyYXdPcHRpb25zfSBvcHRpb25zIE9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcih7XG4gICAgICBoYW5kbGVFdmVudDogVFJVRSxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBrZXkgZm9yIHZpZXcgY2VudGVyIGNoYW5nZSBldmVudC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9ldmVudHMnKS5FdmVudHNLZXl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmNoYW5nZUV2ZW50S2V5XyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBHZW9tZXRyeSB0eXBlLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMudHlwZV8gPSBvcHRpb25zLnR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBvaW50cyB0aGF0IG11c3QgYmUgZHJhd24gYmVmb3JlIGEgcG9seWdvbiByaW5nIG9yIGxpbmVcbiAgICAgKiBzdHJpbmcgY2FuIGJlIGZpbmlzaGVkLiAgVGhlIGRlZmF1bHQgaXMgMyBmb3IgcG9seWdvbiByaW5ncyBhbmQgMiBmb3JcbiAgICAgKiBsaW5lIHN0cmluZ3MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5taW5Qb2ludHNfID0gb3B0aW9ucy5taW5Qb2ludHMgPyBvcHRpb25zLm1pblBvaW50cyA6IHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJyA/IDMgOiAyO1xuXG4gICAgLyoqXG4gICAgICogU2tldGNoIGZlYXR1cmUuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogUHJldmlvdXMgc2tldGNoIHBvaW50cywgc2F2ZWQgdG8gYmUgYWJsZSB0byBkaXNwbGF5IHRoZW0gb24gdGhlIGxheWVyLlxuICAgICAqXG4gICAgICogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5za2V0Y2hQb2ludHNfID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHNrZXRjaCBwb2ludC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5za2V0Y2hQb2ludF8gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogRHJhdyBvdmVybGF5IHdoZXJlIG91ciBza2V0Y2ggZmVhdHVyZXMgYXJlIGRyYXduLlxuICAgICAqXG4gICAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMub3ZlcmxheV8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBjbGFzc05hbWU6ICdjYW52YXMyZCcsXG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICAgIHVzZVNwYXRpYWxJbmRleDogZmFsc2UsXG4gICAgICAgIHdyYXBYOiBvcHRpb25zLndyYXBYID8gb3B0aW9ucy53cmFwWCA6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBzdHlsZTogb3B0aW9ucy5zdHlsZSB8fCBnZXREZWZhdWx0RHJhd1N0eWxlRnVuY3Rpb24oKSxcbiAgICAgIHVwZGF0ZVdoaWxlQW5pbWF0aW5nOiB0cnVlLFxuICAgICAgdXBkYXRlV2hpbGVJbnRlcmFjdGluZzogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGxpc3Rlbih0aGlzLCAnY2hhbmdlOmFjdGl2ZScsIHRoaXMudXBkYXRlU3RhdGVfLCB0aGlzKTtcblxuICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IG1hcCBNYXAuXG4gICAqL1xuICBzZXRNYXAobWFwKSB7XG4gICAgY29uc3QgY3VycmVudE1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgaWYgKGN1cnJlbnRNYXApIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZUV2ZW50S2V5Xykge1xuICAgICAgICB1bmxpc3RlbkJ5S2V5KHRoaXMuY2hhbmdlRXZlbnRLZXlfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24ucHJvdG90eXBlLnNldE1hcC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICB0aGlzLmNoYW5nZUV2ZW50S2V5XyA9IGxpc3RlbihtYXAuZ2V0VmlldygpLCAnY2hhbmdlOmNlbnRlcicsIHRoaXMuaGFuZGxlVmlld0NlbnRlckNoYW5nZV8sIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdGVfKCk7XG4gIH1cblxuICAvLyA9PT0gUFVCTElDIE1FVEhPRFMgLSBQUk9QRVJUWSBHRVRURVJTID09PVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgaW50ZXJhY3Rpb24gaXMgY3VycmVudGx5IGRpcnR5LiBJdCBpcyBpZiB0aGUgc2tldGNoXG4gICAqIGZlYXR1cmUgaGFzIGl0cyBnZW9tZXRyeSBsYXN0IGNvb3JkaW5hdGUgc2V0IHRvIHRoZSBjZW50ZXIgd2l0aG91dCB0aGVcbiAgICogdXNlIG9mIHRoZSBgYWRkVG9EcmF3aW5nYCBtZXRob2QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGludGVyYWN0aW9uIGlzIGRpcnR5LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICogQG9ic2VydmFibGVcbiAgICovXG4gIGdldERpcnR5KCkge1xuICAgIHJldHVybiAvKiogQHR5cGUge2Jvb2xlYW59ICovICh0aGlzLmdldCgnZGlydHknKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhlIGludGVyYWN0aW9uIGlzIGN1cnJlbnRseSBkcmF3aW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmFjdGlvbiBpcyBkcmF3aW5nLCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICogQG9ic2VydmFibGVcbiAgICovXG4gIGdldERyYXdpbmcoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gKHRoaXMuZ2V0KCdkcmF3aW5nJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBpbnRlcmFjdGlvbiBhcyBhIHZhbGlkIHNrZXRjaCBmZWF0dXJlLCBpLmUuIGl0cyBnZW9tZXRyeVxuICAgKiBpcyB2YWxpZC5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJhY3Rpb24gaGFzIGEgdmFsaWQgc2tldGNoIGZlYXR1cmUsXG4gICAqICAgICBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICogQG9ic2VydmFibGVcbiAgICovXG4gIGdldFZhbGlkKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUge2Jvb2xlYW59ICovICh0aGlzLmdldCgndmFsaWQnKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBza2V0Y2ggZmVhdHVyZS5cbiAgICpcbiAgICogQHJldHVybnMgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59IFRoZSBza2V0Y2ggZmVhdHVyZSwgb3IgbnVsbCBpZiBub25lLlxuICAgKi9cbiAgZ2V0RmVhdHVyZSgpIHtcbiAgICByZXR1cm4gdGhpcy5za2V0Y2hGZWF0dXJlXztcbiAgfVxuXG4gIC8vID09PSBQVUJMSUMgTUVUSE9EUyA9PT1cblxuICAvKipcbiAgICogQWRkIGN1cnJlbnQgc2tldGNoIHBvaW50IHRvIHNrZXRjaCBmZWF0dXJlIGlmIHRoZSBsYXR0ZXIgZXhpc3RzLCBlbHNlIGNyZWF0ZVxuICAgKiBpdC5cbiAgICovXG4gIGFkZFRvRHJhd2luZygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2tldGNoUG9pbnQnKTtcbiAgICB9XG5cbiAgICAvLyBubyBuZWVkIHRvIGRvIGFueXRoaW5nIGlmIGludGVyYWN0aW9uIGlzIG5vdCBhY3RpdmUsIG5vciBkcmF3aW5nXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICBjb25zdCBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBza2V0Y2hGZWF0dXJlR2VvbTtcbiAgICBjb25zdCBza2V0Y2hQb2ludEdlb20gPSB0aGlzLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHNrZXRjaFBvaW50R2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IG51bGw7XG5cbiAgICAvLyA9PSBwb2ludCA9PVxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUoe2dlb21ldHJ5OiBuZXcgb2xHZW9tUG9pbnQoY29vcmRpbmF0ZSksIG5hbWU6ICdtb2JpbGVEcmF3UG9pbnQnfSk7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IG5nZW9DdXN0b21FdmVudCgnZHJhd3N0YXJ0Jywge2ZlYXR1cmU6IHRoaXMuc2tldGNoRmVhdHVyZV99KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gPT0gbGluZSBzdHJpbmcgPT1cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50c18ucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG4gICAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbY29vcmRpbmF0ZS5zbGljZSgpLCBjb29yZGluYXRlLnNsaWNlKCldO1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21MaW5lU3RyaW5nKGNvb3JkaW5hdGVzKSxcbiAgICAgICAgICBuYW1lOiAnbW9iaWxlRHJhd0xpbmUnLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7ZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX30pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG4gICAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZS5zbGljZSgpKTtcbiAgICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA9PSBwb2x5Z29uID09XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludHNfLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpLCBjb29yZGluYXRlLnNsaWNlKCldO1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2x5Z29uKFtjb29yZGluYXRlc10pLFxuICAgICAgICAgIG5hbWU6ICdEcmF3TW9iaWxlUG9seWdvbicsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21Qb2x5Z29uKSB7XG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMyID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzMlswXTtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUuc2xpY2UoKSk7XG4gICAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRpcnR5ID0gdGhpcy5nZXREaXJ0eSgpO1xuICAgIGlmIChkaXJ0eSkge1xuICAgICAgdGhpcy5zZXQoJ2RpcnR5JywgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICAvLyBtaW5Qb2ludHMgdmFsaWRhdGlvblxuICAgIGNvbnN0IHZhbGlkID0gdGhpcy5nZXRWYWxpZCgpO1xuICAgIGlmICh0aGlzLnR5cGVfID09PSAnTGluZVN0cmluZycgfHwgdGhpcy50eXBlXyA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICBpZiAoY29vcmRpbmF0ZXMubGVuZ3RoID49IHRoaXMubWluUG9pbnRzXykge1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgdGhpcy5zZXQoJ3ZhbGlkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgIHRoaXMuc2V0KCd2YWxpZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2V0IHNrZXRjaCBwb2ludFxuICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcblxuICAgIC8vIHVwZGF0ZSBza2V0Y2ggZmVhdHVyZXNcbiAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBkcmF3aW5nXG4gICAqL1xuICBjbGVhckRyYXdpbmcoKSB7XG4gICAgdGhpcy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMuc2V0QWN0aXZlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaCBkcmF3aW5nLiBJZiB0aGVyZSdzIGEgc2tldGNoIHBvaW50LCBpdCdzIGFkZGVkIGZpcnN0LlxuICAgKi9cbiAgZmluaXNoRHJhd2luZygpIHtcbiAgICAvLyBubyBuZWVkIHRvIGRvIGFueXRoaW5nIGlmIGludGVyYWN0aW9uIGlzIG5vdCBhY3RpdmUsIG5vciBkcmF3aW5nXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICBjb25zdCBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcblxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IG5nZW9DdXN0b21FdmVudCgnZHJhd2VuZCcsIHtmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVffSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8vID09PSBQUklWQVRFIE1FVEhPRFMgPT09XG5cbiAgLyoqXG4gICAqIFN0YXJ0IGRyYXdpbmcgYnkgYWRkaW5nIHRoZSBza2V0Y2ggcG9pbnQgZmlyc3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydERyYXdpbmdfKCkge1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgdHJ1ZSk7XG4gICAgdGhpcy5jcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpO1xuICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZ5IHRoZSBnZW9tZXRyeSBvZiB0aGUgc2tldGNoIGZlYXR1cmUgdG8gaGF2ZSBpdHMgbGFzdCBjb29yZGluYXRlXG4gICAqIHNldCB0byB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtb2RpZnlEcmF3aW5nXygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjZW50ZXIgPSB0aGlzLmdldENlbnRlcl8oKTtcblxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnTGluZVN0cmluZycpIHtcbiAgICAgIGNvbnN0IHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICBjb29yZGluYXRlcy5wb3AoKTtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjZW50ZXIpO1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIGNvbnN0IHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlczIgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzMlswXTtcbiAgICAgICAgY29vcmRpbmF0ZXMucG9wKCk7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY2VudGVyKTtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoW2Nvb3JkaW5hdGVzXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGlydHkgPSB0aGlzLmdldERpcnR5KCk7XG4gICAgaWYgKCFkaXJ0eSkge1xuICAgICAgdGhpcy5zZXQoJ2RpcnR5JywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgZHJhd2luZyB3aXRob3V0IGFkZGluZyB0aGUgc2tldGNoIGZlYXR1cmUgdG8gdGhlIHRhcmdldCBsYXllci5cbiAgICpcbiAgICogQHJldHVybnMgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59IFRoZSBza2V0Y2ggZmVhdHVyZSAob3IgbnVsbCBpZiBub25lKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFib3J0RHJhd2luZ18oKSB7XG4gICAgY29uc3Qgc2tldGNoRmVhdHVyZSA9IHRoaXMuc2tldGNoRmVhdHVyZV87XG4gICAgaWYgKHNrZXRjaEZlYXR1cmUgfHwgdGhpcy5za2V0Y2hQb2ludHNfLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBudWxsO1xuICAgICAgdGhpcy5za2V0Y2hQb2ludF8gPSBudWxsO1xuICAgICAgLyoqIEB0eXBlIHtvbFNvdXJjZVZlY3RvcjxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gKi8gKHRoaXMub3ZlcmxheV8uZ2V0U291cmNlKCkpLmNsZWFyKFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5za2V0Y2hQb2ludHNfID0gW107XG4gICAgdGhpcy5zZXQoJ2RpcnR5JywgZmFsc2UpO1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgZmFsc2UpO1xuICAgIHRoaXMuc2V0KCd2YWxpZCcsIGZhbHNlKTtcbiAgICByZXR1cm4gc2tldGNoRmVhdHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlU3RhdGVfKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICBpZiAoIW1hcCB8fCAhYWN0aXZlKSB7XG4gICAgICB0aGlzLmFib3J0RHJhd2luZ18oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydERyYXdpbmdfKCk7XG4gICAgfVxuICAgIHRoaXMub3ZlcmxheV8uc2V0TWFwKGFjdGl2ZSA/IG1hcCA6IG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR8aW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0fSBldnQgRXZlbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVWaWV3Q2VudGVyQ2hhbmdlXyhldnQpIHtcbiAgICAvLyBubyBuZWVkIHRvIGRvIGFueXRoaW5nIGlmIGludGVyYWN0aW9uIGlzIG5vdCBhY3RpdmUsIG5vciBkcmF3aW5nXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICBjb25zdCBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKTtcblxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGlmeURyYXdpbmdfKCk7XG4gICAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKSB7XG4gICAgY29uc3QgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJfKCk7XG5cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5nZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpO1xuICAgICAgZ2VvbWV0cnkuc2V0Q29vcmRpbmF0ZXMoY2VudGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludF8gPSBuZXcgb2xGZWF0dXJlKHtnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KGNlbnRlciksIG5hbWU6ICdtb2JpbGVEcmF3UG9pbnQnfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZHJhdyB0aGUgc2tldGNoIGZlYXR1cmVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlU2tldGNoRmVhdHVyZXNfKCkge1xuICAgIGNvbnN0IHNrZXRjaEZlYXR1cmVzID0gW107XG4gICAgaWYgKHRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHNrZXRjaEZlYXR1cmVzLnB1c2godGhpcy5za2V0Y2hGZWF0dXJlXyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgc2tldGNoRmVhdHVyZXMucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG4gICAgfVxuICAgIGNvbnN0IG92ZXJsYXlTb3VyY2UgPSAvKiogQHR5cGUge29sU291cmNlVmVjdG9yPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqLyAoXG4gICAgICB0aGlzLm92ZXJsYXlfLmdldFNvdXJjZSgpXG4gICAgKTtcbiAgICBvdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXMoc2tldGNoRmVhdHVyZXMpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXModGhpcy5za2V0Y2hQb2ludHNfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBnZW9tZXRyeSBvZiB0aGUgc2tldGNoIHBvaW50IGZlYXR1cmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0fSBQb2ludC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCkge1xuICAgIGlmICghdGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBza2V0Y2hQb2ludCcpO1xuICAgIH1cbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuc2tldGNoUG9pbnRfLmdldEdlb21ldHJ5KCk7XG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9pbnQpIHtcbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBnZW9tZXRyeSB0eXBlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNlbnRlciBvZiB0aGUgbWFwIHZpZXdcbiAgICpcbiAgICogQHJldHVybnMge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IENvb3JkaW5hdGUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRDZW50ZXJfKCkge1xuICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuZ2V0TWFwKCkuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjZW50ZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY2VudGVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjZW50ZXI7XG4gIH1cbn1cbiIsIm1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50LiRpbmplY3QgPSBbJ2dtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmwnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWFNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZSc7XG5pbXBvcnQge01lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyfSBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudCc7XG5pbXBvcnQge2J1aWxkU3R5bGV9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vYmFzZUNvbXBvbmVudC5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlQXJlYScsIFtuZ2VvTWlzY0ZpbHRlcnMubmFtZV0pO1xubXlNb2R1bGUudmFsdWUoXG4gICdnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gIChlbGVtZW50LCBhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gYXR0cnMuZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZXVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL2FyZWFDb21wb25lbnQnO1xuICB9LFxuKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvYXJlYUNvbXBvbmVudCcsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5cbi8qKlxuICogUHJvdmlkZSBhIGRpcmVjdGl2ZSB0byBkbyBhIGFyZWEgbWVhc3VyZSBvbiB0aGUgbW9iaWxlIGRldmljZXMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIDxkaXYgZ21mLW1vYmlsZS1tZWFzdXJlYXJlYVxuICogICAgICAgIGdtZi1tb2JpbGUtbWVhc3VyZWFyZWEtYWN0aXZlPVwiY3RybC5tZWFzdXJlQXJlYUFjdGl2ZVwiXG4gKiAgICAgICAgZ21mLW1vYmlsZS1tZWFzdXJlYXJlYS1tYXA9XCI6OmN0cmwubWFwXCI+XG4gKiAgICAgIDwvZGl2PlxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBnbWYtbW9iaWxlLW1lYXN1cmVhcmVhLWFjdGl2ZSBVc2VkIHRvIGFjdGl2ZVxuICogb3IgZGVhY3RpdmF0ZSB0aGUgY29tcG9uZW50LlxuICogQGh0bWxBdHRyaWJ1dGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH0gZ21mLW1vYmlsZS1tZWFzdXJlYXJlYS1tYXAgVGhlIG1hcC5cbiAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9uKEpRdWVyeT0sIGFuZ3VsYXIuSUF0dHJpYnV0ZXM9KTpzdHJpbmd9IGdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmxcbiAqICAgICBUZW1wbGF0ZSBVUkwgZm9yIHRoZSBkaXJlY3RpdmUuXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JRGlyZWN0aXZlfSBUaGUgRGlyZWN0aXZlIERlZmluaXRpb24gT2JqZWN0LlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5nbmFtZSBnbWZNb2JpbGVNZWFzdXJlQXJlYVxuICovXG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudChnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWFyZWFBY3RpdmUnLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZWFyZWFNYXAnLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVBcmVhQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsLFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9IHNjb3BlIFNjb3BlLlxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSBhdHRycyBBdHRyaWJ1dGVzLlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JQ29udHJvbGxlcn0gW2NvbnRyb2xsZXJdIENvbnRyb2xsZXIuXG4gICAgICovXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9LFxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlYXJlYScsIG1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JRmlsdGVyU2VydmljZX0gJGZpbHRlciBBbmd1bGFyIGZpbHRlclxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnN9IGdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2csIGdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucykge1xuICAgIHN1cGVyKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zfVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhTW9iaWxlJykuZGVmYXVsdH1cbiAgICAgKi9cbiAgICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGNvbnRyb2xsZXIuXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYU1vYmlsZSh0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgdGhpcy5nZXR0ZXh0Q2F0YWxvZywge1xuICAgICAgcHJlY2lzaW9uOiB0aGlzLm9wdGlvbnMucHJlY2lzaW9uIHx8IDIsXG4gICAgICBza2V0Y2hTdHlsZTogYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2tldGNoU3R5bGUpLFxuICAgIH0pO1xuICAgIHN1cGVyLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3VycmVudCBza2V0Y2ggcG9pbnQgdG8gbGluZSBtZWFzdXJlXG4gICAqL1xuICBhZGRQb2ludCgpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmFkZFRvRHJhd2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBza2V0Y2ggZmVhdHVyZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5jbGVhckRyYXdpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2ggbGluZSBtZWFzdXJlXG4gICAqL1xuICBmaW5pc2goKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZmlsdGVyJywgJ2dldHRleHRDYXRhbG9nJywgJ2dtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucyddO1xubXlNb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZUFyZWFDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwuZHJhd2luZyAmJiAoIWN0cmwudmFsaWQpXCIgbmctY2xpY2s9XCJjdHJsLmFkZFBvaW50KClcIj5cbiAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVja1wiPjwvc3Bhbj5cbiAge3snU2V0IGFzIHN0YXJ0aW5nIHBvaW50JyB8IHRyYW5zbGF0ZX19XG48L2E+XG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWlmPVwiY3RybC5kaXJ0eVwiIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtcGx1c1wiPjwvc3Bhbj5cbiAge3snQWRkIG5ldyBwb2ludCcgfCB0cmFuc2xhdGV9fVxuPC9hPlxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwuZHJhd2luZyAmJiBjdHJsLnZhbGlkICYmICFjdHJsLmRpcnR5XCIgbmctY2xpY2s9XCJjdHJsLmZpbmlzaCgpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L3NwYW4+XG4gIHt7J1Rlcm1pbmF0ZScgfCB0cmFuc2xhdGV9fVxuPC9hPlxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwudmFsaWRcIiBuZy1jbGljaz1cImN0cmwuY2xlYXIoKVwiPlxuICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXJlcGVhdFwiPjwvc3Bhbj5cbiAge3snQ2xlYXInIHwgdHJhbnNsYXRlfX1cbjwvYT5cbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmFjdGl2ZVwiIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cbiAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvc3Bhbj5cbiAge3snQ2xvc2UnIHwgdHJhbnNsYXRlfX1cbjwvYT5gO1xuIiwiTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRmaWx0ZXInLCAnZ2V0dGV4dENhdGFsb2cnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHtpbnRlcmFjdGlvbkRlY29yYXRpb259IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZSc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCB7bGlzdGVufSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IE1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlQmFzZScsIFtuZ2VvTWlzY0ZpbHRlcnMubmFtZV0pO1xuXG4vKipcbiAqIEJhc2UgY29udHJvbGxlciBjbGFzcyBmb3IgTGVuZ3RoIGFuZCBBcmVhIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUZpbHRlclNlcnZpY2V9ICRmaWx0ZXIgQW5ndWxhciBmaWx0ZXJcbiAqIEBwYXJhbSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfSBnZXR0ZXh0Q2F0YWxvZyBHZXR0ZXh0IGNhdGFsb2cuXG4gKiBAY2xhc3NcbiAqIEBuZ2RvYyBjb250cm9sbGVyXG4gKiBAbmduYW1lIEdtZk1vYmlsZU1lYXN1cmVCYXNlQ29udHJvbGxlclxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy5zY29wZSA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSUZpbHRlclNlcnZpY2V9XG4gICAqL1xuICB0aGlzLmZpbHRlciA9ICRmaWx0ZXI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9XG4gICAqL1xuICB0aGlzLmdldHRleHRDYXRhbG9nID0gZ2V0dGV4dENhdGFsb2c7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuc2NvcGUuJHdhdGNoKFxuICAgICgpID0+IHRoaXMuYWN0aXZlLFxuICAgIChuZXdWYWwpID0+IHtcbiAgICAgIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKG5ld1ZhbCk7XG4gICAgfSxcbiAgKTtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZScpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmRpcnR5ID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy52YWxpZCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGNvbnRyb2xsZXIuXG4gKi9cbk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgfVxuICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZSk7XG4gIGNvbnN0IGRyYXdJbnRlcmFjdGlvbiA9IHRoaXMubWVhc3VyZS5nZXREcmF3SW50ZXJhY3Rpb24oKTtcbiAgaWYgKCEoZHJhd0ludGVyYWN0aW9uIGluc3RhbmNlb2YgTW9iaWxlRHJhdykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGRyYXdJbnRlcmFjdGlvbicpO1xuICB9XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24oZHJhd0ludGVyYWN0aW9uKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdoYXNQb2ludHMnLCB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhd0ludGVyYWN0aW9uLmdldEZlYXR1cmUoKSAhPT0gbnVsbDtcbiAgICB9LFxuICB9KTtcbiAgbGlzdGVuKFxuICAgIGRyYXdJbnRlcmFjdGlvbixcbiAgICAnY2hhbmdlOmRpcnR5JyxcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuTGlzdGVuZXJGdW5jdGlvbn0gKi9cbiAgICAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLmRpcnR5ID0gZHJhd0ludGVyYWN0aW9uLmdldERpcnR5KCk7XG5cbiAgICAgIC8vIHRoaXMgaXMgd2hlcmUgdGhlIGFuZ3VsYXIgc2NvcGUgaXMgZm9yY2VkIHRvIGJlIGFwcGxpZWQuIFdlXG4gICAgICAvLyBvbmx5IG5lZWQgdG8gZG8gdGhpcyB3aGVuIGRpcnR5LCBhcyBnb2luZyB0byBcIm5vIGJlaW5nIGRpcnR5XCJcbiAgICAgIC8vIGlzIG1hZGUgYnkgYSBjbGljayBvbiBhIGJ1dHRvbiB3aGVyZSBBbmd1bGFyIGlzIHdpdGhpbiBzY29wZVxuICAgICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgICAgdGhpcy5zY29wZS4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRoaXMsXG4gICk7XG4gIGxpc3RlbihcbiAgICBkcmF3SW50ZXJhY3Rpb24sXG4gICAgJ2NoYW5nZTpkcmF3aW5nJyxcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuTGlzdGVuZXJGdW5jdGlvbn0gKi9cbiAgICAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLmRyYXdpbmcgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0RHJhd2luZygpO1xuICAgIH0sXG4gICAgdGhpcyxcbiAgKTtcbiAgbGlzdGVuKFxuICAgIGRyYXdJbnRlcmFjdGlvbixcbiAgICAnY2hhbmdlOnZhbGlkJyxcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuTGlzdGVuZXJGdW5jdGlvbn0gKi9cbiAgICAoZXZ0KSA9PiB7XG4gICAgICB0aGlzLnZhbGlkID0gZHJhd0ludGVyYWN0aW9uLmdldFZhbGlkKCk7XG4gICAgfSxcbiAgICB0aGlzLFxuICApO1xuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1lYXN1cmUpO1xufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ2dtZk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyJywgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQuJGluamVjdCA9IFsnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGhNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoTW9iaWxlJztcbmltcG9ydCB7TWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXJ9IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50JztcbmltcG9ydCB7YnVpbGRTdHlsZX0gZnJvbSAnbmdlby9vcHRpb25zJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9iYXNlQ29tcG9uZW50Lmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGgnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gIChlbGVtZW50LCBhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gYXR0cnMuZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRldXJsO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JztcbiAgfSxcbik7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL2xlbmd0aENvbXBvbmVudCcsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5cbi8qKlxuICogUHJvdmlkZSBhIGRpcmVjdGl2ZSB0byBkbyBhIGxlbmd0aCBtZWFzdXJlIG9uIHRoZSBtb2JpbGUgZGV2aWNlcy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgPGRpdiBnbWYtbW9iaWxlLW1lYXN1cmVsZW5ndGhcbiAqICAgICAgICBnbWYtbW9iaWxlLW1lYXN1cmVsZW5ndGgtYWN0aXZlPVwiY3RybC5tZWFzdXJlTGVuZ3RoQWN0aXZlXCJcbiAqICAgICAgICBnbWYtbW9iaWxlLW1lYXN1cmVsZW5ndGgtbWFwPVwiOjpjdHJsLm1hcFwiPlxuICogICAgICA8L2Rpdj5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gZ21mLW1vYmlsZS1tZWFzdXJlbGVuZ3RoLWFjdGl2ZSBVc2VkIHRvIGFjdGl2ZVxuICogb3IgZGVhY3RpdmF0ZSB0aGUgY29tcG9uZW50LlxuICogQGh0bWxBdHRyaWJ1dGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH0gZ21mLW1vYmlsZS1tZWFzdXJlbGVuZ3RoLW1hcCBUaGUgbWFwLlxuICogQHBhcmFtIHtzdHJpbmd8ZnVuY3Rpb24oSlF1ZXJ5PSwgYW5ndWxhci5JQXR0cmlidXRlcz0pOnN0cmluZ30gZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsXG4gKiAgICAgVGVtcGxhdGUgVVJMIGZvciB0aGUgZGlyZWN0aXZlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSURpcmVjdGl2ZX0gVGhlIERpcmVjdGl2ZSBEZWZpbml0aW9uIE9iamVjdC5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFxuICovXG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWxlbmd0aEFjdGl2ZScsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoTWFwJyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdHbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoVGVtcGxhdGVVcmwsXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gc2NvcGUgU2NvcGUuXG4gICAgICogQHBhcmFtIHtKUXVlcnl9IGVsZW1lbnQgRWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9IGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklDb250cm9sbGVyfSBbY29udHJvbGxlcl0gQ29udHJvbGxlci5cbiAgICAgKi9cbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRyb2xsZXInKTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH0sXG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVsZW5ndGgnLCBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQpO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAgICogQHBhcmFtIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfSAkZmlsdGVyIEFuZ3VsYXIgZmlsdGVyXG4gICAqIEBwYXJhbSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfSBnZXR0ZXh0Q2F0YWxvZyBHZXR0ZXh0IGNhdGFsb2cuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZk1vYmlsZU1lYXN1cmVMZW5ndGhPcHRpb25zfSBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2csIGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhPcHRpb25zKSB7XG4gICAgc3VwZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZyk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9uc31cbiAgICAgKi9cbiAgICB0aGlzLm9wdGlvbnMgPSBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUnKS5kZWZhdWx0fVxuICAgICAqL1xuICAgIHRoaXMubWVhc3VyZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgY29udHJvbGxlci5cbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGhNb2JpbGUoXG4gICAgICB0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSxcbiAgICAgIHRoaXMuZ2V0dGV4dENhdGFsb2csXG4gICAgICB7XG4gICAgICAgIHByZWNpc2lvbjogdGhpcy5vcHRpb25zLnByZWNpc2lvbiB8fCAzLFxuICAgICAgICBza2V0Y2hTdHlsZTogYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2tldGNoU3R5bGUpLFxuICAgICAgfSxcbiAgICApO1xuICAgIHN1cGVyLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY3VycmVudCBza2V0Y2ggcG9pbnQgdG8gbGluZSBtZWFzdXJlXG4gICAqL1xuICBhZGRQb2ludCgpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmFkZFRvRHJhd2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBza2V0Y2ggZmVhdHVyZVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5jbGVhckRyYXdpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2ggbGluZSBtZWFzdXJlXG4gICAqL1xuICBmaW5pc2goKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVhY3RpdmF0ZSB0aGUgZGlyZWN0aXZlLlxuICAgKi9cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZmlsdGVyJywgJ2dldHRleHRDYXRhbG9nJywgJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGhPcHRpb25zJ107XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmFjdGl2ZVwiIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cbiAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvc3Bhbj5cbiAge3snQ2xvc2UnIHwgdHJhbnNsYXRlfX1cbjwvYT5gO1xuIiwiTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci4kaW5qZWN0ID0gW1xuICAnZ2V0dGV4dENhdGFsb2cnLFxuICAnJHNjb3BlJyxcbiAgJyRmaWx0ZXInLFxuICAnZ21mUmFzdGVyJyxcbiAgJ25nZW9EZWJvdW5jZScsXG4gICdnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zJyxcbl07XG5tb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQuJGluamVjdCA9IFsnZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZlJhc3RlclJhc3RlclNlcnZpY2UgZnJvbSAnZ21mL3Jhc3Rlci9SYXN0ZXJTZXJ2aWNlJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlUG9pbnRNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlUG9pbnRNb2JpbGUnO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlJztcbmltcG9ydCB7aW50ZXJhY3Rpb25EZWNvcmF0aW9ufSBmcm9tICduZ2VvL21pc2MvZGVjb3JhdGUnO1xuaW1wb3J0IHtsaXN0ZW4sIHVubGlzdGVuQnlLZXl9IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xuaW1wb3J0IHtidWlsZFN0eWxlfSBmcm9tICduZ2VvL29wdGlvbnMnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL3BvaW50Q29tcG9uZW50Lmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZk1vYmlsZU1lYXN1cmVQb2ludCcsIFtcbiAgZ21mUmFzdGVyUmFzdGVyU2VydmljZS5uYW1lLFxuICBuZ2VvTWlzY0RlYm91bmNlLm5hbWUsXG5dKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHtKUXVlcnl9IGVsZW1lbnQgRWxlbWVudC5cbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSBhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdGVtcGxhdGUgdXJsLlxuICAgKi9cbiAgKGVsZW1lbnQsIGF0dHJzKSA9PiB7XG4gICAgY29uc3QgdGVtcGxhdGVVcmwgPSBhdHRycy5nbWZNb2JpbGVNZWFzdXJlUG9pbnRUZW1wbGF0ZXVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50JztcbiAgfSxcbik7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50JywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcblxuLyoqXG4gKiBQcm92aWRlIGEgZGlyZWN0aXZlIHRvIGRvIGEgcG9pbnQgKGNvb3JkaW5hdGUgYW5kIGVsZXZhdGlvbikgbWVhc3VyZSBvbiB0aGVcbiAqIG1vYmlsZSBkZXZpY2VzLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICA8ZGl2IGdtZi1tb2JpbGUtbWVhc3VyZXBvaW50XG4gKiAgICAgICAgZ21mLW1vYmlsZS1tZWFzdXJlcG9pbnQtYWN0aXZlPVwiY3RybC5tZWFzdXJlUG9pbnRBY3RpdmVcIlxuICogICAgICAgIGdtZi1tb2JpbGUtbWVhc3VyZXBvaW50LW1hcD1cIjo6Y3RybC5tYXBcIj5cbiAqICAgICAgPC9kaXY+XG4gKlxuICogV2hlcmUgY3RybC5tZWFzdXJlUG9pbnRMYXllcnMgaXMgYW4gb2JqZWN0IGxpa2UgdGhpczpcbiAqXG4gKiAgICAgIHRoaXMubWVhc3VyZVBvaW50TGF5ZXJzID0gW1xuICogICAgICAgIHtuYW1lOiAnc3J0bScsIHVuaXQ6ICdtJywgZGVjaW1hbHM6IDJ9LFxuICogICAgICAgIHtuYW1lOiAnd2luZCcsIHt1bml0OiAna20vaCd9LFxuICogICAgICAgIHtuYW1lOiAnaHVtaWRpdHknfVxuICogICAgICBdO1xuICpcbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBnbWYtbW9iaWxlLW1lYXN1cmVwb2ludC1hY3RpdmUgVXNlZCB0byBhY3RpdmVcbiAqIG9yIGRlYWN0aXZhdGUgdGhlIGNvbXBvbmVudC5cbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IGdtZi1tb2JpbGUtbWVhc3VyZXBvaW50LW1hcCBUaGUgbWFwLlxuICogQHBhcmFtIHtzdHJpbmd8ZnVuY3Rpb24oSlF1ZXJ5PSwgYW5ndWxhci5JQXR0cmlidXRlcz0pOiBzdHJpbmd9IGdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsXG4gKiAgICAgVGVtcGxhdGUgVVJMIGZvciB0aGUgZGlyZWN0aXZlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSURpcmVjdGl2ZX0gVGhlIERpcmVjdGl2ZSBEZWZpbml0aW9uIE9iamVjdC5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgZ21mTW9iaWxlTWVhc3VyZVBvaW50XG4gKi9cbmZ1bmN0aW9uIG1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudChnbWZNb2JpbGVNZWFzdXJlUG9pbnRUZW1wbGF0ZVVybCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdhY3RpdmUnOiAnPWdtZk1vYmlsZU1lYXN1cmVwb2ludEFjdGl2ZScsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlcG9pbnRNYXAnLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwsXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gc2NvcGUgU2NvcGUuXG4gICAgICogQHBhcmFtIHtKUXVlcnl9IGVsZW1lbnQgRWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9IGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklDb250cm9sbGVyfSBbY29udHJvbGxlcl0gQ29udHJvbGxlci5cbiAgICAgKi9cbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRyb2xsZXInKTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH0sXG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVwb2ludCcsIG1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudCk7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9IGdldHRleHRDYXRhbG9nIEdldHRleHQgY2F0YWxvZy5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICogQHBhcmFtIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfSAkZmlsdGVyIEFuZ3VsYXIgZmlsdGVyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3Jhc3Rlci9SYXN0ZXJTZXJ2aWNlJykuUmFzdGVyU2VydmljZX0gZ21mUmFzdGVyIGdtZiBSYXN0ZXIgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZGVib3VuY2UnKS5taXNjRGVib3VuY2U8ZnVuY3Rpb24oKTogdm9pZD59IG5nZW9EZWJvdW5jZSBuZ2VvIERlYm91bmNlIGZhY3RvcnkuXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zfSBnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zIFRoZSBvcHRpb25zLlxuICogQGNsYXNzXG4gKiBAaGlkZGVuXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyKFxuICBnZXR0ZXh0Q2F0YWxvZyxcbiAgJHNjb3BlLFxuICAkZmlsdGVyLFxuICBnbWZSYXN0ZXIsXG4gIG5nZW9EZWJvdW5jZSxcbiAgZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9ucyxcbikge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zfVxuICAgKi9cbiAgdGhpcy5vcHRpb25zID0gZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9ucztcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3Jhc3Rlci9SYXN0ZXJTZXJ2aWNlJykuUmFzdGVyU2VydmljZX1cbiAgICovXG4gIHRoaXMuZ21mUmFzdGVyXyA9IGdtZlJhc3RlcjtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9taXNjL2RlYm91bmNlJykubWlzY0RlYm91bmNlPGZ1bmN0aW9uKCk6IHZvaWQ+fVxuICAgKi9cbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfVxuICAgKi9cbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZ18gPSBnZXR0ZXh0Q2F0YWxvZztcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSUZpbHRlclNlcnZpY2V9XG4gICAqL1xuICB0aGlzLiRmaWx0ZXJfID0gJGZpbHRlcjtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgJHNjb3BlLiR3YXRjaChcbiAgICAoKSA9PiB0aGlzLmFjdGl2ZSxcbiAgICAobmV3VmFsKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuICAgICAgdGhpcy5oYW5kbGVNZWFzdXJlQWN0aXZlQ2hhbmdlXygpO1xuICAgIH0sXG4gICk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZScpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIGtleSBmb3IgbWFwIHZpZXcgJ3Byb3BlcnR5Y2hhbmdlJyBldmVudC5cbiAgICpcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL2V2ZW50cycpLkV2ZW50c0tleX1cbiAgICovXG4gIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBjb250cm9sbGVyLlxuICovXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZVBvaW50TW9iaWxlKFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCduZ2VvL21pc2MvZmlsdGVycycpLm51bWJlckNvb3JkaW5hdGVzfSAqLyB0aGlzLiRmaWx0ZXJfKCduZ2VvTnVtYmVyQ29vcmRpbmF0ZXMnKSxcbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0LFxuICAgIHtcbiAgICAgIGRlY2ltYWxzOiB0aGlzLm9wdGlvbnMuZGVjaW1hbHMsXG4gICAgICBza2V0Y2hTdHlsZTogYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2tldGNoU3R5bGUpLFxuICAgIH0sXG4gICk7XG4gIHRoaXMubWVhc3VyZS5zZXRBY3RpdmUodGhpcy5hY3RpdmUpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlKTtcbiAgY29uc3QgZHJhd0ludGVyYWN0aW9uID0gdGhpcy5tZWFzdXJlLmdldERyYXdJbnRlcmFjdGlvbigpO1xuICBpZiAoIShkcmF3SW50ZXJhY3Rpb24gaW5zdGFuY2VvZiBNb2JpbGVEcmF3KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gIH1cbiAgdGhpcy5kcmF3SW50ZXJhY3Rpb24gPSBkcmF3SW50ZXJhY3Rpb247XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmRyYXdJbnRlcmFjdGlvbik7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlKTtcbn07XG5cbi8qKlxuICogRGVhY3RpdmF0ZSB0aGUgZGlyZWN0aXZlLlxuICovXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byB0cmFuc2xhdGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdHJhbnNsYXRlZCB0ZXh0LlxuICovXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiB0aGlzLmdldHRleHRDYXRhbG9nXy5nZXRTdHJpbmcoc3RyKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gdGhlIG1lYXN1cmUgYmVjb21lcyBhY3RpdmUgb3IgaW5hY3RpdmUuIEFjdCBhY2NvcmRpbmdseTpcbiAqIC0gb24gYWN0aXZhdGUsIGxpc3RlbiB0byB0aGUgbWFwIHByb3BlcnR5IGNoYW5nZXMgdG8gY2FsbCBmb3IgdGhlIGVsZXZhdGlvblxuICogICBzZXJ2aWNlLlxuICogLSBvbiBkZWFjdGl2YXRlLCB1bmxpc3RlblxuICpcbiAqIEBoaWRkZW5cbiAqL1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlTWVhc3VyZUFjdGl2ZUNoYW5nZV8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgaWYgKCF0aGlzLm1lYXN1cmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICB9XG4gIGlmICh0aGlzLm1lYXN1cmUuZ2V0QWN0aXZlKCkpIHtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbGlzdGVuKFxuICAgICAgdmlldyxcbiAgICAgICdwcm9wZXJ0eWNoYW5nZScsXG4gICAgICB0aGlzLm5nZW9EZWJvdW5jZV8odGhpcy5nZXRNZWFzdXJlXy5iaW5kKHRoaXMpLCAzMDAsIC8qIGludm9rZUFwcGx5ICovIHRydWUpLFxuICAgICAgdGhpcyxcbiAgICApO1xuICAgIHRoaXMuZ2V0TWVhc3VyZV8oKTtcbiAgfSBlbHNlIGlmICh0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5Xykge1xuICAgIHVubGlzdGVuQnlLZXkodGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8pO1xuICAgIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsIHRoZSBlbGV2YXRpb24gc2VydmljZSB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG1lYXN1cmUgYXRcbiAqIHRoZSBjdXJyZW50IG1hcCBjZW50ZXIgbG9jYXRpb24uXG4gKlxuICogQGhpZGRlblxuICovXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRNZWFzdXJlXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCBjZW50ZXIgPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0Q2VudGVyKCk7XG4gIGlmICghQXJyYXkuaXNBcnJheShjZW50ZXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBjZW50ZXInKTtcbiAgfVxuICBpZiAoIXRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMgfHwgdGhpcy5vcHRpb25zLnJhc3RlckxheWVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGFyYW1zID0ge1xuICAgICdsYXllcnMnOiB0aGlzLm9wdGlvbnMucmFzdGVyTGF5ZXJzLm1hcCgoY29uZmlnKSA9PiBjb25maWcubmFtZSkuam9pbignLCcpLFxuICB9O1xuICB0aGlzLmdtZlJhc3Rlcl8uZ2V0UmFzdGVyKGNlbnRlciwgcGFyYW1zKS50aGVuKChvYmplY3QpID0+IHtcbiAgICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLm1lYXN1cmUuZ2V0VG9vbHRpcEVsZW1lbnQoKTtcbiAgICBjb25zdCBjdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAnZ21mLW1vYmlsZS1tZWFzdXJlLXBvaW50JztcbiAgICBjdG4uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIGZvciAoY29uc3QgY29uZmlnIG9mIHRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMpIHtcbiAgICAgIGNvbnN0IGtleSA9IGNvbmZpZy5uYW1lO1xuICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd8bnVtYmVyfSAqL1xuICAgICAgICBsZXQgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgY29uc3QgY2hpbGRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjaGlsZEVsLmNsYXNzTmFtZSA9IGBnbWYtbW9iaWxlLW1lYXN1cmUtcG9pbnQtJHtrZXl9YDtcbiAgICAgICAgY29uc3QgdW5pdCA9IGNvbmZpZy51bml0IHx8ICcnO1xuICAgICAgICBjb25zdCBkZWNpbWFscyA9IGNvbmZpZy5kZWNpbWFscyA+IDAgPyBjb25maWcuZGVjaW1hbHMgOiAwO1xuICAgICAgICB2YWx1ZSA9IHRoaXMuJGZpbHRlcl8oJ251bWJlcicpKHZhbHVlLCBkZWNpbWFscyk7XG4gICAgICAgIGNoaWxkRWwuaW5uZXJIVE1MID0gW3RoaXMudHJhbnNsYXRlKGtleSksICc6ICcsIHZhbHVlLCAnICcsIHVuaXRdLmpvaW4oJycpO1xuICAgICAgICBjdG4uYXBwZW5kQ2hpbGQoY2hpbGRFbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHByZXZpb3VzQ3RuID0gZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgIGlmIChwcmV2aW91c0N0blswXSkge1xuICAgICAgcHJldmlvdXNDdG5bMF0ucmVtb3ZlKCk7XG4gICAgfVxuICAgIGVsLmFwcGVuZENoaWxkKGN0bik7XG4gIH0pO1xufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXInLCBNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibW9iaWxlbWVhc3VyZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9tb2JpbGVtZWFzdXJlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=