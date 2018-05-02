/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/interactionbtngroup.js"
/*!*****************************************!*\
  !*** ./examples/interactionbtngroup.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interactionbtngroup_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interactionbtngroup.scss */ "./examples/interactionbtngroup.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Circle */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
// The MIT License (MIT)
//
// Copyright (c) 2014-2024 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name]);

/**
 * @class
 */
function MainController() {
  /**
   * Collection shared between the drawing interactions and the feature
   * overlay used to render the drawn features.
   *
   * @type {import('ol/Collection').default<import('ol/Feature').default<import('ol/geom/Geometry').default>>}
   */
  const features = new ol_Collection__WEBPACK_IMPORTED_MODULE_7__["default"]();
  const overlay = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_5__["default"].getFeatureOverlay();
  overlay.setFeatures(features);
  overlay.setStyle(
    new ol_style_Style__WEBPACK_IMPORTED_MODULE_16__["default"]({
      fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_14__["default"]({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_15__["default"]({
        color: '#ffcc33',
        width: 2,
      }),
      image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_13__["default"]({
        radius: 7,
        fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_14__["default"]({
          color: '#ffcc33',
        }),
      }),
    }),
  );

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_11__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_9__["default"]({
      center: [-10997148, 4569099],
      zoom: 4,
    }),
  });
  const map = this.map;

  // initialize the feature overlay manager with the map
  ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_5__["default"].init(map);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPolygon = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_10__["default"](
    /** @type {import('ol/interaction/Draw').Options} */ {
      type: 'Polygon',
      features: features,
    },
  );
  const drawPolygon = this.drawPolygon;
  drawPolygon.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__.interactionDecoration)(drawPolygon);
  map.addInteraction(drawPolygon);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawPoint = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_10__["default"](
    /** @type {import('ol/interaction/Draw').Options} */ {
      type: 'Point',
      features: features,
    },
  );
  const drawPoint = this.drawPoint;
  drawPoint.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__.interactionDecoration)(drawPoint);
  map.addInteraction(drawPoint);

  /**
   * @type {import('ol/interaction/Draw').default}
   */
  this.drawLine = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_10__["default"](
    /** @type {import('ol/interaction/Draw').Options} */ {
      type: 'LineString',
      features: features,
    },
  );
  const drawLine = this.drawLine;
  drawLine.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__.interactionDecoration)(drawLine);
  map.addInteraction(drawLine);
}
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_3__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/interactionbtngroup.scss"
/*!*******************************************!*\
  !*** ./examples/interactionbtngroup.scss ***!
  \*******************************************/
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
/******/ 			"interactionbtngroup": 0
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
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/interactionbtngroup.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpb25idG5ncm91cC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeklBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9pbnRlcmFjdGlvbmJ0bmdyb3VwLmpzIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9pbnRlcmFjdGlvbmJ0bmdyb3VwLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNC0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9pbnRlcmFjdGlvbmJ0bmdyb3VwLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvTWlzY0J0bkNvbXBvbmVudCBmcm9tICduZ2VvL21pc2MvYnRuQ29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuaW1wb3J0IHtpbnRlcmFjdGlvbkRlY29yYXRpb259IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZSc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24nO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25EcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZSwgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZV0pO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gc2hhcmVkIGJldHdlZW4gdGhlIGRyYXdpbmcgaW50ZXJhY3Rpb25zIGFuZCB0aGUgZmVhdHVyZVxuICAgKiBvdmVybGF5IHVzZWQgdG8gcmVuZGVyIHRoZSBkcmF3biBmZWF0dXJlcy5cbiAgICpcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvQ29sbGVjdGlvbicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICBjb25zdCBmZWF0dXJlcyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgY29uc3Qgb3ZlcmxheSA9IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBvdmVybGF5LnNldEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgb3ZlcmxheS5zZXRTdHlsZShcbiAgICBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyxcbiAgICAgIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgIGNvbG9yOiAnI2ZmY2MzMycsXG4gICAgICAgIHdpZHRoOiAyLFxuICAgICAgfSksXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGVDaXJjbGUoe1xuICAgICAgICByYWRpdXM6IDcsXG4gICAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgICAgY29sb3I6ICcjZmZjYzMzJyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbLTEwOTk3MTQ4LCA0NTY5MDk5XSxcbiAgICAgIHpvb206IDQsXG4gICAgfSksXG4gIH0pO1xuICBjb25zdCBtYXAgPSB0aGlzLm1hcDtcblxuICAvLyBpbml0aWFsaXplIHRoZSBmZWF0dXJlIG92ZXJsYXkgbWFuYWdlciB3aXRoIHRoZSBtYXBcbiAgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmluaXQobWFwKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmRyYXdQb2x5Z29uID0gbmV3IG9sSW50ZXJhY3Rpb25EcmF3KFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9pbnRlcmFjdGlvbi9EcmF3JykuT3B0aW9uc30gKi8ge1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzLFxuICAgIH0sXG4gICk7XG4gIGNvbnN0IGRyYXdQb2x5Z29uID0gdGhpcy5kcmF3UG9seWdvbjtcbiAgZHJhd1BvbHlnb24uc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKGRyYXdQb2x5Z29uKTtcbiAgbWFwLmFkZEludGVyYWN0aW9uKGRyYXdQb2x5Z29uKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmRyYXdQb2ludCA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyhcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLk9wdGlvbnN9ICovIHtcbiAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICBmZWF0dXJlczogZmVhdHVyZXMsXG4gICAgfSxcbiAgKTtcbiAgY29uc3QgZHJhd1BvaW50ID0gdGhpcy5kcmF3UG9pbnQ7XG4gIGRyYXdQb2ludC5zZXRBY3RpdmUoZmFsc2UpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24oZHJhd1BvaW50KTtcbiAgbWFwLmFkZEludGVyYWN0aW9uKGRyYXdQb2ludCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL2ludGVyYWN0aW9uL0RyYXcnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5kcmF3TGluZSA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyhcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLk9wdGlvbnN9ICovIHtcbiAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJyxcbiAgICAgIGZlYXR1cmVzOiBmZWF0dXJlcyxcbiAgICB9LFxuICApO1xuICBjb25zdCBkcmF3TGluZSA9IHRoaXMuZHJhd0xpbmU7XG4gIGRyYXdMaW5lLnNldEFjdGl2ZShmYWxzZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbihkcmF3TGluZSk7XG4gIG1hcC5hZGRJbnRlcmFjdGlvbihkcmF3TGluZSk7XG59XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImludGVyYWN0aW9uYnRuZ3JvdXBcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2ludGVyYWN0aW9uYnRuZ3JvdXAuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=