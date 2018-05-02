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
/******/ 	deferredModules.push([31,"commons"]);
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
/* harmony import */ var _common_dependencies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common_dependencies */ "./examples/common_dependencies.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_offline_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/offline/module */ "./src/offline/module.js");
/* harmony import */ var ngeo_offline_Configuration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/offline/Configuration */ "./src/offline/Configuration.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_offline_ServiceManager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/offline/ServiceManager */ "./src/offline/ServiceManager.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_13__);
// The MIT License (MIT)
//
// Copyright (c) 2018-2025 Camptocamp SA
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
   * @param {import('ngeo/offline/NetworkStatus').default} ngeoNetworkStatus ngeo network status service.
   * @param {NgeoOfflineServiceManager} ngeoOfflineServiceManager ngeo offline service.
   * @ngInject
   */
  constructor(ngeoNetworkStatus, ngeoOfflineServiceManager) {
    /**
     * Save a square of 10 km sideways (Map's unit is the meter).
     *
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
    this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_3__["default"]({
      layers: [
        new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_5__["default"]({
          source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_6__["default"](),
        }),
      ],
      view: new ol_View__WEBPACK_IMPORTED_MODULE_4__["default"]({
        center: [352379, 5172733],
        zoom: 4,
      }),
    });

    ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_11__["default"].init(this.map);

    ngeoOfflineServiceManager.setSaveService('offlineDownloader');
    ngeoOfflineServiceManager.setRestoreService('ngeoOfflineRestorer');
  }
}

/** @type {!angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_13___default.a.module('app', [
  'gettext',
  gmf_map_component__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_offline_module__WEBPACK_IMPORTED_MODULE_9__["default"].name,
  ngeo_offline_ServiceManager__WEBPACK_IMPORTED_MODULE_12__["default"].module.name,
]);

myModule.value('ngeoOfflineTestUrl', '../../src/offline/component.html');

// Define the offline download configuration service
myModule.service('ngeoOfflineConfiguration', ngeo_offline_Configuration__WEBPACK_IMPORTED_MODULE_10__["default"]);

myModule.controller('MainController', MainController);

myModule.constant('ngeoTilesPreloadingLimit', 0);

Object(_options__WEBPACK_IMPORTED_MODULE_8__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (MainController);


/***/ }),

/***/ "./node_modules/localforage/src/localforage.js":
/*!*****************************************************************************************!*\
  !*** delegated ./node_modules/localforage/src/localforage.js from dll-reference vendor ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1737);

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
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Observable */ "./node_modules/ol/Observable.js");
/* harmony import */ var ol_layer_Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/layer/Layer */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_source_Image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Image */ "./node_modules/ol/source/Image.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/TileWMS */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_tilegrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/tilegrid */ "./node_modules/ol/tilegrid.js");
/* harmony import */ var ngeo_offline_SerializerDeserializer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/offline/SerializerDeserializer */ "./src/offline/SerializerDeserializer.js");
/* harmony import */ var ngeo_offline_LocalforageCordovaWrapper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/offline/LocalforageCordovaWrapper */ "./src/offline/LocalforageCordovaWrapper.js");
/* harmony import */ var ngeo_offline_LocalforageAndroidWrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/offline/LocalforageAndroidWrapper */ "./src/offline/LocalforageAndroidWrapper.js");
/* harmony import */ var ngeo_offline_LocalforageIosWrapper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/offline/LocalforageIosWrapper */ "./src/offline/LocalforageIosWrapper.js");
/* harmony import */ var ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/CustomEvent */ "./src/CustomEvent.js");
/* harmony import */ var ngeo_offline_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/offline/utils */ "./src/offline/utils.js");
/* harmony import */ var localforage_src_localforage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! localforage/src/localforage */ "./node_modules/localforage/src/localforage.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

















var _default = function (_olObservable) {
  _default.$inject = ["$rootScope", "ngeoBackgroundLayerMgr", "ngeoOfflineGutter"];
  function _default($rootScope, ngeoBackgroundLayerMgr, ngeoOfflineGutter) {
    var _this;
    _this = _olObservable.call(this) || this;
    _this.localforage_ = _this.createLocalforage();
    _this.configureLocalforage();
    _this.rootScope_ = $rootScope;
    _this.hasData = false;
    _this.initializeHasOfflineData();
    _this.ngeoBackgroundLayerMgr_ = ngeoBackgroundLayerMgr;
    _this.serDes_ = new ngeo_offline_SerializerDeserializer__WEBPACK_IMPORTED_MODULE_10__["default"]({
      gutter: ngeoOfflineGutter
    });
    _this.gutter_ = ngeoOfflineGutter;
    return _this;
  }
  _inheritsLoose(_default, _olObservable);
  var _proto = _default.prototype;
  _proto.dispatchProgress_ = function dispatchProgress_(progress) {
    this.dispatchEvent(new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_14__["default"]('progress', {
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
      return new ngeo_offline_LocalforageCordovaWrapper__WEBPACK_IMPORTED_MODULE_11__["default"]();
    } else if (location.search.includes('localforage=android')) {
      console.log('Using android localforage');
      return new ngeo_offline_LocalforageAndroidWrapper__WEBPACK_IMPORTED_MODULE_12__["default"]();
    } else if (location.search.includes('localforage=ios')) {
      console.log('Using ios localforage');
      return new ngeo_offline_LocalforageIosWrapper__WEBPACK_IMPORTED_MODULE_13__["default"]();
    }
    return localforage_src_localforage__WEBPACK_IMPORTED_MODULE_16__["default"];
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
      return this.setItem(Object(ngeo_offline_utils__WEBPACK_IMPORTED_MODULE_15__["normalizeURL"])(tile.url), tile.response);
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
    if (source instanceof ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_7__["default"] && source.getUrl() && source.getImageLoadFunction() === ol_source_Image__WEBPACK_IMPORTED_MODULE_6__["defaultImageLoadFunction"]) {
      var tileGrid = Object(ol_tilegrid__WEBPACK_IMPORTED_MODULE_9__["createForProjection"])(source.getProjection() || projection, 42, 256);
      var attributions = source.getAttributions() || '';
      var url = source.getUrl();
      if (!url || !attributions) {
        throw new Error('Invalid values');
      }
      source = new ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_8__["default"]({
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
      if (layer instanceof ol_layer_Layer__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        var extentByZoom = _this3.getExtentByZoom(map, layer, ancestors, userExtent);
        var projection = ol_proj__WEBPACK_IMPORTED_MODULE_5__["get"](map.getView().getProjection());
        var source = _this3.sourceImageWMSToTileWMS(layer.getSource(), projection);
        var layerType;
        var layerSerialization;
        if (layer instanceof ol_layer_Tile__WEBPACK_IMPORTED_MODULE_3__["default"] || layer instanceof ol_layer_Image__WEBPACK_IMPORTED_MODULE_4__["default"]) {
          layerType = 'tile';
          layerSerialization = _this3.serDes_.serializeTileLayer(layer, source);
        } else if (layer instanceof ol_layer_Vector__WEBPACK_IMPORTED_MODULE_2__["default"]) {
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
      Object(ngeo_offline_utils__WEBPACK_IMPORTED_MODULE_15__["traverseLayer"])(root, [], visitLayer);
    });
    return layersItems;
  };
  _proto.createTileLoadFunction_ = function createTileLoadFunction_(offlineLayer) {
    var _this4 = this;
    var tileLoadFunction = function tileLoadFunction(imageTile, src) {
      _this4.getItem(Object(ngeo_offline_utils__WEBPACK_IMPORTED_MODULE_15__["normalizeURL"])(src)).then(function (content) {
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
}(ol_Observable__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/offline/Downloader.js":
/*!***********************************!*\
  !*** ./src/offline/Downloader.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/has */ "./node_modules/ol/has.js");
/* harmony import */ var ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/source/TileWMS */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_source_WMTS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/source/WMTS */ "./node_modules/ol/source/WMTS.js");
/* harmony import */ var ngeo_offline_TilesDownloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/offline/TilesDownloader */ "./src/offline/TilesDownloader.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





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
    console.assert(source instanceof ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_1__["default"] || source instanceof ol_source_WMTS__WEBPACK_IMPORTED_MODULE_2__["default"]);
    var projection = map.getView().getProjection();
    var tileGrid = source.getTileGrid();
    var tileUrlFunction = source.getTileUrlFunction();
    console.assert(extentByZoom);
    var _loop = function _loop() {
      var extentZoom = _step.value;
      var z = extentZoom.zoom;
      var extent = extentZoom.extent;
      var queueByZ = [];
      var minX;
      var minY;
      var maxX;
      var maxY;
      tileGrid.forEachTileCoord(extent, z, function (coord) {
        maxX = coord[1];
        maxY = coord[2];
        if (minX === undefined || minY === undefined) {
          minX = coord[1];
          minY = coord[2];
        }
        var url = tileUrlFunction(coord, ol_has__WEBPACK_IMPORTED_MODULE_0__["DEVICE_PIXEL_RATIO"], projection);
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
    this.tileDownloader_ = new ngeo_offline_TilesDownloader__WEBPACK_IMPORTED_MODULE_3__["default"](queue, this.configuration_, maxDownloads);
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
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper */ "./src/offline/AbstractLocalforageWrapper.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var exports = function (_AbstractWrapper) {
  function AndroidWrapper() {
    var _this;
    _this = _AbstractWrapper.call(this) || this;
    window.androidWrapper = _this;
    return _this;
  }
  _inheritsLoose(AndroidWrapper, _AbstractWrapper);
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
}(ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__["default"]);
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
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper */ "./src/offline/AbstractLocalforageWrapper.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var exports = function (_AbstractWrapper) {
  function CordovaWrapper() {
    var _this;
    _this = _AbstractWrapper.call(this) || this;
    window.addEventListener('message', _this.receiveMessage.bind(_this), false);
    return _this;
  }
  _inheritsLoose(CordovaWrapper, _AbstractWrapper);
  var _proto = CordovaWrapper.prototype;
  _proto.postToBackend = function postToBackend(action) {
    window.parent.postMessage(action, '*');
  };
  return CordovaWrapper;
}(ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__["default"]);
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
/* harmony import */ var ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/AbstractLocalforageWrapper */ "./src/offline/AbstractLocalforageWrapper.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var exports = function (_AbstractWrapper) {
  function IosWrapper() {
    var _this;
    _this = _AbstractWrapper.call(this) || this;
    window.iosWrapper = _this;
    return _this;
  }
  _inheritsLoose(IosWrapper, _AbstractWrapper);
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
}(ngeo_offline_AbstractLocalforageWrapper__WEBPACK_IMPORTED_MODULE_0__["default"]);
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
/* harmony import */ var ol_layer_Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/dom */ "./node_modules/ol/dom.js");
/* harmony import */ var ol_has__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/has */ "./node_modules/ol/has.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var Mask = function (_Layer) {
  function Mask(layerOptions, maskOptions) {
    var _this;
    if (layerOptions === void 0) {
      layerOptions = {};
    }
    if (maskOptions === void 0) {
      maskOptions = {};
    }
    _this = _Layer.call(this, layerOptions) || this;
    _this.context_ = Object(ol_dom__WEBPACK_IMPORTED_MODULE_1__["createCanvasContext2D"])();
    _this.context_.canvas.style.opacity = '0.5';
    _this.context_.canvas.style.position = 'absolute';
    _this.margin_ = maskOptions.margin || 100;
    _this.extentInMeters_ = maskOptions.extentInMeters || 0;
    return _this;
  }
  _inheritsLoose(Mask, _Layer);
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
      extentLength = ol_has__WEBPACK_IMPORTED_MODULE_2__["DEVICE_PIXEL_RATIO"] * this.extentInMeters_ / frameState.viewState.resolution;
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
}(ol_layer_Layer__WEBPACK_IMPORTED_MODULE_0__["default"]);


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
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
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
Service.module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(name, [ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_0__["default"].name]);
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
/* harmony import */ var ngeo_map_BackgroundLayerMgr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/map/BackgroundLayerMgr */ "./src/map/BackgroundLayerMgr.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


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
Restorer.module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module(name, [ngeo_map_BackgroundLayerMgr__WEBPACK_IMPORTED_MODULE_0__["default"].name]).service(name, Restorer);
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
/* harmony import */ var ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/tilegrid/TileGrid */ "./node_modules/ol/tilegrid/TileGrid.js");
/* harmony import */ var ol_tilegrid_WMTS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/tilegrid/WMTS */ "./node_modules/ol/tilegrid/WMTS.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/TileWMS */ "./node_modules/ol/source/TileWMS.js");
/* harmony import */ var ol_source_WMTS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/WMTS */ "./node_modules/ol/source/WMTS.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");






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
    return new ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_0__["default"](options);
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
    return new ol_tilegrid_WMTS__WEBPACK_IMPORTED_MODULE_1__["default"](options);
  };
  _proto.serializeSourceTileWMS = function serializeSourceTileWMS(source) {
    var obj = this.createBaseObject_(source);
    obj.params = source.getParams();
    obj.urls = source.getUrls();
    obj.tileGrid = this.serializeTilegrid(source.getTileGrid());
    var projection = source.getProjection();
    if (projection) {
      obj.projection = ol_proj__WEBPACK_IMPORTED_MODULE_2__["get"](source.getProjection()).getCode();
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
    return new ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_3__["default"](options);
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
      obj.projection = ol_proj__WEBPACK_IMPORTED_MODULE_2__["get"](source.getProjection()).getCode();
    }
    return JSON.stringify(obj);
  };
  _proto.deserializeSourceWMTS = function deserializeSourceWMTS(serialization, tileLoadFunction) {
    var options = JSON.parse(serialization);
    options.tileLoadFunction = tileLoadFunction;
    if (options.tileGrid) {
      options.tileGrid = this.deserializeTilegridWMTS(options.tileGrid);
    }
    return new ol_source_WMTS__WEBPACK_IMPORTED_MODULE_4__["default"](options);
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
    if (source instanceof ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      obj.source = this.serializeSourceTileWMS(source);
      obj.sourceType = 'tileWMS';
    } else if (source instanceof ol_source_WMTS__WEBPACK_IMPORTED_MODULE_4__["default"]) {
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
    return new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_5__["default"](options);
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
__p += '<div class="main-button">\n  <span ng-if="!$ctrl.hasData()">\n    <div class="no-data fas fa-arrow-circle-down" ng-click="$ctrl.toggleViewExtentSelection()"></div>\n  </span>\n  <span ng-if="$ctrl.hasData()">\n    <div class="with-data fas fa-arrow-circle-down" ng-click="$ctrl.showMenu()"></div>\n  </span>\n</div>\n\n<div\n  ng-if="$ctrl.selectingExtent && !$ctrl.networkStatus.isDisconnected()"\n  class="validate-extent btn btn-primary"\n>\n  <div ng-if="!$ctrl.downloading" ng-click="$ctrl.computeSizeAndDisplayAlertLoadData()" translate>\n    Save map\n  </div>\n  <div ng-if="$ctrl.downloading" ng-click="$ctrl.askAbortDownload()" translate>Abort</div>\n</div>\n\n<div ng-if="$ctrl.downloading" class="in-progress">\n  <div>{{$ctrl.progressPercents}}%</div>\n</div>\n\n<ngeo-modal ng-model="$ctrl.menuDisplayed">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-label="{{\'Close\' | translate}}">\n      <span aria-hidden="true">&times;</span>\n    </button>\n    <h4 class="modal-title" translate>Offline map</h4>\n  </div>\n  <div class="modal-body">\n    <div ng-if="$ctrl.hasData()">\n      <button\n        type="button"\n        class="extent-zoom btn btn-default"\n        ng-if="!$ctrl.offlineMode.isEnabled()"\n        ng-click="$ctrl.activateOfflineMode()"\n        translate\n      >\n        Activate offline mode\n      </button>\n      <button\n        type="button"\n        class="extent-zoom btn btn-default"\n        ng-if="$ctrl.offlineMode.isEnabled() && !$ctrl.networkStatus.isDisconnected()"\n        ng-click="$ctrl.deactivateOfflineMode()"\n        translate\n      >\n        Deactivate offline mode\n      </button>\n\n      <button\n        type="button"\n        class="extent-show btn btn-default"\n        ng-if="$ctrl.offlineMode.isEnabled()"\n        ng-click="$ctrl.toggleExtentVisibility()"\n      >\n        <span ng-if="$ctrl.isExtentVisible()" translate>Hide extent</span>\n        <span ng-if="!$ctrl.isExtentVisible()" translate>Show extent</span>\n      </button>\n      <button\n        type="button"\n        class="delete btn btn-default"\n        ng-if="!$ctrl.networkStatus.isDisconnected()"\n        ng-click="$ctrl.displayAlertDestroyData = true"\n        translate\n      >\n        Delete data\n      </button>\n    </div>\n    <div ng-if="!$ctrl.hasData() && !$ctrl.networkStatus.isDisconnected()">\n      <button\n        type="button"\n        class="new-data btn btn-default"\n        ng-click="$ctrl.toggleViewExtentSelection()"\n        translate\n      >\n        Save new map\n      </button>\n    </div>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertLoadData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n    <p translate>\n      ~{{$ctrl.estimatedLoadDataSize}}MB of maps will be downloaded (until scale 1:25\'000) - Don\'t lock your\n      device or navigate away from this site during the download process. Deactivate "private" mode of your\n      browser.\n    </p>\n    <button\n      type="button"\n      class="validate btn btn-primary"\n      data-dismiss="modal"\n      ng-click="$ctrl.validateExtent()"\n      translate\n    >\n      Ok\n    </button>\n    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Cancel</button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertNoLayer">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n    <p translate>No maps selected for saving.</p>\n    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Ok</button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertDestroyData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n    <p translate>Do you really want to remove your data ?</p>\n    <button\n      type="button"\n      class="validate btn btn-primary"\n      data-dismiss="modal"\n      ng-click="$ctrl.deleteData()"\n      translate\n    >\n      Ok\n    </button>\n    <button type="button" class="delete btn btn-default" data-dismiss="modal" translate>Cancel</button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertAbortDownload">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n    <p translate>Do you really want to remove your data ?</p>\n    <button\n      type="button"\n      class="validate btn btn-primary"\n      data-dismiss="modal"\n      ng-click="$ctrl.abortDownload()"\n      translate\n    >\n      Ok\n    </button>\n    <button\n      type="button"\n      class="delete btn btn-default"\n      data-dismiss="modal"\n      ng-click="$ctrl.followDownloadProgression_()"\n      translate\n    >\n      Cancel\n    </button>\n  </div>\n</ngeo-modal>\n';

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
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_message_modalComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/message/modalComponent */ "./src/message/modalComponent.js");
/* harmony import */ var ngeo_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/utils */ "./src/utils.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_has__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/has */ "./node_modules/ol/has.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Mask__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Mask */ "./src/offline/Mask.js");









var myModule = angular__WEBPACK_IMPORTED_MODULE_7___default.a.module('ngeoOffline', [ngeo_message_modalComponent__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
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
  Controller.$inject = ["$timeout", "ngeoOfflineServiceManager", "ngeoOfflineConfiguration", "ngeoOfflineMode", "ngeoNetworkStatus"];
  function Controller($timeout, ngeoOfflineServiceManager, ngeoOfflineConfiguration, ngeoOfflineMode, ngeoNetworkStatus) {
    var _this = this;
    this.$timeout_ = $timeout;
    this.maskLayer_ = undefined;
    this.ngeoOfflineServiceManager_ = ngeoOfflineServiceManager;
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
    this.offlineMode = ngeoOfflineMode;
    this.networkStatus = ngeoNetworkStatus;
    this.map;
    this.extentSize = 0;
    this.featuresOverlay_ = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_0__["default"].getFeatureOverlay();
    this.overlayCollection_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
    this.maskLayer_ = new _Mask__WEBPACK_IMPORTED_MODULE_8__["default"]({
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
      var feature = new ol_Feature__WEBPACK_IMPORTED_MODULE_4__["default"](this.dataPolygon_);
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
    return new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_5__["default"]([Object(ngeo_utils__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(projExtent), Object(ngeo_utils__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(extent)], 'XY');
  };
  _proto.getDowloadExtent_ = function getDowloadExtent_() {
    var center = this.map.getView().getCenter();
    var halfLength = Math.ceil(this.extentSize || this.getExtentSize_()) / 2;
    return this.maskLayer_.createExtent(center, halfLength);
  };
  _proto.getExtentSize_ = function getExtentSize_() {
    var mapSize = this.map.getSize() || [150, 150];
    var maskSizePixel = ol_has__WEBPACK_IMPORTED_MODULE_6__["DEVICE_PIXEL_RATIO"] * Math.min(mapSize[0], mapSize[1]) - this.maskMargin * 2;
    var maskSizeMeter = maskSizePixel * (this.map.getView().getResolution() || 1) / ol_has__WEBPACK_IMPORTED_MODULE_6__["DEVICE_PIXEL_RATIO"];
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
/* harmony import */ var ngeo_offline_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/offline/component */ "./src/offline/component.js");
/* harmony import */ var ngeo_offline_NetworkStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/offline/NetworkStatus */ "./src/offline/NetworkStatus.js");
/* harmony import */ var ngeo_offline_ServiceManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/offline/ServiceManager */ "./src/offline/ServiceManager.js");
/* harmony import */ var ngeo_offline_Downloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/offline/Downloader */ "./src/offline/Downloader.js");
/* harmony import */ var ngeo_offline_Restorer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/offline/Restorer */ "./src/offline/Restorer.js");
/* harmony import */ var ngeo_offline_Mode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/offline/Mode */ "./src/offline/Mode.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_6__);







var exports = angular__WEBPACK_IMPORTED_MODULE_6___default.a.module('ngeoOfflineModule', [ngeo_offline_component__WEBPACK_IMPORTED_MODULE_0__["default"].name, ngeo_offline_NetworkStatus__WEBPACK_IMPORTED_MODULE_1__["default"].module.name, ngeo_offline_ServiceManager__WEBPACK_IMPORTED_MODULE_2__["default"].module.name, ngeo_offline_Downloader__WEBPACK_IMPORTED_MODULE_3__["default"].module.name, ngeo_offline_Restorer__WEBPACK_IMPORTED_MODULE_4__["default"].module.name, ngeo_offline_Mode__WEBPACK_IMPORTED_MODULE_5__["default"].module.name]);
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
/* harmony import */ var ol_layer_Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Group */ "./node_modules/ol/layer/Group.js");

function traverseLayer(layer, ancestors, visitor) {
  var descend = visitor(layer, ancestors);
  if (descend && layer instanceof ol_layer_Group__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    layer.getLayers().forEach(function (childLayer) {
      traverseLayer(childLayer, [].concat(ancestors, [layer]), visitor);
    });
  }
}
var extractor = new RegExp('[^/]*//[^/]+/(.*)');
function normalizeURL(url) {
  var matches = extractor.exec(url);
  if (!matches) {
    throw new Error('Could not normalize url ' + url);
  }
  return matches[1];
}

/***/ }),

/***/ 31:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01hc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1Jlc3RvcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvU2VydmljZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvVGlsZXNEb3dubG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm9mZmxpbmVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMxLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDI1IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuaW1wb3J0ICcuL29mZmxpbmUuY3NzJztcbmltcG9ydCAnLi9jb21tb25fZGVwZW5kZW5jaWVzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9PZmZsaW5lTW9kdWxlIGZyb20gJ25nZW8vb2ZmbGluZS9tb2R1bGUnO1xuaW1wb3J0IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiBmcm9tICduZ2VvL29mZmxpbmUvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBOZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlcic7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzJykuZGVmYXVsdH0gbmdlb05ldHdvcmtTdGF0dXMgbmdlbyBuZXR3b3JrIHN0YXR1cyBzZXJ2aWNlLlxuICAgKiBAcGFyYW0ge05nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJ9IG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIgbmdlbyBvZmZsaW5lIHNlcnZpY2UuXG4gICAqIEBuZ0luamVjdFxuICAgKi9cbiAgY29uc3RydWN0b3Iobmdlb05ldHdvcmtTdGF0dXMsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIpIHtcbiAgICAvKipcbiAgICAgKiBTYXZlIGEgc3F1YXJlIG9mIDEwIGttIHNpZGV3YXlzIChNYXAncyB1bml0IGlzIHRoZSBtZXRlcikuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBleHBvcnRcbiAgICAgKi9cbiAgICB0aGlzLm9mZmxpbmVFeHRlbnRTaXplID0gMTAwMDA7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7bmdlb05ldHdvcmtTdGF0dXN9XG4gICAgICogQGV4cG9ydFxuICAgICAqL1xuICAgIHRoaXMubmdlb05ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtvbE1hcH1cbiAgICAgKiBAZXhwb3J0XG4gICAgICovXG4gICAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgICAgbGF5ZXJzOiBbXG4gICAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICAgIGNlbnRlcjogWzM1MjM3OSwgNTE3MjczM10sXG4gICAgICAgIHpvb206IDQsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcblxuICAgIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIuc2V0U2F2ZVNlcnZpY2UoJ29mZmxpbmVEb3dubG9hZGVyJyk7XG4gICAgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5zZXRSZXN0b3JlU2VydmljZSgnbmdlb09mZmxpbmVSZXN0b3JlcicpO1xuICB9XG59XG5cbi8qKiBAdHlwZSB7IWFuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mTWFwQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9PZmZsaW5lTW9kdWxlLm5hbWUsXG4gIE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWUsXG5dKTtcblxubXlNb2R1bGUudmFsdWUoJ25nZW9PZmZsaW5lVGVzdFVybCcsICcuLi8uLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuaHRtbCcpO1xuXG4vLyBEZWZpbmUgdGhlIG9mZmxpbmUgZG93bmxvYWQgY29uZmlndXJhdGlvbiBzZXJ2aWNlXG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24nLCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pO1xuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcblxubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9UaWxlc1ByZWxvYWRpbmdMaW1pdCcsIDApO1xuXG5vcHRpb25zKG15TW9kdWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRyb2xsZXI7XG4iLCJ2YXIgZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIoKSB7XG4gICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuY3VycmVudElkXyA9IDA7XG4gIH1cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnc2V0SXRlbSddLmNvbmNhdChhcmdzKSk7XG4gIH07XG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnZ2V0SXRlbSddLmNvbmNhdChhcmdzKSk7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbignY2xlYXInKTtcbiAgfTtcbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnY29uZmlnJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbihjb21tYW5kKSB7XG4gICAgdmFyIGlkID0gKyt0aGlzLmN1cnJlbnRJZF87XG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICBwbHVnaW46ICdsb2NhbGZvcmFnZScsXG4gICAgICBjb21tYW5kOiBjb21tYW5kLFxuICAgICAgYXJnczogYXJncyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGNvbnRleHQ6IG51bGxcbiAgICB9O1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHtcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoX2FueSkge30sXG4gICAgICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChfYW55KSB7fVxuICAgIH07XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uc2V0KGlkLCB3YWl0aW5nUHJvbWlzZSk7XG4gICAgdGhpcy5wb3N0VG9CYWNrZW5kKGFjdGlvbik7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG4gIF9wcm90by5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIHJlY2VpdmVNZXNzYWdlKGV2ZW50KSB7XG4gICAgdmFyIGFjdGlvbiA9IGV2ZW50LmRhdGE7XG4gICAgdmFyIGlkID0gYWN0aW9uLmlkO1xuICAgIHZhciBjb21tYW5kID0gYWN0aW9uLmNvbW1hbmQ7XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb24uYXJncyB8fCBbXTtcbiAgICB2YXIgY29udGV4dCA9IGFjdGlvbi5jb250ZXh0O1xuICAgIHZhciBtc2cgPSBhY3Rpb24ubXNnO1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHRoaXMud2FpdGluZ1Byb21pc2VzXy5nZXQoaWQpO1xuICAgIGlmIChjb21tYW5kID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYXJncywgY29udGV4dCk7XG4gICAgICBpZiAod2FpdGluZ1Byb21pc2UpIHtcbiAgICAgICAgd2FpdGluZ1Byb21pc2UucmVqZWN0KGFyZ3MsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdyZXNwb25zZScpIHtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlc29sdmUuYXBwbHkod2FpdGluZ1Byb21pc2UsIGFyZ3MpO1xuICAgICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBjb21tYW5kJywgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLCBudWxsLCAnXFx0JykpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge307XG4gIHJldHVybiBBYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlcjtcbn0oKTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2UodCwgbykgeyB0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoby5wcm90b3R5cGUpLCB0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHQsIF9zZXRQcm90b3R5cGVPZih0LCBvKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKHQsIGUpIHsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gdC5fX3Byb3RvX18gPSBlLCB0OyB9LCBfc2V0UHJvdG90eXBlT2YodCwgZSk7IH1cbmltcG9ydCBvbE9ic2VydmFibGUgZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgb2xMYXllckxheWVyIGZyb20gJ29sL2xheWVyL0xheWVyJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZSc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qJztcbmltcG9ydCB7IGRlZmF1bHRJbWFnZUxvYWRGdW5jdGlvbiB9IGZyb20gJ29sL3NvdXJjZS9JbWFnZSc7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JQcm9qZWN0aW9uIGFzIGNyZWF0ZVRpbGVHcmlkRm9yUHJvamVjdGlvbiB9IGZyb20gJ29sL3RpbGVncmlkJztcbmltcG9ydCBTZXJpYWxpemVyRGVzZXJpYWxpemVyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJpYWxpemVyRGVzZXJpYWxpemVyJztcbmltcG9ydCBMb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyJztcbmltcG9ydCBMb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyJztcbmltcG9ydCBMb2NhbGZvcmFnZUlvc1dyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlSW9zV3JhcHBlcic7XG5pbXBvcnQgbmdlb0N1c3RvbUV2ZW50IGZyb20gJ25nZW8vQ3VzdG9tRXZlbnQnO1xuaW1wb3J0IHsgbm9ybWFsaXplVVJMLCB0cmF2ZXJzZUxheWVyIH0gZnJvbSAnbmdlby9vZmZsaW5lL3V0aWxzJztcbmltcG9ydCBsb2NhbGZvcmFnZSBmcm9tICdsb2NhbGZvcmFnZS9zcmMvbG9jYWxmb3JhZ2UnO1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9vbE9ic2VydmFibGUpIHtcbiAgX2RlZmF1bHQuJGluamVjdCA9IFtcIiRyb290U2NvcGVcIiwgXCJuZ2VvQmFja2dyb3VuZExheWVyTWdyXCIsIFwibmdlb09mZmxpbmVHdXR0ZXJcIl07XG4gIGZ1bmN0aW9uIF9kZWZhdWx0KCRyb290U2NvcGUsIG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3IsIG5nZW9PZmZsaW5lR3V0dGVyKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF90aGlzID0gX29sT2JzZXJ2YWJsZS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMubG9jYWxmb3JhZ2VfID0gX3RoaXMuY3JlYXRlTG9jYWxmb3JhZ2UoKTtcbiAgICBfdGhpcy5jb25maWd1cmVMb2NhbGZvcmFnZSgpO1xuICAgIF90aGlzLnJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIF90aGlzLmhhc0RhdGEgPSBmYWxzZTtcbiAgICBfdGhpcy5pbml0aWFsaXplSGFzT2ZmbGluZURhdGEoKTtcbiAgICBfdGhpcy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXyA9IG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3I7XG4gICAgX3RoaXMuc2VyRGVzXyA9IG5ldyBTZXJpYWxpemVyRGVzZXJpYWxpemVyKHtcbiAgICAgIGd1dHRlcjogbmdlb09mZmxpbmVHdXR0ZXJcbiAgICB9KTtcbiAgICBfdGhpcy5ndXR0ZXJfID0gbmdlb09mZmxpbmVHdXR0ZXI7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfb2xPYnNlcnZhYmxlKTtcbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcbiAgX3Byb3RvLmRpc3BhdGNoUHJvZ3Jlc3NfID0gZnVuY3Rpb24gZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IG5nZW9DdXN0b21FdmVudCgncHJvZ3Jlc3MnLCB7XG4gICAgICAncHJvZ3Jlc3MnOiBwcm9ncmVzc1xuICAgIH0pKTtcbiAgfTtcbiAgX3Byb3RvLmluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIGluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB0aGlzLmdldEl0ZW0oJ29mZmxpbmVfY29udGVudCcpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLnNldEhhc09mZmxpbmVEYXRhKCEhdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uaGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBoYXNPZmZsaW5lRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNEYXRhO1xuICB9O1xuICBfcHJvdG8uc2V0SGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBzZXRIYXNPZmZsaW5lRGF0YSh2YWx1ZSkge1xuICAgIHZhciBuZWVkRGlnZXN0ID0gdmFsdWUgIT09IHRoaXMuaGFzRGF0YTtcbiAgICB0aGlzLmhhc0RhdGEgPSB2YWx1ZTtcbiAgICBpZiAobmVlZERpZ2VzdCkge1xuICAgICAgdGhpcy5yb290U2NvcGVfLiRhcHBseUFzeW5jKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udHJhY2VHZXRTZXRJdGVtID0gZnVuY3Rpb24gdHJhY2VHZXRTZXRJdGVtKG1zZywga2V5LCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG4gIF9wcm90by5jcmVhdGVMb2NhbGZvcmFnZSA9IGZ1bmN0aW9uIGNyZWF0ZUxvY2FsZm9yYWdlKCkge1xuICAgIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWNvcmRvdmEnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGNvcmRvdmEgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlcigpO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1hbmRyb2lkJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBhbmRyb2lkIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9aW9zJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBpb3MgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VJb3NXcmFwcGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBsb2NhbGZvcmFnZTtcbiAgfTtcbiAgX3Byb3RvLmNvbmZpZ3VyZUxvY2FsZm9yYWdlID0gZnVuY3Rpb24gY29uZmlndXJlTG9jYWxmb3JhZ2UoKSB7XG4gICAgdGhpcy5sb2NhbGZvcmFnZV8uY29uZmlnKHtcbiAgICAgICduYW1lJzogJ25nZW9PZmZsaW5lU3RvcmFnZScsXG4gICAgICAndmVyc2lvbic6IDEuMCxcbiAgICAgICdzdG9yZU5hbWUnOiAnb2ZmbGluZVN0b3JhZ2UnXG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbShrZXkpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydnZXRJdGVtJ10oa2V5KTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ2dldEl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuICBfcHJvdG8ucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oa2V5KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlX1sncmVtb3ZlSXRlbSddKGtleSk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdyZW1vdmVJdGVtJywga2V5LCBwcm9taXNlKTtcbiAgfTtcbiAgX3Byb3RvLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydzZXRJdGVtJ10oa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdzZXRJdGVtJywga2V5LCBwcm9taXNlKTtcbiAgfTtcbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5zZXRIYXNPZmZsaW5lRGF0YShmYWxzZSk7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlXy5jbGVhcigpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnY2xlYXInLCAnJywgcHJvbWlzZSk7XG4gIH07XG4gIF9wcm90by5lc3RpbWF0ZUxvYWREYXRhU2l6ZSA9IGZ1bmN0aW9uIGVzdGltYXRlTG9hZERhdGFTaXplKG1hcCkge1xuICAgIHJldHVybiA1MDtcbiAgfTtcbiAgX3Byb3RvLmdldExheWVyS2V5ID0gZnVuY3Rpb24gZ2V0TGF5ZXJLZXkobGF5ZXJJdGVtKSB7XG4gICAgcmV0dXJuIGxheWVySXRlbS5sYXllci5nZXQoJ2xhYmVsJyk7XG4gIH07XG4gIF9wcm90by5vblRpbGVEb3dubG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZFN1Y2Nlc3MocHJvZ3Jlc3MsIHRpbGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcbiAgICBpZiAodGlsZS5yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0SXRlbShub3JtYWxpemVVUkwodGlsZS51cmwpLCB0aWxlLnJlc3BvbnNlKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuICBfcHJvdG8ub25UaWxlRG93bmxvYWRFcnJvciA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkRXJyb3IocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG4gIF9wcm90by5nZXRFeHRlbnRCeVpvb20gPSBmdW5jdGlvbiBnZXRFeHRlbnRCeVpvb20obWFwLCBsYXllciwgYW5jZXN0b3JzLCB1c2VyRXh0ZW50KSB7XG4gICAgdmFyIGN1cnJlbnRab29tID0gbWFwLmdldFZpZXcoKS5nZXRab29tKCk7XG4gICAgaWYgKGN1cnJlbnRab29tID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjdXJyZW50Wm9vbScpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIFswLCAxLCAyLCAzLCA0XS5mb3JFYWNoKGZ1bmN0aW9uIChkeikge1xuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgem9vbTogY3VycmVudFpvb20gKyBkeixcbiAgICAgICAgZXh0ZW50OiB1c2VyRXh0ZW50XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcbiAgX3Byb3RvLnNvdXJjZUltYWdlV01TVG9UaWxlV01TID0gZnVuY3Rpb24gc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMoc291cmNlLCBwcm9qZWN0aW9uKSB7XG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlSW1hZ2VXTVMgJiYgc291cmNlLmdldFVybCgpICYmIHNvdXJjZS5nZXRJbWFnZUxvYWRGdW5jdGlvbigpID09PSBkZWZhdWx0SW1hZ2VMb2FkRnVuY3Rpb24pIHtcbiAgICAgIHZhciB0aWxlR3JpZCA9IGNyZWF0ZVRpbGVHcmlkRm9yUHJvamVjdGlvbihzb3VyY2UuZ2V0UHJvamVjdGlvbigpIHx8IHByb2plY3Rpb24sIDQyLCAyNTYpO1xuICAgICAgdmFyIGF0dHJpYnV0aW9ucyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGlvbnMoKSB8fCAnJztcbiAgICAgIHZhciB1cmwgPSBzb3VyY2UuZ2V0VXJsKCk7XG4gICAgICBpZiAoIXVybCB8fCAhYXR0cmlidXRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZXMnKTtcbiAgICAgIH1cbiAgICAgIHNvdXJjZSA9IG5ldyBvbFNvdXJjZVRpbGVXTVMoe1xuICAgICAgICBndXR0ZXI6IHRoaXMuZ3V0dGVyXyxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHRpbGVHcmlkOiB0aWxlR3JpZCxcbiAgICAgICAgYXR0cmlidXRpb25zOiBhdHRyaWJ1dGlvbnMsXG4gICAgICAgIHByb2plY3Rpb246IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCksXG4gICAgICAgIHBhcmFtczogc291cmNlLmdldFBhcmFtcygpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZUxheWVyTWV0YWRhdGFzID0gZnVuY3Rpb24gY3JlYXRlTGF5ZXJNZXRhZGF0YXMobWFwLCB1c2VyRXh0ZW50KSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdmFyIGxheWVyc0l0ZW1zID0gW107XG4gICAgdmFyIHZpc2l0TGF5ZXIgPSBmdW5jdGlvbiB2aXNpdExheWVyKGxheWVyLCBhbmNlc3RvcnMpIHtcbiAgICAgIGlmIChsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJMYXllcikge1xuICAgICAgICB2YXIgZXh0ZW50Qnlab29tID0gX3RoaXMzLmdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpO1xuICAgICAgICB2YXIgcHJvamVjdGlvbiA9IG9sUHJvai5nZXQobWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCkpO1xuICAgICAgICB2YXIgc291cmNlID0gX3RoaXMzLnNvdXJjZUltYWdlV01TVG9UaWxlV01TKGxheWVyLmdldFNvdXJjZSgpLCBwcm9qZWN0aW9uKTtcbiAgICAgICAgdmFyIGxheWVyVHlwZTtcbiAgICAgICAgdmFyIGxheWVyU2VyaWFsaXphdGlvbjtcbiAgICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllclRpbGUgfHwgbGF5ZXIgaW5zdGFuY2VvZiBvbExheWVySW1hZ2UpIHtcbiAgICAgICAgICBsYXllclR5cGUgPSAndGlsZSc7XG4gICAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uID0gX3RoaXMzLnNlckRlc18uc2VyaWFsaXplVGlsZUxheWVyKGxheWVyLCBzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllclZlY3Rvcikge1xuICAgICAgICAgIGxheWVyVHlwZSA9ICd2ZWN0b3InO1xuICAgICAgICB9XG4gICAgICAgIHZhciBiYWNrZ3JvdW5kTGF5ZXIgPSBfdGhpczMubmdlb0JhY2tncm91bmRMYXllck1ncl8uZ2V0KG1hcCkgPT09IGxheWVyO1xuICAgICAgICBsYXllcnNJdGVtcy5wdXNoKHtcbiAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IGJhY2tncm91bmRMYXllcixcbiAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICBleHRlbnRCeVpvb206IGV4dGVudEJ5Wm9vbSxcbiAgICAgICAgICBsYXllclR5cGU6IGxheWVyVHlwZSxcbiAgICAgICAgICBsYXllclNlcmlhbGl6YXRpb246IGxheWVyU2VyaWFsaXphdGlvbixcbiAgICAgICAgICBsYXllcjogbGF5ZXIsXG4gICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgYW5jZXN0b3JzOiBhbmNlc3RvcnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIG1hcC5nZXRMYXllcnMoKS5mb3JFYWNoKGZ1bmN0aW9uIChyb290KSB7XG4gICAgICB0cmF2ZXJzZUxheWVyKHJvb3QsIFtdLCB2aXNpdExheWVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGF5ZXJzSXRlbXM7XG4gIH07XG4gIF9wcm90by5jcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyA9IGZ1bmN0aW9uIGNyZWF0ZVRpbGVMb2FkRnVuY3Rpb25fKG9mZmxpbmVMYXllcikge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuICAgIHZhciB0aWxlTG9hZEZ1bmN0aW9uID0gZnVuY3Rpb24gdGlsZUxvYWRGdW5jdGlvbihpbWFnZVRpbGUsIHNyYykge1xuICAgICAgX3RoaXM0LmdldEl0ZW0obm9ybWFsaXplVVJMKHNyYykpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgY29udGVudCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQzBsRVFWUjQybU5rWUFBQUFBWUFBakNCMEM4QUFBQUFTVVZPUks1Q1lJST0nO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlVGlsZS5nZXRJbWFnZSgpLnNyYyA9IGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB0aWxlTG9hZEZ1bmN0aW9uO1xuICB9O1xuICBfcHJvdG8ucmVjcmVhdGVPZmZsaW5lTGF5ZXIgPSBmdW5jdGlvbiByZWNyZWF0ZU9mZmxpbmVMYXllcihvZmZsaW5lTGF5ZXIpIHtcbiAgICBpZiAob2ZmbGluZUxheWVyLmxheWVyVHlwZSA9PT0gJ3RpbGUnKSB7XG4gICAgICB2YXIgc2VyaWFsaXphdGlvbiA9IG9mZmxpbmVMYXllci5sYXllclNlcmlhbGl6YXRpb247XG4gICAgICBpZiAoc2VyaWFsaXphdGlvbikge1xuICAgICAgICB2YXIgdGlsZUxvYWRGdW5jdGlvbiA9IHRoaXMuY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8ob2ZmbGluZUxheWVyKTtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5zZXJEZXNfLmRlc2VyaWFsaXplVGlsZUxheWVyKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuICBfcHJvdG8uZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcyA9IGZ1bmN0aW9uIGdldE1heE51bWJlck9mUGFyYWxsZWxEb3dubG9hZHMoKSB7XG4gICAgcmV0dXJuIDExO1xuICB9O1xuICByZXR1cm4gX2RlZmF1bHQ7XG59KG9sT2JzZXJ2YWJsZSk7XG5leHBvcnQgeyBfZGVmYXVsdCBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShyLCBlKSB7IHZhciB0ID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIHJbU3ltYm9sLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTsgaWYgKHQpIHJldHVybiAodCA9IHQuY2FsbChyKSkubmV4dC5iaW5kKHQpOyBpZiAoQXJyYXkuaXNBcnJheShyKSB8fCAodCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSkgfHwgZSAmJiByICYmIFwibnVtYmVyXCIgPT0gdHlwZW9mIHIubGVuZ3RoKSB7IHQgJiYgKHIgPSB0KTsgdmFyIG8gPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbyA+PSByLmxlbmd0aCA/IHsgZG9uZTogITAgfSA6IHsgZG9uZTogITEsIHZhbHVlOiByW28rK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7IGlmIChyKSB7IGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7IHZhciB0ID0ge30udG9TdHJpbmcuY2FsbChyKS5zbGljZSg4LCAtMSk7IHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwOyB9IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHsgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpOyBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTsgcmV0dXJuIG47IH1cbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcyc7XG5pbXBvcnQgb2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TJztcbmltcG9ydCBvbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMnO1xuaW1wb3J0IFRpbGVzRG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvVGlsZXNEb3dubG9hZGVyJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuZnVuY3Rpb24gbWFnbml0dWRlMihhLCBiKSB7XG4gIHZhciBtYWduaXR1ZGVTcXVhcmVkID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgbWFnbml0dWRlU3F1YXJlZCArPSBNYXRoLnBvdyhhW2ldIC0gYltpXSwgMik7XG4gIH1cbiAgcmV0dXJuIG1hZ25pdHVkZVNxdWFyZWQ7XG59XG52YXIgRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgRG93bmxvYWRlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCJdO1xuICBmdW5jdGlvbiBEb3dubG9hZGVyKG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy50aWxlRG93bmxvYWRlcl8gPSBudWxsO1xuICB9XG4gIHZhciBfcHJvdG8gPSBEb3dubG9hZGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGhpcy50aWxlRG93bmxvYWRlcl8pIHtcbiAgICAgIHRoaXMudGlsZURvd25sb2FkZXJfLmNhbmNlbCgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnF1ZXVlTGF5ZXJUaWxlc18gPSBmdW5jdGlvbiBxdWV1ZUxheWVyVGlsZXNfKGxheWVyTWV0YWRhdGEsIHF1ZXVlKSB7XG4gICAgdmFyIHNvdXJjZSA9IGxheWVyTWV0YWRhdGEuc291cmNlO1xuICAgIHZhciBtYXAgPSBsYXllck1ldGFkYXRhLm1hcCxcbiAgICAgIGV4dGVudEJ5Wm9vbSA9IGxheWVyTWV0YWRhdGEuZXh0ZW50Qnlab29tO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUuYXNzZXJ0KHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlVGlsZVdNUyB8fCBzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVdNVFMpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gbWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgdmFyIHRpbGVHcmlkID0gc291cmNlLmdldFRpbGVHcmlkKCk7XG4gICAgdmFyIHRpbGVVcmxGdW5jdGlvbiA9IHNvdXJjZS5nZXRUaWxlVXJsRnVuY3Rpb24oKTtcbiAgICBjb25zb2xlLmFzc2VydChleHRlbnRCeVpvb20pO1xuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKCkge1xuICAgICAgdmFyIGV4dGVudFpvb20gPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciB6ID0gZXh0ZW50Wm9vbS56b29tO1xuICAgICAgdmFyIGV4dGVudCA9IGV4dGVudFpvb20uZXh0ZW50O1xuICAgICAgdmFyIHF1ZXVlQnlaID0gW107XG4gICAgICB2YXIgbWluWDtcbiAgICAgIHZhciBtaW5ZO1xuICAgICAgdmFyIG1heFg7XG4gICAgICB2YXIgbWF4WTtcbiAgICAgIHRpbGVHcmlkLmZvckVhY2hUaWxlQ29vcmQoZXh0ZW50LCB6LCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgbWF4WCA9IGNvb3JkWzFdO1xuICAgICAgICBtYXhZID0gY29vcmRbMl07XG4gICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQgfHwgbWluWSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbWluWCA9IGNvb3JkWzFdO1xuICAgICAgICAgIG1pblkgPSBjb29yZFsyXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gdGlsZVVybEZ1bmN0aW9uKGNvb3JkLCBERVZJQ0VfUElYRUxfUkFUSU8sIHByb2plY3Rpb24pO1xuICAgICAgICBjb25zb2xlLmFzc2VydCh1cmwpO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgdmFyIHRpbGUgPSB7XG4gICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHJlc3BvbnNlOiBudWxsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBxdWV1ZUJ5Wi5wdXNoKHRpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBjZW50ZXJUaWxlQ29vcmQgPSBbeiwgKG1pblggKyBtYXhYKSAvIDIsIChtaW5ZICsgbWF4WSkgLyAyXTtcbiAgICAgIHF1ZXVlQnlaLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIG1hZ25pdHVkZTIoYS5jb29yZCwgY2VudGVyVGlsZUNvb3JkKSAtIG1hZ25pdHVkZTIoYi5jb29yZCwgY2VudGVyVGlsZUNvb3JkKTtcbiAgICAgIH0pO1xuICAgICAgcXVldWUucHVzaC5hcHBseShxdWV1ZSwgcXVldWVCeVopO1xuICAgIH07XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShleHRlbnRCeVpvb20pLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgX2xvb3AoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5zYXZlID0gZnVuY3Rpb24gc2F2ZShleHRlbnQsIG1hcCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGxheWVyc01ldGFkYXRhcyA9IHRoaXMuY29uZmlndXJhdGlvbl8uY3JlYXRlTGF5ZXJNZXRhZGF0YXMobWFwLCBleHRlbnQpO1xuICAgIHZhciBwZXJzaXN0ZW50TGF5ZXJzID0gW107XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHpvb21zID0gW107XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobGF5ZXJzTWV0YWRhdGFzKSwgX3N0ZXAyOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIoKSkuZG9uZTspIHtcbiAgICAgIHZhciBsYXllckl0ZW0gPSBfc3RlcDIudmFsdWU7XG4gICAgICBpZiAobGF5ZXJJdGVtLmxheWVyVHlwZSA9PT0gJ3RpbGUnKSB7XG4gICAgICAgIHZhciB0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXVlTGF5ZXJUaWxlc18obGF5ZXJJdGVtLCB0aWxlcyk7XG4gICAgICAgIHF1ZXVlLnB1c2guYXBwbHkocXVldWUsIHRpbGVzKTtcbiAgICAgIH1cbiAgICAgIHBlcnNpc3RlbnRMYXllcnMucHVzaCh7XG4gICAgICAgIGJhY2tncm91bmRMYXllcjogbGF5ZXJJdGVtLmJhY2tncm91bmRMYXllcixcbiAgICAgICAgbGF5ZXJUeXBlOiBsYXllckl0ZW0ubGF5ZXJUeXBlLFxuICAgICAgICBsYXllclNlcmlhbGl6YXRpb246IGxheWVySXRlbS5sYXllclNlcmlhbGl6YXRpb24sXG4gICAgICAgIGtleTogdGhpcy5jb25maWd1cmF0aW9uXy5nZXRMYXllcktleShsYXllckl0ZW0pXG4gICAgICB9KTtcbiAgICAgIGxheWVySXRlbS5leHRlbnRCeVpvb20uZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciB6b29tID0gb2JqLnpvb207XG4gICAgICAgIGlmICghem9vbXMuaW5jbHVkZXMoem9vbSkpIHtcbiAgICAgICAgICB6b29tcy5wdXNoKHpvb20pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHBlcnNpc3RlbnRPYmplY3QgPSB7XG4gICAgICBleHRlbnQ6IGV4dGVudCxcbiAgICAgIGxheWVyczogcGVyc2lzdGVudExheWVycyxcbiAgICAgIHpvb21zOiB6b29tcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogMTtcbiAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgc2V0T2ZmbGluZUNvbnRlbnRQcm9taXNlID0gdGhpcy5jb25maWd1cmF0aW9uXy5zZXRJdGVtKCdvZmZsaW5lX2NvbnRlbnQnLCBwZXJzaXN0ZW50T2JqZWN0KTtcbiAgICB2YXIgbWF4RG93bmxvYWRzID0gdGhpcy5jb25maWd1cmF0aW9uXy5nZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzKCk7XG4gICAgdGhpcy50aWxlRG93bmxvYWRlcl8gPSBuZXcgVGlsZXNEb3dubG9hZGVyKHF1ZXVlLCB0aGlzLmNvbmZpZ3VyYXRpb25fLCBtYXhEb3dubG9hZHMpO1xuICAgIHZhciB0aWxlRG93bmxvYWRQcm9taXNlID0gdGhpcy50aWxlRG93bmxvYWRlcl8uZG93bmxvYWQoKTtcbiAgICB2YXIgYWxsUHJvbWlzZSA9IFByb21pc2UuYWxsKFtzZXRPZmZsaW5lQ29udGVudFByb21pc2UsIHRpbGVEb3dubG9hZFByb21pc2VdKTtcbiAgICB2YXIgc2V0SGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBzZXRIYXNPZmZsaW5lRGF0YSgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb25maWd1cmF0aW9uXy5zZXRIYXNPZmZsaW5lRGF0YSh0cnVlKTtcbiAgICB9O1xuICAgIGFsbFByb21pc2UudGhlbihzZXRIYXNPZmZsaW5lRGF0YSwgc2V0SGFzT2ZmbGluZURhdGEpO1xuICAgIHJldHVybiBhbGxQcm9taXNlO1xuICB9O1xuICByZXR1cm4gRG93bmxvYWRlcjtcbn0oKTtcbnZhciBuYW1lID0gJ29mZmxpbmVEb3dubG9hZGVyJztcbkRvd25sb2FkZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW10pLnNlcnZpY2UobmFtZSwgRG93bmxvYWRlcik7XG52YXIgZXhwb3J0cyA9IERvd25sb2FkZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHQsIG8pIHsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG8ucHJvdG90eXBlKSwgdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0LCBfc2V0UHJvdG90eXBlT2YodCwgbyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5pbXBvcnQgQWJzdHJhY3RXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9BYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlcic7XG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIGZ1bmN0aW9uIEFuZHJvaWRXcmFwcGVyKCkge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvdy5hbmRyb2lkV3JhcHBlciA9IF90aGlzO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShBbmRyb2lkV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG4gIHZhciBfcHJvdG8gPSBBbmRyb2lkV3JhcHBlci5wcm90b3R5cGU7XG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShhY3Rpb24pO1xuICAgIHdpbmRvdy5uZ2VvSG9zdC5wb3N0TWVzc2FnZVRvQW5kcm9pZChzdHJpbmdpZmllZCk7XG4gIH07XG4gIF9wcm90by5yZWNlaXZlRnJvbUFuZHJvaWQgPSBmdW5jdGlvbiByZWNlaXZlRnJvbUFuZHJvaWQoYWN0aW9uU3RyaW5nKSB7XG4gICAgdmFyIGFjdGlvbiA9IEpTT04ucGFyc2UoYWN0aW9uU3RyaW5nKTtcbiAgICB0aGlzLnJlY2VpdmVNZXNzYWdlKHtcbiAgICAgICdkYXRhJzogYWN0aW9uXG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBBbmRyb2lkV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2UodCwgbykgeyB0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoby5wcm90b3R5cGUpLCB0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHQsIF9zZXRQcm90b3R5cGVPZih0LCBvKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKHQsIGUpIHsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gdC5fX3Byb3RvX18gPSBlLCB0OyB9LCBfc2V0UHJvdG90eXBlT2YodCwgZSk7IH1cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyJztcbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgZnVuY3Rpb24gQ29yZG92YVdyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF90aGlzID0gX0Fic3RyYWN0V3JhcHBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfdGhpcy5yZWNlaXZlTWVzc2FnZS5iaW5kKF90aGlzKSwgZmFsc2UpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShDb3Jkb3ZhV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG4gIHZhciBfcHJvdG8gPSBDb3Jkb3ZhV3JhcHBlci5wcm90b3R5cGU7XG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKGFjdGlvbiwgJyonKTtcbiAgfTtcbiAgcmV0dXJuIENvcmRvdmFXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZSh0LCBvKSB7IHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShvLnByb3RvdHlwZSksIHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdCwgX3NldFByb3RvdHlwZU9mKHQsIG8pOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YodCwgZSkgeyByZXR1cm4gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0LCBlKSB7IHJldHVybiB0Ll9fcHJvdG9fXyA9IGUsIHQ7IH0sIF9zZXRQcm90b3R5cGVPZih0LCBlKTsgfVxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXInO1xudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoX0Fic3RyYWN0V3JhcHBlcikge1xuICBmdW5jdGlvbiBJb3NXcmFwcGVyKCkge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvdy5pb3NXcmFwcGVyID0gX3RoaXM7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIF9pbmhlcml0c0xvb3NlKElvc1dyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuICB2YXIgX3Byb3RvID0gSW9zV3JhcHBlci5wcm90b3R5cGU7XG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICBpZiAoYWN0aW9uLmNvbW1hbmQgPT09ICdzZXRJdGVtJykge1xuICAgICAgYWN0aW9uLmFyZ3NbMV0gPSBKU09OLnN0cmluZ2lmeShhY3Rpb24uYXJnc1sxXSk7XG4gICAgfVxuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuaW9zLnBvc3RNZXNzYWdlKHN0cmluZ2lmaWVkKTtcbiAgfTtcbiAgX3Byb3RvLnJlY2VpdmVGcm9tSW9zID0gZnVuY3Rpb24gcmVjZWl2ZUZyb21Jb3MoYWN0aW9uU3RyaW5nKSB7XG4gICAgdmFyIGFjdGlvbiA9IEpTT04ucGFyc2UoYWN0aW9uU3RyaW5nKTtcbiAgICB2YXIgYXJncyA9IGFjdGlvblsnYXJncyddIHx8IFtdO1xuICAgIGFjdGlvblsnYXJncyddID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgJ2RhdGEnOiBhY3Rpb25cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIElvc1dyYXBwZXI7XG59KEFic3RyYWN0V3JhcHBlcik7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHQsIG8pIHsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG8ucHJvdG90eXBlKSwgdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0LCBfc2V0UHJvdG90eXBlT2YodCwgbyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5pbXBvcnQgTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xuaW1wb3J0IHsgY3JlYXRlQ2FudmFzQ29udGV4dDJEIH0gZnJvbSAnb2wvZG9tJztcbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcyc7XG52YXIgTWFzayA9IGZ1bmN0aW9uIChfTGF5ZXIpIHtcbiAgZnVuY3Rpb24gTWFzayhsYXllck9wdGlvbnMsIG1hc2tPcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChsYXllck9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgbGF5ZXJPcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmIChtYXNrT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBtYXNrT3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBfdGhpcyA9IF9MYXllci5jYWxsKHRoaXMsIGxheWVyT3B0aW9ucykgfHwgdGhpcztcbiAgICBfdGhpcy5jb250ZXh0XyA9IGNyZWF0ZUNhbnZhc0NvbnRleHQyRCgpO1xuICAgIF90aGlzLmNvbnRleHRfLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgX3RoaXMuY29udGV4dF8uY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBfdGhpcy5tYXJnaW5fID0gbWFza09wdGlvbnMubWFyZ2luIHx8IDEwMDtcbiAgICBfdGhpcy5leHRlbnRJbk1ldGVyc18gPSBtYXNrT3B0aW9ucy5leHRlbnRJbk1ldGVycyB8fCAwO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShNYXNrLCBfTGF5ZXIpO1xuICB2YXIgX3Byb3RvID0gTWFzay5wcm90b3R5cGU7XG4gIF9wcm90by5jcmVhdGVFeHRlbnQgPSBmdW5jdGlvbiBjcmVhdGVFeHRlbnQoY2VudGVyLCBoYWxmTGVuZ3RoKSB7XG4gICAgdmFyIG1pbnggPSBjZW50ZXJbMF0gLSBoYWxmTGVuZ3RoO1xuICAgIHZhciBtaW55ID0gY2VudGVyWzFdIC0gaGFsZkxlbmd0aDtcbiAgICB2YXIgbWF4eCA9IGNlbnRlclswXSArIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1heHkgPSBjZW50ZXJbMV0gKyBoYWxmTGVuZ3RoO1xuICAgIHJldHVybiBbbWlueCwgbWlueSwgbWF4eCwgbWF4eV07XG4gIH07XG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoZnJhbWVTdGF0ZSkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0XztcbiAgICB2YXIgY3dpZHRoID0gZnJhbWVTdGF0ZS5zaXplWzBdO1xuICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gY3dpZHRoO1xuICAgIHZhciBjaGVpZ2h0ID0gZnJhbWVTdGF0ZS5zaXplWzFdO1xuICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IGNoZWlnaHQ7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0Lm1vdmVUbygwLCAwKTtcbiAgICBjb250ZXh0LmxpbmVUbyhjd2lkdGgsIDApO1xuICAgIGNvbnRleHQubGluZVRvKGN3aWR0aCwgY2hlaWdodCk7XG4gICAgY29udGV4dC5saW5lVG8oMCwgY2hlaWdodCk7XG4gICAgY29udGV4dC5saW5lVG8oMCwgMCk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB2YXIgZXh0ZW50TGVuZ3RoID0gTWF0aC5taW4oY3dpZHRoLCBjaGVpZ2h0KSAtIHRoaXMubWFyZ2luXyAqIDI7XG4gICAgaWYgKHRoaXMuZXh0ZW50SW5NZXRlcnNfKSB7XG4gICAgICBleHRlbnRMZW5ndGggPSBERVZJQ0VfUElYRUxfUkFUSU8gKiB0aGlzLmV4dGVudEluTWV0ZXJzXyAvIGZyYW1lU3RhdGUudmlld1N0YXRlLnJlc29sdXRpb247XG4gICAgfVxuICAgIHZhciBleHRlbnQgPSB0aGlzLmNyZWF0ZUV4dGVudChbY3dpZHRoIC8gMiwgY2hlaWdodCAvIDJdLCBNYXRoLmNlaWwoZXh0ZW50TGVuZ3RoIC8gMikpO1xuICAgIGNvbnRleHQubW92ZVRvKGV4dGVudFswXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFszXSk7XG4gICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbM10pO1xuICAgIGNvbnRleHQubGluZVRvKGV4dGVudFsyXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFsxXSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDUsIDI1LCAwLjUpJztcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICByZXR1cm4gY29udGV4dC5jYW52YXM7XG4gIH07XG4gIHJldHVybiBNYXNrO1xufShMYXllcik7XG5leHBvcnQgeyBNYXNrIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICBNb2RlLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIl07XG4gIGZ1bmN0aW9uIE1vZGUobmdlb09mZmxpbmVDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5lbmFibGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuY29tcG9uZW50XyA9IG51bGw7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICB9XG4gIHZhciBfcHJvdG8gPSBNb2RlLnByb3RvdHlwZTtcbiAgX3Byb3RvLmlzRW5hYmxlZCA9IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkXztcbiAgfTtcbiAgX3Byb3RvLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gdHJ1ZTtcbiAgfTtcbiAgX3Byb3RvLnJlZ2lzdGVyQ29tcG9uZW50ID0gZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgdGhpcy5jb21wb25lbnRfID0gY29tcG9uZW50O1xuICB9O1xuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbXBvbmVudCBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudF8uYWN0aXZhdGVPZmZsaW5lTW9kZSgpO1xuICB9O1xuICBfcHJvdG8uaGFzRGF0YSA9IGZ1bmN0aW9uIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5oYXNPZmZsaW5lRGF0YSgpO1xuICB9O1xuICByZXR1cm4gTW9kZTtcbn0oKTtcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZU1vZGUnLCBbXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZU1vZGUnLCBNb2RlKTtcbk1vZGUubW9kdWxlID0gbXlNb2R1bGU7XG5leHBvcnQgZGVmYXVsdCBNb2RlOyIsImNvbmZpZ0Z1bmN0aW9uXy4kaW5qZWN0ID0gW1wiJGh0dHBQcm92aWRlclwiXTtcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICBTZXJ2aWNlLiRpbmplY3QgPSBbXCIkZG9jdW1lbnRcIiwgXCIkd2luZG93XCIsIFwiJHRpbWVvdXRcIiwgXCIkcm9vdFNjb3BlXCIsIFwibmdlb09mZmxpbmVUZXN0VXJsXCJdO1xuICBmdW5jdGlvbiBTZXJ2aWNlKCRkb2N1bWVudCwgJHdpbmRvdywgJHRpbWVvdXQsICRyb290U2NvcGUsIG5nZW9PZmZsaW5lVGVzdFVybCkge1xuICAgIHRoaXMuJGRvY3VtZW50XyA9ICRkb2N1bWVudDtcbiAgICB0aGlzLiR3aW5kb3dfID0gJHdpbmRvdztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyA9IG5nZW9PZmZsaW5lVGVzdFVybDtcbiAgICB0aGlzLmNvdW50XyA9IDA7XG4gICAgdGhpcy5vZmZsaW5lXztcbiAgICB0aGlzLnByb21pc2VfO1xuICAgIHRoaXMuaW5pdGlhbGl6ZV8oKTtcbiAgfVxuICB2YXIgX3Byb3RvID0gU2VydmljZS5wcm90b3R5cGU7XG4gIF9wcm90by5pbml0aWFsaXplXyA9IGZ1bmN0aW9uIGluaXRpYWxpemVfKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5vZmZsaW5lXyA9ICF0aGlzLiR3aW5kb3dfLm5hdmlnYXRvci5vbkxpbmU7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLiR3aW5kb3dfLmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNoZWNrKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuJGRvY3VtZW50Xy5hamF4RXJyb3IpIHtcbiAgICAgIHZhciBvbkFqYXhFcnJvciA9IGZ1bmN0aW9uIG9uQWpheEVycm9yKGV2dCwganF4aHIsIHNldHRpbmdzLCB0aHJvd25FcnJvcikge1xuICAgICAgICBpZiAoIS9eKGNhbmNlbGVkfGFib3J0KSQvLnRlc3QodGhyb3duRXJyb3IpKSB7XG4gICAgICAgICAgX3RoaXMuY2hlY2soMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0aGlzLiRkb2N1bWVudF8uYWpheEVycm9yKG9uQWpheEVycm9yKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5jaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodGhpcy5wcm9taXNlXykge1xuICAgICAgdGhpcy4kdGltZW91dF8uY2FuY2VsKHRoaXMucHJvbWlzZV8pO1xuICAgICAgdGhpcy5wcm9taXNlXyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb3VudF8rKztcbiAgICAgIHRoaXMucHJvbWlzZV8gPSB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuY2hlY2soKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogdGhpcy5uZ2VvT2ZmbGluZVRlc3RVcmxfLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8gPSAwO1xuICAgICAgICBpZiAoX3RoaXMyLm9mZmxpbmVfKSB7XG4gICAgICAgICAgX3RoaXMyLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICBfdGhpczIuY291bnRfKys7XG4gICAgICAgIGlmIChfdGhpczIuY291bnRfID4gMiAmJiAhX3RoaXMyLm9mZmxpbmVfKSB7XG4gICAgICAgICAgX3RoaXMyLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8gPSBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKG9mZmxpbmUpIHtcbiAgICB0aGlzLm9mZmxpbmVfID0gb2ZmbGluZTtcbiAgICB0aGlzLiRyb290U2NvcGVfLiRkaWdlc3QoKTtcbiAgfTtcbiAgX3Byb3RvLmlzRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gaXNEaXNjb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5vZmZsaW5lXztcbiAgfTtcbiAgcmV0dXJuIFNlcnZpY2U7XG59KCk7XG52YXIgbmFtZSA9ICduZ2VvTmV0d29ya1N0YXR1cyc7XG5TZXJ2aWNlLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcblNlcnZpY2UubW9kdWxlLnNlcnZpY2UobmFtZSwgU2VydmljZSk7XG52YXIgaHR0cEludGVyY2VwdG9yID0gZnVuY3Rpb24gaHR0cEludGVyY2VwdG9yKCRxLCBuZ2VvRGVib3VuY2UsIG5nZW9OZXR3b3JrU3RhdHVzKSB7XG4gIHZhciBkZWJvdW5jZWRDaGVjayA9IG5nZW9EZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5nZW9OZXR3b3JrU3RhdHVzLmNoZWNrKHVuZGVmaW5lZCk7XG4gIH0sIDIwMDAsIGZhbHNlKTtcbiAgcmV0dXJuIHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9LFxuICAgIHJlcXVlc3RFcnJvcjogZnVuY3Rpb24gcmVxdWVzdEVycm9yKHJlamVjdGlvbikge1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH0sXG4gICAgcmVzcG9uc2U6IGZ1bmN0aW9uIHJlc3BvbnNlKF9yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgICB9LFxuICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICBkZWJvdW5jZWRDaGVjaygpO1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH1cbiAgfTtcbn07XG5odHRwSW50ZXJjZXB0b3IuJGluamVjdCA9IFtcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIl07XG5odHRwSW50ZXJjZXB0b3IuJGluamVjdCA9IFtcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIl07XG5TZXJ2aWNlLm1vZHVsZS5mYWN0b3J5KCdodHRwSW50ZXJjZXB0b3InLCBodHRwSW50ZXJjZXB0b3IpO1xuZnVuY3Rpb24gY29uZmlnRnVuY3Rpb25fKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XG59XG5TZXJ2aWNlLm1vZHVsZS5jb25maWcoY29uZmlnRnVuY3Rpb25fKTtcbnZhciBleHBvcnRzID0gU2VydmljZTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShyLCBlKSB7IHZhciB0ID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIHJbU3ltYm9sLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTsgaWYgKHQpIHJldHVybiAodCA9IHQuY2FsbChyKSkubmV4dC5iaW5kKHQpOyBpZiAoQXJyYXkuaXNBcnJheShyKSB8fCAodCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSkgfHwgZSAmJiByICYmIFwibnVtYmVyXCIgPT0gdHlwZW9mIHIubGVuZ3RoKSB7IHQgJiYgKHIgPSB0KTsgdmFyIG8gPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbyA+PSByLmxlbmd0aCA/IHsgZG9uZTogITAgfSA6IHsgZG9uZTogITEsIHZhbHVlOiByW28rK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7IGlmIChyKSB7IGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7IHZhciB0ID0ge30udG9TdHJpbmcuY2FsbChyKS5zbGljZSg4LCAtMSk7IHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwOyB9IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHsgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpOyBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTsgcmV0dXJuIG47IH1cbmltcG9ydCBuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyIGZyb20gJ25nZW8vbWFwL0JhY2tncm91bmRMYXllck1ncic7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBSZXN0b3JlciA9IGZ1bmN0aW9uICgpIHtcbiAgUmVzdG9yZXIuJGluamVjdCA9IFtcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiLCBcIm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcIl07XG4gIGZ1bmN0aW9uIFJlc3RvcmVyKG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiwgbmdlb0JhY2tncm91bmRMYXllck1ncikge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXyA9IG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3I7XG4gIH1cbiAgdmFyIF9wcm90byA9IFJlc3RvcmVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKG1hcCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JykudGhlbihmdW5jdGlvbiAob2ZmbGluZUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5kb1Jlc3RvcmUobWFwLCBvZmZsaW5lQ29udGVudCk7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5kb1Jlc3RvcmUgPSBmdW5jdGlvbiBkb1Jlc3RvcmUobWFwLCBvZmZsaW5lQ29udGVudCkge1xuICAgIG1hcC5nZXRMYXllckdyb3VwKCkuZ2V0TGF5ZXJzKCkuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG9mZmxpbmVDb250ZW50LmxheWVycyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgb2ZmbGluZUxheWVyID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLnJlY3JlYXRlT2ZmbGluZUxheWVyKG9mZmxpbmVMYXllcik7XG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgaWYgKG9mZmxpbmVMYXllci5iYWNrZ3JvdW5kTGF5ZXIpIHtcbiAgICAgICAgICB0aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfLnNldChtYXAsIGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2ZmbGluZUNvbnRlbnQuZXh0ZW50O1xuICB9O1xuICByZXR1cm4gUmVzdG9yZXI7XG59KCk7XG52YXIgbmFtZSA9ICduZ2VvT2ZmbGluZVJlc3RvcmVyJztcblJlc3RvcmVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyLm5hbWVdKS5zZXJ2aWNlKG5hbWUsIFJlc3RvcmVyKTtcbnZhciBleHBvcnRzID0gUmVzdG9yZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBPbFRpbGVncmlkVGlsZUdyaWQgZnJvbSAnb2wvdGlsZWdyaWQvVGlsZUdyaWQnO1xuaW1wb3J0IE9sVGlsZWdyaWRXTVRTIGZyb20gJ29sL3RpbGVncmlkL1dNVFMnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IE9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUyc7XG5pbXBvcnQgT2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTJztcbmltcG9ydCBPbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcbnZhciBTZXJEZXMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlckRlcyhfcmVmKSB7XG4gICAgdmFyIGd1dHRlciA9IF9yZWYuZ3V0dGVyO1xuICAgIHRoaXMuZ3V0dGVyXyA9IGd1dHRlcjtcbiAgfVxuICB2YXIgX3Byb3RvID0gU2VyRGVzLnByb3RvdHlwZTtcbiAgX3Byb3RvLmNyZWF0ZUJhc2VPYmplY3RfID0gZnVuY3Rpb24gY3JlYXRlQmFzZU9iamVjdF8ob2xPYmplY3QpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IG9sT2JqZWN0LmdldFByb3BlcnRpZXMoKTtcbiAgICB2YXIgb2JqID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgIHZhciB0eXBlT2YgPSB0eXBlb2YgdmFsdWU7XG4gICAgICBpZiAodHlwZU9mID09PSAnc3RyaW5nJyB8fCB0eXBlT2YgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG4gIF9wcm90by5zZXJpYWxpemVUaWxlZ3JpZCA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVncmlkKHRpbGVncmlkKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIG9iai5leHRlbnQgPSB0aWxlZ3JpZC5nZXRFeHRlbnQoKTtcbiAgICBvYmoubWluWm9vbSA9IHRpbGVncmlkLmdldE1pblpvb20oKTtcbiAgICBvYmoub3JpZ2luID0gdGlsZWdyaWQuZ2V0T3JpZ2luKDApO1xuICAgIG9iai5yZXNvbHV0aW9ucyA9IHRpbGVncmlkLmdldFJlc29sdXRpb25zKCk7XG4gICAgb2JqLnRpbGVTaXplID0gdGlsZWdyaWQuZ2V0VGlsZVNpemUodGlsZWdyaWQuZ2V0TWluWm9vbSgpKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZWdyaWQgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVncmlkKHNlcmlhbGl6YXRpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgcmV0dXJuIG5ldyBPbFRpbGVncmlkVGlsZUdyaWQob3B0aW9ucyk7XG4gIH07XG4gIF9wcm90by5zZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlZ3JpZFdNVFModGlsZWdyaWQpIHtcbiAgICBpZiAoIXRpbGVncmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIHJlc29sdXRpb25zID0gdGlsZWdyaWQuZ2V0UmVzb2x1dGlvbnMoKTtcbiAgICBvYmouZXh0ZW50ID0gdGlsZWdyaWQuZ2V0RXh0ZW50KCk7XG4gICAgb2JqLm1pblpvb20gPSB0aWxlZ3JpZC5nZXRNaW5ab29tKCk7XG4gICAgb2JqLm1hdHJpeElkcyA9IHRpbGVncmlkLmdldE1hdHJpeElkcygpO1xuICAgIG9iai5yZXNvbHV0aW9ucyA9IHJlc29sdXRpb25zO1xuICAgIG9iai5vcmlnaW5zID0gW107XG4gICAgZm9yICh2YXIgeiA9IDA7IHogPCByZXNvbHV0aW9ucy5sZW5ndGg7ICsreikge1xuICAgICAgb2JqLm9yaWdpbnMucHVzaCh0aWxlZ3JpZC5nZXRPcmlnaW4oeikpO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZWdyaWRXTVRTID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMoc2VyaWFsaXphdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICByZXR1cm4gbmV3IE9sVGlsZWdyaWRXTVRTKG9wdGlvbnMpO1xuICB9O1xuICBfcHJvdG8uc2VyaWFsaXplU291cmNlVGlsZVdNUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8oc291cmNlKTtcbiAgICBvYmoucGFyYW1zID0gc291cmNlLmdldFBhcmFtcygpO1xuICAgIG9iai51cmxzID0gc291cmNlLmdldFVybHMoKTtcbiAgICBvYmoudGlsZUdyaWQgPSB0aGlzLnNlcmlhbGl6ZVRpbGVncmlkKHNvdXJjZS5nZXRUaWxlR3JpZCgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgaWYgKHByb2plY3Rpb24pIHtcbiAgICAgIG9iai5wcm9qZWN0aW9uID0gb2xQcm9qLmdldChzb3VyY2UuZ2V0UHJvamVjdGlvbigpKS5nZXRDb2RlKCk7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuICBfcHJvdG8uZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TID0gZnVuY3Rpb24gZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgb3B0aW9ucy50aWxlTG9hZEZ1bmN0aW9uID0gdGlsZUxvYWRGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy50aWxlR3JpZCkge1xuICAgICAgb3B0aW9ucy50aWxlR3JpZCA9IHRoaXMuZGVzZXJpYWxpemVUaWxlZ3JpZChvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG4gICAgb3B0aW9ucy5ndXR0ZXIgPSB0aGlzLmd1dHRlcl87XG4gICAgcmV0dXJuIG5ldyBPbFNvdXJjZVRpbGVXTVMob3B0aW9ucyk7XG4gIH07XG4gIF9wcm90by5zZXJpYWxpemVTb3VyY2VXTVRTID0gZnVuY3Rpb24gc2VyaWFsaXplU291cmNlV01UUyhzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGhpcy5jcmVhdGVCYXNlT2JqZWN0Xyhzb3VyY2UpO1xuICAgIG9iai5kaW1lbnNpb25zID0gc291cmNlLmdldERpbWVuc2lvbnMoKTtcbiAgICBvYmouZm9ybWF0ID0gc291cmNlLmdldEZvcm1hdCgpO1xuICAgIG9iai51cmxzID0gc291cmNlLmdldFVybHMoKTtcbiAgICBvYmoudmVyc2lvbiA9IHNvdXJjZS5nZXRWZXJzaW9uKCk7XG4gICAgb2JqLmxheWVyID0gc291cmNlLmdldExheWVyKCk7XG4gICAgb2JqLnN0eWxlID0gc291cmNlLmdldFN0eWxlKCk7XG4gICAgb2JqLm1hdHJpeFNldCA9IHNvdXJjZS5nZXRNYXRyaXhTZXQoKTtcbiAgICB2YXIgdGlsZUdyaWRXTVRTID0gc291cmNlLmdldFRpbGVHcmlkKCk7XG4gICAgb2JqLnRpbGVHcmlkID0gdGhpcy5zZXJpYWxpemVUaWxlZ3JpZFdNVFModGlsZUdyaWRXTVRTKTtcbiAgICBvYmoucmVxdWVzdEVuY29kaW5nID0gc291cmNlLmdldFJlcXVlc3RFbmNvZGluZygpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gc291cmNlLmdldFByb2plY3Rpb24oKTtcbiAgICBpZiAocHJvamVjdGlvbikge1xuICAgICAgb2JqLnByb2plY3Rpb24gPSBvbFByb2ouZ2V0KHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkpLmdldENvZGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG4gIF9wcm90by5kZXNlcmlhbGl6ZVNvdXJjZVdNVFMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVNvdXJjZVdNVFMoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICBvcHRpb25zLnRpbGVMb2FkRnVuY3Rpb24gPSB0aWxlTG9hZEZ1bmN0aW9uO1xuICAgIGlmIChvcHRpb25zLnRpbGVHcmlkKSB7XG4gICAgICBvcHRpb25zLnRpbGVHcmlkID0gdGhpcy5kZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPbFNvdXJjZVdNVFMob3B0aW9ucyk7XG4gIH07XG4gIF9wcm90by5tYWtlSW5maW5pdHlTZXJpYWxpemFibGVfID0gZnVuY3Rpb24gbWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyhudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIDEwMDA7XG4gICAgfVxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG4gIF9wcm90by5zZXJpYWxpemVUaWxlTGF5ZXIgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlTGF5ZXIobGF5ZXIsIHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKGxheWVyKTtcbiAgICBvYmoub3BhY2l0eSA9IGxheWVyLmdldE9wYWNpdHkoKTtcbiAgICBvYmoudmlzaWJsZSA9IGxheWVyLmdldFZpc2libGUoKTtcbiAgICBvYmoubWluUmVzb2x1dGlvbiA9IGxheWVyLmdldE1pblJlc29sdXRpb24oKTtcbiAgICBvYmoubWF4UmVzb2x1dGlvbiA9IHRoaXMubWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyhsYXllci5nZXRNYXhSZXNvbHV0aW9uKCkpO1xuICAgIG9iai56SW5kZXggPSBsYXllci5nZXRaSW5kZXgoKTtcbiAgICBzb3VyY2UgPSBzb3VyY2UgfHwgbGF5ZXIuZ2V0U291cmNlKCk7XG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE9sU291cmNlVGlsZVdNUykge1xuICAgICAgb2JqLnNvdXJjZSA9IHRoaXMuc2VyaWFsaXplU291cmNlVGlsZVdNUyhzb3VyY2UpO1xuICAgICAgb2JqLnNvdXJjZVR5cGUgPSAndGlsZVdNUyc7XG4gICAgfSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPbFNvdXJjZVdNVFMpIHtcbiAgICAgIG9iai5zb3VyY2UgPSB0aGlzLnNlcmlhbGl6ZVNvdXJjZVdNVFMoc291cmNlKTtcbiAgICAgIG9iai5zb3VyY2VUeXBlID0gJ1dNVFMnO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZUxheWVyID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlTGF5ZXIoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICB2YXIgc291cmNlVHlwZSA9IG9wdGlvbnMuc291cmNlVHlwZTtcbiAgICBpZiAoc291cmNlVHlwZSA9PT0gJ3RpbGVXTVMnKSB7XG4gICAgICBvcHRpb25zLnNvdXJjZSA9IHRoaXMuZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TKG9wdGlvbnMuc291cmNlLCB0aWxlTG9hZEZ1bmN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHNvdXJjZVR5cGUgPT09ICdXTVRTJykge1xuICAgICAgb3B0aW9ucy5zb3VyY2UgPSB0aGlzLmRlc2VyaWFsaXplU291cmNlV01UUyhvcHRpb25zLnNvdXJjZSwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2xMYXllclRpbGUob3B0aW9ucyk7XG4gIH07XG4gIHJldHVybiBTZXJEZXM7XG59KCk7XG52YXIgZXhwb3J0cyA9IFNlckRlcztcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG52YXIgU2VydmljZU1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIFNlcnZpY2VNYW5hZ2VyLiRpbmplY3QgPSBbXCIkaW5qZWN0b3JcIl07XG4gIGZ1bmN0aW9uIFNlcnZpY2VNYW5hZ2VyKCRpbmplY3Rvcikge1xuICAgIHRoaXMuJGluamVjdG9yXyA9ICRpbmplY3RvcjtcbiAgICB0aGlzLnNhdmVTZXJ2aWNlXyA9IG51bGw7XG4gICAgdGhpcy5yZXN0b3JlU2VydmljZV8gPSBudWxsO1xuICB9XG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlTWFuYWdlci5wcm90b3R5cGU7XG4gIF9wcm90by5nZXRPZmZsaW5lU2VydmljZV8gPSBmdW5jdGlvbiBnZXRPZmZsaW5lU2VydmljZV8oc2VydmljZUxpa2UsIG1ldGhvZCkge1xuICAgIGlmICh0eXBlb2Ygc2VydmljZUxpa2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIXRoaXMuJGluamVjdG9yXy5oYXMoc2VydmljZUxpa2UpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgb2ZmbGluZSBcIiArIG1ldGhvZCArIFwiIHNlcnZpY2UgY291bGQgbm90IGJlIGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgc2VydmljZSA9IHRoaXMuJGluamVjdG9yXy5nZXQoc2VydmljZUxpa2UpO1xuICAgICAgaWYgKCFzZXJ2aWNlW21ldGhvZF0pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBvZmZsaW5lIHNlcnZpY2UgXCIgKyBzZXJ2aWNlTGlrZSArIFwiIGRvZXMgbm90IGhhdmUgYSBcIiArIG1ldGhvZCArIFwiIG1ldGhvZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuICAgIGlmICghc2VydmljZUxpa2VbbWV0aG9kXSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBwcm92aWRlZCBvZmZsaW5lIHNlcnZpY2UgZG9lcyBub3QgaGF2ZSBhIFwiICsgbWV0aG9kICsgXCIgbWV0aG9kXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gc2VydmljZUxpa2U7XG4gIH07XG4gIF9wcm90by5zZXRTYXZlU2VydmljZSA9IGZ1bmN0aW9uIHNldFNhdmVTZXJ2aWNlKHNhdmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8oc2F2ZUxpa2VTZXJ2aWNlLCAnc2F2ZScpO1xuICB9O1xuICBfcHJvdG8uc2V0UmVzdG9yZVNlcnZpY2UgPSBmdW5jdGlvbiBzZXRSZXN0b3JlU2VydmljZShyZXN0b3JlTGlrZVNlcnZpY2UpIHtcbiAgICB0aGlzLnJlc3RvcmVTZXJ2aWNlXyA9IHRoaXMuZ2V0T2ZmbGluZVNlcnZpY2VfKHJlc3RvcmVMaWtlU2VydmljZSwgJ3Jlc3RvcmUnKTtcbiAgfTtcbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAoIXRoaXMuc2F2ZVNlcnZpY2VfKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1lvdSBtdXN0IHJlZ2lzdGVyIGEgc2F2ZVNlcnZpY2UgZmlyc3QnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zYXZlU2VydmljZV8uY2FuY2VsKCk7XG4gIH07XG4gIF9wcm90by5zYXZlID0gZnVuY3Rpb24gc2F2ZShleHRlbnQsIG1hcCkge1xuICAgIGlmICghdGhpcy5zYXZlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSBzYXZlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNhdmVTZXJ2aWNlXy5zYXZlKGV4dGVudCwgbWFwKTtcbiAgfTtcbiAgX3Byb3RvLnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKG1hcCkge1xuICAgIGlmICghdGhpcy5yZXN0b3JlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSByZXN0b3JlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlc3RvcmVTZXJ2aWNlXy5yZXN0b3JlKG1hcCk7XG4gIH07XG4gIHJldHVybiBTZXJ2aWNlTWFuYWdlcjtcbn0oKTtcblNlcnZpY2VNYW5hZ2VyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyJywgW10pO1xuU2VydmljZU1hbmFnZXIubW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lU2VydmljZU1hbmFnZXInLCBTZXJ2aWNlTWFuYWdlcik7XG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlTWFuYWdlcjsiLCJmdW5jdGlvbiBibG9iVG9EYXRhVXJsKGJsb2IpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICB9O1xuICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICB9KTtcbn1cbnZhciBUaWxlRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVGlsZURvd25sb2FkZXIodGlsZXMsIGNhbGxiYWNrcywgd29ya2Vycykge1xuICAgIHRoaXMubWF4TnVtYmVyT2ZXb3JrZXJzXyA9IHdvcmtlcnM7XG4gICAgdGhpcy53YXNTdGFydGVkXyA9IGZhbHNlO1xuICAgIHRoaXMudGlsZXNfID0gdGlsZXM7XG4gICAgdGhpcy5jYWxsYmFja3NfID0gY2FsbGJhY2tzO1xuICAgIHRoaXMuYWxsQ291bnRfID0gMDtcbiAgICB0aGlzLm9rQ291bnRfID0gMDtcbiAgICB0aGlzLmtvQ291bnRfID0gMDtcbiAgICB0aGlzLnJlcXVlc3RlZENvdW50XyA9IDA7XG4gICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMucHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMudGlsZUluZGV4XyA9IDA7XG4gICAgdGhpcy5jYW5jZWxfID0gZmFsc2U7XG4gIH1cbiAgdmFyIF9wcm90byA9IFRpbGVEb3dubG9hZGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0aGlzLmNhbmNlbF8gPSB0cnVlO1xuICB9O1xuICBfcHJvdG8uZG93bmxvYWQgPSBmdW5jdGlvbiBkb3dubG9hZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgICB9XG4gICAgdGhpcy5wcm9taXNlXyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIF90aGlzLnJlc29sdmVQcm9taXNlXyA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy50aWxlc18pO1xuICAgIGlmICh0aGlzLnRpbGVzXy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKDEpO1xuICAgICAgaWYgKHRoaXMucmVzb2x2ZVByb21pc2VfKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVByb21pc2VfKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXhOdW1iZXJPZldvcmtlcnNfOyArK2kpIHtcbiAgICAgICAgdGhpcy5kb3dubG9hZFRpbGVfKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICB9O1xuICBfcHJvdG8uZG93bmxvYWRUaWxlXyA9IGZ1bmN0aW9uIGRvd25sb2FkVGlsZV8oKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuY2FuY2VsXyB8fCB0aGlzLnRpbGVJbmRleF8gPj0gdGhpcy50aWxlc18ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aWxlID0gdGhpcy50aWxlc19bdGhpcy50aWxlSW5kZXhfKytdO1xuICAgIHZhciB0aWxlVXJsID0gdGlsZS51cmw7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB0aWxlVXJsLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgIHZhciBvblRpbGVEb3dubG9hZGVkID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRlZCgpIHtcbiAgICAgIGlmIChfdGhpczIuYWxsQ291bnRfID09PSBfdGhpczIudGlsZXNfLmxlbmd0aCAmJiBfdGhpczIucmVzb2x2ZVByb21pc2VfKSB7XG4gICAgICAgIF90aGlzMi5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cbiAgICAgIF90aGlzMi5kb3dubG9hZFRpbGVfKCk7XG4gICAgfTtcbiAgICB2YXIgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2soXykge1xuICAgICAgaWYgKF90aGlzMi5jYW5jZWxfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgICsrX3RoaXMyLmFsbENvdW50XztcbiAgICAgICsrX3RoaXMyLmtvQ291bnRfO1xuICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuICAgICAgX3RoaXMyLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRFcnJvcihwcm9ncmVzcykudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICB9O1xuICAgIHZhciBvbmxvYWRDYWxsYmFjayA9IGZ1bmN0aW9uIG9ubG9hZENhbGxiYWNrKGUpIHtcbiAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZTtcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zaXplICE9PSAwKSB7XG4gICAgICAgIGJsb2JUb0RhdGFVcmwocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGRhdGFVcmwpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgKytfdGhpczIuYWxsQ291bnRfO1xuICAgICAgICAgICsrX3RoaXMyLm9rQ291bnRfO1xuICAgICAgICAgIHRpbGUucmVzcG9uc2UgPSBkYXRhVXJsO1xuICAgICAgICAgIHZhciBwcm9ncmVzcyA9IF90aGlzMi5hbGxDb3VudF8gLyBfdGhpczIudGlsZXNfLmxlbmd0aDtcbiAgICAgICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZFN1Y2Nlc3MocHJvZ3Jlc3MsIHRpbGUpLnRoZW4ob25UaWxlRG93bmxvYWRlZCwgb25UaWxlRG93bmxvYWRlZCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgKytfdGhpczIuYWxsQ291bnRfO1xuICAgICAgICArK190aGlzMi5va0NvdW50XztcbiAgICAgICAgX3RoaXMyLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRTdWNjZXNzKF90aGlzMi5hbGxDb3VudF8gLyBfdGhpczIudGlsZXNfLmxlbmd0aCwgdGlsZSkudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmxvYWQgPSBvbmxvYWRDYWxsYmFjaztcbiAgICB4aHIub25lcnJvciA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5zZW5kKCk7XG4gICAgKyt0aGlzLnJlcXVlc3RlZENvdW50XztcbiAgfTtcbiAgcmV0dXJuIFRpbGVEb3dubG9hZGVyO1xufSgpO1xuZXhwb3J0IHsgVGlsZURvd25sb2FkZXIgYXMgZGVmYXVsdCB9OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJtYWluLWJ1dHRvblwiPlxcbiAgPHNwYW4gbmctaWY9XCIhJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJuby1kYXRhIGZhcyBmYS1hcnJvdy1jaXJjbGUtZG93blwiIG5nLWNsaWNrPVwiJGN0cmwudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbigpXCI+PC9kaXY+XFxuICA8L3NwYW4+XFxuICA8c3BhbiBuZy1pZj1cIiRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwid2l0aC1kYXRhIGZhcyBmYS1hcnJvdy1jaXJjbGUtZG93blwiIG5nLWNsaWNrPVwiJGN0cmwuc2hvd01lbnUoKVwiPjwvZGl2PlxcbiAgPC9zcGFuPlxcbjwvZGl2PlxcblxcbjxkaXZcXG4gIG5nLWlmPVwiJGN0cmwuc2VsZWN0aW5nRXh0ZW50ICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIlxcbiAgY2xhc3M9XCJ2YWxpZGF0ZS1leHRlbnQgYnRuIGJ0bi1wcmltYXJ5XCJcXG4+XFxuICA8ZGl2IG5nLWlmPVwiISRjdHJsLmRvd25sb2FkaW5nXCIgbmctY2xpY2s9XCIkY3RybC5jb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhKClcIiB0cmFuc2xhdGU+XFxuICAgIFNhdmUgbWFwXFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCIkY3RybC5kb3dubG9hZGluZ1wiIG5nLWNsaWNrPVwiJGN0cmwuYXNrQWJvcnREb3dubG9hZCgpXCIgdHJhbnNsYXRlPkFib3J0PC9kaXY+XFxuPC9kaXY+XFxuXFxuPGRpdiBuZy1pZj1cIiRjdHJsLmRvd25sb2FkaW5nXCIgY2xhc3M9XCJpbi1wcm9ncmVzc1wiPlxcbiAgPGRpdj57eyRjdHJsLnByb2dyZXNzUGVyY2VudHN9fSU8L2Rpdj5cXG48L2Rpdj5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLm1lbnVEaXNwbGF5ZWRcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cInt7XFwnQ2xvc2VcXCcgfCB0cmFuc2xhdGV9fVwiPlxcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5PZmZsaW5lIG1hcDwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgIDxkaXYgbmctaWY9XCIkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgICA8YnV0dG9uXFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgIGNsYXNzPVwiZXh0ZW50LXpvb20gYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgIG5nLWlmPVwiISRjdHJsLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpXCJcXG4gICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuYWN0aXZhdGVPZmZsaW5lTW9kZSgpXCJcXG4gICAgICAgIHRyYW5zbGF0ZVxcbiAgICAgID5cXG4gICAgICAgIEFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b25cXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgICAgY2xhc3M9XCJleHRlbnQtem9vbSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgbmctaWY9XCIkY3RybC5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKSAmJiAhJGN0cmwubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpXCJcXG4gICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKClcIlxcbiAgICAgICAgdHJhbnNsYXRlXFxuICAgICAgPlxcbiAgICAgICAgRGVhY3RpdmF0ZSBvZmZsaW5lIG1vZGVcXG4gICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICA8YnV0dG9uXFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgIGNsYXNzPVwiZXh0ZW50LXNob3cgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgIG5nLWlmPVwiJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC50b2dnbGVFeHRlbnRWaXNpYmlsaXR5KClcIlxcbiAgICAgID5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiJGN0cmwuaXNFeHRlbnRWaXNpYmxlKClcIiB0cmFuc2xhdGU+SGlkZSBleHRlbnQ8L3NwYW4+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cIiEkY3RybC5pc0V4dGVudFZpc2libGUoKVwiIHRyYW5zbGF0ZT5TaG93IGV4dGVudDwvc3Bhbj5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uXFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICBuZy1pZj1cIiEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kaXNwbGF5QWxlcnREZXN0cm95RGF0YSA9IHRydWVcIlxcbiAgICAgICAgdHJhbnNsYXRlXFxuICAgICAgPlxcbiAgICAgICAgRGVsZXRlIGRhdGFcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctaWY9XCIhJGN0cmwuaGFzRGF0YSgpICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIj5cXG4gICAgICA8YnV0dG9uXFxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgIGNsYXNzPVwibmV3LWRhdGEgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgIG5nLWNsaWNrPVwiJGN0cmwudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbigpXCJcXG4gICAgICAgIHRyYW5zbGF0ZVxcbiAgICAgID5cXG4gICAgICAgIFNhdmUgbmV3IG1hcFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydExvYWREYXRhXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8cCB0cmFuc2xhdGU+XFxuICAgICAgfnt7JGN0cmwuZXN0aW1hdGVkTG9hZERhdGFTaXplfX1NQiBvZiBtYXBzIHdpbGwgYmUgZG93bmxvYWRlZCAodW50aWwgc2NhbGUgMToyNVxcJzAwMCkgLSBEb25cXCd0IGxvY2sgeW91clxcbiAgICAgIGRldmljZSBvciBuYXZpZ2F0ZSBhd2F5IGZyb20gdGhpcyBzaXRlIGR1cmluZyB0aGUgZG93bmxvYWQgcHJvY2Vzcy4gRGVhY3RpdmF0ZSBcInByaXZhdGVcIiBtb2RlIG9mIHlvdXJcXG4gICAgICBicm93c2VyLlxcbiAgICA8L3A+XFxuICAgIDxidXR0b25cXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgIG5nLWNsaWNrPVwiJGN0cmwudmFsaWRhdGVFeHRlbnQoKVwiXFxuICAgICAgdHJhbnNsYXRlXFxuICAgID5cXG4gICAgICBPa1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiB0cmFuc2xhdGU+Q2FuY2VsPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnROb0xheWVyXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8cCB0cmFuc2xhdGU+Tm8gbWFwcyBzZWxlY3RlZCBmb3Igc2F2aW5nLjwvcD5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiB0cmFuc2xhdGU+T2s8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydERlc3Ryb3lEYXRhXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8cCB0cmFuc2xhdGU+RG8geW91IHJlYWxseSB3YW50IHRvIHJlbW92ZSB5b3VyIGRhdGEgPzwvcD5cXG4gICAgPGJ1dHRvblxcbiAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVEYXRhKClcIlxcbiAgICAgIHRyYW5zbGF0ZVxcbiAgICA+XFxuICAgICAgT2tcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgdHJhbnNsYXRlPkNhbmNlbDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0QWJvcnREb3dubG9hZFwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5XYXJuaW5nPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgPHAgdHJhbnNsYXRlPkRvIHlvdSByZWFsbHkgd2FudCB0byByZW1vdmUgeW91ciBkYXRhID88L3A+XFxuICAgIDxidXR0b25cXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgIG5nLWNsaWNrPVwiJGN0cmwuYWJvcnREb3dubG9hZCgpXCJcXG4gICAgICB0cmFuc2xhdGVcXG4gICAgPlxcbiAgICAgIE9rXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uXFxuICAgICAgdHlwZT1cImJ1dHRvblwiXFxuICAgICAgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5mb2xsb3dEb3dubG9hZFByb2dyZXNzaW9uXygpXCJcXG4gICAgICB0cmFuc2xhdGVcXG4gICAgPlxcbiAgICAgIENhbmNlbFxcbiAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncic7XG5pbXBvcnQgbmdlb01lc3NhZ2VNb2RhbENvbXBvbmVudCBmcm9tICduZ2VvL21lc3NhZ2UvbW9kYWxDb21wb25lbnQnO1xuaW1wb3J0IHsgZXh0ZW50VG9SZWN0YW5nbGUgfSBmcm9tICduZ2VvL3V0aWxzJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbic7XG5pbXBvcnQgRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgTWFza0xheWVyIGZyb20gJy4vTWFzayc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmUnLCBbbmdlb01lc3NhZ2VNb2RhbENvbXBvbmVudC5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZW1wbGF0ZVVybCcsIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSBhdHRyc1snbmdlb09mZmxpbmVUZW1wbGF0ZXVybCddO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vb2ZmbGluZS9jb21wb25lbnQuaHRtbCc7XG59KTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL29mZmxpbmUvY29tcG9uZW50Lmh0bWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudC5odG1sJykpO1xufV0pO1xubmdlb09mZmxpbmVUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGVsZW1lbnRcIiwgXCIkYXR0cnNcIiwgXCJuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gbmdlb09mZmxpbmVUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMpO1xufVxudmFyIGNvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvT2ZmbGluZU1hcCcsXG4gICAgJ2V4dGVudFNpemUnOiAnPD9uZ2VvT2ZmbGluZUV4dGVudHNpemUnLFxuICAgICdtYXNrTWFyZ2luJzogJzw/bmdlb09mZmxpbmVNYXNrTWFyZ2luJyxcbiAgICAnbWluWm9vbSc6ICc8P25nZW9PZmZsaW5lTWluWm9vbScsXG4gICAgJ21heFpvb20nOiAnPD9uZ2VvT2ZmbGluZU1heFpvb20nXG4gIH0sXG4gIGNvbnRyb2xsZXI6ICduZ2VvT2ZmbGluZUNvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZVVybDogbmdlb09mZmxpbmVUZW1wbGF0ZVVybFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb09mZmxpbmUnLCBjb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJcIiwgXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIiwgXCJuZ2VvT2ZmbGluZU1vZGVcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcbiAgZnVuY3Rpb24gQ29udHJvbGxlcigkdGltZW91dCwgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlciwgbmdlb09mZmxpbmVDb25maWd1cmF0aW9uLCBuZ2VvT2ZmbGluZU1vZGUsIG5nZW9OZXR3b3JrU3RhdHVzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMubWFza0xheWVyXyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfID0gbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcjtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy5vZmZsaW5lTW9kZSA9IG5nZW9PZmZsaW5lTW9kZTtcbiAgICB0aGlzLm5ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcbiAgICB0aGlzLm1hcDtcbiAgICB0aGlzLmV4dGVudFNpemUgPSAwO1xuICAgIHRoaXMuZmVhdHVyZXNPdmVybGF5XyA9IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICAgIHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICAgIHRoaXMuZmVhdHVyZXNPdmVybGF5Xy5zZXRGZWF0dXJlcyh0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXyk7XG4gICAgdGhpcy5kYXRhUG9seWdvbl8gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW5nRXh0ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IDA7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IGZhbHNlO1xuICAgIHRoaXMubWFza01hcmdpbiA9IDA7XG4gICAgdGhpcy5taW5ab29tO1xuICAgIHRoaXMubWF4Wm9vbTtcbiAgICB0aGlzLm9yaWdpbmFsTWluWm9vbTtcbiAgICB0aGlzLm9yaWdpbmFsTWF4Wm9vbTtcbiAgICB0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA9IDA7XG4gICAgdGhpcy5yb3RhdGVNYXNrID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIHByb2dyZXNzID0gZXZlbnQuZGV0YWlsLnByb2dyZXNzO1xuICAgICAgX3RoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgaWYgKHByb2dyZXNzID09PSAxKSB7XG4gICAgICAgIF90aGlzLmZpbmlzaERvd25sb2FkXygpO1xuICAgICAgfVxuICAgICAgX3RoaXMuJHRpbWVvdXRfKGZ1bmN0aW9uICgpIHt9LCAwKTtcbiAgICB9O1xuICB9XG4gIHZhciBfcHJvdG8gPSBDb250cm9sbGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLiRvbkluaXQgPSBmdW5jdGlvbiAkb25Jbml0KCkge1xuICAgIHRoaXMub2ZmbGluZU1vZGUucmVnaXN0ZXJDb21wb25lbnQodGhpcyk7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLm9uKCdwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18pO1xuICAgIHRoaXMubWFza01hcmdpbiA9IHRoaXMubWFza01hcmdpbiB8fCAxMDA7XG4gICAgdGhpcy5taW5ab29tID0gdGhpcy5taW5ab29tIHx8IDEwO1xuICAgIHRoaXMubWF4Wm9vbSA9IHRoaXMubWF4Wm9vbSB8fCAxNTtcbiAgICB0aGlzLm1hc2tMYXllcl8gPSBuZXcgTWFza0xheWVyKHtcbiAgICAgIGV4dGVudEluTWV0ZXJzOiB0aGlzLmV4dGVudFNpemVcbiAgICB9LCB7XG4gICAgICBtYXJnaW46IHRoaXMubWFza01hcmdpblxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLnVuKCdwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18pO1xuICB9O1xuICBfcHJvdG8uaGFzRGF0YSA9IGZ1bmN0aW9uIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5oYXNPZmZsaW5lRGF0YSgpO1xuICB9O1xuICBfcHJvdG8uY29tcHV0ZVNpemVBbmREaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEoKSB7XG4gICAgdGhpcy5lc3RpbWF0ZWRMb2FkRGF0YVNpemUgPSB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uZXN0aW1hdGVMb2FkRGF0YVNpemUodGhpcy5tYXApO1xuICAgIGlmICh0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsZXJ0TG9hZERhdGEgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlBbGVydE5vTGF5ZXIgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24gPSBmdW5jdGlvbiB0b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKGZpbmlzaGVkKSB7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RpbmdFeHRlbnQgPSAhdGhpcy5zZWxlY3RpbmdFeHRlbnQ7XG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy5tYXNrTGF5ZXJfKTtcbiAgICB0aGlzLnJlbW92ZVpvb21Db25zdHJhaW50c18oKTtcbiAgICBpZiAodGhpcy5zZWxlY3RpbmdFeHRlbnQgJiYgIXRoaXMubWFwLmdldExheWVycygpLmdldEFycmF5KCkuaW5jbHVkZXModGhpcy5tYXNrTGF5ZXJfKSkge1xuICAgICAgdGhpcy5hZGRab29tQ29uc3RyYWludHNfKCk7XG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLm1hc2tMYXllcl8pO1xuICAgIH1cbiAgICB0aGlzLm1hcC5yZW5kZXIoKTtcbiAgfTtcbiAgX3Byb3RvLnZhbGlkYXRlRXh0ZW50ID0gZnVuY3Rpb24gdmFsaWRhdGVFeHRlbnQoKSB7XG4gICAgdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gMDtcbiAgICB2YXIgZXh0ZW50ID0gdGhpcy5nZXREb3dsb2FkRXh0ZW50XygpO1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8uc2F2ZShleHRlbnQsIHRoaXMubWFwKTtcbiAgfTtcbiAgX3Byb3RvLmZpbmlzaERvd25sb2FkXyA9IGZ1bmN0aW9uIGZpbmlzaERvd25sb2FkXygpIHtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKHRydWUpO1xuICB9O1xuICBfcHJvdG8uYXNrQWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFza0Fib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gdHJ1ZTtcbiAgfTtcbiAgX3Byb3RvLmFib3J0RG93bmxvYWQgPSBmdW5jdGlvbiBhYm9ydERvd25sb2FkKCkge1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLmNhbmNlbCgpO1xuICAgIHRoaXMuZGVsZXRlRGF0YSgpO1xuICB9O1xuICBfcHJvdG8uc2hvd01lbnUgPSBmdW5jdGlvbiBzaG93TWVudSgpIHtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSB0cnVlO1xuICB9O1xuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5yZXN0b3JlKHRoaXMubWFwKS50aGVuKGZ1bmN0aW9uIChleHRlbnQpIHtcbiAgICAgIF90aGlzMi5kYXRhUG9seWdvbl8gPSBfdGhpczIuY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCk7XG4gICAgICB2YXIgc2l6ZSA9IF90aGlzMi5tYXAuZ2V0U2l6ZSgpO1xuICAgICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgICAgfVxuICAgICAgX3RoaXMyLm1hcC5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgICBzaXplOiBzaXplXG4gICAgICB9KTtcbiAgICAgIF90aGlzMi5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgICBfdGhpczIuZGlzcGxheUV4dGVudF8oKTtcbiAgICAgIF90aGlzMi5vZmZsaW5lTW9kZS5lbmFibGUoKTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmRlYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGRlYWN0aXZhdGVPZmZsaW5lTW9kZSgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH07XG4gIF9wcm90by50b2dnbGVFeHRlbnRWaXNpYmlsaXR5ID0gZnVuY3Rpb24gdG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSgpIHtcbiAgICBpZiAodGhpcy5pc0V4dGVudFZpc2libGUoKSkge1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXh0ZW50XygpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmlzRXh0ZW50VmlzaWJsZSA9IGZ1bmN0aW9uIGlzRXh0ZW50VmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uZ2V0TGVuZ3RoKCkgPiAwO1xuICB9O1xuICBfcHJvdG8uZGVsZXRlRGF0YSA9IGZ1bmN0aW9uIGRlbGV0ZURhdGEoKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG4gICAgaWYgKHRoaXMubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpKSB7XG4gICAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHJlbG9hZElmSW5PZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIHJlbG9hZElmSW5PZmZsaW5lTW9kZSgpIHtcbiAgICAgIGlmIChfdGhpczMub2ZmbGluZU1vZGUuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgX3RoaXMzLmRlYWN0aXZhdGVPZmZsaW5lTW9kZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmNsZWFyKCkudGhlbihyZWxvYWRJZkluT2ZmbGluZU1vZGUpO1xuICB9O1xuICBfcHJvdG8uZGlzcGxheUV4dGVudF8gPSBmdW5jdGlvbiBkaXNwbGF5RXh0ZW50XygpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHRlbnRWaXNpYmxlKCkgJiYgdGhpcy5kYXRhUG9seWdvbl8pIHtcbiAgICAgIHZhciBmZWF0dXJlID0gbmV3IEZlYXR1cmUodGhpcy5kYXRhUG9seWdvbl8pO1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8ucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5hZGRab29tQ29uc3RyYWludHNfID0gZnVuY3Rpb24gYWRkWm9vbUNvbnN0cmFpbnRzXygpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB2YXIgem9vbSA9IHZpZXcuZ2V0Wm9vbSgpIHx8IDA7XG4gICAgdGhpcy5vcmlnaW5hbE1pblpvb20gPSB2aWV3LmdldE1pblpvb20oKTtcbiAgICB0aGlzLm9yaWdpbmFsTWF4Wm9vbSA9IHZpZXcuZ2V0TWF4Wm9vbSgpO1xuICAgIGlmICh6b29tIDwgdGhpcy5taW5ab29tKSB7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5taW5ab29tKTtcbiAgICB9IGVsc2UgaWYgKHpvb20gPiB0aGlzLm1heFpvb20pIHtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIH1cbiAgICB2aWV3LnNldE1heFpvb20odGhpcy5tYXhab29tKTtcbiAgICB2aWV3LnNldE1pblpvb20odGhpcy5taW5ab29tKTtcbiAgfTtcbiAgX3Byb3RvLnJlbW92ZVpvb21Db25zdHJhaW50c18gPSBmdW5jdGlvbiByZW1vdmVab29tQ29uc3RyYWludHNfKCkge1xuICAgIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIGlmICh0aGlzLm9yaWdpbmFsTWF4Wm9vbSAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3JpZ2luYWxNaW5ab29tICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm9yaWdpbmFsTWF4Wm9vbSk7XG4gICAgICB2aWV3LnNldE1pblpvb20odGhpcy5vcmlnaW5hbE1pblpvb20pO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZVBvbHlnb25Gcm9tRXh0ZW50XyA9IGZ1bmN0aW9uIGNyZWF0ZVBvbHlnb25Gcm9tRXh0ZW50XyhleHRlbnQpIHtcbiAgICB2YXIgcHJvakV4dGVudCA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCkuZ2V0RXh0ZW50KCk7XG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKFtleHRlbnRUb1JlY3RhbmdsZShwcm9qRXh0ZW50KSwgZXh0ZW50VG9SZWN0YW5nbGUoZXh0ZW50KV0sICdYWScpO1xuICB9O1xuICBfcHJvdG8uZ2V0RG93bG9hZEV4dGVudF8gPSBmdW5jdGlvbiBnZXREb3dsb2FkRXh0ZW50XygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIHZhciBoYWxmTGVuZ3RoID0gTWF0aC5jZWlsKHRoaXMuZXh0ZW50U2l6ZSB8fCB0aGlzLmdldEV4dGVudFNpemVfKCkpIC8gMjtcbiAgICByZXR1cm4gdGhpcy5tYXNrTGF5ZXJfLmNyZWF0ZUV4dGVudChjZW50ZXIsIGhhbGZMZW5ndGgpO1xuICB9O1xuICBfcHJvdG8uZ2V0RXh0ZW50U2l6ZV8gPSBmdW5jdGlvbiBnZXRFeHRlbnRTaXplXygpIHtcbiAgICB2YXIgbWFwU2l6ZSA9IHRoaXMubWFwLmdldFNpemUoKSB8fCBbMTUwLCAxNTBdO1xuICAgIHZhciBtYXNrU2l6ZVBpeGVsID0gREVWSUNFX1BJWEVMX1JBVElPICogTWF0aC5taW4obWFwU2l6ZVswXSwgbWFwU2l6ZVsxXSkgLSB0aGlzLm1hc2tNYXJnaW4gKiAyO1xuICAgIHZhciBtYXNrU2l6ZU1ldGVyID0gbWFza1NpemVQaXhlbCAqICh0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpIHx8IDEpIC8gREVWSUNFX1BJWEVMX1JBVElPO1xuICAgIHJldHVybiBtYXNrU2l6ZU1ldGVyO1xuICB9O1xuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ25nZW9PZmZsaW5lQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiaW1wb3J0IG5nZW9PZmZsaW5lQ29tcG9uZW50IGZyb20gJ25nZW8vb2ZmbGluZS9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9PZmZsaW5lTmV0d29ya1N0YXR1cyBmcm9tICduZ2VvL29mZmxpbmUvTmV0d29ya1N0YXR1cyc7XG5pbXBvcnQgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlciBmcm9tICduZ2VvL29mZmxpbmUvU2VydmljZU1hbmFnZXInO1xuaW1wb3J0IGRvd25sb2FkZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Rvd25sb2FkZXInO1xuaW1wb3J0IHJlc3RvcmVyIGZyb20gJ25nZW8vb2ZmbGluZS9SZXN0b3Jlcic7XG5pbXBvcnQgbW9kZSBmcm9tICduZ2VvL29mZmxpbmUvTW9kZSc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBleHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lTW9kdWxlJywgW25nZW9PZmZsaW5lQ29tcG9uZW50Lm5hbWUsIG5nZW9PZmZsaW5lTmV0d29ya1N0YXR1cy5tb2R1bGUubmFtZSwgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5tb2R1bGUubmFtZSwgZG93bmxvYWRlci5tb2R1bGUubmFtZSwgcmVzdG9yZXIubW9kdWxlLm5hbWUsIG1vZGUubW9kdWxlLm5hbWVdKTtcbmV4cG9ydHMudmFsdWUoJ25nZW9PZmZsaW5lR3V0dGVyJywgOTYpO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJpbXBvcnQgb2xMYXllckdyb3VwIGZyb20gJ29sL2xheWVyL0dyb3VwJztcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUxheWVyKGxheWVyLCBhbmNlc3RvcnMsIHZpc2l0b3IpIHtcbiAgdmFyIGRlc2NlbmQgPSB2aXNpdG9yKGxheWVyLCBhbmNlc3RvcnMpO1xuICBpZiAoZGVzY2VuZCAmJiBsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJHcm91cCkge1xuICAgIGxheWVyLmdldExheWVycygpLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTGF5ZXIpIHtcbiAgICAgIHRyYXZlcnNlTGF5ZXIoY2hpbGRMYXllciwgW10uY29uY2F0KGFuY2VzdG9ycywgW2xheWVyXSksIHZpc2l0b3IpO1xuICAgIH0pO1xuICB9XG59XG52YXIgZXh0cmFjdG9yID0gbmV3IFJlZ0V4cCgnW14vXSovL1teL10rLyguKiknKTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVVUkwodXJsKSB7XG4gIHZhciBtYXRjaGVzID0gZXh0cmFjdG9yLmV4ZWModXJsKTtcbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgbm9ybWFsaXplIHVybCAnICsgdXJsKTtcbiAgfVxuICByZXR1cm4gbWF0Y2hlc1sxXTtcbn0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbk5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3SEE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNURBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNJQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9