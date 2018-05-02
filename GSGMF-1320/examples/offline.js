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

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1030);

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

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(181);

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
      'plugin': 'localforage',
      'command': command,
      'args': args,
      'id': id
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
Service.module.value('ngeoOfflineTestUrl', '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTmV0d29ya1N0YXR1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9SZXN0b3Jlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9TZXJpYWxpemVyRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcnZpY2VNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1RpbGVzRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvZmZsaW5lXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMwLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuaW1wb3J0ICcuL29mZmxpbmUuY3NzJztcbmltcG9ydCAnLi9jb21tb25fZGVwZW5kZW5jaWVzLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVNb2R1bGUgZnJvbSAnbmdlby9vZmZsaW5lL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVDb25maWd1cmF0aW9uIGZyb20gJ25nZW8vb2ZmbGluZS9Db25maWd1cmF0aW9uLmpzJztcbmltcG9ydCBOZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIE1haW5Db250cm9sbGVyID0gZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIobmdlb0ZlYXR1cmVPdmVybGF5TWdyLCBuZ2VvTmV0d29ya1N0YXR1cywgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcikge1xuICB0aGlzLm9mZmxpbmVFeHRlbnRTaXplID0gMTAwMDA7XG4gIHRoaXMubmdlb05ldHdvcmtTdGF0dXMgPSBuZ2VvTmV0d29ya1N0YXR1cztcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMzUyMzc5LCA1MTcyNzMzXSxcbiAgICAgIHpvb206IDRcbiAgICB9KVxuICB9KTtcbiAgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLmluaXQodGhpcy5tYXApO1xuICBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLnNldFNhdmVTZXJ2aWNlKCdvZmZsaW5lRG93bmxvYWRlcicpO1xuICBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLnNldFJlc3RvcmVTZXJ2aWNlKCduZ2VvT2ZmbGluZVJlc3RvcmVyJyk7XG59O1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCIsIFwibmdlb05ldHdvcmtTdGF0dXNcIiwgXCJuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXCJdO1xuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCIsIFwibmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlclwiXTtcbk1haW5Db250cm9sbGVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9PZmZsaW5lTW9kdWxlLm5hbWUsIE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWVdKTtcbk1haW5Db250cm9sbGVyLm1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZXN0VXJsJywgJy4uLy4uL3NyYy9vZmZsaW5lL2NvbXBvbmVudC5odG1sJyk7XG5uZ2VvT2ZmbGluZU1vZHVsZS5zZXJ2aWNlKCduZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24nLCBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pO1xuTWFpbkNvbnRyb2xsZXIubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRyb2xsZXI7IiwidmFyIEFjdGlvbjtcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyKCkge1xuICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmN1cnJlbnRJZF8gPSAwO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbi5hcHBseSh0aGlzLCBbJ3NldEl0ZW0nXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydnZXRJdGVtJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24oJ2NsZWFyJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydjb25maWcnXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVBY3Rpb24oY29tbWFuZCkge1xuICAgIHZhciBpZCA9ICsrdGhpcy5jdXJyZW50SWRfO1xuXG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICdwbHVnaW4nOiAnbG9jYWxmb3JhZ2UnLFxuICAgICAgJ2NvbW1hbmQnOiBjb21tYW5kLFxuICAgICAgJ2FyZ3MnOiBhcmdzLFxuICAgICAgJ2lkJzogaWRcbiAgICB9O1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHtcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoKSB7fSxcbiAgICAgIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KCkge31cbiAgICB9O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgd2FpdGluZ1Byb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLnNldChpZCwgd2FpdGluZ1Byb21pc2UpO1xuICAgIHRoaXMucG9zdFRvQmFja2VuZChhY3Rpb24pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIF9wcm90by5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIHJlY2VpdmVNZXNzYWdlKGV2ZW50KSB7XG4gICAgdmFyIGFjdGlvbiA9IGV2ZW50WydkYXRhJ107XG4gICAgdmFyIGlkID0gYWN0aW9uWydpZCddO1xuICAgIHZhciBjb21tYW5kID0gYWN0aW9uWydjb21tYW5kJ107XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb25bJ2FyZ3MnXSB8fCBbXTtcbiAgICB2YXIgY29udGV4dCA9IGFjdGlvblsnY29udGV4dCddO1xuICAgIHZhciBtc2cgPSBhY3Rpb25bJ21zZyddO1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHRoaXMud2FpdGluZ1Byb21pc2VzXy5nZXQoaWQpO1xuXG4gICAgaWYgKGNvbW1hbmQgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBhcmdzLCBjb250ZXh0KTtcblxuICAgICAgaWYgKHdhaXRpbmdQcm9taXNlKSB7XG4gICAgICAgIHdhaXRpbmdQcm9taXNlLnJlamVjdChhcmdzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLmRlbGV0ZShpZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAncmVzcG9uc2UnKSB7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZXNvbHZlLmFwcGx5KHdhaXRpbmdQcm9taXNlLCBhcmdzKTtcbiAgICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXy5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgY29tbWFuZCcsIEpTT04uc3RyaW5naWZ5KGFjdGlvbiwgbnVsbCwgJ1xcdCcpKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge307XG5cbiAgcmV0dXJuIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgb2xPYnNlcnZhYmxlIGZyb20gJ29sL09ic2VydmFibGUuanMnO1xuaW1wb3J0IG9sTGF5ZXJMYXllciBmcm9tICdvbC9sYXllci9MYXllci5qcyc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3IuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sTGF5ZXJJbWFnZSBmcm9tICdvbC9sYXllci9JbWFnZS5qcyc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvai5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0SW1hZ2VMb2FkRnVuY3Rpb24gfSBmcm9tICdvbC9zb3VyY2UvSW1hZ2UuanMnO1xuaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TLmpzJztcbmltcG9ydCBvbFNvdXJjZVRpbGVXTVMgZnJvbSAnb2wvc291cmNlL1RpbGVXTVMuanMnO1xuaW1wb3J0IHsgY3JlYXRlRm9yUHJvamVjdGlvbiBhcyBjcmVhdGVUaWxlR3JpZEZvclByb2plY3Rpb24gfSBmcm9tICdvbC90aWxlZ3JpZC5qcyc7XG5pbXBvcnQgU2VyaWFsaXplckRlc2VyaWFsaXplciBmcm9tICduZ2VvL29mZmxpbmUvU2VyaWFsaXplckRlc2VyaWFsaXplci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VJb3NXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUlvc1dyYXBwZXIuanMnO1xuaW1wb3J0IG5nZW9DdXN0b21FdmVudCBmcm9tICduZ2VvL0N1c3RvbUV2ZW50LmpzJztcbmltcG9ydCB7IG5vcm1hbGl6ZVVSTCwgdHJhdmVyc2VMYXllciB9IGZyb20gJ25nZW8vb2ZmbGluZS91dGlscy5qcyc7XG5pbXBvcnQgbG9jYWxmb3JhZ2UgZnJvbSAnbG9jYWxmb3JhZ2Uvc3JjL2xvY2FsZm9yYWdlLmpzJztcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9vbE9ic2VydmFibGUpIHtcbiAgX2RlZmF1bHQuJGluamVjdCA9IFtcIiRyb290U2NvcGVcIiwgXCJuZ2VvQmFja2dyb3VuZExheWVyTWdyXCIsIFwibmdlb09mZmxpbmVHdXR0ZXJcIl07XG5cbiAgX2luaGVyaXRzTG9vc2UoX2RlZmF1bHQsIF9vbE9ic2VydmFibGUpO1xuXG4gIGZ1bmN0aW9uIF9kZWZhdWx0KCRyb290U2NvcGUsIG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3IsIG5nZW9PZmZsaW5lR3V0dGVyKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb2xPYnNlcnZhYmxlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5sb2NhbGZvcmFnZV8gPSBfdGhpcy5jcmVhdGVMb2NhbGZvcmFnZSgpO1xuXG4gICAgX3RoaXMuY29uZmlndXJlTG9jYWxmb3JhZ2UoKTtcblxuICAgIF90aGlzLnJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIF90aGlzLmhhc0RhdGEgPSBmYWxzZTtcblxuICAgIF90aGlzLmluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSgpO1xuXG4gICAgX3RoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xuICAgIF90aGlzLnNlckRlc18gPSBuZXcgU2VyaWFsaXplckRlc2VyaWFsaXplcih7XG4gICAgICBndXR0ZXI6IG5nZW9PZmZsaW5lR3V0dGVyXG4gICAgfSk7XG4gICAgX3RoaXMuZ3V0dGVyXyA9IG5nZW9PZmZsaW5lR3V0dGVyO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBfZGVmYXVsdC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmRpc3BhdGNoUHJvZ3Jlc3NfID0gZnVuY3Rpb24gZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IG5nZW9DdXN0b21FdmVudCgncHJvZ3Jlc3MnLCB7XG4gICAgICAncHJvZ3Jlc3MnOiBwcm9ncmVzc1xuICAgIH0pKTtcbiAgfTtcblxuICBfcHJvdG8uaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gaW5pdGlhbGl6ZUhhc09mZmxpbmVEYXRhKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdGhpcy5nZXRJdGVtKCdvZmZsaW5lX2NvbnRlbnQnKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5zZXRIYXNPZmZsaW5lRGF0YSghIXZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uaGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBoYXNPZmZsaW5lRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNEYXRhO1xuICB9O1xuXG4gIF9wcm90by5zZXRIYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIHNldEhhc09mZmxpbmVEYXRhKHZhbHVlKSB7XG4gICAgdmFyIG5lZWREaWdlc3QgPSB2YWx1ZSAhPT0gdGhpcy5oYXNEYXRhO1xuICAgIHRoaXMuaGFzRGF0YSA9IHZhbHVlO1xuXG4gICAgaWYgKG5lZWREaWdlc3QpIHtcbiAgICAgIHRoaXMucm9vdFNjb3BlXy4kYXBwbHlBc3luYygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8udHJhY2VHZXRTZXRJdGVtID0gZnVuY3Rpb24gdHJhY2VHZXRTZXRJdGVtKG1zZywga2V5LCBwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZUxvY2FsZm9yYWdlID0gZnVuY3Rpb24gY3JlYXRlTG9jYWxmb3JhZ2UoKSB7XG4gICAgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9Y29yZG92YScpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgY29yZG92YSBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUNvcmRvdmFXcmFwcGVyKCk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWFuZHJvaWQnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGFuZHJvaWQgbG9jYWxmb3JhZ2UnKTtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlcigpO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1pb3MnKSkge1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIGlvcyBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUlvc1dyYXBwZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxmb3JhZ2U7XG4gIH07XG5cbiAgX3Byb3RvLmNvbmZpZ3VyZUxvY2FsZm9yYWdlID0gZnVuY3Rpb24gY29uZmlndXJlTG9jYWxmb3JhZ2UoKSB7XG4gICAgdGhpcy5sb2NhbGZvcmFnZV8uY29uZmlnKHtcbiAgICAgICduYW1lJzogJ25nZW9PZmZsaW5lU3RvcmFnZScsXG4gICAgICAndmVyc2lvbic6IDEuMCxcbiAgICAgICdzdG9yZU5hbWUnOiAnb2ZmbGluZVN0b3JhZ2UnXG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGtleSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ2dldEl0ZW0nXShrZXkpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnZ2V0SXRlbScsIGtleSwgcHJvbWlzZSk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiByZW1vdmVJdGVtKGtleSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5sb2NhbGZvcmFnZV9bJ3JlbW92ZUl0ZW0nXShrZXkpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgncmVtb3ZlSXRlbScsIGtleSwgcHJvbWlzZSk7XG4gIH07XG5cbiAgX3Byb3RvLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydzZXRJdGVtJ10oa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdzZXRJdGVtJywga2V5LCBwcm9taXNlKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLnNldEhhc09mZmxpbmVEYXRhKGZhbHNlKTtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMubG9jYWxmb3JhZ2VfWydjbGVhciddKCk7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdjbGVhcicsICcnLCBwcm9taXNlKTtcbiAgfTtcblxuICBfcHJvdG8uZXN0aW1hdGVMb2FkRGF0YVNpemUgPSBmdW5jdGlvbiBlc3RpbWF0ZUxvYWREYXRhU2l6ZShtYXApIHtcbiAgICByZXR1cm4gNTA7XG4gIH07XG5cbiAgX3Byb3RvLmdldExheWVyS2V5ID0gZnVuY3Rpb24gZ2V0TGF5ZXJLZXkobGF5ZXJJdGVtKSB7XG4gICAgcmV0dXJuIGxheWVySXRlbS5sYXllci5nZXQoJ2xhYmVsJyk7XG4gIH07XG5cbiAgX3Byb3RvLm9uVGlsZURvd25sb2FkU3VjY2VzcyA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkU3VjY2Vzcyhwcm9ncmVzcywgdGlsZSkge1xuICAgIHRoaXMuZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpO1xuXG4gICAgaWYgKHRpbGUucmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldEl0ZW0obm9ybWFsaXplVVJMKHRpbGUudXJsKSwgdGlsZS5yZXNwb25zZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIF9wcm90by5vblRpbGVEb3dubG9hZEVycm9yID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRFcnJvcihwcm9ncmVzcykge1xuICAgIHRoaXMuZGlzcGF0Y2hQcm9ncmVzc18ocHJvZ3Jlc3MpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RXh0ZW50Qnlab29tID0gZnVuY3Rpb24gZ2V0RXh0ZW50Qnlab29tKG1hcCwgbGF5ZXIsIGFuY2VzdG9ycywgdXNlckV4dGVudCkge1xuICAgIHZhciBjdXJyZW50Wm9vbSA9IG1hcC5nZXRWaWV3KCkuZ2V0Wm9vbSgpO1xuXG4gICAgaWYgKGN1cnJlbnRab29tID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjdXJyZW50Wm9vbScpO1xuICAgIH1cblxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgWzAsIDEsIDIsIDMsIDRdLmZvckVhY2goZnVuY3Rpb24gKGR6KSB7XG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICB6b29tOiBjdXJyZW50Wm9vbSArIGR6LFxuICAgICAgICBleHRlbnQ6IHVzZXJFeHRlbnRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIF9wcm90by5zb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyA9IGZ1bmN0aW9uIHNvdXJjZUltYWdlV01TVG9UaWxlV01TKHNvdXJjZSwgcHJvamVjdGlvbikge1xuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZUltYWdlV01TICYmIHNvdXJjZS5nZXRVcmwoKSAmJiBzb3VyY2UuZ2V0SW1hZ2VMb2FkRnVuY3Rpb24oKSA9PT0gZGVmYXVsdEltYWdlTG9hZEZ1bmN0aW9uKSB7XG4gICAgICB2YXIgdGlsZUdyaWQgPSBjcmVhdGVUaWxlR3JpZEZvclByb2plY3Rpb24oc291cmNlLmdldFByb2plY3Rpb24oKSB8fCBwcm9qZWN0aW9uLCA0MiwgMjU2KTtcbiAgICAgIHZhciBhdHRyaWJ1dGlvbnMgPSBzb3VyY2UuZ2V0QXR0cmlidXRpb25zKCkgfHwgJyc7XG4gICAgICB2YXIgdXJsID0gc291cmNlLmdldFVybCgpO1xuXG4gICAgICBpZiAoIXVybCB8fCAhYXR0cmlidXRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZXMnKTtcbiAgICAgIH1cblxuICAgICAgc291cmNlID0gbmV3IG9sU291cmNlVGlsZVdNUyh7XG4gICAgICAgIGd1dHRlcjogdGhpcy5ndXR0ZXJfLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdGlsZUdyaWQ6IHRpbGVHcmlkLFxuICAgICAgICBhdHRyaWJ1dGlvbnM6IGF0dHJpYnV0aW9ucyxcbiAgICAgICAgcHJvamVjdGlvbjogc291cmNlLmdldFByb2plY3Rpb24oKSxcbiAgICAgICAgcGFyYW1zOiBzb3VyY2UuZ2V0UGFyYW1zKClcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZUxheWVyTWV0YWRhdGFzID0gZnVuY3Rpb24gY3JlYXRlTGF5ZXJNZXRhZGF0YXMobWFwLCB1c2VyRXh0ZW50KSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgbGF5ZXJzSXRlbXMgPSBbXTtcblxuICAgIHZhciB2aXNpdExheWVyID0gZnVuY3Rpb24gdmlzaXRMYXllcihsYXllciwgYW5jZXN0b3JzKSB7XG4gICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyTGF5ZXIpIHtcbiAgICAgICAgdmFyIGV4dGVudEJ5Wm9vbSA9IF90aGlzMy5nZXRFeHRlbnRCeVpvb20obWFwLCBsYXllciwgYW5jZXN0b3JzLCB1c2VyRXh0ZW50KTtcblxuICAgICAgICB2YXIgcHJvamVjdGlvbiA9IG9sUHJvai5nZXQobWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCkpO1xuXG4gICAgICAgIHZhciBzb3VyY2UgPSBfdGhpczMuc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMobGF5ZXIuZ2V0U291cmNlKCksIHByb2plY3Rpb24pO1xuXG4gICAgICAgIHZhciBsYXllclR5cGU7XG4gICAgICAgIHZhciBsYXllclNlcmlhbGl6YXRpb247XG5cbiAgICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllclRpbGUgfHwgbGF5ZXIgaW5zdGFuY2VvZiBvbExheWVySW1hZ2UpIHtcbiAgICAgICAgICBsYXllclR5cGUgPSAndGlsZSc7XG4gICAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uID0gX3RoaXMzLnNlckRlc18uc2VyaWFsaXplVGlsZUxheWVyKGxheWVyLCBzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGxheWVyIGluc3RhbmNlb2Ygb2xMYXllclZlY3Rvcikge1xuICAgICAgICAgIGxheWVyVHlwZSA9ICd2ZWN0b3InO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJhY2tncm91bmRMYXllciA9IF90aGlzMy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXy5nZXQobWFwKSA9PT0gbGF5ZXI7XG4gICAgICAgIGxheWVyc0l0ZW1zLnB1c2goe1xuICAgICAgICAgIGJhY2tncm91bmRMYXllcjogYmFja2dyb3VuZExheWVyLFxuICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgIGV4dGVudEJ5Wm9vbTogZXh0ZW50Qnlab29tLFxuICAgICAgICAgIGxheWVyVHlwZTogbGF5ZXJUeXBlLFxuICAgICAgICAgIGxheWVyU2VyaWFsaXphdGlvbjogbGF5ZXJTZXJpYWxpemF0aW9uLFxuICAgICAgICAgIGxheWVyOiBsYXllcixcbiAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICBhbmNlc3RvcnM6IGFuY2VzdG9yc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIG1hcC5nZXRMYXllcnMoKS5mb3JFYWNoKGZ1bmN0aW9uIChyb290KSB7XG4gICAgICB0cmF2ZXJzZUxheWVyKHJvb3QsIFtdLCB2aXNpdExheWVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGF5ZXJzSXRlbXM7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZVRpbGVMb2FkRnVuY3Rpb25fID0gZnVuY3Rpb24gY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8ob2ZmbGluZUxheWVyKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICB2YXIgdGlsZUxvYWRGdW5jdGlvbiA9IGZ1bmN0aW9uIHRpbGVMb2FkRnVuY3Rpb24oaW1hZ2VUaWxlLCBzcmMpIHtcbiAgICAgIF90aGlzNC5nZXRJdGVtKG5vcm1hbGl6ZVVSTChzcmMpKS50aGVuKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgIGNvbnRlbnQgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FRQUFBQzFIQXdDQUFBQUMwbEVRVlI0Mm1Oa1lBQUFBQVlBQWpDQjBDOEFBQUFBU1VWT1JLNUNZSUk9JztcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlVGlsZS5nZXRJbWFnZSgpLnNyYyA9IGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRpbGVMb2FkRnVuY3Rpb247XG4gIH07XG5cbiAgX3Byb3RvLnJlY3JlYXRlT2ZmbGluZUxheWVyID0gZnVuY3Rpb24gcmVjcmVhdGVPZmZsaW5lTGF5ZXIob2ZmbGluZUxheWVyKSB7XG4gICAgaWYgKG9mZmxpbmVMYXllci5sYXllclR5cGUgPT09ICd0aWxlJykge1xuICAgICAgdmFyIHNlcmlhbGl6YXRpb24gPSBvZmZsaW5lTGF5ZXIubGF5ZXJTZXJpYWxpemF0aW9uO1xuXG4gICAgICBpZiAoc2VyaWFsaXphdGlvbikge1xuICAgICAgICB2YXIgdGlsZUxvYWRGdW5jdGlvbiA9IHRoaXMuY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8ob2ZmbGluZUxheWVyKTtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5zZXJEZXNfLmRlc2VyaWFsaXplVGlsZUxheWVyKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLmdldE1heE51bWJlck9mUGFyYWxsZWxEb3dubG9hZHMgPSBmdW5jdGlvbiBnZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzKCkge1xuICAgIHJldHVybiAxMTtcbiAgfTtcblxuICByZXR1cm4gX2RlZmF1bHQ7XG59KG9sT2JzZXJ2YWJsZSk7XG5cbmV4cG9ydCB7IF9kZWZhdWx0IGFzIGRlZmF1bHQgfTsiLCJmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSBpdCA9IG9bU3ltYm9sLml0ZXJhdG9yXSgpOyByZXR1cm4gaXQubmV4dC5iaW5kKGl0KTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TLmpzJztcbmltcG9ydCBvbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMuanMnO1xuaW1wb3J0IFRpbGVzRG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvVGlsZXNEb3dubG9hZGVyLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG5mdW5jdGlvbiBtYWduaXR1ZGUyKGEsIGIpIHtcbiAgdmFyIG1hZ25pdHVkZVNxdWFyZWQgPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIG1hZ25pdHVkZVNxdWFyZWQgKz0gTWF0aC5wb3coYVtpXSAtIGJbaV0sIDIpO1xuICB9XG5cbiAgcmV0dXJuIG1hZ25pdHVkZVNxdWFyZWQ7XG59XG5cbnZhciBEb3dubG9hZGVyID0gZnVuY3Rpb24gKCkge1xuICBEb3dubG9hZGVyLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIl07XG5cbiAgZnVuY3Rpb24gRG93bmxvYWRlcihuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24pIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICAgIHRoaXMudGlsZURvd25sb2FkZXJfID0gbnVsbDtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBEb3dubG9hZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aGlzLnRpbGVEb3dubG9hZGVyXykge1xuICAgICAgdGhpcy50aWxlRG93bmxvYWRlcl8uY2FuY2VsKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5xdWV1ZUxheWVyVGlsZXNfID0gZnVuY3Rpb24gcXVldWVMYXllclRpbGVzXyhsYXllck1ldGFkYXRhLCBxdWV1ZSkge1xuICAgIHZhciBzb3VyY2UgPSBsYXllck1ldGFkYXRhLnNvdXJjZTtcbiAgICB2YXIgbWFwID0gbGF5ZXJNZXRhZGF0YS5tYXAsXG4gICAgICAgIGV4dGVudEJ5Wm9vbSA9IGxheWVyTWV0YWRhdGEuZXh0ZW50Qnlab29tO1xuXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmFzc2VydChzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVRpbGVXTVMgfHwgc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VXTVRTKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IG1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHZhciB0aWxlR3JpZCA9IHNvdXJjZS5nZXRUaWxlR3JpZCgpO1xuICAgIHZhciB0aWxlVXJsRnVuY3Rpb24gPSBzb3VyY2UuZ2V0VGlsZVVybEZ1bmN0aW9uKCk7XG4gICAgY29uc29sZS5hc3NlcnQoZXh0ZW50Qnlab29tKTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKCkge1xuICAgICAgdmFyIGV4dGVudFpvb20gPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciB6ID0gZXh0ZW50Wm9vbS56b29tO1xuICAgICAgdmFyIGV4dGVudCA9IGV4dGVudFpvb20uZXh0ZW50O1xuICAgICAgdmFyIHF1ZXVlQnlaID0gW107XG4gICAgICB2YXIgbWluWCA9IHZvaWQgMDtcbiAgICAgIHZhciBtaW5ZID0gdm9pZCAwO1xuICAgICAgdmFyIG1heFggPSB2b2lkIDA7XG4gICAgICB2YXIgbWF4WSA9IHZvaWQgMDtcbiAgICAgIHRpbGVHcmlkLmZvckVhY2hUaWxlQ29vcmQoZXh0ZW50LCB6LCBmdW5jdGlvbiAoY29vcmQpIHtcbiAgICAgICAgbWF4WCA9IGNvb3JkWzFdO1xuICAgICAgICBtYXhZID0gY29vcmRbMl07XG5cbiAgICAgICAgaWYgKG1pblggPT09IHVuZGVmaW5lZCB8fCBtaW5ZID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBtaW5YID0gY29vcmRbMV07XG4gICAgICAgICAgbWluWSA9IGNvb3JkWzJdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVybCA9IHRpbGVVcmxGdW5jdGlvbihjb29yZCwgREVWSUNFX1BJWEVMX1JBVElPLCBwcm9qZWN0aW9uKTtcbiAgICAgICAgY29uc29sZS5hc3NlcnQodXJsKTtcblxuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgdmFyIHRpbGUgPSB7XG4gICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHJlc3BvbnNlOiBudWxsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBxdWV1ZUJ5Wi5wdXNoKHRpbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBjZW50ZXJUaWxlQ29vcmQgPSBbeiwgKG1pblggKyBtYXhYKSAvIDIsIChtaW5ZICsgbWF4WSkgLyAyXTtcbiAgICAgIHF1ZXVlQnlaLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIG1hZ25pdHVkZTIoYS5jb29yZCwgY2VudGVyVGlsZUNvb3JkKSAtIG1hZ25pdHVkZTIoYi5jb29yZCwgY2VudGVyVGlsZUNvb3JkKTtcbiAgICAgIH0pO1xuICAgICAgcXVldWUucHVzaC5hcHBseShxdWV1ZSwgcXVldWVCeVopO1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKGV4dGVudEJ5Wm9vbSksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICBfbG9vcCgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoZXh0ZW50LCBtYXApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGxheWVyc01ldGFkYXRhcyA9IHRoaXMuY29uZmlndXJhdGlvbl8uY3JlYXRlTGF5ZXJNZXRhZGF0YXMobWFwLCBleHRlbnQpO1xuICAgIHZhciBwZXJzaXN0ZW50TGF5ZXJzID0gW107XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHpvb21zID0gW107XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShsYXllcnNNZXRhZGF0YXMpLCBfc3RlcDI7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMigpKS5kb25lOykge1xuICAgICAgdmFyIGxheWVySXRlbSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgaWYgKGxheWVySXRlbS5sYXllclR5cGUgPT09ICd0aWxlJykge1xuICAgICAgICB2YXIgdGlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWV1ZUxheWVyVGlsZXNfKGxheWVySXRlbSwgdGlsZXMpO1xuICAgICAgICBxdWV1ZS5wdXNoLmFwcGx5KHF1ZXVlLCB0aWxlcyk7XG4gICAgICB9XG5cbiAgICAgIHBlcnNpc3RlbnRMYXllcnMucHVzaCh7XG4gICAgICAgIGJhY2tncm91bmRMYXllcjogbGF5ZXJJdGVtLmJhY2tncm91bmRMYXllcixcbiAgICAgICAgbGF5ZXJUeXBlOiBsYXllckl0ZW0ubGF5ZXJUeXBlLFxuICAgICAgICBsYXllclNlcmlhbGl6YXRpb246IGxheWVySXRlbS5sYXllclNlcmlhbGl6YXRpb24sXG4gICAgICAgIGtleTogdGhpcy5jb25maWd1cmF0aW9uXy5nZXRMYXllcktleShsYXllckl0ZW0pXG4gICAgICB9KTtcbiAgICAgIGxheWVySXRlbS5leHRlbnRCeVpvb20uZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHZhciB6b29tID0gb2JqLnpvb207XG5cbiAgICAgICAgaWYgKCF6b29tcy5pbmNsdWRlcyh6b29tKSkge1xuICAgICAgICAgIHpvb21zLnB1c2goem9vbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBwZXJzaXN0ZW50T2JqZWN0ID0ge1xuICAgICAgZXh0ZW50OiBleHRlbnQsXG4gICAgICBsYXllcnM6IHBlcnNpc3RlbnRMYXllcnMsXG4gICAgICB6b29tczogem9vbXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHNldE9mZmxpbmVDb250ZW50UHJvbWlzZSA9IHRoaXMuY29uZmlndXJhdGlvbl8uc2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JywgcGVyc2lzdGVudE9iamVjdCk7XG4gICAgdmFyIG1heERvd25sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpO1xuICAgIHRoaXMudGlsZURvd25sb2FkZXJfID0gbmV3IFRpbGVzRG93bmxvYWRlcihxdWV1ZSwgdGhpcy5jb25maWd1cmF0aW9uXywgbWF4RG93bmxvYWRzKTtcbiAgICB2YXIgdGlsZURvd25sb2FkUHJvbWlzZSA9IHRoaXMudGlsZURvd25sb2FkZXJfLmRvd25sb2FkKCk7XG4gICAgdmFyIGFsbFByb21pc2UgPSBQcm9taXNlLmFsbChbc2V0T2ZmbGluZUNvbnRlbnRQcm9taXNlLCB0aWxlRG93bmxvYWRQcm9taXNlXSk7XG5cbiAgICB2YXIgc2V0SGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBzZXRIYXNPZmZsaW5lRGF0YSgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb25maWd1cmF0aW9uXy5zZXRIYXNPZmZsaW5lRGF0YSh0cnVlKTtcbiAgICB9O1xuXG4gICAgYWxsUHJvbWlzZS50aGVuKHNldEhhc09mZmxpbmVEYXRhLCBzZXRIYXNPZmZsaW5lRGF0YSk7XG4gICAgcmV0dXJuIGFsbFByb21pc2U7XG4gIH07XG5cbiAgcmV0dXJuIERvd25sb2FkZXI7XG59KCk7XG5cbnZhciBuYW1lID0gJ29mZmxpbmVEb3dubG9hZGVyJztcbkRvd25sb2FkZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW10pLnNlcnZpY2UobmFtZSwgRG93bmxvYWRlcik7XG52YXIgZXhwb3J0cyA9IERvd25sb2FkZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIuanMnO1xuXG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKEFuZHJvaWRXcmFwcGVyLCBfQWJzdHJhY3RXcmFwcGVyKTtcblxuICBmdW5jdGlvbiBBbmRyb2lkV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvdy5hbmRyb2lkV3JhcHBlciA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBBbmRyb2lkV3JhcHBlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge1xuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93Lm5nZW9Ib3N0LnBvc3RNZXNzYWdlVG9BbmRyb2lkKHN0cmluZ2lmaWVkKTtcbiAgfTtcblxuICBfcHJvdG8ucmVjZWl2ZUZyb21BbmRyb2lkID0gZnVuY3Rpb24gcmVjZWl2ZUZyb21BbmRyb2lkKGFjdGlvblN0cmluZykge1xuICAgIHZhciBhY3Rpb24gPSBKU09OLnBhcnNlKGFjdGlvblN0cmluZyk7XG4gICAgdGhpcy5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAnZGF0YSc6IGFjdGlvblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBBbmRyb2lkV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzJztcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoX0Fic3RyYWN0V3JhcHBlcikge1xuICBfaW5oZXJpdHNMb29zZShDb3Jkb3ZhV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG5cbiAgZnVuY3Rpb24gQ29yZG92YVdyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF90aGlzLnJlY2VpdmVNZXNzYWdlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBmYWxzZSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvcmRvdmFXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgd2luZG93WydwYXJlbnQnXS5wb3N0TWVzc2FnZShhY3Rpb24sICcqJyk7XG4gIH07XG5cbiAgcmV0dXJuIENvcmRvdmFXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIuanMnO1xuXG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKElvc1dyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuXG4gIGZ1bmN0aW9uIElvc1dyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuaW9zV3JhcHBlciA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBJb3NXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvblsnY29tbWFuZCddID09PSAnc2V0SXRlbScpIHtcbiAgICAgIGFjdGlvblsnYXJncyddWzFdID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uWydhcmdzJ11bMV0pO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuaW9zLnBvc3RNZXNzYWdlKHN0cmluZ2lmaWVkKTtcbiAgfTtcblxuICBfcHJvdG8ucmVjZWl2ZUZyb21Jb3MgPSBmdW5jdGlvbiByZWNlaXZlRnJvbUlvcyhhY3Rpb25TdHJpbmcpIHtcbiAgICB2YXIgYWN0aW9uID0gSlNPTi5wYXJzZShhY3Rpb25TdHJpbmcpO1xuICAgIHZhciBhcmdzID0gYWN0aW9uWydhcmdzJ10gfHwgW107XG4gICAgYWN0aW9uWydhcmdzJ10gPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAnZGF0YSc6IGFjdGlvblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBJb3NXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgTW9kZS4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCJdO1xuXG4gIGZ1bmN0aW9uIE1vZGUobmdlb09mZmxpbmVDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5lbmFibGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuY29tcG9uZW50XyA9IG51bGw7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1vZGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5pc0VuYWJsZWQgPSBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZF87XG4gIH07XG5cbiAgX3Byb3RvLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8ucmVnaXN0ZXJDb21wb25lbnQgPSBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICB0aGlzLmNvbXBvbmVudF8gPSBjb21wb25lbnQ7XG4gIH07XG5cbiAgX3Byb3RvLmFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBhY3RpdmF0ZU9mZmxpbmVNb2RlKCkge1xuICAgIGlmICghdGhpcy5jb21wb25lbnRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjb21wb25lbnQgaXMgbm90IHJlZ2lzdGVyZWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudF8uYWN0aXZhdGVPZmZsaW5lTW9kZSgpO1xuICB9O1xuXG4gIF9wcm90by5oYXNEYXRhID0gZnVuY3Rpb24gaGFzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmhhc09mZmxpbmVEYXRhKCk7XG4gIH07XG5cbiAgcmV0dXJuIE1vZGU7XG59KCk7XG5cbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVNb2RlJywgW10pO1xubW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lTW9kZScsIE1vZGUpO1xuTW9kZS5tb2R1bGUgPSBtb2R1bGU7XG5leHBvcnQgZGVmYXVsdCBNb2RlOyIsImltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZS5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIFNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIFNlcnZpY2UuJGluamVjdCA9IFtcIiRkb2N1bWVudFwiLCBcIiR3aW5kb3dcIiwgXCIkdGltZW91dFwiLCBcIiRyb290U2NvcGVcIiwgXCJuZ2VvT2ZmbGluZVRlc3RVcmxcIl07XG5cbiAgZnVuY3Rpb24gU2VydmljZSgkZG9jdW1lbnQsICR3aW5kb3csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBuZ2VvT2ZmbGluZVRlc3RVcmwpIHtcbiAgICB0aGlzLiRkb2N1bWVudF8gPSAkZG9jdW1lbnQ7XG4gICAgdGhpcy4kd2luZG93XyA9ICR3aW5kb3c7XG4gICAgdGhpcy4kdGltZW91dF8gPSAkdGltZW91dDtcbiAgICB0aGlzLiRyb290U2NvcGVfID0gJHJvb3RTY29wZTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lVGVzdFVybF8gPSBuZ2VvT2ZmbGluZVRlc3RVcmw7XG4gICAgdGhpcy5jb3VudF8gPSAwO1xuICAgIHRoaXMub2ZmbGluZV87XG4gICAgdGhpcy5wcm9taXNlXztcbiAgICB0aGlzLmluaXRpYWxpemVfKCk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU2VydmljZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXRpYWxpemVfID0gZnVuY3Rpb24gaW5pdGlhbGl6ZV8oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMub2ZmbGluZV8gPSAhdGhpcy4kd2luZG93Xy5uYXZpZ2F0b3Iub25MaW5lO1xuICAgIHRoaXMuJHdpbmRvd18uYWRkRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8odHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5jaGVjayh1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuJGRvY3VtZW50Xy5hamF4RXJyb3IpIHtcbiAgICAgIHZhciBvbkFqYXhFcnJvciA9IGZ1bmN0aW9uIG9uQWpheEVycm9yKGV2dCwganF4aHIsIHNldHRpbmdzLCB0aHJvd25FcnJvcikge1xuICAgICAgICBpZiAoIS9eKGNhbmNlbGVkfGFib3J0KSQvLnRlc3QodGhyb3duRXJyb3IpKSB7XG4gICAgICAgICAgX3RoaXMuY2hlY2soMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuJGRvY3VtZW50Xy5hamF4RXJyb3Iob25BamF4RXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY2hlY2sgPSBmdW5jdGlvbiBjaGVjayh0aW1lb3V0KSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5wcm9taXNlXykge1xuICAgICAgdGhpcy4kdGltZW91dF8uY2FuY2VsKHRoaXMucHJvbWlzZV8pO1xuICAgICAgdGhpcy5wcm9taXNlXyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGltZW91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNvdW50XysrO1xuICAgICAgdGhpcy5wcm9taXNlXyA9IHRoaXMuJHRpbWVvdXRfKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5jaGVjaygpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyxcbiAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKCkge1xuICAgICAgICBfdGhpczIuY291bnRfID0gMDtcblxuICAgICAgICBpZiAoX3RoaXMyLm9mZmxpbmVfKSB7XG4gICAgICAgICAgX3RoaXMyLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICBfdGhpczIuY291bnRfKys7XG5cbiAgICAgICAgaWYgKF90aGlzMi5jb3VudF8gPiAyICYmICFfdGhpczIub2ZmbGluZV8pIHtcbiAgICAgICAgICBfdGhpczIudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by50cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfID0gZnVuY3Rpb24gdHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50XyhvZmZsaW5lKSB7XG4gICAgdGhpcy5vZmZsaW5lXyA9IG9mZmxpbmU7XG4gICAgdGhpcy4kcm9vdFNjb3BlXy4kZGlnZXN0KCk7XG4gIH07XG5cbiAgX3Byb3RvLmlzRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gaXNEaXNjb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5vZmZsaW5lXztcbiAgfTtcblxuICByZXR1cm4gU2VydmljZTtcbn0oKTtcblxudmFyIG5hbWUgPSAnbmdlb05ldHdvcmtTdGF0dXMnO1xuU2VydmljZS5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBbbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5TZXJ2aWNlLm1vZHVsZS5zZXJ2aWNlKG5hbWUsIFNlcnZpY2UpO1xuXG52YXIgaHR0cEludGVyY2VwdG9yID0gZnVuY3Rpb24gaHR0cEludGVyY2VwdG9yKCRxLCBuZ2VvRGVib3VuY2UsIG5nZW9OZXR3b3JrU3RhdHVzKSB7XG4gIHZhciBkZWJvdW5jZWRDaGVjayA9IG5nZW9EZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5nZW9OZXR3b3JrU3RhdHVzLmNoZWNrKHVuZGVmaW5lZCk7XG4gIH0sIDIwMDAsIGZhbHNlKTtcbiAgcmV0dXJuIHtcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9LFxuICAgIHJlcXVlc3RFcnJvcjogZnVuY3Rpb24gcmVxdWVzdEVycm9yKHJlamVjdGlvbikge1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH0sXG4gICAgcmVzcG9uc2U6IGZ1bmN0aW9uIHJlc3BvbnNlKF9yZXNwb25zZSkge1xuICAgICAgcmV0dXJuIF9yZXNwb25zZTtcbiAgICB9LFxuICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICBkZWJvdW5jZWRDaGVjaygpO1xuICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuICAgIH1cbiAgfTtcbn07XG5cbmh0dHBJbnRlcmNlcHRvci4kaW5qZWN0ID0gW1wiJHFcIiwgXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcbmh0dHBJbnRlcmNlcHRvci4kaW5qZWN0ID0gW1wiJHFcIiwgXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcblNlcnZpY2UubW9kdWxlLmZhY3RvcnkoJ2h0dHBJbnRlcmNlcHRvcicsIGh0dHBJbnRlcmNlcHRvcik7XG5cblNlcnZpY2UubW9kdWxlLmNvbmZpZ0Z1bmN0aW9uXyA9IGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4gICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2h0dHBJbnRlcmNlcHRvcicpO1xufTtcblxuU2VydmljZS5tb2R1bGUuY29uZmlnRnVuY3Rpb25fLiRpbmplY3QgPSBbXCIkaHR0cFByb3ZpZGVyXCJdO1xuU2VydmljZS5tb2R1bGUuY29uZmlnKFNlcnZpY2UubW9kdWxlLmNvbmZpZ0Z1bmN0aW9uXyk7XG5TZXJ2aWNlLm1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZXN0VXJsJywgJycpO1xudmFyIGV4cG9ydHMgPSBTZXJ2aWNlO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSBpdCA9IG9bU3ltYm9sLml0ZXJhdG9yXSgpOyByZXR1cm4gaXQubmV4dC5iaW5kKGl0KTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmltcG9ydCBuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyIGZyb20gJ25nZW8vbWFwL0JhY2tncm91bmRMYXllck1nci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIFJlc3RvcmVyID0gZnVuY3Rpb24gKCkge1xuICBSZXN0b3Jlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCIsIFwibmdlb0JhY2tncm91bmRMYXllck1nclwiXTtcblxuICBmdW5jdGlvbiBSZXN0b3JlcihuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb24sIG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3IpIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICAgIHRoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFJlc3RvcmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUobWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25fLmdldEl0ZW0oJ29mZmxpbmVfY29udGVudCcpLnRoZW4oZnVuY3Rpb24gKG9mZmxpbmVDb250ZW50KSB7XG4gICAgICByZXR1cm4gX3RoaXMuZG9SZXN0b3JlKG1hcCwgb2ZmbGluZUNvbnRlbnQpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5kb1Jlc3RvcmUgPSBmdW5jdGlvbiBkb1Jlc3RvcmUobWFwLCBvZmZsaW5lQ29udGVudCkge1xuICAgIG1hcC5nZXRMYXllckdyb3VwKCkuZ2V0TGF5ZXJzKCkuY2xlYXIoKTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uob2ZmbGluZUNvbnRlbnQubGF5ZXJzKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIHZhciBvZmZsaW5lTGF5ZXIgPSBfc3RlcC52YWx1ZTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuY29uZmlndXJhdGlvbl8ucmVjcmVhdGVPZmZsaW5lTGF5ZXIob2ZmbGluZUxheWVyKTtcblxuICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XG5cbiAgICAgICAgaWYgKG9mZmxpbmVMYXllci5iYWNrZ3JvdW5kTGF5ZXIpIHtcbiAgICAgICAgICB0aGlzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfLnNldChtYXAsIGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvZmZsaW5lQ29udGVudC5leHRlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIFJlc3RvcmVyO1xufSgpO1xuXG52YXIgbmFtZSA9ICduZ2VvT2ZmbGluZVJlc3RvcmVyJztcblJlc3RvcmVyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWFwQmFja2dyb3VuZExheWVyTWdyLm5hbWVdKS5zZXJ2aWNlKG5hbWUsIFJlc3RvcmVyKTtcbnZhciBleHBvcnRzID0gUmVzdG9yZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBPbFRpbGVncmlkVGlsZUdyaWQgZnJvbSAnb2wvdGlsZWdyaWQvVGlsZUdyaWQuanMnO1xuaW1wb3J0IE9sVGlsZWdyaWRXTVRTIGZyb20gJ29sL3RpbGVncmlkL1dNVFMuanMnO1xuaW1wb3J0ICogYXMgb2xQcm9qIGZyb20gJ29sL3Byb2ouanMnO1xuaW1wb3J0IE9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG5pbXBvcnQgT2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcbmltcG9ydCBPbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcblxudmFyIFNlckRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2VyRGVzKF9yZWYpIHtcbiAgICB2YXIgZ3V0dGVyID0gX3JlZi5ndXR0ZXI7XG4gICAgdGhpcy5ndXR0ZXJfID0gZ3V0dGVyO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFNlckRlcy5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNyZWF0ZUJhc2VPYmplY3RfID0gZnVuY3Rpb24gY3JlYXRlQmFzZU9iamVjdF8ob2xPYmplY3QpIHtcbiAgICB2YXIgcHJvcGVydGllcyA9IG9sT2JqZWN0LmdldFByb3BlcnRpZXMoKTtcbiAgICB2YXIgb2JqID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgdmFyIHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgdmFyIHR5cGVPZiA9IHR5cGVvZiB2YWx1ZTtcblxuICAgICAgaWYgKHR5cGVPZiA9PT0gJ3N0cmluZycgfHwgdHlwZU9mID09PSAnbnVtYmVyJykge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVncmlkID0gZnVuY3Rpb24gc2VyaWFsaXplVGlsZWdyaWQodGlsZWdyaWQpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgb2JqLmV4dGVudCA9IHRpbGVncmlkLmdldEV4dGVudCgpO1xuICAgIG9iai5taW5ab29tID0gdGlsZWdyaWQuZ2V0TWluWm9vbSgpO1xuICAgIG9iai5vcmlnaW4gPSB0aWxlZ3JpZC5nZXRPcmlnaW4oMCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gdGlsZWdyaWQuZ2V0UmVzb2x1dGlvbnMoKTtcbiAgICBvYmoudGlsZVNpemUgPSB0aWxlZ3JpZC5nZXRUaWxlU2l6ZSh0aWxlZ3JpZC5nZXRNaW5ab29tKCkpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVRpbGVncmlkID0gZnVuY3Rpb24gZGVzZXJpYWxpemVUaWxlZ3JpZChzZXJpYWxpemF0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHJldHVybiBuZXcgT2xUaWxlZ3JpZFRpbGVHcmlkKG9wdGlvbnMpO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlZ3JpZFdNVFModGlsZWdyaWQpIHtcbiAgICBpZiAoIXRpbGVncmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgcmVzb2x1dGlvbnMgPSB0aWxlZ3JpZC5nZXRSZXNvbHV0aW9ucygpO1xuICAgIG9iai5leHRlbnQgPSB0aWxlZ3JpZC5nZXRFeHRlbnQoKTtcbiAgICBvYmoubWluWm9vbSA9IHRpbGVncmlkLmdldE1pblpvb20oKTtcbiAgICBvYmoubWF0cml4SWRzID0gdGlsZWdyaWQuZ2V0TWF0cml4SWRzKCk7XG4gICAgb2JqLnJlc29sdXRpb25zID0gcmVzb2x1dGlvbnM7XG4gICAgb2JqLm9yaWdpbnMgPSBbXTtcblxuICAgIGZvciAodmFyIHogPSAwOyB6IDwgcmVzb2x1dGlvbnMubGVuZ3RoOyArK3opIHtcbiAgICAgIG9iai5vcmlnaW5zLnB1c2godGlsZWdyaWQuZ2V0T3JpZ2luKHopKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlZ3JpZFdNVFMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhzZXJpYWxpemF0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHJldHVybiBuZXcgT2xUaWxlZ3JpZFdNVFMob3B0aW9ucyk7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMgPSBmdW5jdGlvbiBzZXJpYWxpemVTb3VyY2VUaWxlV01TKHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0aGlzLmNyZWF0ZUJhc2VPYmplY3RfKHNvdXJjZSk7XG4gICAgb2JqLnBhcmFtcyA9IHNvdXJjZS5nZXRQYXJhbXMoKTtcbiAgICBvYmoudXJscyA9IHNvdXJjZS5nZXRVcmxzKCk7XG4gICAgb2JqLnRpbGVHcmlkID0gdGhpcy5zZXJpYWxpemVUaWxlZ3JpZChzb3VyY2UuZ2V0VGlsZUdyaWQoKSk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBzb3VyY2UuZ2V0UHJvamVjdGlvbigpO1xuXG4gICAgaWYgKHByb2plY3Rpb24pIHtcbiAgICAgIG9iai5wcm9qZWN0aW9uID0gb2xQcm9qLmdldChzb3VyY2UuZ2V0UHJvamVjdGlvbigpKS5nZXRDb2RlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplU291cmNlVGlsZVdNUyA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplU291cmNlVGlsZVdNUyhzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIG9wdGlvbnMudGlsZUxvYWRGdW5jdGlvbiA9IHRpbGVMb2FkRnVuY3Rpb247XG5cbiAgICBpZiAob3B0aW9ucy50aWxlR3JpZCkge1xuICAgICAgb3B0aW9ucy50aWxlR3JpZCA9IHRoaXMuZGVzZXJpYWxpemVUaWxlZ3JpZChvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmd1dHRlciA9IHRoaXMuZ3V0dGVyXztcbiAgICByZXR1cm4gbmV3IE9sU291cmNlVGlsZVdNUyhvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplU291cmNlV01UUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVNvdXJjZVdNVFMoc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8oc291cmNlKTtcbiAgICBvYmouZGltZW5zaW9ucyA9IHNvdXJjZS5nZXREaW1lbnNpb25zKCk7XG4gICAgb2JqLmZvcm1hdCA9IHNvdXJjZS5nZXRGb3JtYXQoKTtcbiAgICBvYmoudXJscyA9IHNvdXJjZS5nZXRVcmxzKCk7XG4gICAgb2JqLnZlcnNpb24gPSBzb3VyY2UuZ2V0VmVyc2lvbigpO1xuICAgIG9iai5sYXllciA9IHNvdXJjZS5nZXRMYXllcigpO1xuICAgIG9iai5zdHlsZSA9IHNvdXJjZS5nZXRTdHlsZSgpO1xuICAgIG9iai5tYXRyaXhTZXQgPSBzb3VyY2UuZ2V0TWF0cml4U2V0KCk7XG4gICAgdmFyIHRpbGVHcmlkV01UUyA9IHNvdXJjZS5nZXRUaWxlR3JpZCgpO1xuICAgIG9iai50aWxlR3JpZCA9IHRoaXMuc2VyaWFsaXplVGlsZWdyaWRXTVRTKHRpbGVHcmlkV01UUyk7XG4gICAgb2JqLnJlcXVlc3RFbmNvZGluZyA9IHNvdXJjZS5nZXRSZXF1ZXN0RW5jb2RpbmcoKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgICBpZiAocHJvamVjdGlvbikge1xuICAgICAgb2JqLnByb2plY3Rpb24gPSBvbFByb2ouZ2V0KHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkpLmdldENvZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVTb3VyY2VXTVRTID0gZnVuY3Rpb24gZGVzZXJpYWxpemVTb3VyY2VXTVRTKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgb3B0aW9ucy50aWxlTG9hZEZ1bmN0aW9uID0gdGlsZUxvYWRGdW5jdGlvbjtcblxuICAgIGlmIChvcHRpb25zLnRpbGVHcmlkKSB7XG4gICAgICBvcHRpb25zLnRpbGVHcmlkID0gdGhpcy5kZXNlcmlhbGl6ZVRpbGVncmlkV01UUyhvcHRpb25zLnRpbGVHcmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9sU291cmNlV01UUyhvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8ubWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyA9IGZ1bmN0aW9uIG1ha2VJbmZpbml0eVNlcmlhbGl6YWJsZV8obnVtYmVyKSB7XG4gICAgaWYgKG51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiAxMDAwO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVMYXllciA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVMYXllcihsYXllciwgc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8obGF5ZXIpO1xuICAgIG9iai5vcGFjaXR5ID0gbGF5ZXIuZ2V0T3BhY2l0eSgpO1xuICAgIG9iai52aXNpYmxlID0gbGF5ZXIuZ2V0VmlzaWJsZSgpO1xuICAgIG9iai5taW5SZXNvbHV0aW9uID0gbGF5ZXIuZ2V0TWluUmVzb2x1dGlvbigpO1xuICAgIG9iai5tYXhSZXNvbHV0aW9uID0gdGhpcy5tYWtlSW5maW5pdHlTZXJpYWxpemFibGVfKGxheWVyLmdldE1heFJlc29sdXRpb24oKSk7XG4gICAgb2JqLnpJbmRleCA9IGxheWVyLmdldFpJbmRleCgpO1xuICAgIHNvdXJjZSA9IHNvdXJjZSB8fCBsYXllci5nZXRTb3VyY2UoKTtcblxuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPbFNvdXJjZVRpbGVXTVMpIHtcbiAgICAgIG9iai5zb3VyY2UgPSB0aGlzLnNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc291cmNlKTtcbiAgICAgIG9iai5zb3VyY2VUeXBlID0gJ3RpbGVXTVMnO1xuICAgIH0gZWxzZSBpZiAoc291cmNlIGluc3RhbmNlb2YgT2xTb3VyY2VXTVRTKSB7XG4gICAgICBvYmouc291cmNlID0gdGhpcy5zZXJpYWxpemVTb3VyY2VXTVRTKHNvdXJjZSk7XG4gICAgICBvYmouc291cmNlVHlwZSA9ICdXTVRTJztcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVUaWxlTGF5ZXIgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVMYXllcihzZXJpYWxpemF0aW9uLCB0aWxlTG9hZEZ1bmN0aW9uKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKHNlcmlhbGl6YXRpb24pO1xuICAgIHZhciBzb3VyY2VUeXBlID0gb3B0aW9ucy5zb3VyY2VUeXBlO1xuXG4gICAgaWYgKHNvdXJjZVR5cGUgPT09ICd0aWxlV01TJykge1xuICAgICAgb3B0aW9ucy5zb3VyY2UgPSB0aGlzLmRlc2VyaWFsaXplU291cmNlVGlsZVdNUyhvcHRpb25zLnNvdXJjZSwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgfSBlbHNlIGlmIChzb3VyY2VUeXBlID09PSAnV01UUycpIHtcbiAgICAgIG9wdGlvbnMuc291cmNlID0gdGhpcy5kZXNlcmlhbGl6ZVNvdXJjZVdNVFMob3B0aW9ucy5zb3VyY2UsIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT2xMYXllclRpbGUob3B0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIFNlckRlcztcbn0oKTtcblxudmFyIGV4cG9ydHMgPSBTZXJEZXM7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgU2VydmljZU1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIFNlcnZpY2VNYW5hZ2VyLiRpbmplY3QgPSBbXCIkaW5qZWN0b3JcIl07XG5cbiAgZnVuY3Rpb24gU2VydmljZU1hbmFnZXIoJGluamVjdG9yKSB7XG4gICAgdGhpcy4kaW5qZWN0b3JfID0gJGluamVjdG9yO1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gbnVsbDtcbiAgICB0aGlzLnJlc3RvcmVTZXJ2aWNlXyA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU2VydmljZU1hbmFnZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5nZXRPZmZsaW5lU2VydmljZV8gPSBmdW5jdGlvbiBnZXRPZmZsaW5lU2VydmljZV8oc2VydmljZUxpa2UsIG1ldGhvZCkge1xuICAgIGlmICh0eXBlb2Ygc2VydmljZUxpa2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoIXRoaXMuJGluamVjdG9yXy5oYXMoc2VydmljZUxpa2UpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgb2ZmbGluZSBcIiArIG1ldGhvZCArIFwiIHNlcnZpY2UgY291bGQgbm90IGJlIGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzZXJ2aWNlID0gdGhpcy4kaW5qZWN0b3JfLmdldChzZXJ2aWNlTGlrZSk7XG5cbiAgICAgIGlmICghc2VydmljZVttZXRob2RdKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgb2ZmbGluZSBzZXJ2aWNlIFwiICsgc2VydmljZUxpa2UgKyBcIiBkb2VzIG5vdCBoYXZlIGEgXCIgKyBtZXRob2QgKyBcIiBtZXRob2RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG4gICAgaWYgKCFzZXJ2aWNlTGlrZVttZXRob2RdKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVGhlIHByb3ZpZGVkIG9mZmxpbmUgc2VydmljZSBkb2VzIG5vdCBoYXZlIGEgXCIgKyBtZXRob2QgKyBcIiBtZXRob2RcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlcnZpY2VMaWtlO1xuICB9O1xuXG4gIF9wcm90by5zZXRTYXZlU2VydmljZSA9IGZ1bmN0aW9uIHNldFNhdmVTZXJ2aWNlKHNhdmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMuc2F2ZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8oc2F2ZUxpa2VTZXJ2aWNlLCAnc2F2ZScpO1xuICB9O1xuXG4gIF9wcm90by5zZXRSZXN0b3JlU2VydmljZSA9IGZ1bmN0aW9uIHNldFJlc3RvcmVTZXJ2aWNlKHJlc3RvcmVMaWtlU2VydmljZSkge1xuICAgIHRoaXMucmVzdG9yZVNlcnZpY2VfID0gdGhpcy5nZXRPZmZsaW5lU2VydmljZV8ocmVzdG9yZUxpa2VTZXJ2aWNlLCAncmVzdG9yZScpO1xuICB9O1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHNhdmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlU2VydmljZV8uY2FuY2VsKCk7XG4gIH07XG5cbiAgX3Byb3RvLnNhdmUgPSBmdW5jdGlvbiBzYXZlKGV4dGVudCwgbWFwKSB7XG4gICAgaWYgKCF0aGlzLnNhdmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHNhdmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zYXZlU2VydmljZV8uc2F2ZShleHRlbnQsIG1hcCk7XG4gIH07XG5cbiAgX3Byb3RvLnJlc3RvcmUgPSBmdW5jdGlvbiByZXN0b3JlKG1hcCkge1xuICAgIGlmICghdGhpcy5yZXN0b3JlU2VydmljZV8pIHtcbiAgICAgIGNvbnNvbGUud2FybignWW91IG11c3QgcmVnaXN0ZXIgYSByZXN0b3JlU2VydmljZSBmaXJzdCcpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdG9yZVNlcnZpY2VfLnJlc3RvcmUobWFwKTtcbiAgfTtcblxuICByZXR1cm4gU2VydmljZU1hbmFnZXI7XG59KCk7XG5cblNlcnZpY2VNYW5hZ2VyLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyJywgW10pO1xuU2VydmljZU1hbmFnZXIubW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lU2VydmljZU1hbmFnZXInLCBTZXJ2aWNlTWFuYWdlcik7XG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlTWFuYWdlcjsiLCJmdW5jdGlvbiBibG9iVG9EYXRhVXJsKGJsb2IpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgIH07XG5cbiAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgfSk7XG59XG5cbnZhciBUaWxlRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVGlsZURvd25sb2FkZXIodGlsZXMsIGNhbGxiYWNrcywgd29ya2Vycykge1xuICAgIHRoaXMubWF4TnVtYmVyT2ZXb3JrZXJzXyA9IHdvcmtlcnM7XG4gICAgdGhpcy53YXNTdGFydGVkXyA9IGZhbHNlO1xuICAgIHRoaXMudGlsZXNfID0gdGlsZXM7XG4gICAgdGhpcy5jYWxsYmFja3NfID0gY2FsbGJhY2tzO1xuICAgIHRoaXMuYWxsQ291bnRfID0gMDtcbiAgICB0aGlzLm9rQ291bnRfID0gMDtcbiAgICB0aGlzLmtvQ291bnRfID0gMDtcbiAgICB0aGlzLnJlcXVlc3RlZENvdW50XyA9IDA7XG4gICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMucHJvbWlzZV8gPSBudWxsO1xuICAgIHRoaXMudGlsZUluZGV4XyA9IDA7XG4gICAgdGhpcy5jYW5jZWxfID0gZmFsc2U7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVGlsZURvd25sb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdGhpcy5jYW5jZWxfID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uZG93bmxvYWQgPSBmdW5jdGlvbiBkb3dubG9hZCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMucHJvbWlzZV8pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICAgIH1cblxuICAgIHRoaXMucHJvbWlzZV8gPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBfdGhpcy5yZXNvbHZlUHJvbWlzZV8gPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMudGlsZXNfKTtcblxuICAgIGlmICh0aGlzLnRpbGVzXy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKDEpO1xuXG4gICAgICBpZiAodGhpcy5yZXNvbHZlUHJvbWlzZV8pIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1heE51bWJlck9mV29ya2Vyc187ICsraSkge1xuICAgICAgICB0aGlzLmRvd25sb2FkVGlsZV8oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgfTtcblxuICBfcHJvdG8uZG93bmxvYWRUaWxlXyA9IGZ1bmN0aW9uIGRvd25sb2FkVGlsZV8oKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5jYW5jZWxfIHx8IHRoaXMudGlsZUluZGV4XyA+PSB0aGlzLnRpbGVzXy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNfW3RoaXMudGlsZUluZGV4XysrXTtcbiAgICB2YXIgdGlsZVVybCA9IHRpbGUudXJsO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignR0VUJywgdGlsZVVybCwgdHJ1ZSk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcblxuICAgIHZhciBvblRpbGVEb3dubG9hZGVkID0gZnVuY3Rpb24gb25UaWxlRG93bmxvYWRlZCgpIHtcbiAgICAgIGlmIChfdGhpczIuYWxsQ291bnRfID09PSBfdGhpczIudGlsZXNfLmxlbmd0aCAmJiBfdGhpczIucmVzb2x2ZVByb21pc2VfKSB7XG4gICAgICAgIF90aGlzMi5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyLmRvd25sb2FkVGlsZV8oKTtcbiAgICB9O1xuXG4gICAgdmFyIGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbiBlcnJvckNhbGxiYWNrKF8pIHtcbiAgICAgIGlmIChfdGhpczIuY2FuY2VsXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICsrX3RoaXMyLmFsbENvdW50XztcbiAgICAgICsrX3RoaXMyLmtvQ291bnRfO1xuICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuXG4gICAgICBfdGhpczIuY2FsbGJhY2tzXy5vblRpbGVEb3dubG9hZEVycm9yKHByb2dyZXNzKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgIH07XG5cbiAgICB2YXIgb25sb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbiBvbmxvYWRDYWxsYmFjayhlKSB7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2U7XG5cbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zaXplICE9PSAwKSB7XG4gICAgICAgIGJsb2JUb0RhdGFVcmwocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24gKGRhdGFVcmwpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICAgKytfdGhpczIub2tDb3VudF87XG4gICAgICAgICAgdGlsZS5yZXNwb25zZSA9IGRhdGFVcmw7XG4gICAgICAgICAgdmFyIHByb2dyZXNzID0gX3RoaXMyLmFsbENvdW50XyAvIF90aGlzMi50aWxlc18ubGVuZ3RoO1xuXG4gICAgICAgICAgX3RoaXMyLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRTdWNjZXNzKHByb2dyZXNzLCB0aWxlKS50aGVuKG9uVGlsZURvd25sb2FkZWQsIG9uVGlsZURvd25sb2FkZWQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKF90aGlzMi5jYW5jZWxfKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMyLmNhbmNlbF8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICArK190aGlzMi5hbGxDb3VudF87XG4gICAgICAgICsrX3RoaXMyLm9rQ291bnRfO1xuXG4gICAgICAgIF90aGlzMi5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkU3VjY2VzcyhfdGhpczIuYWxsQ291bnRfIC8gX3RoaXMyLnRpbGVzXy5sZW5ndGgsIHRpbGUpLnRoZW4ob25UaWxlRG93bmxvYWRlZCwgb25UaWxlRG93bmxvYWRlZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vbmxvYWQgPSBvbmxvYWRDYWxsYmFjaztcbiAgICB4aHIub25lcnJvciA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5zZW5kKCk7XG4gICAgKyt0aGlzLnJlcXVlc3RlZENvdW50XztcbiAgfTtcblxuICByZXR1cm4gVGlsZURvd25sb2FkZXI7XG59KCk7XG5cbmV4cG9ydCB7IFRpbGVEb3dubG9hZGVyIGFzIGRlZmF1bHQgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibWFpbi1idXR0b25cIj5cXG4gIDxzcGFuIG5nLWlmPVwiISRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwibm8tZGF0YVwiIG5nLWNsaWNrPVwiJGN0cmwudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbigpXCI+PC9kaXY+XFxuICA8L3NwYW4+XFxuICA8c3BhbiBuZy1pZj1cIiRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwid2l0aC1kYXRhXCIgbmctY2xpY2s9XCIkY3RybC5zaG93TWVudSgpXCI+PC9kaXY+XFxuICA8L3NwYW4+XFxuPC9kaXY+XFxuXFxuPGRpdiBuZy1pZj1cIiRjdHJsLnNlbGVjdGluZ0V4dGVudCAmJiAhJGN0cmwubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpXCIgY2xhc3M9XCJ2YWxpZGF0ZS1leHRlbnQgYnRuIGJ0bi1wcmltYXJ5XCI+XFxuICA8ZGl2IG5nLWlmPVwiISRjdHJsLmRvd25sb2FkaW5nXCIgbmctY2xpY2s9XCIkY3RybC5jb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhKClcIiB0cmFuc2xhdGU+U2F2ZSBtYXA8L2Rpdj5cXG4gIDxkaXYgbmctaWY9XCIkY3RybC5kb3dubG9hZGluZ1wiIG5nLWNsaWNrPVwiJGN0cmwuYXNrQWJvcnREb3dubG9hZCgpXCIgdHJhbnNsYXRlPkFib3J0PC9kaXY+XFxuPC9kaXY+XFxuXFxuXFxuPGRpdiBuZy1pZj1cIiRjdHJsLmRvd25sb2FkaW5nXCIgY2xhc3M9XCJpbi1wcm9ncmVzc1wiPlxcbiAgPGRpdj57eyRjdHJsLnByb2dyZXNzUGVyY2VudHN9fSU8L2Rpdj5cXG48L2Rpdj5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLm1lbnVEaXNwbGF5ZWRcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwie3tcXCdDbG9zZVxcJyB8IHRyYW5zbGF0ZX19XCI+XFxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cXG4gICAgPC9idXR0b24+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPk9mZmxpbmUgbWFwPC9oND5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG4gICAgPGRpdiBuZy1pZj1cIiRjdHJsLmhhc0RhdGEoKVwiPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZXh0ZW50LXpvb20gYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiISRjdHJsLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuYWN0aXZhdGVPZmZsaW5lTW9kZSgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5BY3RpdmF0ZSBvZmZsaW5lIG1vZGVcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImV4dGVudC16b29tIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1pZj1cIiRjdHJsLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWFjdGl2YXRlT2ZmbGluZU1vZGUoKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+RGVhY3RpdmF0ZSBvZmZsaW5lIG1vZGVcXG4gICAgICA8L2J1dHRvbj5cXG5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImV4dGVudC1zaG93IGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1pZj1cIiRjdHJsLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwudG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSgpXCI+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cIiRjdHJsLmlzRXh0ZW50VmlzaWJsZSgpXCIgdHJhbnNsYXRlPkhpZGUgZXh0ZW50PC9zcGFuPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XCIhJGN0cmwuaXNFeHRlbnRWaXNpYmxlKClcIiB0cmFuc2xhdGUgPlNob3cgZXh0ZW50PC9zcGFuPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1pZj1cIiEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kaXNwbGF5QWxlcnREZXN0cm95RGF0YSA9IHRydWVcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkRlbGV0ZSBkYXRhXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IG5nLWlmPVwiISRjdHJsLmhhc0RhdGEoKSAmJiAhJGN0cmwubmV0d29ya1N0YXR1cy5pc0Rpc2Nvbm5lY3RlZCgpXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuZXctZGF0YSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPlNhdmUgbmV3IG1hcFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydExvYWREYXRhXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICAgIDxwIHRyYW5zbGF0ZT5+e3skY3RybC5lc3RpbWF0ZWRMb2FkRGF0YVNpemV9fU1CIG9mIG1hcHMgd2lsbCBiZSBkb3dubG9hZGVkICh1bnRpbCBzY2FsZSAxOjI1XFwnMDAwKSAtIERvblxcJ3QgbG9jayB5b3VyIGRldmljZSBvciBuYXZpZ2F0ZSBhd2F5IGZyb20gdGhpcyBzaXRlIGR1cmluZyB0aGUgZG93bmxvYWQgcHJvY2Vzcy4gRGVhY3RpdmF0ZSBcInByaXZhdGVcIiBtb2RlIG9mIHlvdXIgYnJvd3Nlci48L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC52YWxpZGF0ZUV4dGVudCgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5Pa1xcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+Q2FuY2VsXFxuICAgICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnROb0xheWVyXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICAgIDxwIHRyYW5zbGF0ZT5ObyBtYXBzIHNlbGVjdGVkIGZvciBzYXZpbmcuPC9wPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+T2tcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydERlc3Ryb3lEYXRhXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICAgIDxwIHRyYW5zbGF0ZT5EbyB5b3UgcmVhbGx5IHdhbnQgdG8gcmVtb3ZlIHlvdXIgZGF0YSA/PC9wPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlRGF0YSgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5Pa1xcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+Q2FuY2VsXFxuICAgICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuXFxuPG5nZW8tbW9kYWwgbmctbW9kZWw9XCIkY3RybC5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkXCI+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgdHJhbnNsYXRlPldhcm5pbmc8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICAgIDxwIHRyYW5zbGF0ZT5EbyB5b3UgcmVhbGx5IHdhbnQgdG8gcmVtb3ZlIHlvdXIgZGF0YSA/PC9wPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidmFsaWRhdGUgYnRuIGJ0bi1wcmltYXJ5XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuYWJvcnREb3dubG9hZCgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5Pa1xcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZGVsZXRlIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmZvbGxvd0Rvd25sb2FkUHJvZ3Jlc3Npb25fKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkNhbmNlbFxcbiAgICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJpbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyLmpzJztcbmltcG9ydCBuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9tb2RhbENvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBleHRlbnRUb1JlY3RhbmdsZSB9IGZyb20gJ25nZW8vdXRpbHMuanMnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uLmpzJztcbmltcG9ydCB7IHVuQnlLZXkgfSBmcm9tICdvbC9PYnNlcnZhYmxlLmpzJztcbmltcG9ydCBGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uLmpzJztcbmltcG9ydCBvbEdlb21HZW9tZXRyeUxheW91dCBmcm9tICdvbC9nZW9tL0dlb21ldHJ5TGF5b3V0LmpzJztcbmltcG9ydCB7IERFVklDRV9QSVhFTF9SQVRJTyB9IGZyb20gJ29sL2hhcy5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmUnLCBbbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLm5hbWUsIG5nZW9NZXNzYWdlTW9kYWxDb21wb25lbnQubmFtZV0pO1xubW9kdWxlLnZhbHVlKCduZ2VvT2ZmbGluZVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzWyduZ2VvT2ZmbGluZVRlbXBsYXRldXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5odG1sJztcbn0pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL29mZmxpbmUvY29tcG9uZW50Lmh0bWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudC5odG1sJykpO1xufV0pO1xubmdlb09mZmxpbmVUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGVsZW1lbnRcIiwgXCIkYXR0cnNcIiwgXCJuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsXCJdO1xuXG5mdW5jdGlvbiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMsIG5nZW9PZmZsaW5lVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9PZmZsaW5lVGVtcGxhdGVVcmwoJGVsZW1lbnQsICRhdHRycyk7XG59XG5cbnZhciBjb21wb25lbnQgPSB7XG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc8bmdlb09mZmxpbmVNYXAnLFxuICAgICdleHRlbnRTaXplJzogJzw/bmdlb09mZmxpbmVFeHRlbnRzaXplJyxcbiAgICAnbWFza01hcmdpbic6ICc8P25nZW9PZmZsaW5lTWFza01hcmdpbicsXG4gICAgJ21pblpvb20nOiAnPD9uZ2VvT2ZmbGluZU1pblpvb20nLFxuICAgICdtYXhab29tJzogJzw/bmdlb09mZmxpbmVNYXhab29tJ1xuICB9LFxuICBjb250cm9sbGVyOiAnbmdlb09mZmxpbmVDb250cm9sbGVyJyxcbiAgdGVtcGxhdGVVcmw6IG5nZW9PZmZsaW5lVGVtcGxhdGVVcmxcbn07XG5tb2R1bGUuY29tcG9uZW50KCduZ2VvT2ZmbGluZScsIGNvbXBvbmVudCk7XG5leHBvcnQgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiR0aW1lb3V0XCIsIFwibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCIsIFwibmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlclwiLCBcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiLCBcIm5nZW9PZmZsaW5lTW9kZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHRpbWVvdXQsIG5nZW9GZWF0dXJlT3ZlcmxheU1nciwgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlciwgbmdlb09mZmxpbmVDb25maWd1cmF0aW9uLCBuZ2VvT2ZmbGluZU1vZGUsIG5nZW9OZXR3b3JrU3RhdHVzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuJHRpbWVvdXRfID0gJHRpbWVvdXQ7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXyA9IG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXI7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICAgIHRoaXMub2ZmbGluZU1vZGUgPSBuZ2VvT2ZmbGluZU1vZGU7XG4gICAgdGhpcy5uZXR3b3JrU3RhdHVzID0gbmdlb05ldHdvcmtTdGF0dXM7XG4gICAgdGhpcy5tYXA7XG4gICAgdGhpcy5leHRlbnRTaXplID0gMDtcbiAgICB0aGlzLmZlYXR1cmVzT3ZlcmxheV8gPSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgICB0aGlzLmZlYXR1cmVzT3ZlcmxheV8uc2V0RmVhdHVyZXModGhpcy5vdmVybGF5Q29sbGVjdGlvbl8pO1xuICAgIHRoaXMucG9zdGNvbXBvc2VMaXN0ZW5lcl8gPSB0aGlzLmNyZWF0ZU1hc2tQb3N0Y29tcG9zZV8oKTtcbiAgICB0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfID0gbnVsbDtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG4gICAgdGhpcy5zZWxlY3RpbmdFeHRlbnQgPSBmYWxzZTtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gMDtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWQgPSBmYWxzZTtcbiAgICB0aGlzLmRpc3BsYXlBbGVydExvYWREYXRhID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnROb0xheWVyID0gZmFsc2U7XG4gICAgdGhpcy5tYXNrTWFyZ2luID0gMDtcbiAgICB0aGlzLm1pblpvb20gPSAwO1xuICAgIHRoaXMubWF4Wm9vbSA9IDA7XG4gICAgdGhpcy5vcmlnaW5hbE1pblpvb20gPSAwO1xuICAgIHRoaXMub3JpZ2luYWxNYXhab29tID0gMDtcbiAgICB0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA9IDA7XG5cbiAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBldmVudC5kZXRhaWxbJ3Byb2dyZXNzJ107XG4gICAgICBfdGhpcy5wcm9ncmVzc1BlcmNlbnRzID0gTWF0aC5mbG9vcihwcm9ncmVzcyAqIDEwMCk7XG5cbiAgICAgIGlmIChwcm9ncmVzcyA9PT0gMSkge1xuICAgICAgICBfdGhpcy5maW5pc2hEb3dubG9hZF8oKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuJHRpbWVvdXRfKGZ1bmN0aW9uICgpIHt9LCAwKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICB0aGlzLm9mZmxpbmVNb2RlLnJlZ2lzdGVyQ29tcG9uZW50KHRoaXMpO1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5vbigncHJvZ3Jlc3MnLCB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfKTtcbiAgICB0aGlzLm1hc2tNYXJnaW4gPSB0aGlzLm1hc2tNYXJnaW4gfHwgMTAwO1xuICAgIHRoaXMubWluWm9vbSA9IHRoaXMubWluWm9vbSB8fCAxMDtcbiAgICB0aGlzLm1heFpvb20gPSB0aGlzLm1heFpvb20gfHwgMTU7XG4gIH07XG5cbiAgX3Byb3RvLiRvbkRlc3Ryb3kgPSBmdW5jdGlvbiAkb25EZXN0cm95KCkge1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy51bigncHJvZ3Jlc3MnLCB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfKTtcbiAgfTtcblxuICBfcHJvdG8uaGFzRGF0YSA9IGZ1bmN0aW9uIGhhc0RhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5oYXNPZmZsaW5lRGF0YSgpO1xuICB9O1xuXG4gIF9wcm90by5jb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhID0gZnVuY3Rpb24gY29tcHV0ZVNpemVBbmREaXNwbGF5QWxlcnRMb2FkRGF0YSgpIHtcbiAgICB0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA9IHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXy5lc3RpbWF0ZUxvYWREYXRhU2l6ZSh0aGlzLm1hcCk7XG5cbiAgICBpZiAodGhpcy5lc3RpbWF0ZWRMb2FkRGF0YVNpemUgPiAwKSB7XG4gICAgICB0aGlzLmRpc3BsYXlBbGVydExvYWREYXRhID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5QWxlcnROb0xheWVyID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24gPSBmdW5jdGlvbiB0b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKGZpbmlzaGVkKSB7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3RpbmdFeHRlbnQgPSAhdGhpcy5zZWxlY3RpbmdFeHRlbnQ7XG5cbiAgICBpZiAodGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5Xykge1xuICAgICAgdW5CeUtleSh0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfKTtcbiAgICAgIHRoaXMucG9zdENvbXBvc2VMaXN0ZW5lcktleV8gPSBudWxsO1xuICAgICAgdGhpcy5yZW1vdmVab29tQ29uc3RyYWludHNfKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0aW5nRXh0ZW50ICYmICF0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfKSB7XG4gICAgICB0aGlzLmFkZFpvb21Db25zdHJhaW50c18oKTtcbiAgICAgIHRoaXMucG9zdENvbXBvc2VMaXN0ZW5lcktleV8gPSB0aGlzLm1hcC5vbigncG9zdGNvbXBvc2UnLCB0aGlzLnBvc3Rjb21wb3NlTGlzdGVuZXJfKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5yZW5kZXIoKTtcbiAgfTtcblxuICBfcHJvdG8udmFsaWRhdGVFeHRlbnQgPSBmdW5jdGlvbiB2YWxpZGF0ZUV4dGVudCgpIHtcbiAgICB0aGlzLnByb2dyZXNzUGVyY2VudHMgPSAwO1xuICAgIHZhciBleHRlbnQgPSB0aGlzLmdldERvd2xvYWRFeHRlbnRfKCk7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5zYXZlKGV4dGVudCwgdGhpcy5tYXApO1xuICB9O1xuXG4gIF9wcm90by5maW5pc2hEb3dubG9hZF8gPSBmdW5jdGlvbiBmaW5pc2hEb3dubG9hZF8oKSB7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbih0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8uYXNrQWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFza0Fib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uYWJvcnREb3dubG9hZCA9IGZ1bmN0aW9uIGFib3J0RG93bmxvYWQoKSB7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8uY2FuY2VsKCk7XG4gICAgdGhpcy5kZWxldGVEYXRhKCk7XG4gIH07XG5cbiAgX3Byb3RvLnNob3dNZW51ID0gZnVuY3Rpb24gc2hvd01lbnUoKSB7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uYWN0aXZhdGVPZmZsaW5lTW9kZSA9IGZ1bmN0aW9uIGFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLnJlc3RvcmUodGhpcy5tYXApLnRoZW4oZnVuY3Rpb24gKGV4dGVudCkge1xuICAgICAgX3RoaXMyLmRhdGFQb2x5Z29uXyA9IF90aGlzMi5jcmVhdGVQb2x5Z29uRnJvbUV4dGVudF8oZXh0ZW50KTtcblxuICAgICAgdmFyIHNpemUgPSBfdGhpczIubWFwLmdldFNpemUoKTtcblxuICAgICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczIubWFwLmdldFZpZXcoKS5maXQoZXh0ZW50LCB7XG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH0pO1xuXG4gICAgICBfdGhpczIubWVudURpc3BsYXllZCA9IGZhbHNlO1xuXG4gICAgICBfdGhpczIuZGlzcGxheUV4dGVudF8oKTtcblxuICAgICAgX3RoaXMyLm9mZmxpbmVNb2RlLmVuYWJsZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5kZWFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9O1xuXG4gIF9wcm90by50b2dnbGVFeHRlbnRWaXNpYmlsaXR5ID0gZnVuY3Rpb24gdG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSgpIHtcbiAgICBpZiAodGhpcy5pc0V4dGVudFZpc2libGUoKSkge1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXh0ZW50XygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaXNFeHRlbnRWaXNpYmxlID0gZnVuY3Rpb24gaXNFeHRlbnRWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5nZXRMZW5ndGgoKSA+IDA7XG4gIH07XG5cbiAgX3Byb3RvLmRlbGV0ZURhdGEgPSBmdW5jdGlvbiBkZWxldGVEYXRhKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKCkpIHtcbiAgICAgIHRoaXMubWVudURpc3BsYXllZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZWxvYWRJZkluT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiByZWxvYWRJZkluT2ZmbGluZU1vZGUoKSB7XG4gICAgICBpZiAoX3RoaXMzLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIF90aGlzMy5kZWFjdGl2YXRlT2ZmbGluZU1vZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmNsZWFyKCkudGhlbihyZWxvYWRJZkluT2ZmbGluZU1vZGUpO1xuICB9O1xuXG4gIF9wcm90by5kaXNwbGF5RXh0ZW50XyA9IGZ1bmN0aW9uIGRpc3BsYXlFeHRlbnRfKCkge1xuICAgIGlmICghdGhpcy5pc0V4dGVudFZpc2libGUoKSAmJiB0aGlzLmRhdGFQb2x5Z29uXykge1xuICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgRmVhdHVyZSh0aGlzLmRhdGFQb2x5Z29uXyk7XG4gICAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uYWRkWm9vbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uIGFkZFpvb21Db25zdHJhaW50c18oKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdmFyIHpvb20gPSB2aWV3LmdldFpvb20oKSB8fCAwO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tID0gdmlldy5nZXRNaW5ab29tKCk7XG4gICAgdGhpcy5vcmlnaW5hbE1heFpvb20gPSB2aWV3LmdldE1heFpvb20oKTtcblxuICAgIGlmICh6b29tIDwgdGhpcy5taW5ab29tKSB7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5taW5ab29tKTtcbiAgICB9IGVsc2UgaWYgKHpvb20gPiB0aGlzLm1heFpvb20pIHtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIH1cblxuICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm1pblpvb20pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVab29tQ29uc3RyYWludHNfID0gZnVuY3Rpb24gcmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB2aWV3LnNldE1heFpvb20odGhpcy5vcmlnaW5hbE1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm9yaWdpbmFsTWluWm9vbSk7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZU1hc2tQb3N0Y29tcG9zZV8gPSBmdW5jdGlvbiBjcmVhdGVNYXNrUG9zdGNvbXBvc2VfKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gZXZ0LmNvbnRleHQ7XG4gICAgICB2YXIgZnJhbWVTdGF0ZSA9IGV2dC5mcmFtZVN0YXRlO1xuXG4gICAgICBpZiAoIWNvbnRleHQgfHwgIWZyYW1lU3RhdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRleHQgb3IgZnJhbWVTdGF0ZScpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzb2x1dGlvbiA9IGZyYW1lU3RhdGUudmlld1N0YXRlLnJlc29sdXRpb247XG4gICAgICB2YXIgdmlld3BvcnRXaWR0aCA9IGZyYW1lU3RhdGUuc2l6ZVswXSAqIGZyYW1lU3RhdGUucGl4ZWxSYXRpbztcbiAgICAgIHZhciB2aWV3cG9ydEhlaWdodCA9IGZyYW1lU3RhdGUuc2l6ZVsxXSAqIGZyYW1lU3RhdGUucGl4ZWxSYXRpbztcbiAgICAgIHZhciBleHRlbnRMZW5ndGggPSBfdGhpczQuZXh0ZW50U2l6ZSA/IF90aGlzNC5leHRlbnRTaXplIC8gcmVzb2x1dGlvbiAqIERFVklDRV9QSVhFTF9SQVRJTyA6IE1hdGgubWluKHZpZXdwb3J0V2lkdGgsIHZpZXdwb3J0SGVpZ2h0KSAtIF90aGlzNC5tYXNrTWFyZ2luICogMjtcbiAgICAgIHZhciBleHRlbnRIYWxmTGVuZ3RoID0gTWF0aC5jZWlsKGV4dGVudExlbmd0aCAvIDIpO1xuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQubW92ZVRvKDAsIDApO1xuICAgICAgY29udGV4dC5saW5lVG8odmlld3BvcnRXaWR0aCwgMCk7XG4gICAgICBjb250ZXh0LmxpbmVUbyh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCk7XG4gICAgICBjb250ZXh0LmxpbmVUbygwLCB2aWV3cG9ydEhlaWdodCk7XG4gICAgICBjb250ZXh0LmxpbmVUbygwLCAwKTtcbiAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICAgIHZhciBleHRlbnQgPSBfdGhpczQuY3JlYXRlRXh0ZW50Xyhbdmlld3BvcnRXaWR0aCAvIDIsIHZpZXdwb3J0SGVpZ2h0IC8gMl0sIGV4dGVudEhhbGZMZW5ndGgpO1xuXG4gICAgICBjb250ZXh0Lm1vdmVUbyhleHRlbnRbMF0sIGV4dGVudFsxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFszXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMl0sIGV4dGVudFszXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMl0sIGV4dGVudFsxXSk7XG4gICAgICBjb250ZXh0LmxpbmVUbyhleHRlbnRbMF0sIGV4dGVudFsxXSk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCA1LCAyNSwgMC41KSc7XG4gICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICB9O1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVQb2x5Z29uRnJvbUV4dGVudF8gPSBmdW5jdGlvbiBjcmVhdGVQb2x5Z29uRnJvbUV4dGVudF8oZXh0ZW50KSB7XG4gICAgdmFyIHByb2pFeHRlbnQgPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpLmdldEV4dGVudCgpO1xuICAgIHJldHVybiBuZXcgUG9seWdvbihbZXh0ZW50VG9SZWN0YW5nbGUocHJvakV4dGVudCksIGV4dGVudFRvUmVjdGFuZ2xlKGV4dGVudCldLCBvbEdlb21HZW9tZXRyeUxheW91dC5YWSk7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZUV4dGVudF8gPSBmdW5jdGlvbiBjcmVhdGVFeHRlbnRfKGNlbnRlciwgaGFsZkxlbmd0aCkge1xuICAgIHZhciBtaW54ID0gY2VudGVyWzBdIC0gaGFsZkxlbmd0aDtcbiAgICB2YXIgbWlueSA9IGNlbnRlclsxXSAtIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1heHggPSBjZW50ZXJbMF0gKyBoYWxmTGVuZ3RoO1xuICAgIHZhciBtYXh5ID0gY2VudGVyWzFdICsgaGFsZkxlbmd0aDtcbiAgICByZXR1cm4gW21pbngsIG1pbnksIG1heHgsIG1heHldO1xuICB9O1xuXG4gIF9wcm90by5nZXREb3dsb2FkRXh0ZW50XyA9IGZ1bmN0aW9uIGdldERvd2xvYWRFeHRlbnRfKCkge1xuICAgIHZhciBjZW50ZXIgPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0Q2VudGVyKCk7XG4gICAgdmFyIGhhbGZMZW5ndGggPSBNYXRoLmNlaWwodGhpcy5leHRlbnRTaXplIHx8IHRoaXMuZ2V0RXh0ZW50U2l6ZV8oKSkgLyAyO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUV4dGVudF8oY2VudGVyLCBoYWxmTGVuZ3RoKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RXh0ZW50U2l6ZV8gPSBmdW5jdGlvbiBnZXRFeHRlbnRTaXplXygpIHtcbiAgICB2YXIgbWFwU2l6ZSA9IHRoaXMubWFwLmdldFNpemUoKSB8fCBbMTUwLCAxNTBdO1xuICAgIHZhciBtYXNrU2l6ZVBpeGVsID0gREVWSUNFX1BJWEVMX1JBVElPICogTWF0aC5taW4obWFwU2l6ZVswXSwgbWFwU2l6ZVsxXSkgLSB0aGlzLm1hc2tNYXJnaW4gKiAyO1xuICAgIHZhciBtYXNrU2l6ZU1ldGVyID0gbWFza1NpemVQaXhlbCAqICh0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpIHx8IDEpIC8gREVWSUNFX1BJWEVMX1JBVElPO1xuICAgIHJldHVybiBtYXNrU2l6ZU1ldGVyO1xuICB9O1xuXG4gIHJldHVybiBDb250cm9sbGVyO1xufSgpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ25nZW9PZmZsaW5lQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsImltcG9ydCBuZ2VvT2ZmbGluZUNvbXBvbmVudCBmcm9tICduZ2VvL29mZmxpbmUvY29tcG9uZW50LmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZU5ldHdvcmtTdGF0dXMgZnJvbSAnbmdlby9vZmZsaW5lL05ldHdvcmtTdGF0dXMuanMnO1xuaW1wb3J0IG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIgZnJvbSAnbmdlby9vZmZsaW5lL1NlcnZpY2VNYW5hZ2VyLmpzJztcbmltcG9ydCBkb3dubG9hZGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Eb3dubG9hZGVyLmpzJztcbmltcG9ydCByZXN0b3JlciBmcm9tICduZ2VvL29mZmxpbmUvUmVzdG9yZXIuanMnO1xuaW1wb3J0IG1vZGUgZnJvbSAnbmdlby9vZmZsaW5lL01vZGUuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG52YXIgZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZU1vZHVsZScsIFtuZ2VvT2ZmbGluZUNvbXBvbmVudC5uYW1lLCBuZ2VvT2ZmbGluZU5ldHdvcmtTdGF0dXMubW9kdWxlLm5hbWUsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWUsIGRvd25sb2FkZXIubW9kdWxlLm5hbWUsIHJlc3RvcmVyLm1vZHVsZS5uYW1lLCBtb2RlLm1vZHVsZS5uYW1lXSk7XG5leHBvcnRzLnZhbHVlKCduZ2VvT2ZmbGluZUd1dHRlcicsIDk2KTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IG9sTGF5ZXJHcm91cCBmcm9tICdvbC9sYXllci9Hcm91cC5qcyc7XG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VMYXllcihsYXllciwgYW5jZXN0b3JzLCB2aXNpdG9yKSB7XG4gIHZhciBkZXNjZW5kID0gdmlzaXRvcihsYXllciwgYW5jZXN0b3JzKTtcblxuICBpZiAoZGVzY2VuZCAmJiBsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJHcm91cCkge1xuICAgIGxheWVyLmdldExheWVycygpLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTGF5ZXIpIHtcbiAgICAgIHRyYXZlcnNlTGF5ZXIoY2hpbGRMYXllciwgW10uY29uY2F0KGFuY2VzdG9ycywgW2xheWVyXSksIHZpc2l0b3IpO1xuICAgIH0pO1xuICB9XG59XG52YXIgZXh0cmFjdG9yID0gbmV3IFJlZ0V4cCgnW14vXSovL1teL10rLyguKiknKTtcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVVUkwodXJsKSB7XG4gIHZhciBtYXRjaGVzID0gdXJsLm1hdGNoKGV4dHJhY3Rvcik7XG5cbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3Qgbm9ybWFsaXplIHVybCAnICsgdXJsKTtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVzWzFdO1xufSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxSkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDM0NBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaElBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlLQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25UQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9