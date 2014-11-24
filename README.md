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

### Style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html).

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

### Custom `ol.Object` properties

OpenLayers 3 allows passing custom properties to classes inheriting from
`ol.Object`. For example:

```js
var layer = new ol.layer.Tile({
  maxResolution: 5000,
  title: 'A title',
  source: new ol.source.OSM()
});
```

`title` is the custom property in this example. (While `maxResolution` is an
ol3 built-in layer property.)

You can then use the `get` methods to get that property's value:

```js
var layerTitle = layer.get('title');
```

**But** this won't work in the case of the ngeo, or any code compiled in with
Closure Compiler in ADVANCED mode. The compiler is indeed going to rename the
key `title` in the options object passed to the `ol.layer.Tile` constructor.

One option to work-around the issue involves using the `set` method after
the construction of the layer:

```js
var layer = new ol.layer.Tile({
  maxResolution: 5000,
  source: new ol.source.OSM()
});
// use `set` to set custom layer properties
layer.set('title', 'A title');
```

### Authoring examples

A number of constraints must be respected when developing examples for `ngeo`.

As described above the `gh-pages` make target can be used to publish the
examples to github.io. The examples published on github.io are not compiled,
they rely on the standalone `ngeo.js` build.

Because of that the examples cannot rely on non-exported symbols or properties.
For example they cannot use `goog` objects and they cannot use `ol` objects
that are not part of the OpenLayers API (that is marked with `@api` in the
OpenLayers source code).

There's one exception to the rule: the examples (must) use `goog.provide` and
`goog.require`. This is necessary for running the examples in development mode
and for compiling them (see below). The `goog.provide` and `goog.require`
statements are removed before publication of the examples on github.io.

Even though the examples are not compiled on github.io the `check` target does
compile them, as a verification step. This means that the examples must use
compiler annotations and respect the constraints imposed by the compiler.

### Service typing

`ngeo` defines Angular services. They're located in the `src/services`
directory. Angular services may be of any type : objects, functions, etc.

For each type we define in `ngeo` we must provide a type. This allows having
a type for `@param` when using (injecting) an `ngeo` service in a function.

If the service is a function the type will be defined using a `@typedef`.
For example:

```js
/**
 * @typedef {function(ol.layer.Layer)}
 */
ngeo.DecorateLayer;
```

If the service is an object a `@constructor` must be defined. For example:

```js
/**
 * The ngeo Location type.
 * @constructor
 * @param {Location} location Location.
 * @param {History} history History.
 */
ngeo.Location = function(location, history) {
  /**
   * @type {History}
   * @private
   */
  this.history_ = history;

  /**
   * @type {!goog.Uri}
   * @private
   */
  this.uri_ = goog.Uri.parse(location);
};
```

And in both cases a `goog.provide` must be added for the type. For
example:

```js
goog.provide('ngeo.DecorateLayer');
```

### Exports

Services that are objects (rather than numbers, strings, or functions) may need
"exports". Exports are needed for users of the `ngeo.js` standalone build.

For now we don't use the `@api` annotation as in OpenLayers. We explicitly use
`goog.exportProperty` in separate "exports" files. See the `exports` directory
in the repo.
