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
          html: true
        });
        $(element).popover('show');
      }, 0);
    }
  }
}
