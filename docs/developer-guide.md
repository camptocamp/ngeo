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

Note: this target compiles the examples' code. The examples are combined into
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

will publish the examples to `https://camptocamp.github.io/ngeo/<branchname>/`.

The published examples use the `ngeo.js` standalone build.

Example: https://camptocamp.github.io/ngeo/master/examples/simple.html.

## Developer Guide

This section includes information for developers and users of ngeo.

### Style guide

We more or less follow the [AngularJS Style Guide for Closure Users at
Google](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html).

### Exports

Services that are objects (rather than numbers, strings, or functions) may need
"exports". Exports are needed for users of the `ngeo.js` standalone build.

To export a symbol, the `@export` annotation can be used:

```js
/**
 * Some layer.
 *
 * @constructor
 * @extends {ol.source.WMTS}
 * @param {gmfx.source.SomeLayerOptions} options Layer options.
 * @export
 */
gmf.source.SomeLayer = function(options) {
  ...
};
```

### Running examples

#### Local mode

To run the examples locally, just run `make serve` and open your browser in
`http://localhost:3000/examples/` uri.


All extern javascript includes must be defined in the example file, explicitly.

```html
  <script src="../node_modules/jquery/dist/jquery.js"></script>
  <script src="../node_modules/angular/angular.js"></script>
  <script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>
```

To include the example code and all its dependencies through `ngeo` and `ol3`
you have to include the following tag:

```html
  <script src="/@?main=scaleselector.js"></script>
```

The `/@?main=scaleselector.js` will take the `scaleselector.js` file in the
example folder and will load in debug mode all the dependency tree built with
the `goog.require()` call.
In local examples, you will have all javascripts files in debug mode of ol3,
ngeo, contribs and goog files loaded.

#### Hosted examples and gh-pages

The target `examples-hosted` will create a folder in your `.build` folder
for *hosted examples*, where examples are fully compiled. You can then test
them in advanced build mode.

When you execute the target `gh-pages`, it pushs your `examples-hosted` to your
github gh-pages, you can them test them online and share them.

During the `examples-hosted` phase, some changes are made on source
files to make them work in an advanced build context:

##### Index file

An `index.html` is created in `examples/` and `contribs/gmf/` to list
all examples available in the library.

##### External js files

For example, all links to external js files are changed from
 `../node_modules/angular/angular.js` to
- `lib/angular.min.js` in ngeo examples
- `../../lib/angular.min.js` in gmf examples

##### ngeo js files

In hosted examples, we use the standalone build of ngeo `ngeo.js` for ngeo
 examples, and `gmf.js` for gmf examples.
- `<script src="../../lib/gmf.js"></script>`
- `<script src="lib/ngeo.js"></script>`

##### examples js files

The example source is finally added in debug mode. `/@?main=scaleselector.js` is
changed to
- `<script src="scaleselector.js"></script>` in ngeo
- `<script src="locationchooser.js"></script>` in gmf

So both are relative to the example folder.

### GMF mobile application

The GMF applications works the same way in local mode as the examples.
But it is different for the hosted examples. As we want gmf applications to be
a default instance of gmf ui, we want to build the whole application in
advanced mode.
So during make, all javascript includes are merged into one :
`<script src="../../build/mobile.js"></script>`

The build is done in `contribs/gmf/build/`.


### Unit tests

#### Writing tests

The unit tests are located in `test/spec/` and uses the [Jasmine Framework](http://jasmine.github.io/1.3/introduction.html).
Please refer to the [AngularJS's unit-testing guide](https://docs.angularjs.org/guide/unit-testing) for
how to write unit tests.

#### Running tests

To run the unit tests on the command line, just run `make test`. All the tests will be
run inside [PhantomJS](http://phantomjs.org/).

#### Running tests in debug mode

For debugging purposes it is useful to run the unit tests in an actual browser with
`make test-debug`. This task starts the Karma server and opens Chrome/Chromium. Click on
`Debug` to open a new page that runs all unit tests. Now you can start the debugger.

To run only a single test or test group, use `fdescribe` or `fit` to **f**ocus
on a test:

```javascript
fdescribe('...', function() {

  fit('...', function() {
```

### Create a package on npm

Set the version in the `package.json` file.

Create a tag named the same as the version.

Travis will create a new package on npm.

### Create a new stabilisation branch

When we create a new stabilisation branch we should also duplicate the localisation.

Get the actual localisation:
```bash
make transifex-get
```

Create the new branch:
`git checkout -b x.y`

Update the `Makefile`:
```diff
- TX_BRANCH ?= master
+ TX_BRANCH ?= x_y
```

Commit and push the changes:
```bash
git add Makefile
git commit -m "Start the branch x.y"
git push origin x.y
```

Create the new localisation resource:
```bash
rm .tx/config
make transifex-init
```
