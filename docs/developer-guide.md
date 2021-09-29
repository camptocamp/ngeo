# Developer Guide

This document provides information for developers working on ngeo.

## Run our code.

Type `make help` to display available targets.

## Code structure

We have 3 repositories with sources code:

- `src`: this folder contains the major part of source code.
- `srcapi`: this folder contains the source code which we offer a more stable API.
- `api`: this folder contains the JavaScript API of the project.

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

Checkout the latest version

```
git checkout <release-branch>
git fetch origin
git reset --hard origin/<release-branch>
```

Where `<release-branch>` stand for `2.x`.

Verify that the `<version>` (`2.x.x`) in package.json match with the tag you'll
create. Then create a tag named the same as the version.

```
git tag <version>
git push origin <version>
```

GitHub Actions will create a new package on npm.

If you create a new release, bump version in the package.json file:

```
git checkout -b bump
vi package.json
git add package.json
git commit -m "Bump version to <version + 1>"
git push origin bump
```

Do the pull request on branch `<release-branche>`

## Create a new stabilization branch

When we create a new stabilization branch we should also duplicate the localization.

Go on master:

```bash
git checkout master
git pull origin master
```

Create the new branch:

```bash
git checkout -b x.y
```

Update the `.github/workflows/main.yaml`:

```diff
     env:
-      MAIN_BRANCH: master
+      MAIN_BRANCH: x.y
```

Commit and push the changes:

```bash
git add .github/workflows/main.yaml
git commit -m "Update the branch"
git push origin x.y
```

Back on master:

```bash
git checkout master
```

Get the actual localization:

```bash
make transifex-get
```

Update the `Makefile`:

```diff
- TX_VERSION ?= x_y
- DEMO_BRANCH ?= prod-x-y
+ TX_VERSION ?= x_y+1
+ DEMO_BRANCH ?= prod-x-y+1
```

Update the `package.json`:

```diff
-  "version": "x.y.0",
+  "version": "x.y+1.0",
```

Update the `SECURITY.md`:

```diff
| x.y+1 | To be defined |
```

Note: when you do the release you should define date or the version x.y to
now + 18 months for a standard release, and now + 36 months for an LTS release.

Update the `.github/workflows/audit.yaml`, in the branch matrix:

```diff
+          - 'x.y+1'
```

Run `c2cciutils-checks` to check that everything is in place.

Commit and push the changes:

```bash
git add package.json Makefile SECURITY.md .github/workflows/audit.yaml
git commit -m "Start the version x.y+1"
git push origin master
```

Create the new localization resource:

```bash
rm .tx/config contribs/gmf/apps/.tx/config
make transifex-init
```

Update the references in the `index.html` file of the `gh-pages` branch.

Create the tag `backport y.x`.

Protect the branch x.y.
