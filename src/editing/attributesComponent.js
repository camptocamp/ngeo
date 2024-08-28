Controller.$inject = ['$scope', 'ngeoEventHelper'];
// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {getUid as olUtilGetUid} from 'ol/util';
import {listen} from 'ol/events';
import ngeoMiscEventHelper from 'ngeo/misc/EventHelper';
import ngeoMiscDatetimepickerComponent from 'ngeo/misc/datetimepickerComponent';
import {ObjectEvent} from 'ol/Object';
import './editing.css';
import htmlTemplate from './attributescomponent.html';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoAttributes', [
  ngeoMiscDatetimepickerComponent.name,
  ngeoMiscEventHelper.name,
]);
myModule.run(
  /**
   * @param {angular.ITemplateCacheService} $templateCache
   */
  [
    '$templateCache',
    ($templateCache) => {
      // @ts-ignore: webpack
      $templateCache.put('ngeo/editing/attributescomponent', htmlTemplate);
    },
  ],
);
myModule.value(
  'ngeoAttributesTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoAttributesTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/editing/attributescomponent';
  },
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoAttributesTemplateUrl Template function.
 * @returns {string} Template URL.
 * @private
 * @hidden
 */
ngeoAttributesTemplateUrl.$inject = ['$attrs', 'ngeoAttributesTemplateUrl'];
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
 * @htmlAttribute {import('ngeo/format/Attribute').Attribute[]} ngeo-attributes-attributes The
 *     list of attributes to use.
 * @htmlAttribute {boolean} ngeo-attributes-disabled Whether the fieldset should
 *     be disabled or not.
 * @htmlAttribute {import('ol/Feature').default<import('ol/geom/Geometry').default>} ngeo-attributes-feature The feature.
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
myModule.component('ngeoAttributes', editingAttributeComponent);

/**
 * @param {angular.IScope} $scope Angular scope.
 * @param {import('ngeo/misc/EventHelper').EventHelper} ngeoEventHelper Ngeo event helper service
 * @class
 * @hidden
 * @ngdoc controller
 * @ngname ngeoAttributesController
 */
export function Controller($scope, ngeoEventHelper) {
  /**
   * The list of attributes to create the form with.
   *
   * @type {import('ngeo/format/Attribute').Attribute[]}
   */
  this.attributes = [];

  /**
   * Whether the fieldset should be disabled or not.
   *
   * @type {boolean}
   */
  this.disabled = false;

  /**
   * The feature containing the values.
   *
   * @type {?import('ol/Feature').default<import('ol/geom/Geometry').default>}
   */
  this.feature = null;

  /**
   * The properties bound to the form, initialized with the inner properties
   * of the feature.
   *
   * @type {Object<string, *>}
   */
  this.properties = {};

  /**
   * @type {angular.IScope}
   */
  this.scope_ = $scope;

  /**
   * @type {import('ngeo/misc/EventHelper').EventHelper}
   */
  this.ngeoEventHelper_ = ngeoEventHelper;

  /**
   * While changes happen from the form (from the template), they are applied
   * to the feature inner properties. The 'propertychange' event registered
   * above does the opposite, i.e. it listens to the feature inner properties
   * changes and apply them to the form. To prevent circular issues, while
   * applying changes coming from the form, this flag is set. While set, changes
   * from the feature inner properties are ignored.
   *
   * @type {boolean}
   */
  this.updating_ = false;
}

/**
 * Initialize the component.
 */
Controller.prototype.$onInit = function () {
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  this.properties = this.feature.getProperties();

  // Listen to the feature inner properties change and apply them to the form
  const uid = olUtilGetUid(this);

  // Set properties before starting to listen to changes to avoid multi AngularJS apply error.
  this.attributes.forEach((attribute) => {
    this.sanitize_(attribute);
  });
  this.ngeoEventHelper_.addListenerKey(
    uid,
    listen(this.feature, 'propertychange', this.handleFeaturePropertyChange_, this),
  );
};

/**
 * Called when an input node value changes
 *
 * @param {string} name Attribute name
 */
Controller.prototype.handleInputChange = function (name) {
  if (!this.properties) {
    throw new Error('Missing properties');
  }
  if (!this.feature) {
    throw new Error('Missing feature');
  }
  this.updating_ = true;
  const attribute = this.attributes.find((attr) => attr.name === name);
  this.sanitize_(attribute);
  this.updating_ = false;
};

/**
 * Never keep a undefined values, use null.
 * On boolean, replace null by false.
 * On date, datetime and time replace empty string by null.
 *
 * @param {import('ngeo/format/Attribute.js').Attribute} attribute
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
 * @param {Event|import('ol/events/Event').default} evt Event.
 */
Controller.prototype.handleFeaturePropertyChange_ = function (evt) {
  if (evt instanceof ObjectEvent) {
    if (this.updating_) {
      return;
    }
    // @ts-ignore
    this.properties[evt.key] = evt.target.get(evt.key);
    this.scope_.$apply();
  }
};
myModule.controller('ngeoAttributesController', Controller);
export default myModule;
