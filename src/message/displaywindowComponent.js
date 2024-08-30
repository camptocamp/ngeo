// The MIT License (MIT)
//
// Copyright (c) 2017-2024 Camptocamp SA
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

import angular from 'angular';
import 'ngeo/sass/font.scss';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/draggable';
import 'ngeo/sass/jquery-ui.scss';
import 'angular-sanitize';
import htmlTemplate from './displaywindowComponent.html';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoMessageDisplaywindowComponent', ['ngSanitize']);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/message/displaywindowComponent', htmlTemplate);
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
export class Controller {
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
export default myModule;
