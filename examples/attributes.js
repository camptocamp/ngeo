// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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
import ngeoFormatXSDAttribute from 'ngeo/format/XSDAttribute';

import ngeoEditingAttributesComponent from 'ngeo/editing/attributesComponent';

import olFeature from 'ol/Feature';
import ngeoMapModule from 'ngeo/map/module';

/** @type {angular.IModule} */
const myModule = angular.module('app', ['gettext', ngeoMapModule.name, ngeoEditingAttributesComponent.name]);

/**
 * @param {angular.IHttpService} $http Angular http service.
 * @param {angular.ITimeoutService} $timeout Angular timeout service.
 * @param {angular.IScope} $scope Scope.
 * @ngInject
 * @class
 */
function MainController($http, $timeout, $scope) {
  /**
   * @type {angular.ITimeoutService}
   */
  this.timeout_ = $timeout;

  /**
   * @type {?import('ngeo/format/Attribute').Attribute[]}
   */
  this.attributes = null;

  /**
   * @type {boolean}
   */
  this.disabled = false;

  /**
   * @type {olFeature<import('ol/geom/Geometry').default>}
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
 * @param {angular.IHttpResponse<string|Document|Element>} resp Ajax response.
 * @return {import('ngeo/format/Attribute').Attribute[]} List of attributes.
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

myModule.controller('MainController', MainController);

export default myModule;
