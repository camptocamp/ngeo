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
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
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
/******/ 					const r = fn();
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
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
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
/******/ 		const installedChunks = {
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
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
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
/******/ 		const chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/mobilemeasure.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vY29udHJpYnMvZ21mL2V4YW1wbGVzL21vYmlsZW1lYXN1cmUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9tb2JpbGVtZWFzdXJlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9pbnRlcmFjdGlvbi9NZWFzdXJlUG9pbnRNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYXJlYUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQuaHRtbC5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tb2JpbGUvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL3NyYy9tb2JpbGUvbWVhc3VyZS9wb2ludENvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbW9iaWxlL21lYXN1cmUvcG9pbnRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vbW9iaWxlbWVhc3VyZS5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBnbWZQZXJtYWxpbmtQZXJtYWxpbmsgZnJvbSAnZ21mL3Blcm1hbGluay9QZXJtYWxpbmsnO1xuaW1wb3J0IGdtZk1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9hcmVhQ29tcG9uZW50JztcbmltcG9ydCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29tcG9uZW50IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQnO1xuaW1wb3J0IGdtZk1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudCBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvcG9pbnRDb21wb25lbnQnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZmFwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBnbWZNYXBDb21wb25lbnQubmFtZSxcbiAgZ21mUGVybWFsaW5rUGVybWFsaW5rLm5hbWUsXG4gIGdtZk1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50Lm5hbWUsXG4gIGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb21wb25lbnQubmFtZSxcbiAgZ21mTW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50Lm5hbWUsXG4gIG5nZW9NaXNjQnRuQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9NYXBNb2R1bGUubmFtZSxcbl0pO1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWydnbWZQZXJtYWxpbmsnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnZ21mL3Blcm1hbGluay9QZXJtYWxpbmsnKS5QZXJtYWxpbmtTZXJ2aWNlfSBnbWZQZXJtYWxpbmsgVGhlIGdtZiBwZXJtYWxpbmsgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihnbWZQZXJtYWxpbmspIHtcbiAgY29uc3QgY2VudGVyID0gZ21mUGVybWFsaW5rLmdldE1hcENlbnRlcigpIHx8IFs1Mzc2MzUsIDE1MjY0MF07XG4gIGNvbnN0IHpvb20gPSBnbWZQZXJtYWxpbmsuZ2V0TWFwWm9vbSgpIHx8IDM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBjZW50ZXIsXG4gICAgICB6b29tOiB6b29tLFxuICAgIH0pLFxuICB9KTtcbiAgdGhpcy5tYXAuYWRkQ29udHJvbChcbiAgICBuZXcgb2xDb250cm9sU2NhbGVMaW5lKHtcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNsZW5ndGgtdW5pdHNcbiAgICAgIGRwaTogOTYsXG4gICAgfSksXG4gICk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlQXJlYUFjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMubWVhc3VyZUxlbmd0aEFjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMubWVhc3VyZVBvaW50QWN0aXZlID0gZmFsc2U7XG59XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmNvbnN0IHNrZXRjaFN0eWxlID0ge1xuICBmaWxsOiB7XG4gICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICB9LFxuICBzdHJva2U6IHtcbiAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgbGluZURhc2g6IFsxMCwgMTBdLFxuICAgIHdpZHRoOiAyLFxuICB9LFxuICByZWd1bGFyU2hhcGU6IHtcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgICAgIHdpZHRoOiAyLFxuICAgIH0sXG4gICAgcG9pbnRzOiA0LFxuICAgIHJhZGl1czogOCxcbiAgICByYWRpdXMyOiAwLFxuICAgIGFuZ2xlOiAwLFxuICB9LFxufTtcbm15TW9kdWxlLmNvbnN0YW50KCdnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGUsXG4gIGRlY2ltYWxzOiAyLFxuICBmb3JtYXQ6ICd7eH0sIHt5fScsXG4gIHJhc3RlckxheWVyczogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdhc3RlcicsXG4gICAgICB1bml0OiAnbScsXG4gICAgICBkZWNpbWFsczogMixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdzcnRtJyxcbiAgICAgIHVuaXQ6ICdtJyxcbiAgICB9LFxuICBdLFxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnMnLCB7XG4gIHNrZXRjaFN0eWxlOiBza2V0Y2hTdHlsZSxcbn0pO1xubXlNb2R1bGUuY29uc3RhbnQoJ2dtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9ucycsIHtcbiAgc2tldGNoU3R5bGU6IHNrZXRjaFN0eWxlLFxufSk7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWEnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBkZWRpY2F0ZWQgdG8gbWVhc3VyZSBBcmVhIG9uIG1vYmlsZSBkZXZpY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNsYXNzIE1lYXN1cmVBcmVhTW9iaWxlIGV4dGVuZHMgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEge1xuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9maWx0ZXJzJykudW5pdFByZWZpeH0gZm9ybWF0IFRoZSBmb3JtYXQgZnVuY3Rpb25cbiAgICogQHBhcmFtIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9IGdldHRleHRDYXRhbG9nIEdldHRleHQgY2F0YWxvZy5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZScpLk1lYXN1cmVPcHRpb25zfSBbb3B0aW9uc10gT3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7ZGlzcGxheUhlbHBUb29sdGlwOiBmYWxzZX0pO1xuICAgIHN1cGVyKGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9zdHlsZS9TdHlsZScpLlN0eWxlTGlrZX0gc3R5bGUgVGhlIHNrZXRjaFN0eWxlIHVzZWQgZm9yIHRoZSBkcmF3aW5nXG4gICAqICAgIGludGVyYWN0aW9uLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvc291cmNlL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL1BvbHlnb24nKS5kZWZhdWx0Pn0gc291cmNlIFZlY3RvciBzb3VyY2UuXG4gICAqIEByZXR1cm5zIHtuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3fSBUaGUgaW50ZXJhY3Rpb25cbiAgICovXG4gIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgY29uc3QgaW50ZXJhY3Rpb24gPSBuZXcgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyh7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgfSk7XG4gICAgaW50ZXJhY3Rpb24uc2V0KCduYW1lJywgJ1BvbHlnb25Nb2JpbGVEcmF3Jyk7XG4gICAgcmV0dXJuIGludGVyYWN0aW9uO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lYXN1cmVBcmVhTW9iaWxlO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGggZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdyc7XG5cbi8qKlxuICogSW50ZXJhY3Rpb24gZGVkaWNhdGVkIHRvIG1lYXN1cmUgbGVuZ3RoIG9uIG1vYmlsZSBkZXZpY2VzLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZmlsdGVycycpLnVuaXRQcmVmaXh9IGZvcm1hdCBUaGUgZm9ybWF0IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfSBnZXR0ZXh0Q2F0YWxvZyBHZXR0ZXh0IGNhdGFsb2cuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmUnKS5NZWFzdXJlT3B0aW9uc30gW29wdF9vcHRpb25zXSBPcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRfb3B0aW9ucykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBvcHRfb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gb3B0X29wdGlvbnMgOiB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywge2Rpc3BsYXlIZWxwVG9vbHRpcDogZmFsc2V9KTtcblxuICAgIHN1cGVyKGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9zdHlsZS9TdHlsZScpLlN0eWxlTGlrZX0gc3R5bGVcbiAgICogICAgIFRoZSBza2V0Y2hTdHlsZSB1c2VkIGZvciB0aGUgZHJhd2luZyBpbnRlcmFjdGlvbi5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9MaW5lU3RyaW5nJykuZGVmYXVsdD59IHNvdXJjZSBWZWN0b3Igc291cmNlLlxuICAgKiBAcmV0dXJucyB7bmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhd30gVGhlIGludGVyYWN0aW9uXG4gICAqL1xuICBjcmVhdGVEcmF3SW50ZXJhY3Rpb24oc3R5bGUsIHNvdXJjZSkge1xuICAgIGNvbnN0IGludGVyYWN0aW9uID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgc3R5bGU6IHN0eWxlLFxuICAgIH0pO1xuICAgIGludGVyYWN0aW9uLnNldCgnbmFtZScsICdMaW5lU3RyaW5nTW9iaWxlRHJhdycpO1xuICAgIHJldHVybiBpbnRlcmFjdGlvbjtcbiAgfVxufVxuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmUsIHtnZXRGb3JtYXR0ZWRQb2ludH0gZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdyc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5cbi8qKlxuICogSW50ZXJhY3Rpb24gZGVkaWNhdGVkIHRvIG1lYXN1cmUgYnkgY29vcmRpbmF0ZSAocG9pbnQpIG9uIG1vYmlsZSBkZXZpY2VzLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZmlsdGVycycpLm51bWJlckNvb3JkaW5hdGVzfSBmb3JtYXQgdGhlIG51bWJlciBmb3JtYXR0ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvb3JkRm9ybWF0IHRoZSBjb29yZGluYXRlcyBmb3JtYXR0ZXJcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZScpLk1lYXN1cmVPcHRpb25zfSBbb3B0aW9uc10gT3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoZm9ybWF0LCBjb29yZEZvcm1hdCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7ZGlzcGxheUhlbHBUb29sdGlwOiBmYWxzZX0pO1xuXG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL21pc2MvZmlsdGVycycpLm51bWJlckNvb3JkaW5hdGVzfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5mb3JtYXRfID0gZm9ybWF0O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuY29vcmRGb3JtYXRfID0gY29vcmRGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ29sL3N0eWxlL1N0eWxlJykuU3R5bGVMaWtlfSBzdHlsZSBUaGUgc2tldGNoU3R5bGUgdXNlZCBmb3IgdGhlIGRyYXdpbmdcbiAgICogICAgaW50ZXJhY3Rpb24uXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vUG9pbnQnKS5kZWZhdWx0Pn0gc291cmNlIFZlY3RvciBzb3VyY2UuXG4gICAqIEByZXR1cm5zIHtpbXBvcnQoJ29sL2ludGVyYWN0aW9uL0RyYXcnKS5kZWZhdWx0fGltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9EcmF3QXppbXV0JykuZGVmYXVsdHxcbiAgICogICAgaW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnKS5kZWZhdWx0fSBUaGUgaW50ZXJhY3Rpb25cbiAgICovXG4gIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBzdHlsZTogc3R5bGUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsID9pbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlKTogdm9pZH0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uXG4gICAqICAgICB0byBiZSBjYWxsZWQuXG4gICAqL1xuICBoYW5kbGVNZWFzdXJlKGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBza2V0Y2hGZWF0dXJlJyk7XG4gICAgfVxuICAgIGNvbnN0IGdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICBpZiAoIShnZW9tIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICB9XG4gICAgY29uc3QgZGVjID0gdGhpcy5kZWNpbWFscztcbiAgICBjb25zdCBvdXRwdXQgPSBnZXRGb3JtYXR0ZWRQb2ludChnZW9tLCBkZWMsIHRoaXMuZm9ybWF0XywgdGhpcy5jb29yZEZvcm1hdF8pO1xuICAgIGNvbnN0IGNvb3JkID0gZ2VvbS5nZXRMYXN0Q29vcmRpbmF0ZSgpO1xuICAgIGNhbGxiYWNrKG91dHB1dCwgY29vcmQpO1xuICB9XG59XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2dldERlZmF1bHREcmF3U3R5bGVGdW5jdGlvbn0gZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9jb21tb24nO1xuaW1wb3J0IG5nZW9DdXN0b21FdmVudCBmcm9tICduZ2VvL0N1c3RvbUV2ZW50JztcbmltcG9ydCB7bGlzdGVuLCB1bmxpc3RlbkJ5S2V5fSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCB7VFJVRX0gZnJvbSAnb2wvZnVuY3Rpb25zJztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xHZW9tUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xuaW1wb3J0IG9sR2VvbVNpbXBsZUdlb21ldHJ5IGZyb20gJ29sL2dlb20vU2ltcGxlR2VvbWV0cnknO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25JbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9JbnRlcmFjdGlvbic7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuXG4vKipcbiAqIE1vYmlsZURyYXcgSW50ZXJhY3Rpb24uXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gTW9iaWxlRHJhd09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbWluUG9pbnRzXSBUaGUgbnVtYmVyIG9mIHBvaW50cyB0aGF0IG11c3QgYmUgZHJhd24gYmVmb3JlIGEgcG9seWdvbiByaW5nIG9yIGxpbmVcbiAqIHN0cmluZyBjYW4gYmUgZmluaXNoZWQuIERlZmF1bHQgaXMgYDNgIGZvciBwb2x5Z29uIHJpbmdzIGFuZCBgMmAgZm9yIGxpbmUgc3RyaW5ncy5cbiAqIEBwcm9wZXJ0eSB7aW1wb3J0KCdvbC9zdHlsZS9TdHlsZScpLlN0eWxlTGlrZX0gW3N0eWxlXSBTdHlsZSBmb3Igc2tldGNoIGZlYXR1cmVzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR5cGUgRHJhd2luZyB0eXBlICgnUG9pbnQnIG9yICdMaW5lU3RyaW5nJy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3dyYXBYXSBXcmFwIHRoZSB3b3JsZCBob3Jpem9udGFsbHkgb24gdGhlIHNrZXRjaCBvdmVybGF5LiBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gKi9cblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBmb3IgZHJhd2luZyBmZWF0dXJlIGdlb21ldHJpZXMgZnJvbSBhIG1vYmlsZSBkZXZpY2UgdXNpbmcgdGhlXG4gKiBjZW50ZXIgb2YgdGhlIG1hcCB2aWV3IGFzIGVudHJ5IGZvciBwb2ludHMgYWRkZWQuXG4gKlxuICogU3VwcG9ydHM6XG4gKiAtIHBvaW50XG4gKiAtIGxpbmUgc3RyaW5nXG4gKiAtIHBvbHlnb25cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgb2xJbnRlcmFjdGlvbkludGVyYWN0aW9uIHtcbiAgLyoqXG4gICAqIEBmaXJlcyBEcmF3RXZlbnRcbiAgICogQHBhcmFtIHtNb2JpbGVEcmF3T3B0aW9uc30gb3B0aW9ucyBPcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaGFuZGxlRXZlbnQ6IFRSVUUsXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUga2V5IGZvciB2aWV3IGNlbnRlciBjaGFuZ2UgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvZXZlbnRzJykuRXZlbnRzS2V5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5jaGFuZ2VFdmVudEtleV8gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogR2VvbWV0cnkgdHlwZS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnR5cGVfID0gb3B0aW9ucy50eXBlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBwb2ludHMgdGhhdCBtdXN0IGJlIGRyYXduIGJlZm9yZSBhIHBvbHlnb24gcmluZyBvciBsaW5lXG4gICAgICogc3RyaW5nIGNhbiBiZSBmaW5pc2hlZC4gIFRoZSBkZWZhdWx0IGlzIDMgZm9yIHBvbHlnb24gcmluZ3MgYW5kIDIgZm9yXG4gICAgICogbGluZSBzdHJpbmdzLlxuICAgICAqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubWluUG9pbnRzXyA9IG9wdGlvbnMubWluUG9pbnRzID8gb3B0aW9ucy5taW5Qb2ludHMgOiB0aGlzLnR5cGVfID09PSAnUG9seWdvbicgPyAzIDogMjtcblxuICAgIC8qKlxuICAgICAqIFNrZXRjaCBmZWF0dXJlLlxuICAgICAqXG4gICAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFByZXZpb3VzIHNrZXRjaCBwb2ludHMsIHNhdmVkIHRvIGJlIGFibGUgdG8gZGlzcGxheSB0aGVtIG9uIHRoZSBsYXllci5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD5bXX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBza2V0Y2ggcG9pbnQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7P29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIERyYXcgb3ZlcmxheSB3aGVyZSBvdXIgc2tldGNoIGZlYXR1cmVzIGFyZSBkcmF3bi5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm92ZXJsYXlfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgY2xhc3NOYW1lOiAnY2FudmFzMmQnLFxuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICB1c2VTcGF0aWFsSW5kZXg6IGZhbHNlLFxuICAgICAgICB3cmFwWDogb3B0aW9ucy53cmFwWCA/IG9wdGlvbnMud3JhcFggOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgc3R5bGU6IG9wdGlvbnMuc3R5bGUgfHwgZ2V0RGVmYXVsdERyYXdTdHlsZUZ1bmN0aW9uKCksXG4gICAgICB1cGRhdGVXaGlsZUFuaW1hdGluZzogdHJ1ZSxcbiAgICAgIHVwZGF0ZVdoaWxlSW50ZXJhY3Rpbmc6IHRydWUsXG4gICAgfSk7XG5cbiAgICBsaXN0ZW4odGhpcywgJ2NoYW5nZTphY3RpdmUnLCB0aGlzLnVwZGF0ZVN0YXRlXywgdGhpcyk7XG5cbiAgICB0aGlzLnNldCgnZGlydHknLCBmYWxzZSk7XG4gICAgdGhpcy5zZXQoJ2RyYXdpbmcnLCBmYWxzZSk7XG4gICAgdGhpcy5zZXQoJ3ZhbGlkJywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fSBtYXAgTWFwLlxuICAgKi9cbiAgc2V0TWFwKG1hcCkge1xuICAgIGNvbnN0IGN1cnJlbnRNYXAgPSB0aGlzLmdldE1hcCgpO1xuICAgIGlmIChjdXJyZW50TWFwKSB7XG4gICAgICBpZiAodGhpcy5jaGFuZ2VFdmVudEtleV8pIHtcbiAgICAgICAgdW5saXN0ZW5CeUtleSh0aGlzLmNoYW5nZUV2ZW50S2V5Xyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb2xJbnRlcmFjdGlvbkludGVyYWN0aW9uLnByb3RvdHlwZS5zZXRNYXAuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgdGhpcy5jaGFuZ2VFdmVudEtleV8gPSBsaXN0ZW4obWFwLmdldFZpZXcoKSwgJ2NoYW5nZTpjZW50ZXInLCB0aGlzLmhhbmRsZVZpZXdDZW50ZXJDaGFuZ2VfLCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXRlXygpO1xuICB9XG5cbiAgLy8gPT09IFBVQkxJQyBNRVRIT0RTIC0gUFJPUEVSVFkgR0VUVEVSUyA9PT1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhlIGludGVyYWN0aW9uIGlzIGN1cnJlbnRseSBkaXJ0eS4gSXQgaXMgaWYgdGhlIHNrZXRjaFxuICAgKiBmZWF0dXJlIGhhcyBpdHMgZ2VvbWV0cnkgbGFzdCBjb29yZGluYXRlIHNldCB0byB0aGUgY2VudGVyIHdpdGhvdXQgdGhlXG4gICAqIHVzZSBvZiB0aGUgYGFkZFRvRHJhd2luZ2AgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmFjdGlvbiBpcyBkaXJ0eSwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqIEBvYnNlcnZhYmxlXG4gICAqL1xuICBnZXREaXJ0eSgpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHtib29sZWFufSAqLyAodGhpcy5nZXQoJ2RpcnR5JykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBpbnRlcmFjdGlvbiBpcyBjdXJyZW50bHkgZHJhd2luZy5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJhY3Rpb24gaXMgZHJhd2luZywgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqIEBvYnNlcnZhYmxlXG4gICAqL1xuICBnZXREcmF3aW5nKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUge2Jvb2xlYW59ICovICh0aGlzLmdldCgnZHJhd2luZycpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgaW50ZXJhY3Rpb24gYXMgYSB2YWxpZCBza2V0Y2ggZmVhdHVyZSwgaS5lLiBpdHMgZ2VvbWV0cnlcbiAgICogaXMgdmFsaWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGludGVyYWN0aW9uIGhhcyBhIHZhbGlkIHNrZXRjaCBmZWF0dXJlLFxuICAgKiAgICAgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqIEBvYnNlcnZhYmxlXG4gICAqL1xuICBnZXRWYWxpZCgpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHtib29sZWFufSAqLyAodGhpcy5nZXQoJ3ZhbGlkJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2tldGNoIGZlYXR1cmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSBUaGUgc2tldGNoIGZlYXR1cmUsIG9yIG51bGwgaWYgbm9uZS5cbiAgICovXG4gIGdldEZlYXR1cmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2tldGNoRmVhdHVyZV87XG4gIH1cblxuICAvLyA9PT0gUFVCTElDIE1FVEhPRFMgPT09XG5cbiAgLyoqXG4gICAqIEFkZCBjdXJyZW50IHNrZXRjaCBwb2ludCB0byBza2V0Y2ggZmVhdHVyZSBpZiB0aGUgbGF0dGVyIGV4aXN0cywgZWxzZSBjcmVhdGVcbiAgICogaXQuXG4gICAqL1xuICBhZGRUb0RyYXdpbmcoKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaFBvaW50Jyk7XG4gICAgfVxuXG4gICAgLy8gbm8gbmVlZCB0byBkbyBhbnl0aGluZyBpZiBpbnRlcmFjdGlvbiBpcyBub3QgYWN0aXZlLCBub3IgZHJhd2luZ1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgY29uc3QgZHJhd2luZyA9IHRoaXMuZ2V0RHJhd2luZygpO1xuXG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgc2tldGNoRmVhdHVyZUdlb207XG4gICAgY29uc3Qgc2tldGNoUG9pbnRHZW9tID0gdGhpcy5nZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBza2V0Y2hQb2ludEdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBudWxsO1xuXG4gICAgLy8gPT0gcG9pbnQgPT1cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKHtnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KGNvb3JkaW5hdGUpLCBuYW1lOiAnbW9iaWxlRHJhd1BvaW50J30pO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVffSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG4gICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vID09IGxpbmUgc3RyaW5nID09XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJykge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludHNfLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpXTtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tTGluZVN0cmluZyhjb29yZGluYXRlcyksXG4gICAgICAgICAgbmFtZTogJ21vYmlsZURyYXdMaW5lJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IG5nZW9DdXN0b21FdmVudCgnZHJhd3N0YXJ0Jywge2ZlYXR1cmU6IHRoaXMuc2tldGNoRmVhdHVyZV99KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21TaW1wbGVHZW9tZXRyeSkge1xuICAgICAgICAgIGNvb3JkaW5hdGVzID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUuc2xpY2UoKSk7XG4gICAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT0gcG9seWdvbiA9PVxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRzXy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpXTtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9seWdvbihbY29vcmRpbmF0ZXNdKSxcbiAgICAgICAgICBuYW1lOiAnRHJhd01vYmlsZVBvbHlnb24nLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlXyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzMiA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlczJbMF07XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlLnNsaWNlKCkpO1xuICAgICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzMik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaXJ0eSA9IHRoaXMuZ2V0RGlydHkoKTtcbiAgICBpZiAoZGlydHkpIHtcbiAgICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29vcmRpbmF0ZXMnKTtcbiAgICB9XG4gICAgLy8gbWluUG9pbnRzIHZhbGlkYXRpb25cbiAgICBjb25zdCB2YWxpZCA9IHRoaXMuZ2V0VmFsaWQoKTtcbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnIHx8IHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA+PSB0aGlzLm1pblBvaW50c18pIHtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgIHRoaXMuc2V0KCd2YWxpZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNldCBza2V0Y2ggcG9pbnRcbiAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG5cbiAgICAvLyB1cGRhdGUgc2tldGNoIGZlYXR1cmVzXG4gICAgdGhpcy51cGRhdGVTa2V0Y2hGZWF0dXJlc18oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZHJhd2luZ1xuICAgKi9cbiAgY2xlYXJEcmF3aW5nKCkge1xuICAgIHRoaXMuc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLnNldEFjdGl2ZSh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5pc2ggZHJhd2luZy4gSWYgdGhlcmUncyBhIHNrZXRjaCBwb2ludCwgaXQncyBhZGRlZCBmaXJzdC5cbiAgICovXG4gIGZpbmlzaERyYXdpbmcoKSB7XG4gICAgLy8gbm8gbmVlZCB0byBkbyBhbnl0aGluZyBpZiBpbnRlcmFjdGlvbiBpcyBub3QgYWN0aXZlLCBub3IgZHJhd2luZ1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgY29uc3QgZHJhd2luZyA9IHRoaXMuZ2V0RHJhd2luZygpO1xuXG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHRoaXMuYWRkVG9EcmF3aW5nKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ2RyYXdpbmcnLCBmYWxzZSk7XG5cbiAgICBjb25zdCBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdlbmQnLCB7ZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX30pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvLyA9PT0gUFJJVkFURSBNRVRIT0RTID09PVxuXG4gIC8qKlxuICAgKiBTdGFydCBkcmF3aW5nIGJ5IGFkZGluZyB0aGUgc2tldGNoIHBvaW50IGZpcnN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnREcmF3aW5nXygpIHtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIHRydWUpO1xuICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKTtcbiAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuXG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2ludCcpIHtcbiAgICAgIHRoaXMuYWRkVG9EcmF3aW5nKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmeSB0aGUgZ2VvbWV0cnkgb2YgdGhlIHNrZXRjaCBmZWF0dXJlIHRvIGhhdmUgaXRzIGxhc3QgY29vcmRpbmF0ZVxuICAgKiBzZXQgdG8gdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbW9kaWZ5RHJhd2luZ18oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICBjb25zdCBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29vcmRpbmF0ZXMucG9wKCk7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY2VudGVyKTtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlXyA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICBjb25zdCBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVBvbHlnb24pIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMyID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlczJbMF07XG4gICAgICAgIGNvb3JkaW5hdGVzLnBvcCgpO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNlbnRlcik7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKFtjb29yZGluYXRlc10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRpcnR5ID0gdGhpcy5nZXREaXJ0eSgpO1xuICAgIGlmICghZGlydHkpIHtcbiAgICAgIHRoaXMuc2V0KCdkaXJ0eScsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGRyYXdpbmcgd2l0aG91dCBhZGRpbmcgdGhlIHNrZXRjaCBmZWF0dXJlIHRvIHRoZSB0YXJnZXQgbGF5ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHs/b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSBUaGUgc2tldGNoIGZlYXR1cmUgKG9yIG51bGwgaWYgbm9uZSkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhYm9ydERyYXdpbmdfKCkge1xuICAgIGNvbnN0IHNrZXRjaEZlYXR1cmUgPSB0aGlzLnNrZXRjaEZlYXR1cmVfO1xuICAgIGlmIChza2V0Y2hGZWF0dXJlIHx8IHRoaXMuc2tldGNoUG9pbnRzXy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbnVsbDtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcbiAgICAgIC8qKiBAdHlwZSB7b2xTb3VyY2VWZWN0b3I8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59ICovICh0aGlzLm92ZXJsYXlfLmdldFNvdXJjZSgpKS5jbGVhcihcbiAgICAgICAgdHJ1ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHNrZXRjaEZlYXR1cmU7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHVwZGF0ZVN0YXRlXygpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLmdldE1hcCgpO1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgaWYgKCFtYXAgfHwgIWFjdGl2ZSkge1xuICAgICAgdGhpcy5hYm9ydERyYXdpbmdfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnREcmF3aW5nXygpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXlfLnNldE1hcChhY3RpdmUgPyBtYXAgOiBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fGltcG9ydCgnb2wvZXZlbnRzL0V2ZW50JykuZGVmYXVsdH0gZXZ0IEV2ZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlVmlld0NlbnRlckNoYW5nZV8oZXZ0KSB7XG4gICAgLy8gbm8gbmVlZCB0byBkbyBhbnl0aGluZyBpZiBpbnRlcmFjdGlvbiBpcyBub3QgYWN0aXZlLCBub3IgZHJhd2luZ1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgY29uc3QgZHJhd2luZyA9IHRoaXMuZ2V0RHJhd2luZygpO1xuXG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RpZnlEcmF3aW5nXygpO1xuICAgICAgdGhpcy51cGRhdGVTa2V0Y2hGZWF0dXJlc18oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfKCkge1xuICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyXygpO1xuXG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8oKTtcbiAgICAgIGdlb21ldHJ5LnNldENvb3JkaW5hdGVzKGNlbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbmV3IG9sRmVhdHVyZSh7Z2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludChjZW50ZXIpLCBuYW1lOiAnbW9iaWxlRHJhd1BvaW50J30pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXcgdGhlIHNrZXRjaCBmZWF0dXJlcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpIHtcbiAgICBjb25zdCBza2V0Y2hGZWF0dXJlcyA9IFtdO1xuICAgIGlmICh0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICBza2V0Y2hGZWF0dXJlcy5wdXNoKHRoaXMuc2tldGNoRmVhdHVyZV8pO1xuICAgIH1cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHNrZXRjaEZlYXR1cmVzLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuICAgIH1cbiAgICBjb25zdCBvdmVybGF5U291cmNlID0gLyoqIEB0eXBlIHtvbFNvdXJjZVZlY3RvcjxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gKi8gKFxuICAgICAgdGhpcy5vdmVybGF5Xy5nZXRTb3VyY2UoKVxuICAgICk7XG4gICAgb3ZlcmxheVNvdXJjZS5jbGVhcih0cnVlKTtcbiAgICBvdmVybGF5U291cmNlLmFkZEZlYXR1cmVzKHNrZXRjaEZlYXR1cmVzKTtcbiAgICBvdmVybGF5U291cmNlLmFkZEZlYXR1cmVzKHRoaXMuc2tldGNoUG9pbnRzXyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2VvbWV0cnkgb2YgdGhlIHNrZXRjaCBwb2ludCBmZWF0dXJlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7aW1wb3J0KCdvbC9nZW9tL1BvaW50JykuZGVmYXVsdH0gUG9pbnQuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2tldGNoUG9pbnQnKTtcbiAgICB9XG4gICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLnNrZXRjaFBvaW50Xy5nZXRHZW9tZXRyeSgpO1xuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSB7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZ2VvbWV0cnkgdHlwZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjZW50ZXIgb2YgdGhlIG1hcCB2aWV3XG4gICAqXG4gICAqIEByZXR1cm5zIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBDb29yZGluYXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0Q2VudGVyXygpIHtcbiAgICBjb25zdCBjZW50ZXIgPSB0aGlzLmdldE1hcCgpLmdldFZpZXcoKS5nZXRDZW50ZXIoKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgIH1cbiAgICByZXR1cm4gY2VudGVyO1xuICB9XG59XG4iLCJtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC4kaW5qZWN0ID0gWydnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhTW9iaWxlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWFNb2JpbGUnO1xuaW1wb3J0IHtNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcn0gZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IHtidWlsZFN0eWxlfSBmcm9tICduZ2VvL29wdGlvbnMnO1xuaW1wb3J0IGh0bWxUZW1wbGF0ZSBmcm9tICcuL2Jhc2VDb21wb25lbnQuaHRtbCc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUFyZWEnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gZWxlbWVudCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9IGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0ZW1wbGF0ZSB1cmwuXG4gICAqL1xuICAoZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGV1cmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvbWVhc3VyZS9hcmVhQ29tcG9uZW50JztcbiAgfSxcbik7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL2FyZWFDb21wb25lbnQnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xuXG4vKipcbiAqIFByb3ZpZGUgYSBkaXJlY3RpdmUgdG8gZG8gYSBhcmVhIG1lYXN1cmUgb24gdGhlIG1vYmlsZSBkZXZpY2VzLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICA8ZGl2IGdtZi1tb2JpbGUtbWVhc3VyZWFyZWFcbiAqICAgICAgICBnbWYtbW9iaWxlLW1lYXN1cmVhcmVhLWFjdGl2ZT1cImN0cmwubWVhc3VyZUFyZWFBY3RpdmVcIlxuICogICAgICAgIGdtZi1tb2JpbGUtbWVhc3VyZWFyZWEtbWFwPVwiOjpjdHJsLm1hcFwiPlxuICogICAgICA8L2Rpdj5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gZ21mLW1vYmlsZS1tZWFzdXJlYXJlYS1hY3RpdmUgVXNlZCB0byBhY3RpdmVcbiAqIG9yIGRlYWN0aXZhdGUgdGhlIGNvbXBvbmVudC5cbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IGdtZi1tb2JpbGUtbWVhc3VyZWFyZWEtbWFwIFRoZSBtYXAuXG4gKiBAcGFyYW0ge3N0cmluZ3xmdW5jdGlvbihKUXVlcnk9LCBhbmd1bGFyLklBdHRyaWJ1dGVzPSk6c3RyaW5nfSBnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsXG4gKiAgICAgVGVtcGxhdGUgVVJMIGZvciB0aGUgZGlyZWN0aXZlLlxuICogQHJldHVybnMge2FuZ3VsYXIuSURpcmVjdGl2ZX0gVGhlIERpcmVjdGl2ZSBEZWZpbml0aW9uIE9iamVjdC5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgZ21mTW9iaWxlTWVhc3VyZUFyZWFcbiAqL1xuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdhY3RpdmUnOiAnPWdtZk1vYmlsZU1lYXN1cmVhcmVhQWN0aXZlJyxcbiAgICAgICdtYXAnOiAnPWdtZk1vYmlsZU1lYXN1cmVhcmVhTWFwJyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdHbWZNb2JpbGVNZWFzdXJlQXJlYUNvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCxcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSBzY29wZSBTY29wZS5cbiAgICAgKiBAcGFyYW0ge0pRdWVyeX0gZWxlbWVudCBFbGVtZW50LlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gYXR0cnMgQXR0cmlidXRlcy5cbiAgICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUNvbnRyb2xsZXJ9IFtjb250cm9sbGVyXSBDb250cm9sbGVyLlxuICAgICAqL1xuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29udHJvbGxlcicpO1xuICAgICAgfVxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfSxcbiAgfTtcbn1cbm15TW9kdWxlLmRpcmVjdGl2ZSgnZ21mTW9iaWxlTWVhc3VyZWFyZWEnLCBtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudCk7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUZpbHRlclNlcnZpY2V9ICRmaWx0ZXIgQW5ndWxhciBmaWx0ZXJcbiAgICogQHBhcmFtIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9IGdldHRleHRDYXRhbG9nIEdldHRleHQgY2F0YWxvZy5cbiAgICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zfSBnbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nLCBnbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnMpIHtcbiAgICBzdXBlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nKTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7aW1wb3J0KCdnbWYvb3B0aW9ucycpLmdtZk1vYmlsZU1lYXN1cmVBcmVhT3B0aW9uc31cbiAgICAgKi9cbiAgICB0aGlzLm9wdGlvbnMgPSBnbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZScpLmRlZmF1bHR9XG4gICAgICovXG4gICAgdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBjb250cm9sbGVyLlxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWFNb2JpbGUodGhpcy5maWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIHRoaXMuZ2V0dGV4dENhdGFsb2csIHtcbiAgICAgIHByZWNpc2lvbjogdGhpcy5vcHRpb25zLnByZWNpc2lvbiB8fCAyLFxuICAgICAgc2tldGNoU3R5bGU6IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNrZXRjaFN0eWxlKSxcbiAgICB9KTtcbiAgICBzdXBlci5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGN1cnJlbnQgc2tldGNoIHBvaW50IHRvIGxpbmUgbWVhc3VyZVxuICAgKi9cbiAgYWRkUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5hZGRUb0RyYXdpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgc2tldGNoIGZlYXR1cmVcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoIGxpbmUgbWVhc3VyZVxuICAgKi9cbiAgZmluaXNoKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uZmluaXNoRHJhd2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGUgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGZpbHRlcicsICdnZXR0ZXh0Q2F0YWxvZycsICdnbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnMnXTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVBcmVhQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGRlZmF1bHQgYDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgKCFjdHJsLnZhbGlkKVwiIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L3NwYW4+XG4gIHt7J1NldCBhcyBzdGFydGluZyBwb2ludCcgfCB0cmFuc2xhdGV9fVxuPC9hPlxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwuZGlydHlcIiBuZy1jbGljaz1cImN0cmwuYWRkUG9pbnQoKVwiPlxuICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L3NwYW4+XG4gIHt7J0FkZCBuZXcgcG9pbnQnIHwgdHJhbnNsYXRlfX1cbjwvYT5cbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgY3RybC52YWxpZCAmJiAhY3RybC5kaXJ0eVwiIG5nLWNsaWNrPVwiY3RybC5maW5pc2goKVwiPlxuICA8c3BhbiBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9zcGFuPlxuICB7eydUZXJtaW5hdGUnIHwgdHJhbnNsYXRlfX1cbjwvYT5cbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLnZhbGlkXCIgbmctY2xpY2s9XCJjdHJsLmNsZWFyKClcIj5cbiAgPHNwYW4gY2xhc3M9XCJmYS1zb2xpZCBmYS1yZXBlYXRcIj48L3NwYW4+XG4gIHt7J0NsZWFyJyB8IHRyYW5zbGF0ZX19XG48L2E+XG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWlmPVwiY3RybC5hY3RpdmVcIiBuZy1jbGljaz1cImN0cmwuZGVhY3RpdmF0ZSgpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L3NwYW4+XG4gIHt7J0Nsb3NlJyB8IHRyYW5zbGF0ZX19XG48L2E+YDtcbiIsIk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZmlsdGVyJywgJ2dldHRleHRDYXRhbG9nJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7aW50ZXJhY3Rpb25EZWNvcmF0aW9ufSBmcm9tICduZ2VvL21pc2MvZGVjb3JhdGUnO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQge2xpc3Rlbn0gZnJvbSAnb2wvZXZlbnRzJztcbmltcG9ydCBNb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUJhc2UnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcblxuLyoqXG4gKiBCYXNlIGNvbnRyb2xsZXIgY2xhc3MgZm9yIExlbmd0aCBhbmQgQXJlYSBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBBbmd1bGFyIHNjb3BlLlxuICogQHBhcmFtIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfSAkZmlsdGVyIEFuZ3VsYXIgZmlsdGVyXG4gKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICogQGNsYXNzXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBHbWZNb2JpbGVNZWFzdXJlQmFzZUNvbnRyb2xsZXJcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICovXG4gIHRoaXMuc2NvcGUgPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5maWx0ZXIgPSAkZmlsdGVyO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfVxuICAgKi9cbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZyA9IGdldHRleHRDYXRhbG9nO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLnNjb3BlLiR3YXRjaChcbiAgICAoKSA9PiB0aGlzLmFjdGl2ZSxcbiAgICAobmV3VmFsKSA9PiB7XG4gICAgICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuICAgIH0sXG4gICk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmUnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdycpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMudmFsaWQgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBjb250cm9sbGVyLlxuICovXG5NZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gIH1cbiAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZSh0aGlzLmFjdGl2ZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLm1lYXN1cmUpO1xuICBjb25zdCBkcmF3SW50ZXJhY3Rpb24gPSB0aGlzLm1lYXN1cmUuZ2V0RHJhd0ludGVyYWN0aW9uKCk7XG4gIGlmICghKGRyYXdJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE1vYmlsZURyYXcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgfVxuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IGRyYXdJbnRlcmFjdGlvbjtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKGRyYXdJbnRlcmFjdGlvbik7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaGFzUG9pbnRzJywge1xuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYXdJbnRlcmFjdGlvbi5nZXRGZWF0dXJlKCkgIT09IG51bGw7XG4gICAgfSxcbiAgfSk7XG4gIGxpc3RlbihcbiAgICBkcmF3SW50ZXJhY3Rpb24sXG4gICAgJ2NoYW5nZTpkaXJ0eScsXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2V2ZW50cycpLkxpc3RlbmVyRnVuY3Rpb259ICovXG4gICAgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5kaXJ0eSA9IGRyYXdJbnRlcmFjdGlvbi5nZXREaXJ0eSgpO1xuXG4gICAgICAvLyB0aGlzIGlzIHdoZXJlIHRoZSBhbmd1bGFyIHNjb3BlIGlzIGZvcmNlZCB0byBiZSBhcHBsaWVkLiBXZVxuICAgICAgLy8gb25seSBuZWVkIHRvIGRvIHRoaXMgd2hlbiBkaXJ0eSwgYXMgZ29pbmcgdG8gXCJubyBiZWluZyBkaXJ0eVwiXG4gICAgICAvLyBpcyBtYWRlIGJ5IGEgY2xpY2sgb24gYSBidXR0b24gd2hlcmUgQW5ndWxhciBpcyB3aXRoaW4gc2NvcGVcbiAgICAgIGlmICh0aGlzLmRpcnR5KSB7XG4gICAgICAgIHRoaXMuc2NvcGUuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0aGlzLFxuICApO1xuICBsaXN0ZW4oXG4gICAgZHJhd0ludGVyYWN0aW9uLFxuICAgICdjaGFuZ2U6ZHJhd2luZycsXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2V2ZW50cycpLkxpc3RlbmVyRnVuY3Rpb259ICovXG4gICAgKGV2dCkgPT4ge1xuICAgICAgdGhpcy5kcmF3aW5nID0gZHJhd0ludGVyYWN0aW9uLmdldERyYXdpbmcoKTtcbiAgICB9LFxuICAgIHRoaXMsXG4gICk7XG4gIGxpc3RlbihcbiAgICBkcmF3SW50ZXJhY3Rpb24sXG4gICAgJ2NoYW5nZTp2YWxpZCcsXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2V2ZW50cycpLkxpc3RlbmVyRnVuY3Rpb259ICovXG4gICAgKGV2dCkgPT4ge1xuICAgICAgdGhpcy52YWxpZCA9IGRyYXdJbnRlcmFjdGlvbi5nZXRWYWxpZCgpO1xuICAgIH0sXG4gICAgdGhpcyxcbiAgKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlKTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdnbWZNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcicsIE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwibW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50LiRpbmplY3QgPSBbJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCddO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoTW9iaWxlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aE1vYmlsZSc7XG5pbXBvcnQge01lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyfSBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudCc7XG5pbXBvcnQge2J1aWxkU3R5bGV9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vYmFzZUNvbXBvbmVudC5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoJywgW25nZW9NaXNjRmlsdGVycy5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZShcbiAgJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gZWxlbWVudCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9IGF0dHJzIEF0dHJpYnV0ZXMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0ZW1wbGF0ZSB1cmwuXG4gICAqL1xuICAoZWxlbWVudCwgYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZXVybDtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL2xlbmd0aENvbXBvbmVudCc7XG4gIH0sXG4pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xuXG4vKipcbiAqIFByb3ZpZGUgYSBkaXJlY3RpdmUgdG8gZG8gYSBsZW5ndGggbWVhc3VyZSBvbiB0aGUgbW9iaWxlIGRldmljZXMuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIDxkaXYgZ21mLW1vYmlsZS1tZWFzdXJlbGVuZ3RoXG4gKiAgICAgICAgZ21mLW1vYmlsZS1tZWFzdXJlbGVuZ3RoLWFjdGl2ZT1cImN0cmwubWVhc3VyZUxlbmd0aEFjdGl2ZVwiXG4gKiAgICAgICAgZ21mLW1vYmlsZS1tZWFzdXJlbGVuZ3RoLW1hcD1cIjo6Y3RybC5tYXBcIj5cbiAqICAgICAgPC9kaXY+XG4gKlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IGdtZi1tb2JpbGUtbWVhc3VyZWxlbmd0aC1hY3RpdmUgVXNlZCB0byBhY3RpdmVcbiAqIG9yIGRlYWN0aXZhdGUgdGhlIGNvbXBvbmVudC5cbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IGdtZi1tb2JpbGUtbWVhc3VyZWxlbmd0aC1tYXAgVGhlIG1hcC5cbiAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9uKEpRdWVyeT0sIGFuZ3VsYXIuSUF0dHJpYnV0ZXM9KTpzdHJpbmd9IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybFxuICogICAgIFRlbXBsYXRlIFVSTCBmb3IgdGhlIGRpcmVjdGl2ZS5cbiAqIEByZXR1cm5zIHthbmd1bGFyLklEaXJlY3RpdmV9IFRoZSBEaXJlY3RpdmUgRGVmaW5pdGlvbiBPYmplY3QuXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmduYW1lIGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhcbiAqL1xuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50KGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdhY3RpdmUnOiAnPWdtZk1vYmlsZU1lYXN1cmVsZW5ndGhBY3RpdmUnLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZWxlbmd0aE1hcCcsXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnR21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsLFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9IHNjb3BlIFNjb3BlLlxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSBhdHRycyBBdHRyaWJ1dGVzLlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JQ29udHJvbGxlcn0gW2NvbnRyb2xsZXJdIENvbnRyb2xsZXIuXG4gICAgICovXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9LFxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlbGVuZ3RoJywgbW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JRmlsdGVyU2VydmljZX0gJGZpbHRlciBBbmd1bGFyIGZpbHRlclxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnZ21mL29wdGlvbnMnKS5nbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9uc30gZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucykge1xuICAgIHN1cGVyKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnN9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoTW9iaWxlJykuZGVmYXVsdH1cbiAgICAgKi9cbiAgICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGNvbnRyb2xsZXIuXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoTW9iaWxlKFxuICAgICAgdGhpcy5maWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksXG4gICAgICB0aGlzLmdldHRleHRDYXRhbG9nLFxuICAgICAge1xuICAgICAgICBwcmVjaXNpb246IHRoaXMub3B0aW9ucy5wcmVjaXNpb24gfHwgMyxcbiAgICAgICAgc2tldGNoU3R5bGU6IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNrZXRjaFN0eWxlKSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBzdXBlci5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGN1cnJlbnQgc2tldGNoIHBvaW50IHRvIGxpbmUgbWVhc3VyZVxuICAgKi9cbiAgYWRkUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5hZGRUb0RyYXdpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgc2tldGNoIGZlYXR1cmVcbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogRmluaXNoIGxpbmUgbWVhc3VyZVxuICAgKi9cbiAgZmluaXNoKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uZmluaXNoRHJhd2luZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlYWN0aXZhdGUgdGhlIGRpcmVjdGl2ZS5cbiAgICovXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGZpbHRlcicsICdnZXR0ZXh0Q2F0YWxvZycsICdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucyddO1xubXlNb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBkZWZhdWx0IGA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWlmPVwiY3RybC5hY3RpdmVcIiBuZy1jbGljaz1cImN0cmwuZGVhY3RpdmF0ZSgpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L3NwYW4+XG4gIHt7J0Nsb3NlJyB8IHRyYW5zbGF0ZX19XG48L2E+YDtcbiIsIk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIuJGluamVjdCA9IFtcbiAgJ2dldHRleHRDYXRhbG9nJyxcbiAgJyRzY29wZScsXG4gICckZmlsdGVyJyxcbiAgJ2dtZlJhc3RlcicsXG4gICduZ2VvRGVib3VuY2UnLFxuICAnZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9ucycsXG5dO1xubW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50LiRpbmplY3QgPSBbJ2dtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTYtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZSYXN0ZXJSYXN0ZXJTZXJ2aWNlIGZyb20gJ2dtZi9yYXN0ZXIvUmFzdGVyU2VydmljZSc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZVBvaW50TW9iaWxlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZVBvaW50TW9iaWxlJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQge2ludGVyYWN0aW9uRGVjb3JhdGlvbn0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlJztcbmltcG9ydCB7bGlzdGVuLCB1bmxpc3RlbkJ5S2V5fSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IE1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcbmltcG9ydCB7YnVpbGRTdHlsZX0gZnJvbSAnbmdlby9vcHRpb25zJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9wb2ludENvbXBvbmVudC5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlUG9pbnQnLCBbXG4gIGdtZlJhc3RlclJhc3RlclNlcnZpY2UubmFtZSxcbiAgbmdlb01pc2NEZWJvdW5jZS5uYW1lLFxuXSk7XG5teU1vZHVsZS52YWx1ZShcbiAgJ2dtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsJyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JQXR0cmlidXRlc30gYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gIChlbGVtZW50LCBhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gYXR0cnMuZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGV1cmw7XG4gICAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvbWVhc3VyZS9wb2ludENvbXBvbmVudCc7XG4gIH0sXG4pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvbWVhc3VyZS9wb2ludENvbXBvbmVudCcsIGh0bWxUZW1wbGF0ZSk7XG4gICAgfSxcbiAgXSxcbik7XG5cbi8qKlxuICogUHJvdmlkZSBhIGRpcmVjdGl2ZSB0byBkbyBhIHBvaW50IChjb29yZGluYXRlIGFuZCBlbGV2YXRpb24pIG1lYXN1cmUgb24gdGhlXG4gKiBtb2JpbGUgZGV2aWNlcy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgPGRpdiBnbWYtbW9iaWxlLW1lYXN1cmVwb2ludFxuICogICAgICAgIGdtZi1tb2JpbGUtbWVhc3VyZXBvaW50LWFjdGl2ZT1cImN0cmwubWVhc3VyZVBvaW50QWN0aXZlXCJcbiAqICAgICAgICBnbWYtbW9iaWxlLW1lYXN1cmVwb2ludC1tYXA9XCI6OmN0cmwubWFwXCI+XG4gKiAgICAgIDwvZGl2PlxuICpcbiAqIFdoZXJlIGN0cmwubWVhc3VyZVBvaW50TGF5ZXJzIGlzIGFuIG9iamVjdCBsaWtlIHRoaXM6XG4gKlxuICogICAgICB0aGlzLm1lYXN1cmVQb2ludExheWVycyA9IFtcbiAqICAgICAgICB7bmFtZTogJ3NydG0nLCB1bml0OiAnbScsIGRlY2ltYWxzOiAyfSxcbiAqICAgICAgICB7bmFtZTogJ3dpbmQnLCB7dW5pdDogJ2ttL2gnfSxcbiAqICAgICAgICB7bmFtZTogJ2h1bWlkaXR5J31cbiAqICAgICAgXTtcbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gZ21mLW1vYmlsZS1tZWFzdXJlcG9pbnQtYWN0aXZlIFVzZWQgdG8gYWN0aXZlXG4gKiBvciBkZWFjdGl2YXRlIHRoZSBjb21wb25lbnQuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fSBnbWYtbW9iaWxlLW1lYXN1cmVwb2ludC1tYXAgVGhlIG1hcC5cbiAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9uKEpRdWVyeT0sIGFuZ3VsYXIuSUF0dHJpYnV0ZXM9KTogc3RyaW5nfSBnbWZNb2JpbGVNZWFzdXJlUG9pbnRUZW1wbGF0ZVVybFxuICogICAgIFRlbXBsYXRlIFVSTCBmb3IgdGhlIGRpcmVjdGl2ZS5cbiAqIEByZXR1cm5zIHthbmd1bGFyLklEaXJlY3RpdmV9IFRoZSBEaXJlY3RpdmUgRGVmaW5pdGlvbiBPYmplY3QuXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmduYW1lIGdtZk1vYmlsZU1lYXN1cmVQb2ludFxuICovXG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnYWN0aXZlJzogJz1nbWZNb2JpbGVNZWFzdXJlcG9pbnRBY3RpdmUnLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZXBvaW50TWFwJyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsLFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9IHNjb3BlIFNjb3BlLlxuICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSBlbGVtZW50IEVsZW1lbnQuXG4gICAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSBhdHRycyBBdHRyaWJ1dGVzLlxuICAgICAqIEBwYXJhbSB7YW5ndWxhci5JQ29udHJvbGxlcn0gW2NvbnRyb2xsZXJdIENvbnRyb2xsZXIuXG4gICAgICovXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikgPT4ge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9LFxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlcG9pbnQnLCBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfSBnZXR0ZXh0Q2F0YWxvZyBHZXR0ZXh0IGNhdGFsb2cuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JRmlsdGVyU2VydmljZX0gJGZpbHRlciBBbmd1bGFyIGZpbHRlciBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9yYXN0ZXIvUmFzdGVyU2VydmljZScpLlJhc3RlclNlcnZpY2V9IGdtZlJhc3RlciBnbWYgUmFzdGVyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9taXNjL2RlYm91bmNlJykubWlzY0RlYm91bmNlPGZ1bmN0aW9uKCk6IHZvaWQ+fSBuZ2VvRGVib3VuY2UgbmdlbyBEZWJvdW5jZSBmYWN0b3J5LlxuICogQHBhcmFtIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9uc30gZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEBjbGFzc1xuICogQGhpZGRlblxuICogQG5nZG9jIGNvbnRyb2xsZXJcbiAqIEBuZ25hbWUgR21mTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlclxuICovXG5leHBvcnQgZnVuY3Rpb24gTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcihcbiAgZ2V0dGV4dENhdGFsb2csXG4gICRzY29wZSxcbiAgJGZpbHRlcixcbiAgZ21mUmFzdGVyLFxuICBuZ2VvRGVib3VuY2UsXG4gIGdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnMsXG4pIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9vcHRpb25zJykuZ21mTW9iaWxlTWVhc3VyZVBvaW50T3B0aW9uc31cbiAgICovXG4gIHRoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnM7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ2dtZi9yYXN0ZXIvUmFzdGVyU2VydmljZScpLlJhc3RlclNlcnZpY2V9XG4gICAqL1xuICB0aGlzLmdtZlJhc3Rlcl8gPSBnbWZSYXN0ZXI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbigpOiB2b2lkPn1cbiAgICovXG4gIHRoaXMubmdlb0RlYm91bmNlXyA9IG5nZW9EZWJvdW5jZTtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ31cbiAgICovXG4gIHRoaXMuZ2V0dGV4dENhdGFsb2dfID0gZ2V0dGV4dENhdGFsb2c7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy4kZmlsdGVyXyA9ICRmaWx0ZXI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICRzY29wZS4kd2F0Y2goXG4gICAgKCkgPT4gdGhpcy5hY3RpdmUsXG4gICAgKG5ld1ZhbCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1lYXN1cmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWVhc3VyZS5zZXRBY3RpdmUobmV3VmFsKTtcbiAgICAgIHRoaXMuaGFuZGxlTWVhc3VyZUFjdGl2ZUNoYW5nZV8oKTtcbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlUG9pbnRNb2JpbGUnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdycpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBrZXkgZm9yIG1hcCB2aWV3ICdwcm9wZXJ0eWNoYW5nZScgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9ldmVudHMnKS5FdmVudHNLZXl9XG4gICAqL1xuICB0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5XyA9IG51bGw7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgY29udHJvbGxlci5cbiAqL1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZShcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnbmdlby9taXNjL2ZpbHRlcnMnKS5udW1iZXJDb29yZGluYXRlc30gKi8gdGhpcy4kZmlsdGVyXygnbmdlb051bWJlckNvb3JkaW5hdGVzJyksXG4gICAgdGhpcy5vcHRpb25zLmZvcm1hdCxcbiAgICB7XG4gICAgICBkZWNpbWFsczogdGhpcy5vcHRpb25zLmRlY2ltYWxzLFxuICAgICAgc2tldGNoU3R5bGU6IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNrZXRjaFN0eWxlKSxcbiAgICB9LFxuICApO1xuICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZSk7XG4gIGNvbnN0IGRyYXdJbnRlcmFjdGlvbiA9IHRoaXMubWVhc3VyZS5nZXREcmF3SW50ZXJhY3Rpb24oKTtcbiAgaWYgKCEoZHJhd0ludGVyYWN0aW9uIGluc3RhbmNlb2YgTW9iaWxlRHJhdykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGRyYXdJbnRlcmFjdGlvbicpO1xuICB9XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5kcmF3SW50ZXJhY3Rpb24pO1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZSk7XG59O1xuXG4vKipcbiAqIERlYWN0aXZhdGUgdGhlIGRpcmVjdGl2ZS5cbiAqL1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gdHJhbnNsYXRlLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHRyYW5zbGF0ZWQgdGV4dC5cbiAqL1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gdGhpcy5nZXR0ZXh0Q2F0YWxvZ18uZ2V0U3RyaW5nKHN0cik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIHRoZSBtZWFzdXJlIGJlY29tZXMgYWN0aXZlIG9yIGluYWN0aXZlLiBBY3QgYWNjb3JkaW5nbHk6XG4gKiAtIG9uIGFjdGl2YXRlLCBsaXN0ZW4gdG8gdGhlIG1hcCBwcm9wZXJ0eSBjaGFuZ2VzIHRvIGNhbGwgZm9yIHRoZSBlbGV2YXRpb25cbiAqICAgc2VydmljZS5cbiAqIC0gb24gZGVhY3RpdmF0ZSwgdW5saXN0ZW5cbiAqXG4gKiBAaGlkZGVuXG4gKi9cbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZU1lYXN1cmVBY3RpdmVDaGFuZ2VfID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgfVxuICBpZiAodGhpcy5tZWFzdXJlLmdldEFjdGl2ZSgpKSB7XG4gICAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5XyA9IGxpc3RlbihcbiAgICAgIHZpZXcsXG4gICAgICAncHJvcGVydHljaGFuZ2UnLFxuICAgICAgdGhpcy5uZ2VvRGVib3VuY2VfKHRoaXMuZ2V0TWVhc3VyZV8uYmluZCh0aGlzKSwgMzAwLCAvKiBpbnZva2VBcHBseSAqLyB0cnVlKSxcbiAgICAgIHRoaXMsXG4gICAgKTtcbiAgICB0aGlzLmdldE1lYXN1cmVfKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8pIHtcbiAgICB1bmxpc3RlbkJ5S2V5KHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfKTtcbiAgICB0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5XyA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbCB0aGUgZWxldmF0aW9uIHNlcnZpY2UgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBtZWFzdXJlIGF0XG4gKiB0aGUgY3VycmVudCBtYXAgY2VudGVyIGxvY2F0aW9uLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVhc3VyZV8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgY29uc3QgY2VudGVyID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY2VudGVyJyk7XG4gIH1cbiAgaWYgKCF0aGlzLm9wdGlvbnMucmFzdGVyTGF5ZXJzIHx8IHRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAnbGF5ZXJzJzogdGhpcy5vcHRpb25zLnJhc3RlckxheWVycy5tYXAoKGNvbmZpZykgPT4gY29uZmlnLm5hbWUpLmpvaW4oJywnKSxcbiAgfTtcbiAgdGhpcy5nbWZSYXN0ZXJfLmdldFJhc3RlcihjZW50ZXIsIHBhcmFtcykudGhlbigob2JqZWN0KSA9PiB7XG4gICAgaWYgKCF0aGlzLm1lYXN1cmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gICAgfVxuICAgIGNvbnN0IGVsID0gdGhpcy5tZWFzdXJlLmdldFRvb2x0aXBFbGVtZW50KCk7XG4gICAgY29uc3QgY3RuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gJ2dtZi1tb2JpbGUtbWVhc3VyZS1wb2ludCc7XG4gICAgY3RuLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBmb3IgKGNvbnN0IGNvbmZpZyBvZiB0aGlzLm9wdGlvbnMucmFzdGVyTGF5ZXJzKSB7XG4gICAgICBjb25zdCBrZXkgPSBjb25maWcubmFtZTtcbiAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bWJlcn0gKi9cbiAgICAgICAgbGV0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICAgIGNvbnN0IGNoaWxkRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2hpbGRFbC5jbGFzc05hbWUgPSBgZ21mLW1vYmlsZS1tZWFzdXJlLXBvaW50LSR7a2V5fWA7XG4gICAgICAgIGNvbnN0IHVuaXQgPSBjb25maWcudW5pdCB8fCAnJztcbiAgICAgICAgY29uc3QgZGVjaW1hbHMgPSBjb25maWcuZGVjaW1hbHMgPiAwID8gY29uZmlnLmRlY2ltYWxzIDogMDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLiRmaWx0ZXJfKCdudW1iZXInKSh2YWx1ZSwgZGVjaW1hbHMpO1xuICAgICAgICBjaGlsZEVsLmlubmVySFRNTCA9IFt0aGlzLnRyYW5zbGF0ZShrZXkpLCAnOiAnLCB2YWx1ZSwgJyAnLCB1bml0XS5qb2luKCcnKTtcbiAgICAgICAgY3RuLmFwcGVuZENoaWxkKGNoaWxkRWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBwcmV2aW91c0N0biA9IGVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICBpZiAocHJldmlvdXNDdG5bMF0pIHtcbiAgICAgIHByZXZpb3VzQ3RuWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgICBlbC5hcHBlbmRDaGlsZChjdG4pO1xuICB9KTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyJywgTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiY29uc3QgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0bGV0IG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdGxldCBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHRjb25zdCByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRpZihBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHdoaWxlKGkgPCBkZWZpbml0aW9uLmxlbmd0aCkge1xuXHRcdFx0dmFyIGtleSA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdHZhciBiaW5kaW5nID0gZGVmaW5pdGlvbltpKytdO1xuXHRcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdGlmKGJpbmRpbmcgPT09IDApIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiBkZWZpbml0aW9uW2krK10gfSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGJpbmRpbmcgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihiaW5kaW5nID09PSAwKSB7IGkrKzsgfVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gc2V0IC5uYW1lIGZvciBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnRzIHBlciBFUyBzcGVjXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmRuID0gKHgpID0+IHtcblx0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoeCwgXCJuYW1lXCIpIHx8IHt9KS53cml0YWJsZSB8fCBPYmplY3QuZGVmaW5lUHJvcGVydHkoeCwgXCJuYW1lXCIsIHsgdmFsdWU6IFwiZGVmYXVsdFwiLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG5jb25zdCBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibW9iaWxlbWVhc3VyZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG5jb25zdCB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHRsZXQgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG5jb25zdCBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG5sZXQgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9