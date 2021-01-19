// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import angular from 'angular';
import {isSafari} from 'ngeo/utils.js';

import {saveAs} from 'file-saver';

/**
 * @typedef {function(string, string, string=): void} Download
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoDownload', []);

/**
 * A service to start a download for a file.
 *
 * @return {Download} The download function.
 * @ngdoc service
 * @ngname ngeoDownload
 * @hidden
 */
export function factory() {
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
