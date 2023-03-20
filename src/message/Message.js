/**
 * A message to display by the ngeo notification service.
 *
 * @typedef {Object} Message
 * @property {number} [delay=7000] The delay in milliseconds the message is shown
 * @property {boolean} [popup=false] Whether the message should be displayed inside a popup window or not.
 * @property {string} msg The message text to display.
 * @property {JQuery|Element|string} [target] The target element (or selector to get the element) in which
 *    to display the message. If not defined, then the default target of the notification service is used.
 * @property {string} [type='info'] The type of message.
 */

/**
 * @enum {string}
 * @hidden
 */
export const MessageType = {
  /**
   * @type {string}
   */
  ERROR: 'error',
  /**
   * @type {string}
   */
  INFORMATION: 'information',
  /**
   * @type {string}
   */
  SUCCESS: 'success',
  /**
   * @type {string}
   */
  WARNING: 'warning',
};

/**
 * Abstract class for services that display messages.
 *
 * @constructor
 * @abstract
 * @hidden
 */
export default class {
  constructor() {}

  /**
   * Show the message.
   *
   * @abstract
   * @param {Message} message Message.
   * @protected
   */
  showMessage(message) {}

  /**
   * Show disclaimer message string or object or list of disclame message
   * strings or objects.
   *
   * @param {string|Message|Array<string|Message>}
   *     object A message or list of messages as text or configuration objects.
   */
  show(object) {
    const msgObjects = this.getMessageObjects(object);
    msgObjects.forEach(this.showMessage, this);
  }

  /**
   * Display the given error message or list of error messages.
   *
   * @param {string|Array.<string>} message Message or list of messages.
   */
  error(message) {
    this.show(this.getMessageObjects(message, MessageType.ERROR));
  }

  /**
   * Display the given info message or list of info messages.
   * @param {string|Array.<string>} message Message or list of messages.
   */
  info(message) {
    this.show(this.getMessageObjects(message, MessageType.INFORMATION));
  }

  /**
   * Display the given success message or list of success messages.
   * @param {string|Array.<string>} message Message or list of messages.
   */
  success(message) {
    this.show(this.getMessageObjects(message, MessageType.SUCCESS));
  }

  /**
   * Display the given warning message or list of warning messages.
   * @param {string|Array.<string>} message Message or list of messages.
   */
  warn(message) {
    this.show(this.getMessageObjects(message, MessageType.WARNING));
  }

  /**
   * Returns an array of message object from any given message string, list of
   * message strings, message object or list message objects. The type can be
   * overridden here as well OR defined (if the message(s) is/are string(s),
   * defaults to 'information').
   * @param {string|Message|Array<string|Message>}
   *     object A message or list of messages as text or configuration objects.
   * @param {string=} opt_type The type of message to override the messages with.
   * @return {Array<Message>} List of message objects.
   * @protected
   */
  getMessageObjects(object, opt_type) {
    /** @type {Array<Message>} */
    const msgObjects = [];
    const defaultType = MessageType.INFORMATION;

    if (typeof object === 'string') {
      msgObjects.push({
        msg: /** @type {string} */ (object),
        type: opt_type !== undefined ? opt_type : defaultType,
      });
    } else if (Array.isArray(object)) {
      /** @type {Array<string|Message>} */ (object).forEach((msg) => {
        if (typeof object === 'string') {
          msgObjects.push({
            msg: /** @type {string} */ (msg),
            type: opt_type !== undefined ? opt_type : defaultType,
          });
        } else {
          const msgObject = /** @type {Message} */ (msg);
          if (opt_type !== undefined) {
            msgObject.type = opt_type;
          }
          msgObjects.push(msgObject);
        }
      });
    } else {
      const msgObject = /** @type {Message} */ (object);
      if (opt_type !== undefined) {
        msgObject.type = opt_type;
      }
      if (msgObject.type === undefined) {
        msgObject.type = defaultType;
      }
      msgObjects.push(msgObject);
    }

    return msgObjects;
  }
}
