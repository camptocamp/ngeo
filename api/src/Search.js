// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

import GeoJSON from 'ol/format/GeoJSON.js';
// @ts-ignore
import Autocomplete from '@trevoreyre/autocomplete-js';

/**
 * @typedef {Object} SearchOptions
 * @property {HTMLElement} container
 * @property {string} url
 * @property {import("ol/source/Vector").default<unknown>} source
 * @property {import("ol/View").default} view
 */

export default class Search {
  /**
   * @param {SearchOptions} options API options.
   */
  constructor(options) {
    this.format_ = new GeoJSON();

    this.url_ = new URL(options.url);

    this.source_ = options.source;

    this.view_ = options.view;

    const input = document.createElement('input');
    input.className = 'api-search-input';
    const ul = document.createElement('ul');
    ul.className = 'api-search-results';

    options.container.append(input, ul);

    this.autocomplete_ = new Autocomplete(options.container, {
      search: this.search_.bind(this),
      getResultValue: this.getResultValue_.bind(this),
      onSubmit: this.onSubmit_.bind(this),
    });
  }

  /**
   * @param {string} input
   * @return {Promise<import("geojson").Feature[]>}
   */
  search_(input) {
    return new Promise((resolve) => {
      if (input.length >= 1) {
        this.url_.searchParams.set('query', input);
        fetch(this.url_.href)
          .then((response) => response.json())
          .then((collection) => collection.features)
          .then((features) => resolve(features.filter(this.hasGeometry_)));
      } else {
        resolve([]);
      }
    });
  }

  /**
   * @param {import("geojson").Feature} feature
   * @return {boolean}
   */
  hasGeometry_(feature) {
    return feature.geometry !== null;
  }

  /**
   * @param {import("geojson").Feature} result
   * @return {string}
   */
  getResultValue_(result) {
    return result.properties.label;
  }

  /**
   * @param {import("geojson").Feature} result
   */
  onSubmit_(result) {
    this.source_.clear();
    const feature = /** @type {import('ol/Feature').default<import('ol/geom/Geometry').default>} */ (this.format_.readFeature(
      result
    ));
    this.source_.addFeature(feature);
    this.view_.fit(this.source_.getExtent());
  }
}
