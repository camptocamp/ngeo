goog.provide('ngeo.rule.Date');

goog.require('ngeo.rule.Rule');


ngeo.rule.Date = class extends ngeo.rule.Rule {

  /**
   * A date rule.
   *
   * @struct
   * @param {!ngeox.rule.DateOptions} options Options.
   */
  constructor(options) {

    options.type = options.type || ngeo.AttributeType.DATE;

    super(options);
  }
};
