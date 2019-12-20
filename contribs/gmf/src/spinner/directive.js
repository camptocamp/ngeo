import angular from 'angular';

/**
 * @ngInject
 * @param {angular.IHttpService} $http Angular HTTP service.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngdoc directive
 * @ngname gmfLoaderSpinner
 */
const loaderSpinner = function($http) {
  return {
    restrict: 'A',
    scope: true,
    link:
      /**
       * @param {angular.IScope} scope Scope.
       * @param {JQuery} el Element.
       * @param {angular.IAttributes} attrs Attributes.
       */
      (scope, el, attrs) => {
        scope.$watch(
          () => $http.pendingRequests.length,
          () => {
            if ($http.pendingRequests.length > 0) {
              el[0].style.display = 'block';
            } else {
              el[0].style.display = 'none';
            }
          }
        );
      }
  };
};

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfLoaderSpinner', []);

module.directive('gmfLoaderSpinner', loaderSpinner);


export default module;
