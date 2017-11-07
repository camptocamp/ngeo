goog.provide('ngeo.Popover');

goog.require('ol.Overlay');
goog.require('goog.events');


/**
 * @classdesc
 * An openlayers overlay that uses bootstrap popover to produce a popup
 * for maps.
 *
 * @constructor
 * @extends {ol.Overlay}
 * @param {olx.OverlayOptions=} opt_options Overlay options.
 */
ngeo.Popover = function(opt_options) {

  const options = opt_options !== undefined ? opt_options : {};

  /**
   * The key for close button 'click' event
   * @type {?goog.events.Key}
   * @private
   */
  this.clickKey_ = null;

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

  ol.Overlay.call(this, options);

};
ol.inherits(ngeo.Popover, ol.Overlay);


/**
 * @param {ol.PluggableMap|undefined} map Map.
 * @export
 * @override
 */
ngeo.Popover.prototype.setMap = function(map) {

  const element = this.getElement();

  const currentMap = this.getMap();
  if (currentMap) {
    if (this.clickKey_) {
      goog.events.unlistenByKey(this.clickKey_);
      this.clickKey_ = null;
    }
    $(element).popover('destroy');
  }

  ol.Overlay.prototype.setMap.call(this, map);

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

    this.clickKey_ = goog.events.listen(this.closeEl_[0],
      goog.events.EventType.CLICK, this.handleCloseElClick_, false, this);
  }
};


/**
 * @private
 */
ngeo.Popover.prototype.handleCloseElClick_ = function() {
  const map = this.getMap();
  if (map) {
    map.removeOverlay(this);
  }
};
