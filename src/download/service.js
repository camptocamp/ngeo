import angular from 'angular';
import {isSafari} from 'ngeo/utils.js';

import {saveAs} from 'file-saver';

/**
 * @typedef {function(string, string, string=): void} Download
 */

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDownload', []);

/**
 * A service to start a download for a file.
 *
 * @return {Download} The download function.
 * @ngdoc service
 * @ngname ngeoDownload
 * @private
 * @hidden
 */
function factory() {
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
    const fileType = opt_fileType !== undefined && !isSafari() ? opt_fileType : 'text/plain;charset=utf-8';

    const blob = new Blob(
      [
        new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM
        content,
      ],
      {type: fileType}
    );
    saveAs(blob, fileName);
  }

  return download;
}

module.factory('ngeoDownload', factory);

export default module;
