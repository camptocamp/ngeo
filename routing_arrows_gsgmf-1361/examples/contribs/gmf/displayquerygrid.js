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
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayquerygrid.css */ "./contribs/gmf/examples/displayquerygrid.css");
/* harmony import */ var _displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_displayquerygrid_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gmf-hidden.inc.css */ "./contribs/gmf/examples/gmf-hidden.inc.css");
/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/datasource/Manager.js */ "./contribs/gmf/src/datasource/Manager.js");
/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/layertree/component.js */ "./contribs/gmf/src/layertree/component.js");
/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/map/component.js */ "./contribs/gmf/src/map/component.js");
/* harmony import */ var gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/query/gridComponent.js */ "./contribs/gmf/src/query/gridComponent.js");
/* harmony import */ var gmf_theme_Manager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/theme/Manager.js */ "./contribs/gmf/src/theme/Manager.js");
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
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./options.js */ "./contribs/gmf/examples/options.js");
MainController.$inject = ["gmfThemes", "gmfDataSourcesManager", "ngeoFeatureOverlayMgr", "gmfThemeManager", "defaultTheme"];
QueryresultController.$inject = ["ngeoQueryResult"];



















var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_datasource_Manager_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_query_gridComponent_js__WEBPACK_IMPORTED_MODULE_6__["default"].name, gmf_theme_Manager_js__WEBPACK_IMPORTED_MODULE_7__["default"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__["default"].name, ngeo_grid_module_js__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_10__["default"].name, ngeo_misc_btnComponent_js__WEBPACK_IMPORTED_MODULE_11__["default"].name, ngeo_query_component_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);
var queryresultComponent = {
  controller: 'gmfappQueryresultController',
  template: __webpack_require__(/*! ./partials/queryresult.html */ "./contribs/gmf/examples/partials/queryresult.html")
};
module.component('gmfappQueryresult', queryresultComponent);

function QueryresultController(ngeoQueryResult) {
  this.result = ngeoQueryResult;
}

module.controller('gmfappQueryresultController', QueryresultController);

function MainController(gmfThemes, gmfDataSourcesManager, ngeoFeatureOverlayMgr, gmfThemeManager, defaultTheme) {
  var _this = this;

  gmfThemes.loadThemes();
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
  gmfThemes.getThemesObject().then(function (themes) {
    if (themes) {
      _this.themes = themes;
      themes.forEach(function (theme) {
        if (theme.name === defaultTheme) {
          _this.selectedTheme = theme;
          return;
        }
      });
    }
  });
  ngeoFeatureOverlayMgr.init(this.map);
}

module.controller('MainController', MainController);
module.constant('gmfDisplayQueryGridOptions', {
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
Object(_options_js__WEBPACK_IMPORTED_MODULE_18__["default"])(module);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./contribs/gmf/src/options.js":
/*!*************************************!*\
  !*** ./contribs/gmf/src/options.js ***!
  \*************************************/
/*! exports provided: buildStyle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildStyle", function() { return buildStyle; });
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");




function buildStyle(styleDescriptor) {
  if (styleDescriptor instanceof ol_style_Style_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
    return styleDescriptor;
  } else if (!styleDescriptor) {
    return undefined;
  } else {
    var style = {};
    Object.assign(style, styleDescriptor);

    if (styleDescriptor.fill) {
      style.fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_1__["default"](styleDescriptor.fill);
    }

    if (styleDescriptor.stroke) {
      style.stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_2__["default"](styleDescriptor.stroke);
    }

    if (styleDescriptor.circle) {
      var circleStyle = {};
      Object.assign(circleStyle, styleDescriptor.circle);

      if (styleDescriptor.circle.fill) {
        circleStyle.fill = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_1__["default"](styleDescriptor.circle.fill);
      }

      if (styleDescriptor.circle.stroke) {
        circleStyle.stroke = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_2__["default"](styleDescriptor.circle.stroke);
      }

      style.image = new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_0__["default"](circleStyle);
      delete style.circle;
    }

    return new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_3__["default"](style);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (undefined);

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
/* harmony import */ var gmf_options_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gmf/options.js */ "./contribs/gmf/src/options.js");
/* harmony import */ var bootstrap_js_src_dropdown_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bootstrap/js/src/dropdown.js */ "./node_modules/bootstrap/js/src/dropdown.js");
QueryGridController.$inject = ["$scope", "ngeoQueryResult", "ngeoMapQuerent", "ngeoFeatureOverlayMgr", "$timeout", "ngeoCsvDownload", "ngeoQueryOptions", "gmfCsvFilename", "$element", "gmfDisplayQueryGridOptions"];












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
    'getMapFn': '&gmfDisplayquerygridMap'
  },
  templateUrl: gmfDisplayquerygridTemplateUrl
};
module.component('gmfDisplayquerygrid', queryGridComponent);
function QueryGridController($scope, ngeoQueryResult, ngeoMapQuerent, ngeoFeatureOverlayMgr, $timeout, ngeoCsvDownload, ngeoQueryOptions, gmfCsvFilename, $element, gmfDisplayQueryGridOptions) {
  var _this = this;

  this.options = gmfDisplayQueryGridOptions;
  this.$scope_ = $scope;
  this.$timeout_ = $timeout;
  this.ngeoQueryResult = ngeoQueryResult;
  this.ngeoMapQuerent_ = ngeoMapQuerent;
  this.ngeoCsvDownload_ = ngeoCsvDownload;
  this.$element_ = $element;
  this.maxResults = ngeoQueryOptions.limit !== undefined ? ngeoQueryOptions.limit : 50;
  this.active = false;
  this.pending = false;
  this.gridSources = {};
  this.loadedGridSources = [];
  this.selectedTab = null;
  this.featuresForSources_ = {};
  this.features_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  this.ngeoFeatureOverlayMgr_ = ngeoFeatureOverlayMgr;
  this.highlightFeatures_ = new ol_Collection_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  this.filename_ = gmfCsvFilename;
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
  this.getMapFn = null;
}

QueryGridController.prototype.$onInit = function () {
  if (!this.getMapFn) {
    throw new Error('Missing getMapFn');
  }

  var featuresOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  featuresOverlay.setFeatures(this.features_);
  featuresOverlay.setStyle(Object(gmf_options_js__WEBPACK_IMPORTED_MODULE_10__["buildStyle"])(this.options.featuresStyle));
  var highlightFeaturesOverlay = this.ngeoFeatureOverlayMgr_.getFeatureOverlay();
  highlightFeaturesOverlay.setFeatures(this.highlightFeatures_);
  var highlightFeatureStyle = Object(gmf_options_js__WEBPACK_IMPORTED_MODULE_10__["buildStyle"])(this.options.selectedFeatureStyle);
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

  if (Object.keys(this.options.mergeTabs || {}).length > 0) {
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

  for (var currentMergeSourceId in this.options.mergeTabs || {}) {
    var sourceLabels = this.options.mergeTabs[currentMergeSourceId];
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

  if (this.options.removeEmptyColumns === true) {
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
      maxZoom: this.options.maxRecenterZoom
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvZGlzcGxheXF1ZXJ5Z3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9xdWVyeS9ncmlkQ29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29udHJpYnMvZ21mL3NyYy9xdWVyeS9ncmlkQ29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJkaXNwbGF5cXVlcnlncmlkXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzQsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcImdtZlRoZW1lc1wiLCBcImdtZkRhdGFTb3VyY2VzTWFuYWdlclwiLCBcIm5nZW9GZWF0dXJlT3ZlcmxheU1nclwiLCBcImdtZlRoZW1lTWFuYWdlclwiLCBcImRlZmF1bHRUaGVtZVwiXTtcblF1ZXJ5cmVzdWx0Q29udHJvbGxlci4kaW5qZWN0ID0gW1wibmdlb1F1ZXJ5UmVzdWx0XCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJy4vZGlzcGxheXF1ZXJ5Z3JpZC5jc3MnO1xuaW1wb3J0ICcuL2dtZi1oaWRkZW4uaW5jLmNzcyc7XG5pbXBvcnQgZ21mRGF0YXNvdXJjZU1hbmFnZXIgZnJvbSAnZ21mL2RhdGFzb3VyY2UvTWFuYWdlci5qcyc7XG5pbXBvcnQgZ21mTGF5ZXJ0cmVlQ29tcG9uZW50IGZyb20gJ2dtZi9sYXllcnRyZWUvY29tcG9uZW50LmpzJztcbmltcG9ydCBnbWZNYXBDb21wb25lbnQgZnJvbSAnZ21mL21hcC9jb21wb25lbnQuanMnO1xuaW1wb3J0IGdtZlF1ZXJ5R3JpZENvbXBvbmVudCBmcm9tICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudC5qcyc7XG5pbXBvcnQgZ21mVGhlbWVNYW5hZ2VyIGZyb20gJ2dtZi90aGVtZS9NYW5hZ2VyLmpzJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzLmpzJztcbmltcG9ydCBuZ2VvR3JpZE1vZHVsZSBmcm9tICduZ2VvL2dyaWQvbW9kdWxlLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NCdG5Db21wb25lbnQgZnJvbSAnbmdlby9taXNjL2J0bkNvbXBvbmVudC5qcyc7XG5pbXBvcnQgRVBTRzIwNTYgZnJvbSAnQGdlb2Jsb2Nrcy9wcm9qL3NyYy9FUFNHXzIwNTYuanMnO1xuaW1wb3J0IG5nZW9RdWVyeUNvbXBvbmVudCBmcm9tICduZ2VvL3F1ZXJ5L2NvbXBvbmVudC5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbJ2dldHRleHQnLCBnbWZEYXRhc291cmNlTWFuYWdlci5uYW1lLCBnbWZMYXllcnRyZWVDb21wb25lbnQubmFtZSwgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIGdtZlF1ZXJ5R3JpZENvbXBvbmVudC5uYW1lLCBnbWZUaGVtZU1hbmFnZXIubmFtZSwgZ21mVGhlbWVUaGVtZXMubmFtZSwgbmdlb0dyaWRNb2R1bGUubmFtZSwgbmdlb01hcE1vZHVsZS5uYW1lLCBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLCBuZ2VvUXVlcnlDb21wb25lbnQubmFtZV0pO1xudmFyIHF1ZXJ5cmVzdWx0Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnZ21mYXBwUXVlcnlyZXN1bHRDb250cm9sbGVyJyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcGFydGlhbHMvcXVlcnlyZXN1bHQuaHRtbCcpXG59O1xubW9kdWxlLmNvbXBvbmVudCgnZ21mYXBwUXVlcnlyZXN1bHQnLCBxdWVyeXJlc3VsdENvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIFF1ZXJ5cmVzdWx0Q29udHJvbGxlcihuZ2VvUXVlcnlSZXN1bHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBuZ2VvUXVlcnlSZXN1bHQ7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdnbWZhcHBRdWVyeXJlc3VsdENvbnRyb2xsZXInLCBRdWVyeXJlc3VsdENvbnRyb2xsZXIpO1xuXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihnbWZUaGVtZXMsIGdtZkRhdGFTb3VyY2VzTWFuYWdlciwgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLCBnbWZUaGVtZU1hbmFnZXIsIGRlZmF1bHRUaGVtZSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGdtZlRoZW1lcy5sb2FkVGhlbWVzKCk7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIHByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgcmVzb2x1dGlvbnM6IFsyMDAsIDEwMCwgNTAsIDIwLCAxMCwgNSwgMi41LCAyLCAxLCAwLjVdLFxuICAgICAgY2VudGVyOiBbMjUzNzYzNSwgMTE1MjY0MF0sXG4gICAgICB6b29tOiAzXG4gICAgfSlcbiAgfSk7XG4gIHRoaXMuZGltZW5zaW9ucyA9IHt9O1xuICBnbWZEYXRhU291cmNlc01hbmFnZXIuc2V0RGF0YXNvdXJjZU1hcCh0aGlzLm1hcCk7XG4gIGdtZkRhdGFTb3VyY2VzTWFuYWdlci5zZXREaW1lbnNpb25zKHRoaXMuZGltZW5zaW9ucyk7XG4gIHRoaXMucXVlcnlBY3RpdmUgPSB0cnVlO1xuICB0aGlzLnRoZW1lcyA9IHVuZGVmaW5lZDtcbiAgdGhpcy5zZWxlY3RlZFRoZW1lID0gbnVsbDtcblxuICB0aGlzLnVwZGF0ZVRoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGdtZlRoZW1lTWFuYWdlci5hZGRUaGVtZSh0aGlzLnNlbGVjdGVkVGhlbWUpO1xuICB9O1xuXG4gIHRoaXMucXVlcnlHcmlkQWN0aXZlID0gdHJ1ZTtcbiAgZ21mVGhlbWVzLmdldFRoZW1lc09iamVjdCgpLnRoZW4oZnVuY3Rpb24gKHRoZW1lcykge1xuICAgIGlmICh0aGVtZXMpIHtcbiAgICAgIF90aGlzLnRoZW1lcyA9IHRoZW1lcztcbiAgICAgIHRoZW1lcy5mb3JFYWNoKGZ1bmN0aW9uICh0aGVtZSkge1xuICAgICAgICBpZiAodGhlbWUubmFtZSA9PT0gZGVmYXVsdFRoZW1lKSB7XG4gICAgICAgICAgX3RoaXMuc2VsZWN0ZWRUaGVtZSA9IHRoZW1lO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLmluaXQodGhpcy5tYXApO1xufVxuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5tb2R1bGUuY29uc3RhbnQoJ2dtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zJywge1xuICBmZWF0dXJlc1N0eWxlOiB7XG4gICAgZmlsbDoge1xuICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMC42XVxuICAgIH0sXG4gICAgY2lyY2xlOiB7XG4gICAgICBmaWxsOiB7XG4gICAgICAgIGNvbG9yOiBbMjU1LCAxNzAsIDAsIDAuNl1cbiAgICAgIH0sXG4gICAgICByYWRpdXM6IDUsXG4gICAgICBzdHJva2U6IHtcbiAgICAgICAgY29sb3I6IFsyNTUsIDE3MCwgMCwgMV0sXG4gICAgICAgIHdpZHRoOiAyXG4gICAgICB9XG4gICAgfSxcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiBbMjU1LCAxNzAsIDAsIDFdLFxuICAgICAgd2lkdGg6IDJcbiAgICB9XG4gIH1cbn0pO1xub3B0aW9ucyhtb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyIsImltcG9ydCBvbFN0eWxlQ2lyY2xlIGZyb20gJ29sL3N0eWxlL0NpcmNsZS5qcyc7XG5pbXBvcnQgb2xTdHlsZUZpbGwgZnJvbSAnb2wvc3R5bGUvRmlsbC5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGUgZnJvbSAnb2wvc3R5bGUvU3R5bGUuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU3R5bGUoc3R5bGVEZXNjcmlwdG9yKSB7XG4gIGlmIChzdHlsZURlc2NyaXB0b3IgaW5zdGFuY2VvZiBvbFN0eWxlKSB7XG4gICAgcmV0dXJuIHN0eWxlRGVzY3JpcHRvcjtcbiAgfSBlbHNlIGlmICghc3R5bGVEZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc3R5bGUgPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKHN0eWxlLCBzdHlsZURlc2NyaXB0b3IpO1xuXG4gICAgaWYgKHN0eWxlRGVzY3JpcHRvci5maWxsKSB7XG4gICAgICBzdHlsZS5maWxsID0gbmV3IG9sU3R5bGVGaWxsKHN0eWxlRGVzY3JpcHRvci5maWxsKTtcbiAgICB9XG5cbiAgICBpZiAoc3R5bGVEZXNjcmlwdG9yLnN0cm9rZSkge1xuICAgICAgc3R5bGUuc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoc3R5bGVEZXNjcmlwdG9yLnN0cm9rZSk7XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlRGVzY3JpcHRvci5jaXJjbGUpIHtcbiAgICAgIHZhciBjaXJjbGVTdHlsZSA9IHt9O1xuICAgICAgT2JqZWN0LmFzc2lnbihjaXJjbGVTdHlsZSwgc3R5bGVEZXNjcmlwdG9yLmNpcmNsZSk7XG5cbiAgICAgIGlmIChzdHlsZURlc2NyaXB0b3IuY2lyY2xlLmZpbGwpIHtcbiAgICAgICAgY2lyY2xlU3R5bGUuZmlsbCA9IG5ldyBvbFN0eWxlRmlsbChzdHlsZURlc2NyaXB0b3IuY2lyY2xlLmZpbGwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3R5bGVEZXNjcmlwdG9yLmNpcmNsZS5zdHJva2UpIHtcbiAgICAgICAgY2lyY2xlU3R5bGUuc3Ryb2tlID0gbmV3IG9sU3R5bGVTdHJva2Uoc3R5bGVEZXNjcmlwdG9yLmNpcmNsZS5zdHJva2UpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZS5pbWFnZSA9IG5ldyBvbFN0eWxlQ2lyY2xlKGNpcmNsZVN0eWxlKTtcbiAgICAgIGRlbGV0ZSBzdHlsZS5jaXJjbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBvbFN0eWxlKHN0eWxlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgdW5kZWZpbmVkOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxkaXYgY2xhc3M9XCJnbWYtZGlzcGxheXF1ZXJ5Z3JpZCBwYW5lbFwiIG5nLXNob3c9XCJjdHJsLmFjdGl2ZVwiPlxcbiAgPGRpdlxcbiAgICBjbGFzcz1cImNsb3NlXCJcXG4gICAgbmctY2xpY2s9XCJjdHJsLmNsZWFyKClcIj5cXG4gICAgJnRpbWVzO1xcbiAgPC9kaXY+XFxuXFxuICA8dWxcXG4gICAgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCJcXG4gICAgcm9sZT1cInRhYmxpc3RcIj5cXG5cXG4gICAgPGxpXFxuICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiXFxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxcbiAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxcbiAgICAgIG5nLWNsaWNrPVwiY3RybC5zZWxlY3RUYWIoZ3JpZFNvdXJjZSlcIj5cXG5cXG4gICAgICA8YVxcbiAgICAgICAgY2xhc3M9XCJuYXYtbGlua1wiXFxuICAgICAgICBocmVmPVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXFxuICAgICAgICBuZy1jbGFzcz1cIntcXCdhY3RpdmVcXCcgOiBjdHJsLmlzU2VsZWN0ZWQoZ3JpZFNvdXJjZSl9XCJcXG4gICAgICAgIGRhdGEtdGFyZ2V0PVwiI3t7Y3RybC5lc2NhcGVWYWx1ZShncmlkU291cmNlLnNvdXJjZS5sYWJlbCl9fVwiXFxuICAgICAgICBhcmlhLWNvbnRyb2xzPVwie3tjdHJsLmVzY2FwZVZhbHVlKGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsKX19XCJcXG4gICAgICAgIHJvbGU9XCJ0YWJcIlxcbiAgICAgICAgZGF0YS10b2dnbGU9XCJ0YWJcIj5cXG5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVwiZ3JpZFNvdXJjZS5zb3VyY2UudG9vTWFueVJlc3VsdHMgIT09IHRydWVcIj5cXG4gICAgICAgICAge3tncmlkU291cmNlLnNvdXJjZS5sYWJlbCB8IHRyYW5zbGF0ZX19ICh7e2dyaWRTb3VyY2Uuc291cmNlLmZlYXR1cmVzLmxlbmd0aH19KVxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XCJncmlkU291cmNlLnNvdXJjZS50b29NYW55UmVzdWx0cyA9PT0gdHJ1ZVwiPlxcbiAgICAgICAgICB7e2dyaWRTb3VyY2Uuc291cmNlLmxhYmVsIHwgdHJhbnNsYXRlfX0gKHt7Z3JpZFNvdXJjZS5zb3VyY2UudG90YWxGZWF0dXJlQ291bnR9fSopXFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgPC9hPlxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG5cXG4gIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxcbiAgICA8ZGl2XFxuICAgICAgbmctcmVwZWF0PVwiZ3JpZFNvdXJjZSBpbiBjdHJsLmdldEdyaWRTb3VyY2VzKCkgdHJhY2sgYnkgZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWxcIlxcbiAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXFxuICAgICAgY2xhc3M9XCJ0YWItcGFuZVwiXFxuICAgICAgbmctY2xhc3M9XCJ7XFwnYWN0aXZlXFwnIDogY3RybC5pc1NlbGVjdGVkKGdyaWRTb3VyY2UpfVwiXFxuICAgICAgaWQ9XCJ7e2N0cmwuZXNjYXBlVmFsdWUoZ3JpZFNvdXJjZS5zb3VyY2UubGFiZWwpfX1cIj5cXG5cXG4gICAgICA8bmdlby1ncmlkXFxuICAgICAgICBuZ2VvLWdyaWQtY29uZmlndXJhdGlvbj1cImdyaWRTb3VyY2UuY29uZmlndXJhdGlvblwiXFxuICAgICAgICBuZy1pZj1cImdyaWRTb3VyY2Uuc291cmNlLnRvb01hbnlSZXN1bHRzICE9PSB0cnVlXCI+XFxuICAgICAgPC9uZ2VvLWdyaWQ+XFxuXFxuICAgICAgPGRpdiBuZy1pZj1cImdyaWRTb3VyY2Uuc291cmNlLnRvb01hbnlSZXN1bHRzID09PSB0cnVlXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ21mLWRpc3BsYXlxdWVyeWdyaWQtbWVzc2FnZSBhbGVydCBhbGVydC13YXJuaW5nXCI+XFxuICAgICAgICAgIDxwPjxzcGFuIHRyYW5zbGF0ZT5UaGUgcmVzdWx0cyBjYW4gbm90IGJlIGRpc3BsYXllZCBiZWNhdXNlIHRoZSBtYXhpbXVtIG51bWJlciBoYXMgYmVlbiByZWFjaGVkPC9zcGFuPiAoe3tncmlkU291cmNlLnNvdXJjZS5saW1pdH19KS48L3A+XFxuICAgICAgICAgIDxwIHRyYW5zbGF0ZT5QbGVhc2UgcmVmaW5lIHlvdXIgcXVlcnkuPC9wPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXFxuICA8ZGl2IG5nLXNob3c9XCIhY3RybC5wZW5kaW5nICYmIGN0cmwuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpICYmIGN0cmwuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpLmNvbmZpZ3VyYXRpb24gIT09IG51bGxcIj5cXG5cXG4gICAgPHVsIGNsYXNzPVwibmF2IGp1c3RpZnktY29udGVudC1lbmRcIj5cXG5cXG4gICAgICA8bGlcXG4gICAgICAgIGNsYXNzPVwibmctaGlkZVwiXFxuICAgICAgICBuZy1zaG93PVwiY3RybC5pc09uZVNlbGVjdGVkKClcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4gYnRuLXNtIG5nLWJpbmRpbmdcIj5cXG4gICAgICAgICAge3tjdHJsLmdldFNlbGVjdGVkUm93Q291bnQoKX19IDxzcGFuIHRyYW5zbGF0ZT5zZWxlY3RlZCBlbGVtZW50KHMpPC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9saT5cXG5cXG4gICAgICA8bGlcXG4gICAgICAgIG5nLXNob3c9XCJjdHJsLmlzT25lU2VsZWN0ZWQoKVwiXFxuICAgICAgICBjbGFzcz1cIm5nLWhpZGVcIj5cXG4gICAgICAgIDxidXR0b25cXG4gICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCJcXG4gICAgICAgICAgdGl0bGU9XCJ7e1xcJ1pvb20gdG8gc2VsZWN0aW9uXFwnIHwgdHJhbnNsYXRlfX1cIlxcbiAgICAgICAgICBuZy1jbGljaz1cImN0cmwuem9vbVRvU2VsZWN0aW9uKClcIj5cXG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2gtcGx1c1wiPjwvaT4gPHNwYW4gdHJhbnNsYXRlPlpvb20gdG88L3NwYW4+XFxuICAgICAgICA8L2J1dHRvbj5cXG4gICAgICA8L2xpPlxcblxcbiAgICAgIDxsaVxcbiAgICAgICAgbmctc2hvdz1cImN0cmwuaXNPbmVTZWxlY3RlZCgpXCJcXG4gICAgICAgIGNsYXNzPVwibmctaGlkZVwiPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIlxcbiAgICAgICAgICB0aXRsZT1cInt7XFwnRXhwb3J0IHNlbGVjdGlvbiBhcyBDU1ZcXCcgfCB0cmFuc2xhdGV9fVwiXFxuICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC5kb3dubG9hZENzdigpXCI+XFxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZG93bmxvYWRcIj48L2k+IDxzcGFuIHRyYW5zbGF0ZT5FeHBvcnQgYXMgQ1NWPC9zcGFuPlxcbiAgICAgICAgPC9idXR0b24+XFxuICAgICAgPC9saT5cXG5cXG4gICAgICA8bGkgY2xhc3M9XCJkcm9wZG93blwiPlxcbiAgICAgICAgPGJ1dHRvblxcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICAgICAgY2xhc3M9XCJkcm9wdXAgYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbSBkcm9wZG93bi10b2dnbGVcIlxcbiAgICAgICAgICBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcXG4gICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxcbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cXG4gICAgICAgICAgPHNwYW4gdHJhbnNsYXRlPlNlbGVjdDwvc3Bhbj5cXG4gICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgPHVsXFxuICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXFxuICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICAgICAgICA8bGk+XFxuICAgICAgICAgICAgPGFcXG4gICAgICAgICAgICAgIGhyZWY9XCJcIlxcbiAgICAgICAgICAgICAgbmctY2xpY2s9XCJjdHJsLnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPkFsbDwvYT5cXG4gICAgICAgICAgPC9saT5cXG4gICAgICAgICAgPGxpPlxcbiAgICAgICAgICAgIDxhXFxuICAgICAgICAgICAgICBocmVmPVwiXCJcXG4gICAgICAgICAgICAgIG5nLWNsaWNrPVwiY3RybC51bnNlbGVjdEFsbCgpXCIgdHJhbnNsYXRlPk5vbmU8L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICA8YVxcbiAgICAgICAgICAgICAgaHJlZj1cIlwiXFxuICAgICAgICAgICAgICBuZy1jbGljaz1cImN0cmwuaW52ZXJ0U2VsZWN0aW9uKClcIiB0cmFuc2xhdGU+UmV2ZXJzZSBzZWxlY3Rpb248L2E+XFxuICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICA8L2Rpdj5cXG5cXG4gIDxkaXYgbmctc2hvdz1cImN0cmwucGVuZGluZ1wiIGNsYXNzPVwic3Bpbm5lci1ncmlkXCI+XFxuICAgIDxpIGNsYXNzPVwiZmEgZmEtc3BpblwiPlxcbiAgICAgICcgK1xuKChfX3QgPSAocmVxdWlyZSgnZ21mL2ljb25zL3NwaW5uZXIuc3ZnP3ZpZXdib3gmaGVpZ2h0PTNyZW0nKSkpID09IG51bGwgPyAnJyA6IF9fdCkgK1xuJ1xcbiAgICA8L2k+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiUXVlcnlHcmlkQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibmdlb1F1ZXJ5UmVzdWx0XCIsIFwibmdlb01hcFF1ZXJlbnRcIiwgXCJuZ2VvRmVhdHVyZU92ZXJsYXlNZ3JcIiwgXCIkdGltZW91dFwiLCBcIm5nZW9Dc3ZEb3dubG9hZFwiLCBcIm5nZW9RdWVyeU9wdGlvbnNcIiwgXCJnbWZDc3ZGaWxlbmFtZVwiLCBcIiRlbGVtZW50XCIsIFwiZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvRG93bmxvYWRDc3YgZnJvbSAnbmdlby9kb3dubG9hZC9Dc3YuanMnO1xuaW1wb3J0IG5nZW9Eb3dubG9hZFNlcnZpY2UgZnJvbSAnbmdlby9kb3dubG9hZC9zZXJ2aWNlLmpzJztcbmltcG9ydCBuZ2VvR3JpZENvbXBvbmVudCBmcm9tICduZ2VvL2dyaWQvY29tcG9uZW50LmpzJztcbmltcG9ydCBuZ2VvR3JpZENvbmZpZywgeyBnZXRSb3dVaWQgfSBmcm9tICduZ2VvL2dyaWQvQ29uZmlnLmpzJztcbmltcG9ydCBuZ2VvTWFwRmVhdHVyZU92ZXJsYXlNZ3IgZnJvbSAnbmdlby9tYXAvRmVhdHVyZU92ZXJsYXlNZ3IuanMnO1xuaW1wb3J0IG5nZW9RdWVyeU1hcFF1ZXJlbnQgZnJvbSAnbmdlby9xdWVyeS9NYXBRdWVyZW50LmpzJztcbmltcG9ydCBvbENvbGxlY3Rpb24gZnJvbSAnb2wvQ29sbGVjdGlvbi5qcyc7XG5pbXBvcnQgKiBhcyBvbEV4dGVudCBmcm9tICdvbC9leHRlbnQuanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgeyBidWlsZFN0eWxlIH0gZnJvbSAnZ21mL29wdGlvbnMuanMnO1xuaW1wb3J0ICdib290c3RyYXAvanMvc3JjL2Ryb3Bkb3duLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mUXVlcnlHcmlkQ29tcG9uZW50JywgW25nZW9Eb3dubG9hZENzdi5uYW1lLCBuZ2VvRG93bmxvYWRTZXJ2aWNlLm5hbWUsIG5nZW9HcmlkQ29tcG9uZW50Lm5hbWUsIG5nZW9NYXBGZWF0dXJlT3ZlcmxheU1nci5uYW1lLCBuZ2VvUXVlcnlNYXBRdWVyZW50Lm5hbWVdKTtcbm1vZHVsZS52YWx1ZSgnZ21mRGlzcGxheXF1ZXJ5Z3JpZFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKCRlbGVtZW50LCAkYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gJGF0dHJzLmdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZXVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvcXVlcnkvZ3JpZENvbXBvbmVudCc7XG59KTtcbm1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL3F1ZXJ5L2dyaWRDb21wb25lbnQnLCByZXF1aXJlKCcuL2dyaWRDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbmdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGVsZW1lbnRcIiwgXCIkYXR0cnNcIiwgXCJnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzLCBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIGdtZkRpc3BsYXlxdWVyeWdyaWRUZW1wbGF0ZVVybCgkZWxlbWVudCwgJGF0dHJzKTtcbn1cblxudmFyIHF1ZXJ5R3JpZENvbXBvbmVudCA9IHtcbiAgY29udHJvbGxlcjogJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdhY3RpdmUnOiAnPT9nbWZEaXNwbGF5cXVlcnlncmlkQWN0aXZlJyxcbiAgICAnZ2V0TWFwRm4nOiAnJmdtZkRpc3BsYXlxdWVyeWdyaWRNYXAnXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBnbWZEaXNwbGF5cXVlcnlncmlkVGVtcGxhdGVVcmxcbn07XG5tb2R1bGUuY29tcG9uZW50KCdnbWZEaXNwbGF5cXVlcnlncmlkJywgcXVlcnlHcmlkQ29tcG9uZW50KTtcbmV4cG9ydCBmdW5jdGlvbiBRdWVyeUdyaWRDb250cm9sbGVyKCRzY29wZSwgbmdlb1F1ZXJ5UmVzdWx0LCBuZ2VvTWFwUXVlcmVudCwgbmdlb0ZlYXR1cmVPdmVybGF5TWdyLCAkdGltZW91dCwgbmdlb0NzdkRvd25sb2FkLCBuZ2VvUXVlcnlPcHRpb25zLCBnbWZDc3ZGaWxlbmFtZSwgJGVsZW1lbnQsIGdtZkRpc3BsYXlRdWVyeUdyaWRPcHRpb25zKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5vcHRpb25zID0gZ21mRGlzcGxheVF1ZXJ5R3JpZE9wdGlvbnM7XG4gIHRoaXMuJHNjb3BlXyA9ICRzY29wZTtcbiAgdGhpcy4kdGltZW91dF8gPSAkdGltZW91dDtcbiAgdGhpcy5uZ2VvUXVlcnlSZXN1bHQgPSBuZ2VvUXVlcnlSZXN1bHQ7XG4gIHRoaXMubmdlb01hcFF1ZXJlbnRfID0gbmdlb01hcFF1ZXJlbnQ7XG4gIHRoaXMubmdlb0NzdkRvd25sb2FkXyA9IG5nZW9Dc3ZEb3dubG9hZDtcbiAgdGhpcy4kZWxlbWVudF8gPSAkZWxlbWVudDtcbiAgdGhpcy5tYXhSZXN1bHRzID0gbmdlb1F1ZXJ5T3B0aW9ucy5saW1pdCAhPT0gdW5kZWZpbmVkID8gbmdlb1F1ZXJ5T3B0aW9ucy5saW1pdCA6IDUwO1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5ncmlkU291cmNlcyA9IHt9O1xuICB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICB0aGlzLmZlYXR1cmVzRm9yU291cmNlc18gPSB7fTtcbiAgdGhpcy5mZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gIHRoaXMubmdlb0ZlYXR1cmVPdmVybGF5TWdyXyA9IG5nZW9GZWF0dXJlT3ZlcmxheU1ncjtcbiAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18gPSBuZXcgb2xDb2xsZWN0aW9uKCk7XG4gIHRoaXMuZmlsZW5hbWVfID0gZ21mQ3N2RmlsZW5hbWU7XG4gIHRoaXMubWFwXyA9IG51bGw7XG4gIHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmdlb1F1ZXJ5UmVzdWx0O1xuICB9LCBmdW5jdGlvbiAobmV3UXVlcnlSZXN1bHQsIG9sZFF1ZXJ5UmVzdWx0KSB7XG4gICAgaWYgKG5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nKSB7XG4gICAgICBfdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgX3RoaXMucGVuZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG5ld1F1ZXJ5UmVzdWx0ICE9PSBvbGRRdWVyeVJlc3VsdCkge1xuICAgICAgX3RoaXMudXBkYXRlRGF0YV8oKTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IG51bGw7XG4gIHRoaXMuZ2V0TWFwRm4gPSBudWxsO1xufVxuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuZ2V0TWFwRm4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0TWFwRm4nKTtcbiAgfVxuXG4gIHZhciBmZWF0dXJlc092ZXJsYXkgPSB0aGlzLm5nZW9GZWF0dXJlT3ZlcmxheU1ncl8uZ2V0RmVhdHVyZU92ZXJsYXkoKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldEZlYXR1cmVzKHRoaXMuZmVhdHVyZXNfKTtcbiAgZmVhdHVyZXNPdmVybGF5LnNldFN0eWxlKGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLmZlYXR1cmVzU3R5bGUpKTtcbiAgdmFyIGhpZ2hsaWdodEZlYXR1cmVzT3ZlcmxheSA9IHRoaXMubmdlb0ZlYXR1cmVPdmVybGF5TWdyXy5nZXRGZWF0dXJlT3ZlcmxheSgpO1xuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0RmVhdHVyZXModGhpcy5oaWdobGlnaHRGZWF0dXJlc18pO1xuICB2YXIgaGlnaGxpZ2h0RmVhdHVyZVN0eWxlID0gYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2VsZWN0ZWRGZWF0dXJlU3R5bGUpO1xuICBoaWdobGlnaHRGZWF0dXJlc092ZXJsYXkuc2V0U3R5bGUoaGlnaGxpZ2h0RmVhdHVyZVN0eWxlKTtcbiAgdmFyIG1hcEZuID0gdGhpcy5nZXRNYXBGbjtcblxuICBpZiAobWFwRm4pIHtcbiAgICB2YXIgbWFwID0gbWFwRm4oKTtcblxuICAgIGlmICghKG1hcCBpbnN0YW5jZW9mIG9sTWFwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBtYXAgdHlwZScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwXyA9IG1hcDtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0R3JpZFNvdXJjZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIHJldHVybiB0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlTGFiZWwpIHtcbiAgICByZXR1cm4gX3RoaXMyLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXTtcbiAgfSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVEYXRhXyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgaWYgKCh0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nIHx8IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnRvdGFsID09PSAwKSAmJiAhdGhpcy5oYXNPbmVXaXRoVG9vTWFueVJlc3VsdHNfKCkpIHtcbiAgICB2YXIgb2xkQWN0aXZlID0gdGhpcy5hY3RpdmU7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgaWYgKG9sZEFjdGl2ZSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLm5nZW9RdWVyeVJlc3VsdC5wZW5kaW5nO1xuICAgICAgdGhpcy5wZW5kaW5nID0gdGhpcy5uZ2VvUXVlcnlSZXN1bHQucGVuZGluZztcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICB2YXIgc291cmNlcyA9IHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXM7XG5cbiAgaWYgKE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5tZXJnZVRhYnMgfHwge30pLmxlbmd0aCA+IDApIHtcbiAgICBzb3VyY2VzID0gdGhpcy5nZXRNZXJnZWRTb3VyY2VzXyhzb3VyY2VzKTtcbiAgfVxuXG4gIHNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS50b29NYW55UmVzdWx0cykge1xuICAgICAgX3RoaXMzLm1ha2VHcmlkXyhudWxsLCBzb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3VyY2UuaWQgPSBfdGhpczMuZXNjYXBlVmFsdWUoc291cmNlLmlkKTtcbiAgICAgIHZhciBmZWF0dXJlcyA9IHNvdXJjZS5mZWF0dXJlcztcblxuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX3RoaXMzLmNvbGxlY3REYXRhXyhzb3VyY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHRoaXMubG9hZGVkR3JpZFNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gbnVsbCB8fCAhKFwiXCIgKyB0aGlzLnNlbGVjdGVkVGFiIGluIHRoaXMuZ3JpZFNvdXJjZXMpKSB7XG4gICAgdGhpcy4kdGltZW91dF8oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGZpcnN0U291cmNlSWQgPSBfdGhpczMubG9hZGVkR3JpZFNvdXJjZXNbMF07XG5cbiAgICAgIF90aGlzMy5zZWxlY3RUYWIoX3RoaXMzLmdyaWRTb3VyY2VzW2ZpcnN0U291cmNlSWRdKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaGFzT25lV2l0aFRvb01hbnlSZXN1bHRzXyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubmdlb1F1ZXJ5UmVzdWx0LnNvdXJjZXMuc29tZShmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgcmV0dXJuIHNvdXJjZS50b29NYW55UmVzdWx0cztcbiAgfSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5lc2NhcGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciB0b0VzY2FwZSA9IC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcIHxdL2c7XG5cbiAgICBpZiAodmFsdWUubWF0Y2godG9Fc2NhcGUpICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSh0b0VzY2FwZSwgJ18nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuaXNTZWxlY3RlZCA9IGZ1bmN0aW9uIChncmlkU291cmNlKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdGVkVGFiID09PSBncmlkU291cmNlLnNvdXJjZS5sYWJlbDtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZXNfID0gZnVuY3Rpb24gKHNvdXJjZXMpIHtcbiAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgdmFyIGFsbFNvdXJjZXMgPSBbXTtcbiAgdmFyIG1lcmdlZFNvdXJjZXMgPSB7fTtcbiAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICB2YXIgbWVyZ2VkU291cmNlID0gX3RoaXM0LmdldE1lcmdlZFNvdXJjZV8oc291cmNlLCBtZXJnZWRTb3VyY2VzKTtcblxuICAgIGlmIChtZXJnZWRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIGFsbFNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yICh2YXIgbWVyZ2VkU291cmNlSWQgaW4gbWVyZ2VkU291cmNlcykge1xuICAgIGFsbFNvdXJjZXMucHVzaChtZXJnZWRTb3VyY2VzW21lcmdlZFNvdXJjZUlkXSk7XG4gIH1cblxuICByZXR1cm4gYWxsU291cmNlcztcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lcmdlZFNvdXJjZV8gPSBmdW5jdGlvbiAoc291cmNlLCBtZXJnZWRTb3VyY2VzKSB7XG4gIHZhciBtZXJnZVNvdXJjZUlkID0gbnVsbDtcblxuICBmb3IgKHZhciBjdXJyZW50TWVyZ2VTb3VyY2VJZCBpbiB0aGlzLm9wdGlvbnMubWVyZ2VUYWJzIHx8IHt9KSB7XG4gICAgdmFyIHNvdXJjZUxhYmVscyA9IHRoaXMub3B0aW9ucy5tZXJnZVRhYnNbY3VycmVudE1lcmdlU291cmNlSWRdO1xuICAgIHZhciBjb250YWluc1NvdXJjZSA9IHNvdXJjZUxhYmVscy5zb21lKGZ1bmN0aW9uIChzb3VyY2VMYWJlbCkge1xuICAgICAgcmV0dXJuIHNvdXJjZUxhYmVsID09IHNvdXJjZS5sYWJlbDtcbiAgICB9KTtcblxuICAgIGlmIChjb250YWluc1NvdXJjZSkge1xuICAgICAgbWVyZ2VTb3VyY2VJZCA9IGN1cnJlbnRNZXJnZVNvdXJjZUlkO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1lcmdlU291cmNlSWQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBtZXJnZVNvdXJjZTtcblxuICBpZiAobWVyZ2VTb3VyY2VJZCBpbiBtZXJnZWRTb3VyY2VzKSB7XG4gICAgbWVyZ2VTb3VyY2UgPSBtZXJnZWRTb3VyY2VzW21lcmdlU291cmNlSWRdO1xuICB9IGVsc2Uge1xuICAgIG1lcmdlU291cmNlID0ge1xuICAgICAgZmVhdHVyZXM6IFtdLFxuICAgICAgaWQ6IG1lcmdlU291cmNlSWQsXG4gICAgICBsYWJlbDogbWVyZ2VTb3VyY2VJZCxcbiAgICAgIGxpbWl0OiB0aGlzLm1heFJlc3VsdHMsXG4gICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIHRvb01hbnlSZXN1bHRzOiBmYWxzZVxuICAgIH07XG4gICAgbWVyZ2VkU291cmNlc1ttZXJnZVNvdXJjZUlkXSA9IG1lcmdlU291cmNlO1xuICB9XG5cbiAgc291cmNlLmZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICBtZXJnZVNvdXJjZS5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICB9KTtcbiAgbWVyZ2VTb3VyY2UudG9vTWFueVJlc3VsdHMgPSBtZXJnZVNvdXJjZS50b29NYW55UmVzdWx0cyB8fCBzb3VyY2UudG9vTWFueVJlc3VsdHM7XG5cbiAgaWYgKG1lcmdlU291cmNlLnRvb01hbnlSZXN1bHRzKSB7XG4gICAgbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgPSBtZXJnZVNvdXJjZS50b3RhbEZlYXR1cmVDb3VudCAhPT0gdW5kZWZpbmVkID8gbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgKyBtZXJnZVNvdXJjZS5mZWF0dXJlcy5sZW5ndGggOiBtZXJnZVNvdXJjZS5mZWF0dXJlcy5sZW5ndGg7XG4gICAgbWVyZ2VTb3VyY2UuZmVhdHVyZXMgPSBbXTtcbiAgfVxuXG4gIGlmIChzb3VyY2UudG90YWxGZWF0dXJlQ291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgIG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ID0gbWVyZ2VTb3VyY2UudG90YWxGZWF0dXJlQ291bnQgIT09IHVuZGVmaW5lZCA/IG1lcmdlU291cmNlLnRvdGFsRmVhdHVyZUNvdW50ICsgc291cmNlLnRvdGFsRmVhdHVyZUNvdW50IDogc291cmNlLnRvdGFsRmVhdHVyZUNvdW50O1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlU291cmNlO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY29sbGVjdERhdGFfID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICB2YXIgZmVhdHVyZXMgPSBzb3VyY2UuZmVhdHVyZXM7XG4gIHZhciBhbGxQcm9wZXJ0aWVzID0gW107XG4gIHZhciBmZWF0dXJlR2VvbWV0cmllc05hbWVzID0gW107XG4gIHZhciBmZWF0dXJlc0ZvclNvdXJjZSA9IHt9O1xuICB2YXIgcHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJ5TmFtZTtcbiAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgIHByb3BlcnRpZXMgPSBmZWF0dXJlLmdldFByb3BlcnRpZXMoKTtcblxuICAgIGlmIChwcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZlYXR1cmVHZW9tZXRyeU5hbWUgPSBmZWF0dXJlLmdldEdlb21ldHJ5TmFtZSgpO1xuXG4gICAgICBpZiAoIWZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuaW5jbHVkZXMoZmVhdHVyZUdlb21ldHJ5TmFtZSkpIHtcbiAgICAgICAgZmVhdHVyZUdlb21ldHJpZXNOYW1lcy5wdXNoKGZlYXR1cmVHZW9tZXRyeU5hbWUpO1xuICAgICAgfVxuXG4gICAgICBhbGxQcm9wZXJ0aWVzLnB1c2gocHJvcGVydGllcyk7XG4gICAgICBmZWF0dXJlc0ZvclNvdXJjZVtnZXRSb3dVaWQocHJvcGVydGllcyldID0gZmVhdHVyZTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLmNsZWFuUHJvcGVydGllc18oYWxsUHJvcGVydGllcywgZmVhdHVyZUdlb21ldHJpZXNOYW1lcyk7XG5cbiAgaWYgKGFsbFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBncmlkQ3JlYXRlZCA9IHRoaXMubWFrZUdyaWRfKGFsbFByb3BlcnRpZXMsIHNvdXJjZSk7XG5cbiAgICBpZiAoZ3JpZENyZWF0ZWQpIHtcbiAgICAgIHRoaXMuZmVhdHVyZXNGb3JTb3VyY2VzX1tcIlwiICsgc291cmNlLmxhYmVsXSA9IGZlYXR1cmVzRm9yU291cmNlO1xuICAgIH1cbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuY2xlYW5Qcm9wZXJ0aWVzXyA9IGZ1bmN0aW9uIChhbGxQcm9wZXJ0aWVzLCBmZWF0dXJlR2VvbWV0cmllc05hbWVzKSB7XG4gIGFsbFByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydGllcykge1xuICAgIGZlYXR1cmVHZW9tZXRyaWVzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZUdlb21ldHJ5TmFtZSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbZmVhdHVyZUdlb21ldHJ5TmFtZV07XG4gICAgfSk7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMuYm91bmRlZEJ5O1xuICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLm5nZW9fZmVhdHVyZV90eXBlXztcbiAgfSk7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVFbXB0eUNvbHVtbnMgPT09IHRydWUpIHtcbiAgICB0aGlzLnJlbW92ZUVtcHR5Q29sdW1uc0ZuXyhhbGxQcm9wZXJ0aWVzKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlRW1wdHlDb2x1bW5zRm5fID0gZnVuY3Rpb24gKGFsbFByb3BlcnRpZXMpIHtcbiAgdmFyIGtleXNUb0tlZXAgPSBbXTtcbiAgdmFyIGksIGtleTtcblxuICBmb3IgKGtleSBpbiBhbGxQcm9wZXJ0aWVzWzBdKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGFsbFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhbGxQcm9wZXJ0aWVzW2ldW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXlzVG9LZWVwLnB1c2goa2V5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGtleVRvUmVtb3ZlO1xuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcbiAgICBrZXlUb1JlbW92ZSA9IFtdO1xuXG4gICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgaWYgKCFrZXlzVG9LZWVwLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAga2V5VG9SZW1vdmUucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGtleVRvUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNba2V5XTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5tYWtlR3JpZF8gPSBmdW5jdGlvbiAoZGF0YSwgc291cmNlKSB7XG4gIHZhciBzb3VyY2VMYWJlbCA9IFwiXCIgKyBzb3VyY2UubGFiZWw7XG4gIHZhciBncmlkQ29uZmlnID0gbnVsbDtcblxuICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgIGdyaWRDb25maWcgPSB0aGlzLmdldEdyaWRDb25maWd1cmF0aW9uXyhkYXRhKTtcblxuICAgIGlmIChncmlkQ29uZmlnID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKCF0aGlzLmxvYWRlZEdyaWRTb3VyY2VzLmluY2x1ZGVzKHNvdXJjZUxhYmVsKSkge1xuICAgIHRoaXMubG9hZGVkR3JpZFNvdXJjZXMucHVzaChzb3VyY2VMYWJlbCk7XG4gIH1cblxuICB0aGlzLmdyaWRTb3VyY2VzW3NvdXJjZUxhYmVsXSA9IHtcbiAgICBzb3VyY2U6IHNvdXJjZVxuICB9O1xuXG4gIGlmIChncmlkQ29uZmlnKSB7XG4gICAgdGhpcy5ncmlkU291cmNlc1tzb3VyY2VMYWJlbF0uY29uZmlndXJhdGlvbiA9IGdyaWRDb25maWc7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEdyaWRDb25maWd1cmF0aW9uXyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZGF0YScpO1xuICB9XG5cbiAgdmFyIGNsb25lID0ge307XG4gIE9iamVjdC5hc3NpZ24oY2xvbmUsIGRhdGFbMF0pO1xuICBkZWxldGUgY2xvbmUub2xfdWlkO1xuICB2YXIgY29sdW1ucyA9IE9iamVjdC5rZXlzKGNsb25lKTtcbiAgdmFyIGNvbHVtbkRlZnMgPSBbXTtcbiAgY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICBjb2x1bW5EZWZzLnB1c2goe1xuICAgICAgbmFtZTogY29sdW1uXG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmIChjb2x1bW5EZWZzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbmV3IG5nZW9HcmlkQ29uZmlnKGRhdGEsIGNvbHVtbkRlZnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gIHRoaXMuZ3JpZFNvdXJjZXMgPSB7fTtcbiAgdGhpcy5sb2FkZWRHcmlkU291cmNlcyA9IFtdO1xuICB0aGlzLnNlbGVjdGVkVGFiID0gbnVsbDtcbiAgdGhpcy50b29NYW55UmVzdWx0cyA9IGZhbHNlO1xuICB0aGlzLmZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLm5nZW9NYXBRdWVyZW50Xy5jbGVhcigpO1xuICB0aGlzLmZlYXR1cmVzRm9yU291cmNlc18gPSB7fTtcblxuICBpZiAodGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8pIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXygpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RUYWIgPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICB2YXIgc291cmNlID0gZ3JpZFNvdXJjZS5zb3VyY2U7XG4gIHRoaXMuc2VsZWN0ZWRUYWIgPSBzb3VyY2UubGFiZWw7XG5cbiAgaWYgKHRoaXMudW5yZWdpc3RlclNlbGVjdFdhdGNoZXJfKSB7XG4gICAgdGhpcy51bnJlZ2lzdGVyU2VsZWN0V2F0Y2hlcl8oKTtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IG51bGw7XG4gIH1cblxuICBpZiAoZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnVucmVnaXN0ZXJTZWxlY3RXYXRjaGVyXyA9IHRoaXMuJHNjb3BlXy4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBncmlkU291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRSb3dzO1xuICAgIH0sIGZ1bmN0aW9uIChuZXdTZWxlY3RlZCwgb2xkU2VsZWN0ZWRSb3dzKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMobmV3U2VsZWN0ZWQpICE9PSBPYmplY3Qua2V5cyhvbGRTZWxlY3RlZFJvd3MpKSB7XG4gICAgICAgIF90aGlzNS5vblNlbGVjdGlvbkNoYW5nZWRfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnVwZGF0ZUZlYXR1cmVzXyhncmlkU291cmNlKTtcbiAgdGhpcy5yZWZsb3dHcmlkXygpO1xufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUucmVmbG93R3JpZF8gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpZCA9IHRoaXMuZXNjYXBlVmFsdWUodGhpcy5zZWxlY3RlZFRhYiB8fCAnJyk7XG4gIHZhciBhY3RpdmVQYW5lID0gdGhpcy4kZWxlbWVudF8uZmluZChcImRpdi50YWItcGFuZSNcIiArIGlkKTtcbiAgYWN0aXZlUGFuZS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB0aGlzLiR0aW1lb3V0XyhmdW5jdGlvbiAoKSB7XG4gICAgYWN0aXZlUGFuZS5maW5kKCdkaXYubmdlby1ncmlkLXRhYmxlLWNvbnRhaW5lciB0YWJsZScpLnRyaWdnZXIoJ3JlZmxvdycpO1xuICB9KTtcbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLm9uU2VsZWN0aW9uQ2hhbmdlZF8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGdyaWRTb3VyY2UgPSB0aGlzLmdyaWRTb3VyY2VzW1wiXCIgKyB0aGlzLnNlbGVjdGVkVGFiXTtcbiAgdGhpcy51cGRhdGVGZWF0dXJlc18oZ3JpZFNvdXJjZSk7XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ3JpZFNvdXJjZSkge1xuICB0aGlzLmZlYXR1cmVzXy5jbGVhcigpO1xuICB0aGlzLmhpZ2hsaWdodEZlYXR1cmVzXy5jbGVhcigpO1xuXG4gIGlmICghZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHNvdXJjZUxhYmVsID0gXCJcIiArIGdyaWRTb3VyY2Uuc291cmNlLmxhYmVsO1xuICB2YXIgZmVhdHVyZXNGb3JTb3VyY2UgPSB0aGlzLmZlYXR1cmVzRm9yU291cmNlc19bc291cmNlTGFiZWxdO1xuICB2YXIgc2VsZWN0ZWRSb3dzID0gZ3JpZFNvdXJjZS5jb25maWd1cmF0aW9uLnNlbGVjdGVkUm93cztcblxuICBmb3IgKHZhciByb3dJZCBpbiBmZWF0dXJlc0ZvclNvdXJjZSkge1xuICAgIHZhciBmZWF0dXJlID0gZmVhdHVyZXNGb3JTb3VyY2Vbcm93SWRdO1xuXG4gICAgaWYgKHJvd0lkIGluIHNlbGVjdGVkUm93cykge1xuICAgICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18ucHVzaChmZWF0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mZWF0dXJlc18ucHVzaChmZWF0dXJlKTtcbiAgICB9XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmdldEFjdGl2ZUdyaWRTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZFNvdXJjZXNbXCJcIiArIHRoaXMuc2VsZWN0ZWRUYWJdO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5pc09uZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRDb3VudCgpID4gMDtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRSb3dDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgPT09IG51bGwgfHwgc291cmNlLmNvbmZpZ3VyYXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc291cmNlLmNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWRDb3VudCgpO1xuICB9XG59O1xuXG5RdWVyeUdyaWRDb250cm9sbGVyLnByb3RvdHlwZS5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgc291cmNlLmNvbmZpZ3VyYXRpb24uc2VsZWN0QWxsKCk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLnVuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc291cmNlID0gdGhpcy5nZXRBY3RpdmVHcmlkU291cmNlKCk7XG5cbiAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgIHNvdXJjZS5jb25maWd1cmF0aW9uLnVuc2VsZWN0QWxsKCk7XG4gIH1cbn07XG5cblF1ZXJ5R3JpZENvbnRyb2xsZXIucHJvdG90eXBlLmludmVydFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXMuZ2V0QWN0aXZlR3JpZFNvdXJjZSgpO1xuXG4gIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICBzb3VyY2UuY29uZmlndXJhdGlvbi5pbnZlcnRTZWxlY3Rpb24oKTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuem9vbVRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMubWFwXykge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgdmFyIGV4dGVudCA9IG9sRXh0ZW50LmNyZWF0ZUVtcHR5KCk7XG4gICAgdGhpcy5oaWdobGlnaHRGZWF0dXJlc18uZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgdmFyIGdlb21ldHJ5ID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuXG4gICAgICBpZiAoIWdlb21ldHJ5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZW9tZXRyeScpO1xuICAgICAgfVxuXG4gICAgICBvbEV4dGVudC5leHRlbmQoZXh0ZW50LCBnZW9tZXRyeS5nZXRFeHRlbnQoKSk7XG4gICAgfSk7XG4gICAgdmFyIHNpemUgPSB0aGlzLm1hcF8uZ2V0U2l6ZSgpO1xuXG4gICAgaWYgKCFzaXplKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2l6ZScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwXy5nZXRWaWV3KCkuZml0KGV4dGVudCwge1xuICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgIG1heFpvb206IHRoaXMub3B0aW9ucy5tYXhSZWNlbnRlclpvb21cbiAgICB9KTtcbiAgfVxufTtcblxuUXVlcnlHcmlkQ29udHJvbGxlci5wcm90b3R5cGUuZG93bmxvYWRDc3YgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzLmdldEFjdGl2ZUdyaWRTb3VyY2UoKTtcblxuICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgdmFyIGNvbHVtbkRlZnMgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5jb2x1bW5EZWZzO1xuXG4gICAgaWYgKCFjb2x1bW5EZWZzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY29sdW1uRGVmcycpO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RlZFJvd3MgPSBzb3VyY2UuY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZFJvd3MoKTtcbiAgICB0aGlzLm5nZW9Dc3ZEb3dubG9hZF8uc3RhcnREb3dubG9hZChzZWxlY3RlZFJvd3MsIGNvbHVtbkRlZnMsIHRoaXMuZmlsZW5hbWVfKTtcbiAgfVxufTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0dtZkRpc3BsYXlxdWVyeWdyaWRDb250cm9sbGVyJywgUXVlcnlHcmlkQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9