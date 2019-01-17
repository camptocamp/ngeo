/**
 * @module import("ngeo/datasource/OGCGroup.js").default
 */
import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';


/**
 * The options required to create a `OGCGroup`.
 *
 * url: The OGC service url. Used as a unique identifier for the group object itself.
 *
 * @typedef {{
 *   url: (string)
 * }} OGCGroupOptions
 * @extends GroupOptions
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
   * @export
   */
  get url() {
    return this.url_;
  }
}
