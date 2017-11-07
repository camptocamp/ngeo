goog.provide('ngeo.ruleComponent');

goog.require('ngeo');
/** @suppress {extraRequire} */
goog.require('ngeo.DatePickerDirective');
goog.require('ngeo.DecorateInteraction');
/** @suppress {extraRequire} */
goog.require('ngeo.drawfeatureDirective');
goog.require('ngeo.Menu');
goog.require('ngeo.RuleHelper');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
goog.require('ngeo.interaction.Modify');
goog.require('ngeo.interaction.Rotate');
goog.require('ngeo.interaction.Translate');
goog.require('ngeo.rule.Geometry');
goog.require('ngeo.rule.Select');
goog.require('ol.Collection');


/**
 * @private
 */
ngeo.RuleController = class {

  /**
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
   *     interaction service.
   * @param {!ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
   * @param {!ngeo.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoDecorateInteraction,
    ngeoFeatureHelper, ngeoRuleHelper, ngeoToolActivateMgr
  ) {

    // Binding properties

    /**
     * @type {!ngeo.FeatureOverlay}
     * @export
     */
    this.featureOverlay;

    /**
     * @type {!ol.Map}
     * @export
     */
    this.map;

    /**
     * The original rule.
     * @type {!ngeo.rule.Rule}
     * @export
     */
    this.rule;

    /**
     * @type {string}
     * @export
     */
    this.toolGroup;


    // Injected properties

    /**
     * @type {angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {!angular.Scope}
     * @private
     */
    this.scope_ = $scope;

    /**
     * @type {!angular.$timeout}
     * @private
     */
    this.timeout_ = $timeout;

    /**
     * @type {!ngeo.DecorateInteraction}
     * @private
     */
    this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

    /**
     * @type {!ngeo.FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {!ngeo.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {!ngeo.ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


    // Inner properties

    /**
     * The cloned rule. Changes in the UI are applied to the clone 'on-the-fly'.
     * Changes in the clone are applied back in the original rule when the
     * apply button is clicked.
     * @type {!ngeo.rule.Rule}
     * @export
     */
    this.clone;

    const ot = ngeo.rule.Rule.OperatorType;
    const sot = ngeo.rule.Rule.SpatialOperatorType;
    const tot = ngeo.rule.Rule.TemporalOperatorType;

    /**
     * @type {Object.<string, string>}
     * @export
     */
    this.operators = {
      [ot.EQUAL_TO]: gettextCatalog.getString('Is equal to'),
      [ot.GREATER_THAN]: gettextCatalog.getString('Is greater than'),
      [ot.GREATER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is greater than or equal to'),
      [ot.LESSER_THAN]: gettextCatalog.getString('Is lesser than'),
      [ot.LESSER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is lesser than or equal to'),
      [ot.NOT_EQUAL_TO]: gettextCatalog.getString('Is not equal to'),
      [ot.LIKE]: gettextCatalog.getString('Contains'),
      [sot.CONTAINS]: gettextCatalog.getString('Contains'),
      [sot.INTERSECTS]: gettextCatalog.getString('Intersects'),
      [sot.WITHIN]: gettextCatalog.getString('Is inside of'),
      [tot.BEGINS]: gettextCatalog.getString('Begins at'),
      [tot.DURING]: gettextCatalog.getString('During'),
      [tot.ENDS]: gettextCatalog.getString('Ends at'),
      [tot.EQUALS]: gettextCatalog.getString('Is equal to')
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a range of date.
     * @type {!ngeox.TimeProperty}
     * @export
     */
    this.timeRangeMode = {
      widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
      maxValue: this.createDate_(),
      minValue: this.createWeekAgoDate_(),
      maxDefValue: null,
      minDefValue: null,
      mode: /** @type {ngeox.TimePropertyModeEnum} */ ('range'),
      interval: [0, 1, 0, 0]
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a single date.
     * @type {!ngeox.TimeProperty}
     * @export
     */
    this.timeValueMode = {
      widget: /** @type {ngeox.TimePropertyWidgetEnum} */ ('datepicker'),
      maxValue: this.createDate_(),
      minValue: this.createDate_(),
      maxDefValue: null,
      minDefValue: null,
      mode: /** @type {ngeox.TimePropertyModeEnum} */ ('value'),
      interval: [0, 1, 0, 0]
    };

    /**
     * @type {!ngeo.ToolActivate}
     * @private
     */
    this.toolActivate_;// = new ngeo.ToolActivate(this.rule, 'active');

    /**
     * @type {!Array.<Function>}
     * @private
     */
    this.unlisteners_ = [];


    // Inner properties when dealing with a `ngeo.rule.Geometry`

    /**
     * @type {boolean}
     * @export
     */
    this.drawActive = false;

    /**
     * @type {!ngeo.ToolActivate}
     * @export
     */
    this.drawToolActivate = new ngeo.ToolActivate(this, 'drawActive');

    /**
     * @type {!ol.Collection.<!ol.Feature>}
     * @export
     */
    this.drawnFeatures = new ol.Collection();

    /**
     * @type {?ngeo.Menu}
     * @private
     */
    this.menu_ = null;

    /**
     * @type {!ol.Collection.<!ol.Feature>}
     * @export
     */
    this.selectedFeatures = new ol.Collection();

    /**
     * @type {!ol.Collection.<!ol.interaction.Interaction>}
     * @private
     */
    this.interactions_ = new ol.Collection();

    /**
     * @type {!ngeo.interaction.Modify}
     * @private
     */
    this.modify_ = new ngeo.interaction.Modify({
      features: this.selectedFeatures,
      style: ngeoFeatureHelper.getVertexStyle(false)
    });
    this.interactions_.push(this.modify_);

    /**
     * @type {ngeo.interaction.Rotate}
     * @private
     */
    this.rotate_ = new ngeo.interaction.Rotate({
      features: this.selectedFeatures,
      style: new ol.style.Style({
        text: new ol.style.Text({
          text: '\uf01e',
          font: 'normal 18px FontAwesome',
          fill: new ol.style.Fill({
            color: '#7a7a7a'
          })
        })
      })
    });
    this.interactions_.push(this.rotate_);

    /**
     * @type {ngeo.interaction.Translate}
     * @private
     */
    this.translate_ = new ngeo.interaction.Translate({
      features: this.selectedFeatures,
      style: new ol.style.Style({
        text: new ol.style.Text({
          text: '\uf047',
          font: 'normal 18px FontAwesome',
          fill: new ol.style.Fill({
            color: '#7a7a7a'
          })
        })
      })
    });
    this.interactions_.push(this.translate_);

    /**
     * @type {!Array.<!ol.EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    this.initializeInteractions_();

    /**
     * @type {!ngeo.ToolActivate}
     * @export
     */
    this.modifyToolActivate = new ngeo.ToolActivate(
      this.modify_,
      'active'
    );

    /**
     * @type {ngeo.ToolActivate}
     * @export
     */
    this.rotateToolActivate = new ngeo.ToolActivate(
      this.rotate_,
      'active'
    );

    /**
     * @type {ngeo.ToolActivate}
     * @export
     */
    this.translateToolActivate = new ngeo.ToolActivate(
      this.translate_,
      'active'
    );

    /**
     * The geometry type used by the clone feature.
     * @type {?string}
     * @export
     */
    this.geomType = null;
  }

  /**
   * Called on initialization of the controller.
   *
   * Clone the rule to be able to work with the clone directly.
   */
  $onInit() {
    this.clone = this.ngeoRuleHelper_.cloneRule(this.rule);

    this.toolActivate_ = new ngeo.ToolActivate(this.rule, 'active');

    this.ngeoToolActivateMgr_.registerTool(
      this.toolGroup, this.toolActivate_);

    this.scope_.$watch(
      () => this.rule.active,
      this.handleActiveChange_.bind(this)
    );

    // If the rule is a DATE or DATETIME, then a datepicker directive is used.
    // It is not possible to set the current values to the datepicker, but you
    // can set the initial values. This is why it is created when the rule
    // becomes active (see the partials/rule.html).
    //
    // This chunk of code ensures that the rule properties are synchronized
    // with the TimeProperty objects required to build the datepickers.
    if (this.clone.type === ngeo.AttributeType.DATE ||
        this.clone.type === ngeo.AttributeType.DATETIME
    ) {
      // Watch 'expression'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.getExpression(),
        (newVal) => {
          const value = newVal === null ? this.createDate_() : newVal;
          this.timeValueMode.minValue = value;
        }
      ));
      // Watch 'lowerBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.lowerBoundary,
        (newVal) => {
          const value = newVal === null ? this.createWeekAgoDate_() : newVal;
          this.timeRangeMode.minValue = value;
        }
      ));
      // Watch 'upperBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.upperBoundary,
        (newVal) => {
          const value = newVal === null ? this.createDate_() : newVal;
          this.timeRangeMode.maxValue = value;
        }
      ));
    } else if (this.clone.type === ngeo.AttributeType.GEOMETRY) {

      // Watch 'operator' of clone. Make sure any existing geometry is
      // supported by the newly selected operator. If it doesn't, reset
      // the expression, i.e. geometry.
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.operator,
        (newVal) => {
          if (newVal &&
              newVal === ngeo.rule.Rule.SpatialOperatorType.CONTAINS
          ) {
            const clone = goog.asserts.assertInstanceof(
              this.clone, ngeo.rule.Geometry);
            const geometry = clone.feature.getGeometry();
            if (geometry) {
              const geomType = this.ngeoFeatureHelper_.getType(clone.feature);
              const supportedTypes = [
                ngeo.GeometryType.CIRCLE,
                ngeo.GeometryType.POLYGON,
                ngeo.GeometryType.RECTANGLE
              ];
              if (!ol.array.includes(supportedTypes, geomType)) {
                this.clone.setExpression(null);
              }
            }
          }
        }
      ));

      // Watch 'expression' of clone. Set 'geomType' property accordingly.
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.expression,
        (newVal) => {
          if (newVal) {
            const clone = goog.asserts.assertInstanceof(
              this.clone, ngeo.rule.Geometry);
            this.geomType = this.ngeoFeatureHelper_.getType(clone.feature);
          } else {
            this.geomType = null;
          }
        }
      ));

      // Watch both 'expression', 'active' and the modify control to be all
      // thruthy. When that's the case, the clone feature is added to the
      // selection collection.
      this.unlisteners_.push(this.scope_.$watch(
        () => {
          const hasExpression = this.clone.getExpression() !== null;
          const isActive = this.rule.active === true;
          const editToolIsActive = this.modify_.getActive() ||
                this.rotate_.getActive() ||
                this.translate_.getActive();
          return hasExpression && isActive && editToolIsActive;
        },
        (newVal) => {
          if (newVal) {
            const clone = goog.asserts.assertInstanceof(
              this.clone, ngeo.rule.Geometry);
            this.selectedFeatures.push(clone.feature);
          } else {
            this.selectedFeatures.clear();
          }
        }
      ));
    }
  }

  /**
   * Called on destruction of the controller.
   */
  $onDestroy() {
    if (this.rule.active) {
      this.rule.active = false;
      // in $onDestroy, setting active to false will not call the handler. Call
      // it manually to let it do its magic
      this.handleActiveChange_(false, true);
    }
    this.ngeoToolActivateMgr_.unregisterTool(
      this.toolGroup, this.toolActivate_);
    for (let i = 0, ii = this.unlisteners_.length; i < ii; i++) {
      this.unlisteners_[i]();
    }
    this.unlisteners_.length = 0;
    this.clone.destroy();
  }

  /**
   * @export
   */
  toggle() {
    if (this.rule.active) {
      this.cancel();
    } else {
      this.rule.active = true;
    }
  }

  /**
   * Apply the changes that were made in the original rule.
   * @export
   */
  apply() {
    this.ngeoRuleHelper_.extendRule(this.clone, this.rule);
    this.rule.active = false;
  }

  /**
   * Revert the changes that were made in the clone rule.
   * @export
   */
  cancel() {
    this.ngeoRuleHelper_.extendRule(this.rule, this.clone);
    this.rule.active = false;
  }

  /**
   * Reset both original and clone rules.
   * @export
   */
  reset() {
    this.clone.reset();
    this.rule.reset();
  }

  /**
   * Called when a choice is clicked, when using a `ngeo.rule.Select` rule type.
   * Add/remove the choice to/from the `expression` of the rule.
   * @param {string|number} choice Choice that has been clicked.
   * @export
   */
  toggleChoiceSelection(choice) {
    const rule = goog.asserts.assertInstanceof(this.clone, ngeo.rule.Select);
    const choices = rule.getExpression() ? rule.getExpression().split(',') : [];
    const idx = choices.indexOf(choice);
    if (idx > -1) {
      choices.splice(idx, 1);
    } else {
      choices.push(choice);
    }
    rule.setExpression(choices.length ? choices.join(',') : null);
  }


  /**
   * @param {Object} date Date
   * @export
   */
  onDateSelected(date) {
    this.clone.setExpression(date['start']);
  }

  /**
   * @param {Object} date Date
   * @export
   */
  onDateRangeSelected(date) {
    this.clone.lowerBoundary = date['start'];
    this.clone.upperBoundary = date['end'];
  }

  /**
   * @param {number=} opt_timeDelta Time delta to go back in the past.
   * @return {string} ISO string of the date
   * @private
   */
  createDate_(opt_timeDelta) {

    const date = new Date();

    if (opt_timeDelta !== undefined) {
      const time = date.getTime() - opt_timeDelta;
      date.setTime(time);
    }

    return date.toISOString();
  }

  /**
   * @return {string} ISO string of the date
   * @private
   */
  createWeekAgoDate_() {
    return this.createDate_(1000 * 60 * 60 * 24 * 7); // A week ago date
  }

  /**
   * @param {number} time Time.
   * @return {string} Date
   * @export
   */
  timeToDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString();
  }


  // === Methods used when bound to a `ngeo.rule.Geometry`


  /**
   * Called when the active property of a rule changes. Only used when this
   * component is bound to a geometry rule.
   *
   * Manage the activation/deactivation of the interactions.
   *
   * @param {boolean} active Whether the rule is active or not.
   * @param {boolean} oldActive Whether the rule was active or not.
   * @private
   */
  handleActiveChange_(active, oldActive) {

    if (!(this.rule instanceof ngeo.rule.Geometry) ||
        !(this.clone instanceof ngeo.rule.Geometry) ||
        active === oldActive
    ) {
      return;
    }

    const keys = this.listenerKeys_;
    const uid = ['ngeo-rule-', ol.getUid(this)].join('-');
    const toolMgr = this.ngeoToolActivateMgr_;

    const ruleFeature = this.rule.feature;
    const cloneFeature = this.clone.feature;

    const mapDiv = this.map.getViewport();
    goog.asserts.assertElement(mapDiv);

    if (active) {
      keys.push(
        ol.events.listen(
          this.drawnFeatures,
          ol.CollectionEventType.ADD,
          this.handleFeaturesAdd_,
          this
        )
      );

      keys.push(
        ol.events.listen(
          mapDiv,
          'contextmenu',
          this.handleMapContextMenu_,
          this
        )
      );

      keys.push(
        ol.events.listen(
          this.translate_,
          ol.interaction.TranslateEventType.TRANSLATEEND,
          this.handleTranslateEnd_,
          this
        )
      );

      keys.push(
        ol.events.listen(
          this.rotate_,
          ngeo.RotateEventType.ROTATEEND,
          this.handleRotateEnd_,
          this
        )
      );

      this.featureOverlay.removeFeature(ruleFeature);
      this.featureOverlay.addFeature(cloneFeature);

      this.registerInteractions_();

      toolMgr.registerTool(uid, this.drawToolActivate, false);
      toolMgr.registerTool(uid, this.modifyToolActivate, true);
      toolMgr.registerTool(uid, this.rotateToolActivate, false);
      toolMgr.registerTool(uid, this.translateToolActivate, false);

      this.modify_.setActive(true);

      if (cloneFeature.getGeometry()) {
        this.ngeoFeatureHelper_.setStyle(cloneFeature, true);
      }

    } else {
      cloneFeature.setStyle(null);

      ol.Observable.unByKey(keys);

      this.drawActive = false;

      toolMgr.unregisterTool(uid, this.drawToolActivate);
      toolMgr.unregisterTool(uid, this.modifyToolActivate);
      toolMgr.unregisterTool(uid, this.rotateToolActivate);
      toolMgr.unregisterTool(uid, this.translateToolActivate);

      this.modify_.setActive(false);

      this.unregisterInteractions_();

      if (this.selectedFeatures.getLength()) {
        this.featureOverlay.removeFeature(cloneFeature);
      }
      this.featureOverlay.addFeature(ruleFeature);

      this.selectedFeatures.clear();
    }
  }

  /**
   * Initialize interactions by setting them inactive and decorating them
   * @private
   */
  initializeInteractions_() {
    this.interactions_.forEach((interaction) => {
      interaction.setActive(false);
      this.ngeoDecorateInteraction_(interaction);
    });
  }

  /**
   * Register interactions by adding them to the map
   * @private
   */
  registerInteractions_() {
    this.interactions_.forEach((interaction) => {
      this.map.addInteraction(interaction);
    });
  }

  /**
   * Register interactions by removing them to the map
   * @private
   */
  unregisterInteractions_() {
    this.interactions_.forEach((interaction) => {
      this.map.removeInteraction(interaction);
    });
  }

  /**
   * @param {ol.Collection.Event} evt Event.
   * @private
   */
  handleFeaturesAdd_(evt) {
    // timeout to prevent double-click to zoom the map
    this.timeout_(() => {

      const clone = goog.asserts.assertInstanceof(
        this.clone, ngeo.rule.Geometry);
      const feature = clone.feature;

      // (1) Apply geometry
      const drawnFeature = goog.asserts.assertInstanceof(
        evt.element,
        ol.Feature
      );
      const geometry = goog.asserts.assertInstanceof(
        drawnFeature.getGeometry(),
        ol.geom.Geometry
      );
      clone.geometry = geometry;

      // (2) Deactivate draw tools
      this.drawActive = false;

      // (3) Set properties, then style
      const properties = this.ngeoFeatureHelper_.getNonSpatialProperties(
        drawnFeature);
      this.ngeoFeatureHelper_.clearNonSpatialProperties(feature);
      feature.setProperties(properties);
      this.ngeoFeatureHelper_.setStyle(feature, true);

      this.scope_.$apply();
    });
  }

  /**
   * Return the type of geometry used by the rule feature. Used in the template.
   * @return {string} Geometry type.
   * @export
   */
  getRuleGeometryType() {
    const rule = goog.asserts.assertInstanceof(this.rule, ngeo.rule.Geometry);
    return this.ngeoFeatureHelper_.getType(rule.feature);
  }

  /**
   * @param {Event} evt Event.
   * @private
   */
  handleMapContextMenu_(evt) {

    // (1) Remove previous menu, if any
    this.removeMenu_();

    // (2) Get feature at pixel
    const pixel = this.map.getEventPixel(evt);
    const coordinate = this.map.getCoordinateFromPixel(pixel);

    let feature = this.map.forEachFeatureAtPixel(
      pixel,
      (feature) => {
        let ret = false;
        if (ol.array.includes(this.selectedFeatures.getArray(), feature)) {
          ret = feature;
        }
        return ret;
      }
    );

    feature = feature ? feature : null;

    // (3) If the clicked feature is the selected one, plus if it has a certain
    //     type of geometry, then show the menu
    const actions = [];
    if (feature) {

      const type = this.ngeoFeatureHelper_.getType(feature);

      if (type == ngeo.GeometryType.CIRCLE ||
          type == ngeo.GeometryType.LINE_STRING ||
          type == ngeo.GeometryType.POLYGON ||
          type == ngeo.GeometryType.RECTANGLE) {
        actions.push({
          cls: 'fa fa-arrows',
          label: this.gettextCatalog_.getString('Move'),
          name: ngeo.RuleController.MenuActionType.MOVE
        });
      }
      if (type == ngeo.GeometryType.LINE_STRING ||
          type == ngeo.GeometryType.POLYGON ||
          type == ngeo.GeometryType.RECTANGLE) {
        actions.push({
          cls: 'fa fa-rotate-right',
          label: this.gettextCatalog_.getString('Rotate'),
          name: ngeo.RuleController.MenuActionType.ROTATE
        });
      }
    }

    if (actions.length) {
      // (4) Create and show menu
      this.menu_ = new ngeo.Menu({
        actions
      });

      ol.events.listen(
        this.menu_,
        ngeo.MenuEventType.ACTION_CLICK,
        this.handleMenuActionClick_,
        this
      );
      this.map.addOverlay(this.menu_);

      this.menu_.open(coordinate);

      evt.preventDefault();
      evt.stopPropagation();

      this.scope_.$apply();
    }
  }

  /**
   * Remove contextual menu, if any.
   * @private
   */
  removeMenu_() {
    if (this.menu_) {
      ol.events.unlisten(
        this.menu_,
        ngeo.MenuEventType.ACTION_CLICK,
        this.handleMenuActionClick_,
        this
      );
      this.map.removeOverlay(this.menu_);
      this.menu_ = null;
    }
  }

  /**
   * @param {ngeo.MenuEvent} evt Event.
   * @private
   */
  handleMenuActionClick_(evt) {
    const action = evt.action;

    switch (action) {
      case ngeo.RuleController.MenuActionType.MOVE:
        this.translate_.setActive(true);
        this.scope_.$apply();
        break;
      case ngeo.RuleController.MenuActionType.ROTATE:
        this.rotate_.setActive(true);
        this.scope_.$apply();
        break;
      default:
        console.log(`FIXME - support: ${action}`);
        break;
    }
  }

  /**
   * @param {ngeo.RotateEvent} evt Event.
   * @private
   */
  handleRotateEnd_(evt) {
    this.rotate_.setActive(false);
    this.scope_.$apply();
  }

  /**
   * @param {ol.interaction.Translate.Event} evt Event.
   * @private
   */
  handleTranslateEnd_(evt) {
    this.translate_.setActive(false);
    this.scope_.$apply();
  }

};


/**
 * @enum {string}
 */
ngeo.RuleController.MenuActionType = {
  MOVE: 'move',
  ROTATE: 'rotate'
};


/**
 * The rule component is bound to a `ngeo.rule.Rule` object and shows UI
 * components to be able to edit its properties, such as: operator, expression,
 * etc. The actual properties depend on the type of rule.
 *
 * Also, changes are not made on-the-fly. A button must be clicked for the
 * changes to be applied to the rule.
 */
ngeo.module.component('ngeoRule', {
  bindings: {
    'featureOverlay': '<',
    'map': '<',
    'rule': '<',
    'toolGroup': '<'
  },
  controller: ngeo.RuleController,
  controllerAs: 'ruleCtrl',
  templateUrl: () => `${ngeo.baseTemplateUrl}/rule.html`
});
