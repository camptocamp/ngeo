# Migration from ngeo 2.2 to ngeo 2.3

The version 2.3 of ngeo was adapted to prepare your application to to use [webpack](https://webpack.js.org/).
That forced us to redesign our manner to organize the code. The following "how to" will help you to
understand what we have changed, why, and will help you report these changes in your project. This will
be explained in two sections:

 - [One before the switch to ngeo 2.3](#prepare-your-code-for-ngeo-23)
 - [And one to complete the work after the upgrade to ngeo 2.3](#use-ngeo-23)

Note:
You must know that now in ngeo, the code is organized in modules. There is no more `directive` or `service`
folders. Instead we have a folder for each module. A module is a part of the application. For instance, the
`authentication` folder contains the component, the partial and the service related to
authentication. The folder also contains a `module.js` file that can be included in your
application to load directly all what is required for this module to work.


## Prepare your code for ngeo 2.3

Here are the steps to complete before switching to use ngeo 2.3. We encourage you to build and test
your application after each step. You should not see any difference when using your application.

 1. [Remove dependencies on the goog library](#remove-dependencies-on-the-goog-library)
 1. [Use only one goog.provide per file](#one-googprovide-per-file)
 1. [Integrate eslint googshift and activate check](#integrate-eslint-googshift-and-activate-check)
 1. [Transform the code to ES6 modules via googshift](#transform-the-code-via-googshift)

If you have **no custom elements** in you application you may **start directly with the third point**.

### Remove dependencies on the goog library

If in one of your .js file you refer to a `goog` function. You should replace it because we don't
use anymore this library (and we will also stop using google closure to build our code). Excepted for the following
functions: `goog.asserts`, `goog.require` and `goog.provide` (and `goog.module` but you should not have any
in your code for now). We can ignore them because we will provide them with a script, later.

To search occurrences of `goog` functions (without above exceptions) you can use this command (unix):

```
git grep goog <path_to_apps_folder> | grep -v 'require' | grep -v 'provide' | grep -v 'asserts' | grep -v 'google'
```

In a GeoMapFish project, `path_to_apps_folder` is the path to your `static-ngeo` folder.

To know how to replace a `goog` function, it can help to search the same function in `ngeo`
2.1 and compare the line with the same line in ngeo 2.2 or upper. Examples:

 - `goog.getUid` becomes `ol.getUid`.
 - `goog.object.extend` becomes `ol.obj.assign`.
 - ...

Test, then commit your changes.

### Use only one goog.provide per file

Webpack expects only one export per file. If a file contains more than one `goog.provide`, simply remove one.
Ensure that the removed value is not required (by a `goog.require`) in another file. If you find
one, replace the required value by the one still provided.

You must provide only what you declare as provided. So rename your provided class to what you
effectively provides. For instance, if you provide an `an_app_name.module.component`, you must only
have an `an_app_name.module.component` in your file. (you can have an entity assigned to this
component, like `app.module.component.myObjec`, but not a new entity, like `app.module.Service`.)
We will see later what `an_app_name` means, we encourage you to simply name it `app`.

Also the path and the name of the file must match what you provide. In the example above, it is
expected that the path to your file is `<a_folder>/module/component.js`. (We will configure
the `<a_folder>` value later.)

If you have multiple different entities in one file you can:

 - Split your file to have one class (and provide) per file.
 - Or if you don't use this entity out of the file, assign this entity to a variable inside the
   file (typically for a component controller).

It can help to see how `component`, `service`, `factory`, etc. are made in ngeo 2.3.

Note for GeoMapFish:
Your application main controllers (files in `static-ngeo/js/<application>.js`). Are also concerned.
But as the build expects to find the interface name in the 'goog.provide', you must potentially rename
your file to match the interface name.
Example: you have a `ngeodesktop` interface, that means that your file must be named `ngeodesktop.js` and the
file must provide `<an_app_name>_ngeodesktop`. You may have to exceptionnaly adapt this line in your
CONST_Makefile: https://github.com/camptocamp/c2cgeoportal/blob/97eb3dcb4d6dda719cba69d7d62ecb7ebbbc72bd/c2cgeoportal/scaffolds/update/CONST_Makefile_tmpl#L911
Where `$(PACKAGE)` is `<an_app_name>` and `$*` is one of your interfaces (like `ngeodesktop`).

Test, then commit your changes.

### Integrate eslint googshift and activate check

To ensure that the code will work with webpack, we use [eslint](https://eslint.org/). You must add the new
configuration for the linter. Create a file: `.eslintrc.yaml` in your js folder (For GeoMapfish, in
`<project>/static-ngeo/apps` and `<project>/static-ngeo/components`). And copy paste this content:

```
plugins:
  - googshift

rules:
  googshift/no-duplicate-requires: error

  googshift/no-missing-requires:
    - error
    - prefix: []

  googshift/no-unused-requires: warn

  googshift/one-provide-or-module:
    - error
    - entryPoints: [<an_app_name>]
      root: <an_app_name>

  googshift/requires-first: error

  googshift/valid-provide-and-module:
    - warn
    - entryPoints: [<an_app_name>]
      root: src/module
      replace: ../../<path_to_this_folder/><a_folder>|<an_app_name>

  googshift/valid-requires: error

  no-unused-vars: warn
```

Where `an_app_name` matches what you chose in the previous step for the same value.
and for the path on the line `replace`:

  - `../../` is because the script will be read from `node_modules/eslint-plugin-googshift`.
  - `<path_to_this_folder/>` for the path to the top folder of this file.
  - `a_folder` is the top folder of this file.
  - `|<an_app_name>` to refer this path at this name. This final value will be used as base name for what
    you provide in your .js files (the `<an_app_name>` part in `<an_app_name>.module.component`).

Then run the linter, and fix the errors (and warnings when it's possible). The main errors will be missing
or unused `goog-provide` values.

To run the linter in GeoMapFish, run `rm -f .build/eslint.timestamp && make -f <instance>.mk lint-ngeo`.

Test, then commit your changes.

### Transform the code via googshift

To achieve this preparation phase, run this script:

```
./node_modules/.bin/jscodeshift --transform=node_modules/googshift/transforms/goog_provide_to_goog_module.js --legacy true <path_to_your_js_folder>
./node_modules/.bin/jscodeshift --transform=node_modules/googshift/transforms/goog_module_to_es6_module.js --legacy true <path_to_your_js_folder>
```

In Geompafish, the `<path_to_your_js_folder>` will be `<package>/static-ngeo/apps/ <package>/static-ngeo/components/`.

The script will make your js files ready for webpack. You will see that now, what you provide is named
`exports` in each file. Also the requirements are used through constants.

If the previous steps were well done, your application should work. Otherwise you can adapt your code now or
revert the changes, correct your files and run the script again.

Test, then commit your changes.


## Use ngeo 2.3

At this point you can update your application to use ngeo 2.3. It's recommended to work on a branch, because
the changes can't be easily tested before the end of the transformation.

### Summary

If you have no custom AngularJS element in your code, you may start directly with the second points.

 1. [Transform your components to modules](#transform-your-components-to-modules)
 1. [Transform your applications to modules](#transform-your-applications-to-modules)
 1. [Adapt paths for 'less'](#Adapt-paths-for-less)
 1. [Test your application](#test-your-application)

### Transform your components to modules

In ngeo 2.3 we no more rely on the global modules 'ngeo', or 'gmf'. Now we want to be able to require only
the modules we need in our application. That's why each file provides its own AngularJs module, and each
file requires only what it needs to work.

In each of your file declaring an AngularJS entity (like `service`, `factory`, `component`, `directive`,
`value`, etc) you must create an AngularJS module. You also must require all modules that your module
use to work.

Example for AngularJS components:

This example is from the file that provides the `ngeo.grid.component`. The module is named `ngeoGrid`, and it
requires three others modules to work:

```
/**
 * @type {!angular.Module}
 */
exports = angular.module('ngeoGrid', [
  ngeoGridConfig.module.name,
  ngeoMiscFilters.name,
  'floatThead',
]);
```

On this module is attached an AngularJS component and a value, like this:

```
exports.value('ngeoGridTemplateUrl', a_function);
exports.component('ngeoGrid', the_grid_component);
```

For AngularJS `service`, that's the same concept, but instead of providing the module, we prefer to provide
the class and to attach the module to this class. Example with the file that provides the
`ngeo.print.Service` module, with one dependency and named `ngeoPrint`. It also provides a `factory`:

```
exports = class {...};

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('ngeoPrint', [
  ngeoMapLayerHelper.module.name
]);

exports.module.service('ngeoPrintService', exports);
exports.module.factory('ngeoCreatePrint', exports.createPrintServiceFactory);
```

You can see that to require a module inside another module, we add the name of the module into the array of
dependencies of the module. In the last two examples, that are the `ngeoGridConfig.module.name`,
`ngeoMiscFilters.name` and `ngeoMapLayerHelper.module.name`. In the case of the component
`ngeoMiscFilters.name`, the module is assigned to the `ngeoMiscFilters` component, that's why we can use its
name directly.
`floatThead` is an external dependency that is not using webpack. So we provide directly the name because
we can't `goog.require` the module.

You can see how it's done in ngeo 2.3 to help you transform your own AngularJS entities into modules.

### Transform your applications to modules

This part is described for GeoMapFish applicaions only.

#### In each of your application controller (`<package/static-ngeo/apps/<interface>/Controller.js`)

First add the requirement of the abstract controller your application rely on (here is an example for the
desktop).

```
const gmfAbstractDesktopController = goog.require('gmf.controllers.AbstractDesktopController');
```

Then create a module for your application and add the requirement to the abstract controller you use (that's
an AngularJS controller as another). You must use a unique module name (here it's `AppMain`):

```
exports.module = angular.module('AppMain', [
  gmfAbstractMobileController.module.name,
  myOtherComponentDependency.name,
  myOtherServiceDependency.module.name,
  'etc'
]);
```

Finally, export your module with an unique controller name (here it's `AppMainController`):

```
exports.module.controller('AppMainController', exports);
```

#### In each of your application controller (`<package>/templates/<interface>.html`)

Adapt your first html line to use your module (here `AppMain`) and its controller (here `AppMainController`).

```
<html lang="{{mainCtrl.lang}}" ng-app="AppMain" ng-controller="AppMainController as mainCtrl">
```

Then, you probably declare some AngularsJS values and constants at the end of this file. So you must assign
these values to the module of your controller like this:

```
<script>
  ...
  var module = angular.module('AppMain');
  module.constant('myConstantForTheSearch': 'a');
  moduleValue('myValueForThePrint': 'b');
  // etc.

  // You can assign all constant and value to your main module.
  // The only exception is for the 'angularLocaleScript' because it must be loaded first.
  // It must be provided like that:
  var gmfAbstractAppControllerModule = angular.module('GmfAbstractAppControllerModule');
  gmfAbstractAppControllerModule.constant('angularLocaleScript', '${ request.static_url('epfl_authgeoportail:static-ngeo/build/') }angular-locale_{{locale}}.js');
  ...
</script>
```

### Adapt paths for 'less'

You must import your `<interface.scss>` in each application controller you have by something
like: `import '../../sass/<interface>.scss'`.

With Webpack (`less-loader`), to reference a file by it's relative URL, the beginning of the path must be the
current file. That means that, if in a file `a/b/c/d.js` you want to import the `.scss` file  located
in `a/x/y/z.scss`, the import must be written like this: `import '../../x/y/z.scss'`. Paths must also be
adapted for url in each `.scss` file (for instance, for a `background-image: url("../../images/office.svg");`

### Test your application

Then your application should work. Test it and commit your changes.
