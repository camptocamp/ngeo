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
  this.contentScope_ = $rootScope.$new(true);

  /**
   * @type {ngeo.Popup}
   * @private
   */
  this.popup_ = ngeoCreatePopup();

  /**
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = angular.element('<div gmf-querypopup></div>');
  $compile(this.element_)(this.contentScope_);

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.results = [];
};


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Querypopup.prototype.open = function(features) {
  this.filterFeatures_(features);
  if (this.results.length > 0) {
    this.contentScope_['results'] = this.results;

    var element = /** @type {string} */ (this.element_.html());
    this.popup_.setTitle(this.results[0]['values_']['layer_name']);
    this.popup_.setContent(this.$sce_.trustAsHtml(element));
    this.popup_.setOpen(true);
  }
};


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Querypopup.prototype.filterFeatures_ = function(features) {
  var i, results = [];
  for (i = 0; i < features.length; i++) {
    var feature = features[i];
    delete feature['values_']['geometry'];
    results.push(feature);
  }
  this.results = results;
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
