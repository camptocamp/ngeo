/**
 */
import angular from 'angular';
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute.js';

import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent.js';

import olFeature from 'ol/Feature.js';
import ngeoMapModule from 'ngeo/map/module.js';

/** @type {!angular.IModule} */
const module = angular.module('app', ['gettext', ngeoMapModule.name, ngeoEditingAttributesComponent.name]);

/**
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {!angular.IScope} $scope Scope.
 * @ngInject
 * @constructor
 */
function MainController($http, $timeout, $scope) {
  /**
   * @type {angular.ITimeoutService}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {?Array.<import('ngeo/format/Attribute.js').Attribute>}
   */
  this.attributes = null;

  /**
   * @type {boolean}
   */
  this.disabled = false;

  /**
   * @type {import("ol/Feature.js").default}
   */
  this.feature = new olFeature({
    'name': 'A feature',
    'kind': 'house',
  });

  $http.get('data/xsdattributes.xml').then(this.handleXSDAttributeGet_.bind(this));

  //
  // Visual feedback for changes applied to feature:

  /**
   * @type {string}
   */
  this.log = '';

  $scope.$watch(
    () => this.feature.get('name'),
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.appendLog(`name changed from '${oldValue}' to '${newValue}'`);
      }
    }
  );

  $scope.$watch(
    () => this.feature.get('kind'),
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.appendLog(`kind changed from '${oldValue}' to '${newValue}'`);
      }
    }
  );
}

/**
 * @param {angular.IHttpResponse} resp Ajax response.
 * @return {Array.<import('ngeo/format/Attribute.js').Attribute>} List of attributes.
 * @private
 */
MainController.prototype.handleXSDAttributeGet_ = function (resp) {
  const format = new ngeoFormatXSDAttribute();
  const attributes = format.read(resp.data);
  this.attributes = attributes;
  return attributes;
};

/**
 */
MainController.prototype.updateName = function () {
  this.timeout_(() => {
    this.feature.set('name', 'An alternate name');
  }, 0);
};

/**
 * @param {string} newMessage New message to add to log.
 */
MainController.prototype.appendLog = function (newMessage) {
  this.log = `${newMessage}\n${this.log}`;
};

module.controller('MainController', MainController);

export default module;
