goog.provide('ngeo.Download');

goog.require('ngeo');
goog.require('ngeo.utils');

/**
 * @typedef {function(string, string, string=)}
 */
ngeo.Download;

/**
 * A service to start a download for a file.
 *
 * @private
 * @return {ngeo.Download} The download function.
 * @ngdoc service
 * @ngname ngeoDownload
 */
ngeo.downloadFactory_ = function() {
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
    /** @type{string} */
    var fileType = opt_fileType !== undefined && !ngeo.utils.isSafari() ?
        opt_fileType : 'text/plain;charset=utf-8';

    var blob = new Blob([content], {type: fileType});
    saveAs(blob, fileName);
  }

  return download;
};

ngeo.module.factory('ngeoDownload', ngeo.downloadFactory_);
