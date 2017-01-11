goog.require('gmf.ProfileController');


describe('gmf.GmfProfileController', function() {

  var profileController;
  var csvDownloadServiceMock;
  var $scope;
  var $rootScope;

  beforeEach(function() {
    module('ngeo', function($provide) {
      $provide.value('gmfProfileJsonUrl', 'https://geomapfish-demo.camptocamp.net/2.1/wsgi/profile.json');
      csvDownloadServiceMock = {
        startDownload: function(data, columnDefs, fileName) {}
      };
    });

    inject(function($injector, _$controller_, _$rootScope_) {
      var $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      var data = {
        getLinesConfigurationFn: function() {
          return {
            'aster': {
              'color':'#0404A0'
            },
            'srtm': {
              'color':'#04A004'
            }
          };
        }
      };
      profileController = $controller(
          'GmfProfileController', {
            $scope: $scope,
            ngeoCsvDownload: csvDownloadServiceMock,
            $element: $('<div></div>')}, data);
      $rootScope.$digest();
    });
  });

  describe('#downloadCsv', function() {

    it('does nothing when empty', function() {
      profileController.profileData = [];
      spyOn(csvDownloadServiceMock, 'startDownload');
      profileController.downloadCsv();
      expect(csvDownloadServiceMock.startDownload).not.toHaveBeenCalled();
    });

    it('generates rows and header correctly', function() {
      profileController.profileData = [
        {
          x: 631943,
          y: 189536,
          dist: 0,
          values: {
            aster: 1094,
            srtm: 1097
          }
        },
        {
          x: 631945,
          y: 189537,
          dist: 101,
          values: {
            aster: 900,
            srtm: 905
          }
        },
        {
          x: 631947,
          y: 189539,
          dist: 204,
          values: {
            aster: 564,
            srtm: 562
          }
        }
      ];
      spyOn(csvDownloadServiceMock, 'startDownload');
      profileController.downloadCsv();

      expect(csvDownloadServiceMock.startDownload).toHaveBeenCalled();

      var callArgs = csvDownloadServiceMock.startDownload.calls.mostRecent().args;
      expect(callArgs[0]).toEqual([
        {
          x: 631943,
          y: 189536,
          distance: 0,
          aster: 1094,
          srtm: 1097
        },
        {
          x: 631945,
          y: 189537,
          distance: 101,
          aster: 900,
          srtm: 905
        },
        {
          x: 631947,
          y: 189539,
          distance: 204,
          aster: 564,
          srtm: 562
        }
      ]);
      expect(callArgs[1]).toEqual([
        {name: 'distance'},
        {name: 'aster'},
        {name: 'srtm'},
        {name: 'x'},
        {name: 'y'}
      ]);
      expect(callArgs[2]).toEqual('profile.csv');
    });
  });
});
