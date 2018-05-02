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
/******/ 		"backgroundlayer": 0
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
/******/ 	deferredModules.push([3,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/backgroundlayer.css":
/*!**************************************!*\
  !*** ./examples/backgroundlayer.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/backgroundlayer.js":
/*!*************************************!*\
  !*** ./examples/backgroundlayer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _backgroundlayer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backgroundlayer.css */ "./examples/backgroundlayer.css");
/* harmony import */ var _backgroundlayer_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_backgroundlayer_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_source_AsitVD__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/source/AsitVD */ "./src/source/AsitVD.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./options */ "./examples/options.js");
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_12__["default"].name]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/backgroundlayer', __webpack_require__(/*! ./partials/backgroundlayer.html */ "./examples/partials/backgroundlayer.html"));
  }
);

/**
 * The application-specific background layer component.
 *
 * The component is based on Angular's select, ngOptions, ngModel, and
 * ngChange components. ngChange is used to avoid adding a watcher on
 * the ngModel expression.
 *
 * Note: we don't need two-way binding for ngModel here, but using ::
 * for the ngModel expression doesn't actually make a difference. This
 * is because ngModel doesn't actually watch the ngModel expression.
 *
 * @type {angular.IComponentOptions}
 */
const backgroundlayerComponent = {
  bindings: {
    'map': '=appBackgroundlayerMap',
  },
  templateUrl: 'partials/backgroundlayer',
  controller: 'AppBackgroundlayerController',
};

myModule.component('appBackgroundlayer', backgroundlayerComponent);

/**
 * @class
 * @param {angular.IHttpService} $http Angular http service.
 * @param {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager} ngeoBackgroundLayerMgr
 *    Background layer manager.
 * @ngInject
 */
function BackgroundlayerController($http, ngeoBackgroundLayerMgr) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('gmf/themes').GmfLayer[]|undefined}
   */
  this.bgLayers = undefined;

  /**
   * @type {import('gmf/themes').GmfLayer}
   */
  this.bgLayer = null;

  $http.get('data/backgroundlayers.json').then((resp) => {
    this.bgLayers = resp.data;
    if (!this.bgLayers) {
      throw new Error('Missing bgLayers');
    }
    // Use the first layer by default
    this.bgLayer = this.bgLayers[0];
  });

  /**
   * @type {import('ngeo/map/BackgroundLayerMgr').MapBackgroundLayerManager}
   */
  this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;
}

/**
 * Function called when the user selects a new background layer through
 * the select element. The ngChange directive used in the partial calls
 * it.
 */
BackgroundlayerController.prototype.change = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const layerSpec = this.bgLayer;
  const layer = this.getLayer_(layerSpec.name);
  this.backgroundLayerMgr_.set(this.map, layer);
};

/**
 * @param {string} layerName Layer name.
 * @returns {import('ol/layer/Layer').default<*>} The layer.
 */
BackgroundlayerController.prototype.getLayer_ = function (layerName) {
  if (layerName === 'blank') {
    const layer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_10__["default"](),
    });
    layer.set('label', 'blank');
    return layer;
  }

  const source = new ngeo_source_AsitVD__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layer: layerName,
  });
  return new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_8__["default"]({source});
};

myModule.controller('AppBackgroundlayerController', BackgroundlayerController);

/**
 * @class
 * @param {angular.IScope} $scope Controller scope.
 * @ngInject
 */
function MainController($scope) {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_5__["default"]({
    view: new ol_View__WEBPACK_IMPORTED_MODULE_6__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_4__["default"],
      resolutions: [1000, 500, 200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2535000, 1160000],
      zoom: 3,
    }),
  });

  const source = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_11__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_3__["MAPSERVER_PROXY"],
    params: {'LAYERS': 'default'},
    serverType: 'mapserver',
  });
  /**
   * An overlay layer.
   *
   * @type {import('ol/layer/Image').default<import('ol/source/Image').default>}
   */
  const overlay = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_7__["default"]({
    source,
  });

  this.map.addLayer(overlay);
}

myModule.controller('MainController', MainController);
myModule.constant('ngeoTilesPreloadingLimit', 0);
Object(_options__WEBPACK_IMPORTED_MODULE_13__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./examples/partials/backgroundlayer.html":
/*!************************************************!*\
  !*** ./examples/partials/backgroundlayer.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<select\n  class="form-control backgroundlayer-selector"\n  ng-options="layer.name for layer in ::$ctrl.bgLayers"\n  ng-model="$ctrl.bgLayer"\n  ng-change="$ctrl.change()"\n></select>\n';

}
return __p
}

/***/ }),

/***/ 3:
/*!************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/backgroundlayer.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/backgroundlayer.js */"./examples/backgroundlayer.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZGxheWVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL2JhY2tncm91bmRsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9wYXJ0aWFscy9iYWNrZ3JvdW5kbGF5ZXIuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYmFja2dyb3VuZGxheWVyXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFszLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNS0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9iYWNrZ3JvdW5kbGF5ZXIuY3NzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Tb3VyY2VBc2l0VkQgZnJvbSAnbmdlby9zb3VyY2UvQXNpdFZEJztcbmltcG9ydCB7TUFQU0VSVkVSX1BST1hZfSBmcm9tICcuL3VybCc7XG5cbmltcG9ydCBFUFNHMjA1NiBmcm9tICduZ2VvL3Byb2ovRVBTR18yMDU2JztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgVmVjdG9yTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBWZWN0b3JTb3VyY2UgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZV0pO1xuXG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAbmdJbmplY3RcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3BhcnRpYWxzL2JhY2tncm91bmRsYXllcicsIHJlcXVpcmUoJy4vcGFydGlhbHMvYmFja2dyb3VuZGxheWVyLmh0bWwnKSk7XG4gIH1cbik7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uLXNwZWNpZmljIGJhY2tncm91bmQgbGF5ZXIgY29tcG9uZW50LlxuICpcbiAqIFRoZSBjb21wb25lbnQgaXMgYmFzZWQgb24gQW5ndWxhcidzIHNlbGVjdCwgbmdPcHRpb25zLCBuZ01vZGVsLCBhbmRcbiAqIG5nQ2hhbmdlIGNvbXBvbmVudHMuIG5nQ2hhbmdlIGlzIHVzZWQgdG8gYXZvaWQgYWRkaW5nIGEgd2F0Y2hlciBvblxuICogdGhlIG5nTW9kZWwgZXhwcmVzc2lvbi5cbiAqXG4gKiBOb3RlOiB3ZSBkb24ndCBuZWVkIHR3by13YXkgYmluZGluZyBmb3IgbmdNb2RlbCBoZXJlLCBidXQgdXNpbmcgOjpcbiAqIGZvciB0aGUgbmdNb2RlbCBleHByZXNzaW9uIGRvZXNuJ3QgYWN0dWFsbHkgbWFrZSBhIGRpZmZlcmVuY2UuIFRoaXNcbiAqIGlzIGJlY2F1c2UgbmdNb2RlbCBkb2Vzbid0IGFjdHVhbGx5IHdhdGNoIHRoZSBuZ01vZGVsIGV4cHJlc3Npb24uXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IGJhY2tncm91bmRsYXllckNvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBCYWNrZ3JvdW5kbGF5ZXJNYXAnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2JhY2tncm91bmRsYXllcicsXG4gIGNvbnRyb2xsZXI6ICdBcHBCYWNrZ3JvdW5kbGF5ZXJDb250cm9sbGVyJyxcbn07XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwQmFja2dyb3VuZGxheWVyJywgYmFja2dyb3VuZGxheWVyQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFNlcnZpY2V9ICRodHRwIEFuZ3VsYXIgaHR0cCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWFwL0JhY2tncm91bmRMYXllck1ncicpLk1hcEJhY2tncm91bmRMYXllck1hbmFnZXJ9IG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcbiAqICAgIEJhY2tncm91bmQgbGF5ZXIgbWFuYWdlci5cbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBCYWNrZ3JvdW5kbGF5ZXJDb250cm9sbGVyKCRodHRwLCBuZ2VvQmFja2dyb3VuZExheWVyTWdyKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyW118dW5kZWZpbmVkfVxuICAgKi9cbiAgdGhpcy5iZ0xheWVycyA9IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnZ21mL3RoZW1lcycpLkdtZkxheWVyfVxuICAgKi9cbiAgdGhpcy5iZ0xheWVyID0gbnVsbDtcblxuICAkaHR0cC5nZXQoJ2RhdGEvYmFja2dyb3VuZGxheWVycy5qc29uJykudGhlbigocmVzcCkgPT4ge1xuICAgIHRoaXMuYmdMYXllcnMgPSByZXNwLmRhdGE7XG4gICAgaWYgKCF0aGlzLmJnTGF5ZXJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYmdMYXllcnMnKTtcbiAgICB9XG4gICAgLy8gVXNlIHRoZSBmaXJzdCBsYXllciBieSBkZWZhdWx0XG4gICAgdGhpcy5iZ0xheWVyID0gdGhpcy5iZ0xheWVyc1swXTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWFwL0JhY2tncm91bmRMYXllck1ncicpLk1hcEJhY2tncm91bmRMYXllck1hbmFnZXJ9XG4gICAqL1xuICB0aGlzLmJhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBuZXcgYmFja2dyb3VuZCBsYXllciB0aHJvdWdoXG4gKiB0aGUgc2VsZWN0IGVsZW1lbnQuIFRoZSBuZ0NoYW5nZSBkaXJlY3RpdmUgdXNlZCBpbiB0aGUgcGFydGlhbCBjYWxsc1xuICogaXQuXG4gKi9cbkJhY2tncm91bmRsYXllckNvbnRyb2xsZXIucHJvdG90eXBlLmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCBsYXllclNwZWMgPSB0aGlzLmJnTGF5ZXI7XG4gIGNvbnN0IGxheWVyID0gdGhpcy5nZXRMYXllcl8obGF5ZXJTcGVjLm5hbWUpO1xuICB0aGlzLmJhY2tncm91bmRMYXllck1ncl8uc2V0KHRoaXMubWFwLCBsYXllcik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYXllck5hbWUgTGF5ZXIgbmFtZS5cbiAqIEByZXR1cm5zIHtpbXBvcnQoJ29sL2xheWVyL0xheWVyJykuZGVmYXVsdDwqPn0gVGhlIGxheWVyLlxuICovXG5CYWNrZ3JvdW5kbGF5ZXJDb250cm9sbGVyLnByb3RvdHlwZS5nZXRMYXllcl8gPSBmdW5jdGlvbiAobGF5ZXJOYW1lKSB7XG4gIGlmIChsYXllck5hbWUgPT09ICdibGFuaycpIHtcbiAgICBjb25zdCBsYXllciA9IG5ldyBWZWN0b3JMYXllcih7XG4gICAgICBzb3VyY2U6IG5ldyBWZWN0b3JTb3VyY2UoKSxcbiAgICB9KTtcbiAgICBsYXllci5zZXQoJ2xhYmVsJywgJ2JsYW5rJyk7XG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG5cbiAgY29uc3Qgc291cmNlID0gbmV3IG5nZW9Tb3VyY2VBc2l0VkQoe1xuICAgIGxheWVyOiBsYXllck5hbWUsXG4gIH0pO1xuICByZXR1cm4gbmV3IG9sTGF5ZXJUaWxlKHtzb3VyY2V9KTtcbn07XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcEJhY2tncm91bmRsYXllckNvbnRyb2xsZXInLCBCYWNrZ3JvdW5kbGF5ZXJDb250cm9sbGVyKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBDb250cm9sbGVyIHNjb3BlLlxuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsxMDAwLCA1MDAsIDIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM1MDAwLCAxMTYwMDAwXSxcbiAgICAgIHpvb206IDMsXG4gICAgfSksXG4gIH0pO1xuXG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBwYXJhbXM6IHsnTEFZRVJTJzogJ2RlZmF1bHQnfSxcbiAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJyxcbiAgfSk7XG4gIC8qKlxuICAgKiBBbiBvdmVybGF5IGxheWVyLlxuICAgKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9sYXllci9JbWFnZScpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvSW1hZ2UnKS5kZWZhdWx0Pn1cbiAgICovXG4gIGNvbnN0IG92ZXJsYXkgPSBuZXcgb2xMYXllckltYWdlKHtcbiAgICBzb3VyY2UsXG4gIH0pO1xuXG4gIHRoaXMubWFwLmFkZExheWVyKG92ZXJsYXkpO1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvVGlsZXNQcmVsb2FkaW5nTGltaXQnLCAwKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxzZWxlY3RcXG4gIGNsYXNzPVwiZm9ybS1jb250cm9sIGJhY2tncm91bmRsYXllci1zZWxlY3RvclwiXFxuICBuZy1vcHRpb25zPVwibGF5ZXIubmFtZSBmb3IgbGF5ZXIgaW4gOjokY3RybC5iZ0xheWVyc1wiXFxuICBuZy1tb2RlbD1cIiRjdHJsLmJnTGF5ZXJcIlxcbiAgbmctY2hhbmdlPVwiJGN0cmwuY2hhbmdlKClcIlxcbj48L3NlbGVjdD5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=