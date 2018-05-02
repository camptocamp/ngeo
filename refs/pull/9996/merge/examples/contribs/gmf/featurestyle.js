/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./contribs/gmf/examples/featurestyle.js":
/*!***********************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./contribs/gmf/examples/featurestyle.scss":
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/featurestyle.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXN0eWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMU9BOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZmVhdHVyZXN0eWxlLmpzIiwid2VicGFjazovL25nZW8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZmVhdHVyZXN0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9mZWF0dXJlc3R5bGUuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZkRyYXdpbmdGZWF0dXJlU3R5bGVDb21wb25lbnQgZnJvbSAnZ21mL2RyYXdpbmcvZmVhdHVyZVN0eWxlQ29tcG9uZW50JztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcyBmcm9tICduZ2VvL2Zvcm1hdC9GZWF0dXJlUHJvcGVydGllcyc7XG5pbXBvcnQgbmdlb01pc2NGZWF0dXJlSGVscGVyIGZyb20gJ25nZW8vbWlzYy9GZWF0dXJlSGVscGVyJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sR2VvbUNpcmNsZSBmcm9tICdvbC9nZW9tL0NpcmNsZSc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IG9sR2VvbVBvbHlnb24sIHtcbiAgZnJvbUNpcmNsZSBhcyBvbEdlb21Qb2x5Z29uRnJvbUNpcmNsZSxcbiAgZnJvbUV4dGVudCBhcyBvbEdlb21Qb2x5Z29uRnJvbUV4dGVudCxcbn0gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZkRyYXdpbmdGZWF0dXJlU3R5bGVDb21wb25lbnQubmFtZSxcbiAgZ21mTWFwQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9NaXNjRmVhdHVyZUhlbHBlci5uYW1lLFxuICBuZ2VvTWFwTW9kdWxlLm5hbWUsXG5dKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ25nZW9GZWF0dXJlSGVscGVyJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgQW5ndWxhciBzY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvRmVhdHVyZUhlbHBlcicpLkZlYXR1cmVIZWxwZXJ9IG5nZW9GZWF0dXJlSGVscGVyIEdtZiBmZWF0dXJlIGhlbHBlciBzZXJ2aWNlLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUsIG5nZW9GZWF0dXJlSGVscGVyKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9taXNjL0ZlYXR1cmVIZWxwZXInKS5GZWF0dXJlSGVscGVyfVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlSGVscGVyXyA9IG5nZW9GZWF0dXJlSGVscGVyO1xuXG4gIC8vIGNyZWF0ZSBmZWF0dXJlc1xuICBjb25zdCBmZWF0dXJlcyA9IFtdO1xuXG4gIC8qKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59ICovXG4gIGNvbnN0IHBvaW50UHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbVBvaW50KFstODQ1ODIxNSwgNjY3MjY0Nl0pLFxuICB9O1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDA5RDU3JztcbiAgcG9pbnRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdQb2ludDEnO1xuICBwb2ludFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNJWkVdID0gJzYnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUocG9pbnRQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgdGV4dFByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludChbLTgwMDc4NDgsIDYyMDk3NDRdKSxcbiAgfTtcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkFOR0xFXSA9ICcwJztcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMDAwMDAwJztcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLklTX1RFWFRdID0gdHJ1ZTtcbiAgdGV4dFByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ1RleHQgMSc7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TSVpFXSA9ICcxNic7XG4gIHRleHRQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzInO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUodGV4dFByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCBsaW5lUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogbmV3IG9sR2VvbUxpbmVTdHJpbmcoW1xuICAgICAgWy04MzIxMjQwLCA2NTIzNDQxXSxcbiAgICAgIFstODEwMzU0NywgNjcyNjQ1OF0sXG4gICAgICBbLTgwOTEzMTgsIDY0MDg0ODBdLFxuICAgICAgWy03OTczOTEwLCA2NjMxMDY1XSxcbiAgICBdKSxcbiAgfTtcbiAgbGluZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjMEJBOUNDJztcbiAgbGluZVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ0xpbmVTdHJpbmcgMSc7XG4gIGxpbmVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzQnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUobGluZVByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCBwb2x5MVByb3BlcnRpZXMgPSB7XG4gICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2x5Z29uKFtcbiAgICAgIFtcbiAgICAgICAgWy04NTEyMDI3LCA2MzU5NTYwXSxcbiAgICAgICAgWy04NTMxNTk1LCA2MDgwNzE4XSxcbiAgICAgICAgWy04MjY3NDI4LCA2MDMxNzk4XSxcbiAgICAgICAgWy04MjM4MDc3LCA2MjQ3MDQ1XSxcbiAgICAgICAgWy04NTEyMDI3LCA2MzU5NTYwXSxcbiAgICAgIF0sXG4gICAgXSksXG4gIH07XG4gIHBvbHkxUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyM0MTg2RjAnO1xuICBwb2x5MVByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk5BTUVdID0gJ1BvbHlnb24gMSc7XG4gIHBvbHkxUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuT1BBQ0lUWV0gPSAnMC41JztcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TSE9XX01FQVNVUkVdID0gdHJ1ZTtcbiAgcG9seTFQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzEnO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUocG9seTFQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgcG9seTJQcm9wZXJ0aWVzID0ge1xuICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9seWdvbihbXG4gICAgICBbXG4gICAgICAgIFstNzk1MjUwOCwgNjA5NjYxN10sXG4gICAgICAgIFstODA1MTU3MCwgNTk1OTY0Ml0sXG4gICAgICAgIFstNzg0ODU1NCwgNTkyNjYyMV0sXG4gICAgICAgIFstNzc1NDM4MywgNjAyNTY4M10sXG4gICAgICAgIFstNzk1MjUwOCwgNjA5NjYxN10sXG4gICAgICBdLFxuICAgIF0pLFxuICB9O1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLkNPTE9SXSA9ICcjQ0NDQ0NDJztcbiAgcG9seTJQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdQb2x5Z29uIDInO1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLk9QQUNJVFldID0gJzEnO1xuICBwb2x5MlByb3BlcnRpZXNbbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNUUk9LRV0gPSAnMyc7XG4gIGZlYXR1cmVzLnB1c2gobmV3IG9sRmVhdHVyZShwb2x5MlByb3BlcnRpZXMpKTtcblxuICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICBjb25zdCByZWN0UHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogb2xHZW9tUG9seWdvbkZyb21FeHRlbnQoWy03ODc0ODQ4LCA2Mzg0MDIwLCAtNzczMDUzNSwgNjQ5NjUzNV0pLFxuICB9O1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwMDAwMDAnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfUkVDVEFOR0xFXSA9IHRydWU7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5OQU1FXSA9ICdSZWN0YW5nbGUgMSc7XG4gIHJlY3RQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICByZWN0UHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU1RST0tFXSA9ICcyJztcbiAgZmVhdHVyZXMucHVzaChuZXcgb2xGZWF0dXJlKHJlY3RQcm9wZXJ0aWVzKSk7XG5cbiAgLyoqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn0gKi9cbiAgY29uc3QgY2lyY2xlUHJvcGVydGllcyA9IHtcbiAgICBnZW9tZXRyeTogb2xHZW9tUG9seWdvbkZyb21DaXJjbGUobmV3IG9sR2VvbUNpcmNsZShbLTc2OTEwOTMsIDYxNjYzMjddLCAzNTAwMCksIDY0KSxcbiAgfTtcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQ09MT1JdID0gJyMwMDAwMDAnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5JU19DSVJDTEVdID0gdHJ1ZTtcbiAgY2lyY2xlUHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuTkFNRV0gPSAnQ2lyY2xlIDEnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZXSA9ICcwLjUnO1xuICBjaXJjbGVQcm9wZXJ0aWVzW25nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5TVFJPS0VdID0gJzInO1xuICBmZWF0dXJlcy5wdXNoKG5ldyBvbEZlYXR1cmUoY2lyY2xlUHJvcGVydGllcykpO1xuICBjb25zdCB2aWV3ID0gbmV3IG9sVmlldyh7XG4gICAgY2VudGVyOiBbLTgxNzQ0ODIsIDYyODg2MjddLFxuICAgIHpvb206IDYsXG4gIH0pO1xuICBuZ2VvRmVhdHVyZUhlbHBlci5zZXRQcm9qZWN0aW9uKHZpZXcuZ2V0UHJvamVjdGlvbigpKTtcblxuICAvLyBzZXQgc3R5bGVcbiAgZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgIG5nZW9GZWF0dXJlSGVscGVyLnNldFN0eWxlKGZlYXR1cmUpO1xuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICAgIG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICAgIHdyYXBYOiBmYWxzZSxcbiAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiB2aWV3LFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUgez9vbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG5cbiAgLy8gQHRzLWlnbm9yZVxuICB0aGlzLm1hcC5vbignc2luZ2xlY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlTWFwU2luZ2xlQ2xpY2tfO1xuICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvTWFwQnJvd3NlckV2ZW50JykuZGVmYXVsdDx1bmtub3duPn0gZXZ0IE1hcEJyb3dzZXIgZXZlbnRcbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZU1hcFNpbmdsZUNsaWNrXyA9IGZ1bmN0aW9uIChldnQpIHtcbiAgY29uc3QgcGl4ZWwgPSBldnQucGl4ZWw7XG4gIGNvbnN0IGZlYXR1cmUgPVxuICAgIC8qKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqL1xuICAgIHRoaXMubWFwLmZvckVhY2hGZWF0dXJlQXRQaXhlbChwaXhlbCwgKGZlYXR1cmUpID0+IGZlYXR1cmUpO1xuICBpZiAodGhpcy5zZWxlY3RlZEZlYXR1cmUpIHtcbiAgICB0aGlzLmZlYXR1cmVIZWxwZXJfLnNldFN0eWxlKHRoaXMuc2VsZWN0ZWRGZWF0dXJlKTtcbiAgfVxuICBpZiAoZmVhdHVyZSkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRmVhdHVyZSAhPT0gZmVhdHVyZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgdGhpcy5mZWF0dXJlSGVscGVyXy5zZXRTdHlsZShmZWF0dXJlLCB0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBudWxsO1xuICB9XG4gIHRoaXMuc2NvcGVfLiRhcHBseSgpO1xufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImZlYXR1cmVzdHlsZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY29udHJpYnMvZ21mL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NvbnRyaWJzL2dtZi9leGFtcGxlcy9mZWF0dXJlc3R5bGUuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=