beforeEach(function() {
  module('gmf', function($provide) {
    $provide.value('gmfTreeUrl', 'http://fake/gmf/themes');
  });
});
