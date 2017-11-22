goog.provide('ngeo.rule.Geometry');

goog.require('ngeo.rule.Rule');
goog.require('ol.events');
goog.require('ol.Feature');
goog.require('ol.format.GeoJSON');


ngeo.rule.Geometry = class extends ngeo.rule.Rule {

  /**
   * A rule bound to the geometry of a `ol.Feature` object. Changes made
   * to the geometry are applied to the `expression` property of the rule.
   *
   * @struct
   * @param {!ngeox.rule.GeometryOptions} options Options.
   */
  constructor(options) {

    options.type = ngeo.AttributeType.GEOMETRY;

    super(options);

    // === STATIC properties ===

    const properties = options.featureProperties || {};

    /**
     * @type {!ol.Feature}
     * @private
     */
    this.feature_ = new ol.Feature(properties);

    /**
     * @type {!ol.format.GeoJSON}
     * @private
     */
    this.format_ = new ol.format.GeoJSON();

    /**
     * @type {boolean}
     * @private
     */
    this.updatingExpression_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.updatingGeometry_ = false;

    /**
     * @type {?ol.EventsKey}
     * @private
     */
    this.geometryChangeListenerKey_ = null;

    this.listenerKeys.push(
      ol.events.listen(
        this.feature_,
        ol.Object.getChangeEventType(this.feature.getGeometryName()),
        this.handleFeatureGeometryChange_,
        this
      )
    );

    this.setGeometryFromExpression_();

  }

  // === Static property getters/setters ===

  /**
   * @return {!ol.Feature} Feature.
   * @export
   */
  get feature() {
    return this.feature_;
  }

  /**
   * @inheritDoc
   */
  setExpression(expression) {
    this.updatingExpression_ = true;
    super.setExpression(expression);

    if (!this.updatingGeometry_) {
      this.setGeometryFromExpression_();
    }

    this.registerGeometryChange_();

    this.updatingExpression_ = false;
  }

  // === Calculated property getters/setters ===

  /**
   * @return {?ol.geom.Geometry} Geometry
   * @export
   */
  get geometry() {
    return this.feature_.getGeometry() || null;
  }

  /**
   * @param {?ol.geom.Geometry} geometry Geometry
   * @export
   */
  set geometry(geometry) {
    this.feature_.setGeometry(geometry);
  }

  // === Other methods ===

  /**
   * Called when the geometry property in the feature changes. Update the
   * expression accordingly.
   * @private
   */
  handleFeatureGeometryChange_() {
    if (this.updatingExpression_) {
      return;
    }

    this.updatingGeometry_ = true;

    const geometry = this.feature_.getGeometry();
    if (geometry) {
      this.expression = this.format_.writeGeometry(geometry);
    } else {
      this.expression = null;
    }

    this.registerGeometryChange_();

    this.updatingGeometry_ = false;
  }

  /**
   * Called when the geometry of the features changes. Update the expression
   * accordingly.
   * @param {ol.Object.Event} evt Event
   * @private
   */
  handleGeometryChange_(evt) {
    const geometry = goog.asserts.assertInstanceof(
      evt.target, ol.geom.Geometry
    );
    this.updatingGeometry_ = true;
    this.expression = this.format_.writeGeometry(geometry);
    this.updatingGeometry_ = false;
  }

  /**
   * Set geometry property using the expression property.
   * @private
   */
  setGeometryFromExpression_() {
    let geometry = null;
    if (this.expression) {
      // An expression can only have a string value with a geometry rule.
      const expression = goog.asserts.assertString(this.expression);
      geometry = this.format_.readGeometry(expression);
    }
    this.geometry = geometry;
  }

  /**
   * Unlisten the feature geometry change event, then listen to it if the
   * feature has a geometry.
   * @private
   */
  registerGeometryChange_() {

    // (1) Unlisten
    if (this.geometryChangeListenerKey_ !== null) {
      ol.Observable.unByKey(this.geometryChangeListenerKey_);
      this.geometryChangeListenerKey_ = null;
    }

    // (2) Listen, if geom
    const geometry = this.feature_.getGeometry();
    if (geometry) {
      this.geometryChangeListenerKey_ = ol.events.listen(
        geometry,
        'change',
        this.handleGeometryChange_,
        this
      );
    }
  }

};
