goog.provide('ngeo.CreatePopup');
goog.provide('ngeo.Popup');

goog.require('ngeo');
goog.require('goog.asserts');

/**
 * This goog.require is needed because of 'ngeo-popup' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('ngeo.popupDirective');


/**
 * @typedef {function():!ngeo.Popup}
 */
ngeo.CreatePopup;


/**
 * Provides a factory to create a popup in the page.
 * The factory returns a ngeo.Popup object.
 *
 * Example:
 *
 *     var popup = ngeoCreatePopup();
 *     popup.setTitle("A title");
 *     popup.setContent("Some content");
 *     popup.setOpen(true);
 *
 * @constructor
 * @struct
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @ngdoc service
 * @ngname ngeoCreatePopup
 */
ngeo.Popup = function($compile, $rootScope, $sce, $timeout) {

  /**
   * The scope the compiled element is link to.
   * @type {angular.Scope}
   * @export
   */
  this.scope = $rootScope.$new(true);

  // manage the auto destruction of the popup
  this.scope.$watch(
    function() {
      return this.scope['open'];
    }.bind(this),
    function(open) {
      if (!open && this.autoDestroy_) {
        this.timeout_(function() {
          this.destroy();
        }.bind(this));
      }
    }.bind(this)
  );

  /**
   * @private
   * @type {angular.$sce}
   */
  this.sce_ = $sce;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * The element.
   * @type {angular.JQLite}
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
};


/**
 * Get the current popup state.
 * @return {boolean} `true` if the popup is currently, otherwise `false`.
 * @export
 */
ngeo.Popup.prototype.getOpen = function() {
  return this.scope['open'];
};


/**
 * Show/hide the popup.
 * @param {boolean} open `true` to show the popup, `false` to hide it.
 * @export
 */
ngeo.Popup.prototype.setOpen = function(open) {
  this.scope['open'] = open;
};


/**
 * Destroy the popup.
 * @export
 */
ngeo.Popup.prototype.destroy = function() {
  this.scope.$destroy();
  this.element_.remove();
};


/**
 * Set the popup's title.
 * @param {string} title The title.
 * @export
 */
ngeo.Popup.prototype.setTitle = function(title) {
  var trustedTitle = this.sce_.trustAsHtml(title);
  this.scope['title'] = trustedTitle;
};


/**
 * Set the popup's content.
 * Note: the type of the `content` param is `*` instead of `string`, this
 * is because the content may be trusted using `$sce.trustAsHtml`.
 * @param {*} content The content.
 * @param {boolean=} opt_trusted Whether the content can be trusted.
 *     Default is false.
 * @export
 */
ngeo.Popup.prototype.setContent = function(content, opt_trusted) {
  this.scope['content'] = opt_trusted ? this.sce_.trustAsHtml(/** @type {string} */ (content)) : content;
};


/**
 * Set the popup's content with an iframe using the given url.
 * @param {string} url The url of the page.
 * @export
 */
ngeo.Popup.prototype.setUrl = function(url) {
  var content = this.sce_.trustAsHtml(
    '<iframe src="' + url + '" width="100%" height="100%"></iframe>'
  );
  this.setContent(content);
};


/**
 * Set the popup's width. The `max-width` is also set to override the one set
 * by the bootstrap popover class.
 * @param {string} width Width the popup should have.
 * @export
 */
ngeo.Popup.prototype.setWidth = function(width) {
  this.element_.width(width);
  this.element_.css('max-width', width);
};


/**
 * Set the popup's height.
 * @param {string} height Height the popup should have.
 * @export
 */
ngeo.Popup.prototype.setHeight = function(height) {
  this.element_.height(height);
};


/**
 * Set the popup's width and height.
 * @param {string} width Width the popup should have.
 * @param {string} height Height the popup should have.
 * @export
 */
ngeo.Popup.prototype.setSize = function(width, height) {
  this.setWidth(width);
  this.setHeight(height);
};


/**
 * Set the popup's autoDestroy property.
 * @param {boolean} autoDestroy Whether to automatically destroy the popup when
 *     being closed or not.
 * @export
 */
ngeo.Popup.prototype.setAutoDestroy = function(autoDestroy) {
  this.autoDestroy_ = autoDestroy;
};


/**
 * Add an extra CSS class name to the popup.
 * @param {string} cls Class name to add to the popup element.
 * @export
 */
ngeo.Popup.prototype.addClass = function(cls) {
  this.element_.addClass(cls);
};


/**
 * Open a popup with the given properties.
 * @param {ngeox.PopupOptions} options Options.
 * @export
 */
ngeo.Popup.prototype.open = function(options) {

  if (options.url) {
    this.setUrl(options.url);
  } else if (options.content) {
    this.setContent(options.content);
  } else {
    goog.asserts.fail('ngeo.Popup options requirest "url" or "content".');
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
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.Scope} $rootScope Angular rootScope service.
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @return {ngeo.CreatePopup} The function to create a popup.
 * @ngInject
 */
ngeo.createPopupServiceFactory = function($compile, $rootScope, $sce,
    $timeout) {
  return (
      /**
       * @return {!ngeo.Popup} The popup instance.
       */
      function() {
        return new ngeo.Popup($compile, $rootScope, $sce, $timeout);
      });
};
ngeo.module.factory('ngeoCreatePopup', ngeo.createPopupServiceFactory);
