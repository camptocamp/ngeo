goog.provide('ngeo.rule.Select');

goog.require('ngeo.rule.Rule');


ngeo.rule.Select = class extends ngeo.rule.Rule {

  /**
   * A select rule, which allows the selection of multiple values among a list
   * of choices.
   *
   * @struct
   * @param {!ngeox.rule.SelectOptions} options Options.
   */
  constructor(options) {

    options.operator = ngeo.rule.Rule.OperatorType.EQUAL_TO;
    options.type = ngeo.AttributeType.SELECT;

    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {Array.<string>}
     * @private
     */
    this.choices_ = options.choices;

  }

  // === Static property getters/setters ===

  /**
   * @return {Array.<string>} Choices
   * @export
   */
  get choices() {
    return this.choices_;
  }

};
