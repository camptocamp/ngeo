The code in this directory and subdirectories is organized in angular modules.


# Recommended setup
The recommended setup from https://docs.angularjs.org/guide/module is:
- a module for each feature
- a module for each reusable component (especially directives and filters)
- (and an application level module which depends on the above modules and contains any initialization code.)

Example for the search feature:
- an `ngeoSearchModule` module in `modules/search/searchmodule.js`;
- an `ngeoSearch` directive (in partials `ngeo-search`) in `modules/search/searchdirective.js`;
- an `ngeoCreateGeoJSONBloodhound` service in ``modules/search/creategeojsonbloodhound.js`.


# Google library
The code do not use the Google library with exceptions for `goog.provide`, `goog.require` and `goog.asserts.*`.
