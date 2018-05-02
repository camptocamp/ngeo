/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/mobilegeolocation.js":
/*!***************************************!*\
  !*** ./examples/mobilegeolocation.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./examples/mobilegeolocation.scss":
/*!*****************************************!*\
  !*** ./examples/mobilegeolocation.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/geolocation/component.js":
/*!**************************************!*\
  !*** ./src/geolocation/component.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    if (diff < 2) {
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


/***/ })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlZ2VvbG9jYXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL21vYmlsZWdlb2xvY2F0aW9uLmpzIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5zY3NzIiwid2VicGFjazovL25nZW8vLi9zcmMvZ2VvbG9jYXRpb24vY29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vbW9iaWxlZ2VvbG9jYXRpb24uc2Nzcyc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcCc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbmdlb0dlb2xvY2F0aW9uIGZyb20gJ25nZW8vZ2VvbG9jYXRpb24vY29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBhcHBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0Jywgbmdlb0dlb2xvY2F0aW9uLm5hbWUsIGdtZk1hcENvbXBvbmVudC5uYW1lXSk7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzAsIDBdLFxuICAgICAgem9vbTogNCxcbiAgICB9KSxcbiAgfSk7XG4gIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbn1cbmFwcG1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmFwcG1vZHVsZS5jb25zdGFudCgnbmdlb0dlb2xvY2F0aW9uT3B0aW9ucycsIHtcbiAgcG9zaXRpb25GZWF0dXJlU3R5bGU6IHtcbiAgICBjaXJjbGU6IHtcbiAgICAgIHJhZGl1czogNixcbiAgICAgIGZpbGw6IHtcbiAgICAgICAgY29sb3I6ICdyZ2JhKDIzMCwgMTAwLCAxMDAsIDEpJyxcbiAgICAgIH0sXG4gICAgICBzdHJva2U6IHtcbiAgICAgICAgY29sb3I6ICdyZ2JhKDIzMCwgNDAsIDQwLCAxKScsXG4gICAgICAgIHdpZHRoOiAyLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBhY2N1cmFjeUZlYXR1cmVTdHlsZToge1xuICAgIGZpbGw6IHtcbiAgICAgIGNvbG9yOiAncmdiYSgxMDAsIDEwMCwgMjMwLCAwLjMpJyxcbiAgICB9LFxuICAgIHN0cm9rZToge1xuICAgICAgY29sb3I6ICdyZ2JhKDQwLCA0MCwgMjMwLCAxKScsXG4gICAgICB3aWR0aDogMixcbiAgICB9LFxuICB9LFxuICB6b29tOiAxNyxcbiAgYXV0b1JvdGF0ZTogdHJ1ZSxcbn0pO1xub3B0aW9ucyhhcHBtb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgYXBwbW9kdWxlO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnZ2V0dGV4dENhdGFsb2cnLCAnbmdlb0dlb2xvY2F0aW9uT3B0aW9ucyddO1xuLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE1LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBuZ2VvTWVzc2FnZU5vdGlmaWNhdGlvbiBmcm9tICduZ2VvL21lc3NhZ2UvTm90aWZpY2F0aW9uJztcbmltcG9ydCAqIGFzIG9sRWFzaW5nIGZyb20gJ29sL2Vhc2luZyc7XG5pbXBvcnQge2xpc3Rlbn0gZnJvbSAnb2wvZXZlbnRzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgb2xHZW9sb2NhdGlvbiBmcm9tICdvbC9HZW9sb2NhdGlvbic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbEdlb21Qb2ludCBmcm9tICdvbC9nZW9tL1BvaW50JztcbmltcG9ydCBQb2x5Z29uIGZyb20gJ29sL2dlb20vUG9seWdvbic7XG5pbXBvcnQge2J1aWxkU3R5bGV9IGZyb20gJ25nZW8vb3B0aW9ucyc7XG5cbi8qKlxuICogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX1cbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb0dlb2xvY2F0aW9uJywgW10pO1xuXG4vKipcbiAqIEBlbnVtIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5jb25zdCBHZW9sb2NhdGlvbkV2ZW50VHlwZSA9IHtcbiAgLyoqXG4gICAqIFRyaWdnZXJlZCB3aGVuIGFuIGVycm9yIG9jY3Vycy5cbiAgICovXG4gIEVSUk9SOiAnZ2VvbG9jYXRpb24tZXJyb3InLFxufTtcblxuLyoqXG4gKiBQcm92aWRlIGEgZ2VvbG9jYXRpb24gZGlyZWN0aXZlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICA8YnV0dG9uIG5nZW8tZ2VvbG9jYXRpb25cbiAqICAgICAgICBuZ2VvLWdlb2xvY2F0aW9uLW1hcD1cImN0cmwubWFwXCI+XG4gKiAgICAgIDwvYnV0dG9uPlxuICpcbiAqIFNlZSBvdXIgbGl2ZSBleGFtcGxlOiBbLi4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uaHRtbF0oLi4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uaHRtbClcbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fSBuZ2VvLWdlb2xvY2F0aW9uLW1hcCBUaGUgbWFwLlxuICogQGh0bWxBdHRyaWJ1dGUge0dlb2xvY2F0aW9uRGlyZWN0aXZlT3B0aW9uc30gbmdlby1nZW9sb2NhdGlvbi1vcHRpb25zIFRoZSBvcHRpb25zLlxuICogQHJldHVybnMge2FuZ3VsYXIuSURpcmVjdGl2ZX0gVGhlIERpcmVjdGl2ZSBEZWZpbml0aW9uIE9iamVjdC5cbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuZ25hbWUgbmdlb0dlb2xvY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIGdlb2xvY2F0aW9uQ29tcG9uZW50KCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgICdtYXAnOiAnPG5nZW9HZW9sb2NhdGlvbk1hcCcsXG4gICAgICAnbG9hZGluZyc6ICc9bmdlb0dlb2xvY2F0aW9uTG9hZGluZycsXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAnbmdlb0dlb2xvY2F0aW9uQ29udHJvbGxlcicsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgfTtcbn1cbm15TW9kdWxlLmRpcmVjdGl2ZSgnbmdlb0dlb2xvY2F0aW9uJywgZ2VvbG9jYXRpb25Db21wb25lbnQpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQGhpZGRlblxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFRoZSBkaXJlY3RpdmUncyBzY29wZS5cbiAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICogQHBhcmFtIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9IGdldHRleHRDYXRhbG9nIEdldHRleHQgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL29wdGlvbnMnKS5uZ2VvR2VvbG9jYXRpb25PcHRpb25zfSBuZ2VvR2VvbG9jYXRpb25PcHRpb25zIFRoZSBvcHRpb25zLlxuICogQG5nZG9jIGNvbnRyb2xsZXJcbiAqIEBuZ25hbWUgbmdlb0dlb2xvY2F0aW9uQ29udHJvbGxlclxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCBnZXR0ZXh0Q2F0YWxvZywgbmdlb0dlb2xvY2F0aW9uT3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBuZ2VvR2VvbG9jYXRpb25PcHRpb25zO1xuICAkZWxlbWVudC5vbignY2xpY2snLCB0aGlzLnRvZ2dsZVRyYWNraW5nLmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLmdldHRleHQuZ2V0dGV4dENhdGFsb2d9XG4gICAqL1xuICB0aGlzLmdldHRleHRDYXRhbG9nXyA9IGdldHRleHRDYXRhbG9nO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXA7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgYXBwbGljYXRpb24gaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5sb2FkaW5nO1xufVxuXG4vKipcbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCEodGhpcy5tYXAgaW5zdGFuY2VvZiBvbE1hcCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIG1hcCB0eXBlJyk7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXknKS5GZWF0dXJlT3ZlcmxheX1cbiAgICovXG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfID0gbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL0dlb2xvY2F0aW9uJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMuZ2VvbG9jYXRpb25fID0gbmV3IG9sR2VvbG9jYXRpb24oe1xuICAgIHByb2plY3Rpb246IHRoaXMubWFwLmdldFZpZXcoKS5nZXRQcm9qZWN0aW9uKCksXG4gICAgdHJhY2tpbmdPcHRpb25zOiAvKiogQHR5cGUge1Bvc2l0aW9uT3B0aW9uc30gKi8ge1xuICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgIH0sXG4gIH0pO1xuICBpZiAodGhpcy5vcHRpb25zLmF1dG9Sb3RhdGUpIHtcbiAgICB0aGlzLmF1dG9Sb3RhdGVMaXN0ZW5lcigpO1xuICB9XG5cbiAgLy8gQWRkIGFsaWFzIGZvciBhdXRvbWF0aWMgaTE4biBzdHJpbmcgY29sbGVjdGlvblxuICBjb25zdCBnZXR0ZXh0Q2F0YWxvZyA9IHRoaXMuZ2V0dGV4dENhdGFsb2dfO1xuXG4gIC8vIGhhbmRsZSBnZW9sb2NhdGlvbiBlcnJvci5cbiAgdGhpcy5nZW9sb2NhdGlvbl8ub24oXG4gICAgJ2Vycm9yJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7R2VvbG9jYXRpb25Qb3NpdGlvbkVycm9yfSBlcnJvclxuICAgICAqL1xuICAgIChlcnJvcikgPT4ge1xuICAgICAgdGhpcy51bnRyYWNrXygpO1xuICAgICAgbGV0IG1zZztcbiAgICAgIHN3aXRjaCAoZXJyb3IuY29kZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdVc2VyIGRlbmllZCB0aGUgcmVxdWVzdCBmb3IgR2VvbG9jYXRpb24uJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBtc2cgPSBnZXR0ZXh0Q2F0YWxvZy5nZXRTdHJpbmcoJ0xvY2F0aW9uIGluZm9ybWF0aW9uIGlzIHVuYXZhaWxhYmxlLicpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdUaGUgcmVxdWVzdCB0byBnZXQgdXNlciBsb2NhdGlvbiB0aW1lZCBvdXQuJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbXNnID0gZ2V0dGV4dENhdGFsb2cuZ2V0U3RyaW5nKCdHZW9sb2NhdGlvbjogQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIG5nZW9NZXNzYWdlTm90aWZpY2F0aW9uLmVycm9yKG1zZyk7XG4gICAgICB0aGlzLiRzY29wZV8uJGVtaXQoR2VvbG9jYXRpb25FdmVudFR5cGUuRVJST1IsIGVycm9yKTtcbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgKi9cbiAgdGhpcy5wb3NpdGlvbkZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSh7XG4gICAgbmFtZTogJ0dlb2xvY2F0aW9uUG9zaXRpb25GZWF0dXJlJyxcbiAgfSk7XG4gIHRoaXMucG9zaXRpb25GZWF0dXJlXy5zZXRTdHlsZShidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5wb3NpdGlvbkZlYXR1cmVTdHlsZSkpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7b2xGZWF0dXJlPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgKi9cbiAgdGhpcy5hY2N1cmFjeUZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZSh7XG4gICAgbmFtZTogJ0dlb2xvY2F0aW9uQWNjdXJhY3lGZWF0dXJlJyxcbiAgfSk7XG4gIHRoaXMuYWNjdXJhY3lGZWF0dXJlXy5zZXRTdHlsZShidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5hY2N1cmFjeUZlYXR1cmVTdHlsZSkpO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlY2VudGVyIHRoZSBtYXAgYXQgdGhlIHBvc2l0aW9uIGl0IGdldHMgdXBkYXRlZFxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgdmlldyB3YXMgY2hhbmdlZCBieSBtZSBvciBzb21ldGhpbmdcbiAgICogZWxzZS4gSW4gdGhlIGxhdHRlciBjYXNlLCBzdG9wIGZvbGxvd2luZy5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnZpZXdDaGFuZ2VkQnlNZV8gPSBmYWxzZTtcbiAgbGlzdGVuKFxuICAgIHRoaXMuZ2VvbG9jYXRpb25fLFxuICAgICdjaGFuZ2U6YWNjdXJhY3lHZW9tZXRyeScsXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2V2ZW50cycpLkxpc3RlbmVyRnVuY3Rpb259ICovXG4gICAgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmdlb2xvY2F0aW9uXy5nZXRBY2N1cmFjeUdlb21ldHJ5KCk7XG4gICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZW9tZXRyeScpO1xuICAgICAgfVxuICAgICAgdGhpcy5hY2N1cmFjeUZlYXR1cmVfLnNldEdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25fKCk7XG4gICAgfSxcbiAgKTtcbiAgbGlzdGVuKFxuICAgIHRoaXMuZ2VvbG9jYXRpb25fLFxuICAgICdjaGFuZ2U6cG9zaXRpb24nLFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9ldmVudHMnKS5MaXN0ZW5lckZ1bmN0aW9ufSAqL1xuICAgICgpID0+IHtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb25fKCk7XG4gICAgfSxcbiAgKTtcbiAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgbGlzdGVuKHZpZXcsICdjaGFuZ2U6Y2VudGVyJywgdGhpcy5oYW5kbGVWaWV3Q2hhbmdlXywgdGhpcyk7XG4gIGxpc3Rlbih2aWV3LCAnY2hhbmdlOnJlc29sdXRpb24nLCB0aGlzLmhhbmRsZVZpZXdDaGFuZ2VfLCB0aGlzKTtcbiAgaWYgKHRoaXMub3B0aW9ucy5hdExvYWRpbmdUaW1lICYmIHRoaXMubG9hZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy4kc2NvcGVfLiR3YXRjaChcbiAgICAgICgpID0+IHRoaXMubG9hZGluZyxcbiAgICAgIChuZXdWYWwpID0+IHtcbiAgICAgICAgaWYgKG5ld1ZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVRyYWNraW5nKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKi9cbkNvbnRyb2xsZXIucHJvdG90eXBlLnRvZ2dsZVRyYWNraW5nID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5nZW9sb2NhdGlvbl8uZ2V0VHJhY2tpbmcoKSkge1xuICAgIC8vIGlmIG1hcCBjZW50ZXIgaXMgZGlmZmVyZW50IHRoYW4gZ2VvbG9jYXRpb24gcG9zaXRpb24sIHRoZW4gdHJhY2sgYWdhaW5cbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdlb2xvY2F0aW9uXy5nZXRQb3NpdGlvbigpO1xuICAgIC8vIGlmIHVzZXIgaXMgdXNpbmcgRmlyZWZveCBhbmQgc2VsZWN0cyB0aGUgXCJub3Qgbm93XCIgb3B0aW9uLCBPTCBnZW9sb2NhdGlvblxuICAgIC8vIGRvZXNuJ3QgcmV0dXJuIGFuIGVycm9yXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnVudHJhY2tfKCk7XG4gICAgICB0aGlzLiRzY29wZV8uJGVtaXQoR2VvbG9jYXRpb25FdmVudFR5cGUuRVJST1IsIG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBzdG9wIHRyYWNraW5nIGlmIHRoZSBwb3NpdGlvbiBpcyBjbG9zZSB0byB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgICBjb25zdCBjZW50ZXIgPSB2aWV3LmdldENlbnRlcigpO1xuICAgIGlmICghY2VudGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY2VudGVyJyk7XG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicyhjdXJyZW50UG9zaXRpb25bMF0gLSBjZW50ZXJbMF0pICsgTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uWzFdIC0gY2VudGVyWzFdKTtcbiAgICBpZiAoZGlmZiA8IDIpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW1tZWRpYXRlbHkgcmVjZW50ZXIgdG8gdGhlIGxhdGVzdCBwb3NpdGlvbiB0byBhdm9pZCBhIGRlbGF5IGlmIHRoZSBHUFMgZGV2aWNlIGlzIHNsb3cgdG8gcmVzcG9uZC5cbiAgICAgIHZpZXcuc2V0Q2VudGVyKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICB0aGlzLnVudHJhY2tfKCk7XG4gICAgICB0aGlzLnRyYWNrXygpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRyYWNrXygpO1xuICB9XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUudHJhY2tfID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5hZGRGZWF0dXJlKHRoaXMucG9zaXRpb25GZWF0dXJlXyk7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmFkZEZlYXR1cmUodGhpcy5hY2N1cmFjeUZlYXR1cmVfKTtcbiAgdGhpcy5mb2xsb3dfID0gdHJ1ZTtcbiAgdGhpcy5nZW9sb2NhdGlvbl8uc2V0VHJhY2tpbmcodHJ1ZSk7XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUudW50cmFja18gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZmVhdHVyZU92ZXJsYXlfLmNsZWFyKCk7XG4gIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuICB0aGlzLmdlb2xvY2F0aW9uXy5zZXRUcmFja2luZyhmYWxzZSk7XG4gIG5nZW9NZXNzYWdlTm90aWZpY2F0aW9uLmNsZWFyKCk7XG59O1xuQ29udHJvbGxlci5wcm90b3R5cGUuc2V0UG9zaXRpb25fID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHBvc2l0aW9uJyk7XG4gIH1cbiAgY29uc3QgcG9pbnQgPSBuZXcgb2xHZW9tUG9pbnQocG9zaXRpb24pO1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8uc2V0R2VvbWV0cnkocG9pbnQpO1xuICBjb25zdCBhY2N1cmFjeSA9IHRoaXMuYWNjdXJhY3lGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICBpZiAodGhpcy5mb2xsb3dfKSB7XG4gICAgdGhpcy52aWV3Q2hhbmdlZEJ5TWVfID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnpvb20gfHwgdGhpcy5vcHRpb25zLnpvb20gPT09IDApIHtcbiAgICAgIHZpZXcuc2V0Q2VudGVyKHBvc2l0aW9uKTtcbiAgICAgIHZpZXcuc2V0Wm9vbSh0aGlzLm9wdGlvbnMuem9vbSk7XG4gICAgfSBlbHNlIGlmIChhY2N1cmFjeSBpbnN0YW5jZW9mIFBvbHlnb24pIHtcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLm1hcC5nZXRTaXplKCk7XG4gICAgICBpZiAoc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgICB9XG4gICAgICB2aWV3LmZpdChhY2N1cmFjeSwge1xuICAgICAgICBzaXplLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RXZlbnR8aW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0fSBldmVudCBFdmVudC5cbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlVmlld0NoYW5nZV8gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKHRoaXMuZm9sbG93XyAmJiAhdGhpcy52aWV3Q2hhbmdlZEJ5TWVfKSB7XG4gICAgdGhpcy5mb2xsb3dfID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vIE9yaWVudGF0aW9uIGNvbnRyb2wgZXZlbnRzXG5Db250cm9sbGVyLnByb3RvdHlwZS5hdXRvUm90YXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBjdXJyZW50QWxwaGEgPSAwO1xuICBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnKSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2RldmljZW9yaWVudGF0aW9uYWJzb2x1dGUnLFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgRGV2aWNlT3JpZW50YXRpb25FdmVudCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGV2ZW50IHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuYWxwaGEgIT09IG51bGwpIHtcbiAgICAgICAgICBjdXJyZW50QWxwaGEgPSB0aGlzLmhhbmRsZVJvdGF0ZV8oZXZlbnQuYWxwaGEsIGN1cnJlbnRBbHBoYSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH0gZWxzZSBpZiAod2luZG93Lmhhc093blByb3BlcnR5KCdvbmRldmljZW9yaWVudGF0aW9uJykpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZXZpY2VvcmllbnRhdGlvbicsXG4gICAgICAoZXZ0KSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IGlvcyBvbmx5XG4gICAgICAgIGlmIChldnQud2Via2l0Q29tcGFzc0hlYWRpbmcpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgaU9TIHByb3BlcnR5XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZTogaW9zIG9ubHlcbiAgICAgICAgICBjdXJyZW50QWxwaGEgPSB0aGlzLmhhbmRsZVJvdGF0ZV8oLWV2dC53ZWJraXRDb21wYXNzSGVhZGluZywgY3VycmVudEFscGhhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBub24gaU9TXG4gICAgICAgICAgaWYgKCFldnQuYWxwaGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBldnQuYWxwaGEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudEFscGhhID0gdGhpcy5oYW5kbGVSb3RhdGVfKGV2dC5hbHBoYSAtIDI3MCwgY3VycmVudEFscGhhKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdPcmllbnRhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgZGV2aWNlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudEFscGhhXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudEFscGhhXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVSb3RhdGVfID0gZnVuY3Rpb24gKGV2ZW50QWxwaGEsIGN1cnJlbnRBbHBoYSkge1xuICBpZiAodGhpcy5nZW9sb2NhdGlvbl8uZ2V0VHJhY2tpbmcoKSAmJiBNYXRoLmFicyhldmVudEFscGhhIC0gY3VycmVudEFscGhhKSA+IDAuMikge1xuICAgIGN1cnJlbnRBbHBoYSA9IGV2ZW50QWxwaGE7XG4gICAgY29uc3QgcmFkQWxwaGEgPSAoY3VycmVudEFscGhhICogTWF0aC5QSSkgLyAxODA7XG4gICAgdGhpcy5tYXAuZ2V0VmlldygpLmFuaW1hdGUoe1xuICAgICAgcm90YXRpb246IHJhZEFscGhhLFxuICAgICAgZHVyYXRpb246IDM1MCxcbiAgICAgIGVhc2luZzogb2xFYXNpbmcubGluZWFyLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBjdXJyZW50QWxwaGE7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignbmdlb0dlb2xvY2F0aW9uQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtb2JpbGVnZW9sb2NhdGlvblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==