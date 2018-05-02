/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/elevationProfile.js"
/*!**************************************!*\
  !*** ./examples/elevationProfile.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _elevationProfile_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevationProfile.scss */ "./examples/elevationProfile.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_profile_elevationComponent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/profile/elevationComponent */ "./src/profile/elevationComponent.js");
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_13__["default"].name, ngeo_profile_elevationComponent__WEBPACK_IMPORTED_MODULE_15__["default"].name]);

/**
 * Factory for creating simple getter functions for extractors.
 * If the value is in a child property, the opt_childKey must be defined.
 * The type parameter is used by closure to type the returned function.
 *
 * @param {string} key Key used for retrieving the value.
 * @param {string} [opt_childKey] Key of a child object.
 * @returns {function(unknown): any} Getter function.
 */
const typedFunctionsFactory = function (key, opt_childKey) {
  return (
    /**
     * @param {unknown} item
     * @returns {any}
     */
    function (item) {
      if (opt_childKey !== undefined) {
        // @ts-ignore
        item = item[opt_childKey];
      }
      // @ts-ignore
      return item[key];
    }
  );
};

MainController.$inject = ['$http', '$scope'];

/**
 * @class
 * @param {angular.IHttpService} $http The $http angular service.
 * @param {angular.IScope} $scope The $scope angular service.
 */
function MainController($http, $scope) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;
  const source = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_12__["default"]();
  const source2 = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_11__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_3__.MAPSERVER_PROXY,
    crossOrigin: 'anonymous',
    attributions: '&copy; <a href="https:/osm.org/">OpoenStreetMap</a>',
    params: {
      'LAYERS': 'default',
    },
    serverType: 'mapserver',
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [
      new ol_layer_Image__WEBPACK_IMPORTED_MODULE_9__["default"]({
        source: source2,
      }),
      new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source,
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_6__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_2__["default"],
    }),
  });
  const map = this.map;
  const vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
    source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_12__["default"](),
  });
  this.snappedPoint_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_4__["default"]();
  /** @type {olSourceVector<import('ol/geom/Geometry').default>} */
  vectorLayer.getSource().addFeature(this.snappedPoint_);

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {Object[]}
   */
  this.profilePoisData = [
    {
      sort: 1,
      dist: 1000,
      title: 'First POI',
      id: 12345,
    },
    {
      sort: 2,
      dist: 3000,
      title: 'Second POI',
      id: 12346,
    },
  ];

  /**
   * @type {Object|undefined}
   */
  this.profileData = undefined;
  $http.get('data/profile.json').then((resp) => {
    const data = resp.data.profile;
    this.profileData = data;
    let i;
    const len = data.length;
    const lineString = new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_7__["default"]([], 'XYM');
    for (i = 0; i < len; i++) {
      const p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new ol_Feature__WEBPACK_IMPORTED_MODULE_4__["default"](lineString));
    const size = this.map.getSize();
    if (size === undefined) {
      throw new Error('Missing size');
    }
    map.getView().fit(source.getExtent(), {
      size,
    });
  });
  map.on(
    /** @type {import('ol/Observable').EventTypes} */ 'pointermove',
    /** @type {function(?): ?} */
    /**
     * @param {import('ol/MapBrowserEvent').default<MouseEvent>} evt
     */ (evt) => {
      if (evt.dragging) {
        return;
      }
      const coordinate = map.getEventCoordinate(evt.originalEvent);
      const geometry = source.getFeatures()[0].getGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      this.snapToGeometry(coordinate, geometry);
    },
  );
  const distanceExtractor = typedFunctionsFactory('dist');

  /** @type {function(Object): number} */
  const sort = typedFunctionsFactory('sort');
  /** @type {function(Object): string} */
  const id = typedFunctionsFactory('id');
  /** @type {function(Object): number} */
  const dist = typedFunctionsFactory('dist');
  /** @type {function(Object): string} */
  const title = typedFunctionsFactory('title');

  /**
   * @type {import('ngeo/profile/elevationComponent').PoiExtractor}
   */
  const poiExtractor = {
    sort,
    id,
    dist,
    title,
    /**
     * @param {Object} item POI.
     * @param {number} [opt_z] Z value.
     * @returns {number} Z value.
     */
    z: (item, opt_z) => {
      if (opt_z !== undefined) {
        // @ts-ignore
        item.z = opt_z;
      }
      // @ts-ignore
      return item.z;
    },
  };

  /**
   * @param {Object} point Point.
   */
  const hoverCallback = (point) => {
    // An item in the list of points given to the profile.
    this.point = point;
    // @ts-ignore
    this.snappedPoint_.setGeometry(new ol_geom_Point__WEBPACK_IMPORTED_MODULE_8__["default"]([point.x, point.y]));
  };
  const outCallback = () => {
    this.point = null;
    this.snappedPoint_.setGeometry(undefined);
  };

  /**
   * @type {Object}
   */
  this.profileOptions = {
    distanceExtractor,
    poiExtractor,
    hoverCallback,
    outCallback,
  };

  /**
   * @type {Object}
   */
  this.point = null;

  /**
   * @type {number|undefined}
   */
  this.profileHighlight = undefined;
}

/**
 * @param {import('ol/coordinate').Coordinate} coordinate The current pointer coordinate.
 * @param {import('ol/geom/Geometry').default} geometry The geometry to snap to.
 */
MainController.prototype.snapToGeometry = function (coordinate, geometry) {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const closestPoint = geometry.getClosestPoint(coordinate);
  // compute distance to line in pixels
  const dx = closestPoint[0] - coordinate[0];
  const dy = closestPoint[1] - coordinate[1];
  const dist = Math.sqrt(dx * dx + dy * dy);
  const resolution = this.map.getView().getResolution();
  if (resolution === undefined) {
    throw new Error('Missing resolution');
  }
  const pixelDist = dist / resolution;
  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }
  this.scope_.$apply();
};
myModule.controller('MainController', MainController);
myModule.constant('ngeoProfileOptions', {
  linesConfiguration: {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory('mnt', 'values'),
    },
  },
});
(0,_options__WEBPACK_IMPORTED_MODULE_14__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/elevationProfile.scss"
/*!****************************************!*\
  !*** ./examples/elevationProfile.scss ***!
  \****************************************/
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
/******/ 			"elevationProfile": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/elevationProfile.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uUHJvZmlsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6UkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2VsZXZhdGlvblByb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2VsZXZhdGlvblByb2ZpbGUuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE1LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL2VsZXZhdGlvblByb2ZpbGUuc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuaW1wb3J0IHtNQVBTRVJWRVJfUFJPWFl9IGZyb20gJy4vdXJsJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IG9sTGF5ZXJJbWFnZSBmcm9tICdvbC9sYXllci9JbWFnZSc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvUHJvZmlsZUVsZXZhdGlvbkNvbXBvbmVudCBmcm9tICduZ2VvL3Byb2ZpbGUvZWxldmF0aW9uQ29tcG9uZW50JztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50Lm5hbWVdKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyBzaW1wbGUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgZXh0cmFjdG9ycy5cbiAqIElmIHRoZSB2YWx1ZSBpcyBpbiBhIGNoaWxkIHByb3BlcnR5LCB0aGUgb3B0X2NoaWxkS2V5IG11c3QgYmUgZGVmaW5lZC5cbiAqIFRoZSB0eXBlIHBhcmFtZXRlciBpcyB1c2VkIGJ5IGNsb3N1cmUgdG8gdHlwZSB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgdXNlZCBmb3IgcmV0cmlldmluZyB0aGUgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdF9jaGlsZEtleV0gS2V5IG9mIGEgY2hpbGQgb2JqZWN0LlxuICogQHJldHVybnMge2Z1bmN0aW9uKHVua25vd24pOiBhbnl9IEdldHRlciBmdW5jdGlvbi5cbiAqL1xuY29uc3QgdHlwZWRGdW5jdGlvbnNGYWN0b3J5ID0gZnVuY3Rpb24gKGtleSwgb3B0X2NoaWxkS2V5KSB7XG4gIHJldHVybiAoXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt1bmtub3dufSBpdGVtXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKG9wdF9jaGlsZEtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaXRlbSA9IGl0ZW1bb3B0X2NoaWxkS2V5XTtcbiAgICAgIH1cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiBpdGVtW2tleV07XG4gICAgfVxuICApO1xufTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGh0dHAnLCAnJHNjb3BlJ107XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBTZXJ2aWNlfSAkaHR0cCBUaGUgJGh0dHAgYW5ndWxhciBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFRoZSAkc2NvcGUgYW5ndWxhciBzZXJ2aWNlLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcbiAgY29uc3Qgc291cmNlID0gbmV3IG9sU291cmNlVmVjdG9yKCk7XG4gIGNvbnN0IHNvdXJjZTIgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgY3Jvc3NPcmlnaW46ICdhbm9ueW1vdXMnLFxuICAgIGF0dHJpYnV0aW9uczogJyZjb3B5OyA8YSBocmVmPVwiaHR0cHM6L29zbS5vcmcvXCI+T3BvZW5TdHJlZXRNYXA8L2E+JyxcbiAgICBwYXJhbXM6IHtcbiAgICAgICdMQVlFUlMnOiAnZGVmYXVsdCcsXG4gICAgfSxcbiAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJyxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllckltYWdlKHtcbiAgICAgICAgc291cmNlOiBzb3VyY2UyLFxuICAgICAgfSksXG4gICAgICBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICAgIHNvdXJjZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuICBjb25zdCB2ZWN0b3JMYXllciA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3RvcigpLFxuICB9KTtcbiAgdGhpcy5zbmFwcGVkUG9pbnRfID0gbmV3IG9sRmVhdHVyZSgpO1xuICAvKiogQHR5cGUge29sU291cmNlVmVjdG9yPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqL1xuICB2ZWN0b3JMYXllci5nZXRTb3VyY2UoKS5hZGRGZWF0dXJlKHRoaXMuc25hcHBlZFBvaW50Xyk7XG5cbiAgLy8gVXNlIHZlY3RvckxheWVyLnNldE1hcChtYXApIHJhdGhlciB0aGFuIG1hcC5hZGRMYXllcih2ZWN0b3JMYXllcikuIFRoaXNcbiAgLy8gbWFrZXMgdGhlIHZlY3RvciBsYXllciBcInVubWFuYWdlZFwiLCBtZWFuaW5nIHRoYXQgaXQgaXMgYWx3YXlzIG9uIHRvcC5cbiAgdmVjdG9yTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3RbXX1cbiAgICovXG4gIHRoaXMucHJvZmlsZVBvaXNEYXRhID0gW1xuICAgIHtcbiAgICAgIHNvcnQ6IDEsXG4gICAgICBkaXN0OiAxMDAwLFxuICAgICAgdGl0bGU6ICdGaXJzdCBQT0knLFxuICAgICAgaWQ6IDEyMzQ1LFxuICAgIH0sXG4gICAge1xuICAgICAgc29ydDogMixcbiAgICAgIGRpc3Q6IDMwMDAsXG4gICAgICB0aXRsZTogJ1NlY29uZCBQT0knLFxuICAgICAgaWQ6IDEyMzQ2LFxuICAgIH0sXG4gIF07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgdGhpcy5wcm9maWxlRGF0YSA9IHVuZGVmaW5lZDtcbiAgJGh0dHAuZ2V0KCdkYXRhL3Byb2ZpbGUuanNvbicpLnRoZW4oKHJlc3ApID0+IHtcbiAgICBjb25zdCBkYXRhID0gcmVzcC5kYXRhLnByb2ZpbGU7XG4gICAgdGhpcy5wcm9maWxlRGF0YSA9IGRhdGE7XG4gICAgbGV0IGk7XG4gICAgY29uc3QgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgY29uc3QgbGluZVN0cmluZyA9IG5ldyBvbEdlb21MaW5lU3RyaW5nKFtdLCAnWFlNJyk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gZGF0YVtpXTtcbiAgICAgIGxpbmVTdHJpbmcuYXBwZW5kQ29vcmRpbmF0ZShbcC54LCBwLnksIHAuZGlzdF0pO1xuICAgIH1cbiAgICBzb3VyY2UuYWRkRmVhdHVyZShuZXcgb2xGZWF0dXJlKGxpbmVTdHJpbmcpKTtcbiAgICBjb25zdCBzaXplID0gdGhpcy5tYXAuZ2V0U2l6ZSgpO1xuICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgfVxuICAgIG1hcC5nZXRWaWV3KCkuZml0KHNvdXJjZS5nZXRFeHRlbnQoKSwge1xuICAgICAgc2l6ZSxcbiAgICB9KTtcbiAgfSk7XG4gIG1hcC5vbihcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdwb2ludGVybW92ZScsXG4gICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi9cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvTWFwQnJvd3NlckV2ZW50JykuZGVmYXVsdDxNb3VzZUV2ZW50Pn0gZXZ0XG4gICAgICovIChldnQpID0+IHtcbiAgICAgIGlmIChldnQuZHJhZ2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IG1hcC5nZXRFdmVudENvb3JkaW5hdGUoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBzb3VyY2UuZ2V0RmVhdHVyZXMoKVswXS5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc25hcFRvR2VvbWV0cnkoY29vcmRpbmF0ZSwgZ2VvbWV0cnkpO1xuICAgIH0sXG4gICk7XG4gIGNvbnN0IGRpc3RhbmNlRXh0cmFjdG9yID0gdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdkaXN0Jyk7XG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbihPYmplY3QpOiBudW1iZXJ9ICovXG4gIGNvbnN0IHNvcnQgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ3NvcnQnKTtcbiAgLyoqIEB0eXBlIHtmdW5jdGlvbihPYmplY3QpOiBzdHJpbmd9ICovXG4gIGNvbnN0IGlkID0gdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdpZCcpO1xuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IG51bWJlcn0gKi9cbiAgY29uc3QgZGlzdCA9IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSgnZGlzdCcpO1xuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IHN0cmluZ30gKi9cbiAgY29uc3QgdGl0bGUgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ3RpdGxlJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcHJvZmlsZS9lbGV2YXRpb25Db21wb25lbnQnKS5Qb2lFeHRyYWN0b3J9XG4gICAqL1xuICBjb25zdCBwb2lFeHRyYWN0b3IgPSB7XG4gICAgc29ydCxcbiAgICBpZCxcbiAgICBkaXN0LFxuICAgIHRpdGxlLFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIFBPSS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdF96XSBaIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFogdmFsdWUuXG4gICAgICovXG4gICAgejogKGl0ZW0sIG9wdF96KSA9PiB7XG4gICAgICBpZiAob3B0X3ogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGl0ZW0ueiA9IG9wdF96O1xuICAgICAgfVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIGl0ZW0uejtcbiAgICB9LFxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnQgUG9pbnQuXG4gICAqL1xuICBjb25zdCBob3ZlckNhbGxiYWNrID0gKHBvaW50KSA9PiB7XG4gICAgLy8gQW4gaXRlbSBpbiB0aGUgbGlzdCBvZiBwb2ludHMgZ2l2ZW4gdG8gdGhlIHByb2ZpbGUuXG4gICAgdGhpcy5wb2ludCA9IHBvaW50O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLnNuYXBwZWRQb2ludF8uc2V0R2VvbWV0cnkobmV3IG9sR2VvbVBvaW50KFtwb2ludC54LCBwb2ludC55XSkpO1xuICB9O1xuICBjb25zdCBvdXRDYWxsYmFjayA9ICgpID0+IHtcbiAgICB0aGlzLnBvaW50ID0gbnVsbDtcbiAgICB0aGlzLnNuYXBwZWRQb2ludF8uc2V0R2VvbWV0cnkodW5kZWZpbmVkKTtcbiAgfTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHRoaXMucHJvZmlsZU9wdGlvbnMgPSB7XG4gICAgZGlzdGFuY2VFeHRyYWN0b3IsXG4gICAgcG9pRXh0cmFjdG9yLFxuICAgIGhvdmVyQ2FsbGJhY2ssXG4gICAgb3V0Q2FsbGJhY2ssXG4gIH07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB0aGlzLnBvaW50ID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcnx1bmRlZmluZWR9XG4gICAqL1xuICB0aGlzLnByb2ZpbGVIaWdobGlnaHQgPSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ29sL2Nvb3JkaW5hdGUnKS5Db29yZGluYXRlfSBjb29yZGluYXRlIFRoZSBjdXJyZW50IHBvaW50ZXIgY29vcmRpbmF0ZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdH0gZ2VvbWV0cnkgVGhlIGdlb21ldHJ5IHRvIHNuYXAgdG8uXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5zbmFwVG9HZW9tZXRyeSA9IGZ1bmN0aW9uIChjb29yZGluYXRlLCBnZW9tZXRyeSkge1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGNvbnN0IGNsb3Nlc3RQb2ludCA9IGdlb21ldHJ5LmdldENsb3Nlc3RQb2ludChjb29yZGluYXRlKTtcbiAgLy8gY29tcHV0ZSBkaXN0YW5jZSB0byBsaW5lIGluIHBpeGVsc1xuICBjb25zdCBkeCA9IGNsb3Nlc3RQb2ludFswXSAtIGNvb3JkaW5hdGVbMF07XG4gIGNvbnN0IGR5ID0gY2xvc2VzdFBvaW50WzFdIC0gY29vcmRpbmF0ZVsxXTtcbiAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xuICBpZiAocmVzb2x1dGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlc29sdXRpb24nKTtcbiAgfVxuICBjb25zdCBwaXhlbERpc3QgPSBkaXN0IC8gcmVzb2x1dGlvbjtcbiAgaWYgKHBpeGVsRGlzdCA8IDgpIHtcbiAgICB0aGlzLnByb2ZpbGVIaWdobGlnaHQgPSBjbG9zZXN0UG9pbnRbMl07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcm9maWxlSGlnaGxpZ2h0ID0gLTE7XG4gIH1cbiAgdGhpcy5zY29wZV8uJGFwcGx5KCk7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1Byb2ZpbGVPcHRpb25zJywge1xuICBsaW5lc0NvbmZpZ3VyYXRpb246IHtcbiAgICAnbGluZTEnOiB7XG4gICAgICBzdHlsZToge30sXG4gICAgICB6RXh0cmFjdG9yOiB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ21udCcsICd2YWx1ZXMnKSxcbiAgICB9LFxuICB9LFxufSk7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDaGVjayBpZiBtb2R1bGUgZXhpc3RzIChkZXZlbG9wbWVudCBvbmx5KVxuXHRpZiAoX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJlbGV2YXRpb25Qcm9maWxlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9