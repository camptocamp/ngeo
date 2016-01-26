goog.provide('gmf.Displayqueries');

goog.require('gmf');
/**
 * This goog.require is needed because of 'gmf-displayqueries' used in
 * the template.
 * @suppress {extraRequire}
 */
goog.require('gmf.displayqueriesDirective');


/**
 * Desc, to do.
 *
 * @param {angular.$sce} $sce Angular sce service.
 * @param {angular.$compile} $compile The compile provider.
 * @param {angular.Scope} $rootScope The rootScope provider.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc service
 * @ngname gmfDisplayqueries
 */
gmf.Displayqueries = function($sce, $compile, $rootScope) {

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
   * @type {angular.JQLite}
   * @private
   */
  this.element_ = angular.element('<div gmf-displayqueries></div>');

  /**
   * @type {Array.<Object>}
   * @export
   */
  this.results = [];

  $compile(this.element_)(this.scope_);
  angular.element(document.body).append(this.element_);
};


/**
 * Get the current element state.
 * @return {boolean} `true` if the element is currently visible,
 *     otherwise `false`.
 */
gmf.Displayqueries.prototype.getState = function() {
  return this.scope_['show'];
};


/**
 * Show/hide the element.
 * @param {boolean} show `true` to show the element, `false` to hide it.
 */
gmf.Displayqueries.prototype.setShow = function(show) {
  this.scope_['show'] = show;
};


/**
 * Set the element's content.
 * Note: the type of the `content` param is `*` instead of `string`, this
 * is because the content may be trusted using `$sce.trustAsHtml`.
 * @param {*} content The content.
 */
gmf.Displayqueries.prototype.setContent = function(content) {
  this.scope_['content'] = content;
};


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Displayqueries.prototype.show = function(features) {
  this.filterFeatures_(features);
  if (this.results.length > 0) {
    this.scope_['results'] = this.results;

    var element = /** @type {string} */ (this.element_.html());
    this.setContent(this.$sce_.trustAsHtml(element));
    this.setShow(true);
  }
};


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Displayqueries.prototype.filterFeatures_ = function(features) {
  var i, results = [];
  for (i = 0; i < features.length; i++) {
    var feature = features[i];
    delete feature['values_']['geometry'];
    results.push(feature);
  }
  this.results = results;
};


gmfModule.service('gmfDisplayqueries', gmf.Displayqueries);
