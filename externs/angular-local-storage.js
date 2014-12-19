/**
 * @externs
 * @see https://github.com/grevory/angular-local-storage
 */


/**
 * @const
 */
var angularLocalStorage = {};

/**
 * @typedef {{
 *   isSupported: function():boolean,
 *   getStorageType: function():string,
 *   set: function(string, (string|number|boolean|Object)):boolean,
 *   add: function(string, (string|number|boolean|Object)):boolean,
 *   get: function(string):?(string|number|boolean|Object),
 *   keys: function():Array.<string>,
 *   remove: function(string):boolean,
 *   clearAll: function(string=):boolean,
 *   bind: function(angular.Scope, string, (string|number|boolean|Object)=,
 *     string=):function(),
 *   deriveKey: function(string):string,
 *   length: function():number,
 *   cookie: Object
 *   }}
 */
angularLocalStorage.localStorageService;


/**
 * @return {boolean}
 */
angularLocalStorage.localStorageService.isSupported = function() {};


/**
 * @return {string}
 */
angularLocalStorage.localStorageService.getStorageType = function() {};


/**
 * @param {string} key
 * @param {(string|number|boolean|Object)} value
 * @return {boolean}
 */
angularLocalStorage.localStorageService.set = function(key, value) {};


/**
 * @param {string} key
 * @param {(string|number|boolean|Object)} value
 * @return {boolean}
 */
angularLocalStorage.localStorageService.add = function(key, value) {};


/**
 * @param {string} key
 * @return {?(string|number|boolean|Object)}
 */
angularLocalStorage.localStorageService.get = function(key) {};


/**
 * @return {Array.<string>}
 */
angularLocalStorage.localStorageService.keys = function() {};


/**
 * @param {string} key
 * @return {boolean}
 */
angularLocalStorage.localStorageService.remove = function(key) {};


/**
 * @param {string=} opt_regularExpression
 * @return {boolean}
 */
angularLocalStorage.localStorageService.clearAll =
    function(opt_regularExpression) {};


/**
 * @param {angular.Scope} scope
 * @param {string} key
 * @param {(string|number|boolean|Object)=} opt_def
 * @param {string=} opt_lsKey
 * @return {function()}
 */
angularLocalStorage.localStorageService.bind =
    function(scope, key, opt_def, opt_lsKey) {};


/**
 * @param {string} key
 * @return {string}
 */
angularLocalStorage.localStorageService.deriveKey = function(key) {};


/**
 * @return {number}
 */
angularLocalStorage.localStorageService.length = function() {};


/**
 * @type {{
 *   isSupported: function():boolean,
 *   set: function(string, (string|number|boolean|Object)):boolean,
 *   add: function(string, (string|number|boolean|Object)):boolean,
 *   get: function(string):?(string|number|boolean|Object),
 *   remove: function(string),
 *   clearAll: function()
 *   }}
 */
angularLocalStorage.localStorageService.cookie;


/**
 * @return boolean
 */
angularLocalStorage.localStorageService.cookie.isSupported = function() {};


/**
 * @param {string} key
 * @param {(string|number|boolean|Object)} value
 * @return {boolean}
 */
angularLocalStorage.localStorageService.cookie.set = function(key, value) {};


/**
 * @param {string} key
 * @param {(string|number|boolean|Object)} value
 * @return {boolean}
 */
angularLocalStorage.localStorageService.cookie.add = function(key, value) {};


/**
 * @param {string} key
 * @return {?(string|number|boolean|Object)}
 */
angularLocalStorage.localStorageService.cookie.get = function(key) {};


/**
 * @param {string} key
 */
angularLocalStorage.localStorageService.cookie.remove = function(key) {};


angularLocalStorage.localStorageService.cookie.clearAll = function() {};
