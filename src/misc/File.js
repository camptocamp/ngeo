import angular from 'angular';


/**
 * @constructor
 * @param {angular.IQService} $q .
 * @param {angular.IHttpService} $http .
 * @param {angular.gettext.gettextFunction} gettext .
 * @ngInject
 * @hidden
 */
export function FileService($q, $http, gettext) {
  // Test the validity of the file size
  /**
   * @param {number} fileSize
   */
  this.isValidFileSize = function(fileSize) {
    return fileSize <= 20000000; // 20 Mo
  };

  /**
   * @param {string} fileContent
   */
  this.isWmsGetCap = function(fileContent) {
    return /<(WMT_MS_Capabilities|WMS_Capabilities)/.test(fileContent);
  };

  /**
   * @param {string} fileContent
   */
  this.isWmtsGetCap = function(fileContent) {
    return /<Capabilities/.test(fileContent);
  };

  /**
   * @param {string} fileContent
   */
  this.isKml = function(fileContent) {
    return /<kml/.test(fileContent) && /<\/kml>/.test(fileContent);
  };

  /**
   * @param {string} fileContent
   */
  this.isGpx = function(fileContent) {
    return /<gpx/.test(fileContent) && /<\/gpx>/.test(fileContent);
  };

  /** @type {?FileReader} */
  let fileReader = null;
  /**
   * @param {Blob} file .
   * @return {angular.IPromise<string>} .
   */
  this.read = function(file) {
    const defer = $q.defer();
    if (fileReader && fileReader.readyState === FileReader.LOADING) {
      fileReader.abort();
    }
    fileReader = new FileReader();
    fileReader.onload = function(evt) {
      const target = evt.target;
      if (!(target instanceof FileReader)) {
        throw new Error('Wrong target type');
      }
      defer.resolve(target.result);
    };
    fileReader.onerror = function(evt) {
      const target = evt.target;
      if (!(target instanceof FileReader)) {
        throw new Error('Wrong target type');
      }
      const err = target.error;
      if (!err) {
        throw new Error('Missing error');
      }
      console.error('Reading file failed: ', err);
      defer.reject({
        'message': err.code == 20 ? gettext('Operation canceled') : gettext('Read failed'),
        'reason': err.message
      });
    };
    fileReader.onprogress = function(evt) {
      defer.notify(evt);
    };
    // Read the file
    fileReader.readAsText(file);
    return defer.promise;
  };

  /** @type {angular.IDeferred<any>} */
  let canceler;
  /**
   * @param {string} url .
   * @param {angular.IDeferred<void>=} opt_cancelP .
   * @return {angular.IPromise<Blob>} .
   */
  this.load = function(url, opt_cancelP) {

    if (canceler) {
      canceler.resolve();
    }
    canceler = opt_cancelP || $q.defer();

    // Angularjs doesn't handle onprogress event
    const defer = $q.defer();
    $http.get(url, {
      timeout: canceler.promise
    }).then((response) => {
      defer.resolve(response.data);
    }, (reason) => {
      console.error('Uploading file failed: ', reason);
      defer.reject({
        'message': gettext('Upload failed'),
        'reason': reason
      });
    });
    return defer.promise;
  };
}

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFile', []);

module.service('ngeoFile', FileService);


export default module;
