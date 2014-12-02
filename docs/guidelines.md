# App Development Guidelines

These are guidelines for `ngeo` application developers.

## Google style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html).

## Limit the use of `ng-controller`

Use one `ng-controller` only, the "main controller", somewhere at the root of
the DOM tree, at the `<html>` element for example.

And instead of `ng-controller` instances use application-specific directives,
and store the directive-specific data in the directive itself. For that, use
a directive controller, with `controllerAs` and `bindToController`.

[The `permalink`
example](https://github.com/camptocamp/ngeo/tree/master/examples/permalink.js)
shows how to create an application-specific map directive wrapping the
`ngeo-map` directive.

The "main controller" is where we create the application's `map` instance,
which we store in the controller itself (`this`) or in the controller's scope
(`$scope`).

See [this blog
post](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html)
for explanations on why using many `ng-controller` instances may cause trouble.

## Use the `controller as` syntax

When `ng-controller` is used in the HTML code it is recommended to use
the `controller as` syntax. For example:

```html
<body ng-controller="MainController as crtl">
  …
  …
  <button ngeo-btn class="btn btn-success" ng-model="ctrl.drawPoint.active">Point</button>
```

In this way it is clear by reading the HTML that the `drawPoint` interaction is
defined in the `MainController`.

See [this blog
post](http://toddmotto.com/digging-into-angulars-controller-as-syntax/) for
more details.

## Use `@export` for controllers

So following the
[angularjs-google-style](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
controllers are written as classes, and controller functions should be defined
on the constructor prototype.

Here is an example:

```js
/**
 * Application main controller.
 *
 * @param {!angular.Scope} $scope Scope.
 * @constructor
 * @ngInject
 * @export
 */
app.MainController = function($scope) {
  // …
};


/**
 * @param {number} a
 * @param {number} b
 * @return {number} Result.
 * @export
 */
app.MainController.prototype.add = function(a, b) {
   return a + b;
};


angular.module('MainController', app.MainController);
```

And this is the template:

```html
<div ng-controller="MainController as ctrl">
  <span>{{ctrl.add(2, 3)}}</span>
</div>
```

For this to work the `add` property must exist on the controller prototype.
This is why the `app.MainController` and `add` functions are annotated with
`@export`. The `@export` annotation tells Closure Compiler to generate exports
in the build for the annotated functions.

Note that compiler flag

```
"--generate_exports"
```

is required for the Compiler to actually generate exports!

And remember to `@export` the constructor as well! If you just export the
method this is the code the compiler will generate for the export:

```js
t("app.MainController.prototype.add",cw.prototype.d)
```

`t` is actually `goog.exportSymbol` here (renamed). What this function does
is basically the following:

```js
app = {};
app.MainController = {};
app.MainController.prototype = {};
app.MainController.prototype.add = cw.prototype.d;
```

which does not help. If the constructor is `@export`'ed as well this is
what the compiler will generate:

```js
t("app.MainController",cw);
cw.prototype.add=cw.prototype.d;
```

which looks much better!

## Watch your watchers!

Angular runs something called a *digest cycle*. This digest cycle is a loop
through the application's bindings (or *watchers*) that checks if values have
changed. The more watchers the slower the digest cycle!

Angular 1.3 has introduced the concept of *one-time binding*. With one-time
binding the data is rendered once and then persisted and not affected by future
updates to the model.

This is the one-binding syntax:

```html
<h1>{{ ::title }}</h1>
```

It is important to use one-time binding when possible!

There are other techniques to reduce the number of watchers in Angular
applications. [This blog
post](http://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations/135)
provides a very good overview.

ngeo [includes](../utils/watchwatchers.js) a JavaScript script that can be used
to watch the number of watchers in an Angular application. Look at this file to
know how to use it.

## Use `goog`

For applications compiled together with ngeo, OpenLayers, and Closure Compiler
the `goog` functions and objects should always be preferred.

For example, `goog.isDef` should be preferred over `angular.isDefined`. When
using `goog.isDef` Closure Compiler will remove the call to `goog.isDef` and
use code that is much smaller. In contrast, `angular.isDefined` is defined in
the Angular externs file so it won't be changed by the compiler.
