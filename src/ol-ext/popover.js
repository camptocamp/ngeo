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

  var options = opt_options !== undefined ? opt_options : {};

  /**
   * The key for close button 'click' event
   * @type {?goog.events.Key}
   * @private
   */
  this.clickKey_ = null;

  var originalEl;
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

  goog.base(this, options);

};
goog.inherits(ngeo.Popover, ol.Overlay);


/**
 * @param {ol.Map|undefined} map Map.
 * @export
 */
ngeo.Popover.prototype.setMap = function(map) {

  var element = this.getElement();

  var currentMap = this.getMap();
  if (currentMap) {
    if (this.clickKey_) {
      goog.events.unlistenByKey(this.clickKey_);
      this.clickKey_ = null;
    }
    $(element).popover('destroy');
  }

  goog.base(this, 'setMap', map);

  if (map) {
    var contentEl = this.contentEl_;
    // wait for the overlay to be rendered in the map before poping over
    window.setTimeout(function() {
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
  var map = this.getMap();
  if (map) {
    map.removeOverlay(this);
  }
};
