goog.provide('ngeo.datasource.File');

goog.require('ngeo.datasource.DataSource');
goog.require('ol.layer.Vector');
goog.require('ol.source.Vector');


ngeo.datasource.File = class extends ngeo.datasource.DataSource {

  /**
   * A data source that contains vector features that were loaded from a file.
   *
   * @struct
   * @param {ngeox.datasource.FileOptions} options Options.
   */
  constructor(options) {

    super(options);


    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {!ol.Collection.<!ol.Feature>}
     * @private
     */
    this.featuresCollection_ = options.features || new ol.Collection();

    /**
     * @type {!ol.source.Vector}
     * @private
     */
    this.source_ = new ol.source.Vector({
      features: this.featuresCollection_,
      wrapX: false
    });

    /**
     * @type {!ol.layer.Vector}
     * @private
     */
    this.layer_ = new ol.layer.Vector({
      source: this.source_
    });
  }


  // ========================================
  // === Dynamic property getters/setters ===
  // ========================================

  /**
   * @return {!Array.<!ol.Feature>} Features
   * @export
   */
  get features() {
    return this.featuresCollection_.getArray();
  }


  // =======================================
  // === Static property getters/setters ===
  // =======================================

  /**
   * @return {!ol.Collection.<!ol.Feature>} Features collection
   * @export
   */
  get featuresCollection() {
    return this.featuresCollection_;
  }

  /**
   * @return {!ol.layer.Vector} Vector layer.
   * @export
   */
  get layer() {
    return this.layer_;
  }


  // ===================================
  // === Calculated property getters ===
  // ===================================

  /**
   * @return {ol.Extent} Extent.
   * @export
   */
  get extent() {
    return this.source_.getExtent();
  }
};
