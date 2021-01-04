### Run the examples

```
git clone git@github.com:camptocamp/ngeo.git
cd ngeo
make serve-ngeo
```

Use the _ONE_EXAMPLE_ environment variable to build (and rebuild on each change) only one example.

```
ONE_EXAMPLE=offline make serve-ngeo
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
