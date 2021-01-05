// The MIT License (MIT)
//
// Copyright (c) 2017-2020 Camptocamp SA
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

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager.js';

import ngeoMessagePopup from 'ngeo/message/Popup.js';

import {getUid as olUtilGetUid} from 'ol/util.js';

import 'bootstrap/js/src/collapse.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfWmscapabilitylayertreenode', [
  gmfDatasourceExternalDataSourcesManager.name,
  ngeoMessagePopup.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      // @ts-ignore: webpack
      'gmf/import/wmsCapabilityLayertreeComponent',
      require('./wmsCapabilityLayertreeComponent.html')
    );
  }
);

module.value(
  'gmfWmscapabilitylayertreenodeTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfWmscapabilitylayertreenodeTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/import/wmsCapabilityLayertreeComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfWmscapabilitylayertreenodeTemplateUrl Template
 *    function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfWmscapabilitylayertreenodeTemplateUrl($attrs, gmfWmscapabilitylayertreenodeTemplateUrl) {
  return gmfWmscapabilitylayertreenodeTemplateUrl($attrs);
}

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
   *     gmfExternalDataSourcesManager GMF service responsible of managing
   *     external data sources.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfWmscapabilitylayertreenodeController
   */
  constructor(gmfExternalDataSourcesManager) {
    // Binding properties

    /**
     * WMS Capabilities definition
     * @type {Object}
     */
    this.capabilities = {};

    /**
     * WMS Capability Layer object.
     * @type {Object}
     */
    this.layer = {};

    /**
     * The original server url that was used to build the WMS GetCapabilities
     * request.
     * @type {?string}
     */
    this.url = null;

    // Injected properties

    /**
     * @type {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;
  }

  /**
   * @param {Object} layer WMS Capability Layer object
   */
  createAndAddDataSource(layer) {
    this.gmfExternalDataSourcesManager_.createAndAddDataSourceFromWMSCapability(
      layer,
      this.capabilities,
      this.url
    );
  }

  /**
   * @param {Object} layer WMS Capability Layer object
   * @return {string} Unique id for the Capability Layer.
   */
  getUid(layer) {
    return olUtilGetUid(layer);
  }
}

module.component('gmfWmscapabilitylayertreenode', {
  bindings: {
    'capabilities': '<',
    'layer': '<',
    'url': '<',
  },
  controller: Controller,
  templateUrl: gmfWmscapabilitylayertreenodeTemplateUrl,
});

export default module;
