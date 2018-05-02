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
/******/ 		"displaywindow": 0
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
/******/ 	deferredModules.push([11,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/displaywindow.css":
/*!************************************!*\
  !*** ./examples/displaywindow.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./examples/displaywindow.js":
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displaywindow.css */ "./examples/displaywindow.css");
/* harmony import */ var _displaywindow_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_displaywindow_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/displaywindowComponent.js */ "./src/message/displaywindowComponent.js");
MainController.$inject = ["$scope"];



var module = angular__WEBPACK_IMPORTED_MODULE_1___default.a.module('app', [ngeo_message_displaywindowComponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

function MainController($scope) {
  this.window1Content = 'https://www.camptocamp.com';
  this.window2Content = "<p>A window: <ul>\n      <li>That have custom dimensions</li>\n      <li>That is draggable</li>\n      <li>That is rezisable</li>\n      <li>That can be open and close</li>\n      </ul></p>";
  this.window2IsOpen = false;
  this.window3IsOpen = false;
  this.window3Template = "\n    <div class=\"details\">\n      <p>\n          <h3>Using AngularJS directives:</h3>\n          <span ng-if=\"!ctrl.window3FalseValue\">This should appear</span>\n          <span ng-show=\"ctrl.window3FalseValue\">This should not be visible</span>\n      </p>\n    </div>\n  ";
  this.window3FalseValue = false;
  this.window4IsOpen = false;
  var element = document.getElementById('window4Template');

  if (!element) {
    throw new Error('Missing element');
  }

  this.window4Template = angular__WEBPACK_IMPORTED_MODULE_1___default.a.element(element).html();
  this.window4TextBinding = 'This is an AngularJS binding.';
  this.windowScope = $scope;
}

module.controller('MainController', MainController);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ "./node_modules/jquery-ui/ui/widgets/resizable.js":
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/jquery-ui/ui/widgets/resizable.js from dll-reference vendor ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference vendor */ "dll-reference vendor"))(1028);

/***/ }),

/***/ "./src/message/displaywindowComponent.html":
/*!*************************************************!*\
  !*** ./src/message/displaywindowComponent.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div\n  class="ngeo-displaywindow"\n  ng-show="$ctrl.open"\n  title=""\n>\n\n  <div class="windowcontainer" ng-style="$ctrl.style">\n\n    <button\n      type="button"\n      class="btn fa-times close"\n      ng-click="$ctrl.close()">\n    </button>\n\n    <div class="animation-container">\n      <div class="slide-animation ">\n        <div\n          class="header ui-draggable-handle"\n          ng-if="$ctrl.title !== null">\n          <p class="title">{{$ctrl.title | translate}}</p>\n        </div>\n        <div\n          class="details content"\n          ng-if="$ctrl.content"\n          ng-bind-html="$ctrl.content">\n        </div>\n        <div\n          class="details iframe"\n          ng-if="$ctrl.url !== null">\n          <iframe\n            frameborder="0"\n            type="text/html"\n            height="100%"\n            width="100%"\n            ng-src="{{ $ctrl.urlTrusted }}"></iframe>\n        </div>\n        <div class="content-template-container"></div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n';

}
return __p
}

/***/ }),

/***/ "./src/message/displaywindowComponent.js":
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngeo/sass/font.scss */ "./src/sass/font.scss");
/* harmony import */ var ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_font_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery-ui/ui/widgets/resizable.js */ "./node_modules/jquery-ui/ui/widgets/resizable.js");
/* harmony import */ var jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_resizable_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery-ui/ui/widgets/draggable.js */ "./node_modules/jquery-ui/ui/widgets/draggable.js");
/* harmony import */ var jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery_ui_ui_widgets_draggable_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngeo_sass_jquery_ui_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngeo/sass/jquery-ui.scss */ "./src/sass/jquery-ui.scss");
/* harmony import */ var ngeo_sass_jquery_ui_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngeo_sass_jquery_ui_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_5__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var module = angular__WEBPACK_IMPORTED_MODULE_0___default.a.module('ngeoMessageDisplaywindowComponent', ['ngSanitize']);
module.run(["$templateCache", function ($templateCache) {
  $templateCache.put('ngeo/message/displaywindowComponent', __webpack_require__(/*! ./displaywindowComponent.html */ "./src/message/displaywindowComponent.html"));
}]);
module.value('ngeoMessageDisplaywindowTemplateUrl', function ($attrs) {
  var templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];
  return templateUrl !== undefined ? templateUrl : 'ngeo/message/displaywindowComponent';
});
ngeoMessageDisplaywindowTemplateUrl.$inject = ["$attrs", "ngeoMessageDisplaywindowTemplateUrl"];

function ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {
  return ngeoMessageDisplaywindowTemplateUrl($attrs);
}

var Controller = function () {
  Controller.$inject = ["$element", "$sce", "$scope", "$compile"];

  function Controller($element, $sce, $scope, $compile) {
    this.clearOnClose;
    this.content;
    this.contentTemplate;
    this.contentScope;
    this.draggable;
    this.draggableContainment;
    this.desktop;
    this.height;
    this.open;
    this.resizable;
    this.title;
    this.url;
    this.width;
    this.element_ = $element;
    this.sce_ = $sce;
    this.scope_ = $scope;
    this.compile_ = $compile;
  }

  var _proto = Controller.prototype;

  _proto.$onInit = function $onInit() {
    var _this = this;

    this.clearOnClose = this.clearOnClose !== false;
    this.content = this.content || null;
    this.contentTemplate = this.contentTemplate || null;
    this.contentScope = this.contentScope || null;
    this.desktop = this.desktop !== false;
    this.draggableContainment = this.draggableContainment || 'document';
    this.open = this.open === true;
    this.height = this.height || '240px';
    this.width = this.width || '240px';
    this.draggable = this.draggable !== undefined ? this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ? this.resizable : this.desktop;

    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({
        'containment': this.draggableContainment,
        'handle': 'div.header'
      });
    }

    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({
        'minHeight': 240,
        'minWidth': 240
      });
    }

    if (this.contentTemplate) {
      this.updateContentTemplate_();
    }

    this.scope_.$watch(function () {
      return _this.contentTemplate;
    }, function () {
      return _this.updateContentTemplate_();
    });
  };

  _proto.updateContentTemplate_ = function updateContentTemplate_() {
    if (!this.contentTemplate) {
      return;
    }

    var scope = this.contentScope || this.scope_;
    var compiled = this.compile_(this.contentTemplate)(scope);
    var displayWindow = this.element_.find('.ngeo-displaywindow .windowcontainer .animation-container .content-template-container');
    displayWindow.empty();
    displayWindow.append(compiled);
  };

  _proto.close = function close() {
    this.open = false;

    if (this.clearOnClose) {
      this.clear_();
    }
  };

  _proto.clear_ = function clear_() {
    this.content = null;
    this.title = null;
    this.url = null;
  };

  _createClass(Controller, [{
    key: "style",
    get: function get() {
      return {
        height: this.height,
        width: this.width
      };
    }
  }, {
    key: "urlTrusted",
    get: function get() {
      if (this.url) {
        return this.sce_.trustAsResourceUrl(this.url);
      }
    }
  }]);

  return Controller;
}();

var ngeoMessageDisplaywindowComponent = {
  bindings: {
    'clearOnClose': '<?',
    'content': '=?',
    'contentTemplate': '=?',
    'contentScope': '<?',
    'desktop': '<?',
    'draggable': '<?',
    'draggableContainment': '<?',
    'height': '=?',
    'open': '=?',
    'resizable': '<?',
    'title': '=?',
    'url': '=?',
    'width': '=?'
  },
  controller: Controller,
  templateUrl: ngeoMessageDisplaywindowTemplateUrl
};
module.component('ngeoDisplaywindow', ngeoMessageDisplaywindowComponent);
/* harmony default export */ __webpack_exports__["default"] = (module);

/***/ }),

/***/ 11:
/*!**********************************************************************************************!*\
  !*** multi ./examples/common_dependencies.js ngeo/mainmodule.js ./examples/displaywindow.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./examples/common_dependencies.js */"./examples/common_dependencies.js");
__webpack_require__(/*! ngeo/mainmodule.js */"./src/mainmodule.js");
module.exports = __webpack_require__(/*! ./examples/displaywindow.js */"./examples/displaywindow.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXdpbmRvdy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9leGFtcGxlcy9kaXNwbGF5d2luZG93LmpzIiwid2VicGFjazovLy8uL3NyYy9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJkaXNwbGF5d2luZG93XCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzExLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIl07XG5pbXBvcnQgJy4vZGlzcGxheXdpbmRvdy5jc3MnO1xuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzJztcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudC5uYW1lXSk7XG5cbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuICB0aGlzLndpbmRvdzFDb250ZW50ID0gJ2h0dHBzOi8vd3d3LmNhbXB0b2NhbXAuY29tJztcbiAgdGhpcy53aW5kb3cyQ29udGVudCA9IFwiPHA+QSB3aW5kb3c6IDx1bD5cXG4gICAgICA8bGk+VGhhdCBoYXZlIGN1c3RvbSBkaW1lbnNpb25zPC9saT5cXG4gICAgICA8bGk+VGhhdCBpcyBkcmFnZ2FibGU8L2xpPlxcbiAgICAgIDxsaT5UaGF0IGlzIHJlemlzYWJsZTwvbGk+XFxuICAgICAgPGxpPlRoYXQgY2FuIGJlIG9wZW4gYW5kIGNsb3NlPC9saT5cXG4gICAgICA8L3VsPjwvcD5cIjtcbiAgdGhpcy53aW5kb3cySXNPcGVuID0gZmFsc2U7XG4gIHRoaXMud2luZG93M0lzT3BlbiA9IGZhbHNlO1xuICB0aGlzLndpbmRvdzNUZW1wbGF0ZSA9IFwiXFxuICAgIDxkaXYgY2xhc3M9XFxcImRldGFpbHNcXFwiPlxcbiAgICAgIDxwPlxcbiAgICAgICAgICA8aDM+VXNpbmcgQW5ndWxhckpTIGRpcmVjdGl2ZXM6PC9oMz5cXG4gICAgICAgICAgPHNwYW4gbmctaWY9XFxcIiFjdHJsLndpbmRvdzNGYWxzZVZhbHVlXFxcIj5UaGlzIHNob3VsZCBhcHBlYXI8L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIG5nLXNob3c9XFxcImN0cmwud2luZG93M0ZhbHNlVmFsdWVcXFwiPlRoaXMgc2hvdWxkIG5vdCBiZSB2aXNpYmxlPC9zcGFuPlxcbiAgICAgIDwvcD5cXG4gICAgPC9kaXY+XFxuICBcIjtcbiAgdGhpcy53aW5kb3czRmFsc2VWYWx1ZSA9IGZhbHNlO1xuICB0aGlzLndpbmRvdzRJc09wZW4gPSBmYWxzZTtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZG93NFRlbXBsYXRlJyk7XG5cbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVsZW1lbnQnKTtcbiAgfVxuXG4gIHRoaXMud2luZG93NFRlbXBsYXRlID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmh0bWwoKTtcbiAgdGhpcy53aW5kb3c0VGV4dEJpbmRpbmcgPSAnVGhpcyBpcyBhbiBBbmd1bGFySlMgYmluZGluZy4nO1xuICB0aGlzLndpbmRvd1Njb3BlID0gJHNjb3BlO1xufVxuXG5tb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmopIHtcbm9iaiB8fCAob2JqID0ge30pO1xudmFyIF9fdCwgX19wID0gJyc7XG53aXRoIChvYmopIHtcbl9fcCArPSAnPGRpdlxcbiAgY2xhc3M9XCJuZ2VvLWRpc3BsYXl3aW5kb3dcIlxcbiAgbmctc2hvdz1cIiRjdHJsLm9wZW5cIlxcbiAgdGl0bGU9XCJcIlxcbj5cXG5cXG4gIDxkaXYgY2xhc3M9XCJ3aW5kb3djb250YWluZXJcIiBuZy1zdHlsZT1cIiRjdHJsLnN0eWxlXCI+XFxuXFxuICAgIDxidXR0b25cXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcXG4gICAgICBjbGFzcz1cImJ0biBmYS10aW1lcyBjbG9zZVwiXFxuICAgICAgbmctY2xpY2s9XCIkY3RybC5jbG9zZSgpXCI+XFxuICAgIDwvYnV0dG9uPlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0aW9uLWNvbnRhaW5lclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1hbmltYXRpb24gXCI+XFxuICAgICAgICA8ZGl2XFxuICAgICAgICAgIGNsYXNzPVwiaGVhZGVyIHVpLWRyYWdnYWJsZS1oYW5kbGVcIlxcbiAgICAgICAgICBuZy1pZj1cIiRjdHJsLnRpdGxlICE9PSBudWxsXCI+XFxuICAgICAgICAgIDxwIGNsYXNzPVwidGl0bGVcIj57eyRjdHJsLnRpdGxlIHwgdHJhbnNsYXRlfX08L3A+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXZcXG4gICAgICAgICAgY2xhc3M9XCJkZXRhaWxzIGNvbnRlbnRcIlxcbiAgICAgICAgICBuZy1pZj1cIiRjdHJsLmNvbnRlbnRcIlxcbiAgICAgICAgICBuZy1iaW5kLWh0bWw9XCIkY3RybC5jb250ZW50XCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXZcXG4gICAgICAgICAgY2xhc3M9XCJkZXRhaWxzIGlmcmFtZVwiXFxuICAgICAgICAgIG5nLWlmPVwiJGN0cmwudXJsICE9PSBudWxsXCI+XFxuICAgICAgICAgIDxpZnJhbWVcXG4gICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIlxcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0L2h0bWxcIlxcbiAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxcbiAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXFxuICAgICAgICAgICAgbmctc3JjPVwie3sgJGN0cmwudXJsVHJ1c3RlZCB9fVwiPjwvaWZyYW1lPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC10ZW1wbGF0ZS1jb250YWluZXJcIj48L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cXG4nO1xuXG59XG5yZXR1cm4gX19wXG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCAnbmdlby9zYXNzL2ZvbnQuc2Nzcyc7XG5pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXRzL3Jlc2l6YWJsZS5qcyc7XG5pbXBvcnQgJ2pxdWVyeS11aS91aS93aWRnZXRzL2RyYWdnYWJsZS5qcyc7XG5pbXBvcnQgJ25nZW8vc2Fzcy9qcXVlcnktdWkuc2Nzcyc7XG5pbXBvcnQgJ2FuZ3VsYXItc2FuaXRpemUnO1xudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dDb21wb25lbnQnLCBbJ25nU2FuaXRpemUnXSk7XG5tb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JywgcmVxdWlyZSgnLi9kaXNwbGF5d2luZG93Q29tcG9uZW50Lmh0bWwnKSk7XG59XSk7XG5tb2R1bGUudmFsdWUoJ25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsJywgZnVuY3Rpb24gKCRhdHRycykge1xuICB2YXIgdGVtcGxhdGVVcmwgPSAkYXR0cnNbJ25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsJ107XG4gIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQnO1xufSk7XG5uZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybC4kaW5qZWN0ID0gW1wiJGF0dHJzXCIsIFwibmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmxcIl07XG5cbmZ1bmN0aW9uIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycywgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbnZhciBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkZWxlbWVudFwiLCBcIiRzY2VcIiwgXCIkc2NvcGVcIiwgXCIkY29tcGlsZVwiXTtcblxuICBmdW5jdGlvbiBDb250cm9sbGVyKCRlbGVtZW50LCAkc2NlLCAkc2NvcGUsICRjb21waWxlKSB7XG4gICAgdGhpcy5jbGVhck9uQ2xvc2U7XG4gICAgdGhpcy5jb250ZW50O1xuICAgIHRoaXMuY29udGVudFRlbXBsYXRlO1xuICAgIHRoaXMuY29udGVudFNjb3BlO1xuICAgIHRoaXMuZHJhZ2dhYmxlO1xuICAgIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQ7XG4gICAgdGhpcy5kZXNrdG9wO1xuICAgIHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMub3BlbjtcbiAgICB0aGlzLnJlc2l6YWJsZTtcbiAgICB0aGlzLnRpdGxlO1xuICAgIHRoaXMudXJsO1xuICAgIHRoaXMud2lkdGg7XG4gICAgdGhpcy5lbGVtZW50XyA9ICRlbGVtZW50O1xuICAgIHRoaXMuc2NlXyA9ICRzY2U7XG4gICAgdGhpcy5zY29wZV8gPSAkc2NvcGU7XG4gICAgdGhpcy5jb21waWxlXyA9ICRjb21waWxlO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbnRyb2xsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by4kb25Jbml0ID0gZnVuY3Rpb24gJG9uSW5pdCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5jbGVhck9uQ2xvc2UgPSB0aGlzLmNsZWFyT25DbG9zZSAhPT0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5jb250ZW50IHx8IG51bGw7XG4gICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSB0aGlzLmNvbnRlbnRUZW1wbGF0ZSB8fCBudWxsO1xuICAgIHRoaXMuY29udGVudFNjb3BlID0gdGhpcy5jb250ZW50U2NvcGUgfHwgbnVsbDtcbiAgICB0aGlzLmRlc2t0b3AgPSB0aGlzLmRlc2t0b3AgIT09IGZhbHNlO1xuICAgIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgPSB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50IHx8ICdkb2N1bWVudCc7XG4gICAgdGhpcy5vcGVuID0gdGhpcy5vcGVuID09PSB0cnVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgfHwgJzI0MHB4JztcbiAgICB0aGlzLndpZHRoID0gdGhpcy53aWR0aCB8fCAnMjQwcHgnO1xuICAgIHRoaXMuZHJhZ2dhYmxlID0gdGhpcy5kcmFnZ2FibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMuZHJhZ2dhYmxlIDogdGhpcy5kZXNrdG9wO1xuICAgIHRoaXMucmVzaXphYmxlID0gdGhpcy5yZXNpemFibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMucmVzaXphYmxlIDogdGhpcy5kZXNrdG9wO1xuXG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRfLmZpbmQoJy5uZ2VvLWRpc3BsYXl3aW5kb3cgLndpbmRvd2NvbnRhaW5lcicpLmRyYWdnYWJsZSh7XG4gICAgICAgICdjb250YWlubWVudCc6IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQsXG4gICAgICAgICdoYW5kbGUnOiAnZGl2LmhlYWRlcidcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXInKS5yZXNpemFibGUoe1xuICAgICAgICAnbWluSGVpZ2h0JzogMjQwLFxuICAgICAgICAnbWluV2lkdGgnOiAyNDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb250ZW50VGVtcGxhdGU7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8udXBkYXRlQ29udGVudFRlbXBsYXRlXyA9IGZ1bmN0aW9uIHVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzY29wZSA9IHRoaXMuY29udGVudFNjb3BlIHx8IHRoaXMuc2NvcGVfO1xuICAgIHZhciBjb21waWxlZCA9IHRoaXMuY29tcGlsZV8odGhpcy5jb250ZW50VGVtcGxhdGUpKHNjb3BlKTtcbiAgICB2YXIgZGlzcGxheVdpbmRvdyA9IHRoaXMuZWxlbWVudF8uZmluZCgnLm5nZW8tZGlzcGxheXdpbmRvdyAud2luZG93Y29udGFpbmVyIC5hbmltYXRpb24tY29udGFpbmVyIC5jb250ZW50LXRlbXBsYXRlLWNvbnRhaW5lcicpO1xuICAgIGRpc3BsYXlXaW5kb3cuZW1wdHkoKTtcbiAgICBkaXNwbGF5V2luZG93LmFwcGVuZChjb21waWxlZCk7XG4gIH07XG5cbiAgX3Byb3RvLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5jbGVhck9uQ2xvc2UpIHtcbiAgICAgIHRoaXMuY2xlYXJfKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jbGVhcl8gPSBmdW5jdGlvbiBjbGVhcl8oKSB7XG4gICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICB0aGlzLnRpdGxlID0gbnVsbDtcbiAgICB0aGlzLnVybCA9IG51bGw7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKENvbnRyb2xsZXIsIFt7XG4gICAga2V5OiBcInN0eWxlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidXJsVHJ1c3RlZFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMudXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZV8udHJ1c3RBc1Jlc291cmNlVXJsKHRoaXMudXJsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcblxudmFyIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnY2xlYXJPbkNsb3NlJzogJzw/JyxcbiAgICAnY29udGVudCc6ICc9PycsXG4gICAgJ2NvbnRlbnRUZW1wbGF0ZSc6ICc9PycsXG4gICAgJ2NvbnRlbnRTY29wZSc6ICc8PycsXG4gICAgJ2Rlc2t0b3AnOiAnPD8nLFxuICAgICdkcmFnZ2FibGUnOiAnPD8nLFxuICAgICdkcmFnZ2FibGVDb250YWlubWVudCc6ICc8PycsXG4gICAgJ2hlaWdodCc6ICc9PycsXG4gICAgJ29wZW4nOiAnPT8nLFxuICAgICdyZXNpemFibGUnOiAnPD8nLFxuICAgICd0aXRsZSc6ICc9PycsXG4gICAgJ3VybCc6ICc9PycsXG4gICAgJ3dpZHRoJzogJz0/J1xuICB9LFxuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICB0ZW1wbGF0ZVVybDogbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmxcbn07XG5tb2R1bGUuY29tcG9uZW50KCduZ2VvRGlzcGxheXdpbmRvdycsIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBtb2R1bGU7Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9