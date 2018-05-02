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

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/displayquerygrid.css?");

/***/ }),

/***/ "./contribs/gmf/examples/displayquerygrid.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/displayquerygrid.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayquerygrid.css */ \"./contribs/gmf/examples/displayquerygrid.css\");\n/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_displayquerygrid_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gmf-hidden.inc.css */ \"./contribs/gmf/examples/gmf-hidden.inc.css\");\n/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/datasource/Manager.js */ \"./contribs/gmf/src/datasource/Manager.js\");\n/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/layertree/component.js */ \"./contribs/gmf/src/layertree/component.js\");\n/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/map/component.js */ \"./contribs/gmf/src/map/component.js\");\n/* harmony import */ var gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/query/gridComponent.js */ \"./contribs/gmf/src/query/gridComponent.js\");\n/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/theme/Themes.js */ \"./contribs/gmf/src/theme/Themes.js\");\n/* harmony import */ var ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/grid/module.js */ \"./src/grid/module.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\n/* harmony import */ var ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/misc/btnComponent.js */ \"./src/misc/btnComponent.js\");\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ngeo_query_bboxQueryComponent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/query/bboxQueryComponent.js */ \"./src/query/bboxQueryComponent.js\");\n/* harmony import */ var ngeo_query_mapQueryComponent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/query/mapQueryComponent.js */ \"./src/query/mapQueryComponent.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/style/Circle.js */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\nMainController.$inject = [\"gmfThemes\", \"gmfDataSourcesManager\", \"ngeoFeatureOverlayMgr\"];\nQueryresultController.$inject = [\"ngeoQueryResult\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].name, ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"].name, ngeo_query_bboxQueryComponent_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"].name, ngeo_query_mapQueryComponent_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"].name]);\nmodule.constant('ngeoQueryOptions', {\n  'limit': 20,\n  'queryCountFirst': true\n});\nmodule.constant('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_THEMES);\nmodule.constant('defaultTheme', 'Demo');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\nvar queryresultComponent = {\n  controller: 'gmfappQueryresultController',\n  template: __webpack_require__(/*! ./partials/queryresult.html */ \"./contribs/gmf/examples/partials/queryresult.html\")\n};\nmodule.component('gmfappQueryresult', queryresultComponent);\n\nfunction QueryresultController(ngeoQueryResult) {\n  this.result = ngeoQueryResult;\n}\n\nmodule.controller('gmfappQueryresultController', QueryresultController);\n\nfunction MainController(gmfThemes, gmfDataSourcesManager, ngeoFeatureOverlayMgr) {\n  var _this = this;\n\n  gmfThemes.loadThemes();\n  var fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"]({\n    color: [255, 170, 0, 0.6]\n  });\n  var stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"]({\n    color: [255, 170, 0, 1],\n    width: 2\n  });\n  this.featureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_22__[\"default\"]({\n    fill: fill,\n    image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]({\n      fill: fill,\n      radius: 5,\n      stroke: stroke\n    }),\n    stroke: stroke\n  });\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],\n      center: [537635, 152640],\n      zoom: 3\n    })\n  });\n  gmfDataSourcesManager.setDatasourceMap(this.map);\n  this.themes = undefined;\n  this.treeSource = undefined;\n  this.queryActive = true;\n  this.queryGridActive = true;\n  gmfThemes.getThemesObject().then(function (themes) {\n    if (themes) {\n      _this.themes = themes;\n      _this.treeSource = themes[3];\n    }\n  });\n  ngeoFeatureOverlayMgr.init(this.map);\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/examples/displayquerygrid.js?");

/***/ }),

/***/ "./contribs/gmf/src/query/gridComponent.html":
/*!***************************************************!*\
  !*** ./contribs/gmf/src/query/gridComponent.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(obj) {\nobj || (obj = {});\nvar __t, __p = '';\nwith (obj) {\n__p += '<div class=\"gmf-displayquerygrid panel\" ng-show=\"ctrl.active\">\\n  <div\\n    class=\"close\"\\n    ng-click=\"ctrl.clear()\">\\n    &times;\\n  </div>\\n\\n  <ul\\n    class=\"nav nav-pills\"\\n    role=\"tablist\">\\n\\n    <li\\n      class=\"nav-item\"\\n      ng-repeat=\"gridSource in ctrl.getGridSources() track by gridSource.source.label\"\\n      role=\"presentation\"\\n      ng-click=\"ctrl.selectTab(gridSource)\">\\n\\n      <a\\n        class=\"nav-link\"\\n        href=\"#{{ctrl.escapeValue(gridSource.source.label)}}\"\\n        ng-class=\"{\\'active\\' : ctrl.isSelected(gridSource)}\"\\n        data-target=\"#{{ctrl.escapeValue(gridSource.source.label)}}\"\\n        aria-controls=\"{{ctrl.escapeValue(gridSource.source.label)}}\"\\n        role=\"tab\"\\n        data-toggle=\"tab\">\\n\\n        <span ng-if=\"gridSource.source.tooManyResults !== true\">\\n          {{gridSource.source.label | translate}} ({{gridSource.source.features.length}})\\n        </span>\\n        <span ng-if=\"gridSource.source.tooManyResults === true\">\\n          {{gridSource.source.label | translate}} ({{gridSource.source.totalFeatureCount}}*)\\n        </span>\\n      </a>\\n    </li>\\n  </ul>\\n\\n  <div class=\"tab-content\">\\n    <div\\n      ng-repeat=\"gridSource in ctrl.getGridSources() track by gridSource.source.label\"\\n      role=\"tabpanel\"\\n      class=\"tab-pane\"\\n      ng-class=\"{\\'active\\' : ctrl.isSelected(gridSource)}\"\\n      id=\"{{ctrl.escapeValue(gridSource.source.label)}}\">\\n\\n      <ngeo-grid\\n        ngeo-grid-configuration=\"gridSource.configuration\"\\n        ng-if=\"gridSource.source.tooManyResults !== true\">\\n      </ngeo-grid>\\n\\n      <div ng-if=\"gridSource.source.tooManyResults === true\">\\n        <div class=\"gmf-displayquerygrid-message alert alert-warning\">\\n          <p><span translate>The results can not be displayed because the maximum number has been reached</span> ({{gridSource.source.limit}}).</p>\\n          <p translate>Please refine your query.</p>\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div ng-show=\"!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null\">\\n\\n    <ul class=\"nav justify-content-end\">\\n\\n      <li\\n        class=\"ng-hide\"\\n        ng-show=\"ctrl.isOneSelected()\">\\n        <div class=\"btn btn-sm ng-binding\">\\n          {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>\\n        </div>\\n      </li>\\n\\n      <li\\n        ng-show=\"ctrl.isOneSelected()\"\\n        class=\"ng-hide\">\\n        <button\\n          class=\"btn btn-link btn-sm\"\\n          title=\"{{\\'Zoom to selection\\' | translate}}\"\\n          ng-click=\"ctrl.zoomToSelection()\">\\n          <i class=\"fa fa-search-plus\"></i> <span translate>Zoom to</span>\\n        </button>\\n      </li>\\n\\n      <li\\n        ng-show=\"ctrl.isOneSelected()\"\\n        class=\"ng-hide\">\\n        <button\\n          class=\"btn btn-link btn-sm\"\\n          title=\"{{\\'Export selection as CSV\\' | translate}}\"\\n          ng-click=\"ctrl.downloadCsv()\">\\n          <i class=\"fa fa-download\"></i> <span translate>Export as CSV</span>\\n        </button>\\n      </li>\\n\\n      <li class=\"dropdown\">\\n        <button\\n          type=\"button\"\\n          class=\"dropup btn btn-default btn-sm dropdown-toggle\"\\n          data-toggle=\"dropdown\"\\n          aria-haspopup=\"true\"\\n          aria-expanded=\"false\">\\n          <span translate>Select</span>\\n        </button>\\n        <ul\\n          class=\"dropdown-menu\"\\n          aria-labelledby=\"dLabel\">\\n          <li>\\n            <a\\n              href=\"\"\\n              ng-click=\"ctrl.selectAll()\" translate>All</a>\\n          </li>\\n          <li>\\n            <a\\n              href=\"\"\\n              ng-click=\"ctrl.unselectAll()\" translate>None</a>\\n          </li>\\n          <li>\\n            <a\\n              href=\"\"\\n              ng-click=\"ctrl.invertSelection()\" translate>Reverse selection</a>\\n          </li>\\n        </ul>\\n      </li>\\n    </ul>\\n  </div>\\n\\n  <div\\n    ng-show=\"ctrl.pending\"\\n    class=\"gmf-displayquerygrid-pending\">\\n    <span class=\"fa fa-spinner fa-spin\"></span>\\n  </div>\\n</div>\\n';\n\n}\nreturn __p\n}\n\n//# sourceURL=webpack:///./contribs/gmf/src/query/gridComponent.html?");

/***/ }),

/***/ "./contribs/gmf/src/query/gridComponent.js":
/*!*************************************************!*\
  !*** ./contribs/gmf/src/query/gridComponent.js ***!
  \*************************************************/
/*! exports provided: QueryGridController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QueryGridController\", function() { return QueryGridController; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ngeo_download_Csv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/download/Csv.js */ \"./src/download/Csv.js\");\n/* harmony import */ var ngeo_download_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/download/service.js */ \"./src/download/service.js\");\n/* harmony import */ var ngeo_grid_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/grid/component.js */ \"./src/grid/component.js\");\n/* harmony import */ var ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/grid/Config.js */ \"./src/grid/Config.js\");\n/* harmony import */ var ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr.js */ \"./src/map/FeatureOverlayMgr.js\");\n/* harmony import */ var ngeo_query_MapQuerent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/query/MapQuerent.js */ \"./src/query/MapQuerent.js\");\n/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Collection.js */ \"./node_modules/ol/Collection.js\");\n/* harmony import */ var ol_extent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/extent.js */ \"./node_modules/ol/extent.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Circle.js */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill.js */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Stroke.js */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Style.js */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var bootstrap_js_src_dropdown_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! bootstrap/js/src/dropdown.js */ \"./node_modules/bootstrap/js/src/dropdown.js\");\nQueryGridController.$inject = [\"$injector\", \"$scope\", \"ngeoQueryResult\", \"ngeoMapQuerent\", \"ngeoFeatureOverlayMgr\", \"$timeout\", \"ngeoCsvDownload\", \"$element\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfQueryGridComponent', [ngeo_download_Csv_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].name, ngeo_download_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name, ngeo_grid_component_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, ngeo_map_FeatureOverlayMgr_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, ngeo_query_MapQuerent_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name]);\nmodule.value('gmfDisplayquerygridTemplateUrl', function ($element, $attrs) {\n  var templateUrl = $attrs.gmfDisplayquerygridTemplateurl;\n  return templateUrl !== undefined ? templateUrl : 'gmf/query/gridComponent';\n});\nmodule.run([\"$templateCache\", function ($templateCache) {\n  $templateCache.put('gmf/query/gridComponent', __webpack_require__(/*! ./gridComponent.html */ \"./contribs/gmf/src/query/gridComponent.html\"));\n}]);\ngmfDisplayquerygridTemplateUrl.$inject = [\"$element\", \"$attrs\", \"gmfDisplayquerygridTemplateUrl\"];\n\nfunction gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {\n  return gmfDisplayquerygridTemplateUrl($element, $attrs);\n}\n\nvar queryGridComponent = {\n  controller: 'GmfDisplayquerygridController as ctrl',\n  bindings: {\n    'active': '=?gmfDisplayquerygridActive',\n    'featuresStyleFn': '&gmfDisplayquerygridFeaturesstyle',\n    'selectedFeatureStyleFn': '&gmfDisplayquerygridSelectedfeaturestyle',\n    'getMapFn': '&gmfDisplayquerygridMap',\n    'removeEmptyColumnsFn': '&?gmfDisplayquerygridRemoveemptycolumns',\n    'maxResultsFn': '&?gmfDisplayquerygridMaxresults',\n    'maxRecenterZoomFn': '&?gmfDisplayquerygridMaxrecenterzoom',\n    'mergeTabs': '<?gmfDisplayquerygridMergetabs'\n  },\n  templateUrl: gmfDisplayquerygridTemplateUrl\n};\nmodule.component('gmfDisplayquerygrid', queryGridComponent);\nfunction QueryGridController($injector, $scope, ngeoQueryResult, ngeoMapQuerent, ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, $element) {\n  var _this = this;\n\n  var queryOptions = $injector.has('ngeoQueryOptions') ? $injector.get('ngeoQueryOptions') : {};\n  this.$scope_ = $scope;\n  this.$timeout_ = $timeout;\n  this.ngeoQueryResult = ngeoQueryResult;\n  this.ngeoMapQuerent_ = ngeoMapQuerent;\n  this.ngeoCsvDownload_ = ngeoCsvDownload;\n  this.$element_ = $element;\n  this.maxResults = queryOptions.limit !== undefined ? queryOptions.limit : 50;\n  this.active = false;\n  this.pending = false;\n  this.gridSources = {};\n  this.loadedGridSources = [];\n  this.selectedTab = null;\n  this.removeEmptyColumns_ = false;\n  this.maxRecenterZoom = null;\n  this.mergeTabs = {};\n  this.featuresForSources_ = {};\n  this.features_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;\n  this.highlightFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n  this.filename_ = $injector.has('gmfCsvFilename') ? $injector.get('gmfCsvFilename') : 'query-results.csv';\n  this.map_ = null;\n  this.$scope_.$watchCollection(function () {\n    return ngeoQueryResult;\n  }, function (newQueryResult, oldQueryResult) {\n    if (newQueryResult !== oldQueryResult) {\n      _this.updateData_();\n    }\n  });\n  this.unregisterSelectWatcher_ = null;\n\n  this.removeEmptyColumnsFn = function () {\n    return false;\n  };\n\n  this.maxRecenterZoomFn = function () {\n    return null;\n  };\n\n  this.featuresStyleFn = null;\n  this.selectedFeatureStyleFn = null;\n  this.getMapFn = null;\n}\n\nQueryGridController.prototype.$onInit = function () {\n  if (!this.getMapFn) {\n    throw new Error('Missing getMapFn');\n  }\n\n  if (!this.featuresStyleFn) {\n    throw new Error('Missing featuresStyleFn');\n  }\n\n  if (!this.selectedFeatureStyleFn) {\n    throw new Error('Missing selectedFeatureStyleFn');\n  }\n\n  this.removeEmptyColumns_ = this.removeEmptyColumnsFn();\n  this.maxRecenterZoom = this.maxRecenterZoomFn();\n  var featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();\n  featuresOverlay.setFeatures(this.features_);\n  var featuresStyle = this.featuresStyleFn();\n\n  if (featuresStyle !== undefined) {\n    if (!(featuresStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"])) {\n      throw new Error('Wrong featuresStyle type');\n    }\n\n    featuresOverlay.setStyle(featuresStyle);\n  }\n\n  var highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();\n  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);\n  var highlightFeatureStyle = this.selectedFeatureStyleFn();\n\n  if (highlightFeatureStyle !== undefined) {\n    if (!(highlightFeatureStyle instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"])) {\n      throw new Error('Wrong highlightFeatureStyle type');\n    }\n  } else {\n    var fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n      color: [255, 0, 0, 0.6]\n    });\n    var stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n      color: [255, 0, 0, 1],\n      width: 2\n    });\n    highlightFeatureStyle = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n      fill: fill,\n      image: new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n        fill: fill,\n        radius: 5,\n        stroke: stroke\n      }),\n      stroke: stroke,\n      zIndex: 10\n    });\n  }\n\n  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);\n  var mapFn = this.getMapFn;\n\n  if (mapFn) {\n    var map = mapFn();\n\n    if (!(map instanceof ol_Map_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"])) {\n      throw new Error('Wrong map type');\n    }\n\n    this.map_ = map;\n  }\n};\n\nQueryGridController.prototype.getGridSources = function () {\n  var _this2 = this;\n\n  return this.loadedGridSources.map(function (sourceLabel) {\n    return _this2.gridSources[sourceLabel];\n  });\n};\n\nQueryGridController.prototype.updateData_ = function () {\n  var _this3 = this;\n\n  if ((this.ngeoQueryResult.pending || this.ngeoQueryResult.total === 0) && !this.hasOneWithTooManyResults_()) {\n    var oldActive = this.active;\n    this.clear();\n\n    if (oldActive) {\n      this.active = this.ngeoQueryResult.pending;\n      this.pending = this.ngeoQueryResult.pending;\n    }\n\n    return;\n  }\n\n  this.active = true;\n  this.pending = false;\n  var sources = this.ngeoQueryResult.sources;\n\n  if (Object.keys(this.mergeTabs).length > 0) {\n    sources = this.getMergedSources_(sources);\n  }\n\n  sources.forEach(function (source) {\n    if (source.tooManyResults) {\n      _this3.makeGrid_(null, source);\n    } else {\n      source.id = _this3.escapeValue(source.id);\n      var features = source.features;\n\n      if (features.length > 0) {\n        _this3.collectData_(source);\n      }\n    }\n  });\n\n  if (this.loadedGridSources.length === 0) {\n    this.active = false;\n    return;\n  }\n\n  if (this.selectedTab === null || !(\"\" + this.selectedTab in this.gridSources)) {\n    this.$timeout_(function () {\n      var firstSourceId = _this3.loadedGridSources[0];\n\n      _this3.selectTab(_this3.gridSources[firstSourceId]);\n    }, 0);\n  }\n};\n\nQueryGridController.prototype.hasOneWithTooManyResults_ = function () {\n  return this.ngeoQueryResult.sources.some(function (source) {\n    return source.tooManyResults;\n  });\n};\n\nQueryGridController.prototype.escapeValue = function (value) {\n  if (typeof value == 'number') {\n    return value;\n  } else {\n    var toEscape = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\ |]/g;\n\n    if (value.match(toEscape) !== null) {\n      return value.replace(toEscape, '_');\n    } else {\n      return value;\n    }\n  }\n};\n\nQueryGridController.prototype.isSelected = function (gridSource) {\n  return this.selectedTab === gridSource.source.label;\n};\n\nQueryGridController.prototype.getMergedSources_ = function (sources) {\n  var _this4 = this;\n\n  var allSources = [];\n  var mergedSources = {};\n  sources.forEach(function (source) {\n    var mergedSource = _this4.getMergedSource_(source, mergedSources);\n\n    if (mergedSource === null) {\n      allSources.push(source);\n    }\n  });\n\n  for (var mergedSourceId in mergedSources) {\n    allSources.push(mergedSources[mergedSourceId]);\n  }\n\n  return allSources;\n};\n\nQueryGridController.prototype.getMergedSource_ = function (source, mergedSources) {\n  var mergeSourceId = null;\n\n  for (var currentMergeSourceId in this.mergeTabs) {\n    var sourceLabels = this.mergeTabs[currentMergeSourceId];\n    var containsSource = sourceLabels.some(function (sourceLabel) {\n      return sourceLabel == source.label;\n    });\n\n    if (containsSource) {\n      mergeSourceId = currentMergeSourceId;\n      break;\n    }\n  }\n\n  if (mergeSourceId === null) {\n    return null;\n  }\n\n  var mergeSource;\n\n  if (mergeSourceId in mergedSources) {\n    mergeSource = mergedSources[mergeSourceId];\n  } else {\n    mergeSource = {\n      features: [],\n      id: mergeSourceId,\n      label: mergeSourceId,\n      limit: this.maxResults,\n      pending: false,\n      queried: true,\n      tooManyResults: false\n    };\n    mergedSources[mergeSourceId] = mergeSource;\n  }\n\n  source.features.forEach(function (feature) {\n    mergeSource.features.push(feature);\n  });\n  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;\n\n  if (mergeSource.tooManyResults) {\n    mergeSource.totalFeatureCount = mergeSource.totalFeatureCount !== undefined ? mergeSource.totalFeatureCount + mergeSource.features.length : mergeSource.features.length;\n    mergeSource.features = [];\n  }\n\n  if (source.totalFeatureCount !== undefined) {\n    mergeSource.totalFeatureCount = mergeSource.totalFeatureCount !== undefined ? mergeSource.totalFeatureCount + source.totalFeatureCount : source.totalFeatureCount;\n  }\n\n  return mergeSource;\n};\n\nQueryGridController.prototype.collectData_ = function (source) {\n  var features = source.features;\n  var allProperties = [];\n  var featureGeometriesNames = [];\n  var featuresForSource = {};\n  var properties, featureGeometryName;\n  features.forEach(function (feature) {\n    properties = feature.getProperties();\n\n    if (properties !== undefined) {\n      featureGeometryName = feature.getGeometryName();\n\n      if (!featureGeometriesNames.includes(featureGeometryName)) {\n        featureGeometriesNames.push(featureGeometryName);\n      }\n\n      allProperties.push(properties);\n      featuresForSource[Object(ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__[\"getRowUid\"])(properties)] = feature;\n    }\n  });\n  this.cleanProperties_(allProperties, featureGeometriesNames);\n\n  if (allProperties.length > 0) {\n    var gridCreated = this.makeGrid_(allProperties, source);\n\n    if (gridCreated) {\n      this.featuresForSources_[\"\" + source.label] = featuresForSource;\n    }\n  }\n};\n\nQueryGridController.prototype.cleanProperties_ = function (allProperties, featureGeometriesNames) {\n  allProperties.forEach(function (properties) {\n    featureGeometriesNames.forEach(function (featureGeometryName) {\n      delete properties[featureGeometryName];\n    });\n    delete properties.boundedBy;\n    delete properties.ngeo_feature_type_;\n  });\n\n  if (this.removeEmptyColumns_ === true) {\n    this.removeEmptyColumnsFn_(allProperties);\n  }\n};\n\nQueryGridController.prototype.removeEmptyColumnsFn_ = function (allProperties) {\n  var keysToKeep = [];\n  var i, key;\n\n  for (key in allProperties[0]) {\n    for (i = 0; i < allProperties.length; i++) {\n      if (allProperties[i][key] !== undefined) {\n        keysToKeep.push(key);\n        break;\n      }\n    }\n  }\n\n  var keyToRemove;\n  allProperties.forEach(function (properties) {\n    keyToRemove = [];\n\n    for (key in properties) {\n      if (!keysToKeep.includes(key)) {\n        keyToRemove.push(key);\n      }\n    }\n\n    keyToRemove.forEach(function (key) {\n      delete properties[key];\n    });\n  });\n};\n\nQueryGridController.prototype.makeGrid_ = function (data, source) {\n  var sourceLabel = \"\" + source.label;\n  var gridConfig = null;\n\n  if (data !== null) {\n    gridConfig = this.getGridConfiguration_(data);\n\n    if (gridConfig === null) {\n      return false;\n    }\n  }\n\n  if (!this.loadedGridSources.includes(sourceLabel)) {\n    this.loadedGridSources.push(sourceLabel);\n  }\n\n  this.gridSources[sourceLabel] = {\n    source: source\n  };\n\n  if (gridConfig) {\n    this.gridSources[sourceLabel].configuration = gridConfig;\n  }\n\n  return true;\n};\n\nQueryGridController.prototype.getGridConfiguration_ = function (data) {\n  if (!data.length) {\n    throw new Error('Missing data');\n  }\n\n  var clone = {};\n  Object.assign(clone, data[0]);\n  delete clone.ol_uid;\n  var columns = Object.keys(clone);\n  var columnDefs = [];\n  columns.forEach(function (column) {\n    columnDefs.push({\n      name: column\n    });\n  });\n\n  if (columnDefs.length > 0) {\n    return new ngeo_grid_Config_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](data, columnDefs);\n  } else {\n    return null;\n  }\n};\n\nQueryGridController.prototype.clear = function () {\n  this.active = false;\n  this.pending = false;\n  this.gridSources = {};\n  this.loadedGridSources = [];\n  this.selectedTab = null;\n  this.tooManyResults = false;\n  this.features_.clear();\n  this.highlightFeatures_.clear();\n  this.ngeoMapQuerent_.clear();\n  this.featuresForSources_ = {};\n\n  if (this.unregisterSelectWatcher_) {\n    this.unregisterSelectWatcher_();\n  }\n};\n\nQueryGridController.prototype.selectTab = function (gridSource) {\n  var _this5 = this;\n\n  var source = gridSource.source;\n  this.selectedTab = source.label;\n\n  if (this.unregisterSelectWatcher_) {\n    this.unregisterSelectWatcher_();\n    this.unregisterSelectWatcher_ = null;\n  }\n\n  if (gridSource.configuration !== undefined) {\n    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(function () {\n      return gridSource.configuration.selectedRows;\n    }, function (newSelected, oldSelectedRows) {\n      if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {\n        _this5.onSelectionChanged_();\n      }\n    });\n  }\n\n  this.updateFeatures_(gridSource);\n  this.reflowGrid_();\n};\n\nQueryGridController.prototype.reflowGrid_ = function () {\n  var id = this.escapeValue(this.selectedTab || '');\n  var activePane = this.$element_.find(\"div.tab-pane#\" + id);\n  activePane.removeClass('active').addClass('active');\n  this.$timeout_(function () {\n    activePane.find('div.ngeo-grid-table-container table').trigger('reflow');\n  });\n};\n\nQueryGridController.prototype.onSelectionChanged_ = function () {\n  if (this.selectedTab === null) {\n    return;\n  }\n\n  var gridSource = this.gridSources[\"\" + this.selectedTab];\n  this.updateFeatures_(gridSource);\n};\n\nQueryGridController.prototype.updateFeatures_ = function (gridSource) {\n  this.features_.clear();\n  this.highlightFeatures_.clear();\n\n  if (!gridSource.configuration) {\n    return;\n  }\n\n  var sourceLabel = \"\" + gridSource.source.label;\n  var featuresForSource = this.featuresForSources_[sourceLabel];\n  var selectedRows = gridSource.configuration.selectedRows;\n\n  for (var rowId in featuresForSource) {\n    var feature = featuresForSource[rowId];\n\n    if (rowId in selectedRows) {\n      this.highlightFeatures_.push(feature);\n    } else {\n      this.features_.push(feature);\n    }\n  }\n};\n\nQueryGridController.prototype.getActiveGridSource = function () {\n  if (this.selectedTab === null) {\n    return null;\n  } else {\n    return this.gridSources[\"\" + this.selectedTab];\n  }\n};\n\nQueryGridController.prototype.isOneSelected = function () {\n  var source = this.getActiveGridSource();\n\n  if (source === null || source.configuration === null) {\n    return false;\n  } else {\n    return source.configuration.getSelectedCount() > 0;\n  }\n};\n\nQueryGridController.prototype.getSelectedRowCount = function () {\n  var source = this.getActiveGridSource();\n\n  if (source === null || source.configuration === null) {\n    return 0;\n  } else {\n    return source.configuration.getSelectedCount();\n  }\n};\n\nQueryGridController.prototype.selectAll = function () {\n  var source = this.getActiveGridSource();\n\n  if (source !== null) {\n    source.configuration.selectAll();\n  }\n};\n\nQueryGridController.prototype.unselectAll = function () {\n  var source = this.getActiveGridSource();\n\n  if (source !== null) {\n    source.configuration.unselectAll();\n  }\n};\n\nQueryGridController.prototype.invertSelection = function () {\n  var source = this.getActiveGridSource();\n\n  if (source !== null) {\n    source.configuration.invertSelection();\n  }\n};\n\nQueryGridController.prototype.zoomToSelection = function () {\n  if (!this.map_) {\n    throw new Error('Missing map');\n  }\n\n  var source = this.getActiveGridSource();\n\n  if (source !== null) {\n    var extent = ol_extent_js__WEBPACK_IMPORTED_MODULE_8__[\"createEmpty\"]();\n    this.highlightFeatures_.forEach(function (feature) {\n      var geometry = feature.getGeometry();\n\n      if (!geometry) {\n        throw new Error('Missing geometry');\n      }\n\n      ol_extent_js__WEBPACK_IMPORTED_MODULE_8__[\"extend\"](extent, geometry.getExtent());\n    });\n    var size = this.map_.getSize();\n\n    if (!size) {\n      throw new Error('Missing size');\n    }\n\n    if (this.maxRecenterZoom === null) {\n      throw new Error('Missing maxRecenterZoom');\n    }\n\n    this.map_.getView().fit(extent, {\n      size: size,\n      maxZoom: this.maxRecenterZoom\n    });\n  }\n};\n\nQueryGridController.prototype.downloadCsv = function () {\n  var source = this.getActiveGridSource();\n\n  if (source !== null) {\n    var columnDefs = source.configuration.columnDefs;\n\n    if (!columnDefs) {\n      throw new Error('Missing columnDefs');\n    }\n\n    var selectedRows = source.configuration.getSelectedRows();\n    this.ngeoCsvDownload_.startDownload(selectedRows, columnDefs, this.filename_);\n  }\n};\n\nmodule.controller('GmfDisplayquerygridController', QueryGridController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/src/query/gridComponent.js?");

/***/ }),

/***/ 4:
/*!**************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/displayquerygrid.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/displayquerygrid.js */\"./contribs/gmf/examples/displayquerygrid.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/displayquerygrid.js?");

/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");

/***/ })

/******/ });