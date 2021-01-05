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
 * @typedef {{
 *   id: number,
 *   plugin: string,
 *   command: string,
 *   args: !Array<*>,
 *   context: (*|undefined)
 * }}
 */
// eslint-disable-next-line no-unused-vars
let Action;

/**
 * @abstract
 */
const exports = class AbstractLocalforageWrapper {
  constructor() {
    this.waitingPromises_ = new Map();
    this.currentId_ = 0;
  }

  /**
   * @param  {...any} args Some arguments.
   * @return Promise
   */
  setItem(...args) {
    return this.createAction('setItem', ...args);
  }

  /**
   * @param  {...any} args Some arguments.
   * @return Promise
   */
  getItem(...args) {
    return this.createAction('getItem', ...args);
  }

  clear() {
    return this.createAction('clear');
  }

  /**
   * @param  {...any} args Some arguments.
   * @return Promise
   */
  config(...args) {
    return this.createAction('config', ...args);
  }

  /**
   * @export
   * @param {string} command .
   * @param  {...*} args .
   * @return {Promise} .
   */
  createAction(command, ...args) {
    const id = ++this.currentId_;
    /**
     * @type {Action}
     */
    const action = {
      'plugin': 'localforage',
      'command': command,
      'args': args,
      'id': id,
    };
    const waitingPromise = {
      resolve() {},
      reject() {},
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
    const action = event['data'];
    const id = action['id'];
    const command = action['command'];
    const args = action['args'] || [];
    const context = action['context'];
    const msg = action['msg'];

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
