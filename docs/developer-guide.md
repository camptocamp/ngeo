# Developer Guide

This document provides information for developers working on ngeo.

## Run our code.

Type `make help` to display available targets.

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

## Unit tests

### Writing tests

The unit tests are located in `test/spec/` and uses the [Jasmine Framework](http://jasmine.github.io/1.3/introduction.html).
Please refer to the [AngularJS's unit-testing guide](https://docs.angularjs.org/guide/unit-testing) for
how to write unit tests.

### Running tests

To run the unit tests on the command line, just run `make test`. All the tests will be
run inside [PhantomJS](http://phantomjs.org/).

### Running tests in debug mode

For debugging purposes it is useful to run the unit tests in an actual browser with
`make test-debug`. This task starts the Karma server and opens Chrome/Chromium. Click on
`Debug` to open a new page that runs all unit tests. Now you can start the debugger.

To run only a single test or test group, use `fdescribe` or `fit` to **f**ocus
on a test:

```javascript
fdescribe('...', function() {

  fit('...', function() {
```

## Create a package on npm

Set the version in the `package.json` file.

Create a tag named the same as the version.

Travis will create a new package on npm.

## Create a new stabilisation branch

When we create a new stabilisation branch we should also duplicate the localisation.

Go on master:
```bash
git checkout master
git pull origin master
```

Create the new branch:
```bash
git checkout -b x.y
```

Update the `.travis.yml`:
```diff
 - provider: script
   script: make transifex-send
   skip_cleanup: true
   on:
     repo: camptocamp/ngeo
-     branch: master
+     branch: x.y
```

Commit and push the changes:
```bash
git add .travis.yml
git commit -m "Update the branch"
git push origin x.y
```

Back on master:
```bash
git checkout master
```

Do the merge to prepare the future merges:
```bash
git merge x.y
```

Restore the `.travis.yml`:
```diff
 - provider: script
   script: make transifex-send
   skip_cleanup: true
   on:
     repo: camptocamp/ngeo
-     branch: x.y
+     branch: master
```

Get the actual localisation:
```bash
make transifex-get
```

Update the `Makefile`:
```diff
- TX_VERSION ?= x_y
+ TX_VERSION ?= x_y+1
```

Commit and push the changes:
```bash
git add Makefile .travis.yml
git commit -m "Start the version x.y+1"
git push origin master
```

Create the new localisation resource:
```bash
rm .tx/config
make transifex-init
```
