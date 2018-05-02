/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"permalink": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([33,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/permalink.js":
/*!*******************************!*\
  !*** ./examples/permalink.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_format_FeatureHash_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/format/FeatureHash.js */ "./src/format/FeatureHash.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_statemanager_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/statemanager/module.js */ "./src/statemanager/module.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/interaction/Draw.js */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
// The MIT License (MIT)
//
// Copyright (c) 2014-2021 Camptocamp SA
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

















/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [
  'gettext',
  ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  ngeo_statemanager_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name,
]);

/**
 * An application-specific map component that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This component gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @type {angular.IComponentOptions}
 */
const mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap',
  },
  template: '<div ngeo-map=ctrl.map></div>',
};

myModule.component('appMap', mapComponent);

/**
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo Location service.
 * @param {import("ngeo/misc/debounce.js").miscDebounce<function(import("ol/events/Event.js").default): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @constructor
 * @ngInject
 */
function MapComponentController(ngeoLocation, ngeoDebounce) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {import("ngeo/misc/debounce.js").miscDebounce<function(import("ol/events/Event.js").default): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;
}

myModule.controller('AppMapController', MapComponentController);

MapComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const view = this.map.getView();

  const zoom_ = this.ngeoLocation_.getParam('z');
  const zoom = zoom_ !== undefined ? +zoom_ : 4;

  const x = this.ngeoLocation_.getParam('x');
  const y = this.ngeoLocation_.getParam('y');
  const center = x !== undefined && y !== undefined ? [+x, +y] : [0, 0];

  view.setCenter(center);
  view.setZoom(zoom);

  this.ngeoLocation_.updateParams({
    'z': `${zoom}`,
    'x': `${Math.round(center[0])}`,
    'y': `${Math.round(center[1])}`,
  });

  view.on(
    'propertychange',
    /** @type {function(?): ?} */ (this.ngeoDebounce_(
      /**
       * @param {import("ol/events/Event.js").default} e Object event.
       */
      (e) => {
        const center = view.getCenter();
        if (!center) {
          throw new Error('Missing center');
        }
        const params = {
          'z': `${view.getZoom()}`,
          'x': `${Math.round(center[0])}`,
          'y': `${Math.round(center[1])}`,
        };
        this.ngeoLocation_.updateParams(params);
      },
      300,
      /* invokeApply */ true
    ))
  );
};

/**
 * A draw component that adds a simple draw tool.
 *
 * @type {angular.IComponentOptions}
 */
const drawComponent = {
  controller: 'AppDrawController as ctrl',
  bindings: {
    'map': '=appDrawMap',
    'layer': '=appDrawLayer',
  },
  template:
    '<label>Enable drawing:' +
    '<input type="checkbox" ng-model="ctrl.interaction.active" />' +
    '</label><br>' +
    '<button ng-click="ctrl.clearLayer()">Clear layer</button>',
};

myModule.component('appDraw', drawComponent);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/statemanager/Location.js").StatemanagerLocation} ngeoLocation ngeo Location service.
 * @constructor
 * @ngInject
 */
function DrawComponentController($scope, ngeoLocation) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {?import("ol/layer/Vector.js").default}
   */
  this.layer = null;

  /**
   * @type {import("ngeo/statemanager/Location.js").StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {number}
   */
  this.featureSeq_ = 0;

  /**
   * @type {?import("ol/interaction/Draw.js").default}
   */
  this.interaction = null;
}

DrawComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  /**
   * @type {olSourceVector<import("ol/geom/Geometry.js").default>}
   */
  const vectorSource = this.layer.getSource();

  this.interaction = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    type: 'LineString',
    source: vectorSource,
  });

  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.interaction);

  this.interaction.on(
    'drawend',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (e) => {
        e.feature.set('id', ++this.featureSeq_);
      }
    )
  );

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeo_format_FeatureHash_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

  vectorSource.on(
    'addfeature',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (e) => {
        const feature = e.feature;
        feature.setStyle(
          new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
            stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
              color: [255, 0, 0, 1],
              width: 2,
            }),
          })
        );
        const features = vectorSource.getFeatures();
        const encodedFeatures = fhFormat.writeFeatures(features);
        this.scope_.$applyAsync(() => {
          this.ngeoLocation_.updateParams({'features': encodedFeatures});
        });
      }
    )
  );

  const encodedFeatures = this.ngeoLocation_.getParam('features');
  if (encodedFeatures !== undefined) {
    const features = /** @type {import('ol/Feature.js').default<import("ol/geom/Geometry.js").default>[]} */ (fhFormat.readFeatures(
      encodedFeatures
    ));
    this.featureSeq_ = features.length;
    vectorSource.addFeatures(features);
  }
};

/**
 * Clear the vector layer.
 */
DrawComponentController.prototype.clearLayer = function () {
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  const source = this.layer.getSource();
  if (!(source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"])) {
    throw new Error('Wrong source');
  }
  source.clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

myModule.controller('AppDrawController', DrawComponentController);

/**
 * @constructor
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__["default"](),
      }),
    ],
  });

  const vectorSource = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]();

  /**
   * @type {import("ol/layer/Vector.js").default}
   */
  this.vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  this.vectorLayer.setMap(this.map);
}

myModule.controller('MainController', MainController);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./node_modules/ol/format/Feature.js":
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/ol/format/Feature.js from dll-reference vendor ***!
  \*******************************************************************************/
/*! exports provided: default, transformGeometryWithOptions, transformExtentWithOptions */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(56);

/***/ }),

/***/ "./node_modules/ol/format/TextFeature.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/ol/format/TextFeature.js from dll-reference vendor ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1069);

/***/ }),

/***/ "./src/format/FeatureHash.js":
/*!***********************************!*\
  !*** ./src/format/FeatureHash.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/format/FeatureProperties.js */ "./src/format/FeatureProperties.js");
/* harmony import */ var ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/format/FeatureHashStyleType.js */ "./src/format/FeatureHashStyleType.js");
/* harmony import */ var ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/utils.js */ "./src/utils.js");
/* harmony import */ var ol_color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/color.js */ "./node_modules/ol/color.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_format_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/format/Feature.js */ "./node_modules/ol/format/Feature.js");
/* harmony import */ var ol_format_TextFeature_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/TextFeature.js */ "./node_modules/ol/format/TextFeature.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/MultiLineString.js */ "./node_modules/ol/geom/MultiLineString.js");
/* harmony import */ var ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/MultiPoint.js */ "./node_modules/ol/geom/MultiPoint.js");
/* harmony import */ var ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/MultiPolygon.js */ "./node_modules/ol/geom/MultiPolygon.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Text_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Text.js */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/geom/Geometry.js */ "./node_modules/ol/geom/Geometry.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




















var LegacyProperties_ = {};
var DEFAULT_ACCURACY = 0.1;
var StyleTypes_ = {
  'LineString': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING,
  'Point': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT,
  'Polygon': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON,
  'MultiLineString': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING,
  'MultiPoint': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT,
  'MultiPolygon': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON
};
var CHAR64_ = '.-_!*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghjkmnpqrstuvwxyz';
var GEOMETRY_READERS_ = {
  'P': readMultiPointGeometry_,
  'L': readMultiLineStringGeometry_,
  'A': readMultiPolygonGeometry_,
  'l': readLineStringGeometry_,
  'p': readPointGeometry_,
  'a': readPolygonGeometry_
};
var GEOMETRY_WRITERS_ = {
  'MultiLineString': writeMultiLineStringGeometry_,
  'MultiPoint': writeMultiPointGeometry_,
  'MultiPolygon': writeMultiPolygonGeometry_,
  'LineString': writeLineStringGeometry_,
  'Point': writePointGeometry_,
  'Polygon': writePolygonGeometry_
};

var FeatureHash = function (_olFormatTextFeature) {
  _inheritsLoose(FeatureHash, _olFormatTextFeature);

  function FeatureHash(opt_options) {
    var _this;

    _this = _olFormatTextFeature.call(this) || this;
    var options = opt_options || {};
    _this.accuracy_ = options.accuracy || DEFAULT_ACCURACY;
    _this.encodeStyles_ = options.encodeStyles || true;
    _this.propertiesFunction_ = options.properties || defaultPropertiesFunction_;
    _this.setStyle_ = options.setStyle !== undefined ? options.setStyle : true;
    _this.prevX_ = 0;
    _this.prevY_ = 0;
    LegacyProperties_ = options.propertiesType || {};
    _this.defaultValues_ = options.defaultValues || {};
    return _this;
  }

  var _proto = FeatureHash.prototype;

  _proto.decodeCoordinates_ = function decodeCoordinates_(text, opt_flatCoordinates) {
    var len = text.length;
    var index = 0;
    var flatCoordinates = opt_flatCoordinates !== undefined ? opt_flatCoordinates : [];
    var i = flatCoordinates.length;

    while (index < len) {
      var b = void 0;
      var shift = 0;
      var result = 0;

      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);

      var dx = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevX_ += dx;
      shift = 0;
      result = 0;

      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);

      var dy = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevY_ += dy;
      flatCoordinates[i++] = this.prevX_ * this.accuracy_;
      flatCoordinates[i++] = this.prevY_ * this.accuracy_;
    }

    return flatCoordinates;
  };

  _proto.encodeCoordinates_ = function encodeCoordinates_(flatCoordinates, stride, offset, end) {
    var encodedCoordinates = '';

    for (var i = offset; i < end; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      x = Math.floor(x / this.accuracy_);
      y = Math.floor(y / this.accuracy_);
      var dx = x - this.prevX_;
      var dy = y - this.prevY_;
      this.prevX_ = x;
      this.prevY_ = y;
      encodedCoordinates += encodeSignedNumber_(dx) + encodeSignedNumber_(dy);
    }

    return encodedCoordinates;
  };

  _proto.readFeatureFromText = function readFeatureFromText(text, opt_options) {
    console.assert(text.length > 2);
    console.assert(text[1] === '(');
    console.assert(text.endsWith(')'));
    var splitIndex = text.indexOf('~');
    var geometryText = splitIndex >= 0 ? text.substring(0, splitIndex) + ")" : text;
    var geometry = this.readGeometryFromText(geometryText, opt_options);
    var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"](geometry);

    if (splitIndex >= 0) {
      var attributesAndStylesText = text.substring(splitIndex + 1, text.length - 1);
      splitIndex = attributesAndStylesText.indexOf('~');
      var attributesText = splitIndex >= 0 ? attributesAndStylesText.substring(0, splitIndex) : attributesAndStylesText;

      if (attributesText != '') {
        var parts = attributesText.split("'");

        for (var _iterator = _createForOfIteratorHelperLoose(parts), _step; !(_step = _iterator()).done;) {
          var encodedPart = _step.value;
          var part = decodeURIComponent(encodedPart);
          var keyVal = part.split('*');
          console.assert(keyVal.length === 2);
          var key = keyVal[0];
          var value = keyVal[1];

          if (!this.setStyle_ && LegacyProperties_[key]) {
            key = LegacyProperties_[key];
          }

          feature.set(key, castValue_(key, value));
        }
      }

      if (splitIndex >= 0) {
        var stylesText = attributesAndStylesText.substring(splitIndex + 1);

        if (this.setStyle_) {
          setStyleInFeature_(stylesText, feature);
        } else {
          setStyleProperties_(stylesText, feature);
        }
      }
    }

    return feature;
  };

  _proto.readFeaturesFromText = function readFeaturesFromText(text, opt_options) {
    var _this2 = this;

    console.assert(text.startsWith('F'));
    this.prevX_ = 0;
    this.prevY_ = 0;
    var features = [];
    text = text.substring(1);

    while (text.length > 0) {
      var index = text.indexOf(')');
      console.assert(index >= 0);
      var feature = this.readFeatureFromText(text.substring(0, index + 1), opt_options);
      features.push(feature);
      text = text.substring(index + 1);
    }

    features.forEach(function (feature) {
      for (var key in _this2.defaultValues_) {
        var property = LegacyProperties_[key];

        if (feature.get(property) === undefined) {
          feature.set(property, _this2.defaultValues_[key].call(null, feature));
        }
      }
    });
    return features;
  };

  _proto.readGeometryFromText = function readGeometryFromText(text, opt_options) {
    var geometryReader = GEOMETRY_READERS_[text[0]];
    console.assert(geometryReader !== undefined);
    return geometryReader.call(this, text);
  };

  _proto.writeFeatureText = function writeFeatureText(feature, opt_options) {
    var encodedParts = [];
    var encodedGeometry = '';
    var geometry = feature.getGeometry();

    if (geometry) {
      encodedGeometry = this.writeGeometryText(geometry, opt_options);
    }

    if (encodedGeometry.length > 0) {
      console.assert(encodedGeometry.endsWith(')'));
      encodedGeometry = encodedGeometry.substring(0, encodedGeometry.length - 1);
      encodedParts.push(encodedGeometry);
    }

    var encodedProperties = [];
    var propFunction = this.propertiesFunction_(feature);

    for (var key in propFunction) {
      var value = propFunction[key];

      if (value !== undefined && value !== null && key !== feature.getGeometryName()) {
        if (encodedProperties.length !== 0) {
          encodedProperties.push("'");
        }

        var encoded = encodeURIComponent(key.replace(/[()'*]/g, '_') + "*" + value.toString().replace(/[()'*]/g, '_'));
        encodedProperties.push(encoded);
      }
    }

    if (encodedProperties.length > 0) {
      encodedParts.push('~');
      Array.prototype.push.apply(encodedParts, encodedProperties);
    }

    if (this.encodeStyles_) {
      var styleFunction = feature.getStyleFunction();

      if (styleFunction !== undefined) {
        var styles = styleFunction(feature, 0);

        if (styles) {
          var encodedStyles = [];
          styles = Array.isArray(styles) ? styles : [styles];

          if (!geometry) {
            throw new Error('Missing geometry');
          }

          encodeStyles_(styles, geometry.getType(), encodedStyles);

          if (encodedStyles.length > 0) {
            encodedParts.push('~');
            Array.prototype.push.apply(encodedParts, encodedStyles);
          }
        }
      }
    }

    encodedParts.push(')');
    return encodedParts.join('');
  };

  _proto.writeFeaturesText = function writeFeaturesText(features, opt_options) {
    this.prevX_ = 0;
    this.prevY_ = 0;
    var textArray = [];

    if (features.length > 0) {
      textArray.push('F');

      for (var i = 0, ii = features.length; i < ii; ++i) {
        textArray.push(this.writeFeatureText(features[i], opt_options));
      }
    }

    return textArray.join('');
  };

  _proto.writeGeometryText = function writeGeometryText(geometry, opt_options) {
    var geometryWriter = GEOMETRY_WRITERS_[geometry.getType()];
    console.assert(geometryWriter !== undefined);
    var transformedGeometry = Object(ol_format_Feature_js__WEBPACK_IMPORTED_MODULE_5__["transformGeometryWithOptions"])(geometry, true, opt_options);

    if (!(transformedGeometry instanceof ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_18__["default"])) {
      throw new Error('Missing transformedGeometry');
    }

    var encGeom = geometryWriter.call(this, transformedGeometry);

    if (!encGeom) {
      throw new Error('Missing encodedGeometry');
    }

    return encGeom;
  };

  return FeatureHash;
}(ol_format_TextFeature_js__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FeatureHash);

function defaultPropertiesFunction_(feature) {
  return feature.getProperties();
}

function encodeSignedNumber_(num) {
  var signedNum = num << 1;

  if (num < 0) {
    signedNum = ~signedNum;
  }

  return encodeNumber_(signedNum);
}

function encodeNumber_(num) {
  var encodedNumber = '';

  while (num >= 0x20) {
    encodedNumber += CHAR64_.charAt(0x20 | num & 0x1f);
    num >>= 5;
  }

  encodedNumber += CHAR64_.charAt(num);
  return encodedNumber;
}

function encodeStyles_(styles, geometryType, encodedStyles) {
  var styleType = StyleTypes_[geometryType];
  console.assert(styleType !== undefined);

  for (var _iterator2 = _createForOfIteratorHelperLoose(styles), _step2; !(_step2 = _iterator2()).done;) {
    var style = _step2.value;
    var fillStyle = style.getFill();
    var imageStyle = style.getImage();
    var strokeStyle = style.getStroke();
    var textStyle = style.getText();

    if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON) {
      if (fillStyle !== null) {
        encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING) {
      if (strokeStyle !== null) {
        encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT) {
      if (imageStyle !== null) {
        encodeStylePoint_(imageStyle, encodedStyles);
      }
    }

    if (textStyle !== null) {
      encodeStyleText_(textStyle, encodedStyles);
    }
  }
}

function encodeStyleLine_(strokeStyle, encodedStyles) {
  encodeStyleStroke_(strokeStyle, encodedStyles);
}

function encodeStylePoint_(imageStyle, encodedStyles) {
  if (imageStyle instanceof ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_13__["default"]) {
    var radius = imageStyle.getRadius();

    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent("pointRadius*" + radius));
    var fillStyle = imageStyle.getFill();

    if (fillStyle !== null) {
      encodeStyleFill_(fillStyle, encodedStyles);
    }

    var strokeStyle = imageStyle.getStroke();

    if (strokeStyle !== null) {
      encodeStyleStroke_(strokeStyle, encodedStyles);
    }
  }
}

function encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles) {
  encodeStyleFill_(fillStyle, encodedStyles);

  if (strokeStyle !== null) {
    encodeStyleStroke_(strokeStyle, encodedStyles);
  }
}

function encodeStyleFill_(fillStyle, encodedStyles, propertyName) {
  if (propertyName === void 0) {
    propertyName = 'fillColor';
  }

  var fillColor = fillStyle.getColor();
  var fillColorHex;

  if (fillColor !== null) {
    if (Array.isArray(fillColor)) {
      fillColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(fillColor);
    } else if (typeof fillColor === 'string') {
      fillColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(Object(ol_color_js__WEBPACK_IMPORTED_MODULE_3__["asArray"])(fillColor));
    } else {
      throw new Error('Unsupported color');
    }

    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent(propertyName + "*" + fillColorHex));
  }
}

function encodeStyleStroke_(strokeStyle, encodedStyles) {
  var strokeColor = strokeStyle.getColor();

  if (strokeColor !== null) {
    if (Array.isArray(strokeColor)) {
      var strokeColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(strokeColor);

      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }

      encodedStyles.push(encodeURIComponent("strokeColor*" + strokeColorHex));
    }
  }

  var strokeWidth = strokeStyle.getWidth();

  if (strokeWidth !== undefined) {
    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent("strokeWidth*" + strokeWidth));
  }
}

function encodeStyleText_(textStyle, encodedStyles) {
  var fontStyle = textStyle.getFont();

  if (fontStyle !== undefined) {
    var font = fontStyle.split(' ');

    if (font.length >= 3) {
      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }

      encodedStyles.push(encodeURIComponent("fontSize*" + font[1]));
    }
  }

  var fillStyle = textStyle.getFill();

  if (fillStyle !== null) {
    encodeStyleFill_(fillStyle, encodedStyles, 'fontColor');
  }
}

function readLineStringGeometry_(text) {
  console.assert(text.startsWith('l('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  return new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__["default"](flatCoordinates, 'XY');
}

function readMultiLineStringGeometry_(text) {
  console.assert(text.startsWith('L('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var ends = [];
  var lineStrings = text.split("'");

  for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }

  return new ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_8__["default"](flatCoordinates, 'XY', ends);
}

function readPointGeometry_(text) {
  console.assert(text.startsWith('p('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  console.assert(flatCoordinates.length === 2);
  return new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__["default"](flatCoordinates, 'XY');
}

function readMultiPointGeometry_(text) {
  console.assert(text.startsWith('P('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  return new ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_9__["default"](flatCoordinates, 'XY');
}

function readPolygonGeometry_(text) {
  console.assert(text.startsWith('a('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var ends = [];
  var rings = text.split("'");

  for (var i = 0, ii = rings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(rings[i], flatCoordinates);
    var end = flatCoordinates.length;

    if (i === 0) {
      flatCoordinates[end++] = flatCoordinates[0];
      flatCoordinates[end++] = flatCoordinates[1];
    } else {
      flatCoordinates[end++] = flatCoordinates[ends[i - 1]];
      flatCoordinates[end++] = flatCoordinates[ends[i - 1] + 1];
    }

    ends[i] = end;
  }

  return new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["default"](flatCoordinates, 'XY', ends);
}

function readMultiPolygonGeometry_(text) {
  console.assert(text.startsWith('A('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var endss = [];
  var polygons = text.split(')(');

  for (var i = 0, ii = polygons.length; i < ii; ++i) {
    var rings = polygons[i].split("'");
    endss[i] = [];
    var ends = endss[i];

    for (var j = 0, jj = rings.length; j < jj; ++j) {
      flatCoordinates = this.decodeCoordinates_(rings[j], flatCoordinates);
      var end = flatCoordinates.length;

      if (j === 0) {
        flatCoordinates[end++] = flatCoordinates[0];
        flatCoordinates[end++] = flatCoordinates[1];
      } else {
        flatCoordinates[end++] = flatCoordinates[ends[j - 1]];
        flatCoordinates[end++] = flatCoordinates[ends[j - 1] + 1];
      }

      ends[j] = end;
    }
  }

  return new ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_10__["default"](flatCoordinates, 'XY', endss);
}

function setStyleInFeature_(text, feature) {
  if (text == '') {
    return;
  }

  var properties = getStyleProperties_(text, feature);
  var fillColor = properties.fillColor;
  var fontSize = properties.fontSize;
  var fontColor = properties.fontColor;
  var pointRadius = properties.pointRadius;
  var strokeColor = properties.strokeColor;
  var strokeWidth = properties.strokeWidth;
  var fillStyle = null;

  if (fillColor !== undefined) {
    fillStyle = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
      color: fillColor
    });
  }

  var strokeStyle = null;

  if (strokeColor !== undefined && strokeWidth !== undefined) {
    if (typeof strokeWidth != 'number') {
      throw new Error('Missing strokeWidth');
    }

    strokeStyle = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      color: strokeColor,
      width: strokeWidth
    });
  }

  var imageStyle = null;

  if (pointRadius !== undefined) {
    if (typeof pointRadius != 'number') {
      throw new Error('Missing pointRadius');
    }

    var _options = {
      radius: pointRadius
    };

    if (fillStyle) {
      _options.fill = fillStyle;
    }

    if (strokeStyle) {
      _options.stroke = strokeStyle;
    }

    imageStyle = new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_13__["default"](_options);
    fillStyle = null;
    strokeStyle = null;
  }

  var textStyle = null;

  if (fontSize !== undefined && fontColor !== undefined) {
    textStyle = new ol_style_Text_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
      font: fontSize + " sans-serif",
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
        color: fontColor
      })
    });
  }

  var options = {};

  if (fillStyle) {
    options.fill = fillStyle;
  }

  if (strokeStyle) {
    options.stroke = strokeStyle;
  }

  if (imageStyle) {
    options.image = imageStyle;
  }

  if (textStyle) {
    options.text = textStyle;
  }

  var style = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_16__["default"](options);
  feature.setStyle(style);
}

function setStyleProperties_(text, feature) {
  var properties = getStyleProperties_(text, feature);
  var geometry = feature.getGeometry();

  if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__["default"]) {
    if (properties.isLabel || properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_TEXT]) {
      delete properties.strokeColor;
      delete properties.fillColor;
    } else {
      delete properties.fontColor;
      delete properties.fontSize;
    }
  } else {
    delete properties.fontColor;

    if (geometry instanceof ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
      delete properties.fillColor;
      delete properties.fillOpacity;
    }
  }

  if (properties.fontSize) {
    var fontSizeStr = properties.fontSize;

    if (typeof fontSizeStr !== 'string') {
      throw new Error('Wrong fontSizeStr type');
    }

    var fontSize = parseFloat(fontSizeStr);

    if (fontSizeStr.includes('px')) {
      fontSize = Math.round(fontSize / 1.333333);
    }

    properties.fontSize = fontSize;
  }

  var clone = {};

  for (var key in properties) {
    var value = properties[key];

    if (LegacyProperties_[key]) {
      clone[LegacyProperties_[key]] = value;
    } else {
      clone[key] = value;
    }
  }

  feature.setProperties(clone);
}

function castValue_(key, value) {
  var numProperties = [ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].ANGLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].OPACITY, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].STROKE, 'pointRadius', 'strokeWidth'];
  var boolProperties = [ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_CIRCLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_RECTANGLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_TEXT, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_MEASURE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_LABEL, 'isCircle', 'isRectangle', 'isLabel', 'showMeasure', 'showLabel'];

  if (numProperties.includes(key)) {
    return +value;
  } else if (boolProperties.includes(key)) {
    return value === 'true' ? true : false;
  } else {
    return value;
  }
}

function getStyleProperties_(text, feature) {
  var parts = text.split("'");
  var properties = {};

  for (var _iterator3 = _createForOfIteratorHelperLoose(parts), _step3; !(_step3 = _iterator3()).done;) {
    var encodedPart = _step3.value;
    var part = decodeURIComponent(encodedPart);
    var keyVal = part.split('*');
    console.assert(keyVal.length === 2);
    var key = keyVal[0];
    var val = keyVal[1];
    properties[key] = castValue_(key, val);
  }

  return properties;
}

function writeLineStringGeometry_(geometry) {
  if (geometry instanceof ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "l(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function writeMultiLineStringGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
    var ends = geometry.getEnds();
    var lineStringCount = ends.length;
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var offset = 0;
    var textArray = ['L('];

    for (var i = 0; i < lineStringCount; ++i) {
      var end = ends[i];
      var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);

      if (i !== 0) {
        textArray.push("'");
      }

      textArray.push(text);
      offset = end;
    }

    textArray.push(')');
    return textArray.join('');
  }

  return null;
}

function writePointGeometry_(geometry) {
  if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_11__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "p(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function writeMultiPointGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "P(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function encodeRings_(flatCoordinates, stride, offset, ends, textArray) {
  var linearRingCount = ends.length;

  for (var i = 0; i < linearRingCount; ++i) {
    var end = ends[i] - stride;
    var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);

    if (i !== 0) {
      textArray.push("'");
    }

    textArray.push(text);
    offset = ends[i];
  }

  return offset;
}

function writePolygonGeometry_(geometry) {
  if (geometry instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_12__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var ends = geometry.getEnds();
    var offset = 0;
    var textArray = ['a('];
    encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
    textArray.push(')');
    return textArray.join('');
  }

  return null;
}

function writeMultiPolygonGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var endss = geometry.getEndss();
    var polygonCount = endss.length;
    var offset = 0;
    var textArray = ['A'];

    for (var i = 0; i < polygonCount; ++i) {
      var ends = endss[i];
      textArray.push('(');
      offset = encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
      textArray.push(')');
    }

    return textArray.join('');
  } else {
    throw new Error('Wrong geometry type');
  }
}

/***/ }),

/***/ "./src/format/FeatureHashStyleType.js":
/*!********************************************!*\
  !*** ./src/format/FeatureHashStyleType.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon'
});

/***/ }),

/***/ 33:
/*!******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/permalink.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/permalink.js */"./examples/permalink.js");


/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3Blcm1hbGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9ybWF0L0ZlYXR1cmVIYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9mb3JtYXQvRmVhdHVyZUhhc2hTdHlsZVR5cGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBlcm1hbGlua1wiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMzMsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE0LTIwMjEgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoIGZyb20gJ25nZW8vZm9ybWF0L0ZlYXR1cmVIYXNoLmpzJztcblxuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZS5qcyc7XG5pbXBvcnQge2ludGVyYWN0aW9uRGVjb3JhdGlvbn0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCBuZ2VvU3RhdGVtYW5hZ2VyTW9kdWxlIGZyb20gJ25nZW8vc3RhdGVtYW5hZ2VyL21vZHVsZS5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbEludGVyYWN0aW9uRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBuZ2VvTWFwTW9kdWxlLm5hbWUsXG4gIG5nZW9NaXNjRGVib3VuY2UubmFtZSxcbiAgbmdlb1N0YXRlbWFuYWdlck1vZHVsZS5uYW1lLFxuXSk7XG5cbi8qKlxuICogQW4gYXBwbGljYXRpb24tc3BlY2lmaWMgbWFwIGNvbXBvbmVudCB0aGF0IHVwZGF0ZXMgdGhlIFVSTCBpbiB0aGUgYnJvd3NlclxuICogYWRkcmVzcyBiYXIgd2hlbiB0aGUgbWFwIHZpZXcgY2hhbmdlcy4gSXQgYWxzbyBzZXRzIHRoZSBpbml0aWFsIHZpZXcgYmFzZWRcbiAqIG9uIHRoZSBVUkwgcXVlcnkgcGFyYW1zIGF0IGluaXQgdGltZS5cbiAqXG4gKiBUaGlzIGNvbXBvbmVudCBnZXRzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYXAgaW5zdGFuY2UgdGhyb3VnaCB0aGUgXCJhcHAtbWFwXCJcbiAqIGF0dHJpYnV0ZS5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqL1xuY29uc3QgbWFwQ29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnQXBwTWFwQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBNYXAnLFxuICB9LFxuICB0ZW1wbGF0ZTogJzxkaXYgbmdlby1tYXA9Y3RybC5tYXA+PC9kaXY+Jyxcbn07XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwTWFwJywgbWFwQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydChcIm5nZW8vc3RhdGVtYW5hZ2VyL0xvY2F0aW9uLmpzXCIpLlN0YXRlbWFuYWdlckxvY2F0aW9ufSBuZ2VvTG9jYXRpb24gbmdlbyBMb2NhdGlvbiBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL21pc2MvZGVib3VuY2UuanNcIikubWlzY0RlYm91bmNlPGZ1bmN0aW9uKGltcG9ydChcIm9sL2V2ZW50cy9FdmVudC5qc1wiKS5kZWZhdWx0KTogdm9pZD59IG5nZW9EZWJvdW5jZVxuICogICAgbmdlbyBEZWJvdW5jZSBmYWN0b3J5LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFwQ29tcG9uZW50Q29udHJvbGxlcihuZ2VvTG9jYXRpb24sIG5nZW9EZWJvdW5jZSkge1xuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoXCJvbC9NYXAuanNcIikuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm5nZW8vc3RhdGVtYW5hZ2VyL0xvY2F0aW9uLmpzXCIpLlN0YXRlbWFuYWdlckxvY2F0aW9ufVxuICAgKi9cbiAgdGhpcy5uZ2VvTG9jYXRpb25fID0gbmdlb0xvY2F0aW9uO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwibmdlby9taXNjL2RlYm91bmNlLmpzXCIpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihpbXBvcnQoXCJvbC9ldmVudHMvRXZlbnQuanNcIikuZGVmYXVsdCk6IHZvaWQ+fVxuICAgKi9cbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdBcHBNYXBDb250cm9sbGVyJywgTWFwQ29tcG9uZW50Q29udHJvbGxlcik7XG5cbk1hcENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcblxuICBjb25zdCB6b29tXyA9IHRoaXMubmdlb0xvY2F0aW9uXy5nZXRQYXJhbSgneicpO1xuICBjb25zdCB6b29tID0gem9vbV8gIT09IHVuZGVmaW5lZCA/ICt6b29tXyA6IDQ7XG5cbiAgY29uc3QgeCA9IHRoaXMubmdlb0xvY2F0aW9uXy5nZXRQYXJhbSgneCcpO1xuICBjb25zdCB5ID0gdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtKCd5Jyk7XG4gIGNvbnN0IGNlbnRlciA9IHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQgPyBbK3gsICt5XSA6IFswLCAwXTtcblxuICB2aWV3LnNldENlbnRlcihjZW50ZXIpO1xuICB2aWV3LnNldFpvb20oem9vbSk7XG5cbiAgdGhpcy5uZ2VvTG9jYXRpb25fLnVwZGF0ZVBhcmFtcyh7XG4gICAgJ3onOiBgJHt6b29tfWAsXG4gICAgJ3gnOiBgJHtNYXRoLnJvdW5kKGNlbnRlclswXSl9YCxcbiAgICAneSc6IGAke01hdGgucm91bmQoY2VudGVyWzFdKX1gLFxuICB9KTtcblxuICB2aWV3Lm9uKFxuICAgICdwcm9wZXJ0eWNoYW5nZScsXG4gICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi8gKHRoaXMubmdlb0RlYm91bmNlXyhcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtpbXBvcnQoXCJvbC9ldmVudHMvRXZlbnQuanNcIikuZGVmYXVsdH0gZSBPYmplY3QgZXZlbnQuXG4gICAgICAgKi9cbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHZpZXcuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGlmICghY2VudGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAneic6IGAke3ZpZXcuZ2V0Wm9vbSgpfWAsXG4gICAgICAgICAgJ3gnOiBgJHtNYXRoLnJvdW5kKGNlbnRlclswXSl9YCxcbiAgICAgICAgICAneSc6IGAke01hdGgucm91bmQoY2VudGVyWzFdKX1gLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5nZW9Mb2NhdGlvbl8udXBkYXRlUGFyYW1zKHBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgMzAwLFxuICAgICAgLyogaW52b2tlQXBwbHkgKi8gdHJ1ZVxuICAgICkpXG4gICk7XG59O1xuXG4vKipcbiAqIEEgZHJhdyBjb21wb25lbnQgdGhhdCBhZGRzIGEgc2ltcGxlIGRyYXcgdG9vbC5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqL1xuY29uc3QgZHJhd0NvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0FwcERyYXdDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPWFwcERyYXdNYXAnLFxuICAgICdsYXllcic6ICc9YXBwRHJhd0xheWVyJyxcbiAgfSxcbiAgdGVtcGxhdGU6XG4gICAgJzxsYWJlbD5FbmFibGUgZHJhd2luZzonICtcbiAgICAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiY3RybC5pbnRlcmFjdGlvbi5hY3RpdmVcIiAvPicgK1xuICAgICc8L2xhYmVsPjxicj4nICtcbiAgICAnPGJ1dHRvbiBuZy1jbGljaz1cImN0cmwuY2xlYXJMYXllcigpXCI+Q2xlYXIgbGF5ZXI8L2J1dHRvbj4nLFxufTtcblxubXlNb2R1bGUuY29tcG9uZW50KCdhcHBEcmF3JywgZHJhd0NvbXBvbmVudCk7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFNjb3BlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbi5qc1wiKS5TdGF0ZW1hbmFnZXJMb2NhdGlvbn0gbmdlb0xvY2F0aW9uIG5nZW8gTG9jYXRpb24gc2VydmljZS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIERyYXdDb21wb25lbnRDb250cm9sbGVyKCRzY29wZSwgbmdlb0xvY2F0aW9uKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydChcIm9sL01hcC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydChcIm9sL2xheWVyL1ZlY3Rvci5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5sYXllciA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJuZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbi5qc1wiKS5TdGF0ZW1hbmFnZXJMb2NhdGlvbn1cbiAgICovXG4gIHRoaXMubmdlb0xvY2F0aW9uXyA9IG5nZW9Mb2NhdGlvbjtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLmZlYXR1cmVTZXFfID0gMDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoXCJvbC9pbnRlcmFjdGlvbi9EcmF3LmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmludGVyYWN0aW9uID0gbnVsbDtcbn1cblxuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgaWYgKCF0aGlzLmxheWVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGxheWVyJyk7XG4gIH1cbiAgLyoqXG4gICAqIEB0eXBlIHtvbFNvdXJjZVZlY3RvcjxpbXBvcnQoXCJvbC9nZW9tL0dlb21ldHJ5LmpzXCIpLmRlZmF1bHQ+fVxuICAgKi9cbiAgY29uc3QgdmVjdG9yU291cmNlID0gdGhpcy5sYXllci5nZXRTb3VyY2UoKTtcblxuICB0aGlzLmludGVyYWN0aW9uID0gbmV3IG9sSW50ZXJhY3Rpb25EcmF3KHtcbiAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgc291cmNlOiB2ZWN0b3JTb3VyY2UsXG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJhY3Rpb24uc2V0QWN0aXZlKGZhbHNlKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5pbnRlcmFjdGlvbik7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmludGVyYWN0aW9uKTtcblxuICB0aGlzLmludGVyYWN0aW9uLm9uKFxuICAgICdkcmF3ZW5kJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqLyAoXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQuanMnKS5kZWZhdWx0PHVua25vd24+fSBldnRcbiAgICAgICAqLyAoZSkgPT4ge1xuICAgICAgICBlLmZlYXR1cmUuc2V0KCdpZCcsICsrdGhpcy5mZWF0dXJlU2VxXyk7XG4gICAgICB9XG4gICAgKVxuICApO1xuXG4gIC8vIERlYWwgd2l0aCB0aGUgZW5jb2RpbmcgYW5kIGRlY29kaW5nIG9mIGZlYXR1cmVzIGluIHRoZSBVUkwuXG5cbiAgY29uc3QgZmhGb3JtYXQgPSBuZXcgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoKCk7XG5cbiAgdmVjdG9yU291cmNlLm9uKFxuICAgICdhZGRmZWF0dXJlJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqLyAoXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQuanMnKS5kZWZhdWx0PHVua25vd24+fSBldnRcbiAgICAgICAqLyAoZSkgPT4ge1xuICAgICAgICBjb25zdCBmZWF0dXJlID0gZS5mZWF0dXJlO1xuICAgICAgICBmZWF0dXJlLnNldFN0eWxlKFxuICAgICAgICAgIG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgICAgIGNvbG9yOiBbMjU1LCAwLCAwLCAxXSxcbiAgICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmZWF0dXJlcyA9IHZlY3RvclNvdXJjZS5nZXRGZWF0dXJlcygpO1xuICAgICAgICBjb25zdCBlbmNvZGVkRmVhdHVyZXMgPSBmaEZvcm1hdC53cml0ZUZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy5zY29wZV8uJGFwcGx5QXN5bmMoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdlb0xvY2F0aW9uXy51cGRhdGVQYXJhbXMoeydmZWF0dXJlcyc6IGVuY29kZWRGZWF0dXJlc30pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApXG4gICk7XG5cbiAgY29uc3QgZW5jb2RlZEZlYXR1cmVzID0gdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtKCdmZWF0dXJlcycpO1xuICBpZiAoZW5jb2RlZEZlYXR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBmZWF0dXJlcyA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlLmpzJykuZGVmYXVsdDxpbXBvcnQoXCJvbC9nZW9tL0dlb21ldHJ5LmpzXCIpLmRlZmF1bHQ+W119ICovIChmaEZvcm1hdC5yZWFkRmVhdHVyZXMoXG4gICAgICBlbmNvZGVkRmVhdHVyZXNcbiAgICApKTtcbiAgICB0aGlzLmZlYXR1cmVTZXFfID0gZmVhdHVyZXMubGVuZ3RoO1xuICAgIHZlY3RvclNvdXJjZS5hZGRGZWF0dXJlcyhmZWF0dXJlcyk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYXIgdGhlIHZlY3RvciBsYXllci5cbiAqL1xuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFyTGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5sYXllcikge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBsYXllcicpO1xuICB9XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMubGF5ZXIuZ2V0U291cmNlKCk7XG4gIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlVmVjdG9yKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3Jvbmcgc291cmNlJyk7XG4gIH1cbiAgc291cmNlLmNsZWFyKHRydWUpO1xuICB0aGlzLmZlYXR1cmVTZXFfID0gMDtcbiAgdGhpcy5uZ2VvTG9jYXRpb25fLmRlbGV0ZVBhcmFtKCdmZWF0dXJlcycpO1xufTtcblxubXlNb2R1bGUuY29udHJvbGxlcignQXBwRHJhd0NvbnRyb2xsZXInLCBEcmF3Q29tcG9uZW50Q29udHJvbGxlcik7XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm9sL01hcC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIGNvbnN0IHZlY3RvclNvdXJjZSA9IG5ldyBvbFNvdXJjZVZlY3RvcigpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwib2wvbGF5ZXIvVmVjdG9yLmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLnZlY3RvckxheWVyID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgIHNvdXJjZTogdmVjdG9yU291cmNlLFxuICB9KTtcblxuICAvLyBVc2UgdmVjdG9yTGF5ZXIuc2V0TWFwKG1hcCkgcmF0aGVyIHRoYW4gbWFwLmFkZExheWVyKHZlY3RvckxheWVyKS4gVGhpc1xuICAvLyBtYWtlcyB0aGUgdmVjdG9yIGxheWVyIFwidW5tYW5hZ2VkXCIsIG1lYW5pbmcgdGhhdCBpdCBpcyBhbHdheXMgb24gdG9wLlxuICB0aGlzLnZlY3RvckxheWVyLnNldE1hcCh0aGlzLm1hcCk7XG59XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsImZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IHJldHVybiBpdC5uZXh0LmJpbmQoaXQpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMgZnJvbSAnbmdlby9mb3JtYXQvRmVhdHVyZVByb3BlcnRpZXMuanMnO1xuaW1wb3J0IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZSBmcm9tICduZ2VvL2Zvcm1hdC9GZWF0dXJlSGFzaFN0eWxlVHlwZS5qcyc7XG5pbXBvcnQgeyByZ2JBcnJheVRvSGV4IH0gZnJvbSAnbmdlby91dGlscy5qcyc7XG5pbXBvcnQgeyBhc0FycmF5IGFzIGFzQ29sb3JBcnJheSB9IGZyb20gJ29sL2NvbG9yLmpzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgeyB0cmFuc2Zvcm1HZW9tZXRyeVdpdGhPcHRpb25zIH0gZnJvbSAnb2wvZm9ybWF0L0ZlYXR1cmUuanMnO1xuaW1wb3J0IG9sRm9ybWF0VGV4dEZlYXR1cmUgZnJvbSAnb2wvZm9ybWF0L1RleHRGZWF0dXJlLmpzJztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZy5qcyc7XG5pbXBvcnQgb2xHZW9tTXVsdGlMaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTXVsdGlMaW5lU3RyaW5nLmpzJztcbmltcG9ydCBvbEdlb21NdWx0aVBvaW50IGZyb20gJ29sL2dlb20vTXVsdGlQb2ludC5qcyc7XG5pbXBvcnQgb2xHZW9tTXVsdGlQb2x5Z29uIGZyb20gJ29sL2dlb20vTXVsdGlQb2x5Z29uLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbmltcG9ydCBvbEdlb21Qb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbi5qcyc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuaW1wb3J0IG9sU3R5bGVUZXh0IGZyb20gJ29sL3N0eWxlL1RleHQuanMnO1xuaW1wb3J0IEdlb21ldHJ5IGZyb20gJ29sL2dlb20vR2VvbWV0cnkuanMnO1xudmFyIExlZ2FjeVByb3BlcnRpZXNfID0ge307XG52YXIgREVGQVVMVF9BQ0NVUkFDWSA9IDAuMTtcbnZhciBTdHlsZVR5cGVzXyA9IHtcbiAgJ0xpbmVTdHJpbmcnOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuTElORV9TVFJJTkcsXG4gICdQb2ludCc6IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZS5QT0lOVCxcbiAgJ1BvbHlnb24nOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuUE9MWUdPTixcbiAgJ011bHRpTGluZVN0cmluZyc6IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZS5MSU5FX1NUUklORyxcbiAgJ011bHRpUG9pbnQnOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuUE9JTlQsXG4gICdNdWx0aVBvbHlnb24nOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuUE9MWUdPTlxufTtcbnZhciBDSEFSNjRfID0gJy4tXyEqQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5YWJjZGVmZ2hqa21ucHFyc3R1dnd4eXonO1xudmFyIEdFT01FVFJZX1JFQURFUlNfID0ge1xuICAnUCc6IHJlYWRNdWx0aVBvaW50R2VvbWV0cnlfLFxuICAnTCc6IHJlYWRNdWx0aUxpbmVTdHJpbmdHZW9tZXRyeV8sXG4gICdBJzogcmVhZE11bHRpUG9seWdvbkdlb21ldHJ5XyxcbiAgJ2wnOiByZWFkTGluZVN0cmluZ0dlb21ldHJ5XyxcbiAgJ3AnOiByZWFkUG9pbnRHZW9tZXRyeV8sXG4gICdhJzogcmVhZFBvbHlnb25HZW9tZXRyeV9cbn07XG52YXIgR0VPTUVUUllfV1JJVEVSU18gPSB7XG4gICdNdWx0aUxpbmVTdHJpbmcnOiB3cml0ZU11bHRpTGluZVN0cmluZ0dlb21ldHJ5XyxcbiAgJ011bHRpUG9pbnQnOiB3cml0ZU11bHRpUG9pbnRHZW9tZXRyeV8sXG4gICdNdWx0aVBvbHlnb24nOiB3cml0ZU11bHRpUG9seWdvbkdlb21ldHJ5XyxcbiAgJ0xpbmVTdHJpbmcnOiB3cml0ZUxpbmVTdHJpbmdHZW9tZXRyeV8sXG4gICdQb2ludCc6IHdyaXRlUG9pbnRHZW9tZXRyeV8sXG4gICdQb2x5Z29uJzogd3JpdGVQb2x5Z29uR2VvbWV0cnlfXG59O1xuXG52YXIgRmVhdHVyZUhhc2ggPSBmdW5jdGlvbiAoX29sRm9ybWF0VGV4dEZlYXR1cmUpIHtcbiAgX2luaGVyaXRzTG9vc2UoRmVhdHVyZUhhc2gsIF9vbEZvcm1hdFRleHRGZWF0dXJlKTtcblxuICBmdW5jdGlvbiBGZWF0dXJlSGFzaChvcHRfb3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX29sRm9ybWF0VGV4dEZlYXR1cmUuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHZhciBvcHRpb25zID0gb3B0X29wdGlvbnMgfHwge307XG4gICAgX3RoaXMuYWNjdXJhY3lfID0gb3B0aW9ucy5hY2N1cmFjeSB8fCBERUZBVUxUX0FDQ1VSQUNZO1xuICAgIF90aGlzLmVuY29kZVN0eWxlc18gPSBvcHRpb25zLmVuY29kZVN0eWxlcyB8fCB0cnVlO1xuICAgIF90aGlzLnByb3BlcnRpZXNGdW5jdGlvbl8gPSBvcHRpb25zLnByb3BlcnRpZXMgfHwgZGVmYXVsdFByb3BlcnRpZXNGdW5jdGlvbl87XG4gICAgX3RoaXMuc2V0U3R5bGVfID0gb3B0aW9ucy5zZXRTdHlsZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zZXRTdHlsZSA6IHRydWU7XG4gICAgX3RoaXMucHJldlhfID0gMDtcbiAgICBfdGhpcy5wcmV2WV8gPSAwO1xuICAgIExlZ2FjeVByb3BlcnRpZXNfID0gb3B0aW9ucy5wcm9wZXJ0aWVzVHlwZSB8fCB7fTtcbiAgICBfdGhpcy5kZWZhdWx0VmFsdWVzXyA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlcyB8fCB7fTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gRmVhdHVyZUhhc2gucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZWNvZGVDb29yZGluYXRlc18gPSBmdW5jdGlvbiBkZWNvZGVDb29yZGluYXRlc18odGV4dCwgb3B0X2ZsYXRDb29yZGluYXRlcykge1xuICAgIHZhciBsZW4gPSB0ZXh0Lmxlbmd0aDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBvcHRfZmxhdENvb3JkaW5hdGVzICE9PSB1bmRlZmluZWQgPyBvcHRfZmxhdENvb3JkaW5hdGVzIDogW107XG4gICAgdmFyIGkgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICB2YXIgYiA9IHZvaWQgMDtcbiAgICAgIHZhciBzaGlmdCA9IDA7XG4gICAgICB2YXIgcmVzdWx0ID0gMDtcblxuICAgICAgZG8ge1xuICAgICAgICBiID0gQ0hBUjY0Xy5pbmRleE9mKHRleHQuY2hhckF0KGluZGV4KyspKTtcbiAgICAgICAgcmVzdWx0IHw9IChiICYgMHgxZikgPDwgc2hpZnQ7XG4gICAgICAgIHNoaWZ0ICs9IDU7XG4gICAgICB9IHdoaWxlIChiID49IDMyKTtcblxuICAgICAgdmFyIGR4ID0gcmVzdWx0ICYgMSA/IH4ocmVzdWx0ID4+IDEpIDogcmVzdWx0ID4+IDE7XG4gICAgICB0aGlzLnByZXZYXyArPSBkeDtcbiAgICAgIHNoaWZ0ID0gMDtcbiAgICAgIHJlc3VsdCA9IDA7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgYiA9IENIQVI2NF8uaW5kZXhPZih0ZXh0LmNoYXJBdChpbmRleCsrKSk7XG4gICAgICAgIHJlc3VsdCB8PSAoYiAmIDB4MWYpIDw8IHNoaWZ0O1xuICAgICAgICBzaGlmdCArPSA1O1xuICAgICAgfSB3aGlsZSAoYiA+PSAzMik7XG5cbiAgICAgIHZhciBkeSA9IHJlc3VsdCAmIDEgPyB+KHJlc3VsdCA+PiAxKSA6IHJlc3VsdCA+PiAxO1xuICAgICAgdGhpcy5wcmV2WV8gKz0gZHk7XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbaSsrXSA9IHRoaXMucHJldlhfICogdGhpcy5hY2N1cmFjeV87XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbaSsrXSA9IHRoaXMucHJldllfICogdGhpcy5hY2N1cmFjeV87XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsYXRDb29yZGluYXRlcztcbiAgfTtcblxuICBfcHJvdG8uZW5jb2RlQ29vcmRpbmF0ZXNfID0gZnVuY3Rpb24gZW5jb2RlQ29vcmRpbmF0ZXNfKGZsYXRDb29yZGluYXRlcywgc3RyaWRlLCBvZmZzZXQsIGVuZCkge1xuICAgIHZhciBlbmNvZGVkQ29vcmRpbmF0ZXMgPSAnJztcblxuICAgIGZvciAodmFyIGkgPSBvZmZzZXQ7IGkgPCBlbmQ7IGkgKz0gc3RyaWRlKSB7XG4gICAgICB2YXIgeCA9IGZsYXRDb29yZGluYXRlc1tpXTtcbiAgICAgIHZhciB5ID0gZmxhdENvb3JkaW5hdGVzW2kgKyAxXTtcbiAgICAgIHggPSBNYXRoLmZsb29yKHggLyB0aGlzLmFjY3VyYWN5Xyk7XG4gICAgICB5ID0gTWF0aC5mbG9vcih5IC8gdGhpcy5hY2N1cmFjeV8pO1xuICAgICAgdmFyIGR4ID0geCAtIHRoaXMucHJldlhfO1xuICAgICAgdmFyIGR5ID0geSAtIHRoaXMucHJldllfO1xuICAgICAgdGhpcy5wcmV2WF8gPSB4O1xuICAgICAgdGhpcy5wcmV2WV8gPSB5O1xuICAgICAgZW5jb2RlZENvb3JkaW5hdGVzICs9IGVuY29kZVNpZ25lZE51bWJlcl8oZHgpICsgZW5jb2RlU2lnbmVkTnVtYmVyXyhkeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuY29kZWRDb29yZGluYXRlcztcbiAgfTtcblxuICBfcHJvdG8ucmVhZEZlYXR1cmVGcm9tVGV4dCA9IGZ1bmN0aW9uIHJlYWRGZWF0dXJlRnJvbVRleHQodGV4dCwgb3B0X29wdGlvbnMpIHtcbiAgICBjb25zb2xlLmFzc2VydCh0ZXh0Lmxlbmd0aCA+IDIpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRleHRbMV0gPT09ICcoJyk7XG4gICAgY29uc29sZS5hc3NlcnQodGV4dC5lbmRzV2l0aCgnKScpKTtcbiAgICB2YXIgc3BsaXRJbmRleCA9IHRleHQuaW5kZXhPZignficpO1xuICAgIHZhciBnZW9tZXRyeVRleHQgPSBzcGxpdEluZGV4ID49IDAgPyB0ZXh0LnN1YnN0cmluZygwLCBzcGxpdEluZGV4KSArIFwiKVwiIDogdGV4dDtcbiAgICB2YXIgZ2VvbWV0cnkgPSB0aGlzLnJlYWRHZW9tZXRyeUZyb21UZXh0KGdlb21ldHJ5VGV4dCwgb3B0X29wdGlvbnMpO1xuICAgIHZhciBmZWF0dXJlID0gbmV3IG9sRmVhdHVyZShnZW9tZXRyeSk7XG5cbiAgICBpZiAoc3BsaXRJbmRleCA+PSAwKSB7XG4gICAgICB2YXIgYXR0cmlidXRlc0FuZFN0eWxlc1RleHQgPSB0ZXh0LnN1YnN0cmluZyhzcGxpdEluZGV4ICsgMSwgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgIHNwbGl0SW5kZXggPSBhdHRyaWJ1dGVzQW5kU3R5bGVzVGV4dC5pbmRleE9mKCd+Jyk7XG4gICAgICB2YXIgYXR0cmlidXRlc1RleHQgPSBzcGxpdEluZGV4ID49IDAgPyBhdHRyaWJ1dGVzQW5kU3R5bGVzVGV4dC5zdWJzdHJpbmcoMCwgc3BsaXRJbmRleCkgOiBhdHRyaWJ1dGVzQW5kU3R5bGVzVGV4dDtcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNUZXh0ICE9ICcnKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGF0dHJpYnV0ZXNUZXh0LnNwbGl0KFwiJ1wiKTtcblxuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHBhcnRzKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIgZW5jb2RlZFBhcnQgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICB2YXIgcGFydCA9IGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkUGFydCk7XG4gICAgICAgICAgdmFyIGtleVZhbCA9IHBhcnQuc3BsaXQoJyonKTtcbiAgICAgICAgICBjb25zb2xlLmFzc2VydChrZXlWYWwubGVuZ3RoID09PSAyKTtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5VmFsWzBdO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGtleVZhbFsxXTtcblxuICAgICAgICAgIGlmICghdGhpcy5zZXRTdHlsZV8gJiYgTGVnYWN5UHJvcGVydGllc19ba2V5XSkge1xuICAgICAgICAgICAga2V5ID0gTGVnYWN5UHJvcGVydGllc19ba2V5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmZWF0dXJlLnNldChrZXksIGNhc3RWYWx1ZV8oa2V5LCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzcGxpdEluZGV4ID49IDApIHtcbiAgICAgICAgdmFyIHN0eWxlc1RleHQgPSBhdHRyaWJ1dGVzQW5kU3R5bGVzVGV4dC5zdWJzdHJpbmcoc3BsaXRJbmRleCArIDEpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldFN0eWxlXykge1xuICAgICAgICAgIHNldFN0eWxlSW5GZWF0dXJlXyhzdHlsZXNUZXh0LCBmZWF0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRTdHlsZVByb3BlcnRpZXNfKHN0eWxlc1RleHQsIGZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZlYXR1cmU7XG4gIH07XG5cbiAgX3Byb3RvLnJlYWRGZWF0dXJlc0Zyb21UZXh0ID0gZnVuY3Rpb24gcmVhZEZlYXR1cmVzRnJvbVRleHQodGV4dCwgb3B0X29wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGNvbnNvbGUuYXNzZXJ0KHRleHQuc3RhcnRzV2l0aCgnRicpKTtcbiAgICB0aGlzLnByZXZYXyA9IDA7XG4gICAgdGhpcy5wcmV2WV8gPSAwO1xuICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygxKTtcblxuICAgIHdoaWxlICh0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBpbmRleCA9IHRleHQuaW5kZXhPZignKScpO1xuICAgICAgY29uc29sZS5hc3NlcnQoaW5kZXggPj0gMCk7XG4gICAgICB2YXIgZmVhdHVyZSA9IHRoaXMucmVhZEZlYXR1cmVGcm9tVGV4dCh0ZXh0LnN1YnN0cmluZygwLCBpbmRleCArIDEpLCBvcHRfb3B0aW9ucyk7XG4gICAgICBmZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKGluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIF90aGlzMi5kZWZhdWx0VmFsdWVzXykge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSBMZWdhY3lQcm9wZXJ0aWVzX1trZXldO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLmdldChwcm9wZXJ0eSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZlYXR1cmUuc2V0KHByb3BlcnR5LCBfdGhpczIuZGVmYXVsdFZhbHVlc19ba2V5XS5jYWxsKG51bGwsIGZlYXR1cmUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmZWF0dXJlcztcbiAgfTtcblxuICBfcHJvdG8ucmVhZEdlb21ldHJ5RnJvbVRleHQgPSBmdW5jdGlvbiByZWFkR2VvbWV0cnlGcm9tVGV4dCh0ZXh0LCBvcHRfb3B0aW9ucykge1xuICAgIHZhciBnZW9tZXRyeVJlYWRlciA9IEdFT01FVFJZX1JFQURFUlNfW3RleHRbMF1dO1xuICAgIGNvbnNvbGUuYXNzZXJ0KGdlb21ldHJ5UmVhZGVyICE9PSB1bmRlZmluZWQpO1xuICAgIHJldHVybiBnZW9tZXRyeVJlYWRlci5jYWxsKHRoaXMsIHRleHQpO1xuICB9O1xuXG4gIF9wcm90by53cml0ZUZlYXR1cmVUZXh0ID0gZnVuY3Rpb24gd3JpdGVGZWF0dXJlVGV4dChmZWF0dXJlLCBvcHRfb3B0aW9ucykge1xuICAgIHZhciBlbmNvZGVkUGFydHMgPSBbXTtcbiAgICB2YXIgZW5jb2RlZEdlb21ldHJ5ID0gJyc7XG4gICAgdmFyIGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuXG4gICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICBlbmNvZGVkR2VvbWV0cnkgPSB0aGlzLndyaXRlR2VvbWV0cnlUZXh0KGdlb21ldHJ5LCBvcHRfb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGVuY29kZWRHZW9tZXRyeS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmFzc2VydChlbmNvZGVkR2VvbWV0cnkuZW5kc1dpdGgoJyknKSk7XG4gICAgICBlbmNvZGVkR2VvbWV0cnkgPSBlbmNvZGVkR2VvbWV0cnkuc3Vic3RyaW5nKDAsIGVuY29kZWRHZW9tZXRyeS5sZW5ndGggLSAxKTtcbiAgICAgIGVuY29kZWRQYXJ0cy5wdXNoKGVuY29kZWRHZW9tZXRyeSk7XG4gICAgfVxuXG4gICAgdmFyIGVuY29kZWRQcm9wZXJ0aWVzID0gW107XG4gICAgdmFyIHByb3BGdW5jdGlvbiA9IHRoaXMucHJvcGVydGllc0Z1bmN0aW9uXyhmZWF0dXJlKTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wRnVuY3Rpb24pIHtcbiAgICAgIHZhciB2YWx1ZSA9IHByb3BGdW5jdGlvbltrZXldO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiBrZXkgIT09IGZlYXR1cmUuZ2V0R2VvbWV0cnlOYW1lKCkpIHtcbiAgICAgICAgaWYgKGVuY29kZWRQcm9wZXJ0aWVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGVuY29kZWRQcm9wZXJ0aWVzLnB1c2goXCInXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuY29kZWQgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5LnJlcGxhY2UoL1soKScqXS9nLCAnXycpICsgXCIqXCIgKyB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL1soKScqXS9nLCAnXycpKTtcbiAgICAgICAgZW5jb2RlZFByb3BlcnRpZXMucHVzaChlbmNvZGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW5jb2RlZFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgZW5jb2RlZFBhcnRzLnB1c2goJ34nKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVuY29kZWRQYXJ0cywgZW5jb2RlZFByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuY29kZVN0eWxlc18pIHtcbiAgICAgIHZhciBzdHlsZUZ1bmN0aW9uID0gZmVhdHVyZS5nZXRTdHlsZUZ1bmN0aW9uKCk7XG5cbiAgICAgIGlmIChzdHlsZUZ1bmN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IHN0eWxlRnVuY3Rpb24oZmVhdHVyZSwgMCk7XG5cbiAgICAgICAgaWYgKHN0eWxlcykge1xuICAgICAgICAgIHZhciBlbmNvZGVkU3R5bGVzID0gW107XG4gICAgICAgICAgc3R5bGVzID0gQXJyYXkuaXNBcnJheShzdHlsZXMpID8gc3R5bGVzIDogW3N0eWxlc107XG5cbiAgICAgICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbmNvZGVTdHlsZXNfKHN0eWxlcywgZ2VvbWV0cnkuZ2V0VHlwZSgpLCBlbmNvZGVkU3R5bGVzKTtcblxuICAgICAgICAgIGlmIChlbmNvZGVkU3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVuY29kZWRQYXJ0cy5wdXNoKCd+Jyk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbmNvZGVkUGFydHMsIGVuY29kZWRTdHlsZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGVuY29kZWRQYXJ0cy5wdXNoKCcpJyk7XG4gICAgcmV0dXJuIGVuY29kZWRQYXJ0cy5qb2luKCcnKTtcbiAgfTtcblxuICBfcHJvdG8ud3JpdGVGZWF0dXJlc1RleHQgPSBmdW5jdGlvbiB3cml0ZUZlYXR1cmVzVGV4dChmZWF0dXJlcywgb3B0X29wdGlvbnMpIHtcbiAgICB0aGlzLnByZXZYXyA9IDA7XG4gICAgdGhpcy5wcmV2WV8gPSAwO1xuICAgIHZhciB0ZXh0QXJyYXkgPSBbXTtcblxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0ZXh0QXJyYXkucHVzaCgnRicpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWkgPSBmZWF0dXJlcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XG4gICAgICAgIHRleHRBcnJheS5wdXNoKHRoaXMud3JpdGVGZWF0dXJlVGV4dChmZWF0dXJlc1tpXSwgb3B0X29wdGlvbnMpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dEFycmF5LmpvaW4oJycpO1xuICB9O1xuXG4gIF9wcm90by53cml0ZUdlb21ldHJ5VGV4dCA9IGZ1bmN0aW9uIHdyaXRlR2VvbWV0cnlUZXh0KGdlb21ldHJ5LCBvcHRfb3B0aW9ucykge1xuICAgIHZhciBnZW9tZXRyeVdyaXRlciA9IEdFT01FVFJZX1dSSVRFUlNfW2dlb21ldHJ5LmdldFR5cGUoKV07XG4gICAgY29uc29sZS5hc3NlcnQoZ2VvbWV0cnlXcml0ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgdmFyIHRyYW5zZm9ybWVkR2VvbWV0cnkgPSB0cmFuc2Zvcm1HZW9tZXRyeVdpdGhPcHRpb25zKGdlb21ldHJ5LCB0cnVlLCBvcHRfb3B0aW9ucyk7XG5cbiAgICBpZiAoISh0cmFuc2Zvcm1lZEdlb21ldHJ5IGluc3RhbmNlb2YgR2VvbWV0cnkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgdHJhbnNmb3JtZWRHZW9tZXRyeScpO1xuICAgIH1cblxuICAgIHZhciBlbmNHZW9tID0gZ2VvbWV0cnlXcml0ZXIuY2FsbCh0aGlzLCB0cmFuc2Zvcm1lZEdlb21ldHJ5KTtcblxuICAgIGlmICghZW5jR2VvbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVuY29kZWRHZW9tZXRyeScpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmNHZW9tO1xuICB9O1xuXG4gIHJldHVybiBGZWF0dXJlSGFzaDtcbn0ob2xGb3JtYXRUZXh0RmVhdHVyZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVIYXNoO1xuXG5mdW5jdGlvbiBkZWZhdWx0UHJvcGVydGllc0Z1bmN0aW9uXyhmZWF0dXJlKSB7XG4gIHJldHVybiBmZWF0dXJlLmdldFByb3BlcnRpZXMoKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlU2lnbmVkTnVtYmVyXyhudW0pIHtcbiAgdmFyIHNpZ25lZE51bSA9IG51bSA8PCAxO1xuXG4gIGlmIChudW0gPCAwKSB7XG4gICAgc2lnbmVkTnVtID0gfnNpZ25lZE51bTtcbiAgfVxuXG4gIHJldHVybiBlbmNvZGVOdW1iZXJfKHNpZ25lZE51bSk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZU51bWJlcl8obnVtKSB7XG4gIHZhciBlbmNvZGVkTnVtYmVyID0gJyc7XG5cbiAgd2hpbGUgKG51bSA+PSAweDIwKSB7XG4gICAgZW5jb2RlZE51bWJlciArPSBDSEFSNjRfLmNoYXJBdCgweDIwIHwgbnVtICYgMHgxZik7XG4gICAgbnVtID4+PSA1O1xuICB9XG5cbiAgZW5jb2RlZE51bWJlciArPSBDSEFSNjRfLmNoYXJBdChudW0pO1xuICByZXR1cm4gZW5jb2RlZE51bWJlcjtcbn1cblxuZnVuY3Rpb24gZW5jb2RlU3R5bGVzXyhzdHlsZXMsIGdlb21ldHJ5VHlwZSwgZW5jb2RlZFN0eWxlcykge1xuICB2YXIgc3R5bGVUeXBlID0gU3R5bGVUeXBlc19bZ2VvbWV0cnlUeXBlXTtcbiAgY29uc29sZS5hc3NlcnQoc3R5bGVUeXBlICE9PSB1bmRlZmluZWQpO1xuXG4gIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHN0eWxlcyksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgdmFyIHN0eWxlID0gX3N0ZXAyLnZhbHVlO1xuICAgIHZhciBmaWxsU3R5bGUgPSBzdHlsZS5nZXRGaWxsKCk7XG4gICAgdmFyIGltYWdlU3R5bGUgPSBzdHlsZS5nZXRJbWFnZSgpO1xuICAgIHZhciBzdHJva2VTdHlsZSA9IHN0eWxlLmdldFN0cm9rZSgpO1xuICAgIHZhciB0ZXh0U3R5bGUgPSBzdHlsZS5nZXRUZXh0KCk7XG5cbiAgICBpZiAoc3R5bGVUeXBlID09IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZS5QT0xZR09OKSB7XG4gICAgICBpZiAoZmlsbFN0eWxlICE9PSBudWxsKSB7XG4gICAgICAgIGVuY29kZVN0eWxlUG9seWdvbl8oZmlsbFN0eWxlLCBzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdHlsZVR5cGUgPT0gbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLkxJTkVfU1RSSU5HKSB7XG4gICAgICBpZiAoc3Ryb2tlU3R5bGUgIT09IG51bGwpIHtcbiAgICAgICAgZW5jb2RlU3R5bGVMaW5lXyhzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzdHlsZVR5cGUgPT0gbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLlBPSU5UKSB7XG4gICAgICBpZiAoaW1hZ2VTdHlsZSAhPT0gbnVsbCkge1xuICAgICAgICBlbmNvZGVTdHlsZVBvaW50XyhpbWFnZVN0eWxlLCBlbmNvZGVkU3R5bGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGV4dFN0eWxlICE9PSBudWxsKSB7XG4gICAgICBlbmNvZGVTdHlsZVRleHRfKHRleHRTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVuY29kZVN0eWxlTGluZV8oc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgZW5jb2RlU3R5bGVTdHJva2VfKHN0cm9rZVN0eWxlLCBlbmNvZGVkU3R5bGVzKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlU3R5bGVQb2ludF8oaW1hZ2VTdHlsZSwgZW5jb2RlZFN0eWxlcykge1xuICBpZiAoaW1hZ2VTdHlsZSBpbnN0YW5jZW9mIG9sU3R5bGVDaXJjbGUpIHtcbiAgICB2YXIgcmFkaXVzID0gaW1hZ2VTdHlsZS5nZXRSYWRpdXMoKTtcblxuICAgIGlmIChlbmNvZGVkU3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVuY29kZWRTdHlsZXMucHVzaChcIidcIik7XG4gICAgfVxuXG4gICAgZW5jb2RlZFN0eWxlcy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChcInBvaW50UmFkaXVzKlwiICsgcmFkaXVzKSk7XG4gICAgdmFyIGZpbGxTdHlsZSA9IGltYWdlU3R5bGUuZ2V0RmlsbCgpO1xuXG4gICAgaWYgKGZpbGxTdHlsZSAhPT0gbnVsbCkge1xuICAgICAgZW5jb2RlU3R5bGVGaWxsXyhmaWxsU3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuICAgIH1cblxuICAgIHZhciBzdHJva2VTdHlsZSA9IGltYWdlU3R5bGUuZ2V0U3Ryb2tlKCk7XG5cbiAgICBpZiAoc3Ryb2tlU3R5bGUgIT09IG51bGwpIHtcbiAgICAgIGVuY29kZVN0eWxlU3Ryb2tlXyhzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVuY29kZVN0eWxlUG9seWdvbl8oZmlsbFN0eWxlLCBzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcykge1xuICBlbmNvZGVTdHlsZUZpbGxfKGZpbGxTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG5cbiAgaWYgKHN0cm9rZVN0eWxlICE9PSBudWxsKSB7XG4gICAgZW5jb2RlU3R5bGVTdHJva2VfKHN0cm9rZVN0eWxlLCBlbmNvZGVkU3R5bGVzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVTdHlsZUZpbGxfKGZpbGxTdHlsZSwgZW5jb2RlZFN0eWxlcywgcHJvcGVydHlOYW1lKSB7XG4gIGlmIChwcm9wZXJ0eU5hbWUgPT09IHZvaWQgMCkge1xuICAgIHByb3BlcnR5TmFtZSA9ICdmaWxsQ29sb3InO1xuICB9XG5cbiAgdmFyIGZpbGxDb2xvciA9IGZpbGxTdHlsZS5nZXRDb2xvcigpO1xuICB2YXIgZmlsbENvbG9ySGV4O1xuXG4gIGlmIChmaWxsQ29sb3IgIT09IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxsQ29sb3IpKSB7XG4gICAgICBmaWxsQ29sb3JIZXggPSByZ2JBcnJheVRvSGV4KGZpbGxDb2xvcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsbENvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgZmlsbENvbG9ySGV4ID0gcmdiQXJyYXlUb0hleChhc0NvbG9yQXJyYXkoZmlsbENvbG9yKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgY29sb3InKTtcbiAgICB9XG5cbiAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlbmNvZGVkU3R5bGVzLnB1c2goXCInXCIpO1xuICAgIH1cblxuICAgIGVuY29kZWRTdHlsZXMucHVzaChlbmNvZGVVUklDb21wb25lbnQocHJvcGVydHlOYW1lICsgXCIqXCIgKyBmaWxsQ29sb3JIZXgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVTdHlsZVN0cm9rZV8oc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgdmFyIHN0cm9rZUNvbG9yID0gc3Ryb2tlU3R5bGUuZ2V0Q29sb3IoKTtcblxuICBpZiAoc3Ryb2tlQ29sb3IgIT09IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHJva2VDb2xvcikpIHtcbiAgICAgIHZhciBzdHJva2VDb2xvckhleCA9IHJnYkFycmF5VG9IZXgoc3Ryb2tlQ29sb3IpO1xuXG4gICAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVuY29kZWRTdHlsZXMucHVzaChcIidcIik7XG4gICAgICB9XG5cbiAgICAgIGVuY29kZWRTdHlsZXMucHVzaChlbmNvZGVVUklDb21wb25lbnQoXCJzdHJva2VDb2xvcipcIiArIHN0cm9rZUNvbG9ySGV4KSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHN0cm9rZVdpZHRoID0gc3Ryb2tlU3R5bGUuZ2V0V2lkdGgoKTtcblxuICBpZiAoc3Ryb2tlV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChlbmNvZGVkU3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVuY29kZWRTdHlsZXMucHVzaChcIidcIik7XG4gICAgfVxuXG4gICAgZW5jb2RlZFN0eWxlcy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChcInN0cm9rZVdpZHRoKlwiICsgc3Ryb2tlV2lkdGgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVTdHlsZVRleHRfKHRleHRTdHlsZSwgZW5jb2RlZFN0eWxlcykge1xuICB2YXIgZm9udFN0eWxlID0gdGV4dFN0eWxlLmdldEZvbnQoKTtcblxuICBpZiAoZm9udFN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZm9udCA9IGZvbnRTdHlsZS5zcGxpdCgnICcpO1xuXG4gICAgaWYgKGZvbnQubGVuZ3RoID49IDMpIHtcbiAgICAgIGlmIChlbmNvZGVkU3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZW5jb2RlZFN0eWxlcy5wdXNoKFwiJ1wiKTtcbiAgICAgIH1cblxuICAgICAgZW5jb2RlZFN0eWxlcy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChcImZvbnRTaXplKlwiICsgZm9udFsxXSkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBmaWxsU3R5bGUgPSB0ZXh0U3R5bGUuZ2V0RmlsbCgpO1xuXG4gIGlmIChmaWxsU3R5bGUgIT09IG51bGwpIHtcbiAgICBlbmNvZGVTdHlsZUZpbGxfKGZpbGxTdHlsZSwgZW5jb2RlZFN0eWxlcywgJ2ZvbnRDb2xvcicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRMaW5lU3RyaW5nR2VvbWV0cnlfKHRleHQpIHtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5zdGFydHNXaXRoKCdsKCcpKTtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5lbmRzV2l0aCgnKScpKTtcbiAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDIsIHRleHQubGVuZ3RoIC0gMSk7XG4gIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSB0aGlzLmRlY29kZUNvb3JkaW5hdGVzXyh0ZXh0KTtcbiAgcmV0dXJuIG5ldyBvbEdlb21MaW5lU3RyaW5nKGZsYXRDb29yZGluYXRlcywgJ1hZJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRNdWx0aUxpbmVTdHJpbmdHZW9tZXRyeV8odGV4dCkge1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LnN0YXJ0c1dpdGgoJ0woJykpO1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LmVuZHNXaXRoKCcpJykpO1xuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMiwgdGV4dC5sZW5ndGggLSAxKTtcbiAgdmFyIGZsYXRDb29yZGluYXRlcyA9IFtdO1xuICB2YXIgZW5kcyA9IFtdO1xuICB2YXIgbGluZVN0cmluZ3MgPSB0ZXh0LnNwbGl0KFwiJ1wiKTtcblxuICBmb3IgKHZhciBpID0gMCwgaWkgPSBsaW5lU3RyaW5ncy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XG4gICAgZmxhdENvb3JkaW5hdGVzID0gdGhpcy5kZWNvZGVDb29yZGluYXRlc18obGluZVN0cmluZ3NbaV0sIGZsYXRDb29yZGluYXRlcyk7XG4gICAgZW5kc1tpXSA9IGZsYXRDb29yZGluYXRlcy5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gbmV3IG9sR2VvbU11bHRpTGluZVN0cmluZyhmbGF0Q29vcmRpbmF0ZXMsICdYWScsIGVuZHMpO1xufVxuXG5mdW5jdGlvbiByZWFkUG9pbnRHZW9tZXRyeV8odGV4dCkge1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LnN0YXJ0c1dpdGgoJ3AoJykpO1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LmVuZHNXaXRoKCcpJykpO1xuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMiwgdGV4dC5sZW5ndGggLSAxKTtcbiAgdmFyIGZsYXRDb29yZGluYXRlcyA9IHRoaXMuZGVjb2RlQ29vcmRpbmF0ZXNfKHRleHQpO1xuICBjb25zb2xlLmFzc2VydChmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoID09PSAyKTtcbiAgcmV0dXJuIG5ldyBvbEdlb21Qb2ludChmbGF0Q29vcmRpbmF0ZXMsICdYWScpO1xufVxuXG5mdW5jdGlvbiByZWFkTXVsdGlQb2ludEdlb21ldHJ5Xyh0ZXh0KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuc3RhcnRzV2l0aCgnUCgnKSk7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuZW5kc1dpdGgoJyknKSk7XG4gIHRleHQgPSB0ZXh0LnN1YnN0cmluZygyLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICB2YXIgZmxhdENvb3JkaW5hdGVzID0gdGhpcy5kZWNvZGVDb29yZGluYXRlc18odGV4dCk7XG4gIHJldHVybiBuZXcgb2xHZW9tTXVsdGlQb2ludChmbGF0Q29vcmRpbmF0ZXMsICdYWScpO1xufVxuXG5mdW5jdGlvbiByZWFkUG9seWdvbkdlb21ldHJ5Xyh0ZXh0KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuc3RhcnRzV2l0aCgnYSgnKSk7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuZW5kc1dpdGgoJyknKSk7XG4gIHRleHQgPSB0ZXh0LnN1YnN0cmluZygyLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICB2YXIgZmxhdENvb3JkaW5hdGVzID0gW107XG4gIHZhciBlbmRzID0gW107XG4gIHZhciByaW5ncyA9IHRleHQuc3BsaXQoXCInXCIpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IHJpbmdzLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcbiAgICBmbGF0Q29vcmRpbmF0ZXMgPSB0aGlzLmRlY29kZUNvb3JkaW5hdGVzXyhyaW5nc1tpXSwgZmxhdENvb3JkaW5hdGVzKTtcbiAgICB2YXIgZW5kID0gZmxhdENvb3JkaW5hdGVzLmxlbmd0aDtcblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzBdO1xuICAgICAgZmxhdENvb3JkaW5hdGVzW2VuZCsrXSA9IGZsYXRDb29yZGluYXRlc1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxhdENvb3JkaW5hdGVzW2VuZCsrXSA9IGZsYXRDb29yZGluYXRlc1tlbmRzW2kgLSAxXV07XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzW2VuZHNbaSAtIDFdICsgMV07XG4gICAgfVxuXG4gICAgZW5kc1tpXSA9IGVuZDtcbiAgfVxuXG4gIHJldHVybiBuZXcgb2xHZW9tUG9seWdvbihmbGF0Q29vcmRpbmF0ZXMsICdYWScsIGVuZHMpO1xufVxuXG5mdW5jdGlvbiByZWFkTXVsdGlQb2x5Z29uR2VvbWV0cnlfKHRleHQpIHtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5zdGFydHNXaXRoKCdBKCcpKTtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5lbmRzV2l0aCgnKScpKTtcbiAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDIsIHRleHQubGVuZ3RoIC0gMSk7XG4gIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBbXTtcbiAgdmFyIGVuZHNzID0gW107XG4gIHZhciBwb2x5Z29ucyA9IHRleHQuc3BsaXQoJykoJyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGlpID0gcG9seWdvbnMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgIHZhciByaW5ncyA9IHBvbHlnb25zW2ldLnNwbGl0KFwiJ1wiKTtcbiAgICBlbmRzc1tpXSA9IFtdO1xuICAgIHZhciBlbmRzID0gZW5kc3NbaV07XG5cbiAgICBmb3IgKHZhciBqID0gMCwgamogPSByaW5ncy5sZW5ndGg7IGogPCBqajsgKytqKSB7XG4gICAgICBmbGF0Q29vcmRpbmF0ZXMgPSB0aGlzLmRlY29kZUNvb3JkaW5hdGVzXyhyaW5nc1tqXSwgZmxhdENvb3JkaW5hdGVzKTtcbiAgICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuXG4gICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzBdO1xuICAgICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmxhdENvb3JkaW5hdGVzW2VuZCsrXSA9IGZsYXRDb29yZGluYXRlc1tlbmRzW2ogLSAxXV07XG4gICAgICAgIGZsYXRDb29yZGluYXRlc1tlbmQrK10gPSBmbGF0Q29vcmRpbmF0ZXNbZW5kc1tqIC0gMV0gKyAxXTtcbiAgICAgIH1cblxuICAgICAgZW5kc1tqXSA9IGVuZDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IG9sR2VvbU11bHRpUG9seWdvbihmbGF0Q29vcmRpbmF0ZXMsICdYWScsIGVuZHNzKTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGVJbkZlYXR1cmVfKHRleHQsIGZlYXR1cmUpIHtcbiAgaWYgKHRleHQgPT0gJycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcHJvcGVydGllcyA9IGdldFN0eWxlUHJvcGVydGllc18odGV4dCwgZmVhdHVyZSk7XG4gIHZhciBmaWxsQ29sb3IgPSBwcm9wZXJ0aWVzLmZpbGxDb2xvcjtcbiAgdmFyIGZvbnRTaXplID0gcHJvcGVydGllcy5mb250U2l6ZTtcbiAgdmFyIGZvbnRDb2xvciA9IHByb3BlcnRpZXMuZm9udENvbG9yO1xuICB2YXIgcG9pbnRSYWRpdXMgPSBwcm9wZXJ0aWVzLnBvaW50UmFkaXVzO1xuICB2YXIgc3Ryb2tlQ29sb3IgPSBwcm9wZXJ0aWVzLnN0cm9rZUNvbG9yO1xuICB2YXIgc3Ryb2tlV2lkdGggPSBwcm9wZXJ0aWVzLnN0cm9rZVdpZHRoO1xuICB2YXIgZmlsbFN0eWxlID0gbnVsbDtcblxuICBpZiAoZmlsbENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICBmaWxsU3R5bGUgPSBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6IGZpbGxDb2xvclxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHN0cm9rZVN0eWxlID0gbnVsbDtcblxuICBpZiAoc3Ryb2tlQ29sb3IgIT09IHVuZGVmaW5lZCAmJiBzdHJva2VXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJva2VXaWR0aCAhPSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHN0cm9rZVdpZHRoJyk7XG4gICAgfVxuXG4gICAgc3Ryb2tlU3R5bGUgPSBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICBjb2xvcjogc3Ryb2tlQ29sb3IsXG4gICAgICB3aWR0aDogc3Ryb2tlV2lkdGhcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBpbWFnZVN0eWxlID0gbnVsbDtcblxuICBpZiAocG9pbnRSYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgcG9pbnRSYWRpdXMgIT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwb2ludFJhZGl1cycpO1xuICAgIH1cblxuICAgIHZhciBfb3B0aW9ucyA9IHtcbiAgICAgIHJhZGl1czogcG9pbnRSYWRpdXNcbiAgICB9O1xuXG4gICAgaWYgKGZpbGxTdHlsZSkge1xuICAgICAgX29wdGlvbnMuZmlsbCA9IGZpbGxTdHlsZTtcbiAgICB9XG5cbiAgICBpZiAoc3Ryb2tlU3R5bGUpIHtcbiAgICAgIF9vcHRpb25zLnN0cm9rZSA9IHN0cm9rZVN0eWxlO1xuICAgIH1cblxuICAgIGltYWdlU3R5bGUgPSBuZXcgb2xTdHlsZUNpcmNsZShfb3B0aW9ucyk7XG4gICAgZmlsbFN0eWxlID0gbnVsbDtcbiAgICBzdHJva2VTdHlsZSA9IG51bGw7XG4gIH1cblxuICB2YXIgdGV4dFN0eWxlID0gbnVsbDtcblxuICBpZiAoZm9udFNpemUgIT09IHVuZGVmaW5lZCAmJiBmb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgIHRleHRTdHlsZSA9IG5ldyBvbFN0eWxlVGV4dCh7XG4gICAgICBmb250OiBmb250U2l6ZSArIFwiIHNhbnMtc2VyaWZcIixcbiAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgIGNvbG9yOiBmb250Q29sb3JcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gIGlmIChmaWxsU3R5bGUpIHtcbiAgICBvcHRpb25zLmZpbGwgPSBmaWxsU3R5bGU7XG4gIH1cblxuICBpZiAoc3Ryb2tlU3R5bGUpIHtcbiAgICBvcHRpb25zLnN0cm9rZSA9IHN0cm9rZVN0eWxlO1xuICB9XG5cbiAgaWYgKGltYWdlU3R5bGUpIHtcbiAgICBvcHRpb25zLmltYWdlID0gaW1hZ2VTdHlsZTtcbiAgfVxuXG4gIGlmICh0ZXh0U3R5bGUpIHtcbiAgICBvcHRpb25zLnRleHQgPSB0ZXh0U3R5bGU7XG4gIH1cblxuICB2YXIgc3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKG9wdGlvbnMpO1xuICBmZWF0dXJlLnNldFN0eWxlKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGVQcm9wZXJ0aWVzXyh0ZXh0LCBmZWF0dXJlKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gZ2V0U3R5bGVQcm9wZXJ0aWVzXyh0ZXh0LCBmZWF0dXJlKTtcbiAgdmFyIGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuXG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSB7XG4gICAgaWYgKHByb3BlcnRpZXMuaXNMYWJlbCB8fCBwcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19URVhUXSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXMuc3Ryb2tlQ29sb3I7XG4gICAgICBkZWxldGUgcHJvcGVydGllcy5maWxsQ29sb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmZvbnRDb2xvcjtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmZvbnRTaXplO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgcHJvcGVydGllcy5mb250Q29sb3I7XG5cbiAgICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21MaW5lU3RyaW5nKSB7XG4gICAgICBkZWxldGUgcHJvcGVydGllcy5maWxsQ29sb3I7XG4gICAgICBkZWxldGUgcHJvcGVydGllcy5maWxsT3BhY2l0eTtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvcGVydGllcy5mb250U2l6ZSkge1xuICAgIHZhciBmb250U2l6ZVN0ciA9IHByb3BlcnRpZXMuZm9udFNpemU7XG5cbiAgICBpZiAodHlwZW9mIGZvbnRTaXplU3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBmb250U2l6ZVN0ciB0eXBlJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvbnRTaXplID0gcGFyc2VGbG9hdChmb250U2l6ZVN0cik7XG5cbiAgICBpZiAoZm9udFNpemVTdHIuaW5jbHVkZXMoJ3B4JykpIHtcbiAgICAgIGZvbnRTaXplID0gTWF0aC5yb3VuZChmb250U2l6ZSAvIDEuMzMzMzMzKTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzLmZvbnRTaXplID0gZm9udFNpemU7XG4gIH1cblxuICB2YXIgY2xvbmUgPSB7fTtcblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgIHZhciB2YWx1ZSA9IHByb3BlcnRpZXNba2V5XTtcblxuICAgIGlmIChMZWdhY3lQcm9wZXJ0aWVzX1trZXldKSB7XG4gICAgICBjbG9uZVtMZWdhY3lQcm9wZXJ0aWVzX1trZXldXSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbG9uZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZmVhdHVyZS5zZXRQcm9wZXJ0aWVzKGNsb25lKTtcbn1cblxuZnVuY3Rpb24gY2FzdFZhbHVlXyhrZXksIHZhbHVlKSB7XG4gIHZhciBudW1Qcm9wZXJ0aWVzID0gW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5BTkdMRSwgbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk9QQUNJVFksIG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TSVpFLCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFLCAncG9pbnRSYWRpdXMnLCAnc3Ryb2tlV2lkdGgnXTtcbiAgdmFyIGJvb2xQcm9wZXJ0aWVzID0gW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19DSVJDTEUsIG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19SRUNUQU5HTEUsIG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19URVhULCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU0hPV19NRUFTVVJFLCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU0hPV19MQUJFTCwgJ2lzQ2lyY2xlJywgJ2lzUmVjdGFuZ2xlJywgJ2lzTGFiZWwnLCAnc2hvd01lYXN1cmUnLCAnc2hvd0xhYmVsJ107XG5cbiAgaWYgKG51bVByb3BlcnRpZXMuaW5jbHVkZXMoa2V5KSkge1xuICAgIHJldHVybiArdmFsdWU7XG4gIH0gZWxzZSBpZiAoYm9vbFByb3BlcnRpZXMuaW5jbHVkZXMoa2V5KSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTdHlsZVByb3BlcnRpZXNfKHRleHQsIGZlYXR1cmUpIHtcbiAgdmFyIHBhcnRzID0gdGV4dC5zcGxpdChcIidcIik7XG4gIHZhciBwcm9wZXJ0aWVzID0ge307XG5cbiAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UocGFydHMpLCBfc3RlcDM7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMygpKS5kb25lOykge1xuICAgIHZhciBlbmNvZGVkUGFydCA9IF9zdGVwMy52YWx1ZTtcbiAgICB2YXIgcGFydCA9IGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkUGFydCk7XG4gICAgdmFyIGtleVZhbCA9IHBhcnQuc3BsaXQoJyonKTtcbiAgICBjb25zb2xlLmFzc2VydChrZXlWYWwubGVuZ3RoID09PSAyKTtcbiAgICB2YXIga2V5ID0ga2V5VmFsWzBdO1xuICAgIHZhciB2YWwgPSBrZXlWYWxbMV07XG4gICAgcHJvcGVydGllc1trZXldID0gY2FzdFZhbHVlXyhrZXksIHZhbCk7XG4gIH1cblxuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gd3JpdGVMaW5lU3RyaW5nR2VvbWV0cnlfKGdlb21ldHJ5KSB7XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbUxpbmVTdHJpbmcpIHtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgIHJldHVybiBcImwoXCIgKyB0aGlzLmVuY29kZUNvb3JkaW5hdGVzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgMCwgZW5kKSArIFwiKVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHdyaXRlTXVsdGlMaW5lU3RyaW5nR2VvbWV0cnlfKGdlb21ldHJ5KSB7XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbU11bHRpTGluZVN0cmluZykge1xuICAgIHZhciBlbmRzID0gZ2VvbWV0cnkuZ2V0RW5kcygpO1xuICAgIHZhciBsaW5lU3RyaW5nQ291bnQgPSBlbmRzLmxlbmd0aDtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciB0ZXh0QXJyYXkgPSBbJ0woJ107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVTdHJpbmdDb3VudDsgKytpKSB7XG4gICAgICB2YXIgZW5kID0gZW5kc1tpXTtcbiAgICAgIHZhciB0ZXh0ID0gdGhpcy5lbmNvZGVDb29yZGluYXRlc18oZmxhdENvb3JkaW5hdGVzLCBzdHJpZGUsIG9mZnNldCwgZW5kKTtcblxuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgdGV4dEFycmF5LnB1c2goXCInXCIpO1xuICAgICAgfVxuXG4gICAgICB0ZXh0QXJyYXkucHVzaCh0ZXh0KTtcbiAgICAgIG9mZnNldCA9IGVuZDtcbiAgICB9XG5cbiAgICB0ZXh0QXJyYXkucHVzaCgnKScpO1xuICAgIHJldHVybiB0ZXh0QXJyYXkuam9pbignJyk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd3JpdGVQb2ludEdlb21ldHJ5XyhnZW9tZXRyeSkge1xuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21Qb2ludCkge1xuICAgIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBnZW9tZXRyeS5nZXRGbGF0Q29vcmRpbmF0ZXMoKTtcbiAgICB2YXIgc3RyaWRlID0gZ2VvbWV0cnkuZ2V0U3RyaWRlKCk7XG4gICAgdmFyIGVuZCA9IGZsYXRDb29yZGluYXRlcy5sZW5ndGg7XG4gICAgcmV0dXJuIFwicChcIiArIHRoaXMuZW5jb2RlQ29vcmRpbmF0ZXNfKGZsYXRDb29yZGluYXRlcywgc3RyaWRlLCAwLCBlbmQpICsgXCIpXCI7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd3JpdGVNdWx0aVBvaW50R2VvbWV0cnlfKGdlb21ldHJ5KSB7XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbU11bHRpUG9pbnQpIHtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgIHJldHVybiBcIlAoXCIgKyB0aGlzLmVuY29kZUNvb3JkaW5hdGVzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgMCwgZW5kKSArIFwiKVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVJpbmdzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgb2Zmc2V0LCBlbmRzLCB0ZXh0QXJyYXkpIHtcbiAgdmFyIGxpbmVhclJpbmdDb3VudCA9IGVuZHMubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZWFyUmluZ0NvdW50OyArK2kpIHtcbiAgICB2YXIgZW5kID0gZW5kc1tpXSAtIHN0cmlkZTtcbiAgICB2YXIgdGV4dCA9IHRoaXMuZW5jb2RlQ29vcmRpbmF0ZXNfKGZsYXRDb29yZGluYXRlcywgc3RyaWRlLCBvZmZzZXQsIGVuZCk7XG5cbiAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgdGV4dEFycmF5LnB1c2goXCInXCIpO1xuICAgIH1cblxuICAgIHRleHRBcnJheS5wdXNoKHRleHQpO1xuICAgIG9mZnNldCA9IGVuZHNbaV07XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG5mdW5jdGlvbiB3cml0ZVBvbHlnb25HZW9tZXRyeV8oZ2VvbWV0cnkpIHtcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBnZW9tZXRyeS5nZXRGbGF0Q29vcmRpbmF0ZXMoKTtcbiAgICB2YXIgc3RyaWRlID0gZ2VvbWV0cnkuZ2V0U3RyaWRlKCk7XG4gICAgdmFyIGVuZHMgPSBnZW9tZXRyeS5nZXRFbmRzKCk7XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIHRleHRBcnJheSA9IFsnYSgnXTtcbiAgICBlbmNvZGVSaW5nc18uY2FsbCh0aGlzLCBmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgb2Zmc2V0LCBlbmRzLCB0ZXh0QXJyYXkpO1xuICAgIHRleHRBcnJheS5wdXNoKCcpJyk7XG4gICAgcmV0dXJuIHRleHRBcnJheS5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB3cml0ZU11bHRpUG9seWdvbkdlb21ldHJ5XyhnZW9tZXRyeSkge1xuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21NdWx0aVBvbHlnb24pIHtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBlbmRzcyA9IGdlb21ldHJ5LmdldEVuZHNzKCk7XG4gICAgdmFyIHBvbHlnb25Db3VudCA9IGVuZHNzLmxlbmd0aDtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB2YXIgdGV4dEFycmF5ID0gWydBJ107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlnb25Db3VudDsgKytpKSB7XG4gICAgICB2YXIgZW5kcyA9IGVuZHNzW2ldO1xuICAgICAgdGV4dEFycmF5LnB1c2goJygnKTtcbiAgICAgIG9mZnNldCA9IGVuY29kZVJpbmdzXy5jYWxsKHRoaXMsIGZsYXRDb29yZGluYXRlcywgc3RyaWRlLCBvZmZzZXQsIGVuZHMsIHRleHRBcnJheSk7XG4gICAgICB0ZXh0QXJyYXkucHVzaCgnKScpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0QXJyYXkuam9pbignJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBnZW9tZXRyeSB0eXBlJyk7XG4gIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7XG4gIExJTkVfU1RSSU5HOiAnTGluZVN0cmluZycsXG4gIFBPSU5UOiAnUG9pbnQnLFxuICBQT0xZR09OOiAnUG9seWdvbidcbn07Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwMkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==