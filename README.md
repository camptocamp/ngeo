# ngeo

[![Travis CI
Status](https://api.travis-ci.org/camptocamp/ngeo.svg?branch=master)](https://travis-ci.org/camptocamp/ngeo)

ngeo is a JS library that aims to ease the development of applications based on
[AngularJS](https://angularjs.org/) and [OpenLayers 3](http://openlayers.org).

More specifically, ngeo is a collection of AngularJS Directives and Services
useful for developing applications combining AngularJS and OpenLayers 3.

Through the Directives, Services and examples it provides, ngeo defines
a specific way to combine Angular and OpenLayers 3 in an application.

ngeo uses [Closure Tools](https://developers.google.com/closure/): the
JavaScript code of ngeo uses Closure Library, and it is checked and compressed
using Closure Compiler.

If you use ngeo we recommend that you also use Closure, because this is the way
we design and use ngeo at Camptocamp. But using Closure is not mandatory:
standalone builds of ngeo can be created.

Currently, ngeo doesn't have an API documentation. To know what features ngeo
provides and how to use ngeo you can look at the
[examples](https://camptocamp.github.io/ngeo/master).

ngeo also includes a [contribs](contribs) directory where non-core
contributions may be placed. ngeo currently includes one contrib: `gmf`.  That
contrib includes components that are specific to the
[GeoMapFish](http://geomapfish.org/) project, that is components that rely
on GeoMapFish-specific web services. The `gmf` contrib examples are also
available [online](http://camptocamp.github.io/ngeo/master/contribs/gmf/).

Docs:

* [Developer guide](docs/developer-guide.md)
* [Application development guidelines](docs/guidelines.md)
