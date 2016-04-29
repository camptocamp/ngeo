beforeEach(function() {
  module('gmf', function($provide) {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
    $provide.value('gmfWmsUrl', 'http://fake/gmf/mapserver');
    $provide.value('authenticationBaseUrl', 'https://fake/gmf/authentication');
  });
});
