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
/******/ 		"simple3d": 0
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
/******/ 	deferredModules.push([41,"commons"]);
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

eval("\n\n//# sourceURL=webpack:///./examples/simple3d.css?");

/***/ }),

/***/ "./examples/simple3d.js":
/*!******************************!*\
  !*** ./examples/simple3d.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple3d.css */ \"./examples/simple3d.css\");\n/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_simple3d_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/olcs/olcsModule.js */ \"./src/olcs/olcsModule.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/olcs/Manager.js */ \"./src/olcs/Manager.js\");\nMainController.$inject = [\"$rootScope\", \"ngeoOlcsService\"];\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name, ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name]);\n\nfunction MainController($rootScope, ngeoOlcsService) {\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      center: [0, 0],\n      zoom: 4\n    })\n  });\n  var cesiumUrl = '../node_modules/@camptocamp/cesium/Build/Cesium/Cesium.js';\n  this.ol3dm = new ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](cesiumUrl, $rootScope, {\n    map: this.map\n  });\n  ngeoOlcsService.initialize(this.ol3dm);\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/simple3d.js?");

/***/ }),

/***/ "./node_modules/ol/Image.js":
/*!**********************************************************************!*\
  !*** delegated ./node_modules/ol/Image.js from dll-reference vendor ***!
  \**********************************************************************/
/*! exports provided: listenImage, default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(283);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/Image.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/ImageState.js":
/*!***************************************************************************!*\
  !*** delegated ./node_modules/ol/ImageState.js from dll-reference vendor ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(37);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/ImageState.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/TileState.js":
/*!**************************************************************************!*\
  !*** delegated ./node_modules/ol/TileState.js from dll-reference vendor ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(25);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/TileState.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/ViewHint.js":
/*!*************************************************************************!*\
  !*** delegated ./node_modules/ol/ViewHint.js from dll-reference vendor ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(62);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/ViewHint.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/asserts.js":
/*!************************************************************************!*\
  !*** delegated ./node_modules/ol/asserts.js from dll-reference vendor ***!
  \************************************************************************/
/*! exports provided: assert */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(21);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/asserts.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/events/EventType.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/ol/events/EventType.js from dll-reference vendor ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(11);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/events/EventType.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/geom/GeometryType.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/geom/GeometryType.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(7);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/geom/GeometryType.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/layer/BaseVector.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/ol/layer/BaseVector.js from dll-reference vendor ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(903);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/layer/BaseVector.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/layer/TileProperty.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/ol/layer/TileProperty.js from dll-reference vendor ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(352);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/layer/TileProperty.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/render/canvas/BuilderGroup.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/ol/render/canvas/BuilderGroup.js from dll-reference vendor ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(905);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/render/canvas/BuilderGroup.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/render/canvas/BuilderType.js":
/*!******************************************************************************************!*\
  !*** delegated ./node_modules/ol/render/canvas/BuilderType.js from dll-reference vendor ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(58);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/render/canvas/BuilderType.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/render/canvas/ExecutorGroup.js":
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/ol/render/canvas/ExecutorGroup.js from dll-reference vendor ***!
  \********************************************************************************************/
/*! exports provided: getCircleArray, replayDeclutter, default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(564);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/render/canvas/ExecutorGroup.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/renderer/canvas/TileLayer.js":
/*!******************************************************************************************!*\
  !*** delegated ./node_modules/ol/renderer/canvas/TileLayer.js from dll-reference vendor ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(936);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/renderer/canvas/TileLayer.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/renderer/vector.js":
/*!********************************************************************************!*\
  !*** delegated ./node_modules/ol/renderer/vector.js from dll-reference vendor ***!
  \********************************************************************************/
/*! exports provided: defaultOrder, getSquaredTolerance, getTolerance, renderFeature */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(248);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/renderer/vector.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/ol/transform.js":
/*!**************************************************************************!*\
  !*** delegated ./node_modules/ol/transform.js from dll-reference vendor ***!
  \**************************************************************************/
/*! exports provided: create, reset, multiply, set, setFromArray, apply, rotate, scale, makeScale, translate, compose, invert, makeInverse, determinant, toString */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(23);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/transform.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./src/olcs/Manager.js":
/*!*****************************!*\
  !*** ./src/olcs/Manager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! olcs/contrib/Manager.js */ \"./node_modules/ol-cesium/src/olcs/contrib/Manager.js\");\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\nvar Manager = function (_olcsContribManager) {\n  _inheritsLoose(Manager, _olcsContribManager);\n\n  function Manager(url, $rootScope, options) {\n    var _this;\n\n    _this = _olcsContribManager.call(this, url, options) || this;\n    _this.rootScope_ = $rootScope;\n    return _this;\n  }\n\n  var _proto = Manager.prototype;\n\n  _proto.toggle3d = function toggle3d() {\n    var _this2 = this;\n\n    var promise = _olcsContribManager.prototype.toggle3d.call(this);\n\n    return promise.then(function () {\n      _this2.rootScope_.$apply();\n    });\n  };\n\n  return Manager;\n}(olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Manager);\n\n//# sourceURL=webpack:///./src/olcs/Manager.js?");

/***/ }),

/***/ "./src/olcs/Service.js":
/*!*****************************!*\
  !*** ./src/olcs/Service.js ***!
  \*****************************/
/*! exports provided: OlcsService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OlcsService\", function() { return OlcsService; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ \"./src/misc/debounce.js\");\n/* harmony import */ var ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/statemanager/Location.js */ \"./src/statemanager/Location.js\");\n/* harmony import */ var ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/olcs/constants.js */ \"./src/olcs/constants.js\");\n/* harmony import */ var ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/statemanager/Service.js */ \"./src/statemanager/Service.js\");\n/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/math.js */ \"./node_modules/ol/math.js\");\n\n\n\n\n\n\nvar OlcsService = function () {\n  OlcsService.$inject = [\"ngeoDebounce\", \"ngeoLocation\", \"ngeoStateManager\"];\n\n  function OlcsService(ngeoDebounce, ngeoLocation, ngeoStateManager) {\n    this.manager_ = null;\n    this.ngeoDebounce_ = ngeoDebounce;\n    this.ngeoLocation_ = ngeoLocation;\n    this.ngeoStateManager_ = ngeoStateManager;\n  }\n\n  var _proto = OlcsService.prototype;\n\n  _proto.initialize = function initialize(manager) {\n    var _this = this;\n\n    this.manager_ = manager;\n    this.manager_.on('load', function () {\n      _this.cameraToState_();\n    });\n\n    if (this.ngeoStateManager_.getInitialBooleanValue('3d_enabled')) {\n      this.initialStateToCamera_();\n    }\n  };\n\n  _proto.getManager = function getManager() {\n    return this.manager_;\n  };\n\n  _proto.initialStateToCamera_ = function initialStateToCamera_() {\n    if (!this.manager_) {\n      throw new Error('Missing manager');\n    }\n\n    var stateManager = this.ngeoStateManager_;\n    var lon = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].LON);\n    var lat = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].LAT);\n    var elevation = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].ELEVATION);\n    var heading = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].HEADING) || 0;\n    var pitch = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].PITCH) || 0;\n\n    if (!lon) {\n      throw new Error('Missing lon');\n    }\n\n    if (!lat) {\n      throw new Error('Missing lat');\n    }\n\n    if (!elevation) {\n      throw new Error('Missing elevation');\n    }\n\n    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);\n  };\n\n  _proto.cameraToState_ = function cameraToState_() {\n    var _this2 = this;\n\n    if (!this.manager_) {\n      throw new Error('Missing manager');\n    }\n\n    var manager = this.manager_;\n    var scene = manager.getOl3d().getCesiumScene();\n    var camera = scene.camera;\n    camera.moveEnd.addEventListener(this.ngeoDebounce_(function () {\n      var _this2$ngeoStateManag;\n\n      var position = camera.positionCartographic;\n\n      _this2.ngeoStateManager_.updateState((_this2$ngeoStateManag = {}, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].ENABLED] = true, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].LON] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__[\"toDegrees\"])(position.longitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].LAT] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__[\"toDegrees\"])(position.latitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].ELEVATION] = position.height.toFixed(0), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].HEADING] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__[\"toDegrees\"])(camera.heading).toFixed(3), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].PITCH] = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_5__[\"toDegrees\"])(camera.pitch).toFixed(3), _this2$ngeoStateManag));\n    }, 1000, true));\n    this.manager_.on('toggle', function (event) {\n      if (!event.target.is3dEnabled()) {\n        _this2.remove3dState_();\n      }\n    });\n  };\n\n  _proto.remove3dState_ = function remove3dState_() {\n    var _this3 = this;\n\n    this.ngeoLocation_.getParamKeysWithPrefix(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__[\"Permalink3dParam\"].PREFIX).forEach(function (key) {\n      _this3.ngeoStateManager_.deleteParam(key);\n    });\n  };\n\n  return OlcsService;\n}();\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(name, [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name, ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name]).service('ngeoOlcsService', OlcsService);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/olcs/Service.js?");

/***/ }),

/***/ "./src/olcs/constants.js":
/*!*******************************!*\
  !*** ./src/olcs/constants.js ***!
  \*******************************/
/*! exports provided: Permalink3dParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Permalink3dParam\", function() { return Permalink3dParam; });\nvar Permalink3dParam = {\n  ENABLED: '3d_enabled',\n  LON: '3d_lon',\n  LAT: '3d_lat',\n  ELEVATION: '3d_elevation',\n  HEADING: '3d_heading',\n  PITCH: '3d_pitch',\n  PREFIX: '3d_'\n};\n\n//# sourceURL=webpack:///./src/olcs/constants.js?");

/***/ }),

/***/ "./src/olcs/controls3d.html":
/*!**********************************!*\
  !*** ./src/olcs/controls3d.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div class=\"ngeo-tools\">\\n  <div class=\"ngeo-angle\"><div class=\"ngeo-angle3d\"></div></div>\\n  <button class=\"ngeo-left ngeo-tilt-left\" ng-click=\"$ctrl.tilt(5)\"></button>\\n  <button class=\"ngeo-right ngeo-tilt-right\" ng-click=\"$ctrl.tilt(-5)\"></button>\\n</div>\\n<div class=\"ngeo-zoom\">\\n  <button class=\"ol-zoom-in\" ng-click=\"$ctrl.zoom(1)\"></button>\\n  <button class=\"ol-zoom-out\" ng-click=\"$ctrl.zoom(-1)\"></button>\\n</div>\\n<div class=\"ngeo-tools\">\\n  <div class=\"ngeo-rotation\"><div class=\"ngeo-rotation3d\"></div></div>\\n  <button class=\"ngeo-left\" ng-click=\"$ctrl.rotate(-15)\"></button>\\n  <button class=\"ngeo-right\" ng-click=\"$ctrl.rotate(15)\"></button>\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/olcs/controls3d.html?");

/***/ }),

/***/ "./src/olcs/controls3d.js":
/*!********************************!*\
  !*** ./src/olcs/controls3d.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/easing.js */ \"./node_modules/ol/easing.js\");\n/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/math.js */ \"./node_modules/ol/math.js\");\n/* harmony import */ var olcs_core_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! olcs/core.js */ \"./node_modules/ol-cesium/src/olcs/core.js\");\nngeoOlcsControls3dTemplateUrlInjectable.$inject = [\"$attrs\", \"ngeoOlcsControls3dTemplateUrl\"];\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsControls3d', []);\n\nfunction shouldUpdate(older, newer) {\n  return Number.isFinite(newer) && (!Number.isFinite(older) || Math.abs(newer - older) > 0.05);\n}\n\nvar Controller = function () {\n  Controller.$inject = [\"$element\", \"ngeoOlcsService\"];\n\n  function Controller($element, ngeoOlcsService) {\n    this.element_ = $element;\n    this.ol3dm = null;\n    this.minTilt = -1;\n    this.maxTilt = -1;\n    this.tiltRightEl_ = null;\n    this.tiltLeftEl_ = null;\n    this.rotation3dEl_ = null;\n    this.angle3dEl_ = null;\n    this.previousRotation_ = -1;\n    this.previousViewMatrix_ = null;\n    this.animationFrameRequestId_ = -1;\n    this.olcsService_ = ngeoOlcsService;\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.updateWidget_ = function updateWidget_() {\n    var _this = this;\n\n    if (!this.ol3dm) {\n      throw new Error('Missing ol3dm');\n    }\n\n    if (!this.rotation3dEl_) {\n      throw new Error('Missing rotation3dEl_');\n    }\n\n    if (!this.angle3dEl_) {\n      throw new Error('Missing angle3dEl_');\n    }\n\n    if (!this.tiltRightEl_) {\n      throw new Error('Missing tiltRightEl_');\n    }\n\n    if (!this.tiltLeftEl_) {\n      throw new Error('Missing tiltLeftEl_');\n    }\n\n    var newRotation = this.ol3dm.getOl3d().getOlView().getRotation();\n\n    if (shouldUpdate(this.previousRotation_, newRotation)) {\n      this.rotateElement_(this.rotation3dEl_, newRotation);\n      this.previousRotation_ = newRotation;\n    }\n\n    var newViewMatrix = this.ol3dm.getCesiumViewMatrix();\n\n    if (!Cesium.Matrix4.equalsEpsilon(this.previousViewMatrix_, newViewMatrix, 1e-5)) {\n      var newTilt = this.ol3dm.getTiltOnGlobe();\n\n      if (newTilt != undefined && Number.isFinite(newTilt || 0)) {\n        this.rotateElement_(this.angle3dEl_, newTilt);\n        this.previousViewMatrix_ = Cesium.Matrix4.clone(newViewMatrix);\n        var buffer = 0.01;\n\n        if (newTilt - this.minTilt < buffer) {\n          this.tiltRightEl_.addClass('ngeo-right-inactive');\n        } else if (this.tiltRightEl_.hasClass('ngeo-right-inactive')) {\n          this.tiltRightEl_.removeClass('ngeo-right-inactive');\n        }\n\n        if (this.maxTilt - newTilt < buffer) {\n          this.tiltLeftEl_.addClass('ngeo-left-inactive');\n        } else if (this.tiltLeftEl_.hasClass('ngeo-left-inactive')) {\n          this.tiltLeftEl_.removeClass('ngeo-left-inactive');\n        }\n      }\n    }\n\n    this.animationFrameRequestId_ = requestAnimationFrame(function () {\n      return _this.updateWidget_();\n    });\n  };\n\n  _proto.$onDestroy = function $onDestroy() {\n    if (this.animationFrameRequestId_) {\n      cancelAnimationFrame(this.animationFrameRequestId_);\n    }\n  };\n\n  _proto.$onInit = function $onInit() {\n    if (this.minTilt === undefined) {\n      this.minTilt = 0;\n    }\n\n    if (this.maxTilt === undefined) {\n      this.maxTilt = 7 * Math.PI / 16;\n    }\n\n    if (!this.ol3dm) {\n      this.ol3dm = this.olcsService_.getManager() || null;\n    }\n\n    this.tiltRightEl_ = this.element_.find('.ngeo-tilt-right');\n    this.tiltLeftEl_ = this.element_.find('.ngeo-tilt-left');\n    this.rotation3dEl_ = this.element_.find('.ngeo-rotation3d');\n    this.angle3dEl_ = this.element_.find('.ngeo-angle3d');\n    this.updateWidget_();\n  };\n\n  _proto.rotateElement_ = function rotateElement_(element, angle) {\n    var r = \"rotate(\" + angle + \"rad)\";\n    element.css({\n      '-moz-transform': r,\n      '-webkit-transform': r,\n      '-o-transform': r,\n      '-ms-transform': r,\n      'transform': r\n    });\n  };\n\n  _proto.rotate = function rotate(angle) {\n    if (!this.ol3dm) {\n      throw new Error('Missing ol3dm');\n    }\n\n    this.ol3dm.setHeading(Object(ol_math_js__WEBPACK_IMPORTED_MODULE_2__[\"toRadians\"])(angle));\n  };\n\n  _proto.tilt = function tilt(angle) {\n    if (!this.ol3dm) {\n      throw new Error('Missing ol3dm');\n    }\n\n    angle = Object(ol_math_js__WEBPACK_IMPORTED_MODULE_2__[\"toRadians\"])(angle);\n    var tiltOnGlobe = this.ol3dm.getTiltOnGlobe();\n\n    if (tiltOnGlobe == undefined) {\n      throw new Error('Missing tiltOnGlobe');\n    }\n\n    if (tiltOnGlobe + angle < this.minTilt) {\n      angle = this.minTilt - tiltOnGlobe;\n    } else if (tiltOnGlobe + angle > this.maxTilt) {\n      angle = this.maxTilt - tiltOnGlobe;\n    }\n\n    var scene = this.ol3dm.getCesiumScene();\n    olcs_core_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rotateAroundBottomCenter(scene, angle);\n  };\n\n  _proto.zoom = function zoom(delta) {\n    if (!this.ol3dm) {\n      throw new Error('Missing ol3dm');\n    }\n\n    var view = this.ol3dm.getOlView();\n    var cur = view.getResolution();\n    var newResolution = view.constrainResolution(cur, delta);\n\n    if (view.getAnimating()) {\n      view.cancelAnimations();\n    }\n\n    view.animate({\n      resolution: newResolution,\n      duration: 250,\n      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_1__[\"easeOut\"]\n    });\n  };\n\n  return Controller;\n}();\n\nfunction ngeoOlcsControls3dTemplateUrlInjectable($attrs, ngeoOlcsControls3dTemplateUrl) {\n  if (ngeoOlcsControls3dTemplateUrl) {\n    return ngeoOlcsControls3dTemplateUrl;\n  }\n\n  var templateUrl = $attrs['ngeoOlcsControls3dTemplateUrl'];\n  return templateUrl ? templateUrl : 'ngeo/olsc/controls3d';\n}\n\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/olsc/controls3d', __webpack_require__(/*! ./controls3d.html */ \"./src/olcs/controls3d.html\"));\n}]);\nvar olscControls3dComponent = {\n  bindings: {\n    'minTilt': '<?',\n    'maxTilt': '<?',\n    'ol3dm': '<?'\n  },\n  controller: Controller,\n  templateUrl: ngeoOlcsControls3dTemplateUrlInjectable\n};\nmodule.component('ngeoOlcsControls3d', olscControls3dComponent);\nmodule.value('ngeoOlcsControls3dTemplateUrl', '');\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/olcs/controls3d.js?");

/***/ }),

/***/ "./src/olcs/olcsModule.js":
/*!********************************!*\
  !*** ./src/olcs/olcsModule.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/olcs/Service.js */ \"./src/olcs/Service.js\");\n/* harmony import */ var ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/olcs/controls3d.js */ \"./src/olcs/controls3d.js\");\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsModule', [ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name, ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/olcs/olcsModule.js?");

/***/ }),

/***/ 41:
/*!*****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/simple3d.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/simple3d.js */\"./examples/simple3d.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/simple3d.js?");

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