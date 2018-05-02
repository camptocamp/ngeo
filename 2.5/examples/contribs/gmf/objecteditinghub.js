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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
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
    url: 'apps/oeedit.html'
  }, {
    name: 'oeedit app. (dev)',
    url: '../apps/oeedit.html'
  }, {
    name: 'example',
    url: 'objectediting.html'
  }];
  this.selectedUrl = this.urls[0];
  this.gmfServers_ = null;
  this.gmfServer_ = null;
  this.gmfLayerNodes = [];
  this.selectedGmfLayerNode = null;
  this.featuresCache_ = {};
  this.features = [];
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
      var theme = null;

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

      if (!groupNode.ogcServer) {
        throw new Error('Missing groupNode.ogcServer');
      }

      if (!_this.gmfServers_) {
        throw new Error('Missing gmfServers');
      }

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
  if (!this.selectedGmfLayerNode) {
    throw new Error('Missing selectedGmfLayerNode');
  }

  if (!this.selectedFeature) {
    throw new Error('Missing selectedFeature');
  }

  var geomType = this.selectedGeomType;
  var feature = this.selectedFeature;
  var layer = this.selectedGmfLayerNode.id;
  var property = this.selectedGmfLayerNode.metadata.identifierAttributeField;

  if (!property) {
    throw new Error('Missing property');
  }

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

  if (!this.gmfServer_) {
    throw new Error('Missing gmfServer');
  }

  var id = gmfLayerNode.id;
  var url = MainController.appendParams(this.gmfServer_.urlWfs, {
    'SERVICE': 'WFS',
    'REQUEST': 'GetFeature',
    'VERSION': '1.1.0',
    'TYPENAME': gmfLayerNode.layers
  });
  this.http_.get(url).then(function (response) {
    if (!_this2.getFeaturesDeferred_) {
      throw new Error('Missing getFeaturesDeferred');
    }

    var features = new ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_6__["default"]().readFeatures(response.data);
    _this2.featuresCache_[id] = features;

    _this2.getFeaturesDeferred_.resolve();
  });
};

MainController.prototype.handleGetFeatures_ = function (gmfLayerNode) {
  this.features = this.getFeaturesFromCache_(gmfLayerNode);
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
    if (!this.getGeometryTypeDeferred_) {
      throw new Error('Missing getGeometryTypeDeferred');
    }

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
  uri = uri.includes('?') ? uri + "&" : uri + "?";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0ZWRpdGluZ2h1Yi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvb2JqZWN0ZWRpdGluZ2h1Yi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib2JqZWN0ZWRpdGluZ2h1YlwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsxOSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkcVwiLCBcIiRzY29wZVwiLCBcImdtZlRoZW1lc1wiLCBcImdtZlhTREF0dHJpYnV0ZXNcIl07XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBhcHBVUkwgZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0ICcuL29iamVjdGVkaXRpbmdodWIuY3NzJztcbmltcG9ydCBnbWZFZGl0aW5nWFNEQXR0cmlidXRlcyBmcm9tICdnbWYvZWRpdGluZy9YU0RBdHRyaWJ1dGVzLmpzJztcbmltcG9ydCBnbWZPYmplY3RlZGl0aW5nTWFuYWdlciwgeyBPYmplY3RlZGl0aW5nUGFyYW0gfSBmcm9tICdnbWYvb2JqZWN0ZWRpdGluZy9NYW5hZ2VyLmpzJztcbmltcG9ydCBnbWZUaGVtZVRoZW1lcyBmcm9tICdnbWYvdGhlbWUvVGhlbWVzLmpzJztcbmltcG9ydCBvbEZvcm1hdFdGUyBmcm9tICdvbC9mb3JtYXQvV0ZTLmpzJztcbmltcG9ydCB7IGdldEdlb21ldHJ5QXR0cmlidXRlIH0gZnJvbSAnbmdlby9mb3JtYXQvWFNEQXR0cmlidXRlLmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgWydnZXR0ZXh0JywgZ21mRWRpdGluZ1hTREF0dHJpYnV0ZXMubmFtZSwgZ21mT2JqZWN0ZWRpdGluZ01hbmFnZXIubmFtZSwgZ21mVGhlbWVUaGVtZXMubmFtZV0pO1xubW9kdWxlLnZhbHVlKCdnbWZUcmVlVXJsJywgYXBwVVJMLkdNRl9USEVNRVMpO1xubW9kdWxlLnZhbHVlKCdnbWZMYXllcnNVcmwnLCBhcHBVUkwuR01GX0xBWUVSUyk7XG5tb2R1bGUuY29uc3RhbnQoJ2RlZmF1bHRUaGVtZScsICdEZW1vJyk7XG5tb2R1bGUuY29uc3RhbnQoJ2FuZ3VsYXJMb2NhbGVTY3JpcHQnLCAnLi4vYnVpbGQvYW5ndWxhci1sb2NhbGVfe3tsb2NhbGV9fS5qcycpO1xuXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkaHR0cCwgJHEsICRzY29wZSwgZ21mVGhlbWVzLCBnbWZYU0RBdHRyaWJ1dGVzKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdGhpcy5odHRwXyA9ICRodHRwO1xuICB0aGlzLnFfID0gJHE7XG4gIHRoaXMuZ21mVGhlbWVzXyA9IGdtZlRoZW1lcztcbiAgdGhpcy5nbWZYU0RBdHRyaWJ1dGVzXyA9IGdtZlhTREF0dHJpYnV0ZXM7XG4gIHRoaXMudXJscyA9IFt7XG4gICAgbmFtZTogJ29lZWRpdCBhcHAuIChob3N0ZWQpJyxcbiAgICB1cmw6ICdhcHBzL29lZWRpdC5odG1sJ1xuICB9LCB7XG4gICAgbmFtZTogJ29lZWRpdCBhcHAuIChkZXYpJyxcbiAgICB1cmw6ICcuLi9hcHBzL29lZWRpdC5odG1sJ1xuICB9LCB7XG4gICAgbmFtZTogJ2V4YW1wbGUnLFxuICAgIHVybDogJ29iamVjdGVkaXRpbmcuaHRtbCdcbiAgfV07XG4gIHRoaXMuc2VsZWN0ZWRVcmwgPSB0aGlzLnVybHNbMF07XG4gIHRoaXMuZ21mU2VydmVyc18gPSBudWxsO1xuICB0aGlzLmdtZlNlcnZlcl8gPSBudWxsO1xuICB0aGlzLmdtZkxheWVyTm9kZXMgPSBbXTtcbiAgdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSA9IG51bGw7XG4gIHRoaXMuZmVhdHVyZXNDYWNoZV8gPSB7fTtcbiAgdGhpcy5mZWF0dXJlcyA9IFtdO1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG4gIHRoaXMuZ2VvbVR5cGVDYWNoZV8gPSB7fTtcbiAgdGhpcy5zZWxlY3RlZEdlb21UeXBlID0gdW5kZWZpbmVkO1xuICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGU7XG4gIH0sIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgIF90aGlzLnNlbGVjdGVkRmVhdHVyZSA9IG51bGw7XG5cbiAgICBpZiAobmV3VmFsKSB7XG4gICAgICBfdGhpcy5nZXRGZWF0dXJlc18obmV3VmFsKS50aGVuKF90aGlzLmhhbmRsZUdldEZlYXR1cmVzXy5iaW5kKF90aGlzLCBuZXdWYWwpKTtcblxuICAgICAgX3RoaXMuZ2V0R2VvbWV0cnlUeXBlXyhuZXdWYWwpLnRoZW4oX3RoaXMuaGFuZGxlR2V0R2VvbWV0cnlUeXBlXy5iaW5kKF90aGlzLCBuZXdWYWwpKTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLnRoZW1lTmFtZSA9ICdPYmplY3RFZGl0aW5nJztcbiAgdGhpcy5nbWZUaGVtZXNfLmxvYWRUaGVtZXMoKTtcbiAgdGhpcy5nbWZUaGVtZXNfLmdldE9nY1NlcnZlcnNPYmplY3QoKS50aGVuKGZ1bmN0aW9uIChvZ2NTZXJ2ZXJzKSB7XG4gICAgX3RoaXMuZ21mU2VydmVyc18gPSBvZ2NTZXJ2ZXJzO1xuXG4gICAgX3RoaXMuZ21mVGhlbWVzXy5nZXRUaGVtZXNPYmplY3QoKS50aGVuKGZ1bmN0aW9uICh0aGVtZXMpIHtcbiAgICAgIGlmICghdGhlbWVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGksIGlpO1xuICAgICAgdmFyIHRoZW1lID0gbnVsbDtcblxuICAgICAgZm9yIChpID0gMCwgaWkgPSB0aGVtZXMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBpZiAodGhlbWVzW2ldLm5hbWUgPT09IF90aGlzLnRoZW1lTmFtZSkge1xuICAgICAgICAgIHRoZW1lID0gdGhlbWVzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhlbWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZ3JvdXBOb2RlID0gdGhlbWUuY2hpbGRyZW5bMF07XG5cbiAgICAgIGlmICghZ3JvdXBOb2RlLm9nY1NlcnZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ3JvdXBOb2RlLm9nY1NlcnZlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIV90aGlzLmdtZlNlcnZlcnNfKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnbWZTZXJ2ZXJzJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBnbWZTZXJ2ZXIgPSBfdGhpcy5nbWZTZXJ2ZXJzX1tncm91cE5vZGUub2djU2VydmVyXTtcblxuICAgICAgaWYgKGdtZlNlcnZlciAmJiBnbWZTZXJ2ZXIud2ZzU3VwcG9ydCA9PT0gdHJ1ZSAmJiBnbWZTZXJ2ZXIudXJsV2ZzKSB7XG4gICAgICAgIF90aGlzLmdtZlNlcnZlcl8gPSBnbWZTZXJ2ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBnbWZMYXllck5vZGVzID0gW107XG5cbiAgICAgIGZvciAoaSA9IDAsIGlpID0gZ3JvdXBOb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICAgICAgaWYgKGdyb3VwTm9kZS5jaGlsZHJlbltpXS5tZXRhZGF0YS5pZGVudGlmaWVyQXR0cmlidXRlRmllbGQpIHtcbiAgICAgICAgICBnbWZMYXllck5vZGVzLnB1c2goZ3JvdXBOb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfdGhpcy5nbWZMYXllck5vZGVzID0gZ21mTGF5ZXJOb2RlcztcbiAgICAgIF90aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlID0gX3RoaXMuZ21mTGF5ZXJOb2Rlc1sxXTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5ydW5FZGl0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzZWxlY3RlZEdtZkxheWVyTm9kZScpO1xuICB9XG5cbiAgaWYgKCF0aGlzLnNlbGVjdGVkRmVhdHVyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzZWxlY3RlZEZlYXR1cmUnKTtcbiAgfVxuXG4gIHZhciBnZW9tVHlwZSA9IHRoaXMuc2VsZWN0ZWRHZW9tVHlwZTtcbiAgdmFyIGZlYXR1cmUgPSB0aGlzLnNlbGVjdGVkRmVhdHVyZTtcbiAgdmFyIGxheWVyID0gdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZS5pZDtcbiAgdmFyIHByb3BlcnR5ID0gdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZS5tZXRhZGF0YS5pZGVudGlmaWVyQXR0cmlidXRlRmllbGQ7XG5cbiAgaWYgKCFwcm9wZXJ0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBwcm9wZXJ0eScpO1xuICB9XG5cbiAgdmFyIGlkID0gZmVhdHVyZS5nZXQocHJvcGVydHkpO1xuICB2YXIgcGFyYW1zID0ge307XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uR0VPTV9UWVBFXSA9IGdlb21UeXBlO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLklEXSA9IGlkO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLkxBWUVSXSA9IGxheWVyO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLlRIRU1FXSA9IHRoaXMudGhlbWVOYW1lO1xuICBwYXJhbXNbT2JqZWN0ZWRpdGluZ1BhcmFtLlBST1BFUlRZXSA9IHByb3BlcnR5O1xuICB2YXIgdXJsID0gTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zKHRoaXMuc2VsZWN0ZWRVcmwudXJsLCBwYXJhbXMpO1xuICB3aW5kb3cub3Blbih1cmwpO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEZlYXR1cmVzXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXyA9IHRoaXMucV8uZGVmZXIoKTtcbiAgdmFyIGZlYXR1cmVzID0gdGhpcy5nZXRGZWF0dXJlc0Zyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcblxuICBpZiAoZmVhdHVyZXMpIHtcbiAgICB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfLnJlc29sdmUoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzc3VlR2V0RmVhdHVyZXNfKGdtZkxheWVyTm9kZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5nZXRGZWF0dXJlc0RlZmVycmVkXy5wcm9taXNlO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmlzc3VlR2V0RmVhdHVyZXNfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICBpZiAoIXRoaXMuZ21mU2VydmVyXykge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnbWZTZXJ2ZXInKTtcbiAgfVxuXG4gIHZhciBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgdmFyIHVybCA9IE1haW5Db250cm9sbGVyLmFwcGVuZFBhcmFtcyh0aGlzLmdtZlNlcnZlcl8udXJsV2ZzLCB7XG4gICAgJ1NFUlZJQ0UnOiAnV0ZTJyxcbiAgICAnUkVRVUVTVCc6ICdHZXRGZWF0dXJlJyxcbiAgICAnVkVSU0lPTic6ICcxLjEuMCcsXG4gICAgJ1RZUEVOQU1FJzogZ21mTGF5ZXJOb2RlLmxheWVyc1xuICB9KTtcbiAgdGhpcy5odHRwXy5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgIGlmICghX3RoaXMyLmdldEZlYXR1cmVzRGVmZXJyZWRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0RmVhdHVyZXNEZWZlcnJlZCcpO1xuICAgIH1cblxuICAgIHZhciBmZWF0dXJlcyA9IG5ldyBvbEZvcm1hdFdGUygpLnJlYWRGZWF0dXJlcyhyZXNwb25zZS5kYXRhKTtcbiAgICBfdGhpczIuZmVhdHVyZXNDYWNoZV9baWRdID0gZmVhdHVyZXM7XG5cbiAgICBfdGhpczIuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9KTtcbn07XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZmVhdHVyZXMgPSB0aGlzLmdldEZlYXR1cmVzRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IHRoaXMuZmVhdHVyZXNbMF07XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB2YXIgaWQgPSBnbWZMYXllck5vZGUuaWQ7XG4gIHZhciBmZWF0dXJlcyA9IHRoaXMuZmVhdHVyZXNDYWNoZV9baWRdIHx8IG51bGw7XG4gIHJldHVybiBmZWF0dXJlcztcbn07XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXyA9IHRoaXMucV8uZGVmZXIoKTtcbiAgdmFyIGdlb21UeXBlID0gdGhpcy5nZXRHZW9tZXRyeVR5cGVGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG5cbiAgaWYgKGdlb21UeXBlKSB7XG4gICAgdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNzdWVHZXRBdHRyaWJ1dGVzUmVxdWVzdF8oZ21mTGF5ZXJOb2RlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXy5wcm9taXNlO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmlzc3VlR2V0QXR0cmlidXRlc1JlcXVlc3RfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdtZlhTREF0dHJpYnV0ZXNfLmdldEF0dHJpYnV0ZXMoZ21mTGF5ZXJOb2RlLmlkKS50aGVuKGZ1bmN0aW9uIChnbWZMYXllck5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoIXRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWQnKTtcbiAgICB9XG5cbiAgICB2YXIgZ2VvbUF0dHIgPSBnZXRHZW9tZXRyeUF0dHJpYnV0ZShhdHRyaWJ1dGVzKTtcblxuICAgIGlmIChnZW9tQXR0ciAmJiBnZW9tQXR0ci5nZW9tVHlwZSkge1xuICAgICAgdGhpcy5nZW9tVHlwZUNhY2hlX1tnbWZMYXllck5vZGUuaWRdID0gZ2VvbUF0dHIuZ2VvbVR5cGU7XG4gICAgICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXy5yZXNvbHZlKCk7XG4gICAgfVxuICB9LmJpbmQodGhpcywgZ21mTGF5ZXJOb2RlKSk7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaGFuZGxlR2V0R2VvbWV0cnlUeXBlXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdmFyIGdlb21UeXBlID0gdGhpcy5nZXRHZW9tZXRyeVR5cGVGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIHRoaXMuc2VsZWN0ZWRHZW9tVHlwZSA9IGdlb21UeXBlO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHZhciBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgdmFyIGdlb21UeXBlID0gdGhpcy5nZW9tVHlwZUNhY2hlX1tpZF07XG4gIHJldHVybiBnZW9tVHlwZTtcbn07XG5cbk1haW5Db250cm9sbGVyLmFwcGVuZFBhcmFtcyA9IGZ1bmN0aW9uICh1cmksIHBhcmFtcykge1xuICB2YXIga2V5UGFyYW1zID0gW107XG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIGlmIChwYXJhbXNba10gIT09IG51bGwgJiYgcGFyYW1zW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleVBhcmFtcy5wdXNoKGsgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba10pKTtcbiAgICB9XG4gIH0pO1xuICB2YXIgcXMgPSBrZXlQYXJhbXMuam9pbignJicpO1xuICB1cmkgPSB1cmkucmVwbGFjZSgvWz8mXSQvLCAnJyk7XG4gIHVyaSA9IHVyaS5pbmNsdWRlcygnPycpID8gdXJpICsgXCImXCIgOiB1cmkgKyBcIj9cIjtcbiAgcmV0dXJuIHVyaSArIHFzO1xufTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbW9kdWxlOyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==