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

eval("\n\n//# sourceURL=webpack:///./examples/disclaimer.css?");

/***/ }),

/***/ "./examples/disclaimer.js":
/*!********************************!*\
  !*** ./examples/disclaimer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _disclaimer_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disclaimer.css */ \"./examples/disclaimer.css\");\n/* harmony import */ var _disclaimer_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_disclaimer_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_js_src_tooltip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/tooltip.js */ \"./node_modules/bootstrap/js/src/tooltip.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Disclaimer.js */ \"./src/message/Disclaimer.js\");\n/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/message/Message.js */ \"./src/message/Message.js\");\n/* harmony import */ var ol_Map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/Map.js */ \"./node_modules/ol/Map.js\");\n/* harmony import */ var ol_View_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/View.js */ \"./node_modules/ol/View.js\");\n/* harmony import */ var ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Tile.js */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/source/OSM.js */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngeo/map/module.js */ \"./src/map/module.js\");\nMainController.$inject = [\"ngeoDisclaimer\"];\n\n\n\n\n\n\n\n\n\n\nvar module = angular__WEBPACK_IMPORTED_MODULE_2___default.a.module('app', ['gettext', ngeo_map_module_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"].name, ngeo_message_Disclaimer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].name]);\n\nfunction MainController(ngeoDisclaimer) {\n  this.disclaimer = ngeoDisclaimer;\n  this.map = new ol_Map_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    layers: [new ol_layer_Tile_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n      source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]()\n    })],\n    view: new ol_View_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      center: [0, 0],\n      zoom: 4\n    })\n  });\n  this.successMsg_ = 'Disclaimer with success style';\n  this.infoMsg_ = 'Disclaimer with info style';\n  this.warningMsg_ = 'Disclaimer with warning style';\n  this.errorMsg_ = 'Disclaimer with error style';\n  this.inMapMsgs_ = ['Disclaimer inside the map', 'An other message ', 'Map contributors', 'This is a long message inside a map'];\n  $('[data-toggle=\"tooltip\"]').tooltip({\n    container: 'body',\n    trigger: 'hover'\n  });\n}\n\nMainController.prototype.success = function () {\n  this.disclaimer.success(this.successMsg_);\n};\n\nMainController.prototype.info = function () {\n  this.disclaimer.info(this.infoMsg_);\n};\n\nMainController.prototype.warn = function () {\n  this.disclaimer.warn(this.warningMsg_);\n};\n\nMainController.prototype.error = function () {\n  this.disclaimer.error(this.errorMsg_);\n};\n\nMainController.prototype.inMap = function () {\n  var _this = this;\n\n  this.inMapMsgs_.forEach(function (message) {\n    _this.disclaimer.alert({\n      msg: message,\n      target: '#disclaimers-in-map',\n      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].WARNING\n    });\n  });\n};\n\nMainController.prototype.closeAll = function () {\n  var _this2 = this;\n\n  this.disclaimer.close({\n    msg: this.successMsg_,\n    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].SUCCESS\n  });\n  this.disclaimer.close({\n    msg: this.infoMsg_,\n    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].INFORMATION\n  });\n  this.disclaimer.close({\n    msg: this.warningMsg_,\n    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].WARNING\n  });\n  this.disclaimer.close({\n    msg: this.errorMsg_,\n    type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].ERROR\n  });\n  this.inMapMsgs_.forEach(function (message) {\n    _this2.disclaimer.close({\n      msg: message,\n      type: ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_4__[\"MessageType\"].WARNING\n    });\n  });\n};\n\nmodule.controller('MainController', MainController);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\")))\n\n//# sourceURL=webpack:///./examples/disclaimer.js?");

/***/ }),

/***/ "./src/message/Disclaimer.js":
/*!***********************************!*\
  !*** ./src/message/Disclaimer.js ***!
  \***********************************/
/*! exports provided: MessageDisclaimerService, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MessageDisclaimerService\", function() { return MessageDisclaimerService; });\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ \"./node_modules/angular/index.js\");\n/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_js_src_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/src/alert.js */ \"./node_modules/bootstrap/js/src/alert.js\");\n/* harmony import */ var ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/Popup.js */ \"./src/message/Popup.js\");\n/* harmony import */ var ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngeo/message/Message.js */ \"./src/message/Message.js\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/sass/font.scss */ \"./src/sass/font.scss\");\n/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_4__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\n\nvar MessageDisclaimerService = function (_ngeoMessageMessage) {\n  MessageDisclaimerService.$inject = [\"$sce\", \"gettextCatalog\", \"ngeoCreatePopup\"];\n\n  _inheritsLoose(MessageDisclaimerService, _ngeoMessageMessage);\n\n  function MessageDisclaimerService($sce, gettextCatalog, ngeoCreatePopup) {\n    var _this;\n\n    _this = _ngeoMessageMessage.call(this) || this;\n    _this.sce_ = $sce;\n    _this.gettextCatalog_ = gettextCatalog;\n    _this.createPopup_ = ngeoCreatePopup;\n    var container = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element('<div class=\"ngeo-disclaimer\"></div>');\n    angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(document.body).append(container);\n    _this.container_ = container;\n    _this.messages_ = {};\n    _this.messagesConsumerCount_ = {};\n    _this.uids_ = {};\n    return _this;\n  }\n\n  var _proto = MessageDisclaimerService.prototype;\n\n  _proto.alert = function alert(object) {\n    this.show(object);\n  };\n\n  _proto.close = function close(object) {\n    var _this2 = this;\n\n    var msgObjects = this.getMessageObjects(object);\n    msgObjects.forEach(function (message) {\n      return _this2.closeMessage_(message);\n    });\n  };\n\n  _proto.showMessage = function showMessage(message) {\n    var _this3 = this;\n\n    var gettextCatalog = this.gettextCatalog_;\n    var type = message.type;\n    console.assert(typeof type == 'string', 'Type should be set.');\n    var uid = this.getMessageUid_(message);\n\n    if (this.uids_[uid]) {\n      return;\n    }\n\n    this.uids_[uid] = true;\n\n    if (message.popup === true) {\n      var popup = this.createPopup_();\n      var content = this.sce_.trustAsHtml(message.msg);\n      popup.open({\n        autoDestroy: true,\n        content: content,\n        title: '&nbsp;'\n      });\n      popup.scope.$watch('open', function (newVal) {\n        if (!newVal) {\n          _this3.closeMessage_(message);\n        }\n      });\n      this.messages_[uid] = popup;\n    } else {\n      var compatibleMessageUid = this.getCompatibleMessageUid_(message);\n\n      if (this.messages_[compatibleMessageUid]) {\n        this.messagesConsumerCount_[compatibleMessageUid]++;\n        return;\n      }\n\n      var classNames = ['alert', 'fade', 'alert-dismissible', 'show'];\n\n      switch (type) {\n        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__[\"MessageType\"].ERROR:\n          classNames.push('alert-danger');\n          break;\n\n        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__[\"MessageType\"].INFORMATION:\n          classNames.push('alert-info');\n          break;\n\n        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__[\"MessageType\"].SUCCESS:\n          classNames.push('alert-success');\n          break;\n\n        case ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__[\"MessageType\"].WARNING:\n          classNames.push('alert-warning');\n          break;\n\n        default:\n          break;\n      }\n\n      var el = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(\"<div role=\\\"alert\\\" class=\\\"\" + classNames.join(' ') + \"\\\"></div>\");\n      var button = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(\"<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"alert\\\" aria-label=\\\"\" + gettextCatalog.getString('Close') + \"\\\"><span aria-hidden=\\\"true\\\" class=\\\"fa fa-times\\\"></span></button>\");\n      var msg = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element('<span />').html(message.msg);\n      el.append(button).append(msg);\n      var container;\n\n      if (message.target) {\n        container = angular__WEBPACK_IMPORTED_MODULE_0___default.a.element(message.target);\n      } else {\n        container = this.container_;\n      }\n\n      container.append(el);\n      el.addClass('show');\n      el.on('closed.bs.alert', function () {\n        _this3.closeMessage_(message, true);\n      });\n      this.messages_[compatibleMessageUid] = el;\n      this.messagesConsumerCount_[compatibleMessageUid] = 1;\n    }\n  };\n\n  _proto.getMessageUid_ = function getMessageUid_(message) {\n    return message.msg + \"-\" + message.type + \"-\" + message.layerUid;\n  };\n\n  _proto.getCompatibleMessageUid_ = function getCompatibleMessageUid_(message) {\n    return message.msg + \"-\" + message.type;\n  };\n\n  _proto.closeMessage_ = function closeMessage_(message, force) {\n    if (force === void 0) {\n      force = false;\n    }\n\n    var uid = this.getMessageUid_(message);\n\n    if (!this.uids_[uid]) {\n      return;\n    }\n\n    delete this.uids_[uid];\n    var compatibleMessageUid = this.getCompatibleMessageUid_(message);\n\n    if (force) {\n      this.messagesConsumerCount_[compatibleMessageUid] = 0;\n    } else {\n      this.messagesConsumerCount_[compatibleMessageUid]--;\n    }\n\n    if (this.messagesConsumerCount_[compatibleMessageUid] > 0) {\n      return;\n    }\n\n    var obj = this.messages_[compatibleMessageUid];\n\n    if (obj instanceof ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__[\"MessagePopup\"]) {\n      var mpObj = obj;\n\n      if (mpObj.getOpen()) {\n        mpObj.setOpen(false);\n      }\n    } else {\n      var jqueryObj = obj;\n\n      if (jqueryObj.hasClass('show')) {\n        jqueryObj.alert('close');\n      }\n    }\n\n    delete this.messages_[compatibleMessageUid];\n    delete this.messagesConsumerCount_[compatibleMessageUid];\n  };\n\n  return MessageDisclaimerService;\n}(ngeo_message_Message_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nvar module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoDisclaimer', [ngeo_message_Popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name]);\nmodule.service('ngeoDisclaimer', MessageDisclaimerService);\n/* harmony default export */ __webpack_exports__[\"default\"] = (module);\n\n//# sourceURL=webpack:///./src/message/Disclaimer.js?");

/***/ }),

/***/ 12:
/*!*******************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/disclaimer.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./examples/common_dependencies.js */\"./examples/common_dependencies.js\");\n__webpack_require__(/*! ngeo/mainmodule.js */\"./src/mainmodule.js\");\nmodule.exports = __webpack_require__(/*! ./examples/disclaimer.js */\"./examples/disclaimer.js\");\n\n\n//# sourceURL=webpack:///multi_./examples/common_dependencies.js_ngeo/mainmodule.js_./examples/disclaimer.js?");

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