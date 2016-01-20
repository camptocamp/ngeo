goog.provide('gmf.CreateQuerypopup');
goog.provide('gmf.Querypopup');

goog.require('gmf');
/**
 * This goog.require is needed because of 'gmf-querypopup' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('gmf.querypopupDirective');
goog.require('ngeo.CreatePopup');


/**
 * @typedef {function():!gmf.Querypopup}
 */
gmf.CreateQuerypopup;



/**
 * Desc, to do.
 *
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc service
 * @ngname gmfQuerypopup
 */
gmf.Querypopup = function($sce, $compile, $rootScope, ngeoCreatePopup) {

  /**
   * @type {angular.$sce}
   * @private
   */
  this.$sce_ = $sce;

  /**
   * @type {angular.Scope}
   * @private
   */
  this.scope_ = $rootScope.$new(true);

  /**
   * @type {ngeo.Popup}
   * @private
   */
  this.popup_ = ngeoCreatePopup();

  /**
   * The element.
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = angular.element('<div gmf-querypopup></div>');
  $compile(this.element_)(this.scope_);

};


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Querypopup.prototype.open = function(features) {
  if (features.length > 0) {
    var feature = features[0];
    var currentProperties = feature.getProperties();
    this.scope_['currentFeatureIdx'] = 0;
    delete currentProperties['geometry'];
    this.scope_['current'] = currentProperties;

    var element = /** @type {string} */ (this.element_.html());
    this.popup_.setTitle(currentProperties['layer_name'])
    this.popup_.setContent(this.$sce_.trustAsHtml(element));
    this.popup_.setOpen(true);
  }
};


/**
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @param {ngeo.CreatePopup} ngeoCreatePopup Popup service.
 * @return {gmf.CreateQuerypopup} The function to create a querypopup.
 * @ngInject
 */
gmf.createQuerypopupServiceFactory = function($sce, $compile, $rootScope,
    ngeoCreatePopup) {
  return (
      /**
       * @return {!gmf.Querypopup} The popup instance.
       */
      function() {
        return new gmf.Querypopup($sce, $compile, $rootScope, ngeoCreatePopup);
      });
};
gmfModule.factory('gmfCreateQuerypopup', gmf.createQuerypopupServiceFactory);
