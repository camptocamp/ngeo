goog.provide('ngeo.Message');


/**
 * @enum {string}
 * @export
 */
ngeo.MessageType = {
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
 * @struct
 * @abstract
 */
ngeo.Message = function() {};


/**
 * Show the message.
 *
 * @abstract
 * @param {ngeox.Message} message Message.
 * @protected
 */
ngeo.Message.prototype.showMessage = function(message) {};


/**
 * Show disclaimer message string or object or list of disclame message
 * strings or objects.
 *
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @export
 */
ngeo.Message.prototype.show = function(object) {
  const msgObjects = this.getMessageObjects(object);
  msgObjects.forEach(this.showMessage, this);
};


/**
 * Display the given error message or list of error messages.
 *
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Message.prototype.error = function(message) {
  this.show(this.getMessageObjects(message, ngeo.MessageType.ERROR));
};


/**
 * Display the given info message or list of info messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Message.prototype.info = function(message) {
  this.show(this.getMessageObjects(message, ngeo.MessageType.INFORMATION));
};


/**
 * Display the given success message or list of success messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Message.prototype.success = function(message) {
  this.show(this.getMessageObjects(message, ngeo.MessageType.SUCCESS));
};


/**
 * Display the given warning message or list of warning messages.
 * @param {string|Array.<string>} message Message or list of messages.
 * @export
 */
ngeo.Message.prototype.warn = function(message) {
  this.show(this.getMessageObjects(message, ngeo.MessageType.WARNING));
};


/**
 * Returns an array of message object from any given message string, list of
 * message strings, message object or list message objects. The type can be
 * overridden here as well OR defined (if the message(s) is/are string(s),
 * defaults to 'information').
 * @param {string|Array.<string>|ngeox.Message|Array.<ngeox.Message>}
 *     object A message or list of messages as text or configuration objects.
 * @param {string=} opt_type The type of message to override the messages with.
 * @return {Array.<ngeox.Message>} List of message objects.
 * @protected
 */
ngeo.Message.prototype.getMessageObjects = function(object, opt_type) {
  const msgObjects = [];
  let msgObject = null;
  const defaultType = ngeo.MessageType.INFORMATION;

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
