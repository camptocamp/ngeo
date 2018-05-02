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
/******/ 		"permalink": 0
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
/******/ 	deferredModules.push([32,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/permalink.css":
/*!********************************!*\
  !*** ./examples/permalink.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/permalink.js":
/*!*******************************!*\
  !*** ./examples/permalink.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_format_FeatureHash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/format/FeatureHash */ "./src/format/FeatureHash.js");
/* harmony import */ var _permalink_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./permalink.css */ "./examples/permalink.css");
/* harmony import */ var _permalink_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_permalink_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_statemanager_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/statemanager/module */ "./src/statemanager/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Stroke */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
// The MIT License (MIT)
//
// Copyright (c) 2014-2022 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [
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

/**
 * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation ngeo Location service.
 * @param {import('ngeo/misc/debounce').miscDebounce<function(import('ol/events/Event').default): void>} ngeoDebounce
 *    ngeo Debounce factory.
 * @class
 * @ngInject
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
    /** @type {import('ol/Observable').EventTypes} */ ('propertychange'),
    /** @type {function(?): ?} */ (
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
        /* invokeApply */ true
      )
    )
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

/**
 * @param {angular.IScope} $scope Scope.
 * @param {import('ngeo/statemanager/Location').StatemanagerLocation} ngeoLocation ngeo Location service.
 * @class
 * @ngInject
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
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_6__["interactionDecoration"])(this.interaction);

  this.interaction.on(
    /** @type {import('ol/Observable').EventTypes} */ ('drawend'),
    /** @type {function(?): ?} */ (
      /**
       * @param {import('ol/MapBrowserEvent').default<unknown>} e
       */ (e) => {
        // @ts-ignore
        e.feature.set('id', ++this.featureSeq_);
      }
    )
  );

  // Deal with the encoding and decoding of features in the URL.

  const fhFormat = new ngeo_format_FeatureHash__WEBPACK_IMPORTED_MODULE_1__["default"]();

  vectorSource.on(
    /** @type {import('ol/Observable').EventTypes} */ ('addfeature'),
    /** @type {function(?): ?} */ (
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
          })
        );
        const features = vectorSource.getFeatures();
        const encodedFeatures = fhFormat.writeFeatures(features);
        if (typeof encodedFeatures == 'string') {
          this.scope_.$applyAsync(() => {
            this.ngeoLocation_.updateParams({'features': encodedFeatures});
          });
        } else {
          console.error(`Unsupported type: ${typeof encodedFeatures}`);
        }
      }
    )
  );

  const encodedFeatures = this.ngeoLocation_.getParam('features');
  if (encodedFeatures !== undefined) {
    const features = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>[]} */ (
      fhFormat.readFeatures(encodedFeatures)
    );
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
      new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10__["default"]({
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
Object(_options__WEBPACK_IMPORTED_MODULE_4__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ 32:
/*!******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/permalink.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/permalink.js */"./examples/permalink.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3Blcm1hbGluay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicGVybWFsaW5rXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFszMixcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAyMiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvRm9ybWF0RmVhdHVyZUhhc2ggZnJvbSAnbmdlby9mb3JtYXQvRmVhdHVyZUhhc2gnO1xuaW1wb3J0ICcuL3Blcm1hbGluay5jc3MnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlJztcbmltcG9ydCB7aW50ZXJhY3Rpb25EZWNvcmF0aW9ufSBmcm9tICduZ2VvL21pc2MvZGVjb3JhdGUnO1xuaW1wb3J0IG5nZW9TdGF0ZW1hbmFnZXJNb2R1bGUgZnJvbSAnbmdlby9zdGF0ZW1hbmFnZXIvbW9kdWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25EcmF3IGZyb20gJ29sL2ludGVyYWN0aW9uL0RyYXcnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUnO1xuaW1wb3J0IG9sTGF5ZXJWZWN0b3IgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZSc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAnZ2V0dGV4dCcsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBuZ2VvTWlzY0RlYm91bmNlLm5hbWUsXG4gIG5nZW9TdGF0ZW1hbmFnZXJNb2R1bGUubmFtZSxcbl0pO1xuXG4vKipcbiAqIEFuIGFwcGxpY2F0aW9uLXNwZWNpZmljIG1hcCBjb21wb25lbnQgdGhhdCB1cGRhdGVzIHRoZSBVUkwgaW4gdGhlIGJyb3dzZXJcbiAqIGFkZHJlc3MgYmFyIHdoZW4gdGhlIG1hcCB2aWV3IGNoYW5nZXMuIEl0IGFsc28gc2V0cyB0aGUgaW5pdGlhbCB2aWV3IGJhc2VkXG4gKiBvbiB0aGUgVVJMIHF1ZXJ5IHBhcmFtcyBhdCBpbml0IHRpbWUuXG4gKlxuICogVGhpcyBjb21wb25lbnQgZ2V0cyBhIHJlZmVyZW5jZSB0byB0aGUgbWFwIGluc3RhbmNlIHRocm91Z2ggdGhlIFwiYXBwLW1hcFwiXG4gKiBhdHRyaWJ1dGUuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IG1hcENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0FwcE1hcENvbnRyb2xsZXIgYXMgY3RybCcsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwTWFwJyxcbiAgfSxcbiAgdGVtcGxhdGU6ICc8Z21mLW1hcCBnbWYtbWFwLW1hcD1jdHJsLm1hcD48L2dtZi1tYXA+Jyxcbn07XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwTWFwJywgbWFwQ29tcG9uZW50KTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9zdGF0ZW1hbmFnZXIvTG9jYXRpb24nKS5TdGF0ZW1hbmFnZXJMb2NhdGlvbn0gbmdlb0xvY2F0aW9uIG5nZW8gTG9jYXRpb24gc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvZGVib3VuY2UnKS5taXNjRGVib3VuY2U8ZnVuY3Rpb24oaW1wb3J0KCdvbC9ldmVudHMvRXZlbnQnKS5kZWZhdWx0KTogdm9pZD59IG5nZW9EZWJvdW5jZVxuICogICAgbmdlbyBEZWJvdW5jZSBmYWN0b3J5LlxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFwQ29tcG9uZW50Q29udHJvbGxlcihuZ2VvTG9jYXRpb24sIG5nZW9EZWJvdW5jZSkge1xuICAvKipcbiAgICogQHR5cGUgez9pbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vc3RhdGVtYW5hZ2VyL0xvY2F0aW9uJykuU3RhdGVtYW5hZ2VyTG9jYXRpb259XG4gICAqL1xuICB0aGlzLm5nZW9Mb2NhdGlvbl8gPSBuZ2VvTG9jYXRpb247XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vbWlzYy9kZWJvdW5jZScpLm1pc2NEZWJvdW5jZTxmdW5jdGlvbihpbXBvcnQoJ29sL2V2ZW50cy9FdmVudCcpLmRlZmF1bHQpOiB2b2lkPn1cbiAgICovXG4gIHRoaXMubmdlb0RlYm91bmNlXyA9IG5nZW9EZWJvdW5jZTtcbn1cblxubXlNb2R1bGUuY29udHJvbGxlcignQXBwTWFwQ29udHJvbGxlcicsIE1hcENvbXBvbmVudENvbnRyb2xsZXIpO1xuXG5NYXBDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIGNvbnN0IHZpZXcgPSB0aGlzLm1hcC5nZXRWaWV3KCk7XG5cbiAgY29uc3Qgem9vbV8gPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3onKTtcbiAgY29uc3Qgem9vbSA9IHpvb21fICE9PSB1bmRlZmluZWQgPyArem9vbV8gOiA0O1xuXG4gIGNvbnN0IHggPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3gnKTtcbiAgY29uc3QgeSA9IHRoaXMubmdlb0xvY2F0aW9uXy5nZXRQYXJhbSgneScpO1xuICBjb25zdCBjZW50ZXIgPSB4ICE9PSB1bmRlZmluZWQgJiYgeSAhPT0gdW5kZWZpbmVkID8gWyt4LCAreV0gOiBbMCwgMF07XG5cbiAgdmlldy5zZXRDZW50ZXIoY2VudGVyKTtcbiAgdmlldy5zZXRab29tKHpvb20pO1xuXG4gIHRoaXMubmdlb0xvY2F0aW9uXy51cGRhdGVQYXJhbXMoe1xuICAgICd6JzogYCR7em9vbX1gLFxuICAgICd4JzogYCR7TWF0aC5yb3VuZChjZW50ZXJbMF0pfWAsXG4gICAgJ3knOiBgJHtNYXRoLnJvdW5kKGNlbnRlclsxXSl9YCxcbiAgfSk7XG5cbiAgdmlldy5vbihcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICgncHJvcGVydHljaGFuZ2UnKSxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqLyAoXG4gICAgICB0aGlzLm5nZW9EZWJvdW5jZV8oXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2ltcG9ydCgnb2wvZXZlbnRzL0V2ZW50JykuZGVmYXVsdH0gZSBPYmplY3QgZXZlbnQuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2VudGVyID0gdmlldy5nZXRDZW50ZXIoKTtcbiAgICAgICAgICBpZiAoIWNlbnRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAneic6IGAke3ZpZXcuZ2V0Wm9vbSgpfWAsXG4gICAgICAgICAgICAneCc6IGAke01hdGgucm91bmQoY2VudGVyWzBdKX1gLFxuICAgICAgICAgICAgJ3knOiBgJHtNYXRoLnJvdW5kKGNlbnRlclsxXSl9YCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMubmdlb0xvY2F0aW9uXy51cGRhdGVQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgfSxcbiAgICAgICAgMzAwLFxuICAgICAgICAvKiBpbnZva2VBcHBseSAqLyB0cnVlXG4gICAgICApXG4gICAgKVxuICApO1xufTtcblxuLyoqXG4gKiBBIGRyYXcgY29tcG9uZW50IHRoYXQgYWRkcyBhIHNpbXBsZSBkcmF3IHRvb2wuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IGRyYXdDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdBcHBEcmF3Q29udHJvbGxlciBhcyBjdHJsJyxcbiAgYmluZGluZ3M6IHtcbiAgICAnbWFwJzogJz1hcHBEcmF3TWFwJyxcbiAgICAnbGF5ZXInOiAnPWFwcERyYXdMYXllcicsXG4gIH0sXG4gIHRlbXBsYXRlOlxuICAgICc8bGFiZWw+RW5hYmxlIGRyYXdpbmc6JyArXG4gICAgJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZy1tb2RlbD1cImN0cmwuaW50ZXJhY3Rpb24uYWN0aXZlXCIgLz4nICtcbiAgICAnPC9sYWJlbD48YnI+JyArXG4gICAgJzxidXR0b24gbmctY2xpY2s9XCJjdHJsLmNsZWFyTGF5ZXIoKVwiPkNsZWFyIGxheWVyPC9idXR0b24+Jyxcbn07XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwRHJhdycsIGRyYXdDb21wb25lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbicpLlN0YXRlbWFuYWdlckxvY2F0aW9ufSBuZ2VvTG9jYXRpb24gbmdlbyBMb2NhdGlvbiBzZXJ2aWNlLlxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gRHJhd0NvbXBvbmVudENvbnRyb2xsZXIoJHNjb3BlLCBuZ2VvTG9jYXRpb24pIHtcbiAgLyoqXG4gICAqIEB0eXBlIHs/aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvbGF5ZXIvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL3NvdXJjZS9WZWN0b3InKS5kZWZhdWx0PGltcG9ydCgnb2wvZ2VvbS9HZW9tZXRyeScpLmRlZmF1bHQ+Pn1cbiAgICovXG4gIHRoaXMubGF5ZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3N0YXRlbWFuYWdlci9Mb2NhdGlvbicpLlN0YXRlbWFuYWdlckxvY2F0aW9ufVxuICAgKi9cbiAgdGhpcy5uZ2VvTG9jYXRpb25fID0gbmdlb0xvY2F0aW9uO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAvKipcbiAgICogQHR5cGUge251bWJlcn1cbiAgICovXG4gIHRoaXMuZmVhdHVyZVNlcV8gPSAwO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7P2ltcG9ydCgnb2wvaW50ZXJhY3Rpb24vRHJhdycpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLmludGVyYWN0aW9uID0gbnVsbDtcbn1cblxuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgaWYgKCF0aGlzLmxheWVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGxheWVyJyk7XG4gIH1cbiAgLyoqXG4gICAqIEB0eXBlIHtvbFNvdXJjZVZlY3RvcjxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pn1cbiAgICovXG4gIGNvbnN0IHZlY3RvclNvdXJjZSA9IHRoaXMubGF5ZXIuZ2V0U291cmNlKCk7XG5cbiAgdGhpcy5pbnRlcmFjdGlvbiA9IG5ldyBvbEludGVyYWN0aW9uRHJhdyh7XG4gICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgIHNvdXJjZTogdmVjdG9yU291cmNlLFxuICB9KTtcblxuICB0aGlzLmludGVyYWN0aW9uLnNldEFjdGl2ZShmYWxzZSk7XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMuaW50ZXJhY3Rpb24pO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5pbnRlcmFjdGlvbik7XG5cbiAgdGhpcy5pbnRlcmFjdGlvbi5vbihcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnb2wvT2JzZXJ2YWJsZScpLkV2ZW50VHlwZXN9ICovICgnZHJhd2VuZCcpLFxuICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oPyk6ID99ICovIChcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtpbXBvcnQoJ29sL01hcEJyb3dzZXJFdmVudCcpLmRlZmF1bHQ8dW5rbm93bj59IGVcbiAgICAgICAqLyAoZSkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGUuZmVhdHVyZS5zZXQoJ2lkJywgKyt0aGlzLmZlYXR1cmVTZXFfKTtcbiAgICAgIH1cbiAgICApXG4gICk7XG5cbiAgLy8gRGVhbCB3aXRoIHRoZSBlbmNvZGluZyBhbmQgZGVjb2Rpbmcgb2YgZmVhdHVyZXMgaW4gdGhlIFVSTC5cblxuICBjb25zdCBmaEZvcm1hdCA9IG5ldyBuZ2VvRm9ybWF0RmVhdHVyZUhhc2goKTtcblxuICB2ZWN0b3JTb3VyY2Uub24oXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ29sL09ic2VydmFibGUnKS5FdmVudFR5cGVzfSAqLyAoJ2FkZGZlYXR1cmUnKSxcbiAgICAvKiogQHR5cGUge2Z1bmN0aW9uKD8pOiA/fSAqLyAoXG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW1wb3J0KCdvbC9NYXBCcm93c2VyRXZlbnQnKS5kZWZhdWx0PHVua25vd24+fSBlXG4gICAgICAgKi8gKGUpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBmZWF0dXJlID0gZS5mZWF0dXJlO1xuICAgICAgICBmZWF0dXJlLnNldFN0eWxlKFxuICAgICAgICAgIG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgICAgICAgc3Ryb2tlOiBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICAgICAgICAgIGNvbG9yOiBbMjU1LCAwLCAwLCAxXSxcbiAgICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmZWF0dXJlcyA9IHZlY3RvclNvdXJjZS5nZXRGZWF0dXJlcygpO1xuICAgICAgICBjb25zdCBlbmNvZGVkRmVhdHVyZXMgPSBmaEZvcm1hdC53cml0ZUZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkRmVhdHVyZXMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLnNjb3BlXy4kYXBwbHlBc3luYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nZW9Mb2NhdGlvbl8udXBkYXRlUGFyYW1zKHsnZmVhdHVyZXMnOiBlbmNvZGVkRmVhdHVyZXN9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbnN1cHBvcnRlZCB0eXBlOiAke3R5cGVvZiBlbmNvZGVkRmVhdHVyZXN9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICk7XG5cbiAgY29uc3QgZW5jb2RlZEZlYXR1cmVzID0gdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtKCdmZWF0dXJlcycpO1xuICBpZiAoZW5jb2RlZEZlYXR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBmZWF0dXJlcyA9IC8qKiBAdHlwZSB7aW1wb3J0KCdvbC9GZWF0dXJlJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0PltdfSAqLyAoXG4gICAgICBmaEZvcm1hdC5yZWFkRmVhdHVyZXMoZW5jb2RlZEZlYXR1cmVzKVxuICAgICk7XG4gICAgdGhpcy5mZWF0dXJlU2VxXyA9IGZlYXR1cmVzLmxlbmd0aDtcbiAgICB2ZWN0b3JTb3VyY2UuYWRkRmVhdHVyZXMoZmVhdHVyZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSB2ZWN0b3IgbGF5ZXIuXG4gKi9cbkRyYXdDb21wb25lbnRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhckxheWVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubGF5ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbGF5ZXInKTtcbiAgfVxuICBjb25zdCBzb3VyY2UgPSB0aGlzLmxheWVyLmdldFNvdXJjZSgpO1xuICBpZiAoIShzb3VyY2UgaW5zdGFuY2VvZiBvbFNvdXJjZVZlY3RvcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIHNvdXJjZScpO1xuICB9XG4gIHNvdXJjZS5jbGVhcih0cnVlKTtcbiAgdGhpcy5mZWF0dXJlU2VxXyA9IDA7XG4gIHRoaXMubmdlb0xvY2F0aW9uXy5kZWxldGVQYXJhbSgnZmVhdHVyZXMnKTtcbn07XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcERyYXdDb250cm9sbGVyJywgRHJhd0NvbXBvbmVudENvbnRyb2xsZXIpO1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG5cbiAgY29uc3QgdmVjdG9yU291cmNlID0gbmV3IG9sU291cmNlVmVjdG9yKCk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL2xheWVyL1ZlY3RvcicpLmRlZmF1bHQ8aW1wb3J0KCdvbC9zb3VyY2UvVmVjdG9yJykuZGVmYXVsdDxpbXBvcnQoJ29sL2dlb20vR2VvbWV0cnknKS5kZWZhdWx0Pj59XG4gICAqL1xuICB0aGlzLnZlY3RvckxheWVyID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgIHNvdXJjZTogdmVjdG9yU291cmNlLFxuICB9KTtcblxuICAvLyBVc2UgdmVjdG9yTGF5ZXIuc2V0TWFwKG1hcCkgcmF0aGVyIHRoYW4gbWFwLmFkZExheWVyKHZlY3RvckxheWVyKS4gVGhpc1xuICAvLyBtYWtlcyB0aGUgdmVjdG9yIGxheWVyIFwidW5tYW5hZ2VkXCIsIG1lYW5pbmcgdGhhdCBpdCBpcyBhbHdheXMgb24gdG9wLlxuICB0aGlzLnZlY3RvckxheWVyLnNldE1hcCh0aGlzLm1hcCk7XG59XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9