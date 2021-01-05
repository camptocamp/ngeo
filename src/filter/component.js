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
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoFilterCondition from 'ngeo/filter/Condition.js';

import ngeoFilterRuleComponent from 'ngeo/filter/ruleComponent.js';

import ngeoFilterRuleHelper from 'ngeo/filter/RuleHelper.js';

import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import ngeoRuleGeometry from 'ngeo/rule/Geometry.js';
import ngeoMapFeatureOverlay from 'ngeo/map/FeatureOverlay.js';
import {getUid as olUtilGetUid} from 'ol/util.js';
import {remove as removeFromArray} from 'ol/array.js';
import 'ngeo/sass/font.scss';

/**
 * @typedef {Object} FilterCondition
 * @property {string} text
 * @property {string} value
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFilter', [
  ngeoFilterRuleHelper.name,
  ngeoFilterRuleComponent.name,
  ngeoMapFeatureOverlay.name,
  ngeoQueryMapQuerent.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/filter', require('./component.html'));
  }
);

module.value(
  'ngeoFilterTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  ($attrs) => {
    const templateUrl = $attrs.ngeoFilterTemplateUrl;
    return templateUrl !== undefined ? templateUrl : 'ngeo/filter';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoFilterTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoFilterTemplateUrl($attrs, ngeoFilterTemplateUrl) {
  return ngeoFilterTemplateUrl($attrs);
}

module.component('ngeoFilter', {
  bindings: {
    'aRuleIsActive': '=',
    'customRules': '<',
    // It's 'datasource' instead of 'dataSource', because that would require
    // the attribute to be 'data-source', and Angular strips the 'data-'.
    'datasource': '<',
    'directedRules': '<',
    'featureOverlay': '<',
    'filterIsApplied': '=',
    'map': '<',
    'toolGroup': '<',
  },
  controller: 'ngeoFilterController',
  templateUrl: ngeoFilterTemplateUrl,
});

/**
 * @hidden
 */
export class FilterController {
  /**
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {import("ngeo/query/MapQuerent.js").MapQuerent} ngeoMapQuerent The ngeo map querent service.
   * @param {import("ngeo/filter/RuleHelper.js").RuleHelper} ngeoRuleHelper Ngeo rule helper service.
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoFilterController
   */
  constructor(gettextCatalog, $scope, $timeout, ngeoMapQuerent, ngeoRuleHelper) {
    // === Binding properties ===

    /**
     * @type {boolean}
     */
    this.aRuleIsActive = false;

    /**
     * @type {Array<import("ngeo/rule/Rule.js").default>}
     */
    this.customRules = [];

    /**
     * @type {?import("ngeo/datasource/OGC.js").default}
     */
    this.datasource = null;

    /**
     * @type {Array<import("ngeo/rule/Rule.js").default>}
     */
    this.directedRules = [];

    /**
     * @type {?import("ngeo/map/FeatureOverlay.js").FeatureOverlay}
     */
    this.featureOverlay = null;

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * @type {string}
     */
    this.toolGroup = '';

    /**
     * @type {boolean}
     */
    this.filterIsApplied = false;

    // === Injected properties ===

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
     * @type {import("ngeo/query/MapQuerent.js").MapQuerent}
     * @private
     */
    this.ngeoMapQuerent_ = ngeoMapQuerent;

    /**
     * @type {import("ngeo/filter/RuleHelper.js").RuleHelper}
     * @private
     */
    this.ngeoRuleHelper_ = ngeoRuleHelper;

    // === Inner properties ===

    /**
     * @type {FilterCondition[]}
     */
    this.conditions = [
      {
        text: gettextCatalog.getString('Match all criteria'),
        value: ngeoFilterCondition.AND,
      },
      {
        text: gettextCatalog.getString('Match at least one criterion'),
        value: ngeoFilterCondition.OR,
      },
      {
        text: gettextCatalog.getString('Does not match any criterion'),
        value: ngeoFilterCondition.NOT,
      },
    ];

    /**
     * List of geometry attributes.
     * @type {Array<import('ngeo/format/Attribute.js').Attribute>}
     */
    this.geometryAttributes = [];

    /**
     * List of other attribute names.
     * @type {Array<import('ngeo/format/Attribute.js').Attribute>}
     */
    this.otherAttributes = [];

    /**
     * @type {Object<string, Function>}
     * @private
     */
    this.ruleUnlisteners_ = {};
  }

  /**
   * Called on initialization of the controller.
   *
   * Loop through the attributes of the data source and separated them in 2
   * lists: geometry and the others. Then, apply the filters to the data source.
   */
  $onInit() {
    if (!this.datasource) {
      throw new Error('Missing datasource');
    }

    this.scope_.$watch(() => this.aRuleIsActive, this.handleARuleIsActiveChange_.bind(this));

    this.scope_.$watch(
      () => this.datasource.filterRules,
      () => {
        this.filterIsApplied = this.hasARuleActive();
      }
    );

    // (1) Separate the attributes in 2: geometry and the others.
    const attributes = this.datasource.attributes;
    for (const attribute of attributes) {
      if (attribute.type === ngeoFormatAttributeType.GEOMETRY) {
        this.geometryAttributes.push(attribute);
      } else {
        this.otherAttributes.push(attribute);
      }
    }

    // (2) All rules that have geometry are added in the featureOverlay
    for (const rule of this.customRules) {
      this.registerRule_(rule);
    }
    for (const rule of this.directedRules) {
      this.registerRule_(rule);
    }

    // (3) Apply the filters
    this.apply();
  }

  /**
   * Called on destruction of the controller.
   *
   * Reset the `filterRules` of the data source back to `null`.
   * Clear the feature overlay.
   */
  $onDestroy() {
    if (!this.datasource) {
      throw new Error('Missing datasource');
    }
    if (!this.featureOverlay) {
      throw new Error('Missing featureOverlay');
    }
    if (this.datasource.filterRules !== null) {
      this.datasource.filterRules = null;
    }
    this.featureOverlay.clear();
  }

  /**
   * @return {boolean} True if at least one rule is currently defined with an expression.
   */
  hasARuleActive() {
    let customRuleActive = false;
    let directedRuleActive = false;
    for (const rule of this.customRules) {
      if (rule.expression) {
        customRuleActive = true;
      }
    }
    for (const rule of this.directedRules) {
      if (rule.expression) {
        directedRuleActive = true;
      }
    }
    return customRuleActive || directedRuleActive;
  }

  /**
   * Loop in all directed and custom rules. Apply the rules that have a proper
   * value inside the data source, in the `filterRules` property.
   */
  apply() {
    if (!this.datasource) {
      throw new Error('Missing datasource');
    }
    // (1) Reset
    this.datasource.filterRules = null;

    // (2) Then set if there are filter rules with value.
    this.timeout_(() => {
      const filterRules = this.getRulesWithValue_();
      if (filterRules.length) {
        if (!this.datasource) {
          throw new Error('Missing datasource');
        }
        this.datasource.filterRules = filterRules;
        // The current query results are cleared when we apply a filter.
        this.ngeoMapQuerent_.clear();
      }
    });
  }

  /**
   * Loop in all directed and custom rules. Issue a request to obtain the data
   * and show the result.
   */
  getData() {
    if (!this.datasource) {
      throw new Error('Missing datasource');
    }
    if (!this.map) {
      throw new Error('Missing map');
    }
    const filterRules = this.getRulesWithValue_();

    // No need to do anything if there's no rules.
    if (!filterRules.length) {
      return;
    }

    const dataSource = this.datasource;
    const limit = 1000;
    const map = this.map;
    const projCode = map.getView().getProjection().getCode();
    const filter = this.ngeoRuleHelper_.createFilter({
      dataSource: dataSource,
      filterRules: filterRules,
      srsName: projCode,
    });
    if (!filter) {
      throw new Error('Missing filter');
    }

    this.ngeoMapQuerent_.issue({
      dataSources: [dataSource],
      filter: filter,
      limit: limit,
      map: map,
    });
  }

  /**
   * Loop in all directed and custom rules and collect those with a value.
   * @return {Array<import("ngeo/rule/Rule.js").default>} Rules with value.
   * @private
   */
  getRulesWithValue_() {
    const filterRules = [];
    for (const rule of this.customRules) {
      if (rule.value) {
        filterRules.push(rule);
      }
    }
    for (const rule of this.directedRules) {
      if (rule.value) {
        filterRules.push(rule);
      }
    }
    return filterRules;
  }

  /**
   * Create and add a new custom rule using an attribute. The rule is activated
   * after being created.
   * @param {import('ngeo/format/Attribute.js').Attribute} attribute Attribute to use to create the custom
   * rule.
   */
  createAndAddCustomRule(attribute) {
    const rule = this.ngeoRuleHelper_.createRuleFromAttribute(attribute, true);
    this.registerRule_(rule);
    this.customRules.push(rule);

    // Activate asynchronously allows the toolActivate manager to do its magic,
    this.timeout_(() => {
      rule.active = true;
    }, 1);
  }

  /**
   * @param {FilterCondition} condition Condition to set.
   */
  setCondition(condition) {
    if (!this.datasource) {
      throw new Error('Missing datasource');
    }
    if (this.datasource.filterCondition !== condition.value) {
      this.datasource.filterCondition = condition.value;
    }
  }

  /**
   * Remove a custom rule. Deactivate it first, then give time to the
   * `ngeo-rule` directive to manage the deactivation of the rule.
   * @param {import("ngeo/rule/Rule.js").default} rule Custom rule to remove.
   */
  removeCustomRule(rule) {
    rule.active = false;
    this.timeout_(() => {
      removeFromArray(this.customRules, rule);
      this.unregisterRule_(rule);
      rule.destroy();
    });
  }

  /**
   * @param {import("ngeo/rule/Rule.js").default} rule Rule.
   */
  registerRule_(rule) {
    if (!this.featureOverlay) {
      throw new Error('Missing featureOverlay');
    }
    const uid = olUtilGetUid(rule);
    this.ruleUnlisteners_[uid] = this.scope_.$watch(
      () => rule.active,
      this.handleRuleActiveChange_.bind(this)
    );

    if (rule instanceof ngeoRuleGeometry) {
      this.featureOverlay.addFeature(rule.feature);
    }
  }

  /**
   * @param {import("ngeo/rule/Rule.js").default} rule Rule.
   */
  unregisterRule_(rule) {
    if (!this.featureOverlay) {
      throw new Error('Missing featureOverlay');
    }
    const uid = olUtilGetUid(rule);
    const unlistener = this.ruleUnlisteners_[uid];
    console.assert(unlistener);
    unlistener();
    delete this.ruleUnlisteners_[uid];

    if (rule instanceof ngeoRuleGeometry) {
      this.featureOverlay.removeFeature(rule.feature);
    }
  }

  /**
   * Called when the active property of a rule changes. Set the `aRuleIsActive`
   * property accordingly.
   * @private
   */
  handleRuleActiveChange_() {
    let aRuleIsActive = false;
    for (const rule of this.customRules) {
      if (rule.active) {
        aRuleIsActive = true;
        break;
      }
    }
    for (const rule of this.directedRules) {
      if (rule.active) {
        aRuleIsActive = true;
        break;
      }
    }
    this.aRuleIsActive = aRuleIsActive;
  }

  /**
   * Called when the `aRuleIsActive` property changes. Make sure that
   * no rule is still active if the property is `false`.
   * @private
   */
  handleARuleIsActiveChange_() {
    if (this.aRuleIsActive) {
      return;
    }
    for (const rule of this.customRules) {
      if (rule.active) {
        rule.active = false;
        break;
      }
    }
    for (const rule of this.directedRules) {
      if (rule.active) {
        rule.active = false;
        break;
      }
    }
  }
}

module.controller('ngeoFilterController', FilterController);

export default module;
