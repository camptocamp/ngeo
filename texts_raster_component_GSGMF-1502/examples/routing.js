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
/******/ 	deferredModules.push([39,"commons"]);
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
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/routing/module.js */ "./src/routing/module.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

/**
 * The application's main directive.
 * @constructor
 * @ngInject
 */
function MainController() {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
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
/* harmony import */ var ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/search/searchDirective.js */ "./src/search/searchDirective.js");
/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ "./src/routing/NominatimService.js");
Controller.$inject = ["$element", "$scope", "ngeoNominatimService"];



var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingNominatimInputComponent', [ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/nominatiminput', __webpack_require__(/*! ./nominatiminput.html */ "./src/routing/nominatiminput.html"));
}]);
myModule.value('ngeoRoutingNominatimInputComponentTemplateUrl', function ($attrs) {
  var templateUrl = $attrs.ngeoRoutingNominatimInputComponentTemplateUrl;
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

var routingNominatimInputComponent = {
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
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
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
  var url = this.nominatimUrl_ + "search?q=" + query;
  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);
  params.format = 'json';

  if (params) {
    url += '&';
    var options = [];

    for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {
      var option = _Object$keys[_i];
      options.push(option + "=" + params[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

NominatimService.prototype.reverse = function (coordinate, params) {
  var url = this.nominatimUrl_ + "reverse";
  params = Object.assign({}, params);
  params.lon = "" + coordinate[0];
  params.lat = "" + coordinate[1];
  params.format = 'json';

  if (params) {
    url += '?';
    var options = [];

    for (var _i2 = 0, _Object$keys2 = Object.keys(params); _i2 < _Object$keys2.length; _i2++) {
      var option = _Object$keys2[_i2];
      options.push(option + "=" + params[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

NominatimService.prototype.typeaheadSource_ = function (query, syncResults, asyncResults) {
  var onSuccess_ = function onSuccess_(resp) {
    var parse = function parse(result) {
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

  var onError_ = function onError_(resp) {
    if (asyncResults) {
      asyncResults([]);
    } else {
      syncResults([]);
    }
  };

  this.search(query, {}).then(onSuccess_, onError_);
};

var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoNominatimService', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
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
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/RoutingService.js */ "./src/routing/RoutingService.js");
/* harmony import */ var ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/routing/RoutingFeatureComponent.js */ "./src/routing/RoutingFeatureComponent.js");
/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/GeoJSON.js */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/proj.js */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_16__);

















var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingComponent', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/routing', __webpack_require__(/*! ./routing.html */ "./src/routing/routing.html"));
}]);
myModule.value('ngeoRoutingTemplateUrl', function ($attrs) {
  var templateUrl = $attrs.ngeoRoutingTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
});
ngeoRoutingTemplateUrl.$inject = ["$attrs", "ngeoRoutingTemplateUrl"];

function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}

var Controller = function () {
  Controller.$inject = ["$scope", "ngeoRoutingService", "ngeoNominatimService", "$q", "ngeoDebounce", "ngeoRoutingOptions"];

  function Controller($scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce, ngeoRoutingOptions) {
    var _this = this;

    this.$scope_ = $scope;
    this.ngeoRoutingService_ = ngeoRoutingService;
    this.ngeoNominatimService_ = ngeoNominatimService;
    this.routingOptions_ = ngeoRoutingOptions;
    this.routingProfiles = this.routingOptions_.profiles || [];
    this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;
    $scope.$watch(function () {
      return _this.selectedRoutingProfile;
    }, this.calculateRoute.bind(this));
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
    this.routeSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      features: []
    });
    this.routeLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: this.routeSource_,
      style: new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
          color: this.colors.lineRGBA
        }),
        stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
          color: this.colors.lineRGBA,
          width: 5
        })
      })
    });
    this.routeDistance = 0;
    this.routeDuration = null;
    this.regexIsFormattedCoord = /\d+\.\d+\/\d+\.\d+/;
    this.draw_ = null;
    var debounceDelay = 200;
    this.handleChange = ngeoDebounce(this.calculateRoute.bind(this), debounceDelay, true);
  }

  var _proto = Controller.prototype;

  _proto.$onInit = function $onInit() {
    if (this.map) {
      this.map.addLayer(this.routeLayer_);
    }
  };

  _proto.clearRoute = function clearRoute() {
    this.startFeature_ = null;
    this.targetFeature_ = null;
    this.viaArray = [];
    this.routeDistance = 0;
    this.routeDuration = null;
    this.routeSource_.clear();
    this.errorMessage = '';
  };

  _proto.getLonLatFromPoint_ = function getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }

    var geometry = point.getGeometry();

    if (!(geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__["default"])) {
      throw new Error('Wrong time values type');
    }

    var coords = geometry.getCoordinates();
    var projection = this.map.getView().getProjection();
    return Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_13__["toLonLat"])(coords, projection);
  };

  _proto.reverseRoute = function reverseRoute() {
    var tmpFeature = this.startFeature_;
    this.startFeature_ = this.targetFeature_;
    this.targetFeature_ = tmpFeature;
    this.viaArray = this.viaArray.reverse();
  };

  _proto.parseRoute_ = function parseRoute_(route) {
    if (!this.map) {
      return [];
    }

    var parsedRoutes = [];
    var format = new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
    var formatConfig = {
      dataProjection: 'EPSG:4326',
      featureProjection: this.map.getView().getProjection()
    };

    if (route.legs) {
      var _ref;

      var parsedRoutes_ = route.legs.map(function (leg) {
        return leg.steps.map(function (step) {
          return new ol_Feature_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
            geometry: format.readGeometry(step.geometry, formatConfig)
          });
        });
      });
      parsedRoutes = (_ref = []).concat.apply(_ref, parsedRoutes_);
    } else if (route.geometry) {
      parsedRoutes.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
        geometry: format.readGeometry(route.geometry, formatConfig)
      }));
    }

    return parsedRoutes;
  };

  _proto.calculateRoute = function calculateRoute() {
    var _this2 = this;

    if (!this.startFeature_ || !this.targetFeature_) {
      return;
    }

    this.routeSource_.clear();
    var coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    var coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    var vias = this.viaArray.filter(function (via) {
      return via.feature !== null;
    }).map(function (via) {
      return _this2.getLonLatFromPoint_(via.feature);
    });
    var route = [coordFrom].concat(vias, [coordTo]);

    var onSuccess_ = function onSuccess_(resp) {
      if (!_this2.map || !_this2.startFeature_ || !_this2.targetFeature_) {
        return;
      }

      var features = _this2.parseRoute_(resp.data.routes[0]);

      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }

      _this2.routeSource_.addFeatures(features);

      _this2.map.getView().fit(_this2.routeSource_.getExtent());

      _this2.routeDistance = resp.data.routes[0].distance;
      _this2.routeDuration = resp.data.routes[0].duration;
      var startRoute = features[0].getGeometry().getCoordinateAt(0);
      var endRoute = features[features.length - 1].getGeometry().getCoordinateAt(1);
      var startToRoute = [_this2.startFeature_.getGeometry().getCoordinates(), startRoute];
      var routeToEnd = [endRoute, _this2.targetFeature_.getGeometry().getCoordinates()];
      var routeConnections = [new ol_Feature_js__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_15__["default"](startToRoute)), new ol_Feature_js__WEBPACK_IMPORTED_MODULE_14__["default"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_15__["default"](routeToEnd))];

      _this2.routeSource_.addFeatures(routeConnections);
    };

    var onError_ = function onError_(resp) {
      _this2.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    };

    var options = {};
    options.steps = true;
    options.overview = false;
    options.geometries = 'geojson';
    var config = {};
    config.options = options;

    if (this.selectedRoutingProfile) {
      config.instance = this.selectedRoutingProfile.profile;
    }

    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_, onError_);
  };

  _proto.addVia = function addVia() {
    this.viaArray.push({});
  };

  _proto.deleteVia = function deleteVia(index) {
    if (this.viaArray.length > index) {
      this.viaArray.splice(index, 1);
      this.calculateRoute();
    }
  };

  return Controller;
}();
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
/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_NominatimInputComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimInputComponent.js */ "./src/routing/NominatimInputComponent.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj.js */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Collection.js */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Text_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Text.js */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_interaction_Modify_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/interaction/Modify.js */ "./node_modules/ol/interaction/Modify.js");
/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/interaction/Draw.js */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__);
















var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingFeatureComponent', [ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimInputComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/routingfeature', __webpack_require__(/*! ./routingfeature.html */ "./src/routing/routingfeature.html"));
}]);
myModule.value('ngeoRoutingFeatureTemplateUrl', function ($attrs) {
  var templateUrl = $attrs.ngeoRoutingFeatureTemplateUrl;
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';
});
ngeoRoutingFeatureTemplateUrl.$inject = ["$attrs", "ngeoRoutingFeatureTemplateUrl"];

function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}

var Controller = function () {
  Controller.$inject = ["$scope", "$timeout", "$q", "ngeoNominatimService"];

  function Controller($scope, $timeout, $q, ngeoNominatimService) {
    var _this = this;

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
    this.vectorFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.vectorSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      features: this.vectorFeatures_
    });
    this.vectorLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
      source: this.vectorSource_,
      style: function style(feature, resolution) {
        return [new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
          text: new ol_style_Text_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
            fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
              color: _this.fillColor || '#000000'
            }),
            font: '900 24px "Font Awesome 5 Free"',
            stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
              width: 3,
              color: _this.strokeColor || '#000000'
            }),
            offsetY: -15,
            text: "\uF041"
          })
        })];
      }
    });
    this.modifyFeature_ = new ol_interaction_Modify_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      features: this.vectorFeatures_
    });
    this.draw_ = null;
    this.onSelect = this.onSelect_.bind(this);
    this.errorMessage = '';
  }

  var _proto = Controller.prototype;

  _proto.$onInit = function $onInit() {
    var _this2 = this;

    if (!this.map) {
      return;
    }

    this.map.addLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(true);
    this.map.addInteraction(this.modifyFeature_);
    this.modifyFeature_.on('modifyend', function (event) {
      var feature = event.features.getArray()[0];

      _this2.vectorSource_.clear();

      _this2.snapFeature_(feature);
    });
    this.scope_.$watch(function () {
      return _this2.feature;
    }, function (newVal, oldVal) {
      if (newVal) {
        _this2.onFeatureChange_();
      }

      if (newVal === null) {
        _this2.vectorSource_.clear();

        _this2.featureLabel = '';
      }
    });
  };

  _proto.$onDestroy = function $onDestroy() {
    if (!this.map) {
      return;
    }

    this.map.removeLayer(this.vectorLayer_);
    this.modifyFeature_.setActive(false);
    this.map.removeInteraction(this.modifyFeature_);
  };

  _proto.set = function set() {
    var _this3 = this;

    if (!this.map) {
      return;
    }

    if (this.draw_) {
      this.map.removeInteraction(this.draw_);
    }

    this.draw_ = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
      features: this.vectorFeatures_,
      type: 'Point'
    });
    this.draw_.on('drawstart', function () {
      if (_this3.feature) {
        _this3.vectorSource_.removeFeature(_this3.feature);
      }
    });
    this.draw_.on('drawend', function (event) {
      if (_this3.draw_ && _this3.map) {
        _this3.map.removeInteraction(_this3.draw_);
      }

      _this3.snapFeature_(event.feature);

      _this3.modifyFeature_.setActive(true);
    });
    this.modifyFeature_.setActive(false);
    this.map.addInteraction(this.draw_);
  };

  _proto.setFeature_ = function setFeature_(coordinate, label) {
    if (!this.map) {
      return;
    }

    var transformedCoordinate = ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"](coordinate, this.map.getView().getProjection());

    if (label === '') {
      label = transformedCoordinate.join('/');
    }

    this.feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"](transformedCoordinate),
      name: label
    });
  };

  _proto.onFeatureChange_ = function onFeatureChange_() {
    var _this4 = this;

    if (!this.feature) {
      return;
    }

    this.featureLabel = this.feature.get('name') || '';
    this.vectorSource_.clear();
    this.vectorSource_.addFeature(this.feature);

    if (this.onChange) {
      this.timeout_(function () {
        if (_this4.feature && _this4.onChange) {
          _this4.onChange(_this4.feature);
        }
      });
    }
  };

  _proto.onSelect_ = function onSelect_(selected) {
    var coordinate = selected.coordinate.map(parseFloat);
    var label = selected.label;
    this.setFeature_(coordinate, label);
    var newCoordinates = this.feature.getGeometry().getCoordinates();
    this.map.getView().setCenter(newCoordinates);
  };

  _proto.snapFeature_ = function snapFeature_(feature) {
    var _this5 = this;

    var coord = this.getLonLatFromPoint_(feature);

    if (!coord) {
      return;
    }

    var config = {};

    var onSuccess = function onSuccess(resp) {
      var lon = parseFloat(resp.data.lon);
      var lat = parseFloat(resp.data.lat);
      var coordinate = [lon, lat];
      var label = resp.data.display_name;

      _this5.setFeature_(coordinate, label);
    };

    var onError = function onError(resp) {
      _this5.errorMessage = 'Error: nominatim server not responding.';
      console.log(resp);
    };

    this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess, onError);
  };

  _proto.getLonLatFromPoint_ = function getLonLatFromPoint_(point) {
    if (!this.map) {
      return null;
    }

    var geometry = point.getGeometry();
    var coords = geometry.getCoordinates();
    var projection = this.map.getView().getProjection();
    return ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["toLonLat"](coords, projection);
  };

  return Controller;
}();
var routingFeatureComponent = {
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

  var url = this.ngeoOsrmBackendUrl_;

  if (config.instance) {
    url += config.instance + "/";
  }

  url += config.service + "/" + this.protocolVersion_ + "/" + config.profile + "/";
  var coordinateString = coordinates.map(function (c) {
    return c.join(',');
  }).join(';');
  url += coordinateString;

  if (config.options) {
    url += '?';
    var options = [];

    for (var _i = 0, _Object$keys = Object.keys(config.options); _i < _Object$keys.length; _i++) {
      var option = _Object$keys[_i];
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

  var url = this.ngeoOsrmBackendUrl_;

  if (config.instance) {
    url += config.instance + "/";
  }

  url += config.service + "/" + this.protocolVersion_ + "/" + config.profile + "/";
  var coordinateString = coordinate.join(',');
  url += coordinateString;

  if (config.options) {
    url += '?';
    var options = [];

    for (var _i2 = 0, _Object$keys2 = Object.keys(config.options); _i2 < _Object$keys2.length; _i2++) {
      var option = _Object$keys2[_i2];
      options.push(option + "=" + config.options[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingService', []);
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
/* harmony import */ var ngeo_routing_RoutingComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/RoutingComponent.js */ "./src/routing/RoutingComponent.js");
/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing.scss */ "./src/routing/routing.scss");
/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_routing_scss__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingModule', [ngeo_routing_RoutingComponent_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]));

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
__p += '<div class="ngeo-nominatim-input">\n  <input type="text"\n         class="form-control"\n         placeholder="{{$ctrl.placeholder}}"\n         ng-model="$ctrl.inputValue"\n         ngeo-search="$ctrl.options"\n         ngeo-search-datasets="$ctrl.datasets"\n         ngeo-search-listeners="$ctrl.listeners">\n</div>\n';

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
__p += '<div class="ngeo-routing">\n  <div class="ngeo-routing-start form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.startFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors.startFill"\n      ngeo-routing-feature-stroke-color="$ctrl.colors.startStroke"\n      ngeo-routing-feature-on-change="$ctrl.handleChange">\n    </ngeo-routing-feature>\n  </div>\n\n    <div class="ngeo-routing-vias form-group" ng-repeat="(index, via) in $ctrl.viaArray">\n      <div class="form-inline">\n        <div class="form-group">\n          <ngeo-routing-feature\n            ngeo-routing-feature-map="$ctrl.map"\n            ngeo-routing-feature-feature="via.feature"\n            ngeo-routing-feature-fill-color="$ctrl.colors.viaFill"\n            ngeo-routing-feature-stroke-color="$ctrl.colors.viaStroke"\n            ngeo-routing-feature-on-change="$ctrl.handleChange">\n          </ngeo-routing-feature>\n        </div>\n        <button type="button" class="btn prime delete-via" ng-click="$ctrl.deleteVia(index)">\n          <span class="fa fa-trash"></span>\n        </button>\n      </div>\n    </div>\n\n  <div class="ngeo-routing-destination form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.targetFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors.destinationFill"\n      ngeo-routing-feature-stroke-color="$ctrl.colors.destinationStroke"\n      ngeo-routing-feature-on-change="$ctrl.handleChange">\n    </ngeo-routing-feature>\n  </div>\n\n  <div class="form-group fill">\n    <button type="button" class="btn prime" ng-click="$ctrl.clearRoute()">\n      <span class="fa fa-trash"></span> <span translate>Clear</span>\n    </button>\n    <button type="button" class="btn prime" ng-click="$ctrl.reverseRoute()">\n      <span class="fa fa-exchange-alt"></span> <span translate>Reverse</span>\n    </button>\n    <button type="button" class="btn prime" ng-click="$ctrl.addVia()">\n      <span class="fa fa-plus"></span> <span translate>Add via</span>\n    </button>\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-if="$ctrl.routingProfiles.length > 1">\n    <div class="form-group">\n      <label class="col-form-label col-md-4" translate>Profile</label>\n      <div class="col-md-8">\n        <select class="form-control" ng-model="$ctrl.selectedRoutingProfile">\n          <option ng-repeat="profile in $ctrl.routingProfiles" ng-value="profile">{{profile.label}}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n  <div class="ngeo-routing-error form-group clearfix"\n       ng-hide="$ctrl.errorMessage === \'\'">\n    {{$ctrl.errorMessage}}\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-hide="$ctrl.routeDuration === null && $ctrl.routeDistance <= 0">\n    <div class="row">\n      <div class="col-md-12">\n        <strong translate>Route statistics</strong>\n      </div>\n    </div>\n    <div class="row" ng-hide="$ctrl.routeDuration === null">\n      <div class="col-md-4 text-right" translate>\n        Duration\n      </div>\n      <div class="col-md-8">\n        {{$ctrl.routeDuration | ngeoDuration}}\n      </div>\n    </div>\n\n    <div class="row" ng-hide="$ctrl.routeDistance <= 0">\n      <div class="col-md-4 text-right" translate>\n        Distance\n      </div>\n      <div class="col-md-8">\n        {{$ctrl.routeDistance | ngeoUnitPrefix:\'m\'}}\n      </div>\n    </div>\n  </div>\n</div>\n';

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
__p += '<div class="ngeo-routing-feature">\n    <div class="input-group">\n      <ngeo-nominatim-input\n        ngeo-nominatim-input-value="$ctrl.featureLabel"\n        ngeo-nominatim-input-placeholder="{{\'Search...\' | translate}}"\n        ngeo-nominatim-input-on-select="$ctrl.onSelect">\n      </ngeo-nominatim-input>\n      <div class="input-group-addon btn" ng-click="$ctrl.set()">\n        <span class="fa fa-map-marker"></span>\n      </div>\n    </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ 39:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9yb3V0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9Sb3V0aW5nU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvbm9taW5hdGltaW5wdXQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGluZy9yb3V0aW5nLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRpbmcvcm91dGluZ2ZlYXR1cmUuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicm91dGluZ1wiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMzksXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE4LTIwMjEgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLyoqXG4gKiBUaGlzIGV4YW1wbGUgc2hvd3MgdGhlIG5nZW8gcm91dGluZyBkaXJlY3RpdmUuXG4gKi9cbmltcG9ydCAnLi9yb3V0aW5nLmNzcyc7XG5pbXBvcnQgJ29sL29sLmNzcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2ZvbnRhd2Vzb21lLm1pbi5jc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdNb2R1bGUgZnJvbSAnbmdlby9yb3V0aW5nL21vZHVsZS5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb1JvdXRpbmdNb2R1bGUubmFtZV0pO1xuXG4vKipcbiAqIFRoZSBhcHBsaWNhdGlvbidzIG1haW4gZGlyZWN0aXZlLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwib2wvTWFwLmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzkzMTAxMC4xNTM1OTg5NDQyLCA1OTYxNzA1Ljg0MjI5NzI1NF0sXG4gICAgICB6b29tOiA5LFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnJvdXRpbmdQYW5lbEFjdGl2ZSA9IHRydWU7XG59XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Sb3V0aW5nT3B0aW9ucycsIHt9KTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTm9taW5hdGltVXJsJywgJ2h0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnLycpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zJywge30pO1xuXG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRlbGVtZW50XCIsIFwiJHNjb3BlXCIsIFwibmdlb05vbWluYXRpbVNlcnZpY2VcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvU2VhcmNoU2VhcmNoRGlyZWN0aXZlIGZyb20gJ25nZW8vc2VhcmNoL3NlYXJjaERpcmVjdGl2ZS5qcyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlLmpzJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50JywgW25nZW9TZWFyY2hTZWFyY2hEaXJlY3RpdmUubmFtZSwgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlLm5hbWVdKTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvbm9taW5hdGltaW5wdXQnLCByZXF1aXJlKCcuL25vbWluYXRpbWlucHV0Lmh0bWwnKSk7XG59XSk7XG5teU1vZHVsZS52YWx1ZSgnbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKCRhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9ub21pbmF0aW1pbnB1dCc7XG59KTtcbm5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsXCJdO1xuXG5mdW5jdGlvbiBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvUm91dGluZ05vbWluYXRpbUlucHV0Q29tcG9uZW50VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnRUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcigkZWxlbWVudCwgJHNjb3BlLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICB0aGlzLmVsZW1lbnRfID0gJGVsZW1lbnQ7XG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcbiAgdGhpcy5uZ2VvTm9taW5hdGltU2VydmljZSA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuICB0aGlzLm9uU2VsZWN0ID0gbnVsbDtcbiAgdGhpcy5pbnB1dFZhbHVlID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0ge307XG4gIHRoaXMuZGF0YXNldHMgPSBbe1xuICAgIG5hbWU6ICdub21pbmF0aW0nLFxuICAgIGRpc3BsYXk6ICduYW1lJyxcbiAgICBzb3VyY2U6IHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2UudHlwZWFoZWFkU291cmNlRGVib3VuY2VkXG4gIH1dO1xuICB0aGlzLmxpc3RlbmVycyA9IHtcbiAgICBzZWxlY3Q6IHRoaXMuc2VsZWN0Xy5iaW5kKHRoaXMpXG4gIH07XG4gIHRoaXMucGxhY2Vob2xkZXIgPSAnJztcbn1cblxuQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0XyA9IGZ1bmN0aW9uIChldmVudCwgc3VnZ2VzdGlvbiwgZGF0YXNldCkge1xuICBpZiAodGhpcy5vblNlbGVjdCkge1xuICAgIHRoaXMub25TZWxlY3Qoc3VnZ2VzdGlvbik7XG4gIH1cbn07XG5cbnZhciByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ29uU2VsZWN0JzogJz0/bmdlb05vbWluYXRpbUlucHV0T25TZWxlY3QnLFxuICAgICdpbnB1dFZhbHVlJzogJz0/bmdlb05vbWluYXRpbUlucHV0VmFsdWUnLFxuICAgICdwbGFjZWhvbGRlcic6ICdAP25nZW9Ob21pbmF0aW1JbnB1dFBsYWNlaG9sZGVyJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudFRlbXBsYXRlVXJsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvTm9taW5hdGltSW5wdXQnLCByb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiTm9taW5hdGltU2VydmljZS4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCJuZ2VvRGVib3VuY2VcIiwgXCJuZ2VvTm9taW5hdGltVXJsXCIsIFwibmdlb05vbWluYXRpbVNlYXJjaERlZmF1bHRQYXJhbXNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZS5qcyc7XG5leHBvcnQgZnVuY3Rpb24gTm9taW5hdGltU2VydmljZSgkaHR0cCwgbmdlb0RlYm91bmNlLCBuZ2VvTm9taW5hdGltVXJsLCBuZ2VvTm9taW5hdGltU2VhcmNoRGVmYXVsdFBhcmFtcykge1xuICB0aGlzLiRodHRwXyA9ICRodHRwO1xuICB0aGlzLm5nZW9EZWJvdW5jZV8gPSBuZ2VvRGVib3VuY2U7XG4gIHRoaXMubm9taW5hdGltVXJsXyA9IG5nZW9Ob21pbmF0aW1Vcmw7XG5cbiAgaWYgKHRoaXMubm9taW5hdGltVXJsXy5zdWJzdHIoLTEpICE9PSAnLycpIHtcbiAgICB0aGlzLm5vbWluYXRpbVVybF8gKz0gJy8nO1xuICB9XG5cbiAgdGhpcy5zZWFyY2hEZWZhdWx0UGFyYW1zXyA9IG5nZW9Ob21pbmF0aW1TZWFyY2hEZWZhdWx0UGFyYW1zO1xuICB0aGlzLnR5cGVhaGVhZERlYm91bmNlRGVsYXlfID0gNTAwO1xuICB0aGlzLnR5cGVhaGVhZFNvdXJjZURlYm91bmNlZCA9IHRoaXMubmdlb0RlYm91bmNlXyh0aGlzLnR5cGVhaGVhZFNvdXJjZV8uYmluZCh0aGlzKSwgdGhpcy50eXBlYWhlYWREZWJvdW5jZURlbGF5XywgdHJ1ZSk7XG59XG5cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChxdWVyeSwgcGFyYW1zKSB7XG4gIHZhciB1cmwgPSB0aGlzLm5vbWluYXRpbVVybF8gKyBcInNlYXJjaD9xPVwiICsgcXVlcnk7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zZWFyY2hEZWZhdWx0UGFyYW1zXywgcGFyYW1zKTtcbiAgcGFyYW1zLmZvcm1hdCA9ICdqc29uJztcblxuICBpZiAocGFyYW1zKSB7XG4gICAgdXJsICs9ICcmJztcbiAgICB2YXIgb3B0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfT2JqZWN0JGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpOyBfaSA8IF9PYmplY3Qka2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBvcHRpb24gPSBfT2JqZWN0JGtleXNbX2ldO1xuICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbiArIFwiPVwiICsgcGFyYW1zW29wdGlvbl0pO1xuICAgIH1cblxuICAgIHVybCArPSBvcHRpb25zLmpvaW4oJyYnKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLiRodHRwXy5nZXQodXJsKTtcbn07XG5cbk5vbWluYXRpbVNlcnZpY2UucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgcGFyYW1zKSB7XG4gIHZhciB1cmwgPSB0aGlzLm5vbWluYXRpbVVybF8gKyBcInJldmVyc2VcIjtcbiAgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKTtcbiAgcGFyYW1zLmxvbiA9IFwiXCIgKyBjb29yZGluYXRlWzBdO1xuICBwYXJhbXMubGF0ID0gXCJcIiArIGNvb3JkaW5hdGVbMV07XG4gIHBhcmFtcy5mb3JtYXQgPSAnanNvbic7XG5cbiAgaWYgKHBhcmFtcykge1xuICAgIHVybCArPSAnPyc7XG4gICAgdmFyIG9wdGlvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIF9pMiA9IDAsIF9PYmplY3Qka2V5czIgPSBPYmplY3Qua2V5cyhwYXJhbXMpOyBfaTIgPCBfT2JqZWN0JGtleXMyLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBvcHRpb24gPSBfT2JqZWN0JGtleXMyW19pMl07XG4gICAgICBvcHRpb25zLnB1c2gob3B0aW9uICsgXCI9XCIgKyBwYXJhbXNbb3B0aW9uXSk7XG4gICAgfVxuXG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuTm9taW5hdGltU2VydmljZS5wcm90b3R5cGUudHlwZWFoZWFkU291cmNlXyA9IGZ1bmN0aW9uIChxdWVyeSwgc3luY1Jlc3VsdHMsIGFzeW5jUmVzdWx0cykge1xuICB2YXIgb25TdWNjZXNzXyA9IGZ1bmN0aW9uIG9uU3VjY2Vzc18ocmVzcCkge1xuICAgIHZhciBwYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29vcmRpbmF0ZTogW3Jlc3VsdC5sb24sIHJlc3VsdC5sYXRdLFxuICAgICAgICBuYW1lOiByZXN1bHQuZGlzcGxheV9uYW1lXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBpZiAoYXN5bmNSZXN1bHRzKSB7XG4gICAgICBhc3luY1Jlc3VsdHMocmVzcC5kYXRhLm1hcChwYXJzZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jUmVzdWx0cyhyZXNwLmRhdGEubWFwKHBhcnNlKSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBvbkVycm9yXyA9IGZ1bmN0aW9uIG9uRXJyb3JfKHJlc3ApIHtcbiAgICBpZiAoYXN5bmNSZXN1bHRzKSB7XG4gICAgICBhc3luY1Jlc3VsdHMoW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzeW5jUmVzdWx0cyhbXSk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuc2VhcmNoKHF1ZXJ5LCB7fSkudGhlbihvblN1Y2Nlc3NfLCBvbkVycm9yXyk7XG59O1xuXG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb05vbWluYXRpbVNlcnZpY2UnLCBbbmdlb01pc2NEZWJvdW5jZS5uYW1lXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvTm9taW5hdGltU2VydmljZScsIE5vbWluYXRpbVNlcnZpY2UpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UuanMnO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycy5qcyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdOb21pbmF0aW1TZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Ob21pbmF0aW1TZXJ2aWNlLmpzJztcbmltcG9ydCBuZ2VvUm91dGluZ1JvdXRpbmdTZXJ2aWNlIGZyb20gJ25nZW8vcm91dGluZy9Sb3V0aW5nU2VydmljZS5qcyc7XG5pbXBvcnQgbmdlb1JvdXRpbmdSb3V0aW5nRmVhdHVyZUNvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0ZlYXR1cmVDb21wb25lbnQuanMnO1xuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTi5qcyc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludC5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3IuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IHsgdG9Mb25MYXQgfSBmcm9tICdvbC9wcm9qLmpzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcuanMnO1xuaW1wb3J0ICduZ2VvL3Nhc3MvZm9udC5zY3NzJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ0NvbXBvbmVudCcsIFtuZ2VvTWlzY0RlYm91bmNlLm5hbWUsIG5nZW9NaXNjRmlsdGVycy5uYW1lLCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSwgbmdlb1JvdXRpbmdSb3V0aW5nU2VydmljZS5uYW1lLCBuZ2VvUm91dGluZ1JvdXRpbmdGZWF0dXJlQ29tcG9uZW50Lm5hbWVdKTtcbm15TW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCduZ2VvL3JvdXRpbmcvcm91dGluZycsIHJlcXVpcmUoJy4vcm91dGluZy5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9Sb3V0aW5nVGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoJGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9ICRhdHRycy5uZ2VvUm91dGluZ1RlbXBsYXRlVXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vcm91dGluZy9yb3V0aW5nJztcbn0pO1xubmdlb1JvdXRpbmdUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb1JvdXRpbmdUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gbmdlb1JvdXRpbmdUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9Sb3V0aW5nVGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJuZ2VvUm91dGluZ1NlcnZpY2VcIiwgXCJuZ2VvTm9taW5hdGltU2VydmljZVwiLCBcIiRxXCIsIFwibmdlb0RlYm91bmNlXCIsIFwibmdlb1JvdXRpbmdPcHRpb25zXCJdO1xuXG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCBuZ2VvUm91dGluZ1NlcnZpY2UsIG5nZW9Ob21pbmF0aW1TZXJ2aWNlLCAkcSwgbmdlb0RlYm91bmNlLCBuZ2VvUm91dGluZ09wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuICAgIHRoaXMubmdlb1JvdXRpbmdTZXJ2aWNlXyA9IG5nZW9Sb3V0aW5nU2VydmljZTtcbiAgICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXyA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuICAgIHRoaXMucm91dGluZ09wdGlvbnNfID0gbmdlb1JvdXRpbmdPcHRpb25zO1xuICAgIHRoaXMucm91dGluZ1Byb2ZpbGVzID0gdGhpcy5yb3V0aW5nT3B0aW9uc18ucHJvZmlsZXMgfHwgW107XG4gICAgdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlID0gdGhpcy5yb3V0aW5nUHJvZmlsZXMubGVuZ3RoID4gMCA/IHRoaXMucm91dGluZ1Byb2ZpbGVzWzBdIDogbnVsbDtcbiAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlO1xuICAgIH0sIHRoaXMuY2FsY3VsYXRlUm91dGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy4kcV8gPSAkcTtcbiAgICB0aGlzLm1hcCA9IG51bGw7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnJztcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudmlhQXJyYXkgPSBbXTtcbiAgICB0aGlzLmNvbG9ycyA9IHtcbiAgICAgIHN0YXJ0RmlsbDogJyM2QkU2MkUnLFxuICAgICAgc3RhcnRTdHJva2U6ICcjNENCMDFFJyxcbiAgICAgIGRlc3RpbmF0aW9uRmlsbDogJyNGRjNFMTMnLFxuICAgICAgZGVzdGluYXRpb25TdHJva2U6ICcjQ0QzNDEyJyxcbiAgICAgIHZpYUZpbGw6ICcjNzY3Njc2JyxcbiAgICAgIHZpYVN0cm9rZTogJyMwMDAwMDAnLFxuICAgICAgbGluZVJHQkE6ICdyZ2JhKDE2LCAxMTIsIDI5LCAwLjYpJ1xuICAgIH07XG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8gPSBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgZmVhdHVyZXM6IFtdXG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZUxheWVyXyA9IG5ldyBvbExheWVyVmVjdG9yKHtcbiAgICAgIHNvdXJjZTogdGhpcy5yb3V0ZVNvdXJjZV8sXG4gICAgICBzdHlsZTogbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmxpbmVSR0JBXG4gICAgICAgIH0pLFxuICAgICAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMubGluZVJHQkEsXG4gICAgICAgICAgd2lkdGg6IDVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSk7XG4gICAgdGhpcy5yb3V0ZURpc3RhbmNlID0gMDtcbiAgICB0aGlzLnJvdXRlRHVyYXRpb24gPSBudWxsO1xuICAgIHRoaXMucmVnZXhJc0Zvcm1hdHRlZENvb3JkID0gL1xcZCtcXC5cXGQrXFwvXFxkK1xcLlxcZCsvO1xuICAgIHRoaXMuZHJhd18gPSBudWxsO1xuICAgIHZhciBkZWJvdW5jZURlbGF5ID0gMjAwO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gbmdlb0RlYm91bmNlKHRoaXMuY2FsY3VsYXRlUm91dGUuYmluZCh0aGlzKSwgZGVib3VuY2VEZWxheSwgdHJ1ZSk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLiRvbkluaXQgPSBmdW5jdGlvbiAkb25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5yb3V0ZUxheWVyXyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jbGVhclJvdXRlID0gZnVuY3Rpb24gY2xlYXJSb3V0ZSgpIHtcbiAgICB0aGlzLnN0YXJ0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudGFyZ2V0RmVhdHVyZV8gPSBudWxsO1xuICAgIHRoaXMudmlhQXJyYXkgPSBbXTtcbiAgICB0aGlzLnJvdXRlRGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucm91dGVEdXJhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yb3V0ZVNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9O1xuXG4gIF9wcm90by5nZXRMb25MYXRGcm9tUG9pbnRfID0gZnVuY3Rpb24gZ2V0TG9uTGF0RnJvbVBvaW50Xyhwb2ludCkge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBnZW9tZXRyeSA9IHBvaW50LmdldEdlb21ldHJ5KCk7XG5cbiAgICBpZiAoIShnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvaW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyB0aW1lIHZhbHVlcyB0eXBlJyk7XG4gICAgfVxuXG4gICAgdmFyIGNvb3JkcyA9IGdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHByb2plY3Rpb24gPSB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpO1xuICAgIHJldHVybiB0b0xvbkxhdChjb29yZHMsIHByb2plY3Rpb24pO1xuICB9O1xuXG4gIF9wcm90by5yZXZlcnNlUm91dGUgPSBmdW5jdGlvbiByZXZlcnNlUm91dGUoKSB7XG4gICAgdmFyIHRtcEZlYXR1cmUgPSB0aGlzLnN0YXJ0RmVhdHVyZV87XG4gICAgdGhpcy5zdGFydEZlYXR1cmVfID0gdGhpcy50YXJnZXRGZWF0dXJlXztcbiAgICB0aGlzLnRhcmdldEZlYXR1cmVfID0gdG1wRmVhdHVyZTtcbiAgICB0aGlzLnZpYUFycmF5ID0gdGhpcy52aWFBcnJheS5yZXZlcnNlKCk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUm91dGVfID0gZnVuY3Rpb24gcGFyc2VSb3V0ZV8ocm91dGUpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgdmFyIHBhcnNlZFJvdXRlcyA9IFtdO1xuICAgIHZhciBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XG4gICAgdmFyIGZvcm1hdENvbmZpZyA9IHtcbiAgICAgIGRhdGFQcm9qZWN0aW9uOiAnRVBTRzo0MzI2JyxcbiAgICAgIGZlYXR1cmVQcm9qZWN0aW9uOiB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpXG4gICAgfTtcblxuICAgIGlmIChyb3V0ZS5sZWdzKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgdmFyIHBhcnNlZFJvdXRlc18gPSByb3V0ZS5sZWdzLm1hcChmdW5jdGlvbiAobGVnKSB7XG4gICAgICAgIHJldHVybiBsZWcuc3RlcHMubWFwKGZ1bmN0aW9uIChzdGVwKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICAgICAgZ2VvbWV0cnk6IGZvcm1hdC5yZWFkR2VvbWV0cnkoc3RlcC5nZW9tZXRyeSwgZm9ybWF0Q29uZmlnKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcGFyc2VkUm91dGVzID0gKF9yZWYgPSBbXSkuY29uY2F0LmFwcGx5KF9yZWYsIHBhcnNlZFJvdXRlc18pO1xuICAgIH0gZWxzZSBpZiAocm91dGUuZ2VvbWV0cnkpIHtcbiAgICAgIHBhcnNlZFJvdXRlcy5wdXNoKG5ldyBvbEZlYXR1cmUoe1xuICAgICAgICBnZW9tZXRyeTogZm9ybWF0LnJlYWRHZW9tZXRyeShyb3V0ZS5nZW9tZXRyeSwgZm9ybWF0Q29uZmlnKVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWRSb3V0ZXM7XG4gIH07XG5cbiAgX3Byb3RvLmNhbGN1bGF0ZVJvdXRlID0gZnVuY3Rpb24gY2FsY3VsYXRlUm91dGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuc3RhcnRGZWF0dXJlXyB8fCAhdGhpcy50YXJnZXRGZWF0dXJlXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucm91dGVTb3VyY2VfLmNsZWFyKCk7XG4gICAgdmFyIGNvb3JkRnJvbSA9IHRoaXMuZ2V0TG9uTGF0RnJvbVBvaW50Xyh0aGlzLnN0YXJ0RmVhdHVyZV8pO1xuICAgIHZhciBjb29yZFRvID0gdGhpcy5nZXRMb25MYXRGcm9tUG9pbnRfKHRoaXMudGFyZ2V0RmVhdHVyZV8pO1xuICAgIHZhciB2aWFzID0gdGhpcy52aWFBcnJheS5maWx0ZXIoZnVuY3Rpb24gKHZpYSkge1xuICAgICAgcmV0dXJuIHZpYS5mZWF0dXJlICE9PSBudWxsO1xuICAgIH0pLm1hcChmdW5jdGlvbiAodmlhKSB7XG4gICAgICByZXR1cm4gX3RoaXMyLmdldExvbkxhdEZyb21Qb2ludF8odmlhLmZlYXR1cmUpO1xuICAgIH0pO1xuICAgIHZhciByb3V0ZSA9IFtjb29yZEZyb21dLmNvbmNhdCh2aWFzLCBbY29vcmRUb10pO1xuXG4gICAgdmFyIG9uU3VjY2Vzc18gPSBmdW5jdGlvbiBvblN1Y2Nlc3NfKHJlc3ApIHtcbiAgICAgIGlmICghX3RoaXMyLm1hcCB8fCAhX3RoaXMyLnN0YXJ0RmVhdHVyZV8gfHwgIV90aGlzMi50YXJnZXRGZWF0dXJlXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBmZWF0dXJlcyA9IF90aGlzMi5wYXJzZVJvdXRlXyhyZXNwLmRhdGEucm91dGVzWzBdKTtcblxuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTm8gcm91dGUgb3Igbm90IHN1cHBvcnRlZCBmb3JtYXQuJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyLnJvdXRlU291cmNlXy5hZGRGZWF0dXJlcyhmZWF0dXJlcyk7XG5cbiAgICAgIF90aGlzMi5tYXAuZ2V0VmlldygpLmZpdChfdGhpczIucm91dGVTb3VyY2VfLmdldEV4dGVudCgpKTtcblxuICAgICAgX3RoaXMyLnJvdXRlRGlzdGFuY2UgPSByZXNwLmRhdGEucm91dGVzWzBdLmRpc3RhbmNlO1xuICAgICAgX3RoaXMyLnJvdXRlRHVyYXRpb24gPSByZXNwLmRhdGEucm91dGVzWzBdLmR1cmF0aW9uO1xuICAgICAgdmFyIHN0YXJ0Um91dGUgPSBmZWF0dXJlc1swXS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVBdCgwKTtcbiAgICAgIHZhciBlbmRSb3V0ZSA9IGZlYXR1cmVzW2ZlYXR1cmVzLmxlbmd0aCAtIDFdLmdldEdlb21ldHJ5KCkuZ2V0Q29vcmRpbmF0ZUF0KDEpO1xuICAgICAgdmFyIHN0YXJ0VG9Sb3V0ZSA9IFtfdGhpczIuc3RhcnRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCksIHN0YXJ0Um91dGVdO1xuICAgICAgdmFyIHJvdXRlVG9FbmQgPSBbZW5kUm91dGUsIF90aGlzMi50YXJnZXRGZWF0dXJlXy5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCldO1xuICAgICAgdmFyIHJvdXRlQ29ubmVjdGlvbnMgPSBbbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhzdGFydFRvUm91dGUpKSwgbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tTGluZVN0cmluZyhyb3V0ZVRvRW5kKSldO1xuXG4gICAgICBfdGhpczIucm91dGVTb3VyY2VfLmFkZEZlYXR1cmVzKHJvdXRlQ29ubmVjdGlvbnMpO1xuICAgIH07XG5cbiAgICB2YXIgb25FcnJvcl8gPSBmdW5jdGlvbiBvbkVycm9yXyhyZXNwKSB7XG4gICAgICBfdGhpczIuZXJyb3JNZXNzYWdlID0gJ0Vycm9yOiByb3V0aW5nIHNlcnZlciBub3QgcmVzcG9uZGluZy4nO1xuICAgICAgY29uc29sZS5sb2cocmVzcCk7XG4gICAgfTtcblxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgb3B0aW9ucy5zdGVwcyA9IHRydWU7XG4gICAgb3B0aW9ucy5vdmVydmlldyA9IGZhbHNlO1xuICAgIG9wdGlvbnMuZ2VvbWV0cmllcyA9ICdnZW9qc29uJztcbiAgICB2YXIgY29uZmlnID0ge307XG4gICAgY29uZmlnLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRSb3V0aW5nUHJvZmlsZSkge1xuICAgICAgY29uZmlnLmluc3RhbmNlID0gdGhpcy5zZWxlY3RlZFJvdXRpbmdQcm9maWxlLnByb2ZpbGU7XG4gICAgfVxuXG4gICAgdGhpcy4kcV8ud2hlbih0aGlzLm5nZW9Sb3V0aW5nU2VydmljZV8uZ2V0Um91dGUocm91dGUsIGNvbmZpZykpLnRoZW4ob25TdWNjZXNzXywgb25FcnJvcl8pO1xuICB9O1xuXG4gIF9wcm90by5hZGRWaWEgPSBmdW5jdGlvbiBhZGRWaWEoKSB7XG4gICAgdGhpcy52aWFBcnJheS5wdXNoKHt9KTtcbiAgfTtcblxuICBfcHJvdG8uZGVsZXRlVmlhID0gZnVuY3Rpb24gZGVsZXRlVmlhKGluZGV4KSB7XG4gICAgaWYgKHRoaXMudmlhQXJyYXkubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHRoaXMudmlhQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlUm91dGUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KCk7XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Sb3V0aW5nJywge1xuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPG5nZW9Sb3V0aW5nTWFwJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdUZW1wbGF0ZVVybFxufSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbVNlcnZpY2UuanMnO1xuaW1wb3J0IG5nZW9Sb3V0aW5nTm9taW5hdGltSW5wdXRDb21wb25lbnQgZnJvbSAnbmdlby9yb3V0aW5nL05vbWluYXRpbUlucHV0Q29tcG9uZW50LmpzJztcbmltcG9ydCAqIGFzIG9sUHJvaiBmcm9tICdvbC9wcm9qLmpzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgb2xDb2xsZWN0aW9uIGZyb20gJ29sL0NvbGxlY3Rpb24uanMnO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3IuanMnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuaW1wb3J0IG9sU3R5bGVUZXh0IGZyb20gJ29sL3N0eWxlL1RleHQuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbmltcG9ydCBvbEludGVyYWN0aW9uTW9kaWZ5IGZyb20gJ29sL2ludGVyYWN0aW9uL01vZGlmeS5qcyc7XG5pbXBvcnQgb2xJbnRlcmFjdGlvbkRyYXcgZnJvbSAnb2wvaW50ZXJhY3Rpb24vRHJhdy5qcyc7XG5pbXBvcnQgJ25nZW8vc2Fzcy9mb250LnNjc3MnO1xudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nRmVhdHVyZUNvbXBvbmVudCcsIFtuZ2VvUm91dGluZ05vbWluYXRpbVNlcnZpY2UubmFtZSwgbmdlb1JvdXRpbmdOb21pbmF0aW1JbnB1dENvbXBvbmVudC5uYW1lXSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJywgcmVxdWlyZSgnLi9yb3V0aW5nZmVhdHVyZS5odG1sJykpO1xufV0pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKCRhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSAkYXR0cnMubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmw7XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9yb3V0aW5nL3JvdXRpbmdmZWF0dXJlJztcbn0pO1xubmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmwuJGluamVjdCA9IFtcIiRhdHRyc1wiLCBcIm5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsXCJdO1xuXG5mdW5jdGlvbiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCgkYXR0cnMsIG5nZW9Sb3V0aW5nRmVhdHVyZVRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiBuZ2VvUm91dGluZ0ZlYXR1cmVUZW1wbGF0ZVVybCgkYXR0cnMpO1xufVxuXG5leHBvcnQgdmFyIENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwiJHFcIiwgXCJuZ2VvTm9taW5hdGltU2VydmljZVwiXTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRxLCBuZ2VvTm9taW5hdGltU2VydmljZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcbiAgICB0aGlzLnRpbWVvdXRfID0gJHRpbWVvdXQ7XG4gICAgdGhpcy4kcV8gPSAkcTtcbiAgICB0aGlzLm5nZW9Ob21pbmF0aW1TZXJ2aWNlXyA9IG5nZW9Ob21pbmF0aW1TZXJ2aWNlO1xuICAgIHRoaXMubWFwID0gbnVsbDtcbiAgICB0aGlzLmZlYXR1cmUgPSBudWxsO1xuICAgIHRoaXMuZmVhdHVyZUxhYmVsID0gJyc7XG4gICAgdGhpcy5maWxsQ29sb3IgPSAnJztcbiAgICB0aGlzLnN0cm9rZUNvbG9yID0gJyc7XG4gICAgdGhpcy5vbkNoYW5nZSA9IG51bGw7XG4gICAgdGhpcy52ZWN0b3JGZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gICAgdGhpcy52ZWN0b3JTb3VyY2VfID0gbmV3IG9sU291cmNlVmVjdG9yKHtcbiAgICAgIGZlYXR1cmVzOiB0aGlzLnZlY3RvckZlYXR1cmVzX1xuICAgIH0pO1xuICAgIHRoaXMudmVjdG9yTGF5ZXJfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgc291cmNlOiB0aGlzLnZlY3RvclNvdXJjZV8sXG4gICAgICBzdHlsZTogZnVuY3Rpb24gc3R5bGUoZmVhdHVyZSwgcmVzb2x1dGlvbikge1xuICAgICAgICByZXR1cm4gW25ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICAgIHRleHQ6IG5ldyBvbFN0eWxlVGV4dCh7XG4gICAgICAgICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICAgICAgICBjb2xvcjogX3RoaXMuZmlsbENvbG9yIHx8ICcjMDAwMDAwJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmb250OiAnOTAwIDI0cHggXCJGb250IEF3ZXNvbWUgNSBGcmVlXCInLFxuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgICBjb2xvcjogX3RoaXMuc3Ryb2tlQ29sb3IgfHwgJyMwMDAwMDAnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9mZnNldFk6IC0xNSxcbiAgICAgICAgICAgIHRleHQ6IFwiXFx1RjA0MVwiXG4gICAgICAgICAgfSlcbiAgICAgICAgfSldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubW9kaWZ5RmVhdHVyZV8gPSBuZXcgb2xJbnRlcmFjdGlvbk1vZGlmeSh7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc19cbiAgICB9KTtcbiAgICB0aGlzLmRyYXdfID0gbnVsbDtcbiAgICB0aGlzLm9uU2VsZWN0ID0gdGhpcy5vblNlbGVjdF8uYmluZCh0aGlzKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICcnO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLnZlY3RvckxheWVyXyk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tb2RpZnlGZWF0dXJlXyk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5vbignbW9kaWZ5ZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgZmVhdHVyZSA9IGV2ZW50LmZlYXR1cmVzLmdldEFycmF5KClbMF07XG5cbiAgICAgIF90aGlzMi52ZWN0b3JTb3VyY2VfLmNsZWFyKCk7XG5cbiAgICAgIF90aGlzMi5zbmFwRmVhdHVyZV8oZmVhdHVyZSk7XG4gICAgfSk7XG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpczIuZmVhdHVyZTtcbiAgICB9LCBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwpIHtcbiAgICAgICAgX3RoaXMyLm9uRmVhdHVyZUNoYW5nZV8oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbCA9PT0gbnVsbCkge1xuICAgICAgICBfdGhpczIudmVjdG9yU291cmNlXy5jbGVhcigpO1xuXG4gICAgICAgIF90aGlzMi5mZWF0dXJlTGFiZWwgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uJG9uRGVzdHJveSA9IGZ1bmN0aW9uICRvbkRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubWFwLnJlbW92ZUxheWVyKHRoaXMudmVjdG9yTGF5ZXJfKTtcbiAgICB0aGlzLm1vZGlmeUZlYXR1cmVfLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5tb2RpZnlGZWF0dXJlXyk7XG4gIH07XG5cbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldCgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kcmF3Xykge1xuICAgICAgdGhpcy5tYXAucmVtb3ZlSW50ZXJhY3Rpb24odGhpcy5kcmF3Xyk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3XyA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgICBmZWF0dXJlczogdGhpcy52ZWN0b3JGZWF0dXJlc18sXG4gICAgICB0eXBlOiAnUG9pbnQnXG4gICAgfSk7XG4gICAgdGhpcy5kcmF3Xy5vbignZHJhd3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzMy5mZWF0dXJlKSB7XG4gICAgICAgIF90aGlzMy52ZWN0b3JTb3VyY2VfLnJlbW92ZUZlYXR1cmUoX3RoaXMzLmZlYXR1cmUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZHJhd18ub24oJ2RyYXdlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChfdGhpczMuZHJhd18gJiYgX3RoaXMzLm1hcCkge1xuICAgICAgICBfdGhpczMubWFwLnJlbW92ZUludGVyYWN0aW9uKF90aGlzMy5kcmF3Xyk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMy5zbmFwRmVhdHVyZV8oZXZlbnQuZmVhdHVyZSk7XG5cbiAgICAgIF90aGlzMy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgfSk7XG4gICAgdGhpcy5tb2RpZnlGZWF0dXJlXy5zZXRBY3RpdmUoZmFsc2UpO1xuICAgIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMuZHJhd18pO1xuICB9O1xuXG4gIF9wcm90by5zZXRGZWF0dXJlXyA9IGZ1bmN0aW9uIHNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2Zvcm1lZENvb3JkaW5hdGUgPSBvbFByb2ouZnJvbUxvbkxhdChjb29yZGluYXRlLCB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpKTtcblxuICAgIGlmIChsYWJlbCA9PT0gJycpIHtcbiAgICAgIGxhYmVsID0gdHJhbnNmb3JtZWRDb29yZGluYXRlLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICB0aGlzLmZlYXR1cmUgPSBuZXcgb2xGZWF0dXJlKHtcbiAgICAgIGdlb21ldHJ5OiBuZXcgb2xHZW9tUG9pbnQodHJhbnNmb3JtZWRDb29yZGluYXRlKSxcbiAgICAgIG5hbWU6IGxhYmVsXG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLm9uRmVhdHVyZUNoYW5nZV8gPSBmdW5jdGlvbiBvbkZlYXR1cmVDaGFuZ2VfKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLmZlYXR1cmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZlYXR1cmVMYWJlbCA9IHRoaXMuZmVhdHVyZS5nZXQoJ25hbWUnKSB8fCAnJztcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uY2xlYXIoKTtcbiAgICB0aGlzLnZlY3RvclNvdXJjZV8uYWRkRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuXG4gICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMudGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXM0LmZlYXR1cmUgJiYgX3RoaXM0Lm9uQ2hhbmdlKSB7XG4gICAgICAgICAgX3RoaXM0Lm9uQ2hhbmdlKF90aGlzNC5mZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5vblNlbGVjdF8gPSBmdW5jdGlvbiBvblNlbGVjdF8oc2VsZWN0ZWQpIHtcbiAgICB2YXIgY29vcmRpbmF0ZSA9IHNlbGVjdGVkLmNvb3JkaW5hdGUubWFwKHBhcnNlRmxvYXQpO1xuICAgIHZhciBsYWJlbCA9IHNlbGVjdGVkLmxhYmVsO1xuICAgIHRoaXMuc2V0RmVhdHVyZV8oY29vcmRpbmF0ZSwgbGFiZWwpO1xuICAgIHZhciBuZXdDb29yZGluYXRlcyA9IHRoaXMuZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldENvb3JkaW5hdGVzKCk7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLnNldENlbnRlcihuZXdDb29yZGluYXRlcyk7XG4gIH07XG5cbiAgX3Byb3RvLnNuYXBGZWF0dXJlXyA9IGZ1bmN0aW9uIHNuYXBGZWF0dXJlXyhmZWF0dXJlKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB2YXIgY29vcmQgPSB0aGlzLmdldExvbkxhdEZyb21Qb2ludF8oZmVhdHVyZSk7XG5cbiAgICBpZiAoIWNvb3JkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgdmFyIG9uU3VjY2VzcyA9IGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwKSB7XG4gICAgICB2YXIgbG9uID0gcGFyc2VGbG9hdChyZXNwLmRhdGEubG9uKTtcbiAgICAgIHZhciBsYXQgPSBwYXJzZUZsb2F0KHJlc3AuZGF0YS5sYXQpO1xuICAgICAgdmFyIGNvb3JkaW5hdGUgPSBbbG9uLCBsYXRdO1xuICAgICAgdmFyIGxhYmVsID0gcmVzcC5kYXRhLmRpc3BsYXlfbmFtZTtcblxuICAgICAgX3RoaXM1LnNldEZlYXR1cmVfKGNvb3JkaW5hdGUsIGxhYmVsKTtcbiAgICB9O1xuXG4gICAgdmFyIG9uRXJyb3IgPSBmdW5jdGlvbiBvbkVycm9yKHJlc3ApIHtcbiAgICAgIF90aGlzNS5lcnJvck1lc3NhZ2UgPSAnRXJyb3I6IG5vbWluYXRpbSBzZXJ2ZXIgbm90IHJlc3BvbmRpbmcuJztcbiAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xuICAgIH07XG5cbiAgICB0aGlzLiRxXy53aGVuKHRoaXMubmdlb05vbWluYXRpbVNlcnZpY2VfLnJldmVyc2UoY29vcmQsIGNvbmZpZykpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0TG9uTGF0RnJvbVBvaW50XyA9IGZ1bmN0aW9uIGdldExvbkxhdEZyb21Qb2ludF8ocG9pbnQpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZ2VvbWV0cnkgPSBwb2ludC5nZXRHZW9tZXRyeSgpO1xuICAgIHZhciBjb29yZHMgPSBnZW9tZXRyeS5nZXRDb29yZGluYXRlcygpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKTtcbiAgICByZXR1cm4gb2xQcm9qLnRvTG9uTGF0KGNvb3JkcywgcHJvamVjdGlvbik7XG4gIH07XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KCk7XG52YXIgcm91dGluZ0ZlYXR1cmVDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc8bmdlb1JvdXRpbmdGZWF0dXJlTWFwJyxcbiAgICAnZmVhdHVyZSc6ICc9bmdlb1JvdXRpbmdGZWF0dXJlRmVhdHVyZScsXG4gICAgJ2ZpbGxDb2xvcic6ICc8P25nZW9Sb3V0aW5nRmVhdHVyZUZpbGxDb2xvcicsXG4gICAgJ3N0cm9rZUNvbG9yJzogJzw/bmdlb1JvdXRpbmdGZWF0dXJlU3Ryb2tlQ29sb3InLFxuICAgICdvbkNoYW5nZSc6ICc9P25nZW9Sb3V0aW5nRmVhdHVyZU9uQ2hhbmdlJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogbmdlb1JvdXRpbmdGZWF0dXJlVGVtcGxhdGVVcmxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ25nZW9Sb3V0aW5nRmVhdHVyZScsIHJvdXRpbmdGZWF0dXJlQ29tcG9uZW50KTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIlJvdXRpbmdTZXJ2aWNlLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIm5nZW9Sb3V0aW5nT3B0aW9uc1wiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuZXhwb3J0IGZ1bmN0aW9uIFJvdXRpbmdTZXJ2aWNlKCRodHRwLCBuZ2VvUm91dGluZ09wdGlvbnMpIHtcbiAgdGhpcy4kaHR0cF8gPSAkaHR0cDtcbiAgdGhpcy5yb3V0aW5nT3B0aW9uc18gPSBuZ2VvUm91dGluZ09wdGlvbnM7XG4gIHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXyA9IHRoaXMucm91dGluZ09wdGlvbnNfLmJhY2tlbmRVcmwgfHwgJ2h0dHBzOi8vcm91dGVyLnByb2plY3Qtb3NybS5vcmcvJztcblxuICBpZiAodGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfLnN1YnN0cigtMSkgIT09ICcvJykge1xuICAgIHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXyArPSAnLyc7XG4gIH1cblxuICB0aGlzLnByb3RvY29sVmVyc2lvbl8gPSAndjEnO1xufVxuXG5Sb3V0aW5nU2VydmljZS5wcm90b3R5cGUuZ2V0Um91dGUgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZXMsIGNvbmZpZykge1xuICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgaWYgKCFjb25maWcuc2VydmljZSkge1xuICAgIGNvbmZpZy5zZXJ2aWNlID0gJ3JvdXRlJztcbiAgfVxuXG4gIGlmICghY29uZmlnLnByb2ZpbGUpIHtcbiAgICBjb25maWcucHJvZmlsZSA9ICdjYXInO1xuICB9XG5cbiAgdmFyIHVybCA9IHRoaXMubmdlb09zcm1CYWNrZW5kVXJsXztcblxuICBpZiAoY29uZmlnLmluc3RhbmNlKSB7XG4gICAgdXJsICs9IGNvbmZpZy5pbnN0YW5jZSArIFwiL1wiO1xuICB9XG5cbiAgdXJsICs9IGNvbmZpZy5zZXJ2aWNlICsgXCIvXCIgKyB0aGlzLnByb3RvY29sVmVyc2lvbl8gKyBcIi9cIiArIGNvbmZpZy5wcm9maWxlICsgXCIvXCI7XG4gIHZhciBjb29yZGluYXRlU3RyaW5nID0gY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuIGMuam9pbignLCcpO1xuICB9KS5qb2luKCc7Jyk7XG4gIHVybCArPSBjb29yZGluYXRlU3RyaW5nO1xuXG4gIGlmIChjb25maWcub3B0aW9ucykge1xuICAgIHVybCArPSAnPyc7XG4gICAgdmFyIG9wdGlvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIF9pID0gMCwgX09iamVjdCRrZXlzID0gT2JqZWN0LmtleXMoY29uZmlnLm9wdGlvbnMpOyBfaSA8IF9PYmplY3Qka2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBvcHRpb24gPSBfT2JqZWN0JGtleXNbX2ldO1xuICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbiArIFwiPVwiICsgY29uZmlnLm9wdGlvbnNbb3B0aW9uXSk7XG4gICAgfVxuXG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxuUm91dGluZ1NlcnZpY2UucHJvdG90eXBlLmdldE5lYXJlc3QgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSwgY29uZmlnKSB7XG4gIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgY29uZmlnLnNlcnZpY2UgPSAnbmVhcmVzdCc7XG5cbiAgaWYgKCFjb25maWcucHJvZmlsZSkge1xuICAgIGNvbmZpZy5wcm9maWxlID0gJ2Nhcic7XG4gIH1cblxuICB2YXIgdXJsID0gdGhpcy5uZ2VvT3NybUJhY2tlbmRVcmxfO1xuXG4gIGlmIChjb25maWcuaW5zdGFuY2UpIHtcbiAgICB1cmwgKz0gY29uZmlnLmluc3RhbmNlICsgXCIvXCI7XG4gIH1cblxuICB1cmwgKz0gY29uZmlnLnNlcnZpY2UgKyBcIi9cIiArIHRoaXMucHJvdG9jb2xWZXJzaW9uXyArIFwiL1wiICsgY29uZmlnLnByb2ZpbGUgKyBcIi9cIjtcbiAgdmFyIGNvb3JkaW5hdGVTdHJpbmcgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgdXJsICs9IGNvb3JkaW5hdGVTdHJpbmc7XG5cbiAgaWYgKGNvbmZpZy5vcHRpb25zKSB7XG4gICAgdXJsICs9ICc/JztcbiAgICB2YXIgb3B0aW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMCwgX09iamVjdCRrZXlzMiA9IE9iamVjdC5rZXlzKGNvbmZpZy5vcHRpb25zKTsgX2kyIDwgX09iamVjdCRrZXlzMi5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgb3B0aW9uID0gX09iamVjdCRrZXlzMltfaTJdO1xuICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbiArIFwiPVwiICsgY29uZmlnLm9wdGlvbnNbb3B0aW9uXSk7XG4gICAgfVxuXG4gICAgdXJsICs9IG9wdGlvbnMuam9pbignJicpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuJGh0dHBfLmdldCh1cmwpO1xufTtcblxudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9Sb3V0aW5nU2VydmljZScsIFtdKTtcbm15TW9kdWxlLnNlcnZpY2UoJ25nZW9Sb3V0aW5nU2VydmljZScsIFJvdXRpbmdTZXJ2aWNlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Sb3V0aW5nUm91dGluZ0NvbXBvbmVudCBmcm9tICduZ2VvL3JvdXRpbmcvUm91dGluZ0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgJy4vcm91dGluZy5zY3NzJztcbmV4cG9ydCBkZWZhdWx0IGFuZ3VsYXIubW9kdWxlKCduZ2VvUm91dGluZ01vZHVsZScsIFtuZ2VvUm91dGluZ1JvdXRpbmdDb21wb25lbnQubmFtZV0pOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJuZ2VvLW5vbWluYXRpbS1pbnB1dFwiPlxcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcXG4gICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXFxuICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyRjdHJsLnBsYWNlaG9sZGVyfX1cIlxcbiAgICAgICAgIG5nLW1vZGVsPVwiJGN0cmwuaW5wdXRWYWx1ZVwiXFxuICAgICAgICAgbmdlby1zZWFyY2g9XCIkY3RybC5vcHRpb25zXCJcXG4gICAgICAgICBuZ2VvLXNlYXJjaC1kYXRhc2V0cz1cIiRjdHJsLmRhdGFzZXRzXCJcXG4gICAgICAgICBuZ2VvLXNlYXJjaC1saXN0ZW5lcnM9XCIkY3RybC5saXN0ZW5lcnNcIj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZ1wiPlxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1zdGFydCBmb3JtLWdyb3VwXCI+XFxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cIiRjdHJsLnN0YXJ0RmVhdHVyZV9cIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZpbGwtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRGaWxsXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMuc3RhcnRTdHJva2VcIlxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW9uLWNoYW5nZT1cIiRjdHJsLmhhbmRsZUNoYW5nZVwiPlxcbiAgICA8L25nZW8tcm91dGluZy1mZWF0dXJlPlxcbiAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJuZ2VvLXJvdXRpbmctdmlhcyBmb3JtLWdyb3VwXCIgbmctcmVwZWF0PVwiKGluZGV4LCB2aWEpIGluICRjdHJsLnZpYUFycmF5XCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxcbiAgICAgICAgICA8bmdlby1yb3V0aW5nLWZlYXR1cmVcXG4gICAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1tYXA9XCIkY3RybC5tYXBcIlxcbiAgICAgICAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLWZlYXR1cmU9XCJ2aWEuZmVhdHVyZVwiXFxuICAgICAgICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmlsbC1jb2xvcj1cIiRjdHJsLmNvbG9ycy52aWFGaWxsXCJcXG4gICAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1zdHJva2UtY29sb3I9XCIkY3RybC5jb2xvcnMudmlhU3Ryb2tlXCJcXG4gICAgICAgICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCIkY3RybC5oYW5kbGVDaGFuZ2VcIj5cXG4gICAgICAgICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWUgZGVsZXRlLXZpYVwiIG5nLWNsaWNrPVwiJGN0cmwuZGVsZXRlVmlhKGluZGV4KVwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9zcGFuPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1kZXN0aW5hdGlvbiBmb3JtLWdyb3VwXCI+XFxuICAgIDxuZ2VvLXJvdXRpbmctZmVhdHVyZVxcbiAgICAgIG5nZW8tcm91dGluZy1mZWF0dXJlLW1hcD1cIiRjdHJsLm1hcFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtZmVhdHVyZT1cIiRjdHJsLnRhcmdldEZlYXR1cmVfXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1maWxsLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uRmlsbFwiXFxuICAgICAgbmdlby1yb3V0aW5nLWZlYXR1cmUtc3Ryb2tlLWNvbG9yPVwiJGN0cmwuY29sb3JzLmRlc3RpbmF0aW9uU3Ryb2tlXCJcXG4gICAgICBuZ2VvLXJvdXRpbmctZmVhdHVyZS1vbi1jaGFuZ2U9XCIkY3RybC5oYW5kbGVDaGFuZ2VcIj5cXG4gICAgPC9uZ2VvLXJvdXRpbmctZmVhdHVyZT5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZmlsbFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBwcmltZVwiIG5nLWNsaWNrPVwiJGN0cmwuY2xlYXJSb3V0ZSgpXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvc3Bhbj4gPHNwYW4gdHJhbnNsYXRlPkNsZWFyPC9zcGFuPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLnJldmVyc2VSb3V0ZSgpXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1leGNoYW5nZS1hbHRcIj48L3NwYW4+IDxzcGFuIHRyYW5zbGF0ZT5SZXZlcnNlPC9zcGFuPlxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gcHJpbWVcIiBuZy1jbGljaz1cIiRjdHJsLmFkZFZpYSgpXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1wbHVzXCI+PC9zcGFuPiA8c3BhbiB0cmFuc2xhdGU+QWRkIHZpYTwvc3Bhbj5cXG4gICAgPC9idXR0b24+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPjwvZGl2PlxcblxcbiAgPGRpdiBuZy1pZj1cIiRjdHJsLnJvdXRpbmdQcm9maWxlcy5sZW5ndGggPiAxXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XFxuICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgY29sLW1kLTRcIiB0cmFuc2xhdGU+UHJvZmlsZTwvbGFiZWw+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCI+XFxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmctbW9kZWw9XCIkY3RybC5zZWxlY3RlZFJvdXRpbmdQcm9maWxlXCI+XFxuICAgICAgICAgIDxvcHRpb24gbmctcmVwZWF0PVwicHJvZmlsZSBpbiAkY3RybC5yb3V0aW5nUHJvZmlsZXNcIiBuZy12YWx1ZT1cInByb2ZpbGVcIj57e3Byb2ZpbGUubGFiZWx9fTwvb3B0aW9uPlxcbiAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwibmdlby1yb3V0aW5nLWVycm9yIGZvcm0tZ3JvdXAgY2xlYXJmaXhcIlxcbiAgICAgICBuZy1oaWRlPVwiJGN0cmwuZXJyb3JNZXNzYWdlID09PSBcXCdcXCdcIj5cXG4gICAge3skY3RybC5lcnJvck1lc3NhZ2V9fVxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj5cXG5cXG4gIDxkaXYgbmctaGlkZT1cIiRjdHJsLnJvdXRlRHVyYXRpb24gPT09IG51bGwgJiYgJGN0cmwucm91dGVEaXN0YW5jZSA8PSAwXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XFxuICAgICAgICA8c3Ryb25nIHRyYW5zbGF0ZT5Sb3V0ZSBzdGF0aXN0aWNzPC9zdHJvbmc+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwicm93XCIgbmctaGlkZT1cIiRjdHJsLnJvdXRlRHVyYXRpb24gPT09IG51bGxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTQgdGV4dC1yaWdodFwiIHRyYW5zbGF0ZT5cXG4gICAgICAgIER1cmF0aW9uXFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCI+XFxuICAgICAgICB7eyRjdHJsLnJvdXRlRHVyYXRpb24gfCBuZ2VvRHVyYXRpb259fVxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIG5nLWhpZGU9XCIkY3RybC5yb3V0ZURpc3RhbmNlIDw9IDBcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTQgdGV4dC1yaWdodFwiIHRyYW5zbGF0ZT5cXG4gICAgICAgIERpc3RhbmNlXFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC04XCI+XFxuICAgICAgICB7eyRjdHJsLnJvdXRlRGlzdGFuY2UgfCBuZ2VvVW5pdFByZWZpeDpcXCdtXFwnfX1cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBjbGFzcz1cIm5nZW8tcm91dGluZy1mZWF0dXJlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcbiAgICAgIDxuZ2VvLW5vbWluYXRpbS1pbnB1dFxcbiAgICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtdmFsdWU9XCIkY3RybC5mZWF0dXJlTGFiZWxcIlxcbiAgICAgICAgbmdlby1ub21pbmF0aW0taW5wdXQtcGxhY2Vob2xkZXI9XCJ7e1xcJ1NlYXJjaC4uLlxcJyB8IHRyYW5zbGF0ZX19XCJcXG4gICAgICAgIG5nZW8tbm9taW5hdGltLWlucHV0LW9uLXNlbGVjdD1cIiRjdHJsLm9uU2VsZWN0XCI+XFxuICAgICAgPC9uZ2VvLW5vbWluYXRpbS1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gYnRuXCIgbmctY2xpY2s9XCIkY3RybC5zZXQoKVwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1tYXAtbWFya2VyXCI+PC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaFBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9