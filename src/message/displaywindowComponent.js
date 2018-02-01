goog.provide('ngeo.message.displaywindowComponent');

goog.require('ngeo');
// webpack: import 'angular-sanitize';


/**
 * @type {!angular.Module}
 */
ngeo.message.displaywindowComponent = angular.module('ngeoMessageDisplaywindowComponent', [
  'ngSanitize',
]);

/**
 * @private
 */
ngeo.message.displaywindowComponent.Controller_ = class {

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
   *
   * @param {!jQuery} $element Element.
   * @param {!angular.$sce} $sce Angular sce service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname ngeoDisplaywindowComponentController
   */
  constructor($element, $sce) {

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
    this.content;

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
    this.height;

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
    this.title;

    /**
     * @type {?string}
     * @export
     */
    this.url;

    /**
     * @type {?string}
     * @export
     */
    this.width;


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
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {

    // Initialize binding properties
    this.clearOnClose = this.clearOnClose !== false;
    this.content = this.content || null;
    this.desktop = this.desktop !== false;
    this.draggableContainment = this.draggableContainment || 'document';
    this.height = this.height || null;
    this.open = this.open === true;
    this.title = this.title || null;
    this.url = this.url || null;
    this.width = this.width || null;

    this.draggable = this.draggable !== undefined ?
      this.draggable : this.desktop;
    this.resizable = this.resizable !== undefined ?
      this.resizable : this.desktop;

    // Draggable
    if (this.draggable) {
      this.element_.find('.ngeo-displaywindow-container').draggable({
        'containment': this.draggableContainment
      });
    }

    // Resizable
    if (this.resizable) {
      this.element_.find('.ngeo-displaywindow-container').resizable({
        'minHeight': 240,
        'minWidth': 240
      });
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
      'height': this.height || undefined,
      'width': this.height || undefined
    };
  }

  /**
   * @return {string|undefined} Trusted url.
   * @export
   */
  get urlTrusted() {
    if (this.url !== null) {
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


ngeo.message.displaywindowComponent.component('ngeoDisplaywindow', {
  bindings: {
    'clearOnClose': '<',
    'content': '=',
    'desktop': '<',
    'draggable': '<',
    'draggableContainment': '<',
    'height': '=',
    'open': '=',
    'resizable': '<',
    'title': '=',
    'url': '=',
    'width': '='
  },
  controller: ngeo.message.displaywindowComponent.Controller_,
  templateUrl: () => `${ngeo.baseModuleTemplateUrl}/message/displaywindowComponent.html`
});
