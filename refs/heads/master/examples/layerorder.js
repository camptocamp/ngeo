/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/layerorder.js"
/*!********************************!*\
  !*** ./examples/layerorder.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _layerorder_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layerorder.scss */ "./examples/layerorder.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_sortableComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/sortableComponent */ "./src/misc/sortableComponent.js");
/* harmony import */ var ngeo_misc_syncArrays__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/syncArrays */ "./src/misc/syncArrays.js");
/* harmony import */ var ngeo_source_AsitVD__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/source/AsitVD */ "./src/source/AsitVD.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./url */ "./examples/url.js");
// The MIT License (MIT)
//
// Copyright (c) 2015-2024 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_misc_sortableComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name]);

MainController.$inject = ['$scope'];

/**
 * @param {angular.IScope} $scope Scope.
 * @class
 */
function MainController($scope) {
  const asitvd = new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__["default"]({
    source: new ngeo_source_AsitVD__WEBPACK_IMPORTED_MODULE_6__["default"]({
      layer: 'asitvd.fond_couleur',
    }),
  });
  asitvd.set('name', 'asitvd');
  const boundaries = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_11__["default"]({
    source: new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__["default"]({
      url: _url__WEBPACK_IMPORTED_MODULE_13__.MAPSERVER_PROXY,
      params: {
        'ogcserver': 'MapServer',
        'LAYERS': 'post_office',
      },
      serverType: 'mapserver',
    }),
  });
  boundaries.set('name', 'Boundaries');
  const waterBodies = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_11__["default"]({
    source: new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__["default"]({
      url: _url__WEBPACK_IMPORTED_MODULE_13__.MAPSERVER_PROXY,
      params: {
        'ogcserver': 'MapServer',
        'LAYERS': 'entertainment',
      },
      serverType: 'mapserver',
    }),
  });
  waterBodies.set('name', 'Water bodies');
  const cities = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_11__["default"]({
    source: new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__["default"]({
      url: _url__WEBPACK_IMPORTED_MODULE_13__.MAPSERVER_PROXY,
      params: {
        'ogcserver': 'MapServer',
        'LAYERS': 'sustenance',
      },
      serverType: 'mapserver',
    }),
  });
  cities.set('name', 'Cities');

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [asitvd, boundaries, waterBodies, cities],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_9__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_7__["default"],
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2600000, 1200000],
      zoom: 9,
    }),
  });
  const map = this.map;
  this.roads_ = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_11__["default"]({
    source: new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__["default"]({
      url: _url__WEBPACK_IMPORTED_MODULE_13__.MAPSERVER_PROXY,
      params: {
        'ogcserver': 'MapServer',
        'LAYERS': 'osm_scale',
      },
      serverType: 'mapserver',
    }),
  });
  this.roads_.set('name', 'Roads');

  /**
   * @type {import('ol/layer/Base').default[]}
   * @constant
   */
  this.selectedLayers = [];
  const selectedLayers = this.selectedLayers;
  (0,ngeo_misc_syncArrays__WEBPACK_IMPORTED_MODULE_5__["default"])(map.getLayers().getArray(), selectedLayers, true, $scope, layerFilter);

  // watch any change on layers array to refresh the map
  $scope.$watchCollection(
    () => selectedLayers,
    () => {
      map.render();
    },
  );

  /**
   * @param {import('ol/layer/Base').default} layer Layer.
   * @returns {boolean} `false` if the layer shouldn't be part of the selected
   *     layers.
   */
  function layerFilter(layer) {
    return layer !== asitvd;
  }
}

/**
 * Add/remove the "Roads" layer when used as a setter, and return whether
 * the "Roads" layer is in the map when used as a getter.
 *
 * @param {boolean|undefined} val Value.
 * @returns {boolean|undefined} `true` if the "Roads" layer is in the map,
 *     `false` if the "Roads" layer is not in the map, `undefined` if the
 *     function is used as setter.
 */
MainController.prototype.toggleRoadsLayer = function (val) {
  if (val === undefined) {
    return this.map.getLayers().getArray().includes(this.roads_);
  } else {
    if (val) {
      this.map.addLayer(this.roads_);
    } else {
      this.map.removeLayer(this.roads_);
    }
  }
};
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_3__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/layerorder.scss"
/*!**********************************!*\
  !*** ./examples/layerorder.scss ***!
  \**********************************/
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
/******/ 			"layerorder": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/layerorder.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJvcmRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hLQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbGF5ZXJvcmRlci5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbGF5ZXJvcmRlci5zY3NzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vbGF5ZXJvcmRlci5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbmdlb01pc2NTb3J0YWJsZUNvbXBvbmVudCBmcm9tICduZ2VvL21pc2Mvc29ydGFibGVDb21wb25lbnQnO1xuaW1wb3J0IG5nZW9NaXNjU3luY0FycmF5cyBmcm9tICduZ2VvL21pc2Mvc3luY0FycmF5cyc7XG5pbXBvcnQgbmdlb1NvdXJjZUFzaXRWRCBmcm9tICduZ2VvL3NvdXJjZS9Bc2l0VkQnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcbmltcG9ydCBvbFNvdXJjZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IHtNQVBTRVJWRVJfUFJPWFl9IGZyb20gJy4vdXJsJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIG5nZW9NaXNjU29ydGFibGVDb21wb25lbnQubmFtZV0pO1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlKSB7XG4gIGNvbnN0IGFzaXR2ZCA9IG5ldyBvbExheWVyVGlsZSh7XG4gICAgc291cmNlOiBuZXcgbmdlb1NvdXJjZUFzaXRWRCh7XG4gICAgICBsYXllcjogJ2FzaXR2ZC5mb25kX2NvdWxldXInLFxuICAgIH0pLFxuICB9KTtcbiAgYXNpdHZkLnNldCgnbmFtZScsICdhc2l0dmQnKTtcbiAgY29uc3QgYm91bmRhcmllcyA9IG5ldyBvbExheWVySW1hZ2Uoe1xuICAgIHNvdXJjZTogbmV3IG9sU291cmNlV01TKHtcbiAgICAgIHVybDogTUFQU0VSVkVSX1BST1hZLFxuICAgICAgcGFyYW1zOiB7XG4gICAgICAgICdvZ2NzZXJ2ZXInOiAnTWFwU2VydmVyJyxcbiAgICAgICAgJ0xBWUVSUyc6ICdwb3N0X29mZmljZScsXG4gICAgICB9LFxuICAgICAgc2VydmVyVHlwZTogJ21hcHNlcnZlcicsXG4gICAgfSksXG4gIH0pO1xuICBib3VuZGFyaWVzLnNldCgnbmFtZScsICdCb3VuZGFyaWVzJyk7XG4gIGNvbnN0IHdhdGVyQm9kaWVzID0gbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VXTVMoe1xuICAgICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgJ29nY3NlcnZlcic6ICdNYXBTZXJ2ZXInLFxuICAgICAgICAnTEFZRVJTJzogJ2VudGVydGFpbm1lbnQnLFxuICAgICAgfSxcbiAgICAgIHNlcnZlclR5cGU6ICdtYXBzZXJ2ZXInLFxuICAgIH0pLFxuICB9KTtcbiAgd2F0ZXJCb2RpZXMuc2V0KCduYW1lJywgJ1dhdGVyIGJvZGllcycpO1xuICBjb25zdCBjaXRpZXMgPSBuZXcgb2xMYXllckltYWdlKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVdNUyh7XG4gICAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICAnb2djc2VydmVyJzogJ01hcFNlcnZlcicsXG4gICAgICAgICdMQVlFUlMnOiAnc3VzdGVuYW5jZScsXG4gICAgICB9LFxuICAgICAgc2VydmVyVHlwZTogJ21hcHNlcnZlcicsXG4gICAgfSksXG4gIH0pO1xuICBjaXRpZXMuc2V0KCduYW1lJywgJ0NpdGllcycpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW2FzaXR2ZCwgYm91bmRhcmllcywgd2F0ZXJCb2RpZXMsIGNpdGllc10sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMTAwMCwgNTAwLCAyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbMjYwMDAwMCwgMTIwMDAwMF0sXG4gICAgICB6b29tOiA5LFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgbWFwID0gdGhpcy5tYXA7XG4gIHRoaXMucm9hZHNfID0gbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgc291cmNlOiBuZXcgb2xTb3VyY2VXTVMoe1xuICAgICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgJ29nY3NlcnZlcic6ICdNYXBTZXJ2ZXInLFxuICAgICAgICAnTEFZRVJTJzogJ29zbV9zY2FsZScsXG4gICAgICB9LFxuICAgICAgc2VydmVyVHlwZTogJ21hcHNlcnZlcicsXG4gICAgfSksXG4gIH0pO1xuICB0aGlzLnJvYWRzXy5zZXQoJ25hbWUnLCAnUm9hZHMnKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvQmFzZScpLmRlZmF1bHRbXX1cbiAgICogQGNvbnN0YW50XG4gICAqL1xuICB0aGlzLnNlbGVjdGVkTGF5ZXJzID0gW107XG4gIGNvbnN0IHNlbGVjdGVkTGF5ZXJzID0gdGhpcy5zZWxlY3RlZExheWVycztcbiAgbmdlb01pc2NTeW5jQXJyYXlzKG1hcC5nZXRMYXllcnMoKS5nZXRBcnJheSgpLCBzZWxlY3RlZExheWVycywgdHJ1ZSwgJHNjb3BlLCBsYXllckZpbHRlcik7XG5cbiAgLy8gd2F0Y2ggYW55IGNoYW5nZSBvbiBsYXllcnMgYXJyYXkgdG8gcmVmcmVzaCB0aGUgbWFwXG4gICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKFxuICAgICgpID0+IHNlbGVjdGVkTGF5ZXJzLFxuICAgICgpID0+IHtcbiAgICAgIG1hcC5yZW5kZXIoKTtcbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvbGF5ZXIvQmFzZScpLmRlZmF1bHR9IGxheWVyIExheWVyLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYGZhbHNlYCBpZiB0aGUgbGF5ZXIgc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIHNlbGVjdGVkXG4gICAqICAgICBsYXllcnMuXG4gICAqL1xuICBmdW5jdGlvbiBsYXllckZpbHRlcihsYXllcikge1xuICAgIHJldHVybiBsYXllciAhPT0gYXNpdHZkO1xuICB9XG59XG5cbi8qKlxuICogQWRkL3JlbW92ZSB0aGUgXCJSb2Fkc1wiIGxheWVyIHdoZW4gdXNlZCBhcyBhIHNldHRlciwgYW5kIHJldHVybiB3aGV0aGVyXG4gKiB0aGUgXCJSb2Fkc1wiIGxheWVyIGlzIGluIHRoZSBtYXAgd2hlbiB1c2VkIGFzIGEgZ2V0dGVyLlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IHZhbCBWYWx1ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufHVuZGVmaW5lZH0gYHRydWVgIGlmIHRoZSBcIlJvYWRzXCIgbGF5ZXIgaXMgaW4gdGhlIG1hcCxcbiAqICAgICBgZmFsc2VgIGlmIHRoZSBcIlJvYWRzXCIgbGF5ZXIgaXMgbm90IGluIHRoZSBtYXAsIGB1bmRlZmluZWRgIGlmIHRoZVxuICogICAgIGZ1bmN0aW9uIGlzIHVzZWQgYXMgc2V0dGVyLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUudG9nZ2xlUm9hZHNMYXllciA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmdldExheWVycygpLmdldEFycmF5KCkuaW5jbHVkZXModGhpcy5yb2Fkc18pO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMucm9hZHNfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5yb2Fkc18pO1xuICAgIH1cbiAgfVxufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGV4aXN0cyAoZGV2ZWxvcG1lbnQgb25seSlcblx0aWYgKF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibGF5ZXJvcmRlclwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvbGF5ZXJvcmRlci5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==