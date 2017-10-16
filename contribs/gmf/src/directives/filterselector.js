goog.provide('gmf.filterselectorComponent');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.Authentication');
goog.require('gmf.datasource.DataSourceBeingFiltered');
/** @suppress {extraRequire} */
goog.require('gmf.datasource.DataSourcesHelper');
goog.require('gmf.SavedFilters');
/** @suppress {extraRequire} */
goog.require('ngeo.filterComponent');
/** @suppress {extraRequire} */
goog.require('ngeo.modalDirective');
goog.require('ngeo.Notification');
goog.require('ngeo.RuleHelper');
goog.require('ol.CollectionEventType');


/**
 * @private
 */
gmf.FilterselectorController = class {

  /**
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
   * @param {gmf.datasource.DataSourceBeingFiltered} gmfDataSourceBeingFiltered
   *     The Gmf value service that determines the data source currently being
   *     filtered.
   * @param {gmf.datasource.DataSourcesHelper} gmfDataSourcesHelper Gmf data
   *     sources helper service.
   * @param {gmf.SavedFilters} gmfSavedFilters Gmf saved filters service.
   * @param {gmfx.User} gmfUser User.
   * @param {ngeo.Notification} ngeoNotification Ngeo notification service.
   * @param {!ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo FeatureOverlay
   *     manager
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @private
   * @struct
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
     * @export
     */
    this.active;

    $scope.$watch(
      () => this.active,
      this.handleActiveChange_.bind(this)
    );

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * @type {string}
     * @export
     */
    this.toolGroup;


    // Injected properties

    /**
     * @type {!angular.$timeout}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * The data source that can either be selected from the list or have
     * its value set from an external source (for example: the layertree)
     * and that requires to be ready before it can be filtered.
     * @type {gmf.datasource.DataSourceBeingFiltered}
     * @export
     */
    this.gmfDataSourceBeingFiltered = gmfDataSourceBeingFiltered;

    $scope.$watch(
      () => this.gmfDataSourceBeingFiltered.dataSource,
      this.handleSelectedDataSourceChange_.bind(this)
    );

    /**
     * @type {gmf.datasource.DataSourcesHelper}
     * @private
     */
    this.gmfDataSourcesHelper_ = gmfDataSourcesHelper;

    /**
     * @type {gmf.SavedFilters}
     * @export
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
     * @type {gmfx.User}
     * @private
     */
    this.gmfUser_ = gmfUser;

    $scope.$watch(
      () => this.gmfUser_.functionalities,
      this.handleGmfUserFunctionalitiesChange_.bind(this)
    );

    /**
     * @type {ngeo.Notification}
     * @private
     */
    this.ngeoNotification_ = ngeoNotification;

    /**
     * @type {!ngeo.FeatureOverlay}
     * @export
     */
    this.featureOverlay = goog.asserts.assert(
      ngeoFeatureOverlayMgr.getFeatureOverlay()
    );

    /**
     * @type {!ngeo.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;


    // Inner properties

    /**
     * @type {boolean}
     * @export
     */
    this.aRuleIsActive = false;

    /**
     * @type {?Array.<!ngeo.rule.Rule>}
     * @export
     */
    this.customRules = null;

    /**
     * @type {?Array.<!ngeo.rule.Rule>}
     * @export
     */
    this.directedRules = null;

    /**
     * @type {Array.<gmf.datasource.OGC>}
     * @export
     */
    this.filtrableDataSources = [];

    /**
     * @type {Array.<string>}
     * @private
     */
    this.filtrableLayerNodeNames_ = null;

    /**
     * @type {gmf.datasource.DataSources}
     * @private
     */
    this.gmfDataSources_ = gmfDataSourcesHelper.collection;

    /**
     * @type {Array.<ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * The data source ready to be filtered, after it has been selected and
     * prepared.
     * @type {?gmf.datasource.OGC}
     * @export
     */
    this.readyDataSource = null;

    /**
     * @type {!gmf.FilterselectorController.RuleCache}
     * @private
     */
    this.ruleCache_ = {};

    /**
     * @type {boolean}
     * @export
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
     * @export
     */
    this.saveFilterName = '';

    /**
     * @type {boolean}
     * @export
     */
    this.saveFilterManageModalShown = false;

    /**
     * @type {boolean}
     * @export
     */
    this.enableDataSourceRegistration_ = false;

    $scope.$watch(
      () => this.enableDataSourceRegistration_,
      this.handleEnableDataSourceRegistrationChange_.bind(this)
    );

    /**
     * The name of the data source that should be automatically selected
     * by this component.
     * @type {string|undefined}
     * @private
     */
    this.defaultFiltrableDataSourceName_;

    // Initialize the data sources registration
    this.toggleDataSourceRegistration_();
  }


  /**
   * @private
   */
  handleGmfUserFunctionalitiesChange_() {
    const usrFunc = this.gmfUser_.functionalities;
    if (usrFunc && usrFunc['filterable_layers']) {
      this.filtrableLayerNodeNames_ = usrFunc['filterable_layers'];
    } else {
      this.filtrableLayerNodeNames_ = null;
    }
    if (usrFunc &&
        usrFunc['preset_layer_filter'] &&
        usrFunc['preset_layer_filter'][0]
    ) {
      this.defaultFiltrableDataSourceName_ = usrFunc['preset_layer_filter'][0];
    } else {
      this.defaultFiltrableDataSourceName_ = undefined;
    }
    this.toggleDataSourceRegistration_();
  }


  /**
   * @private
   */
  toggleDataSourceRegistration_() {
    const newDataSourceRegistration = !!this.filtrableLayerNodeNames_;
    if (this.enableDataSourceRegistration_ !== newDataSourceRegistration) {
      this.enableDataSourceRegistration_ = newDataSourceRegistration;
    }
  }


  /**
   * Called when the active property changes. Toggle data source registration.
   * Also, when deactivated, unselect data source.
   * @param {boolean} active Active.
   * @private
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
   */
  handleEnableDataSourceRegistrationChange_(register) {
    const keys = this.listenerKeys_;

    if (register) {
      // Listen to data sources being added/removed
      keys.push(
        ol.events.listen(
          this.gmfDataSources_,
          ol.CollectionEventType.ADD,
          this.handleDataSourcesAdd_,
          this
        )
      );
      keys.push(
        ol.events.listen(
          this.gmfDataSources_,
          ol.CollectionEventType.REMOVE,
          this.handleDataSourcesRemove_,
          this
        )
      );

      // Manage the data sources that are already in the collection
      this.gmfDataSources_.forEach(this.registerDataSource_, this);

    } else {
      ol.Observable.unByKey(keys);
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
   * @param {ol.Collection.Event} evt Collection event.
   * @private
   */
  handleDataSourcesAdd_(evt) {
    const dataSource = evt.element;
    if (dataSource instanceof gmf.datasource.OGC) {
      this.registerDataSource_(dataSource);
    }
  }


  /**
   * Called when a data source is added to the collection of ngeo data sources.
   * If the data source is 'valid', add it to the list of filtrable data
   * sources.
   *
   * @param {ol.Collection.Event} evt Collection event.
   * @private
   */
  handleDataSourcesRemove_(evt) {
    const dataSource = evt.element;
    if (dataSource instanceof gmf.datasource.OGC) {
      this.unregisterDataSource_(dataSource);
    }
  }


  /**
   * Register a data source if filtrable.  If it's the first time that the
   * data source is about to be registered, then the `filtrable` property
   * is set. Otherwise, it's used.
   *
   * @param {gmf.datasource.OGC} dataSource Data source
   * @private
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
   * that was currently selected, unselect it.
   * @param {gmf.datasource.OGC} dataSource Data source
   * @private
   */
  unregisterDataSource_(dataSource) {
    if (dataSource.filtrable) {
      ol.array.remove(this.filtrableDataSources, dataSource);

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
   *  3) have only one ogcLayers defined
   *  4) the ogcLayer must be queryable
   *
   * If 1) is true but not any of the others, then the server has not been
   * configured properly. In this case, a warning notification can be shown.
   *
   * @param {gmf.datasource.OGC} dataSource GMF data source object
   * @param {boolean=} opt_notify Whether to show a warning notification or not
   *     in case of a data source that has its name is in the list of
   *     filtrable layer node names but it doesn't match the other requirements.
   *     Defaults to `true.`
   * @return {boolean} Whether the data source is valid to add to the list or
   *     not.
   * @private
   */
  isDataSourceFiltrable_(dataSource, opt_notify) {
    let filtrable = true;
    const gettext = this.gettextCatalog_;
    const notify = opt_notify !== false;
    const names = goog.asserts.assert(this.filtrableLayerNodeNames_);
    const msgs = [];

    // (1) The name of the DS must be in list of filtrable layer node names
    if (ol.array.includes(names, dataSource.name)) {

      // (2) The DS must support WFS
      if (!dataSource.supportsWFS) {
        msgs.push(gettext.getString(
          'The data source doesn\'t support WFS, which is required ' +
          'to fetch the attributes to build the filter rules.'
        ));
      }

      // (3) The DS must have only one ogcLayer
      if (!dataSource.ogcLayers || !dataSource.ogcLayers.length) {
        msgs.push(gettext.getString(
          'The data source must have only 1 ogcLayer defined.'
        ));
      } else if (!dataSource.ogcLayers[0].queryable) {
        // (4) The ogcLayer must be queryable
        msgs.push(gettext.getString(
          'The ogcLayer within the data source must be queryable.'
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
          type: ngeo.MessageType.WARNING
        });
      }
    } else {
      filtrable = false;
    }

    return filtrable;
  }

  /**
   * @param {?gmf.datasource.OGC} dataSource Newly selected data source
   *     object.
   * @private
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

    this.gmfDataSourcesHelper_.prepareFiltrableDataSource(
      dataSource
    ).then((dataSource) => {

      // Data source is ready. Get any existing rules or create new ones from
      // the attributes
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
          const directedAttributes =
              dataSource.gmfLayer.metadata.directedFilterAttributes;
          const attributes = goog.asserts.assert(dataSource.attributes);
          for (const attribute of attributes) {
            if (ol.array.includes(directedAttributes, attribute.name)) {
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
   * @param {ngeo.datasource.DataSource} dataSource Data source.
   * @return {?gmf.FilterselectorController.RuleCacheItem} Rule cache item.
   * @private
   */
  getRuleCacheItem_(dataSource) {
    return this.ruleCache_[dataSource.id] || null;
  }

  /**
   * @param {ngeo.datasource.DataSource} dataSource Data source.
   * @param {gmf.FilterselectorController.RuleCacheItem} item Rule cache item.
   * @private
   */
  setRuleCacheItem_(dataSource, item) {
    this.ruleCache_[dataSource.id] = item;
  }

  /**
   * @export
   */
  saveFilterShowModal() {
    this.saveFilterSaveModalShown = true;
  }

  /**
   * @export
   */
  saveFilterSave() {

    const name = this.saveFilterName;
    const dataSource = goog.asserts.assert(this.readyDataSource);
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
      const item = /** @type {!gmf.SavedFilters.FilterItem} */ ({
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
   * @param {!gmf.SavedFilters.FilterItem} filterItem Filter item.
   * @export
   */
  saveFilterLoadItem(filterItem) {

    const dataSource = goog.asserts.assert(this.readyDataSource);

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
      const cacheItem = goog.asserts.assert(this.getRuleCacheItem_(dataSource));
      cacheItem.customRules = customRules;
      cacheItem.directedRules = directedRules;
    });
  }

  /**
   * @export
   */
  saveFilterManage() {
    this.saveFilterManageModalShown = true;
  }

  /**
   * Remove a saved filter item.
   * @param {!gmf.SavedFilters.FilterItem} item Filter item.
   * @export
   */
  saveFilterRemoveItem(item) {
    this.gmfSavedFilters.remove(item);
  }

};


/**
 * @typedef {Object.<number, !gmf.FilterselectorController.RuleCacheItem>}
 */
gmf.FilterselectorController.RuleCache;


/**
 * @typedef {{
 *     customRules: (Array.<ngeo.rule.Rule>),
 *     directedRules: (Array.<ngeo.rule.Rule>)
 * }}
 */
gmf.FilterselectorController.RuleCacheItem;


gmf.module.component('gmfFilterselector', {
  bindings: {
    active: '=',
    map: '<',
    toolGroup: '<'
  },
  controller: gmf.FilterselectorController,
  controllerAs: 'fsCtrl',
  templateUrl: () => `${gmf.baseTemplateUrl}/filterselector.html`
});
