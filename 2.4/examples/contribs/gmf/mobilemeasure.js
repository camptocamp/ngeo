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

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }











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

    for (var _iterator = _createForOfIteratorHelperLoose(_this2.layersConfig), _step; !(_step = _iterator()).done;) {
      var config = _step.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL21vYmlsZS9tZWFzdXJlL2FyZWFDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbnRyaWJzL2dtZi9zcmMvbW9iaWxlL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbnRyaWJzL2dtZi9zcmMvbW9iaWxlL21lYXN1cmUvcG9pbnRDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aE1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZVBvaW50TW9iaWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtb2JpbGVtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzE2LFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCJnbWZQZXJtYWxpbmtcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhcHBVUkwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL21vYmlsZW1lYXN1cmUuY3NzJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZlBlcm1hbGlua1Blcm1hbGluayBmcm9tICdnbWYvcGVybWFsaW5rL1Blcm1hbGluay5qcyc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2FyZWFDb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2xlbmd0aENvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9wb2ludENvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudC5qcyc7XG5pbXBvcnQgRVBTRzIxNzgxIGZyb20gJ0BnZW9ibG9ja3MvcHJvai9zcmMvRVBTR18yMTc4MS5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lLmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIGdtZlBlcm1hbGlua1Blcm1hbGluay5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29tcG9uZW50Lm5hbWUsIGdtZk1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudC5uYW1lLCBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lXSk7XG5tb2R1bGUudmFsdWUoJ2dtZlJhc3RlclVybCcsIGFwcFVSTC5SQVNURVIpO1xubW9kdWxlLmNvbnN0YW50KCdkZWZhdWx0VGhlbWUnLCAnRGVtbycpO1xubW9kdWxlLmNvbnN0YW50KCdhbmd1bGFyTG9jYWxlU2NyaXB0JywgJy4uL2J1aWxkL2FuZ3VsYXItbG9jYWxlX3t7bG9jYWxlfX0uanMnKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoZ21mUGVybWFsaW5rKSB7XG4gIHZhciBjZW50ZXIgPSBnbWZQZXJtYWxpbmsuZ2V0TWFwQ2VudGVyKCkgfHwgWzUzNzYzNSwgMTUyNjQwXTtcbiAgdmFyIHpvb20gPSBnbWZQZXJtYWxpbmsuZ2V0TWFwWm9vbSgpIHx8IDM7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMTc4MSxcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogY2VudGVyLFxuICAgICAgem9vbTogem9vbVxuICAgIH0pXG4gIH0pO1xuICB0aGlzLm1hcC5hZGRDb250cm9sKG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoKSk7XG4gIHRoaXMubWVhc3VyZUFyZWFBY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5tZWFzdXJlTGVuZ3RoQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMubWVhc3VyZVBvaW50TGF5ZXJzQ29uZmlnID0gW3tcbiAgICBuYW1lOiAnYXN0ZXInLFxuICAgIHVuaXQ6ICdtJyxcbiAgICBkZWNpbWFsczogMlxuICB9LCB7XG4gICAgbmFtZTogJ3NydG0nLFxuICAgIHVuaXQ6ICdtJ1xuICB9XTtcbiAgdGhpcy5tZWFzdXJlUG9pbnRBY3RpdmUgPSBmYWxzZTtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsIm1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50LiRpbmplY3QgPSBbXCJnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsXCJdO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzLmpzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYU1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhTW9iaWxlLmpzJztcbmltcG9ydCB7IE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyIH0gZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlQXJlYScsIFtuZ2VvTWlzY0ZpbHRlcnMubmFtZV0pO1xubW9kdWxlLnZhbHVlKCdnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzWydnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRldXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvYXJlYUNvbXBvbmVudCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvYXJlYUNvbXBvbmVudCcsIHJlcXVpcmUoJy4vYmFzZUNvbXBvbmVudC5odG1sJykpO1xufV0pO1xuXG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudChnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWFyZWFBY3RpdmUnLFxuICAgICAgJ3ByZWNpc2lvbic6ICc8P2dtZk1vYmlsZU1lYXN1cmVhcmVhUHJlY2lzaW9uJyxcbiAgICAgICdtYXAnOiAnPWdtZk1vYmlsZU1lYXN1cmVhcmVhTWFwJyxcbiAgICAgICdza2V0Y2hTdHlsZSc6ICc9P2dtZk1vYmlsZU1lYXN1cmVhcmVhU2tldGNoc3R5bGUnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnR21mTW9iaWxlTWVhc3VyZUFyZWFDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmwsXG4gICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmRpcmVjdGl2ZSgnZ21mTW9iaWxlTWVhc3VyZWFyZWEnLCBtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudCk7XG5cbnZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKF9NZWFzdWVNb2JpbGVCYXNlQ29udCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIl07XG5cbiAgX2luaGVyaXRzTG9vc2UoQ29udHJvbGxlciwgX01lYXN1ZU1vYmlsZUJhc2VDb250KTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9NZWFzdWVNb2JpbGVCYXNlQ29udC5jYWxsKHRoaXMsICRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHx8IHRoaXM7XG4gICAgX3RoaXMubWVhc3VyZTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYU1vYmlsZSh0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgdGhpcy5nZXR0ZXh0Q2F0YWxvZywge1xuICAgICAgcHJlY2lzaW9uOiB0aGlzLnByZWNpc2lvbixcbiAgICAgIHNrZXRjaFN0eWxlOiB0aGlzLnNrZXRjaFN0eWxlXG4gICAgfSk7XG5cbiAgICBfTWVhc3VlTW9iaWxlQmFzZUNvbnQucHJvdG90eXBlLmluaXQuY2FsbCh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8uYWRkUG9pbnQgPSBmdW5jdGlvbiBhZGRQb2ludCgpIHtcbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5hZGRUb0RyYXdpbmcoKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5jbGVhckRyYXdpbmcoKTtcbiAgfTtcblxuICBfcHJvdG8uZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmZpbmlzaERyYXdpbmcoKTtcbiAgfTtcblxuICBfcHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIpO1xuXG5tb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZUFyZWFDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC5kcmF3aW5nICYmICghY3RybC52YWxpZClcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XFxuICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9zcGFuPlxcbiAgICAge3tcXCdTZXQgYXMgc3RhcnRpbmcgcG9pbnRcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXFxuICAgbmctaWY9XCJjdHJsLmRpcnR5XCJcXG4gICBuZy1jbGljaz1cImN0cmwuYWRkUG9pbnQoKVwiPlxcbiAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9zcGFuPlxcbiAgICAge3tcXCdBZGQgbmV3IHBvaW50XFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC5kcmF3aW5nICYmIGN0cmwudmFsaWQgJiYgIWN0cmwuZGlydHlcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5maW5pc2goKVwiPlxcbiAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvc3Bhbj5cXG4gICAgIHt7XFwnVGVybWluYXRlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC52YWxpZFwiXFxuICAgbmctY2xpY2s9XCJjdHJsLmNsZWFyKClcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCI+PC9zcGFuPlxcbiAgICAge3tcXCdDbGVhclxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICBuZy1pZj1cImN0cmwuYWN0aXZlXCJcXG4gICBuZy1jbGljaz1cImN0cmwuZGVhY3RpdmF0ZSgpXCI+XFxuICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9zcGFuPlxcbiAgICAge3tcXCdDbG9zZVxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdldHRleHRDYXRhbG9nXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgeyBpbnRlcmFjdGlvbkRlY29yYXRpb24gfSBmcm9tICduZ2VvL21pc2MvZGVjb3JhdGUuanMnO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycy5qcyc7XG5pbXBvcnQgKiBhcyBvbEV2ZW50cyBmcm9tICdvbC9ldmVudHMuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0IG9sU3R5bGVSZWd1bGFyU2hhcGUgZnJvbSAnb2wvc3R5bGUvUmVndWxhclNoYXBlLmpzJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZS5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUJhc2UnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbmV4cG9ydCBmdW5jdGlvbiBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5zY29wZSA9ICRzY29wZTtcbiAgdGhpcy5maWx0ZXIgPSAkZmlsdGVyO1xuICB0aGlzLmdldHRleHRDYXRhbG9nID0gZ2V0dGV4dENhdGFsb2c7XG4gIHRoaXMubWFwO1xuICB0aGlzLmFjdGl2ZTtcbiAgdGhpcy5zY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5hY3RpdmU7XG4gIH0sIGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICBfdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuICB9KTtcbiAgdGhpcy5wcmVjaXNpb247XG4gIHRoaXMuc2tldGNoU3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXG4gICAgfSksXG4gICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBsaW5lRGFzaDogWzEwLCAxMF0sXG4gICAgICB3aWR0aDogMlxuICAgIH0pLFxuICAgIGltYWdlOiBuZXcgb2xTdHlsZVJlZ3VsYXJTaGFwZSh7XG4gICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICAgICAgICB3aWR0aDogMlxuICAgICAgfSksXG4gICAgICBwb2ludHM6IDQsXG4gICAgICByYWRpdXM6IDgsXG4gICAgICByYWRpdXMyOiAwLFxuICAgICAgYW5nbGU6IDBcbiAgICB9KVxuICB9KTtcbiAgdGhpcy5tZWFzdXJlO1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbjtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgdGhpcy52YWxpZCA9IGZhbHNlO1xufVxuXG5NZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZSh0aGlzLmFjdGl2ZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLm1lYXN1cmUpO1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IHRoaXMubWVhc3VyZS5nZXREcmF3SW50ZXJhY3Rpb24oKTtcbiAgdmFyIGRyYXdJbnRlcmFjdGlvbiA9IHRoaXMuZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24oZHJhd0ludGVyYWN0aW9uKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdoYXNQb2ludHMnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmF3SW50ZXJhY3Rpb24uZ2V0RmVhdHVyZSgpICE9PSBudWxsO1xuICAgIH1cbiAgfSk7XG4gIG9sRXZlbnRzLmxpc3RlbihkcmF3SW50ZXJhY3Rpb24sICdjaGFuZ2U6ZGlydHknLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgX3RoaXMyLmRpcnR5ID0gZHJhd0ludGVyYWN0aW9uLmdldERpcnR5KCk7XG5cbiAgICBpZiAoX3RoaXMyLmRpcnR5KSB7XG4gICAgICBfdGhpczIuc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuICB9LCB0aGlzKTtcbiAgb2xFdmVudHMubGlzdGVuKGRyYXdJbnRlcmFjdGlvbiwgJ2NoYW5nZTpkcmF3aW5nJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIF90aGlzMi5kcmF3aW5nID0gZHJhd0ludGVyYWN0aW9uLmdldERyYXdpbmcoKTtcbiAgfSwgdGhpcyk7XG4gIG9sRXZlbnRzLmxpc3RlbihkcmF3SW50ZXJhY3Rpb24sICdjaGFuZ2U6dmFsaWQnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgX3RoaXMyLnZhbGlkID0gZHJhd0ludGVyYWN0aW9uLmdldFZhbGlkKCk7XG4gIH0sIHRoaXMpO1xuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1lYXN1cmUpO1xufTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ2dtZk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyJywgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsIm1vYmlsZU1lYXN1cmVMZW50aENvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsXCJdO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzLmpzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoTW9iaWxlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aE1vYmlsZS5qcyc7XG5pbXBvcnQgeyBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlciB9IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aCcsIFtuZ2VvTWlzY0ZpbHRlcnMubmFtZV0pO1xubW9kdWxlLnZhbHVlKCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoVGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gYXR0cnNbJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZXVybCddO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL2xlbmd0aENvbXBvbmVudCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JywgcmVxdWlyZSgnLi9iYXNlQ29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5cbmZ1bmN0aW9uIG1vYmlsZU1lYXN1cmVMZW50aENvbXBvbmVudChnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnYWN0aXZlJzogJz1nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoQWN0aXZlJyxcbiAgICAgICdwcmVjaXNpb24nOiAnPD9nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoUHJlY2lzaW9uJyxcbiAgICAgICdtYXAnOiAnPWdtZk1vYmlsZU1lYXN1cmVsZW5ndGhNYXAnLFxuICAgICAgJ3NrZXRjaFN0eWxlJzogJz0/Z21mTW9iaWxlTWVhc3VyZWxlbmd0aFNrZXRjaHN0eWxlJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlbGVuZ3RoJywgbW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50KTtcblxudmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX01lYXN1ZU1vYmlsZUJhc2VDb250KSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiXTtcblxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX01lYXN1ZU1vYmlsZUJhc2VDb250LmNhbGwodGhpcywgJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykgfHwgdGhpcztcbiAgICBfdGhpcy5tZWFzdXJlO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBDb250cm9sbGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGhNb2JpbGUodGhpcy5maWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIHRoaXMuZ2V0dGV4dENhdGFsb2csIHtcbiAgICAgIHByZWNpc2lvbjogdGhpcy5wcmVjaXNpb24sXG4gICAgICBza2V0Y2hTdHlsZTogdGhpcy5za2V0Y2hTdHlsZVxuICAgIH0pO1xuXG4gICAgX01lYXN1ZU1vYmlsZUJhc2VDb250LnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZFBvaW50ID0gZnVuY3Rpb24gYWRkUG9pbnQoKSB7XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uYWRkVG9EcmF3aW5nKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH07XG5cbiAgX3Byb3RvLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH07XG5cbiAgX3Byb3RvLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC5hY3RpdmVcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICAgICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIuJGluamVjdCA9IFtcImdldHRleHRDYXRhbG9nXCIsIFwiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdtZlJhc3RlclwiLCBcIm5nZW9EZWJvdW5jZVwiXTtcbm1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IHJldHVybiBpdC5uZXh0LmJpbmQoaXQpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mUmFzdGVyUmFzdGVyU2VydmljZSBmcm9tICdnbWYvcmFzdGVyL1Jhc3RlclNlcnZpY2UuanMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UuanMnO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCAqIGFzIG9sRXZlbnRzIGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVJlZ3VsYXJTaGFwZSBmcm9tICdvbC9zdHlsZS9SZWd1bGFyU2hhcGUuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlUG9pbnQnLCBbZ21mUmFzdGVyUmFzdGVyU2VydmljZS5uYW1lLCBuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gYXR0cnNbJ2dtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRldXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvcG9pbnRDb21wb25lbnQnO1xufSk7XG5tb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50JywgcmVxdWlyZSgnLi9wb2ludENvbXBvbmVudC5odG1sJykpO1xufV0pO1xuXG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnYWN0aXZlJzogJz1nbWZNb2JpbGVNZWFzdXJlcG9pbnRBY3RpdmUnLFxuICAgICAgJ2dldENvb3JkaW5hdGVEZWNpbWFsc0ZuJzogJyY/Z21mTW9iaWxlTWVhc3VyZXBvaW50Q29vcmRpbmF0ZWRlY2ltYWxzJyxcbiAgICAgICdnZXRMYXllcnNDb25maWdGbic6ICcmZ21mTW9iaWxlTWVhc3VyZXBvaW50TGF5ZXJzY29uZmlnJyxcbiAgICAgICdtYXAnOiAnPWdtZk1vYmlsZU1lYXN1cmVwb2ludE1hcCcsXG4gICAgICAnc2tldGNoU3R5bGUnOiAnPT9nbWZNb2JpbGVNZWFzdXJlcG9pbnRTa2V0Y2hzdHlsZScsXG4gICAgICAnZm9ybWF0JzogJzxnbWZNb2JpbGVNZWFzdXJlcG9pbnRGb3JtYXQnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnR21mTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlciBhcyBjdHJsJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBnbWZNb2JpbGVNZWFzdXJlUG9pbnRUZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlcG9pbnQnLCBtb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQpO1xuZXhwb3J0IGZ1bmN0aW9uIE1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIoZ2V0dGV4dENhdGFsb2csICRzY29wZSwgJGZpbHRlciwgZ21mUmFzdGVyLCBuZ2VvRGVib3VuY2UpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLmdtZlJhc3Rlcl8gPSBnbWZSYXN0ZXI7XG4gIHRoaXMubmdlb0RlYm91bmNlXyA9IG5nZW9EZWJvdW5jZTtcbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZ18gPSBnZXR0ZXh0Q2F0YWxvZztcbiAgdGhpcy4kZmlsdGVyXyA9ICRmaWx0ZXI7XG4gIHRoaXMubWFwO1xuICB0aGlzLmFjdGl2ZTtcbiAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90aGlzLmFjdGl2ZTtcbiAgfSwgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgIF90aGlzLm1lYXN1cmUuc2V0QWN0aXZlKG5ld1ZhbCk7XG5cbiAgICBfdGhpcy5oYW5kbGVNZWFzdXJlQWN0aXZlQ2hhbmdlXygpO1xuICB9KTtcbiAgdmFyIGNvb3JkaW5hdGVEZWNpbWFsc0ZuID0gdGhpc1snZ2V0Q29vcmRpbmF0ZURlY2ltYWxzRm4nXTtcbiAgdGhpcy5jb29yZGluYXRlRGVjaW1hbHMgPSBjb29yZGluYXRlRGVjaW1hbHNGbiA/IGNvb3JkaW5hdGVEZWNpbWFsc0ZuKCkgOiAwO1xuICB0aGlzLmxheWVyc0NvbmZpZztcbiAgdGhpcy5za2V0Y2hTdHlsZTtcblxuICBpZiAodGhpcy5za2V0Y2hTdHlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5za2V0Y2hTdHlsZSA9IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgZmlsbDogbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXG4gICAgICB9KSxcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICAgIGxpbmVEYXNoOiBbMTAsIDEwXSxcbiAgICAgICAgd2lkdGg6IDJcbiAgICAgIH0pLFxuICAgICAgaW1hZ2U6IG5ldyBvbFN0eWxlUmVndWxhclNoYXBlKHtcbiAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICAgICAgICAgIHdpZHRoOiAyXG4gICAgICAgIH0pLFxuICAgICAgICBwb2ludHM6IDQsXG4gICAgICAgIHJhZGl1czogOCxcbiAgICAgICAgcmFkaXVzMjogMCxcbiAgICAgICAgYW5nbGU6IDBcbiAgICAgIH0pXG4gICAgfSk7XG4gIH1cblxuICB0aGlzLmZvcm1hdDtcbiAgdGhpcy5tZWFzdXJlO1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbjtcbiAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBudWxsO1xufVxuXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZVBvaW50TW9iaWxlKHRoaXMuJGZpbHRlcl8oJ25nZW9OdW1iZXJDb29yZGluYXRlcycpLCB0aGlzLmZvcm1hdCB8fCAne3h9LCB7eX0nLCB7XG4gICAgZGVjaW1hbHM6IHRoaXMuY29vcmRpbmF0ZURlY2ltYWxzLFxuICAgIHNrZXRjaFN0eWxlOiB0aGlzLnNrZXRjaFN0eWxlXG4gIH0pO1xuICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZSk7XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gdGhpcy5tZWFzdXJlLmdldERyYXdJbnRlcmFjdGlvbigpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5kcmF3SW50ZXJhY3Rpb24pO1xuICB2YXIgbGF5ZXJzQ29uZmlnID0gdGhpc1snZ2V0TGF5ZXJzQ29uZmlnRm4nXSgpO1xuICBjb25zb2xlLmFzc2VydChBcnJheS5pc0FycmF5KGxheWVyc0NvbmZpZykpO1xuICB0aGlzLmxheWVyc0NvbmZpZyA9IGxheWVyc0NvbmZpZztcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlKTtcbn07XG5cbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG59O1xuXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiB0aGlzLmdldHRleHRDYXRhbG9nXy5nZXRTdHJpbmcoc3RyKTtcbn07XG5cbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZU1lYXN1cmVBY3RpdmVDaGFuZ2VfID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5tZWFzdXJlLmdldEFjdGl2ZSgpKSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBvbEV2ZW50cy5saXN0ZW4odmlldywgJ3Byb3BlcnR5Y2hhbmdlJywgdGhpcy5uZ2VvRGVib3VuY2VfKHRoaXMuZ2V0TWVhc3VyZV8uYmluZCh0aGlzKSwgMzAwLCB0cnVlKSwgdGhpcyk7XG4gICAgdGhpcy5nZXRNZWFzdXJlXygpO1xuICB9IGVsc2UgaWYgKHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfKSB7XG4gICAgb2xFdmVudHMudW5saXN0ZW5CeUtleSh0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5Xyk7XG4gICAgdGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8gPSBudWxsO1xuICB9XG59O1xuXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRNZWFzdXJlXyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgdmFyIGNlbnRlciA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRDZW50ZXIoKTtcbiAgY29uc29sZS5hc3NlcnQoQXJyYXkuaXNBcnJheShjZW50ZXIpKTtcbiAgdmFyIHBhcmFtcyA9IHtcbiAgICAnbGF5ZXJzJzogdGhpcy5sYXllcnNDb25maWcubWFwKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25maWcubmFtZTtcbiAgICB9KS5qb2luKCcsJylcbiAgfTtcbiAgdGhpcy5nbWZSYXN0ZXJfLmdldFJhc3RlcihjZW50ZXIsIHBhcmFtcykudGhlbihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGVsID0gX3RoaXMyLm1lYXN1cmUuZ2V0VG9vbHRpcEVsZW1lbnQoKTtcblxuICAgIHZhciBjdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgY2xhc3NOYW1lID0gJ2dtZi1tb2JpbGUtbWVhc3VyZS1wb2ludCc7XG4gICAgY3RuLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoX3RoaXMyLmxheWVyc0NvbmZpZyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgY29uZmlnID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIga2V5ID0gY29uZmlnLm5hbWU7XG5cbiAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICB2YXIgY2hpbGRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjaGlsZEVsLmNsYXNzTmFtZSA9IFwiZ21mLW1vYmlsZS1tZWFzdXJlLXBvaW50LVwiICsga2V5O1xuICAgICAgICB2YXIgdW5pdCA9IGNvbmZpZy51bml0IHx8ICcnO1xuICAgICAgICB2YXIgZGVjaW1hbHMgPSBjb25maWcuZGVjaW1hbHMgPiAwID8gY29uZmlnLmRlY2ltYWxzIDogMDtcbiAgICAgICAgdmFsdWUgPSBfdGhpczIuJGZpbHRlcl8oJ251bWJlcicpKHZhbHVlLCBkZWNpbWFscyk7XG4gICAgICAgIGNoaWxkRWwuaW5uZXJIVE1MID0gW190aGlzMi50cmFuc2xhdGUoa2V5KSwgJzogJywgdmFsdWUsICcgJywgdW5pdF0uam9pbignJyk7XG4gICAgICAgIGN0bi5hcHBlbmRDaGlsZChjaGlsZEVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNDdG4gPSBlbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG5cbiAgICBpZiAocHJldmlvdXNDdG5bMF0pIHtcbiAgICAgIHByZXZpb3VzQ3RuWzBdLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGVsLmFwcGVuZENoaWxkKGN0bik7XG4gIH0pO1xufTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXInLCBNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWEuanMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzJztcblxudmFyIE1lYXN1cmVBcmVhTW9iaWxlID0gZnVuY3Rpb24gKF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSkge1xuICBfaW5oZXJpdHNMb29zZShNZWFzdXJlQXJlYU1vYmlsZSwgX25nZW9JbnRlcmFjdGlvbk1lYXN1KTtcblxuICBmdW5jdGlvbiBNZWFzdXJlQXJlYU1vYmlsZShmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywge1xuICAgICAgZGlzcGxheUhlbHBUb29sdGlwOiBmYWxzZVxuICAgIH0pO1xuICAgIHJldHVybiBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRpb25zKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1lYXN1cmVBcmVhTW9iaWxlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvbHlnb24nLFxuICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgc291cmNlOiBzb3VyY2VcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTWVhc3VyZUFyZWFNb2JpbGU7XG59KG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhKTtcblxuZXhwb3J0IGRlZmF1bHQgTWVhc3VyZUFyZWFNb2JpbGU7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aC5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcuanMnO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX25nZW9JbnRlcmFjdGlvbk1lYXN1KSB7XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfbmdlb0ludGVyYWN0aW9uTWVhc3UpO1xuXG4gIGZ1bmN0aW9uIF9kZWZhdWx0KGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdF9vcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gb3B0X29wdGlvbnMgOiB7fTtcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgIGRpc3BsYXlIZWxwVG9vbHRpcDogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gX25nZW9JbnRlcmFjdGlvbk1lYXN1LmNhbGwodGhpcywgZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBfZGVmYXVsdC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNyZWF0ZURyYXdJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJyxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZSwgeyBnZXRGb3JtYXR0ZWRQb2ludCB9IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZS5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcuanMnO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX25nZW9JbnRlcmFjdGlvbk1lYXN1KSB7XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfbmdlb0ludGVyYWN0aW9uTWVhc3UpO1xuXG4gIGZ1bmN0aW9uIF9kZWZhdWx0KGZvcm1hdCwgY29vcmRGb3JtYXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgX3RoaXMgPSBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmZvcm1hdF8gPSBmb3JtYXQ7XG4gICAgX3RoaXMuY29vcmRGb3JtYXRfID0gY29vcmRGb3JtYXQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcblxuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmhhbmRsZU1lYXN1cmUgPSBmdW5jdGlvbiBoYW5kbGVNZWFzdXJlKGNhbGxiYWNrKSB7XG4gICAgdmFyIGdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICB2YXIgZGVjID0gdGhpcy5kZWNpbWFscztcbiAgICB2YXIgb3V0cHV0ID0gZ2V0Rm9ybWF0dGVkUG9pbnQoZ2VvbSwgZGVjLCB0aGlzLmZvcm1hdF8sIHRoaXMuY29vcmRGb3JtYXRfKTtcbiAgICB2YXIgY29vcmQgPSBnZW9tLmdldExhc3RDb29yZGluYXRlKCk7XG4gICAgY2FsbGJhY2sob3V0cHV0LCBjb29yZCk7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHsgZ2V0RGVmYXVsdERyYXdTdHlsZUZ1bmN0aW9uIH0gZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9jb21tb24uanMnO1xuaW1wb3J0IG5nZW9DdXN0b21FdmVudCBmcm9tICduZ2VvL0N1c3RvbUV2ZW50LmpzJztcbmltcG9ydCAqIGFzIG9sRXZlbnRzIGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IHsgVFJVRSB9IGZyb20gJ29sL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcuanMnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQuanMnO1xuaW1wb3J0IG9sR2VvbVBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uLmpzJztcbmltcG9ydCBvbEdlb21TaW1wbGVHZW9tZXRyeSBmcm9tICdvbC9nZW9tL1NpbXBsZUdlb21ldHJ5LmpzJztcbmltcG9ydCBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vSW50ZXJhY3Rpb24uanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yLmpzJztcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9vbEludGVyYWN0aW9uSW50ZXJhYykge1xuICBfaW5oZXJpdHNMb29zZShfZGVmYXVsdCwgX29sSW50ZXJhY3Rpb25JbnRlcmFjKTtcblxuICBmdW5jdGlvbiBfZGVmYXVsdChvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb2xJbnRlcmFjdGlvbkludGVyYWMuY2FsbCh0aGlzLCB7XG4gICAgICBoYW5kbGVFdmVudDogVFJVRVxuICAgIH0pIHx8IHRoaXM7XG4gICAgX3RoaXMuY2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbiAgICBfdGhpcy50eXBlXyA9IG9wdGlvbnMudHlwZTtcbiAgICBfdGhpcy5taW5Qb2ludHNfID0gb3B0aW9ucy5taW5Qb2ludHMgPyBvcHRpb25zLm1pblBvaW50cyA6IF90aGlzLnR5cGVfID09PSAnUG9seWdvbicgPyAzIDogMjtcbiAgICBfdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG51bGw7XG4gICAgX3RoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIF90aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgX3RoaXMub3ZlcmxheV8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICAgIHVzZVNwYXRpYWxJbmRleDogZmFsc2UsXG4gICAgICAgIHdyYXBYOiBvcHRpb25zLndyYXBYID8gb3B0aW9ucy53cmFwWCA6IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlIHx8IGdldERlZmF1bHREcmF3U3R5bGVGdW5jdGlvbigpLFxuICAgICAgdXBkYXRlV2hpbGVBbmltYXRpbmc6IHRydWUsXG4gICAgICB1cGRhdGVXaGlsZUludGVyYWN0aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgb2xFdmVudHMubGlzdGVuKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCAnY2hhbmdlOmFjdGl2ZScsIF90aGlzLnVwZGF0ZVN0YXRlXywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgX3RoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcblxuICAgIF90aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcblxuICAgIF90aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuXG4gIF9wcm90by5zZXRNYXAgPSBmdW5jdGlvbiBzZXRNYXAobWFwKSB7XG4gICAgdmFyIGN1cnJlbnRNYXAgPSB0aGlzLmdldE1hcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRNYXApIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZUV2ZW50S2V5Xykge1xuICAgICAgICBvbEV2ZW50cy51bmxpc3RlbkJ5S2V5KHRoaXMuY2hhbmdlRXZlbnRLZXlfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24ucHJvdG90eXBlLnNldE1hcC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICB0aGlzLmNoYW5nZUV2ZW50S2V5XyA9IG9sRXZlbnRzLmxpc3RlbihtYXAuZ2V0VmlldygpLCAnY2hhbmdlOmNlbnRlcicsIHRoaXMuaGFuZGxlVmlld0NlbnRlckNoYW5nZV8sIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdGVfKCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldERpcnR5ID0gZnVuY3Rpb24gZ2V0RGlydHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkaXJ0eScpO1xuICB9O1xuXG4gIF9wcm90by5nZXREcmF3aW5nID0gZnVuY3Rpb24gZ2V0RHJhd2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ2RyYXdpbmcnKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0VmFsaWQgPSBmdW5jdGlvbiBnZXRWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3ZhbGlkJyk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEZlYXR1cmUgPSBmdW5jdGlvbiBnZXRGZWF0dXJlKCkge1xuICAgIHJldHVybiB0aGlzLnNrZXRjaEZlYXR1cmVfO1xuICB9O1xuXG4gIF9wcm90by5hZGRUb0RyYXdpbmcgPSBmdW5jdGlvbiBhZGRUb0RyYXdpbmcoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcblxuICAgIGlmICghYWN0aXZlIHx8ICFkcmF3aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNrZXRjaEZlYXR1cmVHZW9tO1xuICAgIHZhciBza2V0Y2hQb2ludEdlb20gPSB0aGlzLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCk7XG4gICAgdmFyIGNvb3JkaW5hdGUgPSBza2V0Y2hQb2ludEdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICB2YXIgY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21Qb2ludChjb29yZGluYXRlKSk7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcblxuICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50c18ucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG5cbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKV07XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKGNvb3JkaW5hdGVzKSk7XG5cbiAgICAgICAgdmFyIF9ldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdzdGFydCcsIHtcbiAgICAgICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChfZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgICBjb29yZGluYXRlcyA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlLnNsaWNlKCkpO1xuICAgICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRzXy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcblxuICAgICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpLCBjb29yZGluYXRlLnNsaWNlKCldO1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tUG9seWdvbihbY29vcmRpbmF0ZXNdKSk7XG5cbiAgICAgICAgdmFyIF9ldmVudDIgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoX2V2ZW50Mik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcblxuICAgICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21Qb2x5Z29uKSB7XG4gICAgICAgICAgdmFyIGNvb3JkaW5hdGVzcyA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc3NbMF07XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlLnNsaWNlKCkpO1xuICAgICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlydHkgPSB0aGlzLmdldERpcnR5KCk7XG5cbiAgICBpZiAoZGlydHkpIHtcbiAgICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB2YXIgdmFsaWQgPSB0aGlzLmdldFZhbGlkKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnIHx8IHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA+PSB0aGlzLm1pblBvaW50c18pIHtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgIHRoaXMuc2V0KCd2YWxpZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVTa2V0Y2hGZWF0dXJlc18oKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXJEcmF3aW5nID0gZnVuY3Rpb24gY2xlYXJEcmF3aW5nKCkge1xuICAgIHRoaXMuc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLnNldEFjdGl2ZSh0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8uZmluaXNoRHJhd2luZyA9IGZ1bmN0aW9uIGZpbmlzaERyYXdpbmcoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcblxuICAgIGlmICghYWN0aXZlIHx8ICFkcmF3aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgZmFsc2UpO1xuICAgIHZhciBldmVudCA9IG5ldyBuZ2VvQ3VzdG9tRXZlbnQoJ2RyYXdlbmQnLCB7XG4gICAgICBmZWF0dXJlOiB0aGlzLnNrZXRjaEZlYXR1cmVfXG4gICAgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfTtcblxuICBfcHJvdG8uc3RhcnREcmF3aW5nXyA9IGZ1bmN0aW9uIHN0YXJ0RHJhd2luZ18oKSB7XG4gICAgdGhpcy5zZXQoJ2RyYXdpbmcnLCB0cnVlKTtcbiAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfKCk7XG4gICAgdGhpcy51cGRhdGVTa2V0Y2hGZWF0dXJlc18oKTtcblxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ubW9kaWZ5RHJhd2luZ18gPSBmdW5jdGlvbiBtb2RpZnlEcmF3aW5nXygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICB2YXIgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgIHZhciBjb29yZGluYXRlcyA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvb3JkaW5hdGVzLnBvcCgpO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNlbnRlcik7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZV8gPT09ICdQb2x5Z29uJykge1xuICAgICAgdmFyIF9za2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcblxuICAgICAgaWYgKF9za2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVBvbHlnb24pIHtcbiAgICAgICAgdmFyIGNvb3JkaW5hdGVzcyA9IF9za2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuXG4gICAgICAgIHZhciBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc3NbMF07XG5cbiAgICAgICAgX2Nvb3JkaW5hdGVzLnBvcCgpO1xuXG4gICAgICAgIF9jb29yZGluYXRlcy5wdXNoKGNlbnRlcik7XG5cbiAgICAgICAgX3NrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKFtfY29vcmRpbmF0ZXNdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlydHkgPSB0aGlzLmdldERpcnR5KCk7XG5cbiAgICBpZiAoIWRpcnR5KSB7XG4gICAgICB0aGlzLnNldCgnZGlydHknLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmFib3J0RHJhd2luZ18gPSBmdW5jdGlvbiBhYm9ydERyYXdpbmdfKCkge1xuICAgIHZhciBza2V0Y2hGZWF0dXJlID0gdGhpcy5za2V0Y2hGZWF0dXJlXztcblxuICAgIGlmIChza2V0Y2hGZWF0dXJlIHx8IHRoaXMuc2tldGNoUG9pbnRzXy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbnVsbDtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcbiAgICAgIHRoaXMub3ZlcmxheV8uZ2V0U291cmNlKCkuY2xlYXIodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5za2V0Y2hQb2ludHNfID0gW107XG4gICAgdGhpcy5zZXQoJ2RpcnR5JywgZmFsc2UpO1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgZmFsc2UpO1xuICAgIHRoaXMuc2V0KCd2YWxpZCcsIGZhbHNlKTtcbiAgICByZXR1cm4gc2tldGNoRmVhdHVyZTtcbiAgfTtcblxuICBfcHJvdG8udXBkYXRlU3RhdGVfID0gZnVuY3Rpb24gdXBkYXRlU3RhdGVfKCkge1xuICAgIHZhciBtYXAgPSB0aGlzLmdldE1hcCgpO1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuXG4gICAgaWYgKCFtYXAgfHwgIWFjdGl2ZSkge1xuICAgICAgdGhpcy5hYm9ydERyYXdpbmdfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnREcmF3aW5nXygpO1xuICAgIH1cblxuICAgIHRoaXMub3ZlcmxheV8uc2V0TWFwKGFjdGl2ZSA/IG1hcCA6IG51bGwpO1xuICB9O1xuXG4gIF9wcm90by5oYW5kbGVWaWV3Q2VudGVyQ2hhbmdlXyA9IGZ1bmN0aW9uIGhhbmRsZVZpZXdDZW50ZXJDaGFuZ2VfKGV2dCkge1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIHZhciBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKTtcblxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGlmeURyYXdpbmdfKCk7XG4gICAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8gPSBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpIHtcbiAgICB2YXIgY2VudGVyID0gdGhpcy5nZXRDZW50ZXJfKCk7XG5cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHZhciBnZW9tZXRyeSA9IHRoaXMuZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8oKTtcbiAgICAgIGdlb21ldHJ5LnNldENvb3JkaW5hdGVzKGNlbnRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tUG9pbnQoY2VudGVyKSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by51cGRhdGVTa2V0Y2hGZWF0dXJlc18gPSBmdW5jdGlvbiB1cGRhdGVTa2V0Y2hGZWF0dXJlc18oKSB7XG4gICAgdmFyIHNrZXRjaEZlYXR1cmVzID0gW107XG5cbiAgICBpZiAodGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgc2tldGNoRmVhdHVyZXMucHVzaCh0aGlzLnNrZXRjaEZlYXR1cmVfKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5za2V0Y2hQb2ludF8pIHtcbiAgICAgIHNrZXRjaEZlYXR1cmVzLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuICAgIH1cblxuICAgIHZhciBvdmVybGF5U291cmNlID0gdGhpcy5vdmVybGF5Xy5nZXRTb3VyY2UoKTtcbiAgICBvdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXMoc2tldGNoRmVhdHVyZXMpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXModGhpcy5za2V0Y2hQb2ludHNfKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8gPSBmdW5jdGlvbiBnZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpIHtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLnNrZXRjaFBvaW50XywgJ3NrZXRjaCBwb2ludCBzaG91bGQgYmUgdGhydXR5Jyk7XG4gICAgdmFyIGdlb21ldHJ5ID0gdGhpcy5za2V0Y2hQb2ludF8uZ2V0R2VvbWV0cnkoKTtcblxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSB7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICdXcm9uZyBnZW9tZXRyeSB0eXBlJztcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmdldENlbnRlcl8gPSBmdW5jdGlvbiBnZXRDZW50ZXJfKCkge1xuICAgIHZhciBjZW50ZXIgPSB0aGlzLmdldE1hcCgpLmdldFZpZXcoKS5nZXRDZW50ZXIoKTtcbiAgICBjb25zb2xlLmFzc2VydChBcnJheS5pc0FycmF5KGNlbnRlcikpO1xuICAgIHJldHVybiBjZW50ZXI7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24pO1xuXG5leHBvcnQgeyBfZGVmYXVsdCBhcyBkZWZhdWx0IH07Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pMQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=