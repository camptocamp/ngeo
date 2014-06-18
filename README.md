# ngeo

[![Travis CI Status](https://api.travis-ci.org/camptocamp/ngeo.svg?branch=master)](https://travis-ci.org/camptocamp/ngeo)

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

## Publish examples to GitHub Pages

Let's say you're working on a new feature in a specific branch and want to
publish examples to show others what that new feature's UI looks like. The
Makefile provides a `gh-pages` target for exactly this.

To publish the current branch's examples to GitHub Pages:

```shell
$ make gh-pages GITHUB_USERNAME=<your_github_username>
```

The `GITHUB_USERNAME` variable is used to specify the user/organization name to
publish to on GitHub.

For example

```shell
$ make gh-pages GITHUB_USERNAME=camptocamp
```

will publish the examples to `http://camptocamp.github.io/ngeo/<branchname>/`.

## Developer Guide

This section includes information for developpers of ngeo.

### The `ol.js` externs

To be able to compile ngeo (in advanced mode) as a standalone library an
externs file for ol3 is needed. This externs file, `externs/ol.js`, needs to be
updated as new ol3 objects are used in ngeo.

### Writing directives

* In the definition of a directive, if an object is used for the `scope`
  property (case of an isolate scope) then quotes must be used for the keys in
  that object. And in the `link` function, the `[]` notation, instead of the
  `.` notation, must be used when accessing scope properties. See the example
  below.

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
                var m = scope['m'];
                // …
              },
          // …
        });
  ```

## Issues

* We use our own closure-compiler.js externs file because ol3's includes the
  definitions of msRequestFullscreen and msExitFullscreen which are defined in
  the html5.js externs file of recent Compiler versions.
