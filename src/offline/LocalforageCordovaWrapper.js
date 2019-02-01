goog.module('ngeo.offline.LocalforageCordovaWrapper');
goog.module.declareLegacyNamespace();


const AbstractWrapper = goog.require('ngeo.offline.AbstractLocalforageWrapper');


exports = class CordovaWrapper extends AbstractWrapper {
  constructor() {
    super();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  /**
   * @override
   */
  postToBackend(action) {
    window['parent'].postMessage(action, '*');
  }
};
