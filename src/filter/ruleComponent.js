/**
 * @module ngeo.filter.ruleComponent
 */
import googAsserts from 'goog/asserts.js';
import ngeoMenu from 'ngeo/Menu.js';
import ngeoDrawComponent from 'ngeo/draw/component.js';

/** @suppress {extraRequire} */
import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';

import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionModify from 'ngeo/interaction/Modify.js';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate.js';
import ngeoMapFeatureOverlay from 'ngeo/map/FeatureOverlay.js';

/** @suppress {extraRequire} */
import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import ngeoMiscDecorate from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import ngeoRuleRule from 'ngeo/rule/Rule.js';
import ngeoRuleGeometry from 'ngeo/rule/Geometry.js';
import ngeoRuleSelect from 'ngeo/rule/Select.js';
import * as olBase from 'ol/index.js';
import olFeature from 'ol/Feature.js';
import olCollection from 'ol/Collection.js';
import * as olEvents from 'ol/events.js';
import * as olArray from 'ol/array.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import olStyleFill from 'ol/style/Fill.js';
import olGeomGeometry from 'ol/geom/Geometry.js';

/**
 * @type {angular.Module}
 */
const exports = angular.module('ngeoRule', [
  ngeoDrawComponent.name,
  ngeoFilterRuleHelper.module.name,
  ngeoMapFeatureOverlay.module.name,
  ngeoMiscDatepickerComponent.name,
  ngeoMiscFeatureHelper.module.name,
  ngeoMiscToolActivateMgr.module.name,
]);


exports.run(/* @ngInject */ ($templateCache) => {
  $templateCache.put('ngeo/filter/rulecomponent', require('./rulecomponent.html'));
});


exports.value('ngeoRuleTemplateUrl',
  /**
   * @param {!angular.Attributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRuleTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/filter/rulecomponent';
  });

/**
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.Attributes): string} ngeoRuleTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoRuleTemplateUrl($attrs, ngeoRuleTemplateUrl) {
  return ngeoRuleTemplateUrl($attrs);
}


/**
 * @private
 */
exports.RuleController_ = class {

  /**
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!angular.Scope} $scope Angular scope.
   * @param {!angular.$timeout} $timeout Angular timeout service.
   * @param {!ngeo.misc.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
   * @param {!ngeo.filter.RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {!ngeo.misc.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @private
   * @struct
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoFeatureHelper,
    ngeoRuleHelper, ngeoToolActivateMgr) {

    // Binding properties

    /**
     * @type {!ngeo.map.FeatureOverlay}
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
     * @type {!ngeo.misc.FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {!ngeo.filter.RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {!ngeo.misc.ToolActivateMgr}
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

    const ot = ngeoRuleRule.OperatorType;
    const sot = ngeoRuleRule.SpatialOperatorType;
    const tot = ngeoRuleRule.TemporalOperatorType;

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
     * @type {Object.<string, string>}
     * @export
     */
    this.operatorsShortFormat = {
      [ot.EQUAL_TO]: '=',
      [ot.GREATER_THAN]: '>',
      [ot.GREATER_THAN_OR_EQUAL_TO]: '>=',
      [ot.LESSER_THAN]: '<',
      [ot.LESSER_THAN_OR_EQUAL_TO]: '<=',
      [ot.NOT_EQUAL_TO]: '!=',
      [ot.LIKE]: '~',
      [tot.BEGINS]: '>=',
      [tot.ENDS]: '<=',
      [tot.EQUALS]: '='
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
     * @type {!ngeo.misc.ToolActivate}
     * @private
     */
    this.toolActivate_;// = new ngeo.misc.ToolActivate(this.rule, 'active');

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
     * @type {!ngeo.misc.ToolActivate}
     * @export
     */
    this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

    /**
     * @type {!ol.Collection.<!ol.Feature>}
     * @export
     */
    this.drawnFeatures = new olCollection();

    /**
     * @type {?ngeo.Menu}
     * @private
     */
    this.menu_ = null;

    /**
     * @type {!ol.Collection.<!ol.Feature>}
     * @export
     */
    this.selectedFeatures = new olCollection();

    /**
     * @type {!ol.Collection.<!ol.interaction.Interaction>}
     * @private
     */
    this.interactions_ = new olCollection();

    /**
     * @type {!ngeo.interaction.Modify}
     * @private
     */
    this.modify_ = new ngeoInteractionModify({
      features: this.selectedFeatures,
      style: ngeoFeatureHelper.getVertexStyle(false)
    });
    this.interactions_.push(this.modify_);

    /**
     * @type {ngeo.interaction.Rotate}
     * @private
     */
    this.rotate_ = new ngeoInteractionRotate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf01e',
          font: 'normal 18px FontAwesome',
          fill: new olStyleFill({
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
    this.translate_ = new ngeoInteractionTranslate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf047',
          font: 'normal 18px FontAwesome',
          fill: new olStyleFill({
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
     * @type {!ngeo.misc.ToolActivate}
     * @export
     */
    this.modifyToolActivate = new ngeoMiscToolActivate(
      this.modify_,
      'active'
    );

    /**
     * @type {ngeo.misc.ToolActivate}
     * @export
     */
    this.rotateToolActivate = new ngeoMiscToolActivate(
      this.rotate_,
      'active'
    );

    /**
     * @type {ngeo.misc.ToolActivate}
     * @export
     */
    this.translateToolActivate = new ngeoMiscToolActivate(
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

    this.toolActivate_ = new ngeoMiscToolActivate(this.rule, 'active');

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
    if (this.clone.type === ngeoFormatAttributeType.DATE ||
        this.clone.type === ngeoFormatAttributeType.DATETIME
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
    } else if (this.clone.type === ngeoFormatAttributeType.GEOMETRY) {

      // Watch 'operator' of clone. Make sure any existing geometry is
      // supported by the newly selected operator. If it doesn't, reset
      // the expression, i.e. geometry.
      this.unlisteners_.push(this.scope_.$watch(
        () => this.clone.operator,
        (newVal) => {
          if (newVal &&
              newVal === ngeoRuleRule.SpatialOperatorType.CONTAINS
          ) {
            const clone = googAsserts.assertInstanceof(
              this.clone, ngeoRuleGeometry);
            const geometry = clone.feature.getGeometry();
            if (geometry) {
              const geomType = this.ngeoFeatureHelper_.getType(clone.feature);
              const supportedTypes = [
                ngeoGeometryType.CIRCLE,
                ngeoGeometryType.POLYGON,
                ngeoGeometryType.RECTANGLE
              ];
              if (!olArray.includes(supportedTypes, geomType)) {
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
            const clone = googAsserts.assertInstanceof(
              this.clone, ngeoRuleGeometry);
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
            const clone = googAsserts.assertInstanceof(
              this.clone, ngeoRuleGeometry);
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
    const rule = googAsserts.assertInstanceof(this.clone, ngeoRuleSelect);
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

    if (!(this.rule instanceof ngeoRuleGeometry) ||
        !(this.clone instanceof ngeoRuleGeometry) ||
        active === oldActive
    ) {
      return;
    }

    const keys = this.listenerKeys_;
    const uid = ['ngeo-rule-', olBase.getUid(this)].join('-');
    const toolMgr = this.ngeoToolActivateMgr_;

    const ruleFeature = this.rule.feature;
    const cloneFeature = this.clone.feature;

    const mapDiv = this.map.getViewport();
    googAsserts.assertElement(mapDiv);

    if (active) {
      keys.push(
        olEvents.listen(
          this.drawnFeatures,
          'add',
          this.handleFeaturesAdd_,
          this
        )
      );

      keys.push(
        olEvents.listen(
          mapDiv,
          'contextmenu',
          this.handleMapContextMenu_,
          this
        )
      );

      keys.push(
        olEvents.listen(
          this.translate_,
          'translateend',
          this.handleTranslateEnd_,
          this
        )
      );

      keys.push(
        olEvents.listen(
          this.rotate_,
          'rotateend',
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
      keys.forEach(olEvents.unlistenByKey);
      keys.length = 0;

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
      ngeoMiscDecorate.interaction(interaction);
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

      const clone = googAsserts.assertInstanceof(
        this.clone, ngeoRuleGeometry);
      const feature = clone.feature;

      // (1) Apply geometry
      const drawnFeature = googAsserts.assertInstanceof(
        evt.element,
        olFeature
      );
      const geometry = googAsserts.assertInstanceof(
        drawnFeature.getGeometry(),
        olGeomGeometry
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
    const rule = googAsserts.assertInstanceof(this.rule, ngeoRuleGeometry);
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
        if (olArray.includes(this.selectedFeatures.getArray(), feature)) {
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
      const  gettextCatalog = this.gettextCatalog_;

      if (type == ngeoGeometryType.CIRCLE ||
          type == ngeoGeometryType.LINE_STRING ||
          type == ngeoGeometryType.POLYGON ||
          type == ngeoGeometryType.RECTANGLE) {
        actions.push({
          cls: 'fa fa-arrows',
          label: gettextCatalog.getString('Move'),
          name: 'move'
        });
      }
      if (type == ngeoGeometryType.LINE_STRING ||
          type == ngeoGeometryType.POLYGON ||
          type == ngeoGeometryType.RECTANGLE) {
        actions.push({
          cls: 'fa fa-rotate-right',
          label: gettextCatalog.getString('Rotate'),
          name: 'rotate'
        });
      }
    }

    if (actions.length) {
      // (4) Create and show menu
      this.menu_ = new ngeoMenu({
        actions
      });

      olEvents.listen(
        this.menu_,
        'actionclick',
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
      olEvents.unlisten(
        this.menu_,
        'actionclick',
        this.handleMenuActionClick_,
        this
      );
      this.map.removeOverlay(this.menu_);
      this.menu_ = null;
    }
  }

  /**
   * @param {ngeox.MenuEvent} evt Event.
   * @private
   */
  handleMenuActionClick_(evt) {
    const action = evt.detail.action;

    switch (action) {
      case 'move':
        this.translate_.setActive(true);
        this.scope_.$apply();
        break;
      case 'rotate':
        this.rotate_.setActive(true);
        this.scope_.$apply();
        break;
      default:
        console.log(`FIXME - support: ${action}`);
        break;
    }
  }

  /**
   * @param {ngeox.RotateEvent} evt Event.
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
 * The rule component is bound to a `ngeo.rule.Rule` object and shows UI
 * components to be able to edit its properties, such as: operator, expression,
 * etc. The actual properties depend on the type of rule.
 *
 * Also, changes are not made on-the-fly. A button must be clicked for the
 * changes to be applied to the rule.
 */
exports.component('ngeoRule', {
  bindings: {
    'featureOverlay': '<',
    'map': '<',
    'rule': '<',
    'toolGroup': '<'
  },
  controller: exports.RuleController_,
  templateUrl: ngeoRuleTemplateUrl
});


export default exports;
