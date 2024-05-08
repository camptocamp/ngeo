// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager';

import ngeoMessagePopup from 'ngeo/message/Popup';

import {getUid as olUtilGetUid} from 'ol/util';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfWmtscapabilitylayertree', [
  gmfDatasourceExternalDataSourcesManager.name,
  ngeoMessagePopup.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    $templateCache.put(
      'ngeo/import/wmtsCapabilityLayertreeComponent',
      // @ts-ignore: webpack
      require('./wmtsCapabilityLayertreeComponent.html')
    );
  }
);

myModule.value(
  'gmfWmtscapabilitylayertreTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfWmtscapabilitylayertreTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/import/wmtsCapabilityLayertreeComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfWmtscapabilitylayertreTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfWmtscapabilitylayertreTemplateUrl($attrs, gmfWmtscapabilitylayertreTemplateUrl) {
  return gmfWmtscapabilitylayertreTemplateUrl($attrs);
}

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager
   *     GMF service responsible of managing external data sources.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfWmtscapabilitylayertreeController
   */
  constructor(gmfExternalDataSourcesManager) {
    // Binding properties

    /**
     * WMS Capabilities definition
     *
     * @type {Object}
     */
    this.capabilities = {};

    /**
     * List of WMTS Capability Layer objects.
     *
     * @type {Object[]}
     */
    this.layers = [];

    /**
     * The original WMTS GetCapabilities url that was used to fetch the
     * capability layers.
     *
     * @type {?string}
     */
    this.url = null;

    // Injected properties

    /**
     * @type {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;
  }

  /**
   * @param {unknown} layer WMTS Capability Layer object
   */
  createAndAddDataSource(layer) {
    if (!this.url) {
      throw new Error('Missing url');
    }
    const manager = this.gmfExternalDataSourcesManager_;
    manager.createAndAddDataSourceFromWMTSCapability(layer, this.capabilities, this.url);
  }

  /**
   * @param {unknown} layer WMTS Capability Layer object
   * @returns {string} Unique id for the Capability Layer.
   */
  getUid(layer) {
    return olUtilGetUid(layer);
  }
}

myModule.component('gmfWmtscapabilitylayertree', {
  bindings: {
    'capabilities': '<',
    'layers': '<',
    'url': '<',
  },
  controller: Controller,
  templateUrl: gmfWmtscapabilitylayertreTemplateUrl,
});

export default myModule;
