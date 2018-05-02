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
/******/ 		"measure": 0
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
/******/ 	deferredModules.push([25,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/measure.css":
/*!******************************!*\
  !*** ./examples/measure.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./examples/measure.css?");

/***/ }),

/***/ "./examples/measure.js":
/*!*****************************!*\
  !*** ./examples/measure.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _measure_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./measure.css */ \"./examples/measure.css\");\n/* harmony import */ var _measure_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_measure_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureArea.js */ \"./src/interaction/MeasureArea.js\");\n/* harmony import */ var ngeo_interaction_MeasureAzimut_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/interaction/MeasureAzimut.js */ \"./src/interaction/MeasureAzimut.js\");\n/* harmony import */ var ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MeasureLength.js */ \"./src/interaction/MeasureLength.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ \"./src/misc/btnComponent.js\");\n/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/decorate.js */ \"./src/misc/decorate.js\");\n/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/filters.js */ \"./src/misc/filters.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/control/ScaleLine.js */ \"./node_modules/ol/control/ScaleLine.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Circle.js */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular-sanitize */ \"./node_modules/angular-sanitize/index.js\");\n/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_18__);\nMeasuretoolsController.$inject = [\"$scope\", \"$compile\", \"$sce\", \"$filter\", \"gettextCatalog\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].name, 'ngSanitize']);\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('partials/measuretools', __webpack_require__(/*! ./partials/measuretools.html */ \"./examples/partials/measuretools.html\"));\n}]);\nvar measuretoolsComponent = {\n  bindings: {\n    'map': '=appMeasuretoolsMap',\n    'lang': '=appMeasuretoolsLang'\n  },\n  controller: 'AppMeasuretoolsController',\n  templateUrl: 'partials/measuretools'\n};\nmodule.component('appMeasuretools', measuretoolsComponent);\n\nfunction MeasuretoolsController($scope, $compile, $sce, $filter, gettextCatalog) {\n  var _this = this;\n\n  this.map = null;\n  this.lang = '';\n  this.measureStartMsg = {};\n  this.measureLengthContinueMsg = {};\n  this.measureAreaContinueMsg = {};\n  this.measureAzimutContinueMsg = {};\n  var measureStartMsgs = {\n    'en': $sce.trustAsHtml('Click to start drawing.'),\n    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.')\n  };\n  var measureLengthContinueMsgs = {\n    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click last point to finish.'),\n    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur dernier point pour finir.')\n  };\n  var measureAreaContinueMsgs = {\n    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click starting point to finish.'),\n    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur point de départ pour finir.')\n  };\n  var measureAzimutContinueMsgs = {\n    'en': $sce.trustAsHtml('Click to finish.'),\n    'fr': $sce.trustAsHtml('Cliquer pour finir.')\n  };\n  var measureStartMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html=\"ctrl.measureStartMsg\"></span>');\n  measureStartMsg = $compile(measureStartMsg)($scope);\n  var measureLengthContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html=\"ctrl.measureLengthContinueMsg\"></span>');\n  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);\n  var measureAreaContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html=\"ctrl.measureAreaContinueMsg\"></span>');\n  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);\n  var measureAzimutContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html=\"ctrl.measureAzimutContinueMsg\"></span>');\n  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);\n  $scope.$watch(function () {\n    return _this.lang;\n  }, function (newVal) {\n    _this.measureStartMsg = measureStartMsgs[newVal];\n    _this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];\n    _this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];\n    _this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];\n  });\n  var style = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n      color: 'rgba(255, 255, 255, 0.2)'\n    }),\n    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n      color: 'rgba(0, 0, 0, 0.5)',\n      lineDash: [10, 10],\n      width: 2\n    }),\n    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n      radius: 5,\n      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n        color: 'rgba(0, 0, 0, 0.7)'\n      }),\n      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n        color: 'rgba(255, 255, 255, 0.2)'\n      })\n    })\n  });\n  this.measureLength = new ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]($filter('ngeoUnitPrefix'), gettextCatalog, {\n    sketchStyle: style,\n    startMsg: measureStartMsg[0],\n    continueMsg: measureLengthContinueMsg[0]\n  });\n  this.measureLength.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__[\"interactionDecoration\"])(this.measureLength);\n  this.measureArea = new ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]($filter('ngeoUnitPrefix'), gettextCatalog, {\n    sketchStyle: style,\n    startMsg: measureStartMsg[0],\n    continueMsg: measureAreaContinueMsg[0]\n  });\n  this.measureArea.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__[\"interactionDecoration\"])(this.measureArea);\n  this.measureAzimut = new ngeo_interaction_MeasureAzimut_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]($filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {\n    sketchStyle: style,\n    startMsg: measureStartMsg[0],\n    continueMsg: measureAzimutContinueMsg[0]\n  });\n  this.measureAzimut.setActive(false);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__[\"interactionDecoration\"])(this.measureAzimut);\n  this.measureAzimut.on('measureend', function (evt) {\n    var el = evt.target.getTooltipElement();\n    el.innerHTML += '<br>Additional info';\n  });\n}\n\nmodule.controller('AppMeasuretoolsController', MeasuretoolsController);\n\nMeasuretoolsController.prototype.$onInit = function () {\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  this.map.addInteraction(this.measureLength);\n  this.map.addInteraction(this.measureArea);\n  this.map.addInteraction(this.measureAzimut);\n};\n\nfunction MainController() {\n  this.lang = 'en';\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      center: [692114.718759744, 5743119.914347709],\n      zoom: 15\n    })\n  });\n  this.map.addControl(new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]());\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/measure.js?");

/***/ }),

/***/ "./examples/partials/measuretools.html":
/*!*********************************************!*\
  !*** ./examples/partials/measuretools.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div ngeo-btn-group class=\"btn-group\">\\n  <button ngeo-btn class=\"btn btn-primary\" ng-model=\"$ctrl.measureLength.active\">Length</button>\\n  <button ngeo-btn class=\"btn btn-primary\" ng-model=\"$ctrl.measureArea.active\">Area</button>\\n  <button ngeo-btn class=\"btn btn-primary\" ng-model=\"$ctrl.measureAzimut.active\">Azimut</button>\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./examples/partials/measuretools.html?");

/***/ }),

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, render, default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(526);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/control/ScaleLine.js_from_dll-reference_vendor?");

/***/ }),

/***/ 25:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/measure.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/measure.js */\"./examples/measure.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/measure.js?");

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