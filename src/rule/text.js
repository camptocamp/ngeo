goog.provide('ngeo.rule.Text');

goog.require('ngeo.rule.Rule');


ngeo.rule.Text = class extends ngeo.rule.Rule {

  /**
   * A text rule, which always compares the value with the LIKE operator.
   *
   * @struct
   * @param {ngeox.rule.TextOptions} options Options.
   */
  constructor(options) {

    options.operator = ngeo.rule.Rule.OperatorType.LIKE;
    options.type = ngeo.AttributeType.TEXT;

    super(options);

  }
};
