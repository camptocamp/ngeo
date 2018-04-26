/**
 * @module ngeo.Popover
 */
import * as olBase from 'ol/index.js';
import olOverlay from 'ol/Overlay.js';

/**
 * @classdesc
 * An openlayers overlay that uses bootstrap popover to produce a popup
 * for maps.
 *
 * @constructor
 * @extends {ol.Overlay}
 * @param {olx.OverlayOptions=} opt_options Overlay options.
 */
const exports = function(opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  let originalEl;
  if (options.element) {
    originalEl = options.element;
    delete options.element;
  } else {
    originalEl = $('<div />')[0];
  }

  /**
   * @type {jQuery}
   * @private
   */
  this.closeEl_ = $('<button>', {
    'class': 'close',
    'html': '&times;'
  });

  /**
   * @type {jQuery}
   * @private
   */
  this.contentEl_ = $('<div/>')
    .append(this.closeEl_)
    .append(originalEl);

  options.element = $('<div />')[0];

  olOverlay.call(this, options);

};

olBase.inherits(exports, olOverlay);


/**
 * @override
 */
exports.prototype.setMap = function(map) {

  const element = this.getElement();

  const currentMap = this.getMap();
  if (currentMap) {
    $(element).popover('destroy');
  }

  olOverlay.prototype.setMap.call(this, map);

  if (map) {
    const contentEl = this.contentEl_;
    // wait for the overlay to be rendered in the map before poping over
    window.setTimeout(() => {
      $(element)
        .popover({
          'content': contentEl,
          'html': true,
          'placement': 'top',
          'template': [
            '<div class="popover ngeo-popover" role="tooltip">',
            '  <div class="arrow"></div>',
            '  <h3 class="popover-title"></h3>',
            '  <div class="popover-content"></div>',
            '</div>'
          ].join('')
        })
        .popover('show');
    }, 0);

    this.closeEl_.one('click', () => {
      const map = this.getMap();
      if (map) {
        map.removeOverlay(this);
      }
    });
  }
};


export default exports;
