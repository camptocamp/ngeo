goog.module('ngeo.offline.LocalforageIosWrapper');
goog.module.declareLegacyNamespace();

const AbstractWrapper = goog.require('ngeo.offline.AbstractLocalforageWrapper');


exports = class IosWrapper extends AbstractWrapper {
  constructor() {
    super();
    window['iosWrapper'] = this;
  }

  /**
   * @override
   */
  postToBackend(action) {
    const stringified = JSON.stringify(action);
    window['webkit']['messageHandlers']['ios']['postMessage'](stringified);
  }

  /**
   * @export
   * @param {string} actionString .
   */
  receiveFromIos(actionString) {
    const action = JSON.parse(actionString);
    this.receiveMessage({
      'data': action
    });
  }
};
