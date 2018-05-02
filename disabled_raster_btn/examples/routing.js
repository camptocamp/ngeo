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
/******/ 	deferredModules.push([36,"commons"]);
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/routing/module.js */ "./src/routing/module.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");











var module = angular__WEBPACK_IMPORTED_MODULE_4___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_routing_module_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

function MainController() {
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      center: [931010.1535989442, 5961705.842297254],
      zoom: 9
    })
  });
  this.routingfeatureActive = true;
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/routing/NominatimInputComponent.js":
/*!************************************************!*\
  !*** ./src/routing/NominatimInputComponent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/search/searchDirective.js */ "./src/search/searchDirective.js");
/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ "./src/routing/NominatimService.js");
Controller.$inject = ["$element", "$injector", "$scope", "ngeoNominatimService"];



var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingNominatimInputComponent', [ngeo_search_searchDirective_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/nominatiminput', __webpack_require__(/*! ./nominatiminput.html */ "./src/routing/nominatiminput.html"));
}]);
module.value('ngeoRoutingNominatimInputComponentTemplateUrl', function ($attrs) {
  var templateUrl = $attrs['ngeoRoutingNominatimInputComponentTemplateUrl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/nominatiminput';
});
ngeoRoutingNominatimInputComponentTemplateUrl.$inject = ["$attrs", "ngeoRoutingNominatimInputComponentTemplateUrl"];

function ngeoRoutingNominatimInputComponentTemplateUrl($attrs, ngeoRoutingNominatimInputComponentTemplateUrl) {
  return ngeoRoutingNominatimInputComponentTemplateUrl($attrs);
}

function Controller($element, $injector, $scope, ngeoNominatimService) {
  this.element_ = $element;
  this.$scope_ = $scope;
  this.ngeoNominatimService = ngeoNominatimService;
  this.onSelect;
  this.inputValue;
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
module.component('ngeoNominatimInput', routingNominatimInputComponent);
/* harmony default export */ __webpack_exports__["default"] = (module);

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
NominatimService.$inject = ["$http", "$injector", "ngeoDebounce"];


function NominatimService($http, $injector, ngeoDebounce) {
  this.$http_ = $http;
  this.ngeoDebounce_ = ngeoDebounce;
  this.nominatimUrl_ = 'https://nominatim.openstreetmap.org/';

  if ($injector.has('ngeoNominatimUrl')) {
    this.nominatimUrl_ = $injector.get('ngeoNominatimUrl');

    if (this.nominatimUrl_.substr(-1) !== '/') {
      this.nominatimUrl_ += '/';
    }
  }

  this.searchDefaultParams_ = {};

  if ($injector.has('ngeoNominatimSearchDefaultParams')) {
    this.searchDefaultParams_ = $injector.get('ngeoNominatimSearchDefaultParams');
  }

  this.typeaheadDebounceDelay_ = 500;
  this.typeaheadSourceDebounced = this.ngeoDebounce_(this.typeaheadSource_.bind(this), this.typeaheadDebounceDelay_, true);
}

NominatimService.prototype.search = function (query, params) {
  var url = this.nominatimUrl_ + "search?q=" + query;
  params = params || {};
  params = Object.assign({}, this.searchDefaultParams_, params);
  params['format'] = 'json';

  if (params) {
    url += '&';
    var options = [];

    var _arr = Object.keys(params);

    for (var _i = 0; _i < _arr.length; _i++) {
      var option = _arr[_i];
      options.push(option + "=" + params[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

NominatimService.prototype.reverse = function (coordinate, params) {
  var url = this.nominatimUrl_ + "reverse";
  params = Object.assign({}, params);
  params['lon'] = coordinate[0];
  params['lat'] = coordinate[1];
  params['format'] = 'json';

  if (params) {
    url += '?';
    var options = [];

    var _arr2 = Object.keys(params);

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var option = _arr2[_i2];
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

    asyncResults(resp.data.map(parse));
  };

  var onError_ = function onError_(resp) {
    asyncResults([]);
  };

  this.search(query, {}).then(onSuccess_, onError_);
};

var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoNominatimService', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
module.service('ngeoNominatimService', NominatimService);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/routing/RoutingComponent.js":
/*!*****************************************!*\
  !*** ./src/routing/RoutingComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters.js */ "./src/misc/filters.js");
/* harmony import */ var ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/routing/NominatimService.js */ "./src/routing/NominatimService.js");
/* harmony import */ var ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/routing/RoutingService.js */ "./src/routing/RoutingService.js");
/* harmony import */ var ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/routing/RoutingFeatureComponent.js */ "./src/routing/RoutingFeatureComponent.js");
/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/GeoJSON.js */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_proj_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/proj.js */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_15__);
Controller.$inject = ["$injector", "$scope", "ngeoRoutingService", "ngeoNominatimService", "$q", "ngeoDebounce"];
















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingComponent', [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_routing_RoutingService_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, ngeo_routing_RoutingFeatureComponent_js__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/routing', __webpack_require__(/*! ./routing.html */ "./src/routing/routing.html"));
}]);
module.value('ngeoRoutingTemplateUrl', function ($attrs) {
  var templateUrl = $attrs['ngeoRoutingTemplateUrl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routing';
});
ngeoRoutingTemplateUrl.$inject = ["$attrs", "ngeoRoutingTemplateUrl"];

function ngeoRoutingTemplateUrl($attrs, ngeoRoutingTemplateUrl) {
  return ngeoRoutingTemplateUrl($attrs);
}

function Controller($injector, $scope, ngeoRoutingService, ngeoNominatimService, $q, ngeoDebounce) {
  var _this = this;

  this.$scope_ = $scope;
  this.ngeoRoutingService_ = ngeoRoutingService;
  this.ngeoNominatimService_ = ngeoNominatimService;
  this.routingOptions_ = $injector.has('ngeoRoutingOptions') ? $injector.get('ngeoRoutingOptions') : {};
  this.routingProfiles = this.routingOptions_.profiles || [];
  this.selectedRoutingProfile = this.routingProfiles.length > 0 ? this.routingProfiles[0] : null;
  $scope.$watch(function () {
    return _this.selectedRoutingProfile;
  }, this.calculateRoute.bind(this));
  this.$q_ = $q;
  this.map;
  this.errorMessage = '';
  this.startFeature_ = null;
  this.targetFeature_ = null;
  this.viaArray = [];
  this.colors = {
    'start.fill': '#6BE62E',
    'start.stroke': '#4CB01E',
    'destination.fill': '#FF3E13',
    'destination.stroke': '#CD3412',
    'via.fill': '#767676',
    'via.stroke': '#000000'
  };
  this.routeSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    features: []
  });
  this.routeLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
    source: this.routeSource_,
    style: new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        color: 'rgba(16, 112, 29, 0.6)'
      }),
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
        color: 'rgba(16, 112, 29, 0.6)',
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

Controller.prototype.$onInit = function () {
  this.map.addLayer(this.routeLayer_);
};

Controller.prototype.clearRoute = function () {
  this.startFeature_ = null;
  this.targetFeature_ = null;
  this.viaArray = [];
  this.routeDistance = 0;
  this.routeDuration = null;
  this.routeSource_.clear();
  this.errorMessage = '';
};

Controller.prototype.getLonLatFromPoint_ = function (point) {
  var geometry = point.getGeometry();
  var coords = geometry.getCoordinates();
  var projection = this.map.getView().getProjection();
  return ol_proj_js__WEBPACK_IMPORTED_MODULE_12__["toLonLat"](coords, projection);
};

Controller.prototype.reverseRoute = function () {
  var tmpFeature = this.startFeature_;
  this.startFeature_ = this.targetFeature_;
  this.targetFeature_ = tmpFeature;
  this.viaArray = this.viaArray.reverse();
};

Controller.prototype.parseRoute_ = function (route) {
  var parsedRoutes = [];
  var format = new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  var formatConfig = {
    dataProjection: 'EPSG:4326',
    featureProjection: this.map.getView().getProjection()
  };

  if (route.legs) {
    var _ref;

    parsedRoutes = route.legs.map(function (leg) {
      return leg.steps.map(function (step) {
        return new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
          geometry: format.readGeometry(step.geometry, formatConfig)
        });
      });
    });
    parsedRoutes = (_ref = []).concat.apply(_ref, parsedRoutes);
  } else if (route.geometry) {
    parsedRoutes.push(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      geometry: format.readGeometry(route.geometry, formatConfig)
    }));
  }

  return parsedRoutes;
};

Controller.prototype.calculateRoute = function () {
  var _this2 = this;

  if (this.startFeature_ && this.targetFeature_) {
    this.routeSource_.clear();
    var coordFrom = this.getLonLatFromPoint_(this.startFeature_);
    var coordTo = this.getLonLatFromPoint_(this.targetFeature_);
    var vias = this.viaArray.filter(function (via) {
      return via.feature !== null;
    }).map(function (via) {
      return _this2.getLonLatFromPoint_(via.feature);
    });
    var route = [coordFrom].concat(vias, [coordTo]);

    var onSuccess_ = function (resp) {
      var features = this.parseRoute_(resp.data.routes[0]);

      if (features.length === 0) {
        console.log('No route or not supported format.');
        return;
      }

      this.routeSource_.addFeatures(features);
      this.map.getView().fit(this.routeSource_.getExtent());
      this.routeDistance = parseInt(resp.data.routes[0].distance, 10);
      this.routeDuration = resp.data.routes[0].duration;
      var startRoute = features[0].getGeometry().getCoordinateAt(0);
      var endRoute = features[features.length - 1].getGeometry().getCoordinateAt(1);
      var startToRoute = [this.startFeature_.getGeometry().getCoordinates(), startRoute];
      var routeToEnd = [endRoute, this.targetFeature_.getGeometry().getCoordinates()];
      var routeConnections = [new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__["default"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__["default"](startToRoute)), new ol_Feature_js__WEBPACK_IMPORTED_MODULE_13__["default"](new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_14__["default"](routeToEnd))];
      this.routeSource_.addFeatures(routeConnections);
    }.bind(this);

    var onError_ = function (resp) {
      this.errorMessage = 'Error: routing server not responding.';
      console.log(resp);
    }.bind(this);

    var options = {};
    options['steps'] = true;
    options['overview'] = false;
    options['geometries'] = 'geojson';
    var config = {};
    config['options'] = options;

    if (this.selectedRoutingProfile) {
      config['instance'] = this.selectedRoutingProfile['profile'];
    }

    this.$q_.when(this.ngeoRoutingService_.getRoute(route, config)).then(onSuccess_.bind(this), onError_.bind(this));
  }
};

Controller.prototype.addVia = function () {
  this.viaArray.push({
    feature: null,
    onSelect: null
  });
};

Controller.prototype.deleteVia = function (index) {
  if (this.viaArray.length > index) {
    this.viaArray.splice(index, 1);
    this.calculateRoute();
  }
};

module.component('ngeoRouting', {
  controller: Controller,
  bindings: {
    'map': '<ngeoRoutingMap'
  },
  templateUrl: ngeoRoutingTemplateUrl
});
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/routing/RoutingFeatureComponent.js":
/*!************************************************!*\
  !*** ./src/routing/RoutingFeatureComponent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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
Controller.$inject = ["$scope", "$timeout", "$q", "ngeoNominatimService"];
















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingFeatureComponent', [ngeo_routing_NominatimService_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_routing_NominatimInputComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/routing/routingfeature', __webpack_require__(/*! ./routingfeature.html */ "./src/routing/routingfeature.html"));
}]);
module.value('ngeoRoutingFeatureTemplateUrl', function ($attrs) {
  var templateUrl = $attrs['ngeoRoutingFeatureTemplateUrl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/routing/routingfeature';
});
ngeoRoutingFeatureTemplateUrl.$inject = ["$attrs", "ngeoRoutingFeatureTemplateUrl"];

function ngeoRoutingFeatureTemplateUrl($attrs, ngeoRoutingFeatureTemplateUrl) {
  return ngeoRoutingFeatureTemplateUrl($attrs);
}

function Controller($scope, $timeout, $q, ngeoNominatimService) {
  this.scope_ = $scope;
  this.timeout_ = $timeout;
  this.$q_ = $q;
  this.ngeoNominatimService_ = ngeoNominatimService;
  this.map;
  this.feature;
  this.featureLabel = '';
  this.fillColor;
  this.strokeColor;
  this.onChange;
  this.vectorFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this.vectorSource_ = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    features: this.vectorFeatures_
  });
  this.vectorLayer_ = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    source: this.vectorSource_,
    style: function (feature, resolution) {
      return [new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        text: new ol_style_Text_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
          fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
            color: this.fillColor || '#000000'
          }),
          font: 'normal 30px FontAwesome',
          offsetY: -15,
          stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
            width: 3,
            color: this.strokeColor || '#000000'
          }),
          text: "\uF041"
        })
      })];
    }.bind(this)
  });
  this.modifyFeature_ = new ol_interaction_Modify_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
    features: this.vectorFeatures_
  });
  this.draw_ = null;
  this.onSelect = this.onSelect_.bind(this);
  this.errorMessage = '';
}

Controller.prototype.$onInit = function () {
  var _this = this;

  this.map.addLayer(this.vectorLayer_);
  this.modifyFeature_.setActive(true);
  this.map.addInteraction(this.modifyFeature_);
  this.modifyFeature_.on('modifyend', function (event) {
    var feature = event.features.getArray()[0];

    _this.vectorSource_.clear();

    _this.snapFeature_(feature);
  });
  this.scope_.$watch(function () {
    return _this.feature;
  }, function (newVal, oldVal) {
    if (newVal) {
      _this.onFeatureChange_();
    }

    if (newVal === null) {
      _this.vectorSource_.clear();

      _this.featureLabel = '';
    }
  });
};

Controller.prototype.$onDestroy = function () {
  this.map.removeLayer(this.vectorLayer_);
  this.modifyFeature_.setActive(false);
  this.map.removeInteraction(this.modifyFeature_);
};

Controller.prototype.set = function () {
  var _this2 = this;

  if (this.draw_) {
    this.map.removeInteraction(this.draw_);
  }

  this.draw_ = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    features: this.vectorFeatures_,
    type: 'Point'
  });
  this.draw_.on('drawstart', function () {
    if (_this2.feature) {
      _this2.vectorSource_.removeFeature(_this2.feature);
    }
  });
  this.draw_.on('drawend', function (event) {
    if (_this2.draw_) {
      _this2.map.removeInteraction(_this2.draw_);
    }

    _this2.snapFeature_(event.feature);

    _this2.modifyFeature_.setActive(true);
  });
  this.modifyFeature_.setActive(false);
  this.map.addInteraction(this.draw_);
};

Controller.prototype.setFeature_ = function (coordinate, label) {
  var transformedCoordinate = ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"](coordinate, this.map.getView().getProjection());

  if (label === '') {
    label = transformedCoordinate.join('/');
  }

  this.feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    geometry: new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"](transformedCoordinate),
    name: label
  });
};

Controller.prototype.onFeatureChange_ = function () {
  var _this3 = this;

  this.featureLabel = this.feature.get('name') || '';
  this.vectorSource_.clear();
  this.vectorSource_.addFeature(this.feature);

  if (this.onChange) {
    this.timeout_(function () {
      _this3.onChange(_this3.feature);
    });
  }
};

Controller.prototype.onSelect_ = function (selected) {
  var coordinate = selected.coordinate.map(parseFloat);
  var label = selected.label;
  this.setFeature_(coordinate, label);
  var newCoordinates = this.feature.getGeometry().getCoordinates();
  this.map.getView().setCenter(newCoordinates);
};

Controller.prototype.snapFeature_ = function (feature) {
  var coord = this.getLonLatFromPoint_(feature);
  var config = {};

  var onSuccess = function (resp) {
    var lon = parseFloat(resp['data']['lon']);
    var lat = parseFloat(resp['data']['lat']);
    var coordinate = [lon, lat];
    var label = resp['data']['display_name'];
    this.setFeature_(coordinate, label);
  }.bind(this);

  var onError = function (resp) {
    this.errorMessage = 'Error: nominatim server not responding.';
    console.log(resp);
  }.bind(this);

  this.$q_.when(this.ngeoNominatimService_.reverse(coord, config)).then(onSuccess.bind(this), onError.bind(this));
};

Controller.prototype.getLonLatFromPoint_ = function (point) {
  var geometry = point.getGeometry();
  var coords = geometry.getCoordinates();
  var projection = this.map.getView().getProjection();
  return ol_proj_js__WEBPACK_IMPORTED_MODULE_3__["toLonLat"](coords, projection);
};

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
module.component('ngeoRoutingFeature', routingFeatureComponent);
/* harmony default export */ __webpack_exports__["default"] = (module);

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
RoutingService.$inject = ["$http", "$injector"];

function RoutingService($http, $injector) {
  this.$http_ = $http;
  this.routingOptions_ = $injector.has('ngeoRoutingOptions') ? $injector.get('ngeoRoutingOptions') : {};
  this.ngeoOsrmBackendUrl_ = this.routingOptions_.backendUrl || 'https://router.project-osrm.org/';

  if (this.ngeoOsrmBackendUrl_.substr(-1) !== '/') {
    this.ngeoOsrmBackendUrl_ += '/';
  }

  this.protocolVersion_ = 'v1';
}

RoutingService.prototype.getRoute = function (coordinates, config) {
  config = config || {};

  if (!config['service']) {
    config['service'] = 'route';
  }

  if (!config['profile']) {
    config['profile'] = 'car';
  }

  var url = this.ngeoOsrmBackendUrl_;

  if (config['instance']) {
    url += config['instance'] + "/";
  }

  url += config['service'] + "/" + this.protocolVersion_ + "/" + config['profile'] + "/";
  var coordinateString = coordinates.map(function (c) {
    return c.join(',');
  }).join(';');
  url += coordinateString;

  if (config.options) {
    url += '?';
    var options = [];

    var _arr = Object.keys(config.options);

    for (var _i = 0; _i < _arr.length; _i++) {
      var option = _arr[_i];
      options.push(option + "=" + config.options[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

RoutingService.prototype.getNearest = function (coordinate, config) {
  config = config || {};
  config['service'] = 'nearest';

  if (!config['profile']) {
    config['profile'] = 'car';
  }

  var url = this.ngeoOsrmBackendUrl_;

  if (config['instance']) {
    url += config['instance'] + "/";
  }

  url += config['service'] + "/" + this.protocolVersion_ + "/" + config['profile'] + "/";
  var coordinateString = coordinate.join(',');
  url += coordinateString;

  if (config.options) {
    url += '?';
    var options = [];

    var _arr2 = Object.keys(config.options);

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var option = _arr2[_i2];
      options.push(option + "=" + config.options[option]);
    }

    url += options.join('&');
  }

  return this.$http_.get(url);
};

var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoRoutingService', []);
module.service('ngeoRoutingService', RoutingService);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/routing/module.js":
/*!*******************************!*\
  !*** ./src/routing/module.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
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
__p += '<div class="ngeo-routing">\n  <div class="ngeo-routing-start form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.startFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors[\'start.fill\']"\n      ngeo-routing-feature-stroke-color="$ctrl.colors[\'start.stroke\']"\n      ngeo-routing-feature-on-change="$ctrl.handleChange">\n    </ngeo-routing-feature>\n  </div>\n\n    <div class="ngeo-routing-vias form-group" ng-repeat="(index, via) in $ctrl.viaArray">\n      <div class="form-inline">\n        <div class="form-group">\n          <ngeo-routing-feature\n            ngeo-routing-feature-map="$ctrl.map"\n            ngeo-routing-feature-feature="via.feature"\n            ngeo-routing-feature-fill-color="$ctrl.colors[\'via.fill\']"\n            ngeo-routing-feature-stroke-color="$ctrl.colors[\'via.stroke\']"\n            ngeo-routing-feature-on-change="$ctrl.handleChange">\n          </ngeo-routing-feature>\n        </div>\n        <button type="button" class="btn btn-default delete-via" ng-click="$ctrl.deleteVia(index)">\n          <span class="fa fa-trash"></span>\n        </button>\n      </div>\n    </div>\n\n  <div class="ngeo-routing-destination form-group">\n    <ngeo-routing-feature\n      ngeo-routing-feature-map="$ctrl.map"\n      ngeo-routing-feature-feature="$ctrl.targetFeature_"\n      ngeo-routing-feature-fill-color="$ctrl.colors[\'destination.fill\']"\n      ngeo-routing-feature-stroke-color="$ctrl.colors[\'destination.stroke\']"\n      ngeo-routing-feature-on-change="$ctrl.handleChange">\n    </ngeo-routing-feature>\n  </div>\n\n  <div class="form-group fill">\n    <button type="button" class="btn btn-default" ng-click="$ctrl.clearRoute()">\n      <span class="fa fa-trash"></span> <span translate>Clear</span>\n    </button>\n    <button type="button" class="btn btn-default" ng-click="$ctrl.reverseRoute()">\n      <span class="fa fa-exchange-alt"></span> <span translate>Reverse</span>\n    </button>\n    <button type="button" class="btn btn-default" ng-click="$ctrl.addVia()">\n      <span class="fa fa-plus"></span> <span translate>Add via</span>\n    </button>\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-if="$ctrl.routingProfiles.length > 1">\n    <div class="form-group">\n      <label class="col-form-label col-md-4" translate>Profile</label>\n      <div class="col-md-8">\n        <select class="form-control" ng-model="$ctrl.selectedRoutingProfile">\n          <option ng-repeat="profile in $ctrl.routingProfiles" ng-value="profile">{{profile.label}}</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n  <div class="ngeo-routing-error form-group clearfix"\n       ng-hide="$ctrl.errorMessage === \'\'">\n    {{$ctrl.errorMessage}}\n  </div>\n\n  <div class="clearfix"></div>\n\n  <div ng-hide="$ctrl.routeDuration === null && $ctrl.routeDistance <= 0">\n    <div class="row">\n      <div class="col-md-12">\n        <strong translate>Route statistics</strong>\n      </div>\n    </div>\n    <div class="row" ng-hide="$ctrl.routeDuration === null">\n      <div class="col-md-4 text-right" translate>\n        Duration\n      </div>\n      <div class="col-md-8">\n        {{$ctrl.routeDuration | ngeoDuration}}\n      </div>\n    </div>\n\n    <div class="row" ng-hide="$ctrl.routeDistance <= 0">\n      <div class="col-md-4 text-right" translate>\n        Distance\n      </div>\n      <div class="col-md-8">\n        {{$ctrl.routeDistance | ngeoUnitPrefix:\'m\'}}\n      </div>\n    </div>\n  </div>\n</div>\n';

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

/***/ 36:
/*!****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/routing.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/routing.js */"./examples/routing.js");


/***/ })

/******/ });
//# sourceMappingURL=routing.js.map