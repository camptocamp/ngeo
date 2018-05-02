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
/******/ 		"editfeatureselector": 0
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
/******/ 	deferredModules.push([8,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/editfeatureselector.css":
/*!*******************************************************!*\
  !*** ./contribs/gmf/examples/editfeatureselector.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/editfeatureselector.css?");

/***/ }),

/***/ "./contribs/gmf/examples/editfeatureselector.js":
/*!******************************************************!*\
  !*** ./contribs/gmf/examples/editfeatureselector.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _editfeatureselector_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editfeatureselector.css */ \"./contribs/gmf/examples/editfeatureselector.css\");\n/* harmony import */ var _editfeatureselector_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editfeatureselector_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gmf-hidden.inc.css */ \"./contribs/gmf/examples/gmf-hidden.inc.css\");\n/* harmony import */ var _gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gmf_hidden_inc_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bootstrap_js_src_tooltip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/src/tooltip.js */ \"./node_modules/bootstrap/js/src/tooltip.js\");\n/* harmony import */ var gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/authentication/module.js */ \"./contribs/gmf/src/authentication/module.js\");\n/* harmony import */ var gmf_editing_editFeatureSelectorComponent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/editing/editFeatureSelectorComponent.js */ \"./contribs/gmf/src/editing/editFeatureSelectorComponent.js\");\n/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/layertree/component.js */ \"./contribs/gmf/src/layertree/component.js\");\n/* harmony import */ var gmf_layertree_TreeManager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/layertree/TreeManager.js */ \"./contribs/gmf/src/layertree/TreeManager.js\");\n/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gmf/map/component.js */ \"./contribs/gmf/src/map/component.js\");\n/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! gmf/theme/Themes.js */ \"./contribs/gmf/src/theme/Themes.js\");\n/* harmony import */ var ngeo_misc_FeatureHelper_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/misc/FeatureHelper.js */ \"./src/misc/FeatureHelper.js\");\n/* harmony import */ var ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/misc/ToolActivate.js */ \"./src/misc/ToolActivate.js\");\n/* harmony import */ var ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/misc/ToolActivateMgr.js */ \"./src/misc/ToolActivateMgr.js\");\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ol_Collection_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/Collection.js */ \"./node_modules/ol/Collection.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/layer/Vector.js */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ol/source/Vector.js */ \"./node_modules/ol/source/Vector.js\");\nMainController.$inject = [\"$scope\", \"gmfThemes\", \"gmfTreeManager\", \"gmfUser\", \"ngeoFeatureHelper\", \"ngeoToolActivateMgr\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_authentication_module_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, gmf_editing_editFeatureSelectorComponent_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name, gmf_layertree_TreeManager_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].name, ngeo_misc_FeatureHelper_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"].name, ngeo_misc_ToolActivateMgr_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"].name]);\nmodule.value('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_THEMES);\nmodule.value('authenticationBaseUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_DEMO);\nmodule.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_LAYERS);\nmodule.constant('defaultTheme', 'Edit');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController($scope, gmfThemes, gmfTreeManager, gmfUser, ngeoFeatureHelper, ngeoToolActivateMgr) {\n  var _this = this;\n\n  this.scope_ = $scope;\n  this.gmfUser = gmfUser;\n  this.featureHelper_ = ngeoFeatureHelper;\n  gmfThemes.loadThemes();\n  this.gmfTreeManager = gmfTreeManager;\n  this.vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]({\n    source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"]({\n      wrapX: false,\n      features: new ol_Collection_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]()\n    }),\n    style: function style(feature, resolution) {\n      return ngeoFeatureHelper.createEditingStyles(feature);\n    }\n  });\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],\n      center: [537635, 152640],\n      zoom: 2\n    })\n  });\n  gmfThemes.getThemesObject().then(function (themes) {\n    if (themes) {\n      for (var i = 0, ii = themes.length; i < ii; i++) {\n        if (themes[i].id === 73) {\n          _this.gmfTreeManager.setFirstLevelGroups(themes[i].children);\n\n          break;\n        }\n      }\n\n      _this.map.addLayer(_this.vectorLayer);\n    }\n  });\n  this.editFeatureSelectorActive = true;\n  var editFeatureSelectorToolActivate = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](this, 'editFeatureSelectorActive');\n  ngeoToolActivateMgr.registerTool('mapTools', editFeatureSelectorToolActivate, true);\n  this.dummyActive = false;\n  var dummyToolActivate = new ngeo_misc_ToolActivate_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"](this, 'dummyActive');\n  ngeoToolActivateMgr.registerTool('mapTools', dummyToolActivate, false);\n  $('[data-toggle=\"tooltip\"]').tooltip({\n    container: 'body',\n    trigger: 'hover'\n  });\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./contribs/gmf/examples/editfeatureselector.js?");

/***/ }),

/***/ 8:
/*!*****************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/editfeatureselector.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/editfeatureselector.js */\"./contribs/gmf/examples/editfeatureselector.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/editfeatureselector.js?");

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