import AbstractWrapper from 'ngeo/offline/AbstractLocalforageWrapper.js';

const exports = class IosWrapper extends AbstractWrapper {
  constructor() {
    super();
    // @ts-ignore
    window.iosWrapper = this;
  }

  /**
    * @param {Object} action
   * @override
   */
  postToBackend(action) {
    if (action['command'] === 'setItem') {
      action['args'][1] = JSON.stringify(action['args'][1]);
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
    action['args'] = args.map(item => JSON.parse(item));
    this.receiveMessage({
      'data': action
    });
  }
};


export default exports;
