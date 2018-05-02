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
/******/ 		"simple3d": 0
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
/******/ 	deferredModules.push([43,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/simple3d.css":
/*!*******************************!*\
  !*** ./examples/simple3d.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/simple3d.js":
/*!******************************!*\
  !*** ./examples/simple3d.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple3d.css */ "./examples/simple3d.css");
/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_simple3d_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/olcs/olcsModule.js */ "./src/olcs/olcsModule.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/olcs/Manager.js */ "./src/olcs/Manager.js");
// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

/**
 * @constructor
 * @ngInject
 * @param {angular.IScope} $rootScope Root scope.
 * @param {import("ngeo/olcs/Service.js").OlcsService} ngeoOlcsService The service.
 */
function MainController($rootScope, ngeoOlcsService) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [0, 0],
      zoom: 4,
    }),
  });

  const cesiumUrl = document.location.search.includes('mode=dev')
    ? 'https://cesium.com/downloads/cesiumjs/releases/1.62/Build/CesiumUnminified/Cesium.js'
    : 'https://cesium.com/downloads/cesiumjs/releases/1.62/Build/Cesium/Cesium.js';

  this.ol3dm = new ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__["default"](cesiumUrl, $rootScope, {
    map: this.map,
  });

  // Optionally, the manager can be registered into the olcs service
  ngeoOlcsService.initialize(this.ol3dm);
}

myModule.controller('MainController', MainController);
myModule.constant('ngeoUsedKeyRegexp', []);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./node_modules/ol/format/MVT.js":
/*!***************************************************************************!*\
  !*** delegated ./node_modules/ol/format/MVT.js from dll-reference vendor ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(504);

/***/ }),

/***/ "./node_modules/ol/layer/VectorTile.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/ol/layer/VectorTile.js from dll-reference vendor ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(274);

/***/ }),

/***/ "./node_modules/ol/render.js":
/*!***********************************************************************!*\
  !*** delegated ./node_modules/ol/render.js from dll-reference vendor ***!
  \***********************************************************************/
/*! exports provided: toContext, getVectorContext, getRenderPixel */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1002);

/***/ }),

/***/ "./node_modules/ol/source/Cluster.js":
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/ol/source/Cluster.js from dll-reference vendor ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(813);

/***/ }),

/***/ "./node_modules/ol/source/ImageStatic.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/ol/source/ImageStatic.js from dll-reference vendor ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(818);

/***/ }),

/***/ "./node_modules/ol/source/TileImage.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/ol/source/TileImage.js from dll-reference vendor ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(98);

/***/ }),

/***/ "./node_modules/ol/source/VectorTile.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/source/VectorTile.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: default, defaultLoadFunction */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(275);

/***/ }),

/***/ "./node_modules/ol/structs/LRUCache.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/ol/structs/LRUCache.js from dll-reference vendor ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1009);

/***/ }),

/***/ "./src/olcs/Manager.js":
/*!*****************************!*\
  !*** ./src/olcs/Manager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! olcs/contrib/Manager.js */ "./node_modules/ol-cesium/src/olcs/contrib/Manager.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Manager = function (_olcsContribManager) {
  _inheritsLoose(Manager, _olcsContribManager);

  function Manager(url, $rootScope, options) {
    var _this;

    _this = _olcsContribManager.call(this, url, options) || this;
    _this.rootScope_ = $rootScope;
    return _this;
  }

  var _proto = Manager.prototype;

  _proto.toggle3d = function toggle3d() {
    var _this2 = this;

    var promise = _olcsContribManager.prototype.toggle3d.call(this);

    return promise.then(function () {
      _this2.rootScope_.$apply();
    });
  };

  return Manager;
}(olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Manager);

/***/ }),

/***/ "./src/olcs/Service.js":
/*!*****************************!*\
  !*** ./src/olcs/Service.js ***!
  \*****************************/
/*! exports provided: OlcsService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OlcsService", function() { return OlcsService; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/statemanager/Location.js */ "./src/statemanager/Location.js");
/* harmony import */ var ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/olcs/constants.js */ "./src/olcs/constants.js");
/* harmony import */ var ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/statemanager/Service.js */ "./src/statemanager/Service.js");
/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/math.js */ "./node_modules/ol/math.js");






var OlcsService = function () {
  OlcsService.$inject = ["ngeoDebounce", "ngeoLocation", "ngeoStateManager"];

  function OlcsService(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    this.manager_ = null;
    this.ngeoDebounce_ = ngeoDebounce;
    this.ngeoLocation_ = ngeoLocation;
    this.ngeoStateManager_ = ngeoStateManager;
  }

  var _proto = OlcsService.prototype;

  _proto.initialize = function initialize(manager) {
    var _this = this;

    this.manager_ = manager;
    this.manager_.on('load', function () {
      _this.cameraToState_();
    });

    if (this.ngeoStateManager_.getInitialBooleanValue('3d_enabled')) {
      this.initialStateToCamera_();
    }
  };

  _proto.getManager = function getManager() {
    return this.manager_;
  };

  _proto.initialStateToCamera_ = function initialStateToCamera_() {
    if (!this.manager_) {
      throw new Error('Missing manager');
    }

    var stateManager = this.ngeoStateManager_;
    var lon = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LON);
    var lat = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LAT);
    var elevation = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ELEVATION);
    var heading = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].HEADING) || 0;
    var pitch = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PITCH) || 0;

    if (!lon) {
      throw new Error('Missing lon');
    }

    if (!lat) {
      throw new Error('Missing lat');
    }

    if (!elevation) {
      throw new Error('Missing elevation');
    }

    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);
  };

  _proto.cameraToState_ = function cameraToState_() {
    var _this2 = this;

    if (!this.manager_) {
      throw new Error('Missing manager');
    }

    var manager = this.manager_;
    var scene = manager.getOl3d().getCesiumScene();
    var camera = scene.camera;
    camera.moveEnd.addEventListener(this.ngeoDebounce_(function () {
      var _this2$ngeoStateManag;

      var position = camera.positionCartographic;

      _this2.ngeoStateManager_.updateState((_this2$ngeoStateManag = {}, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ENABLED] = true, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LON] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__["toDegrees"])(position.longitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LAT] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__["toDegrees"])(position.latitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ELEVATION] = position.height.toFixed(0), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].HEADING] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__["toDegrees"])(camera.heading).toFixed(3), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PITCH] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__["toDegrees"])(camera.pitch).toFixed(3), _this2$ngeoStateManag));
    }, 1000, true));
    this.manager_.on('toggle', function (event) {
      if (!event.target.is3dEnabled()) {
        _this2.remove3dState_();
      }
    });
  };

  _proto.remove3dState_ = function remove3dState_() {
    var _this3 = this;

    this.ngeoLocation_.getParamKeysWithPrefix(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PREFIX).forEach(function (key) {
      _this3.ngeoStateManager_.deleteParam(key);
    });
  };

  return OlcsService;
}();
var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(name, [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__["default"].name]).service('ngeoOlcsService', OlcsService);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/olcs/constants.js":
/*!*******************************!*\
  !*** ./src/olcs/constants.js ***!
  \*******************************/
/*! exports provided: Permalink3dParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Permalink3dParam", function() { return Permalink3dParam; });
var Permalink3dParam = {
  ENABLED: '3d_enabled',
  LON: '3d_lon',
  LAT: '3d_lat',
  ELEVATION: '3d_elevation',
  HEADING: '3d_heading',
  PITCH: '3d_pitch',
  PREFIX: '3d_'
};

/***/ }),

/***/ "./src/olcs/controls3d.html":
/*!**********************************!*\
  !*** ./src/olcs/controls3d.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-tools">\n  <div class="ngeo-angle"><div class="ngeo-angle3d"></div></div>\n  <button class="ngeo-left ngeo-tilt-left" ng-click="$ctrl.tilt(5)"></button>\n  <button class="ngeo-right ngeo-tilt-right" ng-click="$ctrl.tilt(-5)"></button>\n</div>\n<div class="ngeo-zoom">\n  <button class="ol-zoom-in" ng-click="$ctrl.zoom(1)"></button>\n  <button class="ol-zoom-out" ng-click="$ctrl.zoom(-1)"></button>\n</div>\n<div class="ngeo-tools">\n  <div class="ngeo-rotation"><div class="ngeo-rotation3d"></div></div>\n  <button class="ngeo-left" ng-click="$ctrl.rotate(-15)"></button>\n  <button class="ngeo-right" ng-click="$ctrl.rotate(15)"></button>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/olcs/controls3d.js":
/*!********************************!*\
  !*** ./src/olcs/controls3d.js ***!
  \********************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/easing.js */ "./node_modules/ol/easing.js");
/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/math.js */ "./node_modules/ol/math.js");
/* harmony import */ var olcs_core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! olcs/core.js */ "./node_modules/ol-cesium/src/olcs/core.js");
ngeoOlcsControls3dTemplateUrlInjectable.$inject = ["$attrs", "ngeoOlcsControls3dTemplateUrl"];




var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsControls3d', []);

function shouldUpdate(older, newer) {
  return Number.isFinite(newer) && (!Number.isFinite(older) || Math.abs(newer - older) > 0.05);
}

var Controller = function () {
  Controller.$inject = ["$element", "ngeoOlcsService"];

  function Controller($element, ngeoOlcsService) {
    this.element_ = $element;
    this.ol3dm = null;
    this.minTilt = -1;
    this.maxTilt = -1;
    this.tiltRightEl_ = null;
    this.tiltLeftEl_ = null;
    this.rotation3dEl_ = null;
    this.angle3dEl_ = null;
    this.previousRotation_ = -1;
    this.previousViewMatrix_ = null;
    this.animationFrameRequestId_ = -1;
    this.olcsService_ = ngeoOlcsService;
  }

  var _proto = Controller.prototype;

  _proto.updateWidget_ = function updateWidget_() {
    var _this = this;

    if (!this.ol3dm) {
      throw new Error('Missing ol3dm');
    }

    if (!this.rotation3dEl_) {
      throw new Error('Missing rotation3dEl_');
    }

    if (!this.angle3dEl_) {
      throw new Error('Missing angle3dEl_');
    }

    if (!this.tiltRightEl_) {
      throw new Error('Missing tiltRightEl_');
    }

    if (!this.tiltLeftEl_) {
      throw new Error('Missing tiltLeftEl_');
    }

    var newRotation = this.ol3dm.getOl3d().getOlView().getRotation();

    if (shouldUpdate(this.previousRotation_, newRotation)) {
      this.rotateElement_(this.rotation3dEl_, newRotation);
      this.previousRotation_ = newRotation;
    }

    var newViewMatrix = this.ol3dm.getCesiumViewMatrix();

    if (!Cesium.Matrix4.equalsEpsilon(this.previousViewMatrix_, newViewMatrix, 1e-5)) {
      var newTilt = this.ol3dm.getTiltOnGlobe();

      if (newTilt != undefined && Number.isFinite(newTilt || 0)) {
        this.rotateElement_(this.angle3dEl_, newTilt);
        this.previousViewMatrix_ = Cesium.Matrix4.clone(newViewMatrix);
        var buffer = 0.01;

        if (newTilt - this.minTilt < buffer) {
          this.tiltRightEl_.addClass('ngeo-right-inactive');
        } else if (this.tiltRightEl_.hasClass('ngeo-right-inactive')) {
          this.tiltRightEl_.removeClass('ngeo-right-inactive');
        }

        if (this.maxTilt - newTilt < buffer) {
          this.tiltLeftEl_.addClass('ngeo-left-inactive');
        } else if (this.tiltLeftEl_.hasClass('ngeo-left-inactive')) {
          this.tiltLeftEl_.removeClass('ngeo-left-inactive');
        }
      }
    }

    this.animationFrameRequestId_ = requestAnimationFrame(function () {
      return _this.updateWidget_();
    });
  };

  _proto.$onDestroy = function $onDestroy() {
    if (this.animationFrameRequestId_) {
      cancelAnimationFrame(this.animationFrameRequestId_);
    }
  };

  _proto.$onInit = function $onInit() {
    if (this.minTilt === undefined) {
      this.minTilt = 0;
    }

    if (this.maxTilt === undefined) {
      this.maxTilt = 7 * Math.PI / 16;
    }

    if (!this.ol3dm) {
      this.ol3dm = this.olcsService_.getManager() || null;
    }

    this.tiltRightEl_ = this.element_.find('.ngeo-tilt-right');
    this.tiltLeftEl_ = this.element_.find('.ngeo-tilt-left');
    this.rotation3dEl_ = this.element_.find('.ngeo-rotation3d');
    this.angle3dEl_ = this.element_.find('.ngeo-angle3d');
    this.updateWidget_();
  };

  _proto.rotateElement_ = function rotateElement_(element, angle) {
    var r = "rotate(" + angle + "rad)";
    element.css({
      '-moz-transform': r,
      '-webkit-transform': r,
      '-o-transform': r,
      '-ms-transform': r,
      'transform': r
    });
  };

  _proto.rotate = function rotate(angle) {
    if (!this.ol3dm) {
      throw new Error('Missing ol3dm');
    }

    this.ol3dm.setHeading(Object(ol_math_js__WEBPACK_IMPORTED_MODULE_2__["toRadians"])(angle));
  };

  _proto.tilt = function tilt(angle) {
    if (!this.ol3dm) {
      throw new Error('Missing ol3dm');
    }

    angle = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_2__["toRadians"])(angle);
    var tiltOnGlobe = Number(this.ol3dm.getTiltOnGlobe());

    if (tiltOnGlobe + angle < this.minTilt) {
      angle = this.minTilt - tiltOnGlobe;
    } else if (tiltOnGlobe + angle > this.maxTilt) {
      angle = this.maxTilt - tiltOnGlobe;
    }

    var scene = this.ol3dm.getCesiumScene();
    olcs_core_js__WEBPACK_IMPORTED_MODULE_3__["default"].rotateAroundBottomCenter(scene, angle);
  };

  _proto.zoom = function zoom(delta) {
    if (!this.ol3dm) {
      throw new Error('Missing ol3dm');
    }

    var view = this.ol3dm.getOlView();
    var cur = view.getResolution();
    var newResolution = view.constrainResolution(cur, delta);

    if (view.getAnimating()) {
      view.cancelAnimations();
    }

    view.animate({
      resolution: newResolution,
      duration: 250,
      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_1__["easeOut"]
    });
  };

  return Controller;
}();

function ngeoOlcsControls3dTemplateUrlInjectable($attrs, ngeoOlcsControls3dTemplateUrl) {
  if (ngeoOlcsControls3dTemplateUrl) {
    return ngeoOlcsControls3dTemplateUrl;
  }

  var templateUrl = $attrs['ngeoOlcsControls3dTemplateUrl'];
  return templateUrl ? templateUrl : 'ngeo/olsc/controls3d';
}

myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/olsc/controls3d', __webpack_require__(/*! ./controls3d.html */ "./src/olcs/controls3d.html"));
}]);
var olscControls3dComponent = {
  bindings: {
    'minTilt': '<?',
    'maxTilt': '<?',
    'ol3dm': '<?'
  },
  controller: Controller,
  templateUrl: ngeoOlcsControls3dTemplateUrlInjectable
};
myModule.component('ngeoOlcsControls3d', olscControls3dComponent);
myModule.value('ngeoOlcsControls3dTemplateUrl', '');
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/olcs/olcsModule.js":
/*!********************************!*\
  !*** ./src/olcs/olcsModule.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/olcs/Service.js */ "./src/olcs/Service.js");
/* harmony import */ var ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/olcs/controls3d.js */ "./src/olcs/controls3d.js");



var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsModule', [ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 43:
/*!*****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/simple3d.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/simple3d.js */"./examples/simple3d.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlM2QuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvc2ltcGxlM2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29sY3MvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2xjcy9TZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9vbGNzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2xjcy9jb250cm9sczNkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL29sY3MvY29udHJvbHMzZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2xjcy9vbGNzTW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJzaW1wbGUzZFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbNDMsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMjEgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL3NpbXBsZTNkLmNzcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00uanMnO1xuaW1wb3J0IG5nZW9PbGNzT2xjc01vZHVsZSBmcm9tICduZ2VvL29sY3Mvb2xjc01vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9PbGNzTWFuYWdlciBmcm9tICduZ2VvL29sY3MvTWFuYWdlci5qcyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb09sY3NPbGNzTW9kdWxlLm5hbWVdKTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBuZ0luamVjdFxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHJvb3RTY29wZSBSb290IHNjb3BlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL29sY3MvU2VydmljZS5qc1wiKS5PbGNzU2VydmljZX0gbmdlb09sY3NTZXJ2aWNlIFRoZSBzZXJ2aWNlLlxuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkcm9vdFNjb3BlLCBuZ2VvT2xjc1NlcnZpY2UpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJvbC9NYXAuanNcIikuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMCwgMF0sXG4gICAgICB6b29tOiA0LFxuICAgIH0pLFxuICB9KTtcblxuICBjb25zdCBjZXNpdW1VcmwgPSBkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ21vZGU9ZGV2JylcbiAgICA/ICdodHRwczovL2Nlc2l1bS5jb20vZG93bmxvYWRzL2Nlc2l1bWpzL3JlbGVhc2VzLzEuNjIvQnVpbGQvQ2VzaXVtVW5taW5pZmllZC9DZXNpdW0uanMnXG4gICAgOiAnaHR0cHM6Ly9jZXNpdW0uY29tL2Rvd25sb2Fkcy9jZXNpdW1qcy9yZWxlYXNlcy8xLjYyL0J1aWxkL0Nlc2l1bS9DZXNpdW0uanMnO1xuXG4gIHRoaXMub2wzZG0gPSBuZXcgbmdlb09sY3NNYW5hZ2VyKGNlc2l1bVVybCwgJHJvb3RTY29wZSwge1xuICAgIG1hcDogdGhpcy5tYXAsXG4gIH0pO1xuXG4gIC8vIE9wdGlvbmFsbHksIHRoZSBtYW5hZ2VyIGNhbiBiZSByZWdpc3RlcmVkIGludG8gdGhlIG9sY3Mgc2VydmljZVxuICBuZ2VvT2xjc1NlcnZpY2UuaW5pdGlhbGl6ZSh0aGlzLm9sM2RtKTtcbn1cblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1VzZWRLZXlSZWdleHAnLCBbXSk7XG5cbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCBvbGNzQ29udHJpYk1hbmFnZXIgZnJvbSAnb2xjcy9jb250cmliL01hbmFnZXIuanMnO1xuXG52YXIgTWFuYWdlciA9IGZ1bmN0aW9uIChfb2xjc0NvbnRyaWJNYW5hZ2VyKSB7XG4gIF9pbmhlcml0c0xvb3NlKE1hbmFnZXIsIF9vbGNzQ29udHJpYk1hbmFnZXIpO1xuXG4gIGZ1bmN0aW9uIE1hbmFnZXIodXJsLCAkcm9vdFNjb3BlLCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb2xjc0NvbnRyaWJNYW5hZ2VyLmNhbGwodGhpcywgdXJsLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLnJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNYW5hZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8udG9nZ2xlM2QgPSBmdW5jdGlvbiB0b2dnbGUzZCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gX29sY3NDb250cmliTWFuYWdlci5wcm90b3R5cGUudG9nZ2xlM2QuY2FsbCh0aGlzKTtcblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMyLnJvb3RTY29wZV8uJGFwcGx5KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE1hbmFnZXI7XG59KG9sY3NDb250cmliTWFuYWdlcik7XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UuanMnO1xuaW1wb3J0IG5nZW9TdGF0ZW1hbmFnZXJMb2NhdGlvbiBmcm9tICduZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbi5qcyc7XG5pbXBvcnQgeyBQZXJtYWxpbmszZFBhcmFtIH0gZnJvbSAnbmdlby9vbGNzL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgbmdlb1N0YXRlbWFuYWdlclNlcnZpY2UgZnJvbSAnbmdlby9zdGF0ZW1hbmFnZXIvU2VydmljZS5qcyc7XG5pbXBvcnQgeyB0b0RlZ3JlZXMgfSBmcm9tICdvbC9tYXRoLmpzJztcbmV4cG9ydCB2YXIgT2xjc1NlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIE9sY3NTZXJ2aWNlLiRpbmplY3QgPSBbXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvTG9jYXRpb25cIiwgXCJuZ2VvU3RhdGVNYW5hZ2VyXCJdO1xuXG4gIGZ1bmN0aW9uIE9sY3NTZXJ2aWNlKG5nZW9EZWJvdW5jZSwgbmdlb0xvY2F0aW9uLCBuZ2VvU3RhdGVNYW5hZ2VyKSB7XG4gICAgdGhpcy5tYW5hZ2VyXyA9IG51bGw7XG4gICAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuICAgIHRoaXMubmdlb0xvY2F0aW9uXyA9IG5nZW9Mb2NhdGlvbjtcbiAgICB0aGlzLm5nZW9TdGF0ZU1hbmFnZXJfID0gbmdlb1N0YXRlTWFuYWdlcjtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBPbGNzU2VydmljZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXRpYWxpemUgPSBmdW5jdGlvbiBpbml0aWFsaXplKG1hbmFnZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5tYW5hZ2VyXyA9IG1hbmFnZXI7XG4gICAgdGhpcy5tYW5hZ2VyXy5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNhbWVyYVRvU3RhdGVfKCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5uZ2VvU3RhdGVNYW5hZ2VyXy5nZXRJbml0aWFsQm9vbGVhblZhbHVlKCczZF9lbmFibGVkJykpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFN0YXRlVG9DYW1lcmFfKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5nZXRNYW5hZ2VyID0gZnVuY3Rpb24gZ2V0TWFuYWdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyXztcbiAgfTtcblxuICBfcHJvdG8uaW5pdGlhbFN0YXRlVG9DYW1lcmFfID0gZnVuY3Rpb24gaW5pdGlhbFN0YXRlVG9DYW1lcmFfKCkge1xuICAgIGlmICghdGhpcy5tYW5hZ2VyXykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmFnZXInKTtcbiAgICB9XG5cbiAgICB2YXIgc3RhdGVNYW5hZ2VyID0gdGhpcy5uZ2VvU3RhdGVNYW5hZ2VyXztcbiAgICB2YXIgbG9uID0gc3RhdGVNYW5hZ2VyLmdldEluaXRpYWxOdW1iZXJWYWx1ZShQZXJtYWxpbmszZFBhcmFtLkxPTik7XG4gICAgdmFyIGxhdCA9IHN0YXRlTWFuYWdlci5nZXRJbml0aWFsTnVtYmVyVmFsdWUoUGVybWFsaW5rM2RQYXJhbS5MQVQpO1xuICAgIHZhciBlbGV2YXRpb24gPSBzdGF0ZU1hbmFnZXIuZ2V0SW5pdGlhbE51bWJlclZhbHVlKFBlcm1hbGluazNkUGFyYW0uRUxFVkFUSU9OKTtcbiAgICB2YXIgaGVhZGluZyA9IHN0YXRlTWFuYWdlci5nZXRJbml0aWFsTnVtYmVyVmFsdWUoUGVybWFsaW5rM2RQYXJhbS5IRUFESU5HKSB8fCAwO1xuICAgIHZhciBwaXRjaCA9IHN0YXRlTWFuYWdlci5nZXRJbml0aWFsTnVtYmVyVmFsdWUoUGVybWFsaW5rM2RQYXJhbS5QSVRDSCkgfHwgMDtcblxuICAgIGlmICghbG9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbG9uJyk7XG4gICAgfVxuXG4gICAgaWYgKCFsYXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBsYXQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZXZhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVsZXZhdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1hbmFnZXJfLnNldDNkV2l0aFZpZXcobG9uLCBsYXQsIGVsZXZhdGlvbiwgaGVhZGluZywgcGl0Y2gpO1xuICB9O1xuXG4gIF9wcm90by5jYW1lcmFUb1N0YXRlXyA9IGZ1bmN0aW9uIGNhbWVyYVRvU3RhdGVfKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLm1hbmFnZXJfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuYWdlcicpO1xuICAgIH1cblxuICAgIHZhciBtYW5hZ2VyID0gdGhpcy5tYW5hZ2VyXztcbiAgICB2YXIgc2NlbmUgPSBtYW5hZ2VyLmdldE9sM2QoKS5nZXRDZXNpdW1TY2VuZSgpO1xuICAgIHZhciBjYW1lcmEgPSBzY2VuZS5jYW1lcmE7XG4gICAgY2FtZXJhLm1vdmVFbmQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLm5nZW9EZWJvdW5jZV8oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzMiRuZ2VvU3RhdGVNYW5hZztcblxuICAgICAgdmFyIHBvc2l0aW9uID0gY2FtZXJhLnBvc2l0aW9uQ2FydG9ncmFwaGljO1xuXG4gICAgICBfdGhpczIubmdlb1N0YXRlTWFuYWdlcl8udXBkYXRlU3RhdGUoKF90aGlzMiRuZ2VvU3RhdGVNYW5hZyA9IHt9LCBfdGhpczIkbmdlb1N0YXRlTWFuYWdbUGVybWFsaW5rM2RQYXJhbS5FTkFCTEVEXSA9IHRydWUsIF90aGlzMiRuZ2VvU3RhdGVNYW5hZ1tQZXJtYWxpbmszZFBhcmFtLkxPTl0gPSB0b0RlZ3JlZXMocG9zaXRpb24ubG9uZ2l0dWRlKS50b0ZpeGVkKDUpLCBfdGhpczIkbmdlb1N0YXRlTWFuYWdbUGVybWFsaW5rM2RQYXJhbS5MQVRdID0gdG9EZWdyZWVzKHBvc2l0aW9uLmxhdGl0dWRlKS50b0ZpeGVkKDUpLCBfdGhpczIkbmdlb1N0YXRlTWFuYWdbUGVybWFsaW5rM2RQYXJhbS5FTEVWQVRJT05dID0gcG9zaXRpb24uaGVpZ2h0LnRvRml4ZWQoMCksIF90aGlzMiRuZ2VvU3RhdGVNYW5hZ1tQZXJtYWxpbmszZFBhcmFtLkhFQURJTkddID0gdG9EZWdyZWVzKGNhbWVyYS5oZWFkaW5nKS50b0ZpeGVkKDMpLCBfdGhpczIkbmdlb1N0YXRlTWFuYWdbUGVybWFsaW5rM2RQYXJhbS5QSVRDSF0gPSB0b0RlZ3JlZXMoY2FtZXJhLnBpdGNoKS50b0ZpeGVkKDMpLCBfdGhpczIkbmdlb1N0YXRlTWFuYWcpKTtcbiAgICB9LCAxMDAwLCB0cnVlKSk7XG4gICAgdGhpcy5tYW5hZ2VyXy5vbigndG9nZ2xlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5pczNkRW5hYmxlZCgpKSB7XG4gICAgICAgIF90aGlzMi5yZW1vdmUzZFN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmUzZFN0YXRlXyA9IGZ1bmN0aW9uIHJlbW92ZTNkU3RhdGVfKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtS2V5c1dpdGhQcmVmaXgoUGVybWFsaW5rM2RQYXJhbS5QUkVGSVgpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXMzLm5nZW9TdGF0ZU1hbmFnZXJfLmRlbGV0ZVBhcmFtKGtleSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE9sY3NTZXJ2aWNlO1xufSgpO1xudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW25nZW9NaXNjRGVib3VuY2UubmFtZSwgbmdlb1N0YXRlbWFuYWdlckxvY2F0aW9uLm5hbWUsIG5nZW9TdGF0ZW1hbmFnZXJTZXJ2aWNlLm5hbWVdKS5zZXJ2aWNlKCduZ2VvT2xjc1NlcnZpY2UnLCBPbGNzU2VydmljZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJleHBvcnQgdmFyIFBlcm1hbGluazNkUGFyYW0gPSB7XG4gIEVOQUJMRUQ6ICczZF9lbmFibGVkJyxcbiAgTE9OOiAnM2RfbG9uJyxcbiAgTEFUOiAnM2RfbGF0JyxcbiAgRUxFVkFUSU9OOiAnM2RfZWxldmF0aW9uJyxcbiAgSEVBRElORzogJzNkX2hlYWRpbmcnLFxuICBQSVRDSDogJzNkX3BpdGNoJyxcbiAgUFJFRklYOiAnM2RfJ1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibmdlby10b29sc1wiPlxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tYW5nbGVcIj48ZGl2IGNsYXNzPVwibmdlby1hbmdsZTNkXCI+PC9kaXY+PC9kaXY+XFxuICA8YnV0dG9uIGNsYXNzPVwibmdlby1sZWZ0IG5nZW8tdGlsdC1sZWZ0XCIgbmctY2xpY2s9XCIkY3RybC50aWx0KDUpXCI+PC9idXR0b24+XFxuICA8YnV0dG9uIGNsYXNzPVwibmdlby1yaWdodCBuZ2VvLXRpbHQtcmlnaHRcIiBuZy1jbGljaz1cIiRjdHJsLnRpbHQoLTUpXCI+PC9idXR0b24+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cIm5nZW8tem9vbVwiPlxcbiAgPGJ1dHRvbiBjbGFzcz1cIm9sLXpvb20taW5cIiBuZy1jbGljaz1cIiRjdHJsLnpvb20oMSlcIj48L2J1dHRvbj5cXG4gIDxidXR0b24gY2xhc3M9XCJvbC16b29tLW91dFwiIG5nLWNsaWNrPVwiJGN0cmwuem9vbSgtMSlcIj48L2J1dHRvbj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwibmdlby10b29sc1wiPlxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm90YXRpb25cIj48ZGl2IGNsYXNzPVwibmdlby1yb3RhdGlvbjNkXCI+PC9kaXY+PC9kaXY+XFxuICA8YnV0dG9uIGNsYXNzPVwibmdlby1sZWZ0XCIgbmctY2xpY2s9XCIkY3RybC5yb3RhdGUoLTE1KVwiPjwvYnV0dG9uPlxcbiAgPGJ1dHRvbiBjbGFzcz1cIm5nZW8tcmlnaHRcIiBuZy1jbGljaz1cIiRjdHJsLnJvdGF0ZSgxNSlcIj48L2J1dHRvbj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59Iiwibmdlb09sY3NDb250cm9sczNkVGVtcGxhdGVVcmxJbmplY3RhYmxlLiRpbmplY3QgPSBbXCIkYXR0cnNcIiwgXCJuZ2VvT2xjc0NvbnRyb2xzM2RUZW1wbGF0ZVVybFwiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0ICogYXMgb2xFYXNpbmcgZnJvbSAnb2wvZWFzaW5nLmpzJztcbmltcG9ydCB7IHRvUmFkaWFucyB9IGZyb20gJ29sL21hdGguanMnO1xuaW1wb3J0IG9sY3NDb3JlIGZyb20gJ29sY3MvY29yZS5qcyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09sY3NDb250cm9sczNkJywgW10pO1xuXG5mdW5jdGlvbiBzaG91bGRVcGRhdGUob2xkZXIsIG5ld2VyKSB7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUobmV3ZXIpICYmICghTnVtYmVyLmlzRmluaXRlKG9sZGVyKSB8fCBNYXRoLmFicyhuZXdlciAtIG9sZGVyKSA+IDAuMDUpO1xufVxuXG5leHBvcnQgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwibmdlb09sY3NTZXJ2aWNlXCJdO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJGVsZW1lbnQsIG5nZW9PbGNzU2VydmljZSkge1xuICAgIHRoaXMuZWxlbWVudF8gPSAkZWxlbWVudDtcbiAgICB0aGlzLm9sM2RtID0gbnVsbDtcbiAgICB0aGlzLm1pblRpbHQgPSAtMTtcbiAgICB0aGlzLm1heFRpbHQgPSAtMTtcbiAgICB0aGlzLnRpbHRSaWdodEVsXyA9IG51bGw7XG4gICAgdGhpcy50aWx0TGVmdEVsXyA9IG51bGw7XG4gICAgdGhpcy5yb3RhdGlvbjNkRWxfID0gbnVsbDtcbiAgICB0aGlzLmFuZ2xlM2RFbF8gPSBudWxsO1xuICAgIHRoaXMucHJldmlvdXNSb3RhdGlvbl8gPSAtMTtcbiAgICB0aGlzLnByZXZpb3VzVmlld01hdHJpeF8gPSBudWxsO1xuICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SWRfID0gLTE7XG4gICAgdGhpcy5vbGNzU2VydmljZV8gPSBuZ2VvT2xjc1NlcnZpY2U7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnVwZGF0ZVdpZGdldF8gPSBmdW5jdGlvbiB1cGRhdGVXaWRnZXRfKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMub2wzZG0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBvbDNkbScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5yb3RhdGlvbjNkRWxfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgcm90YXRpb24zZEVsXycpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5hbmdsZTNkRWxfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgYW5nbGUzZEVsXycpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy50aWx0UmlnaHRFbF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyB0aWx0UmlnaHRFbF8nKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudGlsdExlZnRFbF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyB0aWx0TGVmdEVsXycpO1xuICAgIH1cblxuICAgIHZhciBuZXdSb3RhdGlvbiA9IHRoaXMub2wzZG0uZ2V0T2wzZCgpLmdldE9sVmlldygpLmdldFJvdGF0aW9uKCk7XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKHRoaXMucHJldmlvdXNSb3RhdGlvbl8sIG5ld1JvdGF0aW9uKSkge1xuICAgICAgdGhpcy5yb3RhdGVFbGVtZW50Xyh0aGlzLnJvdGF0aW9uM2RFbF8sIG5ld1JvdGF0aW9uKTtcbiAgICAgIHRoaXMucHJldmlvdXNSb3RhdGlvbl8gPSBuZXdSb3RhdGlvbjtcbiAgICB9XG5cbiAgICB2YXIgbmV3Vmlld01hdHJpeCA9IHRoaXMub2wzZG0uZ2V0Q2VzaXVtVmlld01hdHJpeCgpO1xuXG4gICAgaWYgKCFDZXNpdW0uTWF0cml4NC5lcXVhbHNFcHNpbG9uKHRoaXMucHJldmlvdXNWaWV3TWF0cml4XywgbmV3Vmlld01hdHJpeCwgMWUtNSkpIHtcbiAgICAgIHZhciBuZXdUaWx0ID0gdGhpcy5vbDNkbS5nZXRUaWx0T25HbG9iZSgpO1xuXG4gICAgICBpZiAobmV3VGlsdCAhPSB1bmRlZmluZWQgJiYgTnVtYmVyLmlzRmluaXRlKG5ld1RpbHQgfHwgMCkpIHtcbiAgICAgICAgdGhpcy5yb3RhdGVFbGVtZW50Xyh0aGlzLmFuZ2xlM2RFbF8sIG5ld1RpbHQpO1xuICAgICAgICB0aGlzLnByZXZpb3VzVmlld01hdHJpeF8gPSBDZXNpdW0uTWF0cml4NC5jbG9uZShuZXdWaWV3TWF0cml4KTtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IDAuMDE7XG5cbiAgICAgICAgaWYgKG5ld1RpbHQgLSB0aGlzLm1pblRpbHQgPCBidWZmZXIpIHtcbiAgICAgICAgICB0aGlzLnRpbHRSaWdodEVsXy5hZGRDbGFzcygnbmdlby1yaWdodC1pbmFjdGl2ZScpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGlsdFJpZ2h0RWxfLmhhc0NsYXNzKCduZ2VvLXJpZ2h0LWluYWN0aXZlJykpIHtcbiAgICAgICAgICB0aGlzLnRpbHRSaWdodEVsXy5yZW1vdmVDbGFzcygnbmdlby1yaWdodC1pbmFjdGl2ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4VGlsdCAtIG5ld1RpbHQgPCBidWZmZXIpIHtcbiAgICAgICAgICB0aGlzLnRpbHRMZWZ0RWxfLmFkZENsYXNzKCduZ2VvLWxlZnQtaW5hY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbHRMZWZ0RWxfLmhhc0NsYXNzKCduZ2VvLWxlZnQtaW5hY3RpdmUnKSkge1xuICAgICAgICAgIHRoaXMudGlsdExlZnRFbF8ucmVtb3ZlQ2xhc3MoJ25nZW8tbGVmdC1pbmFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpb25GcmFtZVJlcXVlc3RJZF8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZVdpZGdldF8oKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SWRfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElkXyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5taW5UaWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubWluVGlsdCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF4VGlsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm1heFRpbHQgPSA3ICogTWF0aC5QSSAvIDE2O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbDNkbSkge1xuICAgICAgdGhpcy5vbDNkbSA9IHRoaXMub2xjc1NlcnZpY2VfLmdldE1hbmFnZXIoKSB8fCBudWxsO1xuICAgIH1cblxuICAgIHRoaXMudGlsdFJpZ2h0RWxfID0gdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby10aWx0LXJpZ2h0Jyk7XG4gICAgdGhpcy50aWx0TGVmdEVsXyA9IHRoaXMuZWxlbWVudF8uZmluZCgnLm5nZW8tdGlsdC1sZWZ0Jyk7XG4gICAgdGhpcy5yb3RhdGlvbjNkRWxfID0gdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1yb3RhdGlvbjNkJyk7XG4gICAgdGhpcy5hbmdsZTNkRWxfID0gdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1hbmdsZTNkJyk7XG4gICAgdGhpcy51cGRhdGVXaWRnZXRfKCk7XG4gIH07XG5cbiAgX3Byb3RvLnJvdGF0ZUVsZW1lbnRfID0gZnVuY3Rpb24gcm90YXRlRWxlbWVudF8oZWxlbWVudCwgYW5nbGUpIHtcbiAgICB2YXIgciA9IFwicm90YXRlKFwiICsgYW5nbGUgKyBcInJhZClcIjtcbiAgICBlbGVtZW50LmNzcyh7XG4gICAgICAnLW1vei10cmFuc2Zvcm0nOiByLFxuICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogcixcbiAgICAgICctby10cmFuc2Zvcm0nOiByLFxuICAgICAgJy1tcy10cmFuc2Zvcm0nOiByLFxuICAgICAgJ3RyYW5zZm9ybSc6IHJcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8ucm90YXRlID0gZnVuY3Rpb24gcm90YXRlKGFuZ2xlKSB7XG4gICAgaWYgKCF0aGlzLm9sM2RtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgb2wzZG0nKTtcbiAgICB9XG5cbiAgICB0aGlzLm9sM2RtLnNldEhlYWRpbmcodG9SYWRpYW5zKGFuZ2xlKSk7XG4gIH07XG5cbiAgX3Byb3RvLnRpbHQgPSBmdW5jdGlvbiB0aWx0KGFuZ2xlKSB7XG4gICAgaWYgKCF0aGlzLm9sM2RtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgb2wzZG0nKTtcbiAgICB9XG5cbiAgICBhbmdsZSA9IHRvUmFkaWFucyhhbmdsZSk7XG4gICAgdmFyIHRpbHRPbkdsb2JlID0gTnVtYmVyKHRoaXMub2wzZG0uZ2V0VGlsdE9uR2xvYmUoKSk7XG5cbiAgICBpZiAodGlsdE9uR2xvYmUgKyBhbmdsZSA8IHRoaXMubWluVGlsdCkge1xuICAgICAgYW5nbGUgPSB0aGlzLm1pblRpbHQgLSB0aWx0T25HbG9iZTtcbiAgICB9IGVsc2UgaWYgKHRpbHRPbkdsb2JlICsgYW5nbGUgPiB0aGlzLm1heFRpbHQpIHtcbiAgICAgIGFuZ2xlID0gdGhpcy5tYXhUaWx0IC0gdGlsdE9uR2xvYmU7XG4gICAgfVxuXG4gICAgdmFyIHNjZW5lID0gdGhpcy5vbDNkbS5nZXRDZXNpdW1TY2VuZSgpO1xuICAgIG9sY3NDb3JlLnJvdGF0ZUFyb3VuZEJvdHRvbUNlbnRlcihzY2VuZSwgYW5nbGUpO1xuICB9O1xuXG4gIF9wcm90by56b29tID0gZnVuY3Rpb24gem9vbShkZWx0YSkge1xuICAgIGlmICghdGhpcy5vbDNkbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG9sM2RtJyk7XG4gICAgfVxuXG4gICAgdmFyIHZpZXcgPSB0aGlzLm9sM2RtLmdldE9sVmlldygpO1xuICAgIHZhciBjdXIgPSB2aWV3LmdldFJlc29sdXRpb24oKTtcbiAgICB2YXIgbmV3UmVzb2x1dGlvbiA9IHZpZXcuY29uc3RyYWluUmVzb2x1dGlvbihjdXIsIGRlbHRhKTtcblxuICAgIGlmICh2aWV3LmdldEFuaW1hdGluZygpKSB7XG4gICAgICB2aWV3LmNhbmNlbEFuaW1hdGlvbnMoKTtcbiAgICB9XG5cbiAgICB2aWV3LmFuaW1hdGUoe1xuICAgICAgcmVzb2x1dGlvbjogbmV3UmVzb2x1dGlvbixcbiAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICBlYXNpbmc6IG9sRWFzaW5nLmVhc2VPdXRcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcblxuZnVuY3Rpb24gbmdlb09sY3NDb250cm9sczNkVGVtcGxhdGVVcmxJbmplY3RhYmxlKCRhdHRycywgbmdlb09sY3NDb250cm9sczNkVGVtcGxhdGVVcmwpIHtcbiAgaWYgKG5nZW9PbGNzQ29udHJvbHMzZFRlbXBsYXRlVXJsKSB7XG4gICAgcmV0dXJuIG5nZW9PbGNzQ29udHJvbHMzZFRlbXBsYXRlVXJsO1xuICB9XG5cbiAgdmFyIHRlbXBsYXRlVXJsID0gJGF0dHJzWyduZ2VvT2xjc0NvbnRyb2xzM2RUZW1wbGF0ZVVybCddO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL29sc2MvY29udHJvbHMzZCc7XG59XG5cbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL29sc2MvY29udHJvbHMzZCcsIHJlcXVpcmUoJy4vY29udHJvbHMzZC5odG1sJykpO1xufV0pO1xudmFyIG9sc2NDb250cm9sczNkQ29tcG9uZW50ID0ge1xuICBiaW5kaW5nczoge1xuICAgICdtaW5UaWx0JzogJzw/JyxcbiAgICAnbWF4VGlsdCc6ICc8PycsXG4gICAgJ29sM2RtJzogJzw/J1xuICB9LFxuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICB0ZW1wbGF0ZVVybDogbmdlb09sY3NDb250cm9sczNkVGVtcGxhdGVVcmxJbmplY3RhYmxlXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvT2xjc0NvbnRyb2xzM2QnLCBvbHNjQ29udHJvbHMzZENvbXBvbmVudCk7XG5teU1vZHVsZS52YWx1ZSgnbmdlb09sY3NDb250cm9sczNkVGVtcGxhdGVVcmwnLCAnJyk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJ25nZW8vb2xjcy9TZXJ2aWNlLmpzJztcbmltcG9ydCBjb250cm9sIGZyb20gJ25nZW8vb2xjcy9jb250cm9sczNkLmpzJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2xjc01vZHVsZScsIFtjb250cm9sLm5hbWUsIFNlcnZpY2UubmFtZV0pO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2TUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=