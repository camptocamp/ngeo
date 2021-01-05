// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

// @ts-nocheck
import angular from 'angular';

describe('gmf.GmfProfileController', () => {
  /** @type {import('gmf/profile/component.js').ProfileController} */
  let profileController;
  /** @type {import("ngeo/download/Csv.js").DownloadCsvService} */
  let csvDownloadServiceMock;
  /** @type {angular.IScope} */
  let $scope;
  /** @type {angular.IScope} */
  let $rootScope;

  beforeEach(() => {
    angular.mock.module(
      'ngeo',
      /**
       * @param {angular.IModule} $provide
       */
      ($provide) => {
        $provide.value('gmfProfileJsonUrl', 'https://geomapfish-demo-2-6.camptocamp.com/profile.json');
        csvDownloadServiceMock = {
          startDownload(data, columnDefs, fileName) {},
        };
      }
    );

    angular.mock.inject((_$controller_, _$rootScope_) => {
      const $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      const data = {
        getLinesConfigurationFn() {
          return {
            'aster': {
              'color': '#0404A0',
            },
            'srtm': {
              'color': '#04A004',
            },
          };
        },
      };
      profileController = $controller(
        'GmfProfileController',
        {
          $scope: $scope,
          ngeoCsvDownload: csvDownloadServiceMock,
          $element: $('<div></div>'),
        },
        data
      );
      $rootScope.$digest();
    });
  });

  describe('#downloadCsv', () => {
    it('does nothing when empty', () => {
      profileController.profileData = [];
      spyOn(csvDownloadServiceMock, 'startDownload');
      profileController.downloadCsv();
      expect(csvDownloadServiceMock.startDownload).not.toHaveBeenCalled();
    });

    it('generates rows and header correctly', () => {
      profileController.profileData = [
        {
          x: 631943,
          y: 189536,
          dist: 0,
          values: {
            aster: 1094,
            srtm: 1097,
          },
        },
        {
          x: 631945,
          y: 189537,
          dist: 101,
          values: {
            aster: 900,
            srtm: 905,
          },
        },
        {
          x: 631947,
          y: 189539,
          dist: 204,
          values: {
            aster: 564,
            srtm: 562,
          },
        },
      ];
      spyOn(csvDownloadServiceMock, 'startDownload');
      profileController.downloadCsv();

      expect(csvDownloadServiceMock.startDownload).toHaveBeenCalled();

      const callArgs = csvDownloadServiceMock.startDownload.calls.mostRecent().args;
      expect(callArgs[0]).toEqual([
        {
          x: 631943,
          y: 189536,
          distance: 0,
          aster: 1094,
          srtm: 1097,
        },
        {
          x: 631945,
          y: 189537,
          distance: 101,
          aster: 900,
          srtm: 905,
        },
        {
          x: 631947,
          y: 189539,
          distance: 204,
          aster: 564,
          srtm: 562,
        },
      ]);
      expect(callArgs[1]).toEqual([
        {name: 'distance'},
        {name: 'aster'},
        {name: 'srtm'},
        {name: 'x'},
        {name: 'y'},
      ]);
      expect(callArgs[2]).toEqual('profile.csv');
    });
  });
});
