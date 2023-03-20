import angular from 'angular';
import {getUid as olUtilGetUid} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper.js';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoAttributes', [
  ngeoMiscDatetimepickerComponent.name,
  ngeoMiscEventHelper.name,
]);

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/editing/attributescomponent', require('./attributescomponent.html'));
  }
);

module.value(
  'ngeoAttributesTemplateUrl',
  /**
   * @param {!angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoAttributesTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/editing/attributescomponent';
  }
);

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!angular.IAttributes): string} ngeoAttributesTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 * @htmlAttribute {Array.<import('ngeo/format/Attribute.js').Attribute>} ngeo-attributes-attributes The
 *     list of attributes to use.
 * @htmlAttribute {boolean} ngeo-attributes-disabled Whether the fieldset should
 *     be disabled or not.
 * @htmlAttribute {import("ol/Feature.js").default} ngeo-attributes-feature The feature.
 *
 * @ngdoc component
 * @ngname ngeoAttributes
 */
const editingAttributeComponent = {
  controller: 'ngeoAttributesController as attrCtrl',
  bindings: {
    'attributes': '=ngeoAttributesAttributes',
    'disabled': '<ngeoAttributesDisabled',
    'feature': '=ngeoAttributesFeature',
  },
  require: {
    'form': '^',
  },
  templateUrl: ngeoAttributesTemplateUrl,
};

module.component('ngeoAttributes', editingAttributeComponent);

/**
 * @param {!angular.IScope} $scope Angular scope.
 * @param {!import("ngeo/misc/EventHelper.js").EventHelper} ngeoEventHelper Ngeo event helper service
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoAttributesController
 */
function Controller($scope, ngeoEventHelper) {
  /**
   * The list of attributes to create the form with.
   * @type {Array.<import('ngeo/format/Attribute.js').Attribute>}
   */
  this.attributes;

  /**
   * Whether the fieldset should be disabled or not.
   * @type {boolean}
   */
  this.disabled = false;

  /**
   * The feature containing the values.
   * @type {import("ol/Feature.js").default}
   */
  this.feature;

  /**
   * The properties bound to the form, initialized with the inner properties
   * of the feature.
   * @type {?Object.<string, *>}
   */
  this.properties;

  /**
   * @type {!angular.IScope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!import("ngeo/misc/EventHelper.js").EventHelper}
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
}

/**
 * Initialise the component.
 */
Controller.prototype.$onInit = function () {
  this.properties = this.feature.getProperties();

  // Listen to the feature inner properties change and apply them to the form
  const uid = olUtilGetUid(this);

  // Set properties before starting to listen to changes to avoid multi AngularJS apply error.
  this.attributes.forEach((attribute) => {
    this.sanitize_(attribute);
  });

  this.ngeoEventHelper_.addListenerKey(
    uid,
    olEvents.listen(this.feature, 'propertychange', this.handleFeaturePropertyChange_, this)
  );
};

/**
 * Called when an input node value changes
 * @param {string} name Attribute name
 */
Controller.prototype.handleInputChange = function (name) {
  this.updating_ = true;
  const attribute = this.attributes.find((attr) => attr.name === name);
  this.sanitize_(attribute);
  this.updating_ = false;
};

/**
 * Never keep a undefined values, use null.
 * On boolean, replace null by false.
 * On date, datetime and time replace empty string by null.
 * @param {import('ngeo/format/Attribute.js').Attribute} attribute
 * @private
 */
Controller.prototype.sanitize_ = function (attribute) {
  let value = this.properties[attribute.name];
  if (value === undefined) {
    value = null;
  }
  if (attribute.type === 'boolean' && value === null) {
    value = false;
  } else if (attribute.format && !value) {
    // Case of date, datetime or time.
    // Shouldn't be set to an empty string
    value = null;
  }
  this.properties[attribute.name] = value;
  this.feature.set(attribute.name, value);
};

/**
 * Cleanup event listeners.
 */
Controller.prototype.$onDestroy = function () {
  const uid = olUtilGetUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
};

/**
 * @param {import("ol/Object.js").ObjectEvent} evt Event.
 * @private
 */
Controller.prototype.handleFeaturePropertyChange_ = function (evt) {
  if (this.updating_) {
    return;
  }
  this.properties[evt.key] = evt.target.get(evt.key);
  this.scope_.$apply();
};

module.controller('ngeoAttributesController', Controller);

export default module;
