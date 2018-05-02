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
/******/ 		"layertree": 0
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
/******/ 	deferredModules.push([13,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/layertree.css":
/*!*********************************************!*\
  !*** ./contribs/gmf/examples/layertree.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/layertree.css?");

/***/ }),

/***/ "./contribs/gmf/examples/layertree.js":
/*!********************************************!*\
  !*** ./contribs/gmf/examples/layertree.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _layertree_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layertree.css */ \"./contribs/gmf/examples/layertree.css\");\n/* harmony import */ var _layertree_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_layertree_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var gmf_disclaimer_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/disclaimer/module.js */ \"./contribs/gmf/src/disclaimer/module.js\");\n/* harmony import */ var gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/layertree/component.js */ \"./contribs/gmf/src/layertree/component.js\");\n/* harmony import */ var gmf_layertree_TreeManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/layertree/TreeManager.js */ \"./contribs/gmf/src/layertree/TreeManager.js\");\n/* harmony import */ var gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/map/component.js */ \"./contribs/gmf/src/map/component.js\");\n/* harmony import */ var gmf_theme_Manager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gmf/theme/Manager.js */ \"./contribs/gmf/src/theme/Manager.js\");\n/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gmf/theme/Themes.js */ \"./contribs/gmf/src/theme/Themes.js\");\n/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ \"./node_modules/@geoblocks/proj/src/EPSG_21781.js\");\n/* harmony import */ var ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngeo/statemanager/Location.js */ \"./src/statemanager/Location.js\");\n/* harmony import */ var ngeo_layertree_module_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngeo/layertree/module.js */ \"./src/layertree/module.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\nMainController.$inject = [\"gmfTreeManager\", \"gmfThemes\", \"gmfThemeManager\", \"ngeoLocation\"];\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_layertree_component_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, gmf_layertree_TreeManager_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name, gmf_map_component_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].name, gmf_theme_Manager_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].name, ngeo_statemanager_Location_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"].name, ngeo_layertree_module_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"].name, gmf_disclaimer_module_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name]);\nmodule.value('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_THEMES);\nmodule.constant('defaultTheme', 'Demo');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController(gmfTreeManager, gmfThemes, gmfThemeManager, ngeoLocation) {\n  var _this = this;\n\n  gmfThemes.loadThemes();\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],\n      center: [537635, 152640],\n      zoom: 3\n    })\n  });\n  var modal = ngeoLocation.getParam('modal');\n  this.modal = modal === 'true';\n  this.gmfTreeManager = gmfTreeManager;\n  this.gmfThemeManager = gmfThemeManager;\n  this.themes = [];\n  this.groups = [];\n  this.layers = [];\n\n  this.getSetTheme = function (value) {\n    if (value) {\n      this.gmfThemeManager.addTheme(value);\n    }\n\n    return this.themes;\n  };\n\n  this.getSetGroup = function (value) {\n    if (value !== undefined) {\n      this.gmfTreeManager.setFirstLevelGroups([value]);\n    }\n\n    return this.groups;\n  };\n\n  this.getSetLayers = function (value) {\n    if (value !== undefined) {\n      this.gmfTreeManager.addGroupByLayerName(value.name);\n    }\n\n    return this.layers;\n  };\n\n  this.getSetRemoveTree = function (value) {\n    if (value !== undefined) {\n      this.gmfTreeManager.removeGroup(value);\n    }\n\n    return this.gmfTreeManager.root.children;\n  };\n\n  gmfThemes.getThemesObject().then(function (themes) {\n    if (themes) {\n      _this.themes = themes;\n      var flatNodes = [];\n\n      _this.themes.forEach(function (theme) {\n        theme.children.forEach(function (group) {\n          _this.groups.push(group);\n\n          _this.getDistinctFlatNodes_(group, flatNodes);\n        });\n      });\n\n      flatNodes.forEach(function (node) {\n        var groupNode = node;\n\n        if (groupNode.children === undefined) {\n          _this.layers.push(node);\n        }\n      });\n    }\n  });\n\n  this.getDistinctFlatNodes_ = function (node, nodes) {\n    var i;\n    var children = node.children;\n\n    if (children !== undefined) {\n      for (i = 0; i < children.length; i++) {\n        this.getDistinctFlatNodes_(children[i], nodes);\n      }\n    }\n\n    var alreadyAdded = false;\n    nodes.some(function (n) {\n      if (n.id === node.id) {\n        alreadyAdded = true;\n        return true;\n      }\n\n      return false;\n    });\n\n    if (!alreadyAdded) {\n      nodes.push(node);\n    }\n  };\n}\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/examples/layertree.js?");

/***/ }),

/***/ 13:
/*!*******************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/layertree.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/layertree.js */\"./contribs/gmf/examples/layertree.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/layertree.js?");

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