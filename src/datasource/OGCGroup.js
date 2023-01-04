import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';

/**
 * The options required to create a `OGCGroup`.
 *
 * extends GroupOptions
 * @typedef {Object} OGCGroupOptions
 * @property {string} url The OGC service url. Used as a unique identifier for the group object itself.
 * @property {!Array.<!import('ngeo/datasource/DataSource.js').default>} dataSources (GroupOptions)
 * @property {string} title (GroupOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoDatasourceGroup {
  /**
   * A OGCGroup data source combines multiple `ngeo.datasource.OGC` objects.
   *
   * @param {OGCGroupOptions} options Options.
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
   */
  get url() {
    return this.url_;
  }
}
