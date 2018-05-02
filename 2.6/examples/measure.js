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
/******/ 		"measure": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push([26,"commons"]);
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



/***/ }),

/***/ "./examples/measure.js":
/*!*****************************!*\
  !*** ./examples/measure.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _measure_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./measure.css */ "./examples/measure.css");
/* harmony import */ var _measure_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_measure_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureArea.js */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MeasureAzimut_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/interaction/MeasureAzimut.js */ "./src/interaction/MeasureAzimut.js");
/* harmony import */ var ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MeasureLength.js */ "./src/interaction/MeasureLength.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/control/ScaleLine.js */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_18__);
// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
























/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', [
  'gettext',
  ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name,
  ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_8__["default"].name,
  'ngSanitize',
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/measuretools', __webpack_require__(/*! ./partials/measuretools.html */ "./examples/partials/measuretools.html"));
  }
);

/**
 * App-specific component wrapping the measure tools. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {angular.IComponentOptions}
 */
const measuretoolsComponent = {
  bindings: {
    'map': '=appMeasuretoolsMap',
    'lang': '=appMeasuretoolsLang',
  },
  controller: 'AppMeasuretoolsController',
  templateUrl: 'partials/measuretools',
};

myModule.component('appMeasuretools', measuretoolsComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @constructor
 * @ngInject
 */
function MeasuretoolsController($scope, $compile, $sce, $filter, gettextCatalog) {
  /**
   * @type {?import("ol/Map.js").default}
   */
  this.map = null;

  /**
   * @type {string}
   */
  this.lang = '';

  /**
   * @type {Object<string, *>}
   */
  this.measureStartMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureLengthContinueMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureAreaContinueMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureAzimutContinueMsg = {};

  // Translations for the measure tools' tooltips.
  const measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.'),
  };
  const measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur dernier point pour finir.'
    ),
  };
  const measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml(
      'Click to continue drawing<br>' + 'Double-click or click starting point to finish.'
    ),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur point de départ pour finir.'
    ),
  };
  const measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.'),
  };

  // Create elements for the measure tools' tooltips.
  let measureStartMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  let measureLengthContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(
    '<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>'
  );
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  let measureAreaContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  let measureAzimutContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(
    '<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>'
  );
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);

  // Watch the "lang" property and update the toolip messages
  // based on the selected language.
  $scope.$watch(
    () => this.lang,
    (newVal) => {
      // @ts-ignore
      this.measureStartMsg = measureStartMsgs[newVal];
      // @ts-ignore
      this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];
      // @ts-ignore
      this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];
      // @ts-ignore
      this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];
    }
  );

  const style = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2,
    }),
    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      radius: 5,
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  });

  /**
   * @type {import("ngeo/interaction/MeasureLength.js").default}
   */
  this.measureLength = new ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_4__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0],
  });

  this.measureLength.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureLength);

  /**
   * @type {import("ngeo/interaction/MeasureArea.js").default}
   */
  this.measureArea = new ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_2__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0],
  });

  this.measureArea.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureArea);

  /**
   * @type {import("ngeo/interaction/MeasureAzimut.js").default}
   */
  this.measureAzimut = new ngeo_interaction_MeasureAzimut_js__WEBPACK_IMPORTED_MODULE_3__["default"]($filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAzimutContinueMsg[0],
  });

  this.measureAzimut.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureAzimut);

  // the following code shows how one can add additional information to the
  // tooltip. This can be useful to display the elevation offset from the
  // 2 points of an azimut measurement.
  this.measureAzimut.on(
    'measureend',
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent.js').default<unknown>} evt
       */ (evt) => {
        const el = evt.target.getTooltipElement();
        el.innerHTML += '<br>Additional info';
      }
    )
  );
}

myModule.controller('AppMeasuretoolsController', MeasuretoolsController);

MeasuretoolsController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measureLength);
  this.map.addInteraction(this.measureArea);
  this.map.addInteraction(this.measureAzimut);
};

/**
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {string}
   */
  this.lang = 'en';

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      center: [692114.718759744, 5743119.914347709],
      zoom: 15,
    }),
  });

  this.map.addControl(
    new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
      // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
      dpi: 96,
    })
  );
}

myModule.controller('MainController', MainController);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./examples/partials/measuretools.html":
/*!*********************************************!*\
  !*** ./examples/partials/measuretools.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div ngeo-btn-group class="btn-group">\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureLength.active">Length</button>\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureArea.active">Area</button>\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureAzimut.active">Azimut</button>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(596);

/***/ }),

/***/ 26:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/measure.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/measure.js */"./examples/measure.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9tZWFzdXJlLmpzIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3BhcnRpYWxzL21lYXN1cmV0b29scy5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsyNixcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyMSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vbWVhc3VyZS5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYS5qcyc7XG5cbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXppbXV0IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUF6aW11dC5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aCBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGguanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcblxuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQuanMnO1xuXG5pbXBvcnQge2ludGVyYWN0aW9uRGVjb3JhdGlvbn0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sQ29udHJvbFNjYWxlTGluZSBmcm9tICdvbC9jb250cm9sL1NjYWxlTGluZS5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlLmpzJztcbmltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0ICdhbmd1bGFyLXNhbml0aXplJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIG5nZW9NYXBNb2R1bGUubmFtZSxcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NGaWx0ZXJzLm5hbWUsXG4gICduZ1Nhbml0aXplJyxcbl0pO1xuXG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAbmdJbmplY3RcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3BhcnRpYWxzL21lYXN1cmV0b29scycsIHJlcXVpcmUoJy4vcGFydGlhbHMvbWVhc3VyZXRvb2xzLmh0bWwnKSk7XG4gIH1cbik7XG5cbi8qKlxuICogQXBwLXNwZWNpZmljIGNvbXBvbmVudCB3cmFwcGluZyB0aGUgbWVhc3VyZSB0b29scy4gVGhlIGNvbXBvbmVudCdzXG4gKiBjb250cm9sbGVyIGhhcyBhIHByb3BlcnR5IFwibWFwXCIgaW5jbHVkaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBPcGVuTGF5ZXJzXG4gKiBtYXAuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IG1lYXN1cmV0b29sc0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBNZWFzdXJldG9vbHNNYXAnLFxuICAgICdsYW5nJzogJz1hcHBNZWFzdXJldG9vbHNMYW5nJyxcbiAgfSxcbiAgY29udHJvbGxlcjogJ0FwcE1lYXN1cmV0b29sc0NvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL21lYXN1cmV0b29scycsXG59O1xuXG5teU1vZHVsZS5jb21wb25lbnQoJ2FwcE1lYXN1cmV0b29scycsIG1lYXN1cmV0b29sc0NvbXBvbmVudCk7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlfSAkY29tcGlsZSBBbmd1bGFyIGNvbXBpbGUgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU0NFU2VydmljZX0gJHNjZSBBbmd1bGFyIHNjZSBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfSAkZmlsdGVyIEFuZ3VsYXIgZmlsdGVyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWVhc3VyZXRvb2xzQ29udHJvbGxlcigkc2NvcGUsICRjb21waWxlLCAkc2NlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykge1xuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoXCJvbC9NYXAuanNcIikuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMubGFuZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59XG4gICAqL1xuICB0aGlzLm1lYXN1cmVTdGFydE1zZyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59XG4gICAqL1xuICB0aGlzLm1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBcmVhQ29udGludWVNc2cgPSB7fTtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSB7fTtcblxuICAvLyBUcmFuc2xhdGlvbnMgZm9yIHRoZSBtZWFzdXJlIHRvb2xzJyB0b29sdGlwcy5cbiAgY29uc3QgbWVhc3VyZVN0YXJ0TXNncyA9IHtcbiAgICAnZW4nOiAkc2NlLnRydXN0QXNIdG1sKCdDbGljayB0byBzdGFydCBkcmF3aW5nLicpLFxuICAgICdmcic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaXF1ZXIgcG91ciBjb21tZW5jZXIgw6AgZGVzc2luZXIuJyksXG4gIH07XG4gIGNvbnN0IG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZ3MgPSB7XG4gICAgJ2VuJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpY2sgdG8gY29udGludWUgZHJhd2luZzxicj4nICsgJ0RvdWJsZS1jbGljayBvciBjbGljayBsYXN0IHBvaW50IHRvIGZpbmlzaC4nKSxcbiAgICAnZnInOiAkc2NlLnRydXN0QXNIdG1sKFxuICAgICAgJ0NsaXF1ZXIgcG91ciBjb250aW51ZXIgbGUgZGVzc2luPGJyPicgKyAnRG91YmxlLWNsaXF1ZXIgb3UgY2xpcXVlciBzdXIgZGVybmllciBwb2ludCBwb3VyIGZpbmlyLidcbiAgICApLFxuICB9O1xuICBjb25zdCBtZWFzdXJlQXJlYUNvbnRpbnVlTXNncyA9IHtcbiAgICAnZW4nOiAkc2NlLnRydXN0QXNIdG1sKFxuICAgICAgJ0NsaWNrIHRvIGNvbnRpbnVlIGRyYXdpbmc8YnI+JyArICdEb3VibGUtY2xpY2sgb3IgY2xpY2sgc3RhcnRpbmcgcG9pbnQgdG8gZmluaXNoLidcbiAgICApLFxuICAgICdmcic6ICRzY2UudHJ1c3RBc0h0bWwoXG4gICAgICAnQ2xpcXVlciBwb3VyIGNvbnRpbnVlciBsZSBkZXNzaW48YnI+JyArICdEb3VibGUtY2xpcXVlciBvdSBjbGlxdWVyIHN1ciBwb2ludCBkZSBkw6lwYXJ0IHBvdXIgZmluaXIuJ1xuICAgICksXG4gIH07XG4gIGNvbnN0IG1lYXN1cmVBemltdXRDb250aW51ZU1zZ3MgPSB7XG4gICAgJ2VuJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpY2sgdG8gZmluaXNoLicpLFxuICAgICdmcic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaXF1ZXIgcG91ciBmaW5pci4nKSxcbiAgfTtcblxuICAvLyBDcmVhdGUgZWxlbWVudHMgZm9yIHRoZSBtZWFzdXJlIHRvb2xzJyB0b29sdGlwcy5cbiAgbGV0IG1lYXN1cmVTdGFydE1zZyA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4gbmctYmluZC1odG1sPVwiY3RybC5tZWFzdXJlU3RhcnRNc2dcIj48L3NwYW4+Jyk7XG4gIG1lYXN1cmVTdGFydE1zZyA9ICRjb21waWxlKG1lYXN1cmVTdGFydE1zZykoJHNjb3BlKTtcbiAgbGV0IG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IGFuZ3VsYXIuZWxlbWVudChcbiAgICAnPHNwYW4gbmctYmluZC1odG1sPVwiY3RybC5tZWFzdXJlTGVuZ3RoQ29udGludWVNc2dcIj48L3NwYW4+J1xuICApO1xuICBtZWFzdXJlTGVuZ3RoQ29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlTGVuZ3RoQ29udGludWVNc2cpKCRzY29wZSk7XG4gIGxldCBtZWFzdXJlQXJlYUNvbnRpbnVlTXNnID0gYW5ndWxhci5lbGVtZW50KCc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVBcmVhQ29udGludWVNc2dcIj48L3NwYW4+Jyk7XG4gIG1lYXN1cmVBcmVhQ29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlQXJlYUNvbnRpbnVlTXNnKSgkc2NvcGUpO1xuICBsZXQgbWVhc3VyZUF6aW11dENvbnRpbnVlTXNnID0gYW5ndWxhci5lbGVtZW50KFxuICAgICc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVBemltdXRDb250aW51ZU1zZ1wiPjwvc3Bhbj4nXG4gICk7XG4gIG1lYXN1cmVBemltdXRDb250aW51ZU1zZyA9ICRjb21waWxlKG1lYXN1cmVBemltdXRDb250aW51ZU1zZykoJHNjb3BlKTtcblxuICAvLyBXYXRjaCB0aGUgXCJsYW5nXCIgcHJvcGVydHkgYW5kIHVwZGF0ZSB0aGUgdG9vbGlwIG1lc3NhZ2VzXG4gIC8vIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBsYW5ndWFnZS5cbiAgJHNjb3BlLiR3YXRjaChcbiAgICAoKSA9PiB0aGlzLmxhbmcsXG4gICAgKG5ld1ZhbCkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5tZWFzdXJlU3RhcnRNc2cgPSBtZWFzdXJlU3RhcnRNc2dzW25ld1ZhbF07XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLm1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZ3NbbmV3VmFsXTtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMubWVhc3VyZUFyZWFDb250aW51ZU1zZyA9IG1lYXN1cmVBcmVhQ29udGludWVNc2dzW25ld1ZhbF07XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLm1lYXN1cmVBemltdXRDb250aW51ZU1zZyA9IG1lYXN1cmVBemltdXRDb250aW51ZU1zZ3NbbmV3VmFsXTtcbiAgICB9XG4gICk7XG5cbiAgY29uc3Qgc3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICAgIH0pLFxuICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgbGluZURhc2g6IFsxMCwgMTBdLFxuICAgICAgd2lkdGg6IDIsXG4gICAgfSksXG4gICAgaW1hZ2U6IG5ldyBvbFN0eWxlQ2lyY2xlKHtcbiAgICAgIHJhZGl1czogNSxcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43KScsXG4gICAgICB9KSxcbiAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyxcbiAgICAgIH0pLFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm5nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUxlbmd0aC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tZWFzdXJlTGVuZ3RoID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGgoJGZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgZ2V0dGV4dENhdGFsb2csIHtcbiAgICBza2V0Y2hTdHlsZTogc3R5bGUsXG4gICAgc3RhcnRNc2c6IG1lYXN1cmVTdGFydE1zZ1swXSxcbiAgICBjb250aW51ZU1zZzogbWVhc3VyZUxlbmd0aENvbnRpbnVlTXNnWzBdLFxuICB9KTtcblxuICB0aGlzLm1lYXN1cmVMZW5ndGguc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZUxlbmd0aCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJuZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhLmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBcmVhID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhKCRmaWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIGdldHRleHRDYXRhbG9nLCB7XG4gICAgc2tldGNoU3R5bGU6IHN0eWxlLFxuICAgIHN0YXJ0TXNnOiBtZWFzdXJlU3RhcnRNc2dbMF0sXG4gICAgY29udGludWVNc2c6IG1lYXN1cmVBcmVhQ29udGludWVNc2dbMF0sXG4gIH0pO1xuXG4gIHRoaXMubWVhc3VyZUFyZWEuc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZUFyZWEpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwibmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXppbXV0LmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBemltdXQgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUF6aW11dCgkZmlsdGVyKCduZ2VvVW5pdFByZWZpeCcpLCAkZmlsdGVyKCduZ2VvTnVtYmVyJyksIHtcbiAgICBza2V0Y2hTdHlsZTogc3R5bGUsXG4gICAgc3RhcnRNc2c6IG1lYXN1cmVTdGFydE1zZ1swXSxcbiAgICBjb250aW51ZU1zZzogbWVhc3VyZUF6aW11dENvbnRpbnVlTXNnWzBdLFxuICB9KTtcblxuICB0aGlzLm1lYXN1cmVBemltdXQuc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZUF6aW11dCk7XG5cbiAgLy8gdGhlIGZvbGxvd2luZyBjb2RlIHNob3dzIGhvdyBvbmUgY2FuIGFkZCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHRvIHRoZVxuICAvLyB0b29sdGlwLiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gZGlzcGxheSB0aGUgZWxldmF0aW9uIG9mZnNldCBmcm9tIHRoZVxuICAvLyAyIHBvaW50cyBvZiBhbiBhemltdXQgbWVhc3VyZW1lbnQuXG4gIHRoaXMubWVhc3VyZUF6aW11dC5vbihcbiAgICAnbWVhc3VyZWVuZCcsXG4gICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi8gKFxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvTWFwQnJvd3NlckV2ZW50LmpzJykuZGVmYXVsdDx1bmtub3duPn0gZXZ0XG4gICAgICAgKi8gKGV2dCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2dC50YXJnZXQuZ2V0VG9vbHRpcEVsZW1lbnQoKTtcbiAgICAgICAgZWwuaW5uZXJIVE1MICs9ICc8YnI+QWRkaXRpb25hbCBpbmZvJztcbiAgICAgIH1cbiAgICApXG4gICk7XG59XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcE1lYXN1cmV0b29sc0NvbnRyb2xsZXInLCBNZWFzdXJldG9vbHNDb250cm9sbGVyKTtcblxuTWVhc3VyZXRvb2xzQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1lYXN1cmVMZW5ndGgpO1xuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1lYXN1cmVBcmVhKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlQXppbXV0KTtcbn07XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5sYW5nID0gJ2VuJztcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm9sL01hcC5qc1wiKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFs2OTIxMTQuNzE4NzU5NzQ0LCA1NzQzMTE5LjkxNDM0NzcwOV0sXG4gICAgICB6b29tOiAxNSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgdGhpcy5tYXAuYWRkQ29udHJvbChcbiAgICBuZXcgb2xDb250cm9sU2NhbGVMaW5lKHtcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNsZW5ndGgtdW5pdHNcbiAgICAgIGRwaTogOTYsXG4gICAgfSlcbiAgKTtcbn1cblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBuZ2VvLWJ0bi1ncm91cCBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgPGJ1dHRvbiBuZ2VvLWJ0biBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIG5nLW1vZGVsPVwiJGN0cmwubWVhc3VyZUxlbmd0aC5hY3RpdmVcIj5MZW5ndGg8L2J1dHRvbj5cXG4gIDxidXR0b24gbmdlby1idG4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBuZy1tb2RlbD1cIiRjdHJsLm1lYXN1cmVBcmVhLmFjdGl2ZVwiPkFyZWE8L2J1dHRvbj5cXG4gIDxidXR0b24gbmdlby1idG4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBuZy1tb2RlbD1cIiRjdHJsLm1lYXN1cmVBemltdXQuYWN0aXZlXCI+QXppbXV0PC9idXR0b24+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=