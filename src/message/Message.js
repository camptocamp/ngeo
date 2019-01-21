/**
 * A message to display by the ngeo notification service.
 *
 * delay: The delay in milliseconds the message is shown. Defaults to `7000`.
 *
 * popup: Whether the message should be displayed inside a popup window or not.
 * Defaults to `false`.
 *
 * msg: The message text to display.
 *
 * target: The target element (or selector to get the element) in which to display the
 * message. If not defined, then the default target of the notification service is used.
 *
 * type: The type of message. Defaults to `info`.
 *
 * @typedef {{
 *     delay: (number|undefined),
 *     popup: (boolean|undefined),
 *     msg: (string),
 *     target: (JQLite|Element|string|undefined),
 *     type: (string|undefined)
 * }} Message
 */


/**
 * @enum {string}
 * @export
 */
const Type = {
  /**
   * @type {string}
   * @export
   */
  ERROR: 'error',
  /**
   * @type {string}
   * @export
   */
  INFORMATION: 'information',
  /**
   * @type {string}
   * @export
   */
  SUCCESS: 'success',
  /**
   * @type {string}
   * @export
   */
  WARNING: 'warning'
};


/**
 * Abstract class for services that display messages.
 *
 * @constructor
 * @abstract
 */
function Message() {}


/**
 * Show the message.
 *
 * @abstract
 * @param {Message} message Message.
 * @protected
 */
Message.prototype.showMessage = function(message) {};


/**
 * Show disclaimer message string or object or list of disclame message
 * strings or objects.
 *
 * @param {string|Array.<string>|Message|Array.<Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
Message.prototype.show = function(object) {
  const msgObjects = this.getMessageObjects(object);
  msgObjects.forEach(this.showMessage, this);
};


/**
 * Display the given error message or list of error messages.
 *
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
Message.prototype.error = function(message) {
  this.show(this.getMessageObjects(message, Type.ERROR));
};


/**
 * Display the given info message or list of info messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
Message.prototype.info = function(message) {
  this.show(this.getMessageObjects(message, Type.INFORMATION));
};


/**
 * Display the given success message or list of success messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
Message.prototype.success = function(message) {
  this.show(this.getMessageObjects(message, Type.SUCCESS));
};


/**
 * Display the given warning message or list of warning messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
Message.prototype.warn = function(message) {
  this.show(this.getMessageObjects(message, Type.WARNING));
};


/**
 * Returns an array of message object from any given message string, list of
 * message strings, message object or list message objects. The type can be
 * overridden here as well OR defined (if the message(s) is/are string(s),
 * defaults to 'information').
 * @param {string|Array.<string>|Message|Array.<Message>}
 *     object A message or list of messages as text or configuration objects.
 * @param {string=} opt_type The type of message to override the messages with.
 * @return {Array.<Message>} List of message objects.
 * @protected
 */
Message.prototype.getMessageObjects = function(object, opt_type) {
  const msgObjects = [];
  let msgObject = null;
  const defaultType = Type.INFORMATION;

  if (typeof object === 'string') {
    msgObjects.push({
      msg: object,
      type: opt_type !== undefined ? opt_type : defaultType
    });
  } else if (Array.isArray(object)) {
    object.forEach((msg) => {
      if (typeof object === 'string') {
        msgObject = {
          msg: msg,
          type: opt_type !== undefined ? opt_type : defaultType
        };
      } else {
        msgObject = msg;
        if (opt_type !== undefined) {
          msgObject.type = opt_type;
        }
      }
      msgObjects.push(msgObject);
    }, this);
  } else {
    msgObject = object;
    if (opt_type !== undefined) {
      msgObject.type = opt_type;
    }
    if (msgObject.type === undefined) {
      msgObject.type = defaultType;
    }
    msgObjects.push(msgObject);
  }

  return msgObjects;
};


export default Message;
