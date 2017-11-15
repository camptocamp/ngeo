goog.provide('ngeo.filereaderDirective');

goog.require('ngeo');


/**
 * This directive is to used on an input file element. When a file is selected
 * the directive uses the browser `FileReader` API to read the file. The file
 * content is provided to the directive user through the assignable expression.
 * Only works for text files (`readAsText` used for reading the file). And does
 * not work in Internet Explorer 9.
 *
 * Example:
 *
 *      <input type="file" ngeo-filereader="ctrl.fileContent"
 *        ngeo-filereader-supported="ctrl.supported"/>
 *
 * See our live example: [../examples/importfeatures.html](../examples/importfeatures.html)
 *
 * @htmlAttribute {string} ngeo-filereader The content of the file read.
 * @htmlAttribute {boolean=} ngeo-filereader-supported Whether the FileReader API is supported.
 * @param {angular.$window} $window The Angular $window service.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoFilereader
 */
ngeo.filereaderDirective = function($window) {
  return {
    restrict: 'A',
    scope: {
      'fileContent': '=ngeoFilereader',
      'supported': '=?ngeoFilereaderSupported'
    },
    /**
     * @param {angular.Scope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Atttributes.
     */
    link: (scope, element, attrs) => {
      const supported = 'FileReader' in $window;
      scope['supported'] = supported;
      if (!supported) {
        return;
      }
      element.on('change', (changeEvent) => {
        /** @type {!FileReader} */
        const fileReader = new $window.FileReader();
        fileReader.onload = (
          /**
                 * @param {!ProgressEvent} evt Event.
                 */
          function(evt) {
            scope.$apply(() => {
              scope['fileContent'] = evt.target.result;
            });
          });
        fileReader.readAsText(changeEvent.target.files[0]);
      });
    }
  };
};


ngeo.module.directive('ngeoFilereader', ngeo.filereaderDirective);
