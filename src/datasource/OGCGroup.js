goog.provide('ngeo.datasource.OGCGroup');

goog.require('ngeo');
goog.require('ngeo.datasource.Group');


ngeo.datasource.OGCGroup = class extends ngeo.datasource.Group {

  /**
   * A OGCGroup data source combines multiple `ngeo.datasource.OGC` objects.
   *
   * @struct
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
};
