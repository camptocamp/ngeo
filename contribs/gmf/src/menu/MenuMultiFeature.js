// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

import menu from 'ngeo/Menu.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';

/**
 * An OpenLayers overlay for features extended from ngeo/Menu.js. Additionally highlightes the chosen feature on menu mouseOver
 * @hidden
 */
export default class extends menu {
  /**
   * @param {import('ngeo/Menu.js').MenuOptions} menuOptions Menu options.
   * @param {import('ol/Overlay.js').Options} [options] Overlay options.
   */
  constructor(menuOptions, options = {}) {
    super(menuOptions, options);
    this.mouseOverListeners_ = [];

    this.actions_.forEach((action) => {
      action[0].addEventListener('mouseenter', this.handleMouseEnter_.bind(this, action.data().name));
      action[0].addEventListener('mouseout', this.handleMouseOut_.bind(this, action.data().name));
      action[0].classList.add('gmf-feature-menu-item');
    });
  }

  /**
   * @param {string} actionName The name of the target action.
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleMouseEnter_(actionName, evt) {
    this.dispatchEvent(
      new ngeoCustomEvent('actionmouseenter', {
        action: actionName,
      })
    );
    evt.stopPropagation();
  }

  /**
   * @param {string} actionName The name of the target action.
   * @param {Event|import("ol/events/Event.js").default} evt Event.
   * @private
   */
  handleMouseOut_(actionName, evt) {
    this.dispatchEvent(
      new ngeoCustomEvent('actionmouseout', {
        action: actionName,
      })
    );
    evt.stopPropagation();
  }
}
