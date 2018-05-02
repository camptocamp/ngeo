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
/******/ 		"elevationProfile": 0
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
/******/ 	deferredModules.push([13,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/elevationProfile.css":
/*!***************************************!*\
  !*** ./examples/elevationProfile.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/elevationProfile.js":
/*!**************************************!*\
  !*** ./examples/elevationProfile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevationProfile.css */ "./examples/elevationProfile.css");
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _geoblocks_proj_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url.js */ "./examples/url.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/profile/elevationComponent.js */ "./src/profile/elevationComponent.js");
// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__["default"].name, ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_14__["default"].name]);

/**
 * Factory for creating simple getter functions for extractors.
 * If the value is in a child property, the opt_childKey must be defined.
 * The type parameter is used by closure to type the returned function.
 * @param {string} key Key used for retrieving the value.
 * @param {string=} opt_childKey Key of a child object.
 * @return {function(unknown): any} Getter function.
 */
const typedFunctionsFactory = function (key, opt_childKey) {
  return (
    /**
     * @param {unknown} item
     * @return {any}
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

/**
 * @constructor
 * @param {angular.IHttpService} $http The $http angular service.
 * @param {angular.IScope} $scope The $scope angular service.
 * @ngInject
 */
function MainController($http, $scope) {
  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  const source = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
  const source2 = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
    url: _url_js__WEBPACK_IMPORTED_MODULE_3__["MAPSERVER_PROXY"],
    crossOrigin: 'anonymous',
    attributions: '&copy; <a href="https:/osm.org/">OpoenStreetMap</a>',
    params: {
      'LAYERS': 'default',
    },
    serverType: 'mapserver',
  });

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [
      new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        source: source2,
      }),
      new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source,
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      projection: _geoblocks_proj_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    }),
  });

  const map = this.map;

  const vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
    source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__["default"](),
  });

  this.snappedPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
  /** @type {olSourceVector<import("ol/geom/Geometry.js").default>} */ (vectorLayer.getSource()).addFeature(
    this.snappedPoint_
  );

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(map);

  /**
   * @type {Object[]}
   */
  this.profilePoisData = [
    {sort: 1, dist: 1000, title: 'First POI', id: 12345},
    {sort: 2, dist: 3000, title: 'Second POI', id: 12346},
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
    const lineString = new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_7__["default"]([], 'XYM');
    for (i = 0; i < len; i++) {
      const p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }
    source.addFeature(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"](lineString));

    const size = this.map.getSize();
    if (size === undefined) {
      throw new Error('Missing size');
    }
    map.getView().fit(source.getExtent(), {size});
  });

  map.on(
    'pointermove',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<MouseEvent>} evt
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
      }
    )
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
   * @type {import('ngeo/profile/elevationComponent.js').PoiExtractor}
   */
  const poiExtractor = {
    sort,
    id,
    dist,
    title,
    /**
     * @param {Object} item POI.
     * @param {number=} opt_z Z value.
     * @return {number} Z value.
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
    this.snappedPoint_.setGeometry(new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__["default"]([point.x, point.y]));
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
 * @param {import("ol/coordinate.js").Coordinate} coordinate The current pointer coordinate.
 * @param {import("ol/geom/Geometry.js").default} geometry The geometry to snap to.
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

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ 13:
/*!*************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/elevationProfile.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/elevationProfile.js */"./examples/elevationProfile.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxldmF0aW9uUHJvZmlsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9lbGV2YXRpb25Qcm9maWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJlbGV2YXRpb25Qcm9maWxlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsxMyxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyMSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vZWxldmF0aW9uUHJvZmlsZS5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnQGdlb2Jsb2Nrcy9wcm9qL0VQU0dfMjA1Ni5qcyc7XG5pbXBvcnQge01BUFNFUlZFUl9QUk9YWX0gZnJvbSAnLi91cmwuanMnO1xuXG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sR2VvbUxpbmVTdHJpbmcgZnJvbSAnb2wvZ2VvbS9MaW5lU3RyaW5nLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UuanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50IGZyb20gJ25nZW8vcHJvZmlsZS9lbGV2YXRpb25Db21wb25lbnQuanMnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9Qcm9maWxlRWxldmF0aW9uQ29tcG9uZW50Lm5hbWVdKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyBzaW1wbGUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgZXh0cmFjdG9ycy5cbiAqIElmIHRoZSB2YWx1ZSBpcyBpbiBhIGNoaWxkIHByb3BlcnR5LCB0aGUgb3B0X2NoaWxkS2V5IG11c3QgYmUgZGVmaW5lZC5cbiAqIFRoZSB0eXBlIHBhcmFtZXRlciBpcyB1c2VkIGJ5IGNsb3N1cmUgdG8gdHlwZSB0aGUgcmV0dXJuZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB1c2VkIGZvciByZXRyaWV2aW5nIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7c3RyaW5nPX0gb3B0X2NoaWxkS2V5IEtleSBvZiBhIGNoaWxkIG9iamVjdC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9uKHVua25vd24pOiBhbnl9IEdldHRlciBmdW5jdGlvbi5cbiAqL1xuY29uc3QgdHlwZWRGdW5jdGlvbnNGYWN0b3J5ID0gZnVuY3Rpb24gKGtleSwgb3B0X2NoaWxkS2V5KSB7XG4gIHJldHVybiAoXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt1bmtub3dufSBpdGVtXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAob3B0X2NoaWxkS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpdGVtID0gaXRlbVtvcHRfY2hpbGRLZXldO1xuICAgICAgfVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIGl0ZW1ba2V5XTtcbiAgICB9XG4gICk7XG59O1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHthbmd1bGFyLklIdHRwU2VydmljZX0gJGh0dHAgVGhlICRodHRwIGFuZ3VsYXIgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBUaGUgJHNjb3BlIGFuZ3VsYXIgc2VydmljZS5cbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICBjb25zdCBzb3VyY2UgPSBuZXcgb2xTb3VyY2VWZWN0b3IoKTtcbiAgY29uc3Qgc291cmNlMiA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBjcm9zc09yaWdpbjogJ2Fub255bW91cycsXG4gICAgYXR0cmlidXRpb25zOiAnJmNvcHk7IDxhIGhyZWY9XCJodHRwczovb3NtLm9yZy9cIj5PcG9lblN0cmVldE1hcDwvYT4nLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdkZWZhdWx0JyxcbiAgICB9LFxuICAgIHNlcnZlclR5cGU6ICdtYXBzZXJ2ZXInLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm9sL01hcC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgICAgIHNvdXJjZTogc291cmNlMixcbiAgICAgIH0pLFxuICAgICAgbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgICBzb3VyY2UsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgfSksXG4gIH0pO1xuXG4gIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuXG4gIGNvbnN0IHZlY3RvckxheWVyID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgIHNvdXJjZTogbmV3IG9sU291cmNlVmVjdG9yKCksXG4gIH0pO1xuXG4gIHRoaXMuc25hcHBlZFBvaW50XyA9IG5ldyBvbEZlYXR1cmUoKTtcbiAgLyoqIEB0eXBlIHtvbFNvdXJjZVZlY3RvcjxpbXBvcnQoXCJvbC9nZW9tL0dlb21ldHJ5LmpzXCIpLmRlZmF1bHQ+fSAqLyAodmVjdG9yTGF5ZXIuZ2V0U291cmNlKCkpLmFkZEZlYXR1cmUoXG4gICAgdGhpcy5zbmFwcGVkUG9pbnRfXG4gICk7XG5cbiAgLy8gVXNlIHZlY3RvckxheWVyLnNldE1hcChtYXApIHJhdGhlciB0aGFuIG1hcC5hZGRMYXllcih2ZWN0b3JMYXllcikuIFRoaXNcbiAgLy8gbWFrZXMgdGhlIHZlY3RvciBsYXllciBcInVubWFuYWdlZFwiLCBtZWFuaW5nIHRoYXQgaXQgaXMgYWx3YXlzIG9uIHRvcC5cbiAgdmVjdG9yTGF5ZXIuc2V0TWFwKG1hcCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3RbXX1cbiAgICovXG4gIHRoaXMucHJvZmlsZVBvaXNEYXRhID0gW1xuICAgIHtzb3J0OiAxLCBkaXN0OiAxMDAwLCB0aXRsZTogJ0ZpcnN0IFBPSScsIGlkOiAxMjM0NX0sXG4gICAge3NvcnQ6IDIsIGRpc3Q6IDMwMDAsIHRpdGxlOiAnU2Vjb25kIFBPSScsIGlkOiAxMjM0Nn0sXG4gIF07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3R8dW5kZWZpbmVkfVxuICAgKi9cbiAgdGhpcy5wcm9maWxlRGF0YSA9IHVuZGVmaW5lZDtcblxuICAkaHR0cC5nZXQoJ2RhdGEvcHJvZmlsZS5qc29uJykudGhlbigocmVzcCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZXNwLmRhdGEucHJvZmlsZTtcbiAgICB0aGlzLnByb2ZpbGVEYXRhID0gZGF0YTtcblxuICAgIGxldCBpO1xuICAgIGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IGxpbmVTdHJpbmcgPSBuZXcgb2xHZW9tTGluZVN0cmluZyhbXSwgJ1hZTScpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcCA9IGRhdGFbaV07XG4gICAgICBsaW5lU3RyaW5nLmFwcGVuZENvb3JkaW5hdGUoW3AueCwgcC55LCBwLmRpc3RdKTtcbiAgICB9XG4gICAgc291cmNlLmFkZEZlYXR1cmUobmV3IG9sRmVhdHVyZShsaW5lU3RyaW5nKSk7XG5cbiAgICBjb25zdCBzaXplID0gdGhpcy5tYXAuZ2V0U2l6ZSgpO1xuICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgfVxuICAgIG1hcC5nZXRWaWV3KCkuZml0KHNvdXJjZS5nZXRFeHRlbnQoKSwge3NpemV9KTtcbiAgfSk7XG5cbiAgbWFwLm9uKFxuICAgICdwb2ludGVybW92ZScsXG4gICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi8gKFxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvTWFwQnJvd3NlckV2ZW50LmpzJykuZGVmYXVsdDxNb3VzZUV2ZW50Pn0gZXZ0XG4gICAgICAgKi8gKGV2dCkgPT4ge1xuICAgICAgICBpZiAoZXZ0LmRyYWdnaW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBtYXAuZ2V0RXZlbnRDb29yZGluYXRlKGV2dC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBzb3VyY2UuZ2V0RmVhdHVyZXMoKVswXS5nZXRHZW9tZXRyeSgpO1xuICAgICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdlb21ldHJ5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbmFwVG9HZW9tZXRyeShjb29yZGluYXRlLCBnZW9tZXRyeSk7XG4gICAgICB9XG4gICAgKVxuICApO1xuXG4gIGNvbnN0IGRpc3RhbmNlRXh0cmFjdG9yID0gdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdkaXN0Jyk7XG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbihPYmplY3QpOiBudW1iZXJ9ICovXG4gIGNvbnN0IHNvcnQgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ3NvcnQnKTtcbiAgLyoqIEB0eXBlIHtmdW5jdGlvbihPYmplY3QpOiBzdHJpbmd9ICovXG4gIGNvbnN0IGlkID0gdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdpZCcpO1xuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IG51bWJlcn0gKi9cbiAgY29uc3QgZGlzdCA9IHR5cGVkRnVuY3Rpb25zRmFjdG9yeSgnZGlzdCcpO1xuICAvKiogQHR5cGUge2Z1bmN0aW9uKE9iamVjdCk6IHN0cmluZ30gKi9cbiAgY29uc3QgdGl0bGUgPSB0eXBlZEZ1bmN0aW9uc0ZhY3RvcnkoJ3RpdGxlJyk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcHJvZmlsZS9lbGV2YXRpb25Db21wb25lbnQuanMnKS5Qb2lFeHRyYWN0b3J9XG4gICAqL1xuICBjb25zdCBwb2lFeHRyYWN0b3IgPSB7XG4gICAgc29ydCxcbiAgICBpZCxcbiAgICBkaXN0LFxuICAgIHRpdGxlLFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIFBPSS5cbiAgICAgKiBAcGFyYW0ge251bWJlcj19IG9wdF96IFogdmFsdWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBaIHZhbHVlLlxuICAgICAqL1xuICAgIHo6IChpdGVtLCBvcHRfeikgPT4ge1xuICAgICAgaWYgKG9wdF96ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpdGVtLnogPSBvcHRfejtcbiAgICAgIH1cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiBpdGVtLno7XG4gICAgfSxcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHBvaW50IFBvaW50LlxuICAgKi9cbiAgY29uc3QgaG92ZXJDYWxsYmFjayA9IChwb2ludCkgPT4ge1xuICAgIC8vIEFuIGl0ZW0gaW4gdGhlIGxpc3Qgb2YgcG9pbnRzIGdpdmVuIHRvIHRoZSBwcm9maWxlLlxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5zbmFwcGVkUG9pbnRfLnNldEdlb21ldHJ5KG5ldyBvbEdlb21Qb2ludChbcG9pbnQueCwgcG9pbnQueV0pKTtcbiAgfTtcblxuICBjb25zdCBvdXRDYWxsYmFjayA9ICgpID0+IHtcbiAgICB0aGlzLnBvaW50ID0gbnVsbDtcbiAgICB0aGlzLnNuYXBwZWRQb2ludF8uc2V0R2VvbWV0cnkodW5kZWZpbmVkKTtcbiAgfTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHRoaXMucHJvZmlsZU9wdGlvbnMgPSB7XG4gICAgZGlzdGFuY2VFeHRyYWN0b3IsXG4gICAgcG9pRXh0cmFjdG9yLFxuICAgIGhvdmVyQ2FsbGJhY2ssXG4gICAgb3V0Q2FsbGJhY2ssXG4gIH07XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICB0aGlzLnBvaW50ID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcnx1bmRlZmluZWR9XG4gICAqL1xuICB0aGlzLnByb2ZpbGVIaWdobGlnaHQgPSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoXCJvbC9jb29yZGluYXRlLmpzXCIpLkNvb3JkaW5hdGV9IGNvb3JkaW5hdGUgVGhlIGN1cnJlbnQgcG9pbnRlciBjb29yZGluYXRlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJvbC9nZW9tL0dlb21ldHJ5LmpzXCIpLmRlZmF1bHR9IGdlb21ldHJ5IFRoZSBnZW9tZXRyeSB0byBzbmFwIHRvLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuc25hcFRvR2VvbWV0cnkgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgZ2VvbWV0cnkpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCBjbG9zZXN0UG9pbnQgPSBnZW9tZXRyeS5nZXRDbG9zZXN0UG9pbnQoY29vcmRpbmF0ZSk7XG4gIC8vIGNvbXB1dGUgZGlzdGFuY2UgdG8gbGluZSBpbiBwaXhlbHNcbiAgY29uc3QgZHggPSBjbG9zZXN0UG9pbnRbMF0gLSBjb29yZGluYXRlWzBdO1xuICBjb25zdCBkeSA9IGNsb3Nlc3RQb2ludFsxXSAtIGNvb3JkaW5hdGVbMV07XG4gIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICBjb25zdCByZXNvbHV0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKTtcbiAgaWYgKHJlc29sdXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyByZXNvbHV0aW9uJyk7XG4gIH1cbiAgY29uc3QgcGl4ZWxEaXN0ID0gZGlzdCAvIHJlc29sdXRpb247XG5cbiAgaWYgKHBpeGVsRGlzdCA8IDgpIHtcbiAgICB0aGlzLnByb2ZpbGVIaWdobGlnaHQgPSBjbG9zZXN0UG9pbnRbMl07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcm9maWxlSGlnaGxpZ2h0ID0gLTE7XG4gIH1cbiAgdGhpcy5zY29wZV8uJGFwcGx5KCk7XG59O1xuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcblxubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Qcm9maWxlT3B0aW9ucycsIHtcbiAgbGluZXNDb25maWd1cmF0aW9uOiB7XG4gICAgJ2xpbmUxJzoge1xuICAgICAgc3R5bGU6IHt9LFxuICAgICAgekV4dHJhY3RvcjogdHlwZWRGdW5jdGlvbnNGYWN0b3J5KCdtbnQnLCAndmFsdWVzJyksXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==