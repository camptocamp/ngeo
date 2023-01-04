/**
 * @param {!Blob} blob A blob
 * @return {Promise<string>} data URL
 */
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(/** @type String */ (reader.result));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const exports = class {
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
     * @type {function(): any}
     */
    this.resolvePromise_;

    /**
     * @private
     * @type {Promise}
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
   * @private to download.
   */
  downloadTile_() {
    if (this.cancel_ || this.tileIndex_ >= this.tiles_.length) {
      return;
    }
    const tile = this.tiles_[this.tileIndex_++];
    const tileUrl = tile.url;
    const xhr = new XMLHttpRequest();
    xhr['tileUrl'] = tile.url;
    xhr.open('GET', tileUrl, true);
    xhr.responseType = 'blob';
    const onTileDownloaded = () => {
      if (this.allCount_ === this.tiles_.length) {
        this.resolvePromise_();
      }
      this.downloadTile_();
    };

    const errorCallback = (e) => {
      if (this.cancel_) {
        return;
      }
      ++this.allCount_;
      ++this.koCount_;
      const progress = this.allCount_ / this.tiles_.length;
      this.callbacks_.onTileDownloadError(progress).then(onTileDownloaded, onTileDownloaded);
    };

    const onloadCallback = (e) => {
      /**
       * @type {Blob}
       */
      const response = e.target.response;
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
      this.resolvePromise_();
    } else {
      for (let i = 0; i < this.maxNumberOfWorkers_; ++i) {
        this.downloadTile_();
      }
    }

    return this.promise_;
  }
};

export default exports;
