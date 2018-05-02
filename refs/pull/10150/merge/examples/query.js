/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/query.js"
/*!***************************!*\
  !*** ./examples/query.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _query_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query.scss */ "./examples/query.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_datasource_DataSources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/datasource/DataSources */ "./src/datasource/DataSources.js");
/* harmony import */ var gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/datasource/OGC */ "./src/datasource/OGC.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/misc/ToolActivate */ "./src/misc/ToolActivate.js");
/* harmony import */ var ngeo_misc_ToolActivateMgr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr */ "./src/misc/ToolActivateMgr.js");
/* harmony import */ var ngeo_query_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/query/component */ "./src/query/component.js");
/* harmony import */ var ngeo_query_panelComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/query/panelComponent */ "./src/query/panelComponent.js");
/* harmony import */ var ngeo_query_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/module */ "./src/query/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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
  ngeo_datasource_DataSources__WEBPACK_IMPORTED_MODULE_4__["default"].name,
  gmf_map_component__WEBPACK_IMPORTED_MODULE_6__["default"].name,
  ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_8__["default"].name,
  ngeo_misc_ToolActivateMgr__WEBPACK_IMPORTED_MODULE_10__["default"].name,
  ngeo_query_component__WEBPACK_IMPORTED_MODULE_11__["default"].name,
  ngeo_query_panelComponent__WEBPACK_IMPORTED_MODULE_12__["default"].name,
  ngeo_query_module__WEBPACK_IMPORTED_MODULE_13__["default"].name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('partials/queryresult', __webpack_require__(/*! ./partials/queryresult.html */ "./examples/partials/queryresult.html"));
    },
  ],
);
myModule.value('ngeoQueryOptions', {
  'cursorHover': true,
  'limit': 20,
});

/**
 * A sample component to display the result.
 *
 * @type {angular.IComponentOptions}
 */
const queryresultComponent = {
  controller: 'AppQueryresultController',
  templateUrl: 'partials/queryresult',
};
myModule.component('appQueryresult', queryresultComponent);

QueryresultController.$inject = ['ngeoQueryResult'];

/**
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult The ngeo query service.
 * @class
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.result = ngeoQueryResult;
}
myModule.controller('AppQueryresultController', QueryresultController);

MainController.$inject = ['ngeoDataSources', 'ngeoToolActivateMgr', 'ngeoQueryModeSelector'];

/**
 * @param {import('ngeo/datasource/DataSources').DataSource} ngeoDataSources Ngeo data sources service.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @param {import('ngeo/query/ModeSelector').QueryModeSelector} ngeoQueryModeSelector The ngeo QueryModeSelector service
 * @class
 */
function MainController(ngeoDataSources, ngeoToolActivateMgr, ngeoQueryModeSelector) {
  /**
   * @type {boolean}
   */
  this.dummyActive = false;

  /**
   * @type {boolean}
   */
  this.queryActive = true;

  /**
   * @type {boolean}
   */
  this.queryAutoClear = true;

  /**
   * @type {import('ngeo/query/ModeSelector').QueryModeSelector}
   */
  this.ngeoQueryModeSelector = ngeoQueryModeSelector;
  const source1 = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_18__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
    params: {
      'LAYERS': 'bus_stop',
    },
  });
  const busStopLayer = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_16__["default"]({
    source: source1,
  });
  const source2 = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_18__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
    params: {
      'LAYERS': 'information',
    },
  });
  const informationLayer = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_16__["default"]({
    source: source2,
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_14__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_17__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_19__["default"](),
      }),
      informationLayer,
      busStopLayer,
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_15__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_3__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2536660, 1153009],
      zoom: 4,
    }),
  });
  ngeoDataSources.map = this.map;
  ngeoDataSources.collection.push(
    new gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_5__["default"]({
      id: 1,
      name: 'bus_stop',
      visible: true,
      wmsUrl: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
      wfsUrl: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
      wfsFeatureNS: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_WFS_FEATURE_NS,
      wfsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
    }),
  );
  ngeoDataSources.collection.push(
    new gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_5__["default"]({
      id: 2,
      name: 'information',
      visible: true,
      wmsUrl: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
      wmsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
      wfsFeatureNS: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_WFS_FEATURE_NS,
      wfsUrl: _url__WEBPACK_IMPORTED_MODULE_2__.MAPSERVER_PROXY,
      wfsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
    }),
  );
  const queryToolActivate = new ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_9__["default"](this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate);
  const dummyToolActivate = new ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_9__["default"](this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

/**
 * @param {boolean|undefined} val Value.
 * @returns {boolean|undefined} Value.
 */
MainController.prototype.getSetQueryActive = function (val) {
  if (val !== undefined) {
    this.queryActive = val;
  } else {
    return this.queryActive;
  }
};
myModule.controller('MainController', MainController);
myModule.constant('ngeoMeasurePrecision', 0);
myModule.constant('ngeoMeasureDecimals', 0);
myModule.constant('ngeoMeasureSpherical', false);
myModule.constant('ngeoPointfilter', null);
(0,_options__WEBPACK_IMPORTED_MODULE_7__["default"])(myModule);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ },

/***/ "./examples/partials/queryresult.html"
/*!********************************************!*\
  !*** ./examples/partials/queryresult.html ***!
  \********************************************/
(module) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h3>Total: {{ $ctrl.result.total }}</h3>\n\n<ul class="nav nav-tabs" role="tablist">\n  <li ng-repeat="source in $ctrl.result.sources" role="presentation">\n    <a\n      href="#{{ ::source.label }}"\n      aria-controls="{{ ::source.label }}"\n      ng-attr-aria-selected="{{ $first }}"\n      class="nav-link"\n      id="{{ ::source.label }}-tab"\n      ng-class="::{active: $first}"\n      role="tab"\n      data-toggle="tab"\n    >\n      <span>{{ ::source.label }}</span>\n      <span ng-switch="source.pending">\n        <span ng-switch-when="true">(...)</span>\n        <span ng-switch-default="">({{ ::source.features.length }})</span>\n      </span>\n    </a>\n  </li>\n</ul>\n\n<div class="tab-content">\n  <div\n    ng-repeat="source in $ctrl.result.sources"\n    aria-labelledby="{{ ::source.label }}-tab"\n    role="tabpanel"\n    class="tab-pane fade"\n    ng-class="::{active: $first, show: $first}"\n    id="{{ ::source.label }}"\n  >\n    <div ng-switch="source.features.length">\n      <div ng-switch-when="0">\n        <span ng-switch="source.pending">\n          <h3 ng-switch-when="true">Pending...</h3>\n          <h3 ng-switch-default="">No result</h3>\n        </span>\n      </div>\n      <div ng-switch-default="">\n        <div ng-repeat="feature in ::source.features">\n          <h3>{{ ::feature.get(\'display_name\') }}</h3>\n          <div\n            ng-repeat="(key, value) in ::feature.getProperties()"\n            ng-init="value = value !== undefined ? value : \'\'"\n          >\n            <span ng-if="::(key !== feature.getGeometryName() && key !== \'ngeo_feature_type_\')">\n              <span ng-bind="::key"></span>:\n              <span ng-bind="::value"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

}
return __p
}

/***/ },

/***/ "./examples/query.scss"
/*!*****************************!*\
  !*** ./examples/query.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/******/ 			"query": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/query.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL3F1ZXJ5LmpzIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sIiwid2VicGFjazovL25nZW8vLi9leGFtcGxlcy9xdWVyeS5zY3NzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9zZXQgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0IG5hbWUiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjQgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0ICcuL3F1ZXJ5LnNjc3MnO1xuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7TUFQU0VSVkVSX1BST1hZLCBNQVBTRVJWRVJfV0ZTX0ZFQVRVUkVfTlN9IGZyb20gJy4vdXJsJztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICduZ2VvL3Byb2ovRVBTR18yMDU2JztcbmltcG9ydCBuZ2VvRGF0YXNvdXJjZURhdGFTb3VyY2VzIGZyb20gJ25nZW8vZGF0YXNvdXJjZS9EYXRhU291cmNlcyc7XG5pbXBvcnQgZ21mRGF0YXNvdXJjZU9HQyBmcm9tICdnbWYvZGF0YXNvdXJjZS9PR0MnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuaW1wb3J0IG5nZW9NaXNjVG9vbEFjdGl2YXRlIGZyb20gJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGUnO1xuaW1wb3J0IG5nZW9NaXNjVG9vbEFjdGl2YXRlTWdyIGZyb20gJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGVNZ3InO1xuaW1wb3J0IG5nZW9RdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb1F1ZXJ5UGFuZWxDb21wb25lbnQgZnJvbSAnbmdlby9xdWVyeS9wYW5lbENvbXBvbmVudCc7XG5pbXBvcnQgbmdlb1F1ZXJ5TW9kdWxlIGZyb20gJ25nZW8vcXVlcnkvbW9kdWxlJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgbmdlb0RhdGFzb3VyY2VEYXRhU291cmNlcy5uYW1lLFxuICBnbWZNYXBDb21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NUb29sQWN0aXZhdGVNZ3IubmFtZSxcbiAgbmdlb1F1ZXJ5Q29tcG9uZW50Lm5hbWUsXG4gIG5nZW9RdWVyeVBhbmVsQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9RdWVyeU1vZHVsZS5uYW1lLFxuXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3BhcnRpYWxzL3F1ZXJ5cmVzdWx0JywgcmVxdWlyZSgnLi9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sJykpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoJ25nZW9RdWVyeU9wdGlvbnMnLCB7XG4gICdjdXJzb3JIb3Zlcic6IHRydWUsXG4gICdsaW1pdCc6IDIwLFxufSk7XG5cbi8qKlxuICogQSBzYW1wbGUgY29tcG9uZW50IHRvIGRpc3BsYXkgdGhlIHJlc3VsdC5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqL1xuY29uc3QgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdBcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3F1ZXJ5cmVzdWx0Jyxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2FwcFF1ZXJ5cmVzdWx0JywgcXVlcnlyZXN1bHRDb21wb25lbnQpO1xuXG5RdWVyeXJlc3VsdENvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdlb1F1ZXJ5UmVzdWx0J107XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fSBuZ2VvUXVlcnlSZXN1bHQgVGhlIG5nZW8gcXVlcnkgc2VydmljZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBRdWVyeXJlc3VsdENvbnRyb2xsZXIobmdlb1F1ZXJ5UmVzdWx0KSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH1cbiAgICovXG4gIHRoaXMucmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xufVxubXlNb2R1bGUuY29udHJvbGxlcignQXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJywgUXVlcnlyZXN1bHRDb250cm9sbGVyKTtcblxuTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnbmdlb0RhdGFTb3VyY2VzJywgJ25nZW9Ub29sQWN0aXZhdGVNZ3InLCAnbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yJ107XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vZGF0YXNvdXJjZS9EYXRhU291cmNlcycpLkRhdGFTb3VyY2V9IG5nZW9EYXRhU291cmNlcyBOZ2VvIGRhdGEgc291cmNlcyBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGVNZ3InKS5Ub29sQWN0aXZhdGVNZ3J9IG5nZW9Ub29sQWN0aXZhdGVNZ3IgVGhlIG5nZW8gVG9vbEFjdGl2YXRlXG4gKiAgICAgbWFuYWdlci5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01vZGVTZWxlY3RvcicpLlF1ZXJ5TW9kZVNlbGVjdG9yfSBuZ2VvUXVlcnlNb2RlU2VsZWN0b3IgVGhlIG5nZW8gUXVlcnlNb2RlU2VsZWN0b3Igc2VydmljZVxuICogQGNsYXNzXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKG5nZW9EYXRhU291cmNlcywgbmdlb1Rvb2xBY3RpdmF0ZU1nciwgbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuZHVtbXlBY3RpdmUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QWN0aXZlID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QXV0b0NsZWFyID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9xdWVyeS9Nb2RlU2VsZWN0b3InKS5RdWVyeU1vZGVTZWxlY3Rvcn1cbiAgICovXG4gIHRoaXMubmdlb1F1ZXJ5TW9kZVNlbGVjdG9yID0gbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yO1xuICBjb25zdCBzb3VyY2UxID0gbmV3IG9sU291cmNlSW1hZ2VXTVMoe1xuICAgIHVybDogTUFQU0VSVkVSX1BST1hZLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdidXNfc3RvcCcsXG4gICAgfSxcbiAgfSk7XG4gIGNvbnN0IGJ1c1N0b3BMYXllciA9IG5ldyBvbExheWVySW1hZ2Uoe1xuICAgIHNvdXJjZTogc291cmNlMSxcbiAgfSk7XG4gIGNvbnN0IHNvdXJjZTIgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcGFyYW1zOiB7XG4gICAgICAnTEFZRVJTJzogJ2luZm9ybWF0aW9uJyxcbiAgICB9LFxuICB9KTtcbiAgY29uc3QgaW5mb3JtYXRpb25MYXllciA9IG5ldyBvbExheWVySW1hZ2Uoe1xuICAgIHNvdXJjZTogc291cmNlMixcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgICBpbmZvcm1hdGlvbkxheWVyLFxuICAgICAgYnVzU3RvcExheWVyLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogWzI1MzY2NjAsIDExNTMwMDldLFxuICAgICAgem9vbTogNCxcbiAgICB9KSxcbiAgfSk7XG4gIG5nZW9EYXRhU291cmNlcy5tYXAgPSB0aGlzLm1hcDtcbiAgbmdlb0RhdGFTb3VyY2VzLmNvbGxlY3Rpb24ucHVzaChcbiAgICBuZXcgZ21mRGF0YXNvdXJjZU9HQyh7XG4gICAgICBpZDogMSxcbiAgICAgIG5hbWU6ICdidXNfc3RvcCcsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgd21zVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3bXNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdidXNfc3RvcCcsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHdmc1VybDogTUFQU0VSVkVSX1BST1hZLFxuICAgICAgd2ZzRmVhdHVyZU5TOiBNQVBTRVJWRVJfV0ZTX0ZFQVRVUkVfTlMsXG4gICAgICB3ZnNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdidXNfc3RvcCcsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgKTtcbiAgbmdlb0RhdGFTb3VyY2VzLmNvbGxlY3Rpb24ucHVzaChcbiAgICBuZXcgZ21mRGF0YXNvdXJjZU9HQyh7XG4gICAgICBpZDogMixcbiAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgd21zVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3bXNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHdmc0ZlYXR1cmVOUzogTUFQU0VSVkVSX1dGU19GRUFUVVJFX05TLFxuICAgICAgd2ZzVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3ZnNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgKTtcbiAgY29uc3QgcXVlcnlUb29sQWN0aXZhdGUgPSBuZXcgbmdlb01pc2NUb29sQWN0aXZhdGUodGhpcywgJ3F1ZXJ5QWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIHF1ZXJ5VG9vbEFjdGl2YXRlKTtcbiAgY29uc3QgZHVtbXlUb29sQWN0aXZhdGUgPSBuZXcgbmdlb01pc2NUb29sQWN0aXZhdGUodGhpcywgJ2R1bW15QWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIGR1bW15VG9vbEFjdGl2YXRlLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSB2YWwgVmFsdWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbnx1bmRlZmluZWR9IFZhbHVlLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2V0UXVlcnlBY3RpdmUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMucXVlcnlBY3RpdmUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlBY3RpdmU7XG4gIH1cbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTWVhc3VyZVByZWNpc2lvbicsIDApO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9NZWFzdXJlRGVjaW1hbHMnLCAwKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTWVhc3VyZVNwaGVyaWNhbCcsIGZhbHNlKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvUG9pbnRmaWx0ZXInLCBudWxsKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8aDM+VG90YWw6IHt7ICRjdHJsLnJlc3VsdC50b3RhbCB9fTwvaDM+XFxuXFxuPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzXCIgcm9sZT1cInRhYmxpc3RcIj5cXG4gIDxsaSBuZy1yZXBlYXQ9XCJzb3VyY2UgaW4gJGN0cmwucmVzdWx0LnNvdXJjZXNcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XFxuICAgIDxhXFxuICAgICAgaHJlZj1cIiN7eyA6OnNvdXJjZS5sYWJlbCB9fVwiXFxuICAgICAgYXJpYS1jb250cm9scz1cInt7IDo6c291cmNlLmxhYmVsIH19XCJcXG4gICAgICBuZy1hdHRyLWFyaWEtc2VsZWN0ZWQ9XCJ7eyAkZmlyc3QgfX1cIlxcbiAgICAgIGNsYXNzPVwibmF2LWxpbmtcIlxcbiAgICAgIGlkPVwie3sgOjpzb3VyY2UubGFiZWwgfX0tdGFiXCJcXG4gICAgICBuZy1jbGFzcz1cIjo6e2FjdGl2ZTogJGZpcnN0fVwiXFxuICAgICAgcm9sZT1cInRhYlwiXFxuICAgICAgZGF0YS10b2dnbGU9XCJ0YWJcIlxcbiAgICA+XFxuICAgICAgPHNwYW4+e3sgOjpzb3VyY2UubGFiZWwgfX08L3NwYW4+XFxuICAgICAgPHNwYW4gbmctc3dpdGNoPVwic291cmNlLnBlbmRpbmdcIj5cXG4gICAgICAgIDxzcGFuIG5nLXN3aXRjaC13aGVuPVwidHJ1ZVwiPiguLi4pPC9zcGFuPlxcbiAgICAgICAgPHNwYW4gbmctc3dpdGNoLWRlZmF1bHQ9XCJcIj4oe3sgOjpzb3VyY2UuZmVhdHVyZXMubGVuZ3RoIH19KTwvc3Bhbj5cXG4gICAgICA8L3NwYW4+XFxuICAgIDwvYT5cXG4gIDwvbGk+XFxuPC91bD5cXG5cXG48ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cXG4gIDxkaXZcXG4gICAgbmctcmVwZWF0PVwic291cmNlIGluICRjdHJsLnJlc3VsdC5zb3VyY2VzXCJcXG4gICAgYXJpYS1sYWJlbGxlZGJ5PVwie3sgOjpzb3VyY2UubGFiZWwgfX0tdGFiXCJcXG4gICAgcm9sZT1cInRhYnBhbmVsXCJcXG4gICAgY2xhc3M9XCJ0YWItcGFuZSBmYWRlXCJcXG4gICAgbmctY2xhc3M9XCI6OnthY3RpdmU6ICRmaXJzdCwgc2hvdzogJGZpcnN0fVwiXFxuICAgIGlkPVwie3sgOjpzb3VyY2UubGFiZWwgfX1cIlxcbiAgPlxcbiAgICA8ZGl2IG5nLXN3aXRjaD1cInNvdXJjZS5mZWF0dXJlcy5sZW5ndGhcIj5cXG4gICAgICA8ZGl2IG5nLXN3aXRjaC13aGVuPVwiMFwiPlxcbiAgICAgICAgPHNwYW4gbmctc3dpdGNoPVwic291cmNlLnBlbmRpbmdcIj5cXG4gICAgICAgICAgPGgzIG5nLXN3aXRjaC13aGVuPVwidHJ1ZVwiPlBlbmRpbmcuLi48L2gzPlxcbiAgICAgICAgICA8aDMgbmctc3dpdGNoLWRlZmF1bHQ9XCJcIj5ObyByZXN1bHQ8L2gzPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgbmctc3dpdGNoLWRlZmF1bHQ9XCJcIj5cXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVwiZmVhdHVyZSBpbiA6OnNvdXJjZS5mZWF0dXJlc1wiPlxcbiAgICAgICAgICA8aDM+e3sgOjpmZWF0dXJlLmdldChcXCdkaXNwbGF5X25hbWVcXCcpIH19PC9oMz5cXG4gICAgICAgICAgPGRpdlxcbiAgICAgICAgICAgIG5nLXJlcGVhdD1cIihrZXksIHZhbHVlKSBpbiA6OmZlYXR1cmUuZ2V0UHJvcGVydGllcygpXCJcXG4gICAgICAgICAgICBuZy1pbml0PVwidmFsdWUgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBcXCdcXCdcIlxcbiAgICAgICAgICA+XFxuICAgICAgICAgICAgPHNwYW4gbmctaWY9XCI6OihrZXkgIT09IGZlYXR1cmUuZ2V0R2VvbWV0cnlOYW1lKCkgJiYga2V5ICE9PSBcXCduZ2VvX2ZlYXR1cmVfdHlwZV9cXCcpXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBuZy1iaW5kPVwiOjprZXlcIj48L3NwYW4+OlxcbiAgICAgICAgICAgICAgPHNwYW4gbmctYmluZD1cIjo6dmFsdWVcIj48L3NwYW4+XFxuICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIHNldCAubmFtZSBmb3IgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cyBwZXIgRVMgc3BlY1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kbiA9ICh4KSA9PiB7XG5cdChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIFwibmFtZVwiKSB8fCB7fSkud3JpdGFibGUgfHwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHgsIFwibmFtZVwiLCB7IHZhbHVlOiBcImRlZmF1bHRcIiwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJxdWVyeVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdID0gc2VsZltcIndlYnBhY2tDaHVua25nZW9cIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvY29tbW9uX2RlcGVuZGVuY2llcy5qc1wiKSkpXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW5tb2R1bGUuanNcIikpKVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25zXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZXhhbXBsZXMvcXVlcnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==