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

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/editfeature.css?");

/***/ }),

/***/ "./contribs/gmf/examples/editfeature.js":
/*!**********************************************!*\
  !*** ./contribs/gmf/examples/editfeature.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _editfeature_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editfeature.css */ \"./contribs/gmf/examples/editfeature.css\");\n/* harmony import */ var _editfeature_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editfeature_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bootstrap_js_src_tooltip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/src/tooltip.js */ \"./node_modules/bootstrap/js/src/tooltip.js\");\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/authentication/module.js */ \"./contribs/gmf/src/authentication/module.js\");\n/* harmony import */ var gmf_editing_EditFeature_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/editing/EditFeature.js */ \"./contribs/gmf/src/editing/EditFeature.js\");\n/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/map/component.js */ \"./contribs/gmf/src/map/component.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/extent.js */ \"./node_modules/ol/extent.js\");\n/* harmony import */ var ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/MultiPoint.js */ \"./node_modules/ol/geom/MultiPoint.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer/Image.js */ \"./node_modules/ol/layer/Image.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/source/ImageWMS.js */ \"./node_modules/ol/source/ImageWMS.js\");\nMainController.$inject = [\"$scope\", \"gmfEditFeature\", \"gmfUser\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, gmf_editing_EditFeature_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name]);\nmodule.value('authenticationBaseUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_DEMO);\nmodule.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_LAYERS);\nmodule.constant('defaultTheme', 'Demo');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController($scope, gmfEditFeature, gmfUser) {\n  this.scope_ = $scope;\n  this.editFeature_ = gmfEditFeature;\n  this.gmfUser = gmfUser;\n  this.wmsSource_ = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n    projection: undefined,\n    url: _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].MAPSERVER_PROXY,\n    params: {\n      'LAYERS': 'point'\n    }\n  });\n  this.wmsLayer_ = new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n    source: this.wmsSource_\n  });\n  this.pixelBuffer_ = 10;\n  this.layerId_ = 113;\n  this.feature = null;\n  this.pending = false;\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]()\n    }), this.wmsLayer_],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],\n      center: [537635, 152640],\n      zoom: 2\n    })\n  });\n  this.map.on('singleclick', this.handleMapSingleClick_.bind(this));\n  $('[data-toggle=\"tooltip\"]').tooltip({\n    container: 'body',\n    trigger: 'hover'\n  });\n}\n\nMainController.prototype.handleMapSingleClick_ = function (evt) {\n  var coordinate = evt.coordinate;\n  var map = this.map;\n  var view = map.getView();\n  var resolution = view.getResolution();\n\n  if (resolution === undefined) {\n    throw new Error('Missing resolution');\n  }\n\n  var buffer = resolution * this.pixelBuffer_;\n  var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__[\"buffer\"]([coordinate[0], coordinate[1], coordinate[0], coordinate[1]], buffer);\n  this.editFeature_.getFeaturesInExtent([this.layerId_], extent).then(this.handleGetFeatures_.bind(this));\n  this.feature = null;\n  this.pending = true;\n  this.scope_.$apply();\n};\n\nMainController.prototype.handleGetFeatures_ = function (features) {\n  this.pending = false;\n\n  if (features.length) {\n    this.feature = features[0];\n  }\n};\n\nMainController.prototype.insertFeature = function () {\n  this.pending = true;\n  var map = this.map;\n  var view = map.getView();\n  var resolution = view.getResolution();\n\n  if (resolution === undefined) {\n    throw new Error('Missing resolution');\n  }\n\n  var buffer = resolution * -50;\n  var size = map.getSize();\n  var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__[\"buffer\"](view.calculateExtent(size), buffer);\n  var bottomLeft = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__[\"getBottomLeft\"](extent);\n  var topRight = ol_extent_js__WEBPACK_IMPORTED_MODULE_11__[\"getTopRight\"](extent);\n  var left = bottomLeft[0];\n  var bottom = bottomLeft[1];\n  var right = topRight[0];\n  var top = topRight[1];\n  var deltaX = right - left;\n  var deltaY = top - bottom;\n  var coordinate = [left + Math.random() * deltaX, bottom + Math.random() * deltaY];\n  var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    'geometry': new ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]([coordinate]),\n    'name': 'New point'\n  });\n  this.feature = null;\n  this.editFeature_.insertFeatures(this.layerId_, [feature]).then(this.handleEditFeature_.bind(this));\n};\n\nMainController.prototype.updateFeature = function () {\n  if (!this.feature) {\n    throw new Error('Missing feature');\n  }\n\n  this.pending = true;\n  this.feature.set('name', 'Updated name');\n  this.editFeature_.updateFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));\n};\n\nMainController.prototype.deleteFeature = function () {\n  if (!this.feature) {\n    throw new Error('Missing feature');\n  }\n\n  this.editFeature_.deleteFeature(this.layerId_, this.feature).then(this.handleEditFeature_.bind(this));\n  this.feature = null;\n};\n\nMainController.prototype.handleEditFeature_ = function (resp) {\n  this.pending = false;\n  this.refreshWMSLayer_();\n};\n\nMainController.prototype.refreshWMSLayer_ = function () {\n  this.wmsSource_.updateParams({\n    'random': Math.random()\n  });\n};\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./contribs/gmf/examples/editfeature.js?");

/***/ }),

/***/ 7:
/*!*********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/editfeature.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/editfeature.js */\"./contribs/gmf/examples/editfeature.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/editfeature.js?");

/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");

/***/ })

/******/ });