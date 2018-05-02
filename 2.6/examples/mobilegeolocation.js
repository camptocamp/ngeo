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
/******/ 		"mobilegeolocation": 0
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
/******/ 	deferredModules.push([27,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/mobilegeolocation.css":
/*!****************************************!*\
  !*** ./examples/mobilegeolocation.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/mobilegeolocation.js":
/*!***************************************!*\
  !*** ./examples/mobilegeolocation.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobilegeolocation.css */ "./examples/mobilegeolocation.css");
/* harmony import */ var _mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_geolocation_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/geolocation/component.js */ "./src/geolocation/component.js");
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
const appmodule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_geolocation_component_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr The ngeo feature
 *     overlay manager service.
 * @constructor
 * @ngInject
 */
function MainController($scope, ngeoFeatureOverlayMgr) {
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [0, 0],
      zoom: 4,
    }),
  });

  ngeoFeatureOverlayMgr.init(this.map);
}

appmodule.controller('MainController', MainController);

appmodule.constant('ngeoGeolocationOptions', {
  positionFeatureStyle: {
    circle: {
      radius: 6,
      fill: {color: 'rgba(230, 100, 100, 1)'},
      stroke: {color: 'rgba(230, 40, 40, 1)', width: 2},
    },
  },
  accuracyFeatureStyle: {
    fill: {color: 'rgba(100, 100, 230, 0.3)'},
    stroke: {color: 'rgba(40, 40, 230, 1)', width: 2},
  },
  zoom: 17,
  autoRotate: true,
});

/* harmony default export */ __webpack_exports__["default"] = (module);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/ol/Geolocation.js":
/*!****************************************************************************!*\
  !*** delegated ./node_modules/ol/Geolocation.js from dll-reference vendor ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1066);

/***/ }),

/***/ "./src/geolocation/component.js":
/*!**************************************!*\
  !*** ./src/geolocation/component.js ***!
  \**************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ "./src/map/FeatureOverlayMgr.js");
/* harmony import */ var ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Notification.js */ "./src/message/Notification.js");
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/easing.js */ "./node_modules/ol/easing.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Geolocation.js */ "./node_modules/ol/Geolocation.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ngeo_options_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/options.js */ "./src/options.js");
Controller.$inject = ["$scope", "$element", "gettextCatalog", "ngeoFeatureOverlayMgr", "ngeoNotification", "ngeoGeolocationOptions"];











var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoGeolocation', [ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
var GeolocationEventType = {
  ERROR: 'geolocation-error'
};

function geolocationComponent() {
  return {
    restrict: 'A',
    scope: {
      'map': '<ngeoGeolocationMap',
      'loading': '=ngeoGeolocationLoading'
    },
    controller: 'ngeoGeolocationController',
    bindToController: true
  };
}

myModule.directive('ngeoGeolocation', geolocationComponent);
function Controller($scope, $element, gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification, ngeoGeolocationOptions) {
  this.options = ngeoGeolocationOptions;
  $element.on('click', this.toggleTracking.bind(this));
  this.$scope_ = $scope;
  this.notification_ = ngeoNotification;
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;
  this.gettextCatalog_ = gettextCatalog;
  this.map;
  this.loading;
}

Controller.prototype.$onInit = function () {
  var _this = this;

  if (!(this.map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"])) {
    throw new Error('Wrong map type');
  }

  this.featureOverlay_ = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  this.geolocation_ = new ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    projection: this.map.getView().getProjection(),
    trackingOptions: {
      enableHighAccuracy: true
    }
  });

  if (this.options.autoRotate) {
    this.autoRotateListener();
  }

  var gettextCatalog = this.gettextCatalog_;
  this.geolocation_.on('error', function (error) {
    _this.untrack_();

    var msg;

    switch (error.code) {
      case 1:
        msg = gettextCatalog.getString('User denied the request for Geolocation.');
        break;

      case 2:
        msg = gettextCatalog.getString('Location information is unavailable.');
        break;

      case 3:
        msg = gettextCatalog.getString('The request to get user location timed out.');
        break;

      default:
        msg = gettextCatalog.getString('Geolocation: An unknown error occurred.');
        break;
    }

    _this.notification_.error(msg);

    _this.$scope_.$emit(GeolocationEventType.ERROR, error);
  });
  this.positionFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this.positionFeature_.setStyle(Object(ngeo_options_js__WEBPACK_IMPORTED_MODULE_10__["buildStyle"])(this.options.positionFeatureStyle));
  this.accuracyFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
  this.accuracyFeature_.setStyle(Object(ngeo_options_js__WEBPACK_IMPORTED_MODULE_10__["buildStyle"])(this.options.accuracyFeatureStyle));
  this.follow_ = false;
  this.viewChangedByMe_ = false;
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"])(this.geolocation_, 'change:accuracyGeometry', function (evt) {
    var geometry = _this.geolocation_.getAccuracyGeometry();

    if (!geometry) {
      throw new Error('Missing geometry');
    }

    _this.accuracyFeature_.setGeometry(geometry);

    _this.setPosition_();
  });
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"])(this.geolocation_, 'change:position', function () {
    _this.setPosition_();
  });
  var view = this.map.getView();
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"])(view, 'change:center', this.handleViewChange_, this);
  Object(ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"])(view, 'change:resolution', this.handleViewChange_, this);

  if (this.options.atLoadingTime && this.loading !== undefined) {
    this.$scope_.$watch(function () {
      return _this.loading;
    }, function (newVal) {
      if (newVal === false) {
        _this.toggleTracking();
      }
    });
  }
};

Controller.prototype.toggleTracking = function () {
  if (this.geolocation_.getTracking()) {
    var currentPosition = this.geolocation_.getPosition();

    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(GeolocationEventType.ERROR, null);
      return;
    }

    var view = this.map.getView();
    var center = view.getCenter();

    if (!center) {
      throw new Error('Missing center');
    }

    var diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);

    if (diff < 2) {
      this.untrack_();
    } else {
      view.setCenter(currentPosition);
      this.untrack_();
      this.track_();
    }
  } else {
    this.track_();
  }
};

Controller.prototype.track_ = function () {
  this.featureOverlay_.addFeature(this.positionFeature_);
  this.featureOverlay_.addFeature(this.accuracyFeature_);
  this.follow_ = true;
  this.geolocation_.setTracking(true);
};

Controller.prototype.untrack_ = function () {
  this.featureOverlay_.clear();
  this.follow_ = false;
  this.geolocation_.setTracking(false);
  this.notification_.clear();
};

Controller.prototype.setPosition_ = function () {
  var view = this.map.getView();
  var position = this.geolocation_.getPosition();

  if (position === undefined) {
    throw new Error('Missing position');
  }

  var point = new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__["default"](position);
  this.positionFeature_.setGeometry(point);
  var accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;

    if (this.options.zoom !== undefined) {
      view.setCenter(position);
      view.setZoom(this.options.zoom);
    } else if (accuracy instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      var size = this.map.getSize();

      if (size === undefined) {
        throw new Error('Missing size');
      }

      view.fit(accuracy, {
        size: size
      });
    }

    this.viewChangedByMe_ = false;
  }
};

Controller.prototype.handleViewChange_ = function (event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};

Controller.prototype.autoRotateListener = function () {
  var _this2 = this;

  var currentAlpha = 0;

  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener('deviceorientationabsolute', function (event) {
      if (!(event instanceof DeviceOrientationEvent)) {
        throw new Error('Wrong event type');
      }

      if (event.alpha !== null) {
        currentAlpha = _this2.handleRotate_(event.alpha, currentAlpha);
      }
    }, true);
  } else if (window.hasOwnProperty('ondeviceorientation')) {
    window.addEventListener('deviceorientation', function (evt) {
      if (evt.webkitCompassHeading) {
        currentAlpha = _this2.handleRotate_(-evt.webkitCompassHeading, currentAlpha);
      } else {
        if (!evt.alpha) {
          throw new Error('Missing evt.alpha');
        }

        currentAlpha = _this2.handleRotate_(evt.alpha - 270, currentAlpha);
      }
    }, true);
  } else {
    console.error('Orientation is not supported on this device');
  }
};

Controller.prototype.handleRotate_ = function (eventAlpha, currentAlpha) {
  if (this.geolocation_.getTracking() && Math.abs(eventAlpha - currentAlpha) > 0.2) {
    currentAlpha = eventAlpha;
    var radAlpha = currentAlpha * Math.PI / 180;
    this.map.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_3__["linear"]
    });
  }

  return currentAlpha;
};

myModule.controller('ngeoGeolocationController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! exports provided: buildStyle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildStyle", function() { return buildStyle; });
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/style/RegularShape.js */ "./node_modules/ol/style/RegularShape.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







function buildStyle(styleDescriptor) {
  if (styleDescriptor instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
    return styleDescriptor;
  } else if (!styleDescriptor) {
    return ol_style_Style_js__WEBPACK_IMPORTED_MODULE_4__["createDefaultStyle"];
  } else if (Array.isArray(styleDescriptor)) {
    var result = [];

    for (var _iterator = _createForOfIteratorHelperLoose(styleDescriptor), _step; !(_step = _iterator()).done;) {
      var style = _step.value;
      result.push(buildStyle(style));
    }

    return result;
  } else {
    var _style = {};
    Object.assign(_style, styleDescriptor);
    var sd = styleDescriptor;

    if (sd.fill) {
      _style.fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_2__["default"](sd.fill);
    }

    if (sd.stroke) {
      _style.stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_3__["default"](sd.stroke);
    }

    if (sd.circle) {
      var circleStyle = {};
      Object.assign(circleStyle, sd.circle);

      if (sd.circle.fill) {
        circleStyle.fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_2__["default"](sd.circle.fill);
      }

      if (sd.circle.stroke) {
        circleStyle.stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_3__["default"](sd.circle.stroke);
      }

      _style.image = new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_0__["default"](circleStyle);
      delete _style.circle;
    } else if (sd.regularShape) {
      var regularShapeStyle = {};
      Object.assign(regularShapeStyle, sd.regularShape);

      if (sd.regularShape.fill) {
        regularShapeStyle.fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_2__["default"](sd.regularShape.fill);
      }

      if (sd.regularShape.stroke) {
        regularShapeStyle.stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_3__["default"](sd.regularShape.stroke);
      }

      if (sd.regularShape.angle) {
        sd.regularShape.angle = sd.regularShape.angle / 180 * Math.PI;
      }

      if (sd.regularShape.rotation) {
        sd.regularShape.rotation = sd.regularShape.angle / 180 * Math.PI;
      }

      _style.image = new ol_style_RegularShape_js__WEBPACK_IMPORTED_MODULE_1__["default"](regularShapeStyle);
      delete _style.regularShape;
    }

    return new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_4__["default"](_style);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (null);

/***/ }),

/***/ 27:
/*!**************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mobilegeolocation.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/mobilegeolocation.js */"./examples/mobilegeolocation.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb2xvY2F0aW9uL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibW9iaWxlZ2VvbG9jYXRpb25cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzI3LFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNS0yMDIxIENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9tb2JpbGVnZW9sb2NhdGlvbi5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcblxuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb0dlb2xvY2F0aW9uIGZyb20gJ25nZW8vZ2VvbG9jYXRpb24vY29tcG9uZW50LmpzJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgYXBwbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9HZW9sb2NhdGlvbi5uYW1lLCBuZ2VvTWFwTW9kdWxlLm5hbWVdKTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gKiBAcGFyYW0ge2ltcG9ydChcIm5nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyLmpzXCIpLkZlYXR1cmVPdmVybGF5TWdyfSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IgVGhlIG5nZW8gZmVhdHVyZVxuICogICAgIG92ZXJsYXkgbWFuYWdlciBzZXJ2aWNlLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJvbC9NYXAuanNcIikuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMCwgMF0sXG4gICAgICB6b29tOiA0LFxuICAgIH0pLFxuICB9KTtcblxuICBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG59XG5cbmFwcG1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcblxuYXBwbW9kdWxlLmNvbnN0YW50KCduZ2VvR2VvbG9jYXRpb25PcHRpb25zJywge1xuICBwb3NpdGlvbkZlYXR1cmVTdHlsZToge1xuICAgIGNpcmNsZToge1xuICAgICAgcmFkaXVzOiA2LFxuICAgICAgZmlsbDoge2NvbG9yOiAncmdiYSgyMzAsIDEwMCwgMTAwLCAxKSd9LFxuICAgICAgc3Ryb2tlOiB7Y29sb3I6ICdyZ2JhKDIzMCwgNDAsIDQwLCAxKScsIHdpZHRoOiAyfSxcbiAgICB9LFxuICB9LFxuICBhY2N1cmFjeUZlYXR1cmVTdHlsZToge1xuICAgIGZpbGw6IHtjb2xvcjogJ3JnYmEoMTAwLCAxMDAsIDIzMCwgMC4zKSd9LFxuICAgIHN0cm9rZToge2NvbG9yOiAncmdiYSg0MCwgNDAsIDIzMCwgMSknLCB3aWR0aDogMn0sXG4gIH0sXG4gIHpvb206IDE3LFxuICBhdXRvUm90YXRlOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTtcbiIsIkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRlbGVtZW50XCIsIFwiZ2V0dGV4dENhdGFsb2dcIiwgXCJuZ2VvRmVhdHVyZU92ZXJsYXlNZ3JcIiwgXCJuZ2VvTm90aWZpY2F0aW9uXCIsIFwibmdlb0dlb2xvY2F0aW9uT3B0aW9uc1wiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1nci5qcyc7XG5pbXBvcnQgbmdlb01lc3NhZ2VOb3RpZmljYXRpb24gZnJvbSAnbmdlby9tZXNzYWdlL05vdGlmaWNhdGlvbi5qcyc7XG5pbXBvcnQgKiBhcyBvbEVhc2luZyBmcm9tICdvbC9lYXNpbmcuanMnO1xuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAnb2wvZXZlbnRzLmpzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbi5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbmltcG9ydCBQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbi5qcyc7XG5pbXBvcnQgeyBidWlsZFN0eWxlIH0gZnJvbSAnbmdlby9vcHRpb25zLmpzJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvR2VvbG9jYXRpb24nLCBbbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLm5hbWUsIG5nZW9NZXNzYWdlTm90aWZpY2F0aW9uLm5hbWVdKTtcbnZhciBHZW9sb2NhdGlvbkV2ZW50VHlwZSA9IHtcbiAgRVJST1I6ICdnZW9sb2NhdGlvbi1lcnJvcidcbn07XG5cbmZ1bmN0aW9uIGdlb2xvY2F0aW9uQ29tcG9uZW50KCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdtYXAnOiAnPG5nZW9HZW9sb2NhdGlvbk1hcCcsXG4gICAgICAnbG9hZGluZyc6ICc9bmdlb0dlb2xvY2F0aW9uTG9hZGluZydcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICduZ2VvR2VvbG9jYXRpb25Db250cm9sbGVyJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG59XG5cbm15TW9kdWxlLmRpcmVjdGl2ZSgnbmdlb0dlb2xvY2F0aW9uJywgZ2VvbG9jYXRpb25Db21wb25lbnQpO1xuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgZ2V0dGV4dENhdGFsb2csIG5nZW9GZWF0dXJlT3ZlcmxheU1nciwgbmdlb05vdGlmaWNhdGlvbiwgbmdlb0dlb2xvY2F0aW9uT3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBuZ2VvR2VvbG9jYXRpb25PcHRpb25zO1xuICAkZWxlbWVudC5vbignY2xpY2snLCB0aGlzLnRvZ2dsZVRyYWNraW5nLmJpbmQodGhpcykpO1xuICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG4gIHRoaXMubm90aWZpY2F0aW9uXyA9IG5nZW9Ob3RpZmljYXRpb247XG4gIHRoaXMubmdlb0ZlYXR1cmVPdmVybGF5TWdyXyA9IG5nZW9GZWF0dXJlT3ZlcmxheU1ncjtcbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZ18gPSBnZXR0ZXh0Q2F0YWxvZztcbiAgdGhpcy5tYXA7XG4gIHRoaXMubG9hZGluZztcbn1cblxuQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoISh0aGlzLm1hcCBpbnN0YW5jZW9mIG9sTWFwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbWFwIHR5cGUnKTtcbiAgfVxuXG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfID0gdGhpcy5uZ2VvRmVhdHVyZU92ZXJsYXlNZ3JfLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gIHRoaXMuZ2VvbG9jYXRpb25fID0gbmV3IG9sR2VvbG9jYXRpb24oe1xuICAgIHByb2plY3Rpb246IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCksXG4gICAgdHJhY2tpbmdPcHRpb25zOiB7XG4gICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSkge1xuICAgIHRoaXMuYXV0b1JvdGF0ZUxpc3RlbmVyKCk7XG4gIH1cblxuICB2YXIgZ2V0dGV4dENhdGFsb2cgPSB0aGlzLmdldHRleHRDYXRhbG9nXztcbiAgdGhpcy5nZW9sb2NhdGlvbl8ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgX3RoaXMudW50cmFja18oKTtcblxuICAgIHZhciBtc2c7XG5cbiAgICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdVc2VyIGRlbmllZCB0aGUgcmVxdWVzdCBmb3IgR2VvbG9jYXRpb24uJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnTG9jYXRpb24gaW5mb3JtYXRpb24gaXMgdW5hdmFpbGFibGUuJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnVGhlIHJlcXVlc3QgdG8gZ2V0IHVzZXIgbG9jYXRpb24gdGltZWQgb3V0LicpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdHZW9sb2NhdGlvbjogQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgX3RoaXMubm90aWZpY2F0aW9uXy5lcnJvcihtc2cpO1xuXG4gICAgX3RoaXMuJHNjb3BlXy4kZW1pdChHZW9sb2NhdGlvbkV2ZW50VHlwZS5FUlJPUiwgZXJyb3IpO1xuICB9KTtcbiAgdGhpcy5wb3NpdGlvbkZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSgpO1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8uc2V0U3R5bGUoYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMucG9zaXRpb25GZWF0dXJlU3R5bGUpKTtcbiAgdGhpcy5hY2N1cmFjeUZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSgpO1xuICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8uc2V0U3R5bGUoYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuYWNjdXJhY3lGZWF0dXJlU3R5bGUpKTtcbiAgdGhpcy5mb2xsb3dfID0gZmFsc2U7XG4gIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IGZhbHNlO1xuICBsaXN0ZW4odGhpcy5nZW9sb2NhdGlvbl8sICdjaGFuZ2U6YWNjdXJhY3lHZW9tZXRyeScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICB2YXIgZ2VvbWV0cnkgPSBfdGhpcy5nZW9sb2NhdGlvbl8uZ2V0QWNjdXJhY3lHZW9tZXRyeSgpO1xuXG4gICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdlb21ldHJ5Jyk7XG4gICAgfVxuXG4gICAgX3RoaXMuYWNjdXJhY3lGZWF0dXJlXy5zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG5cbiAgICBfdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgfSk7XG4gIGxpc3Rlbih0aGlzLmdlb2xvY2F0aW9uXywgJ2NoYW5nZTpwb3NpdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBfdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgfSk7XG4gIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICBsaXN0ZW4odmlldywgJ2NoYW5nZTpjZW50ZXInLCB0aGlzLmhhbmRsZVZpZXdDaGFuZ2VfLCB0aGlzKTtcbiAgbGlzdGVuKHZpZXcsICdjaGFuZ2U6cmVzb2x1dGlvbicsIHRoaXMuaGFuZGxlVmlld0NoYW5nZV8sIHRoaXMpO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuYXRMb2FkaW5nVGltZSAmJiB0aGlzLmxvYWRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuJHNjb3BlXy4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLmxvYWRpbmc7XG4gICAgfSwgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMudG9nZ2xlVHJhY2tpbmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUudG9nZ2xlVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmdlb2xvY2F0aW9uXy5nZXRUcmFja2luZygpKSB7XG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICAgIHRoaXMuJHNjb3BlXy4kZW1pdChHZW9sb2NhdGlvbkV2ZW50VHlwZS5FUlJPUiwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgdmFyIGNlbnRlciA9IHZpZXcuZ2V0Q2VudGVyKCk7XG5cbiAgICBpZiAoIWNlbnRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgIH1cblxuICAgIHZhciBkaWZmID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uWzBdIC0gY2VudGVyWzBdKSArIE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvblsxXSAtIGNlbnRlclsxXSk7XG5cbiAgICBpZiAoZGlmZiA8IDIpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlldy5zZXRDZW50ZXIoY3VycmVudFBvc2l0aW9uKTtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICAgIHRoaXMudHJhY2tfKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMudHJhY2tfKCk7XG4gIH1cbn07XG5cbkNvbnRyb2xsZXIucHJvdG90eXBlLnRyYWNrXyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mZWF0dXJlT3ZlcmxheV8uYWRkRmVhdHVyZSh0aGlzLnBvc2l0aW9uRmVhdHVyZV8pO1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5hZGRGZWF0dXJlKHRoaXMuYWNjdXJhY3lGZWF0dXJlXyk7XG4gIHRoaXMuZm9sbG93XyA9IHRydWU7XG4gIHRoaXMuZ2VvbG9jYXRpb25fLnNldFRyYWNraW5nKHRydWUpO1xufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUudW50cmFja18gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmNsZWFyKCk7XG4gIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuICB0aGlzLmdlb2xvY2F0aW9uXy5zZXRUcmFja2luZyhmYWxzZSk7XG4gIHRoaXMubm90aWZpY2F0aW9uXy5jbGVhcigpO1xufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuc2V0UG9zaXRpb25fID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZW9sb2NhdGlvbl8uZ2V0UG9zaXRpb24oKTtcblxuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwb3NpdGlvbicpO1xuICB9XG5cbiAgdmFyIHBvaW50ID0gbmV3IG9sR2VvbVBvaW50KHBvc2l0aW9uKTtcbiAgdGhpcy5wb3NpdGlvbkZlYXR1cmVfLnNldEdlb21ldHJ5KHBvaW50KTtcbiAgdmFyIGFjY3VyYWN5ID0gdGhpcy5hY2N1cmFjeUZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG5cbiAgaWYgKHRoaXMuZm9sbG93Xykge1xuICAgIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnpvb20gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmlldy5zZXRDZW50ZXIocG9zaXRpb24pO1xuICAgICAgdmlldy5zZXRab29tKHRoaXMub3B0aW9ucy56b29tKTtcbiAgICB9IGVsc2UgaWYgKGFjY3VyYWN5IGluc3RhbmNlb2YgUG9seWdvbikge1xuICAgICAgdmFyIHNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG5cbiAgICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICAgIH1cblxuICAgICAgdmlldy5maXQoYWNjdXJhY3ksIHtcbiAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3Q2hhbmdlZEJ5TWVfID0gZmFsc2U7XG4gIH1cbn07XG5cbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZVZpZXdDaGFuZ2VfID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICh0aGlzLmZvbGxvd18gJiYgIXRoaXMudmlld0NoYW5nZWRCeU1lXykge1xuICAgIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuICB9XG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS5hdXRvUm90YXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIHZhciBjdXJyZW50QWxwaGEgPSAwO1xuXG4gIGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoJ29uZGV2aWNlb3JpZW50YXRpb25hYnNvbHV0ZScpKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgRGV2aWNlT3JpZW50YXRpb25FdmVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBldmVudCB0eXBlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5hbHBoYSAhPT0gbnVsbCkge1xuICAgICAgICBjdXJyZW50QWxwaGEgPSBfdGhpczIuaGFuZGxlUm90YXRlXyhldmVudC5hbHBoYSwgY3VycmVudEFscGhhKTtcbiAgICAgIH1cbiAgICB9LCB0cnVlKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoJ29uZGV2aWNlb3JpZW50YXRpb24nKSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmIChldnQud2Via2l0Q29tcGFzc0hlYWRpbmcpIHtcbiAgICAgICAgY3VycmVudEFscGhhID0gX3RoaXMyLmhhbmRsZVJvdGF0ZV8oLWV2dC53ZWJraXRDb21wYXNzSGVhZGluZywgY3VycmVudEFscGhhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghZXZ0LmFscGhhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGV2dC5hbHBoYScpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudEFscGhhID0gX3RoaXMyLmhhbmRsZVJvdGF0ZV8oZXZ0LmFscGhhIC0gMjcwLCBjdXJyZW50QWxwaGEpO1xuICAgICAgfVxuICAgIH0sIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoJ09yaWVudGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBkZXZpY2UnKTtcbiAgfVxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlUm90YXRlXyA9IGZ1bmN0aW9uIChldmVudEFscGhhLCBjdXJyZW50QWxwaGEpIHtcbiAgaWYgKHRoaXMuZ2VvbG9jYXRpb25fLmdldFRyYWNraW5nKCkgJiYgTWF0aC5hYnMoZXZlbnRBbHBoYSAtIGN1cnJlbnRBbHBoYSkgPiAwLjIpIHtcbiAgICBjdXJyZW50QWxwaGEgPSBldmVudEFscGhhO1xuICAgIHZhciByYWRBbHBoYSA9IGN1cnJlbnRBbHBoYSAqIE1hdGguUEkgLyAxODA7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xuICAgICAgcm90YXRpb246IHJhZEFscGhhLFxuICAgICAgZHVyYXRpb246IDM1MCxcbiAgICAgIGVhc2luZzogb2xFYXNpbmcubGluZWFyXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gY3VycmVudEFscGhhO1xufTtcblxubXlNb2R1bGUuY29udHJvbGxlcignbmdlb0dlb2xvY2F0aW9uQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwiZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gaXQgPSBvW1N5bWJvbC5pdGVyYXRvcl0oKTsgcmV0dXJuIGl0Lm5leHQuYmluZChpdCk7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVSZWd1bGFyU2hhcGUgZnJvbSAnb2wvc3R5bGUvUmVndWxhclNoYXBlLmpzJztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsLmpzJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZS5qcyc7XG5pbXBvcnQgb2xTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5pbXBvcnQgeyBjcmVhdGVEZWZhdWx0U3R5bGUgfSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTdHlsZShzdHlsZURlc2NyaXB0b3IpIHtcbiAgaWYgKHN0eWxlRGVzY3JpcHRvciBpbnN0YW5jZW9mIG9sU3R5bGUpIHtcbiAgICByZXR1cm4gc3R5bGVEZXNjcmlwdG9yO1xuICB9IGVsc2UgaWYgKCFzdHlsZURlc2NyaXB0b3IpIHtcbiAgICByZXR1cm4gY3JlYXRlRGVmYXVsdFN0eWxlO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVEZXNjcmlwdG9yKSkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2Uoc3R5bGVEZXNjcmlwdG9yKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIHZhciBzdHlsZSA9IF9zdGVwLnZhbHVlO1xuICAgICAgcmVzdWx0LnB1c2goYnVpbGRTdHlsZShzdHlsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgdmFyIF9zdHlsZSA9IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oX3N0eWxlLCBzdHlsZURlc2NyaXB0b3IpO1xuICAgIHZhciBzZCA9IHN0eWxlRGVzY3JpcHRvcjtcblxuICAgIGlmIChzZC5maWxsKSB7XG4gICAgICBfc3R5bGUuZmlsbCA9IG5ldyBvbFN0eWxlRmlsbChzZC5maWxsKTtcbiAgICB9XG5cbiAgICBpZiAoc2Quc3Ryb2tlKSB7XG4gICAgICBfc3R5bGUuc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoc2Quc3Ryb2tlKTtcbiAgICB9XG5cbiAgICBpZiAoc2QuY2lyY2xlKSB7XG4gICAgICB2YXIgY2lyY2xlU3R5bGUgPSB7fTtcbiAgICAgIE9iamVjdC5hc3NpZ24oY2lyY2xlU3R5bGUsIHNkLmNpcmNsZSk7XG5cbiAgICAgIGlmIChzZC5jaXJjbGUuZmlsbCkge1xuICAgICAgICBjaXJjbGVTdHlsZS5maWxsID0gbmV3IG9sU3R5bGVGaWxsKHNkLmNpcmNsZS5maWxsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNkLmNpcmNsZS5zdHJva2UpIHtcbiAgICAgICAgY2lyY2xlU3R5bGUuc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoc2QuY2lyY2xlLnN0cm9rZSk7XG4gICAgICB9XG5cbiAgICAgIF9zdHlsZS5pbWFnZSA9IG5ldyBvbFN0eWxlQ2lyY2xlKGNpcmNsZVN0eWxlKTtcbiAgICAgIGRlbGV0ZSBfc3R5bGUuY2lyY2xlO1xuICAgIH0gZWxzZSBpZiAoc2QucmVndWxhclNoYXBlKSB7XG4gICAgICB2YXIgcmVndWxhclNoYXBlU3R5bGUgPSB7fTtcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVndWxhclNoYXBlU3R5bGUsIHNkLnJlZ3VsYXJTaGFwZSk7XG5cbiAgICAgIGlmIChzZC5yZWd1bGFyU2hhcGUuZmlsbCkge1xuICAgICAgICByZWd1bGFyU2hhcGVTdHlsZS5maWxsID0gbmV3IG9sU3R5bGVGaWxsKHNkLnJlZ3VsYXJTaGFwZS5maWxsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNkLnJlZ3VsYXJTaGFwZS5zdHJva2UpIHtcbiAgICAgICAgcmVndWxhclNoYXBlU3R5bGUuc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoc2QucmVndWxhclNoYXBlLnN0cm9rZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZC5yZWd1bGFyU2hhcGUuYW5nbGUpIHtcbiAgICAgICAgc2QucmVndWxhclNoYXBlLmFuZ2xlID0gc2QucmVndWxhclNoYXBlLmFuZ2xlIC8gMTgwICogTWF0aC5QSTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNkLnJlZ3VsYXJTaGFwZS5yb3RhdGlvbikge1xuICAgICAgICBzZC5yZWd1bGFyU2hhcGUucm90YXRpb24gPSBzZC5yZWd1bGFyU2hhcGUuYW5nbGUgLyAxODAgKiBNYXRoLlBJO1xuICAgICAgfVxuXG4gICAgICBfc3R5bGUuaW1hZ2UgPSBuZXcgb2xTdHlsZVJlZ3VsYXJTaGFwZShyZWd1bGFyU2hhcGVTdHlsZSk7XG4gICAgICBkZWxldGUgX3N0eWxlLnJlZ3VsYXJTaGFwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG9sU3R5bGUoX3N0eWxlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbnVsbDsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9QQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==