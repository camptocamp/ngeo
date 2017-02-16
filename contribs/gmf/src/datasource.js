goog.provide('gmf.DataSource');

goog.require('ngeo.DataSource');


gmf.DataSource = class extends ngeo.DataSource {

  /**
   * A `gmf.DataSource` extends a `ngeo.DataSource` and adds some properties
   * that are proper to GMF only.
   *
   * @struct
   * @extends {ngeo.DataSource}
   * @param {gmfx.DataSourceOptions} options Options.
   */
  constructor(options) {

    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {gmfThemes.GmfLayer}
     * @private
     */
    this.gmfLayer_ = options.gmfLayer;

  }

  // === Static property getters/setters ===

  /**
   * @return {gmfThemes.GmfLayer} GMF layer
   * @export
   */
  get gmfLayer() {
    return this.gmfLayer_;
  }

};
