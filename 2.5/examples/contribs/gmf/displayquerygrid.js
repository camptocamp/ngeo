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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./contribs/gmf/examples/url.js");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayquerygrid.css */ "./contribs/gmf/examples/displayquerygrid.css");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gmf-hidden.inc.css */ "./contribs/gmf/examples/gmf-hidden.inc.css");
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/datasource/Manager.js */ "./contribs/gmf/src/datasource/Manager.js");
/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/layertree/component.js */ "./contribs/gmf/src/layertree/component.js");
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/query/gridComponent.js */ "./contribs/gmf/src/query/gridComponent.js");
/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/theme/Themes.js */ "./contribs/gmf/src/theme/Themes.js");
/* harmony import */ var ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/grid/module.js */ "./src/grid/module.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ "./src/misc/btnComponent.js");
/* harmony import */ var _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var ngeo_query_component_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/component.js */ "./src/query/component.js");
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






















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_11__["default"].name, ngeo_query_component_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);
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
      projection: _geoblocks_proj_src_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_12__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
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
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="gmf-displayquerygrid panel" ng-show="ctrl.active">\n  <div\n    class="close"\n    ng-click="ctrl.clear()">\n    &times;\n  </div>\n\n  <ul\n    class="nav nav-pills"\n    role="tablist">\n\n    <li\n      class="nav-item"\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="presentation"\n      ng-click="ctrl.selectTab(gridSource)">\n\n      <a\n        class="nav-link"\n        href="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n        data-target="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        aria-controls="{{ctrl.escapeValue(gridSource.source.label)}}"\n        role="tab"\n        data-toggle="tab">\n\n        <span ng-if="gridSource.source.tooManyResults !== true">\n          {{gridSource.source.label | translate}} ({{gridSource.source.features.length}})\n        </span>\n        <span ng-if="gridSource.source.tooManyResults === true">\n          {{gridSource.source.label | translate}} ({{gridSource.source.totalFeatureCount}}*)\n        </span>\n      </a>\n    </li>\n  </ul>\n\n  <div class="tab-content">\n    <div\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="tabpanel"\n      class="tab-pane"\n      ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n      id="{{ctrl.escapeValue(gridSource.source.label)}}">\n\n      <ngeo-grid\n        ngeo-grid-configuration="gridSource.configuration"\n        ng-if="gridSource.source.tooManyResults !== true">\n      </ngeo-grid>\n\n      <div ng-if="gridSource.source.tooManyResults === true">\n        <div class="gmf-displayquerygrid-message alert alert-warning">\n          <p><span translate>The results can not be displayed because the maximum number has been reached</span> ({{gridSource.source.limit}}).</p>\n          <p translate>Please refine your query.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div ng-show="!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null">\n\n    <ul class="nav justify-content-end">\n\n      <li\n        class="ng-hide"\n        ng-show="ctrl.isOneSelected()">\n        <div class="btn btn-sm ng-binding">\n          {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>\n        </div>\n      </li>\n\n      <li\n        ng-show="ctrl.isOneSelected()"\n        class="ng-hide">\n        <button\n          class="btn btn-link btn-sm"\n          title="{{\'Zoom to selection\' | translate}}"\n          ng-click="ctrl.zoomToSelection()">\n          <i class="fa fa-search-plus"></i> <span translate>Zoom to</span>\n        </button>\n      </li>\n\n      <li\n        ng-show="ctrl.isOneSelected()"\n        class="ng-hide">\n        <button\n          class="btn btn-link btn-sm"\n          title="{{\'Export selection as CSV\' | translate}}"\n          ng-click="ctrl.downloadCsv()">\n          <i class="fa fa-download"></i> <span translate>Export as CSV</span>\n        </button>\n      </li>\n\n      <li class="dropdown">\n        <button\n          type="button"\n          class="dropup btn btn-default btn-sm dropdown-toggle"\n          data-toggle="dropdown"\n          aria-haspopup="true"\n          aria-expanded="false">\n          <span translate>Select</span>\n        </button>\n        <ul\n          class="dropdown-menu"\n          aria-labelledby="dLabel">\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.selectAll()" translate>All</a>\n          </li>\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.unselectAll()" translate>None</a>\n          </li>\n          <li>\n            <a\n              href=""\n              ng-click="ctrl.invertSelection()" translate>Reverse selection</a>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div ng-show="ctrl.pending" class="spinner-grid">\n    <i class="fa fa-spin">\n      ' +
((__t = (__webpack_require__(/*! gmf/icons/spinner.svg?viewbox&height=3rem */ "./contribs/gmf/src/icons/spinner.svg?viewbox&height=3rem"))) == null ? '' : __t) +
'\n    </i>\n  </div>\n</div>\n';

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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
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
  var templateUrl = $attrs.gmfDisplayquerygridTemplateurl;
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
    if (ngeoQueryResult.pending) {
      _this.active = true;
      _this.pending = true;
    }

    if (newQueryResult !== oldQueryResult) {
      _this.updateData_();
    }
  });
  this.unregisterSelectWatcher_ = null;

  this.removeEmptyColumnsFn = function () {
    return false;
  };

  this.maxRecenterZoomFn = function () {
    return undefined;
  };

  this.featuresStyleFn = null;
  this.selectedFeatureStyleFn = null;
  this.getMapFn = null;
}

QueryGridController.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }

  if (!this.featuresStyleFn) {
    throw new Error('Missing featuresStyleFn');
  }

  if (!this.selectedFeatureStyleFn) {
    throw new Error('Missing selectedFeatureStyleFn');
  }

  this.removeEmptyColumns_ = this.removeEmptyColumnsFn();
  this.maxRecenterZoom = this.maxRecenterZoomFn();
  var featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  var featuresStyle = this.featuresStyleFn();

  if (featuresStyle !== undefined) {
    if (!(featuresStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"])) {
      throw new Error('Wrong featuresStyle type');
    }

    featuresOverlay.setStyle(featuresStyle);
  }

  var highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  var highlightFeatureStyle = this.selectedFeatureStyleFn();

  if (highlightFeatureStyle !== undefined) {
    if (!(highlightFeatureStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__["default"])) {
      throw new Error('Wrong highlightFeatureStyle type');
    }
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
  var mapFn = this.getMapFn;

  if (mapFn) {
    var map = mapFn();

    if (!(map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_9__["default"])) {
      throw new Error('Wrong map type');
    }

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
      tooManyResults: false
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

      if (!featureGeometriesNames.includes(featureGeometryName)) {
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
    delete properties.boundedBy;
    delete properties.ngeo_feature_type_;
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
      if (!keysToKeep.includes(key)) {
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

  if (!this.loadedGridSources.includes(sourceLabel)) {
    this.loadedGridSources.push(sourceLabel);
  }

  this.gridSources[sourceLabel] = {
    source: source
  };

  if (gridConfig) {
    this.gridSources[sourceLabel].configuration = gridConfig;
  }

  return true;
};

QueryGridController.prototype.getGridConfiguration_ = function (data) {
  if (!data.length) {
    throw new Error('Missing data');
  }

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

  if (gridSource.configuration !== undefined) {
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
    activePane.find('div.ngeo-grid-table-container table').trigger('reflow');
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

  if (!gridSource.configuration) {
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
  if (!this.map_) {
    throw new Error('Missing map');
  }

  var source = this.getActiveGridSource();

  if (source !== null) {
    var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_8__["createEmpty"]();
    this.highlightFeatures_.forEach(function (feature) {
      var geometry = feature.getGeometry();

      if (!geometry) {
        throw new Error('Missing geometry');
      }

      ol_extent_js__WEBPACK_IMPORTED_MODULE_8__["extend"](extent, geometry.getExtent());
    });
    var size = this.map_.getSize();

    if (!size) {
      throw new Error('Missing size');
    }

    this.map_.getView().fit(extent, {
      size: size,
      maxZoom: this.maxRecenterZoom
    });
  }
};

QueryGridController.prototype.downloadCsv = function () {
  var source = this.getActiveGridSource();

  if (source !== null) {
    var columnDefs = source.configuration.columnDefs;

    if (!columnDefs) {
      throw new Error('Missing columnDefs');
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL3F1ZXJ5L2dyaWRDb21wb25lbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRpc3BsYXlxdWVyeWdyaWRcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbNCxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiZ21mVGhlbWVzXCIsIFwiZ21mRGF0YVNvdXJjZXNNYW5hZ2VyXCIsIFwibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCJdO1xuUXVlcnlyZXN1bHRDb250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvUXVlcnlSZXN1bHRcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhcHBVUkwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL2Rpc3BsYXlxdWVyeWdyaWQuY3NzJztcbmltcG9ydCAnLi9nbWYtaGlkZGVuLmluYy5jc3MnO1xuaW1wb3J0IGdtZkRhdGFzb3VyY2VNYW5hZ2VyIGZyb20gJ2dtZi9kYXRhc291cmNlL01hbmFnZXIuanMnO1xuaW1wb3J0IGdtZkxheWVydHJlZUNvbXBvbmVudCBmcm9tICdnbWYvbGF5ZXJ0cmVlL2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mTWFwQ29tcG9uZW50IGZyb20gJ2dtZi9tYXAvY29tcG9uZW50LmpzJztcbmltcG9ydCBnbWZRdWVyeUdyaWRDb21wb25lbnQgZnJvbSAnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZlRoZW1lVGhlbWVzIGZyb20gJ2dtZi90aGVtZS9UaGVtZXMuanMnO1xuaW1wb3J0IG5nZW9HcmlkTW9kdWxlIGZyb20gJ25nZW8vZ3JpZC9tb2R1bGUuanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWlzY0J0bkNvbXBvbmVudCBmcm9tICduZ2VvL21pc2MvYnRuQ29tcG9uZW50LmpzJztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICdAZ2VvYmxvY2tzL3Byb2ovc3JjL0VQU0dfMjA1Ni5qcyc7XG5pbXBvcnQgbmdlb1F1ZXJ5Q29tcG9uZW50IGZyb20gJ25nZW8vcXVlcnkvY29tcG9uZW50LmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZmFwcCcsIFsnZ2V0dGV4dCcsIGdtZkRhdGFzb3VyY2VNYW5hZ2VyLm5hbWUsIGdtZkxheWVydHJlZUNvbXBvbmVudC5uYW1lLCBnbWZNYXBDb21wb25lbnQubmFtZSwgZ21mUXVlcnlHcmlkQ29tcG9uZW50Lm5hbWUsIGdtZlRoZW1lVGhlbWVzLm5hbWUsIG5nZW9HcmlkTW9kdWxlLm5hbWUsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01pc2NCdG5Db21wb25lbnQubmFtZSwgbmdlb1F1ZXJ5Q29tcG9uZW50Lm5hbWVdKTtcbm1vZHVsZS5jb25zdGFudCgnbmdlb1F1ZXJ5T3B0aW9ucycsIHtcbiAgJ2xpbWl0JzogMjAsXG4gICdxdWVyeUNvdW50Rmlyc3QnOiB0cnVlXG59KTtcbm1vZHVsZS5jb25zdGFudCgnZ21mVHJlZVVybCcsIGFwcFVSTC5HTUZfVEhFTUVTKTtcbm1vZHVsZS5jb25zdGFudCgnZGVmYXVsdFRoZW1lJywgJ0RlbW8nKTtcbm1vZHVsZS5jb25zdGFudCgnYW5ndWxhckxvY2FsZVNjcmlwdCcsICcuLi9idWlsZC9hbmd1bGFyLWxvY2FsZV97e2xvY2FsZX19LmpzJyk7XG52YXIgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sJylcbn07XG5tb2R1bGUuY29tcG9uZW50KCdnbWZhcHBRdWVyeXJlc3VsdCcsIHF1ZXJ5cmVzdWx0Q29tcG9uZW50KTtcblxuZnVuY3Rpb24gUXVlcnlyZXN1bHRDb250cm9sbGVyKG5nZW9RdWVyeVJlc3VsdCkge1xuICB0aGlzLnJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbn1cblxubW9kdWxlLmNvbnRyb2xsZXIoJ2dtZmFwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlRoZW1lcywgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBnbWZUaGVtZXMubG9hZFRoZW1lcygpO1xuICB2YXIgZmlsbCA9IG5ldyBvbFN0eWxlRmlsbCh7XG4gICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XVxuICB9KTtcbiAgdmFyIHN0cm9rZSA9IG5ldyBvbFN0eWxlU3Ryb2tlKHtcbiAgICBjb2xvcjogWzI1NSwgMTcwLCAwLCAxXSxcbiAgICB3aWR0aDogMlxuICB9KTtcbiAgdGhpcy5mZWF0dXJlU3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICBmaWxsOiBmaWxsLFxuICAgIGltYWdlOiBuZXcgb2xTdHlsZUNpcmNsZSh7XG4gICAgICBmaWxsOiBmaWxsLFxuICAgICAgcmFkaXVzOiA1LFxuICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICB9KSxcbiAgICBzdHJva2U6IHN0cm9rZVxuICB9KTtcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM3NjM1LCAxMTUyNjQwXSxcbiAgICAgIHpvb206IDNcbiAgICB9KVxuICB9KTtcbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERhdGFzb3VyY2VNYXAodGhpcy5tYXApO1xuICB0aGlzLnRoZW1lcyA9IHVuZGVmaW5lZDtcbiAgdGhpcy50cmVlU291cmNlID0gdW5kZWZpbmVkO1xuICB0aGlzLnF1ZXJ5QWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5xdWVyeUdyaWRBY3RpdmUgPSB0cnVlO1xuICBnbWZUaGVtZXMuZ2V0VGhlbWVzT2JqZWN0KCkudGhlbihmdW5jdGlvbiAodGhlbWVzKSB7XG4gICAgaWYgKHRoZW1lcykge1xuICAgICAgX3RoaXMudGhlbWVzID0gdGhlbWVzO1xuICAgICAgX3RoaXMudHJlZVNvdXJjZSA9IHRoZW1lc1szXTtcbiAgICB9XG4gIH0pO1xuICBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IuaW5pdCh0aGlzLm1hcCk7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwiZ21mLWRpc3BsYXlxdWVyeWdyaWQgcGFuZWxcIiBuZy1zaG93PVwiY3RybC5hY3RpdmVcIj5cXG4gIDxkaXZcXG4gICAgY2xhc3M9XCJjbG9zZVwiXFxuICAgIG5nLWNsaWNrPVwiY3RybC5jbGVhcigpXCI+XFxuICAgICZ0aW1lcztcXG4gIDwvZGl2PlxcblxcbiAgPHVsXFxuICAgIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiXFxuICAgIHJvbGU9XCJ0YWJsaXN0XCI+XFxuXFxuICAgIDxsaVxcbiAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxcbiAgICAgIG5nLXJlcGVhdD1cImdyaWRTb3VyY2UgaW4gY3RybC5nZXRHcmlkU291cmNlcygpIHRyYWNrIGJ5IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsXCJcXG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcXG4gICAgICBuZy1jbGljaz1cImN0cmwuc2VsZWN0VGFiKGdyaWRTb3VyY2UpXCI+XFxuXFxuICAgICAgPGFcXG4gICAgICAgIGNsYXNzPVwibmF2LWxpbmtcIlxcbiAgICAgICAgaHJlZj1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxcbiAgICAgICAgbmctY2xhc3M9XCJ7XFwnYWN0aXZlXFwnIDogY3RybC5pc1NlbGVjdGVkKGdyaWRTb3VyY2UpfVwiXFxuICAgICAgICBkYXRhLXRhcmdldD1cIiN7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxcbiAgICAgICAgYXJpYS1jb250cm9scz1cInt7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXFxuICAgICAgICByb2xlPVwidGFiXCJcXG4gICAgICAgIGRhdGEtdG9nZ2xlPVwidGFiXCI+XFxuXFxuICAgICAgICA8c3BhbiBuZy1pZj1cImdyaWRTb3VyY2Uuc291cmNlLnRvb01hbnlSZXN1bHRzICE9PSB0cnVlXCI+XFxuICAgICAgICAgIHt7Z3JpZFNvdXJjZS5zb3VyY2UubGFiZWwgfCB0cmFuc2xhdGV9fSAoe3tncmlkU291cmNlLnNvdXJjZS5mZWF0dXJlcy5sZW5ndGh9fSlcXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiZ3JpZFNvdXJjZS5zb3VyY2UudG9vTWFueVJlc3VsdHMgPT09IHRydWVcIj5cXG4gICAgICAgICAge3tncmlkU291cmNlLnNvdXJjZS5sYWJlbCB8IHRyYW5zbGF0ZX19ICh7e2dyaWRTb3VyY2Uuc291cmNlLnRvdGFsRmVhdHVyZUNvdW50fX0qKVxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgIDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cXG4gICAgPGRpdlxcbiAgICAgIG5nLXJlcGVhdD1cImdyaWRTb3VyY2UgaW4gY3RybC5nZXRHcmlkU291cmNlcygpIHRyYWNrIGJ5IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsXCJcXG4gICAgICByb2xlPVwidGFicGFuZWxcIlxcbiAgICAgIGNsYXNzPVwidGFiLXBhbmVcIlxcbiAgICAgIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxcbiAgICAgIGlkPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCI+XFxuXFxuICAgICAgPG5nZW8tZ3JpZFxcbiAgICAgICAgbmdlby1ncmlkLWNvbmZpZ3VyYXRpb249XCJncmlkU291cmNlLmNvbmZpZ3VyYXRpb25cIlxcbiAgICAgICAgbmctaWY9XCJncmlkU291cmNlLnNvdXJjZS50b29NYW55UmVzdWx0cyAhPT0gdHJ1ZVwiPlxcbiAgICAgIDwvbmdlby1ncmlkPlxcblxcbiAgICAgIDxkaXYgbmctaWY9XCJncmlkU291cmNlLnNvdXJjZS50b29NYW55UmVzdWx0cyA9PT0gdHJ1ZVwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImdtZi1kaXNwbGF5cXVlcnlncmlkLW1lc3NhZ2UgYWxlcnQgYWxlcnQtd2FybmluZ1wiPlxcbiAgICAgICAgICA8cD48c3BhbiB0cmFuc2xhdGU+VGhlIHJlc3VsdHMgY2FuIG5vdCBiZSBkaXNwbGF5ZWQgYmVjYXVzZSB0aGUgbWF4aW11bSBudW1iZXIgaGFzIGJlZW4gcmVhY2hlZDwvc3Bhbj4gKHt7Z3JpZFNvdXJjZS5zb3VyY2UubGltaXR9fSkuPC9wPlxcbiAgICAgICAgICA8cCB0cmFuc2xhdGU+UGxlYXNlIHJlZmluZSB5b3VyIHF1ZXJ5LjwvcD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblxcbiAgPGRpdiBuZy1zaG93PVwiIWN0cmwucGVuZGluZyAmJiBjdHJsLmdldEFjdGl2ZUdyaWRTb3VyY2UoKSAmJiBjdHJsLmdldEFjdGl2ZUdyaWRTb3VyY2UoKS5jb25maWd1cmF0aW9uICE9PSBudWxsXCI+XFxuXFxuICAgIDx1bCBjbGFzcz1cIm5hdiBqdXN0aWZ5LWNvbnRlbnQtZW5kXCI+XFxuXFxuICAgICAgPGxpXFxuICAgICAgICBjbGFzcz1cIm5nLWhpZGVcIlxcbiAgICAgICAgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuIGJ0bi1zbSBuZy1iaW5kaW5nXCI+XFxuICAgICAgICAgIHt7Y3RybC5nZXRTZWxlY3RlZFJvd0NvdW50KCl9fSA8c3BhbiB0cmFuc2xhdGU+c2VsZWN0ZWQgZWxlbWVudChzKTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvbGk+XFxuXFxuICAgICAgPGxpXFxuICAgICAgICBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIlxcbiAgICAgICAgY2xhc3M9XCJuZy1oaWRlXCI+XFxuICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGJ0bi1zbVwiXFxuICAgICAgICAgIHRpdGxlPVwie3tcXCdab29tIHRvIHNlbGVjdGlvblxcJyB8IHRyYW5zbGF0ZX19XCJcXG4gICAgICAgICAgbmctY2xpY2s9XCJjdHJsLnpvb21Ub1NlbGVjdGlvbigpXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoLXBsdXNcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5ab29tIHRvPC9zcGFuPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9saT5cXG5cXG4gICAgICA8bGlcXG4gICAgICAgIG5nLXNob3c9XCJjdHJsLmlzT25lU2VsZWN0ZWQoKVwiXFxuICAgICAgICBjbGFzcz1cIm5nLWhpZGVcIj5cXG4gICAgICAgIDxidXR0b25cXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcXG4gICAgICAgICAgdGl0bGU9XCJ7e1xcJ0V4cG9ydCBzZWxlY3Rpb24gYXMgQ1NWXFwnIHwgdHJhbnNsYXRlfX1cIlxcbiAgICAgICAgICBuZy1jbGljaz1cImN0cmwuZG93bmxvYWRDc3YoKVwiPlxcbiAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWRvd25sb2FkXCI+PC9pPiA8c3BhbiB0cmFuc2xhdGU+RXhwb3J0IGFzIENTVjwvc3Bhbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDwvbGk+XFxuXFxuICAgICAgPGxpIGNsYXNzPVwiZHJvcGRvd25cIj5cXG4gICAgICAgIDxidXR0b25cXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXFxuICAgICAgICAgIGNsYXNzPVwiZHJvcHVwIGJ0biBidG4tZGVmYXVsdCBidG4tc20gZHJvcGRvd24tdG9nZ2xlXCJcXG4gICAgICAgICAgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXFxuICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XFxuICAgICAgICAgIDxzcGFuIHRyYW5zbGF0ZT5TZWxlY3Q8L3NwYW4+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgIDx1bFxcbiAgICAgICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIlxcbiAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJkTGFiZWxcIj5cXG4gICAgICAgICAgPGxpPlxcbiAgICAgICAgICAgIDxhXFxuICAgICAgICAgICAgICBocmVmPVwiXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC5zZWxlY3RBbGwoKVwiIHRyYW5zbGF0ZT5BbGw8L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICA8YVxcbiAgICAgICAgICAgICAgaHJlZj1cIlwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwudW5zZWxlY3RBbGwoKVwiIHRyYW5zbGF0ZT5Ob25lPC9hPlxcbiAgICAgICAgICA8L2xpPlxcbiAgICAgICAgICA8bGk+XFxuICAgICAgICAgICAgPGFcXG4gICAgICAgICAgICAgIGhyZWY9XCJcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCJjdHJsLmludmVydFNlbGVjdGlvbigpXCIgdHJhbnNsYXRlPlJldmVyc2Ugc2VsZWN0aW9uPC9hPlxcbiAgICAgICAgICA8L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICA8L2xpPlxcbiAgICA8L3VsPlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IG5nLXNob3c9XCJjdHJsLnBlbmRpbmdcIiBjbGFzcz1cInNwaW5uZXItZ3JpZFwiPlxcbiAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5cIj5cXG4gICAgICAnICtcbigoX190ID0gKHJlcXVpcmUoJ2dtZi9pY29ucy9zcGlubmVyLnN2Zz92aWV3Ym94JmhlaWdodD0zcmVtJykpKSA9PSBudWxsID8gJycgOiBfX3QpICtcbidcXG4gICAgPC9pPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIlF1ZXJ5R3JpZENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRpbmplY3RvclwiLCBcIiRzY29wZVwiLCBcIm5nZW9RdWVyeVJlc3VsdFwiLCBcIm5nZW9NYXBRdWVyZW50XCIsIFwibmdlb0ZlYXR1cmVPdmVybGF5TWdyXCIsIFwiJHRpbWVvdXRcIiwgXCJuZ2VvQ3N2RG93bmxvYWRcIiwgXCIkZWxlbWVudFwiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9Eb3dubG9hZENzdiBmcm9tICduZ2VvL2Rvd25sb2FkL0Nzdi5qcyc7XG5pbXBvcnQgbmdlb0Rvd25sb2FkU2VydmljZSBmcm9tICduZ2VvL2Rvd25sb2FkL3NlcnZpY2UuanMnO1xuaW1wb3J0IG5nZW9HcmlkQ29tcG9uZW50IGZyb20gJ25nZW8vZ3JpZC9jb21wb25lbnQuanMnO1xuaW1wb3J0IG5nZW9HcmlkQ29uZmlnLCB7IGdldFJvd1VpZCB9IGZyb20gJ25nZW8vZ3JpZC9Db25maWcuanMnO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1nci5qcyc7XG5pbXBvcnQgbmdlb1F1ZXJ5TWFwUXVlcmVudCBmcm9tICduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQuanMnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uLmpzJztcbmltcG9ydCAqIGFzIG9sRXh0ZW50IGZyb20gJ29sL2V4dGVudC5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9zcmMvZHJvcGRvd24uanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZRdWVyeUdyaWRDb21wb25lbnQnLCBbbmdlb0Rvd25sb2FkQ3N2Lm5hbWUsIG5nZW9Eb3dubG9hZFNlcnZpY2UubmFtZSwgbmdlb0dyaWRDb21wb25lbnQubmFtZSwgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLm5hbWUsIG5nZW9RdWVyeU1hcFF1ZXJlbnQubmFtZV0pO1xubW9kdWxlLnZhbHVlKCdnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoJGVsZW1lbnQsICRhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSAkYXR0cnMuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRldXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9xdWVyeS9ncmlkQ29tcG9uZW50Jztcbn0pO1xubW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbiAoJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCcsIHJlcXVpcmUoJy4vZ3JpZENvbXBvbmVudC5odG1sJykpO1xufV0pO1xuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRhdHRyc1wiLCBcImdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybFwiXTtcblxuZnVuY3Rpb24gZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMsIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsKCRlbGVtZW50LCAkYXR0cnMpO1xufVxuXG52YXIgcXVlcnlHcmlkQ29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXIgYXMgY3RybCcsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ2FjdGl2ZSc6ICc9P2dtZkRpc3BsYXlxdWVyeWdyaWRBY3RpdmUnLFxuICAgICdmZWF0dXJlc1N0eWxlRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRGZWF0dXJlc3N0eWxlJyxcbiAgICAnc2VsZWN0ZWRGZWF0dXJlU3R5bGVGbic6ICcmZ21mRGlzcGxheXF1ZXJ5Z3JpZFNlbGVjdGVkZmVhdHVyZXN0eWxlJyxcbiAgICAnZ2V0TWFwRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRNYXAnLFxuICAgICdyZW1vdmVFbXB0eUNvbHVtbnNGbic6ICcmP2dtZkRpc3BsYXlxdWVyeWdyaWRSZW1vdmVlbXB0eWNvbHVtbnMnLFxuICAgICdtYXhSZXN1bHRzRm4nOiAnJj9nbWZEaXNwbGF5cXVlcnlncmlkTWF4cmVzdWx0cycsXG4gICAgJ21heFJlY2VudGVyWm9vbUZuJzogJyY/Z21mRGlzcGxheXF1ZXJ5Z3JpZE1heHJlY2VudGVyem9vbScsXG4gICAgJ21lcmdlVGFicyc6ICc8P2dtZkRpc3BsYXlxdWVyeWdyaWRNZXJnZXRhYnMnXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxcbn07XG5tb2R1bGUuY29tcG9uZW50KCdnbWZEaXNwbGF5cXVlcnlncmlkJywgcXVlcnlHcmlkQ29tcG9uZW50KTtcbmV4cG9ydCBmdW5jdGlvbiBRdWVyeUdyaWRDb250cm9sbGVyKCRpbmplY3RvciwgJHNjb3BlLCBuZ2VvUXVlcnlSZXN1bHQsIG5nZW9NYXBRdWVyZW50LCBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3IsICR0aW1lb3V0LCBuZ2VvQ3N2RG93bmxvYWQsICRlbGVtZW50KSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIHF1ZXJ5T3B0aW9ucyA9ICRpbmplY3Rvci5oYXMoJ25nZW9RdWVyeU9wdGlvbnMnKSA/ICRpbmplY3Rvci5nZXQoJ25nZW9RdWVyeU9wdGlvbnMnKSA6IHt9O1xuICB0aGlzLiRzY29wZV8gPSAkc2NvcGU7XG4gIHRoaXMuJHRpbWVvdXRfID0gJHRpbWVvdXQ7XG4gIHRoaXMubmdlb1F1ZXJ5UmVzdWx0ID0gbmdlb1F1ZXJ5UmVzdWx0O1xuICB0aGlzLm5nZW9NYXBRdWVyZW50XyA9IG5nZW9NYXBRdWVyZW50O1xuICB0aGlzLm5nZW9Dc3ZEb3dubG9hZF8gPSBuZ2VvQ3N2RG93bmxvYWQ7XG4gIHRoaXMuJGVsZW1lbnRfID0gJGVsZW1lbnQ7XG4gIHRoaXMubWF4UmVzdWx0cyA9IHF1ZXJ5T3B0aW9ucy5saW1pdCAhPT0gdW5kZWZpbmVkID8gcXVlcnlPcHRpb25zLmxpbWl0IDogNTA7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICB0aGlzLmdyaWRTb3VyY2VzID0ge307XG4gIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gIHRoaXMucmVtb3ZlRW1wdHlDb2x1bW5zXyA9IGZhbHNlO1xuICB0aGlzLm1heFJlY2VudGVyWm9vbTtcbiAgdGhpcy5tZXJnZVRhYnMgPSB7fTtcbiAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfID0ge307XG4gIHRoaXMuZmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICB0aGlzLm5nZW9GZWF0dXJlT3ZlcmxheU1ncl8gPSBuZ2VvRmVhdHVyZU92ZXJsYXlNZ3I7XG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfID0gbmV3IG9sQ29sbGVjdGlvbigpO1xuICB0aGlzLmZpbGVuYW1lXyA9ICRpbmplY3Rvci5oYXMoJ2dtZkNzdkZpbGVuYW1lJykgPyAkaW5qZWN0b3IuZ2V0KCdnbWZDc3ZGaWxlbmFtZScpIDogJ3F1ZXJ5LXJlc3VsdHMuY3N2JztcbiAgdGhpcy5tYXBfID0gbnVsbDtcbiAgdGhpcy4kc2NvcGVfLiR3YXRjaENvbGxlY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZ2VvUXVlcnlSZXN1bHQ7XG4gIH0sIGZ1bmN0aW9uIChuZXdRdWVyeVJlc3VsdCwgb2xkUXVlcnlSZXN1bHQpIHtcbiAgICBpZiAobmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmcpIHtcbiAgICAgIF90aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICBfdGhpcy5wZW5kaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobmV3UXVlcnlSZXN1bHQgIT09IG9sZFF1ZXJ5UmVzdWx0KSB7XG4gICAgICBfdGhpcy51cGRhdGVEYXRhXygpO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gbnVsbDtcblxuICB0aGlzLnJlbW92ZUVtcHR5Q29sdW1uc0ZuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB0aGlzLm1heFJlY2VudGVyWm9vbUZuID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgdGhpcy5mZWF0dXJlc1N0eWxlRm4gPSBudWxsO1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZVN0eWxlRm4gPSBudWxsO1xuICB0aGlzLmdldE1hcEZuID0gbnVsbDtcbn1cblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmdldE1hcEZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdldE1hcEZuJyk7XG4gIH1cblxuICBpZiAoIXRoaXMuZmVhdHVyZXNTdHlsZUZuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGZlYXR1cmVzU3R5bGVGbicpO1xuICB9XG5cbiAgaWYgKCF0aGlzLnNlbGVjdGVkRmVhdHVyZVN0eWxlRm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2VsZWN0ZWRGZWF0dXJlU3R5bGVGbicpO1xuICB9XG5cbiAgdGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNfID0gdGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNGbigpO1xuICB0aGlzLm1heFJlY2VudGVyWm9vbSA9IHRoaXMubWF4UmVjZW50ZXJab29tRm4oKTtcbiAgdmFyIGZlYXR1cmVzT3ZlcmxheSA9IHRoaXMubmdlb0ZlYXR1cmVPdmVybGF5TWdyXy5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBmZWF0dXJlc092ZXJsYXkuc2V0RmVhdHVyZXModGhpcy5mZWF0dXJlc18pO1xuICB2YXIgZmVhdHVyZXNTdHlsZSA9IHRoaXMuZmVhdHVyZXNTdHlsZUZuKCk7XG5cbiAgaWYgKGZlYXR1cmVzU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghKGZlYXR1cmVzU3R5bGUgaW5zdGFuY2VvZiBvbFN0eWxlU3R5bGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGZlYXR1cmVzU3R5bGUgdHlwZScpO1xuICAgIH1cblxuICAgIGZlYXR1cmVzT3ZlcmxheS5zZXRTdHlsZShmZWF0dXJlc1N0eWxlKTtcbiAgfVxuXG4gIHZhciBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkgPSB0aGlzLm5nZW9GZWF0dXJlT3ZlcmxheU1ncl8uZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5LnNldEZlYXR1cmVzKHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfKTtcbiAgdmFyIGhpZ2hsaWdodEZlYXR1cmVTdHlsZSA9IHRoaXMuc2VsZWN0ZWRGZWF0dXJlU3R5bGVGbigpO1xuXG4gIGlmIChoaWdobGlnaHRGZWF0dXJlU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghKGhpZ2hsaWdodEZlYXR1cmVTdHlsZSBpbnN0YW5jZW9mIG9sU3R5bGVTdHlsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgaGlnaGxpZ2h0RmVhdHVyZVN0eWxlIHR5cGUnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpbGwgPSBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgY29sb3I6IFsyNTUsIDAsIDAsIDAuNl1cbiAgICB9KTtcbiAgICB2YXIgc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgY29sb3I6IFsyNTUsIDAsIDAsIDFdLFxuICAgICAgd2lkdGg6IDJcbiAgICB9KTtcbiAgICBoaWdobGlnaHRGZWF0dXJlU3R5bGUgPSBuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgIGZpbGw6IGZpbGwsXG4gICAgICBpbWFnZTogbmV3IG9sU3R5bGVDaXJjbGUoe1xuICAgICAgICBmaWxsOiBmaWxsLFxuICAgICAgICByYWRpdXM6IDUsXG4gICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICB9KSxcbiAgICAgIHN0cm9rZTogc3Ryb2tlLFxuICAgICAgekluZGV4OiAxMFxuICAgIH0pO1xuICB9XG5cbiAgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGhpZ2hsaWdodEZlYXR1cmVTdHlsZSk7XG4gIHZhciBtYXBGbiA9IHRoaXMuZ2V0TWFwRm47XG5cbiAgaWYgKG1hcEZuKSB7XG4gICAgdmFyIG1hcCA9IG1hcEZuKCk7XG5cbiAgICBpZiAoIShtYXAgaW5zdGFuY2VvZiBvbE1hcCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbWFwIHR5cGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcF8gPSBtYXA7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEdyaWRTb3VyY2VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICByZXR1cm4gdGhpcy5sb2FkZWRHcmlkU291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZUxhYmVsKSB7XG4gICAgcmV0dXJuIF90aGlzMi5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF07XG4gIH0pO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGF0YV8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gIGlmICgodGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZyB8fCB0aGlzLm5nZW9RdWVyeVJlc3VsdC50b3RhbCA9PT0gMCkgJiYgIXRoaXMuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXygpKSB7XG4gICAgdmFyIG9sZEFjdGl2ZSA9IHRoaXMuYWN0aXZlO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICAgIGlmIChvbGRBY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICAgIHRoaXMucGVuZGluZyA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnBlbmRpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIHNvdXJjZXMgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzO1xuXG4gIGlmIChPYmplY3Qua2V5cyh0aGlzLm1lcmdlVGFicykubGVuZ3RoID4gMCkge1xuICAgIHNvdXJjZXMgPSB0aGlzLmdldE1lcmdlZFNvdXJjZXNfKHNvdXJjZXMpO1xuICB9XG5cbiAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlLnRvb01hbnlSZXN1bHRzKSB7XG4gICAgICBfdGhpczMubWFrZUdyaWRfKG51bGwsIHNvdXJjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvdXJjZS5pZCA9IF90aGlzMy5lc2NhcGVWYWx1ZShzb3VyY2UuaWQpO1xuICAgICAgdmFyIGZlYXR1cmVzID0gc291cmNlLmZlYXR1cmVzO1xuXG4gICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBfdGhpczMuY29sbGVjdERhdGFfKHNvdXJjZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAodGhpcy5sb2FkZWRHcmlkU291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsIHx8ICEoXCJcIiArIHRoaXMuc2VsZWN0ZWRUYWIgaW4gdGhpcy5ncmlkU291cmNlcykpIHtcbiAgICB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZmlyc3RTb3VyY2VJZCA9IF90aGlzMy5sb2FkZWRHcmlkU291cmNlc1swXTtcblxuICAgICAgX3RoaXMzLnNlbGVjdFRhYihfdGhpczMuZ3JpZFNvdXJjZXNbZmlyc3RTb3VyY2VJZF0pO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5oYXNPbmVXaXRoVG9vTWFueVJlc3VsdHNfID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcy5zb21lKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICByZXR1cm4gc291cmNlLnRvb01hbnlSZXN1bHRzO1xuICB9KTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmVzY2FwZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRvRXNjYXBlID0gL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFwgfF0vZztcblxuICAgIGlmICh2YWx1ZS5tYXRjaCh0b0VzY2FwZSkgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHRvRXNjYXBlLCAnXycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pc1NlbGVjdGVkID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRUYWIgPT09IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVyZ2VkU291cmNlc18gPSBmdW5jdGlvbiAoc291cmNlcykge1xuICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICB2YXIgYWxsU291cmNlcyA9IFtdO1xuICB2YXIgbWVyZ2VkU291cmNlcyA9IHt9O1xuICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIHZhciBtZXJnZWRTb3VyY2UgPSBfdGhpczQuZ2V0TWVyZ2VkU291cmNlXyhzb3VyY2UsIG1lcmdlZFNvdXJjZXMpO1xuXG4gICAgaWYgKG1lcmdlZFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgYWxsU291cmNlcy5wdXNoKHNvdXJjZSk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKHZhciBtZXJnZWRTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgYWxsU291cmNlcy5wdXNoKG1lcmdlZFNvdXJjZXNbbWVyZ2VkU291cmNlSWRdKTtcbiAgfVxuXG4gIHJldHVybiBhbGxTb3VyY2VzO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVyZ2VkU291cmNlXyA9IGZ1bmN0aW9uIChzb3VyY2UsIG1lcmdlZFNvdXJjZXMpIHtcbiAgdmFyIG1lcmdlU291cmNlSWQgPSBudWxsO1xuXG4gIGZvciAodmFyIGN1cnJlbnRNZXJnZVNvdXJjZUlkIGluIHRoaXMubWVyZ2VUYWJzKSB7XG4gICAgdmFyIHNvdXJjZUxhYmVscyA9IHRoaXMubWVyZ2VUYWJzW2N1cnJlbnRNZXJnZVNvdXJjZUlkXTtcbiAgICB2YXIgY29udGFpbnNTb3VyY2UgPSBzb3VyY2VMYWJlbHMuc29tZShmdW5jdGlvbiAoc291cmNlTGFiZWwpIHtcbiAgICAgIHJldHVybiBzb3VyY2VMYWJlbCA9PSBzb3VyY2UubGFiZWw7XG4gICAgfSk7XG5cbiAgICBpZiAoY29udGFpbnNTb3VyY2UpIHtcbiAgICAgIG1lcmdlU291cmNlSWQgPSBjdXJyZW50TWVyZ2VTb3VyY2VJZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtZXJnZVNvdXJjZUlkID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbWVyZ2VTb3VyY2U7XG5cbiAgaWYgKG1lcmdlU291cmNlSWQgaW4gbWVyZ2VkU291cmNlcykge1xuICAgIG1lcmdlU291cmNlID0gbWVyZ2VkU291cmNlc1ttZXJnZVNvdXJjZUlkXTtcbiAgfSBlbHNlIHtcbiAgICBtZXJnZVNvdXJjZSA9IHtcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIGlkOiBtZXJnZVNvdXJjZUlkLFxuICAgICAgbGFiZWw6IG1lcmdlU291cmNlSWQsXG4gICAgICBsaW1pdDogdGhpcy5tYXhSZXN1bHRzLFxuICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICBxdWVyaWVkOiB0cnVlLFxuICAgICAgdG9vTWFueVJlc3VsdHM6IGZhbHNlXG4gICAgfTtcbiAgICBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdID0gbWVyZ2VTb3VyY2U7XG4gIH1cblxuICBzb3VyY2UuZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gIH0pO1xuICBtZXJnZVNvdXJjZS50b29NYW55UmVzdWx0cyA9IG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzIHx8IHNvdXJjZS50b29NYW55UmVzdWx0cztcblxuICBpZiAobWVyZ2VTb3VyY2UudG9vTWFueVJlc3VsdHMpIHtcbiAgICBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCA9IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWQgPyBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCArIG1lcmdlU291cmNlLmZlYXR1cmVzLmxlbmd0aCA6IG1lcmdlU291cmNlLmZlYXR1cmVzLmxlbmd0aDtcbiAgICBtZXJnZVNvdXJjZS5mZWF0dXJlcyA9IFtdO1xuICB9XG5cbiAgaWYgKHNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgPSBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkID8gbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgKyBzb3VyY2UudG90YWxGZWF0dXJlQ291bnQgOiBzb3VyY2UudG90YWxGZWF0dXJlQ291bnQ7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VTb3VyY2U7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jb2xsZWN0RGF0YV8gPSBmdW5jdGlvbiAoc291cmNlKSB7XG4gIHZhciBmZWF0dXJlcyA9IHNvdXJjZS5mZWF0dXJlcztcbiAgdmFyIGFsbFByb3BlcnRpZXMgPSBbXTtcbiAgdmFyIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMgPSBbXTtcbiAgdmFyIGZlYXR1cmVzRm9yU291cmNlID0ge307XG4gIHZhciBwcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cnlOYW1lO1xuICBmZWF0dXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgcHJvcGVydGllcyA9IGZlYXR1cmUuZ2V0UHJvcGVydGllcygpO1xuXG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZmVhdHVyZUdlb21ldHJ5TmFtZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnlOYW1lKCk7XG5cbiAgICAgIGlmICghZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5pbmNsdWRlcyhmZWF0dXJlR2VvbWV0cnlOYW1lKSkge1xuICAgICAgICBmZWF0dXJlR2VvbWV0cmllc05hbWVzLnB1c2goZmVhdHVyZUdlb21ldHJ5TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGFsbFByb3BlcnRpZXMucHVzaChwcm9wZXJ0aWVzKTtcbiAgICAgIGZlYXR1cmVzRm9yU291cmNlW2dldFJvd1VpZChwcm9wZXJ0aWVzKV0gPSBmZWF0dXJlO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMuY2xlYW5Qcm9wZXJ0aWVzXyhhbGxQcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cmllc05hbWVzKTtcblxuICBpZiAoYWxsUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGdyaWRDcmVhdGVkID0gdGhpcy5tYWtlR3JpZF8oYWxsUHJvcGVydGllcywgc291cmNlKTtcblxuICAgIGlmIChncmlkQ3JlYXRlZCkge1xuICAgICAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfW1wiXCIgKyBzb3VyY2UubGFiZWxdID0gZmVhdHVyZXNGb3JTb3VyY2U7XG4gICAgfVxuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhblByb3BlcnRpZXNfID0gZnVuY3Rpb24gKGFsbFByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMpIHtcbiAgYWxsUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG4gICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlR2VvbWV0cnlOYW1lKSB7XG4gICAgICBkZWxldGUgcHJvcGVydGllc1tmZWF0dXJlR2VvbWV0cnlOYW1lXTtcbiAgICB9KTtcbiAgICBkZWxldGUgcHJvcGVydGllcy5ib3VuZGVkQnk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMubmdlb19mZWF0dXJlX3R5cGVfO1xuICB9KTtcblxuICBpZiAodGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNfID09PSB0cnVlKSB7XG4gICAgdGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNGbl8oYWxsUHJvcGVydGllcyk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUVtcHR5Q29sdW1uc0ZuXyA9IGZ1bmN0aW9uIChhbGxQcm9wZXJ0aWVzKSB7XG4gIHZhciBrZXlzVG9LZWVwID0gW107XG4gIHZhciBpLCBrZXk7XG5cbiAgZm9yIChrZXkgaW4gYWxsUHJvcGVydGllc1swXSkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBhbGxQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWxsUHJvcGVydGllc1tpXVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAga2V5c1RvS2VlcC5wdXNoKGtleSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBrZXlUb1JlbW92ZTtcbiAgYWxsUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG4gICAga2V5VG9SZW1vdmUgPSBbXTtcblxuICAgIGZvciAoa2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgIGlmICgha2V5c1RvS2VlcC5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIGtleVRvUmVtb3ZlLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBrZXlUb1JlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2tleV07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUubWFrZUdyaWRfID0gZnVuY3Rpb24gKGRhdGEsIHNvdXJjZSkge1xuICB2YXIgc291cmNlTGFiZWwgPSBcIlwiICsgc291cmNlLmxhYmVsO1xuICB2YXIgZ3JpZENvbmZpZyA9IG51bGw7XG5cbiAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICBncmlkQ29uZmlnID0gdGhpcy5nZXRHcmlkQ29uZmlndXJhdGlvbl8oZGF0YSk7XG5cbiAgICBpZiAoZ3JpZENvbmZpZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghdGhpcy5sb2FkZWRHcmlkU291cmNlcy5pbmNsdWRlcyhzb3VyY2VMYWJlbCkpIHtcbiAgICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLnB1c2goc291cmNlTGFiZWwpO1xuICB9XG5cbiAgdGhpcy5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF0gPSB7XG4gICAgc291cmNlOiBzb3VyY2VcbiAgfTtcblxuICBpZiAoZ3JpZENvbmZpZykge1xuICAgIHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdLmNvbmZpZ3VyYXRpb24gPSBncmlkQ29uZmlnO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRHcmlkQ29uZmlndXJhdGlvbl8gPSBmdW5jdGlvbiAoZGF0YSkge1xuICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRhdGEnKTtcbiAgfVxuXG4gIHZhciBjbG9uZSA9IHt9O1xuICBPYmplY3QuYXNzaWduKGNsb25lLCBkYXRhWzBdKTtcbiAgZGVsZXRlIGNsb25lLm9sX3VpZDtcbiAgdmFyIGNvbHVtbnMgPSBPYmplY3Qua2V5cyhjbG9uZSk7XG4gIHZhciBjb2x1bW5EZWZzID0gW107XG4gIGNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG4gICAgY29sdW1uRGVmcy5wdXNoKHtcbiAgICAgIG5hbWU6IGNvbHVtblxuICAgIH0pO1xuICB9KTtcblxuICBpZiAoY29sdW1uRGVmcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvR3JpZENvbmZpZyhkYXRhLCBjb2x1bW5EZWZzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICB0aGlzLmdyaWRTb3VyY2VzID0ge307XG4gIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gIHRoaXMudG9vTWFueVJlc3VsdHMgPSBmYWxzZTtcbiAgdGhpcy5mZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5uZ2VvTWFwUXVlcmVudF8uY2xlYXIoKTtcbiAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfID0ge307XG5cbiAgaWYgKHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8oKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0VGFiID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgdmFyIHNvdXJjZSA9IGdyaWRTb3VyY2Uuc291cmNlO1xuICB0aGlzLnNlbGVjdGVkVGFiID0gc291cmNlLmxhYmVsO1xuXG4gIGlmICh0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXykge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKCk7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSBudWxsO1xuICB9XG5cbiAgaWYgKGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSB0aGlzLiRzY29wZV8uJHdhdGNoQ29sbGVjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdGVkUm93cztcbiAgICB9LCBmdW5jdGlvbiAobmV3U2VsZWN0ZWQsIG9sZFNlbGVjdGVkUm93cykge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld1NlbGVjdGVkKSAhPT0gT2JqZWN0LmtleXMob2xkU2VsZWN0ZWRSb3dzKSkge1xuICAgICAgICBfdGhpczUub25TZWxlY3Rpb25DaGFuZ2VkXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG4gIHRoaXMucmVmbG93R3JpZF8oKTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnJlZmxvd0dyaWRfID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSB0aGlzLmVzY2FwZVZhbHVlKHRoaXMuc2VsZWN0ZWRUYWIgfHwgJycpO1xuICB2YXIgYWN0aXZlUGFuZSA9IHRoaXMuJGVsZW1lbnRfLmZpbmQoXCJkaXYudGFiLXBhbmUjXCIgKyBpZCk7XG4gIGFjdGl2ZVBhbmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgIGFjdGl2ZVBhbmUuZmluZCgnZGl2Lm5nZW8tZ3JpZC10YWJsZS1jb250YWluZXIgdGFibGUnKS50cmlnZ2VyKCdyZWZsb3cnKTtcbiAgfSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5vblNlbGVjdGlvbkNoYW5nZWRfID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBncmlkU291cmNlID0gdGhpcy5ncmlkU291cmNlc1tcIlwiICsgdGhpcy5zZWxlY3RlZFRhYl07XG4gIHRoaXMudXBkYXRlRmVhdHVyZXNfKGdyaWRTb3VyY2UpO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRmVhdHVyZXNfID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgdGhpcy5mZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uY2xlYXIoKTtcblxuICBpZiAoIWdyaWRTb3VyY2UuY29uZmlndXJhdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzb3VyY2VMYWJlbCA9IFwiXCIgKyBncmlkU291cmNlLnNvdXJjZS5sYWJlbDtcbiAgdmFyIGZlYXR1cmVzRm9yU291cmNlID0gdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfW3NvdXJjZUxhYmVsXTtcbiAgdmFyIHNlbGVjdGVkUm93cyA9IGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RlZFJvd3M7XG5cbiAgZm9yICh2YXIgcm93SWQgaW4gZmVhdHVyZXNGb3JTb3VyY2UpIHtcbiAgICB2YXIgZmVhdHVyZSA9IGZlYXR1cmVzRm9yU291cmNlW3Jvd0lkXTtcblxuICAgIGlmIChyb3dJZCBpbiBzZWxlY3RlZFJvd3MpIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRBY3RpdmVHcmlkU291cmNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmdyaWRTb3VyY2VzW1wiXCIgKyB0aGlzLnNlbGVjdGVkVGFiXTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNPbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkQ291bnQoKSA+IDA7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldFNlbGVjdGVkUm93Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlID09PSBudWxsIHx8IHNvdXJjZS5jb25maWd1cmF0aW9uID09PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkQ291bnQoKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdEFsbCgpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi51bnNlbGVjdEFsbCgpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pbnZlcnRTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24uaW52ZXJ0U2VsZWN0aW9uKCk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnpvb21Ub1NlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcF8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cblxuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHZhciBleHRlbnQgPSBvbEV4dGVudC5jcmVhdGVFbXB0eSgpO1xuICAgIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIHZhciBnZW9tZXRyeSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcblxuICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgIH1cblxuICAgICAgb2xFeHRlbnQuZXh0ZW5kKGV4dGVudCwgZ2VvbWV0cnkuZ2V0RXh0ZW50KCkpO1xuICAgIH0pO1xuICAgIHZhciBzaXplID0gdGhpcy5tYXBfLmdldFNpemUoKTtcblxuICAgIGlmICghc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNpemUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcF8uZ2V0VmlldygpLmZpdChleHRlbnQsIHtcbiAgICAgIHNpemU6IHNpemUsXG4gICAgICBtYXhab29tOiB0aGlzLm1heFJlY2VudGVyWm9vbVxuICAgIH0pO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5kb3dubG9hZENzdiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICB2YXIgY29sdW1uRGVmcyA9IHNvdXJjZS5jb25maWd1cmF0aW9uLmNvbHVtbkRlZnM7XG5cbiAgICBpZiAoIWNvbHVtbkRlZnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb2x1bW5EZWZzJyk7XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGVkUm93cyA9IHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkUm93cygpO1xuICAgIHRoaXMubmdlb0NzdkRvd25sb2FkXy5zdGFydERvd25sb2FkKHNlbGVjdGVkUm93cywgY29sdW1uRGVmcywgdGhpcy5maWxlbmFtZV8pO1xuICB9XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignR21mRGlzcGxheXF1ZXJ5Z3JpZENvbnRyb2xsZXInLCBRdWVyeUdyaWRDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==