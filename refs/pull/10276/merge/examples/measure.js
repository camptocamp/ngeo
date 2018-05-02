/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/measure.js"
/*!*****************************!*\
  !*** ./examples/measure.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _measure_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./measure.scss */ "./examples/measure.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureArea */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MeasureAzimut__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/interaction/MeasureAzimut */ "./src/interaction/MeasureAzimut.js");
/* harmony import */ var ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MeasureLength */ "./src/interaction/MeasureLength.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Circle */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngeo/interaction/Measure */ "./src/interaction/Measure.js");
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', [
  'gettext',
  gmf_map_component__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_9__["default"].name,
  'ngSanitize',
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('partials/measuretools', __webpack_require__(/*! ./partials/measuretools.html */ "./examples/partials/measuretools.html"));
    },
  ],
);

/**
 * App-specific component wrapping the measure tools. The component's
 * controller has a property "map" including a reference to the OpenLayers
 * map.
 *
 * @type {angular.IComponentOptions}
 */
const measuretoolsComponent = {
  bindings: {
    'map': '=appMeasuretoolsMap',
    'lang': '=appMeasuretoolsLang',
  },
  controller: 'AppMeasuretoolsController',
  templateUrl: 'partials/measuretools',
};
myModule.component('appMeasuretools', measuretoolsComponent);

MeasuretoolsController.$inject = ['$scope', '$compile', '$sce', '$filter', 'gettextCatalog'];

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.IFilterService} $filter Angular filter service.
 * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
 * @class
 */
function MeasuretoolsController($scope, $compile, $sce, $filter, gettextCatalog) {
  /**
   * @type {?import('ol/Map').default}
   */
  this.map = null;

  /**
   * @type {string}
   */
  this.lang = '';

  /**
   * @type {Object<string, *>}
   */
  this.measureStartMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureLengthContinueMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureAreaContinueMsg = {};

  /**
   * @type {Object<string, *>}
   */
  this.measureAzimutContinueMsg = {};

  // Translations for the measure tools' tooltips.
  const measureStartMsgs = {
    'en': $sce.trustAsHtml('Click to start drawing.'),
    'fr': $sce.trustAsHtml('Cliquer pour commencer à dessiner.'),
  };
  const measureLengthContinueMsgs = {
    'en': $sce.trustAsHtml('Click to continue drawing<br>' + 'Double-click or click last point to finish.'),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur dernier point pour finir.',
    ),
  };
  const measureAreaContinueMsgs = {
    'en': $sce.trustAsHtml(
      'Click to continue drawing<br>' + 'Double-click or click starting point to finish.',
    ),
    'fr': $sce.trustAsHtml(
      'Cliquer pour continuer le dessin<br>' + 'Double-cliquer ou cliquer sur point de départ pour finir.',
    ),
  };
  const measureAzimutContinueMsgs = {
    'en': $sce.trustAsHtml('Click to finish.'),
    'fr': $sce.trustAsHtml('Cliquer pour finir.'),
  };

  // Create elements for the measure tools' tooltips.
  let measureStartMsg = angular__WEBPACK_IMPORTED_MODULE_1___default().element('<span ng-bind-html="ctrl.measureStartMsg"></span>');
  measureStartMsg = $compile(measureStartMsg)($scope);
  let measureLengthContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default().element(
    '<span ng-bind-html="ctrl.measureLengthContinueMsg"></span>',
  );
  measureLengthContinueMsg = $compile(measureLengthContinueMsg)($scope);
  let measureAreaContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default().element('<span ng-bind-html="ctrl.measureAreaContinueMsg"></span>');
  measureAreaContinueMsg = $compile(measureAreaContinueMsg)($scope);
  let measureAzimutContinueMsg = angular__WEBPACK_IMPORTED_MODULE_1___default().element(
    '<span ng-bind-html="ctrl.measureAzimutContinueMsg"></span>',
  );
  measureAzimutContinueMsg = $compile(measureAzimutContinueMsg)($scope);

  // Watch the "lang" property and update the toolip messages
  // based on the selected language.
  $scope.$watch(
    () => this.lang,
    (newVal) => {
      // @ts-ignore
      this.measureStartMsg = measureStartMsgs[newVal];
      // @ts-ignore
      this.measureLengthContinueMsg = measureLengthContinueMsgs[newVal];
      // @ts-ignore
      this.measureAreaContinueMsg = measureAreaContinueMsgs[newVal];
      // @ts-ignore
      this.measureAzimutContinueMsg = measureAzimutContinueMsgs[newVal];
    },
  );
  const style = new ol_style_Style__WEBPACK_IMPORTED_MODULE_15__["default"]({
    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_18__["default"]({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_17__["default"]({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2,
    }),
    image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_16__["default"]({
      radius: 5,
      stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_17__["default"]({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_18__["default"]({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  });

  /**
   * @type {import('ngeo/interaction/MeasureLength').default}
   */
  this.measureLength = new ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_4__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureLengthContinueMsg[0],
  });
  this.measureLength.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_8__.interactionDecoration)(this.measureLength);

  /**
   * @type {import('ngeo/interaction/MeasureArea').default}
   */
  this.measureArea = new ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_2__["default"]($filter('ngeoUnitPrefix'), gettextCatalog, {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAreaContinueMsg[0],
  });
  this.measureArea.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_8__.interactionDecoration)(this.measureArea);

  /**
   * @type {import('ngeo/interaction/MeasureAzimut').default}
   */
  this.measureAzimut = new ngeo_interaction_MeasureAzimut__WEBPACK_IMPORTED_MODULE_3__["default"]($filter('ngeoUnitPrefix'), $filter('ngeoNumber'), {
    sketchStyle: style,
    startMsg: measureStartMsg[0],
    continueMsg: measureAzimutContinueMsg[0],
  });
  this.measureAzimut.setActive(false);
  (0,ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_8__.interactionDecoration)(this.measureAzimut);

  // the following code shows how one can add additional information to the
  // tooltip. This can be useful to display the elevation offset from the
  // 2 points of an azimut measurement.
  this.measureAzimut.on(
    /** @type {import('ol/Observable').EventTypes} */ 'measureend',
    /** @type {function(?): ?} */
    /**
     * @param {import('ol/MapBrowserEvent').default<unknown>} evt
     */ (evt) => {
      const target = evt.target;
      if (target instanceof ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_20__["default"]) {
        const el = target.getTooltipElement();
        el.innerHTML += '<br>Additional info';
      }
    },
  );
}
myModule.controller('AppMeasuretoolsController', MeasuretoolsController);
MeasuretoolsController.prototype.$onInit = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measureLength);
  this.map.addInteraction(this.measureArea);
  this.map.addInteraction(this.measureAzimut);
};

/**
 * @class
 */
function MainController() {
  /**
   * @type {string}
   */
  this.lang = 'en';

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_10__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_13__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__["default"](),
      }),
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_11__["default"]({
      center: [692114.718759744, 5743119.914347709],
      zoom: 15,
    }),
  });
  this.map.addControl(
    new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__["default"]({
      // See: https://www.w3.org/TR/CSS21/syndata.html#length-units
      dpi: 96,
    }),
  );
}
myModule.controller('MainController', MainController);
(0,_options__WEBPACK_IMPORTED_MODULE_6__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/partials/measuretools.html"
/*!*********************************************!*\
  !*** ./examples/partials/measuretools.html ***!
  \*********************************************/
(module) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div ngeo-btn-group class="btn-group">\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureLength.active">Length</button>\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureArea.active">Area</button>\n  <button ngeo-btn class="btn btn-primary" ng-model="$ctrl.measureAzimut.active">Azimut</button>\n</div>\n';

}
return __p
}

/***/ },

/***/ "./examples/measure.scss"
/*!*******************************!*\
  !*** ./examples/measure.scss ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = () => (Promise.resolve());
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/set anonymous default export name */
/******/ 	// set .name for anonymous default exports per ES spec
/******/ 	// skipped when the property is non-configurable (pre-ES2015 engines),
/******/ 	// where Object.defineProperty would throw
/******/ 	__webpack_require__.dn = (x) => {
/******/ 		var descriptor = Object.getOwnPropertyDescriptor(x, "name");
/******/ 		if (!descriptor || (!descriptor.writable && descriptor.configurable)) Object.defineProperty(x, "name", { value: "default", configurable: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"measure": 0
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
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
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
/******/ 		const chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/measure.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOzs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUVoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly9uZ2VvLy4vZXhhbXBsZXMvcGFydGlhbHMvbWVhc3VyZXRvb2xzLmh0bWwiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL21lYXN1cmUuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvc2V0IGFub255bW91cyBkZWZhdWx0IGV4cG9ydCBuYW1lIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25nZW8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNS0yMDI0IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9tZWFzdXJlLnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVBcmVhJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXppbXV0IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUF6aW11dCc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aCBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGgnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuaW1wb3J0IHtpbnRlcmFjdGlvbkRlY29yYXRpb259IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZSc7XG5pbXBvcnQgbmdlb01pc2NGaWx0ZXJzIGZyb20gJ25nZW8vbWlzYy9maWx0ZXJzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbENvbnRyb2xTY2FsZUxpbmUgZnJvbSAnb2wvY29udHJvbC9TY2FsZUxpbmUnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcbmltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZSc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwnO1xuaW1wb3J0ICdhbmd1bGFyLXNhbml0aXplJztcbmltcG9ydCBNZWFzdXJlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZSc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBnbWZNYXBDb21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NGaWx0ZXJzLm5hbWUsXG4gICduZ1Nhbml0aXplJyxcbl0pO1xubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklUZW1wbGF0ZUNhY2hlU2VydmljZX0gJHRlbXBsYXRlQ2FjaGVcbiAgICovXG4gIFtcbiAgICAnJHRlbXBsYXRlQ2FjaGUnLFxuICAgICgkdGVtcGxhdGVDYWNoZSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9tZWFzdXJldG9vbHMnLCByZXF1aXJlKCcuL3BhcnRpYWxzL21lYXN1cmV0b29scy5odG1sJykpO1xuICAgIH0sXG4gIF0sXG4pO1xuXG4vKipcbiAqIEFwcC1zcGVjaWZpYyBjb21wb25lbnQgd3JhcHBpbmcgdGhlIG1lYXN1cmUgdG9vbHMuIFRoZSBjb21wb25lbnQnc1xuICogY29udHJvbGxlciBoYXMgYSBwcm9wZXJ0eSBcIm1hcFwiIGluY2x1ZGluZyBhIHJlZmVyZW5jZSB0byB0aGUgT3BlbkxheWVyc1xuICogbWFwLlxuICpcbiAqIEB0eXBlIHthbmd1bGFyLklDb21wb25lbnRPcHRpb25zfVxuICovXG5jb25zdCBtZWFzdXJldG9vbHNDb21wb25lbnQgPSB7XG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwTWVhc3VyZXRvb2xzTWFwJyxcbiAgICAnbGFuZyc6ICc9YXBwTWVhc3VyZXRvb2xzTGFuZycsXG4gIH0sXG4gIGNvbnRyb2xsZXI6ICdBcHBNZWFzdXJldG9vbHNDb250cm9sbGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9tZWFzdXJldG9vbHMnLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwTWVhc3VyZXRvb2xzJywgbWVhc3VyZXRvb2xzQ29tcG9uZW50KTtcblxuTWVhc3VyZXRvb2xzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbXBpbGUnLCAnJHNjZScsICckZmlsdGVyJywgJ2dldHRleHRDYXRhbG9nJ107XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIEFuZ3VsYXIgc2NvcGUuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlfSAkY29tcGlsZSBBbmd1bGFyIGNvbXBpbGUgc2VydmljZS5cbiAqIEBwYXJhbSB7YW5ndWxhci5JU0NFU2VydmljZX0gJHNjZSBBbmd1bGFyIHNjZSBzZXJ2aWNlLlxuICogQHBhcmFtIHthbmd1bGFyLklGaWx0ZXJTZXJ2aWNlfSAkZmlsdGVyIEFuZ3VsYXIgZmlsdGVyIHNlcnZpY2UuXG4gKiBAcGFyYW0ge2FuZ3VsYXIuZ2V0dGV4dC5nZXR0ZXh0Q2F0YWxvZ30gZ2V0dGV4dENhdGFsb2cgR2V0dGV4dCBjYXRhbG9nLlxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1lYXN1cmV0b29sc0NvbnRyb2xsZXIoJHNjb3BlLCAkY29tcGlsZSwgJHNjZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5sYW5nID0gJyc7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn1cbiAgICovXG4gIHRoaXMubWVhc3VyZVN0YXJ0TXNnID0ge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn1cbiAgICovXG4gIHRoaXMubWVhc3VyZUxlbmd0aENvbnRpbnVlTXNnID0ge307XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn1cbiAgICovXG4gIHRoaXMubWVhc3VyZUFyZWFDb250aW51ZU1zZyA9IHt9O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgKj59XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBemltdXRDb250aW51ZU1zZyA9IHt9O1xuXG4gIC8vIFRyYW5zbGF0aW9ucyBmb3IgdGhlIG1lYXN1cmUgdG9vbHMnIHRvb2x0aXBzLlxuICBjb25zdCBtZWFzdXJlU3RhcnRNc2dzID0ge1xuICAgICdlbic6ICRzY2UudHJ1c3RBc0h0bWwoJ0NsaWNrIHRvIHN0YXJ0IGRyYXdpbmcuJyksXG4gICAgJ2ZyJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpcXVlciBwb3VyIGNvbW1lbmNlciDDoCBkZXNzaW5lci4nKSxcbiAgfTtcbiAgY29uc3QgbWVhc3VyZUxlbmd0aENvbnRpbnVlTXNncyA9IHtcbiAgICAnZW4nOiAkc2NlLnRydXN0QXNIdG1sKCdDbGljayB0byBjb250aW51ZSBkcmF3aW5nPGJyPicgKyAnRG91YmxlLWNsaWNrIG9yIGNsaWNrIGxhc3QgcG9pbnQgdG8gZmluaXNoLicpLFxuICAgICdmcic6ICRzY2UudHJ1c3RBc0h0bWwoXG4gICAgICAnQ2xpcXVlciBwb3VyIGNvbnRpbnVlciBsZSBkZXNzaW48YnI+JyArICdEb3VibGUtY2xpcXVlciBvdSBjbGlxdWVyIHN1ciBkZXJuaWVyIHBvaW50IHBvdXIgZmluaXIuJyxcbiAgICApLFxuICB9O1xuICBjb25zdCBtZWFzdXJlQXJlYUNvbnRpbnVlTXNncyA9IHtcbiAgICAnZW4nOiAkc2NlLnRydXN0QXNIdG1sKFxuICAgICAgJ0NsaWNrIHRvIGNvbnRpbnVlIGRyYXdpbmc8YnI+JyArICdEb3VibGUtY2xpY2sgb3IgY2xpY2sgc3RhcnRpbmcgcG9pbnQgdG8gZmluaXNoLicsXG4gICAgKSxcbiAgICAnZnInOiAkc2NlLnRydXN0QXNIdG1sKFxuICAgICAgJ0NsaXF1ZXIgcG91ciBjb250aW51ZXIgbGUgZGVzc2luPGJyPicgKyAnRG91YmxlLWNsaXF1ZXIgb3UgY2xpcXVlciBzdXIgcG9pbnQgZGUgZMOpcGFydCBwb3VyIGZpbmlyLicsXG4gICAgKSxcbiAgfTtcbiAgY29uc3QgbWVhc3VyZUF6aW11dENvbnRpbnVlTXNncyA9IHtcbiAgICAnZW4nOiAkc2NlLnRydXN0QXNIdG1sKCdDbGljayB0byBmaW5pc2guJyksXG4gICAgJ2ZyJzogJHNjZS50cnVzdEFzSHRtbCgnQ2xpcXVlciBwb3VyIGZpbmlyLicpLFxuICB9O1xuXG4gIC8vIENyZWF0ZSBlbGVtZW50cyBmb3IgdGhlIG1lYXN1cmUgdG9vbHMnIHRvb2x0aXBzLlxuICBsZXQgbWVhc3VyZVN0YXJ0TXNnID0gYW5ndWxhci5lbGVtZW50KCc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVTdGFydE1zZ1wiPjwvc3Bhbj4nKTtcbiAgbWVhc3VyZVN0YXJ0TXNnID0gJGNvbXBpbGUobWVhc3VyZVN0YXJ0TXNnKSgkc2NvcGUpO1xuICBsZXQgbWVhc3VyZUxlbmd0aENvbnRpbnVlTXNnID0gYW5ndWxhci5lbGVtZW50KFxuICAgICc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVMZW5ndGhDb250aW51ZU1zZ1wiPjwvc3Bhbj4nLFxuICApO1xuICBtZWFzdXJlTGVuZ3RoQ29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlTGVuZ3RoQ29udGludWVNc2cpKCRzY29wZSk7XG4gIGxldCBtZWFzdXJlQXJlYUNvbnRpbnVlTXNnID0gYW5ndWxhci5lbGVtZW50KCc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVBcmVhQ29udGludWVNc2dcIj48L3NwYW4+Jyk7XG4gIG1lYXN1cmVBcmVhQ29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlQXJlYUNvbnRpbnVlTXNnKSgkc2NvcGUpO1xuICBsZXQgbWVhc3VyZUF6aW11dENvbnRpbnVlTXNnID0gYW5ndWxhci5lbGVtZW50KFxuICAgICc8c3BhbiBuZy1iaW5kLWh0bWw9XCJjdHJsLm1lYXN1cmVBemltdXRDb250aW51ZU1zZ1wiPjwvc3Bhbj4nLFxuICApO1xuICBtZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSAkY29tcGlsZShtZWFzdXJlQXppbXV0Q29udGludWVNc2cpKCRzY29wZSk7XG5cbiAgLy8gV2F0Y2ggdGhlIFwibGFuZ1wiIHByb3BlcnR5IGFuZCB1cGRhdGUgdGhlIHRvb2xpcCBtZXNzYWdlc1xuICAvLyBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2UuXG4gICRzY29wZS4kd2F0Y2goXG4gICAgKCkgPT4gdGhpcy5sYW5nLFxuICAgIChuZXdWYWwpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMubWVhc3VyZVN0YXJ0TXNnID0gbWVhc3VyZVN0YXJ0TXNnc1tuZXdWYWxdO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5tZWFzdXJlTGVuZ3RoQ29udGludWVNc2cgPSBtZWFzdXJlTGVuZ3RoQ29udGludWVNc2dzW25ld1ZhbF07XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLm1lYXN1cmVBcmVhQ29udGludWVNc2cgPSBtZWFzdXJlQXJlYUNvbnRpbnVlTXNnc1tuZXdWYWxdO1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5tZWFzdXJlQXppbXV0Q29udGludWVNc2cgPSBtZWFzdXJlQXppbXV0Q29udGludWVNc2dzW25ld1ZhbF07XG4gICAgfSxcbiAgKTtcbiAgY29uc3Qgc3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICAgIH0pLFxuICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgbGluZURhc2g6IFsxMCwgMTBdLFxuICAgICAgd2lkdGg6IDIsXG4gICAgfSksXG4gICAgaW1hZ2U6IG5ldyBvbFN0eWxlQ2lyY2xlKHtcbiAgICAgIHJhZGl1czogNSxcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43KScsXG4gICAgICB9KSxcbiAgICAgIGZpbGw6IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICAgIGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyxcbiAgICAgIH0pLFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoJykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWVhc3VyZUxlbmd0aCA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlTGVuZ3RoKCRmaWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIGdldHRleHRDYXRhbG9nLCB7XG4gICAgc2tldGNoU3R5bGU6IHN0eWxlLFxuICAgIHN0YXJ0TXNnOiBtZWFzdXJlU3RhcnRNc2dbMF0sXG4gICAgY29udGludWVNc2c6IG1lYXN1cmVMZW5ndGhDb250aW51ZU1zZ1swXSxcbiAgfSk7XG4gIHRoaXMubWVhc3VyZUxlbmd0aC5zZXRBY3RpdmUoZmFsc2UpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlTGVuZ3RoKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXJlYScpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1lYXN1cmVBcmVhID0gbmV3IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhKCRmaWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIGdldHRleHRDYXRhbG9nLCB7XG4gICAgc2tldGNoU3R5bGU6IHN0eWxlLFxuICAgIHN0YXJ0TXNnOiBtZWFzdXJlU3RhcnRNc2dbMF0sXG4gICAgY29udGludWVNc2c6IG1lYXN1cmVBcmVhQ29udGludWVNc2dbMF0sXG4gIH0pO1xuICB0aGlzLm1lYXN1cmVBcmVhLnNldEFjdGl2ZShmYWxzZSk7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLm1lYXN1cmVBcmVhKTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlQXppbXV0JykuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWVhc3VyZUF6aW11dCA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXppbXV0KCRmaWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksICRmaWx0ZXIoJ25nZW9OdW1iZXInKSwge1xuICAgIHNrZXRjaFN0eWxlOiBzdHlsZSxcbiAgICBzdGFydE1zZzogbWVhc3VyZVN0YXJ0TXNnWzBdLFxuICAgIGNvbnRpbnVlTXNnOiBtZWFzdXJlQXppbXV0Q29udGludWVNc2dbMF0sXG4gIH0pO1xuICB0aGlzLm1lYXN1cmVBemltdXQuc2V0QWN0aXZlKGZhbHNlKTtcbiAgaW50ZXJhY3Rpb25EZWNvcmF0aW9uKHRoaXMubWVhc3VyZUF6aW11dCk7XG5cbiAgLy8gdGhlIGZvbGxvd2luZyBjb2RlIHNob3dzIGhvdyBvbmUgY2FuIGFkZCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHRvIHRoZVxuICAvLyB0b29sdGlwLiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gZGlzcGxheSB0aGUgZWxldmF0aW9uIG9mZnNldCBmcm9tIHRoZVxuICAvLyAyIHBvaW50cyBvZiBhbiBhemltdXQgbWVhc3VyZW1lbnQuXG4gIHRoaXMubWVhc3VyZUF6aW11dC5vbihcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICdtZWFzdXJlZW5kJyxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqL1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQnKS5kZWZhdWx0PHVua25vd24+fSBldnRcbiAgICAgKi8gKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBNZWFzdXJlKSB7XG4gICAgICAgIGNvbnN0IGVsID0gdGFyZ2V0LmdldFRvb2x0aXBFbGVtZW50KCk7XG4gICAgICAgIGVsLmlubmVySFRNTCArPSAnPGJyPkFkZGl0aW9uYWwgaW5mbyc7XG4gICAgICB9XG4gICAgfSxcbiAgKTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcE1lYXN1cmV0b29sc0NvbnRyb2xsZXInLCBNZWFzdXJldG9vbHNDb250cm9sbGVyKTtcbk1lYXN1cmV0b29sc0NvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlTGVuZ3RoKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlQXJlYSk7XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZUF6aW11dCk7XG59O1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLmxhbmcgPSAnZW4nO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBjZW50ZXI6IFs2OTIxMTQuNzE4NzU5NzQ0LCA1NzQzMTE5LjkxNDM0NzcwOV0sXG4gICAgICB6b29tOiAxNSxcbiAgICB9KSxcbiAgfSk7XG4gIHRoaXMubWFwLmFkZENvbnRyb2woXG4gICAgbmV3IG9sQ29udHJvbFNjYWxlTGluZSh7XG4gICAgICAvLyBTZWU6IGh0dHBzOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjbGVuZ3RoLXVuaXRzXG4gICAgICBkcGk6IDk2LFxuICAgIH0pLFxuICApO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5vcHRpb25zKG15TW9kdWxlKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdiBuZ2VvLWJ0bi1ncm91cCBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgPGJ1dHRvbiBuZ2VvLWJ0biBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIG5nLW1vZGVsPVwiJGN0cmwubWVhc3VyZUxlbmd0aC5hY3RpdmVcIj5MZW5ndGg8L2J1dHRvbj5cXG4gIDxidXR0b24gbmdlby1idG4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBuZy1tb2RlbD1cIiRjdHJsLm1lYXN1cmVBcmVhLmFjdGl2ZVwiPkFyZWE8L2J1dHRvbj5cXG4gIDxidXR0b24gbmdlby1idG4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBuZy1tb2RlbD1cIiRjdHJsLm1lYXN1cmVBemltdXQuYWN0aXZlXCI+QXppbXV0PC9idXR0b24+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiY29uc3QgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbikgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdGRlZmVycmVkLnB1c2goW2NodW5rSWRzLCBmbl0pO1xuXHRcdHJldHVybjtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IFtjaHVua0lkcywgZm5dID0gZGVmZXJyZWRbaV07XG5cdFx0bGV0IGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uTy5qKGNodW5rSWRzW2pdKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHRjb25zdCByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdGNvbnN0IGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbi8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuLy8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoKSA9PiAoUHJvbWlzZS5yZXNvbHZlKCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIHNldCAubmFtZSBmb3IgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cyBwZXIgRVMgc3BlY1xuLy8gc2tpcHBlZCB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBub24tY29uZmlndXJhYmxlIChwcmUtRVMyMDE1IGVuZ2luZXMpLFxuLy8gd2hlcmUgT2JqZWN0LmRlZmluZVByb3BlcnR5IHdvdWxkIHRocm93XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmRuID0gKHgpID0+IHtcblx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIFwibmFtZVwiKTtcblx0aWYgKCFkZXNjcmlwdG9yIHx8ICghZGVzY3JpcHRvci53cml0YWJsZSAmJiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh4LCBcIm5hbWVcIiwgeyB2YWx1ZTogXCJkZWZhdWx0XCIsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbmNvbnN0IGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtZWFzdXJlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbmNvbnN0IHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdGxldCBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbmNvbnN0IGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxubGV0IF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvbWVhc3VyZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9