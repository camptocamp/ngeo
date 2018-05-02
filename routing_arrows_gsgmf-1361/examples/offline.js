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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([30,"commons"]);
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













var MainController = function MainController(ngeoFeatureOverlayMgr, ngeoNetworkStatus, ngeoOfflineServiceManager) {
  this.offlineExtentSize = 10000;
  this.ngeoNetworkStatus = ngeoNetworkStatus;
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      center: [352379, 5172733],
      zoom: 4
    })
  });
  ngeoFeatureOverlayMgr.init(this.map);
  ngeoOfflineServiceManager.setSaveService('offlineDownloader');
  ngeoOfflineServiceManager.setRestoreService('ngeoOfflineRestorer');
};

MainController.$inject = ["ngeoFeatureOverlayMgr", "ngeoNetworkStatus", "ngeoOfflineServiceManager"];
MainController.$inject = ["ngeoFeatureOverlayMgr", "ngeoNetworkStatus", "ngeoOfflineServiceManager"];
MainController.module = angular__WEBPACK_IMPORTED_MODULE_11___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].module.name]);
MainController.module.value('ngeoOfflineTestUrl', '../../src/offline/component.html');
ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].service('ngeoOfflineConfiguration', ngeo_offline_Configuration_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
MainController.module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (MainController);

/***/ }),

/***/ "./node_modules/localforage/src/localforage.js":
/*!*****************************************************************************************!*\
  !*** delegated ./node_modules/localforage/src/localforage.js from dll-reference vendor ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1048);

/***/ }),

/***/ "./node_modules/ol/tilegrid.js":
/*!*************************************************************************!*\
  !*** delegated ./node_modules/ol/tilegrid.js from dll-reference vendor ***!
  \*************************************************************************/
/*! exports provided: getForProjection, wrapX, createForExtent, createXYZ, createForProjection, extentFromProjection */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(74);

/***/ }),

/***/ "./node_modules/ol/tilegrid/TileGrid.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/tilegrid/TileGrid.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(145);

/***/ }),

/***/ "./src/offline/AbstractLocalforageWrapper.js":
/*!***************************************************!*\
  !*** ./src/offline/AbstractLocalforageWrapper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Action;

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
      resolve: function resolve() {},
      reject: function reject() {}
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
    var action = event['data'];
    var id = action['id'];
    var command = action['command'];
    var args = action['args'] || [];
    var context = action['context'];
    var msg = action['msg'];
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
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



















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
    var promise = this.localforage_['clear']();
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

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



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

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



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
    window['parent'].postMessage(action, '*');
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

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



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
    if (action['command'] === 'setItem') {
      action['args'][1] = JSON.stringify(action['args'][1]);
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

var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOfflineMode', []);
module.service('ngeoOfflineMode', Mode);
Mode.module = module;
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

Service.module.configFunction_ = function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
};

Service.module.configFunction_.$inject = ["$httpProvider"];
Service.module.config(Service.module.configFunction_);
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
__p += '<div class="main-button">\n  <span ng-if="!$ctrl.hasData()">\n    <div class="no-data" ng-click="$ctrl.toggleViewExtentSelection()"></div>\n  </span>\n  <span ng-if="$ctrl.hasData()">\n    <div class="with-data" ng-click="$ctrl.showMenu()"></div>\n  </span>\n</div>\n\n<div ng-if="$ctrl.selectingExtent && !$ctrl.networkStatus.isDisconnected()" class="validate-extent btn btn-primary">\n  <div ng-if="!$ctrl.downloading" ng-click="$ctrl.computeSizeAndDisplayAlertLoadData()" translate>Save map</div>\n  <div ng-if="$ctrl.downloading" ng-click="$ctrl.askAbortDownload()" translate>Abort</div>\n</div>\n\n\n<div ng-if="$ctrl.downloading" class="in-progress">\n  <div>{{$ctrl.progressPercents}}%</div>\n</div>\n\n<ngeo-modal ng-model="$ctrl.menuDisplayed">\n  <div class="modal-header">\n    <button type="button" class="close"\n              data-dismiss="modal"\n              aria-label="{{\'Close\' | translate}}">\n      <span aria-hidden="true">&times;</span>\n    </button>\n    <h4 class="modal-title" translate>Offline map</h4>\n  </div>\n  <div class="modal-body">\n    <div ng-if="$ctrl.hasData()">\n      <button type="button" class="extent-zoom btn btn-default"\n              ng-if="!$ctrl.offlineMode.isEnabled()"\n              ng-click="$ctrl.activateOfflineMode()"\n              translate>Activate offline mode\n      </button>\n      <button type="button" class="extent-zoom btn btn-default"\n              ng-if="$ctrl.offlineMode.isEnabled() && !$ctrl.networkStatus.isDisconnected()"\n              ng-click="$ctrl.deactivateOfflineMode()"\n              translate>Deactivate offline mode\n      </button>\n\n      <button type="button" class="extent-show btn btn-default"\n              ng-if="$ctrl.offlineMode.isEnabled()"\n              ng-click="$ctrl.toggleExtentVisibility()">\n        <span ng-if="$ctrl.isExtentVisible()" translate>Hide extent</span>\n        <span ng-if="!$ctrl.isExtentVisible()" translate >Show extent</span>\n      </button>\n      <button type="button" class="delete btn btn-default"\n              ng-if="!$ctrl.networkStatus.isDisconnected()"\n              ng-click="$ctrl.displayAlertDestroyData = true"\n              translate>Delete data\n      </button>\n    </div>\n    <div ng-if="!$ctrl.hasData() && !$ctrl.networkStatus.isDisconnected()">\n      <button type="button" class="new-data btn btn-default"\n              ng-click="$ctrl.toggleViewExtentSelection()"\n              translate>Save new map\n      </button>\n    </div>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertLoadData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>~{{$ctrl.estimatedLoadDataSize}}MB of maps will be downloaded (until scale 1:25\'000) - Don\'t lock your device or navigate away from this site during the download process. Deactivate "private" mode of your browser.</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.validateExtent()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertNoLayer">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>No maps selected for saving.</p>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Ok\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertDestroyData">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>Do you really want to remove your data ?</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.deleteData()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n\n<ngeo-modal ng-model="$ctrl.displayAlertAbortDownload">\n  <div class="modal-header">\n    <h4 class="modal-title" translate>Warning</h4>\n  </div>\n  <div class="modal-body">\n      <p translate>Do you really want to remove your data ?</p>\n      <button type="button" class="validate btn btn-primary"\n              data-dismiss="modal"\n              ng-click="$ctrl.abortDownload()"\n              translate>Ok\n      </button>\n      <button type="button" class="delete btn btn-default"\n              data-dismiss="modal"\n              ng-click="$ctrl.followDownloadProgression_()"\n              translate>Cancel\n      </button>\n  </div>\n</ngeo-modal>\n';

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
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Observable.js */ "./node_modules/ol/Observable.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/GeometryLayout.js */ "./node_modules/ol/geom/GeometryLayout.js");
/* harmony import */ var ol_has_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/has.js */ "./node_modules/ol/has.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_9__);










var module = angular__WEBPACK_IMPORTED_MODULE_9___default.a.module('ngeoOffline', [ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_0__["default"].name, ngeo_message_modalComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.value('ngeoOfflineTemplateUrl', function (element, attrs) {
  var templateUrl = attrs['ngeoOfflineTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/offline/component.html';
});
module.run(["$templateCache", function ($templateCache) {
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
module.component('ngeoOffline', component);
var Controller = function () {
  Controller.$inject = ["$timeout", "ngeoFeatureOverlayMgr", "ngeoOfflineServiceManager", "ngeoOfflineConfiguration", "ngeoOfflineMode", "ngeoNetworkStatus"];

  function Controller($timeout, ngeoFeatureOverlayMgr, ngeoOfflineServiceManager, ngeoOfflineConfiguration, ngeoOfflineMode, ngeoNetworkStatus) {
    var _this = this;

    this.$timeout_ = $timeout;
    this.ngeoOfflineServiceManager_ = ngeoOfflineServiceManager;
    this.ngeoOfflineConfiguration_ = ngeoOfflineConfiguration;
    this.offlineMode = ngeoOfflineMode;
    this.networkStatus = ngeoNetworkStatus;
    this.map;
    this.extentSize = 0;
    this.featuresOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
    this.overlayCollection_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.featuresOverlay_.setFeatures(this.overlayCollection_);
    this.postcomposeListener_ = this.createMaskPostcompose_();
    this.postComposeListenerKey_ = null;
    this.dataPolygon_ = null;
    this.selectingExtent = false;
    this.downloading = false;
    this.progressPercents = 0;
    this.menuDisplayed = false;
    this.displayAlertAbortDownload = false;
    this.displayAlertLoadData = false;
    this.displayAlertNoLayer = false;
    this.maskMargin = 0;
    this.minZoom = 0;
    this.maxZoom = 0;
    this.originalMinZoom = 0;
    this.originalMaxZoom = 0;
    this.estimatedLoadDataSize = 0;

    this.progressCallback_ = function (event) {
      var progress = event.detail['progress'];
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

    if (this.postComposeListenerKey_) {
      Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_4__["unByKey"])(this.postComposeListenerKey_);
      this.postComposeListenerKey_ = null;
      this.removeZoomConstraints_();
    }

    if (this.selectingExtent && !this.postComposeListenerKey_) {
      this.addZoomConstraints_();
      this.postComposeListenerKey_ = this.map.on('postcompose', this.postcomposeListener_);
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
      var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.dataPolygon_);
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
    view.setMaxZoom(this.originalMaxZoom);
    view.setMinZoom(this.originalMinZoom);
  };

  _proto.createMaskPostcompose_ = function createMaskPostcompose_() {
    var _this4 = this;

    return function (evt) {
      var context = evt.context;
      var frameState = evt.frameState;

      if (!context || !frameState) {
        throw new Error('Missing context or frameState');
      }

      var resolution = frameState.viewState.resolution;
      var viewportWidth = frameState.size[0] * frameState.pixelRatio;
      var viewportHeight = frameState.size[1] * frameState.pixelRatio;
      var extentLength = _this4.extentSize ? _this4.extentSize / resolution * ol_has_js__WEBPACK_IMPORTED_MODULE_8__["DEVICE_PIXEL_RATIO"] : Math.min(viewportWidth, viewportHeight) - _this4.maskMargin * 2;
      var extentHalfLength = Math.ceil(extentLength / 2);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(viewportWidth, 0);
      context.lineTo(viewportWidth, viewportHeight);
      context.lineTo(0, viewportHeight);
      context.lineTo(0, 0);
      context.closePath();

      var extent = _this4.createExtent_([viewportWidth / 2, viewportHeight / 2], extentHalfLength);

      context.moveTo(extent[0], extent[1]);
      context.lineTo(extent[0], extent[3]);
      context.lineTo(extent[2], extent[3]);
      context.lineTo(extent[2], extent[1]);
      context.lineTo(extent[0], extent[1]);
      context.closePath();
      context.fillStyle = 'rgba(0, 5, 25, 0.5)';
      context.fill();
    };
  };

  _proto.createPolygonFromExtent_ = function createPolygonFromExtent_(extent) {
    var projExtent = this.map.getView().getProjection().getExtent();
    return new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_6__["default"]([Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(projExtent), Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["extentToRectangle"])(extent)], ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY);
  };

  _proto.createExtent_ = function createExtent_(center, halfLength) {
    var minx = center[0] - halfLength;
    var miny = center[1] - halfLength;
    var maxx = center[0] + halfLength;
    var maxy = center[1] + halfLength;
    return [minx, miny, maxx, maxy];
  };

  _proto.getDowloadExtent_ = function getDowloadExtent_() {
    var center = this.map.getView().getCenter();
    var halfLength = Math.ceil(this.extentSize || this.getExtentSize_()) / 2;
    return this.createExtent_(center, halfLength);
  };

  _proto.getExtentSize_ = function getExtentSize_() {
    var mapSize = this.map.getSize() || [150, 150];
    var maskSizePixel = ol_has_js__WEBPACK_IMPORTED_MODULE_8__["DEVICE_PIXEL_RATIO"] * Math.min(mapSize[0], mapSize[1]) - this.maskMargin * 2;
    var maskSizeMeter = maskSizePixel * (this.map.getView().getResolution() || 1) / ol_has_js__WEBPACK_IMPORTED_MODULE_8__["DEVICE_PIXEL_RATIO"];
    return maskSizeMeter;
  };

  return Controller;
}();
module.controller('ngeoOfflineController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (module);

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

/***/ 30:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTmV0d29ya1N0YXR1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9SZXN0b3Jlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9TZXJpYWxpemVyRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcnZpY2VNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1RpbGVzRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvZmZsaW5lXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMwLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuaW1wb3J0ICcuL29mZmxpbmUuY3NzJztcbmltcG9ydCAnLi9jb21tb25fZGVwZW5kZW5jaWVzLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVNb2R1bGUgZnJvbSAnbmdlby9vZmZsaW5lL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVDb25maWd1cmF0aW9uIGZyb20gJ25nZW8vb2ZmbGluZS9Db25maWd1cmF0aW9uLmpzJztcbmltcG9ydCBOZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIE1haW5Db250cm9sbGVyID0gZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIobmdlb0ZlYXR1cmVPdmVybGF5TWdyLCBuZ2VvTmV0d29ya1N0YXR1cywgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcikge1xuICB0aGlzLm9mZmxpbmVFeHRlbnRTaXplID0gMTAwMDA7XG4gIHRoaXMubmdlb05ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMzUyMzc5LCA1MTcyNzMzXSxcbiAgICAgIHpvb206IDRcbiAgICB9KVxuICB9KTtcbiAgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLmluaXQodGhpcy5tYXApO1xuICBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLnNldFNhdmVTZXJ2aWNlKCdvZmZsaW5lRG93bmxvYWRlcicpO1xuICBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLnNldFJlc3RvcmVTZXJ2aWNlKCduZ2VvT2ZmbGluZVJlc3RvcmVyJyk7XG59O1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIiwgXCJuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXCJdO1xuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCIsIFwibmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlclwiXTtcbk1haW5Db250cm9sbGVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9PZmZsaW5lTW9kdWxlLm5hbWUsIE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWVdKTtcbk1haW5Db250cm9sbGVyLm1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZXN0VXJsJywgJy4uLy4uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sJyk7XG5uZ2VvT2ZmbGluZU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24nLCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pO1xuTWFpbkNvbnRyb2xsZXIubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRyb2xsZXI7IiwidmFyIEFjdGlvbjtcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyKCkge1xuICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmN1cnJlbnRJZF8gPSAwO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbi5hcHBseSh0aGlzLCBbJ3NldEl0ZW0nXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydnZXRJdGVtJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24oJ2NsZWFyJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydjb25maWcnXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVBY3Rpb24oY29tbWFuZCkge1xuICAgIHZhciBpZCA9ICsrdGhpcy5jdXJyZW50SWRfO1xuXG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgIHBsdWdpbjogJ2xvY2FsZm9yYWdlJyxcbiAgICAgIGNvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICBhcmdzOiBhcmdzLFxuICAgICAgaWQ6IGlkLFxuICAgICAgY29udGV4dDogbnVsbFxuICAgIH07XG4gICAgdmFyIHdhaXRpbmdQcm9taXNlID0ge1xuICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSgpIHt9LFxuICAgICAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3QoKSB7fVxuICAgIH07XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uc2V0KGlkLCB3YWl0aW5nUHJvbWlzZSk7XG4gICAgdGhpcy5wb3N0VG9CYWNrZW5kKGFjdGlvbik7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG5cbiAgX3Byb3RvLnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gcmVjZWl2ZU1lc3NhZ2UoZXZlbnQpIHtcbiAgICB2YXIgYWN0aW9uID0gZXZlbnRbJ2RhdGEnXTtcbiAgICB2YXIgaWQgPSBhY3Rpb25bJ2lkJ107XG4gICAgdmFyIGNvbW1hbmQgPSBhY3Rpb25bJ2NvbW1hbmQnXTtcbiAgICB2YXIgYXJncyA9IGFjdGlvblsnYXJncyddIHx8IFtdO1xuICAgIHZhciBjb250ZXh0ID0gYWN0aW9uWydjb250ZXh0J107XG4gICAgdmFyIG1zZyA9IGFjdGlvblsnbXNnJ107XG4gICAgdmFyIHdhaXRpbmdQcm9taXNlID0gdGhpcy53YWl0aW5nUHJvbWlzZXNfLmdldChpZCk7XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gJ2Vycm9yJykge1xuICAgICAgY29uc29sZS5lcnJvcihtc2csIGFyZ3MsIGNvbnRleHQpO1xuXG4gICAgICBpZiAod2FpdGluZ1Byb21pc2UpIHtcbiAgICAgICAgd2FpdGluZ1Byb21pc2UucmVqZWN0KGFyZ3MsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLndhaXRpbmdQcm9taXNlc18uZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdyZXNwb25zZScpIHtcbiAgICAgIHdhaXRpbmdQcm9taXNlLnJlc29sdmUuYXBwbHkod2FpdGluZ1Byb21pc2UsIGFyZ3MpO1xuICAgICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLmRlbGV0ZShpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBjb21tYW5kJywgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLCBudWxsLCAnXFx0JykpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7fTtcblxuICByZXR1cm4gQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXI7XG59KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBvbE9ic2VydmFibGUgZnJvbSAnb2wvT2JzZXJ2YWJsZS5qcyc7XG5pbXBvcnQgb2xMYXllckxheWVyIGZyb20gJ29sL2xheWVyL0xheWVyLmpzJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlLmpzJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qLmpzJztcbmltcG9ydCB7IGRlZmF1bHRJbWFnZUxvYWRGdW5jdGlvbiB9IGZyb20gJ29sL3NvdXJjZS9JbWFnZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMuanMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JQcm9qZWN0aW9uIGFzIGNyZWF0ZVRpbGVHcmlkRm9yUHJvamVjdGlvbiB9IGZyb20gJ29sL3RpbGVncmlkLmpzJztcbmltcG9ydCBTZXJpYWxpemVyRGVzZXJpYWxpemVyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJpYWxpemVyRGVzZXJpYWxpemVyLmpzJztcbmltcG9ydCBMb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyLmpzJztcbmltcG9ydCBMb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzJztcbmltcG9ydCBMb2NhbGZvcmFnZUlvc1dyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0xvY2FsZm9yYWdlSW9zV3JhcHBlci5qcyc7XG5pbXBvcnQgbmdlb0N1c3RvbUV2ZW50IGZyb20gJ25nZW8vQ3VzdG9tRXZlbnQuanMnO1xuaW1wb3J0IHsgbm9ybWFsaXplVVJMLCB0cmF2ZXJzZUxheWVyIH0gZnJvbSAnbmdlby9vZmZsaW5lL3V0aWxzLmpzJztcbmltcG9ydCBsb2NhbGZvcmFnZSBmcm9tICdsb2NhbGZvcmFnZS9zcmMvbG9jYWxmb3JhZ2UuanMnO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX29sT2JzZXJ2YWJsZSkge1xuICBfZGVmYXVsdC4kaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcIm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcIiwgXCJuZ2VvT2ZmbGluZUd1dHRlclwiXTtcblxuICBfaW5oZXJpdHNMb29zZShfZGVmYXVsdCwgX29sT2JzZXJ2YWJsZSk7XG5cbiAgZnVuY3Rpb24gX2RlZmF1bHQoJHJvb3RTY29wZSwgbmdlb0JhY2tncm91bmRMYXllck1nciwgbmdlb09mZmxpbmVHdXR0ZXIpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9vbE9ic2VydmFibGUuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmxvY2FsZm9yYWdlXyA9IF90aGlzLmNyZWF0ZUxvY2FsZm9yYWdlKCk7XG5cbiAgICBfdGhpcy5jb25maWd1cmVMb2NhbGZvcmFnZSgpO1xuXG4gICAgX3RoaXMucm9vdFNjb3BlXyA9ICRyb290U2NvcGU7XG4gICAgX3RoaXMuaGFzRGF0YSA9IGZhbHNlO1xuXG4gICAgX3RoaXMuaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhKCk7XG5cbiAgICBfdGhpcy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXyA9IG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3I7XG4gICAgX3RoaXMuc2VyRGVzXyA9IG5ldyBTZXJpYWxpemVyRGVzZXJpYWxpemVyKHtcbiAgICAgIGd1dHRlcjogbmdlb09mZmxpbmVHdXR0ZXJcbiAgICB9KTtcbiAgICBfdGhpcy5ndXR0ZXJfID0gbmdlb09mZmxpbmVHdXR0ZXI7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGlzcGF0Y2hQcm9ncmVzc18gPSBmdW5jdGlvbiBkaXNwYXRjaFByb2dyZXNzXyhwcm9ncmVzcykge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgbmdlb0N1c3RvbUV2ZW50KCdwcm9ncmVzcycsIHtcbiAgICAgICdwcm9ncmVzcyc6IHByb2dyZXNzXG4gICAgfSkpO1xuICB9O1xuXG4gIF9wcm90by5pbml0aWFsaXplSGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBpbml0aWFsaXplSGFzT2ZmbGluZURhdGEoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB0aGlzLmdldEl0ZW0oJ29mZmxpbmVfY29udGVudCcpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLnNldEhhc09mZmxpbmVEYXRhKCEhdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5oYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIGhhc09mZmxpbmVEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0RhdGE7XG4gIH07XG5cbiAgX3Byb3RvLnNldEhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gc2V0SGFzT2ZmbGluZURhdGEodmFsdWUpIHtcbiAgICB2YXIgbmVlZERpZ2VzdCA9IHZhbHVlICE9PSB0aGlzLmhhc0RhdGE7XG4gICAgdGhpcy5oYXNEYXRhID0gdmFsdWU7XG5cbiAgICBpZiAobmVlZERpZ2VzdCkge1xuICAgICAgdGhpcy5yb290U2NvcGVfLiRhcHBseUFzeW5jKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by50cmFjZUdldFNldEl0ZW0gPSBmdW5jdGlvbiB0cmFjZUdldFNldEl0ZW0obXNnLCBrZXksIHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlTG9jYWxmb3JhZ2UgPSBmdW5jdGlvbiBjcmVhdGVMb2NhbGZvcmFnZSgpIHtcbiAgICBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1jb3Jkb3ZhJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBjb3Jkb3ZhIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9YW5kcm9pZCcpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgYW5kcm9pZCBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyKCk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWlvcycpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgaW9zIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlSW9zV3JhcHBlcigpO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbGZvcmFnZTtcbiAgfTtcblxuICBfcHJvdG8uY29uZmlndXJlTG9jYWxmb3JhZ2UgPSBmdW5jdGlvbiBjb25maWd1cmVMb2NhbGZvcmFnZSgpIHtcbiAgICB0aGlzLmxvY2FsZm9yYWdlXy5jb25maWcoe1xuICAgICAgJ25hbWUnOiAnbmdlb09mZmxpbmVTdG9yYWdlJyxcbiAgICAgICd2ZXJzaW9uJzogMS4wLFxuICAgICAgJ3N0b3JlTmFtZSc6ICdvZmZsaW5lU3RvcmFnZSdcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oa2V5KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlX1snZ2V0SXRlbSddKGtleSk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdnZXRJdGVtJywga2V5LCBwcm9taXNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oa2V5KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmxvY2FsZm9yYWdlX1sncmVtb3ZlSXRlbSddKGtleSk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdyZW1vdmVJdGVtJywga2V5LCBwcm9taXNlKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oa2V5LCB2YWx1ZSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ3NldEl0ZW0nXShrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3NldEl0ZW0nLCBrZXksIHByb21pc2UpO1xuICB9O1xuXG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMuc2V0SGFzT2ZmbGluZURhdGEoZmFsc2UpO1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ2NsZWFyJ10oKTtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ2NsZWFyJywgJycsIHByb21pc2UpO1xuICB9O1xuXG4gIF9wcm90by5lc3RpbWF0ZUxvYWREYXRhU2l6ZSA9IGZ1bmN0aW9uIGVzdGltYXRlTG9hZERhdGFTaXplKG1hcCkge1xuICAgIHJldHVybiA1MDtcbiAgfTtcblxuICBfcHJvdG8uZ2V0TGF5ZXJLZXkgPSBmdW5jdGlvbiBnZXRMYXllcktleShsYXllckl0ZW0pIHtcbiAgICByZXR1cm4gbGF5ZXJJdGVtLmxheWVyLmdldCgnbGFiZWwnKTtcbiAgfTtcblxuICBfcHJvdG8ub25UaWxlRG93bmxvYWRTdWNjZXNzID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRTdWNjZXNzKHByb2dyZXNzLCB0aWxlKSB7XG4gICAgdGhpcy5kaXNwYXRjaFByb2dyZXNzXyhwcm9ncmVzcyk7XG5cbiAgICBpZiAodGlsZS5yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0SXRlbShub3JtYWxpemVVUkwodGlsZS51cmwpLCB0aWxlLnJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgX3Byb3RvLm9uVGlsZURvd25sb2FkRXJyb3IgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZEVycm9yKHByb2dyZXNzKSB7XG4gICAgdGhpcy5kaXNwYXRjaFByb2dyZXNzXyhwcm9ncmVzcyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIF9wcm90by5nZXRFeHRlbnRCeVpvb20gPSBmdW5jdGlvbiBnZXRFeHRlbnRCeVpvb20obWFwLCBsYXllciwgYW5jZXN0b3JzLCB1c2VyRXh0ZW50KSB7XG4gICAgdmFyIGN1cnJlbnRab29tID0gbWFwLmdldFZpZXcoKS5nZXRab29tKCk7XG5cbiAgICBpZiAoY3VycmVudFpvb20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGN1cnJlbnRab29tJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBbMCwgMSwgMiwgMywgNF0uZm9yRWFjaChmdW5jdGlvbiAoZHopIHtcbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIHpvb206IGN1cnJlbnRab29tICsgZHosXG4gICAgICAgIGV4dGVudDogdXNlckV4dGVudFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgX3Byb3RvLnNvdXJjZUltYWdlV01TVG9UaWxlV01TID0gZnVuY3Rpb24gc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMoc291cmNlLCBwcm9qZWN0aW9uKSB7XG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlSW1hZ2VXTVMgJiYgc291cmNlLmdldFVybCgpICYmIHNvdXJjZS5nZXRJbWFnZUxvYWRGdW5jdGlvbigpID09PSBkZWZhdWx0SW1hZ2VMb2FkRnVuY3Rpb24pIHtcbiAgICAgIHZhciB0aWxlR3JpZCA9IGNyZWF0ZVRpbGVHcmlkRm9yUHJvamVjdGlvbihzb3VyY2UuZ2V0UHJvamVjdGlvbigpIHx8IHByb2plY3Rpb24sIDQyLCAyNTYpO1xuICAgICAgdmFyIGF0dHJpYnV0aW9ucyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGlvbnMoKSB8fCAnJztcbiAgICAgIHZhciB1cmwgPSBzb3VyY2UuZ2V0VXJsKCk7XG5cbiAgICAgIGlmICghdXJsIHx8ICFhdHRyaWJ1dGlvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlcycpO1xuICAgICAgfVxuXG4gICAgICBzb3VyY2UgPSBuZXcgb2xTb3VyY2VUaWxlV01TKHtcbiAgICAgICAgZ3V0dGVyOiB0aGlzLmd1dHRlcl8sXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICB0aWxlR3JpZDogdGlsZUdyaWQsXG4gICAgICAgIGF0dHJpYnV0aW9uczogYXR0cmlidXRpb25zLFxuICAgICAgICBwcm9qZWN0aW9uOiBzb3VyY2UuZ2V0UHJvamVjdGlvbigpLFxuICAgICAgICBwYXJhbXM6IHNvdXJjZS5nZXRQYXJhbXMoKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlTGF5ZXJNZXRhZGF0YXMgPSBmdW5jdGlvbiBjcmVhdGVMYXllck1ldGFkYXRhcyhtYXAsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBsYXllcnNJdGVtcyA9IFtdO1xuXG4gICAgdmFyIHZpc2l0TGF5ZXIgPSBmdW5jdGlvbiB2aXNpdExheWVyKGxheWVyLCBhbmNlc3RvcnMpIHtcbiAgICAgIGlmIChsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJMYXllcikge1xuICAgICAgICB2YXIgZXh0ZW50Qnlab29tID0gX3RoaXMzLmdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpO1xuXG4gICAgICAgIHZhciBwcm9qZWN0aW9uID0gb2xQcm9qLmdldChtYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSk7XG5cbiAgICAgICAgdmFyIHNvdXJjZSA9IF90aGlzMy5zb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyhsYXllci5nZXRTb3VyY2UoKSwgcHJvamVjdGlvbik7XG5cbiAgICAgICAgdmFyIGxheWVyVHlwZTtcbiAgICAgICAgdmFyIGxheWVyU2VyaWFsaXphdGlvbjtcblxuICAgICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVGlsZSB8fCBsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJJbWFnZSkge1xuICAgICAgICAgIGxheWVyVHlwZSA9ICd0aWxlJztcbiAgICAgICAgICBsYXllclNlcmlhbGl6YXRpb24gPSBfdGhpczMuc2VyRGVzXy5zZXJpYWxpemVUaWxlTGF5ZXIobGF5ZXIsIHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVmVjdG9yKSB7XG4gICAgICAgICAgbGF5ZXJUeXBlID0gJ3ZlY3Rvcic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFja2dyb3VuZExheWVyID0gX3RoaXMzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfLmdldChtYXApID09PSBsYXllcjtcbiAgICAgICAgbGF5ZXJzSXRlbXMucHVzaCh7XG4gICAgICAgICAgYmFja2dyb3VuZExheWVyOiBiYWNrZ3JvdW5kTGF5ZXIsXG4gICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgZXh0ZW50Qnlab29tOiBleHRlbnRCeVpvb20sXG4gICAgICAgICAgbGF5ZXJUeXBlOiBsYXllclR5cGUsXG4gICAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uOiBsYXllclNlcmlhbGl6YXRpb24sXG4gICAgICAgICAgbGF5ZXI6IGxheWVyLFxuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgIGFuY2VzdG9yczogYW5jZXN0b3JzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgbWFwLmdldExheWVycygpLmZvckVhY2goZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgIHRyYXZlcnNlTGF5ZXIocm9vdCwgW10sIHZpc2l0TGF5ZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBsYXllcnNJdGVtcztcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8gPSBmdW5jdGlvbiBjcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyhvZmZsaW5lTGF5ZXIpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciB0aWxlTG9hZEZ1bmN0aW9uID0gZnVuY3Rpb24gdGlsZUxvYWRGdW5jdGlvbihpbWFnZVRpbGUsIHNyYykge1xuICAgICAgX3RoaXM0LmdldEl0ZW0obm9ybWFsaXplVVJMKHNyYykpLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgY29udGVudCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQzBsRVFWUjQybU5rWUFBQUFBWUFBakNCMEM4QUFBQUFTVVZPUks1Q1lJST0nO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1hZ2VUaWxlLmdldEltYWdlKCkuc3JjID0gY29udGVudDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGlsZUxvYWRGdW5jdGlvbjtcbiAgfTtcblxuICBfcHJvdG8ucmVjcmVhdGVPZmZsaW5lTGF5ZXIgPSBmdW5jdGlvbiByZWNyZWF0ZU9mZmxpbmVMYXllcihvZmZsaW5lTGF5ZXIpIHtcbiAgICBpZiAob2ZmbGluZUxheWVyLmxheWVyVHlwZSA9PT0gJ3RpbGUnKSB7XG4gICAgICB2YXIgc2VyaWFsaXphdGlvbiA9IG9mZmxpbmVMYXllci5sYXllclNlcmlhbGl6YXRpb247XG5cbiAgICAgIGlmIChzZXJpYWxpemF0aW9uKSB7XG4gICAgICAgIHZhciB0aWxlTG9hZEZ1bmN0aW9uID0gdGhpcy5jcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyhvZmZsaW5lTGF5ZXIpO1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLnNlckRlc18uZGVzZXJpYWxpemVUaWxlTGF5ZXIoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgICAgIHJldHVybiBsYXllcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8uZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcyA9IGZ1bmN0aW9uIGdldE1heE51bWJlck9mUGFyYWxsZWxEb3dubG9hZHMoKSB7XG4gICAgcmV0dXJuIDExO1xuICB9O1xuXG4gIHJldHVybiBfZGVmYXVsdDtcbn0ob2xPYnNlcnZhYmxlKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IHJldHVybiBpdC5uZXh0LmJpbmQoaXQpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuaW1wb3J0IHsgREVWSUNFX1BJWEVMX1JBVElPIH0gZnJvbSAnb2wvaGFzLmpzJztcbmltcG9ydCBvbFNvdXJjZVRpbGVXTVMgZnJvbSAnb2wvc291cmNlL1RpbGVXTVMuanMnO1xuaW1wb3J0IG9sU291cmNlV01UUyBmcm9tICdvbC9zb3VyY2UvV01UUy5qcyc7XG5pbXBvcnQgVGlsZXNEb3dubG9hZGVyIGZyb20gJ25nZW8vb2ZmbGluZS9UaWxlc0Rvd25sb2FkZXIuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbmZ1bmN0aW9uIG1hZ25pdHVkZTIoYSwgYikge1xuICB2YXIgbWFnbml0dWRlU3F1YXJlZCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgbWFnbml0dWRlU3F1YXJlZCArPSBNYXRoLnBvdyhhW2ldIC0gYltpXSwgMik7XG4gIH1cblxuICByZXR1cm4gbWFnbml0dWRlU3F1YXJlZDtcbn1cblxudmFyIERvd25sb2FkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIERvd25sb2FkZXIuJGluamVjdCA9IFtcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiXTtcblxuICBmdW5jdGlvbiBEb3dubG9hZGVyKG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy50aWxlRG93bmxvYWRlcl8gPSBudWxsO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IERvd25sb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRoaXMudGlsZURvd25sb2FkZXJfKSB7XG4gICAgICB0aGlzLnRpbGVEb3dubG9hZGVyXy5jYW5jZWwoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnF1ZXVlTGF5ZXJUaWxlc18gPSBmdW5jdGlvbiBxdWV1ZUxheWVyVGlsZXNfKGxheWVyTWV0YWRhdGEsIHF1ZXVlKSB7XG4gICAgdmFyIHNvdXJjZSA9IGxheWVyTWV0YWRhdGEuc291cmNlO1xuICAgIHZhciBtYXAgPSBsYXllck1ldGFkYXRhLm1hcCxcbiAgICAgICAgZXh0ZW50Qnlab29tID0gbGF5ZXJNZXRhZGF0YS5leHRlbnRCeVpvb207XG5cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUuYXNzZXJ0KHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlVGlsZVdNUyB8fCBzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVdNVFMpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gbWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgdmFyIHRpbGVHcmlkID0gc291cmNlLmdldFRpbGVHcmlkKCk7XG4gICAgdmFyIHRpbGVVcmxGdW5jdGlvbiA9IHNvdXJjZS5nZXRUaWxlVXJsRnVuY3Rpb24oKTtcbiAgICBjb25zb2xlLmFzc2VydChleHRlbnRCeVpvb20pO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoKSB7XG4gICAgICB2YXIgZXh0ZW50Wm9vbSA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIHogPSBleHRlbnRab29tLnpvb207XG4gICAgICB2YXIgZXh0ZW50ID0gZXh0ZW50Wm9vbS5leHRlbnQ7XG4gICAgICB2YXIgcXVldWVCeVogPSBbXTtcbiAgICAgIHZhciBtaW5YID0gdm9pZCAwO1xuICAgICAgdmFyIG1pblkgPSB2b2lkIDA7XG4gICAgICB2YXIgbWF4WCA9IHZvaWQgMDtcbiAgICAgIHZhciBtYXhZID0gdm9pZCAwO1xuICAgICAgdGlsZUdyaWQuZm9yRWFjaFRpbGVDb29yZChleHRlbnQsIHosIGZ1bmN0aW9uIChjb29yZCkge1xuICAgICAgICBtYXhYID0gY29vcmRbMV07XG4gICAgICAgIG1heFkgPSBjb29yZFsyXTtcblxuICAgICAgICBpZiAobWluWCA9PT0gdW5kZWZpbmVkIHx8IG1pblkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG1pblggPSBjb29yZFsxXTtcbiAgICAgICAgICBtaW5ZID0gY29vcmRbMl07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXJsID0gdGlsZVVybEZ1bmN0aW9uKGNvb3JkLCBERVZJQ0VfUElYRUxfUkFUSU8sIHByb2plY3Rpb24pO1xuICAgICAgICBjb25zb2xlLmFzc2VydCh1cmwpO1xuXG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICB2YXIgdGlsZSA9IHtcbiAgICAgICAgICAgIGNvb3JkOiBjb29yZCxcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgcmVzcG9uc2U6IG51bGxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHF1ZXVlQnlaLnB1c2godGlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGNlbnRlclRpbGVDb29yZCA9IFt6LCAobWluWCArIG1heFgpIC8gMiwgKG1pblkgKyBtYXhZKSAvIDJdO1xuICAgICAgcXVldWVCeVouc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gbWFnbml0dWRlMihhLmNvb3JkLCBjZW50ZXJUaWxlQ29vcmQpIC0gbWFnbml0dWRlMihiLmNvb3JkLCBjZW50ZXJUaWxlQ29vcmQpO1xuICAgICAgfSk7XG4gICAgICBxdWV1ZS5wdXNoLmFwcGx5KHF1ZXVlLCBxdWV1ZUJ5Wik7XG4gICAgfTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoZXh0ZW50Qnlab29tKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIF9sb29wKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5zYXZlID0gZnVuY3Rpb24gc2F2ZShleHRlbnQsIG1hcCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgbGF5ZXJzTWV0YWRhdGFzID0gdGhpcy5jb25maWd1cmF0aW9uXy5jcmVhdGVMYXllck1ldGFkYXRhcyhtYXAsIGV4dGVudCk7XG4gICAgdmFyIHBlcnNpc3RlbnRMYXllcnMgPSBbXTtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgem9vbXMgPSBbXTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKGxheWVyc01ldGFkYXRhcyksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgbGF5ZXJJdGVtID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICBpZiAobGF5ZXJJdGVtLmxheWVyVHlwZSA9PT0gJ3RpbGUnKSB7XG4gICAgICAgIHZhciB0aWxlcyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXVlTGF5ZXJUaWxlc18obGF5ZXJJdGVtLCB0aWxlcyk7XG4gICAgICAgIHF1ZXVlLnB1c2guYXBwbHkocXVldWUsIHRpbGVzKTtcbiAgICAgIH1cblxuICAgICAgcGVyc2lzdGVudExheWVycy5wdXNoKHtcbiAgICAgICAgYmFja2dyb3VuZExheWVyOiBsYXllckl0ZW0uYmFja2dyb3VuZExheWVyLFxuICAgICAgICBsYXllclR5cGU6IGxheWVySXRlbS5sYXllclR5cGUsXG4gICAgICAgIGxheWVyU2VyaWFsaXphdGlvbjogbGF5ZXJJdGVtLmxheWVyU2VyaWFsaXphdGlvbixcbiAgICAgICAga2V5OiB0aGlzLmNvbmZpZ3VyYXRpb25fLmdldExheWVyS2V5KGxheWVySXRlbSlcbiAgICAgIH0pO1xuICAgICAgbGF5ZXJJdGVtLmV4dGVudEJ5Wm9vbS5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIHpvb20gPSBvYmouem9vbTtcblxuICAgICAgICBpZiAoIXpvb21zLmluY2x1ZGVzKHpvb20pKSB7XG4gICAgICAgICAgem9vbXMucHVzaCh6b29tKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHBlcnNpc3RlbnRPYmplY3QgPSB7XG4gICAgICBleHRlbnQ6IGV4dGVudCxcbiAgICAgIGxheWVyczogcGVyc2lzdGVudExheWVycyxcbiAgICAgIHpvb21zOiB6b29tcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogMTtcbiAgICAgIH0pXG4gICAgfTtcbiAgICB2YXIgc2V0T2ZmbGluZUNvbnRlbnRQcm9taXNlID0gdGhpcy5jb25maWd1cmF0aW9uXy5zZXRJdGVtKCdvZmZsaW5lX2NvbnRlbnQnLCBwZXJzaXN0ZW50T2JqZWN0KTtcbiAgICB2YXIgbWF4RG93bmxvYWRzID0gdGhpcy5jb25maWd1cmF0aW9uXy5nZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzKCk7XG4gICAgdGhpcy50aWxlRG93bmxvYWRlcl8gPSBuZXcgVGlsZXNEb3dubG9hZGVyKHF1ZXVlLCB0aGlzLmNvbmZpZ3VyYXRpb25fLCBtYXhEb3dubG9hZHMpO1xuICAgIHZhciB0aWxlRG93bmxvYWRQcm9taXNlID0gdGhpcy50aWxlRG93bmxvYWRlcl8uZG93bmxvYWQoKTtcbiAgICB2YXIgYWxsUHJvbWlzZSA9IFByb21pc2UuYWxsKFtzZXRPZmZsaW5lQ29udGVudFByb21pc2UsIHRpbGVEb3dubG9hZFByb21pc2VdKTtcblxuICAgIHZhciBzZXRIYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIHNldEhhc09mZmxpbmVEYXRhKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmNvbmZpZ3VyYXRpb25fLnNldEhhc09mZmxpbmVEYXRhKHRydWUpO1xuICAgIH07XG5cbiAgICBhbGxQcm9taXNlLnRoZW4oc2V0SGFzT2ZmbGluZURhdGEsIHNldEhhc09mZmxpbmVEYXRhKTtcbiAgICByZXR1cm4gYWxsUHJvbWlzZTtcbiAgfTtcblxuICByZXR1cm4gRG93bmxvYWRlcjtcbn0oKTtcblxudmFyIG5hbWUgPSAnb2ZmbGluZURvd25sb2FkZXInO1xuRG93bmxvYWRlci5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBbXSkuc2VydmljZShuYW1lLCBEb3dubG9hZGVyKTtcbnZhciBleHBvcnRzID0gRG93bmxvYWRlcjtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgQWJzdHJhY3RXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9BYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlci5qcyc7XG5cbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoQW5kcm9pZFdyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuXG4gIGZ1bmN0aW9uIEFuZHJvaWRXcmFwcGVyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX0Fic3RyYWN0V3JhcHBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgd2luZG93LmFuZHJvaWRXcmFwcGVyID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFuZHJvaWRXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgdmFyIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uKTtcbiAgICB3aW5kb3cubmdlb0hvc3QucG9zdE1lc3NhZ2VUb0FuZHJvaWQoc3RyaW5naWZpZWQpO1xuICB9O1xuXG4gIF9wcm90by5yZWNlaXZlRnJvbUFuZHJvaWQgPSBmdW5jdGlvbiByZWNlaXZlRnJvbUFuZHJvaWQoYWN0aW9uU3RyaW5nKSB7XG4gICAgdmFyIGFjdGlvbiA9IEpTT04ucGFyc2UoYWN0aW9uU3RyaW5nKTtcbiAgICB0aGlzLnJlY2VpdmVNZXNzYWdlKHtcbiAgICAgICdkYXRhJzogYWN0aW9uXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEFuZHJvaWRXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIuanMnO1xuXG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKENvcmRvdmFXcmFwcGVyLCBfQWJzdHJhY3RXcmFwcGVyKTtcblxuICBmdW5jdGlvbiBDb3Jkb3ZhV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgX3RoaXMucmVjZWl2ZU1lc3NhZ2UuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksIGZhbHNlKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29yZG92YVdyYXBwZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICB3aW5kb3dbJ3BhcmVudCddLnBvc3RNZXNzYWdlKGFjdGlvbiwgJyonKTtcbiAgfTtcblxuICByZXR1cm4gQ29yZG92YVdyYXBwZXI7XG59KEFic3RyYWN0V3JhcHBlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgQWJzdHJhY3RXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9BYnN0cmFjdExvY2FsZm9yYWdlV3JhcHBlci5qcyc7XG5cbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9BYnN0cmFjdFdyYXBwZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoSW9zV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG5cbiAgZnVuY3Rpb24gSW9zV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvdy5pb3NXcmFwcGVyID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IElvc1dyYXBwZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5wb3N0VG9CYWNrZW5kID0gZnVuY3Rpb24gcG9zdFRvQmFja2VuZChhY3Rpb24pIHtcbiAgICBpZiAoYWN0aW9uWydjb21tYW5kJ10gPT09ICdzZXRJdGVtJykge1xuICAgICAgYWN0aW9uWydhcmdzJ11bMV0gPSBKU09OLnN0cmluZ2lmeShhY3Rpb25bJ2FyZ3MnXVsxXSk7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uKTtcbiAgICB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5pb3MucG9zdE1lc3NhZ2Uoc3RyaW5naWZpZWQpO1xuICB9O1xuXG4gIF9wcm90by5yZWNlaXZlRnJvbUlvcyA9IGZ1bmN0aW9uIHJlY2VpdmVGcm9tSW9zKGFjdGlvblN0cmluZykge1xuICAgIHZhciBhY3Rpb24gPSBKU09OLnBhcnNlKGFjdGlvblN0cmluZyk7XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb25bJ2FyZ3MnXSB8fCBbXTtcbiAgICBhY3Rpb25bJ2FyZ3MnXSA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlY2VpdmVNZXNzYWdlKHtcbiAgICAgICdkYXRhJzogYWN0aW9uXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIElvc1dyYXBwZXI7XG59KEFic3RyYWN0V3JhcHBlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICBNb2RlLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIl07XG5cbiAgZnVuY3Rpb24gTW9kZShuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5jb21wb25lbnRfID0gbnVsbDtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTW9kZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmlzRW5hYmxlZCA9IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkXztcbiAgfTtcblxuICBfcHJvdG8uZW5hYmxlID0gZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgIHRoaXMuZW5hYmxlZF8gPSB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5yZWdpc3RlckNvbXBvbmVudCA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIHRoaXMuY29tcG9uZW50XyA9IGNvbXBvbmVudDtcbiAgfTtcblxuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbXBvbmVudCBpcyBub3QgcmVnaXN0ZXJlZCcpO1xuICAgIH1cblxuICAgIHRoaXMuY29tcG9uZW50Xy5hY3RpdmF0ZU9mZmxpbmVNb2RlKCk7XG4gIH07XG5cbiAgX3Byb3RvLmhhc0RhdGEgPSBmdW5jdGlvbiBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uaGFzT2ZmbGluZURhdGEoKTtcbiAgfTtcblxuICByZXR1cm4gTW9kZTtcbn0oKTtcblxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZU1vZGUnLCBbXSk7XG5tb2R1bGUuc2VydmljZSgnbmdlb09mZmxpbmVNb2RlJywgTW9kZSk7XG5Nb2RlLm1vZHVsZSA9IG1vZHVsZTtcbmV4cG9ydCBkZWZhdWx0IE1vZGU7IiwiaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgU2VydmljZS4kaW5qZWN0ID0gW1wiJGRvY3VtZW50XCIsIFwiJHdpbmRvd1wiLCBcIiR0aW1lb3V0XCIsIFwiJHJvb3RTY29wZVwiLCBcIm5nZW9PZmZsaW5lVGVzdFVybFwiXTtcblxuICBmdW5jdGlvbiBTZXJ2aWNlKCRkb2N1bWVudCwgJHdpbmRvdywgJHRpbWVvdXQsICRyb290U2NvcGUsIG5nZW9PZmZsaW5lVGVzdFVybCkge1xuICAgIHRoaXMuJGRvY3VtZW50XyA9ICRkb2N1bWVudDtcbiAgICB0aGlzLiR3aW5kb3dfID0gJHdpbmRvdztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyA9IG5nZW9PZmZsaW5lVGVzdFVybDtcbiAgICB0aGlzLmNvdW50XyA9IDA7XG4gICAgdGhpcy5vZmZsaW5lXztcbiAgICB0aGlzLnByb21pc2VfO1xuICAgIHRoaXMuaW5pdGlhbGl6ZV8oKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdGlhbGl6ZV8gPSBmdW5jdGlvbiBpbml0aWFsaXplXygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5vZmZsaW5lXyA9ICF0aGlzLiR3aW5kb3dfLm5hdmlnYXRvci5vbkxpbmU7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLiR3aW5kb3dfLmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNoZWNrKHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy4kZG9jdW1lbnRfLmFqYXhFcnJvcikge1xuICAgICAgdmFyIG9uQWpheEVycm9yID0gZnVuY3Rpb24gb25BamF4RXJyb3IoZXZ0LCBqcXhociwgc2V0dGluZ3MsIHRocm93bkVycm9yKSB7XG4gICAgICAgIGlmICghL14oY2FuY2VsZWR8YWJvcnQpJC8udGVzdCh0aHJvd25FcnJvcikpIHtcbiAgICAgICAgICBfdGhpcy5jaGVjaygyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy4kZG9jdW1lbnRfLmFqYXhFcnJvcihvbkFqYXhFcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICB0aGlzLiR0aW1lb3V0Xy5jYW5jZWwodGhpcy5wcm9taXNlXyk7XG4gICAgICB0aGlzLnByb21pc2VfID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY291bnRfKys7XG4gICAgICB0aGlzLnByb21pc2VfID0gdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmNoZWNrKCk7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogdGhpcy5uZ2VvT2ZmbGluZVRlc3RVcmxfLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8gPSAwO1xuXG4gICAgICAgIGlmIChfdGhpczIub2ZmbGluZV8pIHtcbiAgICAgICAgICBfdGhpczIudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50XyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8rKztcblxuICAgICAgICBpZiAoX3RoaXMyLmNvdW50XyA+IDIgJiYgIV90aGlzMi5vZmZsaW5lXykge1xuICAgICAgICAgIF90aGlzMi50cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8gPSBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKG9mZmxpbmUpIHtcbiAgICB0aGlzLm9mZmxpbmVfID0gb2ZmbGluZTtcbiAgICB0aGlzLiRyb290U2NvcGVfLiRkaWdlc3QoKTtcbiAgfTtcblxuICBfcHJvdG8uaXNEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbiBpc0Rpc2Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLm9mZmxpbmVfO1xuICB9O1xuXG4gIHJldHVybiBTZXJ2aWNlO1xufSgpO1xuXG52YXIgbmFtZSA9ICduZ2VvTmV0d29ya1N0YXR1cyc7XG5TZXJ2aWNlLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcblNlcnZpY2UubW9kdWxlLnNlcnZpY2UobmFtZSwgU2VydmljZSk7XG5cbnZhciBodHRwSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBodHRwSW50ZXJjZXB0b3IoJHEsIG5nZW9EZWJvdW5jZSwgbmdlb05ldHdvcmtTdGF0dXMpIHtcbiAgdmFyIGRlYm91bmNlZENoZWNrID0gbmdlb0RlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmdlb05ldHdvcmtTdGF0dXMuY2hlY2sodW5kZWZpbmVkKTtcbiAgfSwgMjAwMCwgZmFsc2UpO1xuICByZXR1cm4ge1xuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH0sXG4gICAgcmVxdWVzdEVycm9yOiBmdW5jdGlvbiByZXF1ZXN0RXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfSxcbiAgICByZXNwb25zZTogZnVuY3Rpb24gcmVzcG9uc2UoX3Jlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gX3Jlc3BvbnNlO1xuICAgIH0sXG4gICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgIGRlYm91bmNlZENoZWNrKCk7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfVxuICB9O1xufTtcblxuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuU2VydmljZS5tb2R1bGUuZmFjdG9yeSgnaHR0cEludGVyY2VwdG9yJywgaHR0cEludGVyY2VwdG9yKTtcblxuU2VydmljZS5tb2R1bGUuY29uZmlnRnVuY3Rpb25fID0gZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XG59O1xuXG5TZXJ2aWNlLm1vZHVsZS5jb25maWdGdW5jdGlvbl8uJGluamVjdCA9IFtcIiRodHRwUHJvdmlkZXJcIl07XG5TZXJ2aWNlLm1vZHVsZS5jb25maWcoU2VydmljZS5tb2R1bGUuY29uZmlnRnVuY3Rpb25fKTtcbnZhciBleHBvcnRzID0gU2VydmljZTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgcmV0dXJuIGl0Lm5leHQuYmluZChpdCk7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5pbXBvcnQgbmdlb01hcEJhY2tncm91bmRMYXllck1nciBmcm9tICduZ2VvL21hcC9CYWNrZ3JvdW5kTGF5ZXJNZ3IuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbnZhciBSZXN0b3JlciA9IGZ1bmN0aW9uICgpIHtcbiAgUmVzdG9yZXIuJGluamVjdCA9IFtcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiLCBcIm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcIl07XG5cbiAgZnVuY3Rpb24gUmVzdG9yZXIobmdlb09mZmxpbmVDb25maWd1cmF0aW9uLCBuZ2VvQmFja2dyb3VuZExheWVyTWdyKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfID0gbmdlb0JhY2tncm91bmRMYXllck1ncjtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSZXN0b3Jlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKG1hcCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXy5nZXRJdGVtKCdvZmZsaW5lX2NvbnRlbnQnKS50aGVuKGZ1bmN0aW9uIChvZmZsaW5lQ29udGVudCkge1xuICAgICAgcmV0dXJuIF90aGlzLmRvUmVzdG9yZShtYXAsIG9mZmxpbmVDb250ZW50KTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZG9SZXN0b3JlID0gZnVuY3Rpb24gZG9SZXN0b3JlKG1hcCwgb2ZmbGluZUNvbnRlbnQpIHtcbiAgICBtYXAuZ2V0TGF5ZXJHcm91cCgpLmdldExheWVycygpLmNsZWFyKCk7XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG9mZmxpbmVDb250ZW50LmxheWVycyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgb2ZmbGluZUxheWVyID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLnJlY3JlYXRlT2ZmbGluZUxheWVyKG9mZmxpbmVMYXllcik7XG5cbiAgICAgIGlmIChsYXllcikge1xuICAgICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xuXG4gICAgICAgIGlmIChvZmZsaW5lTGF5ZXIuYmFja2dyb3VuZExheWVyKSB7XG4gICAgICAgICAgdGhpcy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXy5zZXQobWFwLCBsYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2ZmbGluZUNvbnRlbnQuZXh0ZW50O1xuICB9O1xuXG4gIHJldHVybiBSZXN0b3Jlcjtcbn0oKTtcblxudmFyIG5hbWUgPSAnbmdlb09mZmxpbmVSZXN0b3Jlcic7XG5SZXN0b3Jlci5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBbbmdlb01hcEJhY2tncm91bmRMYXllck1nci5uYW1lXSkuc2VydmljZShuYW1lLCBSZXN0b3Jlcik7XG52YXIgZXhwb3J0cyA9IFJlc3RvcmVyO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJpbXBvcnQgT2xUaWxlZ3JpZFRpbGVHcmlkIGZyb20gJ29sL3RpbGVncmlkL1RpbGVHcmlkLmpzJztcbmltcG9ydCBPbFRpbGVncmlkV01UUyBmcm9tICdvbC90aWxlZ3JpZC9XTVRTLmpzJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qLmpzJztcbmltcG9ydCBPbFNvdXJjZVRpbGVXTVMgZnJvbSAnb2wvc291cmNlL1RpbGVXTVMuanMnO1xuaW1wb3J0IE9sU291cmNlV01UUyBmcm9tICdvbC9zb3VyY2UvV01UUy5qcyc7XG5pbXBvcnQgT2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5cbnZhciBTZXJEZXMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlckRlcyhfcmVmKSB7XG4gICAgdmFyIGd1dHRlciA9IF9yZWYuZ3V0dGVyO1xuICAgIHRoaXMuZ3V0dGVyXyA9IGd1dHRlcjtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJEZXMucHJvdG90eXBlO1xuXG4gIF9wcm90by5jcmVhdGVCYXNlT2JqZWN0XyA9IGZ1bmN0aW9uIGNyZWF0ZUJhc2VPYmplY3RfKG9sT2JqZWN0KSB7XG4gICAgdmFyIHByb3BlcnRpZXMgPSBvbE9iamVjdC5nZXRQcm9wZXJ0aWVzKCk7XG4gICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgIHZhciB0eXBlT2YgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICAgIGlmICh0eXBlT2YgPT09ICdzdHJpbmcnIHx8IHR5cGVPZiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVUaWxlZ3JpZCA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVncmlkKHRpbGVncmlkKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIG9iai5leHRlbnQgPSB0aWxlZ3JpZC5nZXRFeHRlbnQoKTtcbiAgICBvYmoubWluWm9vbSA9IHRpbGVncmlkLmdldE1pblpvb20oKTtcbiAgICBvYmoub3JpZ2luID0gdGlsZWdyaWQuZ2V0T3JpZ2luKDApO1xuICAgIG9iai5yZXNvbHV0aW9ucyA9IHRpbGVncmlkLmdldFJlc29sdXRpb25zKCk7XG4gICAgb2JqLnRpbGVTaXplID0gdGlsZWdyaWQuZ2V0VGlsZVNpemUodGlsZWdyaWQuZ2V0TWluWm9vbSgpKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlZ3JpZCA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplVGlsZWdyaWQoc2VyaWFsaXphdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICByZXR1cm4gbmV3IE9sVGlsZWdyaWRUaWxlR3JpZChvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplVGlsZWdyaWRXTVRTID0gZnVuY3Rpb24gc2VyaWFsaXplVGlsZWdyaWRXTVRTKHRpbGVncmlkKSB7XG4gICAgaWYgKCF0aWxlZ3JpZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIHJlc29sdXRpb25zID0gdGlsZWdyaWQuZ2V0UmVzb2x1dGlvbnMoKTtcbiAgICBvYmouZXh0ZW50ID0gdGlsZWdyaWQuZ2V0RXh0ZW50KCk7XG4gICAgb2JqLm1pblpvb20gPSB0aWxlZ3JpZC5nZXRNaW5ab29tKCk7XG4gICAgb2JqLm1hdHJpeElkcyA9IHRpbGVncmlkLmdldE1hdHJpeElkcygpO1xuICAgIG9iai5yZXNvbHV0aW9ucyA9IHJlc29sdXRpb25zO1xuICAgIG9iai5vcmlnaW5zID0gW107XG5cbiAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHJlc29sdXRpb25zLmxlbmd0aDsgKyt6KSB7XG4gICAgICBvYmoub3JpZ2lucy5wdXNoKHRpbGVncmlkLmdldE9yaWdpbih6KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZWdyaWRXTVRTID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMoc2VyaWFsaXphdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICByZXR1cm4gbmV3IE9sVGlsZWdyaWRXTVRTKG9wdGlvbnMpO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVTb3VyY2VUaWxlV01TID0gZnVuY3Rpb24gc2VyaWFsaXplU291cmNlVGlsZVdNUyhzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGhpcy5jcmVhdGVCYXNlT2JqZWN0Xyhzb3VyY2UpO1xuICAgIG9iai5wYXJhbXMgPSBzb3VyY2UuZ2V0UGFyYW1zKCk7XG4gICAgb2JqLnVybHMgPSBzb3VyY2UuZ2V0VXJscygpO1xuICAgIG9iai50aWxlR3JpZCA9IHRoaXMuc2VyaWFsaXplVGlsZWdyaWQoc291cmNlLmdldFRpbGVHcmlkKCkpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gc291cmNlLmdldFByb2plY3Rpb24oKTtcblxuICAgIGlmIChwcm9qZWN0aW9uKSB7XG4gICAgICBvYmoucHJvamVjdGlvbiA9IG9sUHJvai5nZXQoc291cmNlLmdldFByb2plY3Rpb24oKSkuZ2V0Q29kZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICBvcHRpb25zLnRpbGVMb2FkRnVuY3Rpb24gPSB0aWxlTG9hZEZ1bmN0aW9uO1xuXG4gICAgaWYgKG9wdGlvbnMudGlsZUdyaWQpIHtcbiAgICAgIG9wdGlvbnMudGlsZUdyaWQgPSB0aGlzLmRlc2VyaWFsaXplVGlsZWdyaWQob3B0aW9ucy50aWxlR3JpZCk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5ndXR0ZXIgPSB0aGlzLmd1dHRlcl87XG4gICAgcmV0dXJuIG5ldyBPbFNvdXJjZVRpbGVXTVMob3B0aW9ucyk7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVNvdXJjZVdNVFMgPSBmdW5jdGlvbiBzZXJpYWxpemVTb3VyY2VXTVRTKHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKHNvdXJjZSk7XG4gICAgb2JqLmRpbWVuc2lvbnMgPSBzb3VyY2UuZ2V0RGltZW5zaW9ucygpO1xuICAgIG9iai5mb3JtYXQgPSBzb3VyY2UuZ2V0Rm9ybWF0KCk7XG4gICAgb2JqLnVybHMgPSBzb3VyY2UuZ2V0VXJscygpO1xuICAgIG9iai52ZXJzaW9uID0gc291cmNlLmdldFZlcnNpb24oKTtcbiAgICBvYmoubGF5ZXIgPSBzb3VyY2UuZ2V0TGF5ZXIoKTtcbiAgICBvYmouc3R5bGUgPSBzb3VyY2UuZ2V0U3R5bGUoKTtcbiAgICBvYmoubWF0cml4U2V0ID0gc291cmNlLmdldE1hdHJpeFNldCgpO1xuICAgIHZhciB0aWxlR3JpZFdNVFMgPSBzb3VyY2UuZ2V0VGlsZUdyaWQoKTtcbiAgICBvYmoudGlsZUdyaWQgPSB0aGlzLnNlcmlhbGl6ZVRpbGVncmlkV01UUyh0aWxlR3JpZFdNVFMpO1xuICAgIG9iai5yZXF1ZXN0RW5jb2RpbmcgPSBzb3VyY2UuZ2V0UmVxdWVzdEVuY29kaW5nKCk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBzb3VyY2UuZ2V0UHJvamVjdGlvbigpO1xuXG4gICAgaWYgKHByb2plY3Rpb24pIHtcbiAgICAgIG9iai5wcm9qZWN0aW9uID0gb2xQcm9qLmdldChzb3VyY2UuZ2V0UHJvamVjdGlvbigpKS5nZXRDb2RlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplU291cmNlV01UUyA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplU291cmNlV01UUyhzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIG9wdGlvbnMudGlsZUxvYWRGdW5jdGlvbiA9IHRpbGVMb2FkRnVuY3Rpb247XG5cbiAgICBpZiAob3B0aW9ucy50aWxlR3JpZCkge1xuICAgICAgb3B0aW9ucy50aWxlR3JpZCA9IHRoaXMuZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMob3B0aW9ucy50aWxlR3JpZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPbFNvdXJjZVdNVFMob3B0aW9ucyk7XG4gIH07XG5cbiAgX3Byb3RvLm1ha2VJbmZpbml0eVNlcmlhbGl6YWJsZV8gPSBmdW5jdGlvbiBtYWtlSW5maW5pdHlTZXJpYWxpemFibGVfKG51bWJlcikge1xuICAgIGlmIChudW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gMTAwMDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVUaWxlTGF5ZXIgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlTGF5ZXIobGF5ZXIsIHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKGxheWVyKTtcbiAgICBvYmoub3BhY2l0eSA9IGxheWVyLmdldE9wYWNpdHkoKTtcbiAgICBvYmoudmlzaWJsZSA9IGxheWVyLmdldFZpc2libGUoKTtcbiAgICBvYmoubWluUmVzb2x1dGlvbiA9IGxheWVyLmdldE1pblJlc29sdXRpb24oKTtcbiAgICBvYmoubWF4UmVzb2x1dGlvbiA9IHRoaXMubWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyhsYXllci5nZXRNYXhSZXNvbHV0aW9uKCkpO1xuICAgIG9iai56SW5kZXggPSBsYXllci5nZXRaSW5kZXgoKTtcbiAgICBzb3VyY2UgPSBzb3VyY2UgfHwgbGF5ZXIuZ2V0U291cmNlKCk7XG5cbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgT2xTb3VyY2VUaWxlV01TKSB7XG4gICAgICBvYmouc291cmNlID0gdGhpcy5zZXJpYWxpemVTb3VyY2VUaWxlV01TKHNvdXJjZSk7XG4gICAgICBvYmouc291cmNlVHlwZSA9ICd0aWxlV01TJztcbiAgICB9IGVsc2UgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE9sU291cmNlV01UUykge1xuICAgICAgb2JqLnNvdXJjZSA9IHRoaXMuc2VyaWFsaXplU291cmNlV01UUyhzb3VyY2UpO1xuICAgICAgb2JqLnNvdXJjZVR5cGUgPSAnV01UUyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZUxheWVyID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlTGF5ZXIoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICB2YXIgc291cmNlVHlwZSA9IG9wdGlvbnMuc291cmNlVHlwZTtcblxuICAgIGlmIChzb3VyY2VUeXBlID09PSAndGlsZVdNUycpIHtcbiAgICAgIG9wdGlvbnMuc291cmNlID0gdGhpcy5kZXNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMob3B0aW9ucy5zb3VyY2UsIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoc291cmNlVHlwZSA9PT0gJ1dNVFMnKSB7XG4gICAgICBvcHRpb25zLnNvdXJjZSA9IHRoaXMuZGVzZXJpYWxpemVTb3VyY2VXTVRTKG9wdGlvbnMuc291cmNlLCB0aWxlTG9hZEZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9sTGF5ZXJUaWxlKG9wdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiBTZXJEZXM7XG59KCk7XG5cbnZhciBleHBvcnRzID0gU2VyRGVzO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIFNlcnZpY2VNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICBTZXJ2aWNlTWFuYWdlci4kaW5qZWN0ID0gW1wiJGluamVjdG9yXCJdO1xuXG4gIGZ1bmN0aW9uIFNlcnZpY2VNYW5hZ2VyKCRpbmplY3Rvcikge1xuICAgIHRoaXMuJGluamVjdG9yXyA9ICRpbmplY3RvcjtcbiAgICB0aGlzLnNhdmVTZXJ2aWNlXyA9IG51bGw7XG4gICAgdGhpcy5yZXN0b3JlU2VydmljZV8gPSBudWxsO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFNlcnZpY2VNYW5hZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0T2ZmbGluZVNlcnZpY2VfID0gZnVuY3Rpb24gZ2V0T2ZmbGluZVNlcnZpY2VfKHNlcnZpY2VMaWtlLCBtZXRob2QpIHtcbiAgICBpZiAodHlwZW9mIHNlcnZpY2VMaWtlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKCF0aGlzLiRpbmplY3Rvcl8uaGFzKHNlcnZpY2VMaWtlKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIG9mZmxpbmUgXCIgKyBtZXRob2QgKyBcIiBzZXJ2aWNlIGNvdWxkIG5vdCBiZSBmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VydmljZSA9IHRoaXMuJGluamVjdG9yXy5nZXQoc2VydmljZUxpa2UpO1xuXG4gICAgICBpZiAoIXNlcnZpY2VbbWV0aG9kXSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiVGhlIG9mZmxpbmUgc2VydmljZSBcIiArIHNlcnZpY2VMaWtlICsgXCIgZG9lcyBub3QgaGF2ZSBhIFwiICsgbWV0aG9kICsgXCIgbWV0aG9kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cblxuICAgIGlmICghc2VydmljZUxpa2VbbWV0aG9kXSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBwcm92aWRlZCBvZmZsaW5lIHNlcnZpY2UgZG9lcyBub3QgaGF2ZSBhIFwiICsgbWV0aG9kICsgXCIgbWV0aG9kXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBzZXJ2aWNlTGlrZTtcbiAgfTtcblxuICBfcHJvdG8uc2V0U2F2ZVNlcnZpY2UgPSBmdW5jdGlvbiBzZXRTYXZlU2VydmljZShzYXZlTGlrZVNlcnZpY2UpIHtcbiAgICB0aGlzLnNhdmVTZXJ2aWNlXyA9IHRoaXMuZ2V0T2ZmbGluZVNlcnZpY2VfKHNhdmVMaWtlU2VydmljZSwgJ3NhdmUnKTtcbiAgfTtcblxuICBfcHJvdG8uc2V0UmVzdG9yZVNlcnZpY2UgPSBmdW5jdGlvbiBzZXRSZXN0b3JlU2VydmljZShyZXN0b3JlTGlrZVNlcnZpY2UpIHtcbiAgICB0aGlzLnJlc3RvcmVTZXJ2aWNlXyA9IHRoaXMuZ2V0T2ZmbGluZVNlcnZpY2VfKHJlc3RvcmVMaWtlU2VydmljZSwgJ3Jlc3RvcmUnKTtcbiAgfTtcblxuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICghdGhpcy5zYXZlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSBzYXZlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2F2ZVNlcnZpY2VfLmNhbmNlbCgpO1xuICB9O1xuXG4gIF9wcm90by5zYXZlID0gZnVuY3Rpb24gc2F2ZShleHRlbnQsIG1hcCkge1xuICAgIGlmICghdGhpcy5zYXZlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSBzYXZlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2F2ZVNlcnZpY2VfLnNhdmUoZXh0ZW50LCBtYXApO1xuICB9O1xuXG4gIF9wcm90by5yZXN0b3JlID0gZnVuY3Rpb24gcmVzdG9yZShtYXApIHtcbiAgICBpZiAoIXRoaXMucmVzdG9yZVNlcnZpY2VfKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1lvdSBtdXN0IHJlZ2lzdGVyIGEgcmVzdG9yZVNlcnZpY2UgZmlyc3QnKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3RvcmVTZXJ2aWNlXy5yZXN0b3JlKG1hcCk7XG4gIH07XG5cbiAgcmV0dXJuIFNlcnZpY2VNYW5hZ2VyO1xufSgpO1xuXG5TZXJ2aWNlTWFuYWdlci5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcicsIFtdKTtcblNlcnZpY2VNYW5hZ2VyLm1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyJywgU2VydmljZU1hbmFnZXIpO1xuZXhwb3J0IGRlZmF1bHQgU2VydmljZU1hbmFnZXI7IiwiZnVuY3Rpb24gYmxvYlRvRGF0YVVybChibG9iKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICB9O1xuXG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gIH0pO1xufVxuXG52YXIgVGlsZURvd25sb2FkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRpbGVEb3dubG9hZGVyKHRpbGVzLCBjYWxsYmFja3MsIHdvcmtlcnMpIHtcbiAgICB0aGlzLm1heE51bWJlck9mV29ya2Vyc18gPSB3b3JrZXJzO1xuICAgIHRoaXMud2FzU3RhcnRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLnRpbGVzXyA9IHRpbGVzO1xuICAgIHRoaXMuY2FsbGJhY2tzXyA9IGNhbGxiYWNrcztcbiAgICB0aGlzLmFsbENvdW50XyA9IDA7XG4gICAgdGhpcy5va0NvdW50XyA9IDA7XG4gICAgdGhpcy5rb0NvdW50XyA9IDA7XG4gICAgdGhpcy5yZXF1ZXN0ZWRDb3VudF8gPSAwO1xuICAgIHRoaXMucmVzb2x2ZVByb21pc2VfID0gbnVsbDtcbiAgICB0aGlzLnByb21pc2VfID0gbnVsbDtcbiAgICB0aGlzLnRpbGVJbmRleF8gPSAwO1xuICAgIHRoaXMuY2FuY2VsXyA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFRpbGVEb3dubG9hZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRoaXMuY2FuY2VsXyA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmRvd25sb2FkID0gZnVuY3Rpb24gZG93bmxvYWQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgICB9XG5cbiAgICB0aGlzLnByb21pc2VfID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgX3RoaXMucmVzb2x2ZVByb21pc2VfID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLnRpbGVzXyk7XG5cbiAgICBpZiAodGhpcy50aWxlc18ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRFcnJvcigxKTtcblxuICAgICAgaWYgKHRoaXMucmVzb2x2ZVByb21pc2VfKSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZVByb21pc2VfKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXhOdW1iZXJPZldvcmtlcnNfOyArK2kpIHtcbiAgICAgICAgdGhpcy5kb3dubG9hZFRpbGVfKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZV87XG4gIH07XG5cbiAgX3Byb3RvLmRvd25sb2FkVGlsZV8gPSBmdW5jdGlvbiBkb3dubG9hZFRpbGVfKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuY2FuY2VsXyB8fCB0aGlzLnRpbGVJbmRleF8gPj0gdGhpcy50aWxlc18ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRpbGUgPSB0aGlzLnRpbGVzX1t0aGlzLnRpbGVJbmRleF8rK107XG4gICAgdmFyIHRpbGVVcmwgPSB0aWxlLnVybDtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHRpbGVVcmwsIHRydWUpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG5cbiAgICB2YXIgb25UaWxlRG93bmxvYWRlZCA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkZWQoKSB7XG4gICAgICBpZiAoX3RoaXMyLmFsbENvdW50XyA9PT0gX3RoaXMyLnRpbGVzXy5sZW5ndGggJiYgX3RoaXMyLnJlc29sdmVQcm9taXNlXykge1xuICAgICAgICBfdGhpczIucmVzb2x2ZVByb21pc2VfKCk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMi5kb3dubG9hZFRpbGVfKCk7XG4gICAgfTtcblxuICAgIHZhciBlcnJvckNhbGxiYWNrID0gZnVuY3Rpb24gZXJyb3JDYWxsYmFjayhfKSB7XG4gICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICArK190aGlzMi5rb0NvdW50XztcbiAgICAgIHZhciBwcm9ncmVzcyA9IF90aGlzMi5hbGxDb3VudF8gLyBfdGhpczIudGlsZXNfLmxlbmd0aDtcblxuICAgICAgX3RoaXMyLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRFcnJvcihwcm9ncmVzcykudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICB9O1xuXG4gICAgdmFyIG9ubG9hZENhbGxiYWNrID0gZnVuY3Rpb24gb25sb2FkQ2FsbGJhY2soZSkge1xuICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlO1xuXG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc2l6ZSAhPT0gMCkge1xuICAgICAgICBibG9iVG9EYXRhVXJsKHJlc3BvbnNlKS50aGVuKGZ1bmN0aW9uIChkYXRhVXJsKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5jYW5jZWxfKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgKytfdGhpczIuYWxsQ291bnRfO1xuICAgICAgICAgICsrX3RoaXMyLm9rQ291bnRfO1xuICAgICAgICAgIHRpbGUucmVzcG9uc2UgPSBkYXRhVXJsO1xuICAgICAgICAgIHZhciBwcm9ncmVzcyA9IF90aGlzMi5hbGxDb3VudF8gLyBfdGhpczIudGlsZXNfLmxlbmd0aDtcblxuICAgICAgICAgIF90aGlzMi5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkU3VjY2Vzcyhwcm9ncmVzcywgdGlsZSkudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVycm9yQ2FsbGJhY2soZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKF90aGlzMi5jYW5jZWxfKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgKytfdGhpczIuYWxsQ291bnRfO1xuICAgICAgICArK190aGlzMi5va0NvdW50XztcblxuICAgICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZFN1Y2Nlc3MoX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoLCB0aWxlKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub25sb2FkID0gb25sb2FkQ2FsbGJhY2s7XG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5vbmFib3J0ID0gZXJyb3JDYWxsYmFjaztcbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JDYWxsYmFjaztcbiAgICB4aHIuc2VuZCgpO1xuICAgICsrdGhpcy5yZXF1ZXN0ZWRDb3VudF87XG4gIH07XG5cbiAgcmV0dXJuIFRpbGVEb3dubG9hZGVyO1xufSgpO1xuXG5leHBvcnQgeyBUaWxlRG93bmxvYWRlciBhcyBkZWZhdWx0IH07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm1haW4tYnV0dG9uXCI+XFxuICA8c3BhbiBuZy1pZj1cIiEkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgPGRpdiBjbGFzcz1cIm5vLWRhdGFcIiBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oKVwiPjwvZGl2PlxcbiAgPC9zcGFuPlxcbiAgPHNwYW4gbmctaWY9XCIkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgPGRpdiBjbGFzcz1cIndpdGgtZGF0YVwiIG5nLWNsaWNrPVwiJGN0cmwuc2hvd01lbnUoKVwiPjwvZGl2PlxcbiAgPC9zcGFuPlxcbjwvZGl2PlxcblxcbjxkaXYgbmctaWY9XCIkY3RybC5zZWxlY3RpbmdFeHRlbnQgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiIGNsYXNzPVwidmFsaWRhdGUtZXh0ZW50IGJ0biBidG4tcHJpbWFyeVwiPlxcbiAgPGRpdiBuZy1pZj1cIiEkY3RybC5kb3dubG9hZGluZ1wiIG5nLWNsaWNrPVwiJGN0cmwuY29tcHV0ZVNpemVBbmREaXNwbGF5QWxlcnRMb2FkRGF0YSgpXCIgdHJhbnNsYXRlPlNhdmUgbWFwPC9kaXY+XFxuICA8ZGl2IG5nLWlmPVwiJGN0cmwuZG93bmxvYWRpbmdcIiBuZy1jbGljaz1cIiRjdHJsLmFza0Fib3J0RG93bmxvYWQoKVwiIHRyYW5zbGF0ZT5BYm9ydDwvZGl2PlxcbjwvZGl2PlxcblxcblxcbjxkaXYgbmctaWY9XCIkY3RybC5kb3dubG9hZGluZ1wiIGNsYXNzPVwiaW4tcHJvZ3Jlc3NcIj5cXG4gIDxkaXY+e3skY3RybC5wcm9ncmVzc1BlcmNlbnRzfX0lPC9kaXY+XFxuPC9kaXY+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5tZW51RGlzcGxheWVkXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cInt7XFwnQ2xvc2VcXCcgfCB0cmFuc2xhdGV9fVwiPlxcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5PZmZsaW5lIG1hcDwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgIDxkaXYgbmctaWY9XCIkY3RybC5oYXNEYXRhKClcIj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImV4dGVudC16b29tIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1pZj1cIiEkY3RybC5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmFjdGl2YXRlT2ZmbGluZU1vZGUoKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+QWN0aXZhdGUgb2ZmbGluZSBtb2RlXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJleHRlbnQtem9vbSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctaWY9XCIkY3RybC5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKSAmJiAhJGN0cmwubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkRlYWN0aXZhdGUgb2ZmbGluZSBtb2RlXFxuICAgICAgPC9idXR0b24+XFxuXFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJleHRlbnQtc2hvdyBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctaWY9XCIkY3RybC5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZUV4dGVudFZpc2liaWxpdHkoKVwiPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XCIkY3RybC5pc0V4dGVudFZpc2libGUoKVwiIHRyYW5zbGF0ZT5IaWRlIGV4dGVudDwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiISRjdHJsLmlzRXh0ZW50VmlzaWJsZSgpXCIgdHJhbnNsYXRlID5TaG93IGV4dGVudDwvc3Bhbj5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctaWY9XCIhJGN0cmwubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGlzcGxheUFsZXJ0RGVzdHJveURhdGEgPSB0cnVlXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5EZWxldGUgZGF0YVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBuZy1pZj1cIiEkY3RybC5oYXNEYXRhKCkgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmV3LWRhdGEgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbigpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5TYXZlIG5ldyBtYXBcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnRMb2FkRGF0YVwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5XYXJuaW5nPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgICA8cCB0cmFuc2xhdGU+fnt7JGN0cmwuZXN0aW1hdGVkTG9hZERhdGFTaXplfX1NQiBvZiBtYXBzIHdpbGwgYmUgZG93bmxvYWRlZCAodW50aWwgc2NhbGUgMToyNVxcJzAwMCkgLSBEb25cXCd0IGxvY2sgeW91ciBkZXZpY2Ugb3IgbmF2aWdhdGUgYXdheSBmcm9tIHRoaXMgc2l0ZSBkdXJpbmcgdGhlIGRvd25sb2FkIHByb2Nlc3MuIERlYWN0aXZhdGUgXCJwcml2YXRlXCIgbW9kZSBvZiB5b3VyIGJyb3dzZXIuPC9wPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwudmFsaWRhdGVFeHRlbnQoKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+T2tcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkNhbmNlbFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0Tm9MYXllclwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5XYXJuaW5nPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgICA8cCB0cmFuc2xhdGU+Tm8gbWFwcyBzZWxlY3RlZCBmb3Igc2F2aW5nLjwvcD5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnREZXN0cm95RGF0YVwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5XYXJuaW5nPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgICA8cCB0cmFuc2xhdGU+RG8geW91IHJlYWxseSB3YW50IHRvIHJlbW92ZSB5b3VyIGRhdGEgPzwvcD5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRlbGV0ZURhdGEoKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+T2tcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkNhbmNlbFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0QWJvcnREb3dubG9hZFwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiIHRyYW5zbGF0ZT5XYXJuaW5nPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgICA8cCB0cmFuc2xhdGU+RG8geW91IHJlYWxseSB3YW50IHRvIHJlbW92ZSB5b3VyIGRhdGEgPzwvcD5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmFib3J0RG93bmxvYWQoKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+T2tcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRlbGV0ZSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5mb2xsb3dEb3dubG9hZFByb2dyZXNzaW9uXygpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5DYW5jZWxcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1nci5qcyc7XG5pbXBvcnQgbmdlb01lc3NhZ2VNb2RhbENvbXBvbmVudCBmcm9tICduZ2VvL21lc3NhZ2UvbW9kYWxDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgZXh0ZW50VG9SZWN0YW5nbGUgfSBmcm9tICduZ2VvL3V0aWxzLmpzJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbi5qcyc7XG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZS5qcyc7XG5pbXBvcnQgRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlLmpzJztcbmltcG9ydCBQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbi5qcyc7XG5pbXBvcnQgb2xHZW9tR2VvbWV0cnlMYXlvdXQgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeUxheW91dC5qcyc7XG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lJywgW25nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50Lm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZW1wbGF0ZVVybCcsIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSBhdHRyc1snbmdlb09mZmxpbmVUZW1wbGF0ZXVybCddO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vb2ZmbGluZS9jb21wb25lbnQuaHRtbCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5odG1sJywgcmVxdWlyZSgnLi9jb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbm5nZW9PZmZsaW5lVGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwiJGF0dHJzXCIsIFwibmdlb09mZmxpbmVUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gbmdlb09mZmxpbmVUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMpO1xufVxuXG52YXIgY29tcG9uZW50ID0ge1xuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9PZmZsaW5lTWFwJyxcbiAgICAnZXh0ZW50U2l6ZSc6ICc8P25nZW9PZmZsaW5lRXh0ZW50c2l6ZScsXG4gICAgJ21hc2tNYXJnaW4nOiAnPD9uZ2VvT2ZmbGluZU1hc2tNYXJnaW4nLFxuICAgICdtaW5ab29tJzogJzw/bmdlb09mZmxpbmVNaW5ab29tJyxcbiAgICAnbWF4Wm9vbSc6ICc8P25nZW9PZmZsaW5lTWF4Wm9vbSdcbiAgfSxcbiAgY29udHJvbGxlcjogJ25nZW9PZmZsaW5lQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlVXJsOiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsXG59O1xubW9kdWxlLmNvbXBvbmVudCgnbmdlb09mZmxpbmUnLCBjb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJcIiwgXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIiwgXCJuZ2VvT2ZmbGluZU1vZGVcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIsIG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiwgbmdlb09mZmxpbmVNb2RlLCBuZ2VvTmV0d29ya1N0YXR1cykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8gPSBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyO1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLm9mZmxpbmVNb2RlID0gbmdlb09mZmxpbmVNb2RlO1xuICAgIHRoaXMubmV0d29ya1N0YXR1cyA9IG5nZW9OZXR3b3JrU3RhdHVzO1xuICAgIHRoaXMubWFwO1xuICAgIHRoaXMuZXh0ZW50U2l6ZSA9IDA7XG4gICAgdGhpcy5mZWF0dXJlc092ZXJsYXlfID0gbmdlb0ZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gICAgdGhpcy5mZWF0dXJlc092ZXJsYXlfLnNldEZlYXR1cmVzKHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fKTtcbiAgICB0aGlzLnBvc3Rjb21wb3NlTGlzdGVuZXJfID0gdGhpcy5jcmVhdGVNYXNrUG9zdGNvbXBvc2VfKCk7XG4gICAgdGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5XyA9IG51bGw7XG4gICAgdGhpcy5kYXRhUG9seWdvbl8gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW5nRXh0ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IDA7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IGZhbHNlO1xuICAgIHRoaXMubWFza01hcmdpbiA9IDA7XG4gICAgdGhpcy5taW5ab29tID0gMDtcbiAgICB0aGlzLm1heFpvb20gPSAwO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tID0gMDtcbiAgICB0aGlzLm9yaWdpbmFsTWF4Wm9vbSA9IDA7XG4gICAgdGhpcy5lc3RpbWF0ZWRMb2FkRGF0YVNpemUgPSAwO1xuXG4gICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIHByb2dyZXNzID0gZXZlbnQuZGV0YWlsWydwcm9ncmVzcyddO1xuICAgICAgX3RoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MgKiAxMDApO1xuXG4gICAgICBpZiAocHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgX3RoaXMuZmluaXNoRG93bmxvYWRfKCk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7fSwgMCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDb250cm9sbGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uJG9uSW5pdCA9IGZ1bmN0aW9uICRvbkluaXQoKSB7XG4gICAgdGhpcy5vZmZsaW5lTW9kZS5yZWdpc3RlckNvbXBvbmVudCh0aGlzKTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8ub24oJ3Byb2dyZXNzJywgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyk7XG4gICAgdGhpcy5tYXNrTWFyZ2luID0gdGhpcy5tYXNrTWFyZ2luIHx8IDEwMDtcbiAgICB0aGlzLm1pblpvb20gPSB0aGlzLm1pblpvb20gfHwgMTA7XG4gICAgdGhpcy5tYXhab29tID0gdGhpcy5tYXhab29tIHx8IDE1O1xuICB9O1xuXG4gIF9wcm90by4kb25EZXN0cm95ID0gZnVuY3Rpb24gJG9uRGVzdHJveSgpIHtcbiAgICB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8udW4oJ3Byb2dyZXNzJywgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyk7XG4gIH07XG5cbiAgX3Byb3RvLmhhc0RhdGEgPSBmdW5jdGlvbiBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uaGFzT2ZmbGluZURhdGEoKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcHV0ZVNpemVBbmREaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEoKSB7XG4gICAgdGhpcy5lc3RpbWF0ZWRMb2FkRGF0YVNpemUgPSB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uZXN0aW1hdGVMb2FkRGF0YVNpemUodGhpcy5tYXApO1xuXG4gICAgaWYgKHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplID4gMCkge1xuICAgICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uID0gZnVuY3Rpb24gdG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbihmaW5pc2hlZCkge1xuICAgIHRoaXMubWVudURpc3BsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0aW5nRXh0ZW50ID0gIXRoaXMuc2VsZWN0aW5nRXh0ZW50O1xuXG4gICAgaWYgKHRoaXMucG9zdENvbXBvc2VMaXN0ZW5lcktleV8pIHtcbiAgICAgIHVuQnlLZXkodGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5Xyk7XG4gICAgICB0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfID0gbnVsbDtcbiAgICAgIHRoaXMucmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGluZ0V4dGVudCAmJiAhdGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5Xykge1xuICAgICAgdGhpcy5hZGRab29tQ29uc3RyYWludHNfKCk7XG4gICAgICB0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfID0gdGhpcy5tYXAub24oJ3Bvc3Rjb21wb3NlJywgdGhpcy5wb3N0Y29tcG9zZUxpc3RlbmVyXyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXAucmVuZGVyKCk7XG4gIH07XG5cbiAgX3Byb3RvLnZhbGlkYXRlRXh0ZW50ID0gZnVuY3Rpb24gdmFsaWRhdGVFeHRlbnQoKSB7XG4gICAgdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gMDtcbiAgICB2YXIgZXh0ZW50ID0gdGhpcy5nZXREb3dsb2FkRXh0ZW50XygpO1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8uc2F2ZShleHRlbnQsIHRoaXMubWFwKTtcbiAgfTtcblxuICBfcHJvdG8uZmluaXNoRG93bmxvYWRfID0gZnVuY3Rpb24gZmluaXNoRG93bmxvYWRfKCkge1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24odHJ1ZSk7XG4gIH07XG5cbiAgX3Byb3RvLmFza0Fib3J0RG93bmxvYWQgPSBmdW5jdGlvbiBhc2tBYm9ydERvd25sb2FkKCkge1xuICAgIHRoaXMuZGlzcGxheUFsZXJ0QWJvcnREb3dubG9hZCA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmFib3J0RG93bmxvYWQgPSBmdW5jdGlvbiBhYm9ydERvd25sb2FkKCkge1xuICAgIHRoaXMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLmNhbmNlbCgpO1xuICAgIHRoaXMuZGVsZXRlRGF0YSgpO1xuICB9O1xuXG4gIF9wcm90by5zaG93TWVudSA9IGZ1bmN0aW9uIHNob3dNZW51KCkge1xuICAgIHRoaXMubWVudURpc3BsYXllZCA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBhY3RpdmF0ZU9mZmxpbmVNb2RlKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5yZXN0b3JlKHRoaXMubWFwKS50aGVuKGZ1bmN0aW9uIChleHRlbnQpIHtcbiAgICAgIF90aGlzMi5kYXRhUG9seWdvbl8gPSBfdGhpczIuY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCk7XG5cbiAgICAgIHZhciBzaXplID0gX3RoaXMyLm1hcC5nZXRTaXplKCk7XG5cbiAgICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyLm1hcC5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgICBzaXplOiBzaXplXG4gICAgICB9KTtcblxuICAgICAgX3RoaXMyLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcblxuICAgICAgX3RoaXMyLmRpc3BsYXlFeHRlbnRfKCk7XG5cbiAgICAgIF90aGlzMi5vZmZsaW5lTW9kZS5lbmFibGUoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZGVhY3RpdmF0ZU9mZmxpbmVNb2RlID0gZnVuY3Rpb24gZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcblxuICBfcHJvdG8udG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSA9IGZ1bmN0aW9uIHRvZ2dsZUV4dGVudFZpc2liaWxpdHkoKSB7XG4gICAgaWYgKHRoaXMuaXNFeHRlbnRWaXNpYmxlKCkpIHtcbiAgICAgIHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheUV4dGVudF8oKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmlzRXh0ZW50VmlzaWJsZSA9IGZ1bmN0aW9uIGlzRXh0ZW50VmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uZ2V0TGVuZ3RoKCkgPiAwO1xuICB9O1xuXG4gIF9wcm90by5kZWxldGVEYXRhID0gZnVuY3Rpb24gZGVsZXRlRGF0YSgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fLmNsZWFyKCk7XG4gICAgdGhpcy5kYXRhUG9seWdvbl8gPSBudWxsO1xuXG4gICAgaWYgKHRoaXMubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpKSB7XG4gICAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcmVsb2FkSWZJbk9mZmxpbmVNb2RlID0gZnVuY3Rpb24gcmVsb2FkSWZJbk9mZmxpbmVNb2RlKCkge1xuICAgICAgaWYgKF90aGlzMy5vZmZsaW5lTW9kZS5pc0VuYWJsZWQoKSkge1xuICAgICAgICBfdGhpczMuZGVhY3RpdmF0ZU9mZmxpbmVNb2RlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5jbGVhcigpLnRoZW4ocmVsb2FkSWZJbk9mZmxpbmVNb2RlKTtcbiAgfTtcblxuICBfcHJvdG8uZGlzcGxheUV4dGVudF8gPSBmdW5jdGlvbiBkaXNwbGF5RXh0ZW50XygpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHRlbnRWaXNpYmxlKCkgJiYgdGhpcy5kYXRhUG9seWdvbl8pIHtcbiAgICAgIHZhciBmZWF0dXJlID0gbmV3IEZlYXR1cmUodGhpcy5kYXRhUG9seWdvbl8pO1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8ucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmFkZFpvb21Db25zdHJhaW50c18gPSBmdW5jdGlvbiBhZGRab29tQ29uc3RyYWludHNfKCkge1xuICAgIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHZhciB6b29tID0gdmlldy5nZXRab29tKCkgfHwgMDtcbiAgICB0aGlzLm9yaWdpbmFsTWluWm9vbSA9IHZpZXcuZ2V0TWluWm9vbSgpO1xuICAgIHRoaXMub3JpZ2luYWxNYXhab29tID0gdmlldy5nZXRNYXhab29tKCk7XG5cbiAgICBpZiAoem9vbSA8IHRoaXMubWluWm9vbSkge1xuICAgICAgdmlldy5zZXRab29tKHRoaXMubWluWm9vbSk7XG4gICAgfSBlbHNlIGlmICh6b29tID4gdGhpcy5tYXhab29tKSB7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5tYXhab29tKTtcbiAgICB9XG5cbiAgICB2aWV3LnNldE1heFpvb20odGhpcy5tYXhab29tKTtcbiAgICB2aWV3LnNldE1pblpvb20odGhpcy5taW5ab29tKTtcbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlWm9vbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uIHJlbW92ZVpvb21Db25zdHJhaW50c18oKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdmlldy5zZXRNYXhab29tKHRoaXMub3JpZ2luYWxNYXhab29tKTtcbiAgICB2aWV3LnNldE1pblpvb20odGhpcy5vcmlnaW5hbE1pblpvb20pO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVNYXNrUG9zdGNvbXBvc2VfID0gZnVuY3Rpb24gY3JlYXRlTWFza1Bvc3Rjb21wb3NlXygpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICB2YXIgY29udGV4dCA9IGV2dC5jb250ZXh0O1xuICAgICAgdmFyIGZyYW1lU3RhdGUgPSBldnQuZnJhbWVTdGF0ZTtcblxuICAgICAgaWYgKCFjb250ZXh0IHx8ICFmcmFtZVN0YXRlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250ZXh0IG9yIGZyYW1lU3RhdGUnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc29sdXRpb24gPSBmcmFtZVN0YXRlLnZpZXdTdGF0ZS5yZXNvbHV0aW9uO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSBmcmFtZVN0YXRlLnNpemVbMF0gKiBmcmFtZVN0YXRlLnBpeGVsUmF0aW87XG4gICAgICB2YXIgdmlld3BvcnRIZWlnaHQgPSBmcmFtZVN0YXRlLnNpemVbMV0gKiBmcmFtZVN0YXRlLnBpeGVsUmF0aW87XG4gICAgICB2YXIgZXh0ZW50TGVuZ3RoID0gX3RoaXM0LmV4dGVudFNpemUgPyBfdGhpczQuZXh0ZW50U2l6ZSAvIHJlc29sdXRpb24gKiBERVZJQ0VfUElYRUxfUkFUSU8gOiBNYXRoLm1pbih2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkgLSBfdGhpczQubWFza01hcmdpbiAqIDI7XG4gICAgICB2YXIgZXh0ZW50SGFsZkxlbmd0aCA9IE1hdGguY2VpbChleHRlbnRMZW5ndGggLyAyKTtcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0Lm1vdmVUbygwLCAwKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHZpZXdwb3J0V2lkdGgsIDApO1xuICAgICAgY29udGV4dC5saW5lVG8odmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgY29udGV4dC5saW5lVG8oMCwgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgY29udGV4dC5saW5lVG8oMCwgMCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICB2YXIgZXh0ZW50ID0gX3RoaXM0LmNyZWF0ZUV4dGVudF8oW3ZpZXdwb3J0V2lkdGggLyAyLCB2aWV3cG9ydEhlaWdodCAvIDJdLCBleHRlbnRIYWxmTGVuZ3RoKTtcblxuICAgICAgY29udGV4dC5tb3ZlVG8oZXh0ZW50WzBdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzBdLCBleHRlbnRbM10pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbM10pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzBdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgNSwgMjUsIDAuNSknO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCkge1xuICAgIHZhciBwcm9qRXh0ZW50ID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKS5nZXRFeHRlbnQoKTtcbiAgICByZXR1cm4gbmV3IFBvbHlnb24oW2V4dGVudFRvUmVjdGFuZ2xlKHByb2pFeHRlbnQpLCBleHRlbnRUb1JlY3RhbmdsZShleHRlbnQpXSwgb2xHZW9tR2VvbWV0cnlMYXlvdXQuWFkpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVFeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlRXh0ZW50XyhjZW50ZXIsIGhhbGZMZW5ndGgpIHtcbiAgICB2YXIgbWlueCA9IGNlbnRlclswXSAtIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1pbnkgPSBjZW50ZXJbMV0gLSBoYWxmTGVuZ3RoO1xuICAgIHZhciBtYXh4ID0gY2VudGVyWzBdICsgaGFsZkxlbmd0aDtcbiAgICB2YXIgbWF4eSA9IGNlbnRlclsxXSArIGhhbGZMZW5ndGg7XG4gICAgcmV0dXJuIFttaW54LCBtaW55LCBtYXh4LCBtYXh5XTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RG93bG9hZEV4dGVudF8gPSBmdW5jdGlvbiBnZXREb3dsb2FkRXh0ZW50XygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIHZhciBoYWxmTGVuZ3RoID0gTWF0aC5jZWlsKHRoaXMuZXh0ZW50U2l6ZSB8fCB0aGlzLmdldEV4dGVudFNpemVfKCkpIC8gMjtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVFeHRlbnRfKGNlbnRlciwgaGFsZkxlbmd0aCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEV4dGVudFNpemVfID0gZnVuY3Rpb24gZ2V0RXh0ZW50U2l6ZV8oKSB7XG4gICAgdmFyIG1hcFNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCkgfHwgWzE1MCwgMTUwXTtcbiAgICB2YXIgbWFza1NpemVQaXhlbCA9IERFVklDRV9QSVhFTF9SQVRJTyAqIE1hdGgubWluKG1hcFNpemVbMF0sIG1hcFNpemVbMV0pIC0gdGhpcy5tYXNrTWFyZ2luICogMjtcbiAgICB2YXIgbWFza1NpemVNZXRlciA9IG1hc2tTaXplUGl4ZWwgKiAodGhpcy5tYXAuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKSB8fCAxKSAvIERFVklDRV9QSVhFTF9SQVRJTztcbiAgICByZXR1cm4gbWFza1NpemVNZXRlcjtcbiAgfTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcbm1vZHVsZS5jb250cm9sbGVyKCduZ2VvT2ZmbGluZUNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJpbXBvcnQgbmdlb09mZmxpbmVDb21wb25lbnQgZnJvbSAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzIGZyb20gJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlci5qcyc7XG5pbXBvcnQgZG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvRG93bmxvYWRlci5qcyc7XG5pbXBvcnQgcmVzdG9yZXIgZnJvbSAnbmdlby9vZmZsaW5lL1Jlc3RvcmVyLmpzJztcbmltcG9ydCBtb2RlIGZyb20gJ25nZW8vb2ZmbGluZS9Nb2RlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xudmFyIGV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVNb2R1bGUnLCBbbmdlb09mZmxpbmVDb21wb25lbnQubmFtZSwgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzLm1vZHVsZS5uYW1lLCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLm1vZHVsZS5uYW1lLCBkb3dubG9hZGVyLm1vZHVsZS5uYW1lLCByZXN0b3Jlci5tb2R1bGUubmFtZSwgbW9kZS5tb2R1bGUubmFtZV0pO1xuZXhwb3J0cy52YWx1ZSgnbmdlb09mZmxpbmVHdXR0ZXInLCA5Nik7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBvbExheWVyR3JvdXAgZnJvbSAnb2wvbGF5ZXIvR3JvdXAuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlTGF5ZXIobGF5ZXIsIGFuY2VzdG9ycywgdmlzaXRvcikge1xuICB2YXIgZGVzY2VuZCA9IHZpc2l0b3IobGF5ZXIsIGFuY2VzdG9ycyk7XG5cbiAgaWYgKGRlc2NlbmQgJiYgbGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyR3JvdXApIHtcbiAgICBsYXllci5nZXRMYXllcnMoKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZExheWVyKSB7XG4gICAgICB0cmF2ZXJzZUxheWVyKGNoaWxkTGF5ZXIsIFtdLmNvbmNhdChhbmNlc3RvcnMsIFtsYXllcl0pLCB2aXNpdG9yKTtcbiAgICB9KTtcbiAgfVxufVxudmFyIGV4dHJhY3RvciA9IG5ldyBSZWdFeHAoJ1teL10qLy9bXi9dKy8oLiopJyk7XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVVJMKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IHVybC5tYXRjaChleHRyYWN0b3IpO1xuXG4gIGlmICghbWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IG5vcm1hbGl6ZSB1cmwgJyArIHVybCk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlc1sxXTtcbn0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxSkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9IQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5S0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==