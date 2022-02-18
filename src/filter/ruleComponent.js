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
import ngeoMenu from 'ngeo/Menu';
import ngeoDrawComponent from 'ngeo/draw/component';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper';

import ngeoFormatAttributeType from 'ngeo/format/AttributeType';
import ngeoGeometryType from 'ngeo/GeometryType';
import ngeoInteractionModify from 'ngeo/interaction/Modify';
import ngeoInteractionRotate from 'ngeo/interaction/Rotate';
import ngeoInteractionTranslate from 'ngeo/interaction/Translate';

import ngeoMiscDatepickerComponent from 'ngeo/misc/datepickerComponent';

import {interactionDecoration as ngeoMiscDecorateInteraction} from 'ngeo/misc/decorate';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper';
import ngeoMiscToolActivate from 'ngeo/misc/ToolActivate';
import ngeoMiscToolActivateMgr from 'ngeo/misc/ToolActivateMgr';
import {RuleOperatorType, RuleSpatialOperatorType, RuleTemporalOperatorType} from 'ngeo/rule/Rule';
import ngeoRuleGeometry from 'ngeo/rule/Geometry';
import {getUid as olUtilGetUid} from 'ol/util';
import olCollection from 'ol/Collection';
import {listen, unlistenByKey} from 'ol/events';
import olStyleStyle from 'ol/style/Style';
import olStyleText from 'ol/style/Text';
import olStyleFill from 'ol/style/Fill';
import {CollectionEvent} from 'ol/Collection';
import Feature from 'ol/Feature';
import 'ngeo/sass/font.scss';

/**
 * @typedef {Object} MenuEventTarget
 * @property {string} action
 */

/**
 * @typedef {import('ngeo/CustomEvent').default<MenuEventTarget>} MenuEvent
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoRule', [
  ngeoDrawComponent.name,
  ngeoFilterRuleHelper.name,
  ngeoMiscDatepickerComponent.name,
  ngeoMiscFeatureHelper.name,
  ngeoMiscToolActivateMgr.name,
]);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/filter/rulecomponent', require('./rulecomponent.html'));
  }
);

myModule.value(
  'ngeoRuleTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @returns {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs['ngeoRuleTemplateUrl'];
    return templateUrl !== undefined ? templateUrl : 'ngeo/filter/rulecomponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoRuleTemplateUrl Template function.
 * @returns {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoRuleTemplateUrl($attrs, ngeoRuleTemplateUrl) {
  return ngeoRuleTemplateUrl($attrs);
}

/**
 * @hidden
 */
export class RuleController {
  /**
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {import('ngeo/misc/FeatureHelper').FeatureHelper} ngeoFeatureHelper Ngeo feature helper
   *    service.
   * @param {import('ngeo/filter/RuleHelper').RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @param {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate
   *     manager service.
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoRuleController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoFeatureHelper, ngeoRuleHelper, ngeoToolActivateMgr) {
    // Binding properties

    /**
     * @type {?import('ngeo/map/FeatureOverlay').FeatureOverlay}
     */
    this.featureOverlay = null;

    /**
     * @type {?import('ol/Map').default}
     */
    this.map = null;

    /**
     * The original rule.
     *
     * @type {?import('ngeo/rule/Rule').default}
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
     * @type {import('ngeo/misc/FeatureHelper').FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import('ngeo/filter/RuleHelper').RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    /**
     * @type {import('ngeo/misc/ToolActivateMgr').ToolActivateMgr}
     * @private
     */
    this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

    // Inner properties

    /**
     * The cloned rule. Changes in the UI are applied to the clone 'on-the-fly'.
     * Changes in the clone are applied back in the original rule when the
     * apply button is clicked.
     *
     * @type {?import('ngeo/rule/Rule').default}
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
      [operatorType.GREATER_THAN_OR_EQUAL_TO]: gettextCatalog.getString('Is greater than or equal to'),
      [operatorType.LESSER_THAN]: gettextCatalog.getString('Is lesser than'),
      [operatorType.LESSER_THAN_OR_EQUAL_TO]: gettextCatalog.getString('Is lesser than or equal to'),
      [operatorType.NOT_EQUAL_TO]: gettextCatalog.getString('Is not equal to'),
      [operatorType.LIKE]: gettextCatalog.getString('Contains'),
      [spatialOperatorType.CONTAINS]: gettextCatalog.getString('Contains'),
      [spatialOperatorType.INTERSECTS]: gettextCatalog.getString('Intersects'),
      [spatialOperatorType.WITHIN]: gettextCatalog.getString('Is inside of'),
      [temporalOperatorType.BEGINS]: gettextCatalog.getString('Begins at'),
      [temporalOperatorType.DURING]: gettextCatalog.getString('During'),
      [temporalOperatorType.ENDS]: gettextCatalog.getString('Ends at'),
      [temporalOperatorType.EQUALS]: gettextCatalog.getString('Is equal to'),
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
      [temporalOperatorType.EQUALS]: '=',
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
      interval: [0, 1, 0, 0],
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
      interval: [0, 1, 0, 0],
    };

    /**
     * @type {?import('ngeo/misc/ToolActivate').default}
     * @private
     */
    this.toolActivate_ = null; // = new ngeo.misc.ToolActivate(this.rule, 'active');

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
     * @type {import('ngeo/misc/ToolActivate').default}
     */
    this.drawToolActivate = new ngeoMiscToolActivate(this, 'drawActive');

    /**
     * @type {import('ol/Collection').default<Feature<import('ol/geom/Geometry').default>>}
     */
    this.drawnFeatures = new olCollection();

    /**
     * @type {?import('ngeo/Menu').default}
     * @private
     */
    this.menu_ = null;

    /**
     * @type {import('ol/Collection').default<Feature<import('ol/geom/Geometry').default>>}
     */
    this.selectedFeatures = new olCollection();

    /**
     * @type {import('ol/Collection').default<import('ol/interaction/Interaction').default>}
     * @private
     */
    this.interactions_ = new olCollection();

    /**
     * @type {import('ngeo/interaction/Modify').default}
     * @private
     */
    this.modify_ = new ngeoInteractionModify({
      features: this.selectedFeatures,
      style: ngeoFeatureHelper.getVertexStyle(false),
      nbPoints: 32,
    });
    this.interactions_.push(this.modify_);

    /**
     * @type {import('ngeo/interaction/Rotate').default}
     * @private
     */
    this.rotate_ = new ngeoInteractionRotate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf01e',
          font: '900 18px "Font Awesome 5 Free"',
          fill: new olStyleFill({
            color: '#7a7a7a',
          }),
        }),
      }),
    });
    this.interactions_.push(this.rotate_);

    /**
     * @type {import('ngeo/interaction/Translate').default}
     * @private
     */
    this.translate_ = new ngeoInteractionTranslate({
      features: this.selectedFeatures,
      style: new olStyleStyle({
        text: new olStyleText({
          text: '\uf0b2',
          font: '900 18px "Font Awesome 5 Free"',
          fill: new olStyleFill({
            color: '#7a7a7a',
          }),
        }),
      }),
    });
    this.interactions_.push(this.translate_);

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    this.initializeInteractions_();

    /**
     * @type {import('ngeo/misc/ToolActivate').default}
     */
    this.modifyToolActivate = new ngeoMiscToolActivate(this.modify_, 'active');

    /**
     * @type {import('ngeo/misc/ToolActivate').default}
     */
    this.rotateToolActivate = new ngeoMiscToolActivate(this.rotate_, 'active');

    /**
     * @type {import('ngeo/misc/ToolActivate').default}
     */
    this.translateToolActivate = new ngeoMiscToolActivate(this.translate_, 'active');

    /**
     * The geometry type used by the clone feature.
     *
     * @type {?string}
     */
    this.geomType = null;

    /**
     * @type {import('ol/events').EventsKey[]}
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

    this.ngeoToolActivateMgr_.registerTool(this.toolGroup, this.toolActivate_);

    this.scope_.$watch(() => {
      if (!this.rule) {
        throw new Error('Missing rule');
      }
      return this.rule.active;
    }, this.handleActiveChange_.bind(this));

    // If the rule is a DATE or DATETIME, then a datepicker directive is used.
    // It is not possible to set the current values to the datepicker, but you
    // can set the initial values. This is why it is created when the rule
    // becomes active (see the partials/rule.html).
    //
    // This chunk of code ensures that the rule properties are synchronized
    // with the TimeProperty objects required to build the datepickers.
    if (
      this.clone.type === ngeoFormatAttributeType.DATE ||
      this.clone.type === ngeoFormatAttributeType.DATETIME
    ) {
      // Watch 'literal'
      this.unlisteners_.push(
        this.scope_.$watch(
          /**
           * @returns {string|number}
           */
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            const literal = /** @type {string|number} */ (this.clone.literal);
            return literal;
          },
          /**
           * @param {string|number} newVal
           */
          (newVal) => {
            if (typeof newVal == 'string') {
              this.timeValueMode.minDefValue = newVal || this.createDate_();
            }
          }
        )
      );
      // Watch 'lowerBoundary'
      this.unlisteners_.push(
        this.scope_.$watch(
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            return this.clone.lowerBoundary;
          },
          (newVal) => {
            if (typeof newVal == 'string') {
              this.timeRangeMode.minDefValue = newVal || this.createWeekAgoDate_();
            }
          }
        )
      );
      // Watch 'upperBoundary'
      this.unlisteners_.push(
        this.scope_.$watch(
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            return this.clone.upperBoundary;
          },
          (newVal) => {
            if (typeof newVal == 'string') {
              this.timeRangeMode.maxDefValue = newVal || this.createDate_();
            }
          }
        )
      );
    } else if (this.clone.type === ngeoFormatAttributeType.GEOMETRY) {
      // Watch 'operator' of clone. Make sure any existing geometry is
      // supported by the newly selected operator. If it doesn't, reset
      // the literal, i.e. geometry.
      this.unlisteners_.push(
        this.scope_.$watch(
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            return this.clone.operator;
          },
          (newVal) => {
            this.drawActive = false;
            if (newVal && newVal === RuleSpatialOperatorType.CONTAINS) {
              const clone = this.clone;
              if (clone instanceof ngeoRuleGeometry) {
                const geometry = clone.feature.getGeometry();
                if (geometry) {
                  const geomType = this.ngeoFeatureHelper_.getType(clone.feature);
                  const supportedTypes = [
                    ngeoGeometryType.CIRCLE,
                    ngeoGeometryType.POLYGON,
                    ngeoGeometryType.RECTANGLE,
                  ];
                  if (!supportedTypes.includes(geomType)) {
                    if (!this.clone) {
                      throw new Error('Missing clone');
                    }
                    this.clone.literal = null;
                  }
                }
              }
            }
          }
        )
      );

      // Watch 'literal' of clone. Set 'geomType' property accordingly.
      this.unlisteners_.push(
        this.scope_.$watch(
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            return this.clone.literal;
          },
          (newVal) => {
            if (newVal) {
              const clone = this.clone;
              if (clone instanceof ngeoRuleGeometry) {
                this.geomType = this.ngeoFeatureHelper_.getType(clone.feature);
              }
            } else {
              this.geomType = null;
            }
          }
        )
      );

      // Watch both 'literal', 'active' and the modify control to be all
      // thruthy. When that's the case, the clone feature is added to the
      // selection collection.
      this.unlisteners_.push(
        this.scope_.$watch(
          () => {
            if (!this.clone) {
              throw new Error('Missing clone');
            }
            if (!this.rule) {
              throw new Error('Missing rule');
            }
            const hasLiteral = this.clone.literal !== null;
            const isActive = this.rule.active === true;
            const editToolIsActive =
              this.modify_.getActive() || this.rotate_.getActive() || this.translate_.getActive();
            return hasLiteral && isActive && editToolIsActive;
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
        )
      );
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
    this.ngeoToolActivateMgr_.unregisterTool(this.toolGroup, this.toolActivate_);
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
   * Add/remove the choice to/from the `literal` of the rule.
   *
   * @param {string} choice Choice that has been clicked.
   */
  toggleChoiceSelection(choice) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    const rule = this.clone;
    const choices = rule.literal ? /** @type {string[]} */ (rule.literal) : [];
    const idx = choices.indexOf(choice);
    if (idx > -1) {
      choices.splice(idx, 1);
    } else {
      choices.push(choice);
    }
    rule.literal = choices.length ? choices : null;
  }

  /**
   * @param {Object<string, number>} date Date
   */
  onDateSelected(date) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.clone.literal = date.start;
  }

  /**
   * @param {Object<string, number>} date Date
   */
  onDateRangeSelected(date) {
    if (!this.clone) {
      throw new Error('Missing clone');
    }
    this.clone.lowerBoundary = date.start;
    this.clone.upperBoundary = date.end;
  }

  /**
   * @param {number} [opt_timeDelta] Time delta to go back in the past.
   * @returns {string} ISO string of the date
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
   * @returns {string} ISO string of the date
   * @private
   */
  createWeekAgoDate_() {
    return this.createDate_(1000 * 60 * 60 * 24 * 7); // A week ago date
  }

  /**
   * @param {number} time Time.
   * @returns {string} Date
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

    if (
      !(this.rule instanceof ngeoRuleGeometry) ||
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
   *
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
   *
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
   *
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
   * @param {Event|import('ol/events/Event').default} evt Event.
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
          const properties = this.ngeoFeatureHelper_.getNonSpatialProperties(drawnFeature);
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
   *
   * @returns {?string} Geometry type.
   */
  getRuleGeometryType() {
    const rule = this.rule;
    if (rule instanceof ngeoRuleGeometry) {
      return this.ngeoFeatureHelper_.getType(rule.feature);
    }
    return null;
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleMapContextMenu_(evt) {
    if (evt instanceof UIEvent) {
      if (!this.map) {
        throw new Error('Missing map');
      }
      // (1) Remove previous menu, if any
      this.removeMenu_();

      // (2) Get feature at pixel
      const pixel = this.map.getEventPixel(evt);
      const coordinate = this.map.getCoordinateFromPixel(pixel);

      const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => {
        /** @type {?Feature<import('ol/geom/Geometry').default>} */
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
      });

      // (3) If the clicked feature is the selected one, plus if it has a certain
      //     type of geometry, then show the menu
      const actions = [];
      if (feature) {
        const type = this.ngeoFeatureHelper_.getType(feature);
        const gettextCatalog = this.gettextCatalog_;

        if (
          type == ngeoGeometryType.CIRCLE ||
          type == ngeoGeometryType.LINE_STRING ||
          type == ngeoGeometryType.POLYGON ||
          type == ngeoGeometryType.RECTANGLE
        ) {
          actions.push({
            cls: 'fas fa-arrows-alt',
            label: gettextCatalog.getString('Move'),
            name: 'move',
          });
        }
        if (
          type == ngeoGeometryType.LINE_STRING ||
          type == ngeoGeometryType.POLYGON ||
          type == ngeoGeometryType.RECTANGLE
        ) {
          actions.push({
            cls: 'fas fa-undo fa-flip-horizontal',
            label: gettextCatalog.getString('Rotate'),
            name: 'rotate',
          });
        }
      }

      if (actions.length) {
        // (4) Create and show menu
        this.menu_ = new ngeoMenu({
          actions,
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
   *
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
   * @param {Event|import('ol/events/Event').default|MenuEvent} evt Event.
   * @private
   */
  handleMenuActionClick_(evt) {
    const action = /** @type {MenuEvent} */ (evt).detail.action;

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
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleRotateEnd_(evt) {
    this.rotate_.setActive(false);
    this.scope_.$apply();
  }

  /**
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleTranslateEnd_(evt) {
    this.translate_.setActive(false);
    this.scope_.$apply();
  }
}

/**
 * The rule component is bound to a `import('ngeo/rule/Rule').default` object and shows UI
 * components to be able to edit its properties, such as: operator, literal,
 * etc. The actual properties depend on the type of rule.
 *
 * Also, changes are not made on-the-fly. A button must be clicked for the
 * changes to be applied to the rule.
 */
myModule.component('ngeoRule', {
  bindings: {
    'featureOverlay': '<',
    'map': '<',
    'rule': '<',
    'toolGroup': '<',
  },
  controller: RuleController,
  templateUrl: ngeoRuleTemplateUrl,
});

export default myModule;
