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
/******/ 		"routing": 0
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

eval("\n\n//# sourceURL=webpack:///./examples/routing.css?");

/***/ }),

/***/ "./examples/routing.js":
/*!*****************************!*\
  !*** ./examples/routing.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routing_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routing.css */ \"./examples/routing.css\");\n/* harmony import */ var _routing_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_routing_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/ol.css */ \"./node_modules/ol/ol.css\");\n/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_ol_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/fontawesome.min.css */ \"./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css\");\n/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_fontawesome_min_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/routing/module.js */ \"./src/routing/module.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name]);\n\nfunction MainController() {\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      center: [931010.1535989442, 5961705.842297254],\n      zoom: 9\n    })\n  });\n  this.routingfeatureActive = true;\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./examples/routing.js?");

/***/ }),

/***/ "./src/routing/NominatimInputComponent.js":
/*!************************************************!*\
  !*** ./src/routing/NominatimInputComponent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/search/searchDirective.js */ \"./src/search/searchDirective.js\");\n/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ \"./src/routing/NominatimService.js\");\nController.$inject = [\"$element\", \"$scope\", \"ngeoNominatimService\"];\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingNominatimInputComponent', [ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/routing/nominatiminput', __webpack_require__(/*! ./nominatiminput.html */ \"./src/routing/nominatiminput.html\"));\n}]);\nmodule.value('ngeoRoutingNominatimInputComponentTemplateUrl', function ($attrs) {\n  var templateUrl = $attrs.ngeoRoutingNominatimInputComponentTemplateUrl;\n  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/nominatiminput';\n});\nngeoRoutingNominatimInputComponentTemplateUrl.$inject = [\"$attrs\", \"ngeoRoutingNominatimInputComponentTemplateUrl\"];\n\nfunction ngeoRoutingNominatimInputComponentTemplateUrl($attrs, ngeoRoutingNominatimInputComponentTemplateUrl) {\n  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);\n}\n\nfunction Controller($element, $scope, ngeoNominatimService) {\n  this.element_ = $element;\n  this.$scope_ = $scope;\n  this.ngeoNominatimService = ngeoNominatimService;\n  this.onSelect = null;\n  this.inputValue = null;\n  this.options = {};\n  this.datasets = [{\n    name: 'nominatim',\n    display: 'name',\n    source: this.ngeoNominatimService.typeaheadSourceDebounced\n  }];\n  this.listeners = {\n    select: this.select_.bind(this)\n  };\n  this.placeholder = '';\n}\n\nController.prototype.select_ = function (event, suggestion, dataset) {\n  if (this.onSelect) {\n    this.onSelect(suggestion);\n  }\n};\n\nvar routingNominatimInputComponent = {\n  controller: Controller,\n  bindings: {\n    'onSelect': '=?ngeoNominatimInputOnSelect',\n    'inputValue': '=?ngeoNominatimInputValue',\n    'placeholder': '@?ngeoNominatimInputPlaceholder'\n  },\n  templateUrl: ngeoRoutingNominatimInputComponentTemplateUrl\n};\nmodule.component('ngeoNominatimInput', routingNominatimInputComponent);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/routing/NominatimInputComponent.js?");

/***/ }),

/***/ "./src/routing/NominatimService.js":
/*!*****************************************!*\
  !*** ./src/routing/NominatimService.js ***!
  \*****************************************/
/*! exports provided: NominatimService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NominatimService\", function() { return NominatimService; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ \"./src/misc/debounce.js\");\nNominatimService.$inject = [\"$http\", \"$injector\", \"ngeoDebounce\"];\n\n\nfunction NominatimService($http, $injector, ngeoDebounce) {\n  this.$http_ = $http;\n  this.ngeoDebounce_ = ngeoDebounce;\n  this.nominatimUrl_ = 'https://nominatim.openstreetmap.org/';\n\n  if ($injector.has('ngeoNominatimUrl')) {\n    this.nominatimUrl_ = $injector.get('ngeoNominatimUrl');\n\n    if (this.nominatimUrl_.substr(-1) !== '/') {\n      this.nominatimUrl_ += '/';\n    }\n  }\n\n  this.searchDefaultParams_ = {};\n\n  if ($injector.has('ngeoNominatimSearchDefaultParams')) {\n    this.searchDefaultParams_ = $injector.get('ngeoNominatimSearchDefaultParams');\n  }\n\n  this.typeaheadDebounceDelay_ = 500;\n  this.typeaheadSourceDebounced = this.ngeoDebounce_(this.typeaheadSource_.bind(this), this.typeaheadDebounceDelay_, true);\n}\n\nNominatimService.prototype.search = function (query, params) {\n  var url = this.nominatimUrl_ + \"search?q=\" + query;\n  params = params || {};\n  params = Object.assign({}, this.searchDefaultParams_, params);\n  params.format = 'json';\n\n  if (params) {\n    url += '&';\n    var options = [];\n\n    for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {\n      var option = _Object$keys[_i];\n      options.push(option + \"=\" + params[option]);\n    }\n\n    url += options.join('&');\n  }\n\n  return this.$http_.get(url);\n};\n\nNominatimService.prototype.reverse = function (coordinate, params) {\n  var url = this.nominatimUrl_ + \"reverse\";\n  params = Object.assign({}, params);\n  params.lon = coordinate[0];\n  params.lat = coordinate[1];\n  params.format = 'json';\n\n  if (params) {\n    url += '?';\n    var options = [];\n\n    for (var _i2 = 0, _Object$keys2 = Object.keys(params); _i2 < _Object$keys2.length; _i2++) {\n      var option = _Object$keys2[_i2];\n      options.push(option + \"=\" + params[option]);\n    }\n\n    url += options.join('&');\n  }\n\n  return this.$http_.get(url);\n};\n\nNominatimService.prototype.typeaheadSource_ = function (query, syncResults, asyncResults) {\n  var onSuccess_ = function onSuccess_(resp) {\n    var parse = function parse(result) {\n      return {\n        coordinate: [result.lon, result.lat],\n        name: result.display_name\n      };\n    };\n\n    if (asyncResults) {\n      asyncResults(resp.data.map(parse));\n    } else {\n      syncResults(resp.data.map(parse));\n    }\n  };\n\n  var onError_ = function onError_(resp) {\n    if (asyncResults) {\n      asyncResults([]);\n    } else {\n      syncResults([]);\n    }\n  };\n\n  this.search(query, {}).then(onSuccess_, onError_);\n};\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoNominatimService', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name]);\nmodule.service('ngeoNominatimService', NominatimService);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/routing/NominatimService.js?");

/***/ }),

/***/ "./src/routing/RoutingComponent.js":
/*!*****************************************!*\
  !*** ./src/routing/RoutingComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ \"./src/misc/debounce.js\");\n/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ \"./src/misc/filters.js\");\n/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ \"./src/routing/NominatimService.js\");\n/* harmony import */ var ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/RoutingService.js */ \"./src/routing/RoutingService.js\");\n/* harmony import */ var ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/routing/RoutingFeatureComponent.js */ \"./src/routing/RoutingFeatureComponent.js\");\n/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/GeoJSON.js */ \"./node_modules/ol/format/GeoJSON.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/proj.js */ \"./node_modules/ol/proj.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/geom/LineString.js */ \"./node_modules/ol/geom/LineString.js\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/sass/font.scss */ \"./src/sass/font.scss\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingComponent', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name]);\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/routing/routing', __webpack_require__(/*! ./routing.html */ \"./src/routing/routing.html\"));\n}]);\nmodule.value('ngeoRoutingTemplateUrl', function ($attrs) {\n  var templateUrl = $attrs.ngeoRoutingTemplateUrl;\n  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';\n});\nngeoRoutingTemplateUrl.$inject = [\"$attrs\", \"ngeoRoutingTemplateUrl\"];\n\nfunction ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {\n  return ngeoRoutingTemplateUrl($attrs);\n}\n\nvar Controller = function () {\n  Controller.$inject = [\"$injector\", \"$scope\", \"ngeoRoutingService\", \"ngeoNominatimService\", \"$q\", \"ngeoDebounce\"];\n\n  function Controller($injector, $scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce) {\n    var _this = this;\n\n    this.$scope_ = $scope;\n    this.ngeoRoutingService_ = ngeoRoutingService;\n    this.ngeoNominatimService_ = ngeoNominatimService;\n    this.routingOptions_ = $injector.has('ngeoRoutingOptions') ? $injector.get('ngeoRoutingOptions') : {};\n    this.routingProfiles = this.routingOptions_.profiles || [];\n    this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;\n    $scope.$watch(function () {\n      return _this.selectedRoutingProfile;\n    }, this.calculateRoute.bind(this));\n    this.$q_ = $q;\n    this.map = null;\n    this.errorMessage = '';\n    this.startFeature_ = null;\n    this.targetFeature_ = null;\n    this.viaArray = [];\n    this.colors = {\n      'start.fill': '#6BE62E',\n      'start.stroke': '#4CB01E',\n      'destination.fill': '#FF3E13',\n      'destination.stroke': '#CD3412',\n      'via.fill': '#767676',\n      'via.stroke': '#000000'\n    };\n    this.routeSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n      features: []\n    });\n    this.routeLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      source: this.routeSource_,\n      style: new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n        fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n          color: 'rgba(16, 112, 29, 0.6)'\n        }),\n        stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n          color: 'rgba(16, 112, 29, 0.6)',\n          width: 5\n        })\n      })\n    });\n    this.routeDistance = 0;\n    this.routeDuration = null;\n    this.regexIsFormattedCoord = /\\d+\\.\\d+\\/\\d+\\.\\d+/;\n    this.draw_ = null;\n    var debounceDelay = 200;\n    this.handleChange = ngeoDebounce(this.calculateRoute.bind(this), debounceDelay, true);\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.$onInit = function $onInit() {\n    if (this.map) {\n      this.map.addLayer(this.routeLayer_);\n    }\n  };\n\n  _proto.clearRoute = function clearRoute() {\n    this.startFeature_ = null;\n    this.targetFeature_ = null;\n    this.viaArray = [];\n    this.routeDistance = 0;\n    this.routeDuration = null;\n    this.routeSource_.clear();\n    this.errorMessage = '';\n  };\n\n  _proto.getLonLatFromPoint_ = function getLonLatFromPoint_(point) {\n    if (!this.map) {\n      return null;\n    }\n\n    var geometry = point.getGeometry();\n\n    if (!(geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"])) {\n      throw new Error('Wrong time values type');\n    }\n\n    var coords = geometry.getCoordinates();\n    var projection = this.map.getView().getProjection();\n    return Object(ol_proj_js__WEBPACK_IMPORTED_MODULE_12__[\"toLonLat\"])(coords, projection);\n  };\n\n  _proto.reverseRoute = function reverseRoute() {\n    var tmpFeature = this.startFeature_;\n    this.startFeature_ = this.targetFeature_;\n    this.targetFeature_ = tmpFeature;\n    this.viaArray = this.viaArray.reverse();\n  };\n\n  _proto.parseRoute_ = function parseRoute_(route) {\n    if (!this.map) {\n      return [];\n    }\n\n    var parsedRoutes = [];\n    var format = new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]();\n    var formatConfig = {\n      dataProjection: 'EPSG:4326',\n      featureProjection: this.map.getView().getProjection()\n    };\n\n    if (route.legs) {\n      var _ref;\n\n      var parsedRoutes_ = route.legs.map(function (leg) {\n        return leg.steps.map(function (step) {\n          return new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n            geometry: format.readGeometry(step.geometry, formatConfig)\n          });\n        });\n      });\n      parsedRoutes = (_ref = []).concat.apply(_ref, parsedRoutes_);\n    } else if (route.geometry) {\n      parsedRoutes.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n        geometry: format.readGeometry(route.geometry, formatConfig)\n      }));\n    }\n\n    return parsedRoutes;\n  };\n\n  _proto.calculateRoute = function calculateRoute() {\n    var _this2 = this;\n\n    if (this.startFeature_ && this.targetFeature_) {\n      this.routeSource_.clear();\n      var coordFrom = this.getLonLatFromPoint_(this.startFeature_);\n      var coordTo = this.getLonLatFromPoint_(this.targetFeature_);\n      var vias = this.viaArray.filter(function (via) {\n        return via.feature !== null;\n      }).map(function (via) {\n        return _this2.getLonLatFromPoint_(via.feature);\n      });\n      var route = [coordFrom].concat(vias, [coordTo]);\n\n      var onSuccess_ = function onSuccess_(resp) {\n        if (!_this2.map || !_this2.startFeature_ || !_this2.targetFeature_) {\n          return null;\n        }\n\n        var features = _this2.parseRoute_(resp.data.routes[0]);\n\n        if (features.length === 0) {\n          console.log('No route or not supported format.');\n          return;\n        }\n\n        _this2.routeSource_.addFeatures(features);\n\n        _this2.map.getView().fit(_this2.routeSource_.getExtent());\n\n        _this2.routeDistance = resp.data.routes[0].distance;\n        _this2.routeDuration = resp.data.routes[0].duration;\n        var startRoute = features[0].getGeometry().getCoordinateAt(0);\n        var endRoute = features[features.length - 1].getGeometry().getCoordinateAt(1);\n        var startToRoute = [_this2.startFeature_.getGeometry().getCoordinates(), startRoute];\n        var routeToEnd = [endRoute, _this2.targetFeature_.getGeometry().getCoordinates()];\n        var routeConnections = [new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"](startToRoute)), new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"](routeToEnd))];\n\n        _this2.routeSource_.addFeatures(routeConnections);\n      };\n\n      var onError_ = function onError_(resp) {\n        _this2.errorMessage = 'Error: routing server not responding.';\n        console.log(resp);\n      };\n\n      var options = {};\n      options.steps = true;\n      options.overview = false;\n      options.geometries = 'geojson';\n      var config = {};\n      config.options = options;\n\n      if (this.selectedRoutingProfile) {\n        config.instance = this.selectedRoutingProfile.profile;\n      }\n\n      this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_, onError_);\n    }\n  };\n\n  _proto.addVia = function addVia() {\n    this.viaArray.push({});\n  };\n\n  _proto.deleteVia = function deleteVia(index) {\n    if (this.viaArray.length > index) {\n      this.viaArray.splice(index, 1);\n      this.calculateRoute();\n    }\n  };\n\n  return Controller;\n}();\n\nmodule.component('ngeoRouting', {\n  controller: Controller,\n  bindings: {\n    'map': '<ngeoRoutingMap'\n  },\n  templateUrl: ngeoRoutingTemplateUrl\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/routing/RoutingComponent.js?");

/***/ }),

/***/ "./src/routing/RoutingFeatureComponent.js":
/*!************************************************!*\
  !*** ./src/routing/RoutingFeatureComponent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ \"./src/routing/NominatimService.js\");\n/* harmony import */ var ngeo_routing_NominatimInputComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimInputComponent.js */ \"./src/routing/NominatimInputComponent.js\");\n/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj.js */ \"./node_modules/ol/proj.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Collection.js */ \"./node_modules/ol/Collection.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style_Text_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Text.js */ \"./node_modules/ol/style/Text.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_interaction_Modify_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/interaction/Modify.js */ \"./node_modules/ol/interaction/Modify.js\");\n/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/interaction/Draw.js */ \"./node_modules/ol/interaction/Draw.js\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/sass/font.scss */ \"./src/sass/font.scss\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingFeatureComponent', [ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_routing_NominatimInputComponent_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('ngeo/routing/routingfeature', __webpack_require__(/*! ./routingfeature.html */ \"./src/routing/routingfeature.html\"));\n}]);\nmodule.value('ngeoRoutingFeatureTemplateUrl', function ($attrs) {\n  var templateUrl = $attrs.ngeoRoutingFeatureTemplateUrl;\n  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';\n});\nngeoRoutingFeatureTemplateUrl.$inject = [\"$attrs\", \"ngeoRoutingFeatureTemplateUrl\"];\n\nfunction ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {\n  return ngeoRoutingFeatureTemplateUrl($attrs);\n}\n\nvar Controller = function () {\n  Controller.$inject = [\"$scope\", \"$timeout\", \"$q\", \"ngeoNominatimService\"];\n\n  function Controller($scope, $timeout, $q, ngeoNominatimService) {\n    var _this = this;\n\n    this.scope_ = $scope;\n    this.timeout_ = $timeout;\n    this.$q_ = $q;\n    this.ngeoNominatimService_ = ngeoNominatimService;\n    this.map = null;\n    this.feature = null;\n    this.featureLabel = '';\n    this.fillColor = '';\n    this.strokeColor = '';\n    this.onChange = null;\n    this.vectorFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    this.vectorSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      features: this.vectorFeatures_\n    });\n    this.vectorLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n      source: this.vectorSource_,\n      style: function style(feature, resolution) {\n        return [new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n          text: new ol_style_Text_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n            fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n              color: _this.fillColor || '#000000'\n            }),\n            font: '900 30px \"Font Awesome 5 Free\"',\n            offsetY: -15,\n            stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n              width: 3,\n              color: _this.strokeColor || '#000000'\n            }),\n            text: \"\\uF041\"\n          })\n        })];\n      }\n    });\n    this.modifyFeature_ = new ol_interaction_Modify_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n      features: this.vectorFeatures_\n    });\n    this.draw_ = null;\n    this.onSelect = this.onSelect_.bind(this);\n    this.errorMessage = '';\n  }\n\n  var _proto = Controller.prototype;\n\n  _proto.$onInit = function $onInit() {\n    var _this2 = this;\n\n    if (!this.map) {\n      return;\n    }\n\n    this.map.addLayer(this.vectorLayer_);\n    this.modifyFeature_.setActive(true);\n    this.map.addInteraction(this.modifyFeature_);\n    this.modifyFeature_.on('modifyend', function (event) {\n      var feature = event.features.getArray()[0];\n\n      _this2.vectorSource_.clear();\n\n      _this2.snapFeature_(feature);\n    });\n    this.scope_.$watch(function () {\n      return _this2.feature;\n    }, function (newVal, oldVal) {\n      if (newVal) {\n        _this2.onFeatureChange_();\n      }\n\n      if (newVal === null) {\n        _this2.vectorSource_.clear();\n\n        _this2.featureLabel = '';\n      }\n    });\n  };\n\n  _proto.$onDestroy = function $onDestroy() {\n    if (!this.map) {\n      return;\n    }\n\n    this.map.removeLayer(this.vectorLayer_);\n    this.modifyFeature_.setActive(false);\n    this.map.removeInteraction(this.modifyFeature_);\n  };\n\n  _proto.set = function set() {\n    var _this3 = this;\n\n    if (!this.map) {\n      return;\n    }\n\n    if (this.draw_) {\n      this.map.removeInteraction(this.draw_);\n    }\n\n    this.draw_ = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n      features: this.vectorFeatures_,\n      type: 'Point'\n    });\n    this.draw_.on('drawstart', function () {\n      if (_this3.feature) {\n        _this3.vectorSource_.removeFeature(_this3.feature);\n      }\n    });\n    this.draw_.on('drawend', function (event) {\n      if (_this3.draw_ && _this3.map) {\n        _this3.map.removeInteraction(_this3.draw_);\n      }\n\n      _this3.snapFeature_(event.feature);\n\n      _this3.modifyFeature_.setActive(true);\n    });\n    this.modifyFeature_.setActive(false);\n    this.map.addInteraction(this.draw_);\n  };\n\n  _proto.setFeature_ = function setFeature_(coordinate, label) {\n    if (!this.map) {\n      return;\n    }\n\n    var transformedCoordinate = ol_proj_js__WEBPACK_IMPORTED_MODULE_3__[\"fromLonLat\"](coordinate, this.map.getView().getProjection());\n\n    if (label === '') {\n      label = transformedCoordinate.join('/');\n    }\n\n    this.feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](transformedCoordinate),\n      name: label\n    });\n  };\n\n  _proto.onFeatureChange_ = function onFeatureChange_() {\n    var _this4 = this;\n\n    if (!this.feature) {\n      return;\n    }\n\n    this.featureLabel = this.feature.get('name') || '';\n    this.vectorSource_.clear();\n    this.vectorSource_.addFeature(this.feature);\n\n    if (this.onChange) {\n      this.timeout_(function () {\n        if (_this4.feature && _this4.onChange) {\n          _this4.onChange(_this4.feature);\n        }\n      });\n    }\n  };\n\n  _proto.onSelect_ = function onSelect_(selected) {\n    if (!this.feature || !this.map) {\n      return;\n    }\n\n    var coordinate = selected.coordinate.map(parseFloat);\n    var label = selected.label;\n    this.setFeature_(coordinate, label);\n    var newCoordinates = this.feature.getGeometry().getCoordinates();\n    this.map.getView().setCenter(newCoordinates);\n  };\n\n  _proto.snapFeature_ = function snapFeature_(feature) {\n    var _this5 = this;\n\n    var coord = this.getLonLatFromPoint_(feature);\n\n    if (!coord) {\n      return;\n    }\n\n    var config = {};\n\n    var onSuccess = function onSuccess(resp) {\n      var lon = parseFloat(resp.data.lon);\n      var lat = parseFloat(resp.data.lat);\n      var coordinate = [lon, lat];\n      var label = resp.data.display_name;\n\n      _this5.setFeature_(coordinate, label);\n    };\n\n    var onError = function onError(resp) {\n      _this5.errorMessage = 'Error: nominatim server not responding.';\n      console.log(resp);\n    };\n\n    this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess, onError);\n  };\n\n  _proto.getLonLatFromPoint_ = function getLonLatFromPoint_(point) {\n    if (!this.map) {\n      return null;\n    }\n\n    var geometry = point.getGeometry();\n\n    if (!(geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"])) {\n      throw new Error('Wrong time values type');\n    }\n\n    var coords = geometry.getCoordinates();\n    var projection = this.map.getView().getProjection();\n    return ol_proj_js__WEBPACK_IMPORTED_MODULE_3__[\"toLonLat\"](coords, projection);\n  };\n\n  return Controller;\n}();\n\nvar routingFeatureComponent = {\n  controller: Controller,\n  bindings: {\n    'map': '<ngeoRoutingFeatureMap',\n    'feature': '=ngeoRoutingFeatureFeature',\n    'fillColor': '<?ngeoRoutingFeatureFillColor',\n    'strokeColor': '<?ngeoRoutingFeatureStrokeColor',\n    'onChange': '=?ngeoRoutingFeatureOnChange'\n  },\n  templateUrl: ngeoRoutingFeatureTemplateUrl\n};\nmodule.component('ngeoRoutingFeature', routingFeatureComponent);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/routing/RoutingFeatureComponent.js?");

/***/ }),

/***/ "./src/routing/RoutingService.js":
/*!***************************************!*\
  !*** ./src/routing/RoutingService.js ***!
  \***************************************/
/*! exports provided: RoutingService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RoutingService\", function() { return RoutingService; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\nRoutingService.$inject = [\"$http\", \"$injector\"];\n\nfunction RoutingService($http, $injector) {\n  this.$http_ = $http;\n  this.routingOptions_ = $injector.has('ngeoRoutingOptions') ? $injector.get('ngeoRoutingOptions') : {};\n  this.ngeoOsrmBackendUrl_ = this.routingOptions_.backendUrl || 'https://router.project-osrm.org/';\n\n  if (this.ngeoOsrmBackendUrl_.substr(-1) !== '/') {\n    this.ngeoOsrmBackendUrl_ += '/';\n  }\n\n  this.protocolVersion_ = 'v1';\n}\n\nRoutingService.prototype.getRoute = function (coordinates, config) {\n  config = config || {};\n\n  if (!config.service) {\n    config.service = 'route';\n  }\n\n  if (!config.profile) {\n    config.profile = 'car';\n  }\n\n  var url = this.ngeoOsrmBackendUrl_;\n\n  if (config.instance) {\n    url += config.instance + \"/\";\n  }\n\n  url += config.service + \"/\" + this.protocolVersion_ + \"/\" + config.profile + \"/\";\n  var coordinateString = coordinates.map(function (c) {\n    return c.join(',');\n  }).join(';');\n  url += coordinateString;\n\n  if (config.options) {\n    url += '?';\n    var options = [];\n\n    for (var _i = 0, _Object$keys = Object.keys(config.options); _i < _Object$keys.length; _i++) {\n      var option = _Object$keys[_i];\n      options.push(option + \"=\" + config.options[option]);\n    }\n\n    url += options.join('&');\n  }\n\n  return this.$http_.get(url);\n};\n\nRoutingService.prototype.getNearest = function (coordinate, config) {\n  config = config || {};\n  config.service = 'nearest';\n\n  if (!config.profile) {\n    config.profile = 'car';\n  }\n\n  var url = this.ngeoOsrmBackendUrl_;\n\n  if (config.instance) {\n    url += config.instance + \"/\";\n  }\n\n  url += config.service + \"/\" + this.protocolVersion_ + \"/\" + config.profile + \"/\";\n  var coordinateString = coordinate.join(',');\n  url += coordinateString;\n\n  if (config.options) {\n    url += '?';\n    var options = [];\n\n    for (var _i2 = 0, _Object$keys2 = Object.keys(config.options); _i2 < _Object$keys2.length; _i2++) {\n      var option = _Object$keys2[_i2];\n      options.push(option + \"=\" + config.options[option]);\n    }\n\n    url += options.join('&');\n  }\n\n  return this.$http_.get(url);\n};\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingService', []);\nmodule.service('ngeoRoutingService', RoutingService);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/routing/RoutingService.js?");

/***/ }),

/***/ "./src/routing/module.js":
/*!*******************************!*\
  !*** ./src/routing/module.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_routing_RoutingComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/routing/RoutingComponent.js */ \"./src/routing/RoutingComponent.js\");\n/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routing.scss */ \"./src/routing/routing.scss\");\n/* harmony import */ var _routing_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_routing_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingModule', [ngeo_routing_RoutingComponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name]));\n\n//# sourceURL=webpack:///./src/routing/module.js?");

/***/ }),

/***/ "./src/routing/nominatiminput.html":
/*!*****************************************!*\
  !*** ./src/routing/nominatiminput.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div class=\"ngeo-nominatim-input\">\\n  <input type=\"text\"\\n         class=\"form-control\"\\n         placeholder=\"{{$ctrl.placeholder}}\"\\n         ng-model=\"$ctrl.inputValue\"\\n         ngeo-search=\"$ctrl.options\"\\n         ngeo-search-datasets=\"$ctrl.datasets\"\\n         ngeo-search-listeners=\"$ctrl.listeners\">\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/routing/nominatiminput.html?");

/***/ }),

/***/ "./src/routing/routing.html":
/*!**********************************!*\
  !*** ./src/routing/routing.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div class=\"ngeo-routing\">\\n  <div class=\"ngeo-routing-start form-group\">\\n    <ngeo-routing-feature\\n      ngeo-routing-feature-map=\"$ctrl.map\"\\n      ngeo-routing-feature-feature=\"$ctrl.startFeature_\"\\n      ngeo-routing-feature-fill-color=\"$ctrl.colors[\\'start.fill\\']\"\\n      ngeo-routing-feature-stroke-color=\"$ctrl.colors[\\'start.stroke\\']\"\\n      ngeo-routing-feature-on-change=\"$ctrl.handleChange\">\\n    </ngeo-routing-feature>\\n  </div>\\n\\n    <div class=\"ngeo-routing-vias form-group\" ng-repeat=\"(index, via) in $ctrl.viaArray\">\\n      <div class=\"form-inline\">\\n        <div class=\"form-group\">\\n          <ngeo-routing-feature\\n            ngeo-routing-feature-map=\"$ctrl.map\"\\n            ngeo-routing-feature-feature=\"via.feature\"\\n            ngeo-routing-feature-fill-color=\"$ctrl.colors[\\'via.fill\\']\"\\n            ngeo-routing-feature-stroke-color=\"$ctrl.colors[\\'via.stroke\\']\"\\n            ngeo-routing-feature-on-change=\"$ctrl.handleChange\">\\n          </ngeo-routing-feature>\\n        </div>\\n        <button type=\"button\" class=\"btn prime delete-via\" ng-click=\"$ctrl.deleteVia(index)\">\\n          <span class=\"fa fa-trash\"></span>\\n        </button>\\n      </div>\\n    </div>\\n\\n  <div class=\"ngeo-routing-destination form-group\">\\n    <ngeo-routing-feature\\n      ngeo-routing-feature-map=\"$ctrl.map\"\\n      ngeo-routing-feature-feature=\"$ctrl.targetFeature_\"\\n      ngeo-routing-feature-fill-color=\"$ctrl.colors[\\'destination.fill\\']\"\\n      ngeo-routing-feature-stroke-color=\"$ctrl.colors[\\'destination.stroke\\']\"\\n      ngeo-routing-feature-on-change=\"$ctrl.handleChange\">\\n    </ngeo-routing-feature>\\n  </div>\\n\\n  <div class=\"form-group fill\">\\n    <button type=\"button\" class=\"btn prime\" ng-click=\"$ctrl.clearRoute()\">\\n      <span class=\"fa fa-trash\"></span> <span translate>Clear</span>\\n    </button>\\n    <button type=\"button\" class=\"btn prime\" ng-click=\"$ctrl.reverseRoute()\">\\n      <span class=\"fa fa-exchange-alt\"></span> <span translate>Reverse</span>\\n    </button>\\n    <button type=\"button\" class=\"btn prime\" ng-click=\"$ctrl.addVia()\">\\n      <span class=\"fa fa-plus\"></span> <span translate>Add via</span>\\n    </button>\\n  </div>\\n\\n  <div class=\"clearfix\"></div>\\n\\n  <div ng-if=\"$ctrl.routingProfiles.length > 1\">\\n    <div class=\"form-group\">\\n      <label class=\"col-form-label col-md-4\" translate>Profile</label>\\n      <div class=\"col-md-8\">\\n        <select class=\"form-control\" ng-model=\"$ctrl.selectedRoutingProfile\">\\n          <option ng-repeat=\"profile in $ctrl.routingProfiles\" ng-value=\"profile\">{{profile.label}}</option>\\n        </select>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\"ngeo-routing-error form-group clearfix\"\\n       ng-hide=\"$ctrl.errorMessage === \\'\\'\">\\n    {{$ctrl.errorMessage}}\\n  </div>\\n\\n  <div class=\"clearfix\"></div>\\n\\n  <div ng-hide=\"$ctrl.routeDuration === null && $ctrl.routeDistance <= 0\">\\n    <div class=\"row\">\\n      <div class=\"col-md-12\">\\n        <strong translate>Route statistics</strong>\\n      </div>\\n    </div>\\n    <div class=\"row\" ng-hide=\"$ctrl.routeDuration === null\">\\n      <div class=\"col-md-4 text-right\" translate>\\n        Duration\\n      </div>\\n      <div class=\"col-md-8\">\\n        {{$ctrl.routeDuration | ngeoDuration}}\\n      </div>\\n    </div>\\n\\n    <div class=\"row\" ng-hide=\"$ctrl.routeDistance <= 0\">\\n      <div class=\"col-md-4 text-right\" translate>\\n        Distance\\n      </div>\\n      <div class=\"col-md-8\">\\n        {{$ctrl.routeDistance | ngeoUnitPrefix:\\'m\\'}}\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/routing/routing.html?");

/***/ }),

/***/ "./src/routing/routing.scss":
/*!**********************************!*\
  !*** ./src/routing/routing.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/routing/routing.scss?");

/***/ }),

/***/ "./src/routing/routingfeature.html":
/*!*****************************************!*\
  !*** ./src/routing/routingfeature.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div class=\"ngeo-routing-feature\">\\n    <div class=\"input-group\">\\n      <ngeo-nominatim-input\\n        ngeo-nominatim-input-value=\"$ctrl.featureLabel\"\\n        ngeo-nominatim-input-placeholder=\"{{\\'Search...\\' | translate}}\"\\n        ngeo-nominatim-input-on-select=\"$ctrl.onSelect\">\\n      </ngeo-nominatim-input>\\n      <div class=\"input-group-addon btn\" ng-click=\"$ctrl.set()\">\\n        <span class=\"fa fa-map-marker\"></span>\\n      </div>\\n    </div>\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./src/routing/routingfeature.html?");

/***/ }),

/***/ 37:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/routing.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/routing.js */\"./examples/routing.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/routing.js?");

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