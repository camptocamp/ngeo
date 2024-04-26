// The MIT License (MIT)
//
// Copyright (c) 2016-2024 Camptocamp SA
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

import ngeoCustomEvent from 'ngeo/CustomEvent';
import {listen, unlistenByKey} from 'ol/events';
import olOverlay from 'ol/Overlay';

/**
 * The options for an action item for the contextual menu overlay.
 *
 * @typedef {Object} MenuActionOptions
 * @property {string} [cls] CSS class name(s) to use for the icon of the action item.
 * @property {string} [label] The label to display for the action item. If not defined, the name is used.
 * @property {string} name unique name for the menu action, which is used in the event fired when
 * the action is clicked.
 */

/**
 * The options for the contextual menu overlay.
 *
 * @typedef {Object} MenuOptions
 * @property {MenuActionOptions[]} actions A list of menu actions.
 * @property {boolean} [autoClose=true] Whether to automatically close the contextual menu when an action is
 * clicked or not.
 * @property {string} [title] A title to display as header of the contextual menu.
 */

/**
 * An OpenLayers overlay that shows a contextual menu with configurable actions
 * anchored from its top left to a specific location. An event is fired when
 * any of the action is clicked.
 *
 * @hidden
 */
export default class extends olOverlay {
  /**
   * @param {MenuOptions} [menuOptions] Menu options.
   * @param {import('ol/Overlay').Options} [options] Overlay options.
   */
  constructor(menuOptions, options = {}) {
    options.positioning = 'top-left';
    if (!menuOptions) {
      throw new Error('Missing menuOptions');
    }

    super(options);

    /**
     * @type {import('ol/events').EventsKey[]}
     * @private
     */
    this.listenerKeys_ = [];

    /**
     * @type {?import('ol/events').EventsKey}
     * @private
     */
    this.clickOutListenerKey_ = null;

    const contentEl = $('<div/>', {
      'class': 'panel panel-default',
    });

    /**
     * @type {boolean}
     * @private
     */
    this.autoClose_ = menuOptions.autoClose !== undefined ? menuOptions.autoClose : true;

    // titleEl
    if (menuOptions.title) {
      const headerEl = $('<div>', {
        'class': 'panel-heading',
      }).appendTo(contentEl);

      $('<span>', {
        text: menuOptions.title,
      }).appendTo(headerEl);
    }

    // actionsEl
    const actionsEl = $('<div>', {
      'class': 'list-group',
    }).appendTo(contentEl);

    /**
     * @type {JQuery[]}
     */
    this.actions_ = [];

    menuOptions.actions.forEach((action) => {
      this.actions_.push(
        $('<button>', {
          'class': 'list-group-item btn',
          'data-name': action.name,
          'text': [' ', action.label !== undefined ? action.label : action.name].join(''),
        })
          .appendTo(actionsEl)
          .prepend(
            $('<span>', {
              'class': action.cls !== undefined ? action.cls : '',
            }),
          ),
      );
    });

    this.setElement(contentEl[0]);
  }

  /**
   * @param {import('ol/Map').default|undefined} map Map.
   * @override
   */
  setMap(map) {
    const currentMap = this.getMap();
    if (currentMap) {
      this.listenerKeys_.forEach(unlistenByKey);
      this.listenerKeys_.length = 0;
    }

    olOverlay.prototype.setMap.call(this, map);

    if (map) {
      this.actions_.forEach((action) => {
        const data = action.data();
        this.listenerKeys_.push(listen(action[0], 'click', this.handleActionClick_.bind(this, data.name)));
      });

      // Autoclose the menu when clicking anywhere else than the menu
      this.listenerKeys_.push(
        listen(
          map,
          'pointermove',
          /** @type {import('ol/events').ListenerFunction} */ (this.handleMapPointerMove_),
          this,
        ),
      );
    }
  }

  /**
   * Opens the menu at the desited coordinate. Also starts listening for the
   * clickout if autoClose is enabled.
   *
   * @param {import('ol/coordinate').Coordinate} coordinate Where to open the menu.
   */
  open(coordinate) {
    this.setPosition(coordinate);
    if (!(document.documentElement instanceof EventTarget)) {
      throw new Error('Wrong document element type');
    }
    if (this.autoClose_) {
      this.clickOutListenerKey_ = listen(document.documentElement, 'mousedown', this.handleClickOut_, this);
    }
  }

  /**
   */
  close() {
    this.setPosition(undefined);

    if (this.clickOutListenerKey_ !== null) {
      unlistenByKey(this.clickOutListenerKey_);
    }
  }

  /**
   * @param {string} action The action name that was clicked.
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleActionClick_(action, evt) {
    this.dispatchEvent(
      new ngeoCustomEvent('actionclick', {
        action: action,
      }),
    );

    if (this.autoClose_) {
      this.close();
    }

    evt.stopPropagation();
  }

  /**
   * Handles clicks out of the menu. If the menu is visible, close it.
   *
   * @param {Event|import('ol/events/Event').default} evt Event.
   * @private
   */
  handleClickOut_(evt) {
    const element = this.getElement();
    if (element && $(evt.target).closest(element).length === 0) {
      this.close();
    }
  }

  /**
   * When the mouse is hovering the menu, set the event coordinate and pixel
   * values to Infinity to do as if the mouse had been move out of range of the
   * map. This prevents behaviors such as vertex still appearing while mouse
   * hovering edges of features bound to an active modify control while the
   * cursor is on top of the menu.
   *
   * @param {import('ol/MapBrowserEvent').default<Event>} myEvent Event.
   * @private
   */
  handleMapPointerMove_(myEvent) {
    const target = myEvent.originalEvent.target;
    const element = this.getElement();
    if (target instanceof Element && element instanceof Element && element.contains(target)) {
      myEvent.coordinate = [Infinity, Infinity];
      myEvent.pixel = [Infinity, Infinity];
    }
  }
}
