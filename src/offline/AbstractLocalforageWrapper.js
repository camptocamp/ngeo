goog.module('ngeo.offline.AbstractLocalforageWrapper');
goog.module.declareLegacyNamespace();


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
exports = class AbstractLocalforageWrapper {
  constructor() {
    this.waitingPromises_ = new window.Map();
    this.currentId_ = 0;
  }

  setItem(...args) {
    return this.createAction('setItem', ...args);
  }

  getItem(...args) {
    return this.createAction('getItem', ...args);
  }

  clear() {
    return this.createAction('clear');
  }

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
      'id': id
    };
    console.log('sending action', JSON.stringify(action, null, '\t'));
    const waitingPromise = {};
    const promise = new Promise((resolve, reject) => {
      waitingPromise['resolve'] = resolve;
      waitingPromise['reject'] = reject;
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
    console.log('received action', JSON.stringify(action, null, '\t'));

    const waitingPromise = this.waitingPromises_.get(id);
    if (command === 'error') {
      console.error(msg, args, context);
      if (waitingPromise) {
        waitingPromise.reject(args, context);
        this.waitingPromises_.delete(id);
      }
    } else if (command === 'response') {
      console.log('Received response message from backend');
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
  postToBackend(action) {
  }
};
