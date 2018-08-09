/**
 * @module ngeo.misc.File
 */
/**
 * @constructor
 * @param {angular.$q} $q .
 * @param {angular.$http} $http .
 * @param {gettext} gettext .
 * @ngInject
 */
const exports = function($q, $http, gettext) {
  let fileReader, canceler;

  // Test the validity of the file size
  this.isValidFileSize = function(fileSize) {
    return !(fileSize > 20000000); // 20 Mo
  };

  this.isWmsGetCap = function(fileContent) {
    return /<(WMT_MS_Capabilities|WMS_Capabilities)/.test(fileContent);
  };

  this.isWmtsGetCap = function(fileContent) {
    return /<Capabilities/.test(fileContent);
  };

  this.isKml = function(fileContent) {
    return /<kml/.test(fileContent) && /<\/kml>/.test(fileContent);
  };

  this.isGpx = function(fileContent) {
    return /<gpx/.test(fileContent) && /<\/gpx>/.test(fileContent);
  };

  /**
   * @param {!Blob} file .
   * @return {angular.$q.Promise<string>} .
   */
  this.read = function(file) {
    const defer = $q.defer();
    if (fileReader && fileReader.readyState === FileReader.LOADING) {
      fileReader.abort();
    }
    fileReader = new FileReader();
    fileReader.onload = function(evt) {
      defer.resolve(evt.target.result);
    };
    fileReader.onerror = function(evt) {
      const err = evt.target.error;
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

  /**
   * @param {string} url .
   * @param {angular.$q.Deferred=} opt_cancelP .
   * @return {angular.$q.Promise<Blob>} .
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
};

exports.module = angular.module('ngeoFile', []);

exports.module.service('ngeoFile', exports);


export default exports;
