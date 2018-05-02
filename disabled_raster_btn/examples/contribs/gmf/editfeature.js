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
/******/ 		"editfeature": 0
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
/******/ 	deferredModules.push([7,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/editfeature.css":
/*!***********************************************!*\
  !*** ./contribs/gmf/examples/editfeature.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./contribs/gmf/examples/editfeature.js":
/*!**********************************************!*\
  !*** ./contribs/gmf/examples/editfeature.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./contribs/gmf/examples/url.js");
/* harmony import */ var _editfeature_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editfeature.css */ "./contribs/gmf/examples/editfeature.css");
/* harmony import */ var _editfeature_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editfeature_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery_ui_ui_widgets_tooltip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery-ui/ui/widgets/tooltip.js */ "./node_modules/jquery-ui/ui/widgets/tooltip.js");
/* harmony import */ var jquery_ui_ui_widgets_tooltip_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_tooltip_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ "./node_modules/@geoblocks/proj/src/EPSG_21781.js");
/* harmony import */ var gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/authentication/module.js */ "./contribs/gmf/src/authentication/module.js");
/* harmony import */ var gmf_editing_EditFeature_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/editing/EditFeature.js */ "./contribs/gmf/src/editing/EditFeature.js");
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/extent.js */ "./node_modules/ol/extent.js");
/* harmony import */ var ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/MultiPoint.js */ "./node_modules/ol/geom/MultiPoint.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
MainController.$inject = ["$scope", "gmfEditFeature", "gmfUser"];

















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_editing_EditFeature_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_7__["default"].name]);
module.value('authenticationBaseUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].GMF_DEMO);
module.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].GMF_LAYERS);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

function MainController($scope, gmfEditFeature, gmfUser) {
  this.scope_ = $scope;
  this.editFeature_ = gmfEditFeature;
  this.gmfUser = gmfUser;
  this.wmsSource_ = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
    projection: undefined,
    url: _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].MAPSERVER_PROXY,
    params: {
      'LAYERS': 'point'
    }
  });
  this.wmsLayer_ = new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    source: this.wmsSource_
  });
  this.pixelBuffer_ = 10;
  this.layerId_ = 113;
  this.feature = null;
  this.pending = false;
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__["default"]()
    }), this.wmsLayer_],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 2
    })
  });
  this.map.on('singleclick', this.handleMapSingleClick_.bind(this));
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
}

MainController.prototype.handleMapSingleClick_ = function (evt) {
  var coordinate = evt.coordinate;
  var map = this.map;
  var view = map.getView();
  var resolution = view.getResolution();
  var buffer = resolution * this.pixelBuffer_;
  var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__["buffer"]([coordinate[0], coordinate[1], coordinate[0], coordinate[1]], buffer);
  this.editFeature_.getFeaturesInExtent([this.layerId_], extent).then(this.handleGetFeatures_.bind(this));
  this.feature = null;
  this.pending = true;
  this.scope_.$apply();
};

MainController.prototype.handleGetFeatures_ = function (features) {
  this.pending = false;

  if (features.length) {
    this.feature = features[0];
  }
};

MainController.prototype.insertFeature = function () {
  this.pending = true;
  var map = this.map;
  var view = map.getView();
  var resolution = view.getResolution();
  var buffer = resolution * -50;
  var size = map.getSize();
  var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__["buffer"](view.calculateExtent(size), buffer);
  var bottomLeft = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__["getBottomLeft"](extent);
  var topRight = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__["getTopRight"](extent);
  var left = bottomLeft[0];
  var bottom = bottomLeft[1];
  var right = topRight[0];
  var top = topRight[1];
  var deltaX = right - left;
  var deltaY = top - bottom;
  var coordinate = [left + Math.random() * deltaX, bottom + Math.random() * deltaY];
  var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
    'geometry': new ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_12__["default"]([coordinate]),
    'name': 'New point'
  });
  this.feature = null;
  this.editFeature_.insertFeatures(this.layerId_, [feature]).then(this.handleEditFeature_.bind(this));
};

MainController.prototype.updateFeature = function () {
  console.assert(this.feature);
  this.pending = true;
  this.feature.set('name', 'Updated name');
  this.editFeature_.updateFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));
};

MainController.prototype.deleteFeature = function () {
  console.assert(this.feature);
  this.editFeature_.deleteFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));
  this.feature = null;
};

MainController.prototype.handleEditFeature_ = function (resp) {
  this.pending = false;
  this.refreshWMSLayer_();
};

MainController.prototype.refreshWMSLayer_ = function () {
  this.wmsSource_.updateParams({
    'random': Math.random()
  });
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 7:
/*!*********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/editfeature.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./contribs/gmf/src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/editfeature.js */"./contribs/gmf/examples/editfeature.js");


/***/ })

/******/ });
//# sourceMappingURL=editfeature.js.map