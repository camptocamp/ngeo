goog.provide('ngeo.attributesComponent');

goog.require('ol.ObjectEventType');
goog.require('ngeo');
goog.require('ngeo.EventHelper');
/** @suppress {extraRequire} */
goog.require('ngeo.datetimepickerDirective');


/**
 * Component used to render the attributes of a feature into a form.
 * Example:
 *
 *     <ngeo-attributes
 *       ngeo-attributes-attributes="::ctrl.attributes"
 *       ngeo-attributes-disabled="ctrl.attributesDisabled"
 *       ngeo-attributes-feature="::ctrl.feature">
 *     </ngeo-attributes>
 *
 * @htmlAttribute {Array.<ngeox.Attribute>} ngeo-attributes-attributes The
 *     list of attributes to use.
 * @htmlAttribute {boolean} ngeo-attributes-disabled Whether the fieldset should
 *     be disabled or not.
 * @htmlAttribute {ol.Feature} ngeo-attributes-feature The feature.
 *
 * @ngdoc component
 * @ngname ngeoAttributes
 */
ngeo.attributesComponent = {
  controller: 'ngeoAttributesController as attrCtrl',
  bindings: {
    'attributes': '=ngeoAttributesAttributes',
    'disabled': '<ngeoAttributesDisabled',
    'feature': '=ngeoAttributesFeature'
  },
  require: {
    'form': '^'
  },
  templateUrl: () => `${ngeo.baseTemplateUrl}/attributes.html`
};

ngeo.module.component('ngeoAttributes', ngeo.attributesComponent);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @private
 * @struct
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
   * Whether the fieldset should be disabled or not.
   * @type {boolean}
   * @export
   */
  this.disabled = false;

  /**
   * The feature containing the values.
   * @type {ol.Feature}
   * @export
   */
  this.feature;

  /**
   * The properties bound to the form, initialized with the inner properties
   * of the feature.
   * @type {?Object.<string, *>}
   * @export
   */
  this.properties;

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!ngeo.EventHelper}
   * @private
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

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
};


/**
 * Initialise the component.
 */
ngeo.AttributesController.prototype.$onInit = function() {
  this.properties = this.feature.getProperties();

  // Listen to the feature inner properties change and apply them to the form
  const uid = ol.getUid(this);
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
};


/**
 * Called when an input node value changes
 * @param {string} name Attribute name
 * @export
 */
ngeo.AttributesController.prototype.handleInputChange = function(name) {
  this.updating_ = true;
  const value = this.properties[name];
  this.feature.set(name, value);
  this.updating_ = false;
};


/**
 * Cleanup event listeners.
 */
ngeo.AttributesController.prototype.$onDestroy = function() {
  const uid = ol.getUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
};


/**
 * @param {ol.Object.Event} evt Event.
 * @private
 */
ngeo.AttributesController.prototype.handleFeaturePropertyChange_ = function(evt) {
  if (this.updating_) {
    return;
  }
  this.properties[evt.key] = evt.target.get(evt.key);
  this.scope_.$apply();
};


ngeo.module.controller('ngeoAttributesController', ngeo.AttributesController);
