# ngeo

[![Travis CI Status](https://api.travis-ci.org/camptocamp/ngeo.svg?branch=master)](https://travis-ci.org/camptocamp/ngeo)

## Build standalone version

To build the "standalone" version of ngeo use the `dist` target:

```shell
$ make dist
```

The resulting file is `dist/ngeo.js`.

The standalone version of ngeo contains both the `ngeo` code and the `ol` code.
So when you use `ngeo.js` in a web page you should not have a script tag for
`ol.js`.

## Run the examples

To run the examples use the `serve` target:

```shell
$ make serve
```

and point your browser to
[http://localhost:3000/examples](http://localhost:3000/examples).

## The `check` target

Run the `check` target before submitting a PR:

```shell
$ make check
```

The `check` target runs a number of checks on the code of the library and the
examples (lint, compile, …). This is the target run on Travis.

Note: this target compiles the examples' code. The examples are combined into
a single file before compilation. See the following section to know how to
individually compile the examples.

## Compile the examples individually

Each example can be individually compiled. For example:

```shell
$ make .build/examples/simple.min.js
```

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

The published examples use the `ngeo.js` standalone build.

Example: http://camptocamp.github.io/ngeo/master/simple.html.

## Developer Guide

This section includes information for developpers and users of ngeo.

### Property renaming and `$scope`

The ngeo code is compiled with Closure Compiler in *advanced* mode. This
means we should conform to the restrictions imposed by the compiler.

In particular, Angular controllers and directives typically set properties on
the `$scope`. These properties are then referenced by their names in HTML pages
and templates. This means that we need to prevent the compiler from renaming
the properties controllers and directives set on the `$scope`.

The way to do that is to use the `[]` notation rather than the `.` notation
when setting (and accessing) properties on the `$scope`. For example if you
need to set a property `foo` on the `$scope` you should do as follows:

```js
$scope['foo'] = 'bar';
```

The jshint linter, which we use for to check the ngeo code, complains when the
`[]` notation is used. We set the `sub` jshint to `true` in a `.jshintrc` file
to make jshint stay silent on that.

### Directives

In the definition of a directive, if an object is used for the `scope` property
(*isolate scope*) then quotes must be used for the keys in that object. And in
the `link` function, the `[]` notation, instead of the `.` notation, must be
used when accessing scope properties. See the example below.

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
