import AbstractWrapper from 'ngeo/offline/AbstractLocalforageWrapper.js';

const exports = class IosWrapper extends AbstractWrapper {
  constructor() {
    super();
    window['iosWrapper'] = this;
  }

  /**
   * @override
   */
  postToBackend(action) {
    if (action['command'] === 'setItem') {
      action['args'][1] = JSON.stringify(action['args'][1]);
    }
    const stringified = JSON.stringify(action);
    window['webkit']['messageHandlers']['ios']['postMessage'](stringified);
  }

  /**
   * @export
   * @param {string} actionString .
   */
  receiveFromIos(actionString) {
    const action = JSON.parse(actionString);
    action['args'] = (action['args'] || []).map((item) => JSON.parse(item));
    this.receiveMessage({
      'data': action,
    });
  }
};

export default exports;
