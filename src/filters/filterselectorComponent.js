// The MIT License (MIT)
//
// Copyright (c) 2017-2022 Camptocamp SA
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
import {CollectionEvent} from 'ol/Collection';

import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered';

import gmfDatasourceHelper from 'gmf/datasource/gmfHelper';

import GmfDatasourceOGC from 'gmf/datasource/OGC';
import gmfFiltersSavedFilters from 'gmf/filters/SavedFilters';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent';

import ngeoMessageNotification from 'ngeo/message/Notification';
import {MessageType} from 'ngeo/message/Message';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper';

import ngeoFilterComponent from 'ngeo/filter/component';
import {listen, unlistenByKey} from 'ol/events';
import {remove as removeFromArray} from 'ol/array';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr';

import 'bootstrap/js/src/dropdown';

import panels from 'gmfapi/store/panels';
import user from 'gmfapi/store/user';

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfFilterselector', [
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDatasourceHelper.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMessageModalComponent.name,
  ngeoFilterRuleHelper.name,
  ngeoFilterComponent.name,
  gmfFiltersSavedFilters.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/filters/filterselectorcomponent', require('./filterselectorcomponent.html'));
  }
);

myModule.value(
  'gmfFilterselectorTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfFilterselectorTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'gmf/filters/filterselectorcomponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfFilterselectorTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function gmfFilterselectorTemplateUrl($attrs, gmfFilterselectorTemplateUrl) {
  return gmfFilterselectorTemplateUrl($attrs);
}

/**
 * FilterSelector Controller
 *
 * Used metadata:
 *
 *  - `directedFilterAttributes`: List of attribute names which should have rules
 *      already ready when using the filter tools. For WMS layers.
 *
 * Used functionalities:
 *
 *  - `preset_layer_filter`: Name of the layer (data source) that should be toggled in the filter tool upon
 *      loading an application.
 *      Note: although this is a list, only one can be defined.
 *  - `filterable_layers`: A list of layer names that can be filtered, if empty the component will be hidden.
 */
export class FilterSelectorController {
  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/datasource/DataSourceBeingFiltered').DataSourceBeingFiltered} gmfDataSourceBeingFiltered
   *     The Gmf value service that determines the data source currently being filtered.
   * @param {import('gmf/datasource/gmfHelper').DatasourceHelper} gmfDataSourcesHelper Gmf data
   *     sources helper service.
   * @param {import('gmf/filters/SavedFilters').SavedFilter} gmfSavedFilters Gmf saved filters service.
   * @param {import('ngeo/map/FeatureOverlayMgr').FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo
   *    FeatureOverlay manager
   * @param {import('ngeo/filter/RuleHelper').RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor(
    $scope,
    $timeout,
    gettextCatalog,
    gmfDataSourceBeingFiltered,
    gmfDataSourcesHelper,
    gmfSavedFilters,
    ngeoFeatureOverlayMgr,
    ngeoRuleHelper
  ) {
    // Binding properties

    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * @type {?string}
     */
    this.toolGroup = null;

    // Injected properties

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * The data source that can either be selected from the list or have
     * its value set from an external source (for example: the layertree)
     * and that requires to be ready before it can be filtered.
     *
     * @type {import('gmf/datasource/DataSourceBeingFiltered').DataSourceBeingFiltered}
     */
    this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

    $scope.$watch(
      () => this.gmfDataSourceBeingFiltered.dataSource,
      this.handleSelectedDataSourceChange_.bind(this)
    );

    /**
     * @type {import('gmf/datasource/gmfHelper').DatasourceHelper}
     * @private
     */
    this.gmfDataSourcesHelper_ = gmfDataSourcesHelper;

    /**
     * @type {import('gmf/filters/SavedFilters').SavedFilter}
     */
    this.gmfSavedFilters = gmfSavedFilters;

    // Close manage modal if the last item is removed.
    $scope.$watchCollection(
      () => this.gmfSavedFilters.currentDataSourceItems,
      () => {
        if (this.gmfSavedFilters.currentDataSourceItems.length === 0 && this.saveFilterManageModalShown) {
          this.saveFilterManageModalShown = false;
        }
      }
    );

    /**
     * @type {import('ngeo/store/user').User}
     * @private
     */
    this.gmfUser_ = null;

    /**
     * @type {Subscription[]}
     * @private
     */
    this.subscriptions_ = [];

    this.subscriptions_.push(
      user.getProperties().subscribe({
        next: (value) => {
          this.gmfUser_ = value;
          this.handleGmfUserFunctionalitiesChange_();
        },
      })
    );

    /**
     * @type {import('ngeo/map/FeatureOverlay').FeatureOverlay}
     */
    this.featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {import('ngeo/filter/RuleHelper').RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    // Inner properties

    /**
     * @type {boolean}
     */
    this.aRuleIsActive = false;

    /**
     * @type {?import('ngeo/rule/Rule').default[]}
     */
    this.customRules = null;

    /**
     * @type {?import('ngeo/rule/Rule').default[]}
     */
    this.directedRules = null;

    /**
     * @type {import('gmf/datasource/OGC').default[]}
     */
    this.filtrableDataSources = [];

    /**
     * @type {?string[]}
     * @private
     */
    this.filtrableLayerNodeNames_ = null;

    /**
     * @type {import('ol/Collection').default<import('gmf/datasource/OGC').default>}
     * @private
     */
    this.gmfDataSources_ =
      /** @type {import('ol/Collection').default<import('gmf/datasource/OGC').default>} */ (
        gmfDataSourcesHelper.collection
      );

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The data source ready to be filtered, after it has been selected and
     * prepared.
     *
     * @type {?import('gmf/datasource/OGC').default}
     */
    this.readyDataSource = null;

    /**
     * @type {RuleCache}
     * @private
     */
    this.ruleCache_ = {};

    /**
     * @type {boolean}
     */
    this.saveFilterSaveModalShown = false;

    // When the modal closes, reset name
    $scope.$watch(
      () => this.saveFilterSaveModalShown,
      () => {
        this.saveFilterName = '';
      }
    );

    /**
     * @type {string}
     */
    this.saveFilterName = '';

    /**
     * @type {boolean}
     */
    this.saveFilterManageModalShown = false;

    /**
     * @type {boolean}
     */
    this.enableDataSourceRegistration_ = false;

    $scope.$watch(
      () => this.enableDataSourceRegistration_,
      this.handleEnableDataSourceRegistrationChange_.bind(this)
    );

    /**
     * The name of the data source that should be automatically selected
     * by this component.
     *
     * @type {?string}
     * @private
     */
    this.defaultFiltrableDataSourceName_ = null;

    // Initialize the data sources registration
    this.toggleDataSourceRegistration_();
  }

  /**
   * Clear subscriptions.
   */
  $onDestroy() {
    this.subscriptions_.forEach((sub) => sub.unsubscribe());
  }

  /**
   * @private
   * @hidden
   */
  handleGmfUserFunctionalitiesChange_() {
    const usrFunc = this.gmfUser_.functionalities;
    if (usrFunc && usrFunc.filterable_layers) {
      this.filtrableLayerNodeNames_ = usrFunc.filterable_layers;
    } else {
      this.filtrableLayerNodeNames_ = null;
    }
    if (usrFunc && usrFunc.preset_layer_filter && usrFunc.preset_layer_filter[0]) {
      this.defaultFiltrableDataSourceName_ = usrFunc.preset_layer_filter[0];
    } else {
      this.defaultFiltrableDataSourceName_ = null;
    }
    this.toggleDataSourceRegistration_();
  }

  /**
   * @private
   * @hidden
   */
  toggleDataSourceRegistration_() {
    const newDataSourceRegistration = !!this.filtrableLayerNodeNames_;
    if (this.enableDataSourceRegistration_ !== newDataSourceRegistration) {
      this.enableDataSourceRegistration_ = newDataSourceRegistration;
    }
  }

  /**
   * @param {boolean} register Whether register the data sources or not.
   * @private
   * @hidden
   */
  handleEnableDataSourceRegistrationChange_(register) {
    const keys = this.listenerKeys_;

    if (register) {
      // Listen to data sources being added/removed
      keys.push(
        listen(this.gmfDataSources_, 'add', this.handleDataSourcesAdd_, this),
        listen(this.gmfDataSources_, 'remove', this.handleDataSourcesRemove_, this)
      );

      // Manage the data sources that are already in the collection
      this.gmfDataSources_.forEach(this.registerDataSource_.bind(this));
    } else {
      keys.forEach(unlistenByKey);
      keys.length = 0;

      // Remove data sources that are in the collection
      this.filtrableDataSources.length = 0;
    }
  }

  /**
   * Called when a data source is added to the collection of ngeo data sources.
   * If the data source is 'valid', add it to the list of filtrable data
   * sources.
   *
   * @param {Event|import('ol/events/Event').default} evt Collection event.
   * @private
   * @hidden
   */
  handleDataSourcesAdd_(evt) {
    if (evt instanceof CollectionEvent) {
      const dataSource = evt.element;
      if (dataSource instanceof GmfDatasourceOGC) {
        this.registerDataSource_(dataSource);
      }
    }
  }

  /**
   * Called when a data source is removed from the collection of ngeo data
   * sources. If the data source is 'valid', remove it from the list of
   * filtrable data sources.
   *
   * @param {Event|import('ol/events/Event').default} evt Collection event.
   * @private
   * @hidden
   */
  handleDataSourcesRemove_(evt) {
    if (evt instanceof CollectionEvent) {
      const dataSource = evt.element;
      if (dataSource instanceof GmfDatasourceOGC) {
        this.unregisterDataSource_(dataSource);
      }
    }
  }

  /**
   * Register a data source if filtrable.  If it's the first time that the
   * data source is about to be registered, then the `filtrable` property
   * is set. Otherwise, it's used.
   *
   * @param {import('gmf/datasource/OGC').default} dataSource Data source
   * @private
   * @hidden
   */
  registerDataSource_(dataSource) {
    if (dataSource.filtrable === null) {
      dataSource.filtrable = this.isDataSourceFiltrable_(dataSource);
    }

    if (dataSource.filtrable) {
      this.filtrableDataSources.push(dataSource);

      if (
        this.defaultFiltrableDataSourceName_ !== undefined &&
        dataSource.name === this.defaultFiltrableDataSourceName_
      ) {
        this.gmfDataSourceBeingFiltered.dataSource = dataSource;
      }
    }
  }

  /**
   * Unregister a data source if it's filtrable. Also, if it's the one
   * that was currently selected, deselect it.
   *
   * @param {import('gmf/datasource/OGC').default} dataSource Data source
   * @private
   * @hidden
   */
  unregisterDataSource_(dataSource) {
    if (dataSource.filtrable) {
      removeFromArray(this.filtrableDataSources, dataSource);

      if (this.gmfDataSourceBeingFiltered.dataSource === dataSource) {
        this.gmfDataSourceBeingFiltered.dataSource = null;
      }
    }
  }

  /**
   * Determines whether the data source is valid for addition (or removal) to
   * the list of filtrable data sources or not.
   *
   * To be filtrable, the data source must:
   *
   *  1) have its name in the list of filtrable layer node names
   *  2) support WFS
   *  3) have only one wfsLayers defined
   *  4) the ogcLayer must be queryable
   *
   * If 1) is true but not any of the others, then the server has not been
   * configured properly. In this case, a warning notification can be shown.
   *
   * @param {import('gmf/datasource/OGC').default} dataSource GMF data source object
   * @param {boolean} [opt_notify] Whether to show a warning notification or not
   *     in case of a data source that has its name is in the list of
   *     filtrable layer node names but it doesn't match the other requirements.
   *     Defaults to `true.`
   * @returns {boolean} Whether the data source is valid to add to the list or
   *     not.
   * @private
   * @hidden
   */
  isDataSourceFiltrable_(dataSource, opt_notify) {
    if (!this.filtrableLayerNodeNames_) {
      throw new Error('Missing filtrableLayerNodeNames');
    }
    let filtrable = true;
    const gettext = this.gettextCatalog_;
    const notify = opt_notify !== false;
    const names = this.filtrableLayerNodeNames_;
    const msgs = [];

    // (1) The name of the DS must be in list of filtrable layer node names
    if (names.includes(dataSource.name)) {
      // (2) The DS must support WFS
      if (!dataSource.supportsWFS) {
        msgs.push(
          gettext.getString(
            "The data source doesn't support WFS, which is required " +
              'to fetch the attributes to build the filter rules.'
          )
        );
      }

      // (3) The DS must have only one ogcLayer
      if (!dataSource.wfsLayers || !dataSource.wfsLayers.length) {
        msgs.push(gettext.getString('The data source must have only 1 wfsLayer defined.'));
      } else if (!dataSource.wfsLayers[0].queryable) {
        // (4) The ogcLayer must be queryable
        msgs.push(gettext.getString('The wfsLayer within the data source must be queryable.'));
      }

      filtrable = !msgs.length;

      // Notify if the name is in list of filtrable layer node names but
      // there are missing requirements.
      if (notify && !filtrable) {
        const p1 = gettext.getString(
          `The following data source is marked as being filtrable,
          but is missing some requirements: `
        );
        const p2 = `${dataSource.name} (${dataSource.id}).`;
        const p3 = gettext.getString(
          `Please, contact your administrator about this.
          Here are the reasons: `
        );
        msgs.unshift(`${p1} ${p2} ${p3}`);
        console.warn(msgs.join(' '));
        ngeoMessageNotification.notify({
          msg: msgs.join(' '),
          type: MessageType.WARNING,
        });
      }
    } else {
      filtrable = false;
    }

    return filtrable;
  }

  /**
   * @param {?import('gmf/datasource/OGC').default} dataSource Newly selected data source object.
   * @private
   * @hidden
   */
  handleSelectedDataSourceChange_(dataSource) {
    panels.setFilterActive(false);
    this.aRuleIsActive = false;
    this.customRules = null;
    this.directedRules = null;
    this.readyDataSource = null;
    this.gmfSavedFilters.currentDataSourceId = null;

    // No need to do anything if no data source is selected
    if (!dataSource) {
      return;
    }

    // A data source has been selected. Make sure the component is active.
    if (!this.active) {
      this.active = true;
    }

    this.gmfDataSourcesHelper_.prepareFiltrableDataSource(dataSource).then((dataSource) => {
      // Data source is ready. Get any existing rules or create new ones from the attributes
      let item = this.getRuleCacheItem_(dataSource);
      if (!item) {
        item = {
          customRules: [],
          directedRules: [],
        };
        this.setRuleCacheItem_(dataSource, item);
        if (
          dataSource.gmfLayer.metadata &&
          dataSource.gmfLayer.metadata.directedFilterAttributes &&
          dataSource.gmfLayer.metadata.directedFilterAttributes.length
        ) {
          const directedAttributes = dataSource.gmfLayer.metadata.directedFilterAttributes;
          const attributes = dataSource.attributes;
          for (const attribute of attributes) {
            if (directedAttributes.includes(attribute.name)) {
              item.directedRules.push(this.ngeoRuleHelper_.createRuleFromAttribute(attribute));
            }
          }
        }
      }

      this.customRules = item.customRules;
      this.directedRules = item.directedRules;
      this.readyDataSource = dataSource;
      this.gmfSavedFilters.currentDataSourceId = dataSource.id;
    });
  }

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source.
   * @returns {?RuleCacheItem} Rule cache item.
   * @private
   * @hidden
   */
  getRuleCacheItem_(dataSource) {
    return this.ruleCache_[dataSource.id] || null;
  }

  /**
   * @param {import('ngeo/datasource/DataSource').default} dataSource Data source.
   * @param {RuleCacheItem} item Rule cache item.
   * @private
   * @hidden
   */
  setRuleCacheItem_(dataSource, item) {
    this.ruleCache_[dataSource.id] = item;
  }

  /**
   * @hidden
   */
  saveFilterShowModal() {
    this.saveFilterSaveModalShown = true;
  }

  /**
   * @hidden
   */
  saveFilterSave() {
    if (!this.readyDataSource) {
      throw new Error('Missing readyDataSource');
    }

    const name = this.saveFilterName;
    const dataSource = this.readyDataSource;
    const dataSourceId = dataSource.id;
    const alreadyExist = this.gmfSavedFilters.indexOfItem(name, dataSourceId) !== -1;
    const condition = dataSource.filterCondition;

    const msg = this.gettextCatalog_.getString(
      `A filter with the same name already exists.
      Do you want to overwrite it?`
    );
    if (!alreadyExist || confirm(msg)) {
      // (1) Serialize the existing custom and directed rules
      const customRules = this.customRules ? this.ngeoRuleHelper_.serializeRules(this.customRules) : [];
      const directedRules = this.directedRules ? this.ngeoRuleHelper_.serializeRules(this.directedRules) : [];

      // (2) Ask the service to save it
      const item = /** @type {import('gmf/filters/SavedFilters').SavedFilterItem} */ ({
        condition,
        customRules,
        dataSourceId,
        directedRules,
        name,
      });
      this.gmfSavedFilters.save(item);

      // (3) Close popup, which resets the name
      this.saveFilterSaveModalShown = false;
    }
  }

  /**
   * Load a saved filter item, replacing the current rules.
   *
   * @param {import('gmf/filters/SavedFilters').SavedFilterItem} filterItem Filter item.
   * @hidden
   */
  saveFilterLoadItem(filterItem) {
    if (!this.readyDataSource) {
      throw new Error('Missing readyDataSource');
    }
    const dataSource = this.readyDataSource;

    // (1) Reset current rules
    this.customRules = null;
    this.directedRules = null;

    const customRules = this.ngeoRuleHelper_.createRules(filterItem.customRules);
    const directedRules = this.ngeoRuleHelper_.createRules(filterItem.directedRules);

    // Timeout, which ensures the destruction of the previous filter component
    // and the creation of a new one
    this.timeout_(() => {
      // (2) Set rules
      this.customRules = customRules;
      this.directedRules = directedRules;

      // (3) Set condition
      dataSource.filterCondition = filterItem.condition;

      // (4) Update cache item
      const cacheItem = this.getRuleCacheItem_(dataSource);
      if (!cacheItem) {
        throw new Error('Missing cacheItem');
      }
      cacheItem.customRules = customRules;
      cacheItem.directedRules = directedRules;
    });
  }

  /**
   * @hidden
   */
  saveFilterManage() {
    this.saveFilterManageModalShown = true;
  }

  /**
   * Remove a saved filter item.
   *
   * @param {import('gmf/filters/SavedFilters').SavedFilterItem} item Filter item.
   * @hidden
   */
  saveFilterRemoveItem(item) {
    this.gmfSavedFilters.remove(item);
  }
}

/**
 * @typedef {Object<number, RuleCacheItem>} RuleCache
 */

/**
 * @typedef {Object} RuleCacheItem
 * @property {import('ngeo/rule/Rule').default[]} customRules
 * @property {import('ngeo/rule/Rule').default[]} directedRules
 */

myModule.component('gmfFilterselector', {
  bindings: {
    active: '=',
    map: '<',
    toolGroup: '<',
    filterIsApplied: '=',
  },
  controller: FilterSelectorController,
  templateUrl: gmfFilterselectorTemplateUrl,
});

export default myModule;
