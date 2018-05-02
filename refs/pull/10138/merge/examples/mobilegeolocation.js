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
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	(() => {
/******/ 		// set .name for anonymous default exports per ES spec
/******/ 		__webpack_require__.dn = (x) => {
/******/ 			(Object.getOwnPropertyDescriptor(x, "name") || {}).writable || Object.defineProperty(x, "name", { value: "default", configurable: true });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlZ2VvbG9jYXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRWhEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbW9iaWxlZ2VvbG9jYXRpb24uc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL2dlb2xvY2F0aW9uL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNS0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9tb2JpbGVnZW9sb2NhdGlvbi5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvR2VvbG9jYXRpb24gZnJvbSAnbmdlby9nZW9sb2NhdGlvbi9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncic7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IGFwcG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvR2VvbG9jYXRpb24ubmFtZSwgZ21mTWFwQ29tcG9uZW50Lm5hbWVdKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFNjb3BlLlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMCwgMF0sXG4gICAgICB6b29tOiA0LFxuICAgIH0pLFxuICB9KTtcbiAgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmluaXQodGhpcy5tYXApO1xufVxuYXBwbW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuYXBwbW9kdWxlLmNvbnN0YW50KCduZ2VvR2VvbG9jYXRpb25PcHRpb25zJywge1xuICBwb3NpdGlvbkZlYXR1cmVTdHlsZToge1xuICAgIGNpcmNsZToge1xuICAgICAgcmFkaXVzOiA2LFxuICAgICAgZmlsbDoge1xuICAgICAgICBjb2xvcjogJ3JnYmEoMjMwLCAxMDAsIDEwMCwgMSknLFxuICAgICAgfSxcbiAgICAgIHN0cm9rZToge1xuICAgICAgICBjb2xvcjogJ3JnYmEoMjMwLCA0MCwgNDAsIDEpJyxcbiAgICAgICAgd2lkdGg6IDIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGFjY3VyYWN5RmVhdHVyZVN0eWxlOiB7XG4gICAgZmlsbDoge1xuICAgICAgY29sb3I6ICdyZ2JhKDEwMCwgMTAwLCAyMzAsIDAuMyknLFxuICAgIH0sXG4gICAgc3Ryb2tlOiB7XG4gICAgICBjb2xvcjogJ3JnYmEoNDAsIDQwLCAyMzAsIDEpJyxcbiAgICAgIHdpZHRoOiAyLFxuICAgIH0sXG4gIH0sXG4gIHpvb206IDE3LFxuICBhdXRvUm90YXRlOiB0cnVlLFxufSk7XG5vcHRpb25zKGFwcG1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBhcHBtb2R1bGU7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICdnZXR0ZXh0Q2F0YWxvZycsICduZ2VvR2VvbG9jYXRpb25PcHRpb25zJ107XG4vLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyNSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3InO1xuaW1wb3J0IG5nZW9NZXNzYWdlTm90aWZpY2F0aW9uIGZyb20gJ25nZW8vbWVzc2FnZS9Ob3RpZmljYXRpb24nO1xuaW1wb3J0ICogYXMgb2xFYXNpbmcgZnJvbSAnb2wvZWFzaW5nJztcbmltcG9ydCB7bGlzdGVufSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IG9sRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlJztcbmltcG9ydCBvbEdlb2xvY2F0aW9uIGZyb20gJ29sL0dlb2xvY2F0aW9uJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sR2VvbVBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnb2wvZ2VvbS9Qb2x5Z29uJztcbmltcG9ydCB7YnVpbGRTdHlsZX0gZnJvbSAnbmdlby9vcHRpb25zJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvR2VvbG9jYXRpb24nLCBbXSk7XG5cbi8qKlxuICogQGVudW0ge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IEdlb2xvY2F0aW9uRXZlbnRUeXBlID0ge1xuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLlxuICAgKi9cbiAgRVJST1I6ICdnZW9sb2NhdGlvbi1lcnJvcicsXG59O1xuXG4vKipcbiAqIFByb3ZpZGUgYSBnZW9sb2NhdGlvbiBkaXJlY3RpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIDxidXR0b24gbmdlby1nZW9sb2NhdGlvblxuICogICAgICAgIG5nZW8tZ2VvbG9jYXRpb24tbWFwPVwiY3RybC5tYXBcIj5cbiAqICAgICAgPC9idXR0b24+XG4gKlxuICogU2VlIG91ciBsaXZlIGV4YW1wbGU6IFsuLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5odG1sXSguLi9leGFtcGxlcy9tb2JpbGVnZW9sb2NhdGlvbi5odG1sKVxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9IG5nZW8tZ2VvbG9jYXRpb24tbWFwIFRoZSBtYXAuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7R2VvbG9jYXRpb25EaXJlY3RpdmVPcHRpb25zfSBuZ2VvLWdlb2xvY2F0aW9uLW9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gKiBAcmV0dXJucyB7YW5ndWxhci5JRGlyZWN0aXZlfSBUaGUgRGlyZWN0aXZlIERlZmluaXRpb24gT2JqZWN0LlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5nbmFtZSBuZ2VvR2VvbG9jYXRpb25cbiAqL1xuZnVuY3Rpb24gZ2VvbG9jYXRpb25Db21wb25lbnQoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ21hcCc6ICc8bmdlb0dlb2xvY2F0aW9uTWFwJyxcbiAgICAgICdsb2FkaW5nJzogJz1uZ2VvR2VvbG9jYXRpb25Mb2FkaW5nJyxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICduZ2VvR2VvbG9jYXRpb25Db250cm9sbGVyJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxuICB9O1xufVxubXlNb2R1bGUuZGlyZWN0aXZlKCduZ2VvR2VvbG9jYXRpb24nLCBnZW9sb2NhdGlvbkNvbXBvbmVudCk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAaGlkZGVuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSVNjb3BlfSAkc2NvcGUgVGhlIGRpcmVjdGl2ZSdzIHNjb3BlLlxuICogQHBhcmFtIHtKUXVlcnl9ICRlbGVtZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vb3B0aW9ucycpLm5nZW9HZW9sb2NhdGlvbk9wdGlvbnN9IG5nZW9HZW9sb2NhdGlvbk9wdGlvbnMgVGhlIG9wdGlvbnMuXG4gKiBAbmdkb2MgY29udHJvbGxlclxuICogQG5nbmFtZSBuZ2VvR2VvbG9jYXRpb25Db250cm9sbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsIGdldHRleHRDYXRhbG9nLCBuZ2VvR2VvbG9jYXRpb25PcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG5nZW9HZW9sb2NhdGlvbk9wdGlvbnM7XG4gICRlbGVtZW50Lm9uKCdjbGljaycsIHRoaXMudG9nZ2xlVHJhY2tpbmcuYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICovXG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ31cbiAgICovXG4gIHRoaXMuZ2V0dGV4dENhdGFsb2dfID0gZ2V0dGV4dENhdGFsb2c7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcDtcblxuICAvKipcbiAgICogQSBmbGFnIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBhcHBsaWNhdGlvbiBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmxvYWRpbmc7XG59XG5cbi8qKlxuICovXG5Db250cm9sbGVyLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoISh0aGlzLm1hcCBpbnN0YW5jZW9mIG9sTWFwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbWFwIHR5cGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheScpLkZlYXR1cmVPdmVybGF5fVxuICAgKi9cbiAgdGhpcy5mZWF0dXJlT3ZlcmxheV8gPSBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvR2VvbG9jYXRpb24nKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5nZW9sb2NhdGlvbl8gPSBuZXcgb2xHZW9sb2NhdGlvbih7XG4gICAgcHJvamVjdGlvbjogdGhpcy5tYXAuZ2V0VmlldygpLmdldFByb2plY3Rpb24oKSxcbiAgICB0cmFja2luZ09wdGlvbnM6IC8qKiBAdHlwZSB7UG9zaXRpb25PcHRpb25zfSAqLyB7XG4gICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXG4gICAgfSxcbiAgfSk7XG4gIGlmICh0aGlzLm9wdGlvbnMuYXV0b1JvdGF0ZSkge1xuICAgIHRoaXMuYXV0b1JvdGF0ZUxpc3RlbmVyKCk7XG4gIH1cblxuICAvLyBBZGQgYWxpYXMgZm9yIGF1dG9tYXRpYyBpMThuIHN0cmluZyBjb2xsZWN0aW9uXG4gIGNvbnN0IGdldHRleHRDYXRhbG9nID0gdGhpcy5nZXR0ZXh0Q2F0YWxvZ187XG5cbiAgLy8gaGFuZGxlIGdlb2xvY2F0aW9uIGVycm9yLlxuICB0aGlzLmdlb2xvY2F0aW9uXy5vbihcbiAgICAnZXJyb3InLFxuICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtHZW9sb2NhdGlvblBvc2l0aW9uRXJyb3J9IGVycm9yXG4gICAgICovXG4gICAgKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLnVudHJhY2tfKCk7XG4gICAgICBsZXQgbXNnO1xuICAgICAgc3dpdGNoIChlcnJvci5jb2RlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBtc2cgPSBnZXR0ZXh0Q2F0YWxvZy5nZXRTdHJpbmcoJ1VzZXIgZGVuaWVkIHRoZSByZXF1ZXN0IGZvciBHZW9sb2NhdGlvbi4nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIG1zZyA9IGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnTG9jYXRpb24gaW5mb3JtYXRpb24gaXMgdW5hdmFpbGFibGUuJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBtc2cgPSBnZXR0ZXh0Q2F0YWxvZy5nZXRTdHJpbmcoJ1RoZSByZXF1ZXN0IHRvIGdldCB1c2VyIGxvY2F0aW9uIHRpbWVkIG91dC4nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBtc2cgPSBnZXR0ZXh0Q2F0YWxvZy5nZXRTdHJpbmcoJ0dlb2xvY2F0aW9uOiBBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLicpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbmdlb01lc3NhZ2VOb3RpZmljYXRpb24uZXJyb3IobXNnKTtcbiAgICAgIHRoaXMuJHNjb3BlXy4kZW1pdChHZW9sb2NhdGlvbkV2ZW50VHlwZS5FUlJPUiwgZXJyb3IpO1xuICAgIH0sXG4gICk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLnBvc2l0aW9uRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKHtcbiAgICBuYW1lOiAnR2VvbG9jYXRpb25Qb3NpdGlvbkZlYXR1cmUnLFxuICB9KTtcbiAgdGhpcy5wb3NpdGlvbkZlYXR1cmVfLnNldFN0eWxlKGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnBvc2l0aW9uRmVhdHVyZVN0eWxlKSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtvbEZlYXR1cmU8aW1wb3J0KCdvbC9nZW9tL0dlb21ldHJ5JykuZGVmYXVsdD59XG4gICAqL1xuICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKHtcbiAgICBuYW1lOiAnR2VvbG9jYXRpb25BY2N1cmFjeUZlYXR1cmUnLFxuICB9KTtcbiAgdGhpcy5hY2N1cmFjeUZlYXR1cmVfLnNldFN0eWxlKGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLmFjY3VyYWN5RmVhdHVyZVN0eWxlKSk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVjZW50ZXIgdGhlIG1hcCBhdCB0aGUgcG9zaXRpb24gaXQgZ2V0cyB1cGRhdGVkXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5mb2xsb3dfID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB1c2VkIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSB2aWV3IHdhcyBjaGFuZ2VkIGJ5IG1lIG9yIHNvbWV0aGluZ1xuICAgKiBlbHNlLiBJbiB0aGUgbGF0dGVyIGNhc2UsIHN0b3AgZm9sbG93aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IGZhbHNlO1xuICBsaXN0ZW4oXG4gICAgdGhpcy5nZW9sb2NhdGlvbl8sXG4gICAgJ2NoYW5nZTphY2N1cmFjeUdlb21ldHJ5JyxcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvZXZlbnRzJykuTGlzdGVuZXJGdW5jdGlvbn0gKi9cbiAgICAoZXZ0KSA9PiB7XG4gICAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldEFjY3VyYWN5R2VvbWV0cnkoKTtcbiAgICAgIGlmICghZ2VvbWV0cnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdlb21ldHJ5Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFjY3VyYWN5RmVhdHVyZV8uc2V0R2VvbWV0cnkoZ2VvbWV0cnkpO1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgICB9LFxuICApO1xuICBsaXN0ZW4oXG4gICAgdGhpcy5nZW9sb2NhdGlvbl8sXG4gICAgJ2NoYW5nZTpwb3NpdGlvbicsXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL2V2ZW50cycpLkxpc3RlbmVyRnVuY3Rpb259ICovXG4gICAgKCkgPT4ge1xuICAgICAgdGhpcy5zZXRQb3NpdGlvbl8oKTtcbiAgICB9LFxuICApO1xuICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICBsaXN0ZW4odmlldywgJ2NoYW5nZTpjZW50ZXInLCB0aGlzLmhhbmRsZVZpZXdDaGFuZ2VfLCB0aGlzKTtcbiAgbGlzdGVuKHZpZXcsICdjaGFuZ2U6cmVzb2x1dGlvbicsIHRoaXMuaGFuZGxlVmlld0NoYW5nZV8sIHRoaXMpO1xuICBpZiAodGhpcy5vcHRpb25zLmF0TG9hZGluZ1RpbWUgJiYgdGhpcy5sb2FkaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLiRzY29wZV8uJHdhdGNoKFxuICAgICAgKCkgPT4gdGhpcy5sb2FkaW5nLFxuICAgICAgKG5ld1ZhbCkgPT4ge1xuICAgICAgICBpZiAobmV3VmFsID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlVHJhY2tpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUudG9nZ2xlVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmdlb2xvY2F0aW9uXy5nZXRUcmFja2luZygpKSB7XG4gICAgLy8gaWYgbWFwIGNlbnRlciBpcyBkaWZmZXJlbnQgdGhhbiBnZW9sb2NhdGlvbiBwb3NpdGlvbiwgdGhlbiB0cmFjayBhZ2FpblxuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2VvbG9jYXRpb25fLmdldFBvc2l0aW9uKCk7XG4gICAgLy8gaWYgdXNlciBpcyB1c2luZyBGaXJlZm94IGFuZCBzZWxlY3RzIHRoZSBcIm5vdCBub3dcIiBvcHRpb24sIE9MIGdlb2xvY2F0aW9uXG4gICAgLy8gZG9lc24ndCByZXR1cm4gYW4gZXJyb3JcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudW50cmFja18oKTtcbiAgICAgIHRoaXMuJHNjb3BlXy4kZW1pdChHZW9sb2NhdGlvbkV2ZW50VHlwZS5FUlJPUiwgbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHN0b3AgdHJhY2tpbmcgaWYgdGhlIHBvc2l0aW9uIGlzIGNsb3NlIHRvIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICBjb25zdCB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIGNvbnN0IGNlbnRlciA9IHZpZXcuZ2V0Q2VudGVyKCk7XG4gICAgaWYgKCFjZW50ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjZW50ZXInKTtcbiAgICB9XG4gICAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGN1cnJlbnRQb3NpdGlvblswXSAtIGNlbnRlclswXSkgKyBNYXRoLmFicyhjdXJyZW50UG9zaXRpb25bMV0gLSBjZW50ZXJbMV0pO1xuICAgIC8vIEluIHBpeGVsc1xuICAgIGNvbnN0IGRpZmZfcHggPSBkaWZmIC8gdmlldy5nZXRSZXNvbHV0aW9uKCk7XG4gICAgaWYgKGRpZmZfcHggPCAyKSB7XG4gICAgICB0aGlzLnVudHJhY2tfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGltbWVkaWF0ZWx5IHJlY2VudGVyIHRvIHRoZSBsYXRlc3QgcG9zaXRpb24gdG8gYXZvaWQgYSBkZWxheSBpZiB0aGUgR1BTIGRldmljZSBpcyBzbG93IHRvIHJlc3BvbmQuXG4gICAgICB2aWV3LnNldENlbnRlcihjdXJyZW50UG9zaXRpb24pO1xuICAgICAgdGhpcy51bnRyYWNrXygpO1xuICAgICAgdGhpcy50cmFja18oKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50cmFja18oKTtcbiAgfVxufTtcbkNvbnRyb2xsZXIucHJvdG90eXBlLnRyYWNrXyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mZWF0dXJlT3ZlcmxheV8uYWRkRmVhdHVyZSh0aGlzLnBvc2l0aW9uRmVhdHVyZV8pO1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5hZGRGZWF0dXJlKHRoaXMuYWNjdXJhY3lGZWF0dXJlXyk7XG4gIHRoaXMuZm9sbG93XyA9IHRydWU7XG4gIHRoaXMuZ2VvbG9jYXRpb25fLnNldFRyYWNraW5nKHRydWUpO1xufTtcbkNvbnRyb2xsZXIucHJvdG90eXBlLnVudHJhY2tfID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZlYXR1cmVPdmVybGF5Xy5jbGVhcigpO1xuICB0aGlzLmZvbGxvd18gPSBmYWxzZTtcbiAgdGhpcy5nZW9sb2NhdGlvbl8uc2V0VHJhY2tpbmcoZmFsc2UpO1xuICBuZ2VvTWVzc2FnZU5vdGlmaWNhdGlvbi5jbGVhcigpO1xufTtcbkNvbnRyb2xsZXIucHJvdG90eXBlLnNldFBvc2l0aW9uXyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdlb2xvY2F0aW9uXy5nZXRQb3NpdGlvbigpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwb3NpdGlvbicpO1xuICB9XG4gIGNvbnN0IHBvaW50ID0gbmV3IG9sR2VvbVBvaW50KHBvc2l0aW9uKTtcbiAgdGhpcy5wb3NpdGlvbkZlYXR1cmVfLnNldEdlb21ldHJ5KHBvaW50KTtcbiAgY29uc3QgYWNjdXJhY3kgPSB0aGlzLmFjY3VyYWN5RmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgaWYgKHRoaXMuZm9sbG93Xykge1xuICAgIHRoaXMudmlld0NoYW5nZWRCeU1lXyA9IHRydWU7XG4gICAgaWYgKHRoaXMub3B0aW9ucy56b29tIHx8IHRoaXMub3B0aW9ucy56b29tID09PSAwKSB7XG4gICAgICB2aWV3LnNldENlbnRlcihwb3NpdGlvbik7XG4gICAgICB2aWV3LnNldFpvb20odGhpcy5vcHRpb25zLnpvb20pO1xuICAgIH0gZWxzZSBpZiAoYWNjdXJhY3kgaW5zdGFuY2VvZiBQb2x5Z29uKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5tYXAuZ2V0U2l6ZSgpO1xuICAgICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgICAgfVxuICAgICAgdmlldy5maXQoYWNjdXJhY3ksIHtcbiAgICAgICAgc2l6ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnZpZXdDaGFuZ2VkQnlNZV8gPSBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0V2ZW50fGltcG9ydCgnb2wvZXZlbnRzL0V2ZW50JykuZGVmYXVsdH0gZXZlbnQgRXZlbnQuXG4gKi9cbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZVZpZXdDaGFuZ2VfID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICh0aGlzLmZvbGxvd18gJiYgIXRoaXMudmlld0NoYW5nZWRCeU1lXykge1xuICAgIHRoaXMuZm9sbG93XyA9IGZhbHNlO1xuICB9XG59O1xuXG4vLyBPcmllbnRhdGlvbiBjb250cm9sIGV2ZW50c1xuQ29udHJvbGxlci5wcm90b3R5cGUuYXV0b1JvdGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICBsZXQgY3VycmVudEFscGhhID0gMDtcbiAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnb25kZXZpY2VvcmllbnRhdGlvbmFic29sdXRlJykpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZXZpY2VvcmllbnRhdGlvbmFic29sdXRlJyxcbiAgICAgIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIERldmljZU9yaWVudGF0aW9uRXZlbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBldmVudCB0eXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmFscGhhICE9PSBudWxsKSB7XG4gICAgICAgICAgY3VycmVudEFscGhhID0gdGhpcy5oYW5kbGVSb3RhdGVfKGV2ZW50LmFscGhhLCBjdXJyZW50QWxwaGEpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eSgnb25kZXZpY2VvcmllbnRhdGlvbicpKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZGV2aWNlb3JpZW50YXRpb24nLFxuICAgICAgKGV2dCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlOiBpb3Mgb25seVxuICAgICAgICBpZiAoZXZ0LndlYmtpdENvbXBhc3NIZWFkaW5nKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGlPUyBwcm9wZXJ0eVxuICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IGlvcyBvbmx5XG4gICAgICAgICAgY3VycmVudEFscGhhID0gdGhpcy5oYW5kbGVSb3RhdGVfKC1ldnQud2Via2l0Q29tcGFzc0hlYWRpbmcsIGN1cnJlbnRBbHBoYSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm9uIGlPU1xuICAgICAgICAgIGlmICghZXZ0LmFscGhhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZXZ0LmFscGhhJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IHRoaXMuaGFuZGxlUm90YXRlXyhldnQuYWxwaGEgLSAyNzAsIGN1cnJlbnRBbHBoYSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignT3JpZW50YXRpb24gaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIGRldmljZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZSByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZXZlbnRBbHBoYVxuICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRBbHBoYVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlUm90YXRlXyA9IGZ1bmN0aW9uIChldmVudEFscGhhLCBjdXJyZW50QWxwaGEpIHtcbiAgaWYgKHRoaXMuZ2VvbG9jYXRpb25fLmdldFRyYWNraW5nKCkgJiYgTWF0aC5hYnMoZXZlbnRBbHBoYSAtIGN1cnJlbnRBbHBoYSkgPiAwLjIpIHtcbiAgICBjdXJyZW50QWxwaGEgPSBldmVudEFscGhhO1xuICAgIGNvbnN0IHJhZEFscGhhID0gKGN1cnJlbnRBbHBoYSAqIE1hdGguUEkpIC8gMTgwO1xuICAgIHRoaXMubWFwLmdldFZpZXcoKS5hbmltYXRlKHtcbiAgICAgIHJvdGF0aW9uOiByYWRBbHBoYSxcbiAgICAgIGR1cmF0aW9uOiAzNTAsXG4gICAgICBlYXNpbmc6IG9sRWFzaW5nLmxpbmVhcixcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gY3VycmVudEFscGhhO1xufTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ25nZW9HZW9sb2NhdGlvbkNvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBzZXQgLm5hbWUgZm9yIGFub255bW91cyBkZWZhdWx0IGV4cG9ydHMgcGVyIEVTIHNwZWNcbl9fd2VicGFja19yZXF1aXJlX18uZG4gPSAoeCkgPT4ge1xuXHQoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih4LCBcIm5hbWVcIikgfHwge30pLndyaXRhYmxlIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibW9iaWxlZ2VvbG9jYXRpb25cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL21vYmlsZWdlb2xvY2F0aW9uLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=