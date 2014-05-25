# ngeo

## Build the standalone version

To build the standalone version of ngeo use the `dist` target:

```shell
$ make dist
```

The resulting file is `dist/ngeo.js`.

## Run the examples

To run the examples use the `serve` target:

```shell
$ make serve
```

and point your browser to http://localhost:3000/examples.

## Compile the examples

To compile the examples in advanced mode use:

```shell
$ make examples
```

To compile a single example use `make .build/examples/<example_name>.min.js`. For
example:

```shell
$ make .build/examples/simple.min.js
```

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

* We use our own closure-compiler.js externs file because ol3's includes the
  definitions of msRequestFullscreen and msExitFullscreen which are defined in
  the html5.js externs file of recent Compiler versions.
