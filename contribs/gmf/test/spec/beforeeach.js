beforeEach(function() {
  var gmfModule = angular.module('gmf');
  gmfModule.constant('angularLocaleScript', 'http://fake');

  module('gmf', function($provide) {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfWmsUrl', 'http://fake/gmf/mapserver');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
  });
});
