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
/******/ 		"simple3d": 0
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
/******/ 	deferredModules.push([40,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/simple3d.css":
/*!*******************************!*\
  !*** ./examples/simple3d.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/simple3d.js":
/*!******************************!*\
  !*** ./examples/simple3d.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple3d.css */ "./examples/simple3d.css");
/* harmony import */ var _simple3d_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_simple3d_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/olcs/olcsModule.js */ "./src/olcs/olcsModule.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/olcs/Manager.js */ "./src/olcs/Manager.js");
MainController.$inject = ["$rootScope", "ngeoOlcsService"];









var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_olcs_olcsModule_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

function MainController($rootScope, ngeoOlcsService) {
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_5__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [0, 0],
      zoom: 4
    })
  });
  var cesiumUrl = '../node_modules/@camptocamp/cesium/Build/Cesium/Cesium.js';
  this.ol3dm = new ngeo_olcs_Manager_js__WEBPACK_IMPORTED_MODULE_8__["default"](cesiumUrl, $rootScope, {
    map: this.map
  });
  ngeoOlcsService.initialize(this.ol3dm);
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/olcs/Manager.js":
/*!*****************************!*\
  !*** ./src/olcs/Manager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! olcs/contrib/Manager.js */ "./node_modules/ol-cesium/src/olcs/contrib/Manager.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }



var Manager = function (_olcsContribManager) {
  _inheritsLoose(Manager, _olcsContribManager);

  function Manager(url, $rootScope, options) {
    var _this;

    _this = _olcsContribManager.call(this, url, options) || this;
    _this.rootScope_ = $rootScope;
    return _this;
  }

  var _proto = Manager.prototype;

  _proto.toggle3d = function toggle3d() {
    var _this2 = this;

    var promise = _olcsContribManager.prototype.toggle3d.call(this);

    return promise.then(function () {
      _this2.rootScope_.$apply();
    });
  };

  return Manager;
}(olcs_contrib_Manager_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Manager);

/***/ }),

/***/ "./src/olcs/Service.js":
/*!*****************************!*\
  !*** ./src/olcs/Service.js ***!
  \*****************************/
/*! exports provided: OlcsService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OlcsService", function() { return OlcsService; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/statemanager/Location.js */ "./src/statemanager/Location.js");
/* harmony import */ var ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/olcs/constants.js */ "./src/olcs/constants.js");
/* harmony import */ var ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/statemanager/Service.js */ "./src/statemanager/Service.js");





var OlcsService = function () {
  OlcsService.$inject = ["ngeoDebounce", "ngeoLocation", "ngeoStateManager"];

  function OlcsService(ngeoDebounce, ngeoLocation, ngeoStateManager) {
    this.manager_;
    this.ngeoDebounce_ = ngeoDebounce;
    this.ngeoLocation_ = ngeoLocation;
    this.ngeoStateManager_ = ngeoStateManager;
  }

  var _proto = OlcsService.prototype;

  _proto.initialize = function initialize(manager) {
    var _this = this;

    this.manager_ = manager;
    this.manager_.on('load', function () {
      _this.cameraToState_();
    });

    if (this.ngeoStateManager_.getInitialBooleanValue('3d_enabled')) {
      this.initialStateToCamera_();
    }
  };

  _proto.getManager = function getManager() {
    return this.manager_;
  };

  _proto.initialStateToCamera_ = function initialStateToCamera_() {
    var stateManager = this.ngeoStateManager_;
    var lon = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LON);
    var lat = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LAT);
    var elevation = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ELEVATION);
    var heading = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].HEADING) || 0;
    var pitch = stateManager.getInitialNumberValue(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PITCH) || 0;
    console.assert(lon !== undefined);
    console.assert(lat !== undefined);
    console.assert(elevation !== undefined);
    return this.manager_.set3dWithView(lon, lat, elevation, heading, pitch);
  };

  _proto.cameraToState_ = function cameraToState_() {
    var _this2 = this;

    var manager = this.manager_;
    var scene = manager.getOl3d().getCesiumScene();
    var camera = scene.camera;
    camera.moveEnd.addEventListener(this.ngeoDebounce_(function () {
      var _this2$ngeoStateManag;

      var position = camera.positionCartographic;

      _this2.ngeoStateManager_.updateState((_this2$ngeoStateManag = {}, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ENABLED] = true, _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LON] = Cesium.Math.toDegrees(position.longitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].LAT] = Cesium.Math.toDegrees(position.latitude).toFixed(5), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].ELEVATION] = position.height.toFixed(0), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].HEADING] = Cesium.Math.toDegrees(camera.heading).toFixed(3), _this2$ngeoStateManag[ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PITCH] = Cesium.Math.toDegrees(camera.pitch).toFixed(3), _this2$ngeoStateManag));
    }, 1000, true));
    this.manager_.on('toggle', function (event) {
      if (!event.target.is3dEnabled()) {
        _this2.remove3dState_();
      }
    });
  };

  _proto.remove3dState_ = function remove3dState_() {
    var _this3 = this;

    this.ngeoLocation_.getParamKeysWithPrefix(ngeo_olcs_constants_js__WEBPACK_IMPORTED_MODULE_3__["Permalink3dParam"].PREFIX).forEach(function (key) {
      _this3.ngeoStateManager_.deleteParam(key);
    });
  };

  return OlcsService;
}();
var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module(name, [ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_statemanager_Service_js__WEBPACK_IMPORTED_MODULE_4__["default"].name]).service('ngeoOlcsService', OlcsService);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/olcs/constants.js":
/*!*******************************!*\
  !*** ./src/olcs/constants.js ***!
  \*******************************/
/*! exports provided: Permalink3dParam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Permalink3dParam", function() { return Permalink3dParam; });
var Permalink3dParam = {
  ENABLED: '3d_enabled',
  LON: '3d_lon',
  LAT: '3d_lat',
  ELEVATION: '3d_elevation',
  HEADING: '3d_heading',
  PITCH: '3d_pitch',
  PREFIX: '3d_'
};

/***/ }),

/***/ "./src/olcs/controls3d.html":
/*!**********************************!*\
  !*** ./src/olcs/controls3d.html ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="ngeo-tools">\n  <div class="ngeo-angle"><div class="ngeo-angle3d"></div></div>\n  <button class="ngeo-left ngeo-tilt-left" ng-click="$ctrl.tilt(5)"></button>\n  <button class="ngeo-right ngeo-tilt-right" ng-click="$ctrl.tilt(-5)"></button>\n</div>\n<div class="ngeo-zoom">\n  <button class="ol-zoom-in" ng-click="$ctrl.zoom(1)"></button>\n  <button class="ol-zoom-out" ng-click="$ctrl.zoom(-1)"></button>\n</div>\n<div class="ngeo-tools">\n  <div class="ngeo-rotation"><div class="ngeo-rotation3d"></div></div>\n  <button class="ngeo-left" ng-click="$ctrl.rotate(-15)"></button>\n  <button class="ngeo-right" ng-click="$ctrl.rotate(15)"></button>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/olcs/controls3d.js":
/*!********************************!*\
  !*** ./src/olcs/controls3d.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_easing_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/easing.js */ "./node_modules/ol/easing.js");
/* harmony import */ var olcs_core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! olcs/core.js */ "./node_modules/ol-cesium/src/olcs/core.js");
ngeoOlcsControls3dTemplateUrlInjectable.$inject = ["$attrs", "ngeoOlcsControls3dTemplateUrl"];



var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsControls3d', []);

function shouldUpdate(older, newer) {
  return Number.isFinite(newer) && (!Number.isFinite(older) || Math.abs(newer - older) > 0.05);
}

var Controller = function () {
  Controller.$inject = ["$element", "ngeoOlcsService"];

  function Controller($element, ngeoOlcsService) {
    this.element_ = $element;
    this.ol3dm;
    this.minTilt;
    this.maxTilt;
    this.tiltRightEl_;
    this.tiltLeftEl_;
    this.rotation3dEl_;
    this.angle3dEl_;
    this.previousRotation_;
    this.previousViewMatrix_;
    this.animationFrameRequestId_;
    this.olcsService_ = ngeoOlcsService;
  }

  var _proto = Controller.prototype;

  _proto.updateWidget_ = function updateWidget_() {
    var _this = this;

    var newRotation = this.ol3dm.getOl3d().getOlView().getRotation();

    if (shouldUpdate(this.previousRotation_, newRotation)) {
      this.rotateElement_(this.rotation3dEl_, newRotation);
      this.previousRotation_ = newRotation;
    }

    var newViewMatrix = this.ol3dm.getCesiumViewMatrix();

    if (!Cesium.Matrix4.equalsEpsilon(this.previousViewMatrix_, newViewMatrix, 1e-5)) {
      var newTilt = this.ol3dm.getTiltOnGlobe();

      if (Number.isFinite(newTilt || 0)) {
        this.rotateElement_(this.angle3dEl_, newTilt);
        this.previousViewMatrix_ = Cesium.Matrix4.clone(newViewMatrix);
        var buffer = 0.01;

        if (newTilt - this.minTilt < buffer) {
          this.tiltRightEl_.addClass('ngeo-right-inactive');
        } else if (this.tiltRightEl_.hasClass('ngeo-right-inactive')) {
          this.tiltRightEl_.removeClass('ngeo-right-inactive');
        }

        if (this.maxTilt - newTilt < buffer) {
          this.tiltLeftEl_.addClass('ngeo-left-inactive');
        } else if (this.tiltLeftEl_.hasClass('ngeo-left-inactive')) {
          this.tiltLeftEl_.removeClass('ngeo-left-inactive');
        }
      }
    }

    this.animationFrameRequestId_ = requestAnimationFrame(function () {
      return _this.updateWidget_();
    });
  };

  _proto.$onDestroy = function $onDestroy() {
    if (this.animationFrameRequestId_) {
      cancelAnimationFrame(this.animationFrameRequestId_);
    }
  };

  _proto.$onInit = function $onInit() {
    if (this.minTilt === undefined) {
      this.minTilt = 0;
    }

    if (this.maxTilt === undefined) {
      this.maxTilt = 7 * Math.PI / 16;
    }

    if (!this.ol3dm) {
      this.ol3dm = this.olcsService_.getManager();
    }

    this.tiltRightEl_ = this.element_.find('.ngeo-tilt-right');
    this.tiltLeftEl_ = this.element_.find('.ngeo-tilt-left');
    this.rotation3dEl_ = this.element_.find('.ngeo-rotation3d');
    this.angle3dEl_ = this.element_.find('.ngeo-angle3d');
    this.updateWidget_();
  };

  _proto.rotateElement_ = function rotateElement_(element, angle) {
    var r = "rotate(" + angle + "rad)";
    element.css({
      '-moz-transform': r,
      '-webkit-transform': r,
      '-o-transform': r,
      '-ms-transform': r,
      'transform': r
    });
  };

  _proto.rotate = function rotate(angle) {
    angle = Cesium.Math.toRadians(angle);
    this.ol3dm.setHeading(angle);
  };

  _proto.tilt = function tilt(angle) {
    angle = Cesium.Math.toRadians(angle);
    var tiltOnGlobe = this.ol3dm.getTiltOnGlobe();

    if (tiltOnGlobe + angle < this.minTilt) {
      angle = this.minTilt - tiltOnGlobe;
    } else if (tiltOnGlobe + angle > this.maxTilt) {
      angle = this.maxTilt - tiltOnGlobe;
    }

    var scene = this.ol3dm.getCesiumScene();
    olcs_core_js__WEBPACK_IMPORTED_MODULE_2__["default"].rotateAroundBottomCenter(scene, angle);
  };

  _proto.zoom = function zoom(delta) {
    var view = this.ol3dm.getOlView();
    var cur = view.getResolution();
    var newResolution = view.constrainResolution(cur, delta);

    if (view.getAnimating()) {
      view.cancelAnimations();
    }

    view.animate({
      resolution: newResolution,
      duration: 250,
      easing: ol_easing_js__WEBPACK_IMPORTED_MODULE_1__["easeOut"]
    });
  };

  return Controller;
}();

function ngeoOlcsControls3dTemplateUrlInjectable($attrs, ngeoOlcsControls3dTemplateUrl) {
  if (ngeoOlcsControls3dTemplateUrl) {
    return ngeoOlcsControls3dTemplateUrl;
  }

  var templateUrl = $attrs['ngeoOlcsControls3dTemplateUrl'];
  return templateUrl ? templateUrl : 'ngeo/olsc/controls3d';
}

module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/olsc/controls3d', __webpack_require__(/*! ./controls3d.html */ "./src/olcs/controls3d.html"));
}]);
var olscControls3dComponent = {
  bindings: {
    'minTilt': '<?',
    'maxTilt': '<?',
    'ol3dm': '<?'
  },
  controller: Controller,
  templateUrl: ngeoOlcsControls3dTemplateUrlInjectable
};
module.component('ngeoOlcsControls3d', olscControls3dComponent);
module.value('ngeoOlcsControls3dTemplateUrl', '');
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./src/olcs/olcsModule.js":
/*!********************************!*\
  !*** ./src/olcs/olcsModule.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/olcs/Service.js */ "./src/olcs/Service.js");
/* harmony import */ var ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/olcs/controls3d.js */ "./src/olcs/controls3d.js");



var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoOlcsModule', [ngeo_olcs_controls3d_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_olcs_Service_js__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 40:
/*!*****************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/simple3d.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/simple3d.js */"./examples/simple3d.js");


/***/ })

/******/ });
//# sourceMappingURL=simple3d.js.map