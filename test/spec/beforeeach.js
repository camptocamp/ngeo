beforeEach(function() {
  module('ngeo', function($qProvider) {
    // See https://github.com/angular/angular.js/commit/c9dffde1cb167660120753181cb6d01dc1d1b3d0
    $qProvider.errorOnUnhandledRejections(false);
  });
});
