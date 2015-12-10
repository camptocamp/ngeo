goog.provide('ngeo.CreatePopup');
goog.provide('ngeo.Popup');

goog.require('ngeo');

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
 *     var popup = ngeoCreatePopup();
 *     popup.setTitle("A title");
 *     popup.setContent("Some content");
 *     popup.setOpen(true);
 *
 * @constructor
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @ngdoc service
 * @ngname ngeoCreatePopup
 */
ngeo.Popup = function($compile, $rootScope) {

  /**
   * The scope the compiled element is link to.
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $rootScope.$new(true);

  /**
   * The element.
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = angular.element('<div ngeo-popup></div>');


  // Compile the element, link it to the scope and add it to the document.
  $compile(this.element_)(this.scope_);
  angular.element(document.body).append(this.element_);
};


/**
 * Get the current popup state.
 * @return {boolean} `true` if the popup is currently, otherwise `false`.
 */
ngeo.Popup.prototype.getOpen = function() {
  return this.scope_['open'];
};


/**
 * Show/hide the popup.
 * @param {boolean} open `true` to show the popup, `false` to hide it.
 */
ngeo.Popup.prototype.setOpen = function(open) {
  this.scope_['open'] = open;
};


/**
 * Destroy the popup.
 */
ngeo.Popup.prototype.destroy = function() {
  this.scope_.$destroy();
  this.element_.remove();
};


/**
 * Set the popup's title.
 * @param {string} title The title.
 */
ngeo.Popup.prototype.setTitle = function(title) {
  this.scope_['title'] = title;
};


/**
 * Set the popup's content.
 * Note: the type of the `content` param is `*` instead of `string`, this
 * is because the content may be trusted using `$sce.trustAsHtml`.
 * @param {*} content The content.
 */
ngeo.Popup.prototype.setContent = function(content) {
  this.scope_['content'] = content;
};


/**
 * @param {angular.$compile} $compile Angular compile service.
 * @param {angular.Scope} $rootScope Angular rootScope service.
 * @return {ngeo.CreatePopup} The function to create a popup.
 * @ngInject
 */
ngeo.createPopupServiceFactory = function($compile, $rootScope) {
  return (
      /**
       * @return {!ngeo.Popup} The popup instance.
       */
      function() {
        return new ngeo.Popup($compile, $rootScope);
      });
};
ngeoModule.factory('ngeoCreatePopup', ngeo.createPopupServiceFactory);
