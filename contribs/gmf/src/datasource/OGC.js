import ngeoDatasourceOGC from 'ngeo/datasource/OGC.js';


/**
 * The options required to create a `gmf.datasource.OGC`.
 * @typedef {Object} OGCOptions
 * @extends import('ngeo/datasource/OGC.js').OGCOptions
 * @property gmfLayer {gmfThemes.GmfLayer} A reference to the GMF layer node that was used to create the
 * data source. It may contains additional information, such as metadata, about the data source.
 */


export default class extends ngeoDatasourceOGC {

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

}
