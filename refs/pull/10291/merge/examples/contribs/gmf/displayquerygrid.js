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
/******/ 	deferredModules.push([21,"commons"]);
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
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayquerygrid.css */ "./contribs/gmf/examples/displayquerygrid.css");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gmf-hidden.inc.css */ "./contribs/gmf/examples/gmf-hidden.inc.css");
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_datasource_Manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/datasource/Manager */ "./src/datasource/Manager.js");
/* harmony import */ var gmf_layertree_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/layertree/component */ "./src/layertree/component.js");
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var gmf_query_gridComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/query/gridComponent */ "./src/query/gridComponent.js");
/* harmony import */ var gmf_theme_Manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/theme/Manager */ "./src/theme/Manager.js");
/* harmony import */ var gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gmf/theme/Themes */ "./src/theme/Themes.js");
/* harmony import */ var ngeo_grid_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/grid/module */ "./src/grid/module.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_query_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngeo/query/component */ "./src/query/component.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer/WebGLTile */ "./node_modules/ol/layer/WebGLTile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
MainController.$inject = ["gmfThemes", "gmfDataSourcesManager", "gmfThemeManager", "defaultTheme"];
QueryresultController.$inject = ["ngeoQueryResult"];




















const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_datasource_Manager__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_layertree_component__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_map_component__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_query_gridComponent__WEBPACK_IMPORTED_MODULE_7__["default"].name, gmf_theme_Manager__WEBPACK_IMPORTED_MODULE_8__["default"].name, gmf_theme_Themes__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_grid_module__WEBPACK_IMPORTED_MODULE_10__["default"].name, ngeo_map_module__WEBPACK_IMPORTED_MODULE_11__["default"].name, ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_12__["default"].name, ngeo_query_component__WEBPACK_IMPORTED_MODULE_14__["default"].name]);
const queryresultComponent = {
  controller: 'gmfappQueryresultController',
  template: __webpack_require__(/*! ./partials/queryresult.html */ "./contribs/gmf/examples/partials/queryresult.html")
};
myModule.component('gmfappQueryresult', queryresultComponent);
function QueryresultController(ngeoQueryResult) {
  this.result = ngeoQueryResult;
}
myModule.controller('gmfappQueryresultController', QueryresultController);
function MainController(gmfThemes, gmfDataSourcesManager, gmfThemeManager, defaultTheme) {
  gmfThemes.loadThemes();
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_15__["default"]({
    layers: [new ol_layer_WebGLTile__WEBPACK_IMPORTED_MODULE_17__["default"]({
      source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_18__["default"]()
    })],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_16__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_13__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: [2537635, 1152640],
      zoom: 3
    })
  });
  this.dimensions = {};
  gmfDataSourcesManager.setDatasourceMap(this.map);
  gmfDataSourcesManager.setDimensions(this.dimensions);
  this.queryActive = true;
  this.themes = undefined;
  this.selectedTheme = null;
  this.updateTheme = function () {
    gmfThemeManager.addTheme(this.selectedTheme);
  };
  this.queryGridActive = true;
  gmfThemes.getThemesObject().then(themes => {
    if (themes) {
      this.themes = themes;
      themes.forEach(theme => {
        if (theme.name === defaultTheme) {
          this.selectedTheme = theme;
          return;
        }
      });
    }
  });
  ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_6__["default"].init(this.map);
}
myModule.controller('MainController', MainController);
myModule.constant('gmfDisplayQueryGridOptions', {
  featuresStyle: {
    fill: {
      color: [255, 170, 0, 0.6]
    },
    circle: {
      fill: {
        color: [255, 170, 0, 0.6]
      },
      radius: 5,
      stroke: {
        color: [255, 170, 0, 1],
        width: 2
      }
    },
    stroke: {
      color: [255, 170, 0, 1],
      width: 2
    }
  }
});
Object(_options__WEBPACK_IMPORTED_MODULE_19__["default"])(myModule);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/query/gridComponent.html":
/*!**************************************!*\
  !*** ./src/query/gridComponent.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="gmf-displayquerygrid panel" ng-show="ctrl.active">\n  <div class="close" ng-click="ctrl.clear()">&times;</div>\n\n  <ul class="nav nav-pills" role="tablist">\n    <li\n      class="nav-item"\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="presentation"\n      ng-click="ctrl.selectTab(gridSource)"\n    >\n      <a\n        class="nav-link"\n        href="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n        data-target="#{{ctrl.escapeValue(gridSource.source.label)}}"\n        aria-controls="{{ctrl.escapeValue(gridSource.source.label)}}"\n        role="tab"\n        data-toggle="tab"\n      >\n        <span> {{gridSource.source.label | translate}} ({{gridSource.source.features.length}}) </span>\n      </a>\n    </li>\n  </ul>\n\n  <div class="tab-content">\n    <div\n      ng-repeat="gridSource in ctrl.getGridSources() track by gridSource.source.label"\n      role="tabpanel"\n      class="tab-pane"\n      ng-class="{\'active\' : ctrl.isSelected(gridSource)}"\n      id="{{ctrl.escapeValue(gridSource.source.label)}}"\n    >\n      <ngeo-grid ngeo-grid-configuration="gridSource.configuration"> </ngeo-grid>\n    </div>\n    <div class="container-fluid">\n      <div\n        ng-show="!ctrl.pending && ctrl.getActiveGridSource() && ctrl.getActiveGridSource().configuration !== null"\n        class="row"\n      >\n        <div class="col-md-5 my-auto">\n          <span ng-if="ctrl.hasOneWithTooManyResults_()" class="gmf-query-grid-too-many text-warning"\n            >{{\'Only\' | translate}} {{ctrl.sumOfFeatures}} {{\'of\' | translate}} {{ctrl.sumOfAvailableResults}}\n            {{\'results displayed, as the maximum number is reached. Please refine your query.\' | translate\n            }}</span\n          >\n        </div>\n        <div class="col-md-7" class="pull-right">\n          <ul class="nav justify-content-end">\n            <li class="ng-hide" ng-show="ctrl.isOneSelected()">\n              <div class="btn btn-sm ng-binding">\n                {{ctrl.getSelectedRowCount()}} <span translate>selected element(s)</span>\n              </div>\n            </li>\n\n            <li ng-show="ctrl.isOneSelected()" class="ng-hide">\n              <button\n                class="btn btn-link btn-sm"\n                title="{{\'Zoom to selection\' | translate}}"\n                ng-click="ctrl.zoomToSelection()"\n              >\n                <i class="fa fa-search-plus"></i> <span translate>Zoom to</span>\n              </button>\n            </li>\n\n            <li ng-show="ctrl.isOneSelected()" class="ng-hide">\n              <button\n                class="btn btn-link btn-sm"\n                title="{{\'Export selection as CSV\' | translate}}"\n                ng-click="ctrl.downloadCsv()"\n              >\n                <i class="fa fa-download"></i> <span translate>Export as CSV</span>\n              </button>\n            </li>\n\n            <li class="dropdown">\n              <button\n                type="button"\n                class="dropup btn btn-default btn-sm dropdown-toggle"\n                data-toggle="dropdown"\n                aria-haspopup="true"\n                aria-expanded="false"\n              >\n                <span translate>Select</span>\n              </button>\n              <ul class="dropdown-menu" aria-labelledby="dLabel">\n                <li>\n                  <a href="" ng-click="ctrl.selectAll()" translate>All</a>\n                </li>\n\n                <li>\n                  <a href="" ng-click="ctrl.unselectAll()" translate>None</a>\n                </li>\n\n                <li>\n                  <a href="" ng-click="ctrl.invertSelection()" translate>Reverse selection</a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show="ctrl.pending" class="spinner-grid">\n      <i class="fa fa-spin"> ' +
((__t = (__webpack_require__(/*! gmf/icons/spinner.svg?viewbox&height=3rem */ "./src/icons/spinner.svg?viewbox&height=3rem"))) == null ? '' : __t) +
' </i>\n    </div>\n  </div>\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/query/gridComponent.js":
/*!************************************!*\
  !*** ./src/query/gridComponent.js ***!
  \************************************/
/*! exports provided: QueryGridController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryGridController", function() { return QueryGridController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_download_Csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/download/Csv */ "./src/download/Csv.ts");
/* harmony import */ var ngeo_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/grid/component */ "./src/grid/component.js");
/* harmony import */ var ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/grid/Config */ "./src/grid/Config.js");
/* harmony import */ var ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/map/FeatureOverlayMgr */ "./src/map/FeatureOverlayMgr.ts");
/* harmony import */ var ngeo_query_MapQuerent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/query/MapQuerent */ "./src/query/MapQuerent.js");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Collection */ "./node_modules/ol/Collection.js");
/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/extent */ "./node_modules/ol/extent.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
/* harmony import */ var gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gmfapi/store/panels */ "./srcapi/store/panels.ts");
/* harmony import */ var bootstrap_js_src_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bootstrap/js/src/dropdown */ "./node_modules/bootstrap/js/src/dropdown.js");
QueryGridController.$inject = ["$scope", "ngeoQueryResult", "ngeoMapQuerent", "$timeout", "ngeoQueryOptions", "gmfCsvFilename", "$element", "gmfDisplayQueryGridOptions"];












const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfQueryGridComponent', [ngeo_grid_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, ngeo_query_MapQuerent__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
myModule.value('gmfDisplayquerygridTemplateUrl', ($element, $attrs) => {
  const templateUrl = $attrs.gmfDisplayquerygridTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/query/gridComponent';
});
myModule.run(["$templateCache", $templateCache => {
  $templateCache.put('gmf/query/gridComponent', __webpack_require__(/*! ./gridComponent.html */ "./src/query/gridComponent.html"));
}]);
gmfDisplayquerygridTemplateUrl.$inject = ["$element", "$attrs", "gmfDisplayquerygridTemplateUrl"];
function gmfDisplayquerygridTemplateUrl($element, $attrs, gmfDisplayquerygridTemplateUrl) {
  return gmfDisplayquerygridTemplateUrl($element, $attrs);
}
const queryGridComponent = {
  controller: 'GmfDisplayquerygridController as ctrl',
  bindings: {
    'active': '=?gmfDisplayquerygridActive',
    'getMapFn': '&gmfDisplayquerygridMap'
  },
  templateUrl: gmfDisplayquerygridTemplateUrl
};
myModule.component('gmfDisplayquerygrid', queryGridComponent);
function QueryGridController($scope, ngeoQueryResult, ngeoMapQuerent, $timeout, ngeoQueryOptions, gmfCsvFilename, $element, gmfDisplayQueryGridOptions) {
  this.options = gmfDisplayQueryGridOptions;
  this.$scope_ = $scope;
  this.$timeout_ = $timeout;
  this.ngeoQueryResult = ngeoQueryResult;
  this.ngeoMapQuerent_ = ngeoMapQuerent;
  this.ngeoCsvDownload_ = ngeo_download_Csv__WEBPACK_IMPORTED_MODULE_1__["default"];
  this.$element_ = $element;
  this.maxResults = ngeoQueryOptions.limit !== undefined ? ngeoQueryOptions.limit : 50;
  this.active = false;
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.featuresForSources_ = {};
  this.features_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_6__["default"]();
  this.highlightFeatures_ = new ol_Collection__WEBPACK_IMPORTED_MODULE_6__["default"]();
  this.filename_ = gmfCsvFilename;
  this.map_ = null;
  this.sumOfFeatures = 0;
  this.sumOfAvailableResults = 0;
  this.$scope_.$watchCollection(() => ngeoQueryResult, (newQueryResult, oldQueryResult) => {
    if (ngeoQueryResult.pending) {
      this.active = true;
      this.pending = true;
      gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
        state: true,
        noError: true
      });
    }
    if (newQueryResult !== oldQueryResult) {
      this.updateData_();
    }
  });
  this.unregisterSelectWatcher_ = null;
  this.getMapFn = null;
}
QueryGridController.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }
  const featuresOverlay = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__["default"].getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  featuresOverlay.setStyle(Object(ngeo_options__WEBPACK_IMPORTED_MODULE_9__["buildStyle"])(this.options.featuresStyle));
  const highlightFeaturesOverlay = ngeo_map_FeatureOverlayMgr__WEBPACK_IMPORTED_MODULE_4__["default"].getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  const highlightFeatureStyle = Object(ngeo_options__WEBPACK_IMPORTED_MODULE_9__["buildStyle"])(this.options.selectedFeatureStyle);
  highlightFeaturesOverlay.setStyle(highlightFeatureStyle);
  const mapFn = this.getMapFn;
  if (mapFn) {
    const map = mapFn();
    if (!(map instanceof ol_Map__WEBPACK_IMPORTED_MODULE_8__["default"])) {
      throw new Error('Wrong map type');
    }
    this.map_ = map;
  }
};
QueryGridController.prototype.getGridSources = function () {
  return this.loadedGridSources.map(sourceLabel => this.gridSources[sourceLabel]);
};
QueryGridController.prototype.updateData_ = function () {
  if ((this.ngeoQueryResult.pending || this.ngeoQueryResult.total === 0) && !this.hasOneWithTooManyResults_()) {
    const oldActive = this.active;
    this.clear();
    if (oldActive) {
      this.active = this.ngeoQueryResult.pending;
      gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
        state: this.active,
        noError: true
      });
      this.pending = this.ngeoQueryResult.pending;
    }
    return;
  }
  this.sumOfAvailableResults = 0;
  this.sumOfFeatures = 0;
  const countedSources = [];
  this.ngeoQueryResult.sources.forEach(source => {
    if (!countedSources.includes(source.label)) {
      this.sumOfFeatures += source.features.length;
    }
    if (!source.requestPartners || !source.requestPartners.some(label => countedSources.includes(label))) {
      this.sumOfAvailableResults += source.totalFeatureCount;
    }
    countedSources.push(source.label);
  });
  this.active = true;
  gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
    state: true
  });
  this.pending = false;
  let sources = this.ngeoQueryResult.sources;
  if (Object.keys(this.options.mergeTabs || {}).length > 0) {
    sources = this.getMergedSources_(sources);
  }
  sources.forEach(source => {
    if (source.tooManyResults && source.features.length === 0) {
      this.makeGrid_(null, source);
    } else {
      source.id = this.escapeValue(source.id);
      const features = source.features;
      if (features.length > 0) {
        this.collectData_(source);
      }
    }
  });
  if (this.loadedGridSources.length === 0) {
    this.active = false;
    gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
      state: false,
      noError: true
    });
    return;
  }
  if (this.selectedTab === null || !(`${this.selectedTab}` in this.gridSources)) {
    this.$timeout_(() => {
      const firstSourceId = this.loadedGridSources[0];
      this.selectTab(this.gridSources[firstSourceId]);
    }, 0);
  }
};
QueryGridController.prototype.hasOneWithTooManyResults_ = function () {
  return this.ngeoQueryResult.sources.some(source => source.tooManyResults);
};
QueryGridController.prototype.escapeValue = function (value) {
  if (typeof value == 'number') {
    return value;
  } else {
    const toEscape = /[-[\]/{}()*+?.\\^$ |]/g;
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
  const allSources = [];
  const mergedSources = {};
  sources.forEach(source => {
    const mergedSource = this.getMergedSource_(source, mergedSources);
    if (mergedSource === null) {
      allSources.push(source);
    }
  });
  for (const mergedSourceId in mergedSources) {
    allSources.push(mergedSources[mergedSourceId]);
  }
  return allSources;
};
QueryGridController.prototype.getMergedSource_ = function (source, mergedSources) {
  let mergeSourceId = null;
  for (const currentMergeSourceId in this.options.mergeTabs || {}) {
    const sourceLabels = this.options.mergeTabs[currentMergeSourceId];
    const containsSource = sourceLabels.some(sourceLabel => sourceLabel == source.label);
    if (containsSource) {
      mergeSourceId = currentMergeSourceId;
      break;
    }
  }
  if (mergeSourceId === null) {
    return null;
  }
  let newRequest = true;
  let mergeSource;
  if (mergeSourceId in mergedSources) {
    mergeSource = mergedSources[mergeSourceId];
    if (source.requestPartners) {
      newRequest = !source.requestPartners.some(label => mergeSource.mergeComposants.includes(label));
    }
    mergeSource.mergeComposants.push(source.label);
  } else {
    mergeSource = {
      features: [],
      id: mergeSourceId,
      label: mergeSourceId,
      limit: 0,
      pending: false,
      tooManyResults: false,
      mergeComposants: [source.label]
    };
    mergedSources[mergeSourceId] = mergeSource;
  }
  source.features.forEach(feature => {
    mergeSource.features.push(feature);
  });
  mergeSource.tooManyResults = mergeSource.tooManyResults || source.tooManyResults;
  if (newRequest) {
    if (source.totalFeatureCount !== undefined) {
      mergeSource.totalFeatureCount = mergeSource.totalFeatureCount !== undefined ? mergeSource.totalFeatureCount + source.totalFeatureCount : source.totalFeatureCount;
    }
    mergeSource.limit += source.limit;
  }
  return mergeSource;
};
QueryGridController.prototype.collectData_ = function (source) {
  const features = source.features;
  const allProperties = [];
  const featureGeometriesNames = [];
  const featuresForSource = {};
  let properties, featureGeometryName;
  features.forEach(feature => {
    properties = feature.getProperties();
    if (properties !== undefined) {
      featureGeometryName = feature.getGeometryName();
      if (!featureGeometriesNames.includes(featureGeometryName)) {
        featureGeometriesNames.push(featureGeometryName);
      }
      allProperties.push(properties);
      featuresForSource[Object(ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__["getRowUid"])(properties)] = feature;
    }
  });
  this.cleanProperties_(allProperties, featureGeometriesNames);
  if (allProperties.length > 0) {
    const gridCreated = this.makeGrid_(allProperties, source);
    if (gridCreated) {
      this.featuresForSources_[`${source.label}`] = featuresForSource;
    }
  }
};
QueryGridController.prototype.cleanProperties_ = function (allProperties, featureGeometriesNames) {
  allProperties.forEach(properties => {
    featureGeometriesNames.forEach(featureGeometryName => {
      delete properties[featureGeometryName];
    });
    delete properties.boundedBy;
    delete properties.ngeo_feature_type_;
  });
  if (this.options.removeEmptyColumns === true) {
    this.removeEmptyColumnsFn_(allProperties);
  }
};
QueryGridController.prototype.removeEmptyColumnsFn_ = function (allProperties) {
  const keysToKeep = [];
  let i, key;
  for (key in allProperties[0]) {
    for (i = 0; i < allProperties.length; i++) {
      if (allProperties[i][key] !== undefined) {
        keysToKeep.push(key);
        break;
      }
    }
  }
  let keyToRemove;
  allProperties.forEach(properties => {
    keyToRemove = [];
    for (key in properties) {
      if (!keysToKeep.includes(key)) {
        keyToRemove.push(key);
      }
    }
    keyToRemove.forEach(key => {
      delete properties[key];
    });
  });
};
QueryGridController.prototype.makeGrid_ = function (data, source) {
  const sourceLabel = `${source.label}`;
  let gridConfig = null;
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
  const clone = {};
  Object.assign(clone, data[0]);
  delete clone.ol_uid;
  const columns = Object.keys(clone);
  const columnDefs = [];
  columns.forEach(column => {
    columnDefs.push({
      name: column
    });
  });
  if (columnDefs.length > 0) {
    return new ngeo_grid_Config__WEBPACK_IMPORTED_MODULE_3__["default"](data, columnDefs);
  } else {
    return null;
  }
};
QueryGridController.prototype.getActiveGridSource = function () {
  if (this.selectedTab === null) {
    return null;
  } else {
    return this.gridSources[`${this.selectedTab}`];
  }
};
QueryGridController.prototype.clear = function () {
  this.active = false;
  gmfapi_store_panels__WEBPACK_IMPORTED_MODULE_10__["default"].openFooterPanel('queryresult', {
    state: false,
    noError: true
  });
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
  const source = gridSource.source;
  this.selectedTab = source.label;
  if (this.unregisterSelectWatcher_) {
    this.unregisterSelectWatcher_();
    this.unregisterSelectWatcher_ = null;
  }
  if (gridSource.configuration !== undefined) {
    this.unregisterSelectWatcher_ = this.$scope_.$watchCollection(() => gridSource.configuration.selectedRows, (newSelected, oldSelectedRows) => {
      if (Object.keys(newSelected) !== Object.keys(oldSelectedRows)) {
        this.onSelectionChanged_();
      }
    });
  }
  this.updateFeatures_(gridSource);
  this.reflowGrid_();
};
QueryGridController.prototype.reflowGrid_ = function () {
  const id = this.escapeValue(this.selectedTab || '');
  const activePane = this.$element_.find(`div.tab-pane#${id}`);
  activePane.removeClass('active').addClass('active');
  this.$timeout_(() => {
    activePane.find('div.ngeo-grid-table-container table').trigger('reflow');
  });
};
QueryGridController.prototype.onSelectionChanged_ = function () {
  if (this.selectedTab === null) {
    return;
  }
  const gridSource = this.gridSources[`${this.selectedTab}`];
  this.updateFeatures_(gridSource);
};
QueryGridController.prototype.updateFeatures_ = function (gridSource) {
  this.features_.clear();
  this.highlightFeatures_.clear();
  if (!gridSource.configuration) {
    return;
  }
  const sourceLabel = `${gridSource.source.label}`;
  const featuresForSource = this.featuresForSources_[sourceLabel];
  const selectedRows = gridSource.configuration.selectedRows;
  for (const rowId in featuresForSource) {
    const feature = featuresForSource[rowId];
    if (rowId in selectedRows) {
      this.highlightFeatures_.push(feature);
    } else {
      this.features_.push(feature);
    }
  }
};
QueryGridController.prototype.isOneSelected = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return false;
  } else {
    return source.configuration.getSelectedCount() > 0;
  }
};
QueryGridController.prototype.getSelectedRowCount = function () {
  const source = this.getActiveGridSource();
  if (source === null || source.configuration === null) {
    return 0;
  } else {
    return source.configuration.getSelectedCount();
  }
};
QueryGridController.prototype.selectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.selectAll();
  }
};
QueryGridController.prototype.unselectAll = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.unselectAll();
  }
};
QueryGridController.prototype.invertSelection = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    source.configuration.invertSelection();
  }
};
QueryGridController.prototype.zoomToSelection = function () {
  if (!this.map_) {
    throw new Error('Missing map');
  }
  const source = this.getActiveGridSource();
  if (source !== null) {
    const extent = ol_extent__WEBPACK_IMPORTED_MODULE_7__["createEmpty"]();
    this.highlightFeatures_.forEach(feature => {
      const geometry = feature.getGeometry();
      if (!geometry) {
        throw new Error('Missing geometry');
      }
      ol_extent__WEBPACK_IMPORTED_MODULE_7__["extend"](extent, geometry.getExtent());
    });
    const size = this.map_.getSize();
    if (!size) {
      throw new Error('Missing size');
    }
    this.map_.getView().fit(extent, {
      size,
      maxZoom: this.options.maxRecenterZoom
    });
  }
};
QueryGridController.prototype.downloadCsv = function () {
  const source = this.getActiveGridSource();
  if (source !== null) {
    const columnDefs = source.configuration.columnDefs;
    if (!columnDefs) {
      throw new Error('Missing columnDefs');
    }
    const selectedRows = source.configuration.getSelectedRows();
    this.ngeoCsvDownload_.startDownload(selectedRows, columnDefs, this.filename_);
  }
};
myModule.controller('GmfDisplayquerygridController', QueryGridController);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 21:
/*!**************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/displayquerygrid.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./src/mainmodule.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlcnkvZ3JpZENvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9xdWVyeS9ncmlkQ29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJkaXNwbGF5cXVlcnlncmlkXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsyMSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiZ21mVGhlbWVzXCIsIFwiZ21mRGF0YVNvdXJjZXNNYW5hZ2VyXCIsIFwiZ21mVGhlbWVNYW5hZ2VyXCIsIFwiZGVmYXVsdFRoZW1lXCJdO1xuUXVlcnlyZXN1bHRDb250cm9sbGVyLiRpbmplY3QgPSBbXCJuZ2VvUXVlcnlSZXN1bHRcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCAnLi9kaXNwbGF5cXVlcnlncmlkLmNzcyc7XG5pbXBvcnQgJy4vZ21mLWhpZGRlbi5pbmMuY3NzJztcbmltcG9ydCBnbWZEYXRhc291cmNlTWFuYWdlciBmcm9tICdnbWYvZGF0YXNvdXJjZS9NYW5hZ2VyJztcbmltcG9ydCBnbWZMYXllcnRyZWVDb21wb25lbnQgZnJvbSAnZ21mL2xheWVydHJlZS9jb21wb25lbnQnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyIGZyb20gJ25nZW8vbWFwL0ZlYXR1cmVPdmVybGF5TWdyJztcbmltcG9ydCBnbWZRdWVyeUdyaWRDb21wb25lbnQgZnJvbSAnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnO1xuaW1wb3J0IGdtZlRoZW1lTWFuYWdlciBmcm9tICdnbWYvdGhlbWUvTWFuYWdlcic7XG5pbXBvcnQgZ21mVGhlbWVUaGVtZXMgZnJvbSAnZ21mL3RoZW1lL1RoZW1lcyc7XG5pbXBvcnQgbmdlb0dyaWRNb2R1bGUgZnJvbSAnbmdlby9ncmlkL21vZHVsZSc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUnO1xuaW1wb3J0IG5nZW9NaXNjQnRuQ29tcG9uZW50IGZyb20gJ25nZW8vbWlzYy9idG5Db21wb25lbnQnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ25nZW8vcHJvai9FUFNHXzIwNTYnO1xuaW1wb3J0IG5nZW9RdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L2NvbXBvbmVudCc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvV2ViR0xUaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbJ2dldHRleHQnLCBnbWZEYXRhc291cmNlTWFuYWdlci5uYW1lLCBnbWZMYXllcnRyZWVDb21wb25lbnQubmFtZSwgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIGdtZlF1ZXJ5R3JpZENvbXBvbmVudC5uYW1lLCBnbWZUaGVtZU1hbmFnZXIubmFtZSwgZ21mVGhlbWVUaGVtZXMubmFtZSwgbmdlb0dyaWRNb2R1bGUubmFtZSwgbmdlb01hcE1vZHVsZS5uYW1lLCBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLCBuZ2VvUXVlcnlDb21wb25lbnQubmFtZV0pO1xuY29uc3QgcXVlcnlyZXN1bHRDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wYXJ0aWFscy9xdWVyeXJlc3VsdC5odG1sJylcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2dtZmFwcFF1ZXJ5cmVzdWx0JywgcXVlcnlyZXN1bHRDb21wb25lbnQpO1xuZnVuY3Rpb24gUXVlcnlyZXN1bHRDb250cm9sbGVyKG5nZW9RdWVyeVJlc3VsdCkge1xuICB0aGlzLnJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ2dtZmFwcFF1ZXJ5cmVzdWx0Q29udHJvbGxlcicsIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcik7XG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihnbWZUaGVtZXMsIGdtZkRhdGFTb3VyY2VzTWFuYWdlciwgZ21mVGhlbWVNYW5hZ2VyLCBkZWZhdWx0VGhlbWUpIHtcbiAgZ21mVGhlbWVzLmxvYWRUaGVtZXMoKTtcbiAgdGhpcy5tYXAgPSBuZXcgb2xNYXAoe1xuICAgIGxheWVyczogW25ldyBvbExheWVyVGlsZSh7XG4gICAgICBzb3VyY2U6IG5ldyBvbFNvdXJjZU9TTSgpXG4gICAgfSldLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgcHJvamVjdGlvbjogRVBTRzIwNTYsXG4gICAgICByZXNvbHV0aW9uczogWzIwMCwgMTAwLCA1MCwgMjAsIDEwLCA1LCAyLjUsIDIsIDEsIDAuNV0sXG4gICAgICBjZW50ZXI6IFsyNTM3NjM1LCAxMTUyNjQwXSxcbiAgICAgIHpvb206IDNcbiAgICB9KVxuICB9KTtcbiAgdGhpcy5kaW1lbnNpb25zID0ge307XG4gIGdtZkRhdGFTb3VyY2VzTWFuYWdlci5zZXREYXRhc291cmNlTWFwKHRoaXMubWFwKTtcbiAgZ21mRGF0YVNvdXJjZXNNYW5hZ2VyLnNldERpbWVuc2lvbnModGhpcy5kaW1lbnNpb25zKTtcbiAgdGhpcy5xdWVyeUFjdGl2ZSA9IHRydWU7XG4gIHRoaXMudGhlbWVzID0gdW5kZWZpbmVkO1xuICB0aGlzLnNlbGVjdGVkVGhlbWUgPSBudWxsO1xuICB0aGlzLnVwZGF0ZVRoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGdtZlRoZW1lTWFuYWdlci5hZGRUaGVtZSh0aGlzLnNlbGVjdGVkVGhlbWUpO1xuICB9O1xuICB0aGlzLnF1ZXJ5R3JpZEFjdGl2ZSA9IHRydWU7XG4gIGdtZlRoZW1lcy5nZXRUaGVtZXNPYmplY3QoKS50aGVuKHRoZW1lcyA9PiB7XG4gICAgaWYgKHRoZW1lcykge1xuICAgICAgdGhpcy50aGVtZXMgPSB0aGVtZXM7XG4gICAgICB0aGVtZXMuZm9yRWFjaCh0aGVtZSA9PiB7XG4gICAgICAgIGlmICh0aGVtZS5uYW1lID09PSBkZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVGhlbWUgPSB0aGVtZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5pbml0KHRoaXMubWFwKTtcbn1cbm15TW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29uc3RhbnQoJ2dtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zJywge1xuICBmZWF0dXJlc1N0eWxlOiB7XG4gICAgZmlsbDoge1xuICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XVxuICAgIH0sXG4gICAgY2lyY2xlOiB7XG4gICAgICBmaWxsOiB7XG4gICAgICAgIGNvbG9yOiBbMjU1LCAxNzAsIDAsIDAuNl1cbiAgICAgIH0sXG4gICAgICByYWRpdXM6IDUsXG4gICAgICBzdHJva2U6IHtcbiAgICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMV0sXG4gICAgICAgIHdpZHRoOiAyXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiBbMjU1LCAxNzAsIDAsIDFdLFxuICAgICAgd2lkdGg6IDJcbiAgICB9XG4gIH1cbn0pO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaikge1xub2JqIHx8IChvYmogPSB7fSk7XG52YXIgX190LCBfX3AgPSAnJztcbndpdGggKG9iaikge1xuX19wICs9ICc8ZGl2IGNsYXNzPVwiZ21mLWRpc3BsYXlxdWVyeWdyaWQgcGFuZWxcIiBuZy1zaG93PVwiY3RybC5hY3RpdmVcIj5cXG4gIDxkaXYgY2xhc3M9XCJjbG9zZVwiIG5nLWNsaWNrPVwiY3RybC5jbGVhcigpXCI+JnRpbWVzOzwvZGl2PlxcblxcbiAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiIHJvbGU9XCJ0YWJsaXN0XCI+XFxuICAgIDxsaVxcbiAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxcbiAgICAgIG5nLXJlcGVhdD1cImdyaWRTb3VyY2UgaW4gY3RybC5nZXRHcmlkU291cmNlcygpIHRyYWNrIGJ5IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsXCJcXG4gICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcXG4gICAgICBuZy1jbGljaz1cImN0cmwuc2VsZWN0VGFiKGdyaWRTb3VyY2UpXCJcXG4gICAgPlxcbiAgICAgIDxhXFxuICAgICAgICBjbGFzcz1cIm5hdi1saW5rXCJcXG4gICAgICAgIGhyZWY9XCIje3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcXG4gICAgICAgIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxcbiAgICAgICAgZGF0YS10YXJnZXQ9XCIje3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcXG4gICAgICAgIGFyaWEtY29udHJvbHM9XCJ7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIlxcbiAgICAgICAgcm9sZT1cInRhYlwiXFxuICAgICAgICBkYXRhLXRvZ2dsZT1cInRhYlwiXFxuICAgICAgPlxcbiAgICAgICAgPHNwYW4+IHt7Z3JpZFNvdXJjZS5zb3VyY2UubGFiZWwgfCB0cmFuc2xhdGV9fSAoe3tncmlkU291cmNlLnNvdXJjZS5mZWF0dXJlcy5sZW5ndGh9fSkgPC9zcGFuPlxcbiAgICAgIDwvYT5cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cXG4gICAgPGRpdlxcbiAgICAgIG5nLXJlcGVhdD1cImdyaWRTb3VyY2UgaW4gY3RybC5nZXRHcmlkU291cmNlcygpIHRyYWNrIGJ5IGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsXCJcXG4gICAgICByb2xlPVwidGFicGFuZWxcIlxcbiAgICAgIGNsYXNzPVwidGFiLXBhbmVcIlxcbiAgICAgIG5nLWNsYXNzPVwie1xcJ2FjdGl2ZVxcJyA6IGN0cmwuaXNTZWxlY3RlZChncmlkU291cmNlKX1cIlxcbiAgICAgIGlkPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcXG4gICAgPlxcbiAgICAgIDxuZ2VvLWdyaWQgbmdlby1ncmlkLWNvbmZpZ3VyYXRpb249XCJncmlkU291cmNlLmNvbmZpZ3VyYXRpb25cIj4gPC9uZ2VvLWdyaWQ+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XFxuICAgICAgPGRpdlxcbiAgICAgICAgbmctc2hvdz1cIiFjdHJsLnBlbmRpbmcgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkgJiYgY3RybC5nZXRBY3RpdmVHcmlkU291cmNlKCkuY29uZmlndXJhdGlvbiAhPT0gbnVsbFwiXFxuICAgICAgICBjbGFzcz1cInJvd1wiXFxuICAgICAgPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC01IG15LWF1dG9cIj5cXG4gICAgICAgICAgPHNwYW4gbmctaWY9XCJjdHJsLmhhc09uZVdpdGhUb29NYW55UmVzdWx0c18oKVwiIGNsYXNzPVwiZ21mLXF1ZXJ5LWdyaWQtdG9vLW1hbnkgdGV4dC13YXJuaW5nXCJcXG4gICAgICAgICAgICA+e3tcXCdPbmx5XFwnIHwgdHJhbnNsYXRlfX0ge3tjdHJsLnN1bU9mRmVhdHVyZXN9fSB7e1xcJ29mXFwnIHwgdHJhbnNsYXRlfX0ge3tjdHJsLnN1bU9mQXZhaWxhYmxlUmVzdWx0c319XFxuICAgICAgICAgICAge3tcXCdyZXN1bHRzIGRpc3BsYXllZCwgYXMgdGhlIG1heGltdW0gbnVtYmVyIGlzIHJlYWNoZWQuIFBsZWFzZSByZWZpbmUgeW91ciBxdWVyeS5cXCcgfCB0cmFuc2xhdGVcXG4gICAgICAgICAgICB9fTwvc3BhblxcbiAgICAgICAgICA+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtN1wiIGNsYXNzPVwicHVsbC1yaWdodFwiPlxcbiAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYganVzdGlmeS1jb250ZW50LWVuZFwiPlxcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5nLWhpZGVcIiBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLXNtIG5nLWJpbmRpbmdcIj5cXG4gICAgICAgICAgICAgICAge3tjdHJsLmdldFNlbGVjdGVkUm93Q291bnQoKX19IDxzcGFuIHRyYW5zbGF0ZT5zZWxlY3RlZCBlbGVtZW50KHMpPC9zcGFuPlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9saT5cXG5cXG4gICAgICAgICAgICA8bGkgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCIgY2xhc3M9XCJuZy1oaWRlXCI+XFxuICAgICAgICAgICAgICA8YnV0dG9uXFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGJ0bi1zbVwiXFxuICAgICAgICAgICAgICAgIHRpdGxlPVwie3tcXCdab29tIHRvIHNlbGVjdGlvblxcJyB8IHRyYW5zbGF0ZX19XCJcXG4gICAgICAgICAgICAgICAgbmctY2xpY2s9XCJjdHJsLnpvb21Ub1NlbGVjdGlvbigpXCJcXG4gICAgICAgICAgICAgID5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2gtcGx1c1wiPjwvaT4gPHNwYW4gdHJhbnNsYXRlPlpvb20gdG88L3NwYW4+XFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2xpPlxcblxcbiAgICAgICAgICAgIDxsaSBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIiBjbGFzcz1cIm5nLWhpZGVcIj5cXG4gICAgICAgICAgICAgIDxidXR0b25cXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ7e1xcJ0V4cG9ydCBzZWxlY3Rpb24gYXMgQ1NWXFwnIHwgdHJhbnNsYXRlfX1cIlxcbiAgICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwuZG93bmxvYWRDc3YoKVwiXFxuICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZG93bmxvYWRcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5FeHBvcnQgYXMgQ1NWPC9zcGFuPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgPC9saT5cXG5cXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJkcm9wZG93blwiPlxcbiAgICAgICAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wdXAgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBkcm9wZG93bi10b2dnbGVcIlxcbiAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcXG4gICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxcbiAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICA8c3BhbiB0cmFuc2xhdGU+U2VsZWN0PC9zcGFuPlxcbiAgICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZExhYmVsXCI+XFxuICAgICAgICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiXCIgbmctY2xpY2s9XCJjdHJsLnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPkFsbDwvYT5cXG4gICAgICAgICAgICAgICAgPC9saT5cXG5cXG4gICAgICAgICAgICAgICAgPGxpPlxcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJcIiBuZy1jbGljaz1cImN0cmwudW5zZWxlY3RBbGwoKVwiIHRyYW5zbGF0ZT5Ob25lPC9hPlxcbiAgICAgICAgICAgICAgICA8L2xpPlxcblxcbiAgICAgICAgICAgICAgICA8bGk+XFxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIlwiIG5nLWNsaWNrPVwiY3RybC5pbnZlcnRTZWxlY3Rpb24oKVwiIHRyYW5zbGF0ZT5SZXZlcnNlIHNlbGVjdGlvbjwvYT5cXG4gICAgICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBuZy1zaG93PVwiY3RybC5wZW5kaW5nXCIgY2xhc3M9XCJzcGlubmVyLWdyaWRcIj5cXG4gICAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5cIj4gJyArXG4oKF9fdCA9IChyZXF1aXJlKCdnbWYvaWNvbnMvc3Bpbm5lci5zdmc/dmlld2JveCZoZWlnaHQ9M3JlbScpKSkgPT0gbnVsbCA/ICcnIDogX190KSArXG4nIDwvaT5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiUXVlcnlHcmlkQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibmdlb1F1ZXJ5UmVzdWx0XCIsIFwibmdlb01hcFF1ZXJlbnRcIiwgXCIkdGltZW91dFwiLCBcIm5nZW9RdWVyeU9wdGlvbnNcIiwgXCJnbWZDc3ZGaWxlbmFtZVwiLCBcIiRlbGVtZW50XCIsIFwiZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBkb3dubG9hZENzdlNlcnZpY2UgZnJvbSAnbmdlby9kb3dubG9hZC9Dc3YnO1xuaW1wb3J0IG5nZW9HcmlkQ29tcG9uZW50IGZyb20gJ25nZW8vZ3JpZC9jb21wb25lbnQnO1xuaW1wb3J0IG5nZW9HcmlkQ29uZmlnLCB7IGdldFJvd1VpZCB9IGZyb20gJ25nZW8vZ3JpZC9Db25maWcnO1xuaW1wb3J0IG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nciBmcm9tICduZ2VvL21hcC9GZWF0dXJlT3ZlcmxheU1ncic7XG5pbXBvcnQgbmdlb1F1ZXJ5TWFwUXVlcmVudCBmcm9tICduZ2VvL3F1ZXJ5L01hcFF1ZXJlbnQnO1xuaW1wb3J0IG9sQ29sbGVjdGlvbiBmcm9tICdvbC9Db2xsZWN0aW9uJztcbmltcG9ydCAqIGFzIG9sRXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCB7IGJ1aWxkU3R5bGUgfSBmcm9tICduZ2VvL29wdGlvbnMnO1xuaW1wb3J0IHBhbmVscyBmcm9tICdnbWZhcGkvc3RvcmUvcGFuZWxzJztcbmltcG9ydCAnYm9vdHN0cmFwL2pzL3NyYy9kcm9wZG93bic7XG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZRdWVyeUdyaWRDb21wb25lbnQnLCBbbmdlb0dyaWRDb21wb25lbnQubmFtZSwgbmdlb1F1ZXJ5TWFwUXVlcmVudC5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZSgnZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsJywgKCRlbGVtZW50LCAkYXR0cnMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGVVcmwgPSAkYXR0cnMuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRldXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9xdWVyeS9ncmlkQ29tcG9uZW50Jztcbn0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsICR0ZW1wbGF0ZUNhY2hlID0+IHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCcsIHJlcXVpcmUoJy4vZ3JpZENvbXBvbmVudC5odG1sJykpO1xufV0pO1xuZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRhdHRyc1wiLCBcImdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzKTtcbn1cbmNvbnN0IHF1ZXJ5R3JpZENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdhY3RpdmUnOiAnPT9nbWZEaXNwbGF5cXVlcnlncmlkQWN0aXZlJyxcbiAgICAnZ2V0TWFwRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRNYXAnXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxcbn07XG5teU1vZHVsZS5jb21wb25lbnQoJ2dtZkRpc3BsYXlxdWVyeWdyaWQnLCBxdWVyeUdyaWRDb21wb25lbnQpO1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXJ5R3JpZENvbnRyb2xsZXIoJHNjb3BlLCBuZ2VvUXVlcnlSZXN1bHQsIG5nZW9NYXBRdWVyZW50LCAkdGltZW91dCwgbmdlb1F1ZXJ5T3B0aW9ucywgZ21mQ3N2RmlsZW5hbWUsICRlbGVtZW50LCBnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBnbWZEaXNwbGF5UXVlcnlHcmlkT3B0aW9ucztcbiAgdGhpcy4kc2NvcGVfID0gJHNjb3BlO1xuICB0aGlzLiR0aW1lb3V0XyA9ICR0aW1lb3V0O1xuICB0aGlzLm5nZW9RdWVyeVJlc3VsdCA9IG5nZW9RdWVyeVJlc3VsdDtcbiAgdGhpcy5uZ2VvTWFwUXVlcmVudF8gPSBuZ2VvTWFwUXVlcmVudDtcbiAgdGhpcy5uZ2VvQ3N2RG93bmxvYWRfID0gZG93bmxvYWRDc3ZTZXJ2aWNlO1xuICB0aGlzLiRlbGVtZW50XyA9ICRlbGVtZW50O1xuICB0aGlzLm1heFJlc3VsdHMgPSBuZ2VvUXVlcnlPcHRpb25zLmxpbWl0ICE9PSB1bmRlZmluZWQgPyBuZ2VvUXVlcnlPcHRpb25zLmxpbWl0IDogNTA7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICB0aGlzLmdyaWRTb3VyY2VzID0ge307XG4gIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuICB0aGlzLmZlYXR1cmVzXyA9IG5ldyBvbENvbGxlY3Rpb24oKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gIHRoaXMuZmlsZW5hbWVfID0gZ21mQ3N2RmlsZW5hbWU7XG4gIHRoaXMubWFwXyA9IG51bGw7XG4gIHRoaXMuc3VtT2ZGZWF0dXJlcyA9IDA7XG4gIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzID0gMDtcbiAgdGhpcy4kc2NvcGVfLiR3YXRjaENvbGxlY3Rpb24oKCkgPT4gbmdlb1F1ZXJ5UmVzdWx0LCAobmV3UXVlcnlSZXN1bHQsIG9sZFF1ZXJ5UmVzdWx0KSA9PiB7XG4gICAgaWYgKG5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgICAgIHN0YXRlOiB0cnVlLFxuICAgICAgICBub0Vycm9yOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5ld1F1ZXJ5UmVzdWx0ICE9PSBvbGRRdWVyeVJlc3VsdCkge1xuICAgICAgdGhpcy51cGRhdGVEYXRhXygpO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gbnVsbDtcbiAgdGhpcy5nZXRNYXBGbiA9IG51bGw7XG59XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuZ2V0TWFwRm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0TWFwRm4nKTtcbiAgfVxuICBjb25zdCBmZWF0dXJlc092ZXJsYXkgPSBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IuZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldEZlYXR1cmVzKHRoaXMuZmVhdHVyZXNfKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLmZlYXR1cmVzU3R5bGUpKTtcbiAgY29uc3QgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5ID0gbmdlb01hcEZlYXR1cmVPdmVybGF5TWdyLmdldEZlYXR1cmVPdmVybGF5KCk7XG4gIGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheS5zZXRGZWF0dXJlcyh0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXyk7XG4gIGNvbnN0IGhpZ2hsaWdodEZlYXR1cmVTdHlsZSA9IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNlbGVjdGVkRmVhdHVyZVN0eWxlKTtcbiAgaGlnaGxpZ2h0RmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGhpZ2hsaWdodEZlYXR1cmVTdHlsZSk7XG4gIGNvbnN0IG1hcEZuID0gdGhpcy5nZXRNYXBGbjtcbiAgaWYgKG1hcEZuKSB7XG4gICAgY29uc3QgbWFwID0gbWFwRm4oKTtcbiAgICBpZiAoIShtYXAgaW5zdGFuY2VvZiBvbE1hcCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbWFwIHR5cGUnKTtcbiAgICB9XG4gICAgdGhpcy5tYXBfID0gbWFwO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0R3JpZFNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLm1hcChzb3VyY2VMYWJlbCA9PiB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXSk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRGF0YV8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgodGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZyB8fCB0aGlzLm5nZW9RdWVyeVJlc3VsdC50b3RhbCA9PT0gMCkgJiYgIXRoaXMuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXygpKSB7XG4gICAgY29uc3Qgb2xkQWN0aXZlID0gdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIGlmIChvbGRBY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICAgIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgICAgICBzdGF0ZTogdGhpcy5hY3RpdmUsXG4gICAgICAgIG5vRXJyb3I6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc3VtT2ZBdmFpbGFibGVSZXN1bHRzID0gMDtcbiAgdGhpcy5zdW1PZkZlYXR1cmVzID0gMDtcbiAgY29uc3QgY291bnRlZFNvdXJjZXMgPSBbXTtcbiAgdGhpcy5uZ2VvUXVlcnlSZXN1bHQuc291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG4gICAgaWYgKCFjb3VudGVkU291cmNlcy5pbmNsdWRlcyhzb3VyY2UubGFiZWwpKSB7XG4gICAgICB0aGlzLnN1bU9mRmVhdHVyZXMgKz0gc291cmNlLmZlYXR1cmVzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UucmVxdWVzdFBhcnRuZXJzIHx8ICFzb3VyY2UucmVxdWVzdFBhcnRuZXJzLnNvbWUobGFiZWwgPT4gY291bnRlZFNvdXJjZXMuaW5jbHVkZXMobGFiZWwpKSkge1xuICAgICAgdGhpcy5zdW1PZkF2YWlsYWJsZVJlc3VsdHMgKz0gc291cmNlLnRvdGFsRmVhdHVyZUNvdW50O1xuICAgIH1cbiAgICBjb3VudGVkU291cmNlcy5wdXNoKHNvdXJjZS5sYWJlbCk7XG4gIH0pO1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgIHN0YXRlOiB0cnVlXG4gIH0pO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgbGV0IHNvdXJjZXMgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzO1xuICBpZiAoT2JqZWN0LmtleXModGhpcy5vcHRpb25zLm1lcmdlVGFicyB8fCB7fSkubGVuZ3RoID4gMCkge1xuICAgIHNvdXJjZXMgPSB0aGlzLmdldE1lcmdlZFNvdXJjZXNfKHNvdXJjZXMpO1xuICB9XG4gIHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgIGlmIChzb3VyY2UudG9vTWFueVJlc3VsdHMgJiYgc291cmNlLmZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5tYWtlR3JpZF8obnVsbCwgc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291cmNlLmlkID0gdGhpcy5lc2NhcGVWYWx1ZShzb3VyY2UuaWQpO1xuICAgICAgY29uc3QgZmVhdHVyZXMgPSBzb3VyY2UuZmVhdHVyZXM7XG4gICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNvbGxlY3REYXRhXyhzb3VyY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmICh0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgcGFuZWxzLm9wZW5Gb290ZXJQYW5lbCgncXVlcnlyZXN1bHQnLCB7XG4gICAgICBzdGF0ZTogZmFsc2UsXG4gICAgICBub0Vycm9yOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsIHx8ICEoYCR7dGhpcy5zZWxlY3RlZFRhYn1gIGluIHRoaXMuZ3JpZFNvdXJjZXMpKSB7XG4gICAgdGhpcy4kdGltZW91dF8oKCkgPT4ge1xuICAgICAgY29uc3QgZmlyc3RTb3VyY2VJZCA9IHRoaXMubG9hZGVkR3JpZFNvdXJjZXNbMF07XG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLmdyaWRTb3VyY2VzW2ZpcnN0U291cmNlSWRdKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmhhc09uZVdpdGhUb29NYW55UmVzdWx0c18gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm5nZW9RdWVyeVJlc3VsdC5zb3VyY2VzLnNvbWUoc291cmNlID0+IHNvdXJjZS50b29NYW55UmVzdWx0cyk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZXNjYXBlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0b0VzY2FwZSA9IC9bLVtcXF0ve30oKSorPy5cXFxcXiQgfF0vZztcbiAgICBpZiAodmFsdWUubWF0Y2godG9Fc2NhcGUpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSh0b0VzY2FwZSwgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmlzU2VsZWN0ZWQgPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICByZXR1cm4gdGhpcy5zZWxlY3RlZFRhYiA9PT0gZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWw7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0TWVyZ2VkU291cmNlc18gPSBmdW5jdGlvbiAoc291cmNlcykge1xuICBjb25zdCBhbGxTb3VyY2VzID0gW107XG4gIGNvbnN0IG1lcmdlZFNvdXJjZXMgPSB7fTtcbiAgc291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG4gICAgY29uc3QgbWVyZ2VkU291cmNlID0gdGhpcy5nZXRNZXJnZWRTb3VyY2VfKHNvdXJjZSwgbWVyZ2VkU291cmNlcyk7XG4gICAgaWYgKG1lcmdlZFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgYWxsU291cmNlcy5wdXNoKHNvdXJjZSk7XG4gICAgfVxuICB9KTtcbiAgZm9yIChjb25zdCBtZXJnZWRTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgYWxsU291cmNlcy5wdXNoKG1lcmdlZFNvdXJjZXNbbWVyZ2VkU291cmNlSWRdKTtcbiAgfVxuICByZXR1cm4gYWxsU291cmNlcztcbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRNZXJnZWRTb3VyY2VfID0gZnVuY3Rpb24gKHNvdXJjZSwgbWVyZ2VkU291cmNlcykge1xuICBsZXQgbWVyZ2VTb3VyY2VJZCA9IG51bGw7XG4gIGZvciAoY29uc3QgY3VycmVudE1lcmdlU291cmNlSWQgaW4gdGhpcy5vcHRpb25zLm1lcmdlVGFicyB8fCB7fSkge1xuICAgIGNvbnN0IHNvdXJjZUxhYmVscyA9IHRoaXMub3B0aW9ucy5tZXJnZVRhYnNbY3VycmVudE1lcmdlU291cmNlSWRdO1xuICAgIGNvbnN0IGNvbnRhaW5zU291cmNlID0gc291cmNlTGFiZWxzLnNvbWUoc291cmNlTGFiZWwgPT4gc291cmNlTGFiZWwgPT0gc291cmNlLmxhYmVsKTtcbiAgICBpZiAoY29udGFpbnNTb3VyY2UpIHtcbiAgICAgIG1lcmdlU291cmNlSWQgPSBjdXJyZW50TWVyZ2VTb3VyY2VJZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAobWVyZ2VTb3VyY2VJZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGxldCBuZXdSZXF1ZXN0ID0gdHJ1ZTtcbiAgbGV0IG1lcmdlU291cmNlO1xuICBpZiAobWVyZ2VTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgbWVyZ2VTb3VyY2UgPSBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdO1xuICAgIGlmIChzb3VyY2UucmVxdWVzdFBhcnRuZXJzKSB7XG4gICAgICBuZXdSZXF1ZXN0ID0gIXNvdXJjZS5yZXF1ZXN0UGFydG5lcnMuc29tZShsYWJlbCA9PiBtZXJnZVNvdXJjZS5tZXJnZUNvbXBvc2FudHMuaW5jbHVkZXMobGFiZWwpKTtcbiAgICB9XG4gICAgbWVyZ2VTb3VyY2UubWVyZ2VDb21wb3NhbnRzLnB1c2goc291cmNlLmxhYmVsKTtcbiAgfSBlbHNlIHtcbiAgICBtZXJnZVNvdXJjZSA9IHtcbiAgICAgIGZlYXR1cmVzOiBbXSxcbiAgICAgIGlkOiBtZXJnZVNvdXJjZUlkLFxuICAgICAgbGFiZWw6IG1lcmdlU291cmNlSWQsXG4gICAgICBsaW1pdDogMCxcbiAgICAgIHBlbmRpbmc6IGZhbHNlLFxuICAgICAgdG9vTWFueVJlc3VsdHM6IGZhbHNlLFxuICAgICAgbWVyZ2VDb21wb3NhbnRzOiBbc291cmNlLmxhYmVsXVxuICAgIH07XG4gICAgbWVyZ2VkU291cmNlc1ttZXJnZVNvdXJjZUlkXSA9IG1lcmdlU291cmNlO1xuICB9XG4gIHNvdXJjZS5mZWF0dXJlcy5mb3JFYWNoKGZlYXR1cmUgPT4ge1xuICAgIG1lcmdlU291cmNlLmZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gIH0pO1xuICBtZXJnZVNvdXJjZS50b29NYW55UmVzdWx0cyA9IG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzIHx8IHNvdXJjZS50b29NYW55UmVzdWx0cztcbiAgaWYgKG5ld1JlcXVlc3QpIHtcbiAgICBpZiAoc291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ID0gbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgIT09IHVuZGVmaW5lZCA/IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICsgc291cmNlLnRvdGFsRmVhdHVyZUNvdW50IDogc291cmNlLnRvdGFsRmVhdHVyZUNvdW50O1xuICAgIH1cbiAgICBtZXJnZVNvdXJjZS5saW1pdCArPSBzb3VyY2UubGltaXQ7XG4gIH1cbiAgcmV0dXJuIG1lcmdlU291cmNlO1xufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNvbGxlY3REYXRhXyA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgY29uc3QgZmVhdHVyZXMgPSBzb3VyY2UuZmVhdHVyZXM7XG4gIGNvbnN0IGFsbFByb3BlcnRpZXMgPSBbXTtcbiAgY29uc3QgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyA9IFtdO1xuICBjb25zdCBmZWF0dXJlc0ZvclNvdXJjZSA9IHt9O1xuICBsZXQgcHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJ5TmFtZTtcbiAgZmVhdHVyZXMuZm9yRWFjaChmZWF0dXJlID0+IHtcbiAgICBwcm9wZXJ0aWVzID0gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XG4gICAgaWYgKHByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZmVhdHVyZUdlb21ldHJ5TmFtZSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnlOYW1lKCk7XG4gICAgICBpZiAoIWZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuaW5jbHVkZXMoZmVhdHVyZUdlb21ldHJ5TmFtZSkpIHtcbiAgICAgICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5wdXNoKGZlYXR1cmVHZW9tZXRyeU5hbWUpO1xuICAgICAgfVxuICAgICAgYWxsUHJvcGVydGllcy5wdXNoKHByb3BlcnRpZXMpO1xuICAgICAgZmVhdHVyZXNGb3JTb3VyY2VbZ2V0Um93VWlkKHByb3BlcnRpZXMpXSA9IGZlYXR1cmU7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5jbGVhblByb3BlcnRpZXNfKGFsbFByb3BlcnRpZXMsIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMpO1xuICBpZiAoYWxsUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZ3JpZENyZWF0ZWQgPSB0aGlzLm1ha2VHcmlkXyhhbGxQcm9wZXJ0aWVzLCBzb3VyY2UpO1xuICAgIGlmIChncmlkQ3JlYXRlZCkge1xuICAgICAgdGhpcy5mZWF0dXJlc0ZvclNvdXJjZXNfW2Ake3NvdXJjZS5sYWJlbH1gXSA9IGZlYXR1cmVzRm9yU291cmNlO1xuICAgIH1cbiAgfVxufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFuUHJvcGVydGllc18gPSBmdW5jdGlvbiAoYWxsUHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJpZXNOYW1lcykge1xuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydGllcyA9PiB7XG4gICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5mb3JFYWNoKGZlYXR1cmVHZW9tZXRyeU5hbWUgPT4ge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbZmVhdHVyZUdlb21ldHJ5TmFtZV07XG4gICAgfSk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMuYm91bmRlZEJ5O1xuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLm5nZW9fZmVhdHVyZV90eXBlXztcbiAgfSk7XG4gIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlRW1wdHlDb2x1bW5zID09PSB0cnVlKSB7XG4gICAgdGhpcy5yZW1vdmVFbXB0eUNvbHVtbnNGbl8oYWxsUHJvcGVydGllcyk7XG4gIH1cbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVFbXB0eUNvbHVtbnNGbl8gPSBmdW5jdGlvbiAoYWxsUHJvcGVydGllcykge1xuICBjb25zdCBrZXlzVG9LZWVwID0gW107XG4gIGxldCBpLCBrZXk7XG4gIGZvciAoa2V5IGluIGFsbFByb3BlcnRpZXNbMF0pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFsbFByb3BlcnRpZXNbaV1ba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXNUb0tlZXAucHVzaChrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGV0IGtleVRvUmVtb3ZlO1xuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydGllcyA9PiB7XG4gICAga2V5VG9SZW1vdmUgPSBbXTtcbiAgICBmb3IgKGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAoIWtleXNUb0tlZXAuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBrZXlUb1JlbW92ZS5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIGtleVRvUmVtb3ZlLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2tleV07XG4gICAgfSk7XG4gIH0pO1xufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLm1ha2VHcmlkXyA9IGZ1bmN0aW9uIChkYXRhLCBzb3VyY2UpIHtcbiAgY29uc3Qgc291cmNlTGFiZWwgPSBgJHtzb3VyY2UubGFiZWx9YDtcbiAgbGV0IGdyaWRDb25maWcgPSBudWxsO1xuICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgIGdyaWRDb25maWcgPSB0aGlzLmdldEdyaWRDb25maWd1cmF0aW9uXyhkYXRhKTtcbiAgICBpZiAoZ3JpZENvbmZpZyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoIXRoaXMubG9hZGVkR3JpZFNvdXJjZXMuaW5jbHVkZXMoc291cmNlTGFiZWwpKSB7XG4gICAgdGhpcy5sb2FkZWRHcmlkU291cmNlcy5wdXNoKHNvdXJjZUxhYmVsKTtcbiAgfVxuICB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXSA9IHtcbiAgICBzb3VyY2U6IHNvdXJjZVxuICB9O1xuICBpZiAoZ3JpZENvbmZpZykge1xuICAgIHRoaXMuZ3JpZFNvdXJjZXNbc291cmNlTGFiZWxdLmNvbmZpZ3VyYXRpb24gPSBncmlkQ29uZmlnO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEdyaWRDb25maWd1cmF0aW9uXyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZGF0YScpO1xuICB9XG4gIGNvbnN0IGNsb25lID0ge307XG4gIE9iamVjdC5hc3NpZ24oY2xvbmUsIGRhdGFbMF0pO1xuICBkZWxldGUgY2xvbmUub2xfdWlkO1xuICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMoY2xvbmUpO1xuICBjb25zdCBjb2x1bW5EZWZzID0gW107XG4gIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgIGNvbHVtbkRlZnMucHVzaCh7XG4gICAgICBuYW1lOiBjb2x1bW5cbiAgICB9KTtcbiAgfSk7XG4gIGlmIChjb2x1bW5EZWZzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbmV3IG5nZW9HcmlkQ29uZmlnKGRhdGEsIGNvbHVtbkRlZnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0QWN0aXZlR3JpZFNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkU291cmNlc1tgJHt0aGlzLnNlbGVjdGVkVGFifWBdO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHBhbmVscy5vcGVuRm9vdGVyUGFuZWwoJ3F1ZXJ5cmVzdWx0Jywge1xuICAgIHN0YXRlOiBmYWxzZSxcbiAgICBub0Vycm9yOiB0cnVlXG4gIH0pO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICB0aGlzLnRvb01hbnlSZXN1bHRzID0gZmFsc2U7XG4gIHRoaXMuZmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLmNsZWFyKCk7XG4gIHRoaXMubmdlb01hcFF1ZXJlbnRfLmNsZWFyKCk7XG4gIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzXyA9IHt9O1xuICBpZiAodGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8pIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXygpO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuc2VsZWN0VGFiID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgY29uc3Qgc291cmNlID0gZ3JpZFNvdXJjZS5zb3VyY2U7XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBzb3VyY2UubGFiZWw7XG4gIGlmICh0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXykge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKCk7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8gPSBudWxsO1xuICB9XG4gIGlmIChncmlkU291cmNlLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfID0gdGhpcy4kc2NvcGVfLiR3YXRjaENvbGxlY3Rpb24oKCkgPT4gZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdGVkUm93cywgKG5ld1NlbGVjdGVkLCBvbGRTZWxlY3RlZFJvd3MpID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdTZWxlY3RlZCkgIT09IE9iamVjdC5rZXlzKG9sZFNlbGVjdGVkUm93cykpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWRfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG4gIHRoaXMucmVmbG93R3JpZF8oKTtcbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5yZWZsb3dHcmlkXyA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaWQgPSB0aGlzLmVzY2FwZVZhbHVlKHRoaXMuc2VsZWN0ZWRUYWIgfHwgJycpO1xuICBjb25zdCBhY3RpdmVQYW5lID0gdGhpcy4kZWxlbWVudF8uZmluZChgZGl2LnRhYi1wYW5lIyR7aWR9YCk7XG4gIGFjdGl2ZVBhbmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgdGhpcy4kdGltZW91dF8oKCkgPT4ge1xuICAgIGFjdGl2ZVBhbmUuZmluZCgnZGl2Lm5nZW8tZ3JpZC10YWJsZS1jb250YWluZXIgdGFibGUnKS50cmlnZ2VyKCdyZWZsb3cnKTtcbiAgfSk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUub25TZWxlY3Rpb25DaGFuZ2VkXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2VsZWN0ZWRUYWIgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZ3JpZFNvdXJjZSA9IHRoaXMuZ3JpZFNvdXJjZXNbYCR7dGhpcy5zZWxlY3RlZFRhYn1gXTtcbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlRmVhdHVyZXNfID0gZnVuY3Rpb24gKGdyaWRTb3VyY2UpIHtcbiAgdGhpcy5mZWF0dXJlc18uY2xlYXIoKTtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uY2xlYXIoKTtcbiAgaWYgKCFncmlkU291cmNlLmNvbmZpZ3VyYXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc291cmNlTGFiZWwgPSBgJHtncmlkU291cmNlLnNvdXJjZS5sYWJlbH1gO1xuICBjb25zdCBmZWF0dXJlc0ZvclNvdXJjZSA9IHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tzb3VyY2VMYWJlbF07XG4gIGNvbnN0IHNlbGVjdGVkUm93cyA9IGdyaWRTb3VyY2UuY29uZmlndXJhdGlvbi5zZWxlY3RlZFJvd3M7XG4gIGZvciAoY29uc3Qgcm93SWQgaW4gZmVhdHVyZXNGb3JTb3VyY2UpIHtcbiAgICBjb25zdCBmZWF0dXJlID0gZmVhdHVyZXNGb3JTb3VyY2Vbcm93SWRdO1xuICAgIGlmIChyb3dJZCBpbiBzZWxlY3RlZFJvd3MpIHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0RmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNfLnB1c2goZmVhdHVyZSk7XG4gICAgfVxuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNPbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNvdXJjZS5jb25maWd1cmF0aW9uLmdldFNlbGVjdGVkQ291bnQoKSA+IDA7XG4gIH1cbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5nZXRTZWxlY3RlZFJvd0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZENvdW50KCk7XG4gIH1cbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0QWxsKCk7XG4gIH1cbn07XG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51bnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi51bnNlbGVjdEFsbCgpO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaW52ZXJ0U2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLmludmVydFNlbGVjdGlvbigpO1xuICB9XG59O1xuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuem9vbVRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwXykge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGV4dGVudCA9IG9sRXh0ZW50LmNyZWF0ZUVtcHR5KCk7XG4gICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uZm9yRWFjaChmZWF0dXJlID0+IHtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICAgIH1cbiAgICAgIG9sRXh0ZW50LmV4dGVuZChleHRlbnQsIGdlb21ldHJ5LmdldEV4dGVudCgpKTtcbiAgICB9KTtcbiAgICBjb25zdCBzaXplID0gdGhpcy5tYXBfLmdldFNpemUoKTtcbiAgICBpZiAoIXNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzaXplJyk7XG4gICAgfVxuICAgIHRoaXMubWFwXy5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgc2l6ZSxcbiAgICAgIG1heFpvb206IHRoaXMub3B0aW9ucy5tYXhSZWNlbnRlclpvb21cbiAgICB9KTtcbiAgfVxufTtcblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmRvd25sb2FkQ3N2ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGNvbHVtbkRlZnMgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5jb2x1bW5EZWZzO1xuICAgIGlmICghY29sdW1uRGVmcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbHVtbkRlZnMnKTtcbiAgICB9XG4gICAgY29uc3Qgc2VsZWN0ZWRSb3dzID0gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRSb3dzKCk7XG4gICAgdGhpcy5uZ2VvQ3N2RG93bmxvYWRfLnN0YXJ0RG93bmxvYWQoc2VsZWN0ZWRSb3dzLCBjb2x1bW5EZWZzLCB0aGlzLmZpbGVuYW1lXyk7XG4gIH1cbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdHbWZEaXNwbGF5cXVlcnlncmlkQ29udHJvbGxlcicsIFF1ZXJ5R3JpZENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=