goog.provide('ngeo.editing.attributesComponent');

goog.require('ol');
goog.require('ol.events');
goog.require('ngeo');
goog.require('ngeo.misc.EventHelper');


ngeo.editing.attributesComponent = angular.module('ngeoAttributes', [
  ngeo.misc.EventHelper.module.name,
]);

ngeo.module.requires.push(ngeo.editing.attributesComponent.name);

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
ngeo.editing.attributesComponent.component_ = {
  controller: 'ngeoAttributesController as attrCtrl',
  bindings: {
    'attributes': '=ngeoAttributesAttributes',
    'disabled': '<ngeoAttributesDisabled',
    'feature': '=ngeoAttributesFeature'
  },
  require: {
    'form': '^'
  },
  templateUrl: () => `${ngeo.baseModuleTemplateUrl}/editing/attributescomponent.html`
};

ngeo.editing.attributesComponent.component('ngeoAttributes', ngeo.editing.attributesComponent.component_);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!ngeo.misc.EventHelper} ngeoEventHelper Ngeo event helper service
 * @param {!angularGettext.Catalog} gettextCatalog service.
 * @constructor
 * @private
 * @struct
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoAttributesController
 */
ngeo.editing.attributesComponent.Controller_ = function($scope, ngeoEventHelper, gettextCatalog) {

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
   * The gettext catalog
   * @type {!angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * Datepicker options
   * @type {Object}
   * @export
   */
  this.dateOptions = {
    'changeMonth': true,
    'changeYear': true
  };

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
ngeo.editing.attributesComponent.Controller_.prototype.$onInit = function() {
  this.properties = this.feature.getProperties();

  // Listen to the feature inner properties change and apply them to the form
  const uid = ol.getUid(this);
  this.ngeoEventHelper_.addListenerKey(
    uid,
    ol.events.listen(this.feature, 'propertychange', this.handleFeaturePropertyChange_, this)
  );

  const lang = this.gettextCatalog_.getCurrentLanguage();
  $['datepicker']['setDefaults']($['datepicker']['regional'][lang]);
};


/**
 * Called when an input node value changes
 * @param {string} name Attribute name
 * @export
 */
ngeo.editing.attributesComponent.Controller_.prototype.handleInputChange = function(name) {
  this.updating_ = true;
  const value = this.properties[name];
  this.feature.set(name, value);
  this.updating_ = false;
};


/**
 * Cleanup event listeners.
 */
ngeo.editing.attributesComponent.Controller_.prototype.$onDestroy = function() {
  const uid = ol.getUid(this);
  this.ngeoEventHelper_.clearListenerKey(uid);
};


/**
 * @param {ol.Object.Event} evt Event.
 * @private
 */
ngeo.editing.attributesComponent.Controller_.prototype.handleFeaturePropertyChange_ = function(evt) {
  if (this.updating_) {
    return;
  }
  this.properties[evt.key] = evt.target.get(evt.key);
  this.scope_.$apply();
};


ngeo.editing.attributesComponent.controller('ngeoAttributesController', ngeo.editing.attributesComponent.Controller_);
