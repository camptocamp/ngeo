# ngeo

ngeo is a JS library that aims to ease the development of applications based on
[AngularJS](https://angularjs.org/) and [OpenLayers](http://openlayers.org).

More specifically, ngeo is a collection of AngularJS Components and Services
useful for developing applications combining AngularJS and OpenLayers.

ngeo uses [webpack](https://webpack.js.org): webpack gives you the possibility to use easily only the specific
part of JavaScript, css and html that you need for your application.

If you use ngeo we recommend that you also use webpack, because this is the way
we design and use ngeo at Camptocamp. But using webpack is not strictly mandatory:
standalone builds of ngeo can be created.

To know more about ngeo take a look at:

- The [examples](https://camptocamp.github.io/ngeo/master/examples)
- The [Storybook](https://camptocamp.github.io/ngeo/master/storybook)
- The documentation can be found in each file. There is currently no API web-documentation for this
  version (you may also use [API documentation](https://camptocamp.github.io/ngeo/master/apidoc/index.html)).

ngeo also includes a [contribs](contribs) directory where non-core
contributions may be placed. ngeo currently includes one contrib: `gmf`. That
contrib includes components specific to the
[GeoMapFish](https://geomapfish.org/) project, that is components that rely on
GeoMapFish-specific web services. The `gmf` contrib examples are also available
[online](https://camptocamp.github.io/ngeo/master/examples/contribs/gmf/).

## Requirements

- [make](https://www.gnu.org/software/make/) – GNU Make.
- [node](https://www.nodejs.org/) – nodejs JS runtime environment.
- [npm](https://www.npmjs.com/) – npm package manager.
- [python](https://www.python.org/) – 3.x installed on the system (be careful with pyenv)

On my Ubuntu 24.04, I had to set the following environment variables to make it work:

- `NODE_GYP_FORCE_PYTHON=/usr/bin/python`
- `PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig/:/usr/share/pkgconfig/`

### Go further

- [Developer guide](docs/developer-guide.md) – This guide is for ngeo developers.
- [Application development guidelines](docs/guidelines.md) – This guide is for
  application developers using ngeo.

## Other docs related to ngeo:

- [Transifex](https://www.transifex.com/camptocamp/ngeo/) – Translation platform.

## Contributing

Install the pre-commit hooks:

```bash
pip install pre-commit
pre-commit install --allow-missing-config
```
