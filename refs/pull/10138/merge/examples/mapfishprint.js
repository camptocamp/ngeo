/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/mapfishprint.js"
/*!**********************************!*\
  !*** ./examples/mapfishprint.js ***!
  \**********************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common_styles.scss */ "./examples/common_styles.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_print_Service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/print/Service */ "./src/print/Service.js");
/* harmony import */ var ngeo_print_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/print/Utils */ "./src/print/Utils.js");
/* harmony import */ var ngeo_print_Mask__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/print/Mask */ "./src/print/Mask.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/format/GeoJSON */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* module decorator */ module = __webpack_require__.hmd(module);
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
const appmodule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', [
  'gettext',
  gmf_map_component__WEBPACK_IMPORTED_MODULE_14__["default"].name,
  ngeo_print_Service__WEBPACK_IMPORTED_MODULE_4__["default"].name,
  ngeo_print_Utils__WEBPACK_IMPORTED_MODULE_5__["default"].name,
]);

/**
 * @private
 * @hidden
 */
const PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000, 500000];

/**
 * @private
 * @hidden
 */
const PRINT_FORMAT_ = 'pdf';

/**
 * @private
 * @hidden
 */
const PRINT_LAYOUT_ = '1 A4 portrait';

/**
 * @private
 * @hidden
 */
const PRINT_DPI_ = 72;

/**
 * @private
 * @hidden
 * @type {import('ol/size').Size}
 */
const PRINT_PAPER_SIZE_ = [555, 675];

MainController.$inject = ['$timeout', 'ngeoCreatePrint', 'ngeoPrintUtils'];

/**
 * @class
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import('ngeo/print/Service').CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {import('ngeo/print/Utils').PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @hidden
 */
function MainController($timeout, ngeoCreatePrint, ngeoPrintUtils) {
  const source = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_12__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
    params: {
      'LAYERS': 'default',
    },
    serverType: 'mapserver',
  });
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [
      new ol_layer_Image__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source,
      }),
      new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
        source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__["default"]({
          url: 'data/polygon-swizerland.json',
          format: new ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_9__["default"]({
            dataProjection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_3__["default"],
          }),
        }),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_8__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_3__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [2537635, 1152640],
      zoom: 3,
    }),
  });

  /**
   * Text to display a "loading" message while waiting for the report.
   *
   * @type {string}
   */
  this.printState = '';

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import('ngeo/print/Service').PrintService}
   */
  this.print_ = ngeoCreatePrint(_url__WEBPACK_IMPORTED_MODULE_2__.PRINT_PROXY);

  /**
   * @type {import('ngeo/print/Utils').PrintUtils}
   */
  this.printUtils_ = ngeoPrintUtils;
  this.maskLayer_ = new ngeo_print_Mask__WEBPACK_IMPORTED_MODULE_6__["default"]();
  this.maskLayer_.getSize = () => PRINT_PAPER_SIZE_;
  this.maskLayer_.getScale = (frameState) => {
    const mapSize = frameState.size;
    const mapResolution = frameState.viewState.resolution;
    // we test mapSize and mapResolution just to please the compiler
    if (mapSize !== undefined && mapResolution !== undefined) {
      return ngeoPrintUtils.getOptimalScale(mapSize, mapResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_);
    } else {
      return PRINT_SCALES_[0];
    }
  };
  this.map.addLayer(this.maskLayer_);
}

/**
 */
MainController.prototype.print = function () {
  const map = this.map;
  const mapSize = map.getSize();
  const viewResolution = map.getView().getResolution();

  // we test mapSize and viewResolution just to please the compiler
  const scale =
    mapSize !== undefined && viewResolution !== undefined
      ? this.printUtils_.getOptimalScale(mapSize, viewResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_)
      : PRINT_SCALES_[0];
  const rotation = map.getView().getRotation();
  const dpi = PRINT_DPI_;
  const format = PRINT_FORMAT_;
  const layout = PRINT_LAYOUT_;
  this.printState = 'Printing...';
  const spec = this.print_.createSpec(map, scale, rotation, dpi, layout, format, {
    'datasource': [],
    'debug': 0,
    'comments': 'My comments',
    'title': 'My print',
  });
  this.print_
    .createReport(spec)
    .then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3').MapFishPrintReportResponse>} resp
 *    Response.
 */
MainController.prototype.handleCreateReportSuccess_ = function (resp) {
  this.getStatus_(resp.data.ref);
};

/**
 * @param {string} ref Ref.
 */
MainController.prototype.getStatus_ = function (ref) {
  this.print_
    .getStatus(ref)
    .then(this.handleGetStatusSuccess_.bind(this, ref), this.handleGetStatusError_.bind(this));
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleCreateReportError_ = function (resp) {
  this.printState = 'Print error';
};

/**
 * @param {string} ref Ref.
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleGetStatusSuccess_ = function (ref, resp) {
  const mfResp = resp.data;
  const done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    this.printState = '';
    window.location.href = this.print_.getReportUrl(ref);
  } else {
    // The report is not ready yet. Check again in 1s.
    this.$timeout_(
      () => {
        this.getStatus_(ref);
      },
      1000,
      false,
    );
  }
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleGetStatusError_ = function (resp) {
  this.printState = 'Print error';
};
appmodule.controller('MainController', MainController);
appmodule.constant('ngeoTilesPreloadingLimit', 0);
(0,_options__WEBPACK_IMPORTED_MODULE_15__["default"])(appmodule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (module);


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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
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
/******/ 			"mapfishprint": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/mapfishprint.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwZmlzaHByaW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1ZBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL21hcGZpc2hwcmludC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vY29tbW9uX3N0eWxlcy5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQge01BUFNFUlZFUl9QUk9YWSwgUFJJTlRfUFJPWFl9IGZyb20gJy4vdXJsJztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICduZ2VvL3Byb2ovRVBTR18yMDU2JztcbmltcG9ydCBuZ2VvUHJpbnRTZXJ2aWNlIGZyb20gJ25nZW8vcHJpbnQvU2VydmljZSc7XG5pbXBvcnQgbmdlb1ByaW50VXRpbHMgZnJvbSAnbmdlby9wcmludC9VdGlscyc7XG5pbXBvcnQgTWFza0xheWVyIGZyb20gJ25nZW8vcHJpbnQvTWFzayc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IGFwcG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mTWFwQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9QcmludFNlcnZpY2UubmFtZSxcbiAgbmdlb1ByaW50VXRpbHMubmFtZSxcbl0pO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX1NDQUxFU18gPSBbMTAwLCAyNTAsIDUwMCwgMjUwMCwgNTAwMCwgMTAwMDAsIDI1MDAwLCA1MDAwMCwgMTAwMDAwLCA1MDAwMDBdO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX0ZPUk1BVF8gPSAncGRmJztcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5jb25zdCBQUklOVF9MQVlPVVRfID0gJzEgQTQgcG9ydHJhaXQnO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX0RQSV8gPSA3MjtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICogQHR5cGUge2ltcG9ydCgnb2wvc2l6ZScpLlNpemV9XG4gKi9cbmNvbnN0IFBSSU5UX1BBUEVSX1NJWkVfID0gWzU1NSwgNjc1XTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHRpbWVvdXQnLCAnbmdlb0NyZWF0ZVByaW50JywgJ25nZW9QcmludFV0aWxzJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfSAkdGltZW91dCBBbmd1bGFyIHRpbWVvdXQgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3ByaW50L1NlcnZpY2UnKS5DcmVhdGVQcmludH0gbmdlb0NyZWF0ZVByaW50IFRoZSBuZ2VvIENyZWF0ZSBQcmludCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3ByaW50L1V0aWxzJykuUHJpbnRVdGlsc30gbmdlb1ByaW50VXRpbHMgVGhlIG5nZW8gUHJpbnRVdGlscyBzZXJ2aWNlLlxuICogQGhpZGRlblxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkdGltZW91dCwgbmdlb0NyZWF0ZVByaW50LCBuZ2VvUHJpbnRVdGlscykge1xuICBjb25zdCBzb3VyY2UgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcGFyYW1zOiB7XG4gICAgICAnTEFZRVJTJzogJ2RlZmF1bHQnLFxuICAgIH0sXG4gICAgc2VydmVyVHlwZTogJ21hcHNlcnZlcicsXG4gIH0pO1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVySW1hZ2Uoe1xuICAgICAgICBzb3VyY2UsXG4gICAgICB9KSxcbiAgICAgIG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICAgIHVybDogJ2RhdGEvcG9seWdvbi1zd2l6ZXJsYW5kLmpzb24nLFxuICAgICAgICAgIGZvcm1hdDogbmV3IG9sRm9ybWF0R2VvSlNPTih7XG4gICAgICAgICAgICBkYXRhUHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxXSxcbiAgICAgIGNlbnRlcjogWzI1Mzc2MzUsIDExNTI2NDBdLFxuICAgICAgem9vbTogMyxcbiAgICB9KSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRleHQgdG8gZGlzcGxheSBhIFwibG9hZGluZ1wiIG1lc3NhZ2Ugd2hpbGUgd2FpdGluZyBmb3IgdGhlIHJlcG9ydC5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMucHJpbnRTdGF0ZSA9ICcnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3ByaW50L1NlcnZpY2UnKS5QcmludFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLnByaW50XyA9IG5nZW9DcmVhdGVQcmludChQUklOVF9QUk9YWSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcHJpbnQvVXRpbHMnKS5QcmludFV0aWxzfVxuICAgKi9cbiAgdGhpcy5wcmludFV0aWxzXyA9IG5nZW9QcmludFV0aWxzO1xuICB0aGlzLm1hc2tMYXllcl8gPSBuZXcgTWFza0xheWVyKCk7XG4gIHRoaXMubWFza0xheWVyXy5nZXRTaXplID0gKCkgPT4gUFJJTlRfUEFQRVJfU0laRV87XG4gIHRoaXMubWFza0xheWVyXy5nZXRTY2FsZSA9IChmcmFtZVN0YXRlKSA9PiB7XG4gICAgY29uc3QgbWFwU2l6ZSA9IGZyYW1lU3RhdGUuc2l6ZTtcbiAgICBjb25zdCBtYXBSZXNvbHV0aW9uID0gZnJhbWVTdGF0ZS52aWV3U3RhdGUucmVzb2x1dGlvbjtcbiAgICAvLyB3ZSB0ZXN0IG1hcFNpemUgYW5kIG1hcFJlc29sdXRpb24ganVzdCB0byBwbGVhc2UgdGhlIGNvbXBpbGVyXG4gICAgaWYgKG1hcFNpemUgIT09IHVuZGVmaW5lZCAmJiBtYXBSZXNvbHV0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZ2VvUHJpbnRVdGlscy5nZXRPcHRpbWFsU2NhbGUobWFwU2l6ZSwgbWFwUmVzb2x1dGlvbiwgUFJJTlRfUEFQRVJfU0laRV8sIFBSSU5UX1NDQUxFU18pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUFJJTlRfU0NBTEVTX1swXTtcbiAgICB9XG4gIH07XG4gIHRoaXMubWFwLmFkZExheWVyKHRoaXMubWFza0xheWVyXyk7XG59XG5cbi8qKlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUucHJpbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuICBjb25zdCBtYXBTaXplID0gbWFwLmdldFNpemUoKTtcbiAgY29uc3Qgdmlld1Jlc29sdXRpb24gPSBtYXAuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKTtcblxuICAvLyB3ZSB0ZXN0IG1hcFNpemUgYW5kIHZpZXdSZXNvbHV0aW9uIGp1c3QgdG8gcGxlYXNlIHRoZSBjb21waWxlclxuICBjb25zdCBzY2FsZSA9XG4gICAgbWFwU2l6ZSAhPT0gdW5kZWZpbmVkICYmIHZpZXdSZXNvbHV0aW9uICE9PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5wcmludFV0aWxzXy5nZXRPcHRpbWFsU2NhbGUobWFwU2l6ZSwgdmlld1Jlc29sdXRpb24sIFBSSU5UX1BBUEVSX1NJWkVfLCBQUklOVF9TQ0FMRVNfKVxuICAgICAgOiBQUklOVF9TQ0FMRVNfWzBdO1xuICBjb25zdCByb3RhdGlvbiA9IG1hcC5nZXRWaWV3KCkuZ2V0Um90YXRpb24oKTtcbiAgY29uc3QgZHBpID0gUFJJTlRfRFBJXztcbiAgY29uc3QgZm9ybWF0ID0gUFJJTlRfRk9STUFUXztcbiAgY29uc3QgbGF5b3V0ID0gUFJJTlRfTEFZT1VUXztcbiAgdGhpcy5wcmludFN0YXRlID0gJ1ByaW50aW5nLi4uJztcbiAgY29uc3Qgc3BlYyA9IHRoaXMucHJpbnRfLmNyZWF0ZVNwZWMobWFwLCBzY2FsZSwgcm90YXRpb24sIGRwaSwgbGF5b3V0LCBmb3JtYXQsIHtcbiAgICAnZGF0YXNvdXJjZSc6IFtdLFxuICAgICdkZWJ1Zyc6IDAsXG4gICAgJ2NvbW1lbnRzJzogJ015IGNvbW1lbnRzJyxcbiAgICAndGl0bGUnOiAnTXkgcHJpbnQnLFxuICB9KTtcbiAgdGhpcy5wcmludF9cbiAgICAuY3JlYXRlUmVwb3J0KHNwZWMpXG4gICAgLnRoZW4odGhpcy5oYW5kbGVDcmVhdGVSZXBvcnRTdWNjZXNzXy5iaW5kKHRoaXMpLCB0aGlzLmhhbmRsZUNyZWF0ZVJlcG9ydEVycm9yXy5iaW5kKHRoaXMpKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCduZ2VvL3ByaW50L21hcGZpc2gtcHJpbnQtdjMnKS5NYXBGaXNoUHJpbnRSZXBvcnRSZXNwb25zZT59IHJlc3BcbiAqICAgIFJlc3BvbnNlLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlQ3JlYXRlUmVwb3J0U3VjY2Vzc18gPSBmdW5jdGlvbiAocmVzcCkge1xuICB0aGlzLmdldFN0YXR1c18ocmVzcC5kYXRhLnJlZik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWYgUmVmLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U3RhdHVzXyA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgdGhpcy5wcmludF9cbiAgICAuZ2V0U3RhdHVzKHJlZilcbiAgICAudGhlbih0aGlzLmhhbmRsZUdldFN0YXR1c1N1Y2Nlc3NfLmJpbmQodGhpcywgcmVmKSwgdGhpcy5oYW5kbGVHZXRTdGF0dXNFcnJvcl8uYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnbmdlby9wcmludC9tYXBmaXNoLXByaW50LXYzJykuTWFwRmlzaFByaW50U3RhdHVzUmVzcG9uc2U+fSByZXNwXG4gKiAgICBSZXNwb25zZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUNyZWF0ZVJlcG9ydEVycm9yXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gIHRoaXMucHJpbnRTdGF0ZSA9ICdQcmludCBlcnJvcic7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWYgUmVmLlxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwUmVzcG9uc2U8aW1wb3J0KCduZ2VvL3ByaW50L21hcGZpc2gtcHJpbnQtdjMnKS5NYXBGaXNoUHJpbnRTdGF0dXNSZXNwb25zZT59IHJlc3BcbiAqICAgIFJlc3BvbnNlLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlR2V0U3RhdHVzU3VjY2Vzc18gPSBmdW5jdGlvbiAocmVmLCByZXNwKSB7XG4gIGNvbnN0IG1mUmVzcCA9IHJlc3AuZGF0YTtcbiAgY29uc3QgZG9uZSA9IG1mUmVzcC5kb25lO1xuICBpZiAoZG9uZSkge1xuICAgIC8vIFRoZSByZXBvcnQgaXMgcmVhZHkuIE9wZW4gaXQgYnkgY2hhbmdpbmcgdGhlIHdpbmRvdyBsb2NhdGlvbi5cbiAgICB0aGlzLnByaW50U3RhdGUgPSAnJztcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMucHJpbnRfLmdldFJlcG9ydFVybChyZWYpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZSByZXBvcnQgaXMgbm90IHJlYWR5IHlldC4gQ2hlY2sgYWdhaW4gaW4gMXMuXG4gICAgdGhpcy4kdGltZW91dF8oXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0U3RhdHVzXyhyZWYpO1xuICAgICAgfSxcbiAgICAgIDEwMDAsXG4gICAgICBmYWxzZSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnbmdlby9wcmludC9tYXBmaXNoLXByaW50LXYzJykuTWFwRmlzaFByaW50U3RhdHVzUmVzcG9uc2U+fSByZXNwXG4gKiAgICBSZXNwb25zZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldFN0YXR1c0Vycm9yXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gIHRoaXMucHJpbnRTdGF0ZSA9ICdQcmludCBlcnJvcic7XG59O1xuYXBwbW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuYXBwbW9kdWxlLmNvbnN0YW50KCduZ2VvVGlsZXNQcmVsb2FkaW5nTGltaXQnLCAwKTtcbm9wdGlvbnMoYXBwbW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFwZmlzaHByaW50XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9tYXBmaXNocHJpbnQuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==