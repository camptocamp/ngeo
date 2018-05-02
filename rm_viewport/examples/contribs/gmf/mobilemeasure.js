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
/******/ 		"mobilemeasure": 0
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
/******/ 	deferredModules.push([16,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/mobilemeasure.css":
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/mobilemeasure.css?");

/***/ }),

/***/ "./contribs/gmf/examples/mobilemeasure.js":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobilemeasure.css */ \"./contribs/gmf/examples/mobilemeasure.css\");\n/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component.js */ \"./contribs/gmf/src/map/component.js\");\n/* harmony import */ var gmf_permalink_Permalink_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/permalink/Permalink.js */ \"./contribs/gmf/src/permalink/Permalink.js\");\n/* harmony import */ var gmf_mobile_measure_areaComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/mobile/measure/areaComponent.js */ \"./contribs/gmf/src/mobile/measure/areaComponent.js\");\n/* harmony import */ var gmf_mobile_measure_lengthComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/mobile/measure/lengthComponent.js */ \"./contribs/gmf/src/mobile/measure/lengthComponent.js\");\n/* harmony import */ var gmf_mobile_measure_pointComponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/mobile/measure/pointComponent.js */ \"./contribs/gmf/src/mobile/measure/pointComponent.js\");\n/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ \"./src/misc/btnComponent.js\");\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine.js */ \"./node_modules/ol/control/ScaleLine.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\nMainController.$inject = [\"gmfPermalink\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, gmf_permalink_Permalink_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, gmf_mobile_measure_areaComponent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, gmf_mobile_measure_lengthComponent_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, gmf_mobile_measure_pointComponent_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].name]);\nmodule.value('gmfRasterUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].RASTER);\nmodule.constant('defaultTheme', 'Demo');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController(gmfPermalink) {\n  var center = gmfPermalink.getMapCenter() || [537635, 152640];\n  var zoom = gmfPermalink.getMapZoom() || 3;\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],\n      center: center,\n      zoom: zoom\n    })\n  });\n  this.map.addControl(new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]());\n  this.measureAreaActive = false;\n  this.measureLengthActive = false;\n  this.measurePointLayersConfig = [{\n    name: 'aster',\n    unit: 'm',\n    decimals: 2\n  }, {\n    name: 'srtm',\n    unit: 'm'\n  }];\n  this.measurePointActive = false;\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/examples/mobilemeasure.js?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/areaComponent.js":
/*!**********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/areaComponent.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ \"./src/misc/filters.js\");\n/* harmony import */ var ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile.js */ \"./src/interaction/MeasureAreaMobile.js\");\n/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ \"./contribs/gmf/src/mobile/measure/baseComponent.js\");\nmobileMeasureAreaComponent.$inject = [\"gmfMobileMeasureAreaTemplateUrl\"];\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureArea', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name]);\nmodule.value('gmfMobileMeasureAreaTemplateUrl', function (element, attrs) {\n  var templateUrl = attrs.gmfMobileMeasureAreaTemplateurl;\n  return templateUrl !== undefined ? templateUrl : 'gmf/measure/areaComponent';\n});\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('gmf/measure/areaComponent', __webpack_require__(/*! ./baseComponent.html */ \"./contribs/gmf/src/mobile/measure/baseComponent.html\"));\n}]);\n\nfunction mobileMeasureAreaComponent(gmfMobileMeasureAreaTemplateUrl) {\n  return {\n    restrict: 'A',\n    scope: {\n      'active': '=gmfMobileMeasureareaActive',\n      'precision': '<?gmfMobileMeasureareaPrecision',\n      'map': '=gmfMobileMeasureareaMap',\n      'sketchStyle': '=?gmfMobileMeasureareaSketchstyle'\n    },\n    controller: 'GmfMobileMeasureAreaController as ctrl',\n    bindToController: true,\n    templateUrl: gmfMobileMeasureAreaTemplateUrl,\n    link: function link(scope, element, attrs, controller) {\n      if (!controller) {\n        throw new Error('Missing controller');\n      }\n\n      controller.init();\n    }\n  };\n}\n\nmodule.directive('gmfMobileMeasurearea', mobileMeasureAreaComponent);\n\nvar Controller = function (_MeasueMobileBaseCont) {\n  Controller.$inject = [\"$scope\", \"$filter\", \"gettextCatalog\"];\n\n  _inheritsLoose(Controller, _MeasueMobileBaseCont);\n\n  function Controller($scope, $filter, gettextCatalog) {\n    var _this;\n\n    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;\n    _this.measure = null;\n    return _this;\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.init = function init() {\n    if (this.precision === null) {\n      throw new Error('Missing precision');\n    }\n\n    this.measure = new ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {\n      precision: this.precision,\n      sketchStyle: this.sketchStyle\n    });\n\n    _MeasueMobileBaseCont.prototype.init.call(this);\n  };\n\n  _proto.addPoint = function addPoint() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.addToDrawing();\n  };\n\n  _proto.clear = function clear() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.clearDrawing();\n  };\n\n  _proto.finish = function finish() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.finishDrawing();\n  };\n\n  _proto.deactivate = function deactivate() {\n    this.active = false;\n  };\n\n  return Controller;\n}(gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"MeasueMobileBaseController\"]);\n\nmodule.controller('GmfMobileMeasureAreaController', Controller);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/areaComponent.js?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/baseComponent.html":
/*!************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/baseComponent.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.drawing && (!ctrl.valid)\"\\n   ng-click=\"ctrl.addPoint()\">\\n     <span class=\"fa fa-check\"></span>\\n     {{\\'Set as starting point\\' | translate}}\\n</a>\\n<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.dirty\"\\n   ng-click=\"ctrl.addPoint()\">\\n     <span class=\"fa fa-plus\"></span>\\n     {{\\'Add new point\\' | translate}}\\n</a>\\n<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.drawing && ctrl.valid && !ctrl.dirty\"\\n   ng-click=\"ctrl.finish()\">\\n     <span class=\"fa fa-check\"></span>\\n     {{\\'Terminate\\' | translate}}\\n</a>\\n<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.valid\"\\n   ng-click=\"ctrl.clear()\">\\n     <span class=\"fa fa-repeat\"></span>\\n     {{\\'Clear\\' | translate}}\\n</a>\\n<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.active\"\\n   ng-click=\"ctrl.deactivate()\">\\n     <span class=\"fa fa-times\"></span>\\n     {{\\'Close\\' | translate}}\\n</a>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/baseComponent.html?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/baseComponent.js":
/*!**********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/baseComponent.js ***!
  \**********************************************************/
/*! exports provided: MeasueMobileBaseController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MeasueMobileBaseController\", function() { return MeasueMobileBaseController; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate.js */ \"./src/misc/decorate.js\");\n/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ \"./src/misc/filters.js\");\n/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events.js */ \"./node_modules/ol/events.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/RegularShape.js */ \"./node_modules/ol/style/RegularShape.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ \"./src/interaction/MobileDraw.js\");\nMeasueMobileBaseController.$inject = [\"$scope\", \"$filter\", \"gettextCatalog\"];\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureBase', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nfunction MeasueMobileBaseController($scope, $filter, gettextCatalog) {\n  var _this = this;\n\n  this.scope = $scope;\n  this.filter = $filter;\n  this.gettextCatalog = gettextCatalog;\n  this.map = null;\n  this.active = false;\n  this.scope.$watch(function () {\n    return _this.active;\n  }, function (newVal) {\n    if (!_this.measure) {\n      throw new Error('Missing measure');\n    }\n\n    _this.measure.setActive(newVal);\n  });\n  this.precision = null;\n  this.sketchStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      color: 'rgba(255, 255, 255, 0.2)'\n    }),\n    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      color: 'rgba(0, 0, 0, 0.5)',\n      lineDash: [10, 10],\n      width: 2\n    }),\n    image: new ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        color: 'rgba(0, 0, 0, 0.7)',\n        width: 2\n      }),\n      points: 4,\n      radius: 8,\n      radius2: 0,\n      angle: 0\n    })\n  });\n  this.measure = null;\n  this.drawInteraction = null;\n  this.dirty = false;\n  this.drawing = false;\n  this.valid = false;\n}\n\nMeasueMobileBaseController.prototype.init = function () {\n  var _this2 = this;\n\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  if (!this.measure) {\n    throw new Error('Missing measure');\n  }\n\n  this.measure.setActive(this.active);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__[\"interactionDecoration\"])(this.measure);\n  var drawInteraction = this.measure.getDrawInteraction();\n\n  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])) {\n    throw new Error('Wrong drawInteraction');\n  }\n\n  this.drawInteraction = drawInteraction;\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__[\"interactionDecoration\"])(drawInteraction);\n  Object.defineProperty(this, 'hasPoints', {\n    get: function get() {\n      return this.drawInteraction.getFeature() !== null;\n    }\n  });\n  ol_events_js__WEBPACK_IMPORTED_MODULE_3__[\"listen\"](drawInteraction, 'change:dirty', function (evt) {\n    _this2.dirty = drawInteraction.getDirty();\n\n    if (_this2.dirty) {\n      _this2.scope.$apply();\n    }\n  }, this);\n  ol_events_js__WEBPACK_IMPORTED_MODULE_3__[\"listen\"](drawInteraction, 'change:drawing', function (evt) {\n    _this2.drawing = drawInteraction.getDrawing();\n  }, this);\n  ol_events_js__WEBPACK_IMPORTED_MODULE_3__[\"listen\"](drawInteraction, 'change:valid', function (evt) {\n    _this2.valid = drawInteraction.getValid();\n  }, this);\n  this.map.addInteraction(this.measure);\n};\n\nmodule.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/baseComponent.js?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/lengthComponent.js":
/*!************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/lengthComponent.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ \"./src/misc/filters.js\");\n/* harmony import */ var ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile.js */ \"./src/interaction/MeasureLengthMobile.js\");\n/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ \"./contribs/gmf/src/mobile/measure/baseComponent.js\");\nmobileMeasureLenthComponent.$inject = [\"gmfMobileMeasureLengthTemplateUrl\"];\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureLength', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name]);\nmodule.value('gmfMobileMeasureLengthTemplateUrl', function (element, attrs) {\n  var templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;\n  return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';\n});\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('gmf/measure/lengthComponent', __webpack_require__(/*! ./baseComponent.html */ \"./contribs/gmf/src/mobile/measure/baseComponent.html\"));\n}]);\n\nfunction mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {\n  return {\n    restrict: 'A',\n    scope: {\n      'active': '=gmfMobileMeasurelengthActive',\n      'precision': '<?gmfMobileMeasurelengthPrecision',\n      'map': '=gmfMobileMeasurelengthMap',\n      'sketchStyle': '=?gmfMobileMeasurelengthSketchstyle'\n    },\n    controller: 'GmfMobileMeasureLengthController as ctrl',\n    bindToController: true,\n    templateUrl: gmfMobileMeasureLengthTemplateUrl,\n    link: function link(scope, element, attrs, controller) {\n      if (!controller) {\n        throw new Error('Missing controller');\n      }\n\n      controller.init();\n    }\n  };\n}\n\nmodule.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);\n\nvar Controller = function (_MeasueMobileBaseCont) {\n  Controller.$inject = [\"$scope\", \"$filter\", \"gettextCatalog\"];\n\n  _inheritsLoose(Controller, _MeasueMobileBaseCont);\n\n  function Controller($scope, $filter, gettextCatalog) {\n    var _this;\n\n    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;\n    _this.measure = null;\n    return _this;\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.init = function init() {\n    this.measure = new ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {\n      precision: this.precision || 0,\n      sketchStyle: this.sketchStyle\n    });\n\n    _MeasueMobileBaseCont.prototype.init.call(this);\n  };\n\n  _proto.addPoint = function addPoint() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.addToDrawing();\n  };\n\n  _proto.clear = function clear() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.clearDrawing();\n  };\n\n  _proto.finish = function finish() {\n    if (!this.drawInteraction) {\n      throw new Error('Missing drawInteraction');\n    }\n\n    this.drawInteraction.finishDrawing();\n  };\n\n  _proto.deactivate = function deactivate() {\n    this.active = false;\n  };\n\n  return Controller;\n}(gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__[\"MeasueMobileBaseController\"]);\n\nmodule.controller('GmfMobileMeasureLengthController', Controller);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/lengthComponent.js?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/pointComponent.html":
/*!*************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/pointComponent.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<a class=\"btn btn-default\"\\n   ng-if=\"ctrl.active\"\\n   ng-click=\"ctrl.deactivate()\">\\n     <span class=\"fa fa-times\"></span>\\n     {{\\'Close\\' | translate}}\\n</a>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/pointComponent.html?");

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/pointComponent.js":
/*!***********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/pointComponent.js ***!
  \***********************************************************/
/*! exports provided: MobileMeasurePointController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MobileMeasurePointController\", function() { return MobileMeasurePointController; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var gmf_raster_RasterService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gmf/raster/RasterService.js */ \"./contribs/gmf/src/raster/RasterService.js\");\n/* harmony import */ var ngeo_interaction_MeasurePointMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasurePointMobile.js */ \"./src/interaction/MeasurePointMobile.js\");\n/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce.js */ \"./src/misc/debounce.js\");\n/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate.js */ \"./src/misc/decorate.js\");\n/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/events.js */ \"./node_modules/ol/events.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/RegularShape.js */ \"./node_modules/ol/style/RegularShape.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ \"./src/interaction/MobileDraw.js\");\nMobileMeasurePointController.$inject = [\"gettextCatalog\", \"$scope\", \"$filter\", \"gmfRaster\", \"ngeoDebounce\"];\nmobileMeasurePointComponent.$inject = [\"gmfMobileMeasurePointTemplateUrl\"];\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasurePoint', [gmf_raster_RasterService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name]);\nmodule.value('gmfMobileMeasurePointTemplateUrl', function (element, attrs) {\n  var templateUrl = attrs.gmfMobileMeasurePointTemplateurl;\n  return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';\n});\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('gmf/measure/pointComponent', __webpack_require__(/*! ./pointComponent.html */ \"./contribs/gmf/src/mobile/measure/pointComponent.html\"));\n}]);\n\nfunction mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {\n  return {\n    restrict: 'A',\n    scope: {\n      'active': '=gmfMobileMeasurepointActive',\n      'getCoordinateDecimalsFn': '&?gmfMobileMeasurepointCoordinatedecimals',\n      'getLayersConfigFn': '&gmfMobileMeasurepointLayersconfig',\n      'map': '=gmfMobileMeasurepointMap',\n      'sketchStyle': '=?gmfMobileMeasurepointSketchstyle',\n      'format': '<gmfMobileMeasurepointFormat'\n    },\n    controller: 'GmfMobileMeasurePointController as ctrl',\n    bindToController: true,\n    templateUrl: gmfMobileMeasurePointTemplateUrl,\n    link: function link(scope, element, attrs, controller) {\n      if (!controller) {\n        throw new Error('Missing controller');\n      }\n\n      controller.init();\n    }\n  };\n}\n\nmodule.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);\nfunction MobileMeasurePointController(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce) {\n  var _this = this;\n\n  this.gmfRaster_ = gmfRaster;\n  this.ngeoDebounce_ = ngeoDebounce;\n  this.gettextCatalog_ = gettextCatalog;\n  this.$filter_ = $filter;\n  this.map = null;\n  this.active = false;\n\n  this.getCoordinateDecimalsFn = function () {\n    return 0;\n  };\n\n  $scope.$watch(function () {\n    return _this.active;\n  }, function (newVal) {\n    if (!_this.measure) {\n      throw new Error('Missing measure');\n    }\n\n    _this.measure.setActive(newVal);\n\n    _this.handleMeasureActiveChange_();\n  });\n  var coordinateDecimalsFn = this.getCoordinateDecimalsFn;\n  this.coordinateDecimals = coordinateDecimalsFn ? coordinateDecimalsFn() : 0;\n  this.layersConfig = [];\n  this.sketchStyle = [];\n\n  if (this.sketchStyle === undefined) {\n    this.sketchStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        color: 'rgba(255, 255, 255, 0.2)'\n      }),\n      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n        color: 'rgba(0, 0, 0, 0.5)',\n        lineDash: [10, 10],\n        width: 2\n      }),\n      image: new ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n        stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n          color: 'rgba(0, 0, 0, 0.7)',\n          width: 2\n        }),\n        points: 4,\n        radius: 8,\n        radius2: 0,\n        angle: 0\n      })\n    });\n  }\n\n  this.format = null;\n  this.measure = null;\n  this.drawInteraction = null;\n\n  this.getLayersConfigFn = function () {\n    return [];\n  };\n\n  this.mapViewPropertyChangeEventKey_ = null;\n}\n\nMobileMeasurePointController.prototype.init = function () {\n  this.measure = new ngeo_interaction_MeasurePointMobile_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.$filter_('ngeoNumberCoordinates'), this.format || '{x}, {y}', {\n    decimals: this.coordinateDecimals,\n    sketchStyle: this.sketchStyle\n  });\n  this.measure.setActive(this.active);\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__[\"interactionDecoration\"])(this.measure);\n  var drawInteraction = this.measure.getDrawInteraction();\n\n  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"])) {\n    throw new Error('Wrong drawInteraction');\n  }\n\n  this.drawInteraction = drawInteraction;\n  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__[\"interactionDecoration\"])(this.drawInteraction);\n  var layersConfig = this.getLayersConfigFn();\n\n  if (!Array.isArray(layersConfig)) {\n    throw new Error('Wrong layersConfig type');\n  }\n\n  this.layersConfig = layersConfig;\n\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  this.map.addInteraction(this.measure);\n};\n\nMobileMeasurePointController.prototype.deactivate = function () {\n  this.active = false;\n};\n\nMobileMeasurePointController.prototype.translate = function (str) {\n  return this.gettextCatalog_.getString(str);\n};\n\nMobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  if (!this.measure) {\n    throw new Error('Missing measure');\n  }\n\n  if (this.measure.getActive()) {\n    var view = this.map.getView();\n    this.mapViewPropertyChangeEventKey_ = ol_events_js__WEBPACK_IMPORTED_MODULE_5__[\"listen\"](view, 'propertychange', this.ngeoDebounce_(this.getMeasure_.bind(this), 300, true), this);\n    this.getMeasure_();\n  } else if (this.mapViewPropertyChangeEventKey_) {\n    ol_events_js__WEBPACK_IMPORTED_MODULE_5__[\"unlistenByKey\"](this.mapViewPropertyChangeEventKey_);\n    this.mapViewPropertyChangeEventKey_ = null;\n  }\n};\n\nMobileMeasurePointController.prototype.getMeasure_ = function () {\n  var _this2 = this;\n\n  if (!this.map) {\n    throw new Error('Missing map');\n  }\n\n  var center = this.map.getView().getCenter();\n\n  if (!Array.isArray(center)) {\n    throw new Error('Wrong center');\n  }\n\n  var params = {\n    'layers': this.layersConfig.map(function (config) {\n      return config.name;\n    }).join(',')\n  };\n  this.gmfRaster_.getRaster(center, params).then(function (object) {\n    if (!_this2.measure) {\n      throw new Error('Missing measure');\n    }\n\n    var el = _this2.measure.getTooltipElement();\n\n    var ctn = document.createElement('div');\n    var className = 'gmf-mobile-measure-point';\n    ctn.className = className;\n\n    for (var _iterator = _this2.layersConfig, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {\n      var _ref;\n\n      if (_isArray) {\n        if (_i >= _iterator.length) break;\n        _ref = _iterator[_i++];\n      } else {\n        _i = _iterator.next();\n        if (_i.done) break;\n        _ref = _i.value;\n      }\n\n      var config = _ref;\n      var key = config.name;\n\n      if (key in object) {\n        var value = object[key];\n        var childEl = document.createElement('div');\n        childEl.className = \"gmf-mobile-measure-point-\" + key;\n        var unit = config.unit || '';\n        var decimals = config.decimals > 0 ? config.decimals : 0;\n        value = _this2.$filter_('number')(value, decimals);\n        childEl.innerHTML = [_this2.translate(key), ': ', value, ' ', unit].join('');\n        ctn.appendChild(childEl);\n      }\n    }\n\n    var previousCtn = el.getElementsByClassName(className);\n\n    if (previousCtn[0]) {\n      previousCtn[0].remove();\n    }\n\n    el.appendChild(ctn);\n  });\n};\n\nmodule.controller('GmfMobileMeasurePointController', MobileMeasurePointController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/src/mobile/measure/pointComponent.js?");

/***/ }),

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, render, default */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(526);\n\n//# sourceURL=webpack:///delegated_./node_modules/ol/control/ScaleLine.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./src/interaction/MeasureAreaMobile.js":
/*!**********************************************!*\
  !*** ./src/interaction/MeasureAreaMobile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureArea.js */ \"./src/interaction/MeasureArea.js\");\n/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ \"./src/interaction/MobileDraw.js\");\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\nvar MeasureAreaMobile = function (_ngeoInteractionMeasu) {\n  _inheritsLoose(MeasureAreaMobile, _ngeoInteractionMeasu);\n\n  function MeasureAreaMobile(format, gettextCatalog, options) {\n    if (options === void 0) {\n      options = {};\n    }\n\n    Object.assign(options, {\n      displayHelpTooltip: false\n    });\n    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;\n  }\n\n  var _proto = MeasureAreaMobile.prototype;\n\n  _proto.createDrawInteraction = function createDrawInteraction(style, source) {\n    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      type: 'Polygon',\n      style: style\n    });\n  };\n\n  return MeasureAreaMobile;\n}(ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MeasureAreaMobile);\n\n//# sourceURL=webpack:///./src/interaction/MeasureAreaMobile.js?");

/***/ }),

/***/ "./src/interaction/MeasureLengthMobile.js":
/*!************************************************!*\
  !*** ./src/interaction/MeasureLengthMobile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureLength.js */ \"./src/interaction/MeasureLength.js\");\n/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ \"./src/interaction/MobileDraw.js\");\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\nvar _default = function (_ngeoInteractionMeasu) {\n  _inheritsLoose(_default, _ngeoInteractionMeasu);\n\n  function _default(format, gettextCatalog, opt_options) {\n    var options = opt_options !== undefined ? opt_options : {};\n    Object.assign(options, {\n      displayHelpTooltip: false\n    });\n    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;\n  }\n\n  var _proto = _default.prototype;\n\n  _proto.createDrawInteraction = function createDrawInteraction(style, source) {\n    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      type: 'LineString',\n      style: style\n    });\n  };\n\n  return _default;\n}(ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/interaction/MeasureLengthMobile.js?");

/***/ }),

/***/ "./src/interaction/MeasurePointMobile.js":
/*!***********************************************!*\
  !*** ./src/interaction/MeasurePointMobile.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/Measure.js */ \"./src/interaction/Measure.js\");\n/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ \"./src/interaction/MobileDraw.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\nvar _default = function (_ngeoInteractionMeasu) {\n  _inheritsLoose(_default, _ngeoInteractionMeasu);\n\n  function _default(format, coordFormat, options) {\n    var _this;\n\n    if (options === void 0) {\n      options = {};\n    }\n\n    Object.assign(options, {\n      displayHelpTooltip: false\n    });\n    _this = _ngeoInteractionMeasu.call(this, options) || this;\n    _this.format_ = format;\n    _this.coordFormat_ = coordFormat;\n    return _this;\n  }\n\n  var _proto = _default.prototype;\n\n  _proto.createDrawInteraction = function createDrawInteraction(style, source) {\n    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      type: 'Point',\n      style: style\n    });\n  };\n\n  _proto.handleMeasure = function handleMeasure(callback) {\n    if (!this.sketchFeature) {\n      throw new Error('Missing sketchFeature');\n    }\n\n    var geom = this.sketchFeature.getGeometry();\n\n    if (!(geom instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])) {\n      throw new Error('Missing geometry');\n    }\n\n    var dec = this.decimals;\n    var output = Object(ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__[\"getFormattedPoint\"])(geom, dec, this.format_, this.coordFormat_);\n    var coord = geom.getLastCoordinate();\n    callback(output, coord);\n  };\n\n  return _default;\n}(ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/interaction/MeasurePointMobile.js?");

/***/ }),

/***/ "./src/interaction/MobileDraw.js":
/*!***************************************!*\
  !*** ./src/interaction/MobileDraw.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var ngeo_interaction_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/common.js */ \"./src/interaction/common.js\");\n/* harmony import */ var ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/CustomEvent.js */ \"./src/CustomEvent.js\");\n/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/events.js */ \"./node_modules/ol/events.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_functions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/functions.js */ \"./node_modules/ol/functions.js\");\n/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/LineString.js */ \"./node_modules/ol/geom/LineString.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Polygon.js */ \"./node_modules/ol/geom/Polygon.js\");\n/* harmony import */ var ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/SimpleGeometry.js */ \"./node_modules/ol/geom/SimpleGeometry.js\");\n/* harmony import */ var ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Interaction.js */ \"./node_modules/ol/interaction/Interaction.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _default = function (_olInteractionInterac) {\n  _inheritsLoose(_default, _olInteractionInterac);\n\n  function _default(options) {\n    var _this;\n\n    _this = _olInteractionInterac.call(this, {\n      handleEvent: ol_functions_js__WEBPACK_IMPORTED_MODULE_4__[\"TRUE\"]\n    }) || this;\n    _this.changeEventKey_ = null;\n    _this.type_ = options.type;\n    _this.minPoints_ = options.minPoints ? options.minPoints : _this.type_ === 'Polygon' ? 3 : 2;\n    _this.sketchFeature_ = null;\n    _this.sketchPoints_ = [];\n    _this.sketchPoint_ = null;\n    _this.overlay_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n      source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n        useSpatialIndex: false,\n        wrapX: options.wrapX ? options.wrapX : false\n      }),\n      style: options.style || Object(ngeo_interaction_common_js__WEBPACK_IMPORTED_MODULE_0__[\"getDefaultDrawStyleFunction\"])(),\n      updateWhileAnimating: true,\n      updateWhileInteracting: true\n    });\n    ol_events_js__WEBPACK_IMPORTED_MODULE_2__[\"listen\"](_assertThisInitialized(_this), 'change:active', _this.updateState_, _assertThisInitialized(_this));\n\n    _this.set('dirty', false);\n\n    _this.set('drawing', false);\n\n    _this.set('valid', false);\n\n    return _this;\n  }\n\n  var _proto = _default.prototype;\n\n  _proto.setMap = function setMap(map) {\n    var currentMap = this.getMap();\n\n    if (currentMap) {\n      if (this.changeEventKey_) {\n        ol_events_js__WEBPACK_IMPORTED_MODULE_2__[\"unlistenByKey\"](this.changeEventKey_);\n      }\n    }\n\n    ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].prototype.setMap.call(this, map);\n\n    if (map) {\n      this.changeEventKey_ = ol_events_js__WEBPACK_IMPORTED_MODULE_2__[\"listen\"](map.getView(), 'change:center', this.handleViewCenterChange_, this);\n    }\n\n    this.updateState_();\n  };\n\n  _proto.getDirty = function getDirty() {\n    return this.get('dirty');\n  };\n\n  _proto.getDrawing = function getDrawing() {\n    return this.get('drawing');\n  };\n\n  _proto.getValid = function getValid() {\n    return this.get('valid');\n  };\n\n  _proto.getFeature = function getFeature() {\n    return this.sketchFeature_;\n  };\n\n  _proto.addToDrawing = function addToDrawing() {\n    if (!this.sketchPoint_) {\n      throw new Error('Missing sketchPoint');\n    }\n\n    var active = this.getActive();\n    var drawing = this.getDrawing();\n\n    if (!active || !drawing) {\n      return;\n    }\n\n    var sketchFeatureGeom;\n    var sketchPointGeom = this.getSketchPointGeometry_();\n    var coordinate = sketchPointGeom.getCoordinates();\n    var coordinates = null;\n\n    if (this.type_ === 'Point') {\n      if (!this.sketchFeature_) {\n        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](coordinate));\n        var event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('drawstart', {\n          feature: this.sketchFeature_\n        });\n        this.dispatchEvent(event);\n      }\n\n      sketchFeatureGeom = this.sketchFeature_.getGeometry();\n\n      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]) {\n        sketchFeatureGeom.setCoordinates(coordinate);\n      }\n\n      return;\n    }\n\n    if (this.type_ === 'LineString') {\n      this.sketchPoints_.push(this.sketchPoint_);\n\n      if (!this.sketchFeature_) {\n        coordinates = [coordinate.slice(), coordinate.slice()];\n        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](coordinates));\n\n        var _event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('drawstart', {\n          feature: this.sketchFeature_\n        });\n\n        this.dispatchEvent(_event);\n      } else {\n        sketchFeatureGeom = this.sketchFeature_.getGeometry();\n\n        if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]) {\n          coordinates = sketchFeatureGeom.getCoordinates();\n          coordinates.push(coordinate.slice());\n          sketchFeatureGeom.setCoordinates(coordinates);\n        }\n      }\n    }\n\n    if (this.type_ === 'Polygon') {\n      this.sketchPoints_.push(this.sketchPoint_);\n\n      if (!this.sketchFeature_) {\n        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];\n        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]([coordinates]));\n\n        var _event2 = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('drawstart', {\n          feature: this.sketchFeature_\n        });\n\n        this.dispatchEvent(_event2);\n      } else {\n        sketchFeatureGeom = this.sketchFeature_.getGeometry();\n\n        if (sketchFeatureGeom instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]) {\n          var coordinatess = sketchFeatureGeom.getCoordinates();\n          coordinates = coordinatess[0];\n          coordinates.push(coordinate.slice());\n          sketchFeatureGeom.setCoordinates(coordinatess);\n        }\n      }\n    }\n\n    var dirty = this.getDirty();\n\n    if (dirty) {\n      this.set('dirty', false);\n    }\n\n    if (!coordinates) {\n      throw new Error('Missing coordinates');\n    }\n\n    var valid = this.getValid();\n\n    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {\n      if (coordinates.length >= this.minPoints_) {\n        if (!valid) {\n          this.set('valid', true);\n        }\n      } else {\n        if (valid) {\n          this.set('valid', false);\n        }\n      }\n    }\n\n    this.sketchPoint_ = null;\n    this.updateSketchFeatures_();\n  };\n\n  _proto.clearDrawing = function clearDrawing() {\n    this.setActive(false);\n    this.setActive(true);\n  };\n\n  _proto.finishDrawing = function finishDrawing() {\n    var active = this.getActive();\n    var drawing = this.getDrawing();\n\n    if (!active || !drawing) {\n      return;\n    }\n\n    if (this.sketchPoint_) {\n      this.addToDrawing();\n    }\n\n    this.set('drawing', false);\n    var event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('drawend', {\n      feature: this.sketchFeature_\n    });\n    this.dispatchEvent(event);\n  };\n\n  _proto.startDrawing_ = function startDrawing_() {\n    this.set('drawing', true);\n    this.createOrUpdateSketchPoint_();\n    this.updateSketchFeatures_();\n\n    if (this.type_ === 'Point') {\n      this.addToDrawing();\n    }\n  };\n\n  _proto.modifyDrawing_ = function modifyDrawing_() {\n    if (!this.sketchFeature_) {\n      return;\n    }\n\n    var center = this.getCenter_();\n\n    if (this.type_ === 'LineString') {\n      var sketchFeatureGeom = this.sketchFeature_.getGeometry();\n\n      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]) {\n        var coordinates = sketchFeatureGeom.getCoordinates();\n        coordinates.pop();\n        coordinates.push(center);\n        sketchFeatureGeom.setCoordinates(coordinates);\n      }\n    } else if (this.type_ === 'Polygon') {\n      var _sketchFeatureGeom = this.sketchFeature_.getGeometry();\n\n      if (_sketchFeatureGeom instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]) {\n        var coordinatess = _sketchFeatureGeom.getCoordinates();\n\n        var _coordinates = coordinatess[0];\n\n        _coordinates.pop();\n\n        _coordinates.push(center);\n\n        _sketchFeatureGeom.setCoordinates([_coordinates]);\n      }\n    }\n\n    var dirty = this.getDirty();\n\n    if (!dirty) {\n      this.set('dirty', true);\n    }\n  };\n\n  _proto.abortDrawing_ = function abortDrawing_() {\n    var sketchFeature = this.sketchFeature_;\n\n    if (sketchFeature || this.sketchPoints_.length > 0) {\n      this.sketchFeature_ = null;\n      this.sketchPoint_ = null;\n      this.overlay_.getSource().clear(true);\n    }\n\n    this.sketchPoints_ = [];\n    this.set('dirty', false);\n    this.set('drawing', false);\n    this.set('valid', false);\n    return sketchFeature;\n  };\n\n  _proto.updateState_ = function updateState_() {\n    var map = this.getMap();\n    var active = this.getActive();\n\n    if (!map || !active) {\n      this.abortDrawing_();\n    } else {\n      this.startDrawing_();\n    }\n\n    this.overlay_.setMap(active ? map : null);\n  };\n\n  _proto.handleViewCenterChange_ = function handleViewCenterChange_(evt) {\n    var active = this.getActive();\n    var drawing = this.getDrawing();\n\n    if (!active || !drawing) {\n      return;\n    }\n\n    this.createOrUpdateSketchPoint_();\n\n    if (this.type_ === 'Point') {\n      this.addToDrawing();\n    } else {\n      this.modifyDrawing_();\n      this.updateSketchFeatures_();\n    }\n  };\n\n  _proto.createOrUpdateSketchPoint_ = function createOrUpdateSketchPoint_() {\n    var center = this.getCenter_();\n\n    if (this.sketchPoint_) {\n      var geometry = this.getSketchPointGeometry_();\n      geometry.setCoordinates(center);\n    } else {\n      this.sketchPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"](center));\n    }\n  };\n\n  _proto.updateSketchFeatures_ = function updateSketchFeatures_() {\n    var sketchFeatures = [];\n\n    if (this.sketchFeature_) {\n      sketchFeatures.push(this.sketchFeature_);\n    }\n\n    if (this.sketchPoint_) {\n      sketchFeatures.push(this.sketchPoint_);\n    }\n\n    var overlaySource = this.overlay_.getSource();\n    overlaySource.clear(true);\n    overlaySource.addFeatures(sketchFeatures);\n    overlaySource.addFeatures(this.sketchPoints_);\n  };\n\n  _proto.getSketchPointGeometry_ = function getSketchPointGeometry_() {\n    if (!this.sketchPoint_) {\n      throw new Error('Missing sketchPoint');\n    }\n\n    var geometry = this.sketchPoint_.getGeometry();\n\n    if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]) {\n      return geometry;\n    } else {\n      throw new Error('Wrong geometry type');\n    }\n  };\n\n  _proto.getCenter_ = function getCenter_() {\n    var center = this.getMap().getView().getCenter();\n\n    if (!Array.isArray(center)) {\n      throw new Error('Missing center');\n    }\n\n    return center;\n  };\n\n  return _default;\n}(ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/interaction/MobileDraw.js?");

/***/ }),

/***/ 16:
/*!***********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/mobilemeasure.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/mobilemeasure.js */\"./contribs/gmf/examples/mobilemeasure.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/mobilemeasure.js?");

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