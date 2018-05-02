/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/featurestyle.js"
/*!***********************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _featurestyle_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./featurestyle.scss */ "./contribs/gmf/examples/featurestyle.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_drawing_featureStyleComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/drawing/featureStyleComponent */ "./src/drawing/featureStyleComponent.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/format/FeatureProperties */ "./src/format/FeatureProperties.js");
/* harmony import */ var ngeo_misc_FeatureHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/FeatureHelper */ "./src/misc/FeatureHelper.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_Circle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/Circle */ "./node_modules/ol/geom/Circle.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
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
  gmf_drawing_featureStyleComponent__WEBPACK_IMPORTED_MODULE_2__["default"].name,
  gmf_map_component__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  ngeo_misc_FeatureHelper__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  ngeo_map_module__WEBPACK_IMPORTED_MODULE_6__["default"].name,
]);

MainController.$inject = ['$scope', 'ngeoFeatureHelper'];

/**
 * @class
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Gmf feature helper service.
 */
function MainController($scope, ngeoFeatureHelper) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
   */
  this.featureHelper_ = ngeoFeatureHelper;

  // create features
  const features = [];

  /** @type {Object<string, *>} */
  const pointProperties = {
    geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__["default"]([-8458215, 6672646]),
  };
  pointProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#009D57';
  pointProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Point1';
  pointProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].SIZE] = '6';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](pointProperties));

  /** @type {Object<string, *>} */
  const textProperties = {
    geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__["default"]([-8007848, 6209744]),
  };
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].ANGLE] = '0';
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].IS_TEXT] = true;
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Text 1';
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].SIZE] = '16';
  textProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](textProperties));

  /** @type {Object<string, *>} */
  const lineProperties = {
    geometry: new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_11__["default"]([
      [-8321240, 6523441],
      [-8103547, 6726458],
      [-8091318, 6408480],
      [-7973910, 6631065],
    ]),
  };
  lineProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#0BA9CC';
  lineProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'LineString 1';
  lineProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '4';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](lineProperties));

  /** @type {Object<string, *>} */
  const poly1Properties = {
    geometry: new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_13__["default"]([
      [
        [-8512027, 6359560],
        [-8531595, 6080718],
        [-8267428, 6031798],
        [-8238077, 6247045],
        [-8512027, 6359560],
      ],
    ]),
  };
  poly1Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#4186F0';
  poly1Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Polygon 1';
  poly1Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  poly1Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].SHOW_MEASURE] = true;
  poly1Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '1';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](poly1Properties));

  /** @type {Object<string, *>} */
  const poly2Properties = {
    geometry: new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_13__["default"]([
      [
        [-7952508, 6096617],
        [-8051570, 5959642],
        [-7848554, 5926621],
        [-7754383, 6025683],
        [-7952508, 6096617],
      ],
    ]),
  };
  poly2Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#CCCCCC';
  poly2Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Polygon 2';
  poly2Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '1';
  poly2Properties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '3';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](poly2Properties));

  /** @type {Object<string, *>} */
  const rectProperties = {
    geometry: (0,ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_13__.fromExtent)([-7874848, 6384020, -7730535, 6496535]),
  };
  rectProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  rectProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].IS_RECTANGLE] = true;
  rectProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Rectangle 1';
  rectProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  rectProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](rectProperties));

  /** @type {Object<string, *>} */
  const circleProperties = {
    geometry: (0,ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_13__.fromCircle)(new ol_geom_Circle__WEBPACK_IMPORTED_MODULE_10__["default"]([-7691093, 6166327], 35000), 64),
  };
  circleProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].COLOR] = '#000000';
  circleProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].IS_CIRCLE] = true;
  circleProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].NAME] = 'Circle 1';
  circleProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].OPACITY] = '0.5';
  circleProperties[ngeo_format_FeatureProperties__WEBPACK_IMPORTED_MODULE_4__["default"].STROKE] = '2';
  features.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_7__["default"](circleProperties));
  const view = new ol_View__WEBPACK_IMPORTED_MODULE_9__["default"]({
    center: [-8174482, 6288627],
    zoom: 6,
  });
  ngeoFeatureHelper.setProjection(view.getProjection());

  // set style
  features.forEach((feature) => {
    ngeoFeatureHelper.setStyle(feature);
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_14__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_16__["default"](),
      }),
      new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_15__["default"]({
        source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_17__["default"]({
          wrapX: false,
          features: features,
        }),
      }),
    ],
    view: view,
  });

  /**
   * @type {?olFeature<import('ol/geom/Geometry').default>}
   */
  this.selectedFeature = null;

  // @ts-ignore
  this.map.on('singleclick', (evt) => {
    return this.handleMapSingleClick_;
  });
}

/**
 * @param {import('ol/MapBrowserEvent').default<unknown>} evt MapBrowser event
 */
MainController.prototype.handleMapSingleClick_ = function (evt) {
  const pixel = evt.pixel;
  const feature =
    /** @type {olFeature<import('ol/geom/Geometry').default>} */
    this.map.forEachFeatureAtPixel(pixel, (feature) => feature);
  if (this.selectedFeature) {
    this.featureHelper_.setStyle(this.selectedFeature);
  }
  if (feature) {
    if (this.selectedFeature !== feature) {
      this.selectedFeature = feature;
      this.featureHelper_.setStyle(feature, true);
    }
  } else {
    this.selectedFeature = null;
  }
  this.scope_.$apply();
};
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_18__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./contribs/gmf/examples/featurestyle.scss"
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.scss ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"featurestyle": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./contribs/gmf/examples/featurestyle.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXN0eWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMU9BOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZmVhdHVyZXN0eWxlLmpzIiwid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZmVhdHVyZXN0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9mZWF0dXJlc3R5bGUuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZkRyYXdpbmdGZWF0dXJlU3R5bGVDb21wb25lbnQgZnJvbSAnZ21mL2RyYXdpbmcvZmVhdHVyZVN0eWxlQ29tcG9uZW50JztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcyBmcm9tICduZ2VvL2Zvcm1hdC9GZWF0dXJlUHJvcGVydGllcyc7XG5pbXBvcnQgbmdlb01pc2NGZWF0dXJlSGVscGVyIGZyb20gJ25nZW8vbWlzYy9GZWF0dXJlSGVscGVyJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sR2VvbUNpcmNsZSBmcm9tICdvbC9nZW9tL0NpcmNsZSc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IG9sR2VvbVBvbHlnb24sIHtcbiAgZnJvbUNpcmNsZSBhcyBvbEdlb21Qb2x5Z29uRnJvbUNpcmNsZSxcbiAgZnJvbUV4dGVudCBhcyBvbEdlb21Qb2x5Z29uRnJvbUV4dGVudCxcbn0gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZkRyYXdpbmdGZWF0dXJlU3R5bGVDb21wb25lbnQubmFtZSxcbiAgZ21mTWFwQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9NaXNjRmVhdHVyZUhlbHBlci5uYW1lLFxuICBuZ2VvTWFwTW9kdWxlLm5hbWUsXG5dKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ25nZW9GZWF0dXJlSGVscGVyJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvRmVhdHVyZUhlbHBlcicpLkZlYXR1cmVIZWxwZXJ9IG5nZW9GZWF0dXJlSGVscGVyIEdtZiBmZWF0dXJlIGhlbHBlciBzZXJ2aWNlLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsIG5nZW9GZWF0dXJlSGVscGVyKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9taXNjL0ZlYXR1cmVIZWxwZXInKS5GZWF0dXJlSGVscGVyfVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlSGVscGVyXyA9IG5nZW9GZWF0dXJlSGVscGVyO1xuXG4gIC8vIGNyZWF0ZSBmZWF0dXJlc1xuICBjb25zdCBmZWF0dXJlcyA9IFtdO1xuXG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59ICovXG4gIGNvbnN0IHBvaW50UHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KFstODQ1ODIxNSwgNjY3MjY0Nl0pLFxuICB9O1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDA5RDU3JztcbiAgcG9pbnRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdQb2ludDEnO1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNJWkVdID0gJzYnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUocG9pbnRQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgdGV4dFByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludChbLTgwMDc4NDgsIDYyMDk3NDRdKSxcbiAgfTtcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkFOR0xFXSA9ICcwJztcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDAwMDAwJztcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLklTX1RFWFRdID0gdHJ1ZTtcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ1RleHQgMSc7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TSVpFXSA9ICcxNic7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzInO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUodGV4dFByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCBsaW5lUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbUxpbmVTdHJpbmcoW1xuICAgICAgWy04MzIxMjQwLCA2NTIzNDQxXSxcbiAgICAgIFstODEwMzU0NywgNjcyNjQ1OF0sXG4gICAgICBbLTgwOTEzMTgsIDY0MDg0ODBdLFxuICAgICAgWy03OTczOTEwLCA2NjMxMDY1XSxcbiAgICBdKSxcbiAgfTtcbiAgbGluZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMEJBOUNDJztcbiAgbGluZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ0xpbmVTdHJpbmcgMSc7XG4gIGxpbmVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzQnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUobGluZVByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCBwb2x5MVByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2x5Z29uKFtcbiAgICAgIFtcbiAgICAgICAgWy04NTEyMDI3LCA2MzU5NTYwXSxcbiAgICAgICAgWy04NTMxNTk1LCA2MDgwNzE4XSxcbiAgICAgICAgWy04MjY3NDI4LCA2MDMxNzk4XSxcbiAgICAgICAgWy04MjM4MDc3LCA2MjQ3MDQ1XSxcbiAgICAgICAgWy04NTEyMDI3LCA2MzU5NTYwXSxcbiAgICAgIF0sXG4gICAgXSksXG4gIH07XG4gIHBvbHkxUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyM0MTg2RjAnO1xuICBwb2x5MVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ1BvbHlnb24gMSc7XG4gIHBvbHkxUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuT1BBQ0lUWV0gPSAnMC41JztcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TSE9XX01FQVNVUkVdID0gdHJ1ZTtcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzEnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUocG9seTFQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgcG9seTJQcm9wZXJ0aWVzID0ge1xuICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9seWdvbihbXG4gICAgICBbXG4gICAgICAgIFstNzk1MjUwOCwgNjA5NjYxN10sXG4gICAgICAgIFstODA1MTU3MCwgNTk1OTY0Ml0sXG4gICAgICAgIFstNzg0ODU1NCwgNTkyNjYyMV0sXG4gICAgICAgIFstNzc1NDM4MywgNjAyNTY4M10sXG4gICAgICAgIFstNzk1MjUwOCwgNjA5NjYxN10sXG4gICAgICBdLFxuICAgIF0pLFxuICB9O1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjQ0NDQ0NDJztcbiAgcG9seTJQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdQb2x5Z29uIDInO1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk9QQUNJVFldID0gJzEnO1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNUUk9LRV0gPSAnMyc7XG4gIGZlYXR1cmVzLnB1c2gobmV3IG9sRmVhdHVyZShwb2x5MlByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCByZWN0UHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogb2xHZW9tUG9seWdvbkZyb21FeHRlbnQoWy03ODc0ODQ4LCA2Mzg0MDIwLCAtNzczMDUzNSwgNjQ5NjUzNV0pLFxuICB9O1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwMDAwMDAnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfUkVDVEFOR0xFXSA9IHRydWU7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdSZWN0YW5nbGUgMSc7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICcyJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKHJlY3RQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgY2lyY2xlUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogb2xHZW9tUG9seWdvbkZyb21DaXJjbGUobmV3IG9sR2VvbUNpcmNsZShbLTc2OTEwOTMsIDYxNjYzMjddLCAzNTAwMCksIDY0KSxcbiAgfTtcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwMDAwMDAnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19DSVJDTEVdID0gdHJ1ZTtcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuTkFNRV0gPSAnQ2lyY2xlIDEnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzInO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUoY2lyY2xlUHJvcGVydGllcykpO1xuICBjb25zdCB2aWV3ID0gbmV3IG9sVmlldyh7XG4gICAgY2VudGVyOiBbLTgxNzQ0ODIsIDYyODg2MjddLFxuICAgIHpvb206IDYsXG4gIH0pO1xuICBuZ2VvRmVhdHVyZUhlbHBlci5zZXRQcm9qZWN0aW9uKHZpZXcuZ2V0UHJvamVjdGlvbigpKTtcblxuICAvLyBzZXQgc3R5bGVcbiAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgIG5nZW9GZWF0dXJlSGVscGVyLnNldFN0eWxlKGZlYXR1cmUpO1xuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICAgIG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICAgIHdyYXBYOiBmYWxzZSxcbiAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiB2aWV3LFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG5cbiAgLy8gQHRzLWlnbm9yZVxuICB0aGlzLm1hcC5vbignc2luZ2xlY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlTWFwU2luZ2xlQ2xpY2tfO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvTWFwQnJvd3NlckV2ZW50JykuZGVmYXVsdDx1bmtub3duPn0gZXZ0IE1hcEJyb3dzZXIgZXZlbnRcbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZU1hcFNpbmdsZUNsaWNrXyA9IGZ1bmN0aW9uIChldnQpIHtcbiAgY29uc3QgcGl4ZWwgPSBldnQucGl4ZWw7XG4gIGNvbnN0IGZlYXR1cmUgPVxuICAgIC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqL1xuICAgIHRoaXMubWFwLmZvckVhY2hGZWF0dXJlQXRQaXhlbChwaXhlbCwgKGZlYXR1cmUpID0+IGZlYXR1cmUpO1xuICBpZiAodGhpcy5zZWxlY3RlZEZlYXR1cmUpIHtcbiAgICB0aGlzLmZlYXR1cmVIZWxwZXJfLnNldFN0eWxlKHRoaXMuc2VsZWN0ZWRGZWF0dXJlKTtcbiAgfVxuICBpZiAoZmVhdHVyZSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRmVhdHVyZSAhPT0gZmVhdHVyZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgdGhpcy5mZWF0dXJlSGVscGVyXy5zZXRTdHlsZShmZWF0dXJlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBudWxsO1xuICB9XG4gIHRoaXMuc2NvcGVfLiRhcHBseSgpO1xufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGV4aXN0cyAoZGV2ZWxvcG1lbnQgb25seSlcblx0aWYgKF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZmVhdHVyZXN0eWxlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jb250cmlicy9nbWYvZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2ZlYXR1cmVzdHlsZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==