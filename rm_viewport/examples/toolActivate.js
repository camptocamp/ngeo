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
/******/ 		"toolActivate": 0
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
/******/ 	deferredModules.push([43,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/toolActivate.css":
/*!***********************************!*\
  !*** ./examples/toolActivate.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/toolActivate.css?");

/***/ }),

/***/ "./examples/toolActivate.js":
/*!**********************************!*\
  !*** ./examples/toolActivate.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _toolActivate_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolActivate.css */ \"./examples/toolActivate.css\");\n/* harmony import */ var _toolActivate_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_toolActivate_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ \"./src/misc/btnComponent.js\");\n/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate.js */ \"./src/misc/decorate.js\");\n/* harmony import */ var ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/ToolActivate.js */ \"./src/misc/ToolActivate.js\");\n/* harmony import */ var ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr.js */ \"./src/misc/ToolActivateMgr.js\");\n/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Collection.js */ \"./node_modules/ol/Collection.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_coordinate_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/coordinate.js */ \"./node_modules/ol/coordinate.js\");\n/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/interaction/Draw.js */ \"./node_modules/ol/interaction/Draw.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Circle.js */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\nMainController.$inject = [\"ngeoFeatureOverlayMgr\", \"ngeoToolActivateMgr\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name]);\n\nfunction MainController(ngeoFeatureOverlayMgr, ngeoToolActivateMgr) {\n  var _this = this;\n\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      center: [1444682, 5979706],\n      zoom: 4\n    })\n  });\n  var map = this.map;\n  ngeoFeatureOverlayMgr.init(map);\n  var features = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n  var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();\n  overlay.setFeatures(features);\n  overlay.setStyle(new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n      color: 'rgba(255, 255, 255, 0.2)'\n    }),\n    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n      color: '#ffcc33',\n      width: 2\n    }),\n    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n      radius: 7,\n      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n        color: '#ffcc33'\n      })\n    })\n  }));\n  this.mapClickIsEnabled = true;\n  var content = document.getElementById('popup-content');\n\n  if (!content) {\n    throw new Error('Missing content');\n  }\n\n  this.map.on('singleclick', function (evt) {\n    if (_this.mapClickIsEnabled) {\n      var c = ol_coordinate_js__WEBPACK_IMPORTED_MODULE_10__[\"toStringXY\"](evt.coordinate);\n      content.innerHTML = \"<p>You clicked here: <code>\" + c + \"</code></p>\";\n    }\n  });\n  var mapClickTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this, 'mapClickIsEnabled');\n  ngeoToolActivateMgr.registerTool('mapTools', mapClickTool, true);\n  this.drawPoint = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n    type: 'Point',\n    features: features\n  });\n  this.drawPoint.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__[\"interactionDecoration\"])(this.drawPoint);\n  map.addInteraction(this.drawPoint);\n  var drawPointTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.drawPoint, 'active');\n  ngeoToolActivateMgr.registerTool('mapTools', drawPointTool);\n  this.drawLine = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n    type: 'LineString',\n    features: features\n  });\n  this.drawLine.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__[\"interactionDecoration\"])(this.drawLine);\n  map.addInteraction(this.drawLine);\n  var drawLineTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.drawLine, 'active');\n  ngeoToolActivateMgr.registerTool('mapTools', drawLineTool);\n  this.drawPolygon = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n    type: 'Polygon',\n    features: features\n  });\n  this.drawPolygon.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__[\"interactionDecoration\"])(this.drawPolygon);\n  map.addInteraction(this.drawPolygon);\n  var drawPolygonTool = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.drawPolygon, 'active');\n  ngeoToolActivateMgr.registerTool('mapTools', drawPolygonTool);\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/toolActivate.js?");

/***/ }),

/***/ 43:
/*!*********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/toolActivate.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/toolActivate.js */\"./examples/toolActivate.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/toolActivate.js?");

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