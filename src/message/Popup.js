import angular from 'angular';
import ngeoMessagePopupComponent from 'ngeo/message/popupComponent.js';

/**
 * @typedef {function():!MessagePopup} PopupFactory
 */

/**
 * The options for a popup created by the popup factory.
 *
 * @typedef {Object} PopupOptions
 * @property {boolean} [autoDestroy=false] Whether the popup should be automatically destroyed when hidden
 *    or not.
 * @property {string} [cls] Extra class name to add to the popup.
 * @property {*} [content] The content of the popup. Either the content or URL must be set.
 * @property {string} [height] The height of the popup.
 * @property {string} [title] The title of the popup.
 * @property {string} [url] The URL to use for the iframe to include as content for the popup.
 * @property {string} [width] The width of the popup.
 */

/**
 * Provides a factory to create a popup in the page.
 * The factory returns a ngeo.message.Popup object.
 *
 * Example:
 *
 *     let popup = ngeoCreatePopup();
 *     popup.setTitle("A title");
 *     popup.setContent("Some content");
 *     popup.setOpen(true);
 *
 * @constructor
 * @param {angular.ICompileService} $compile The compile provider.
 * @param {angular.IScope} $rootScope The rootScope provider.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @ngdoc service
 * @ngname ngeoCreatePopup
 * @hidden
 */
export function MessagePopup($compile, $rootScope, $sce, $timeout) {
  /**
   * The scope the compiled element is link to.
   * @type {angular.IScope}
   */
  this.scope = $rootScope.$new(true);

  // manage the auto destruction of the popup
  this.scope.$watch(
    () => this.scope['open'],
    (open) => {
      if (!open && this.autoDestroy_) {
        this.timeout_(() => {
          this.destroy();
        });
      }
    }
  );

  /**
   * @private
   * @type {angular.ISCEService}
   */
  this.sce_ = $sce;

  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * The element.
   * @type {JQuery}
   * @private
   */
  this.element_ = angular.element('<div ngeo-popup></div>');

  /**
   * @type {boolean}
   * @private
   */
  this.autoDestroy_ = false;

  // Compile the element, link it to the scope and add it to the document.
  $compile(this.element_)(this.scope);
  angular.element(document.body).append(this.element_);
}

/**
 * Get the current popup state.
 * @return {boolean} `true` if the popup is currently, otherwise `false`.
 */
MessagePopup.prototype.getOpen = function () {
  return this.scope['open'];
};

/**
 * Show/hide the popup.
 * @param {boolean} open `true` to show the popup, `false` to hide it.
 */
MessagePopup.prototype.setOpen = function (open) {
  this.scope['open'] = open;
};

/**
 * Destroy the popup.
 */
MessagePopup.prototype.destroy = function () {
  this.scope.$destroy();
  this.element_.remove();
};

/**
 * Set the popup's title.
 * @param {string} title The title.
 */
MessagePopup.prototype.setTitle = function (title) {
  const trustedTitle = this.sce_.trustAsHtml(title);
  this.scope['title'] = trustedTitle;
};

/**
 * Set the popup's content.
 * Note: the type of the `content` param is `*` instead of `string`, this
 * is because the content may be trusted using `$sce.trustAsHtml`.
 * @param {*} content The content.
 * @param {boolean=} opt_trusted Whether the content can be trusted.
 *     Default is false.
 */
MessagePopup.prototype.setContent = function (content, opt_trusted) {
  this.scope['content'] = opt_trusted ? this.sce_.trustAsHtml(/** @type {string} */ (content)) : content;
};

/**
 * Set the popup's content with an iframe using the given url.
 * @param {string} url The url of the page.
 */
MessagePopup.prototype.setUrl = function (url) {
  const content = this.sce_.trustAsHtml(`<iframe src="${url}" width="100%" height="100%"></iframe>`);
  this.setContent(content);
};

/**
 * Set the popup's width.
 * @param {string} width Width the popup should have.
 */
MessagePopup.prototype.setWidth = function (width) {
  this.element_.width(width);
};

/**
 * Set the popup's height.
 * @param {string} height Height the popup should have.
 */
MessagePopup.prototype.setHeight = function (height) {
  this.element_.height(height);
};

/**
 * Set the popup's width and height.
 * @param {string} width Width the popup should have.
 * @param {string} height Height the popup should have.
 */
MessagePopup.prototype.setSize = function (width, height) {
  this.setWidth(width);
  this.setHeight(height);
};

/**
 * Set the popup's autoDestroy property.
 * @param {boolean} autoDestroy Whether to automatically destroy the popup when
 *     being closed or not.
 */
MessagePopup.prototype.setAutoDestroy = function (autoDestroy) {
  this.autoDestroy_ = autoDestroy;
};

/**
 * Add an extra CSS class name to the popup.
 * @param {string} cls Class name to add to the popup element.
 */
MessagePopup.prototype.addClass = function (cls) {
  this.element_.addClass(cls);
};

/**
 * Open a popup with the given properties.
 * @param {PopupOptions} options Options.
 */
MessagePopup.prototype.open = function (options) {
  if (options.url) {
    this.setUrl(options.url);
  } else if (options.content) {
    this.setContent(options.content);
  } else {
    console.assert(false, 'ngeo.message.Popup options requirest "url" or "content".');
  }

  if (options.autoDestroy !== undefined) {
    this.setAutoDestroy(options.autoDestroy);
  }

  if (options.cls !== undefined) {
    this.addClass(options.cls);
  }

  if (options.height !== undefined) {
    this.setHeight(options.height);
  }

  if (options.title !== undefined) {
    this.setTitle(options.title);
  }

  if (options.width !== undefined) {
    this.setWidth(options.width);
  }

  this.setOpen(true);
};

/**
 * @param {angular.ICompileService} $compile Angular compile service.
 * @param {angular.IScope} $rootScope Angular rootScope service.
 * @param {angular.ISCEService} $sce Angular sce service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @return {PopupFactory} The function to create a popup.
 * @ngInject
 * @private
 * @hidden
 */
function Factory($compile, $rootScope, $sce, $timeout) {
  return (
    /**
     * @return {!MessagePopup} The popup instance.
     */
    function () {
      return new MessagePopup($compile, $rootScope, $sce, $timeout);
    }
  );
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoCreatePopup', [ngeoMessagePopupComponent.name]);
module.factory('ngeoCreatePopup', Factory);

export default module;
