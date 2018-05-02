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
/******/ 		"svg": 0
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
/******/ 	deferredModules.push([42,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/inline.svg":
/*!*****************************!*\
  !*** ./examples/inline.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"65.118\\\" height=\\\"65.118\\\" viewBox=\\\"0 0 130.236 130.236\\\"><g transform=\\\"translate(-49.783 -78.042)\\\"><circle cx=\\\"114.901\\\" cy=\\\"143.16\\\" r=\\\"50\\\" fill=\\\"#ffc065\\\"></circle><text style=\\\"line-height:125%;-inkscape-font-specification:&#x27;sans-serif, Normal&#x27;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center\\\" x=\\\"114.191\\\" y=\\\"154.939\\\" font-weight=\\\"400\\\" font-size=\\\"31.597\\\" font-family=\\\"sans-serif\\\" letter-spacing=\\\"0\\\" word-spacing=\\\"0\\\" text-anchor=\\\"middle\\\" stroke-width=\\\".265\\\"><tspan x=\\\"114.191\\\" y=\\\"154.939\\\" style=\\\"-inkscape-font-specification:&#x27;sans-serif, Normal&#x27;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center\\\">Inline</tspan></text></g></svg>\"\n\n//# sourceURL=webpack:///./examples/inline.svg?");

/***/ }),

/***/ "./examples/inline.svg?viewbox&width=30px":
/*!************************************************!*\
  !*** ./examples/inline.svg?viewbox&width=30px ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 130.236 130.236\\\" width=\\\"30px\\\" height=\\\"30px\\\"><g transform=\\\"translate(-49.783 -78.042)\\\"><circle cx=\\\"114.901\\\" cy=\\\"143.16\\\" r=\\\"50\\\" fill=\\\"#ffc065\\\"></circle><text style=\\\"line-height:125%;-inkscape-font-specification:&#x27;sans-serif, Normal&#x27;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center\\\" x=\\\"114.191\\\" y=\\\"154.939\\\" font-weight=\\\"400\\\" font-size=\\\"31.597\\\" font-family=\\\"sans-serif\\\" letter-spacing=\\\"0\\\" word-spacing=\\\"0\\\" text-anchor=\\\"middle\\\" stroke-width=\\\".265\\\"><tspan x=\\\"114.191\\\" y=\\\"154.939\\\" style=\\\"-inkscape-font-specification:&#x27;sans-serif, Normal&#x27;;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center\\\">Inline</tspan></text></g></svg>\"\n\n//# sourceURL=webpack:///./examples/inline.svg?");

/***/ }),

/***/ "./examples/svg.css":
/*!**************************!*\
  !*** ./examples/svg.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/svg.css?");

/***/ }),

/***/ "./examples/svg.js":
/*!*************************!*\
  !*** ./examples/svg.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _svg_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg.css */ \"./examples/svg.css\");\n/* harmony import */ var _svg_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_svg_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Icon.js */ \"./node_modules/ol/style/Icon.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nvar appmodule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"].name]);\n\nfunction MainController() {\n  var source = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]();\n  var feature1 = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]([599000, 200000])\n  });\n  feature1.setStyle([new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    image: new ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      src: 'data:image/svg+xml;base64,' + btoa(__webpack_require__(/*! ./inline.svg */ \"./examples/inline.svg\")),\n      imgSize: [65, 65]\n    })\n  })]);\n  source.addFeature(feature1);\n  var feature2 = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]([600000, 200000])\n  });\n  feature2.setStyle([new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    image: new ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      src: 'data:image/svg+xml;base64,' + btoa(__webpack_require__(/*! ./inline.svg?viewbox&width=30px */ \"./examples/inline.svg?viewbox&width=30px\")),\n      imgSize: [30, 30]\n    })\n  })]);\n  source.addFeature(feature2);\n  var feature3 = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]([601000, 200000])\n  });\n  feature3.setStyle([new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    image: new ol_style_Icon_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      src: __webpack_require__(/*! ./url.svg?url */ \"./examples/url.svg?url\"),\n      imgSize: [65, 65]\n    })\n  })]);\n  source.addFeature(feature3);\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    layers: [new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      source: source\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],\n      center: [600000, 200000],\n      zoom: 4\n    })\n  });\n}\n\nappmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./examples/svg.js?");

/***/ }),

/***/ "./examples/url.svg?url":
/*!******************************!*\
  !*** ./examples/url.svg?url ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"url.svg\";\n\n//# sourceURL=webpack:///./examples/url.svg?");

/***/ }),

/***/ 42:
/*!************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/svg.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/svg.js */\"./examples/svg.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/svg.js?");

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