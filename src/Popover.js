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
    super(options);

    let originalEl;
    if (options.element) {
      originalEl = options.element;
      delete options.element;
    } else {
      originalEl = $('<div />')[0];
    }

    /**
     * @type {JQuery}
     * @private
     */
    this.closeEl_ = $('<button>', {
      'class': 'close',
      'html': '&times;'
    });

    /**
     * @type {JQuery}
     * @private
     */
    this.contentEl_ = $('<div/>')
      .append(this.closeEl_)
      .append(originalEl);

    options.element = $('<div />')[0];
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

    olOverlay.prototype.setMap.call(this, map);

    if (map) {
      const contentEl = this.contentEl_;
      // wait for the overlay to be rendered in the map before popping over
      window.setTimeout(() => {
        $(element)
          .popover({
            content: contentEl.get()[0],
            html: true,
            placement: 'top',
            template: [
              '<div class="popover ngeo-popover" role="tooltip">',
              '  <div class="arrow"></div>',
              '  <h3 class="popover-header"></h3>',
              '  <div class="popover-body"></div>',
              '</div>'
            ].join('')
          }).popover('show');
      }, 0);

      this.closeEl_.one('click', () => {
        const map = this.getMap();
        if (map) {
          map.removeOverlay(this);
        }
      });
    }
  }
}
