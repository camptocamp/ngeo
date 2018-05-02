/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/permalink.js"
/*!*******************************!*\
  !*** ./examples/permalink.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _permalink_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permalink.scss */ "./examples/permalink.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_format_FeatureHash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/format/FeatureHash */ "./src/format/FeatureHash.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_statemanager_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/statemanager/module */ "./src/statemanager/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
// The MIT License (MIT)
//
// Copyright (c) 2014-2026 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', [
  'gettext',
  gmf_map_component__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  ngeo_statemanager_module__WEBPACK_IMPORTED_MODULE_7__["default"].name,
]);

/**
 * An application-specific map component that updates the URL in the browser
 * address bar when the map view changes. It also sets the initial view based
 * on the URL query params at init time.
 *
 * This component gets a reference to the map instance through the "app-map"
 * attribute.
 *
 * @type {angular.IComponentOptions}
 */
const mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap',
  },
  template: '<gmf-map gmf-map-map=ctrl.map></gmf-map>',
};
myModule.component('appMap', mapComponent);

MapComponentController.$inject = ['ngeoLocation', 'ngeoDebounce'];

/**
 * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation ngeo Location service.
 * @param {import('ngeo/misc/debounce').miscDebounce<function(import('ol/events/Event').default): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @class
 */
function MapComponentController(ngeoLocation, ngeoDebounce) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {import('ngeo/statemanager/Location').StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {import('ngeo/misc/debounce').miscDebounce<function(import('ol/events/Event').default): void>}
   */
  this.ngeoDebounce_ = ngeoDebounce;
}
myModule.controller('AppMapController', MapComponentController);
MapComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  const view = this.map.getView();
  const zoom_ = this.ngeoLocation_.getParam('z');
  const zoom = zoom_ !== undefined ? +zoom_ : 4;
  const x = this.ngeoLocation_.getParam('x');
  const y = this.ngeoLocation_.getParam('y');
  const center = x !== undefined && y !== undefined ? [+x, +y] : [0, 0];
  view.setCenter(center);
  view.setZoom(zoom);
  this.ngeoLocation_.updateParams({
    'z': `${zoom}`,
    'x': `${Math.round(center[0])}`,
    'y': `${Math.round(center[1])}`,
  });
  view.on(
    /** @type {import('ol/Observable').EventTypes} */ 'propertychange',
    /** @type {function(?): ?} */
    this.ngeoDebounce_(
      /**
       * @param {import('ol/events/Event').default} e Object event.
       */
      // @ts-ignore
      (e) => {
        const center = view.getCenter();
        if (!center) {
          throw new Error('Missing center');
        }
        const params = {
          'z': `${view.getZoom()}`,
          'x': `${Math.round(center[0])}`,
          'y': `${Math.round(center[1])}`,
        };
        this.ngeoLocation_.updateParams(params);
      },
      300,
      /* invokeApply */ true,
    ),
  );
};

/**
 * A draw component that adds a simple draw tool.
 *
 * @type {angular.IComponentOptions}
 */
const drawComponent = {
  controller: 'AppDrawController as ctrl',
  bindings: {
    'map': '=appDrawMap',
    'layer': '=appDrawLayer',
  },
  template:
    '<label>Enable drawing:' +
    '<input type="checkbox" ng-model="ctrl.interaction.active" />' +
    '</label><br>' +
    '<button ng-click="ctrl.clearLayer()">Clear layer</button>',
};
myModule.component('appDraw', drawComponent);

DrawComponentController.$inject = ['$scope', 'ngeoLocation'];

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation ngeo Location service.
 * @class
 */
function DrawComponentController($scope, ngeoLocation) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {?import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.layer = null;

  /**
   * @type {import('ngeo/statemanager/Location').StatemanagerLocation}
   */
  this.ngeoLocation_ = ngeoLocation;

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {number}
   */
  this.featureSeq_ = 0;

  /**
   * @type {?import('ol/interaction/Draw').default}
   */
  this.interaction = null;
}
DrawComponentController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  /**
   * @type {olSourceVector<import('ol/geom/Geometry').default>}
   */
  const vectorSource = this.layer.getSource();
  this.interaction = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_9__["default"]({
    type: 'LineString',
    source: vectorSource,
  });
  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__.interactionDecoration)(this.interaction);
  this.interaction.on(
    /** @type {import('ol/Observable').EventTypes} */ 'drawend',
    /** @type {function(?): ?} */
    /**
     * @param {import('ol/MapBrowserEvent').default<unknown>} e
     */ (e) => {
      // @ts-ignore
      e.feature.set('id', ++this.featureSeq_);
    },
  );

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeo_format_FeatureHash__WEBPACK_IMPORTED_MODULE_2__["default"]();
  vectorSource.on(
    /** @type {import('ol/Observable').EventTypes} */ 'addfeature',
    /** @type {function(?): ?} */
    /**
     * @param {import('ol/MapBrowserEvent').default<unknown>} e
     */ (e) => {
      // @ts-ignore
      const feature = e.feature;
      feature.setStyle(
        new ol_style_Style__WEBPACK_IMPORTED_MODULE_15__["default"]({
          stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_14__["default"]({
            color: [255, 0, 0, 1],
            width: 2,
          }),
        }),
      );
      const features = vectorSource.getFeatures();
      const encodedFeatures = fhFormat.writeFeatures(features);
      if (typeof encodedFeatures == 'string') {
        this.scope_.$applyAsync(() => {
          this.ngeoLocation_.updateParams({
            'features': encodedFeatures,
          });
        });
      } else {
        console.error(`Unsupported type: ${typeof encodedFeatures}`);
      }
    },
  );
  const encodedFeatures = this.ngeoLocation_.getParam('features');
  if (encodedFeatures !== undefined) {
    const features =
      /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */
      fhFormat.readFeatures(encodedFeatures);
    this.featureSeq_ = features.length;
    vectorSource.addFeatures(features);
  }
};

/**
 * Clear the vector layer.
 */
DrawComponentController.prototype.clearLayer = function () {
  if (!this.layer) {
    throw new Error('Missing layer');
  }
  const source = this.layer.getSource();
  if (!(source instanceof ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__["default"])) {
    throw new Error('Wrong source');
  }
  source.clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};
myModule.controller('AppDrawController', DrawComponentController);

/**
 * @class
 */
function MainController() {
  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__["default"](),
      }),
    ],
  });
  const vectorSource = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__["default"]();

  /**
   * @type {import('ol/layer/Vector').default<import('ol/source/Vector').default<import('ol/geom/Geometry').default>>}
   */
  this.vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
    source: vectorSource,
  });

  // Use vectorLayer.setMap(map) rather than map.addLayer(vectorLayer). This
  // makes the vector layer "unmanaged", meaning that it is always on top.
  this.vectorLayer.setMap(this.map);
}
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_4__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/permalink.scss"
/*!*********************************!*\
  !*** ./examples/permalink.scss ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			"permalink": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/permalink.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BUQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcGVybWFsaW5rLmpzIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9wZXJtYWxpbmsuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE0LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL3Blcm1hbGluay5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoIGZyb20gJ25nZW8vZm9ybWF0L0ZlYXR1cmVIYXNoJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBuZ2VvTWlzY0RlYm91bmNlIGZyb20gJ25nZW8vbWlzYy9kZWJvdW5jZSc7XG5pbXBvcnQge2ludGVyYWN0aW9uRGVjb3JhdGlvbn0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlJztcbmltcG9ydCBuZ2VvU3RhdGVtYW5hZ2VyTW9kdWxlIGZyb20gJ25nZW8vc3RhdGVtYW5hZ2VyL21vZHVsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbEludGVyYWN0aW9uRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3JztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9XZWJHTFRpbGUnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBuZ2VvTWlzY0RlYm91bmNlLm5hbWUsXG4gIG5nZW9TdGF0ZW1hbmFnZXJNb2R1bGUubmFtZSxcbl0pO1xuXG4vKipcbiAqIEFuIGFwcGxpY2F0aW9uLXNwZWNpZmljIG1hcCBjb21wb25lbnQgdGhhdCB1cGRhdGVzIHRoZSBVUkwgaW4gdGhlIGJyb3dzZXJcbiAqIGFkZHJlc3MgYmFyIHdoZW4gdGhlIG1hcCB2aWV3IGNoYW5nZXMuIEl0IGFsc28gc2V0cyB0aGUgaW5pdGlhbCB2aWV3IGJhc2VkXG4gKiBvbiB0aGUgVVJMIHF1ZXJ5IHBhcmFtcyBhdCBpbml0IHRpbWUuXG4gKlxuICogVGhpcyBjb21wb25lbnQgZ2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgbWFwIGluc3RhbmNlIHRocm91Z2ggdGhlIFwiYXBwLW1hcFwiXG4gKiBhdHRyaWJ1dGUuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IG1hcENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0FwcE1hcENvbnRyb2xsZXIgYXMgY3RybCcsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwTWFwJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8Z21mLW1hcCBnbWYtbWFwLW1hcD1jdHJsLm1hcD48L2dtZi1tYXA+Jyxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2FwcE1hcCcsIG1hcENvbXBvbmVudCk7XG5cbk1hcENvbXBvbmVudENvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdlb0xvY2F0aW9uJywgJ25nZW9EZWJvdW5jZSddO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbicpLlN0YXRlbWFuYWdlckxvY2F0aW9ufSBuZ2VvTG9jYXRpb24gbmdlbyBMb2NhdGlvbiBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihpbXBvcnQoJ29sL2V2ZW50cy9FdmVudCcpLmRlZmF1bHQpOiB2b2lkPn0gbmdlb0RlYm91bmNlXG4gKiAgICBuZ2VvIERlYm91bmNlIGZhY3RvcnkuXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFwQ29tcG9uZW50Q29udHJvbGxlcihuZ2VvTG9jYXRpb24sIG5nZW9EZWJvdW5jZSkge1xuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL0xvY2F0aW9uJykuU3RhdGVtYW5hZ2VyTG9jYXRpb259XG4gICAqL1xuICB0aGlzLm5nZW9Mb2NhdGlvbl8gPSBuZ2VvTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihpbXBvcnQoJ29sL2V2ZW50cy9FdmVudCcpLmRlZmF1bHQpOiB2b2lkPn1cbiAgICovXG4gIHRoaXMubmdlb0RlYm91bmNlXyA9IG5nZW9EZWJvdW5jZTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcE1hcENvbnRyb2xsZXInLCBNYXBDb21wb25lbnRDb250cm9sbGVyKTtcbk1hcENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgY29uc3QgdmlldyA9IHRoaXMubWFwLmdldFZpZXcoKTtcbiAgY29uc3Qgem9vbV8gPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3onKTtcbiAgY29uc3Qgem9vbSA9IHpvb21fICE9PSB1bmRlZmluZWQgPyArem9vbV8gOiA0O1xuICBjb25zdCB4ID0gdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtKCd4Jyk7XG4gIGNvbnN0IHkgPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3knKTtcbiAgY29uc3QgY2VudGVyID0geCAhPT0gdW5kZWZpbmVkICYmIHkgIT09IHVuZGVmaW5lZCA/IFsreCwgK3ldIDogWzAsIDBdO1xuICB2aWV3LnNldENlbnRlcihjZW50ZXIpO1xuICB2aWV3LnNldFpvb20oem9vbSk7XG4gIHRoaXMubmdlb0xvY2F0aW9uXy51cGRhdGVQYXJhbXMoe1xuICAgICd6JzogYCR7em9vbX1gLFxuICAgICd4JzogYCR7TWF0aC5yb3VuZChjZW50ZXJbMF0pfWAsXG4gICAgJ3knOiBgJHtNYXRoLnJvdW5kKGNlbnRlclsxXSl9YCxcbiAgfSk7XG4gIHZpZXcub24oXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL09ic2VydmFibGUnKS5FdmVudFR5cGVzfSAqLyAncHJvcGVydHljaGFuZ2UnLFxuICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovXG4gICAgdGhpcy5uZ2VvRGVib3VuY2VfKFxuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvZXZlbnRzL0V2ZW50JykuZGVmYXVsdH0gZSBPYmplY3QgZXZlbnQuXG4gICAgICAgKi9cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHZpZXcuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGlmICghY2VudGVyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAneic6IGAke3ZpZXcuZ2V0Wm9vbSgpfWAsXG4gICAgICAgICAgJ3gnOiBgJHtNYXRoLnJvdW5kKGNlbnRlclswXSl9YCxcbiAgICAgICAgICAneSc6IGAke01hdGgucm91bmQoY2VudGVyWzFdKX1gLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5nZW9Mb2NhdGlvbl8udXBkYXRlUGFyYW1zKHBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgMzAwLFxuICAgICAgLyogaW52b2tlQXBwbHkgKi8gdHJ1ZSxcbiAgICApLFxuICApO1xufTtcblxuLyoqXG4gKiBBIGRyYXcgY29tcG9uZW50IHRoYXQgYWRkcyBhIHNpbXBsZSBkcmF3IHRvb2wuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IGRyYXdDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdBcHBEcmF3Q29udHJvbGxlciBhcyBjdHJsJyxcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBEcmF3TWFwJyxcbiAgICAnbGF5ZXInOiAnPWFwcERyYXdMYXllcicsXG4gIH0sXG4gIHRlbXBsYXRlOlxuICAgICc8bGFiZWw+RW5hYmxlIGRyYXdpbmc6JyArXG4gICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1tb2RlbD1cImN0cmwuaW50ZXJhY3Rpb24uYWN0aXZlXCIgLz4nICtcbiAgICAnPC9sYWJlbD48YnI+JyArXG4gICAgJzxidXR0b24gbmctY2xpY2s9XCJjdHJsLmNsZWFyTGF5ZXIoKVwiPkNsZWFyIGxheWVyPC9idXR0b24+Jyxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2FwcERyYXcnLCBkcmF3Q29tcG9uZW50KTtcblxuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ25nZW9Mb2NhdGlvbiddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbicpLlN0YXRlbWFuYWdlckxvY2F0aW9ufSBuZ2VvTG9jYXRpb24gbmdlbyBMb2NhdGlvbiBzZXJ2aWNlLlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIERyYXdDb21wb25lbnRDb250cm9sbGVyKCRzY29wZSwgbmdlb0xvY2F0aW9uKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvTWFwJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICB0aGlzLmxheWVyID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvTG9jYXRpb24nKS5TdGF0ZW1hbmFnZXJMb2NhdGlvbn1cbiAgICovXG4gIHRoaXMubmdlb0xvY2F0aW9uXyA9IG5nZW9Mb2NhdGlvbjtcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVNjb3BlfVxuICAgKi9cbiAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqL1xuICB0aGlzLmZlYXR1cmVTZXFfID0gMDtcblxuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL2ludGVyYWN0aW9uL0RyYXcnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5pbnRlcmFjdGlvbiA9IG51bGw7XG59XG5EcmF3Q29tcG9uZW50Q29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBpZiAoIXRoaXMubGF5ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbGF5ZXInKTtcbiAgfVxuICAvKipcbiAgICogQHR5cGUge29sU291cmNlVmVjdG9yPGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+fVxuICAgKi9cbiAgY29uc3QgdmVjdG9yU291cmNlID0gdGhpcy5sYXllci5nZXRTb3VyY2UoKTtcbiAgdGhpcy5pbnRlcmFjdGlvbiA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgIHNvdXJjZTogdmVjdG9yU291cmNlLFxuICB9KTtcbiAgdGhpcy5pbnRlcmFjdGlvbi5zZXRBY3RpdmUoZmFsc2UpO1xuICB0aGlzLm1hcC5hZGRJbnRlcmFjdGlvbih0aGlzLmludGVyYWN0aW9uKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMuaW50ZXJhY3Rpb24pO1xuICB0aGlzLmludGVyYWN0aW9uLm9uKFxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9PYnNlcnZhYmxlJykuRXZlbnRUeXBlc30gKi8gJ2RyYXdlbmQnLFxuICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoJ29sL01hcEJyb3dzZXJFdmVudCcpLmRlZmF1bHQ8dW5rbm93bj59IGVcbiAgICAgKi8gKGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGUuZmVhdHVyZS5zZXQoJ2lkJywgKyt0aGlzLmZlYXR1cmVTZXFfKTtcbiAgICB9LFxuICApO1xuXG4gIC8vIERlYWwgd2l0aCB0aGUgZW5jb2RpbmcgYW5kIGRlY29kaW5nIG9mIGZlYXR1cmVzIGluIHRoZSBVUkwuXG5cbiAgY29uc3QgZmhGb3JtYXQgPSBuZXcgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoKCk7XG4gIHZlY3RvclNvdXJjZS5vbihcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdhZGRmZWF0dXJlJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQnKS5kZWZhdWx0PHVua25vd24+fSBlXG4gICAgICovIChlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBmZWF0dXJlID0gZS5mZWF0dXJlO1xuICAgICAgZmVhdHVyZS5zZXRTdHlsZShcbiAgICAgICAgbmV3IG9sU3R5bGVTdHlsZSh7XG4gICAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgICBjb2xvcjogWzI1NSwgMCwgMCwgMV0sXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgY29uc3QgZmVhdHVyZXMgPSB2ZWN0b3JTb3VyY2UuZ2V0RmVhdHVyZXMoKTtcbiAgICAgIGNvbnN0IGVuY29kZWRGZWF0dXJlcyA9IGZoRm9ybWF0LndyaXRlRmVhdHVyZXMoZmVhdHVyZXMpO1xuICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkRmVhdHVyZXMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5zY29wZV8uJGFwcGx5QXN5bmMoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdlb0xvY2F0aW9uXy51cGRhdGVQYXJhbXMoe1xuICAgICAgICAgICAgJ2ZlYXR1cmVzJzogZW5jb2RlZEZlYXR1cmVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuc3VwcG9ydGVkIHR5cGU6ICR7dHlwZW9mIGVuY29kZWRGZWF0dXJlc31gKTtcbiAgICAgIH1cbiAgICB9LFxuICApO1xuICBjb25zdCBlbmNvZGVkRmVhdHVyZXMgPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ2ZlYXR1cmVzJyk7XG4gIGlmIChlbmNvZGVkRmVhdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGZlYXR1cmVzID1cbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqL1xuICAgICAgZmhGb3JtYXQucmVhZEZlYXR1cmVzKGVuY29kZWRGZWF0dXJlcyk7XG4gICAgdGhpcy5mZWF0dXJlU2VxXyA9IGZlYXR1cmVzLmxlbmd0aDtcbiAgICB2ZWN0b3JTb3VyY2UuYWRkRmVhdHVyZXMoZmVhdHVyZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSB2ZWN0b3IgbGF5ZXIuXG4gKi9cbkRyYXdDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubGF5ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbGF5ZXInKTtcbiAgfVxuICBjb25zdCBzb3VyY2UgPSB0aGlzLmxheWVyLmdldFNvdXJjZSgpO1xuICBpZiAoIShzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVZlY3RvcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHNvdXJjZScpO1xuICB9XG4gIHNvdXJjZS5jbGVhcih0cnVlKTtcbiAgdGhpcy5mZWF0dXJlU2VxXyA9IDA7XG4gIHRoaXMubmdlb0xvY2F0aW9uXy5kZWxldGVQYXJhbSgnZmVhdHVyZXMnKTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdBcHBEcmF3Q29udHJvbGxlcicsIERyYXdDb21wb25lbnRDb250cm9sbGVyKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuICBjb25zdCB2ZWN0b3JTb3VyY2UgPSBuZXcgb2xTb3VyY2VWZWN0b3IoKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnb2wvbGF5ZXIvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICovXG4gIHRoaXMudmVjdG9yTGF5ZXIgPSBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgc291cmNlOiB2ZWN0b3JTb3VyY2UsXG4gIH0pO1xuXG4gIC8vIFVzZSB2ZWN0b3JMYXllci5zZXRNYXAobWFwKSByYXRoZXIgdGhhbiBtYXAuYWRkTGF5ZXIodmVjdG9yTGF5ZXIpLiBUaGlzXG4gIC8vIG1ha2VzIHRoZSB2ZWN0b3IgbGF5ZXIgXCJ1bm1hbmFnZWRcIiwgbWVhbmluZyB0aGF0IGl0IGlzIGFsd2F5cyBvbiB0b3AuXG4gIHRoaXMudmVjdG9yTGF5ZXIuc2V0TWFwKHRoaXMubWFwKTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGV4aXN0cyAoZGV2ZWxvcG1lbnQgb25seSlcblx0aWYgKF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4vLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbi8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKCkgPT4gKFByb21pc2UucmVzb2x2ZSgpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicGVybWFsaW5rXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9jb21tb25fZGVwZW5kZW5jaWVzLmpzXCIpKSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbm1vZHVsZS5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcImNvbW1vbnNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9leGFtcGxlcy9wZXJtYWxpbmsuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=