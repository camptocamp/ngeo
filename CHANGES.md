# 2.4

For the GeoMapFish applications we must not add the `dynamic.js` script an the `ng-app` attribute in
the application HTML file anymore. Instead, we need to use the following metadata:

```
<meta name="dynamicUrl" content="<application_url>/dynamic.json">
<meta name="interface" content="<interface_name>">
```

If you use one of the abstract controllers bootstrap will be done by `gmf/controllers/bootstrap.js`.
