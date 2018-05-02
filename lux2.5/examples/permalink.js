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
/******/ 		"permalink": 0
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
/******/ 	deferredModules.push([31,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/permalink.css":
/*!********************************!*\
  !*** ./examples/permalink.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/permalink.js":
/*!*******************************!*\
  !*** ./examples/permalink.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _permalink_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permalink.css */ "./examples/permalink.css");
/* harmony import */ var _permalink_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_permalink_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_format_FeatureHash_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/format/FeatureHash.js */ "./src/format/FeatureHash.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
/* harmony import */ var ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/debounce.js */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/misc/decorate.js */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_statemanager_module_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/statemanager/module.js */ "./src/statemanager/module.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/interaction/Draw.js */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
DrawComponentController.$inject = ["$scope", "ngeoLocation"];
MapComponentController.$inject = ["ngeoLocation", "ngeoDebounce"];















var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_3__["default"].name, ngeo_misc_debounce_js__WEBPACK_IMPORTED_MODULE_4__["default"].name, ngeo_statemanager_module_js__WEBPACK_IMPORTED_MODULE_6__["default"].name]);
var mapComponent = {
  controller: 'AppMapController as ctrl',
  bindings: {
    'map': '=appMap'
  },
  template: '<div ngeo-map=ctrl.map></div>'
};
module.component('appMap', mapComponent);

function MapComponentController(ngeoLocation, ngeoDebounce) {
  this.map = null;
  this.ngeoLocation_ = ngeoLocation;
  this.ngeoDebounce_ = ngeoDebounce;
}

module.controller('AppMapController', MapComponentController);

MapComponentController.prototype.$onInit = function () {
  var _this = this;

  if (!this.map) {
    throw new Error('Missing map');
  }

  var view = this.map.getView();
  var zoom_ = this.ngeoLocation_.getParam('z');
  var zoom = zoom_ !== undefined ? +zoom_ : 4;
  var x = this.ngeoLocation_.getParam('x');
  var y = this.ngeoLocation_.getParam('y');
  var center = x !== undefined && y !== undefined ? [+x, +y] : [0, 0];
  view.setCenter(center);
  view.setZoom(zoom);
  this.ngeoLocation_.updateParams({
    'z': "" + zoom,
    'x': "" + Math.round(center[0]),
    'y': "" + Math.round(center[1])
  });
  view.on('propertychange', this.ngeoDebounce_(function (e) {
    var center = view.getCenter();

    if (!center) {
      throw new Error('Missing center');
    }

    var params = {
      'z': "" + view.getZoom(),
      'x': "" + Math.round(center[0]),
      'y': "" + Math.round(center[1])
    };

    _this.ngeoLocation_.updateParams(params);
  }, 300, true));
};

var drawComponent = {
  controller: 'AppDrawController as ctrl',
  bindings: {
    'map': '=appDrawMap',
    'layer': '=appDrawLayer'
  },
  template: '<label>Enable drawing:' + '<input type="checkbox" ng-model="ctrl.interaction.active" />' + '</label><br>' + '<button ng-click="ctrl.clearLayer()">Clear layer</button>'
};
module.component('appDraw', drawComponent);

function DrawComponentController($scope, ngeoLocation) {
  this.map = null;
  this.layer = null;
  this.ngeoLocation_ = ngeoLocation;
  this.scope_ = $scope;
  this.featureSeq_ = 0;
  this.interaction = null;
}

DrawComponentController.prototype.$onInit = function () {
  var _this2 = this;

  if (!this.map) {
    throw new Error('Missing map');
  }

  if (!this.layer) {
    throw new Error('Missing layer');
  }

  var vectorSource = this.layer.getSource();
  this.interaction = new ol_interaction_Draw_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
    type: 'LineString',
    source: vectorSource
  });
  this.interaction.setActive(false);
  this.map.addInteraction(this.interaction);
  Object(ngeo_misc_decorate_js__WEBPACK_IMPORTED_MODULE_5__["interactionDecoration"])(this.interaction);
  this.interaction.on('drawend', function (e) {
    e.feature.set('id', ++_this2.featureSeq_);
  });
  var fhFormat = new ngeo_format_FeatureHash_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  vectorSource.on('addfeature', function (e) {
    var feature = e.feature;
    feature.setStyle(new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_14__["default"]({
      stroke: new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_13__["default"]({
        color: [255, 0, 0, 1],
        width: 2
      })
    }));
    var features = vectorSource.getFeatures();
    var encodedFeatures = fhFormat.writeFeatures(features);

    _this2.scope_.$applyAsync(function () {
      _this2.ngeoLocation_.updateParams({
        'features': encodedFeatures
      });
    });
  });
  var encodedFeatures = this.ngeoLocation_.getParam('features');

  if (encodedFeatures !== undefined) {
    var features = fhFormat.readFeatures(encodedFeatures);
    this.featureSeq_ = features.length;
    vectorSource.addFeatures(features);
  }
};

DrawComponentController.prototype.clearLayer = function () {
  if (!this.layer) {
    throw new Error('Missing layer');
  }

  var source = this.layer.getSource();

  if (!(source instanceof ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__["default"])) {
    throw new Error('Wrong source');
  }

  source.clear(true);
  this.featureSeq_ = 0;
  this.ngeoLocation_.deleteParam('features');
};

module.controller('AppDrawController', DrawComponentController);

function MainController() {
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_11__["default"]()
    })]
  });
  var vectorSource = new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
  this.vectorLayer = new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
    source: vectorSource
  });
  this.vectorLayer.setMap(this.map);
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./node_modules/ol/format/Feature.js":
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/ol/format/Feature.js from dll-reference vendor ***!
  \*******************************************************************************/
/*! exports provided: default, transformGeometryWithOptions, transformExtentWithOptions */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(58);

/***/ }),

/***/ "./node_modules/ol/format/TextFeature.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/ol/format/TextFeature.js from dll-reference vendor ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1041);

/***/ }),

/***/ "./src/format/FeatureHash.js":
/*!***********************************!*\
  !*** ./src/format/FeatureHash.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/format/FeatureProperties.js */ "./src/format/FeatureProperties.js");
/* harmony import */ var ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/format/FeatureHashStyleType.js */ "./src/format/FeatureHashStyleType.js");
/* harmony import */ var ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/utils.js */ "./src/utils.js");
/* harmony import */ var ol_color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/color.js */ "./node_modules/ol/color.js");
/* harmony import */ var ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Feature.js */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_format_Feature_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/format/Feature.js */ "./node_modules/ol/format/Feature.js");
/* harmony import */ var ol_format_TextFeature_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/format/TextFeature.js */ "./node_modules/ol/format/TextFeature.js");
/* harmony import */ var ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/GeometryLayout.js */ "./node_modules/ol/geom/GeometryLayout.js");
/* harmony import */ var ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/LineString.js */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/MultiLineString.js */ "./node_modules/ol/geom/MultiLineString.js");
/* harmony import */ var ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/MultiPoint.js */ "./node_modules/ol/geom/MultiPoint.js");
/* harmony import */ var ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/MultiPolygon.js */ "./node_modules/ol/geom/MultiPolygon.js");
/* harmony import */ var ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom/Point.js */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/geom/Polygon.js */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Circle.js */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/style/Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/style/Stroke.js */ "./node_modules/ol/style/Stroke.js");
/* harmony import */ var ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/style/Style.js */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Text_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/style/Text.js */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/geom/Geometry.js */ "./node_modules/ol/geom/Geometry.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





















var LegacyProperties_ = {};
var DEFAULT_ACCURACY = 0.1;
var StyleTypes_ = {
  'LineString': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING,
  'Point': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT,
  'Polygon': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON,
  'MultiLineString': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING,
  'MultiPoint': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT,
  'MultiPolygon': ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON
};
var CHAR64_ = '.-_!*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghjkmnpqrstuvwxyz';
var GEOMETRY_READERS_ = {
  'P': readMultiPointGeometry_,
  'L': readMultiLineStringGeometry_,
  'A': readMultiPolygonGeometry_,
  'l': readLineStringGeometry_,
  'p': readPointGeometry_,
  'a': readPolygonGeometry_
};
var GEOMETRY_WRITERS_ = {
  'MultiLineString': writeMultiLineStringGeometry_,
  'MultiPoint': writeMultiPointGeometry_,
  'MultiPolygon': writeMultiPolygonGeometry_,
  'LineString': writeLineStringGeometry_,
  'Point': writePointGeometry_,
  'Polygon': writePolygonGeometry_
};

var FeatureHash = function (_olFormatTextFeature) {
  _inheritsLoose(FeatureHash, _olFormatTextFeature);

  function FeatureHash(opt_options) {
    var _this;

    _this = _olFormatTextFeature.call(this) || this;
    var options = opt_options || {};
    _this.accuracy_ = options.accuracy || DEFAULT_ACCURACY;
    _this.encodeStyles_ = options.encodeStyles || true;
    _this.propertiesFunction_ = options.properties || defaultPropertiesFunction_;
    _this.setStyle_ = options.setStyle !== undefined ? options.setStyle : true;
    _this.prevX_ = 0;
    _this.prevY_ = 0;
    LegacyProperties_ = options.propertiesType || {};
    _this.defaultValues_ = options.defaultValues || {};
    return _this;
  }

  var _proto = FeatureHash.prototype;

  _proto.decodeCoordinates_ = function decodeCoordinates_(text, opt_flatCoordinates) {
    var len = text.length;
    var index = 0;
    var flatCoordinates = opt_flatCoordinates !== undefined ? opt_flatCoordinates : [];
    var i = flatCoordinates.length;

    while (index < len) {
      var b = void 0;
      var shift = 0;
      var result = 0;

      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);

      var dx = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevX_ += dx;
      shift = 0;
      result = 0;

      do {
        b = CHAR64_.indexOf(text.charAt(index++));
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 32);

      var dy = result & 1 ? ~(result >> 1) : result >> 1;
      this.prevY_ += dy;
      flatCoordinates[i++] = this.prevX_ * this.accuracy_;
      flatCoordinates[i++] = this.prevY_ * this.accuracy_;
    }

    return flatCoordinates;
  };

  _proto.encodeCoordinates_ = function encodeCoordinates_(flatCoordinates, stride, offset, end) {
    var encodedCoordinates = '';

    for (var i = offset; i < end; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      x = Math.floor(x / this.accuracy_);
      y = Math.floor(y / this.accuracy_);
      var dx = x - this.prevX_;
      var dy = y - this.prevY_;
      this.prevX_ = x;
      this.prevY_ = y;
      encodedCoordinates += encodeSignedNumber_(dx) + encodeSignedNumber_(dy);
    }

    return encodedCoordinates;
  };

  _proto.readFeatureFromText = function readFeatureFromText(text, opt_options) {
    console.assert(text.length > 2);
    console.assert(text[1] === '(');
    console.assert(text.endsWith(')'));
    var splitIndex = text.indexOf('~');
    var geometryText = splitIndex >= 0 ? text.substring(0, splitIndex) + ")" : text;
    var geometry = this.readGeometryFromText(geometryText, opt_options);
    var feature = new ol_Feature_js__WEBPACK_IMPORTED_MODULE_4__["default"](geometry);

    if (splitIndex >= 0) {
      var attributesAndStylesText = text.substring(splitIndex + 1, text.length - 1);
      splitIndex = attributesAndStylesText.indexOf('~');
      var attributesText = splitIndex >= 0 ? attributesAndStylesText.substring(0, splitIndex) : attributesAndStylesText;

      if (attributesText != '') {
        var parts = attributesText.split("'");

        for (var _iterator = _createForOfIteratorHelperLoose(parts), _step; !(_step = _iterator()).done;) {
          var encodedPart = _step.value;
          var part = decodeURIComponent(encodedPart);
          var keyVal = part.split('*');
          console.assert(keyVal.length === 2);
          var key = keyVal[0];
          var value = keyVal[1];

          if (!this.setStyle_ && LegacyProperties_[key]) {
            key = LegacyProperties_[key];
          }

          feature.set(key, castValue_(key, value));
        }
      }

      if (splitIndex >= 0) {
        var stylesText = attributesAndStylesText.substring(splitIndex + 1);

        if (this.setStyle_) {
          setStyleInFeature_(stylesText, feature);
        } else {
          setStyleProperties_(stylesText, feature);
        }
      }
    }

    return feature;
  };

  _proto.readFeaturesFromText = function readFeaturesFromText(text, opt_options) {
    var _this2 = this;

    console.assert(text.startsWith('F'));
    this.prevX_ = 0;
    this.prevY_ = 0;
    var features = [];
    text = text.substring(1);

    while (text.length > 0) {
      var index = text.indexOf(')');
      console.assert(index >= 0);
      var feature = this.readFeatureFromText(text.substring(0, index + 1), opt_options);
      features.push(feature);
      text = text.substring(index + 1);
    }

    features.forEach(function (feature) {
      for (var key in _this2.defaultValues_) {
        var property = LegacyProperties_[key];

        if (feature.get(property) === undefined) {
          feature.set(property, _this2.defaultValues_[key].call(null, feature));
        }
      }
    });
    return features;
  };

  _proto.readGeometryFromText = function readGeometryFromText(text, opt_options) {
    var geometryReader = GEOMETRY_READERS_[text[0]];
    console.assert(geometryReader !== undefined);
    return geometryReader.call(this, text);
  };

  _proto.writeFeatureText = function writeFeatureText(feature, opt_options) {
    var encodedParts = [];
    var encodedGeometry = '';
    var geometry = feature.getGeometry();

    if (geometry) {
      encodedGeometry = this.writeGeometryText(geometry, opt_options);
    }

    if (encodedGeometry.length > 0) {
      console.assert(encodedGeometry.endsWith(')'));
      encodedGeometry = encodedGeometry.substring(0, encodedGeometry.length - 1);
      encodedParts.push(encodedGeometry);
    }

    var encodedProperties = [];
    var propFunction = this.propertiesFunction_(feature);

    for (var key in propFunction) {
      var value = propFunction[key];

      if (value !== undefined && value !== null && key !== feature.getGeometryName()) {
        if (encodedProperties.length !== 0) {
          encodedProperties.push("'");
        }

        var encoded = encodeURIComponent(key.replace(/[()'*]/g, '_') + "*" + value.toString().replace(/[()'*]/g, '_'));
        encodedProperties.push(encoded);
      }
    }

    if (encodedProperties.length > 0) {
      encodedParts.push('~');
      Array.prototype.push.apply(encodedParts, encodedProperties);
    }

    if (this.encodeStyles_) {
      var styleFunction = feature.getStyleFunction();

      if (styleFunction !== undefined) {
        var styles = styleFunction(feature, 0);

        if (styles !== null) {
          var encodedStyles = [];
          styles = Array.isArray(styles) ? styles : [styles];

          if (!geometry) {
            throw new Error('Missing geometry');
          }

          encodeStyles_(styles, geometry.getType(), encodedStyles);

          if (encodedStyles.length > 0) {
            encodedParts.push('~');
            Array.prototype.push.apply(encodedParts, encodedStyles);
          }
        }
      }
    }

    encodedParts.push(')');
    return encodedParts.join('');
  };

  _proto.writeFeaturesText = function writeFeaturesText(features, opt_options) {
    this.prevX_ = 0;
    this.prevY_ = 0;
    var textArray = [];

    if (features.length > 0) {
      textArray.push('F');

      for (var i = 0, ii = features.length; i < ii; ++i) {
        textArray.push(this.writeFeatureText(features[i], opt_options));
      }
    }

    return textArray.join('');
  };

  _proto.writeGeometryText = function writeGeometryText(geometry, opt_options) {
    var geometryWriter = GEOMETRY_WRITERS_[geometry.getType()];
    console.assert(geometryWriter !== undefined);
    var transformedGeometry = Object(ol_format_Feature_js__WEBPACK_IMPORTED_MODULE_5__["transformGeometryWithOptions"])(geometry, true, opt_options);

    if (!(transformedGeometry instanceof ol_geom_Geometry_js__WEBPACK_IMPORTED_MODULE_19__["default"])) {
      throw new Error('Missing transformedGeometry');
    }

    var encGeom = geometryWriter.call(this, transformedGeometry);

    if (!encGeom) {
      throw new Error('Missing encodedGeometry');
    }

    return encGeom;
  };

  return FeatureHash;
}(ol_format_TextFeature_js__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FeatureHash);

function defaultPropertiesFunction_(feature) {
  return feature.getProperties();
}

function encodeSignedNumber_(num) {
  var signedNum = num << 1;

  if (num < 0) {
    signedNum = ~signedNum;
  }

  return encodeNumber_(signedNum);
}

function encodeNumber_(num) {
  var encodedNumber = '';

  while (num >= 0x20) {
    encodedNumber += CHAR64_.charAt(0x20 | num & 0x1f);
    num >>= 5;
  }

  encodedNumber += CHAR64_.charAt(num);
  return encodedNumber;
}

function encodeStyles_(styles, geometryType, encodedStyles) {
  var styleType = StyleTypes_[geometryType];
  console.assert(styleType !== undefined);

  for (var _iterator2 = _createForOfIteratorHelperLoose(styles), _step2; !(_step2 = _iterator2()).done;) {
    var style = _step2.value;
    var fillStyle = style.getFill();
    var imageStyle = style.getImage();
    var strokeStyle = style.getStroke();
    var textStyle = style.getText();

    if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POLYGON) {
      if (fillStyle !== null) {
        encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].LINE_STRING) {
      if (strokeStyle !== null) {
        encodeStyleLine_(strokeStyle, encodedStyles);
      }
    } else if (styleType == ngeo_format_FeatureHashStyleType_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT) {
      if (imageStyle !== null) {
        encodeStylePoint_(imageStyle, encodedStyles);
      }
    }

    if (textStyle !== null) {
      encodeStyleText_(textStyle, encodedStyles);
    }
  }
}

function encodeStyleLine_(strokeStyle, encodedStyles) {
  encodeStyleStroke_(strokeStyle, encodedStyles);
}

function encodeStylePoint_(imageStyle, encodedStyles) {
  if (imageStyle instanceof ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__["default"]) {
    var radius = imageStyle.getRadius();

    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent("pointRadius*" + radius));
    var fillStyle = imageStyle.getFill();

    if (fillStyle !== null) {
      encodeStyleFill_(fillStyle, encodedStyles);
    }

    var strokeStyle = imageStyle.getStroke();

    if (strokeStyle !== null) {
      encodeStyleStroke_(strokeStyle, encodedStyles);
    }
  }
}

function encodeStylePolygon_(fillStyle, strokeStyle, encodedStyles) {
  encodeStyleFill_(fillStyle, encodedStyles);

  if (strokeStyle !== null) {
    encodeStyleStroke_(strokeStyle, encodedStyles);
  }
}

function encodeStyleFill_(fillStyle, encodedStyles, propertyName) {
  if (propertyName === void 0) {
    propertyName = 'fillColor';
  }

  var fillColor = fillStyle.getColor();
  var fillColorHex;

  if (fillColor !== null) {
    if (Array.isArray(fillColor)) {
      fillColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(fillColor);
    } else if (typeof fillColor === 'string') {
      fillColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(Object(ol_color_js__WEBPACK_IMPORTED_MODULE_3__["asArray"])(fillColor));
    } else {
      throw new Error('Unsupported color');
    }

    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent(propertyName + "*" + fillColorHex));
  }
}

function encodeStyleStroke_(strokeStyle, encodedStyles) {
  var strokeColor = strokeStyle.getColor();

  if (strokeColor !== null) {
    if (Array.isArray(strokeColor)) {
      var strokeColorHex = Object(ngeo_utils_js__WEBPACK_IMPORTED_MODULE_2__["rgbArrayToHex"])(strokeColor);

      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }

      encodedStyles.push(encodeURIComponent("strokeColor*" + strokeColorHex));
    }
  }

  var strokeWidth = strokeStyle.getWidth();

  if (strokeWidth !== undefined) {
    if (encodedStyles.length > 0) {
      encodedStyles.push("'");
    }

    encodedStyles.push(encodeURIComponent("strokeWidth*" + strokeWidth));
  }
}

function encodeStyleText_(textStyle, encodedStyles) {
  var fontStyle = textStyle.getFont();

  if (fontStyle !== undefined) {
    var font = fontStyle.split(' ');

    if (font.length >= 3) {
      if (encodedStyles.length > 0) {
        encodedStyles.push("'");
      }

      encodedStyles.push(encodeURIComponent("fontSize*" + font[1]));
    }
  }

  var fillStyle = textStyle.getFill();

  if (fillStyle !== null) {
    encodeStyleFill_(fillStyle, encodedStyles, 'fontColor');
  }
}

function readLineStringGeometry_(text) {
  console.assert(text.startsWith('l('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  return new ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_8__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY);
}

function readMultiLineStringGeometry_(text) {
  console.assert(text.startsWith('L('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var ends = [];
  var lineStrings = text.split("'");

  for (var i = 0, ii = lineStrings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(lineStrings[i], flatCoordinates);
    ends[i] = flatCoordinates.length;
  }

  return new ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_9__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY, ends);
}

function readPointGeometry_(text) {
  console.assert(text.startsWith('p('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  console.assert(flatCoordinates.length === 2);
  return new ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY);
}

function readMultiPointGeometry_(text) {
  console.assert(text.startsWith('P('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = this.decodeCoordinates_(text);
  return new ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_10__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY);
}

function readPolygonGeometry_(text) {
  console.assert(text.startsWith('a('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var ends = [];
  var rings = text.split("'");

  for (var i = 0, ii = rings.length; i < ii; ++i) {
    flatCoordinates = this.decodeCoordinates_(rings[i], flatCoordinates);
    var end = flatCoordinates.length;

    if (i === 0) {
      flatCoordinates[end++] = flatCoordinates[0];
      flatCoordinates[end++] = flatCoordinates[1];
    } else {
      flatCoordinates[end++] = flatCoordinates[ends[i - 1]];
      flatCoordinates[end++] = flatCoordinates[ends[i - 1] + 1];
    }

    ends[i] = end;
  }

  return new ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_13__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY, ends);
}

function readMultiPolygonGeometry_(text) {
  console.assert(text.startsWith('A('));
  console.assert(text.endsWith(')'));
  text = text.substring(2, text.length - 1);
  var flatCoordinates = [];
  var endss = [];
  var polygons = text.split(')(');

  for (var i = 0, ii = polygons.length; i < ii; ++i) {
    var rings = polygons[i].split("'");
    endss[i] = [];
    var ends = endss[i];

    for (var j = 0, jj = rings.length; j < jj; ++j) {
      flatCoordinates = this.decodeCoordinates_(rings[j], flatCoordinates);
      var end = flatCoordinates.length;

      if (j === 0) {
        flatCoordinates[end++] = flatCoordinates[0];
        flatCoordinates[end++] = flatCoordinates[1];
      } else {
        flatCoordinates[end++] = flatCoordinates[ends[j - 1]];
        flatCoordinates[end++] = flatCoordinates[ends[j - 1] + 1];
      }

      ends[j] = end;
    }
  }

  return new ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_11__["default"](flatCoordinates, ol_geom_GeometryLayout_js__WEBPACK_IMPORTED_MODULE_7__["default"].XY, endss);
}

function setStyleInFeature_(text, feature) {
  if (text == '') {
    return;
  }

  var properties = getStyleProperties_(text, feature);
  var fillColor = properties.fillColor;
  var fontSize = properties.fontSize;
  var fontColor = properties.fontColor;
  var pointRadius = properties.pointRadius;
  var strokeColor = properties.strokeColor;
  var strokeWidth = properties.strokeWidth;
  var fillStyle = null;

  if (fillColor !== undefined) {
    fillStyle = new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
      color: fillColor
    });
  }

  var strokeStyle = null;

  if (strokeColor !== undefined && strokeWidth !== undefined) {
    if (typeof strokeWidth != 'number') {
      throw new Error('Missing strokeWidth');
    }

    strokeStyle = new ol_style_Stroke_js__WEBPACK_IMPORTED_MODULE_16__["default"]({
      color: strokeColor,
      width: strokeWidth
    });
  }

  var imageStyle = null;

  if (pointRadius !== undefined) {
    if (typeof pointRadius != 'number') {
      throw new Error('Missing pointRadius');
    }

    var _options = {
      radius: pointRadius
    };

    if (fillStyle) {
      _options.fill = fillStyle;
    }

    if (strokeStyle) {
      _options.stroke = strokeStyle;
    }

    imageStyle = new ol_style_Circle_js__WEBPACK_IMPORTED_MODULE_14__["default"](_options);
    fillStyle = null;
    strokeStyle = null;
  }

  var textStyle = null;

  if (fontSize !== undefined && fontColor !== undefined) {
    textStyle = new ol_style_Text_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
      font: fontSize + " sans-serif",
      fill: new ol_style_Fill_js__WEBPACK_IMPORTED_MODULE_15__["default"]({
        color: fontColor
      })
    });
  }

  var options = {};

  if (fillStyle) {
    options.fill = fillStyle;
  }

  if (strokeStyle) {
    options.stroke = strokeStyle;
  }

  if (imageStyle) {
    options.image = imageStyle;
  }

  if (textStyle) {
    options.text = textStyle;
  }

  var style = new ol_style_Style_js__WEBPACK_IMPORTED_MODULE_17__["default"](options);
  feature.setStyle(style);
}

function setStyleProperties_(text, feature) {
  var properties = getStyleProperties_(text, feature);
  var geometry = feature.getGeometry();

  if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"]) {
    if (properties.isLabel || properties[ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_TEXT]) {
      delete properties.strokeColor;
      delete properties.fillColor;
    } else {
      delete properties.fontColor;
      delete properties.fontSize;
    }
  } else {
    delete properties.fontColor;

    if (geometry instanceof ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
      delete properties.fillColor;
      delete properties.fillOpacity;
    }
  }

  if (properties.fontSize) {
    var fontSizeStr = properties.fontSize;

    if (typeof fontSizeStr !== 'string') {
      throw new Error('Wrong fontSizeStr type');
    }

    var fontSize = parseFloat(fontSizeStr);

    if (fontSizeStr.includes('px')) {
      fontSize = Math.round(fontSize / 1.333333);
    }

    properties.fontSize = fontSize;
  }

  var clone = {};

  for (var key in properties) {
    var value = properties[key];

    if (LegacyProperties_[key]) {
      clone[LegacyProperties_[key]] = value;
    } else {
      clone[key] = value;
    }
  }

  feature.setProperties(clone);
}

function castValue_(key, value) {
  var numProperties = [ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].ANGLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].OPACITY, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].STROKE, 'pointRadius', 'strokeWidth'];
  var boolProperties = [ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_CIRCLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_RECTANGLE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].IS_TEXT, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_MEASURE, ngeo_format_FeatureProperties_js__WEBPACK_IMPORTED_MODULE_0__["default"].SHOW_LABEL, 'isCircle', 'isRectangle', 'isLabel', 'showMeasure', 'showLabel'];

  if (numProperties.includes(key)) {
    return +value;
  } else if (boolProperties.includes(key)) {
    return value === 'true' ? true : false;
  } else {
    return value;
  }
}

function getStyleProperties_(text, feature) {
  var parts = text.split("'");
  var properties = {};

  for (var _iterator3 = _createForOfIteratorHelperLoose(parts), _step3; !(_step3 = _iterator3()).done;) {
    var encodedPart = _step3.value;
    var part = decodeURIComponent(encodedPart);
    var keyVal = part.split('*');
    console.assert(keyVal.length === 2);
    var key = keyVal[0];
    var val = keyVal[1];
    properties[key] = castValue_(key, val);
  }

  return properties;
}

function writeLineStringGeometry_(geometry) {
  if (geometry instanceof ol_geom_LineString_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "l(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function writeMultiLineStringGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiLineString_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
    var ends = geometry.getEnds();
    var lineStringCount = ends.length;
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var offset = 0;
    var textArray = ['L('];

    for (var i = 0; i < lineStringCount; ++i) {
      var end = ends[i];
      var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);

      if (i !== 0) {
        textArray.push("'");
      }

      textArray.push(text);
      offset = end;
    }

    textArray.push(')');
    return textArray.join('');
  }

  return null;
}

function writePointGeometry_(geometry) {
  if (geometry instanceof ol_geom_Point_js__WEBPACK_IMPORTED_MODULE_12__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "p(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function writeMultiPointGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiPoint_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var end = flatCoordinates.length;
    return "P(" + this.encodeCoordinates_(flatCoordinates, stride, 0, end) + ")";
  }

  return null;
}

function encodeRings_(flatCoordinates, stride, offset, ends, textArray) {
  var linearRingCount = ends.length;

  for (var i = 0; i < linearRingCount; ++i) {
    var end = ends[i] - stride;
    var text = this.encodeCoordinates_(flatCoordinates, stride, offset, end);

    if (i !== 0) {
      textArray.push("'");
    }

    textArray.push(text);
    offset = ends[i];
  }

  return offset;
}

function writePolygonGeometry_(geometry) {
  if (geometry instanceof ol_geom_Polygon_js__WEBPACK_IMPORTED_MODULE_13__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var ends = geometry.getEnds();
    var offset = 0;
    var textArray = ['a('];
    encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
    textArray.push(')');
    return textArray.join('');
  }

  return null;
}

function writeMultiPolygonGeometry_(geometry) {
  if (geometry instanceof ol_geom_MultiPolygon_js__WEBPACK_IMPORTED_MODULE_11__["default"]) {
    var flatCoordinates = geometry.getFlatCoordinates();
    var stride = geometry.getStride();
    var endss = geometry.getEndss();
    var polygonCount = endss.length;
    var offset = 0;
    var textArray = ['A'];

    for (var i = 0; i < polygonCount; ++i) {
      var ends = endss[i];
      textArray.push('(');
      offset = encodeRings_.call(this, flatCoordinates, stride, offset, ends, textArray);
      textArray.push(')');
    }

    return textArray.join('');
  } else {
    throw new Error('Wrong geometry type');
  }
}

/***/ }),

/***/ "./src/format/FeatureHashStyleType.js":
/*!********************************************!*\
  !*** ./src/format/FeatureHashStyleType.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  LINE_STRING: 'LineString',
  POINT: 'Point',
  POLYGON: 'Polygon'
});

/***/ }),

/***/ 31:
/*!******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/permalink.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/permalink.js */"./examples/permalink.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWFsaW5rLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL3Blcm1hbGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm9ybWF0L0ZlYXR1cmVIYXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9mb3JtYXQvRmVhdHVyZUhhc2hTdHlsZVR5cGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInBlcm1hbGlua1wiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFszMSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJEcmF3Q29tcG9uZW50Q29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibmdlb0xvY2F0aW9uXCJdO1xuTWFwQ29tcG9uZW50Q29udHJvbGxlci4kaW5qZWN0ID0gW1wibmdlb0xvY2F0aW9uXCIsIFwibmdlb0RlYm91bmNlXCJdO1xuaW1wb3J0ICcuL3Blcm1hbGluay5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoIGZyb20gJ25nZW8vZm9ybWF0L0ZlYXR1cmVIYXNoLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG5pbXBvcnQgbmdlb01pc2NEZWJvdW5jZSBmcm9tICduZ2VvL21pc2MvZGVib3VuY2UuanMnO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlLmpzJztcbmltcG9ydCBuZ2VvU3RhdGVtYW5hZ2VyTW9kdWxlIGZyb20gJ25nZW8vc3RhdGVtYW5hZ2VyL21vZHVsZS5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbEludGVyYWN0aW9uRHJhdyBmcm9tICdvbC9pbnRlcmFjdGlvbi9EcmF3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0cm9rZSBmcm9tICdvbC9zdHlsZS9TdHJva2UuanMnO1xuaW1wb3J0IG9sU3R5bGVTdHlsZSBmcm9tICdvbC9zdHlsZS9TdHlsZS5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01pc2NEZWJvdW5jZS5uYW1lLCBuZ2VvU3RhdGVtYW5hZ2VyTW9kdWxlLm5hbWVdKTtcbnZhciBtYXBDb21wb25lbnQgPSB7XG4gIGNvbnRyb2xsZXI6ICdBcHBNYXBDb250cm9sbGVyIGFzIGN0cmwnLFxuICBiaW5kaW5nczoge1xuICAgICdtYXAnOiAnPWFwcE1hcCdcbiAgfSxcbiAgdGVtcGxhdGU6ICc8ZGl2IG5nZW8tbWFwPWN0cmwubWFwPjwvZGl2Pidcbn07XG5tb2R1bGUuY29tcG9uZW50KCdhcHBNYXAnLCBtYXBDb21wb25lbnQpO1xuXG5mdW5jdGlvbiBNYXBDb21wb25lbnRDb250cm9sbGVyKG5nZW9Mb2NhdGlvbiwgbmdlb0RlYm91bmNlKSB7XG4gIHRoaXMubWFwID0gbnVsbDtcbiAgdGhpcy5uZ2VvTG9jYXRpb25fID0gbmdlb0xvY2F0aW9uO1xuICB0aGlzLm5nZW9EZWJvdW5jZV8gPSBuZ2VvRGVib3VuY2U7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdBcHBNYXBDb250cm9sbGVyJywgTWFwQ29tcG9uZW50Q29udHJvbGxlcik7XG5cbk1hcENvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuXG4gIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICB2YXIgem9vbV8gPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3onKTtcbiAgdmFyIHpvb20gPSB6b29tXyAhPT0gdW5kZWZpbmVkID8gK3pvb21fIDogNDtcbiAgdmFyIHggPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3gnKTtcbiAgdmFyIHkgPSB0aGlzLm5nZW9Mb2NhdGlvbl8uZ2V0UGFyYW0oJ3knKTtcbiAgdmFyIGNlbnRlciA9IHggIT09IHVuZGVmaW5lZCAmJiB5ICE9PSB1bmRlZmluZWQgPyBbK3gsICt5XSA6IFswLCAwXTtcbiAgdmlldy5zZXRDZW50ZXIoY2VudGVyKTtcbiAgdmlldy5zZXRab29tKHpvb20pO1xuICB0aGlzLm5nZW9Mb2NhdGlvbl8udXBkYXRlUGFyYW1zKHtcbiAgICAneic6IFwiXCIgKyB6b29tLFxuICAgICd4JzogXCJcIiArIE1hdGgucm91bmQoY2VudGVyWzBdKSxcbiAgICAneSc6IFwiXCIgKyBNYXRoLnJvdW5kKGNlbnRlclsxXSlcbiAgfSk7XG4gIHZpZXcub24oJ3Byb3BlcnR5Y2hhbmdlJywgdGhpcy5uZ2VvRGVib3VuY2VfKGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGNlbnRlciA9IHZpZXcuZ2V0Q2VudGVyKCk7XG5cbiAgICBpZiAoIWNlbnRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNlbnRlcicpO1xuICAgIH1cblxuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAneic6IFwiXCIgKyB2aWV3LmdldFpvb20oKSxcbiAgICAgICd4JzogXCJcIiArIE1hdGgucm91bmQoY2VudGVyWzBdKSxcbiAgICAgICd5JzogXCJcIiArIE1hdGgucm91bmQoY2VudGVyWzFdKVxuICAgIH07XG5cbiAgICBfdGhpcy5uZ2VvTG9jYXRpb25fLnVwZGF0ZVBhcmFtcyhwYXJhbXMpO1xuICB9LCAzMDAsIHRydWUpKTtcbn07XG5cbnZhciBkcmF3Q29tcG9uZW50ID0ge1xuICBjb250cm9sbGVyOiAnQXBwRHJhd0NvbnRyb2xsZXIgYXMgY3RybCcsXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21hcCc6ICc9YXBwRHJhd01hcCcsXG4gICAgJ2xheWVyJzogJz1hcHBEcmF3TGF5ZXInXG4gIH0sXG4gIHRlbXBsYXRlOiAnPGxhYmVsPkVuYWJsZSBkcmF3aW5nOicgKyAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5nLW1vZGVsPVwiY3RybC5pbnRlcmFjdGlvbi5hY3RpdmVcIiAvPicgKyAnPC9sYWJlbD48YnI+JyArICc8YnV0dG9uIG5nLWNsaWNrPVwiY3RybC5jbGVhckxheWVyKClcIj5DbGVhciBsYXllcjwvYnV0dG9uPidcbn07XG5tb2R1bGUuY29tcG9uZW50KCdhcHBEcmF3JywgZHJhd0NvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIERyYXdDb21wb25lbnRDb250cm9sbGVyKCRzY29wZSwgbmdlb0xvY2F0aW9uKSB7XG4gIHRoaXMubWFwID0gbnVsbDtcbiAgdGhpcy5sYXllciA9IG51bGw7XG4gIHRoaXMubmdlb0xvY2F0aW9uXyA9IG5nZW9Mb2NhdGlvbjtcbiAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gIHRoaXMuZmVhdHVyZVNlcV8gPSAwO1xuICB0aGlzLmludGVyYWN0aW9uID0gbnVsbDtcbn1cblxuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cblxuICBpZiAoIXRoaXMubGF5ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbGF5ZXInKTtcbiAgfVxuXG4gIHZhciB2ZWN0b3JTb3VyY2UgPSB0aGlzLmxheWVyLmdldFNvdXJjZSgpO1xuICB0aGlzLmludGVyYWN0aW9uID0gbmV3IG9sSW50ZXJhY3Rpb25EcmF3KHtcbiAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgc291cmNlOiB2ZWN0b3JTb3VyY2VcbiAgfSk7XG4gIHRoaXMuaW50ZXJhY3Rpb24uc2V0QWN0aXZlKGZhbHNlKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5pbnRlcmFjdGlvbik7XG4gIGludGVyYWN0aW9uRGVjb3JhdGlvbih0aGlzLmludGVyYWN0aW9uKTtcbiAgdGhpcy5pbnRlcmFjdGlvbi5vbignZHJhd2VuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5mZWF0dXJlLnNldCgnaWQnLCArK190aGlzMi5mZWF0dXJlU2VxXyk7XG4gIH0pO1xuICB2YXIgZmhGb3JtYXQgPSBuZXcgbmdlb0Zvcm1hdEZlYXR1cmVIYXNoKCk7XG4gIHZlY3RvclNvdXJjZS5vbignYWRkZmVhdHVyZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGZlYXR1cmUgPSBlLmZlYXR1cmU7XG4gICAgZmVhdHVyZS5zZXRTdHlsZShuZXcgb2xTdHlsZVN0eWxlKHtcbiAgICAgIHN0cm9rZTogbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgICBjb2xvcjogWzI1NSwgMCwgMCwgMV0sXG4gICAgICAgIHdpZHRoOiAyXG4gICAgICB9KVxuICAgIH0pKTtcbiAgICB2YXIgZmVhdHVyZXMgPSB2ZWN0b3JTb3VyY2UuZ2V0RmVhdHVyZXMoKTtcbiAgICB2YXIgZW5jb2RlZEZlYXR1cmVzID0gZmhGb3JtYXQud3JpdGVGZWF0dXJlcyhmZWF0dXJlcyk7XG5cbiAgICBfdGhpczIuc2NvcGVfLiRhcHBseUFzeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMi5uZ2VvTG9jYXRpb25fLnVwZGF0ZVBhcmFtcyh7XG4gICAgICAgICdmZWF0dXJlcyc6IGVuY29kZWRGZWF0dXJlc1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICB2YXIgZW5jb2RlZEZlYXR1cmVzID0gdGhpcy5uZ2VvTG9jYXRpb25fLmdldFBhcmFtKCdmZWF0dXJlcycpO1xuXG4gIGlmIChlbmNvZGVkRmVhdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBmZWF0dXJlcyA9IGZoRm9ybWF0LnJlYWRGZWF0dXJlcyhlbmNvZGVkRmVhdHVyZXMpO1xuICAgIHRoaXMuZmVhdHVyZVNlcV8gPSBmZWF0dXJlcy5sZW5ndGg7XG4gICAgdmVjdG9yU291cmNlLmFkZEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgfVxufTtcblxuRHJhd0NvbXBvbmVudENvbnRyb2xsZXIucHJvdG90eXBlLmNsZWFyTGF5ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5sYXllcikge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBsYXllcicpO1xuICB9XG5cbiAgdmFyIHNvdXJjZSA9IHRoaXMubGF5ZXIuZ2V0U291cmNlKCk7XG5cbiAgaWYgKCEoc291cmNlIGluc3RhbmNlb2Ygb2xTb3VyY2VWZWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBzb3VyY2UnKTtcbiAgfVxuXG4gIHNvdXJjZS5jbGVhcih0cnVlKTtcbiAgdGhpcy5mZWF0dXJlU2VxXyA9IDA7XG4gIHRoaXMubmdlb0xvY2F0aW9uXy5kZWxldGVQYXJhbSgnZmVhdHVyZXMnKTtcbn07XG5cbm1vZHVsZS5jb250cm9sbGVyKCdBcHBEcmF3Q29udHJvbGxlcicsIERyYXdDb21wb25lbnRDb250cm9sbGVyKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoKSB7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXVxuICB9KTtcbiAgdmFyIHZlY3RvclNvdXJjZSA9IG5ldyBvbFNvdXJjZVZlY3RvcigpO1xuICB0aGlzLnZlY3RvckxheWVyID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgIHNvdXJjZTogdmVjdG9yU291cmNlXG4gIH0pO1xuICB0aGlzLnZlY3RvckxheWVyLnNldE1hcCh0aGlzLm1hcCk7XG59XG5cbm1vZHVsZS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiLCJmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdDsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgb1tTeW1ib2wuaXRlcmF0b3JdID09IG51bGwpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSBpdCA9IG9bU3ltYm9sLml0ZXJhdG9yXSgpOyByZXR1cm4gaXQubmV4dC5iaW5kKGl0KTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzIGZyb20gJ25nZW8vZm9ybWF0L0ZlYXR1cmVQcm9wZXJ0aWVzLmpzJztcbmltcG9ydCBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUgZnJvbSAnbmdlby9mb3JtYXQvRmVhdHVyZUhhc2hTdHlsZVR5cGUuanMnO1xuaW1wb3J0IHsgcmdiQXJyYXlUb0hleCB9IGZyb20gJ25nZW8vdXRpbHMuanMnO1xuaW1wb3J0IHsgYXNBcnJheSBhcyBhc0NvbG9yQXJyYXkgfSBmcm9tICdvbC9jb2xvci5qcyc7XG5pbXBvcnQgb2xGZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUuanMnO1xuaW1wb3J0IHsgdHJhbnNmb3JtR2VvbWV0cnlXaXRoT3B0aW9ucyB9IGZyb20gJ29sL2Zvcm1hdC9GZWF0dXJlLmpzJztcbmltcG9ydCBvbEZvcm1hdFRleHRGZWF0dXJlIGZyb20gJ29sL2Zvcm1hdC9UZXh0RmVhdHVyZS5qcyc7XG5pbXBvcnQgb2xHZW9tR2VvbWV0cnlMYXlvdXQgZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeUxheW91dC5qcyc7XG5pbXBvcnQgb2xHZW9tTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL0xpbmVTdHJpbmcuanMnO1xuaW1wb3J0IG9sR2VvbU11bHRpTGluZVN0cmluZyBmcm9tICdvbC9nZW9tL011bHRpTGluZVN0cmluZy5qcyc7XG5pbXBvcnQgb2xHZW9tTXVsdGlQb2ludCBmcm9tICdvbC9nZW9tL011bHRpUG9pbnQuanMnO1xuaW1wb3J0IG9sR2VvbU11bHRpUG9seWdvbiBmcm9tICdvbC9nZW9tL011bHRpUG9seWdvbi5qcyc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludC5qcyc7XG5pbXBvcnQgb2xHZW9tUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24uanMnO1xuaW1wb3J0IG9sU3R5bGVDaXJjbGUgZnJvbSAnb2wvc3R5bGUvQ2lyY2xlLmpzJztcbmltcG9ydCBvbFN0eWxlRmlsbCBmcm9tICdvbC9zdHlsZS9GaWxsLmpzJztcbmltcG9ydCBvbFN0eWxlU3Ryb2tlIGZyb20gJ29sL3N0eWxlL1N0cm9rZS5qcyc7XG5pbXBvcnQgb2xTdHlsZVN0eWxlIGZyb20gJ29sL3N0eWxlL1N0eWxlLmpzJztcbmltcG9ydCBvbFN0eWxlVGV4dCBmcm9tICdvbC9zdHlsZS9UZXh0LmpzJztcbmltcG9ydCBHZW9tZXRyeSBmcm9tICdvbC9nZW9tL0dlb21ldHJ5LmpzJztcbnZhciBMZWdhY3lQcm9wZXJ0aWVzXyA9IHt9O1xudmFyIERFRkFVTFRfQUNDVVJBQ1kgPSAwLjE7XG52YXIgU3R5bGVUeXBlc18gPSB7XG4gICdMaW5lU3RyaW5nJzogbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLkxJTkVfU1RSSU5HLFxuICAnUG9pbnQnOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuUE9JTlQsXG4gICdQb2x5Z29uJzogbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLlBPTFlHT04sXG4gICdNdWx0aUxpbmVTdHJpbmcnOiBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuTElORV9TVFJJTkcsXG4gICdNdWx0aVBvaW50Jzogbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLlBPSU5ULFxuICAnTXVsdGlQb2x5Z29uJzogbmdlb0Zvcm1hdEZlYXR1cmVIYXNoU3R5bGVUeXBlLlBPTFlHT05cbn07XG52YXIgQ0hBUjY0XyA9ICcuLV8hKkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OWFiY2RlZmdoamttbnBxcnN0dXZ3eHl6JztcbnZhciBHRU9NRVRSWV9SRUFERVJTXyA9IHtcbiAgJ1AnOiByZWFkTXVsdGlQb2ludEdlb21ldHJ5XyxcbiAgJ0wnOiByZWFkTXVsdGlMaW5lU3RyaW5nR2VvbWV0cnlfLFxuICAnQSc6IHJlYWRNdWx0aVBvbHlnb25HZW9tZXRyeV8sXG4gICdsJzogcmVhZExpbmVTdHJpbmdHZW9tZXRyeV8sXG4gICdwJzogcmVhZFBvaW50R2VvbWV0cnlfLFxuICAnYSc6IHJlYWRQb2x5Z29uR2VvbWV0cnlfXG59O1xudmFyIEdFT01FVFJZX1dSSVRFUlNfID0ge1xuICAnTXVsdGlMaW5lU3RyaW5nJzogd3JpdGVNdWx0aUxpbmVTdHJpbmdHZW9tZXRyeV8sXG4gICdNdWx0aVBvaW50Jzogd3JpdGVNdWx0aVBvaW50R2VvbWV0cnlfLFxuICAnTXVsdGlQb2x5Z29uJzogd3JpdGVNdWx0aVBvbHlnb25HZW9tZXRyeV8sXG4gICdMaW5lU3RyaW5nJzogd3JpdGVMaW5lU3RyaW5nR2VvbWV0cnlfLFxuICAnUG9pbnQnOiB3cml0ZVBvaW50R2VvbWV0cnlfLFxuICAnUG9seWdvbic6IHdyaXRlUG9seWdvbkdlb21ldHJ5X1xufTtcblxudmFyIEZlYXR1cmVIYXNoID0gZnVuY3Rpb24gKF9vbEZvcm1hdFRleHRGZWF0dXJlKSB7XG4gIF9pbmhlcml0c0xvb3NlKEZlYXR1cmVIYXNoLCBfb2xGb3JtYXRUZXh0RmVhdHVyZSk7XG5cbiAgZnVuY3Rpb24gRmVhdHVyZUhhc2gob3B0X29wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9vbEZvcm1hdFRleHRGZWF0dXJlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB2YXIgb3B0aW9ucyA9IG9wdF9vcHRpb25zIHx8IHt9O1xuICAgIF90aGlzLmFjY3VyYWN5XyA9IG9wdGlvbnMuYWNjdXJhY3kgfHwgREVGQVVMVF9BQ0NVUkFDWTtcbiAgICBfdGhpcy5lbmNvZGVTdHlsZXNfID0gb3B0aW9ucy5lbmNvZGVTdHlsZXMgfHwgdHJ1ZTtcbiAgICBfdGhpcy5wcm9wZXJ0aWVzRnVuY3Rpb25fID0gb3B0aW9ucy5wcm9wZXJ0aWVzIHx8IGRlZmF1bHRQcm9wZXJ0aWVzRnVuY3Rpb25fO1xuICAgIF90aGlzLnNldFN0eWxlXyA9IG9wdGlvbnMuc2V0U3R5bGUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuc2V0U3R5bGUgOiB0cnVlO1xuICAgIF90aGlzLnByZXZYXyA9IDA7XG4gICAgX3RoaXMucHJldllfID0gMDtcbiAgICBMZWdhY3lQcm9wZXJ0aWVzXyA9IG9wdGlvbnMucHJvcGVydGllc1R5cGUgfHwge307XG4gICAgX3RoaXMuZGVmYXVsdFZhbHVlc18gPSBvcHRpb25zLmRlZmF1bHRWYWx1ZXMgfHwge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IEZlYXR1cmVIYXNoLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGVjb2RlQ29vcmRpbmF0ZXNfID0gZnVuY3Rpb24gZGVjb2RlQ29vcmRpbmF0ZXNfKHRleHQsIG9wdF9mbGF0Q29vcmRpbmF0ZXMpIHtcbiAgICB2YXIgbGVuID0gdGV4dC5sZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gb3B0X2ZsYXRDb29yZGluYXRlcyAhPT0gdW5kZWZpbmVkID8gb3B0X2ZsYXRDb29yZGluYXRlcyA6IFtdO1xuICAgIHZhciBpID0gZmxhdENvb3JkaW5hdGVzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpbmRleCA8IGxlbikge1xuICAgICAgdmFyIGIgPSB2b2lkIDA7XG4gICAgICB2YXIgc2hpZnQgPSAwO1xuICAgICAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgYiA9IENIQVI2NF8uaW5kZXhPZih0ZXh0LmNoYXJBdChpbmRleCsrKSk7XG4gICAgICAgIHJlc3VsdCB8PSAoYiAmIDB4MWYpIDw8IHNoaWZ0O1xuICAgICAgICBzaGlmdCArPSA1O1xuICAgICAgfSB3aGlsZSAoYiA+PSAzMik7XG5cbiAgICAgIHZhciBkeCA9IHJlc3VsdCAmIDEgPyB+KHJlc3VsdCA+PiAxKSA6IHJlc3VsdCA+PiAxO1xuICAgICAgdGhpcy5wcmV2WF8gKz0gZHg7XG4gICAgICBzaGlmdCA9IDA7XG4gICAgICByZXN1bHQgPSAwO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGIgPSBDSEFSNjRfLmluZGV4T2YodGV4dC5jaGFyQXQoaW5kZXgrKykpO1xuICAgICAgICByZXN1bHQgfD0gKGIgJiAweDFmKSA8PCBzaGlmdDtcbiAgICAgICAgc2hpZnQgKz0gNTtcbiAgICAgIH0gd2hpbGUgKGIgPj0gMzIpO1xuXG4gICAgICB2YXIgZHkgPSByZXN1bHQgJiAxID8gfihyZXN1bHQgPj4gMSkgOiByZXN1bHQgPj4gMTtcbiAgICAgIHRoaXMucHJldllfICs9IGR5O1xuICAgICAgZmxhdENvb3JkaW5hdGVzW2krK10gPSB0aGlzLnByZXZYXyAqIHRoaXMuYWNjdXJhY3lfO1xuICAgICAgZmxhdENvb3JkaW5hdGVzW2krK10gPSB0aGlzLnByZXZZXyAqIHRoaXMuYWNjdXJhY3lfO1xuICAgIH1cblxuICAgIHJldHVybiBmbGF0Q29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgX3Byb3RvLmVuY29kZUNvb3JkaW5hdGVzXyA9IGZ1bmN0aW9uIGVuY29kZUNvb3JkaW5hdGVzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgb2Zmc2V0LCBlbmQpIHtcbiAgICB2YXIgZW5jb2RlZENvb3JkaW5hdGVzID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gb2Zmc2V0OyBpIDwgZW5kOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmFyIHggPSBmbGF0Q29vcmRpbmF0ZXNbaV07XG4gICAgICB2YXIgeSA9IGZsYXRDb29yZGluYXRlc1tpICsgMV07XG4gICAgICB4ID0gTWF0aC5mbG9vcih4IC8gdGhpcy5hY2N1cmFjeV8pO1xuICAgICAgeSA9IE1hdGguZmxvb3IoeSAvIHRoaXMuYWNjdXJhY3lfKTtcbiAgICAgIHZhciBkeCA9IHggLSB0aGlzLnByZXZYXztcbiAgICAgIHZhciBkeSA9IHkgLSB0aGlzLnByZXZZXztcbiAgICAgIHRoaXMucHJldlhfID0geDtcbiAgICAgIHRoaXMucHJldllfID0geTtcbiAgICAgIGVuY29kZWRDb29yZGluYXRlcyArPSBlbmNvZGVTaWduZWROdW1iZXJfKGR4KSArIGVuY29kZVNpZ25lZE51bWJlcl8oZHkpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmNvZGVkQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgX3Byb3RvLnJlYWRGZWF0dXJlRnJvbVRleHQgPSBmdW5jdGlvbiByZWFkRmVhdHVyZUZyb21UZXh0KHRleHQsIG9wdF9vcHRpb25zKSB7XG4gICAgY29uc29sZS5hc3NlcnQodGV4dC5sZW5ndGggPiAyKTtcbiAgICBjb25zb2xlLmFzc2VydCh0ZXh0WzFdID09PSAnKCcpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRleHQuZW5kc1dpdGgoJyknKSk7XG4gICAgdmFyIHNwbGl0SW5kZXggPSB0ZXh0LmluZGV4T2YoJ34nKTtcbiAgICB2YXIgZ2VvbWV0cnlUZXh0ID0gc3BsaXRJbmRleCA+PSAwID8gdGV4dC5zdWJzdHJpbmcoMCwgc3BsaXRJbmRleCkgKyBcIilcIiA6IHRleHQ7XG4gICAgdmFyIGdlb21ldHJ5ID0gdGhpcy5yZWFkR2VvbWV0cnlGcm9tVGV4dChnZW9tZXRyeVRleHQsIG9wdF9vcHRpb25zKTtcbiAgICB2YXIgZmVhdHVyZSA9IG5ldyBvbEZlYXR1cmUoZ2VvbWV0cnkpO1xuXG4gICAgaWYgKHNwbGl0SW5kZXggPj0gMCkge1xuICAgICAgdmFyIGF0dHJpYnV0ZXNBbmRTdHlsZXNUZXh0ID0gdGV4dC5zdWJzdHJpbmcoc3BsaXRJbmRleCArIDEsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICBzcGxpdEluZGV4ID0gYXR0cmlidXRlc0FuZFN0eWxlc1RleHQuaW5kZXhPZignficpO1xuICAgICAgdmFyIGF0dHJpYnV0ZXNUZXh0ID0gc3BsaXRJbmRleCA+PSAwID8gYXR0cmlidXRlc0FuZFN0eWxlc1RleHQuc3Vic3RyaW5nKDAsIHNwbGl0SW5kZXgpIDogYXR0cmlidXRlc0FuZFN0eWxlc1RleHQ7XG5cbiAgICAgIGlmIChhdHRyaWJ1dGVzVGV4dCAhPSAnJykge1xuICAgICAgICB2YXIgcGFydHMgPSBhdHRyaWJ1dGVzVGV4dC5zcGxpdChcIidcIik7XG5cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShwYXJ0cyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICAgICAgdmFyIGVuY29kZWRQYXJ0ID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgdmFyIHBhcnQgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFBhcnQpO1xuICAgICAgICAgIHZhciBrZXlWYWwgPSBwYXJ0LnNwbGl0KCcqJyk7XG4gICAgICAgICAgY29uc29sZS5hc3NlcnQoa2V5VmFsLmxlbmd0aCA9PT0gMik7XG4gICAgICAgICAgdmFyIGtleSA9IGtleVZhbFswXTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBrZXlWYWxbMV07XG5cbiAgICAgICAgICBpZiAoIXRoaXMuc2V0U3R5bGVfICYmIExlZ2FjeVByb3BlcnRpZXNfW2tleV0pIHtcbiAgICAgICAgICAgIGtleSA9IExlZ2FjeVByb3BlcnRpZXNfW2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmVhdHVyZS5zZXQoa2V5LCBjYXN0VmFsdWVfKGtleSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3BsaXRJbmRleCA+PSAwKSB7XG4gICAgICAgIHZhciBzdHlsZXNUZXh0ID0gYXR0cmlidXRlc0FuZFN0eWxlc1RleHQuc3Vic3RyaW5nKHNwbGl0SW5kZXggKyAxKTtcblxuICAgICAgICBpZiAodGhpcy5zZXRTdHlsZV8pIHtcbiAgICAgICAgICBzZXRTdHlsZUluRmVhdHVyZV8oc3R5bGVzVGV4dCwgZmVhdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0U3R5bGVQcm9wZXJ0aWVzXyhzdHlsZXNUZXh0LCBmZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmZWF0dXJlO1xuICB9O1xuXG4gIF9wcm90by5yZWFkRmVhdHVyZXNGcm9tVGV4dCA9IGZ1bmN0aW9uIHJlYWRGZWF0dXJlc0Zyb21UZXh0KHRleHQsIG9wdF9vcHRpb25zKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBjb25zb2xlLmFzc2VydCh0ZXh0LnN0YXJ0c1dpdGgoJ0YnKSk7XG4gICAgdGhpcy5wcmV2WF8gPSAwO1xuICAgIHRoaXMucHJldllfID0gMDtcbiAgICB2YXIgZmVhdHVyZXMgPSBbXTtcbiAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMSk7XG5cbiAgICB3aGlsZSAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgaW5kZXggPSB0ZXh0LmluZGV4T2YoJyknKTtcbiAgICAgIGNvbnNvbGUuYXNzZXJ0KGluZGV4ID49IDApO1xuICAgICAgdmFyIGZlYXR1cmUgPSB0aGlzLnJlYWRGZWF0dXJlRnJvbVRleHQodGV4dC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKSwgb3B0X29wdGlvbnMpO1xuICAgICAgZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZyhpbmRleCArIDEpO1xuICAgIH1cblxuICAgIGZlYXR1cmVzLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBfdGhpczIuZGVmYXVsdFZhbHVlc18pIHtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gTGVnYWN5UHJvcGVydGllc19ba2V5XTtcblxuICAgICAgICBpZiAoZmVhdHVyZS5nZXQocHJvcGVydHkpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmZWF0dXJlLnNldChwcm9wZXJ0eSwgX3RoaXMyLmRlZmF1bHRWYWx1ZXNfW2tleV0uY2FsbChudWxsLCBmZWF0dXJlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmVhdHVyZXM7XG4gIH07XG5cbiAgX3Byb3RvLnJlYWRHZW9tZXRyeUZyb21UZXh0ID0gZnVuY3Rpb24gcmVhZEdlb21ldHJ5RnJvbVRleHQodGV4dCwgb3B0X29wdGlvbnMpIHtcbiAgICB2YXIgZ2VvbWV0cnlSZWFkZXIgPSBHRU9NRVRSWV9SRUFERVJTX1t0ZXh0WzBdXTtcbiAgICBjb25zb2xlLmFzc2VydChnZW9tZXRyeVJlYWRlciAhPT0gdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gZ2VvbWV0cnlSZWFkZXIuY2FsbCh0aGlzLCB0ZXh0KTtcbiAgfTtcblxuICBfcHJvdG8ud3JpdGVGZWF0dXJlVGV4dCA9IGZ1bmN0aW9uIHdyaXRlRmVhdHVyZVRleHQoZmVhdHVyZSwgb3B0X29wdGlvbnMpIHtcbiAgICB2YXIgZW5jb2RlZFBhcnRzID0gW107XG4gICAgdmFyIGVuY29kZWRHZW9tZXRyeSA9ICcnO1xuICAgIHZhciBnZW9tZXRyeSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcblxuICAgIGlmIChnZW9tZXRyeSkge1xuICAgICAgZW5jb2RlZEdlb21ldHJ5ID0gdGhpcy53cml0ZUdlb21ldHJ5VGV4dChnZW9tZXRyeSwgb3B0X29wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChlbmNvZGVkR2VvbWV0cnkubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5hc3NlcnQoZW5jb2RlZEdlb21ldHJ5LmVuZHNXaXRoKCcpJykpO1xuICAgICAgZW5jb2RlZEdlb21ldHJ5ID0gZW5jb2RlZEdlb21ldHJ5LnN1YnN0cmluZygwLCBlbmNvZGVkR2VvbWV0cnkubGVuZ3RoIC0gMSk7XG4gICAgICBlbmNvZGVkUGFydHMucHVzaChlbmNvZGVkR2VvbWV0cnkpO1xuICAgIH1cblxuICAgIHZhciBlbmNvZGVkUHJvcGVydGllcyA9IFtdO1xuICAgIHZhciBwcm9wRnVuY3Rpb24gPSB0aGlzLnByb3BlcnRpZXNGdW5jdGlvbl8oZmVhdHVyZSk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcEZ1bmN0aW9uKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwcm9wRnVuY3Rpb25ba2V5XTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYga2V5ICE9PSBmZWF0dXJlLmdldEdlb21ldHJ5TmFtZSgpKSB7XG4gICAgICAgIGlmIChlbmNvZGVkUHJvcGVydGllcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBlbmNvZGVkUHJvcGVydGllcy5wdXNoKFwiJ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmNvZGVkID0gZW5jb2RlVVJJQ29tcG9uZW50KGtleS5yZXBsYWNlKC9bKCknKl0vZywgJ18nKSArIFwiKlwiICsgdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bKCknKl0vZywgJ18nKSk7XG4gICAgICAgIGVuY29kZWRQcm9wZXJ0aWVzLnB1c2goZW5jb2RlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVuY29kZWRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVuY29kZWRQYXJ0cy5wdXNoKCd+Jyk7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbmNvZGVkUGFydHMsIGVuY29kZWRQcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbmNvZGVTdHlsZXNfKSB7XG4gICAgICB2YXIgc3R5bGVGdW5jdGlvbiA9IGZlYXR1cmUuZ2V0U3R5bGVGdW5jdGlvbigpO1xuXG4gICAgICBpZiAoc3R5bGVGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBzdHlsZUZ1bmN0aW9uKGZlYXR1cmUsIDApO1xuXG4gICAgICAgIGlmIChzdHlsZXMgIT09IG51bGwpIHtcbiAgICAgICAgICB2YXIgZW5jb2RlZFN0eWxlcyA9IFtdO1xuICAgICAgICAgIHN0eWxlcyA9IEFycmF5LmlzQXJyYXkoc3R5bGVzKSA/IHN0eWxlcyA6IFtzdHlsZXNdO1xuXG4gICAgICAgICAgaWYgKCFnZW9tZXRyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdlb21ldHJ5Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW5jb2RlU3R5bGVzXyhzdHlsZXMsIGdlb21ldHJ5LmdldFR5cGUoKSwgZW5jb2RlZFN0eWxlcyk7XG5cbiAgICAgICAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbmNvZGVkUGFydHMucHVzaCgnficpO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW5jb2RlZFBhcnRzLCBlbmNvZGVkU3R5bGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbmNvZGVkUGFydHMucHVzaCgnKScpO1xuICAgIHJldHVybiBlbmNvZGVkUGFydHMuam9pbignJyk7XG4gIH07XG5cbiAgX3Byb3RvLndyaXRlRmVhdHVyZXNUZXh0ID0gZnVuY3Rpb24gd3JpdGVGZWF0dXJlc1RleHQoZmVhdHVyZXMsIG9wdF9vcHRpb25zKSB7XG4gICAgdGhpcy5wcmV2WF8gPSAwO1xuICAgIHRoaXMucHJldllfID0gMDtcbiAgICB2YXIgdGV4dEFycmF5ID0gW107XG5cbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGV4dEFycmF5LnB1c2goJ0YnKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gZmVhdHVyZXMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgICAgICB0ZXh0QXJyYXkucHVzaCh0aGlzLndyaXRlRmVhdHVyZVRleHQoZmVhdHVyZXNbaV0sIG9wdF9vcHRpb25zKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHRBcnJheS5qb2luKCcnKTtcbiAgfTtcblxuICBfcHJvdG8ud3JpdGVHZW9tZXRyeVRleHQgPSBmdW5jdGlvbiB3cml0ZUdlb21ldHJ5VGV4dChnZW9tZXRyeSwgb3B0X29wdGlvbnMpIHtcbiAgICB2YXIgZ2VvbWV0cnlXcml0ZXIgPSBHRU9NRVRSWV9XUklURVJTX1tnZW9tZXRyeS5nZXRUeXBlKCldO1xuICAgIGNvbnNvbGUuYXNzZXJ0KGdlb21ldHJ5V3JpdGVyICE9PSB1bmRlZmluZWQpO1xuICAgIHZhciB0cmFuc2Zvcm1lZEdlb21ldHJ5ID0gdHJhbnNmb3JtR2VvbWV0cnlXaXRoT3B0aW9ucyhnZW9tZXRyeSwgdHJ1ZSwgb3B0X29wdGlvbnMpO1xuXG4gICAgaWYgKCEodHJhbnNmb3JtZWRHZW9tZXRyeSBpbnN0YW5jZW9mIEdlb21ldHJ5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHRyYW5zZm9ybWVkR2VvbWV0cnknKTtcbiAgICB9XG5cbiAgICB2YXIgZW5jR2VvbSA9IGdlb21ldHJ5V3JpdGVyLmNhbGwodGhpcywgdHJhbnNmb3JtZWRHZW9tZXRyeSk7XG5cbiAgICBpZiAoIWVuY0dlb20pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbmNvZGVkR2VvbWV0cnknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5jR2VvbTtcbiAgfTtcblxuICByZXR1cm4gRmVhdHVyZUhhc2g7XG59KG9sRm9ybWF0VGV4dEZlYXR1cmUpO1xuXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlSGFzaDtcblxuZnVuY3Rpb24gZGVmYXVsdFByb3BlcnRpZXNGdW5jdGlvbl8oZmVhdHVyZSkge1xuICByZXR1cm4gZmVhdHVyZS5nZXRQcm9wZXJ0aWVzKCk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVNpZ25lZE51bWJlcl8obnVtKSB7XG4gIHZhciBzaWduZWROdW0gPSBudW0gPDwgMTtcblxuICBpZiAobnVtIDwgMCkge1xuICAgIHNpZ25lZE51bSA9IH5zaWduZWROdW07XG4gIH1cblxuICByZXR1cm4gZW5jb2RlTnVtYmVyXyhzaWduZWROdW0pO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVOdW1iZXJfKG51bSkge1xuICB2YXIgZW5jb2RlZE51bWJlciA9ICcnO1xuXG4gIHdoaWxlIChudW0gPj0gMHgyMCkge1xuICAgIGVuY29kZWROdW1iZXIgKz0gQ0hBUjY0Xy5jaGFyQXQoMHgyMCB8IG51bSAmIDB4MWYpO1xuICAgIG51bSA+Pj0gNTtcbiAgfVxuXG4gIGVuY29kZWROdW1iZXIgKz0gQ0hBUjY0Xy5jaGFyQXQobnVtKTtcbiAgcmV0dXJuIGVuY29kZWROdW1iZXI7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVN0eWxlc18oc3R5bGVzLCBnZW9tZXRyeVR5cGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgdmFyIHN0eWxlVHlwZSA9IFN0eWxlVHlwZXNfW2dlb21ldHJ5VHlwZV07XG4gIGNvbnNvbGUuYXNzZXJ0KHN0eWxlVHlwZSAhPT0gdW5kZWZpbmVkKTtcblxuICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShzdHlsZXMpLCBfc3RlcDI7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMigpKS5kb25lOykge1xuICAgIHZhciBzdHlsZSA9IF9zdGVwMi52YWx1ZTtcbiAgICB2YXIgZmlsbFN0eWxlID0gc3R5bGUuZ2V0RmlsbCgpO1xuICAgIHZhciBpbWFnZVN0eWxlID0gc3R5bGUuZ2V0SW1hZ2UoKTtcbiAgICB2YXIgc3Ryb2tlU3R5bGUgPSBzdHlsZS5nZXRTdHJva2UoKTtcbiAgICB2YXIgdGV4dFN0eWxlID0gc3R5bGUuZ2V0VGV4dCgpO1xuXG4gICAgaWYgKHN0eWxlVHlwZSA9PSBuZ2VvRm9ybWF0RmVhdHVyZUhhc2hTdHlsZVR5cGUuUE9MWUdPTikge1xuICAgICAgaWYgKGZpbGxTdHlsZSAhPT0gbnVsbCkge1xuICAgICAgICBlbmNvZGVTdHlsZVBvbHlnb25fKGZpbGxTdHlsZSwgc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3R5bGVUeXBlID09IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZS5MSU5FX1NUUklORykge1xuICAgICAgaWYgKHN0cm9rZVN0eWxlICE9PSBudWxsKSB7XG4gICAgICAgIGVuY29kZVN0eWxlTGluZV8oc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3R5bGVUeXBlID09IG5nZW9Gb3JtYXRGZWF0dXJlSGFzaFN0eWxlVHlwZS5QT0lOVCkge1xuICAgICAgaWYgKGltYWdlU3R5bGUgIT09IG51bGwpIHtcbiAgICAgICAgZW5jb2RlU3R5bGVQb2ludF8oaW1hZ2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRleHRTdHlsZSAhPT0gbnVsbCkge1xuICAgICAgZW5jb2RlU3R5bGVUZXh0Xyh0ZXh0U3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVTdHlsZUxpbmVfKHN0cm9rZVN0eWxlLCBlbmNvZGVkU3R5bGVzKSB7XG4gIGVuY29kZVN0eWxlU3Ryb2tlXyhzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZVN0eWxlUG9pbnRfKGltYWdlU3R5bGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgaWYgKGltYWdlU3R5bGUgaW5zdGFuY2VvZiBvbFN0eWxlQ2lyY2xlKSB7XG4gICAgdmFyIHJhZGl1cyA9IGltYWdlU3R5bGUuZ2V0UmFkaXVzKCk7XG5cbiAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlbmNvZGVkU3R5bGVzLnB1c2goXCInXCIpO1xuICAgIH1cblxuICAgIGVuY29kZWRTdHlsZXMucHVzaChlbmNvZGVVUklDb21wb25lbnQoXCJwb2ludFJhZGl1cypcIiArIHJhZGl1cykpO1xuICAgIHZhciBmaWxsU3R5bGUgPSBpbWFnZVN0eWxlLmdldEZpbGwoKTtcblxuICAgIGlmIChmaWxsU3R5bGUgIT09IG51bGwpIHtcbiAgICAgIGVuY29kZVN0eWxlRmlsbF8oZmlsbFN0eWxlLCBlbmNvZGVkU3R5bGVzKTtcbiAgICB9XG5cbiAgICB2YXIgc3Ryb2tlU3R5bGUgPSBpbWFnZVN0eWxlLmdldFN0cm9rZSgpO1xuXG4gICAgaWYgKHN0cm9rZVN0eWxlICE9PSBudWxsKSB7XG4gICAgICBlbmNvZGVTdHlsZVN0cm9rZV8oc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVTdHlsZVBvbHlnb25fKGZpbGxTdHlsZSwgc3Ryb2tlU3R5bGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgZW5jb2RlU3R5bGVGaWxsXyhmaWxsU3R5bGUsIGVuY29kZWRTdHlsZXMpO1xuXG4gIGlmIChzdHJva2VTdHlsZSAhPT0gbnVsbCkge1xuICAgIGVuY29kZVN0eWxlU3Ryb2tlXyhzdHJva2VTdHlsZSwgZW5jb2RlZFN0eWxlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlU3R5bGVGaWxsXyhmaWxsU3R5bGUsIGVuY29kZWRTdHlsZXMsIHByb3BlcnR5TmFtZSkge1xuICBpZiAocHJvcGVydHlOYW1lID09PSB2b2lkIDApIHtcbiAgICBwcm9wZXJ0eU5hbWUgPSAnZmlsbENvbG9yJztcbiAgfVxuXG4gIHZhciBmaWxsQ29sb3IgPSBmaWxsU3R5bGUuZ2V0Q29sb3IoKTtcbiAgdmFyIGZpbGxDb2xvckhleDtcblxuICBpZiAoZmlsbENvbG9yICE9PSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsbENvbG9yKSkge1xuICAgICAgZmlsbENvbG9ySGV4ID0gcmdiQXJyYXlUb0hleChmaWxsQ29sb3IpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbGxDb2xvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpbGxDb2xvckhleCA9IHJnYkFycmF5VG9IZXgoYXNDb2xvckFycmF5KGZpbGxDb2xvcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGNvbG9yJyk7XG4gICAgfVxuXG4gICAgaWYgKGVuY29kZWRTdHlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgZW5jb2RlZFN0eWxlcy5wdXNoKFwiJ1wiKTtcbiAgICB9XG5cbiAgICBlbmNvZGVkU3R5bGVzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHByb3BlcnR5TmFtZSArIFwiKlwiICsgZmlsbENvbG9ySGV4KSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlU3R5bGVTdHJva2VfKHN0cm9rZVN0eWxlLCBlbmNvZGVkU3R5bGVzKSB7XG4gIHZhciBzdHJva2VDb2xvciA9IHN0cm9rZVN0eWxlLmdldENvbG9yKCk7XG5cbiAgaWYgKHN0cm9rZUNvbG9yICE9PSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Ryb2tlQ29sb3IpKSB7XG4gICAgICB2YXIgc3Ryb2tlQ29sb3JIZXggPSByZ2JBcnJheVRvSGV4KHN0cm9rZUNvbG9yKTtcblxuICAgICAgaWYgKGVuY29kZWRTdHlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbmNvZGVkU3R5bGVzLnB1c2goXCInXCIpO1xuICAgICAgfVxuXG4gICAgICBlbmNvZGVkU3R5bGVzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KFwic3Ryb2tlQ29sb3IqXCIgKyBzdHJva2VDb2xvckhleCkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzdHJva2VXaWR0aCA9IHN0cm9rZVN0eWxlLmdldFdpZHRoKCk7XG5cbiAgaWYgKHN0cm9rZVdpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlbmNvZGVkU3R5bGVzLnB1c2goXCInXCIpO1xuICAgIH1cblxuICAgIGVuY29kZWRTdHlsZXMucHVzaChlbmNvZGVVUklDb21wb25lbnQoXCJzdHJva2VXaWR0aCpcIiArIHN0cm9rZVdpZHRoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlU3R5bGVUZXh0Xyh0ZXh0U3R5bGUsIGVuY29kZWRTdHlsZXMpIHtcbiAgdmFyIGZvbnRTdHlsZSA9IHRleHRTdHlsZS5nZXRGb250KCk7XG5cbiAgaWYgKGZvbnRTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZvbnQgPSBmb250U3R5bGUuc3BsaXQoJyAnKTtcblxuICAgIGlmIChmb250Lmxlbmd0aCA+PSAzKSB7XG4gICAgICBpZiAoZW5jb2RlZFN0eWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVuY29kZWRTdHlsZXMucHVzaChcIidcIik7XG4gICAgICB9XG5cbiAgICAgIGVuY29kZWRTdHlsZXMucHVzaChlbmNvZGVVUklDb21wb25lbnQoXCJmb250U2l6ZSpcIiArIGZvbnRbMV0pKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZmlsbFN0eWxlID0gdGV4dFN0eWxlLmdldEZpbGwoKTtcblxuICBpZiAoZmlsbFN0eWxlICE9PSBudWxsKSB7XG4gICAgZW5jb2RlU3R5bGVGaWxsXyhmaWxsU3R5bGUsIGVuY29kZWRTdHlsZXMsICdmb250Q29sb3InKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkTGluZVN0cmluZ0dlb21ldHJ5Xyh0ZXh0KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuc3RhcnRzV2l0aCgnbCgnKSk7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuZW5kc1dpdGgoJyknKSk7XG4gIHRleHQgPSB0ZXh0LnN1YnN0cmluZygyLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICB2YXIgZmxhdENvb3JkaW5hdGVzID0gdGhpcy5kZWNvZGVDb29yZGluYXRlc18odGV4dCk7XG4gIHJldHVybiBuZXcgb2xHZW9tTGluZVN0cmluZyhmbGF0Q29vcmRpbmF0ZXMsIG9sR2VvbUdlb21ldHJ5TGF5b3V0LlhZKTtcbn1cblxuZnVuY3Rpb24gcmVhZE11bHRpTGluZVN0cmluZ0dlb21ldHJ5Xyh0ZXh0KSB7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuc3RhcnRzV2l0aCgnTCgnKSk7XG4gIGNvbnNvbGUuYXNzZXJ0KHRleHQuZW5kc1dpdGgoJyknKSk7XG4gIHRleHQgPSB0ZXh0LnN1YnN0cmluZygyLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICB2YXIgZmxhdENvb3JkaW5hdGVzID0gW107XG4gIHZhciBlbmRzID0gW107XG4gIHZhciBsaW5lU3RyaW5ncyA9IHRleHQuc3BsaXQoXCInXCIpO1xuXG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IGxpbmVTdHJpbmdzLmxlbmd0aDsgaSA8IGlpOyArK2kpIHtcbiAgICBmbGF0Q29vcmRpbmF0ZXMgPSB0aGlzLmRlY29kZUNvb3JkaW5hdGVzXyhsaW5lU3RyaW5nc1tpXSwgZmxhdENvb3JkaW5hdGVzKTtcbiAgICBlbmRzW2ldID0gZmxhdENvb3JkaW5hdGVzLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBuZXcgb2xHZW9tTXVsdGlMaW5lU3RyaW5nKGZsYXRDb29yZGluYXRlcywgb2xHZW9tR2VvbWV0cnlMYXlvdXQuWFksIGVuZHMpO1xufVxuXG5mdW5jdGlvbiByZWFkUG9pbnRHZW9tZXRyeV8odGV4dCkge1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LnN0YXJ0c1dpdGgoJ3AoJykpO1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LmVuZHNXaXRoKCcpJykpO1xuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMiwgdGV4dC5sZW5ndGggLSAxKTtcbiAgdmFyIGZsYXRDb29yZGluYXRlcyA9IHRoaXMuZGVjb2RlQ29vcmRpbmF0ZXNfKHRleHQpO1xuICBjb25zb2xlLmFzc2VydChmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoID09PSAyKTtcbiAgcmV0dXJuIG5ldyBvbEdlb21Qb2ludChmbGF0Q29vcmRpbmF0ZXMsIG9sR2VvbUdlb21ldHJ5TGF5b3V0LlhZKTtcbn1cblxuZnVuY3Rpb24gcmVhZE11bHRpUG9pbnRHZW9tZXRyeV8odGV4dCkge1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LnN0YXJ0c1dpdGgoJ1AoJykpO1xuICBjb25zb2xlLmFzc2VydCh0ZXh0LmVuZHNXaXRoKCcpJykpO1xuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMiwgdGV4dC5sZW5ndGggLSAxKTtcbiAgdmFyIGZsYXRDb29yZGluYXRlcyA9IHRoaXMuZGVjb2RlQ29vcmRpbmF0ZXNfKHRleHQpO1xuICByZXR1cm4gbmV3IG9sR2VvbU11bHRpUG9pbnQoZmxhdENvb3JkaW5hdGVzLCBvbEdlb21HZW9tZXRyeUxheW91dC5YWSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRQb2x5Z29uR2VvbWV0cnlfKHRleHQpIHtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5zdGFydHNXaXRoKCdhKCcpKTtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5lbmRzV2l0aCgnKScpKTtcbiAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDIsIHRleHQubGVuZ3RoIC0gMSk7XG4gIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBbXTtcbiAgdmFyIGVuZHMgPSBbXTtcbiAgdmFyIHJpbmdzID0gdGV4dC5zcGxpdChcIidcIik7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGlpID0gcmluZ3MubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgIGZsYXRDb29yZGluYXRlcyA9IHRoaXMuZGVjb2RlQ29vcmRpbmF0ZXNfKHJpbmdzW2ldLCBmbGF0Q29vcmRpbmF0ZXMpO1xuICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIGZsYXRDb29yZGluYXRlc1tlbmQrK10gPSBmbGF0Q29vcmRpbmF0ZXNbMF07XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzW2VuZHNbaSAtIDFdXTtcbiAgICAgIGZsYXRDb29yZGluYXRlc1tlbmQrK10gPSBmbGF0Q29vcmRpbmF0ZXNbZW5kc1tpIC0gMV0gKyAxXTtcbiAgICB9XG5cbiAgICBlbmRzW2ldID0gZW5kO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBvbEdlb21Qb2x5Z29uKGZsYXRDb29yZGluYXRlcywgb2xHZW9tR2VvbWV0cnlMYXlvdXQuWFksIGVuZHMpO1xufVxuXG5mdW5jdGlvbiByZWFkTXVsdGlQb2x5Z29uR2VvbWV0cnlfKHRleHQpIHtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5zdGFydHNXaXRoKCdBKCcpKTtcbiAgY29uc29sZS5hc3NlcnQodGV4dC5lbmRzV2l0aCgnKScpKTtcbiAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDIsIHRleHQubGVuZ3RoIC0gMSk7XG4gIHZhciBmbGF0Q29vcmRpbmF0ZXMgPSBbXTtcbiAgdmFyIGVuZHNzID0gW107XG4gIHZhciBwb2x5Z29ucyA9IHRleHQuc3BsaXQoJykoJyk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGlpID0gcG9seWdvbnMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgIHZhciByaW5ncyA9IHBvbHlnb25zW2ldLnNwbGl0KFwiJ1wiKTtcbiAgICBlbmRzc1tpXSA9IFtdO1xuICAgIHZhciBlbmRzID0gZW5kc3NbaV07XG5cbiAgICBmb3IgKHZhciBqID0gMCwgamogPSByaW5ncy5sZW5ndGg7IGogPCBqajsgKytqKSB7XG4gICAgICBmbGF0Q29vcmRpbmF0ZXMgPSB0aGlzLmRlY29kZUNvb3JkaW5hdGVzXyhyaW5nc1tqXSwgZmxhdENvb3JkaW5hdGVzKTtcbiAgICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuXG4gICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzBdO1xuICAgICAgICBmbGF0Q29vcmRpbmF0ZXNbZW5kKytdID0gZmxhdENvb3JkaW5hdGVzWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmxhdENvb3JkaW5hdGVzW2VuZCsrXSA9IGZsYXRDb29yZGluYXRlc1tlbmRzW2ogLSAxXV07XG4gICAgICAgIGZsYXRDb29yZGluYXRlc1tlbmQrK10gPSBmbGF0Q29vcmRpbmF0ZXNbZW5kc1tqIC0gMV0gKyAxXTtcbiAgICAgIH1cblxuICAgICAgZW5kc1tqXSA9IGVuZDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IG9sR2VvbU11bHRpUG9seWdvbihmbGF0Q29vcmRpbmF0ZXMsIG9sR2VvbUdlb21ldHJ5TGF5b3V0LlhZLCBlbmRzcyk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlSW5GZWF0dXJlXyh0ZXh0LCBmZWF0dXJlKSB7XG4gIGlmICh0ZXh0ID09ICcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHByb3BlcnRpZXMgPSBnZXRTdHlsZVByb3BlcnRpZXNfKHRleHQsIGZlYXR1cmUpO1xuICB2YXIgZmlsbENvbG9yID0gcHJvcGVydGllcy5maWxsQ29sb3I7XG4gIHZhciBmb250U2l6ZSA9IHByb3BlcnRpZXMuZm9udFNpemU7XG4gIHZhciBmb250Q29sb3IgPSBwcm9wZXJ0aWVzLmZvbnRDb2xvcjtcbiAgdmFyIHBvaW50UmFkaXVzID0gcHJvcGVydGllcy5wb2ludFJhZGl1cztcbiAgdmFyIHN0cm9rZUNvbG9yID0gcHJvcGVydGllcy5zdHJva2VDb2xvcjtcbiAgdmFyIHN0cm9rZVdpZHRoID0gcHJvcGVydGllcy5zdHJva2VXaWR0aDtcbiAgdmFyIGZpbGxTdHlsZSA9IG51bGw7XG5cbiAgaWYgKGZpbGxDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZmlsbFN0eWxlID0gbmV3IG9sU3R5bGVGaWxsKHtcbiAgICAgIGNvbG9yOiBmaWxsQ29sb3JcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzdHJva2VTdHlsZSA9IG51bGw7XG5cbiAgaWYgKHN0cm9rZUNvbG9yICE9PSB1bmRlZmluZWQgJiYgc3Ryb2tlV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2Ygc3Ryb2tlV2lkdGggIT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzdHJva2VXaWR0aCcpO1xuICAgIH1cblxuICAgIHN0cm9rZVN0eWxlID0gbmV3IG9sU3R5bGVTdHJva2Uoe1xuICAgICAgY29sb3I6IHN0cm9rZUNvbG9yLFxuICAgICAgd2lkdGg6IHN0cm9rZVdpZHRoXG4gICAgfSk7XG4gIH1cblxuICB2YXIgaW1hZ2VTdHlsZSA9IG51bGw7XG5cbiAgaWYgKHBvaW50UmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIHBvaW50UmFkaXVzICE9ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcG9pbnRSYWRpdXMnKTtcbiAgICB9XG5cbiAgICB2YXIgX29wdGlvbnMgPSB7XG4gICAgICByYWRpdXM6IHBvaW50UmFkaXVzXG4gICAgfTtcblxuICAgIGlmIChmaWxsU3R5bGUpIHtcbiAgICAgIF9vcHRpb25zLmZpbGwgPSBmaWxsU3R5bGU7XG4gICAgfVxuXG4gICAgaWYgKHN0cm9rZVN0eWxlKSB7XG4gICAgICBfb3B0aW9ucy5zdHJva2UgPSBzdHJva2VTdHlsZTtcbiAgICB9XG5cbiAgICBpbWFnZVN0eWxlID0gbmV3IG9sU3R5bGVDaXJjbGUoX29wdGlvbnMpO1xuICAgIGZpbGxTdHlsZSA9IG51bGw7XG4gICAgc3Ryb2tlU3R5bGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIHRleHRTdHlsZSA9IG51bGw7XG5cbiAgaWYgKGZvbnRTaXplICE9PSB1bmRlZmluZWQgJiYgZm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICB0ZXh0U3R5bGUgPSBuZXcgb2xTdHlsZVRleHQoe1xuICAgICAgZm9udDogZm9udFNpemUgKyBcIiBzYW5zLXNlcmlmXCIsXG4gICAgICBmaWxsOiBuZXcgb2xTdHlsZUZpbGwoe1xuICAgICAgICBjb2xvcjogZm9udENvbG9yXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICBpZiAoZmlsbFN0eWxlKSB7XG4gICAgb3B0aW9ucy5maWxsID0gZmlsbFN0eWxlO1xuICB9XG5cbiAgaWYgKHN0cm9rZVN0eWxlKSB7XG4gICAgb3B0aW9ucy5zdHJva2UgPSBzdHJva2VTdHlsZTtcbiAgfVxuXG4gIGlmIChpbWFnZVN0eWxlKSB7XG4gICAgb3B0aW9ucy5pbWFnZSA9IGltYWdlU3R5bGU7XG4gIH1cblxuICBpZiAodGV4dFN0eWxlKSB7XG4gICAgb3B0aW9ucy50ZXh0ID0gdGV4dFN0eWxlO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gbmV3IG9sU3R5bGVTdHlsZShvcHRpb25zKTtcbiAgZmVhdHVyZS5zZXRTdHlsZShzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlUHJvcGVydGllc18odGV4dCwgZmVhdHVyZSkge1xuICB2YXIgcHJvcGVydGllcyA9IGdldFN0eWxlUHJvcGVydGllc18odGV4dCwgZmVhdHVyZSk7XG4gIHZhciBnZW9tZXRyeSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcblxuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21Qb2ludCkge1xuICAgIGlmIChwcm9wZXJ0aWVzLmlzTGFiZWwgfHwgcHJvcGVydGllc1tuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfVEVYVF0pIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLnN0cm9rZUNvbG9yO1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXMuZmlsbENvbG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgcHJvcGVydGllcy5mb250Q29sb3I7XG4gICAgICBkZWxldGUgcHJvcGVydGllcy5mb250U2l6ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHByb3BlcnRpZXMuZm9udENvbG9yO1xuXG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tTGluZVN0cmluZykge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXMuZmlsbENvbG9yO1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXMuZmlsbE9wYWNpdHk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3BlcnRpZXMuZm9udFNpemUpIHtcbiAgICB2YXIgZm9udFNpemVTdHIgPSBwcm9wZXJ0aWVzLmZvbnRTaXplO1xuXG4gICAgaWYgKHR5cGVvZiBmb250U2l6ZVN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZm9udFNpemVTdHIgdHlwZScpO1xuICAgIH1cblxuICAgIHZhciBmb250U2l6ZSA9IHBhcnNlRmxvYXQoZm9udFNpemVTdHIpO1xuXG4gICAgaWYgKGZvbnRTaXplU3RyLmluY2x1ZGVzKCdweCcpKSB7XG4gICAgICBmb250U2l6ZSA9IE1hdGgucm91bmQoZm9udFNpemUgLyAxLjMzMzMzMyk7XG4gICAgfVxuXG4gICAgcHJvcGVydGllcy5mb250U2l6ZSA9IGZvbnRTaXplO1xuICB9XG5cbiAgdmFyIGNsb25lID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9wZXJ0aWVzW2tleV07XG5cbiAgICBpZiAoTGVnYWN5UHJvcGVydGllc19ba2V5XSkge1xuICAgICAgY2xvbmVbTGVnYWN5UHJvcGVydGllc19ba2V5XV0gPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvbmVba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZlYXR1cmUuc2V0UHJvcGVydGllcyhjbG9uZSk7XG59XG5cbmZ1bmN0aW9uIGNhc3RWYWx1ZV8oa2V5LCB2YWx1ZSkge1xuICB2YXIgbnVtUHJvcGVydGllcyA9IFtuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuQU5HTEUsIG5nZW9Gb3JtYXRGZWF0dXJlUHJvcGVydGllcy5PUEFDSVRZLCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuU0laRSwgbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNUUk9LRSwgJ3BvaW50UmFkaXVzJywgJ3N0cm9rZVdpZHRoJ107XG4gIHZhciBib29sUHJvcGVydGllcyA9IFtuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfQ0lSQ0xFLCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfUkVDVEFOR0xFLCBuZ2VvRm9ybWF0RmVhdHVyZVByb3BlcnRpZXMuSVNfVEVYVCwgbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNIT1dfTUVBU1VSRSwgbmdlb0Zvcm1hdEZlYXR1cmVQcm9wZXJ0aWVzLlNIT1dfTEFCRUwsICdpc0NpcmNsZScsICdpc1JlY3RhbmdsZScsICdpc0xhYmVsJywgJ3Nob3dNZWFzdXJlJywgJ3Nob3dMYWJlbCddO1xuXG4gIGlmIChudW1Qcm9wZXJ0aWVzLmluY2x1ZGVzKGtleSkpIHtcbiAgICByZXR1cm4gK3ZhbHVlO1xuICB9IGVsc2UgaWYgKGJvb2xQcm9wZXJ0aWVzLmluY2x1ZGVzKGtleSkpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3R5bGVQcm9wZXJ0aWVzXyh0ZXh0LCBmZWF0dXJlKSB7XG4gIHZhciBwYXJ0cyA9IHRleHQuc3BsaXQoXCInXCIpO1xuICB2YXIgcHJvcGVydGllcyA9IHt9O1xuXG4gIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHBhcnRzKSwgX3N0ZXAzOyAhKF9zdGVwMyA9IF9pdGVyYXRvcjMoKSkuZG9uZTspIHtcbiAgICB2YXIgZW5jb2RlZFBhcnQgPSBfc3RlcDMudmFsdWU7XG4gICAgdmFyIHBhcnQgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFBhcnQpO1xuICAgIHZhciBrZXlWYWwgPSBwYXJ0LnNwbGl0KCcqJyk7XG4gICAgY29uc29sZS5hc3NlcnQoa2V5VmFsLmxlbmd0aCA9PT0gMik7XG4gICAgdmFyIGtleSA9IGtleVZhbFswXTtcbiAgICB2YXIgdmFsID0ga2V5VmFsWzFdO1xuICAgIHByb3BlcnRpZXNba2V5XSA9IGNhc3RWYWx1ZV8oa2V5LCB2YWwpO1xuICB9XG5cbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIHdyaXRlTGluZVN0cmluZ0dlb21ldHJ5XyhnZW9tZXRyeSkge1xuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21MaW5lU3RyaW5nKSB7XG4gICAgdmFyIGZsYXRDb29yZGluYXRlcyA9IGdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpO1xuICAgIHZhciBzdHJpZGUgPSBnZW9tZXRyeS5nZXRTdHJpZGUoKTtcbiAgICB2YXIgZW5kID0gZmxhdENvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICByZXR1cm4gXCJsKFwiICsgdGhpcy5lbmNvZGVDb29yZGluYXRlc18oZmxhdENvb3JkaW5hdGVzLCBzdHJpZGUsIDAsIGVuZCkgKyBcIilcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB3cml0ZU11bHRpTGluZVN0cmluZ0dlb21ldHJ5XyhnZW9tZXRyeSkge1xuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21NdWx0aUxpbmVTdHJpbmcpIHtcbiAgICB2YXIgZW5kcyA9IGdlb21ldHJ5LmdldEVuZHMoKTtcbiAgICB2YXIgbGluZVN0cmluZ0NvdW50ID0gZW5kcy5sZW5ndGg7XG4gICAgdmFyIGZsYXRDb29yZGluYXRlcyA9IGdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpO1xuICAgIHZhciBzdHJpZGUgPSBnZW9tZXRyeS5nZXRTdHJpZGUoKTtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICB2YXIgdGV4dEFycmF5ID0gWydMKCddO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lU3RyaW5nQ291bnQ7ICsraSkge1xuICAgICAgdmFyIGVuZCA9IGVuZHNbaV07XG4gICAgICB2YXIgdGV4dCA9IHRoaXMuZW5jb2RlQ29vcmRpbmF0ZXNfKGZsYXRDb29yZGluYXRlcywgc3RyaWRlLCBvZmZzZXQsIGVuZCk7XG5cbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIHRleHRBcnJheS5wdXNoKFwiJ1wiKTtcbiAgICAgIH1cblxuICAgICAgdGV4dEFycmF5LnB1c2godGV4dCk7XG4gICAgICBvZmZzZXQgPSBlbmQ7XG4gICAgfVxuXG4gICAgdGV4dEFycmF5LnB1c2goJyknKTtcbiAgICByZXR1cm4gdGV4dEFycmF5LmpvaW4oJycpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHdyaXRlUG9pbnRHZW9tZXRyeV8oZ2VvbWV0cnkpIHtcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9pbnQpIHtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBlbmQgPSBmbGF0Q29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgIHJldHVybiBcInAoXCIgKyB0aGlzLmVuY29kZUNvb3JkaW5hdGVzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgMCwgZW5kKSArIFwiKVwiO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHdyaXRlTXVsdGlQb2ludEdlb21ldHJ5XyhnZW9tZXRyeSkge1xuICBpZiAoZ2VvbWV0cnkgaW5zdGFuY2VvZiBvbEdlb21NdWx0aVBvaW50KSB7XG4gICAgdmFyIGZsYXRDb29yZGluYXRlcyA9IGdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpO1xuICAgIHZhciBzdHJpZGUgPSBnZW9tZXRyeS5nZXRTdHJpZGUoKTtcbiAgICB2YXIgZW5kID0gZmxhdENvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICByZXR1cm4gXCJQKFwiICsgdGhpcy5lbmNvZGVDb29yZGluYXRlc18oZmxhdENvb3JkaW5hdGVzLCBzdHJpZGUsIDAsIGVuZCkgKyBcIilcIjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVSaW5nc18oZmxhdENvb3JkaW5hdGVzLCBzdHJpZGUsIG9mZnNldCwgZW5kcywgdGV4dEFycmF5KSB7XG4gIHZhciBsaW5lYXJSaW5nQ291bnQgPSBlbmRzLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVhclJpbmdDb3VudDsgKytpKSB7XG4gICAgdmFyIGVuZCA9IGVuZHNbaV0gLSBzdHJpZGU7XG4gICAgdmFyIHRleHQgPSB0aGlzLmVuY29kZUNvb3JkaW5hdGVzXyhmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgb2Zmc2V0LCBlbmQpO1xuXG4gICAgaWYgKGkgIT09IDApIHtcbiAgICAgIHRleHRBcnJheS5wdXNoKFwiJ1wiKTtcbiAgICB9XG5cbiAgICB0ZXh0QXJyYXkucHVzaCh0ZXh0KTtcbiAgICBvZmZzZXQgPSBlbmRzW2ldO1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldDtcbn1cblxuZnVuY3Rpb24gd3JpdGVQb2x5Z29uR2VvbWV0cnlfKGdlb21ldHJ5KSB7XG4gIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIG9sR2VvbVBvbHlnb24pIHtcbiAgICB2YXIgZmxhdENvb3JkaW5hdGVzID0gZ2VvbWV0cnkuZ2V0RmxhdENvb3JkaW5hdGVzKCk7XG4gICAgdmFyIHN0cmlkZSA9IGdlb21ldHJ5LmdldFN0cmlkZSgpO1xuICAgIHZhciBlbmRzID0gZ2VvbWV0cnkuZ2V0RW5kcygpO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciB0ZXh0QXJyYXkgPSBbJ2EoJ107XG4gICAgZW5jb2RlUmluZ3NfLmNhbGwodGhpcywgZmxhdENvb3JkaW5hdGVzLCBzdHJpZGUsIG9mZnNldCwgZW5kcywgdGV4dEFycmF5KTtcbiAgICB0ZXh0QXJyYXkucHVzaCgnKScpO1xuICAgIHJldHVybiB0ZXh0QXJyYXkuam9pbignJyk7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gd3JpdGVNdWx0aVBvbHlnb25HZW9tZXRyeV8oZ2VvbWV0cnkpIHtcbiAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tTXVsdGlQb2x5Z29uKSB7XG4gICAgdmFyIGZsYXRDb29yZGluYXRlcyA9IGdlb21ldHJ5LmdldEZsYXRDb29yZGluYXRlcygpO1xuICAgIHZhciBzdHJpZGUgPSBnZW9tZXRyeS5nZXRTdHJpZGUoKTtcbiAgICB2YXIgZW5kc3MgPSBnZW9tZXRyeS5nZXRFbmRzcygpO1xuICAgIHZhciBwb2x5Z29uQ291bnQgPSBlbmRzcy5sZW5ndGg7XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIHRleHRBcnJheSA9IFsnQSddO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2x5Z29uQ291bnQ7ICsraSkge1xuICAgICAgdmFyIGVuZHMgPSBlbmRzc1tpXTtcbiAgICAgIHRleHRBcnJheS5wdXNoKCcoJyk7XG4gICAgICBvZmZzZXQgPSBlbmNvZGVSaW5nc18uY2FsbCh0aGlzLCBmbGF0Q29vcmRpbmF0ZXMsIHN0cmlkZSwgb2Zmc2V0LCBlbmRzLCB0ZXh0QXJyYXkpO1xuICAgICAgdGV4dEFycmF5LnB1c2goJyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dEFycmF5LmpvaW4oJycpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgZ2VvbWV0cnkgdHlwZScpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQge1xuICBMSU5FX1NUUklORzogJ0xpbmVTdHJpbmcnLFxuICBQT0lOVDogJ1BvaW50JyxcbiAgUE9MWUdPTjogJ1BvbHlnb24nXG59OyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuMkJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==