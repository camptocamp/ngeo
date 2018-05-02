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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
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
/* harmony import */ var _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
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
      projection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_9__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom
    })
  });
  this.map.addControl(new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
    dpi: 96
  }));
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile.js */ "./src/interaction/MeasureAreaMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ "./contribs/gmf/src/mobile/measure/baseComponent.js");
mobileMeasureAreaComponent.$inject = ["gmfMobileMeasureAreaTemplateUrl"];

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureArea', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.value('gmfMobileMeasureAreaTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureAreaTemplateurl;
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
      if (!controller) {
        throw new Error('Missing controller');
      }

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
    _this.measure = null;
    return _this;
  }

  var _proto = Controller.prototype;

  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureAreaMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.precision || 2,
      sketchStyle: this.sketchStyle
    });

    _MeasueMobileBaseCont.prototype.init.call(this);
  };

  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

    this.drawInteraction.addToDrawing();
  };

  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

    this.drawInteraction.clearDrawing();
  };

  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/RegularShape.js */ "./node_modules/ol/style/RegularShape.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ "./src/interaction/MobileDraw.js");
MeasueMobileBaseController.$inject = ["$scope", "$filter", "gettextCatalog"];









var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureBase', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  var _this = this;

  this.scope = $scope;
  this.filter = $filter;
  this.gettextCatalog = gettextCatalog;
  this.map = null;
  this.active = false;
  this.scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }

    _this.measure.setActive(newVal);
  });
  this.precision = null;
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
  this.measure = null;
  this.drawInteraction = null;
  this.dirty = false;
  this.drawing = false;
  this.valid = false;
}

MeasueMobileBaseController.prototype.init = function () {
  var _this2 = this;

  if (!this.map) {
    throw new Error('Missing map');
  }

  if (!this.measure) {
    throw new Error('Missing measure');
  }

  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();

  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_8__["default"])) {
    throw new Error('Wrong drawInteraction');
  }

  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(drawInteraction);
  Object.defineProperty(this, 'hasPoints', {
    get: function get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:dirty', function (evt) {
    _this2.dirty = drawInteraction.getDirty();

    if (_this2.dirty) {
      _this2.scope.$apply();
    }
  }, this);
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:drawing', function (evt) {
    _this2.drawing = drawInteraction.getDrawing();
  }, this);
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:valid', function (evt) {
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile.js */ "./src/interaction/MeasureLengthMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent.js */ "./contribs/gmf/src/mobile/measure/baseComponent.js");
mobileMeasureLenthComponent.$inject = ["gmfMobileMeasureLengthTemplateUrl"];

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureLength', [ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.value('gmfMobileMeasureLengthTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
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
      if (!controller) {
        throw new Error('Missing controller');
      }

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
    _this.measure = null;
    return _this;
  }

  var _proto = Controller.prototype;

  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureLengthMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.precision || 3,
      sketchStyle: this.sketchStyle
    });

    _MeasueMobileBaseCont.prototype.init.call(this);
  };

  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

    this.drawInteraction.addToDrawing();
  };

  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

    this.drawInteraction.clearDrawing();
  };

  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
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
/* harmony import */ var ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/interaction/MobileDraw.js */ "./src/interaction/MobileDraw.js");
MobileMeasurePointController.$inject = ["gettextCatalog", "$scope", "$filter", "gmfRaster", "ngeoDebounce"];
mobileMeasurePointComponent.$inject = ["gmfMobileMeasurePointTemplateUrl"];

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasurePoint', [gmf_raster_RasterService_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_3__["default"].name]);
module.value('gmfMobileMeasurePointTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
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
      if (!controller) {
        throw new Error('Missing controller');
      }

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
  this.map = null;
  this.active = false;

  this.getCoordinateDecimalsFn = function () {
    return 0;
  };

  $scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }

    _this.measure.setActive(newVal);

    _this.handleMeasureActiveChange_();
  });
  var coordinateDecimalsFn = this.getCoordinateDecimalsFn;
  this.coordinateDecimals = coordinateDecimalsFn ? coordinateDecimalsFn() : 0;
  this.layersConfig = [];
  this.sketchStyle = [];

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

  this.format = null;
  this.measure = null;
  this.drawInteraction = null;

  this.getLayersConfigFn = function () {
    return [];
  };

  this.mapViewPropertyChangeEventKey_ = null;
}

MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeo_interaction_MeasurePointMobile_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.$filter_('ngeoNumberCoordinates'), this.format || '{x}, {y}', {
    decimals: this.coordinateDecimals,
    sketchStyle: this.sketchStyle
  });
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();

  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw_js__WEBPACK_IMPORTED_MODULE_10__["default"])) {
    throw new Error('Wrong drawInteraction');
  }

  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawInteraction);
  var layersConfig = this.getLayersConfigFn();

  if (!Array.isArray(layersConfig)) {
    throw new Error('Wrong layersConfig type');
  }

  this.layersConfig = layersConfig;

  if (!this.map) {
    throw new Error('Missing map');
  }

  this.map.addInteraction(this.measure);
};

MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};

MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};

MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }

  if (!this.measure) {
    throw new Error('Missing measure');
  }

  if (this.measure.getActive()) {
    var view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = Object(ol_events_js__WEBPACK_IMPORTED_MODULE_5__["listen"])(view, 'propertychange', this.ngeoDebounce_(this.getMeasure_.bind(this), 300, true), this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    Object(ol_events_js__WEBPACK_IMPORTED_MODULE_5__["unlistenByKey"])(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};

MobileMeasurePointController.prototype.getMeasure_ = function () {
  var _this2 = this;

  if (!this.map) {
    throw new Error('Missing map');
  }

  var center = this.map.getView().getCenter();

  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }

  var params = {
    'layers': this.layersConfig.map(function (config) {
      return config.name;
    }).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then(function (object) {
    if (!_this2.measure) {
      throw new Error('Missing measure');
    }

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

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, render, default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(562);

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
      style: style
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
      style: style
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
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
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
      style: style
    });
  };

  _proto.handleMeasure = function handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }

    var geom = this.sketchFeature.getGeometry();

    if (!(geom instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      throw new Error('Missing geometry');
    }

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
    Object(ol_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"])(_assertThisInitialized(_this), 'change:active', _this.updateState_, _assertThisInitialized(_this));

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
        Object(ol_events_js__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"])(this.changeEventKey_);
      }
    }

    ol_interaction_Interaction_js__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.setMap.call(this, map);

    if (map) {
      this.changeEventKey_ = Object(ol_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"])(map.getView(), 'change:center', this.handleViewCenterChange_, this);
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
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }

    var active = this.getActive();
    var drawing = this.getDrawing();

    if (!active || !drawing) {
      return;
    }

    var sketchFeatureGeom;
    var sketchPointGeom = this.getSketchPointGeometry_();
    var coordinate = sketchPointGeom.getCoordinates();
    var coordinates = null;

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

    if (!coordinates) {
      throw new Error('Missing coordinates');
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
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }

    var geometry = this.sketchPoint_.getGeometry();

    if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      return geometry;
    } else {
      throw new Error('Wrong geometry type');
    }
  };

  _proto.getCenter_ = function getCenter_() {
    var center = this.getMap().getView().getCenter();

    if (!Array.isArray(center)) {
      throw new Error('Missing center');
    }

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


/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL21vYmlsZS9tZWFzdXJlL2FyZWFDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbnRyaWJzL2dtZi9zcmMvbW9iaWxlL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbnRyaWJzL2dtZi9zcmMvbW9iaWxlL21lYXN1cmUvcG9pbnRDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aE1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZVBvaW50TW9iaWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtb2JpbGVtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzE2LFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCJnbWZQZXJtYWxpbmtcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhcHBVUkwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL21vYmlsZW1lYXN1cmUuY3NzJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZlBlcm1hbGlua1Blcm1hbGluayBmcm9tICdnbWYvcGVybWFsaW5rL1Blcm1hbGluay5qcyc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2FyZWFDb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2xlbmd0aENvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9wb2ludENvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudC5qcyc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnQGdlb2Jsb2Nrcy9wcm9qL3NyYy9FUFNHXzIwNTYuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZS5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZmFwcCcsIFsnZ2V0dGV4dCcsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBnbWZQZXJtYWxpbmtQZXJtYWxpbmsubmFtZSwgZ21mTW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQubmFtZSwgZ21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbXBvbmVudC5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQubmFtZSwgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZV0pO1xubW9kdWxlLnZhbHVlKCdnbWZSYXN0ZXJVcmwnLCBhcHBVUkwuUkFTVEVSKTtcbm1vZHVsZS5jb25zdGFudCgnZGVmYXVsdFRoZW1lJywgJ0RlbW8nKTtcbm1vZHVsZS5jb25zdGFudCgnYW5ndWxhckxvY2FsZVNjcmlwdCcsICcuLi9idWlsZC9hbmd1bGFyLWxvY2FsZV97e2xvY2FsZX19LmpzJyk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlBlcm1hbGluaykge1xuICB2YXIgY2VudGVyID0gZ21mUGVybWFsaW5rLmdldE1hcENlbnRlcigpIHx8IFs1Mzc2MzUsIDE1MjY0MF07XG4gIHZhciB6b29tID0gZ21mUGVybWFsaW5rLmdldE1hcFpvb20oKSB8fCAzO1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKClcbiAgICB9KV0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogY2VudGVyLFxuICAgICAgem9vbTogem9vbVxuICAgIH0pXG4gIH0pO1xuICB0aGlzLm1hcC5hZGRDb250cm9sKG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoe1xuICAgIGRwaTogOTZcbiAgfSkpO1xuICB0aGlzLm1lYXN1cmVBcmVhQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMubWVhc3VyZUxlbmd0aEFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLm1lYXN1cmVQb2ludExheWVyc0NvbmZpZyA9IFt7XG4gICAgbmFtZTogJ2FzdGVyJyxcbiAgICB1bml0OiAnbScsXG4gICAgZGVjaW1hbHM6IDJcbiAgfSwge1xuICAgIG5hbWU6ICdzcnRtJyxcbiAgICB1bml0OiAnbSdcbiAgfV07XG4gIHRoaXMubWVhc3VyZVBvaW50QWN0aXZlID0gZmFsc2U7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycy5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWFNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYU1vYmlsZS5qcyc7XG5pbXBvcnQgeyBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlciB9IGZyb20gJ2dtZi9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUFyZWEnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCcsIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSBhdHRycy5nbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRldXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL2FyZWFDb21wb25lbnQnO1xufSk7XG5tb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL2FyZWFDb21wb25lbnQnLCByZXF1aXJlKCcuL2Jhc2VDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcblxuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdhY3RpdmUnOiAnPWdtZk1vYmlsZU1lYXN1cmVhcmVhQWN0aXZlJyxcbiAgICAgICdwcmVjaXNpb24nOiAnPD9nbWZNb2JpbGVNZWFzdXJlYXJlYVByZWNpc2lvbicsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlYXJlYU1hcCcsXG4gICAgICAnc2tldGNoU3R5bGUnOiAnPT9nbWZNb2JpbGVNZWFzdXJlYXJlYVNrZXRjaHN0eWxlJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVBcmVhQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBnbWZNb2JpbGVNZWFzdXJlQXJlYVRlbXBsYXRlVXJsLFxuICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRyb2xsZXInKTtcbiAgICAgIH1cblxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlYXJlYScsIG1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50KTtcblxudmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX01lYXN1ZU1vYmlsZUJhc2VDb250KSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiXTtcblxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX01lYXN1ZU1vYmlsZUJhc2VDb250LmNhbGwodGhpcywgJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykgfHwgdGhpcztcbiAgICBfdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYU1vYmlsZSh0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgdGhpcy5nZXR0ZXh0Q2F0YWxvZywge1xuICAgICAgcHJlY2lzaW9uOiB0aGlzLnByZWNpc2lvbiB8fCAyLFxuICAgICAgc2tldGNoU3R5bGU6IHRoaXMuc2tldGNoU3R5bGVcbiAgICB9KTtcblxuICAgIF9NZWFzdWVNb2JpbGVCYXNlQ29udC5wcm90b3R5cGUuaW5pdC5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90by5hZGRQb2ludCA9IGZ1bmN0aW9uIGFkZFBvaW50KCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5hZGRUb0RyYXdpbmcoKTtcbiAgfTtcblxuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH07XG5cbiAgX3Byb3RvLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uZmluaXNoRHJhd2luZygpO1xuICB9O1xuXG4gIF9wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiBDb250cm9sbGVyO1xufShNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcik7XG5cbm1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlQXJlYUNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXFxuICAgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgKCFjdHJsLnZhbGlkKVwiXFxuICAgbmctY2xpY2s9XCJjdHJsLmFkZFBvaW50KClcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L3NwYW4+XFxuICAgICB7e1xcJ1NldCBhcyBzdGFydGluZyBwb2ludFxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCJcXG4gICBuZy1pZj1cImN0cmwuZGlydHlcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5hZGRQb2ludCgpXCI+XFxuICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIj48L3NwYW4+XFxuICAgICB7e1xcJ0FkZCBuZXcgcG9pbnRcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXFxuICAgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgY3RybC52YWxpZCAmJiAhY3RybC5kaXJ0eVwiXFxuICAgbmctY2xpY2s9XCJjdHJsLmZpbmlzaCgpXCI+XFxuICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9zcGFuPlxcbiAgICAge3tcXCdUZXJtaW5hdGVcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG48YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiXFxuICAgbmctaWY9XCJjdHJsLnZhbGlkXCJcXG4gICBuZy1jbGljaz1cImN0cmwuY2xlYXIoKVwiPlxcbiAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1yZXBlYXRcIj48L3NwYW4+XFxuICAgICB7e1xcJ0NsZWFyXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC5hY3RpdmVcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICAgICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7IGludGVyYWN0aW9uRGVjb3JhdGlvbiB9IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzLmpzJztcbmltcG9ydCB7IGxpc3RlbiB9IGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVJlZ3VsYXJTaGFwZSBmcm9tICdvbC9zdHlsZS9SZWd1bGFyU2hhcGUuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuaW1wb3J0IE1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUJhc2UnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbmV4cG9ydCBmdW5jdGlvbiBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5zY29wZSA9ICRzY29wZTtcbiAgdGhpcy5maWx0ZXIgPSAkZmlsdGVyO1xuICB0aGlzLmdldHRleHRDYXRhbG9nID0gZ2V0dGV4dENhdGFsb2c7XG4gIHRoaXMubWFwID0gbnVsbDtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5zY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5hY3RpdmU7XG4gIH0sIGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICBpZiAoIV90aGlzLm1lYXN1cmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gICAgfVxuXG4gICAgX3RoaXMubWVhc3VyZS5zZXRBY3RpdmUobmV3VmFsKTtcbiAgfSk7XG4gIHRoaXMucHJlY2lzaW9uID0gbnVsbDtcbiAgdGhpcy5za2V0Y2hTdHlsZSA9IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcbiAgICB9KSxcbiAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIGxpbmVEYXNoOiBbMTAsIDEwXSxcbiAgICAgIHdpZHRoOiAyXG4gICAgfSksXG4gICAgaW1hZ2U6IG5ldyBvbFN0eWxlUmVndWxhclNoYXBlKHtcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43KScsXG4gICAgICAgIHdpZHRoOiAyXG4gICAgICB9KSxcbiAgICAgIHBvaW50czogNCxcbiAgICAgIHJhZGl1czogOCxcbiAgICAgIHJhZGl1czI6IDAsXG4gICAgICBhbmdsZTogMFxuICAgIH0pXG4gIH0pO1xuICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IG51bGw7XG4gIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gIHRoaXMudmFsaWQgPSBmYWxzZTtcbn1cblxuTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cblxuICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gIH1cblxuICB0aGlzLm1lYXN1cmUuc2V0QWN0aXZlKHRoaXMuYWN0aXZlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZSk7XG4gIHZhciBkcmF3SW50ZXJhY3Rpb24gPSB0aGlzLm1lYXN1cmUuZ2V0RHJhd0ludGVyYWN0aW9uKCk7XG5cbiAgaWYgKCEoZHJhd0ludGVyYWN0aW9uIGluc3RhbmNlb2YgTW9iaWxlRHJhdykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGRyYXdJbnRlcmFjdGlvbicpO1xuICB9XG5cbiAgdGhpcy5kcmF3SW50ZXJhY3Rpb24gPSBkcmF3SW50ZXJhY3Rpb247XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbihkcmF3SW50ZXJhY3Rpb24pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2hhc1BvaW50cycsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYXdJbnRlcmFjdGlvbi5nZXRGZWF0dXJlKCkgIT09IG51bGw7XG4gICAgfVxuICB9KTtcbiAgbGlzdGVuKGRyYXdJbnRlcmFjdGlvbiwgJ2NoYW5nZTpkaXJ0eScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBfdGhpczIuZGlydHkgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0RGlydHkoKTtcblxuICAgIGlmIChfdGhpczIuZGlydHkpIHtcbiAgICAgIF90aGlzMi5zY29wZS4kYXBwbHkoKTtcbiAgICB9XG4gIH0sIHRoaXMpO1xuICBsaXN0ZW4oZHJhd0ludGVyYWN0aW9uLCAnY2hhbmdlOmRyYXdpbmcnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgX3RoaXMyLmRyYXdpbmcgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0RHJhd2luZygpO1xuICB9LCB0aGlzKTtcbiAgbGlzdGVuKGRyYXdJbnRlcmFjdGlvbiwgJ2NoYW5nZTp2YWxpZCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBfdGhpczIudmFsaWQgPSBkcmF3SW50ZXJhY3Rpb24uZ2V0VmFsaWQoKTtcbiAgfSwgdGhpcyk7XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZSk7XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignZ21mTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXInLCBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50LiRpbmplY3QgPSBbXCJnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoVGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMuanMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGhNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoTW9iaWxlLmpzJztcbmltcG9ydCB7IE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyIH0gZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL2Jhc2VDb21wb25lbnQuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoJywgW25nZW9NaXNjRmlsdGVycy5uYW1lXSk7XG5tb2R1bGUudmFsdWUoJ2dtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCcsIGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSBhdHRycy5nbWZNb2JpbGVNZWFzdXJlTGVuZ3RoVGVtcGxhdGV1cmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnZ21mL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50Jztcbn0pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQnLCByZXF1aXJlKCcuL2Jhc2VDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcblxuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50KGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdhY3RpdmUnOiAnPWdtZk1vYmlsZU1lYXN1cmVsZW5ndGhBY3RpdmUnLFxuICAgICAgJ3ByZWNpc2lvbic6ICc8P2dtZk1vYmlsZU1lYXN1cmVsZW5ndGhQcmVjaXNpb24nLFxuICAgICAgJ21hcCc6ICc9Z21mTW9iaWxlTWVhc3VyZWxlbmd0aE1hcCcsXG4gICAgICAnc2tldGNoU3R5bGUnOiAnPT9nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoU2tldGNoc3R5bGUnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnR21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsLFxuICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRyb2xsZXInKTtcbiAgICAgIH1cblxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdnbWZNb2JpbGVNZWFzdXJlbGVuZ3RoJywgbW9iaWxlTWVhc3VyZUxlbnRoQ29tcG9uZW50KTtcblxudmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX01lYXN1ZU1vYmlsZUJhc2VDb250KSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiXTtcblxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX01lYXN1ZU1vYmlsZUJhc2VDb250LmNhbGwodGhpcywgJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykgfHwgdGhpcztcbiAgICBfdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoTW9iaWxlKHRoaXMuZmlsdGVyKCduZ2VvVW5pdFByZWZpeCcpLCB0aGlzLmdldHRleHRDYXRhbG9nLCB7XG4gICAgICBwcmVjaXNpb246IHRoaXMucHJlY2lzaW9uIHx8IDMsXG4gICAgICBza2V0Y2hTdHlsZTogdGhpcy5za2V0Y2hTdHlsZVxuICAgIH0pO1xuXG4gICAgX01lYXN1ZU1vYmlsZUJhc2VDb250LnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZFBvaW50ID0gZnVuY3Rpb24gYWRkUG9pbnQoKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cblxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmFkZFRvRHJhd2luZygpO1xuICB9O1xuXG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5jbGVhckRyYXdpbmcoKTtcbiAgfTtcblxuICBfcHJvdG8uZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH07XG5cbiAgX3Byb3RvLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxcbiAgIG5nLWlmPVwiY3RybC5hY3RpdmVcIlxcbiAgIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICAgICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIuJGluamVjdCA9IFtcImdldHRleHRDYXRhbG9nXCIsIFwiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdtZlJhc3RlclwiLCBcIm5nZW9EZWJvdW5jZVwiXTtcbm1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0OyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvW1N5bWJvbC5pdGVyYXRvcl0gPT0gbnVsbCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IHJldHVybiBpdC5uZXh0LmJpbmQoaXQpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgZ21mUmFzdGVyUmFzdGVyU2VydmljZSBmcm9tICdnbWYvcmFzdGVyL1Jhc3RlclNlcnZpY2UuanMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UuanMnO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCB7IGxpc3RlbiwgdW5saXN0ZW5CeUtleSB9IGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVJlZ3VsYXJTaGFwZSBmcm9tICdvbC9zdHlsZS9SZWd1bGFyU2hhcGUuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuaW1wb3J0IE1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZVBvaW50JywgW2dtZlJhc3RlclJhc3RlclNlcnZpY2UubmFtZSwgbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5tb2R1bGUudmFsdWUoJ2dtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRldXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50Jztcbn0pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvbWVhc3VyZS9wb2ludENvbXBvbmVudCcsIHJlcXVpcmUoJy4vcG9pbnRDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcblxuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50KGdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZXBvaW50QWN0aXZlJyxcbiAgICAgICdnZXRDb29yZGluYXRlRGVjaW1hbHNGbic6ICcmP2dtZk1vYmlsZU1lYXN1cmVwb2ludENvb3JkaW5hdGVkZWNpbWFscycsXG4gICAgICAnZ2V0TGF5ZXJzQ29uZmlnRm4nOiAnJmdtZk1vYmlsZU1lYXN1cmVwb2ludExheWVyc2NvbmZpZycsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlcG9pbnRNYXAnLFxuICAgICAgJ3NrZXRjaFN0eWxlJzogJz0/Z21mTW9iaWxlTWVhc3VyZXBvaW50U2tldGNoc3R5bGUnLFxuICAgICAgJ2Zvcm1hdCc6ICc8Z21mTW9iaWxlTWVhc3VyZXBvaW50Rm9ybWF0J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZVBvaW50VGVtcGxhdGVVcmwsXG4gICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29udHJvbGxlcicpO1xuICAgICAgfVxuXG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVwb2ludCcsIG1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudCk7XG5leHBvcnQgZnVuY3Rpb24gTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcihnZXR0ZXh0Q2F0YWxvZywgJHNjb3BlLCAkZmlsdGVyLCBnbWZSYXN0ZXIsIG5nZW9EZWJvdW5jZSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHRoaXMuZ21mUmFzdGVyXyA9IGdtZlJhc3RlcjtcbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuICB0aGlzLmdldHRleHRDYXRhbG9nXyA9IGdldHRleHRDYXRhbG9nO1xuICB0aGlzLiRmaWx0ZXJfID0gJGZpbHRlcjtcbiAgdGhpcy5tYXAgPSBudWxsO1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gIHRoaXMuZ2V0Q29vcmRpbmF0ZURlY2ltYWxzRm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgJHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90aGlzLmFjdGl2ZTtcbiAgfSwgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgIGlmICghX3RoaXMubWVhc3VyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgICB9XG5cbiAgICBfdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuXG4gICAgX3RoaXMuaGFuZGxlTWVhc3VyZUFjdGl2ZUNoYW5nZV8oKTtcbiAgfSk7XG4gIHZhciBjb29yZGluYXRlRGVjaW1hbHNGbiA9IHRoaXMuZ2V0Q29vcmRpbmF0ZURlY2ltYWxzRm47XG4gIHRoaXMuY29vcmRpbmF0ZURlY2ltYWxzID0gY29vcmRpbmF0ZURlY2ltYWxzRm4gPyBjb29yZGluYXRlRGVjaW1hbHNGbigpIDogMDtcbiAgdGhpcy5sYXllcnNDb25maWcgPSBbXTtcbiAgdGhpcy5za2V0Y2hTdHlsZSA9IFtdO1xuXG4gIGlmICh0aGlzLnNrZXRjaFN0eWxlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnNrZXRjaFN0eWxlID0gbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcbiAgICAgIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgICAgbGluZURhc2g6IFsxMCwgMTBdLFxuICAgICAgICB3aWR0aDogMlxuICAgICAgfSksXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGVSZWd1bGFyU2hhcGUoe1xuICAgICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43KScsXG4gICAgICAgICAgd2lkdGg6IDJcbiAgICAgICAgfSksXG4gICAgICAgIHBvaW50czogNCxcbiAgICAgICAgcmFkaXVzOiA4LFxuICAgICAgICByYWRpdXMyOiAwLFxuICAgICAgICBhbmdsZTogMFxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuZm9ybWF0ID0gbnVsbDtcbiAgdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgdGhpcy5kcmF3SW50ZXJhY3Rpb24gPSBudWxsO1xuXG4gIHRoaXMuZ2V0TGF5ZXJzQ29uZmlnRm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9O1xuXG4gIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbn1cblxuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tZWFzdXJlID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVQb2ludE1vYmlsZSh0aGlzLiRmaWx0ZXJfKCduZ2VvTnVtYmVyQ29vcmRpbmF0ZXMnKSwgdGhpcy5mb3JtYXQgfHwgJ3t4fSwge3l9Jywge1xuICAgIGRlY2ltYWxzOiB0aGlzLmNvb3JkaW5hdGVEZWNpbWFscyxcbiAgICBza2V0Y2hTdHlsZTogdGhpcy5za2V0Y2hTdHlsZVxuICB9KTtcbiAgdGhpcy5tZWFzdXJlLnNldEFjdGl2ZSh0aGlzLmFjdGl2ZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLm1lYXN1cmUpO1xuICB2YXIgZHJhd0ludGVyYWN0aW9uID0gdGhpcy5tZWFzdXJlLmdldERyYXdJbnRlcmFjdGlvbigpO1xuXG4gIGlmICghKGRyYXdJbnRlcmFjdGlvbiBpbnN0YW5jZW9mIE1vYmlsZURyYXcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgfVxuXG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5kcmF3SW50ZXJhY3Rpb24pO1xuICB2YXIgbGF5ZXJzQ29uZmlnID0gdGhpcy5nZXRMYXllcnNDb25maWdGbigpO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShsYXllcnNDb25maWcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBsYXllcnNDb25maWcgdHlwZScpO1xuICB9XG5cbiAgdGhpcy5sYXllcnNDb25maWcgPSBsYXllcnNDb25maWc7XG5cbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZSk7XG59O1xuXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xufTtcblxuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUudHJhbnNsYXRlID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gdGhpcy5nZXR0ZXh0Q2F0YWxvZ18uZ2V0U3RyaW5nKHN0cik7XG59O1xuXG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVNZWFzdXJlQWN0aXZlQ2hhbmdlXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIGlmICghdGhpcy5tZWFzdXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgfVxuXG4gIGlmICh0aGlzLm1lYXN1cmUuZ2V0QWN0aXZlKCkpIHtcbiAgICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICB0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5XyA9IGxpc3Rlbih2aWV3LCAncHJvcGVydHljaGFuZ2UnLCB0aGlzLm5nZW9EZWJvdW5jZV8odGhpcy5nZXRNZWFzdXJlXy5iaW5kKHRoaXMpLCAzMDAsIHRydWUpLCB0aGlzKTtcbiAgICB0aGlzLmdldE1lYXN1cmVfKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8pIHtcbiAgICB1bmxpc3RlbkJ5S2V5KHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfKTtcbiAgICB0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5XyA9IG51bGw7XG4gIH1cbn07XG5cbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lYXN1cmVfID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG5cbiAgdmFyIGNlbnRlciA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRDZW50ZXIoKTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY2VudGVyJyk7XG4gIH1cblxuICB2YXIgcGFyYW1zID0ge1xuICAgICdsYXllcnMnOiB0aGlzLmxheWVyc0NvbmZpZy5tYXAoZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbmZpZy5uYW1lO1xuICAgIH0pLmpvaW4oJywnKVxuICB9O1xuICB0aGlzLmdtZlJhc3Rlcl8uZ2V0UmFzdGVyKGNlbnRlciwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAoIV90aGlzMi5tZWFzdXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgIH1cblxuICAgIHZhciBlbCA9IF90aGlzMi5tZWFzdXJlLmdldFRvb2x0aXBFbGVtZW50KCk7XG5cbiAgICB2YXIgY3RuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGNsYXNzTmFtZSA9ICdnbWYtbW9iaWxlLW1lYXN1cmUtcG9pbnQnO1xuICAgIGN0bi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKF90aGlzMi5sYXllcnNDb25maWcpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgdmFyIGNvbmZpZyA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIGtleSA9IGNvbmZpZy5uYW1lO1xuXG4gICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgdmFyIGNoaWxkRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2hpbGRFbC5jbGFzc05hbWUgPSBcImdtZi1tb2JpbGUtbWVhc3VyZS1wb2ludC1cIiArIGtleTtcbiAgICAgICAgdmFyIHVuaXQgPSBjb25maWcudW5pdCB8fCAnJztcbiAgICAgICAgdmFyIGRlY2ltYWxzID0gY29uZmlnLmRlY2ltYWxzID4gMCA/IGNvbmZpZy5kZWNpbWFscyA6IDA7XG4gICAgICAgIHZhbHVlID0gX3RoaXMyLiRmaWx0ZXJfKCdudW1iZXInKSh2YWx1ZSwgZGVjaW1hbHMpO1xuICAgICAgICBjaGlsZEVsLmlubmVySFRNTCA9IFtfdGhpczIudHJhbnNsYXRlKGtleSksICc6ICcsIHZhbHVlLCAnICcsIHVuaXRdLmpvaW4oJycpO1xuICAgICAgICBjdG4uYXBwZW5kQ2hpbGQoY2hpbGRFbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzQ3RuID0gZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuXG4gICAgaWYgKHByZXZpb3VzQ3RuWzBdKSB7XG4gICAgICBwcmV2aW91c0N0blswXS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBlbC5hcHBlbmRDaGlsZChjdG4pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5jb250cm9sbGVyKCdHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyJywgTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhLmpzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdy5qcyc7XG5cbnZhciBNZWFzdXJlQXJlYU1vYmlsZSA9IGZ1bmN0aW9uIChfbmdlb0ludGVyYWN0aW9uTWVhc3UpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWVhc3VyZUFyZWFNb2JpbGUsIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSk7XG5cbiAgZnVuY3Rpb24gTWVhc3VyZUFyZWFNb2JpbGUoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgIGRpc3BsYXlIZWxwVG9vbHRpcDogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gX25nZW9JbnRlcmFjdGlvbk1lYXN1LmNhbGwodGhpcywgZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNZWFzdXJlQXJlYU1vYmlsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmNyZWF0ZURyYXdJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdQb2x5Z29uJyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBNZWFzdXJlQXJlYU1vYmlsZTtcbn0obmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEpO1xuXG5leHBvcnQgZGVmYXVsdCBNZWFzdXJlQXJlYU1vYmlsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGggZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoLmpzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdy5qcyc7XG5cbnZhciBfZGVmYXVsdCA9IGZ1bmN0aW9uIChfbmdlb0ludGVyYWN0aW9uTWVhc3UpIHtcbiAgX2luaGVyaXRzTG9vc2UoX2RlZmF1bHQsIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSk7XG5cbiAgZnVuY3Rpb24gX2RlZmF1bHQoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0X29wdGlvbnMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zICE9PSB1bmRlZmluZWQgPyBvcHRfb3B0aW9ucyA6IHt9O1xuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9ucywge1xuICAgICAgZGlzcGxheUhlbHBUb29sdGlwOiBmYWxzZVxuICAgIH0pO1xuICAgIHJldHVybiBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBmb3JtYXQsIGdldHRleHRDYXRhbG9nLCBvcHRpb25zKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcblxuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgc3R5bGU6IHN0eWxlXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZSwgeyBnZXRGb3JtYXR0ZWRQb2ludCB9IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZS5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcuanMnO1xuaW1wb3J0IFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQuanMnO1xuXG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX25nZW9JbnRlcmFjdGlvbk1lYXN1KSB7XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfbmdlb0ludGVyYWN0aW9uTWVhc3UpO1xuXG4gIGZ1bmN0aW9uIF9kZWZhdWx0KGZvcm1hdCwgY29vcmRGb3JtYXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgX3RoaXMgPSBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmZvcm1hdF8gPSBmb3JtYXQ7XG4gICAgX3RoaXMuY29vcmRGb3JtYXRfID0gY29vcmRGb3JtYXQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcblxuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5oYW5kbGVNZWFzdXJlID0gZnVuY3Rpb24gaGFuZGxlTWVhc3VyZShjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2tldGNoRmVhdHVyZScpO1xuICAgIH1cblxuICAgIHZhciBnZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlLmdldEdlb21ldHJ5KCk7XG5cbiAgICBpZiAoIShnZW9tIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICB9XG5cbiAgICB2YXIgZGVjID0gdGhpcy5kZWNpbWFscztcbiAgICB2YXIgb3V0cHV0ID0gZ2V0Rm9ybWF0dGVkUG9pbnQoZ2VvbSwgZGVjLCB0aGlzLmZvcm1hdF8sIHRoaXMuY29vcmRGb3JtYXRfKTtcbiAgICB2YXIgY29vcmQgPSBnZW9tLmdldExhc3RDb29yZGluYXRlKCk7XG4gICAgY2FsbGJhY2sob3V0cHV0LCBjb29yZCk7XG4gIH07XG5cbiAgcmV0dXJuIF9kZWZhdWx0O1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHsgZ2V0RGVmYXVsdERyYXdTdHlsZUZ1bmN0aW9uIH0gZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9jb21tb24uanMnO1xuaW1wb3J0IG5nZW9DdXN0b21FdmVudCBmcm9tICduZ2VvL0N1c3RvbUV2ZW50LmpzJztcbmltcG9ydCB7IGxpc3RlbiwgdW5saXN0ZW5CeUtleSB9IGZyb20gJ29sL2V2ZW50cy5qcyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IHsgVFJVRSB9IGZyb20gJ29sL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcuanMnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQuanMnO1xuaW1wb3J0IG9sR2VvbVBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uLmpzJztcbmltcG9ydCBvbEdlb21TaW1wbGVHZW9tZXRyeSBmcm9tICdvbC9nZW9tL1NpbXBsZUdlb21ldHJ5LmpzJztcbmltcG9ydCBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24gZnJvbSAnb2wvaW50ZXJhY3Rpb24vSW50ZXJhY3Rpb24uanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yLmpzJztcblxudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9vbEludGVyYWN0aW9uSW50ZXJhYykge1xuICBfaW5oZXJpdHNMb29zZShfZGVmYXVsdCwgX29sSW50ZXJhY3Rpb25JbnRlcmFjKTtcblxuICBmdW5jdGlvbiBfZGVmYXVsdChvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfb2xJbnRlcmFjdGlvbkludGVyYWMuY2FsbCh0aGlzLCB7XG4gICAgICBoYW5kbGVFdmVudDogVFJVRVxuICAgIH0pIHx8IHRoaXM7XG4gICAgX3RoaXMuY2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbiAgICBfdGhpcy50eXBlXyA9IG9wdGlvbnMudHlwZTtcbiAgICBfdGhpcy5taW5Qb2ludHNfID0gb3B0aW9ucy5taW5Qb2ludHMgPyBvcHRpb25zLm1pblBvaW50cyA6IF90aGlzLnR5cGVfID09PSAnUG9seWdvbicgPyAzIDogMjtcbiAgICBfdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG51bGw7XG4gICAgX3RoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIF90aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgX3RoaXMub3ZlcmxheV8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICAgIHVzZVNwYXRpYWxJbmRleDogZmFsc2UsXG4gICAgICAgIHdyYXBYOiBvcHRpb25zLndyYXBYID8gb3B0aW9ucy53cmFwWCA6IGZhbHNlXG4gICAgICB9KSxcbiAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlIHx8IGdldERlZmF1bHREcmF3U3R5bGVGdW5jdGlvbigpLFxuICAgICAgdXBkYXRlV2hpbGVBbmltYXRpbmc6IHRydWUsXG4gICAgICB1cGRhdGVXaGlsZUludGVyYWN0aW5nOiB0cnVlXG4gICAgfSk7XG4gICAgbGlzdGVuKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCAnY2hhbmdlOmFjdGl2ZScsIF90aGlzLnVwZGF0ZVN0YXRlXywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuXG4gICAgX3RoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcblxuICAgIF90aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcblxuICAgIF90aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuXG4gIF9wcm90by5zZXRNYXAgPSBmdW5jdGlvbiBzZXRNYXAobWFwKSB7XG4gICAgdmFyIGN1cnJlbnRNYXAgPSB0aGlzLmdldE1hcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRNYXApIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZUV2ZW50S2V5Xykge1xuICAgICAgICB1bmxpc3RlbkJ5S2V5KHRoaXMuY2hhbmdlRXZlbnRLZXlfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbEludGVyYWN0aW9uSW50ZXJhY3Rpb24ucHJvdG90eXBlLnNldE1hcC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICB0aGlzLmNoYW5nZUV2ZW50S2V5XyA9IGxpc3RlbihtYXAuZ2V0VmlldygpLCAnY2hhbmdlOmNlbnRlcicsIHRoaXMuaGFuZGxlVmlld0NlbnRlckNoYW5nZV8sIHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdGVfKCk7XG4gIH07XG5cbiAgX3Byb3RvLmdldERpcnR5ID0gZnVuY3Rpb24gZ2V0RGlydHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkaXJ0eScpO1xuICB9O1xuXG4gIF9wcm90by5nZXREcmF3aW5nID0gZnVuY3Rpb24gZ2V0RHJhd2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ2RyYXdpbmcnKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0VmFsaWQgPSBmdW5jdGlvbiBnZXRWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3ZhbGlkJyk7XG4gIH07XG5cbiAgX3Byb3RvLmdldEZlYXR1cmUgPSBmdW5jdGlvbiBnZXRGZWF0dXJlKCkge1xuICAgIHJldHVybiB0aGlzLnNrZXRjaEZlYXR1cmVfO1xuICB9O1xuXG4gIF9wcm90by5hZGRUb0RyYXdpbmcgPSBmdW5jdGlvbiBhZGRUb0RyYXdpbmcoKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaFBvaW50Jyk7XG4gICAgfVxuXG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcblxuICAgIGlmICghYWN0aXZlIHx8ICFkcmF3aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNrZXRjaEZlYXR1cmVHZW9tO1xuICAgIHZhciBza2V0Y2hQb2ludEdlb20gPSB0aGlzLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCk7XG4gICAgdmFyIGNvb3JkaW5hdGUgPSBza2V0Y2hQb2ludEdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICB2YXIgY29vcmRpbmF0ZXMgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2ludCcpIHtcbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tUG9pbnQoY29vcmRpbmF0ZSkpO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJykge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludHNfLnB1c2godGhpcy5za2V0Y2hQb2ludF8pO1xuXG4gICAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbY29vcmRpbmF0ZS5zbGljZSgpLCBjb29yZGluYXRlLnNsaWNlKCldO1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhjb29yZGluYXRlcykpO1xuXG4gICAgICAgIHZhciBfZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoX2V2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuXG4gICAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVNpbXBsZUdlb21ldHJ5KSB7XG4gICAgICAgICAgY29vcmRpbmF0ZXMgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZS5zbGljZSgpKTtcbiAgICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50c18ucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG5cbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKSwgY29vcmRpbmF0ZS5zbGljZSgpXTtcbiAgICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbVBvbHlnb24oW2Nvb3JkaW5hdGVzXSkpO1xuXG4gICAgICAgIHZhciBfZXZlbnQyID0gbmV3IG5nZW9DdXN0b21FdmVudCgnZHJhd3N0YXJ0Jywge1xuICAgICAgICAgIGZlYXR1cmU6IHRoaXMuc2tldGNoRmVhdHVyZV9cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KF9ldmVudDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgICAgICAgIHZhciBjb29yZGluYXRlc3MgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNzWzBdO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZS5zbGljZSgpKTtcbiAgICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRpcnR5ID0gdGhpcy5nZXREaXJ0eSgpO1xuXG4gICAgaWYgKGRpcnR5KSB7XG4gICAgICB0aGlzLnNldCgnZGlydHknLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvb3JkaW5hdGVzJyk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkID0gdGhpcy5nZXRWYWxpZCgpO1xuXG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJyB8fCB0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPj0gdGhpcy5taW5Qb2ludHNfKSB7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICB0aGlzLnNldCgndmFsaWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgdGhpcy5zZXQoJ3ZhbGlkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5za2V0Y2hQb2ludF8gPSBudWxsO1xuICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNsZWFyRHJhd2luZyA9IGZ1bmN0aW9uIGNsZWFyRHJhd2luZygpIHtcbiAgICB0aGlzLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgdGhpcy5zZXRBY3RpdmUodHJ1ZSk7XG4gIH07XG5cbiAgX3Byb3RvLmZpbmlzaERyYXdpbmcgPSBmdW5jdGlvbiBmaW5pc2hEcmF3aW5nKCkge1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIHZhciBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG5cbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3ZW5kJywge1xuICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG5cbiAgX3Byb3RvLnN0YXJ0RHJhd2luZ18gPSBmdW5jdGlvbiBzdGFydERyYXdpbmdfKCkge1xuICAgIHRoaXMuc2V0KCdkcmF3aW5nJywgdHJ1ZSk7XG4gICAgdGhpcy5jcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpO1xuICAgIHRoaXMudXBkYXRlU2tldGNoRmVhdHVyZXNfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLm1vZGlmeURyYXdpbmdfID0gZnVuY3Rpb24gbW9kaWZ5RHJhd2luZ18oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyXygpO1xuXG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJykge1xuICAgICAgdmFyIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuXG4gICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21TaW1wbGVHZW9tZXRyeSkge1xuICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICBjb29yZGluYXRlcy5wb3AoKTtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjZW50ZXIpO1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIHZhciBfc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgICAgIGlmIChfc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21Qb2x5Z29uKSB7XG4gICAgICAgIHZhciBjb29yZGluYXRlc3MgPSBfc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcblxuICAgICAgICB2YXIgX2Nvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNzWzBdO1xuXG4gICAgICAgIF9jb29yZGluYXRlcy5wb3AoKTtcblxuICAgICAgICBfY29vcmRpbmF0ZXMucHVzaChjZW50ZXIpO1xuXG4gICAgICAgIF9za2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhbX2Nvb3JkaW5hdGVzXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRpcnR5ID0gdGhpcy5nZXREaXJ0eSgpO1xuXG4gICAgaWYgKCFkaXJ0eSkge1xuICAgICAgdGhpcy5zZXQoJ2RpcnR5JywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5hYm9ydERyYXdpbmdfID0gZnVuY3Rpb24gYWJvcnREcmF3aW5nXygpIHtcbiAgICB2YXIgc2tldGNoRmVhdHVyZSA9IHRoaXMuc2tldGNoRmVhdHVyZV87XG5cbiAgICBpZiAoc2tldGNoRmVhdHVyZSB8fCB0aGlzLnNrZXRjaFBvaW50c18ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG51bGw7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgICB0aGlzLm92ZXJsYXlfLmdldFNvdXJjZSgpLmNsZWFyKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2tldGNoUG9pbnRzXyA9IFtdO1xuICAgIHRoaXMuc2V0KCdkaXJ0eScsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB0aGlzLnNldCgndmFsaWQnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHNrZXRjaEZlYXR1cmU7XG4gIH07XG5cbiAgX3Byb3RvLnVwZGF0ZVN0YXRlXyA9IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlXygpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5nZXRNYXAoKTtcbiAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcblxuICAgIGlmICghbWFwIHx8ICFhY3RpdmUpIHtcbiAgICAgIHRoaXMuYWJvcnREcmF3aW5nXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0RHJhd2luZ18oKTtcbiAgICB9XG5cbiAgICB0aGlzLm92ZXJsYXlfLnNldE1hcChhY3RpdmUgPyBtYXAgOiBudWxsKTtcbiAgfTtcblxuICBfcHJvdG8uaGFuZGxlVmlld0NlbnRlckNoYW5nZV8gPSBmdW5jdGlvbiBoYW5kbGVWaWV3Q2VudGVyQ2hhbmdlXyhldnQpIHtcbiAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICB2YXIgZHJhd2luZyA9IHRoaXMuZ2V0RHJhd2luZygpO1xuXG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfKCk7XG5cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvaW50Jykge1xuICAgICAgdGhpcy5hZGRUb0RyYXdpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RpZnlEcmF3aW5nXygpO1xuICAgICAgdGhpcy51cGRhdGVTa2V0Y2hGZWF0dXJlc18oKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfID0gZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKSB7XG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyXygpO1xuXG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB2YXIgZ2VvbWV0cnkgPSB0aGlzLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfKCk7XG4gICAgICBnZW9tZXRyeS5zZXRDb29yZGluYXRlcyhjZW50ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG5ldyBvbEZlYXR1cmUobmV3IG9sR2VvbVBvaW50KGNlbnRlcikpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8udXBkYXRlU2tldGNoRmVhdHVyZXNfID0gZnVuY3Rpb24gdXBkYXRlU2tldGNoRmVhdHVyZXNfKCkge1xuICAgIHZhciBza2V0Y2hGZWF0dXJlcyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHNrZXRjaEZlYXR1cmVzLnB1c2godGhpcy5za2V0Y2hGZWF0dXJlXyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICBza2V0Y2hGZWF0dXJlcy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcbiAgICB9XG5cbiAgICB2YXIgb3ZlcmxheVNvdXJjZSA9IHRoaXMub3ZlcmxheV8uZ2V0U291cmNlKCk7XG4gICAgb3ZlcmxheVNvdXJjZS5jbGVhcih0cnVlKTtcbiAgICBvdmVybGF5U291cmNlLmFkZEZlYXR1cmVzKHNrZXRjaEZlYXR1cmVzKTtcbiAgICBvdmVybGF5U291cmNlLmFkZEZlYXR1cmVzKHRoaXMuc2tldGNoUG9pbnRzXyk7XG4gIH07XG5cbiAgX3Byb3RvLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfID0gZnVuY3Rpb24gZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaFBvaW50Jyk7XG4gICAgfVxuXG4gICAgdmFyIGdlb21ldHJ5ID0gdGhpcy5za2V0Y2hQb2ludF8uZ2V0R2VvbWV0cnkoKTtcblxuICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSB7XG4gICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZ2VvbWV0cnkgdHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZ2V0Q2VudGVyXyA9IGZ1bmN0aW9uIGdldENlbnRlcl8oKSB7XG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0TWFwKCkuZ2V0VmlldygpLmdldENlbnRlcigpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNlbnRlcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjZW50ZXInKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2VudGVyO1xuICB9O1xuXG4gIHJldHVybiBfZGVmYXVsdDtcbn0ob2xJbnRlcmFjdGlvbkludGVyYWN0aW9uKTtcblxuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=