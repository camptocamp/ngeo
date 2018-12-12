/**
 * @module ngeo.datasource.OGCGroup
 */
import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';

export default class extends ngeoDatasourceGroup {

  /**
   * A OGCGroup data source combines multiple `ngeo.datasource.OGC` objects.
   *
   * @param {ngeox.datasource.OGCGroupOptions} options Options.
   */
  constructor(options) {

    super(options);

    /**
     * @type {string}
     * @private
     */
    this.url_ = options.url;
  }

  /**
   * @return {string} Url
   * @export
   */
  get url() {
    return this.url_;
  }
}
