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



/***/ }),

/***/ "./contribs/gmf/examples/objecteditinghub.js":
/*!***************************************************!*\
  !*** ./contribs/gmf/examples/objecteditinghub.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./contribs/gmf/examples/url.js");
/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objecteditinghub.css */ "./contribs/gmf/examples/objecteditinghub.css");
/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_objecteditinghub_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/editing/XSDAttributes.js */ "./contribs/gmf/src/editing/XSDAttributes.js");
/* harmony import */ var gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/objectediting/Manager.js */ "./contribs/gmf/src/objectediting/Manager.js");
/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/theme/Themes.js */ "./contribs/gmf/src/theme/Themes.js");
/* harmony import */ var ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/WFS.js */ "./node_modules/ol/format/WFS.js");
/* harmony import */ var ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/format/XSDAttribute.js */ "./src/format/XSDAttribute.js");
MainController.$inject = ["$http", "$q", "$scope", "gmfThemes", "gmfXSDAttributes"];








var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_5__["default"].name]);
module.value('gmfTreeUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].GMF_THEMES);
module.value('gmfLayersUrl', _url_js__WEBPACK_IMPORTED_MODULE_1__["default"].GMF_LAYERS);
module.constant('defaultTheme', 'Demo');
module.constant('angularLocaleScript', '../build/angular-locale_{{locale}}.js');

function MainController($http, $q, $scope, gmfThemes, gmfXSDAttributes) {
  var _this = this;

  this.http_ = $http;
  this.q_ = $q;
  this.gmfThemes_ = gmfThemes;
  this.gmfXSDAttributes_ = gmfXSDAttributes;
  this.urls = [{
    name: 'oeedit app. (hosted)',
    url: 'apps/oeedit/'
  }, {
    name: 'oeedit app. (dev)',
    url: '../apps/oeedit/'
  }, {
    name: 'example',
    url: 'objectediting.html'
  }];
  this.viewerUrlDev_ = '../apps/oeview/';
  this.viewerUrlHosted_ = 'apps/oeview/';
  this.selectedUrl = this.urls[0];
  this.gmfServers_;
  this.gmfServer_;
  this.gmfLayerNodes = [];
  this.selectedGmfLayerNode = null;
  this.featuresCache_ = {};
  this.features = null;
  this.selectedFeature = null;
  this.geomTypeCache_ = {};
  this.selectedGeomType = undefined;
  $scope.$watch(function () {
    return _this.selectedGmfLayerNode;
  }, function (newVal, oldVal) {
    _this.selectedFeature = null;

    if (newVal) {
      _this.getFeatures_(newVal).then(_this.handleGetFeatures_.bind(_this, newVal));

      _this.getGeometryType_(newVal).then(_this.handleGetGeometryType_.bind(_this, newVal));
    }
  });
  this.themeName = 'ObjectEditing';
  this.gmfThemes_.loadThemes();
  this.gmfThemes_.getOgcServersObject().then(function (ogcServers) {
    _this.gmfServers_ = ogcServers;

    _this.gmfThemes_.getThemesObject().then(function (themes) {
      if (!themes) {
        return;
      }

      var i, ii;
      var theme;

      for (i = 0, ii = themes.length; i < ii; i++) {
        if (themes[i].name === _this.themeName) {
          theme = themes[i];
          break;
        }
      }

      if (!theme) {
        return;
      }

      var groupNode = theme.children[0];
      console.assert(groupNode.ogcServer);
      var gmfServer = _this.gmfServers_[groupNode.ogcServer];

      if (gmfServer && gmfServer.wfsSupport === true && gmfServer.urlWfs) {
        _this.gmfServer_ = gmfServer;
      } else {
        return;
      }

      var gmfLayerNodes = [];

      for (i = 0, ii = groupNode.children.length; i < ii; i++) {
        if (groupNode.children[i].metadata.identifierAttributeField) {
          gmfLayerNodes.push(groupNode.children[i]);
        }
      }

      _this.gmfLayerNodes = gmfLayerNodes;
      _this.selectedGmfLayerNode = _this.gmfLayerNodes[1];
    });
  });
}

MainController.prototype.runEditor = function () {
  var geomType = this.selectedGeomType;
  var feature = this.selectedFeature;
  var layer = this.selectedGmfLayerNode.id;
  var property = this.selectedGmfLayerNode.metadata.identifierAttributeField;
  console.assert(property !== undefined);
  var id = feature.get(property);
  var params = {};
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["ObjecteditingParam"].GEOM_TYPE] = geomType;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["ObjecteditingParam"].ID] = id;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["ObjecteditingParam"].LAYER] = layer;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["ObjecteditingParam"].THEME] = this.themeName;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_4__["ObjecteditingParam"].PROPERTY] = property;
  var url = MainController.appendParams(this.selectedUrl.url, params);
  window.open(url);
};

MainController.prototype.runViewerDev = function () {
  this.runViewer_(this.viewerUrlDev_);
};

MainController.prototype.runViewerHosted = function () {
  this.runViewer_(this.viewerUrlHosted_);
};

MainController.prototype.runViewer_ = function (baseUrl) {
  var node = this.selectedGmfLayerNode;
  var nodeId = node.id;
  var nodeName = node.name;
  var nodeIdAttrFieldName = node.metadata.identifierAttributeField;
  console.assert(nodeIdAttrFieldName !== undefined);
  var ids = [];
  var features = this.featuresCache_[nodeId];

  for (var i = 0, ii = features.length; i < ii; i++) {
    ids.push(features[i].get(nodeIdAttrFieldName));
  }

  var params = {};
  params['wfs_layer'] = nodeName;
  params["wfs_" + nodeIdAttrFieldName] = ids.join(',');
  var url = MainController.appendParams(baseUrl, params);
  window.open(url);
};

MainController.prototype.getFeatures_ = function (gmfLayerNode) {
  this.getFeaturesDeferred_ = this.q_.defer();
  var features = this.getFeaturesFromCache_(gmfLayerNode);

  if (features) {
    this.getFeaturesDeferred_.resolve();
  } else {
    this.issueGetFeatures_(gmfLayerNode);
  }

  return this.getFeaturesDeferred_.promise;
};

MainController.prototype.issueGetFeatures_ = function (gmfLayerNode) {
  var _this2 = this;

  var id = gmfLayerNode.id;
  var url = MainController.appendParams(this.gmfServer_.urlWfs, {
    'SERVICE': 'WFS',
    'REQUEST': 'GetFeature',
    'VERSION': '1.1.0',
    'TYPENAME': gmfLayerNode.layers
  });
  this.http_.get(url).then(function (response) {
    var features = new ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_6__["default"]().readFeatures(response.data);
    _this2.featuresCache_[id] = features;

    _this2.getFeaturesDeferred_.resolve();
  });
};

MainController.prototype.handleGetFeatures_ = function (gmfLayerNode) {
  var features = this.getFeaturesFromCache_(gmfLayerNode);
  this.features = features;
  this.selectedFeature = this.features[0];
};

MainController.prototype.getFeaturesFromCache_ = function (gmfLayerNode) {
  var id = gmfLayerNode.id;
  var features = this.featuresCache_[id] || null;
  return features;
};

MainController.prototype.getGeometryType_ = function (gmfLayerNode) {
  this.getGeometryTypeDeferred_ = this.q_.defer();
  var geomType = this.getGeometryTypeFromCache_(gmfLayerNode);

  if (geomType) {
    this.getGeometryTypeDeferred_.resolve();
  } else {
    this.issueGetAttributesRequest_(gmfLayerNode);
  }

  return this.getGeometryTypeDeferred_.promise;
};

MainController.prototype.issueGetAttributesRequest_ = function (gmfLayerNode) {
  this.gmfXSDAttributes_.getAttributes(gmfLayerNode.id).then(function (gmfLayerNode, attributes) {
    var geomAttr = Object(ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_7__["getGeometryAttribute"])(attributes);

    if (geomAttr && geomAttr.geomType) {
      this.geomTypeCache_[gmfLayerNode.id] = geomAttr.geomType;
      this.getGeometryTypeDeferred_.resolve();
    }
  }.bind(this, gmfLayerNode));
};

MainController.prototype.handleGetGeometryType_ = function (gmfLayerNode) {
  var geomType = this.getGeometryTypeFromCache_(gmfLayerNode);
  this.selectedGeomType = geomType;
};

MainController.prototype.getGeometryTypeFromCache_ = function (gmfLayerNode) {
  var id = gmfLayerNode.id;
  var geomType = this.geomTypeCache_[id];
  return geomType;
};

MainController.appendParams = function (uri, params) {
  var keyParams = [];
  Object.keys(params).forEach(function (k) {
    if (params[k] !== null && params[k] !== undefined) {
      keyParams.push(k + "=" + encodeURIComponent(params[k]));
    }
  });
  var qs = keyParams.join('&');
  uri = uri.replace(/[?&]$/, '');
  uri = uri.indexOf('?') === -1 ? uri + "?" : uri + "&";
  return uri + qs;
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 19:
/*!**************************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/objecteditinghub.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./contribs/gmf/src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/objecteditinghub.js */"./contribs/gmf/examples/objecteditinghub.js");


/***/ })

/******/ });
//# sourceMappingURL=objecteditinghub.js.map