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

/* global Bloodhound */

import angular from 'angular';

import gmfDatasourceExternalDataSourcesManager from 'gmf/datasource/ExternalDataSourcesManager';

import gmfImportWmsCapabilityLayertreeComponent from 'gmf/import/wmsCapabilityLayertreeComponent';

import gmfImportWmtsCapabilityLayertreeComponent from 'gmf/import/wmtsCapabilityLayertreeComponent';

import ngeoQueryQuerent from 'ngeo/query/Querent';
import {guessServiceTypeByUrl, Type} from 'ngeo/datasource/OGC';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfImportdatasource', [
  gmfDatasourceExternalDataSourcesManager.name,
  gmfImportWmsCapabilityLayertreeComponent.name,
  gmfImportWmtsCapabilityLayertreeComponent.name,
  ngeoQueryQuerent.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/import/importdatasourceComponent', require('./importdatasourceComponent.html'));
  }
);

myModule.value(
  'gmfImportdatasourceTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfImportdatasourceTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/import/importdatasourceComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfImportdatasourceTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfImportdatasourceTemplateUrl($attrs, gmfImportdatasourceTemplateUrl) {
  return gmfImportdatasourceTemplateUrl($attrs);
}

/**
 * @enum {string}
 * @hidden
 */
const Mode = {
  LOCAL: 'Local',
  ONLINE: 'Online',
};

/**
 * @hidden
 */
export class Controller {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IFilterService} $filter Angular filter.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager} gmfExternalDataSourcesManager
   *     GMF service responsible of managing external data sources.
   * @param {import('ngeo/query/Querent').Querent} ngeoQuerent Ngeo querent service.
   * @param {import('gmf/options').gmfExternalOGCServers} gmfExternalOGCServers The options.
   * @param {angular.gettext.gettextCatalog} gettextCatalog The gettextCatalog service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfImportdatasourceController
   */
  constructor(
    $element,
    $filter,
    $scope,
    $timeout,
    gmfExternalDataSourcesManager,
    ngeoQuerent,
    gmfExternalOGCServers,
    gettextCatalog
  ) {
    // Binding properties

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    // Injected properties

    /**
     * @type {JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {import('gmf/datasource/ExternalDataSourcesManager').ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;

    /**
     * @type {import('ngeo/query/Querent').Querent}
     * @private
     */
    this.ngeoQuerent_ = ngeoQuerent;

    // Model properties

    /**
     * @type {?File}
     */
    this.file = null;

    /**
     * @type {?string}
     */
    this.searchText = null;

    /**
     * @type {?string}
     */
    this.url = null;

    // Inner properties

    /**
     * @type {JQuery}
     * @private
     */
    this.fileInput_ = $element.find('input[type=file]');

    /**
     * @type {boolean}
     */
    this.hasError = false;

    /**
     * @type {?angular.IPromise<void>}
     * @private
     */
    this.hasErrorPromise_ = null;

    /**
     * @type {string}
     */
    this.mode = Mode.ONLINE;

    /**
     * @type {string[]}
     */
    this.modes = [Mode.LOCAL, Mode.ONLINE];

    gettextCatalog.getString('Local');
    gettextCatalog.getString('Online');

    /**
     * @type {boolean}
     */
    this.pending = false;

    /**
     * @type {import('ngeo/misc/filters').unitPrefix}
     * @private
     */
    this.unitPrefixFormat_ = /** @type {import('ngeo/misc/filters').unitPrefix} */ (
      $filter('ngeoUnitPrefix')
    );

    /**
     * Current WMS Capabilities that were connected.
     * @type {?any}
     */
    this.wmsCapabilities = null;

    /**
     * Current WTMS Capabilities that were connected.
     * @type {?any}
     */
    this.wmtsCapabilities = null;

    /**
     * @type {?Bloodhound<import('gmf/options').ExternalOGCServer>}
     * @private
     */
    this.serversEngine_ = null;

    /**
     * @type {boolean}
     */
    this.isLoading = false;

    /** @type {import('gmf/options').gmfExternalOGCServers} */
    const servers = gmfExternalOGCServers;

    if (servers) {
      this.serversEngine_ = new Bloodhound({
        datumTokenizer: (datum) => {
          return Bloodhound.tokenizers.whitespace('name');
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: servers,
      });
    }

    // Register input[type=file] onchange event, use HTML5 File api
    this.fileInput_.on('change', () => {
      const fileInput = /** @type {HTMLInputElement} */ (this.fileInput_[0]);
      const files = fileInput.files;
      this.file = files && files[0] ? files[0] : null;

      if (this.file) {
        this.hasError = false;
        // update the label
        $(fileInput).next('.custom-file-label').html(this.fileNameAndSize);
      }

      this.scope_.$apply();
    });
  }

  /**
   * Called on initialization of the component.
   */
  $onInit() {
    this.gmfExternalDataSourcesManager_.map = this.map;

    if (this.serversEngine_) {
      /**
       * @param {string} query Query string.
       * @param {function(import('gmf/options').ExternalOGCServer[]):void} sync
       */
      const serversEngineWithDefaults = (query, sync) => {
        if (!this.serversEngine_) {
          throw new Error('Missing serversEngine');
        }
        sync(this.serversEngine_.all());
      };
      // Timeout to let Angular render the placeholder of the input properly,
      // otherwise typeahead would copy the string with {{}} in it...
      this.timeout_(() => {
        const $urlInput = this.element_.find('input[name=url]');
        const $connectBtn = this.element_.find('button.gmf-importdatasource-connect-btn');
        $urlInput
          .typeahead(
            // @ts-ignore: should be string?
            {
              hint: true,
              highlight: true,
              minLength: 0,
            },
            {
              name: 'url',
              source: serversEngineWithDefaults,
              displayKey: 'url',
              templates: {
                suggestion: function (item) {
                  return `<div>${item.name}</div>`;
                },
              },
            }
          )
          .on(
            'typeahead:select',
            /**
             * @param {unknown} ev
             * @param {import('gmf/options').ExternalOGCServer} suggestion
             */
            (ev, suggestion) => {
              this.timeout_(() => {
                this.url = suggestion.url;
                this.scope_.$apply();
                $connectBtn.focus();
              });
            }
          );
      });
    }
  }

  /**
   * Connect to given online resource URL.
   */
  connect() {
    if (!this.url) {
      throw new Error('Missing url');
    }
    const url = this.url;
    const serviceType = guessServiceTypeByUrl(url);

    this.isLoading = true;
    this.startWorking_();
    if (serviceType === Type.WMS) {
      this.ngeoQuerent_.wmsGetCapabilities(url).then(
        (wmsCapabilities) => {
          this.wmsCapabilities = wmsCapabilities;
          this.isLoading = false;
          this.stopWorking_();
          this.search();
        },
        () => {
          this.isLoading = false;
          // Something went wrong...
          this.stopWorking_(true);
        }
      );
    } else if (serviceType === Type.WMTS) {
      this.ngeoQuerent_.wmtsGetCapabilities(url).then(
        (wmtsCapabilities) => {
          this.wmtsCapabilities = wmtsCapabilities;
          this.isLoading = false;
          this.stopWorking_();
          this.search();
        },
        () => {
          this.isLoading = false;
          // Something went wrong...
          this.stopWorking_(true);
        }
      );
    } else {
      // Could not determine the type of url
      this.timeout_(() => {
        this.isLoading = false;
        this.stopWorking_(true);
      });
    }
  }

  /**
   * Create data source from file.
   */
  load() {
    if (!this.file) {
      throw new Error('Missing file');
    }
    const file = this.file;
    this.gmfExternalDataSourcesManager_.createAndAddDataSourceFromFile(file, (success) => {
      if (!success) {
        this.hasError = true;
      }
    });
  }

  /**
   * @return {string} The name of the file and human-readable size.
   */
  get fileNameAndSize() {
    if (!this.file) {
      return '';
    }
    let nameAndSize = '';

    const file = this.file;
    if (file !== undefined) {
      const fileSize = this.unitPrefixFormat_(file.size, 'o');
      nameAndSize = `${file.name}, ${fileSize}`;
    }

    return nameAndSize;
  }

  /**
   * Apply search on current tree.
   */
  search() {
    if (this.wmsCapabilities !== null) {
      this.filterLayer(this.wmsCapabilities.Capability.Layer);
    }
    if (this.wmtsCapabilities !== null) {
      for (const layer of this.wmtsCapabilities.Contents.Layer) {
        this.filterLayer(layer);
      }
    }
  }

  /**
   * Recursively apply filter on layer, setting some custom properties:
   * - _visible: true if searchText is empty or searchText is found in
   * layer.Title or in any of its ancestors or in any of its descendants.
   * - _expanded: true if searchText is found in any of its descendants.
   * - _searchPrefix: substring before searchText in layer.Title.
   * - _searchMatch: substring matching searchText in layer.Title.
   * - _searchSuffix: substring after searchText in layer.Title.
   * @param {any} layer WMS Capability Layer object.
   * @param {boolean} visible Force layer to be visible.
   */
  filterLayer(layer, visible = false) {
    layer._visible = visible;
    layer._searchMatch = null;
    layer._expanded = false;

    if (!this.searchText) {
      layer._visible = true;
    } else {
      // Search for searchText in layer.Title
      /** @type {number} */
      const index = layer.Title.toLowerCase().indexOf(this.searchText.toLowerCase());
      if (index >= 0) {
        layer._searchPrefix = layer.Title.substring(0, index);
        layer._searchMatch = layer.Title.substring(index, index + this.searchText.length);
        layer._searchSuffix = layer.Title.substring(index + this.searchText.length);
        layer._visible = true;
      }
    }

    // Process children
    let childVisible = false;
    if (layer.Layer !== undefined) {
      for (const child of layer.Layer) {
        this.filterLayer(child, layer._visible);
        if (child._visible) {
          childVisible = true;
        }
        if (child._expanded || child._searchMatch) {
          layer._expanded = true;
        }
      }
    }
    if (childVisible) {
      layer._visible = true;
    }
  }

  // === Private methods ===

  /**
   * @private
   */
  startWorking_() {
    this.pending = true;
    this.hasError = false;

    // Clear any previous objects
    this.wmsCapabilities = null;
    this.wmtsCapabilities = null;
  }

  /**
   * @param {boolean} [opt_hasError] Whether we stopped working because of after
   *     an error.
   * @private
   */
  stopWorking_(opt_hasError = false) {
    this.pending = false;
    if (opt_hasError) {
      this.hasError = true;
      if (this.hasErrorPromise_) {
        this.timeout_.cancel(this.hasErrorPromise_);
      }
      this.hasErrorPromise_ = this.timeout_(() => {
        this.hasError = false;
        this.hasErrorPromise_ = null;
      }, 3000);
    }
  }
}

myModule.component('gmfImportdatasource', {
  bindings: {
    'map': '<',
  },
  controller: Controller,
  templateUrl: gmfImportdatasourceTemplateUrl,
});

export default myModule;
