# Development guidelines

The purpose of this guideline is to help the developer to contribute in the
best way to `ngeo` and `gmf` cores.
It describe the global philosophy of `ngeo` design, and set base rules to
apply when you want to add a new feature.

You are free to read and fork this library. But you must know that we have currently no time to handle issues
or PR from persons outside of Camptocamp customers or developers.


## Table of content

- [Main principle](#main-principle)
- [Coding style guide](#coding-style-guide)
- [Main changes in the code between ngeo 2.2 and 2.3](#main-changes-in-the-code-between-ngeo-22-and-23)
- [AngularJS names ](#angularJS-names)
- [Module management](#module-management)
- [Good practices on components creation](#good-practices-on-components-creation)
- [Limit the use of ng-controller](#limit-the-use-of-ng-controller)
- [Templating](#templating)
  - [In `ngeo` avoid template when not needed](#in-ngeo-avoid-template-when-not-needed)
  - [Template vs templateUrl](#template-vs-templateUrl)
  - [Template URL](#template-url)
- [Watch your watchers!](#watch-your-watchers)
- [Declaring an event](#declaring-an-event)
- [Styling](#styling)
  - [CSS class names convention](#css-class-names-convention)
  - [Styling with sass](#styling-with-sass)
- [Property renaming](#property-renaming)
  - [Exports vs private elements](#exports-vs-private-elements)
  - [Object typing](#object-typing)
- [API documentation](#api-documentation)


## Main principle
Before starting to code a new feature in `gmf`, you must determine if this feature
is 100% `gmf` specific, or if the feature is generic and could be added to `ngeo`
core. You also need to check in `ngeo` core and examples if you don't find
anything that could fit with your needs.

The main principle is to put everything you can in `ngeo`, and put in `gmf` only what is specific.
When you develop into `gmf` contribs, you must consider that you are developing a
client application, and try your best to extract from your code all things that
could go into `ngeo`, and be shared with other projects.
You must not consider that `gmf` is a real part of `ngeo`, and that there is no real
importance to put your stuff into `ngeo` or `gmf` cores, it does.
This point is essential to be sure `ngeo` is going in the good direction:
maintainable, reusable, evolving.

In `ngeo`, we want to have very generic code that is shared between `gmf` and
other web map applications. When you add some code in `ngeo`, you need to follow
some rules that helps the code to be easly usable and customisable.


## Coding style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](https://google.github.io/styleguide/angularjs-google-style.html).

We also use ES6 coding standards.


## Main changes in the code between ngeo 2.2 and 2.3

With Webpack, some things have changed between the current ngeo 2.3 version, and the last ones.

- Functions from the goog library are no more allowed.
- We export only one object per file. (That also means that we have split some files in multiple files).
- We must have no more global value in the attached to the window (except in some very rare cases).
- All AngularJS elements are now in a small module (see below in this documentation).
- All modules import only what they need to work. No less, no more.


## AngularJS names

Be as logical as possible.  In the previous example, the AngularJS name should be `ngeoExampleSearch`. For
a service in `contribs/gmf/src/sample/MyService.js`, the name must be `GmfSampleMyservice`.

Don't change a name after it's chosen. Because that change the html in the code of all user of ngeo !


## Module management

Since ngeo 2.3, every elements are grouped by functionality (there is no more gloables `directive`,
nor `service` directories). That also means that every element provide it's own AngularJS module; we no more
link all elements to a global `ngeo` or `gmf` module.

That means that in every file where we want to provide something to AngularJS, we need to create an
AngularJS module, and this module must require all modules it needs to work. And then, we declare
AngularJS `component`, `service`, etc from this module. Example:

```js
import ngeoMyRequiredService from 'ngeo/myrequired/service.js'

/**
 * @type {!angular.IModule}
 */
const module = angular.module('ngeoExampleService', [
  ngeoMyRequiredService.name
]);
module.service('ngeoExampleService', exports);
export default module;
```

You can see that we stock the module in a `module` variable on the class. For Component, we prefers to stock
the module in the value we export directly like:

```js

/**
 * @type {angular.IModule}
 */
exports = angular.module('ngeoExample', [...]);

module.value(...);
module.component(the_component);
export default module;
```

To be able to require a whole functionality at once, we always create a `module.js` file in each directories.
This file always create and provide a module that require all the modules of folder.


## Good practices on components creation

 - Never create an old `directive` element, use `component` instead.
 - Don't name your controller, in your partial, use the `$ctrl` notation instead.
 - Don't use the `&` binding notation to have a one-time binding. In your html, use `::` instead.
 - Don't forget to initialize your component's bindings in the $onInit function.
 - Use a function that takes an url as argument to provide your templateUrl.

Example of a component:

```js
const myComponent = {
  bindings: {
    'map': '<ngeoExampleMap'
  }
  controller: ngeoMyComponentController,
  templateUrl: ngeoMyComponentTemplateUrl
};
```

## `$injector` usage

`$injector` should be used only for the optional requirements.
The only exception is for the abstract controllers (in `gmf/controleurs`) to ease upgrade.

## Limit the use of `ng-controller`

Use one `ng-controller` only, the "main controller", somewhere at the root of
the DOM tree, at the `<html>` element for example.

And instead of `ng-controller` instances use application-specific components,
and store the component-specific data in the component itself, within its controller.

The "main controller" is where we create the application's shared object instances
which we store in the controller itself (`this`) or in the controller's scope (`$scope`).

See [this blog
post](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html)
for explanations on why using many `ng-controller` instances may cause trouble.

### In `ngeo` avoid template when not needed

For example, if you want to create a new small component with only an action on click. It's preferable to
avoid to have a specific template. it can be preferable to add the action on the content of your element:

```js
  /**
   * Function in a controller, that injects its own element.
   * @param {JQuery} element Element.
   */
  function(element) {
    element.on('click', function() {console.log('Action');});
  };
```

It adds custom behavior to the HTML element it's attached to. that allows the integrator to bind this
action on the element it wants (a `button`, a `select`, and so on).
Try to create components in this perspective the more you can when you are in `ngeo`.

### Template vs templateUrl

The technical reason to use `templateUrl` instead of `template` is that the template doesn't support
i18n and it can't be overridden.

It's up to you to determine if the template is simple enough to be written inline in the template code with
the `template` attribute. But it most case, please, put it in an extern file and use the `templateUrl`
attribute to point on it. In that case, the path of the template file should follow the following rule:

### Template URL

When we use a template URL it should be overwritten by an attribute.
For that we should use this kind of code:

```js
module.value('ngeoModuleComponentTemplateUrl',
    /**
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function($element, $attrs) {
      const templateUrl = $attrs['ngeoNameComponentTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
        'ngeo/module/component';
    });

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('ngeo/module/component', require('./component.html'));
});

/**
 * @param {!JQuery} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQuery, !angular.IAttributes): string} gmfDisplayquerywindowTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @hidden
 */
function gmfDisplayquerywindowTemplateUrl($element, $attrs, ngeoModuleComponentTemplateUrl) {
  return gmfDisplayquerywindowTemplateUrl($element, $attrs);
}

/*
 * @ngdoc component
 * @ngname ngeoModuleComponent
 */
module.component_ = {
  templateUrl: ngeoModuleComponentTemplateUrl
}

```

It can be adapted for `contrib/gmf` by replacing `ngeo` by `gmf`, module by the right one, and so on.

Note that the default template of a `ngeo` component can be overloaded in 2 ways:
- Send the template url via dom attributes. This will overload the template for
  the instance of the component that is defined in the HTML.
- Overload the angular value `ngeoModuleComponentTemplateUrl`. This will have effect on
  all instances of the component.


## Watch your watchers!

Be careful when you use isolate scope (`bindings` or `scope`) objects to pass
variable through scope inheritance.

```js
const component = {
  bindings: {
    foo: '='
  },
  ...
```

A declaration like the one above with the symbol `'='` create an isolate
scope for the component and create a two-way data bindings between the isolate scope `foo`
property and the `$parent` scope property whose name is given in `foo` HTML attribute.

It's important to note that they don't share the same reference, but both are
watched and updated concurrently. AngularJs adds `$watchers` each time you
have a two-way bindings pattern in your application. As mentioned before, this
should be avoided when not needed.

In angularJs, `$scope` values are mapped to HTML view through expressions.
Add `::` at the beginning of the expression to mark it as a single evaluated
expression. Once the expression is evaluated and resolved, the watchers are removed and the
expression won't be evaluated again.

See [AnguarJs doc](https://docs.angularjs.org/guide/expression#one-time-binding).

The is the one-binding syntax:

```html
<ngeo-bar-foo="::a_property"></ngeo-bar-foo>
```

There are other techniques to reduce the number of watchers in Angular applications. [This blog
post](http://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations/135)
provides a very good overview.


## Declaring an event

When you declare an event on ol3 object, please use
- the `ol.events.listen` function
- the ol3 constant to identify the event

This is wrong:

```js
this.geolocation_.on('change:accuracyGeometry', function() {
  ...
});
```

This is the correct syntax:

```js
import {getChangeEventType} from 'ol/object.js';
import {ACCURACY_GEOMETRY} from 'ol/GeolocationProperty.js';
import {listen} from 'ol/events.js';

listen(this.geolocation_, getChangeEventType(ACCURACY_GEOMETRY), () => {
  ...
});
```


## Custom `ol.Object` properties

OpenLayers allows passing custom properties to classes inheriting from
`ol.Object`. For example:

```js
let layer = new olLayerTile({
  maxResolution: 5000,
  title: 'A title',
  source: new olSourceOSM()
});
```

`title` is the custom property in this example. (While `maxResolution` is an ol built-in layer property.)
You can then use the `get` methods to get that property's value:

```js
let layerTitle = layer.get('title');
```

**But** this won't work in the case of the ngeo, or any code compiled in with
Closure Compiler in ADVANCED mode. The compiler is indeed going to rename the
key `title` in the options object passed to the `olLayerTile` constructor.

One option to work-around the issue involves using the `set` method after
the construction of the layer:

```js
let layer = new olLayerTile({
  maxResolution: 5000,
  source: new olSourceOSM()
});
// use `set` to set custom layer properties
layer.set('title', 'A title');
```


## Styling

If your component have an associated `scss` file, add it next to the component, with the same name (for
`mycomponent.js` file, you should have a `mycomponent.scss` file). Then, don't require it directly in your
component, leave this to the final application.

### CSS class names convention

CSS class names, in both ngeo and gmf, follow a set of rules that determines their value.  A CSS class name:

 * always begins with the `ngeo-` or `gmf-` prefix depending on its origin
 * always begins with the name of the component in which it is defined, for example in a layer tree
   component in gmf, a name starts with `gmf-layertree`, like `gmf-layertree-name`, `gmf-layertree-node`,
   `gmf-layertree` (for the main `<div>`), etc.

In the gmf applications, CSS class names should begins with `gmf-app`.

In partial, you should avoid using `ìd` with a combination of `document.getElementById` because it's always
possible to have multiple instances of your component, and so multiple identical ids ! Instead, define
a unique CSS class name, inject the `$element` service in your controller and use Angular jqLite selector
to get the element needed.

### Styling with sass

To be able to do calculations directly with sass we encourage to use a subset of the CSS units.
We choose units that don't depend on parent tags and are relative.

 * rem: 1 rem is the font size of the root element (<html>).
 * vw: 1 vw is 1/100th of the width of the viewport.
 * vh: 1 vh is 1/100th of the height of the viewport.


## Property renaming

:warning: The ngeo code **was** compiled with Closure Compiler in *advanced* mode. We don't use it anymore but we want to keep the same restrictions imposed by the compiler for now.

### Exports vs private elements

In particular, Angular controllers and components typically set properties on
the controller instance (`this`) or on the `$scope`. These properties are then
referenced by their names in HTML pages and templates. So it is required to
prevent the compiler from renaming these properties.

The way to do that is to add the right tag on each variable, function and class.
 -  `@private`: With a final underscore (`this.my_private_variable_`) tell the compiler to rename it with a
    name not understainable outside of the current file.
 -  And nothing, without final underscore, if the element is used freely in the code, but never in the html.

### Object typing

For each custom object we define in ngeo we must provide a type for the compiler.
You can define your owns in the `src/options/js` or (equivalent in the contribs section).

It's the same thing for objects that come from an external library, or from a server's response. In this case,
That's an `extern` and it can be defined in the `externs/<source>.js`.

Provided class or function with `@constructor` are usable as a type.

Take a look to these file to know how to write your owns.


## API documentation

/!\ The doc generated by JS-DOC is not really usable for now in version 2.3. Please, read the documentation
directly in the code or in a previous version of ngeo.

`ngeo` uses the [Angular-JSDoc](https://github.com/allenhwkim/angular-jsdoc)
plugin in addition to JSDoc to create the API documentation.

This plugin provides the `@ngdoc <type>` and `@ngname <name>` tags.
`@ngdoc` is used to define the Angular type (component, service, controller
or filter) and `@ngname` defines the name used to register this component.

For components the used HTML attributes are declared with `@htmlAttribute {<type>} <name> <description>.`.

The usage of a component should be shown with an example.

For example:
```js
/**
 * Description.
 *
 * Example of implementation:
 *
 *      <ngeo-misc
 *       ngeo-misc-map="ctrl.map">
 *      </example>
 *
 * @htmlAttribute {import("ol/Map.js").default} ngeo-misc-map The map.
 * @ngInject
 * @ngdoc component
 * @ngname ngeoControl
 */
const my_component = function() {
  // …
};
module.component('ngeoMisc', my_component);
```
