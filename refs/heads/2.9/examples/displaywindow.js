/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/displaywindow.js":
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displaywindow_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displaywindow.scss */ "./examples/displaywindow.scss");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngeo_message_displaywindowComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngeo/message/displaywindowComponent */ "./src/message/displaywindowComponent.js");
// The MIT License (MIT)
//
// Copyright (c) 2018-2026 Camptocamp SA
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
const myModule = angular__WEBPACK_IMPORTED_MODULE_1___default().module('app', [ngeo_message_displaywindowComponent__WEBPACK_IMPORTED_MODULE_2__["default"].name]);

MainController.$inject = ['$scope'];

/**
 * @param {angular.IScope} $scope Scope.
 * @class
 */
function MainController($scope) {
  /**
   * @type {string}
   */
  this.window1Content = 'https://www.camptocamp.com';

  /**
   * @type {string}
   */
  this.window2Content = `<p>A window: <ul>
      <li>That have custom dimensions</li>
      <li>That is draggable</li>
      <li>That is rezisable</li>
      <li>That can be open and close</li>
      </ul></p>`;

  /**
   * @type {boolean}
   */
  this.window2IsOpen = false;

  /**
   * @type {boolean}
   */
  this.window3IsOpen = false;

  /**
   * @type {string}
   */
  this.window3Template = `
    <div class="details">
      <p>
          <h3>Using AngularJS directives:</h3>
          <span ng-if="!ctrl.window3FalseValue">This should appear</span>
          <span ng-show="ctrl.window3FalseValue">This should not be visible</span>
      </p>
    </div>
  `;

  /**
   * @type {boolean}
   */
  this.window3FalseValue = false;

  /**
   * @type {boolean}
   */
  this.window4IsOpen = false;
  const element = document.getElementById('window4Template');
  if (!element) {
    throw new Error('Missing element');
  }
  /**
   * @type {string}
   */
  this.window4Template = angular__WEBPACK_IMPORTED_MODULE_1___default().element(element).html();

  /**
   * @type {string}
   */
  this.window4TextBinding = 'This is an AngularJS binding.';

  /**
   * @type {angular.IScope}
   */
  this.windowScope = $scope;
}
myModule.controller('MainController', MainController);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ }),

/***/ "./examples/displaywindow.scss":
/*!*************************************!*\
  !*** ./examples/displaywindow.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/message/displaywindowComponent.html.js":
/*!****************************************************!*\
  !*** ./src/message/displaywindowComponent.html.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024-2026 Camptocamp SA
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`<div class="ngeo-displaywindow" ng-show="$ctrl.open" title="">
  <div class="windowcontainer" ng-style="$ctrl.style">
    <button type="button" class="btn fa-xmark close" ng-click="$ctrl.close()"></button>

    <div class="animation-container">
      <div class="slide-animation">
        <div class="header ui-draggable-handle" ng-if="$ctrl.title !== null">
          <p class="title">{{$ctrl.title | translate}}</p>
        </div>
        <div class="details content" ng-if="$ctrl.content" ng-bind-html="$ctrl.content"></div>
        <div class="details iframe" ng-if="$ctrl.url !== null">
          <iframe
            frameborder="0"
            type="text/html"
            height="100%"
            width="100%"
            ng-src="{{ $ctrl.urlTrusted }}"
          ></iframe>
        </div>
        <div class="content-template-container"></div>
      </div>
    </div>
  </div>
</div>`);


/***/ }),

/***/ "./src/message/displaywindowComponent.js":
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-sanitize */ "./node_modules/angular-sanitize/index.js");
/* harmony import */ var angular_sanitize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_sanitize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _displaywindowComponent_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displaywindowComponent.html */ "./src/message/displaywindowComponent.html.js");
// The MIT License (MIT)
//
// Copyright (c) 2017-2026 Camptocamp SA
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

// jquery-ui/ui/widgets/resizable must be imported by your main controller.
// jquery-ui/ui/widgets/draggable must be imported by your main controller.




/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ngeoMessageDisplaywindowComponent', ['ngSanitize']);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/message/displaywindowComponent', _displaywindowComponent_html__WEBPACK_IMPORTED_MODULE_2__["default"]);
    },
  ],
);
myModule.value(
  'ngeoMessageDisplaywindowTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/message/displaywindowComponent';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoMessageDisplaywindowTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoMessageDisplaywindowTemplateUrl.$inject = ['$attrs', 'ngeoMessageDisplaywindowTemplateUrl'];
function ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {
  return ngeoMessageDisplaywindowTemplateUrl($attrs);
}

/**
 * @hidden
 */
class Controller {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.ISCEService} $sce Angular sce service.
   * @param {angular.IScope} $scope Scope.
   * @param {angular.ICompileService} $compile The compile provider.
   * @ngdoc controller
   * @ngname ngeoDisplaywindowComponentController
   */
  constructor($element, $sce, $scope, $compile) {
    // === Binding Properties ===

    /**
     * @type {boolean}
     */
    this.clearOnClose;

    /**
     * @type {?string}
     */
    this.content;

    /**
     * @type {?string}
     */
    this.contentTemplate;

    /**
     * @type {?angular.IScope}
     */
    this.contentScope;

    /**
     * @type {boolean}
     */
    this.draggable;

    /**
     * @type {Element|string}
     */
    this.draggableContainment;

    /**
     * @type {boolean}
     */
    this.desktop;

    /**
     * @type {string}
     */
    this.height;

    /**
     * @type {boolean}
     */
    this.open;

    /**
     * @type {boolean}
     */
    this.resizable;

    /**
     * @type {?string}
     */
    this.title;

    /**
     * @type {?string}
     */
    this.url;

    /**
     * @type {string}
     */
    this.width;

    // === Injected Properties ===

    /**
     * @type {JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {angular.ISCEService}
     * @private
     */
    this.sce_ = $sce;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ICompileService}
     * @private
     */
    this.compile_ = $compile;
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {
    // Initialize binding properties
    this.clearOnClose = this.clearOnClose !== false;
    this.content = this.content || null;
    this.contentTemplate = this.contentTemplate || null;
    this.contentScope = this.contentScope || null;
    this.desktop = this.desktop !== false;
    this.draggableContainment = this.draggableContainment || 'document';
    this.open = this.open === true;
    this.height = this.height || '240px';
    this.width = this.width || '240px';

    /**
     * @type {Element}
     */
    this.containingElement = null;
    if (typeof this.draggableContainment === 'string') {
      if (this.draggableContainment !== 'document') {
        let className = String(this.draggableContainment);
        if (className.startsWith('.')) {
          className = className.substring(1);
        }
        this.containingElement = document.getElementsByClassName(className)[0];
      } else {
        this.containingElement = document.documentElement;
      }
    } else {
      this.containingElement = this.draggableContainment;
    }
    this.draggable = this.draggable !== undefined ? this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ? this.resizable : this.desktop;

    // Draggable
    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({
        'containment': this.draggableContainment,
        'handle': 'div.header',
      });
    }

    // Resizable
    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({
        'minHeight': 240,
        'minWidth': 240,
        resize: (event, ui) => {
          this.height = `${ui.size.height}px`;
          this.width = `${ui.size.width}px`;
        },
      });
    }
    if (this.contentTemplate) {
      this.updateContentTemplate_();
    }
    this.scope_.$watch(
      () => this.contentTemplate,
      () => this.updateContentTemplate_(),
    );
  }

  /**
   *  @private
   */
  updateContentTemplate_() {
    if (!this.contentTemplate) {
      return;
    }
    const scope = this.contentScope || this.scope_;
    const compiled = this.compile_(this.contentTemplate)(scope);
    const displayWindow = this.element_.find(
      '.ngeo-displaywindow .windowcontainer .animation-container .content-template-container',
    );
    displayWindow.empty();
    displayWindow.append(/** @type {?} */ compiled);
  }

  /**
   */
  close() {
    this.open = false;
    if (this.clearOnClose) {
      this.clear_();
    }
  }

  /**
   * @returns {Object<string, string>} CSS style when using width/height
   */
  get style() {
    this.maxWidth = this.containingElement.clientWidth - 20;
    this.maxHeight = this.containingElement.clientHeight - 20;
    return {
      height: this.height,
      width: this.width,
      'max-width': this.maxWidth.toString() + 'px',
      'max-height': this.maxHeight.toString() + 'px',
    };
  }

  /**
   * @returns {string|undefined} Trusted url.
   */
  get urlTrusted() {
    if (this.url) {
      return /** @type {string} */ this.sce_.trustAsResourceUrl(this.url);
    }
    return undefined;
  }

  /**
   */
  clear_() {
    this.content = null;
    this.title = null;
    this.url = null;
  }
}
Controller.$inject = ['$element', '$sce', '$scope', '$compile'];
/**
 * The `ngeo-displaywindow` component is an alternative to the `ngeo.message.Popup`.
 * What they have in common:
 *
 * - support title
 * - support url to be shown in an iframe
 * - support plain HTML content
 * - support sizing, i.e. height and width.
 * - support being opened/closed
 *
 * The differences with the `ngeo.message.Popup` are:
 *
 * - it supports being dragged
 * - it supports being resized
 * - support angularjs template content
 *
 * Example:
 *      <ngeo-displaywindow
 *        class="window1"
 *        url="::ctrl.window1Content"
 *        desktop="::false"
 *        open="::true"
 *        title="'Window 1 - The simplest window (close kills it)'">
 *      </ngeo-displaywindow>
 *
 * @htmlAttribute {boolean} [ngeo]-displaywindow-clear-on-close Whether to clear the content on close or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-content The html content. If not provided, you must provide
 *     an url.
 * @htmlAttribute {string} [ngeo]-displaywindow-content-template AngularJS template. It gets compiled during
 *    runtime with the supplied scope (ngeo-displaywindow-content-scope).
 * @htmlAttribute {angular.IScope} [ngeo]-displaywindow-content-scope Scope used for
 *    ngeo-displaywindow-content-template.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-desktop If true, the window is draggable and resizable. If
 *     not set, you must set manually both parameter.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-draggable Whether the window is draggable or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-draggable-containment The zone (CSS selector) where the window
 *     is authorized to be dragged.
 * @htmlAttribute {string} [ngeo]-displaywindow-height The default height of the window.
 * @htmlAttribute {boolean} [ngeo]-displaywindow-open Whether the window is open or not.
 * @htmlAttribute {string} [ngeo]-displaywindow-title The html title of the window.
 * @htmlAttribute {string} [ngeo]-displaywindow-url The URL to open in an iframe, in the window. The content
 *     attribute must not be provided.
 * @htmlAttribute {string} [ngeo]-displaywindow-width The default width of the window.
 * @ngdoc component
 * @ngname ngeoDisplaywindow
 */
const ngeoMessageDisplaywindowComponent = {
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
    'width': '=?',
  },
  controller: Controller,
  templateUrl: ngeoMessageDisplaywindowTemplateUrl,
};
myModule.component('ngeoDisplaywindow', ngeoMessageDisplaywindowComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myModule);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"displaywindow": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkngeo"] = self["webpackChunkngeo"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/common_dependencies.js")))
/******/ 	__webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/mainmodule.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./examples/displaywindow.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXdpbmRvdy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2R0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21lc3NhZ2UvZGlzcGxheXdpbmRvd0NvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNiBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vZGlzcGxheXdpbmRvdy5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudC5uYW1lXSk7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLndpbmRvdzFDb250ZW50ID0gJ2h0dHBzOi8vd3d3LmNhbXB0b2NhbXAuY29tJztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93MkNvbnRlbnQgPSBgPHA+QSB3aW5kb3c6IDx1bD5cbiAgICAgIDxsaT5UaGF0IGhhdmUgY3VzdG9tIGRpbWVuc2lvbnM8L2xpPlxuICAgICAgPGxpPlRoYXQgaXMgZHJhZ2dhYmxlPC9saT5cbiAgICAgIDxsaT5UaGF0IGlzIHJlemlzYWJsZTwvbGk+XG4gICAgICA8bGk+VGhhdCBjYW4gYmUgb3BlbiBhbmQgY2xvc2U8L2xpPlxuICAgICAgPC91bD48L3A+YDtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLndpbmRvdzJJc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLndpbmRvdzNJc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93M1RlbXBsYXRlID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XG4gICAgICA8cD5cbiAgICAgICAgICA8aDM+VXNpbmcgQW5ndWxhckpTIGRpcmVjdGl2ZXM6PC9oMz5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiFjdHJsLndpbmRvdzNGYWxzZVZhbHVlXCI+VGhpcyBzaG91bGQgYXBwZWFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIG5nLXNob3c9XCJjdHJsLndpbmRvdzNGYWxzZVZhbHVlXCI+VGhpcyBzaG91bGQgbm90IGJlIHZpc2libGU8L3NwYW4+XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy53aW5kb3czRmFsc2VWYWx1ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMud2luZG93NElzT3BlbiA9IGZhbHNlO1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmRvdzRUZW1wbGF0ZScpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZWxlbWVudCcpO1xuICB9XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53aW5kb3c0VGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuaHRtbCgpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53aW5kb3c0VGV4dEJpbmRpbmcgPSAnVGhpcyBpcyBhbiBBbmd1bGFySlMgYmluZGluZy4nO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLndpbmRvd1Njb3BlID0gJHNjb3BlO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNC0yMDI2IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBkZWZhdWx0IGA8ZGl2IGNsYXNzPVwibmdlby1kaXNwbGF5d2luZG93XCIgbmctc2hvdz1cIiRjdHJsLm9wZW5cIiB0aXRsZT1cIlwiPlxuICA8ZGl2IGNsYXNzPVwid2luZG93Y29udGFpbmVyXCIgbmctc3R5bGU9XCIkY3RybC5zdHlsZVwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGZhLXhtYXJrIGNsb3NlXCIgbmctY2xpY2s9XCIkY3RybC5jbG9zZSgpXCI+PC9idXR0b24+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlLWFuaW1hdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyIHVpLWRyYWdnYWJsZS1oYW5kbGVcIiBuZy1pZj1cIiRjdHJsLnRpdGxlICE9PSBudWxsXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0aXRsZVwiPnt7JGN0cmwudGl0bGUgfCB0cmFuc2xhdGV9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzIGNvbnRlbnRcIiBuZy1pZj1cIiRjdHJsLmNvbnRlbnRcIiBuZy1iaW5kLWh0bWw9XCIkY3RybC5jb250ZW50XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzIGlmcmFtZVwiIG5nLWlmPVwiJGN0cmwudXJsICE9PSBudWxsXCI+XG4gICAgICAgICAgPGlmcmFtZVxuICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0L2h0bWxcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgbmctc3JjPVwie3sgJGN0cmwudXJsVHJ1c3RlZCB9fVwiXG4gICAgICAgICAgPjwvaWZyYW1lPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtdGVtcGxhdGUtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gO1xuIiwiLy8gVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMjYgQ2FtcHRvY2FtcCBTQVxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2Zcbi8vIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbi8vIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbi8vIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mXG4vLyB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXG4vLyBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbi8vIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1Ncbi8vIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxuLy8gQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTlxuLy8gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8ganF1ZXJ5LXVpL3VpL3dpZGdldHMvcmVzaXphYmxlIG11c3QgYmUgaW1wb3J0ZWQgYnkgeW91ciBtYWluIGNvbnRyb2xsZXIuXG4vLyBqcXVlcnktdWkvdWkvd2lkZ2V0cy9kcmFnZ2FibGUgbXVzdCBiZSBpbXBvcnRlZCBieSB5b3VyIG1haW4gY29udHJvbGxlci5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0ICdhbmd1bGFyLXNhbml0aXplJztcbmltcG9ydCBodG1sVGVtcGxhdGUgZnJvbSAnLi9kaXNwbGF5d2luZG93Q29tcG9uZW50Lmh0bWwnO1xuXG4vKipcbiAqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9XG4gKiBAaGlkZGVuXG4gKi9cbmNvbnN0IG15TW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCcsIFsnbmdTYW5pdGl6ZSddKTtcbm15TW9kdWxlLnJ1bihcbiAgLyoqXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JVGVtcGxhdGVDYWNoZVNlcnZpY2V9ICR0ZW1wbGF0ZUNhY2hlXG4gICAqL1xuICBbXG4gICAgJyR0ZW1wbGF0ZUNhY2hlJyxcbiAgICAoJHRlbXBsYXRlQ2FjaGUpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmU6IHdlYnBhY2tcbiAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbmdlby9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQnLCBodG1sVGVtcGxhdGUpO1xuICAgIH0sXG4gIF0sXG4pO1xubXlNb2R1bGUudmFsdWUoXG4gICduZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCcsXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdGVtcGxhdGUgdXJsLlxuICAgKi9cbiAgKCRhdHRycykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlVXJsID0gJGF0dHJzWyduZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCddO1xuICAgIHJldHVybiB0ZW1wbGF0ZVVybCAhPT0gdW5kZWZpbmVkID8gdGVtcGxhdGVVcmwgOiAnbmdlby9tZXNzYWdlL2Rpc3BsYXl3aW5kb3dDb21wb25lbnQnO1xuICB9LFxuKTtcblxuLyoqXG4gKiBAcGFyYW0ge2FuZ3VsYXIuSUF0dHJpYnV0ZXN9ICRhdHRycyBBdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtmdW5jdGlvbihhbmd1bGFyLklBdHRyaWJ1dGVzKTogc3RyaW5nfSBuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCBUZW1wbGF0ZSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRlbXBsYXRlIFVSTC5cbiAqIEBwcml2YXRlXG4gKiBAaGlkZGVuXG4gKi9cbm5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsLiRpbmplY3QgPSBbJyRhdHRycycsICduZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCddO1xuZnVuY3Rpb24gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwoJGF0dHJzLCBuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybCkge1xuICByZXR1cm4gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwoJGF0dHJzKTtcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7SlF1ZXJ5fSAkZWxlbWVudCBFbGVtZW50LlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVNDRVNlcnZpY2V9ICRzY2UgQW5ndWxhciBzY2Ugc2VydmljZS5cbiAgICogQHBhcmFtIHthbmd1bGFyLklTY29wZX0gJHNjb3BlIFNjb3BlLlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlfSAkY29tcGlsZSBUaGUgY29tcGlsZSBwcm92aWRlci5cbiAgICogQG5nZG9jIGNvbnRyb2xsZXJcbiAgICogQG5nbmFtZSBuZ2VvRGlzcGxheXdpbmRvd0NvbXBvbmVudENvbnRyb2xsZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKCRlbGVtZW50LCAkc2NlLCAkc2NvcGUsICRjb21waWxlKSB7XG4gICAgLy8gPT09IEJpbmRpbmcgUHJvcGVydGllcyA9PT1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuY2xlYXJPbkNsb3NlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9zdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5jb250ZW50O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9zdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5jb250ZW50VGVtcGxhdGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P2FuZ3VsYXIuSVNjb3BlfVxuICAgICAqL1xuICAgIHRoaXMuY29udGVudFNjb3BlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2FibGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RWxlbWVudHxzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5kcmFnZ2FibGVDb250YWlubWVudDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZGVza3RvcDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5oZWlnaHQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLm9wZW47XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc2l6YWJsZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudGl0bGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnVybDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy53aWR0aDtcblxuICAgIC8vID09PSBJbmplY3RlZCBQcm9wZXJ0aWVzID09PVxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZWxlbWVudF8gPSAkZWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklTQ0VTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zY2VfID0gJHNjZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklTY29wZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NvcGVfID0gJHNjb3BlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2FuZ3VsYXIuSUNvbXBpbGVTZXJ2aWNlfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5jb21waWxlXyA9ICRjb21waWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBvbiBpbml0aWFsaXphdGlvbiBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgJG9uSW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIGJpbmRpbmcgcHJvcGVydGllc1xuICAgIHRoaXMuY2xlYXJPbkNsb3NlID0gdGhpcy5jbGVhck9uQ2xvc2UgIT09IGZhbHNlO1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuY29udGVudCB8fCBudWxsO1xuICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gdGhpcy5jb250ZW50VGVtcGxhdGUgfHwgbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRTY29wZSA9IHRoaXMuY29udGVudFNjb3BlIHx8IG51bGw7XG4gICAgdGhpcy5kZXNrdG9wID0gdGhpcy5kZXNrdG9wICE9PSBmYWxzZTtcbiAgICB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50ID0gdGhpcy5kcmFnZ2FibGVDb250YWlubWVudCB8fCAnZG9jdW1lbnQnO1xuICAgIHRoaXMub3BlbiA9IHRoaXMub3BlbiA9PT0gdHJ1ZTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuaGVpZ2h0IHx8ICcyNDBweCc7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMud2lkdGggfHwgJzI0MHB4JztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuY29udGFpbmluZ0VsZW1lbnQgPSBudWxsO1xuICAgIGlmICh0eXBlb2YgdGhpcy5kcmFnZ2FibGVDb250YWlubWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50ICE9PSAnZG9jdW1lbnQnKSB7XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBTdHJpbmcodGhpcy5kcmFnZ2FibGVDb250YWlubWVudCk7XG4gICAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRhaW5pbmdFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb250YWluaW5nRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb250YWluaW5nRWxlbWVudCA9IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQ7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dhYmxlID0gdGhpcy5kcmFnZ2FibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMuZHJhZ2dhYmxlIDogdGhpcy5kZXNrdG9wO1xuICAgIHRoaXMucmVzaXphYmxlID0gdGhpcy5yZXNpemFibGUgIT09IHVuZGVmaW5lZCA/IHRoaXMucmVzaXphYmxlIDogdGhpcy5kZXNrdG9wO1xuXG4gICAgLy8gRHJhZ2dhYmxlXG4gICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRfLmZpbmQoJy5uZ2VvLWRpc3BsYXl3aW5kb3cgLndpbmRvd2NvbnRhaW5lcicpLmRyYWdnYWJsZSh7XG4gICAgICAgICdjb250YWlubWVudCc6IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQsXG4gICAgICAgICdoYW5kbGUnOiAnZGl2LmhlYWRlcicsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZXNpemFibGVcbiAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcbiAgICAgIHRoaXMuZWxlbWVudF8uZmluZCgnLm5nZW8tZGlzcGxheXdpbmRvdyAud2luZG93Y29udGFpbmVyJykucmVzaXphYmxlKHtcbiAgICAgICAgJ21pbkhlaWdodCc6IDI0MCxcbiAgICAgICAgJ21pbldpZHRoJzogMjQwLFxuICAgICAgICByZXNpemU6IChldmVudCwgdWkpID0+IHtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IGAke3VpLnNpemUuaGVpZ2h0fXB4YDtcbiAgICAgICAgICB0aGlzLndpZHRoID0gYCR7dWkuc2l6ZS53aWR0aH1weGA7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udGVudFRlbXBsYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKTtcbiAgICB9XG4gICAgdGhpcy5zY29wZV8uJHdhdGNoKFxuICAgICAgKCkgPT4gdGhpcy5jb250ZW50VGVtcGxhdGUsXG4gICAgICAoKSA9PiB0aGlzLnVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqICBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlQ29udGVudFRlbXBsYXRlXygpIHtcbiAgICBpZiAoIXRoaXMuY29udGVudFRlbXBsYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNjb3BlID0gdGhpcy5jb250ZW50U2NvcGUgfHwgdGhpcy5zY29wZV87XG4gICAgY29uc3QgY29tcGlsZWQgPSB0aGlzLmNvbXBpbGVfKHRoaXMuY29udGVudFRlbXBsYXRlKShzY29wZSk7XG4gICAgY29uc3QgZGlzcGxheVdpbmRvdyA9IHRoaXMuZWxlbWVudF8uZmluZChcbiAgICAgICcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXIgLmFuaW1hdGlvbi1jb250YWluZXIgLmNvbnRlbnQtdGVtcGxhdGUtY29udGFpbmVyJyxcbiAgICApO1xuICAgIGRpc3BsYXlXaW5kb3cuZW1wdHkoKTtcbiAgICBkaXNwbGF5V2luZG93LmFwcGVuZCgvKiogQHR5cGUgez99ICovIGNvbXBpbGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY2xlYXJPbkNsb3NlKSB7XG4gICAgICB0aGlzLmNsZWFyXygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gQ1NTIHN0eWxlIHdoZW4gdXNpbmcgd2lkdGgvaGVpZ2h0XG4gICAqL1xuICBnZXQgc3R5bGUoKSB7XG4gICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMuY29udGFpbmluZ0VsZW1lbnQuY2xpZW50V2lkdGggLSAyMDtcbiAgICB0aGlzLm1heEhlaWdodCA9IHRoaXMuY29udGFpbmluZ0VsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMjA7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICdtYXgtd2lkdGgnOiB0aGlzLm1heFdpZHRoLnRvU3RyaW5nKCkgKyAncHgnLFxuICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm1heEhlaWdodC50b1N0cmluZygpICsgJ3B4JyxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBUcnVzdGVkIHVybC5cbiAgICovXG4gIGdldCB1cmxUcnVzdGVkKCkge1xuICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyB0aGlzLnNjZV8udHJ1c3RBc1Jlc291cmNlVXJsKHRoaXMudXJsKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKi9cbiAgY2xlYXJfKCkge1xuICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgdGhpcy50aXRsZSA9IG51bGw7XG4gICAgdGhpcy51cmwgPSBudWxsO1xuICB9XG59XG5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyRzY2UnLCAnJHNjb3BlJywgJyRjb21waWxlJ107XG4vKipcbiAqIFRoZSBgbmdlby1kaXNwbGF5d2luZG93YCBjb21wb25lbnQgaXMgYW4gYWx0ZXJuYXRpdmUgdG8gdGhlIGBuZ2VvLm1lc3NhZ2UuUG9wdXBgLlxuICogV2hhdCB0aGV5IGhhdmUgaW4gY29tbW9uOlxuICpcbiAqIC0gc3VwcG9ydCB0aXRsZVxuICogLSBzdXBwb3J0IHVybCB0byBiZSBzaG93biBpbiBhbiBpZnJhbWVcbiAqIC0gc3VwcG9ydCBwbGFpbiBIVE1MIGNvbnRlbnRcbiAqIC0gc3VwcG9ydCBzaXppbmcsIGkuZS4gaGVpZ2h0IGFuZCB3aWR0aC5cbiAqIC0gc3VwcG9ydCBiZWluZyBvcGVuZWQvY2xvc2VkXG4gKlxuICogVGhlIGRpZmZlcmVuY2VzIHdpdGggdGhlIGBuZ2VvLm1lc3NhZ2UuUG9wdXBgIGFyZTpcbiAqXG4gKiAtIGl0IHN1cHBvcnRzIGJlaW5nIGRyYWdnZWRcbiAqIC0gaXQgc3VwcG9ydHMgYmVpbmcgcmVzaXplZFxuICogLSBzdXBwb3J0IGFuZ3VsYXJqcyB0ZW1wbGF0ZSBjb250ZW50XG4gKlxuICogRXhhbXBsZTpcbiAqICAgICAgPG5nZW8tZGlzcGxheXdpbmRvd1xuICogICAgICAgIGNsYXNzPVwid2luZG93MVwiXG4gKiAgICAgICAgdXJsPVwiOjpjdHJsLndpbmRvdzFDb250ZW50XCJcbiAqICAgICAgICBkZXNrdG9wPVwiOjpmYWxzZVwiXG4gKiAgICAgICAgb3Blbj1cIjo6dHJ1ZVwiXG4gKiAgICAgICAgdGl0bGU9XCInV2luZG93IDEgLSBUaGUgc2ltcGxlc3Qgd2luZG93IChjbG9zZSBraWxscyBpdCknXCI+XG4gKiAgICAgIDwvbmdlby1kaXNwbGF5d2luZG93PlxuICpcbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBbbmdlb10tZGlzcGxheXdpbmRvdy1jbGVhci1vbi1jbG9zZSBXaGV0aGVyIHRvIGNsZWFyIHRoZSBjb250ZW50IG9uIGNsb3NlIG9yIG5vdC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWNvbnRlbnQgVGhlIGh0bWwgY29udGVudC4gSWYgbm90IHByb3ZpZGVkLCB5b3UgbXVzdCBwcm92aWRlXG4gKiAgICAgYW4gdXJsLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctY29udGVudC10ZW1wbGF0ZSBBbmd1bGFySlMgdGVtcGxhdGUuIEl0IGdldHMgY29tcGlsZWQgZHVyaW5nXG4gKiAgICBydW50aW1lIHdpdGggdGhlIHN1cHBsaWVkIHNjb3BlIChuZ2VvLWRpc3BsYXl3aW5kb3ctY29udGVudC1zY29wZSkuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7YW5ndWxhci5JU2NvcGV9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWNvbnRlbnQtc2NvcGUgU2NvcGUgdXNlZCBmb3JcbiAqICAgIG5nZW8tZGlzcGxheXdpbmRvdy1jb250ZW50LXRlbXBsYXRlLlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IFtuZ2VvXS1kaXNwbGF5d2luZG93LWRlc2t0b3AgSWYgdHJ1ZSwgdGhlIHdpbmRvdyBpcyBkcmFnZ2FibGUgYW5kIHJlc2l6YWJsZS4gSWZcbiAqICAgICBub3Qgc2V0LCB5b3UgbXVzdCBzZXQgbWFudWFsbHkgYm90aCBwYXJhbWV0ZXIuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gW25nZW9dLWRpc3BsYXl3aW5kb3ctZHJhZ2dhYmxlIFdoZXRoZXIgdGhlIHdpbmRvdyBpcyBkcmFnZ2FibGUgb3Igbm90LlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctZHJhZ2dhYmxlLWNvbnRhaW5tZW50IFRoZSB6b25lIChDU1Mgc2VsZWN0b3IpIHdoZXJlIHRoZSB3aW5kb3dcbiAqICAgICBpcyBhdXRob3JpemVkIHRvIGJlIGRyYWdnZWQuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBbbmdlb10tZGlzcGxheXdpbmRvdy1oZWlnaHQgVGhlIGRlZmF1bHQgaGVpZ2h0IG9mIHRoZSB3aW5kb3cuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gW25nZW9dLWRpc3BsYXl3aW5kb3ctb3BlbiBXaGV0aGVyIHRoZSB3aW5kb3cgaXMgb3BlbiBvciBub3QuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBbbmdlb10tZGlzcGxheXdpbmRvdy10aXRsZSBUaGUgaHRtbCB0aXRsZSBvZiB0aGUgd2luZG93LlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctdXJsIFRoZSBVUkwgdG8gb3BlbiBpbiBhbiBpZnJhbWUsIGluIHRoZSB3aW5kb3cuIFRoZSBjb250ZW50XG4gKiAgICAgYXR0cmlidXRlIG11c3Qgbm90IGJlIHByb3ZpZGVkLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctd2lkdGggVGhlIGRlZmF1bHQgd2lkdGggb2YgdGhlIHdpbmRvdy5cbiAqIEBuZ2RvYyBjb21wb25lbnRcbiAqIEBuZ25hbWUgbmdlb0Rpc3BsYXl3aW5kb3dcbiAqL1xuY29uc3Qgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50ID0ge1xuICBiaW5kaW5nczoge1xuICAgICdjbGVhck9uQ2xvc2UnOiAnPD8nLFxuICAgICdjb250ZW50JzogJz0/JyxcbiAgICAnY29udGVudFRlbXBsYXRlJzogJz0/JyxcbiAgICAnY29udGVudFNjb3BlJzogJzw/JyxcbiAgICAnZGVza3RvcCc6ICc8PycsXG4gICAgJ2RyYWdnYWJsZSc6ICc8PycsXG4gICAgJ2RyYWdnYWJsZUNvbnRhaW5tZW50JzogJzw/JyxcbiAgICAnaGVpZ2h0JzogJz0/JyxcbiAgICAnb3Blbic6ICc9PycsXG4gICAgJ3Jlc2l6YWJsZSc6ICc8PycsXG4gICAgJ3RpdGxlJzogJz0/JyxcbiAgICAndXJsJzogJz0/JyxcbiAgICAnd2lkdGgnOiAnPT8nLFxuICB9LFxuICBjb250cm9sbGVyOiBDb250cm9sbGVyLFxuICB0ZW1wbGF0ZVVybDogbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwsXG59O1xubXlNb2R1bGUuY29tcG9uZW50KCduZ2VvRGlzcGxheXdpbmRvdycsIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCk7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImRpc3BsYXl3aW5kb3dcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==