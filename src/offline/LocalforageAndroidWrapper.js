goog.module('ngeo.offline.LocalforageAndroidWrapper');
goog.module.declareLegacyNamespace();

const AbstractWrapper = goog.require('ngeo.offline.AbstractLocalforageWrapper');


exports = class AndroidWrapper extends AbstractWrapper {
  constructor() {
    super();
    window['androidWrapper'] = this;
  }

  /**
   * @override
   */
  postToBackend(action) {
    const stringified = JSON.stringify(action);
    window['ngeoHost']['postMessageToAndroid'](stringified);
  }

  /**
   * @export
   * @param {string} actionString .
   */
  receiveFromAndroid(actionString) {
    const action = JSON.parse(actionString);
    this.receiveMessage({
      'data': action
    });
  }
};
