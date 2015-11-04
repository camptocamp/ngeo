goog.require('ngeo.filereaderDirective');

describe('ngeo.filereaderDirective', function() {
  var element, rootScope;

  beforeEach(function() {
    element = angular.element(
      '<input type="file" ngeo-filereader="fileContent" />');

    module(function($provide) {
      var FileReader = function() {};
      FileReader.prototype.readAsText = function(file) {
        var progressEvent = {
          target: {
            result: '<kml></kml>'
          }
        };
        this.onload(progressEvent);
      };
      $provide.value('$window', {FileReader: FileReader});
    });

    inject(function($rootScope, $compile) {
      $compile(element)($rootScope);
      $rootScope.$digest();
      rootScope = $rootScope;
    });
  });

  it('sets the file content onto the scope', function() {
    var input = element[0];
    var customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent('change');
    input.dispatchEvent(customEvent);
    expect(rootScope.fileContent).toBe('<kml></kml>');
  });

});
