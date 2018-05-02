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
// Copyright (c) 2018-2022 Camptocamp SA
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

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1532);

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
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

















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
    _this.serDes_ = new ngeo_offline_SerializerDeserializer__WEBPACK_IMPORTED_MODULE_10__["default"]({
      gutter: ngeoOfflineGutter
    });
    _this.gutter_ = ngeoOfflineGutter;
    return _this;
  }
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
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





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
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



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
    _this.context_ = Object(ol_dom__WEBPACK_IMPORTED_MODULE_1__["createCanvasContext2D"])();
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
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01hc2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1Jlc3RvcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvU2VydmljZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvVGlsZXNEb3dubG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm9mZmxpbmVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMxLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxOC0yMDIyIENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuaW1wb3J0ICcuL29mZmxpbmUuY3NzJztcbmltcG9ydCAnLi9jb21tb25fZGVwZW5kZW5jaWVzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuXG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9PZmZsaW5lTW9kdWxlIGZyb20gJ25nZW8vb2ZmbGluZS9tb2R1bGUnO1xuaW1wb3J0IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiBmcm9tICduZ2VvL29mZmxpbmUvQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBOZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlcic7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzJykuZGVmYXVsdH0gbmdlb05ldHdvcmtTdGF0dXMgbmdlbyBuZXR3b3JrIHN0YXR1cyBzZXJ2aWNlLlxuICAgKiBAcGFyYW0ge05nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJ9IG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIgbmdlbyBvZmZsaW5lIHNlcnZpY2UuXG4gICAqIEBuZ0luamVjdFxuICAgKi9cbiAgY29uc3RydWN0b3Iobmdlb05ldHdvcmtTdGF0dXMsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIpIHtcbiAgICAvKipcbiAgICAgKiBTYXZlIGEgc3F1YXJlIG9mIDEwIGttIHNpZGV3YXlzIChNYXAncyB1bml0IGlzIHRoZSBtZXRlcikuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBleHBvcnRcbiAgICAgKi9cbiAgICB0aGlzLm9mZmxpbmVFeHRlbnRTaXplID0gMTAwMDA7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7bmdlb05ldHdvcmtTdGF0dXN9XG4gICAgICogQGV4cG9ydFxuICAgICAqL1xuICAgIHRoaXMubmdlb05ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtvbE1hcH1cbiAgICAgKiBAZXhwb3J0XG4gICAgICovXG4gICAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgICAgbGF5ZXJzOiBbXG4gICAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICAgIGNlbnRlcjogWzM1MjM3OSwgNTE3MjczM10sXG4gICAgICAgIHpvb206IDQsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcblxuICAgIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIuc2V0U2F2ZVNlcnZpY2UoJ29mZmxpbmVEb3dubG9hZGVyJyk7XG4gICAgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5zZXRSZXN0b3JlU2VydmljZSgnbmdlb09mZmxpbmVSZXN0b3JlcicpO1xuICB9XG59XG5cbi8qKiBAdHlwZSB7IWFuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgZ21mTWFwQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9PZmZsaW5lTW9kdWxlLm5hbWUsXG4gIE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWUsXG5dKTtcblxubXlNb2R1bGUudmFsdWUoJ25nZW9PZmZsaW5lVGVzdFVybCcsICcuLi8uLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuaHRtbCcpO1xuXG4vLyBEZWZpbmUgdGhlIG9mZmxpbmUgZG93bmxvYWQgY29uZmlndXJhdGlvbiBzZXJ2aWNlXG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24nLCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pO1xuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcblxubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9UaWxlc1ByZWxvYWRpbmdMaW1pdCcsIDApO1xuXG5vcHRpb25zKG15TW9kdWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRyb2xsZXI7XG4iLCJ2YXIgZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIoKSB7XG4gICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuY3VycmVudElkXyA9IDA7XG4gIH1cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnc2V0SXRlbSddLmNvbmNhdChhcmdzKSk7XG4gIH07XG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnZ2V0SXRlbSddLmNvbmNhdChhcmdzKSk7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbignY2xlYXInKTtcbiAgfTtcbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQWN0aW9uLmFwcGx5KHRoaXMsIFsnY29uZmlnJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbihjb21tYW5kKSB7XG4gICAgdmFyIGlkID0gKyt0aGlzLmN1cnJlbnRJZF87XG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICBwbHVnaW46ICdsb2NhbGZvcmFnZScsXG4gICAgICBjb21tYW5kOiBjb21tYW5kLFxuICAgICAgYXJnczogYXJncyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGNvbnRleHQ6IG51bGxcbiAgICB9O1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHtcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoX2FueSkge30sXG4gICAgICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChfYW55KSB7fVxuICAgIH07XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uc2V0KGlkLCB3YWl0aW5nUHJvbWlzZSk7XG4gICAgdGhpcy5wb3N0VG9CYWNrZW5kKGFjdGlvbik7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG4gIF9wcm90by5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIHJlY2VpdmVNZXNzYWdlKGV2ZW50KSB7XG4gICAgdmFyIGFjdGlvbiA9IGV2ZW50LmRhdGE7XG4gICAgdmFyIGlkID0gYWN0aW9uLmlkO1xuICAgIHZhciBjb21tYW5kID0gYWN0aW9uLmNvbW1hbmQ7XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb24uYXJncyB8fCBbXTtcbiAgICB2YXIgY29udGV4dCA9IGFjdGlvbi5jb250ZXh0O1xuICAgIHZhciBtc2cgPSBhY3Rpb24ubXNnO1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHRoaXMud2FpdGluZ1Byb21pc2VzXy5nZXQoaWQpO1xuICAgIGlmIChjb21tYW5kID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1zZywgYXJncywgY29udGV4dCk7XG4gICAgICBpZiAod2FpdGluZ1Byb21pc2UpIHtcbiAgICAgICAgd2FpdGluZ1Byb21pc2UucmVqZWN0KGFyZ3MsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdyZXNwb25zZScpIHtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlc29sdmUuYXBwbHkod2FpdGluZ1Byb21pc2UsIGFyZ3MpO1xuICAgICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBjb21tYW5kJywgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLCBudWxsLCAnXFx0JykpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge307XG4gIHJldHVybiBBYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlcjtcbn0oKTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuaW1wb3J0IG9sT2JzZXJ2YWJsZSBmcm9tICdvbC9PYnNlcnZhYmxlJztcbmltcG9ydCBvbExheWVyTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IHsgZGVmYXVsdEltYWdlTG9hZEZ1bmN0aW9uIH0gZnJvbSAnb2wvc291cmNlL0ltYWdlJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUyc7XG5pbXBvcnQgb2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TJztcbmltcG9ydCB7IGNyZWF0ZUZvclByb2plY3Rpb24gYXMgY3JlYXRlVGlsZUdyaWRGb3JQcm9qZWN0aW9uIH0gZnJvbSAnb2wvdGlsZWdyaWQnO1xuaW1wb3J0IFNlcmlhbGl6ZXJEZXNlcmlhbGl6ZXIgZnJvbSAnbmdlby9vZmZsaW5lL1NlcmlhbGl6ZXJEZXNlcmlhbGl6ZXInO1xuaW1wb3J0IExvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXInO1xuaW1wb3J0IExvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlQW5kcm9pZFdyYXBwZXInO1xuaW1wb3J0IExvY2FsZm9yYWdlSW9zV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyJztcbmltcG9ydCBuZ2VvQ3VzdG9tRXZlbnQgZnJvbSAnbmdlby9DdXN0b21FdmVudCc7XG5pbXBvcnQgeyBub3JtYWxpemVVUkwsIHRyYXZlcnNlTGF5ZXIgfSBmcm9tICduZ2VvL29mZmxpbmUvdXRpbHMnO1xuaW1wb3J0IGxvY2FsZm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlL3NyYy9sb2NhbGZvcmFnZSc7XG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX29sT2JzZXJ2YWJsZSkge1xuICBfZGVmYXVsdC4kaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcIm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcIiwgXCJuZ2VvT2ZmbGluZUd1dHRlclwiXTtcbiAgX2luaGVyaXRzTG9vc2UoX2RlZmF1bHQsIF9vbE9ic2VydmFibGUpO1xuICBmdW5jdGlvbiBfZGVmYXVsdCgkcm9vdFNjb3BlLCBuZ2VvQmFja2dyb3VuZExheWVyTWdyLCBuZ2VvT2ZmbGluZUd1dHRlcikge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9vbE9ic2VydmFibGUuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmxvY2FsZm9yYWdlXyA9IF90aGlzLmNyZWF0ZUxvY2FsZm9yYWdlKCk7XG4gICAgX3RoaXMuY29uZmlndXJlTG9jYWxmb3JhZ2UoKTtcbiAgICBfdGhpcy5yb290U2NvcGVfID0gJHJvb3RTY29wZTtcbiAgICBfdGhpcy5oYXNEYXRhID0gZmFsc2U7XG4gICAgX3RoaXMuaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhKCk7XG4gICAgX3RoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xuICAgIF90aGlzLnNlckRlc18gPSBuZXcgU2VyaWFsaXplckRlc2VyaWFsaXplcih7XG4gICAgICBndXR0ZXI6IG5nZW9PZmZsaW5lR3V0dGVyXG4gICAgfSk7XG4gICAgX3RoaXMuZ3V0dGVyXyA9IG5nZW9PZmZsaW5lR3V0dGVyO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuICBfcHJvdG8uZGlzcGF0Y2hQcm9ncmVzc18gPSBmdW5jdGlvbiBkaXNwYXRjaFByb2dyZXNzXyhwcm9ncmVzcykge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgbmdlb0N1c3RvbUV2ZW50KCdwcm9ncmVzcycsIHtcbiAgICAgICdwcm9ncmVzcyc6IHByb2dyZXNzXG4gICAgfSkpO1xuICB9O1xuICBfcHJvdG8uaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHRoaXMuZ2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JykudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBfdGhpczIuc2V0SGFzT2ZmbGluZURhdGEoISF2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5oYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIGhhc09mZmxpbmVEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0RhdGE7XG4gIH07XG4gIF9wcm90by5zZXRIYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIHNldEhhc09mZmxpbmVEYXRhKHZhbHVlKSB7XG4gICAgdmFyIG5lZWREaWdlc3QgPSB2YWx1ZSAhPT0gdGhpcy5oYXNEYXRhO1xuICAgIHRoaXMuaGFzRGF0YSA9IHZhbHVlO1xuICAgIGlmIChuZWVkRGlnZXN0KSB7XG4gICAgICB0aGlzLnJvb3RTY29wZV8uJGFwcGx5QXN5bmMoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50cmFjZUdldFNldEl0ZW0gPSBmdW5jdGlvbiB0cmFjZUdldFNldEl0ZW0obXNnLCBrZXksIHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZUxvY2FsZm9yYWdlID0gZnVuY3Rpb24gY3JlYXRlTG9jYWxmb3JhZ2UoKSB7XG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9Y29yZG92YScpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgY29yZG92YSBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyKCk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWFuZHJvaWQnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGFuZHJvaWQgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlcigpO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1pb3MnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGlvcyBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUlvc1dyYXBwZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsZm9yYWdlO1xuICB9O1xuICBfcHJvdG8uY29uZmlndXJlTG9jYWxmb3JhZ2UgPSBmdW5jdGlvbiBjb25maWd1cmVMb2NhbGZvcmFnZSgpIHtcbiAgICB0aGlzLmxvY2FsZm9yYWdlXy5jb25maWcoe1xuICAgICAgJ25hbWUnOiAnbmdlb09mZmxpbmVTdG9yYWdlJyxcbiAgICAgICd2ZXJzaW9uJzogMS4wLFxuICAgICAgJ3N0b3JlTmFtZSc6ICdvZmZsaW5lU3RvcmFnZSdcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGtleSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ2dldEl0ZW0nXShrZXkpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnZ2V0SXRlbScsIGtleSwgcHJvbWlzZSk7XG4gIH07XG4gIF9wcm90by5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXkpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydyZW1vdmVJdGVtJ10oa2V5KTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3JlbW92ZUl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oa2V5LCB2YWx1ZSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ3NldEl0ZW0nXShrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3NldEl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLnNldEhhc09mZmxpbmVEYXRhKGZhbHNlKTtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfLmNsZWFyKCk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdjbGVhcicsICcnLCBwcm9taXNlKTtcbiAgfTtcbiAgX3Byb3RvLmVzdGltYXRlTG9hZERhdGFTaXplID0gZnVuY3Rpb24gZXN0aW1hdGVMb2FkRGF0YVNpemUobWFwKSB7XG4gICAgcmV0dXJuIDUwO1xuICB9O1xuICBfcHJvdG8uZ2V0TGF5ZXJLZXkgPSBmdW5jdGlvbiBnZXRMYXllcktleShsYXllckl0ZW0pIHtcbiAgICByZXR1cm4gbGF5ZXJJdGVtLmxheWVyLmdldCgnbGFiZWwnKTtcbiAgfTtcbiAgX3Byb3RvLm9uVGlsZURvd25sb2FkU3VjY2VzcyA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkU3VjY2Vzcyhwcm9ncmVzcywgdGlsZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpO1xuICAgIGlmICh0aWxlLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRJdGVtKG5vcm1hbGl6ZVVSTCh0aWxlLnVybCksIHRpbGUucmVzcG9uc2UpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG4gIF9wcm90by5vblRpbGVEb3dubG9hZEVycm9yID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRFcnJvcihwcm9ncmVzcykge1xuICAgIHRoaXMuZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcbiAgX3Byb3RvLmdldEV4dGVudEJ5Wm9vbSA9IGZ1bmN0aW9uIGdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgY3VycmVudFpvb20gPSBtYXAuZ2V0VmlldygpLmdldFpvb20oKTtcbiAgICBpZiAoY3VycmVudFpvb20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGN1cnJlbnRab29tJyk7XG4gICAgfVxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgWzAsIDEsIDIsIDMsIDRdLmZvckVhY2goZnVuY3Rpb24gKGR6KSB7XG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB6b29tOiBjdXJyZW50Wm9vbSArIGR6LFxuICAgICAgICBleHRlbnQ6IHVzZXJFeHRlbnRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuICBfcHJvdG8uc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMgPSBmdW5jdGlvbiBzb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyhzb3VyY2UsIHByb2plY3Rpb24pIHtcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VJbWFnZVdNUyAmJiBzb3VyY2UuZ2V0VXJsKCkgJiYgc291cmNlLmdldEltYWdlTG9hZEZ1bmN0aW9uKCkgPT09IGRlZmF1bHRJbWFnZUxvYWRGdW5jdGlvbikge1xuICAgICAgdmFyIHRpbGVHcmlkID0gY3JlYXRlVGlsZUdyaWRGb3JQcm9qZWN0aW9uKHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkgfHwgcHJvamVjdGlvbiwgNDIsIDI1Nik7XG4gICAgICB2YXIgYXR0cmlidXRpb25zID0gc291cmNlLmdldEF0dHJpYnV0aW9ucygpIHx8ICcnO1xuICAgICAgdmFyIHVybCA9IHNvdXJjZS5nZXRVcmwoKTtcbiAgICAgIGlmICghdXJsIHx8ICFhdHRyaWJ1dGlvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlcycpO1xuICAgICAgfVxuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlVGlsZVdNUyh7XG4gICAgICAgIGd1dHRlcjogdGhpcy5ndXR0ZXJfLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdGlsZUdyaWQ6IHRpbGVHcmlkLFxuICAgICAgICBhdHRyaWJ1dGlvbnM6IGF0dHJpYnV0aW9ucyxcbiAgICAgICAgcHJvamVjdGlvbjogc291cmNlLmdldFByb2plY3Rpb24oKSxcbiAgICAgICAgcGFyYW1zOiBzb3VyY2UuZ2V0UGFyYW1zKClcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuICBfcHJvdG8uY3JlYXRlTGF5ZXJNZXRhZGF0YXMgPSBmdW5jdGlvbiBjcmVhdGVMYXllck1ldGFkYXRhcyhtYXAsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB2YXIgbGF5ZXJzSXRlbXMgPSBbXTtcbiAgICB2YXIgdmlzaXRMYXllciA9IGZ1bmN0aW9uIHZpc2l0TGF5ZXIobGF5ZXIsIGFuY2VzdG9ycykge1xuICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllckxheWVyKSB7XG4gICAgICAgIHZhciBleHRlbnRCeVpvb20gPSBfdGhpczMuZ2V0RXh0ZW50Qnlab29tKG1hcCwgbGF5ZXIsIGFuY2VzdG9ycywgdXNlckV4dGVudCk7XG4gICAgICAgIHZhciBwcm9qZWN0aW9uID0gb2xQcm9qLmdldChtYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSk7XG4gICAgICAgIHZhciBzb3VyY2UgPSBfdGhpczMuc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMobGF5ZXIuZ2V0U291cmNlKCksIHByb2plY3Rpb24pO1xuICAgICAgICB2YXIgbGF5ZXJUeXBlO1xuICAgICAgICB2YXIgbGF5ZXJTZXJpYWxpemF0aW9uO1xuICAgICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVGlsZSB8fCBsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJJbWFnZSkge1xuICAgICAgICAgIGxheWVyVHlwZSA9ICd0aWxlJztcbiAgICAgICAgICBsYXllclNlcmlhbGl6YXRpb24gPSBfdGhpczMuc2VyRGVzXy5zZXJpYWxpemVUaWxlTGF5ZXIobGF5ZXIsIHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVmVjdG9yKSB7XG4gICAgICAgICAgbGF5ZXJUeXBlID0gJ3ZlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJhY2tncm91bmRMYXllciA9IF90aGlzMy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXy5nZXQobWFwKSA9PT0gbGF5ZXI7XG4gICAgICAgIGxheWVyc0l0ZW1zLnB1c2goe1xuICAgICAgICAgIGJhY2tncm91bmRMYXllcjogYmFja2dyb3VuZExheWVyLFxuICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgIGV4dGVudEJ5Wm9vbTogZXh0ZW50Qnlab29tLFxuICAgICAgICAgIGxheWVyVHlwZTogbGF5ZXJUeXBlLFxuICAgICAgICAgIGxheWVyU2VyaWFsaXphdGlvbjogbGF5ZXJTZXJpYWxpemF0aW9uLFxuICAgICAgICAgIGxheWVyOiBsYXllcixcbiAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICBhbmNlc3RvcnM6IGFuY2VzdG9yc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgbWFwLmdldExheWVycygpLmZvckVhY2goZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgIHRyYXZlcnNlTGF5ZXIocm9vdCwgW10sIHZpc2l0TGF5ZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBsYXllcnNJdGVtcztcbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZVRpbGVMb2FkRnVuY3Rpb25fID0gZnVuY3Rpb24gY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8ob2ZmbGluZUxheWVyKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG4gICAgdmFyIHRpbGVMb2FkRnVuY3Rpb24gPSBmdW5jdGlvbiB0aWxlTG9hZEZ1bmN0aW9uKGltYWdlVGlsZSwgc3JjKSB7XG4gICAgICBfdGhpczQuZ2V0SXRlbShub3JtYWxpemVVUkwoc3JjKSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICBjb250ZW50ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFDMGxFUVZSNDJtTmtZQUFBQUFZQUFqQ0IwQzhBQUFBQVNVVk9SSzVDWUlJPSc7XG4gICAgICAgIH1cbiAgICAgICAgaW1hZ2VUaWxlLmdldEltYWdlKCkuc3JjID0gY29udGVudDtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHRpbGVMb2FkRnVuY3Rpb247XG4gIH07XG4gIF9wcm90by5yZWNyZWF0ZU9mZmxpbmVMYXllciA9IGZ1bmN0aW9uIHJlY3JlYXRlT2ZmbGluZUxheWVyKG9mZmxpbmVMYXllcikge1xuICAgIGlmIChvZmZsaW5lTGF5ZXIubGF5ZXJUeXBlID09PSAndGlsZScpIHtcbiAgICAgIHZhciBzZXJpYWxpemF0aW9uID0gb2ZmbGluZUxheWVyLmxheWVyU2VyaWFsaXphdGlvbjtcbiAgICAgIGlmIChzZXJpYWxpemF0aW9uKSB7XG4gICAgICAgIHZhciB0aWxlTG9hZEZ1bmN0aW9uID0gdGhpcy5jcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyhvZmZsaW5lTGF5ZXIpO1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLnNlckRlc18uZGVzZXJpYWxpemVUaWxlTGF5ZXIoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG4gIF9wcm90by5nZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzID0gZnVuY3Rpb24gZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpIHtcbiAgICByZXR1cm4gMTE7XG4gIH07XG4gIHJldHVybiBfZGVmYXVsdDtcbn0ob2xPYnNlcnZhYmxlKTtcbmV4cG9ydCB7IF9kZWZhdWx0IGFzIGRlZmF1bHQgfTsiLCJmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdOyBpZiAoaXQpIHJldHVybiAoaXQgPSBpdC5jYWxsKG8pKS5uZXh0LmJpbmQoaXQpOyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07IHJldHVybiBhcnIyOyB9XG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUyc7XG5pbXBvcnQgb2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTJztcbmltcG9ydCBUaWxlc0Rvd25sb2FkZXIgZnJvbSAnbmdlby9vZmZsaW5lL1RpbGVzRG93bmxvYWRlcic7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmZ1bmN0aW9uIG1hZ25pdHVkZTIoYSwgYikge1xuICB2YXIgbWFnbml0dWRlU3F1YXJlZCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIG1hZ25pdHVkZVNxdWFyZWQgKz0gTWF0aC5wb3coYVtpXSAtIGJbaV0sIDIpO1xuICB9XG4gIHJldHVybiBtYWduaXR1ZGVTcXVhcmVkO1xufVxudmFyIERvd25sb2FkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIERvd25sb2FkZXIuJGluamVjdCA9IFtcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiXTtcbiAgZnVuY3Rpb24gRG93bmxvYWRlcihuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICAgIHRoaXMudGlsZURvd25sb2FkZXJfID0gbnVsbDtcbiAgfVxuICB2YXIgX3Byb3RvID0gRG93bmxvYWRlci5wcm90b3R5cGU7XG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRoaXMudGlsZURvd25sb2FkZXJfKSB7XG4gICAgICB0aGlzLnRpbGVEb3dubG9hZGVyXy5jYW5jZWwoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5xdWV1ZUxheWVyVGlsZXNfID0gZnVuY3Rpb24gcXVldWVMYXllclRpbGVzXyhsYXllck1ldGFkYXRhLCBxdWV1ZSkge1xuICAgIHZhciBzb3VyY2UgPSBsYXllck1ldGFkYXRhLnNvdXJjZTtcbiAgICB2YXIgbWFwID0gbGF5ZXJNZXRhZGF0YS5tYXAsXG4gICAgICBleHRlbnRCeVpvb20gPSBsYXllck1ldGFkYXRhLmV4dGVudEJ5Wm9vbTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmFzc2VydChzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVRpbGVXTVMgfHwgc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VXTVRTKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IG1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHZhciB0aWxlR3JpZCA9IHNvdXJjZS5nZXRUaWxlR3JpZCgpO1xuICAgIHZhciB0aWxlVXJsRnVuY3Rpb24gPSBzb3VyY2UuZ2V0VGlsZVVybEZ1bmN0aW9uKCk7XG4gICAgY29uc29sZS5hc3NlcnQoZXh0ZW50Qnlab29tKTtcbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgIHZhciBleHRlbnRab29tID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgeiA9IGV4dGVudFpvb20uem9vbTtcbiAgICAgIHZhciBleHRlbnQgPSBleHRlbnRab29tLmV4dGVudDtcbiAgICAgIHZhciBxdWV1ZUJ5WiA9IFtdO1xuICAgICAgdmFyIG1pblg7XG4gICAgICB2YXIgbWluWTtcbiAgICAgIHZhciBtYXhYO1xuICAgICAgdmFyIG1heFk7XG4gICAgICB0aWxlR3JpZC5mb3JFYWNoVGlsZUNvb3JkKGV4dGVudCwgeiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIG1heFggPSBjb29yZFsxXTtcbiAgICAgICAgbWF4WSA9IGNvb3JkWzJdO1xuICAgICAgICBpZiAobWluWCA9PT0gdW5kZWZpbmVkIHx8IG1pblkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG1pblggPSBjb29yZFsxXTtcbiAgICAgICAgICBtaW5ZID0gY29vcmRbMl07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IHRpbGVVcmxGdW5jdGlvbihjb29yZCwgREVWSUNFX1BJWEVMX1JBVElPLCBwcm9qZWN0aW9uKTtcbiAgICAgICAgY29uc29sZS5hc3NlcnQodXJsKTtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgIHZhciB0aWxlID0ge1xuICAgICAgICAgICAgY29vcmQ6IGNvb3JkLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICByZXNwb25zZTogbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgICAgcXVldWVCeVoucHVzaCh0aWxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgY2VudGVyVGlsZUNvb3JkID0gW3osIChtaW5YICsgbWF4WCkgLyAyLCAobWluWSArIG1heFkpIC8gMl07XG4gICAgICBxdWV1ZUJ5Wi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBtYWduaXR1ZGUyKGEuY29vcmQsIGNlbnRlclRpbGVDb29yZCkgLSBtYWduaXR1ZGUyKGIuY29vcmQsIGNlbnRlclRpbGVDb29yZCk7XG4gICAgICB9KTtcbiAgICAgIHF1ZXVlLnB1c2guYXBwbHkocXVldWUsIHF1ZXVlQnlaKTtcbiAgICB9O1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoZXh0ZW50Qnlab29tKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIF9sb29wKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoZXh0ZW50LCBtYXApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBsYXllcnNNZXRhZGF0YXMgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLmNyZWF0ZUxheWVyTWV0YWRhdGFzKG1hcCwgZXh0ZW50KTtcbiAgICB2YXIgcGVyc2lzdGVudExheWVycyA9IFtdO1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciB6b29tcyA9IFtdO1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKGxheWVyc01ldGFkYXRhcyksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgbGF5ZXJJdGVtID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgaWYgKGxheWVySXRlbS5sYXllclR5cGUgPT09ICd0aWxlJykge1xuICAgICAgICB2YXIgdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWV1ZUxheWVyVGlsZXNfKGxheWVySXRlbSwgdGlsZXMpO1xuICAgICAgICBxdWV1ZS5wdXNoLmFwcGx5KHF1ZXVlLCB0aWxlcyk7XG4gICAgICB9XG4gICAgICBwZXJzaXN0ZW50TGF5ZXJzLnB1c2goe1xuICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IGxheWVySXRlbS5iYWNrZ3JvdW5kTGF5ZXIsXG4gICAgICAgIGxheWVyVHlwZTogbGF5ZXJJdGVtLmxheWVyVHlwZSxcbiAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uOiBsYXllckl0ZW0ubGF5ZXJTZXJpYWxpemF0aW9uLFxuICAgICAgICBrZXk6IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TGF5ZXJLZXkobGF5ZXJJdGVtKVxuICAgICAgfSk7XG4gICAgICBsYXllckl0ZW0uZXh0ZW50Qnlab29tLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgem9vbSA9IG9iai56b29tO1xuICAgICAgICBpZiAoIXpvb21zLmluY2x1ZGVzKHpvb20pKSB7XG4gICAgICAgICAgem9vbXMucHVzaCh6b29tKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBwZXJzaXN0ZW50T2JqZWN0ID0ge1xuICAgICAgZXh0ZW50OiBleHRlbnQsXG4gICAgICBsYXllcnM6IHBlcnNpc3RlbnRMYXllcnMsXG4gICAgICB6b29tczogem9vbXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHNldE9mZmxpbmVDb250ZW50UHJvbWlzZSA9IHRoaXMuY29uZmlndXJhdGlvbl8uc2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JywgcGVyc2lzdGVudE9iamVjdCk7XG4gICAgdmFyIG1heERvd25sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpO1xuICAgIHRoaXMudGlsZURvd25sb2FkZXJfID0gbmV3IFRpbGVzRG93bmxvYWRlcihxdWV1ZSwgdGhpcy5jb25maWd1cmF0aW9uXywgbWF4RG93bmxvYWRzKTtcbiAgICB2YXIgdGlsZURvd25sb2FkUHJvbWlzZSA9IHRoaXMudGlsZURvd25sb2FkZXJfLmRvd25sb2FkKCk7XG4gICAgdmFyIGFsbFByb21pc2UgPSBQcm9taXNlLmFsbChbc2V0T2ZmbGluZUNvbnRlbnRQcm9taXNlLCB0aWxlRG93bmxvYWRQcm9taXNlXSk7XG4gICAgdmFyIHNldEhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gc2V0SGFzT2ZmbGluZURhdGEoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuY29uZmlndXJhdGlvbl8uc2V0SGFzT2ZmbGluZURhdGEodHJ1ZSk7XG4gICAgfTtcbiAgICBhbGxQcm9taXNlLnRoZW4oc2V0SGFzT2ZmbGluZURhdGEsIHNldEhhc09mZmxpbmVEYXRhKTtcbiAgICByZXR1cm4gYWxsUHJvbWlzZTtcbiAgfTtcbiAgcmV0dXJuIERvd25sb2FkZXI7XG59KCk7XG52YXIgbmFtZSA9ICdvZmZsaW5lRG93bmxvYWRlcic7XG5Eb3dubG9hZGVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtdKS5zZXJ2aWNlKG5hbWUsIERvd25sb2FkZXIpO1xudmFyIGV4cG9ydHMgPSBEb3dubG9hZGVyO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyJztcbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoQW5kcm9pZFdyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuICBmdW5jdGlvbiBBbmRyb2lkV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuYW5kcm9pZFdyYXBwZXIgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgdmFyIF9wcm90byA9IEFuZHJvaWRXcmFwcGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge1xuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93Lm5nZW9Ib3N0LnBvc3RNZXNzYWdlVG9BbmRyb2lkKHN0cmluZ2lmaWVkKTtcbiAgfTtcbiAgX3Byb3RvLnJlY2VpdmVGcm9tQW5kcm9pZCA9IGZ1bmN0aW9uIHJlY2VpdmVGcm9tQW5kcm9pZChhY3Rpb25TdHJpbmcpIHtcbiAgICB2YXIgYWN0aW9uID0gSlNPTi5wYXJzZShhY3Rpb25TdHJpbmcpO1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgJ2RhdGEnOiBhY3Rpb25cbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIEFuZHJvaWRXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyJztcbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoQ29yZG92YVdyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuICBmdW5jdGlvbiBDb3Jkb3ZhV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF90aGlzLnJlY2VpdmVNZXNzYWdlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBmYWxzZSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBDb3Jkb3ZhV3JhcHBlci5wcm90b3R5cGU7XG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKGFjdGlvbiwgJyonKTtcbiAgfTtcbiAgcmV0dXJuIENvcmRvdmFXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyJztcbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoSW9zV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG4gIGZ1bmN0aW9uIElvc1dyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF90aGlzID0gX0Fic3RyYWN0V3JhcHBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgd2luZG93Lmlvc1dyYXBwZXIgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgdmFyIF9wcm90byA9IElvc1dyYXBwZXIucHJvdG90eXBlO1xuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbi5jb21tYW5kID09PSAnc2V0SXRlbScpIHtcbiAgICAgIGFjdGlvbi5hcmdzWzFdID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uLmFyZ3NbMV0pO1xuICAgIH1cbiAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShhY3Rpb24pO1xuICAgIHdpbmRvdy53ZWJraXQubWVzc2FnZUhhbmRsZXJzLmlvcy5wb3N0TWVzc2FnZShzdHJpbmdpZmllZCk7XG4gIH07XG4gIF9wcm90by5yZWNlaXZlRnJvbUlvcyA9IGZ1bmN0aW9uIHJlY2VpdmVGcm9tSW9zKGFjdGlvblN0cmluZykge1xuICAgIHZhciBhY3Rpb24gPSBKU09OLnBhcnNlKGFjdGlvblN0cmluZyk7XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb25bJ2FyZ3MnXSB8fCBbXTtcbiAgICBhY3Rpb25bJ2FyZ3MnXSA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlY2VpdmVNZXNzYWdlKHtcbiAgICAgICdkYXRhJzogYWN0aW9uXG4gICAgfSk7XG4gIH07XG4gIHJldHVybiBJb3NXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5pbXBvcnQgTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXInO1xuaW1wb3J0IHsgY3JlYXRlQ2FudmFzQ29udGV4dDJEIH0gZnJvbSAnb2wvZG9tJztcbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcyc7XG52YXIgTWFzayA9IGZ1bmN0aW9uIChfTGF5ZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWFzaywgX0xheWVyKTtcbiAgZnVuY3Rpb24gTWFzayhsYXllck9wdGlvbnMsIG1hc2tPcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChsYXllck9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgbGF5ZXJPcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmIChtYXNrT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBtYXNrT3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBfdGhpcyA9IF9MYXllci5jYWxsKHRoaXMsIGxheWVyT3B0aW9ucykgfHwgdGhpcztcbiAgICBfdGhpcy5jb250ZXh0XyA9IGNyZWF0ZUNhbnZhc0NvbnRleHQyRCgpO1xuICAgIF90aGlzLmNvbnRleHRfLmNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgX3RoaXMuY29udGV4dF8uY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBfdGhpcy5tYXJnaW5fID0gbWFza09wdGlvbnMubWFyZ2luIHx8IDEwMDtcbiAgICBfdGhpcy5leHRlbnRJbk1ldGVyc18gPSBtYXNrT3B0aW9ucy5leHRlbnRJbk1ldGVycyB8fCAwO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICB2YXIgX3Byb3RvID0gTWFzay5wcm90b3R5cGU7XG4gIF9wcm90by5jcmVhdGVFeHRlbnQgPSBmdW5jdGlvbiBjcmVhdGVFeHRlbnQoY2VudGVyLCBoYWxmTGVuZ3RoKSB7XG4gICAgdmFyIG1pbnggPSBjZW50ZXJbMF0gLSBoYWxmTGVuZ3RoO1xuICAgIHZhciBtaW55ID0gY2VudGVyWzFdIC0gaGFsZkxlbmd0aDtcbiAgICB2YXIgbWF4eCA9IGNlbnRlclswXSArIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1heHkgPSBjZW50ZXJbMV0gKyBoYWxmTGVuZ3RoO1xuICAgIHJldHVybiBbbWlueCwgbWlueSwgbWF4eCwgbWF4eV07XG4gIH07XG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoZnJhbWVTdGF0ZSkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0XztcbiAgICB2YXIgY3dpZHRoID0gZnJhbWVTdGF0ZS5zaXplWzBdO1xuICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gY3dpZHRoO1xuICAgIHZhciBjaGVpZ2h0ID0gZnJhbWVTdGF0ZS5zaXplWzFdO1xuICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IGNoZWlnaHQ7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0Lm1vdmVUbygwLCAwKTtcbiAgICBjb250ZXh0LmxpbmVUbyhjd2lkdGgsIDApO1xuICAgIGNvbnRleHQubGluZVRvKGN3aWR0aCwgY2hlaWdodCk7XG4gICAgY29udGV4dC5saW5lVG8oMCwgY2hlaWdodCk7XG4gICAgY29udGV4dC5saW5lVG8oMCwgMCk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB2YXIgZXh0ZW50TGVuZ3RoID0gTWF0aC5taW4oY3dpZHRoLCBjaGVpZ2h0KSAtIHRoaXMubWFyZ2luXyAqIDI7XG4gICAgaWYgKHRoaXMuZXh0ZW50SW5NZXRlcnNfKSB7XG4gICAgICBleHRlbnRMZW5ndGggPSBERVZJQ0VfUElYRUxfUkFUSU8gKiB0aGlzLmV4dGVudEluTWV0ZXJzXyAvIGZyYW1lU3RhdGUudmlld1N0YXRlLnJlc29sdXRpb247XG4gICAgfVxuICAgIHZhciBleHRlbnQgPSB0aGlzLmNyZWF0ZUV4dGVudChbY3dpZHRoIC8gMiwgY2hlaWdodCAvIDJdLCBNYXRoLmNlaWwoZXh0ZW50TGVuZ3RoIC8gMikpO1xuICAgIGNvbnRleHQubW92ZVRvKGV4dGVudFswXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFszXSk7XG4gICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbM10pO1xuICAgIGNvbnRleHQubGluZVRvKGV4dGVudFsyXSwgZXh0ZW50WzFdKTtcbiAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFsxXSk7XG4gICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDUsIDI1LCAwLjUpJztcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICByZXR1cm4gY29udGV4dC5jYW52YXM7XG4gIH07XG4gIHJldHVybiBNYXNrO1xufShMYXllcik7XG5leHBvcnQgeyBNYXNrIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICBNb2RlLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIl07XG4gIGZ1bmN0aW9uIE1vZGUobmdlb09mZmxpbmVDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5lbmFibGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuY29tcG9uZW50XyA9IG51bGw7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICB9XG4gIHZhciBfcHJvdG8gPSBNb2RlLnByb3RvdHlwZTtcbiAgX3Byb3RvLmlzRW5hYmxlZCA9IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkXztcbiAgfTtcbiAgX3Byb3RvLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gdHJ1ZTtcbiAgfTtcbiAgX3Byb3RvLnJlZ2lzdGVyQ29tcG9uZW50ID0gZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgdGhpcy5jb21wb25lbnRfID0gY29tcG9uZW50O1xuICB9O1xuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbXBvbmVudCBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudF8uYWN0aXZhdGVPZmZsaW5lTW9kZSgpO1xuICB9O1xuICBfcHJvdG8uaGFzRGF0YSA9IGZ1bmN0aW9uIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5oYXNPZmZsaW5lRGF0YSgpO1xuICB9O1xuICByZXR1cm4gTW9kZTtcbn0oKTtcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZU1vZGUnLCBbXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZU1vZGUnLCBNb2RlKTtcbk1vZGUubW9kdWxlID0gbXlNb2R1bGU7XG5leHBvcnQgZGVmYXVsdCBNb2RlOyIsImNvbmZpZ0Z1bmN0aW9uXy4kaW5qZWN0ID0gW1wiJGh0dHBQcm92aWRlclwiXTtcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICBTZXJ2aWNlLiRpbmplY3QgPSBbXCIkZG9jdW1lbnRcIiwgXCIkd2luZG93XCIsIFwiJHRpbWVvdXRcIiwgXCIkcm9vdFNjb3BlXCIsIFwibmdlb09mZmxpbmVUZXN0VXJsXCJdO1xuICBmdW5jdGlvbiBTZXJ2aWNlKCRkb2N1bWVudCwgJHdpbmRvdywgJHRpbWVvdXQsICRyb290U2NvcGUsIG5nZW9PZmZsaW5lVGVzdFVybCkge1xuICAgIHRoaXMuJGRvY3VtZW50XyA9ICRkb2N1bWVudDtcbiAgICB0aGlzLiR3aW5kb3dfID0gJHdpbmRvdztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyA9IG5nZW9PZmZsaW5lVGVzdFVybDtcbiAgICB0aGlzLmNvdW50XyA9IDA7XG4gICAgdGhpcy5vZmZsaW5lXztcbiAgICB0aGlzLnByb21pc2VfO1xuICAgIHRoaXMuaW5pdGlhbGl6ZV8oKTtcbiAgfVxuICB2YXIgX3Byb3RvID0gU2VydmljZS5wcm90b3R5cGU7XG4gIF9wcm90by5pbml0aWFsaXplXyA9IGZ1bmN0aW9uIGluaXRpYWxpemVfKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5vZmZsaW5lXyA9ICF0aGlzLiR3aW5kb3dfLm5hdmlnYXRvci5vbkxpbmU7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLiR3aW5kb3dfLmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNoZWNrKHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuJGRvY3VtZW50Xy5hamF4RXJyb3IpIHtcbiAgICAgIHZhciBvbkFqYXhFcnJvciA9IGZ1bmN0aW9uIG9uQWpheEVycm9yKGV2dCwganF4aHIsIHNldHRpbmdzLCB0aHJvd25FcnJvcikge1xuICAgICAgICBpZiAoIS9eKGNhbmNlbGVkfGFib3J0KSQvLnRlc3QodGhyb3duRXJyb3IpKSB7XG4gICAgICAgICAgX3RoaXMuY2hlY2soMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0aGlzLiRkb2N1bWVudF8uYWpheEVycm9yKG9uQWpheEVycm9yKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5jaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodGhpcy5wcm9taXNlXykge1xuICAgICAgdGhpcy4kdGltZW91dF8uY2FuY2VsKHRoaXMucHJvbWlzZV8pO1xuICAgICAgdGhpcy5wcm9taXNlXyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb3VudF8rKztcbiAgICAgIHRoaXMucHJvbWlzZV8gPSB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuY2hlY2soKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogdGhpcy5uZ2VvT2ZmbGluZVRlc3RVcmxfLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8gPSAwO1xuICAgICAgICBpZiAoX3RoaXMyLm9mZmxpbmVfKSB7XG4gICAgICAgICAgX3RoaXMyLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICBfdGhpczIuY291bnRfKys7XG4gICAgICAgIGlmIChfdGhpczIuY291bnRfID4gMiAmJiAhX3RoaXMyLm9mZmxpbmVfKSB7XG4gICAgICAgICAgX3RoaXMyLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8gPSBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKG9mZmxpbmUpIHtcbiAgICB0aGlzLm9mZmxpbmVfID0gb2ZmbGluZTtcbiAgICB0aGlzLiRyb290U2NvcGVfLiRkaWdlc3QoKTtcbiAgfTtcbiAgX3Byb3RvLmlzRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gaXNEaXNjb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5vZmZsaW5lXztcbiAgfTtcbiAgcmV0dXJuIFNlcnZpY2U7XG59KCk7XG52YXIgbmFtZSA9ICduZ2VvTmV0d29ya1N0YXR1cyc7XG5TZXJ2aWNlLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcblNlcnZpY2UubW9kdWxlLnNlcnZpY2UobmFtZSwgU2VydmljZSk7XG52YXIgaHR0cEludGVyY2VwdG9yID0gZnVuY3Rpb24gaHR0cEludGVyY2VwdG9yKCRxLCBuZ2VvRGVib3VuY2UsIG5nZW9OZXR3b3JrU3RhdHVzKSB7XG4gIHZhciBkZWJvdW5jZWRDaGVjayA9IG5nZW9EZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5nZW9OZXR3b3JrU3RhdHVzLmNoZWNrKHVuZGVmaW5lZCk7XG4gIH0sIDIwMDAsIGZhbHNlKTtcbiAgcmV0dXJuIHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9LFxuICAgIHJlcXVlc3RFcnJvcjogZnVuY3Rpb24gcmVxdWVzdEVycm9yKHJlamVjdGlvbikge1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH0sXG4gICAgcmVzcG9uc2U6IGZ1bmN0aW9uIHJlc3BvbnNlKF9yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgICB9LFxuICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICBkZWJvdW5jZWRDaGVjaygpO1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH1cbiAgfTtcbn07XG5odHRwSW50ZXJjZXB0b3IuJGluamVjdCA9IFtcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIl07XG5odHRwSW50ZXJjZXB0b3IuJGluamVjdCA9IFtcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIl07XG5TZXJ2aWNlLm1vZHVsZS5mYWN0b3J5KCdodHRwSW50ZXJjZXB0b3InLCBodHRwSW50ZXJjZXB0b3IpO1xuZnVuY3Rpb24gY29uZmlnRnVuY3Rpb25fKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XG59XG5TZXJ2aWNlLm1vZHVsZS5jb25maWcoY29uZmlnRnVuY3Rpb25fKTtcbnZhciBleHBvcnRzID0gU2VydmljZTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTsgaWYgKGl0KSByZXR1cm4gKGl0ID0gaXQuY2FsbChvKSkubmV4dC5iaW5kKGl0KTsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldOyByZXR1cm4gYXJyMjsgfVxuaW1wb3J0IG5nZW9NYXBCYWNrZ3JvdW5kTGF5ZXJNZ3IgZnJvbSAnbmdlby9tYXAvQmFja2dyb3VuZExheWVyTWdyJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xudmFyIFJlc3RvcmVyID0gZnVuY3Rpb24gKCkge1xuICBSZXN0b3Jlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCIsIFwibmdlb0JhY2tncm91bmRMYXllck1nclwiXTtcbiAgZnVuY3Rpb24gUmVzdG9yZXIobmdlb09mZmxpbmVDb25maWd1cmF0aW9uLCBuZ2VvQmFja2dyb3VuZExheWVyTWdyKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfID0gbmdlb0JhY2tncm91bmRMYXllck1ncjtcbiAgfVxuICB2YXIgX3Byb3RvID0gUmVzdG9yZXIucHJvdG90eXBlO1xuICBfcHJvdG8ucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUobWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXy5nZXRJdGVtKCdvZmZsaW5lX2NvbnRlbnQnKS50aGVuKGZ1bmN0aW9uIChvZmZsaW5lQ29udGVudCkge1xuICAgICAgcmV0dXJuIF90aGlzLmRvUmVzdG9yZShtYXAsIG9mZmxpbmVDb250ZW50KTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmRvUmVzdG9yZSA9IGZ1bmN0aW9uIGRvUmVzdG9yZShtYXAsIG9mZmxpbmVDb250ZW50KSB7XG4gICAgbWFwLmdldExheWVyR3JvdXAoKS5nZXRMYXllcnMoKS5jbGVhcigpO1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uob2ZmbGluZUNvbnRlbnQubGF5ZXJzKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIHZhciBvZmZsaW5lTGF5ZXIgPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuY29uZmlndXJhdGlvbl8ucmVjcmVhdGVPZmZsaW5lTGF5ZXIob2ZmbGluZUxheWVyKTtcbiAgICAgIGlmIChsYXllcikge1xuICAgICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICBpZiAob2ZmbGluZUxheWVyLmJhY2tncm91bmRMYXllcikge1xuICAgICAgICAgIHRoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8uc2V0KG1hcCwgbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZmZsaW5lQ29udGVudC5leHRlbnQ7XG4gIH07XG4gIHJldHVybiBSZXN0b3Jlcjtcbn0oKTtcbnZhciBuYW1lID0gJ25nZW9PZmZsaW5lUmVzdG9yZXInO1xuUmVzdG9yZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW25nZW9NYXBCYWNrZ3JvdW5kTGF5ZXJNZ3IubmFtZV0pLnNlcnZpY2UobmFtZSwgUmVzdG9yZXIpO1xudmFyIGV4cG9ydHMgPSBSZXN0b3JlcjtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IE9sVGlsZWdyaWRUaWxlR3JpZCBmcm9tICdvbC90aWxlZ3JpZC9UaWxlR3JpZCc7XG5pbXBvcnQgT2xUaWxlZ3JpZFdNVFMgZnJvbSAnb2wvdGlsZWdyaWQvV01UUyc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvaic7XG5pbXBvcnQgT2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TJztcbmltcG9ydCBPbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMnO1xuaW1wb3J0IE9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUnO1xudmFyIFNlckRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2VyRGVzKF9yZWYpIHtcbiAgICB2YXIgZ3V0dGVyID0gX3JlZi5ndXR0ZXI7XG4gICAgdGhpcy5ndXR0ZXJfID0gZ3V0dGVyO1xuICB9XG4gIHZhciBfcHJvdG8gPSBTZXJEZXMucHJvdG90eXBlO1xuICBfcHJvdG8uY3JlYXRlQmFzZU9iamVjdF8gPSBmdW5jdGlvbiBjcmVhdGVCYXNlT2JqZWN0XyhvbE9iamVjdCkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gb2xPYmplY3QuZ2V0UHJvcGVydGllcygpO1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgdmFyIHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgdmFyIHR5cGVPZiA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgIGlmICh0eXBlT2YgPT09ICdzdHJpbmcnIHx8IHR5cGVPZiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVncmlkID0gZnVuY3Rpb24gc2VyaWFsaXplVGlsZWdyaWQodGlsZWdyaWQpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgb2JqLmV4dGVudCA9IHRpbGVncmlkLmdldEV4dGVudCgpO1xuICAgIG9iai5taW5ab29tID0gdGlsZWdyaWQuZ2V0TWluWm9vbSgpO1xuICAgIG9iai5vcmlnaW4gPSB0aWxlZ3JpZC5nZXRPcmlnaW4oMCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gdGlsZWdyaWQuZ2V0UmVzb2x1dGlvbnMoKTtcbiAgICBvYmoudGlsZVNpemUgPSB0aWxlZ3JpZC5nZXRUaWxlU2l6ZSh0aWxlZ3JpZC5nZXRNaW5ab29tKCkpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlZ3JpZCA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplVGlsZWdyaWQoc2VyaWFsaXphdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICByZXR1cm4gbmV3IE9sVGlsZWdyaWRUaWxlR3JpZChvcHRpb25zKTtcbiAgfTtcbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVncmlkV01UUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVncmlkV01UUyh0aWxlZ3JpZCkge1xuICAgIGlmICghdGlsZWdyaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgcmVzb2x1dGlvbnMgPSB0aWxlZ3JpZC5nZXRSZXNvbHV0aW9ucygpO1xuICAgIG9iai5leHRlbnQgPSB0aWxlZ3JpZC5nZXRFeHRlbnQoKTtcbiAgICBvYmoubWluWm9vbSA9IHRpbGVncmlkLmdldE1pblpvb20oKTtcbiAgICBvYmoubWF0cml4SWRzID0gdGlsZWdyaWQuZ2V0TWF0cml4SWRzKCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gcmVzb2x1dGlvbnM7XG4gICAgb2JqLm9yaWdpbnMgPSBbXTtcbiAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHJlc29sdXRpb25zLmxlbmd0aDsgKyt6KSB7XG4gICAgICBvYmoub3JpZ2lucy5wdXNoKHRpbGVncmlkLmdldE9yaWdpbih6KSk7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhzZXJpYWxpemF0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHJldHVybiBuZXcgT2xUaWxlZ3JpZFdNVFMob3B0aW9ucyk7XG4gIH07XG4gIF9wcm90by5zZXJpYWxpemVTb3VyY2VUaWxlV01TID0gZnVuY3Rpb24gc2VyaWFsaXplU291cmNlVGlsZVdNUyhzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGhpcy5jcmVhdGVCYXNlT2JqZWN0Xyhzb3VyY2UpO1xuICAgIG9iai5wYXJhbXMgPSBzb3VyY2UuZ2V0UGFyYW1zKCk7XG4gICAgb2JqLnVybHMgPSBzb3VyY2UuZ2V0VXJscygpO1xuICAgIG9iai50aWxlR3JpZCA9IHRoaXMuc2VyaWFsaXplVGlsZWdyaWQoc291cmNlLmdldFRpbGVHcmlkKCkpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gc291cmNlLmdldFByb2plY3Rpb24oKTtcbiAgICBpZiAocHJvamVjdGlvbikge1xuICAgICAgb2JqLnByb2plY3Rpb24gPSBvbFByb2ouZ2V0KHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkpLmdldENvZGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG4gIF9wcm90by5kZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICBvcHRpb25zLnRpbGVMb2FkRnVuY3Rpb24gPSB0aWxlTG9hZEZ1bmN0aW9uO1xuICAgIGlmIChvcHRpb25zLnRpbGVHcmlkKSB7XG4gICAgICBvcHRpb25zLnRpbGVHcmlkID0gdGhpcy5kZXNlcmlhbGl6ZVRpbGVncmlkKG9wdGlvbnMudGlsZUdyaWQpO1xuICAgIH1cbiAgICBvcHRpb25zLmd1dHRlciA9IHRoaXMuZ3V0dGVyXztcbiAgICByZXR1cm4gbmV3IE9sU291cmNlVGlsZVdNUyhvcHRpb25zKTtcbiAgfTtcbiAgX3Byb3RvLnNlcmlhbGl6ZVNvdXJjZVdNVFMgPSBmdW5jdGlvbiBzZXJpYWxpemVTb3VyY2VXTVRTKHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKHNvdXJjZSk7XG4gICAgb2JqLmRpbWVuc2lvbnMgPSBzb3VyY2UuZ2V0RGltZW5zaW9ucygpO1xuICAgIG9iai5mb3JtYXQgPSBzb3VyY2UuZ2V0Rm9ybWF0KCk7XG4gICAgb2JqLnVybHMgPSBzb3VyY2UuZ2V0VXJscygpO1xuICAgIG9iai52ZXJzaW9uID0gc291cmNlLmdldFZlcnNpb24oKTtcbiAgICBvYmoubGF5ZXIgPSBzb3VyY2UuZ2V0TGF5ZXIoKTtcbiAgICBvYmouc3R5bGUgPSBzb3VyY2UuZ2V0U3R5bGUoKTtcbiAgICBvYmoubWF0cml4U2V0ID0gc291cmNlLmdldE1hdHJpeFNldCgpO1xuICAgIHZhciB0aWxlR3JpZFdNVFMgPSBzb3VyY2UuZ2V0VGlsZUdyaWQoKTtcbiAgICBvYmoudGlsZUdyaWQgPSB0aGlzLnNlcmlhbGl6ZVRpbGVncmlkV01UUyh0aWxlR3JpZFdNVFMpO1xuICAgIG9iai5yZXF1ZXN0RW5jb2RpbmcgPSBzb3VyY2UuZ2V0UmVxdWVzdEVuY29kaW5nKCk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBzb3VyY2UuZ2V0UHJvamVjdGlvbigpO1xuICAgIGlmIChwcm9qZWN0aW9uKSB7XG4gICAgICBvYmoucHJvamVjdGlvbiA9IG9sUHJvai5nZXQoc291cmNlLmdldFByb2plY3Rpb24oKSkuZ2V0Q29kZSgpO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcbiAgX3Byb3RvLmRlc2VyaWFsaXplU291cmNlV01UUyA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplU291cmNlV01UUyhzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIG9wdGlvbnMudGlsZUxvYWRGdW5jdGlvbiA9IHRpbGVMb2FkRnVuY3Rpb247XG4gICAgaWYgKG9wdGlvbnMudGlsZUdyaWQpIHtcbiAgICAgIG9wdGlvbnMudGlsZUdyaWQgPSB0aGlzLmRlc2VyaWFsaXplVGlsZWdyaWRXTVRTKG9wdGlvbnMudGlsZUdyaWQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9sU291cmNlV01UUyhvcHRpb25zKTtcbiAgfTtcbiAgX3Byb3RvLm1ha2VJbmZpbml0eVNlcmlhbGl6YWJsZV8gPSBmdW5jdGlvbiBtYWtlSW5maW5pdHlTZXJpYWxpemFibGVfKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gMTAwMDtcbiAgICB9XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVMYXllciA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVMYXllcihsYXllciwgc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8obGF5ZXIpO1xuICAgIG9iai5vcGFjaXR5ID0gbGF5ZXIuZ2V0T3BhY2l0eSgpO1xuICAgIG9iai52aXNpYmxlID0gbGF5ZXIuZ2V0VmlzaWJsZSgpO1xuICAgIG9iai5taW5SZXNvbHV0aW9uID0gbGF5ZXIuZ2V0TWluUmVzb2x1dGlvbigpO1xuICAgIG9iai5tYXhSZXNvbHV0aW9uID0gdGhpcy5tYWtlSW5maW5pdHlTZXJpYWxpemFibGVfKGxheWVyLmdldE1heFJlc29sdXRpb24oKSk7XG4gICAgb2JqLnpJbmRleCA9IGxheWVyLmdldFpJbmRleCgpO1xuICAgIHNvdXJjZSA9IHNvdXJjZSB8fCBsYXllci5nZXRTb3VyY2UoKTtcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgT2xTb3VyY2VUaWxlV01TKSB7XG4gICAgICBvYmouc291cmNlID0gdGhpcy5zZXJpYWxpemVTb3VyY2VUaWxlV01TKHNvdXJjZSk7XG4gICAgICBvYmouc291cmNlVHlwZSA9ICd0aWxlV01TJztcbiAgICB9IGVsc2UgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE9sU291cmNlV01UUykge1xuICAgICAgb2JqLnNvdXJjZSA9IHRoaXMuc2VyaWFsaXplU291cmNlV01UUyhzb3VyY2UpO1xuICAgICAgb2JqLnNvdXJjZVR5cGUgPSAnV01UUyc7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlTGF5ZXIgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVMYXllcihzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHZhciBzb3VyY2VUeXBlID0gb3B0aW9ucy5zb3VyY2VUeXBlO1xuICAgIGlmIChzb3VyY2VUeXBlID09PSAndGlsZVdNUycpIHtcbiAgICAgIG9wdGlvbnMuc291cmNlID0gdGhpcy5kZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMob3B0aW9ucy5zb3VyY2UsIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoc291cmNlVHlwZSA9PT0gJ1dNVFMnKSB7XG4gICAgICBvcHRpb25zLnNvdXJjZSA9IHRoaXMuZGVzZXJpYWxpemVTb3VyY2VXTVRTKG9wdGlvbnMuc291cmNlLCB0aWxlTG9hZEZ1bmN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPbExheWVyVGlsZShvcHRpb25zKTtcbiAgfTtcbiAgcmV0dXJuIFNlckRlcztcbn0oKTtcbnZhciBleHBvcnRzID0gU2VyRGVzO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBTZXJ2aWNlTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgU2VydmljZU1hbmFnZXIuJGluamVjdCA9IFtcIiRpbmplY3RvclwiXTtcbiAgZnVuY3Rpb24gU2VydmljZU1hbmFnZXIoJGluamVjdG9yKSB7XG4gICAgdGhpcy4kaW5qZWN0b3JfID0gJGluamVjdG9yO1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gbnVsbDtcbiAgICB0aGlzLnJlc3RvcmVTZXJ2aWNlXyA9IG51bGw7XG4gIH1cbiAgdmFyIF9wcm90byA9IFNlcnZpY2VNYW5hZ2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmdldE9mZmxpbmVTZXJ2aWNlXyA9IGZ1bmN0aW9uIGdldE9mZmxpbmVTZXJ2aWNlXyhzZXJ2aWNlTGlrZSwgbWV0aG9kKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlTGlrZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdGhpcy4kaW5qZWN0b3JfLmhhcyhzZXJ2aWNlTGlrZSkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBvZmZsaW5lIFwiICsgbWV0aG9kICsgXCIgc2VydmljZSBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBzZXJ2aWNlID0gdGhpcy4kaW5qZWN0b3JfLmdldChzZXJ2aWNlTGlrZSk7XG4gICAgICBpZiAoIXNlcnZpY2VbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIG9mZmxpbmUgc2VydmljZSBcIiArIHNlcnZpY2VMaWtlICsgXCIgZG9lcyBub3QgaGF2ZSBhIFwiICsgbWV0aG9kICsgXCIgbWV0aG9kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG4gICAgaWYgKCFzZXJ2aWNlTGlrZVttZXRob2RdKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHByb3ZpZGVkIG9mZmxpbmUgc2VydmljZSBkb2VzIG5vdCBoYXZlIGEgXCIgKyBtZXRob2QgKyBcIiBtZXRob2RcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBzZXJ2aWNlTGlrZTtcbiAgfTtcbiAgX3Byb3RvLnNldFNhdmVTZXJ2aWNlID0gZnVuY3Rpb24gc2V0U2F2ZVNlcnZpY2Uoc2F2ZUxpa2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5zYXZlU2VydmljZV8gPSB0aGlzLmdldE9mZmxpbmVTZXJ2aWNlXyhzYXZlTGlrZVNlcnZpY2UsICdzYXZlJyk7XG4gIH07XG4gIF9wcm90by5zZXRSZXN0b3JlU2VydmljZSA9IGZ1bmN0aW9uIHNldFJlc3RvcmVTZXJ2aWNlKHJlc3RvcmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMucmVzdG9yZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8ocmVzdG9yZUxpa2VTZXJ2aWNlLCAncmVzdG9yZScpO1xuICB9O1xuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICghdGhpcy5zYXZlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSBzYXZlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNhdmVTZXJ2aWNlXy5jYW5jZWwoKTtcbiAgfTtcbiAgX3Byb3RvLnNhdmUgPSBmdW5jdGlvbiBzYXZlKGV4dGVudCwgbWFwKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHNhdmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2F2ZVNlcnZpY2VfLnNhdmUoZXh0ZW50LCBtYXApO1xuICB9O1xuICBfcHJvdG8ucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUobWFwKSB7XG4gICAgaWYgKCF0aGlzLnJlc3RvcmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHJlc3RvcmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVzdG9yZVNlcnZpY2VfLnJlc3RvcmUobWFwKTtcbiAgfTtcbiAgcmV0dXJuIFNlcnZpY2VNYW5hZ2VyO1xufSgpO1xuU2VydmljZU1hbmFnZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lU2VydmljZU1hbmFnZXInLCBbXSk7XG5TZXJ2aWNlTWFuYWdlci5tb2R1bGUuc2VydmljZSgnbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcicsIFNlcnZpY2VNYW5hZ2VyKTtcbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VNYW5hZ2VyOyIsImZ1bmN0aW9uIGJsb2JUb0RhdGFVcmwoYmxvYikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gIH0pO1xufVxudmFyIFRpbGVEb3dubG9hZGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUaWxlRG93bmxvYWRlcih0aWxlcywgY2FsbGJhY2tzLCB3b3JrZXJzKSB7XG4gICAgdGhpcy5tYXhOdW1iZXJPZldvcmtlcnNfID0gd29ya2VycztcbiAgICB0aGlzLndhc1N0YXJ0ZWRfID0gZmFsc2U7XG4gICAgdGhpcy50aWxlc18gPSB0aWxlcztcbiAgICB0aGlzLmNhbGxiYWNrc18gPSBjYWxsYmFja3M7XG4gICAgdGhpcy5hbGxDb3VudF8gPSAwO1xuICAgIHRoaXMub2tDb3VudF8gPSAwO1xuICAgIHRoaXMua29Db3VudF8gPSAwO1xuICAgIHRoaXMucmVxdWVzdGVkQ291bnRfID0gMDtcbiAgICB0aGlzLnJlc29sdmVQcm9taXNlXyA9IG51bGw7XG4gICAgdGhpcy5wcm9taXNlXyA9IG51bGw7XG4gICAgdGhpcy50aWxlSW5kZXhfID0gMDtcbiAgICB0aGlzLmNhbmNlbF8gPSBmYWxzZTtcbiAgfVxuICB2YXIgX3Byb3RvID0gVGlsZURvd25sb2FkZXIucHJvdG90eXBlO1xuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRoaXMuY2FuY2VsXyA9IHRydWU7XG4gIH07XG4gIF9wcm90by5kb3dubG9hZCA9IGZ1bmN0aW9uIGRvd25sb2FkKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYgKHRoaXMucHJvbWlzZV8pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICAgIH1cbiAgICB0aGlzLnByb21pc2VfID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgX3RoaXMucmVzb2x2ZVByb21pc2VfID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLnRpbGVzXyk7XG4gICAgaWYgKHRoaXMudGlsZXNfLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkRXJyb3IoMSk7XG4gICAgICBpZiAodGhpcy5yZXNvbHZlUHJvbWlzZV8pIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1heE51bWJlck9mV29ya2Vyc187ICsraSkge1xuICAgICAgICB0aGlzLmRvd25sb2FkVGlsZV8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZV87XG4gIH07XG4gIF9wcm90by5kb3dubG9hZFRpbGVfID0gZnVuY3Rpb24gZG93bmxvYWRUaWxlXygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodGhpcy5jYW5jZWxfIHx8IHRoaXMudGlsZUluZGV4XyA+PSB0aGlzLnRpbGVzXy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzX1t0aGlzLnRpbGVJbmRleF8rK107XG4gICAgdmFyIHRpbGVVcmwgPSB0aWxlLnVybDtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHRpbGVVcmwsIHRydWUpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgdmFyIG9uVGlsZURvd25sb2FkZWQgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZGVkKCkge1xuICAgICAgaWYgKF90aGlzMi5hbGxDb3VudF8gPT09IF90aGlzMi50aWxlc18ubGVuZ3RoICYmIF90aGlzMi5yZXNvbHZlUHJvbWlzZV8pIHtcbiAgICAgICAgX3RoaXMyLnJlc29sdmVQcm9taXNlXygpO1xuICAgICAgfVxuICAgICAgX3RoaXMyLmRvd25sb2FkVGlsZV8oKTtcbiAgICB9O1xuICAgIHZhciBlcnJvckNhbGxiYWNrID0gZnVuY3Rpb24gZXJyb3JDYWxsYmFjayhfKSB7XG4gICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgKytfdGhpczIuYWxsQ291bnRfO1xuICAgICAgKytfdGhpczIua29Db3VudF87XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBfdGhpczIuYWxsQ291bnRfIC8gX3RoaXMyLnRpbGVzXy5sZW5ndGg7XG4gICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKHByb2dyZXNzKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgIH07XG4gICAgdmFyIG9ubG9hZENhbGxiYWNrID0gZnVuY3Rpb24gb25sb2FkQ2FsbGJhY2soZSkge1xuICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlO1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnNpemUgIT09IDApIHtcbiAgICAgICAgYmxvYlRvRGF0YVVybChyZXNwb25zZSkudGhlbihmdW5jdGlvbiAoZGF0YVVybCkge1xuICAgICAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICAgKytfdGhpczIub2tDb3VudF87XG4gICAgICAgICAgdGlsZS5yZXNwb25zZSA9IGRhdGFVcmw7XG4gICAgICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuICAgICAgICAgIF90aGlzMi5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkU3VjY2Vzcyhwcm9ncmVzcywgdGlsZSkudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvckNhbGxiYWNrKGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICsrX3RoaXMyLm9rQ291bnRfO1xuICAgICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZFN1Y2Nlc3MoX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoLCB0aWxlKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9ubG9hZCA9IG9ubG9hZENhbGxiYWNrO1xuICAgIHhoci5vbmVycm9yID0gZXJyb3JDYWxsYmFjaztcbiAgICB4aHIub25hYm9ydCA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLm9udGltZW91dCA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLnNlbmQoKTtcbiAgICArK3RoaXMucmVxdWVzdGVkQ291bnRfO1xuICB9O1xuICByZXR1cm4gVGlsZURvd25sb2FkZXI7XG59KCk7XG5leHBvcnQgeyBUaWxlRG93bmxvYWRlciBhcyBkZWZhdWx0IH07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm1haW4tYnV0dG9uXCI+XFxuICA8c3BhbiBuZy1pZj1cIiEkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgPGRpdiBjbGFzcz1cIm5vLWRhdGEgZmFzIGZhLWFycm93LWNpcmNsZS1kb3duXCIgbmctY2xpY2s9XCIkY3RybC50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKClcIj48L2Rpdj5cXG4gIDwvc3Bhbj5cXG4gIDxzcGFuIG5nLWlmPVwiJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ3aXRoLWRhdGEgZmFzIGZhLWFycm93LWNpcmNsZS1kb3duXCIgbmctY2xpY2s9XCIkY3RybC5zaG93TWVudSgpXCI+PC9kaXY+XFxuICA8L3NwYW4+XFxuPC9kaXY+XFxuXFxuPGRpdlxcbiAgbmctaWY9XCIkY3RybC5zZWxlY3RpbmdFeHRlbnQgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICBjbGFzcz1cInZhbGlkYXRlLWV4dGVudCBidG4gYnRuLXByaW1hcnlcIlxcbj5cXG4gIDxkaXYgbmctaWY9XCIhJGN0cmwuZG93bmxvYWRpbmdcIiBuZy1jbGljaz1cIiRjdHJsLmNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEoKVwiIHRyYW5zbGF0ZT5cXG4gICAgU2F2ZSBtYXBcXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cIiRjdHJsLmRvd25sb2FkaW5nXCIgbmctY2xpY2s9XCIkY3RybC5hc2tBYm9ydERvd25sb2FkKClcIiB0cmFuc2xhdGU+QWJvcnQ8L2Rpdj5cXG48L2Rpdj5cXG5cXG48ZGl2IG5nLWlmPVwiJGN0cmwuZG93bmxvYWRpbmdcIiBjbGFzcz1cImluLXByb2dyZXNzXCI+XFxuICA8ZGl2Pnt7JGN0cmwucHJvZ3Jlc3NQZXJjZW50c319JTwvZGl2PlxcbjwvZGl2PlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwubWVudURpc3BsYXllZFwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwie3tcXCdDbG9zZVxcJyB8IHRyYW5zbGF0ZX19XCI+XFxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cXG4gICAgPC9idXR0b24+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPk9mZmxpbmUgbWFwPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgPGRpdiBuZy1pZj1cIiRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICAgIDxidXR0b25cXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgICAgY2xhc3M9XCJleHRlbnQtem9vbSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgbmctaWY9XCIhJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC5hY3RpdmF0ZU9mZmxpbmVNb2RlKClcIlxcbiAgICAgICAgdHJhbnNsYXRlXFxuICAgICAgPlxcbiAgICAgICAgQWN0aXZhdGUgb2ZmbGluZSBtb2RlXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvblxcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXFxuICAgICAgICBjbGFzcz1cImV4dGVudC16b29tIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICBuZy1pZj1cIiRjdHJsLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWFjdGl2YXRlT2ZmbGluZU1vZGUoKVwiXFxuICAgICAgICB0cmFuc2xhdGVcXG4gICAgICA+XFxuICAgICAgICBEZWFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgIDxidXR0b25cXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgICAgY2xhc3M9XCJleHRlbnQtc2hvdyBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgbmctaWY9XCIkY3RybC5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKVwiXFxuICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZUV4dGVudFZpc2liaWxpdHkoKVwiXFxuICAgICAgPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XCIkY3RybC5pc0V4dGVudFZpc2libGUoKVwiIHRyYW5zbGF0ZT5IaWRlIGV4dGVudDwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiISRjdHJsLmlzRXh0ZW50VmlzaWJsZSgpXCIgdHJhbnNsYXRlPlNob3cgZXh0ZW50PC9zcGFuPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b25cXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgICAgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgIG5nLWlmPVwiISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRpc3BsYXlBbGVydERlc3Ryb3lEYXRhID0gdHJ1ZVwiXFxuICAgICAgICB0cmFuc2xhdGVcXG4gICAgICA+XFxuICAgICAgICBEZWxldGUgZGF0YVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1pZj1cIiEkY3RybC5oYXNEYXRhKCkgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiPlxcbiAgICAgIDxidXR0b25cXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgICAgY2xhc3M9XCJuZXctZGF0YSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgbmctY2xpY2s9XCIkY3RybC50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKClcIlxcbiAgICAgICAgdHJhbnNsYXRlXFxuICAgICAgPlxcbiAgICAgICAgU2F2ZSBuZXcgbWFwXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0TG9hZERhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgIDxwIHRyYW5zbGF0ZT5cXG4gICAgICB+e3skY3RybC5lc3RpbWF0ZWRMb2FkRGF0YVNpemV9fU1CIG9mIG1hcHMgd2lsbCBiZSBkb3dubG9hZGVkICh1bnRpbCBzY2FsZSAxOjI1XFwnMDAwKSAtIERvblxcJ3QgbG9jayB5b3VyXFxuICAgICAgZGV2aWNlIG9yIG5hdmlnYXRlIGF3YXkgZnJvbSB0aGlzIHNpdGUgZHVyaW5nIHRoZSBkb3dubG9hZCBwcm9jZXNzLiBEZWFjdGl2YXRlIFwicHJpdmF0ZVwiIG1vZGUgb2YgeW91clxcbiAgICAgIGJyb3dzZXIuXFxuICAgIDwvcD5cXG4gICAgPGJ1dHRvblxcbiAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC52YWxpZGF0ZUV4dGVudCgpXCJcXG4gICAgICB0cmFuc2xhdGVcXG4gICAgPlxcbiAgICAgIE9rXFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIHRyYW5zbGF0ZT5DYW5jZWw8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydE5vTGF5ZXJcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgIDxwIHRyYW5zbGF0ZT5ObyBtYXBzIHNlbGVjdGVkIGZvciBzYXZpbmcuPC9wPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIHRyYW5zbGF0ZT5PazwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0RGVzdHJveURhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgIDxwIHRyYW5zbGF0ZT5EbyB5b3UgcmVhbGx5IHdhbnQgdG8gcmVtb3ZlIHlvdXIgZGF0YSA/PC9wPlxcbiAgICA8YnV0dG9uXFxuICAgICAgdHlwZT1cImJ1dHRvblwiXFxuICAgICAgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICBuZy1jbGljaz1cIiRjdHJsLmRlbGV0ZURhdGEoKVwiXFxuICAgICAgdHJhbnNsYXRlXFxuICAgID5cXG4gICAgICBPa1xcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiB0cmFuc2xhdGU+Q2FuY2VsPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8cCB0cmFuc2xhdGU+RG8geW91IHJlYWxseSB3YW50IHRvIHJlbW92ZSB5b3VyIGRhdGEgPzwvcD5cXG4gICAgPGJ1dHRvblxcbiAgICAgIHR5cGU9XCJidXR0b25cIlxcbiAgICAgIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5hYm9ydERvd25sb2FkKClcIlxcbiAgICAgIHRyYW5zbGF0ZVxcbiAgICA+XFxuICAgICAgT2tcXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b25cXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICBuZy1jbGljaz1cIiRjdHJsLmZvbGxvd0Rvd25sb2FkUHJvZ3Jlc3Npb25fKClcIlxcbiAgICAgIHRyYW5zbGF0ZVxcbiAgICA+XFxuICAgICAgQ2FuY2VsXFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJpbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9tb2RhbENvbXBvbmVudCc7XG5pbXBvcnQgeyBleHRlbnRUb1JlY3RhbmdsZSB9IGZyb20gJ25nZW8vdXRpbHMnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uJztcbmltcG9ydCBGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBNYXNrTGF5ZXIgZnJvbSAnLi9NYXNrJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZScsIFtuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50Lm5hbWVdKTtcbm15TW9kdWxlLnZhbHVlKCduZ2VvT2ZmbGluZVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzWyduZ2VvT2ZmbGluZVRlbXBsYXRldXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5odG1sJztcbn0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vb2ZmbGluZS9jb21wb25lbnQuaHRtbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5uZ2VvT2ZmbGluZVRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRhdHRyc1wiLCBcIm5nZW9PZmZsaW5lVGVtcGxhdGVVcmxcIl07XG5mdW5jdGlvbiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMsIG5nZW9PZmZsaW5lVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9PZmZsaW5lVGVtcGxhdGVVcmwoJGVsZW1lbnQsICRhdHRycyk7XG59XG52YXIgY29tcG9uZW50ID0ge1xuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9PZmZsaW5lTWFwJyxcbiAgICAnZXh0ZW50U2l6ZSc6ICc8P25nZW9PZmZsaW5lRXh0ZW50c2l6ZScsXG4gICAgJ21hc2tNYXJnaW4nOiAnPD9uZ2VvT2ZmbGluZU1hc2tNYXJnaW4nLFxuICAgICdtaW5ab29tJzogJzw/bmdlb09mZmxpbmVNaW5ab29tJyxcbiAgICAnbWF4Wm9vbSc6ICc8P25nZW9PZmZsaW5lTWF4Wm9vbSdcbiAgfSxcbiAgY29udHJvbGxlcjogJ25nZW9PZmZsaW5lQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlVXJsOiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvT2ZmbGluZScsIGNvbXBvbmVudCk7XG5leHBvcnQgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiR0aW1lb3V0XCIsIFwibmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlclwiLCBcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiLCBcIm5nZW9PZmZsaW5lTW9kZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuICBmdW5jdGlvbiBDb250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24sIG5nZW9PZmZsaW5lTW9kZSwgbmdlb05ldHdvcmtTdGF0dXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuJHRpbWVvdXRfID0gJHRpbWVvdXQ7XG4gICAgdGhpcy5tYXNrTGF5ZXJfID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8gPSBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyO1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLm9mZmxpbmVNb2RlID0gbmdlb09mZmxpbmVNb2RlO1xuICAgIHRoaXMubmV0d29ya1N0YXR1cyA9IG5nZW9OZXR3b3JrU3RhdHVzO1xuICAgIHRoaXMubWFwO1xuICAgIHRoaXMuZXh0ZW50U2l6ZSA9IDA7XG4gICAgdGhpcy5mZWF0dXJlc092ZXJsYXlfID0gbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gICAgdGhpcy5mZWF0dXJlc092ZXJsYXlfLnNldEZlYXR1cmVzKHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fKTtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RpbmdFeHRlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gMDtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlBbGVydExvYWREYXRhID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnROb0xheWVyID0gZmFsc2U7XG4gICAgdGhpcy5tYXNrTWFyZ2luID0gMDtcbiAgICB0aGlzLm1pblpvb207XG4gICAgdGhpcy5tYXhab29tO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tO1xuICAgIHRoaXMub3JpZ2luYWxNYXhab29tO1xuICAgIHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplID0gMDtcbiAgICB0aGlzLnJvdGF0ZU1hc2sgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBldmVudC5kZXRhaWwucHJvZ3Jlc3M7XG4gICAgICBfdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gTWF0aC5mbG9vcihwcm9ncmVzcyAqIDEwMCk7XG4gICAgICBpZiAocHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgX3RoaXMuZmluaXNoRG93bmxvYWRfKCk7XG4gICAgICB9XG4gICAgICBfdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge30sIDApO1xuICAgIH07XG4gIH1cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuICBfcHJvdG8uJG9uSW5pdCA9IGZ1bmN0aW9uICRvbkluaXQoKSB7XG4gICAgdGhpcy5vZmZsaW5lTW9kZS5yZWdpc3RlckNvbXBvbmVudCh0aGlzKTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8ub24oJ3Byb2dyZXNzJywgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyk7XG4gICAgdGhpcy5tYXNrTWFyZ2luID0gdGhpcy5tYXNrTWFyZ2luIHx8IDEwMDtcbiAgICB0aGlzLm1pblpvb20gPSB0aGlzLm1pblpvb20gfHwgMTA7XG4gICAgdGhpcy5tYXhab29tID0gdGhpcy5tYXhab29tIHx8IDE1O1xuICAgIHRoaXMubWFza0xheWVyXyA9IG5ldyBNYXNrTGF5ZXIoe1xuICAgICAgZXh0ZW50SW5NZXRlcnM6IHRoaXMuZXh0ZW50U2l6ZVxuICAgIH0sIHtcbiAgICAgIG1hcmdpbjogdGhpcy5tYXNrTWFyZ2luXG4gICAgfSk7XG4gIH07XG4gIF9wcm90by4kb25EZXN0cm95ID0gZnVuY3Rpb24gJG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8udW4oJ3Byb2dyZXNzJywgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyk7XG4gIH07XG4gIF9wcm90by5oYXNEYXRhID0gZnVuY3Rpb24gaGFzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmhhc09mZmxpbmVEYXRhKCk7XG4gIH07XG4gIF9wcm90by5jb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhID0gZnVuY3Rpb24gY29tcHV0ZVNpemVBbmREaXNwbGF5QWxlcnRMb2FkRGF0YSgpIHtcbiAgICB0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA9IHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5lc3RpbWF0ZUxvYWREYXRhU2l6ZSh0aGlzLm1hcCk7XG4gICAgaWYgKHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplID4gMCkge1xuICAgICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IHRydWU7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbiA9IGZ1bmN0aW9uIHRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oZmluaXNoZWQpIHtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGluZ0V4dGVudCA9ICF0aGlzLnNlbGVjdGluZ0V4dGVudDtcbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLm1hc2tMYXllcl8pO1xuICAgIHRoaXMucmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpO1xuICAgIGlmICh0aGlzLnNlbGVjdGluZ0V4dGVudCAmJiAhdGhpcy5tYXAuZ2V0TGF5ZXJzKCkuZ2V0QXJyYXkoKS5pbmNsdWRlcyh0aGlzLm1hc2tMYXllcl8pKSB7XG4gICAgICB0aGlzLmFkZFpvb21Db25zdHJhaW50c18oKTtcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMubWFza0xheWVyXyk7XG4gICAgfVxuICAgIHRoaXMubWFwLnJlbmRlcigpO1xuICB9O1xuICBfcHJvdG8udmFsaWRhdGVFeHRlbnQgPSBmdW5jdGlvbiB2YWxpZGF0ZUV4dGVudCgpIHtcbiAgICB0aGlzLnByb2dyZXNzUGVyY2VudHMgPSAwO1xuICAgIHZhciBleHRlbnQgPSB0aGlzLmdldERvd2xvYWRFeHRlbnRfKCk7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5zYXZlKGV4dGVudCwgdGhpcy5tYXApO1xuICB9O1xuICBfcHJvdG8uZmluaXNoRG93bmxvYWRfID0gZnVuY3Rpb24gZmluaXNoRG93bmxvYWRfKCkge1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24odHJ1ZSk7XG4gIH07XG4gIF9wcm90by5hc2tBYm9ydERvd25sb2FkID0gZnVuY3Rpb24gYXNrQWJvcnREb3dubG9hZCgpIHtcbiAgICB0aGlzLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWQgPSB0cnVlO1xuICB9O1xuICBfcHJvdG8uYWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8uY2FuY2VsKCk7XG4gICAgdGhpcy5kZWxldGVEYXRhKCk7XG4gIH07XG4gIF9wcm90by5zaG93TWVudSA9IGZ1bmN0aW9uIHNob3dNZW51KCkge1xuICAgIHRoaXMubWVudURpc3BsYXllZCA9IHRydWU7XG4gIH07XG4gIF9wcm90by5hY3RpdmF0ZU9mZmxpbmVNb2RlID0gZnVuY3Rpb24gYWN0aXZhdGVPZmZsaW5lTW9kZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLnJlc3RvcmUodGhpcy5tYXApLnRoZW4oZnVuY3Rpb24gKGV4dGVudCkge1xuICAgICAgX3RoaXMyLmRhdGFQb2x5Z29uXyA9IF90aGlzMi5jcmVhdGVQb2x5Z29uRnJvbUV4dGVudF8oZXh0ZW50KTtcbiAgICAgIHZhciBzaXplID0gX3RoaXMyLm1hcC5nZXRTaXplKCk7XG4gICAgICBpZiAoc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgICB9XG4gICAgICBfdGhpczIubWFwLmdldFZpZXcoKS5maXQoZXh0ZW50LCB7XG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH0pO1xuICAgICAgX3RoaXMyLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICAgIF90aGlzMi5kaXNwbGF5RXh0ZW50XygpO1xuICAgICAgX3RoaXMyLm9mZmxpbmVNb2RlLmVuYWJsZSgpO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uZGVhY3RpdmF0ZU9mZmxpbmVNb2RlID0gZnVuY3Rpb24gZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcbiAgX3Byb3RvLnRvZ2dsZUV4dGVudFZpc2liaWxpdHkgPSBmdW5jdGlvbiB0b2dnbGVFeHRlbnRWaXNpYmlsaXR5KCkge1xuICAgIGlmICh0aGlzLmlzRXh0ZW50VmlzaWJsZSgpKSB7XG4gICAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5jbGVhcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlFeHRlbnRfKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uaXNFeHRlbnRWaXNpYmxlID0gZnVuY3Rpb24gaXNFeHRlbnRWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5nZXRMZW5ndGgoKSA+IDA7XG4gIH07XG4gIF9wcm90by5kZWxldGVEYXRhID0gZnVuY3Rpb24gZGVsZXRlRGF0YSgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5jbGVhcigpO1xuICAgIHRoaXMuZGF0YVBvbHlnb25fID0gbnVsbDtcbiAgICBpZiAodGhpcy5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKCkpIHtcbiAgICAgIHRoaXMubWVudURpc3BsYXllZCA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcmVsb2FkSWZJbk9mZmxpbmVNb2RlID0gZnVuY3Rpb24gcmVsb2FkSWZJbk9mZmxpbmVNb2RlKCkge1xuICAgICAgaWYgKF90aGlzMy5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICBfdGhpczMuZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uY2xlYXIoKS50aGVuKHJlbG9hZElmSW5PZmZsaW5lTW9kZSk7XG4gIH07XG4gIF9wcm90by5kaXNwbGF5RXh0ZW50XyA9IGZ1bmN0aW9uIGRpc3BsYXlFeHRlbnRfKCkge1xuICAgIGlmICghdGhpcy5pc0V4dGVudFZpc2libGUoKSAmJiB0aGlzLmRhdGFQb2x5Z29uXykge1xuICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgRmVhdHVyZSh0aGlzLmRhdGFQb2x5Z29uXyk7XG4gICAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmFkZFpvb21Db25zdHJhaW50c18gPSBmdW5jdGlvbiBhZGRab29tQ29uc3RyYWludHNfKCkge1xuICAgIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHZhciB6b29tID0gdmlldy5nZXRab29tKCkgfHwgMDtcbiAgICB0aGlzLm9yaWdpbmFsTWluWm9vbSA9IHZpZXcuZ2V0TWluWm9vbSgpO1xuICAgIHRoaXMub3JpZ2luYWxNYXhab29tID0gdmlldy5nZXRNYXhab29tKCk7XG4gICAgaWYgKHpvb20gPCB0aGlzLm1pblpvb20pIHtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm1pblpvb20pO1xuICAgIH0gZWxzZSBpZiAoem9vbSA+IHRoaXMubWF4Wm9vbSkge1xuICAgICAgdmlldy5zZXRab29tKHRoaXMubWF4Wm9vbSk7XG4gICAgfVxuICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm1pblpvb20pO1xuICB9O1xuICBfcHJvdG8ucmVtb3ZlWm9vbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uIHJlbW92ZVpvb21Db25zdHJhaW50c18oKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgaWYgKHRoaXMub3JpZ2luYWxNYXhab29tICE9PSB1bmRlZmluZWQgJiYgdGhpcy5vcmlnaW5hbE1pblpvb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmlldy5zZXRNYXhab29tKHRoaXMub3JpZ2luYWxNYXhab29tKTtcbiAgICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm9yaWdpbmFsTWluWm9vbSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCkge1xuICAgIHZhciBwcm9qRXh0ZW50ID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKS5nZXRFeHRlbnQoKTtcbiAgICByZXR1cm4gbmV3IFBvbHlnb24oW2V4dGVudFRvUmVjdGFuZ2xlKHByb2pFeHRlbnQpLCBleHRlbnRUb1JlY3RhbmdsZShleHRlbnQpXSwgJ1hZJyk7XG4gIH07XG4gIF9wcm90by5nZXREb3dsb2FkRXh0ZW50XyA9IGZ1bmN0aW9uIGdldERvd2xvYWRFeHRlbnRfKCkge1xuICAgIHZhciBjZW50ZXIgPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIGhhbGZMZW5ndGggPSBNYXRoLmNlaWwodGhpcy5leHRlbnRTaXplIHx8IHRoaXMuZ2V0RXh0ZW50U2l6ZV8oKSkgLyAyO1xuICAgIHJldHVybiB0aGlzLm1hc2tMYXllcl8uY3JlYXRlRXh0ZW50KGNlbnRlciwgaGFsZkxlbmd0aCk7XG4gIH07XG4gIF9wcm90by5nZXRFeHRlbnRTaXplXyA9IGZ1bmN0aW9uIGdldEV4dGVudFNpemVfKCkge1xuICAgIHZhciBtYXBTaXplID0gdGhpcy5tYXAuZ2V0U2l6ZSgpIHx8IFsxNTAsIDE1MF07XG4gICAgdmFyIG1hc2tTaXplUGl4ZWwgPSBERVZJQ0VfUElYRUxfUkFUSU8gKiBNYXRoLm1pbihtYXBTaXplWzBdLCBtYXBTaXplWzFdKSAtIHRoaXMubWFza01hcmdpbiAqIDI7XG4gICAgdmFyIG1hc2tTaXplTWV0ZXIgPSBtYXNrU2l6ZVBpeGVsICogKHRoaXMubWFwLmdldFZpZXcoKS5nZXRSZXNvbHV0aW9uKCkgfHwgMSkgLyBERVZJQ0VfUElYRUxfUkFUSU87XG4gICAgcmV0dXJuIG1hc2tTaXplTWV0ZXI7XG4gIH07XG4gIHJldHVybiBDb250cm9sbGVyO1xufSgpO1xubXlNb2R1bGUuY29udHJvbGxlcignbmdlb09mZmxpbmVDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgbmdlb09mZmxpbmVDb21wb25lbnQgZnJvbSAnbmdlby9vZmZsaW5lL2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzIGZyb20gJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzJztcbmltcG9ydCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlcic7XG5pbXBvcnQgZG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvRG93bmxvYWRlcic7XG5pbXBvcnQgcmVzdG9yZXIgZnJvbSAnbmdlby9vZmZsaW5lL1Jlc3RvcmVyJztcbmltcG9ydCBtb2RlIGZyb20gJ25nZW8vb2ZmbGluZS9Nb2RlJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xudmFyIGV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVNb2R1bGUnLCBbbmdlb09mZmxpbmVDb21wb25lbnQubmFtZSwgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzLm1vZHVsZS5uYW1lLCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLm1vZHVsZS5uYW1lLCBkb3dubG9hZGVyLm1vZHVsZS5uYW1lLCByZXN0b3Jlci5tb2R1bGUubmFtZSwgbW9kZS5tb2R1bGUubmFtZV0pO1xuZXhwb3J0cy52YWx1ZSgnbmdlb09mZmxpbmVHdXR0ZXInLCA5Nik7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBvbExheWVyR3JvdXAgZnJvbSAnb2wvbGF5ZXIvR3JvdXAnO1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlTGF5ZXIobGF5ZXIsIGFuY2VzdG9ycywgdmlzaXRvcikge1xuICB2YXIgZGVzY2VuZCA9IHZpc2l0b3IobGF5ZXIsIGFuY2VzdG9ycyk7XG4gIGlmIChkZXNjZW5kICYmIGxheWVyIGluc3RhbmNlb2Ygb2xMYXllckdyb3VwKSB7XG4gICAgbGF5ZXIuZ2V0TGF5ZXJzKCkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRMYXllcikge1xuICAgICAgdHJhdmVyc2VMYXllcihjaGlsZExheWVyLCBbXS5jb25jYXQoYW5jZXN0b3JzLCBbbGF5ZXJdKSwgdmlzaXRvcik7XG4gICAgfSk7XG4gIH1cbn1cbnZhciBleHRyYWN0b3IgPSBuZXcgUmVnRXhwKCdbXi9dKi8vW14vXSsvKC4qKScpO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVVSTCh1cmwpIHtcbiAgdmFyIG1hdGNoZXMgPSBleHRyYWN0b3IuZXhlYyh1cmwpO1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBub3JtYWxpemUgdXJsICcgKyB1cmwpO1xuICB9XG4gIHJldHVybiBtYXRjaGVzWzFdO1xufSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdIQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0lBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0RBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=