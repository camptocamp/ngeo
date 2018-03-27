# Development guidelines

The purpose of this guideline is to help the developper to contribute in the
best way to `ngeo` and `gmf` cores.
It describe the golbal philosophy of `ngeo` design, and set base rules to
apply when you want to add a new feature.

You are free to read and fork this library. But you must know that we have currently no time to handle issues
or PR from persons outside of Camptocamp customers or developpers.

## Table of content

- [Main principle](#main-principle)
- [Style guide](#style-guide)
- [Webpack](#webpack)
  - [Run the application](#run-the-application)
  - [Main changes in our manner to code](#main-changes-in-our-manner-to-code)
  - [Webpack - no-webpack code parts](#webpack---no-webpack-code-parts)
- [Exports and symbols names](#exports-and-symbols-names)
- [AngularJS names ](#angularJS-names)
- [Module management](#module-management)
- [Property renaming](#property-renaming)
- [Object typing](#object-typing)
- [Good practices on components creation](#good-practices-on-components-creation)
- [Limit the use of ng-controller](#limit-the-use-of-ng-controller)
- [Templating](#templating)
  - [In `ngeo` avoid template when not needed](#in-ngeo-avoid-template-when-not-needed)
  - [Template vs templateUrl](#template-vs-templateUrl)
  - [Template URL](#template-url)
- [Watch your watchers!](#watch-your-watchers)
- [API documentation](#api-documentation)
- [Declaring an event](#declaring-an-event)
- [CSS class names convention](#css-class-names-convention)
- [Styling with less](#styling-with-less)

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

## Style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](https://google.github.io/styleguide/angularjs-google-style.html).

We also use ES6 coding standards.

## Webpack

In ngeo 2.3, we still use google-closure to check our code and build the applications in the
`contribs/gmf/apps` folder. But we are also ready to use webpack, and examples can't be used anymore without
it.

### Run the application

If you want to run the applications, check, or lint the code, you can still do a simple `make <target>`.

If you want to test the examples, check, or lint the code with webpack, you must transform it:
```
npm install https://api.github.com/repos/openlayers/openlayers/tarball/bfae19c7e138533ad0c1a071d8886d55aac9bd35
buildtools/webpack-migration
```

/!\The OpenLayers version above can be outdated.
You can see in the `travis.yaml` file how it's done (JOB=webpack).
Also, if you use the non-webpack version again, you must reinstall the version of openlayers described in your
`package.json`.

Then, to run your application, use `npm run serve-ngeo-examples`, `npm run serve-gmf-examples`, or `npm run serve-gmf-apps` (as defined
in the `script` block of your `package.json`).

To know more, see the [webpack documentation](https://webpack.js.org) and our configuration in the
`webpack.config.js` file.

### Main changes in our manner to code

- Functions from the goog library are not more allowed.
- We must have only one provide per file and this file effectively provide one only object.
- We must have no more global value in the attached to the window (except in some very rare cases).
- All AngularJS elements of are now in a small modules (see below in this documentation).
- All modules require only what they need to work. not less, not more.

### Webpack - no-webpack code parts

The `buildtools/webpack-migration` script automatically transforms a lot of things for us, and so, the code is
ready to use in webpack. But in some case, we can't transforms the code automatically. That's why you can
see sometimes the following `no-webpack` or `webpack` comments:

```js
const no_webpack_code = "This code part will be removed after the transformation" // no-webpack
// webpack const webpack_code = "This code part will be uncommented after the transformation"
```

## Exports and symbols names

The name provided by a goog.provide in named `symbol`.

The naming of a symbol is determinated by it's own location. For example, a component located in
`ngeo/src/example/search.js` must provide a `ngeo.example.search` symbol.

A file must provide only one symbol per file. and inside a file, only on element must be linked to this symbol.
Because after the webpack transformation, all elements with the name of the symbol is transformed to export.
Example:

```js
goog.provide('ngeo.example.search');

ngeo.example.search = my_element;

ngeo.example.foo = my_wrong_element;
```

In this case, `ngeo.example.search` become `exports` after the webpack transformation and will be usable.
The `ngeo.example.foo` will be not renamed and won't pass the check because otherwise, it would become a
global "flying freely" value in the code.

If you are in this situation, you can create a file per element, use the element as a variable (
`const ngeo.example.foo`, or attach the `foo` value to the `ngeo.example.search` element).

## AngularJS names

Be as logical as possble.  In the prvious example, the AngularJS name should be `ngeoExampleSearch`. For
a service in `contribs/gmf/src/sample/MyService.js`, the name must be `GmfSampleMyService`.

Don't change a name after it's choosed. Because that change the html in the code of all user of ngeo !

## Module management

Since ngeo 2.3, every elements are grouped by functionnality (there is no more gloables `directive`,
nor `service` directories). That also means that every element provide it's own AngularJS module; we no more
link all elements to a global `ngeo` or `gmf` module.

That means that in every file we need to create am AngularJS module, and this module must require all modules
it need to work. And then, we declare AngularJS `component`, `service`, etc from this module. Example:

```js
goog.provide('ngeo.example.Service');

/**
 * @type {!angular.Module}
 */
ngeo.example.Service.module = angular.module('ngeoExampleService', [
  ngeo.my_required_module.Service.module.name
]);
ngeo.example.Service.module.service('ngeoExampleService', ngeo.example.Service);
```

You can see that we stock the module in a `module` variable on the class. For Component, we prefers to stock
the module in the value we export directly like:

```js
goog.provide('gmf.authentication.component');

/**
 * @type {angular.Module}
 */
gmf.authentication.component = angular.module('gmfAuthentication', [...]);

gmf.authentication.component.value(...);
gmf.authentication.component.component(the_component);
```

To be able to require a whole functionality at once, we always create a `module.js` file in each directories.
This file always create and provide a module that require all the modules of folder.

## Property renaming

The ngeo code is compiled with Closure Compiler in *advanced* mode. This
means we should conform to the restrictions imposed by the compiler.

In particular, Angular controllers and components typically set properties on
the controller instance (`this`) or on the `$scope`. These properties are then
referenced by their names in HTML pages and templates. So it is required to
prevent the compiler from renaming these properties.

The way to do that is to add the right tag on each variable, function and classe.
 -  `@export`: this tell the compiler to not rename the element (and so it is usable in the html).
 -  `@private`: With a final underscore (`this.my_private_variable_`) tell the compilier to rename it with a
    name not understainable outside of the current file.
 -  And nothing, without final underscore, if the element is used freely in the code, but never in the html.

## Object typing

For each custom object we define in ngeo we must provide a type for the compiler.
You can define your owns in the `src/options/ngeox.js` or (equivalent in the contribs section).

It's the same thing for object that come from an external library, or from a server's response. In this case,
That's an `extern` and it can be defined in the `externs/<source>.js`.

Provided class or function with `@constructor` are usable as a type.

Take a look in these file to know owe to write your own.

## Good practices on components creation

 - Never create a old `directive` element, use `component` instead.
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
   * @param {angular.JQLite} element Element.
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
ngeo.module.component.value('ngeoModuleComponentTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function($element, $attrs) {
      const templateUrl = $attrs['ngeoNameComponentTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
        `${ngeo.baseModuleTemplateUrl}/module/component.html`; // nowebpack
        // webpack: 'ngeo/module/component';
    });

// webpack: exports.run(/* @ngInject */ ($templateCache) => {
// webpack:   $templateCache.put('ngeo/module/component', require('./component.html'));
// webpack: });

/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} gmfDisplayquerywindowTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfDisplayquerywindowTemplateUrl($element, $attrs, ngeoModuleComponentTemplateUrl) {
  return gmfDisplayquerywindowTemplateUrl($element, $attrs);
}

/*
 * @ngdoc component
 * @ngname ngeoModuleComponent
 */
ngeo.module.component.component_ = {
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
ngeo.bar.component = {
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
have a two-way bindings pattern in your application. As mentionned before, this
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

ngeo [includes](../utils/watchwatchers.js) a JavaScript script that can be used
to watch the number of watchers in an Angular application. Look at this file to
know how to use it.

## API documentation

/!\ The doc generated by JS-DOC is not really usable for now in version 2.3. Please, read the documntation
directly in the code or in a previous version of ngeo.

`ngeo` uses the [Angular-JSDoc](https://github.com/allenhwkim/angular-jsdoc)
plugin in addition to JSDoc to create the API documentation.

This plugin provides the `@ngdoc <type>` and `@ngname <name>` tags.
`@ngdoc` is used to define the Angular type (component, service, controller
or filter) and `@ngname` defines the name used to register this component.

For component the used HTML attributes are declared with `@htmlAttribute {<type>} <name> <description>.`.

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
 * @htmlAttribute {ol.Map} ngeo-misc-map The map.
 * @ngInject
 * @ngdoc component
 * @ngname ngeoControl
 */
const my_component = function() {
  // …
};
ngeo.misc.component.component('ngeoMisc', my_component);
```

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
ol.events.listen(this.geolocation_,
  ol.Object.getChangeEventType(ol.GeolocationProperty.ACCURACY_GEOMETRY),
  function() {
    ...
  }, this);
```

## Custom `ol.Object` properties

OpenLayers allows passing custom properties to classes inheriting from
`ol.Object`. For example:

```js
let layer = new ol.layer.Tile({
  maxResolution: 5000,
  title: 'A title',
  source: new ol.source.OSM()
});
```

`title` is the custom property in this example. (While `maxResolution` is an ol3 built-in layer property.)
You can then use the `get` methods to get that property's value:

```js
let layerTitle = layer.get('title');
```

**But** this won't work in the case of the ngeo, or any code compiled in with
Closure Compiler in ADVANCED mode. The compiler is indeed going to rename the
key `title` in the options object passed to the `ol.layer.Tile` constructor.

One option to work-around the issue involves using the `set` method after
the construction of the layer:

```js
let layer = new ol.layer.Tile({
  maxResolution: 5000,
  source: new ol.source.OSM()
});
// use `set` to set custom layer properties
layer.set('title', 'A title');
```

## CSS class names convention

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

## Styling with less

To be able to do calculations directly with less we encourage to use a subset of the CSS units.
We choose units that don't depend on parent tags and are relative.

 * rem: 1 rem is the font size of the root element (<html>).
 * vw: 1 vw is 1/100th of the width of the viewport.
 * vh: 1 vh is 1/100th of the height of the viewport.
