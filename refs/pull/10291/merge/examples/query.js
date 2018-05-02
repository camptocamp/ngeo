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
/******/ 		"query": 0
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
/******/ 	deferredModules.push([8,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/partials/queryresult.html":
/*!********************************************!*\
  !*** ./examples/partials/queryresult.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h3>Total: {{ $ctrl.result.total }}</h3>\n\n<ul class="nav nav-tabs" role="tablist">\n  <li ng-repeat="source in $ctrl.result.sources" role="presentation">\n    <a\n      href="#{{ ::source.label }}"\n      aria-controls="{{ ::source.label }}"\n      ng-attr-aria-selected="{{ $first }}"\n      class="nav-link"\n      id="{{ ::source.label }}-tab"\n      ng-class="::{active: $first}"\n      role="tab"\n      data-toggle="tab"\n    >\n      <span>{{ ::source.label }}</span>\n      <span ng-switch="source.pending">\n        <span ng-switch-when="true">(...)</span>\n        <span ng-switch-default="">({{ ::source.features.length }})</span>\n      </span>\n    </a>\n  </li>\n</ul>\n\n<div class="tab-content">\n  <div\n    ng-repeat="source in $ctrl.result.sources"\n    aria-labelledby="{{ ::source.label }}-tab"\n    role="tabpanel"\n    class="tab-pane fade"\n    ng-class="::{active: $first, show: $first}"\n    id="{{ ::source.label }}"\n  >\n    <div ng-switch="source.features.length">\n      <div ng-switch-when="0">\n        <span ng-switch="source.pending">\n          <h3 ng-switch-when="true">Pending...</h3>\n          <h3 ng-switch-default="">No result</h3>\n        </span>\n      </div>\n      <div ng-switch-default="">\n        <div ng-repeat="feature in ::source.features">\n          <h3>{{ ::feature.get(\'display_name\') }}</h3>\n          <div\n            ng-repeat="(key, value) in ::feature.getProperties()"\n            ng-init="value = value !== undefined ? value : \'\'"\n          >\n            <span ng-if="::(key !== feature.getGeometryName() && key !== \'ngeo_feature_type_\')">\n              <span ng-bind="::key"></span>:\n              <span ng-bind="::value"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./examples/query.css":
/*!****************************!*\
  !*** ./examples/query.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/query.js":
/*!***************************!*\
  !*** ./examples/query.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url */ "./examples/url.js");
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.css */ "./examples/base.css");
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_base_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _query_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query.css */ "./examples/query.css");
/* harmony import */ var _query_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_query_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_datasource_DataSources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/datasource/DataSources */ "./src/datasource/DataSources.js");
/* harmony import */ var gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/datasource/OGC */ "./src/datasource/OGC.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./options */ "./examples/options.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/misc/ToolActivate */ "./src/misc/ToolActivate.js");
/* harmony import */ var ngeo_misc_ToolActivateMgr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr */ "./src/misc/ToolActivateMgr.js");
/* harmony import */ var ngeo_query_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/query/component */ "./src/query/component.js");
/* harmony import */ var ngeo_query_panelComponent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/panelComponent */ "./src/query/panelComponent.js");
/* harmony import */ var ngeo_query_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/query/module */ "./src/query/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Image__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer/Image */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2026 Camptocamp SA
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
  ngeo_datasource_DataSources__WEBPACK_IMPORTED_MODULE_5__["default"].name,
  gmf_map_component__WEBPACK_IMPORTED_MODULE_7__["default"].name,
  ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_9__["default"].name,
  ngeo_misc_ToolActivateMgr__WEBPACK_IMPORTED_MODULE_11__["default"].name,
  ngeo_query_component__WEBPACK_IMPORTED_MODULE_12__["default"].name,
  ngeo_query_panelComponent__WEBPACK_IMPORTED_MODULE_13__["default"].name,
  ngeo_query_module__WEBPACK_IMPORTED_MODULE_14__["default"].name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('partials/queryresult', __webpack_require__(/*! ./partials/queryresult.html */ "./examples/partials/queryresult.html"));
  }
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

/**
 * @param {import('ngeo/query/MapQuerent').QueryResult} ngeoQueryResult The ngeo query service.
 * @class
 * @ngInject
 */
function QueryresultController(ngeoQueryResult) {
  /**
   * @type {import('ngeo/query/MapQuerent').QueryResult}
   */
  this.result = ngeoQueryResult;
}

myModule.controller('AppQueryresultController', QueryresultController);

/**
 * @param {import('ngeo/datasource/DataSources').DataSource} ngeoDataSources Ngeo data sources service.
 * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr The ngeo ToolActivate
 *     manager.
 * @param {import('ngeo/query/ModeSelector').QueryModeSelector} ngeoQueryModeSelector The ngeo QueryModeSelector service
 * @class
 * @ngInject
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

  const source1 = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_19__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    params: {'LAYERS': 'bus_stop'},
  });
  const busStopLayer = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_17__["default"]({
    source: source1,
  });

  const source2 = new ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_19__["default"]({
    url: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    params: {'LAYERS': 'information'},
  });
  const informationLayer = new ol_layer_Image__WEBPACK_IMPORTED_MODULE_17__["default"]({
    source: source2,
  });

  /**
   * @type {import('ol/Map').default}
   */
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_15__["default"]({
    layers: [
      new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_18__["default"]({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_20__["default"](),
      }),
      informationLayer,
      busStopLayer,
    ],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_16__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_4__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2536660, 1153009],
      zoom: 4,
    }),
  });

  ngeoDataSources.map = this.map;

  ngeoDataSources.collection.push(
    new gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_6__["default"]({
      id: 1,
      name: 'bus_stop',
      visible: true,
      wmsUrl: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
      wmsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
      wfsUrl: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
      wfsFeatureNS: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_WFS_FEATURE_NS"],
      wfsLayers: [
        {
          name: 'bus_stop',
          queryable: true,
        },
      ],
    })
  );

  ngeoDataSources.collection.push(
    new gmf_datasource_OGC__WEBPACK_IMPORTED_MODULE_6__["default"]({
      id: 2,
      name: 'information',
      visible: true,
      wmsUrl: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
      wmsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
      wfsFeatureNS: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_WFS_FEATURE_NS"],
      wfsUrl: _url__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
      wfsLayers: [
        {
          name: 'information',
          queryable: true,
        },
      ],
    })
  );

  const queryToolActivate = new ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_10__["default"](this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate);

  const dummyToolActivate = new ngeo_misc_ToolActivate__WEBPACK_IMPORTED_MODULE_10__["default"](this, 'dummyActive');
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
Object(_options__WEBPACK_IMPORTED_MODULE_8__["default"])(myModule);

/* harmony default export */ __webpack_exports__["default"] = (myModule);


/***/ }),

/***/ 8:
/*!**************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/query.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/query.js */"./examples/query.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9xdWVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicXVlcnlcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzgsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGgzPlRvdGFsOiB7eyAkY3RybC5yZXN1bHQudG90YWwgfX08L2gzPlxcblxcbjx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiIHJvbGU9XCJ0YWJsaXN0XCI+XFxuICA8bGkgbmctcmVwZWF0PVwic291cmNlIGluICRjdHJsLnJlc3VsdC5zb3VyY2VzXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxcbiAgICA8YVxcbiAgICAgIGhyZWY9XCIje3sgOjpzb3VyY2UubGFiZWwgfX1cIlxcbiAgICAgIGFyaWEtY29udHJvbHM9XCJ7eyA6OnNvdXJjZS5sYWJlbCB9fVwiXFxuICAgICAgbmctYXR0ci1hcmlhLXNlbGVjdGVkPVwie3sgJGZpcnN0IH19XCJcXG4gICAgICBjbGFzcz1cIm5hdi1saW5rXCJcXG4gICAgICBpZD1cInt7IDo6c291cmNlLmxhYmVsIH19LXRhYlwiXFxuICAgICAgbmctY2xhc3M9XCI6OnthY3RpdmU6ICRmaXJzdH1cIlxcbiAgICAgIHJvbGU9XCJ0YWJcIlxcbiAgICAgIGRhdGEtdG9nZ2xlPVwidGFiXCJcXG4gICAgPlxcbiAgICAgIDxzcGFuPnt7IDo6c291cmNlLmxhYmVsIH19PC9zcGFuPlxcbiAgICAgIDxzcGFuIG5nLXN3aXRjaD1cInNvdXJjZS5wZW5kaW5nXCI+XFxuICAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInRydWVcIj4oLi4uKTwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIG5nLXN3aXRjaC1kZWZhdWx0PVwiXCI+KHt7IDo6c291cmNlLmZlYXR1cmVzLmxlbmd0aCB9fSk8L3NwYW4+XFxuICAgICAgPC9zcGFuPlxcbiAgICA8L2E+XFxuICA8L2xpPlxcbjwvdWw+XFxuXFxuPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XFxuICA8ZGl2XFxuICAgIG5nLXJlcGVhdD1cInNvdXJjZSBpbiAkY3RybC5yZXN1bHQuc291cmNlc1wiXFxuICAgIGFyaWEtbGFiZWxsZWRieT1cInt7IDo6c291cmNlLmxhYmVsIH19LXRhYlwiXFxuICAgIHJvbGU9XCJ0YWJwYW5lbFwiXFxuICAgIGNsYXNzPVwidGFiLXBhbmUgZmFkZVwiXFxuICAgIG5nLWNsYXNzPVwiOjp7YWN0aXZlOiAkZmlyc3QsIHNob3c6ICRmaXJzdH1cIlxcbiAgICBpZD1cInt7IDo6c291cmNlLmxhYmVsIH19XCJcXG4gID5cXG4gICAgPGRpdiBuZy1zd2l0Y2g9XCJzb3VyY2UuZmVhdHVyZXMubGVuZ3RoXCI+XFxuICAgICAgPGRpdiBuZy1zd2l0Y2gtd2hlbj1cIjBcIj5cXG4gICAgICAgIDxzcGFuIG5nLXN3aXRjaD1cInNvdXJjZS5wZW5kaW5nXCI+XFxuICAgICAgICAgIDxoMyBuZy1zd2l0Y2gtd2hlbj1cInRydWVcIj5QZW5kaW5nLi4uPC9oMz5cXG4gICAgICAgICAgPGgzIG5nLXN3aXRjaC1kZWZhdWx0PVwiXCI+Tm8gcmVzdWx0PC9oMz5cXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IG5nLXN3aXRjaC1kZWZhdWx0PVwiXCI+XFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cImZlYXR1cmUgaW4gOjpzb3VyY2UuZmVhdHVyZXNcIj5cXG4gICAgICAgICAgPGgzPnt7IDo6ZmVhdHVyZS5nZXQoXFwnZGlzcGxheV9uYW1lXFwnKSB9fTwvaDM+XFxuICAgICAgICAgIDxkaXZcXG4gICAgICAgICAgICBuZy1yZXBlYXQ9XCIoa2V5LCB2YWx1ZSkgaW4gOjpmZWF0dXJlLmdldFByb3BlcnRpZXMoKVwiXFxuICAgICAgICAgICAgbmctaW5pdD1cInZhbHVlID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogXFwnXFwnXCJcXG4gICAgICAgICAgPlxcbiAgICAgICAgICAgIDxzcGFuIG5nLWlmPVwiOjooa2V5ICE9PSBmZWF0dXJlLmdldEdlb21ldHJ5TmFtZSgpICYmIGtleSAhPT0gXFwnbmdlb19mZWF0dXJlX3R5cGVfXFwnKVwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gbmctYmluZD1cIjo6a2V5XCI+PC9zcGFuPjpcXG4gICAgICAgICAgICAgIDxzcGFuIG5nLWJpbmQ9XCI6OnZhbHVlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQge01BUFNFUlZFUl9QUk9YWSwgTUFQU0VSVkVSX1dGU19GRUFUVVJFX05TfSBmcm9tICcuL3VybCc7XG5pbXBvcnQgJy4vYmFzZS5jc3MnO1xuaW1wb3J0ICcuL3F1ZXJ5LmNzcyc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnbmdlby9wcm9qL0VQU0dfMjA1Nic7XG5cbmltcG9ydCBuZ2VvRGF0YXNvdXJjZURhdGFTb3VyY2VzIGZyb20gJ25nZW8vZGF0YXNvdXJjZS9EYXRhU291cmNlcyc7XG5pbXBvcnQgZ21mRGF0YXNvdXJjZU9HQyBmcm9tICdnbWYvZGF0YXNvdXJjZS9PR0MnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudCc7XG5cbmltcG9ydCBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZSBmcm9tICduZ2VvL21pc2MvVG9vbEFjdGl2YXRlJztcbmltcG9ydCBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZU1nciBmcm9tICduZ2VvL21pc2MvVG9vbEFjdGl2YXRlTWdyJztcbmltcG9ydCBuZ2VvUXVlcnlDb21wb25lbnQgZnJvbSAnbmdlby9xdWVyeS9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9RdWVyeVBhbmVsQ29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvcGFuZWxDb21wb25lbnQnO1xuaW1wb3J0IG5nZW9RdWVyeU1vZHVsZSBmcm9tICduZ2VvL3F1ZXJ5L21vZHVsZSc7XG5cbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3JztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1dlYkdMVGlsZSc7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMnO1xuaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICdnZXR0ZXh0JyxcbiAgbmdlb0RhdGFzb3VyY2VEYXRhU291cmNlcy5uYW1lLFxuICBnbWZNYXBDb21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSxcbiAgbmdlb01pc2NUb29sQWN0aXZhdGVNZ3IubmFtZSxcbiAgbmdlb1F1ZXJ5Q29tcG9uZW50Lm5hbWUsXG4gIG5nZW9RdWVyeVBhbmVsQ29tcG9uZW50Lm5hbWUsXG4gIG5nZW9RdWVyeU1vZHVsZS5uYW1lLFxuXSk7XG5cbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBuZ0luamVjdFxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgLy8gQHRzLWlnbm9yZTogd2VicGFja1xuICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFydGlhbHMvcXVlcnlyZXN1bHQnLCByZXF1aXJlKCcuL3BhcnRpYWxzL3F1ZXJ5cmVzdWx0Lmh0bWwnKSk7XG4gIH1cbik7XG5cbm15TW9kdWxlLnZhbHVlKCduZ2VvUXVlcnlPcHRpb25zJywge1xuICAnY3Vyc29ySG92ZXInOiB0cnVlLFxuICAnbGltaXQnOiAyMCxcbn0pO1xuXG4vKipcbiAqIEEgc2FtcGxlIGNvbXBvbmVudCB0byBkaXNwbGF5IHRoZSByZXN1bHQuXG4gKlxuICogQHR5cGUge2FuZ3VsYXIuSUNvbXBvbmVudE9wdGlvbnN9XG4gKi9cbmNvbnN0IHF1ZXJ5cmVzdWx0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnQXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9xdWVyeXJlc3VsdCcsXG59O1xuXG5teU1vZHVsZS5jb21wb25lbnQoJ2FwcFF1ZXJ5cmVzdWx0JywgcXVlcnlyZXN1bHRDb21wb25lbnQpO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH0gbmdlb1F1ZXJ5UmVzdWx0IFRoZSBuZ2VvIHF1ZXJ5IHNlcnZpY2UuXG4gKiBAY2xhc3NcbiAqIEBuZ0luamVjdFxuICovXG5mdW5jdGlvbiBRdWVyeXJlc3VsdENvbnRyb2xsZXIobmdlb1F1ZXJ5UmVzdWx0KSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnKS5RdWVyeVJlc3VsdH1cbiAgICovXG4gIHRoaXMucmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xufVxuXG5teU1vZHVsZS5jb250cm9sbGVyKCdBcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLCBRdWVyeXJlc3VsdENvbnRyb2xsZXIpO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL2RhdGFzb3VyY2UvRGF0YVNvdXJjZXMnKS5EYXRhU291cmNlfSBuZ2VvRGF0YVNvdXJjZXMgTmdlbyBkYXRhIHNvdXJjZXMgc2VydmljZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL21pc2MvVG9vbEFjdGl2YXRlTWdyJykuVG9vbEFjdGl2YXRlTWdyfSBuZ2VvVG9vbEFjdGl2YXRlTWdyIFRoZSBuZ2VvIFRvb2xBY3RpdmF0ZVxuICogICAgIG1hbmFnZXIuXG4gKiBAcGFyYW0ge2ltcG9ydCgnbmdlby9xdWVyeS9Nb2RlU2VsZWN0b3InKS5RdWVyeU1vZGVTZWxlY3Rvcn0gbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yIFRoZSBuZ2VvIFF1ZXJ5TW9kZVNlbGVjdG9yIHNlcnZpY2VcbiAqIEBjbGFzc1xuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKG5nZW9EYXRhU291cmNlcywgbmdlb1Rvb2xBY3RpdmF0ZU1nciwgbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMuZHVtbXlBY3RpdmUgPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QWN0aXZlID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLnF1ZXJ5QXV0b0NsZWFyID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydCgnbmdlby9xdWVyeS9Nb2RlU2VsZWN0b3InKS5RdWVyeU1vZGVTZWxlY3Rvcn1cbiAgICovXG4gIHRoaXMubmdlb1F1ZXJ5TW9kZVNlbGVjdG9yID0gbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yO1xuXG4gIGNvbnN0IHNvdXJjZTEgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcGFyYW1zOiB7J0xBWUVSUyc6ICdidXNfc3RvcCd9LFxuICB9KTtcbiAgY29uc3QgYnVzU3RvcExheWVyID0gbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgc291cmNlOiBzb3VyY2UxLFxuICB9KTtcblxuICBjb25zdCBzb3VyY2UyID0gbmV3IG9sU291cmNlSW1hZ2VXTVMoe1xuICAgIHVybDogTUFQU0VSVkVSX1BST1hZLFxuICAgIHBhcmFtczogeydMQVlFUlMnOiAnaW5mb3JtYXRpb24nfSxcbiAgfSk7XG4gIGNvbnN0IGluZm9ybWF0aW9uTGF5ZXIgPSBuZXcgb2xMYXllckltYWdlKHtcbiAgICBzb3VyY2U6IHNvdXJjZTIsXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCdvbC9NYXAnKS5kZWZhdWx0fVxuICAgKi9cbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW1xuICAgICAgbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKSxcbiAgICAgIH0pLFxuICAgICAgaW5mb3JtYXRpb25MYXllcixcbiAgICAgIGJ1c1N0b3BMYXllcixcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM2NjYwLCAxMTUzMDA5XSxcbiAgICAgIHpvb206IDQsXG4gICAgfSksXG4gIH0pO1xuXG4gIG5nZW9EYXRhU291cmNlcy5tYXAgPSB0aGlzLm1hcDtcblxuICBuZ2VvRGF0YVNvdXJjZXMuY29sbGVjdGlvbi5wdXNoKFxuICAgIG5ldyBnbWZEYXRhc291cmNlT0dDKHtcbiAgICAgIGlkOiAxLFxuICAgICAgbmFtZTogJ2J1c19zdG9wJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICB3bXNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICAgIHdtc0xheWVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2J1c19zdG9wJyxcbiAgICAgICAgICBxdWVyeWFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgd2ZzVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3ZnNGZWF0dXJlTlM6IE1BUFNFUlZFUl9XRlNfRkVBVFVSRV9OUyxcbiAgICAgIHdmc0xheWVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2J1c19zdG9wJyxcbiAgICAgICAgICBxdWVyeWFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pXG4gICk7XG5cbiAgbmdlb0RhdGFTb3VyY2VzLmNvbGxlY3Rpb24ucHVzaChcbiAgICBuZXcgZ21mRGF0YXNvdXJjZU9HQyh7XG4gICAgICBpZDogMixcbiAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgd21zVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3bXNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHdmc0ZlYXR1cmVOUzogTUFQU0VSVkVSX1dGU19GRUFUVVJFX05TLFxuICAgICAgd2ZzVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgICB3ZnNMYXllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgcXVlcnlhYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KVxuICApO1xuXG4gIGNvbnN0IHF1ZXJ5VG9vbEFjdGl2YXRlID0gbmV3IG5nZW9NaXNjVG9vbEFjdGl2YXRlKHRoaXMsICdxdWVyeUFjdGl2ZScpO1xuICBuZ2VvVG9vbEFjdGl2YXRlTWdyLnJlZ2lzdGVyVG9vbCgnbWFwVG9vbHMnLCBxdWVyeVRvb2xBY3RpdmF0ZSk7XG5cbiAgY29uc3QgZHVtbXlUb29sQWN0aXZhdGUgPSBuZXcgbmdlb01pc2NUb29sQWN0aXZhdGUodGhpcywgJ2R1bW15QWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIGR1bW15VG9vbEFjdGl2YXRlLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSB2YWwgVmFsdWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbnx1bmRlZmluZWR9IFZhbHVlLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2V0UXVlcnlBY3RpdmUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMucXVlcnlBY3RpdmUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlBY3RpdmU7XG4gIH1cbn07XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9NZWFzdXJlUHJlY2lzaW9uJywgMCk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb01lYXN1cmVEZWNpbWFscycsIDApO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9NZWFzdXJlU3BoZXJpY2FsJywgZmFsc2UpO1xubXlNb2R1bGUuY29uc3RhbnQoJ25nZW9Qb2ludGZpbHRlcicsIG51bGwpO1xub3B0aW9ucyhteU1vZHVsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9