// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * A message to display by the ngeo notification service.
 */
export type Message = {
  /**
   * The delay in milliseconds the message is shown
   */
  delay?: number;
  /**
   * Whether the message should be displayed inside a popup window or not.
   */
  popup?: boolean;
  /**
   * The message text to display.
   */
  msg: string;
  /**
   * The target element (or selector to get the element) in which
   * to display the message. If not defined, then the default target of the notification service is used.
   */
  target?: Element;
  /**
   * The type of message.
   */
  type?: string;
};

export enum MessageType {
  ERROR = 'error',
  INFORMATION = 'information',
  SUCCESS = 'success',
  WARNING = 'warning',
}

/**
 * Abstract class for services that display messages.
 *
 * @class
 * @abstract
 * @hidden
 */
export default class {
  /**
   * Show the message.
   *
   * @abstract
   * @param message Message.
   * @returns
   * @protected
   */
  showMessage(message: Message): void {}

  /**
   * Show disclaimer message string or object or list of disclame message
   * strings or objects.
   *
   * @param object A message or list of messages as text or configuration objects.
   * @returns
   */
  show(object: string | Message | (string | Message)[]): void {
    const msgObjects = this.getMessageObjects(object);
    msgObjects.forEach(this.showMessage, this);
  }

  /**
   * Display the given error message or list of error messages.
   *
   * @param message Message or list of messages.
   * @returns
   */
  error(message: string | string[]): void {
    this.show(this.getMessageObjects(message, MessageType.ERROR));
  }

  /**
   * Display the given info message or list of info messages.
   *
   * @param message Message or list of messages.
   * @returns
   */
  info(message: string | string[]): void {
    this.show(this.getMessageObjects(message, MessageType.INFORMATION));
  }

  /**
   * Display the given success message or list of success messages.
   *
   * @param message Message or list of messages.
   * @returns
   */
  success(message: string | string[]): void {
    this.show(this.getMessageObjects(message, MessageType.SUCCESS));
  }

  /**
   * Display the given warning message or list of warning messages.
   *
   * @param message Message or list of messages.
   * @returns
   */
  warn(message: string | string[]): void {
    this.show(this.getMessageObjects(message, MessageType.WARNING));
  }

  /**
   * Returns an array of message object from any given message string, list of
   * message strings, message object or list message objects. The type can be
   * overridden here as well OR defined (if the message(s) is/are string(s),
   * defaults to 'information').
   *
   * @param object
   *     A message or list of messages as text or configuration objects.
   * @param {string} [opt_type] The type of message to override the messages with.
   * @returns List of message objects.
   * @protected
   */
  getMessageObjects(object: string | Message | (string | Message)[], opt_type?: string): Message[] {
    const msgObjects: Message[] = [];
    const defaultType = MessageType.INFORMATION;

    if (typeof object === 'string') {
      msgObjects.push({
        msg: /** @type {string} */ object,
        type: opt_type !== undefined ? opt_type : defaultType,
      });
    } else if (Array.isArray(object)) {
      /**
       * @type {(string | Message)[]}
       */ object.forEach((msg) => {
        if (typeof object === 'string') {
          msgObjects.push({
            msg: msg as string,
            type: opt_type !== undefined ? opt_type : defaultType,
          });
        } else {
          if (typeof msg == 'string') {
            throw new Error('Wrong msg type');
          }
          if (opt_type !== undefined) {
            msg.type = opt_type;
          }
          msgObjects.push(msg);
        }
      });
    } else {
      const msgObject: Message = object;
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
