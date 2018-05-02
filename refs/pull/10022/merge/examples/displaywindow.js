/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/displaywindow.js"
/*!***********************************!*\
  !*** ./examples/displaywindow.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
// Copyright (c) 2018-2024 Camptocamp SA
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


/***/ },

/***/ "./examples/displaywindow.scss"
/*!*************************************!*\
  !*** ./examples/displaywindow.scss ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/message/displaywindowComponent.html.js"
/*!****************************************************!*\
  !*** ./src/message/displaywindowComponent.html.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
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


/***/ },

/***/ "./src/message/displaywindowComponent.js"
/*!***********************************************!*\
  !*** ./src/message/displaywindowComponent.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
// Copyright (c) 2017-2025 Camptocamp SA
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


/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheXdpbmRvdy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2R0E7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FFaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanMiLCJ3ZWJwYWNrOi8vbmdlby8uL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuc2NzcyIsIndlYnBhY2s6Ly9uZ2VvLy4vc3JjL21lc3NhZ2UvZGlzcGxheXdpbmRvd0NvbXBvbmVudC5odG1sLmpzIiwid2VicGFjazovL25nZW8vLi9zcmMvbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50LmpzIiwid2VicGFjazovL25nZW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmdlby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25nZW8vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL25nZW8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9uZ2VvL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTgtMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgJy4vZGlzcGxheXdpbmRvdy5zY3NzJztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93Q29tcG9uZW50IGZyb20gJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JztcblxuLyoqIEB0eXBlIHthbmd1bGFyLklNb2R1bGV9ICoqL1xuY29uc3QgbXlNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW25nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudC5uYW1lXSk7XG5cbk1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xuXG4vKipcbiAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAqIEBjbGFzc1xuICovXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLndpbmRvdzFDb250ZW50ID0gJ2h0dHBzOi8vd3d3LmNhbXB0b2NhbXAuY29tJztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93MkNvbnRlbnQgPSBgPHA+QSB3aW5kb3c6IDx1bD5cbiAgICAgIDxsaT5UaGF0IGhhdmUgY3VzdG9tIGRpbWVuc2lvbnM8L2xpPlxuICAgICAgPGxpPlRoYXQgaXMgZHJhZ2dhYmxlPC9saT5cbiAgICAgIDxsaT5UaGF0IGlzIHJlemlzYWJsZTwvbGk+XG4gICAgICA8bGk+VGhhdCBjYW4gYmUgb3BlbiBhbmQgY2xvc2U8L2xpPlxuICAgICAgPC91bD48L3A+YDtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLndpbmRvdzJJc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLndpbmRvdzNJc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRoaXMud2luZG93M1RlbXBsYXRlID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCI+XG4gICAgICA8cD5cbiAgICAgICAgICA8aDM+VXNpbmcgQW5ndWxhckpTIGRpcmVjdGl2ZXM6PC9oMz5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiFjdHJsLndpbmRvdzNGYWxzZVZhbHVlXCI+VGhpcyBzaG91bGQgYXBwZWFyPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIG5nLXNob3c9XCJjdHJsLndpbmRvdzNGYWxzZVZhbHVlXCI+VGhpcyBzaG91bGQgbm90IGJlIHZpc2libGU8L3NwYW4+XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy53aW5kb3czRmFsc2VWYWx1ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMud2luZG93NElzT3BlbiA9IGZhbHNlO1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbmRvdzRUZW1wbGF0ZScpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZWxlbWVudCcpO1xuICB9XG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53aW5kb3c0VGVtcGxhdGUgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuaHRtbCgpO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGhpcy53aW5kb3c0VGV4dEJpbmRpbmcgPSAnVGhpcyBpcyBhbiBBbmd1bGFySlMgYmluZGluZy4nO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAqL1xuICB0aGlzLndpbmRvd1Njb3BlID0gJHNjb3BlO1xufVxubXlNb2R1bGUuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcik7XG5leHBvcnQgZGVmYXVsdCBteU1vZHVsZTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAyNCBDYW1wdG9jYW1wIFNBXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxuLy8gdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxuLy8gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xuLy8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2Zcbi8vIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcbi8vIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuLy8gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTU1xuLy8gRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXG4vLyBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOXG4vLyBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5leHBvcnQgZGVmYXVsdCBgPGRpdiBjbGFzcz1cIm5nZW8tZGlzcGxheXdpbmRvd1wiIG5nLXNob3c9XCIkY3RybC5vcGVuXCIgdGl0bGU9XCJcIj5cbiAgPGRpdiBjbGFzcz1cIndpbmRvd2NvbnRhaW5lclwiIG5nLXN0eWxlPVwiJGN0cmwuc3R5bGVcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBmYS14bWFyayBjbG9zZVwiIG5nLWNsaWNrPVwiJGN0cmwuY2xvc2UoKVwiPjwvYnV0dG9uPlxuXG4gICAgPGRpdiBjbGFzcz1cImFuaW1hdGlvbi1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1hbmltYXRpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlciB1aS1kcmFnZ2FibGUtaGFuZGxlXCIgbmctaWY9XCIkY3RybC50aXRsZSAhPT0gbnVsbFwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGl0bGVcIj57eyRjdHJsLnRpdGxlIHwgdHJhbnNsYXRlfX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscyBjb250ZW50XCIgbmctaWY9XCIkY3RybC5jb250ZW50XCIgbmctYmluZC1odG1sPVwiJGN0cmwuY29udGVudFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlscyBpZnJhbWVcIiBuZy1pZj1cIiRjdHJsLnVybCAhPT0gbnVsbFwiPlxuICAgICAgICAgIDxpZnJhbWVcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dC9odG1sXCJcbiAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgIG5nLXNyYz1cInt7ICRjdHJsLnVybFRydXN0ZWQgfX1cIlxuICAgICAgICAgID48L2lmcmFtZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LXRlbXBsYXRlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YDtcbiIsIi8vIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuLy9cbi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDI1IENhbXB0b2NhbXAgU0Fcbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG4vLyB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG4vLyB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG4vLyB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxuLy8gdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxuLy8gc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4vLyBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTXG4vLyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1Jcbi8vIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU5cbi8vIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIGpxdWVyeS11aS91aS93aWRnZXRzL3Jlc2l6YWJsZSBtdXN0IGJlIGltcG9ydGVkIGJ5IHlvdXIgbWFpbiBjb250cm9sbGVyLlxuLy8ganF1ZXJ5LXVpL3VpL3dpZGdldHMvZHJhZ2dhYmxlIG11c3QgYmUgaW1wb3J0ZWQgYnkgeW91ciBtYWluIGNvbnRyb2xsZXIuXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcbmltcG9ydCAnYW5ndWxhci1zYW5pdGl6ZSc7XG5pbXBvcnQgaHRtbFRlbXBsYXRlIGZyb20gJy4vZGlzcGxheXdpbmRvd0NvbXBvbmVudC5odG1sJztcblxuLyoqXG4gKiBAdHlwZSB7YW5ndWxhci5JTW9kdWxlfVxuICogQGhpZGRlblxuICovXG5jb25zdCBteU1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCduZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dDb21wb25lbnQnLCBbJ25nU2FuaXRpemUnXSk7XG5teU1vZHVsZS5ydW4oXG4gIC8qKlxuICAgKiBAcGFyYW0ge2FuZ3VsYXIuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlfSAkdGVtcGxhdGVDYWNoZVxuICAgKi9cbiAgW1xuICAgICckdGVtcGxhdGVDYWNoZScsXG4gICAgKCR0ZW1wbGF0ZUNhY2hlKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlOiB3ZWJwYWNrXG4gICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JywgaHRtbFRlbXBsYXRlKTtcbiAgICB9LFxuICBdLFxuKTtcbm15TW9kdWxlLnZhbHVlKFxuICAnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnLFxuICAvKipcbiAgICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRlbXBsYXRlIHVybC5cbiAgICovXG4gICgkYXR0cnMpID0+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZVVybCA9ICRhdHRyc1snbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnXTtcbiAgICByZXR1cm4gdGVtcGxhdGVVcmwgIT09IHVuZGVmaW5lZCA/IHRlbXBsYXRlVXJsIDogJ25nZW8vbWVzc2FnZS9kaXNwbGF5d2luZG93Q29tcG9uZW50JztcbiAgfSxcbik7XG5cbi8qKlxuICogQHBhcmFtIHthbmd1bGFyLklBdHRyaWJ1dGVzfSAkYXR0cnMgQXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oYW5ndWxhci5JQXR0cmlidXRlcyk6IHN0cmluZ30gbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwgVGVtcGxhdGUgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUZW1wbGF0ZSBVUkwuXG4gKiBAcHJpdmF0ZVxuICogQGhpZGRlblxuICovXG5uZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dUZW1wbGF0ZVVybC4kaW5qZWN0ID0gWyckYXR0cnMnLCAnbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwnXTtcbmZ1bmN0aW9uIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycywgbmdlb01lc3NhZ2VEaXNwbGF5d2luZG93VGVtcGxhdGVVcmwpIHtcbiAgcmV0dXJuIG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsKCRhdHRycyk7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGVsZW1lbnQgRWxlbWVudC5cbiAgICogQHBhcmFtIHthbmd1bGFyLklTQ0VTZXJ2aWNlfSAkc2NlIEFuZ3VsYXIgc2NlIHNlcnZpY2UuXG4gICAqIEBwYXJhbSB7YW5ndWxhci5JU2NvcGV9ICRzY29wZSBTY29wZS5cbiAgICogQHBhcmFtIHthbmd1bGFyLklDb21waWxlU2VydmljZX0gJGNvbXBpbGUgVGhlIGNvbXBpbGUgcHJvdmlkZXIuXG4gICAqIEBuZ2RvYyBjb250cm9sbGVyXG4gICAqIEBuZ25hbWUgbmdlb0Rpc3BsYXl3aW5kb3dDb21wb25lbnRDb250cm9sbGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgJHNjZSwgJHNjb3BlLCAkY29tcGlsZSkge1xuICAgIC8vID09PSBCaW5kaW5nIFByb3BlcnRpZXMgPT09XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmNsZWFyT25DbG9zZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuY29udGVudDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuY29udGVudFRlbXBsYXRlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9hbmd1bGFyLklTY29wZX1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRlbnRTY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0VsZW1lbnR8c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmRlc2t0b3A7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuaGVpZ2h0O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5vcGVuO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXNpemFibGU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7P3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnRpdGxlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgez9zdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy51cmw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMud2lkdGg7XG5cbiAgICAvLyA9PT0gSW5qZWN0ZWQgUHJvcGVydGllcyA9PT1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnRfID0gJGVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU0NFU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NlXyA9ICRzY2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW5ndWxhci5JU2NvcGV9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNjb3BlXyA9ICRzY29wZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbmd1bGFyLklDb21waWxlU2VydmljZX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuY29tcGlsZV8gPSAkY29tcGlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgb24gaW5pdGlhbGl6YXRpb24gb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gICRvbkluaXQoKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBiaW5kaW5nIHByb3BlcnRpZXNcbiAgICB0aGlzLmNsZWFyT25DbG9zZSA9IHRoaXMuY2xlYXJPbkNsb3NlICE9PSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQgfHwgbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IHRoaXMuY29udGVudFRlbXBsYXRlIHx8IG51bGw7XG4gICAgdGhpcy5jb250ZW50U2NvcGUgPSB0aGlzLmNvbnRlbnRTY29wZSB8fCBudWxsO1xuICAgIHRoaXMuZGVza3RvcCA9IHRoaXMuZGVza3RvcCAhPT0gZmFsc2U7XG4gICAgdGhpcy5kcmFnZ2FibGVDb250YWlubWVudCA9IHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgfHwgJ2RvY3VtZW50JztcbiAgICB0aGlzLm9wZW4gPSB0aGlzLm9wZW4gPT09IHRydWU7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmhlaWdodCB8fCAnMjQwcHgnO1xuICAgIHRoaXMud2lkdGggPSB0aGlzLndpZHRoIHx8ICcyNDBweCc7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRhaW5pbmdFbGVtZW50ID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2FibGVDb250YWlubWVudCAhPT0gJ2RvY3VtZW50Jykge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gU3RyaW5nKHRoaXMuZHJhZ2dhYmxlQ29udGFpbm1lbnQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluaW5nRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmluZ0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmluZ0VsZW1lbnQgPSB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50O1xuICAgIH1cbiAgICB0aGlzLmRyYWdnYWJsZSA9IHRoaXMuZHJhZ2dhYmxlICE9PSB1bmRlZmluZWQgPyB0aGlzLmRyYWdnYWJsZSA6IHRoaXMuZGVza3RvcDtcbiAgICB0aGlzLnJlc2l6YWJsZSA9IHRoaXMucmVzaXphYmxlICE9PSB1bmRlZmluZWQgPyB0aGlzLnJlc2l6YWJsZSA6IHRoaXMuZGVza3RvcDtcblxuICAgIC8vIERyYWdnYWJsZVxuICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50Xy5maW5kKCcubmdlby1kaXNwbGF5d2luZG93IC53aW5kb3djb250YWluZXInKS5kcmFnZ2FibGUoe1xuICAgICAgICAnY29udGFpbm1lbnQnOiB0aGlzLmRyYWdnYWJsZUNvbnRhaW5tZW50LFxuICAgICAgICAnaGFuZGxlJzogJ2Rpdi5oZWFkZXInLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVzaXphYmxlXG4gICAgaWYgKHRoaXMucmVzaXphYmxlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRfLmZpbmQoJy5uZ2VvLWRpc3BsYXl3aW5kb3cgLndpbmRvd2NvbnRhaW5lcicpLnJlc2l6YWJsZSh7XG4gICAgICAgICdtaW5IZWlnaHQnOiAyNDAsXG4gICAgICAgICdtaW5XaWR0aCc6IDI0MCxcbiAgICAgICAgcmVzaXplOiAoZXZlbnQsIHVpKSA9PiB7XG4gICAgICAgICAgdGhpcy5oZWlnaHQgPSBgJHt1aS5zaXplLmhlaWdodH1weGA7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IGAke3VpLnNpemUud2lkdGh9cHhgO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCk7XG4gICAgfVxuICAgIHRoaXMuc2NvcGVfLiR3YXRjaChcbiAgICAgICgpID0+IHRoaXMuY29udGVudFRlbXBsYXRlLFxuICAgICAgKCkgPT4gdGhpcy51cGRhdGVDb250ZW50VGVtcGxhdGVfKCksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgQHByaXZhdGVcbiAgICovXG4gIHVwZGF0ZUNvbnRlbnRUZW1wbGF0ZV8oKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnRUZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY29wZSA9IHRoaXMuY29udGVudFNjb3BlIHx8IHRoaXMuc2NvcGVfO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gdGhpcy5jb21waWxlXyh0aGlzLmNvbnRlbnRUZW1wbGF0ZSkoc2NvcGUpO1xuICAgIGNvbnN0IGRpc3BsYXlXaW5kb3cgPSB0aGlzLmVsZW1lbnRfLmZpbmQoXG4gICAgICAnLm5nZW8tZGlzcGxheXdpbmRvdyAud2luZG93Y29udGFpbmVyIC5hbmltYXRpb24tY29udGFpbmVyIC5jb250ZW50LXRlbXBsYXRlLWNvbnRhaW5lcicsXG4gICAgKTtcbiAgICBkaXNwbGF5V2luZG93LmVtcHR5KCk7XG4gICAgZGlzcGxheVdpbmRvdy5hcHBlbmQoLyoqIEB0eXBlIHs/fSAqLyBjb21waWxlZCk7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNsZWFyT25DbG9zZSkge1xuICAgICAgdGhpcy5jbGVhcl8oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIHN0cmluZz59IENTUyBzdHlsZSB3aGVuIHVzaW5nIHdpZHRoL2hlaWdodFxuICAgKi9cbiAgZ2V0IHN0eWxlKCkge1xuICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmNvbnRhaW5pbmdFbGVtZW50LmNsaWVudFdpZHRoIC0gMjA7XG4gICAgdGhpcy5tYXhIZWlnaHQgPSB0aGlzLmNvbnRhaW5pbmdFbGVtZW50LmNsaWVudEhlaWdodCAtIDIwO1xuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAnbWF4LXdpZHRoJzogdGhpcy5tYXhXaWR0aC50b1N0cmluZygpICsgJ3B4JyxcbiAgICAgICdtYXgtaGVpZ2h0JzogdGhpcy5tYXhIZWlnaHQudG9TdHJpbmcoKSArICdweCcsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gVHJ1c3RlZCB1cmwuXG4gICAqL1xuICBnZXQgdXJsVHJ1c3RlZCgpIHtcbiAgICBpZiAodGhpcy51cmwpIHtcbiAgICAgIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gdGhpcy5zY2VfLnRydXN0QXNSZXNvdXJjZVVybCh0aGlzLnVybCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICovXG4gIGNsZWFyXygpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgIHRoaXMudGl0bGUgPSBudWxsO1xuICAgIHRoaXMudXJsID0gbnVsbDtcbiAgfVxufVxuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckc2NlJywgJyRzY29wZScsICckY29tcGlsZSddO1xuLyoqXG4gKiBUaGUgYG5nZW8tZGlzcGxheXdpbmRvd2AgY29tcG9uZW50IGlzIGFuIGFsdGVybmF0aXZlIHRvIHRoZSBgbmdlby5tZXNzYWdlLlBvcHVwYC5cbiAqIFdoYXQgdGhleSBoYXZlIGluIGNvbW1vbjpcbiAqXG4gKiAtIHN1cHBvcnQgdGl0bGVcbiAqIC0gc3VwcG9ydCB1cmwgdG8gYmUgc2hvd24gaW4gYW4gaWZyYW1lXG4gKiAtIHN1cHBvcnQgcGxhaW4gSFRNTCBjb250ZW50XG4gKiAtIHN1cHBvcnQgc2l6aW5nLCBpLmUuIGhlaWdodCBhbmQgd2lkdGguXG4gKiAtIHN1cHBvcnQgYmVpbmcgb3BlbmVkL2Nsb3NlZFxuICpcbiAqIFRoZSBkaWZmZXJlbmNlcyB3aXRoIHRoZSBgbmdlby5tZXNzYWdlLlBvcHVwYCBhcmU6XG4gKlxuICogLSBpdCBzdXBwb3J0cyBiZWluZyBkcmFnZ2VkXG4gKiAtIGl0IHN1cHBvcnRzIGJlaW5nIHJlc2l6ZWRcbiAqIC0gc3VwcG9ydCBhbmd1bGFyanMgdGVtcGxhdGUgY29udGVudFxuICpcbiAqIEV4YW1wbGU6XG4gKiAgICAgIDxuZ2VvLWRpc3BsYXl3aW5kb3dcbiAqICAgICAgICBjbGFzcz1cIndpbmRvdzFcIlxuICogICAgICAgIHVybD1cIjo6Y3RybC53aW5kb3cxQ29udGVudFwiXG4gKiAgICAgICAgZGVza3RvcD1cIjo6ZmFsc2VcIlxuICogICAgICAgIG9wZW49XCI6OnRydWVcIlxuICogICAgICAgIHRpdGxlPVwiJ1dpbmRvdyAxIC0gVGhlIHNpbXBsZXN0IHdpbmRvdyAoY2xvc2Uga2lsbHMgaXQpJ1wiPlxuICogICAgICA8L25nZW8tZGlzcGxheXdpbmRvdz5cbiAqXG4gKiBAaHRtbEF0dHJpYnV0ZSB7Ym9vbGVhbn0gW25nZW9dLWRpc3BsYXl3aW5kb3ctY2xlYXItb24tY2xvc2UgV2hldGhlciB0byBjbGVhciB0aGUgY29udGVudCBvbiBjbG9zZSBvciBub3QuXG4gKiBAaHRtbEF0dHJpYnV0ZSB7c3RyaW5nfSBbbmdlb10tZGlzcGxheXdpbmRvdy1jb250ZW50IFRoZSBodG1sIGNvbnRlbnQuIElmIG5vdCBwcm92aWRlZCwgeW91IG11c3QgcHJvdmlkZVxuICogICAgIGFuIHVybC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWNvbnRlbnQtdGVtcGxhdGUgQW5ndWxhckpTIHRlbXBsYXRlLiBJdCBnZXRzIGNvbXBpbGVkIGR1cmluZ1xuICogICAgcnVudGltZSB3aXRoIHRoZSBzdXBwbGllZCBzY29wZSAobmdlby1kaXNwbGF5d2luZG93LWNvbnRlbnQtc2NvcGUpLlxuICogQGh0bWxBdHRyaWJ1dGUge2FuZ3VsYXIuSVNjb3BlfSBbbmdlb10tZGlzcGxheXdpbmRvdy1jb250ZW50LXNjb3BlIFNjb3BlIHVzZWQgZm9yXG4gKiAgICBuZ2VvLWRpc3BsYXl3aW5kb3ctY29udGVudC10ZW1wbGF0ZS5cbiAqIEBodG1sQXR0cmlidXRlIHtib29sZWFufSBbbmdlb10tZGlzcGxheXdpbmRvdy1kZXNrdG9wIElmIHRydWUsIHRoZSB3aW5kb3cgaXMgZHJhZ2dhYmxlIGFuZCByZXNpemFibGUuIElmXG4gKiAgICAgbm90IHNldCwgeW91IG11c3Qgc2V0IG1hbnVhbGx5IGJvdGggcGFyYW1ldGVyLlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IFtuZ2VvXS1kaXNwbGF5d2luZG93LWRyYWdnYWJsZSBXaGV0aGVyIHRoZSB3aW5kb3cgaXMgZHJhZ2dhYmxlIG9yIG5vdC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LWRyYWdnYWJsZS1jb250YWlubWVudCBUaGUgem9uZSAoQ1NTIHNlbGVjdG9yKSB3aGVyZSB0aGUgd2luZG93XG4gKiAgICAgaXMgYXV0aG9yaXplZCB0byBiZSBkcmFnZ2VkLlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctaGVpZ2h0IFRoZSBkZWZhdWx0IGhlaWdodCBvZiB0aGUgd2luZG93LlxuICogQGh0bWxBdHRyaWJ1dGUge2Jvb2xlYW59IFtuZ2VvXS1kaXNwbGF5d2luZG93LW9wZW4gV2hldGhlciB0aGUgd2luZG93IGlzIG9wZW4gb3Igbm90LlxuICogQGh0bWxBdHRyaWJ1dGUge3N0cmluZ30gW25nZW9dLWRpc3BsYXl3aW5kb3ctdGl0bGUgVGhlIGh0bWwgdGl0bGUgb2YgdGhlIHdpbmRvdy5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LXVybCBUaGUgVVJMIHRvIG9wZW4gaW4gYW4gaWZyYW1lLCBpbiB0aGUgd2luZG93LiBUaGUgY29udGVudFxuICogICAgIGF0dHJpYnV0ZSBtdXN0IG5vdCBiZSBwcm92aWRlZC5cbiAqIEBodG1sQXR0cmlidXRlIHtzdHJpbmd9IFtuZ2VvXS1kaXNwbGF5d2luZG93LXdpZHRoIFRoZSBkZWZhdWx0IHdpZHRoIG9mIHRoZSB3aW5kb3cuXG4gKiBAbmdkb2MgY29tcG9uZW50XG4gKiBAbmduYW1lIG5nZW9EaXNwbGF5d2luZG93XG4gKi9cbmNvbnN0IG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd0NvbXBvbmVudCA9IHtcbiAgYmluZGluZ3M6IHtcbiAgICAnY2xlYXJPbkNsb3NlJzogJzw/JyxcbiAgICAnY29udGVudCc6ICc9PycsXG4gICAgJ2NvbnRlbnRUZW1wbGF0ZSc6ICc9PycsXG4gICAgJ2NvbnRlbnRTY29wZSc6ICc8PycsXG4gICAgJ2Rlc2t0b3AnOiAnPD8nLFxuICAgICdkcmFnZ2FibGUnOiAnPD8nLFxuICAgICdkcmFnZ2FibGVDb250YWlubWVudCc6ICc8PycsXG4gICAgJ2hlaWdodCc6ICc9PycsXG4gICAgJ29wZW4nOiAnPT8nLFxuICAgICdyZXNpemFibGUnOiAnPD8nLFxuICAgICd0aXRsZSc6ICc9PycsXG4gICAgJ3VybCc6ICc9PycsXG4gICAgJ3dpZHRoJzogJz0/JyxcbiAgfSxcbiAgY29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgdGVtcGxhdGVVcmw6IG5nZW9NZXNzYWdlRGlzcGxheXdpbmRvd1RlbXBsYXRlVXJsLFxufTtcbm15TW9kdWxlLmNvbXBvbmVudCgnbmdlb0Rpc3BsYXl3aW5kb3cnLCBuZ2VvTWVzc2FnZURpc3BsYXl3aW5kb3dDb21wb25lbnQpO1xuZXhwb3J0IGRlZmF1bHQgbXlNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBleGlzdHMgKGRldmVsb3BtZW50IG9ubHkpXG5cdGlmIChfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuLy8gU2luY2UgYWxsIHJlZmVyZW5jZWQgY2h1bmtzIGFyZSBhbHJlYWR5IGluY2x1ZGVkXG4vLyBpbiB0aGlzIGZpbGUsIHRoaXMgZnVuY3Rpb24gaXMgZW1wdHkgaGVyZS5cbl9fd2VicGFja19yZXF1aXJlX18uZSA9ICgpID0+IChQcm9taXNlLnJlc29sdmUoKSk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImRpc3BsYXl3aW5kb3dcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbmdlb1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtuZ2VvXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2NvbW1vbl9kZXBlbmRlbmNpZXMuanNcIikpKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWlubW9kdWxlLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiY29tbW9uc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2V4YW1wbGVzL2Rpc3BsYXl3aW5kb3cuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=