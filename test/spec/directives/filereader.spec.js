goog.require('ngeo.filereaderDirective');

describe('ngeo.filereaderDirective', function() {
  let element, rootScope;

  beforeEach(function() {
    element = angular.element(
      '<input type="file" ngeo-filereader="fileContent" />');

    module(function($provide) {
      const FileReader = function() {};
      FileReader.prototype.readAsText = function(file) {
        const progressEvent = {
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
      rootScope = $rootScope;
    });
  });

  it('sets the file content onto the scope', function() {
    const input = element[0];
    const customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent('change', true, true, {});
    input.dispatchEvent(customEvent);
    expect(rootScope.fileContent).toBe('<kml></kml>');
  });

});
