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
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/elevationProfile.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uUHJvZmlsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6UkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLmpzIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLnNjc3MiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL3NldCBhbm9ueW1vdXMgZGVmYXVsdCBleHBvcnQgbmFtZSIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vZWxldmF0aW9uUHJvZmlsZS5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5pbXBvcnQge01BUFNFUlZFUl9QUk9YWX0gZnJvbSAnLi91cmwnO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50IGZyb20gJ25nZW8vcHJvZmlsZS9lbGV2YXRpb25Db21wb25lbnQnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZSwgbmdlb1Byb2ZpbGVFbGV2YXRpb25Db21wb25lbnQubmFtZV0pO1xuXG4vKipcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHNpbXBsZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBleHRyYWN0b3JzLlxuICogSWYgdGhlIHZhbHVlIGlzIGluIGEgY2hpbGQgcHJvcGVydHksIHRoZSBvcHRfY2hpbGRLZXkgbXVzdCBiZSBkZWZpbmVkLlxuICogVGhlIHR5cGUgcGFyYW1ldGVyIGlzIHVzZWQgYnkgY2xvc3VyZSB0byB0eXBlIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB1c2VkIGZvciByZXRyaWV2aW5nIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0X2NoaWxkS2V5XSBLZXkgb2YgYSBjaGlsZCBvYmplY3QuXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24odW5rbm93bik6IGFueX0gR2V0dGVyIGZ1bmN0aW9uLlxuICovXG5jb25zdCB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkgPSBmdW5jdGlvbiAoa2V5LCBvcHRfY2hpbGRLZXkpIHtcbiAgcmV0dXJuIChcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3Vua25vd259IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAob3B0X2NoaWxkS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpdGVtID0gaXRlbVtvcHRfY2hpbGRLZXldO1xuICAgICAgfVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIGl0ZW1ba2V5XTtcbiAgICB9XG4gICk7XG59O1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckaHR0cCcsICckc2NvcGUnXTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIFRoZSAkaHR0cCBhbmd1bGFyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgVGhlICRzY29wZSBhbmd1bGFyIHNlcnZpY2UuXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICovXG4gIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuICBjb25zdCBzb3VyY2UgPSBuZXcgb2xTb3VyY2VWZWN0b3IoKTtcbiAgY29uc3Qgc291cmNlMiA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXG4gICAgYXR0cmlidXRpb25zOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovb3NtLm9yZy9cIj5PcG9lblN0cmVldE1hcDwvYT4nLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdkZWZhdWx0JyxcbiAgICB9LFxuICAgIHNlcnZlclR5cGU6ICdtYXBzZXJ2ZXInLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVySW1hZ2Uoe1xuICAgICAgICBzb3VyY2U6IHNvdXJjZTIsXG4gICAgICB9KSxcbiAgICAgIG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgICAgc291cmNlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgIH0pLFxuICB9KTtcbiAgY29uc3QgbWFwID0gdGhpcy5tYXA7XG4gIGNvbnN0IHZlY3RvckxheWVyID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgIHNvdXJjZTogbmV3IG9sU291cmNlVmVjdG9yKCksXG4gIH0pO1xuICB0aGlzLnNuYXBwZWRQb2ludF8gPSBuZXcgb2xGZWF0dXJlKCk7XG4gIC8qKiBAdHlwZSB7b2xTb3VyY2VWZWN0b3I8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59ICovXG4gIHZlY3RvckxheWVyLmdldFNvdXJjZSgpLmFkZEZlYXR1cmUodGhpcy5zbmFwcGVkUG9pbnRfKTtcblxuICAvLyBVc2UgdmVjdG9yTGF5ZXIuc2V0TWFwKG1hcCkgcmF0aGVyIHRoYW4gbWFwLmFkZExheWVyKHZlY3RvckxheWVyKS4gVGhpc1xuICAvLyBtYWtlcyB0aGUgdmVjdG9yIGxheWVyIFwidW5tYW5hZ2VkXCIsIG1lYW5pbmcgdGhhdCBpdCBpcyBhbHdheXMgb24gdG9wLlxuICB2ZWN0b3JMYXllci5zZXRNYXAobWFwKTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdFtdfVxuICAgKi9cbiAgdGhpcy5wcm9maWxlUG9pc0RhdGEgPSBbXG4gICAge1xuICAgICAgc29ydDogMSxcbiAgICAgIGRpc3Q6IDEwMDAsXG4gICAgICB0aXRsZTogJ0ZpcnN0IFBPSScsXG4gICAgICBpZDogMTIzNDUsXG4gICAgfSxcbiAgICB7XG4gICAgICBzb3J0OiAyLFxuICAgICAgZGlzdDogMzAwMCxcbiAgICAgIHRpdGxlOiAnU2Vjb25kIFBPSScsXG4gICAgICBpZDogMTIzNDYsXG4gICAgfSxcbiAgXTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdHx1bmRlZmluZWR9XG4gICAqL1xuICB0aGlzLnByb2ZpbGVEYXRhID0gdW5kZWZpbmVkO1xuICAkaHR0cC5nZXQoJ2RhdGEvcHJvZmlsZS5qc29uJykudGhlbigocmVzcCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZXNwLmRhdGEucHJvZmlsZTtcbiAgICB0aGlzLnByb2ZpbGVEYXRhID0gZGF0YTtcbiAgICBsZXQgaTtcbiAgICBjb25zdCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBsaW5lU3RyaW5nID0gbmV3IG9sR2VvbUxpbmVTdHJpbmcoW10sICdYWU0nKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHAgPSBkYXRhW2ldO1xuICAgICAgbGluZVN0cmluZy5hcHBlbmRDb29yZGluYXRlKFtwLngsIHAueSwgcC5kaXN0XSk7XG4gICAgfVxuICAgIHNvdXJjZS5hZGRGZWF0dXJlKG5ldyBvbEZlYXR1cmUobGluZVN0cmluZykpO1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG4gICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICB9XG4gICAgbWFwLmdldFZpZXcoKS5maXQoc291cmNlLmdldEV4dGVudCgpLCB7XG4gICAgICBzaXplLFxuICAgIH0pO1xuICB9KTtcbiAgbWFwLm9uKFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9PYnNlcnZhYmxlJykuRXZlbnRUeXBlc30gKi8gJ3BvaW50ZXJtb3ZlJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQnKS5kZWZhdWx0PE1vdXNlRXZlbnQ+fSBldnRcbiAgICAgKi8gKGV2dCkgPT4ge1xuICAgICAgaWYgKGV2dC5kcmFnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gbWFwLmdldEV2ZW50Q29vcmRpbmF0ZShldnQub3JpZ2luYWxFdmVudCk7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IHNvdXJjZS5nZXRGZWF0dXJlcygpWzBdLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZW9tZXRyeScpO1xuICAgICAgfVxuICAgICAgdGhpcy5zbmFwVG9HZW9tZXRyeShjb29yZGluYXRlLCBnZW9tZXRyeSk7XG4gICAgfSxcbiAgKTtcbiAgY29uc3QgZGlzdGFuY2VFeHRyYWN0b3IgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ2Rpc3QnKTtcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IG51bWJlcn0gKi9cbiAgY29uc3Qgc29ydCA9IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSgnc29ydCcpO1xuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IHN0cmluZ30gKi9cbiAgY29uc3QgaWQgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ2lkJyk7XG4gIC8qKiBAdHlwZSB7ZnVuY3Rpb24oT2JqZWN0KTogbnVtYmVyfSAqL1xuICBjb25zdCBkaXN0ID0gdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdkaXN0Jyk7XG4gIC8qKiBAdHlwZSB7ZnVuY3Rpb24oT2JqZWN0KTogc3RyaW5nfSAqL1xuICBjb25zdCB0aXRsZSA9IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSgndGl0bGUnKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9wcm9maWxlL2VsZXZhdGlvbkNvbXBvbmVudCcpLlBvaUV4dHJhY3Rvcn1cbiAgICovXG4gIGNvbnN0IHBvaUV4dHJhY3RvciA9IHtcbiAgICBzb3J0LFxuICAgIGlkLFxuICAgIGRpc3QsXG4gICAgdGl0bGUsXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gUE9JLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0X3pdIFogdmFsdWUuXG4gICAgICogQHJldHVybnMge251bWJlcn0gWiB2YWx1ZS5cbiAgICAgKi9cbiAgICB6OiAoaXRlbSwgb3B0X3opID0+IHtcbiAgICAgIGlmIChvcHRfeiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaXRlbS56ID0gb3B0X3o7XG4gICAgICB9XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXR1cm4gaXRlbS56O1xuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludCBQb2ludC5cbiAgICovXG4gIGNvbnN0IGhvdmVyQ2FsbGJhY2sgPSAocG9pbnQpID0+IHtcbiAgICAvLyBBbiBpdGVtIGluIHRoZSBsaXN0IG9mIHBvaW50cyBnaXZlbiB0byB0aGUgcHJvZmlsZS5cbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuc25hcHBlZFBvaW50Xy5zZXRHZW9tZXRyeShuZXcgb2xHZW9tUG9pbnQoW3BvaW50LngsIHBvaW50LnldKSk7XG4gIH07XG4gIGNvbnN0IG91dENhbGxiYWNrID0gKCkgPT4ge1xuICAgIHRoaXMucG9pbnQgPSBudWxsO1xuICAgIHRoaXMuc25hcHBlZFBvaW50Xy5zZXRHZW9tZXRyeSh1bmRlZmluZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgdGhpcy5wcm9maWxlT3B0aW9ucyA9IHtcbiAgICBkaXN0YW5jZUV4dHJhY3RvcixcbiAgICBwb2lFeHRyYWN0b3IsXG4gICAgaG92ZXJDYWxsYmFjayxcbiAgICBvdXRDYWxsYmFjayxcbiAgfTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHRoaXMucG9pbnQgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH1cbiAgICovXG4gIHRoaXMucHJvZmlsZUhpZ2hsaWdodCA9IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnb2wvY29vcmRpbmF0ZScpLkNvb3JkaW5hdGV9IGNvb3JkaW5hdGUgVGhlIGN1cnJlbnQgcG9pbnRlciBjb29yZGluYXRlLlxuICogQHBhcmFtIHtpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0fSBnZW9tZXRyeSBUaGUgZ2VvbWV0cnkgdG8gc25hcCB0by5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLnNuYXBUb0dlb21ldHJ5ID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUsIGdlb21ldHJ5KSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgY29uc3QgY2xvc2VzdFBvaW50ID0gZ2VvbWV0cnkuZ2V0Q2xvc2VzdFBvaW50KGNvb3JkaW5hdGUpO1xuICAvLyBjb21wdXRlIGRpc3RhbmNlIHRvIGxpbmUgaW4gcGl4ZWxzXG4gIGNvbnN0IGR4ID0gY2xvc2VzdFBvaW50WzBdIC0gY29vcmRpbmF0ZVswXTtcbiAgY29uc3QgZHkgPSBjbG9zZXN0UG9pbnRbMV0gLSBjb29yZGluYXRlWzFdO1xuICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCk7XG4gIGlmIChyZXNvbHV0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVzb2x1dGlvbicpO1xuICB9XG4gIGNvbnN0IHBpeGVsRGlzdCA9IGRpc3QgLyByZXNvbHV0aW9uO1xuICBpZiAocGl4ZWxEaXN0IDwgOCkge1xuICAgIHRoaXMucHJvZmlsZUhpZ2hsaWdodCA9IGNsb3Nlc3RQb2ludFsyXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByb2ZpbGVIaWdobGlnaHQgPSAtMTtcbiAgfVxuICB0aGlzLnNjb3BlXy4kYXBwbHkoKTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvUHJvZmlsZU9wdGlvbnMnLCB7XG4gIGxpbmVzQ29uZmlndXJhdGlvbjoge1xuICAgICdsaW5lMSc6IHtcbiAgICAgIHN0eWxlOiB7fSxcbiAgICAgIHpFeHRyYWN0b3I6IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSgnbW50JywgJ3ZhbHVlcycpLFxuICAgIH0sXG4gIH0sXG59KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsImNvbnN0IGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxldCBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHRsZXQgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0Y29uc3QgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHRjb25zdCBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0aWYoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZShpIDwgZGVmaW5pdGlvbi5sZW5ndGgpIHtcblx0XHRcdHZhciBrZXkgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHR2YXIgYmluZGluZyA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRpZihiaW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogZGVmaW5pdGlvbltpKytdIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBiaW5kaW5nIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoYmluZGluZyA9PT0gMCkgeyBpKys7IH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYoU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIHNldCAubmFtZSBmb3IgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cyBwZXIgRVMgc3BlY1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kbiA9ICh4KSA9PiB7XG5cdChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIFwibmFtZVwiKSB8fCB7fSkud3JpdGFibGUgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHgsIFwibmFtZVwiLCB7IHZhbHVlOiBcImRlZmF1bHRcIiwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuY29uc3QgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImVsZXZhdGlvblByb2ZpbGVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuY29uc3Qgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0bGV0IFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxuY29uc3QgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG5sZXQgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=