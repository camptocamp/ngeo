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
/******/ 		"disclaimer": 0
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
/******/ 	deferredModules.push([10,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/disclaimer.css":
/*!*********************************!*\
  !*** ./examples/disclaimer.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/disclaimer.js":
/*!********************************!*\
  !*** ./examples/disclaimer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _disclaimer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disclaimer.css */ "./examples/disclaimer.css");
/* harmony import */ var _disclaimer_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_disclaimer_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_src_tooltip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/tooltip.js */ "./node_modules/bootstrap/js/src/tooltip.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Disclaimer.js */ "./src/message/Disclaimer.js");
/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/message/Message.js */ "./src/message/Message.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__["default"].name]);

/**
 * @param {import("ngeo/message/Disclaimer.js").MessageDisclaimerService} ngeoDisclaimer Ngeo disclaimer
 *    service.
 * @ngInject
 * @constructor
 */
function MainController(ngeoDisclaimer) {
  /**
   * @type {import("ngeo/message/Disclaimer.js").MessageDisclaimerService}
   */
  this.disclaimer = ngeoDisclaimer;

  /**
   * @type {import("ol/Map.js").default}
   */
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [
      new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__["default"](),
      }),
    ],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      center: [0, 0],
      zoom: 4,
    }),
  });

  /**
   * @type {string}
   */
  this.successMsg_ = 'Disclaimer with success style';

  /**
   * @type {string}
   */
  this.infoMsg_ = 'Disclaimer with info style';
  /**
   * @type {string}
   */
  this.warningMsg_ = 'Disclaimer with warning style';

  /**
   * @type {string}
   */
  this.errorMsg_ = 'Disclaimer with error style';

  /**
   * @type {string[]}
   */
  this.inMapMsgs_ = [
    'Disclaimer inside the map',
    'An other message ',
    'Map contributors',
    'This is a long message inside a map',
  ];

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover',
  });
}

/**
 */
MainController.prototype.success = function () {
  this.disclaimer.success(this.successMsg_);
};

/**
 */
MainController.prototype.info = function () {
  this.disclaimer.info(this.infoMsg_);
};

/**
 */
MainController.prototype.warn = function () {
  this.disclaimer.warn(this.warningMsg_);
};

/**
 */
MainController.prototype.error = function () {
  this.disclaimer.error(this.errorMsg_);
};

/**
 * Demonstrates how to display a disclaimer message in an other target. In
 * this case, it's shown in the map.
 */
MainController.prototype.inMap = function () {
  this.inMapMsgs_.forEach((message) => {
    this.disclaimer.alert({
      msg: message,
      target: '#disclaimers-in-map',
      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING,
    });
  });
};

/**
 * Demonstrates how to close disclaimer messages using JavaScript, i.e.
 * instead of clicking on the close button.
 */
MainController.prototype.closeAll = function () {
  this.disclaimer.close({
    msg: this.successMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].SUCCESS,
  });

  this.disclaimer.close({
    msg: this.infoMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].INFORMATION,
  });

  this.disclaimer.close({
    msg: this.warningMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING,
  });

  this.disclaimer.close({
    msg: this.errorMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].ERROR,
  });

  this.inMapMsgs_.forEach((message) => {
    this.disclaimer.close({
      msg: message,
      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING,
    });
  });
};

myModule.controller('MainController', MainController);

/* harmony default export */ __webpack_exports__["default"] = (myModule);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/message/Disclaimer.js":
/*!***********************************!*\
  !*** ./src/message/Disclaimer.js ***!
  \***********************************/
/*! exports provided: MessageDisclaimerService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageDisclaimerService", function() { return MessageDisclaimerService; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_src_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/alert.js */ "./node_modules/bootstrap/js/src/alert.js");
/* harmony import */ var ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Popup.js */ "./src/message/Popup.js");
/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Message.js */ "./src/message/Message.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var MessageDisclaimerService = function (_ngeoMessageMessage) {
  MessageDisclaimerService.$inject = ["$sce", "gettextCatalog", "ngeoCreatePopup"];
  _inheritsLoose(MessageDisclaimerService, _ngeoMessageMessage);
  function MessageDisclaimerService($sce, gettextCatalog, ngeoCreatePopup) {
    var _this;
    _this = _ngeoMessageMessage.call(this) || this;
    _this.sce_ = $sce;
    _this.gettextCatalog_ = gettextCatalog;
    _this.createPopup_ = ngeoCreatePopup;
    var container = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element('<div class="ngeo-disclaimer"></div>');
    angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.body).append(container);
    _this.container_ = container;
    _this.messages_ = {};
    _this.messagesConsumerCount_ = {};
    _this.uids_ = {};
    return _this;
  }
  var _proto = MessageDisclaimerService.prototype;
  _proto.alert = function alert(object) {
    this.show(object);
  };
  _proto.close = function close(object) {
    var _this2 = this;
    var msgObjects = this.getMessageObjects(object);
    msgObjects.forEach(function (message) {
      return _this2.closeMessage_(message);
    });
  };
  _proto.showMessage = function showMessage(message) {
    var _this3 = this;
    var gettextCatalog = this.gettextCatalog_;
    var type = message.type;
    console.assert(typeof type == 'string', 'Type should be set.');
    var uid = this.getMessageUid_(message);
    if (this.uids_[uid]) {
      return;
    }
    this.uids_[uid] = true;
    if (message.popup === true) {
      var popup = this.createPopup_();
      var content = this.sce_.trustAsHtml(message.msg);
      popup.open({
        autoDestroy: true,
        content: content,
        title: '&nbsp;'
      });
      popup.scope.$watch('open', function (newVal) {
        if (!newVal) {
          _this3.closeMessage_(message);
        }
      });
      this.messages_[uid] = popup;
    } else {
      var compatibleMessageUid = this.getCompatibleMessageUid_(message);
      if (this.messages_[compatibleMessageUid]) {
        this.messagesConsumerCount_[compatibleMessageUid]++;
        return;
      }
      var classNames = ['alert', 'fade', 'alert-dismissible', 'show'];
      switch (type) {
        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["MessageType"].ERROR:
          classNames.push('alert-danger');
          break;
        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["MessageType"].INFORMATION:
          classNames.push('alert-info');
          break;
        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["MessageType"].SUCCESS:
          classNames.push('alert-success');
          break;
        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["MessageType"].WARNING:
          classNames.push('alert-warning');
          break;
        default:
          break;
      }
      var el = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element("<div role=\"alert\" class=\"" + classNames.join(' ') + "\"></div>");
      var button = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"" + gettextCatalog.getString('Close') + "\"><span aria-hidden=\"true\" class=\"fa fa-times\"></span></button>");
      var msg = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element('<span />').html(message.msg);
      el.append(button).append(msg);
      var container;
      if (message.target) {
        container = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(message.target);
      } else {
        container = this.container_;
      }
      container.append(el);
      el.addClass('show');
      el.on('closed.bs.alert', function () {
        _this3.closeMessage_(message, true);
      });
      this.messages_[compatibleMessageUid] = el;
      this.messagesConsumerCount_[compatibleMessageUid] = 1;
    }
  };
  _proto.getMessageUid_ = function getMessageUid_(message) {
    return message.msg + "-" + message.type + "-" + message.layerUid;
  };
  _proto.getCompatibleMessageUid_ = function getCompatibleMessageUid_(message) {
    return message.msg + "-" + message.type;
  };
  _proto.closeMessage_ = function closeMessage_(message, force) {
    if (force === void 0) {
      force = false;
    }
    var uid = this.getMessageUid_(message);
    if (!this.uids_[uid]) {
      return;
    }
    delete this.uids_[uid];
    var compatibleMessageUid = this.getCompatibleMessageUid_(message);
    if (force) {
      this.messagesConsumerCount_[compatibleMessageUid] = 0;
    } else {
      this.messagesConsumerCount_[compatibleMessageUid]--;
    }
    if (this.messagesConsumerCount_[compatibleMessageUid] > 0) {
      return;
    }
    var obj = this.messages_[compatibleMessageUid];
    if (obj instanceof ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__["MessagePopup"]) {
      var mpObj = obj;
      if (mpObj.getOpen()) {
        mpObj.setOpen(false);
      }
    } else if (obj) {
      var jqueryObj = obj;
      if (jqueryObj.hasClass('show')) {
        jqueryObj.alert('close');
      }
    } else {
      console.log("No disclaimer found for  '" + message + "'.");
    }
    delete this.messages_[compatibleMessageUid];
    delete this.messagesConsumerCount_[compatibleMessageUid];
  };
  return MessageDisclaimerService;
}(ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
var myModule = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoDisclaimer', [ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
myModule.service('ngeoDisclaimer', MessageDisclaimerService);
/* harmony default export */ __webpack_exports__["default"] = (myModule);

/***/ }),

/***/ 10:
/*!*******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/disclaimer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/disclaimer.js */"./examples/disclaimer.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2xhaW1lci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9kaXNjbGFpbWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdlL0Rpc2NsYWltZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRpc2NsYWltZXJcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHQvLyBTaW5jZSBhbGwgcmVmZXJlbmNlZCBjaHVua3MgYXJlIGFscmVhZHkgaW5jbHVkZWRcbiBcdC8vIGluIHRoaXMgZmlsZSwgdGhpcyBmdW5jdGlvbiBpcyBlbXB0eSBoZXJlLlxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZSgpIHtcbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzEwLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNi0yMDIxIENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCAnLi9kaXNjbGFpbWVyLmNzcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9zcmMvdG9vbHRpcC5qcyc7XG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCBuZ2VvTWVzc2FnZURpc2NsYWltZXIgZnJvbSAnbmdlby9tZXNzYWdlL0Rpc2NsYWltZXIuanMnO1xuXG5pbXBvcnQge01lc3NhZ2VUeXBlfSBmcm9tICduZ2VvL21lc3NhZ2UvTWVzc2FnZS5qcyc7XG5pbXBvcnQgb2xNYXAgZnJvbSAnb2wvTWFwLmpzJztcbmltcG9ydCBvbFZpZXcgZnJvbSAnb2wvVmlldy5qcyc7XG5pbXBvcnQgb2xMYXllclRpbGUgZnJvbSAnb2wvbGF5ZXIvVGlsZS5qcyc7XG5pbXBvcnQgb2xTb3VyY2VPU00gZnJvbSAnb2wvc291cmNlL09TTS5qcyc7XG5pbXBvcnQgbmdlb01hcE1vZHVsZSBmcm9tICduZ2VvL21hcC9tb2R1bGUuanMnO1xuXG4vKiogQHR5cGUge2FuZ3VsYXIuSU1vZHVsZX0gKiovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2dldHRleHQnLCBuZ2VvTWFwTW9kdWxlLm5hbWUsIG5nZW9NZXNzYWdlRGlzY2xhaW1lci5uYW1lXSk7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoXCJuZ2VvL21lc3NhZ2UvRGlzY2xhaW1lci5qc1wiKS5NZXNzYWdlRGlzY2xhaW1lclNlcnZpY2V9IG5nZW9EaXNjbGFpbWVyIE5nZW8gZGlzY2xhaW1lclxuICogICAgc2VydmljZS5cbiAqIEBuZ0luamVjdFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKG5nZW9EaXNjbGFpbWVyKSB7XG4gIC8qKlxuICAgKiBAdHlwZSB7aW1wb3J0KFwibmdlby9tZXNzYWdlL0Rpc2NsYWltZXIuanNcIikuTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlfVxuICAgKi9cbiAgdGhpcy5kaXNjbGFpbWVyID0gbmdlb0Rpc2NsYWltZXI7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtpbXBvcnQoXCJvbC9NYXAuanNcIikuZGVmYXVsdH1cbiAgICovXG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtcbiAgICAgIG5ldyBvbExheWVyVGlsZSh7XG4gICAgICAgIHNvdXJjZTogbmV3IG9sU291cmNlT1NNKCksXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHZpZXc6IG5ldyBvbFZpZXcoe1xuICAgICAgY2VudGVyOiBbMCwgMF0sXG4gICAgICB6b29tOiA0LFxuICAgIH0pLFxuICB9KTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMuc3VjY2Vzc01zZ18gPSAnRGlzY2xhaW1lciB3aXRoIHN1Y2Nlc3Mgc3R5bGUnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy5pbmZvTXNnXyA9ICdEaXNjbGFpbWVyIHdpdGggaW5mbyBzdHlsZSc7XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53YXJuaW5nTXNnXyA9ICdEaXNjbGFpbWVyIHdpdGggd2FybmluZyBzdHlsZSc7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLmVycm9yTXNnXyA9ICdEaXNjbGFpbWVyIHdpdGggZXJyb3Igc3R5bGUnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAqL1xuICB0aGlzLmluTWFwTXNnc18gPSBbXG4gICAgJ0Rpc2NsYWltZXIgaW5zaWRlIHRoZSBtYXAnLFxuICAgICdBbiBvdGhlciBtZXNzYWdlICcsXG4gICAgJ01hcCBjb250cmlidXRvcnMnLFxuICAgICdUaGlzIGlzIGEgbG9uZyBtZXNzYWdlIGluc2lkZSBhIG1hcCcsXG4gIF07XG5cbiAgLy8gaW5pdGlhbGl6ZSB0b29sdGlwc1xuICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgdHJpZ2dlcjogJ2hvdmVyJyxcbiAgfSk7XG59XG5cbi8qKlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kaXNjbGFpbWVyLnN1Y2Nlc3ModGhpcy5zdWNjZXNzTXNnXyk7XG59O1xuXG4vKipcbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5pbmZvKHRoaXMuaW5mb01zZ18pO1xufTtcblxuLyoqXG4gKi9cbk1haW5Db250cm9sbGVyLnByb3RvdHlwZS53YXJuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRpc2NsYWltZXIud2Fybih0aGlzLndhcm5pbmdNc2dfKTtcbn07XG5cbi8qKlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5lcnJvcih0aGlzLmVycm9yTXNnXyk7XG59O1xuXG4vKipcbiAqIERlbW9uc3RyYXRlcyBob3cgdG8gZGlzcGxheSBhIGRpc2NsYWltZXIgbWVzc2FnZSBpbiBhbiBvdGhlciB0YXJnZXQuIEluXG4gKiB0aGlzIGNhc2UsIGl0J3Mgc2hvd24gaW4gdGhlIG1hcC5cbiAqL1xuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmluTWFwID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluTWFwTXNnc18uZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xuICAgIHRoaXMuZGlzY2xhaW1lci5hbGVydCh7XG4gICAgICBtc2c6IG1lc3NhZ2UsXG4gICAgICB0YXJnZXQ6ICcjZGlzY2xhaW1lcnMtaW4tbWFwJyxcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldBUk5JTkcsXG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBEZW1vbnN0cmF0ZXMgaG93IHRvIGNsb3NlIGRpc2NsYWltZXIgbWVzc2FnZXMgdXNpbmcgSmF2YVNjcmlwdCwgaS5lLlxuICogaW5zdGVhZCBvZiBjbGlja2luZyBvbiB0aGUgY2xvc2UgYnV0dG9uLlxuICovXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5jbG9zZSh7XG4gICAgbXNnOiB0aGlzLnN1Y2Nlc3NNc2dfLFxuICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlNVQ0NFU1MsXG4gIH0pO1xuXG4gIHRoaXMuZGlzY2xhaW1lci5jbG9zZSh7XG4gICAgbXNnOiB0aGlzLmluZm9Nc2dfLFxuICAgIHR5cGU6IE1lc3NhZ2VUeXBlLklORk9STUFUSU9OLFxuICB9KTtcblxuICB0aGlzLmRpc2NsYWltZXIuY2xvc2Uoe1xuICAgIG1zZzogdGhpcy53YXJuaW5nTXNnXyxcbiAgICB0eXBlOiBNZXNzYWdlVHlwZS5XQVJOSU5HLFxuICB9KTtcblxuICB0aGlzLmRpc2NsYWltZXIuY2xvc2Uoe1xuICAgIG1zZzogdGhpcy5lcnJvck1zZ18sXG4gICAgdHlwZTogTWVzc2FnZVR5cGUuRVJST1IsXG4gIH0pO1xuXG4gIHRoaXMuaW5NYXBNc2dzXy5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gICAgdGhpcy5kaXNjbGFpbWVyLmNsb3NlKHtcbiAgICAgIG1zZzogbWVzc2FnZSxcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldBUk5JTkcsXG4gICAgfSk7XG4gIH0pO1xufTtcblxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5cbmV4cG9ydCBkZWZhdWx0IG15TW9kdWxlO1xuIiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgJ2Jvb3RzdHJhcC9qcy9zcmMvYWxlcnQuanMnO1xuaW1wb3J0IG5nZW9NZXNzYWdlUG9wdXAsIHsgTWVzc2FnZVBvcHVwIH0gZnJvbSAnbmdlby9tZXNzYWdlL1BvcHVwLmpzJztcbmltcG9ydCBuZ2VvTWVzc2FnZU1lc3NhZ2UsIHsgTWVzc2FnZVR5cGUgfSBmcm9tICduZ2VvL21lc3NhZ2UvTWVzc2FnZS5qcyc7XG5pbXBvcnQgJ25nZW8vc2Fzcy9mb250LnNjc3MnO1xuZXhwb3J0IHZhciBNZXNzYWdlRGlzY2xhaW1lclNlcnZpY2UgPSBmdW5jdGlvbiAoX25nZW9NZXNzYWdlTWVzc2FnZSkge1xuICBNZXNzYWdlRGlzY2xhaW1lclNlcnZpY2UuJGluamVjdCA9IFtcIiRzY2VcIiwgXCJnZXR0ZXh0Q2F0YWxvZ1wiLCBcIm5nZW9DcmVhdGVQb3B1cFwiXTtcbiAgX2luaGVyaXRzTG9vc2UoTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlLCBfbmdlb01lc3NhZ2VNZXNzYWdlKTtcbiAgZnVuY3Rpb24gTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlKCRzY2UsIGdldHRleHRDYXRhbG9nLCBuZ2VvQ3JlYXRlUG9wdXApIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX3RoaXMgPSBfbmdlb01lc3NhZ2VNZXNzYWdlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5zY2VfID0gJHNjZTtcbiAgICBfdGhpcy5nZXR0ZXh0Q2F0YWxvZ18gPSBnZXR0ZXh0Q2F0YWxvZztcbiAgICBfdGhpcy5jcmVhdGVQb3B1cF8gPSBuZ2VvQ3JlYXRlUG9wdXA7XG4gICAgdmFyIGNvbnRhaW5lciA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdiBjbGFzcz1cIm5nZW8tZGlzY2xhaW1lclwiPjwvZGl2PicpO1xuICAgIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KS5hcHBlbmQoY29udGFpbmVyKTtcbiAgICBfdGhpcy5jb250YWluZXJfID0gY29udGFpbmVyO1xuICAgIF90aGlzLm1lc3NhZ2VzXyA9IHt9O1xuICAgIF90aGlzLm1lc3NhZ2VzQ29uc3VtZXJDb3VudF8gPSB7fTtcbiAgICBfdGhpcy51aWRzXyA9IHt9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICB2YXIgX3Byb3RvID0gTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlLnByb3RvdHlwZTtcbiAgX3Byb3RvLmFsZXJ0ID0gZnVuY3Rpb24gYWxlcnQob2JqZWN0KSB7XG4gICAgdGhpcy5zaG93KG9iamVjdCk7XG4gIH07XG4gIF9wcm90by5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKG9iamVjdCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBtc2dPYmplY3RzID0gdGhpcy5nZXRNZXNzYWdlT2JqZWN0cyhvYmplY3QpO1xuICAgIG1zZ09iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5jbG9zZU1lc3NhZ2VfKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uc2hvd01lc3NhZ2UgPSBmdW5jdGlvbiBzaG93TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdmFyIGdldHRleHRDYXRhbG9nID0gdGhpcy5nZXR0ZXh0Q2F0YWxvZ187XG4gICAgdmFyIHR5cGUgPSBtZXNzYWdlLnR5cGU7XG4gICAgY29uc29sZS5hc3NlcnQodHlwZW9mIHR5cGUgPT0gJ3N0cmluZycsICdUeXBlIHNob3VsZCBiZSBzZXQuJyk7XG4gICAgdmFyIHVpZCA9IHRoaXMuZ2V0TWVzc2FnZVVpZF8obWVzc2FnZSk7XG4gICAgaWYgKHRoaXMudWlkc19bdWlkXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVpZHNfW3VpZF0gPSB0cnVlO1xuICAgIGlmIChtZXNzYWdlLnBvcHVwID09PSB0cnVlKSB7XG4gICAgICB2YXIgcG9wdXAgPSB0aGlzLmNyZWF0ZVBvcHVwXygpO1xuICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLnNjZV8udHJ1c3RBc0h0bWwobWVzc2FnZS5tc2cpO1xuICAgICAgcG9wdXAub3Blbih7XG4gICAgICAgIGF1dG9EZXN0cm95OiB0cnVlLFxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICB0aXRsZTogJyZuYnNwOydcbiAgICAgIH0pO1xuICAgICAgcG9wdXAuc2NvcGUuJHdhdGNoKCdvcGVuJywgZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICBpZiAoIW5ld1ZhbCkge1xuICAgICAgICAgIF90aGlzMy5jbG9zZU1lc3NhZ2VfKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubWVzc2FnZXNfW3VpZF0gPSBwb3B1cDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbXBhdGlibGVNZXNzYWdlVWlkID0gdGhpcy5nZXRDb21wYXRpYmxlTWVzc2FnZVVpZF8obWVzc2FnZSk7XG4gICAgICBpZiAodGhpcy5tZXNzYWdlc19bY29tcGF0aWJsZU1lc3NhZ2VVaWRdKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0rKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSBbJ2FsZXJ0JywgJ2ZhZGUnLCAnYWxlcnQtZGlzbWlzc2libGUnLCAnc2hvdyddO1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuRVJST1I6XG4gICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdhbGVydC1kYW5nZXInKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5JTkZPUk1BVElPTjpcbiAgICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2FsZXJ0LWluZm8nKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TVUNDRVNTOlxuICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLldBUk5JTkc6XG4gICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdhbGVydC13YXJuaW5nJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB2YXIgZWwgPSBhbmd1bGFyLmVsZW1lbnQoXCI8ZGl2IHJvbGU9XFxcImFsZXJ0XFxcIiBjbGFzcz1cXFwiXCIgKyBjbGFzc05hbWVzLmpvaW4oJyAnKSArIFwiXFxcIj48L2Rpdj5cIik7XG4gICAgICB2YXIgYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyBnZXR0ZXh0Q2F0YWxvZy5nZXRTdHJpbmcoJ0Nsb3NlJykgKyBcIlxcXCI+PHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCI+PC9zcGFuPjwvYnV0dG9uPlwiKTtcbiAgICAgIHZhciBtc2cgPSBhbmd1bGFyLmVsZW1lbnQoJzxzcGFuIC8+JykuaHRtbChtZXNzYWdlLm1zZyk7XG4gICAgICBlbC5hcHBlbmQoYnV0dG9uKS5hcHBlbmQobXNnKTtcbiAgICAgIHZhciBjb250YWluZXI7XG4gICAgICBpZiAobWVzc2FnZS50YXJnZXQpIHtcbiAgICAgICAgY29udGFpbmVyID0gYW5ndWxhci5lbGVtZW50KG1lc3NhZ2UudGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyXztcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWwpO1xuICAgICAgZWwuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIGVsLm9uKCdjbG9zZWQuYnMuYWxlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMy5jbG9zZU1lc3NhZ2VfKG1lc3NhZ2UsIHRydWUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1lc3NhZ2VzX1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPSBlbDtcbiAgICAgIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPSAxO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmdldE1lc3NhZ2VVaWRfID0gZnVuY3Rpb24gZ2V0TWVzc2FnZVVpZF8obWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLm1zZyArIFwiLVwiICsgbWVzc2FnZS50eXBlICsgXCItXCIgKyBtZXNzYWdlLmxheWVyVWlkO1xuICB9O1xuICBfcHJvdG8uZ2V0Q29tcGF0aWJsZU1lc3NhZ2VVaWRfID0gZnVuY3Rpb24gZ2V0Q29tcGF0aWJsZU1lc3NhZ2VVaWRfKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5tc2cgKyBcIi1cIiArIG1lc3NhZ2UudHlwZTtcbiAgfTtcbiAgX3Byb3RvLmNsb3NlTWVzc2FnZV8gPSBmdW5jdGlvbiBjbG9zZU1lc3NhZ2VfKG1lc3NhZ2UsIGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlID09PSB2b2lkIDApIHtcbiAgICAgIGZvcmNlID0gZmFsc2U7XG4gICAgfVxuICAgIHZhciB1aWQgPSB0aGlzLmdldE1lc3NhZ2VVaWRfKG1lc3NhZ2UpO1xuICAgIGlmICghdGhpcy51aWRzX1t1aWRdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnVpZHNfW3VpZF07XG4gICAgdmFyIGNvbXBhdGlibGVNZXNzYWdlVWlkID0gdGhpcy5nZXRDb21wYXRpYmxlTWVzc2FnZVVpZF8obWVzc2FnZSk7XG4gICAgaWYgKGZvcmNlKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzQ29uc3VtZXJDb3VudF9bY29tcGF0aWJsZU1lc3NhZ2VVaWRdID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlc0NvbnN1bWVyQ291bnRfW2NvbXBhdGlibGVNZXNzYWdlVWlkXS0tO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZXNzYWdlc0NvbnN1bWVyQ291bnRfW2NvbXBhdGlibGVNZXNzYWdlVWlkXSA+IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG9iaiA9IHRoaXMubWVzc2FnZXNfW2NvbXBhdGlibGVNZXNzYWdlVWlkXTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgTWVzc2FnZVBvcHVwKSB7XG4gICAgICB2YXIgbXBPYmogPSBvYmo7XG4gICAgICBpZiAobXBPYmouZ2V0T3BlbigpKSB7XG4gICAgICAgIG1wT2JqLnNldE9wZW4oZmFsc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqKSB7XG4gICAgICB2YXIganF1ZXJ5T2JqID0gb2JqO1xuICAgICAgaWYgKGpxdWVyeU9iai5oYXNDbGFzcygnc2hvdycpKSB7XG4gICAgICAgIGpxdWVyeU9iai5hbGVydCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJObyBkaXNjbGFpbWVyIGZvdW5kIGZvciAgJ1wiICsgbWVzc2FnZSArIFwiJy5cIik7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLm1lc3NhZ2VzX1tjb21wYXRpYmxlTWVzc2FnZVVpZF07XG4gICAgZGVsZXRlIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF07XG4gIH07XG4gIHJldHVybiBNZXNzYWdlRGlzY2xhaW1lclNlcnZpY2U7XG59KG5nZW9NZXNzYWdlTWVzc2FnZSk7XG52YXIgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbmdlb0Rpc2NsYWltZXInLCBbbmdlb01lc3NhZ2VQb3B1cC5uYW1lXSk7XG5teU1vZHVsZS5zZXJ2aWNlKCduZ2VvRGlzY2xhaW1lcicsIE1lc3NhZ2VEaXNjbGFpbWVyU2VydmljZSk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcktBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1S0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9