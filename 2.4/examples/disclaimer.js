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
/******/ 		"disclaimer": 0
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
/******/ 	deferredModules.push([12,"commons"]);
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Disclaimer.js */ "./src/message/Disclaimer.js");
/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/message/Message.js */ "./src/message/Message.js");
/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map.js */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View.js */ "./node_modules/ol/View.js");
/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Tile.js */ "./node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/OSM.js */ "./node_modules/ol/source/OSM.js");
/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module.js */ "./src/map/module.js");
MainController.$inject = ["ngeoDisclaimer"];










var module = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__["default"].name, ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__["default"].name]);

function MainController(ngeoDisclaimer) {
  this.disclaimer = ngeoDisclaimer;
  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
    })],
    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
      center: [0, 0],
      zoom: 4
    })
  });
  this.successMsg_ = 'Disclaimer with success style';
  this.infoMsg_ = 'Disclaimer with info style';
  this.warningMsg_ = 'Disclaimer with warning style';
  this.errorMsg_ = 'Disclaimer with error style';
  this.inMapMsgs_ = ['Disclaimer inside the map', 'An other message ', 'Map contributors', 'This is a long message inside a map'];
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
}

MainController.prototype.success = function () {
  this.disclaimer.success(this.successMsg_);
};

MainController.prototype.info = function () {
  this.disclaimer.info(this.infoMsg_);
};

MainController.prototype.warn = function () {
  this.disclaimer.warn(this.warningMsg_);
};

MainController.prototype.error = function () {
  this.disclaimer.error(this.errorMsg_);
};

MainController.prototype.inMap = function () {
  this.inMapMsgs_.forEach(function (message) {
    this.disclaimer.alert({
      msg: message,
      target: '#disclaimers-in-map',
      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING
    });
  }, this);
};

MainController.prototype.closeAll = function () {
  this.disclaimer.close({
    msg: this.successMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].SUCCESS
  });
  this.disclaimer.close({
    msg: this.infoMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].INFORMATION
  });
  this.disclaimer.close({
    msg: this.warningMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING
  });
  this.disclaimer.close({
    msg: this.errorMsg_,
    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].ERROR
  });
  this.inMapMsgs_.forEach(function (message) {
    this.disclaimer.close({
      msg: message,
      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__["MessageType"].WARNING
    });
  }, this);
};

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);
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
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js-exposed");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_src_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/alert.js */ "./node_modules/bootstrap/js/src/alert.js");
/* harmony import */ var ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Popup.js */ "./src/message/Popup.js");
/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Message.js */ "./src/message/Message.js");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }






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
    } else {
      var jqueryObj = obj;

      if (jqueryObj.hasClass('show')) {
        jqueryObj.alert('close');
      }
    }

    delete this.messages_[compatibleMessageUid];
    delete this.messagesConsumerCount_[compatibleMessageUid];
  };

  return MessageDisclaimerService;
}(ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoDisclaimer', [ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);
module.service('ngeoDisclaimer', MessageDisclaimerService);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 12:
/*!*******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/disclaimer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/disclaimer.js */"./examples/disclaimer.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY2xhaW1lci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9kaXNjbGFpbWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdlL0Rpc2NsYWltZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImRpc2NsYWltZXJcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMTIsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIm5nZW9EaXNjbGFpbWVyXCJdO1xuaW1wb3J0ICcuL2Rpc2NsYWltZXIuY3NzJztcbmltcG9ydCAnYm9vdHN0cmFwL2pzL3NyYy90b29sdGlwLmpzJztcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IG5nZW9NZXNzYWdlRGlzY2xhaW1lciBmcm9tICduZ2VvL21lc3NhZ2UvRGlzY2xhaW1lci5qcyc7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJ25nZW8vbWVzc2FnZS9NZXNzYWdlLmpzJztcbmltcG9ydCBvbE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IG9sVmlldyBmcm9tICdvbC9WaWV3LmpzJztcbmltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBvbFNvdXJjZU9TTSBmcm9tICdvbC9zb3VyY2UvT1NNLmpzJztcbmltcG9ydCBuZ2VvTWFwTW9kdWxlIGZyb20gJ25nZW8vbWFwL21vZHVsZS5qcyc7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnZ2V0dGV4dCcsIG5nZW9NYXBNb2R1bGUubmFtZSwgbmdlb01lc3NhZ2VEaXNjbGFpbWVyLm5hbWVdKTtcblxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIobmdlb0Rpc2NsYWltZXIpIHtcbiAgdGhpcy5kaXNjbGFpbWVyID0gbmdlb0Rpc2NsYWltZXI7XG4gIHRoaXMubWFwID0gbmV3IG9sTWFwKHtcbiAgICBsYXllcnM6IFtuZXcgb2xMYXllclRpbGUoe1xuICAgICAgc291cmNlOiBuZXcgb2xTb3VyY2VPU00oKVxuICAgIH0pXSxcbiAgICB2aWV3OiBuZXcgb2xWaWV3KHtcbiAgICAgIGNlbnRlcjogWzAsIDBdLFxuICAgICAgem9vbTogNFxuICAgIH0pXG4gIH0pO1xuICB0aGlzLnN1Y2Nlc3NNc2dfID0gJ0Rpc2NsYWltZXIgd2l0aCBzdWNjZXNzIHN0eWxlJztcbiAgdGhpcy5pbmZvTXNnXyA9ICdEaXNjbGFpbWVyIHdpdGggaW5mbyBzdHlsZSc7XG4gIHRoaXMud2FybmluZ01zZ18gPSAnRGlzY2xhaW1lciB3aXRoIHdhcm5pbmcgc3R5bGUnO1xuICB0aGlzLmVycm9yTXNnXyA9ICdEaXNjbGFpbWVyIHdpdGggZXJyb3Igc3R5bGUnO1xuICB0aGlzLmluTWFwTXNnc18gPSBbJ0Rpc2NsYWltZXIgaW5zaWRlIHRoZSBtYXAnLCAnQW4gb3RoZXIgbWVzc2FnZSAnLCAnTWFwIGNvbnRyaWJ1dG9ycycsICdUaGlzIGlzIGEgbG9uZyBtZXNzYWdlIGluc2lkZSBhIG1hcCddO1xuICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7XG4gICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgdHJpZ2dlcjogJ2hvdmVyJ1xuICB9KTtcbn1cblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5zdWNjZXNzKHRoaXMuc3VjY2Vzc01zZ18pO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5pbmZvKHRoaXMuaW5mb01zZ18pO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLndhcm4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci53YXJuKHRoaXMud2FybmluZ01zZ18pO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRpc2NsYWltZXIuZXJyb3IodGhpcy5lcnJvck1zZ18pO1xufTtcblxuTWFpbkNvbnRyb2xsZXIucHJvdG90eXBlLmluTWFwID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluTWFwTXNnc18uZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHRoaXMuZGlzY2xhaW1lci5hbGVydCh7XG4gICAgICBtc2c6IG1lc3NhZ2UsXG4gICAgICB0YXJnZXQ6ICcjZGlzY2xhaW1lcnMtaW4tbWFwJyxcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldBUk5JTkdcbiAgICB9KTtcbiAgfSwgdGhpcyk7XG59O1xuXG5NYWluQ29udHJvbGxlci5wcm90b3R5cGUuY2xvc2VBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZGlzY2xhaW1lci5jbG9zZSh7XG4gICAgbXNnOiB0aGlzLnN1Y2Nlc3NNc2dfLFxuICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlNVQ0NFU1NcbiAgfSk7XG4gIHRoaXMuZGlzY2xhaW1lci5jbG9zZSh7XG4gICAgbXNnOiB0aGlzLmluZm9Nc2dfLFxuICAgIHR5cGU6IE1lc3NhZ2VUeXBlLklORk9STUFUSU9OXG4gIH0pO1xuICB0aGlzLmRpc2NsYWltZXIuY2xvc2Uoe1xuICAgIG1zZzogdGhpcy53YXJuaW5nTXNnXyxcbiAgICB0eXBlOiBNZXNzYWdlVHlwZS5XQVJOSU5HXG4gIH0pO1xuICB0aGlzLmRpc2NsYWltZXIuY2xvc2Uoe1xuICAgIG1zZzogdGhpcy5lcnJvck1zZ18sXG4gICAgdHlwZTogTWVzc2FnZVR5cGUuRVJST1JcbiAgfSk7XG4gIHRoaXMuaW5NYXBNc2dzXy5mb3JFYWNoKGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdGhpcy5kaXNjbGFpbWVyLmNsb3NlKHtcbiAgICAgIG1zZzogbWVzc2FnZSxcbiAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLldBUk5JTkdcbiAgICB9KTtcbiAgfSwgdGhpcyk7XG59O1xuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwiZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0ICdib290c3RyYXAvanMvc3JjL2FsZXJ0LmpzJztcbmltcG9ydCBuZ2VvTWVzc2FnZVBvcHVwLCB7IE1lc3NhZ2VQb3B1cCB9IGZyb20gJ25nZW8vbWVzc2FnZS9Qb3B1cC5qcyc7XG5pbXBvcnQgbmdlb01lc3NhZ2VNZXNzYWdlLCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnbmdlby9tZXNzYWdlL01lc3NhZ2UuanMnO1xuaW1wb3J0ICduZ2VvL3Nhc3MvZm9udC5zY3NzJztcbmV4cG9ydCB2YXIgTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlID0gZnVuY3Rpb24gKF9uZ2VvTWVzc2FnZU1lc3NhZ2UpIHtcbiAgTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlLiRpbmplY3QgPSBbXCIkc2NlXCIsIFwiZ2V0dGV4dENhdGFsb2dcIiwgXCJuZ2VvQ3JlYXRlUG9wdXBcIl07XG5cbiAgX2luaGVyaXRzTG9vc2UoTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlLCBfbmdlb01lc3NhZ2VNZXNzYWdlKTtcblxuICBmdW5jdGlvbiBNZXNzYWdlRGlzY2xhaW1lclNlcnZpY2UoJHNjZSwgZ2V0dGV4dENhdGFsb2csIG5nZW9DcmVhdGVQb3B1cCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX25nZW9NZXNzYWdlTWVzc2FnZS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMuc2NlXyA9ICRzY2U7XG4gICAgX3RoaXMuZ2V0dGV4dENhdGFsb2dfID0gZ2V0dGV4dENhdGFsb2c7XG4gICAgX3RoaXMuY3JlYXRlUG9wdXBfID0gbmdlb0NyZWF0ZVBvcHVwO1xuICAgIHZhciBjb250YWluZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJuZ2VvLWRpc2NsYWltZXJcIj48L2Rpdj4nKTtcbiAgICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgX3RoaXMuY29udGFpbmVyXyA9IGNvbnRhaW5lcjtcbiAgICBfdGhpcy5tZXNzYWdlc18gPSB7fTtcbiAgICBfdGhpcy5tZXNzYWdlc0NvbnN1bWVyQ291bnRfID0ge307XG4gICAgX3RoaXMudWlkc18gPSB7fTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uYWxlcnQgPSBmdW5jdGlvbiBhbGVydChvYmplY3QpIHtcbiAgICB0aGlzLnNob3cob2JqZWN0KTtcbiAgfTtcblxuICBfcHJvdG8uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZShvYmplY3QpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBtc2dPYmplY3RzID0gdGhpcy5nZXRNZXNzYWdlT2JqZWN0cyhvYmplY3QpO1xuICAgIG1zZ09iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5jbG9zZU1lc3NhZ2VfKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5zaG93TWVzc2FnZSA9IGZ1bmN0aW9uIHNob3dNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBnZXR0ZXh0Q2F0YWxvZyA9IHRoaXMuZ2V0dGV4dENhdGFsb2dfO1xuICAgIHZhciB0eXBlID0gbWVzc2FnZS50eXBlO1xuICAgIGNvbnNvbGUuYXNzZXJ0KHR5cGVvZiB0eXBlID09ICdzdHJpbmcnLCAnVHlwZSBzaG91bGQgYmUgc2V0LicpO1xuICAgIHZhciB1aWQgPSB0aGlzLmdldE1lc3NhZ2VVaWRfKG1lc3NhZ2UpO1xuXG4gICAgaWYgKHRoaXMudWlkc19bdWlkXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudWlkc19bdWlkXSA9IHRydWU7XG5cbiAgICBpZiAobWVzc2FnZS5wb3B1cCA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIHBvcHVwID0gdGhpcy5jcmVhdGVQb3B1cF8oKTtcbiAgICAgIHZhciBjb250ZW50ID0gdGhpcy5zY2VfLnRydXN0QXNIdG1sKG1lc3NhZ2UubXNnKTtcbiAgICAgIHBvcHVwLm9wZW4oe1xuICAgICAgICBhdXRvRGVzdHJveTogdHJ1ZSxcbiAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgdGl0bGU6ICcmbmJzcDsnXG4gICAgICB9KTtcbiAgICAgIHBvcHVwLnNjb3BlLiR3YXRjaCgnb3BlbicsIGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgaWYgKCFuZXdWYWwpIHtcbiAgICAgICAgICBfdGhpczMuY2xvc2VNZXNzYWdlXyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm1lc3NhZ2VzX1t1aWRdID0gcG9wdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb21wYXRpYmxlTWVzc2FnZVVpZCA9IHRoaXMuZ2V0Q29tcGF0aWJsZU1lc3NhZ2VVaWRfKG1lc3NhZ2UpO1xuXG4gICAgICBpZiAodGhpcy5tZXNzYWdlc19bY29tcGF0aWJsZU1lc3NhZ2VVaWRdKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0rKztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2xhc3NOYW1lcyA9IFsnYWxlcnQnLCAnZmFkZScsICdhbGVydC1kaXNtaXNzaWJsZScsICdzaG93J107XG5cbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkVSUk9SOlxuICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5JTkZPUk1BVElPTjpcbiAgICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2FsZXJ0LWluZm8nKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNVQ0NFU1M6XG4gICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdhbGVydC1zdWNjZXNzJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5XQVJOSU5HOlxuICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnYWxlcnQtd2FybmluZycpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudChcIjxkaXYgcm9sZT1cXFwiYWxlcnRcXFwiIGNsYXNzPVxcXCJcIiArIGNsYXNzTmFtZXMuam9pbignICcpICsgXCJcXFwiPjwvZGl2PlwiKTtcbiAgICAgIHZhciBidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcImFsZXJ0XFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIGdldHRleHRDYXRhbG9nLmdldFN0cmluZygnQ2xvc2UnKSArIFwiXFxcIj48c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCIgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIj48L3NwYW4+PC9idXR0b24+XCIpO1xuICAgICAgdmFyIG1zZyA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwYW4gLz4nKS5odG1sKG1lc3NhZ2UubXNnKTtcbiAgICAgIGVsLmFwcGVuZChidXR0b24pLmFwcGVuZChtc2cpO1xuICAgICAgdmFyIGNvbnRhaW5lcjtcblxuICAgICAgaWYgKG1lc3NhZ2UudGFyZ2V0KSB7XG4gICAgICAgIGNvbnRhaW5lciA9IGFuZ3VsYXIuZWxlbWVudChtZXNzYWdlLnRhcmdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcl87XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWwpO1xuICAgICAgZWwuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIGVsLm9uKCdjbG9zZWQuYnMuYWxlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMy5jbG9zZU1lc3NhZ2VfKG1lc3NhZ2UsIHRydWUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm1lc3NhZ2VzX1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPSBlbDtcbiAgICAgIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPSAxO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZ2V0TWVzc2FnZVVpZF8gPSBmdW5jdGlvbiBnZXRNZXNzYWdlVWlkXyhtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UubXNnICsgXCItXCIgKyBtZXNzYWdlLnR5cGUgKyBcIi1cIiArIG1lc3NhZ2UubGF5ZXJVaWQ7XG4gIH07XG5cbiAgX3Byb3RvLmdldENvbXBhdGlibGVNZXNzYWdlVWlkXyA9IGZ1bmN0aW9uIGdldENvbXBhdGlibGVNZXNzYWdlVWlkXyhtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UubXNnICsgXCItXCIgKyBtZXNzYWdlLnR5cGU7XG4gIH07XG5cbiAgX3Byb3RvLmNsb3NlTWVzc2FnZV8gPSBmdW5jdGlvbiBjbG9zZU1lc3NhZ2VfKG1lc3NhZ2UsIGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlID09PSB2b2lkIDApIHtcbiAgICAgIGZvcmNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHVpZCA9IHRoaXMuZ2V0TWVzc2FnZVVpZF8obWVzc2FnZSk7XG5cbiAgICBpZiAoIXRoaXMudWlkc19bdWlkXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLnVpZHNfW3VpZF07XG4gICAgdmFyIGNvbXBhdGlibGVNZXNzYWdlVWlkID0gdGhpcy5nZXRDb21wYXRpYmxlTWVzc2FnZVVpZF8obWVzc2FnZSk7XG5cbiAgICBpZiAoZm9yY2UpIHtcbiAgICAgIHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzQ29uc3VtZXJDb3VudF9bY29tcGF0aWJsZU1lc3NhZ2VVaWRdLS07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWVzc2FnZXNDb25zdW1lckNvdW50X1tjb21wYXRpYmxlTWVzc2FnZVVpZF0gPiAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IHRoaXMubWVzc2FnZXNfW2NvbXBhdGlibGVNZXNzYWdlVWlkXTtcblxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBNZXNzYWdlUG9wdXApIHtcbiAgICAgIHZhciBtcE9iaiA9IG9iajtcblxuICAgICAgaWYgKG1wT2JqLmdldE9wZW4oKSkge1xuICAgICAgICBtcE9iai5zZXRPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGpxdWVyeU9iaiA9IG9iajtcblxuICAgICAgaWYgKGpxdWVyeU9iai5oYXNDbGFzcygnc2hvdycpKSB7XG4gICAgICAgIGpxdWVyeU9iai5hbGVydCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5tZXNzYWdlc19bY29tcGF0aWJsZU1lc3NhZ2VVaWRdO1xuICAgIGRlbGV0ZSB0aGlzLm1lc3NhZ2VzQ29uc3VtZXJDb3VudF9bY29tcGF0aWJsZU1lc3NhZ2VVaWRdO1xuICB9O1xuXG4gIHJldHVybiBNZXNzYWdlRGlzY2xhaW1lclNlcnZpY2U7XG59KG5nZW9NZXNzYWdlTWVzc2FnZSk7XG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9EaXNjbGFpbWVyJywgW25nZW9NZXNzYWdlUG9wdXAubmFtZV0pO1xubW9kdWxlLnNlcnZpY2UoJ25nZW9EaXNjbGFpbWVyJywgTWVzc2FnZURpc2NsYWltZXJTZXJ2aWNlKTtcbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=