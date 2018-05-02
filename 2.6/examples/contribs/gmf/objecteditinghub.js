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
/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objecteditinghub.css */ "./contribs/gmf/examples/objecteditinghub.css");
/* harmony import */ var _objecteditinghub_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_objecteditinghub_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/editing/XSDAttributes.js */ "./contribs/gmf/src/editing/XSDAttributes.js");
/* harmony import */ var gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/objectediting/Manager.js */ "./contribs/gmf/src/objectediting/Manager.js");
/* harmony import */ var gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/theme/Themes.js */ "./contribs/gmf/src/theme/Themes.js");
/* harmony import */ var ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/format/WFS.js */ "./node_modules/ol/format/WFS.js");
/* harmony import */ var ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/format/XSDAttribute.js */ "./src/format/XSDAttribute.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options.js */ "./contribs/gmf/examples/options.js");
MainController.$inject = ["$http", "$q", "$scope", "gmfThemes", "gmfXSDAttributes"];








var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_editing_XSDAttributes_js__WEBPACK_IMPORTED_MODULE_2__["default"].name, gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_theme_Themes_js__WEBPACK_IMPORTED_MODULE_4__["default"].name]);

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
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["ObjecteditingParam"].GEOM_TYPE] = geomType;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["ObjecteditingParam"].ID] = id;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["ObjecteditingParam"].LAYER] = layer;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["ObjecteditingParam"].THEME] = this.themeName;
  params[gmf_objectediting_Manager_js__WEBPACK_IMPORTED_MODULE_3__["ObjecteditingParam"].PROPERTY] = property;
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

    var features = new ol_format_WFS_js__WEBPACK_IMPORTED_MODULE_5__["default"]().readFeatures(response.data);
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

    var geomAttr = Object(ngeo_format_XSDAttribute_js__WEBPACK_IMPORTED_MODULE_6__["getGeometryAttribute"])(attributes);

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

myModule.controller('MainController', MainController);
Object(_options_js__WEBPACK_IMPORTED_MODULE_7__["default"])(myModule);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0ZWRpdGluZ2h1Yi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvb2JqZWN0ZWRpdGluZ2h1Yi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib2JqZWN0ZWRpdGluZ2h1YlwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdC8vIFNpbmNlIGFsbCByZWZlcmVuY2VkIGNodW5rcyBhcmUgYWxyZWFkeSBpbmNsdWRlZFxuIFx0Ly8gaW4gdGhpcyBmaWxlLCB0aGlzIGZ1bmN0aW9uIGlzIGVtcHR5IGhlcmUuXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKCkge1xuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMTksXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHFcIiwgXCIkc2NvcGVcIiwgXCJnbWZUaGVtZXNcIiwgXCJnbWZYU0RBdHRyaWJ1dGVzXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJy4vb2JqZWN0ZWRpdGluZ2h1Yi5jc3MnO1xuaW1wb3J0IGdtZkVkaXRpbmdYU0RBdHRyaWJ1dGVzIGZyb20gJ2dtZi9lZGl0aW5nL1hTREF0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IGdtZk9iamVjdGVkaXRpbmdNYW5hZ2VyLCB7IE9iamVjdGVkaXRpbmdQYXJhbSB9IGZyb20gJ2dtZi9vYmplY3RlZGl0aW5nL01hbmFnZXIuanMnO1xuaW1wb3J0IGdtZlRoZW1lVGhlbWVzIGZyb20gJ2dtZi90aGVtZS9UaGVtZXMuanMnO1xuaW1wb3J0IG9sRm9ybWF0V0ZTIGZyb20gJ29sL2Zvcm1hdC9XRlMuanMnO1xuaW1wb3J0IHsgZ2V0R2VvbWV0cnlBdHRyaWJ1dGUgfSBmcm9tICduZ2VvL2Zvcm1hdC9YU0RBdHRyaWJ1dGUuanMnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZhcHAnLCBbJ2dldHRleHQnLCBnbWZFZGl0aW5nWFNEQXR0cmlidXRlcy5uYW1lLCBnbWZPYmplY3RlZGl0aW5nTWFuYWdlci5uYW1lLCBnbWZUaGVtZVRoZW1lcy5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRodHRwLCAkcSwgJHNjb3BlLCBnbWZUaGVtZXMsIGdtZlhTREF0dHJpYnV0ZXMpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICB0aGlzLmh0dHBfID0gJGh0dHA7XG4gIHRoaXMucV8gPSAkcTtcbiAgdGhpcy5nbWZUaGVtZXNfID0gZ21mVGhlbWVzO1xuICB0aGlzLmdtZlhTREF0dHJpYnV0ZXNfID0gZ21mWFNEQXR0cmlidXRlcztcbiAgdGhpcy51cmxzID0gW3tcbiAgICBuYW1lOiAnb2VlZGl0IGFwcC4gKGhvc3RlZCknLFxuICAgIHVybDogJ2FwcHMvb2VlZGl0Lmh0bWwnXG4gIH0sIHtcbiAgICBuYW1lOiAnb2VlZGl0IGFwcC4gKGRldiknLFxuICAgIHVybDogJy4uL2FwcHMvb2VlZGl0Lmh0bWwnXG4gIH0sIHtcbiAgICBuYW1lOiAnZXhhbXBsZScsXG4gICAgdXJsOiAnb2JqZWN0ZWRpdGluZy5odG1sJ1xuICB9XTtcbiAgdGhpcy5zZWxlY3RlZFVybCA9IHRoaXMudXJsc1swXTtcbiAgdGhpcy5nbWZTZXJ2ZXJzXyA9IG51bGw7XG4gIHRoaXMuZ21mU2VydmVyXyA9IG51bGw7XG4gIHRoaXMuZ21mTGF5ZXJOb2RlcyA9IFtdO1xuICB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlID0gbnVsbDtcbiAgdGhpcy5mZWF0dXJlc0NhY2hlXyA9IHt9O1xuICB0aGlzLmZlYXR1cmVzID0gW107XG4gIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gbnVsbDtcbiAgdGhpcy5nZW9tVHlwZUNhY2hlXyA9IHt9O1xuICB0aGlzLnNlbGVjdGVkR2VvbVR5cGUgPSB1bmRlZmluZWQ7XG4gICRzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpcy5zZWxlY3RlZEdtZkxheWVyTm9kZTtcbiAgfSwgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgX3RoaXMuc2VsZWN0ZWRGZWF0dXJlID0gbnVsbDtcblxuICAgIGlmIChuZXdWYWwpIHtcbiAgICAgIF90aGlzLmdldEZlYXR1cmVzXyhuZXdWYWwpLnRoZW4oX3RoaXMuaGFuZGxlR2V0RmVhdHVyZXNfLmJpbmQoX3RoaXMsIG5ld1ZhbCkpO1xuXG4gICAgICBfdGhpcy5nZXRHZW9tZXRyeVR5cGVfKG5ld1ZhbCkudGhlbihfdGhpcy5oYW5kbGVHZXRHZW9tZXRyeVR5cGVfLmJpbmQoX3RoaXMsIG5ld1ZhbCkpO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMudGhlbWVOYW1lID0gJ09iamVjdEVkaXRpbmcnO1xuICB0aGlzLmdtZlRoZW1lc18ubG9hZFRoZW1lcygpO1xuICB0aGlzLmdtZlRoZW1lc18uZ2V0T2djU2VydmVyc09iamVjdCgpLnRoZW4oZnVuY3Rpb24gKG9nY1NlcnZlcnMpIHtcbiAgICBfdGhpcy5nbWZTZXJ2ZXJzXyA9IG9nY1NlcnZlcnM7XG5cbiAgICBfdGhpcy5nbWZUaGVtZXNfLmdldFRoZW1lc09iamVjdCgpLnRoZW4oZnVuY3Rpb24gKHRoZW1lcykge1xuICAgICAgaWYgKCF0aGVtZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaSwgaWk7XG4gICAgICB2YXIgdGhlbWUgPSBudWxsO1xuXG4gICAgICBmb3IgKGkgPSAwLCBpaSA9IHRoZW1lcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICAgIGlmICh0aGVtZXNbaV0ubmFtZSA9PT0gX3RoaXMudGhlbWVOYW1lKSB7XG4gICAgICAgICAgdGhlbWUgPSB0aGVtZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGVtZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBncm91cE5vZGUgPSB0aGVtZS5jaGlsZHJlblswXTtcblxuICAgICAgaWYgKCFncm91cE5vZGUub2djU2VydmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBncm91cE5vZGUub2djU2VydmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghX3RoaXMuZ21mU2VydmVyc18pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdtZlNlcnZlcnMnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGdtZlNlcnZlciA9IF90aGlzLmdtZlNlcnZlcnNfW2dyb3VwTm9kZS5vZ2NTZXJ2ZXJdO1xuXG4gICAgICBpZiAoZ21mU2VydmVyICYmIGdtZlNlcnZlci53ZnNTdXBwb3J0ID09PSB0cnVlICYmIGdtZlNlcnZlci51cmxXZnMpIHtcbiAgICAgICAgX3RoaXMuZ21mU2VydmVyXyA9IGdtZlNlcnZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGdtZkxheWVyTm9kZXMgPSBbXTtcblxuICAgICAgZm9yIChpID0gMCwgaWkgPSBncm91cE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBpZiAoZ3JvdXBOb2RlLmNoaWxkcmVuW2ldLm1ldGFkYXRhLmlkZW50aWZpZXJBdHRyaWJ1dGVGaWVsZCkge1xuICAgICAgICAgIGdtZkxheWVyTm9kZXMucHVzaChncm91cE5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF90aGlzLmdtZkxheWVyTm9kZXMgPSBnbWZMYXllck5vZGVzO1xuICAgICAgX3RoaXMuc2VsZWN0ZWRHbWZMYXllck5vZGUgPSBfdGhpcy5nbWZMYXllck5vZGVzWzFdO1xuICAgIH0pO1xuICB9KTtcbn1cblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLnJ1bkVkaXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNlbGVjdGVkR21mTGF5ZXJOb2RlJyk7XG4gIH1cblxuICBpZiAoIXRoaXMuc2VsZWN0ZWRGZWF0dXJlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNlbGVjdGVkRmVhdHVyZScpO1xuICB9XG5cbiAgdmFyIGdlb21UeXBlID0gdGhpcy5zZWxlY3RlZEdlb21UeXBlO1xuICB2YXIgZmVhdHVyZSA9IHRoaXMuc2VsZWN0ZWRGZWF0dXJlO1xuICB2YXIgbGF5ZXIgPSB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlLmlkO1xuICB2YXIgcHJvcGVydHkgPSB0aGlzLnNlbGVjdGVkR21mTGF5ZXJOb2RlLm1ldGFkYXRhLmlkZW50aWZpZXJBdHRyaWJ1dGVGaWVsZDtcblxuICBpZiAoIXByb3BlcnR5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHByb3BlcnR5Jyk7XG4gIH1cblxuICB2YXIgaWQgPSBmZWF0dXJlLmdldChwcm9wZXJ0eSk7XG4gIHZhciBwYXJhbXMgPSB7fTtcbiAgcGFyYW1zW09iamVjdGVkaXRpbmdQYXJhbS5HRU9NX1RZUEVdID0gZ2VvbVR5cGU7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uSURdID0gaWQ7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uTEFZRVJdID0gbGF5ZXI7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uVEhFTUVdID0gdGhpcy50aGVtZU5hbWU7XG4gIHBhcmFtc1tPYmplY3RlZGl0aW5nUGFyYW0uUFJPUEVSVFldID0gcHJvcGVydHk7XG4gIHZhciB1cmwgPSBNYWluQ29udHJvbGxlci5hcHBlbmRQYXJhbXModGhpcy5zZWxlY3RlZFVybC51cmwsIHBhcmFtcyk7XG4gIHdpbmRvdy5vcGVuKHVybCk7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RmVhdHVyZXNfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfID0gdGhpcy5xXy5kZWZlcigpO1xuICB2YXIgZmVhdHVyZXMgPSB0aGlzLmdldEZlYXR1cmVzRnJvbUNhY2hlXyhnbWZMYXllck5vZGUpO1xuXG4gIGlmIChmZWF0dXJlcykge1xuICAgIHRoaXMuZ2V0RmVhdHVyZXNEZWZlcnJlZF8ucmVzb2x2ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNzdWVHZXRGZWF0dXJlc18oZ21mTGF5ZXJOb2RlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmdldEZlYXR1cmVzRGVmZXJyZWRfLnByb21pc2U7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaXNzdWVHZXRGZWF0dXJlc18gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5nbWZTZXJ2ZXJfKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdtZlNlcnZlcicpO1xuICB9XG5cbiAgdmFyIGlkID0gZ21mTGF5ZXJOb2RlLmlkO1xuICB2YXIgdXJsID0gTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zKHRoaXMuZ21mU2VydmVyXy51cmxXZnMsIHtcbiAgICAnU0VSVklDRSc6ICdXRlMnLFxuICAgICdSRVFVRVNUJzogJ0dldEZlYXR1cmUnLFxuICAgICdWRVJTSU9OJzogJzEuMS4wJyxcbiAgICAnVFlQRU5BTUUnOiBnbWZMYXllck5vZGUubGF5ZXJzXG4gIH0pO1xuICB0aGlzLmh0dHBfLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgaWYgKCFfdGhpczIuZ2V0RmVhdHVyZXNEZWZlcnJlZF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZXRGZWF0dXJlc0RlZmVycmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZlYXR1cmVzID0gbmV3IG9sRm9ybWF0V0ZTKCkucmVhZEZlYXR1cmVzKHJlc3BvbnNlLmRhdGEpO1xuICAgIF90aGlzMi5mZWF0dXJlc0NhY2hlX1tpZF0gPSBmZWF0dXJlcztcblxuICAgIF90aGlzMi5nZXRGZWF0dXJlc0RlZmVycmVkXy5yZXNvbHZlKCk7XG4gIH0pO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldEZlYXR1cmVzXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdGhpcy5mZWF0dXJlcyA9IHRoaXMuZ2V0RmVhdHVyZXNGcm9tQ2FjaGVfKGdtZkxheWVyTm9kZSk7XG4gIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gdGhpcy5mZWF0dXJlc1swXTtcbn07XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRGZWF0dXJlc0Zyb21DYWNoZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHZhciBpZCA9IGdtZkxheWVyTm9kZS5pZDtcbiAgdmFyIGZlYXR1cmVzID0gdGhpcy5mZWF0dXJlc0NhY2hlX1tpZF0gfHwgbnVsbDtcbiAgcmV0dXJuIGZlYXR1cmVzO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZV8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfID0gdGhpcy5xXy5kZWZlcigpO1xuICB2YXIgZ2VvbVR5cGUgPSB0aGlzLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcblxuICBpZiAoZ2VvbVR5cGUpIHtcbiAgICB0aGlzLmdldEdlb21ldHJ5VHlwZURlZmVycmVkXy5yZXNvbHZlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc3N1ZUdldEF0dHJpYnV0ZXNSZXF1ZXN0XyhnbWZMYXllck5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfLnByb21pc2U7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuaXNzdWVHZXRBdHRyaWJ1dGVzUmVxdWVzdF8gPSBmdW5jdGlvbiAoZ21mTGF5ZXJOb2RlKSB7XG4gIHRoaXMuZ21mWFNEQXR0cmlidXRlc18uZ2V0QXR0cmlidXRlcyhnbWZMYXllck5vZGUuaWQpLnRoZW4oZnVuY3Rpb24gKGdtZkxheWVyTm9kZSwgYXR0cmlidXRlcykge1xuICAgIGlmICghdGhpcy5nZXRHZW9tZXRyeVR5cGVEZWZlcnJlZF8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBnZXRHZW9tZXRyeVR5cGVEZWZlcnJlZCcpO1xuICAgIH1cblxuICAgIHZhciBnZW9tQXR0ciA9IGdldEdlb21ldHJ5QXR0cmlidXRlKGF0dHJpYnV0ZXMpO1xuXG4gICAgaWYgKGdlb21BdHRyICYmIGdlb21BdHRyLmdlb21UeXBlKSB7XG4gICAgICB0aGlzLmdlb21UeXBlQ2FjaGVfW2dtZkxheWVyTm9kZS5pZF0gPSBnZW9tQXR0ci5nZW9tVHlwZTtcbiAgICAgIHRoaXMuZ2V0R2VvbWV0cnlUeXBlRGVmZXJyZWRfLnJlc29sdmUoKTtcbiAgICB9XG4gIH0uYmluZCh0aGlzLCBnbWZMYXllck5vZGUpKTtcbn07XG5cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVHZXRHZW9tZXRyeVR5cGVfID0gZnVuY3Rpb24gKGdtZkxheWVyTm9kZSkge1xuICB2YXIgZ2VvbVR5cGUgPSB0aGlzLmdldEdlb21ldHJ5VHlwZUZyb21DYWNoZV8oZ21mTGF5ZXJOb2RlKTtcbiAgdGhpcy5zZWxlY3RlZEdlb21UeXBlID0gZ2VvbVR5cGU7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0R2VvbWV0cnlUeXBlRnJvbUNhY2hlXyA9IGZ1bmN0aW9uIChnbWZMYXllck5vZGUpIHtcbiAgdmFyIGlkID0gZ21mTGF5ZXJOb2RlLmlkO1xuICB2YXIgZ2VvbVR5cGUgPSB0aGlzLmdlb21UeXBlQ2FjaGVfW2lkXTtcbiAgcmV0dXJuIGdlb21UeXBlO1xufTtcblxuTWFpbkNvbnRyb2xsZXIuYXBwZW5kUGFyYW1zID0gZnVuY3Rpb24gKHVyaSwgcGFyYW1zKSB7XG4gIHZhciBrZXlQYXJhbXMgPSBbXTtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgaWYgKHBhcmFtc1trXSAhPT0gbnVsbCAmJiBwYXJhbXNba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAga2V5UGFyYW1zLnB1c2goayArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trXSkpO1xuICAgIH1cbiAgfSk7XG4gIHZhciBxcyA9IGtleVBhcmFtcy5qb2luKCcmJyk7XG4gIHVyaSA9IHVyaS5yZXBsYWNlKC9bPyZdJC8sICcnKTtcbiAgdXJpID0gdXJpLmluY2x1ZGVzKCc/JykgPyB1cmkgKyBcIiZcIiA6IHVyaSArIFwiP1wiO1xuICByZXR1cm4gdXJpICsgcXM7XG59O1xuXG5teU1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbm9wdGlvbnMobXlNb2R1bGUpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==