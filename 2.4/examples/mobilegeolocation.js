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
/******/ 		"mobilegeolocation": 0
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
/******/ 	deferredModules.push([26,"commons"]);
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_geolocation_mobile_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/geolocation/mobile.js */ "./src/geolocation/mobile.js");
MainController.$inject = ["$scope", "ngeoFeatureOverlayMgr"];












var appmodule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_geolocation_mobile_js__WEBPACK_IMPORTED_MODULE_11__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__["default"].name]);

function MainController($scope, ngeoFeatureOverlayMgr) {
  var positionFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      radius: 6,
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        color: 'rgba(230, 100, 100, 1)'
      }),
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        color: 'rgba(230, 40, 40, 1)',
        width: 2
      })
    })
  });
  var accuracyFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      color: 'rgba(100, 100, 230, 0.3)'
    }),
    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      color: 'rgba(40, 40, 230, 1)',
      width: 2
    })
  });
  this.mobileGeolocationOptions = {
    positionFeatureStyle: positionFeatureStyle,
    accuracyFeatureStyle: accuracyFeatureStyle,
    zoom: 17,
    autorotate: true
  };
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [0, 0],
      zoom: 4
    })
  });
  ngeoFeatureOverlayMgr.init(this.map);
}

appmodule.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/geolocation/mobile.js":
/*!***********************************!*\
  !*** ./src/geolocation/mobile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ "./src/map/FeatureOverlayMgr.js");
/* harmony import */ var ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Notification.js */ "./src/message/Notification.js");
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/easing.js */ "./node_modules/ol/easing.js");
/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/events.js */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Geolocation.js */ "./node_modules/ol/Geolocation.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
Controller.$inject = ["$scope", "$element", "gettextCatalog", "ngeoFeatureOverlayMgr", "ngeoNotification"];









var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMobileGeolocation', [ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
var GeolocationEventType = {
  ERROR: 'mobile-geolocation-error'
};

function geolocationMobileComponent() {
  return {
    restrict: 'A',
    scope: {
      'getMobileMapFn': '&ngeoMobileGeolocationMap',
      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions'
    },
    controller: 'ngeoGeolocationMobileController'
  };
}

module.directive('ngeoMobileGeolocation', geolocationMobileComponent);

function Controller($scope, $element, gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification) {
  var _this = this;

  $element.on('click', this.toggleTracking.bind(this));
  var map = $scope['getMobileMapFn']();
  console.assert(map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
  this.$scope_ = $scope;
  this.map_ = map;
  var options = $scope['getMobileGeolocationOptionsFn']() || {};
  console.assert(options);
  this.notification_ = ngeoNotification;
  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();
  this.geolocation_ = new ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    projection: map.getView().getProjection(),
    trackingOptions: {
      enableHighAccuracy: true
    }
  });

  if (options.autorotate) {
    this.autorotateListener();
  }

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

    $scope.$emit(GeolocationEventType.ERROR, error);
  });
  this.positionFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

  if (options.positionFeatureStyle) {
    this.positionFeature_.setStyle(options.positionFeatureStyle);
  }

  this.accuracyFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

  if (options.accuracyFeatureStyle) {
    this.accuracyFeature_.setStyle(options.accuracyFeatureStyle);
  }

  this.zoom_ = options.zoom;
  this.follow_ = false;
  this.viewChangedByMe_ = false;
  ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"](this.geolocation_, 'change:accuracyGeometry', function () {
    _this.accuracyFeature_.setGeometry(_this.geolocation_.getAccuracyGeometry());

    _this.setPosition_();
  });
  ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"](this.geolocation_, 'change:position', function () {
    _this.setPosition_();
  });
  var view = map.getView();
  ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"](view, 'change:center', this.handleViewChange_, this);
  ol_events_js__WEBPACK_IMPORTED_MODULE_4__["listen"](view, 'change:resolution', this.handleViewChange_, this);
}

Controller.prototype.toggleTracking = function () {
  if (this.geolocation_.getTracking()) {
    var currentPosition = this.geolocation_.getPosition();

    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(GeolocationEventType.ERROR, null);
      return;
    }

    console.assert(currentPosition !== undefined);
    var center = this.map_.getView().getCenter();
    var diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);

    if (diff < 2) {
      this.untrack_();
    } else {
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
  var position = this.geolocation_.getPosition();
  var point = new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__["default"](position);
  this.positionFeature_.setGeometry(point);
  var accuracy = this.accuracyFeature_.getGeometry();

  if (this.follow_) {
    this.viewChangedByMe_ = true;

    if (this.zoom_ !== undefined) {
      this.map_.getView().setCenter(position);
      this.map_.getView().setZoom(this.zoom_);
    } else if (accuracy) {
      var size = this.map_.getSize();
      this.map_.getView().fit(accuracy, {
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

Controller.prototype.autorotateListener = function () {
  var _this2 = this;

  var currentAlpha = 0;

  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener('deviceorientationabsolute', function (evt) {
      var event = evt;
      currentAlpha = _this2.handleRotate_(event.alpha, currentAlpha);
    }, true);
  } else if (window.hasOwnProperty('ondeviceorientation')) {
    window.addEventListener('deviceorientation', function (evt) {
      if (evt.webkitCompassHeading) {
        currentAlpha = _this2.handleRotate_(-evt.webkitCompassHeading, currentAlpha);
      } else {
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
    this.map_.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_3__["linear"]
    });
  }

  return currentAlpha;
};

module.controller('ngeoGeolocationMobileController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 26:
/*!**************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mobilegeolocation.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/mobilegeolocation.js */"./examples/mobilegeolocation.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlZ2VvbG9jYXRpb24uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb2xvY2F0aW9uL21vYmlsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibW9iaWxlZ2VvbG9jYXRpb25cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMjYsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiXTtcbmltcG9ydCAnLi9tb2JpbGVnZW9sb2NhdGlvbi5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvR2VvbG9jYXRpb25Nb2JpbGUgZnJvbSAnbmdlby9nZW9sb2NhdGlvbi9tb2JpbGUuanMnO1xudmFyIGFwcG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvR2VvbG9jYXRpb25Nb2JpbGUubmFtZSwgbmdlb01hcE1vZHVsZS5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgbmdlb0ZlYXR1cmVPdmVybGF5TWdyKSB7XG4gIHZhciBwb3NpdGlvbkZlYXR1cmVTdHlsZSA9IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgIGltYWdlOiBuZXcgb2xTdHlsZUNpcmNsZSh7XG4gICAgICByYWRpdXM6IDYsXG4gICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMjMwLCAxMDAsIDEwMCwgMSknXG4gICAgICB9KSxcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMjMwLCA0MCwgNDAsIDEpJyxcbiAgICAgICAgd2lkdGg6IDJcbiAgICAgIH0pXG4gICAgfSlcbiAgfSk7XG4gIHZhciBhY2N1cmFjeUZlYXR1cmVTdHlsZSA9IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICBjb2xvcjogJ3JnYmEoMTAwLCAxMDAsIDIzMCwgMC4zKSdcbiAgICB9KSxcbiAgICBzdHJva2U6IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICAgIGNvbG9yOiAncmdiYSg0MCwgNDAsIDIzMCwgMSknLFxuICAgICAgd2lkdGg6IDJcbiAgICB9KVxuICB9KTtcbiAgdGhpcy5tb2JpbGVHZW9sb2NhdGlvbk9wdGlvbnMgPSB7XG4gICAgcG9zaXRpb25GZWF0dXJlU3R5bGU6IHBvc2l0aW9uRmVhdHVyZVN0eWxlLFxuICAgIGFjY3VyYWN5RmVhdHVyZVN0eWxlOiBhY2N1cmFjeUZlYXR1cmVTdHlsZSxcbiAgICB6b29tOiAxNyxcbiAgICBhdXRvcm90YXRlOiB0cnVlXG4gIH07XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzAsIDBdLFxuICAgICAgem9vbTogNFxuICAgIH0pXG4gIH0pO1xuICBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG59XG5cbmFwcG1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZWxlbWVudFwiLCBcImdldHRleHRDYXRhbG9nXCIsIFwibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCIsIFwibmdlb05vdGlmaWNhdGlvblwiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1nci5qcyc7XG5pbXBvcnQgbmdlb01lc3NhZ2VOb3RpZmljYXRpb24gZnJvbSAnbmdlby9tZXNzYWdlL05vdGlmaWNhdGlvbi5qcyc7XG5pbXBvcnQgKiBhcyBvbEVhc2luZyBmcm9tICdvbC9lYXNpbmcuanMnO1xuaW1wb3J0ICogYXMgb2xFdmVudHMgZnJvbSAnb2wvZXZlbnRzLmpzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZS5qcyc7XG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbi5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb01vYmlsZUdlb2xvY2F0aW9uJywgW25nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvTWVzc2FnZU5vdGlmaWNhdGlvbi5uYW1lXSk7XG52YXIgR2VvbG9jYXRpb25FdmVudFR5cGUgPSB7XG4gIEVSUk9SOiAnbW9iaWxlLWdlb2xvY2F0aW9uLWVycm9yJ1xufTtcblxuZnVuY3Rpb24gZ2VvbG9jYXRpb25Nb2JpbGVDb21wb25lbnQoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2dldE1vYmlsZU1hcEZuJzogJyZuZ2VvTW9iaWxlR2VvbG9jYXRpb25NYXAnLFxuICAgICAgJ2dldE1vYmlsZUdlb2xvY2F0aW9uT3B0aW9uc0ZuJzogJyZuZ2VvTW9iaWxlR2VvbG9jYXRpb25PcHRpb25zJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ25nZW9HZW9sb2NhdGlvbk1vYmlsZUNvbnRyb2xsZXInXG4gIH07XG59XG5cbm1vZHVsZS5kaXJlY3RpdmUoJ25nZW9Nb2JpbGVHZW9sb2NhdGlvbicsIGdlb2xvY2F0aW9uTW9iaWxlQ29tcG9uZW50KTtcblxuZnVuY3Rpb24gQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCBnZXR0ZXh0Q2F0YWxvZywgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLCBuZ2VvTm90aWZpY2F0aW9uKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgJGVsZW1lbnQub24oJ2NsaWNrJywgdGhpcy50b2dnbGVUcmFja2luZy5iaW5kKHRoaXMpKTtcbiAgdmFyIG1hcCA9ICRzY29wZVsnZ2V0TW9iaWxlTWFwRm4nXSgpO1xuICBjb25zb2xlLmFzc2VydChtYXAgaW5zdGFuY2VvZiBvbE1hcCk7XG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcbiAgdGhpcy5tYXBfID0gbWFwO1xuICB2YXIgb3B0aW9ucyA9ICRzY29wZVsnZ2V0TW9iaWxlR2VvbG9jYXRpb25PcHRpb25zRm4nXSgpIHx8IHt9O1xuICBjb25zb2xlLmFzc2VydChvcHRpb25zKTtcbiAgdGhpcy5ub3RpZmljYXRpb25fID0gbmdlb05vdGlmaWNhdGlvbjtcbiAgdGhpcy5mZWF0dXJlT3ZlcmxheV8gPSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgdGhpcy5nZW9sb2NhdGlvbl8gPSBuZXcgb2xHZW9sb2NhdGlvbih7XG4gICAgcHJvamVjdGlvbjogbWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCksXG4gICAgdHJhY2tpbmdPcHRpb25zOiB7XG4gICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChvcHRpb25zLmF1dG9yb3RhdGUpIHtcbiAgICB0aGlzLmF1dG9yb3RhdGVMaXN0ZW5lcigpO1xuICB9XG5cbiAgdGhpcy5nZW9sb2NhdGlvbl8ub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgX3RoaXMudW50cmFja18oKTtcblxuICAgIHZhciBtc2c7XG5cbiAgICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdVc2VyIGRlbmllZCB0aGUgcmVxdWVzdCBmb3IgR2VvbG9jYXRpb24uJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDI6XG4gICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnTG9jYXRpb24gaW5mb3JtYXRpb24gaXMgdW5hdmFpbGFibGUuJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnVGhlIHJlcXVlc3QgdG8gZ2V0IHVzZXIgbG9jYXRpb24gdGltZWQgb3V0LicpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdHZW9sb2NhdGlvbjogQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgX3RoaXMubm90aWZpY2F0aW9uXy5lcnJvcihtc2cpO1xuXG4gICAgJHNjb3BlLiRlbWl0KEdlb2xvY2F0aW9uRXZlbnRUeXBlLkVSUk9SLCBlcnJvcik7XG4gIH0pO1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKCk7XG5cbiAgaWYgKG9wdGlvbnMucG9zaXRpb25GZWF0dXJlU3R5bGUpIHtcbiAgICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8uc2V0U3R5bGUob3B0aW9ucy5wb3NpdGlvbkZlYXR1cmVTdHlsZSk7XG4gIH1cblxuICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKCk7XG5cbiAgaWYgKG9wdGlvbnMuYWNjdXJhY3lGZWF0dXJlU3R5bGUpIHtcbiAgICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8uc2V0U3R5bGUob3B0aW9ucy5hY2N1cmFjeUZlYXR1cmVTdHlsZSk7XG4gIH1cblxuICB0aGlzLnpvb21fID0gb3B0aW9ucy56b29tO1xuICB0aGlzLmZvbGxvd18gPSBmYWxzZTtcbiAgdGhpcy52aWV3Q2hhbmdlZEJ5TWVfID0gZmFsc2U7XG4gIG9sRXZlbnRzLmxpc3Rlbih0aGlzLmdlb2xvY2F0aW9uXywgJ2NoYW5nZTphY2N1cmFjeUdlb21ldHJ5JywgZnVuY3Rpb24gKCkge1xuICAgIF90aGlzLmFjY3VyYWN5RmVhdHVyZV8uc2V0R2VvbWV0cnkoX3RoaXMuZ2VvbG9jYXRpb25fLmdldEFjY3VyYWN5R2VvbWV0cnkoKSk7XG5cbiAgICBfdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgfSk7XG4gIG9sRXZlbnRzLmxpc3Rlbih0aGlzLmdlb2xvY2F0aW9uXywgJ2NoYW5nZTpwb3NpdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBfdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgfSk7XG4gIHZhciB2aWV3ID0gbWFwLmdldFZpZXcoKTtcbiAgb2xFdmVudHMubGlzdGVuKHZpZXcsICdjaGFuZ2U6Y2VudGVyJywgdGhpcy5oYW5kbGVWaWV3Q2hhbmdlXywgdGhpcyk7XG4gIG9sRXZlbnRzLmxpc3Rlbih2aWV3LCAnY2hhbmdlOnJlc29sdXRpb24nLCB0aGlzLmhhbmRsZVZpZXdDaGFuZ2VfLCB0aGlzKTtcbn1cblxuQ29udHJvbGxlci5wcm90b3R5cGUudG9nZ2xlVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmdlb2xvY2F0aW9uXy5nZXRUcmFja2luZygpKSB7XG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICAgIHRoaXMuJHNjb3BlXy4kZW1pdChHZW9sb2NhdGlvbkV2ZW50VHlwZS5FUlJPUiwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5hc3NlcnQoY3VycmVudFBvc2l0aW9uICE9PSB1bmRlZmluZWQpO1xuICAgIHZhciBjZW50ZXIgPSB0aGlzLm1hcF8uZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIHZhciBkaWZmID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uWzBdIC0gY2VudGVyWzBdKSArIE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvblsxXSAtIGNlbnRlclsxXSk7XG5cbiAgICBpZiAoZGlmZiA8IDIpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bnRyYWNrXygpO1xuICAgICAgdGhpcy50cmFja18oKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50cmFja18oKTtcbiAgfVxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUudHJhY2tfID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5hZGRGZWF0dXJlKHRoaXMucG9zaXRpb25GZWF0dXJlXyk7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmFkZEZlYXR1cmUodGhpcy5hY2N1cmFjeUZlYXR1cmVfKTtcbiAgdGhpcy5mb2xsb3dfID0gdHJ1ZTtcbiAgdGhpcy5nZW9sb2NhdGlvbl8uc2V0VHJhY2tpbmcodHJ1ZSk7XG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS51bnRyYWNrXyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mZWF0dXJlT3ZlcmxheV8uY2xlYXIoKTtcbiAgdGhpcy5mb2xsb3dfID0gZmFsc2U7XG4gIHRoaXMuZ2VvbG9jYXRpb25fLnNldFRyYWNraW5nKGZhbHNlKTtcbiAgdGhpcy5ub3RpZmljYXRpb25fLmNsZWFyKCk7XG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS5zZXRQb3NpdGlvbl8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG4gIHZhciBwb2ludCA9IG5ldyBvbEdlb21Qb2ludChwb3NpdGlvbik7XG4gIHRoaXMucG9zaXRpb25GZWF0dXJlXy5zZXRHZW9tZXRyeShwb2ludCk7XG4gIHZhciBhY2N1cmFjeSA9IHRoaXMuYWNjdXJhY3lGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuXG4gIGlmICh0aGlzLmZvbGxvd18pIHtcbiAgICB0aGlzLnZpZXdDaGFuZ2VkQnlNZV8gPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuem9vbV8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tYXBfLmdldFZpZXcoKS5zZXRDZW50ZXIocG9zaXRpb24pO1xuICAgICAgdGhpcy5tYXBfLmdldFZpZXcoKS5zZXRab29tKHRoaXMuem9vbV8pO1xuICAgIH0gZWxzZSBpZiAoYWNjdXJhY3kpIHtcbiAgICAgIHZhciBzaXplID0gdGhpcy5tYXBfLmdldFNpemUoKTtcbiAgICAgIHRoaXMubWFwXy5nZXRWaWV3KCkuZml0KGFjY3VyYWN5LCB7XG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IGZhbHNlO1xuICB9XG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVWaWV3Q2hhbmdlXyA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodGhpcy5mb2xsb3dfICYmICF0aGlzLnZpZXdDaGFuZ2VkQnlNZV8pIHtcbiAgICB0aGlzLmZvbGxvd18gPSBmYWxzZTtcbiAgfVxufTtcblxuQ29udHJvbGxlci5wcm90b3R5cGUuYXV0b3JvdGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICB2YXIgY3VycmVudEFscGhhID0gMDtcblxuICBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnKSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbmFic29sdXRlJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdmFyIGV2ZW50ID0gZXZ0O1xuICAgICAgY3VycmVudEFscGhhID0gX3RoaXMyLmhhbmRsZVJvdGF0ZV8oZXZlbnQuYWxwaGEsIGN1cnJlbnRBbHBoYSk7XG4gICAgfSwgdHJ1ZSk7XG4gIH0gZWxzZSBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uJykpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAoZXZ0LndlYmtpdENvbXBhc3NIZWFkaW5nKSB7XG4gICAgICAgIGN1cnJlbnRBbHBoYSA9IF90aGlzMi5oYW5kbGVSb3RhdGVfKC1ldnQud2Via2l0Q29tcGFzc0hlYWRpbmcsIGN1cnJlbnRBbHBoYSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50QWxwaGEgPSBfdGhpczIuaGFuZGxlUm90YXRlXyhldnQuYWxwaGEgLSAyNzAsIGN1cnJlbnRBbHBoYSk7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignT3JpZW50YXRpb24gaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIGRldmljZScpO1xuICB9XG59O1xuXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVSb3RhdGVfID0gZnVuY3Rpb24gKGV2ZW50QWxwaGEsIGN1cnJlbnRBbHBoYSkge1xuICBpZiAodGhpcy5nZW9sb2NhdGlvbl8uZ2V0VHJhY2tpbmcoKSAmJiBNYXRoLmFicyhldmVudEFscGhhIC0gY3VycmVudEFscGhhKSA+IDAuMikge1xuICAgIGN1cnJlbnRBbHBoYSA9IGV2ZW50QWxwaGE7XG4gICAgdmFyIHJhZEFscGhhID0gY3VycmVudEFscGhhICogTWF0aC5QSSAvIDE4MDtcbiAgICB0aGlzLm1hcF8uZ2V0VmlldygpLmFuaW1hdGUoe1xuICAgICAgcm90YXRpb246IHJhZEFscGhhLFxuICAgICAgZHVyYXRpb246IDM1MCxcbiAgICAgIGVhc2luZzogb2xFYXNpbmcubGluZWFyXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gY3VycmVudEFscGhhO1xufTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ25nZW9HZW9sb2NhdGlvbk1vYmlsZUNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9