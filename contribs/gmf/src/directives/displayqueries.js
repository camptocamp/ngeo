goog.provide('gmf.DisplayqueriesController');
goog.provide('gmf.displayqueriesDirective');

goog.require('gmf');


ngeoModule.value('gmfDisplayqueriesTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDisplayqueriesTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/displayqueries.html';
    });


/**
 * TODO
 *
 * @param {string} gmfDisplayqueriesTemplateUrl URL to popup template.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDisplayqueries
 */
gmf.displayqueriesDirective = function(gmfDisplayqueriesTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfDisplayqueriesController',
    controllerAs: 'ctrl',
    templateUrl: gmfDisplayqueriesTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'getMapFn': '&gmfDisplayqueriesMap'
    }
  };
};


gmfModule.directive('gmfDisplayqueries', gmf.displayqueriesDirective);



/**
 * Desc, to do.
 *
 * @param {Object} ngeoQueryResult ngeo query result.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfDisplayqueriesController
 */
gmf.DisplayqueriesController = function(ngeoQueryResult) {

  /**
   * @type {Object} //FIXME
   * @private
   */
  this.ngeoQueryResult_ = ngeoQueryResult;

  /**
   * @type {ol.Map}
   * @private
   */
  this.map_ = this['getMapFn']();

  /**
   * @type {boolean}
   * @export
   */
  this.open = false;

  /**
   * @type {Object}
   * @export
   */
  this.result = ngeoQueryResult;

  /**
   * @type {Object}
   * @export
   */
  this.source = null;

  /**
   * @type {ol.feature}
   * @export
   */
  this.feature = null;

  /**
   * @type {number}
   * @export
   */
  this.currentResult = 0;

  /**
   * @type {boolean}
   * @export
   */
  this.wasNext = false;
  this.show();
};


/**
 * Todo
 * @param {Object} features todo
 * @export
 */
gmf.DisplayqueriesController.prototype.show = function() {
    this.source = null;
    this.setCurrentResult_(0);
    if (this.source != null) {
      this.open = true;
    }
};


gmf.DisplayqueriesController.prototype.setCurrentResult_ = function(position) {
  var i, source, features;
  var sources = this.ngeoQueryResult_.sources;
  this.currentResult = position;
  for (i = 0; i < sources.length; i++) {
    var source = sources[i];
    var features = source.features;
    if (position >= features.length) {
      position -= features.length;
    } else {
      this.source = source;
      this.feature = source.features[position];
      break;
    }
  }
};


gmf.DisplayqueriesController.prototype.prev = function() {
  this.wasNext = false;
  var position = this.currentResult - 1;
  if (position < 0) {
    position = this.getResultLength() - 1;
  }
  this.setCurrentResult_(position);
}


gmf.DisplayqueriesController.prototype.next = function() {
  this.wasNext = true;
  var position = this.currentResult + 1;
  var positionMax = this.getResultLength() - 1;
  if (position > positionMax) {
    position = 0;
  }
  this.setCurrentResult_(position);
}


gmf.DisplayqueriesController.prototype.getResultLength = function() {
  var sources = this.ngeoQueryResult_.sources;
  var sourcesLength = sources.length;
  return sourcesLength + sources[sourcesLength - 1].features.length;
}


gmfModule.controller('GmfDisplayqueriesController',
    gmf.DisplayqueriesController);
