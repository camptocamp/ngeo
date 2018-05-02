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
/******/ 		"offline": 0
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
/******/ 	deferredModules.push([32,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/offline.css":
/*!******************************!*\
  !*** ./examples/offline.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/offline.js":
/*!*****************************!*\
  !*** ./examples/offline.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/fontawesome.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _offline_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offline.css */ "./examples/offline.css");
/* harmony import */ var _offline_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_offline_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_dependencies_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common_dependencies.js */ "./examples/common_dependencies.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/offline/module.js */ "./src/offline/module.js");
/* harmony import */ var ngeo_offline_Configuration_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/offline/Configuration.js */ "./src/offline/Configuration.js");
/* harmony import */ var ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/offline/ServiceManager.js */ "./src/offline/ServiceManager.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_11__);
// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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















class MainController {
  /**
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr
   * ngeo feature overlay manager service.
   * @param {import("ngeo/offline/NetworkStatus.js").default} ngeoNetworkStatus ngeo network status service.
   * @param {NgeoOfflineServiceManager} ngeoOfflineServiceManager ngeo offline service.
   * @ngInject
   */
  constructor(ngeoFeatureOverlayMgr, ngeoNetworkStatus, ngeoOfflineServiceManager) {
    /**
     * Save a square of 10 km sideways (Map's unit is the meter).
     * @type {number}
     * @export
     */
    this.offlineExtentSize = 10000;

    /**
     * @type {ngeoNetworkStatus}
     * @export
     */
    this.ngeoNetworkStatus = ngeoNetworkStatus;

    /**
     * @type {olMap}
     * @export
     */
    this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      layers: [
        new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
          source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__["default"](),
        }),
      ],
      view: new ol_View_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        center: [352379, 5172733],
        zoom: 4,
      }),
    });

    ngeoFeatureOverlayMgr.init(this.map);

    ngeoOfflineServiceManager.setSaveService('offlineDownloader');
    ngeoOfflineServiceManager.setRestoreService('ngeoOfflineRestorer');
  }
}

/** @type {!angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_11___default.a.module('app', [
  'gettext',
  ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name,
  ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].module.name,
]);

myModule.value('ngeoOfflineTestUrl', '../../src/offline/component.html');

// Define the offline download configuration service
myModule.service('ngeoOfflineConfiguration', ngeo_offline_Configuration_js__WEBPACK_IMPORTED_MODULE_9__["default"]);

myModule.controller('MainController', MainController);

myModule.constant('ngeoTilesPreloadingLimit', 0);

/* harmony default export */ __webpack_exports__["default"] = (MainController);


/***/ }),

/***/ "./node_modules/localforage/src/localforage.js":
/*!*****************************************************************************************!*\
  !*** delegated ./node_modules/localforage/src/localforage.js from dll-reference vendor ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1062);

/***/ }),

/***/ "./node_modules/ol/tilegrid.js":
/*!*************************************************************************!*\
  !*** delegated ./node_modules/ol/tilegrid.js from dll-reference vendor ***!
  \*************************************************************************/
/*! exports provided: getForProjection, wrapX, createForExtent, createXYZ, createForProjection, extentFromProjection */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(76);

/***/ }),

/***/ "./node_modules/ol/tilegrid/TileGrid.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/tilegrid/TileGrid.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(146);

/***/ }),

/***/ "./src/offline/AbstractLocalforageWrapper.js":
/*!***************************************************!*\
  !*** ./src/offline/AbstractLocalforageWrapper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var exports = function () {
  function AbstractLocalforageWrapper() {
    this.waitingPromises_ = new Map();
    this.currentId_ = 0;
  }

  var _proto = AbstractLocalforageWrapper.prototype;

  _proto.setItem = function setItem() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.createAction.apply(this, ['setItem'].concat(args));
  };

  _proto.getItem = function getItem() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.createAction.apply(this, ['getItem'].concat(args));
  };

  _proto.clear = function clear() {
    return this.createAction('clear');
  };

  _proto.config = function config() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return this.createAction.apply(this, ['config'].concat(args));
  };

  _proto.createAction = function createAction(command) {
    var id = ++this.currentId_;

    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var action = {
      plugin: 'localforage',
      command: command,
      args: args,
      id: id,
      context: null
    };
    var waitingPromise = {
      resolve: function resolve(_any) {},
      reject: function reject(_any) {}
    };
    var promise = new Promise(function (resolve, reject) {
      waitingPromise.resolve = resolve;
      waitingPromise.reject = reject;
    });
    this.waitingPromises_.set(id, waitingPromise);
    this.postToBackend(action);
    return promise;
  };

  _proto.receiveMessage = function receiveMessage(event) {
    var action = event.data;
    var id = action.id;
    var command = action.command;
    var args = action.args || [];
    var context = action.context;
    var msg = action.msg;
    var waitingPromise = this.waitingPromises_.get(id);

    if (command === 'error') {
      console.error(msg, args, context);

      if (waitingPromise) {
        waitingPromise.reject(args, context);
        this.waitingPromises_.delete(id);
      }
    } else if (command === 'response') {
      waitingPromise.resolve.apply(waitingPromise, args);
      this.waitingPromises_.delete(id);
    } else {
      console.error('Unhandled command', JSON.stringify(action, null, '\t'));
    }
  };

  _proto.postToBackend = function postToBackend(action) {};

  return AbstractLocalforageWrapper;
}();

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/Configuration.js":
/*!**************************************!*\
  !*** ./src/offline/Configuration.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Observable.js */ "./node_modules/ol/Observable.js");
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Layer.js */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj.js */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_source_Image_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Image.js */ "./node_modules/ol/source/Image.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/TileWMS.js */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_tilegrid_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/tilegrid.js */ "./node_modules/ol/tilegrid.js");
/* harmony import */ var ngeo_offline_SerializerDeserializer_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/offline/SerializerDeserializer.js */ "./src/offline/SerializerDeserializer.js");
/* harmony import */ var ngeo_offline_LocalforageCordovaWrapper_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/offline/LocalforageCordovaWrapper.js */ "./src/offline/LocalforageCordovaWrapper.js");
/* harmony import */ var ngeo_offline_LocalforageAndroidWrapper_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/offline/LocalforageAndroidWrapper.js */ "./src/offline/LocalforageAndroidWrapper.js");
/* harmony import */ var ngeo_offline_LocalforageIosWrapper_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/offline/LocalforageIosWrapper.js */ "./src/offline/LocalforageIosWrapper.js");
/* harmony import */ var ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/CustomEvent.js */ "./src/CustomEvent.js");
/* harmony import */ var ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/offline/utils.js */ "./src/offline/utils.js");
/* harmony import */ var localforage_src_localforage_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! localforage/src/localforage.js */ "./node_modules/localforage/src/localforage.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



















var _default = function (_olObservable) {
  _default.$inject = ["$rootScope", "ngeoBackgroundLayerMgr", "ngeoOfflineGutter"];

  _inheritsLoose(_default, _olObservable);

  function _default($rootScope, ngeoBackgroundLayerMgr, ngeoOfflineGutter) {
    var _this;

    _this = _olObservable.call(this) || this;
    _this.localforage_ = _this.createLocalforage();

    _this.configureLocalforage();

    _this.rootScope_ = $rootScope;
    _this.hasData = false;

    _this.initializeHasOfflineData();

    _this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
    _this.serDes_ = new ngeo_offline_SerializerDeserializer_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      gutter: ngeoOfflineGutter
    });
    _this.gutter_ = ngeoOfflineGutter;
    return _this;
  }

  var _proto = _default.prototype;

  _proto.dispatchProgress_ = function dispatchProgress_(progress) {
    this.dispatchEvent(new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_14__["default"]('progress', {
      'progress': progress
    }));
  };

  _proto.initializeHasOfflineData = function initializeHasOfflineData() {
    var _this2 = this;

    this.getItem('offline_content').then(function (value) {
      return _this2.setHasOfflineData(!!value);
    });
  };

  _proto.hasOfflineData = function hasOfflineData() {
    return this.hasData;
  };

  _proto.setHasOfflineData = function setHasOfflineData(value) {
    var needDigest = value !== this.hasData;
    this.hasData = value;

    if (needDigest) {
      this.rootScope_.$applyAsync();
    }
  };

  _proto.traceGetSetItem = function traceGetSetItem(msg, key, promise) {
    return promise;
  };

  _proto.createLocalforage = function createLocalforage() {
    if (location.search.includes('localforage=cordova')) {
      console.log('Using cordova localforage');
      return new ngeo_offline_LocalforageCordovaWrapper_js__WEBPACK_IMPORTED_MODULE_11__["default"]();
    } else if (location.search.includes('localforage=android')) {
      console.log('Using android localforage');
      return new ngeo_offline_LocalforageAndroidWrapper_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
    } else if (location.search.includes('localforage=ios')) {
      console.log('Using ios localforage');
      return new ngeo_offline_LocalforageIosWrapper_js__WEBPACK_IMPORTED_MODULE_13__["default"]();
    }

    return localforage_src_localforage_js__WEBPACK_IMPORTED_MODULE_16__["default"];
  };

  _proto.configureLocalforage = function configureLocalforage() {
    this.localforage_.config({
      'name': 'ngeoOfflineStorage',
      'version': 1.0,
      'storeName': 'offlineStorage'
    });
  };

  _proto.getItem = function getItem(key) {
    var promise = this.localforage_['getItem'](key);
    return this.traceGetSetItem('getItem', key, promise);
  };

  _proto.removeItem = function removeItem(key) {
    var promise = this.localforage_['removeItem'](key);
    return this.traceGetSetItem('removeItem', key, promise);
  };

  _proto.setItem = function setItem(key, value) {
    var promise = this.localforage_['setItem'](key, value);
    return this.traceGetSetItem('setItem', key, promise);
  };

  _proto.clear = function clear() {
    this.setHasOfflineData(false);
    var promise = this.localforage_.clear();
    return this.traceGetSetItem('clear', '', promise);
  };

  _proto.estimateLoadDataSize = function estimateLoadDataSize(map) {
    return 50;
  };

  _proto.getLayerKey = function getLayerKey(layerItem) {
    return layerItem.layer.get('label');
  };

  _proto.onTileDownloadSuccess = function onTileDownloadSuccess(progress, tile) {
    this.dispatchProgress_(progress);

    if (tile.response) {
      return this.setItem(Object(ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["normalizeURL"])(tile.url), tile.response);
    }

    return Promise.resolve();
  };

  _proto.onTileDownloadError = function onTileDownloadError(progress) {
    this.dispatchProgress_(progress);
    return Promise.resolve();
  };

  _proto.getExtentByZoom = function getExtentByZoom(map, layer, ancestors, userExtent) {
    var currentZoom = map.getView().getZoom();

    if (currentZoom === undefined) {
      throw new Error('Missing currentZoom');
    }

    var results = [];
    [0, 1, 2, 3, 4].forEach(function (dz) {
      results.push({
        zoom: currentZoom + dz,
        extent: userExtent
      });
    });
    return results;
  };

  _proto.sourceImageWMSToTileWMS = function sourceImageWMSToTileWMS(source, projection) {
    if (source instanceof ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_7__["default"] && source.getUrl() && source.getImageLoadFunction() === ol_source_Image_js__WEBPACK_IMPORTED_MODULE_6__["defaultImageLoadFunction"]) {
      var tileGrid = Object(ol_tilegrid_js__WEBPACK_IMPORTED_MODULE_9__["createForProjection"])(source.getProjection() || projection, 42, 256);
      var attributions = source.getAttributions() || '';
      var url = source.getUrl();

      if (!url || !attributions) {
        throw new Error('Invalid values');
      }

      source = new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        gutter: this.gutter_,
        url: url,
        tileGrid: tileGrid,
        attributions: attributions,
        projection: source.getProjection(),
        params: source.getParams()
      });
    }

    return source;
  };

  _proto.createLayerMetadatas = function createLayerMetadatas(map, userExtent) {
    var _this3 = this;

    var layersItems = [];

    var visitLayer = function visitLayer(layer, ancestors) {
      if (layer instanceof ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        var extentByZoom = _this3.getExtentByZoom(map, layer, ancestors, userExtent);

        var projection = ol_proj_js__WEBPACK_IMPORTED_MODULE_5__["get"](map.getView().getProjection());

        var source = _this3.sourceImageWMSToTileWMS(layer.getSource(), projection);

        var layerType;
        var layerSerialization;

        if (layer instanceof ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_3__["default"] || layer instanceof ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
          layerType = 'tile';
          layerSerialization = _this3.serDes_.serializeTileLayer(layer, source);
        } else if (layer instanceof ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
          layerType = 'vector';
        }

        var backgroundLayer = _this3.ngeoBackgroundLayerMgr_.get(map) === layer;
        layersItems.push({
          backgroundLayer: backgroundLayer,
          map: map,
          extentByZoom: extentByZoom,
          layerType: layerType,
          layerSerialization: layerSerialization,
          layer: layer,
          source: source,
          ancestors: ancestors
        });
      }

      return true;
    };

    map.getLayers().forEach(function (root) {
      Object(ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["traverseLayer"])(root, [], visitLayer);
    });
    return layersItems;
  };

  _proto.createTileLoadFunction_ = function createTileLoadFunction_(offlineLayer) {
    var _this4 = this;

    var tileLoadFunction = function tileLoadFunction(imageTile, src) {
      _this4.getItem(Object(ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["normalizeURL"])(src)).then(function (content) {
        if (!content) {
          content = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        }

        imageTile.getImage().src = content;
      });
    };

    return tileLoadFunction;
  };

  _proto.recreateOfflineLayer = function recreateOfflineLayer(offlineLayer) {
    if (offlineLayer.layerType === 'tile') {
      var serialization = offlineLayer.layerSerialization;

      if (serialization) {
        var tileLoadFunction = this.createTileLoadFunction_(offlineLayer);
        var layer = this.serDes_.deserializeTileLayer(serialization, tileLoadFunction);
        return layer;
      }
    }

    return null;
  };

  _proto.getMaxNumberOfParallelDownloads = function getMaxNumberOfParallelDownloads() {
    return 11;
  };

  return _default;
}(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/offline/Downloader.js":
/*!***********************************!*\
  !*** ./src/offline/Downloader.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/has.js */ "./node_modules/ol/has.js");
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/source/TileWMS.js */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_source_WMTS_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/source/WMTS.js */ "./node_modules/ol/source/WMTS.js");
/* harmony import */ var ngeo_offline_TilesDownloader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/offline/TilesDownloader.js */ "./src/offline/TilesDownloader.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function magnitude2(a, b) {
  var magnitudeSquared = 0;

  for (var i = 0; i < a.length; ++i) {
    magnitudeSquared += Math.pow(a[i] - b[i], 2);
  }

  return magnitudeSquared;
}

var Downloader = function () {
  Downloader.$inject = ["ngeoOfflineConfiguration"];

  function Downloader(ngeoOfflineConfiguration) {
    this.configuration_ = ngeoOfflineConfiguration;
    this.tileDownloader_ = null;
  }

  var _proto = Downloader.prototype;

  _proto.cancel = function cancel() {
    if (this.tileDownloader_) {
      this.tileDownloader_.cancel();
    }
  };

  _proto.queueLayerTiles_ = function queueLayerTiles_(layerMetadata, queue) {
    var source = layerMetadata.source;
    var map = layerMetadata.map,
        extentByZoom = layerMetadata.extentByZoom;

    if (!source) {
      return;
    }

    console.assert(source instanceof ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_1__["default"] || source instanceof ol_source_WMTS_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
    var projection = map.getView().getProjection();
    var tileGrid = source.getTileGrid();
    var tileUrlFunction = source.getTileUrlFunction();
    console.assert(extentByZoom);

    var _loop = function _loop() {
      var extentZoom = _step.value;
      var z = extentZoom.zoom;
      var extent = extentZoom.extent;
      var queueByZ = [];
      var minX = void 0;
      var minY = void 0;
      var maxX = void 0;
      var maxY = void 0;
      tileGrid.forEachTileCoord(extent, z, function (coord) {
        maxX = coord[1];
        maxY = coord[2];

        if (minX === undefined || minY === undefined) {
          minX = coord[1];
          minY = coord[2];
        }

        var url = tileUrlFunction(coord, ol_has_js__WEBPACK_IMPORTED_MODULE_0__["DEVICE_PIXEL_RATIO"], projection);
        console.assert(url);

        if (url) {
          var tile = {
            coord: coord,
            url: url,
            response: null
          };
          queueByZ.push(tile);
        }
      });
      var centerTileCoord = [z, (minX + maxX) / 2, (minY + maxY) / 2];
      queueByZ.sort(function (a, b) {
        return magnitude2(a.coord, centerTileCoord) - magnitude2(b.coord, centerTileCoord);
      });
      queue.push.apply(queue, queueByZ);
    };

    for (var _iterator = _createForOfIteratorHelperLoose(extentByZoom), _step; !(_step = _iterator()).done;) {
      _loop();
    }
  };

  _proto.save = function save(extent, map) {
    var _this = this;

    var layersMetadatas = this.configuration_.createLayerMetadatas(map, extent);
    var persistentLayers = [];
    var queue = [];
    var zooms = [];

    for (var _iterator2 = _createForOfIteratorHelperLoose(layersMetadatas), _step2; !(_step2 = _iterator2()).done;) {
      var layerItem = _step2.value;

      if (layerItem.layerType === 'tile') {
        var tiles = [];
        this.queueLayerTiles_(layerItem, tiles);
        queue.push.apply(queue, tiles);
      }

      persistentLayers.push({
        backgroundLayer: layerItem.backgroundLayer,
        layerType: layerItem.layerType,
        layerSerialization: layerItem.layerSerialization,
        key: this.configuration_.getLayerKey(layerItem)
      });
      layerItem.extentByZoom.forEach(function (obj) {
        var zoom = obj.zoom;

        if (!zooms.includes(zoom)) {
          zooms.push(zoom);
        }
      });
    }

    var persistentObject = {
      extent: extent,
      layers: persistentLayers,
      zooms: zooms.sort(function (a, b) {
        return a < b ? -1 : 1;
      })
    };
    var setOfflineContentPromise = this.configuration_.setItem('offline_content', persistentObject);
    var maxDownloads = this.configuration_.getMaxNumberOfParallelDownloads();
    this.tileDownloader_ = new ngeo_offline_TilesDownloader_js__WEBPACK_IMPORTED_MODULE_3__["default"](queue, this.configuration_, maxDownloads);
    var tileDownloadPromise = this.tileDownloader_.download();
    var allPromise = Promise.all([setOfflineContentPromise, tileDownloadPromise]);

    var setHasOfflineData = function setHasOfflineData() {
      return _this.configuration_.setHasOfflineData(true);
    };

    allPromise.then(setHasOfflineData, setHasOfflineData);
    return allPromise;
  };

  return Downloader;
}();

var name = 'offlineDownloader';
Downloader.module = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module(name, []).service(name, Downloader);
var exports = Downloader;
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/LocalforageAndroidWrapper.js":
/*!**************************************************!*\
  !*** ./src/offline/LocalforageAndroidWrapper.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper.js */ "./src/offline/AbstractLocalforageWrapper.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var exports = function (_AbstractWrapper) {
  _inheritsLoose(AndroidWrapper, _AbstractWrapper);

  function AndroidWrapper() {
    var _this;

    _this = _AbstractWrapper.call(this) || this;
    window.androidWrapper = _assertThisInitialized(_this);
    return _this;
  }

  var _proto = AndroidWrapper.prototype;

  _proto.postToBackend = function postToBackend(action) {
    var stringified = JSON.stringify(action);
    window.ngeoHost.postMessageToAndroid(stringified);
  };

  _proto.receiveFromAndroid = function receiveFromAndroid(actionString) {
    var action = JSON.parse(actionString);
    this.receiveMessage({
      'data': action
    });
  };

  return AndroidWrapper;
}(ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/LocalforageCordovaWrapper.js":
/*!**************************************************!*\
  !*** ./src/offline/LocalforageCordovaWrapper.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper.js */ "./src/offline/AbstractLocalforageWrapper.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var exports = function (_AbstractWrapper) {
  _inheritsLoose(CordovaWrapper, _AbstractWrapper);

  function CordovaWrapper() {
    var _this;

    _this = _AbstractWrapper.call(this) || this;
    window.addEventListener('message', _this.receiveMessage.bind(_assertThisInitialized(_this)), false);
    return _this;
  }

  var _proto = CordovaWrapper.prototype;

  _proto.postToBackend = function postToBackend(action) {
    window.parent.postMessage(action, '*');
  };

  return CordovaWrapper;
}(ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/LocalforageIosWrapper.js":
/*!**********************************************!*\
  !*** ./src/offline/LocalforageIosWrapper.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper.js */ "./src/offline/AbstractLocalforageWrapper.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var exports = function (_AbstractWrapper) {
  _inheritsLoose(IosWrapper, _AbstractWrapper);

  function IosWrapper() {
    var _this;

    _this = _AbstractWrapper.call(this) || this;
    window.iosWrapper = _assertThisInitialized(_this);
    return _this;
  }

  var _proto = IosWrapper.prototype;

  _proto.postToBackend = function postToBackend(action) {
    if (action.command === 'setItem') {
      action.args[1] = JSON.stringify(action.args[1]);
    }

    var stringified = JSON.stringify(action);
    window.webkit.messageHandlers.ios.postMessage(stringified);
  };

  _proto.receiveFromIos = function receiveFromIos(actionString) {
    var action = JSON.parse(actionString);
    var args = action['args'] || [];
    action['args'] = args.map(function (item) {
      return JSON.parse(item);
    });
    this.receiveMessage({
      'data': action
    });
  };

  return IosWrapper;
}(ngeo_offline_AbstractLocalforageWrapper_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/Mask.js":
/*!*****************************!*\
  !*** ./src/offline/Mask.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mask; });
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer.js */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/dom.js */ "./node_modules/ol/dom.js");
/* harmony import */ var ol_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/has.js */ "./node_modules/ol/has.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Mask = function (_Layer) {
  _inheritsLoose(Mask, _Layer);

  function Mask(layerOptions, maskOptions) {
    var _this;

    if (layerOptions === void 0) {
      layerOptions = {};
    }

    if (maskOptions === void 0) {
      maskOptions = {};
    }

    _this = _Layer.call(this, layerOptions) || this;
    _this.context_ = Object(ol_dom_js__WEBPACK_IMPORTED_MODULE_1__["createCanvasContext2D"])();
    _this.context_.canvas.style.opacity = '0.5';
    _this.context_.canvas.style.position = 'absolute';
    _this.margin_ = maskOptions.margin || 100;
    _this.extentInMeters_ = maskOptions.extentInMeters || 0;
    return _this;
  }

  var _proto = Mask.prototype;

  _proto.createExtent = function createExtent(center, halfLength) {
    var minx = center[0] - halfLength;
    var miny = center[1] - halfLength;
    var maxx = center[0] + halfLength;
    var maxy = center[1] + halfLength;
    return [minx, miny, maxx, maxy];
  };

  _proto.render = function render(frameState) {
    var context = this.context_;
    var cwidth = frameState.size[0];
    context.canvas.width = cwidth;
    var cheight = frameState.size[1];
    context.canvas.height = cheight;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(cwidth, 0);
    context.lineTo(cwidth, cheight);
    context.lineTo(0, cheight);
    context.lineTo(0, 0);
    context.closePath();
    var extentLength = Math.min(cwidth, cheight) - this.margin_ * 2;

    if (this.extentInMeters_) {
      extentLength = ol_has_js__WEBPACK_IMPORTED_MODULE_2__["DEVICE_PIXEL_RATIO"] * this.extentInMeters_ / frameState.viewState.resolution;
    }

    var extent = this.createExtent([cwidth / 2, cheight / 2], Math.ceil(extentLength / 2));
    context.moveTo(extent[0], extent[1]);
    context.lineTo(extent[0], extent[3]);
    context.lineTo(extent[2], extent[3]);
    context.lineTo(extent[2], extent[1]);
    context.lineTo(extent[0], extent[1]);
    context.closePath();
    context.fillStyle = 'rgba(0, 5, 25, 0.5)';
    context.fill();
    return context.canvas;
  };

  return Mask;
}(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/offline/Mode.js":
/*!*****************************!*\
  !*** ./src/offline/Mode.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);


var Mode = function () {
  Mode.$inject = ["ngeoOfflineConfiguration"];

  function Mode(ngeoOfflineConfiguration) {
    this.enabled_ = false;
    this.component_ = null;
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
  }

  var _proto = Mode.prototype;

  _proto.isEnabled = function isEnabled() {
    return this.enabled_;
  };

  _proto.enable = function enable() {
    this.enabled_ = true;
  };

  _proto.registerComponent = function registerComponent(component) {
    this.component_ = component;
  };

  _proto.activateOfflineMode = function activateOfflineMode() {
    if (!this.component_) {
      throw new Error('The component is not registered');
    }

    this.component_.activateOfflineMode();
  };

  _proto.hasData = function hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineData();
  };

  return Mode;
}();

var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOfflineMode', []);
myModule.service('ngeoOfflineMode', Mode);
Mode.module = myModule;
/* harmony default export */ __webpack_exports__["default"] = (Mode);

/***/ }),

/***/ "./src/offline/NetworkStatus.js":
/*!**************************************!*\
  !*** ./src/offline/NetworkStatus.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
configFunction_.$inject = ["$httpProvider"];



var Service = function () {
  Service.$inject = ["$document", "$window", "$timeout", "$rootScope", "ngeoOfflineTestUrl"];

  function Service($document, $window, $timeout, $rootScope, ngeoOfflineTestUrl) {
    this.$document_ = $document;
    this.$window_ = $window;
    this.$timeout_ = $timeout;
    this.$rootScope_ = $rootScope;
    this.ngeoOfflineTestUrl_ = ngeoOfflineTestUrl;
    this.count_ = 0;
    this.offline_;
    this.promise_;
    this.initialize_();
  }

  var _proto = Service.prototype;

  _proto.initialize_ = function initialize_() {
    var _this = this;

    this.offline_ = !this.$window_.navigator.onLine;
    this.$window_.addEventListener('offline', function () {
      _this.triggerChangeStatusEvent_(true);
    });
    this.$window_.addEventListener('online', function () {
      _this.check(undefined);
    });

    if (this.$document_.ajaxError) {
      var onAjaxError = function onAjaxError(evt, jqxhr, settings, thrownError) {
        if (!/^(canceled|abort)$/.test(thrownError)) {
          _this.check(2000);
        }
      };

      this.$document_.ajaxError(onAjaxError);
    }
  };

  _proto.check = function check(timeout) {
    var _this2 = this;

    if (this.promise_) {
      this.$timeout_.cancel(this.promise_);
      this.promise_ = undefined;
    }

    if (timeout !== undefined) {
      this.count_++;
      this.promise_ = this.$timeout_(function () {
        return _this2.check();
      }, timeout);
      return;
    }

    $.ajax({
      method: 'GET',
      url: this.ngeoOfflineTestUrl_,
      timeout: 1000,
      success: function success() {
        _this2.count_ = 0;

        if (_this2.offline_) {
          _this2.triggerChangeStatusEvent_(false);
        }
      },
      error: function error() {
        _this2.count_++;

        if (_this2.count_ > 2 && !_this2.offline_) {
          _this2.triggerChangeStatusEvent_(true);
        }
      }
    });
  };

  _proto.triggerChangeStatusEvent_ = function triggerChangeStatusEvent_(offline) {
    this.offline_ = offline;
    this.$rootScope_.$digest();
  };

  _proto.isDisconnected = function isDisconnected() {
    return !!this.offline_;
  };

  return Service;
}();

var name = 'ngeoNetworkStatus';
Service.module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(name, [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_0__["default"].name]);
Service.module.service(name, Service);

var httpInterceptor = function httpInterceptor($q, ngeoDebounce, ngeoNetworkStatus) {
  var debouncedCheck = ngeoDebounce(function () {
    return ngeoNetworkStatus.check(undefined);
  }, 2000, false);
  return {
    request: function request(config) {
      return config;
    },
    requestError: function requestError(rejection) {
      return $q.reject(rejection);
    },
    response: function response(_response) {
      return _response;
    },
    responseError: function responseError(rejection) {
      debouncedCheck();
      return $q.reject(rejection);
    }
  };
};

httpInterceptor.$inject = ["$q", "ngeoDebounce", "ngeoNetworkStatus"];
httpInterceptor.$inject = ["$q", "ngeoDebounce", "ngeoNetworkStatus"];
Service.module.factory('httpInterceptor', httpInterceptor);

function configFunction_($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}

Service.module.config(configFunction_);
var exports = Service;
/* harmony default export */ __webpack_exports__["default"] = (exports);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/offline/Restorer.js":
/*!*********************************!*\
  !*** ./src/offline/Restorer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_map_BackgroundLayerMgr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/map/BackgroundLayerMgr.js */ "./src/map/BackgroundLayerMgr.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var Restorer = function () {
  Restorer.$inject = ["ngeoOfflineConfiguration", "ngeoBackgroundLayerMgr"];

  function Restorer(ngeoOfflineConfiguration, ngeoBackgroundLayerMgr) {
    this.configuration_ = ngeoOfflineConfiguration;
    this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
  }

  var _proto = Restorer.prototype;

  _proto.restore = function restore(map) {
    var _this = this;

    return this.configuration_.getItem('offline_content').then(function (offlineContent) {
      return _this.doRestore(map, offlineContent);
    });
  };

  _proto.doRestore = function doRestore(map, offlineContent) {
    map.getLayerGroup().getLayers().clear();

    for (var _iterator = _createForOfIteratorHelperLoose(offlineContent.layers), _step; !(_step = _iterator()).done;) {
      var offlineLayer = _step.value;
      var layer = this.configuration_.recreateOfflineLayer(offlineLayer);

      if (layer) {
        map.addLayer(layer);

        if (offlineLayer.backgroundLayer) {
          this.ngeoBackgroundLayerMgr_.set(map, layer);
        }
      }
    }

    return offlineContent.extent;
  };

  return Restorer;
}();

var name = 'ngeoOfflineRestorer';
Restorer.module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(name, [ngeo_map_BackgroundLayerMgr_js__WEBPACK_IMPORTED_MODULE_0__["default"].name]).service(name, Restorer);
var exports = Restorer;
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/SerializerDeserializer.js":
/*!***********************************************!*\
  !*** ./src/offline/SerializerDeserializer.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_tilegrid_TileGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/tilegrid/TileGrid.js */ "./node_modules/ol/tilegrid/TileGrid.js");
/* harmony import */ var ol_tilegrid_WMTS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/tilegrid/WMTS.js */ "./node_modules/ol/tilegrid/WMTS.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/proj.js */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/TileWMS.js */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_source_WMTS_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/WMTS.js */ "./node_modules/ol/source/WMTS.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");







var SerDes = function () {
  function SerDes(_ref) {
    var gutter = _ref.gutter;
    this.gutter_ = gutter;
  }

  var _proto = SerDes.prototype;

  _proto.createBaseObject_ = function createBaseObject_(olObject) {
    var properties = olObject.getProperties();
    var obj = {};

    for (var key in properties) {
      var value = properties[key];
      var typeOf = typeof value;

      if (typeOf === 'string' || typeOf === 'number') {
        obj[key] = value;
      }
    }

    return obj;
  };

  _proto.serializeTilegrid = function serializeTilegrid(tilegrid) {
    var obj = {};
    obj.extent = tilegrid.getExtent();
    obj.minZoom = tilegrid.getMinZoom();
    obj.origin = tilegrid.getOrigin(0);
    obj.resolutions = tilegrid.getResolutions();
    obj.tileSize = tilegrid.getTileSize(tilegrid.getMinZoom());
    return JSON.stringify(obj);
  };

  _proto.deserializeTilegrid = function deserializeTilegrid(serialization) {
    var options = JSON.parse(serialization);
    return new ol_tilegrid_TileGrid_js__WEBPACK_IMPORTED_MODULE_0__["default"](options);
  };

  _proto.serializeTilegridWMTS = function serializeTilegridWMTS(tilegrid) {
    if (!tilegrid) {
      return undefined;
    }

    var obj = {};
    var resolutions = tilegrid.getResolutions();
    obj.extent = tilegrid.getExtent();
    obj.minZoom = tilegrid.getMinZoom();
    obj.matrixIds = tilegrid.getMatrixIds();
    obj.resolutions = resolutions;
    obj.origins = [];

    for (var z = 0; z < resolutions.length; ++z) {
      obj.origins.push(tilegrid.getOrigin(z));
    }

    return JSON.stringify(obj);
  };

  _proto.deserializeTilegridWMTS = function deserializeTilegridWMTS(serialization) {
    var options = JSON.parse(serialization);
    return new ol_tilegrid_WMTS_js__WEBPACK_IMPORTED_MODULE_1__["default"](options);
  };

  _proto.serializeSourceTileWMS = function serializeSourceTileWMS(source) {
    var obj = this.createBaseObject_(source);
    obj.params = source.getParams();
    obj.urls = source.getUrls();
    obj.tileGrid = this.serializeTilegrid(source.getTileGrid());
    var projection = source.getProjection();

    if (projection) {
      obj.projection = ol_proj_js__WEBPACK_IMPORTED_MODULE_2__["get"](source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  };

  _proto.deserializeSourceTileWMS = function deserializeSourceTileWMS(serialization, tileLoadFunction) {
    var options = JSON.parse(serialization);
    options.tileLoadFunction = tileLoadFunction;

    if (options.tileGrid) {
      options.tileGrid = this.deserializeTilegrid(options.tileGrid);
    }

    options.gutter = this.gutter_;
    return new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_3__["default"](options);
  };

  _proto.serializeSourceWMTS = function serializeSourceWMTS(source) {
    var obj = this.createBaseObject_(source);
    obj.dimensions = source.getDimensions();
    obj.format = source.getFormat();
    obj.urls = source.getUrls();
    obj.version = source.getVersion();
    obj.layer = source.getLayer();
    obj.style = source.getStyle();
    obj.matrixSet = source.getMatrixSet();
    var tileGridWMTS = source.getTileGrid();
    obj.tileGrid = this.serializeTilegridWMTS(tileGridWMTS);
    obj.requestEncoding = source.getRequestEncoding();
    var projection = source.getProjection();

    if (projection) {
      obj.projection = ol_proj_js__WEBPACK_IMPORTED_MODULE_2__["get"](source.getProjection()).getCode();
    }

    return JSON.stringify(obj);
  };

  _proto.deserializeSourceWMTS = function deserializeSourceWMTS(serialization, tileLoadFunction) {
    var options = JSON.parse(serialization);
    options.tileLoadFunction = tileLoadFunction;

    if (options.tileGrid) {
      options.tileGrid = this.deserializeTilegridWMTS(options.tileGrid);
    }

    return new ol_source_WMTS_js__WEBPACK_IMPORTED_MODULE_4__["default"](options);
  };

  _proto.makeInfinitySerializable_ = function makeInfinitySerializable_(number) {
    if (number === Infinity) {
      return 1000;
    }

    return number;
  };

  _proto.serializeTileLayer = function serializeTileLayer(layer, source) {
    var obj = this.createBaseObject_(layer);
    obj.opacity = layer.getOpacity();
    obj.visible = layer.getVisible();
    obj.minResolution = layer.getMinResolution();
    obj.maxResolution = this.makeInfinitySerializable_(layer.getMaxResolution());
    obj.zIndex = layer.getZIndex();
    source = source || layer.getSource();

    if (source instanceof ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      obj.source = this.serializeSourceTileWMS(source);
      obj.sourceType = 'tileWMS';
    } else if (source instanceof ol_source_WMTS_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
      obj.source = this.serializeSourceWMTS(source);
      obj.sourceType = 'WMTS';
    }

    return JSON.stringify(obj);
  };

  _proto.deserializeTileLayer = function deserializeTileLayer(serialization, tileLoadFunction) {
    var options = JSON.parse(serialization);
    var sourceType = options.sourceType;

    if (sourceType === 'tileWMS') {
      options.source = this.deserializeSourceTileWMS(options.source, tileLoadFunction);
    } else if (sourceType === 'WMTS') {
      options.source = this.deserializeSourceWMTS(options.source, tileLoadFunction);
    }

    return new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__["default"](options);
  };

  return SerDes;
}();

var exports = SerDes;
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/ServiceManager.js":
/*!***************************************!*\
  !*** ./src/offline/ServiceManager.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);


var ServiceManager = function () {
  ServiceManager.$inject = ["$injector"];

  function ServiceManager($injector) {
    this.$injector_ = $injector;
    this.saveService_ = null;
    this.restoreService_ = null;
  }

  var _proto = ServiceManager.prototype;

  _proto.getOfflineService_ = function getOfflineService_(serviceLike, method) {
    if (typeof serviceLike === 'string') {
      if (!this.$injector_.has(serviceLike)) {
        console.error("The offline " + method + " service could not be found");
        return;
      }

      var service = this.$injector_.get(serviceLike);

      if (!service[method]) {
        console.error("The offline service " + serviceLike + " does not have a " + method + " method");
        return;
      }

      return service;
    }

    if (!serviceLike[method]) {
      console.error("The provided offline service does not have a " + method + " method");
      return;
    }

    return serviceLike;
  };

  _proto.setSaveService = function setSaveService(saveLikeService) {
    this.saveService_ = this.getOfflineService_(saveLikeService, 'save');
  };

  _proto.setRestoreService = function setRestoreService(restoreLikeService) {
    this.restoreService_ = this.getOfflineService_(restoreLikeService, 'restore');
  };

  _proto.cancel = function cancel() {
    if (!this.saveService_) {
      console.warn('You must register a saveService first');
      return;
    }

    this.saveService_.cancel();
  };

  _proto.save = function save(extent, map) {
    if (!this.saveService_) {
      console.warn('You must register a saveService first');
      return;
    }

    this.saveService_.save(extent, map);
  };

  _proto.restore = function restore(map) {
    if (!this.restoreService_) {
      console.warn('You must register a restoreService first');
      return Promise.reject();
    }

    return this.restoreService_.restore(map);
  };

  return ServiceManager;
}();

ServiceManager.module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOfflineServiceManager', []);
ServiceManager.module.service('ngeoOfflineServiceManager', ServiceManager);
/* harmony default export */ __webpack_exports__["default"] = (ServiceManager);

/***/ }),

/***/ "./src/offline/TilesDownloader.js":
/*!****************************************!*\
  !*** ./src/offline/TilesDownloader.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TileDownloader; });
function blobToDataUrl(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

var TileDownloader = function () {
  function TileDownloader(tiles, callbacks, workers) {
    this.maxNumberOfWorkers_ = workers;
    this.wasStarted_ = false;
    this.tiles_ = tiles;
    this.callbacks_ = callbacks;
    this.allCount_ = 0;
    this.okCount_ = 0;
    this.koCount_ = 0;
    this.requestedCount_ = 0;
    this.resolvePromise_ = null;
    this.promise_ = null;
    this.tileIndex_ = 0;
    this.cancel_ = false;
  }

  var _proto = TileDownloader.prototype;

  _proto.cancel = function cancel() {
    this.cancel_ = true;
  };

  _proto.download = function download() {
    var _this = this;

    if (this.promise_) {
      return this.promise_;
    }

    this.promise_ = new Promise(function (resolve, reject) {
      _this.resolvePromise_ = resolve;
    });
    console.assert(this.tiles_);

    if (this.tiles_.length === 0) {
      this.callbacks_.onTileDownloadError(1);

      if (this.resolvePromise_) {
        this.resolvePromise_();
      }
    } else {
      for (var i = 0; i < this.maxNumberOfWorkers_; ++i) {
        this.downloadTile_();
      }
    }

    return this.promise_;
  };

  _proto.downloadTile_ = function downloadTile_() {
    var _this2 = this;

    if (this.cancel_ || this.tileIndex_ >= this.tiles_.length) {
      return;
    }

    var tile = this.tiles_[this.tileIndex_++];
    var tileUrl = tile.url;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', tileUrl, true);
    xhr.responseType = 'blob';

    var onTileDownloaded = function onTileDownloaded() {
      if (_this2.allCount_ === _this2.tiles_.length && _this2.resolvePromise_) {
        _this2.resolvePromise_();
      }

      _this2.downloadTile_();
    };

    var errorCallback = function errorCallback(_) {
      if (_this2.cancel_) {
        return;
      }

      ++_this2.allCount_;
      ++_this2.koCount_;
      var progress = _this2.allCount_ / _this2.tiles_.length;

      _this2.callbacks_.onTileDownloadError(progress).then(onTileDownloaded, onTileDownloaded);
    };

    var onloadCallback = function onloadCallback(e) {
      var response = xhr.response;

      if (response && response.size !== 0) {
        blobToDataUrl(response).then(function (dataUrl) {
          if (_this2.cancel_) {
            return;
          }

          ++_this2.allCount_;
          ++_this2.okCount_;
          tile.response = dataUrl;
          var progress = _this2.allCount_ / _this2.tiles_.length;

          _this2.callbacks_.onTileDownloadSuccess(progress, tile).then(onTileDownloaded, onTileDownloaded);
        }, function () {
          if (_this2.cancel_) {
            return;
          }

          errorCallback(e);
        });
      } else {
        if (_this2.cancel_) {
          return;
        }

        ++_this2.allCount_;
        ++_this2.okCount_;

        _this2.callbacks_.onTileDownloadSuccess(_this2.allCount_ / _this2.tiles_.length, tile).then(onTileDownloaded, onTileDownloaded);
      }
    };

    xhr.onload = onloadCallback;
    xhr.onerror = errorCallback;
    xhr.onabort = errorCallback;
    xhr.ontimeout = errorCallback;
    xhr.send();
    ++this.requestedCount_;
  };

  return TileDownloader;
}();



/***/ }),

/***/ "./src/offline/component.html":
/*!************************************!*\
  !*** ./src/offline/component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="main-button">\n  <span ng-if="!$ctrl.hasData()">\n    <div class="no-data fas fa-arrow-circle-down" ng-click="$ctrl.toggleViewExtentSelection()"></div>\n  </span>\n  <span ng-if="$ctrl.hasData()">\n    <div class="with-data fas fa-arrow-circle-down" ng-click="$ctrl.showMenu()"></div>\n  </span>\n</div>\n\n<div ng-if="$ctrl.selectingExtent && !$ctrl.networkStatus.isDisconnected()" class="validate-extent btn btn-primary">\n  <div ng-if="!$ctrl.downloading" ng-click="$ctrl.computeSizeAndDisplayAlertLoadData()" translate>Save map</div>\n  <div ng-if="$ctrl.downloading" ng-click="$ctrl.askAbortDownload()" translate>Abort</div>\n</div>\n\n\n<div ng-if="$ctrl.downloading" class="in-progress">\n  <div>{{$ctrl.progressPercents}}%</div>\n</div>\n\n<ngeo-modal ng-model="$ctrl.menuDisplayed">\n  <div class="modal-header">\n    <button type="button" class="close"\n              data-dismiss="modal"\n              aria-label="{{\'Close\' | translate}}">\n      <span aria-hidden="true">&times;</span>\n    </button>\n    <h4 class="modal-title" translate>Offline map</h4>\n  </div>\n  <div class="modal-body">\n    <div ng-if="$ctrl.hasData()">\n      <button type="button" class="extent-zoom btn btn-default"\n              ng-if="!$ctrl.offlineMode.isEnabled()"\n              ng-click="$ctrl.activateOfflineMode()"\n              translate>Activate offline mode\n      </button>\n      <button type="button" class="extent-zoom btn btn-default"\n              ng-if="$ctrl.offlineMode.isEnabled() && !$ctrl.networkStatus.isDisconnected()"\n              ng-click="$ctrl.deactivateOfflineMode()"\n              translate>Deactivate offline mode\n      </button>\n\n      <button type="button" class="extent-show btn btn-default"\n              ng-if="$ctrl.offlineMode.isEnabled()"\n              ng-click="$ctrl.toggleExtentVisibility()">\n        <span ng-if="$ctrl.isExtentVisible()" translate>Hide extent</span>\n        <span ng-if="!$ctrl.isExtentVisible()" translate >Show extent</span>\n      </button>\n      <button type="button" class="delete btn btn-default"\n              ng-if="!$ctrl.networkStatus.isDisconnected()"\n              ng-click="$ctrl.displayAlertDestroyData = true"\n              translate>Delete data\n      </button>\n    </div>\n    <div ng-if="!$ctrl.hasData() && !$ctrl.networkStatus.isDisconnected()">\n      <button type="button" class="new-data btn btn-default"\n              ng-click="$ctrl.toggleViewExtentSelection()"\n              translate>Save new map\n      </button>\n    </div>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertLoadData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>~{{$ctrl.estimatedLoadDataSize}}MB of maps will be downloaded (until scale 1:25\'000) - Don\'t lock your device or navigate away from this site during the download process. Deactivate "private" mode of your browser.</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.validateExtent()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertNoLayer">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>No maps selected for saving.</p>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Ok\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertDestroyData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>Do you really want to remove your data ?</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.deleteData()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertAbortDownload">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>Do you really want to remove your data ?</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.abortDownload()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              ng-click="$ctrl.followDownloadProgression_()"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n';

}
return __p
}

/***/ }),

/***/ "./src/offline/component.js":
/*!**********************************!*\
  !*** ./src/offline/component.js ***!
  \**********************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ "./src/map/FeatureOverlayMgr.js");
/* harmony import */ var ngeo_message_modalComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/message/modalComponent.js */ "./src/message/modalComponent.js");
/* harmony import */ var ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/utils.js */ "./src/utils.js");
/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Collection.js */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_has_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/has.js */ "./node_modules/ol/has.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Mask_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Mask.js */ "./src/offline/Mask.js");









var myModule = angular__WEBPACK_IMPORTED_MODULE_7___default.a.module('ngeoOffline', [ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_0__["default"].name, ngeo_message_modalComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value('ngeoOfflineTemplateUrl', function (element, attrs) {
  var templateUrl = attrs['ngeoOfflineTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/offline/component.html';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/offline/component.html', __webpack_require__(/*! ./component.html */ "./src/offline/component.html"));
}]);
ngeoOfflineTemplateUrl.$inject = ["$element", "$attrs", "ngeoOfflineTemplateUrl"];

function ngeoOfflineTemplateUrl($element, $attrs, ngeoOfflineTemplateUrl) {
  return ngeoOfflineTemplateUrl($element, $attrs);
}

var component = {
  bindings: {
    'map': '<ngeoOfflineMap',
    'extentSize': '<?ngeoOfflineExtentsize',
    'maskMargin': '<?ngeoOfflineMaskMargin',
    'minZoom': '<?ngeoOfflineMinZoom',
    'maxZoom': '<?ngeoOfflineMaxZoom'
  },
  controller: 'ngeoOfflineController',
  templateUrl: ngeoOfflineTemplateUrl
};
myModule.component('ngeoOffline', component);
var Controller = function () {
  Controller.$inject = ["$timeout", "ngeoFeatureOverlayMgr", "ngeoOfflineServiceManager", "ngeoOfflineConfiguration", "ngeoOfflineMode", "ngeoNetworkStatus"];

  function Controller($timeout, ngeoFeatureOverlayMgr, ngeoOfflineServiceManager, ngeoOfflineConfiguration, ngeoOfflineMode, ngeoNetworkStatus) {
    var _this = this;

    this.$timeout_ = $timeout;
    this.maskLayer_ = undefined;
    this.ngeoOfflineServiceManager_ = ngeoOfflineServiceManager;
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
    this.offlineMode = ngeoOfflineMode;
    this.networkStatus = ngeoNetworkStatus;
    this.map;
    this.extentSize = 0;
    this.featuresOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
    this.overlayCollection_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.featuresOverlay_.setFeatures(this.overlayCollection_);
    this.dataPolygon_ = null;
    this.selectingExtent = false;
    this.downloading = false;
    this.progressPercents = 0;
    this.menuDisplayed = false;
    this.displayAlertAbortDownload = false;
    this.displayAlertLoadData = false;
    this.displayAlertNoLayer = false;
    this.maskMargin = 0;
    this.minZoom;
    this.maxZoom;
    this.originalMinZoom;
    this.originalMaxZoom;
    this.estimatedLoadDataSize = 0;
    this.rotateMask = false;

    this.progressCallback_ = function (event) {
      var progress = event.detail.progress;
      _this.progressPercents = Math.floor(progress * 100);

      if (progress === 1) {
        _this.finishDownload_();
      }

      _this.$timeout_(function () {}, 0);
    };
  }

  var _proto = Controller.prototype;

  _proto.$onInit = function $onInit() {
    this.offlineMode.registerComponent(this);
    this.ngeoOfflineConfiguration_.on('progress', this.progressCallback_);
    this.maskMargin = this.maskMargin || 100;
    this.minZoom = this.minZoom || 10;
    this.maxZoom = this.maxZoom || 15;
    this.maskLayer_ = new _Mask_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      extentInMeters: this.extentSize
    }, {
      margin: this.maskMargin
    });
  };

  _proto.$onDestroy = function $onDestroy() {
    this.ngeoOfflineConfiguration_.un('progress', this.progressCallback_);
  };

  _proto.hasData = function hasData() {
    return this.ngeoOfflineConfiguration_.hasOfflineData();
  };

  _proto.computeSizeAndDisplayAlertLoadData = function computeSizeAndDisplayAlertLoadData() {
    this.estimatedLoadDataSize = this.ngeoOfflineConfiguration_.estimateLoadDataSize(this.map);

    if (this.estimatedLoadDataSize > 0) {
      this.displayAlertLoadData = true;
    } else {
      this.displayAlertNoLayer = true;
    }
  };

  _proto.toggleViewExtentSelection = function toggleViewExtentSelection(finished) {
    this.menuDisplayed = false;
    this.selectingExtent = !this.selectingExtent;
    this.map.removeLayer(this.maskLayer_);
    this.removeZoomConstraints_();

    if (this.selectingExtent && !this.map.getLayers().getArray().includes(this.maskLayer_)) {
      this.addZoomConstraints_();
      this.map.addLayer(this.maskLayer_);
    }

    this.map.render();
  };

  _proto.validateExtent = function validateExtent() {
    this.progressPercents = 0;
    var extent = this.getDowloadExtent_();
    this.downloading = true;
    this.ngeoOfflineServiceManager_.save(extent, this.map);
  };

  _proto.finishDownload_ = function finishDownload_() {
    this.downloading = false;
    this.toggleViewExtentSelection(true);
  };

  _proto.askAbortDownload = function askAbortDownload() {
    this.displayAlertAbortDownload = true;
  };

  _proto.abortDownload = function abortDownload() {
    this.downloading = false;
    this.ngeoOfflineServiceManager_.cancel();
    this.deleteData();
  };

  _proto.showMenu = function showMenu() {
    this.menuDisplayed = true;
  };

  _proto.activateOfflineMode = function activateOfflineMode() {
    var _this2 = this;

    this.ngeoOfflineServiceManager_.restore(this.map).then(function (extent) {
      _this2.dataPolygon_ = _this2.createPolygonFromExtent_(extent);

      var size = _this2.map.getSize();

      if (size === undefined) {
        throw new Error('Missing size');
      }

      _this2.map.getView().fit(extent, {
        size: size
      });

      _this2.menuDisplayed = false;

      _this2.displayExtent_();

      _this2.offlineMode.enable();
    });
  };

  _proto.deactivateOfflineMode = function deactivateOfflineMode() {
    window.location.reload();
  };

  _proto.toggleExtentVisibility = function toggleExtentVisibility() {
    if (this.isExtentVisible()) {
      this.overlayCollection_.clear();
    } else {
      this.displayExtent_();
    }
  };

  _proto.isExtentVisible = function isExtentVisible() {
    return this.overlayCollection_.getLength() > 0;
  };

  _proto.deleteData = function deleteData() {
    var _this3 = this;

    this.overlayCollection_.clear();
    this.dataPolygon_ = null;

    if (this.networkStatus.isDisconnected()) {
      this.menuDisplayed = false;
    }

    var reloadIfInOfflineMode = function reloadIfInOfflineMode() {
      if (_this3.offlineMode.isEnabled()) {
        _this3.deactivateOfflineMode();
      }
    };

    this.ngeoOfflineConfiguration_.clear().then(reloadIfInOfflineMode);
  };

  _proto.displayExtent_ = function displayExtent_() {
    if (!this.isExtentVisible() && this.dataPolygon_) {
      var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.dataPolygon_);
      this.overlayCollection_.push(feature);
    }
  };

  _proto.addZoomConstraints_ = function addZoomConstraints_() {
    var view = this.map.getView();
    var zoom = view.getZoom() || 0;
    this.originalMinZoom = view.getMinZoom();
    this.originalMaxZoom = view.getMaxZoom();

    if (zoom < this.minZoom) {
      view.setZoom(this.minZoom);
    } else if (zoom > this.maxZoom) {
      view.setZoom(this.maxZoom);
    }

    view.setMaxZoom(this.maxZoom);
    view.setMinZoom(this.minZoom);
  };

  _proto.removeZoomConstraints_ = function removeZoomConstraints_() {
    var view = this.map.getView();

    if (this.originalMaxZoom !== undefined && this.originalMinZoom !== undefined) {
      view.setMaxZoom(this.originalMaxZoom);
      view.setMinZoom(this.originalMinZoom);
    }
  };

  _proto.createPolygonFromExtent_ = function createPolygonFromExtent_(extent) {
    var projExtent = this.map.getView().getProjection().getExtent();
    return new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_5__["default"]([Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(projExtent), Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(extent)], 'XY');
  };

  _proto.getDowloadExtent_ = function getDowloadExtent_() {
    var center = this.map.getView().getCenter();
    var halfLength = Math.ceil(this.extentSize || this.getExtentSize_()) / 2;
    return this.maskLayer_.createExtent(center, halfLength);
  };

  _proto.getExtentSize_ = function getExtentSize_() {
    var mapSize = this.map.getSize() || [150, 150];
    var maskSizePixel = ol_has_js__WEBPACK_IMPORTED_MODULE_6__["DEVICE_PIXEL_RATIO"] * Math.min(mapSize[0], mapSize[1]) - this.maskMargin * 2;
    var maskSizeMeter = maskSizePixel * (this.map.getView().getResolution() || 1) / ol_has_js__WEBPACK_IMPORTED_MODULE_6__["DEVICE_PIXEL_RATIO"];
    return maskSizeMeter;
  };

  return Controller;
}();
myModule.controller('ngeoOfflineController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/offline/module.js":
/*!*******************************!*\
  !*** ./src/offline/module.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_offline_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/component.js */ "./src/offline/component.js");
/* harmony import */ var ngeo_offline_NetworkStatus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/offline/NetworkStatus.js */ "./src/offline/NetworkStatus.js");
/* harmony import */ var ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/offline/ServiceManager.js */ "./src/offline/ServiceManager.js");
/* harmony import */ var ngeo_offline_Downloader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/offline/Downloader.js */ "./src/offline/Downloader.js");
/* harmony import */ var ngeo_offline_Restorer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/offline/Restorer.js */ "./src/offline/Restorer.js");
/* harmony import */ var ngeo_offline_Mode_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/offline/Mode.js */ "./src/offline/Mode.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_6__);







var exports = angular__WEBPACK_IMPORTED_MODULE_6___default.a.module('ngeoOfflineModule', [ngeo_offline_component_js__WEBPACK_IMPORTED_MODULE_0__["default"].name, ngeo_offline_NetworkStatus_js__WEBPACK_IMPORTED_MODULE_1__["default"].module.name, ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].module.name, ngeo_offline_Downloader_js__WEBPACK_IMPORTED_MODULE_3__["default"].module.name, ngeo_offline_Restorer_js__WEBPACK_IMPORTED_MODULE_4__["default"].module.name, ngeo_offline_Mode_js__WEBPACK_IMPORTED_MODULE_5__["default"].module.name]);
exports.value('ngeoOfflineGutter', 96);
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/utils.js":
/*!******************************!*\
  !*** ./src/offline/utils.js ***!
  \******************************/
/*! exports provided: traverseLayer, normalizeURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traverseLayer", function() { return traverseLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeURL", function() { return normalizeURL; });
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Group.js */ "./node_modules/ol/layer/Group.js");

function traverseLayer(layer, ancestors, visitor) {
  var descend = visitor(layer, ancestors);

  if (descend && layer instanceof ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    layer.getLayers().forEach(function (childLayer) {
      traverseLayer(childLayer, [].concat(ancestors, [layer]), visitor);
    });
  }
}
var extractor = new RegExp('[^/]*//[^/]+/(.*)');
function normalizeURL(url) {
  var matches = url.match(extractor);

  if (!matches) {
    throw new Error('Could not normalize url ' + url);
  }

  return matches[1];
}

/***/ }),

/***/ 32:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/offline.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/offline.js */"./examples/offline.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01hc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1Jlc3RvcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvU2VydmljZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvVGlsZXNEb3dubG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm9mZmxpbmVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMyLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDIxIENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuaW1wb3J0ICcuL29mZmxpbmUuY3NzJztcbmltcG9ydCAnLi9jb21tb25fZGVwZW5kZW5jaWVzLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00uanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZU1vZHVsZSBmcm9tICduZ2VvL29mZmxpbmUvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24gZnJvbSAnbmdlby9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMnO1xuaW1wb3J0IE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIgZnJvbSAnbmdlby9vZmZsaW5lL1NlcnZpY2VNYW5hZ2VyLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5jbGFzcyBNYWluQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2ltcG9ydChcIm5nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyLmpzXCIpLkZlYXR1cmVPdmVybGF5TWdyfSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3JcbiAgICogbmdlbyBmZWF0dXJlIG92ZXJsYXkgbWFuYWdlciBzZXJ2aWNlLlxuICAgKiBAcGFyYW0ge2ltcG9ydChcIm5nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzXCIpLmRlZmF1bHR9IG5nZW9OZXR3b3JrU3RhdHVzIG5nZW8gbmV0d29yayBzdGF0dXMgc2VydmljZS5cbiAgICogQHBhcmFtIHtOZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyfSBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIG5nZW8gb2ZmbGluZSBzZXJ2aWNlLlxuICAgKiBAbmdJbmplY3RcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5nZW9GZWF0dXJlT3ZlcmxheU1nciwgbmdlb05ldHdvcmtTdGF0dXMsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIpIHtcbiAgICAvKipcbiAgICAgKiBTYXZlIGEgc3F1YXJlIG9mIDEwIGttIHNpZGV3YXlzIChNYXAncyB1bml0IGlzIHRoZSBtZXRlcikuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZXhwb3J0XG4gICAgICovXG4gICAgdGhpcy5vZmZsaW5lRXh0ZW50U2l6ZSA9IDEwMDAwO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge25nZW9OZXR3b3JrU3RhdHVzfVxuICAgICAqIEBleHBvcnRcbiAgICAgKi9cbiAgICB0aGlzLm5nZW9OZXR3b3JrU3RhdHVzID0gbmdlb05ldHdvcmtTdGF0dXM7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7b2xNYXB9XG4gICAgICogQGV4cG9ydFxuICAgICAqL1xuICAgIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICAgIGxheWVyczogW1xuICAgICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgICBjZW50ZXI6IFszNTIzNzksIDUxNzI3MzNdLFxuICAgICAgICB6b29tOiA0LFxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG5cbiAgICBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLnNldFNhdmVTZXJ2aWNlKCdvZmZsaW5lRG93bmxvYWRlcicpO1xuICAgIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIuc2V0UmVzdG9yZVNlcnZpY2UoJ25nZW9PZmZsaW5lUmVzdG9yZXInKTtcbiAgfVxufVxuXG4vKiogQHR5cGUgeyFhbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIG5nZW9NYXBNb2R1bGUubmFtZSxcbiAgbmdlb09mZmxpbmVNb2R1bGUubmFtZSxcbiAgTmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5tb2R1bGUubmFtZSxcbl0pO1xuXG5teU1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZXN0VXJsJywgJy4uLy4uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sJyk7XG5cbi8vIERlZmluZSB0aGUgb2ZmbGluZSBkb3dubG9hZCBjb25maWd1cmF0aW9uIHNlcnZpY2Vcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lQ29uZmlndXJhdGlvbicsIG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbik7XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuXG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1RpbGVzUHJlbG9hZGluZ0xpbWl0JywgMCk7XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5Db250cm9sbGVyO1xuIiwidmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyKCkge1xuICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmN1cnJlbnRJZF8gPSAwO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbi5hcHBseSh0aGlzLCBbJ3NldEl0ZW0nXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydnZXRJdGVtJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24oJ2NsZWFyJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydjb25maWcnXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVBY3Rpb24oY29tbWFuZCkge1xuICAgIHZhciBpZCA9ICsrdGhpcy5jdXJyZW50SWRfO1xuXG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgIHBsdWdpbjogJ2xvY2FsZm9yYWdlJyxcbiAgICAgIGNvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICBhcmdzOiBhcmdzLFxuICAgICAgaWQ6IGlkLFxuICAgICAgY29udGV4dDogbnVsbFxuICAgIH07XG4gICAgdmFyIHdhaXRpbmdQcm9taXNlID0ge1xuICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZShfYW55KSB7fSxcbiAgICAgIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KF9hbnkpIHt9XG4gICAgfTtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgd2FpdGluZ1Byb21pc2UucmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXy5zZXQoaWQsIHdhaXRpbmdQcm9taXNlKTtcbiAgICB0aGlzLnBvc3RUb0JhY2tlbmQoYWN0aW9uKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcblxuICBfcHJvdG8ucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiByZWNlaXZlTWVzc2FnZShldmVudCkge1xuICAgIHZhciBhY3Rpb24gPSBldmVudC5kYXRhO1xuICAgIHZhciBpZCA9IGFjdGlvbi5pZDtcbiAgICB2YXIgY29tbWFuZCA9IGFjdGlvbi5jb21tYW5kO1xuICAgIHZhciBhcmdzID0gYWN0aW9uLmFyZ3MgfHwgW107XG4gICAgdmFyIGNvbnRleHQgPSBhY3Rpb24uY29udGV4dDtcbiAgICB2YXIgbXNnID0gYWN0aW9uLm1zZztcbiAgICB2YXIgd2FpdGluZ1Byb21pc2UgPSB0aGlzLndhaXRpbmdQcm9taXNlc18uZ2V0KGlkKTtcblxuICAgIGlmIChjb21tYW5kID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYXJncywgY29udGV4dCk7XG5cbiAgICAgIGlmICh3YWl0aW5nUHJvbWlzZSkge1xuICAgICAgICB3YWl0aW5nUHJvbWlzZS5yZWplY3QoYXJncywgY29udGV4dCk7XG4gICAgICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3Jlc3BvbnNlJykge1xuICAgICAgd2FpdGluZ1Byb21pc2UucmVzb2x2ZS5hcHBseSh3YWl0aW5nUHJvbWlzZSwgYXJncyk7XG4gICAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uZGVsZXRlKGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIGNvbW1hbmQnLCBKU09OLnN0cmluZ2lmeShhY3Rpb24sIG51bGwsICdcXHQnKSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHt9O1xuXG4gIHJldHVybiBBYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlcjtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuaW1wb3J0IG9sT2JzZXJ2YWJsZSBmcm9tICdvbC9PYnNlcnZhYmxlLmpzJztcbmltcG9ydCBvbExheWVyTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXIuanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UuanMnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2ouanMnO1xuaW1wb3J0IHsgZGVmYXVsdEltYWdlTG9hZEZ1bmN0aW9uIH0gZnJvbSAnb2wvc291cmNlL0ltYWdlLmpzJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TLmpzJztcbmltcG9ydCB7IGNyZWF0ZUZvclByb2plY3Rpb24gYXMgY3JlYXRlVGlsZUdyaWRGb3JQcm9qZWN0aW9uIH0gZnJvbSAnb2wvdGlsZWdyaWQuanMnO1xuaW1wb3J0IFNlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIgZnJvbSAnbmdlby9vZmZsaW5lL1NlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIuanMnO1xuaW1wb3J0IExvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMnO1xuaW1wb3J0IExvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXIuanMnO1xuaW1wb3J0IExvY2FsZm9yYWdlSW9zV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzJztcbmltcG9ydCBuZ2VvQ3VzdG9tRXZlbnQgZnJvbSAnbmdlby9DdXN0b21FdmVudC5qcyc7XG5pbXBvcnQgeyBub3JtYWxpemVVUkwsIHRyYXZlcnNlTGF5ZXIgfSBmcm9tICduZ2VvL29mZmxpbmUvdXRpbHMuanMnO1xuaW1wb3J0IGxvY2FsZm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlL3NyYy9sb2NhbGZvcmFnZS5qcyc7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIChfb2xPYnNlcnZhYmxlKSB7XG4gIF9kZWZhdWx0LiRpbmplY3QgPSBbXCIkcm9vdFNjb3BlXCIsIFwibmdlb0JhY2tncm91bmRMYXllck1nclwiLCBcIm5nZW9PZmZsaW5lR3V0dGVyXCJdO1xuXG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfb2xPYnNlcnZhYmxlKTtcblxuICBmdW5jdGlvbiBfZGVmYXVsdCgkcm9vdFNjb3BlLCBuZ2VvQmFja2dyb3VuZExheWVyTWdyLCBuZ2VvT2ZmbGluZUd1dHRlcikge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX29sT2JzZXJ2YWJsZS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMubG9jYWxmb3JhZ2VfID0gX3RoaXMuY3JlYXRlTG9jYWxmb3JhZ2UoKTtcblxuICAgIF90aGlzLmNvbmZpZ3VyZUxvY2FsZm9yYWdlKCk7XG5cbiAgICBfdGhpcy5yb290U2NvcGVfID0gJHJvb3RTY29wZTtcbiAgICBfdGhpcy5oYXNEYXRhID0gZmFsc2U7XG5cbiAgICBfdGhpcy5pbml0aWFsaXplSGFzT2ZmbGluZURhdGEoKTtcblxuICAgIF90aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfID0gbmdlb0JhY2tncm91bmRMYXllck1ncjtcbiAgICBfdGhpcy5zZXJEZXNfID0gbmV3IFNlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIoe1xuICAgICAgZ3V0dGVyOiBuZ2VvT2ZmbGluZUd1dHRlclxuICAgIH0pO1xuICAgIF90aGlzLmd1dHRlcl8gPSBuZ2VvT2ZmbGluZUd1dHRlcjtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuXG4gIF9wcm90by5kaXNwYXRjaFByb2dyZXNzXyA9IGZ1bmN0aW9uIGRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ3Byb2dyZXNzJywge1xuICAgICAgJ3Byb2dyZXNzJzogcHJvZ3Jlc3NcbiAgICB9KSk7XG4gIH07XG5cbiAgX3Byb3RvLmluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIGluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHRoaXMuZ2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JykudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBfdGhpczIuc2V0SGFzT2ZmbGluZURhdGEoISF2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gaGFzT2ZmbGluZURhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzRGF0YTtcbiAgfTtcblxuICBfcHJvdG8uc2V0SGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBzZXRIYXNPZmZsaW5lRGF0YSh2YWx1ZSkge1xuICAgIHZhciBuZWVkRGlnZXN0ID0gdmFsdWUgIT09IHRoaXMuaGFzRGF0YTtcbiAgICB0aGlzLmhhc0RhdGEgPSB2YWx1ZTtcblxuICAgIGlmIChuZWVkRGlnZXN0KSB7XG4gICAgICB0aGlzLnJvb3RTY29wZV8uJGFwcGx5QXN5bmMoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnRyYWNlR2V0U2V0SXRlbSA9IGZ1bmN0aW9uIHRyYWNlR2V0U2V0SXRlbShtc2csIGtleSwgcHJvbWlzZSkge1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVMb2NhbGZvcmFnZSA9IGZ1bmN0aW9uIGNyZWF0ZUxvY2FsZm9yYWdlKCkge1xuICAgIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWNvcmRvdmEnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGNvcmRvdmEgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlcigpO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1hbmRyb2lkJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBhbmRyb2lkIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9aW9zJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBpb3MgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VJb3NXcmFwcGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsZm9yYWdlO1xuICB9O1xuXG4gIF9wcm90by5jb25maWd1cmVMb2NhbGZvcmFnZSA9IGZ1bmN0aW9uIGNvbmZpZ3VyZUxvY2FsZm9yYWdlKCkge1xuICAgIHRoaXMubG9jYWxmb3JhZ2VfLmNvbmZpZyh7XG4gICAgICAnbmFtZSc6ICduZ2VvT2ZmbGluZVN0b3JhZ2UnLFxuICAgICAgJ3ZlcnNpb24nOiAxLjAsXG4gICAgICAnc3RvcmVOYW1lJzogJ29mZmxpbmVTdG9yYWdlJ1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbShrZXkpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydnZXRJdGVtJ10oa2V5KTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ2dldEl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXkpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydyZW1vdmVJdGVtJ10oa2V5KTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3JlbW92ZUl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuXG4gIF9wcm90by5zZXRJdGVtID0gZnVuY3Rpb24gc2V0SXRlbShrZXksIHZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlX1snc2V0SXRlbSddKGtleSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnc2V0SXRlbScsIGtleSwgcHJvbWlzZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5zZXRIYXNPZmZsaW5lRGF0YShmYWxzZSk7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlXy5jbGVhcigpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnY2xlYXInLCAnJywgcHJvbWlzZSk7XG4gIH07XG5cbiAgX3Byb3RvLmVzdGltYXRlTG9hZERhdGFTaXplID0gZnVuY3Rpb24gZXN0aW1hdGVMb2FkRGF0YVNpemUobWFwKSB7XG4gICAgcmV0dXJuIDUwO1xuICB9O1xuXG4gIF9wcm90by5nZXRMYXllcktleSA9IGZ1bmN0aW9uIGdldExheWVyS2V5KGxheWVySXRlbSkge1xuICAgIHJldHVybiBsYXllckl0ZW0ubGF5ZXIuZ2V0KCdsYWJlbCcpO1xuICB9O1xuXG4gIF9wcm90by5vblRpbGVEb3dubG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZFN1Y2Nlc3MocHJvZ3Jlc3MsIHRpbGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcblxuICAgIGlmICh0aWxlLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRJdGVtKG5vcm1hbGl6ZVVSTCh0aWxlLnVybCksIHRpbGUucmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBfcHJvdG8ub25UaWxlRG93bmxvYWRFcnJvciA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkRXJyb3IocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEV4dGVudEJ5Wm9vbSA9IGZ1bmN0aW9uIGdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgY3VycmVudFpvb20gPSBtYXAuZ2V0VmlldygpLmdldFpvb20oKTtcblxuICAgIGlmIChjdXJyZW50Wm9vbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY3VycmVudFpvb20nKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIFswLCAxLCAyLCAzLCA0XS5mb3JFYWNoKGZ1bmN0aW9uIChkeikge1xuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgem9vbTogY3VycmVudFpvb20gKyBkeixcbiAgICAgICAgZXh0ZW50OiB1c2VyRXh0ZW50XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBfcHJvdG8uc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMgPSBmdW5jdGlvbiBzb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyhzb3VyY2UsIHByb2plY3Rpb24pIHtcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VJbWFnZVdNUyAmJiBzb3VyY2UuZ2V0VXJsKCkgJiYgc291cmNlLmdldEltYWdlTG9hZEZ1bmN0aW9uKCkgPT09IGRlZmF1bHRJbWFnZUxvYWRGdW5jdGlvbikge1xuICAgICAgdmFyIHRpbGVHcmlkID0gY3JlYXRlVGlsZUdyaWRGb3JQcm9qZWN0aW9uKHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkgfHwgcHJvamVjdGlvbiwgNDIsIDI1Nik7XG4gICAgICB2YXIgYXR0cmlidXRpb25zID0gc291cmNlLmdldEF0dHJpYnV0aW9ucygpIHx8ICcnO1xuICAgICAgdmFyIHVybCA9IHNvdXJjZS5nZXRVcmwoKTtcblxuICAgICAgaWYgKCF1cmwgfHwgIWF0dHJpYnV0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWVzJyk7XG4gICAgICB9XG5cbiAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZVRpbGVXTVMoe1xuICAgICAgICBndXR0ZXI6IHRoaXMuZ3V0dGVyXyxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHRpbGVHcmlkOiB0aWxlR3JpZCxcbiAgICAgICAgYXR0cmlidXRpb25zOiBhdHRyaWJ1dGlvbnMsXG4gICAgICAgIHByb2plY3Rpb246IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCksXG4gICAgICAgIHBhcmFtczogc291cmNlLmdldFBhcmFtcygpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVMYXllck1ldGFkYXRhcyA9IGZ1bmN0aW9uIGNyZWF0ZUxheWVyTWV0YWRhdGFzKG1hcCwgdXNlckV4dGVudCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGxheWVyc0l0ZW1zID0gW107XG5cbiAgICB2YXIgdmlzaXRMYXllciA9IGZ1bmN0aW9uIHZpc2l0TGF5ZXIobGF5ZXIsIGFuY2VzdG9ycykge1xuICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllckxheWVyKSB7XG4gICAgICAgIHZhciBleHRlbnRCeVpvb20gPSBfdGhpczMuZ2V0RXh0ZW50Qnlab29tKG1hcCwgbGF5ZXIsIGFuY2VzdG9ycywgdXNlckV4dGVudCk7XG5cbiAgICAgICAgdmFyIHByb2plY3Rpb24gPSBvbFByb2ouZ2V0KG1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpKTtcblxuICAgICAgICB2YXIgc291cmNlID0gX3RoaXMzLnNvdXJjZUltYWdlV01TVG9UaWxlV01TKGxheWVyLmdldFNvdXJjZSgpLCBwcm9qZWN0aW9uKTtcblxuICAgICAgICB2YXIgbGF5ZXJUeXBlO1xuICAgICAgICB2YXIgbGF5ZXJTZXJpYWxpemF0aW9uO1xuXG4gICAgICAgIGlmIChsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJUaWxlIHx8IGxheWVyIGluc3RhbmNlb2Ygb2xMYXllckltYWdlKSB7XG4gICAgICAgICAgbGF5ZXJUeXBlID0gJ3RpbGUnO1xuICAgICAgICAgIGxheWVyU2VyaWFsaXphdGlvbiA9IF90aGlzMy5zZXJEZXNfLnNlcmlhbGl6ZVRpbGVMYXllcihsYXllciwgc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJWZWN0b3IpIHtcbiAgICAgICAgICBsYXllclR5cGUgPSAndmVjdG9yJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBiYWNrZ3JvdW5kTGF5ZXIgPSBfdGhpczMubmdlb0JhY2tncm91bmRMYXllck1ncl8uZ2V0KG1hcCkgPT09IGxheWVyO1xuICAgICAgICBsYXllcnNJdGVtcy5wdXNoKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IGJhY2tncm91bmRMYXllcixcbiAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICBleHRlbnRCeVpvb206IGV4dGVudEJ5Wm9vbSxcbiAgICAgICAgICBsYXllclR5cGU6IGxheWVyVHlwZSxcbiAgICAgICAgICBsYXllclNlcmlhbGl6YXRpb246IGxheWVyU2VyaWFsaXphdGlvbixcbiAgICAgICAgICBsYXllcjogbGF5ZXIsXG4gICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgYW5jZXN0b3JzOiBhbmNlc3RvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBtYXAuZ2V0TGF5ZXJzKCkuZm9yRWFjaChmdW5jdGlvbiAocm9vdCkge1xuICAgICAgdHJhdmVyc2VMYXllcihyb290LCBbXSwgdmlzaXRMYXllcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxheWVyc0l0ZW1zO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyA9IGZ1bmN0aW9uIGNyZWF0ZVRpbGVMb2FkRnVuY3Rpb25fKG9mZmxpbmVMYXllcikge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgdmFyIHRpbGVMb2FkRnVuY3Rpb24gPSBmdW5jdGlvbiB0aWxlTG9hZEZ1bmN0aW9uKGltYWdlVGlsZSwgc3JjKSB7XG4gICAgICBfdGhpczQuZ2V0SXRlbShub3JtYWxpemVVUkwoc3JjKSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICBjb250ZW50ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFDMGxFUVZSNDJtTmtZQUFBQUFZQUFqQ0IwQzhBQUFBQVNVVk9SSzVDWUlJPSc7XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZVRpbGUuZ2V0SW1hZ2UoKS5zcmMgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aWxlTG9hZEZ1bmN0aW9uO1xuICB9O1xuXG4gIF9wcm90by5yZWNyZWF0ZU9mZmxpbmVMYXllciA9IGZ1bmN0aW9uIHJlY3JlYXRlT2ZmbGluZUxheWVyKG9mZmxpbmVMYXllcikge1xuICAgIGlmIChvZmZsaW5lTGF5ZXIubGF5ZXJUeXBlID09PSAndGlsZScpIHtcbiAgICAgIHZhciBzZXJpYWxpemF0aW9uID0gb2ZmbGluZUxheWVyLmxheWVyU2VyaWFsaXphdGlvbjtcblxuICAgICAgaWYgKHNlcmlhbGl6YXRpb24pIHtcbiAgICAgICAgdmFyIHRpbGVMb2FkRnVuY3Rpb24gPSB0aGlzLmNyZWF0ZVRpbGVMb2FkRnVuY3Rpb25fKG9mZmxpbmVMYXllcik7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuc2VyRGVzXy5kZXNlcmlhbGl6ZVRpbGVMYXllcihzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIF9wcm90by5nZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzID0gZnVuY3Rpb24gZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpIHtcbiAgICByZXR1cm4gMTE7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShvbE9ic2VydmFibGUpO1xuXG5leHBvcnQgeyBfZGVmYXVsdCBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgcmV0dXJuIGl0Lm5leHQuYmluZChpdCk7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMuanMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcbmltcG9ydCBUaWxlc0Rvd25sb2FkZXIgZnJvbSAnbmdlby9vZmZsaW5lL1RpbGVzRG93bmxvYWRlci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuZnVuY3Rpb24gbWFnbml0dWRlMihhLCBiKSB7XG4gIHZhciBtYWduaXR1ZGVTcXVhcmVkID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICBtYWduaXR1ZGVTcXVhcmVkICs9IE1hdGgucG93KGFbaV0gLSBiW2ldLCAyKTtcbiAgfVxuXG4gIHJldHVybiBtYWduaXR1ZGVTcXVhcmVkO1xufVxuXG52YXIgRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgRG93bmxvYWRlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCJdO1xuXG4gIGZ1bmN0aW9uIERvd25sb2FkZXIobmdlb09mZmxpbmVDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLnRpbGVEb3dubG9hZGVyXyA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gRG93bmxvYWRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGhpcy50aWxlRG93bmxvYWRlcl8pIHtcbiAgICAgIHRoaXMudGlsZURvd25sb2FkZXJfLmNhbmNlbCgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucXVldWVMYXllclRpbGVzXyA9IGZ1bmN0aW9uIHF1ZXVlTGF5ZXJUaWxlc18obGF5ZXJNZXRhZGF0YSwgcXVldWUpIHtcbiAgICB2YXIgc291cmNlID0gbGF5ZXJNZXRhZGF0YS5zb3VyY2U7XG4gICAgdmFyIG1hcCA9IGxheWVyTWV0YWRhdGEubWFwLFxuICAgICAgICBleHRlbnRCeVpvb20gPSBsYXllck1ldGFkYXRhLmV4dGVudEJ5Wm9vbTtcblxuICAgIGlmICghc291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5hc3NlcnQoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VUaWxlV01TIHx8IHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlV01UUyk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBtYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICB2YXIgdGlsZUdyaWQgPSBzb3VyY2UuZ2V0VGlsZUdyaWQoKTtcbiAgICB2YXIgdGlsZVVybEZ1bmN0aW9uID0gc291cmNlLmdldFRpbGVVcmxGdW5jdGlvbigpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KGV4dGVudEJ5Wm9vbSk7XG5cbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgIHZhciBleHRlbnRab29tID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgeiA9IGV4dGVudFpvb20uem9vbTtcbiAgICAgIHZhciBleHRlbnQgPSBleHRlbnRab29tLmV4dGVudDtcbiAgICAgIHZhciBxdWV1ZUJ5WiA9IFtdO1xuICAgICAgdmFyIG1pblggPSB2b2lkIDA7XG4gICAgICB2YXIgbWluWSA9IHZvaWQgMDtcbiAgICAgIHZhciBtYXhYID0gdm9pZCAwO1xuICAgICAgdmFyIG1heFkgPSB2b2lkIDA7XG4gICAgICB0aWxlR3JpZC5mb3JFYWNoVGlsZUNvb3JkKGV4dGVudCwgeiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIG1heFggPSBjb29yZFsxXTtcbiAgICAgICAgbWF4WSA9IGNvb3JkWzJdO1xuXG4gICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQgfHwgbWluWSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbWluWCA9IGNvb3JkWzFdO1xuICAgICAgICAgIG1pblkgPSBjb29yZFsyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cmwgPSB0aWxlVXJsRnVuY3Rpb24oY29vcmQsIERFVklDRV9QSVhFTF9SQVRJTywgcHJvamVjdGlvbik7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVybCk7XG5cbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgIHZhciB0aWxlID0ge1xuICAgICAgICAgICAgY29vcmQ6IGNvb3JkLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICByZXNwb25zZTogbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgICAgcXVldWVCeVoucHVzaCh0aWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgY2VudGVyVGlsZUNvb3JkID0gW3osIChtaW5YICsgbWF4WCkgLyAyLCAobWluWSArIG1heFkpIC8gMl07XG4gICAgICBxdWV1ZUJ5Wi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBtYWduaXR1ZGUyKGEuY29vcmQsIGNlbnRlclRpbGVDb29yZCkgLSBtYWduaXR1ZGUyKGIuY29vcmQsIGNlbnRlclRpbGVDb29yZCk7XG4gICAgICB9KTtcbiAgICAgIHF1ZXVlLnB1c2guYXBwbHkocXVldWUsIHF1ZXVlQnlaKTtcbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShleHRlbnRCeVpvb20pLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgX2xvb3AoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnNhdmUgPSBmdW5jdGlvbiBzYXZlKGV4dGVudCwgbWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBsYXllcnNNZXRhZGF0YXMgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLmNyZWF0ZUxheWVyTWV0YWRhdGFzKG1hcCwgZXh0ZW50KTtcbiAgICB2YXIgcGVyc2lzdGVudExheWVycyA9IFtdO1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciB6b29tcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobGF5ZXJzTWV0YWRhdGFzKSwgX3N0ZXAyOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIoKSkuZG9uZTspIHtcbiAgICAgIHZhciBsYXllckl0ZW0gPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIGlmIChsYXllckl0ZW0ubGF5ZXJUeXBlID09PSAndGlsZScpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gW107XG4gICAgICAgIHRoaXMucXVldWVMYXllclRpbGVzXyhsYXllckl0ZW0sIHRpbGVzKTtcbiAgICAgICAgcXVldWUucHVzaC5hcHBseShxdWV1ZSwgdGlsZXMpO1xuICAgICAgfVxuXG4gICAgICBwZXJzaXN0ZW50TGF5ZXJzLnB1c2goe1xuICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IGxheWVySXRlbS5iYWNrZ3JvdW5kTGF5ZXIsXG4gICAgICAgIGxheWVyVHlwZTogbGF5ZXJJdGVtLmxheWVyVHlwZSxcbiAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uOiBsYXllckl0ZW0ubGF5ZXJTZXJpYWxpemF0aW9uLFxuICAgICAgICBrZXk6IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TGF5ZXJLZXkobGF5ZXJJdGVtKVxuICAgICAgfSk7XG4gICAgICBsYXllckl0ZW0uZXh0ZW50Qnlab29tLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgem9vbSA9IG9iai56b29tO1xuXG4gICAgICAgIGlmICghem9vbXMuaW5jbHVkZXMoem9vbSkpIHtcbiAgICAgICAgICB6b29tcy5wdXNoKHpvb20pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgcGVyc2lzdGVudE9iamVjdCA9IHtcbiAgICAgIGV4dGVudDogZXh0ZW50LFxuICAgICAgbGF5ZXJzOiBwZXJzaXN0ZW50TGF5ZXJzLFxuICAgICAgem9vbXM6IHpvb21zLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiAxO1xuICAgICAgfSlcbiAgICB9O1xuICAgIHZhciBzZXRPZmZsaW5lQ29udGVudFByb21pc2UgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLnNldEl0ZW0oJ29mZmxpbmVfY29udGVudCcsIHBlcnNpc3RlbnRPYmplY3QpO1xuICAgIHZhciBtYXhEb3dubG9hZHMgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLmdldE1heE51bWJlck9mUGFyYWxsZWxEb3dubG9hZHMoKTtcbiAgICB0aGlzLnRpbGVEb3dubG9hZGVyXyA9IG5ldyBUaWxlc0Rvd25sb2FkZXIocXVldWUsIHRoaXMuY29uZmlndXJhdGlvbl8sIG1heERvd25sb2Fkcyk7XG4gICAgdmFyIHRpbGVEb3dubG9hZFByb21pc2UgPSB0aGlzLnRpbGVEb3dubG9hZGVyXy5kb3dubG9hZCgpO1xuICAgIHZhciBhbGxQcm9taXNlID0gUHJvbWlzZS5hbGwoW3NldE9mZmxpbmVDb250ZW50UHJvbWlzZSwgdGlsZURvd25sb2FkUHJvbWlzZV0pO1xuXG4gICAgdmFyIHNldEhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gc2V0SGFzT2ZmbGluZURhdGEoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuY29uZmlndXJhdGlvbl8uc2V0SGFzT2ZmbGluZURhdGEodHJ1ZSk7XG4gICAgfTtcblxuICAgIGFsbFByb21pc2UudGhlbihzZXRIYXNPZmZsaW5lRGF0YSwgc2V0SGFzT2ZmbGluZURhdGEpO1xuICAgIHJldHVybiBhbGxQcm9taXNlO1xuICB9O1xuXG4gIHJldHVybiBEb3dubG9hZGVyO1xufSgpO1xuXG52YXIgbmFtZSA9ICdvZmZsaW5lRG93bmxvYWRlcic7XG5Eb3dubG9hZGVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtdKS5zZXJ2aWNlKG5hbWUsIERvd25sb2FkZXIpO1xudmFyIGV4cG9ydHMgPSBEb3dubG9hZGVyO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzJztcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoX0Fic3RyYWN0V3JhcHBlcikge1xuICBfaW5oZXJpdHNMb29zZShBbmRyb2lkV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG5cbiAgZnVuY3Rpb24gQW5kcm9pZFdyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuYW5kcm9pZFdyYXBwZXIgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQW5kcm9pZFdyYXBwZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShhY3Rpb24pO1xuICAgIHdpbmRvdy5uZ2VvSG9zdC5wb3N0TWVzc2FnZVRvQW5kcm9pZChzdHJpbmdpZmllZCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlY2VpdmVGcm9tQW5kcm9pZCA9IGZ1bmN0aW9uIHJlY2VpdmVGcm9tQW5kcm9pZChhY3Rpb25TdHJpbmcpIHtcbiAgICB2YXIgYWN0aW9uID0gSlNPTi5wYXJzZShhY3Rpb25TdHJpbmcpO1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgJ2RhdGEnOiBhY3Rpb25cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQW5kcm9pZFdyYXBwZXI7XG59KEFic3RyYWN0V3JhcHBlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5pbXBvcnQgQWJzdHJhY3RXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9BYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlci5qcyc7XG5cbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoQ29yZG92YVdyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuXG4gIGZ1bmN0aW9uIENvcmRvdmFXcmFwcGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX0Fic3RyYWN0V3JhcHBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfdGhpcy5yZWNlaXZlTWVzc2FnZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSwgZmFsc2UpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDb3Jkb3ZhV3JhcHBlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge1xuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoYWN0aW9uLCAnKicpO1xuICB9O1xuXG4gIHJldHVybiBDb3Jkb3ZhV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzJztcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoX0Fic3RyYWN0V3JhcHBlcikge1xuICBfaW5oZXJpdHNMb29zZShJb3NXcmFwcGVyLCBfQWJzdHJhY3RXcmFwcGVyKTtcblxuICBmdW5jdGlvbiBJb3NXcmFwcGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX0Fic3RyYWN0V3JhcHBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgd2luZG93Lmlvc1dyYXBwZXIgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gSW9zV3JhcHBlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24uY29tbWFuZCA9PT0gJ3NldEl0ZW0nKSB7XG4gICAgICBhY3Rpb24uYXJnc1sxXSA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbi5hcmdzWzFdKTtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShhY3Rpb24pO1xuICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmlvcy5wb3N0TWVzc2FnZShzdHJpbmdpZmllZCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlY2VpdmVGcm9tSW9zID0gZnVuY3Rpb24gcmVjZWl2ZUZyb21Jb3MoYWN0aW9uU3RyaW5nKSB7XG4gICAgdmFyIGFjdGlvbiA9IEpTT04ucGFyc2UoYWN0aW9uU3RyaW5nKTtcbiAgICB2YXIgYXJncyA9IGFjdGlvblsnYXJncyddIHx8IFtdO1xuICAgIGFjdGlvblsnYXJncyddID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgJ2RhdGEnOiBhY3Rpb25cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gSW9zV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuaW1wb3J0IExheWVyIGZyb20gJ29sL2xheWVyL0xheWVyLmpzJztcbmltcG9ydCB7IGNyZWF0ZUNhbnZhc0NvbnRleHQyRCB9IGZyb20gJ29sL2RvbS5qcyc7XG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMuanMnO1xuXG52YXIgTWFzayA9IGZ1bmN0aW9uIChfTGF5ZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWFzaywgX0xheWVyKTtcblxuICBmdW5jdGlvbiBNYXNrKGxheWVyT3B0aW9ucywgbWFza09wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAobGF5ZXJPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIGxheWVyT3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmIChtYXNrT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBtYXNrT3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIF90aGlzID0gX0xheWVyLmNhbGwodGhpcywgbGF5ZXJPcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmNvbnRleHRfID0gY3JlYXRlQ2FudmFzQ29udGV4dDJEKCk7XG4gICAgX3RoaXMuY29udGV4dF8uY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICBfdGhpcy5jb250ZXh0Xy5jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIF90aGlzLm1hcmdpbl8gPSBtYXNrT3B0aW9ucy5tYXJnaW4gfHwgMTAwO1xuICAgIF90aGlzLmV4dGVudEluTWV0ZXJzXyA9IG1hc2tPcHRpb25zLmV4dGVudEluTWV0ZXJzIHx8IDA7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1hc2sucHJvdG90eXBlO1xuXG4gIF9wcm90by5jcmVhdGVFeHRlbnQgPSBmdW5jdGlvbiBjcmVhdGVFeHRlbnQoY2VudGVyLCBoYWxmTGVuZ3RoKSB7XG4gICAgdmFyIG1pbnggPSBjZW50ZXJbMF0gLSBoYWxmTGVuZ3RoO1xuICAgIHZhciBtaW55ID0gY2VudGVyWzFdIC0gaGFsZkxlbmd0aDtcbiAgICB2YXIgbWF4eCA9IGNlbnRlclswXSArIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1heHkgPSBjZW50ZXJbMV0gKyBoYWxmTGVuZ3RoO1xuICAgIHJldHVybiBbbWlueCwgbWlueSwgbWF4eCwgbWF4eV07XG4gIH07XG5cbiAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihmcmFtZVN0YXRlKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHRfO1xuICAgIHZhciBjd2lkdGggPSBmcmFtZVN0YXRlLnNpemVbMF07XG4gICAgY29udGV4dC5jYW52YXMud2lkdGggPSBjd2lkdGg7XG4gICAgdmFyIGNoZWlnaHQgPSBmcmFtZVN0YXRlLnNpemVbMV07XG4gICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gY2hlaWdodDtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKDAsIDApO1xuICAgIGNvbnRleHQubGluZVRvKGN3aWR0aCwgMCk7XG4gICAgY29udGV4dC5saW5lVG8oY3dpZHRoLCBjaGVpZ2h0KTtcbiAgICBjb250ZXh0LmxpbmVUbygwLCBjaGVpZ2h0KTtcbiAgICBjb250ZXh0LmxpbmVUbygwLCAwKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHZhciBleHRlbnRMZW5ndGggPSBNYXRoLm1pbihjd2lkdGgsIGNoZWlnaHQpIC0gdGhpcy5tYXJnaW5fICogMjtcblxuICAgIGlmICh0aGlzLmV4dGVudEluTWV0ZXJzXykge1xuICAgICAgZXh0ZW50TGVuZ3RoID0gREVWSUNFX1BJWEVMX1JBVElPICogdGhpcy5leHRlbnRJbk1ldGVyc18gLyBmcmFtZVN0YXRlLnZpZXdTdGF0ZS5yZXNvbHV0aW9uO1xuICAgIH1cblxuICAgIHZhciBleHRlbnQgPSB0aGlzLmNyZWF0ZUV4dGVudChbY3dpZHRoIC8gMiwgY2hlaWdodCAvIDJdLCBNYXRoLmNlaWwoZXh0ZW50TGVuZ3RoIC8gMikpO1xuICAgIGNvbnRleHQubW92ZVRvKGV4dGVudFswXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFszXSk7XG4gICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbM10pO1xuICAgIGNvbnRleHQubGluZVRvKGV4dGVudFsyXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFsxXSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDUsIDI1LCAwLjUpJztcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICByZXR1cm4gY29udGV4dC5jYW52YXM7XG4gIH07XG5cbiAgcmV0dXJuIE1hc2s7XG59KExheWVyKTtcblxuZXhwb3J0IHsgTWFzayBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICBNb2RlLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIl07XG5cbiAgZnVuY3Rpb24gTW9kZShuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5jb21wb25lbnRfID0gbnVsbDtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTW9kZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmlzRW5hYmxlZCA9IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkXztcbiAgfTtcblxuICBfcHJvdG8uZW5hYmxlID0gZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgIHRoaXMuZW5hYmxlZF8gPSB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5yZWdpc3RlckNvbXBvbmVudCA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIHRoaXMuY29tcG9uZW50XyA9IGNvbXBvbmVudDtcbiAgfTtcblxuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbXBvbmVudCBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cblxuICAgIHRoaXMuY29tcG9uZW50Xy5hY3RpdmF0ZU9mZmxpbmVNb2RlKCk7XG4gIH07XG5cbiAgX3Byb3RvLmhhc0RhdGEgPSBmdW5jdGlvbiBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uaGFzT2ZmbGluZURhdGEoKTtcbiAgfTtcblxuICByZXR1cm4gTW9kZTtcbn0oKTtcblxudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lTW9kZScsIFtdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lTW9kZScsIE1vZGUpO1xuTW9kZS5tb2R1bGUgPSBteU1vZHVsZTtcbmV4cG9ydCBkZWZhdWx0IE1vZGU7IiwiY29uZmlnRnVuY3Rpb25fLiRpbmplY3QgPSBbXCIkaHR0cFByb3ZpZGVyXCJdO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgU2VydmljZS4kaW5qZWN0ID0gW1wiJGRvY3VtZW50XCIsIFwiJHdpbmRvd1wiLCBcIiR0aW1lb3V0XCIsIFwiJHJvb3RTY29wZVwiLCBcIm5nZW9PZmZsaW5lVGVzdFVybFwiXTtcblxuICBmdW5jdGlvbiBTZXJ2aWNlKCRkb2N1bWVudCwgJHdpbmRvdywgJHRpbWVvdXQsICRyb290U2NvcGUsIG5nZW9PZmZsaW5lVGVzdFVybCkge1xuICAgIHRoaXMuJGRvY3VtZW50XyA9ICRkb2N1bWVudDtcbiAgICB0aGlzLiR3aW5kb3dfID0gJHdpbmRvdztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyA9IG5nZW9PZmZsaW5lVGVzdFVybDtcbiAgICB0aGlzLmNvdW50XyA9IDA7XG4gICAgdGhpcy5vZmZsaW5lXztcbiAgICB0aGlzLnByb21pc2VfO1xuICAgIHRoaXMuaW5pdGlhbGl6ZV8oKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdGlhbGl6ZV8gPSBmdW5jdGlvbiBpbml0aWFsaXplXygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5vZmZsaW5lXyA9ICF0aGlzLiR3aW5kb3dfLm5hdmlnYXRvci5vbkxpbmU7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLiR3aW5kb3dfLmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNoZWNrKHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy4kZG9jdW1lbnRfLmFqYXhFcnJvcikge1xuICAgICAgdmFyIG9uQWpheEVycm9yID0gZnVuY3Rpb24gb25BamF4RXJyb3IoZXZ0LCBqcXhociwgc2V0dGluZ3MsIHRocm93bkVycm9yKSB7XG4gICAgICAgIGlmICghL14oY2FuY2VsZWR8YWJvcnQpJC8udGVzdCh0aHJvd25FcnJvcikpIHtcbiAgICAgICAgICBfdGhpcy5jaGVjaygyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy4kZG9jdW1lbnRfLmFqYXhFcnJvcihvbkFqYXhFcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICB0aGlzLiR0aW1lb3V0Xy5jYW5jZWwodGhpcy5wcm9taXNlXyk7XG4gICAgICB0aGlzLnByb21pc2VfID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY291bnRfKys7XG4gICAgICB0aGlzLnByb21pc2VfID0gdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmNoZWNrKCk7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogdGhpcy5uZ2VvT2ZmbGluZVRlc3RVcmxfLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8gPSAwO1xuXG4gICAgICAgIGlmIChfdGhpczIub2ZmbGluZV8pIHtcbiAgICAgICAgICBfdGhpczIudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50XyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8rKztcblxuICAgICAgICBpZiAoX3RoaXMyLmNvdW50XyA+IDIgJiYgIV90aGlzMi5vZmZsaW5lXykge1xuICAgICAgICAgIF90aGlzMi50cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8gPSBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKG9mZmxpbmUpIHtcbiAgICB0aGlzLm9mZmxpbmVfID0gb2ZmbGluZTtcbiAgICB0aGlzLiRyb290U2NvcGVfLiRkaWdlc3QoKTtcbiAgfTtcblxuICBfcHJvdG8uaXNEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbiBpc0Rpc2Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLm9mZmxpbmVfO1xuICB9O1xuXG4gIHJldHVybiBTZXJ2aWNlO1xufSgpO1xuXG52YXIgbmFtZSA9ICduZ2VvTmV0d29ya1N0YXR1cyc7XG5TZXJ2aWNlLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcblNlcnZpY2UubW9kdWxlLnNlcnZpY2UobmFtZSwgU2VydmljZSk7XG5cbnZhciBodHRwSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBodHRwSW50ZXJjZXB0b3IoJHEsIG5nZW9EZWJvdW5jZSwgbmdlb05ldHdvcmtTdGF0dXMpIHtcbiAgdmFyIGRlYm91bmNlZENoZWNrID0gbmdlb0RlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmdlb05ldHdvcmtTdGF0dXMuY2hlY2sodW5kZWZpbmVkKTtcbiAgfSwgMjAwMCwgZmFsc2UpO1xuICByZXR1cm4ge1xuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH0sXG4gICAgcmVxdWVzdEVycm9yOiBmdW5jdGlvbiByZXF1ZXN0RXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfSxcbiAgICByZXNwb25zZTogZnVuY3Rpb24gcmVzcG9uc2UoX3Jlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gX3Jlc3BvbnNlO1xuICAgIH0sXG4gICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgIGRlYm91bmNlZENoZWNrKCk7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfVxuICB9O1xufTtcblxuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuU2VydmljZS5tb2R1bGUuZmFjdG9yeSgnaHR0cEludGVyY2VwdG9yJywgaHR0cEludGVyY2VwdG9yKTtcblxuZnVuY3Rpb24gY29uZmlnRnVuY3Rpb25fKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XG59XG5cblNlcnZpY2UubW9kdWxlLmNvbmZpZyhjb25maWdGdW5jdGlvbl8pO1xudmFyIGV4cG9ydHMgPSBTZXJ2aWNlO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSBpdCA9IG9bU3ltYm9sLml0ZXJhdG9yXSgpOyByZXR1cm4gaXQubmV4dC5iaW5kKGl0KTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmltcG9ydCBuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyIGZyb20gJ25nZW8vbWFwL0JhY2tncm91bmRMYXllck1nci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIFJlc3RvcmVyID0gZnVuY3Rpb24gKCkge1xuICBSZXN0b3Jlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCIsIFwibmdlb0JhY2tncm91bmRMYXllck1nclwiXTtcblxuICBmdW5jdGlvbiBSZXN0b3JlcihuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24sIG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3IpIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICAgIHRoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJlc3RvcmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUobWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25fLmdldEl0ZW0oJ29mZmxpbmVfY29udGVudCcpLnRoZW4oZnVuY3Rpb24gKG9mZmxpbmVDb250ZW50KSB7XG4gICAgICByZXR1cm4gX3RoaXMuZG9SZXN0b3JlKG1hcCwgb2ZmbGluZUNvbnRlbnQpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5kb1Jlc3RvcmUgPSBmdW5jdGlvbiBkb1Jlc3RvcmUobWFwLCBvZmZsaW5lQ29udGVudCkge1xuICAgIG1hcC5nZXRMYXllckdyb3VwKCkuZ2V0TGF5ZXJzKCkuY2xlYXIoKTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uob2ZmbGluZUNvbnRlbnQubGF5ZXJzKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIHZhciBvZmZsaW5lTGF5ZXIgPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuY29uZmlndXJhdGlvbl8ucmVjcmVhdGVPZmZsaW5lTGF5ZXIob2ZmbGluZUxheWVyKTtcblxuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XG5cbiAgICAgICAgaWYgKG9mZmxpbmVMYXllci5iYWNrZ3JvdW5kTGF5ZXIpIHtcbiAgICAgICAgICB0aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfLnNldChtYXAsIGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZmZsaW5lQ29udGVudC5leHRlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIFJlc3RvcmVyO1xufSgpO1xuXG52YXIgbmFtZSA9ICduZ2VvT2ZmbGluZVJlc3RvcmVyJztcblJlc3RvcmVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyLm5hbWVdKS5zZXJ2aWNlKG5hbWUsIFJlc3RvcmVyKTtcbnZhciBleHBvcnRzID0gUmVzdG9yZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBPbFRpbGVncmlkVGlsZUdyaWQgZnJvbSAnb2wvdGlsZWdyaWQvVGlsZUdyaWQuanMnO1xuaW1wb3J0IE9sVGlsZWdyaWRXTVRTIGZyb20gJ29sL3RpbGVncmlkL1dNVFMuanMnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2ouanMnO1xuaW1wb3J0IE9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG5pbXBvcnQgT2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcbmltcG9ydCBPbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcblxudmFyIFNlckRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2VyRGVzKF9yZWYpIHtcbiAgICB2YXIgZ3V0dGVyID0gX3JlZi5ndXR0ZXI7XG4gICAgdGhpcy5ndXR0ZXJfID0gZ3V0dGVyO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFNlckRlcy5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNyZWF0ZUJhc2VPYmplY3RfID0gZnVuY3Rpb24gY3JlYXRlQmFzZU9iamVjdF8ob2xPYmplY3QpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IG9sT2JqZWN0LmdldFByb3BlcnRpZXMoKTtcbiAgICB2YXIgb2JqID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgdmFyIHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgdmFyIHR5cGVPZiA9IHR5cGVvZiB2YWx1ZTtcblxuICAgICAgaWYgKHR5cGVPZiA9PT0gJ3N0cmluZycgfHwgdHlwZU9mID09PSAnbnVtYmVyJykge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVncmlkID0gZnVuY3Rpb24gc2VyaWFsaXplVGlsZWdyaWQodGlsZWdyaWQpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgb2JqLmV4dGVudCA9IHRpbGVncmlkLmdldEV4dGVudCgpO1xuICAgIG9iai5taW5ab29tID0gdGlsZWdyaWQuZ2V0TWluWm9vbSgpO1xuICAgIG9iai5vcmlnaW4gPSB0aWxlZ3JpZC5nZXRPcmlnaW4oMCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gdGlsZWdyaWQuZ2V0UmVzb2x1dGlvbnMoKTtcbiAgICBvYmoudGlsZVNpemUgPSB0aWxlZ3JpZC5nZXRUaWxlU2l6ZSh0aWxlZ3JpZC5nZXRNaW5ab29tKCkpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVRpbGVncmlkID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlZ3JpZChzZXJpYWxpemF0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHJldHVybiBuZXcgT2xUaWxlZ3JpZFRpbGVHcmlkKG9wdGlvbnMpO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlZ3JpZFdNVFModGlsZWdyaWQpIHtcbiAgICBpZiAoIXRpbGVncmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgcmVzb2x1dGlvbnMgPSB0aWxlZ3JpZC5nZXRSZXNvbHV0aW9ucygpO1xuICAgIG9iai5leHRlbnQgPSB0aWxlZ3JpZC5nZXRFeHRlbnQoKTtcbiAgICBvYmoubWluWm9vbSA9IHRpbGVncmlkLmdldE1pblpvb20oKTtcbiAgICBvYmoubWF0cml4SWRzID0gdGlsZWdyaWQuZ2V0TWF0cml4SWRzKCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gcmVzb2x1dGlvbnM7XG4gICAgb2JqLm9yaWdpbnMgPSBbXTtcblxuICAgIGZvciAodmFyIHogPSAwOyB6IDwgcmVzb2x1dGlvbnMubGVuZ3RoOyArK3opIHtcbiAgICAgIG9iai5vcmlnaW5zLnB1c2godGlsZWdyaWQuZ2V0T3JpZ2luKHopKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhzZXJpYWxpemF0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHJldHVybiBuZXcgT2xUaWxlZ3JpZFdNVFMob3B0aW9ucyk7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMgPSBmdW5jdGlvbiBzZXJpYWxpemVTb3VyY2VUaWxlV01TKHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKHNvdXJjZSk7XG4gICAgb2JqLnBhcmFtcyA9IHNvdXJjZS5nZXRQYXJhbXMoKTtcbiAgICBvYmoudXJscyA9IHNvdXJjZS5nZXRVcmxzKCk7XG4gICAgb2JqLnRpbGVHcmlkID0gdGhpcy5zZXJpYWxpemVUaWxlZ3JpZChzb3VyY2UuZ2V0VGlsZUdyaWQoKSk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBzb3VyY2UuZ2V0UHJvamVjdGlvbigpO1xuXG4gICAgaWYgKHByb2plY3Rpb24pIHtcbiAgICAgIG9iai5wcm9qZWN0aW9uID0gb2xQcm9qLmdldChzb3VyY2UuZ2V0UHJvamVjdGlvbigpKS5nZXRDb2RlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplU291cmNlVGlsZVdNUyA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplU291cmNlVGlsZVdNUyhzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIG9wdGlvbnMudGlsZUxvYWRGdW5jdGlvbiA9IHRpbGVMb2FkRnVuY3Rpb247XG5cbiAgICBpZiAob3B0aW9ucy50aWxlR3JpZCkge1xuICAgICAgb3B0aW9ucy50aWxlR3JpZCA9IHRoaXMuZGVzZXJpYWxpemVUaWxlZ3JpZChvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmd1dHRlciA9IHRoaXMuZ3V0dGVyXztcbiAgICByZXR1cm4gbmV3IE9sU291cmNlVGlsZVdNUyhvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplU291cmNlV01UUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVNvdXJjZVdNVFMoc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8oc291cmNlKTtcbiAgICBvYmouZGltZW5zaW9ucyA9IHNvdXJjZS5nZXREaW1lbnNpb25zKCk7XG4gICAgb2JqLmZvcm1hdCA9IHNvdXJjZS5nZXRGb3JtYXQoKTtcbiAgICBvYmoudXJscyA9IHNvdXJjZS5nZXRVcmxzKCk7XG4gICAgb2JqLnZlcnNpb24gPSBzb3VyY2UuZ2V0VmVyc2lvbigpO1xuICAgIG9iai5sYXllciA9IHNvdXJjZS5nZXRMYXllcigpO1xuICAgIG9iai5zdHlsZSA9IHNvdXJjZS5nZXRTdHlsZSgpO1xuICAgIG9iai5tYXRyaXhTZXQgPSBzb3VyY2UuZ2V0TWF0cml4U2V0KCk7XG4gICAgdmFyIHRpbGVHcmlkV01UUyA9IHNvdXJjZS5nZXRUaWxlR3JpZCgpO1xuICAgIG9iai50aWxlR3JpZCA9IHRoaXMuc2VyaWFsaXplVGlsZWdyaWRXTVRTKHRpbGVHcmlkV01UUyk7XG4gICAgb2JqLnJlcXVlc3RFbmNvZGluZyA9IHNvdXJjZS5nZXRSZXF1ZXN0RW5jb2RpbmcoKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgICBpZiAocHJvamVjdGlvbikge1xuICAgICAgb2JqLnByb2plY3Rpb24gPSBvbFByb2ouZ2V0KHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkpLmdldENvZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVTb3VyY2VXTVRTID0gZnVuY3Rpb24gZGVzZXJpYWxpemVTb3VyY2VXTVRTKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgb3B0aW9ucy50aWxlTG9hZEZ1bmN0aW9uID0gdGlsZUxvYWRGdW5jdGlvbjtcblxuICAgIGlmIChvcHRpb25zLnRpbGVHcmlkKSB7XG4gICAgICBvcHRpb25zLnRpbGVHcmlkID0gdGhpcy5kZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9sU291cmNlV01UUyhvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8ubWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyA9IGZ1bmN0aW9uIG1ha2VJbmZpbml0eVNlcmlhbGl6YWJsZV8obnVtYmVyKSB7XG4gICAgaWYgKG51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiAxMDAwO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVMYXllciA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVMYXllcihsYXllciwgc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8obGF5ZXIpO1xuICAgIG9iai5vcGFjaXR5ID0gbGF5ZXIuZ2V0T3BhY2l0eSgpO1xuICAgIG9iai52aXNpYmxlID0gbGF5ZXIuZ2V0VmlzaWJsZSgpO1xuICAgIG9iai5taW5SZXNvbHV0aW9uID0gbGF5ZXIuZ2V0TWluUmVzb2x1dGlvbigpO1xuICAgIG9iai5tYXhSZXNvbHV0aW9uID0gdGhpcy5tYWtlSW5maW5pdHlTZXJpYWxpemFibGVfKGxheWVyLmdldE1heFJlc29sdXRpb24oKSk7XG4gICAgb2JqLnpJbmRleCA9IGxheWVyLmdldFpJbmRleCgpO1xuICAgIHNvdXJjZSA9IHNvdXJjZSB8fCBsYXllci5nZXRTb3VyY2UoKTtcblxuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPbFNvdXJjZVRpbGVXTVMpIHtcbiAgICAgIG9iai5zb3VyY2UgPSB0aGlzLnNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc291cmNlKTtcbiAgICAgIG9iai5zb3VyY2VUeXBlID0gJ3RpbGVXTVMnO1xuICAgIH0gZWxzZSBpZiAoc291cmNlIGluc3RhbmNlb2YgT2xTb3VyY2VXTVRTKSB7XG4gICAgICBvYmouc291cmNlID0gdGhpcy5zZXJpYWxpemVTb3VyY2VXTVRTKHNvdXJjZSk7XG4gICAgICBvYmouc291cmNlVHlwZSA9ICdXTVRTJztcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlTGF5ZXIgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVMYXllcihzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHZhciBzb3VyY2VUeXBlID0gb3B0aW9ucy5zb3VyY2VUeXBlO1xuXG4gICAgaWYgKHNvdXJjZVR5cGUgPT09ICd0aWxlV01TJykge1xuICAgICAgb3B0aW9ucy5zb3VyY2UgPSB0aGlzLmRlc2VyaWFsaXplU291cmNlVGlsZVdNUyhvcHRpb25zLnNvdXJjZSwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgfSBlbHNlIGlmIChzb3VyY2VUeXBlID09PSAnV01UUycpIHtcbiAgICAgIG9wdGlvbnMuc291cmNlID0gdGhpcy5kZXNlcmlhbGl6ZVNvdXJjZVdNVFMob3B0aW9ucy5zb3VyY2UsIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT2xMYXllclRpbGUob3B0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIFNlckRlcztcbn0oKTtcblxudmFyIGV4cG9ydHMgPSBTZXJEZXM7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgU2VydmljZU1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIFNlcnZpY2VNYW5hZ2VyLiRpbmplY3QgPSBbXCIkaW5qZWN0b3JcIl07XG5cbiAgZnVuY3Rpb24gU2VydmljZU1hbmFnZXIoJGluamVjdG9yKSB7XG4gICAgdGhpcy4kaW5qZWN0b3JfID0gJGluamVjdG9yO1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gbnVsbDtcbiAgICB0aGlzLnJlc3RvcmVTZXJ2aWNlXyA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU2VydmljZU1hbmFnZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5nZXRPZmZsaW5lU2VydmljZV8gPSBmdW5jdGlvbiBnZXRPZmZsaW5lU2VydmljZV8oc2VydmljZUxpa2UsIG1ldGhvZCkge1xuICAgIGlmICh0eXBlb2Ygc2VydmljZUxpa2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIXRoaXMuJGluamVjdG9yXy5oYXMoc2VydmljZUxpa2UpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgb2ZmbGluZSBcIiArIG1ldGhvZCArIFwiIHNlcnZpY2UgY291bGQgbm90IGJlIGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZXJ2aWNlID0gdGhpcy4kaW5qZWN0b3JfLmdldChzZXJ2aWNlTGlrZSk7XG5cbiAgICAgIGlmICghc2VydmljZVttZXRob2RdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgb2ZmbGluZSBzZXJ2aWNlIFwiICsgc2VydmljZUxpa2UgKyBcIiBkb2VzIG5vdCBoYXZlIGEgXCIgKyBtZXRob2QgKyBcIiBtZXRob2RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG4gICAgaWYgKCFzZXJ2aWNlTGlrZVttZXRob2RdKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHByb3ZpZGVkIG9mZmxpbmUgc2VydmljZSBkb2VzIG5vdCBoYXZlIGEgXCIgKyBtZXRob2QgKyBcIiBtZXRob2RcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcnZpY2VMaWtlO1xuICB9O1xuXG4gIF9wcm90by5zZXRTYXZlU2VydmljZSA9IGZ1bmN0aW9uIHNldFNhdmVTZXJ2aWNlKHNhdmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8oc2F2ZUxpa2VTZXJ2aWNlLCAnc2F2ZScpO1xuICB9O1xuXG4gIF9wcm90by5zZXRSZXN0b3JlU2VydmljZSA9IGZ1bmN0aW9uIHNldFJlc3RvcmVTZXJ2aWNlKHJlc3RvcmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMucmVzdG9yZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8ocmVzdG9yZUxpa2VTZXJ2aWNlLCAncmVzdG9yZScpO1xuICB9O1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHNhdmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlU2VydmljZV8uY2FuY2VsKCk7XG4gIH07XG5cbiAgX3Byb3RvLnNhdmUgPSBmdW5jdGlvbiBzYXZlKGV4dGVudCwgbWFwKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHNhdmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlU2VydmljZV8uc2F2ZShleHRlbnQsIG1hcCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKG1hcCkge1xuICAgIGlmICghdGhpcy5yZXN0b3JlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSByZXN0b3JlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdG9yZVNlcnZpY2VfLnJlc3RvcmUobWFwKTtcbiAgfTtcblxuICByZXR1cm4gU2VydmljZU1hbmFnZXI7XG59KCk7XG5cblNlcnZpY2VNYW5hZ2VyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyJywgW10pO1xuU2VydmljZU1hbmFnZXIubW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lU2VydmljZU1hbmFnZXInLCBTZXJ2aWNlTWFuYWdlcik7XG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlTWFuYWdlcjsiLCJmdW5jdGlvbiBibG9iVG9EYXRhVXJsKGJsb2IpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgIH07XG5cbiAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgfSk7XG59XG5cbnZhciBUaWxlRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVGlsZURvd25sb2FkZXIodGlsZXMsIGNhbGxiYWNrcywgd29ya2Vycykge1xuICAgIHRoaXMubWF4TnVtYmVyT2ZXb3JrZXJzXyA9IHdvcmtlcnM7XG4gICAgdGhpcy53YXNTdGFydGVkXyA9IGZhbHNlO1xuICAgIHRoaXMudGlsZXNfID0gdGlsZXM7XG4gICAgdGhpcy5jYWxsYmFja3NfID0gY2FsbGJhY2tzO1xuICAgIHRoaXMuYWxsQ291bnRfID0gMDtcbiAgICB0aGlzLm9rQ291bnRfID0gMDtcbiAgICB0aGlzLmtvQ291bnRfID0gMDtcbiAgICB0aGlzLnJlcXVlc3RlZENvdW50XyA9IDA7XG4gICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMucHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMudGlsZUluZGV4XyA9IDA7XG4gICAgdGhpcy5jYW5jZWxfID0gZmFsc2U7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVGlsZURvd25sb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdGhpcy5jYW5jZWxfID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uZG93bmxvYWQgPSBmdW5jdGlvbiBkb3dubG9hZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMucHJvbWlzZV8pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICAgIH1cblxuICAgIHRoaXMucHJvbWlzZV8gPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBfdGhpcy5yZXNvbHZlUHJvbWlzZV8gPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMudGlsZXNfKTtcblxuICAgIGlmICh0aGlzLnRpbGVzXy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKDEpO1xuXG4gICAgICBpZiAodGhpcy5yZXNvbHZlUHJvbWlzZV8pIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1heE51bWJlck9mV29ya2Vyc187ICsraSkge1xuICAgICAgICB0aGlzLmRvd25sb2FkVGlsZV8oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgfTtcblxuICBfcHJvdG8uZG93bmxvYWRUaWxlXyA9IGZ1bmN0aW9uIGRvd25sb2FkVGlsZV8oKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5jYW5jZWxfIHx8IHRoaXMudGlsZUluZGV4XyA+PSB0aGlzLnRpbGVzXy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNfW3RoaXMudGlsZUluZGV4XysrXTtcbiAgICB2YXIgdGlsZVVybCA9IHRpbGUudXJsO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignR0VUJywgdGlsZVVybCwgdHJ1ZSk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcblxuICAgIHZhciBvblRpbGVEb3dubG9hZGVkID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRlZCgpIHtcbiAgICAgIGlmIChfdGhpczIuYWxsQ291bnRfID09PSBfdGhpczIudGlsZXNfLmxlbmd0aCAmJiBfdGhpczIucmVzb2x2ZVByb21pc2VfKSB7XG4gICAgICAgIF90aGlzMi5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyLmRvd25sb2FkVGlsZV8oKTtcbiAgICB9O1xuXG4gICAgdmFyIGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbiBlcnJvckNhbGxiYWNrKF8pIHtcbiAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICsrX3RoaXMyLmFsbENvdW50XztcbiAgICAgICsrX3RoaXMyLmtvQ291bnRfO1xuICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuXG4gICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKHByb2dyZXNzKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgIH07XG5cbiAgICB2YXIgb25sb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbiBvbmxvYWRDYWxsYmFjayhlKSB7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2U7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zaXplICE9PSAwKSB7XG4gICAgICAgIGJsb2JUb0RhdGFVcmwocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGRhdGFVcmwpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICAgKytfdGhpczIub2tDb3VudF87XG4gICAgICAgICAgdGlsZS5yZXNwb25zZSA9IGRhdGFVcmw7XG4gICAgICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuXG4gICAgICAgICAgX3RoaXMyLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRTdWNjZXNzKHByb2dyZXNzLCB0aWxlKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5jYW5jZWxfKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICsrX3RoaXMyLm9rQ291bnRfO1xuXG4gICAgICAgIF90aGlzMi5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkU3VjY2VzcyhfdGhpczIuYWxsQ291bnRfIC8gX3RoaXMyLnRpbGVzXy5sZW5ndGgsIHRpbGUpLnRoZW4ob25UaWxlRG93bmxvYWRlZCwgb25UaWxlRG93bmxvYWRlZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vbmxvYWQgPSBvbmxvYWRDYWxsYmFjaztcbiAgICB4aHIub25lcnJvciA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5zZW5kKCk7XG4gICAgKyt0aGlzLnJlcXVlc3RlZENvdW50XztcbiAgfTtcblxuICByZXR1cm4gVGlsZURvd25sb2FkZXI7XG59KCk7XG5cbmV4cG9ydCB7IFRpbGVEb3dubG9hZGVyIGFzIGRlZmF1bHQgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibWFpbi1idXR0b25cIj5cXG4gIDxzcGFuIG5nLWlmPVwiISRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwibm8tZGF0YSBmYXMgZmEtYXJyb3ctY2lyY2xlLWRvd25cIiBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oKVwiPjwvZGl2PlxcbiAgPC9zcGFuPlxcbiAgPHNwYW4gbmctaWY9XCIkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgPGRpdiBjbGFzcz1cIndpdGgtZGF0YSBmYXMgZmEtYXJyb3ctY2lyY2xlLWRvd25cIiBuZy1jbGljaz1cIiRjdHJsLnNob3dNZW51KClcIj48L2Rpdj5cXG4gIDwvc3Bhbj5cXG48L2Rpdj5cXG5cXG48ZGl2IG5nLWlmPVwiJGN0cmwuc2VsZWN0aW5nRXh0ZW50ICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIiBjbGFzcz1cInZhbGlkYXRlLWV4dGVudCBidG4gYnRuLXByaW1hcnlcIj5cXG4gIDxkaXYgbmctaWY9XCIhJGN0cmwuZG93bmxvYWRpbmdcIiBuZy1jbGljaz1cIiRjdHJsLmNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEoKVwiIHRyYW5zbGF0ZT5TYXZlIG1hcDwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cIiRjdHJsLmRvd25sb2FkaW5nXCIgbmctY2xpY2s9XCIkY3RybC5hc2tBYm9ydERvd25sb2FkKClcIiB0cmFuc2xhdGU+QWJvcnQ8L2Rpdj5cXG48L2Rpdj5cXG5cXG5cXG48ZGl2IG5nLWlmPVwiJGN0cmwuZG93bmxvYWRpbmdcIiBjbGFzcz1cImluLXByb2dyZXNzXCI+XFxuICA8ZGl2Pnt7JGN0cmwucHJvZ3Jlc3NQZXJjZW50c319JTwvZGl2PlxcbjwvZGl2PlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwubWVudURpc3BsYXllZFwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJ7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cIj5cXG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+T2ZmbGluZSBtYXA8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8ZGl2IG5nLWlmPVwiJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJleHRlbnQtem9vbSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctaWY9XCIhJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5hY3RpdmF0ZU9mZmxpbmVNb2RlKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZXh0ZW50LXpvb20gYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKCkgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRlYWN0aXZhdGVPZmZsaW5lTW9kZSgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5EZWFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZXh0ZW50LXNob3cgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC50b2dnbGVFeHRlbnRWaXNpYmlsaXR5KClcIj5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiJGN0cmwuaXNFeHRlbnRWaXNpYmxlKClcIiB0cmFuc2xhdGU+SGlkZSBleHRlbnQ8L3NwYW4+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cIiEkY3RybC5pc0V4dGVudFZpc2libGUoKVwiIHRyYW5zbGF0ZSA+U2hvdyBleHRlbnQ8L3NwYW4+XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRpc3BsYXlBbGVydERlc3Ryb3lEYXRhID0gdHJ1ZVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+RGVsZXRlIGRhdGFcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctaWY9XCIhJGN0cmwuaGFzRGF0YSgpICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5ldy1kYXRhIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+U2F2ZSBuZXcgbWFwXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0TG9hZERhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPn57eyRjdHJsLmVzdGltYXRlZExvYWREYXRhU2l6ZX19TUIgb2YgbWFwcyB3aWxsIGJlIGRvd25sb2FkZWQgKHVudGlsIHNjYWxlIDE6MjVcXCcwMDApIC0gRG9uXFwndCBsb2NrIHlvdXIgZGV2aWNlIG9yIG5hdmlnYXRlIGF3YXkgZnJvbSB0aGlzIHNpdGUgZHVyaW5nIHRoZSBkb3dubG9hZCBwcm9jZXNzLiBEZWFjdGl2YXRlIFwicHJpdmF0ZVwiIG1vZGUgb2YgeW91ciBicm93c2VyLjwvcD5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnZhbGlkYXRlRXh0ZW50KClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5DYW5jZWxcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydE5vTGF5ZXJcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPk5vIG1hcHMgc2VsZWN0ZWQgZm9yIHNhdmluZy48L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5Pa1xcbiAgICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0RGVzdHJveURhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPkRvIHlvdSByZWFsbHkgd2FudCB0byByZW1vdmUgeW91ciBkYXRhID88L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVEYXRhKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5DYW5jZWxcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWRcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPkRvIHlvdSByZWFsbHkgd2FudCB0byByZW1vdmUgeW91ciBkYXRhID88L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5hYm9ydERvd25sb2FkKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZm9sbG93RG93bmxvYWRQcm9ncmVzc2lvbl8oKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+Q2FuY2VsXFxuICAgICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsImltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3IuanMnO1xuaW1wb3J0IG5nZW9NZXNzYWdlTW9kYWxDb21wb25lbnQgZnJvbSAnbmdlby9tZXNzYWdlL21vZGFsQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IGV4dGVudFRvUmVjdGFuZ2xlIH0gZnJvbSAnbmdlby91dGlscy5qcyc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24uanMnO1xuaW1wb3J0IEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24uanMnO1xuaW1wb3J0IHsgREVWSUNFX1BJWEVMX1JBVElPIH0gZnJvbSAnb2wvaGFzLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IE1hc2tMYXllciBmcm9tICcuL01hc2suanMnO1xudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lJywgW25nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50Lm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKCduZ2VvT2ZmbGluZVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzWyduZ2VvT2ZmbGluZVRlbXBsYXRldXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5odG1sJztcbn0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vb2ZmbGluZS9jb21wb25lbnQuaHRtbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5uZ2VvT2ZmbGluZVRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRhdHRyc1wiLCBcIm5nZW9PZmZsaW5lVGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIG5nZW9PZmZsaW5lVGVtcGxhdGVVcmwoJGVsZW1lbnQsICRhdHRycywgbmdlb09mZmxpbmVUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb09mZmxpbmVUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzKTtcbn1cblxudmFyIGNvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvT2ZmbGluZU1hcCcsXG4gICAgJ2V4dGVudFNpemUnOiAnPD9uZ2VvT2ZmbGluZUV4dGVudHNpemUnLFxuICAgICdtYXNrTWFyZ2luJzogJzw/bmdlb09mZmxpbmVNYXNrTWFyZ2luJyxcbiAgICAnbWluWm9vbSc6ICc8P25nZW9PZmZsaW5lTWluWm9vbScsXG4gICAgJ21heFpvb20nOiAnPD9uZ2VvT2ZmbGluZU1heFpvb20nXG4gIH0sXG4gIGNvbnRyb2xsZXI6ICduZ2VvT2ZmbGluZUNvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZVVybDogbmdlb09mZmxpbmVUZW1wbGF0ZVVybFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb09mZmxpbmUnLCBjb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJcIiwgXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIiwgXCJuZ2VvT2ZmbGluZU1vZGVcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIsIG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiwgbmdlb09mZmxpbmVNb2RlLCBuZ2VvTmV0d29ya1N0YXR1cykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMubWFza0xheWVyXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfID0gbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcjtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy5vZmZsaW5lTW9kZSA9IG5nZW9PZmZsaW5lTW9kZTtcbiAgICB0aGlzLm5ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcbiAgICB0aGlzLm1hcDtcbiAgICB0aGlzLmV4dGVudFNpemUgPSAwO1xuICAgIHRoaXMuZmVhdHVyZXNPdmVybGF5XyA9IG5nZW9GZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICAgIHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICAgIHRoaXMuZmVhdHVyZXNPdmVybGF5Xy5zZXRGZWF0dXJlcyh0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXyk7XG4gICAgdGhpcy5kYXRhUG9seWdvbl8gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW5nRXh0ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IDA7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IGZhbHNlO1xuICAgIHRoaXMubWFza01hcmdpbiA9IDA7XG4gICAgdGhpcy5taW5ab29tO1xuICAgIHRoaXMubWF4Wm9vbTtcbiAgICB0aGlzLm9yaWdpbmFsTWluWm9vbTtcbiAgICB0aGlzLm9yaWdpbmFsTWF4Wm9vbTtcbiAgICB0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA9IDA7XG4gICAgdGhpcy5yb3RhdGVNYXNrID0gZmFsc2U7XG5cbiAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBldmVudC5kZXRhaWwucHJvZ3Jlc3M7XG4gICAgICBfdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gTWF0aC5mbG9vcihwcm9ncmVzcyAqIDEwMCk7XG5cbiAgICAgIGlmIChwcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICBfdGhpcy5maW5pc2hEb3dubG9hZF8oKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuJHRpbWVvdXRfKGZ1bmN0aW9uICgpIHt9LCAwKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICB0aGlzLm9mZmxpbmVNb2RlLnJlZ2lzdGVyQ29tcG9uZW50KHRoaXMpO1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5vbigncHJvZ3Jlc3MnLCB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfKTtcbiAgICB0aGlzLm1hc2tNYXJnaW4gPSB0aGlzLm1hc2tNYXJnaW4gfHwgMTAwO1xuICAgIHRoaXMubWluWm9vbSA9IHRoaXMubWluWm9vbSB8fCAxMDtcbiAgICB0aGlzLm1heFpvb20gPSB0aGlzLm1heFpvb20gfHwgMTU7XG4gICAgdGhpcy5tYXNrTGF5ZXJfID0gbmV3IE1hc2tMYXllcih7XG4gICAgICBleHRlbnRJbk1ldGVyczogdGhpcy5leHRlbnRTaXplXG4gICAgfSwge1xuICAgICAgbWFyZ2luOiB0aGlzLm1hc2tNYXJnaW5cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLnVuKCdwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18pO1xuICB9O1xuXG4gIF9wcm90by5oYXNEYXRhID0gZnVuY3Rpb24gaGFzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmhhc09mZmxpbmVEYXRhKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhKCkge1xuICAgIHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplID0gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmVzdGltYXRlTG9hZERhdGFTaXplKHRoaXMubWFwKTtcblxuICAgIGlmICh0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsZXJ0TG9hZERhdGEgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlBbGVydE5vTGF5ZXIgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8udG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbiA9IGZ1bmN0aW9uIHRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oZmluaXNoZWQpIHtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGluZ0V4dGVudCA9ICF0aGlzLnNlbGVjdGluZ0V4dGVudDtcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm1hc2tMYXllcl8pO1xuICAgIHRoaXMucmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0aW5nRXh0ZW50ICYmICF0aGlzLm1hcC5nZXRMYXllcnMoKS5nZXRBcnJheSgpLmluY2x1ZGVzKHRoaXMubWFza0xheWVyXykpIHtcbiAgICAgIHRoaXMuYWRkWm9vbUNvbnN0cmFpbnRzXygpO1xuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5tYXNrTGF5ZXJfKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5yZW5kZXIoKTtcbiAgfTtcblxuICBfcHJvdG8udmFsaWRhdGVFeHRlbnQgPSBmdW5jdGlvbiB2YWxpZGF0ZUV4dGVudCgpIHtcbiAgICB0aGlzLnByb2dyZXNzUGVyY2VudHMgPSAwO1xuICAgIHZhciBleHRlbnQgPSB0aGlzLmdldERvd2xvYWRFeHRlbnRfKCk7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5zYXZlKGV4dGVudCwgdGhpcy5tYXApO1xuICB9O1xuXG4gIF9wcm90by5maW5pc2hEb3dubG9hZF8gPSBmdW5jdGlvbiBmaW5pc2hEb3dubG9hZF8oKSB7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbih0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8uYXNrQWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFza0Fib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uYWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8uY2FuY2VsKCk7XG4gICAgdGhpcy5kZWxldGVEYXRhKCk7XG4gIH07XG5cbiAgX3Byb3RvLnNob3dNZW51ID0gZnVuY3Rpb24gc2hvd01lbnUoKSB7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLnJlc3RvcmUodGhpcy5tYXApLnRoZW4oZnVuY3Rpb24gKGV4dGVudCkge1xuICAgICAgX3RoaXMyLmRhdGFQb2x5Z29uXyA9IF90aGlzMi5jcmVhdGVQb2x5Z29uRnJvbUV4dGVudF8oZXh0ZW50KTtcblxuICAgICAgdmFyIHNpemUgPSBfdGhpczIubWFwLmdldFNpemUoKTtcblxuICAgICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczIubWFwLmdldFZpZXcoKS5maXQoZXh0ZW50LCB7XG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH0pO1xuXG4gICAgICBfdGhpczIubWVudURpc3BsYXllZCA9IGZhbHNlO1xuXG4gICAgICBfdGhpczIuZGlzcGxheUV4dGVudF8oKTtcblxuICAgICAgX3RoaXMyLm9mZmxpbmVNb2RlLmVuYWJsZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5kZWFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9O1xuXG4gIF9wcm90by50b2dnbGVFeHRlbnRWaXNpYmlsaXR5ID0gZnVuY3Rpb24gdG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSgpIHtcbiAgICBpZiAodGhpcy5pc0V4dGVudFZpc2libGUoKSkge1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXh0ZW50XygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaXNFeHRlbnRWaXNpYmxlID0gZnVuY3Rpb24gaXNFeHRlbnRWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5nZXRMZW5ndGgoKSA+IDA7XG4gIH07XG5cbiAgX3Byb3RvLmRlbGV0ZURhdGEgPSBmdW5jdGlvbiBkZWxldGVEYXRhKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKCkpIHtcbiAgICAgIHRoaXMubWVudURpc3BsYXllZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZWxvYWRJZkluT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiByZWxvYWRJZkluT2ZmbGluZU1vZGUoKSB7XG4gICAgICBpZiAoX3RoaXMzLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIF90aGlzMy5kZWFjdGl2YXRlT2ZmbGluZU1vZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmNsZWFyKCkudGhlbihyZWxvYWRJZkluT2ZmbGluZU1vZGUpO1xuICB9O1xuXG4gIF9wcm90by5kaXNwbGF5RXh0ZW50XyA9IGZ1bmN0aW9uIGRpc3BsYXlFeHRlbnRfKCkge1xuICAgIGlmICghdGhpcy5pc0V4dGVudFZpc2libGUoKSAmJiB0aGlzLmRhdGFQb2x5Z29uXykge1xuICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgRmVhdHVyZSh0aGlzLmRhdGFQb2x5Z29uXyk7XG4gICAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uYWRkWm9vbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uIGFkZFpvb21Db25zdHJhaW50c18oKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdmFyIHpvb20gPSB2aWV3LmdldFpvb20oKSB8fCAwO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tID0gdmlldy5nZXRNaW5ab29tKCk7XG4gICAgdGhpcy5vcmlnaW5hbE1heFpvb20gPSB2aWV3LmdldE1heFpvb20oKTtcblxuICAgIGlmICh6b29tIDwgdGhpcy5taW5ab29tKSB7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5taW5ab29tKTtcbiAgICB9IGVsc2UgaWYgKHpvb20gPiB0aGlzLm1heFpvb20pIHtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIH1cblxuICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm1pblpvb20pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVab29tQ29uc3RyYWludHNfID0gZnVuY3Rpb24gcmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcblxuICAgIGlmICh0aGlzLm9yaWdpbmFsTWF4Wm9vbSAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3JpZ2luYWxNaW5ab29tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm9yaWdpbmFsTWF4Wm9vbSk7XG4gICAgICB2aWV3LnNldE1pblpvb20odGhpcy5vcmlnaW5hbE1pblpvb20pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCkge1xuICAgIHZhciBwcm9qRXh0ZW50ID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKS5nZXRFeHRlbnQoKTtcbiAgICByZXR1cm4gbmV3IFBvbHlnb24oW2V4dGVudFRvUmVjdGFuZ2xlKHByb2pFeHRlbnQpLCBleHRlbnRUb1JlY3RhbmdsZShleHRlbnQpXSwgJ1hZJyk7XG4gIH07XG5cbiAgX3Byb3RvLmdldERvd2xvYWRFeHRlbnRfID0gZnVuY3Rpb24gZ2V0RG93bG9hZEV4dGVudF8oKSB7XG4gICAgdmFyIGNlbnRlciA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRDZW50ZXIoKTtcbiAgICB2YXIgaGFsZkxlbmd0aCA9IE1hdGguY2VpbCh0aGlzLmV4dGVudFNpemUgfHwgdGhpcy5nZXRFeHRlbnRTaXplXygpKSAvIDI7XG4gICAgcmV0dXJuIHRoaXMubWFza0xheWVyXy5jcmVhdGVFeHRlbnQoY2VudGVyLCBoYWxmTGVuZ3RoKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RXh0ZW50U2l6ZV8gPSBmdW5jdGlvbiBnZXRFeHRlbnRTaXplXygpIHtcbiAgICB2YXIgbWFwU2l6ZSA9IHRoaXMubWFwLmdldFNpemUoKSB8fCBbMTUwLCAxNTBdO1xuICAgIHZhciBtYXNrU2l6ZVBpeGVsID0gREVWSUNFX1BJWEVMX1JBVElPICogTWF0aC5taW4obWFwU2l6ZVswXSwgbWFwU2l6ZVsxXSkgLSB0aGlzLm1hc2tNYXJnaW4gKiAyO1xuICAgIHZhciBtYXNrU2l6ZU1ldGVyID0gbWFza1NpemVQaXhlbCAqICh0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpIHx8IDEpIC8gREVWSUNFX1BJWEVMX1JBVElPO1xuICAgIHJldHVybiBtYXNrU2l6ZU1ldGVyO1xuICB9O1xuXG4gIHJldHVybiBDb250cm9sbGVyO1xufSgpO1xubXlNb2R1bGUuY29udHJvbGxlcignbmdlb09mZmxpbmVDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgbmdlb09mZmxpbmVDb21wb25lbnQgZnJvbSAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzIGZyb20gJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlci5qcyc7XG5pbXBvcnQgZG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvRG93bmxvYWRlci5qcyc7XG5pbXBvcnQgcmVzdG9yZXIgZnJvbSAnbmdlby9vZmZsaW5lL1Jlc3RvcmVyLmpzJztcbmltcG9ydCBtb2RlIGZyb20gJ25nZW8vb2ZmbGluZS9Nb2RlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xudmFyIGV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVNb2R1bGUnLCBbbmdlb09mZmxpbmVDb21wb25lbnQubmFtZSwgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzLm1vZHVsZS5uYW1lLCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLm1vZHVsZS5uYW1lLCBkb3dubG9hZGVyLm1vZHVsZS5uYW1lLCByZXN0b3Jlci5tb2R1bGUubmFtZSwgbW9kZS5tb2R1bGUubmFtZV0pO1xuZXhwb3J0cy52YWx1ZSgnbmdlb09mZmxpbmVHdXR0ZXInLCA5Nik7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBvbExheWVyR3JvdXAgZnJvbSAnb2wvbGF5ZXIvR3JvdXAuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlTGF5ZXIobGF5ZXIsIGFuY2VzdG9ycywgdmlzaXRvcikge1xuICB2YXIgZGVzY2VuZCA9IHZpc2l0b3IobGF5ZXIsIGFuY2VzdG9ycyk7XG5cbiAgaWYgKGRlc2NlbmQgJiYgbGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyR3JvdXApIHtcbiAgICBsYXllci5nZXRMYXllcnMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZExheWVyKSB7XG4gICAgICB0cmF2ZXJzZUxheWVyKGNoaWxkTGF5ZXIsIFtdLmNvbmNhdChhbmNlc3RvcnMsIFtsYXllcl0pLCB2aXNpdG9yKTtcbiAgICB9KTtcbiAgfVxufVxudmFyIGV4dHJhY3RvciA9IG5ldyBSZWdFeHAoJ1teL10qLy9bXi9dKy8oLiopJyk7XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVVJMKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IHVybC5tYXRjaChleHRyYWN0b3IpO1xuXG4gIGlmICghbWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IG5vcm1hbGl6ZSB1cmwgJyArIHVybCk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlc1sxXTtcbn0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN1FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUpBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9IQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5S0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDelFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=