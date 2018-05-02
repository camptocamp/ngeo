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
/******/ 			if(installedChunks[chunkId]) {
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
/* harmony import */ var _common_dependencies_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common_dependencies.js */ "./examples/common_dependencies.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/offline/module.js */ "./src/offline/module.js");
/* harmony import */ var ngeo_offline_Configuration_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/offline/Configuration.js */ "./src/offline/Configuration.js");
/* harmony import */ var ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/offline/ServiceManager.js */ "./src/offline/ServiceManager.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_11__);
var exports = {};












exports.module = angular__WEBPACK_IMPORTED_MODULE_11___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_10__["default"].module.name]);
exports.module.value('ngeoOfflineTestUrl', '../../src/offline/component.html');
ngeo_offline_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].service('ngeoOfflineConfiguration', ngeo_offline_Configuration_js__WEBPACK_IMPORTED_MODULE_9__["default"]);

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
exports.module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (exports);

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
    var waitingPromise = {};
    var promise = new Promise(function (resolve, reject) {
      waitingPromise['resolve'] = resolve;
      waitingPromise['reject'] = reject;
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



















var exports = function (_olObservable) {
  exports.$inject = ["$rootScope", "ngeoBackgroundLayerMgr", "ngeoOfflineGutter"];

  _inheritsLoose(exports, _olObservable);

  function exports($rootScope, ngeoBackgroundLayerMgr, ngeoOfflineGutter) {
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

  var _proto = exports.prototype;

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
    return this.traceGetSetItem('getItem', key, this.localforage_['getItem'](key));
  };

  _proto.removeItem = function removeItem(key) {
    return this.traceGetSetItem('removeItem', key, this.localforage_['removeItem'](key));
  };

  _proto.setItem = function setItem(key, value) {
    return this.traceGetSetItem('setItem', key, this.localforage_['setItem'](key, value));
  };

  _proto.clear = function clear() {
    this.setHasOfflineData(false);
    return this.traceGetSetItem('clear', '', this.localforage_['clear']());
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
      return this.setItem(ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["default"].normalizeURL(tile.url), tile.response);
    }

    return Promise.resolve();
  };

  _proto.onTileDownloadError = function onTileDownloadError(progress) {
    this.dispatchProgress_(progress);
    return Promise.resolve();
  };

  _proto.getExtentByZoom = function getExtentByZoom(map, layer, ancestors, userExtent) {
    var currentZoom = map.getView().getZoom();
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
      source = new ol_source_TileWMS_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        gutter: this.gutter_,
        url: source.getUrl(),
        tileGrid: tileGrid,
        attributions: source.getAttributions(),
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
      ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["default"].traverseLayer(root, [], visitLayer);
    });
    return layersItems;
  };

  _proto.createTileLoadFunction_ = function createTileLoadFunction_(offlineLayer) {
    var that = this;

    var tileLoadFunction = function tileLoadFunction(imageTile, src) {
      that.getItem(ngeo_offline_utils_js__WEBPACK_IMPORTED_MODULE_15__["default"].normalizeURL(src)).then(function (content) {
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
      var tileLoadFunction = this.createTileLoadFunction_(offlineLayer);
      var layer = this.serDes_.deserializeTileLayer(serialization, tileLoadFunction);
      return layer;
    }

    return null;
  };

  _proto.getMaxNumberOfParallelDownloads = function getMaxNumberOfParallelDownloads() {
    return 11;
  };

  return exports;
}(ol_Observable_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (exports);

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function magnitude2(a, b) {
  var magnitudeSquared = 0;

  for (var i = 0; i < a.length; ++i) {
    magnitudeSquared += Math.pow(a[1] - b[1], 2);
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
    this.tileDownloader_.cancel();
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
      var minX = void 0,
          minY = void 0,
          maxX = void 0,
          maxY = void 0;
      tileGrid.forEachTileCoord(extent, z, function (coord) {
        maxX = coord[1];
        maxY = coord[2];

        if (minX === undefined || minY === undefined) {
          minX = coord[1];
          minY = coord[2];
        }

        var url = tileUrlFunction(coord, ol_has_js__WEBPACK_IMPORTED_MODULE_0__["DEVICE_PIXEL_RATIO"], projection);
        console.assert(url);
        var tile = {
          coord: coord,
          url: url,
          response: null
        };
        queueByZ.push(tile);
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

        if (zooms.indexOf(zoom) < 0) {
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
    window['androidWrapper'] = _assertThisInitialized(_this);
    return _this;
  }

  var _proto = AndroidWrapper.prototype;

  _proto.postToBackend = function postToBackend(action) {
    var stringified = JSON.stringify(action);
    window['ngeoHost']['postMessageToAndroid'](stringified);
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
    window['iosWrapper'] = _assertThisInitialized(_this);
    return _this;
  }

  var _proto = IosWrapper.prototype;

  _proto.postToBackend = function postToBackend(action) {
    if (action['command'] === 'setItem') {
      action['args'][1] = JSON.stringify(action['args'][1]);
    }

    var stringified = JSON.stringify(action);
    window['webkit']['messageHandlers']['ios']['postMessage'](stringified);
  };

  _proto.receiveFromIos = function receiveFromIos(actionString) {
    var action = JSON.parse(actionString);
    action['args'] = (action['args'] || []).map(function (item) {
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);


var Mode = function () {
  Mode.$inject = ["ngeoOfflineConfiguration"];

  function Mode(ngeoOfflineConfiguration) {
    this.enabled_ = false;
    this.component_;
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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

    if (this.$document_['ajaxError']) {
      this.$document_['ajaxError'](function (evt, jqxhr, settings, thrownError) {
        if (!/^(canceled|abort)$/.test(thrownError)) {
          _this.check(2000);
        }
      });
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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
    obj['extent'] = tilegrid.getExtent();
    obj['minZoom'] = tilegrid.getMinZoom();
    obj['origin'] = tilegrid.getOrigin(0);
    obj['resolutions'] = tilegrid.getResolutions();
    obj['tileSize'] = tilegrid.getTileSize(tilegrid.getMinZoom());
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
    obj['extent'] = tilegrid.getExtent();
    obj['minZoom'] = tilegrid.getMinZoom();
    obj['matrixIds'] = tilegrid.getMatrixIds();
    obj['resolutions'] = resolutions;
    obj['origins'] = [];

    for (var z = 0; z < resolutions.length; ++z) {
      obj['origins'].push(tilegrid.getOrigin(z));
    }

    return JSON.stringify(obj);
  };

  _proto.deserializeTilegridWMTS = function deserializeTilegridWMTS(serialization) {
    var options = JSON.parse(serialization);
    return new ol_tilegrid_WMTS_js__WEBPACK_IMPORTED_MODULE_1__["default"](options);
  };

  _proto.serializeSourceTileWMS = function serializeSourceTileWMS(source) {
    var obj = this.createBaseObject_(source);
    obj['params'] = source.getParams();
    obj['urls'] = source.getUrls();
    obj['tileGrid'] = this.serializeTilegrid(source.getTileGrid());
    var projection = source.getProjection();

    if (projection) {
      obj['projection'] = ol_proj_js__WEBPACK_IMPORTED_MODULE_2__["get"](source.getProjection()).getCode();
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
    var sourceType = options['sourceType'];

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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

var exports = function () {
  function exports(tiles, callbacks, workers) {
    this.maxNumberOfWorkers_ = workers;
    this.wasStarted_ = false;
    this.tiles_ = tiles;
    this.callbacks_ = callbacks;
    this.allCount_ = 0;
    this.okCount_ = 0;
    this.koCount_ = 0;
    this.requestedCount_ = 0;
    this.resolvePromise_;
    this.promise_ = null;
    this.tileIndex_ = 0;
    this.cancel_ = false;
  }

  var _proto = exports.prototype;

  _proto.cancel = function cancel() {
    this.cancel_ = true;
  };

  _proto.downloadTile_ = function downloadTile_() {
    var _this = this;

    if (this.cancel_ || this.tileIndex_ >= this.tiles_.length) {
      return;
    }

    var tile = this.tiles_[this.tileIndex_++];
    var tileUrl = tile.url;
    var xhr = new XMLHttpRequest();
    xhr['tileUrl'] = tile.url;
    xhr.open('GET', tileUrl, true);
    xhr.responseType = 'blob';

    var onTileDownloaded = function onTileDownloaded() {
      if (_this.allCount_ === _this.tiles_.length) {
        _this.resolvePromise_();
      }

      _this.downloadTile_();
    };

    var errorCallback = function errorCallback(e) {
      if (_this.cancel_) {
        return;
      }

      ++_this.allCount_;
      ++_this.koCount_;
      var progress = _this.allCount_ / _this.tiles_.length;

      _this.callbacks_.onTileDownloadError(progress).then(onTileDownloaded, onTileDownloaded);
    };

    var onloadCallback = function onloadCallback(e) {
      var response = e.target.response;

      if (response && response.size !== 0) {
        blobToDataUrl(response).then(function (dataUrl) {
          if (_this.cancel_) {
            return;
          }

          ++_this.allCount_;
          ++_this.okCount_;
          tile.response = dataUrl;
          var progress = _this.allCount_ / _this.tiles_.length;

          _this.callbacks_.onTileDownloadSuccess(progress, tile).then(onTileDownloaded, onTileDownloaded);
        }, function () {
          if (_this.cancel_) {
            return;
          }

          errorCallback(e);
        });
      } else {
        if (_this.cancel_) {
          return;
        }

        ++_this.allCount_;
        ++_this.okCount_;

        _this.callbacks_.onTileDownloadSuccess(_this.allCount_ / _this.tiles_.length, tile).then(onTileDownloaded, onTileDownloaded);
      }
    };

    xhr.onload = onloadCallback;
    xhr.onerror = errorCallback;
    xhr.onabort = errorCallback;
    xhr.ontimeout = errorCallback;
    xhr.send();
    ++this.requestedCount_;
  };

  _proto.download = function download() {
    var _this2 = this;

    if (this.promise_) {
      return this.promise_;
    }

    this.promise_ = new Promise(function (resolve, reject) {
      _this2.resolvePromise_ = resolve;
    });
    console.assert(this.tiles_);

    if (this.tiles_.length === 0) {
      this.callbacks_.onTileDownloadError(1);
      this.resolvePromise_();
    } else {
      for (var i = 0; i < this.maxNumberOfWorkers_; ++i) {
        this.downloadTile_();
      }
    }

    return this.promise_;
  };

  return exports;
}();

/* harmony default export */ __webpack_exports__["default"] = (exports);

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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
    this.extentSize;
    this.featuresOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
    this.overlayCollection_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.featuresOverlay_.setFeatures(this.overlayCollection_);
    this.postcomposeListener_;
    this.postComposeListenerKey_ = null;
    this.dataPolygon_ = null;
    this.selectingExtent = false;
    this.downloading = false;
    this.progressPercents = 0;
    this.menuDisplayed = false;
    this.displayAlertAbortDownload = false;
    this.displayAlertLoadData = false;
    this.displayAlertNoLayer = false;
    this.maskMargin;
    this.minZoom;
    this.maxZoom;
    this.originalMinZoom;
    this.originalMaxZoom;
    this.estimatedLoadDataSize;

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
    this.postcomposeListener_ = this.createMaskPostcompose_();
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
    if (!this.isExtentVisible()) {
      var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.dataPolygon_);
      this.overlayCollection_.push(feature);
    }
  };

  _proto.addZoomConstraints_ = function addZoomConstraints_() {
    var view = this.map.getView();
    var zoom = view.getZoom();
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
    var mapSize = this.map.getSize();
    var maskSizePixel = ol_has_js__WEBPACK_IMPORTED_MODULE_8__["DEVICE_PIXEL_RATIO"] * Math.min(mapSize[0], mapSize[1]) - this.maskMargin * 2;
    var maskSizeMeter = maskSizePixel * this.map.getView().getResolution() / ol_has_js__WEBPACK_IMPORTED_MODULE_8__["DEVICE_PIXEL_RATIO"];
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_6__);







var exports = angular__WEBPACK_IMPORTED_MODULE_6___default.a.module('ngeoOfflineModule', [ngeo_offline_component_js__WEBPACK_IMPORTED_MODULE_0__["default"].name, ngeo_offline_NetworkStatus_js__WEBPACK_IMPORTED_MODULE_1__["default"].module.name, ngeo_offline_ServiceManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].module.name, ngeo_offline_Downloader_js__WEBPACK_IMPORTED_MODULE_3__["default"].module.name, ngeo_offline_Restorer_js__WEBPACK_IMPORTED_MODULE_4__["default"].module.name, ngeo_offline_Mode_js__WEBPACK_IMPORTED_MODULE_5__["default"].module.name]);
exports.value('ngeoOfflineGutter', 96);
/* harmony default export */ __webpack_exports__["default"] = (exports);

/***/ }),

/***/ "./src/offline/utils.js":
/*!******************************!*\
  !*** ./src/offline/utils.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Group.js */ "./node_modules/ol/layer/Group.js");
var exports = {};


exports.traverseLayer = function (layer, ancestors, visitor) {
  var descend = visitor(layer, ancestors);

  if (descend && layer instanceof ol_layer_Group_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    layer.getLayers().forEach(function (childLayer) {
      exports.traverseLayer(childLayer, [].concat(ancestors, [layer]), visitor);
    });
  }
};

var extractor = new RegExp('[^/]*//[^/]+/(.*)');

exports.normalizeURL = function (url) {
  var matches = url.match(extractor);
  return matches[1];
};

/* harmony default export */ __webpack_exports__["default"] = (exports);

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9vZmZsaW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0NvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9Mb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL0xvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTG9jYWxmb3JhZ2VJb3NXcmFwcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL01vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvTmV0d29ya1N0YXR1cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9SZXN0b3Jlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9TZXJpYWxpemVyRGVzZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1NlcnZpY2VNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL1RpbGVzRG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmbGluZS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZmxpbmUvbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmZsaW5lL3V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvZmZsaW5lXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzMxLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsInZhciBleHBvcnRzID0ge307XG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9mb250YXdlc29tZS5taW4uY3NzJztcbmltcG9ydCAnLi9vZmZsaW5lLmNzcyc7XG5pbXBvcnQgJy4vY29tbW9uX2RlcGVuZGVuY2llcy5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9PZmZsaW5lTW9kdWxlIGZyb20gJ25nZW8vb2ZmbGluZS9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiBmcm9tICduZ2VvL29mZmxpbmUvQ29uZmlndXJhdGlvbi5qcyc7XG5pbXBvcnQgTmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlciBmcm9tICduZ2VvL29mZmxpbmUvU2VydmljZU1hbmFnZXIuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5leHBvcnRzLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9PZmZsaW5lTW9kdWxlLm5hbWUsIE5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIubW9kdWxlLm5hbWVdKTtcbmV4cG9ydHMubW9kdWxlLnZhbHVlKCduZ2VvT2ZmbGluZVRlc3RVcmwnLCAnLi4vLi4vc3JjL29mZmxpbmUvY29tcG9uZW50Lmh0bWwnKTtcbm5nZW9PZmZsaW5lTW9kdWxlLnNlcnZpY2UoJ25nZW9PZmZsaW5lQ29uZmlndXJhdGlvbicsIG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbik7XG5cbnZhciBNYWluQ29udHJvbGxlciA9IGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKG5nZW9GZWF0dXJlT3ZlcmxheU1nciwgbmdlb05ldHdvcmtTdGF0dXMsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIpIHtcbiAgdGhpcy5vZmZsaW5lRXh0ZW50U2l6ZSA9IDEwMDAwO1xuICB0aGlzLm5nZW9OZXR3b3JrU3RhdHVzID0gbmdlb05ldHdvcmtTdGF0dXM7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzM1MjM3OSwgNTE3MjczM10sXG4gICAgICB6b29tOiA0XG4gICAgfSlcbiAgfSk7XG4gIG5nZW9GZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbiAgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5zZXRTYXZlU2VydmljZSgnb2ZmbGluZURvd25sb2FkZXInKTtcbiAgbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlci5zZXRSZXN0b3JlU2VydmljZSgnbmdlb09mZmxpbmVSZXN0b3JlcicpO1xufTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCIsIFwibmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlclwiXTtcbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvRmVhdHVyZU92ZXJsYXlNZ3JcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiLCBcIm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJcIl07XG5leHBvcnRzLm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwidmFyIEFjdGlvbjtcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyKCkge1xuICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmN1cnJlbnRJZF8gPSAwO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUFjdGlvbi5hcHBseSh0aGlzLCBbJ3NldEl0ZW0nXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydnZXRJdGVtJ10uY29uY2F0KGFyZ3MpKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24oJ2NsZWFyJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbmZpZyA9IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGVBY3Rpb24uYXBwbHkodGhpcywgWydjb25maWcnXS5jb25jYXQoYXJncykpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVBY3Rpb24oY29tbWFuZCkge1xuICAgIHZhciBpZCA9ICsrdGhpcy5jdXJyZW50SWRfO1xuXG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICdwbHVnaW4nOiAnbG9jYWxmb3JhZ2UnLFxuICAgICAgJ2NvbW1hbmQnOiBjb21tYW5kLFxuICAgICAgJ2FyZ3MnOiBhcmdzLFxuICAgICAgJ2lkJzogaWRcbiAgICB9O1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHt9O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgd2FpdGluZ1Byb21pc2VbJ3Jlc29sdmUnXSA9IHJlc29sdmU7XG4gICAgICB3YWl0aW5nUHJvbWlzZVsncmVqZWN0J10gPSByZWplY3Q7XG4gICAgfSk7XG4gICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLnNldChpZCwgd2FpdGluZ1Byb21pc2UpO1xuICAgIHRoaXMucG9zdFRvQmFja2VuZChhY3Rpb24pO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIF9wcm90by5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIHJlY2VpdmVNZXNzYWdlKGV2ZW50KSB7XG4gICAgdmFyIGFjdGlvbiA9IGV2ZW50WydkYXRhJ107XG4gICAgdmFyIGlkID0gYWN0aW9uWydpZCddO1xuICAgIHZhciBjb21tYW5kID0gYWN0aW9uWydjb21tYW5kJ107XG4gICAgdmFyIGFyZ3MgPSBhY3Rpb25bJ2FyZ3MnXSB8fCBbXTtcbiAgICB2YXIgY29udGV4dCA9IGFjdGlvblsnY29udGV4dCddO1xuICAgIHZhciBtc2cgPSBhY3Rpb25bJ21zZyddO1xuICAgIHZhciB3YWl0aW5nUHJvbWlzZSA9IHRoaXMud2FpdGluZ1Byb21pc2VzXy5nZXQoaWQpO1xuXG4gICAgaWYgKGNvbW1hbmQgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobXNnLCBhcmdzLCBjb250ZXh0KTtcblxuICAgICAgaWYgKHdhaXRpbmdQcm9taXNlKSB7XG4gICAgICAgIHdhaXRpbmdQcm9taXNlLnJlamVjdChhcmdzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy53YWl0aW5nUHJvbWlzZXNfLmRlbGV0ZShpZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAncmVzcG9uc2UnKSB7XG4gICAgICB3YWl0aW5nUHJvbWlzZS5yZXNvbHZlLmFwcGx5KHdhaXRpbmdQcm9taXNlLCBhcmdzKTtcbiAgICAgIHRoaXMud2FpdGluZ1Byb21pc2VzXy5kZWxldGUoaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgY29tbWFuZCcsIEpTT04uc3RyaW5naWZ5KGFjdGlvbiwgbnVsbCwgJ1xcdCcpKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge307XG5cbiAgcmV0dXJuIEFic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgb2xPYnNlcnZhYmxlIGZyb20gJ29sL09ic2VydmFibGUuanMnO1xuaW1wb3J0IG9sTGF5ZXJMYXllciBmcm9tICdvbC9sYXllci9MYXllci5qcyc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3IuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sTGF5ZXJJbWFnZSBmcm9tICdvbC9sYXllci9JbWFnZS5qcyc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvai5qcyc7XG5pbXBvcnQgeyBkZWZhdWx0SW1hZ2VMb2FkRnVuY3Rpb24gfSBmcm9tICdvbC9zb3VyY2UvSW1hZ2UuanMnO1xuaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TLmpzJztcbmltcG9ydCBvbFNvdXJjZVRpbGVXTVMgZnJvbSAnb2wvc291cmNlL1RpbGVXTVMuanMnO1xuaW1wb3J0IHsgY3JlYXRlRm9yUHJvamVjdGlvbiBhcyBjcmVhdGVUaWxlR3JpZEZvclByb2plY3Rpb24gfSBmcm9tICdvbC90aWxlZ3JpZC5qcyc7XG5pbXBvcnQgU2VyaWFsaXplckRlc2VyaWFsaXplciBmcm9tICduZ2VvL29mZmxpbmUvU2VyaWFsaXplckRlc2VyaWFsaXplci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VDb3Jkb3ZhV3JhcHBlci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvTG9jYWxmb3JhZ2VBbmRyb2lkV3JhcHBlci5qcyc7XG5pbXBvcnQgTG9jYWxmb3JhZ2VJb3NXcmFwcGVyIGZyb20gJ25nZW8vb2ZmbGluZS9Mb2NhbGZvcmFnZUlvc1dyYXBwZXIuanMnO1xuaW1wb3J0IG5nZW9DdXN0b21FdmVudCBmcm9tICduZ2VvL0N1c3RvbUV2ZW50LmpzJztcbmltcG9ydCB1dGlscyBmcm9tICduZ2VvL29mZmxpbmUvdXRpbHMuanMnO1xuaW1wb3J0IGxvY2FsZm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlL3NyYy9sb2NhbGZvcmFnZS5qcyc7XG5cbnZhciBleHBvcnRzID0gZnVuY3Rpb24gKF9vbE9ic2VydmFibGUpIHtcbiAgZXhwb3J0cy4kaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcIm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JcIiwgXCJuZ2VvT2ZmbGluZUd1dHRlclwiXTtcblxuICBfaW5oZXJpdHNMb29zZShleHBvcnRzLCBfb2xPYnNlcnZhYmxlKTtcblxuICBmdW5jdGlvbiBleHBvcnRzKCRyb290U2NvcGUsIG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3IsIG5nZW9PZmZsaW5lR3V0dGVyKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb2xPYnNlcnZhYmxlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5sb2NhbGZvcmFnZV8gPSBfdGhpcy5jcmVhdGVMb2NhbGZvcmFnZSgpO1xuXG4gICAgX3RoaXMuY29uZmlndXJlTG9jYWxmb3JhZ2UoKTtcblxuICAgIF90aGlzLnJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIF90aGlzLmhhc0RhdGEgPSBmYWxzZTtcblxuICAgIF90aGlzLmluaXRpYWxpemVIYXNPZmZsaW5lRGF0YSgpO1xuXG4gICAgX3RoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8gPSBuZ2VvQmFja2dyb3VuZExheWVyTWdyO1xuICAgIF90aGlzLnNlckRlc18gPSBuZXcgU2VyaWFsaXplckRlc2VyaWFsaXplcih7XG4gICAgICBndXR0ZXI6IG5nZW9PZmZsaW5lR3V0dGVyXG4gICAgfSk7XG4gICAgX3RoaXMuZ3V0dGVyXyA9IG5nZW9PZmZsaW5lR3V0dGVyO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBleHBvcnRzLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGlzcGF0Y2hQcm9ncmVzc18gPSBmdW5jdGlvbiBkaXNwYXRjaFByb2dyZXNzXyhwcm9ncmVzcykge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgbmdlb0N1c3RvbUV2ZW50KCdwcm9ncmVzcycsIHtcbiAgICAgICdwcm9ncmVzcyc6IHByb2dyZXNzXG4gICAgfSkpO1xuICB9O1xuXG4gIF9wcm90by5pbml0aWFsaXplSGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBpbml0aWFsaXplSGFzT2ZmbGluZURhdGEoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB0aGlzLmdldEl0ZW0oJ29mZmxpbmVfY29udGVudCcpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLnNldEhhc09mZmxpbmVEYXRhKCEhdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5oYXNPZmZsaW5lRGF0YSA9IGZ1bmN0aW9uIGhhc09mZmxpbmVEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmhhc0RhdGE7XG4gIH07XG5cbiAgX3Byb3RvLnNldEhhc09mZmxpbmVEYXRhID0gZnVuY3Rpb24gc2V0SGFzT2ZmbGluZURhdGEodmFsdWUpIHtcbiAgICB2YXIgbmVlZERpZ2VzdCA9IHZhbHVlICE9PSB0aGlzLmhhc0RhdGE7XG4gICAgdGhpcy5oYXNEYXRhID0gdmFsdWU7XG5cbiAgICBpZiAobmVlZERpZ2VzdCkge1xuICAgICAgdGhpcy5yb290U2NvcGVfLiRhcHBseUFzeW5jKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by50cmFjZUdldFNldEl0ZW0gPSBmdW5jdGlvbiB0cmFjZUdldFNldEl0ZW0obXNnLCBrZXksIHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlTG9jYWxmb3JhZ2UgPSBmdW5jdGlvbiBjcmVhdGVMb2NhbGZvcmFnZSgpIHtcbiAgICBpZiAobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdsb2NhbGZvcmFnZT1jb3Jkb3ZhJykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBjb3Jkb3ZhIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlQ29yZG92YVdyYXBwZXIoKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnbG9jYWxmb3JhZ2U9YW5kcm9pZCcpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgYW5kcm9pZCBsb2NhbGZvcmFnZScpO1xuICAgICAgcmV0dXJuIG5ldyBMb2NhbGZvcmFnZUFuZHJvaWRXcmFwcGVyKCk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2xvY2FsZm9yYWdlPWlvcycpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgaW9zIGxvY2FsZm9yYWdlJyk7XG4gICAgICByZXR1cm4gbmV3IExvY2FsZm9yYWdlSW9zV3JhcHBlcigpO1xuICAgIH1cblxuICAgIHJldHVybiBsb2NhbGZvcmFnZTtcbiAgfTtcblxuICBfcHJvdG8uY29uZmlndXJlTG9jYWxmb3JhZ2UgPSBmdW5jdGlvbiBjb25maWd1cmVMb2NhbGZvcmFnZSgpIHtcbiAgICB0aGlzLmxvY2FsZm9yYWdlXy5jb25maWcoe1xuICAgICAgJ25hbWUnOiAnbmdlb09mZmxpbmVTdG9yYWdlJyxcbiAgICAgICd2ZXJzaW9uJzogMS4wLFxuICAgICAgJ3N0b3JlTmFtZSc6ICdvZmZsaW5lU3RvcmFnZSdcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMudHJhY2VHZXRTZXRJdGVtKCdnZXRJdGVtJywga2V5LCB0aGlzLmxvY2FsZm9yYWdlX1snZ2V0SXRlbSddKGtleSkpO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3JlbW92ZUl0ZW0nLCBrZXksIHRoaXMubG9jYWxmb3JhZ2VfWydyZW1vdmVJdGVtJ10oa2V5KSk7XG4gIH07XG5cbiAgX3Byb3RvLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50cmFjZUdldFNldEl0ZW0oJ3NldEl0ZW0nLCBrZXksIHRoaXMubG9jYWxmb3JhZ2VfWydzZXRJdGVtJ10oa2V5LCB2YWx1ZSkpO1xuICB9O1xuXG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHRoaXMuc2V0SGFzT2ZmbGluZURhdGEoZmFsc2UpO1xuICAgIHJldHVybiB0aGlzLnRyYWNlR2V0U2V0SXRlbSgnY2xlYXInLCAnJywgdGhpcy5sb2NhbGZvcmFnZV9bJ2NsZWFyJ10oKSk7XG4gIH07XG5cbiAgX3Byb3RvLmVzdGltYXRlTG9hZERhdGFTaXplID0gZnVuY3Rpb24gZXN0aW1hdGVMb2FkRGF0YVNpemUobWFwKSB7XG4gICAgcmV0dXJuIDUwO1xuICB9O1xuXG4gIF9wcm90by5nZXRMYXllcktleSA9IGZ1bmN0aW9uIGdldExheWVyS2V5KGxheWVySXRlbSkge1xuICAgIHJldHVybiBsYXllckl0ZW0ubGF5ZXIuZ2V0KCdsYWJlbCcpO1xuICB9O1xuXG4gIF9wcm90by5vblRpbGVEb3dubG9hZFN1Y2Nlc3MgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZFN1Y2Nlc3MocHJvZ3Jlc3MsIHRpbGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcblxuICAgIGlmICh0aWxlLnJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRJdGVtKHV0aWxzLm5vcm1hbGl6ZVVSTCh0aWxlLnVybCksIHRpbGUucmVzcG9uc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBfcHJvdG8ub25UaWxlRG93bmxvYWRFcnJvciA9IGZ1bmN0aW9uIG9uVGlsZURvd25sb2FkRXJyb3IocHJvZ3Jlc3MpIHtcbiAgICB0aGlzLmRpc3BhdGNoUHJvZ3Jlc3NfKHByb2dyZXNzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEV4dGVudEJ5Wm9vbSA9IGZ1bmN0aW9uIGdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgY3VycmVudFpvb20gPSBtYXAuZ2V0VmlldygpLmdldFpvb20oKTtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIFswLCAxLCAyLCAzLCA0XS5mb3JFYWNoKGZ1bmN0aW9uIChkeikge1xuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgem9vbTogY3VycmVudFpvb20gKyBkeixcbiAgICAgICAgZXh0ZW50OiB1c2VyRXh0ZW50XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBfcHJvdG8uc291cmNlSW1hZ2VXTVNUb1RpbGVXTVMgPSBmdW5jdGlvbiBzb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyhzb3VyY2UsIHByb2plY3Rpb24pIHtcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VJbWFnZVdNUyAmJiBzb3VyY2UuZ2V0VXJsKCkgJiYgc291cmNlLmdldEltYWdlTG9hZEZ1bmN0aW9uKCkgPT09IGRlZmF1bHRJbWFnZUxvYWRGdW5jdGlvbikge1xuICAgICAgdmFyIHRpbGVHcmlkID0gY3JlYXRlVGlsZUdyaWRGb3JQcm9qZWN0aW9uKHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkgfHwgcHJvamVjdGlvbiwgNDIsIDI1Nik7XG4gICAgICBzb3VyY2UgPSBuZXcgb2xTb3VyY2VUaWxlV01TKHtcbiAgICAgICAgZ3V0dGVyOiB0aGlzLmd1dHRlcl8sXG4gICAgICAgIHVybDogc291cmNlLmdldFVybCgpLFxuICAgICAgICB0aWxlR3JpZDogdGlsZUdyaWQsXG4gICAgICAgIGF0dHJpYnV0aW9uczogc291cmNlLmdldEF0dHJpYnV0aW9ucygpLFxuICAgICAgICBwcm9qZWN0aW9uOiBzb3VyY2UuZ2V0UHJvamVjdGlvbigpLFxuICAgICAgICBwYXJhbXM6IHNvdXJjZS5nZXRQYXJhbXMoKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlTGF5ZXJNZXRhZGF0YXMgPSBmdW5jdGlvbiBjcmVhdGVMYXllck1ldGFkYXRhcyhtYXAsIHVzZXJFeHRlbnQpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBsYXllcnNJdGVtcyA9IFtdO1xuXG4gICAgdmFyIHZpc2l0TGF5ZXIgPSBmdW5jdGlvbiB2aXNpdExheWVyKGxheWVyLCBhbmNlc3RvcnMpIHtcbiAgICAgIGlmIChsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJMYXllcikge1xuICAgICAgICB2YXIgZXh0ZW50Qnlab29tID0gX3RoaXMzLmdldEV4dGVudEJ5Wm9vbShtYXAsIGxheWVyLCBhbmNlc3RvcnMsIHVzZXJFeHRlbnQpO1xuXG4gICAgICAgIHZhciBwcm9qZWN0aW9uID0gb2xQcm9qLmdldChtYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSk7XG5cbiAgICAgICAgdmFyIHNvdXJjZSA9IF90aGlzMy5zb3VyY2VJbWFnZVdNU1RvVGlsZVdNUyhsYXllci5nZXRTb3VyY2UoKSwgcHJvamVjdGlvbik7XG5cbiAgICAgICAgdmFyIGxheWVyVHlwZTtcbiAgICAgICAgdmFyIGxheWVyU2VyaWFsaXphdGlvbjtcblxuICAgICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVGlsZSB8fCBsYXllciBpbnN0YW5jZW9mIG9sTGF5ZXJJbWFnZSkge1xuICAgICAgICAgIGxheWVyVHlwZSA9ICd0aWxlJztcbiAgICAgICAgICBsYXllclNlcmlhbGl6YXRpb24gPSBfdGhpczMuc2VyRGVzXy5zZXJpYWxpemVUaWxlTGF5ZXIobGF5ZXIsIHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIgaW5zdGFuY2VvZiBvbExheWVyVmVjdG9yKSB7XG4gICAgICAgICAgbGF5ZXJUeXBlID0gJ3ZlY3Rvcic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmFja2dyb3VuZExheWVyID0gX3RoaXMzLm5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3JfLmdldChtYXApID09PSBsYXllcjtcbiAgICAgICAgbGF5ZXJzSXRlbXMucHVzaCh7XG4gICAgICAgICAgYmFja2dyb3VuZExheWVyOiBiYWNrZ3JvdW5kTGF5ZXIsXG4gICAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgICAgZXh0ZW50Qnlab29tOiBleHRlbnRCeVpvb20sXG4gICAgICAgICAgbGF5ZXJUeXBlOiBsYXllclR5cGUsXG4gICAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uOiBsYXllclNlcmlhbGl6YXRpb24sXG4gICAgICAgICAgbGF5ZXI6IGxheWVyLFxuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgIGFuY2VzdG9yczogYW5jZXN0b3JzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgbWFwLmdldExheWVycygpLmZvckVhY2goZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgIHV0aWxzLnRyYXZlcnNlTGF5ZXIocm9vdCwgW10sIHZpc2l0TGF5ZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBsYXllcnNJdGVtcztcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlVGlsZUxvYWRGdW5jdGlvbl8gPSBmdW5jdGlvbiBjcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyhvZmZsaW5lTGF5ZXIpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICB2YXIgdGlsZUxvYWRGdW5jdGlvbiA9IGZ1bmN0aW9uIHRpbGVMb2FkRnVuY3Rpb24oaW1hZ2VUaWxlLCBzcmMpIHtcbiAgICAgIHRoYXQuZ2V0SXRlbSh1dGlscy5ub3JtYWxpemVVUkwoc3JjKSkudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICBjb250ZW50ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBUUFBQUMxSEF3Q0FBQUFDMGxFUVZSNDJtTmtZQUFBQUFZQUFqQ0IwQzhBQUFBQVNVVk9SSzVDWUlJPSc7XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZVRpbGUuZ2V0SW1hZ2UoKS5zcmMgPSBjb250ZW50O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aWxlTG9hZEZ1bmN0aW9uO1xuICB9O1xuXG4gIF9wcm90by5yZWNyZWF0ZU9mZmxpbmVMYXllciA9IGZ1bmN0aW9uIHJlY3JlYXRlT2ZmbGluZUxheWVyKG9mZmxpbmVMYXllcikge1xuICAgIGlmIChvZmZsaW5lTGF5ZXIubGF5ZXJUeXBlID09PSAndGlsZScpIHtcbiAgICAgIHZhciBzZXJpYWxpemF0aW9uID0gb2ZmbGluZUxheWVyLmxheWVyU2VyaWFsaXphdGlvbjtcbiAgICAgIHZhciB0aWxlTG9hZEZ1bmN0aW9uID0gdGhpcy5jcmVhdGVUaWxlTG9hZEZ1bmN0aW9uXyhvZmZsaW5lTGF5ZXIpO1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5zZXJEZXNfLmRlc2VyaWFsaXplVGlsZUxheWVyKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pO1xuICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIF9wcm90by5nZXRNYXhOdW1iZXJPZlBhcmFsbGVsRG93bmxvYWRzID0gZnVuY3Rpb24gZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpIHtcbiAgICByZXR1cm4gMTE7XG4gIH07XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG59KG9sT2JzZXJ2YWJsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgcmV0dXJuIGl0Lm5leHQuYmluZChpdCk7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMuanMnO1xuaW1wb3J0IG9sU291cmNlVGlsZVdNUyBmcm9tICdvbC9zb3VyY2UvVGlsZVdNUy5qcyc7XG5pbXBvcnQgb2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTLmpzJztcbmltcG9ydCBUaWxlc0Rvd25sb2FkZXIgZnJvbSAnbmdlby9vZmZsaW5lL1RpbGVzRG93bmxvYWRlci5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxuZnVuY3Rpb24gbWFnbml0dWRlMihhLCBiKSB7XG4gIHZhciBtYWduaXR1ZGVTcXVhcmVkID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICBtYWduaXR1ZGVTcXVhcmVkICs9IE1hdGgucG93KGFbMV0gLSBiWzFdLCAyKTtcbiAgfVxuXG4gIHJldHVybiBtYWduaXR1ZGVTcXVhcmVkO1xufVxuXG52YXIgRG93bmxvYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgRG93bmxvYWRlci4kaW5qZWN0ID0gW1wibmdlb09mZmxpbmVDb25maWd1cmF0aW9uXCJdO1xuXG4gIGZ1bmN0aW9uIERvd25sb2FkZXIobmdlb09mZmxpbmVDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLnRpbGVEb3dubG9hZGVyXyA9IG51bGw7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gRG93bmxvYWRlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0aGlzLnRpbGVEb3dubG9hZGVyXy5jYW5jZWwoKTtcbiAgfTtcblxuICBfcHJvdG8ucXVldWVMYXllclRpbGVzXyA9IGZ1bmN0aW9uIHF1ZXVlTGF5ZXJUaWxlc18obGF5ZXJNZXRhZGF0YSwgcXVldWUpIHtcbiAgICB2YXIgc291cmNlID0gbGF5ZXJNZXRhZGF0YS5zb3VyY2U7XG4gICAgdmFyIG1hcCA9IGxheWVyTWV0YWRhdGEubWFwLFxuICAgICAgICBleHRlbnRCeVpvb20gPSBsYXllck1ldGFkYXRhLmV4dGVudEJ5Wm9vbTtcblxuICAgIGlmICghc291cmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5hc3NlcnQoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VUaWxlV01TIHx8IHNvdXJjZSBpbnN0YW5jZW9mIG9sU291cmNlV01UUyk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBtYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICB2YXIgdGlsZUdyaWQgPSBzb3VyY2UuZ2V0VGlsZUdyaWQoKTtcbiAgICB2YXIgdGlsZVVybEZ1bmN0aW9uID0gc291cmNlLmdldFRpbGVVcmxGdW5jdGlvbigpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KGV4dGVudEJ5Wm9vbSk7XG5cbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgIHZhciBleHRlbnRab29tID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIgeiA9IGV4dGVudFpvb20uem9vbTtcbiAgICAgIHZhciBleHRlbnQgPSBleHRlbnRab29tLmV4dGVudDtcbiAgICAgIHZhciBxdWV1ZUJ5WiA9IFtdO1xuICAgICAgdmFyIG1pblggPSB2b2lkIDAsXG4gICAgICAgICAgbWluWSA9IHZvaWQgMCxcbiAgICAgICAgICBtYXhYID0gdm9pZCAwLFxuICAgICAgICAgIG1heFkgPSB2b2lkIDA7XG4gICAgICB0aWxlR3JpZC5mb3JFYWNoVGlsZUNvb3JkKGV4dGVudCwgeiwgZnVuY3Rpb24gKGNvb3JkKSB7XG4gICAgICAgIG1heFggPSBjb29yZFsxXTtcbiAgICAgICAgbWF4WSA9IGNvb3JkWzJdO1xuXG4gICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQgfHwgbWluWSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbWluWCA9IGNvb3JkWzFdO1xuICAgICAgICAgIG1pblkgPSBjb29yZFsyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cmwgPSB0aWxlVXJsRnVuY3Rpb24oY29vcmQsIERFVklDRV9QSVhFTF9SQVRJTywgcHJvamVjdGlvbik7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHVybCk7XG4gICAgICAgIHZhciB0aWxlID0ge1xuICAgICAgICAgIGNvb3JkOiBjb29yZCxcbiAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICByZXNwb25zZTogbnVsbFxuICAgICAgICB9O1xuICAgICAgICBxdWV1ZUJ5Wi5wdXNoKHRpbGUpO1xuICAgICAgfSk7XG4gICAgICB2YXIgY2VudGVyVGlsZUNvb3JkID0gW3osIChtaW5YICsgbWF4WCkgLyAyLCAobWluWSArIG1heFkpIC8gMl07XG4gICAgICBxdWV1ZUJ5Wi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBtYWduaXR1ZGUyKGEuY29vcmQsIGNlbnRlclRpbGVDb29yZCkgLSBtYWduaXR1ZGUyKGIuY29vcmQsIGNlbnRlclRpbGVDb29yZCk7XG4gICAgICB9KTtcbiAgICAgIHF1ZXVlLnB1c2guYXBwbHkocXVldWUsIHF1ZXVlQnlaKTtcbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShleHRlbnRCeVpvb20pLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgX2xvb3AoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnNhdmUgPSBmdW5jdGlvbiBzYXZlKGV4dGVudCwgbWFwKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBsYXllcnNNZXRhZGF0YXMgPSB0aGlzLmNvbmZpZ3VyYXRpb25fLmNyZWF0ZUxheWVyTWV0YWRhdGFzKG1hcCwgZXh0ZW50KTtcbiAgICB2YXIgcGVyc2lzdGVudExheWVycyA9IFtdO1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciB6b29tcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobGF5ZXJzTWV0YWRhdGFzKSwgX3N0ZXAyOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIoKSkuZG9uZTspIHtcbiAgICAgIHZhciBsYXllckl0ZW0gPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIGlmIChsYXllckl0ZW0ubGF5ZXJUeXBlID09PSAndGlsZScpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gW107XG4gICAgICAgIHRoaXMucXVldWVMYXllclRpbGVzXyhsYXllckl0ZW0sIHRpbGVzKTtcbiAgICAgICAgcXVldWUucHVzaC5hcHBseShxdWV1ZSwgdGlsZXMpO1xuICAgICAgfVxuXG4gICAgICBwZXJzaXN0ZW50TGF5ZXJzLnB1c2goe1xuICAgICAgICBiYWNrZ3JvdW5kTGF5ZXI6IGxheWVySXRlbS5iYWNrZ3JvdW5kTGF5ZXIsXG4gICAgICAgIGxheWVyVHlwZTogbGF5ZXJJdGVtLmxheWVyVHlwZSxcbiAgICAgICAgbGF5ZXJTZXJpYWxpemF0aW9uOiBsYXllckl0ZW0ubGF5ZXJTZXJpYWxpemF0aW9uLFxuICAgICAgICBrZXk6IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TGF5ZXJLZXkobGF5ZXJJdGVtKVxuICAgICAgfSk7XG4gICAgICBsYXllckl0ZW0uZXh0ZW50Qnlab29tLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgem9vbSA9IG9iai56b29tO1xuXG4gICAgICAgIGlmICh6b29tcy5pbmRleE9mKHpvb20pIDwgMCkge1xuICAgICAgICAgIHpvb21zLnB1c2goem9vbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBwZXJzaXN0ZW50T2JqZWN0ID0ge1xuICAgICAgZXh0ZW50OiBleHRlbnQsXG4gICAgICBsYXllcnM6IHBlcnNpc3RlbnRMYXllcnMsXG4gICAgICB6b29tczogem9vbXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XG4gICAgICB9KVxuICAgIH07XG4gICAgdmFyIHNldE9mZmxpbmVDb250ZW50UHJvbWlzZSA9IHRoaXMuY29uZmlndXJhdGlvbl8uc2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JywgcGVyc2lzdGVudE9iamVjdCk7XG4gICAgdmFyIG1heERvd25sb2FkcyA9IHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0TWF4TnVtYmVyT2ZQYXJhbGxlbERvd25sb2FkcygpO1xuICAgIHRoaXMudGlsZURvd25sb2FkZXJfID0gbmV3IFRpbGVzRG93bmxvYWRlcihxdWV1ZSwgdGhpcy5jb25maWd1cmF0aW9uXywgbWF4RG93bmxvYWRzKTtcbiAgICB2YXIgdGlsZURvd25sb2FkUHJvbWlzZSA9IHRoaXMudGlsZURvd25sb2FkZXJfLmRvd25sb2FkKCk7XG4gICAgdmFyIGFsbFByb21pc2UgPSBQcm9taXNlLmFsbChbc2V0T2ZmbGluZUNvbnRlbnRQcm9taXNlLCB0aWxlRG93bmxvYWRQcm9taXNlXSk7XG5cbiAgICB2YXIgc2V0SGFzT2ZmbGluZURhdGEgPSBmdW5jdGlvbiBzZXRIYXNPZmZsaW5lRGF0YSgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb25maWd1cmF0aW9uXy5zZXRIYXNPZmZsaW5lRGF0YSh0cnVlKTtcbiAgICB9O1xuXG4gICAgYWxsUHJvbWlzZS50aGVuKHNldEhhc09mZmxpbmVEYXRhLCBzZXRIYXNPZmZsaW5lRGF0YSk7XG4gICAgcmV0dXJuIGFsbFByb21pc2U7XG4gIH07XG5cbiAgcmV0dXJuIERvd25sb2FkZXI7XG59KCk7XG5cbnZhciBuYW1lID0gJ29mZmxpbmVEb3dubG9hZGVyJztcbkRvd25sb2FkZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW10pLnNlcnZpY2UobmFtZSwgRG93bmxvYWRlcik7XG52YXIgZXhwb3J0cyA9IERvd25sb2FkZXI7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIuanMnO1xuXG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKEFuZHJvaWRXcmFwcGVyLCBfQWJzdHJhY3RXcmFwcGVyKTtcblxuICBmdW5jdGlvbiBBbmRyb2lkV3JhcHBlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9BYnN0cmFjdFdyYXBwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIHdpbmRvd1snYW5kcm9pZFdyYXBwZXInXSA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBBbmRyb2lkV3JhcHBlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnBvc3RUb0JhY2tlbmQgPSBmdW5jdGlvbiBwb3N0VG9CYWNrZW5kKGFjdGlvbikge1xuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93WyduZ2VvSG9zdCddWydwb3N0TWVzc2FnZVRvQW5kcm9pZCddKHN0cmluZ2lmaWVkKTtcbiAgfTtcblxuICBfcHJvdG8ucmVjZWl2ZUZyb21BbmRyb2lkID0gZnVuY3Rpb24gcmVjZWl2ZUZyb21BbmRyb2lkKGFjdGlvblN0cmluZykge1xuICAgIHZhciBhY3Rpb24gPSBKU09OLnBhcnNlKGFjdGlvblN0cmluZyk7XG4gICAgdGhpcy5yZWNlaXZlTWVzc2FnZSh7XG4gICAgICAnZGF0YSc6IGFjdGlvblxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBBbmRyb2lkV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBBYnN0cmFjdFdyYXBwZXIgZnJvbSAnbmdlby9vZmZsaW5lL0Fic3RyYWN0TG9jYWxmb3JhZ2VXcmFwcGVyLmpzJztcblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoX0Fic3RyYWN0V3JhcHBlcikge1xuICBfaW5oZXJpdHNMb29zZShDb3Jkb3ZhV3JhcHBlciwgX0Fic3RyYWN0V3JhcHBlcik7XG5cbiAgZnVuY3Rpb24gQ29yZG92YVdyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF90aGlzLnJlY2VpdmVNZXNzYWdlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLCBmYWxzZSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvcmRvdmFXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgd2luZG93WydwYXJlbnQnXS5wb3N0TWVzc2FnZShhY3Rpb24sICcqJyk7XG4gIH07XG5cbiAgcmV0dXJuIENvcmRvdmFXcmFwcGVyO1xufShBYnN0cmFjdFdyYXBwZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IEFic3RyYWN0V3JhcHBlciBmcm9tICduZ2VvL29mZmxpbmUvQWJzdHJhY3RMb2NhbGZvcmFnZVdyYXBwZXIuanMnO1xuXG52YXIgZXhwb3J0cyA9IGZ1bmN0aW9uIChfQWJzdHJhY3RXcmFwcGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKElvc1dyYXBwZXIsIF9BYnN0cmFjdFdyYXBwZXIpO1xuXG4gIGZ1bmN0aW9uIElvc1dyYXBwZXIoKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfQWJzdHJhY3RXcmFwcGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB3aW5kb3dbJ2lvc1dyYXBwZXInXSA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBJb3NXcmFwcGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucG9zdFRvQmFja2VuZCA9IGZ1bmN0aW9uIHBvc3RUb0JhY2tlbmQoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvblsnY29tbWFuZCddID09PSAnc2V0SXRlbScpIHtcbiAgICAgIGFjdGlvblsnYXJncyddWzFdID0gSlNPTi5zdHJpbmdpZnkoYWN0aW9uWydhcmdzJ11bMV0pO1xuICAgIH1cblxuICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGFjdGlvbik7XG4gICAgd2luZG93Wyd3ZWJraXQnXVsnbWVzc2FnZUhhbmRsZXJzJ11bJ2lvcyddWydwb3N0TWVzc2FnZSddKHN0cmluZ2lmaWVkKTtcbiAgfTtcblxuICBfcHJvdG8ucmVjZWl2ZUZyb21Jb3MgPSBmdW5jdGlvbiByZWNlaXZlRnJvbUlvcyhhY3Rpb25TdHJpbmcpIHtcbiAgICB2YXIgYWN0aW9uID0gSlNPTi5wYXJzZShhY3Rpb25TdHJpbmcpO1xuICAgIGFjdGlvblsnYXJncyddID0gKGFjdGlvblsnYXJncyddIHx8IFtdKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMucmVjZWl2ZU1lc3NhZ2Uoe1xuICAgICAgJ2RhdGEnOiBhY3Rpb25cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gSW9zV3JhcHBlcjtcbn0oQWJzdHJhY3RXcmFwcGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0czsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcblxudmFyIE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZGUuJGluamVjdCA9IFtcIm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvblwiXTtcblxuICBmdW5jdGlvbiBNb2RlKG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbikge1xuICAgIHRoaXMuZW5hYmxlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBvbmVudF87XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fID0gbmdlb09mZmxpbmVDb25maWd1cmF0aW9uO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1vZGUucHJvdG90eXBlO1xuXG4gIF9wcm90by5pc0VuYWJsZWQgPSBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZF87XG4gIH07XG5cbiAgX3Byb3RvLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWRfID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8ucmVnaXN0ZXJDb21wb25lbnQgPSBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICB0aGlzLmNvbXBvbmVudF8gPSBjb21wb25lbnQ7XG4gIH07XG5cbiAgX3Byb3RvLmFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBhY3RpdmF0ZU9mZmxpbmVNb2RlKCkge1xuICAgIHRoaXMuY29tcG9uZW50Xy5hY3RpdmF0ZU9mZmxpbmVNb2RlKCk7XG4gIH07XG5cbiAgX3Byb3RvLmhhc0RhdGEgPSBmdW5jdGlvbiBoYXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLm5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbl8uaGFzT2ZmbGluZURhdGEoKTtcbiAgfTtcblxuICByZXR1cm4gTW9kZTtcbn0oKTtcblxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvT2ZmbGluZU1vZGUnLCBbXSk7XG5tb2R1bGUuc2VydmljZSgnbmdlb09mZmxpbmVNb2RlJywgTW9kZSk7XG5Nb2RlLm1vZHVsZSA9IG1vZHVsZTtcbmV4cG9ydCBkZWZhdWx0IE1vZGU7IiwiaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgU2VydmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgU2VydmljZS4kaW5qZWN0ID0gW1wiJGRvY3VtZW50XCIsIFwiJHdpbmRvd1wiLCBcIiR0aW1lb3V0XCIsIFwiJHJvb3RTY29wZVwiLCBcIm5nZW9PZmZsaW5lVGVzdFVybFwiXTtcblxuICBmdW5jdGlvbiBTZXJ2aWNlKCRkb2N1bWVudCwgJHdpbmRvdywgJHRpbWVvdXQsICRyb290U2NvcGUsIG5nZW9PZmZsaW5lVGVzdFVybCkge1xuICAgIHRoaXMuJGRvY3VtZW50XyA9ICRkb2N1bWVudDtcbiAgICB0aGlzLiR3aW5kb3dfID0gJHdpbmRvdztcbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHJvb3RTY29wZV8gPSAkcm9vdFNjb3BlO1xuICAgIHRoaXMubmdlb09mZmxpbmVUZXN0VXJsXyA9IG5nZW9PZmZsaW5lVGVzdFVybDtcbiAgICB0aGlzLmNvdW50XyA9IDA7XG4gICAgdGhpcy5vZmZsaW5lXztcbiAgICB0aGlzLnByb21pc2VfO1xuICAgIHRoaXMuaW5pdGlhbGl6ZV8oKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdGlhbGl6ZV8gPSBmdW5jdGlvbiBpbml0aWFsaXplXygpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5vZmZsaW5lXyA9ICF0aGlzLiR3aW5kb3dfLm5hdmlnYXRvci5vbkxpbmU7XG4gICAgdGhpcy4kd2luZG93Xy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50Xyh0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLiR3aW5kb3dfLmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmNoZWNrKHVuZGVmaW5lZCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy4kZG9jdW1lbnRfWydhamF4RXJyb3InXSkge1xuICAgICAgdGhpcy4kZG9jdW1lbnRfWydhamF4RXJyb3InXShmdW5jdGlvbiAoZXZ0LCBqcXhociwgc2V0dGluZ3MsIHRocm93bkVycm9yKSB7XG4gICAgICAgIGlmICghL14oY2FuY2VsZWR8YWJvcnQpJC8udGVzdCh0aHJvd25FcnJvcikpIHtcbiAgICAgICAgICBfdGhpcy5jaGVjaygyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jaGVjayA9IGZ1bmN0aW9uIGNoZWNrKHRpbWVvdXQpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICB0aGlzLiR0aW1lb3V0Xy5jYW5jZWwodGhpcy5wcm9taXNlXyk7XG4gICAgICB0aGlzLnByb21pc2VfID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY291bnRfKys7XG4gICAgICB0aGlzLnByb21pc2VfID0gdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmNoZWNrKCk7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogdGhpcy5uZ2VvT2ZmbGluZVRlc3RVcmxfLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8gPSAwO1xuXG4gICAgICAgIGlmIChfdGhpczIub2ZmbGluZV8pIHtcbiAgICAgICAgICBfdGhpczIudHJpZ2dlckNoYW5nZVN0YXR1c0V2ZW50XyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgIF90aGlzMi5jb3VudF8rKztcblxuICAgICAgICBpZiAoX3RoaXMyLmNvdW50XyA+IDIgJiYgIV90aGlzMi5vZmZsaW5lXykge1xuICAgICAgICAgIF90aGlzMi50cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnRyaWdnZXJDaGFuZ2VTdGF0dXNFdmVudF8gPSBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlU3RhdHVzRXZlbnRfKG9mZmxpbmUpIHtcbiAgICB0aGlzLm9mZmxpbmVfID0gb2ZmbGluZTtcbiAgICB0aGlzLiRyb290U2NvcGVfLiRkaWdlc3QoKTtcbiAgfTtcblxuICBfcHJvdG8uaXNEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbiBpc0Rpc2Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLm9mZmxpbmVfO1xuICB9O1xuXG4gIHJldHVybiBTZXJ2aWNlO1xufSgpO1xuXG52YXIgbmFtZSA9ICduZ2VvTmV0d29ya1N0YXR1cyc7XG5TZXJ2aWNlLm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcblNlcnZpY2UubW9kdWxlLnNlcnZpY2UobmFtZSwgU2VydmljZSk7XG5cbnZhciBodHRwSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiBodHRwSW50ZXJjZXB0b3IoJHEsIG5nZW9EZWJvdW5jZSwgbmdlb05ldHdvcmtTdGF0dXMpIHtcbiAgdmFyIGRlYm91bmNlZENoZWNrID0gbmdlb0RlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmdlb05ldHdvcmtTdGF0dXMuY2hlY2sodW5kZWZpbmVkKTtcbiAgfSwgMjAwMCwgZmFsc2UpO1xuICByZXR1cm4ge1xuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH0sXG4gICAgcmVxdWVzdEVycm9yOiBmdW5jdGlvbiByZXF1ZXN0RXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfSxcbiAgICByZXNwb25zZTogZnVuY3Rpb24gcmVzcG9uc2UoX3Jlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gX3Jlc3BvbnNlO1xuICAgIH0sXG4gICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgIGRlYm91bmNlZENoZWNrKCk7XG4gICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4gICAgfVxuICB9O1xufTtcblxuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuaHR0cEludGVyY2VwdG9yLiRpbmplY3QgPSBbXCIkcVwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcIm5nZW9OZXR3b3JrU3RhdHVzXCJdO1xuU2VydmljZS5tb2R1bGUuZmFjdG9yeSgnaHR0cEludGVyY2VwdG9yJywgaHR0cEludGVyY2VwdG9yKTtcblxuU2VydmljZS5tb2R1bGUuY29uZmlnRnVuY3Rpb25fID0gZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnaHR0cEludGVyY2VwdG9yJyk7XG59O1xuXG5TZXJ2aWNlLm1vZHVsZS5jb25maWdGdW5jdGlvbl8uJGluamVjdCA9IFtcIiRodHRwUHJvdmlkZXJcIl07XG5TZXJ2aWNlLm1vZHVsZS5jb25maWcoU2VydmljZS5tb2R1bGUuY29uZmlnRnVuY3Rpb25fKTtcblNlcnZpY2UubW9kdWxlLnZhbHVlKCduZ2VvT2ZmbGluZVRlc3RVcmwnLCAnJyk7XG52YXIgZXhwb3J0cyA9IFNlcnZpY2U7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsImZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IHJldHVybiBpdC5uZXh0LmJpbmQoaXQpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuaW1wb3J0IG5nZW9NYXBCYWNrZ3JvdW5kTGF5ZXJNZ3IgZnJvbSAnbmdlby9tYXAvQmFja2dyb3VuZExheWVyTWdyLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuXG52YXIgUmVzdG9yZXIgPSBmdW5jdGlvbiAoKSB7XG4gIFJlc3RvcmVyLiRpbmplY3QgPSBbXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIiwgXCJuZ2VvQmFja2dyb3VuZExheWVyTWdyXCJdO1xuXG4gIGZ1bmN0aW9uIFJlc3RvcmVyKG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiwgbmdlb0JhY2tncm91bmRMYXllck1ncikge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbl8gPSBuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy5uZ2VvQmFja2dyb3VuZExheWVyTWdyXyA9IG5nZW9CYWNrZ3JvdW5kTGF5ZXJNZ3I7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUmVzdG9yZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZXN0b3JlID0gZnVuY3Rpb24gcmVzdG9yZShtYXApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbl8uZ2V0SXRlbSgnb2ZmbGluZV9jb250ZW50JykudGhlbihmdW5jdGlvbiAob2ZmbGluZUNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5kb1Jlc3RvcmUobWFwLCBvZmZsaW5lQ29udGVudCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmRvUmVzdG9yZSA9IGZ1bmN0aW9uIGRvUmVzdG9yZShtYXAsIG9mZmxpbmVDb250ZW50KSB7XG4gICAgbWFwLmdldExheWVyR3JvdXAoKS5nZXRMYXllcnMoKS5jbGVhcigpO1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvZmZsaW5lQ29udGVudC5sYXllcnMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgdmFyIG9mZmxpbmVMYXllciA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5jb25maWd1cmF0aW9uXy5yZWNyZWF0ZU9mZmxpbmVMYXllcihvZmZsaW5lTGF5ZXIpO1xuXG4gICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKGxheWVyKTtcblxuICAgICAgICBpZiAob2ZmbGluZUxheWVyLmJhY2tncm91bmRMYXllcikge1xuICAgICAgICAgIHRoaXMubmdlb0JhY2tncm91bmRMYXllck1ncl8uc2V0KG1hcCwgbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZmxpbmVDb250ZW50LmV4dGVudDtcbiAgfTtcblxuICByZXR1cm4gUmVzdG9yZXI7XG59KCk7XG5cbnZhciBuYW1lID0gJ25nZW9PZmZsaW5lUmVzdG9yZXInO1xuUmVzdG9yZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSwgW25nZW9NYXBCYWNrZ3JvdW5kTGF5ZXJNZ3IubmFtZV0pLnNlcnZpY2UobmFtZSwgUmVzdG9yZXIpO1xudmFyIGV4cG9ydHMgPSBSZXN0b3JlcjtcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IE9sVGlsZWdyaWRUaWxlR3JpZCBmcm9tICdvbC90aWxlZ3JpZC9UaWxlR3JpZC5qcyc7XG5pbXBvcnQgT2xUaWxlZ3JpZFdNVFMgZnJvbSAnb2wvdGlsZWdyaWQvV01UUy5qcyc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvai5qcyc7XG5pbXBvcnQgT2xTb3VyY2VUaWxlV01TIGZyb20gJ29sL3NvdXJjZS9UaWxlV01TLmpzJztcbmltcG9ydCBPbFNvdXJjZVdNVFMgZnJvbSAnb2wvc291cmNlL1dNVFMuanMnO1xuaW1wb3J0IE9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuXG52YXIgU2VyRGVzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTZXJEZXMoX3JlZikge1xuICAgIHZhciBndXR0ZXIgPSBfcmVmLmd1dHRlcjtcbiAgICB0aGlzLmd1dHRlcl8gPSBndXR0ZXI7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gU2VyRGVzLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY3JlYXRlQmFzZU9iamVjdF8gPSBmdW5jdGlvbiBjcmVhdGVCYXNlT2JqZWN0XyhvbE9iamVjdCkge1xuICAgIHZhciBwcm9wZXJ0aWVzID0gb2xPYmplY3QuZ2V0UHJvcGVydGllcygpO1xuICAgIHZhciBvYmogPSB7fTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICB2YXIgdHlwZU9mID0gdHlwZW9mIHZhbHVlO1xuXG4gICAgICBpZiAodHlwZU9mID09PSAnc3RyaW5nJyB8fCB0eXBlT2YgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplVGlsZWdyaWQgPSBmdW5jdGlvbiBzZXJpYWxpemVUaWxlZ3JpZCh0aWxlZ3JpZCkge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICBvYmpbJ2V4dGVudCddID0gdGlsZWdyaWQuZ2V0RXh0ZW50KCk7XG4gICAgb2JqWydtaW5ab29tJ10gPSB0aWxlZ3JpZC5nZXRNaW5ab29tKCk7XG4gICAgb2JqWydvcmlnaW4nXSA9IHRpbGVncmlkLmdldE9yaWdpbigwKTtcbiAgICBvYmpbJ3Jlc29sdXRpb25zJ10gPSB0aWxlZ3JpZC5nZXRSZXNvbHV0aW9ucygpO1xuICAgIG9ialsndGlsZVNpemUnXSA9IHRpbGVncmlkLmdldFRpbGVTaXplKHRpbGVncmlkLmdldE1pblpvb20oKSk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH07XG5cbiAgX3Byb3RvLmRlc2VyaWFsaXplVGlsZWdyaWQgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVRpbGVncmlkKHNlcmlhbGl6YXRpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgcmV0dXJuIG5ldyBPbFRpbGVncmlkVGlsZUdyaWQob3B0aW9ucyk7XG4gIH07XG5cbiAgX3Byb3RvLnNlcmlhbGl6ZVRpbGVncmlkV01UUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVRpbGVncmlkV01UUyh0aWxlZ3JpZCkge1xuICAgIGlmICghdGlsZWdyaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciByZXNvbHV0aW9ucyA9IHRpbGVncmlkLmdldFJlc29sdXRpb25zKCk7XG4gICAgb2JqWydleHRlbnQnXSA9IHRpbGVncmlkLmdldEV4dGVudCgpO1xuICAgIG9ialsnbWluWm9vbSddID0gdGlsZWdyaWQuZ2V0TWluWm9vbSgpO1xuICAgIG9ialsnbWF0cml4SWRzJ10gPSB0aWxlZ3JpZC5nZXRNYXRyaXhJZHMoKTtcbiAgICBvYmpbJ3Jlc29sdXRpb25zJ10gPSByZXNvbHV0aW9ucztcbiAgICBvYmpbJ29yaWdpbnMnXSA9IFtdO1xuXG4gICAgZm9yICh2YXIgeiA9IDA7IHogPCByZXNvbHV0aW9ucy5sZW5ndGg7ICsreikge1xuICAgICAgb2JqWydvcmlnaW5zJ10ucHVzaCh0aWxlZ3JpZC5nZXRPcmlnaW4oeikpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVRpbGVncmlkV01UUyA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplVGlsZWdyaWRXTVRTKHNlcmlhbGl6YXRpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgcmV0dXJuIG5ldyBPbFRpbGVncmlkV01UUyhvcHRpb25zKTtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplU291cmNlVGlsZVdNUyA9IGZ1bmN0aW9uIHNlcmlhbGl6ZVNvdXJjZVRpbGVXTVMoc291cmNlKSB7XG4gICAgdmFyIG9iaiA9IHRoaXMuY3JlYXRlQmFzZU9iamVjdF8oc291cmNlKTtcbiAgICBvYmpbJ3BhcmFtcyddID0gc291cmNlLmdldFBhcmFtcygpO1xuICAgIG9ialsndXJscyddID0gc291cmNlLmdldFVybHMoKTtcbiAgICBvYmpbJ3RpbGVHcmlkJ10gPSB0aGlzLnNlcmlhbGl6ZVRpbGVncmlkKHNvdXJjZS5nZXRUaWxlR3JpZCgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IHNvdXJjZS5nZXRQcm9qZWN0aW9uKCk7XG5cbiAgICBpZiAocHJvamVjdGlvbikge1xuICAgICAgb2JqWydwcm9qZWN0aW9uJ10gPSBvbFByb2ouZ2V0KHNvdXJjZS5nZXRQcm9qZWN0aW9uKCkpLmdldENvZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgfTtcblxuICBfcHJvdG8uZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TID0gZnVuY3Rpb24gZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgb3B0aW9ucy50aWxlTG9hZEZ1bmN0aW9uID0gdGlsZUxvYWRGdW5jdGlvbjtcblxuICAgIGlmIChvcHRpb25zLnRpbGVHcmlkKSB7XG4gICAgICBvcHRpb25zLnRpbGVHcmlkID0gdGhpcy5kZXNlcmlhbGl6ZVRpbGVncmlkKG9wdGlvbnMudGlsZUdyaWQpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuZ3V0dGVyID0gdGhpcy5ndXR0ZXJfO1xuICAgIHJldHVybiBuZXcgT2xTb3VyY2VUaWxlV01TKG9wdGlvbnMpO1xuICB9O1xuXG4gIF9wcm90by5zZXJpYWxpemVTb3VyY2VXTVRTID0gZnVuY3Rpb24gc2VyaWFsaXplU291cmNlV01UUyhzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGhpcy5jcmVhdGVCYXNlT2JqZWN0Xyhzb3VyY2UpO1xuICAgIG9iai5kaW1lbnNpb25zID0gc291cmNlLmdldERpbWVuc2lvbnMoKTtcbiAgICBvYmouZm9ybWF0ID0gc291cmNlLmdldEZvcm1hdCgpO1xuICAgIG9iai51cmxzID0gc291cmNlLmdldFVybHMoKTtcbiAgICBvYmoudmVyc2lvbiA9IHNvdXJjZS5nZXRWZXJzaW9uKCk7XG4gICAgb2JqLmxheWVyID0gc291cmNlLmdldExheWVyKCk7XG4gICAgb2JqLnN0eWxlID0gc291cmNlLmdldFN0eWxlKCk7XG4gICAgb2JqLm1hdHJpeFNldCA9IHNvdXJjZS5nZXRNYXRyaXhTZXQoKTtcbiAgICB2YXIgdGlsZUdyaWRXTVRTID0gc291cmNlLmdldFRpbGVHcmlkKCk7XG4gICAgb2JqLnRpbGVHcmlkID0gdGhpcy5zZXJpYWxpemVUaWxlZ3JpZFdNVFModGlsZUdyaWRXTVRTKTtcbiAgICBvYmoucmVxdWVzdEVuY29kaW5nID0gc291cmNlLmdldFJlcXVlc3RFbmNvZGluZygpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gc291cmNlLmdldFByb2plY3Rpb24oKTtcblxuICAgIGlmIChwcm9qZWN0aW9uKSB7XG4gICAgICBvYmoucHJvamVjdGlvbiA9IG9sUHJvai5nZXQoc291cmNlLmdldFByb2plY3Rpb24oKSkuZ2V0Q29kZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVNvdXJjZVdNVFMgPSBmdW5jdGlvbiBkZXNlcmlhbGl6ZVNvdXJjZVdNVFMoc2VyaWFsaXphdGlvbiwgdGlsZUxvYWRGdW5jdGlvbikge1xuICAgIHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzZXJpYWxpemF0aW9uKTtcbiAgICBvcHRpb25zLnRpbGVMb2FkRnVuY3Rpb24gPSB0aWxlTG9hZEZ1bmN0aW9uO1xuXG4gICAgaWYgKG9wdGlvbnMudGlsZUdyaWQpIHtcbiAgICAgIG9wdGlvbnMudGlsZUdyaWQgPSB0aGlzLmRlc2VyaWFsaXplVGlsZWdyaWRXTVRTKG9wdGlvbnMudGlsZUdyaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT2xTb3VyY2VXTVRTKG9wdGlvbnMpO1xuICB9O1xuXG4gIF9wcm90by5tYWtlSW5maW5pdHlTZXJpYWxpemFibGVfID0gZnVuY3Rpb24gbWFrZUluZmluaXR5U2VyaWFsaXphYmxlXyhudW1iZXIpIHtcbiAgICBpZiAobnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIDEwMDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBfcHJvdG8uc2VyaWFsaXplVGlsZUxheWVyID0gZnVuY3Rpb24gc2VyaWFsaXplVGlsZUxheWVyKGxheWVyLCBzb3VyY2UpIHtcbiAgICB2YXIgb2JqID0gdGhpcy5jcmVhdGVCYXNlT2JqZWN0XyhsYXllcik7XG4gICAgb2JqLm9wYWNpdHkgPSBsYXllci5nZXRPcGFjaXR5KCk7XG4gICAgb2JqLnZpc2libGUgPSBsYXllci5nZXRWaXNpYmxlKCk7XG4gICAgb2JqLm1pblJlc29sdXRpb24gPSBsYXllci5nZXRNaW5SZXNvbHV0aW9uKCk7XG4gICAgb2JqLm1heFJlc29sdXRpb24gPSB0aGlzLm1ha2VJbmZpbml0eVNlcmlhbGl6YWJsZV8obGF5ZXIuZ2V0TWF4UmVzb2x1dGlvbigpKTtcbiAgICBvYmouekluZGV4ID0gbGF5ZXIuZ2V0WkluZGV4KCk7XG4gICAgc291cmNlID0gc291cmNlIHx8IGxheWVyLmdldFNvdXJjZSgpO1xuXG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE9sU291cmNlVGlsZVdNUykge1xuICAgICAgb2JqLnNvdXJjZSA9IHRoaXMuc2VyaWFsaXplU291cmNlVGlsZVdNUyhzb3VyY2UpO1xuICAgICAgb2JqLnNvdXJjZVR5cGUgPSAndGlsZVdNUyc7XG4gICAgfSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPbFNvdXJjZVdNVFMpIHtcbiAgICAgIG9iai5zb3VyY2UgPSB0aGlzLnNlcmlhbGl6ZVNvdXJjZVdNVFMoc291cmNlKTtcbiAgICAgIG9iai5zb3VyY2VUeXBlID0gJ1dNVFMnO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopO1xuICB9O1xuXG4gIF9wcm90by5kZXNlcmlhbGl6ZVRpbGVMYXllciA9IGZ1bmN0aW9uIGRlc2VyaWFsaXplVGlsZUxheWVyKHNlcmlhbGl6YXRpb24sIHRpbGVMb2FkRnVuY3Rpb24pIHtcbiAgICB2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2Uoc2VyaWFsaXphdGlvbik7XG4gICAgdmFyIHNvdXJjZVR5cGUgPSBvcHRpb25zWydzb3VyY2VUeXBlJ107XG5cbiAgICBpZiAoc291cmNlVHlwZSA9PT0gJ3RpbGVXTVMnKSB7XG4gICAgICBvcHRpb25zLnNvdXJjZSA9IHRoaXMuZGVzZXJpYWxpemVTb3VyY2VUaWxlV01TKG9wdGlvbnMuc291cmNlLCB0aWxlTG9hZEZ1bmN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHNvdXJjZVR5cGUgPT09ICdXTVRTJykge1xuICAgICAgb3B0aW9ucy5zb3VyY2UgPSB0aGlzLmRlc2VyaWFsaXplU291cmNlV01UUyhvcHRpb25zLnNvdXJjZSwgdGlsZUxvYWRGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPbExheWVyVGlsZShvcHRpb25zKTtcbiAgfTtcblxuICByZXR1cm4gU2VyRGVzO1xufSgpO1xuXG52YXIgZXhwb3J0cyA9IFNlckRlcztcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5cbnZhciBTZXJ2aWNlTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgU2VydmljZU1hbmFnZXIuJGluamVjdCA9IFtcIiRpbmplY3RvclwiXTtcblxuICBmdW5jdGlvbiBTZXJ2aWNlTWFuYWdlcigkaW5qZWN0b3IpIHtcbiAgICB0aGlzLiRpbmplY3Rvcl8gPSAkaW5qZWN0b3I7XG4gICAgdGhpcy5zYXZlU2VydmljZV8gPSBudWxsO1xuICAgIHRoaXMucmVzdG9yZVNlcnZpY2VfID0gbnVsbDtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTZXJ2aWNlTWFuYWdlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmdldE9mZmxpbmVTZXJ2aWNlXyA9IGZ1bmN0aW9uIGdldE9mZmxpbmVTZXJ2aWNlXyhzZXJ2aWNlTGlrZSwgbWV0aG9kKSB7XG4gICAgaWYgKHR5cGVvZiBzZXJ2aWNlTGlrZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICghdGhpcy4kaW5qZWN0b3JfLmhhcyhzZXJ2aWNlTGlrZSkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBvZmZsaW5lIFwiICsgbWV0aG9kICsgXCIgc2VydmljZSBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNlcnZpY2UgPSB0aGlzLiRpbmplY3Rvcl8uZ2V0KHNlcnZpY2VMaWtlKTtcblxuICAgICAgaWYgKCFzZXJ2aWNlW21ldGhvZF0pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlRoZSBvZmZsaW5lIHNlcnZpY2UgXCIgKyBzZXJ2aWNlTGlrZSArIFwiIGRvZXMgbm90IGhhdmUgYSBcIiArIG1ldGhvZCArIFwiIG1ldGhvZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbiAgICBpZiAoIXNlcnZpY2VMaWtlW21ldGhvZF0pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJUaGUgcHJvdmlkZWQgb2ZmbGluZSBzZXJ2aWNlIGRvZXMgbm90IGhhdmUgYSBcIiArIG1ldGhvZCArIFwiIG1ldGhvZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VydmljZUxpa2U7XG4gIH07XG5cbiAgX3Byb3RvLnNldFNhdmVTZXJ2aWNlID0gZnVuY3Rpb24gc2V0U2F2ZVNlcnZpY2Uoc2F2ZUxpa2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5zYXZlU2VydmljZV8gPSB0aGlzLmdldE9mZmxpbmVTZXJ2aWNlXyhzYXZlTGlrZVNlcnZpY2UsICdzYXZlJyk7XG4gIH07XG5cbiAgX3Byb3RvLnNldFJlc3RvcmVTZXJ2aWNlID0gZnVuY3Rpb24gc2V0UmVzdG9yZVNlcnZpY2UocmVzdG9yZUxpa2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5yZXN0b3JlU2VydmljZV8gPSB0aGlzLmdldE9mZmxpbmVTZXJ2aWNlXyhyZXN0b3JlTGlrZVNlcnZpY2UsICdyZXN0b3JlJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAoIXRoaXMuc2F2ZVNlcnZpY2VfKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1lvdSBtdXN0IHJlZ2lzdGVyIGEgc2F2ZVNlcnZpY2UgZmlyc3QnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNhdmVTZXJ2aWNlXy5jYW5jZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uc2F2ZSA9IGZ1bmN0aW9uIHNhdmUoZXh0ZW50LCBtYXApIHtcbiAgICBpZiAoIXRoaXMuc2F2ZVNlcnZpY2VfKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1lvdSBtdXN0IHJlZ2lzdGVyIGEgc2F2ZVNlcnZpY2UgZmlyc3QnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNhdmVTZXJ2aWNlXy5zYXZlKGV4dGVudCwgbWFwKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdG9yZSA9IGZ1bmN0aW9uIHJlc3RvcmUobWFwKSB7XG4gICAgaWYgKCF0aGlzLnJlc3RvcmVTZXJ2aWNlXykge1xuICAgICAgY29uc29sZS53YXJuKCdZb3UgbXVzdCByZWdpc3RlciBhIHJlc3RvcmVTZXJ2aWNlIGZpcnN0Jyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXN0b3JlU2VydmljZV8ucmVzdG9yZShtYXApO1xuICB9O1xuXG4gIHJldHVybiBTZXJ2aWNlTWFuYWdlcjtcbn0oKTtcblxuU2VydmljZU1hbmFnZXIubW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lU2VydmljZU1hbmFnZXInLCBbXSk7XG5TZXJ2aWNlTWFuYWdlci5tb2R1bGUuc2VydmljZSgnbmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcicsIFNlcnZpY2VNYW5hZ2VyKTtcbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VNYW5hZ2VyOyIsImZ1bmN0aW9uIGJsb2JUb0RhdGFVcmwoYmxvYikge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgfTtcblxuICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICB9KTtcbn1cblxudmFyIGV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGV4cG9ydHModGlsZXMsIGNhbGxiYWNrcywgd29ya2Vycykge1xuICAgIHRoaXMubWF4TnVtYmVyT2ZXb3JrZXJzXyA9IHdvcmtlcnM7XG4gICAgdGhpcy53YXNTdGFydGVkXyA9IGZhbHNlO1xuICAgIHRoaXMudGlsZXNfID0gdGlsZXM7XG4gICAgdGhpcy5jYWxsYmFja3NfID0gY2FsbGJhY2tzO1xuICAgIHRoaXMuYWxsQ291bnRfID0gMDtcbiAgICB0aGlzLm9rQ291bnRfID0gMDtcbiAgICB0aGlzLmtvQ291bnRfID0gMDtcbiAgICB0aGlzLnJlcXVlc3RlZENvdW50XyA9IDA7XG4gICAgdGhpcy5yZXNvbHZlUHJvbWlzZV87XG4gICAgdGhpcy5wcm9taXNlXyA9IG51bGw7XG4gICAgdGhpcy50aWxlSW5kZXhfID0gMDtcbiAgICB0aGlzLmNhbmNlbF8gPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBleHBvcnRzLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRoaXMuY2FuY2VsXyA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmRvd25sb2FkVGlsZV8gPSBmdW5jdGlvbiBkb3dubG9hZFRpbGVfKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5jYW5jZWxfIHx8IHRoaXMudGlsZUluZGV4XyA+PSB0aGlzLnRpbGVzXy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGlsZSA9IHRoaXMudGlsZXNfW3RoaXMudGlsZUluZGV4XysrXTtcbiAgICB2YXIgdGlsZVVybCA9IHRpbGUudXJsO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHJbJ3RpbGVVcmwnXSA9IHRpbGUudXJsO1xuICAgIHhoci5vcGVuKCdHRVQnLCB0aWxlVXJsLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuXG4gICAgdmFyIG9uVGlsZURvd25sb2FkZWQgPSBmdW5jdGlvbiBvblRpbGVEb3dubG9hZGVkKCkge1xuICAgICAgaWYgKF90aGlzLmFsbENvdW50XyA9PT0gX3RoaXMudGlsZXNfLmxlbmd0aCkge1xuICAgICAgICBfdGhpcy5yZXNvbHZlUHJvbWlzZV8oKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMuZG93bmxvYWRUaWxlXygpO1xuICAgIH07XG5cbiAgICB2YXIgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2soZSkge1xuICAgICAgaWYgKF90aGlzLmNhbmNlbF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICArK190aGlzLmFsbENvdW50XztcbiAgICAgICsrX3RoaXMua29Db3VudF87XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBfdGhpcy5hbGxDb3VudF8gLyBfdGhpcy50aWxlc18ubGVuZ3RoO1xuXG4gICAgICBfdGhpcy5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkRXJyb3IocHJvZ3Jlc3MpLnRoZW4ob25UaWxlRG93bmxvYWRlZCwgb25UaWxlRG93bmxvYWRlZCk7XG4gICAgfTtcblxuICAgIHZhciBvbmxvYWRDYWxsYmFjayA9IGZ1bmN0aW9uIG9ubG9hZENhbGxiYWNrKGUpIHtcbiAgICAgIHZhciByZXNwb25zZSA9IGUudGFyZ2V0LnJlc3BvbnNlO1xuXG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc2l6ZSAhPT0gMCkge1xuICAgICAgICBibG9iVG9EYXRhVXJsKHJlc3BvbnNlKS50aGVuKGZ1bmN0aW9uIChkYXRhVXJsKSB7XG4gICAgICAgICAgaWYgKF90aGlzLmNhbmNlbF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICArK190aGlzLmFsbENvdW50XztcbiAgICAgICAgICArK190aGlzLm9rQ291bnRfO1xuICAgICAgICAgIHRpbGUucmVzcG9uc2UgPSBkYXRhVXJsO1xuICAgICAgICAgIHZhciBwcm9ncmVzcyA9IF90aGlzLmFsbENvdW50XyAvIF90aGlzLnRpbGVzXy5sZW5ndGg7XG5cbiAgICAgICAgICBfdGhpcy5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkU3VjY2Vzcyhwcm9ncmVzcywgdGlsZSkudGhlbihvblRpbGVEb3dubG9hZGVkLCBvblRpbGVEb3dubG9hZGVkKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpcy5jYW5jZWxfKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMuY2FuY2VsXykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICsrX3RoaXMuYWxsQ291bnRfO1xuICAgICAgICArK190aGlzLm9rQ291bnRfO1xuXG4gICAgICAgIF90aGlzLmNhbGxiYWNrc18ub25UaWxlRG93bmxvYWRTdWNjZXNzKF90aGlzLmFsbENvdW50XyAvIF90aGlzLnRpbGVzXy5sZW5ndGgsIHRpbGUpLnRoZW4ob25UaWxlRG93bmxvYWRlZCwgb25UaWxlRG93bmxvYWRlZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vbmxvYWQgPSBvbmxvYWRDYWxsYmFjaztcbiAgICB4aHIub25lcnJvciA9IGVycm9yQ2FsbGJhY2s7XG4gICAgeGhyLm9uYWJvcnQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckNhbGxiYWNrO1xuICAgIHhoci5zZW5kKCk7XG4gICAgKyt0aGlzLnJlcXVlc3RlZENvdW50XztcbiAgfTtcblxuICBfcHJvdG8uZG93bmxvYWQgPSBmdW5jdGlvbiBkb3dubG9hZCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLnByb21pc2VfKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9taXNlXztcbiAgICB9XG5cbiAgICB0aGlzLnByb21pc2VfID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgX3RoaXMyLnJlc29sdmVQcm9taXNlXyA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgY29uc29sZS5hc3NlcnQodGhpcy50aWxlc18pO1xuXG4gICAgaWYgKHRoaXMudGlsZXNfLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5jYWxsYmFja3NfLm9uVGlsZURvd25sb2FkRXJyb3IoMSk7XG4gICAgICB0aGlzLnJlc29sdmVQcm9taXNlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWF4TnVtYmVyT2ZXb3JrZXJzXzsgKytpKSB7XG4gICAgICAgIHRoaXMuZG93bmxvYWRUaWxlXygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xuICB9O1xuXG4gIHJldHVybiBleHBvcnRzO1xufSgpO1xuXG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJtYWluLWJ1dHRvblwiPlxcbiAgPHNwYW4gbmctaWY9XCIhJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJuby1kYXRhXCIgbmctY2xpY2s9XCIkY3RybC50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKClcIj48L2Rpdj5cXG4gIDwvc3Bhbj5cXG4gIDxzcGFuIG5nLWlmPVwiJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJ3aXRoLWRhdGFcIiBuZy1jbGljaz1cIiRjdHJsLnNob3dNZW51KClcIj48L2Rpdj5cXG4gIDwvc3Bhbj5cXG48L2Rpdj5cXG5cXG48ZGl2IG5nLWlmPVwiJGN0cmwuc2VsZWN0aW5nRXh0ZW50ICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIiBjbGFzcz1cInZhbGlkYXRlLWV4dGVudCBidG4gYnRuLXByaW1hcnlcIj5cXG4gIDxkaXYgbmctaWY9XCIhJGN0cmwuZG93bmxvYWRpbmdcIiBuZy1jbGljaz1cIiRjdHJsLmNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEoKVwiIHRyYW5zbGF0ZT5TYXZlIG1hcDwvZGl2PlxcbiAgPGRpdiBuZy1pZj1cIiRjdHJsLmRvd25sb2FkaW5nXCIgbmctY2xpY2s9XCIkY3RybC5hc2tBYm9ydERvd25sb2FkKClcIiB0cmFuc2xhdGU+QWJvcnQ8L2Rpdj5cXG48L2Rpdj5cXG5cXG5cXG48ZGl2IG5nLWlmPVwiJGN0cmwuZG93bmxvYWRpbmdcIiBjbGFzcz1cImluLXByb2dyZXNzXCI+XFxuICA8ZGl2Pnt7JGN0cmwucHJvZ3Jlc3NQZXJjZW50c319JTwvZGl2PlxcbjwvZGl2PlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwubWVudURpc3BsYXllZFwiPlxcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJ7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cIj5cXG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+T2ZmbGluZSBtYXA8L2g0PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcbiAgICA8ZGl2IG5nLWlmPVwiJGN0cmwuaGFzRGF0YSgpXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJleHRlbnQtem9vbSBidG4gYnRuLWRlZmF1bHRcIlxcbiAgICAgICAgICAgICAgbmctaWY9XCIhJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5hY3RpdmF0ZU9mZmxpbmVNb2RlKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPkFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZXh0ZW50LXpvb20gYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKCkgJiYgISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRlYWN0aXZhdGVPZmZsaW5lTW9kZSgpXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5EZWFjdGl2YXRlIG9mZmxpbmUgbW9kZVxcbiAgICAgIDwvYnV0dG9uPlxcblxcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZXh0ZW50LXNob3cgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiJGN0cmwub2ZmbGluZU1vZGUuaXNFbmFibGVkKClcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC50b2dnbGVFeHRlbnRWaXNpYmlsaXR5KClcIj5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiJGN0cmwuaXNFeHRlbnRWaXNpYmxlKClcIiB0cmFuc2xhdGU+SGlkZSBleHRlbnQ8L3NwYW4+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cIiEkY3RybC5pc0V4dGVudFZpc2libGUoKVwiIHRyYW5zbGF0ZSA+U2hvdyBleHRlbnQ8L3NwYW4+XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIG5nLWlmPVwiISRjdHJsLm5ldHdvcmtTdGF0dXMuaXNEaXNjb25uZWN0ZWQoKVwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLmRpc3BsYXlBbGVydERlc3Ryb3lEYXRhID0gdHJ1ZVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+RGVsZXRlIGRhdGFcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctaWY9XCIhJGN0cmwuaGFzRGF0YSgpICYmICEkY3RybC5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKClcIj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5ldy1kYXRhIGJ0biBidG4tZGVmYXVsdFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+U2F2ZSBuZXcgbWFwXFxuICAgICAgPC9idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0TG9hZERhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPn57eyRjdHJsLmVzdGltYXRlZExvYWREYXRhU2l6ZX19TUIgb2YgbWFwcyB3aWxsIGJlIGRvd25sb2FkZWQgKHVudGlsIHNjYWxlIDE6MjVcXCcwMDApIC0gRG9uXFwndCBsb2NrIHlvdXIgZGV2aWNlIG9yIG5hdmlnYXRlIGF3YXkgZnJvbSB0aGlzIHNpdGUgZHVyaW5nIHRoZSBkb3dubG9hZCBwcm9jZXNzLiBEZWFjdGl2YXRlIFwicHJpdmF0ZVwiIG1vZGUgb2YgeW91ciBicm93c2VyLjwvcD5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInZhbGlkYXRlIGJ0biBidG4tcHJpbWFyeVwiXFxuICAgICAgICAgICAgICBkYXRhLWRpc21pc3M9XCJtb2RhbFwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cIiRjdHJsLnZhbGlkYXRlRXh0ZW50KClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5DYW5jZWxcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydE5vTGF5ZXJcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPk5vIG1hcHMgc2VsZWN0ZWQgZm9yIHNhdmluZy48L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5Pa1xcbiAgICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuPC9uZ2VvLW1vZGFsPlxcblxcbjxuZ2VvLW1vZGFsIG5nLW1vZGVsPVwiJGN0cmwuZGlzcGxheUFsZXJ0RGVzdHJveURhdGFcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPkRvIHlvdSByZWFsbHkgd2FudCB0byByZW1vdmUgeW91ciBkYXRhID88L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5kZWxldGVEYXRhKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIHRyYW5zbGF0ZT5DYW5jZWxcXG4gICAgICA8L2J1dHRvbj5cXG4gIDwvZGl2Plxcbjwvbmdlby1tb2RhbD5cXG5cXG48bmdlby1tb2RhbCBuZy1tb2RlbD1cIiRjdHJsLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWRcIj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXG4gICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiB0cmFuc2xhdGU+V2FybmluZzwvaDQ+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuICAgICAgPHAgdHJhbnNsYXRlPkRvIHlvdSByZWFsbHkgd2FudCB0byByZW1vdmUgeW91ciBkYXRhID88L3A+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ2YWxpZGF0ZSBidG4gYnRuLXByaW1hcnlcIlxcbiAgICAgICAgICAgICAgZGF0YS1kaXNtaXNzPVwibW9kYWxcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCIkY3RybC5hYm9ydERvd25sb2FkKClcIlxcbiAgICAgICAgICAgICAgdHJhbnNsYXRlPk9rXFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkZWxldGUgYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiJGN0cmwuZm9sbG93RG93bmxvYWRQcm9ncmVzc2lvbl8oKVwiXFxuICAgICAgICAgICAgICB0cmFuc2xhdGU+Q2FuY2VsXFxuICAgICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG48L25nZW8tbW9kYWw+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsImltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3IuanMnO1xuaW1wb3J0IG5nZW9NZXNzYWdlTW9kYWxDb21wb25lbnQgZnJvbSAnbmdlby9tZXNzYWdlL21vZGFsQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IGV4dGVudFRvUmVjdGFuZ2xlIH0gZnJvbSAnbmdlby91dGlscy5qcyc7XG5pbXBvcnQgT2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24uanMnO1xuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUuanMnO1xuaW1wb3J0IE9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlLmpzJztcbmltcG9ydCBPbEdlb21Qb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbi5qcyc7XG5pbXBvcnQgb2xHZW9tR2VvbWV0cnlMYXlvdXQgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeUxheW91dC5qcyc7XG5pbXBvcnQgeyBERVZJQ0VfUElYRUxfUkFUSU8gfSBmcm9tICdvbC9oYXMuanMnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9PZmZsaW5lJywgW25nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvTWVzc2FnZU1vZGFsQ29tcG9uZW50Lm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnbmdlb09mZmxpbmVUZW1wbGF0ZVVybCcsIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSBhdHRyc1snbmdlb09mZmxpbmVUZW1wbGF0ZXVybCddO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vb2ZmbGluZS9jb21wb25lbnQuaHRtbCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5odG1sJywgcmVxdWlyZSgnLi9jb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbm5nZW9PZmZsaW5lVGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwiJGF0dHJzXCIsIFwibmdlb09mZmxpbmVUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gbmdlb09mZmxpbmVUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMpO1xufVxuXG52YXIgY29tcG9uZW50ID0ge1xuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9PZmZsaW5lTWFwJyxcbiAgICAnZXh0ZW50U2l6ZSc6ICc8P25nZW9PZmZsaW5lRXh0ZW50c2l6ZScsXG4gICAgJ21hc2tNYXJnaW4nOiAnPD9uZ2VvT2ZmbGluZU1hc2tNYXJnaW4nLFxuICAgICdtaW5ab29tJzogJzw/bmdlb09mZmxpbmVNaW5ab29tJyxcbiAgICAnbWF4Wm9vbSc6ICc8P25nZW9PZmZsaW5lTWF4Wm9vbSdcbiAgfSxcbiAgY29udHJvbGxlcjogJ25nZW9PZmZsaW5lQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlVXJsOiBuZ2VvT2ZmbGluZVRlbXBsYXRlVXJsXG59O1xubW9kdWxlLmNvbXBvbmVudCgnbmdlb09mZmxpbmUnLCBjb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkdGltZW91dFwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJcIiwgXCJuZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25cIiwgXCJuZ2VvT2ZmbGluZU1vZGVcIiwgXCJuZ2VvTmV0d29ya1N0YXR1c1wiXTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IsIG5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXIsIG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbiwgbmdlb09mZmxpbmVNb2RlLCBuZ2VvTmV0d29ya1N0YXR1cykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8gPSBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyO1xuICAgIHRoaXMubmdlb09mZmxpbmVDb25maWd1cmF0aW9uXyA9IG5nZW9PZmZsaW5lQ29uZmlndXJhdGlvbjtcbiAgICB0aGlzLm9mZmxpbmVNb2RlID0gbmdlb09mZmxpbmVNb2RlO1xuICAgIHRoaXMubmV0d29ya1N0YXR1cyA9IG5nZW9OZXR3b3JrU3RhdHVzO1xuICAgIHRoaXMubWFwO1xuICAgIHRoaXMuZXh0ZW50U2l6ZTtcbiAgICB0aGlzLmZlYXR1cmVzT3ZlcmxheV8gPSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXyA9IG5ldyBPbENvbGxlY3Rpb24oKTtcbiAgICB0aGlzLmZlYXR1cmVzT3ZlcmxheV8uc2V0RmVhdHVyZXModGhpcy5vdmVybGF5Q29sbGVjdGlvbl8pO1xuICAgIHRoaXMucG9zdGNvbXBvc2VMaXN0ZW5lcl87XG4gICAgdGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5XyA9IG51bGw7XG4gICAgdGhpcy5kYXRhUG9seWdvbl8gPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW5nRXh0ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IDA7XG4gICAgdGhpcy5tZW51RGlzcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRBYm9ydERvd25sb2FkID0gZmFsc2U7XG4gICAgdGhpcy5kaXNwbGF5QWxlcnRMb2FkRGF0YSA9IGZhbHNlO1xuICAgIHRoaXMuZGlzcGxheUFsZXJ0Tm9MYXllciA9IGZhbHNlO1xuICAgIHRoaXMubWFza01hcmdpbjtcbiAgICB0aGlzLm1pblpvb207XG4gICAgdGhpcy5tYXhab29tO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tO1xuICAgIHRoaXMub3JpZ2luYWxNYXhab29tO1xuICAgIHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplO1xuXG4gICAgdGhpcy5wcm9ncmVzc0NhbGxiYWNrXyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyIHByb2dyZXNzID0gZXZlbnQuZGV0YWlsWydwcm9ncmVzcyddO1xuICAgICAgX3RoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MgKiAxMDApO1xuXG4gICAgICBpZiAocHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgX3RoaXMuZmluaXNoRG93bmxvYWRfKCk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7fSwgMCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDb250cm9sbGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uJG9uSW5pdCA9IGZ1bmN0aW9uICRvbkluaXQoKSB7XG4gICAgdGhpcy5vZmZsaW5lTW9kZS5yZWdpc3RlckNvbXBvbmVudCh0aGlzKTtcbiAgICB0aGlzLnBvc3Rjb21wb3NlTGlzdGVuZXJfID0gdGhpcy5jcmVhdGVNYXNrUG9zdGNvbXBvc2VfKCk7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLm9uKCdwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18pO1xuICAgIHRoaXMubWFza01hcmdpbiA9IHRoaXMubWFza01hcmdpbiB8fCAxMDA7XG4gICAgdGhpcy5taW5ab29tID0gdGhpcy5taW5ab29tIHx8IDEwO1xuICAgIHRoaXMubWF4Wm9vbSA9IHRoaXMubWF4Wm9vbSB8fCAxNTtcbiAgfTtcblxuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLnVuKCdwcm9ncmVzcycsIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18pO1xuICB9O1xuXG4gIF9wcm90by5oYXNEYXRhID0gZnVuY3Rpb24gaGFzRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmhhc09mZmxpbmVEYXRhKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXB1dGVTaXplQW5kRGlzcGxheUFsZXJ0TG9hZERhdGEgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZUFuZERpc3BsYXlBbGVydExvYWREYXRhKCkge1xuICAgIHRoaXMuZXN0aW1hdGVkTG9hZERhdGFTaXplID0gdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmVzdGltYXRlTG9hZERhdGFTaXplKHRoaXMubWFwKTtcblxuICAgIGlmICh0aGlzLmVzdGltYXRlZExvYWREYXRhU2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZGlzcGxheUFsZXJ0TG9hZERhdGEgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc3BsYXlBbGVydE5vTGF5ZXIgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8udG9nZ2xlVmlld0V4dGVudFNlbGVjdGlvbiA9IGZ1bmN0aW9uIHRvZ2dsZVZpZXdFeHRlbnRTZWxlY3Rpb24oZmluaXNoZWQpIHtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGluZ0V4dGVudCA9ICF0aGlzLnNlbGVjdGluZ0V4dGVudDtcblxuICAgIGlmICh0aGlzLnBvc3RDb21wb3NlTGlzdGVuZXJLZXlfKSB7XG4gICAgICB1bkJ5S2V5KHRoaXMucG9zdENvbXBvc2VMaXN0ZW5lcktleV8pO1xuICAgICAgdGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5XyA9IG51bGw7XG4gICAgICB0aGlzLnJlbW92ZVpvb21Db25zdHJhaW50c18oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RpbmdFeHRlbnQgJiYgIXRoaXMucG9zdENvbXBvc2VMaXN0ZW5lcktleV8pIHtcbiAgICAgIHRoaXMuYWRkWm9vbUNvbnN0cmFpbnRzXygpO1xuICAgICAgdGhpcy5wb3N0Q29tcG9zZUxpc3RlbmVyS2V5XyA9IHRoaXMubWFwLm9uKCdwb3N0Y29tcG9zZScsIHRoaXMucG9zdGNvbXBvc2VMaXN0ZW5lcl8pO1xuICAgIH1cblxuICAgIHRoaXMubWFwLnJlbmRlcigpO1xuICB9O1xuXG4gIF9wcm90by52YWxpZGF0ZUV4dGVudCA9IGZ1bmN0aW9uIHZhbGlkYXRlRXh0ZW50KCkge1xuICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50cyA9IDA7XG4gICAgdmFyIGV4dGVudCA9IHRoaXMuZ2V0RG93bG9hZEV4dGVudF8oKTtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLm5nZW9PZmZsaW5lU2VydmljZU1hbmFnZXJfLnNhdmUoZXh0ZW50LCB0aGlzLm1hcCk7XG4gIH07XG5cbiAgX3Byb3RvLmZpbmlzaERvd25sb2FkXyA9IGZ1bmN0aW9uIGZpbmlzaERvd25sb2FkXygpIHtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy50b2dnbGVWaWV3RXh0ZW50U2VsZWN0aW9uKHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5hc2tBYm9ydERvd25sb2FkID0gZnVuY3Rpb24gYXNrQWJvcnREb3dubG9hZCgpIHtcbiAgICB0aGlzLmRpc3BsYXlBbGVydEFib3J0RG93bmxvYWQgPSB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5hYm9ydERvd25sb2FkID0gZnVuY3Rpb24gYWJvcnREb3dubG9hZCgpIHtcbiAgICB0aGlzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5uZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyXy5jYW5jZWwoKTtcbiAgICB0aGlzLmRlbGV0ZURhdGEoKTtcbiAgfTtcblxuICBfcHJvdG8uc2hvd01lbnUgPSBmdW5jdGlvbiBzaG93TWVudSgpIHtcbiAgICB0aGlzLm1lbnVEaXNwbGF5ZWQgPSB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5hY3RpdmF0ZU9mZmxpbmVNb2RlID0gZnVuY3Rpb24gYWN0aXZhdGVPZmZsaW5lTW9kZSgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHRoaXMubmdlb09mZmxpbmVTZXJ2aWNlTWFuYWdlcl8ucmVzdG9yZSh0aGlzLm1hcCkudGhlbihmdW5jdGlvbiAoZXh0ZW50KSB7XG4gICAgICBfdGhpczIuZGF0YVBvbHlnb25fID0gX3RoaXMyLmNyZWF0ZVBvbHlnb25Gcm9tRXh0ZW50XyhleHRlbnQpO1xuXG4gICAgICB2YXIgc2l6ZSA9IF90aGlzMi5tYXAuZ2V0U2l6ZSgpO1xuXG4gICAgICBfdGhpczIubWFwLmdldFZpZXcoKS5maXQoZXh0ZW50LCB7XG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH0pO1xuXG4gICAgICBfdGhpczIubWVudURpc3BsYXllZCA9IGZhbHNlO1xuXG4gICAgICBfdGhpczIuZGlzcGxheUV4dGVudF8oKTtcblxuICAgICAgX3RoaXMyLm9mZmxpbmVNb2RlLmVuYWJsZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5kZWFjdGl2YXRlT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlT2ZmbGluZU1vZGUoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9O1xuXG4gIF9wcm90by50b2dnbGVFeHRlbnRWaXNpYmlsaXR5ID0gZnVuY3Rpb24gdG9nZ2xlRXh0ZW50VmlzaWJpbGl0eSgpIHtcbiAgICBpZiAodGhpcy5pc0V4dGVudFZpc2libGUoKSkge1xuICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5RXh0ZW50XygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uaXNFeHRlbnRWaXNpYmxlID0gZnVuY3Rpb24gaXNFeHRlbnRWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5nZXRMZW5ndGgoKSA+IDA7XG4gIH07XG5cbiAgX3Byb3RvLmRlbGV0ZURhdGEgPSBmdW5jdGlvbiBkZWxldGVEYXRhKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8uY2xlYXIoKTtcbiAgICB0aGlzLmRhdGFQb2x5Z29uXyA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5uZXR3b3JrU3RhdHVzLmlzRGlzY29ubmVjdGVkKCkpIHtcbiAgICAgIHRoaXMubWVudURpc3BsYXllZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByZWxvYWRJZkluT2ZmbGluZU1vZGUgPSBmdW5jdGlvbiByZWxvYWRJZkluT2ZmbGluZU1vZGUoKSB7XG4gICAgICBpZiAoX3RoaXMzLm9mZmxpbmVNb2RlLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIF90aGlzMy5kZWFjdGl2YXRlT2ZmbGluZU1vZGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5uZ2VvT2ZmbGluZUNvbmZpZ3VyYXRpb25fLmNsZWFyKCkudGhlbihyZWxvYWRJZkluT2ZmbGluZU1vZGUpO1xuICB9O1xuXG4gIF9wcm90by5kaXNwbGF5RXh0ZW50XyA9IGZ1bmN0aW9uIGRpc3BsYXlFeHRlbnRfKCkge1xuICAgIGlmICghdGhpcy5pc0V4dGVudFZpc2libGUoKSkge1xuICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgT2xGZWF0dXJlKHRoaXMuZGF0YVBvbHlnb25fKTtcbiAgICAgIHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5hZGRab29tQ29uc3RyYWludHNfID0gZnVuY3Rpb24gYWRkWm9vbUNvbnN0cmFpbnRzXygpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB2YXIgem9vbSA9IHZpZXcuZ2V0Wm9vbSgpO1xuICAgIHRoaXMub3JpZ2luYWxNaW5ab29tID0gdmlldy5nZXRNaW5ab29tKCk7XG4gICAgdGhpcy5vcmlnaW5hbE1heFpvb20gPSB2aWV3LmdldE1heFpvb20oKTtcblxuICAgIGlmICh6b29tIDwgdGhpcy5taW5ab29tKSB7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5taW5ab29tKTtcbiAgICB9IGVsc2UgaWYgKHpvb20gPiB0aGlzLm1heFpvb20pIHtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIH1cblxuICAgIHZpZXcuc2V0TWF4Wm9vbSh0aGlzLm1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm1pblpvb20pO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVab29tQ29uc3RyYWludHNfID0gZnVuY3Rpb24gcmVtb3ZlWm9vbUNvbnN0cmFpbnRzXygpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB2aWV3LnNldE1heFpvb20odGhpcy5vcmlnaW5hbE1heFpvb20pO1xuICAgIHZpZXcuc2V0TWluWm9vbSh0aGlzLm9yaWdpbmFsTWluWm9vbSk7XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZU1hc2tQb3N0Y29tcG9zZV8gPSBmdW5jdGlvbiBjcmVhdGVNYXNrUG9zdGNvbXBvc2VfKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gZXZ0LmNvbnRleHQ7XG4gICAgICB2YXIgZnJhbWVTdGF0ZSA9IGV2dC5mcmFtZVN0YXRlO1xuICAgICAgdmFyIHJlc29sdXRpb24gPSBmcmFtZVN0YXRlLnZpZXdTdGF0ZS5yZXNvbHV0aW9uO1xuICAgICAgdmFyIHZpZXdwb3J0V2lkdGggPSBmcmFtZVN0YXRlLnNpemVbMF0gKiBmcmFtZVN0YXRlLnBpeGVsUmF0aW87XG4gICAgICB2YXIgdmlld3BvcnRIZWlnaHQgPSBmcmFtZVN0YXRlLnNpemVbMV0gKiBmcmFtZVN0YXRlLnBpeGVsUmF0aW87XG4gICAgICB2YXIgZXh0ZW50TGVuZ3RoID0gX3RoaXM0LmV4dGVudFNpemUgPyBfdGhpczQuZXh0ZW50U2l6ZSAvIHJlc29sdXRpb24gKiBERVZJQ0VfUElYRUxfUkFUSU8gOiBNYXRoLm1pbih2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCkgLSBfdGhpczQubWFza01hcmdpbiAqIDI7XG4gICAgICB2YXIgZXh0ZW50SGFsZkxlbmd0aCA9IE1hdGguY2VpbChleHRlbnRMZW5ndGggLyAyKTtcbiAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBjb250ZXh0Lm1vdmVUbygwLCAwKTtcbiAgICAgIGNvbnRleHQubGluZVRvKHZpZXdwb3J0V2lkdGgsIDApO1xuICAgICAgY29udGV4dC5saW5lVG8odmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgY29udGV4dC5saW5lVG8oMCwgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgY29udGV4dC5saW5lVG8oMCwgMCk7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICB2YXIgZXh0ZW50ID0gX3RoaXM0LmNyZWF0ZUV4dGVudF8oW3ZpZXdwb3J0V2lkdGggLyAyLCB2aWV3cG9ydEhlaWdodCAvIDJdLCBleHRlbnRIYWxmTGVuZ3RoKTtcblxuICAgICAgY29udGV4dC5tb3ZlVG8oZXh0ZW50WzBdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzBdLCBleHRlbnRbM10pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbM10pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzJdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5saW5lVG8oZXh0ZW50WzBdLCBleHRlbnRbMV0pO1xuICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgNSwgMjUsIDAuNSknO1xuICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlUG9seWdvbkZyb21FeHRlbnRfKGV4dGVudCkge1xuICAgIHZhciBwcm9qRXh0ZW50ID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKS5nZXRFeHRlbnQoKTtcbiAgICByZXR1cm4gbmV3IE9sR2VvbVBvbHlnb24oW2V4dGVudFRvUmVjdGFuZ2xlKHByb2pFeHRlbnQpLCBleHRlbnRUb1JlY3RhbmdsZShleHRlbnQpXSwgb2xHZW9tR2VvbWV0cnlMYXlvdXQuWFkpO1xuICB9O1xuXG4gIF9wcm90by5jcmVhdGVFeHRlbnRfID0gZnVuY3Rpb24gY3JlYXRlRXh0ZW50XyhjZW50ZXIsIGhhbGZMZW5ndGgpIHtcbiAgICB2YXIgbWlueCA9IGNlbnRlclswXSAtIGhhbGZMZW5ndGg7XG4gICAgdmFyIG1pbnkgPSBjZW50ZXJbMV0gLSBoYWxmTGVuZ3RoO1xuICAgIHZhciBtYXh4ID0gY2VudGVyWzBdICsgaGFsZkxlbmd0aDtcbiAgICB2YXIgbWF4eSA9IGNlbnRlclsxXSArIGhhbGZMZW5ndGg7XG4gICAgcmV0dXJuIFttaW54LCBtaW55LCBtYXh4LCBtYXh5XTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RG93bG9hZEV4dGVudF8gPSBmdW5jdGlvbiBnZXREb3dsb2FkRXh0ZW50XygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIHZhciBoYWxmTGVuZ3RoID0gTWF0aC5jZWlsKHRoaXMuZXh0ZW50U2l6ZSB8fCB0aGlzLmdldEV4dGVudFNpemVfKCkpIC8gMjtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVFeHRlbnRfKGNlbnRlciwgaGFsZkxlbmd0aCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEV4dGVudFNpemVfID0gZnVuY3Rpb24gZ2V0RXh0ZW50U2l6ZV8oKSB7XG4gICAgdmFyIG1hcFNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG4gICAgdmFyIG1hc2tTaXplUGl4ZWwgPSBERVZJQ0VfUElYRUxfUkFUSU8gKiBNYXRoLm1pbihtYXBTaXplWzBdLCBtYXBTaXplWzFdKSAtIHRoaXMubWFza01hcmdpbiAqIDI7XG4gICAgdmFyIG1hc2tTaXplTWV0ZXIgPSBtYXNrU2l6ZVBpeGVsICogdGhpcy5tYXAuZ2V0VmlldygpLmdldFJlc29sdXRpb24oKSAvIERFVklDRV9QSVhFTF9SQVRJTztcbiAgICByZXR1cm4gbWFza1NpemVNZXRlcjtcbiAgfTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcbm1vZHVsZS5jb250cm9sbGVyKCduZ2VvT2ZmbGluZUNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJpbXBvcnQgbmdlb09mZmxpbmVDb21wb25lbnQgZnJvbSAnbmdlby9vZmZsaW5lL2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzIGZyb20gJ25nZW8vb2ZmbGluZS9OZXR3b3JrU3RhdHVzLmpzJztcbmltcG9ydCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyIGZyb20gJ25nZW8vb2ZmbGluZS9TZXJ2aWNlTWFuYWdlci5qcyc7XG5pbXBvcnQgZG93bmxvYWRlciBmcm9tICduZ2VvL29mZmxpbmUvRG93bmxvYWRlci5qcyc7XG5pbXBvcnQgcmVzdG9yZXIgZnJvbSAnbmdlby9vZmZsaW5lL1Jlc3RvcmVyLmpzJztcbmltcG9ydCBtb2RlIGZyb20gJ25nZW8vb2ZmbGluZS9Nb2RlLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xudmFyIGV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb09mZmxpbmVNb2R1bGUnLCBbbmdlb09mZmxpbmVDb21wb25lbnQubmFtZSwgbmdlb09mZmxpbmVOZXR3b3JrU3RhdHVzLm1vZHVsZS5uYW1lLCBuZ2VvT2ZmbGluZVNlcnZpY2VNYW5hZ2VyLm1vZHVsZS5uYW1lLCBkb3dubG9hZGVyLm1vZHVsZS5uYW1lLCByZXN0b3Jlci5tb2R1bGUubmFtZSwgbW9kZS5tb2R1bGUubmFtZV0pO1xuZXhwb3J0cy52YWx1ZSgnbmdlb09mZmxpbmVHdXR0ZXInLCA5Nik7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRzOyIsInZhciBleHBvcnRzID0ge307XG5pbXBvcnQgb2xMYXllckdyb3VwIGZyb20gJ29sL2xheWVyL0dyb3VwLmpzJztcblxuZXhwb3J0cy50cmF2ZXJzZUxheWVyID0gZnVuY3Rpb24gKGxheWVyLCBhbmNlc3RvcnMsIHZpc2l0b3IpIHtcbiAgdmFyIGRlc2NlbmQgPSB2aXNpdG9yKGxheWVyLCBhbmNlc3RvcnMpO1xuXG4gIGlmIChkZXNjZW5kICYmIGxheWVyIGluc3RhbmNlb2Ygb2xMYXllckdyb3VwKSB7XG4gICAgbGF5ZXIuZ2V0TGF5ZXJzKCkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRMYXllcikge1xuICAgICAgZXhwb3J0cy50cmF2ZXJzZUxheWVyKGNoaWxkTGF5ZXIsIFtdLmNvbmNhdChhbmNlc3RvcnMsIFtsYXllcl0pLCB2aXNpdG9yKTtcbiAgICB9KTtcbiAgfVxufTtcblxudmFyIGV4dHJhY3RvciA9IG5ldyBSZWdFeHAoJ1teL10qLy9bXi9dKy8oLiopJyk7XG5cbmV4cG9ydHMubm9ybWFsaXplVVJMID0gZnVuY3Rpb24gKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9IHVybC5tYXRjaChleHRyYWN0b3IpO1xuICByZXR1cm4gbWF0Y2hlc1sxXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDelBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNySkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5S0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzU0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9