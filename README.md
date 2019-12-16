# ngeo

[![Greenkeeper badge](https://badges.greenkeeper.io/camptocamp/ngeo.svg)](https://greenkeeper.io/)

ngeo is a JS library that aims to ease the development of applications based on
[AngularJS](https://angularjs.org/) and [OpenLayers](http://openlayers.org).

More specifically, ngeo is a collection of AngularJS Components and Services
useful for developing applications combining AngularJS and OpenLayers.

Ngeo uses [webpack](https://webpack.js.org): webpack gives you the possibility to use easily only the specific
part of JavaScript, css and html that you need for your application.

If you use ngeo we recommend that you also use webpack, because this is the way
we design and use ngeo at Camptocamp. But using webpack is not strictly mandatory:
standalone builds of ngeo can be created.

To know more about ngeo take a look at:

* The [examples](https://camptocamp.github.io/ngeo/master/examples)
* The documentation can be found in each file. There is currently no API web-documentation for this
  version (you may also use [API documentation](https://camptocamp.github.io/ngeo/master/apidoc/index.html)).

ngeo also includes a [contribs](contribs) directory where non-core
contributions may be placed. ngeo currently includes one contrib: `gmf`.  That
contrib includes components specific to the
[GeoMapFish](https://geomapfish.org/) project, that is components that rely on
GeoMapFish-specific web services. The `gmf` contrib examples are also available
[online](https://camptocamp.github.io/ngeo/master/examples/contribs/gmf/).


## Requirements

* [make](https://www.gnu.org/software/make/) – GNU Make.
* [node](https://www.nodejs.org/) – nodejs JS runtime environment.
* [npm](https://www.npmjs.com/) – npm package manager.

## How to start

### Run the application

```
git clone git@github.com:camptocamp/ngeo.git
cd ngeo
make serve-ngeo
```

The ngeo examples are now available on your https://localhost:3000/examples/.

### Run GeoMapFish

To run the GeoMapFish examples:

```
make serve-gmf
```

then visit https://localhost:3000/contribs/gmf/examples/.

To run the GeoMapFish applications:

```
make serve-gmf-apps
```

then visit them using
https://localhost:3000/contribs/gmf/apps/<app_name>.html, for example:
https://localhost:3000/contribs/gmf/apps/desktop.html


### Run the Simple API Help

To run the Simple API Help:

```
make serve-api
```

Then visit https://localhost:3000/apihelp.html

### Go further

* [Developer guide](docs/developer-guide.md) – This guide is for ngeo developers.
* [Application development guidelines](docs/guidelines.md) – This guide is for
  application developers using ngeo.


## Other docs related to ngeo:
* [Transifex](https://www.transifex.com/camptocamp/ngeo/) – Translation platform.
