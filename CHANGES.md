# 2.9

Technical release - ngeo can be now used as an independent library and
can be compiled with any modern bundler.

## Technical changes

- Drop ngInject annotations
- Remove babel transpilation (drop support of IE)
- Simplify management and reorganise SaaS (css) files
- Move SVG as text in dedicated files and import them
- Import partial (html) files with import, drop requires
- Update FontAwesome to version 6
- Update webpack to version 5
- Let the users choose the version of peerDependencies
- Remove not used offline and ol-cesium related code.

# 2.8

## New functionalities

- Use main_ogc_server in WMS URL
- [Mobile] prompt connection panel when secured layers are listed in permalink
- Investigate tiles loading performance
- Be able to use the username in the print output
- Full Text Search improvement
- Disabled user should not be able to stay connected
- PKCE Support for oAuth

# 2.7

Technical release.

## Technical changes

- Web Component implementation
- Migration of Feedback form to Web Component
- Migration of authentication to Web Component
- Added documentation for the “Administration” section
- WFS 3 support for QGIS
- Improved theme loading speed
- Merge of ngeo/GMF code
- First implementation of vector tiles

# 2.6

## New functionalities

- Interface
  - [2.6.24] Push a message to user when server authentication is lost
  - [2.6.32] Right panel resizable for all tools
- Query
  - [2.6.10] CSV export in Window
  - [2.6.46] Define a per layer click tolerance
  - [2.6.53] Scale limit on WMTS query
- Search
  - [2.6.26] Possiblitiy to add keywords to layers in order to find them easier
  - [2.6.27] Full-text-search for layers
- Print
  - [2.6.29] Handle case with layers with a legend too big to show on one A4 sheet
- Permalink
  - [2.6.25] See the configuration of the timeslider/timepicker before sharing
- Measure and redlining
  - [2.6.1] Draw an arrow
  - [2.6.31] Snapping functionality for measuring and drawing tools
- Editing
  - [2.6.20] Check data type and display warning before saving
  - [2.6.22] Add a column named “order”, in order to sort dropdown lists
  - [2.6.51] Allow editing of overlapping geometries (editing and redlining)
- External data
  - [2.6.34] Display legend of imported WMS layers
  - [2.6.35] Interrogation of external WMS with GetFeatureInfo
  - [2.6.47] Drag & drop files to show them on map

# 2.5

## New functionalities

- Improve WMS browser (search, server list)
- Map slider (swipe between maps)
- Improve redlining, be able to define length, size
- Close legend automatically when layer is deactivated
- Display snappable layers and enable activation/deactivation
- Intranet user panel
- Show and validate mandatory fields in editing form
- Timeslider improvements (dynamic map rendering)
- Be able to define min and max scale for WMTS
- Let filters active even if panel is closed
- Query using a polygon
- Global loading & counter message
- Long name cut off in display window
- Story maps
- KML styling (import & export)
- Be able to use desktop on a tablet
- Geolocation on desktop interface
- WMS GetFeatureInfo on non WFS servers
- Security – No cached credentials
- Security – Configurable account lockout
- Security – Secure password storage
- Security – Session timeouts
- Architecture – Docker only

# 2.4

For the GeoMapFish applications we must not add the `dynamic.js` script an the `ng-app` attribute in
the application HTML file anymore. Instead, we need to use the following metadata:

```
<meta name="dynamicUrl" content="<application_url>/dynamic.json">
<meta name="interface" content="<interface_name>">
```

If you use one of the abstract controllers bootstrap will be done by `gmf/controllers/bootstrap.js`.

## New functionalities

- IFRAME integration
- Editing – Column order
- Editing – Read only attributes
- Editing – Link to external form
- Drawing – Delete vertex menu
- Drawing – Zoom on recenter
- Read only drawing on mobile
- Layer tree – Resize panel
- Layer tree – Radio buttons
- Query – Auto-link in results
- Interface – App loading widget
- Interface – mobile first level panel title
- A0 printing
