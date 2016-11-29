goog.provide('ngeo.File');


/**
 * @constructor
 * @param {angular.$q} $q .
 * @param {angular.$http} $http .
 * @param {Window} $window .
 */
ngeo.File = function($q, $http, $window) {
  var fileReader, canceler;

  // Test the validity of the file size
  this.isValidFileSize = function(fileSize) {
    return !(fileSize > 20000000); // 20 Mo
  };

  this.isWmsGetCap = function(fileContent) {
    return /<(WMT_MS_Capabilities|WMS_Capabilities)/.test(fileContent);
  };

  this.isKml = function(fileContent) {
    return /<kml/.test(fileContent) && /<\/kml>/.test(fileContent);
  };

  /**
   * @param {!Blob} file .
   * @return {angular.$q.Promise<string>} .
   */
  this.read = function(file) {
    var defer = $q.defer();
    if (fileReader) {
      fileReader.abort();
    }
    fileReader = new FileReader();
    fileReader.onload = function(evt) {
      defer.resolve(evt.target.result);
    };
    fileReader.onerror = function(evt) {
      var err = evt.target.error;
      $window.console.error('Reading file failed: ', err);
      defer.reject({
        message: err.code == 20 ? 'operation_canceled' : 'read_failed',
        reason: err.message
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
    var defer = $q.defer();
    $http.get(url, {
      timeout: canceler.promise
    }).then(function(response) {
      defer.resolve(response.data);
    }, function(reason) {
      $window.console.error('Uploading file failed: ', reason);
      defer.reject({
        message: 'upload_failed',
        reason: reason
      });
    });
    return defer.promise;
  };
};
