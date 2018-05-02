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
/******/ 		"search": 0
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
/******/ 	deferredModules.push([39,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/search.css":
/*!*****************************!*\
  !*** ./examples/search.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/search.js":
/*!****************************!*\
  !*** ./examples/search.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var _search_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.css */ "./examples/search.css");
/* harmony import */ var _search_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_search_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_search_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/search/module */ "./src/search/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/geom/SimpleGeometry */ "./node_modules/ol/geom/SimpleGeometry.js");
// The MIT License (MIT)
//
// Copyright (c) 2015-2026 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_search_module__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

/**
 * @type {angular.IComponentOptions}
 */
const searchComponent = {
  bindings: {
    'map': '=appSearchMap',
  },
  controller: 'AppSearchController',
  template:
    '<input type="text" placeholder="search…" ' +
    'ngeo-search="$ctrl.options" ' +
    'ngeo-search-datasets="$ctrl.datasets" ' +
    'ngeo-search-listeners="$ctrl.listeners">',
};

myModule.component('appSearch', searchComponent);

/**
 * @class
 * @param {JQuery} $element Element.
 * @param {angular.IScope} $rootScope Angular root scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {Function} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @ngInject
 */
function SearchController($element, $rootScope, $compile, ngeoSearchCreateGeoJSONBloodhound) {
  /**
   * @type {JQuery}
   */
  this.$element = $element;

  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.vectorLayer_;

  /** @type {Bloodhound<*>} */
  const bloodhoundEngine = this.createAndInitBloodhound_(ngeoSearchCreateGeoJSONBloodhound);

  /**
   * @type {Twitter.Typeahead.Options}
   */
  this.options = /** @type {Twitter.Typeahead.Options} */ ({
    highlight: true,
    hint: undefined,
    minLength: undefined,
  });

  /**
   * @type {Twitter.Typeahead.Dataset<import('ol/Feature').default<import('ol/geom/Geometry').default>>[]}
   */
  this.datasets = [
    {
      source: bloodhoundEngine.ttAdapter(),
      display: (suggestion) => {
        const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
          suggestion
        );
        return feature.get('label');
      },
      templates: {
        header: () => '<div class="ngeo-header">Addresses</div>',
        suggestion: (suggestion) => {
          const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
            suggestion
          );

          // A scope for the ng-click on the suggestion's « i » button.
          const scope = $rootScope.$new(true);
          // @ts-ignore: scope ......
          scope.feature = feature;
          // @ts-ignore: scope ......
          scope.click = function (event) {
            window.alert(feature.get('label'));
            event.stopPropagation();
          };

          const html = `<p>${feature.get('label')}<button ng-click="click($event)">i</button></p>`;
          return $compile(html)(scope).html();
        },
      },
    },
  ];

  /**
   * @type {import('ngeo/search/searchDirective').SearchDirectiveListeners<*>}
   */
  this.listeners = {
    select: (event, suggestion, dataset) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (
        suggestion
      );
      const featureGeometry = feature.getGeometry();
      if (!(featureGeometry instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_14__["default"])) {
        throw new Error('Missing Wrong geometry type');
      }
      const size = this.map.getSize();
      if (!size) {
        throw new Error('Missing size');
      }
      /**
       * @type {olSourceVector<import('ol/geom/Geometry').default>}
       */
      const source = this.vectorLayer_.getSource();
      source.clear(true);
      source.addFeature(feature);
      this.map.getView().fit(featureGeometry, {
        size: size,
        maxZoom: 16,
      });
    },
  };
}

/**
 */
SearchController.prototype.$onInit = function () {
  this.vectorLayer_ = this.createVectorLayer_();
  // Empty the search field on focus and blur.
  const input = this.$element.find('input');
  input.on('focus blur', () => {
    input.val('');
  });
};

/**
 * @returns {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>} The vector layer.
 */
SearchController.prototype.createVectorLayer_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
    source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__["default"](),
  });
  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  vectorLayer.setMap(this.map);
  return vectorLayer;
};

/**
 * @param {Function} ngeoSearchCreateGeoJSONBloodhound
 *    The ngeo create GeoJSON Bloodhound service.
 * @returns {Bloodhound<*>} The bloodhound engine.
 */
SearchController.prototype.createAndInitBloodhound_ = function (ngeoSearchCreateGeoJSONBloodhound) {
  const url = _url__WEBPACK_IMPORTED_MODULE_1__["SEARCH"];
  const bloodhound = ngeoSearchCreateGeoJSONBloodhound(url, undefined, ol_proj__WEBPACK_IMPORTED_MODULE_11__["get"]('EPSG:3857'), ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_5__["proj"]);
  bloodhound.initialize();
  return bloodhound;
};

myModule.controller('AppSearchController', SearchController);

/**
 * @class
 * @ngInject
 */
function MainController() {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_9__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_8__["default"]({
      center: [0, 0],
      zoom: 4,
    }),
  });
}

myModule.controller('MainController', MainController);
Object(_options__WEBPACK_IMPORTED_MODULE_4__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ 39:
/*!***************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/search.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/search.js */"./examples/search.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3NlYXJjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwic2VhcmNoXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFszOSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7U0VBUkNIfSBmcm9tICcuL3VybCc7XG5pbXBvcnQgJy4vc2VhcmNoLmNzcyc7XG5cbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7cHJvaiBhcyBFUFNHMjA1Nn0gZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5pbXBvcnQgbmdlb1NlYXJjaE1vZHVsZSBmcm9tICduZ2VvL3NlYXJjaC9tb2R1bGUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuaW1wb3J0IFNpbXBsZUdlb21ldHJ5IGZyb20gJ29sL2dlb20vU2ltcGxlR2VvbWV0cnknO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZSwgbmdlb1NlYXJjaE1vZHVsZS5uYW1lXSk7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IHNlYXJjaENvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBTZWFyY2hNYXAnLFxuICB9LFxuICBjb250cm9sbGVyOiAnQXBwU2VhcmNoQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlOlxuICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInNlYXJjaOKAplwiICcgK1xuICAgICduZ2VvLXNlYXJjaD1cIiRjdHJsLm9wdGlvbnNcIiAnICtcbiAgICAnbmdlby1zZWFyY2gtZGF0YXNldHM9XCIkY3RybC5kYXRhc2V0c1wiICcgK1xuICAgICduZ2VvLXNlYXJjaC1saXN0ZW5lcnM9XCIkY3RybC5saXN0ZW5lcnNcIj4nLFxufTtcblxubXlNb2R1bGUuY29tcG9uZW50KCdhcHBTZWFyY2gnLCBzZWFyY2hDb21wb25lbnQpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkcm9vdFNjb3BlIEFuZ3VsYXIgcm9vdCBzY29wZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JQ29tcGlsZVNlcnZpY2V9ICRjb21waWxlIEFuZ3VsYXIgY29tcGlsZSBzZXJ2aWNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbmdlb1NlYXJjaENyZWF0ZUdlb0pTT05CbG9vZGhvdW5kXG4gKiAgICBUaGUgbmdlbyBjcmVhdGUgR2VvSlNPTiBCbG9vZGhvdW5kIHNlcnZpY2UuXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gU2VhcmNoQ29udHJvbGxlcigkZWxlbWVudCwgJHJvb3RTY29wZSwgJGNvbXBpbGUsIG5nZW9TZWFyY2hDcmVhdGVHZW9KU09OQmxvb2Rob3VuZCkge1xuICAvKipcbiAgICogQHR5cGUge0pRdWVyeX1cbiAgICovXG4gIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICB0aGlzLnZlY3RvckxheWVyXztcblxuICAvKiogQHR5cGUge0Jsb29kaG91bmQ8Kj59ICovXG4gIGNvbnN0IGJsb29kaG91bmRFbmdpbmUgPSB0aGlzLmNyZWF0ZUFuZEluaXRCbG9vZGhvdW5kXyhuZ2VvU2VhcmNoQ3JlYXRlR2VvSlNPTkJsb29kaG91bmQpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7VHdpdHRlci5UeXBlYWhlYWQuT3B0aW9uc31cbiAgICovXG4gIHRoaXMub3B0aW9ucyA9IC8qKiBAdHlwZSB7VHdpdHRlci5UeXBlYWhlYWQuT3B0aW9uc30gKi8gKHtcbiAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgaGludDogdW5kZWZpbmVkLFxuICAgIG1pbkxlbmd0aDogdW5kZWZpbmVkLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge1R3aXR0ZXIuVHlwZWFoZWFkLkRhdGFzZXQ8aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj5bXX1cbiAgICovXG4gIHRoaXMuZGF0YXNldHMgPSBbXG4gICAge1xuICAgICAgc291cmNlOiBibG9vZGhvdW5kRW5naW5lLnR0QWRhcHRlcigpLFxuICAgICAgZGlzcGxheTogKHN1Z2dlc3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgZmVhdHVyZSA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn0gKi8gKFxuICAgICAgICAgIHN1Z2dlc3Rpb25cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmUuZ2V0KCdsYWJlbCcpO1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlczoge1xuICAgICAgICBoZWFkZXI6ICgpID0+ICc8ZGl2IGNsYXNzPVwibmdlby1oZWFkZXJcIj5BZGRyZXNzZXM8L2Rpdj4nLFxuICAgICAgICBzdWdnZXN0aW9uOiAoc3VnZ2VzdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPSAvKiogQHR5cGUge2ltcG9ydCgnb2wvRmVhdHVyZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59ICovIChcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gQSBzY29wZSBmb3IgdGhlIG5nLWNsaWNrIG9uIHRoZSBzdWdnZXN0aW9uJ3MgwqsgaSDCuyBidXR0b24uXG4gICAgICAgICAgY29uc3Qgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcodHJ1ZSk7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZTogc2NvcGUgLi4uLi4uXG4gICAgICAgICAgc2NvcGUuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZTogc2NvcGUgLi4uLi4uXG4gICAgICAgICAgc2NvcGUuY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChmZWF0dXJlLmdldCgnbGFiZWwnKSk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgaHRtbCA9IGA8cD4ke2ZlYXR1cmUuZ2V0KCdsYWJlbCcpfTxidXR0b24gbmctY2xpY2s9XCJjbGljaygkZXZlbnQpXCI+aTwvYnV0dG9uPjwvcD5gO1xuICAgICAgICAgIHJldHVybiAkY29tcGlsZShodG1sKShzY29wZSkuaHRtbCgpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICBdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3NlYXJjaC9zZWFyY2hEaXJlY3RpdmUnKS5TZWFyY2hEaXJlY3RpdmVMaXN0ZW5lcnM8Kj59XG4gICAqL1xuICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICBzZWxlY3Q6IChldmVudCwgc3VnZ2VzdGlvbiwgZGF0YXNldCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBmZWF0dXJlID0gLyoqIEB0eXBlIHtpbXBvcnQoJ29sL0ZlYXR1cmUnKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fSAqLyAoXG4gICAgICAgIHN1Z2dlc3Rpb25cbiAgICAgICk7XG4gICAgICBjb25zdCBmZWF0dXJlR2VvbWV0cnkgPSBmZWF0dXJlLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoIShmZWF0dXJlR2VvbWV0cnkgaW5zdGFuY2VvZiBTaW1wbGVHZW9tZXRyeSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFdyb25nIGdlb21ldHJ5IHR5cGUnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG4gICAgICBpZiAoIXNpemUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogQHR5cGUge29sU291cmNlVmVjdG9yPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgICAgICovXG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnZlY3RvckxheWVyXy5nZXRTb3VyY2UoKTtcbiAgICAgIHNvdXJjZS5jbGVhcih0cnVlKTtcbiAgICAgIHNvdXJjZS5hZGRGZWF0dXJlKGZlYXR1cmUpO1xuICAgICAgdGhpcy5tYXAuZ2V0VmlldygpLmZpdChmZWF0dXJlR2VvbWV0cnksIHtcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgbWF4Wm9vbTogMTYsXG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufVxuXG4vKipcbiAqL1xuU2VhcmNoQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy52ZWN0b3JMYXllcl8gPSB0aGlzLmNyZWF0ZVZlY3RvckxheWVyXygpO1xuICAvLyBFbXB0eSB0aGUgc2VhcmNoIGZpZWxkIG9uIGZvY3VzIGFuZCBibHVyLlxuICBjb25zdCBpbnB1dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW5wdXQnKTtcbiAgaW5wdXQub24oJ2ZvY3VzIGJsdXInLCAoKSA9PiB7XG4gICAgaW5wdXQudmFsKCcnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59IFRoZSB2ZWN0b3IgbGF5ZXIuXG4gKi9cblNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZVZlY3RvckxheWVyXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCB2ZWN0b3JMYXllciA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3RvcigpLFxuICB9KTtcbiAgLy8gVXNlIHZlY3RvckxheWVyLnNldE1hcChtYXApIHJhdGhlciB0aGFuIG1hcC5hZGRMYXllcih2ZWN0b3JMYXllcikuIFRoaXNcbiAgLy8gbWFrZXMgdGhlIHZlY3RvciBsYXllciBcInVubWFuYWdlZFwiLCBtZWFuaW5nIHRoYXQgaXQgaXMgYWx3YXlzIG9uIHRvcC5cbiAgdmVjdG9yTGF5ZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgcmV0dXJuIHZlY3RvckxheWVyO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZ2VvU2VhcmNoQ3JlYXRlR2VvSlNPTkJsb29kaG91bmRcbiAqICAgIFRoZSBuZ2VvIGNyZWF0ZSBHZW9KU09OIEJsb29kaG91bmQgc2VydmljZS5cbiAqIEByZXR1cm5zIHtCbG9vZGhvdW5kPCo+fSBUaGUgYmxvb2Rob3VuZCBlbmdpbmUuXG4gKi9cblNlYXJjaENvbnRyb2xsZXIucHJvdG90eXBlLmNyZWF0ZUFuZEluaXRCbG9vZGhvdW5kXyA9IGZ1bmN0aW9uIChuZ2VvU2VhcmNoQ3JlYXRlR2VvSlNPTkJsb29kaG91bmQpIHtcbiAgY29uc3QgdXJsID0gU0VBUkNIO1xuICBjb25zdCBibG9vZGhvdW5kID0gbmdlb1NlYXJjaENyZWF0ZUdlb0pTT05CbG9vZGhvdW5kKHVybCwgdW5kZWZpbmVkLCBvbFByb2ouZ2V0KCdFUFNHOjM4NTcnKSwgRVBTRzIwNTYpO1xuICBibG9vZGhvdW5kLmluaXRpYWxpemUoKTtcbiAgcmV0dXJuIGJsb29kaG91bmQ7XG59O1xuXG5teU1vZHVsZS5jb250cm9sbGVyKCdBcHBTZWFyY2hDb250cm9sbGVyJywgU2VhcmNoQ29udHJvbGxlcik7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFswLCAwXSxcbiAgICAgIHpvb206IDQsXG4gICAgfSksXG4gIH0pO1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=