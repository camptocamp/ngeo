import angular from 'angular';
import ngeoMenu from 'ngeo/Menu.js';
import ngeoDrawComponent from 'ngeo/draw/component.js';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';

import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoGeometryType from 'ngeo/GeometryType.js';
import ngeoInteractionModify from 'ngeo/interaction/Modify.js';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate.js';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate.js';
import ngeoMapFeatureOverlay from 'ngeo/map/FeatureOverlay.js';

import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent.js';

import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate.js';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr.js';
import {RuleOperatorType, RuleSpatialOperatorType, RuleTemporalOperatorType} from 'ngeo/rule/Rule.js';
import ngeoRuleGeometry from 'ngeo/rule/Geometry.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import olCollection from 'ol/Collection.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import olStyleFill from 'ol/style/Fill.js';
import {CollectionEvent} from 'ol/Collection.js';
import Feature from 'ol/Feature.js';
import 'ngeo/sass/font.scss';


/**
 * @typedef {Object} MenuEventTarget
 * @property {string} action
 */


/**
 * @typedef {import("ngeo/CustomEvent.js").default<MenuEventTarget>} MenuEvent
 */


/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoRule', [
  ngeoDrawComponent.name,
  ngeoFilterRuleHelper.name,
  ngeoMapFeatureOverlay.name,
  ngeoMiscDatepickerComponent.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);


module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/filter/rulecomponent', require('./rulecomponent.html'));
  });


module.value('ngeoRuleTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRuleTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      'ngeo/filter/rulecomponent';
  });

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRuleTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoRuleTemplateUrl($attrs, ngeoRuleTemplateUrl) {
  return ngeoRuleTemplateUrl($attrs);
}


/**
 * @private
 * @hidden
 */
class RuleController {

  /**
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper
   *    service.
   * @param {import("ngeo/filter/RuleHelper.js").RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoFeatureHelper,
    ngeoRuleHelper, ngeoToolActivateMgr) {

    // Binding properties

    /**
     * @type {?import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
     */
    this.featureOverlay = null;

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * The original rule.
     * @type {?import("ngeo/rule/Rule.js").default}
     */
    this.rule = null;

    /**
     * @type {string}
     */
    this.toolGroup = '';


    // Injected properties

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

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
     * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import("ngeo/filter/RuleHelper.js").RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {import("ngeo/misc/ToolActivateMgr.js").ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;


    // Inner properties

    /**
     * The cloned rule. Changes in the UI are applied to the clone 'on-the-fly'.
     * Changes in the clone are applied back in the original rule when the
     * apply button is clicked.
     * @type {?import("ngeo/rule/Rule.js").default}
     */
    this.clone = null;

    const operatorType = RuleOperatorType;
    const spatialOperatorType = RuleSpatialOperatorType;
    const temporalOperatorType = RuleTemporalOperatorType;

    /**
     * @type {Object<string, string>}
     */
    this.operators = {
      [operatorType.EQUAL_TO]: gettextCatalog.getString('Is equal to'),
      [operatorType.GREATER_THAN]: gettextCatalog.getString('Is greater than'),
      [operatorType.GREATER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is greater than or equal to'),
      [operatorType.LESSER_THAN]: gettextCatalog.getString('Is lesser than'),
      [operatorType.LESSER_THAN_OR_EQUAL_TO]: gettextCatalog.getString(
        'Is lesser than or equal to'),
      [operatorType.NOT_EQUAL_TO]: gettextCatalog.getString('Is not equal to'),
      [operatorType.LIKE]: gettextCatalog.getString('Contains'),
      [spatialOperatorType.CONTAINS]: gettextCatalog.getString('Contains'),
      [spatialOperatorType.INTERSECTS]: gettextCatalog.getString('Intersects'),
      [spatialOperatorType.WITHIN]: gettextCatalog.getString('Is inside of'),
      [temporalOperatorType.BEGINS]: gettextCatalog.getString('Begins at'),
      [temporalOperatorType.DURING]: gettextCatalog.getString('During'),
      [temporalOperatorType.ENDS]: gettextCatalog.getString('Ends at'),
      [temporalOperatorType.EQUALS]: gettextCatalog.getString('Is equal to')
    };

    /**
     * @type {Object<string, string>}
     */
    this.operatorsShortFormat = {
      [operatorType.EQUAL_TO]: '=',
      [operatorType.GREATER_THAN]: '>',
      [operatorType.GREATER_THAN_OR_EQUAL_TO]: '>=',
      [operatorType.LESSER_THAN]: '<',
      [operatorType.LESSER_THAN_OR_EQUAL_TO]: '<=',
      [operatorType.NOT_EQUAL_TO]: '!=',
      [operatorType.LIKE]: '~',
      [temporalOperatorType.BEGINS]: '>=',
      [temporalOperatorType.ENDS]: '<=',
      [temporalOperatorType.EQUALS]: '='
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a range of date.
     */
    this.timeRangeMode = {
      widget: 'datepicker',
      maxValue: null,
      minValue: null,
      maxDefValue: this.createDate_(),
      minDefValue: this.createWeekAgoDate_(),
      mode: 'range',
      interval: [0, 1, 0, 0]
    };

    /**
     * Time property used when the rule is of type 'date|datetime' and uses
     * a single date.
     */
    this.timeValueMode = {
      widget: 'datepicker',
      maxValue: null,
      minValue: null,
      maxDefValue: this.createDate_(),
      minDefValue: this.createDate_(),
      mode: 'value',
      interval: [0, 1, 0, 0]
    };

    /**
     * @type {?import("ngeo/misc/ToolActivate.js").default}
     * @private
     */
    this.toolActivate_ = null;// = new ngeo.misc.ToolActivate(this.rule, 'active');

    /**
     * @type {Function[]}
     * @private
     */
    this.unlisteners_ = [];


    // Inner properties when dealing with a `ngeo.rule.Geometry`

    /**
     * @type {boolean}
     */
    this.drawActive = false;

    /**
     * @type {import("ngeo/misc/ToolActivate.js").default}
     */
    this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

    /**
     * @type {import("ol/Collection.js").default<Feature<import("ol/geom/Geometry.js").default>>}
     */
    this.drawnFeatures = new olCollection();

    /**
     * @type {?import("ngeo/Menu.js").default}
     * @private
     */
    this.menu_ = null;

    /**
     * @type {import("ol/Collection.js").default<Feature<import("ol/geom/Geometry.js").default>>}
     */
    this.selectedFeatures = new olCollection();

    /**
     * @type {import("ol/Collection.js").default<import("ol/interaction/Interaction.js").default>}
     * @private
     */
    this.interactions_ = new olCollection();

    /**
     * @type {import("ngeo/interaction/Modify.js").default}
     * @private
     */
    this.modify_ = new ngeoInteractionModify({
      features: this.selectedFeatures,
      style: ngeoFeatureHelper.getVertexStyle(false)
    });
    this.interactions_.push(this.modify_);

    /**
     * @type {import("ngeo/interaction/Rotate.js").default}
     * @private
     */
    this.rotate_ = new ngeoInteractionRotate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf01e',
          font: '900 18px "Font Awesome 5 Free"',
          fill: new olStyleFill({
            color: '#7a7a7a'
          })
        })
      })
    });
    this.interactions_.push(this.rotate_);

    /**
     * @type {import("ngeo/interaction/Translate.js").default}
     * @private
     */
    this.translate_ = new ngeoInteractionTranslate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf0b2',
          font: '900 18px "Font Awesome 5 Free"',
          fill: new olStyleFill({
            color: '#7a7a7a'
          })
        })
      })
    });
    this.interactions_.push(this.translate_);

    /**
     * @type {Array<import("ol/events.js").EventsKey>}
     * @private
     */
    this.listenerKeys_ = [];

    this.initializeInteractions_();

    /**
     * @type {import("ngeo/misc/ToolActivate.js").default}
     */
    this.modifyToolActivate = new ngeoMiscToolActivate(
      this.modify_,
      'active'
    );

    /**
     * @type {import("ngeo/misc/ToolActivate.js").default}
     */
    this.rotateToolActivate = new ngeoMiscToolActivate(
      this.rotate_,
      'active'
    );

    /**
     * @type {import("ngeo/misc/ToolActivate.js").default}
     */
    this.translateToolActivate = new ngeoMiscToolActivate(
      this.translate_,
      'active'
    );

    /**
     * The geometry type used by the clone feature.
     * @type {?string}
     */
    this.geomType = null;

    /**
     * @type {import("ol/events.js").EventsKey[]}
     */
    this.listenerKeys_ = [];
  }

  /**
   * Called on initialization of the controller.
   *
   * Clone the rule to be able to work with the clone directly.
   */
  $onInit() {
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    this.clone = this.ngeoRuleHelper_.cloneRule(this.rule);

    this.toolActivate_ = new ngeoMiscToolActivate(this.rule, 'active');

    this.ngeoToolActivateMgr_.registerTool(
      this.toolGroup, this.toolActivate_);

    this.scope_.$watch(
      () => {
        if (!this.rule) {
          throw new Error('Missing rule');
        }
        this.rule.active;
        return false;
      },
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
        () => {
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          this.clone.getExpression();
        },
        (newVal) => {
          if (typeof newVal == 'string') {
            // @ts-ignore: Why?
            this.timeValueMode.minDefValue = newVal || this.createDate_();
          }
        }
      ));
      // Watch 'lowerBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => {
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          this.clone.lowerBoundary;
        },
        (newVal) => {
          if (typeof newVal == 'string') {
            // @ts-ignore: Why?
            this.timeRangeMode.minDefValue = newVal || this.createWeekAgoDate_();
          }
        }
      ));
      // Watch 'upperBoundary'
      this.unlisteners_.push(this.scope_.$watch(
        () => {
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          this.clone.upperBoundary;
        },
        (newVal) => {
          if (typeof newVal == 'string') {
            // @ts-ignore: Why?
            this.timeRangeMode.maxDefValue = newVal || this.createDate_();
          }
        }
      ));
    } else if (this.clone.type === ngeoFormatAttributeType.GEOMETRY) {

      // Watch 'operator' of clone. Make sure any existing geometry is
      // supported by the newly selected operator. If it doesn't, reset
      // the expression, i.e. geometry.
      this.unlisteners_.push(this.scope_.$watch(
        () => {
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          this.clone.operator;
        },
        (newVal) => {
          this.drawActive = false;
          // @ts-ignore: Why?
          if (newVal && newVal === RuleSpatialOperatorType.CONTAINS) {
            const clone = this.clone;
            if (clone instanceof ngeoRuleGeometry) {
              const geometry = clone.feature.getGeometry();
              if (geometry) {
                const geomType = this.ngeoFeatureHelper_.getType(clone.feature);
                const supportedTypes = [
                  ngeoGeometryType.CIRCLE,
                  ngeoGeometryType.POLYGON,
                  ngeoGeometryType.RECTANGLE
                ];
                if (!supportedTypes.includes(geomType)) {
                  if (!this.clone) {
                    throw new Error('Missing clone');
                  }
                  this.clone.setExpression(null);
                }
              }
            }
          }
        }
      ));

      // Watch 'expression' of clone. Set 'geomType' property accordingly.
      this.unlisteners_.push(this.scope_.$watch(
        () => {
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          this.clone.expression;
        },
        (newVal) => {
          // @ts-ignore: Why?
          if (newVal) {
            const clone = this.clone;
            if (clone instanceof ngeoRuleGeometry) {
              this.geomType = this.ngeoFeatureHelper_.getType(clone.feature);
            }
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
          if (!this.clone) {
            throw new Error('Missing clone');
          }
          if (!this.rule) {
            throw new Error('Missing rule');
          }
          const hasExpression = this.clone.getExpression() !== null;
          const isActive = this.rule.active === true;
          const editToolIsActive = this.modify_.getActive() ||
                this.rotate_.getActive() ||
                this.translate_.getActive();
          return hasExpression && isActive && editToolIsActive;
        },
        (newVal) => {
          if (newVal) {
            const clone = this.clone;
            if (clone instanceof ngeoRuleGeometry) {
              this.selectedFeatures.push(clone.feature);
            }
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
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    if (!this.toolActivate_) {
      throw new Error('Missing toolActivate');
    }
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
   */
  toggle() {
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    if (this.rule.active) {
      this.cancel();
    } else {
      this.rule.active = true;
    }
  }

  /**
   * Apply the changes that were made in the original rule.
   */
  apply() {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    this.ngeoRuleHelper_.extendRule(this.clone, this.rule);
    this.rule.active = false;
  }

  /**
   * Revert the changes that were made in the clone rule.
   */
  cancel() {
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.ngeoRuleHelper_.extendRule(this.rule, this.clone);
    this.rule.active = false;
  }

  /**
   * Reset both original and clone rules.
   */
  reset() {
    if (!this.rule) {
      throw new Error('Missing rule');
    }
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.clone.reset();
    this.rule.reset();
  }

  /**
   * Called when a choice is clicked, when using a `ngeo.rule.Select` rule type.
   * Add/remove the choice to/from the `expression` of the rule.
   * @param {string} choice Choice that has been clicked.
   */
  toggleChoiceSelection(choice) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    const rule = this.clone;
    const choices = rule.getExpression() ? /** @type {string} */(rule.getExpression()).split(',') : [];
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
   */
  onDateSelected(date) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.clone.setExpression(date.start);
  }

  /**
   * @param {Object} date Date
   */
  onDateRangeSelected(date) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.clone.lowerBoundary = date.start;
    this.clone.upperBoundary = date.end;
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
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.featureOverlay) {
      throw new Error('Missing featureOverlay');
    }

    if (!(this.rule instanceof ngeoRuleGeometry) ||
        !(this.clone instanceof ngeoRuleGeometry) ||
        active === oldActive
    ) {
      return;
    }

    const keys = this.listenerKeys_;
    const uid = ['ngeo-rule-', olUtilGetUid(this)].join('-');
    const toolMgr = this.ngeoToolActivateMgr_;

    const ruleFeature = this.rule.feature;
    const cloneFeature = this.clone.feature;

    const mapDiv = this.map.getViewport();
    console.assert(mapDiv);

    if (active) {
      keys.push(
        listen(this.drawnFeatures, 'add', this.handleFeaturesAdd_, this),
        listen(mapDiv, 'contextmenu', this.handleMapContextMenu_, this),
        listen(this.translate_, 'translateend', this.handleTranslateEnd_, this),
        listen(this.rotate_, 'rotateend', this.handleRotateEnd_, this)
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
      keys.forEach(unlistenByKey);
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
      ngeoMiscDecorateInteraction(interaction);
    });
  }

  /**
   * Register interactions by adding them to the map
   * @private
   */
  registerInteractions_() {
    this.interactions_.forEach((interaction) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      this.map.addInteraction(interaction);
    });
  }

  /**
   * Register interactions by removing them to the map
   * @private
   */
  unregisterInteractions_() {
    this.interactions_.forEach((interaction) => {
      if (!this.map) {
        throw new Error('Missing map');
      }
      this.map.removeInteraction(interaction);
    });
  }

  /**
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleFeaturesAdd_(evt) {
    if (evt instanceof CollectionEvent) {
      // timeout to prevent double-click to zoom the map
      this.timeout_(() => {

        const clone = this.clone;
        if (clone instanceof ngeoRuleGeometry) {
          const feature = clone.feature;

          // (1) Apply geometry
          const drawnFeature = evt.element;
          const geometry = drawnFeature.getGeometry();
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
        }
      });
    }
  }

  /**
   * Return the type of geometry used by the rule feature. Used in the template.
   * @return {?string} Geometry type.
   */
  getRuleGeometryType() {
    const rule = this.rule;
    if (rule instanceof ngeoRuleGeometry) {
      return this.ngeoFeatureHelper_.getType(rule.feature);
    }
    return null;
  }

  /**
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleMapContextMenu_(evt) {
    if (evt instanceof Event || evt instanceof TouchEvent) {
      if (!this.map) {
        throw new Error('Missing map');
      }
      // (1) Remove previous menu, if any
      this.removeMenu_();

      // (2) Get feature at pixel
      const pixel = this.map.getEventPixel(evt);
      const coordinate = this.map.getCoordinateFromPixel(pixel);

      const feature = this.map.forEachFeatureAtPixel(
        pixel,
        (feature) => {
          /** @type {?Feature<import("ol/geom/Geometry.js").default>} */
          let ret = null;
          if (!(feature instanceof Feature)) {
            throw new Error('Wrong feature type');
          }
          if (this.selectedFeatures.getArray().includes(feature)) {
            ret = feature;
          }
          if (!ret) {
            throw new Error('Missing feature');
          }
          return ret;
        }
      );

      // (3) If the clicked feature is the selected one, plus if it has a certain
      //     type of geometry, then show the menu
      const actions = [];
      if (feature) {

        const type = this.ngeoFeatureHelper_.getType(feature);
        const gettextCatalog = this.gettextCatalog_;

        if (type == ngeoGeometryType.CIRCLE ||
            type == ngeoGeometryType.LINE_STRING ||
            type == ngeoGeometryType.POLYGON ||
            type == ngeoGeometryType.RECTANGLE) {
          actions.push({
            cls: 'fas fa-arrows-alt',
            label: gettextCatalog.getString('Move'),
            name: 'move'
          });
        }
        if (type == ngeoGeometryType.LINE_STRING ||
            type == ngeoGeometryType.POLYGON ||
            type == ngeoGeometryType.RECTANGLE) {
          actions.push({
            cls: 'fas fa-undo fa-flip-horizontal',
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

        this.listenerKeys_.push(listen(this.menu_, 'actionclick', this.handleMenuActionClick_, this));
        this.map.addOverlay(this.menu_);

        this.menu_.open(coordinate);

        evt.preventDefault();
        evt.stopPropagation();

        this.scope_.$apply();
      }
    }
  }

  /**
   * Remove contextual menu, if any.
   * @private
   */
  removeMenu_() {
    if (this.menu_) {
      if (!this.map) {
        throw new Error('Missing map');
      }
      this.listenerKeys_.forEach(unlistenByKey);
      this.map.removeOverlay(this.menu_);
      this.menu_ = null;
    }
  }

  /**
   * @param {Event|import("ol/events/Event.js").default|MenuEvent} evt Event.
   * @private
   */
  handleMenuActionClick_(evt) {
    const action = /** @type {MenuEvent} */(evt).detail.action;

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
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleRotateEnd_(evt) {
    this.rotate_.setActive(false);
    this.scope_.$apply();
  }

  /**
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleTranslateEnd_(evt) {
    this.translate_.setActive(false);
    this.scope_.$apply();
  }

}


/**
 * The rule component is bound to a `import('ngeo/rule/Rule.js').default` object and shows UI
 * components to be able to edit its properties, such as: operator, expression,
 * etc. The actual properties depend on the type of rule.
 *
 * Also, changes are not made on-the-fly. A button must be clicked for the
 * changes to be applied to the rule.
 */
module.component('ngeoRule', {
  bindings: {
    'featureOverlay': '<',
    'map': '<',
    'rule': '<',
    'toolGroup': '<'
  },
  controller: RuleController,
  templateUrl: ngeoRuleTemplateUrl
});


export default module;
