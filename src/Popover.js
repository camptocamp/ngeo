import olOverlay from 'ol/Overlay.js';

/**
 * @classdesc
 * An openlayers overlay that uses bootstrap popover to produce a popup for maps.
 *
 * @param {import('ol/Overlay.js').Options=} opt_options Overlay options.
 * @hidden
 */
export default class extends olOverlay {
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
   * @override
   */
  setMap(map) {
    const element = this.getElement();

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
