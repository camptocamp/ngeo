/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/mobilegeolocation.js"
/*!***************************************!*\
  !*** ./examples/mobilegeolocation.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mobilegeolocation_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobilegeolocation.scss */ "./examples/mobilegeolocation.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_geolocation_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/geolocation/component */ "./src/geolocation/component.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
// The MIT License (MIT)
//
// Copyright (c) 2015-2024 Camptocamp SA
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
const appmodule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', ['gettext', ngeo_geolocation_component__WEBPACK_IMPORTED_MODULE_8__["default"].name, gmf_map_component__WEBPACK_IMPORTED_MODULE_6__["default"].name]);

MainController.$inject = ['$scope'];

/**
 * @param {angular.IScope} $scope Scope.
 * @class
 */
function MainController($scope) {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_2__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_4__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_3__["default"]({
      center: [0, 0],
      zoom: 4,
    }),
  });
  ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_9__["default"].init(this.map);
}
appmodule.controller('MainController', MainController);
appmodule.constant('ngeoGeolocationOptions', {
  positionFeatureStyle: {
    circle: {
      radius: 6,
      fill: {
        color: 'rgba(230, 100, 100, 1)',
      },
      stroke: {
        color: 'rgba(230, 40, 40, 1)',
        width: 2,
      },
    },
  },
  accuracyFeatureStyle: {
    fill: {
      color: 'rgba(100, 100, 230, 0.3)',
    },
    stroke: {
      color: 'rgba(40, 40, 230, 1)',
      width: 2,
    },
  },
  zoom: 17,
  autoRotate: true,
});
(0,_options__WEBPACK_IMPORTED_MODULE_7__["default"])(appmodule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appmodule);


/***/ },

/***/ "./examples/mobilegeolocation.scss"
/*!*****************************************!*\
  !*** ./examples/mobilegeolocation.scss ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/geolocation/component.js"
/*!**************************************!*\
  !*** ./src/geolocation/component.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_message_Notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Notification */ "./src/message/Notification.ts");
/* harmony import */ var ol_easing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/easing */ "./node_modules/ol/easing.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Geolocation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Geolocation */ "./node_modules/ol/Geolocation.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
Controller.$inject = ['$scope', '$element', 'gettextCatalog', 'ngeoGeolocationOptions'];
// The MIT License (MIT)
//
// Copyright (c) 2015-2025 Camptocamp SA
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
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoGeolocation', []);

/**
 * @enum {string}
 * @private
 * @hidden
 */
const GeolocationEventType = {
  /**
   * Triggered when an error occurs.
   */
  ERROR: 'geolocation-error',
};

/**
 * Provide a geolocation directive.
 *
 * Example:
 *
 *      <button ngeo-geolocation
 *        ngeo-geolocation-map="ctrl.map">
 *      </button>
 *
 * See our live example: [../examples/mobilegeolocation.html](../examples/mobilegeolocation.html)
 *
 * @htmlAttribute {import('ol/Map').default} ngeo-geolocation-map The map.
 * @htmlAttribute {GeolocationDirectiveOptions} ngeo-geolocation-options The options.
 * @returns {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname ngeoGeolocation
 */
function geolocationComponent() {
  return {
    restrict: 'A',
    scope: {
      'map': '<ngeoGeolocationMap',
      'loading': '=ngeoGeolocationLoading',
    },
    controller: 'ngeoGeolocationController',
    bindToController: true,
  };
}
myModule.directive('ngeoGeolocation', geolocationComponent);

/**
 * @class
 * @hidden
 * @param {angular.IScope} $scope The directive's scope.
 * @param {JQuery} $element Element.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
 * @param {import('ngeo/options').ngeoGeolocationOptions} ngeoGeolocationOptions The options.
 * @ngdoc controller
 * @ngname ngeoGeolocationController
 */
function Controller($scope, $element, gettextCatalog, ngeoGeolocationOptions) {
  this.options = ngeoGeolocationOptions;
  $element.on('click', this.toggleTracking.bind(this));

  /**
   * @type {angular.IScope}
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.gettext.gettextCatalog}
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {import('ol/Map').default}
   */
  this.map;

  /**
   * A flag used to determine if the application has finished loading.
   *
   * @type {boolean}
   */
  this.loading;
}

/**
 */
Controller.prototype.$onInit = function () {
  if (!(this.map instanceof ol_Map__WEBPACK_IMPORTED_MODULE_7__["default"])) {
    throw new Error('Wrong map type');
  }

  /**
   * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
   */
  this.featureOverlay_ = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_1__["default"].getFeatureOverlay();

  /**
   * @type {import('ol/Geolocation').default}
   */
  this.geolocation_ = new ol_Geolocation__WEBPACK_IMPORTED_MODULE_6__["default"]({
    projection: this.map.getView().getProjection(),
    trackingOptions: /** @type {PositionOptions} */ {
      enableHighAccuracy: true,
    },
  });
  if (this.options.autoRotate) {
    this.autoRotateListener();
  }

  // Add alias for automatic i18n string collection
  const gettextCatalog = this.gettextCatalog_;

  // handle geolocation error.
  this.geolocation_.on(
    'error',
    /** @type {function(?): ?} */
    /**
     * @param {GeolocationPositionError} error
     */
    (error) => {
      this.untrack_();
      let msg;
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
      ngeo_message_Notification__WEBPACK_IMPORTED_MODULE_2__["default"].error(msg);
      this.$scope_.$emit(GeolocationEventType.ERROR, error);
    },
  );

  /**
   * @type {olFeature<import('ol/geom/Geometry').default>}
   */
  this.positionFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_5__["default"]({
    name: 'GeolocationPositionFeature',
  });
  this.positionFeature_.setStyle((0,ngeo_options__WEBPACK_IMPORTED_MODULE_10__.buildStyle)(this.options.positionFeatureStyle));

  /**
   * @type {olFeature<import('ol/geom/Geometry').default>}
   */
  this.accuracyFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_5__["default"]({
    name: 'GeolocationAccuracyFeature',
  });
  this.accuracyFeature_.setStyle((0,ngeo_options__WEBPACK_IMPORTED_MODULE_10__.buildStyle)(this.options.accuracyFeatureStyle));

  /**
   * Whether to recenter the map at the position it gets updated
   *
   * @type {boolean}
   */
  this.follow_ = false;

  /**
   * A flag used to determine whether the view was changed by me or something
   * else. In the latter case, stop following.
   *
   * @type {boolean}
   */
  this.viewChangedByMe_ = false;
  (0,ol_events__WEBPACK_IMPORTED_MODULE_4__.listen)(
    this.geolocation_,
    'change:accuracyGeometry',
    /** @type {import('ol/events').ListenerFunction} */
    (evt) => {
      const geometry = this.geolocation_.getAccuracyGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      this.accuracyFeature_.setGeometry(geometry);
      this.setPosition_();
    },
  );
  (0,ol_events__WEBPACK_IMPORTED_MODULE_4__.listen)(
    this.geolocation_,
    'change:position',
    /** @type {import('ol/events').ListenerFunction} */
    () => {
      this.setPosition_();
    },
  );
  const view = this.map.getView();
  (0,ol_events__WEBPACK_IMPORTED_MODULE_4__.listen)(view, 'change:center', this.handleViewChange_, this);
  (0,ol_events__WEBPACK_IMPORTED_MODULE_4__.listen)(view, 'change:resolution', this.handleViewChange_, this);
  if (this.options.atLoadingTime && this.loading !== undefined) {
    this.$scope_.$watch(
      () => this.loading,
      (newVal) => {
        if (newVal === false) {
          this.toggleTracking();
        }
      },
    );
  }
};

/**
 */
Controller.prototype.toggleTracking = function () {
  if (this.geolocation_.getTracking()) {
    // if map center is different than geolocation position, then track again
    const currentPosition = this.geolocation_.getPosition();
    // if user is using Firefox and selects the "not now" option, OL geolocation
    // doesn't return an error
    if (currentPosition === undefined) {
      this.untrack_();
      this.$scope_.$emit(GeolocationEventType.ERROR, null);
      return;
    }
    // stop tracking if the position is close to the center of the map.
    const view = this.map.getView();
    const center = view.getCenter();
    if (!center) {
      throw new Error('Missing center');
    }
    const diff = Math.abs(currentPosition[0] - center[0]) + Math.abs(currentPosition[1] - center[1]);
    // In pixels
    const diff_px = diff / view.getResolution();
    if (diff_px < 2) {
      this.untrack_();
    } else {
      // immediately recenter to the latest position to avoid a delay if the GPS device is slow to respond.
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
  ngeo_message_Notification__WEBPACK_IMPORTED_MODULE_2__["default"].clear();
};
Controller.prototype.setPosition_ = function () {
  const view = this.map.getView();
  const position = this.geolocation_.getPosition();
  if (position === undefined) {
    throw new Error('Missing position');
  }
  const point = new ol_geom_Point__WEBPACK_IMPORTED_MODULE_8__["default"](position);
  this.positionFeature_.setGeometry(point);
  const accuracy = this.accuracyFeature_.getGeometry();
  if (this.follow_) {
    this.viewChangedByMe_ = true;
    if (this.options.zoom || this.options.zoom === 0) {
      view.setCenter(position);
      view.setZoom(this.options.zoom);
    } else if (accuracy instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_9__["default"]) {
      const size = this.map.getSize();
      if (size === undefined) {
        throw new Error('Missing size');
      }
      view.fit(accuracy, {
        size,
      });
    }
    this.viewChangedByMe_ = false;
  }
};

/**
 * @param {Event|import('ol/events/Event').default} event Event.
 */
Controller.prototype.handleViewChange_ = function (event) {
  if (this.follow_ && !this.viewChangedByMe_) {
    this.follow_ = false;
  }
};

// Orientation control events
Controller.prototype.autoRotateListener = function () {
  let currentAlpha = 0;
  if (window.hasOwnProperty('ondeviceorientationabsolute')) {
    window.addEventListener(
      'deviceorientationabsolute',
      (event) => {
        if (!(event instanceof DeviceOrientationEvent)) {
          throw new Error('Wrong event type');
        }
        if (event.alpha !== null) {
          currentAlpha = this.handleRotate_(event.alpha, currentAlpha);
        }
      },
      true,
    );
  } else if (window.hasOwnProperty('ondeviceorientation')) {
    window.addEventListener(
      'deviceorientation',
      (evt) => {
        // @ts-ignore: ios only
        if (evt.webkitCompassHeading) {
          // check for iOS property
          // @ts-ignore: ios only
          currentAlpha = this.handleRotate_(-evt.webkitCompassHeading, currentAlpha);
        } else {
          // non iOS
          if (!evt.alpha) {
            throw new Error('Missing evt.alpha');
          }
          currentAlpha = this.handleRotate_(evt.alpha - 270, currentAlpha);
        }
      },
      true,
    );
  } else {
    console.error('Orientation is not supported on this device');
  }
};

/**
 * Handle rotation.
 *
 * @param {number} eventAlpha
 * @param {number} currentAlpha
 * @returns {number}
 */
Controller.prototype.handleRotate_ = function (eventAlpha, currentAlpha) {
  if (this.geolocation_.getTracking() && Math.abs(eventAlpha - currentAlpha) > 0.2) {
    currentAlpha = eventAlpha;
    const radAlpha = (currentAlpha * Math.PI) / 180;
    this.map.getView().animate({
      rotation: radAlpha,
      duration: 350,
      easing: ol_easing__WEBPACK_IMPORTED_MODULE_3__.linear,
    });
  }
  return currentAlpha;
};
myModule.controller('ngeoGeolocationController', Controller);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"mobilegeolocation": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/mobilegeolocation.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlZ2VvbG9jYXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2dlb2xvY2F0aW9uL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE1LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL21vYmlsZWdlb2xvY2F0aW9uLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9HZW9sb2NhdGlvbiBmcm9tICduZ2VvL2dlb2xvY2F0aW9uL2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgYXBwbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9HZW9sb2NhdGlvbi5uYW1lLCBnbWZNYXBDb21wb25lbnQubmFtZV0pO1xuXG5NYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgU2NvcGUuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFswLCAwXSxcbiAgICAgIHpvb206IDQsXG4gICAgfSksXG4gIH0pO1xuICBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG59XG5hcHBtb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5hcHBtb2R1bGUuY29uc3RhbnQoJ25nZW9HZW9sb2NhdGlvbk9wdGlvbnMnLCB7XG4gIHBvc2l0aW9uRmVhdHVyZVN0eWxlOiB7XG4gICAgY2lyY2xlOiB7XG4gICAgICByYWRpdXM6IDYsXG4gICAgICBmaWxsOiB7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyMzAsIDEwMCwgMTAwLCAxKScsXG4gICAgICB9LFxuICAgICAgc3Ryb2tlOiB7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyMzAsIDQwLCA0MCwgMSknLFxuICAgICAgICB3aWR0aDogMixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgYWNjdXJhY3lGZWF0dXJlU3R5bGU6IHtcbiAgICBmaWxsOiB7XG4gICAgICBjb2xvcjogJ3JnYmEoMTAwLCAxMDAsIDIzMCwgMC4zKScsXG4gICAgfSxcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiAncmdiYSg0MCwgNDAsIDIzMCwgMSknLFxuICAgICAgd2lkdGg6IDIsXG4gICAgfSxcbiAgfSxcbiAgem9vbTogMTcsXG4gIGF1dG9Sb3RhdGU6IHRydWUsXG59KTtcbm9wdGlvbnMoYXBwbW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IGFwcG1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJ2dldHRleHRDYXRhbG9nJywgJ25nZW9HZW9sb2NhdGlvbk9wdGlvbnMnXTtcbi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNS0yMDI1IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncic7XG5pbXBvcnQgbmdlb01lc3NhZ2VOb3RpZmljYXRpb24gZnJvbSAnbmdlby9tZXNzYWdlL05vdGlmaWNhdGlvbic7XG5pbXBvcnQgKiBhcyBvbEVhc2luZyBmcm9tICdvbC9lYXNpbmcnO1xuaW1wb3J0IHtsaXN0ZW59IGZyb20gJ29sL2V2ZW50cyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xuaW1wb3J0IG9sR2VvbG9jYXRpb24gZnJvbSAnb2wvR2VvbG9jYXRpb24nO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xuaW1wb3J0IHtidWlsZFN0eWxlfSBmcm9tICduZ2VvL29wdGlvbnMnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9HZW9sb2NhdGlvbicsIFtdKTtcblxuLyoqXG4gKiBAZW51bSB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgR2VvbG9jYXRpb25FdmVudFR5cGUgPSB7XG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMuXG4gICAqL1xuICBFUlJPUjogJ2dlb2xvY2F0aW9uLWVycm9yJyxcbn07XG5cbi8qKlxuICogUHJvdmlkZSBhIGdlb2xvY2F0aW9uIGRpcmVjdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgPGJ1dHRvbiBuZ2VvLWdlb2xvY2F0aW9uXG4gKiAgICAgICAgbmdlby1nZW9sb2NhdGlvbi1tYXA9XCJjdHJsLm1hcFwiPlxuICogICAgICA8L2J1dHRvbj5cbiAqXG4gKiBTZWUgb3VyIGxpdmUgZXhhbXBsZTogWy4uL2V4YW1wbGVzL21vYmlsZWdlb2xvY2F0aW9uLmh0bWxdKC4uL2V4YW1wbGVzL21vYmlsZWdlb2xvY2F0aW9uLmh0bWwpXG4gKlxuICogQGh0bWxBdHRyaWJ1dGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH0gbmdlby1nZW9sb2NhdGlvbi1tYXAgVGhlIG1hcC5cbiAqIEBodG1sQXR0cmlidXRlIHtHZW9sb2NhdGlvbkRpcmVjdGl2ZU9wdGlvbnN9IG5nZW8tZ2VvbG9jYXRpb24tb3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEByZXR1cm5zIHthbmd1bGFyLklEaXJlY3RpdmV9IFRoZSBEaXJlY3RpdmUgRGVmaW5pdGlvbiBPYmplY3QuXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmduYW1lIG5nZW9HZW9sb2NhdGlvblxuICovXG5mdW5jdGlvbiBnZW9sb2NhdGlvbkNvbXBvbmVudCgpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnbWFwJzogJzxuZ2VvR2VvbG9jYXRpb25NYXAnLFxuICAgICAgJ2xvYWRpbmcnOiAnPW5nZW9HZW9sb2NhdGlvbkxvYWRpbmcnLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ25nZW9HZW9sb2NhdGlvbkNvbnRyb2xsZXInLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ25nZW9HZW9sb2NhdGlvbicsIGdlb2xvY2F0aW9uQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBoaWRkZW5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBUaGUgZGlyZWN0aXZlJ3Mgc2NvcGUuXG4gKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAqIEBwYXJhbSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfSBnZXR0ZXh0Q2F0YWxvZyBHZXR0ZXh0IHNlcnZpY2UuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9vcHRpb25zJykubmdlb0dlb2xvY2F0aW9uT3B0aW9uc30gbmdlb0dlb2xvY2F0aW9uT3B0aW9ucyBUaGUgb3B0aW9ucy5cbiAqIEBuZ2RvYyBjb250cm9sbGVyXG4gKiBAbmduYW1lIG5nZW9HZW9sb2NhdGlvbkNvbnRyb2xsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgZ2V0dGV4dENhdGFsb2csIG5nZW9HZW9sb2NhdGlvbk9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gbmdlb0dlb2xvY2F0aW9uT3B0aW9ucztcbiAgJGVsZW1lbnQub24oJ2NsaWNrJywgdGhpcy50b2dnbGVUcmFja2luZy5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5nZXR0ZXh0LmdldHRleHRDYXRhbG9nfVxuICAgKi9cbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZ18gPSBnZXR0ZXh0Q2F0YWxvZztcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGFwcGxpY2F0aW9uIGhhcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMubG9hZGluZztcbn1cblxuLyoqXG4gKi9cbkNvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghKHRoaXMubWFwIGluc3RhbmNlb2Ygb2xNYXApKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBtYXAgdHlwZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5JykuRmVhdHVyZU92ZXJsYXl9XG4gICAqL1xuICB0aGlzLmZlYXR1cmVPdmVybGF5XyA9IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9HZW9sb2NhdGlvbicpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmdlb2xvY2F0aW9uXyA9IG5ldyBvbEdlb2xvY2F0aW9uKHtcbiAgICBwcm9qZWN0aW9uOiB0aGlzLm1hcC5nZXRWaWV3KCkuZ2V0UHJvamVjdGlvbigpLFxuICAgIHRyYWNraW5nT3B0aW9uczogLyoqIEB0eXBlIHtQb3NpdGlvbk9wdGlvbnN9ICovIHtcbiAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICB9LFxuICB9KTtcbiAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUm90YXRlKSB7XG4gICAgdGhpcy5hdXRvUm90YXRlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIC8vIEFkZCBhbGlhcyBmb3IgYXV0b21hdGljIGkxOG4gc3RyaW5nIGNvbGxlY3Rpb25cbiAgY29uc3QgZ2V0dGV4dENhdGFsb2cgPSB0aGlzLmdldHRleHRDYXRhbG9nXztcblxuICAvLyBoYW5kbGUgZ2VvbG9jYXRpb24gZXJyb3IuXG4gIHRoaXMuZ2VvbG9jYXRpb25fLm9uKFxuICAgICdlcnJvcicsXG4gICAgLyoqIEB0eXBlIHtmdW5jdGlvbig/KTogP30gKi9cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0dlb2xvY2F0aW9uUG9zaXRpb25FcnJvcn0gZXJyb3JcbiAgICAgKi9cbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICAgIGxldCBtc2c7XG4gICAgICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnVXNlciBkZW5pZWQgdGhlIHJlcXVlc3QgZm9yIEdlb2xvY2F0aW9uLicpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdMb2NhdGlvbiBpbmZvcm1hdGlvbiBpcyB1bmF2YWlsYWJsZS4nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnVGhlIHJlcXVlc3QgdG8gZ2V0IHVzZXIgbG9jYXRpb24gdGltZWQgb3V0LicpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnR2VvbG9jYXRpb246IEFuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBuZ2VvTWVzc2FnZU5vdGlmaWNhdGlvbi5lcnJvcihtc2cpO1xuICAgICAgdGhpcy4kc2NvcGVfLiRlbWl0KEdlb2xvY2F0aW9uRXZlbnRUeXBlLkVSUk9SLCBlcnJvcik7XG4gICAgfSxcbiAgKTtcblxuICAvKipcbiAgICogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICovXG4gIHRoaXMucG9zaXRpb25GZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUoe1xuICAgIG5hbWU6ICdHZW9sb2NhdGlvblBvc2l0aW9uRmVhdHVyZScsXG4gIH0pO1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8uc2V0U3R5bGUoYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMucG9zaXRpb25GZWF0dXJlU3R5bGUpKTtcblxuICAvKipcbiAgICogQHR5cGUge29sRmVhdHVyZTxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICovXG4gIHRoaXMuYWNjdXJhY3lGZWF0dXJlXyA9IG5ldyBvbEZlYXR1cmUoe1xuICAgIG5hbWU6ICdHZW9sb2NhdGlvbkFjY3VyYWN5RmVhdHVyZScsXG4gIH0pO1xuICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8uc2V0U3R5bGUoYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuYWNjdXJhY3lGZWF0dXJlU3R5bGUpKTtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZWNlbnRlciB0aGUgbWFwIGF0IHRoZSBwb3NpdGlvbiBpdCBnZXRzIHVwZGF0ZWRcbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmZvbGxvd18gPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBmbGFnIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHZpZXcgd2FzIGNoYW5nZWQgYnkgbWUgb3Igc29tZXRoaW5nXG4gICAqIGVsc2UuIEluIHRoZSBsYXR0ZXIgY2FzZSwgc3RvcCBmb2xsb3dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy52aWV3Q2hhbmdlZEJ5TWVfID0gZmFsc2U7XG4gIGxpc3RlbihcbiAgICB0aGlzLmdlb2xvY2F0aW9uXyxcbiAgICAnY2hhbmdlOmFjY3VyYWN5R2VvbWV0cnknLFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9ldmVudHMnKS5MaXN0ZW5lckZ1bmN0aW9ufSAqL1xuICAgIChldnQpID0+IHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gdGhpcy5nZW9sb2NhdGlvbl8uZ2V0QWNjdXJhY3lHZW9tZXRyeSgpO1xuICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWNjdXJhY3lGZWF0dXJlXy5zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uXygpO1xuICAgIH0sXG4gICk7XG4gIGxpc3RlbihcbiAgICB0aGlzLmdlb2xvY2F0aW9uXyxcbiAgICAnY2hhbmdlOnBvc2l0aW9uJyxcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuTGlzdGVuZXJGdW5jdGlvbn0gKi9cbiAgICAoKSA9PiB7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uXygpO1xuICAgIH0sXG4gICk7XG4gIGNvbnN0IHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gIGxpc3Rlbih2aWV3LCAnY2hhbmdlOmNlbnRlcicsIHRoaXMuaGFuZGxlVmlld0NoYW5nZV8sIHRoaXMpO1xuICBsaXN0ZW4odmlldywgJ2NoYW5nZTpyZXNvbHV0aW9uJywgdGhpcy5oYW5kbGVWaWV3Q2hhbmdlXywgdGhpcyk7XG4gIGlmICh0aGlzLm9wdGlvbnMuYXRMb2FkaW5nVGltZSAmJiB0aGlzLmxvYWRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuJHNjb3BlXy4kd2F0Y2goXG4gICAgICAoKSA9PiB0aGlzLmxvYWRpbmcsXG4gICAgICAobmV3VmFsKSA9PiB7XG4gICAgICAgIGlmIChuZXdWYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVUcmFja2luZygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICovXG5Db250cm9sbGVyLnByb3RvdHlwZS50b2dnbGVUcmFja2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuZ2VvbG9jYXRpb25fLmdldFRyYWNraW5nKCkpIHtcbiAgICAvLyBpZiBtYXAgY2VudGVyIGlzIGRpZmZlcmVudCB0aGFuIGdlb2xvY2F0aW9uIHBvc2l0aW9uLCB0aGVuIHRyYWNrIGFnYWluXG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5nZW9sb2NhdGlvbl8uZ2V0UG9zaXRpb24oKTtcbiAgICAvLyBpZiB1c2VyIGlzIHVzaW5nIEZpcmVmb3ggYW5kIHNlbGVjdHMgdGhlIFwibm90IG5vd1wiIG9wdGlvbiwgT0wgZ2VvbG9jYXRpb25cbiAgICAvLyBkb2Vzbid0IHJldHVybiBhbiBlcnJvclxuICAgIGlmIChjdXJyZW50UG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy51bnRyYWNrXygpO1xuICAgICAgdGhpcy4kc2NvcGVfLiRlbWl0KEdlb2xvY2F0aW9uRXZlbnRUeXBlLkVSUk9SLCBudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gc3RvcCB0cmFja2luZyBpZiB0aGUgcG9zaXRpb24gaXMgY2xvc2UgdG8gdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG4gICAgY29uc3QgY2VudGVyID0gdmlldy5nZXRDZW50ZXIoKTtcbiAgICBpZiAoIWNlbnRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgIH1cbiAgICBjb25zdCBkaWZmID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uWzBdIC0gY2VudGVyWzBdKSArIE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvblsxXSAtIGNlbnRlclsxXSk7XG4gICAgLy8gSW4gcGl4ZWxzXG4gICAgY29uc3QgZGlmZl9weCA9IGRpZmYgLyB2aWV3LmdldFJlc29sdXRpb24oKTtcbiAgICBpZiAoZGlmZl9weCA8IDIpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW1tZWRpYXRlbHkgcmVjZW50ZXIgdG8gdGhlIGxhdGVzdCBwb3NpdGlvbiB0byBhdm9pZCBhIGRlbGF5IGlmIHRoZSBHUFMgZGV2aWNlIGlzIHNsb3cgdG8gcmVzcG9uZC5cbiAgICAgIHZpZXcuc2V0Q2VudGVyKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICB0aGlzLnVudHJhY2tfKCk7XG4gICAgICB0aGlzLnRyYWNrXygpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRyYWNrXygpO1xuICB9XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUudHJhY2tfID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5hZGRGZWF0dXJlKHRoaXMucG9zaXRpb25GZWF0dXJlXyk7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmFkZEZlYXR1cmUodGhpcy5hY2N1cmFjeUZlYXR1cmVfKTtcbiAgdGhpcy5mb2xsb3dfID0gdHJ1ZTtcbiAgdGhpcy5nZW9sb2NhdGlvbl8uc2V0VHJhY2tpbmcodHJ1ZSk7XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUudW50cmFja18gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmNsZWFyKCk7XG4gIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuICB0aGlzLmdlb2xvY2F0aW9uXy5zZXRUcmFja2luZyhmYWxzZSk7XG4gIG5nZW9NZXNzYWdlTm90aWZpY2F0aW9uLmNsZWFyKCk7XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUuc2V0UG9zaXRpb25fID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBvc2l0aW9uJyk7XG4gIH1cbiAgY29uc3QgcG9pbnQgPSBuZXcgb2xHZW9tUG9pbnQocG9zaXRpb24pO1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8uc2V0R2VvbWV0cnkocG9pbnQpO1xuICBjb25zdCBhY2N1cmFjeSA9IHRoaXMuYWNjdXJhY3lGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICBpZiAodGhpcy5mb2xsb3dfKSB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZEJ5TWVfID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnpvb20gfHwgdGhpcy5vcHRpb25zLnpvb20gPT09IDApIHtcbiAgICAgIHZpZXcuc2V0Q2VudGVyKHBvc2l0aW9uKTtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm9wdGlvbnMuem9vbSk7XG4gICAgfSBlbHNlIGlmIChhY2N1cmFjeSBpbnN0YW5jZW9mIFBvbHlnb24pIHtcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG4gICAgICBpZiAoc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgICB9XG4gICAgICB2aWV3LmZpdChhY2N1cmFjeSwge1xuICAgICAgICBzaXplLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RXZlbnR8aW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0fSBldmVudCBFdmVudC5cbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlVmlld0NoYW5nZV8gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKHRoaXMuZm9sbG93XyAmJiAhdGhpcy52aWV3Q2hhbmdlZEJ5TWVfKSB7XG4gICAgdGhpcy5mb2xsb3dfID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vIE9yaWVudGF0aW9uIGNvbnRyb2wgZXZlbnRzXG5Db250cm9sbGVyLnByb3RvdHlwZS5hdXRvUm90YXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBjdXJyZW50QWxwaGEgPSAwO1xuICBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnKSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2RldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgRGV2aWNlT3JpZW50YXRpb25FdmVudCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGV2ZW50IHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuYWxwaGEgIT09IG51bGwpIHtcbiAgICAgICAgICBjdXJyZW50QWxwaGEgPSB0aGlzLmhhbmRsZVJvdGF0ZV8oZXZlbnQuYWxwaGEsIGN1cnJlbnRBbHBoYSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH0gZWxzZSBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uJykpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZXZpY2VvcmllbnRhdGlvbicsXG4gICAgICAoZXZ0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IGlvcyBvbmx5XG4gICAgICAgIGlmIChldnQud2Via2l0Q29tcGFzc0hlYWRpbmcpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgaU9TIHByb3BlcnR5XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZTogaW9zIG9ubHlcbiAgICAgICAgICBjdXJyZW50QWxwaGEgPSB0aGlzLmhhbmRsZVJvdGF0ZV8oLWV2dC53ZWJraXRDb21wYXNzSGVhZGluZywgY3VycmVudEFscGhhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBub24gaU9TXG4gICAgICAgICAgaWYgKCFldnQuYWxwaGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBldnQuYWxwaGEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudEFscGhhID0gdGhpcy5oYW5kbGVSb3RhdGVfKGV2dC5hbHBoYSAtIDI3MCwgY3VycmVudEFscGhhKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdPcmllbnRhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudEFscGhhXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEFscGhhXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVSb3RhdGVfID0gZnVuY3Rpb24gKGV2ZW50QWxwaGEsIGN1cnJlbnRBbHBoYSkge1xuICBpZiAodGhpcy5nZW9sb2NhdGlvbl8uZ2V0VHJhY2tpbmcoKSAmJiBNYXRoLmFicyhldmVudEFscGhhIC0gY3VycmVudEFscGhhKSA+IDAuMikge1xuICAgIGN1cnJlbnRBbHBoYSA9IGV2ZW50QWxwaGE7XG4gICAgY29uc3QgcmFkQWxwaGEgPSAoY3VycmVudEFscGhhICogTWF0aC5QSSkgLyAxODA7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xuICAgICAgcm90YXRpb246IHJhZEFscGhhLFxuICAgICAgZHVyYXRpb246IDM1MCxcbiAgICAgIGVhc2luZzogb2xFYXNpbmcubGluZWFyLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjdXJyZW50QWxwaGE7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignbmdlb0dlb2xvY2F0aW9uQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1vYmlsZWdlb2xvY2F0aW9uXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==