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
/******/ 		"objecteditinghub": 0
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
/******/ 	deferredModules.push([19,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/objecteditinghub.css":
/*!****************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./contribs/gmf/examples/objecteditinghub.css?");

/***/ }),

/***/ "./contribs/gmf/examples/objecteditinghub.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ \"./contribs/gmf/examples/url.js\");\n/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objecteditinghub.css */ \"./contribs/gmf/examples/objecteditinghub.css\");\n/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/editing/XSDAttributes.js */ \"./contribs/gmf/src/editing/XSDAttributes.js\");\n/* harmony import */ var gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/objectediting/Manager.js */ \"./contribs/gmf/src/objectediting/Manager.js\");\n/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/theme/Themes.js */ \"./contribs/gmf/src/theme/Themes.js\");\n/* harmony import */ var ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/WFS.js */ \"./node_modules/ol/format/WFS.js\");\n/* harmony import */ var ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/format/XSDAttribute.js */ \"./src/format/XSDAttribute.js\");\nMainController.$inject = [\"$http\", \"$q\", \"$scope\", \"gmfThemes\", \"gmfXSDAttributes\"];\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name, gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].name]);\nmodule.value('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_THEMES);\nmodule.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GMF_LAYERS);\nmodule.constant('defaultTheme', 'Demo');\nmodule.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');\n\nfunction MainController($http, $q, $scope, gmfThemes, gmfXSDAttributes) {\n  var _this = this;\n\n  this.http_ = $http;\n  this.q_ = $q;\n  this.gmfThemes_ = gmfThemes;\n  this.gmfXSDAttributes_ = gmfXSDAttributes;\n  this.urls = [{\n    name: 'oeedit app. (hosted)',\n    url: 'apps/oeedit.html'\n  }, {\n    name: 'oeedit app. (dev)',\n    url: '../apps/oeedit.html'\n  }, {\n    name: 'example',\n    url: 'objectediting.html'\n  }];\n  this.selectedUrl = this.urls[0];\n  this.gmfServers_ = null;\n  this.gmfServer_ = null;\n  this.gmfLayerNodes = [];\n  this.selectedGmfLayerNode = null;\n  this.featuresCache_ = {};\n  this.features = [];\n  this.selectedFeature = null;\n  this.geomTypeCache_ = {};\n  this.selectedGeomType = undefined;\n  $scope.$watch(function () {\n    return _this.selectedGmfLayerNode;\n  }, function (newVal, oldVal) {\n    _this.selectedFeature = null;\n\n    if (newVal) {\n      _this.getFeatures_(newVal).then(_this.handleGetFeatures_.bind(_this, newVal));\n\n      _this.getGeometryType_(newVal).then(_this.handleGetGeometryType_.bind(_this, newVal));\n    }\n  });\n  this.themeName = 'ObjectEditing';\n  this.gmfThemes_.loadThemes();\n  this.gmfThemes_.getOgcServersObject().then(function (ogcServers) {\n    _this.gmfServers_ = ogcServers;\n\n    _this.gmfThemes_.getThemesObject().then(function (themes) {\n      if (!themes) {\n        return;\n      }\n\n      var i, ii;\n      var theme = null;\n\n      for (i = 0, ii = themes.length; i < ii; i++) {\n        if (themes[i].name === _this.themeName) {\n          theme = themes[i];\n          break;\n        }\n      }\n\n      if (!theme) {\n        return;\n      }\n\n      var groupNode = theme.children[0];\n\n      if (!groupNode.ogcServer) {\n        throw new Error('Missing groupNode.ogcServer');\n      }\n\n      if (!_this.gmfServers_) {\n        throw new Error('Missing gmfServers');\n      }\n\n      var gmfServer = _this.gmfServers_[groupNode.ogcServer];\n\n      if (gmfServer && gmfServer.wfsSupport === true && gmfServer.urlWfs) {\n        _this.gmfServer_ = gmfServer;\n      } else {\n        return;\n      }\n\n      var gmfLayerNodes = [];\n\n      for (i = 0, ii = groupNode.children.length; i < ii; i++) {\n        if (groupNode.children[i].metadata.identifierAttributeField) {\n          gmfLayerNodes.push(groupNode.children[i]);\n        }\n      }\n\n      _this.gmfLayerNodes = gmfLayerNodes;\n      _this.selectedGmfLayerNode = _this.gmfLayerNodes[1];\n    });\n  });\n}\n\nMainController.prototype.runEditor = function () {\n  if (!this.selectedGmfLayerNode) {\n    throw new Error('Missing selectedGmfLayerNode');\n  }\n\n  if (!this.selectedFeature) {\n    throw new Error('Missing selectedFeature');\n  }\n\n  var geomType = this.selectedGeomType;\n  var feature = this.selectedFeature;\n  var layer = this.selectedGmfLayerNode.id;\n  var property = this.selectedGmfLayerNode.metadata.identifierAttributeField;\n\n  if (!property) {\n    throw new Error('Missing property');\n  }\n\n  var id = feature.get(property);\n  var params = {};\n  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"ObjecteditingParam\"].GEOM_TYPE] = geomType;\n  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"ObjecteditingParam\"].ID] = id;\n  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"ObjecteditingParam\"].LAYER] = layer;\n  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"ObjecteditingParam\"].THEME] = this.themeName;\n  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__[\"ObjecteditingParam\"].PROPERTY] = property;\n  var url = MainController.appendParams(this.selectedUrl.url, params);\n  window.open(url);\n};\n\nMainController.prototype.getFeatures_ = function (gmfLayerNode) {\n  this.getFeaturesDeferred_ = this.q_.defer();\n  var features = this.getFeaturesFromCache_(gmfLayerNode);\n\n  if (features) {\n    this.getFeaturesDeferred_.resolve();\n  } else {\n    this.issueGetFeatures_(gmfLayerNode);\n  }\n\n  return this.getFeaturesDeferred_.promise;\n};\n\nMainController.prototype.issueGetFeatures_ = function (gmfLayerNode) {\n  var _this2 = this;\n\n  if (!this.gmfServer_) {\n    throw new Error('Missing gmfServer');\n  }\n\n  var id = gmfLayerNode.id;\n  var url = MainController.appendParams(this.gmfServer_.urlWfs, {\n    'SERVICE': 'WFS',\n    'REQUEST': 'GetFeature',\n    'VERSION': '1.1.0',\n    'TYPENAME': gmfLayerNode.layers\n  });\n  this.http_.get(url).then(function (response) {\n    if (!_this2.getFeaturesDeferred_) {\n      throw new Error('Missing getFeaturesDeferred');\n    }\n\n    var features = new ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]().readFeatures(response.data);\n    _this2.featuresCache_[id] = features;\n\n    _this2.getFeaturesDeferred_.resolve();\n  });\n};\n\nMainController.prototype.handleGetFeatures_ = function (gmfLayerNode) {\n  this.features = this.getFeaturesFromCache_(gmfLayerNode);\n  this.selectedFeature = this.features[0];\n};\n\nMainController.prototype.getFeaturesFromCache_ = function (gmfLayerNode) {\n  var id = gmfLayerNode.id;\n  var features = this.featuresCache_[id] || null;\n  return features;\n};\n\nMainController.prototype.getGeometryType_ = function (gmfLayerNode) {\n  this.getGeometryTypeDeferred_ = this.q_.defer();\n  var geomType = this.getGeometryTypeFromCache_(gmfLayerNode);\n\n  if (geomType) {\n    this.getGeometryTypeDeferred_.resolve();\n  } else {\n    this.issueGetAttributesRequest_(gmfLayerNode);\n  }\n\n  return this.getGeometryTypeDeferred_.promise;\n};\n\nMainController.prototype.issueGetAttributesRequest_ = function (gmfLayerNode) {\n  this.gmfXSDAttributes_.getAttributes(gmfLayerNode.id).then(function (gmfLayerNode, attributes) {\n    if (!this.getGeometryTypeDeferred_) {\n      throw new Error('Missing getGeometryTypeDeferred');\n    }\n\n    var geomAttr = Object(ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_7__[\"getGeometryAttribute\"])(attributes);\n\n    if (geomAttr && geomAttr.geomType) {\n      this.geomTypeCache_[gmfLayerNode.id] = geomAttr.geomType;\n      this.getGeometryTypeDeferred_.resolve();\n    }\n  }.bind(this, gmfLayerNode));\n};\n\nMainController.prototype.handleGetGeometryType_ = function (gmfLayerNode) {\n  var geomType = this.getGeometryTypeFromCache_(gmfLayerNode);\n  this.selectedGeomType = geomType;\n};\n\nMainController.prototype.getGeometryTypeFromCache_ = function (gmfLayerNode) {\n  var id = gmfLayerNode.id;\n  var geomType = this.geomTypeCache_[id];\n  return geomType;\n};\n\nMainController.appendParams = function (uri, params) {\n  var keyParams = [];\n  Object.keys(params).forEach(function (k) {\n    if (params[k] !== null && params[k] !== undefined) {\n      keyParams.push(k + \"=\" + encodeURIComponent(params[k]));\n    }\n  });\n  var qs = keyParams.join('&');\n  uri = uri.replace(/[?&]$/, '');\n  uri = uri.includes('?') ? uri + \"&\" : uri + \"?\";\n  return uri + qs;\n};\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./contribs/gmf/examples/objecteditinghub.js?");

/***/ }),

/***/ 19:
/*!**************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/objecteditinghub.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */\"./contribs/gmf/examples/common_dependencies.js\");\n__webpack_require__(/*! gmf/mainmodule.js */\"./contribs/gmf/src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./contribs/gmf/examples/objecteditinghub.js */\"./contribs/gmf/examples/objecteditinghub.js\");\n\n\n//# sourceURL=webpack:///multi_./contribs/gmf/examples/common_dependencies.js_gmf/mainmodule.js_./contribs/gmf/examples/objecteditinghub.js?");

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