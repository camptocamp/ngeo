goog.module('ngeo.offline.Downloader');

const Downloader = class {
  save() {
    console.log('TODO: implement dowloader');
  }
};

const name = 'offlineDownloader';
Downloader.module = angular.module(name, []).service(name, Downloader);

exports = Downloader;
