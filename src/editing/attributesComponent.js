/**
 * @module ngeo.editing.attributesComponent
 */
import * as olBase from 'ol/index.js';
import * as olEvents from 'ol/events.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent.js';

const exports = angular.module('ngeoAttributes', [
  ngeoMiscDatetimepickerComponent.name,
  ngeoMiscEventHelper.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/editing/attributescomponent', require('./attributescomponent.html'));
});


exports.value('ngeoAttributesTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoAttributesTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/editing/attributescomponent';
  });

/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoAttributesTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoAttributesTemplateUrl($attrs, ngeoAttributesTemplateUrl) {
  return ngeoAttributesTemplateUrl($attrs);
}


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
exports.component_ = {
  controller: 'ngeoAttributesController as attrCtrl',
  bindings: {
    'attributes': '=ngeoAttributesAttributes',
    'disabled': '<ngeoAttributesDisabled',
    'feature': '=ngeoAttributesFeature'
  },
  require: {
    'form': '^'
  },
  templateUrl: ngeoAttributesTemplateUrl
};

exports.component('ngeoAttributes', exports.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.misc.EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoAttributesController
 */
exports.Controller_ = function($scope, ngeoEventHelper) {

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
   * @type {!ngeo.misc.EventHelper}
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
exports.Controller_.prototype.$onInit = function() {
  this.properties = this.feature.getProperties();

  // Listen to the feature inner properties change and apply them to the form
  const uid = olBase.getUid(this);
  this.ngeoEventHelper_.addListenerKey(
    uid,
    olEvents.listen(this.feature, 'propertychange', this.handleFeaturePropertyChange_, this)
  );
};


/**
 * Called when an input node value changes
 * @param {string} name Attribute name
 * @export
 */
exports.Controller_.prototype.handleInputChange = function(name) {
  this.updating_ = true;
  const value = this.properties[name];
  this.feature.set(name, value);
  this.updating_ = false;
};


/**
 * Cleanup event listeners.
 */
exports.Controller_.prototype.$onDestroy = function() {
  const uid = olBase.getUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
};


/**
 * @param {ol.Object.Event} evt Event.
 * @private
 */
exports.Controller_.prototype.handleFeaturePropertyChange_ = function(evt) {
  if (this.updating_) {
    return;
  }
  this.properties[evt.key] = evt.target.get(evt.key);
  this.scope_.$apply();
};


exports.controller('ngeoAttributesController', exports.Controller_);


export default exports;
