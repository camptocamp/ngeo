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
/******/ 		"mapfishprint": 0
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
/******/ 	deferredModules.push([22,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/mapfishprint.js":
/*!**********************************!*\
  !*** ./examples/mapfishprint.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url.js */ "./examples/url.js");
/* harmony import */ var _geoblocks_proj_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @geoblocks/proj/EPSG_2056.js */ "./node_modules/@geoblocks/proj/src/EPSG_2056.js");
/* harmony import */ var ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/print/Service.js */ "./src/print/Service.js");
/* harmony import */ var ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/print/Utils.js */ "./src/print/Utils.js");
/* harmony import */ var ngeo_print_Mask_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngeo/print/Mask.js */ "./src/print/Mask.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/format/GeoJSON.js */ "./node_modules/ol/format/GeoJSON.js");
/* harmony import */ var ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/layer/Image.js */ "./node_modules/ol/layer/Image.js");
/* harmony import */ var ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Vector.js */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/source/ImageWMS.js */ "./node_modules/ol/source/ImageWMS.js");
/* harmony import */ var ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/source/Vector.js */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

















/** @type {angular.IModule} **/
const appmodule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('app', [
  'gettext',
  ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_13__["default"].name,
  ngeo_print_Service_js__WEBPACK_IMPORTED_MODULE_3__["default"].name,
  ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].name,
]);

/**
 * @private
 * @hidden
 */
const PRINT_SCALES_ = [100, 250, 500, 2500, 5000, 10000, 25000, 50000, 100000, 500000];

/**
 * @private
 * @hidden
 */
const PRINT_FORMAT_ = 'pdf';

/**
 * @private
 * @hidden
 */
const PRINT_LAYOUT_ = '1 A4 portrait';

/**
 * @private
 * @hidden
 */
const PRINT_DPI_ = 72;

/**
 * @private
 * @hidden
 * @type {import('ol/size.js').Size}
 */
const PRINT_PAPER_SIZE_ = [555, 675];

/**
 * @constructor
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {import("ngeo/print/Service.js").CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {import("ngeo/print/Utils.js").PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @ngInject
 * @hidden
 */
function MainController($timeout, ngeoCreatePrint, ngeoPrintUtils) {
  const source = new ol_source_ImageWMS_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
    url: _url_js__WEBPACK_IMPORTED_MODULE_1__["MAPSERVER_PROXY"],
    params: {
      'LAYERS': 'default',
    },
    serverType: 'mapserver',
  });
  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    layers: [
      new ol_layer_Image_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        source,
      }),
      new ol_layer_Vector_js__WEBPACK_IMPORTED_MODULE_10__["default"]({
        source: new ol_source_Vector_js__WEBPACK_IMPORTED_MODULE_12__["default"]({
          url: 'data/polygon-swizerland.json',
          format: new ol_format_GeoJSON_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
            dataProjection: _geoblocks_proj_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__["default"],
          }),
        }),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
      projection: _geoblocks_proj_EPSG_2056_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      resolutions: [200, 100, 50, 20, 10, 5, 2.5, 2, 1],
      center: [2537635, 1152640],
      zoom: 3,
    }),
  });

  /**
   * Text to display a "loading" message while waiting for the report.
   * @type {string}
   */
  this.printState = '';

  /**
   * @type {angular.ITimeoutService}
   */
  this.$timeout_ = $timeout;

  /**
   * @type {import("ngeo/print/Service.js").PrintService}
   */
  this.print_ = ngeoCreatePrint(_url_js__WEBPACK_IMPORTED_MODULE_1__["PRINT_PROXY"]);

  /**
   * @type {import("ngeo/print/Utils.js").PrintUtils}
   */
  this.printUtils_ = ngeoPrintUtils;

  this.maskLayer_ = new ngeo_print_Mask_js__WEBPACK_IMPORTED_MODULE_5__["default"]();

  this.maskLayer_.getSize = () => PRINT_PAPER_SIZE_;
  this.maskLayer_.getScale = (frameState) => {
    const mapSize = frameState.size;
    const mapResolution = frameState.viewState.resolution;
    // we test mapSize and mapResolution just to please the compiler
    if (mapSize !== undefined && mapResolution !== undefined) {
      return ngeoPrintUtils.getOptimalScale(mapSize, mapResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_);
    } else {
      return PRINT_SCALES_[0];
    }
  };
  this.map.addLayer(this.maskLayer_);
}

/**
 */
MainController.prototype.print = function () {
  const map = this.map;

  const mapSize = map.getSize();
  const viewResolution = map.getView().getResolution();

  // we test mapSize and viewResolution just to please the compiler
  const scale =
    mapSize !== undefined && viewResolution !== undefined
      ? this.printUtils_.getOptimalScale(mapSize, viewResolution, PRINT_PAPER_SIZE_, PRINT_SCALES_)
      : PRINT_SCALES_[0];

  const rotation = map.getView().getRotation();
  const dpi = PRINT_DPI_;
  const format = PRINT_FORMAT_;
  const layout = PRINT_LAYOUT_;

  this.printState = 'Printing...';

  const spec = this.print_.createSpec(map, scale, rotation, dpi, layout, format, {
    'datasource': [],
    'debug': 0,
    'comments': 'My comments',
    'title': 'My print',
  });

  this.print_
    .createReport(spec)
    .then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintReportResponse>} resp
 *    Response.
 */
MainController.prototype.handleCreateReportSuccess_ = function (resp) {
  this.getStatus_(resp.data.ref);
};

/**
 * @param {string} ref Ref.
 */
MainController.prototype.getStatus_ = function (ref) {
  this.print_
    .getStatus(ref)
    .then(this.handleGetStatusSuccess_.bind(this, ref), this.handleGetStatusError_.bind(this));
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleCreateReportError_ = function (resp) {
  this.printState = 'Print error';
};

/**
 * @param {string} ref Ref.
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleGetStatusSuccess_ = function (ref, resp) {
  const mfResp = resp.data;
  const done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    this.printState = '';
    window.location.href = this.print_.getReportUrl(ref);
  } else {
    // The report is not ready yet. Check again in 1s.
    this.$timeout_(
      () => {
        this.getStatus_(ref);
      },
      1000,
      false
    );
  }
};

/**
 * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintStatusResponse>} resp
 *    Response.
 */
MainController.prototype.handleGetStatusError_ = function (resp) {
  this.printState = 'Print error';
};

appmodule.controller('MainController', MainController);

appmodule.constant('ngeoTilesPreloadingLimit', 0);

/* harmony default export */ __webpack_exports__["default"] = (module);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/print/Mask.js":
/*!***************************!*\
  !*** ./src/print/Mask.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mask; });
/* harmony import */ var ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/layer/Layer.js */ "./node_modules/ol/layer/Layer.js");
/* harmony import */ var ol_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/dom.js */ "./node_modules/ol/dom.js");
/* harmony import */ var ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/print/Utils.js */ "./src/print/Utils.js");
/* harmony import */ var ol_math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/math.js */ "./node_modules/ol/math.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Mask = function (_Layer) {
  _inheritsLoose(Mask, _Layer);

  function Mask(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Layer.call(this, options) || this;
    _this.context_ = Object(ol_dom_js__WEBPACK_IMPORTED_MODULE_1__["createCanvasContext2D"])();
    _this.context_.canvas.style.opacity = '0.5';
    _this.context_.canvas.style.position = 'absolute';
    _this.getScale;
    _this.getSize;
    _this.getRotation;
    return _this;
  }

  var _proto = Mask.prototype;

  _proto.render = function render(frameState) {
    var cwidth = frameState.size[0];
    this.context_.canvas.width = cwidth;
    var cheight = frameState.size[1];
    this.context_.canvas.height = cheight;
    var center = [cwidth / 2, cheight / 2];
    this.context_.beginPath();
    this.context_.moveTo(0, 0);
    this.context_.lineTo(cwidth, 0);
    this.context_.lineTo(cwidth, cheight);
    this.context_.lineTo(0, cheight);
    this.context_.lineTo(0, 0);
    this.context_.closePath();
    var size = this.getSize();
    var height = size[1];
    var width = size[0];
    var scale = this.getScale(frameState);
    var resolution = frameState.viewState.resolution;
    var extentHalfWidth = width / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["DOTS_PER_INCH"] / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["INCHES_PER_METER"] * scale / resolution / 2;
    var extentHalfHeight = height / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["DOTS_PER_INCH"] / ngeo_print_Utils_js__WEBPACK_IMPORTED_MODULE_2__["INCHES_PER_METER"] * scale / resolution / 2;
    var rotation = this.getRotation !== undefined ? Object(ol_math_js__WEBPACK_IMPORTED_MODULE_3__["toRadians"])(this.getRotation()) : 0;
    var diagonal = Math.sqrt(Math.pow(extentHalfWidth, 2) + Math.pow(extentHalfHeight, 2));
    var gamma = Math.atan(extentHalfHeight / extentHalfWidth) - rotation;
    var omega = Math.atan(extentHalfWidth / extentHalfHeight) - rotation;
    var x1 = center[0] - Math.cos(gamma) * diagonal;
    var y1 = center[1] + Math.sin(gamma) * diagonal;
    var x2 = center[0] + Math.sin(omega) * diagonal;
    var y2 = center[1] + Math.cos(omega) * diagonal;
    var x3 = center[0] + Math.cos(gamma) * diagonal;
    var y3 = center[1] - Math.sin(gamma) * diagonal;
    var x4 = center[0] - Math.sin(omega) * diagonal;
    var y4 = center[1] - Math.cos(omega) * diagonal;
    this.context_.moveTo(x1, y1);
    this.context_.lineTo(x2, y2);
    this.context_.lineTo(x3, y3);
    this.context_.lineTo(x4, y4);
    this.context_.lineTo(x1, y1);
    this.context_.closePath();
    this.context_.fillStyle = '#000';
    this.context_.fill();
    return this.context_.canvas;
  };

  return Mask;
}(ol_layer_Layer_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ 22:
/*!*********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/mapfishprint.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/mapfishprint.js */"./examples/mapfishprint.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwZmlzaHByaW50LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL2V4YW1wbGVzL21hcGZpc2hwcmludC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpbnQvTWFzay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFwZmlzaHByaW50XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0Ly8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4gXHQvLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoKSB7XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFsyMixcImNvbW1vbnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyMSBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCB7TUFQU0VSVkVSX1BST1hZLCBQUklOVF9QUk9YWX0gZnJvbSAnLi91cmwuanMnO1xuaW1wb3J0IEVQU0cyMDU2IGZyb20gJ0BnZW9ibG9ja3MvcHJvai9FUFNHXzIwNTYuanMnO1xuXG5pbXBvcnQgbmdlb1ByaW50U2VydmljZSBmcm9tICduZ2VvL3ByaW50L1NlcnZpY2UuanMnO1xuaW1wb3J0IG5nZW9QcmludFV0aWxzIGZyb20gJ25nZW8vcHJpbnQvVXRpbHMuanMnO1xuaW1wb3J0IE1hc2tMYXllciBmcm9tICduZ2VvL3ByaW50L01hc2suanMnO1xuaW1wb3J0IG9sTWFwIGZyb20gJ29sL01hcC5qcyc7XG5pbXBvcnQgb2xWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTi5qcyc7XG5pbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlLmpzJztcbmltcG9ydCBvbExheWVyVmVjdG9yIGZyb20gJ29sL2xheWVyL1ZlY3Rvci5qcyc7XG5pbXBvcnQgb2xTb3VyY2VJbWFnZVdNUyBmcm9tICdvbC9zb3VyY2UvSW1hZ2VXTVMuanMnO1xuaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3IuanMnO1xuaW1wb3J0IG5nZW9NYXBNb2R1bGUgZnJvbSAnbmdlby9tYXAvbW9kdWxlLmpzJztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgYXBwbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ2dldHRleHQnLFxuICBuZ2VvTWFwTW9kdWxlLm5hbWUsXG4gIG5nZW9QcmludFNlcnZpY2UubmFtZSxcbiAgbmdlb1ByaW50VXRpbHMubmFtZSxcbl0pO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX1NDQUxFU18gPSBbMTAwLCAyNTAsIDUwMCwgMjUwMCwgNTAwMCwgMTAwMDAsIDI1MDAwLCA1MDAwMCwgMTAwMDAwLCA1MDAwMDBdO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX0ZPUk1BVF8gPSAncGRmJztcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5jb25zdCBQUklOVF9MQVlPVVRfID0gJzEgQTQgcG9ydHJhaXQnO1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IFBSSU5UX0RQSV8gPSA3MjtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICogQHR5cGUge2ltcG9ydCgnb2wvc2l6ZS5qcycpLlNpemV9XG4gKi9cbmNvbnN0IFBSSU5UX1BBUEVSX1NJWkVfID0gWzU1NSwgNjc1XTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7YW5ndWxhci5JVGltZW91dFNlcnZpY2V9ICR0aW1lb3V0IEFuZ3VsYXIgdGltZW91dCBzZXJ2aWNlLlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL3ByaW50L1NlcnZpY2UuanNcIikuQ3JlYXRlUHJpbnR9IG5nZW9DcmVhdGVQcmludCBUaGUgbmdlbyBDcmVhdGUgUHJpbnQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge2ltcG9ydChcIm5nZW8vcHJpbnQvVXRpbHMuanNcIikuUHJpbnRVdGlsc30gbmdlb1ByaW50VXRpbHMgVGhlIG5nZW8gUHJpbnRVdGlscyBzZXJ2aWNlLlxuICogQG5nSW5qZWN0XG4gKiBAaGlkZGVuXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCR0aW1lb3V0LCBuZ2VvQ3JlYXRlUHJpbnQsIG5nZW9QcmludFV0aWxzKSB7XG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBvbFNvdXJjZUltYWdlV01TKHtcbiAgICB1cmw6IE1BUFNFUlZFUl9QUk9YWSxcbiAgICBwYXJhbXM6IHtcbiAgICAgICdMQVlFUlMnOiAnZGVmYXVsdCcsXG4gICAgfSxcbiAgICBzZXJ2ZXJUeXBlOiAnbWFwc2VydmVyJyxcbiAgfSk7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwib2wvTWFwLmpzXCIpLmRlZmF1bHR9XG4gICAqL1xuICB0aGlzLm1hcCA9IG5ldyBvbE1hcCh7XG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgb2xMYXllckltYWdlKHtcbiAgICAgICAgc291cmNlLFxuICAgICAgfSksXG4gICAgICBuZXcgb2xMYXllclZlY3Rvcih7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlVmVjdG9yKHtcbiAgICAgICAgICB1cmw6ICdkYXRhL3BvbHlnb24tc3dpemVybGFuZC5qc29uJyxcbiAgICAgICAgICBmb3JtYXQ6IG5ldyBvbEZvcm1hdEdlb0pTT04oe1xuICAgICAgICAgICAgZGF0YVByb2plY3Rpb246IEVQU0cyMDU2LFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgdmlldzogbmV3IG9sVmlldyh7XG4gICAgICBwcm9qZWN0aW9uOiBFUFNHMjA1NixcbiAgICAgIHJlc29sdXRpb25zOiBbMjAwLCAxMDAsIDUwLCAyMCwgMTAsIDUsIDIuNSwgMiwgMV0sXG4gICAgICBjZW50ZXI6IFsyNTM3NjM1LCAxMTUyNjQwXSxcbiAgICAgIHpvb206IDMsXG4gICAgfSksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUZXh0IHRvIGRpc3BsYXkgYSBcImxvYWRpbmdcIiBtZXNzYWdlIHdoaWxlIHdhaXRpbmcgZm9yIHRoZSByZXBvcnQuXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLnByaW50U3RhdGUgPSAnJztcblxuICAvKipcbiAgICogQHR5cGUge2FuZ3VsYXIuSVRpbWVvdXRTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy4kdGltZW91dF8gPSAkdGltZW91dDtcblxuICAvKipcbiAgICogQHR5cGUge2ltcG9ydChcIm5nZW8vcHJpbnQvU2VydmljZS5qc1wiKS5QcmludFNlcnZpY2V9XG4gICAqL1xuICB0aGlzLnByaW50XyA9IG5nZW9DcmVhdGVQcmludChQUklOVF9QUk9YWSk7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJuZ2VvL3ByaW50L1V0aWxzLmpzXCIpLlByaW50VXRpbHN9XG4gICAqL1xuICB0aGlzLnByaW50VXRpbHNfID0gbmdlb1ByaW50VXRpbHM7XG5cbiAgdGhpcy5tYXNrTGF5ZXJfID0gbmV3IE1hc2tMYXllcigpO1xuXG4gIHRoaXMubWFza0xheWVyXy5nZXRTaXplID0gKCkgPT4gUFJJTlRfUEFQRVJfU0laRV87XG4gIHRoaXMubWFza0xheWVyXy5nZXRTY2FsZSA9IChmcmFtZVN0YXRlKSA9PiB7XG4gICAgY29uc3QgbWFwU2l6ZSA9IGZyYW1lU3RhdGUuc2l6ZTtcbiAgICBjb25zdCBtYXBSZXNvbHV0aW9uID0gZnJhbWVTdGF0ZS52aWV3U3RhdGUucmVzb2x1dGlvbjtcbiAgICAvLyB3ZSB0ZXN0IG1hcFNpemUgYW5kIG1hcFJlc29sdXRpb24ganVzdCB0byBwbGVhc2UgdGhlIGNvbXBpbGVyXG4gICAgaWYgKG1hcFNpemUgIT09IHVuZGVmaW5lZCAmJiBtYXBSZXNvbHV0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBuZ2VvUHJpbnRVdGlscy5nZXRPcHRpbWFsU2NhbGUobWFwU2l6ZSwgbWFwUmVzb2x1dGlvbiwgUFJJTlRfUEFQRVJfU0laRV8sIFBSSU5UX1NDQUxFU18pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUFJJTlRfU0NBTEVTX1swXTtcbiAgICB9XG4gIH07XG4gIHRoaXMubWFwLmFkZExheWVyKHRoaXMubWFza0xheWVyXyk7XG59XG5cbi8qKlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUucHJpbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG1hcCA9IHRoaXMubWFwO1xuXG4gIGNvbnN0IG1hcFNpemUgPSBtYXAuZ2V0U2l6ZSgpO1xuICBjb25zdCB2aWV3UmVzb2x1dGlvbiA9IG1hcC5nZXRWaWV3KCkuZ2V0UmVzb2x1dGlvbigpO1xuXG4gIC8vIHdlIHRlc3QgbWFwU2l6ZSBhbmQgdmlld1Jlc29sdXRpb24ganVzdCB0byBwbGVhc2UgdGhlIGNvbXBpbGVyXG4gIGNvbnN0IHNjYWxlID1cbiAgICBtYXBTaXplICE9PSB1bmRlZmluZWQgJiYgdmlld1Jlc29sdXRpb24gIT09IHVuZGVmaW5lZFxuICAgICAgPyB0aGlzLnByaW50VXRpbHNfLmdldE9wdGltYWxTY2FsZShtYXBTaXplLCB2aWV3UmVzb2x1dGlvbiwgUFJJTlRfUEFQRVJfU0laRV8sIFBSSU5UX1NDQUxFU18pXG4gICAgICA6IFBSSU5UX1NDQUxFU19bMF07XG5cbiAgY29uc3Qgcm90YXRpb24gPSBtYXAuZ2V0VmlldygpLmdldFJvdGF0aW9uKCk7XG4gIGNvbnN0IGRwaSA9IFBSSU5UX0RQSV87XG4gIGNvbnN0IGZvcm1hdCA9IFBSSU5UX0ZPUk1BVF87XG4gIGNvbnN0IGxheW91dCA9IFBSSU5UX0xBWU9VVF87XG5cbiAgdGhpcy5wcmludFN0YXRlID0gJ1ByaW50aW5nLi4uJztcblxuICBjb25zdCBzcGVjID0gdGhpcy5wcmludF8uY3JlYXRlU3BlYyhtYXAsIHNjYWxlLCByb3RhdGlvbiwgZHBpLCBsYXlvdXQsIGZvcm1hdCwge1xuICAgICdkYXRhc291cmNlJzogW10sXG4gICAgJ2RlYnVnJzogMCxcbiAgICAnY29tbWVudHMnOiAnTXkgY29tbWVudHMnLFxuICAgICd0aXRsZSc6ICdNeSBwcmludCcsXG4gIH0pO1xuXG4gIHRoaXMucHJpbnRfXG4gICAgLmNyZWF0ZVJlcG9ydChzcGVjKVxuICAgIC50aGVuKHRoaXMuaGFuZGxlQ3JlYXRlUmVwb3J0U3VjY2Vzc18uYmluZCh0aGlzKSwgdGhpcy5oYW5kbGVDcmVhdGVSZXBvcnRFcnJvcl8uYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnbmdlby9wcmludC9tYXBmaXNoLXByaW50LXYzLmpzJykuTWFwRmlzaFByaW50UmVwb3J0UmVzcG9uc2U+fSByZXNwXG4gKiAgICBSZXNwb25zZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUNyZWF0ZVJlcG9ydFN1Y2Nlc3NfID0gZnVuY3Rpb24gKHJlc3ApIHtcbiAgdGhpcy5nZXRTdGF0dXNfKHJlc3AuZGF0YS5yZWYpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIFJlZi5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmdldFN0YXR1c18gPSBmdW5jdGlvbiAocmVmKSB7XG4gIHRoaXMucHJpbnRfXG4gICAgLmdldFN0YXR1cyhyZWYpXG4gICAgLnRoZW4odGhpcy5oYW5kbGVHZXRTdGF0dXNTdWNjZXNzXy5iaW5kKHRoaXMsIHJlZiksIHRoaXMuaGFuZGxlR2V0U3RhdHVzRXJyb3JfLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUh0dHBSZXNwb25zZTxpbXBvcnQoJ25nZW8vcHJpbnQvbWFwZmlzaC1wcmludC12My5qcycpLk1hcEZpc2hQcmludFN0YXR1c1Jlc3BvbnNlPn0gcmVzcFxuICogICAgUmVzcG9uc2UuXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS5oYW5kbGVDcmVhdGVSZXBvcnRFcnJvcl8gPSBmdW5jdGlvbiAocmVzcCkge1xuICB0aGlzLnByaW50U3RhdGUgPSAnUHJpbnQgZXJyb3InO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIFJlZi5cbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnbmdlby9wcmludC9tYXBmaXNoLXByaW50LXYzLmpzJykuTWFwRmlzaFByaW50U3RhdHVzUmVzcG9uc2U+fSByZXNwXG4gKiAgICBSZXNwb25zZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldFN0YXR1c1N1Y2Nlc3NfID0gZnVuY3Rpb24gKHJlZiwgcmVzcCkge1xuICBjb25zdCBtZlJlc3AgPSByZXNwLmRhdGE7XG4gIGNvbnN0IGRvbmUgPSBtZlJlc3AuZG9uZTtcbiAgaWYgKGRvbmUpIHtcbiAgICAvLyBUaGUgcmVwb3J0IGlzIHJlYWR5LiBPcGVuIGl0IGJ5IGNoYW5naW5nIHRoZSB3aW5kb3cgbG9jYXRpb24uXG4gICAgdGhpcy5wcmludFN0YXRlID0gJyc7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLnByaW50Xy5nZXRSZXBvcnRVcmwocmVmKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgcmVwb3J0IGlzIG5vdCByZWFkeSB5ZXQuIENoZWNrIGFnYWluIGluIDFzLlxuICAgIHRoaXMuJHRpbWVvdXRfKFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmdldFN0YXR1c18ocmVmKTtcbiAgICAgIH0sXG4gICAgICAxMDAwLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JSHR0cFJlc3BvbnNlPGltcG9ydCgnbmdlby9wcmludC9tYXBmaXNoLXByaW50LXYzLmpzJykuTWFwRmlzaFByaW50U3RhdHVzUmVzcG9uc2U+fSByZXNwXG4gKiAgICBSZXNwb25zZS5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhbmRsZUdldFN0YXR1c0Vycm9yXyA9IGZ1bmN0aW9uIChyZXNwKSB7XG4gIHRoaXMucHJpbnRTdGF0ZSA9ICdQcmludCBlcnJvcic7XG59O1xuXG5hcHBtb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5cbmFwcG1vZHVsZS5jb25zdGFudCgnbmdlb1RpbGVzUHJlbG9hZGluZ0xpbWl0JywgMCk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTtcbiIsImZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnb2wvbGF5ZXIvTGF5ZXIuanMnO1xuaW1wb3J0IHsgY3JlYXRlQ2FudmFzQ29udGV4dDJEIH0gZnJvbSAnb2wvZG9tLmpzJztcbmltcG9ydCB7IElOQ0hFU19QRVJfTUVURVIsIERPVFNfUEVSX0lOQ0ggfSBmcm9tICduZ2VvL3ByaW50L1V0aWxzLmpzJztcbmltcG9ydCB7IHRvUmFkaWFucyB9IGZyb20gJ29sL21hdGguanMnO1xuXG52YXIgTWFzayA9IGZ1bmN0aW9uIChfTGF5ZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoTWFzaywgX0xheWVyKTtcblxuICBmdW5jdGlvbiBNYXNrKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgX3RoaXMgPSBfTGF5ZXIuY2FsbCh0aGlzLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgIF90aGlzLmNvbnRleHRfID0gY3JlYXRlQ2FudmFzQ29udGV4dDJEKCk7XG4gICAgX3RoaXMuY29udGV4dF8uY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICBfdGhpcy5jb250ZXh0Xy5jYW52YXMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIF90aGlzLmdldFNjYWxlO1xuICAgIF90aGlzLmdldFNpemU7XG4gICAgX3RoaXMuZ2V0Um90YXRpb247XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE1hc2sucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoZnJhbWVTdGF0ZSkge1xuICAgIHZhciBjd2lkdGggPSBmcmFtZVN0YXRlLnNpemVbMF07XG4gICAgdGhpcy5jb250ZXh0Xy5jYW52YXMud2lkdGggPSBjd2lkdGg7XG4gICAgdmFyIGNoZWlnaHQgPSBmcmFtZVN0YXRlLnNpemVbMV07XG4gICAgdGhpcy5jb250ZXh0Xy5jYW52YXMuaGVpZ2h0ID0gY2hlaWdodDtcbiAgICB2YXIgY2VudGVyID0gW2N3aWR0aCAvIDIsIGNoZWlnaHQgLyAyXTtcbiAgICB0aGlzLmNvbnRleHRfLmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dF8ubW92ZVRvKDAsIDApO1xuICAgIHRoaXMuY29udGV4dF8ubGluZVRvKGN3aWR0aCwgMCk7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oY3dpZHRoLCBjaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHRfLmxpbmVUbygwLCBjaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHRfLmxpbmVUbygwLCAwKTtcbiAgICB0aGlzLmNvbnRleHRfLmNsb3NlUGF0aCgpO1xuICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgdmFyIGhlaWdodCA9IHNpemVbMV07XG4gICAgdmFyIHdpZHRoID0gc2l6ZVswXTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLmdldFNjYWxlKGZyYW1lU3RhdGUpO1xuICAgIHZhciByZXNvbHV0aW9uID0gZnJhbWVTdGF0ZS52aWV3U3RhdGUucmVzb2x1dGlvbjtcbiAgICB2YXIgZXh0ZW50SGFsZldpZHRoID0gd2lkdGggLyBET1RTX1BFUl9JTkNIIC8gSU5DSEVTX1BFUl9NRVRFUiAqIHNjYWxlIC8gcmVzb2x1dGlvbiAvIDI7XG4gICAgdmFyIGV4dGVudEhhbGZIZWlnaHQgPSBoZWlnaHQgLyBET1RTX1BFUl9JTkNIIC8gSU5DSEVTX1BFUl9NRVRFUiAqIHNjYWxlIC8gcmVzb2x1dGlvbiAvIDI7XG4gICAgdmFyIHJvdGF0aW9uID0gdGhpcy5nZXRSb3RhdGlvbiAhPT0gdW5kZWZpbmVkID8gdG9SYWRpYW5zKHRoaXMuZ2V0Um90YXRpb24oKSkgOiAwO1xuICAgIHZhciBkaWFnb25hbCA9IE1hdGguc3FydChNYXRoLnBvdyhleHRlbnRIYWxmV2lkdGgsIDIpICsgTWF0aC5wb3coZXh0ZW50SGFsZkhlaWdodCwgMikpO1xuICAgIHZhciBnYW1tYSA9IE1hdGguYXRhbihleHRlbnRIYWxmSGVpZ2h0IC8gZXh0ZW50SGFsZldpZHRoKSAtIHJvdGF0aW9uO1xuICAgIHZhciBvbWVnYSA9IE1hdGguYXRhbihleHRlbnRIYWxmV2lkdGggLyBleHRlbnRIYWxmSGVpZ2h0KSAtIHJvdGF0aW9uO1xuICAgIHZhciB4MSA9IGNlbnRlclswXSAtIE1hdGguY29zKGdhbW1hKSAqIGRpYWdvbmFsO1xuICAgIHZhciB5MSA9IGNlbnRlclsxXSArIE1hdGguc2luKGdhbW1hKSAqIGRpYWdvbmFsO1xuICAgIHZhciB4MiA9IGNlbnRlclswXSArIE1hdGguc2luKG9tZWdhKSAqIGRpYWdvbmFsO1xuICAgIHZhciB5MiA9IGNlbnRlclsxXSArIE1hdGguY29zKG9tZWdhKSAqIGRpYWdvbmFsO1xuICAgIHZhciB4MyA9IGNlbnRlclswXSArIE1hdGguY29zKGdhbW1hKSAqIGRpYWdvbmFsO1xuICAgIHZhciB5MyA9IGNlbnRlclsxXSAtIE1hdGguc2luKGdhbW1hKSAqIGRpYWdvbmFsO1xuICAgIHZhciB4NCA9IGNlbnRlclswXSAtIE1hdGguc2luKG9tZWdhKSAqIGRpYWdvbmFsO1xuICAgIHZhciB5NCA9IGNlbnRlclsxXSAtIE1hdGguY29zKG9tZWdhKSAqIGRpYWdvbmFsO1xuICAgIHRoaXMuY29udGV4dF8ubW92ZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oeDIsIHkyKTtcbiAgICB0aGlzLmNvbnRleHRfLmxpbmVUbyh4MywgeTMpO1xuICAgIHRoaXMuY29udGV4dF8ubGluZVRvKHg0LCB5NCk7XG4gICAgdGhpcy5jb250ZXh0Xy5saW5lVG8oeDEsIHkxKTtcbiAgICB0aGlzLmNvbnRleHRfLmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY29udGV4dF8uZmlsbFN0eWxlID0gJyMwMDAnO1xuICAgIHRoaXMuY29udGV4dF8uZmlsbCgpO1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRfLmNhbnZhcztcbiAgfTtcblxuICByZXR1cm4gTWFzaztcbn0oTGF5ZXIpO1xuXG5leHBvcnQgeyBNYXNrIGFzIGRlZmF1bHQgfTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4UEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=