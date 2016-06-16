goog.provide('ngeo.Menu');
goog.provide('ngeo.MenuEvent');
goog.provide('ngeo.MenuEventType');

goog.require('ol.Overlay');
goog.require('ol.events.Event');


/**
 * @enum {string}
 */
ngeo.MenuEventType = {
  /**
   * Triggered upon clicking an action button
   * @event ngeo.MenuEvent#actionclick
   */
  ACTION_CLICK: 'actionclick'
};


/**
 * @classdesc
 * Events emitted by {@link ngeo.Menu} instances are instances of this type.
 *
 * @constructor
 * @extends {ol.events.Event}
 * @implements {ngeox.MenuEvent}
 * @param {ngeo.MenuEventType} type Type.
 * @param {string} action Action name that was clicked.
 */
ngeo.MenuEvent = function(type, action) {

  goog.base(this, type);

  /**
   * The action name that was clicked.
   * @type {string}
   * @api stable
   */
  this.action = action;

};
goog.inherits(ngeo.MenuEvent, ol.events.Event);


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
ngeo.Menu = function(menuOptions, opt_overlayOptions) {

  var options = opt_overlayOptions !== undefined ? opt_overlayOptions : {};

  options.positioning = ol.OverlayPositioning.TOP_LEFT;

  /**
   * @type {Array.<goog.events.Key>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * @type {goog.events.Key}
   * @private
   */
  this.clickOutListenerKey_ = null;

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.olListenerKeys_ = [];

  var contentEl = $('<div/>', {
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
    var headerEl = $('<div>', {
      'class': 'panel-heading'
    }).appendTo(contentEl);

    $('<span>', {
      text: menuOptions.title
    }).appendTo(headerEl);
  }

  // actionsEl
  var actionsEl = $('<div>', {
    'class': 'list-group'
  }).appendTo(contentEl);

  /**
   * @type {Array.<jQuery>}
   * @private
   */
  this.actions_ = [];

  menuOptions.actions.forEach(function(action) {
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
  }, this);

  options.element = contentEl[0];

  goog.base(this, options);

};
goog.inherits(ngeo.Menu, ol.Overlay);


/**
 * @param {ol.Map|undefined} map Map.
 * @export
 */
ngeo.Menu.prototype.setMap = function(map) {

  var keys = this.listenerKeys_;
  var olKeys = this.olListenerKeys_;

  var currentMap = this.getMap();
  if (currentMap) {
    keys.forEach(function(key) {
      goog.events.unlistenByKey(key);
    }, this);
    keys.length = 0;
    olKeys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);
    olKeys.length = 0;
  }

  goog.base(this, 'setMap', map);

  if (map) {
    this.actions_.forEach(function(action) {
      var data = action.data();
      keys.push(
        goog.events.listen(
          action[0],
          goog.events.EventType.CLICK,
          this.handleActionClick_.bind(this, data.name),
          false,
          this
        )
      );
    }, this);

    // Autoclose the menu when clicking anywhere else than the menu
    olKeys.push(
      ol.events.listen(
        map,
        ol.MapBrowserEvent.EventType.POINTERMOVE,
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
ngeo.Menu.prototype.open = function(coordinate) {
  this.setPosition(coordinate);
  if (this.autoClose_) {
    this.clickOutListenerKey_ =  goog.events.listen(
      document.documentElement,
      goog.events.EventType.MOUSEDOWN,
      this.handleClickOut_,
      false,
      this
    );
  }

};


/**
 * @export
 */
ngeo.Menu.prototype.close = function() {
  this.setPosition(undefined);

  if (this.clickOutListenerKey_ !== null) {
    goog.events.unlistenByKey(this.clickOutListenerKey_);
  }
};


/**
 * @param {string} action The action name that was clicked.
 * @param {Event} evt Event.
 * @private
 */
ngeo.Menu.prototype.handleActionClick_ = function(action, evt) {

  this.dispatchEvent(
      new ngeo.MenuEvent(ngeo.MenuEventType.ACTION_CLICK, action));

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
ngeo.Menu.prototype.handleClickOut_ = function(evt) {
  var element = this.getElement();
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
ngeo.Menu.prototype.handleMapPointerMove_ = function(evt) {
  var target = evt.originalEvent.target;
  goog.asserts.assertInstanceof(target, Element);

  var element = this.getElement();
  goog.asserts.assertInstanceof(element, Element);

  if (goog.dom.contains(element, target)) {
    evt.coordinate = [Infinity, Infinity];
    evt.pixel = [Infinity, Infinity];
  }
};
