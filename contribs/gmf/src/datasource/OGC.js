import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';


/**
 * The options required to create a `gmf.datasource.OGC`.
 * @typedef {Object} OGCOptions
 * @property {import('gmf/themes.js').GmfLayer} gmfLayer A reference to the GMF layer node that was used to create the
 * data source. It may contains additional information, such as metadata, about the data source.
 */


class gmfDatasourceOGC extends ngeoDatasourceOGC {

  /**
   * A `gmf.datasource.OGC` extends a `ngeo.datasource.OGC` and
   * adds some properties that are proper to GMF only.
   *
   * @param {OGCOptions} options Options.
   */
  constructor(options) {

    super(options);

    // === STATIC properties (i.e. that never change) ===

    /**
     * @type {import('gmf/themes.js').GmfLayer}
     * @private
     */
    this.gmfLayer_ = options.gmfLayer;

  }

  // === Static property getters/setters ===

  /**
   * @return {import('gmf/themes.js').GmfLayer} GMF layer
   * @export
   */
  get gmfLayer() {
    return this.gmfLayer_;
  }

}

export default gmfDatasourceOGC;
