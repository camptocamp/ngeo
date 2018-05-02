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
/******/ 		"mapfishprint": 0
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
/******/ 	deferredModules.push([23,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/mapfishprint.css":
/*!***********************************!*\
  !*** ./examples/mapfishprint.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/mapfishprint.css?");

/***/ }),

/***/ "./examples/mapfishprint.js":
/*!**********************************!*\
  !*** ./examples/mapfishprint.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./examples/url.js\");\n/* harmony import */ var _mapfishprint_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapfishprint.css */ \"./examples/mapfishprint.css\");\n/* harmony import */ var _mapfishprint_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mapfishprint_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/print/Service.js */ \"./src/print/Service.js\");\n/* harmony import */ var ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/print/Utils.js */ \"./src/print/Utils.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/format/GeoJSON.js */ \"./node_modules/ol/format/GeoJSON.js\");\n/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Image.js */ \"./node_modules/ol/layer/Image.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/ImageWMS.js */ \"./node_modules/ol/source/ImageWMS.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\nMainController.$inject = [\"$timeout\", \"ngeoCreatePrint\", \"ngeoPrintUtils\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar appmodule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"].name, ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name]);\nvar PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000, 500000];\nvar PRINT_FORMAT_ = 'pdf';\nvar PRINT_LAYOUT_ = '1 A4 portrait';\nvar PRINT_DPI_ = 72;\nvar PRINT_PAPER_SIZE_ = [555, 675];\n\nfunction MainController($timeout, ngeoCreatePrint, ngeoPrintUtils) {\n  var source = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n    url: _url_js__WEBPACK_IMPORTED_MODULE_1__[\"MAPSERVER_PROXY\"],\n    projection: undefined,\n    params: {\n      'LAYERS': 'osm'\n    },\n    serverType: 'mapserver'\n  });\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n    layers: [new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      source: source\n    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n        url: 'data/polygon-swizerland.json',\n        format: new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n          dataProjection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n        })\n      })\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],\n      center: [537635, 152640],\n      zoom: 3\n    })\n  });\n  this.printState = '';\n  this.$timeout_ = $timeout;\n  this.print_ = ngeoCreatePrint(_url_js__WEBPACK_IMPORTED_MODULE_1__[\"PRINT_PROXY\"]);\n  this.printUtils_ = ngeoPrintUtils;\n  var postcomposeListener = ngeoPrintUtils.createPrintMaskPostcompose(function () {\n    return PRINT_PAPER_SIZE_;\n  }, function (frameState) {\n    var mapSize = frameState.size;\n    var mapResolution = frameState.viewState.resolution;\n    return mapSize !== undefined && mapResolution !== undefined ? ngeoPrintUtils.getOptimalScale(mapSize, mapResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_) : PRINT_SCALES_[0];\n  });\n  this.map.on('postcompose', postcomposeListener);\n}\n\nMainController.prototype.print = function () {\n  var map = this.map;\n  var mapSize = map.getSize();\n  var viewResolution = map.getView().getResolution();\n  var scale = mapSize !== undefined && viewResolution !== undefined ? this.printUtils_.getOptimalScale(mapSize, viewResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_) : PRINT_SCALES_[0];\n  var dpi = PRINT_DPI_;\n  var format = PRINT_FORMAT_;\n  var layout = PRINT_LAYOUT_;\n  this.printState = 'Printing...';\n  var spec = this.print_.createSpec(map, scale, dpi, layout, format, {\n    'datasource': [],\n    'debug': 0,\n    'comments': 'My comments',\n    'title': 'My print'\n  });\n  this.print_.createReport(spec).then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));\n};\n\nMainController.prototype.handleCreateReportSuccess_ = function (resp) {\n  this.getStatus_(resp.data.ref);\n};\n\nMainController.prototype.getStatus_ = function (ref) {\n  this.print_.getStatus(ref).then(this.handleGetStatusSuccess_.bind(this, ref), this.handleGetStatusError_.bind(this));\n};\n\nMainController.prototype.handleCreateReportError_ = function (resp) {\n  this.printState = 'Print error';\n};\n\nMainController.prototype.handleGetStatusSuccess_ = function (ref, resp) {\n  var _this = this;\n\n  var mfResp = resp.data;\n  var done = mfResp.done;\n\n  if (done) {\n    this.printState = '';\n    window.location.href = this.print_.getReportUrl(ref);\n  } else {\n    this.$timeout_(function () {\n      _this.getStatus_(ref);\n    }, 1000, false);\n  }\n};\n\nMainController.prototype.handleGetStatusError_ = function (resp) {\n  this.printState = 'Print error';\n};\n\nappmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./examples/mapfishprint.js?");

/***/ }),

/***/ 23:
/*!*********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mapfishprint.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/mapfishprint.js */\"./examples/mapfishprint.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/mapfishprint.js?");

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