// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

/**
 * @param {!Blob} blob A blob
 * @return {Promise<string>} data URL
 */
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(/** @type {String} */ (reader.result));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default class TileDownloader {
  /**
   * @param {Array<import("./index.js").OfflineTile>} tiles An array of tiles to download.
   * @param {import("./index.js").OfflineOnTileDownload} callbacks The callbacks.
   * @param {number} workers The maximum number of workers.
   */
  constructor(tiles, callbacks, workers) {
    /**
     * @private
     * @type {number}
     */
    this.maxNumberOfWorkers_ = workers;

    /**
     * @private
     */
    this.wasStarted_ = false;

    /**
     * @type {Array<import("./index.js").OfflineTile>}
     * @private
     */
    this.tiles_ = tiles;

    /**
     * @private
     * @type {import("./index.js").OfflineOnTileDownload}
     */
    this.callbacks_ = callbacks;

    /**
     * @private
     */
    this.allCount_ = 0;

    /**
     * @private
     */
    this.okCount_ = 0;

    /**
     * @private
     */
    this.koCount_ = 0;

    /**
     * @private
     */
    this.requestedCount_ = 0;

    /**
     * @private
     * @type {?function(): any}
     */
    this.resolvePromise_ = null;

    /**
     * @private
     * @type {?Promise}
     */
    this.promise_ = null;

    /**
     * @type {number}
     * @private
     */
    this.tileIndex_ = 0;

    /**
     * @type {boolean}
     * @private
     */
    this.cancel_ = false;
  }

  cancel() {
    this.cancel_ = true;
  }

  /**
   * @return {Promise} A promise that resolves when the downloads are complete (failing or not)
   */
  download() {
    if (this.promise_) {
      return this.promise_;
    }

    this.promise_ = new Promise((resolve, reject) => {
      this.resolvePromise_ = resolve;
    });

    console.assert(this.tiles_);
    if (this.tiles_.length === 0) {
      this.callbacks_.onTileDownloadError(1); // forcing progress update
      if (this.resolvePromise_) {
        this.resolvePromise_();
      }
    } else {
      for (let i = 0; i < this.maxNumberOfWorkers_; ++i) {
        this.downloadTile_();
      }
    }

    return this.promise_;
  }

  /**
   * @private to download.
   */
  downloadTile_() {
    if (this.cancel_ || this.tileIndex_ >= this.tiles_.length) {
      return;
    }
    const tile = this.tiles_[this.tileIndex_++];
    const tileUrl = tile.url;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', tileUrl, true);
    xhr.responseType = 'blob';
    const onTileDownloaded = () => {
      if (this.allCount_ === this.tiles_.length && this.resolvePromise_) {
        this.resolvePromise_();
      }
      this.downloadTile_();
    };

    /**
     *
     * @param {any} _ Unused.
     */
    const errorCallback = (_) => {
      if (this.cancel_) {
        return;
      }
      ++this.allCount_;
      ++this.koCount_;
      const progress = this.allCount_ / this.tiles_.length;
      this.callbacks_.onTileDownloadError(progress).then(onTileDownloaded, onTileDownloaded);
    };

    /**
     *
     * @param {!ProgressEvent} e The load event.
     */
    const onloadCallback = (e) => {
      /**
       * @type {?Blob}
       */
      const response = xhr.response;
      if (response && response.size !== 0) {
        // non-empty tile
        blobToDataUrl(response).then(
          (dataUrl) => {
            if (this.cancel_) {
              return;
            }
            ++this.allCount_;
            ++this.okCount_;
            tile.response = dataUrl;
            const progress = this.allCount_ / this.tiles_.length;
            this.callbacks_.onTileDownloadSuccess(progress, tile).then(onTileDownloaded, onTileDownloaded);
          },
          () => {
            if (this.cancel_) {
              return;
            }
            errorCallback(e);
          }
        );
      } else {
        if (this.cancel_) {
          return;
        }
        ++this.allCount_;
        ++this.okCount_;
        this.callbacks_
          .onTileDownloadSuccess(this.allCount_ / this.tiles_.length, tile)
          .then(onTileDownloaded, onTileDownloaded);
      }
    };

    xhr.onload = onloadCallback;
    xhr.onerror = errorCallback;
    xhr.onabort = errorCallback;
    xhr.ontimeout = errorCallback;
    xhr.send();
    ++this.requestedCount_;
  }
}
