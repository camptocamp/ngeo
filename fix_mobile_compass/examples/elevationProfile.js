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
/******/ 		"elevationProfile": 0
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
/******/ 	deferredModules.push([15,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/elevationProfile.css":
/*!***************************************!*\
  !*** ./examples/elevationProfile.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/elevationProfile.js":
/*!**************************************!*\
  !*** ./examples/elevationProfile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elevationProfile.css */ "./examples/elevationProfile.css");
/* harmony import */ var _elevationProfile_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_elevationProfile_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/src/EPSG_21781.js */ "./node_modules/@geoblocks/proj/src/EPSG_21781.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/profile/elevationComponent.js */ "./src/profile/elevationComponent.js");
MainController.$inject = ["$http", "$scope"];














var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_12__["default"].name, ngeo_profile_elevationComponent_js__WEBPACK_IMPORTED_MODULE_13__["default"].name]);

function MainController($http, $scope) {
  var _this = this;

  this.scope_ = $scope;
  var source = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]();
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    layers: [new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
      source: new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        projection: undefined,
        url: 'http://wms.geo.admin.ch/',
        crossOrigin: 'anonymous',
        attributions: '&copy; ' + '<a href="http://www.geo.admin.ch/internet/geoportal/' + 'en/home.html">Pixelmap 1:500000 / geo.admin.ch</a>',
        params: {
          'LAYERS': 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
          'FORMAT': 'image/jpeg'
        },
        serverType: 'mapserver'
      })
    }), new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: source
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
      projection: _geoblocks_proj_src_EPSG_21781_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      extent: [420000, 30000, 900000, 350000],
      zoom: 0,
      center: [0, 0]
    })
  });
  var map = this.map;
  var vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
    source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_11__["default"]()
  });
  this.snappedPoint_ = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  vectorLayer.getSource().addFeature(this.snappedPoint_);
  vectorLayer.setMap(map);
  this.profilePoisData = [{
    sort: 1,
    dist: 1000,
    title: 'First POI',
    id: 12345
  }, {
    sort: 2,
    dist: 3000,
    title: 'Second POI',
    id: 12346
  }];
  this.profileData = undefined;
  $http.get('data/profile.json').then(function (resp) {
    var data = resp.data['profile'];
    _this.profileData = data;
    var i;
    var len = data.length;
    var lineString = new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_6__["default"]([], 'XYM');

    for (i = 0; i < len; i++) {
      var p = data[i];
      lineString.appendCoordinate([p.x, p.y, p.dist]);
    }

    source.addFeature(new ol_Feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](lineString));

    var size = _this.map.getSize();

    map.getView().fit(source.getExtent(), {
      size: size
    });
  });
  map.on('pointermove', function (evt) {
    if (evt.dragging) {
      return;
    }

    var coordinate = map.getEventCoordinate(evt.originalEvent);

    _this.snapToGeometry(coordinate, source.getFeatures()[0].getGeometry());
  });

  var typedFunctionsFactory = function typedFunctionsFactory(type, key, opt_childKey) {
    return function (item) {
      if (opt_childKey !== undefined) {
        item = item[opt_childKey];
      }

      return item[key];
    };
  };

  var types = {
    number: 1,
    string: ''
  };
  var distanceExtractor = typedFunctionsFactory(types.number, 'dist');
  var linesConfiguration = {
    'line1': {
      style: {},
      zExtractor: typedFunctionsFactory(types.number, 'mnt', 'values')
    }
  };
  var sort = typedFunctionsFactory(types.number, 'sort');
  var id = typedFunctionsFactory(types.string, 'id');
  var dist = typedFunctionsFactory(types.number, 'dist');
  var title = typedFunctionsFactory(types.string, 'title');
  var poiExtractor = {
    sort: sort,
    id: id,
    dist: dist,
    title: title,
    z: function z(item, opt_z) {
      if (opt_z !== undefined) {
        item['z'] = opt_z;
      }

      return item['z'];
    }
  };

  var hoverCallback = function (point) {
    this.point = point;
    this.snappedPoint_.setGeometry(new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_7__["default"]([point.x, point.y]));
  }.bind(this);

  var outCallback = function () {
    this.point = null;
    this.snappedPoint_.setGeometry(null);
  }.bind(this);

  this.profileOptions = {
    distanceExtractor: distanceExtractor,
    linesConfiguration: linesConfiguration,
    poiExtractor: poiExtractor,
    hoverCallback: hoverCallback,
    outCallback: outCallback
  };
  this.point = null;
  this.profileHighlight = undefined;
}

MainController.prototype.snapToGeometry = function (coordinate, geometry) {
  var closestPoint = geometry.getClosestPoint(coordinate);
  var dx = closestPoint[0] - coordinate[0];
  var dy = closestPoint[1] - coordinate[1];
  var dist = Math.sqrt(dx * dx + dy * dy);
  var pixelDist = dist / this.map.getView().getResolution();

  if (pixelDist < 8) {
    this.profileHighlight = closestPoint[2];
  } else {
    this.profileHighlight = -1;
  }

  this.scope_.$apply();
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 15:
/*!*************************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/elevationProfile.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/elevationProfile.js */"./examples/elevationProfile.js");


/***/ })

/******/ });
//# sourceMappingURL=elevationProfile.js.map