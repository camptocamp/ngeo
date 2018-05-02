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
/******/ 		"xsdattributes": 0
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
/******/ 	deferredModules.push([29,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/xsdattributes.css":
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/xsdattributes.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/xsdattributes.css?");

/***/ }),

/***/ "./contribs/gmf/examples/xsdattributes.js":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/xsdattributes.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _xsdattributes_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./xsdattributes.css */ \"./contribs/gmf/examples/xsdattributes.css\");\n/* harmony import */ var _xsdattributes_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_xsdattributes_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/theme/Themes.js */ \"./contribs/gmf/src/theme/Themes.js\");\n/* harmony import */ var gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/editing/XSDAttributes.js */ \"./contribs/gmf/src/editing/XSDAttributes.js\");\n/* harmony import */ var ngeo_editing_attributesComponent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/editing/attributesComponent.js */ \"./src/editing/attributesComponent.js\");\n/* harmony import */ var ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/format/XSDAttribute.js */ \"./src/format/XSDAttribute.js\");\n/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Feature.js */ \"./node_modules/ol/Feature.js\");\n/* harmony import */ var jquery_datetimepicker_jquery_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery-datetimepicker/jquery.datetimepicker.css */ \"./node_modules/jquery-datetimepicker/jquery.datetimepicker.css\");\n/* harmony import */ var jquery_datetimepicker_jquery_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery_datetimepicker_jquery_datetimepicker_css__WEBPACK_IMPORTED_MODULE_8__);\nMainController.$inject = [\"$timeout\", \"gmfThemes\", \"gmfXSDAttributes\"];\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, ngeo_editing_attributesComponent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name]);\nmodule.value('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_THEMES);\nmodule.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_LAYERS);\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController($timeout, gmfThemes, gmfXSDAttributes) {\n  var _this = this;\n\n  this.timeout_ = $timeout;\n  this.xsdAttributes_ = gmfXSDAttributes;\n  this.attributes = null;\n  this.feature = null;\n  this.layers = [];\n  var layerNames = ['line', 'point', 'polygon'];\n  gmfThemes.loadThemes();\n  gmfThemes.getThemesObject().then(function (themes) {\n    if (!themes) {\n      return;\n    }\n\n    var flatNodes = [];\n    themes.forEach(function (theme) {\n      theme.children.forEach(function (group) {\n        _this.getDistinctFlatNodes_(group, flatNodes);\n      });\n    });\n    flatNodes.forEach(function (node) {\n      var groupNode = node;\n\n      if (groupNode.children === undefined && layerNames.includes(node.name)) {\n        _this.layers.push(node);\n      }\n    });\n  });\n}\n\nMainController.prototype.getSetLayers = function (value) {\n  var _this2 = this;\n\n  if (value !== undefined && value !== null) {\n    this.xsdAttributes_.getAttributes(value.id).then(function (attr) {\n      return _this2.setAttributes_(attr);\n    });\n  }\n\n  return this.layers;\n};\n\nMainController.prototype.setAttributes_ = function (attributes) {\n  var _this3 = this;\n\n  this.feature = null;\n  this.attributes = null;\n  this.timeout_(function () {\n    _this3.feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\n    _this3.attributes = attributes;\n  }, 0);\n};\n\nMainController.prototype.getGeomType = function () {\n  var type = 'N/A';\n\n  if (this.attributes) {\n    var geomAttr = Object(ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_6__[\"getGeometryAttribute\"])(this.attributes);\n\n    if (geomAttr && geomAttr.geomType) {\n      type = geomAttr.geomType;\n    }\n  }\n\n  return type;\n};\n\nMainController.prototype.getDistinctFlatNodes_ = function (node, nodes) {\n  var i;\n  var children = node.children;\n\n  if (children !== undefined) {\n    for (i = 0; i < children.length; i++) {\n      this.getDistinctFlatNodes_(children[i], nodes);\n    }\n  }\n\n  var alreadyAdded = false;\n  nodes.some(function (n) {\n    if (n.id === node.id) {\n      alreadyAdded = true;\n      return true;\n    }\n\n    return false;\n  });\n\n  if (!alreadyAdded) {\n    nodes.push(node);\n  }\n};\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/examples/xsdattributes.js?");

/***/ }),

/***/ 29:
/*!***********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/xsdattributes.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/xsdattributes.js */\"./contribs/gmf/examples/xsdattributes.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/xsdattributes.js?");

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