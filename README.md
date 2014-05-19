# ngeo

## Issues

* Cannot use compile flags as missingProperties because of a problem in
  closure-util. See https://github.com/openlayers/closure-util/issues/15.

* We use our own closure-compiler.js externs file to remove the definitions of
  msRequestFullscreen and msExitFullscreen which are defined in Compiler
  versions more recent that what's used in OpenLayers 3.
