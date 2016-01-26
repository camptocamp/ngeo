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
   * @type {Object} //FIXME
   * @export
   */
  this.result = null;

  this.scope_['next'] = this.next;

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
 * @param {Object} features todo
 * @export
 */
gmf.Displayqueries.prototype.show = function(result) {
  // features = this.getFeatures_(results.source);
  this.result = result;
  var sources = this.result.sources;
  if (goog.isDef(sources) && sources.length > 0) {
    this.displayFirstQueryResult_();
    var element = /** @type {string} */ (this.element_.html());
    this.setContent(this.$sce_.trustAsHtml(element));
    this.setShow(true);
  }
};


gmf.Displayqueries.prototype.displayFirstQueryResult_ = function() {
  var source = this.result.sources[0];
  this.scope_['currentResult'] = 0;
  this.scope_['source'] = source;
  this.scope_['feature'] = source.features[0];
};


gmf.Displayqueries.prototype.setCurrentResult_ = function(position) {
  var i, source, features;
  var sources = this.result.sources;

  this.scope_['currentResult'] = position;

  for (i = 0; i < sources.length ; i++) {
    var source = sources[i];
    var features = source.features;
    if (position > features.length) {
      position -= features.length;
    } else {
      this.scope_['source'] = source;
      this.scope_['feature'] = source.features[position];
      break;
    }
  }
};


gmf.Displayqueries.prototype.prev = function() {
  var position = this.scope_['currentResult'] - 1;
  if (position < 0) {
    position = this.getResultLength() - 1;
  }
  this.setCurrentResult(position);
}


gmf.Displayqueries.prototype.next = function() {
  var position = this.scope_['currentResult'] + 1;
  var positionMax = this.getResultLength() - 1;
  if (position > positionMax) {
    position = positionMax;
  }
  this.setCurrentResult(position);
}


gmf.Displayqueries.prototype.getResultLength = function() {
  var source = this.results.sources;
  var sourceLength = sources.length;
  return sourceLength + source[sourceLength].features.length
}


/**
 * Todo
 * @param {Array.<ol.Feature>} features todo
 * @export
 */
gmf.Displayqueries.prototype.getFeatures_ = function(results) {
  var i, ii, iii;
  var result;
  var feature, rawFeatures, features = [];
  var prop, sourceProperties;
  var newPropName;

  for (i = 0; i < results.length; i++) {
    result = results[i];
    rawFeatures = result.features;
    sourceProperties = Object.keys(result);
    for (ii = 0; i < rawFeatures.length; i++) {
      feature = rawFeatures[ii];
      for (iii = 0; iii < sourceProperties.length; iii++) {
        prop = sourceProperties[iii];
        if (prop !== 'features') {
          newPropName = 'source_' + prop;
          feature.setProperties({newPropName: result[prop]});
        }
      }
      features.push(feature);
    }
  }
  return features;
};


gmfModule.service('gmfDisplayqueries', gmf.Displayqueries);
