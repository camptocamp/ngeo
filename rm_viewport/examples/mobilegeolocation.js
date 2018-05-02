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

eval("\n\n//# sourceURL=webpack:///./examples/mobilegeolocation.css?");

/***/ }),

/***/ "./examples/mobilegeolocation.js":
/*!***************************************!*\
  !*** ./examples/mobilegeolocation.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobilegeolocation.css */ \"./examples/mobilegeolocation.css\");\n/* harmony import */ var _mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mobilegeolocation_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Circle.js */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_geolocation_mobile_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/geolocation/mobile.js */ \"./src/geolocation/mobile.js\");\nMainController.$inject = [\"$scope\", \"ngeoFeatureOverlayMgr\"];\n\n\n\n\n\n\n\n\n\n\n\n\nvar appmodule = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_geolocation_mobile_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].name]);\n\nfunction MainController($scope, ngeoFeatureOverlayMgr) {\n  var positionFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      radius: 6,\n      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n        color: 'rgba(230, 100, 100, 1)'\n      }),\n      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n        color: 'rgba(230, 40, 40, 1)',\n        width: 2\n      })\n    })\n  });\n  var accuracyFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n      color: 'rgba(100, 100, 230, 0.3)'\n    }),\n    stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n      color: 'rgba(40, 40, 230, 1)',\n      width: 2\n    })\n  });\n  this.mobileGeolocationOptions = {\n    positionFeatureStyle: positionFeatureStyle,\n    accuracyFeatureStyle: accuracyFeatureStyle,\n    zoom: 17,\n    autorotate: true\n  };\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      center: [0, 0],\n      zoom: 4\n    })\n  });\n  ngeoFeatureOverlayMgr.init(this.map);\n}\n\nappmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./examples/mobilegeolocation.js?");

/***/ }),

/***/ "./src/geolocation/mobile.js":
/*!***********************************!*\
  !*** ./src/geolocation/mobile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ \"./src/map/FeatureOverlayMgr.js\");\n/* harmony import */ var ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Notification.js */ \"./src/message/Notification.js\");\n/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/easing.js */ \"./node_modules/ol/easing.js\");\n/* harmony import */ var ol_events_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/events.js */ \"./node_modules/ol/events.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Geolocation.js */ \"./node_modules/ol/Geolocation.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point.js */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/Polygon.js */ \"./node_modules/ol/geom/Polygon.js\");\nController.$inject = [\"$scope\", \"$element\", \"gettextCatalog\", \"ngeoFeatureOverlayMgr\", \"ngeoNotification\"];\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMobileGeolocation', [ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_message_Notification_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nvar GeolocationEventType = {\n  ERROR: 'mobile-geolocation-error'\n};\n\nfunction geolocationMobileComponent() {\n  return {\n    restrict: 'A',\n    scope: {\n      'getMobileMapFn': '&ngeoMobileGeolocationMap',\n      'getMobileGeolocationOptionsFn': '&ngeoMobileGeolocationOptions'\n    },\n    controller: 'ngeoGeolocationMobileController'\n  };\n}\n\nmodule.directive('ngeoMobileGeolocation', geolocationMobileComponent);\n\nfunction Controller($scope, $element, gettextCatalog, ngeoFeatureOverlayMgr, ngeoNotification) {\n  var _this = this;\n\n  $element.on('click', this.toggleTracking.bind(this));\n  var map = $scope.getMobileMapFn();\n\n  if (!(map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])) {\n    throw new Error('Wrong map type');\n  }\n\n  this.$scope_ = $scope;\n  this.map_ = map;\n  var options = $scope.getMobileGeolocationOptionsFn() || {};\n  console.assert(options);\n  this.notification_ = ngeoNotification;\n  this.featureOverlay_ = ngeoFeatureOverlayMgr.getFeatureOverlay();\n  this.geolocation_ = new ol_Geolocation_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n    projection: map.getView().getProjection(),\n    trackingOptions: {\n      enableHighAccuracy: true\n    }\n  });\n\n  if (options.autorotate) {\n    this.autorotateListener();\n  }\n\n  this.geolocation_.on('error', function (error) {\n    _this.untrack_();\n\n    var msg;\n\n    switch (error.code) {\n      case 1:\n        msg = gettextCatalog.getString('User denied the request for Geolocation.');\n        break;\n\n      case 2:\n        msg = gettextCatalog.getString('Location information is unavailable.');\n        break;\n\n      case 3:\n        msg = gettextCatalog.getString('The request to get user location timed out.');\n        break;\n\n      default:\n        msg = gettextCatalog.getString('Geolocation: An unknown error occurred.');\n        break;\n    }\n\n    _this.notification_.error(msg);\n\n    $scope.$emit(GeolocationEventType.ERROR, error);\n  });\n  this.positionFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n\n  if (options.positionFeatureStyle) {\n    this.positionFeature_.setStyle(options.positionFeatureStyle);\n  }\n\n  this.accuracyFeature_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n\n  if (options.accuracyFeatureStyle) {\n    this.accuracyFeature_.setStyle(options.accuracyFeatureStyle);\n  }\n\n  this.zoom_ = options.zoom;\n  this.follow_ = false;\n  this.viewChangedByMe_ = false;\n  ol_events_js__WEBPACK_IMPORTED_MODULE_4__[\"listen\"](this.geolocation_, 'change:accuracyGeometry', function () {\n    var geometry = _this.geolocation_.getAccuracyGeometry();\n\n    if (!geometry) {\n      throw new Error('Missing geometry');\n    }\n\n    _this.accuracyFeature_.setGeometry(geometry);\n\n    _this.setPosition_();\n  });\n  ol_events_js__WEBPACK_IMPORTED_MODULE_4__[\"listen\"](this.geolocation_, 'change:position', function () {\n    _this.setPosition_();\n  });\n  var view = map.getView();\n  ol_events_js__WEBPACK_IMPORTED_MODULE_4__[\"listen\"](view, 'change:center', this.handleViewChange_, this);\n  ol_events_js__WEBPACK_IMPORTED_MODULE_4__[\"listen\"](view, 'change:resolution', this.handleViewChange_, this);\n}\n\nController.prototype.toggleTracking = function () {\n  if (this.geolocation_.getTracking()) {\n    var currentPosition = this.geolocation_.getPosition();\n\n    if (currentPosition === undefined) {\n      this.untrack_();\n      this.$scope_.$emit(GeolocationEventType.ERROR, null);\n      return;\n    }\n\n    console.assert(currentPosition !== undefined);\n    var center = this.map_.getView().getCenter();\n\n    if (!center) {\n      throw new Error('Missing center');\n    }\n\n    var diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);\n\n    if (diff < 2) {\n      this.untrack_();\n    } else {\n      this.untrack_();\n      this.track_();\n    }\n  } else {\n    this.track_();\n  }\n};\n\nController.prototype.track_ = function () {\n  this.featureOverlay_.addFeature(this.positionFeature_);\n  this.featureOverlay_.addFeature(this.accuracyFeature_);\n  this.follow_ = true;\n  this.geolocation_.setTracking(true);\n};\n\nController.prototype.untrack_ = function () {\n  this.featureOverlay_.clear();\n  this.follow_ = false;\n  this.geolocation_.setTracking(false);\n  this.notification_.clear();\n};\n\nController.prototype.setPosition_ = function () {\n  var position = this.geolocation_.getPosition();\n\n  if (position === undefined) {\n    throw new Error('Missing position');\n  }\n\n  var point = new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](position);\n  this.positionFeature_.setGeometry(point);\n  var accuracy = this.accuracyFeature_.getGeometry();\n\n  if (this.follow_) {\n    this.viewChangedByMe_ = true;\n\n    if (this.zoom_ !== undefined) {\n      this.map_.getView().setCenter(position);\n      this.map_.getView().setZoom(this.zoom_);\n    } else if (accuracy instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]) {\n      var size = this.map_.getSize();\n\n      if (size === undefined) {\n        throw new Error('Missing size');\n      }\n\n      this.map_.getView().fit(accuracy, {\n        size: size\n      });\n    }\n\n    this.viewChangedByMe_ = false;\n  }\n};\n\nController.prototype.handleViewChange_ = function (event) {\n  if (this.follow_ && !this.viewChangedByMe_) {\n    this.follow_ = false;\n  }\n};\n\nController.prototype.autorotateListener = function () {\n  var _this2 = this;\n\n  var currentAlpha = 0;\n\n  if (window.hasOwnProperty('ondeviceorientationabsolute')) {\n    window.addEventListener('deviceorientationabsolute', function (event) {\n      if (!(event instanceof DeviceOrientationEvent)) {\n        throw new Error('Wrong event type');\n      }\n\n      if (event.alpha !== null) {\n        currentAlpha = _this2.handleRotate_(event.alpha, currentAlpha);\n      }\n    }, true);\n  } else if (window.hasOwnProperty('ondeviceorientation')) {\n    window.addEventListener('deviceorientation', function (evt) {\n      if (evt.webkitCompassHeading) {\n        currentAlpha = _this2.handleRotate_(-evt.webkitCompassHeading, currentAlpha);\n      } else {\n        if (!evt.alpha) {\n          throw new Error('Missing evt.alpha');\n        }\n\n        currentAlpha = _this2.handleRotate_(evt.alpha - 270, currentAlpha);\n      }\n    }, true);\n  } else {\n    console.error('Orientation is not supported on this device');\n  }\n};\n\nController.prototype.handleRotate_ = function (eventAlpha, currentAlpha) {\n  if (this.geolocation_.getTracking() && Math.abs(eventAlpha - currentAlpha) > 0.2) {\n    currentAlpha = eventAlpha;\n    var radAlpha = currentAlpha * Math.PI / 180;\n    this.map_.getView().animate({\n      rotation: radAlpha,\n      duration: 350,\n      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_3__[\"linear\"]\n    });\n  }\n\n  return currentAlpha;\n};\n\nmodule.controller('ngeoGeolocationMobileController', Controller);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/geolocation/mobile.js?");

/***/ }),

/***/ 26:
/*!**************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mobilegeolocation.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/mobilegeolocation.js */\"./examples/mobilegeolocation.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/mobilegeolocation.js?");

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