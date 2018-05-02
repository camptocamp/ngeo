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
/******/ 	deferredModules.push([34,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/base.css":
/*!***************************!*\
  !*** ./examples/base.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

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
__p += '<h3>Total: {{ $ctrl.result.total }}</h3>\n\n<ul class="nav nav-tabs"\n    role="tablist">\n  <li ng-repeat="source in $ctrl.result.sources"\n      role="presentation">\n    <a href="#{{ ::source.label }}"\n       aria-controls="{{ ::source.label }}"\n       ng-attr-aria-selected="{{ $first }}"\n       class="nav-link"\n       id="{{ ::source.label }}-tab"\n       ng-class="::{active: $first}"\n       role="tab"\n       data-toggle="tab">\n      <span>{{ ::source.label }}</span>\n      <span ng-switch="source.pending">\n        <span ng-switch-when="true">(...)</span>\n        <span ng-switch-default="">({{ ::source.features.length }})</span>\n      </span>\n    </a>\n  </li>\n</ul>\n\n<div class="tab-content">\n  <div ng-repeat="source in $ctrl.result.sources"\n       aria-labelledby="{{ ::source.label }}-tab"\n       role="tabpanel"\n       class="tab-pane fade"\n       ng-class="::{active: $first, show: $first}"\n       id="{{ ::source.label }}">\n    <div ng-switch="source.features.length">\n      <div ng-switch-when="0">\n        <span ng-switch="source.pending">\n          <h3 ng-switch-when="true">Pending...</h3>\n          <h3 ng-switch-default="">No result</h3>\n        </span>\n      </div>\n      <div ng-switch-default="">\n        <div ng-repeat="feature in ::source.features">\n          <h3>{{ ::feature.get(\'display_name\') }}</h3>\n          <div ng-repeat="(key, value) in ::feature.getProperties()"\n               ng-init="value = value !== undefined ? value : \'\'">\n            <span ng-if="::(key !== feature.getGeometryName() && key !== \'ngeo_feature_type_\')">\n              <span ng-bind="::key"></span>:\n              <span ng-bind="::value"></span>\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

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
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./examples/url.js");
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.css */ "./examples/base.css");
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_base_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _query_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query.css */ "./examples/query.css");
/* harmony import */ var _query_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_query_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var ngeo_datasource_DataSources_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/datasource/DataSources.js */ "./src/datasource/DataSources.js");
/* harmony import */ var ngeo_datasource_OGC_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/datasource/OGC.js */ "./src/datasource/OGC.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/misc/ToolActivate.js */ "./src/misc/ToolActivate.js");
/* harmony import */ var ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr.js */ "./src/misc/ToolActivateMgr.js");
/* harmony import */ var ngeo_query_component_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/query/component.js */ "./src/query/component.js");
/* harmony import */ var ngeo_query_panelComponent_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/query/panelComponent.js */ "./src/query/panelComponent.js");
/* harmony import */ var ngeo_query_module_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/module.js */ "./src/query/module.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
MainController.$inject = ["ngeoDataSources", "ngeoToolActivateMgr", "ngeoQueryModeSelector"];
QueryresultController.$inject = ["ngeoQueryResult"];




















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', ['gettext', ngeo_datasource_DataSources_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_10__["default"].name, ngeo_query_component_js__WEBPACK_IMPORTED_MODULE_11__["default"].name, ngeo_query_panelComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"].name, ngeo_query_module_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('partials/queryresult', __webpack_require__(/*! ./partials/queryresult.html */ "./examples/partials/queryresult.html"));
}]);
module.value('ngeoQueryOptions', {
  'cursorHover': true,
  'limit': 20
});
var queryresultComponent = {
  controller: 'AppQueryresultController',
  templateUrl: 'partials/queryresult'
};
module.component('appQueryresult', queryresultComponent);

function QueryresultController(ngeoQueryResult) {
  this.result = ngeoQueryResult;
}

module.controller('AppQueryresultController', QueryresultController);

function MainController(ngeoDataSources, ngeoToolActivateMgr, ngeoQueryModeSelector) {
  this.dummyActive = false;
  this.queryActive = true;
  this.queryAutoClear = true;
  this.ngeoQueryModeSelector = ngeoQueryModeSelector;
  var source1 = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
    url: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    projection: undefined,
    params: {
      'LAYERS': 'bus_stop'
    }
  });
  var busStopLayer = new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
    source: source1
  });
  var source2 = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
    url: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    projection: undefined,
    params: {
      'LAYERS': 'information'
    }
  });
  var informationLayer = new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
    source: source2
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_17__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_19__["default"]()
    }), informationLayer, busStopLayer],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      projection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2536660, 1153009],
      zoom: 4
    })
  });
  ngeoDataSources.map = this.map;
  ngeoDataSources.collection.push(new ngeo_datasource_OGC_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    id: 1,
    name: 'bus_stop',
    visible: true,
    wmsUrl: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    wmsLayers: [{
      name: 'bus_stop',
      queryable: true
    }],
    wfsUrl: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    wfsFeatureNS: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_WFS_FEATURE_NS"],
    wfsLayers: [{
      name: 'bus_stop',
      queryable: true
    }]
  }));
  ngeoDataSources.collection.push(new ngeo_datasource_OGC_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    id: 2,
    name: 'information',
    visible: true,
    wmsUrl: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    wmsLayers: [{
      name: 'information',
      queryable: true
    }],
    wfsFeatureNS: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_WFS_FEATURE_NS"],
    wfsUrl: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    wfsLayers: [{
      name: 'information',
      queryable: true
    }]
  }));
  var queryToolActivate = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_9__["default"](this, 'queryActive');
  ngeoToolActivateMgr.registerTool('mapTools', queryToolActivate);
  var dummyToolActivate = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_9__["default"](this, 'dummyActive');
  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, true);
}

MainController.prototype.getSetQueryActive = function (val) {
  if (val !== undefined) {
    this.queryActive = val;
  } else {
    return this.queryActive;
  }
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 34:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZXMvcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9xdWVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwicXVlcnlcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMzQsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGgzPlRvdGFsOiB7eyAkY3RybC5yZXN1bHQudG90YWwgfX08L2gzPlxcblxcbjx1bCBjbGFzcz1cIm5hdiBuYXYtdGFic1wiXFxuICAgIHJvbGU9XCJ0YWJsaXN0XCI+XFxuICA8bGkgbmctcmVwZWF0PVwic291cmNlIGluICRjdHJsLnJlc3VsdC5zb3VyY2VzXCJcXG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCI+XFxuICAgIDxhIGhyZWY9XCIje3sgOjpzb3VyY2UubGFiZWwgfX1cIlxcbiAgICAgICBhcmlhLWNvbnRyb2xzPVwie3sgOjpzb3VyY2UubGFiZWwgfX1cIlxcbiAgICAgICBuZy1hdHRyLWFyaWEtc2VsZWN0ZWQ9XCJ7eyAkZmlyc3QgfX1cIlxcbiAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcXG4gICAgICAgaWQ9XCJ7eyA6OnNvdXJjZS5sYWJlbCB9fS10YWJcIlxcbiAgICAgICBuZy1jbGFzcz1cIjo6e2FjdGl2ZTogJGZpcnN0fVwiXFxuICAgICAgIHJvbGU9XCJ0YWJcIlxcbiAgICAgICBkYXRhLXRvZ2dsZT1cInRhYlwiPlxcbiAgICAgIDxzcGFuPnt7IDo6c291cmNlLmxhYmVsIH19PC9zcGFuPlxcbiAgICAgIDxzcGFuIG5nLXN3aXRjaD1cInNvdXJjZS5wZW5kaW5nXCI+XFxuICAgICAgICA8c3BhbiBuZy1zd2l0Y2gtd2hlbj1cInRydWVcIj4oLi4uKTwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIG5nLXN3aXRjaC1kZWZhdWx0PVwiXCI+KHt7IDo6c291cmNlLmZlYXR1cmVzLmxlbmd0aCB9fSk8L3NwYW4+XFxuICAgICAgPC9zcGFuPlxcbiAgICA8L2E+XFxuICA8L2xpPlxcbjwvdWw+XFxuXFxuPGRpdiBjbGFzcz1cInRhYi1jb250ZW50XCI+XFxuICA8ZGl2IG5nLXJlcGVhdD1cInNvdXJjZSBpbiAkY3RybC5yZXN1bHQuc291cmNlc1wiXFxuICAgICAgIGFyaWEtbGFiZWxsZWRieT1cInt7IDo6c291cmNlLmxhYmVsIH19LXRhYlwiXFxuICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXFxuICAgICAgIGNsYXNzPVwidGFiLXBhbmUgZmFkZVwiXFxuICAgICAgIG5nLWNsYXNzPVwiOjp7YWN0aXZlOiAkZmlyc3QsIHNob3c6ICRmaXJzdH1cIlxcbiAgICAgICBpZD1cInt7IDo6c291cmNlLmxhYmVsIH19XCI+XFxuICAgIDxkaXYgbmctc3dpdGNoPVwic291cmNlLmZlYXR1cmVzLmxlbmd0aFwiPlxcbiAgICAgIDxkaXYgbmctc3dpdGNoLXdoZW49XCIwXCI+XFxuICAgICAgICA8c3BhbiBuZy1zd2l0Y2g9XCJzb3VyY2UucGVuZGluZ1wiPlxcbiAgICAgICAgICA8aDMgbmctc3dpdGNoLXdoZW49XCJ0cnVlXCI+UGVuZGluZy4uLjwvaDM+XFxuICAgICAgICAgIDxoMyBuZy1zd2l0Y2gtZGVmYXVsdD1cIlwiPk5vIHJlc3VsdDwvaDM+XFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBuZy1zd2l0Y2gtZGVmYXVsdD1cIlwiPlxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XCJmZWF0dXJlIGluIDo6c291cmNlLmZlYXR1cmVzXCI+XFxuICAgICAgICAgIDxoMz57eyA6OmZlYXR1cmUuZ2V0KFxcJ2Rpc3BsYXlfbmFtZVxcJykgfX08L2gzPlxcbiAgICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cIihrZXksIHZhbHVlKSBpbiA6OmZlYXR1cmUuZ2V0UHJvcGVydGllcygpXCJcXG4gICAgICAgICAgICAgICBuZy1pbml0PVwidmFsdWUgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBcXCdcXCdcIj5cXG4gICAgICAgICAgICA8c3BhbiBuZy1pZj1cIjo6KGtleSAhPT0gZmVhdHVyZS5nZXRHZW9tZXRyeU5hbWUoKSAmJiBrZXkgIT09IFxcJ25nZW9fZmVhdHVyZV90eXBlX1xcJylcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIG5nLWJpbmQ9XCI6OmtleVwiPjwvc3Bhbj46XFxuICAgICAgICAgICAgICA8c3BhbiBuZy1iaW5kPVwiOjp2YWx1ZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvRGF0YVNvdXJjZXNcIiwgXCJuZ2VvVG9vbEFjdGl2YXRlTWdyXCIsIFwibmdlb1F1ZXJ5TW9kZVNlbGVjdG9yXCJdO1xuUXVlcnlyZXN1bHRDb250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvUXVlcnlSZXN1bHRcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7IE1BUFNFUlZFUl9QUk9YWSwgTUFQU0VSVkVSX1dGU19GRUFUVVJFX05TIH0gZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL2Jhc2UuY3NzJztcbmltcG9ydCAnLi9xdWVyeS5jc3MnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ0BnZW9ibG9ja3MvcHJvai9zcmMvRVBTR18yMDU2LmpzJztcbmltcG9ydCBuZ2VvRGF0YXNvdXJjZURhdGFTb3VyY2VzIGZyb20gJ25nZW8vZGF0YXNvdXJjZS9EYXRhU291cmNlcy5qcyc7XG5pbXBvcnQgbmdlb0RhdGFzb3VyY2VPR0MgZnJvbSAnbmdlby9kYXRhc291cmNlL09HQy5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQuanMnO1xuaW1wb3J0IG5nZW9NaXNjVG9vbEFjdGl2YXRlIGZyb20gJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGUuanMnO1xuaW1wb3J0IG5nZW9NaXNjVG9vbEFjdGl2YXRlTWdyIGZyb20gJ25nZW8vbWlzYy9Ub29sQWN0aXZhdGVNZ3IuanMnO1xuaW1wb3J0IG5nZW9RdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb1F1ZXJ5UGFuZWxDb21wb25lbnQgZnJvbSAnbmdlby9xdWVyeS9wYW5lbENvbXBvbmVudC5qcyc7XG5pbXBvcnQgbmdlb1F1ZXJ5TW9kdWxlIGZyb20gJ25nZW8vcXVlcnkvbW9kdWxlLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVySW1hZ2UgZnJvbSAnb2wvbGF5ZXIvSW1hZ2UuanMnO1xuaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUuanMnO1xuaW1wb3J0IG9sU291cmNlSW1hZ2VXTVMgZnJvbSAnb2wvc291cmNlL0ltYWdlV01TLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWydnZXR0ZXh0Jywgbmdlb0RhdGFzb3VyY2VEYXRhU291cmNlcy5uYW1lLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9NaXNjQnRuQ29tcG9uZW50Lm5hbWUsIG5nZW9NaXNjVG9vbEFjdGl2YXRlTWdyLm5hbWUsIG5nZW9RdWVyeUNvbXBvbmVudC5uYW1lLCBuZ2VvUXVlcnlQYW5lbENvbXBvbmVudC5uYW1lLCBuZ2VvUXVlcnlNb2R1bGUubmFtZV0pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdwYXJ0aWFscy9xdWVyeXJlc3VsdCcsIHJlcXVpcmUoJy4vcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCcpKTtcbn1dKTtcbm1vZHVsZS52YWx1ZSgnbmdlb1F1ZXJ5T3B0aW9ucycsIHtcbiAgJ2N1cnNvckhvdmVyJzogdHJ1ZSxcbiAgJ2xpbWl0JzogMjBcbn0pO1xudmFyIHF1ZXJ5cmVzdWx0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnQXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9xdWVyeXJlc3VsdCdcbn07XG5tb2R1bGUuY29tcG9uZW50KCdhcHBRdWVyeXJlc3VsdCcsIHF1ZXJ5cmVzdWx0Q29tcG9uZW50KTtcblxuZnVuY3Rpb24gUXVlcnlyZXN1bHRDb250cm9sbGVyKG5nZW9RdWVyeVJlc3VsdCkge1xuICB0aGlzLnJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ0FwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKG5nZW9EYXRhU291cmNlcywgbmdlb1Rvb2xBY3RpdmF0ZU1nciwgbmdlb1F1ZXJ5TW9kZVNlbGVjdG9yKSB7XG4gIHRoaXMuZHVtbXlBY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5xdWVyeUFjdGl2ZSA9IHRydWU7XG4gIHRoaXMucXVlcnlBdXRvQ2xlYXIgPSB0cnVlO1xuICB0aGlzLm5nZW9RdWVyeU1vZGVTZWxlY3RvciA9IG5nZW9RdWVyeU1vZGVTZWxlY3RvcjtcbiAgdmFyIHNvdXJjZTEgPSBuZXcgb2xTb3VyY2VJbWFnZVdNUyh7XG4gICAgdXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgcHJvamVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHBhcmFtczoge1xuICAgICAgJ0xBWUVSUyc6ICdidXNfc3RvcCdcbiAgICB9XG4gIH0pO1xuICB2YXIgYnVzU3RvcExheWVyID0gbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgc291cmNlOiBzb3VyY2UxXG4gIH0pO1xuICB2YXIgc291cmNlMiA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBwcm9qZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgcGFyYW1zOiB7XG4gICAgICAnTEFZRVJTJzogJ2luZm9ybWF0aW9uJ1xuICAgIH1cbiAgfSk7XG4gIHZhciBpbmZvcm1hdGlvbkxheWVyID0gbmV3IG9sTGF5ZXJJbWFnZSh7XG4gICAgc291cmNlOiBzb3VyY2UyXG4gIH0pO1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKClcbiAgICB9KSwgaW5mb3JtYXRpb25MYXllciwgYnVzU3RvcExheWVyXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbMjUzNjY2MCwgMTE1MzAwOV0sXG4gICAgICB6b29tOiA0XG4gICAgfSlcbiAgfSk7XG4gIG5nZW9EYXRhU291cmNlcy5tYXAgPSB0aGlzLm1hcDtcbiAgbmdlb0RhdGFTb3VyY2VzLmNvbGxlY3Rpb24ucHVzaChuZXcgbmdlb0RhdGFzb3VyY2VPR0Moe1xuICAgIGlkOiAxLFxuICAgIG5hbWU6ICdidXNfc3RvcCcsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB3bXNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICB3bXNMYXllcnM6IFt7XG4gICAgICBuYW1lOiAnYnVzX3N0b3AnLFxuICAgICAgcXVlcnlhYmxlOiB0cnVlXG4gICAgfV0sXG4gICAgd2ZzVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgd2ZzRmVhdHVyZU5TOiBNQVBTRVJWRVJfV0ZTX0ZFQVRVUkVfTlMsXG4gICAgd2ZzTGF5ZXJzOiBbe1xuICAgICAgbmFtZTogJ2J1c19zdG9wJyxcbiAgICAgIHF1ZXJ5YWJsZTogdHJ1ZVxuICAgIH1dXG4gIH0pKTtcbiAgbmdlb0RhdGFTb3VyY2VzLmNvbGxlY3Rpb24ucHVzaChuZXcgbmdlb0RhdGFzb3VyY2VPR0Moe1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdpbmZvcm1hdGlvbicsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB3bXNVcmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICB3bXNMYXllcnM6IFt7XG4gICAgICBuYW1lOiAnaW5mb3JtYXRpb24nLFxuICAgICAgcXVlcnlhYmxlOiB0cnVlXG4gICAgfV0sXG4gICAgd2ZzRmVhdHVyZU5TOiBNQVBTRVJWRVJfV0ZTX0ZFQVRVUkVfTlMsXG4gICAgd2ZzVXJsOiBNQVBTRVJWRVJfUFJPWFksXG4gICAgd2ZzTGF5ZXJzOiBbe1xuICAgICAgbmFtZTogJ2luZm9ybWF0aW9uJyxcbiAgICAgIHF1ZXJ5YWJsZTogdHJ1ZVxuICAgIH1dXG4gIH0pKTtcbiAgdmFyIHF1ZXJ5VG9vbEFjdGl2YXRlID0gbmV3IG5nZW9NaXNjVG9vbEFjdGl2YXRlKHRoaXMsICdxdWVyeUFjdGl2ZScpO1xuICBuZ2VvVG9vbEFjdGl2YXRlTWdyLnJlZ2lzdGVyVG9vbCgnbWFwVG9vbHMnLCBxdWVyeVRvb2xBY3RpdmF0ZSk7XG4gIHZhciBkdW1teVRvb2xBY3RpdmF0ZSA9IG5ldyBuZ2VvTWlzY1Rvb2xBY3RpdmF0ZSh0aGlzLCAnZHVtbXlBY3RpdmUnKTtcbiAgbmdlb1Rvb2xBY3RpdmF0ZU1nci5yZWdpc3RlclRvb2woJ21hcFRvb2xzJywgZHVtbXlUb29sQWN0aXZhdGUsIHRydWUpO1xufVxuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2V0UXVlcnlBY3RpdmUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMucXVlcnlBY3RpdmUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlBY3RpdmU7XG4gIH1cbn07XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=