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
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 		"displayquerygrid": 0
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
/******/ 	deferredModules.push([4,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/displayquerygrid.css":
/*!****************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./contribs/gmf/examples/displayquerygrid.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./contribs/gmf/examples/url.js");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayquerygrid.css */ "./contribs/gmf/examples/displayquerygrid.css");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/datasource/Manager.js */ "./contribs/gmf/src/datasource/Manager.js");
/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/layertree/component.js */ "./contribs/gmf/src/layertree/component.js");
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/query/gridComponent.js */ "./contribs/gmf/src/query/gridComponent.js");
/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/theme/Themes.js */ "./contribs/gmf/src/theme/Themes.js");
/* harmony import */ var ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/grid/module.js */ "./src/grid/module.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ "./node_modules/@geoblocks/proj/src/EPSG_21781.js");
/* harmony import */ var ngeo_query_bboxQueryComponent_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/query/bboxQueryComponent.js */ "./src/query/bboxQueryComponent.js");
/* harmony import */ var ngeo_query_mapQueryComponent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/mapQueryComponent.js */ "./src/query/mapQueryComponent.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
MainController.$inject = ["gmfThemes", "gmfDataSourcesManager", "ngeoFeatureOverlayMgr"];
QueryresultController.$inject = ["ngeoQueryResult"];






















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_10__["default"].name, ngeo_query_bboxQueryComponent_js__WEBPACK_IMPORTED_MODULE_12__["default"].name, ngeo_query_mapQueryComponent_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);
module.constant('ngeoQueryOptions', {
  'limit': 20,
  'queryCountFirst': true
});
module.constant('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].GMF_THEMES);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');
var queryresultComponent = {
  controller: 'gmfappQueryresultController',
  template: __webpack_require__(/*! ./partials/queryresult.html */ "./contribs/gmf/examples/partials/queryresult.html")
};
module.component('gmfappQueryresult', queryresultComponent);

function QueryresultController(ngeoQueryResult) {
  this.result = ngeoQueryResult;
}

module.controller('gmfappQueryresultController', QueryresultController);

function MainController(gmfThemes, gmfDataSourcesManager, ngeoFeatureOverlayMgr) {
  var _this = this;

  gmfThemes.loadThemes();
  var fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_19__["default"]({
    color: [255, 170, 0, 0.6]
  });
  var stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_20__["default"]({
    color: [255, 170, 0, 1],
    width: 2
  });
  this.featureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_21__["default"]({
    fill: fill,
    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
      fill: fill,
      radius: 5,
      stroke: stroke
    }),
    stroke: stroke
  });
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_17__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_11__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [537635, 152640],
      zoom: 3
    })
  });
  gmfDataSourcesManager.setDatasourceMap(this.map);
  this.themes = undefined;
  this.treeSource = undefined;
  this.queryActive = true;
  this.queryGridActive = true;
  gmfThemes.getThemesObject().then(function (themes) {
    if (themes) {
      _this.themes = themes;
      _this.treeSource = themes[3];
    }
  });
  ngeoFeatureOverlayMgr.init(this.map);
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/query/gridComponent.html":
/*!***************************************************!*\
  !*** ./contribs/gmf/src/query/gridComponent.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="gmf-displayquerygrid panel" ng-show="ctrl.active">\n  <div\n    class="close"\n    ng-click="ctrl.clear()">\n    &times;\n  </div>\n\n  <ul\n    class="nav nav-pills"\n    role="tablist">\n\n    <li\n      class="nav-item"\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="presentation"\n      ng-click="ctrl.selectTab(gridSource)">\n\n      <a\n        class="nav-link"\n        href="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n        data-target="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        aria-controls="{{ctrl.escapeValue(gridSource.source.label)}}"\n        role="tab"\n        data-toggle="tab">\n\n        <span ng-if="gridSource.source.tooManyResults !== true">\n          {{gridSource.source.label | translate}} ({{gridSource.source.features.length}})\n        </span>\n        <span ng-if="gridSource.source.tooManyResults === true">\n          {{gridSource.source.label | translate}} ({{gridSource.source.totalFeatureCount}}*)\n        </span>\n      </a>\n    </li>\n  </ul>\n\n  <div class="tab-content">\n    <div\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="tabpanel"\n      class="tab-pane"\n      ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n      id="{{ctrl.escapeValue(gridSource.source.label)}}">\n\n      <ngeo-grid\n        ngeo-grid-configuration="gridSource.configuration"\n        ng-if="gridSource.source.tooManyResults !== true">\n      </ngeo-grid>\n\n      <div ng-if="gridSource.source.tooManyResults === true">\n        <div class="gmf-displayquerygrid-message alert alert-warning">\n          <p><span translate>The results can not be displayed because the maximum number has been reached</span> ({{gridSource.source.limit}}).</p>\n          <p translate>Please refine your query.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div ng-show="!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null">\n\n    <ul class="nav justify-content-end">\n\n      <li\n        class="ng-hide"\n        ng-show="ctrl.isOneSelected()">\n        <div class="btn btn-sm ng-binding">\n          {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>\n        </div>\n      </li>\n\n      <li\n        ng-show="ctrl.isOneSelected()"\n        class="ng-hide">\n        <button\n          class="btn btn-link btn-sm"\n          title="{{\'Zoom to selection\' | translate}}"\n          ng-click="ctrl.zoomToSelection()">\n          <i class="fa fa-search-plus"></i> <span translate>Zoom to</span>\n        </button>\n      </li>\n\n      <li\n        ng-show="ctrl.isOneSelected()"\n        class="ng-hide">\n        <button\n          class="btn btn-link btn-sm"\n          title="{{\'Export selection as CSV\' | translate}}"\n          ng-click="ctrl.downloadCsv()">\n          <i class="fa fa-download"></i> <span translate>Export as CSV</span>\n        </button>\n      </li>\n\n      <li class="dropdown">\n        <button\n          type="button"\n          class="dropup btn btn-default btn-sm dropdown-toggle"\n          data-toggle="dropdown"\n          aria-haspopup="true"\n          aria-expanded="false">\n          <span translate>Select</span>\n        </button>\n        <ul\n          class="dropdown-menu"\n          aria-labelledby="dLabel">\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.selectAll()" translate>All</a>\n          </li>\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.unselectAll()" translate>None</a>\n          </li>\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.invertSelection()" translate>Reverse selection</a>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div\n    ng-show="ctrl.pending"\n    class="gmf-displayquerygrid-pending">\n    <span class="fa fa-spinner fa-spin"></span>\n  </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./contribs/gmf/src/query/gridComponent.js":
/*!*************************************************!*\
  !*** ./contribs/gmf/src/query/gridComponent.js ***!
  \*************************************************/
/*! exports provided: QueryGridController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryGridController", function() { return QueryGridController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_download_Csv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/download/Csv.js */ "./src/download/Csv.js");
/* harmony import */ var ngeo_download_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/download/service.js */ "./src/download/service.js");
/* harmony import */ var ngeo_grid_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/grid/component.js */ "./src/grid/component.js");
/* harmony import */ var ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/grid/Config.js */ "./src/grid/Config.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ "./src/map/FeatureOverlayMgr.js");
/* harmony import */ var ngeo_query_MapQuerent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/query/MapQuerent.js */ "./src/query/MapQuerent.js");
/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Collection.js */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/extent.js */ "./node_modules/ol/extent.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var bootstrap_js_src_dropdown_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bootstrap/js/src/dropdown.js */ "./node_modules/bootstrap/js/src/dropdown.js");
QueryGridController.$inject = ["$injector", "$scope", "ngeoQueryResult", "ngeoMapQuerent", "ngeoFeatureOverlayMgr", "$timeout", "ngeoCsvDownload", "$element"];















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfQueryGridComponent', [ngeo_download_Csv_js__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_download_service_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_grid_component_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, ngeo_query_MapQuerent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);
module.value('gmfDisplayquerygridTemplateUrl', function ($element, $attrs) {
  var templateUrl = $attrs['gmfDisplayquerygridTemplateurl'];
  return templateUrl !== undefined ? templateUrl : 'gmf/query/gridComponent';
});
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/query/gridComponent', __webpack_require__(/*! ./gridComponent.html */ "./contribs/gmf/src/query/gridComponent.html"));
}]);
gmfDisplayquerygridTemplateUrl.$inject = ["$element", "$attrs", "gmfDisplayquerygridTemplateUrl"];

function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}

var queryGridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',
    'selectedFeatureStyleFn': '&gmfDisplayquerygridSelectedfeaturestyle',
    'getMapFn': '&gmfDisplayquerygridMap',
    'removeEmptyColumnsFn': '&?gmfDisplayquerygridRemoveemptycolumns',
    'maxResultsFn': '&?gmfDisplayquerygridMaxresults',
    'maxRecenterZoomFn': '&?gmfDisplayquerygridMaxrecenterzoom',
    'mergeTabs': '<?gmfDisplayquerygridMergetabs'
  },
  templateUrl: gmfDisplayquerygridTemplateUrl
};
module.component('gmfDisplayquerygrid', queryGridComponent);
function QueryGridController($injector, $scope, ngeoQueryResult, ngeoMapQuerent, ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, $element) {
  var _this = this;

  var queryOptions = $injector.has('ngeoQueryOptions') ? $injector.get('ngeoQueryOptions') : {};
  this.$scope_ = $scope;
  this.$timeout_ = $timeout;
  this.ngeoQueryResult = ngeoQueryResult;
  this.ngeoMapQuerent_ = ngeoMapQuerent;
  this.ngeoCsvDownload_ = ngeoCsvDownload;
  this.$element_ = $element;
  this.maxResults = queryOptions.limit !== undefined ? queryOptions.limit : 50;
  this.active = false;
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.removeEmptyColumns_ = false;
  this.maxRecenterZoom;
  this.mergeTabs = {};
  this.featuresForSources_ = {};
  this.features_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;
  this.highlightFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  this.filename_ = $injector.has('gmfCsvFilename') ? $injector.get('gmfCsvFilename') : 'query-results.csv';
  this.map_ = null;
  this.$scope_.$watchCollection(function () {
    return ngeoQueryResult;
  }, function (newQueryResult, oldQueryResult) {
    if (newQueryResult !== oldQueryResult) {
      _this.updateData_();
    }
  });
  this.unregisterSelectWatcher_ = null;
}

QueryGridController.prototype.$onInit = function () {
  this.removeEmptyColumns_ = this['removeEmptyColumnsFn'] ? this['removeEmptyColumnsFn']() === true : false;
  this.maxRecenterZoom = this['maxRecenterZoomFn'] ? this['maxRecenterZoomFn']() : undefined;
  var featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  var featuresStyle = this['featuresStyleFn']();

  if (featuresStyle !== undefined) {
    console.assert(featuresStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"]);
    featuresOverlay.setStyle(featuresStyle);
  }

  var highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  var highlightFeatureStyle = this['selectedFeatureStyleFn']();

  if (highlightFeatureStyle !== undefined) {
    console.assert(highlightFeatureStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"]);
  } else {
    var fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
      color: [255, 0, 0, 0.6]
    });
    var stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
      color: [255, 0, 0, 1],
      width: 2
    });
    highlightFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
      fill: fill,
      image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        fill: fill,
        radius: 5,
        stroke: stroke
      }),
      stroke: stroke,
      zIndex: 10
    });
  }

  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);
  var mapFn = this['getMapFn'];

  if (mapFn) {
    var map = mapFn();
    console.assert(map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
    this.map_ = map;
  }
};

QueryGridController.prototype.getGridSources = function () {
  var _this2 = this;

  return this.loadedGridSources.map(function (sourceLabel) {
    return _this2.gridSources[sourceLabel];
  });
};

QueryGridController.prototype.updateData_ = function () {
  var _this3 = this;

  if ((this.ngeoQueryResult.pending || this.ngeoQueryResult.total === 0) && !this.hasOneWithTooManyResults_()) {
    var oldActive = this.active;
    this.clear();

    if (oldActive) {
      this.active = this.ngeoQueryResult.pending;
      this.pending = this.ngeoQueryResult.pending;
    }

    return;
  }

  this.active = true;
  this.pending = false;
  var sources = this.ngeoQueryResult.sources;

  if (Object.keys(this.mergeTabs).length > 0) {
    sources = this.getMergedSources_(sources);
  }

  sources.forEach(function (source) {
    if (source.tooManyResults) {
      _this3.makeGrid_(null, source);
    } else {
      source.id = _this3.escapeValue(source.id);
      var features = source.features;

      if (features.length > 0) {
        _this3.collectData_(source);
      }
    }
  });

  if (this.loadedGridSources.length === 0) {
    this.active = false;
    return;
  }

  if (this.selectedTab === null || !("" + this.selectedTab in this.gridSources)) {
    this.$timeout_(function () {
      var firstSourceId = _this3.loadedGridSources[0];

      _this3.selectTab(_this3.gridSources[firstSourceId]);
    }, 0);
  }
};

QueryGridController.prototype.hasOneWithTooManyResults_ = function () {
  return this.ngeoQueryResult.sources.some(function (source) {
    return source.tooManyResults;
  });
};

QueryGridController.prototype.escapeValue = function (value) {
  if (typeof value == 'number') {
    return value;
  } else {
    var toEscape = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\ |]/g;

    if (value.match(toEscape) !== null) {
      return value.replace(toEscape, '_');
    } else {
      return value;
    }
  }
};

QueryGridController.prototype.isSelected = function (gridSource) {
  return this.selectedTab === gridSource.source.label;
};

QueryGridController.prototype.getMergedSources_ = function (sources) {
  var _this4 = this;

  var allSources = [];
  var mergedSources = {};
  sources.forEach(function (source) {
    var mergedSource = _this4.getMergedSource_(source, mergedSources);

    if (mergedSource === null) {
      allSources.push(source);
    }
  });

  for (var mergedSourceId in mergedSources) {
    allSources.push(mergedSources[mergedSourceId]);
  }

  return allSources;
};

QueryGridController.prototype.getMergedSource_ = function (source, mergedSources) {
  var mergeSourceId = null;

  for (var currentMergeSourceId in this.mergeTabs) {
    var sourceLabels = this.mergeTabs[currentMergeSourceId];
    var containsSource = sourceLabels.some(function (sourceLabel) {
      return sourceLabel == source.label;
    });

    if (containsSource) {
      mergeSourceId = currentMergeSourceId;
      break;
    }
  }

  if (mergeSourceId === null) {
    return null;
  }

  var mergeSource;

  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      limit: this.maxResults,
      pending: false,
      queried: true,
      tooManyResults: false,
      totalFeatureCount: undefined
    };
    mergedSources[mergeSourceId] = mergeSource;
  }

  source.features.forEach(function (feature) {
    mergeSource.features.push(feature);
  });
  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;

  if (mergeSource.tooManyResults) {
    mergeSource.totalFeatureCount = mergeSource.totalFeatureCount !== undefined ? mergeSource.totalFeatureCount + mergeSource.features.length : mergeSource.features.length;
    mergeSource.features = [];
  }

  if (source.totalFeatureCount !== undefined) {
    mergeSource.totalFeatureCount = mergeSource.totalFeatureCount !== undefined ? mergeSource.totalFeatureCount + source.totalFeatureCount : source.totalFeatureCount;
  }

  return mergeSource;
};

QueryGridController.prototype.collectData_ = function (source) {
  var features = source.features;
  var allProperties = [];
  var featureGeometriesNames = [];
  var featuresForSource = {};
  var properties, featureGeometryName;
  features.forEach(function (feature) {
    properties = feature.getProperties();

    if (properties !== undefined) {
      featureGeometryName = feature.getGeometryName();

      if (featureGeometriesNames.indexOf(featureGeometryName) === -1) {
        featureGeometriesNames.push(featureGeometryName);
      }

      allProperties.push(properties);
      featuresForSource[Object(ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__["getRowUid"])(properties)] = feature;
    }
  });
  this.cleanProperties_(allProperties, featureGeometriesNames);

  if (allProperties.length > 0) {
    var gridCreated = this.makeGrid_(allProperties, source);

    if (gridCreated) {
      this.featuresForSources_["" + source.label] = featuresForSource;
    }
  }
};

QueryGridController.prototype.cleanProperties_ = function (allProperties, featureGeometriesNames) {
  allProperties.forEach(function (properties) {
    featureGeometriesNames.forEach(function (featureGeometryName) {
      delete properties[featureGeometryName];
    });
    delete properties['boundedBy'];
    delete properties['ngeo_feature_type_'];
  });

  if (this.removeEmptyColumns_ === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};

QueryGridController.prototype.removeEmptyColumnsFn_ = function (allProperties) {
  var keysToKeep = [];
  var i, key;

  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }

  var keyToRemove;
  allProperties.forEach(function (properties) {
    keyToRemove = [];

    for (key in properties) {
      if (keysToKeep.indexOf(key) === -1) {
        keyToRemove.push(key);
      }
    }

    keyToRemove.forEach(function (key) {
      delete properties[key];
    });
  });
};

QueryGridController.prototype.makeGrid_ = function (data, source) {
  var sourceLabel = "" + source.label;
  var gridConfig = null;

  if (data !== null) {
    gridConfig = this.getGridConfiguration_(data);

    if (gridConfig === null) {
      return false;
    }
  }

  if (this.loadedGridSources.indexOf(sourceLabel) == -1) {
    this.loadedGridSources.push(sourceLabel);
  }

  this.gridSources[sourceLabel] = {
    configuration: gridConfig,
    source: source
  };
  return true;
};

QueryGridController.prototype.getGridConfiguration_ = function (data) {
  console.assert(data.length > 0);
  var clone = {};
  Object.assign(clone, data[0]);
  delete clone.ol_uid;
  var columns = Object.keys(clone);
  var columnDefs = [];
  columns.forEach(function (column) {
    columnDefs.push({
      name: column
    });
  });

  if (columnDefs.length > 0) {
    return new ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__["default"](data, columnDefs);
  } else {
    return null;
  }
};

QueryGridController.prototype.clear = function () {
  this.active = false;
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.tooManyResults = false;
  this.features_.clear();
  this.highlightFeatures_.clear();
  this.ngeoMapQuerent_.clear();
  this.featuresForSources_ = {};

  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
  }
};

QueryGridController.prototype.selectTab = function (gridSource) {
  var _this5 = this;

  var source = gridSource.source;
  this.selectedTab = source.label;

  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }

  if (gridSource.configuration !== null) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(function () {
      return gridSource.configuration.selectedRows;
    }, function (newSelected, oldSelectedRows) {
      if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
        _this5.onSelectionChanged_();
      }
    });
  }

  this.updateFeatures_(gridSource);
  this.reflowGrid_();
};

QueryGridController.prototype.reflowGrid_ = function () {
  var id = this.escapeValue(this.selectedTab || '');
  var activePane = this.$element_.find("div.tab-pane#" + id);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(function () {
    activePane.find('div.ngeo-grid-table-container table')['trigger']('reflow');
  });
};

QueryGridController.prototype.onSelectionChanged_ = function () {
  if (this.selectedTab === null) {
    return;
  }

  var gridSource = this.gridSources["" + this.selectedTab];
  this.updateFeatures_(gridSource);
};

QueryGridController.prototype.updateFeatures_ = function (gridSource) {
  this.features_.clear();
  this.highlightFeatures_.clear();

  if (gridSource.configuration === null) {
    return;
  }

  var sourceLabel = "" + gridSource.source.label;
  var featuresForSource = this.featuresForSources_[sourceLabel];
  var selectedRows = gridSource.configuration.selectedRows;

  for (var rowId in featuresForSource) {
    var feature = featuresForSource[rowId];

    if (rowId in selectedRows) {
      this.highlightFeatures_.push(feature);
    } else {
      this.features_.push(feature);
    }
  }
};

QueryGridController.prototype.getActiveGridSource = function () {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources["" + this.selectedTab];
  }
};

QueryGridController.prototype.isOneSelected = function () {
  var source = this.getActiveGridSource();

  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};

QueryGridController.prototype.getSelectedRowCount = function () {
  var source = this.getActiveGridSource();

  if (source === null || source.configuration === null) {
    return 0;
  } else {
    return source.configuration.getSelectedCount();
  }
};

QueryGridController.prototype.selectAll = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    source.configuration.selectAll();
  }
};

QueryGridController.prototype.unselectAll = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    source.configuration.unselectAll();
  }
};

QueryGridController.prototype.invertSelection = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    source.configuration.invertSelection();
  }
};

QueryGridController.prototype.zoomToSelection = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_8__["createEmpty"]();
    this.highlightFeatures_.forEach(function (feature) {
      ol_extent_js__WEBPACK_IMPORTED_MODULE_8__["extend"](extent, feature.getGeometry().getExtent());
    });
    var size = this.map_.getSize();
    console.assert(size !== undefined);
    var maxZoom = this.maxRecenterZoom;
    this.map_.getView().fit(extent, {
      size: size,
      maxZoom: maxZoom
    });
  }
};

QueryGridController.prototype.downloadCsv = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    var columnDefs = source.configuration.columnDefs;
    console.assert(columnDefs !== undefined);
    var selectedRows = source.configuration.getSelectedRows();
    this.ngeoCsvDownload_.startDownload(selectedRows, columnDefs, this.filename_);
  }
};

module.controller('GmfDisplayquerygridController', QueryGridController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 4:
/*!**************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/displayquerygrid.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./contribs/gmf/src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/displayquerygrid.js */"./contribs/gmf/examples/displayquerygrid.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRpc3BsYXlxdWVyeWdyaWRcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbNCxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiZ21mVGhlbWVzXCIsIFwiZ21mRGF0YVNvdXJjZXNNYW5hZ2VyXCIsIFwibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCJdO1xuUXVlcnlyZXN1bHRDb250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvUXVlcnlSZXN1bHRcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhcHBVUkwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL2Rpc3BsYXlxdWVyeWdyaWQuY3NzJztcbmltcG9ydCBnbWZEYXRhc291cmNlTWFuYWdlciBmcm9tICdnbWYvZGF0YXNvdXJjZS9NYW5hZ2VyLmpzJztcbmltcG9ydCBnbWZMYXllcnRyZWVDb21wb25lbnQgZnJvbSAnZ21mL2xheWVydHJlZS9jb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mUXVlcnlHcmlkQ29tcG9uZW50IGZyb20gJ2dtZi9xdWVyeS9ncmlkQ29tcG9uZW50LmpzJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzLmpzJztcbmltcG9ydCBuZ2VvR3JpZE1vZHVsZSBmcm9tICduZ2VvL2dyaWQvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudC5qcyc7XG5pbXBvcnQgRVBTRzIxNzgxIGZyb20gJ0BnZW9ibG9ja3MvcHJvai9zcmMvRVBTR18yMTc4MS5qcyc7XG5pbXBvcnQgbmdlb1F1ZXJ5QmJveFF1ZXJ5Q29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvYmJveFF1ZXJ5Q29tcG9uZW50LmpzJztcbmltcG9ydCBuZ2VvUXVlcnlNYXBRdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L21hcFF1ZXJ5Q29tcG9uZW50LmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZmFwcCcsIFsnZ2V0dGV4dCcsIGdtZkRhdGFzb3VyY2VNYW5hZ2VyLm5hbWUsIGdtZkxheWVydHJlZUNvbXBvbmVudC5uYW1lLCBnbWZNYXBDb21wb25lbnQubmFtZSwgZ21mUXVlcnlHcmlkQ29tcG9uZW50Lm5hbWUsIGdtZlRoZW1lVGhlbWVzLm5hbWUsIG5nZW9HcmlkTW9kdWxlLm5hbWUsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSwgbmdlb1F1ZXJ5QmJveFF1ZXJ5Q29tcG9uZW50Lm5hbWUsIG5nZW9RdWVyeU1hcFF1ZXJ5Q29tcG9uZW50Lm5hbWVdKTtcbm1vZHVsZS5jb25zdGFudCgnbmdlb1F1ZXJ5T3B0aW9ucycsIHtcbiAgJ2xpbWl0JzogMjAsXG4gICdxdWVyeUNvdW50Rmlyc3QnOiB0cnVlXG59KTtcbm1vZHVsZS5jb25zdGFudCgnZ21mVHJlZVVybCcsIGFwcFVSTC5HTUZfVEhFTUVTKTtcbm1vZHVsZS5jb25zdGFudCgnZGVmYXVsdFRoZW1lJywgJ0RlbW8nKTtcbm1vZHVsZS5jb25zdGFudCgnYW5ndWxhckxvY2FsZVNjcmlwdCcsICcuLi9idWlsZC9hbmd1bGFyLWxvY2FsZV97e2xvY2FsZX19LmpzJyk7XG52YXIgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sJylcbn07XG5tb2R1bGUuY29tcG9uZW50KCdnbWZhcHBRdWVyeXJlc3VsdCcsIHF1ZXJ5cmVzdWx0Q29tcG9uZW50KTtcblxuZnVuY3Rpb24gUXVlcnlyZXN1bHRDb250cm9sbGVyKG5nZW9RdWVyeVJlc3VsdCkge1xuICB0aGlzLnJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ2dtZmFwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlRoZW1lcywgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBnbWZUaGVtZXMubG9hZFRoZW1lcygpO1xuICB2YXIgZmlsbCA9IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XVxuICB9KTtcbiAgdmFyIHN0cm9rZSA9IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICB3aWR0aDogMlxuICB9KTtcbiAgdGhpcy5mZWF0dXJlU3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBmaWxsLFxuICAgIGltYWdlOiBuZXcgb2xTdHlsZUNpcmNsZSh7XG4gICAgICBmaWxsOiBmaWxsLFxuICAgICAgcmFkaXVzOiA1LFxuICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICB9KSxcbiAgICBzdHJva2U6IHN0cm9rZVxuICB9KTtcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIxNzgxLFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbNTM3NjM1LCAxNTI2NDBdLFxuICAgICAgem9vbTogM1xuICAgIH0pXG4gIH0pO1xuICBnbWZEYXRhU291cmNlc01hbmFnZXIuc2V0RGF0YXNvdXJjZU1hcCh0aGlzLm1hcCk7XG4gIHRoaXMudGhlbWVzID0gdW5kZWZpbmVkO1xuICB0aGlzLnRyZWVTb3VyY2UgPSB1bmRlZmluZWQ7XG4gIHRoaXMucXVlcnlBY3RpdmUgPSB0cnVlO1xuICB0aGlzLnF1ZXJ5R3JpZEFjdGl2ZSA9IHRydWU7XG4gIGdtZlRoZW1lcy5nZXRUaGVtZXNPYmplY3QoKS50aGVuKGZ1bmN0aW9uICh0aGVtZXMpIHtcbiAgICBpZiAodGhlbWVzKSB7XG4gICAgICBfdGhpcy50aGVtZXMgPSB0aGVtZXM7XG4gICAgICBfdGhpcy50cmVlU291cmNlID0gdGhlbWVzWzNdO1xuICAgIH1cbiAgfSk7XG4gIG5nZW9GZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJnbWYtZGlzcGxheXF1ZXJ5Z3JpZCBwYW5lbFwiIG5nLXNob3c9XCJjdHJsLmFjdGl2ZVwiPlxcbiAgPGRpdlxcbiAgICBjbGFzcz1cImNsb3NlXCJcXG4gICAgbmctY2xpY2s9XCJjdHJsLmNsZWFyKClcIj5cXG4gICAgJnRpbWVzO1xcbiAgPC9kaXY+XFxuXFxuICA8dWxcXG4gICAgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCJcXG4gICAgcm9sZT1cInRhYmxpc3RcIj5cXG5cXG4gICAgPGxpXFxuICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiXFxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxcbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxcbiAgICAgIG5nLWNsaWNrPVwiY3RybC5zZWxlY3RUYWIoZ3JpZFNvdXJjZSlcIj5cXG5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XCJuYXYtbGlua1wiXFxuICAgICAgICBocmVmPVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXFxuICAgICAgICBuZy1jbGFzcz1cIntcXCdhY3RpdmVcXCcgOiBjdHJsLmlzU2VsZWN0ZWQoZ3JpZFNvdXJjZSl9XCJcXG4gICAgICAgIGRhdGEtdGFyZ2V0PVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXFxuICAgICAgICBhcmlhLWNvbnRyb2xzPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcXG4gICAgICAgIHJvbGU9XCJ0YWJcIlxcbiAgICAgICAgZGF0YS10b2dnbGU9XCJ0YWJcIj5cXG5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiZ3JpZFNvdXJjZS5zb3VyY2UudG9vTWFueVJlc3VsdHMgIT09IHRydWVcIj5cXG4gICAgICAgICAge3tncmlkU291cmNlLnNvdXJjZS5sYWJlbCB8IHRyYW5zbGF0ZX19ICh7e2dyaWRTb3VyY2Uuc291cmNlLmZlYXR1cmVzLmxlbmd0aH19KVxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XCJncmlkU291cmNlLnNvdXJjZS50b29NYW55UmVzdWx0cyA9PT0gdHJ1ZVwiPlxcbiAgICAgICAgICB7e2dyaWRTb3VyY2Uuc291cmNlLmxhYmVsIHwgdHJhbnNsYXRlfX0gKHt7Z3JpZFNvdXJjZS5zb3VyY2UudG90YWxGZWF0dXJlQ291bnR9fSopXFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgPC9hPlxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG5cXG4gIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxcbiAgICA8ZGl2XFxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxcbiAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXFxuICAgICAgY2xhc3M9XCJ0YWItcGFuZVwiXFxuICAgICAgbmctY2xhc3M9XCJ7XFwnYWN0aXZlXFwnIDogY3RybC5pc1NlbGVjdGVkKGdyaWRTb3VyY2UpfVwiXFxuICAgICAgaWQ9XCJ7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIj5cXG5cXG4gICAgICA8bmdlby1ncmlkXFxuICAgICAgICBuZ2VvLWdyaWQtY29uZmlndXJhdGlvbj1cImdyaWRTb3VyY2UuY29uZmlndXJhdGlvblwiXFxuICAgICAgICBuZy1pZj1cImdyaWRTb3VyY2Uuc291cmNlLnRvb01hbnlSZXN1bHRzICE9PSB0cnVlXCI+XFxuICAgICAgPC9uZ2VvLWdyaWQ+XFxuXFxuICAgICAgPGRpdiBuZy1pZj1cImdyaWRTb3VyY2Uuc291cmNlLnRvb01hbnlSZXN1bHRzID09PSB0cnVlXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ21mLWRpc3BsYXlxdWVyeWdyaWQtbWVzc2FnZSBhbGVydCBhbGVydC13YXJuaW5nXCI+XFxuICAgICAgICAgIDxwPjxzcGFuIHRyYW5zbGF0ZT5UaGUgcmVzdWx0cyBjYW4gbm90IGJlIGRpc3BsYXllZCBiZWNhdXNlIHRoZSBtYXhpbXVtIG51bWJlciBoYXMgYmVlbiByZWFjaGVkPC9zcGFuPiAoe3tncmlkU291cmNlLnNvdXJjZS5saW1pdH19KS48L3A+XFxuICAgICAgICAgIDxwIHRyYW5zbGF0ZT5QbGVhc2UgcmVmaW5lIHlvdXIgcXVlcnkuPC9wPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IG5nLXNob3c9XCIhY3RybC5wZW5kaW5nICYmIGN0cmwuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpICYmIGN0cmwuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpLmNvbmZpZ3VyYXRpb24gIT09IG51bGxcIj5cXG5cXG4gICAgPHVsIGNsYXNzPVwibmF2IGp1c3RpZnktY29udGVudC1lbmRcIj5cXG5cXG4gICAgICA8bGlcXG4gICAgICAgIGNsYXNzPVwibmctaGlkZVwiXFxuICAgICAgICBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLXNtIG5nLWJpbmRpbmdcIj5cXG4gICAgICAgICAge3tjdHJsLmdldFNlbGVjdGVkUm93Q291bnQoKX19IDxzcGFuIHRyYW5zbGF0ZT5zZWxlY3RlZCBlbGVtZW50KHMpPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9saT5cXG5cXG4gICAgICA8bGlcXG4gICAgICAgIG5nLXNob3c9XCJjdHJsLmlzT25lU2VsZWN0ZWQoKVwiXFxuICAgICAgICBjbGFzcz1cIm5nLWhpZGVcIj5cXG4gICAgICAgIDxidXR0b25cXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcXG4gICAgICAgICAgdGl0bGU9XCJ7e1xcJ1pvb20gdG8gc2VsZWN0aW9uXFwnIHwgdHJhbnNsYXRlfX1cIlxcbiAgICAgICAgICBuZy1jbGljaz1cImN0cmwuem9vbVRvU2VsZWN0aW9uKClcIj5cXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2gtcGx1c1wiPjwvaT4gPHNwYW4gdHJhbnNsYXRlPlpvb20gdG88L3NwYW4+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2xpPlxcblxcbiAgICAgIDxsaVxcbiAgICAgICAgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCJcXG4gICAgICAgIGNsYXNzPVwibmctaGlkZVwiPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIlxcbiAgICAgICAgICB0aXRsZT1cInt7XFwnRXhwb3J0IHNlbGVjdGlvbiBhcyBDU1ZcXCcgfCB0cmFuc2xhdGV9fVwiXFxuICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC5kb3dubG9hZENzdigpXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZG93bmxvYWRcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5FeHBvcnQgYXMgQ1NWPC9zcGFuPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9saT5cXG5cXG4gICAgICA8bGkgY2xhc3M9XCJkcm9wZG93blwiPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgICAgY2xhc3M9XCJkcm9wdXAgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBkcm9wZG93bi10b2dnbGVcIlxcbiAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcXG4gICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxcbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cXG4gICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPlNlbGVjdDwvc3Bhbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPHVsXFxuICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXFxuICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICAgICAgICA8bGk+XFxuICAgICAgICAgICAgPGFcXG4gICAgICAgICAgICAgIGhyZWY9XCJcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCJjdHJsLnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPkFsbDwvYT5cXG4gICAgICAgICAgPC9saT5cXG4gICAgICAgICAgPGxpPlxcbiAgICAgICAgICAgIDxhXFxuICAgICAgICAgICAgICBocmVmPVwiXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC51bnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPk5vbmU8L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICA8YVxcbiAgICAgICAgICAgICAgaHJlZj1cIlwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwuaW52ZXJ0U2VsZWN0aW9uKClcIiB0cmFuc2xhdGU+UmV2ZXJzZSBzZWxlY3Rpb248L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXZcXG4gICAgbmctc2hvdz1cImN0cmwucGVuZGluZ1wiXFxuICAgIGNsYXNzPVwiZ21mLWRpc3BsYXlxdWVyeWdyaWQtcGVuZGluZ1wiPlxcbiAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2Plxcbic7XG5cbn1cbnJldHVybiBfX3Bcbn0iLCJRdWVyeUdyaWRDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkaW5qZWN0b3JcIiwgXCIkc2NvcGVcIiwgXCJuZ2VvUXVlcnlSZXN1bHRcIiwgXCJuZ2VvTWFwUXVlcmVudFwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcIiR0aW1lb3V0XCIsIFwibmdlb0NzdkRvd25sb2FkXCIsIFwiJGVsZW1lbnRcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvRG93bmxvYWRDc3YgZnJvbSAnbmdlby9kb3dubG9hZC9Dc3YuanMnO1xuaW1wb3J0IG5nZW9Eb3dubG9hZFNlcnZpY2UgZnJvbSAnbmdlby9kb3dubG9hZC9zZXJ2aWNlLmpzJztcbmltcG9ydCBuZ2VvR3JpZENvbXBvbmVudCBmcm9tICduZ2VvL2dyaWQvY29tcG9uZW50LmpzJztcbmltcG9ydCBuZ2VvR3JpZENvbmZpZywgeyBnZXRSb3dVaWQgfSBmcm9tICduZ2VvL2dyaWQvQ29uZmlnLmpzJztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3IuanMnO1xuaW1wb3J0IG5nZW9RdWVyeU1hcFF1ZXJlbnQgZnJvbSAnbmdlby9xdWVyeS9NYXBRdWVyZW50LmpzJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbi5qcyc7XG5pbXBvcnQgKiBhcyBvbEV4dGVudCBmcm9tICdvbC9leHRlbnQuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xTdHlsZUNpcmNsZSBmcm9tICdvbC9zdHlsZS9DaXJjbGUuanMnO1xuaW1wb3J0IG9sU3R5bGVGaWxsIGZyb20gJ29sL3N0eWxlL0ZpbGwuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHJva2UgZnJvbSAnb2wvc3R5bGUvU3Ryb2tlLmpzJztcbmltcG9ydCBvbFN0eWxlU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuaW1wb3J0ICdib290c3RyYXAvanMvc3JjL2Ryb3Bkb3duLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mUXVlcnlHcmlkQ29tcG9uZW50JywgW25nZW9Eb3dubG9hZENzdi5uYW1lLCBuZ2VvRG93bmxvYWRTZXJ2aWNlLm5hbWUsIG5nZW9HcmlkQ29tcG9uZW50Lm5hbWUsIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvUXVlcnlNYXBRdWVyZW50Lm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gJGF0dHJzWydnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGV1cmwnXTtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnLCByZXF1aXJlKCcuL2dyaWRDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbmdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGVsZW1lbnRcIiwgXCIkYXR0cnNcIiwgXCJnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzKTtcbn1cblxudmFyIHF1ZXJ5R3JpZENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdhY3RpdmUnOiAnPT9nbWZEaXNwbGF5cXVlcnlncmlkQWN0aXZlJyxcbiAgICAnZmVhdHVyZXNTdHlsZUZuJzogJyZnbWZEaXNwbGF5cXVlcnlncmlkRmVhdHVyZXNzdHlsZScsXG4gICAgJ3NlbGVjdGVkRmVhdHVyZVN0eWxlRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRTZWxlY3RlZGZlYXR1cmVzdHlsZScsXG4gICAgJ2dldE1hcEZuJzogJyZnbWZEaXNwbGF5cXVlcnlncmlkTWFwJyxcbiAgICAncmVtb3ZlRW1wdHlDb2x1bW5zRm4nOiAnJj9nbWZEaXNwbGF5cXVlcnlncmlkUmVtb3ZlZW1wdHljb2x1bW5zJyxcbiAgICAnbWF4UmVzdWx0c0ZuJzogJyY/Z21mRGlzcGxheXF1ZXJ5Z3JpZE1heHJlc3VsdHMnLFxuICAgICdtYXhSZWNlbnRlclpvb21Gbic6ICcmP2dtZkRpc3BsYXlxdWVyeWdyaWRNYXhyZWNlbnRlcnpvb20nLFxuICAgICdtZXJnZVRhYnMnOiAnPD9nbWZEaXNwbGF5cXVlcnlncmlkTWVyZ2V0YWJzJ1xuICB9LFxuICB0ZW1wbGF0ZVVybDogZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsXG59O1xubW9kdWxlLmNvbXBvbmVudCgnZ21mRGlzcGxheXF1ZXJ5Z3JpZCcsIHF1ZXJ5R3JpZENvbXBvbmVudCk7XG5leHBvcnQgZnVuY3Rpb24gUXVlcnlHcmlkQ29udHJvbGxlcigkaW5qZWN0b3IsICRzY29wZSwgbmdlb1F1ZXJ5UmVzdWx0LCBuZ2VvTWFwUXVlcmVudCwgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLCAkdGltZW91dCwgbmdlb0NzdkRvd25sb2FkLCAkZWxlbWVudCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciBxdWVyeU9wdGlvbnMgPSAkaW5qZWN0b3IuaGFzKCduZ2VvUXVlcnlPcHRpb25zJykgPyAkaW5qZWN0b3IuZ2V0KCduZ2VvUXVlcnlPcHRpb25zJykgOiB7fTtcbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICB0aGlzLm5nZW9RdWVyeVJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbiAgdGhpcy5uZ2VvTWFwUXVlcmVudF8gPSBuZ2VvTWFwUXVlcmVudDtcbiAgdGhpcy5uZ2VvQ3N2RG93bmxvYWRfID0gbmdlb0NzdkRvd25sb2FkO1xuICB0aGlzLiRlbGVtZW50XyA9ICRlbGVtZW50O1xuICB0aGlzLm1heFJlc3VsdHMgPSBxdWVyeU9wdGlvbnMubGltaXQgIT09IHVuZGVmaW5lZCA/IHF1ZXJ5T3B0aW9ucy5saW1pdCA6IDUwO1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICB0aGlzLnJlbW92ZUVtcHR5Q29sdW1uc18gPSBmYWxzZTtcbiAgdGhpcy5tYXhSZWNlbnRlclpvb207XG4gIHRoaXMubWVyZ2VUYWJzID0ge307XG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuICB0aGlzLmZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgdGhpcy5uZ2VvRmVhdHVyZU92ZXJsYXlNZ3JfID0gbmdlb0ZlYXR1cmVPdmVybGF5TWdyO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgdGhpcy5maWxlbmFtZV8gPSAkaW5qZWN0b3IuaGFzKCdnbWZDc3ZGaWxlbmFtZScpID8gJGluamVjdG9yLmdldCgnZ21mQ3N2RmlsZW5hbWUnKSA6ICdxdWVyeS1yZXN1bHRzLmNzdic7XG4gIHRoaXMubWFwXyA9IG51bGw7XG4gIHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmdlb1F1ZXJ5UmVzdWx0O1xuICB9LCBmdW5jdGlvbiAobmV3UXVlcnlSZXN1bHQsIG9sZFF1ZXJ5UmVzdWx0KSB7XG4gICAgaWYgKG5ld1F1ZXJ5UmVzdWx0ICE9PSBvbGRRdWVyeVJlc3VsdCkge1xuICAgICAgX3RoaXMudXBkYXRlRGF0YV8oKTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IG51bGw7XG59XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVtb3ZlRW1wdHlDb2x1bW5zXyA9IHRoaXNbJ3JlbW92ZUVtcHR5Q29sdW1uc0ZuJ10gPyB0aGlzWydyZW1vdmVFbXB0eUNvbHVtbnNGbiddKCkgPT09IHRydWUgOiBmYWxzZTtcbiAgdGhpcy5tYXhSZWNlbnRlclpvb20gPSB0aGlzWydtYXhSZWNlbnRlclpvb21GbiddID8gdGhpc1snbWF4UmVjZW50ZXJab29tRm4nXSgpIDogdW5kZWZpbmVkO1xuICB2YXIgZmVhdHVyZXNPdmVybGF5ID0gdGhpcy5uZ2VvRmVhdHVyZU92ZXJsYXlNZ3JfLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gIGZlYXR1cmVzT3ZlcmxheS5zZXRGZWF0dXJlcyh0aGlzLmZlYXR1cmVzXyk7XG4gIHZhciBmZWF0dXJlc1N0eWxlID0gdGhpc1snZmVhdHVyZXNTdHlsZUZuJ10oKTtcblxuICBpZiAoZmVhdHVyZXNTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS5hc3NlcnQoZmVhdHVyZXNTdHlsZSBpbnN0YW5jZW9mIG9sU3R5bGVTdHlsZSk7XG4gICAgZmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGZlYXR1cmVzU3R5bGUpO1xuICB9XG5cbiAgdmFyIGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheSA9IHRoaXMubmdlb0ZlYXR1cmVPdmVybGF5TWdyXy5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0RmVhdHVyZXModGhpcy5oaWdobGlnaHRGZWF0dXJlc18pO1xuICB2YXIgaGlnaGxpZ2h0RmVhdHVyZVN0eWxlID0gdGhpc1snc2VsZWN0ZWRGZWF0dXJlU3R5bGVGbiddKCk7XG5cbiAgaWYgKGhpZ2hsaWdodEZlYXR1cmVTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS5hc3NlcnQoaGlnaGxpZ2h0RmVhdHVyZVN0eWxlIGluc3RhbmNlb2Ygb2xTdHlsZVN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsbCA9IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgICBjb2xvcjogWzI1NSwgMCwgMCwgMC42XVxuICAgIH0pO1xuICAgIHZhciBzdHJva2UgPSBuZXcgb2xTdHlsZVN0cm9rZSh7XG4gICAgICBjb2xvcjogWzI1NSwgMCwgMCwgMV0sXG4gICAgICB3aWR0aDogMlxuICAgIH0pO1xuICAgIGhpZ2hsaWdodEZlYXR1cmVTdHlsZSA9IG5ldyBvbFN0eWxlU3R5bGUoe1xuICAgICAgZmlsbDogZmlsbCxcbiAgICAgIGltYWdlOiBuZXcgb2xTdHlsZUNpcmNsZSh7XG4gICAgICAgIGZpbGw6IGZpbGwsXG4gICAgICAgIHJhZGl1czogNSxcbiAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgIH0pLFxuICAgICAgc3Ryb2tlOiBzdHJva2UsXG4gICAgICB6SW5kZXg6IDEwXG4gICAgfSk7XG4gIH1cblxuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0U3R5bGUoaGlnaGxpZ2h0RmVhdHVyZVN0eWxlKTtcbiAgdmFyIG1hcEZuID0gdGhpc1snZ2V0TWFwRm4nXTtcblxuICBpZiAobWFwRm4pIHtcbiAgICB2YXIgbWFwID0gbWFwRm4oKTtcbiAgICBjb25zb2xlLmFzc2VydChtYXAgaW5zdGFuY2VvZiBvbE1hcCk7XG4gICAgdGhpcy5tYXBfID0gbWFwO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRHcmlkU291cmNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgcmV0dXJuIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2VMYWJlbCkge1xuICAgIHJldHVybiBfdGhpczIuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdO1xuICB9KTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZURhdGFfID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMzID0gdGhpcztcblxuICBpZiAoKHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmcgfHwgdGhpcy5uZ2VvUXVlcnlSZXN1bHQudG90YWwgPT09IDApICYmICF0aGlzLmhhc09uZVdpdGhUb29NYW55UmVzdWx0c18oKSkge1xuICAgIHZhciBvbGRBY3RpdmUgPSB0aGlzLmFjdGl2ZTtcbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICBpZiAob2xkQWN0aXZlKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmc7XG4gICAgICB0aGlzLnBlbmRpbmcgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gIHZhciBzb3VyY2VzID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcztcblxuICBpZiAoT2JqZWN0LmtleXModGhpcy5tZXJnZVRhYnMpLmxlbmd0aCA+IDApIHtcbiAgICBzb3VyY2VzID0gdGhpcy5nZXRNZXJnZWRTb3VyY2VzXyhzb3VyY2VzKTtcbiAgfVxuXG4gIHNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS50b29NYW55UmVzdWx0cykge1xuICAgICAgX3RoaXMzLm1ha2VHcmlkXyhudWxsLCBzb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3VyY2UuaWQgPSBfdGhpczMuZXNjYXBlVmFsdWUoc291cmNlLmlkKTtcbiAgICAgIHZhciBmZWF0dXJlcyA9IHNvdXJjZS5mZWF0dXJlcztcblxuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX3RoaXMzLmNvbGxlY3REYXRhXyhzb3VyY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHRoaXMubG9hZGVkR3JpZFNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCB8fCAhKFwiXCIgKyB0aGlzLnNlbGVjdGVkVGFiIGluIHRoaXMuZ3JpZFNvdXJjZXMpKSB7XG4gICAgdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGZpcnN0U291cmNlSWQgPSBfdGhpczMubG9hZGVkR3JpZFNvdXJjZXNbMF07XG5cbiAgICAgIF90aGlzMy5zZWxlY3RUYWIoX3RoaXMzLmdyaWRTb3VyY2VzW2ZpcnN0U291cmNlSWRdKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXMuc29tZShmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgcmV0dXJuIHNvdXJjZS50b29NYW55UmVzdWx0cztcbiAgfSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5lc2NhcGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciB0b0VzY2FwZSA9IC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcIHxdL2c7XG5cbiAgICBpZiAodmFsdWUubWF0Y2godG9Fc2NhcGUpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSh0b0VzY2FwZSwgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNTZWxlY3RlZCA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiID09PSBncmlkU291cmNlLnNvdXJjZS5sYWJlbDtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZXNfID0gZnVuY3Rpb24gKHNvdXJjZXMpIHtcbiAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgdmFyIGFsbFNvdXJjZXMgPSBbXTtcbiAgdmFyIG1lcmdlZFNvdXJjZXMgPSB7fTtcbiAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICB2YXIgbWVyZ2VkU291cmNlID0gX3RoaXM0LmdldE1lcmdlZFNvdXJjZV8oc291cmNlLCBtZXJnZWRTb3VyY2VzKTtcblxuICAgIGlmIChtZXJnZWRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIGFsbFNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yICh2YXIgbWVyZ2VkU291cmNlSWQgaW4gbWVyZ2VkU291cmNlcykge1xuICAgIGFsbFNvdXJjZXMucHVzaChtZXJnZWRTb3VyY2VzW21lcmdlZFNvdXJjZUlkXSk7XG4gIH1cblxuICByZXR1cm4gYWxsU291cmNlcztcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZV8gPSBmdW5jdGlvbiAoc291cmNlLCBtZXJnZWRTb3VyY2VzKSB7XG4gIHZhciBtZXJnZVNvdXJjZUlkID0gbnVsbDtcblxuICBmb3IgKHZhciBjdXJyZW50TWVyZ2VTb3VyY2VJZCBpbiB0aGlzLm1lcmdlVGFicykge1xuICAgIHZhciBzb3VyY2VMYWJlbHMgPSB0aGlzLm1lcmdlVGFic1tjdXJyZW50TWVyZ2VTb3VyY2VJZF07XG4gICAgdmFyIGNvbnRhaW5zU291cmNlID0gc291cmNlTGFiZWxzLnNvbWUoZnVuY3Rpb24gKHNvdXJjZUxhYmVsKSB7XG4gICAgICByZXR1cm4gc291cmNlTGFiZWwgPT0gc291cmNlLmxhYmVsO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvbnRhaW5zU291cmNlKSB7XG4gICAgICBtZXJnZVNvdXJjZUlkID0gY3VycmVudE1lcmdlU291cmNlSWQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAobWVyZ2VTb3VyY2VJZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1lcmdlU291cmNlO1xuXG4gIGlmIChtZXJnZVNvdXJjZUlkIGluIG1lcmdlZFNvdXJjZXMpIHtcbiAgICBtZXJnZVNvdXJjZSA9IG1lcmdlZFNvdXJjZXNbbWVyZ2VTb3VyY2VJZF07XG4gIH0gZWxzZSB7XG4gICAgbWVyZ2VTb3VyY2UgPSB7XG4gICAgICBmZWF0dXJlczogW10sXG4gICAgICBpZDogbWVyZ2VTb3VyY2VJZCxcbiAgICAgIGxhYmVsOiBtZXJnZVNvdXJjZUlkLFxuICAgICAgbGltaXQ6IHRoaXMubWF4UmVzdWx0cyxcbiAgICAgIHBlbmRpbmc6IGZhbHNlLFxuICAgICAgcXVlcmllZDogdHJ1ZSxcbiAgICAgIHRvb01hbnlSZXN1bHRzOiBmYWxzZSxcbiAgICAgIHRvdGFsRmVhdHVyZUNvdW50OiB1bmRlZmluZWRcbiAgICB9O1xuICAgIG1lcmdlZFNvdXJjZXNbbWVyZ2VTb3VyY2VJZF0gPSBtZXJnZVNvdXJjZTtcbiAgfVxuXG4gIHNvdXJjZS5mZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgbWVyZ2VTb3VyY2UuZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgfSk7XG4gIG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzID0gbWVyZ2VTb3VyY2UudG9vTWFueVJlc3VsdHMgfHwgc291cmNlLnRvb01hbnlSZXN1bHRzO1xuXG4gIGlmIChtZXJnZVNvdXJjZS50b29NYW55UmVzdWx0cykge1xuICAgIG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ID0gbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgIT09IHVuZGVmaW5lZCA/IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICsgbWVyZ2VTb3VyY2UuZmVhdHVyZXMubGVuZ3RoIDogbWVyZ2VTb3VyY2UuZmVhdHVyZXMubGVuZ3RoO1xuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzID0gW107XG4gIH1cblxuICBpZiAoc291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA9IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWQgPyBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCArIHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA6IHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudDtcbiAgfVxuXG4gIHJldHVybiBtZXJnZVNvdXJjZTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNvbGxlY3REYXRhXyA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgdmFyIGZlYXR1cmVzID0gc291cmNlLmZlYXR1cmVzO1xuICB2YXIgYWxsUHJvcGVydGllcyA9IFtdO1xuICB2YXIgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyA9IFtdO1xuICB2YXIgZmVhdHVyZXNGb3JTb3VyY2UgPSB7fTtcbiAgdmFyIHByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyeU5hbWU7XG4gIGZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICBwcm9wZXJ0aWVzID0gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XG5cbiAgICBpZiAocHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmZWF0dXJlR2VvbWV0cnlOYW1lID0gZmVhdHVyZS5nZXRHZW9tZXRyeU5hbWUoKTtcblxuICAgICAgaWYgKGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuaW5kZXhPZihmZWF0dXJlR2VvbWV0cnlOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5wdXNoKGZlYXR1cmVHZW9tZXRyeU5hbWUpO1xuICAgICAgfVxuXG4gICAgICBhbGxQcm9wZXJ0aWVzLnB1c2gocHJvcGVydGllcyk7XG4gICAgICBmZWF0dXJlc0ZvclNvdXJjZVtnZXRSb3dVaWQocHJvcGVydGllcyldID0gZmVhdHVyZTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLmNsZWFuUHJvcGVydGllc18oYWxsUHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyk7XG5cbiAgaWYgKGFsbFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBncmlkQ3JlYXRlZCA9IHRoaXMubWFrZUdyaWRfKGFsbFByb3BlcnRpZXMsIHNvdXJjZSk7XG5cbiAgICBpZiAoZ3JpZENyZWF0ZWQpIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tcIlwiICsgc291cmNlLmxhYmVsXSA9IGZlYXR1cmVzRm9yU291cmNlO1xuICAgIH1cbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYW5Qcm9wZXJ0aWVzXyA9IGZ1bmN0aW9uIChhbGxQcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cmllc05hbWVzKSB7XG4gIGFsbFByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydGllcykge1xuICAgIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZUdlb21ldHJ5TmFtZSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbZmVhdHVyZUdlb21ldHJ5TmFtZV07XG4gICAgfSk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXNbJ2JvdW5kZWRCeSddO1xuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzWyduZ2VvX2ZlYXR1cmVfdHlwZV8nXTtcbiAgfSk7XG5cbiAgaWYgKHRoaXMucmVtb3ZlRW1wdHlDb2x1bW5zXyA9PT0gdHJ1ZSkge1xuICAgIHRoaXMucmVtb3ZlRW1wdHlDb2x1bW5zRm5fKGFsbFByb3BlcnRpZXMpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVFbXB0eUNvbHVtbnNGbl8gPSBmdW5jdGlvbiAoYWxsUHJvcGVydGllcykge1xuICB2YXIga2V5c1RvS2VlcCA9IFtdO1xuICB2YXIgaSwga2V5O1xuXG4gIGZvciAoa2V5IGluIGFsbFByb3BlcnRpZXNbMF0pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsbFByb3BlcnRpZXNbaV1ba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXNUb0tlZXAucHVzaChrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIga2V5VG9SZW1vdmU7XG4gIGFsbFByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydGllcykge1xuICAgIGtleVRvUmVtb3ZlID0gW107XG5cbiAgICBmb3IgKGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoa2V5c1RvS2VlcC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgIGtleVRvUmVtb3ZlLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlUb1JlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2tleV07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUubWFrZUdyaWRfID0gZnVuY3Rpb24gKGRhdGEsIHNvdXJjZSkge1xuICB2YXIgc291cmNlTGFiZWwgPSBcIlwiICsgc291cmNlLmxhYmVsO1xuICB2YXIgZ3JpZENvbmZpZyA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICBncmlkQ29uZmlnID0gdGhpcy5nZXRHcmlkQ29uZmlndXJhdGlvbl8oZGF0YSk7XG5cbiAgICBpZiAoZ3JpZENvbmZpZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLmluZGV4T2Yoc291cmNlTGFiZWwpID09IC0xKSB7XG4gICAgdGhpcy5sb2FkZWRHcmlkU291cmNlcy5wdXNoKHNvdXJjZUxhYmVsKTtcbiAgfVxuXG4gIHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdID0ge1xuICAgIGNvbmZpZ3VyYXRpb246IGdyaWRDb25maWcsXG4gICAgc291cmNlOiBzb3VyY2VcbiAgfTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRHcmlkQ29uZmlndXJhdGlvbl8gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zb2xlLmFzc2VydChkYXRhLmxlbmd0aCA+IDApO1xuICB2YXIgY2xvbmUgPSB7fTtcbiAgT2JqZWN0LmFzc2lnbihjbG9uZSwgZGF0YVswXSk7XG4gIGRlbGV0ZSBjbG9uZS5vbF91aWQ7XG4gIHZhciBjb2x1bW5zID0gT2JqZWN0LmtleXMoY2xvbmUpO1xuICB2YXIgY29sdW1uRGVmcyA9IFtdO1xuICBjb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbikge1xuICAgIGNvbHVtbkRlZnMucHVzaCh7XG4gICAgICBuYW1lOiBjb2x1bW5cbiAgICB9KTtcbiAgfSk7XG5cbiAgaWYgKGNvbHVtbkRlZnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBuZXcgbmdlb0dyaWRDb25maWcoZGF0YSwgY29sdW1uRGVmcyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICB0aGlzLnRvb01hbnlSZXN1bHRzID0gZmFsc2U7XG4gIHRoaXMuZmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMubmdlb01hcFF1ZXJlbnRfLmNsZWFyKCk7XG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuXG4gIGlmICh0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXykge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKCk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdFRhYiA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gIHZhciBzb3VyY2UgPSBncmlkU291cmNlLnNvdXJjZTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IHNvdXJjZS5sYWJlbDtcblxuICBpZiAodGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8pIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXygpO1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gbnVsbDtcbiAgfVxuXG4gIGlmIChncmlkU291cmNlLmNvbmZpZ3VyYXRpb24gIT09IG51bGwpIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBncmlkU291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRSb3dzO1xuICAgIH0sIGZ1bmN0aW9uIChuZXdTZWxlY3RlZCwgb2xkU2VsZWN0ZWRSb3dzKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMobmV3U2VsZWN0ZWQpICE9PSBPYmplY3Qua2V5cyhvbGRTZWxlY3RlZFJvd3MpKSB7XG4gICAgICAgIF90aGlzNS5vblNlbGVjdGlvbkNoYW5nZWRfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUZlYXR1cmVzXyhncmlkU291cmNlKTtcbiAgdGhpcy5yZWZsb3dHcmlkXygpO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUucmVmbG93R3JpZF8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9IHRoaXMuZXNjYXBlVmFsdWUodGhpcy5zZWxlY3RlZFRhYiB8fCAnJyk7XG4gIHZhciBhY3RpdmVQYW5lID0gdGhpcy4kZWxlbWVudF8uZmluZChcImRpdi50YWItcGFuZSNcIiArIGlkKTtcbiAgYWN0aXZlUGFuZS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgYWN0aXZlUGFuZS5maW5kKCdkaXYubmdlby1ncmlkLXRhYmxlLWNvbnRhaW5lciB0YWJsZScpWyd0cmlnZ2VyJ10oJ3JlZmxvdycpO1xuICB9KTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLm9uU2VsZWN0aW9uQ2hhbmdlZF8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGdyaWRTb3VyY2UgPSB0aGlzLmdyaWRTb3VyY2VzW1wiXCIgKyB0aGlzLnNlbGVjdGVkVGFiXTtcbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICB0aGlzLmZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5jbGVhcigpO1xuXG4gIGlmIChncmlkU291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc291cmNlTGFiZWwgPSBcIlwiICsgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWw7XG4gIHZhciBmZWF0dXJlc0ZvclNvdXJjZSA9IHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tzb3VyY2VMYWJlbF07XG4gIHZhciBzZWxlY3RlZFJvd3MgPSBncmlkU291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRSb3dzO1xuXG4gIGZvciAodmFyIHJvd0lkIGluIGZlYXR1cmVzRm9yU291cmNlKSB7XG4gICAgdmFyIGZlYXR1cmUgPSBmZWF0dXJlc0ZvclNvdXJjZVtyb3dJZF07XG5cbiAgICBpZiAocm93SWQgaW4gc2VsZWN0ZWRSb3dzKSB7XG4gICAgICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5wdXNoKGZlYXR1cmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZlYXR1cmVzXy5wdXNoKGZlYXR1cmUpO1xuICAgIH1cbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0QWN0aXZlR3JpZFNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkU291cmNlc1tcIlwiICsgdGhpcy5zZWxlY3RlZFRhYl07XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmlzT25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlID09PSBudWxsIHx8IHNvdXJjZS5jb25maWd1cmF0aW9uID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZENvdW50KCkgPiAwO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRTZWxlY3RlZFJvd0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZENvdW50KCk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RBbGwoKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudW5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24udW5zZWxlY3RBbGwoKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaW52ZXJ0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLmludmVydFNlbGVjdGlvbigpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS56b29tVG9TZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgdmFyIGV4dGVudCA9IG9sRXh0ZW50LmNyZWF0ZUVtcHR5KCk7XG4gICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgb2xFeHRlbnQuZXh0ZW5kKGV4dGVudCwgZmVhdHVyZS5nZXRHZW9tZXRyeSgpLmdldEV4dGVudCgpKTtcbiAgICB9KTtcbiAgICB2YXIgc2l6ZSA9IHRoaXMubWFwXy5nZXRTaXplKCk7XG4gICAgY29uc29sZS5hc3NlcnQoc2l6ZSAhPT0gdW5kZWZpbmVkKTtcbiAgICB2YXIgbWF4Wm9vbSA9IHRoaXMubWF4UmVjZW50ZXJab29tO1xuICAgIHRoaXMubWFwXy5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgIG1heFpvb206IG1heFpvb21cbiAgICB9KTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZG93bmxvYWRDc3YgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgdmFyIGNvbHVtbkRlZnMgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5jb2x1bW5EZWZzO1xuICAgIGNvbnNvbGUuYXNzZXJ0KGNvbHVtbkRlZnMgIT09IHVuZGVmaW5lZCk7XG4gICAgdmFyIHNlbGVjdGVkUm93cyA9IHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkUm93cygpO1xuICAgIHRoaXMubmdlb0NzdkRvd25sb2FkXy5zdGFydERvd25sb2FkKHNlbGVjdGVkUm93cywgY29sdW1uRGVmcywgdGhpcy5maWxlbmFtZV8pO1xuICB9XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXInLCBRdWVyeUdyaWRDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9