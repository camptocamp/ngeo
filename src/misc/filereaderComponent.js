import angular from 'angular';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoFilereader', []);

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
 * @param {angular.IWindowService} $window The Angular $window service.
 * @return {angular.IDirective} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoFilereader
 * @private
 * @hidden
 */
function filereaderComponent($window) {
  return {
    restrict: 'A',
    scope: {
      'fileContent': '=ngeoFilereader',
      'supported': '=?ngeoFilereaderSupported',
    },
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery<HTMLInputElement>} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     */
    link: (scope, element, attrs) => {
      const supported = 'FileReader' in $window;
      scope['supported'] = supported;
      if (!supported) {
        return;
      }

      /**
       * @param {JQuery.ChangeEvent<any, any, any, HTMLInputElement>} changeEvent The event
       */
      const ce = (changeEvent) => {
        /** @type {!FileReader} */
        const fileReader = new $window.FileReader();
        fileReader.onload =
          /**
           * @param {!ProgressEvent} evt Event.
           */
          function (evt) {
            const target = /** @type {FileReader} */ (evt.target);
            scope.$apply(() => {
              scope['fileContent'] = target.result;
            });
          };
        fileReader.readAsText(changeEvent.target.files[0]);
      };
      element.on({change: ce});
    },
  };
}

module.directive('ngeoFilereader', filereaderComponent);

export default module;
