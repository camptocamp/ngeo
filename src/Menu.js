/**
 * @module ngeo.Menu
 */
import googAsserts from 'goog/asserts.js';
import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import * as olBase from 'ol/index.js';
import * as olEvents from 'ol/events.js';
import olOverlay from 'ol/Overlay.js';
import olOverlayPositioning from 'ol/OverlayPositioning.js';

/**
 * @classdesc
 * An OpenLayers overlay that shows a contextual menu with configurable actions
 * anchored from its top left to a specific location. An event is fired when
 * any of the action is clicked.
 *
 * @constructor
 * @extends {ol.Overlay}
 * @param {ngeox.MenuOptions=} menuOptions Menu options.
 * @param {olx.OverlayOptions=} opt_overlayOptions Overlay options.
 */
const exports = function(menuOptions, opt_overlayOptions) {

  const options = opt_overlayOptions !== undefined ? opt_overlayOptions : {};

  options.positioning = olOverlayPositioning.TOP_LEFT;

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {?ol.EventsKey}
   * @private
   */
  this.clickOutListenerKey_ = null;

  const contentEl = $('<div/>', {
    'class': 'panel panel-default'
  });

  /**
   * @type {boolean}
   * @private
   */
  this.autoClose_ = menuOptions.autoClose !== undefined ?
    menuOptions.autoClose : true;

  // titleEl
  if (menuOptions.title) {
    const headerEl = $('<div>', {
      'class': 'panel-heading'
    }).appendTo(contentEl);

    $('<span>', {
      text: menuOptions.title
    }).appendTo(headerEl);
  }

  // actionsEl
  const actionsEl = $('<div>', {
    'class': 'list-group'
  }).appendTo(contentEl);

  /**
   * @type {Array.<jQuery>}
   * @private
   */
  this.actions_ = [];

  menuOptions.actions.forEach((action) => {
    this.actions_.push(
      $('<button>', {
        'class': 'list-group-item',
        'data-name': action.name,
        'text': [
          ' ',
          (action.label) !== undefined ? action.label : action.name
        ].join('')
      })
        .appendTo(actionsEl)
        .prepend($('<span>', {
          'class': action.cls !== undefined ? action.cls : ''
        }))
    );
  });

  options.element = contentEl[0];

  olOverlay.call(this, options);

};

olBase.inherits(exports, olOverlay);


/**
 * @param {ol.PluggableMap|undefined} map Map.
 * @export
 * @override
 */
exports.prototype.setMap = function(map) {

  const currentMap = this.getMap();
  if (currentMap) {
    this.listenerKeys_.forEach(olEvents.unlistenByKey);
    this.listenerKeys_.length = 0;
  }

  olOverlay.prototype.setMap.call(this, map);

  if (map) {
    this.actions_.forEach((action) => {
      const data = action.data();
      this.listenerKeys_.push(
        olEvents.listen(
          action[0],
          'click',
          this.handleActionClick_.bind(this, data.name)
        )
      );
    });

    // Autoclose the menu when clicking anywhere else than the menu
    this.listenerKeys_.push(
      olEvents.listen(
        map,
        'pointermove',
        this.handleMapPointerMove_,
        this
      )
    );
  }

};


/**
 * Opens the menu at the desited coordinate. Also starts listening for the
 * clickout if autoClose is enabled.
 * @param {ol.Coordinate} coordinate Where to open the menu.
 * @export
 */
exports.prototype.open = function(coordinate) {
  this.setPosition(coordinate);
  if (this.autoClose_) {
    this.clickOutListenerKey_ = olEvents.listen(
      document.documentElement,
      'mousedown',
      this.handleClickOut_,
      this
    );
  }

};


/**
 * @export
 */
exports.prototype.close = function() {
  this.setPosition(undefined);

  if (this.clickOutListenerKey_ !== null) {
    olEvents.unlistenByKey(this.clickOutListenerKey_);
  }
};


/**
 * @param {string} action The action name that was clicked.
 * @param {Event} evt Event.
 * @private
 */
exports.prototype.handleActionClick_ = function(action, evt) {

  this.dispatchEvent(new ngeoCustomEvent('actionclick', {
    action: action
  }));

  if (this.autoClose_) {
    this.close();
  }

  evt.stopPropagation();
};


/**
 * Handles clicks out of the menu. If the menu is visible, close it.
 * @param {Event} evt Event.
 * @private
 */
exports.prototype.handleClickOut_ = function(evt) {
  const element = this.getElement();
  if (element && $(evt.target).closest(element).length === 0) {
    this.close();
  }
};


/**
 * When the mouse is hovering the menu, set the event coordinate and pixel
 * values to Infinity to do as if the mouse had been move out of range of the
 * map. This prevents behaviours such as vertex still appearing while mouse
 * hovering edges of features bound to an active modify control while the
 * cursor is on top of the menu.
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
exports.prototype.handleMapPointerMove_ = function(evt) {
  const target = evt.originalEvent.target;
  googAsserts.assertInstanceof(target, Element);

  const element = this.getElement();
  googAsserts.assertInstanceof(element, Element);

  if (element.contains(target)) {
    evt.coordinate = [Infinity, Infinity];
    evt.pixel = [Infinity, Infinity];
  }
};


export default exports;
