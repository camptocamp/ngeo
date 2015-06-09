# Developer Guide

This document provides information for developers working on ngeo.

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

This section includes information for developers and users of ngeo.

### Style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html).

### Property renaming

The ngeo code is compiled with Closure Compiler in *advanced* mode. This
means we should conform to the restrictions imposed by the compiler.

In particular, Angular controllers and directives typically set properties on
the controller instance (`this`) or on the `$scope`. These properties are then
referenced by their names in HTML pages and templates. So it is required to
prevent the compiler from renaming these properties.

The way to do that is to use the `[]` notation rather than the `.` notation
when setting (and accessing) properties. For example if you need to set
a property `foo` on the controller instance you should do as follows:

```js
/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {
  this['foo'] = 'bar';
  // …
};
```

The jshint linter, which we use for to check the ngeo code, complains when the
`[]` notation is used. We set the `sub` jshint to `true` in a `.jshintrc` file
to make jshint stay silent on that.

### Property renaming and directives

In the definition of a directive, if an object is used for the `scope` property
(*isolate scope*) then quotes must be used for the keys in that object. And in
the `link` function, the `[]` notation, instead of the `.` notation, must be
used when accessing these properties. See the example below.

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
      controller: function() {
        var m = this['m'];
        // …
      },
      controllerAs: 'ctrl',
      bindToController: true,
      // …
    });
```

### Directive scoping

When creating a "widget" directive (i.e. directive with templates/partials) it
is usually recommended to use an *isolate* scope for the directive.

In the case of ngeo we want to be able to override directive templates at the
application level. And when overriding a directive's template one expects to be
able to use properties of an application-defined scope. This is not possible if
the template is processed in the context of an isolate scope.

So this is what ngeo "widget" directives should look like:

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: …
    // …
  };
};
```

We still use `scope: true` so that a new, non-isolate, scope is created for the
directive. In this way the directive will write to its own scope when adding
new properties to the scope passed to `link` or to the directive's controller.

Note that there's a chance that directive will hide properties from the parent
scope. This will happen if the directive uses a property name that is already
used in the parent scope. To mitigate the problem it is recommended that the
directive use only one scope property, with a specific name. It is recommended
to use a directive controller as follows:

```js
/**
 * @constructor
 * @param {angular.Scope} $scope The directive scope.
 * @ngInject
 * @export
 */
ngeo.NgeoFoobarController = function($scope) {
  $scope['foobarCtrl'] = this;
  this['prop1'] = …;
  this['prop2'] = …;
};


/**
 * @export
 */
ngeo.NgeoFoobarController.prototype.aMethod = function() {
  // …
};
```

Then the directive template uses `foobarCtrl.prop1`, `foobarCtrl.prop2`, and
`foobarCtrl.aMethod` to access to the scope property `prop1`, `prop2`, and
`aMethod`, respectively.

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

```js
goog.provide('ngeo.Location');
```

### Exports

Services that are objects (rather than numbers, strings, or functions) may need
"exports". Exports are needed for users of the `ngeo.js` standalone build.

For now we don't use the `@api` annotation as in OpenLayers. We explicitly use
`goog.exportProperty` in separate "exports" files. See the `exports` directory
in the repo.
