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
/******/ 		"routing": 0
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
/******/ 	deferredModules.push([37,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/routing.css":
/*!******************************!*\
  !*** ./examples/routing.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/routing.js":
/*!*****************************!*\
  !*** ./examples/routing.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _routing_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routing.css */ "./examples/routing.css");
/* harmony import */ var _routing_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_routing_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/ol.css */ "./node_modules/ol/ol.css");
/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_ol_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/fontawesome.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css");
/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/routing/module */ "./src/routing/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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

/**
 * This example shows the ngeo routing directive.
 */














/** @type {angular.IModule} **/
const myModule = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module('app', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_routing_module__WEBPACK_IMPORTED_MODULE_7__["default"].name]);

/**
 * The application's main directive.
 *
 * @class
 * @ngInject
 */
function MainController() {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_11__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_9__["default"]({
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9,
    }),
  });

  /**
   * @type {boolean}
   */
  this.routingPanelActive = true;
}

myModule.controller('MainController', MainController);
myModule.constant('ngeoRoutingOptions', {});
myModule.constant('ngeoNominatimUrl', 'https://nominatim.openstreetmap.org/');
myModule.constant('ngeoNominatimSearchDefaultParams', {});
Object(_options__WEBPACK_IMPORTED_MODULE_6__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ "./src/routing/NominatimInputComponent.js":
/*!************************************************!*\
  !*** ./src/routing/NominatimInputComponent.js ***!
  \************************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_search_searchDirective__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/search/searchDirective */ "./src/search/searchDirective.js");
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
Controller.$inject = ["$element", "$scope", "ngeoNominatimService"];



const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingNominatimInputComponent', [ngeo_search_searchDirective__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
myModule.run(["$templateCache", $templateCache => {
  $templateCache.put('ngeo/routing/nominatiminput', __webpack_require__(/*! ./nominatiminput.html */ "./src/routing/nominatiminput.html"));
}]);
myModule.value('ngeoRoutingNominatimInputComponentTemplateUrl', $attrs => {
  const templateUrl = $attrs.ngeoRoutingNominatimInputComponentTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/nominatiminput';
});
ngeoRoutingNominatimInputComponentTemplateUrl.$inject = ["$attrs", "ngeoRoutingNominatimInputComponentTemplateUrl"];
function ngeoRoutingNominatimInputComponentTemplateUrl($attrs, ngeoRoutingNominatimInputComponentTemplateUrl) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}
function Controller($element, $scope, ngeoNominatimService) {
  this.element_ = $element;
  this.$scope_ = $scope;
  this.ngeoNominatimService = ngeoNominatimService;
  this.onSelect = null;
  this.inputValue = null;
  this.options = {};
  this.datasets = [{
    name: 'nominatim',
    display: 'name',
    source: this.ngeoNominatimService.typeaheadSourceDebounced
  }];
  this.listeners = {
    select: this.select_.bind(this)
  };
  this.placeholder = '';
}
Controller.prototype.select_ = function (event, suggestion, dataset) {
  if (this.onSelect) {
    this.onSelect(suggestion);
  }
};
const routingNominatimInputComponent = {
  controller: Controller,
  bindings: {
    'onSelect': '=?ngeoNominatimInputOnSelect',
    'inputValue': '=?ngeoNominatimInputValue',
    'placeholder': '@?ngeoNominatimInputPlaceholder'
  },
  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl
};
myModule.component('ngeoNominatimInput', routingNominatimInputComponent);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/routing/NominatimService.js":
/*!*****************************************!*\
  !*** ./src/routing/NominatimService.js ***!
  \*****************************************/
/*! exports provided: NominatimService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NominatimService", function() { return NominatimService; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
NominatimService.$inject = ["$http", "ngeoDebounce", "ngeoNominatimUrl", "ngeoNominatimSearchDefaultParams"];


function NominatimService($http, ngeoDebounce, ngeoNominatimUrl, ngeoNominatimSearchDefaultParams) {
  this.$http_ = $http;
  this.ngeoDebounce_ = ngeoDebounce;
  this.nominatimUrl_ = ngeoNominatimUrl;
  if (this.nominatimUrl_.substr(-1) !== '/') {
    this.nominatimUrl_ += '/';
  }
  this.searchDefaultParams_ = ngeoNominatimSearchDefaultParams;
  this.typeaheadDebounceDelay_ = 500;
  this.typeaheadSourceDebounced = this.ngeoDebounce_(this.typeaheadSource_.bind(this), this.typeaheadDebounceDelay_, true);
}
NominatimService.prototype.search = function (query, params) {
  let url = this.nominatimUrl_ + "search?q=" + query;
  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);
  params.format = 'json';
  if (params) {
    url += '&';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(option + "=" + params[option]);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};
NominatimService.prototype.reverse = function (coordinate, params) {
  let url = this.nominatimUrl_ + "reverse";
  params = Object.assign({}, params);
  params.lon = "" + coordinate[0];
  params.lat = "" + coordinate[1];
  params.format = 'json';
  if (params) {
    url += '?';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(option + "=" + params[option]);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};
NominatimService.prototype.typeaheadSource_ = function (query, syncResults, asyncResults) {
  const onSuccess_ = function (resp) {
    const parse = function (result) {
      return {
        coordinate: [result.lon, result.lat],
        name: result.display_name
      };
    };
    if (asyncResults) {
      asyncResults(resp.data.map(parse));
    } else {
      syncResults(resp.data.map(parse));
    }
  };
  const onError_ = function (resp) {
    if (asyncResults) {
      asyncResults([]);
    } else {
      syncResults([]);
    }
  };
  this.search(query, {}).then(onSuccess_, onError_);
};
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoNominatimService', [ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.service('ngeoNominatimService', NominatimService);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/routing/RoutingComponent.js":
/*!*****************************************!*\
  !*** ./src/routing/RoutingComponent.js ***!
  \*****************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_RoutingService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/RoutingService */ "./src/routing/RoutingService.js");
/* harmony import */ var ngeo_routing_RoutingFeatureComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/routing/RoutingFeatureComponent */ "./src/routing/RoutingFeatureComponent.js");
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/GeoJSON */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16__);

















const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingComponent', [ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_routing_RoutingService__WEBPACK_IMPORTED_MODULE_4__["default"].name, ngeo_routing_RoutingFeatureComponent__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
myModule.run(["$templateCache", $templateCache => {
  $templateCache.put('ngeo/routing/routing', __webpack_require__(/*! ./routing.html */ "./src/routing/routing.html"));
}]);
myModule.value('ngeoRoutingTemplateUrl', $attrs => {
  const templateUrl = $attrs.ngeoRoutingTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
});
ngeoRoutingTemplateUrl.$inject = ["$attrs", "ngeoRoutingTemplateUrl"];
function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}
class Controller {
  constructor($scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce, ngeoRoutingOptions) {
    this.$scope_ = $scope;
    this.ngeoRoutingService_ = ngeoRoutingService;
    this.ngeoNominatimService_ = ngeoNominatimService;
    this.routingOptions_ = ngeoRoutingOptions;
    this.routingProfiles = this.routingOptions_.profiles || [];
    this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;
    $scope.$watch(() => this.selectedRoutingProfile, this.calculateRoute.bind(this));
    this.$q_ = $q;
    this.map = null;
    this.errorMessage = '';
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.colors = {
      startFill: '#6BE62E',
      startStroke: '#4CB01E',
      destinationFill: '#FF3E13',
      destinationStroke: '#CD3412',
      viaFill: '#767676',
      viaStroke: '#000000',
      lineRGBA: 'rgba(16, 112, 29, 0.6)'
    };
    this.routeSource_ = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_8__["default"]({
      features: []
    });
    this.routeLayer_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_9__["default"]({
      className: 'canvas2d',
      source: this.routeSource_,
      style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_10__["default"]({
        fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
          color: this.colors.lineRGBA
        }),
        stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_12__["default"]({
          color: this.colors.lineRGBA,
          width: 5
        })
      })
    });
    this.routeDistance = 0;
    this.routeDuration = null;
    this.regexIsFormattedCoord = /\d+\.\d+\/\d+\.\d+/;
    this.draw_ = null;
    const debounceDelay = 200;
    this.handleChange = ngeoDebounce(this.calculateRoute.bind(this), debounceDelay, true);
  }
  $onInit() {
    if (this.map) {
      this.map.addLayer(this.routeLayer_);
    }
  }
  clearRoute() {
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.routeDistance = 0;
    this.routeDuration = null;
    this.routeSource_.clear();
    this.errorMessage = '';
  }
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    if (!(geometry instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_7__["default"])) {
      throw new Error('Wrong time values type');
    }
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return Object(ol_proj__WEBPACK_IMPORTED_MODULE_13__["toLonLat"])(coords, projection);
  }
  reverseRoute() {
    const tmpFeature = this.startFeature_;
    this.startFeature_ = this.targetFeature_;
    this.targetFeature_ = tmpFeature;
    this.viaArray = this.viaArray.reverse();
  }
  parseRoute_(route) {
    if (!this.map) {
      return [];
    }
    let parsedRoutes = [];
    const format = new ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_6__["default"]();
    const formatConfig = {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.getView().getProjection()
    };
    if (route.legs) {
      const parsedRoutes_ = route.legs.map(leg => leg.steps.map(step => new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"]({
        geometry: format.readGeometry(step.geometry, formatConfig)
      })));
      parsedRoutes = [].concat(...parsedRoutes_);
    } else if (route.geometry) {
      parsedRoutes.push(new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"]({
        geometry: format.readGeometry(route.geometry, formatConfig)
      }));
    }
    return parsedRoutes;
  }
  calculateRoute() {
    if (!this.startFeature_ || !this.targetFeature_) {
      return;
    }
    this.routeSource_.clear();
    const coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    const coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    const vias = this.viaArray.filter(via => via.feature !== null).map(via => this.getLonLatFromPoint_(via.feature));
    const route = [coordFrom].concat(vias, [coordTo]);
    const onSuccess_ = resp => {
      if (!this.map || !this.startFeature_ || !this.targetFeature_) {
        return;
      }
      const features = this.parseRoute_(resp.data.routes[0]);
      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }
      this.routeSource_.addFeatures(features);
      this.map.getView().fit(this.routeSource_.getExtent());
      this.routeDistance = resp.data.routes[0].distance;
      this.routeDuration = resp.data.routes[0].duration;
      const startRoute = features[0].getGeometry().getCoordinateAt(0);
      const endRoute = features[features.length - 1].getGeometry().getCoordinateAt(1);
      const startToRoute = [this.startFeature_.getGeometry().getCoordinates(), startRoute];
      const routeToEnd = [endRoute, this.targetFeature_.getGeometry().getCoordinates()];
      const routeConnections = [new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__["default"](startToRoute)), new ol_Feature__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_15__["default"](routeToEnd))];
      this.routeSource_.addFeatures(routeConnections);
    };
    const onError_ = resp => {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    };
    const options = {};
    options.steps = true;
    options.overview = false;
    options.geometries = 'geojson';
    const config = {};
    config.options = options;
    if (this.selectedRoutingProfile) {
      config.instance = this.selectedRoutingProfile.profile;
    }
    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_, onError_);
  }
  addVia() {
    this.viaArray.push({});
  }
  deleteVia(index) {
    if (this.viaArray.length > index) {
      this.viaArray.splice(index, 1);
      this.calculateRoute();
    }
  }
}
Controller.$inject = ["$scope", "ngeoRoutingService", "ngeoNominatimService", "$q", "ngeoDebounce", "ngeoRoutingOptions"];
myModule.component('ngeoRouting', {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingMap'
  },
  templateUrl: ngeoRoutingTemplateUrl
});
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/routing/RoutingFeatureComponent.js":
/*!************************************************!*\
  !*** ./src/routing/RoutingFeatureComponent.js ***!
  \************************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/NominatimService */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_NominatimInputComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimInputComponent */ "./src/routing/NominatimInputComponent.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Text */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_interaction_Modify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/interaction/Modify */ "./node_modules/ol/interaction/Modify.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__);
















const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingFeatureComponent', [ngeo_routing_NominatimService__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimInputComponent__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
myModule.run(["$templateCache", $templateCache => {
  $templateCache.put('ngeo/routing/routingfeature', __webpack_require__(/*! ./routingfeature.html */ "./src/routing/routingfeature.html"));
}]);
myModule.value('ngeoRoutingFeatureTemplateUrl', $attrs => {
  const templateUrl = $attrs.ngeoRoutingFeatureTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';
});
ngeoRoutingFeatureTemplateUrl.$inject = ["$attrs", "ngeoRoutingFeatureTemplateUrl"];
function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}
class Controller {
  constructor($scope, $timeout, $q, ngeoNominatimService) {
    this.scope_ = $scope;
    this.timeout_ = $timeout;
    this.$q_ = $q;
    this.ngeoNominatimService_ = ngeoNominatimService;
    this.map = null;
    this.feature = null;
    this.featureLabel = '';
    this.fillColor = '';
    this.strokeColor = '';
    this.onChange = null;
    this.vectorFeatures_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.vectorSource_ = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__["default"]({
      features: this.vectorFeatures_
    });
    this.vectorLayer_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__["default"]({
      className: 'canvas2d',
      source: this.vectorSource_,
      style: (feature, resolution) => {
        return [new ol_style_Style__WEBPACK_IMPORTED_MODULE_8__["default"]({
          text: new ol_style_Text__WEBPACK_IMPORTED_MODULE_9__["default"]({
            fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_10__["default"]({
              color: this.fillColor || '#000000'
            }),
            font: '900 24px "Font Awesome 5 Free"',
            stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_11__["default"]({
              width: 3,
              color: this.strokeColor || '#000000'
            }),
            offsetY: -15,
            text: '\uf041'
          })
        })];
      }
    });
    this.modifyFeature_ = new ol_interaction_Modify__WEBPACK_IMPORTED_MODULE_13__["default"]({
      features: this.vectorFeatures_
    });
    this.draw_ = null;
    this.onSelect = this.onSelect_.bind(this);
    this.errorMessage = '';
  }
  $onInit() {
    if (!this.map) {
      return;
    }
    this.map.addLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(true);
    this.map.addInteraction(this.modifyFeature_);
    this.modifyFeature_.on('modifyend', event => {
      const feature = event.features.getArray()[0];
      this.vectorSource_.clear();
      this.snapFeature_(feature);
    });
    this.scope_.$watch(() => this.feature, (newVal, oldVal) => {
      if (newVal) {
        this.onFeatureChange_();
      }
      if (newVal === null) {
        this.vectorSource_.clear();
        this.featureLabel = '';
      }
    });
  }
  $onDestroy() {
    if (!this.map) {
      return;
    }
    this.map.removeLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(false);
    this.map.removeInteraction(this.modifyFeature_);
  }
  set() {
    if (!this.map) {
      return;
    }
    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }
    this.draw_ = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_14__["default"]({
      features: this.vectorFeatures_,
      type: 'Point'
    });
    this.draw_.on('drawstart', () => {
      if (this.feature) {
        this.vectorSource_.removeFeature(this.feature);
      }
    });
    this.draw_.on('drawend', event => {
      if (this.draw_ && this.map) {
        this.map.removeInteraction(this.draw_);
      }
      this.snapFeature_(event.feature);
      this.modifyFeature_.setActive(true);
    });
    this.modifyFeature_.setActive(false);
    this.map.addInteraction(this.draw_);
  }
  setFeature_(coordinate, label) {
    if (!this.map) {
      return;
    }
    const transformedCoordinate = ol_proj__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"](coordinate, this.map.getView().getProjection());
    if (label === '') {
      label = transformedCoordinate.join('/');
    }
    this.feature = new ol_Feature__WEBPACK_IMPORTED_MODULE_4__["default"]({
      geometry: new ol_geom_Point__WEBPACK_IMPORTED_MODULE_12__["default"](transformedCoordinate),
      name: label
    });
  }
  onFeatureChange_() {
    if (!this.feature) {
      return;
    }
    this.featureLabel = this.feature.get('name') || '';
    this.vectorSource_.clear();
    this.vectorSource_.addFeature(this.feature);
    if (this.onChange) {
      this.timeout_(() => {
        if (this.feature && this.onChange) {
          this.onChange(this.feature);
        }
      });
    }
  }
  onSelect_(selected) {
    const coordinate = selected.coordinate.map(parseFloat);
    const label = selected.label;
    this.setFeature_(coordinate, label);
    const newCoordinates = this.feature.getGeometry().getCoordinates();
    this.map.getView().setCenter(newCoordinates);
  }
  snapFeature_(feature) {
    const coord = this.getLonLatFromPoint_(feature);
    if (!coord) {
      return;
    }
    const config = {};
    const onSuccess = resp => {
      const lon = parseFloat(resp.data.lon);
      const lat = parseFloat(resp.data.lat);
      const coordinate = [lon, lat];
      const label = resp.data.display_name;
      this.setFeature_(coordinate, label);
    };
    const onError = resp => {
      this.errorMessage = 'Error: nominatim server not responding.';
      console.log(resp);
    };
    this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess, onError);
  }
  getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }
    const geometry = point.getGeometry();
    const coords = geometry.getCoordinates();
    const projection = this.map.getView().getProjection();
    return ol_proj__WEBPACK_IMPORTED_MODULE_3__["toLonLat"](coords, projection);
  }
}
Controller.$inject = ["$scope", "$timeout", "$q", "ngeoNominatimService"];
const routingFeatureComponent = {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingFeatureMap',
    'feature': '=ngeoRoutingFeatureFeature',
    'fillColor': '<?ngeoRoutingFeatureFillColor',
    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',
    'onChange': '=?ngeoRoutingFeatureOnChange'
  },
  templateUrl: ngeoRoutingFeatureTemplateUrl
};
myModule.component('ngeoRoutingFeature', routingFeatureComponent);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/routing/RoutingService.js":
/*!***************************************!*\
  !*** ./src/routing/RoutingService.js ***!
  \***************************************/
/*! exports provided: RoutingService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutingService", function() { return RoutingService; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
RoutingService.$inject = ["$http", "ngeoRoutingOptions"];

function RoutingService($http, ngeoRoutingOptions) {
  this.$http_ = $http;
  this.routingOptions_ = ngeoRoutingOptions;
  this.ngeoOsrmBackendUrl_ = this.routingOptions_.backendUrl || 'https://router.project-osrm.org/';
  if (this.ngeoOsrmBackendUrl_.substr(-1) !== '/') {
    this.ngeoOsrmBackendUrl_ += '/';
  }
  this.protocolVersion_ = 'v1';
}
RoutingService.prototype.getRoute = function (coordinates, config) {
  config = config || {};
  if (!config.service) {
    config.service = 'route';
  }
  if (!config.profile) {
    config.profile = 'car';
  }
  let url = this.ngeoOsrmBackendUrl_;
  if (config.instance) {
    url += config.instance + "/";
  }
  url += config.service + "/" + this.protocolVersion_ + "/" + config.profile + "/";
  const coordinateString = coordinates.map(c => c.join(',')).join(';');
  url += coordinateString;
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(option + "=" + config.options[option]);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};
RoutingService.prototype.getNearest = function (coordinate, config) {
  config = config || {};
  config.service = 'nearest';
  if (!config.profile) {
    config.profile = 'car';
  }
  let url = this.ngeoOsrmBackendUrl_;
  if (config.instance) {
    url += config.instance + "/";
  }
  url += config.service + "/" + this.protocolVersion_ + "/" + config.profile + "/";
  const coordinateString = coordinate.join(',');
  url += coordinateString;
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(option + "=" + config.options[option]);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingService', []);
myModule.service('ngeoRoutingService', RoutingService);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/routing/module.js":
/*!*******************************!*\
  !*** ./src/routing/module.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_routing_RoutingComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/RoutingComponent */ "./src/routing/RoutingComponent.js");
/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing.scss */ "./src/routing/routing.scss");
/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_routing_scss__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingModule', [ngeo_routing_RoutingComponent__WEBPACK_IMPORTED_MODULE_1__["default"].name]));

/***/ }),

/***/ "./src/routing/nominatiminput.html":
/*!*****************************************!*\
  !*** ./src/routing/nominatiminput.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-nominatim-input">\n  <input\n    type="text"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.inputValue"\n    ngeo-search="$ctrl.options"\n    ngeo-search-datasets="$ctrl.datasets"\n    ngeo-search-listeners="$ctrl.listeners"\n  />\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/routing/routing.html":
/*!**********************************!*\
  !*** ./src/routing/routing.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-routing">\n  <div class="ngeo-routing-start form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.startFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors.startFill"\n      ngeo-routing-feature-stroke-color="$ctrl.colors.startStroke"\n      ngeo-routing-feature-on-change="$ctrl.handleChange"\n    >\n    </ngeo-routing-feature>\n  </div>\n\n  <div class="ngeo-routing-vias form-group" ng-repeat="(index, via) in $ctrl.viaArray">\n    <div class="form-inline">\n      <div class="form-group">\n        <ngeo-routing-feature\n          ngeo-routing-feature-map="$ctrl.map"\n          ngeo-routing-feature-feature="via.feature"\n          ngeo-routing-feature-fill-color="$ctrl.colors.viaFill"\n          ngeo-routing-feature-stroke-color="$ctrl.colors.viaStroke"\n          ngeo-routing-feature-on-change="$ctrl.handleChange"\n        >\n        </ngeo-routing-feature>\n      </div>\n      <button type="button" class="btn prime delete-via" ng-click="$ctrl.deleteVia(index)">\n        <span class="fa fa-trash"></span>\n      </button>\n    </div>\n  </div>\n\n  <div class="ngeo-routing-destination form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.targetFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors.destinationFill"\n      ngeo-routing-feature-stroke-color="$ctrl.colors.destinationStroke"\n      ngeo-routing-feature-on-change="$ctrl.handleChange"\n    >\n    </ngeo-routing-feature>\n  </div>\n\n  <div class="form-group fill">\n    <button type="button" class="btn prime" ng-click="$ctrl.clearRoute()">\n      <span class="fa fa-trash"></span> <span translate>Clear</span>\n    </button>\n    <button type="button" class="btn prime" ng-click="$ctrl.reverseRoute()">\n      <span class="fa fa-exchange-alt"></span> <span translate>Reverse</span>\n    </button>\n    <button type="button" class="btn prime" ng-click="$ctrl.addVia()">\n      <span class="fa fa-plus"></span> <span translate>Add via</span>\n    </button>\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-if="$ctrl.routingProfiles.length > 1">\n    <div class="form-group">\n      <label class="col-form-label col-md-4" translate>Profile</label>\n      <div class="col-md-8">\n        <select class="form-control" ng-model="$ctrl.selectedRoutingProfile">\n          <option ng-repeat="profile in $ctrl.routingProfiles" ng-value="profile">{{profile.label}}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n  <div class="ngeo-routing-error form-group clearfix" ng-hide="$ctrl.errorMessage === \'\'">\n    {{$ctrl.errorMessage}}\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-hide="$ctrl.routeDuration === null && $ctrl.routeDistance <= 0">\n    <div class="row">\n      <div class="col-md-12">\n        <strong translate>Route statistics</strong>\n      </div>\n    </div>\n    <div class="row" ng-hide="$ctrl.routeDuration === null">\n      <div class="col-md-4 text-right" translate>Duration</div>\n      <div class="col-md-8">{{$ctrl.routeDuration | ngeoDuration}}</div>\n    </div>\n\n    <div class="row" ng-hide="$ctrl.routeDistance <= 0">\n      <div class="col-md-4 text-right" translate>Distance</div>\n      <div class="col-md-8">{{$ctrl.routeDistance | ngeoUnitPrefix:\'m\'}}</div>\n    </div>\n  </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/routing/routing.scss":
/*!**********************************!*\
  !*** ./src/routing/routing.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/routing/routingfeature.html":
/*!*****************************************!*\
  !*** ./src/routing/routingfeature.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-routing-feature">\n  <div class="input-group">\n    <ngeo-nominatim-input\n      ngeo-nominatim-input-value="$ctrl.featureLabel"\n      ngeo-nominatim-input-placeholder="{{\'Search...\' | translate}}"\n      ngeo-nominatim-input-on-select="$ctrl.onSelect"\n    >\n    </ngeo-nominatim-input>\n    <div class="input-group-addon btn" ng-click="$ctrl.set()">\n      <span class="fa fa-map-marker"></span>\n    </div>\n  </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ 37:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/routing.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/routing.js */"./examples/routing.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9yb3V0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvbm9taW5hdGltaW5wdXQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9yb3V0aW5nLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicm91dGluZ1wiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMzcsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLyoqXG4gKiBUaGlzIGV4YW1wbGUgc2hvd3MgdGhlIG5nZW8gcm91dGluZyBkaXJlY3RpdmUuXG4gKi9cbmltcG9ydCAnLi9yb3V0aW5nLmNzcyc7XG5pbXBvcnQgJ29sL29sLmNzcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvUm91dGluZ01vZHVsZSBmcm9tICduZ2VvL3JvdXRpbmcvbW9kdWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBnbWZNYXBDb21wb25lbnQubmFtZSwgbmdlb1JvdXRpbmdNb2R1bGUubmFtZV0pO1xuXG4vKipcbiAqIFRoZSBhcHBsaWNhdGlvbidzIG1haW4gZGlyZWN0aXZlLlxuICpcbiAqIEBjbGFzc1xuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbOTMxMDEwLjE1MzU5ODk0NDIsIDU5NjE3MDUuODQyMjk3MjU0XSxcbiAgICAgIHpvb206IDksXG4gICAgfSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucm91dGluZ1BhbmVsQWN0aXZlID0gdHJ1ZTtcbn1cblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1JvdXRpbmdPcHRpb25zJywge30pO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Ob21pbmF0aW1VcmwnLCAnaHR0cHM6Ly9ub21pbmF0aW0ub3BlbnN0cmVldG1hcC5vcmcvJyk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMnLCB7fSk7XG5vcHRpb25zKG15TW9kdWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRzY29wZVwiLCBcIm5nZW9Ob21pbmF0aW1TZXJ2aWNlXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1NlYXJjaFNlYXJjaERpcmVjdGl2ZSBmcm9tICduZ2VvL3NlYXJjaC9zZWFyY2hEaXJlY3RpdmUnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZSBmcm9tICduZ2VvL3JvdXRpbmcvTm9taW5hdGltU2VydmljZSc7XG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50JywgW25nZW9TZWFyY2hTZWFyY2hEaXJlY3RpdmUubmFtZSwgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWVdKTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCAkdGVtcGxhdGVDYWNoZSA9PiB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL25vbWluYXRpbWlucHV0JywgcmVxdWlyZSgnLi9ub21pbmF0aW1pbnB1dC5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCcsICRhdHRycyA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICduZ2VvL3JvdXRpbmcvbm9taW5hdGltaW5wdXQnO1xufSk7XG5uZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRhdHRyc1wiLCBcIm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcigkZWxlbWVudCwgJHNjb3BlLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICB0aGlzLmVsZW1lbnRfID0gJGVsZW1lbnQ7XG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcbiAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZSA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuICB0aGlzLm9uU2VsZWN0ID0gbnVsbDtcbiAgdGhpcy5pbnB1dFZhbHVlID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0ge307XG4gIHRoaXMuZGF0YXNldHMgPSBbe1xuICAgIG5hbWU6ICdub21pbmF0aW0nLFxuICAgIGRpc3BsYXk6ICduYW1lJyxcbiAgICBzb3VyY2U6IHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2UudHlwZWFoZWFkU291cmNlRGVib3VuY2VkXG4gIH1dO1xuICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICBzZWxlY3Q6IHRoaXMuc2VsZWN0Xy5iaW5kKHRoaXMpXG4gIH07XG4gIHRoaXMucGxhY2Vob2xkZXIgPSAnJztcbn1cbkNvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdF8gPSBmdW5jdGlvbiAoZXZlbnQsIHN1Z2dlc3Rpb24sIGRhdGFzZXQpIHtcbiAgaWYgKHRoaXMub25TZWxlY3QpIHtcbiAgICB0aGlzLm9uU2VsZWN0KHN1Z2dlc3Rpb24pO1xuICB9XG59O1xuY29uc3Qgcm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdvblNlbGVjdCc6ICc9P25nZW9Ob21pbmF0aW1JbnB1dE9uU2VsZWN0JyxcbiAgICAnaW5wdXRWYWx1ZSc6ICc9P25nZW9Ob21pbmF0aW1JbnB1dFZhbHVlJyxcbiAgICAncGxhY2Vob2xkZXInOiAnQD9uZ2VvTm9taW5hdGltSW5wdXRQbGFjZWhvbGRlcidcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb05vbWluYXRpbUlucHV0Jywgcm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIk5vbWluYXRpbVNlcnZpY2UuJGluamVjdCA9IFtcIiRodHRwXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb05vbWluYXRpbVVybFwiLCBcIm5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UnO1xuZXhwb3J0IGZ1bmN0aW9uIE5vbWluYXRpbVNlcnZpY2UoJGh0dHAsIG5nZW9EZWJvdW5jZSwgbmdlb05vbWluYXRpbVVybCwgbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXMpIHtcbiAgdGhpcy4kaHR0cF8gPSAkaHR0cDtcbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuICB0aGlzLm5vbWluYXRpbVVybF8gPSBuZ2VvTm9taW5hdGltVXJsO1xuICBpZiAodGhpcy5ub21pbmF0aW1VcmxfLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHRoaXMubm9taW5hdGltVXJsXyArPSAnLyc7XG4gIH1cbiAgdGhpcy5zZWFyY2hEZWZhdWx0UGFyYW1zXyA9IG5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zO1xuICB0aGlzLnR5cGVhaGVhZERlYm91bmNlRGVsYXlfID0gNTAwO1xuICB0aGlzLnR5cGVhaGVhZFNvdXJjZURlYm91bmNlZCA9IHRoaXMubmdlb0RlYm91bmNlXyh0aGlzLnR5cGVhaGVhZFNvdXJjZV8uYmluZCh0aGlzKSwgdGhpcy50eXBlYWhlYWREZWJvdW5jZURlbGF5XywgdHJ1ZSk7XG59XG5Ob21pbmF0aW1TZXJ2aWNlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnksIHBhcmFtcykge1xuICBsZXQgdXJsID0gdGhpcy5ub21pbmF0aW1VcmxfICsgXCJzZWFyY2g/cT1cIiArIHF1ZXJ5O1xuICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VhcmNoRGVmYXVsdFBhcmFtc18sIHBhcmFtcyk7XG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gJyYnO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICBvcHRpb25zLnB1c2gob3B0aW9uICsgXCI9XCIgKyBwYXJhbXNbb3B0aW9uXSk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuTm9taW5hdGltU2VydmljZS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlLCBwYXJhbXMpIHtcbiAgbGV0IHVybCA9IHRoaXMubm9taW5hdGltVXJsXyArIFwicmV2ZXJzZVwiO1xuICBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpO1xuICBwYXJhbXMubG9uID0gXCJcIiArIGNvb3JkaW5hdGVbMF07XG4gIHBhcmFtcy5sYXQgPSBcIlwiICsgY29vcmRpbmF0ZVsxXTtcbiAgcGFyYW1zLmZvcm1hdCA9ICdqc29uJztcbiAgaWYgKHBhcmFtcykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgIG9wdGlvbnMucHVzaChvcHRpb24gKyBcIj1cIiArIHBhcmFtc1tvcHRpb25dKTtcbiAgICB9XG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5Ob21pbmF0aW1TZXJ2aWNlLnByb3RvdHlwZS50eXBlYWhlYWRTb3VyY2VfID0gZnVuY3Rpb24gKHF1ZXJ5LCBzeW5jUmVzdWx0cywgYXN5bmNSZXN1bHRzKSB7XG4gIGNvbnN0IG9uU3VjY2Vzc18gPSBmdW5jdGlvbiAocmVzcCkge1xuICAgIGNvbnN0IHBhcnNlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29vcmRpbmF0ZTogW3Jlc3VsdC5sb24sIHJlc3VsdC5sYXRdLFxuICAgICAgICBuYW1lOiByZXN1bHQuZGlzcGxheV9uYW1lXG4gICAgICB9O1xuICAgIH07XG4gICAgaWYgKGFzeW5jUmVzdWx0cykge1xuICAgICAgYXN5bmNSZXN1bHRzKHJlc3AuZGF0YS5tYXAocGFyc2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3luY1Jlc3VsdHMocmVzcC5kYXRhLm1hcChwYXJzZSkpO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgb25FcnJvcl8gPSBmdW5jdGlvbiAocmVzcCkge1xuICAgIGlmIChhc3luY1Jlc3VsdHMpIHtcbiAgICAgIGFzeW5jUmVzdWx0cyhbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN5bmNSZXN1bHRzKFtdKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2VhcmNoKHF1ZXJ5LCB7fSkudGhlbihvblN1Y2Nlc3NfLCBvbkVycm9yXyk7XG59O1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb05vbWluYXRpbVNlcnZpY2UnLCBbbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvTm9taW5hdGltU2VydmljZScsIE5vbWluYXRpbVNlcnZpY2UpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UnO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdTZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nU2VydmljZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nRmVhdHVyZUNvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQnO1xuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZSc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbCc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UnO1xuaW1wb3J0IHsgdG9Mb25MYXQgfSBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcnO1xuaW1wb3J0ICduZ2VvL3Nhc3MvZm9udC5zY3NzJztcbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nQ29tcG9uZW50JywgW25nZW9NaXNjRGVib3VuY2UubmFtZSwgbmdlb01pc2NGaWx0ZXJzLm5hbWUsIG5nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZS5uYW1lLCBuZ2VvUm91dGluZ1JvdXRpbmdTZXJ2aWNlLm5hbWUsIG5nZW9Sb3V0aW5nUm91dGluZ0ZlYXR1cmVDb21wb25lbnQubmFtZV0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsICR0ZW1wbGF0ZUNhY2hlID0+IHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvcm91dGluZycsIHJlcXVpcmUoJy4vcm91dGluZy5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9Sb3V0aW5nVGVtcGxhdGVVcmwnLCAkYXR0cnMgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvUm91dGluZ1RlbXBsYXRlVXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9yb3V0aW5nJztcbn0pO1xubmdlb1JvdXRpbmdUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb1JvdXRpbmdUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ1RlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgbmdlb1JvdXRpbmdTZXJ2aWNlLCBuZ2VvTm9taW5hdGltU2VydmljZSwgJHEsIG5nZW9EZWJvdW5jZSwgbmdlb1JvdXRpbmdPcHRpb25zKSB7XG4gICAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuICAgIHRoaXMubmdlb1JvdXRpbmdTZXJ2aWNlXyA9IG5nZW9Sb3V0aW5nU2VydmljZTtcbiAgICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXyA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuICAgIHRoaXMucm91dGluZ09wdGlvbnNfID0gbmdlb1JvdXRpbmdPcHRpb25zO1xuICAgIHRoaXMucm91dGluZ1Byb2ZpbGVzID0gdGhpcy5yb3V0aW5nT3B0aW9uc18ucHJvZmlsZXMgfHwgW107XG4gICAgdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlID0gdGhpcy5yb3V0aW5nUHJvZmlsZXMubGVuZ3RoID4gMCA/IHRoaXMucm91dGluZ1Byb2ZpbGVzWzBdIDogbnVsbDtcbiAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZSwgdGhpcy5jYWxjdWxhdGVSb3V0ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLiRxXyA9ICRxO1xuICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy52aWFBcnJheSA9IFtdO1xuICAgIHRoaXMuY29sb3JzID0ge1xuICAgICAgc3RhcnRGaWxsOiAnIzZCRTYyRScsXG4gICAgICBzdGFydFN0cm9rZTogJyM0Q0IwMUUnLFxuICAgICAgZGVzdGluYXRpb25GaWxsOiAnI0ZGM0UxMycsXG4gICAgICBkZXN0aW5hdGlvblN0cm9rZTogJyNDRDM0MTInLFxuICAgICAgdmlhRmlsbDogJyM3Njc2NzYnLFxuICAgICAgdmlhU3Ryb2tlOiAnIzAwMDAwMCcsXG4gICAgICBsaW5lUkdCQTogJ3JnYmEoMTYsIDExMiwgMjksIDAuNiknXG4gICAgfTtcbiAgICB0aGlzLnJvdXRlU291cmNlXyA9IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICBmZWF0dXJlczogW11cbiAgICB9KTtcbiAgICB0aGlzLnJvdXRlTGF5ZXJfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgY2xhc3NOYW1lOiAnY2FudmFzMmQnLFxuICAgICAgc291cmNlOiB0aGlzLnJvdXRlU291cmNlXyxcbiAgICAgIHN0eWxlOiBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgICAgZmlsbDogbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMubGluZVJHQkFcbiAgICAgICAgfSksXG4gICAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5saW5lUkdCQSxcbiAgICAgICAgICB3aWR0aDogNVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KTtcbiAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yZWdleElzRm9ybWF0dGVkQ29vcmQgPSAvXFxkK1xcLlxcZCtcXC9cXGQrXFwuXFxkKy87XG4gICAgdGhpcy5kcmF3XyA9IG51bGw7XG4gICAgY29uc3QgZGVib3VuY2VEZWxheSA9IDIwMDtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IG5nZW9EZWJvdW5jZSh0aGlzLmNhbGN1bGF0ZVJvdXRlLmJpbmQodGhpcyksIGRlYm91bmNlRGVsYXksIHRydWUpO1xuICB9XG4gICRvbkluaXQoKSB7XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLnJvdXRlTGF5ZXJfKTtcbiAgICB9XG4gIH1cbiAgY2xlYXJSb3V0ZSgpIHtcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudmlhQXJyYXkgPSBbXTtcbiAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9XG4gIGdldExvbkxhdEZyb21Qb2ludF8ocG9pbnQpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwb2ludC5nZXRHZW9tZXRyeSgpO1xuICAgIGlmICghKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHRpbWUgdmFsdWVzIHR5cGUnKTtcbiAgICB9XG4gICAgY29uc3QgY29vcmRzID0gZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICByZXR1cm4gdG9Mb25MYXQoY29vcmRzLCBwcm9qZWN0aW9uKTtcbiAgfVxuICByZXZlcnNlUm91dGUoKSB7XG4gICAgY29uc3QgdG1wRmVhdHVyZSA9IHRoaXMuc3RhcnRGZWF0dXJlXztcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSB0aGlzLnRhcmdldEZlYXR1cmVfO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSB0bXBGZWF0dXJlO1xuICAgIHRoaXMudmlhQXJyYXkgPSB0aGlzLnZpYUFycmF5LnJldmVyc2UoKTtcbiAgfVxuICBwYXJzZVJvdXRlXyhyb3V0ZSkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgbGV0IHBhcnNlZFJvdXRlcyA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBvbEZvcm1hdEdlb0pTT04oKTtcbiAgICBjb25zdCBmb3JtYXRDb25maWcgPSB7XG4gICAgICBkYXRhUHJvamVjdGlvbjogJ0VQU0c6NDMyNicsXG4gICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKVxuICAgIH07XG4gICAgaWYgKHJvdXRlLmxlZ3MpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFJvdXRlc18gPSByb3V0ZS5sZWdzLm1hcChsZWcgPT4gbGVnLnN0ZXBzLm1hcChzdGVwID0+IG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICBnZW9tZXRyeTogZm9ybWF0LnJlYWRHZW9tZXRyeShzdGVwLmdlb21ldHJ5LCBmb3JtYXRDb25maWcpXG4gICAgICB9KSkpO1xuICAgICAgcGFyc2VkUm91dGVzID0gW10uY29uY2F0KC4uLnBhcnNlZFJvdXRlc18pO1xuICAgIH0gZWxzZSBpZiAocm91dGUuZ2VvbWV0cnkpIHtcbiAgICAgIHBhcnNlZFJvdXRlcy5wdXNoKG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICBnZW9tZXRyeTogZm9ybWF0LnJlYWRHZW9tZXRyeShyb3V0ZS5nZW9tZXRyeSwgZm9ybWF0Q29uZmlnKVxuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkUm91dGVzO1xuICB9XG4gIGNhbGN1bGF0ZVJvdXRlKCkge1xuICAgIGlmICghdGhpcy5zdGFydEZlYXR1cmVfIHx8ICF0aGlzLnRhcmdldEZlYXR1cmVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucm91dGVTb3VyY2VfLmNsZWFyKCk7XG4gICAgY29uc3QgY29vcmRGcm9tID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHRoaXMuc3RhcnRGZWF0dXJlXyk7XG4gICAgY29uc3QgY29vcmRUbyA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh0aGlzLnRhcmdldEZlYXR1cmVfKTtcbiAgICBjb25zdCB2aWFzID0gdGhpcy52aWFBcnJheS5maWx0ZXIodmlhID0+IHZpYS5mZWF0dXJlICE9PSBudWxsKS5tYXAodmlhID0+IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh2aWEuZmVhdHVyZSkpO1xuICAgIGNvbnN0IHJvdXRlID0gW2Nvb3JkRnJvbV0uY29uY2F0KHZpYXMsIFtjb29yZFRvXSk7XG4gICAgY29uc3Qgb25TdWNjZXNzXyA9IHJlc3AgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1hcCB8fCAhdGhpcy5zdGFydEZlYXR1cmVfIHx8ICF0aGlzLnRhcmdldEZlYXR1cmVfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5wYXJzZVJvdXRlXyhyZXNwLmRhdGEucm91dGVzWzBdKTtcbiAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ05vIHJvdXRlIG9yIG5vdCBzdXBwb3J0ZWQgZm9ybWF0LicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnJvdXRlU291cmNlXy5hZGRGZWF0dXJlcyhmZWF0dXJlcyk7XG4gICAgICB0aGlzLm1hcC5nZXRWaWV3KCkuZml0KHRoaXMucm91dGVTb3VyY2VfLmdldEV4dGVudCgpKTtcbiAgICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IHJlc3AuZGF0YS5yb3V0ZXNbMF0uZGlzdGFuY2U7XG4gICAgICB0aGlzLnJvdXRlRHVyYXRpb24gPSByZXNwLmRhdGEucm91dGVzWzBdLmR1cmF0aW9uO1xuICAgICAgY29uc3Qgc3RhcnRSb3V0ZSA9IGZlYXR1cmVzWzBdLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZUF0KDApO1xuICAgICAgY29uc3QgZW5kUm91dGUgPSBmZWF0dXJlc1tmZWF0dXJlcy5sZW5ndGggLSAxXS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVBdCgxKTtcbiAgICAgIGNvbnN0IHN0YXJ0VG9Sb3V0ZSA9IFt0aGlzLnN0YXJ0RmVhdHVyZV8uZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpLCBzdGFydFJvdXRlXTtcbiAgICAgIGNvbnN0IHJvdXRlVG9FbmQgPSBbZW5kUm91dGUsIHRoaXMudGFyZ2V0RmVhdHVyZV8uZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpXTtcbiAgICAgIGNvbnN0IHJvdXRlQ29ubmVjdGlvbnMgPSBbbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhzdGFydFRvUm91dGUpKSwgbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhyb3V0ZVRvRW5kKSldO1xuICAgICAgdGhpcy5yb3V0ZVNvdXJjZV8uYWRkRmVhdHVyZXMocm91dGVDb25uZWN0aW9ucyk7XG4gICAgfTtcbiAgICBjb25zdCBvbkVycm9yXyA9IHJlc3AgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnRXJyb3I6IHJvdXRpbmcgc2VydmVyIG5vdCByZXNwb25kaW5nLic7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBvcHRpb25zLnN0ZXBzID0gdHJ1ZTtcbiAgICBvcHRpb25zLm92ZXJ2aWV3ID0gZmFsc2U7XG4gICAgb3B0aW9ucy5nZW9tZXRyaWVzID0gJ2dlb2pzb24nO1xuICAgIGNvbnN0IGNvbmZpZyA9IHt9O1xuICAgIGNvbmZpZy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAodGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlKSB7XG4gICAgICBjb25maWcuaW5zdGFuY2UgPSB0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUucHJvZmlsZTtcbiAgICB9XG4gICAgdGhpcy4kcV8ud2hlbih0aGlzLm5nZW9Sb3V0aW5nU2VydmljZV8uZ2V0Um91dGUocm91dGUsIGNvbmZpZykpLnRoZW4ob25TdWNjZXNzXywgb25FcnJvcl8pO1xuICB9XG4gIGFkZFZpYSgpIHtcbiAgICB0aGlzLnZpYUFycmF5LnB1c2goe30pO1xuICB9XG4gIGRlbGV0ZVZpYShpbmRleCkge1xuICAgIGlmICh0aGlzLnZpYUFycmF5Lmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB0aGlzLnZpYUFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZVJvdXRlKCk7XG4gICAgfVxuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJuZ2VvUm91dGluZ1NlcnZpY2VcIiwgXCJuZ2VvTm9taW5hdGltU2VydmljZVwiLCBcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb1JvdXRpbmdPcHRpb25zXCJdO1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvUm91dGluZycsIHtcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvUm91dGluZ01hcCdcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmxcbn0pO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1JbnB1dENvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBvbFByb2ogZnJvbSAnb2wvcHJvaic7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBvbFN0eWxlVGV4dCBmcm9tICdvbC9zdHlsZS9UZXh0JztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbk1vZGlmeSBmcm9tICdvbC9pbnRlcmFjdGlvbi9Nb2RpZnknO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25EcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xuaW1wb3J0ICduZ2VvL3Nhc3MvZm9udC5zY3NzJztcbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudCcsIFtuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSwgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudC5uYW1lXSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgJHRlbXBsYXRlQ2FjaGUgPT4ge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vcm91dGluZy9yb3V0aW5nZmVhdHVyZScsIHJlcXVpcmUoJy4vcm91dGluZ2ZlYXR1cmUuaHRtbCcpKTtcbn1dKTtcbm15TW9kdWxlLnZhbHVlKCduZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCcsICRhdHRycyA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9yb3V0aW5nZmVhdHVyZSc7XG59KTtcbm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkYXR0cnNcIiwgXCJuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKCRhdHRycywgbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHRpbWVvdXQsICRxLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICAgIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuICAgIHRoaXMudGltZW91dF8gPSAkdGltZW91dDtcbiAgICB0aGlzLiRxXyA9ICRxO1xuICAgIHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG4gICAgdGhpcy5tYXAgPSBudWxsO1xuICAgIHRoaXMuZmVhdHVyZSA9IG51bGw7XG4gICAgdGhpcy5mZWF0dXJlTGFiZWwgPSAnJztcbiAgICB0aGlzLmZpbGxDb2xvciA9ICcnO1xuICAgIHRoaXMuc3Ryb2tlQ29sb3IgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLnZlY3RvckZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8gPSBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfXG4gICAgfSk7XG4gICAgdGhpcy52ZWN0b3JMYXllcl8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBjbGFzc05hbWU6ICdjYW52YXMyZCcsXG4gICAgICBzb3VyY2U6IHRoaXMudmVjdG9yU291cmNlXyxcbiAgICAgIHN0eWxlOiAoZmVhdHVyZSwgcmVzb2x1dGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gW25ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICAgIHRleHQ6IG5ldyBvbFN0eWxlVGV4dCh7XG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICAgICAgICBjb2xvcjogdGhpcy5maWxsQ29sb3IgfHwgJyMwMDAwMDAnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZvbnQ6ICc5MDAgMjRweCBcIkZvbnQgQXdlc29tZSA1IEZyZWVcIicsXG4gICAgICAgICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnN0cm9rZUNvbG9yIHx8ICcjMDAwMDAwJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvZmZzZXRZOiAtMTUsXG4gICAgICAgICAgICB0ZXh0OiAnXFx1ZjA0MSdcbiAgICAgICAgICB9KVxuICAgICAgICB9KV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXyA9IG5ldyBvbEludGVyYWN0aW9uTW9kaWZ5KHtcbiAgICAgIGZlYXR1cmVzOiB0aGlzLnZlY3RvckZlYXR1cmVzX1xuICAgIH0pO1xuICAgIHRoaXMuZHJhd18gPSBudWxsO1xuICAgIHRoaXMub25TZWxlY3QgPSB0aGlzLm9uU2VsZWN0Xy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gIH1cbiAgJG9uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMudmVjdG9yTGF5ZXJfKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZSh0cnVlKTtcbiAgICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLm1vZGlmeUZlYXR1cmVfKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLm9uKCdtb2RpZnllbmQnLCBldmVudCA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlID0gZXZlbnQuZmVhdHVyZXMuZ2V0QXJyYXkoKVswXTtcbiAgICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgICAgdGhpcy5zbmFwRmVhdHVyZV8oZmVhdHVyZSk7XG4gICAgfSk7XG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKCgpID0+IHRoaXMuZmVhdHVyZSwgKG5ld1ZhbCwgb2xkVmFsKSA9PiB7XG4gICAgICBpZiAobmV3VmFsKSB7XG4gICAgICAgIHRoaXMub25GZWF0dXJlQ2hhbmdlXygpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbCA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICAgICAgdGhpcy5mZWF0dXJlTGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAkb25EZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tYXAucmVtb3ZlTGF5ZXIodGhpcy52ZWN0b3JMYXllcl8pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLm1vZGlmeUZlYXR1cmVfKTtcbiAgfVxuICBzZXQoKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kcmF3Xykge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd18gPSBuZXcgb2xJbnRlcmFjdGlvbkRyYXcoe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfLFxuICAgICAgdHlwZTogJ1BvaW50J1xuICAgIH0pO1xuICAgIHRoaXMuZHJhd18ub24oJ2RyYXdzdGFydCcsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmZlYXR1cmUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JTb3VyY2VfLnJlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRyYXdfLm9uKCdkcmF3ZW5kJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhd18gJiYgdGhpcy5tYXApIHtcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gICAgICB9XG4gICAgICB0aGlzLnNuYXBGZWF0dXJlXyhldmVudC5mZWF0dXJlKTtcbiAgICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKHRydWUpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgfVxuICBzZXRGZWF0dXJlXyhjb29yZGluYXRlLCBsYWJlbCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNmb3JtZWRDb29yZGluYXRlID0gb2xQcm9qLmZyb21Mb25MYXQoY29vcmRpbmF0ZSwgdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSk7XG4gICAgaWYgKGxhYmVsID09PSAnJykge1xuICAgICAgbGFiZWwgPSB0cmFuc2Zvcm1lZENvb3JkaW5hdGUuam9pbignLycpO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHtcbiAgICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9pbnQodHJhbnNmb3JtZWRDb29yZGluYXRlKSxcbiAgICAgIG5hbWU6IGxhYmVsXG4gICAgfSk7XG4gIH1cbiAgb25GZWF0dXJlQ2hhbmdlXygpIHtcbiAgICBpZiAoIXRoaXMuZmVhdHVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZlYXR1cmVMYWJlbCA9IHRoaXMuZmVhdHVyZS5nZXQoJ25hbWUnKSB8fCAnJztcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnRpbWVvdXRfKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZSAmJiB0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgb25TZWxlY3RfKHNlbGVjdGVkKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHNlbGVjdGVkLmNvb3JkaW5hdGUubWFwKHBhcnNlRmxvYXQpO1xuICAgIGNvbnN0IGxhYmVsID0gc2VsZWN0ZWQubGFiZWw7XG4gICAgdGhpcy5zZXRGZWF0dXJlXyhjb29yZGluYXRlLCBsYWJlbCk7XG4gICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB0aGlzLmZlYXR1cmUuZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlcygpO1xuICAgIHRoaXMubWFwLmdldFZpZXcoKS5zZXRDZW50ZXIobmV3Q29vcmRpbmF0ZXMpO1xuICB9XG4gIHNuYXBGZWF0dXJlXyhmZWF0dXJlKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8oZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSB7fTtcbiAgICBjb25zdCBvblN1Y2Nlc3MgPSByZXNwID0+IHtcbiAgICAgIGNvbnN0IGxvbiA9IHBhcnNlRmxvYXQocmVzcC5kYXRhLmxvbik7XG4gICAgICBjb25zdCBsYXQgPSBwYXJzZUZsb2F0KHJlc3AuZGF0YS5sYXQpO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFtsb24sIGxhdF07XG4gICAgICBjb25zdCBsYWJlbCA9IHJlc3AuZGF0YS5kaXNwbGF5X25hbWU7XG4gICAgICB0aGlzLnNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRXJyb3IgPSByZXNwID0+IHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ0Vycm9yOiBub21pbmF0aW0gc2VydmVyIG5vdCByZXNwb25kaW5nLic7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICB9O1xuICAgIHRoaXMuJHFfLndoZW4odGhpcy5uZ2VvTm9taW5hdGltU2VydmljZV8ucmV2ZXJzZShjb29yZCwgY29uZmlnKSkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9XG4gIGdldExvbkxhdEZyb21Qb2ludF8ocG9pbnQpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBwb2ludC5nZXRHZW9tZXRyeSgpO1xuICAgIGNvbnN0IGNvb3JkcyA9IGdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCk7XG4gICAgcmV0dXJuIG9sUHJvai50b0xvbkxhdChjb29yZHMsIHByb2plY3Rpb24pO1xuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcIiRxXCIsIFwibmdlb05vbWluYXRpbVNlcnZpY2VcIl07XG5jb25zdCByb3V0aW5nRmVhdHVyZUNvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJzxuZ2VvUm91dGluZ0ZlYXR1cmVNYXAnLFxuICAgICdmZWF0dXJlJzogJz1uZ2VvUm91dGluZ0ZlYXR1cmVGZWF0dXJlJyxcbiAgICAnZmlsbENvbG9yJzogJzw/bmdlb1JvdXRpbmdGZWF0dXJlRmlsbENvbG9yJyxcbiAgICAnc3Ryb2tlQ29sb3InOiAnPD9uZ2VvUm91dGluZ0ZlYXR1cmVTdHJva2VDb2xvcicsXG4gICAgJ29uQ2hhbmdlJzogJz0/bmdlb1JvdXRpbmdGZWF0dXJlT25DaGFuZ2UnXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb1JvdXRpbmdGZWF0dXJlJywgcm91dGluZ0ZlYXR1cmVDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiUm91dGluZ1NlcnZpY2UuJGluamVjdCA9IFtcIiRodHRwXCIsIFwibmdlb1JvdXRpbmdPcHRpb25zXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5leHBvcnQgZnVuY3Rpb24gUm91dGluZ1NlcnZpY2UoJGh0dHAsIG5nZW9Sb3V0aW5nT3B0aW9ucykge1xuICB0aGlzLiRodHRwXyA9ICRodHRwO1xuICB0aGlzLnJvdXRpbmdPcHRpb25zXyA9IG5nZW9Sb3V0aW5nT3B0aW9ucztcbiAgdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfID0gdGhpcy5yb3V0aW5nT3B0aW9uc18uYmFja2VuZFVybCB8fCAnaHR0cHM6Ly9yb3V0ZXIucHJvamVjdC1vc3JtLm9yZy8nO1xuICBpZiAodGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXyArPSAnLyc7XG4gIH1cbiAgdGhpcy5wcm90b2NvbFZlcnNpb25fID0gJ3YxJztcbn1cblJvdXRpbmdTZXJ2aWNlLnByb3RvdHlwZS5nZXRSb3V0ZSA9IGZ1bmN0aW9uIChjb29yZGluYXRlcywgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgaWYgKCFjb25maWcuc2VydmljZSkge1xuICAgIGNvbmZpZy5zZXJ2aWNlID0gJ3JvdXRlJztcbiAgfVxuICBpZiAoIWNvbmZpZy5wcm9maWxlKSB7XG4gICAgY29uZmlnLnByb2ZpbGUgPSAnY2FyJztcbiAgfVxuICBsZXQgdXJsID0gdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfO1xuICBpZiAoY29uZmlnLmluc3RhbmNlKSB7XG4gICAgdXJsICs9IGNvbmZpZy5pbnN0YW5jZSArIFwiL1wiO1xuICB9XG4gIHVybCArPSBjb25maWcuc2VydmljZSArIFwiL1wiICsgdGhpcy5wcm90b2NvbFZlcnNpb25fICsgXCIvXCIgKyBjb25maWcucHJvZmlsZSArIFwiL1wiO1xuICBjb25zdCBjb29yZGluYXRlU3RyaW5nID0gY29vcmRpbmF0ZXMubWFwKGMgPT4gYy5qb2luKCcsJykpLmpvaW4oJzsnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbiArIFwiPVwiICsgY29uZmlnLm9wdGlvbnNbb3B0aW9uXSk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldE5lYXJlc3QgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgY29uZmlnLnNlcnZpY2UgPSAnbmVhcmVzdCc7XG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInO1xuICB9XG4gIGxldCB1cmwgPSB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF87XG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gY29uZmlnLmluc3RhbmNlICsgXCIvXCI7XG4gIH1cbiAgdXJsICs9IGNvbmZpZy5zZXJ2aWNlICsgXCIvXCIgKyB0aGlzLnByb3RvY29sVmVyc2lvbl8gKyBcIi9cIiArIGNvbmZpZy5wcm9maWxlICsgXCIvXCI7XG4gIGNvbnN0IGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbiArIFwiPVwiICsgY29uZmlnLm9wdGlvbnNbb3B0aW9uXSk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdTZXJ2aWNlJywgW10pO1xubXlNb2R1bGUuc2VydmljZSgnbmdlb1JvdXRpbmdTZXJ2aWNlJywgUm91dGluZ1NlcnZpY2UpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nQ29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nQ29tcG9uZW50JztcbmltcG9ydCAnLi9yb3V0aW5nLnNjc3MnO1xuZXhwb3J0IGRlZmF1bHQgYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nTW9kdWxlJywgW25nZW9Sb3V0aW5nUm91dGluZ0NvbXBvbmVudC5uYW1lXSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm5nZW8tbm9taW5hdGltLWlucHV0XCI+XFxuICA8aW5wdXRcXG4gICAgdHlwZT1cInRleHRcIlxcbiAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuICAgIHBsYWNlaG9sZGVyPVwie3skY3RybC5wbGFjZWhvbGRlcn19XCJcXG4gICAgbmctbW9kZWw9XCIkY3RybC5pbnB1dFZhbHVlXCJcXG4gICAgbmdlby1zZWFyY2g9XCIkY3RybC5vcHRpb25zXCJcXG4gICAgbmdlby1zZWFyY2gtZGF0YXNldHM9XCIkY3RybC5kYXRhc2V0c1wiXFxuICAgIG5nZW8tc2VhcmNoLWxpc3RlbmVycz1cIiRjdHJsLmxpc3RlbmVyc1wiXFxuICAvPlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nXCI+XFxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLXN0YXJ0IGZvcm0tZ3JvdXBcIj5cXG4gICAgPG5nZW8tcm91dGluZy1mZWF0dXJlXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtbWFwPVwiJGN0cmwubWFwXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwiJGN0cmwuc3RhcnRGZWF0dXJlX1wiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy5zdGFydEZpbGxcIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiRjdHJsLmNvbG9ycy5zdGFydFN0cm9rZVwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcXG4gICAgPlxcbiAgICA8L25nZW8tcm91dGluZy1mZWF0dXJlPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLXZpYXMgZm9ybS1ncm91cFwiIG5nLXJlcGVhdD1cIihpbmRleCwgdmlhKSBpbiAkY3RybC52aWFBcnJheVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgPG5nZW8tcm91dGluZy1mZWF0dXJlXFxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXFxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCJ2aWEuZmVhdHVyZVwiXFxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZpbGwtY29sb3I9XCIkY3RybC5jb2xvcnMudmlhRmlsbFwiXFxuICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiRjdHJsLmNvbG9ycy52aWFTdHJva2VcIlxcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCIkY3RybC5oYW5kbGVDaGFuZ2VcIlxcbiAgICAgICAgPlxcbiAgICAgICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZSBkZWxldGUtdmlhXCIgbmctY2xpY2s9XCIkY3RybC5kZWxldGVWaWEoaW5kZXgpXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9zcGFuPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1kZXN0aW5hdGlvbiBmb3JtLWdyb3VwXCI+XFxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cIiRjdHJsLnRhcmdldEZlYXR1cmVfXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uRmlsbFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uU3Ryb2tlXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCIkY3RybC5oYW5kbGVDaGFuZ2VcIlxcbiAgICA+XFxuICAgIDwvbmdlby1yb3V0aW5nLWZlYXR1cmU+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZpbGxcIj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLmNsZWFyUm91dGUoKVwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5DbGVhcjwvc3Bhbj5cXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5yZXZlcnNlUm91dGUoKVwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtZXhjaGFuZ2UtYWx0XCI+PC9zcGFuPiA8c3BhbiB0cmFuc2xhdGU+UmV2ZXJzZTwvc3Bhbj5cXG4gICAgPC9idXR0b24+XFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5hZGRWaWEoKVwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvc3Bhbj4gPHNwYW4gdHJhbnNsYXRlPkFkZCB2aWE8L3NwYW4+XFxuICAgIDwvYnV0dG9uPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cXG5cXG4gIDxkaXYgbmctaWY9XCIkY3RybC5yb3V0aW5nUHJvZmlsZXMubGVuZ3RoID4gMVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGNvbC1tZC00XCIgdHJhbnNsYXRlPlByb2ZpbGU8L2xhYmVsPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPlxcbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5nLW1vZGVsPVwiJGN0cmwuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZVwiPlxcbiAgICAgICAgICA8b3B0aW9uIG5nLXJlcGVhdD1cInByb2ZpbGUgaW4gJGN0cmwucm91dGluZ1Byb2ZpbGVzXCIgbmctdmFsdWU9XCJwcm9maWxlXCI+e3twcm9maWxlLmxhYmVsfX08L29wdGlvbj5cXG4gICAgICAgIDwvc2VsZWN0PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1lcnJvciBmb3JtLWdyb3VwIGNsZWFyZml4XCIgbmctaGlkZT1cIiRjdHJsLmVycm9yTWVzc2FnZSA9PT0gXFwnXFwnXCI+XFxuICAgIHt7JGN0cmwuZXJyb3JNZXNzYWdlfX1cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XFxuXFxuICA8ZGl2IG5nLWhpZGU9XCIkY3RybC5yb3V0ZUR1cmF0aW9uID09PSBudWxsICYmICRjdHJsLnJvdXRlRGlzdGFuY2UgPD0gMFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxcbiAgICAgICAgPHN0cm9uZyB0cmFuc2xhdGU+Um91dGUgc3RhdGlzdGljczwvc3Ryb25nPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIG5nLWhpZGU9XCIkY3RybC5yb3V0ZUR1cmF0aW9uID09PSBudWxsXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RHVyYXRpb248L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj57eyRjdHJsLnJvdXRlRHVyYXRpb24gfCBuZ2VvRHVyYXRpb259fTwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIG5nLWhpZGU9XCIkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTQgdGV4dC1yaWdodFwiIHRyYW5zbGF0ZT5EaXN0YW5jZTwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtOFwiPnt7JGN0cmwucm91dGVEaXN0YW5jZSB8IG5nZW9Vbml0UHJlZml4OlxcJ21cXCd9fTwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWZlYXR1cmVcIj5cXG4gIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcbiAgICA8bmdlby1ub21pbmF0aW0taW5wdXRcXG4gICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC12YWx1ZT1cIiRjdHJsLmZlYXR1cmVMYWJlbFwiXFxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtcGxhY2Vob2xkZXI9XCJ7e1xcJ1NlYXJjaC4uLlxcJyB8IHRyYW5zbGF0ZX19XCJcXG4gICAgICBuZ2VvLW5vbWluYXRpbS1pbnB1dC1vbi1zZWxlY3Q9XCIkY3RybC5vblNlbGVjdFwiXFxuICAgID5cXG4gICAgPC9uZ2VvLW5vbWluYXRpbS1pbnB1dD5cXG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGJ0blwiIG5nLWNsaWNrPVwiJGN0cmwuc2V0KClcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLW1hcC1tYXJrZXJcIj48L3NwYW4+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1TUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==