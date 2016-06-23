goog.provide('ngeo.AttributesController');
goog.provide('ngeo.attributesDirective');

goog.require('ngeo');
goog.require('ngeo.EventHelper');


/**
 * Directive used to render the attributes of a feature into a form.
 * Example:
 *
 * Todo...
 *
 * @htmlAttribute {Array.<ngeox.Attribute>} ngeo-attributes-attributes The
 *     list of attributes to use.
 * @htmlAttribute {ol.Feature} ngeo-attributes-feature The feature.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoAttributes
 */
ngeo.attributesDirective = function() {
  return {
    controller: 'ngeoAttributesController',
    scope: true,
    bindToController: {
      'attributes': '=ngeoAttributesAttributes',
      'feature': '=ngeoAttributesFeature'
    },
    controllerAs: 'attrCtrl',
    templateUrl: ngeo.baseTemplateUrl + '/attributes.html'
  };
};

ngeo.module.directive('ngeoAttributes', ngeo.attributesDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {ngeo.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoAttributesController
 */
ngeo.AttributesController = function($scope, ngeoEventHelper) {

  /**
   * The list of attributes to create the form with.
   * @type {Array.<ngeox.Attribute>}
   * @export
   */
  this.attributes;

  /**
   * The feature containing the values.
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * The properties bound to the form, initialized with the inner properties
   * of the feature.
   * @type {Object.<string, *>}
   * @export
   */
  this.properties = this.feature.getProperties();

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  // Listen to the feature inner properties change and apply them to the form
  var uid = goog.getUid(this);
  this.ngeoEventHelper_.addListenerKey(
    uid,
    ol.events.listen(
      this.feature,
      ol.ObjectEventType.PROPERTYCHANGE,
      this.handleFeaturePropertyChange_,
      this
    ),
    true
  );

  /**
   * While changes happen from the form (from the template), they are applied
   * to the feature inner properties. The 'propertychange' event registered
   * above does the opposite, i.e. it listens to the feature inner properties
   * changes and apply them to the form. To prevent circular issues, while
   * applying changes coming from the form, this flag is set. While set, changes
   * from the feature inner properties are ignored.
   * @type {boolean}
   * @private
   */
  this.updating_ = false;

  $scope.$on('$destroy', this.handleDestroy_.bind(this));

};


/**
 * Called when an input node value changes
 * @param {string} name Attribute name
 */
ngeo.AttributesController.prototype.handleInputChange = function(name) {
  this.updating_ = true;
  var value = this.properties[name];
  this.feature.set(name, value);
  this.updating_ = false;
};


/**
 * Cleanup event listeners.
 * @private
 */
ngeo.AttributesController.prototype.handleDestroy_ = function() {
  var uid = goog.getUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
};


/**
 * @param {ol.ObjectEvent} evt Event.
 * @private
 */
ngeo.AttributesController.prototype.handleFeaturePropertyChange_ = function(
  evt
) {
  if (this.updating_) {
    return;
  }
  this.properties[evt.key] = evt.target.get(evt.key);
  this.scope_.$apply();
};


ngeo.module.controller('ngeoAttributesController', ngeo.AttributesController);
