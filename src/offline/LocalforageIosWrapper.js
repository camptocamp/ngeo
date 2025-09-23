// The MIT License (MIT)
//
// Copyright (c) 2019-2025 Camptocamp SA
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

import AbstractWrapper from 'ngeo/offline/AbstractLocalforageWrapper';

/**
 * @typedef {Object} Action
 * @property {string} command
 * @property {string[]} args
 */
const exports = class IosWrapper extends AbstractWrapper {
  constructor() {
    super();
    // @ts-ignore
    window.iosWrapper = this;
  }

  /**
   * @param {Action} action
   * @override
   */
  postToBackend(action) {
    if (action.command === 'setItem') {
      action.args[1] = JSON.stringify(action.args[1]);
    }
    const stringified = JSON.stringify(action);
    // @ts-ignore
    window.webkit.messageHandlers.ios.postMessage(stringified);
  }

  /**
   * @export
   * @param {string} actionString .
   */
  receiveFromIos(actionString) {
    const action = JSON.parse(actionString);
    /**
     * @type {string[]}
     */
    const args = action['args'] || [];
    action['args'] = args.map((item) => JSON.parse(item));
    this.receiveMessage({
      'data': action,
    });
  }
};

export default exports;
