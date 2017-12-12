goog.provide('ngeo.download.Service');

goog.require('ngeo');
goog.require('ngeo.utils');

/**
 * A service to start a download for a file.
 *
 * @private
 * @return {ngeox.Download} The download function.
 * @ngdoc service
 * @ngname ngeoDownload
 */
ngeo.download.Service = function() {
  /**
   * @param {string} content The file content.
   * @param {string} fileName The file name.
   * @param {string=} opt_fileType The file type. If not given,
   *    `text/plain;charset=utf-8` is used.
   */
  function download(content, fileName, opt_fileType) {
    // Safari does not properly work with FileSaver. Using the the type 'text/plain'
    // makes it a least possible to show the file content so that users can
    // do a manual download with "Save as".
    // See also: https://github.com/eligrey/FileSaver.js/issues/12
    /** @type {string} */
    const fileType = opt_fileType !== undefined && !ngeo.utils.isSafari() ?
      opt_fileType : 'text/plain;charset=utf-8';

    const blob = new Blob([content], {type: fileType});
    saveAs(blob, fileName);
  }

  return download;
};

/**
 * @type {!angular.Module}
 * FIXME add utils dependencies.
 */
ngeo.download.Service.module = angular.module('ngeoDownload', []);
ngeo.download.Service.module.factory('ngeoDownload', ngeo.download.Service);
ngeo.module.requires.push(ngeo.download.Service.module.name);
