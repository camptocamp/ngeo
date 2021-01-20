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
import ngeoFilterCondition from 'ngeo/filter/Condition.js';
import ngeoFormatAttributeType from 'ngeo/format/AttributeType.js';
import * as ngeoFormatFilter from 'ngeo/format/filter.js';
import ngeoMiscFeatureHelper from 'ngeo/misc/FeatureHelper.js';
import ngeoMiscWMSTime from 'ngeo/misc/WMSTime.js';
import ngeoRuleDate from 'ngeo/rule/Date.js';
import ngeoRuleGeometry from 'ngeo/rule/Geometry.js';
import ngeoRuleRule, {
  RuleOperatorType,
  RuleSpatialOperatorType,
  RuleTemporalOperatorType,
} from 'ngeo/rule/Rule.js';
import ngeoRuleSelect from 'ngeo/rule/Select.js';
import ngeoRuleText from 'ngeo/rule/Text.js';
import {writeFilter} from 'ol/format/WFS.js';
import * as olFormatFilter from 'ol/format/filter.js';

import moment from 'moment';

/**
 * @typedef {import('ngeo/rule/Rule.js').RuleOptions|import('ngeo/rule/Geometry.js').GeometryOptions|import('ngeo/rule/Select.js').SelectOptions|import('ngeo/rule/Text.js').TextOptions} AnyOptions
 */

/**
 * The options to use when creating a filter using the `ngeo.RuleHelper`
 * service.
 *
 * @typedef {Object} CreateFilterOptions
 * @property {import('ngeo/datasource/OGC.js').default} dataSource The data source from which to get
 *    the filterRules that will be used to create the OL filter object.
 * @property {boolean} [incDimensions] Whether to include the dimensions related filters. Default to `true`.
 * @property {boolean} [incTime] Whether to include the data source's time values in the filter created. The
 *    property that contains those values is `timeRangeValue`. Defaults to `false`.
 *    When building a filter for WMS, it should not be included as it is given as
 *    the TIME parameter of the query instead. When used for a WFS request, it
 *    should be included in the filter.
 * @property {import("ol/format/filter/Filter.js").default} [filter] A filter that is directly given the
 *    method instead of creating one.
 *    Useful to automatically combine the time values.
 * @property {Array<import('ngeo/rule/Rule.js').default>} [filterRules] An alternative list of filter rules
 *    to use instead of those that are defined within the data source. Useful when one wants to get the data
 *    of a given filter without applying it to the data source.
 * @property {string} [projCode] Projection code.
 * @property {string} [srsName] The SRS name used with the spatial filters created by the method.
 */

/**
 * @hidden
 */
export class RuleHelper {
  /**
   * A service that provides utility methods to create `import('ngeo/rule/Rule.js').default`
   * objects.
   *
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext service.
   * @param {import("ngeo/misc/FeatureHelper.js").FeatureHelper} ngeoFeatureHelper Ngeo feature helper
   *    service.
   * @param {import("ngeo/misc/WMSTime.js").WMSTime} ngeoWMSTime wms time service.
   * @ngdoc service
   * @ngname ngeoRuleHelper
   * @ngInject
   */
  constructor(gettextCatalog, ngeoFeatureHelper, ngeoWMSTime) {
    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {import("ngeo/misc/FeatureHelper.js").FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {import("ngeo/misc/WMSTime.js").WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;
  }

  /**
   * @param {Array<import('ngeo/format/Attribute.js').Attribute>} attributes Attributes.
   * @param {boolean=} opt_isCustom Whether the created rules should be marked
   *     as custom or not. Defaults to `false`.
   * @return {Array<import("ngeo/rule/Rule.js").default>} Rules.
   */
  createRulesFromAttributes(attributes, opt_isCustom) {
    const rules = [];
    for (const attribute of attributes) {
      rules.push(this.createRuleFromAttribute(attribute, opt_isCustom));
    }
    return rules;
  }

  /**
   * @param {import('ngeo/format/Attribute.js').Attribute} attribute Attribute.
   * @param {boolean=} opt_isCustom Whether the created rule should be marked
   *     as custom or not. Defaults to `false`.
   * @return {import("ngeo/rule/Rule.js").default} Rule.
   */
  createRuleFromAttribute(attribute, opt_isCustom) {
    let rule;
    const isCustom = opt_isCustom === true;

    /**
     * @type {string}
     */
    const name = this.gettextCatalog_.getString(attribute.name);

    // Todo: support geometry

    switch (attribute.type) {
      case ngeoFormatAttributeType.DATE:
      case ngeoFormatAttributeType.DATETIME:
        if (isCustom) {
          rule = new ngeoRuleDate({
            name: name,
            operator: RuleTemporalOperatorType.EQUALS,
            operators: [
              RuleTemporalOperatorType.EQUALS,
              RuleTemporalOperatorType.BEGINS,
              RuleTemporalOperatorType.ENDS,
            ],
            propertyName: attribute.name,
            type: attribute.type,
          });
        } else {
          rule = new ngeoRuleDate({
            name: name,
            operator: RuleTemporalOperatorType.DURING,
            propertyName: attribute.name,
            type: attribute.type,
          });
        }
        break;
      case ngeoFormatAttributeType.GEOMETRY:
        rule = new ngeoRuleGeometry({
          name: name,
          operator: RuleSpatialOperatorType.INTERSECTS,
          operators: [
            RuleSpatialOperatorType.CONTAINS,
            RuleSpatialOperatorType.INTERSECTS,
            RuleSpatialOperatorType.WITHIN,
          ],
          propertyName: attribute.name,
          type: attribute.type,
        });
        break;
      case ngeoFormatAttributeType.NUMBER:
        if (isCustom) {
          rule = new ngeoRuleRule({
            name: name,
            operator: RuleOperatorType.EQUAL_TO,
            operators: [
              RuleOperatorType.EQUAL_TO,
              RuleOperatorType.GREATER_THAN,
              RuleOperatorType.GREATER_THAN_OR_EQUAL_TO,
              RuleOperatorType.LESSER_THAN,
              RuleOperatorType.LESSER_THAN_OR_EQUAL_TO,
              RuleOperatorType.NOT_EQUAL_TO,
            ],
            propertyName: attribute.name,
            type: ngeoFormatAttributeType.NUMBER,
          });
        } else {
          rule = new ngeoRuleRule({
            name: name,
            operator: RuleOperatorType.BETWEEN,
            propertyName: attribute.name,
            type: ngeoFormatAttributeType.NUMBER,
          });
        }
        break;
      case ngeoFormatAttributeType.SELECT:
        rule = new ngeoRuleSelect({
          choices: attribute.choices,
          name: name,
          propertyName: attribute.name,
        });
        break;
      default:
        if (isCustom) {
          rule = new ngeoRuleText({
            text: '',
            name: name,
            operator: RuleOperatorType.LIKE,
            operators: [RuleOperatorType.LIKE, RuleOperatorType.EQUAL_TO, RuleOperatorType.NOT_EQUAL_TO],
            propertyName: attribute.name,
          });
        } else {
          rule = new ngeoRuleText({
            text: '',
            name: name,
            operator: RuleOperatorType.LIKE,
            propertyName: attribute.name,
          });
        }
        break;
    }

    return rule;
  }

  /**
   * @param {Array<import('ngeo/rule/Rule.js').RuleOptions|import('ngeo/rule/Select.js').SelectOptions>} optionsList
   *    List of options
   * @return {Array<import("ngeo/rule/Rule.js").default>} Rules.
   */
  createRules(optionsList) {
    const rules = [];
    for (const options of optionsList) {
      rules.push(this.createRule(options));
    }
    return rules;
  }

  /**
   * @param {import('ngeo/rule/Rule.js').RuleOptions|import('ngeo/rule/Select.js').SelectOptions} options
   *    Options
   * @return {import("ngeo/rule/Rule.js").default} Rule.
   */
  createRule(options) {
    let rule;
    switch (options.type) {
      case ngeoFormatAttributeType.DATE:
      case ngeoFormatAttributeType.DATETIME:
        rule = new ngeoRuleDate(options);
        break;
      case ngeoFormatAttributeType.GEOMETRY:
        rule = new ngeoRuleGeometry(options);
        break;
      case ngeoFormatAttributeType.SELECT:
        const selectOptions = /** @type {import('ngeo/rule/Select.js').SelectOptions} */ (options);
        console.assert(selectOptions.choices);
        rule = new ngeoRuleSelect(selectOptions);
        break;
      default:
        rule = new ngeoRuleText(/** @type {import('ngeo/rule/Text').TextOptions} */ (options));
        break;
    }
    return rule;
  }

  /**
   * Create a new `import('ngeo/rule/Rule.js').default` object using an other given rule.
   *
   * @param {import("ngeo/rule/Rule.js").default} rule Original rule to clone.
   * @return {import("ngeo/rule/Rule.js").default} A clone rule.
   */
  cloneRule(rule) {
    /** @type {AnyOptions} */
    const options = {
      isCustom: rule.isCustom,
      name: rule.name,
      propertyName: rule.propertyName,
      type: rule.type,
    };
    const expression = rule.getExpression();
    if (expression !== null) {
      options.expression = expression;
    }
    if (rule.lowerBoundary !== null) {
      options.lowerBoundary = rule.lowerBoundary;
    }
    if (rule.operator) {
      options.operator = rule.operator;
    }
    if (rule.operators) {
      options.operators = rule.operators.slice(0);
    }
    if (rule.upperBoundary !== null) {
      options.upperBoundary = rule.upperBoundary;
    }

    let clone;
    if (rule instanceof ngeoRuleDate) {
      clone = new ngeoRuleDate(options);
    } else if (rule instanceof ngeoRuleGeometry) {
      clone = new ngeoRuleGeometry(options);
      clone.feature.setProperties(this.ngeoFeatureHelper_.getNonSpatialProperties(rule.feature));
    } else if (rule instanceof ngeoRuleSelect) {
      const opt = /** @type {import('ngeo/rule/Select.js').SelectOptions} */ (options);
      opt.choices = rule.choices.slice(0);
      clone = new ngeoRuleSelect(opt);
    } else if (rule instanceof ngeoRuleText) {
      const opt = /** @type {import('ngeo/rule/Text').TextOptions} */ (options);
      clone = new ngeoRuleText(opt);
    } else {
      clone = new ngeoRuleRule(options);
    }

    return clone;
  }

  /**
   * Extend the dynamic properties from a source rule to destination rule.
   * The source rule remains unchanged, while the destination rule changes.
   *
   * @param {import("ngeo/rule/Rule.js").default} sourceRule Source rule to collect the dynamic
   *     properties from.
   * @param {import("ngeo/rule/Rule.js").default} destRule Destination rule where the dynamic
   *     properties are set.
   */
  extendRule(sourceRule, destRule) {
    if (destRule.getExpression() !== sourceRule.getExpression()) {
      destRule.setExpression(sourceRule.getExpression());
    }

    if (destRule.lowerBoundary !== sourceRule.lowerBoundary) {
      destRule.lowerBoundary = sourceRule.lowerBoundary;
    }

    if (destRule.operator !== sourceRule.operator) {
      destRule.operator = sourceRule.operator;
    }

    if (destRule.upperBoundary !== sourceRule.upperBoundary) {
      destRule.upperBoundary = sourceRule.upperBoundary;
    }

    if (sourceRule instanceof ngeoRuleGeometry && destRule instanceof ngeoRuleGeometry) {
      this.ngeoFeatureHelper_.clearNonSpatialProperties(destRule.feature);
      destRule.feature.setProperties(this.ngeoFeatureHelper_.getNonSpatialProperties(sourceRule.feature));
    }
  }

  /**
   * @param {Array<import("ngeo/rule/Rule.js").default>} rules Rules
   * @return {AnyOptions[]} List of serialized rule options.
   */
  serializeRules(rules) {
    return rules.map((rule) => {
      const serializedRule = this.serializeRule(rule);
      return serializedRule;
    });
  }

  /**
   * Selialize a rule into options to re-create it later.
   * @param {import("ngeo/rule/Rule.js").default} rule Rule to serialize.
   * @return {AnyOptions} Serialized rule options.
   */
  serializeRule(rule) {
    /** @type {AnyOptions} */
    const obj = {
      name: rule.name,
      propertyName: rule.propertyName,
      type: rule.type,
    };

    if (rule.expression !== null) {
      obj.expression = rule.expression;
    }

    if (rule.lowerBoundary !== null) {
      obj.lowerBoundary = rule.lowerBoundary;
    }

    if (rule.operator !== null) {
      obj.operator = rule.operator;
    }

    if (rule.operators !== null) {
      obj.operators = rule.operators.slice(0);
    }

    if (rule.upperBoundary !== null) {
      obj.upperBoundary = rule.upperBoundary;
    }

    if (rule instanceof ngeoRuleGeometry) {
      /**
       * @type {import('ngeo/rule/Geometry.js').GeometryOptions}
       */
      const opt = obj;
      opt.featureProperties = this.ngeoFeatureHelper_.getNonSpatialProperties(rule.feature);
    }

    if (rule instanceof ngeoRuleSelect) {
      const opt = /** @type {import('ngeo/rule/Select.js').SelectOptions} */ (obj);
      opt.choices = rule.choices;
    }

    return obj;
  }

  /**
   * Create a `ol.format.filter.Filter` object for a given data source.
   * See the `CreateFilterOptions` to learn more.
   *
   * @param {CreateFilterOptions} options Options.
   * @return {?import("ol/format/filter/Filter.js").default} Filter.
   */
  createFilter(options) {
    const dataSource = options.dataSource;
    let mainFilter = null;

    if (options.filter) {
      mainFilter = options.filter;
    } else {
      const rules = options.filterRules || dataSource.filterRules;
      const conditions = [];

      if (rules && rules.length) {
        for (const rule of rules) {
          const filter = this.createFilterFromRule_(rule, dataSource, options.srsName);
          if (filter) {
            conditions.push(filter);
          }
        }
      }

      const condition = dataSource.filterCondition;
      if (conditions.length === 1) {
        mainFilter = conditions[0];
      } else if (conditions.length >= 2) {
        if (condition === ngeoFilterCondition.AND) {
          mainFilter = olFormatFilter.and.apply(null, conditions);
        } else if (condition === ngeoFilterCondition.OR || condition === ngeoFilterCondition.NOT) {
          mainFilter = olFormatFilter.or.apply(null, conditions);
        }
      }
      if (mainFilter && condition === ngeoFilterCondition.NOT) {
        mainFilter = olFormatFilter.not(mainFilter);
      }
    }

    if (options.incTime) {
      const timeFilter = this.createTimeFilterFromDataSource_(dataSource);
      mainFilter = this.joinFilters(mainFilter, timeFilter);
    }

    if (options.incDimensions) {
      const dimensionsFilter = this.createDimensionsFilterFromDataSource_(dataSource);
      mainFilter = this.joinFilters(mainFilter, dimensionsFilter);
    }

    return mainFilter;
  }

  /**
   * @param {CreateFilterOptions} options Options.
   * @return {?string} Filter string.
   */
  createFilterString(options) {
    let filterString = null;
    const defaultWFSVersion = '1.1.0';
    const filter = this.createFilter(options);
    if (filter) {
      const filterNode = writeFilter(filter, defaultWFSVersion);
      const xmlSerializer = new XMLSerializer();
      filterString = xmlSerializer.serializeToString(filterNode);
    }
    return filterString;
  }

  /**
   * Join 2 filters together in an "And" filter, if both are set.
   *
   * If only one is set, then no need to create an "And"
   * filter. Simply return the one that is set.
   *
   * If none are set, return null.
   *
   * @param {?import("ol/format/filter/Filter.js").default} filterA
   *     First filter.
   * @param {?import("ol/format/filter/Filter.js").default} filterB
   *     Second filter.
   * @return {?import("ol/format/filter/Filter.js").default} Filters
   *     joined together.
   */
  joinFilters(filterA, filterB) {
    let filter = null;
    if (filterA && filterB) {
      filter = olFormatFilter.and.apply(null, [filterA, filterB]);
    } else if (filterA) {
      filter = filterA;
    } else if (filterB) {
      filter = filterB;
    }
    return filter;
  }

  /**
   * @param {import("ngeo/rule/Rule.js").default} rule Rule.
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Data source.
   * @param {string=} opt_srsName SRS name. No srsName attribute will be
   *     set on geometries when this is not provided.
   * @return {?import("ol/format/filter/Filter.js").default} filter Filter;
   * @private
   */
  createFilterFromRule_(rule, dataSource, opt_srsName) {
    let filter = null;

    const value = rule.value;
    if (!value) {
      return null;
    }

    const expression = /** @type {import("ngeo/rule/Rule.js").RuleOptions} */ (value).expression;
    const lowerBoundary = /** @type {import("ngeo/rule/Rule.js").RuleOptions} */ (value).lowerBoundary;
    const operator = value.operator;
    const propertyName = value.propertyName;
    const upperBoundary = /** @type {import("ngeo/rule/Rule.js").RuleOptions} */ (value).upperBoundary;

    const rot = RuleOperatorType;
    const rsot = RuleSpatialOperatorType;
    const rtot = RuleTemporalOperatorType;

    const spatialTypes = [rsot.CONTAINS, rsot.INTERSECTS, rsot.WITHIN];

    const numericTypes = [
      rot.GREATER_THAN,
      rot.GREATER_THAN_OR_EQUAL_TO,
      rot.LESSER_THAN,
      rot.LESSER_THAN_OR_EQUAL_TO,
    ];

    if (rule instanceof ngeoRuleDate) {
      let beginValue;
      let endValue;

      if (operator === rtot.DURING) {
        beginValue = moment(lowerBoundary).format('YYYY-MM-DD');
        endValue = moment(upperBoundary).format('YYYY-MM-DD');
      } else if (operator === rtot.EQUALS) {
        beginValue = moment(expression).format('YYYY-MM-DD');
        endValue = beginValue;
      } else if (operator === rtot.BEGINS) {
        beginValue = moment(expression).format('YYYY-MM-DD');
        // NOTE: end value is CURRENT + 30 years
        endValue = moment(expression).add(30, 'years').format('YYYY-MM-DD');
      } else if (operator === rtot.ENDS) {
        // NOTE: begin value is hardcoded to 1970-01-01
        beginValue = '1970-01-01';
        endValue = moment(expression).format('YYYY-MM-DD');
      }
      if (beginValue && endValue) {
        if (dataSource.ogcServerType == 'qgisserver') {
          filter = ngeoFormatFilter.dateBetween(propertyName, beginValue, endValue);
        } else {
          filter = olFormatFilter.during(propertyName, beginValue, endValue);
        }
      }
    } else if (rule instanceof ngeoRuleSelect) {
      const selectedChoices = rule.selectedChoices;
      if (selectedChoices.length === 1) {
        filter = olFormatFilter.equalTo(propertyName, selectedChoices[0]);
      } else if (selectedChoices.length >= 2) {
        const conditions = [];
        for (const selectedChoice of selectedChoices) {
          conditions.push(olFormatFilter.equalTo(propertyName, selectedChoice));
        }
        filter = olFormatFilter.or.apply(null, conditions);
      }
    } else if (spatialTypes.includes(operator)) {
      const featureNames = dataSource.getFiltrableWFSLayerName();
      const geometryName = dataSource.geometryName(featureNames ? featureNames[0] : null);
      if (rule instanceof ngeoRuleGeometry) {
        const geometry = rule.geometry;
        if (!geometry) {
          throw new Error('Missing geometry');
        }
        if (geometryName === null) {
          throw new Error('Missing geometryName');
        }
        if (operator === rsot.CONTAINS) {
          filter = olFormatFilter.contains(geometryName, geometry, opt_srsName);
        } else if (operator === rsot.INTERSECTS) {
          filter = olFormatFilter.intersects(geometryName, geometry, opt_srsName);
        } else if (operator === rsot.WITHIN) {
          filter = olFormatFilter.within(geometryName, geometry, opt_srsName);
        }
      }
    } else if (numericTypes.includes(operator)) {
      if (typeof expression !== 'number') {
        throw new Error('Wrong expression type');
      }
      if (operator === rot.GREATER_THAN) {
        filter = olFormatFilter.greaterThan(propertyName, expression);
      } else if (operator === rot.GREATER_THAN_OR_EQUAL_TO) {
        filter = olFormatFilter.greaterThanOrEqualTo(propertyName, expression);
      } else if (operator === rot.LESSER_THAN) {
        filter = olFormatFilter.lessThan(propertyName, expression);
      } else if (operator === rot.LESSER_THAN_OR_EQUAL_TO) {
        filter = olFormatFilter.lessThanOrEqualTo(propertyName, expression);
      }
    } else if (operator === rot.BETWEEN) {
      filter = olFormatFilter.between(propertyName, lowerBoundary, upperBoundary);
    } else if (operator === rot.EQUAL_TO) {
      filter = olFormatFilter.equalTo(propertyName, expression);
    } else if (operator === rot.LIKE) {
      const stringExpression = String(expression)
        .replace(/!/g, '!!')
        .replace(/\./g, '!.')
        .replace(/\*/g, '!*');
      filter = olFormatFilter.like(
        propertyName,
        `*${stringExpression}*`,
        '*' /* wildCard */,
        '.' /* singleChar */,
        '!' /* escapeChar */,
        false /* matchCase */
      );
    } else if (operator === rot.NOT_EQUAL_TO) {
      filter = olFormatFilter.notEqualTo(propertyName, expression);
    }

    return filter;
  }

  /**
   * Create and return an OpenLayers filter object using the available
   * dimensions filters configuration within the data source.
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Data source from which to create the
   *     filter.
   * @return {?import("ol/format/filter/Filter.js").default} Filter
   * @private
   */
  createDimensionsFilterFromDataSource_(dataSource) {
    const config = dataSource.dimensionsFiltersConfig || {};
    const dimensions = dataSource.dimensions;

    const conditions = [];
    for (const key in config) {
      let value = config[key].value;
      if (value === null) {
        const dimensionValue = dimensions[key];
        if (dimensionValue !== undefined && dimensionValue !== null) {
          value = dimensionValue;
        }
      }
      if (value !== null) {
        conditions.push(olFormatFilter.equalTo(config[key].field, value, true));
      }
    }
    if (conditions.length === 1) {
      return conditions[0];
    } else if (conditions.length >= 2) {
      return olFormatFilter.and.apply(null, conditions);
    }
    return null;
  }

  /**
   * Create and return an OpenLayers filter object using the available
   * time properties within the data source.
   * @param {import("ngeo/datasource/OGC.js").default} dataSource Data source from which to
   *     create the filter.
   * @return {?import("ol/format/filter/Filter.js").default} Filter
   * @private
   */
  createTimeFilterFromDataSource_(dataSource) {
    let filter = null;
    const range = dataSource.timeRangeValue;
    const timeProperty = dataSource.timeProperty;
    const name = dataSource.timeAttributeName;

    if (range && timeProperty && name) {
      if (range.end !== undefined) {
        // Case 1: the range has both 'start' and 'end' values.  Use them to
        //         create a During filter.

        const values = this.ngeoWMSTime_.formatWMSTimeParam(timeProperty, range).split('/');

        filter = olFormatFilter.during(name, values[0], values[1]);
      } else {
        // Case 2: we only have a 'start' value. We need to calculate the 'end'
        //         using the resolution of the time property.

        const resolution = timeProperty.resolution || 'seconds';
        const value = this.ngeoWMSTime_.formatWMSTimeParam(timeProperty, range);
        let momentEnd;

        switch (resolution) {
          case 'year':
            momentEnd = moment(value).add(1, 'years').subtract(1, 'seconds');
            break;
          case 'month':
            momentEnd = moment(value).add(1, 'months').subtract(1, 'seconds');
            break;
          case 'day':
            momentEnd = moment(value).add(1, 'days').subtract(1, 'seconds');
            break;
          default:
          //case "second":
          // This would require a TContains filter, which neither OpenLayers
          // and MapServer support. Skip...
        }

        if (momentEnd) {
          const startValue = moment(value).utc().format('YYYY-MM-DD HH:mm:ss');
          const endValue = momentEnd.utc().format('YYYY-MM-DD HH:mm:ss');
          filter = olFormatFilter.during(name, startValue, endValue);
        }
      }
    }

    return filter;
  }
}

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('ngeoRuleHelper', [ngeoMiscFeatureHelper.name, ngeoMiscWMSTime.name]);
myModule.service('ngeoRuleHelper', RuleHelper);

export default myModule;
