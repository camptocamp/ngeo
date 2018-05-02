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



/***/ }),

/***/ "./contribs/gmf/examples/mobilemeasure.js":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./contribs/gmf/examples/url.js");
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobilemeasure.css */ "./contribs/gmf/examples/mobilemeasure.css");
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mobilemeasure_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var gmf_permalink_Permalink_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/permalink/Permalink.js */ "./contribs/gmf/src/permalink/Permalink.js");
/* harmony import */ var gmf_mobile_measure_areaComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/mobile/measure/areaComponent.js */ "./contribs/gmf/src/mobile/measure/areaComponent.js");
/* harmony import */ var gmf_mobile_measure_lengthComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/mobile/measure/lengthComponent.js */ "./contribs/gmf/src/mobile/measure/lengthComponent.js");
/* harmony import */ var gmf_mobile_measure_pointComponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/mobile/measure/pointComponent.js */ "./contribs/gmf/src/mobile/measure/pointComponent.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ "./node_modules/@geoblocks/proj/src/EPSG_21781.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine.js */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
MainController.$inject = ["gmfPermalink"];















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_map_component_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_permalink_Permalink_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_mobile_measure_areaComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_mobile_measure_lengthComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, gmf_mobile_measure_pointComponent_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__["default"].name]);
module.value('gmfRasterUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].RASTER);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

function MainController(gmfPermalink) {
  var center = gmfPermalink.getMapCenter() || [537635, 152640];
  var zoom = gmfPermalink.getMapZoom() || 3;
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_14__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom
    })
  });
  this.map.addControl(new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_12__["default"]());
  this.measureAreaActive = false;
  this.measureLengthActive = false;
  this.measurePointLayersConfig = [{
    name: 'aster',
    unit: 'm',
    decimals: 2
  }, {
    name: 'srtm',
    unit: 'm'
  }];
  this.measurePointActive = false;
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/areaComponent.js":
/*!**********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/areaComponent.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile.js */ "./src/interaction/MeasureAreaMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ "./contribs/gmf/src/mobile/measure/baseComponent.js");
mobileMeasureAreaComponent.$inject = ["gmfMobileMeasureAreaTemplateUrl"];

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureArea', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.value('gmfMobileMeasureAreaTemplateUrl', function (element, attrs) {
  var templateUrl = attrs['gmfMobileMeasureAreaTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/areaComponent';
});
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/areaComponent', __webpack_require__(/*! ./baseComponent.html */ "./contribs/gmf/src/mobile/measure/baseComponent.html"));
}]);

function mobileMeasureAreaComponent(gmfMobileMeasureAreaTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasureareaActive',
      'precision': '<?gmfMobileMeasureareaPrecision',
      'map': '=gmfMobileMeasureareaMap',
      'sketchStyle': '=?gmfMobileMeasureareaSketchstyle'
    },
    controller: 'GmfMobileMeasureAreaController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureAreaTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      controller.init();
    }
  };
}

module.directive('gmfMobileMeasurearea', mobileMeasureAreaComponent);

var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog"];

  _inheritsLoose(Controller, _MeasueMobileBaseCont);

  function Controller($scope, $filter, gettextCatalog) {
    var _this;

    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.measure;
    return _this;
  }

  var _proto = Controller.prototype;

  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.precision,
      sketchStyle: this.sketchStyle
    });

    _MeasueMobileBaseCont.prototype.init.call(this);
  };

  _proto.addPoint = function addPoint() {
    this.drawInteraction.addToDrawing();
  };

  _proto.clear = function clear() {
    this.drawInteraction.clearDrawing();
  };

  _proto.finish = function finish() {
    this.drawInteraction.finishDrawing();
  };

  _proto.deactivate = function deactivate() {
    this.active = false;
  };

  return Controller;
}(gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);

module.controller('GmfMobileMeasureAreaController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/baseComponent.html":
/*!************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/baseComponent.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default"\n   ng-if="ctrl.drawing && (!ctrl.valid)"\n   ng-click="ctrl.addPoint()">\n     <span class="fa fa-check"></span>\n     {{\'Set as starting point\' | translate}}\n</a>\n<a class="btn btn-default"\n   ng-if="ctrl.dirty"\n   ng-click="ctrl.addPoint()">\n     <span class="fa fa-plus"></span>\n     {{\'Add new point\' | translate}}\n</a>\n<a class="btn btn-default"\n   ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty"\n   ng-click="ctrl.finish()">\n     <span class="fa fa-check"></span>\n     {{\'Terminate\' | translate}}\n</a>\n<a class="btn btn-default"\n   ng-if="ctrl.valid"\n   ng-click="ctrl.clear()">\n     <span class="fa fa-repeat"></span>\n     {{\'Clear\' | translate}}\n</a>\n<a class="btn btn-default"\n   ng-if="ctrl.active"\n   ng-click="ctrl.deactivate()">\n     <span class="fa fa-times"></span>\n     {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/baseComponent.js":
/*!**********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/baseComponent.js ***!
  \**********************************************************/
/*! exports provided: MeasueMobileBaseController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasueMobileBaseController", function() { return MeasueMobileBaseController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/RegularShape.js */ "./node_modules/ol/style/RegularShape.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
MeasueMobileBaseController.$inject = ["$scope", "$filter", "gettextCatalog"];








var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureBase', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  var _this = this;

  this.scope = $scope;
  this.filter = $filter;
  this.gettextCatalog = gettextCatalog;
  this.map;
  this.active;
  this.scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    _this.measure.setActive(newVal);
  });
  this.precision;
  this.sketchStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
        color: 'rgba(0, 0, 0, 0.7)',
        width: 2
      }),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0
    })
  });
  this.measure;
  this.drawInteraction;
  this.dirty = false;
  this.drawing = false;
  this.valid = false;
}

MeasueMobileBaseController.prototype.init = function () {
  var _this2 = this;

  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(this.measure);
  this.drawInteraction = this.measure.getDrawInteraction();
  var drawInteraction = this.drawInteraction;
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(drawInteraction);
  Object.defineProperty(this, 'hasPoints', {
    get: function get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });
  ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"](drawInteraction, 'change:dirty', function (evt) {
    _this2.dirty = drawInteraction.getDirty();

    if (_this2.dirty) {
      _this2.scope.$apply();
    }
  }, this);
  ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"](drawInteraction, 'change:drawing', function (evt) {
    _this2.drawing = drawInteraction.getDrawing();
  }, this);
  ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"](drawInteraction, 'change:valid', function (evt) {
    _this2.valid = drawInteraction.getValid();
  }, this);
  this.map.addInteraction(this.measure);
};

module.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/lengthComponent.js":
/*!************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/lengthComponent.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile.js */ "./src/interaction/MeasureLengthMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ "./contribs/gmf/src/mobile/measure/baseComponent.js");
mobileMeasureLenthComponent.$inject = ["gmfMobileMeasureLengthTemplateUrl"];

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureLength', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.value('gmfMobileMeasureLengthTemplateUrl', function (element, attrs) {
  var templateUrl = attrs['gmfMobileMeasureLengthTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';
});
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/lengthComponent', __webpack_require__(/*! ./baseComponent.html */ "./contribs/gmf/src/mobile/measure/baseComponent.html"));
}]);

function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'precision': '<?gmfMobileMeasurelengthPrecision',
      'map': '=gmfMobileMeasurelengthMap',
      'sketchStyle': '=?gmfMobileMeasurelengthSketchstyle'
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      controller.init();
    }
  };
}

module.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);

var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog"];

  _inheritsLoose(Controller, _MeasueMobileBaseCont);

  function Controller($scope, $filter, gettextCatalog) {
    var _this;

    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.measure;
    return _this;
  }

  var _proto = Controller.prototype;

  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.precision,
      sketchStyle: this.sketchStyle
    });

    _MeasueMobileBaseCont.prototype.init.call(this);
  };

  _proto.addPoint = function addPoint() {
    this.drawInteraction.addToDrawing();
  };

  _proto.clear = function clear() {
    this.drawInteraction.clearDrawing();
  };

  _proto.finish = function finish() {
    this.drawInteraction.finishDrawing();
  };

  _proto.deactivate = function deactivate() {
    this.active = false;
  };

  return Controller;
}(gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);

module.controller('GmfMobileMeasureLengthController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/pointComponent.html":
/*!*************************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/pointComponent.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default"\n   ng-if="ctrl.active"\n   ng-click="ctrl.deactivate()">\n     <span class="fa fa-times"></span>\n     {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./contribs/gmf/src/mobile/measure/pointComponent.js":
/*!***********************************************************!*\
  !*** ./contribs/gmf/src/mobile/measure/pointComponent.js ***!
  \***********************************************************/
/*! exports provided: MobileMeasurePointController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileMeasurePointController", function() { return MobileMeasurePointController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gmf_raster_RasterService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gmf/raster/RasterService.js */ "./contribs/gmf/src/raster/RasterService.js");
/* harmony import */ var ngeo_interaction_MeasurePointMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasurePointMobile.js */ "./src/interaction/MeasurePointMobile.js");
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/RegularShape.js */ "./node_modules/ol/style/RegularShape.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
MobileMeasurePointController.$inject = ["gettextCatalog", "$scope", "$filter", "gmfRaster", "ngeoDebounce"];
mobileMeasurePointComponent.$inject = ["gmfMobileMeasurePointTemplateUrl"];










var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasurePoint', [gmf_raster_RasterService_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__["default"].name]);
module.value('gmfMobileMeasurePointTemplateUrl', function (element, attrs) {
  var templateUrl = attrs['gmfMobileMeasurePointTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';
});
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/pointComponent', __webpack_require__(/*! ./pointComponent.html */ "./contribs/gmf/src/mobile/measure/pointComponent.html"));
}]);

function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'getCoordinateDecimalsFn': '&?gmfMobileMeasurepointCoordinatedecimals',
      'getLayersConfigFn': '&gmfMobileMeasurepointLayersconfig',
      'map': '=gmfMobileMeasurepointMap',
      'sketchStyle': '=?gmfMobileMeasurepointSketchstyle',
      'format': '<gmfMobileMeasurepointFormat'
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      controller.init();
    }
  };
}

module.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);
function MobileMeasurePointController(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce) {
  var _this = this;

  this.gmfRaster_ = gmfRaster;
  this.ngeoDebounce_ = ngeoDebounce;
  this.gettextCatalog_ = gettextCatalog;
  this.$filter_ = $filter;
  this.map;
  this.active;
  $scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    _this.measure.setActive(newVal);

    _this.handleMeasureActiveChange_();
  });
  var coordinateDecimalsFn = this['getCoordinateDecimalsFn'];
  this.coordinateDecimals = coordinateDecimalsFn ? coordinateDecimalsFn() : 0;
  this.layersConfig;
  this.sketchStyle;

  if (this.sketchStyle === undefined) {
    this.sketchStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
          color: 'rgba(0, 0, 0, 0.7)',
          width: 2
        }),
        points: 4,
        radius: 8,
        radius2: 0,
        angle: 0
      })
    });
  }

  this.format;
  this.measure;
  this.drawInteraction;
  this.mapViewPropertyChangeEventKey_ = null;
}

MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeo_interaction_MeasurePointMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.$filter_('ngeoNumberCoordinates'), this.format || '{x}, {y}', {
    decimals: this.coordinateDecimals,
    sketchStyle: this.sketchStyle
  });
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.measure);
  this.drawInteraction = this.measure.getDrawInteraction();
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawInteraction);
  var layersConfig = this['getLayersConfigFn']();
  console.assert(Array.isArray(layersConfig));
  this.layersConfig = layersConfig;
  this.map.addInteraction(this.measure);
};

MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};

MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};

MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (this.measure.getActive()) {
    var view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = ol_events_js__WEBPACK_IMPORTED_MODULE_5__["listen"](view, 'propertychange', this.ngeoDebounce_(this.getMeasure_.bind(this), 300, true), this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    ol_events_js__WEBPACK_IMPORTED_MODULE_5__["unlistenByKey"](this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};

MobileMeasurePointController.prototype.getMeasure_ = function () {
  var _this2 = this;

  var center = this.map.getView().getCenter();
  console.assert(Array.isArray(center));
  var params = {
    'layers': this.layersConfig.map(function (config) {
      return config.name;
    }).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then(function (object) {
    var el = _this2.measure.getTooltipElement();

    var ctn = document.createElement('div');
    var className = 'gmf-mobile-measure-point';
    ctn.className = className;

    for (var _iterator = _this2.layersConfig, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var config = _ref;
      var key = config.name;

      if (key in object) {
        var value = object[key];
        var childEl = document.createElement('div');
        childEl.className = "gmf-mobile-measure-point-" + key;
        var unit = config.unit || '';
        var decimals = config.decimals > 0 ? config.decimals : 0;
        value = _this2.$filter_('number')(value, decimals);
        childEl.innerHTML = [_this2.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }

    var previousCtn = el.getElementsByClassName(className);

    if (previousCtn[0]) {
      previousCtn[0].remove();
    }

    el.appendChild(ctn);
  });
};

module.controller('GmfMobileMeasurePointController', MobileMeasurePointController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/interaction/MeasureAreaMobile.js":
/*!**********************************************!*\
  !*** ./src/interaction/MeasureAreaMobile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureArea.js */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var MeasureAreaMobile = function (_ngeoInteractionMeasu) {
  _inheritsLoose(MeasureAreaMobile, _ngeoInteractionMeasu);

  function MeasureAreaMobile(format, gettextCatalog, options) {
    if (options === void 0) {
      options = {};
    }

    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }

  var _proto = MeasureAreaMobile.prototype;

  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Polygon',
      style: style,
      source: source
    });
  };

  return MeasureAreaMobile;
}(ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MeasureAreaMobile);

/***/ }),

/***/ "./src/interaction/MeasureLengthMobile.js":
/*!************************************************!*\
  !*** ./src/interaction/MeasureLengthMobile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureLength.js */ "./src/interaction/MeasureLength.js");
/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var _default = function (_ngeoInteractionMeasu) {
  _inheritsLoose(_default, _ngeoInteractionMeasu);

  function _default(format, gettextCatalog, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }

  var _proto = _default.prototype;

  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'LineString',
      style: style,
      source: source
    });
  };

  return _default;
}(ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/interaction/MeasurePointMobile.js":
/*!***********************************************!*\
  !*** ./src/interaction/MeasurePointMobile.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/Measure.js */ "./src/interaction/Measure.js");
/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }




var _default = function (_ngeoInteractionMeasu) {
  _inheritsLoose(_default, _ngeoInteractionMeasu);

  function _default(format, coordFormat, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    Object.assign(options, {
      displayHelpTooltip: false
    });
    _this = _ngeoInteractionMeasu.call(this, options) || this;
    _this.format_ = format;
    _this.coordFormat_ = coordFormat;
    return _this;
  }

  var _proto = _default.prototype;

  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Point',
      style: style,
      source: source
    });
  };

  _proto.handleMeasure = function handleMeasure(callback) {
    var geom = this.sketchFeature.getGeometry();
    var dec = this.decimals;
    var output = Object(ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__["getFormattedPoint"])(geom, dec, this.format_, this.coordFormat_);
    var coord = geom.getLastCoordinate();
    callback(output, coord);
  };

  return _default;
}(ngeo_interaction_Measure_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/interaction/MobileDraw.js":
/*!***************************************!*\
  !*** ./src/interaction/MobileDraw.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/common.js */ "./src/interaction/common.js");
/* harmony import */ var ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/CustomEvent.js */ "./src/CustomEvent.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_functions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/functions.js */ "./node_modules/ol/functions.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/SimpleGeometry.js */ "./node_modules/ol/geom/SimpleGeometry.js");
/* harmony import */ var ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Interaction.js */ "./node_modules/ol/interaction/Interaction.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }














var _default = function (_olInteractionInterac) {
  _inheritsLoose(_default, _olInteractionInterac);

  function _default(options) {
    var _this;

    _this = _olInteractionInterac.call(this, {
      handleEvent: ol_functions_js__WEBPACK_IMPORTED_MODULE_4__["TRUE"]
    }) || this;
    _this.changeEventKey_ = null;
    _this.type_ = options.type;
    _this.minPoints_ = options.minPoints ? options.minPoints : _this.type_ === 'Polygon' ? 3 : 2;
    _this.sketchFeature_ = null;
    _this.sketchPoints_ = [];
    _this.sketchPoint_ = null;
    _this.overlay_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false
      }),
      style: options.style || Object(ngeo_interaction_common_js__WEBPACK_IMPORTED_MODULE_0__["getDefaultDrawStyleFunction"])(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    ol_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"](_assertThisInitialized(_this), 'change:active', _this.updateState_, _assertThisInitialized(_this));

    _this.set('dirty', false);

    _this.set('drawing', false);

    _this.set('valid', false);

    return _this;
  }

  var _proto = _default.prototype;

  _proto.setMap = function setMap(map) {
    var currentMap = this.getMap();

    if (currentMap) {
      if (this.changeEventKey_) {
        ol_events_js__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"](this.changeEventKey_);
      }
    }

    ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.setMap.call(this, map);

    if (map) {
      this.changeEventKey_ = ol_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"](map.getView(), 'change:center', this.handleViewCenterChange_, this);
    }

    this.updateState_();
  };

  _proto.getDirty = function getDirty() {
    return this.get('dirty');
  };

  _proto.getDrawing = function getDrawing() {
    return this.get('drawing');
  };

  _proto.getValid = function getValid() {
    return this.get('valid');
  };

  _proto.getFeature = function getFeature() {
    return this.sketchFeature_;
  };

  _proto.addToDrawing = function addToDrawing() {
    var active = this.getActive();
    var drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    var sketchFeatureGeom;
    var sketchPointGeom = this.getSketchPointGeometry_();
    var coordinate = sketchPointGeom.getCoordinates();
    var coordinates;

    if (this.type_ === 'Point') {
      if (!this.sketchFeature_) {
        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"](coordinate));
        var event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(event);
      }

      sketchFeatureGeom = this.sketchFeature_.getGeometry();

      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        sketchFeatureGeom.setCoordinates(coordinate);
      }

      return;
    }

    if (this.type_ === 'LineString') {
      this.sketchPoints_.push(this.sketchPoint_);

      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_5__["default"](coordinates));

        var _event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });

        this.dispatchEvent(_event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();

        if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
          coordinates = sketchFeatureGeom.getCoordinates();
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates);
        }
      }
    }

    if (this.type_ === 'Polygon') {
      this.sketchPoints_.push(this.sketchPoint_);

      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__["default"]([coordinates]));

        var _event2 = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });

        this.dispatchEvent(_event2);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();

        if (sketchFeatureGeom instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
          var coordinatess = sketchFeatureGeom.getCoordinates();
          coordinates = coordinatess[0];
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinatess);
        }
      }
    }

    var dirty = this.getDirty();

    if (dirty) {
      this.set('dirty', false);
    }

    var valid = this.getValid();

    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
      if (coordinates.length >= this.minPoints_) {
        if (!valid) {
          this.set('valid', true);
        }
      } else {
        if (valid) {
          this.set('valid', false);
        }
      }
    }

    this.sketchPoint_ = null;
    this.updateSketchFeatures_();
  };

  _proto.clearDrawing = function clearDrawing() {
    this.setActive(false);
    this.setActive(true);
  };

  _proto.finishDrawing = function finishDrawing() {
    var active = this.getActive();
    var drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    if (this.sketchPoint_) {
      this.addToDrawing();
    }

    this.set('drawing', false);
    var event = new ngeo_CustomEvent_js__WEBPACK_IMPORTED_MODULE_1__["default"]('drawend', {
      feature: this.sketchFeature_
    });
    this.dispatchEvent(event);
  };

  _proto.startDrawing_ = function startDrawing_() {
    this.set('drawing', true);
    this.createOrUpdateSketchPoint_();
    this.updateSketchFeatures_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    }
  };

  _proto.modifyDrawing_ = function modifyDrawing_() {
    if (!this.sketchFeature_) {
      return;
    }

    var center = this.getCenter_();

    if (this.type_ === 'LineString') {
      var sketchFeatureGeom = this.sketchFeature_.getGeometry();

      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        var coordinates = sketchFeatureGeom.getCoordinates();
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates(coordinates);
      }
    } else if (this.type_ === 'Polygon') {
      var _sketchFeatureGeom = this.sketchFeature_.getGeometry();

      if (_sketchFeatureGeom instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        var coordinatess = _sketchFeatureGeom.getCoordinates();

        var _coordinates = coordinatess[0];

        _coordinates.pop();

        _coordinates.push(center);

        _sketchFeatureGeom.setCoordinates([_coordinates]);
      }
    }

    var dirty = this.getDirty();

    if (!dirty) {
      this.set('dirty', true);
    }
  };

  _proto.abortDrawing_ = function abortDrawing_() {
    var sketchFeature = this.sketchFeature_;

    if (sketchFeature || this.sketchPoints_.length > 0) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      this.overlay_.getSource().clear(true);
    }

    this.sketchPoints_ = [];
    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
    return sketchFeature;
  };

  _proto.updateState_ = function updateState_() {
    var map = this.getMap();
    var active = this.getActive();

    if (!map || !active) {
      this.abortDrawing_();
    } else {
      this.startDrawing_();
    }

    this.overlay_.setMap(active ? map : null);
  };

  _proto.handleViewCenterChange_ = function handleViewCenterChange_(evt) {
    var active = this.getActive();
    var drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    this.createOrUpdateSketchPoint_();

    if (this.type_ === 'Point') {
      this.addToDrawing();
    } else {
      this.modifyDrawing_();
      this.updateSketchFeatures_();
    }
  };

  _proto.createOrUpdateSketchPoint_ = function createOrUpdateSketchPoint_() {
    var center = this.getCenter_();

    if (this.sketchPoint_) {
      var geometry = this.getSketchPointGeometry_();
      geometry.setCoordinates(center);
    } else {
      this.sketchPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"](center));
    }
  };

  _proto.updateSketchFeatures_ = function updateSketchFeatures_() {
    var sketchFeatures = [];

    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }

    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }

    var overlaySource = this.overlay_.getSource();
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
    overlaySource.addFeatures(this.sketchPoints_);
  };

  _proto.getSketchPointGeometry_ = function getSketchPointGeometry_() {
    console.assert(this.sketchPoint_, 'sketch point should be thruty');
    var geometry = this.sketchPoint_.getGeometry();

    if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      return geometry;
    } else {
      throw 'Wrong geometry type';
    }
  };

  _proto.getCenter_ = function getCenter_() {
    var center = this.getMap().getView().getCenter();
    console.assert(Array.isArray(center));
    return center;
  };

  return _default;
}(ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ 16:
/*!***********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/mobilemeasure.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./contribs/gmf/src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/mobilemeasure.js */"./contribs/gmf/examples/mobilemeasure.js");


/***/ })

/******/ });
//# sourceMappingURL=mobilemeasure.js.map