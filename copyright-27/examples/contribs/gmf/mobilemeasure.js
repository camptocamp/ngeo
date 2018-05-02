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
/******/ 		"mobilemeasure": 0
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
/******/ 	deferredModules.push([11,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./contribs/gmf/examples/mobilemeasure.css":
/*!*************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./contribs/gmf/examples/mobilemeasure.js":
/*!************************************************!*\
  !*** ./contribs/gmf/examples/mobilemeasure.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mobilemeasure.css */ "./contribs/gmf/examples/mobilemeasure.css");
/* harmony import */ var _mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mobilemeasure_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gmf_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gmf/map/component */ "./src/map/component.js");
/* harmony import */ var gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/permalink/Permalink */ "./src/permalink/Permalink.js");
/* harmony import */ var gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gmf/mobile/measure/areaComponent */ "./src/mobile/measure/areaComponent.js");
/* harmony import */ var gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gmf/mobile/measure/lengthComponent */ "./src/mobile/measure/lengthComponent.js");
/* harmony import */ var gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gmf/mobile/measure/pointComponent */ "./src/mobile/measure/pointComponent.js");
/* harmony import */ var ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/misc/btnComponent */ "./src/misc/btnComponent.js");
/* harmony import */ var ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngeo/proj/EPSG_2056 */ "./src/proj/EPSG_2056.js");
/* harmony import */ var ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module */ "./src/map/module.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/layer/Tile */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/OSM */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./options */ "./contribs/gmf/examples/options.js");
MainController.$inject = ["gmfPermalink"];
















var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfapp', ['gettext', gmf_map_component__WEBPACK_IMPORTED_MODULE_2__["default"].name, gmf_permalink_Permalink__WEBPACK_IMPORTED_MODULE_3__["default"].name, gmf_mobile_measure_areaComponent__WEBPACK_IMPORTED_MODULE_4__["default"].name, gmf_mobile_measure_lengthComponent__WEBPACK_IMPORTED_MODULE_5__["default"].name, gmf_mobile_measure_pointComponent__WEBPACK_IMPORTED_MODULE_6__["default"].name, ngeo_misc_btnComponent__WEBPACK_IMPORTED_MODULE_7__["default"].name, ngeo_map_module__WEBPACK_IMPORTED_MODULE_9__["default"].name]);
function MainController(gmfPermalink) {
  var center = gmfPermalink.getMapCenter() || [537635, 152640];
  var zoom = gmfPermalink.getMapZoom() || 3;
  this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_10__["default"]({
    layers: [new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_13__["default"]({
      source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_14__["default"]()
    })],
    view: new ol_View__WEBPACK_IMPORTED_MODULE_11__["default"]({
      projection: ngeo_proj_EPSG_2056__WEBPACK_IMPORTED_MODULE_8__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1, 0.5],
      center: center,
      zoom: zoom
    })
  });
  this.map.addControl(new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_12__["default"]({
    dpi: 96
  }));
  this.measureAreaActive = false;
  this.measureLengthActive = false;
  this.measurePointActive = false;
}
myModule.controller('MainController', MainController);
var sketchStyle = {
  fill: {
    color: 'rgba(255, 255, 255, 0.2)'
  },
  stroke: {
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2
  },
  regularShape: {
    stroke: {
      color: 'rgba(0, 0, 0, 0.7)',
      width: 2
    },
    points: 4,
    radius: 8,
    radius2: 0,
    angle: 0
  }
};
myModule.constant('gmfMobileMeasurePointOptions', {
  sketchStyle: sketchStyle,
  decimals: 2,
  format: '{x}, {y}',
  rasterLayers: [{
    name: 'aster',
    unit: 'm',
    decimals: 2
  }, {
    name: 'srtm',
    unit: 'm'
  }]
});
myModule.constant('gmfMobileMeasureLengthOptions', {
  sketchStyle: sketchStyle
});
myModule.constant('gmfMobileMeasureAreaOptions', {
  sketchStyle: sketchStyle
});
Object(_options__WEBPACK_IMPORTED_MODULE_15__["default"])(myModule);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./node_modules/ol/control/ScaleLine.js":
/*!**********************************************************************************!*\
  !*** delegated ./node_modules/ol/control/ScaleLine.js from dll-reference vendor ***!
  \**********************************************************************************/
/*! exports provided: Units, default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(741);

/***/ }),

/***/ "./src/interaction/MeasureAreaMobile.js":
/*!**********************************************!*\
  !*** ./src/interaction/MeasureAreaMobile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureArea */ "./src/interaction/MeasureArea.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var MeasureAreaMobile = function (_ngeoInteractionMeasu) {
  function MeasureAreaMobile(format, gettextCatalog, options) {
    if (options === void 0) {
      options = {};
    }
    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }
  _inheritsLoose(MeasureAreaMobile, _ngeoInteractionMeasu);
  var _proto = MeasureAreaMobile.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Polygon',
      style: style
    });
  };
  return MeasureAreaMobile;
}(ngeo_interaction_MeasureArea__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (MeasureAreaMobile);

/***/ }),

/***/ "./src/interaction/MeasureLengthMobile.js":
/*!************************************************!*\
  !*** ./src/interaction/MeasureLengthMobile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/MeasureLength */ "./src/interaction/MeasureLength.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var _default = function (_ngeoInteractionMeasu) {
  function _default(format, gettextCatalog, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Object.assign(options, {
      displayHelpTooltip: false
    });
    return _ngeoInteractionMeasu.call(this, format, gettextCatalog, options) || this;
  }
  _inheritsLoose(_default, _ngeoInteractionMeasu);
  var _proto = _default.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'LineString',
      style: style
    });
  };
  return _default;
}(ngeo_interaction_MeasureLength__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/interaction/MeasurePointMobile.js":
/*!***********************************************!*\
  !*** ./src/interaction/MeasurePointMobile.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/Measure */ "./src/interaction/Measure.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var _default = function (_ngeoInteractionMeasu) {
  function _default(format, coordFormat, options) {
    var _this;
    if (options === void 0) {
      options = {};
    }
    Object.assign(options, {
      displayHelpTooltip: false
    });
    _this = _ngeoInteractionMeasu.call(this, options) || this;
    _this.format_ = format;
    _this.coordFormat_ = coordFormat;
    return _this;
  }
  _inheritsLoose(_default, _ngeoInteractionMeasu);
  var _proto = _default.prototype;
  _proto.createDrawInteraction = function createDrawInteraction(style, source) {
    return new ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_1__["default"]({
      type: 'Point',
      style: style
    });
  };
  _proto.handleMeasure = function handleMeasure(callback) {
    if (!this.sketchFeature) {
      throw new Error('Missing sketchFeature');
    }
    var geom = this.sketchFeature.getGeometry();
    if (!(geom instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      throw new Error('Missing geometry');
    }
    var dec = this.decimals;
    var output = Object(ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__["getFormattedPoint"])(geom, dec, this.format_, this.coordFormat_);
    var coord = geom.getLastCoordinate();
    callback(output, coord);
  };
  return _default;
}(ngeo_interaction_Measure__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/interaction/MobileDraw.js":
/*!***************************************!*\
  !*** ./src/interaction/MobileDraw.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngeo/interaction/common */ "./src/interaction/common.js");
/* harmony import */ var ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/CustomEvent */ "./src/CustomEvent.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature */ "./node_modules/ol/Feature.js");
/* harmony import */ var ol_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/functions */ "./node_modules/ol/functions.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point */ "./node_modules/ol/geom/Point.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/geom/SimpleGeometry */ "./node_modules/ol/geom/SimpleGeometry.js");
/* harmony import */ var ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction/Interaction */ "./node_modules/ol/interaction/Interaction.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }












var _default = function (_olInteractionInterac) {
  function _default(options) {
    var _this;
    _this = _olInteractionInterac.call(this, {
      handleEvent: ol_functions__WEBPACK_IMPORTED_MODULE_4__["TRUE"]
    }) || this;
    _this.changeEventKey_ = null;
    _this.type_ = options.type;
    _this.minPoints_ = options.minPoints ? options.minPoints : _this.type_ === 'Polygon' ? 3 : 2;
    _this.sketchFeature_ = null;
    _this.sketchPoints_ = [];
    _this.sketchPoint_ = null;
    _this.overlay_ = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]({
      source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false
      }),
      style: options.style || Object(ngeo_interaction_common__WEBPACK_IMPORTED_MODULE_0__["getDefaultDrawStyleFunction"])(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["listen"])(_this, 'change:active', _this.updateState_, _this);
    _this.set('dirty', false);
    _this.set('drawing', false);
    _this.set('valid', false);
    return _this;
  }
  _inheritsLoose(_default, _olInteractionInterac);
  var _proto = _default.prototype;
  _proto.setMap = function setMap(map) {
    var currentMap = this.getMap();
    if (currentMap) {
      if (this.changeEventKey_) {
        Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"])(this.changeEventKey_);
      }
    }
    ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.setMap.call(this, map);
    if (map) {
      this.changeEventKey_ = Object(ol_events__WEBPACK_IMPORTED_MODULE_2__["listen"])(map.getView(), 'change:center', this.handleViewCenterChange_, this);
    }
    this.updateState_();
  };
  _proto.getDirty = function getDirty() {
    return this.get('dirty');
  };
  _proto.getDrawing = function getDrawing() {
    return this.get('drawing');
  };
  _proto.getValid = function getValid() {
    return this.get('valid');
  };
  _proto.getFeature = function getFeature() {
    return this.sketchFeature_;
  };
  _proto.addToDrawing = function addToDrawing() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    var sketchFeatureGeom;
    var sketchPointGeom = this.getSketchPointGeometry_();
    var coordinate = sketchPointGeom.getCoordinates();
    var coordinates = null;
    if (this.type_ === 'Point') {
      if (!this.sketchFeature_) {
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](coordinate));
        var event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(event);
      }
      sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        sketchFeatureGeom.setCoordinates(coordinate);
      }
      return;
    }
    if (this.type_ === 'LineString') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_LineString__WEBPACK_IMPORTED_MODULE_5__["default"](coordinates));
        var _event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(_event);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
          coordinates = sketchFeatureGeom.getCoordinates();
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinates);
        }
      }
    }
    if (this.type_ === 'Polygon') {
      this.sketchPoints_.push(this.sketchPoint_);
      if (!this.sketchFeature_) {
        coordinates = [coordinate.slice(), coordinate.slice(), coordinate.slice()];
        this.sketchFeature_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]([coordinates]));
        var _event2 = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawstart', {
          feature: this.sketchFeature_
        });
        this.dispatchEvent(_event2);
      } else {
        sketchFeatureGeom = this.sketchFeature_.getGeometry();
        if (sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
          var coordinatess = sketchFeatureGeom.getCoordinates();
          coordinates = coordinatess[0];
          coordinates.push(coordinate.slice());
          sketchFeatureGeom.setCoordinates(coordinatess);
        }
      }
    }
    var dirty = this.getDirty();
    if (dirty) {
      this.set('dirty', false);
    }
    if (!coordinates) {
      throw new Error('Missing coordinates');
    }
    var valid = this.getValid();
    if (this.type_ === 'LineString' || this.type_ === 'Polygon') {
      if (coordinates.length >= this.minPoints_) {
        if (!valid) {
          this.set('valid', true);
        }
      } else {
        if (valid) {
          this.set('valid', false);
        }
      }
    }
    this.sketchPoint_ = null;
    this.updateSketchFeatures_();
  };
  _proto.clearDrawing = function clearDrawing() {
    this.setActive(false);
    this.setActive(true);
  };
  _proto.finishDrawing = function finishDrawing() {
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    if (this.sketchPoint_) {
      this.addToDrawing();
    }
    this.set('drawing', false);
    var event = new ngeo_CustomEvent__WEBPACK_IMPORTED_MODULE_1__["default"]('drawend', {
      feature: this.sketchFeature_
    });
    this.dispatchEvent(event);
  };
  _proto.startDrawing_ = function startDrawing_() {
    this.set('drawing', true);
    this.createOrUpdateSketchPoint_();
    this.updateSketchFeatures_();
    if (this.type_ === 'Point') {
      this.addToDrawing();
    }
  };
  _proto.modifyDrawing_ = function modifyDrawing_() {
    if (!this.sketchFeature_) {
      return;
    }
    var center = this.getCenter_();
    if (this.type_ === 'LineString') {
      var sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (sketchFeatureGeom instanceof ol_geom_SimpleGeometry__WEBPACK_IMPORTED_MODULE_8__["default"]) {
        var coordinates = sketchFeatureGeom.getCoordinates();
        coordinates.pop();
        coordinates.push(center);
        sketchFeatureGeom.setCoordinates(coordinates);
      }
    } else if (this.type_ === 'Polygon') {
      var _sketchFeatureGeom = this.sketchFeature_.getGeometry();
      if (_sketchFeatureGeom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        var coordinatess = _sketchFeatureGeom.getCoordinates();
        var _coordinates = coordinatess[0];
        _coordinates.pop();
        _coordinates.push(center);
        _sketchFeatureGeom.setCoordinates([_coordinates]);
      }
    }
    var dirty = this.getDirty();
    if (!dirty) {
      this.set('dirty', true);
    }
  };
  _proto.abortDrawing_ = function abortDrawing_() {
    var sketchFeature = this.sketchFeature_;
    if (sketchFeature || this.sketchPoints_.length > 0) {
      this.sketchFeature_ = null;
      this.sketchPoint_ = null;
      this.overlay_.getSource().clear(true);
    }
    this.sketchPoints_ = [];
    this.set('dirty', false);
    this.set('drawing', false);
    this.set('valid', false);
    return sketchFeature;
  };
  _proto.updateState_ = function updateState_() {
    var map = this.getMap();
    var active = this.getActive();
    if (!map || !active) {
      this.abortDrawing_();
    } else {
      this.startDrawing_();
    }
    this.overlay_.setMap(active ? map : null);
  };
  _proto.handleViewCenterChange_ = function handleViewCenterChange_(evt) {
    var active = this.getActive();
    var drawing = this.getDrawing();
    if (!active || !drawing) {
      return;
    }
    this.createOrUpdateSketchPoint_();
    if (this.type_ === 'Point') {
      this.addToDrawing();
    } else {
      this.modifyDrawing_();
      this.updateSketchFeatures_();
    }
  };
  _proto.createOrUpdateSketchPoint_ = function createOrUpdateSketchPoint_() {
    var center = this.getCenter_();
    if (this.sketchPoint_) {
      var geometry = this.getSketchPointGeometry_();
      geometry.setCoordinates(center);
    } else {
      this.sketchPoint_ = new ol_Feature__WEBPACK_IMPORTED_MODULE_3__["default"](new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"](center));
    }
  };
  _proto.updateSketchFeatures_ = function updateSketchFeatures_() {
    var sketchFeatures = [];
    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }
    var overlaySource = this.overlay_.getSource();
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
    overlaySource.addFeatures(this.sketchPoints_);
  };
  _proto.getSketchPointGeometry_ = function getSketchPointGeometry_() {
    if (!this.sketchPoint_) {
      throw new Error('Missing sketchPoint');
    }
    var geometry = this.sketchPoint_.getGeometry();
    if (geometry instanceof ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      return geometry;
    } else {
      throw new Error('Wrong geometry type');
    }
  };
  _proto.getCenter_ = function getCenter_() {
    var center = this.getMap().getView().getCenter();
    if (!Array.isArray(center)) {
      throw new Error('Missing center');
    }
    return center;
  };
  return _default;
}(ol_interaction_Interaction__WEBPACK_IMPORTED_MODULE_9__["default"]);


/***/ }),

/***/ "./src/mobile/measure/areaComponent.js":
/*!*********************************************!*\
  !*** ./src/mobile/measure/areaComponent.js ***!
  \*********************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureAreaMobile */ "./src/interaction/MeasureAreaMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
mobileMeasureAreaComponent.$inject = ["gmfMobileMeasureAreaTemplateUrl"];
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureArea', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value('gmfMobileMeasureAreaTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureAreaTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/areaComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/areaComponent', __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html"));
}]);
function mobileMeasureAreaComponent(gmfMobileMeasureAreaTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasureareaActive',
      'map': '=gmfMobileMeasureareaMap'
    },
    controller: 'GmfMobileMeasureAreaController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureAreaTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurearea', mobileMeasureAreaComponent);
var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog", "gmfMobileMeasureAreaOptions"];
  function Controller($scope, $filter, gettextCatalog, gmfMobileMeasureAreaOptions) {
    var _this;
    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.options = gmfMobileMeasureAreaOptions;
    _this.measure = null;
    return _this;
  }
  _inheritsLoose(Controller, _MeasueMobileBaseCont);
  var _proto = Controller.prototype;
  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureAreaMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.options.precision || 2,
      sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_4__["buildStyle"])(this.options.sketchStyle)
    });
    _MeasueMobileBaseCont.prototype.init.call(this);
  };
  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  };
  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  };
  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  };
  _proto.deactivate = function deactivate() {
    this.active = false;
  };
  return Controller;
}(gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);
myModule.controller('GmfMobileMeasureAreaController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/baseComponent.html":
/*!***********************************************!*\
  !*** ./src/mobile/measure/baseComponent.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default" ng-if="ctrl.drawing && (!ctrl.valid)" ng-click="ctrl.addPoint()">\n  <span class="fa fa-check"></span>\n  {{\'Set as starting point\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.dirty" ng-click="ctrl.addPoint()">\n  <span class="fa fa-plus"></span>\n  {{\'Add new point\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.drawing && ctrl.valid && !ctrl.dirty" ng-click="ctrl.finish()">\n  <span class="fa fa-check"></span>\n  {{\'Terminate\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.valid" ng-click="ctrl.clear()">\n  <span class="fa fa-repeat"></span>\n  {{\'Clear\' | translate}}\n</a>\n<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">\n  <span class="fa fa-times"></span>\n  {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./src/mobile/measure/baseComponent.js":
/*!*********************************************!*\
  !*** ./src/mobile/measure/baseComponent.js ***!
  \*********************************************/
/*! exports provided: MeasueMobileBaseController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasueMobileBaseController", function() { return MeasueMobileBaseController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
MeasueMobileBaseController.$inject = ["$scope", "$filter", "gettextCatalog"];





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureBase', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
function MeasueMobileBaseController($scope, $filter, gettextCatalog) {
  var _this = this;
  this.scope = $scope;
  this.filter = $filter;
  this.gettextCatalog = gettextCatalog;
  this.map = null;
  this.active = false;
  this.scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }
    _this.measure.setActive(newVal);
  });
  this.measure = null;
  this.drawInteraction = null;
  this.dirty = false;
  this.drawing = false;
  this.valid = false;
}
MeasueMobileBaseController.prototype.init = function () {
  var _this2 = this;
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_4__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_1__["interactionDecoration"])(drawInteraction);
  Object.defineProperty(this, 'hasPoints', {
    get: function get() {
      return this.drawInteraction.getFeature() !== null;
    }
  });
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:dirty', function (evt) {
    _this2.dirty = drawInteraction.getDirty();
    if (_this2.dirty) {
      _this2.scope.$apply();
    }
  }, this);
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:drawing', function (evt) {
    _this2.drawing = drawInteraction.getDrawing();
  }, this);
  Object(ol_events__WEBPACK_IMPORTED_MODULE_3__["listen"])(drawInteraction, 'change:valid', function (evt) {
    _this2.valid = drawInteraction.getValid();
  }, this);
  this.map.addInteraction(this.measure);
};
myModule.controller('gmfMeasueMobileBaseController', MeasueMobileBaseController);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/lengthComponent.js":
/*!***********************************************!*\
  !*** ./src/mobile/measure/lengthComponent.js ***!
  \***********************************************/
/*! exports provided: Controller, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/misc/filters */ "./src/misc/filters.js");
/* harmony import */ var ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasureLengthMobile */ "./src/interaction/MeasureLengthMobile.js");
/* harmony import */ var gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gmf/mobile/measure/baseComponent */ "./src/mobile/measure/baseComponent.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
mobileMeasureLenthComponent.$inject = ["gmfMobileMeasureLengthTemplateUrl"];
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasureLength', [ngeo_misc_filters__WEBPACK_IMPORTED_MODULE_1__["default"].name]);
myModule.value('gmfMobileMeasureLengthTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasureLengthTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/lengthComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/lengthComponent', __webpack_require__(/*! ./baseComponent.html */ "./src/mobile/measure/baseComponent.html"));
}]);
function mobileMeasureLenthComponent(gmfMobileMeasureLengthTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurelengthActive',
      'map': '=gmfMobileMeasurelengthMap'
    },
    controller: 'GmfMobileMeasureLengthController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasureLengthTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurelength', mobileMeasureLenthComponent);
var Controller = function (_MeasueMobileBaseCont) {
  Controller.$inject = ["$scope", "$filter", "gettextCatalog", "gmfMobileMeasureLengthOptions"];
  function Controller($scope, $filter, gettextCatalog, gmfMobileMeasureLengthOptions) {
    var _this;
    _this = _MeasueMobileBaseCont.call(this, $scope, $filter, gettextCatalog) || this;
    _this.options = gmfMobileMeasureLengthOptions;
    _this.measure = null;
    return _this;
  }
  _inheritsLoose(Controller, _MeasueMobileBaseCont);
  var _proto = Controller.prototype;
  _proto.init = function init() {
    this.measure = new ngeo_interaction_MeasureLengthMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.filter('ngeoUnitPrefix'), this.gettextCatalog, {
      precision: this.options.precision || 3,
      sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_4__["buildStyle"])(this.options.sketchStyle)
    });
    _MeasueMobileBaseCont.prototype.init.call(this);
  };
  _proto.addPoint = function addPoint() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.addToDrawing();
  };
  _proto.clear = function clear() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.clearDrawing();
  };
  _proto.finish = function finish() {
    if (!this.drawInteraction) {
      throw new Error('Missing drawInteraction');
    }
    this.drawInteraction.finishDrawing();
  };
  _proto.deactivate = function deactivate() {
    this.active = false;
  };
  return Controller;
}(gmf_mobile_measure_baseComponent__WEBPACK_IMPORTED_MODULE_3__["MeasueMobileBaseController"]);
myModule.controller('GmfMobileMeasureLengthController', Controller);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ "./src/mobile/measure/pointComponent.html":
/*!************************************************!*\
  !*** ./src/mobile/measure/pointComponent.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<a class="btn btn-default" ng-if="ctrl.active" ng-click="ctrl.deactivate()">\n  <span class="fa fa-times"></span>\n  {{\'Close\' | translate}}\n</a>\n';

}
return __p
}

/***/ }),

/***/ "./src/mobile/measure/pointComponent.js":
/*!**********************************************!*\
  !*** ./src/mobile/measure/pointComponent.js ***!
  \**********************************************/
/*! exports provided: MobileMeasurePointController, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileMeasurePointController", function() { return MobileMeasurePointController; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gmf/raster/RasterService */ "./src/raster/RasterService.js");
/* harmony import */ var ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/interaction/MeasurePointMobile */ "./src/interaction/MeasurePointMobile.js");
/* harmony import */ var ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/misc/debounce */ "./src/misc/debounce.js");
/* harmony import */ var ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/misc/decorate */ "./src/misc/decorate.js");
/* harmony import */ var ol_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/events */ "./node_modules/ol/events.js");
/* harmony import */ var ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngeo/interaction/MobileDraw */ "./src/interaction/MobileDraw.js");
/* harmony import */ var ngeo_options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngeo/options */ "./src/options.js");
MobileMeasurePointController.$inject = ["gettextCatalog", "$scope", "$filter", "gmfRaster", "ngeoDebounce", "gmfMobileMeasurePointOptions"];
mobileMeasurePointComponent.$inject = ["gmfMobileMeasurePointTemplateUrl"];
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }








var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('gmfMobileMeasurePoint', [gmf_raster_RasterService__WEBPACK_IMPORTED_MODULE_1__["default"].name, ngeo_misc_debounce__WEBPACK_IMPORTED_MODULE_3__["default"].name]);
myModule.value('gmfMobileMeasurePointTemplateUrl', function (element, attrs) {
  var templateUrl = attrs.gmfMobileMeasurePointTemplateurl;
  return templateUrl !== undefined ? templateUrl : 'gmf/measure/pointComponent';
});
myModule.run(["$templateCache", function ($templateCache) {
  $templateCache.put('gmf/measure/pointComponent', __webpack_require__(/*! ./pointComponent.html */ "./src/mobile/measure/pointComponent.html"));
}]);
function mobileMeasurePointComponent(gmfMobileMeasurePointTemplateUrl) {
  return {
    restrict: 'A',
    scope: {
      'active': '=gmfMobileMeasurepointActive',
      'map': '=gmfMobileMeasurepointMap'
    },
    controller: 'GmfMobileMeasurePointController as ctrl',
    bindToController: true,
    templateUrl: gmfMobileMeasurePointTemplateUrl,
    link: function link(scope, element, attrs, controller) {
      if (!controller) {
        throw new Error('Missing controller');
      }
      controller.init();
    }
  };
}
myModule.directive('gmfMobileMeasurepoint', mobileMeasurePointComponent);
function MobileMeasurePointController(gettextCatalog, $scope, $filter, gmfRaster, ngeoDebounce, gmfMobileMeasurePointOptions) {
  var _this = this;
  this.options = gmfMobileMeasurePointOptions;
  this.gmfRaster_ = gmfRaster;
  this.ngeoDebounce_ = ngeoDebounce;
  this.gettextCatalog_ = gettextCatalog;
  this.$filter_ = $filter;
  this.map = null;
  this.active = false;
  $scope.$watch(function () {
    return _this.active;
  }, function (newVal) {
    if (!_this.measure) {
      throw new Error('Missing measure');
    }
    _this.measure.setActive(newVal);
    _this.handleMeasureActiveChange_();
  });
  this.measure = null;
  this.drawInteraction = null;
  this.mapViewPropertyChangeEventKey_ = null;
}
MobileMeasurePointController.prototype.init = function () {
  this.measure = new ngeo_interaction_MeasurePointMobile__WEBPACK_IMPORTED_MODULE_2__["default"](this.$filter_('ngeoNumberCoordinates'), this.options.format, {
    decimals: this.options.decimals,
    sketchStyle: Object(ngeo_options__WEBPACK_IMPORTED_MODULE_7__["buildStyle"])(this.options.sketchStyle)
  });
  this.measure.setActive(this.active);
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.measure);
  var drawInteraction = this.measure.getDrawInteraction();
  if (!(drawInteraction instanceof ngeo_interaction_MobileDraw__WEBPACK_IMPORTED_MODULE_6__["default"])) {
    throw new Error('Wrong drawInteraction');
  }
  this.drawInteraction = drawInteraction;
  Object(ngeo_misc_decorate__WEBPACK_IMPORTED_MODULE_4__["interactionDecoration"])(this.drawInteraction);
  if (!this.map) {
    throw new Error('Missing map');
  }
  this.map.addInteraction(this.measure);
};
MobileMeasurePointController.prototype.deactivate = function () {
  this.active = false;
};
MobileMeasurePointController.prototype.translate = function (str) {
  return this.gettextCatalog_.getString(str);
};
MobileMeasurePointController.prototype.handleMeasureActiveChange_ = function () {
  if (!this.map) {
    throw new Error('Missing map');
  }
  if (!this.measure) {
    throw new Error('Missing measure');
  }
  if (this.measure.getActive()) {
    var view = this.map.getView();
    this.mapViewPropertyChangeEventKey_ = Object(ol_events__WEBPACK_IMPORTED_MODULE_5__["listen"])(view, 'propertychange', this.ngeoDebounce_(this.getMeasure_.bind(this), 300, true), this);
    this.getMeasure_();
  } else if (this.mapViewPropertyChangeEventKey_) {
    Object(ol_events__WEBPACK_IMPORTED_MODULE_5__["unlistenByKey"])(this.mapViewPropertyChangeEventKey_);
    this.mapViewPropertyChangeEventKey_ = null;
  }
};
MobileMeasurePointController.prototype.getMeasure_ = function () {
  var _this2 = this;
  if (!this.map) {
    throw new Error('Missing map');
  }
  var center = this.map.getView().getCenter();
  if (!Array.isArray(center)) {
    throw new Error('Wrong center');
  }
  if (!this.options.rasterLayers || this.options.rasterLayers.length === 0) {
    return;
  }
  var params = {
    'layers': this.options.rasterLayers.map(function (config) {
      return config.name;
    }).join(',')
  };
  this.gmfRaster_.getRaster(center, params).then(function (object) {
    if (!_this2.measure) {
      throw new Error('Missing measure');
    }
    var el = _this2.measure.getTooltipElement();
    var ctn = document.createElement('div');
    var className = 'gmf-mobile-measure-point';
    ctn.className = className;
    for (var _iterator = _createForOfIteratorHelperLoose(_this2.options.rasterLayers), _step; !(_step = _iterator()).done;) {
      var config = _step.value;
      var key = config.name;
      if (key in object) {
        var value = object[key];
        var childEl = document.createElement('div');
        childEl.className = "gmf-mobile-measure-point-" + key;
        var unit = config.unit || '';
        var decimals = config.decimals > 0 ? config.decimals : 0;
        value = _this2.$filter_('number')(value, decimals);
        childEl.innerHTML = [_this2.translate(key), ': ', value, ' ', unit].join('');
        ctn.appendChild(childEl);
      }
    }
    var previousCtn = el.getElementsByClassName(className);
    if (previousCtn[0]) {
      previousCtn[0].remove();
    }
    el.appendChild(ctn);
  });
};
myModule.controller('GmfMobileMeasurePointController', MobileMeasurePointController);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 11:
/*!***********************************************************************************************************************!*\
  !*** multi ./contribs/gmf/examples/common_dependencies.js gmf/mainmodule.js ./contribs/gmf/examples/mobilemeasure.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./contribs/gmf/examples/common_dependencies.js */"./contribs/gmf/examples/common_dependencies.js");
__webpack_require__(/*! gmf/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./contribs/gmf/examples/mobilemeasure.js */"./contribs/gmf/examples/mobilemeasure.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlbWVhc3VyZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9jb250cmlicy9nbWYvZXhhbXBsZXMvbW9iaWxlbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWFNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0aW9uL01lYXN1cmVQb2ludE1vYmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW50ZXJhY3Rpb24vTW9iaWxlRHJhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYXJlYUNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy9tb2JpbGUvbWVhc3VyZS9iYXNlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2JpbGUvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtb2JpbGVtZWFzdXJlXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsxMSxcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiZ21mUGVybWFsaW5rXCJdO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJy4vbW9iaWxlbWVhc3VyZS5jc3MnO1xuaW1wb3J0IGdtZk1hcENvbXBvbmVudCBmcm9tICdnbWYvbWFwL2NvbXBvbmVudCc7XG5pbXBvcnQgZ21mUGVybWFsaW5rUGVybWFsaW5rIGZyb20gJ2dtZi9wZXJtYWxpbmsvUGVybWFsaW5rJztcbmltcG9ydCBnbWZNb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudCBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYXJlYUNvbXBvbmVudCc7XG5pbXBvcnQgZ21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbXBvbmVudCBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JztcbmltcG9ydCBnbWZNb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQgZnJvbSAnZ21mL21vYmlsZS9tZWFzdXJlL3BvaW50Q29tcG9uZW50JztcbmltcG9ydCBuZ2VvTWlzY0J0bkNvbXBvbmVudCBmcm9tICduZ2VvL21pc2MvYnRuQ29tcG9uZW50JztcbmltcG9ydCBFUFNHMjA1NiBmcm9tICduZ2VvL3Byb2ovRVBTR18yMDU2JztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZSc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldyc7XG5pbXBvcnQgb2xDb250cm9sU2NhbGVMaW5lIGZyb20gJ29sL2NvbnRyb2wvU2NhbGVMaW5lJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mYXBwJywgWydnZXR0ZXh0JywgZ21mTWFwQ29tcG9uZW50Lm5hbWUsIGdtZlBlcm1hbGlua1Blcm1hbGluay5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC5uYW1lLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoQ29tcG9uZW50Lm5hbWUsIGdtZk1vYmlsZU1lYXN1cmVQb2ludENvbXBvbmVudC5uYW1lLCBuZ2VvTWlzY0J0bkNvbXBvbmVudC5uYW1lLCBuZ2VvTWFwTW9kdWxlLm5hbWVdKTtcbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKGdtZlBlcm1hbGluaykge1xuICB2YXIgY2VudGVyID0gZ21mUGVybWFsaW5rLmdldE1hcENlbnRlcigpIHx8IFs1Mzc2MzUsIDE1MjY0MF07XG4gIHZhciB6b29tID0gZ21mUGVybWFsaW5rLmdldE1hcFpvb20oKSB8fCAzO1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbbmV3IG9sTGF5ZXJUaWxlKHtcbiAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKClcbiAgICB9KV0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMSwgMC41XSxcbiAgICAgIGNlbnRlcjogY2VudGVyLFxuICAgICAgem9vbTogem9vbVxuICAgIH0pXG4gIH0pO1xuICB0aGlzLm1hcC5hZGRDb250cm9sKG5ldyBvbENvbnRyb2xTY2FsZUxpbmUoe1xuICAgIGRwaTogOTZcbiAgfSkpO1xuICB0aGlzLm1lYXN1cmVBcmVhQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMubWVhc3VyZUxlbmd0aEFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLm1lYXN1cmVQb2ludEFjdGl2ZSA9IGZhbHNlO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG52YXIgc2tldGNoU3R5bGUgPSB7XG4gIGZpbGw6IHtcbiAgICBjb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSdcbiAgfSxcbiAgc3Ryb2tlOiB7XG4gICAgY29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgIGxpbmVEYXNoOiBbMTAsIDEwXSxcbiAgICB3aWR0aDogMlxuICB9LFxuICByZWd1bGFyU2hhcGU6IHtcbiAgICBzdHJva2U6IHtcbiAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgICAgIHdpZHRoOiAyXG4gICAgfSxcbiAgICBwb2ludHM6IDQsXG4gICAgcmFkaXVzOiA4LFxuICAgIHJhZGl1czI6IDAsXG4gICAgYW5nbGU6IDBcbiAgfVxufTtcbm15TW9kdWxlLmNvbnN0YW50KCdnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGUsXG4gIGRlY2ltYWxzOiAyLFxuICBmb3JtYXQ6ICd7eH0sIHt5fScsXG4gIHJhc3RlckxheWVyczogW3tcbiAgICBuYW1lOiAnYXN0ZXInLFxuICAgIHVuaXQ6ICdtJyxcbiAgICBkZWNpbWFsczogMlxuICB9LCB7XG4gICAgbmFtZTogJ3NydG0nLFxuICAgIHVuaXQ6ICdtJ1xuICB9XVxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aE9wdGlvbnMnLCB7XG4gIHNrZXRjaFN0eWxlOiBza2V0Y2hTdHlsZVxufSk7XG5teU1vZHVsZS5jb25zdGFudCgnZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zJywge1xuICBza2V0Y2hTdHlsZTogc2tldGNoU3R5bGVcbn0pO1xub3B0aW9ucyhteU1vZHVsZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZSh0LCBvKSB7IHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShvLnByb3RvdHlwZSksIHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdCwgX3NldFByb3RvdHlwZU9mKHQsIG8pOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YodCwgZSkgeyByZXR1cm4gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0LCBlKSB7IHJldHVybiB0Ll9fcHJvdG9fXyA9IGUsIHQ7IH0sIF9zZXRQcm90b3R5cGVPZih0LCBlKTsgfVxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWEnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcbnZhciBNZWFzdXJlQXJlYU1vYmlsZSA9IGZ1bmN0aW9uIChfbmdlb0ludGVyYWN0aW9uTWVhc3UpIHtcbiAgZnVuY3Rpb24gTWVhc3VyZUFyZWFNb2JpbGUoZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgcmV0dXJuIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdS5jYWxsKHRoaXMsIGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdGlvbnMpIHx8IHRoaXM7XG4gIH1cbiAgX2luaGVyaXRzTG9vc2UoTWVhc3VyZUFyZWFNb2JpbGUsIF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSk7XG4gIHZhciBfcHJvdG8gPSBNZWFzdXJlQXJlYU1vYmlsZS5wcm90b3R5cGU7XG4gIF9wcm90by5jcmVhdGVEcmF3SW50ZXJhY3Rpb24gPSBmdW5jdGlvbiBjcmVhdGVEcmF3SW50ZXJhY3Rpb24oc3R5bGUsIHNvdXJjZSkge1xuICAgIHJldHVybiBuZXcgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyh7XG4gICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICBzdHlsZTogc3R5bGVcbiAgICB9KTtcbiAgfTtcbiAgcmV0dXJuIE1lYXN1cmVBcmVhTW9iaWxlO1xufShuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlQXJlYSk7XG5leHBvcnQgZGVmYXVsdCBNZWFzdXJlQXJlYU1vYmlsZTsiLCJmdW5jdGlvbiBfaW5oZXJpdHNMb29zZSh0LCBvKSB7IHQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShvLnByb3RvdHlwZSksIHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdCwgX3NldFByb3RvdHlwZU9mKHQsIG8pOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YodCwgZSkgeyByZXR1cm4gX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uICh0LCBlKSB7IHJldHVybiB0Ll9fcHJvdG9fXyA9IGUsIHQ7IH0sIF9zZXRQcm90b3R5cGVPZih0LCBlKTsgfVxuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGggZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlTGVuZ3RoJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdyc7XG52YXIgX2RlZmF1bHQgPSBmdW5jdGlvbiAoX25nZW9JbnRlcmFjdGlvbk1lYXN1KSB7XG4gIGZ1bmN0aW9uIF9kZWZhdWx0KGZvcm1hdCwgZ2V0dGV4dENhdGFsb2csIG9wdF9vcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRfb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gb3B0X29wdGlvbnMgOiB7fTtcbiAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgIGRpc3BsYXlIZWxwVG9vbHRpcDogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gX25nZW9JbnRlcmFjdGlvbk1lYXN1LmNhbGwodGhpcywgZm9ybWF0LCBnZXR0ZXh0Q2F0YWxvZywgb3B0aW9ucykgfHwgdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShfZGVmYXVsdCwgX25nZW9JbnRlcmFjdGlvbk1lYXN1KTtcbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcbiAgX3Byb3RvLmNyZWF0ZURyYXdJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uIGNyZWF0ZURyYXdJbnRlcmFjdGlvbihzdHlsZSwgc291cmNlKSB7XG4gICAgcmV0dXJuIG5ldyBuZ2VvSW50ZXJhY3Rpb25Nb2JpbGVEcmF3KHtcbiAgICAgIHR5cGU6ICdMaW5lU3RyaW5nJyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuICByZXR1cm4gX2RlZmF1bHQ7XG59KG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVMZW5ndGgpO1xuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHQsIG8pIHsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG8ucHJvdG90eXBlKSwgdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0LCBfc2V0UHJvdG90eXBlT2YodCwgbyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZSwgeyBnZXRGb3JtYXR0ZWRQb2ludCB9IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZSc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTW9iaWxlRHJhdyBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01vYmlsZURyYXcnO1xuaW1wb3J0IFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9uZ2VvSW50ZXJhY3Rpb25NZWFzdSkge1xuICBmdW5jdGlvbiBfZGVmYXVsdChmb3JtYXQsIGNvb3JkRm9ybWF0LCBvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG4gICAgICBkaXNwbGF5SGVscFRvb2x0aXA6IGZhbHNlXG4gICAgfSk7XG4gICAgX3RoaXMgPSBfbmdlb0ludGVyYWN0aW9uTWVhc3UuY2FsbCh0aGlzLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmZvcm1hdF8gPSBmb3JtYXQ7XG4gICAgX3RoaXMuY29vcmRGb3JtYXRfID0gY29vcmRGb3JtYXQ7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIF9pbmhlcml0c0xvb3NlKF9kZWZhdWx0LCBfbmdlb0ludGVyYWN0aW9uTWVhc3UpO1xuICB2YXIgX3Byb3RvID0gX2RlZmF1bHQucHJvdG90eXBlO1xuICBfcHJvdG8uY3JlYXRlRHJhd0ludGVyYWN0aW9uID0gZnVuY3Rpb24gY3JlYXRlRHJhd0ludGVyYWN0aW9uKHN0eWxlLCBzb3VyY2UpIHtcbiAgICByZXR1cm4gbmV3IG5nZW9JbnRlcmFjdGlvbk1vYmlsZURyYXcoe1xuICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uaGFuZGxlTWVhc3VyZSA9IGZ1bmN0aW9uIGhhbmRsZU1lYXN1cmUoY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaEZlYXR1cmUnKTtcbiAgICB9XG4gICAgdmFyIGdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICBpZiAoIShnZW9tIGluc3RhbmNlb2YgUG9pbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZ2VvbWV0cnknKTtcbiAgICB9XG4gICAgdmFyIGRlYyA9IHRoaXMuZGVjaW1hbHM7XG4gICAgdmFyIG91dHB1dCA9IGdldEZvcm1hdHRlZFBvaW50KGdlb20sIGRlYywgdGhpcy5mb3JtYXRfLCB0aGlzLmNvb3JkRm9ybWF0Xyk7XG4gICAgdmFyIGNvb3JkID0gZ2VvbS5nZXRMYXN0Q29vcmRpbmF0ZSgpO1xuICAgIGNhbGxiYWNrKG91dHB1dCwgY29vcmQpO1xuICB9O1xuICByZXR1cm4gX2RlZmF1bHQ7XG59KG5nZW9JbnRlcmFjdGlvbk1lYXN1cmUpO1xuZXhwb3J0IHsgX2RlZmF1bHQgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHQsIG8pIHsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG8ucHJvdG90eXBlKSwgdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0LCBfc2V0UHJvdG90eXBlT2YodCwgbyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5pbXBvcnQgeyBnZXREZWZhdWx0RHJhd1N0eWxlRnVuY3Rpb24gfSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL2NvbW1vbic7XG5pbXBvcnQgbmdlb0N1c3RvbUV2ZW50IGZyb20gJ25nZW8vQ3VzdG9tRXZlbnQnO1xuaW1wb3J0IHsgbGlzdGVuLCB1bmxpc3RlbkJ5S2V5IH0gZnJvbSAnb2wvZXZlbnRzJztcbmltcG9ydCBvbEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgeyBUUlVFIH0gZnJvbSAnb2wvZnVuY3Rpb25zJztcbmltcG9ydCBvbEdlb21MaW5lU3RyaW5nIGZyb20gJ29sL2dlb20vTGluZVN0cmluZyc7XG5pbXBvcnQgb2xHZW9tUG9pbnQgZnJvbSAnb2wvZ2VvbS9Qb2ludCc7XG5pbXBvcnQgb2xHZW9tUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xuaW1wb3J0IG9sR2VvbVNpbXBsZUdlb21ldHJ5IGZyb20gJ29sL2dlb20vU2ltcGxlR2VvbWV0cnknO1xuaW1wb3J0IG9sSW50ZXJhY3Rpb25JbnRlcmFjdGlvbiBmcm9tICdvbC9pbnRlcmFjdGlvbi9JbnRlcmFjdGlvbic7XG5pbXBvcnQgb2xMYXllclZlY3RvciBmcm9tICdvbC9sYXllci9WZWN0b3InO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xudmFyIF9kZWZhdWx0ID0gZnVuY3Rpb24gKF9vbEludGVyYWN0aW9uSW50ZXJhYykge1xuICBmdW5jdGlvbiBfZGVmYXVsdChvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF90aGlzID0gX29sSW50ZXJhY3Rpb25JbnRlcmFjLmNhbGwodGhpcywge1xuICAgICAgaGFuZGxlRXZlbnQ6IFRSVUVcbiAgICB9KSB8fCB0aGlzO1xuICAgIF90aGlzLmNoYW5nZUV2ZW50S2V5XyA9IG51bGw7XG4gICAgX3RoaXMudHlwZV8gPSBvcHRpb25zLnR5cGU7XG4gICAgX3RoaXMubWluUG9pbnRzXyA9IG9wdGlvbnMubWluUG9pbnRzID8gb3B0aW9ucy5taW5Qb2ludHMgOiBfdGhpcy50eXBlXyA9PT0gJ1BvbHlnb24nID8gMyA6IDI7XG4gICAgX3RoaXMuc2tldGNoRmVhdHVyZV8gPSBudWxsO1xuICAgIF90aGlzLnNrZXRjaFBvaW50c18gPSBbXTtcbiAgICBfdGhpcy5za2V0Y2hQb2ludF8gPSBudWxsO1xuICAgIF90aGlzLm92ZXJsYXlfID0gbmV3IG9sTGF5ZXJWZWN0b3Ioe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VWZWN0b3Ioe1xuICAgICAgICB1c2VTcGF0aWFsSW5kZXg6IGZhbHNlLFxuICAgICAgICB3cmFwWDogb3B0aW9ucy53cmFwWCA/IG9wdGlvbnMud3JhcFggOiBmYWxzZVxuICAgICAgfSksXG4gICAgICBzdHlsZTogb3B0aW9ucy5zdHlsZSB8fCBnZXREZWZhdWx0RHJhd1N0eWxlRnVuY3Rpb24oKSxcbiAgICAgIHVwZGF0ZVdoaWxlQW5pbWF0aW5nOiB0cnVlLFxuICAgICAgdXBkYXRlV2hpbGVJbnRlcmFjdGluZzogdHJ1ZVxuICAgIH0pO1xuICAgIGxpc3RlbihfdGhpcywgJ2NoYW5nZTphY3RpdmUnLCBfdGhpcy51cGRhdGVTdGF0ZV8sIF90aGlzKTtcbiAgICBfdGhpcy5zZXQoJ2RpcnR5JywgZmFsc2UpO1xuICAgIF90aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICBfdGhpcy5zZXQoJ3ZhbGlkJywgZmFsc2UpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShfZGVmYXVsdCwgX29sSW50ZXJhY3Rpb25JbnRlcmFjKTtcbiAgdmFyIF9wcm90byA9IF9kZWZhdWx0LnByb3RvdHlwZTtcbiAgX3Byb3RvLnNldE1hcCA9IGZ1bmN0aW9uIHNldE1hcChtYXApIHtcbiAgICB2YXIgY3VycmVudE1hcCA9IHRoaXMuZ2V0TWFwKCk7XG4gICAgaWYgKGN1cnJlbnRNYXApIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZUV2ZW50S2V5Xykge1xuICAgICAgICB1bmxpc3RlbkJ5S2V5KHRoaXMuY2hhbmdlRXZlbnRLZXlfKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb2xJbnRlcmFjdGlvbkludGVyYWN0aW9uLnByb3RvdHlwZS5zZXRNYXAuY2FsbCh0aGlzLCBtYXApO1xuICAgIGlmIChtYXApIHtcbiAgICAgIHRoaXMuY2hhbmdlRXZlbnRLZXlfID0gbGlzdGVuKG1hcC5nZXRWaWV3KCksICdjaGFuZ2U6Y2VudGVyJywgdGhpcy5oYW5kbGVWaWV3Q2VudGVyQ2hhbmdlXywgdGhpcyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGVfKCk7XG4gIH07XG4gIF9wcm90by5nZXREaXJ0eSA9IGZ1bmN0aW9uIGdldERpcnR5KCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnZGlydHknKTtcbiAgfTtcbiAgX3Byb3RvLmdldERyYXdpbmcgPSBmdW5jdGlvbiBnZXREcmF3aW5nKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnZHJhd2luZycpO1xuICB9O1xuICBfcHJvdG8uZ2V0VmFsaWQgPSBmdW5jdGlvbiBnZXRWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3ZhbGlkJyk7XG4gIH07XG4gIF9wcm90by5nZXRGZWF0dXJlID0gZnVuY3Rpb24gZ2V0RmVhdHVyZSgpIHtcbiAgICByZXR1cm4gdGhpcy5za2V0Y2hGZWF0dXJlXztcbiAgfTtcbiAgX3Byb3RvLmFkZFRvRHJhd2luZyA9IGZ1bmN0aW9uIGFkZFRvRHJhd2luZygpIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgc2tldGNoUG9pbnQnKTtcbiAgICB9XG4gICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgdmFyIGRyYXdpbmcgPSB0aGlzLmdldERyYXdpbmcoKTtcbiAgICBpZiAoIWFjdGl2ZSB8fCAhZHJhd2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgc2tldGNoRmVhdHVyZUdlb207XG4gICAgdmFyIHNrZXRjaFBvaW50R2VvbSA9IHRoaXMuZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8oKTtcbiAgICB2YXIgY29vcmRpbmF0ZSA9IHNrZXRjaFBvaW50R2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgIHZhciBjb29yZGluYXRlcyA9IG51bGw7XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdQb2ludCcpIHtcbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICB0aGlzLnNrZXRjaEZlYXR1cmVfID0gbmV3IG9sRmVhdHVyZShuZXcgb2xHZW9tUG9pbnQoY29vcmRpbmF0ZSkpO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHNrZXRjaEZlYXR1cmVHZW9tID0gdGhpcy5za2V0Y2hGZWF0dXJlXy5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnR5cGVfID09PSAnTGluZVN0cmluZycpIHtcbiAgICAgIHRoaXMuc2tldGNoUG9pbnRzXy5wdXNoKHRoaXMuc2tldGNoUG9pbnRfKTtcbiAgICAgIGlmICghdGhpcy5za2V0Y2hGZWF0dXJlXykge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKV07XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21MaW5lU3RyaW5nKGNvb3JkaW5hdGVzKSk7XG4gICAgICAgIHZhciBfZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KF9ldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbSA9IHRoaXMuc2tldGNoRmVhdHVyZV8uZ2V0R2VvbWV0cnkoKTtcbiAgICAgICAgaWYgKHNrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tU2ltcGxlR2VvbWV0cnkpIHtcbiAgICAgICAgICBjb29yZGluYXRlcyA9IHNrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlLnNsaWNlKCkpO1xuICAgICAgICAgIHNrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ1BvbHlnb24nKSB7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50c18ucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG4gICAgICBpZiAoIXRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbY29vcmRpbmF0ZS5zbGljZSgpLCBjb29yZGluYXRlLnNsaWNlKCksIGNvb3JkaW5hdGUuc2xpY2UoKV07XG4gICAgICAgIHRoaXMuc2tldGNoRmVhdHVyZV8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21Qb2x5Z29uKFtjb29yZGluYXRlc10pKTtcbiAgICAgICAgdmFyIF9ldmVudDIgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3c3RhcnQnLCB7XG4gICAgICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KF9ldmVudDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG4gICAgICAgIGlmIChza2V0Y2hGZWF0dXJlR2VvbSBpbnN0YW5jZW9mIG9sR2VvbVBvbHlnb24pIHtcbiAgICAgICAgICB2YXIgY29vcmRpbmF0ZXNzID0gc2tldGNoRmVhdHVyZUdlb20uZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzc1swXTtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGUuc2xpY2UoKSk7XG4gICAgICAgICAgc2tldGNoRmVhdHVyZUdlb20uc2V0Q29vcmRpbmF0ZXMoY29vcmRpbmF0ZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZGlydHkgPSB0aGlzLmdldERpcnR5KCk7XG4gICAgaWYgKGRpcnR5KSB7XG4gICAgICB0aGlzLnNldCgnZGlydHknLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICB2YXIgdmFsaWQgPSB0aGlzLmdldFZhbGlkKCk7XG4gICAgaWYgKHRoaXMudHlwZV8gPT09ICdMaW5lU3RyaW5nJyB8fCB0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIGlmIChjb29yZGluYXRlcy5sZW5ndGggPj0gdGhpcy5taW5Qb2ludHNfKSB7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICB0aGlzLnNldCgndmFsaWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgdGhpcy5zZXQoJ3ZhbGlkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2tldGNoUG9pbnRfID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICB9O1xuICBfcHJvdG8uY2xlYXJEcmF3aW5nID0gZnVuY3Rpb24gY2xlYXJEcmF3aW5nKCkge1xuICAgIHRoaXMuc2V0QWN0aXZlKGZhbHNlKTtcbiAgICB0aGlzLnNldEFjdGl2ZSh0cnVlKTtcbiAgfTtcbiAgX3Byb3RvLmZpbmlzaERyYXdpbmcgPSBmdW5jdGlvbiBmaW5pc2hEcmF3aW5nKCkge1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIHZhciBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2tldGNoUG9pbnRfKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH1cbiAgICB0aGlzLnNldCgnZHJhd2luZycsIGZhbHNlKTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgbmdlb0N1c3RvbUV2ZW50KCdkcmF3ZW5kJywge1xuICAgICAgZmVhdHVyZTogdGhpcy5za2V0Y2hGZWF0dXJlX1xuICAgIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH07XG4gIF9wcm90by5zdGFydERyYXdpbmdfID0gZnVuY3Rpb24gc3RhcnREcmF3aW5nXygpIHtcbiAgICB0aGlzLnNldCgnZHJhd2luZycsIHRydWUpO1xuICAgIHRoaXMuY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKTtcbiAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm1vZGlmeURyYXdpbmdfID0gZnVuY3Rpb24gbW9kaWZ5RHJhd2luZ18oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaEZlYXR1cmVfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjZW50ZXIgPSB0aGlzLmdldENlbnRlcl8oKTtcbiAgICBpZiAodGhpcy50eXBlXyA9PT0gJ0xpbmVTdHJpbmcnKSB7XG4gICAgICB2YXIgc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoc2tldGNoRmVhdHVyZUdlb20gaW5zdGFuY2VvZiBvbEdlb21TaW1wbGVHZW9tZXRyeSkge1xuICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBza2V0Y2hGZWF0dXJlR2VvbS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICBjb29yZGluYXRlcy5wb3AoKTtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChjZW50ZXIpO1xuICAgICAgICBza2V0Y2hGZWF0dXJlR2VvbS5zZXRDb29yZGluYXRlcyhjb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGVfID09PSAnUG9seWdvbicpIHtcbiAgICAgIHZhciBfc2tldGNoRmVhdHVyZUdlb20gPSB0aGlzLnNrZXRjaEZlYXR1cmVfLmdldEdlb21ldHJ5KCk7XG4gICAgICBpZiAoX3NrZXRjaEZlYXR1cmVHZW9tIGluc3RhbmNlb2Ygb2xHZW9tUG9seWdvbikge1xuICAgICAgICB2YXIgY29vcmRpbmF0ZXNzID0gX3NrZXRjaEZlYXR1cmVHZW9tLmdldENvb3JkaW5hdGVzKCk7XG4gICAgICAgIHZhciBfY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc3NbMF07XG4gICAgICAgIF9jb29yZGluYXRlcy5wb3AoKTtcbiAgICAgICAgX2Nvb3JkaW5hdGVzLnB1c2goY2VudGVyKTtcbiAgICAgICAgX3NrZXRjaEZlYXR1cmVHZW9tLnNldENvb3JkaW5hdGVzKFtfY29vcmRpbmF0ZXNdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRpcnR5ID0gdGhpcy5nZXREaXJ0eSgpO1xuICAgIGlmICghZGlydHkpIHtcbiAgICAgIHRoaXMuc2V0KCdkaXJ0eScsIHRydWUpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmFib3J0RHJhd2luZ18gPSBmdW5jdGlvbiBhYm9ydERyYXdpbmdfKCkge1xuICAgIHZhciBza2V0Y2hGZWF0dXJlID0gdGhpcy5za2V0Y2hGZWF0dXJlXztcbiAgICBpZiAoc2tldGNoRmVhdHVyZSB8fCB0aGlzLnNrZXRjaFBvaW50c18ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5za2V0Y2hGZWF0dXJlXyA9IG51bGw7XG4gICAgICB0aGlzLnNrZXRjaFBvaW50XyA9IG51bGw7XG4gICAgICB0aGlzLm92ZXJsYXlfLmdldFNvdXJjZSgpLmNsZWFyKHRydWUpO1xuICAgIH1cbiAgICB0aGlzLnNrZXRjaFBvaW50c18gPSBbXTtcbiAgICB0aGlzLnNldCgnZGlydHknLCBmYWxzZSk7XG4gICAgdGhpcy5zZXQoJ2RyYXdpbmcnLCBmYWxzZSk7XG4gICAgdGhpcy5zZXQoJ3ZhbGlkJywgZmFsc2UpO1xuICAgIHJldHVybiBza2V0Y2hGZWF0dXJlO1xuICB9O1xuICBfcHJvdG8udXBkYXRlU3RhdGVfID0gZnVuY3Rpb24gdXBkYXRlU3RhdGVfKCkge1xuICAgIHZhciBtYXAgPSB0aGlzLmdldE1hcCgpO1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIGlmICghbWFwIHx8ICFhY3RpdmUpIHtcbiAgICAgIHRoaXMuYWJvcnREcmF3aW5nXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0RHJhd2luZ18oKTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5Xy5zZXRNYXAoYWN0aXZlID8gbWFwIDogbnVsbCk7XG4gIH07XG4gIF9wcm90by5oYW5kbGVWaWV3Q2VudGVyQ2hhbmdlXyA9IGZ1bmN0aW9uIGhhbmRsZVZpZXdDZW50ZXJDaGFuZ2VfKGV2dCkge1xuICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgIHZhciBkcmF3aW5nID0gdGhpcy5nZXREcmF3aW5nKCk7XG4gICAgaWYgKCFhY3RpdmUgfHwgIWRyYXdpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVPclVwZGF0ZVNrZXRjaFBvaW50XygpO1xuICAgIGlmICh0aGlzLnR5cGVfID09PSAnUG9pbnQnKSB7XG4gICAgICB0aGlzLmFkZFRvRHJhd2luZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGlmeURyYXdpbmdfKCk7XG4gICAgICB0aGlzLnVwZGF0ZVNrZXRjaEZlYXR1cmVzXygpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmNyZWF0ZU9yVXBkYXRlU2tldGNoUG9pbnRfID0gZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVTa2V0Y2hQb2ludF8oKSB7XG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0Q2VudGVyXygpO1xuICAgIGlmICh0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdmFyIGdlb21ldHJ5ID0gdGhpcy5nZXRTa2V0Y2hQb2ludEdlb21ldHJ5XygpO1xuICAgICAgZ2VvbWV0cnkuc2V0Q29vcmRpbmF0ZXMoY2VudGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5za2V0Y2hQb2ludF8gPSBuZXcgb2xGZWF0dXJlKG5ldyBvbEdlb21Qb2ludChjZW50ZXIpKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by51cGRhdGVTa2V0Y2hGZWF0dXJlc18gPSBmdW5jdGlvbiB1cGRhdGVTa2V0Y2hGZWF0dXJlc18oKSB7XG4gICAgdmFyIHNrZXRjaEZlYXR1cmVzID0gW107XG4gICAgaWYgKHRoaXMuc2tldGNoRmVhdHVyZV8pIHtcbiAgICAgIHNrZXRjaEZlYXR1cmVzLnB1c2godGhpcy5za2V0Y2hGZWF0dXJlXyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgc2tldGNoRmVhdHVyZXMucHVzaCh0aGlzLnNrZXRjaFBvaW50Xyk7XG4gICAgfVxuICAgIHZhciBvdmVybGF5U291cmNlID0gdGhpcy5vdmVybGF5Xy5nZXRTb3VyY2UoKTtcbiAgICBvdmVybGF5U291cmNlLmNsZWFyKHRydWUpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXMoc2tldGNoRmVhdHVyZXMpO1xuICAgIG92ZXJsYXlTb3VyY2UuYWRkRmVhdHVyZXModGhpcy5za2V0Y2hQb2ludHNfKTtcbiAgfTtcbiAgX3Byb3RvLmdldFNrZXRjaFBvaW50R2VvbWV0cnlfID0gZnVuY3Rpb24gZ2V0U2tldGNoUG9pbnRHZW9tZXRyeV8oKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaFBvaW50Xykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHNrZXRjaFBvaW50Jyk7XG4gICAgfVxuICAgIHZhciBnZW9tZXRyeSA9IHRoaXMuc2tldGNoUG9pbnRfLmdldEdlb21ldHJ5KCk7XG4gICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2Ygb2xHZW9tUG9pbnQpIHtcbiAgICAgIHJldHVybiBnZW9tZXRyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBnZW9tZXRyeSB0eXBlJyk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZ2V0Q2VudGVyXyA9IGZ1bmN0aW9uIGdldENlbnRlcl8oKSB7XG4gICAgdmFyIGNlbnRlciA9IHRoaXMuZ2V0TWFwKCkuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjZW50ZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgY2VudGVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjZW50ZXI7XG4gIH07XG4gIHJldHVybiBfZGVmYXVsdDtcbn0ob2xJbnRlcmFjdGlvbkludGVyYWN0aW9uKTtcbmV4cG9ydCB7IF9kZWZhdWx0IGFzIGRlZmF1bHQgfTsiLCJtb2JpbGVNZWFzdXJlQXJlYUNvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybFwiXTtcbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHQsIG8pIHsgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG8ucHJvdG90eXBlKSwgdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0LCBfc2V0UHJvdG90eXBlT2YodCwgbyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZih0LCBlKSB7IHJldHVybiBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gKHQsIGUpIHsgcmV0dXJuIHQuX19wcm90b19fID0gZSwgdDsgfSwgX3NldFByb3RvdHlwZU9mKHQsIGUpOyB9XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMnO1xuaW1wb3J0IG5nZW9JbnRlcmFjdGlvbk1lYXN1cmVBcmVhTW9iaWxlIGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTWVhc3VyZUFyZWFNb2JpbGUnO1xuaW1wb3J0IHsgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIgfSBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBidWlsZFN0eWxlIH0gZnJvbSAnbmdlby9vcHRpb25zJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlQXJlYScsIFtuZ2VvTWlzY0ZpbHRlcnMubmFtZV0pO1xubXlNb2R1bGUudmFsdWUoJ2dtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmwnLCBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cnMpIHtcbiAgdmFyIHRlbXBsYXRlVXJsID0gYXR0cnMuZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZXVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvbWVhc3VyZS9hcmVhQ29tcG9uZW50Jztcbn0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL2FyZWFDb21wb25lbnQnLCByZXF1aXJlKCcuL2Jhc2VDb21wb25lbnQuaHRtbCcpKTtcbn1dKTtcbmZ1bmN0aW9uIG1vYmlsZU1lYXN1cmVBcmVhQ29tcG9uZW50KGdtZk1vYmlsZU1lYXN1cmVBcmVhVGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICAnYWN0aXZlJzogJz1nbWZNb2JpbGVNZWFzdXJlYXJlYUFjdGl2ZScsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlYXJlYU1hcCdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdHbWZNb2JpbGVNZWFzdXJlQXJlYUNvbnRyb2xsZXIgYXMgY3RybCcsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogZ21mTW9iaWxlTWVhc3VyZUFyZWFUZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVhcmVhJywgbW9iaWxlTWVhc3VyZUFyZWFDb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKF9NZWFzdWVNb2JpbGVCYXNlQ29udCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIiwgXCJnbWZNb2JpbGVNZWFzdXJlQXJlYU9wdGlvbnNcIl07XG4gIGZ1bmN0aW9uIENvbnRyb2xsZXIoJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZywgZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF90aGlzID0gX01lYXN1ZU1vYmlsZUJhc2VDb250LmNhbGwodGhpcywgJHNjb3BlLCAkZmlsdGVyLCBnZXR0ZXh0Q2F0YWxvZykgfHwgdGhpcztcbiAgICBfdGhpcy5vcHRpb25zID0gZ21mTW9iaWxlTWVhc3VyZUFyZWFPcHRpb25zO1xuICAgIF90aGlzLm1lYXN1cmUgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUFyZWFNb2JpbGUodGhpcy5maWx0ZXIoJ25nZW9Vbml0UHJlZml4JyksIHRoaXMuZ2V0dGV4dENhdGFsb2csIHtcbiAgICAgIHByZWNpc2lvbjogdGhpcy5vcHRpb25zLnByZWNpc2lvbiB8fCAyLFxuICAgICAgc2tldGNoU3R5bGU6IGJ1aWxkU3R5bGUodGhpcy5vcHRpb25zLnNrZXRjaFN0eWxlKVxuICAgIH0pO1xuICAgIF9NZWFzdWVNb2JpbGVCYXNlQ29udC5wcm90b3R5cGUuaW5pdC5jYWxsKHRoaXMpO1xuICB9O1xuICBfcHJvdG8uYWRkUG9pbnQgPSBmdW5jdGlvbiBhZGRQb2ludCgpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmFkZFRvRHJhd2luZygpO1xuICB9O1xuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICBpZiAoIXRoaXMuZHJhd0ludGVyYWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZHJhd0ludGVyYWN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuZHJhd0ludGVyYWN0aW9uLmNsZWFyRHJhd2luZygpO1xuICB9O1xuICBfcHJvdG8uZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uZmluaXNoRHJhd2luZygpO1xuICB9O1xuICBfcHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59KE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKTtcbm15TW9kdWxlLmNvbnRyb2xsZXIoJ0dtZk1vYmlsZU1lYXN1cmVBcmVhQ29udHJvbGxlcicsIENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwuZHJhd2luZyAmJiAoIWN0cmwudmFsaWQpXCIgbmctY2xpY2s9XCJjdHJsLmFkZFBvaW50KClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L3NwYW4+XFxuICB7e1xcJ1NldCBhcyBzdGFydGluZyBwb2ludFxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmRpcnR5XCIgbmctY2xpY2s9XCJjdHJsLmFkZFBvaW50KClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtcGx1c1wiPjwvc3Bhbj5cXG4gIHt7XFwnQWRkIG5ldyBwb2ludFxcJyB8IHRyYW5zbGF0ZX19XFxuPC9hPlxcbjxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmRyYXdpbmcgJiYgY3RybC52YWxpZCAmJiAhY3RybC5kaXJ0eVwiIG5nLWNsaWNrPVwiY3RybC5maW5pc2goKVwiPlxcbiAgPHNwYW4gY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvc3Bhbj5cXG4gIHt7XFwnVGVybWluYXRlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwudmFsaWRcIiBuZy1jbGljaz1cImN0cmwuY2xlYXIoKVwiPlxcbiAgPHNwYW4gY2xhc3M9XCJmYSBmYS1yZXBlYXRcIj48L3NwYW4+XFxuICB7e1xcJ0NsZWFyXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBuZy1pZj1cImN0cmwuYWN0aXZlXCIgbmctY2xpY2s9XCJjdHJsLmRlYWN0aXZhdGUoKVwiPlxcbiAgPHNwYW4gY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvc3Bhbj5cXG4gIHt7XFwnQ2xvc2VcXCcgfCB0cmFuc2xhdGV9fVxcbjwvYT5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiXTtcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHsgaW50ZXJhY3Rpb25EZWNvcmF0aW9uIH0gZnJvbSAnbmdlby9taXNjL2RlY29yYXRlJztcbmltcG9ydCBuZ2VvTWlzY0ZpbHRlcnMgZnJvbSAnbmdlby9taXNjL2ZpbHRlcnMnO1xuaW1wb3J0IHsgbGlzdGVuIH0gZnJvbSAnb2wvZXZlbnRzJztcbmltcG9ydCBNb2JpbGVEcmF3IGZyb20gJ25nZW8vaW50ZXJhY3Rpb24vTW9iaWxlRHJhdyc7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnZ21mTW9iaWxlTWVhc3VyZUJhc2UnLCBbbmdlb01pc2NGaWx0ZXJzLm5hbWVdKTtcbmV4cG9ydCBmdW5jdGlvbiBNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMuc2NvcGUgPSAkc2NvcGU7XG4gIHRoaXMuZmlsdGVyID0gJGZpbHRlcjtcbiAgdGhpcy5nZXR0ZXh0Q2F0YWxvZyA9IGdldHRleHRDYXRhbG9nO1xuICB0aGlzLm1hcCA9IG51bGw7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXMuYWN0aXZlO1xuICB9LCBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgaWYgKCFfdGhpcy5tZWFzdXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgIH1cbiAgICBfdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuICB9KTtcbiAgdGhpcy5tZWFzdXJlID0gbnVsbDtcbiAgdGhpcy5kcmF3SW50ZXJhY3Rpb24gPSBudWxsO1xuICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICB0aGlzLnZhbGlkID0gZmFsc2U7XG59XG5NZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG4gIGlmICghdGhpcy5tYXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFwJyk7XG4gIH1cbiAgaWYgKCF0aGlzLm1lYXN1cmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICB9XG4gIHRoaXMubWVhc3VyZS5zZXRBY3RpdmUodGhpcy5hY3RpdmUpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlKTtcbiAgdmFyIGRyYXdJbnRlcmFjdGlvbiA9IHRoaXMubWVhc3VyZS5nZXREcmF3SW50ZXJhY3Rpb24oKTtcbiAgaWYgKCEoZHJhd0ludGVyYWN0aW9uIGluc3RhbmNlb2YgTW9iaWxlRHJhdykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGRyYXdJbnRlcmFjdGlvbicpO1xuICB9XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24oZHJhd0ludGVyYWN0aW9uKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdoYXNQb2ludHMnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmF3SW50ZXJhY3Rpb24uZ2V0RmVhdHVyZSgpICE9PSBudWxsO1xuICAgIH1cbiAgfSk7XG4gIGxpc3RlbihkcmF3SW50ZXJhY3Rpb24sICdjaGFuZ2U6ZGlydHknLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgX3RoaXMyLmRpcnR5ID0gZHJhd0ludGVyYWN0aW9uLmdldERpcnR5KCk7XG4gICAgaWYgKF90aGlzMi5kaXJ0eSkge1xuICAgICAgX3RoaXMyLnNjb3BlLiRhcHBseSgpO1xuICAgIH1cbiAgfSwgdGhpcyk7XG4gIGxpc3RlbihkcmF3SW50ZXJhY3Rpb24sICdjaGFuZ2U6ZHJhd2luZycsIGZ1bmN0aW9uIChldnQpIHtcbiAgICBfdGhpczIuZHJhd2luZyA9IGRyYXdJbnRlcmFjdGlvbi5nZXREcmF3aW5nKCk7XG4gIH0sIHRoaXMpO1xuICBsaXN0ZW4oZHJhd0ludGVyYWN0aW9uLCAnY2hhbmdlOnZhbGlkJywgZnVuY3Rpb24gKGV2dCkge1xuICAgIF90aGlzMi52YWxpZCA9IGRyYXdJbnRlcmFjdGlvbi5nZXRWYWxpZCgpO1xuICB9LCB0aGlzKTtcbiAgdGhpcy5tYXAuYWRkSW50ZXJhY3Rpb24odGhpcy5tZWFzdXJlKTtcbn07XG5teU1vZHVsZS5jb250cm9sbGVyKCdnbWZNZWFzdWVNb2JpbGVCYXNlQ29udHJvbGxlcicsIE1lYXN1ZU1vYmlsZUJhc2VDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIm1vYmlsZU1lYXN1cmVMZW50aENvbXBvbmVudC4kaW5qZWN0ID0gW1wiZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2UodCwgbykgeyB0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoby5wcm90b3R5cGUpLCB0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHQsIF9zZXRQcm90b3R5cGVPZih0LCBvKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKHQsIGUpIHsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gdC5fX3Byb3RvX18gPSBlLCB0OyB9LCBfc2V0UHJvdG90eXBlT2YodCwgZSk7IH1cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NaXNjRmlsdGVycyBmcm9tICduZ2VvL21pc2MvZmlsdGVycyc7XG5pbXBvcnQgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aE1vYmlsZSBmcm9tICduZ2VvL2ludGVyYWN0aW9uL01lYXN1cmVMZW5ndGhNb2JpbGUnO1xuaW1wb3J0IHsgTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIgfSBmcm9tICdnbWYvbW9iaWxlL21lYXN1cmUvYmFzZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBidWlsZFN0eWxlIH0gZnJvbSAnbmdlby9vcHRpb25zJztcbnZhciBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoJywgW25nZW9NaXNjRmlsdGVycy5uYW1lXSk7XG5teU1vZHVsZS52YWx1ZSgnZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZXVybDtcbiAgcmV0dXJuIHRlbXBsYXRlVXJsICE9PSB1bmRlZmluZWQgPyB0ZW1wbGF0ZVVybCA6ICdnbWYvbWVhc3VyZS9sZW5ndGhDb21wb25lbnQnO1xufSk7XG5teU1vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24gKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnZ21mL21lYXN1cmUvbGVuZ3RoQ29tcG9uZW50JywgcmVxdWlyZSgnLi9iYXNlQ29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5mdW5jdGlvbiBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQoZ21mTW9iaWxlTWVhc3VyZUxlbmd0aFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZWxlbmd0aEFjdGl2ZScsXG4gICAgICAnbWFwJzogJz1nbWZNb2JpbGVNZWFzdXJlbGVuZ3RoTWFwJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogJ0dtZk1vYmlsZU1lYXN1cmVMZW5ndGhDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhUZW1wbGF0ZVVybCxcbiAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY29udHJvbGxlcikge1xuICAgICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb250cm9sbGVyJyk7XG4gICAgICB9XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG4gIH07XG59XG5teU1vZHVsZS5kaXJlY3RpdmUoJ2dtZk1vYmlsZU1lYXN1cmVsZW5ndGgnLCBtb2JpbGVNZWFzdXJlTGVudGhDb21wb25lbnQpO1xuZXhwb3J0IHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKF9NZWFzdWVNb2JpbGVCYXNlQ29udCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCIsIFwiZ2V0dGV4dENhdGFsb2dcIiwgXCJnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9uc1wiXTtcbiAgZnVuY3Rpb24gQ29udHJvbGxlcigkc2NvcGUsICRmaWx0ZXIsIGdldHRleHRDYXRhbG9nLCBnbWZNb2JpbGVNZWFzdXJlTGVuZ3RoT3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcbiAgICBfdGhpcyA9IF9NZWFzdWVNb2JpbGVCYXNlQ29udC5jYWxsKHRoaXMsICRzY29wZSwgJGZpbHRlciwgZ2V0dGV4dENhdGFsb2cpIHx8IHRoaXM7XG4gICAgX3RoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVMZW5ndGhPcHRpb25zO1xuICAgIF90aGlzLm1lYXN1cmUgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfaW5oZXJpdHNMb29zZShDb250cm9sbGVyLCBfTWVhc3VlTW9iaWxlQmFzZUNvbnQpO1xuICB2YXIgX3Byb3RvID0gQ29udHJvbGxlci5wcm90b3R5cGU7XG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0aGlzLm1lYXN1cmUgPSBuZXcgbmdlb0ludGVyYWN0aW9uTWVhc3VyZUxlbmd0aE1vYmlsZSh0aGlzLmZpbHRlcignbmdlb1VuaXRQcmVmaXgnKSwgdGhpcy5nZXR0ZXh0Q2F0YWxvZywge1xuICAgICAgcHJlY2lzaW9uOiB0aGlzLm9wdGlvbnMucHJlY2lzaW9uIHx8IDMsXG4gICAgICBza2V0Y2hTdHlsZTogYnVpbGRTdHlsZSh0aGlzLm9wdGlvbnMuc2tldGNoU3R5bGUpXG4gICAgfSk7XG4gICAgX01lYXN1ZU1vYmlsZUJhc2VDb250LnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG4gIH07XG4gIF9wcm90by5hZGRQb2ludCA9IGZ1bmN0aW9uIGFkZFBvaW50KCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uYWRkVG9EcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmICghdGhpcy5kcmF3SW50ZXJhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBkcmF3SW50ZXJhY3Rpb24nKTtcbiAgICB9XG4gICAgdGhpcy5kcmF3SW50ZXJhY3Rpb24uY2xlYXJEcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5maW5pc2ggPSBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgaWYgKCF0aGlzLmRyYXdJbnRlcmFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGRyYXdJbnRlcmFjdGlvbicpO1xuICAgIH1cbiAgICB0aGlzLmRyYXdJbnRlcmFjdGlvbi5maW5pc2hEcmF3aW5nKCk7XG4gIH07XG4gIF9wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oTWVhc3VlTW9iaWxlQmFzZUNvbnRyb2xsZXIpO1xubXlNb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZUxlbmd0aENvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG5vYmogfHwgKG9iaiA9IHt9KTtcbnZhciBfX3QsIF9fcCA9ICcnO1xud2l0aCAob2JqKSB7XG5fX3AgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgbmctaWY9XCJjdHJsLmFjdGl2ZVwiIG5nLWNsaWNrPVwiY3RybC5kZWFjdGl2YXRlKClcIj5cXG4gIDxzcGFuIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L3NwYW4+XFxuICB7e1xcJ0Nsb3NlXFwnIHwgdHJhbnNsYXRlfX1cXG48L2E+XFxuJztcblxufVxucmV0dXJuIF9fcFxufSIsIk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIuJGluamVjdCA9IFtcImdldHRleHRDYXRhbG9nXCIsIFwiJHNjb3BlXCIsIFwiJGZpbHRlclwiLCBcImdtZlJhc3RlclwiLCBcIm5nZW9EZWJvdW5jZVwiLCBcImdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnNcIl07XG5tb2JpbGVNZWFzdXJlUG9pbnRDb21wb25lbnQuJGluamVjdCA9IFtcImdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsXCJdO1xuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShyLCBlKSB7IHZhciB0ID0gXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIHJbU3ltYm9sLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTsgaWYgKHQpIHJldHVybiAodCA9IHQuY2FsbChyKSkubmV4dC5iaW5kKHQpOyBpZiAoQXJyYXkuaXNBcnJheShyKSB8fCAodCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyKSkgfHwgZSAmJiByICYmIFwibnVtYmVyXCIgPT0gdHlwZW9mIHIubGVuZ3RoKSB7IHQgJiYgKHIgPSB0KTsgdmFyIG8gPSAwOyByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbyA+PSByLmxlbmd0aCA/IHsgZG9uZTogITAgfSA6IHsgZG9uZTogITEsIHZhbHVlOiByW28rK10gfTsgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShyLCBhKSB7IGlmIChyKSB7IGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkociwgYSk7IHZhciB0ID0ge30udG9TdHJpbmcuY2FsbChyKS5zbGljZSg4LCAtMSk7IHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIDogdm9pZCAwOyB9IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KHIsIGEpIHsgKG51bGwgPT0gYSB8fCBhID4gci5sZW5ndGgpICYmIChhID0gci5sZW5ndGgpOyBmb3IgKHZhciBlID0gMCwgbiA9IEFycmF5KGEpOyBlIDwgYTsgZSsrKSBuW2VdID0gcltlXTsgcmV0dXJuIG47IH1cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IGdtZlJhc3RlclJhc3RlclNlcnZpY2UgZnJvbSAnZ21mL3Jhc3Rlci9SYXN0ZXJTZXJ2aWNlJztcbmltcG9ydCBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlUG9pbnRNb2JpbGUgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9NZWFzdXJlUG9pbnRNb2JpbGUnO1xuaW1wb3J0IG5nZW9NaXNjRGVib3VuY2UgZnJvbSAnbmdlby9taXNjL2RlYm91bmNlJztcbmltcG9ydCB7IGludGVyYWN0aW9uRGVjb3JhdGlvbiB9IGZyb20gJ25nZW8vbWlzYy9kZWNvcmF0ZSc7XG5pbXBvcnQgeyBsaXN0ZW4sIHVubGlzdGVuQnlLZXkgfSBmcm9tICdvbC9ldmVudHMnO1xuaW1wb3J0IE1vYmlsZURyYXcgZnJvbSAnbmdlby9pbnRlcmFjdGlvbi9Nb2JpbGVEcmF3JztcbmltcG9ydCB7IGJ1aWxkU3R5bGUgfSBmcm9tICduZ2VvL29wdGlvbnMnO1xudmFyIG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2dtZk1vYmlsZU1lYXN1cmVQb2ludCcsIFtnbWZSYXN0ZXJSYXN0ZXJTZXJ2aWNlLm5hbWUsIG5nZW9NaXNjRGVib3VuY2UubmFtZV0pO1xubXlNb2R1bGUudmFsdWUoJ2dtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsJywgZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gIHZhciB0ZW1wbGF0ZVVybCA9IGF0dHJzLmdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRldXJsO1xuICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50Jztcbn0pO1xubXlNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2dtZi9tZWFzdXJlL3BvaW50Q29tcG9uZW50JywgcmVxdWlyZSgnLi9wb2ludENvbXBvbmVudC5odG1sJykpO1xufV0pO1xuZnVuY3Rpb24gbW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50KGdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsKSB7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgJ2FjdGl2ZSc6ICc9Z21mTW9iaWxlTWVhc3VyZXBvaW50QWN0aXZlJyxcbiAgICAgICdtYXAnOiAnPWdtZk1vYmlsZU1lYXN1cmVwb2ludE1hcCdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6ICdHbWZNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyIGFzIGN0cmwnLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IGdtZk1vYmlsZU1lYXN1cmVQb2ludFRlbXBsYXRlVXJsLFxuICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBjb250cm9sbGVyKSB7XG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGNvbnRyb2xsZXInKTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIH1cbiAgfTtcbn1cbm15TW9kdWxlLmRpcmVjdGl2ZSgnZ21mTW9iaWxlTWVhc3VyZXBvaW50JywgbW9iaWxlTWVhc3VyZVBvaW50Q29tcG9uZW50KTtcbmV4cG9ydCBmdW5jdGlvbiBNb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyKGdldHRleHRDYXRhbG9nLCAkc2NvcGUsICRmaWx0ZXIsIGdtZlJhc3Rlciwgbmdlb0RlYm91bmNlLCBnbWZNb2JpbGVNZWFzdXJlUG9pbnRPcHRpb25zKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMub3B0aW9ucyA9IGdtZk1vYmlsZU1lYXN1cmVQb2ludE9wdGlvbnM7XG4gIHRoaXMuZ21mUmFzdGVyXyA9IGdtZlJhc3RlcjtcbiAgdGhpcy5uZ2VvRGVib3VuY2VfID0gbmdlb0RlYm91bmNlO1xuICB0aGlzLmdldHRleHRDYXRhbG9nXyA9IGdldHRleHRDYXRhbG9nO1xuICB0aGlzLiRmaWx0ZXJfID0gJGZpbHRlcjtcbiAgdGhpcy5tYXAgPSBudWxsO1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXMuYWN0aXZlO1xuICB9LCBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgaWYgKCFfdGhpcy5tZWFzdXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWVhc3VyZScpO1xuICAgIH1cbiAgICBfdGhpcy5tZWFzdXJlLnNldEFjdGl2ZShuZXdWYWwpO1xuICAgIF90aGlzLmhhbmRsZU1lYXN1cmVBY3RpdmVDaGFuZ2VfKCk7XG4gIH0pO1xuICB0aGlzLm1lYXN1cmUgPSBudWxsO1xuICB0aGlzLmRyYXdJbnRlcmFjdGlvbiA9IG51bGw7XG4gIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbn1cbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubWVhc3VyZSA9IG5ldyBuZ2VvSW50ZXJhY3Rpb25NZWFzdXJlUG9pbnRNb2JpbGUodGhpcy4kZmlsdGVyXygnbmdlb051bWJlckNvb3JkaW5hdGVzJyksIHRoaXMub3B0aW9ucy5mb3JtYXQsIHtcbiAgICBkZWNpbWFsczogdGhpcy5vcHRpb25zLmRlY2ltYWxzLFxuICAgIHNrZXRjaFN0eWxlOiBidWlsZFN0eWxlKHRoaXMub3B0aW9ucy5za2V0Y2hTdHlsZSlcbiAgfSk7XG4gIHRoaXMubWVhc3VyZS5zZXRBY3RpdmUodGhpcy5hY3RpdmUpO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5tZWFzdXJlKTtcbiAgdmFyIGRyYXdJbnRlcmFjdGlvbiA9IHRoaXMubWVhc3VyZS5nZXREcmF3SW50ZXJhY3Rpb24oKTtcbiAgaWYgKCEoZHJhd0ludGVyYWN0aW9uIGluc3RhbmNlb2YgTW9iaWxlRHJhdykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIGRyYXdJbnRlcmFjdGlvbicpO1xuICB9XG4gIHRoaXMuZHJhd0ludGVyYWN0aW9uID0gZHJhd0ludGVyYWN0aW9uO1xuICBpbnRlcmFjdGlvbkRlY29yYXRpb24odGhpcy5kcmF3SW50ZXJhY3Rpb24pO1xuICBpZiAoIXRoaXMubWFwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hcCcpO1xuICB9XG4gIHRoaXMubWFwLmFkZEludGVyYWN0aW9uKHRoaXMubWVhc3VyZSk7XG59O1xuTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlci5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbn07XG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS50cmFuc2xhdGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiB0aGlzLmdldHRleHRDYXRhbG9nXy5nZXRTdHJpbmcoc3RyKTtcbn07XG5Nb2JpbGVNZWFzdXJlUG9pbnRDb250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVNZWFzdXJlQWN0aXZlQ2hhbmdlXyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICBpZiAoIXRoaXMubWVhc3VyZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZWFzdXJlJyk7XG4gIH1cbiAgaWYgKHRoaXMubWVhc3VyZS5nZXRBY3RpdmUoKSkge1xuICAgIHZhciB2aWV3ID0gdGhpcy5tYXAuZ2V0VmlldygpO1xuICAgIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbGlzdGVuKHZpZXcsICdwcm9wZXJ0eWNoYW5nZScsIHRoaXMubmdlb0RlYm91bmNlXyh0aGlzLmdldE1lYXN1cmVfLmJpbmQodGhpcyksIDMwMCwgdHJ1ZSksIHRoaXMpO1xuICAgIHRoaXMuZ2V0TWVhc3VyZV8oKTtcbiAgfSBlbHNlIGlmICh0aGlzLm1hcFZpZXdQcm9wZXJ0eUNoYW5nZUV2ZW50S2V5Xykge1xuICAgIHVubGlzdGVuQnlLZXkodGhpcy5tYXBWaWV3UHJvcGVydHlDaGFuZ2VFdmVudEtleV8pO1xuICAgIHRoaXMubWFwVmlld1Byb3BlcnR5Q2hhbmdlRXZlbnRLZXlfID0gbnVsbDtcbiAgfVxufTtcbk1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIucHJvdG90eXBlLmdldE1lYXN1cmVfID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcbiAgaWYgKCF0aGlzLm1hcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYXAnKTtcbiAgfVxuICB2YXIgY2VudGVyID0gdGhpcy5tYXAuZ2V0VmlldygpLmdldENlbnRlcigpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoY2VudGVyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgY2VudGVyJyk7XG4gIH1cbiAgaWYgKCF0aGlzLm9wdGlvbnMucmFzdGVyTGF5ZXJzIHx8IHRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwYXJhbXMgPSB7XG4gICAgJ2xheWVycyc6IHRoaXMub3B0aW9ucy5yYXN0ZXJMYXllcnMubWFwKGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25maWcubmFtZTtcbiAgICB9KS5qb2luKCcsJylcbiAgfTtcbiAgdGhpcy5nbWZSYXN0ZXJfLmdldFJhc3RlcihjZW50ZXIsIHBhcmFtcykudGhlbihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgaWYgKCFfdGhpczIubWVhc3VyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1lYXN1cmUnKTtcbiAgICB9XG4gICAgdmFyIGVsID0gX3RoaXMyLm1lYXN1cmUuZ2V0VG9vbHRpcEVsZW1lbnQoKTtcbiAgICB2YXIgY3RuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGNsYXNzTmFtZSA9ICdnbWYtbW9iaWxlLW1lYXN1cmUtcG9pbnQnO1xuICAgIGN0bi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShfdGhpczIub3B0aW9ucy5yYXN0ZXJMYXllcnMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgdmFyIGNvbmZpZyA9IF9zdGVwLnZhbHVlO1xuICAgICAgdmFyIGtleSA9IGNvbmZpZy5uYW1lO1xuICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICAgIHZhciBjaGlsZEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNoaWxkRWwuY2xhc3NOYW1lID0gXCJnbWYtbW9iaWxlLW1lYXN1cmUtcG9pbnQtXCIgKyBrZXk7XG4gICAgICAgIHZhciB1bml0ID0gY29uZmlnLnVuaXQgfHwgJyc7XG4gICAgICAgIHZhciBkZWNpbWFscyA9IGNvbmZpZy5kZWNpbWFscyA+IDAgPyBjb25maWcuZGVjaW1hbHMgOiAwO1xuICAgICAgICB2YWx1ZSA9IF90aGlzMi4kZmlsdGVyXygnbnVtYmVyJykodmFsdWUsIGRlY2ltYWxzKTtcbiAgICAgICAgY2hpbGRFbC5pbm5lckhUTUwgPSBbX3RoaXMyLnRyYW5zbGF0ZShrZXkpLCAnOiAnLCB2YWx1ZSwgJyAnLCB1bml0XS5qb2luKCcnKTtcbiAgICAgICAgY3RuLmFwcGVuZENoaWxkKGNoaWxkRWwpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcHJldmlvdXNDdG4gPSBlbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgaWYgKHByZXZpb3VzQ3RuWzBdKSB7XG4gICAgICBwcmV2aW91c0N0blswXS5yZW1vdmUoKTtcbiAgICB9XG4gICAgZWwuYXBwZW5kQ2hpbGQoY3RuKTtcbiAgfSk7XG59O1xubXlNb2R1bGUuY29udHJvbGxlcignR21mTW9iaWxlTWVhc3VyZVBvaW50Q29udHJvbGxlcicsIE1vYmlsZU1lYXN1cmVQb2ludENvbnRyb2xsZXIpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9SQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9