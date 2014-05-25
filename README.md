# ngeo

## Build standalone version

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

and point your browser to
[http://localhost:3000/examples](http://localhost:3000/examples).

## Compile the examples

To compile all the examples use:

```shell
$ make examples
```

To compile a single example use `make .build/examples/<example_name>.min.js`.
For example:

```shell
$ make .build/examples/simple.min.js
```

## The `check` target

Run the `check` target before submitting a PR:

```shell
$ make check
```

The `check` target runs a number of checks on the code of the library and
the examples (lint, compile, …). We recommend using this target before pushing
code to GitHub and creating PRs.

## Developer Guide

This section includes information for developpers of ngeo.

### The `ol.js` externs

To be able to compile ngeo (in advanced mode) as a standalone library an
externs file for ol3 is needed. This externs file, `externs/ol.js`, needs to be
updated as new ol3 objects are used in ngeo.

### Writing directives

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
