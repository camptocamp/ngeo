/**
 * @module gmf.datasource.OGC
 */
import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';

const exports = class extends ngeoDatasourceOGC {

  /**
   * A `gmf.datasource.OGC` extends a `ngeo.datasource.OGC` and
   * adds some properties that are proper to GMF only.
   *
   * @struct
   * @param {gmfx.datasource.OGCOptions} options Options.
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


export default exports;
