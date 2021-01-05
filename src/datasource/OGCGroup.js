// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';

/**
 * The options required to create a `OGCGroup`.
 *
 * extends GroupOptions
 * @typedef {Object} OGCGroupOptions
 * @property {string} url The OGC service url. Used as a unique identifier for the group object itself.
 * @property {Array<import('ngeo/datasource/DataSource.js').default>} dataSources (GroupOptions)
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
