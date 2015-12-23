# Development guidelines

The purpose of this guideline is to help the developper to contribute in the
best way to `ngeo` and `gmf` cores.
It will describe the golbal philosophy of `ngeo` design, and set base rules to
apply when you want to add a new feature.

## Table of content

- [Main principle](#main-principle)
- [Google style guide](#google-style-guide)
- [Property renaming](#property-renaming)
- [Property renaming and directives](#property-renaming-and-directives)
- [API documentation](#api-documentation)
- [Custom  properties](#custom-olobject-properties)
- [Service typing](#service-typing)
- [Limit the use of ng-controller](#limit-the-use-of-ng-controller)
- [Use the controller-as syntax](#use-the-controller-as-syntax)
- [Use @export for controllers](#use-export-for-controllers)
- [Templating](#templating)
  - [In ngeo avoid template when not needed.](#in-ngeo-avoid-template-when-not-needed)
  - [In gmf you can use specific templates](#in-gmf-you-can-use-specific-templates)
  - [template vs templateUrl](#template-vs-templateurl)
  - [Template Url](#template-url)
  - [Template caching](#template-caching)
- [Directive scoping](#directive-scoping)
  - [In ngeo, prefer non-isolate scopes](#in-ngeo-prefer-non-isolate-scopes)
  - [In gmf isolate scopes are more appropriated](#in-gmf-isolate-scopes-are-more-appropriated)
- [Avoid two-way bindings when not needed](#avoid-two-way-bindings-when-not-needed)
  - [In templates](#in-templates)
  - [Through directive scopes](#through-directive-scopes)
- [Authoring examples](#authoring-examples)
- [Usage of the closure-library](#usage-of-the-closure-library)
  - [Use native javascript object methods instead](#use-native-javascript-object-methods-instead)
  - [Declaring an event](#declaring-an-event)
- [Watch your watchers!](#watch-your-watchers)


## Main principle
Before starting to code a new feature in `gmf`, you must determine if this feature
is 100% `gmf` specific, or if the feature is generic and could be added to `ngeo`
core. You also need to check in `ngeo` core and examples if you don't find
anything that could fit with your needs.

The main principle is to put everything you can in `ngeo`, and put in `gmf` only
what is specific.
When you develop into `gmf` contribs, you must consider that you are developing a
client application, and try your best to extract from your code all things that
could go into `ngeo`, and be shared with other projects.
You must not consider that `gmf` is a real part of `ngeo`, and that there is no real
importance to put your stuff into `ngeo` or `gmf` cores, it does.
This point is essential to be sure `ngeo` is going in the good direction:
maintainable, reusable, evolving.

In `ngeo`, we want to have very generic code that will be shared between `gmf` and
other web map applications. When you add some code in `ngeo`, you need to follow
some rules that helps the code to be easly usable and customisable.

## Google style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html).

## Property renaming

The ngeo code is compiled with Closure Compiler in *advanced* mode. This
means we should conform to the restrictions imposed by the compiler.

In particular, Angular controllers and directives typically set properties on
the controller instance (`this`) or on the `$scope`. These properties are then
referenced by their names in HTML pages and templates. So it is required to
prevent the compiler from renaming these properties.

The way to do that is to add the `@export` tag when declaring a variable;
this will tell the compiler to not rename the variable.
For example if you need to set a property `foo` on the controller instance
you should do as follows:

```js
/**
 * @constructor
 * @ngInject
 */
app.MainController = function() {

  /**
   * @type {string}
   * @export
   */
  this.foo = 'bar';
  // …
};
```

## Property renaming and directives

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

## API documentation

`ngeo` uses the [Angular-JSDoc](https://github.com/allenhwkim/angular-jsdoc)
plugin in addition to JSDoc to create the API documentation.

This plugin provides the `@ngdoc <type>` and `@ngname <name>` tags.
`@ngdoc` is used to define the Angular type (directive, service, controller
or filter) and `@ngname` defines the name used to register this component.

For example:
```js
/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoControl
 */
ngeo.controlDirective = function() {
  // …
};
ngeoModule.directive('ngeoControl', ngeo.controlDirective);
```


## Custom `ol.Object` properties

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

## Service typing

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
<body ng-controller="MainController as ctrl">
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

  /**
   * @type {string}
   * @export
   */
  this.title = 'Addition';

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
  <h2>{{ctrl.title}}</h2>
  <span>{{ctrl.add(2, 3)}}</span>
</div>
```

For this to work the `title` and `add` properties must exist on the controller
object. This is why the `app.MainController` constructor, the `add` method, and
the `title` property, are annotated with `@export`. The `@export` annotation
tells Closure Compiler to generate exports in the build for the annotated
functions, and to not rename the annotated properties.

Note that the compiler flags

```
"--generate_exports"
"--export_local_property_definitions"
```

are required for the Compiler to actually take the `@export` annotations into
account.

And remember to `@export` the constructor as well! If you just export the
method (`add` here) this is the code the compiler will generate for the export:

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

## Templating

### In `ngeo` avoid template when not needed.

For example, if you want to create a new directive for a button that will have
an action on click.
The bad way to write it in ngeo:

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    restricted: 'E',
    template: '<button ng-click="ctrl.doAction()" />',
    controllerAs: 'ctrl',
    ....
  }
};

/**
 * @constructor
 * @ngInject
 * @export
 */
ngeo.NgeoFoobarController = function() {
  this.doAction = function() {console.log('Action');}
};
```

Now the right approach:

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    restricted: 'A',
    ....
  }
};
```

You can then bind the click in from the controller of your directive :

```js
/**
 * @constructor
 * @param {angular.JQLite} $element Element.
 * @ngInject
 * @export
 */
ngeo.NgeoFoobarController = function($element) {
  $element.on('click', function() {console.log('Action');});
};
```

Or from the link function of your directive:

```js
link:
  /**
   * @param {!angular.Scope} scope Scope.
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @param {!Array.<!Object>} ctrls Controllers.
   */
  function(scope, element, attrs, ctrls) {
    element.on('click', function() {console.log('Action');});
};
```

In the second case, the directive has no template and is restricted to the
attribute declaration. It will just add custom behavior to the HTML element
it's attached to.
Try to create directive in this perspective the more you can when you are
in `ngeo`.

This example of the `<button>` tag could be extended to the use of `<select>`
`<options>` `<a href="">` or any other HTML tags.

### In `gmf` you can use specific templates

In `gmf`, if you are sure that all the UIs will use the exact same HTML view,
you can add templates to your directives, even small templates that just define
a button.

Generally, if your widget could be in `ngeo`, you have to create a new directive
with no template in `ngeo`, then to avoid to have too much HTML in the main
`gmf` view, you can create a new directive in `gmf` on top of the `ngeo` one, that
will just define a template including the `ngeo` directive.

For example, the `gmf` directive `gmf-layertree` will declare a template that will
include the `ngeo-layertree` directive.

```js
/**
 * @return {angular.Directive} The directive Definition Object.
 * @ngInject
 */
gmf.layertreeDirective = function() {
  return {
    ...
    template:
        '<div ngeo-layertree="gmfLayertreeCtrl.tree" ' +
        'ngeo-layertree-map="gmfLayertreeCtrl.map" ' +
        'ngeo-layertree-nodelayer="gmfLayertreeCtrl.getLayer(node)" ' +
        'ngeo-layertree-templateurl="' + gmf.layertreeTemplateUrl + '"' +
        '<div>'
  };
```

In general, when creating a new directive in `gmf`, you must rely as much as
possible on `ngeo` core directives. For example in the layertree, it would
make no sense to create a new directive from scratch, you must rely on `ngeo`
layer tree.

Taking care of this point will help you to create more generic directives
in `ngeo`.

### template vs templateUrl

The only technical reason to use `templateUrl` instead of `template` is that the
template doesn't support i18n.

It's up to you to determine if the template is simple enough to be written
inline in the directive code with the `template` attribute.

If the template looks too complex, please put it in an extern file and use the
`templateUrl` attribute to point on it. In that case, the path of the template
file should follow the following rule:

All directives templates must be stored in the sub `partials/` folder of the
directive folder:
- `src/directives/partials` for `ngeo` directives.
- `contribs/gmf/src/directives/partials` for `gmf` directives.

### Template URL

First of all the partials should be in the folder `src/directives/partials`.

When we use a template URL it should be overwritten by an attribute.

For that we should use this kind of code:

```js
ngeoModule.value('ngeo<Name>TemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeo<Name>Templateurl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseTemplateUrl + '/<name>.html';
    });

ngeo.<name>Directive = function(ngeo<Name>TemplateUrl) {
    return {
        templateUrl: ngeo<Name>TemplateUrl,
        ...
```

Where `<Name>` is the directive name in title case and `<name>` in lower case.

It can be adapted for `contrib/gmf` by replacing `ngeo` by `gmf`.

Note that the default template of a `ngeo` directive can be overloaded in 2 ways:
- Send the template url via dom attributes. This will overload the template for
the instance of the directive that is defined in the HTML.
- Overload the angular value `ngeo<Name>TemplateUrl`. This will have effect on
all instances of the directive.

### Template caching

External directive template files are resolved by angular with a http request
to the path defined by the `templateUrl` attribute. In avdanced build mode, we
don't want the application to call http requests to resolve templates, so we
store them in the `templateCache`. Watch [AngularJs doc](https://docs.angularjs.org/api/ng/service/$templateCache).

Two template caches are generated during build through two different targets:
- one for `ngeo` that will contain all template files of `ngeo` directives.
- one for `gmf` that will contain both all template files from `ngeo` and `gmf`
directives.

Those generated files are attached to the build of `ngeo` and `gmf` distribs.

For this to work in any case (examples, applications, built or not), just refer
the `templateUrl` as a relative path to the directive. The definition of the
variable `ngeo.baseTemplateUrl` and `gmf.baseTemplateUrl` will resolve,
depending on the case, the correct paths.

## Directive scoping

### In `ngeo`, prefer non-isolate scopes

When creating a "widget" directive (i.e. directive with templates/partials) it
is usually recommended to use an *isolate* scope for the directive.

In the case of `ngeo` we want to be able to override directive templates at the
application level. And when overriding a directive's template one expects to be
able to use properties of an application-defined scope. This is not possible if
the template is processed in the context of an isolate scope.

So this is what `ngeo` "widget" directives should look like:

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

Note that even with a `scope: true` definition, a directive can take benefit
of the `bindToController` and `controllerAs` declarations.
Even with a non-isolate scope, you can bind attributes variable to the
directive controller (as the isolate scope does). For this, you need to use
the `bindToController` as an object for mapping definitions:

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    restrict: 'A',
    scope: true,
    bindToController: {
     prop1: '='
    },
    controllerAs: 'myCtrl',
    templateUrl: …
    // …
  };
};
```

Here the `prop1` property of the parent scope will be bound to the `prop1`
property of the directive controller.

### In `gmf` isolate scopes are more appropriated

In `gmf`, you are pretty sure of what template you want to bind to your directive.
Regarding this point, you are not under the constraint not to use an `isolate
scope`.


## Avoid two-way bindings when not needed

### In templates

In angularJs, `$scope` values are mapped to HTML view through expressions.
Add `::` at the beginning of the expression to mark it as a single evaluated
expression. Once the expression is evaluated and resolved, the watchers are removed and the
expression won't be evaluated again.

See [AnguarJs doc](https://docs.angularjs.org/guide/expression#one-time-binding).

### Through directive scopes

Be carefull when you use isolate scope and `bindToController` objects to pass
variable through scope inheritance.

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    scope: {
      foo: '='
    }
```

A declaration like the one above with the symbol `'='` will create an isolate
scope for the directive and
will create a two-way data bindings between the isolate scope `foo` property
and the `$parent` scope property whose name is given in `foo` HTML attribute.

It's important to note that they don't share the same reference, but both are
watched and updated concurrently. AngularJs adds `$watchers` each time you
have a two-way bindings pattern in your application. As mentionned before, this
should be avoided when not needed.

Here the way to get a one time binding when using `scope` or `bindToController`
as an object:

```js
/**
 * @return {angular.Directive} Directive Definition Object.
 */
ngeo.foobarDirective = function() {
  return {
    scope: {
      fooFn: '&'
    }
    // …
};

/**
 * @constructor
 * @param {angular.Scope} $scope The directive's scope.
 * @ngInject
 * @export
 */
ngeo.NgeoFoobarController = function($scope) {
  var foo = $scope['fooFn']();
};
```

In this example we tell Angular to create a function `fooFn` that evaluates
the expression in the context of the parent/user scope. There is no binding,
just an expression, and we get the `foo` variable only once.

Note:
- if you need consistency, of course use the `'='` symbol.
- if you need a one time binding to a string, use the `'&'` symbol.

## Authoring examples

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

## Usage of the closure-library

For applications compiled together with ngeo, OpenLayers, and Closure Compiler
the `goog` functions and objects should sometimes be preferred.

For example, `goog.isDef` should be preferred over `angular.isDefined`. When
using `goog.isDef` Closure Compiler will remove the call to `goog.isDef` and
use code that is much smaller. In contrast, `angular.isDefined` is defined in
the Angular externs file so it won't be changed by the compiler.

But there are some exceptions, see [ol3 guidelines](https://github.com/openlayers/ol3/blob/master/CONTRIBUTING.md#follow-openlayers-3s-coding-style)
about the usage of `goog` in openlayers3 project. We want to follow those
guidelines in `ngeo` as well.

### Use native javascript object methods instead

```js
 Array.prototype.lastIndexOf
 Array.prototype.every
 Array.prototype.some
 Array.prototype.forEach
 Array.prototype.map
 Array.prototype.filter

 Object.prototype.keys
```

### Declaring an event

When you declare an event on ol3 object, please use
- the `goog.events.listen` function
- the ol3 constant to identify the event

This is wrong:

```js
this.geolocation_.on('change:accuracyGeometry', function() {
  ...
});
```

This is the correct syntax:

```js
goog.events.listen(this.geolocation_,
  ol.Object.getChangeEventType(ol.GeolocationProperty.ACCURACY_GEOMETRY),
  function() {
  }, false, this);
```

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
