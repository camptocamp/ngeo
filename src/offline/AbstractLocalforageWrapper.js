// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
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
 * @typedef {Object} Action
 * @property {number} id
 * @property {string} plugin
 * @property {string} command
 * @property {!*[]} args
 * @property {?} context
 * @property {string} [msg]
 */

/**
 * @abstract
 */
const exports = class AbstractLocalforageWrapper {
  constructor() {
    this.waitingPromises_ = new Map();
    this.currentId_ = 0;
  }

  /**
   * @param  {...unknown} args Some arguments.
   * @return Promise
   */
  setItem(...args) {
    return this.createAction('setItem', ...args);
  }

  /**
   * @param  {...unknown} args Some arguments.
   * @return Promise
   */
  getItem(...args) {
    return this.createAction('getItem', ...args);
  }

  clear() {
    return this.createAction('clear');
  }

  /**
   * @param  {...unknown} args Some arguments.
   * @return Promise
   */
  config(...args) {
    return this.createAction('config', ...args);
  }

  /**
   * @export
   * @param {string} command .
   * @param  {...unknown} args .
   * @return {Promise<void>} .
   */
  createAction(command, ...args) {
    const id = ++this.currentId_;
    /**
     * @type {Action}
     */
    const action = {
      plugin: 'localforage',
      command: command,
      args: args,
      id: id,
      context: null,
    };
    const waitingPromise = {
      /**
       * @param {any} _any
       */
      resolve(_any) {},
      /**
       * @param {any} _any
       */
      reject(_any) {},
    };
    const promise = new Promise((resolve, reject) => {
      waitingPromise.resolve = resolve;
      waitingPromise.reject = reject;
    });
    this.waitingPromises_.set(id, waitingPromise);
    this.postToBackend(action);
    return promise;
  }

  /**
   * @export
   * @param {*} event .
   */
  receiveMessage(event) {
    /**
     * @type {Action}
     */
    const action = event.data;
    const id = action.id;
    const command = action.command;
    const args = action.args || [];
    const context = action.context;
    const msg = action.msg;

    const waitingPromise = this.waitingPromises_.get(id);
    if (command === 'error') {
      console.error(msg, args, context);
      if (waitingPromise) {
        waitingPromise.reject(args, context);
        this.waitingPromises_.delete(id);
      }
    } else if (command === 'response') {
      waitingPromise.resolve(...args);
      this.waitingPromises_.delete(id);
    } else {
      console.error('Unhandled command', JSON.stringify(action, null, '\t'));
    }
  }

  /**
   * @abstract
   * @protected
   * @param {Action} action .
   */
  postToBackend(action) {}
};

export default exports;
