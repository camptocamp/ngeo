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
/******/ 	deferredModules.push([35,"commons"]);
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
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_ImageWMS__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/source/ImageWMS */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2022 Camptocamp SA
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
      new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_18__["default"]({
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

/***/ 35:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9xdWVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicXVlcnlcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzM1LFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxoMz5Ub3RhbDoge3sgJGN0cmwucmVzdWx0LnRvdGFsIH19PC9oMz5cXG5cXG48dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIiByb2xlPVwidGFibGlzdFwiPlxcbiAgPGxpIG5nLXJlcGVhdD1cInNvdXJjZSBpbiAkY3RybC5yZXN1bHQuc291cmNlc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cXG4gICAgPGFcXG4gICAgICBocmVmPVwiI3t7IDo6c291cmNlLmxhYmVsIH19XCJcXG4gICAgICBhcmlhLWNvbnRyb2xzPVwie3sgOjpzb3VyY2UubGFiZWwgfX1cIlxcbiAgICAgIG5nLWF0dHItYXJpYS1zZWxlY3RlZD1cInt7ICRmaXJzdCB9fVwiXFxuICAgICAgY2xhc3M9XCJuYXYtbGlua1wiXFxuICAgICAgaWQ9XCJ7eyA6OnNvdXJjZS5sYWJlbCB9fS10YWJcIlxcbiAgICAgIG5nLWNsYXNzPVwiOjp7YWN0aXZlOiAkZmlyc3R9XCJcXG4gICAgICByb2xlPVwidGFiXCJcXG4gICAgICBkYXRhLXRvZ2dsZT1cInRhYlwiXFxuICAgID5cXG4gICAgICA8c3Bhbj57eyA6OnNvdXJjZS5sYWJlbCB9fTwvc3Bhbj5cXG4gICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJzb3VyY2UucGVuZGluZ1wiPlxcbiAgICAgICAgPHNwYW4gbmctc3dpdGNoLXdoZW49XCJ0cnVlXCI+KC4uLik8L3NwYW4+XFxuICAgICAgICA8c3BhbiBuZy1zd2l0Y2gtZGVmYXVsdD1cIlwiPih7eyA6OnNvdXJjZS5mZWF0dXJlcy5sZW5ndGggfX0pPC9zcGFuPlxcbiAgICAgIDwvc3Bhbj5cXG4gICAgPC9hPlxcbiAgPC9saT5cXG48L3VsPlxcblxcbjxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxcbiAgPGRpdlxcbiAgICBuZy1yZXBlYXQ9XCJzb3VyY2UgaW4gJGN0cmwucmVzdWx0LnNvdXJjZXNcIlxcbiAgICBhcmlhLWxhYmVsbGVkYnk9XCJ7eyA6OnNvdXJjZS5sYWJlbCB9fS10YWJcIlxcbiAgICByb2xlPVwidGFicGFuZWxcIlxcbiAgICBjbGFzcz1cInRhYi1wYW5lIGZhZGVcIlxcbiAgICBuZy1jbGFzcz1cIjo6e2FjdGl2ZTogJGZpcnN0LCBzaG93OiAkZmlyc3R9XCJcXG4gICAgaWQ9XCJ7eyA6OnNvdXJjZS5sYWJlbCB9fVwiXFxuICA+XFxuICAgIDxkaXYgbmctc3dpdGNoPVwic291cmNlLmZlYXR1cmVzLmxlbmd0aFwiPlxcbiAgICAgIDxkaXYgbmctc3dpdGNoLXdoZW49XCIwXCI+XFxuICAgICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJzb3VyY2UucGVuZGluZ1wiPlxcbiAgICAgICAgICA8aDMgbmctc3dpdGNoLXdoZW49XCJ0cnVlXCI+UGVuZGluZy4uLjwvaDM+XFxuICAgICAgICAgIDxoMyBuZy1zd2l0Y2gtZGVmYXVsdD1cIlwiPk5vIHJlc3VsdDwvaDM+XFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBuZy1zd2l0Y2gtZGVmYXVsdD1cIlwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJmZWF0dXJlIGluIDo6c291cmNlLmZlYXR1cmVzXCI+XFxuICAgICAgICAgIDxoMz57eyA6OmZlYXR1cmUuZ2V0KFxcJ2Rpc3BsYXlfbmFtZVxcJykgfX08L2gzPlxcbiAgICAgICAgICA8ZGl2XFxuICAgICAgICAgICAgbmctcmVwZWF0PVwiKGtleSwgdmFsdWUpIGluIDo6ZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKClcIlxcbiAgICAgICAgICAgIG5nLWluaXQ9XCJ2YWx1ZSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IFxcJ1xcJ1wiXFxuICAgICAgICAgID5cXG4gICAgICAgICAgICA8c3BhbiBuZy1pZj1cIjo6KGtleSAhPT0gZmVhdHVyZS5nZXRHZW9tZXRyeU5hbWUoKSAmJiBrZXkgIT09IFxcJ25nZW9fZmVhdHVyZV90eXBlX1xcJylcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIG5nLWJpbmQ9XCI6OmtleVwiPjwvc3Bhbj46XFxuICAgICAgICAgICAgICA8c3BhbiBuZy1iaW5kPVwiOjp2YWx1ZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDIyIENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHtNQVBTRVJWRVJfUFJPWFksIE1BUFNFUlZFUl9XRlNfRkVBVFVSRV9OU30gZnJvbSAnLi91cmwnO1xuaW1wb3J0ICcuL2Jhc2UuY3NzJztcbmltcG9ydCAnLi9xdWVyeS5jc3MnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuXG5pbXBvcnQgbmdlb0RhdGFzb3VyY2VEYXRhU291cmNlcyBmcm9tICduZ2VvL2RhdGFzb3VyY2UvRGF0YVNvdXJjZXMnO1xuaW1wb3J0IGdtZkRhdGFzb3VyY2VPR0MgZnJvbSAnZ21mL2RhdGFzb3VyY2UvT0dDJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuXG5pbXBvcnQgbmdlb01pc2NUb29sQWN0aXZhdGUgZnJvbSAnbmdlby9taXNjL1Rvb2xBY3RpdmF0ZSc7XG5pbXBvcnQgbmdlb01pc2NUb29sQWN0aXZhdGVNZ3IgZnJvbSAnbmdlby9taXNjL1Rvb2xBY3RpdmF0ZU1ncic7XG5pbXBvcnQgbmdlb1F1ZXJ5Q29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvY29tcG9uZW50JztcbmltcG9ydCBuZ2VvUXVlcnlQYW5lbENvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L3BhbmVsQ29tcG9uZW50JztcbmltcG9ydCBuZ2VvUXVlcnlNb2R1bGUgZnJvbSAnbmdlby9xdWVyeS9tb2R1bGUnO1xuXG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcbmltcG9ydCBvbFNvdXJjZUltYWdlV01TIGZyb20gJ29sL3NvdXJjZS9JbWFnZVdNUyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTSc7XG5cbi8qKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfSAqKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBuZ2VvRGF0YXNvdXJjZURhdGFTb3VyY2VzLm5hbWUsXG4gIGdtZk1hcENvbXBvbmVudC5uYW1lLFxuICBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLFxuICBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZU1nci5uYW1lLFxuICBuZ2VvUXVlcnlDb21wb25lbnQubmFtZSxcbiAgbmdlb1F1ZXJ5UGFuZWxDb21wb25lbnQubmFtZSxcbiAgbmdlb1F1ZXJ5TW9kdWxlLm5hbWUsXG5dKTtcblxubXlNb2R1bGUucnVuKFxuICAvKipcbiAgICogQG5nSW5qZWN0XG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9xdWVyeXJlc3VsdCcsIHJlcXVpcmUoJy4vcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCcpKTtcbiAgfVxuKTtcblxubXlNb2R1bGUudmFsdWUoJ25nZW9RdWVyeU9wdGlvbnMnLCB7XG4gICdjdXJzb3JIb3Zlcic6IHRydWUsXG4gICdsaW1pdCc6IDIwLFxufSk7XG5cbi8qKlxuICogQSBzYW1wbGUgY29tcG9uZW50IHRvIGRpc3BsYXkgdGhlIHJlc3VsdC5cbiAqXG4gKiBAdHlwZSB7YW5ndWxhci5JQ29tcG9uZW50T3B0aW9uc31cbiAqL1xuY29uc3QgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdBcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3F1ZXJ5cmVzdWx0Jyxcbn07XG5cbm15TW9kdWxlLmNvbXBvbmVudCgnYXBwUXVlcnlyZXN1bHQnLCBxdWVyeXJlc3VsdENvbXBvbmVudCk7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fSBuZ2VvUXVlcnlSZXN1bHQgVGhlIG5nZW8gcXVlcnkgc2VydmljZS5cbiAqIEBjbGFzc1xuICogQG5nSW5qZWN0XG4gKi9cbmZ1bmN0aW9uIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcihuZ2VvUXVlcnlSZXN1bHQpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ25nZW8vcXVlcnkvTWFwUXVlcmVudCcpLlF1ZXJ5UmVzdWx0fVxuICAgKi9cbiAgdGhpcy5yZXN1bHQgPSBuZ2VvUXVlcnlSZXN1bHQ7XG59XG5cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0FwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vZGF0YXNvdXJjZS9EYXRhU291cmNlcycpLkRhdGFTb3VyY2V9IG5nZW9EYXRhU291cmNlcyBOZ2VvIGRhdGEgc291cmNlcyBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGVNZ3InKS5Ub29sQWN0aXZhdGVNZ3J9IG5nZW9Ub29sQWN0aXZhdGVNZ3IgVGhlIG5nZW8gVG9vbEFjdGl2YXRlXG4gKiAgICAgbWFuYWdlci5cbiAqIEBwYXJhbSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01vZGVTZWxlY3RvcicpLlF1ZXJ5TW9kZVNlbGVjdG9yfSBuZ2VvUXVlcnlNb2RlU2VsZWN0b3IgVGhlIG5nZW8gUXVlcnlNb2RlU2VsZWN0b3Igc2VydmljZVxuICogQGNsYXNzXG4gKiBAbmdJbmplY3RcbiAqL1xuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIobmdlb0RhdGFTb3VyY2VzLCBuZ2VvVG9vbEFjdGl2YXRlTWdyLCBuZ2VvUXVlcnlNb2RlU2VsZWN0b3IpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5kdW1teUFjdGl2ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucXVlcnlBY3RpdmUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMucXVlcnlBdXRvQ2xlYXIgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KCduZ2VvL3F1ZXJ5L01vZGVTZWxlY3RvcicpLlF1ZXJ5TW9kZVNlbGVjdG9yfVxuICAgKi9cbiAgdGhpcy5uZ2VvUXVlcnlNb2RlU2VsZWN0b3IgPSBuZ2VvUXVlcnlNb2RlU2VsZWN0b3I7XG5cbiAgY29uc3Qgc291cmNlMSA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBwYXJhbXM6IHsnTEFZRVJTJzogJ2J1c19zdG9wJ30sXG4gIH0pO1xuICBjb25zdCBidXNTdG9wTGF5ZXIgPSBuZXcgb2xMYXllckltYWdlKHtcbiAgICBzb3VyY2U6IHNvdXJjZTEsXG4gIH0pO1xuXG4gIGNvbnN0IHNvdXJjZTIgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcGFyYW1zOiB7J0xBWUVSUyc6ICdpbmZvcm1hdGlvbid9LFxuICB9KTtcbiAgY29uc3QgaW5mb3JtYXRpb25MYXllciA9IG5ldyBvbExheWVySW1hZ2Uoe1xuICAgIHNvdXJjZTogc291cmNlMixcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoJ29sL01hcCcpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllclRpbGUoe1xuICAgICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpLFxuICAgICAgfSksXG4gICAgICBpbmZvcm1hdGlvbkxheWVyLFxuICAgICAgYnVzU3RvcExheWVyLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogWzI1MzY2NjAsIDExNTMwMDldLFxuICAgICAgem9vbTogNCxcbiAgICB9KSxcbiAgfSk7XG5cbiAgbmdlb0RhdGFTb3VyY2VzLm1hcCA9IHRoaXMubWFwO1xuXG4gIG5nZW9EYXRhU291cmNlcy5jb2xsZWN0aW9uLnB1c2goXG4gICAgbmV3IGdtZkRhdGFzb3VyY2VPR0Moe1xuICAgICAgaWQ6IDEsXG4gICAgICBuYW1lOiAnYnVzX3N0b3AnLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIHdtc1VybDogTUFQU0VSVkVSX1BST1hZLFxuICAgICAgd21zTGF5ZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnYnVzX3N0b3AnLFxuICAgICAgICAgIHF1ZXJ5YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICB3ZnNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICAgIHdmc0ZlYXR1cmVOUzogTUFQU0VSVkVSX1dGU19GRUFUVVJFX05TLFxuICAgICAgd2ZzTGF5ZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnYnVzX3N0b3AnLFxuICAgICAgICAgIHF1ZXJ5YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgKTtcblxuICBuZ2VvRGF0YVNvdXJjZXMuY29sbGVjdGlvbi5wdXNoKFxuICAgIG5ldyBnbWZEYXRhc291cmNlT0dDKHtcbiAgICAgIGlkOiAyLFxuICAgICAgbmFtZTogJ2luZm9ybWF0aW9uJyxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICB3bXNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICAgIHdtc0xheWVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2luZm9ybWF0aW9uJyxcbiAgICAgICAgICBxdWVyeWFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgd2ZzRmVhdHVyZU5TOiBNQVBTRVJWRVJfV0ZTX0ZFQVRVUkVfTlMsXG4gICAgICB3ZnNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICAgIHdmc0xheWVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2luZm9ybWF0aW9uJyxcbiAgICAgICAgICBxdWVyeWFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgcXVlcnlUb29sQWN0aXZhdGUgPSBuZXcgbmdlb01pc2NUb29sQWN0aXZhdGUodGhpcywgJ3F1ZXJ5QWN0aXZlJyk7XG4gIG5nZW9Ub29sQWN0aXZhdGVNZ3IucmVnaXN0ZXJUb29sKCdtYXBUb29scycsIHF1ZXJ5VG9vbEFjdGl2YXRlKTtcblxuICBjb25zdCBkdW1teVRvb2xBY3RpdmF0ZSA9IG5ldyBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZSh0aGlzLCAnZHVtbXlBY3RpdmUnKTtcbiAgbmdlb1Rvb2xBY3RpdmF0ZU1nci5yZWdpc3RlclRvb2woJ21hcFRvb2xzJywgZHVtbXlUb29sQWN0aXZhdGUsIHRydWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IHZhbCBWYWx1ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufHVuZGVmaW5lZH0gVmFsdWUuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRTZXRRdWVyeUFjdGl2ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5xdWVyeUFjdGl2ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeUFjdGl2ZTtcbiAgfVxufTtcblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb01lYXN1cmVQcmVjaXNpb24nLCAwKTtcbm15TW9kdWxlLmNvbnN0YW50KCduZ2VvTWVhc3VyZURlY2ltYWxzJywgMCk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb01lYXN1cmVTcGhlcmljYWwnLCBmYWxzZSk7XG5teU1vZHVsZS5jb25zdGFudCgnbmdlb1BvaW50ZmlsdGVyJywgbnVsbCk7XG5vcHRpb25zKG15TW9kdWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=