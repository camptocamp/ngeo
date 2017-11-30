goog.provide('ngeo.RuleHelper');

goog.require('ngeo');
goog.require('ngeo.FeatureHelper');
goog.require('ngeo.WMSTime');
goog.require('ngeo.rule.Date');
goog.require('ngeo.rule.Geometry');
goog.require('ngeo.rule.Rule');
goog.require('ngeo.rule.Select');
goog.require('ngeo.rule.Text');
goog.require('ol.format.WFS');
goog.require('ol.format.filter');


ngeo.RuleHelper = class {

  /**
   * A service that provides utility methods to create `ngeo.rule.Rule`
   * objects.
   *
   * @param {!angularGettext.Catalog} gettextCatalog Gettext service.
   * @param {!ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
   * @param {!ngeo.WMSTime} ngeoWMSTime wms time service.
   * @struct
   * @ngdoc service
   * @ngname ngeoRuleHelper
   * @ngInject
   */
  constructor(gettextCatalog, ngeoFeatureHelper, ngeoWMSTime) {

    /**
     * @type {!angularGettext.Catalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {!ngeo.FeatureHelper}
     * @private
     */
    this.ngeoFeatureHelper_ = ngeoFeatureHelper;

    /**
     * @type {!ngeo.WMSTime}
     * @private
     */
    this.ngeoWMSTime_ = ngeoWMSTime;
  }

  /**
   * @param {!Array.<!ngeox.Attribute>} attributes Attributes.
   * @param {boolean=} opt_isCustom Whether the created rules should be marked
   *     as custom or not. Defaults to `false`.
   * @return {Array.<!ngeo.rule.Rule>} Rules.
   * @export
   */
  createRulesFromAttributes(attributes, opt_isCustom) {
    const rules = [];
    for (const attribute of attributes) {
      rules.push(this.createRuleFromAttribute(attribute, opt_isCustom));
    }
    return rules;
  }

  /**
   * @param {!ngeox.Attribute} attribute Attribute.
   * @param {boolean=} opt_isCustom Whether the created rule should be marked
   *     as custom or not. Defaults to `false`.
   * @return {!ngeo.rule.Rule} Rule.
   * @export
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
      case ngeo.AttributeType.DATE:
      case ngeo.AttributeType.DATETIME:
        if (isCustom) {
          rule = new ngeo.rule.Date({
            name,
            operator: ngeo.rule.Rule.TemporalOperatorType.EQUALS,
            operators: [
              ngeo.rule.Rule.TemporalOperatorType.EQUALS,
              ngeo.rule.Rule.TemporalOperatorType.BEGINS,
              ngeo.rule.Rule.TemporalOperatorType.ENDS
            ],
            propertyName: attribute.name,
            type: attribute.type
          });
        } else {
          rule = new ngeo.rule.Date({
            name,
            operator: ngeo.rule.Rule.TemporalOperatorType.DURING,
            propertyName: attribute.name,
            type: attribute.type
          });
        }
        break;
      case ngeo.AttributeType.GEOMETRY:
        rule = new ngeo.rule.Geometry({
          name,
          operator: ngeo.rule.Rule.SpatialOperatorType.WITHIN,
          operators: [
            ngeo.rule.Rule.SpatialOperatorType.CONTAINS,
            ngeo.rule.Rule.SpatialOperatorType.INTERSECTS,
            ngeo.rule.Rule.SpatialOperatorType.WITHIN
          ],
          propertyName: attribute.name,
          type: attribute.type
        });
        break;
      case ngeo.AttributeType.NUMBER:
        if (isCustom) {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.EQUAL_TO,
            operators: [
              ngeo.rule.Rule.OperatorType.EQUAL_TO,
              ngeo.rule.Rule.OperatorType.GREATER_THAN,
              ngeo.rule.Rule.OperatorType.GREATER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.LESSER_THAN,
              ngeo.rule.Rule.OperatorType.LESSER_THAN_OR_EQUAL_TO,
              ngeo.rule.Rule.OperatorType.NOT_EQUAL_TO
            ],
            propertyName: attribute.name,
            type: ngeo.AttributeType.NUMBER
          });
        } else {
          rule = new ngeo.rule.Rule({
            name,
            operator: ngeo.rule.Rule.OperatorType.BETWEEN,
            propertyName: attribute.name,
            type: ngeo.AttributeType.NUMBER
          });
        }
        break;
      case ngeo.AttributeType.SELECT:
        rule = new ngeo.rule.Select({
          choices: goog.asserts.assert(attribute.choices),
          name,
          propertyName: attribute.name
        });
        break;
      default:
        if (isCustom) {
          rule = new ngeo.rule.Text({
            name,
            operator: ngeo.rule.Rule.OperatorType.LIKE,
            operators: [
              ngeo.rule.Rule.OperatorType.LIKE,
              ngeo.rule.Rule.OperatorType.EQUAL_TO,
              ngeo.rule.Rule.OperatorType.NOT_EQUAL_TO
            ],
            propertyName: attribute.name
          });
        } else {
          rule = new ngeo.rule.Text({
            name,
            operator: ngeo.rule.Rule.OperatorType.LIKE,
            propertyName: attribute.name
          });
        }
        break;
    }

    return rule;
  }

  /**
   * @param {!Array.<!ngeox.rule.RuleOptions|!ngeox.rule.SelectOptions>} optionsList List of options
   * @return {Array.<!ngeo.rule.Rule>} Rules.
   * @export
   */
  createRules(optionsList) {
    const rules = [];
    for (const options of optionsList) {
      rules.push(this.createRule(options));
    }
    return rules;
  }

  /**
   * @param {!ngeox.rule.RuleOptions|!ngeox.rule.SelectOptions} options Options
   * @return {!ngeo.rule.Rule} Rule.
   * @export
   */
  createRule(options) {
    let rule;
    switch (options.type) {
      case ngeo.AttributeType.DATE:
      case ngeo.AttributeType.DATETIME:
        rule = new ngeo.rule.Date(options);
        break;
      case ngeo.AttributeType.GEOMETRY:
        rule = new ngeo.rule.Geometry(options);
        break;
      case ngeo.AttributeType.SELECT:
        const selectOptions = /** @type {!ngeox.rule.SelectOptions} */ (
          options);
        goog.asserts.assert(selectOptions.choices);
        rule = new ngeo.rule.Select(selectOptions);
        break;
      default:
        rule = new ngeo.rule.Text(options);
        break;
    }
    return rule;
  }

  /**
   * Create a new `ngeo.rule.Rule` object using an other given rule.
   *
   * @param {!ngeo.rule.Rule} rule Original rule to clone.
   * @return {!ngeo.rule.Rule} A clone rule.
   * @export
   */
  cloneRule(rule) {

    let clone;

    let expression = rule.getExpression();
    if (expression === null) {
      expression = undefined;
    }
    const isCustom = rule.isCustom;
    const lowerBoundary = rule.lowerBoundary !== null ? rule.lowerBoundary :
      undefined;
    const name = rule.name;
    const operator = rule.operator !== null ? rule.operator : undefined;
    const operators = rule.operators ? rule.operators.slice(0) : undefined;
    const propertyName = rule.propertyName;
    const type = rule.type !== null ? rule.type : undefined;
    const upperBoundary = rule.upperBoundary !== null ? rule.upperBoundary :
      undefined;

    const options = {
      expression,
      isCustom,
      lowerBoundary,
      name,
      operator,
      operators,
      propertyName,
      type,
      upperBoundary
    };

    if (rule instanceof ngeo.rule.Date) {
      clone = new ngeo.rule.Date(options);
    } else if (rule instanceof ngeo.rule.Geometry) {
      clone = new ngeo.rule.Geometry(options);
      clone.feature.setProperties(
        this.ngeoFeatureHelper_.getNonSpatialProperties(rule.feature)
      );
    } else if (rule instanceof ngeo.rule.Select) {
      options.choices = rule.choices.slice(0);
      clone = new ngeo.rule.Select(options);
    } else if (rule instanceof ngeo.rule.Text) {
      clone = new ngeo.rule.Text(options);
    } else {
      clone = new ngeo.rule.Rule(options);
    }

    return clone;
  }

  /**
   * Extend the dynamic properties from a source rule to destination rule.
   * The source rule remains unchanged, while the destination rule changes.
   *
   * @param {!ngeo.rule.Rule} sourceRule Source rule to collect the dynamic
   *     properties from.
   * @param {!ngeo.rule.Rule} destRule Destination rule where the dynamic
   *     properties are set.
   * @export
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

    if (sourceRule instanceof ngeo.rule.Geometry &&
       destRule instanceof ngeo.rule.Geometry
    ) {
      this.ngeoFeatureHelper_.clearNonSpatialProperties(destRule.feature);
      destRule.feature.setProperties(
        this.ngeoFeatureHelper_.getNonSpatialProperties(sourceRule.feature)
      );
    }
  }

  /**
   * @param {!Array.<!ngeo.rule.Rule>} rules Rules
   * @return {!Array.<!ngeox.rule.AnyOptions>} List of serialized rule options.
   * @export
   */
  serializeRules(rules) {
    return rules.map((rule) => {
      const serializedRule = this.serializeRule(rule);
      return serializedRule;
    });
  }

  /**
   * Selialize a rule into options to re-create it later.
   * @param {!ngeo.rule.Rule} rule Rule to serialize.
   * @return {!ngeox.rule.AnyOptions} Serialized rule options.
   * @export
   */
  serializeRule(rule) {
    const obj = {
      name: rule.name,
      propertyName: rule.propertyName,
      type: rule.type
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

    if (rule instanceof ngeo.rule.Geometry) {
      obj.featureProperties = this.ngeoFeatureHelper_.getNonSpatialProperties(
        rule.feature);
    }

    if (rule instanceof ngeo.rule.Select) {
      obj.choices = rule.choices;
    }

    return obj;
  }

  /**
   * Create a `ol.format.filter.Filter` object for a given data source.
   * See the `ngeox.CreateFilterOptions` to learn more.
   *
   * @param {ngeox.CreateFilterOptions} options Options.
   * @return {?ol.format.filter.Filter} Filter.
   * @export
   */
  createFilter(options) {

    const dataSource = /** @type {ngeo.DataSource} */ (options.dataSource);
    let mainFilter = null;

    if (options.filter) {
      mainFilter = options.filter;
    } else {
      const rules = options.filterRules || dataSource.filterRules;
      const conditions = [];

      if (rules && rules.length) {
        for (const rule of rules) {
          const filter = this.createFilterFromRule_(
            rule,
            dataSource,
            options.srsName
          );
          if (filter) {
            conditions.push(filter);
          }
        }
      }

      const condition = dataSource.filterCondition;
      if (conditions.length === 1) {
        mainFilter = conditions[0];
      } else if (conditions.length >= 2) {
        if (condition === ngeo.FilterCondition.AND) {
          mainFilter = ol.format.filter.and.apply(null, conditions);
        } else if (condition === ngeo.FilterCondition.OR ||
                   condition === ngeo.FilterCondition.NOT
        ) {
          mainFilter = ol.format.filter.or.apply(null, conditions);
        }
      }
      if (mainFilter && condition === ngeo.FilterCondition.NOT) {
        mainFilter = ol.format.filter.not(mainFilter);
      }
    }

    if (options.incTime) {
      const timeFilter = this.createTimeFilterFromDataSource_(dataSource);
      if (timeFilter) {
        if (mainFilter) {
          mainFilter = ol.format.filter.and.apply(
            null,
            [
              mainFilter,
              timeFilter
            ]
          );
        } else {
          mainFilter = timeFilter;
        }
      }
    }

    return mainFilter;
  }

  /**
   * @param {ngeox.CreateFilterOptions} options Options.
   * @return {?string} Filter string.
   * @export
   */
  createFilterString(options) {
    let filterString = null;
    const filter = this.createFilter(options);
    if (filter) {
      const filterNode = ol.format.WFS.writeFilter(filter);
      const xmlSerializer = new XMLSerializer();
      filterString = xmlSerializer.serializeToString(filterNode);
    }
    return filterString;
  }

  /**
   * @param {ngeo.rule.Rule} rule Rule.
   * @param {ngeo.DataSource} dataSource Data source.
   * @param {string=} opt_srsName SRS name. No srsName attribute will be
   *     set on geometries when this is not provided.
   * @return {?ol.format.filter.Filter} filter Filter;
   * @private
   */
  createFilterFromRule_(rule, dataSource, opt_srsName) {

    let filter = null;

    const value = rule.value;
    if (!value) {
      return null;
    }

    const expression = value.expression;
    const lowerBoundary = value.lowerBoundary;
    const operator = value.operator;
    const propertyName = value.propertyName;
    const upperBoundary = value.upperBoundary;

    const rot =  ngeo.rule.Rule.OperatorType;
    const rsot = ngeo.rule.Rule.SpatialOperatorType;
    const rtot = ngeo.rule.Rule.TemporalOperatorType;

    const spatialTypes = [
      rsot.CONTAINS,
      rsot.INTERSECTS,
      rsot.WITHIN
    ];

    const numericTypes = [
      rot.GREATER_THAN,
      rot.GREATER_THAN_OR_EQUAL_TO,
      rot.LESSER_THAN,
      rot.LESSER_THAN_OR_EQUAL_TO
    ];

    if (rule instanceof ngeo.rule.Date) {
      let beginValue;
      let endValue;

      if (operator === rtot.DURING) {
        beginValue = moment(lowerBoundary).format('YYYY-MM-DD');
        endValue = moment(upperBoundary).format('YYYY-MM-DD');
      } else if (operator === rtot.EQUALS) {
        beginValue = moment(
          expression
        ).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        endValue = moment(
          expression
        ).add(
          1, 'days'
        ).subtract(
          1, 'seconds'
        ).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      } else if (operator === rtot.BEGINS) {
        beginValue = moment(
          expression
        ).format(
          'YYYY-MM-DD'
        );
        // NOTE: end value is CURRENT + 30 years
        endValue = moment(
          expression
        ).add(
          30, 'years'
        ).format(
          'YYYY-MM-DD'
        );
      } else if (operator === rtot.ENDS) {
        // NOTE: begin value is hardcoded to 1970-01-01
        beginValue = '1970-01-01';
        endValue = moment(
          expression
        ).format(
          'YYYY-MM-DD'
        );
      }
      if (beginValue && endValue) {
        filter = ol.format.filter.during(
          propertyName,
          beginValue,
          endValue
        );
      }
    } else if (rule instanceof ngeo.rule.Select) {
      const selectedChoices = rule.selectedChoices;
      if (selectedChoices.length === 1) {
        filter = ol.format.filter.equalTo(
          propertyName,
          selectedChoices[0]
        );
      } else if (selectedChoices.length >= 2) {
        const conditions = [];
        for (const selectedChoice of selectedChoices) {
          conditions.push(
            ol.format.filter.equalTo(
              propertyName,
              selectedChoice
            )
          );
        }
        filter = ol.format.filter.or.apply(null, conditions);
      }
    } else if (ol.array.includes(spatialTypes, operator)) {
      const geometryName = dataSource.geometryName;
      goog.asserts.assertInstanceof(rule, ngeo.rule.Geometry);
      const geometry = goog.asserts.assert(rule.geometry);
      if (operator === rsot.CONTAINS) {
        filter = ol.format.filter.contains(
          geometryName,
          geometry,
          opt_srsName
        );
      } else if (operator === rsot.INTERSECTS) {
        filter = ol.format.filter.intersects(
          geometryName,
          geometry,
          opt_srsName
        );
      } else if (operator === rsot.WITHIN) {
        filter = ol.format.filter.within(
          geometryName,
          geometry,
          opt_srsName
        );
      }
    } else if (ol.array.includes(numericTypes, operator)) {
      const numericExpression = goog.asserts.assertNumber(expression);
      if (operator === rot.GREATER_THAN) {
        filter = ol.format.filter.greaterThan(
          propertyName,
          numericExpression
        );
      } else if (operator === rot.GREATER_THAN_OR_EQUAL_TO) {
        filter = ol.format.filter.greaterThanOrEqualTo(
          propertyName,
          numericExpression
        );
      } else if (operator === rot.LESSER_THAN) {
        filter = ol.format.filter.lessThan(
          propertyName,
          numericExpression
        );
      } else if (operator === rot.LESSER_THAN_OR_EQUAL_TO) {
        filter = ol.format.filter.lessThanOrEqualTo(
          propertyName,
          numericExpression
        );
      }
    } else if (operator === rot.BETWEEN) {
      filter = ol.format.filter.between(
        propertyName,
        lowerBoundary,
        upperBoundary
      );
    } else if (operator === rot.EQUAL_TO) {
      filter = ol.format.filter.equalTo(
        propertyName,
        expression
      );
    } else if (operator === rot.LIKE) {
      const stringExpression = String(expression)
        .replace(/!/g, '!!')
        .replace(/\./g, '!.')
        .replace(/\*/g, '!*');
      filter = ol.format.filter.like(
        propertyName,
        `*${stringExpression}*`
      );
    } else if (operator === rot.NOT_EQUAL_TO) {
      filter = ol.format.filter.notEqualTo(
        propertyName,
        expression
      );
    }

    return filter;
  }

  /**
   * Create and return an OpenLayers filter object using the available
   * time properties within the data source.
   * @param {ngeo.DataSource} dataSource Data source from which to create the
   *     filter.
   * @return {?ol.format.filter.Filter} Filter
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

        const values = this.ngeoWMSTime_.formatWMSTimeParam(
          timeProperty,
          range
        ).split('/');

        filter = ol.format.filter.during(name, values[0], values[1]);
      } else {

        // Case 2: we only have a 'start' value. We need to calculate the 'end'
        //         using the resolution of the time property.

        const resolution = timeProperty.resolution || 'seconds';
        const value = this.ngeoWMSTime_.formatWMSTimeParam(
          timeProperty,
          range
        );
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
          const startValue = moment(value).format('YYYY-MM-DD HH:mm:ss');
          const endValue = momentEnd.format('YYYY-MM-DD HH:mm:ss');
          filter = ol.format.filter.during(name, startValue, endValue);
        }
      }
    }

    return filter;
  }
};


ngeo.module.service('ngeoRuleHelper', ngeo.RuleHelper);
