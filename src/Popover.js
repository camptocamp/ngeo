// The MIT License (MIT)
//
// Copyright (c) 2016-2020 Camptocamp SA
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

import olOverlay from 'ol/Overlay.js';

/**
 * An openlayers overlay that uses bootstrap popover to produce a popup for maps.
 *
 * @hidden
 */
export default class extends olOverlay {
  /**
   * @param {import('ol/Overlay.js').Options=} options Overlay options.
   */
  constructor(options = {}) {
    const originalEl = options.element ? options.element : document.createElement('div');
    options.element = document.createElement('div');

    super(options);

    const closeEl = document.createElement('div');
    closeEl.className = 'close';
    closeEl.innerHTML = '&times;';
    closeEl.addEventListener('click', this.close.bind(this));

    this.contentEl_ = document.createElement('div');
    this.contentEl_.append(closeEl, originalEl);
  }

  close() {
    const map = this.getMap();
    if (map) {
      map.removeOverlay(this);
    }
  }

  /**
   * @param {import("ol/PluggableMap.js").default|undefined} map The map that the
   * overlay is part of.
   */
  setMap(map) {
    const element = this.getElement();
    if (!element) {
      throw new Error('Missing element');
    }

    const currentMap = this.getMap();
    if (currentMap) {
      $(element).popover('dispose');
    }

    super.setMap(map);

    if (map) {
      const contentEl = this.contentEl_;
      // wait for the overlay to be rendered in the map before popping over
      window.setTimeout(() => {
        $(element).popover({
          container: element.parentElement,
          placement: 'top',
          content: contentEl,
          html: true,
        });
        $(element).popover('show');
      }, 0);
    }
  }
}
