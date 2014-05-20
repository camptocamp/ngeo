# ngeo

## Developer Guide

### Directives

* In the definition of a directive, if an object is used for the `scope`
  property (isolate scope case) then quotes must be used for the keys in that
  object. And in the `link` function, `goog.object.get` must be used to get
  references to objects associated with these keys. See the example below.

  ```js
  module.directive('goDirectiveExample',
      /**
       * @return {angular.Directive} The directive specs.
       */
      function() {
        return {
          restrict: 'A',
          scope: {
            'm': '=goDirectiveExampleMap'
          }
          link:
              /**
               * @param {angular.Scope} scope Scope.
               * @param {angular.JQLite} element Element.
               * @param {angular.Attributes} attrs Attributes.
               */
              function(scope, element, attrs) {
                var m = goog.object.get(scope, 'm');
                // …
              },
          // …
        });
  ```

## Issues

* Cannot use compile flags as missingProperties because of a problem in
  closure-util. See https://github.com/openlayers/closure-util/issues/15.

* We use our own closure-compiler.js externs file to remove the definitions of
  msRequestFullscreen and msExitFullscreen which are defined in Compiler
  versions more recent that what's used in OpenLayers 3.
