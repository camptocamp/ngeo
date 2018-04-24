goog.provide('ngeo.message.displaywindowComponent');

goog.require('ngeo'); // nowebpack
// webpack: import 'jquery-ui/ui/widgets/resizable.js';
// webpack: import 'angular-sanitize';


/**
 * @type {!angular.Module}
 */
ngeo.message.displaywindowComponent = angular.module('ngeoMessageDisplaywindowComponent', [
  'ngSanitize',
]);


// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('ngeo/message/displaywindowComponent', require('./displaywindowComponent.html'));
// webpack: });


ngeo.message.displaywindowComponent.value('ngeoMessageDisplaywindowTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoMessageDisplaywindowTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/message/displaywindowComponent.html`; // nowebpack
    // webpack: 'ngeo/message/displaywindowComponent';
  });

/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoMessageDisplaywindowTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoMessageDisplaywindowTemplateUrl($attrs, ngeoMessageDisplaywindowTemplateUrl) {
  return ngeoMessageDisplaywindowTemplateUrl($attrs);
}


/**
 * @private
 */
ngeo.message.displaywindowComponent.Controller_ = class {

  /**
   * @param {!jQuery} $element Element.
   * @param {!angular.$sce} $sce Angular sce service.
   * @param {!angular.Scope} $scope Scope.
   * @param {angular.$compile} $compile The compile provider.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoDisplaywindowComponentController
   */
  constructor($element, $sce, $scope, $compile) {

    // === Binding Properties ===

    /**
     * @type {boolean}
     * @export
     */
    this.clearOnClose;

    /**
     * @type {?string}
     * @export
     */
    this.content = null;

    /**
     * @type {?string}
     */
    this.contentTemplate = null;

    /**
     * @type {?angular.Scope}
     */
    this.contentScope = null;

    /**
     * @type {boolean}
     * @export
     */
    this.draggable;

    /**
     * @type {Element|string}
     * @export
     */
    this.draggableContainment;

    /**
     * @type {boolean}
     * @export
     */
    this.desktop;

    /**
     * @type {?string}
     * @export
     */
    this.height = null;

    /**
     * @type {boolean}
     * @export
     */
    this.open;

    /**
     * @type {boolean}
     * @export
     */
    this.resizable;

    /**
     * @type {?string}
     * @export
     */
    this.title = null;

    /**
     * @type {?string}
     * @export
     */
    this.url = null;

    /**
     * @type {?string}
     * @export
     */
    this.width = null;


    // === Injected Properties ===

    /**
     * @type {!jQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {!angular.$sce}
     * @private
     */
    this.sce_ = $sce;

    /**
     * @type {angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.$compile}
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

    this.draggable = this.draggable !== undefined ?
      this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ?
      this.resizable : this.desktop;

    // Draggable
    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').draggable({
        'containment': this.draggableContainment
      });
    }

    // Resizable
    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow .windowcontainer').resizable({
        'minHeight': 240,
        'minWidth': 240
      });
    }

    if (this.contentTemplate) {
      const scope = this.contentScope || this.scope_;
      const compiled = this.compile_(this.contentTemplate)(scope);
      const displayWindow = this.element_.find('.ngeo-displaywindow .windowcontainer .animation-container');
      displayWindow.append(compiled);
    }
  }

  /**
   * @export
   */
  close() {
    this.open = false;
    if (this.clearOnClose) {
      this.clear_();
    }
  }

  /**
   * @return {!Object.<string, string>} CSS style when using width/height
   * @export
   */
  get style() {
    return {
      'height': this.height || '240px',
      'width': this.width || '240px'
    };
  }

  /**
   * @return {string|undefined} Trusted url.
   * @export
   */
  get urlTrusted() {
    if (this.url) {
      return /** @type {string} */ (this.sce_.trustAsResourceUrl(this.url));
    }
  }

  /**
   * @export
   */
  clear_() {
    this.content = null;
    this.height = null;
    this.title = null;
    this.url = null;
    this.width = null;
  }
};


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
 * @htmlAttribute {boolean=} ngeo-displaywindow-clear-on-close Whether to clear the content on close or not.
 * @htmlAttribute {string=} ngeo-displaywindow-content The html content. If not provided, you must provide
 *     an url.
 * @htmlAttribute {string=} ngeo-displaywindow-content-template AngularJS template. It gets compiled during runtime
 * with the supplied scope (ngeo-displaywindow-content-scope).
 * @htmlAttribute {angular.Scope=} ngeo-displaywindow-content-scope Scope used for ngeo-displaywindow-content-template.
 * @htmlAttribute {boolean=} ngeo-displaywindow-desktop If true, the window is draggable and resizable. If
 *     not set, you must set manually both parameter.
 * @htmlAttribute {boolean=} ngeo-displaywindow-draggable Wheter the window is draggable or not.
 * @htmlAttribute {string=} ngeo-displaywindow-draggable-containment The zone (css selector) where the window
 *     is authorized to be dragged.
 * @htmlAttribute {string=} ngeo-displaywindow-height The default height of the window.
 * @htmlAttribute {boolean=} ngeo-displaywindow-open Wheter the window is open or not.
 * @htmlAttribute {string=} ngeo-displaywindow-title The html title of the window.
 * @htmlAttribute {string=} ngeo-displaywindow-url The url to open in an iframe, in the window. The content
 *     attribute must not be provided.
 * @htmlAttribute {string=} ngeo-displaywindow-width The default width of the window.
 * @ngdoc component
 * @ngname ngeoDisplaywindow
 */
ngeo.message.displaywindowComponent.component('ngeoDisplaywindow', {
  bindings: {
    'clearOnClose': '<?',
    'content': '=?',
    'contentTemplate': '<?',
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
  controller: ngeo.message.displaywindowComponent.Controller_,
  templateUrl: ngeoMessageDisplaywindowTemplateUrl
});
