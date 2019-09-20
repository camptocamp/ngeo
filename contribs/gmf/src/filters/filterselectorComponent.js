import angular from 'angular';
import {CollectionEvent} from 'ol/Collection.js';
import gmfAuthenticationService from 'gmf/authentication/Service.js';

import gmfDatasourceDataSourceBeingFiltered from 'gmf/datasource/DataSourceBeingFiltered.js';

import gmfDatasourceHelper from 'gmf/datasource/Helper.js';

import GmfDatasourceOGC from 'gmf/datasource/OGC.js';
import gmfFiltersSavedFilters from 'gmf/filters/SavedFilters.js';

import ngeoMessageModalComponent from 'ngeo/message/modalComponent.js';

import ngeoMessageNotification from 'ngeo/message/Notification.js';
import {MessageType} from 'ngeo/message/Message.js';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';

import ngeoFilterComponent from 'ngeo/filter/component.js';
import {listen, unlistenByKey} from 'ol/events.js';
import {remove as removeFromArray} from 'ol/array.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfFilterselector', [
  gmfAuthenticationService.name,
  gmfDatasourceDataSourceBeingFiltered.name,
  gmfDatasourceHelper.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMessageNotification.name,
  ngeoMessageModalComponent.name,
  ngeoFilterRuleHelper.name,
  ngeoFilterComponent.name,
  gmfFiltersSavedFilters.name,
]);


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/filters/filterselectorcomponent', require('./filterselectorcomponent.html'));
  });

module.value('gmfFilterselectorTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.gmfFilterselectorTemplateUrl;
    return templateUrl !== undefined ? templateUrl :
      'gmf/filters/filterselectorcomponent';
  });


/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} gmfFilterselectorTemplateUrl Template function.
 * @return {string} Template URL.
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
 *  * `directedFilterAttributes`: List of attribute names which should have rules
 *      already ready when using the filter tools. For WMS layers.
 *
 * Used functionalities:
 *
 *  * `preset_layer_filter`: Name of the layer (data source) that should be toggled in the filter tool upon
 *      loading an application.
 *      Note: although this is a list, only one can be defined.
 *  * `filterable_layers`: A list of layer names that can be filtered, if empty the component will be hidden.
 */
class FilterSelectorController {

  /**
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import('gmf/datasource/DataSourceBeingFiltered.js').DataSourceBeingFiltered} gmfDataSourceBeingFiltered
   *     The Gmf value service that determines the data source currently being filtered.
   * @param {import("gmf/datasource/Helper.js").DatasourceHelper} gmfDataSourcesHelper Gmf data
   *     sources helper service.
   * @param {import("gmf/filters/SavedFilters.js").SavedFilter} gmfSavedFilters Gmf saved filters service.
   * @param {import('gmf/authentication/Service.js').User} gmfUser User.
   * @param {import("ngeo/message/Notification.js").MessageNotification} ngeoNotification Ngeo notification
   *    service.
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo
   *    FeatureOverlay manager
   * @param {import("ngeo/filter/RuleHelper.js").RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfFilterselectorController
   */
  constructor($scope, $timeout, gettextCatalog, gmfDataSourceBeingFiltered,
    gmfDataSourcesHelper, gmfSavedFilters, gmfUser, ngeoNotification,
    ngeoFeatureOverlayMgr, ngeoRuleHelper
  ) {

    // Binding properties

    /**
     * @type {boolean}
     */
    this.active = false;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );

    /**
     * @type {?import("ol/Map.js").default}
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
     * @type {import('gmf/datasource/DataSourceBeingFiltered.js').DataSourceBeingFiltered}
     */
    this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

    $scope.$watch(
      () => this.gmfDataSourceBeingFiltered.dataSource,
      this.handleSelectedDataSourceChange_.bind(this)
    );

    /**
     * @type {import("gmf/datasource/Helper.js").DatasourceHelper}
     * @private
     */
    this.gmfDataSourcesHelper_ = gmfDataSourcesHelper;

    /**
     * @type {import("gmf/filters/SavedFilters.js").SavedFilter}
     */
    this.gmfSavedFilters = gmfSavedFilters;

    // Close manage modal if the last item is removed.
    $scope.$watchCollection(
      () => this.gmfSavedFilters.currentDataSourceItems,
      () => {
        if (this.gmfSavedFilters.currentDataSourceItems.length === 0 &&
            this.saveFilterManageModalShown) {
          this.saveFilterManageModalShown = false;
        }
      }
    );

    /**
     * @type {import('gmf/authentication/Service.js').User}
     * @private
     */
    this.gmfUser_ = gmfUser;

    $scope.$watch(
      () => this.gmfUser_.functionalities,
      this.handleGmfUserFunctionalitiesChange_.bind(this)
    );

    /**
     * @type {import("ngeo/message/Notification.js").MessageNotification}
     * @private
     */
    this.ngeoNotification_ = ngeoNotification;

    /**
     * @type {import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
     */
    this.featureOverlay = ngeoFeatureOverlayMgr.getFeatureOverlay();

    /**
     * @type {import("ngeo/filter/RuleHelper.js").RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;


    // Inner properties

    /**
     * @type {boolean}
     */
    this.aRuleIsActive = false;

    /**
     * @type {?Array<import("ngeo/rule/Rule.js").default>}
     */
    this.customRules = null;

    /**
     * @type {?Array<import("ngeo/rule/Rule.js").default>}
     */
    this.directedRules = null;

    /**
     * @type {Array<import("gmf/datasource/OGC.js").default>}
     */
    this.filtrableDataSources = [];

    /**
     * @type {?string[]}
     * @private
     */
    this.filtrableLayerNodeNames_ = null;

    /**
     * @type {import("ol/Collection.js").default<import("gmf/datasource/OGC.js").default>}
     * @private
     */
    this.gmfDataSources_ =
      /** @type {import("ol/Collection.js").default<import("gmf/datasource/OGC.js").default>} */(
        gmfDataSourcesHelper.collection
      );

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The data source ready to be filtered, after it has been selected and
     * prepared.
     * @type {?import("gmf/datasource/OGC.js").default}
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
     * @type {?string}
     * @private
     */
    this.defaultFiltrableDataSourceName_ = null;

    // Initialize the data sources registration
    this.toggleDataSourceRegistration_();
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
   * Called when the active property changes. Toggle data source registration.
   * Also, when deactivated, deselect data source.
   * @param {boolean} active Active.
   * @private
   * @hidden
   */
  handleActiveChange_(active) {
    if (!active) {
      this.aRuleIsActive = false;
      this.timeout_(() => {
        this.gmfDataSourceBeingFiltered.dataSource = null;
      });
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
   * @param {Event|import('ol/events/Event.js').default} evt Collection event.
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
   * @param {Event|import('ol/events/Event.js').default} evt Collection event.
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
   * @param {import("gmf/datasource/OGC.js").default} dataSource Data source
   * @return {void}
   * @private
   * @hidden
   */
  registerDataSource_(dataSource) {
    if (dataSource.filtrable === null) {
      dataSource.filtrable = this.isDataSourceFiltrable_(dataSource);
    }

    if (dataSource.filtrable) {
      this.filtrableDataSources.push(dataSource);

      if (this.defaultFiltrableDataSourceName_ !== undefined &&
          dataSource.name === this.defaultFiltrableDataSourceName_
      ) {
        this.gmfDataSourceBeingFiltered.dataSource = dataSource;
      }
    }
  }


  /**
   * Unregister a data source if it's filtrable. Also, if it's the one
   * that was currently selected, deselect it.
   * @param {import("gmf/datasource/OGC.js").default} dataSource Data source
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
   * @param {import("gmf/datasource/OGC.js").default} dataSource GMF data source object
   * @param {boolean=} opt_notify Whether to show a warning notification or not
   *     in case of a data source that has its name is in the list of
   *     filtrable layer node names but it doesn't match the other requirements.
   *     Defaults to `true.`
   * @return {boolean} Whether the data source is valid to add to the list or
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
        msgs.push(gettext.getString(
          'The data source doesn\'t support WFS, which is required ' +
          'to fetch the attributes to build the filter rules.'
        ));
      }

      // (3) The DS must have only one ogcLayer
      if (!dataSource.wfsLayers || !dataSource.wfsLayers.length) {
        msgs.push(gettext.getString(
          'The data source must have only 1 wfsLayer defined.'
        ));
      } else if (!dataSource.wfsLayers[0].queryable) {
        // (4) The ogcLayer must be queryable
        msgs.push(gettext.getString(
          'The wfsLayer within the data source must be queryable.'
        ));
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
        this.ngeoNotification_.notify({
          msg: msgs.join(' '),
          type: MessageType.WARNING
        });
      }
    } else {
      filtrable = false;
    }

    return filtrable;
  }

  /**
   * @param {?import("gmf/datasource/OGC.js").default} dataSource Newly selected data source object.
   * @private
   * @hidden
   */
  handleSelectedDataSourceChange_(dataSource) {

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
          directedRules: []
        };
        this.setRuleCacheItem_(dataSource, item);
        if (dataSource.gmfLayer.metadata &&
            dataSource.gmfLayer.metadata.directedFilterAttributes &&
            dataSource.gmfLayer.metadata.directedFilterAttributes.length
        ) {
          const directedAttributes = dataSource.gmfLayer.metadata.directedFilterAttributes;
          const attributes = dataSource.attributes;
          for (const attribute of attributes) {
            if (directedAttributes.includes(attribute.name)) {
              item.directedRules.push(
                this.ngeoRuleHelper_.createRuleFromAttribute(attribute)
              );
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
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source.
   * @return {?RuleCacheItem} Rule cache item.
   * @private
   * @hidden
   */
  getRuleCacheItem_(dataSource) {
    return this.ruleCache_[dataSource.id] || null;
  }

  /**
   * @param {import("ngeo/datasource/DataSource.js").default} dataSource Data source.
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
    const alreadyExist = (this.gmfSavedFilters.indexOfItem(
      name, dataSourceId) !== -1);
    const condition = dataSource.filterCondition;

    const msg = this.gettextCatalog_.getString(
      `A filter with the same name already exists.
      Do you want to overwrite it?`
    );
    if (!alreadyExist || confirm(msg)) {
      // (1) Serialize the existing custom and directed rules
      const customRules = this.customRules ?
        this.ngeoRuleHelper_.serializeRules(this.customRules) : [];
      const directedRules = this.directedRules ?
        this.ngeoRuleHelper_.serializeRules(this.directedRules) : [];

      // (2) Ask the service to save it
      const item = /** @type {import("gmf/filters/SavedFilters.js").SavedFilterItem} */ ({
        condition,
        customRules,
        dataSourceId,
        directedRules,
        name
      });
      this.gmfSavedFilters.save(item);

      // (3) Close popup, which resets the name
      this.saveFilterSaveModalShown = false;
    }
  }

  /**
   * Load a saved filter item, replacing the current rules.
   *
   * @param {import("gmf/filters/SavedFilters.js").SavedFilterItem} filterItem Filter item.
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

    const customRules = this.ngeoRuleHelper_.createRules(
      filterItem.customRules);
    const directedRules = this.ngeoRuleHelper_.createRules(
      filterItem.directedRules);

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
   * @param {import("gmf/filters/SavedFilters.js").SavedFilterItem} item Filter item.
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
 * @property {Array<import('ngeo/rule/Rule.js').default>} customRules
 * @property {Array<import('ngeo/rule/Rule.js').default>} directedRules
 */


module.component('gmfFilterselector', {
  bindings: {
    active: '=',
    map: '<',
    toolGroup: '<'
  },
  controller: FilterSelectorController,
  templateUrl: gmfFilterselectorTemplateUrl
});


export default module;
