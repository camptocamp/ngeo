goog.provide('ngeo.Download');

goog.require('ngeo');

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
    /** @type{string} */
    const fileType = (opt_fileType !== undefined) ? opt_fileType :
        'text/plain;charset=utf-8';

    const blob = new Blob([content], {type: fileType});
    saveAs(blob, fileName);
  }

  return download;
};

ngeo.module.factory('ngeoDownload', ngeo.downloadFactory_);
