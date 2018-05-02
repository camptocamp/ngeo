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
/******/ 	deferredModules.push([24,"commons"]);
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
MeasuretoolsController.$inject = ["$scope", "$compile", "$sce", "$filter", "gettextCatalog"];



















var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, 'ngSanitize']);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('partials/measuretools', __webpack_require__(/*! ./partials/measuretools.html */ "./examples/partials/measuretools.html"));
}]);
var measuretoolsComponent = {
  bindings: {
    'map': '=appMeasuretoolsMap',
    'lang': '=appMeasuretoolsLang'
  },
  controller: 'AppMeasuretoolsController',
  templateUrl: 'partials/measuretools'
};
module.component('appMeasuretools', measuretoolsComponent);

function MeasuretoolsController($scope, $compile, $sce, $filter, gettextCatalog) {
  var _this = this;

  this.map = null;
  this.lang = '';
  this.measureStartMsg = {};
  this.measureLengthContinueMsg = {};
  this.measureAreaContinueMsg = {};
  this.measureAzimutContinueMsg = {};
  var measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.')
  };
  var measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur dernier point pour finir.')
  };
  var measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click starting point to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur point de départ pour finir.')
  };
  var measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.')
  };
  var measureStartMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  var measureLengthContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>');
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  var measureAreaContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  var measureAzimutContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element('<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>');
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);
  $scope.$watch(function () {
    return _this.lang;
  }, function (newVal) {
    _this.measureStartMsg = measureStartMsgs[newVal];
    _this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];
    _this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];
    _this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];
  });
  var style = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    }),
    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      radius: 5,
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
        color: 'rgba(0, 0, 0, 0.7)'
      }),
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
        color: 'rgba(255, 255, 255, 0.2)'
      })
    })
  });
  this.measureLength = new ngeo_interaction_MeasureLength_js__WEBPACK_IMPORTED_MODULE_4__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0]
  });
  this.measureLength.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureLength);
  this.measureArea = new ngeo_interaction_MeasureArea_js__WEBPACK_IMPORTED_MODULE_2__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0]
  });
  this.measureArea.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureArea);
  this.measureAzimut = new ngeo_interaction_MeasureAzimut_js__WEBPACK_IMPORTED_MODULE_3__["default"]($filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAzimutContinueMsg[0]
  });
  this.measureAzimut.setActive(false);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_7__["interactionDecoration"])(this.measureAzimut);
  this.measureAzimut.on('measureend', function (evt) {
    var el = evt.target.getTooltipElement();
    el.innerHTML += '<br>Additional info';
  });
}

module.controller('AppMeasuretoolsController', MeasuretoolsController);

MeasuretoolsController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }

  this.map.addInteraction(this.measureLength);
  this.map.addInteraction(this.measureArea);
  this.map.addInteraction(this.measureAzimut);
};

function MainController() {
  this.lang = 'en';
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_13__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
      center: [692114.718759744, 5743119.914347709],
      zoom: 15
    })
  });
  this.map.addControl(new ol_control_ScaleLine_js__WEBPACK_IMPORTED_MODULE_11__["default"]());
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

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
/*! exports provided: Units, render, default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(561);

/***/ }),

/***/ 24:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9tZWFzdXJlLmpzIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3BhcnRpYWxzL21lYXN1cmV0b29scy5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzI0LFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1lYXN1cmV0b29sc0NvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRjb21waWxlXCIsIFwiJHNjZVwiLCBcIiRmaWx0ZXJcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiXTtcbmltcG9ydCAnLi9tZWFzdXJlLmNzcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhLmpzJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXppbXV0IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUF6aW11dC5qcyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aCBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGguanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWlzY0J0bkNvbXBvbmVudCBmcm9tICduZ2VvL21pc2MvYnRuQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IGludGVyYWN0aW9uRGVjb3JhdGlvbiB9IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00uanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsLmpzJztcbmltcG9ydCAnYW5ndWxhci1zYW5pdGl6ZSc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSwgbmdlb01pc2NGaWx0ZXJzLm5hbWUsICduZ1Nhbml0aXplJ10pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9tZWFzdXJldG9vbHMnLCByZXF1aXJlKCcuL3BhcnRpYWxzL21lYXN1cmV0b29scy5odG1sJykpO1xufV0pO1xudmFyIG1lYXN1cmV0b29sc0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBNZWFzdXJldG9vbHNNYXAnLFxuICAgICdsYW5nJzogJz1hcHBNZWFzdXJldG9vbHNMYW5nJ1xuICB9LFxuICBjb250cm9sbGVyOiAnQXBwTWVhc3VyZXRvb2xzQ29udHJvbGxlcicsXG4gIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbWVhc3VyZXRvb2xzJ1xufTtcbm1vZHVsZS5jb21wb25lbnQoJ2FwcE1lYXN1cmV0b29scycsIG1lYXN1cmV0b29sc0NvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIE1lYXN1cmV0b29sc0NvbnRyb2xsZXIoJHNjb3BlLCAkY29tcGlsZSwgJHNjZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLm1hcCA9IG51bGw7XG4gIHRoaXMubGFuZyA9ICcnO1xuICB0aGlzLm1lYXN1cmVTdGFydE1zZyA9IHt9O1xuICB0aGlzLm1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IHt9O1xuICB0aGlzLm1lYXN1cmVBcmVhQ29udGludWVNc2cgPSB7fTtcbiAgdGhpcy5tZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSB7fTtcbiAgdmFyIG1lYXN1cmVTdGFydE1zZ3MgPSB7XG4gICAgJ2VuJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpY2sgdG8gc3RhcnQgZHJhd2luZy4nKSxcbiAgICAnZnInOiAkc2NlLnRydXN0QXNIdG1sKCdDbGlxdWVyIHBvdXIgY29tbWVuY2VyIMOgIGRlc3NpbmVyLicpXG4gIH07XG4gIHZhciBtZWFzdXJlTGVuZ3RoQ29udGludWVNc2dzID0ge1xuICAgICdlbic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaWNrIHRvIGNvbnRpbnVlIGRyYXdpbmc8YnI+JyArICdEb3VibGUtY2xpY2sgb3IgY2xpY2sgbGFzdCBwb2ludCB0byBmaW5pc2guJyksXG4gICAgJ2ZyJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpcXVlciBwb3VyIGNvbnRpbnVlciBsZSBkZXNzaW48YnI+JyArICdEb3VibGUtY2xpcXVlciBvdSBjbGlxdWVyIHN1ciBkZXJuaWVyIHBvaW50IHBvdXIgZmluaXIuJylcbiAgfTtcbiAgdmFyIG1lYXN1cmVBcmVhQ29udGludWVNc2dzID0ge1xuICAgICdlbic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaWNrIHRvIGNvbnRpbnVlIGRyYXdpbmc8YnI+JyArICdEb3VibGUtY2xpY2sgb3IgY2xpY2sgc3RhcnRpbmcgcG9pbnQgdG8gZmluaXNoLicpLFxuICAgICdmcic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaXF1ZXIgcG91ciBjb250aW51ZXIgbGUgZGVzc2luPGJyPicgKyAnRG91YmxlLWNsaXF1ZXIgb3UgY2xpcXVlciBzdXIgcG9pbnQgZGUgZMOpcGFydCBwb3VyIGZpbmlyLicpXG4gIH07XG4gIHZhciBtZWFzdXJlQXppbXV0Q29udGludWVNc2dzID0ge1xuICAgICdlbic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaWNrIHRvIGZpbmlzaC4nKSxcbiAgICAnZnInOiAkc2NlLnRydXN0QXNIdG1sKCdDbGlxdWVyIHBvdXIgZmluaXIuJylcbiAgfTtcbiAgdmFyIG1lYXN1cmVTdGFydE1zZyA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4gbmctYmluZC1odG1sPVwiY3RybC5tZWFzdXJlU3RhcnRNc2dcIj48L3NwYW4+Jyk7XG4gIG1lYXN1cmVTdGFydE1zZyA9ICRjb21waWxlKG1lYXN1cmVTdGFydE1zZykoJHNjb3BlKTtcbiAgdmFyIG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4gbmctYmluZC1odG1sPVwiY3RybC5tZWFzdXJlTGVuZ3RoQ29udGludWVNc2dcIj48L3NwYW4+Jyk7XG4gIG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9ICRjb21waWxlKG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZykoJHNjb3BlKTtcbiAgdmFyIG1lYXN1cmVBcmVhQ29udGludWVNc2cgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuIG5nLWJpbmQtaHRtbD1cImN0cmwubWVhc3VyZUFyZWFDb250aW51ZU1zZ1wiPjwvc3Bhbj4nKTtcbiAgbWVhc3VyZUFyZWFDb250aW51ZU1zZyA9ICRjb21waWxlKG1lYXN1cmVBcmVhQ29udGludWVNc2cpKCRzY29wZSk7XG4gIHZhciBtZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuIG5nLWJpbmQtaHRtbD1cImN0cmwubWVhc3VyZUF6aW11dENvbnRpbnVlTXNnXCI+PC9zcGFuPicpO1xuICBtZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlQXppbXV0Q29udGludWVNc2cpKCRzY29wZSk7XG4gICRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5sYW5nO1xuICB9LCBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgX3RoaXMubWVhc3VyZVN0YXJ0TXNnID0gbWVhc3VyZVN0YXJ0TXNnc1tuZXdWYWxdO1xuICAgIF90aGlzLm1lYXN1cmVMZW5ndGhDb250aW51ZU1zZyA9IG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZ3NbbmV3VmFsXTtcbiAgICBfdGhpcy5tZWFzdXJlQXJlYUNvbnRpbnVlTXNnID0gbWVhc3VyZUFyZWFDb250aW51ZU1zZ3NbbmV3VmFsXTtcbiAgICBfdGhpcy5tZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSBtZWFzdXJlQXppbXV0Q29udGludWVNc2dzW25ld1ZhbF07XG4gIH0pO1xuICB2YXIgc3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknXG4gICAgfSksXG4gICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBsaW5lRGFzaDogWzEwLCAxMF0sXG4gICAgICB3aWR0aDogMlxuICAgIH0pLFxuICAgIGltYWdlOiBuZXcgb2xTdHlsZUNpcmNsZSh7XG4gICAgICByYWRpdXM6IDUsXG4gICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNyknXG4gICAgICB9KSxcbiAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJ1xuICAgICAgfSlcbiAgICB9KVxuICB9KTtcbiAgdGhpcy5tZWFzdXJlTGVuZ3RoID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGgoJGZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgZ2V0dGV4dENhdGFsb2csIHtcbiAgICBza2V0Y2hTdHlsZTogc3R5bGUsXG4gICAgc3RhcnRNc2c6IG1lYXN1cmVTdGFydE1zZ1swXSxcbiAgICBjb250aW51ZU1zZzogbWVhc3VyZUxlbmd0aENvbnRpbnVlTXNnWzBdXG4gIH0pO1xuICB0aGlzLm1lYXN1cmVMZW5ndGguc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZUxlbmd0aCk7XG4gIHRoaXMubWVhc3VyZUFyZWEgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWEoJGZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgZ2V0dGV4dENhdGFsb2csIHtcbiAgICBza2V0Y2hTdHlsZTogc3R5bGUsXG4gICAgc3RhcnRNc2c6IG1lYXN1cmVTdGFydE1zZ1swXSxcbiAgICBjb250aW51ZU1zZzogbWVhc3VyZUFyZWFDb250aW51ZU1zZ1swXVxuICB9KTtcbiAgdGhpcy5tZWFzdXJlQXJlYS5zZXRBY3RpdmUoZmFsc2UpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlQXJlYSk7XG4gIHRoaXMubWVhc3VyZUF6aW11dCA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXppbXV0KCRmaWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksICRmaWx0ZXIoJ25nZW9OdW1iZXInKSwge1xuICAgIHNrZXRjaFN0eWxlOiBzdHlsZSxcbiAgICBzdGFydE1zZzogbWVhc3VyZVN0YXJ0TXNnWzBdLFxuICAgIGNvbnRpbnVlTXNnOiBtZWFzdXJlQXppbXV0Q29udGludWVNc2dbMF1cbiAgfSk7XG4gIHRoaXMubWVhc3VyZUF6aW11dC5zZXRBY3RpdmUoZmFsc2UpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlQXppbXV0KTtcbiAgdGhpcy5tZWFzdXJlQXppbXV0Lm9uKCdtZWFzdXJlZW5kJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciBlbCA9IGV2dC50YXJnZXQuZ2V0VG9vbHRpcEVsZW1lbnQoKTtcbiAgICBlbC5pbm5lckhUTUwgKz0gJzxicj5BZGRpdGlvbmFsIGluZm8nO1xuICB9KTtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ0FwcE1lYXN1cmV0b29sc0NvbnRyb2xsZXInLCBNZWFzdXJldG9vbHNDb250cm9sbGVyKTtcblxuTWVhc3VyZXRvb2xzQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZUxlbmd0aCk7XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZUFyZWEpO1xuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1lYXN1cmVBemltdXQpO1xufTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIHRoaXMubGFuZyA9ICdlbic7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzY5MjExNC43MTg3NTk3NDQsIDU3NDMxMTkuOTE0MzQ3NzA5XSxcbiAgICAgIHpvb206IDE1XG4gICAgfSlcbiAgfSk7XG4gIHRoaXMubWFwLmFkZENvbnRyb2wobmV3IG9sQ29udHJvbFNjYWxlTGluZSgpKTtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgbmdlby1idG4tZ3JvdXAgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gIDxidXR0b24gbmdlby1idG4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBuZy1tb2RlbD1cIiRjdHJsLm1lYXN1cmVMZW5ndGguYWN0aXZlXCI+TGVuZ3RoPC9idXR0b24+XFxuICA8YnV0dG9uIG5nZW8tYnRuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgbmctbW9kZWw9XCIkY3RybC5tZWFzdXJlQXJlYS5hY3RpdmVcIj5BcmVhPC9idXR0b24+XFxuICA8YnV0dG9uIG5nZW8tYnRuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgbmctbW9kZWw9XCIkY3RybC5tZWFzdXJlQXppbXV0LmFjdGl2ZVwiPkF6aW11dDwvYnV0dG9uPlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9