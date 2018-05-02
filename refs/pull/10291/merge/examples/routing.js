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
/******/ 	deferredModules.push([5,"commons"]);
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
  let url = `${this.nominatimUrl_}search?q=${query}`;
  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);
  params.format = 'json';
  if (params) {
    url += '&';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
    }
    url += options.join('&');
  }
  return this.$http_.get(url);
};
NominatimService.prototype.reverse = function (coordinate, params) {
  let url = `${this.nominatimUrl_}reverse`;
  params = Object.assign({}, params);
  params.lon = `${coordinate[0]}`;
  params.lat = `${coordinate[1]}`;
  params.format = 'json';
  if (params) {
    url += '?';
    const options = [];
    for (const option of Object.keys(params)) {
      options.push(`${option}=${params[option]}`);
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
    url += `${config.instance}/`;
  }
  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;
  const coordinateString = coordinates.map(c => c.join(',')).join(';');
  url += coordinateString;
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
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
    url += `${config.instance}/`;
  }
  url += `${config.service}/${this.protocolVersion_}/${config.profile}/`;
  const coordinateString = coordinate.join(',');
  url += coordinateString;
  if (config.options) {
    url += '?';
    const options = [];
    for (const option of Object.keys(config.options)) {
      options.push(`${option}=${config.options[option]}`);
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

/***/ 5:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9yb3V0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvbm9taW5hdGltaW5wdXQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9yb3V0aW5nLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicm91dGluZ1wiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbNSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZXhhbXBsZSBzaG93cyB0aGUgbmdlbyByb3V0aW5nIGRpcmVjdGl2ZS5cbiAqL1xuaW1wb3J0ICcuL3JvdXRpbmcuY3NzJztcbmltcG9ydCAnb2wvb2wuY3NzJztcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnO1xuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvZm9udGF3ZXNvbWUubWluLmNzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTW9kdWxlIGZyb20gJ25nZW8vcm91dGluZy9tb2R1bGUnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIGdtZk1hcENvbXBvbmVudC5uYW1lLCBuZ2VvUm91dGluZ01vZHVsZS5uYW1lXSk7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uJ3MgbWFpbiBkaXJlY3RpdmUuXG4gKlxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFs5MzEwMTAuMTUzNTk4OTQ0MiwgNTk2MTcwNS44NDIyOTcyNTRdLFxuICAgICAgem9vbTogOSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5yb3V0aW5nUGFuZWxBY3RpdmUgPSB0cnVlO1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvUm91dGluZ09wdGlvbnMnLCB7fSk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb05vbWluYXRpbVVybCcsICdodHRwczovL25vbWluYXRpbS5vcGVuc3RyZWV0bWFwLm9yZy8nKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcycsIHt9KTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwiJHNjb3BlXCIsIFwibmdlb05vbWluYXRpbVNlcnZpY2VcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvU2VhcmNoU2VhcmNoRGlyZWN0aXZlIGZyb20gJ25nZW8vc2VhcmNoL3NlYXJjaERpcmVjdGl2ZSc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlJztcbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQnLCBbbmdlb1NlYXJjaFNlYXJjaERpcmVjdGl2ZS5uYW1lLCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZV0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsICR0ZW1wbGF0ZUNhY2hlID0+IHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvbm9taW5hdGltaW5wdXQnLCByZXF1aXJlKCcuL25vbWluYXRpbWlucHV0Lmh0bWwnKSk7XG59XSk7XG5teU1vZHVsZS52YWx1ZSgnbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsJywgJGF0dHJzID0+IHtcbiAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9ub21pbmF0aW1pbnB1dCc7XG59KTtcbm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsKCRhdHRycywgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NvcGUsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlKSB7XG4gIHRoaXMuZWxlbWVudF8gPSAkZWxlbWVudDtcbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG4gIHRoaXMub25TZWxlY3QgPSBudWxsO1xuICB0aGlzLmlucHV0VmFsdWUgPSBudWxsO1xuICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgdGhpcy5kYXRhc2V0cyA9IFt7XG4gICAgbmFtZTogJ25vbWluYXRpbScsXG4gICAgZGlzcGxheTogJ25hbWUnLFxuICAgIHNvdXJjZTogdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZS50eXBlYWhlYWRTb3VyY2VEZWJvdW5jZWRcbiAgfV07XG4gIHRoaXMubGlzdGVuZXJzID0ge1xuICAgIHNlbGVjdDogdGhpcy5zZWxlY3RfLmJpbmQodGhpcylcbiAgfTtcbiAgdGhpcy5wbGFjZWhvbGRlciA9ICcnO1xufVxuQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0XyA9IGZ1bmN0aW9uIChldmVudCwgc3VnZ2VzdGlvbiwgZGF0YXNldCkge1xuICBpZiAodGhpcy5vblNlbGVjdCkge1xuICAgIHRoaXMub25TZWxlY3Qoc3VnZ2VzdGlvbik7XG4gIH1cbn07XG5jb25zdCByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ29uU2VsZWN0JzogJz0/bmdlb05vbWluYXRpbUlucHV0T25TZWxlY3QnLFxuICAgICdpbnB1dFZhbHVlJzogJz0/bmdlb05vbWluYXRpbUlucHV0VmFsdWUnLFxuICAgICdwbGFjZWhvbGRlcic6ICdAP25nZW9Ob21pbmF0aW1JbnB1dFBsYWNlaG9sZGVyJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvTm9taW5hdGltSW5wdXQnLCByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiTm9taW5hdGltU2VydmljZS4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvTm9taW5hdGltVXJsXCIsIFwibmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5leHBvcnQgZnVuY3Rpb24gTm9taW5hdGltU2VydmljZSgkaHR0cCwgbmdlb0RlYm91bmNlLCBuZ2VvTm9taW5hdGltVXJsLCBuZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcykge1xuICB0aGlzLiRodHRwXyA9ICRodHRwO1xuICB0aGlzLm5nZW9EZWJvdW5jZV8gPSBuZ2VvRGVib3VuY2U7XG4gIHRoaXMubm9taW5hdGltVXJsXyA9IG5nZW9Ob21pbmF0aW1Vcmw7XG4gIGlmICh0aGlzLm5vbWluYXRpbVVybF8uc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdGhpcy5ub21pbmF0aW1VcmxfICs9ICcvJztcbiAgfVxuICB0aGlzLnNlYXJjaERlZmF1bHRQYXJhbXNfID0gbmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXM7XG4gIHRoaXMudHlwZWFoZWFkRGVib3VuY2VEZWxheV8gPSA1MDA7XG4gIHRoaXMudHlwZWFoZWFkU291cmNlRGVib3VuY2VkID0gdGhpcy5uZ2VvRGVib3VuY2VfKHRoaXMudHlwZWFoZWFkU291cmNlXy5iaW5kKHRoaXMpLCB0aGlzLnR5cGVhaGVhZERlYm91bmNlRGVsYXlfLCB0cnVlKTtcbn1cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1zKSB7XG4gIGxldCB1cmwgPSBgJHt0aGlzLm5vbWluYXRpbVVybF99c2VhcmNoP3E9JHtxdWVyeX1gO1xuICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc2VhcmNoRGVmYXVsdFBhcmFtc18sIHBhcmFtcyk7XG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gJyYnO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke3BhcmFtc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgcGFyYW1zKSB7XG4gIGxldCB1cmwgPSBgJHt0aGlzLm5vbWluYXRpbVVybF99cmV2ZXJzZWA7XG4gIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyk7XG4gIHBhcmFtcy5sb24gPSBgJHtjb29yZGluYXRlWzBdfWA7XG4gIHBhcmFtcy5sYXQgPSBgJHtjb29yZGluYXRlWzFdfWA7XG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gJz8nO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke3BhcmFtc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnR5cGVhaGVhZFNvdXJjZV8gPSBmdW5jdGlvbiAocXVlcnksIHN5bmNSZXN1bHRzLCBhc3luY1Jlc3VsdHMpIHtcbiAgY29uc3Qgb25TdWNjZXNzXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgY29uc3QgcGFyc2UgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb29yZGluYXRlOiBbcmVzdWx0LmxvbiwgcmVzdWx0LmxhdF0sXG4gICAgICAgIG5hbWU6IHJlc3VsdC5kaXNwbGF5X25hbWVcbiAgICAgIH07XG4gICAgfTtcbiAgICBpZiAoYXN5bmNSZXN1bHRzKSB7XG4gICAgICBhc3luY1Jlc3VsdHMocmVzcC5kYXRhLm1hcChwYXJzZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jUmVzdWx0cyhyZXNwLmRhdGEubWFwKHBhcnNlKSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBvbkVycm9yXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgaWYgKGFzeW5jUmVzdWx0cykge1xuICAgICAgYXN5bmNSZXN1bHRzKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3luY1Jlc3VsdHMoW10pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zZWFyY2gocXVlcnksIHt9KS50aGVuKG9uU3VjY2Vzc18sIG9uRXJyb3JfKTtcbn07XG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvTm9taW5hdGltU2VydmljZScsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWVdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9Ob21pbmF0aW1TZXJ2aWNlJywgTm9taW5hdGltU2VydmljZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ1NlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL1JvdXRpbmdTZXJ2aWNlJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50IGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudCc7XG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvcic7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQgeyB0b0xvbkxhdCB9IGZyb20gJ29sL3Byb2onO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XG5pbXBvcnQgJ25nZW8vc2Fzcy9mb250LnNjc3MnO1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdDb21wb25lbnQnLCBbbmdlb01pc2NEZWJvdW5jZS5uYW1lLCBuZ2VvTWlzY0ZpbHRlcnMubmFtZSwgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWUsIG5nZW9Sb3V0aW5nUm91dGluZ1NlcnZpY2UubmFtZSwgbmdlb1JvdXRpbmdSb3V0aW5nRmVhdHVyZUNvbXBvbmVudC5uYW1lXSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgJHRlbXBsYXRlQ2FjaGUgPT4ge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vcm91dGluZy9yb3V0aW5nJywgcmVxdWlyZSgnLi9yb3V0aW5nLmh0bWwnKSk7XG59XSk7XG5teU1vZHVsZS52YWx1ZSgnbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCcsICRhdHRycyA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzLm5nZW9Sb3V0aW5nVGVtcGxhdGVVcmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL3JvdXRpbmcnO1xufSk7XG5uZ2VvUm91dGluZ1RlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkYXR0cnNcIiwgXCJuZ2VvUm91dGluZ1RlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCBuZ2VvUm91dGluZ1NlcnZpY2UsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlLCAkcSwgbmdlb0RlYm91bmNlLCBuZ2VvUm91dGluZ09wdGlvbnMpIHtcbiAgICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG4gICAgdGhpcy5uZ2VvUm91dGluZ1NlcnZpY2VfID0gbmdlb1JvdXRpbmdTZXJ2aWNlO1xuICAgIHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfID0gbmdlb05vbWluYXRpbVNlcnZpY2U7XG4gICAgdGhpcy5yb3V0aW5nT3B0aW9uc18gPSBuZ2VvUm91dGluZ09wdGlvbnM7XG4gICAgdGhpcy5yb3V0aW5nUHJvZmlsZXMgPSB0aGlzLnJvdXRpbmdPcHRpb25zXy5wcm9maWxlcyB8fCBbXTtcbiAgICB0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUgPSB0aGlzLnJvdXRpbmdQcm9maWxlcy5sZW5ndGggPiAwID8gdGhpcy5yb3V0aW5nUHJvZmlsZXNbMF0gOiBudWxsO1xuICAgICRzY29wZS4kd2F0Y2goKCkgPT4gdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlLCB0aGlzLmNhbGN1bGF0ZVJvdXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuJHFfID0gJHE7XG4gICAgdGhpcy5tYXAgPSBudWxsO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gICAgdGhpcy5zdGFydEZlYXR1cmVfID0gbnVsbDtcbiAgICB0aGlzLnRhcmdldEZlYXR1cmVfID0gbnVsbDtcbiAgICB0aGlzLnZpYUFycmF5ID0gW107XG4gICAgdGhpcy5jb2xvcnMgPSB7XG4gICAgICBzdGFydEZpbGw6ICcjNkJFNjJFJyxcbiAgICAgIHN0YXJ0U3Ryb2tlOiAnIzRDQjAxRScsXG4gICAgICBkZXN0aW5hdGlvbkZpbGw6ICcjRkYzRTEzJyxcbiAgICAgIGRlc3RpbmF0aW9uU3Ryb2tlOiAnI0NEMzQxMicsXG4gICAgICB2aWFGaWxsOiAnIzc2NzY3NicsXG4gICAgICB2aWFTdHJva2U6ICcjMDAwMDAwJyxcbiAgICAgIGxpbmVSR0JBOiAncmdiYSgxNiwgMTEyLCAyOSwgMC42KSdcbiAgICB9O1xuICAgIHRoaXMucm91dGVTb3VyY2VfID0gbmV3IG9sU291cmNlVmVjdG9yKHtcbiAgICAgIGZlYXR1cmVzOiBbXVxuICAgIH0pO1xuICAgIHRoaXMucm91dGVMYXllcl8gPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICBjbGFzc05hbWU6ICdjYW52YXMyZCcsXG4gICAgICBzb3VyY2U6IHRoaXMucm91dGVTb3VyY2VfLFxuICAgICAgc3R5bGU6IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9ycy5saW5lUkdCQVxuICAgICAgICB9KSxcbiAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmxpbmVSR0JBLFxuICAgICAgICAgIHdpZHRoOiA1XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pO1xuICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5yb3V0ZUR1cmF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJlZ2V4SXNGb3JtYXR0ZWRDb29yZCA9IC9cXGQrXFwuXFxkK1xcL1xcZCtcXC5cXGQrLztcbiAgICB0aGlzLmRyYXdfID0gbnVsbDtcbiAgICBjb25zdCBkZWJvdW5jZURlbGF5ID0gMjAwO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gbmdlb0RlYm91bmNlKHRoaXMuY2FsY3VsYXRlUm91dGUuYmluZCh0aGlzKSwgZGVib3VuY2VEZWxheSwgdHJ1ZSk7XG4gIH1cbiAgJG9uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgIHRoaXMubWFwLmFkZExheWVyKHRoaXMucm91dGVMYXllcl8pO1xuICAgIH1cbiAgfVxuICBjbGVhclJvdXRlKCkge1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IG51bGw7XG4gICAgdGhpcy52aWFBcnJheSA9IFtdO1xuICAgIHRoaXMucm91dGVEaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5yb3V0ZUR1cmF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJvdXRlU291cmNlXy5jbGVhcigpO1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJyc7XG4gIH1cbiAgZ2V0TG9uTGF0RnJvbVBvaW50Xyhwb2ludCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBnZW9tZXRyeSA9IHBvaW50LmdldEdlb21ldHJ5KCk7XG4gICAgaWYgKCEoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21Qb2ludCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgdGltZSB2YWx1ZXMgdHlwZScpO1xuICAgIH1cbiAgICBjb25zdCBjb29yZHMgPSBnZW9tZXRyeS5nZXRDb29yZGluYXRlcygpO1xuICAgIGNvbnN0IHByb2plY3Rpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHJldHVybiB0b0xvbkxhdChjb29yZHMsIHByb2plY3Rpb24pO1xuICB9XG4gIHJldmVyc2VSb3V0ZSgpIHtcbiAgICBjb25zdCB0bXBGZWF0dXJlID0gdGhpcy5zdGFydEZlYXR1cmVfO1xuICAgIHRoaXMuc3RhcnRGZWF0dXJlXyA9IHRoaXMudGFyZ2V0RmVhdHVyZV87XG4gICAgdGhpcy50YXJnZXRGZWF0dXJlXyA9IHRtcEZlYXR1cmU7XG4gICAgdGhpcy52aWFBcnJheSA9IHRoaXMudmlhQXJyYXkucmV2ZXJzZSgpO1xuICB9XG4gIHBhcnNlUm91dGVfKHJvdXRlKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBsZXQgcGFyc2VkUm91dGVzID0gW107XG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IG9sRm9ybWF0R2VvSlNPTigpO1xuICAgIGNvbnN0IGZvcm1hdENvbmZpZyA9IHtcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpXG4gICAgfTtcbiAgICBpZiAocm91dGUubGVncykge1xuICAgICAgY29uc3QgcGFyc2VkUm91dGVzXyA9IHJvdXRlLmxlZ3MubWFwKGxlZyA9PiBsZWcuc3RlcHMubWFwKHN0ZXAgPT4gbmV3IG9sRmVhdHVyZSh7XG4gICAgICAgIGdlb21ldHJ5OiBmb3JtYXQucmVhZEdlb21ldHJ5KHN0ZXAuZ2VvbWV0cnksIGZvcm1hdENvbmZpZylcbiAgICAgIH0pKSk7XG4gICAgICBwYXJzZWRSb3V0ZXMgPSBbXS5jb25jYXQoLi4ucGFyc2VkUm91dGVzXyk7XG4gICAgfSBlbHNlIGlmIChyb3V0ZS5nZW9tZXRyeSkge1xuICAgICAgcGFyc2VkUm91dGVzLnB1c2gobmV3IG9sRmVhdHVyZSh7XG4gICAgICAgIGdlb21ldHJ5OiBmb3JtYXQucmVhZEdlb21ldHJ5KHJvdXRlLmdlb21ldHJ5LCBmb3JtYXRDb25maWcpXG4gICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWRSb3V0ZXM7XG4gIH1cbiAgY2FsY3VsYXRlUm91dGUoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0RmVhdHVyZV8gfHwgIXRoaXMudGFyZ2V0RmVhdHVyZV8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8uY2xlYXIoKTtcbiAgICBjb25zdCBjb29yZEZyb20gPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8odGhpcy5zdGFydEZlYXR1cmVfKTtcbiAgICBjb25zdCBjb29yZFRvID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHRoaXMudGFyZ2V0RmVhdHVyZV8pO1xuICAgIGNvbnN0IHZpYXMgPSB0aGlzLnZpYUFycmF5LmZpbHRlcih2aWEgPT4gdmlhLmZlYXR1cmUgIT09IG51bGwpLm1hcCh2aWEgPT4gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHZpYS5mZWF0dXJlKSk7XG4gICAgY29uc3Qgcm91dGUgPSBbY29vcmRGcm9tXS5jb25jYXQodmlhcywgW2Nvb3JkVG9dKTtcbiAgICBjb25zdCBvblN1Y2Nlc3NfID0gcmVzcCA9PiB7XG4gICAgICBpZiAoIXRoaXMubWFwIHx8ICF0aGlzLnN0YXJ0RmVhdHVyZV8gfHwgIXRoaXMudGFyZ2V0RmVhdHVyZV8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLnBhcnNlUm91dGVfKHJlc3AuZGF0YS5yb3V0ZXNbMF0pO1xuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTm8gcm91dGUgb3Igbm90IHN1cHBvcnRlZCBmb3JtYXQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucm91dGVTb3VyY2VfLmFkZEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICAgIHRoaXMubWFwLmdldFZpZXcoKS5maXQodGhpcy5yb3V0ZVNvdXJjZV8uZ2V0RXh0ZW50KCkpO1xuICAgICAgdGhpcy5yb3V0ZURpc3RhbmNlID0gcmVzcC5kYXRhLnJvdXRlc1swXS5kaXN0YW5jZTtcbiAgICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IHJlc3AuZGF0YS5yb3V0ZXNbMF0uZHVyYXRpb247XG4gICAgICBjb25zdCBzdGFydFJvdXRlID0gZmVhdHVyZXNbMF0uZ2V0R2VvbWV0cnkoKS5nZXRDb29yZGluYXRlQXQoMCk7XG4gICAgICBjb25zdCBlbmRSb3V0ZSA9IGZlYXR1cmVzW2ZlYXR1cmVzLmxlbmd0aCAtIDFdLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZUF0KDEpO1xuICAgICAgY29uc3Qgc3RhcnRUb1JvdXRlID0gW3RoaXMuc3RhcnRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCksIHN0YXJ0Um91dGVdO1xuICAgICAgY29uc3Qgcm91dGVUb0VuZCA9IFtlbmRSb3V0ZSwgdGhpcy50YXJnZXRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCldO1xuICAgICAgY29uc3Qgcm91dGVDb25uZWN0aW9ucyA9IFtuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKHN0YXJ0VG9Sb3V0ZSkpLCBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKHJvdXRlVG9FbmQpKV07XG4gICAgICB0aGlzLnJvdXRlU291cmNlXy5hZGRGZWF0dXJlcyhyb3V0ZUNvbm5lY3Rpb25zKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRXJyb3JfID0gcmVzcCA9PiB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdFcnJvcjogcm91dGluZyBzZXJ2ZXIgbm90IHJlc3BvbmRpbmcuJztcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgIH07XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIG9wdGlvbnMuc3RlcHMgPSB0cnVlO1xuICAgIG9wdGlvbnMub3ZlcnZpZXcgPSBmYWxzZTtcbiAgICBvcHRpb25zLmdlb21ldHJpZXMgPSAnZ2VvanNvbic7XG4gICAgY29uc3QgY29uZmlnID0ge307XG4gICAgY29uZmlnLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGUpIHtcbiAgICAgIGNvbmZpZy5pbnN0YW5jZSA9IHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZS5wcm9maWxlO1xuICAgIH1cbiAgICB0aGlzLiRxXy53aGVuKHRoaXMubmdlb1JvdXRpbmdTZXJ2aWNlXy5nZXRSb3V0ZShyb3V0ZSwgY29uZmlnKSkudGhlbihvblN1Y2Nlc3NfLCBvbkVycm9yXyk7XG4gIH1cbiAgYWRkVmlhKCkge1xuICAgIHRoaXMudmlhQXJyYXkucHVzaCh7fSk7XG4gIH1cbiAgZGVsZXRlVmlhKGluZGV4KSB7XG4gICAgaWYgKHRoaXMudmlhQXJyYXkubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHRoaXMudmlhQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUm91dGUoKTtcbiAgICB9XG4gIH1cbn1cbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIm5nZW9Sb3V0aW5nU2VydmljZVwiLCBcIm5nZW9Ob21pbmF0aW1TZXJ2aWNlXCIsIFwiJHFcIiwgXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvUm91dGluZ09wdGlvbnNcIl07XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Sb3V0aW5nJywge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9Sb3V0aW5nTWFwJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdUZW1wbGF0ZVVybFxufSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50JztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24nO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUnO1xuaW1wb3J0IG9sU3R5bGVUZXh0IGZyb20gJ29sL3N0eWxlL1RleHQnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBvbEludGVyYWN0aW9uTW9kaWZ5IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeSc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkRyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdyc7XG5pbXBvcnQgJ25nZW8vc2Fzcy9mb250LnNjc3MnO1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50JywgW25nZW9Sb3V0aW5nTm9taW5hdGltU2VydmljZS5uYW1lLCBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50Lm5hbWVdKTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCAkdGVtcGxhdGVDYWNoZSA9PiB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJywgcmVxdWlyZSgnLi9yb3V0aW5nZmVhdHVyZS5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsJywgJGF0dHJzID0+IHtcbiAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJztcbn0pO1xubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRhdHRyc1wiLCBcIm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkdGltZW91dCwgJHEsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlKSB7XG4gICAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gICAgdGhpcy50aW1lb3V0XyA9ICR0aW1lb3V0O1xuICAgIHRoaXMuJHFfID0gJHE7XG4gICAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZV8gPSBuZ2VvTm9taW5hdGltU2VydmljZTtcbiAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgdGhpcy5mZWF0dXJlID0gbnVsbDtcbiAgICB0aGlzLmZlYXR1cmVMYWJlbCA9ICcnO1xuICAgIHRoaXMuZmlsbENvbG9yID0gJyc7XG4gICAgdGhpcy5zdHJva2VDb2xvciA9ICcnO1xuICAgIHRoaXMub25DaGFuZ2UgPSBudWxsO1xuICAgIHRoaXMudmVjdG9yRmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICAgIHRoaXMudmVjdG9yU291cmNlXyA9IG5ldyBvbFNvdXJjZVZlY3Rvcih7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc19cbiAgICB9KTtcbiAgICB0aGlzLnZlY3RvckxheWVyXyA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgIGNsYXNzTmFtZTogJ2NhbnZhczJkJyxcbiAgICAgIHNvdXJjZTogdGhpcy52ZWN0b3JTb3VyY2VfLFxuICAgICAgc3R5bGU6IChmZWF0dXJlLCByZXNvbHV0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBbbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICAgICAgdGV4dDogbmV3IG9sU3R5bGVUZXh0KHtcbiAgICAgICAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmZpbGxDb2xvciB8fCAnIzAwMDAwMCdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZm9udDogJzkwMCAyNHB4IFwiRm9udCBBd2Vzb21lIDUgRnJlZVwiJyxcbiAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgICAgY29sb3I6IHRoaXMuc3Ryb2tlQ29sb3IgfHwgJyMwMDAwMDAnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9mZnNldFk6IC0xNSxcbiAgICAgICAgICAgIHRleHQ6ICdcXHVmMDQxJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfID0gbmV3IG9sSW50ZXJhY3Rpb25Nb2RpZnkoe1xuICAgICAgZmVhdHVyZXM6IHRoaXMudmVjdG9yRmVhdHVyZXNfXG4gICAgfSk7XG4gICAgdGhpcy5kcmF3XyA9IG51bGw7XG4gICAgdGhpcy5vblNlbGVjdCA9IHRoaXMub25TZWxlY3RfLmJpbmQodGhpcyk7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgfVxuICAkb25Jbml0KCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy52ZWN0b3JMYXllcl8pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8uc2V0QWN0aXZlKHRydWUpO1xuICAgIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubW9kaWZ5RmVhdHVyZV8pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8ub24oJ21vZGlmeWVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmUgPSBldmVudC5mZWF0dXJlcy5nZXRBcnJheSgpWzBdO1xuICAgICAgdGhpcy52ZWN0b3JTb3VyY2VfLmNsZWFyKCk7XG4gICAgICB0aGlzLnNuYXBGZWF0dXJlXyhmZWF0dXJlKTtcbiAgICB9KTtcbiAgICB0aGlzLnNjb3BlXy4kd2F0Y2goKCkgPT4gdGhpcy5mZWF0dXJlLCAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICAgIGlmIChuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5vbkZlYXR1cmVDaGFuZ2VfKCk7XG4gICAgICB9XG4gICAgICBpZiAobmV3VmFsID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgICAgICB0aGlzLmZlYXR1cmVMYWJlbCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICRvbkRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1hcC5yZW1vdmVMYXllcih0aGlzLnZlY3RvckxheWVyXyk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMubWFwLnJlbW92ZUludGVyYWN0aW9uKHRoaXMubW9kaWZ5RmVhdHVyZV8pO1xuICB9XG4gIHNldCgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRyYXdfKSB7XG4gICAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3XyA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc18sXG4gICAgICB0eXBlOiAnUG9pbnQnXG4gICAgfSk7XG4gICAgdGhpcy5kcmF3Xy5vbignZHJhd3N0YXJ0JywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZmVhdHVyZSkge1xuICAgICAgICB0aGlzLnZlY3RvclNvdXJjZV8ucmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZHJhd18ub24oJ2RyYXdlbmQnLCBldmVudCA9PiB7XG4gICAgICBpZiAodGhpcy5kcmF3XyAmJiB0aGlzLm1hcCkge1xuICAgICAgICB0aGlzLm1hcC5yZW1vdmVJbnRlcmFjdGlvbih0aGlzLmRyYXdfKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc25hcEZlYXR1cmVfKGV2ZW50LmZlYXR1cmUpO1xuICAgICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMuZHJhd18pO1xuICB9XG4gIHNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0cmFuc2Zvcm1lZENvb3JkaW5hdGUgPSBvbFByb2ouZnJvbUxvbkxhdChjb29yZGluYXRlLCB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpKTtcbiAgICBpZiAobGFiZWwgPT09ICcnKSB7XG4gICAgICBsYWJlbCA9IHRyYW5zZm9ybWVkQ29vcmRpbmF0ZS5qb2luKCcvJyk7XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoe1xuICAgICAgZ2VvbWV0cnk6IG5ldyBvbEdlb21Qb2ludCh0cmFuc2Zvcm1lZENvb3JkaW5hdGUpLFxuICAgICAgbmFtZTogbGFiZWxcbiAgICB9KTtcbiAgfVxuICBvbkZlYXR1cmVDaGFuZ2VfKCkge1xuICAgIGlmICghdGhpcy5mZWF0dXJlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmVhdHVyZUxhYmVsID0gdGhpcy5mZWF0dXJlLmdldCgnbmFtZScpIHx8ICcnO1xuICAgIHRoaXMudmVjdG9yU291cmNlXy5jbGVhcigpO1xuICAgIHRoaXMudmVjdG9yU291cmNlXy5hZGRGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMudGltZW91dF8oKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5mZWF0dXJlICYmIHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBvblNlbGVjdF8oc2VsZWN0ZWQpIHtcbiAgICBjb25zdCBjb29yZGluYXRlID0gc2VsZWN0ZWQuY29vcmRpbmF0ZS5tYXAocGFyc2VGbG9hdCk7XG4gICAgY29uc3QgbGFiZWwgPSBzZWxlY3RlZC5sYWJlbDtcbiAgICB0aGlzLnNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKTtcbiAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IHRoaXMuZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLnNldENlbnRlcihuZXdDb29yZGluYXRlcyk7XG4gIH1cbiAgc25hcEZlYXR1cmVfKGZlYXR1cmUpIHtcbiAgICBjb25zdCBjb29yZCA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50XyhmZWF0dXJlKTtcbiAgICBpZiAoIWNvb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHt9O1xuICAgIGNvbnN0IG9uU3VjY2VzcyA9IHJlc3AgPT4ge1xuICAgICAgY29uc3QgbG9uID0gcGFyc2VGbG9hdChyZXNwLmRhdGEubG9uKTtcbiAgICAgIGNvbnN0IGxhdCA9IHBhcnNlRmxvYXQocmVzcC5kYXRhLmxhdCk7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gW2xvbiwgbGF0XTtcbiAgICAgIGNvbnN0IGxhYmVsID0gcmVzcC5kYXRhLmRpc3BsYXlfbmFtZTtcbiAgICAgIHRoaXMuc2V0RmVhdHVyZV8oY29vcmRpbmF0ZSwgbGFiZWwpO1xuICAgIH07XG4gICAgY29uc3Qgb25FcnJvciA9IHJlc3AgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnRXJyb3I6IG5vbWluYXRpbSBzZXJ2ZXIgbm90IHJlc3BvbmRpbmcuJztcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgIH07XG4gICAgdGhpcy4kcV8ud2hlbih0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXy5yZXZlcnNlKGNvb3JkLCBjb25maWcpKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gIH1cbiAgZ2V0TG9uTGF0RnJvbVBvaW50Xyhwb2ludCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBnZW9tZXRyeSA9IHBvaW50LmdldEdlb21ldHJ5KCk7XG4gICAgY29uc3QgY29vcmRzID0gZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICByZXR1cm4gb2xQcm9qLnRvTG9uTGF0KGNvb3JkcywgcHJvamVjdGlvbik7XG4gIH1cbn1cbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwiJHFcIiwgXCJuZ2VvTm9taW5hdGltU2VydmljZVwiXTtcbmNvbnN0IHJvdXRpbmdGZWF0dXJlQ29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9Sb3V0aW5nRmVhdHVyZU1hcCcsXG4gICAgJ2ZlYXR1cmUnOiAnPW5nZW9Sb3V0aW5nRmVhdHVyZUZlYXR1cmUnLFxuICAgICdmaWxsQ29sb3InOiAnPD9uZ2VvUm91dGluZ0ZlYXR1cmVGaWxsQ29sb3InLFxuICAgICdzdHJva2VDb2xvcic6ICc8P25nZW9Sb3V0aW5nRmVhdHVyZVN0cm9rZUNvbG9yJyxcbiAgICAnb25DaGFuZ2UnOiAnPT9uZ2VvUm91dGluZ0ZlYXR1cmVPbkNoYW5nZSdcbiAgfSxcbiAgdGVtcGxhdGVVcmw6IG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvUm91dGluZ0ZlYXR1cmUnLCByb3V0aW5nRmVhdHVyZUNvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJSb3V0aW5nU2VydmljZS4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCJuZ2VvUm91dGluZ09wdGlvbnNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmV4cG9ydCBmdW5jdGlvbiBSb3V0aW5nU2VydmljZSgkaHR0cCwgbmdlb1JvdXRpbmdPcHRpb25zKSB7XG4gIHRoaXMuJGh0dHBfID0gJGh0dHA7XG4gIHRoaXMucm91dGluZ09wdGlvbnNfID0gbmdlb1JvdXRpbmdPcHRpb25zO1xuICB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF8gPSB0aGlzLnJvdXRpbmdPcHRpb25zXy5iYWNrZW5kVXJsIHx8ICdodHRwczovL3JvdXRlci5wcm9qZWN0LW9zcm0ub3JnLyc7XG4gIGlmICh0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF8uc3Vic3RyKC0xKSAhPT0gJy8nKSB7XG4gICAgdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfICs9ICcvJztcbiAgfVxuICB0aGlzLnByb3RvY29sVmVyc2lvbl8gPSAndjEnO1xufVxuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldFJvdXRlID0gZnVuY3Rpb24gKGNvb3JkaW5hdGVzLCBjb25maWcpIHtcbiAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICBpZiAoIWNvbmZpZy5zZXJ2aWNlKSB7XG4gICAgY29uZmlnLnNlcnZpY2UgPSAncm91dGUnO1xuICB9XG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInO1xuICB9XG4gIGxldCB1cmwgPSB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF87XG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gYCR7Y29uZmlnLmluc3RhbmNlfS9gO1xuICB9XG4gIHVybCArPSBgJHtjb25maWcuc2VydmljZX0vJHt0aGlzLnByb3RvY29sVmVyc2lvbl99LyR7Y29uZmlnLnByb2ZpbGV9L2A7XG4gIGNvbnN0IGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlcy5tYXAoYyA9PiBjLmpvaW4oJywnKSkuam9pbignOycpO1xuICB1cmwgKz0gY29vcmRpbmF0ZVN0cmluZztcbiAgaWYgKGNvbmZpZy5vcHRpb25zKSB7XG4gICAgdXJsICs9ICc/JztcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMoY29uZmlnLm9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9ufT0ke2NvbmZpZy5vcHRpb25zW29wdGlvbl19YCk7XG4gICAgfVxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuICByZXR1cm4gdGhpcy4kaHR0cF8uZ2V0KHVybCk7XG59O1xuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldE5lYXJlc3QgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgY29uZmlnLnNlcnZpY2UgPSAnbmVhcmVzdCc7XG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInO1xuICB9XG4gIGxldCB1cmwgPSB0aGlzLm5nZW9Pc3JtQmFja2VuZFVybF87XG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gYCR7Y29uZmlnLmluc3RhbmNlfS9gO1xuICB9XG4gIHVybCArPSBgJHtjb25maWcuc2VydmljZX0vJHt0aGlzLnByb3RvY29sVmVyc2lvbl99LyR7Y29uZmlnLnByb2ZpbGV9L2A7XG4gIGNvbnN0IGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvbn09JHtjb25maWcub3B0aW9uc1tvcHRpb25dfWApO1xuICAgIH1cbiAgICB1cmwgKz0gb3B0aW9ucy5qb2luKCcmJyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nU2VydmljZScsIFtdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9Sb3V0aW5nU2VydmljZScsIFJvdXRpbmdTZXJ2aWNlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ0NvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudCc7XG5pbXBvcnQgJy4vcm91dGluZy5zY3NzJztcbmV4cG9ydCBkZWZhdWx0IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ01vZHVsZScsIFtuZ2VvUm91dGluZ1JvdXRpbmdDb21wb25lbnQubmFtZV0pOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJuZ2VvLW5vbWluYXRpbS1pbnB1dFwiPlxcbiAgPGlucHV0XFxuICAgIHR5cGU9XCJ0ZXh0XCJcXG4gICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxcbiAgICBwbGFjZWhvbGRlcj1cInt7JGN0cmwucGxhY2Vob2xkZXJ9fVwiXFxuICAgIG5nLW1vZGVsPVwiJGN0cmwuaW5wdXRWYWx1ZVwiXFxuICAgIG5nZW8tc2VhcmNoPVwiJGN0cmwub3B0aW9uc1wiXFxuICAgIG5nZW8tc2VhcmNoLWRhdGFzZXRzPVwiJGN0cmwuZGF0YXNldHNcIlxcbiAgICBuZ2VvLXNlYXJjaC1saXN0ZW5lcnM9XCIkY3RybC5saXN0ZW5lcnNcIlxcbiAgLz5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZ1wiPlxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1zdGFydCBmb3JtLWdyb3VwXCI+XFxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cIiRjdHJsLnN0YXJ0RmVhdHVyZV9cIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZpbGwtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRGaWxsXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRTdHJva2VcIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiXFxuICAgID5cXG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy12aWFzIGZvcm0tZ3JvdXBcIiBuZy1yZXBlYXQ9XCIoaW5kZXgsIHZpYSkgaW4gJGN0cmwudmlhQXJyYXlcIj5cXG4gICAgPGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4gICAgICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCIkY3RybC5tYXBcIlxcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1mZWF0dXJlPVwidmlhLmZlYXR1cmVcIlxcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLnZpYUZpbGxcIlxcbiAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMudmlhU3Ryb2tlXCJcXG4gICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcXG4gICAgICAgID5cXG4gICAgICAgIDwvbmdlby1yb3V0aW5nLWZlYXR1cmU+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWUgZGVsZXRlLXZpYVwiIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlVmlhKGluZGV4KVwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvc3Bhbj5cXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctZGVzdGluYXRpb24gZm9ybS1ncm91cFwiPlxcbiAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCIkY3RybC5tYXBcIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCIkY3RybC50YXJnZXRGZWF0dXJlX1wiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy5kZXN0aW5hdGlvbkZpbGxcIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLXN0cm9rZS1jb2xvcj1cIiRjdHJsLmNvbG9ycy5kZXN0aW5hdGlvblN0cm9rZVwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtb24tY2hhbmdlPVwiJGN0cmwuaGFuZGxlQ2hhbmdlXCJcXG4gICAgPlxcbiAgICA8L25nZW8tcm91dGluZy1mZWF0dXJlPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmaWxsXCI+XFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHByaW1lXCIgbmctY2xpY2s9XCIkY3RybC5jbGVhclJvdXRlKClcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9zcGFuPiA8c3BhbiB0cmFuc2xhdGU+Q2xlYXI8L3NwYW4+XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwucmV2ZXJzZVJvdXRlKClcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWV4Y2hhbmdlLWFsdFwiPjwvc3Bhbj4gPHNwYW4gdHJhbnNsYXRlPlJldmVyc2U8L3NwYW4+XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwuYWRkVmlhKClcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXBsdXNcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5BZGQgdmlhPC9zcGFuPlxcbiAgICA8L2J1dHRvbj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cImNsZWFyZml4XCI+PC9kaXY+XFxuXFxuICA8ZGl2IG5nLWlmPVwiJGN0cmwucm91dGluZ1Byb2ZpbGVzLmxlbmd0aCA+IDFcIj5cXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG4gICAgICA8bGFiZWwgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBjb2wtbWQtNFwiIHRyYW5zbGF0ZT5Qcm9maWxlPC9sYWJlbD5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj5cXG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuZy1tb2RlbD1cIiRjdHJsLnNlbGVjdGVkUm91dGluZ1Byb2ZpbGVcIj5cXG4gICAgICAgICAgPG9wdGlvbiBuZy1yZXBlYXQ9XCJwcm9maWxlIGluICRjdHJsLnJvdXRpbmdQcm9maWxlc1wiIG5nLXZhbHVlPVwicHJvZmlsZVwiPnt7cHJvZmlsZS5sYWJlbH19PC9vcHRpb24+XFxuICAgICAgICA8L3NlbGVjdD5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctZXJyb3IgZm9ybS1ncm91cCBjbGVhcmZpeFwiIG5nLWhpZGU9XCIkY3RybC5lcnJvck1lc3NhZ2UgPT09IFxcJ1xcJ1wiPlxcbiAgICB7eyRjdHJsLmVycm9yTWVzc2FnZX19XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxcblxcbiAgPGRpdiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbCAmJiAkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cXG4gICAgICAgIDxzdHJvbmcgdHJhbnNsYXRlPlJvdXRlIHN0YXRpc3RpY3M8L3N0cm9uZz5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBuZy1oaWRlPVwiJGN0cmwucm91dGVEdXJhdGlvbiA9PT0gbnVsbFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCB0ZXh0LXJpZ2h0XCIgdHJhbnNsYXRlPkR1cmF0aW9uPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCI+e3skY3RybC5yb3V0ZUR1cmF0aW9uIHwgbmdlb0R1cmF0aW9ufX08L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBuZy1oaWRlPVwiJGN0cmwucm91dGVEaXN0YW5jZSA8PSAwXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00IHRleHQtcmlnaHRcIiB0cmFuc2xhdGU+RGlzdGFuY2U8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLThcIj57eyRjdHJsLnJvdXRlRGlzdGFuY2UgfCBuZ2VvVW5pdFByZWZpeDpcXCdtXFwnfX08L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1mZWF0dXJlXCI+XFxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPG5nZW8tbm9taW5hdGltLWlucHV0XFxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtdmFsdWU9XCIkY3RybC5mZWF0dXJlTGFiZWxcIlxcbiAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LXBsYWNlaG9sZGVyPVwie3tcXCdTZWFyY2guLi5cXCcgfCB0cmFuc2xhdGV9fVwiXFxuICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtb24tc2VsZWN0PVwiJGN0cmwub25TZWxlY3RcIlxcbiAgICA+XFxuICAgIDwvbmdlby1ub21pbmF0aW0taW5wdXQ+XFxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBidG5cIiBuZy1jbGljaz1cIiRjdHJsLnNldCgpXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1tYXAtbWFya2VyXCI+PC9zcGFuPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaE1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=